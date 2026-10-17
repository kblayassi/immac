"""Diaporama HTML autonome à partir d'un deck au format Slides.

Les diaporamas de NSI sont nés dans un Artifact de type Slides ; leurs sources vivent
désormais ici, dans tools/diaporamas/slides/<nom>/ :

    project/deck.json          l'index (ordre des diapos)
    project/slides/<id>.html   une <section> par diapo, styles en ligne
    images.json                /_blob/<id> → chemin de l'image sous docs/

Une image ou une vidéo du site peut aussi s'écrire directement src="files/…" (chemin
sous docs/).

Ce script en fait un fichier unique, publié à côté de la page du chapitre, avec le
même lecteur que les diaporamas de SNT (diaporama.py) : flèches, Espace, F plein
écran, clic à droite ou à gauche, numéro de diapo gardé dans l'adresse. Le plugin
version_eleve retire les fichiers diaporama*.html du site élève.

Usage :
    python tools/diaporamas/depuis_slides.py nsi_ch3 docs/NSI/3_Representation_des_nombres_entiers/diaporama.html
"""
import json
import os
import re
import sys
from html import escape
from pathlib import Path
from urllib.parse import unquote

ICI = Path(__file__).resolve().parent
DOCS = ICI.parent.parent / "docs"

# Les icônes du moteur Slides, rendues par des émojis (comme dans diaporama.py).
ICONES = {
    "Book": "📘", "Star": "⭐", "Warning": "⚠️", "Lightbulb": "💡", "Wrench": "🛠️",
    "Settings": "⚙️", "Lightning": "⚡", "Code": "🐍", "Clock": "🕰️", "Chat": "💬",
    "CheckCircle": "✅", "Check": "✔️", "Key": "🔑", "Lock": "🔒", "Globe": "🌍",
}


def icone(m):
    nom, taille = m.group(1), int(m.group(2))
    return (f'<span style="font-size:{round(taille * 0.85)}px; line-height:1; flex:none" '
            f'aria-hidden="true">{ICONES.get(nom, "•")}</span>')


def fleche(m):
    couleur, l, h = m.group(1), int(m.group(2)), int(m.group(3))
    t, q = round(h * 0.3), round(l * 0.6)
    return (f'<svg width="{l}" height="{h}" viewBox="0 0 {l} {h}" style="flex:none; align-self:center" aria-hidden="true">'
            f'<polygon points="0,{t} {q},{t} {q},0 {l},{h // 2} {q},{h} {q},{h - t} 0,{h - t}" fill="{couleur}"/></svg>')


def convertir(section, images, vers_docs):
    def image(m):
        blob = m.group(1)
        if blob not in images:
            sys.exit(f"Image inconnue : {blob} (à ajouter dans images.json)")
        return f'src="{vers_docs}{images[blob]}"'
    section = re.sub(r'src="(/_blob/[0-9a-f]+)"', image, section)
    # Images et vidéos du site, écrites directement par leur chemin sous docs/.
    section = re.sub(r'src="(files/[^"]+)"', lambda m: f'src="{vers_docs}{m.group(1)}"', section)
    section = re.sub(r'<x-icon name="(\w+)" style="[^"]*?width:(\d+)px[^"]*"></x-icon>', icone, section)
    section = re.sub(r'<x-shape kind="arrow-right" style="background:([^;]+); width:(\d+)px; height:(\d+)px[^"]*"></x-shape>',
                     fleche, section)
    reste = re.findall(r"<x-[a-z]+", section)
    if reste:
        sys.exit(f"Élément Slides non pris en charge : {sorted(set(reste))}")
    return f'<div class="diapo">{section}</div>'


def ecrire(nom, sortie):
    dossier = ICI / "slides" / nom
    deck = json.loads((dossier / "project" / "deck.json").read_text(encoding="utf-8"))
    images = json.loads((dossier / "images.json").read_text(encoding="utf-8"))
    sortie = Path(sortie).resolve()
    vers_docs = os.path.relpath(DOCS, sortie.parent).replace(os.sep, "/") + "/"
    for chemin in images.values():
        if not (DOCS / chemin).exists():
            sys.exit(f"Image absente du site : docs/{chemin}")
    sources = [(dossier / "project" / "slides" / f"{sid}.html").read_text(encoding="utf-8") for sid in deck["order"]]
    for chemin in re.findall(r'src="(files/[^"]+)"', "".join(sources)):
        if not (DOCS / unquote(chemin)).exists():
            sys.exit(f"Fichier absent du site : docs/{unquote(chemin)}")
    diapos = [convertir(s, images, vers_docs) for s in sources]
    html = MODELE.replace("@TITRE@", escape(deck["title"])).replace("@DIAPOS@", "\n".join(diapos))
    sortie.write_text(html, encoding="utf-8")
    print(f"{sortie.relative_to(DOCS.parent)} : {len(diapos)} diapos")


MODELE = r"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>@TITRE@</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Red+Hat+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #14101d; overflow: hidden; font-family: Quicksand, Arial, sans-serif; }
  #scene { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center; }
  .diapo { position: absolute; inset: 0; display: none; }
  .diapo.active { display: block; animation: apparait .35s ease; }
  @keyframes apparait { from { opacity: 0; } }
  /* Rendu des diapos Slides : styles en ligne, comme dans le moteur d'origine. */
  .diapo > section { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
  .diapo section * { min-width: 0; min-height: 0; }
  .diapo ul, .diapo ol { padding-left: 1.25em; }
  .diapo table { width: 100%; table-layout: fixed; border-collapse: collapse; align-self: flex-start; line-height: 1.4; }
  .diapo th, .diapo td { border: 2px solid rgba(20, 20, 19, .22); padding: .35em .6em; text-align: left;
                         vertical-align: top; overflow-wrap: break-word; }
  .diapo aside { display: none; }
  #progression { position: fixed; left: 0; bottom: 0; height: 5px; background: #FF5722; transition: width .3s; z-index: 2; }
  #aide { position: fixed; right: 14px; bottom: 12px; color: #8a8399; font: 12px Quicksand, sans-serif; opacity: .6; z-index: 2; }
  @media print {
    html, body { overflow: visible; height: auto; background: #fff; }
    #scene { position: static; transform: none !important; width: auto; height: auto; }
    .diapo { position: relative; display: block !important; width: 1920px; height: 1080px; page-break-after: always; }
    #progression, #aide { display: none; }
  }
</style>
</head>
<body>
<div id="scene">
@DIAPOS@
</div>
<div id="progression"></div>
<div id="aide">← → pour naviguer · F plein écran</div>
<script>
(function () {
  const diapos = [...document.querySelectorAll(".diapo")];
  const scene = document.getElementById("scene");
  let i = Math.min(Math.max(parseInt(location.hash.slice(1), 10) - 1 || 0, 0), diapos.length - 1);

  function ajuster() {
    const k = Math.min(innerWidth / 1920, innerHeight / 1080);
    scene.style.transform = `translate(-50%, -50%) scale(${k})`;
  }
  function montrer(n) {
    i = Math.min(Math.max(n, 0), diapos.length - 1);
    diapos.forEach((d, j) => d.classList.toggle("active", j === i));
    diapos.forEach((d, j) => { if (j !== i) d.querySelectorAll("video").forEach((v) => v.pause()); });
    document.getElementById("progression").style.width = ((i + 1) / diapos.length * 100) + "%";
    history.replaceState(null, "", "#" + (i + 1));
  }
  addEventListener("resize", ajuster);
  addEventListener("keydown", (e) => {
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); montrer(i + 1); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); montrer(i - 1); }
    else if (e.key === "Home") montrer(0);
    else if (e.key === "End") montrer(diapos.length - 1);
    else if (e.key === "f" || e.key === "F") {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });
  addEventListener("click", (e) => {
    if (e.target.closest("a, button, video")) return;
    montrer(e.clientX > innerWidth / 2 ? i + 1 : i - 1);
  });
  ajuster();
  montrer(i);
})();
</script>
</body>
</html>
"""

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    ecrire(sys.argv[1], sys.argv[2])

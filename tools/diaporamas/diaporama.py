"""Diaporamas de cours : un fichier HTML autonome, aux couleurs du site.

Usage : un script de contenu (par exemple snt_internet_1.py) construit la liste
des diapos avec les fonctions ci-dessous, puis appelle `ecrire(...)`.

Le fichier produit ne dépend de rien, sinon des polices Google et, s'il en
contient, des schémas et outils interactifs du site, chargés par chemin
relatif : il doit donc être publié à côté de la page du chapitre.

Navigation : flèches, Espace, Page suivante/précédente, Début/Fin ; F pour le
plein écran ; un clic sur la moitié droite ou gauche de l'écran. Le numéro de la
diapo est gardé dans l'adresse (#12), pour reprendre là où on s'était arrêté.

Le plugin version_eleve retire les fichiers diaporama*.html du site élève.
"""
from html import escape
from pathlib import Path

VIOLET = "#573D91"
COULEURS = {   # les admonitions du site
    "definition": ("#107FB3", "#E7F2F8", "#0C5F87", "📘"),
    "retenir": ("#00B8D4", "#E5F8FB", "#00697A", "⭐"),
    "attention": ("#FF9100", "#FFF4E5", "#9A5700", "⚠️"),
    "histoire": ("#E67E22", "#FDF0E6", "#94480F", "🏛️"),
    "methode": ("#00C853", "#E8F9EE", "#0B7A3B", "🛠️"),
    "astuce": ("#00BFA5", "#E5F8F5", "#00695C", "💡"),
}


class Deck:
    def __init__(self, titre, pied):
        self.titre = titre
        self.pied = pied
        self.diapos = []
        self.utilise_outils = False

    # --- briques -----------------------------------------------------------
    def _page(self, contenu, classe="contenu", fond=None, notes=""):
        n = len(self.diapos) + 1
        style = f' style="background:{fond}"' if fond else ""
        pied = ""
        if classe == "contenu":
            pied = f'<p class="pied">{escape(self.pied)}</p><p class="numero">{n}</p>'
        notes = f'<aside>{escape(notes)}</aside>' if notes else ""
        self.diapos.append(f'<section class="diapo {classe}"{style}>{contenu}{pied}{notes}</section>')

    def couverture(self, surtitre, titre, soustitre):
        self._page(f'<p class="surtitre">{surtitre}</p><h1>{titre}</h1><p class="sous">{soustitre}</p>'
                   f'<div class="trait"></div>', "couverture")

    def partie(self, numero, titre, soustitre=""):
        self._page(f'<p class="grand-numero">{numero}</p><h1>{titre}</h1><p class="sous">{soustitre}</p>', "couverture")

    def contenu(self, rubrique, titre, corps, notes=""):
        self._page(f'<div class="bandeau"></div><header><p class="rubrique">{rubrique}</p><h2>{titre}</h2></header>'
                   f'<div class="corps">{corps}</div>', notes=notes)

    def retenir(self, titre, texte):
        """Une diapo pleine page « À retenir », toujours remplie."""
        self._page(f'<p class="retenir-titre">⭐ À retenir !</p><h2>{titre}</h2><div class="retenir-texte">{texte}</div>',
                   "retenir")

    def outil(self, rubrique, titre, nom, consigne=""):
        """Une démonstration en direct, avec l'outil interactif du site."""
        self.utilise_outils = True
        self.contenu(rubrique, titre, (f'<p class="consigne">{consigne}</p>' if consigne else "")
                     + f'<div class="snt-outil" data-outil="{nom}"></div>')

    # --- encadrés ------------------------------------------------------------
    @staticmethod
    def encadre(genre, titre, texte):
        bord, fond, encre, icone = COULEURS[genre]
        return (f'<div class="encadre" style="border-left-color:{bord}">'
                f'<p class="encadre-titre" style="background:{fond};color:{encre}">{icone} {titre}</p>'
                f'<div class="encadre-corps">{texte}</div></div>')

    @staticmethod
    def appel(titre_activite, texte, cartes):
        """Diapo d'appel d'une activité : pastille « À vous de jouer ! » et cartes."""
        c = "".join(f'<div class="carte orange"><h3>{t}</h3>{v}</div>' for t, v in cartes)
        return (f'<p class="pastille">À vous de jouer !</p><h3 class="activite">{titre_activite}</h3>'
                f'<p>{texte}</p><div class="cartes">{c}</div>')

    @staticmethod
    def chrono(minutes):
        """Un compte à rebours facultatif : rien ne démarre tant qu'on n'a pas cliqué."""
        return (f'<div class="chrono" data-secondes="{minutes * 60}"><span class="chrono-temps">'
                f'{minutes:02d}:00</span><button class="chrono-go">▶ Démarrer</button>'
                f'<button class="chrono-raz">↺</button></div>')

    @staticmethod
    def video(src, legende):
        return (f'<figure class="video"><video controls preload="metadata" src="{src}"></video>'
                f'<figcaption>{legende}</figcaption></figure>')

    @staticmethod
    def cartes(liste, couleur=""):
        return '<div class="cartes">' + "".join(
            f'<div class="carte {couleur}"><h3>{t}</h3>{v}</div>' for t, v in liste) + "</div>"

    # --- écriture -----------------------------------------------------------
    def ecrire(self, chemin, racine_site):
        """`racine_site` : chemin relatif du fichier vers la racine du site."""
        outils = ""
        if self.utilise_outils:
            outils = (f'<link rel="stylesheet" href="{racine_site}stylesheets/snt-internet.css">'
                      f'<script src="{racine_site}javascripts/snt-internet.js" defer></script>')
        html = MODELE.replace("@TITRE@", escape(self.titre)).replace("@OUTILS@", outils) \
                     .replace("@DIAPOS@", "\n".join(self.diapos))
        Path(chemin).write_text(html, encoding="utf-8")
        print(f"{chemin} : {len(self.diapos)} diapos")


MODELE = r"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>@TITRE@</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Red+Hat+Mono:wght@400;600&display=swap" rel="stylesheet">
@OUTILS@
<style>
  :root { --violet: #573D91; --encre: #221A33; --texte: #3E3650; --doux: #6B6480; --fond: #FAF8FC; --orange: #D84315; }
  /* Les outils du site s'appuient sur les variables de Material : on les fournit ici. */
  :root { --md-default-fg-color: #221A33; --md-default-fg-color--light: #6B6480; --md-default-fg-color--lighter: #b9b3c9;
          --md-default-fg-color--lightest: #ece8f4; --md-default-bg-color: #fff; --md-code-bg-color: #f4f1fa; font-size: 30px; }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #14101d; overflow: hidden; font-family: Quicksand, Arial, sans-serif; }
  #scene { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center; }
  .diapo { position: absolute; inset: 0; display: none; overflow: hidden; background: var(--fond); color: var(--texte); }
  .diapo.active { display: flex; flex-direction: column; animation: apparait .35s ease; }
  @keyframes apparait { from { opacity: 0; } }
  aside { display: none; }
  b, strong { color: var(--encre); }
  code { font-family: "Red Hat Mono", monospace; background: #efeaf9; padding: 0 .25em; border-radius: 6px; font-size: .92em; }

  /* couverture et intercalaires */
  .couverture { background: linear-gradient(135deg, #3E2A6E 0%, #573D91 60%, #7A5BB8 100%); color: #F6F2FC; padding: 128px; justify-content: center; gap: 36px; }
  .couverture .surtitre { font-size: 30px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #D6C8F2; }
  .couverture h1 { font-size: 112px; line-height: 1.05; color: #fff; }
  .couverture .sous { font-size: 40px; color: #E3DAF5; max-width: 1400px; line-height: 1.35; }
  .couverture .grand-numero { font-size: 200px; font-weight: 700; color: #B9A6E3; line-height: 1; }
  .couverture .trait { position: absolute; left: 128px; bottom: 112px; width: 220px; height: 8px; background: #FF5722; border-radius: 4px; }

  /* diapo de contenu */
  .contenu { padding: 96px 128px 150px; gap: 36px; }
  .bandeau { position: absolute; left: 0; top: 0; width: 100%; height: 14px; background: linear-gradient(90deg, #573D91, #8E6CC9); }
  .rubrique { font-size: 24px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--violet); }
  .contenu h2 { font-size: 58px; color: var(--encre); line-height: 1.1; margin-top: 8px; }
  .corps { display: flex; flex-direction: column; gap: 30px; font-size: 32px; line-height: 1.4; flex: 1; min-height: 0; }
  .corps > p { max-width: 1600px; }
  .corps ul, .corps ol { padding-left: 1.2em; display: grid; gap: 10px; }
  .pied { position: absolute; left: 128px; bottom: 56px; font-size: 22px; color: var(--doux); }
  .numero { position: absolute; right: 128px; bottom: 56px; font-size: 24px; font-weight: 700; color: var(--violet); }

  /* encadrés et cartes */
  .encadre { background: #fff; border-left: 8px solid; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(34,26,51,.08); }
  .encadre-titre { font-size: 30px; font-weight: 700; padding: 16px 30px; }
  .encadre-corps { padding: 22px 34px 26px; display: grid; gap: 12px; }
  .cartes { display: flex; gap: 26px; align-items: stretch; }
  .carte { flex: 1; background: #fff; padding: 26px 30px; border-radius: 16px; border-top: 6px solid var(--violet); box-shadow: 0 6px 20px rgba(34,26,51,.08); display: grid; gap: 10px; align-content: start; font-size: 27px; }
  .carte h3 { font-size: 32px; color: var(--encre); line-height: 1.2; }
  .carte.orange { border-top-color: var(--orange); }
  .carte.histoire { border-top-color: #E67E22; }
  .carte .annee { font-size: 40px; font-weight: 700; color: #94480F; line-height: 1; }
  .pastille { align-self: start; font-size: 30px; font-weight: 700; color: #fff; background: var(--orange); padding: 8px 26px; border-radius: 999px; }
  h3.activite { font-size: 40px; color: var(--encre); }
  table { border-collapse: collapse; font-size: 25px; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(34,26,51,.08); }
  th { background: var(--violet); color: #fff; text-align: left; padding: 12px 18px; }
  td { padding: 9px 18px; border-bottom: 1px solid #ece8f4; }
  .schema { display: block; margin: 0 auto; max-width: 100%; min-height: 0; object-fit: contain; }
  .corps > .schema { flex: 1; width: 100%; height: 0; }          /* seul ou presque : il prend toute la place */
  .deux > .schema { width: 100%; height: 640px; }
  .deux { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
  .lien { font-size: 34px; font-weight: 700; color: var(--violet); }
  .consigne { font-size: 28px; color: var(--doux); }
  .grand { font-size: 44px; line-height: 1.3; color: var(--encre); font-weight: 600; }

  /* À retenir plein écran */
  .retenir { background: #E5F8FB; color: var(--encre); padding: 128px; justify-content: center; gap: 40px; }
  .retenir-titre { font-size: 36px; font-weight: 700; color: #00697A; letter-spacing: 2px; text-transform: uppercase; }
  .retenir h2 { font-size: 62px; line-height: 1.2; }
  .retenir h2 em { font-style: normal; color: var(--violet); }
  .retenir-texte { font-size: 36px; line-height: 1.45; color: var(--texte); display: grid; gap: 16px; }
  .retenir-texte ul { padding-left: 1.1em; display: grid; gap: 12px; }

  /* outils interactifs dans une diapo */
  .diapo .snt-outil { margin: 0; flex: 1; min-height: 0; overflow: auto; padding: .5em 1em .4em; }
  .diapo .snt-outil .snt-choix { margin: .35em 0; }
  .diapo .snt-outil[data-outil="debit"] .snt-pistes { gap: .15em; margin: .4em 0; }
  .diapo .snt-outil .snt-note { display: none; }
  .diapo .snt-carte svg { max-height: 430px; }
  .diapo .snt-outil[data-outil="routage"] .snt-journal { max-height: 4.6em; }
  .diapo .snt-outil[data-outil="routage"] .snt-consigne { margin-bottom: 0; }
  /* DNS : le schéma à gauche, le navigateur et le journal à droite */
  .diapo .snt-outil[data-outil="dns"] { display: grid; grid-template-columns: 1.55fr 1fr; column-gap: 1em; align-content: start; }
  .diapo .snt-outil[data-outil="dns"] > :nth-child(-n+3) { grid-column: 1 / -1; }
  .diapo .snt-outil[data-outil="dns"] > :nth-child(4) { grid-column: 1; grid-row: 4 / span 2; }
  .diapo .snt-outil[data-outil="dns"] > :nth-child(5) { grid-column: 2; grid-row: 4; }
  .diapo .snt-outil[data-outil="dns"] > :nth-child(6) { grid-column: 2; grid-row: 5; grid-template-columns: 1fr; }
  .diapo .snt-outil[data-outil="dns"] .snt-carte svg { max-height: 420px; }
  .diapo .snt-outil[data-outil="dns"] .snt-navigateur-page { min-height: 0; padding: .6em .8em; }
  .diapo .snt-outil[data-outil="dns"] .snt-journal { max-height: 7em; font-size: .7rem; }
  .diapo .snt-outil[data-outil="p2p"] .snt-carte svg { max-height: 330px; }
  .diapo .snt-outil[data-outil="p2p"] .snt-resultats { display: none; }
  .diapo .snt-outil .snt-consigne { margin-bottom: .3em; }

  /* chronomètre et vidéo */
  .chrono { position: absolute; right: 128px; top: 96px; display: flex; align-items: center; gap: 14px;
            background: #fff; border-radius: 999px; padding: 10px 14px 10px 26px; box-shadow: 0 6px 20px rgba(34,26,51,.12); }
  .chrono-temps { font-family: "Red Hat Mono", monospace; font-size: 44px; font-weight: 600; color: var(--encre); min-width: 150px; }
  .chrono button { font: 700 22px Quicksand, sans-serif; border: 0; border-radius: 999px; padding: 10px 20px; cursor: pointer;
                   background: var(--violet); color: #fff; }
  .chrono .chrono-raz { background: #ece8f4; color: var(--encre); }
  .chrono.fini { background: var(--orange); animation: clignote 1s 3; }
  .chrono.fini .chrono-temps { color: #fff; }
  @keyframes clignote { 50% { transform: scale(1.06); } }
  .video { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .video { width: 100%; }
  .video video { flex: 1; min-height: 0; height: 0; width: 100%; object-fit: contain; border-radius: 16px; background: #000; box-shadow: 0 6px 20px rgba(34,26,51,.15); }
  .video figcaption { font-size: 22px; color: var(--doux); }

  /* barre de progression et aide */
  #progression { position: fixed; left: 0; bottom: 0; height: 5px; background: #FF5722; transition: width .3s; z-index: 2; }
  #aide { position: fixed; right: 14px; bottom: 12px; color: #8a8399; font: 12px Quicksand, sans-serif; opacity: .6; z-index: 2; }
  @media print {
    html, body { overflow: visible; height: auto; background: #fff; }
    #scene { position: static; transform: none !important; width: auto; height: auto; }
    .diapo { position: relative; display: flex !important; width: 1920px; height: 1080px; page-break-after: always; }
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
    document.querySelectorAll("video").forEach((v) => { if (!v.closest(".active")) v.pause(); });
    document.getElementById("progression").style.width = ((i + 1) / diapos.length * 100) + "%";
    history.replaceState(null, "", "#" + (i + 1));
  }
  addEventListener("resize", ajuster);
  addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("input, textarea, select, video")) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); montrer(i + 1); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); montrer(i - 1); }
    else if (e.key === "Home") montrer(0);
    else if (e.key === "End") montrer(diapos.length - 1);
    else if (e.key === "f" || e.key === "F") {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });
  addEventListener("click", (e) => {
    // un clic dans un outil interactif, un lien ou un bouton ne fait pas tourner la page
    if (e.target.closest("a, button, input, label, video, .snt-outil, .chrono")) return;
    montrer(e.clientX > innerWidth / 2 ? i + 1 : i - 1);
  });
  /* Chronomètres : facultatifs, ils ne démarrent qu'au clic. */
  document.querySelectorAll(".chrono").forEach((c) => {
    const total = Number(c.dataset.secondes);
    const affichage = c.querySelector(".chrono-temps"), go = c.querySelector(".chrono-go");
    let reste = total, minuteur = null;
    const peindre = () => {
      affichage.textContent = String(Math.floor(reste / 60)).padStart(2, "0") + ":" + String(reste % 60).padStart(2, "0");
    };
    const arreter = () => { clearInterval(minuteur); minuteur = null; go.textContent = "▶ Reprendre"; };
    go.addEventListener("click", () => {
      if (minuteur) return arreter();
      if (reste === 0) { reste = total; c.classList.remove("fini"); }
      go.textContent = "⏸ Pause";
      minuteur = setInterval(() => {
        reste--; peindre();
        if (reste <= 0) { arreter(); go.textContent = "▶ Démarrer"; c.classList.add("fini"); }
      }, 1000);
    });
    c.querySelector(".chrono-raz").addEventListener("click", () => {
      arreter(); reste = total; peindre(); go.textContent = "▶ Démarrer"; c.classList.remove("fini");
    });
  });

  ajuster();
  montrer(i);
})();
</script>
</body>
</html>
"""

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
# Les encadrés, aux couleurs des diaporamas de NSI : (trait et étiquette, bande teintée, icône, étiquette).
COULEURS = {
    "definition": ("#107FB3", "#E5F1F8", "📘", "Définition"),
    "retenir": ("#0097A7", "#E0F3F5", "⭐", "À retenir"),
    "info": ("#0097A7", "#E0F3F5", "⭐", "Info"),
    "attention": ("#E07800", "#FDEFDD", "⚠️", "Attention"),
    "histoire": ("#D9701E", "#FBEDE1", "🕰️", "Histoire"),
    "methode": ("#2E8B3A", "#E6F3E7", "🛠️", "Méthode"),
    "astuce": ("#00897B", "#DFF2F0", "💡", "Astuce"),
}
# La capsule en haut à droite des diapos.
BADGES = {
    "exemple": ("#107FB3", "Exemple"),
    "resolution": ("#2E8B3A", "Résolution"),
    "jouer": ("#D84315", "À vous de jouer"),
    "exercice": ("#D84315", "Exercice"),
    "exercices": ("#D84315", "Exercices"),
    "correction": ("#2E8B3A", "Correction"),
}
ETOILES = {1: "★☆☆", 2: "★★☆", 3: "★★★"}


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

    def contenu(self, rubrique, titre, corps, notes="", badge=None):
        """Une diapo de contenu. Les diapos d'activité (rubrique « Activité … ») portent
        d'office la capsule « À vous de jouer »."""
        if badge is None and rubrique.startswith("Activité"):
            badge = "jouer"
        capsule = ""
        if badge:
            couleur, texte = BADGES[badge]
            capsule = f'<p class="badge" style="background:{couleur}">{texte}</p>'
        self._page(f'<div class="bandeau"></div><header><p class="rubrique">{rubrique}</p><h2>{titre}</h2></header>'
                   f'{capsule}<div class="corps">{corps}</div>', notes=notes)

    def retenir(self, titre, texte):
        """Une diapo pleine page « À retenir », toujours remplie."""
        self._page(f'<p class="retenir-titre"><span>⭐</span> À retenir</p><h2>{titre}</h2>'
                   f'<div class="retenir-texte">{texte}</div>', "retenir")

    def outil(self, rubrique, titre, nom, consigne=""):
        """Une démonstration en direct, avec l'outil interactif du site."""
        self.utilise_outils = True
        self.contenu(rubrique, titre, (f'<p class="consigne">{consigne}</p>' if consigne else "")
                     + f'<div class="snt-outil" data-outil="{nom}"></div>')

    def exercice(self, partie, numero, titre, niveau, enonce, correction, ordi=False, notes=""):
        """Un exercice de la page « Exercices » du site, en deux diapos : l'énoncé (capsule
        orange), puis sa correction (capsule verte, même titre). Numéro et étoiles du site."""
        support = "💻 sur ordinateur" if ordi else "✏️ sur papier"
        meta = f'<p class="meta"><span class="etoiles">{ETOILES[niveau]}</span> · {support}</p>'
        rubrique = f"{partie} · Exercice {numero}"
        self.contenu(rubrique, titre, meta + enonce, badge="exercice", notes=notes)
        self.contenu(rubrique, titre, correction, badge="correction")

    def exercices(self, partie, liste, notes=""):
        """La diapo d'exercices, comme en NSI : les numéros de la page « Exercices » du site,
        leur niveau et leur thème. `liste` : (numéro, étoiles, thème, sur ordinateur ?)."""
        nums = [n for n, *_ in liste]
        if nums == list(range(nums[0], nums[-1] + 1)) and len(nums) > 2:
            titre = f"Exercices {nums[0]} à {nums[-1]}"
        else:
            titre = "Exercices " + ", ".join(map(str, nums[:-1])) + f" et {nums[-1]}"
        lignes = "".join(f'<tr><td><b>{n}</b></td><td class="etoiles">{ETOILES[e]}</td><td>{t}</td>'
                         f'<td>{"💻" if o else "✏️"}</td></tr>' for n, e, t, o in liste)
        corps = ('<p>Page <b>Exercices</b> du site · correction vérifiée avec le professeur.</p>'
                 '<table class="liste-exos"><tr><th style="width:9%">N°</th><th style="width:14%">Niveau</th>'
                 f'<th>Thème</th><th style="width:10%">Support</th></tr>{lignes}</table>'
                 '<p class="consigne">✏️ sur papier · 💻 sur ordinateur</p>')
        self.contenu(f"{partie} · Exercices", titre, corps, notes=notes, badge="exercices")

    # --- encadrés ------------------------------------------------------------
    @staticmethod
    def encadre(genre, texte, titre="", etiquette=None):
        """Boîte blanche, trait coloré à gauche, bande teintée portant l'étiquette en
        capitales, titre éventuel dessous. Une définition n'a pas de titre."""
        bord, fond, icone, nom = COULEURS[genre]
        tete = (f'<p class="encadre-bande" style="background:{fond};color:{bord}">'
                f'<span>{icone}</span>{etiquette or nom}</p>')
        titre = f'<h3>{titre}</h3>' if titre else ""
        return (f'<div class="encadre" style="border-left-color:{bord}">{tete}'
                f'<div class="encadre-corps">{titre}{texte}</div></div>')

    @staticmethod
    def appel(titre_activite, texte, cartes):
        """Corps d'une diapo d'activité : la situation, puis les consignes en cartes."""
        c = "".join(f'<div class="carte"><h3>{t}</h3>{v}</div>' for t, v in cartes)
        return (f'<div class="situation"><p class="activite">{titre_activite}</p><p>{texte}</p></div>'
                f'<div class="cartes">{c}</div>')

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
  code { font-family: "Red Hat Mono", monospace; background: #F3F0F8; padding: 0 .25em; border-radius: 6px; font-size: .92em; }
  pre code { background: none; padding: 0; font-size: 1em; }

  /* couverture et intercalaires */
  .couverture { background: linear-gradient(135deg, #3E2A6E 0%, #573D91 60%, #7A5BB8 100%); color: #F6F2FC; padding: 128px; justify-content: center; gap: 36px; }
  .couverture .surtitre { font-size: 30px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #D6C8F2; }
  .couverture h1 { font-size: 112px; line-height: 1.05; color: #fff; }
  .couverture .sous { font-size: 40px; color: #E3DAF5; max-width: 1400px; line-height: 1.35; }
  .couverture .grand-numero { font-size: 200px; font-weight: 700; color: #B9A6E3; line-height: 1; }
  .couverture .trait { position: absolute; left: 128px; bottom: 112px; width: 220px; height: 8px; background: #FF5722; border-radius: 4px; }

  /* diapo de contenu (charte des diaporamas de NSI) */
  .contenu { padding: 104px 128px 160px; gap: 40px; }
  .bandeau { position: absolute; left: 0; top: 0; width: 100%; height: 14px; background: linear-gradient(90deg, #573D91, #8E6CC9); }
  header { display: flex; flex-direction: column; gap: 10px; padding-right: 300px; }
  .contenu:has(.chrono) header { padding-right: 460px; }
  .rubrique { font-size: 24px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--violet); }
  .contenu h2 { font-size: 60px; color: var(--encre); line-height: 1.1; }
  .badge { position: absolute; right: 128px; top: 92px; font-size: 24px; font-weight: 700; letter-spacing: 2px;
           text-transform: uppercase; color: #fff; padding: 8px 22px; border-radius: 999px; white-space: nowrap; }
  .corps { display: flex; flex-direction: column; gap: 30px; font-size: 32px; line-height: 1.4; flex: 1; min-height: 0; }
  .corps > p { max-width: 1640px; }
  .corps ul, .corps ol { padding-left: 1.2em; display: grid; gap: 10px; }
  .corps ol ol, .corps ol ul { margin-top: 8px; }
  .pied { position: absolute; left: 128px; bottom: 64px; font-size: 24px; color: var(--doux); }
  .numero { position: absolute; right: 128px; bottom: 64px; font-size: 24px; font-weight: 700; color: var(--violet); }
  .meta { font-size: 28px; color: var(--doux); margin-top: -12px; }
  .meta .etoiles { color: #E07800; letter-spacing: 2px; }
  table.liste-exos { width: 1400px; font-size: 32px; }
  td.etoiles { color: #E07800; letter-spacing: 2px; }

  /* encadrés et cartes : une seule boîte blanche, coins de 20 px */
  .encadre { background: #fff; border-left: 8px solid; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(34,26,51,.07); flex: none; }
  .encadre-bande { display: flex; align-items: center; gap: 12px; padding: 14px 32px; font-size: 24px; font-weight: 700;
                   letter-spacing: 2px; text-transform: uppercase; }
  .encadre-bande span { font-size: 28px; letter-spacing: 0; }
  .encadre-corps { padding: 22px 36px 30px; display: grid; gap: 14px; }
  .encadre-corps h3 { font-size: 34px; color: var(--encre); line-height: 1.25; }
  .cartes { display: flex; gap: 32px; align-items: stretch; }
  .carte { flex: 1; background: #fff; padding: 32px 36px 36px; border-radius: 20px; box-shadow: 0 4px 16px rgba(34,26,51,.07);
           display: grid; gap: 14px; align-content: start; font-size: 30px; }
  .carte h3 { font-size: 34px; color: var(--encre); line-height: 1.2; }
  .situation { display: grid; gap: 10px; background: #fff; padding: 26px 36px 30px; border-radius: 20px; border-left: 8px solid var(--orange);
               box-shadow: 0 4px 16px rgba(34,26,51,.07); }
  .situation .activite { font-size: 34px; font-weight: 700; color: var(--encre); line-height: 1.3; }
  table { border-collapse: collapse; font-size: 28px; line-height: 1.35; align-self: flex-start; }
  th { background: #EAE3F5; color: #3E2A6E; text-align: left; padding: 12px 20px; border: 2px solid rgba(20,20,19,.12); }
  td { background: #fff; padding: 10px 20px; border: 2px solid rgba(20,20,19,.12); vertical-align: top; }
  pre { font-family: "Red Hat Mono", monospace; font-size: 26px; line-height: 1.4; background: #F3F0F8; color: #2A2238;
        padding: 16px 26px; border-radius: 12px; white-space: pre; }
  .schema { display: block; margin: 0 auto; max-width: 100%; min-height: 0; object-fit: contain; }
  .corps > .schema { flex: 1; width: 100%; height: 0; }          /* seul ou presque : il prend toute la place */
  .deux > .schema { width: 100%; height: 640px; }
  .deux { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .lien { font-size: 34px; font-weight: 700; color: var(--violet); }
  .consigne { font-size: 28px; color: var(--doux); }
  .grand { font-size: 44px; line-height: 1.3; color: var(--encre); font-weight: 600; }

  /* À retenir plein écran */
  .retenir { background: #E8F6F8; color: var(--encre); padding: 128px; justify-content: center; gap: 40px; }
  .retenir-titre { display: flex; align-items: center; gap: 16px; font-size: 30px; font-weight: 700; color: #00727E; letter-spacing: 3px; text-transform: uppercase; }
  .retenir-titre span { font-size: 44px; letter-spacing: 0; }
  .retenir h2 { font-size: 60px; line-height: 1.2; }
  .retenir h2 em { font-style: normal; color: var(--violet); }
  .retenir-texte { font-size: 38px; line-height: 1.45; color: var(--texte); display: grid; gap: 16px; }
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
  .chrono { position: absolute; right: 128px; top: 160px; display: flex; align-items: center; gap: 14px;
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

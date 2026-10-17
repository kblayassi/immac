

function definirCouleur() {
  // Récupération des inputs
  var fond = document.getElementById("FondParagraphe");
  var texte = document.getElementById("CouleurParagraphe");
  var importantColor = document.getElementById("CouleurImportant");

  if (!fond || !texte || !importantColor) return;

  // Valeurs par défaut si jamais un input est vide
  if (!fond.value) fond.value = "#ffffff";
  if (!texte.value) texte.value = "#000000";
  if (!importantColor.value) importantColor.value = "#000000";

  // Application aux éléments illustratifs
  var boiteIllustrative = document.getElementById("boiteIllustrative");
  if (boiteIllustrative) {
    boiteIllustrative.style.backgroundColor = fond.value;
    boiteIllustrative.style.color = texte.value;
  }

  var important = document.getElementById("important");
  if (important) {
    important.style.color = importantColor.value;
  }

  // Génération du code CSS (affichage)
  var codeEl = document.getElementById("lecode");
  if (!codeEl) return;

  codeEl.textContent =
    "p {                                 /* Mise en forme des paragraphes */\n" +
    "    background-color: " + fond.value + ";      /* Couleur d'arrière-plan */\n" +
    "    color: " + texte.value + ";                 /* Couleur du texte */\n" +
    "}\n\n" +
    "#important {                         /* Mise en forme des mots importants */\n" +
    "    color: " + importantColor.value + ";                 /* Couleur du texte */\n" +
    "}";
}


function definirBordure(el) {
  // el = l'input/select qui déclenche
  const root = el.closest("#bac_a_sable");
  if (!root) return;

  const choixEpaisseur = root.querySelector("#choixEpaisseur");
  const choixStyle = root.querySelector("#choixStyle");
  const choixCouleur = root.querySelector("#choixCouleur");

  if (!choixEpaisseur || !choixStyle || !choixCouleur) return;

  // valeurs par défaut
  if (!choixEpaisseur.value) choixEpaisseur.value = "0";
  if (!choixStyle.value) choixStyle.value = "none";
  if (!choixCouleur.value) choixCouleur.value = "#000000";

  // update output du range
  const out = root.querySelector(".rangevalue");
  if (out) out.value = choixEpaisseur.value;

  // zone illustrative (celle du bon bac à sable)
  const boiteIllustrative = root.querySelector("#boiteIllustrative");
  if (boiteIllustrative) {
    boiteIllustrative.style.borderWidth = choixEpaisseur.value + "px";
    boiteIllustrative.style.borderStyle = choixStyle.value;
    boiteIllustrative.style.borderColor = choixCouleur.value;
  }

  // code
  const lecode = document.getElementById("lecode_1");
  if (lecode) {
    lecode.textContent =
      "p {                                 /* Mise en forme des paragraphes */\n" +
      "    border-width : " + choixEpaisseur.value + "px;             /* Epaisseur de la bordure en pixels */\n" +
      "    border-style : " + choixStyle.value + ";            /* Apparence de la bordure */\n" +
      "    border-color : " + choixCouleur.value + ";         /* Couleur de la bordure */\n" +
      "}";
  }

  const lecode2 = document.getElementById("lecode2_1");
  if (lecode2) {
    lecode2.textContent =
      "p {                                 /* Mise en forme des paragraphes */\n" +
      "    border : " + choixEpaisseur.value + "px " + choixStyle.value + " " + choixCouleur.value + ";      /* Epaisseur - Apparence - Couleur */\n" +
      "}";
  }
}

function initBordurePlayground() {
  const r = document.querySelector("#bac_a_sable #choixEpaisseur");
  if (!r) return;
  definirBordure(r);
}

if (window.document$?.subscribe) {
  window.document$.subscribe(initBordurePlayground);
} else {
  window.addEventListener("DOMContentLoaded", initBordurePlayground);
}


function definirBordure2(el) {
  const root = el.closest("#bac_a_sable");
  if (!root) return;

  const box = root.querySelector("#boiteIllustrative2");
  const lecode = document.getElementById("lecode_2");
  if (!box || !lecode) return;

  const topW = root.querySelector("#choixEpaisseurHaut");
  const topS = root.querySelector("#choixStyleHaut");
  const topC = root.querySelector("#choixCouleurHaut");

  const rightW = root.querySelector("#choixEpaisseurDroit");
  const rightS = root.querySelector("#choixStyleDroit");
  const rightC = root.querySelector("#choixCouleurDroit");

  const bottomW = root.querySelector("#choixEpaisseurBas");
  const bottomS = root.querySelector("#choixStyleBas");
  const bottomC = root.querySelector("#choixCouleurBas");

  const leftW = root.querySelector("#choixEpaisseurGauche");
  const leftS = root.querySelector("#choixStyleGauche");
  const leftC = root.querySelector("#choixCouleurGauche");

  if (!topW || !topS || !topC || !rightW || !rightS || !rightC || !bottomW || !bottomS || !bottomC || !leftW || !leftS || !leftC) return;

  // Valeurs par défaut
  if (!topW.value) topW.value = "0";   if (!topS.value) topS.value = "none";   if (!topC.value) topC.value = "#000000";
  if (!rightW.value) rightW.value = "0"; if (!rightS.value) rightS.value = "none"; if (!rightC.value) rightC.value = "#000000";
  if (!bottomW.value) bottomW.value = "0"; if (!bottomS.value) bottomS.value = "none"; if (!bottomC.value) bottomC.value = "#000000";
  if (!leftW.value) leftW.value = "0";  if (!leftS.value) leftS.value = "none";  if (!leftC.value) leftC.value = "#000000";

  // Application visuelle
  box.style.borderTop = topW.value + "px " + topS.value + " " + topC.value;
  box.style.borderRight = rightW.value + "px " + rightS.value + " " + rightC.value;
  box.style.borderBottom = bottomW.value + "px " + bottomS.value + " " + bottomC.value;
  box.style.borderLeft = leftW.value + "px " + leftS.value + " " + leftC.value;

  // Code généré
  lecode.textContent =
    "p {                                     /* Mise en forme des paragraphes */\n" +
    "    border-top : " + topW.value + "px " + topS.value + " " + topC.value + ";      /* Epaisseur - Apparence - Couleur */\n" +
    "    border-right : " + rightW.value + "px " + rightS.value + " " + rightC.value + ";    /* Epaisseur - Apparence - Couleur */\n" +
    "    border-bottom : " + bottomW.value + "px " + bottomS.value + " " + bottomC.value + ";   /* Epaisseur - Apparence - Couleur */\n" +
    "    border-left : " + leftW.value + "px " + leftS.value + " " + leftC.value + ";     /* Epaisseur - Apparence - Couleur */\n" +
    "}";
}

function initBordure2Playground() {
  const el = document.querySelector("#bac_a_sable #choixEpaisseurHaut");
  if (!el) return;
  definirBordure2(el);
}

if (window.document$?.subscribe) {
  window.document$.subscribe(initBordure2Playground);
} else {
  window.addEventListener("DOMContentLoaded", initBordure2Playground);
}


function definirBordure3(el) {
  const root = el && el.closest ? el.closest("#bac_a_sable") : document.getElementById("bac_a_sable");
  if (!root) return;

  const choixEpaisseur = root.querySelector("#choixEpaisseurArrondi");
  const choixStyle = root.querySelector("#choixStyleArrondi");
  const choixCouleur = root.querySelector("#choixCouleurArrondi");
  const BBLR = root.querySelector("#choixBBLR");
  const BBRR = root.querySelector("#choixBBRR");
  const BTLR = root.querySelector("#choixBTLR");
  const BTRR = root.querySelector("#choixBTRR");

  if (!choixEpaisseur || !choixStyle || !choixCouleur || !BBLR || !BBRR || !BTLR || !BTRR) return;

  // defaults
  if (!choixEpaisseur.value) choixEpaisseur.value = "0";
  if (!choixStyle.value) choixStyle.value = "none";
  if (!choixCouleur.value) choixCouleur.value = "#000000";
  if (!BBLR.value) BBLR.value = "0";
  if (!BBRR.value) BBRR.value = "0";
  if (!BTLR.value) BTLR.value = "0";
  if (!BTRR.value) BTRR.value = "0";

  // illustration
  const boiteIllustrative = root.querySelector("#boiteIllustrative3");
  if (boiteIllustrative) {
    boiteIllustrative.style.border =
      choixEpaisseur.value + "px " + choixStyle.value + " " + choixCouleur.value;
    boiteIllustrative.style.borderRadius =
      BTLR.value + "px " + BTRR.value + "px " + BBRR.value + "px " + BBLR.value + "px";
  }

  // ⚠️ code blocks sont hors #bac_a_sable -> document.getElementById
  const lecode = document.getElementById("lecode_3");
  if (lecode) {
    lecode.textContent =
      "p {                               /* Mise en forme des paragraphes */\n" +
      "    border : " + choixEpaisseur.value + "px " + choixStyle.value + " " + choixCouleur.value + ";    /* Epaisseur - Apparence - Couleur */\n" +
      "    border-radius : " + BTLR.value + "px " + BTRR.value + "px " + BBRR.value + "px " + BBLR.value + "px;      /* HG HD BD BG */\n" +
      "}";
  }

  const shortcut = document.getElementById("lecode3_shortcut");
  if (shortcut) {
    const allSame = (BTLR.value === BTRR.value && BTRR.value === BBRR.value && BBRR.value === BBLR.value);
    shortcut.textContent = allSame
      ? ("border-radius : " + BTLR.value + "px;")
      : ("border-radius : " + BTLR.value + "px " + BTRR.value + "px " + BBRR.value + "px " + BBLR.value + "px;");
  }
}

function initBordure3Playground() {
  const inp = document.getElementById("choixEpaisseurArrondi");
  if (inp) definirBordure3(inp);
}

if (window.document$?.subscribe) window.document$.subscribe(initBordure3Playground);
else window.addEventListener("DOMContentLoaded", initBordure3Playground);


function definirTexte(el) {
  const root = el && el.closest ? el.closest("#bac_a_sable") : document.getElementById("bac_a_sable");
  if (!root) return;

  const c = root.querySelector("#choixCouleur");
  const t = root.querySelector("#choixTaille");
  const p = root.querySelector("#choixPolice");
  const g = root.querySelector("#choixGraisse");
  const it = root.querySelector("#choixItalique");
  const d = root.querySelector("#choixDecoration");
  const m = root.querySelector("#choixMajuscules");

  const box = root.querySelector("#boiteIllustrative");
  const code = document.getElementById("lecode_texte");
  if (!c || !t || !p || !g || !it || !d || !m || !box || !code) return;

  // defaults (si champs vides)
  if (!c.value) c.value = "#000000";
  if (!t.value) t.value = "11";
  if (!p.value) p.value = "Times New Roman";
  if (!g.value) g.value = "normal";
  if (!it.value) it.value = "normal";
  if (!d.value) d.value = "none";
  if (!m.value) m.value = "normal";

  // appliquer au texte
  box.style.color = c.value;
  box.style.fontSize = t.value + "px";
  box.style.fontFamily = p.value;
  box.style.fontWeight = g.value;
  box.style.fontStyle = it.value;
  box.style.textDecoration = d.value;
  box.style.fontVariant = m.value;

  // code (fidèle au modèle)
  code.textContent =
    "p {                                 /* Mise en forme des paragraphes */\n" +
    "    color : " + c.value + ";                /* Couleur du texte */\n" +
    "    font-size : " + t.value + "px;               /* Taille de la police en pixels */\n" +
    "    font-family : " + p.value + ";  /* Police de caractere */\n" +
    "    font-weight : " + g.value + ";           /* Graisse de la police */\n" +
    "    font-style : " + it.value + ";            /* Apparence de la police */\n" +
    "    text-decoration : " + d.value + ";         /* Decoration de la police */\n" +
    "    font-variant : " + m.value + ";          /* Affichage de la police */\n" +
    "}";
}

// init
function initTextePlayground() {
  document.querySelectorAll("#choixTaille").forEach((inp) => definirTexte(inp));
}
if (window.document$?.subscribe) window.document$.subscribe(initTextePlayground);
else window.addEventListener("DOMContentLoaded", initTextePlayground);


function ombrer(el) {
  const root = el && el.closest ? el.closest("#bac_a_sable") : document.getElementById("bac_a_sable");
  if (!root) return;

  const dxT = root.querySelector("#decalageHorizontalTexte");
  const dyT = root.querySelector("#decalageVerticalTexte");
  const blurT = root.querySelector("#flouTexte");
  const colT = root.querySelector("#couleurOmbreTexte");
  const lineH = root.querySelector("#interligne");

  const dxB = root.querySelector("#decalageHorizontalBoite");
  const dyB = root.querySelector("#decalageVerticalBoite");
  const blurB = root.querySelector("#flouBoite");
  const colB = root.querySelector("#couleurOmbreBoite");

  const box = root.querySelector("#boiteIllustrative2");
  const code = document.getElementById("lecode_ombre");

  if (!dxT || !dyT || !blurT || !colT || !lineH || !dxB || !dyB || !blurB || !colB || !box || !code) return;

  // defaults si vide
  if (dxT.value === "") dxT.value = "0";
  if (dyT.value === "") dyT.value = "0";
  if (blurT.value === "") blurT.value = "0";
  if (!colT.value) colT.value = "#000000";
  if (lineH.value === "") lineH.value = "1.5";

  if (dxB.value === "") dxB.value = "0";
  if (dyB.value === "") dyB.value = "0";
  if (blurB.value === "") blurB.value = "0";
  if (!colB.value) colB.value = "#0000FF";

  // application
  box.style.textShadow = `${dxT.value}px ${dyT.value}px ${blurT.value}px ${colT.value}`;
  box.style.lineHeight = `${lineH.value}`;
  box.style.boxShadow = `${dxB.value}px ${dyB.value}px ${blurB.value}px ${colB.value}`;

  // code css (comme l'original)
  code.textContent =
    "p {                                 /* Mise en forme des paragraphes */\n" +
    "    text-shadow: " + dxT.value + "px " + dyT.value + "px " + blurT.value + "px " + colT.value + ";\n" +
    "    line-height: " + lineH.value + ";\n" +
    "    box-shadow: " + dxB.value + "px " + dyB.value + "px " + blurB.value + "px " + colB.value + ";\n" +
    "}";
}

// init
function initOmbrePlayground() {
  document.querySelectorAll("#decalageHorizontalTexte").forEach((inp) => ombrer(inp));
}
if (window.document$?.subscribe) window.document$.subscribe(initOmbrePlayground);
else window.addEventListener("DOMContentLoaded", initOmbrePlayground);


function definirDimensions(el) {
  const root = el && el.closest ? el.closest("#bac_a_sable") : document.getElementById("bac_a_sable");
  if (!root) return;

  const w = root.querySelector("#choixLargeur");
  const h = root.querySelector("#choixHauteur");
  const bw = root.querySelector("#choixEpaisseur");
  const bs = root.querySelector("#choixStyle");
  const bc = root.querySelector("#choixCouleur");
  const pad = root.querySelector("#choixPadding");
  const mar = root.querySelector("#choixMargin");

  const box = root.querySelector("#boiteIllustrative");
  const code = document.getElementById("lecode_dim");
  if (!w || !h || !bw || !bs || !bc || !pad || !mar || !box || !code) return;

  // Init des valeurs "last valid"
  if (!root.dataset.lastW) root.dataset.lastW = w.value || "450";
  if (!root.dataset.lastH) root.dataset.lastH = h.value || "110";
  if (!root.dataset.lastBW) root.dataset.lastBW = bw.value || "0";
  if (!root.dataset.lastPAD) root.dataset.lastPAD = pad.value || "0";
  if (!root.dataset.lastMAR) root.dataset.lastMAR = mar.value || "0";
  if (!root.dataset.lastBS) root.dataset.lastBS = bs.value || "none";
  if (!root.dataset.lastBC) root.dataset.lastBC = bc.value || "#000000";

  function readNumber(inp, key, fallback) {
    if (inp.value === "") return Number(root.dataset[key] ?? fallback); // l'eleve est en train de taper
    const n = Number(inp.value);
    if (Number.isNaN(n)) return Number(root.dataset[key] ?? fallback);
    root.dataset[key] = String(n);
    return n;
  }

  function readString(inp, key, fallback) {
    if (inp.value === "") return root.dataset[key] ?? fallback;
    root.dataset[key] = inp.value;
    return inp.value;
  }

  const width = readNumber(w, "lastW", 450);
  const height = readNumber(h, "lastH", 110);
  const borderW = readNumber(bw, "lastBW", 0);
  const padding = readNumber(pad, "lastPAD", 0);
  const margin = readNumber(mar, "lastMAR", 0);
  const borderStyle = readString(bs, "lastBS", "none");
  const borderColor = readString(bc, "lastBC", "#000000");

  // Application visuelle
  box.style.width = width + "px";
  box.style.height = height + "px";
  box.style.border = borderW + "px " + borderStyle + " " + borderColor;
  box.style.padding = padding + "px";
  box.style.margin = margin + "px";

  // Code CSS (comme l'original)
  code.textContent =
    "p {                                 /* Mise en forme des paragraphes */\n" +
    "    width : " + width + "px;                  /* Largeur du contenu */\n" +
    "    height : " + height + "px;                 /* Hauteur du contenu */\n" +
    "    border : " + borderW + "px " + borderStyle + " " + borderColor + ";      /* Epaisseur - Apparence - Couleur */\n" +
    "    padding : " + padding + "px;                  /* Espace \"interieur\" */\n" +
    "    margin : " + margin + "px;                   /* Espace \"exterieur\" */\n" +
    "}";
}

// Init (remplit le code au chargement)
function initDimensionsPlayground() {
  document.querySelectorAll("#choixLargeur").forEach((inp) => definirDimensions(inp));
}

if (window.document$?.subscribe) window.document$.subscribe(initDimensionsPlayground);
else window.addEventListener("DOMContentLoaded", initDimensionsPlayground);


function definirFlex(el) {
  const root = el && el.closest ? el.closest("#bac_a_sable") : document.getElementById("bac_a_sable");
  if (!root) return;

  const dir = root.querySelector("#choixDirection");
  const wrap = root.querySelector("#choixWrap");
  const a1 = root.querySelector("#choixAlign1");
  const a2 = root.querySelector("#choixAlign2");

  const box = root.querySelector("#boiteIllustrative");
  const code = document.getElementById("lecode_flex");

  if (!dir || !wrap || !a1 || !a2 || !box || !code) return;

  // defaults si vide
  if (!dir.value) dir.value = "row";
  if (!wrap.value) wrap.value = "nowrap";
  if (!a1.value) a1.value = "flex-start";
  if (!a2.value) a2.value = "flex-start";

  // application
  box.style.border = "1px solid";
  box.style.display = "flex";
  box.style.flexDirection = dir.value;
  box.style.flexWrap = wrap.value;
  box.style.justifyContent = a1.value;
  box.style.alignItems = a2.value;

  // code css (comme l'original)
  code.textContent =
    "#boiteIllustrative {                 /* Mise en forme du conteneur */\n" +
    "    display: flex;\n" +
    "    flex-direction: " + dir.value + ";\n" +
    "    flex-wrap: " + wrap.value + ";\n" +
    "    justify-content: " + a1.value + ";\n" +
    "    align-items: " + a2.value + ";\n" +
    "}";
}

// init
function initFlexPlayground() {
  document.querySelectorAll("#choixDirection").forEach((inp) => definirFlex(inp));
}
if (window.document$?.subscribe) window.document$.subscribe(initFlexPlayground);
else window.addEventListener("DOMContentLoaded", initFlexPlayground);


function _rootFrom(el) {
  return el?.closest?.("[data-hover]") || document.querySelector("[data-hover]");
}

function definirHover(el) {
  var root = _rootFrom(el);
  if (!root) return;

  var choixArrierePlan = root.querySelector("#choixArrierePlan")?.value ?? "";
  var choixCouleur = root.querySelector("#choixCouleur")?.value ?? "#000000";
  var choixEpaisseur = root.querySelector("#choixEpaisseur")?.value ?? "1";
  var choixStyleBordure = "solid";
  var choixGraisse = root.querySelector("#choixGraisse")?.value ?? "normal";
  var choixDecoration = root.querySelector("#choixDecoration")?.value ?? "none";

  var boiteIllustrative = root.querySelector("#boiteIllustrative");
  if (!boiteIllustrative) return;

  boiteIllustrative.style.backgroundImage = choixArrierePlan ? "url(" + choixArrierePlan + ")" : "";
  boiteIllustrative.style.borderColor = choixCouleur;
  boiteIllustrative.style.borderWidth = choixEpaisseur + "px";
  boiteIllustrative.style.borderStyle = choixStyleBordure;
  boiteIllustrative.style.fontWeight = choixGraisse;
  boiteIllustrative.style.textDecoration = choixDecoration;
}

function definirNormal(el) {
  var root = _rootFrom(el);
  if (!root) return;

  var boiteIllustrative = root.querySelector("#boiteIllustrative");
  if (!boiteIllustrative) return;

  boiteIllustrative.style.backgroundImage = "";
  boiteIllustrative.style.borderColor = "black";
  boiteIllustrative.style.borderWidth = "0";
  boiteIllustrative.style.borderStyle = "solid";
  boiteIllustrative.style.fontWeight = "normal";
  boiteIllustrative.style.textDecoration = "none";
}

function affichageHover(el) {
  var root = _rootFrom(el);
  if (!root) return;

  var choixArrierePlan = root.querySelector("#choixArrierePlan")?.value ?? "";
  var choixCouleur = root.querySelector("#choixCouleur")?.value ?? "#000000";
  var choixEpaisseur = root.querySelector("#choixEpaisseur")?.value ?? "1";
  var choixStyleBordure = "solid";
  var choixGraisse = root.querySelector("#choixGraisse")?.value ?? "normal";
  var choixDecoration = root.querySelector("#choixDecoration")?.value ?? "none";

  var lecode = root.querySelector("#lecode");
  if (!lecode) return;

  lecode.textContent =
`p:hover {                           /* Mise en forme lors du survol */
    background-image: ${choixArrierePlan ? `url(${choixArrierePlan})` : "none"};       /* Chemin relatif */
    border: ${choixEpaisseur}px ${choixStyleBordure} ${choixCouleur};      /* Bordure */
    font-weight: ${choixGraisse};            /* Style du texte */
    text-decoration: ${choixDecoration};          /* Decoration du texte */
}`;
}

function initHoverSandbox() {
  document.querySelectorAll("[data-hover]").forEach((root) => {
    definirNormal(root.querySelector("#boiteIllustrative") || root);
    affichageHover(root.querySelector("#choixCouleur") || root);
  });
}

if (window.document$?.subscribe) window.document$.subscribe(initHoverSandbox);
else window.addEventListener("DOMContentLoaded", initHoverSandbox);


window.definirCouleur = definirCouleur;
window.definirBordure = definirBordure;
window.definirBordure2 = definirBordure2;
window.definirBordure3 = definirBordure3;
window.definirTexte = definirTexte;
window.ombrer = ombrer;
window.definirDimensions = definirDimensions;
window.definirFlex = definirFlex;
window.definirHover = definirHover;
window.definirNormal = definirNormal;
window.affichageHover = affichageHover;

if (window.document$?.subscribe) {
  window.document$.subscribe(() => definirCouleur());
} else {
  window.addEventListener("DOMContentLoaded", () => definirCouleur());
}

if (window.document$?.subscribe) {
  window.document$.subscribe(initBordurePlayground);
} else {
  window.addEventListener("DOMContentLoaded", initBordurePlayground);
}
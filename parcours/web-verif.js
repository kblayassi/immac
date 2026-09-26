/* Analyse et validation HTML / CSS pour les parcours « web ».
 *
 * Ce module ne dépend de rien : ni du DOM, ni d'un paquet npm. C'est voulu.
 *   · le navigateur l'importe depuis app.js pour valider le travail de l'élève ;
 *   · le banc de test l'importe depuis tools/parcours/verifier_web.mjs sous Node.
 * Les deux jugent donc exactement pareil.
 *
 * Pourquoi ne pas utiliser DOMParser côté navigateur ? Parce qu'il pardonne tout :
 * il referme les balises oubliées en silence. Or « ton <p> ligne 12 n'est jamais
 * fermé » est précisément ce qu'un élève de Seconde doit s'entendre dire.
 */

/* ============================================================ Vocabulaire HTML */

/* Balises qui ne se ferment pas : écrire </br> est une faute, pas un style. */
export const BALISES_VIDES = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

/* Volontairement large : on ne veut pas crier « balise inconnue » sur du HTML
   parfaitement valide que l'élève aurait trouvé ailleurs. */
export const BALISES_CONNUES = new Set([
  "a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body",
  "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "details",
  "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer",
  "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr",
  "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li",
  "link", "main", "mark", "menu", "meta", "nav", "noscript", "object", "ol",
  "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q",
  "s", "samp", "script", "section", "select", "small", "source", "span", "strong",
  "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot",
  "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr",
  "area", "base", "br", "col",
]);

const BALISES_TEXTE_BRUT = new Set(["script", "style"]);

/* ================================================================ Petits outils */

/* Distance de Levenshtein, bornée : sert à proposer « voulais-tu dire <strong> ? »
   quand l'élève écrit <stron>. */
function distance(a, b) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 9;
  let prec = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cour = [i];
    for (let j = 1; j <= n; j++) {
      cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1,
                         prec[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prec = cour;
  }
  return prec[n];
}

function proche(mot, vocabulaire) {
  let meilleur = null, meilleure = 3;
  for (const candidat of vocabulaire) {
    const d = distance(mot, candidat);
    if (d < meilleure) { meilleure = d; meilleur = candidat; }
  }
  return meilleur;
}

function ligneDe(source, position) {
  let n = 1;
  for (let i = 0; i < position && i < source.length; i++) if (source[i] === "\n") n++;
  return n;
}

/* =================================================================== HTML : lecture */

/* Un nœud élément : { type, nom, attributs, enfants, parent, ligne }
   Un nœud texte   : { type: "texte", valeur, parent, ligne } */
function noeudElement(nom, attributs, ligne) {
  return { type: "element", nom, attributs, enfants: [], parent: null, ligne };
}

/**
 * Lit une source HTML et rend { racine, erreurs, doctype }.
 * Les erreurs sont des { code, ligne, message } rédigés pour un élève.
 */
export function analyserHTML(source) {
  const erreurs = [];
  const racine = noeudElement("#racine", {}, 1);
  const pile = [racine];
  let doctype = false;
  let i = 0;

  const ajouter = (noeud) => {
    const parent = pile[pile.length - 1];
    noeud.parent = parent === racine ? null : parent;
    parent.enfants.push(noeud);
  };

  while (i < source.length) {
    const suivant = source.indexOf("<", i);

    if (suivant < 0) {
      const reste = source.slice(i);
      if (reste.trim()) ajouter({ type: "texte", valeur: reste, parent: null, ligne: ligneDe(source, i) });
      break;
    }
    if (suivant > i) {
      const texte = source.slice(i, suivant);
      if (texte.trim()) ajouter({ type: "texte", valeur: texte, parent: null, ligne: ligneDe(source, i) });
    }
    i = suivant;
    const ligne = ligneDe(source, i);

    /* --- commentaire */
    if (source.startsWith("<!--", i)) {
      const fin = source.indexOf("-->", i + 4);
      if (fin < 0) {
        erreurs.push({ code: "commentaire-ouvert", ligne,
          message: `Ligne ${ligne} : un commentaire est ouvert par <!-- mais n'est jamais refermé par -->.` });
        break;
      }
      i = fin + 3;
      continue;
    }

    /* --- doctype */
    if (/^<!doctype/i.test(source.slice(i, i + 9))) {
      const fin = source.indexOf(">", i);
      if (fin < 0) { erreurs.push({ code: "chevron-ouvert", ligne, message: `Ligne ${ligne} : un chevron < n'est jamais refermé par >.` }); break; }
      doctype = true;
      i = fin + 1;
      continue;
    }

    /* --- balise fermante */
    if (source[i + 1] === "/") {
      const fin = source.indexOf(">", i);
      if (fin < 0) { erreurs.push({ code: "chevron-ouvert", ligne, message: `Ligne ${ligne} : un chevron < n'est jamais refermé par >.` }); break; }
      const nom = source.slice(i + 2, fin).trim().toLowerCase();
      i = fin + 1;

      if (BALISES_VIDES.has(nom)) {
        erreurs.push({ code: "fermeture-inutile", ligne,
          message: `Ligne ${ligne} : la balise <${nom}> ne se ferme pas, </${nom}> n'existe pas. Écris <${nom}> tout seul.` });
        continue;
      }

      const rang = pile.findLastIndex((n) => n.nom === nom);
      if (rang <= 0) {
        erreurs.push({ code: "fermeture-orpheline", ligne,
          message: `Ligne ${ligne} : </${nom}> referme une balise qui n'a jamais été ouverte.` });
        continue;
      }
      for (let k = pile.length - 1; k > rang; k--) {
        erreurs.push({ code: "balise-non-fermee", ligne: pile[k].ligne,
          message: `La balise <${pile[k].nom}> ouverte ligne ${pile[k].ligne} n'est jamais refermée : ` +
                   `on rencontre </${nom}> ligne ${ligne} alors que <${pile[k].nom}> est encore ouverte.` });
      }
      pile.length = rang;
      continue;
    }

    /* --- balise ouvrante */
    const nomTrouve = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(source.slice(i));
    if (!nomTrouve) {
      // Un « < » isolé dans du texte : ce n'est pas une balise.
      ajouter({ type: "texte", valeur: "<", parent: null, ligne });
      i += 1;
      continue;
    }
    const nom = nomTrouve[1].toLowerCase();
    let j = i + nomTrouve[0].length;
    const attributs = {};
    let autoferme = false;
    let ferme = false;

    while (j < source.length) {
      while (j < source.length && /\s/.test(source[j])) j++;
      if (source[j] === ">") { j++; ferme = true; break; }
      if (source[j] === "/" && source[j + 1] === ">") { j += 2; ferme = true; autoferme = true; break; }
      if (j >= source.length) break;

      const nomAttr = /^[^\s=/>]+/.exec(source.slice(j));
      if (!nomAttr) { j++; continue; }
      const cle = nomAttr[0].toLowerCase();
      j += nomAttr[0].length;
      while (j < source.length && /\s/.test(source[j])) j++;

      if (source[j] !== "=") { attributs[cle] = ""; continue; }
      j++;
      while (j < source.length && /\s/.test(source[j])) j++;

      const guillemet = source[j];
      if (guillemet === '"' || guillemet === "'") {
        const fin = source.indexOf(guillemet, j + 1);
        if (fin < 0) {
          erreurs.push({ code: "guillemet-ouvert", ligne,
            message: `Ligne ${ligne} : dans la balise <${nom}>, la valeur de ${cle} commence par ${guillemet} ` +
                     `mais ce guillemet n'est jamais refermé.` });
          j = source.length;
          break;
        }
        attributs[cle] = source.slice(j + 1, fin);
        j = fin + 1;
      } else {
        const brut = /^[^\s>]*/.exec(source.slice(j))[0];
        attributs[cle] = brut;
        j += brut.length;
        erreurs.push({ code: "guillemets-manquants", ligne,
          message: `Ligne ${ligne} : la valeur de l'attribut ${cle} doit être entre guillemets : ${cle}="${brut}".` });
      }
    }

    if (!ferme) {
      erreurs.push({ code: "chevron-ouvert", ligne,
        message: `Ligne ${ligne} : la balise <${nom} est ouverte par < mais n'est jamais refermée par >.` });
      break;
    }

    if (!BALISES_CONNUES.has(nom)) {
      const suggestion = proche(nom, BALISES_CONNUES);
      erreurs.push({ code: "balise-inconnue", ligne,
        message: `Ligne ${ligne} : <${nom}> n'est pas une balise HTML.` +
                 (suggestion ? ` Voulais-tu écrire <${suggestion}> ?` : "") });
    }

    const noeud = noeudElement(nom, attributs, ligne);
    ajouter(noeud);
    i = j;

    if (BALISES_VIDES.has(nom) || autoferme) continue;

    /* <style> et <script> contiennent du texte, pas du HTML : on avale tout
       jusqu'à la fermeture, sinon un sélecteur CSS passerait pour une balise. */
    if (BALISES_TEXTE_BRUT.has(nom)) {
      const fermeture = new RegExp(`</\\s*${nom}\\s*>`, "i").exec(source.slice(i));
      const contenu = fermeture ? source.slice(i, i + fermeture.index) : source.slice(i);
      if (contenu) noeud.enfants.push({ type: "texte", valeur: contenu, parent: noeud, ligne });
      if (!fermeture) {
        erreurs.push({ code: "balise-non-fermee", ligne,
          message: `La balise <${nom}> ouverte ligne ${ligne} n'est jamais refermée.` });
        break;
      }
      i += fermeture.index + fermeture[0].length;
      continue;
    }

    pile.push(noeud);
  }

  for (let k = pile.length - 1; k > 0; k--) {
    erreurs.push({ code: "balise-non-fermee", ligne: pile[k].ligne,
      message: `La balise <${pile[k].nom}> ouverte ligne ${pile[k].ligne} n'est jamais refermée : ` +
               `il manque </${pile[k].nom}>.` });
  }

  return { racine, erreurs, doctype };
}

/* ============================================================ HTML : parcours */

export function tousLesElements(racine) {
  const sortie = [];
  (function descendre(n) {
    for (const enfant of n.enfants || []) {
      if (enfant.type === "element") { sortie.push(enfant); descendre(enfant); }
    }
  })(racine);
  return sortie;
}

/** Texte visible d'un élément, espaces normalisés. */
export function texteDe(noeud) {
  let sortie = "";
  (function descendre(n) {
    if (n.type === "texte") { sortie += n.valeur; return; }
    if (BALISES_TEXTE_BRUT.has(n.nom)) return;
    for (const enfant of n.enfants || []) descendre(enfant);
  })(noeud);
  return sortie.replace(/\s+/g, " ").trim();
}

/* --- Sélecteurs : type, .classe, #id, descendant, enfant direct, liste */

function classesDe(element) {
  return (element.attributs.class || "").trim().split(/\s+/).filter(Boolean);
}

/* Les crochets sont lus en premier, sinon leur contenu se mêlerait aux classes.
   `[class]` sert beaucoup ici : « n'importe quel élément que l'élève a étiqueté ». */
const ATTRIBUT = /\[\s*([a-zA-Z][\w-]*)\s*(?:([~^$*|]?=)\s*"?'?([^\]"']*)"?'?\s*)?\]/g;

function analyserCompose(texte) {
  const compose = { balise: null, id: null, classes: [], attributs: [] };

  const sansCrochets = texte.replace(ATTRIBUT, (_, nom, operateur, valeur) => {
    compose.attributs.push({ nom: nom.toLowerCase(), operateur, valeur });
    return "";
  });

  const jetons = sansCrochets.match(/[#.]?[a-zA-Z0-9_-]+|\*/g) || [];
  for (const jeton of jetons) {
    if (jeton === "*") continue;
    else if (jeton[0] === "#") compose.id = jeton.slice(1);
    else if (jeton[0] === ".") compose.classes.push(jeton.slice(1));
    else compose.balise = jeton.toLowerCase();
  }
  return compose;
}

function correspondCompose(element, compose) {
  if (compose.balise && element.nom !== compose.balise) return false;
  if (compose.id && element.attributs.id !== compose.id) return false;
  const classes = classesDe(element);
  if (!compose.classes.every((c) => classes.includes(c))) return false;
  for (const attr of compose.attributs || []) {
    const valeur = element.attributs[attr.nom];
    if (valeur == null) return false;
    if (attr.operateur === "=" && valeur !== attr.valeur) return false;
    if (attr.operateur === "~=" && !String(valeur).split(/\s+/).includes(attr.valeur)) return false;
    if (attr.operateur === "^=" && !String(valeur).startsWith(attr.valeur)) return false;
    if (attr.operateur === "$=" && !String(valeur).endsWith(attr.valeur)) return false;
    if (attr.operateur === "*=" && !String(valeur).includes(attr.valeur)) return false;
  }
  return true;
}

function analyserSelecteurSimple(texte) {
  // « section > ul li » → [ {compose}, {combinateur:">"} … ] aplati en séquence.
  // Les espaces internes aux crochets sont retirés d'abord, sinon « [class = "x"] »
  // serait découpé comme s'il s'agissait de trois sélecteurs successifs.
  const compact = texte.trim().replace(/\[[^\]]*\]/g, (m) => m.replace(/\s+/g, ""));
  const morceaux = compact.split(/\s*(>)\s*|\s+/).filter((m) => m != null && m !== "");
  const sequence = [];
  for (const m of morceaux) {
    if (m === ">") sequence.push({ enfantDirect: true });
    else sequence.push({ compose: analyserCompose(m) });
  }
  // On recolle : chaque compose porte l'information « mon ancêtre est-il direct ? »
  const etapes = [];
  let direct = false;
  for (const m of sequence) {
    if (m.enfantDirect) { direct = true; continue; }
    etapes.push({ compose: m.compose, direct });
    direct = false;
  }
  return etapes;
}

function correspondSequence(element, etapes) {
  let index = etapes.length - 1;
  if (!correspondCompose(element, etapes[index].compose)) return false;
  let courant = element;
  index--;
  while (index >= 0) {
    const { compose, direct } = etapes[index + 1];
    if (direct) {
      courant = courant.parent;
      if (!courant || !correspondCompose(courant, etapes[index].compose)) return false;
    } else {
      let ancetre = courant.parent, trouve = false;
      while (ancetre) {
        if (correspondCompose(ancetre, etapes[index].compose)) { trouve = true; break; }
        ancetre = ancetre.parent;
      }
      if (!trouve) return false;
      courant = ancetre;
    }
    index--;
    void compose;
  }
  return true;
}

/** Tous les éléments de l'arbre qui répondent au sélecteur. */
export function selectionner(racine, selecteur) {
  const groupes = String(selecteur).split(",").map((s) => s.trim()).filter(Boolean)
    .map(analyserSelecteurSimple).filter((e) => e.length);
  const tous = tousLesElements(racine);
  return tous.filter((el) => groupes.some((etapes) => correspondSequence(el, etapes)));
}

/* ==================================================================== CSS */

/* Restreint à ce qui est enseigné, plus quelques voisines pour ne pas gêner
   l'élève curieux. Sert uniquement à repérer les fautes de frappe. */
export const PROPRIETES_CONNUES = new Set([
  "align-items", "background", "background-color", "background-image", "border",
  "border-bottom", "border-collapse", "border-color", "border-left", "border-radius",
  "border-right", "border-style", "border-top", "border-width", "bottom", "box-shadow",
  "color", "display", "flex", "flex-direction", "float", "font", "font-family",
  "font-size", "font-style", "font-weight", "gap", "height", "justify-content", "left",
  "letter-spacing", "line-height", "list-style", "list-style-type", "margin",
  "margin-bottom", "margin-left", "margin-right", "margin-top", "max-width",
  "min-height", "min-width", "opacity", "overflow", "padding", "padding-bottom",
  "padding-left", "padding-right", "padding-top", "position", "right", "text-align",
  "text-decoration", "text-shadow", "text-transform", "top", "vertical-align",
  "visibility", "white-space", "width", "word-spacing", "z-index",
]);

/* Propriétés qui se transmettent aux éléments contenus : c'est ce qui permet à
   `body { color: brown }` de colorer aussi les paragraphes. */
const HERITEES = new Set([
  "color", "font", "font-family", "font-size", "font-style", "font-weight",
  "letter-spacing", "line-height", "list-style", "list-style-type", "text-align",
  "text-transform", "visibility", "white-space", "word-spacing",
]);

export function normaliserValeur(valeur) {
  return String(valeur).trim().toLowerCase().replace(/\s+/g, " ").replace(/;+$/, "");
}

/** Lit une feuille CSS et rend { regles, erreurs }. */
export function analyserCSS(source) {
  const erreurs = [];
  const regles = [];

  if (/\/\*/.test(source) && !/\*\//.test(source)) {
    erreurs.push({ code: "commentaire-ouvert", ligne: ligneDe(source, source.indexOf("/*")),
      message: "Un commentaire CSS est ouvert par /* mais n'est jamais refermé par */." });
  }
  // On remplace les commentaires par des espaces : les numéros de ligne survivent.
  const s = source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

  let i = 0;
  while (i < s.length) {
    const ouvrante = s.indexOf("{", i);
    if (ouvrante < 0) {
      const reste = s.slice(i).trim();
      if (reste) {
        erreurs.push({ code: "hors-regle", ligne: ligneDe(s, i),
          message: `Ligne ${ligneDe(s, i)} : « ${reste.slice(0, 30)} » est écrit en dehors de toute règle. ` +
                   "Une règle CSS s'écrit sélecteur { propriété : valeur ; }." });
      }
      break;
    }
    const selecteur = s.slice(i, ouvrante).trim();
    const fermante = s.indexOf("}", ouvrante);
    const ligne = ligneDe(s, ouvrante);

    if (fermante < 0) {
      erreurs.push({ code: "accolade-ouverte", ligne,
        message: `Ligne ${ligne} : l'accolade { ouverte après « ${selecteur} » n'est jamais refermée par }.` });
      break;
    }
    if (!selecteur) {
      erreurs.push({ code: "selecteur-vide", ligne,
        message: `Ligne ${ligne} : il manque le sélecteur devant l'accolade { : à qui s'adresse cette règle ?` });
    }
    if (selecteur.includes("}")) {
      erreurs.push({ code: "accolade-en-trop", ligne,
        message: `Ligne ${ligne} : il y a une accolade } en trop avant « ${selecteur.replace(/.*}/, "").trim()} ».` });
    }

    const declarations = [];
    const corps = s.slice(ouvrante + 1, fermante);
    let curseur = ouvrante + 1;                 // pour numéroter chaque déclaration
    for (const morceau of corps.split(";")) {
      const debutMorceau = curseur;
      curseur += morceau.length + 1;
      const brut = morceau.trim();
      if (!brut) continue;
      const coupe = brut.indexOf(":");
      const ligneD = ligneDe(s, debutMorceau + morceau.indexOf(brut[0]));
      if (coupe < 0) {
        erreurs.push({ code: "deux-points-manquants", ligne: ligneD,
          message: `Ligne ${ligneD} : « ${brut} » n'est pas une déclaration. Il faut ` +
                   "deux points entre la propriété et sa valeur, comme dans color : red ;" });
        continue;
      }
      const propriete = brut.slice(0, coupe).trim().toLowerCase();
      const valeur = brut.slice(coupe + 1).trim();
      if (valeur.includes(":")) {
        erreurs.push({ code: "point-virgule-manquant", ligne: ligneD,
          message: `Ligne ${ligneD} : il manque un point-virgule après la valeur de ${propriete} — ` +
                   "deux déclarations se sont collées." });
      }
      if (!PROPRIETES_CONNUES.has(propriete)) {
        const suggestion = proche(propriete, PROPRIETES_CONNUES);
        erreurs.push({ code: "propriete-inconnue", ligne: ligneD,
          message: `Ligne ${ligneD} : ${propriete} n'est pas une propriété CSS.` +
                   (suggestion ? ` Voulais-tu écrire ${suggestion} ?` : "") });
      }
      declarations.push({ propriete, valeur, ligne: ligneD });
    }

    if (selecteur) regles.push({ selecteur, declarations, ligne, ordre: regles.length });
    i = fermante + 1;
  }

  return { regles, erreurs };
}

/* --- Mini-cascade : quelle valeur s'applique vraiment à cet élément ? */

function specificite(selecteur) {
  const sansAttributs = selecteur.replace(/\[[^\]]*\]/g, "");
  const attributs = (selecteur.match(/\[[^\]]*\]/g) || []).length;
  const ids = (sansAttributs.match(/#[a-zA-Z0-9_-]+/g) || []).length;
  const classes = (sansAttributs.match(/\.[a-zA-Z0-9_-]+/g) || []).length;
  const balises = (sansAttributs.replace(/[#.][a-zA-Z0-9_-]+/g, "").match(/[a-zA-Z][a-zA-Z0-9-]*/g) || []).length;
  return ids * 100 + (classes + attributs) * 10 + balises;
}

/**
 * Valeur effective d'une propriété sur un élément : cascade puis héritage.
 * Rend null si rien ne s'applique.
 */
export function valeurEffective(element, propriete, regles, racine) {
  let courant = element;
  while (courant) {
    let gagnant = null;
    const enLigne = analyserCSS(`* { ${courant.attributs.style || ""} }`).regles[0];
    if (enLigne) {
      for (const d of enLigne.declarations) {
        if (d.propriete === propriete) gagnant = { valeur: d.valeur, poids: 1e6, ordre: 1e6 };
      }
    }
    for (const regle of regles) {
      for (const groupe of regle.selecteur.split(",")) {
        const etapes = analyserSelecteurSimple(groupe);
        if (!etapes.length || !correspondSequence(courant, etapes)) continue;
        const poids = specificite(groupe);
        for (const d of regle.declarations) {
          if (d.propriete !== propriete) continue;
          // À spécificité égale, la dernière règle écrite l'emporte.
          const gagne = !gagnant || poids > gagnant.poids ||
                        (poids === gagnant.poids && regle.ordre >= gagnant.ordre);
          if (gagne) gagnant = { valeur: d.valeur, poids, ordre: regle.ordre };
        }
      }
    }
    if (gagnant) return normaliserValeur(gagnant.valeur);
    if (!HERITEES.has(propriete)) return null;
    courant = courant.parent;
  }
  void racine;
  return null;
}

/* ============================================================== Validation */

const MAX_ERREURS_SYNTAXE = 3;

function nomFichierHtml(fichiers) {
  return Object.keys(fichiers).find((n) => /\.html?$/i.test(n)) || Object.keys(fichiers)[0];
}
function nomFichierCss(fichiers) {
  return Object.keys(fichiers).find((n) => /\.css$/i.test(n));
}

/**
 * Valide le travail de l'élève.
 * @param {object} etape    l'étape, dont `validation`
 * @param {object} fichiers { "index.html": "…", "style.css": "…" }
 * @returns {{reussi:boolean, echecs:string[]}}
 */
export function validerWeb(etape, fichiers) {
  const v = etape.validation || {};
  const echecs = [];
  const analyses = {};

  const vides = Object.entries(fichiers).filter(([, src]) => !String(src).trim());
  if (vides.length === Object.keys(fichiers).length) {
    return { reussi: false, echecs: ["Tes fichiers sont vides : commence par écrire quelque chose."] };
  }

  for (const [nom, src] of Object.entries(fichiers)) {
    analyses[nom] = /\.css$/i.test(nom)
      ? { type: "css", ...analyserCSS(src) }
      : { type: "html", ...analyserHTML(src) };
  }

  /* 1. La syntaxe d'abord : tant que le code est cassé, le reste n'a pas de sens. */
  if (!v.tolererErreurs) {
    const syntaxe = [];
    for (const [nom, a] of Object.entries(analyses)) {
      for (const e of a.erreurs) syntaxe.push(`${nom} — ${e.message}`);
    }
    if (syntaxe.length) {
      return {
        reussi: false,
        echecs: syntaxe.slice(0, MAX_ERREURS_SYNTAXE).concat(
          syntaxe.length > MAX_ERREURS_SYNTAXE
            ? [`(et ${syntaxe.length - MAX_ERREURS_SYNTAXE} autre(s) souci(s) de la même famille : corrige déjà ceux-ci.)`]
            : []),
        erreursSyntaxe: syntaxe,
      };
    }
  }

  /* 2. La forme du code : ce qui doit y figurer, ce qui est interdit. */
  const parDefautHtml = nomFichierHtml(fichiers);
  const parDefautCss = nomFichierCss(fichiers);

  // `fichier: "*"` vise tous les fichiers de l'étape : c'est ainsi qu'on traque
  // les emplacements à remplir laissés dans le squelette d'un projet.
  const sources = (regle) => (regle.fichier === "*"
    ? Object.values(fichiers)
    : [fichiers[regle.fichier || parDefautHtml] ?? ""]);

  for (const regle of v.contient || []) {
    const motif = new RegExp(regle.motif, regle.options || "");
    if (!sources(regle).some((src) => motif.test(src))) echecs.push(regle.message);
  }
  for (const regle of v.absent || []) {
    const motif = new RegExp(regle.motif, regle.options || "");
    if (sources(regle).some((src) => motif.test(src))) echecs.push(regle.message);
  }
  if (echecs.length) return { reussi: false, echecs };

  /* 3. La structure de la page. */
  for (const regle of v.elements || []) {
    const nom = regle.fichier || parDefautHtml;
    const a = analyses[nom];
    if (!a || a.type !== "html") { echecs.push(`Le fichier ${nom} est introuvable.`); continue; }

    const trouves = selectionner(a.racine, regle.selecteur);
    const min = regle.min == null ? 1 : regle.min;

    if (trouves.length < min) {
      echecs.push(regle.message ||
        (min === 1
          ? `Il manque ${regle.libelle || `un élément « ${regle.selecteur} »`} dans ${nom}.`
          : `Il faut au moins ${min} ${regle.libelle || `« ${regle.selecteur} »`} dans ${nom} — j'en trouve ${trouves.length}.`));
      continue;
    }
    if (regle.max != null && trouves.length > regle.max) {
      echecs.push(regle.messageMax ||
        `Il y a ${trouves.length} ${regle.libelle || `« ${regle.selecteur} »`} dans ${nom}, c'est trop : ${regle.max} au maximum.`);
      continue;
    }

    // `min: 0` sert à exiger une absence : il n'y a alors rien à inspecter.
    if (!trouves.length) continue;

    /* Les contrôles suivants sont satisfaits dès qu'UN élément les remplit :
       l'élève choisit son contenu, on n'impose que la structure. */
    const verifierUn = (el) => {
      if (regle.texteNonVide && !texteDe(el)) return false;
      if (regle.texteContient && !texteDe(el).toLowerCase().includes(String(regle.texteContient).toLowerCase())) return false;
      if (regle.texteMotif && !new RegExp(regle.texteMotif, regle.texteOptions || "i").test(texteDe(el))) return false;
      if (regle.motsMin && texteDe(el).split(/\s+/).filter(Boolean).length < regle.motsMin) return false;
      for (const attr of regle.attributs || []) {
        const valeur = el.attributs[attr.nom];
        if (valeur == null) return false;
        if (attr.nonVide !== false && !String(valeur).trim()) return false;
        if (attr.motif && !new RegExp(attr.motif, attr.options || "i").test(valeur)) return false;
      }
      for (const dedans of regle.contient || []) {
        if (selectionner(el, dedans.selecteur).length < (dedans.min == null ? 1 : dedans.min)) return false;
      }
      return true;
    };

    if (regle.tous ? !trouves.every(verifierUn) : !trouves.some(verifierUn)) {
      echecs.push(regle.messageDetail || regle.message ||
        `L'élément « ${regle.selecteur} » de ${nom} n'est pas encore complet.`);
    }
  }

  /* 4. Le style effectif : peu importe par quel chemin l'élève y arrive. */
  for (const regle of v.styles || []) {
    const nomCss = regle.css || parDefautCss;
    const nomPage = regle.page || parDefautHtml;
    const aCss = analyses[nomCss];
    const aPage = analyses[nomPage];
    if (!aCss || !aPage) { echecs.push("Il manque un fichier pour vérifier le style."); continue; }

    /* Le CSS écrit dans un <style> de la page compte aussi. */
    const regles = [...aCss.regles];
    for (const balise of selectionner(aPage.racine, "style")) {
      regles.push(...analyserCSS(texteDeBrut(balise)).regles.map((r) => ({ ...r, ordre: r.ordre + regles.length })));
    }

    const cibles = selectionner(aPage.racine, regle.selecteur);
    if (!cibles.length) {
      echecs.push(regle.messageCible || `Aucun élément « ${regle.selecteur} » à styler dans ${nomPage}.`);
      continue;
    }
    const teste = (el) => {
      const valeur = valeurEffective(el, regle.propriete, regles, aPage.racine);
      if (valeur == null) return false;
      if (regle.motif) return new RegExp(regle.motif, regle.options || "i").test(valeur);
      if (regle.valeur != null) return valeur === normaliserValeur(regle.valeur);
      return true;
    };
    if (regle.tous ? !cibles.every(teste) : !cibles.some(teste)) echecs.push(regle.message);
  }

  return echecs.length ? { reussi: false, echecs } : { reussi: true };
}

/* Texte brut d'un <style> : texteDe() l'ignore volontairement. */
function texteDeBrut(noeud) {
  return (noeud.enfants || []).filter((n) => n.type === "texte").map((n) => n.valeur).join("");
}

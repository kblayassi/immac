/* Évaluations — l'énoncé et les propositions d'un QCM, remontrés après coup.
 *
 * Partagé par la copie de l'élève (./copie.js) et la table de correction
 * (./correction.js). L'énoncé vient du sujet, par le barème ou par le rendu :
 * voir construireCopie dans ./copie-corrigee.js.
 */

/* Les énoncés et les propositions sont du HTML, venu du sujet. Une copie, elle,
   arrive d'une base où n'importe qui peut déposer : on n'en garde que les
   balises de mise en forme, sans aucun attribut sinon la classe. */
const BALISES = new Set(["P", "PRE", "CODE", "STRONG", "EM", "B", "I", "U", "UL", "OL", "LI",
  "BR", "SPAN", "SUB", "SUP", "KBD", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
  "H3", "H4"]);

export function html(source) {
  const doc = new DOMParser().parseFromString(`<div>${source || ""}</div>`, "text/html");
  const nettoyer = (noeud) => {
    for (const n of [...noeud.childNodes]) {
      if (n.nodeType === Node.TEXT_NODE) continue;
      if (n.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "STYLE", "TEMPLATE"].includes(n.tagName)) {
        n.remove(); continue;
      }
      nettoyer(n);
      if (!BALISES.has(n.tagName)) { n.replaceWith(...n.childNodes); continue; }
      for (const a of [...n.attributes]) if (a.name !== "class") n.removeAttribute(a.name);
    }
  };
  const racine = doc.body.firstElementChild;
  nettoyer(racine);
  const fragment = document.createDocumentFragment();
  fragment.append(...racine.childNodes);
  return fragment;
}

function elem(balise, classe, texte) {
  const n = document.createElement(balise);
  if (classe) n.className = classe;
  if (texte != null) n.textContent = texte;
  return n;
}

/** L'énoncé d'une question, dans son cadre ; null s'il n'y en a pas. */
export function blocEnonce(source, classe = "enonce copie-enonce") {
  if (!source?.trim()) return null;
  const boite = elem("div", classe);
  boite.appendChild(html(source));
  return boite;
}

/* Toutes les propositions d'un QCM, chacune colorée selon `issue` :
     "juste"    contour et fond verts
     "faux"     contour et fond rouges
     "manquee"  contour vert, sans fond
   La copie de l'élève et la correction ne colorent pas de la même façon
   (voir les deux fonctions ci-dessous) ; les choix de l'élève portent toujours
   la mention « sa réponse » ou « ta réponse ». */
function liste(q, reponse, issueDe, mention) {
  const coches = new Set((Array.isArray(reponse?.choix) ? reponse.choix : [reponse?.choix])
    .filter((i) => typeof i === "number"));
  const bonnes = new Set(Array.isArray(q.correct) ? q.correct
    : typeof q.correct === "number" ? [q.correct] : []);

  const bloc = elem("div");
  if (!coches.size) bloc.appendChild(elem("p", "qcm-consigne", "Pas de réponse."));
  const options = elem("div", "qcm qcm-corrige");
  q.options.forEach((texte, i) => {
    const option = elem("div", "qcm-option");
    const issue = issueDe(bonnes.has(i), coches.has(i));
    if (issue) option.dataset.issue = issue;
    option.appendChild(elem("span", "puce", String.fromCharCode(65 + i)));
    const contenu = elem("span", "qcm-texte");
    contenu.appendChild(html(texte));
    option.appendChild(contenu);
    if (coches.has(i)) option.appendChild(elem("span", "ta-reponse", mention));
    options.appendChild(option);
  });
  bloc.appendChild(options);
  return bloc;
}

/** Pour l'élève : en vert les bonnes réponses, en rouge ses choix erronés. */
export function propositionsEleve(q, reponse) {
  return liste(q, reponse, (bonne, cochee) => (bonne ? "juste" : cochee ? "faux" : null), "ta réponse");
}

/** Pour le correcteur : ce que l'élève a coché, rempli de vert si c'est juste
    et de rouge sinon ; la bonne réponse qu'il n'a pas cochée, cerclée de vert. */
export function propositionsCorrection(q, reponse) {
  return liste(q, reponse, (bonne, cochee) =>
    (cochee ? (bonne ? "juste" : "faux") : bonne ? "manquee" : null), "sa réponse");
}

export const qcmDetaille = (q) => q.type === "qcm" && Array.isArray(q.options) && q.options.length > 0;

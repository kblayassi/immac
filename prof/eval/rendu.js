/* Le rendu d'un élève : le format du fichier .json, et rien d'autre.
 *
 * C'est le seul contrat entre les deux moitiés de l'application — la page de
 * composition (eleve.js) l'écrit, la page de correction (correction.js) le lit.
 * Les deux importent ce fichier : le jour où le format bouge, il bouge ici.
 *
 * Un rendu se lit à l'œil nu dans un éditeur de texte. C'est voulu : un fichier
 * qu'on ne peut pas ouvrir est un fichier qu'on ne peut pas vérifier, et
 * l'élève comme l'enseignant doivent pouvoir constater ce qui a été remis.
 */

export const FORMAT = "evaluation/v1";

/* Le chemin du retour — ce que l'enseignant renvoie une fois la copie corrigée —
   a son propre module : ./copie-corrigee.js. Ce n'est plus un rendu.
*/

/* ------------------------------------------------------------- Empreinte

   Une somme de contrôle sur tout le rendu sauf elle-même. Elle repère un
   fichier retouché après coup : ouvrir le .json, changer une réponse et
   enregistrer casse l'empreinte, et la page de correction le dit.

   Ce qu'elle ne fait PAS : résister à quelqu'un qui lit cette page. L'algorithme
   est public, donc recalculable. C'est un scellé, pas un coffre : il rend la
   retouche visible, il ne l'empêche pas. Le vrai garde-fou reste la surveillance
   en salle — et le journal, beaucoup plus difficile à refabriquer de façon
   cohérente qu'une réponse. */

/* JSON canonique : clés triées, sinon deux sérialisations du même objet
   donneraient deux empreintes différentes selon l'ordre d'écriture. */
function canonique(valeur) {
  if (Array.isArray(valeur)) return "[" + valeur.map(canonique).join(",") + "]";
  if (valeur && typeof valeur === "object") {
    return "{" + Object.keys(valeur).sort()
      .map((c) => JSON.stringify(c) + ":" + canonique(valeur[c]))
      .join(",") + "}";
  }
  return JSON.stringify(valeur ?? null);
}

export async function empreinte(rendu) {
  const { empreinte: _, ...reste } = rendu;
  const octets = new TextEncoder().encode(canonique(reste));
  // crypto.subtle exige une origine sûre : https, ou localhost pour les essais.
  if (!globalThis.crypto?.subtle) return null;
  const somme = await crypto.subtle.digest("SHA-256", octets);
  return [...new Uint8Array(somme)].map((o) => o.toString(16).padStart(2, "0")).join("");
}

export async function sceller(rendu) {
  return { ...rendu, empreinte: await empreinte(rendu) };
}

/** true / false / null quand l'empreinte n'a pas pu être calculée des deux côtés. */
export async function scelleIntact(rendu) {
  if (!rendu?.empreinte) return null;
  const attendue = await empreinte(rendu);
  return attendue == null ? null : attendue === rendu.empreinte;
}

/* ------------------------------------------------------------------ Lecture */

export function estUnRendu(objet) {
  return !!objet && typeof objet === "object" &&
         String(objet.format || "").startsWith("evaluation/") &&
         !!objet.reponses;
}

/* Nom affiché dans les tableaux de correction. Un rendu anonyme reste corrigible :
   l'enseignant reconnaîtra le fichier, pas la peine de refuser de l'ouvrir. */
export function nomAffiche(rendu) {
  const nom = (rendu?.eleve?.nom || "").trim().toUpperCase();
  const prenom = (rendu?.eleve?.prenom || "").trim();
  return [nom, prenom].filter(Boolean).join(" ") || "(sans nom)";
}

export function duree(secondes) {
  const s = Math.max(0, Math.round(secondes || 0));
  const m = Math.floor(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`
                 : `${m} min ${String(s % 60).padStart(2, "0")}`;
}

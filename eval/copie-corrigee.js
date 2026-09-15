/* La copie corrigée : le chemin du retour.
 *
 * Une fois le paquet noté, l'enseignant renvoie à chaque élève un fichier qui
 * n'est plus son devoir mais son compte rendu — ses réponses, ses points
 * question par question, les annotations, la note et l'appréciation. L'élève
 * l'ouvre dans eval/copie.html.
 *
 * Ce module tient deux choses, et aucune interface :
 *   — l'arithmétique des retouches : ce que l'enseignant a corrigé à la main
 *     l'emporte, à chaque étage, sur ce que le barème a proposé ;
 *   — la fabrication du fichier.
 * Sans DOM, donc éprouvable au banc (tools/evaluations/verifier_bareme.mjs).
 */

export const FORMAT_COPIE = "copie/v1";

export function estUneCopie(objet) {
  return !!objet && typeof objet === "object" &&
         String(objet.format || "").startsWith("copie/") &&
         Array.isArray(objet.questions);
}

/* ------------------------------------------------------- Les retouches

   `retouches` est ce que l'enseignant a saisi : { questions: {id: points},
   annotations: {id: texte}, note, commentaire }. Une valeur absente ou vide
   veut dire « je laisse le barème décider » — ce n'est pas la même chose
   qu'un zéro, d'où les comparaisons explicites. */

const posee = (v) => v != null && v !== "";

export function pointsRetenus(retouches, question) {
  const saisie = retouches?.questions?.[question.id];
  return posee(saisie) ? Number(saisie) : question.points;
}

export function totalRetenu(retouches, note) {
  return note.questions.reduce((s, q) => s + pointsRetenus(retouches, q), 0);
}

/* La note que donne le barème, une fois les points de chaque question retenus. */
export function noteCalculee(retouches, note, bareme) {
  if (!note.max) return 0;
  const pas = bareme.arrondi ?? 0.25;
  const brute = (totalRetenu(retouches, note) / note.max) * (bareme.noteSur ?? note.max);
  return Math.round(brute / pas) * pas;
}

/* …et celle qui compte. Additionner des points ne fait pas toujours une note :
   une copie peut valoir plus que la somme de ses cases, ou moins. Le dernier mot
   revient à l'enseignant, à cet étage-là comme à celui de chaque question. */
export function noteRetenue(retouches, note, bareme) {
  const saisie = retouches?.note;
  return posee(saisie) ? Number(saisie) : noteCalculee(retouches, note, bareme);
}

/* ------------------------------------------------------------- Le fichier */

/* Le détail des critères y figure : c'est la justification des points, et un
   barème montré après coup est un barème qui instruit. */
export function construireCopie({ rendu, note, retouches, bareme }) {
  return {
    format: FORMAT_COPIE,
    evaluation: {
      cle: rendu.evaluation?.cle,
      titre: rendu.evaluation?.titre,
    },
    eleve: { ...rendu.eleve },
    corrigeLe: new Date().toISOString(),
    note: {
      valeur: noteRetenue(retouches, note, bareme),
      sur: bareme.noteSur ?? note.max,
      total: totalRetenu(retouches, note),
      max: note.max,
    },
    appreciation: retouches?.commentaire || "",
    questions: note.questions.map((q) => ({
      id: q.id,
      titre: q.titre || q.id,
      type: q.type,
      points: pointsRetenus(retouches, q),
      max: q.max,
      annotation: retouches?.annotations?.[q.id] || "",
      reponse: q.reponse || null,
      criteres: (q.criteres || []).map((c) => ({
        libelle: c.libelle, points: c.points, max: c.max, ok: c.ok,
      })),
    })),
  };
}

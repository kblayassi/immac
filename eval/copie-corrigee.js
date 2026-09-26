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

   `retouches` est ce que l'enseignant a saisi : { criteres: {id: {rang: bool}},
   questions: {id: points}, annotations: {id: texte}, note, commentaire }. Une
   valeur absente ou vide veut dire « je laisse le barème décider » — ce n'est
   pas la même chose qu'un zéro, d'où les comparaisons explicites.

   Trois étages, du plus fin au plus large, et chacun l'emporte sur ce qu'il
   recouvre : le verdict sur un critère, les points d'un exercice, la note. */

const posee = (v) => v != null && v !== "";

/* Les critères d'une question, avec le verdict de l'enseignant quand il en a
   rendu un. Ce verdict est soit un booléen — rempli, tous les points ; manqué,
   aucun —, soit un nombre de points, entre 0 et le maximum du critère, pour
   une réussite partielle. `ok` vaut alors null : ni vert, ni rouge. `retouche`
   dit si c'est l'enseignant qui a parlé, ou le barème. */
export function criteresRetenus(retouches, question) {
  const verdicts = retouches?.criteres?.[question.id] || {};
  return (question.criteres || []).map((c, rang) => {
    const v = verdicts[rang];
    if (typeof v === "boolean") return { ...c, ok: v, points: v ? c.max : 0, retouche: true };
    if (typeof v === "number" && Number.isFinite(v)) {
      const points = Math.min(c.max, Math.max(0, v));
      const ok = points >= c.max ? true : points <= 0 ? false : null;
      return { ...c, ok, points, retouche: true };
    }
    return { ...c, retouche: false };
  });
}

/* Ce que vaut une question d'après ses critères. Sans aucun verdict retouché,
   c'est exactement le calcul du barème — on ne refait pas une addition qui
   pourrait différer de la sienne d'un arrondi. */
export function pointsProposes(retouches, question) {
  const retenus = criteresRetenus(retouches, question);
  if (!retenus.some((c) => c.retouche)) return question.points;
  return retenus.reduce((s, c) => s + c.points, 0);
}

export function pointsRetenus(retouches, question) {
  const saisie = retouches?.questions?.[question.id];
  return posee(saisie) ? Number(saisie) : pointsProposes(retouches, question);
}

export function totalRetenu(retouches, note) {
  return note.questions.reduce((s, q) => s + pointsRetenus(retouches, q), 0);
}

/* Les questions que seul l'enseignant peut noter — les réponses rédigées — et
   qu'il n'a pas encore notées. N'attendent rien : une question absente du
   barème (max 0), et une réponse laissée vide, qui vaut zéro sans qu'on ait à
   le taper copie après copie. */
export function questionsANoter(retouches, note) {
  return note.questions.filter((q) => q.manuel && q.max > 0 && !q.vide &&
                                      !posee(retouches?.questions?.[q.id]));
}

/* Une note n'existe qu'une fois complète. Tant qu'une réponse rédigée attend ses
   points, le total compte cette question pour zéro : l'afficher comme une note
   serait donner un chiffre faux. Une note finale tapée par l'enseignant, elle,
   vaut décision, et suffit. */
export function noteComplete(retouches, note) {
  return posee(retouches?.note) || questionsANoter(retouches, note).length === 0;
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
      // Le verdict retenu, pas celui du barème : l'élève lit la correction de
      // son professeur. `retouche` le signale sans le mettre en avant.
      criteres: criteresRetenus(retouches, q).map((c) => ({
        libelle: c.libelle, points: c.points, max: c.max, ok: c.ok,
        ...(c.retouche ? { retouche: true } : {}),
      })),
    })),
  };
}

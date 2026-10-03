/* Évaluation à blanc — le sujet.
 *
 * Elle n'évalue personne : elle sert à essayer le dispositif de bout en bout,
 * en cinq minutes. Elle est CORRIGÉE AUTOMATIQUEMENT à la remise (eleve.js,
 * AUTOCORRIGEES) : l'élève peut donc essayer aussi la consultation de sa copie.
 * D'où aucune réponse rédigée — q4, qui en était une, a été remplacée le
 * 03/10/2026 par le QCM q5 (on ne réutilise pas un id).
 *
 * Son barème, tools/evaluations/bareme-eval-blanc.json, est publié tel quel dans
 * docs/eval-blanc/bareme.json pour que la page corrige : il ne cache rien. Le
 * banc vérifie que les deux fichiers sont identiques.
 *
 * CE FICHIER EST PUBLIÉ. Il ne doit donc contenir aucune attente : ni sortie
 * attendue, ni motif à retrouver dans le code, ni bonne réponse de QCM. Un élève
 * qui ouvre la console ne doit rien y trouver de plus que ce que l'énoncé dit.
 *
 * Les quatre types :
 *   document  un texte à lire, jamais noté (énoncé commun, rappel, annexe)
 *   code      un éditeur Python, exécutable, jamais validé
 *   qcm       une liste de propositions ; `multiple: true` pour en cocher plusieurs
 *   texte     une réponse rédigée, corrigée à la main ou par mots-clés
 */

export const EVALUATION = {
  cle: "eval-blanc",
  titre: "Évaluation à blanc",
  surTitre: "Essai du dispositif",
  niveau: "NSI Première",
  dureeMinutes: 5,

  consignes: `
    <p>Cette évaluation ne compte pas. Elle sert à vérifier que tout fonctionne :
    le chronomètre, l'éditeur, et surtout le fichier que tu remettras à la fin.</p>
    <p>Réponds n'importe quoi si tu veux — ce qu'on regarde, c'est que le fichier
    arrive bien jusqu'à ton professeur.</p>`,
};

export const QUESTIONS = [

  {
    id: "intro",
    type: "document",
    titre: "Avant de commencer",
    contenu: `
      <p>Les quatre questions ci-dessous sont toutes accessibles dès maintenant :
      tu peux les traiter dans l'ordre que tu veux, revenir en arrière, changer
      une réponse. Rien ne se verrouille avant la fin du temps.</p>
      <p>Le bouton <strong>▶ Exécuter</strong> lance ton programme et affiche ce
      qu'il écrit. Il ne dit pas si c'est juste : c'est à toi d'en juger.</p>`,
  },

  {
    id: "q1",
    type: "code",
    titre: "Afficher un message",
    points: 4,
    enonce: `
      <p>Écris un programme qui affiche exactement :</p>
      <pre class="bloc-code"><code>Bonjour</code></pre>`,
    depart: "",
  },

  {
    id: "q2",
    type: "code",
    titre: "La somme des dix premiers entiers",
    points: 6,
    enonce: `
      <p>Complète le programme pour qu'il calcule la somme
      <code>1 + 2 + … + 10</code> à l'aide d'une boucle, puis l'affiche.</p>
      <p>Le résultat attendu est un seul nombre, sans phrase autour.</p>`,
    depart: "somme = 0\n\n",
  },

  {
    id: "q3",
    type: "qcm",
    titre: "Le type d'une valeur",
    points: 2,
    enonce: `
      <p>Quel est le type de la valeur rangée dans <code>x</code> après cette
      instruction ?</p>
      <pre class="bloc-code"><code>x = "12"</code></pre>`,
    options: [
      { texte: "<code>int</code>" },
      { texte: "<code>float</code>" },
      { texte: "<code>str</code>" },
      { texte: "<code>bool</code>" },
    ],
  },

  {
    id: "q5",
    type: "qcm",
    titre: "À quoi sert l'indentation",
    points: 3,
    enonce: `
      <p>En Python, à quoi sert l'<strong>indentation</strong> (le décalage des
      lignes vers la droite) ?</p>`,
    options: [
      { texte: "À rendre le code plus joli, sans autre effet" },
      { texte: "À délimiter les blocs : ce qui est dans une boucle, un <code>if</code> ou une fonction" },
      { texte: "À accélérer l'exécution du programme" },
      { texte: "À rien : Python ne la lit pas" },
    ],
  },

];

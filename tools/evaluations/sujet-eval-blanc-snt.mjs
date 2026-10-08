/* Évaluation à blanc de SNT Seconde — le sujet.
 *
 * Comme l'évaluation à blanc de NSI Première (sujet-eval-blanc.mjs) : elle
 * n'évalue personne, se repasse à volonté (eleve.js, estBlanche) et se corrige
 * toute seule à la remise. L'élève lit sa correction aussitôt. D'où aucune
 * réponse rédigée.
 *
 * Contenu : la partie 1 du parcours Python (séances 1 et 2), en très basique —
 * le niveau voulu pour la SNT (voir sujet-eval-snt-p1.mjs). Un code de départ
 * laissé tel quel vaut 0.
 *
 * Son barème, bareme-eval-blanc-snt.json, est publié tel quel dans
 * docs/eval-blanc-snt/bareme.json pour que la page corrige : il ne cache rien.
 *
 * CE FICHIER EST PUBLIÉ. Il ne doit donc contenir aucune attente : ni sortie
 * attendue, ni motif à retrouver dans le code, ni bonne réponse de QCM.
 */

export const EVALUATION = {
  cle: "eval-blanc-snt",
  titre: "Évaluation à blanc — SNT",
  surTitre: "SNT · Seconde · Entraînement",
  niveau: "SNT Seconde",
  dureeMinutes: 10,
  retour: { href: "../SNT/Evaluations/" },

  consignes: `
    <p>Cette évaluation <strong>ne compte pas</strong>. Elle sert à t'entraîner
    avant un vrai devoir : le chronomètre, l'éditeur, la remise.</p>
    <p>Tu peux la passer <strong>autant de fois que tu veux</strong>. Dès que tu
    l'as rendue, elle est corrigée et tu peux lire ta correction.</p>`,
};

export const QUESTIONS = [

  {
    id: "intro",
    type: "document",
    titre: "Avant de commencer",
    contenu: `
      <p>Les cinq questions ci-dessous sont toutes accessibles dès maintenant :
      tu peux les traiter dans l'ordre que tu veux, revenir en arrière, changer
      une réponse.</p>
      <p>Le bouton <strong>▶ Exécuter</strong> lance ton programme et affiche ce
      qu'il écrit. Il ne dit pas si c'est juste : c'est à toi d'en juger, comme
      pendant un vrai devoir.</p>`,
  },

  {
    id: "q1",
    type: "qcm",
    titre: "Avec ou sans guillemets",
    points: 1,
    enonce: `
      <p>Qu'affiche ce programme ?</p>
      <pre class="bloc-code"><code>print("2 + 3")</code></pre>`,
    options: [
      { texte: "<code>5</code>" },
      { texte: "<code>2 + 3</code>" },
      { texte: "<code>\"2 + 3\"</code>, avec les guillemets" },
      { texte: "Une erreur" },
    ],
  },

  {
    id: "q2",
    type: "qcm",
    titre: "Une variable qui change",
    points: 1,
    enonce: `
      <p>Qu'affiche ce programme ?</p>
      <pre class="bloc-code"><code>a = 4
b = a + 1
a = 10
print(b)</code></pre>`,
    options: [
      { texte: "<code>4</code>" },
      { texte: "<code>5</code>" },
      { texte: "<code>10</code>" },
      { texte: "<code>11</code>" },
    ],
  },

  {
    id: "q3",
    type: "code",
    titre: "Afficher un message",
    points: 2,
    enonce: `
      <p>Écris un programme qui affiche exactement :</p>
      <pre class="bloc-code"><code>Bienvenue en SNT !</code></pre>`,
    depart: "",
  },

  {
    id: "q4",
    type: "code",
    titre: "L'aire d'un rectangle",
    points: 3,
    enonce: `
      <p>Complète le programme pour qu'il affiche l'aire du rectangle, sous la
      forme :</p>
      <pre class="bloc-code"><code>Aire : …</code></pre>
      <p>C'est Python qui doit faire le calcul, à partir des deux variables :
      n'écris pas le résultat toi-même.</p>`,
    depart: "longueur = 7\nlargeur = 3\n\n",
  },

  {
    id: "q5",
    type: "qcm",
    titre: "Ranger une valeur",
    points: 1,
    enonce: `
      <p>Quelle instruction range la valeur <code>15</code> dans une variable
      nommée <code>score</code> ?</p>`,
    options: [
      { texte: "<code>15 = score</code>" },
      { texte: "<code>score = 15</code>" },
      { texte: "<code>score == 15</code>" },
      { texte: "<code>print(score, 15)</code>" },
    ],
  },

];

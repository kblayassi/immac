/* Évaluation à blanc de NSI Terminale — le sujet.
 *
 * Comme l'évaluation à blanc de NSI Première (sujet-eval-blanc.mjs) : elle
 * n'évalue personne, se repasse à volonté (eleve.js, estBlanche) et se corrige
 * toute seule à la remise. L'élève lit sa correction aussitôt. D'où aucune
 * réponse rédigée.
 *
 * Contenu : le chapitre 1, « Listes, piles et files », avec les conventions du
 * parcours — tout en fonctions, snake_case, et des clients qui n'utilisent que
 * l'interface (les tests redéfinissent l'implémentation pour le vérifier).
 *
 * Son barème, bareme-eval-blanc-nsi-term.json, est publié tel quel dans
 * docs/eval-blanc-nsi-term/bareme.json pour que la page corrige : il ne cache rien.
 *
 * CE FICHIER EST PUBLIÉ. Il ne doit donc contenir aucune attente : ni sortie
 * attendue, ni motif à retrouver dans le code, ni bonne réponse de QCM.
 */

export const EVALUATION = {
  cle: "eval-blanc-nsi-term",
  titre: "Évaluation à blanc — NSI Terminale",
  surTitre: "NSI · Terminale · Entraînement",
  niveau: "NSI Terminale",
  dureeMinutes: 15,
  retour: { href: "../NSI_Terminale/Evaluations/" },

  consignes: `
    <p>Cette évaluation <strong>ne compte pas</strong>. Elle sert à t'entraîner
    avant un vrai devoir : le chronomètre, l'éditeur, la remise.</p>
    <p>Tu peux la passer <strong>autant de fois que tu veux</strong>. Dès que tu
    l'as rendue, elle est corrigée et tu peux lire ta correction.</p>
    <p>Comme au devoir, <strong>tes fonctions n'utilisent que l'interface</strong>
    de la structure : elles seront aussi essayées sur une autre implémentation.</p>`,
};

const PILE = `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----

def pile_vide():
    return []

def est_vide(p):
    return p == []

def empiler(p, element):
    p.append(element)

def depiler(p):
    return p.pop()
`;

const FILE = `# ---- L'implémentation « tête en début ». N'y touche pas. ----

def file_vide():
    return []

def est_vide(f):
    return f == []

def enfiler(f, element):
    f.append(element)

def defiler(f):
    return f.pop(0)
`;

export const QUESTIONS = [

  {
    id: "intro",
    type: "document",
    titre: "Avant de commencer",
    contenu: `
      <p>Les cinq questions ci-dessous sont toutes accessibles dès maintenant :
      tu peux les traiter dans l'ordre que tu veux, revenir en arrière, changer
      une réponse.</p>
      <p>Les QCM 1 et 2 emploient les interfaces du cours :
      <code>pile_vide</code>, <code>est_vide</code>, <code>empiler</code>,
      <code>depiler</code> pour une pile ; <code>file_vide</code>,
      <code>est_vide</code>, <code>enfiler</code>, <code>defiler</code> pour une
      file.</p>`,
  },

  {
    id: "q1",
    type: "qcm",
    titre: "Une pile à la trace",
    points: 1,
    enonce: `
      <p>Qu'affiche ce programme ?</p>
      <pre class="bloc-code"><code>p = pile_vide()
empiler(p, 1)
empiler(p, 2)
empiler(p, 3)
depiler(p)
empiler(p, 4)
print(depiler(p), depiler(p))</code></pre>`,
    options: [
      { texte: "<code>4 2</code>" },
      { texte: "<code>2 4</code>" },
      { texte: "<code>1 4</code>" },
      { texte: "<code>4 3</code>" },
    ],
  },

  {
    id: "q2",
    type: "qcm",
    titre: "Une file à la trace",
    points: 1,
    enonce: `
      <p>Qu'affiche ce programme ?</p>
      <pre class="bloc-code"><code>f = file_vide()
enfiler(f, 1)
enfiler(f, 2)
enfiler(f, 3)
defiler(f)
enfiler(f, 4)
print(defiler(f))</code></pre>`,
    options: [
      { texte: "<code>1</code>" },
      { texte: "<code>2</code>" },
      { texte: "<code>3</code>" },
      { texte: "<code>4</code>" },
    ],
  },

  {
    id: "q3",
    type: "qcm",
    titre: "À chaque besoin sa structure",
    points: 1,
    enonce: `
      <p>Un éditeur de texte propose un bouton <strong>Annuler</strong>, qui
      défait la <em>dernière</em> modification, puis celle d'avant, et ainsi de
      suite. Quelle structure range le mieux les modifications ?</p>`,
    options: [
      { texte: "Une pile" },
      { texte: "Une file" },
      { texte: "Un dictionnaire" },
      { texte: "Aucune : il faut un tableau trié" },
    ],
  },

  {
    id: "q4",
    type: "code",
    titre: "Lire le sommet",
    points: 4,
    enonce: `
      <p>Écris la fonction <code>sommet(p)</code>, qui <strong>renvoie</strong>
      l'élément au sommet de la pile <code>p</code>, supposée non vide,
      <strong>sans le retirer</strong> : après l'appel, la pile est la même
      qu'avant.</p>
      <p>Pour la pile où l'on a empilé 3 puis 8, <code>sommet(p)</code> renvoie
      <code>8</code>, et la pile contient toujours 3 et 8.</p>`,
    depart: `${PILE}
def sommet(p):
    pass


# ---- Essais ----
p = pile_vide()
empiler(p, 3)
empiler(p, 8)
print(sommet(p))   # 8
print(depiler(p))  # 8 : le sommet est toujours là
print(depiler(p))  # 3
`,
  },

  {
    id: "q5",
    type: "code",
    titre: "La somme d'une file",
    points: 3,
    enonce: `
      <p>Écris la fonction <code>somme(f)</code>, qui renvoie la somme des
      nombres de la file <code>f</code>. La file peut être vidée au passage ;
      une file vide a pour somme <code>0</code>.</p>
      <p>Pour la file où l'on a enfilé 5, 1 puis 4, <code>somme(f)</code>
      renvoie <code>10</code>.</p>`,
    depart: `${FILE}
def somme(f):
    pass


# ---- Essais ----
f = file_vide()
enfiler(f, 5)
enfiler(f, 1)
enfiler(f, 4)
print(somme(f))            # 10
print(somme(file_vide()))  # 0
`,
  },

];

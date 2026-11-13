/* Bilans de fin de partie du parcours Python de Maths Première.
 * Une fiche par palier qui porte une clé `bilan` dans manifeste.js (même clé).
 * Pas d'exercice ni de correction : ce que l'élève doit savoir faire avant de
 * passer à la suite, avec le code de référence et les pièges.
 */

export default {

  rappels: {
    titre: "Les rappels de Seconde",
    accroche: `Avant d'attaquer les listes, vérifie que tu sais faire tout ce qui suit. Si un
      point te semble flou, revois la séance indiquée : les listes s'appuient sur tout le
      reste.`,
    sections: [
      {
        titre: "Calculer et mémoriser",
        seances: ["s01"],
        savoirs: [
          { sait: "afficher un texte, un calcul, ou plusieurs valeurs à la suite",
            code: `print("L'image de", x, "est", y)` },
          { sait: "traduire une expression mathématique en Python",
            code: `y = 3 * x ** 2 - 5 * x + 2     # 3x² − 5x + 2` },
          { sait: "ranger une valeur dans une variable, et la mettre à jour",
            code: `u = 3\nu = 2 * u + 1                  # u reçoit son ancienne valeur fois 2, plus 1` },
          { sait: "lire un message d'erreur : sa nature (dernière ligne) et son numéro de ligne" },
        ],
        pieges: `<ul>
          <li>oublier le <code>*</code> : <code>5x</code> provoque une <code>SyntaxError</code> ;</li>
          <li>écrire <code>^</code> pour la puissance, ou une virgule pour le point décimal ;</li>
          <li>oublier les parenthèses : <code>a + b / 2</code> ne divise que <code>b</code>.</li>
        </ul>`,
      },
      {
        titre: "Décider",
        seances: ["s02"],
        savoirs: [
          { sait: "comparer deux valeurs avec <code>&lt;</code>, <code>&lt;=</code>, <code>==</code>, <code>!=</code>…" },
          { sait: "choisir entre plusieurs cas avec <code>if</code>, <code>elif</code> et <code>else</code>",
            code: `if delta > 0:\n    print("Deux racines")\nelif delta == 0:\n    print("Une racine double")\nelse:\n    print("Aucune racine réelle")` },
          { sait: "calculer une racine carrée avec <code>sqrt</code>",
            code: `from math import sqrt\nx1 = (-b - sqrt(delta)) / (2 * a)` },
        ],
        pieges: `<ul>
          <li>un seul signe égal dans une condition, ou les deux points oubliés ;</li>
          <li>un bloc mal décalé : l'indentation décide de ce qui est dans le <code>if</code> ;</li>
          <li>l'ordre des <code>elif</code> : seul le premier cas vrai est exécuté.</li>
        </ul>`,
      },
      {
        titre: "Répéter",
        seances: ["s03"],
        savoirs: [
          { sait: "calculer le <em>n</em>-ième terme d'une suite récurrente",
            code: `u = 2\nfor i in range(10):             # de u0 à u10\n    u = 3 * u - 1` },
          { sait: "calculer une somme avec un accumulateur",
            code: `s = 0\nfor k in range(1, 101):        # k de 1 à 100\n    s = s + k` },
          { sait: "trouver un seuil avec une boucle <code>while</code>",
            code: `u = 1000\nn = 0\nwhile u <= 2000:\n    u = 1.05 * u\n    n = n + 1` },
        ],
        pieges: `<ul>
          <li><code>range(1, 100)</code> s'arrête à 99 ;</li>
          <li>l'accumulateur initialisé dans la boucle repart de 0 à chaque tour ;</li>
          <li>la condition du <code>while</code> est celle pour <strong>continuer</strong>.</li>
        </ul>`,
      },
      {
        titre: "Les fonctions",
        seances: ["s04"],
        savoirs: [
          { sait: "définir une fonction qui renvoie un résultat",
            code: `def delta(a, b, c):\n    return b ** 2 - 4 * a * c` },
          { sait: "appeler une fonction, et afficher ce qu'elle renvoie",
            code: `print(delta(2, -3, -5))         # 49` },
          { sait: "écrire une fonction qui contient une boucle ou un <code>if</code>",
            code: `def terme(n):\n    u = 3\n    for i in range(n):\n        u = 2 * u + 1\n    return u` },
        ],
        pieges: `<ul>
          <li><code>print</code> au lieu de <code>return</code> : <code>None</code> apparaît ;</li>
          <li><code>return</code> placé dans la boucle : la fonction s'arrête au premier tour.</li>
        </ul>`,
      },
    ],
    suite: `Tout est clair ? Place aux <strong>listes</strong> : elles vont te permettre de
      garder tous les termes d'une suite, toutes les valeurs d'un tableau, toutes les notes
      d'une série — dans une seule variable.`,
  },

  listes: {
    titre: "Les listes",
    accroche: `C'est ce que le programme de mathématiques de Première demande sur les listes :
      les générer, manipuler leurs éléments et leurs indices, les parcourir. Vérifie chaque
      point avant le défi final.`,
    sections: [
      {
        titre: "Créer une liste et lire ses éléments",
        seances: ["s05"],
        savoirs: [
          { sait: "créer une liste, éventuellement vide",
            code: `termes = [3, 7, 15, 31, 63]\nvide = []` },
          { sait: "lire un élément par son indice, qui commence à 0",
            code: `termes[0]       # 3, c'est-à-dire u0\ntermes[-1]      # 63, le dernier élément` },
          { sait: "obtenir le nombre d'éléments",
            code: `len(termes)     # 5` },
        ],
        pieges: `<ul>
          <li>compter à partir de 1 : le troisième élément est <code>L[2]</code> ;</li>
          <li><code>L[len(L)]</code> : une case de trop, c'est l'<code>IndexError</code> ;</li>
          <li>une suite qui commence à <em>v</em><sub>1</sub> : <em>v<sub>n</sub></em> est à l'indice <em>n</em> − 1.</li>
        </ul>`,
      },
      {
        titre: "Modifier et remplir une liste",
        seances: ["s06"],
        savoirs: [
          { sait: "modifier un élément, ajouter un élément à la fin",
            code: `termes[3] = 31\ntermes.append(127)` },
          { sait: "générer une liste par ajouts successifs",
            code: `termes = []\nu = 1\nfor i in range(8):\n    termes.append(u)\n    u = 2 * u + 3` },
          { sait: "utiliser <code>sum</code>, <code>min</code>, <code>max</code> et <code>in</code>",
            code: `moyenne = sum(notes) / len(notes)` },
        ],
        pieges: `<ul>
          <li><code>L[0] = …</code> sur une liste vide : il faut <code>append</code> ;</li>
          <li><code>L = L.append(…)</code> : la liste devient <code>None</code>.</li>
        </ul>`,
      },
      {
        titre: "Parcourir une liste",
        seances: ["s07"],
        savoirs: [
          { sait: "parcourir une liste par élément, pour calculer ou compter",
            code: `compteur = 0\nfor note in notes:\n    if note >= 10:\n        compteur = compteur + 1` },
          { sait: "parcourir une liste par indice, quand la position compte",
            code: `for i in range(len(termes) - 1):\n    ecarts.append(termes[i + 1] - termes[i])` },
          { sait: "construire une liste à partir d'une autre",
            code: `Y = []\nfor x in X:\n    Y.append(f(x))` },
        ],
        pieges: `<ul>
          <li><code>notes[note]</code> dans un parcours par élément : <code>note</code> est déjà la valeur ;</li>
          <li>le total ou le compteur initialisé dans la boucle.</li>
        </ul>`,
      },
      {
        titre: "Les listes en compréhension",
        seances: ["s08"],
        savoirs: [
          { sait: "construire une liste en compréhension",
            code: `[5 * 3 ** n for n in range(6)]          # termes d'une suite explicite\n[x ** 2 - 1 for x in X]                 # images` },
          { sait: "filtrer une liste avec une condition",
            code: `[k for k in range(1, 61) if 60 % k == 0]    # diviseurs de 60` },
        ],
        pieges: `<ul>
          <li>la condition se place <strong>à la fin</strong>, après le <code>for</code> ;</li>
          <li>pour une suite récurrente, la boucle avec <code>append</code> reste la bonne méthode.</li>
        </ul>`,
      },
    ],
    suite: `Tu as tous les outils. Le <strong>défi final</strong> t'attend : huit programmes
      qui mélangent tout, sur des thèmes du programme de Première.`,
  },
};

/* Bilans de fin de partie.
 *
 * Une fiche par partie du manifeste (clé = id du palier). Elle ne contient ni
 * exercice ni correction : c'est la liste de ce que l'élève doit savoir faire
 * en sortant de la partie, chaque savoir-faire illustré par une ligne de code.
 *
 * Forme d'une fiche :
 *   titre, accroche          en tête de page
 *   sections[]               { titre, seances: ["s01"], savoirs: [{ sait, code? }], pieges? }
 *                              `sait` et `pieges` sont du HTML ; `code` est du texte brut,
 *                              échappé par le moteur.
 *   suite                    le mot de la fin (HTML)
 *
 * Les exemples reprennent ceux des mémos de séance : l'élève doit y reconnaître
 * ce qu'il a déjà écrit, pas découvrir quelque chose de nouveau.
 */

export default {

  /* ================================================================ PARTIE 1 */
  p1: {
    titre: "Premiers programmes et variables",
    accroche: `Les deux premières séances t'ont appris à faire afficher, faire calculer et
      faire retenir des valeurs à l'ordinateur. Voici ce que tu dois savoir faire, sans
      hésiter, avant d'attaquer la partie 2.`,

    sections: [
      {
        titre: "Afficher et calculer",
        seances: ["s01"],
        savoirs: [
          { sait: "afficher un texte, écrit <strong>entre guillemets</strong>",
            code: `print("Bonjour")` },
          { sait: "faire calculer Python avec <code>+</code> <code>-</code> <code>*</code> <code>/</code>",
            code: `print(17 * 24)` },
          { sait: "mélanger texte et calcul dans un même <code>print</code>, en les séparant par des virgules",
            code: `print("Total :", 12 + 5)` },
          { sait: "écrire plusieurs instructions, une par ligne : elles s'exécutent <strong>de haut en bas</strong>" },
          { sait: "laisser une note dans le code avec un commentaire",
            code: `# Python ignore cette ligne` },
          { sait: `lire un message d'erreur et réparer : <code>SyntaxError</code> (phrase mal
              formée), <code>NameError</code> (mot inconnu de Python)` },
        ],
        pieges: `<ul>
            <li>une parenthèse ou un guillemet ouvert doit être refermé ;</li>
            <li><code>print</code> s'écrit en minuscules : <code>Print</code> provoque une <code>NameError</code> ;</li>
            <li><code>print(score)</code> affiche une valeur, <code>print("score")</code> affiche le mot.</li>
          </ul>`,
      },
      {
        titre: "Ranger des valeurs dans des variables",
        seances: ["s02"],
        savoirs: [
          { sait: "créer une variable : <code>nom = valeur</code> se lit « nom <strong>reçoit</strong> valeur »",
            code: `age = 15\nprint("Tu as", age, "ans.")` },
          { sait: "modifier une variable à partir de sa propre valeur",
            code: `score = score + 1` },
          { sait: "échanger le contenu de deux variables",
            code: `temporaire = a\na = b\nb = temporaire` },
          { sait: `choisir un nom lisible : en minuscules, mots séparés par <code>_</code>,
              sans espace, sans chiffre au début`,
            code: `prix_ht = 12.5` },
        ],
      },
      {
        titre: "Les types et les calculs",
        seances: ["s02"],
        savoirs: [
          { sait: "reconnaître les trois types : entier <code>int</code>, décimal <code>float</code>, texte <code>str</code>",
            code: `15        # int\n1.5       # float\n"15"      # str` },
          { sait: "convertir une valeur d'un type à l'autre",
            code: `int("42")      # l'entier 42\nfloat("1.5")   # le décimal 1.5\nstr(42)        # le texte "42"` },
          { sait: "obtenir le <strong>quotient</strong> et le <strong>reste</strong> d'une division euclidienne",
            code: `17 // 5   # 3, le quotient\n17 % 5    # 2, le reste` },
        ],
        pieges: `<ul>
            <li>un décimal s'écrit avec un <strong>point</strong> : <code>1.5</code>, jamais <code>1,5</code> ;</li>
            <li><code>"5" + "3"</code> vaut <code>"53"</code> : entre deux textes, <code>+</code> colle ;</li>
            <li>un nombre plus un texte : <code>TypeError</code>. Il faut convertir.</li>
          </ul>`,
      },
    ],

    suite: `Si un de ces points te fait hésiter, rouvre la séance indiquée et refais
      un ou deux exercices d'application : c'est le moyen le plus rapide de consolider.`,
  },

  /* ================================================================ PARTIE 2 */
  p2: {
    titre: "Dialoguer et décider",
    accroche: `Tes programmes savent maintenant poser des questions, comparer des valeurs
      et choisir quoi faire. Voici ce que tu dois savoir faire avant de passer aux boucles.`,

    sections: [
      {
        titre: "Demander une information",
        seances: ["s03"],
        savoirs: [
          { sait: "demander un texte à l'utilisateur avec <code>input()</code>",
            code: `prenom = input("Ton prénom ? ")` },
          { sait: "demander un nombre, en <strong>convertissant</strong> la saisie",
            code: `n = int(input("Un entier ? "))\nx = float(input("Un décimal ? "))` },
        ],
        pieges: `<code>input()</code> renvoie <strong>toujours du texte</strong>, même si
          l'utilisateur tape un nombre. Sans <code>int(…)</code> ou <code>float(…)</code>,
          aucun calcul n'est possible.`,
      },
      {
        titre: "Comparer et combiner",
        seances: ["s03"],
        savoirs: [
          { sait: `comparer deux valeurs avec <code>==</code> <code>!=</code> <code>&lt;</code>
              <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code> : le résultat est un
              <strong>booléen</strong>, <code>True</code> ou <code>False</code>`,
            code: `print(7 > 3)     # True\nprint(7 == 3)    # False` },
          { sait: "tester si un nombre est un multiple d'un autre, avec le reste",
            code: `n % 3 == 0       # True si n est un multiple de 3` },
          { sait: "combiner des conditions avec <code>and</code>, <code>or</code>, <code>not</code>",
            code: `age >= 12 and age < 18\nnote < 0 or note > 20\nnot (n % 2 == 0)` },
        ],
      },
      {
        titre: "Choisir avec if, elif, else",
        seances: ["s04"],
        savoirs: [
          { sait: "exécuter des instructions <strong>seulement si</strong> une condition est vraie",
            code: `if age >= 18:\n    print("Majeur")` },
          { sait: "traiter les deux cas avec <code>else</code>",
            code: `if n % 2 == 0:\n    print("Pair")\nelse:\n    print("Impair")` },
          { sait: "enchaîner plusieurs cas avec <code>elif</code>, en commençant par le plus restrictif",
            code: `if note >= 16:\n    print("Très bien")\nelif note >= 14:\n    print("Bien")\nelif note >= 10:\n    print("Admis")\nelse:\n    print("Refusé")` },
          { sait: "utiliser une condition composée dans un test, ou placer un test dans un autre" },
        ],
        pieges: `<ul>
            <li>oublier les <strong>deux-points</strong> en fin de ligne ;</li>
            <li>oublier d'<strong>indenter</strong> les instructions du bloc ;</li>
            <li>écrire <code>=</code> (affectation) au lieu de <code>==</code> (comparaison) ;</li>
            <li>mettre une condition après <code>else</code> : il n'en prend jamais.</li>
          </ul>`,
      },
    ],

    suite: `Une méthode qui marche : avant d'écrire un test, énonce la règle à voix haute,
      en français. La traduction en Python suit presque mot à mot.`,
  },

  /* ================================================================ PARTIE 3 */
  p3: {
    titre: "Boucle bornée et boucle non bornée",
    accroche: `Avec les boucles, tes programmes répètent des milliers de fois sans effort.
      Voici ce que tu dois savoir faire avant de passer aux fonctions.`,

    sections: [
      {
        titre: "La boucle bornée for",
        seances: ["s05"],
        savoirs: [
          { sait: "répéter des instructions un nombre de fois connu à l'avance",
            code: `for i in range(10):\n    print("Bonjour")` },
          { sait: "savoir quelles valeurs prend la variable de boucle selon la forme de <code>range</code>",
            code: `range(5)          # 0, 1, 2, 3, 4\nrange(1, 11)      # 1, 2, ..., 10\nrange(0, 20, 2)   # 0, 2, 4, ..., 18` },
          { sait: "<strong>accumuler</strong> une somme : partir de 0, ajouter à chaque tour, afficher après la boucle",
            code: `somme = 0\nfor i in range(1, 101):\n    somme = somme + i\nprint(somme)` },
          { sait: "compter les valeurs qui vérifient une condition, ou calculer un produit (départ à 1)",
            code: `compteur = 0\nfor i in range(1, 101):\n    if i % 7 == 0:\n        compteur = compteur + 1` },
          { sait: "garder la plus grande valeur rencontrée",
            code: `if nombre > maximum:\n    maximum = nombre` },
        ],
        pieges: `<ul>
            <li><code>range(n)</code> s'arrête à <code>n - 1</code> : pour aller jusqu'à 10 inclus, écris <code>range(1, 11)</code> ;</li>
            <li>une ligne à exécuter <strong>à chaque tour</strong> est décalée ; sinon, elle est en dehors de la boucle.</li>
          </ul>`,
      },
      {
        titre: "La boucle non bornée while",
        seances: ["s06"],
        savoirs: [
          { sait: "écrire une boucle <code>while</code> avec ses trois ingrédients : initialisation, condition, progression",
            code: `n = 10                  # initialisation\nwhile n > 0:            # condition\n    print(n)\n    n = n - 1           # progression` },
          { sait: "écrire un <strong>algorithme de seuil</strong> : compter les étapes nécessaires pour dépasser une valeur",
            code: `puissance = 1\netapes = 0\nwhile puissance <= 1000:\n    puissance = puissance * 2\n    etapes = etapes + 1\nprint(etapes, puissance)` },
          { sait: "encadrer un nombre par <strong>balayage</strong>, en comptant en entiers",
            code: `n = 100                       # 1,00 en centièmes\nwhile n * n <= 2 * 100 * 100:\n    n = n + 1\nprint((n - 1) / 100, n / 100)  # encadrement de √2` },
          { sait: "redemander une saisie tant qu'elle n'est pas valable",
            code: `note = int(input("Note ? "))\nwhile note < 0 or note > 20:\n    note = int(input("Entre 0 et 20 : "))` },
        ],
        pieges: `<ul>
            <li>oublier la progression : la condition reste vraie, la boucle ne s'arrête jamais ;</li>
            <li>avancer de 0.01 en 0.01 accumule des erreurs d'arrondi : on compte en entiers et on divise à la fin.</li>
          </ul>`,
      },
    ],

    suite: `<strong>for ou while ?</strong> Si tu sais à l'avance combien de tours il faut,
      prends <code>for</code>. Sinon — « jusqu'à ce que… » —, prends <code>while</code>.`,
  },

  /* ================================================================ PARTIE 4 */
  p4: {
    titre: "Les fonctions",
    accroche: `Une fonction, c'est un morceau de programme qu'on écrit une fois et qu'on
      réutilise autant qu'on veut. Voici ce que tu dois savoir faire avant la dernière partie.`,

    sections: [
      {
        titre: "Écrire et appeler une fonction",
        seances: ["s07"],
        savoirs: [
          { sait: "définir une fonction avec <code>def</code>, un paramètre et un <code>return</code>",
            code: `def carre(x):\n    return x * x` },
          { sait: "l'<strong>appeler</strong> et réutiliser son résultat dans un calcul",
            code: `aire = carre(5)\nprint(carre(3) + carre(4))   # 25` },
          { sait: `distinguer <code>return</code> et <code>print</code> : <code>return</code>
              <strong>renvoie</strong> la valeur au programme, <code>print</code> ne fait que
              l'afficher. Sans <code>return</code>, la fonction renvoie <code>None</code>` },
          { sait: "écrire une fonction qui renvoie un booléen, nommée <code>est_…</code>",
            code: `def est_pair(n):\n    return n % 2 == 0` },
          { sait: "placer une boucle ou un test dans une fonction",
            code: `def somme_jusqua(n):\n    somme = 0\n    for i in range(1, n + 1):\n        somme = somme + i\n    return somme` },
        ],
        pieges: `<ul>
            <li>oublier les deux-points ou l'indentation du corps ;</li>
            <li>écrire <code>print</code> au lieu de <code>return</code> ;</li>
            <li>définir la fonction… et ne jamais l'appeler ;</li>
            <li>écrire <code>carre</code> au lieu de <code>carre(5)</code>.</li>
          </ul>`,
      },
      {
        titre: "Fonctions à plusieurs paramètres",
        seances: ["s08"],
        savoirs: [
          { sait: "écrire une fonction à deux ou trois paramètres, séparés par des virgules",
            code: `def coefficient_directeur(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)` },
          { sait: "l'appeler en donnant les arguments <strong>dans le même ordre</strong> que les paramètres",
            code: `coefficient_directeur(1, 2, 3, 8)   # 3.0` },
          { sait: `lire une fonction écrite par quelqu'un d'autre : repérer d'abord le
              <code>return</code>, puis remonter pour voir comment le résultat est construit` },
          { sait: "compléter ou modifier un programme existant sans tout réécrire" },
        ],
        pieges: `<ul>
            <li>l'ordre des arguments inversé : le programme tourne… et donne faux ;</li>
            <li>le mauvais nombre d'arguments : <code>TypeError</code> ;</li>
            <li>les parenthèses oubliées : <code>(a + b + c) / 3</code>, pas <code>a + b + c / 3</code>.</li>
          </ul>`,
      },
    ],

    suite: `Pour nommer une fonction : un <strong>verbe</strong> pour une action
      (<code>calculer_moyenne</code>), <code>est_…</code> pour une fonction qui répond
      par vrai ou faux.`,
  },

  /* ================================================================ PARTIE 5 */
  p5: {
    titre: "Hasard, projet et boîte à outils",
    accroche: `Dernière partie : le hasard, un vrai projet, et les algorithmes que ton cours
      de mathématiques te réclamera. Voici ce que tu dois savoir faire pour la fin de l'année.`,

    sections: [
      {
        titre: "Simuler le hasard",
        seances: ["s09"],
        savoirs: [
          { sait: "importer <code>randint</code> et tirer un entier au hasard, bornes <strong>incluses</strong>",
            code: `from random import randint\nde = randint(1, 6)       # 1, 2, 3, 4, 5 ou 6` },
          { sait: "écrire une expérience aléatoire sous forme de fonction",
            code: `def lancer_de():\n    return randint(1, 6)` },
          { sait: "répéter l'expérience, compter les succès et calculer une <strong>fréquence</strong>",
            code: `succes = 0\nfor essai in range(1000):\n    if lancer_de() == 6:\n        succes = succes + 1\nprint(succes / 1000)` },
          { sait: `expliquer la <strong>loi des grands nombres</strong> : plus on répète, plus la
              fréquence observée s'approche de la probabilité` },
        ],
        pieges: `<ul>
            <li>oublier <code>from random import randint</code> : <code>NameError</code> ;</li>
            <li>pour deux dés, appeler <code>randint</code> <strong>deux fois</strong> ;</li>
            <li>la probabilité se calcule et ne change pas ; la fréquence s'observe et change à chaque simulation.</li>
          </ul>`,
      },
      {
        titre: "Construire un programme complet",
        seances: ["s10"],
        savoirs: [
          { sait: "découper un problème en étapes, et vérifier chaque étape avant de passer à la suivante" },
          { sait: "traiter une série de données en <strong>un seul passage</strong> : somme, minimum et maximum dans la même boucle",
            code: `somme = 0\nmini = 21           # plus haut que toute note possible\nmaxi = -1           # plus bas que toute note possible\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note` },
          { sait: "produire un affichage soigné, lisible par quelqu'un qui n'a pas vu le code" },
        ],
      },
      {
        titre: "La boîte à outils des maths (bonus)",
        seances: ["s11"],
        savoirs: [
          { sait: `reconnaître le motif qui convient : <strong>accumulation</strong> (somme,
              compteur, maximum), <strong>seuil</strong> (en combien d'étapes dépasse-t-on ?),
              <strong>encadrement</strong> (balayage ou dichotomie)` },
          { sait: "écrire l'algorithme sous forme de fonction, les données en paramètres",
            code: `def premiere_puissance(base, seuil):\n    puissance = 1\n    while puissance <= seuil:\n        puissance = puissance * base\n    return puissance` },
          { sait: "tester la fonction sur un cas dont on connaît déjà la réponse",
            code: `print(premiere_puissance(2, 1000))   # 1024` },
        ],
      },
    ],

    suite: `Les trois questions à se poser devant un algorithme : qu'est-ce qui
      <strong>varie</strong> ? (les paramètres) Qu'est-ce qu'on <strong>produit</strong> ?
      (le <code>return</code>) Comment le <strong>vérifier</strong> ? (sur un cas connu)`,
  },
};

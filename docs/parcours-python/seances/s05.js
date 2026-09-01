/* Séance 5 — La boucle bornée for.
 * Fiche T7. Prérequis : séances 1 à 4.
 * L'accumulation (somme, compteur, extremum) prépare la lecture des fonctions
 * moyenne / écart type du chapitre 5 de maths.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "La boucle bornée for",
  sousTitre: "Répéter sans se répéter",
  palier: "T7 — Boucle bornée et boucle non bornée",

  accroche: `Écrire dix fois la même ligne, c'est perdre son temps — et le meilleur
    moyen de se tromper. La boucle <code>for</code> dit à Python : « refais ça
    <em>n</em> fois ». C'est le moment où un programme devient vraiment plus rapide
    qu'un humain.`,

  objectifs: [
    "écrire une boucle <code>for</code> avec <code>range()</code>",
    "utiliser la variable de boucle dans le corps de la boucle",
    "maîtriser les trois formes de <code>range</code> : fin, début-fin, et le pas",
    "accumuler un résultat : somme, compteur, maximum",
  ],

  motDeLaFin: `Tu sais répéter un nombre de fois connu à l'avance. À la séance 6,
    tu apprendras à répéter <em>jusqu'à ce que</em> quelque chose arrive — sans savoir
    combien de tours cela prendra.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "on avance ensemble, une idée à la fois",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Le bloc « répéter 10 fois »",
          contenu: `
            <p>En Scratch, tu enfermais des blocs dans <strong>répéter 10 fois</strong>.
            En Python :</p>

            <pre class="bloc-code"><code>for i in range(10):
    print("Bonjour !")</code></pre>

            <p>Cette ligne se lit : « <strong>pour i allant de 0 à 9</strong>, faire… ».
            Le <code>print</code> est exécuté dix fois.</p>

            <p>Tu reconnais deux choses de la séance 4 : le <strong>deux-points</strong> en
            fin de ligne, et le <strong>décalage</strong> qui délimite le corps de la boucle.
            C'est encore le ventre du bloc Scratch.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le corps de la boucle</span>
              Tout ce qui est décalé sous le <code>for</code> est répété. Ce qui ne l'est pas
              s'exécute une seule fois, après la boucle.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première boucle",
          contenu: `
            <p>Écris une boucle qui affiche <strong>trois fois</strong> le message
            <code>Bonjour !</code> :</p>
            <pre class="bloc-code"><code>Bonjour !
Bonjour !
Bonjour !</code></pre>
            <p>Un seul <code>print</code> dans ton programme, évidemment.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle for." },
              { motif: "range\\s*\\(", message: "La boucle for s'écrit avec range()." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print : c'est la boucle qui doit répéter." },
            ],
            sortie: "Bonjour !\nBonjour !\nBonjour !",
          },
          felicitation: "Trois affichages, une seule instruction. 🔁",
          indices: [
            "<code>for i in range(3):</code> — les deux-points sont obligatoires.",
            "Décale le <code>print</code> de quatre espaces sous le <code>for</code>.",
          ],
          solution: `for i in range(3):\n    print("Bonjour !")\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Que vaut i, exactement ?",
          contenu: `<p>Cette fois, on affiche la variable de boucle elle-même.</p>`,
          code: `for i in range(5):\n    print(i)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "les nombres de <code>1</code> à <code>5</code>",
              explication: "Presque : Python commence à compter à zéro, et s'arrête <em>avant</em> 5." },
            { texte: "les nombres de <code>0</code> à <code>4</code>", correct: true,
              explication: "Oui. <code>range(5)</code> produit cinq valeurs : 0, 1, 2, 3, 4." },
            { texte: "les nombres de <code>0</code> à <code>5</code>",
              explication: "Cela ferait six valeurs. <code>range(5)</code> en donne exactement cinq." },
            { texte: "cinq fois <code>5</code>",
              explication: "Non : <code>i</code> change à chaque tour, c'est tout son intérêt." },
          ],
          apres: `<span class="chapo">Le compteur commence à zéro</span>
            <code>range(n)</code> produit <strong>n</strong> valeurs : de 0 à n − 1.
            Déroutant au début, mais c'est la convention de presque tous les langages —
            et elle a de très bonnes raisons d'être.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Les trois formes de range",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Écriture</th><th>Valeurs produites</th><th>Se lit</th></tr>
              <tr><td><code>range(5)</code></td><td>0 1 2 3 4</td><td>cinq valeurs, à partir de 0</td></tr>
              <tr><td><code>range(1, 6)</code></td><td>1 2 3 4 5</td><td>de 1 jusqu'à 6 <strong>exclu</strong></td></tr>
              <tr><td><code>range(0, 10, 2)</code></td><td>0 2 4 6 8</td><td>de 0 à 10 exclu, de 2 en 2</td></tr>
              <tr><td><code>range(10, 0, -1)</code></td><td>10 9 8 … 1</td><td>en descendant</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La borne de droite est toujours exclue</span>
              Pour parcourir les entiers <strong>de 1 à 10 inclus</strong>, il faut écrire
              <code>range(1, 11)</code>. C'est l'erreur la plus fréquente avec les boucles :
              on l'appelle « l'erreur du décalage d'un ».
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "De 1 à 10 inclus",
          contenu: `
            <p>Affiche les entiers de 1 à 10, un par ligne :</p>
            <pre class="bloc-code"><code>1
2
3
4
5
6
7
8
9
10</code></pre>`,
          depart: `for i in range(10):\n    print(i)\n`,
          validation: {
            sortie: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
          },
          felicitation: "Les deux bornes bien placées. 🎯",
          indices: [
            "Le code de départ affiche 0 à 9 : il faut décaler les deux bornes.",
            "<code>range(1, 11)</code> — le 11 est exclu, donc le dernier affiché est 10.",
          ],
          solution: `for i in range(1, 11):\n    print(i)\n`,
        },

        {
          id: "d6",
          type: "code",
          titre: "La table de 7, en entier",
          contenu: `
            <p>À la séance 1, tu avais écrit trois lignes de la table de 7 à la main.
            Cette fois, écris les dix, avec une boucle :</p>
            <pre class="bloc-code"><code>7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70</code></pre>
            <p>Ton programme ne doit contenir qu'<strong>un seul</strong> <code>print</code>.</p>`,
          depart: `for i in range(1, 11):\n    \n`,
          validation: {
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print : la boucle s'occupe de la répétition." },
            ],
            sortie: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
          },
          felicitation: "Dix lignes, une instruction. C'est ça, la puissance d'une boucle. ✖️",
          indices: [
            "Dans le corps de la boucle, <code>i</code> vaut successivement 1, 2, … 10.",
            "<code>print(\"7 x\", i, \"=\", 7 * i)</code>",
          ],
          solution: `for i in range(1, 11):\n    print("7 x", i, "=", 7 * i)\n`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Accumuler : la variable qui grandit",
          contenu: `
            <p>Voici le geste le plus important de toute la séance. On veut la somme
            1 + 2 + 3 + 4 + 5. L'idée :</p>

            <ol>
              <li>créer une variable <code>somme</code> qui vaut <strong>0</strong>
                <em>avant</em> la boucle ;</li>
              <li>à chaque tour, lui <strong>ajouter</strong> la valeur courante ;</li>
              <li>afficher le résultat <em>après</em> la boucle.</li>
            </ol>

            <pre class="bloc-code"><code>somme = 0

for i in range(1, 6):
    somme = somme + i

print(somme)     # 15</code></pre>

            <p>Tu reconnais le compteur de points de la séance 2, mais placé dans une boucle.
            On appelle cette variable un <strong>accumulateur</strong>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les deux pièges de l'accumulateur</span>
              <strong>Avant</strong> la boucle, il faut l'initialiser — sinon Python ne
              connaît pas la variable. <strong>Après</strong> la boucle, on affiche —
              si le <code>print</code> est <em>dans</em> la boucle, on voit tous les
              résultats intermédiaires.
            </div>

            <p>Le même geste sert à trois choses : <strong>somme</strong> (on ajoute),
            <strong>produit</strong> (on multiplie, en partant de 1),
            <strong>compteur</strong> (on ajoute 1 quand une condition est remplie).</p>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "La somme des cent premiers entiers",
          contenu: `
            <p>Calcule 1 + 2 + 3 + … + 100 et affiche exactement :</p>
            <pre class="bloc-code"><code>La somme vaut 5050</code></pre>
            <p>Une seule ligne affichée : le <code>print</code> est
            <strong>après</strong> la boucle.</p>`,
          depart: `somme = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "5050", message: "La somme doit être calculée par la boucle." },
            ],
            sortie: "La somme vaut 5050",
          },
          felicitation: "Le petit Gauss l'avait fait de tête à 9 ans. Toi, tu l'as programmé. 🧮",
          indices: [
            "<code>for i in range(1, 101):</code> — attention à la borne exclue.",
            "Dans la boucle : <code>somme = somme + i</code>.",
            "Le <code>print</code> ne doit pas être décalé : il vient après la boucle.",
          ],
          solution: `somme = 0\n\nfor i in range(1, 101):\n    somme = somme + i\n\nprint("La somme vaut", somme)\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Compter, plutôt qu'additionner",
          contenu: `
            <p>Même geste, autre usage : au lieu d'ajouter la valeur, on ajoute
            <strong>1</strong>, mais seulement <strong>quand une condition est vraie</strong>.
            Il faut donc un <code>if</code> dans la boucle.</p>
            <p>Compte les multiples de 7 entre 1 et 100 et affiche exactement :</p>
            <pre class="bloc-code"><code>Il y a 14 multiples de 7 entre 1 et 100.</code></pre>`,
          depart: `compteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut parcourir les nombres avec une boucle." },
              { motif: "\\bif\\b", message: "Il faut tester chaque nombre avec un if." },
              { motif: "%", message: "Le test de divisibilité utilise le reste %." },
            ],
            codeAbsent: [
              { motif: "\\b14\\b", message: "Le résultat doit être compté par le programme." },
            ],
            sortie: "Il y a 14 multiples de 7 entre 1 et 100.",
          },
          felicitation: "Boucle, test et compteur assemblés : le trio gagnant. 🔢",
          indices: [
            "Parcours <code>range(1, 101)</code>.",
            "Dans la boucle : <code>if i % 7 == 0:</code>, et à l'intérieur <code>compteur = compteur + 1</code>.",
            "Trois niveaux de décalage : la boucle à 0, le <code>if</code> à 4, l'incrément à 8.",
          ],
          solution: `compteur = 0\n\nfor i in range(1, 101):\n    if i % 7 == 0:\n        compteur = compteur + 1\n\nprint("Il y a", compteur, "multiples de 7 entre 1 et 100.")\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Répéter n fois
for i in range(n):
    ...

# Parcourir de a à b inclus
for i in range(a, b + 1):
    ...

# Accumuler
resultat = 0                 # valeur de départ
for i in range(...):
    resultat = resultat + i  # on fait grandir
print(resultat)              # APRÈS la boucle</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>Valeur de départ</th><th>Dans la boucle</th></tr>
              <tr><td>une somme</td><td><code>0</code></td><td><code>s = s + i</code></td></tr>
              <tr><td>un produit</td><td><code>1</code></td><td><code>p = p * i</code></td></tr>
              <tr><td>un compteur</td><td><code>0</code></td><td><code>c = c + 1</code> dans un <code>if</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le doute sur l'indentation ?</span>
              Pose-toi une seule question : « cette ligne doit-elle être exécutée
              <strong>à chaque tour</strong> ? » Si oui, elle est décalée. Si non, elle
              est en dehors.
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 30,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Le compte à rebours",
          contenu: `
            <p>Affiche le décompte de 10 à 0, puis le décollage :</p>
            <pre class="bloc-code"><code>10
9
8
7
6
5
4
3
2
1
0
Décollage !</code></pre>
            <p>Utilise la troisième forme de <code>range</code>, avec un pas négatif.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\([^)]*-\\s*1", message: "Pour descendre, le pas de range doit être -1." },
            ],
            sortie: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0\nDécollage !",
          },
          indices: [
            "<code>range(10, -1, -1)</code> : on part de 10, on s'arrête avant −1, en reculant de 1.",
            "Le <code>print(\"Décollage !\")</code> est en dehors de la boucle.",
          ],
          solution: `for i in range(10, -1, -1):\n    print(i)\n\nprint("Décollage !")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "La table de multiplication, au choix",
          contenu: `
            <p>Demande un nombre à l'utilisateur, puis affiche sa table de 1 à 10.
            Avec 9 :</p>
            <pre class="bloc-code"><code>Quelle table ? 9
9 x 1 = 9
9 x 2 = 18
...
9 x 10 = 90</code></pre>`,
          depart: `\n`,
          saisiesTest: ["9"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "Le nombre doit être demandé et converti." },
              { motif: "\\bfor\\b", message: "Il faut une boucle pour les dix lignes." },
            ],
            sortieContient: ["9 x 10 = 90"],
          },
          indices: [
            "<code>table = int(input(\"Quelle table ? \"))</code>",
            "Puis <code>for i in range(1, 11):</code> et un <code>print</code> avec <code>table * i</code>.",
          ],
          solution: `table = int(input("Quelle table ? "))\n\nfor i in range(1, 11):\n    print(table, "x", i, "=", table * i)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La somme des nombres pairs",
          contenu: `
            <p>Calcule la somme de tous les nombres <strong>pairs</strong> de 1 à 100
            (2 + 4 + 6 + … + 100) et affiche exactement :</p>
            <pre class="bloc-code"><code>Somme des pairs : 2550</code></pre>
            <p>Deux méthodes existent : le pas de <code>range</code>, ou un <code>if</code>
            dans la boucle. Les deux sont acceptées.</p>`,
          depart: `somme = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "2550", message: "La somme doit être calculée." },
            ],
            sortie: "Somme des pairs : 2550",
          },
          indices: [
            "Méthode 1 : <code>range(2, 101, 2)</code> ne donne que les pairs.",
            "Méthode 2 : parcourir <code>range(1, 101)</code> et n'ajouter que si <code>i % 2 == 0</code>.",
          ],
          solution: `somme = 0\n\nfor i in range(2, 101, 2):\n    somme = somme + i\n\nprint("Somme des pairs :", somme)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "L'escalier d'étoiles",
          contenu: `
            <p>Affiche cet escalier :</p>
            <pre class="bloc-code"><code>*
**
***
****
*****
******</code></pre>
            <p>Souviens-toi du défi des quarante tirets : multiplier un texte le répète.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "\\*{3}", message: "Ne tape pas les étoiles à la main : fais-les répéter." },
            ],
            sortie: "*\n**\n***\n****\n*****\n******",
          },
          felicitation: "Répétition dans la répétition. 🪜",
          indices: [
            "À chaque tour, le nombre d'étoiles vaut exactement <code>i</code>.",
            "<code>print(\"*\" * i)</code> avec <code>i</code> allant de 1 à 6.",
          ],
          solution: `for i in range(1, 7):\n    print("*" * i)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : la boucle cassée",
          contenu: `
            <p>Trois erreurs. Le programme doit afficher :</p>
            <pre class="bloc-code"><code>1
2
3
4</code></pre>`,
          depart: `for i in range(1, 4)\nprint(i)\n`,
          validation: { sortie: "1\n2\n3\n4" },
          felicitation: "Deux-points, indentation, borne exclue : les trois bugs de boucle. 🐞",
          indices: [
            "Ligne 1 : il manque les deux-points.",
            "Ligne 2 : elle doit être dans le corps de la boucle, donc décalée.",
            "La borne de droite est exclue : pour aller jusqu'à 4, il faut écrire 5.",
          ],
          solution: `for i in range(1, 5):\n    print(i)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "La factorielle",
          contenu: `
            <p>La factorielle de 10, notée 10 !, c'est le produit
            1 × 2 × 3 × … × 10. Affiche exactement :</p>
            <pre class="bloc-code"><code>10 ! = 3628800</code></pre>
            <p>Attention à la valeur de départ de l'accumulateur : partir de 0 donnerait
            toujours 0.</p>`,
          depart: `produit = \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "3628800", message: "Le produit doit être calculé." },
            ],
            sortie: "10 ! = 3628800",
          },
          felicitation: "Trois millions six cent vingt-huit mille huit cents. 🎲",
          indices: [
            "L'accumulateur d'un produit part de <strong>1</strong>, pas de 0.",
            "Dans la boucle : <code>produit = produit * i</code>.",
          ],
          solution: `produit = 1\n\nfor i in range(1, 11):\n    produit = produit * i\n\nprint("10 ! =", produit)\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "La moyenne de cinq notes",
          contenu: `
            <p>Demande cinq notes à l'utilisateur, une par une, puis affiche leur moyenne.
            Avec 12, 15, 9, 18 et 11 :</p>
            <pre class="bloc-code"><code>Note 1 ? 12
Note 2 ? 15
Note 3 ? 9
Note 4 ? 18
Note 5 ? 11
Moyenne : 13.0</code></pre>
            <p>Un seul <code>input</code> dans ton programme : il est <em>dans</em> la boucle.</p>`,
          depart: `somme = 0\n\n`,
          saisiesTest: ["12", "15", "9", "18", "11"],
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "int\\s*\\(\\s*input", message: "Chaque note doit être demandée et convertie." },
            ],
            codeAbsent: [
              { motif: "input[\\s\\S]*input", message: "Un seul input, placé dans la boucle." },
            ],
            sortieRegex: "Moyenne : \\d+(\\.\\d+)?",
            sortieRegexMessage: "Ton programme doit afficher « Moyenne : » suivi du résultat.",
          },
          felicitation: "Saisie répétée et accumulation : un vrai outil. 📊",
          indices: [
            "<code>for i in range(1, 6):</code> pour numéroter les notes de 1 à 5.",
            "Dans la boucle : <code>note = int(input(\"Note ? \"))</code> puis <code>somme = somme + note</code>.",
            "Après la boucle : <code>print(\"Moyenne :\", somme / 5)</code>.",
          ],
          solution: `somme = 0\n\nfor i in range(1, 6):\n    note = int(input("Note ? "))\n    somme = somme + note\n\nprint("Moyenne :", somme / 5)\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Le plus grand de la série",
          contenu: `
            <p>Demande cinq nombres et annonce le plus grand :</p>
            <pre class="bloc-code"><code>Nombre ? 12
Nombre ? 45
Nombre ? 7
Nombre ? 45
Nombre ? 3
Le plus grand est 45</code></pre>
            <p>La méthode est celle du défi de la séance 4 : on garde un
            <strong>champion</strong> et on le remplace dès qu'on trouve mieux.</p>`,
          depart: `maximum = 0\n\n`,
          saisiesTest: ["12", "45", "7", "45", "3"],
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "\\bif\\b", message: "Il faut comparer chaque nombre au champion actuel." },
            ],
            sortieRegex: "Le plus grand est \\d+",
            sortieRegexMessage: "Ton programme doit afficher « Le plus grand est » suivi du maximum.",
          },
          felicitation: "L'algorithme du maximum, en cinq lignes. 🏆",
          indices: [
            "Dans la boucle, après la saisie : <code>if nombre > maximum:</code>.",
            "Et dans ce cas : <code>maximum = nombre</code>.",
            "Attention : partir de 0 ne marche que si tous les nombres sont positifs. À toi d'y penser si tu testes des négatifs.",
          ],
          solution: `maximum = 0\n\nfor i in range(5):\n    nombre = int(input("Nombre ? "))\n    if nombre > maximum:\n        maximum = nombre\n\nprint("Le plus grand est", maximum)\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Les diviseurs de 36",
          contenu: `
            <p>Affiche tous les diviseurs de 36, un par ligne, puis leur nombre :</p>
            <pre class="bloc-code"><code>1
2
3
4
6
9
12
18
36
36 a 9 diviseurs.</code></pre>
            <p>Un nombre <code>d</code> est un diviseur de 36 quand
            <code>36 % d == 0</code>.</p>`,
          depart: `nombre = 36\ncompteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut parcourir les diviseurs possibles." },
              { motif: "%", message: "Le test de divisibilité utilise le reste." },
            ],
            codeAbsent: [
              { motif: "\\b9 diviseurs", message: "Le nombre de diviseurs doit être compté." },
            ],
            sortie: "1\n2\n3\n4\n6\n9\n12\n18\n36\n36 a 9 diviseurs.",
          },
          felicitation: "Tu viens d'écrire un algorithme du chapitre 11 de maths. 🔍",
          indices: [
            "Les diviseurs possibles vont de 1 à 36 : <code>range(1, 37)</code>.",
            "Dans le <code>if</code>, il faut <strong>deux</strong> choses : afficher le diviseur, et incrémenter le compteur.",
            "Le dernier <code>print</code> est en dehors de la boucle.",
          ],
          solution: `nombre = 36\ncompteur = 0\n\nfor d in range(1, nombre + 1):\n    if nombre % d == 0:\n        print(d)\n        compteur = compteur + 1\n\nprint(nombre, "a", compteur, "diviseurs.")\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le sapin paramétré",
          contenu: `
            <p>Le sapin de la séance 1, mais construit par une boucle, à partir d'une
            variable <code>hauteur</code>. Avec <code>hauteur = 5</code> :</p>
            <pre class="bloc-code"><code>    *
   ***
  *****
 *******
*********
    |</code></pre>
            <p>Change <code>hauteur</code> en 8 pour vérifier que ton sapin grandit tout
            seul, puis remets 5.</p>`,
          depart: `hauteur = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "hauteur", message: "Ton programme doit utiliser la variable hauteur." },
            ],
            sortie: "    *\n   ***\n  *****\n *******\n*********\n    |",
          },
          felicitation: "Un sapin qui s'adapte. Ça, c'est du vrai code. 🎄",
          indices: [
            "À la ligne numéro <code>i</code> (de 1 à hauteur), il y a <code>hauteur - i</code> espaces.",
            "… et <code>2 * i - 1</code> étoiles.",
            "<code>print(\" \" * (hauteur - i) + \"*\" * (2 * i - 1))</code> — le <code>+</code> colle les deux morceaux.",
          ],
          solution: `hauteur = 5\n\nfor i in range(1, hauteur + 1):\n    print(" " * (hauteur - i) + "*" * (2 * i - 1))\n\nprint(" " * (hauteur - 1) + "|")\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "La suite de Fibonacci",
          contenu: `
            <p>Chaque terme est la somme des deux précédents. Les deux premiers valent 1.
            Affiche les dix premiers, un par ligne :</p>
            <pre class="bloc-code"><code>1
1
2
3
5
8
13
21
34
55</code></pre>
            <p>Il te faut <strong>deux</strong> variables qui avancent ensemble.</p>`,
          depart: `a = 1\nb = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "\\b55\\b", message: "Les termes doivent être calculés, pas écrits." },
            ],
            sortie: "1\n1\n2\n3\n5\n8\n13\n21\n34\n55",
          },
          felicitation: "La suite de Fibonacci, née en 1202, tourne dans ton navigateur. 🐚",
          indices: [
            "À chaque tour : afficher <code>a</code>, puis faire avancer les deux variables.",
            "L'avancement : le nouveau <code>a</code> est l'ancien <code>b</code>, le nouveau <code>b</code> est <code>a + b</code>.",
            "Utilise l'affectation multiple de la séance 2 : <code>a, b = b, a + b</code>. Sans elle, l'ordre des lignes casserait tout.",
          ],
          solution: `a = 1\nb = 1\n\nfor i in range(10):\n    print(a)\n    a, b = b, a + b\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ce nombre est-il premier ?",
          contenu: `
            <p>Un nombre est <strong>premier</strong> s'il n'a que deux diviseurs : 1 et
            lui-même. Avec <code>n = 97</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>97 est premier : True</code></pre>
            <p>La méthode : partir d'un <strong>drapeau</strong> <code>premier = True</code>,
            puis chercher un diviseur ; si on en trouve un, baisser le drapeau.</p>`,
          depart: `n = 97\npremier = True\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut chercher des diviseurs avec une boucle." },
              { motif: "premier\\s*=\\s*False", message: "Le drapeau doit être baissé quand un diviseur est trouvé." },
            ],
            sortie: "97 est premier : True",
          },
          felicitation: "Le drapeau booléen : une technique que tu réutiliseras longtemps. 🚩",
          indices: [
            "Il suffit de chercher un diviseur entre 2 et n − 1 : <code>range(2, n)</code>.",
            "Dans la boucle : <code>if n % d == 0:</code> alors <code>premier = False</code>.",
            "Le <code>print</code> final affiche simplement la variable <code>premier</code>.",
          ],
          solution: `n = 97\npremier = True\n\nfor d in range(2, n):\n    if n % d == 0:\n        premier = False\n\nprint(n, "est premier :", premier)\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Une boucle dans une boucle",
          contenu: `
            <p>Deux boucles imbriquées produisent toutes les combinaisons. Affiche les
            tables de 1, 2 et 3, chacune de 1 à 3 :</p>
            <pre class="bloc-code"><code>1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9</code></pre>
            <p>Un seul <code>print</code> dans tout le programme.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut une boucle imbriquée dans une autre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print." },
            ],
            sortie: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9",
          },
          felicitation: "Neuf lignes produites par deux boucles. 🔁🔁",
          indices: [
            "La boucle extérieure parcourt les tables : <code>for i in range(1, 4):</code>.",
            "La boucle intérieure, décalée de quatre espaces de plus, parcourt les multiplicateurs.",
            "Le <code>print</code> est au cœur, décalé de huit espaces.",
          ],
          solution: `for i in range(1, 4):\n    for j in range(1, 4):\n        print(i, "x", j, "=", i * j)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le triangle de nombres",
          contenu: `
            <p>Un défi de précision. Affiche exactement :</p>
            <pre class="bloc-code"><code>1
22
333
4444
55555</code></pre>
            <p>Sur la ligne <em>n</em>, le chiffre <em>n</em> est répété <em>n</em> fois.</p>
            <div class="encadre" data-ton="astuce">
              Multiplier un <strong>nombre</strong> le multiplie ; multiplier un
              <strong>texte</strong> le répète. Il te faut donc transformer le nombre en
              texte : <code>str(i)</code>.
            </div>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "str\\s*\\(", message: "Pour répéter un chiffre, transforme-le d'abord en texte avec str()." },
            ],
            sortie: "1\n22\n333\n4444\n55555",
          },
          felicitation: "str() pour répéter un chiffre : subtil, et bien vu. 🔺",
          indices: [
            "<code>str(3) * 3</code> vaut <code>\"333\"</code>.",
            "<code>print(str(i) * i)</code> avec <code>i</code> de 1 à 5.",
          ],
          solution: `for i in range(1, 6):\n    print(str(i) * i)\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton programme répétitif",
          contenu: `
            <p>Défi libre. Écris un programme qui contient <strong>une boucle</strong> et
            <strong>un accumulateur</strong> (somme, produit ou compteur), et qui affiche
            un résultat final calculé.</p>
            <p>Des idées : la somme des carrés des vingt premiers entiers, un tableau de
            conversion des températures de 0 à 100 de 10 en 10, le total d'un placement à
            intérêts sur dix ans, le nombre de nombres à trois chiffres divisibles par 13…</p>`,
          depart: `# Ton programme\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Ton programme doit contenir une boucle for." },
              { motif: "^\\s*\\w+\\s*=\\s*[\\s\\S]*\\n[\\s\\S]*\\n\\s+\\w+\\s*=[^=]", options: "m",
                message: "Il doit contenir un accumulateur : une variable initialisée avant la boucle et modifiée dedans." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 5 terminée. La répétition n'a plus de secret. 🏁",
          indices: [
            "Structure : initialisation, boucle qui fait grandir, affichage final.",
            "Exemple : <code>somme = 0</code>, puis <code>for i in range(1, 21): somme = somme + i * i</code>.",
          ],
          solution: `somme = 0\n\nfor i in range(1, 21):\n    somme = somme + i * i\n\nprint("La somme des carrés des 20 premiers entiers vaut", somme)\n`,
        },
      ],
    },
  ],
};

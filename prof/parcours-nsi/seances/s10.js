/* NSI — chapitre 1, séance 10 : boucles imbriquées, break et continue.
 * Reprend les deux encadrés « Boucles imbriquées » et « Pour aller plus loin :
 * break et continue » du cours.
 */

export default {
  id: "s10",
  numero: 10,
  titre: "Boucles imbriquées, break et continue",
  sousTitre: "Une boucle dans une boucle, et comment en sortir",
  palier: "Partie 3 — Répéter des instructions",

  accroche: `Une boucle peut en contenir une autre — c'est ainsi qu'on parcourt un
    tableau, qu'on compare tous les couples, qu'on dessine en deux dimensions. Et
    deux mots-clés permettent de reprendre la main sur le déroulement.`,

  objectifs: [
    "écrire deux boucles <strong>imbriquées</strong> et compter les tours",
    "interrompre une boucle avec <code>break</code>",
    "sauter un tour avec <code>continue</code>",
    "construire une ligne d'affichage par accumulation de texte",
  ],

  motDeLaFin: `Les boucles n'ont plus de secret. À la séance 11, on range du code dans
    des fonctions.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 35,
      etoiles: 1,
      intention: "on avance ensemble, une idée à la fois",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Une boucle dans une boucle",
          contenu: `
            <p>Une boucle peut être placée dans une autre. Il suffit de l'indenter d'un cran
            de plus :</p>

            <pre class="bloc-code"><code>for i in range(3):        # pour chaque ligne...
    for j in range(2):    # pour chaque colonne...
        print(i, j)       # on affiche les coordonnées</code></pre>

            <p>La boucle <strong>intérieure</strong> repart de zéro à chaque tour de la
            boucle <strong>extérieure</strong>. Ici, cela produit six affichages :
            3 × 2 = 6.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Compter les tours</span>
              Deux boucles imbriquées de <em>n</em> et <em>m</em> tours en font
              <strong><em>n</em> × <em>m</em></strong>. Avec 1000 et 1000, cela fait un
              million : les boucles imbriquées coûtent cher, et il faut le savoir.
            </div>

            <p>Un second exemple, où la boucle intérieure dépend de l'extérieure :</p>

            <pre class="bloc-code"><code>for i in range(100):          # pour chaque nombre de 0 à 99...
    for j in range(0, i + 1, 2):  # pour chaque nombre pair jusqu'à i...
        print(j)</code></pre>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Toutes les cases d'un tableau",
          contenu: `
            <p>Écris les deux boucles imbriquées qui parcourent un tableau de
            <strong>3 lignes</strong> et <strong>2 colonnes</strong> et affichent les
            coordonnées de chaque case :</p>
            <pre class="bloc-code"><code>0 0
0 1
1 0
1 1
2 0
2 1</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut une boucle imbriquée dans une autre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print, au cœur des deux boucles." },
            ],
            sortie: "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
          },
          felicitation: "Six affichages produits par deux boucles. 🔁🔁",
          indices: [
            "La boucle extérieure parcourt les lignes, l'intérieure les colonnes.",
            "Trois niveaux d'indentation : la première boucle à 0, la seconde à 4, le <code>print</code> à 8.",
            "Regarde l'ordre de la sortie : c'est la seconde variable qui change le plus vite.",
          ],
          solution: `for i in range(3):\n    for j in range(2):\n        print(i, j)\n`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Les trois premières tables",
          contenu: `
            <p>Affiche les tables de multiplication de 1, 2 et 3, chacune de 1 à 3 :</p>
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
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print." },
            ],
            sortie: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9",
          },
          indices: [
            "La boucle extérieure choisit la table, l'intérieure le multiplicateur.",
            "Toutes deux vont de 1 à 3 inclus.",
          ],
          solution: `for i in range(1, 4):\n    for j in range(1, 4):\n        print(i, "x", j, "=", i * j)\n`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "break et continue",
          contenu: `
            <p>Dans le corps d'une boucle, deux instructions permettent de reprendre la
            main :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot-clé</th><th>Effet</th></tr>
              <tr><td><code>break</code></td><td><strong>arrête complètement</strong> la boucle et passe à la suite du programme</td></tr>
              <tr><td><code>continue</code></td><td><strong>passe à l'itération suivante</strong> sans exécuter la fin du corps</td></tr>
            </table>
            </div>

            <p><strong>Exemple de <code>break</code></strong> — on veut savoir si 12345 est
            premier. On cherche un diviseur entre 2 et 12344 ; dès qu'on en trouve un, inutile
            de continuer :</p>

            <pre class="bloc-code"><code>n = 12345

for i in range(2, n):
    if n % i == 0:
        print(n, "n'est pas premier")
        break</code></pre>

            <p><strong>Exemple de <code>continue</code></strong> — afficher les numéros de 1
            à 20 sauf le 13, qui porte malheur :</p>

            <pre class="bloc-code"><code>for i in range(1, 21):
    if i == 13:
        continue
    print(i)</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Dans une boucle imbriquée</span>
              <code>break</code> ne sort que de la boucle <strong>où il se trouve</strong> —
              la plus intérieure. Pour sortir des deux, il faut un drapeau, ou une fonction
              avec <code>return</code> (séance 12).
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Sortir dès qu'on a trouvé",
          contenu: `
            <p>Avec <code>n = 12345</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Premier diviseur trouvé : 3
12345 n'est pas premier</code></pre>
            <p>La boucle doit s'arrêter <strong>dès le premier diviseur</strong> : sans
            <code>break</code>, elle continuerait inutilement pendant des milliers de tours.</p>`,
          depart: `n = 12345\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bbreak\\b", message: "Il faut interrompre la boucle avec break." },
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "%", message: "Chercher un diviseur, c'est tester un reste nul." },
            ],
            codeAbsent: [
              { motif: "\\b3\\b\\s*\\)", message: "Le diviseur doit être trouvé par la boucle." },
            ],
            sortie: "Premier diviseur trouvé : 3\n12345 n'est pas premier",
          },
          felicitation: "Un break bien placé économise 12 000 tours de boucle. ⚡",
          indices: [
            "Les diviseurs possibles vont de 2 à n − 1 : <code>range(2, n)</code>.",
            "Dans le test, deux affichages puis <code>break</code>, tous au même niveau d'indentation.",
          ],
          solution: `n = 12345\n\nfor i in range(2, n):\n    if n % i == 0:\n        print("Premier diviseur trouvé :", i)\n        print(n, "n'est pas premier")\n        break\n`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Sauter un tour",
          contenu: `
            <p>Affiche les entiers de 1 à 20, <strong>sauf le 13</strong>. Utilise
            <code>continue</code>, pas une condition qui entourerait le
            <code>print</code>.</p>
            <pre class="bloc-code"><code>1
2
...
12
14
...
20</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bcontinue\\b", message: "Cet exercice porte sur continue." },
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            sortie: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n14\n15\n16\n17\n18\n19\n20",
          },
          felicitation: "13 sauté, sans casser la boucle. 🐈‍⬛",
          indices: [
            "La boucle parcourt tous les entiers de 1 à 20 inclus.",
            "Le test intercepte le 13 et passe au tour suivant <strong>avant</strong> d'atteindre le <code>print</code>.",
          ],
          solution: `for i in range(1, 21):\n    if i == 13:\n        continue\n    print(i)\n`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>for i in range(n):          # boucle extérieure
    for j in range(m):      # boucle intérieure : n × m tours au total
        ...

for i in range(...):
    if condition:
        break               # on quitte la boucle
    if autre_condition:
        continue            # on passe au tour suivant
    ...                     # exécuté seulement si aucun des deux</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Construire une ligne, puis l'afficher</span>
              Une boucle intérieure sert souvent à <strong>fabriquer une chaîne</strong> que
              la boucle extérieure affiche ensuite :
              <pre class="bloc-code" style="margin-top:.6em"><code>for i in range(1, 6):
    ligne = ""
    for j in range(i):
        ligne = ligne + "#"
    print(ligne)</code></pre>
              C'est l'accumulateur de la séance 9, appliqué à du texte.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">À utiliser avec modération</span>
              <code>break</code> et <code>continue</code> rendent parfois un programme plus
              court, parfois plus difficile à suivre. Une condition bien écrite vaut souvent
              mieux qu'un <code>continue</code>.
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 25,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Le triangle, version double boucle",
          contenu: `
            <p>Reprends le triangle de dièses de la séance 9, mais <strong>sans utiliser la
            répétition de texte</strong> : la boucle intérieure doit construire la ligne
            caractère par caractère.</p>
            <pre class="bloc-code sans-copie"><code>#
##
###
####
#####</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
            ],
            codeAbsent: [
              { motif: "\\*\\s*\"#\"|\"#\"\\s*\\*", message: "Pas de répétition de texte ici : c'est la boucle intérieure qui construit la ligne." },
            ],
            sortie: "#\n##\n###\n####\n#####",
          },
          felicitation: "Un accumulateur de texte, remis à zéro à chaque ligne. 🔺",
          indices: [
            "Avant la boucle intérieure, la ligne est une chaîne <strong>vide</strong>.",
            "La boucle intérieure y ajoute un dièse à chaque tour.",
            "Le <code>print</code> vient après la boucle intérieure, mais dans l'extérieure.",
          ],
          solution: `for i in range(1, 6):\n    ligne = ""\n    for j in range(i):\n        ligne = ligne + "#"\n    print(ligne)\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le premier multiple de 7",
          contenu: `
            <p>Cherche le premier multiple de 7 strictement supérieur à 500, et affiche
            exactement :</p>
            <pre class="bloc-code"><code>Trouvé : 504</code></pre>
            <p>La boucle doit s'arrêter dès qu'elle a trouvé, avec <code>break</code>.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bbreak\\b", message: "La boucle doit s'arrêter dès la découverte." },
              { motif: "%", message: "La divisibilité se teste avec le reste." },
            ],
            codeAbsent: [
              { motif: "504", message: "Le résultat doit être trouvé par la boucle." },
            ],
            sortie: "Trouvé : 504",
          },
          indices: [
            "La boucle part de 501 et monte : <code>range(501, 600)</code> suffit largement.",
            "Dès que le reste de la division par 7 est nul, on affiche et on sort.",
          ],
          solution: `for i in range(501, 600):\n    if i % 7 == 0:\n        print("Trouvé :", i)\n        break\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Sauter les multiples de 3",
          contenu: `
            <p>Affiche les entiers de 1 à 20, <strong>sauf les multiples de 3</strong>, en
            utilisant <code>continue</code> :</p>
            <pre class="bloc-code"><code>1
2
4
5
7
...
20</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bcontinue\\b", message: "Cet exercice porte sur continue." },
              { motif: "%", message: "Les multiples de 3 se repèrent avec le reste." },
            ],
            sortie: "1\n2\n4\n5\n7\n8\n10\n11\n13\n14\n16\n17\n19\n20",
          },
          indices: [
            "Le test intercepte les nombres dont le reste de la division par 3 est nul.",
          ],
          solution: `for i in range(1, 21):\n    if i % 3 == 0:\n        continue\n    print(i)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Le damier",
          contenu: `
            <p>Construis un damier de 6 sur 6, alterné, avec deux boucles imbriquées :</p>
            <pre class="bloc-code sans-copie"><code>#.#.#.
.#.#.#
#.#.#.
.#.#.#
#.#.#.
.#.#.#</code></pre>
            <p>💡 Une case est un dièse quand la somme de ses deux coordonnées est
            <strong>paire</strong>.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
              { motif: "%", message: "La parité de la somme des coordonnées se teste avec le reste." },
            ],
            codeAbsent: [
              { motif: "#\\.#", message: "Ne tape pas les lignes à la main : construis-les." },
            ],
            sortie: "#.#.#.\n.#.#.#\n#.#.#.\n.#.#.#\n#.#.#.\n.#.#.#",
          },
          felicitation: "Un damier généré, pas dessiné. ▦",
          indices: [
            "Comme pour le triangle : une chaîne vide avant la boucle intérieure, un <code>print</code> après.",
            "Dans la boucle intérieure, un <code>if</code> décide quel caractère ajouter.",
            "La somme <code>i + j</code> est paire une case sur deux : c'est exactement l'alternance cherchée.",
          ],
          solution: `for i in range(6):\n    ligne = ""\n    for j in range(6):\n        if (i + j) % 2 == 0:\n            ligne = ligne + "#"\n        else:\n            ligne = ligne + "."\n    print(ligne)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Toutes les paires de dés",
          contenu: `
            <p>Affiche toutes les combinaisons de deux dés dont la somme vaut
            <strong>7</strong> :</p>
            <pre class="bloc-code"><code>1 + 6
2 + 5
3 + 4
4 + 3
5 + 2
6 + 1
6 combinaisons</code></pre>
            <p>Deux boucles imbriquées de 1 à 6, un test, et un compteur.</p>`,
          depart: `compteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
              { motif: "\\bif\\b", message: "Il faut tester la somme." },
            ],
            codeAbsent: [
              { motif: "\\b6 combinaisons", message: "Le compte doit être calculé." },
            ],
            sortie: "1 + 6\n2 + 5\n3 + 4\n4 + 3\n5 + 2\n6 + 1\n6 combinaisons",
          },
          felicitation: "36 combinaisons parcourues, 6 retenues. C'est la probabilité du 7. 🎲",
          indices: [
            "Les deux boucles vont de 1 à 6 inclus, et parcourent donc 36 couples.",
            "Le test compare la somme des deux dés à 7.",
            "Le compteur s'incrémente dans le test ; le dernier <code>print</code> est en dehors des deux boucles.",
          ],
          solution: `compteur = 0\n\nfor de1 in range(1, 7):\n    for de2 in range(1, 7):\n        if de1 + de2 == 7:\n            print(de1, "+", de2)\n            compteur = compteur + 1\n\nprint(compteur, "combinaisons")\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 20,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Les nombres premiers jusqu'à 30",
          contenu: `
            <p>Affiche tous les nombres premiers entre 2 et 30 :</p>
            <pre class="bloc-code"><code>2
3
5
7
11
13
17
19
23
29</code></pre>
            <p>Deux boucles imbriquées : l'extérieure parcourt les candidats, l'intérieure
            cherche un diviseur. Un <strong>drapeau</strong> booléen retient le verdict.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
              { motif: "=\\s*False", message: "Un drapeau booléen doit être abaissé quand un diviseur est trouvé." },
            ],
            sortie: "2\n3\n5\n7\n11\n13\n17\n19\n23\n29",
          },
          felicitation: "Le crible le plus simple qui soit — et il marche. 🔢",
          indices: [
            "Pour chaque candidat, pars du principe qu'il est premier, puis cherche à te contredire.",
            "La boucle intérieure teste les diviseurs de 2 à n − 1 ; dès qu'elle en trouve un, elle abaisse le drapeau.",
            "Un <code>break</code> après avoir abaissé le drapeau évite des tours inutiles.",
          ],
          solution: `for n in range(2, 31):\n    premier = True\n    for d in range(2, n):\n        if n % d == 0:\n            premier = False\n            break\n    if premier:\n        print(n)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le sapin de Noël",
          contenu: `
            <p>Un sapin de hauteur 5, centré, construit par deux boucles imbriquées :</p>
            <pre class="bloc-code sans-copie"><code>    *
   ***
  *****
 *******
*********
    |</code></pre>
            <p>Interdit d'utiliser la répétition de texte : chaque ligne se construit
            caractère par caractère.</p>`,
          depart: `hauteur = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut des boucles imbriquées." },
              { motif: "\\bhauteur\\b[\\s\\S]*\\bhauteur\\b", message: "Sers-toi de la variable hauteur : le sapin doit pouvoir grandir." },
            ],
            codeAbsent: [
              { motif: "\\*\\s*\\(|\\)\\s*\\*\\s*\"", message: "Pas de répétition de texte : construis les lignes caractère par caractère." },
            ],
            sortie: "    *\n   ***\n  *****\n *******\n*********\n    |",
          },
          felicitation: "Change la hauteur en 8 : le sapin grandit tout seul. 🎄",
          indices: [
            "À la ligne <code>i</code> (de 1 à hauteur), il y a <code>hauteur - i</code> espaces puis <code>2 * i - 1</code> étoiles.",
            "Deux boucles intérieures successives : une pour les espaces, une pour les étoiles.",
            "Le tronc se traite après la boucle principale, sur le même principe.",
          ],
          solution: `hauteur = 5\n\nfor i in range(1, hauteur + 1):\n    ligne = ""\n    for espace in range(hauteur - i):\n        ligne = ligne + " "\n    for etoile in range(2 * i - 1):\n        ligne = ligne + "*"\n    print(ligne)\n\ntronc = ""\nfor espace in range(hauteur - 1):\n    tronc = tronc + " "\nprint(tronc + "|")\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Sortir de deux boucles à la fois",
          contenu: `
            <p><code>break</code> ne sort que de la boucle où il se trouve. Pour arrêter
            <strong>les deux</strong>, il faut un drapeau.</p>
            <p>Cherche le premier couple <em>(i ; j)</em>, avec <em>i</em> et <em>j</em>
            entre 1 et 20, tel que <em>i</em> × <em>j</em> soit un multiple de 91 — puis
            arrête tout :</p>
            <pre class="bloc-code"><code>Trouvé : 7 x 13</code></pre>`,
          depart: `trouve = False\n\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Il faut deux boucles imbriquées." },
              { motif: "\\bbreak\\b[\\s\\S]*\\bbreak\\b", message: "Il faut deux break : un par boucle." },
              { motif: "trouve", message: "Le drapeau sert à propager l'arrêt à la boucle extérieure." },
            ],
            sortie: "Trouvé : 7 x 13",
          },
          felicitation: "Le drapeau propage l'arrêt à la boucle extérieure. 🚩",
          indices: [
            "Dans la boucle intérieure : quand le produit convient, affiche, lève le drapeau, et <code>break</code>.",
            "Dans la boucle extérieure, juste après la boucle intérieure : <code>if trouve: break</code>.",
            "La condition de la boucle extérieure peut aussi tester le drapeau — mais le double <code>break</code> est plus lisible.",
          ],
          solution: `trouve = False\n\nfor i in range(1, 21):\n    for j in range(1, 21):\n        if i * j % 91 == 0:\n            print("Trouvé :", i, "x", j)\n            trouve = True\n            break\n    if trouve:\n        break\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Ton motif à toi",
          contenu: `
            <p>Défi libre. Écris un programme contenant <strong>deux boucles
            imbriquées</strong> qui produit un motif, un tableau ou une liste de
            combinaisons — <strong>au moins cinq lignes</strong> affichées.</p>
            <p>Des idées : une pyramide inversée, un carré creux, une table de Pythagore,
            tous les couples de dés dont la somme est paire, un dégradé de caractères…</p>`,
          depart: `# Ton motif\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*\\n {4,}for", message: "Ton programme doit contenir deux boucles imbriquées." },
              { motif: "\\bprint\\b", message: "Il doit afficher quelque chose." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n",
            sortieRegexMessage: "Ton programme doit afficher au moins cinq lignes.",
          },
          felicitation: "Séance 10 terminée, et la partie 3 avec elle. 🏁",
          indices: [
            "Le schéma le plus courant : construire une chaîne dans la boucle intérieure, l'afficher dans l'extérieure.",
            "Pense à remettre la chaîne à vide au début de chaque tour extérieur.",
          ],
          solution: `taille = 6\n\nfor i in range(taille):\n    ligne = ""\n    for j in range(taille):\n        if i == 0 or i == taille - 1 or j == 0 or j == taille - 1:\n            ligne = ligne + "#"\n        else:\n            ligne = ligne + " "\n    print(ligne)\n`,
        },
      ],
    },
  ],
};

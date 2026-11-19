/* NSI — chapitre 4, séance 10 : extremum et moyenne.
 * Reprend les sections 5, 6 et 7 de « Premiers algorithmes » (maximum, minimum,
 * position du record, moyenne, bilan), le TP3 et les exercices 17, 18 et 20.
 */

export default {
  id: "s10",
  numero: 10,
  titre: "Extremum et moyenne",
  sousTitre: "Chercher un record, sa position, et calculer une moyenne",
  palier: "Partie 3 — Premiers algorithmes",

  accroche: `<code>max()</code>, <code>min()</code>, <code>sum()</code> : Python les
    fournit, et tu t'en sers depuis la séance 2. Mais comment font-elles ? Cette
    séance te fait reprogrammer les trois derniers algorithmes de référence : le
    <strong>maximum</strong>, le <strong>minimum</strong> et la
    <strong>moyenne</strong>.`,

  objectifs: [
    "chercher le maximum ou le minimum d'un tableau, sans <code>max()</code> ni <code>min()</code>",
    "initialiser le record avec le <strong>premier élément</strong>, jamais avec 0",
    "trouver la <strong>position</strong> du record",
    "calculer une moyenne en un seul parcours",
  ],

  motDeLaFin: `Tu connais maintenant tous les algorithmes de référence du chapitre :
    recherche d'une occurrence, première position, toutes les positions, extremum
    et moyenne. Fais le bilan de la partie 3, puis on termine le chapitre avec les
    chaînes de caractères.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 40,
      etoiles: 1,
      intention: "on avance ensemble, une idée à la fois",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Chercher un record",
          contenu: `
            <p>Pour trouver la plus grande valeur d'un tableau, il faut examiner
            <strong>tout</strong> le tableau : un record peut se cacher dans la toute
            dernière case. C'est un parcours total, qui suit une idée en trois temps :</p>

            <ol>
              <li>on suppose que le <strong>premier</strong> élément est le maximum ;</li>
              <li>on parcourt le tableau ;</li>
              <li>dès qu'on rencontre une valeur plus grande, on met le record à jour.</li>
            </ol>

            <p>Avec le tableau <code>[12, 15, 9, 18, 14]</code>, le record évolue ainsi :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Élément lu</th><td>départ</td><td>12</td><td>15</td><td>9</td><td>18</td><td>14</td></tr>
              <tr><th>Record</th><td>12</td><td>12</td><td>15</td><td>15</td><td>18</td><td>18</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">Une variable qui mémorise le meilleur</span>
              La variable du record — <code>maxi</code>, ou <code>record</code> — garde
              <strong>la plus grande valeur rencontrée jusqu'ici</strong>. C'est encore un
              accumulateur : préparé avant la boucle, mis à jour dedans, renvoyé après.
            </div>`,
        },

        {
          id: "d2",
          type: "qcm",
          titre: "Combien de records battus ?",
          contenu: `<p>On applique la méthode au tableau
            <code>[4, 9, 2, 11, 11, 6]</code> : le record démarre au premier élément, et
            n'est remplacé que par une valeur <strong>strictement</strong> plus grande.</p>`,
          question: "Combien de fois le record change-t-il de valeur ?",
          options: [
            { texte: "2 fois", correct: true,
              explication: "Oui : 4 → 9, puis 9 → 11. Le second 11 n'est pas strictement plus grand que le record : il ne le change pas." },
            { texte: "3 fois",
              explication: "Le second 11 égale le record sans le battre : avec une comparaison stricte, rien ne change." },
            { texte: "5 fois",
              explication: "Le record ne change pas à chaque élément : seulement quand on trouve mieux." },
            { texte: "1 fois",
              explication: "Suis le record pas à pas : 4, puis 9, puis 11. Il a changé deux fois." },
          ],
          apres: `<span class="chapo">Le record final, lui, ne dépend pas de ce détail</span>
            Avec <code>></code> ou <code>>=</code>, on trouve le même maximum, 11. La
            différence comptera quand on cherchera la <strong>position</strong> du record :
            le premier 11, ou le dernier ?`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Le maximum",
          contenu: `
            <p>Écris la fonction <code>maximum(tableau)</code>, qui renvoie la plus grande
            valeur d'un tableau non vide, <strong>sans utiliser <code>max()</code></strong>.</p>
            <pre class="bloc-code"><code>maximum([12, 15, 9, 18, 14])    # renvoie 18
maximum([-5, -2, -9])           # renvoie -2</code></pre>`,
          depart: `def maximum(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Chercher un maximum est un parcours total : utilise une boucle for." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "Sans max() : c'est ce que tu reprogrammes." },
              { motif: "\\bsort(ed)?\\b", message: "Pas de tri : un seul parcours suffit." },
            ],
            tests: `assert maximum([12, 15, 9, 18, 14]) == 18, "maximum([12, 15, 9, 18, 14]) doit renvoyer 18"\nassert maximum([-5, -2, -9]) == -2, "avec des nombres négatifs, maximum([-5, -2, -9]) doit renvoyer -2"\nassert maximum([7]) == 7, "le maximum d'un seul élément est cet élément"\nassert maximum([3, 8, 20]) == 20, "le record peut être dans la dernière case"`,
          },
          felicitation: "Tu viens de reprogrammer max(). 🏆",
          indices: [
            "Avant la boucle, le record reçoit le premier élément du tableau ; après la boucle, on le renvoie.",
            "Dans la boucle, un <code>if</code> compare l'élément au record ; s'il est plus grand, le record reçoit l'élément.",
          ],
          solution: `def maximum(tableau):\n    maxi = tableau[0]\n    for element in tableau:\n        if element > maxi:\n            maxi = element\n    return maxi\n`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Et si le record partait de 0 ?",
          contenu: `<p>Marc trouve plus simple d'initialiser le record à 0. Il essaie sa
            version sur des températures d'hiver.</p>`,
          code: `def maximum(tableau):\n    maxi = 0\n    for element in tableau:\n        if element > maxi:\n            maxi = element\n    return maxi\n\nprint(maximum([-3, -7, -1]))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>-1</code>",
              explication: "C'est le vrai maximum… mais aucun élément n'est plus grand que 0, donc le record n'est jamais mis à jour." },
            { texte: "<code>0</code>", correct: true,
              explication: "Oui : aucune température ne dépasse 0, le record reste à sa valeur de départ. La fonction renvoie 0, une valeur qui n'est même pas dans le tableau !" },
            { texte: "<code>-7</code>",
              explication: "-7 est le minimum, pas le maximum." },
            { texte: "une erreur",
              explication: "Le programme s'exécute sans erreur : c'est justement ce qui rend le piège dangereux." },
          ],
          apres: `<span class="chapo">On part toujours du premier élément</span>
            Initialiser le record à 0 suppose que le maximum est positif. En partant de
            <code>tableau[0]</code>, le record est dès le départ une vraie valeur du
            tableau. En contrepartie, le tableau ne doit pas être vide.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Trouver où se cache le record",
          contenu: `
            <p>Souvent, on veut la <strong>position</strong> du record plutôt que sa
            valeur : le jour le plus chaud plutôt que la température, l'élève plutôt que la
            note.</p>

            <p>On mémorise alors l'<strong>indice</strong> du record, ce qui oblige à
            parcourir le tableau par indices :</p>

            <ul>
              <li>au départ, le record est à l'indice 0 ;</li>
              <li>à chaque tour, on compare <code>tableau[i]</code> à la valeur du record,
              c'est-à-dire à <code>tableau[indice_record]</code> ;</li>
              <li>si c'est mieux, c'est l'<strong>indice</strong> qu'on met à jour.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'indice suffit</span>
              Pas besoin de mémoriser aussi la valeur : connaissant l'indice du record, on
              la retrouve à tout moment avec <code>tableau[indice_record]</code>.
            </div>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Le jour le plus froid",
          contenu: `
            <p>Écris la fonction <code>indice_du_minimum(tableau)</code>, qui renvoie
            l'<strong>indice</strong> de la plus petite valeur d'un tableau non vide. En
            cas d'égalité, on garde la première.</p>
            <pre class="bloc-code"><code>indice_du_minimum([4, -2, 7, -5, 0])    # renvoie 3
indice_du_minimum([3, 1, 1])            # renvoie 1</code></pre>`,
          depart: `def indice_du_minimum(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*tableau\\s*\\)\\s*\\)", message: "Pour mémoriser une position, parcours les indices : range(len(tableau))." },
            ],
            codeAbsent: [
              { motif: "\\bmin\\s*\\(|\\.\\s*index\\s*\\(", message: "Sans min() ni index() : un seul parcours suffit." },
            ],
            tests: `assert indice_du_minimum([4, -2, 7, -5, 0]) == 3, "indice_du_minimum([4, -2, 7, -5, 0]) doit renvoyer 3"\nassert indice_du_minimum([3, 1, 1]) == 1, "en cas d'égalité, on garde la première position"\nassert indice_du_minimum([2, 5, 9]) == 0, "le minimum peut être dans la première case"\nassert indice_du_minimum([8]) == 0, "un seul élément : son indice est 0"`,
          },
          felicitation: "On mémorise où, et la valeur se retrouve toute seule. 🥶",
          indices: [
            "L'indice du record démarre à 0 ; à chaque tour, compare <code>tableau[i]</code> à <code>tableau[indice_record]</code>.",
            "Si la case du tour est strictement plus petite, c'est l'indice du record qui reçoit <code>i</code>. Une comparaison stricte garde la première position en cas d'égalité.",
          ],
          solution: `def indice_du_minimum(tableau):\n    indice_record = 0\n    for i in range(len(tableau)):\n        if tableau[i] < tableau[indice_record]:\n            indice_record = i\n    return indice_record\n`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Calculer une moyenne",
          contenu: `
            <p>Dernier algorithme de référence. Pour calculer une moyenne, il faut :</p>
            <ol>
              <li>additionner toutes les valeurs, avec un accumulateur ;</li>
              <li>diviser la somme obtenue par le nombre de valeurs, <strong>une seule
              fois</strong>, après la boucle.</li>
            </ol>

            <pre class="bloc-code"><code>[12, 15, 9, 18, 14]
12 + 15 + 9 + 18 + 14 = 68
68 / 5 = 13.6</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Attention au tableau vide</span>
              <code>len(tableau)</code> vaudrait 0, et la division serait impossible. On
              suppose donc le tableau non vide — ou on prévoit ce cas à part.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "La moyenne",
          contenu: `
            <p>Écris la fonction <code>moyenne(tableau)</code>, qui renvoie la moyenne des
            valeurs d'un tableau non vide, en <strong>un seul parcours</strong> et sans
            <code>sum()</code>.</p>
            <pre class="bloc-code"><code>moyenne([12, 15, 9, 18, 14])    # renvoie 13.6</code></pre>`,
          depart: `def moyenne(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Additionne les valeurs avec une boucle for." },
              { motif: "len\\s*\\(\\s*tableau\\s*\\)", message: "Divise par le nombre de valeurs : len(tableau)." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est un accumulateur qu'on attend." },
            ],
            tests: `assert moyenne([12, 15, 9, 18, 14]) == 13.6, "moyenne([12, 15, 9, 18, 14]) doit renvoyer 13.6"\nassert moyenne([10, 20]) == 15, "moyenne([10, 20]) doit renvoyer 15.0"\nassert moyenne([7]) == 7, "la moyenne d'un seul élément est cet élément"\nassert moyenne([-4, 4]) == 0, "moyenne([-4, 4]) doit renvoyer 0.0"`,
          },
          felicitation: "Un total, une division après la boucle : la moyenne. 📊",
          indices: [
            "Un total à 0 avant la boucle ; dans la boucle, chaque élément s'y ajoute.",
            "Après la boucle seulement, on renvoie le total divisé par le nombre d'éléments.",
          ],
          solution: `def moyenne(tableau):\n    total = 0\n    for element in tableau:\n        total = total + element\n    return total / len(tableau)\n`,
        },

        {
          id: "d9",
          type: "prediction",
          titre: "Un return trop pressé",
          contenu: `<p>Dans cette version, le <code>return</code> a été indenté d'un cran
            de trop.</p>`,
          code: `def moyenne(tableau):\n    total = 0\n    for element in tableau:\n        total = total + element\n        return total / len(tableau)\n\nprint(moyenne([10, 20, 30]))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>20.0</code>",
              explication: "C'est la vraie moyenne, mais la fonction s'arrête avant d'avoir additionné toutes les valeurs." },
            { texte: "<code>3.3333333333333335</code>", correct: true,
              explication: "Oui : au premier tour, total vaut 10, et le <code>return</code> renvoie aussitôt 10 / 3. Les autres valeurs ne sont jamais lues." },
            { texte: "<code>60</code>",
              explication: "Le <code>return</code> divise bien par <code>len(tableau)</code> — mais dès le premier tour." },
            { texte: "<code>10</code>",
              explication: "Le total vaut 10 au premier tour, mais il est divisé par 3 avant d'être renvoyé." },
          ],
          apres: `<span class="chapo">La division après la boucle</span>
            Un <code>return</code> dans la boucle transforme un parcours total en parcours
            partiel, sans le vouloir. La division, comme le <code>return</code>, se place
            au niveau du <code>for</code>.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>maxi = tableau[0]                  # jamais 0
for element in tableau:
    if element > maxi:
        maxi = element

indice_record = 0                  # la position du record
for i in range(len(tableau)):
    if tableau[i] > tableau[indice_record]:
        indice_record = i

total = 0                          # la moyenne
for element in tableau:
    total = total + element
moyenne = total / len(tableau)     # après la boucle</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Algorithme</th><th>Parcours</th><th>Ce qu'il renvoie</th></tr>
              <tr><td>Recherche d'une occurrence</td><td>partiel</td><td>un booléen</td></tr>
              <tr><td>Indice de la première occurrence</td><td>partiel</td><td>un indice, ou -1</td></tr>
              <tr><td>Toutes les occurrences</td><td>total</td><td>une liste d'indices, vide si absente</td></tr>
              <tr><td>Minimum, maximum</td><td>total</td><td>la plus petite, la plus grande valeur</td></tr>
              <tr><td>Moyenne</td><td>total</td><td>un nombre qui résume la série</td></tr>
            </table>
            </div>

            <p>Python propose les raccourcis <code>max(L)</code>, <code>min(L)</code> et
            <code>sum(L) / len(L)</code> : utilise-les dans tes programmes, et sache
            réécrire les algorithmes.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>initialiser le record à 0 : faux dès que toutes les valeurs sont négatives ;</li>
                <li>diviser dans la boucle, ou y placer le <code>return</code> ;</li>
                <li>mémoriser la valeur du record quand on demande sa position.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 35,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Dérouler la recherche d'un maximum",
          contenu: `<p>On applique l'algorithme <code>maximum</code> au tableau
            <code>[7, 3, 12, 9, 15, 2]</code>.</p>`,
          question: "Quelles valeurs prend maxi, du départ jusqu'au dernier élément lu ?",
          options: [
            { texte: "7, 7, 7, 12, 12, 15, 15", correct: true,
              explication: "Oui : départ 7, puis 7 (7 lu), 7 (3 lu), 12 (12 lu), 12 (9 lu), 15 (15 lu), 15 (2 lu). Le record a changé deux fois, et la fonction renvoie 15." },
            { texte: "0, 7, 7, 12, 12, 15, 15",
              explication: "maxi démarre au premier élément, 7, et non à 0." },
            { texte: "7, 3, 12, 9, 15, 2",
              explication: "Ce sont les éléments lus. maxi, lui, ne change que lorsqu'on trouve mieux." },
            { texte: "7, 7, 7, 12, 12, 15, 2",
              explication: "2 est plus petit que 15 : il ne remplace pas le record." },
          ],
          apres: `<span class="chapo">Un record ne peut que monter</span>
            La valeur de <code>maxi</code> stagne ou augmente, tour après tour. Ici, elle a
            changé deux fois : à la lecture de 12, puis de 15.`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Le tableau vide",
          contenu: `<p>On applique la fonction <code>maximum</code> de la découverte à un
            tableau vide : <code>maximum([])</code>.</p>`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "la fonction renvoie 0",
              explication: "Rien dans la fonction n'écrit 0 : le record démarre à <code>tableau[0]</code>." },
            { texte: "la fonction renvoie None",
              explication: "La fonction n'arrive jamais jusqu'au <code>return</code>." },
            { texte: "une erreur IndexError, dès la ligne maxi = tableau[0]", correct: true,
              explication: "Oui : un tableau vide n'a pas de premier élément. Chercher un maximum n'a d'ailleurs aucun sens dans ce cas." },
            { texte: "une boucle infinie",
              explication: "Une boucle <code>for</code> sur un tableau vide ne fait aucun tour — mais on ne l'atteint même pas." },
          ],
          apres: `<span class="chapo">Une précondition</span>
            La fonction suppose un tableau <strong>non vide</strong> : c'est une condition
            que l'appelant doit respecter. Le chapitre suivant apprendra à écrire ces
            conditions noir sur blanc dans la spécification.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Station météo",
          contenu: `
            <p>Les fonctions <code>maximum</code> et <code>moyenne</code> sont déjà
            écrites. Complète, <strong>sans utiliser <code>min()</code> ni
            <code>max()</code></strong> :</p>
            <ul>
              <li><code>minimum(tableau)</code>, qui renvoie la température la plus basse ;</li>
              <li><code>extremum(tableau)</code>, qui renvoie la liste
              <code>[maximum, minimum, moyenne]</code> et doit <strong>appeler</strong> les
              trois autres fonctions.</li>
            </ul>
            <p>⚠️ Les températures peuvent être négatives.</p>`,
          depart: `temperatures = [12, -3, 8, 15, -7, 4]\n\n\ndef maximum(tableau):\n    maxi = tableau[0]\n    for element in tableau:\n        if element > maxi:\n            maxi = element\n    return maxi\n\n\ndef moyenne(tableau):\n    total = 0\n    for element in tableau:\n        total = total + element\n    return total / len(tableau)\n\n\ndef minimum(tableau):\n    pass\n\n\ndef extremum(tableau):\n    pass\n\n\nprint(extremum(temperatures))\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+extremum[\\s\\S]*\\bmaximum\\s*\\(", message: "extremum doit appeler maximum." },
              { motif: "def\\s+extremum[\\s\\S]*\\bminimum\\s*\\(", message: "extremum doit appeler minimum." },
              { motif: "def\\s+extremum[\\s\\S]*\\bmoyenne\\s*\\(", message: "extremum doit appeler moyenne." },
            ],
            codeAbsent: [
              { motif: "\\b(min|max)\\s*\\(", message: "Sans min() ni max() : c'est ce que tu reprogrammes." },
            ],
            tests: `assert minimum([12, -3, 8, 15, -7, 4]) == -7, "minimum des températures : -7"\nassert minimum([5, 9, 6]) == 5, "minimum([5, 9, 6]) doit renvoyer 5"\nassert minimum([-1, -8, -3]) == -8, "minimum([-1, -8, -3]) doit renvoyer -8"\n_e = extremum([12, -3, 8, 15, -7, 4])\nassert _e[0] == 15 and _e[1] == -7, "extremum doit renvoyer [maximum, minimum, moyenne] : ici 15, puis -7"\nassert abs(_e[2] - 4.8333) < 0.001, "la moyenne des températures vaut environ 4.83"`,
          },
          felicitation: "Trois fonctions qui coopèrent pour un bulletin météo. 🌦️",
          indices: [
            "<code>minimum</code> est le miroir de <code>maximum</code> : seule la comparaison change de sens.",
            "<code>extremum</code> tient en une ligne : un <code>return</code> suivi d'une liste de trois appels.",
          ],
          solution: `temperatures = [12, -3, 8, 15, -7, 4]\n\n\ndef maximum(tableau):\n    maxi = tableau[0]\n    for element in tableau:\n        if element > maxi:\n            maxi = element\n    return maxi\n\n\ndef moyenne(tableau):\n    total = 0\n    for element in tableau:\n        total = total + element\n    return total / len(tableau)\n\n\ndef minimum(tableau):\n    mini = tableau[0]\n    for element in tableau:\n        if element < mini:\n            mini = element\n    return mini\n\n\ndef extremum(tableau):\n    return [maximum(tableau), minimum(tableau), moyenne(tableau)]\n\n\nprint(extremum(temperatures))\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : la plus basse température",
          contenu: `
            <p>La fonction <code>plus_froid</code> devrait renvoyer la température la plus
            basse d'un relevé. Le programme devrait afficher :</p>
            <pre class="bloc-code"><code>-7
8</code></pre>
            <p>Elle contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-la, lis les messages, et corrige-les une par une.</p>`,
          depart: `def plus_froid(temperatures):\n    mini = 0\n    for t in temperatures\n        if t > mini:\n            mini = t\n    return mini\n\n\nprint(plus_froid([3, -2, 5, -7, 0]))\nprint(plus_froid([12, 8, 15]))\n`,
          validation: {
            codeAbsent: [
              { motif: "mini\\s*=\\s*0\\b", message: "Le record ne doit pas partir de 0 : il part du premier élément." },
            ],
            sortie: "-7\n8",
            tests: `assert plus_froid([4, -1, -6]) == -6, "plus_froid([4, -1, -6]) doit renvoyer -6"`,
          },
          felicitation: "Un deux-points, une comparaison inversée, une initialisation piégée : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde la fin de la ligne du <code>for</code>.",
            "Ensuite, la fonction renvoie la température la plus <strong>haute</strong> : la comparaison va dans le mauvais sens.",
            "Enfin, le second relevé donne 0 au lieu de 8 : le record ne doit pas démarrer à 0, mais au premier élément du relevé.",
          ],
          solution: `def plus_froid(temperatures):\n    mini = temperatures[0]\n    for t in temperatures:\n        if t < mini:\n            mini = t\n    return mini\n\n\nprint(plus_froid([3, -2, 5, -7, 0]))\nprint(plus_froid([12, 8, 15]))\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "L'audience des derniers jours",
          contenu: `
            <p>Le tableau <code>vues</code> contient le nombre de vues quotidiennes d'une
            chaîne vidéo, du jour le plus ancien (indice 0) au plus récent (dernier
            indice).</p>
            <p>Écris <code>moyenne_vues(donnees, nb_jours)</code>, qui renvoie le nombre
            moyen de vues sur les <code>nb_jours</code> <strong>derniers</strong> jours.
            Les derniers jours ne commencent pas à l'indice 0 : avec 20 valeurs et les 7
            derniers jours, il faut parcourir les indices de 20 − 7 = 13 jusqu'à 19.</p>`,
          depart: `vues = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210,\n        175, 160, 500, 640, 320, 280, 240, 190, 210, 260]\n\n\ndef moyenne_vues(donnees, nb_jours):\n    pass\n\n\nprint(moyenne_vues(vues, 7))\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*donnees\\s*\\)\\s*-\\s*nb_jours", message: "Le premier indice à lire se calcule : len(donnees) - nb_jours." },
            ],
            tests: `_v = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210, 175, 160, 500, 640, 320, 280, 240, 190, 210, 260]\nassert abs(moyenne_vues(_v, 7) - 305.714) < 0.01, "sur les 7 derniers jours, la moyenne vaut environ 305.71"\nassert moyenne_vues(_v, 1) == 260, "sur le dernier jour seulement, la moyenne vaut 260"\nassert moyenne_vues(_v, 20) == 268.5, "sur les 20 jours, la moyenne vaut 268.5"\nassert moyenne_vues([10, 20, 30, 40], 2) == 35, "moyenne_vues([10, 20, 30, 40], 2) doit renvoyer 35.0"`,
          },
          felicitation: "Exactement ce que calcule un tableau de bord d'audience. 📺",
          indices: [
            "Un total à 0, puis une boucle sur un <code>range</code> à deux bornes : le premier indice à lire, et la longueur du tableau.",
            "Après la boucle, on divise le total par <code>nb_jours</code>, le nombre de valeurs lues — pas par la longueur du tableau.",
          ],
          solution: `vues = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210,\n        175, 160, 500, 640, 320, 280, 240, 190, 210, 260]\n\n\ndef moyenne_vues(donnees, nb_jours):\n    total = 0\n    for i in range(len(donnees) - nb_jours, len(donnees)):\n        total = total + donnees[i]\n    return total / nb_jours\n\n\nprint(moyenne_vues(vues, 7))\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le jour record",
          contenu: `
            <p>Écris <code>meilleur_jour(donnees)</code>, qui renvoie l'<strong>indice</strong>
            du jour où la chaîne a fait le plus de vues. On cherche la position du record,
            pas sa valeur.</p>
            <pre class="bloc-code"><code>meilleur_jour(vues)    # renvoie 13</code></pre>`,
          depart: `vues = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210,\n        175, 160, 500, 640, 320, 280, 240, 190, 210, 260]\n\n\ndef meilleur_jour(donnees):\n    pass\n\n\nprint(meilleur_jour(vues))\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*donnees\\s*\\)\\s*\\)", message: "Pour mémoriser une position, parcours les indices : range(len(donnees))." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(|\\.\\s*index\\s*\\(", message: "Sans max() ni index() : un seul parcours suffit." },
            ],
            sortie: "13",
            tests: `assert meilleur_jour([5, 9, 2]) == 1, "meilleur_jour([5, 9, 2]) doit renvoyer 1"\nassert meilleur_jour([8, 3, 1]) == 0, "le record peut être le premier jour"\nassert meilleur_jour([1, 2, 30]) == 2, "le record peut être le dernier jour"`,
          },
          felicitation: "Le jour 13, avec 640 vues : la position du record, en un parcours. 🥇",
          indices: [
            "C'est le schéma de <code>indice_du_minimum</code>, avec la comparaison dans l'autre sens.",
            "L'indice du record démarre à 0 ; il reçoit <code>i</code> quand <code>donnees[i]</code> dépasse <code>donnees[indice_record]</code>.",
          ],
          solution: `vues = [120, 95, 240, 310, 180, 150, 420, 380, 290, 210,\n        175, 160, 500, 640, 320, 280, 240, 190, 210, 260]\n\n\ndef meilleur_jour(donnees):\n    indice_record = 0\n    for i in range(len(donnees)):\n        if donnees[i] > donnees[indice_record]:\n            indice_record = i\n    return indice_record\n\n\nprint(meilleur_jour(vues))\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 25,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le podium des valeurs",
          contenu: `
            <p>Écris la fonction <code>deux_meilleurs(tableau)</code>, qui renvoie la liste
            <code>[plus grande valeur, deuxième plus grande valeur]</code>, en
            <strong>un seul parcours</strong>, sans trier ni utiliser <code>max()</code>.
            Le tableau contient au moins deux valeurs, toutes différentes.</p>
            <pre class="bloc-code"><code>deux_meilleurs([5, 12, 8, 20, 3])    # renvoie [20, 12]</code></pre>`,
          depart: `def deux_meilleurs(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(|\\bsort(ed)?\\b", message: "Sans max() ni tri : deux records suffisent." },
            ],
            tests: `assert deux_meilleurs([5, 12, 8, 20, 3]) == [20, 12], "deux_meilleurs([5, 12, 8, 20, 3]) doit renvoyer [20, 12]"\nassert deux_meilleurs([1, 2]) == [2, 1], "deux_meilleurs([1, 2]) doit renvoyer [2, 1]"\nassert deux_meilleurs([9, 4, 7]) == [9, 7], "deux_meilleurs([9, 4, 7]) doit renvoyer [9, 7]"\nassert deux_meilleurs([-5, -1, -3]) == [-1, -3], "la fonction doit marcher avec des nombres négatifs"`,
          },
          felicitation: "Deux records tenus à jour en même temps. 🥈",
          indices: [
            "Garde deux records, le premier et le deuxième. Initialise-les avec les deux premiers éléments, dans le bon ordre.",
            "Pour chaque élément suivant : s'il bat le premier, l'ancien premier devient deuxième ; sinon, s'il bat seulement le deuxième, il le remplace.",
          ],
          solution: `def deux_meilleurs(tableau):\n    if tableau[0] > tableau[1]:\n        premier = tableau[0]\n        deuxieme = tableau[1]\n    else:\n        premier = tableau[1]\n        deuxieme = tableau[0]\n    for i in range(2, len(tableau)):\n        if tableau[i] > premier:\n            deuxieme = premier\n            premier = tableau[i]\n        elif tableau[i] > deuxieme:\n            deuxieme = tableau[i]\n    return [premier, deuxieme]\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Au-dessus de la moyenne",
          contenu: `
            <p>Écris la fonction <code>au_dessus_moyenne(tableau)</code>, qui renvoie le
            <strong>nombre</strong> de valeurs strictement supérieures à la moyenne du
            tableau, supposé non vide.</p>
            <pre class="bloc-code"><code>au_dessus_moyenne([8, 12, 13, 7])    # la moyenne vaut 10 : renvoie 2</code></pre>`,
          depart: `def au_dessus_moyenne(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
            ],
            tests: `assert au_dessus_moyenne([8, 12, 13, 7]) == 2, "au_dessus_moyenne([8, 12, 13, 7]) doit renvoyer 2"\nassert au_dessus_moyenne([10, 12, 14]) == 1, "au_dessus_moyenne([10, 12, 14]) doit renvoyer 1"\nassert au_dessus_moyenne([5, 5, 5]) == 0, "aucune valeur n'est strictement au-dessus de la moyenne"\nassert au_dessus_moyenne([1, 2, 3, 10]) == 1, "au_dessus_moyenne([1, 2, 3, 10]) doit renvoyer 1"`,
          },
          felicitation: "Deux parcours : un pour la moyenne, un pour compter. 📈",
          indices: [
            "On ne peut pas comparer à la moyenne avant de la connaître : calcule-la d'abord, dans une variable.",
            "Puis un second parcours, avec un compteur, compare chaque valeur à cette moyenne.",
          ],
          solution: `def au_dessus_moyenne(tableau):\n    total = 0\n    for x in tableau:\n        total = total + x\n    moy = total / len(tableau)\n    compteur = 0\n    for x in tableau:\n        if x > moy:\n            compteur = compteur + 1\n    return compteur\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton tableau de bord",
          contenu: `
            <p>À toi de choisir les données : tes temps au 100 mètres, tes notes, les
            minutes passées sur ton téléphone… Écris un programme qui :</p>
            <ul>
              <li>crée une liste d'<strong>au moins cinq</strong> nombres ;</li>
              <li>définit <strong>au moins deux fonctions</strong> parmi maximum, minimum,
              position du record et moyenne, <strong>sans</strong> <code>max()</code>,
              <code>min()</code> ni <code>sum()</code> ;</li>
              <li>affiche les résultats avec des phrases.</li>
            </ul>`,
          depart: `# Ton tableau de bord ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b[\\s\\S]*\\bdef\\b", message: "Définis au moins deux fonctions." },
              { motif: "\\bprint\\s*\\(", message: "Affiche les résultats." },
            ],
            codeAbsent: [
              { motif: "\\b(max|min|sum)\\s*\\(", message: "Sans max(), min() ni sum() : ce sont tes algorithmes qui calculent." },
            ],
            sortieNonVide: true,
            tests: `_listes = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_")]\nassert any(len(v) >= 5 for v in _listes), "Ta liste doit contenir au moins cinq nombres."`,
          },
          felicitation: "Tes données, tes algorithmes : un vrai tableau de bord. ✨",
          indices: [
            "Commence par ta liste, puis reprends deux des algorithmes du mémo, chacun dans sa fonction.",
            "Termine par des <code>print</code> qui appellent tes fonctions sur ta liste.",
          ],
          solution: `temps = [14.2, 13.8, 14.5, 13.6, 14.0]\n\n\ndef meilleur(tableau):\n    mini = tableau[0]\n    for t in tableau:\n        if t < mini:\n            mini = t\n    return mini\n\n\ndef moyenne(tableau):\n    total = 0\n    for t in tableau:\n        total = total + t\n    return total / len(tableau)\n\n\nprint("Mon meilleur temps :", meilleur(temps), "s")\nprint("Ma moyenne :", round(moyenne(temps), 2), "s")\n`,
        },
      ],
    },
  ],
};

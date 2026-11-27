/* NSI — chapitre 6, séance 3 : renvoyer plusieurs valeurs.
 * Reprend la section « Une fonction qui renvoie un p-uplet » du cours (fonction
 * milieu, récupération dans un p-uplet ou dans deux variables), la partie
 * « Premières utilisations » du TP1 (multiples), et les exercices 4, 5, 6, 8,
 * 9, 10 et 12.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Renvoyer plusieurs valeurs",
  sousTitre: "Un p-uplet pour sortir d'une fonction",
  palier: "Partie 1 — Les p-uplets",

  accroche: `Une fonction ne renvoie qu'<strong>une</strong> valeur. Alors comment
    écrire une fonction qui calcule un quotient <em>et</em> un reste, un minimum
    <em>et</em> un maximum ? En rangeant ses résultats dans un p-uplet — et en les
    déballant à l'arrivée.`,

  objectifs: [
    "écrire une fonction qui renvoie un p-uplet, avec ou sans parenthèses",
    "<strong>déballer</strong> un p-uplet dans plusieurs variables",
    "échanger deux variables en une seule ligne",
    "calculer plusieurs résultats en un seul parcours",
  ],

  motDeLaFin: `Avec <code>return a, b</code> et le déballage, tes fonctions rendent
    autant de résultats que nécessaire. La partie sur les p-uplets s'achève : fais
    le bilan, puis place aux <strong>dictionnaires</strong>, où les valeurs ne se
    retrouvent plus par leur position, mais par leur nom.`,

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
          titre: "Un seul return, plusieurs résultats",
          contenu: `
            <p>Le milieu d'un segment a <strong>deux</strong> coordonnées. Une fonction qui
            le calcule doit donc rendre deux nombres… mais <code>return</code> n'en
            renvoie qu'un. La solution : renvoyer <strong>un p-uplet</strong>, qui les
            contient tous les deux.</p>

            <pre class="bloc-code"><code>def milieu(A, B):
    xI = (A[0] + B[0]) / 2
    yI = (A[1] + B[1]) / 2
    return (xI, yI)

I = milieu((0, 0), (5, 6))
print(I)          # (2.5, 3.0)
print(I[0])       # 2.5 : l'abscisse</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les parenthèses sont facultatives</span>
              Comme à la séance 1, c'est la virgule qui fait le p-uplet :
              <code>return xI, yI</code> renvoie exactement le même couple. Les deux
              écritures se rencontrent ; choisis-en une et tiens-t'y.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Les multiples",
          contenu: `
            <p>Écris la fonction <code>multiples(n)</code>, qui renvoie le
            <strong>triplet</strong> formé du double, du triple et du quadruple de
            <code>n</code>.</p>
            <pre class="bloc-code"><code>multiples(5)     # renvoie (10, 15, 20)
multiples(-1)    # renvoie (-2, -3, -4)</code></pre>`,
          depart: `def multiples(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b[^\\n]*,", message: "Un seul return, qui renvoie les trois valeurs séparées par des virgules." },
            ],
            tests: `assert multiples(5) == (10, 15, 20), "multiples(5) doit renvoyer (10, 15, 20)"\nassert multiples(-1) == (-2, -3, -4), "multiples(-1) doit renvoyer (-2, -3, -4)"\nassert multiples(0) == (0, 0, 0), "multiples(0) doit renvoyer (0, 0, 0)"\nassert type(multiples(1)) == tuple, "la fonction doit renvoyer un p-uplet"`,
          },
          felicitation: "Trois résultats, un seul return. ✖️",
          indices: [
            "Trois calculs : <code>2 * n</code>, puis le triple, puis le quadruple.",
            "Ils se renvoient ensemble, séparés par des virgules, derrière un seul <code>return</code>.",
          ],
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Combien de valeurs ?",
          contenu: `<p>On considère la fonction suivante.</p>`,
          code: `def f():\n    return 2, 5`,
          question: "Que renvoie réellement cette fonction ?",
          options: [
            { texte: "deux valeurs : l'entier 2, puis l'entier 5",
              explication: "Une fonction ne renvoie jamais qu'une valeur. Les deux nombres sont emballés dans un seul objet." },
            { texte: "une seule valeur : le p-uplet <code>(2, 5)</code>", correct: true,
              explication: "Oui : la virgule construit le couple <code>(2, 5)</code>, et c'est lui qui est renvoyé. <code>type(f())</code> vaut <code>tuple</code>." },
            { texte: "seulement 2 : le <code>return</code> s'arrête à la première valeur",
              explication: "<code>return</code> évalue toute l'expression qui le suit, ici <code>2, 5</code>, qui est un couple." },
            { texte: "une erreur : il faut des parenthèses pour renvoyer un p-uplet",
              explication: "Les parenthèses sont facultatives : c'est la virgule qui fait le p-uplet." },
          ],
          apres: `<span class="chapo">Un p-uplet, une seule valeur</span>
            « Renvoyer plusieurs valeurs », c'est en réalité renvoyer <strong>un</strong>
            p-uplet qui les contient. Et comme tout p-uplet, il se lit avec des crochets :
            <code>f()[1]</code> vaut 5.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Déballer un p-uplet",
          contenu: `
            <p>On peut récupérer le résultat d'une fonction de deux manières :</p>

            <pre class="bloc-code"><code>I = milieu((0, 0), (5, 6))       # dans UN p-uplet : I[0], I[1]
xI, yI = milieu((0, 0), (5, 6))  # dans DEUX variables : xI vaut 2.5, yI vaut 3.0</code></pre>

            <div class="encadre">
              <span class="chapo">Le déballage</span>
              Quand on écrit plusieurs variables, séparées par des virgules, à gauche du
              <code>=</code>, Python <strong>déballe</strong> le p-uplet de droite : la
              première variable reçoit la première composante, la deuxième la
              deuxième… Il faut <strong>autant de variables que de composantes</strong>.
            </div>

            <p>Le déballage marche avec n'importe quel p-uplet, pas seulement un résultat
            de fonction : <code>x, y = point</code> évite d'écrire <code>point[0]</code> et
            <code>point[1]</code> partout.</p>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Récupérer les multiples de 5",
          contenu: `
            <p>La fonction <code>multiples</code> est écrite. En <strong>une seule
            instruction</strong>, appelle-la pour <code>n = 5</code> et range ses trois
            résultats dans les variables <code>a</code>, <code>b</code> et <code>c</code>.
            Range ensuite dans <code>d</code> la somme du double et du triple de 5, en te
            servant de <code>a</code> et <code>b</code>, puis affiche <code>d</code>.</p>
            <pre class="bloc-code"><code>25</code></pre>`,
          depart: `def multiples(n):\n    return (2 * n, 3 * n, 4 * n)\n\n\n`,
          validation: {
            codeContient: [
              { motif: "\\ba\\s*,\\s*b\\s*,\\s*c\\s*=\\s*multiples\\s*\\(\\s*5\\s*\\)", message: "Déballe le résultat de multiples(5) dans a, b et c, en une seule ligne." },
              { motif: "\\bd\\s*=\\s*(a\\s*\\+\\s*b|b\\s*\\+\\s*a)\\b", message: "d se calcule à partir de a et de b." },
            ],
            codeAbsent: [
              { motif: "\\b25\\b", message: "Le résultat doit être calculé par Python, pas écrit à la main." },
            ],
            sortie: "25",
            tests: `assert (a, b, c) == (10, 15, 20), "a, b et c doivent valoir 10, 15 et 20"`,
          },
          felicitation: "Trois variables remplies en une ligne : c'est le déballage. 📦",
          indices: [
            "À gauche du <code>=</code>, les trois noms de variables séparés par des virgules ; à droite, l'appel de la fonction.",
            "Puis <code>d</code> reçoit la somme des deux premières variables, et un <code>print</code> l'affiche.",
          ],
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Une variable de trop",
          contenu: `<p>Toujours avec la fonction <code>f</code> qui renvoie <code>2, 5</code>.</p>`,
          code: `def f():\n    return 2, 5\n\na, b, c = f()\nprint(a, b, c)`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "il affiche <code>2 5 None</code>",
              explication: "Python ne complète pas avec <code>None</code> : il exige le compte exact." },
            { texte: "il affiche <code>2 5 5</code>",
              explication: "Python ne réutilise pas la dernière valeur : il exige le compte exact." },
            { texte: "il s'arrête sur une erreur", correct: true,
              explication: "Oui : <code>ValueError: not enough values to unpack (expected 3, got 2)</code>. Trois variables, deux composantes : le déballage échoue." },
            { texte: "il affiche <code>(2, 5)</code>, rangé dans <code>a</code>",
              explication: "Avec plusieurs variables à gauche, Python déballe toujours ; il ne range pas tout dans la première." },
          ],
          apres: `<span class="chapo">Autant de variables que de composantes</span>
            Le message est clair : il attendait 3 valeurs (<em>expected 3</em>), il en a
            reçu 2 (<em>got 2</em>). Dans l'autre sens, <code>a = f()</code> fonctionne
            toujours : <code>a</code> reçoit le p-uplet entier.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Division euclidienne",
          contenu: `
            <p>Écris la fonction <code>division_euclidienne(a, b)</code>, qui renvoie le
            couple <code>(quotient, reste)</code> de la division de <code>a</code> par
            <code>b</code>.</p>
            <pre class="bloc-code"><code>division_euclidienne(17, 5)     # renvoie (3, 2), car 17 = 5 × 3 + 2
division_euclidienne(20, 4)     # renvoie (5, 0)</code></pre>`,
          depart: `def division_euclidienne(a, b):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le quotient entier s'obtient avec l'opérateur //." },
              { motif: "%", message: "Le reste s'obtient avec l'opérateur %." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le couple." },
            ],
            codeAbsent: [
              { motif: "\\bdivmod\\s*\\(", message: "Utilise les opérateurs // et %, pas divmod()." },
            ],
            tests: `assert division_euclidienne(17, 5) == (3, 2), "division_euclidienne(17, 5) doit renvoyer (3, 2)"\nassert division_euclidienne(20, 4) == (5, 0), "division_euclidienne(20, 4) doit renvoyer (5, 0)"\nassert division_euclidienne(3, 7) == (0, 3), "division_euclidienne(3, 7) doit renvoyer (0, 3)"\nassert type(division_euclidienne(9, 2)) == tuple, "la fonction doit renvoyer un p-uplet"`,
          },
          felicitation: "Deux opérateurs du chapitre 1, un couple pour les rendre. ➗",
          indices: [
            "Le quotient entier et le reste ont chacun leur opérateur, vus au chapitre 1.",
            "Renvoie les deux résultats ensemble, le quotient en premier.",
          ],
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Échanger deux variables",
          contenu: `<p>On veut échanger le contenu de <code>a</code> et de <code>b</code>.
            Lis ce programme sans l'exécuter.</p>`,
          code: `a = 1\nb = 2\na = b\nb = a\nprint(a, b)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>2 1</code>",
              explication: "C'est ce qu'on espérait. Mais à la quatrième ligne, <code>a</code> vaut déjà 2 : l'ancienne valeur 1 est perdue." },
            { texte: "<code>2 2</code>", correct: true,
              explication: "Oui : <code>a = b</code> écrase la valeur 1 avant qu'on l'ait mise de côté, puis <code>b = a</code> recopie 2." },
            { texte: "<code>1 1</code>",
              explication: "C'est <code>a</code> qui reçoit <code>b</code> en premier : 2, et non 1, se retrouve partout." },
            { texte: "<code>1 2</code>",
              explication: "Les deux affectations ont bien lieu : au moins l'une des variables a changé." },
          ],
          apres: `<span class="chapo">Le verre vide</span>
            Au chapitre 1, on s'en sortait avec une troisième variable, qui faisait office
            de verre vide : <code>temp = a</code>, <code>a = b</code>, <code>b = temp</code>.
            Le p-uplet offre bien plus court.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "L'échange en une ligne",
          contenu: `
            <p>Échange le contenu de <code>a</code> et de <code>b</code> en <strong>une
            seule ligne</strong>, sans troisième variable : à droite du <code>=</code>, un
            couple ; à gauche, un déballage. La console doit montrer :</p>
            <pre class="bloc-code"><code>poire pomme</code></pre>`,
          depart: `a = "pomme"\nb = "poire"\n\nprint(a, b)\n`,
          validation: {
            codeContient: [
              { motif: "\\ba\\s*,\\s*b\\s*=\\s*\\(?\\s*b\\s*,\\s*a\\b", message: "En une ligne : à gauche a, b ; à droite le couple b, a." },
            ],
            codeAbsent: [
              { motif: "^\\s*\\w+\\s*=\\s*a\\s*$", message: "Pas de variable temporaire : un seul déballage suffit.", options: "m" },
              { motif: "[\"']poire[\"'][\\s\\S]*[\"']poire[\"']", message: "N'écris pas les valeurs à la main : échange les variables." },
            ],
            sortie: "poire pomme",
          },
          felicitation: "Une ligne, aucun verre vide : le p-uplet met les deux valeurs à l'abri. 🍐",
          indices: [
            "La ligne à ajouter a la forme <code>…, … = …, …</code>.",
            "À gauche, les deux variables dans l'ordre <code>a</code> puis <code>b</code> ; à droite, leurs valeurs actuelles dans l'ordre inverse.",
          ],
          apres: `<span class="chapo">Pourquoi ça marche</span>
            Python évalue <strong>d'abord</strong> tout le membre de droite : il construit
            le couple <code>("poire", "pomme")</code> avec les valeurs <em>actuelles</em>,
            avant toute affectation. Ce p-uplet joue le rôle du verre vide. Ce n'est
            qu'ensuite qu'il est déballé dans <code>a</code> et <code>b</code>.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def division_euclidienne(a, b):
    return a // b, a % b         # un p-uplet : les parenthèses sont facultatives

r = division_euclidienne(17, 5)  # r vaut (3, 2) : un seul p-uplet
q, r = division_euclidienne(17, 5)  # déballage : q vaut 3, r vaut 2

x, y = point                     # déballer n'importe quel p-uplet
a, b = b, a                      # échanger deux variables</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>renvoyer plusieurs résultats</td><td><code>return r1, r2</code></td></tr>
              <tr><td>les récupérer dans un p-uplet</td><td><code>t = f(…)</code>, puis <code>t[0]</code>, <code>t[1]</code></td></tr>
              <tr><td>les récupérer dans des variables</td><td><code>v1, v2 = f(…)</code></td></tr>
              <tr><td>échanger <code>a</code> et <code>b</code></td><td><code>a, b = b, a</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>écrire deux <code>return</code> à la suite : le second n'est jamais atteint ;</li>
                <li>déballer dans le mauvais nombre de variables : <code>ValueError</code> ;</li>
                <li>déballer le résultat d'une fonction qui renvoie un seul nombre : <code>TypeError: cannot unpack</code>.</li>
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
          type: "code",
          titre: "Distance à l'origine",
          contenu: `
            <p>Écris la fonction <code>distance_origine(P)</code>, qui reçoit un point
            <code>P</code> représenté par le couple <code>(x, y)</code> et renvoie sa
            distance à l'origine du repère : √(<em>x</em>² + <em>y</em>²). Commence par
            <strong>déballer</strong> <code>P</code>.</p>
            <p>Une racine carrée s'obtient en élevant à la puissance <code>0.5</code>.</p>
            <pre class="bloc-code"><code>distance_origine((3, 4))     # renvoie 5.0</code></pre>`,
          depart: `def distance_origine(P):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "^\\s*\\w+\\s*,\\s*\\w+\\s*=\\s*P\\s*$", message: "Déballe d'abord P dans deux variables, en une ligne.", options: "m" },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la distance." },
            ],
            tests: `assert abs(distance_origine((3, 4)) - 5) < 1e-9, "distance_origine((3, 4)) doit renvoyer 5.0"\nassert abs(distance_origine((0, 0))) < 1e-9, "l'origine est à distance 0 d'elle-même"\nassert abs(distance_origine((-6, 8)) - 10) < 1e-9, "distance_origine((-6, 8)) doit renvoyer 10.0"\nassert abs(distance_origine((1, 1)) - 2 ** 0.5) < 1e-9, "distance_origine((1, 1)) doit renvoyer la racine de 2"`,
          },
          felicitation: "x et y plutôt que P[0] et P[1] : la formule se lit comme en maths. 📏",
          indices: [
            "Première ligne de la fonction : deux variables à gauche du <code>=</code>, le point à droite.",
            "Puis on renvoie la somme des carrés, élevée à la puissance <code>0.5</code> — attention aux parenthèses autour de la somme.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Minimum et maximum",
          contenu: `
            <p>Écris la fonction <code>extremes(t)</code>, qui reçoit un p-uplet de nombres
            et renvoie le couple <code>(minimum, maximum)</code>. Tu peux utiliser
            <code>min()</code> et <code>max()</code>.</p>
            <pre class="bloc-code"><code>extremes((4, 1, 9, 3))     # renvoie (1, 9)</code></pre>`,
          depart: `def extremes(t):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le couple." },
            ],
            tests: `assert extremes((4, 1, 9, 3)) == (1, 9), "extremes((4, 1, 9, 3)) doit renvoyer (1, 9)"\nassert extremes((7,)) == (7, 7), "avec une seule valeur, elle est à la fois le minimum et le maximum"\nassert extremes((-2, -8, -5)) == (-8, -2), "extremes((-2, -8, -5)) doit renvoyer (-8, -2)"\nassert type(extremes((1, 2))) == tuple, "la fonction doit renvoyer un p-uplet"`,
          },
          felicitation: "Deux fonctions natives, un couple pour les rendre ensemble. 📊",
          indices: [
            "Deux fonctions natives, déjà utilisées sur les listes au chapitre 4, donnent le plus petit et le plus grand élément d'une séquence : elles marchent aussi sur un p-uplet.",
            "Renvoie leurs deux résultats ensemble, dans l'ordre demandé : le minimum d'abord.",
          ],
          apres: `<span class="chapo">Et sans min() ni max() ?</span>
            Il faudrait parcourir <code>t</code> deux fois, une fois pour chaque fonction.
            Le premier défi de la séance montre qu'un seul parcours suffit pour calculer
            les deux — et même une moyenne en plus.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Milieu et longueur d'un segment",
          contenu: `
            <p>Les points du plan sont des couples <code>(x, y)</code>. Écris :</p>
            <ul>
              <li><code>milieu(A, B)</code>, qui renvoie le couple des coordonnées du milieu de [AB] ;</li>
              <li><code>longueur(A, B)</code>, qui renvoie la longueur de [AB] :
              √((<em>x<sub>B</sub></em> − <em>x<sub>A</sub></em>)² + (<em>y<sub>B</sub></em> − <em>y<sub>A</sub></em>)²).</li>
            </ul>
            <pre class="bloc-code"><code>milieu((0, 0), (4, 6))      # renvoie (2.0, 3.0)
longueur((0, 0), (3, 4))    # renvoie 5.0</code></pre>
            <p>Un test vérifie une propriété géométrique : le milieu doit être à égale
            distance des deux extrémités. Tes deux fonctions sont donc contrôlées l'une par
            l'autre.</p>`,
          depart: `def milieu(A, B):\n    pass\n\n\ndef longueur(A, B):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "Chacune des deux fonctions doit renvoyer son résultat." },
            ],
            tests: `assert milieu((0, 0), (4, 6)) == (2, 3), "milieu((0, 0), (4, 6)) doit renvoyer (2.0, 3.0)"\nassert milieu((-1, 5), (3, 1)) == (1, 3), "milieu((-1, 5), (3, 1)) doit renvoyer (1.0, 3.0)"\nassert type(milieu((0, 0), (1, 1))) == tuple, "milieu doit renvoyer un p-uplet"\nassert abs(longueur((0, 0), (3, 4)) - 5) < 1e-9, "longueur((0, 0), (3, 4)) doit renvoyer 5.0"\nassert abs(longueur((1, 2), (1, 2))) < 1e-9, "un segment réduit à un point a une longueur nulle"\nassert abs(longueur((2, 2), (-1, -2)) - 5) < 1e-9, "longueur((2, 2), (-1, -2)) doit renvoyer 5.0"\n_A, _B = (1, 7), (4, -3)\n_I = milieu(_A, _B)\nassert abs(longueur(_A, _I) - longueur(_I, _B)) < 1e-9, "le milieu doit être à égale distance de A et de B"`,
          },
          felicitation: "Deux fonctions qui se vérifient l'une l'autre : de la géométrie en Python. 📐",
          indices: [
            "Pour <code>milieu</code> : la moyenne des abscisses, puis celle des ordonnées, renvoyées ensemble. Déballer <code>A</code> et <code>B</code> rend la formule plus lisible.",
            "Pour <code>longueur</code> : calcule d'abord les deux écarts, <code>xB - xA</code> et <code>yB - yA</code>, puis la racine de la somme de leurs carrés.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : le rectangle",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Périmètre : 16
Aire : 15</code></pre>
            <p>Il contient <strong>trois erreurs</strong> de natures différentes.</p>`,
          depart: `def perimetre_aire(longueur, largeur):\n    perimetre = 2 * (longueur + largeur)\n   aire = longueur * largeur\n    return perimetre\n    return aire\n\n\np, a = perimetre_aire(5, 3)\nprint("Périmètre :", p)\nprint("Aire :" a)\n`,
          validation: {
            codeAbsent: [
              { motif: "\\breturn\\b[^\\n]*\\n\\s*return\\b", message: "Deux return à la suite : le second n'est jamais atteint." },
            ],
            codeContient: [
              { motif: "\\bp\\s*,\\s*a\\s*=\\s*perimetre_aire\\s*\\(", message: "Garde le déballage du résultat dans p et a." },
            ],
            sortie: "Périmètre : 16\nAire : 15",
            tests: `assert perimetre_aire(5, 3) == (16, 15), "perimetre_aire(5, 3) doit renvoyer le couple (16, 15)"`,
          },
          felicitation: "Un décalage, une virgule, et un seul return pour deux résultats. 🐞",
          indices: [
            "La première erreur est une <code>IndentationError</code> : compte les espaces au début de chaque ligne de la fonction.",
            "Une fois le programme lancé, Python ne sait pas déballer un nombre seul : regarde ce que renvoie vraiment la fonction, et ce qui arrive au second <code>return</code>.",
            "La dernière erreur est dans le dernier <code>print</code> : il manque quelque chose entre le texte et la variable.",
          ],
        },

        {
          id: "a5",
          type: "prediction",
          titre: "Un p-uplet ou deux variables",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `def f(x):\n    return x, 2 * x\n\na, b = f(3)\nc = f(3)\nprint(a + b, len(c))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>9 2</code>", correct: true,
              explication: "Oui : <code>a</code> vaut 3 et <code>b</code> vaut 6, d'où 9. <code>c</code> reçoit le couple entier <code>(3, 6)</code>, de longueur 2." },
            { texte: "<code>9 1</code>",
              explication: "<code>c</code> n'est pas un nombre : sans déballage, il reçoit tout le couple, qui a deux composantes." },
            { texte: "<code>6 2</code>",
              explication: "<code>a</code> reçoit la première composante, 3, et <code>b</code> la seconde, 6 : leur somme fait 9." },
            { texte: "une erreur, car <code>c</code> ne peut pas recevoir deux valeurs",
              explication: "Une variable seule peut toujours recevoir un p-uplet : c'est le déballage qui demande le compte exact." },
          ],
          apres: `<span class="chapo">Les deux façons de recevoir</span>
            Une variable seule reçoit le p-uplet entier ; plusieurs variables le
            déballent. Le choix dépend de l'usage : déballer quand on travaille sur chaque
            valeur, garder le p-uplet quand on le transmet tel quel.`,
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
          titre: "Statistiques en un seul parcours",
          contenu: `
            <p>Écris la fonction <code>statistiques(tableau)</code>, qui reçoit un tableau
            non vide de nombres et renvoie le triplet <code>(minimum, maximum, moyenne)</code>.</p>
            <p>Interdit d'utiliser <code>min()</code>, <code>max()</code> et
            <code>sum()</code> : ta fonction ne doit faire qu'<strong>un seul
            parcours</strong> du tableau.</p>
            <pre class="bloc-code"><code>statistiques([12, 8, 15, 5])     # renvoie (5, 15, 10.0)</code></pre>`,
          depart: `def statistiques(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le triplet." },
            ],
            codeAbsent: [
              { motif: "\\b(min|max|sum)\\s*\\(", message: "min(), max() et sum() sont interdits : calcule tout dans ta boucle." },
              { motif: "\\bfor\\b[\\s\\S]*\\bfor\\b", message: "Un seul parcours : une seule boucle for." },
            ],
            tests: `assert statistiques([12, 8, 15, 5]) == (5, 15, 10.0), "statistiques([12, 8, 15, 5]) doit renvoyer (5, 15, 10.0)"\nassert statistiques([7]) == (7, 7, 7.0), "avec une seule valeur : (7, 7, 7.0)"\nassert statistiques([-3, -1, -2]) == (-3, -1, -2.0), "avec des nombres négatifs, minimum et maximum ne partent pas de 0"\nassert statistiques([10, 20]) == (10, 20, 15.0), "statistiques([10, 20]) doit renvoyer (10, 20, 15.0)"`,
          },
          felicitation: "Trois accumulateurs, une boucle, un triplet : c'est tout l'intérêt du p-uplet. 🏆",
          indices: [
            "Trois accumulateurs préparés avant la boucle : <code>mini</code> et <code>maxi</code> partent de la première valeur du tableau — surtout pas de 0 — et <code>total</code> part de 0.",
            "Dans la boucle, chaque valeur met à jour les trois : un <code>if</code> pour le minimum, un autre pour le maximum, et une addition pour le total.",
            "Après la boucle, renvoie les deux records et le total divisé par la longueur du tableau.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Pairs et impairs",
          contenu: `
            <p>Écris la fonction <code>pairs_impairs(tableau)</code>, qui renvoie le couple
            <code>(nombre de pairs, nombre d'impairs)</code> du tableau. Puis, sous la
            fonction, <strong>déballe</strong> son résultat pour le tableau
            <code>[3, 8, 5, 12, 7]</code> et affiche :</p>
            <pre class="bloc-code"><code>2 pairs et 3 impairs</code></pre>`,
          depart: `def pairs_impairs(tableau):\n    pass\n\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
              { motif: "%\\s*2", message: "Un nombre est pair quand le reste de sa division par 2 est nul." },
              { motif: "^\\s*\\w+\\s*,\\s*\\w+\\s*=\\s*pairs_impairs\\s*\\(", message: "Déballe le résultat de pairs_impairs dans deux variables.", options: "m" },
            ],
            sortie: "2 pairs et 3 impairs",
            tests: `assert pairs_impairs([3, 8, 5, 12, 7]) == (2, 3), "pairs_impairs([3, 8, 5, 12, 7]) doit renvoyer (2, 3)"\nassert pairs_impairs([]) == (0, 0), "un tableau vide ne contient ni pair ni impair"\nassert pairs_impairs([0, -4]) == (2, 0), "0 et -4 sont pairs"`,
          },
          felicitation: "Deux compteurs dans une boucle, déballés à l'arrivée. ⚖️",
          indices: [
            "Deux compteurs à 0 avant la boucle ; dans la boucle, un <code>if … else</code> sur le reste de la division par 2 augmente l'un ou l'autre.",
            "Sous la fonction : deux variables reçoivent le résultat de l'appel, puis un <code>print</code> les insère dans la phrase.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre fonction",
          contenu: `
            <p>Invente une fonction qui renvoie <strong>au moins deux</strong> résultats :
            les deux racines d'un nombre, le prix HT et la TVA, les heures et les minutes
            d'une durée donnée en minutes… Appelle-la ensuite, <strong>déballe</strong>
            son résultat, et affiche chaque valeur avec une phrase.</p>`,
          depart: `# Ta fonction ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b", message: "Commence par définir ta fonction avec def." },
              { motif: "\\breturn\\b[^\\n]*,", message: "Ta fonction doit renvoyer au moins deux valeurs, séparées par une virgule." },
              { motif: "^\\s*\\w+\\s*(,\\s*\\w+\\s*)+=\\s*\\w+\\s*\\(", message: "Déballe le résultat de ta fonction dans plusieurs variables.", options: "m" },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ta fonction, tes résultats, ton déballage : la partie sur les p-uplets est bouclée. ✨",
          indices: [
            "Une fonction de ton choix avec un <code>return</code> suivi de deux valeurs séparées par une virgule — par exemple les heures (<code>//</code>) et les minutes (<code>%</code>) d'une durée.",
            "Puis une ligne avec deux variables à gauche du <code>=</code> et l'appel de ta fonction à droite, et des <code>print</code> pour les afficher.",
          ],
        },
      ],
    },
  ],
};

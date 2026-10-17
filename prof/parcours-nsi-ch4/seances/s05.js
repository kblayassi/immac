/* NSI — chapitre 4, séance 5 : les matrices.
 * Reprend la section « Tableaux de tableaux : les matrices » du cours,
 * ainsi que les exercices 7 et 8.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "Les matrices",
  sousTitre: "Des listes de listes pour représenter une grille",
  palier: "Partie 2 — Matrices et mémoire",

  accroche: `Une grille de morpion, un plan de salle de cinéma, un tableau de notes avec
    une ligne par élève : beaucoup de données ont <strong>deux dimensions</strong>.
    Pour les représenter, pas besoin d'un nouvel outil — une liste peut contenir…
    d'autres listes.`,

  objectifs: [
    "représenter une grille par une <strong>liste de listes</strong>",
    "lire et modifier une case avec <code>M[ligne][colonne]</code>",
    "obtenir le nombre de lignes et de colonnes avec <code>len()</code>",
    "parcourir une matrice ligne par ligne, puis case par case avec deux boucles",
  ],

  motDeLaFin: `Tu sais construire, lire et parcourir une matrice. À la séance 6, on
    passe de l'autre côté du décor : où sont vraiment rangées les listes dans la
    mémoire, et pourquoi <code>M = L</code> ne copie pas une liste.`,

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
          titre: "Une liste de listes",
          contenu: `
            <p>Voici une grille de 3 lignes et 3 colonnes, et sa traduction en Python :
            une liste dont chaque élément est une <strong>ligne</strong>, elle-même
            représentée par une liste.</p>

            <p style="text-align:center"><img src="../files/NSI/Types_construits/matrice1.png" alt="Une grille de 9 cases numérotées de 1 à 9" style="max-width:220px; width:60%"></p>

            <pre class="bloc-code"><code>M = [
    [1, 2, 3],      # ligne 0
    [4, 5, 6],      # ligne 1
    [7, 8, 9]       # ligne 2
]</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : matrice</span>
              Une <strong>matrice</strong> est un tableau à <strong>deux dimensions</strong> :
              une liste dont chaque élément est une ligne, représentée par une liste.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Restriction du programme</span>
              En NSI, toutes les lignes d'une matrice ont la <strong>même longueur</strong> :
              on parle de matrice homogène.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Une ligne entière",
          contenu: `
            <p><code>M</code> est une liste comme une autre : ses éléments sont ses
            lignes. Affiche la <strong>deuxième ligne</strong> de la grille, en la lisant
            dans <code>M</code> :</p>
            <pre class="bloc-code"><code>[4, 5, 6]</code></pre>`,
          depart: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "M\\s*\\[\\s*1\\s*\\]", message: "La deuxième ligne est l'élément d'indice 1 de M." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*\\[", message: "Ne recopie pas la ligne : lis-la dans M." },
            ],
            sortie: "[4, 5, 6]",
          },
          felicitation: "M[1] est une ligne… et donc une liste. 📋",
          indices: [
            "La deuxième ligne est l'élément de <code>M</code> d'indice 1, comme pour n'importe quelle liste.",
          ],
          solution: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\nprint(M[1])\n`,
          apres: `<span class="chapo">Une liste qu'on peut ouvrir à son tour</span>
            <code>M[1]</code> vaut la liste <code>[4, 5, 6]</code>. On peut donc lire l'une
            de ses cases avec un second crochet : <code>M[1][2]</code> est la case
            d'indice 2 de cette ligne, soit 6.`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Repérer une case : M[ligne][colonne]",
          contenu: `
            <p>Chaque case est repérée par <strong>deux</strong> indices : d'abord sa
            ligne, ensuite sa colonne. Et, comme toujours, on compte à partir de 0.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>colonne 0</th><th>colonne 1</th><th>colonne 2</th></tr>
              <tr><th>ligne 0</th><td><code>M[0][0]</code> = 1</td><td><code>M[0][1]</code> = 2</td><td><code>M[0][2]</code> = 3</td></tr>
              <tr><th>ligne 1</th><td><code>M[1][0]</code> = 4</td><td><code>M[1][1]</code> = 5</td><td><code>M[1][2]</code> = 6</td></tr>
              <tr><th>ligne 2</th><td><code>M[2][0]</code> = 7</td><td><code>M[2][1]</code> = 8</td><td><code>M[2][2]</code> = 9</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Lire M[1][2] en deux temps</span>
              <code>M[1]</code> désigne la <strong>ligne</strong> d'indice 1, la liste
              <code>[4, 5, 6]</code> ; puis <code>[2]</code> désigne la case d'indice 2
              <strong>de cette ligne</strong>, soit 6.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre ne s'invente pas</span>
              <code>M[0][2]</code> et <code>M[2][0]</code> ne désignent pas la même case.
              On donne <strong>toujours</strong> la ligne en premier.
            </div>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Ligne 2, colonne 0",
          contenu: `<p>Avec la même grille que dans le tableau du cours :</p>`,
          code: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\nprint(M[2][0])`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>3</code>",
              explication: "3 est la case <code>M[0][2]</code> : ligne 0, colonne 2. On a inversé l'ordre." },
            { texte: "<code>7</code>", correct: true,
              explication: "Oui : <code>M[2]</code> est la ligne <code>[7, 8, 9]</code>, et sa case d'indice 0 vaut 7." },
            { texte: "<code>8</code>",
              explication: "8 est en colonne 1. La colonne 0 est la première de la ligne." },
            { texte: "<code>[7, 8, 9]</code>",
              explication: "Ce serait <code>M[2]</code>, la ligne entière. Le second crochet choisit une case dans cette ligne." },
          ],
          apres: `<span class="chapo">Ligne d'abord, colonne ensuite</span>
            Pour lire <code>M[i][j]</code>, on descend d'abord à la ligne <code>i</code>,
            puis on avance jusqu'à la colonne <code>j</code>.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Le centre et le coin",
          contenu: `
            <p>Affiche la case du <strong>centre</strong> de la grille, puis celle du
            <strong>coin en bas à droite</strong>, en lisant <code>M</code> :</p>
            <pre class="bloc-code"><code>5
9</code></pre>`,
          depart: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "M\\s*\\[\\s*1\\s*\\]\\s*\\[\\s*1\\s*\\]", message: "Le centre est sur la ligne 1, en colonne 1." },
              { motif: "M\\s*\\[\\s*(2|-\\s*1)\\s*\\]\\s*\\[\\s*(2|-\\s*1)\\s*\\]", message: "Le coin en bas à droite est sur la dernière ligne, en dernière colonne." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*\\d", message: "Ne recopie pas les valeurs : lis-les dans M." },
            ],
            sortie: "5\n9",
          },
          felicitation: "Deux indices, une case. 🎯",
          indices: [
            "Chaque case se lit avec deux crochets : la ligne, puis la colonne.",
            "Le centre est sur la ligne du milieu et la colonne du milieu ; le coin, sur la dernière ligne et la dernière colonne.",
          ],
          solution: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\nprint(M[1][1])\nprint(M[2][2])\n`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Réserver un siège",
          contenu: `
            <p>La matrice <code>salle</code> représente une petite salle de cinéma :
            <code>0</code> pour un siège libre, <code>1</code> pour un siège réservé.</p>
            <p>Réserve le siège de la <strong>ligne 1</strong>, <strong>colonne 2</strong>
            (indices), en modifiant une seule case :</p>
            <pre class="bloc-code"><code>[[0, 0, 0], [0, 0, 1]]</code></pre>`,
          depart: `salle = [\n    [0, 0, 0],\n    [0, 0, 0]\n]\n\n\nprint(salle)\n`,
          validation: {
            codeContient: [
              { motif: "salle\\s*\\[\\s*1\\s*\\]\\s*\\[\\s*2\\s*\\]\\s*=(?!=)", message: "Modifie la case salle[1][2] avec une affectation." },
            ],
            codeAbsent: [
              { motif: "salle\\s*=\\s*\\[[\\s\\S]*salle\\s*=\\s*\\[", message: "Ne réécris pas toute la salle : modifie seulement la case du siège." },
            ],
            sortie: "[[0, 0, 0], [0, 0, 1]]",
          },
          felicitation: "Une case modifiée, avec ses deux indices. 🎬",
          indices: [
            "On modifie une case de matrice comme une case de liste : à gauche du <code>=</code>, la case visée.",
            "La case visée s'écrit avec deux crochets, la ligne puis la colonne ; elle reçoit 1.",
          ],
          solution: `salle = [\n    [0, 0, 0],\n    [0, 0, 0]\n]\nsalle[1][2] = 1\n\nprint(salle)\n`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "La longueur d'une matrice",
          contenu: `<p>Cette matrice a 4 lignes et 3 colonnes. Lis ce programme sans
            l'exécuter.</p>`,
          code: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [10, 11, 12]\n]\nprint(len(M))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>3</code>",
              explication: "3, c'est la longueur d'une ligne. <code>len(M)</code> compte les éléments de <code>M</code>." },
            { texte: "<code>4</code>", correct: true,
              explication: "Oui : les éléments de <code>M</code> sont ses lignes, et il y en a 4." },
            { texte: "<code>12</code>",
              explication: "<code>len()</code> ne compte pas les cases une à une : il compte les éléments de <code>M</code>, c'est-à-dire ses lignes." },
            { texte: "<code>7</code>",
              explication: "On n'additionne pas lignes et colonnes : <code>len(M)</code> compte les éléments de <code>M</code>." },
          ],
          apres: `<span class="chapo">Lignes et colonnes</span>
            <code>len(M)</code> donne le nombre de <strong>lignes</strong>. Pour le nombre
            de <strong>colonnes</strong>, on mesure la longueur d'une ligne :
            <code>len(M[0])</code>.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Les dimensions",
          contenu: `
            <p>La matrice <code>grille</code> représente un plateau de jeu. Affiche son
            nombre de lignes, puis son nombre de colonnes, <strong>calculés par
            Python</strong> :</p>
            <pre class="bloc-code"><code>Lignes : 4
Colonnes : 6</code></pre>`,
          depart: `grille = [\n    [0, 1, 0, 0, 1, 0],\n    [1, 0, 0, 1, 0, 0],\n    [0, 0, 1, 0, 0, 1],\n    [0, 1, 0, 0, 1, 0]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*grille\\s*\\)", message: "Le nombre de lignes se calcule avec len(grille)." },
              { motif: "len\\s*\\(\\s*grille\\s*\\[\\s*\\d+\\s*\\]\\s*\\)", message: "Le nombre de colonnes est la longueur d'une ligne : len(grille[0])." },
            ],
            codeAbsent: [
              { motif: "\\b[46]\\b", message: "Les dimensions doivent être calculées par Python, pas écrites à la main." },
            ],
            sortie: "Lignes : 4\nColonnes : 6",
          },
          felicitation: "len(M) pour les lignes, len(M[0]) pour les colonnes. 📐",
          indices: [
            "Deux <code>print</code>, chacun avec un texte puis une longueur.",
            "Les colonnes se comptent sur une ligne : prends la longueur de la première ligne de <code>grille</code>.",
          ],
          solution: `grille = [\n    [0, 1, 0, 0, 1, 0],\n    [1, 0, 0, 1, 0, 0],\n    [0, 0, 1, 0, 0, 1],\n    [0, 1, 0, 0, 1, 0]\n]\nprint("Lignes :", len(grille))\nprint("Colonnes :", len(grille[0]))\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Parcourir ligne par ligne",
          contenu: `
            <p>Une seule boucle suffit pour parcourir une matrice <strong>ligne par
            ligne</strong> : à chaque tour, la variable de boucle contient une ligne
            entière, c'est-à-dire une liste.</p>
            <pre class="bloc-code"><code>for ligne in M:
    print(ligne)       # [1, 2, 3], puis [4, 5, 6], puis [7, 8, 9]</code></pre>
            <p>La matrice <code>notes</code> contient une ligne par élève. Affiche le
            total de chaque élève, en parcourant la matrice ligne par ligne :</p>
            <pre class="bloc-code"><code>36
33
51</code></pre>`,
          depart: `notes = [\n    [12, 15, 9],\n    [8, 11, 14],\n    [17, 16, 18]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+notes\\b", message: "Parcours la matrice ligne par ligne : for ligne in notes." },
              { motif: "\\bsum\\s*\\(", message: "Chaque ligne est une liste : sum() en donne le total." },
            ],
            codeAbsent: [
              { motif: "\\b36\\b|\\b51\\b", message: "Les totaux doivent être calculés par Python." },
            ],
            sortie: "36\n33\n51",
          },
          felicitation: "Chaque ligne est une liste : tout ce que tu sais faire sur une liste s'y applique. 📊",
          indices: [
            "Une boucle sur <code>notes</code>, avec une variable de boucle nommée <code>ligne</code> ou <code>eleve</code>.",
            "Dans la boucle, on affiche la somme de la ligne du tour.",
          ],
          solution: `notes = [\n    [12, 15, 9],\n    [8, 11, 14],\n    [17, 16, 18]\n]\nfor ligne in notes:\n    print(sum(ligne))\n`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Parcourir case par case",
          contenu: `
            <p>Pour examiner <strong>chaque case</strong>, il faut deux boucles
            imbriquées : la première choisit la ligne, la seconde la colonne. Ce modèle
            affiche toutes les cases d'une matrice <code>M</code> :</p>
            <pre class="bloc-code"><code>for i in range(len(M)):           # pour chaque ligne
    for j in range(len(M[i])):    # pour chaque colonne de cette ligne
        print(M[i][j])</code></pre>
            <p>Dans la grille d'un jeu, <code>0</code> désigne une case vide. En
            t'inspirant de ce modèle, compte les cases vides de <code>grille</code> :</p>
            <pre class="bloc-code"><code>Cases vides : 4</code></pre>`,
          depart: `grille = [\n    [1, 0, 2],\n    [0, 0, 1],\n    [2, 1, 0]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[^\\n]*\\n[ \\t]+for\\b", message: "Il faut deux boucles imbriquées : une pour les lignes, une pour les colonnes." },
            ],
            codeAbsent: [
              { motif: "\\b4\\b", message: "Le nombre de cases vides doit être calculé par Python." },
            ],
            sortie: "Cases vides : 4",
          },
          felicitation: "Deux boucles, neuf cases examinées, un compteur. 🔲",
          indices: [
            "C'est un accumulateur : un compteur à 0 avant les boucles, un <code>print</code> après.",
            "Dans la boucle intérieure, un <code>if</code> teste si la case <code>grille[i][j]</code> vaut 0.",
          ],
          solution: `grille = [\n    [1, 0, 2],\n    [0, 0, 1],\n    [2, 1, 0]\n]\nvides = 0\nfor i in range(len(grille)):\n    for j in range(len(grille[i])):\n        if grille[i][j] == 0:\n            vides = vides + 1\nprint("Cases vides :", vides)\n`,
          apres: `<span class="chapo">Deux façons d'écrire la double boucle</span>
            Avec des indices, comme ici, ou directement sur les éléments :
            <code>for ligne in grille:</code> puis <code>for case in ligne:</code>. Les
            indices ne sont indispensables que si l'on doit connaître la position ou
            modifier la case.`,
        },

        {
          id: "d11",
          type: "cours",
          titre: "Construire une matrice en compréhension",
          contenu: `
            <p>Les compréhensions s'imbriquent, elles aussi : celle de l'
            <strong>extérieur</strong> fabrique les lignes, celle de
            l'<strong>intérieur</strong> fabrique les cases d'une ligne.</p>

            <pre class="bloc-code"><code># Une matrice de 3 lignes et 4 colonnes, remplie de zéros
Z = [[0 for j in range(4)] for i in range(3)]
# [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Se lire de l'extérieur vers l'intérieur</span>
              « Pour chaque <code>i</code> de 0 à 2, une ligne ; et dans chaque ligne, pour
              chaque <code>j</code> de 0 à 3, une case. » L'expression la plus intérieure
              décide de ce que contient la case <code>(i, j)</code> : ici, toujours 0, mais
              elle peut dépendre de <code>i</code> et de <code>j</code>.
            </div>`,
        },

        {
          id: "d12",
          type: "code",
          titre: "La table de multiplication",
          contenu: `
            <p>Construis en compréhension la matrice <code>T</code> de 3 lignes et 3
            colonnes dont la case de la ligne <code>i</code> et de la colonne
            <code>j</code> contient <code>i × j</code>, pour <code>i</code> et
            <code>j</code> allant de <strong>1 à 3</strong> :</p>
            <pre class="bloc-code"><code>[[1, 2, 3], [2, 4, 6], [3, 6, 9]]</code></pre>`,
          depart: `T = \n\nprint(T)\n`,
          validation: {
            codeContient: [
              { motif: "T\\s*=\\s*\\[\\s*\\[[^\\]]*\\bfor\\b[^\\]]*\\]\\s*for\\b", message: "T doit être construite par deux compréhensions imbriquées : [[… for j in …] for i in …]." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() : toute la construction tient entre les crochets." },
              { motif: "\\[\\s*1\\s*,\\s*2\\s*,\\s*3\\s*\\]", message: "Ne recopie pas les lignes : les compréhensions doivent les calculer." },
            ],
            sortie: "[[1, 2, 3], [2, 4, 6], [3, 6, 9]]",
          },
          felicitation: "Deux compréhensions imbriquées, une matrice entière. 🧮",
          indices: [
            "Reprends la forme de <code>Z</code> : une compréhension pour les cases, entourée d'une compréhension pour les lignes.",
            "Les deux variables parcourent les entiers de 1 à 3, et l'expression de chaque case est leur produit.",
          ],
          solution: `T = [[i * j for j in range(1, 4)] for i in range(1, 4)]\n\nprint(T)\n`,
        },

        {
          id: "d13",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>M = [[1, 2, 3],
     [4, 5, 6]]

M[1]            # [4, 5, 6] : la ligne d'indice 1
M[1][2]         # 6 : ligne 1, colonne 2
M[0][1] = 20    # modifie une case
len(M)          # 2 : le nombre de LIGNES
len(M[0])       # 3 : le nombre de COLONNES

for ligne in M:                 # ligne par ligne
    print(ligne)

for i in range(len(M)):         # case par case
    for j in range(len(M[i])):
        print(M[i][j])

Z = [[0 for j in range(3)] for i in range(2)]   # en compréhension</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>inverser ligne et colonne : <code>M[i][j]</code>, la ligne <strong>toujours</strong> en premier ;</li>
                <li>prendre <code>len(M)</code> pour le nombre de colonnes : c'est celui des lignes ;</li>
                <li>écrire <code>M[i, j]</code> : en Python, il faut deux paires de crochets.</li>
              </ul>
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
          type: "qcm",
          titre: "Se repérer dans une matrice",
          contenu: `<p>On considère la matrice suivante.</p>`,
          code: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [10, 11, 12]\n]`,
          question: "Combien a-t-elle de lignes et de colonnes, et que valent len(M) et len(M[0]) ?",
          options: [
            { texte: "3 lignes, 4 colonnes ; <code>len(M)</code> vaut 3 et <code>len(M[0])</code> vaut 4",
              explication: "Les lignes sont les éléments de <code>M</code> : on en compte 4, chacune de 3 cases." },
            { texte: "4 lignes, 3 colonnes ; <code>len(M)</code> vaut 4 et <code>len(M[0])</code> vaut 3", correct: true,
              explication: "Oui : <code>M</code> contient 4 listes, ses lignes ; chacune contient 3 cases, ses colonnes." },
            { texte: "4 lignes, 3 colonnes ; <code>len(M)</code> vaut 12 et <code>len(M[0])</code> vaut 3",
              explication: "<code>len(M)</code> compte les éléments de <code>M</code>, c'est-à-dire ses lignes, et non ses cases." },
            { texte: "4 lignes, 3 colonnes ; <code>len(M)</code> vaut 3 et <code>len(M[0])</code> vaut 4",
              explication: "Les dimensions sont justes, mais <code>len(M)</code> donne le nombre de lignes, et <code>len(M[0])</code> la longueur d'une ligne." },
          ],
          apres: `<span class="chapo">À retenir</span>
            <code>len(M)</code> : le nombre de lignes. <code>len(M[0])</code> : le nombre
            de colonnes.`,
        },

        {
          id: "a2",
          type: "prediction",
          titre: "M[1][2] ou M[2][1] ?",
          contenu: `<p>Avec la même matrice de 4 lignes et 3 colonnes :</p>`,
          code: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [10, 11, 12]\n]\nprint(M[1][2])\nprint(M[2][1])`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>6</code> puis <code>8</code>", correct: true,
              explication: "Oui : <code>M[1][2]</code> est sur la ligne 1, colonne 2, soit 6 ; <code>M[2][1]</code> est sur la ligne 2, colonne 1, soit 8. L'ordre compte !" },
            { texte: "<code>8</code> puis <code>6</code>",
              explication: "Les deux cases sont inversées : le premier indice est la ligne." },
            { texte: "<code>6</code> puis <code>6</code>",
              explication: "Échanger les deux indices ne désigne pas la même case." },
            { texte: "<code>2</code> puis <code>5</code>",
              explication: "On a compté à partir de 1. La ligne d'indice 1 est la deuxième : <code>[4, 5, 6]</code>." },
          ],
          apres: `<span class="chapo">Deux cases différentes</span>
            <code>M[1][2]</code> et <code>M[2][1]</code> sont symétriques par rapport à la
            diagonale, mais ne contiennent pas la même valeur.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Atteindre une case, en modifier une autre",
          contenu: `
            <p>Avec la matrice <code>M</code> du code de départ :</p>
            <ol>
              <li>affiche la valeur <code>10</code>, en la <strong>lisant</strong> dans la
              matrice ;</li>
              <li>remplace la case <code>M[0][1]</code> par <code>99</code>, puis affiche
              la ligne <code>M[0]</code>.</li>
            </ol>
            <pre class="bloc-code"><code>10
[1, 99, 3]</code></pre>`,
          depart: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [10, 11, 12]\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "M\\s*\\[\\s*(3|-\\s*1)\\s*\\]\\s*\\[\\s*0\\s*\\]", message: "10 est sur la dernière ligne, en colonne 0." },
              { motif: "M\\s*\\[\\s*0\\s*\\]\\s*\\[\\s*1\\s*\\]\\s*=(?!=)", message: "Remplace la case M[0][1] avec une affectation." },
              { motif: "print\\s*\\(\\s*M\\s*\\[\\s*0\\s*\\]\\s*\\)", message: "Affiche la ligne M[0]." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*10\\s*\\)", message: "Ne recopie pas 10 : lis-le dans la matrice." },
            ],
            sortie: "10\n[1, 99, 3]",
          },
          felicitation: "Lire une case, en écrire une autre : la matrice n'a plus de secret. 🗺️",
          indices: [
            "La valeur 10 est sur la ligne d'indice 3, la dernière, et dans la première colonne.",
            "Après l'affectation de 99, la ligne <code>M[0]</code> s'affiche comme n'importe quelle liste.",
          ],
          solution: `M = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9],\n    [10, 11, 12]\n]\nprint(M[3][0])\nM[0][1] = 99\nprint(M[0])\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "La somme d'une matrice",
          contenu: `
            <p>Écris la fonction <code>somme_matrice(M)</code>, qui renvoie la somme de
            toutes les valeurs de la matrice, <strong>sans utiliser
            <code>sum()</code></strong>.</p>
            <pre class="bloc-code"><code>somme_matrice([[1, 2, 3], [4, 5, 6], [7, 8, 9]])    # renvoie 45</code></pre>`,
          depart: `def somme_matrice(M):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[^\\n]*\\n[ \\t]+for\\b", message: "Il faut deux boucles imbriquées pour passer sur chaque case." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est un accumulateur qu'on attend." },
            ],
            tests: `assert somme_matrice([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == 45, "somme_matrice de la grille de 1 à 9 doit renvoyer 45"\nassert somme_matrice([[5]]) == 5, "une matrice d'une seule case a pour somme cette case"\nassert somme_matrice([[1, -1], [2, -2], [10, 0]]) == 10, "la fonction doit marcher pour n'importe quelles dimensions"`,
          },
          felicitation: "L'accumulateur, avec deux boucles au lieu d'une. ➕",
          indices: [
            "Un total à 0 avant les boucles, renvoyé après — au niveau de la première boucle, pas dans la seconde.",
            "Dans la boucle intérieure, le total reçoit son ancienne valeur plus la case du tour.",
          ],
          solution: `def somme_matrice(M):\n    total = 0\n    for i in range(len(M)):\n        for j in range(len(M[i])):\n            total = total + M[i][j]\n    return total\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : la diagonale",
          contenu: `
            <p>Ce programme devrait afficher les cases de la <strong>diagonale</strong>
            (celles dont la ligne et la colonne ont le même indice), puis le nombre de
            colonnes de la matrice :</p>
            <pre class="bloc-code"><code>2
3
6
Colonnes : 3</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `M = [\n    [2, 0, 1],\n    [5, 3, 8],\n    [4, 7, 6]\n]\nfor i in range(len(M))\n    print(M[i][i + 1])\nprint("Colonnes :", len(M[0][0]))\n`,
          validation: {
            codeContient: [
              { motif: "M\\s*\\[\\s*i\\s*\\]\\s*\\[\\s*i\\s*\\]", message: "Sur la diagonale, la ligne et la colonne ont le même indice : M[i][i]." },
              { motif: "len\\s*\\(\\s*M\\s*\\[\\s*0\\s*\\]\\s*\\)", message: "Le nombre de colonnes est la longueur d'une ligne : len(M[0])." },
            ],
            sortie: "2\n3\n6\nColonnes : 3",
          },
          felicitation: "Un deux-points, un indice décalé, une longueur mal visée : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde la fin de la ligne du <code>for</code>.",
            "Ensuite, les valeurs affichées ne sont pas celles de la diagonale, et une <code>IndexError</code> tombe : sur la diagonale, colonne et ligne ont le même indice.",
            "Enfin, <code>M[0][0]</code> est un nombre, qui n'a pas de longueur : c'est la ligne entière qu'il faut mesurer.",
          ],
          solution: `M = [\n    [2, 0, 1],\n    [5, 3, 8],\n    [4, 7, 6]\n]\nfor i in range(len(M)):\n    print(M[i][i])\nprint("Colonnes :", len(M[0]))\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "La matrice identité",
          contenu: `
            <p>La matrice identité de taille <code>n</code> a des 0 partout, sauf des 1 sur
            la diagonale. Écris la fonction <code>identite(n)</code>, qui la construit
            <strong>par compréhensions imbriquées</strong>.</p>
            <pre class="bloc-code"><code>identite(3)    # renvoie [[1, 0, 0], [0, 1, 0], [0, 0, 1]]</code></pre>
            <p>Pour choisir entre deux valeurs dans une expression, Python propose
            l'écriture <code>a if condition else b</code>, qui vaut <code>a</code> si la
            condition est vraie et <code>b</code> sinon. Par exemple,
            <code>"pair" if n % 2 == 0 else "impair"</code>.</p>`,
          depart: `def identite(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "return\\s*\\[\\s*\\[[^\\n]*\\bfor\\b[^\\n]*\\]\\s*for\\b", message: "Un return suivi de deux compréhensions imbriquées : [[… for j in …] for i in …]." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() : la matrice se construit entièrement en compréhension." },
            ],
            tests: `assert identite(3) == [[1, 0, 0], [0, 1, 0], [0, 0, 1]], "identite(3) doit renvoyer [[1, 0, 0], [0, 1, 0], [0, 0, 1]]"\nassert identite(1) == [[1]], "identite(1) doit renvoyer [[1]]"\nassert identite(4)[2] == [0, 0, 1, 0], "la ligne 2 de identite(4) doit être [0, 0, 1, 0]"\nassert len(identite(5)) == 5 and len(identite(5)[0]) == 5, "identite(5) doit avoir 5 lignes et 5 colonnes"`,
          },
          felicitation: "Une matrice entière décrite en une ligne, case par case. 🧮",
          indices: [
            "La structure est celle de la table de multiplication : deux compréhensions imbriquées, sur <code>range(n)</code> cette fois.",
            "Seule l'expression de la case change : 1 quand <code>i</code> et <code>j</code> sont égaux, 0 sinon — c'est l'écriture <code>… if … else …</code>.",
          ],
          solution: `def identite(n):\n    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]\n`,
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
          titre: "La transposée",
          contenu: `
            <p>La <strong>transposée</strong> d'une matrice échange ses lignes et ses
            colonnes : la ligne 0 devient la colonne 0, et ainsi de suite. Écris la
            fonction <code>transposee(M)</code>, qui renvoie la transposée de
            <code>M</code>, sans modifier <code>M</code>.</p>
            <pre class="bloc-code"><code>transposee([[1, 2, 3],
            [4, 5, 6]])    # renvoie [[1, 4], [2, 5], [3, 6]]</code></pre>`,
          depart: `def transposee(M):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la nouvelle matrice." },
            ],
            tests: `assert transposee([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]], "la transposée d'une matrice 2 × 3 est une matrice 3 × 2"\nassert transposee([[1, 2], [3, 4]]) == [[1, 3], [2, 4]], "transposee([[1, 2], [3, 4]]) doit renvoyer [[1, 3], [2, 4]]"\nassert transposee([[7, 8, 9]]) == [[7], [8], [9]], "une seule ligne devient une seule colonne"\n_m = [[1, 2], [3, 4]]\n_t = transposee(_m)\nassert _m == [[1, 2], [3, 4]], "la matrice reçue ne doit pas être modifiée"`,
          },
          felicitation: "Lignes et colonnes échangées : la case (i, j) est devenue (j, i). 🔄",
          indices: [
            "La transposée a autant de lignes que <code>M</code> a de colonnes, et autant de colonnes que <code>M</code> a de lignes.",
            "La case de la ligne <code>j</code> et de la colonne <code>i</code> de la transposée vaut <code>M[i][j]</code>. Une compréhension imbriquée, ou deux boucles avec <code>append()</code>, conviennent.",
          ],
          solution: `def transposee(M):\n    return [[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le morpion",
          contenu: `
            <p>Une grille de morpion est une matrice 3 × 3 contenant <code>"X"</code>,
            <code>"O"</code> ou <code>" "</code> pour une case vide. Écris la fonction
            <code>a_gagne(grille, joueur)</code>, qui renvoie <code>True</code> si
            <code>joueur</code> a aligné trois symboles sur une
            <strong>ligne</strong>, une <strong>colonne</strong> ou une
            <strong>diagonale</strong>, et <code>False</code> sinon.</p>
            <pre class="bloc-code"><code>grille = [["X", "O", " "],
          ["X", "O", " "],
          ["X", " ", "O"]]
a_gagne(grille, "X")    # renvoie True : la colonne 0
a_gagne(grille, "O")    # renvoie False</code></pre>`,
          depart: `def a_gagne(grille, joueur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours les lignes et les colonnes avec une boucle plutôt que d'écrire les huit cas." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer True ou False." },
            ],
            tests: `_g = [["X", "O", " "], ["X", "O", " "], ["X", " ", "O"]]\nassert a_gagne(_g, "X") == True, "X a aligné la colonne 0"\nassert a_gagne(_g, "O") == False, "O n'a rien aligné"\nassert a_gagne([["O", "O", "O"], ["X", "X", " "], [" ", " ", "X"]], "O") == True, "O a aligné la ligne 0"\nassert a_gagne([[" ", "X", "O"], ["X", "O", " "], ["O", "X", " "]], "O") == True, "O a aligné la diagonale qui monte"\nassert a_gagne([["X", "O", "O"], [" ", "X", " "], ["O", " ", "X"]], "X") == True, "X a aligné la diagonale qui descend"\nassert a_gagne([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]], "X") == False, "sur une grille vide, personne n'a gagné"\nassert a_gagne([["X", "O", "X"], ["X", "O", "O"], ["O", "X", "X"]], "X") == False, "une grille pleine sans alignement n'est pas gagnante"`,
          },
          felicitation: "Lignes, colonnes, diagonales : ta fonction arbitre une vraie partie. ⭕",
          indices: [
            "Une boucle sur <code>i</code> de 0 à 2 peut tester d'un coup la ligne <code>i</code> (cases <code>grille[i][0]</code>, <code>[i][1]</code>, <code>[i][2]</code>) et la colonne <code>i</code>.",
            "Restent les deux diagonales, à tester après la boucle : l'une passe par les cases où ligne et colonne sont égales, l'autre par celles où leur somme vaut 2.",
          ],
          solution: `def a_gagne(grille, joueur):\n    for i in range(3):\n        if grille[i][0] == joueur and grille[i][1] == joueur and grille[i][2] == joueur:\n            return True\n        if grille[0][i] == joueur and grille[1][i] == joueur and grille[2][i] == joueur:\n            return True\n    if grille[0][0] == joueur and grille[1][1] == joueur and grille[2][2] == joueur:\n        return True\n    if grille[0][2] == joueur and grille[1][1] == joueur and grille[2][0] == joueur:\n        return True\n    return False\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre grille",
          contenu: `
            <p>À toi de choisir : un plan de classe, un petit plateau de jeu, un emploi du
            temps, un tableau de scores… Écris un programme qui :</p>
            <ul>
              <li>crée une matrice d'<strong>au moins deux lignes</strong>, toutes de la
              même longueur ;</li>
              <li>affiche son nombre de lignes et de colonnes, calculés avec
              <code>len()</code> ;</li>
              <li>la parcourt avec <strong>deux boucles imbriquées</strong> pour calculer
              ou afficher quelque chose de ton choix.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[^\\n]*\\n[ \\t]+for\\b", message: "Parcours ta matrice avec deux boucles imbriquées." },
              { motif: "len\\s*\\(\\s*\\w+\\s*\\[\\s*\\d+\\s*\\]\\s*\\)", message: "Affiche le nombre de colonnes, avec len(M[0])." },
            ],
            sortieNonVide: true,
            tests: `_mats = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_") and len(v) >= 2 and all(isinstance(l, list) for l in v)]\nassert _mats, "Crée une matrice d'au moins deux lignes : une liste de listes."\nassert any(all(len(l) == len(m[0]) for l in m) for m in _mats), "Toutes les lignes de ta matrice doivent avoir la même longueur."`,
          },
          felicitation: "Ta grille, tes deux boucles : tu maîtrises les matrices. ✨",
          indices: [
            "Commence par ta matrice, une ligne de code par ligne de la grille, puis deux <code>print</code> pour les dimensions.",
            "Termine par deux boucles imbriquées : un compteur, un total, ou un affichage case par case.",
          ],
          solution: `scores = [\n    [3, 0, 5],\n    [2, 4, 1]\n]\nprint("Lignes :", len(scores))\nprint("Colonnes :", len(scores[0]))\ntotal = 0\nfor ligne in scores:\n    for s in ligne:\n        total = total + s\nprint("Total des points :", total)\n`,
        },
      ],
    },
  ],
};

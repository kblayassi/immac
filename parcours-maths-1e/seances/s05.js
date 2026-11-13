/* Maths Première — séance 5 : créer une liste et lire ses éléments.
 * Reprend la séance 1 du parcours NSI chapitre 4, en plus accessible : crochets,
 * indices à partir de 0, len(), IndexError, indices négatifs.
 * Fil rouge maths : la liste des termes d'une suite (u_n à l'indice n), les
 * nombres premiers, un tableau de valeurs, la médiane d'une série.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "Créer une liste et lire ses éléments",
  sousTitre: "Ranger plusieurs valeurs dans une seule variable",
  palier: "Partie 2 — Les listes",

  accroche: `Jusqu'ici, une variable ne contenait qu'<strong>une seule</strong> valeur.
    Pour garder les dix premiers termes d'une suite, il faudrait dix variables !
    Le programme de Première demande de savoir utiliser les <strong>listes</strong> : une
    seule variable, et toutes les valeurs rangées dedans, chacune à sa place.`,

  objectifs: [
    "créer une liste avec des <strong>crochets</strong>",
    "lire un élément grâce à son <strong>indice</strong>, qui commence à 0",
    "connaître la longueur d'une liste avec <code>len()</code>",
    "lire le dernier élément avec l'indice <code>-1</code>",
  ],

  motDeLaFin: `Tu sais créer une liste et lire n'importe laquelle de ses cases. À la séance 6,
    on la <strong>remplit</strong> : modifier une valeur, en ajouter une, et construire
    avec une boucle la liste des termes d'une suite.`,

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
          titre: "Plusieurs valeurs dans une seule variable",
          contenu: `
            <p>Une <strong>liste</strong> range plusieurs valeurs dans une seule
            variable. Les valeurs s'écrivent entre <strong>crochets</strong>
            <code>[ ]</code>, séparées par des virgules :</p>

            <pre class="bloc-code"><code>termes = [3, 7, 15, 31, 63]        # les cinq premiers termes d'une suite
notes = [12, 15.5, 8, 18]
jours = ["lundi", "mardi", "mercredi"]
vide = []                          # une liste qui ne contient rien, pour l'instant</code></pre>

            <p>Une liste est <strong>ordonnée</strong> : chaque valeur a sa place, et
            <code>[3, 7]</code> n'est pas la même liste que <code>[7, 3]</code>. Les
            crochets se tapent avec <kbd>Alt Gr</kbd> + <kbd>(</kbd> et
            <kbd>Alt Gr</kbd> + <kbd>)</kbd> sur un clavier de PC, et avec
            <kbd>⇧</kbd> + <kbd>⌥</kbd> + <kbd>(</kbd> sur un Mac.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première liste",
          contenu: `
            <p>Crée la liste <code>premiers</code> qui contient, dans l'ordre, les
            nombres premiers inférieurs à 20 : 2, 3, 5, 7, 11, 13, 17 et 19. Puis
            affiche-la. La console doit montrer :</p>
            <pre class="bloc-code"><code>[2, 3, 5, 7, 11, 13, 17, 19]</code></pre>`,
          depart: `premiers = \n\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\(\\s*premiers\\s*\\)", message: "Affiche la liste en donnant la variable premiers à print." },
            ],
            sortie: "[2, 3, 5, 7, 11, 13, 17, 19]",
            tests: `assert premiers == [2, 3, 5, 7, 11, 13, 17, 19], "premiers doit contenir 2, 3, 5, 7, 11, 13, 17 et 19, dans cet ordre"`,
          },
          felicitation: "Une seule variable, huit valeurs rangées dans l'ordre. 📚",
          indices: [
            "Après le signe <code>=</code>, ouvre un crochet, écris les huit nombres séparés par des virgules, et ferme le crochet.",
            "Sur la ligne suivante, un <code>print</code> qui reçoit la variable <code>premiers</code>.",
          ],
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Reconnaître une liste",
          contenu: `<p>Voici cinq variables. Elles se ressemblent, mais elles ne sont pas
            toutes des listes.</p>`,
          code: `a = (1, 2, 3)\nb = [1, 2, 3]\nc = []\nd = "1, 2, 3"\ne = [4]`,
          question: "Lesquelles sont des listes ?",
          options: [
            { texte: "<code>a</code>, <code>b</code> et <code>d</code>",
              explication: "<code>a</code> utilise des parenthèses et <code>d</code> est entre guillemets : aucun des deux n'a de crochets." },
            { texte: "<code>b</code> seulement",
              explication: "<code>b</code> en est une, mais pas la seule : regarde bien les crochets de <code>c</code> et de <code>e</code>." },
            { texte: "<code>b</code>, <code>c</code> et <code>e</code>", correct: true,
              explication: "Oui : ce sont les trois qui ont des crochets. <code>c</code> est une liste vide, <code>e</code> une liste d'un seul élément — les deux sont parfaitement valables." },
            { texte: "toutes les cinq",
              explication: "<code>d</code> est un texte qui <em>ressemble</em> à une liste, et <code>a</code> utilise des parenthèses." },
          ],
          apres: `<span class="chapo">Ce sont les crochets qui font la liste</span>
            <code>d</code> est un texte comme un autre : les chiffres et les virgules
            qu'il contient ne sont que des caractères. Et <code>a</code>, avec ses
            parenthèses, est un autre type de Python, dont on n'aura pas besoin.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Chaque élément a son indice",
          contenu: `
            <p>Chaque élément d'une liste occupe une position, appelée son
            <strong>indice</strong>. On lit l'élément d'indice <code>i</code> de la liste
            <code>L</code> en écrivant <code>L[i]</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La numérotation commence à 0</span>
              Le premier élément porte l'indice <strong>0</strong>, le deuxième l'indice
              1, et ainsi de suite.
            </div>

            <p>C'est parfait pour une suite qui commence à <em>u</em><sub>0</sub> :
            <em>u<sub>n</sub></em> se trouve à l'indice <em>n</em>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Terme</th><td><em>u</em><sub>0</sub></td><td><em>u</em><sub>1</sub></td><td><em>u</em><sub>2</sub></td><td><em>u</em><sub>3</sub></td><td><em>u</em><sub>4</sub></td></tr>
              <tr><th>Valeur</th><td>3</td><td>7</td><td>15</td><td>31</td><td>63</td></tr>
              <tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
              <tr><th>Se lit</th><td><code>termes[0]</code></td><td><code>termes[1]</code></td><td><code>termes[2]</code></td><td><code>termes[3]</code></td><td><code>termes[4]</code></td></tr>
            </table>
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Quel terme ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `termes = [3, 7, 15, 31, 63]\nprint(termes[2])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>7</code>",
              explication: "7 est le deuxième élément : son indice est 1. On a compté à partir de 1." },
            { texte: "<code>15</code>", correct: true,
              explication: "Oui : indice 0 → 3, indice 1 → 7, indice 2 → 15. C'est <em>u</em><sub>2</sub>, le troisième élément." },
            { texte: "<code>2</code>",
              explication: "Le 2 entre crochets est une position, pas une valeur : on affiche ce qui se trouve à cette position." },
            { texte: "<code>[3, 7]</code>",
              explication: "<code>termes[2]</code> désigne une seule case, pas un morceau de la liste." },
          ],
          apres: `<span class="chapo">L'indice vaut le rang moins un</span>
            Le troisième élément a l'indice 2, le dixième l'indice 9. C'est l'erreur la
            plus fréquente avec les listes, et elle ne provoque souvent aucun message —
            juste une mauvaise valeur.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Lire deux termes",
          contenu: `
            <p>La liste <code>termes</code> contient <em>u</em><sub>0</sub>,
            <em>u</em><sub>1</sub>, …, <em>u</em><sub>5</sub>. En lisant ses cases,
            affiche :</p>
            <pre class="bloc-code"><code>u0 = 3
u4 = 63</code></pre>`,
          depart: `termes = [3, 7, 15, 31, 63, 127]\n\n`,
          validation: {
            codeContient: [
              { motif: "termes\\s*\\[\\s*0\\s*\\]", message: "u0 se lit à l'indice 0." },
              { motif: "termes\\s*\\[\\s*4\\s*\\]", message: "u4 se lit à l'indice 4." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^\\n]*,\\s*(3|63)\\s*\\)", message: "N'écris pas les valeurs à la main : lis-les dans la liste." },
            ],
            sortie: "u0 = 3\nu4 = 63",
          },
          felicitation: "u0 à l'indice 0, u4 à l'indice 4 : la liste suit les rangs de la suite. 🎯",
          indices: [
            "Deux <code>print</code>, chacun avec un texte puis une case de la liste, séparés par une virgule.",
            "La case de <em>u</em><sub>4</sub> s'écrit <code>termes</code> suivi de l'indice 4 entre crochets.",
          ],
        },

        {
          id: "d7",
          type: "code",
          titre: "Combien d'éléments ?",
          contenu: `
            <p>La fonction <code>len()</code> — pour <em>length</em>, longueur — renvoie
            le <strong>nombre d'éléments</strong> d'une liste :</p>
            <pre class="bloc-code"><code>len([12, 15, 8, 18])    # vaut 4
len([])                 # vaut 0</code></pre>
            <p>Affiche le nombre de nombres premiers inférieurs à 100, <strong>calculé
            par Python</strong> à partir de la liste :</p>
            <pre class="bloc-code"><code>Nombre de premiers : 25</code></pre>`,
          depart: `premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,\n            43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*premiers\\s*\\)", message: "Utilise len() sur la liste premiers." },
            ],
            codeAbsent: [
              { motif: "\\b25\\b", message: "Le nombre doit être calculé par Python, pas compté à la main." },
            ],
            sortie: "Nombre de premiers : 25",
          },
          felicitation: "len() compte pour toi, même quand la liste est longue. 🔢",
          indices: [
            "Un <code>print</code> avec un texte, puis le résultat de <code>len</code> appliqué à la liste.",
            "<code>len</code> reçoit la liste <code>premiers</code> entre ses parenthèses.",
          ],
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Une case de trop",
          contenu: `<p>La liste compte six éléments, de <em>u</em><sub>0</sub> à
            <em>u</em><sub>5</sub>. Que se passe-t-il si on demande la case
            d'indice 6 ?</p>`,
          code: `termes = [3, 7, 15, 31, 63, 127]\nprint(termes[6])`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>127</code>",
              explication: "127 est bien le dernier élément, mais il est à l'indice 5." },
            { texte: "<code>255</code>, le terme suivant",
              explication: "Python ne connaît pas la formule de la suite : il ne lit que ce qui est rangé dans la liste." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : les indices valides vont de 0 à 5. L'indice 6 n'existe pas, et Python s'arrête avec IndexError: list index out of range." },
            { texte: "<code>0</code>",
              explication: "Une case qui n'existe pas ne vaut pas 0 : elle n'existe pas du tout." },
          ],
          apres: `<span class="chapo">IndexError : list index out of range</span>
            Ce message signifie « indice hors limites ». Pour une liste de <em>n</em>
            éléments, le dernier indice valide est <em>n</em> − 1. Quand tu le
            rencontres, cherche un décalage d'une unité.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le dernier élément : l'indice -1",
          contenu: `
            <p>Le dernier élément d'une liste <code>L</code> est à l'indice
            <code>len(L) - 1</code>. Python propose un raccourci bien pratique : les
            <strong>indices négatifs</strong>, qui comptent <strong>depuis la
            fin</strong>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Élément</th><td><code>10</code></td><td><code>20</code></td><td><code>30</code></td><td><code>40</code></td></tr>
              <tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
              <tr><th>Indice négatif</th><td>−4</td><td>−3</td><td>−2</td><td>−1</td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>L = [10, 20, 30, 40]
print(L[-1])    # 40 : le dernier élément
print(L[-2])    # 30 : l'avant-dernier</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">À retenir</span>
              <code>L[-1]</code> désigne <strong>toujours</strong> le dernier élément,
              quelle que soit la longueur de la liste.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Depuis la fin",
          contenu: `
            <p>Avec des <strong>indices négatifs</strong>, affiche le plus grand nombre
            premier de la liste (le dernier), puis l'avant-dernier :</p>
            <pre class="bloc-code"><code>Le plus grand : 97
L'avant-dernier : 89</code></pre>`,
          depart: `premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,\n            43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]\n\n`,
          validation: {
            codeContient: [
              { motif: "premiers\\s*\\[\\s*-\\s*1\\s*\\]", message: "Le dernier élément se lit à l'indice -1." },
              { motif: "premiers\\s*\\[\\s*-\\s*2\\s*\\]", message: "L'avant-dernier se lit à l'indice -2." },
            ],
            sortie: "Le plus grand : 97\nL'avant-dernier : 89",
          },
          felicitation: "-1 pour le dernier, -2 pour l'avant-dernier, sans compter. ⏪",
          indices: [
            "En partant de la fin, la première case rencontrée a l'indice <code>-1</code>, la suivante <code>-2</code>.",
            "Le second texte contient une apostrophe : entoure-le de guillemets doubles.",
          ],
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>termes = [3, 7, 15, 31, 63]    # une liste : des crochets, des virgules
vide = []                      # la liste vide

termes[0]                      # 3  : le premier élément, indice 0
termes[2]                      # 15 : u2, le troisième élément
termes[-1]                     # 63 : le dernier élément
len(termes)                    # 5  : le nombre d'éléments</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>le premier élément</td><td><code>L[0]</code></td></tr>
              <tr><td><em>u<sub>n</sub></em>, si la liste commence à <em>u</em><sub>0</sub></td><td><code>L[n]</code></td></tr>
              <tr><td>l'élément de rang <em>k</em> (en comptant à partir de 1)</td><td><code>L[k - 1]</code></td></tr>
              <tr><td>le dernier élément</td><td><code>L[-1]</code></td></tr>
              <tr><td>le nombre d'éléments</td><td><code>len(L)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>compter à partir de 1 : le troisième élément est <code>L[2]</code>, pas <code>L[3]</code> ;</li>
                <li>demander <code>L[len(L)]</code> : une case de trop, et c'est l'<code>IndexError</code> ;</li>
                <li>oublier un crochet ou une virgule en créant la liste : <code>SyntaxError</code>.</li>
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
      intention: "on réinvestit, du plus simple au plus complet",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Lire une liste",
          contenu: `<p>On considère la liste suivante.</p>`,
          code: `L = [5, 12, 9, 4]`,
          question: "Que valent L[0], L[2], L[-1] et len(L), dans cet ordre ?",
          options: [
            { texte: "5, 12, 4 et 4",
              explication: "<code>L[2]</code> ne vaut pas 12 : 12 est à l'indice 1." },
            { texte: "5, 9, 4 et 4", correct: true,
              explication: "Oui : indice 0 → 5, indice 2 → 9, dernier élément → 4, et la liste compte 4 éléments." },
            { texte: "12, 4, 5 et 3",
              explication: "On a compté à partir de 1. Et len(L) compte les éléments : il y en a 4." },
            { texte: "5, 9, 4 et 3",
              explication: "Presque : len(L) vaut 4, le nombre d'éléments. C'est le dernier <em>indice</em> qui vaut 3." },
          ],
          apres: `<span class="chapo">Longueur et dernier indice</span>
            Une liste de 4 éléments a une <strong>longueur</strong> de 4 et un
            <strong>dernier indice</strong> de 3. Les deux diffèrent toujours d'une
            unité.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Un tableau de valeurs en deux listes",
          contenu: `
            <p>Un tableau de valeurs de la fonction carré est rangé dans deux listes :
            <code>X</code> pour les antécédents, <code>Y</code> pour les images. L'image
            de <code>X[i]</code> est <code>Y[i]</code>, à la même position.</p>
            <p>En lisant les deux listes, affiche :</p>
            <pre class="bloc-code"><code>L'image de -1 est 1
L'image de 2 est 4</code></pre>`,
          depart: `X = [-2, -1, 0, 1, 2]\nY = [4, 1, 0, 1, 4]\n\n`,
          validation: {
            codeContient: [
              { motif: "X\\s*\\[\\s*1\\s*\\]", message: "-1 est dans X à l'indice 1." },
              { motif: "Y\\s*\\[\\s*1\\s*\\]", message: "Son image est dans Y, à la même position." },
              { motif: "X\\s*\\[\\s*(-\\s*1|4)\\s*\\]", message: "2 est le dernier élément de X." },
              { motif: "Y\\s*\\[\\s*(-\\s*1|4)\\s*\\]", message: "Son image est le dernier élément de Y." },
            ],
            codeAbsent: [
              { motif: "\\b(de|est)\\s+-?\\d", message: "Les nombres ne doivent pas être écrits dans le texte : lis-les dans les listes." },
            ],
            sortie: "L'image de -1 est 1\nL'image de 2 est 4",
          },
          felicitation: "Deux listes lues à la même position : un vrai tableau de valeurs. 📋",
          indices: [
            "Chaque ligne affiche quatre morceaux : un texte, une case de <code>X</code>, un texte, une case de <code>Y</code>.",
            "−1 est à l'indice 1 dans <code>X</code> ; son image est à l'indice 1 dans <code>Y</code>. Pour 2, le dernier élément : indice <code>-1</code> dans les deux listes.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Une suite qui commence à 1",
          contenu: `
            <p>Toutes les suites ne commencent pas à <em>u</em><sub>0</sub>. La liste
            <code>v</code> contient les termes <em>v</em><sub>1</sub>,
            <em>v</em><sub>2</sub>, …, <em>v</em><sub>6</sub> d'une suite qui commence au
            rang 1. La variable <code>n</code> contient un rang.</p>
            <p>Affiche <em>v<sub>n</sub></em> en lisant la liste à l'aide de
            <code>n</code>. Avec <code>n = 4</code>, la console doit montrer :</p>
            <pre class="bloc-code"><code>16</code></pre>
            <p>Ton programme doit rester juste si l'on change <code>n</code> : avec 1, il
            afficherait 2.</p>`,
          depart: `v = [2, 4, 8, 16, 32, 64]\nn = 4\n\n`,
          validation: {
            codeContient: [
              { motif: "v\\s*\\[[^\\]]*\\bn\\b", message: "L'indice doit être calculé à partir de la variable n." },
            ],
            codeAbsent: [
              { motif: "v\\s*\\[\\s*\\d+\\s*\\]", message: "N'écris pas l'indice en dur : calcule-le à partir de n." },
              { motif: "print\\s*\\(\\s*16\\s*\\)", message: "Lis la valeur dans la liste." },
            ],
            sortie: "16",
          },
          felicitation: "Quand la suite commence à 1, v(n) est à l'indice n − 1. 📅",
          indices: [
            "Avec <code>v[n]</code>, on obtient 32 : il y a un décalage.",
            "<em>v</em><sub>1</sub> est à l'indice 0 : il faut retirer quelque chose à <code>n</code>.",
          ],
          apres: `<span class="chapo">Deux situations à distinguer</span>
            Suite qui commence à <em>u</em><sub>0</sub> : <em>u<sub>n</sub></em> est à
            l'indice <em>n</em>. Suite qui commence à <em>v</em><sub>1</sub> :
            <em>v<sub>n</sub></em> est à l'indice <em>n</em> − 1. Regarde toujours par
            quel terme commence la liste.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>La liste contient <em>u</em><sub>0</sub> à <em>u</em><sub>4</sub>. Ce
            programme devrait afficher :</p>
            <pre class="bloc-code"><code>Premier terme : 3
Dernier terme : 63
Nombre de termes : 5</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Exécute-le, lis les messages, et
            corrige-les une par une.</p>`,
          depart: `termes = [3, 7, 15, 31, 63\nprint("Premier terme :", termes[1])\nprint("Dernier terme :", termes[5])\nprint("Nombre de termes :", len(termes))\n`,
          validation: {
            codeContient: [
              { motif: "termes\\s*\\[\\s*0\\s*\\]", message: "Le premier terme est à l'indice 0." },
              { motif: "termes\\s*\\[\\s*(-\\s*1|4)\\s*\\]", message: "Le dernier terme se lit à l'indice -1." },
            ],
            sortie: "Premier terme : 3\nDernier terme : 63\nNombre de termes : 5",
          },
          felicitation: "Un crochet oublié, un décalage, un indice hors limites : les trois classiques. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde comment se termine la liste.",
            "Une fois la liste réparée, le premier terme affiché n'est pas le bon : à quel indice se trouve le premier élément ?",
            "La dernière erreur est une <code>IndexError</code> : cinq éléments, donc quel est le dernier indice valide ?",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "La médiane",
          contenu: `
            <p>La <strong>médiane</strong> d'une série <strong>rangée dans l'ordre
            croissant</strong> et comptant un nombre impair de valeurs est la valeur
            du milieu. Pour <code>[8, 11, 12, 14, 15, 17, 19]</code>, c'est 14.</p>
            <p>Pour calculer l'indice du milieu, on a besoin de la <strong>division
            entière</strong> <code>//</code>, qui donne le quotient sans la partie
            décimale : <code>7 // 2</code> vaut 3.</p>
            <p>Affiche la médiane de la série <code>valeurs</code> en calculant son
            indice à partir de <code>len(valeurs)</code> :</p>
            <pre class="bloc-code"><code>Médiane : 14</code></pre>
            <p>Ton calcul doit fonctionner pour n'importe quelle série de longueur
            impaire.</p>`,
          depart: `valeurs = [8, 11, 12, 14, 15, 17, 19]\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*valeurs\\s*\\)", message: "L'indice du milieu se calcule à partir de len(valeurs)." },
              { motif: "//", message: "Un indice est un entier : utilise la division entière //." },
            ],
            codeAbsent: [
              { motif: "valeurs\\s*\\[\\s*3\\s*\\]", message: "N'écris pas l'indice en dur : calcule-le." },
              { motif: "print\\s*\\([^\\n]*,\\s*14\\s*\\)", message: "Lis la médiane dans la liste." },
            ],
            sortie: "Médiane : 14",
          },
          felicitation: "len(L) // 2 : l'indice du milieu de n'importe quelle série impaire. ⚖️",
          indices: [
            "Pour 7 valeurs, le milieu est à l'indice 3 ; pour 9 valeurs, à l'indice 4. Quel lien avec la longueur ?",
            "L'indice du milieu, c'est la longueur de la liste, divisée par 2 avec <code>//</code>. Ce calcul se met directement entre les crochets.",
          ],
          apres: `<span class="chapo">Pourquoi pas / ?</span>
            <code>7 / 2</code> vaut 3.5, et une liste n'a pas de case numéro 3,5 : Python
            refuserait avec une <code>TypeError</code>. La division entière donne
            toujours un entier.`,
        },
      ],
    },
  ],
};

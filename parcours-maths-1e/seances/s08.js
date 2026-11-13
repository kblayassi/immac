/* Maths Première — séance 8 : les listes en compréhension.
 * Reprend la séance 4 du parcours NSI chapitre 4, en plus accessible :
 * construire, transformer et filtrer une liste en une ligne.
 * Fil rouge maths : images d'un tableau de valeurs, termes d'une suite
 * explicite, diviseurs, nombres premiers.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "Les listes en compréhension",
  sousTitre: "Construire et filtrer une liste en une ligne",
  palier: "Partie 2 — Les listes",

  accroche: `Remplir une liste avec une boucle et <code>append</code> demande trois lignes.
    Python propose une écriture plus courte, qui ressemble beaucoup à la façon dont on
    décrit un ensemble en maths : « la liste des <em>x</em>² pour <em>x</em> dans X ».
    C'est la <strong>liste en compréhension</strong>, la dernière notion de ce parcours.`,

  objectifs: [
    "construire une liste en une ligne : <code>[expression for x in L]</code>",
    "utiliser <code>range</code> dans une compréhension",
    "<strong>filtrer</strong> une liste avec un <code>if</code> : <code>[x for x in L if condition]</code>",
    "choisir entre la boucle et la compréhension",
  ],

  motDeLaFin: `Tu as fait le tour de ce que le programme de Première demande sur les listes :
    les créer, les lire, les remplir, les parcourir, et les construire en compréhension.
    Il ne reste qu'une étape : le <strong>défi final</strong>, où tout se combine.`,

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
          titre: "Une boucle en une ligne",
          contenu: `
            <p>Ces deux programmes construisent la même liste, celle des doubles des
            éléments de <code>L</code> :</p>

            <pre class="bloc-code"><code># Avec une boucle et append
L = [1, 2, 3]
doubles = []
for x in L:
    doubles.append(2 * x)</code></pre>

            <pre class="bloc-code"><code># En compréhension
L = [1, 2, 3]
doubles = [2 * x for x in L]      # [2, 4, 6]</code></pre>

            <p>Entre les crochets, on écrit d'abord <strong>ce qu'on met dans la
            liste</strong> (<code>2 * x</code>), puis <strong>d'où viennent les
            valeurs</strong> (<code>for x in L</code>). On le lit « la liste des
            2<em>x</em>, pour <em>x</em> dans L ».</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Les images, en une ligne",
          contenu: `
            <p>En une seule ligne, construis la liste <code>Y</code> des images des
            éléments de <code>X</code> par la fonction
            <em>x</em> ↦ <em>x</em>² − 1, puis affiche-la :</p>
            <pre class="bloc-code"><code>[3, 0, -1, 0, 3]</code></pre>`,
          depart: `X = [-2, -1, 0, 1, 2]\n\n`,
          validation: {
            codeContient: [
              { motif: "Y\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+X\\s*\\]", message: "Construis Y en compréhension : Y = [ … for x in X]." },
              { motif: "print\\s*\\(\\s*Y\\s*\\)", message: "Affiche Y." },
            ],
            codeAbsent: [
              { motif: "\\.append", message: "Ici, pas d'append : tout tient entre les crochets." },
            ],
            sortie: "[3, 0, -1, 0, 3]",
            tests: `assert Y == [3, 0, -1, 0, 3], "Y doit contenir les images x² - 1 des éléments de X"`,
          },
          felicitation: "Un tableau de valeurs en une seule ligne. ⚡",
          indices: [
            "Reprends le modèle du cours : entre crochets, l'expression, puis <code>for x in X</code>.",
            "L'expression, c'est l'image de <code>x</code> : <code>x ** 2 - 1</code>.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Avec range",
          contenu: `<p>Une compréhension peut aussi parcourir un <code>range</code>. Lis ce
            programme sans l'exécuter.</p>`,
          code: `L = [2 * k for k in range(4)]\nprint(L)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[2, 4, 6, 8]</code>",
              explication: "range(4) commence à 0, pas à 1." },
            { texte: "<code>[0, 2, 4, 6]</code>", correct: true,
              explication: "Oui : k vaut 0, 1, 2, 3, et on range le double de chacun." },
            { texte: "<code>[0, 1, 2, 3]</code>",
              explication: "Ce sont les valeurs de k ; la liste contient 2 * k." },
            { texte: "<code>[0, 2, 4, 6, 8]</code>",
              explication: "range(4) fait quatre tours, pas cinq." },
          ],
          apres: `<span class="chapo">Une liste de nombres en une ligne</span>
            Avec <code>range</code>, on fabrique une liste sans en avoir une au départ :
            <code>[k ** 2 for k in range(1, 11)]</code> donne les carrés de 1 à 100.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Les termes d'une suite explicite",
          contenu: `
            <p>La suite géométrique (<em>u<sub>n</sub></em>) a pour terme général
            <strong><em>u<sub>n</sub></em> = 5 × 3<sup><em>n</em></sup></strong>.</p>
            <p>En une seule ligne, construis la liste <code>termes</code> de
            <em>u</em><sub>0</sub> à <em>u</em><sub>5</sub>, puis affiche-la :</p>
            <pre class="bloc-code"><code>[5, 15, 45, 135, 405, 1215]</code></pre>`,
          depart: `# Une ligne pour construire la liste, une ligne pour l'afficher\n\n`,
          validation: {
            codeContient: [
              { motif: "termes\\s*=\\s*\\[[^\\n]*\\bfor\\s+n\\s+in\\s+range\\s*\\(\\s*6\\s*\\)\\s*\\]", message: "Construis termes en compréhension, avec n qui parcourt range(6)." },
              { motif: "\\*\\*\\s*n\\b", message: "3 puissance n s'écrit 3 ** n." },
              { motif: "print\\s*\\(\\s*termes\\s*\\)", message: "Affiche termes." },
            ],
            codeAbsent: [
              { motif: "\\b(135|405|1215)\\b", message: "Les termes doivent être calculés par Python." },
            ],
            sortie: "[5, 15, 45, 135, 405, 1215]",
          },
          felicitation: "La forme explicite et la compréhension vont très bien ensemble. 🌱",
          indices: [
            "La variable de la compréhension s'appelle <code>n</code> et parcourt les rangs 0 à 5 : <code>range(6)</code>.",
            "Ce qu'on range dans la liste, c'est le terme <em>u<sub>n</sub></em> : 5 fois 3 puissance <code>n</code>.",
          ],
          apres: `<span class="chapo">Et pour une suite récurrente ?</span>
            La compréhension calcule chaque élément indépendamment des autres. Pour une
            suite récurrente, où chaque terme dépend du précédent, la boucle avec
            <code>append</code> de la séance 6 reste la bonne méthode.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Filtrer avec if",
          contenu: `
            <p>On peut ajouter une <strong>condition</strong> à la fin de la
            compréhension : seuls les éléments qui la vérifient sont gardés.</p>

            <pre class="bloc-code"><code>notes = [12, 8, 15, 10, 7]
admis = [n for n in notes if n >= 10]      # [12, 15, 10]</code></pre>

            <p>On le lit « la liste des <em>n</em>, pour <em>n</em> dans notes,
            <strong>si</strong> <em>n</em> ⩾ 10 ». C'est l'équivalent, en une ligne, de
            la boucle avec un <code>if</code> et un <code>append</code> de la
            séance 6.</p>

            <div class="encadre">
              <span class="chapo">Transformer et filtrer à la fois</span>
              Les deux se combinent : <code>[2 * n for n in notes if n &lt; 10]</code>
              donne les doubles des notes inférieures à 10, soit <code>[16, 14]</code>.
            </div>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Garder les positifs",
          contenu: `
            <p>En une ligne, construis la liste <code>positifs</code> des éléments
            <strong>strictement positifs</strong> de <code>L</code>, puis affiche-la :</p>
            <pre class="bloc-code"><code>[5, 8, 2]</code></pre>`,
          depart: `L = [-3, 5, 0, -1, 8, 2]\n\n`,
          validation: {
            codeContient: [
              { motif: "positifs\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+L\\s+if\\b[^\\n]*>\\s*0[^\\n]*\\]", message: "Construis positifs en compréhension, avec une condition : … if x > 0." },
              { motif: "print\\s*\\(\\s*positifs\\s*\\)", message: "Affiche positifs." },
            ],
            sortie: "[5, 8, 2]",
            tests: `assert positifs == [5, 8, 2], "positifs doit contenir 5, 8 et 2 : le 0 n'est pas strictement positif"`,
          },
          felicitation: "Un filtre en une ligne : seul ce qui passe le test entre dans la liste. 🔍",
          indices: [
            "On garde les éléments tels quels : l'expression est simplement la variable de boucle.",
            "La condition se place à la fin, avant le crochet fermant : <code>if x &gt; 0</code>.",
          ],
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Un filtre avec le reste",
          contenu: `<p>On rappelle que <code>x % 3</code> est le reste de la division de
            <code>x</code> par 3. Lis ce programme sans l'exécuter.</p>`,
          code: `L = [x for x in range(10) if x % 3 == 0]\nprint(L)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[3, 6, 9]</code>",
              explication: "0 aussi est divisible par 3 : 0 % 3 vaut 0." },
            { texte: "<code>[0, 3, 6, 9]</code>", correct: true,
              explication: "Oui : ce sont les entiers de 0 à 9 dont le reste dans la division par 3 est nul — les multiples de 3." },
            { texte: "<code>[0, 0, 0, 0]</code>",
              explication: "On range x, pas x % 3 : la condition sert seulement à trier." },
            { texte: "<code>[1, 2, 4, 5, 7, 8]</code>",
              explication: "C'est l'inverse : on garde ceux dont le reste vaut 0." },
          ],
          apres: `<span class="chapo">« Divisible par » se teste avec %</span>
            <code>a % b == 0</code> signifie « <em>b</em> divise <em>a</em> ». C'est le
            test des diviseurs, des multiples, des nombres pairs (<code>x % 2 ==
            0</code>).`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Les diviseurs, en une ligne",
          contenu: `
            <p>À la séance 6, il a fallu une boucle, un <code>if</code> et un
            <code>append</code> pour trouver les diviseurs de 36. En une seule ligne,
            construis la liste <code>diviseurs</code> des diviseurs de 60, puis
            affiche-la :</p>
            <pre class="bloc-code"><code>[1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]</code></pre>`,
          depart: `# Une ligne pour construire la liste, une ligne pour l'afficher\n\n`,
          validation: {
            codeContient: [
              { motif: "diviseurs\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*61\\s*\\)\\s*if\\s+60\\s*%\\s*\\w+\\s*==\\s*0\\s*\\]", message: "En compréhension : les k de range(1, 61) tels que 60 % k == 0." },
              { motif: "print\\s*\\(\\s*diviseurs\\s*\\)", message: "Affiche diviseurs." },
            ],
            sortie: "[1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]",
          },
          felicitation: "Trois lignes de la séance 6, réunies en une. ✂️",
          indices: [
            "Les candidats sont les entiers de 1 à 60 inclus : <code>range(1, 61)</code>.",
            "On garde <code>k</code> tel quel, à condition que 60 divisé par <code>k</code> tombe juste : <code>if 60 % k == 0</code>.",
          ],
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>[2 * x for x in L]                  # transformer : les doubles
[x ** 2 - 1 for x in X]             # les images par une fonction
[5 * 3 ** n for n in range(6)]      # les termes d'une suite explicite
[x for x in L if x > 0]             # filtrer : les positifs
[k for k in range(1, 61) if 60 % k == 0]    # les diviseurs de 60</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Avec une boucle</th><th>En compréhension</th></tr>
              <tr><td><code>M = []</code><br><code>for x in L:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;M.append(f(x))</code></td><td><code>M = [f(x) for x in L]</code></td></tr>
              <tr><td><code>M = []</code><br><code>for x in L:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if cond:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M.append(x)</code></td><td><code>M = [x for x in L if cond]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>oublier le crochet fermant : <code>SyntaxError</code> ;</li>
                <li>mettre la condition au début : elle se place <strong>à la fin</strong>,
                après le <code>for</code> ;</li>
                <li>vouloir tout écrire en compréhension : pour une suite récurrente, ou
                quand la ligne devient illisible, la boucle reste préférable.</li>
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
          titre: "Les nombres impairs",
          contenu: `<p>On veut la liste des nombres impairs de 1 à 19 :
            <code>[1, 3, 5, …, 19]</code>.</p>`,
          question: "Quelle ligne la construit ?",
          options: [
            { texte: "<code>[2 * k for k in range(1, 20)]</code>",
              explication: "Elle donne les nombres pairs de 2 à 38 : 2 × k est toujours pair." },
            { texte: "<code>[k for k in range(1, 20) if k % 2 == 0]</code>",
              explication: "Un reste nul dans la division par 2, ce sont les nombres pairs." },
            { texte: "<code>[2 * k + 1 for k in range(10)]</code>", correct: true,
              explication: "Oui : pour k de 0 à 9, 2k + 1 va de 1 à 19, et c'est toujours impair." },
            { texte: "<code>[k for k in range(1, 19) if k % 2 == 1]</code>",
              explication: "Le filtre est bon, mais range(1, 19) s'arrête à 18 : il manque 19." },
          ],
          apres: `<span class="chapo">Deux méthodes justes</span>
            On peut aussi filtrer : <code>[k for k in range(1, 20) if k % 2 == 1]</code>.
            Transformer (2<em>k</em> + 1) ou filtrer (reste 1) : les deux donnent la même
            liste.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Un tableau de valeurs complet",
          contenu: `
            <p>En deux lignes, construis en compréhension la liste <code>X</code> des
            entiers de −3 à 3, puis la liste <code>Y</code> de leurs images par
            <em>f</em>(<em>x</em>) = 2<em>x</em> + 3. Affiche ensuite les deux
            listes :</p>
            <pre class="bloc-code"><code>[-3, -2, -1, 0, 1, 2, 3]
[-3, -1, 1, 3, 5, 7, 9]</code></pre>`,
          depart: `# X, puis Y, en compréhension\n\n`,
          validation: {
            codeContient: [
              { motif: "X\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+range\\s*\\(\\s*-\\s*3\\s*,\\s*4\\s*\\)\\s*\\]", message: "X se construit en compréhension avec range(-3, 4)." },
              { motif: "Y\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+X\\s*\\]", message: "Y se construit en compréhension à partir de X." },
            ],
            sortie: "[-3, -2, -1, 0, 1, 2, 3]\n[-3, -1, 1, 3, 5, 7, 9]",
          },
          felicitation: "Antécédents et images, deux listes, deux lignes. 📋",
          indices: [
            "Pour <code>X</code>, on garde les valeurs du <code>range</code> telles quelles. Pour aller de −3 à 3 inclus : <code>range(-3, 4)</code>.",
            "Pour <code>Y</code>, on parcourt <code>X</code> et on range <code>2 * x + 3</code>. Puis deux <code>print</code>.",
          ],
          apres: `<span class="chapo">Une fonction affine</span>
            Les images augmentent toujours de 2 : c'est le coefficient directeur. Une
            fonction affine transforme des antécédents régulièrement espacés en une suite
            arithmétique.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La fonction diviseurs",
          contenu: `
            <p>Écris la fonction <code>diviseurs(n)</code> qui <strong>renvoie</strong> la
            liste des diviseurs de <code>n</code>, construite en compréhension.</p>
            <pre class="bloc-code"><code>diviseurs(12)    # renvoie [1, 2, 3, 4, 6, 12]
diviseurs(7)     # renvoie [1, 7]</code></pre>
            <p>Termine en affichant <code>diviseurs(28)</code>.</p>`,
          depart: `def diviseurs(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "return\\s*\\[[^\\n]*\\bfor\\b[^\\n]*\\bif\\b", message: "La fonction renvoie une liste en compréhension, avec un filtre if." },
              { motif: "print\\s*\\(\\s*diviseurs\\s*\\(\\s*28\\s*\\)\\s*\\)", message: "Termine en affichant diviseurs(28)." },
            ],
            sortie: "[1, 2, 4, 7, 14, 28]",
            tests: `assert diviseurs(12) == [1, 2, 3, 4, 6, 12], "diviseurs(12) doit renvoyer [1, 2, 3, 4, 6, 12]"\nassert diviseurs(7) == [1, 7], "diviseurs(7) doit renvoyer [1, 7]"\nassert diviseurs(1) == [1], "diviseurs(1) doit renvoyer [1]"`,
          },
          felicitation: "Une fonction qui renvoie une liste : la séance 4 et la séance 8 réunies. 🧩",
          indices: [
            "Reprends la compréhension des diviseurs de 60, en remplaçant 60 par le paramètre <code>n</code>.",
            "Les candidats vont de 1 à <code>n</code> inclus : <code>range(1, n + 1)</code>. La liste construite se place directement après <code>return</code>.",
          ],
          apres: `<span class="chapo">Un nombre parfait</span>
            Les diviseurs de 28 autres que 28 lui-même sont 1, 2, 4, 7 et 14, et leur somme
            vaut… 28. On dit que 28 est un nombre <strong>parfait</strong>. Tu en
            chercheras d'autres au défi final.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Les nombres premiers",
          contenu: `
            <p>Un nombre premier a <strong>exactement deux</strong> diviseurs : 1 et
            lui-même. La fonction <code>diviseurs</code> est déjà écrite.</p>
            <p>En une ligne, construis la liste <code>premiers</code> des nombres premiers
            inférieurs à 50, en testant <code>len(diviseurs(n))</code>, puis
            affiche-la :</p>
            <pre class="bloc-code"><code>[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]</code></pre>`,
          depart: `def diviseurs(n):\n    return [k for k in range(1, n + 1) if n % k == 0]\n\n`,
          validation: {
            codeContient: [
              { motif: "premiers\\s*=\\s*\\[[^\\n]*\\bfor\\b[^\\n]*\\bif\\s+len\\s*\\(\\s*diviseurs\\s*\\(\\s*\\w+\\s*\\)\\s*\\)\\s*==\\s*2", message: "Filtre avec la condition len(diviseurs(n)) == 2." },
              { motif: "print\\s*\\(\\s*premiers\\s*\\)", message: "Affiche premiers." },
            ],
            codeAbsent: [
              { motif: "\\b(43|47)\\b", message: "Les nombres premiers doivent être trouvés par Python." },
            ],
            sortie: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]",
          },
          felicitation: "La définition d'un nombre premier, traduite mot pour mot. 🔢",
          indices: [
            "Les candidats sont les entiers de 2 à 49 : <code>range(2, 50)</code>. On les garde tels quels.",
            "La condition : le nombre de diviseurs de <code>n</code> vaut 2, soit <code>len(diviseurs(n)) == 2</code>.",
          ],
          apres: `<span class="chapo">Et 1 ?</span>
            1 n'a qu'un seul diviseur, lui-même : il n'est donc pas premier. La condition
            « exactement deux diviseurs » l'écarte toute seule, même si on part de 1.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait construire la liste des carrés des nombres
            <strong>pairs</strong> de 1 à 10, et afficher :</p>
            <pre class="bloc-code"><code>[4, 16, 36, 64, 100]</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. La dernière ne provoque aucun
            message.</p>`,
          depart: `carres = [x ** 2 for x in range(1, 10) if x % 2 = 0\nprint(carres)\n`,
          validation: {
            codeContient: [
              { motif: "carres\\s*=\\s*\\[[^\\n]*\\]", message: "La compréhension doit se fermer par un crochet." },
              { motif: "x\\s*%\\s*2\\s*==\\s*0", message: "Pour comparer, il faut deux signes égal : x % 2 == 0." },
              { motif: "range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)", message: "Pour aller jusqu'à 10 inclus : range(1, 11)." },
            ],
            sortie: "[4, 16, 36, 64, 100]",
          },
          felicitation: "Un crochet, un double égal, un range : la compréhension est réparée. 🐞",
          indices: [
            "La première erreur : <code>invalid syntax</code>, et la flèche pointe sur le signe égal. Dans la condition, il faut <strong>comparer</strong>, pas affecter.",
            "La deuxième : <code>'[' was never closed</code>. Un crochet ouvert doit être refermé.",
            "Enfin, le programme affiche <code>[4, 16, 36, 64]</code> : il manque 100. Jusqu'où va <code>range(1, 10)</code> ?",
          ],
        },

        {
          id: "a6",
          type: "code",
          titre: "La moyenne des admis",
          contenu: `
            <p>Avec une compréhension, construis la liste <code>admis</code> des notes
            supérieures ou égales à 10, puis affiche leur moyenne, calculée avec
            <code>sum</code> et <code>len</code> :</p>
            <pre class="bloc-code"><code>Moyenne des admis : 12.75</code></pre>`,
          depart: `notes = [12, 8, 15, 10, 14, 7]\n\n`,
          validation: {
            codeContient: [
              { motif: "admis\\s*=\\s*\\[[^\\n]*\\bfor\\s+(\\w+)\\s+in\\s+notes\\s+if\\b[^\\n]*>=\\s*10", message: "Construis admis en compréhension, avec la condition … >= 10." },
              { motif: "sum\\s*\\(\\s*admis\\s*\\)\\s*/\\s*len\\s*\\(\\s*admis\\s*\\)", message: "La moyenne des admis, c'est sum(admis) / len(admis)." },
            ],
            codeAbsent: [
              { motif: "12\\.75", message: "La moyenne doit être calculée par Python." },
            ],
            sortie: "Moyenne des admis : 12.75",
          },
          felicitation: "Filtrer, puis calculer : deux lignes, deux idées. 📊",
          indices: [
            "Première ligne : la compréhension qui garde les notes d'au moins 10.",
            "Deuxième ligne : un <code>print</code> avec le texte et la moyenne de la liste <code>admis</code> — et non de <code>notes</code>.",
          ],
        },
      ],
    },
  ],
};

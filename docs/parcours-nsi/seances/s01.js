/* NSI — chapitre 1, séance 1 : le langage Python et les variables.
 *
 * Reprend l'introduction du chapitre (langage, interpréteur, indentation) puis
 * la partie « Les variables » du cours, et les exercices 1, 3 et 4.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Le langage Python et les variables",
  sousTitre: "Mémoriser des données pour les manipuler",
  palier: "Partie 1 — Manipuler des données",

  accroche: `Un programme, c'est une suite d'instructions. Pour qu'il serve à quelque
    chose, il doit pouvoir <strong>retenir</strong> des valeurs et les modifier au fil
    de son exécution. C'est le rôle des variables — la première brique de tout le reste.`,

  objectifs: [
    "savoir ce qu'est un langage de programmation interprété",
    "créer une variable par une <strong>affectation</strong>",
    "anticiper la valeur d'une variable au fil d'un programme",
    "nommer ses variables selon les conventions de Python",
  ],

  motDeLaFin: `Tes programmes savent mémoriser. À la séance 2, on regarde de plus près
    <em>ce qu'ils</em> mémorisent : les types de données.`,

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
          titre: "Un langage de programmation",
          contenu: `
            <p>Un langage de programmation permet de décrire les <strong>données</strong> et
            les <strong>instructions</strong> qu'un ordinateur doit suivre. C'est un moyen de
            communication entre l'humain et la machine — et entre programmeurs eux-mêmes.</p>

            <p style="text-align:center">
              <img src="../files/NSI/Python1/programmation_languages.png"
                   alt="Blagues sur différents langages de programmation"
                   style="width:70%;border-radius:9px">
            </p>

            <div class="encadre">
              <span class="chapo">Définition : instruction</span>
              Une <strong>instruction</strong> est une ligne de code que l'ordinateur peut
              comprendre et exécuter. Par exemple : <code>print("Bonjour !")</code>
            </div>

            <p>Un programme Python est une <strong>suite d'instructions</strong> exécutées
            <strong>dans l'ordre</strong>. Python est un langage <strong>interprété</strong> :
            chaque ligne est lue et exécutée immédiatement, sans étape de compilation.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où écrire du Python cette année</span>
              <strong>Basthon</strong> (en ligne, sans installation) · <strong>Capytale</strong>
              (pour les TP à rendre) · <strong>Visual Studio Code</strong> (à installer).
              Dans ce parcours, tout s'exécute directement dans la page : c'est du vrai
              Python, lancé par ton navigateur.
            </div>`,
        },

        {
          id: "d2",
          type: "cours",
          titre: "L'indentation, dès maintenant",
          contenu: `
            <p>Python utilise l'<strong>indentation</strong> — les espaces en début de ligne —
            pour structurer les blocs d'instructions. Ce n'est pas une question de goût :
            si l'indentation est incorrecte, le programme ne fonctionne pas.</p>

            <p><em>Exemple incorrect :</em></p>
            <pre class="bloc-code"><code>if nom == "Alice" :
print("Bonjour")</code></pre>
            <p>La ligne n'est pas indentée : il n'y a donc aucun bloc à exécuter dans le cas
            où <code>nom</code> vaut bien <code>Alice</code>.</p>

            <p><em>Exemple correct :</em></p>
            <pre class="bloc-code"><code>if nom == "Alice":
    print("Bonjour")</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">IndentationError</span>
              Une erreur d'indentation produit une <code>IndentationError</code>. Si tu vois
              ce message, vérifie d'abord tes décalages — quatre espaces par niveau.
            </div>

            <p>On y reviendra en détail dès qu'on écrira des conditions. Pour l'instant,
            retiens simplement que <strong>les espaces du début de ligne comptent</strong>.</p>`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Créer une variable",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : variable</span>
              Une <strong>variable</strong> est un <strong>nom</strong> qui désigne une
              <strong>valeur en mémoire</strong>. On peut modifier cette valeur à tout moment
              au cours de l'exécution du programme.
            </div>

            <p>En Python, on crée — on <strong>initialise</strong> — une variable par une
            <strong>affectation</strong> :</p>

            <pre class="bloc-code"><code>age = 17
nom = "Ali"</code></pre>

            <p>On peut se représenter cette affectation par une métaphore : la mémoire de
            l'ordinateur est une gigantesque commode aux innombrables tiroirs.</p>

            <p style="text-align:center">
              <img src="../files/NSI/Python1/affectation.png"
                   alt="Schéma d'affectation mémoire" style="width:55%;border-radius:9px">
            </p>

            <ol>
              <li>quand on affecte la valeur <code>80</code> à la variable <code>pv</code>,
                l'ordinateur trouve d'abord un tiroir vide ;</li>
              <li>il nomme ce tiroir <code>pv</code>, comme s'il lui collait une étiquette ;</li>
              <li>il y dépose la valeur <code>80</code>.</li>
            </ol>

            <p>Désormais — tant qu'on ne lui affecte pas une autre valeur — chaque fois qu'on
            utilisera <code>pv</code>, l'ordinateur utilisera la valeur 80. Si on lui affecte
            une nouvelle valeur, l'ancienne disparaît : on dit qu'elle est
            <strong>écrasée</strong>.</p>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Ta première variable",
          contenu: `
            <p>Crée une variable <code>pv</code> qui vaut <strong>80</strong>, puis affiche-la
            pour obtenir exactement :</p>
            <pre class="bloc-code"><code>Points de vie : 80</code></pre>
            <p>Le nombre affiché doit venir de la variable, pas être retapé dans le texte.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "pv\\s*=\\s*80", message: "Commence par l'affectation : pv = 80" },
              { motif: "print[^\\n]*\\bpv\\b", message: "Le print doit afficher la variable pv, pas le nombre 80." },
            ],
            sortie: "Points de vie : 80",
          },
          felicitation: "Un tiroir nommé, une valeur dedans. 📦",
          indices: [
            "Deux lignes : l'affectation, puis l'affichage.",
            "Dans le <code>print</code>, sépare le texte et la variable par une virgule — et ne mets de guillemets qu'autour du texte.",
          ],
          solution: `pv = 80\nprint("Points de vie :", pv)\n`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Exercice 1 — Anticiper les affectations",
          contenu: `<p>Avant d'exécuter quoi que ce soit, lis ce programme ligne à ligne et
            anticipe ce qu'il affiche.</p>`,
          code: `a = 2\nb = a + 1\na = 5\nc = 3 * a\n\nprint(a, b, c)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>5 6 15</code>",
              explication: "<code>b</code> a été calculé <em>avant</em> que a ne change : il vaut 2 + 1 = 3." },
            { texte: "<code>5 3 15</code>", correct: true,
              explication: "Exactement. <code>b</code> vaut 3 (calculé quand a valait 2), <code>c</code> vaut 15 (calculé quand a valait déjà 5)." },
            { texte: "<code>2 3 6</code>",
              explication: "La ligne <code>a = 5</code> a bien écrasé la valeur de a." },
            { texte: "<code>5 3 6</code>",
              explication: "<code>c</code> est calculé après le changement de a : 3 × 5 = 15." },
          ],
          apres: `<span class="chapo">L'ordre des lignes est essentiel</span>
            Une affectation utilise la valeur des variables <strong>au moment où elle
            s'exécute</strong>. Changer <code>a</code> plus tard ne recalcule pas
            <code>b</code> : ce n'est pas une formule de tableur.`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Exercice 1 (suite) — Une variable qui grandit",
          contenu: `<p>Même exercice avec ce second programme. Attention, la ligne
            <code>a = a + 1</code> n'est pas une équation mathématique.</p>`,
          code: `a = 2\na = a + 1\na = a + 1\na = a + 1\n\nprint(a)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>2</code>", explication: "Les trois lignes suivantes modifient bien a." },
            { texte: "<code>3</code>", explication: "Il y a trois incrémentations, pas une seule." },
            { texte: "<code>5</code>", correct: true,
              explication: "2, puis 3, puis 4, puis 5. À chaque ligne, Python calcule d'abord la droite, puis range le résultat dans a." },
            { texte: "Une erreur : a ne peut pas être égal à a + 1",
              explication: "En mathématiques, non. En Python, <code>=</code> ne signifie pas « est égal à » mais « reçoit »." },
          ],
          apres: `<span class="chapo">Incrémenter</span>
            Ajouter 1 à une variable de façon répétée s'appelle <strong>incrémenter</strong>.
            Il existe une écriture plus courte : <code>a += 1</code> au lieu de
            <code>a = a + 1</code>, <code>a -= 1</code> au lieu de <code>a = a - 1</code>,
            et de même avec <code>*=</code> et <code>/=</code>.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Exercice 3 — Traduire une phrase en code",
          contenu: `
            <p>Il ne s'agit plus d'anticiper des valeurs, mais d'<strong>écrire</strong> le
            code correspondant aux instructions.</p>
            <ol>
              <li>on initialise <code>x</code> à 5, puis <code>y</code> à 3, et on stocke leur
                somme dans <code>somme</code> ;</li>
              <li>on initialise <code>score</code> à 100, puis on l'augmente de 15 ;</li>
              <li>on initialise <code>cellule</code> à 1, puis on la multiplie par 2 ;</li>
              <li>on initialise <code>capital</code> à 1000, puis on lui enlève 5 %.</li>
            </ol>
            <p>Aucun affichage n'est demandé : c'est la validation qui vérifiera le contenu
            de tes variables.</p>`,
          depart: `# 1. x vaut 5, y vaut 3, et somme contient leur somme\nx = \ny = \nsomme = \n\n# 2. score vaut 100, puis on l'augmente de 15\nscore = \n\n\n# 3. cellule vaut 1, puis on la multiplie par 2\ncellule = \n\n\n# 4. capital vaut 1000, puis on lui enlève 5 %\ncapital = \n\n`,
          validation: {
            codeAbsent: [
              { motif: "somme\\s*=\\s*8\\b", message: "somme doit être calculée à partir de x et y, pas écrite en dur." },
              { motif: "score\\s*=\\s*115\\b", message: "score doit être augmenté à partir de sa valeur, pas réécrit." },
            ],
            tests: `assert x == 5, "x doit valoir 5"\nassert y == 3, "y doit valoir 3"\nassert somme == 8, "somme doit valoir 8"\nassert score == 115, "score doit valoir 115 après l'augmentation"\nassert cellule == 2, "cellule doit valoir 2 après la multiplication"\nassert abs(capital - 950) < 0.0001, "capital doit valoir 950 après une baisse de 5 %"`,
          },
          felicitation: "Quatre traductions justes. Tu lis un énoncé et tu écris du code. 📝",
          indices: [
            "Chaque point demande deux lignes : l'initialisation, puis la modification.",
            "« On l'augmente de 15 » se traduit par une affectation qui réutilise la variable elle-même.",
            "Enlever 5 %, c'est garder 95 % — donc multiplier par 0.95.",
          ],
          solution: `# 1.\nx = 5\ny = 3\nsomme = x + y\n\n# 2.\nscore = 100\nscore = score + 15\n\n# 3.\ncellule = 1\ncellule = cellule * 2\n\n# 4.\ncapital = 1000\ncapital = capital * 0.95\n`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Bien nommer ses variables",
          contenu: `
            <p>En développement, une « <strong>casse</strong> » désigne la manière dont on
            écrit les noms des éléments du code. Il en existe plusieurs :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Casse</th><th>Principe</th><th>Exemple</th></tr>
              <tr><td>camelCase 🐪</td><td>majuscule au début de chaque mot sauf le premier</td><td><code>nomDeMaVariable</code></td></tr>
              <tr><td>kebab-case 🥙</td><td>mots séparés par des tirets</td><td><code>nom-de-ma-variable</code></td></tr>
              <tr><td>snake_case 🐍</td><td>tout en minuscules, mots séparés par des tirets bas</td><td><code>nom_de_ma_variable</code></td></tr>
            </table>
            </div>

            <p>En <strong>Python</strong>, la convention est le <strong>snake_case</strong> —
            comme le logo du langage l'indique. Pas de lettres accentuées, pas d'espace, et
            surtout pas de mot-clé du langage.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les 33 mots-clés de Python, à ne jamais utiliser comme nom</span>
              <code>and</code> <code>as</code> <code>assert</code> <code>break</code>
              <code>class</code> <code>continue</code> <code>def</code> <code>del</code>
              <code>elif</code> <code>else</code> <code>except</code> <code>False</code>
              <code>finally</code> <code>for</code> <code>from</code> <code>global</code>
              <code>if</code> <code>import</code> <code>in</code> <code>is</code>
              <code>lambda</code> <code>None</code> <code>not</code> <code>or</code>
              <code>pass</code> <code>raise</code> <code>return</code> <code>True</code>
              <code>try</code> <code>while</code> <code>with</code> <code>yield</code>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un nom se choisit, il ne se tire pas au sort</span>
              Si tu manipules l'âge du capitaine, la variable ne s'appelle pas <code>a</code>
              mais <code>age_capitaine</code>. Un bon nom rend le commentaire inutile.
            </div>`,
        },

        {
          id: "d9",
          type: "qcm",
          titre: "Quel nom est correct ?",
          contenu: `<p>Un seul de ces noms de variable respecte à la fois la syntaxe de
            Python et les conventions du langage.</p>`,
          question: "Lequel choisis-tu ?",
          options: [
            { texte: "<code>2eme_note</code>", explication: "Un nom de variable ne peut pas commencer par un chiffre : Python refuse." },
            { texte: "<code>note du DS</code>", explication: "Les espaces sont interdits : Python y verrait trois mots séparés." },
            { texte: "<code>note_du_ds</code>", correct: true,
              explication: "Minuscules, tirets bas, pas d'accent, pas de mot-clé : du snake_case impeccable." },
            { texte: "<code>class</code>", explication: "<code>class</code> est un mot-clé réservé de Python." },
          ],
          apres: `<span class="chapo">Trois règles suffisent</span>
            Pas de chiffre en première position · pas d'espace ni d'accent ·
            jamais un mot-clé du langage. Le reste — le snake_case — est une convention,
            mais elle se respecte.`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Exercice 4 — Échanger deux variables",
          contenu: `
            <p>Le programme ci-dessous <strong>est censé</strong> échanger les contenus de
            <code>a</code> et <code>b</code>… mais il n'y arrive pas. Corrige-le,
            <strong>sans utiliser d'opération mathématique</strong>.</p>
            <p>⚠️ Ton programme doit fonctionner <strong>quelles que soient</strong> les
            valeurs initiales de <code>a</code> et <code>b</code>.</p>
            <p style="text-align:center">
              <img src="../files/NSI/Python1/echange_verres.png"
                   alt="Deux verres contenant des liquides a et b"
                   style="width:45%;border-radius:9px">
            </p>
            <p>💡 Comment ferais-tu pour échanger réellement le contenu de ces deux verres ?</p>`,
          depart: `a = 1\nb = 2\n\na = b\nb = a\n\nprint("a =", a, "et b =", b)\n`,
          validation: {
            codeAbsent: [
              { motif: "a\\s*=\\s*2\\b", message: "Interdit d'écrire directement les valeurs finales : il faut vraiment échanger." },
              { motif: "[-+*/]", message: "Pas d'opération mathématique dans cet exercice." },
            ],
            tests: `assert a == 2 and b == 1, "après l'échange, a doit valoir 2 et b doit valoir 1"`,
            sortie: "a = 2 et b = 1",
          },
          felicitation: "Le troisième verre : la variable temporaire. 🥛",
          indices: [
            "Avec deux verres pleins, il faut un troisième verre — vide — pour y arriver.",
            "Mets d'abord la valeur de <code>a</code> à l'abri dans une troisième variable, avant qu'elle ne soit écrasée.",
            "Ensuite seulement <code>a</code> peut recevoir <code>b</code>, et <code>b</code> récupérer ce que la troisième variable a conservé.",
          ],
          solution: `a = 1\nb = 2\n\nmemoire = a\na = b\nb = memoire\n\nprint("a =", a, "et b =", b)\n`,
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>On écrit…</th></tr>
              <tr><td>créer une variable</td><td><code>age = 17</code></td></tr>
              <tr><td>la modifier</td><td><code>age = age + 1</code> &nbsp;ou&nbsp; <code>age += 1</code></td></tr>
              <tr><td>l'afficher</td><td><code>print("Âge :", age)</code></td></tr>
              <tr><td>échanger deux variables</td><td>passer par une troisième</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le point qui coince toujours</span>
              <code>=</code> ne veut pas dire « est égal à » mais « <strong>reçoit</strong> ».
              Python calcule d'abord la <strong>droite</strong>, puis range le résultat dans
              la variable de <strong>gauche</strong>. C'est pour cela que
              <code>a = a + 1</code> a un sens.
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
          titre: "Trois noms à corriger",
          contenu: `
            <p>Ce programme ne s'exécute pas : les trois noms de variables sont invalides.
            Renomme-les en snake_case correct — sans changer les valeurs ni l'affichage —
            pour obtenir :</p>
            <pre class="bloc-code"><code>Ali a 17 ans et 15.5 de moyenne</code></pre>`,
          depart: `1er_prenom = "Ali"\nage du capitaine = 17\nclass = 15.5\n\nprint(1er_prenom, "a", age du capitaine, "ans et", class, "de moyenne")\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bclass\\b", message: "class est un mot-clé de Python : choisis un autre nom." },
              { motif: "^\\s*\\d", options: "m", message: "Aucun nom de variable ne peut commencer par un chiffre." },
            ],
            sortie: "Ali a 17 ans et 15.5 de moyenne",
          },
          felicitation: "Trois règles de nommage, trois corrections. ✏️",
          indices: [
            "Un nom ne commence jamais par un chiffre : mets le mot avant.",
            "Les espaces se remplacent par des tirets bas.",
            "Le troisième nom est un mot réservé du langage — trouve un synonyme.",
          ],
          solution: `premier_prenom = "Ali"\nage_du_capitaine = 17\nmoyenne = 15.5\n\nprint(premier_prenom, "a", age_du_capitaine, "ans et", moyenne, "de moyenne")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le compteur de vies",
          contenu: `
            <p>Un personnage démarre avec <strong>100</strong> points de vie. Il subit trois
            dégâts de 15, puis boit une potion qui lui rend 20 points. Affiche exactement :</p>
            <pre class="bloc-code"><code>Points de vie au départ : 100
Points de vie à la fin : 75</code></pre>
            <p>Interdit d'écrire <code>75</code> : chaque événement doit être une modification
            de la variable.</p>`,
          depart: `pv = 100\nprint("Points de vie au départ :", pv)\n\n# Trois dégâts de 15, puis une potion de 20\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b75\\b", message: "Le 75 doit résulter des modifications successives." },
            ],
            codeContient: [
              { motif: "\\bpv\\b[\\s\\S]*\\bpv\\b", message: "Sers-toi de la variable pv déjà définie." },
              { motif: "(pv\\s*=\\s*pv|pv\\s*[-+]=)[\\s\\S]*(pv\\s*=\\s*pv|pv\\s*[-+]=)[\\s\\S]*(pv\\s*=\\s*pv|pv\\s*[-+]=)",
                message: "Il faut au moins trois modifications successives de pv." },
            ],
            sortie: "Points de vie au départ : 100\nPoints de vie à la fin : 75",
          },
          indices: [
            "Chaque dégât est une ligne du type <code>pv = pv - …</code>, ou sa version courte avec <code>-=</code>.",
            "La potion se traduit de la même façon, avec une addition.",
          ],
          solution: `pv = 100\nprint("Points de vie au départ :", pv)\n\npv = pv - 15\npv = pv - 15\npv = pv - 15\npv = pv + 20\n\nprint("Points de vie à la fin :", pv)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Traduire, encore",
          contenu: `
            <p>Même travail qu'à l'étape « Exercice 3 — Traduire une phrase en code »,
            dans la découverte, avec d'autres consignes :</p>
            <ol>
              <li><code>romans</code> vaut 48, puis on le divise par 2 (résultat entier) ;</li>
              <li><code>bd</code> vaut 20, puis on lui ajoute 3 ;</li>
              <li><code>total</code> reçoit la somme de <code>romans</code> et de
                <code>bd</code> ;</li>
              <li><code>abonnes</code> vaut 5000, puis on l'augmente de 10 %.</li>
            </ol>`,
          depart: `# 1. romans vaut 48, puis on le divise par 2\nromans = \n\n\n# 2. bd vaut 20, puis on lui ajoute 3\nbd = \n\n\n# 3. total contient la somme des deux\ntotal = \n\n# 4. abonnes vaut 5000, puis on l'augmente de 10 %\nabonnes = \n\n`,
          validation: {
            codeAbsent: [
              { motif: "bd\\s*=\\s*23\\b", message: "bd doit être augmenté à partir de sa valeur." },
              { motif: "total\\s*=\\s*47\\b", message: "total doit être calculé à partir de romans et bd, pas écrit en dur." },
              { motif: "abonnes\\s*=\\s*5500", message: "abonnes doit être calculé à partir de sa valeur." },
            ],
            tests: `assert romans == 24, "romans doit valoir 24 après la division"\nassert bd == 23, "bd doit valoir 23 après l'ajout"\nassert total == 47, "total doit valoir 24 + 23 = 47"\nassert abs(abonnes - 5500) < 0.0001, "abonnes doit valoir 5500 après +10 %"`,
          },
          indices: [
            "« Résultat entier » : la division entière s'écrit avec deux barres obliques.",
            "La ligne du total ne recalcule rien : elle réutilise les deux variables déjà obtenues.",
            "Augmenter de 10 %, c'est multiplier par 1.1.",
          ],
          solution: `romans = 48\nromans = romans // 2\n\nbd = 20\nbd = bd + 3\n\ntotal = romans + bd\n\nabonnes = 5000\nabonnes = abonnes * 1.1\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Anticiper puis vérifier",
          contenu: `
            <p>Écris un programme qui produit exactement cet affichage, en n'utilisant
            que <strong>deux</strong> variables <code>a</code> et <code>b</code> :</p>
            <pre class="bloc-code"><code>1 2
3 2
3 5</code></pre>
            <p>Trois lignes d'affichage, séparées par des modifications de variables.</p>`,
          depart: `a = 1\nb = 2\nprint(a, b)\n\n`,
          validation: {
            codeContient: [
              { motif: "print[\\s\\S]*print[\\s\\S]*print", message: "Trois affichages sont attendus." },
            ],
            sortie: "1 2\n3 2\n3 5",
          },
          indices: [
            "Entre le premier et le deuxième affichage, seule <code>a</code> change.",
            "Entre le deuxième et le troisième, seule <code>b</code> change.",
          ],
          solution: `a = 1\nb = 2\nprint(a, b)\n\na = 3\nprint(a, b)\n\nb = 5\nprint(a, b)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La rotation à trois",
          contenu: `
            <p>Trois variables, et une rotation : <code>a</code> doit prendre la valeur de
            <code>b</code>, <code>b</code> celle de <code>c</code>, et <code>c</code> celle de
            <code>a</code>. Affiche exactement :</p>
            <pre class="bloc-code"><code>a = 2 b = 3 c = 1</code></pre>
            <p>Comme pour l'échange, aucune opération mathématique n'est autorisée.</p>`,
          depart: `a = 1\nb = 2\nc = 3\n\n`,
          validation: {
            codeAbsent: [
              { motif: "[-+*/]", message: "Pas d'opération mathématique : uniquement des affectations." },
              { motif: "a\\s*=\\s*2\\b", message: "Interdit d'écrire les valeurs finales : il faut faire tourner les contenus." },
            ],
            sortie: "a = 2 b = 3 c = 1",
          },
          felicitation: "Une rotation propre. Le principe du verre vide vaut aussi à trois. 🔄",
          indices: [
            "Une seule valeur risque d'être écrasée en premier : mets-la de côté.",
            "Ensuite, décale les autres dans le bon ordre avant de rendre la valeur mise de côté.",
          ],
          solution: `a = 1\nb = 2\nc = 3\n\nmemoire = a\na = b\nb = c\nc = memoire\n\nprint("a =", a, "b =", b, "c =", c)\n`,
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
          titre: "L'échange sans variable temporaire",
          contenu: `
            <p>Python sait échanger deux variables <strong>en une seule ligne</strong>, sans
            variable de côté. Cherche : la syntaxe s'écrit avec deux noms à gauche du
            <code>=</code>, séparés par une virgule, et deux valeurs à droite.</p>
            <pre class="bloc-code"><code>a = 2 et b = 1</code></pre>`,
          depart: `a = 1\nb = 2\n\n# Une seule ligne pour échanger\n\nprint("a =", a, "et b =", b)\n`,
          validation: {
            codeContient: [
              { motif: "a\\s*,\\s*b\\s*=\\s*b\\s*,\\s*a|b\\s*,\\s*a\\s*=\\s*a\\s*,\\s*b",
                message: "L'échange doit tenir en une ligne, de la forme a, b = b, a" },
            ],
            sortie: "a = 2 et b = 1",
          },
          felicitation: "L'affectation multiple : élégante, et propre à Python. ✨",
          indices: [
            "La forme est <code>a, b = …, …</code>",
            "Python évalue <strong>toute la droite</strong> avant d'affecter quoi que ce soit : c'est ce qui rend l'échange possible sans troisième variable.",
          ],
          solution: `a = 1\nb = 2\n\na, b = b, a\n\nprint("a =", a, "et b =", b)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "L'échange par l'arithmétique",
          contenu: `
            <p>Un classique des entretiens d'embauche : échanger deux nombres
            <strong>sans variable temporaire</strong> et <strong>sans affectation
            multiple</strong> — uniquement avec des additions et des soustractions.</p>
            <pre class="bloc-code"><code>a = 7 et b = 3</code></pre>
            <p>💡 Si tu ranges la somme des deux dans l'un, tu peux retrouver l'autre par
            soustraction.</p>`,
          depart: `a = 3\nb = 7\n\n# Trois lignes, uniquement des + et des -\n\nprint("a =", a, "et b =", b)\n`,
          validation: {
            codeAbsent: [
              { motif: ",\\s*b\\s*=", message: "L'affectation multiple est interdite dans ce défi." },
              { motif: "a\\s*=\\s*7\\b", message: "Interdit d'écrire les valeurs finales." },
            ],
            codeContient: [
              { motif: "[-+]", message: "Ce défi se résout avec des additions et des soustractions." },
            ],
            sortie: "a = 7 et b = 3",
          },
          felicitation: "Trois lignes, aucune variable de plus. 🧮",
          indices: [
            "Première ligne : range dans <code>a</code> la somme des deux valeurs.",
            "Alors <code>a - b</code> vaut l'ancienne valeur de <code>a</code> : c'est ce que <code>b</code> doit recevoir.",
            "Enfin, <code>a</code> reprend ce qui reste après avoir retiré le nouveau <code>b</code>.",
          ],
          solution: `a = 3\nb = 7\n\na = a + b\nb = a - b\na = a - b\n\nprint("a =", a, "et b =", b)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre compteur",
          contenu: `
            <p>Défi libre. Écris un programme qui simule une petite évolution : un score,
            un budget, un stock, une population, un niveau de batterie…</p>
            <p>Il doit contenir <strong>au moins trois variables</strong>, dont une modifiée
            <strong>au moins deux fois</strong> à partir d'elle-même, et afficher
            <strong>au moins trois lignes</strong>.</p>`,
          depart: `# Ton programme\n`,
          validation: {
            codeContient: [
              { motif: "^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=", options: "m",
                message: "Ton programme doit créer au moins trois variables." },
              { motif: "(\\w+)\\s*=\\s*\\1\\b|\\w+\\s*[-+*/]=", message: "Une variable au moins doit être modifiée à partir d'elle-même." },
            ],
            sortieRegex: "^[^\\n]+\\n[^\\n]+\\n[^\\n]+",
            sortieRegexMessage: "Ton programme doit afficher au moins trois lignes.",
          },
          felicitation: "Séance 1 terminée. Tes programmes ont de la mémoire. 🏁",
          indices: [
            "Affiche l'état de départ, puis l'état après chaque changement : cela rend l'évolution lisible.",
            "Pense à donner à tes variables des noms qui disent ce qu'elles contiennent.",
          ],
          solution: `budget = 500\ncourses = 120\nloyer = 300\n\nprint("Budget de départ :", budget)\n\nbudget = budget - courses\nprint("Après les courses :", budget)\n\nbudget = budget - loyer\nprint("Après le loyer :", budget)\n`,
        },
      ],
    },
  ],
};

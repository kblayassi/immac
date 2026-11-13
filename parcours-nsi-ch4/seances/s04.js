/* NSI — chapitre 4, séance 4 : les listes en compréhension.
 * Reprend la section « Listes en compréhension » du cours, ainsi que les
 * exercices 5 (questions 2 et 3) et 6.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "Les listes en compréhension",
  sousTitre: "Construire, transformer et filtrer une liste en une ligne",
  palier: "Partie 1 — Les listes",

  accroche: `Une liste vide, une boucle, un <code>append()</code> à chaque tour : tu sais
    construire une liste. Python propose un raccourci qui dit la même chose en une
    seule ligne, et qui se lit presque comme une phrase : la
    <strong>liste en compréhension</strong>.`,

  objectifs: [
    "construire une liste en compréhension : <code>[expression for x in sequence]</code>",
    "transformer chaque élément d'une liste",
    "filtrer une liste avec une condition : <code>[x for x in L if …]</code>",
    "passer d'une boucle avec <code>append()</code> à une compréhension, et inversement",
  ],

  motDeLaFin: `La partie sur les listes est terminée : créer, lire, modifier, parcourir
    et construire en une ligne. Fais le bilan de la partie avant d'attaquer les
    matrices, qui sont… des listes de listes.`,

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
          titre: "Une liste décrite en une ligne",
          contenu: `
            <p>Pour fabriquer la liste des doubles de <code>L</code>, tu sais déjà
            procéder par ajouts successifs :</p>

            <pre class="bloc-code"><code>L = [1, 2, 3]
M = []
for x in L:
    M.append(x * 2)          # M vaut [2, 4, 6]</code></pre>

            <p>Une <strong>liste en compréhension</strong> dit la même chose en une seule
            ligne, en décrivant le contenu de la liste directement entre crochets :</p>

            <pre class="bloc-code"><code>M = [x * 2 for x in L]       # M vaut [2, 4, 6]</code></pre>

            <div class="encadre">
              <span class="chapo">Syntaxe : liste en compréhension</span>
              <code>[expression for variable in sequence]</code> se lit « la liste des
              <em>expression</em>, pour <em>variable</em> dans <em>sequence</em> ». Ici :
              « la liste des <code>x * 2</code>, pour <code>x</code> dans <code>L</code> ».
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Les triples",
          contenu: `
            <p>Construis <strong>en compréhension</strong> la liste <code>M</code> des
            triples des éléments de <code>L</code> :</p>
            <pre class="bloc-code"><code>[3, 6, 9, 12]</code></pre>`,
          depart: `L = [1, 2, 3, 4]\nM = \n\nprint(M)\n`,
          validation: {
            codeContient: [
              { motif: "M\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+L\\b", message: "M doit être construite en compréhension : [… for x in L]." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() ici : toute la construction tient entre les crochets." },
            ],
            sortie: "[3, 6, 9, 12]",
          },
          felicitation: "Une ligne, une liste entière. ⚡",
          indices: [
            "Entre les crochets, d'abord ce que contient chaque case, puis la boucle qui parcourt <code>L</code>.",
            "Chaque case contient l'élément <code>x</code> multiplié par 3.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Lire une compréhension",
          contenu: `<p>Lis cette ligne comme une phrase, sans l'exécuter.</p>`,
          code: `print([x + 1 for x in [5, 0, 2]])`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "<code>[5, 0, 2]</code>",
              explication: "L'expression <code>x + 1</code> transforme chaque élément : la liste obtenue n'est pas la même." },
            { texte: "<code>[6, 1, 3]</code>", correct: true,
              explication: "Oui : la liste des <code>x + 1</code>, pour <code>x</code> valant 5, puis 0, puis 2." },
            { texte: "<code>8</code>",
              explication: "Une compréhension fabrique une <strong>liste</strong>, pas une somme." },
            { texte: "<code>[6]</code>",
              explication: "Il y a un élément produit par tour de boucle, donc trois ici." },
          ],
          apres: `<span class="chapo">Autant de cases que de tours</span>
            Sans condition, une compréhension produit exactement un élément par élément
            parcouru : la nouvelle liste a la même longueur que celle de départ.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Les carrés de 0 à 10",
          contenu: `
            <p>Une compréhension peut parcourir n'importe quelle séquence, et en
            particulier un <code>range</code>.</p>
            <p>Construis en compréhension la liste <code>carres</code> des carrés des
            entiers de 0 à 10 :</p>
            <pre class="bloc-code"><code>[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]</code></pre>`,
          depart: `carres = \n\nprint(carres)\n`,
          validation: {
            codeContient: [
              { motif: "carres\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(", message: "carres doit être construite en compréhension, en parcourant un range." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() ici : toute la construction tient entre les crochets." },
              { motif: "\\[\\s*0\\s*,\\s*1\\s*,", message: "Ne recopie pas les valeurs : la compréhension doit les calculer." },
            ],
            sortie: "[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]",
          },
          felicitation: "Onze carrés calculés, aucun recopié. 🟦",
          indices: [
            "La variable parcourt les entiers de 0 à 10 : attention, la borne de fin d'un <code>range</code> est exclue.",
            "L'expression de chaque case est le carré de la variable : <code>i * i</code> ou <code>i ** 2</code>.",
          ],
        },

        {
          id: "d5",
          type: "code",
          titre: "Un message pour chacun",
          contenu: `
            <p>L'expression d'une compréhension peut produire autre chose que des
            nombres.</p>
            <p>Construis en compréhension la liste <code>messages</code>, qui contient un
            message de bienvenue pour chaque prénom :</p>
            <pre class="bloc-code"><code>['Bonjour Léa', 'Bonjour Tom', 'Bonjour Inès']</code></pre>`,
          depart: `prenoms = ["Léa", "Tom", "Inès"]\nmessages = \n\nprint(messages)\n`,
          validation: {
            codeContient: [
              { motif: "messages\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+prenoms\\b", message: "messages doit être construite en compréhension, en parcourant prenoms." },
            ],
            codeAbsent: [
              { motif: "\\bLea\\b[\\s\\S]*\\bLea\\b", message: "N'écris pas les prénoms à la main : la compréhension les lit dans la liste." },
            ],
            sortie: "['Bonjour Léa', 'Bonjour Tom', 'Bonjour Inès']",
          },
          felicitation: "Des chaînes fabriquées en série. 💬",
          indices: [
            "Chaque case est une chaîne : le texte <code>\"Bonjour \"</code> assemblé avec un prénom.",
            "Assemble-les avec <code>+</code> ou avec une f-string, puis la boucle qui parcourt <code>prenoms</code>.",
          ],
        },

        {
          id: "d6",
          type: "cours",
          titre: "Filtrer avec une condition",
          contenu: `
            <p>On peut ajouter une <strong>condition</strong> à la fin de la compréhension :
            seuls les éléments qui la vérifient sont gardés.</p>

            <pre class="bloc-code"><code>L = [3, -1, 4, -5]

# par ajouts successifs
M = []
for x in L:
    if x > 0:
        M.append(x)

# en compréhension
M = [x for x in L if x > 0]      # M vaut [3, 4]</code></pre>

            <div class="encadre">
              <span class="chapo">Syntaxe : compréhension avec filtre</span>
              <code>[expression for variable in sequence if condition]</code> se lit « la
              liste des <em>expression</em>, pour <em>variable</em> dans <em>sequence</em>,
              <strong>si</strong> <em>condition</em> ». La nouvelle liste peut alors être
              plus courte que celle de départ.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Les reçus",
          contenu: `
            <p>Construis en compréhension la liste <code>recus</code> des notes
            <strong>supérieures ou égales à 10</strong> :</p>
            <pre class="bloc-code"><code>[12, 15, 18, 11]</code></pre>`,
          depart: `notes = [12, 7, 15, 9, 18, 11]\nrecus = \n\nprint(recus)\n`,
          validation: {
            codeContient: [
              { motif: "recus\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+notes\\b[^\\]]*\\bif\\b", message: "recus doit être construite en compréhension, avec un if à la fin." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() ici : toute la construction tient entre les crochets." },
            ],
            sortie: "[12, 15, 18, 11]",
          },
          felicitation: "Un filtre en bout de ligne, et seules les bonnes notes passent. ✅",
          indices: [
            "Ici, on garde les notes telles quelles : l'expression est simplement la variable de boucle.",
            "La condition se place à la fin, après la boucle : <code>if</code> suivi d'une comparaison avec 10.",
          ],
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Transformer et filtrer",
          contenu: `<p>Cette compréhension transforme <strong>et</strong> filtre. Lis-la
            sans l'exécuter.</p>`,
          code: `print([x * 10 for x in [3, 8, 1, 6] if x > 2])`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "<code>[30, 80, 10, 60]</code>",
              explication: "Le 1 ne vérifie pas la condition <code>x > 2</code> : il est écarté." },
            { texte: "<code>[30, 80, 60]</code>", correct: true,
              explication: "Oui : 3, 8 et 6 vérifient <code>x > 2</code> et sont multipliés par 10 ; le 1 est écarté." },
            { texte: "<code>[3, 8, 6]</code>",
              explication: "Les éléments gardés passent ensuite par l'expression <code>x * 10</code>." },
            { texte: "<code>[80, 60]</code>",
              explication: "La condition porte sur <code>x</code>, pas sur <code>x * 10</code> : 3 est bien plus grand que 2." },
          ],
          apres: `<span class="chapo">D'abord le filtre, puis l'expression</span>
            La condition est testée sur l'élément d'origine ; seuls ceux qui la vérifient
            sont transformés par l'expression et rangés dans la nouvelle liste.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Les journées chaudes, en Fahrenheit",
          contenu: `
            <p>Pour convertir une température de degrés Celsius en degrés Fahrenheit, on
            calcule <code>c * 9 / 5 + 32</code>.</p>
            <p>Construis en compréhension la liste <code>chaudes</code> : les températures
            <strong>supérieures ou égales à 20 °C</strong>, converties en Fahrenheit.</p>
            <pre class="bloc-code"><code>[77.0, 86.0]</code></pre>`,
          depart: `celsius = [12, -3, 25, 30, 8]\nchaudes = \n\nprint(chaudes)\n`,
          validation: {
            codeContient: [
              { motif: "chaudes\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+celsius\\b[^\\]]*\\bif\\b", message: "chaudes doit être construite en compréhension sur celsius, avec un if à la fin." },
            ],
            codeAbsent: [
              { motif: "\\b77\\b|\\b86\\b", message: "Les conversions doivent être calculées par Python." },
            ],
            sortie: "[77.0, 86.0]",
          },
          felicitation: "Filtrer puis convertir, dans une seule ligne. 🌡️",
          indices: [
            "L'expression de chaque case est la formule de conversion, appliquée à la variable de boucle.",
            "La condition, à la fin, compare la température <strong>en Celsius</strong> à 20.",
          ],
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>L = [1, 2, 3, 4, 5, 6]

[x * 2 for x in L]               # [2, 4, 6, 8, 10, 12]   transformer
[x for x in L if x > 3]          # [4, 5, 6]              filtrer
[x * 2 for x in L if x > 3]      # [8, 10, 12]            les deux
[i * i for i in range(4)]        # [0, 1, 4, 9]           sur un range</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Par ajouts successifs</th><th>En compréhension</th></tr>
              <tr><td><code>M = []</code><br><code>for x in L:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;M.append(x * 2)</code></td><td><code>M = [x * 2 for x in L]</code></td></tr>
              <tr><td><code>M = []</code><br><code>for x in L:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if x > 3:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M.append(x)</code></td><td><code>M = [x for x in L if x > 3]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Lisibilité d'abord</span>
              Une compréhension trop longue devient illisible. Dès qu'elle ne tient plus
              confortablement sur une ligne, ou qu'il faut plusieurs conditions, préfère une
              boucle <code>for</code> : elle fait exactement le même travail.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>inverser la boucle : <code>for L in x</code> au lieu de <code>for x in L</code> ;</li>
                <li>placer le <code>if</code> avant le <code>for</code> : la condition se met <strong>à la fin</strong> ;</li>
                <li>oublier le crochet fermant : <code>SyntaxError</code>.</li>
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
          type: "prediction",
          titre: "Deux compréhensions",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `L = [1, -2, 3, -4]\nM = [x * 2 for x in L]\nN = [x for x in L if x > 0]`,
          question: "Que valent M et N ?",
          options: [
            { texte: "<code>M = [2, -4, 6, -8]</code> et <code>N = [1, 3]</code>", correct: true,
              explication: "Oui : <code>M</code> double chaque élément et garde donc la même longueur ; <code>N</code> ne garde que les éléments strictement positifs." },
            { texte: "<code>M = [2, 4, 6, 8]</code> et <code>N = [1, 3]</code>",
              explication: "Doubler un nombre négatif donne un nombre négatif : −2 × 2 = −4." },
            { texte: "<code>M = [2, -4, 6, -8]</code> et <code>N = [1, -2, 3, -4]</code>",
              explication: "La condition <code>x > 0</code> écarte les nombres négatifs : <code>N</code> est plus courte." },
            { texte: "<code>M = [2, 6]</code> et <code>N = [1, 3]</code>",
              explication: "<code>M</code> n'a pas de condition : tous les éléments sont doublés, y compris les négatifs." },
          ],
          apres: `<span class="chapo">Transformer garde la longueur, filtrer la réduit</span>
            Sans <code>if</code>, la nouvelle liste a autant d'éléments que l'ancienne. Avec
            un <code>if</code>, elle peut en avoir moins — jamais plus.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Les cubes",
          contenu: `
            <p>Construis en compréhension la liste <code>cubes</code> des cubes des entiers
            de 1 à 5 :</p>
            <pre class="bloc-code"><code>[1, 8, 27, 64, 125]</code></pre>`,
          depart: `cubes = \n\nprint(cubes)\n`,
          validation: {
            codeContient: [
              { motif: "cubes\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(", message: "cubes doit être construite en compréhension, en parcourant un range." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() ici : toute la construction tient entre les crochets." },
              { motif: "\\b125\\b", message: "Ne recopie pas les valeurs : la compréhension doit les calculer." },
            ],
            sortie: "[1, 8, 27, 64, 125]",
          },
          felicitation: "Les cubes de 1 à 5, sans en calculer un seul de tête. 🧊",
          indices: [
            "Cette fois, les entiers vont de 1 à 5 : le <code>range</code> a besoin d'une borne de début et d'une borne de fin.",
            "Le cube de <code>i</code> s'écrit <code>i ** 3</code>.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Filtrer avec une boucle",
          contenu: `
            <p>Écris la fonction <code>pairs(tableau)</code>, qui renvoie une
            <strong>nouvelle</strong> liste contenant les éléments pairs de
            <code>tableau</code>, avec une <strong>boucle et <code>append()</code></strong>.</p>
            <pre class="bloc-code"><code>pairs([1, 2, 3, 4, 5, 6])    # renvoie [2, 4, 6]</code></pre>
            <p>Un nombre est pair lorsque le reste de sa division par 2 est nul :
            <code>element % 2 == 0</code>. Le tableau reçu ne doit pas être modifié.</p>`,
          depart: `def pairs(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.\\s*append\\s*\\(", message: "Remplis la nouvelle liste avec append()." },
              { motif: "%\\s*2", message: "Teste la parité avec le reste de la division par 2." },
            ],
            codeAbsent: [
              { motif: "\\[[^\\]\\n]*\\bfor\\b", message: "Ici, on veut la version avec une boucle : la compréhension, c'est pour l'étape suivante." },
            ],
            tests: `assert pairs([1, 2, 3, 4, 5, 6]) == [2, 4, 6], "pairs([1, 2, 3, 4, 5, 6]) doit renvoyer [2, 4, 6]"\nassert pairs([1, 3, 5]) == [], "s'il n'y a aucun nombre pair, la liste renvoyée est vide"\nassert pairs([0, -2, 7]) == [0, -2], "0 et -2 sont pairs"\n_t = [4, 7, 8]\n_r = pairs(_t)\nassert _t == [4, 7, 8], "le tableau reçu ne doit pas être modifié"`,
          },
          felicitation: "Une liste vide, un test, un append() : le filtre à l'ancienne. 🔍",
          indices: [
            "L'accumulateur est une liste : préparée vide avant la boucle, renvoyée après.",
            "Dans la boucle, un <code>if</code> sur la parité de l'élément ; dans le <code>if</code>, l'ajout.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Filtrer en une ligne",
          contenu: `
            <p>Écris maintenant <code>pairs_comprehension(tableau)</code>, qui fait
            exactement la même chose que <code>pairs</code>, mais <strong>en une seule
            ligne</strong> : un <code>return</code> suivi d'une compréhension.</p>
            <pre class="bloc-code"><code>pairs_comprehension([1, 2, 3, 4, 5, 6])    # renvoie [2, 4, 6]</code></pre>`,
          depart: `def pairs_comprehension(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "return\\s*\\[[^\\n]*\\bfor\\b[^\\n]*\\bif\\b", message: "Une seule ligne : return suivi d'une compréhension avec un if." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() : toute la construction tient entre les crochets." },
            ],
            tests: `assert pairs_comprehension([1, 2, 3, 4, 5, 6]) == [2, 4, 6], "pairs_comprehension([1, 2, 3, 4, 5, 6]) doit renvoyer [2, 4, 6]"\nassert pairs_comprehension([1, 3, 5]) == [], "s'il n'y a aucun nombre pair, la liste renvoyée est vide"\nassert pairs_comprehension([0, -2, 7]) == [0, -2], "0 et -2 sont pairs"`,
          },
          felicitation: "Cinq lignes devenues une seule, pour le même résultat. ⚡",
          indices: [
            "Reprends les morceaux de <code>pairs</code> : la boucle et la condition passent entre les crochets.",
            "L'expression est l'élément lui-même ; la condition de parité se place à la fin.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : bonus et reçus",
          contenu: `
            <p>Ce programme devrait ajouter un point de bonus à chaque note, puis lister
            les notes <strong>d'au moins 10</strong> :</p>
            <pre class="bloc-code"><code>Avec bonus : [9, 15, 11, 18, 10]
Reçus : [14, 10, 17]</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Exécute-le, lis les messages,
            et corrige-les une par une.</p>`,
          depart: `notes = [8, 14, 10, 17, 9]\nbonus = [n + 1 for notes in n]\nrecus = [n for n in notes if n > 10\nprint("Avec bonus :", bonus)\nprint("Reçus :", recus)\n`,
          validation: {
            codeContient: [
              { motif: "bonus\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+notes\\b", message: "bonus doit parcourir la liste notes : for … in notes." },
              { motif: "recus\\s*=\\s*\\[[^\\]]*\\bif\\b[^\\]]*\\]", message: "recus doit rester une compréhension avec un if, bien fermée." },
            ],
            sortie: "Avec bonus : [9, 15, 11, 18, 10]\nReçus : [14, 10, 17]",
          },
          felicitation: "Un crochet, une boucle inversée, une comparaison trop stricte : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : une compréhension n'est pas refermée.",
            "Ensuite, une <code>NameError</code> : dans la compréhension de <code>bonus</code>, la variable de boucle et la liste sont inversées.",
            "Enfin, le 10 manque parmi les reçus : « au moins 10 », c'est 10 compris.",
          ],
        },

        {
          id: "a6",
          type: "code",
          titre: "Les multiples de 7",
          contenu: `
            <p>Construis en compréhension la liste <code>multiples</code> des entiers
            <strong>de 1 à 100</strong> qui sont des multiples de 7. Utilise une
            <strong>condition</strong> : on veut garder les entiers dont le reste dans la
            division par 7 est nul.</p>
            <pre class="bloc-code"><code>[7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98]</code></pre>`,
          depart: `multiples = \n\nprint(multiples)\n`,
          validation: {
            codeContient: [
              { motif: "multiples\\s*=\\s*\\[[^\\]]*\\bfor\\s+\\w+\\s+in\\s+range\\s*\\([^\\]]*\\bif\\b[^\\]]*%\\s*7", message: "Parcours un range et filtre avec une condition sur le reste de la division par 7." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*append\\s*\\(", message: "Pas d'append() : toute la construction tient entre les crochets." },
              { motif: "\\b98\\b", message: "Ne recopie pas les valeurs : la compréhension doit les trouver." },
            ],
            sortie: "[7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98]",
          },
          felicitation: "Cent entiers passés au crible, quatorze retenus. 🎯",
          indices: [
            "Le <code>range</code> doit produire les entiers de 1 à 100 : attention à la borne de fin, exclue.",
            "Le filtre garde <code>i</code> quand le reste de sa division par 7 vaut 0.",
          ],
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 20,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Les diviseurs",
          contenu: `
            <p>Écris la fonction <code>diviseurs(n)</code>, qui renvoie la liste des
            diviseurs de l'entier <code>n</code> (supposé au moins égal à 1), en
            <strong>une seule ligne</strong> : un <code>return</code> suivi d'une
            compréhension.</p>
            <pre class="bloc-code"><code>diviseurs(12)    # renvoie [1, 2, 3, 4, 6, 12]
diviseurs(7)     # renvoie [1, 7]</code></pre>`,
          depart: `def diviseurs(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "return\\s*\\[[^\\n]*\\bfor\\b[^\\n]*\\bif\\b", message: "Une seule ligne : return suivi d'une compréhension avec un if." },
            ],
            tests: `assert diviseurs(12) == [1, 2, 3, 4, 6, 12], "diviseurs(12) doit renvoyer [1, 2, 3, 4, 6, 12]"\nassert diviseurs(7) == [1, 7], "7 n'a que deux diviseurs : 1 et lui-même"\nassert diviseurs(1) == [1], "le seul diviseur de 1 est 1"\nassert diviseurs(36) == [1, 2, 3, 4, 6, 9, 12, 18, 36], "diviseurs(36) doit renvoyer ses neuf diviseurs"`,
          },
          felicitation: "Tous les diviseurs d'un nombre, en une ligne. ➗",
          indices: [
            "Un diviseur de <code>n</code> est un entier <code>d</code> entre 1 et <code>n</code> tel que <code>n</code> divisé par <code>d</code> tombe juste.",
            "Parcours les entiers de 1 à <code>n</code> compris, et garde <code>d</code> quand le reste de la division de <code>n</code> par <code>d</code> est nul.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Les nombres premiers",
          contenu: `
            <p>Un nombre est <strong>premier</strong> lorsqu'il a exactement
            <strong>deux</strong> diviseurs : 1 et lui-même. Ainsi 7 est premier, mais pas
            12, ni 1.</p>
            <p>La fonction <code>diviseurs</code> est déjà écrite. Écris la fonction
            <code>premiers(n)</code>, qui renvoie la liste des nombres premiers compris
            entre 1 et <code>n</code>, en t'appuyant sur <code>diviseurs</code>.</p>
            <pre class="bloc-code"><code>premiers(20)    # renvoie [2, 3, 5, 7, 11, 13, 17, 19]</code></pre>`,
          depart: `def diviseurs(n):\n    return [d for d in range(1, n + 1) if n % d == 0]\n\n\ndef premiers(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+premiers[\\s\\S]*\\bdiviseurs\\s*\\(", message: "premiers doit appeler la fonction diviseurs." },
              { motif: "\\blen\\s*\\(", message: "Un nombre premier a exactement deux diviseurs : compte-les avec len()." },
            ],
            tests: `assert premiers(20) == [2, 3, 5, 7, 11, 13, 17, 19], "premiers(20) doit renvoyer [2, 3, 5, 7, 11, 13, 17, 19]"\nassert premiers(2) == [2], "2 est le plus petit nombre premier"\nassert premiers(30)[-1] == 29, "29 est le plus grand nombre premier inférieur à 30"\nassert len(premiers(100)) == 25, "il y a 25 nombres premiers entre 1 et 100"`,
          },
          felicitation: "Une compréhension qui appelle une fonction qui contient une compréhension. 🔢",
          indices: [
            "Parcours les entiers de 1 à <code>n</code> compris, et garde ceux qui ont exactement deux diviseurs.",
            "La condition compare à 2 la longueur de la liste renvoyée par <code>diviseurs</code>.",
          ],
          apres: `<span class="chapo">Et le 1 ?</span>
            1 n'a qu'un seul diviseur : lui-même. Il n'est donc pas premier, et ta condition
            l'écarte d'elle-même, sans cas particulier à écrire.`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre filtre",
          contenu: `
            <p>À toi de choisir le sujet : des prix, des âges, des scores, des
            températures… Écris un programme qui :</p>
            <ul>
              <li>crée une liste d'<strong>au moins cinq</strong> nombres ;</li>
              <li>construit, <strong>en compréhension avec une condition</strong>, une
              nouvelle liste à partir de la première ;</li>
              <li>affiche les deux listes, avec des phrases de ton choix.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\[[^\\]\\n]*\\bfor\\s+\\w+\\s+in\\b[^\\]\\n]*\\bif\\b", message: "Construis ta nouvelle liste en compréhension, avec un if à la fin." },
              { motif: "\\bprint\\s*\\([\\s\\S]*\\bprint\\s*\\(", message: "Affiche les deux listes." },
            ],
            sortieNonVide: true,
            tests: `_listes = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_")]\nassert any(len(v) >= 5 for v in _listes), "Ta liste de départ doit contenir au moins cinq nombres."`,
          },
          felicitation: "Ta liste, ton filtre, en une ligne. ✨",
          indices: [
            "Commence par ta liste de nombres, puis une deuxième variable qui reçoit une compréhension.",
            "Dans la compréhension, choisis une condition qui a du sens pour ton sujet : les prix sous 20 euros, les âges d'au moins 18 ans…",
          ],
        },
      ],
    },
  ],
};

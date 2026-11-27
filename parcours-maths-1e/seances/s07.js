/* Maths Première — séance 7 : parcourir une liste.
 * Reprend la séance 3 du parcours NSI chapitre 4, en plus accessible : parcours
 * par élément, accumulateur et compteur, parcours par indice, maximum.
 * Fil rouge maths : moyenne d'une série, tableau de valeurs (listes X et Y),
 * racines lues dans un tableau de valeurs, écarts entre termes d'une suite.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "Parcourir une liste",
  sousTitre: "Passer en revue chaque élément, un par un",
  palier: "Partie 2 — Les listes",

  accroche: `Calculer une moyenne, compter les notes au-dessus de 10, construire un tableau
    de valeurs, repérer où une fonction s'annule : à chaque fois, il faut
    <strong>passer en revue</strong> tous les éléments d'une liste, un par un. C'est ce
    qu'on appelle un <strong>parcours</strong>, et la boucle <code>for</code> le fait très
    simplement.`,

  objectifs: [
    "parcourir une liste <strong>élément par élément</strong> avec <code>for x in L</code>",
    "accumuler une somme ou compter des éléments pendant le parcours",
    "parcourir une liste <strong>par indice</strong> avec <code>range(len(L))</code>",
    "construire une nouvelle liste à partir d'une autre",
  ],

  motDeLaFin: `Tu sais parcourir une liste pour calculer, compter, chercher, ou en construire
    une autre. À la séance 8, la dernière avant le défi, tu découvres une écriture très
    compacte pour construire une liste en <strong>une seule ligne</strong> : la liste en
    compréhension.`,

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
          titre: "Parcourir une liste élément par élément",
          contenu: `
            <p>La boucle <code>for</code> sait parcourir directement une liste : à
            chaque tour, la variable de boucle prend la valeur de l'élément suivant.</p>

            <pre class="bloc-code"><code>jours = ["lundi", "mardi", "mercredi"]
for jour in jours:
    print("Aujourd'hui :", jour)</code></pre>

            <p>Ce programme affiche trois lignes : <code>Aujourd'hui : lundi</code>, puis
            <code>Aujourd'hui : mardi</code>, puis <code>Aujourd'hui : mercredi</code>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le nom de la variable</span>
              Tu choisis le nom de la variable de boucle. Un nom au singulier, qui dit ce
              qu'elle contient, rend le programme lisible : <code>for note in
              notes</code>, <code>for jour in jours</code>, <code>for x in X</code>.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Chaque note sur sa ligne",
          contenu: `
            <p>En parcourant la liste <code>notes</code> élément par élément, affiche
            chaque note précédée du texte <code>Note :</code> :</p>
            <pre class="bloc-code"><code>Note : 12
Note : 8
Note : 15</code></pre>`,
          depart: `notes = [12, 8, 15]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+notes\\s*:", message: "Parcours la liste avec for … in notes." },
              { motif: "\\n[ \\t]+print", message: "Le print doit être dans la boucle, décalé." },
            ],
            codeAbsent: [
              { motif: "notes\\s*\\[", message: "Ici, pas besoin d'indice : la variable de boucle contient directement chaque note." },
              { motif: "print\\s*\\([^\\n]*,\\s*(12|8|15)\\s*\\)", message: "N'écris pas les notes : affiche la variable de boucle." },
            ],
            sortie: "Note : 12\nNote : 8\nNote : 15",
          },
          felicitation: "Un seul print, exécuté une fois par élément. 🔁",
          indices: [
            "La boucle parcourt <code>notes</code>. Choisis pour la variable de boucle un nom au singulier : elle prendra successivement chaque valeur.",
            "Dans la boucle, décalé, un <code>print</code> avec le texte demandé puis la variable de boucle.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Un calcul à chaque tour",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `for x in [3, 1, 2]:\n    print(x * 10)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>10</code>, <code>20</code> puis <code>30</code>",
              explication: "La boucle suit l'ordre de la liste, sans la trier." },
            { texte: "<code>30</code>, <code>10</code> puis <code>20</code>", correct: true,
              explication: "Oui : x vaut 3, puis 1, puis 2, dans l'ordre de la liste, et chacun est multiplié par 10." },
            { texte: "<code>0</code>, <code>10</code> puis <code>20</code>",
              explication: "Ici, x prend les valeurs de la liste, pas des indices." },
            { texte: "<code>[30, 10, 20]</code>",
              explication: "Le print est dans la boucle : il affiche un nombre par tour, pas une liste." },
          ],
          apres: `<span class="chapo">Des valeurs, pas des positions</span>
            Avec <code>for x in L</code>, <code>x</code> contient les
            <strong>valeurs</strong> de la liste, dans l'ordre. Ce ne sont pas les
            indices 0, 1, 2.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Additionner et compter en parcourant",
          contenu: `
            <p>Les accumulateurs de la séance 3 fonctionnent aussi sur une liste. Deux
            schémas à connaître :</p>

            <pre class="bloc-code"><code>notes = [12, 8, 15, 10]

total = 0                  # additionner tous les éléments
for note in notes:
    total = total + note   # total vaut 45 à la fin

compteur = 0               # compter ceux qui vérifient une condition
for note in notes:
    if note &lt; 10:
        compteur = compteur + 1    # compteur vaut 1 à la fin</code></pre>

            <div class="encadre">
              <span class="chapo">Et sum, alors ?</span>
              <code>sum(notes)</code> donne la même somme en un mot. Mais le schéma de
              l'accumulateur va plus loin : il permet de faire des calculs que
              <code>sum</code> ne sait pas faire, comme <strong>compter</strong> ce qui
              vérifie une condition.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "La moyenne, à la main",
          contenu: `
            <p>Sans utiliser <code>sum</code>, calcule la somme des notes dans la variable
            <code>total</code> grâce à un parcours, puis affiche la moyenne :</p>
            <pre class="bloc-code"><code>Moyenne : 11.0</code></pre>`,
          depart: `notes = [12, 8, 15, 10, 14, 7]\ntotal = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+notes\\s*:", message: "Parcours la liste notes avec une boucle for." },
              { motif: "\\n[ \\t]+total\\s*=\\s*total\\s*\\+", message: "Dans la boucle, ajoute chaque note à total." },
              { motif: "total\\s*/\\s*len\\s*\\(\\s*notes\\s*\\)", message: "La moyenne, c'est total divisé par le nombre de notes, len(notes)." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Ici, calcule la somme toi-même, sans sum." },
              { motif: "\\b66\\b|11\\.0", message: "Les calculs doivent être faits par Python." },
            ],
            sortie: "Moyenne : 11.0",
          },
          felicitation: "Ce que sum fait en un mot, tu sais maintenant le faire toi-même. ➕",
          indices: [
            "Reprends le schéma du cours : une boucle sur <code>notes</code>, et dans la boucle, <code>total</code> reçoit <code>total</code> plus la note.",
            "Après la boucle, sans décalage, un <code>print</code> avec le texte et le calcul <code>total / len(notes)</code>.",
          ],
        },

        {
          id: "d6",
          type: "code",
          titre: "Compter les notes",
          contenu: `
            <p>En parcourant la liste, compte dans la variable <code>compteur</code> les
            notes <strong>supérieures ou égales à 10</strong>, puis affiche :</p>
            <pre class="bloc-code"><code>Notes d'au moins 10 : 4</code></pre>`,
          depart: `notes = [12, 8, 15, 10, 14, 7]\ncompteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+notes\\s*:", message: "Parcours la liste notes avec une boucle for." },
              { motif: "\\bif\\b[^\\n]*>=\\s*10\\s*:", message: "Le if teste si la note est supérieure ou égale à 10 : >= 10." },
              { motif: "\\n[ \\t]{8,}compteur\\s*=\\s*compteur\\s*\\+\\s*1", message: "Dans le if, compteur augmente de 1." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^\\n]*,\\s*4\\s*\\)", message: "Le nombre doit être compté par Python." },
            ],
            sortie: "Notes d'au moins 10 : 4",
          },
          felicitation: "Un compteur qui n'avance que si la condition est vraie. 🔢",
          indices: [
            "Trois niveaux : la boucle sur <code>notes</code>, un <code>if</code> dans la boucle, et l'augmentation du compteur dans le <code>if</code>.",
            "« Supérieure ou égale à 10 » s'écrit <code>&gt;= 10</code>. La ligne <code>compteur = compteur + 1</code> est décalée de huit espaces.",
            "Le <code>print</code> vient après la boucle, tout à gauche. Le texte contient une apostrophe : guillemets doubles.",
          ],
          apres: `<span class="chapo">Une fréquence</span>
            En divisant <code>compteur</code> par <code>len(notes)</code>, tu obtiens la
            <strong>fréquence</strong> des notes d'au moins 10 : 4 / 6 ≈ 0,67.`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Parcourir par indice",
          contenu: `
            <p>Parfois, la valeur ne suffit pas : on a besoin de sa
            <strong>position</strong>. Par exemple pour afficher le rang d'un terme, ou
            pour lire deux listes en même temps. On parcourt alors les
            <strong>indices</strong>, de 0 à <code>len(L) - 1</code> :</p>

            <pre class="bloc-code"><code>notes = [12, 8, 15]
for i in range(len(notes)):       # i prend les valeurs 0, 1, 2
    print("Note numéro", i, ":", notes[i])</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Parcours</th><th>La variable contient</th><th>À utiliser quand…</th></tr>
              <tr><td><code>for x in L:</code></td><td>chaque valeur</td><td>seules les valeurs comptent</td></tr>
              <tr><td><code>for i in range(len(L)):</code></td><td>chaque indice ; la valeur est <code>L[i]</code></td><td>on a besoin de la position</td></tr>
            </table>
            </div>`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Les valeurs de i",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `termes = [3, 7, 15, 31]\nfor i in range(len(termes)):\n    print(i)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>3</code>, <code>7</code>, <code>15</code> puis <code>31</code>",
              explication: "Ce sont les valeurs. Ici, on parcourt range(len(termes)) : ce sont les indices." },
            { texte: "<code>0</code>, <code>1</code>, <code>2</code> puis <code>3</code>", correct: true,
              explication: "Oui : len(termes) vaut 4, et range(4) donne 0, 1, 2, 3 — exactement les indices de la liste." },
            { texte: "<code>1</code>, <code>2</code>, <code>3</code> puis <code>4</code>",
              explication: "Les indices commencent à 0." },
            { texte: "<code>4</code>",
              explication: "Le print est dans la boucle : il affiche à chaque tour." },
          ],
          apres: `<span class="chapo">range(len(L)) : tous les indices, pas un de trop</span>
            Pour une liste de <em>n</em> éléments, <code>range(len(L))</code> va de 0 à
            <em>n</em> − 1 : il ne déborde jamais, donc pas d'<code>IndexError</code>.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Les termes et leur rang",
          contenu: `
            <p>La liste <code>termes</code> contient <em>u</em><sub>0</sub> à
            <em>u</em><sub>3</sub>. Avec un parcours <strong>par indice</strong>,
            affiche chaque terme avec son indice :</p>
            <pre class="bloc-code"><code>Terme d'indice 0 : 3
Terme d'indice 1 : 7
Terme d'indice 2 : 15
Terme d'indice 3 : 31</code></pre>`,
          depart: `termes = [3, 7, 15, 31]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+i\\s+in\\s+range\\s*\\(\\s*len\\s*\\(\\s*termes\\s*\\)\\s*\\)\\s*:", message: "Parcours les indices : for i in range(len(termes))." },
              { motif: "termes\\s*\\[\\s*i\\s*\\]", message: "La valeur du terme d'indice i se lit termes[i]." },
            ],
            sortie: "Terme d'indice 0 : 3\nTerme d'indice 1 : 7\nTerme d'indice 2 : 15\nTerme d'indice 3 : 31",
          },
          felicitation: "L'indice et la valeur, côte à côte. 📍",
          indices: [
            "La boucle parcourt les indices : <code>i</code> va de 0 à la longueur de la liste moins un, grâce à <code>range(len(termes))</code>.",
            "Dans le <code>print</code>, alterne textes et valeurs : le texte du début, l'indice, les deux points, puis la valeur lue dans la liste à cet indice.",
          ],
        },

        {
          id: "d10",
          type: "code",
          titre: "Construire le tableau de valeurs",
          contenu: `
            <p>La fonction <em>f</em>(<em>x</em>) = <em>x</em>² − 2<em>x</em> est déjà
            écrite, et la liste <code>X</code> contient des antécédents.</p>
            <p>En parcourant <code>X</code>, remplis la liste <code>Y</code> avec les
            images <em>f</em>(<em>x</em>), dans le même ordre, puis affiche
            <code>Y</code> :</p>
            <pre class="bloc-code"><code>[8, 3, 0, -1, 0, 3]</code></pre>`,
          depart: `def f(x):\n    return x ** 2 - 2 * x\n\nX = [-2, -1, 0, 1, 2, 3]\nY = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+X\\s*:", message: "Parcours la liste X avec une boucle for." },
              { motif: "Y\\.append\\s*\\(\\s*f\\s*\\(", message: "Dans la boucle, ajoute à Y l'image par f." },
              { motif: "print\\s*\\(\\s*Y\\s*\\)", message: "Affiche Y à la fin." },
            ],
            sortie: "[8, 3, 0, -1, 0, 3]",
            tests: `assert Y == [8, 3, 0, -1, 0, 3], "Y doit contenir les images des éléments de X, dans le même ordre"`,
          },
          felicitation: "Une liste construite à partir d'une autre : Y[i] est l'image de X[i]. 📈",
          indices: [
            "Parcours <code>X</code> élément par élément ; à chaque tour, la variable contient un antécédent.",
            "Dans la boucle, ajoute à <code>Y</code> l'image de cet antécédent : <code>Y.append(…)</code>, avec un appel à <code>f</code> entre les parenthèses.",
          ],
          apres: `<span class="chapo">Deux listes alignées</span>
            <code>X[i]</code> et <code>Y[i]</code> se correspondent, comme les deux lignes
            d'un tableau de valeurs. C'est exactement ainsi qu'on prépare les données
            pour tracer une courbe point par point.`,
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>for note in notes:              # par élément : note contient chaque valeur
    print(note)

total = 0                        # additionner
for note in notes:
    total = total + note

compteur = 0                     # compter
for note in notes:
    if note >= 10:
        compteur = compteur + 1

for i in range(len(termes)):     # par indice : i va de 0 à len - 1
    print(i, termes[i])

Y = []                           # construire une liste à partir d'une autre
for x in X:
    Y.append(f(x))</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>écrire <code>notes[note]</code> dans un parcours par élément :
                <code>note</code> est déjà la valeur, pas un indice ;</li>
                <li>initialiser le total ou le compteur <strong>dans</strong> la boucle :
                il repart de 0 à chaque tour ;</li>
                <li><code>range(len(L) + 1)</code> : un indice de trop, et c'est
                l'<code>IndexError</code>.</li>
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
          titre: "Que calcule ce programme ?",
          contenu: `<p>Lis ce programme.</p>`,
          code: `valeurs = [3, -1, 4, -5, 0, -2]\nc = 0\nfor v in valeurs:\n    if v < 0:\n        c = c + 1\nprint(c)`,
          question: "Que calcule-t-il, et qu'affiche-t-il ?",
          options: [
            { texte: "la somme des valeurs négatives : <code>-8</code>",
              explication: "c augmente de 1, pas de v : c'est un compteur, pas une somme." },
            { texte: "le nombre de valeurs strictement négatives : <code>3</code>", correct: true,
              explication: "Oui : c augmente de 1 pour −1, −5 et −2. Le 0 n'est pas strictement négatif." },
            { texte: "le nombre de valeurs négatives ou nulles : <code>4</code>",
              explication: "La condition est v &lt; 0, strictement : le 0 n'est pas compté." },
            { texte: "le plus petit élément : <code>-5</code>",
              explication: "Rien dans ce programme ne compare les valeurs entre elles." },
          ],
          apres: `<span class="chapo">Reconnaître un schéma</span>
            Une variable qui part de 0 et augmente de 1 dans un <code>if</code> : c'est un
            compteur. Une variable qui augmente de la valeur elle-même : c'est une somme.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le maximum, sans max",
          contenu: `
            <p>Pour trouver le plus grand élément sans <code>max</code>, on retient le
            « record » actuel, et on le remplace chaque fois qu'on trouve mieux :</p>
            <ol>
              <li>au départ, le record est le premier élément ;</li>
              <li>on parcourt la liste : si un élément est plus grand que le record, il
              devient le nouveau record.</li>
            </ol>
            <p>Applique cette méthode aux températures relevées sur une semaine, puis
            affiche :</p>
            <pre class="bloc-code"><code>Maximum : 21</code></pre>`,
          depart: `temperatures = [12, 17, 9, 21, 15, 19]\nrecord = temperatures[0]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+temperatures\\s*:", message: "Parcours la liste temperatures." },
              { motif: "\\bif\\b[^\\n]*>\\s*record\\s*:|\\bif\\s+record\\s*<", message: "Le if compare l'élément au record actuel." },
              { motif: "\\n[ \\t]{8,}record\\s*=", message: "Dans le if, le record est remplacé par l'élément." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "Ici, trouve le maximum toi-même, sans max." },
              { motif: "print\\s*\\([^\\n]*,\\s*21\\s*\\)", message: "Le maximum doit être trouvé par Python." },
            ],
            sortie: "Maximum : 21",
          },
          felicitation: "Le schéma du record : on ne garde que le meilleur vu jusqu'ici. 🏆",
          indices: [
            "Une boucle sur <code>temperatures</code>, et dans la boucle un <code>if</code> qui compare l'élément à <code>record</code>.",
            "Si l'élément est strictement plus grand que <code>record</code>, alors <code>record</code> reçoit l'élément (ligne décalée de huit espaces).",
            "Après la boucle, un <code>print</code> avec le texte <code>\"Maximum :\"</code> et <code>record</code>.",
          ],
          apres: `<span class="chapo">Pourquoi pas record = 0 ?</span>
            Si toutes les températures étaient négatives, un record de départ à 0 ne serait
            jamais battu, et le programme afficherait 0 — une température qui n'est même
            pas dans la liste. Partir du premier élément évite ce piège.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Repérer les racines",
          contenu: `
            <p>La fonction <em>f</em>(<em>x</em>) = <em>x</em>² − <em>x</em> − 6 est déjà
            écrite. La liste <code>X</code> contient les entiers de −5 à 5.</p>
            <p>Parcours <code>X</code> et affiche les antécédents dont l'image est
            <strong>nulle</strong> :</p>
            <pre class="bloc-code"><code>Racine : -2
Racine : 3</code></pre>`,
          depart: `def f(x):\n    return x ** 2 - x - 6\n\nX = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+(\\w+)\\s+in\\s+X\\s*:", message: "Parcours la liste X." },
              { motif: "\\bif\\s+f\\s*\\(\\s*\\w+\\s*\\)\\s*==\\s*0\\s*:", message: "Le if teste si l'image par f est égale à 0." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^\\n]*,\\s*(-2|3)\\s*\\)", message: "Les racines doivent être trouvées par Python." },
            ],
            sortie: "Racine : -2\nRacine : 3",
          },
          felicitation: "Les racines lues dans un tableau de valeurs, comme sur la calculatrice. 🎯",
          indices: [
            "Une boucle sur <code>X</code>, et dans la boucle un <code>if</code> qui teste l'image de la variable de boucle.",
            "La condition : <code>f(x) == 0</code>, avec deux signes égal. Dans le <code>if</code>, le <code>print</code>.",
          ],
          apres: `<span class="chapo">Vérifie avec Δ</span>
            Δ = (−1)² − 4 × 1 × (−6) = 25, et les racines sont (1 − 5) / 2 = −2 et
            (1 + 5) / 2 = 3. Attention : cette méthode ne trouve que les racines
            <strong>présentes dans la liste</strong> — pour <em>x</em>² − 2, elle ne
            trouverait rien, car √2 n'est pas un entier.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait calculer la moyenne des notes et afficher :</p>
            <pre class="bloc-code"><code>Moyenne : 12.5</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Attention : l'une d'elles ne
            provoque aucun message, seulement un résultat faux.</p>`,
          depart: `notes = [14, 9, 16, 11]\nfor note in notes\n    total = 0\n    total = total + note\nprint("Moyenne :", total / len(note))\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+note\\s+in\\s+notes\\s*:", message: "La ligne du for se termine par deux points." },
              { motif: "(^|\\n)total\\s*=\\s*0", message: "total = 0 doit être placé avant la boucle, sans décalage." },
              { motif: "len\\s*\\(\\s*notes\\s*\\)", message: "Le nombre de notes, c'est len(notes) : la liste, pas une note." },
            ],
            codeAbsent: [
              { motif: "\\n[ \\t]+total\\s*=\\s*0", message: "total = 0 ne doit pas être dans la boucle : il repartirait de 0 à chaque tour." },
            ],
            sortie: "Moyenne : 12.5",
          },
          felicitation: "Deux points, une initialisation à sa place, la bonne liste dans len. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> sur la ligne du <code>for</code>.",
            "Ensuite, une <code>TypeError</code> : <code>len(note)</code> demande la longueur d'un nombre. C'est la longueur de la <strong>liste</strong> qu'il faut.",
            "Enfin, le programme affiche 2.75 : seule la dernière note a été comptée. <code>total = 0</code> est dans la boucle, donc remis à zéro à chaque tour.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Les écarts entre les termes",
          contenu: `
            <p>Pour savoir si une suite est arithmétique, on calcule l'écart entre chaque
            terme et le suivant : <code>termes[i + 1] - termes[i]</code>.</p>
            <p>Remplis la liste <code>ecarts</code> avec ces écarts, grâce à un parcours
            par indice, puis affiche-la :</p>
            <pre class="bloc-code"><code>[3, 3, 3, 3]</code></pre>
            <div class="encadre" data-ton="attention">
              <span class="chapo">Attention au dernier indice</span>
              Le dernier terme n'a pas de suivant : avec 5 termes, il n'y a que 4 écarts.
              L'indice <code>i</code> doit donc s'arrêter un cran plus tôt que
              d'habitude.
            </div>`,
          depart: `termes = [2, 5, 8, 11, 14]\necarts = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+i\\s+in\\s+range\\s*\\(\\s*len\\s*\\(\\s*termes\\s*\\)\\s*-\\s*1\\s*\\)\\s*:", message: "i doit s'arrêter avant le dernier indice : range(len(termes) - 1)." },
              { motif: "ecarts\\.append\\s*\\(\\s*termes\\s*\\[\\s*i\\s*\\+\\s*1\\s*\\]\\s*-\\s*termes\\s*\\[\\s*i\\s*\\]\\s*\\)", message: "Ajoute à ecarts la différence termes[i + 1] - termes[i]." },
              { motif: "print\\s*\\(\\s*ecarts\\s*\\)", message: "Affiche la liste ecarts." },
            ],
            sortie: "[3, 3, 3, 3]",
            tests: `assert ecarts == [3, 3, 3, 3], "ecarts doit contenir les quatre écarts entre termes consécutifs"`,
          },
          felicitation: "Tous les écarts valent 3 : la suite est arithmétique de raison 3. 📏",
          indices: [
            "Avec <code>range(len(termes))</code>, au dernier tour, <code>termes[i + 1]</code> n'existe pas : c'est l'<code>IndexError</code>. Il faut un tour de moins.",
            "Le nombre donné au <code>range</code> est la longueur de la liste moins un. Dans la boucle, ajoute à <code>ecarts</code> la différence entre le terme d'indice <code>i + 1</code> et celui d'indice <code>i</code>.",
          ],
          apres: `<span class="chapo">Un outil de conjecture</span>
            Remplace la liste par <code>[3, 6, 12, 24, 48]</code> : les écarts ne sont plus
            constants, la suite n'est pas arithmétique. Calcule plutôt les
            <strong>quotients</strong> <code>termes[i + 1] / termes[i]</code> : ils valent
            tous 2, elle est géométrique.`,
        },
      ],
    },
  ],
};

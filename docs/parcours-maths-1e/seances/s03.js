/* Maths Première — séance 3 : répéter.
 * Rappels de Seconde : boucle for et range, accumulateur, boucle while.
 * Fil rouge maths : termes d'une suite (explicite et récurrente), somme de
 * termes, algorithme de seuil, factorielle.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Répéter",
  sousTitre: "for et while : les suites sans recopier",
  palier: "Partie 1 — Les rappels de Seconde",

  accroche: `À la séance 1, pour calculer <em>u</em><sub>3</sub>, tu as recopié trois fois
    la même ligne. Pour <em>u</em><sub>100</sub>, il faudrait la recopier cent fois.
    Une <strong>boucle</strong> le fait à ta place : on écrit l'instruction une fois, et on
    dit à Python combien de fois la répéter — ou jusqu'à quand.`,

  objectifs: [
    "répéter un bloc un nombre de fois connu avec <code>for</code> et <code>range</code>",
    "calculer le <em>n</em>-ième terme d'une suite récurrente",
    "additionner des termes avec une variable <strong>accumulateur</strong>",
    "trouver un <strong>seuil</strong> avec la boucle <code>while</code>",
  ],

  motDeLaFin: `Tu sais calculer n'importe quel terme d'une suite, une somme de termes, et le
    rang à partir duquel une suite dépasse un seuil. À la séance 4, on range ces calculs
    dans des <strong>fonctions</strong> : <code>terme(10)</code>, <code>seuil(2000)</code>…
    réutilisables à volonté.`,

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
          titre: "La boucle for",
          contenu: `
            <p>La boucle <code>for</code> répète un bloc d'instructions un
            <strong>nombre de fois connu à l'avance</strong> :</p>

            <pre class="bloc-code"><code>for i in range(3):
    print("Bonjour")
print("Fini")</code></pre>

            <p>Ce programme affiche trois fois <code>Bonjour</code>, puis une fois
            <code>Fini</code>. Comme pour le <code>if</code>, la ligne du
            <code>for</code> se termine par deux points, et le bloc répété est
            <strong>décalé</strong>.</p>

            <div class="encadre">
              <span class="chapo">La variable de boucle</span>
              À chaque tour, la variable <code>i</code> prend une nouvelle valeur :
              <code>range(3)</code> lui fait prendre successivement les valeurs
              <strong>0, 1 et 2</strong>. Trois tours, mais on commence à 0.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Les valeurs de i",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `for i in range(4):\n    print(i)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>1 2 3 4</code>, un nombre par ligne",
              explication: "range commence à 0, pas à 1." },
            { texte: "<code>0 1 2 3</code>, un nombre par ligne", correct: true,
              explication: "Oui : quatre tours, et i prend les valeurs 0, 1, 2 et 3. Le 4 n'est jamais atteint." },
            { texte: "<code>0 1 2 3 4</code>, un nombre par ligne",
              explication: "Ce serait cinq tours. range(4) en fait quatre : de 0 à 3." },
            { texte: "<code>4</code>",
              explication: "Le print est dans la boucle : il s'exécute à chaque tour." },
          ],
          apres: `<span class="chapo">range(n) : de 0 à n − 1</span>
            <code>range(n)</code> fait <em>n</em> tours, avec <code>i</code> allant de 0
            à <em>n</em> − 1. C'est pratique pour les suites : <em>u</em><sub>0</sub>,
            <em>u</em><sub>1</sub>, … sont aussi numérotés à partir de 0.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Les carrés",
          contenu: `
            <p>Avec une boucle <code>for</code>, affiche les carrés des entiers de 0 à
            5, un par ligne :</p>
            <pre class="bloc-code"><code>0
1
4
9
16
25</code></pre>`,
          depart: `# Une boucle for, et un seul print\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(", message: "Utilise une boucle for avec range." },
              { motif: "\\n[ \\t]+print", message: "Le print doit être décalé, dans la boucle." },
              { motif: "\\*\\*\\s*2|(\\w+)\\s*\\*\\s*\\1", message: "Affiche le carré de la variable de boucle." },
            ],
            codeAbsent: [
              { motif: "\\b(16|25)\\b", message: "Un seul print dans la boucle, qui calcule le carré : n'écris pas les valeurs." },
            ],
            sortie: "0\n1\n4\n9\n16\n25",
          },
          felicitation: "Six lignes affichées, une seule écrite. 🔁",
          indices: [
            "De 0 à 5, cela fait six valeurs : il faut <code>range(6)</code>.",
            "Dans la boucle, un <code>print</code> du carré de <code>i</code>, c'est-à-dire <code>i ** 2</code>.",
          ],
          solution: `for i in range(6):\n    print(i ** 2)\n`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Choisir le départ : range(a, b)",
          contenu: `
            <p>Avec deux nombres, <code>range(a, b)</code> part de <code>a</code> et
            s'arrête <strong>juste avant</strong> <code>b</code> :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>J'écris</th><th>La variable prend les valeurs</th></tr>
              <tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td></tr>
              <tr><td><code>range(1, 5)</code></td><td>1, 2, 3, 4</td></tr>
              <tr><td><code>range(1, 11)</code></td><td>1, 2, …, 10</td></tr>
              <tr><td><code>range(-2, 3)</code></td><td>−2, −1, 0, 1, 2</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pour aller de a à b inclus</span>
              On écrit <code>range(a, b + 1)</code>. Ainsi, pour <em>n</em> allant de 1 à
              100 : <code>range(1, 101)</code>.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Un tableau de valeurs",
          contenu: `
            <p>La suite (<em>u<sub>n</sub></em>) est définie par
            <strong><em>u<sub>n</sub></em> = 3<em>n</em> + 2</strong>. Avec une boucle où
            <code>n</code> va de 1 à 5, affiche sur chaque ligne <code>n</code> puis
            <em>u<sub>n</sub></em> :</p>
            <pre class="bloc-code"><code>1 5
2 8
3 11
4 14
5 17</code></pre>`,
          depart: `# n va de 1 à 5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+n\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*6\\s*\\)", message: "La variable de boucle s'appelle n et va de 1 à 5 : range(1, 6)." },
              { motif: "print\\s*\\(\\s*n\\s*,[^\\n]*\\bn\\b", message: "Dans le print : n, puis le calcul de 3n + 2." },
            ],
            sortie: "1 5\n2 8\n3 11\n4 14\n5 17",
          },
          felicitation: "Une suite explicite : on calcule chaque terme directement à partir de n. 📋",
          indices: [
            "Pour que <code>n</code> aille de 1 à 5 inclus, le second nombre du <code>range</code> doit être 6.",
            "Dans la boucle, un <code>print</code> qui reçoit deux valeurs séparées par une virgule : <code>n</code>, puis le calcul <code>3 * n + 2</code>.",
          ],
          solution: `for n in range(1, 6):\n    print(n, 3 * n + 2)\n`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Une suite récurrente, avec une boucle",
          contenu: `
            <p>Pour une suite récurrente, on ne peut pas calculer <em>u<sub>n</sub></em>
            directement : il faut passer par tous les termes précédents. C'est la mise à
            jour de la séance 1… dans une boucle.</p>

            <pre class="bloc-code"><code>u = 3                  # u0 = 3
for i in range(3):     # trois tours : on calcule u1, puis u2, puis u3
    u = 2 * u + 1      # u(n+1) = 2 u(n) + 1
print(u)               # affiche 31, c'est-à-dire u3</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Combien de tours ?</span>
              On part de <em>u</em><sub>0</sub>, et chaque tour fait avancer d'un rang.
              Pour obtenir <em>u<sub>n</sub></em>, il faut donc <strong><em>n</em>
              tours</strong> : <code>range(n)</code>. Ici, <code>i</code> ne sert qu'à
              compter les tours.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Le dixième terme",
          contenu: `
            <p>On considère la suite définie par <em>u</em><sub>0</sub> = 2 et
            <strong><em>u</em><sub><em>n</em>+1</sub> = 3<em>u<sub>n</sub></em> − 1</strong>.</p>
            <p>Avec une boucle, calcule <em>u</em><sub>10</sub>, puis affiche :</p>
            <pre class="bloc-code"><code>u10 = 88574</code></pre>`,
          depart: `u = 2\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*10\\s*\\)\\s*:", message: "Pour aller de u0 à u10, il faut dix tours : range(10)." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(3\\s*\\*\\s*u|u\\s*\\*\\s*3)\\s*-\\s*1", message: "Dans la boucle, u reçoit 3 fois u moins 1." },
              { motif: "\\nprint", message: "Le print vient après la boucle, sans décalage : on n'affiche que le dernier terme." },
            ],
            codeAbsent: [
              { motif: "\\b88574\\b", message: "Le terme doit être calculé par Python." },
            ],
            sortie: "u10 = 88574",
          },
          felicitation: "Dix tours de boucle, dix termes calculés, un seul affiché. 🎯",
          indices: [
            "Reprends le schéma du cours : une boucle, et dans la boucle la mise à jour de <code>u</code>.",
            "Dix tours, donc <code>range(10)</code>. La mise à jour : <code>u</code> reçoit 3 fois <code>u</code>, moins 1.",
            "Le <code>print</code> vient <strong>après</strong> la boucle, revenu tout à gauche, avec le texte <code>\"u10 =\"</code> et la variable <code>u</code>.",
          ],
          solution: `u = 2\nfor i in range(10):\n    u = 3 * u - 1\nprint("u10 =", u)\n`,
          apres: `<span class="chapo">Changer un seul nombre</span>
            Pour <em>u</em><sub>20</sub>, remplace <code>range(10)</code> par
            <code>range(20)</code>, et c'est tout. Essaie : la suite grandit très vite,
            mais Python calcule sans peine avec de très grands entiers.`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Dans la boucle ou après ?",
          contenu: `<p>Lis ce programme sans l'exécuter. Regarde bien le décalage du
            <code>print</code>.</p>`,
          code: `u = 1\nfor i in range(3):\n    u = u * 2\nprint(u)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>2</code>, <code>4</code> puis <code>8</code>",
              explication: "Le print n'est pas décalé : il n'est pas dans la boucle." },
            { texte: "<code>8</code>", correct: true,
              explication: "Oui : la boucle double u trois fois (2, 4, 8), puis le print, qui est hors de la boucle, affiche le résultat une seule fois." },
            { texte: "<code>1</code>, <code>2</code> puis <code>4</code>",
              explication: "Le print n'est exécuté qu'une fois, après les trois tours." },
            { texte: "<code>6</code>",
              explication: "u est multiplié par 2 à chaque tour, pas augmenté de 2." },
          ],
          apres: `<span class="chapo">Le décalage décide</span>
            Un <code>print</code> décalé dans la boucle affiche <strong>à chaque
            tour</strong> : tous les termes. Revenu à gauche, il affiche <strong>une
            fois</strong>, après la boucle : le dernier terme seulement.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Additionner : l'accumulateur",
          contenu: `
            <p>Pour calculer une somme comme 1 + 2 + 3 + … + 100, on utilise une variable
            qui <strong>accumule</strong> les valeurs au fil des tours :</p>

            <pre class="bloc-code"><code>s = 0                    # la somme commence à 0
for k in range(1, 101):  # k va de 1 à 100
    s = s + k            # on ajoute k à la somme
print(s)                 # affiche 5050</code></pre>

            <p>Au premier tour, <code>s</code> passe de 0 à 1 ; au deuxième, de 1 à 3 ;
            au troisième, de 3 à 6… et après le centième, elle vaut 5050.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'initialisation, avant la boucle</span>
              <code>s = 0</code> s'écrit <strong>avant</strong> la boucle. Placée dedans,
              la somme serait remise à zéro à chaque tour.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "La somme des carrés",
          contenu: `
            <p>Avec un accumulateur, calcule la somme
            <strong>1² + 2² + 3² + … + 10²</strong>, puis affiche :</p>
            <pre class="bloc-code"><code>Somme : 385</code></pre>`,
          depart: `s = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)\\s*:", message: "La variable de boucle va de 1 à 10 : range(1, 11)." },
              { motif: "\\n[ \\t]+s\\s*=\\s*s\\s*\\+", message: "Dans la boucle, s reçoit s plus le carré de la variable de boucle." },
              { motif: "\\*\\*\\s*2", message: "On additionne des carrés : pense à ** 2." },
            ],
            codeAbsent: [
              { motif: "\\b385\\b", message: "La somme doit être calculée par Python." },
            ],
            sortie: "Somme : 385",
          },
          felicitation: "Dix carrés additionnés un par un. ➕",
          indices: [
            "Même schéma que la somme de 1 à 100, mais on ajoute <code>k ** 2</code> au lieu de <code>k</code>.",
            "<code>k</code> va de 1 à 10 : <code>range(1, 11)</code>. Dans la boucle, <code>s</code> reçoit <code>s</code> plus le carré de <code>k</code>.",
            "Le <code>print</code>, avec le texte <code>\"Somme :\"</code>, vient après la boucle, sans décalage.",
          ],
          solution: `s = 0\nfor k in range(1, 11):\n    s = s + k ** 2\nprint("Somme :", s)\n`,
        },

        {
          id: "d11",
          type: "cours",
          titre: "La boucle while et l'algorithme de seuil",
          contenu: `
            <p>Parfois, on ne sait pas combien de tours faire : on veut répéter
            <strong>tant qu'une condition est vraie</strong>. C'est la boucle
            <code>while</code> (« tant que »).</p>

            <p>Exemple : la suite <em>u</em><sub>0</sub> = 1,
            <em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em>. À partir de
            quel rang dépasse-t-elle 100 ?</p>

            <pre class="bloc-code"><code>u = 1
n = 0
while u &lt;= 100:      # tant qu'on n'a pas dépassé 100…
    u = 2 * u        # … on passe au terme suivant
    n = n + 1        # … et on compte un rang de plus
print("n =", n)      # affiche n = 7, car u7 = 128</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux pièges</span>
              <ul style="margin-bottom:0">
                <li>la condition du <code>while</code> est celle pour
                <strong>continuer</strong>, pas pour s'arrêter : on veut
                <em>u<sub>n</sub></em> &gt; 100, donc on continue tant que
                <code>u &lt;= 100</code> ;</li>
                <li>il ne faut pas oublier <code>n = n + 1</code> : <code>n</code> doit
                suivre le rang du terme.</li>
              </ul>
            </div>`,
        },

        {
          id: "d12",
          type: "code",
          titre: "Doubler son capital",
          contenu: `
            <p>On place 1 000 € à 5 % par an. Le capital après <em>n</em> années est
            <em>u<sub>n</sub></em>, avec <em>u</em><sub>0</sub> = 1000 et
            <em>u</em><sub><em>n</em>+1</sub> = 1,05 × <em>u<sub>n</sub></em>.</p>
            <p>Avec une boucle <code>while</code>, détermine au bout de combien d'années
            le capital <strong>dépasse</strong> 2 000 €, puis affiche :</p>
            <pre class="bloc-code"><code>n = 15</code></pre>`,
          depart: `u = 1000\nn = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\s+u\\s*<=\\s*2000\\s*:|\\bwhile\\s+2000\\s*>=\\s*u\\s*:|\\bwhile\\s+u\\s*<\\s*2000\\s*:", message: "Continue tant que u n'a pas dépassé 2000 : while u <= 2000." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(1\\.05\\s*\\*\\s*u|u\\s*\\*\\s*1\\.05)", message: "Dans la boucle, u reçoit 1.05 fois u." },
              { motif: "\\n[ \\t]+n\\s*=\\s*n\\s*\\+\\s*1", message: "Dans la boucle, n augmente de 1 à chaque tour." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "Le nombre d'années doit être trouvé par Python." },
            ],
            sortie: "n = 15",
          },
          felicitation: "Un algorithme de seuil complet : condition, mise à jour, compteur. 💶",
          indices: [
            "Reprends le schéma du cours : <code>while</code>, puis deux lignes décalées.",
            "La condition pour continuer : le capital n'a pas encore dépassé 2000, soit <code>u &lt;= 2000</code>. Les deux lignes de la boucle : la mise à jour de <code>u</code> (fois 1.05), puis <code>n</code> qui augmente de 1.",
            "Le <code>print</code> vient après la boucle, avec le texte <code>\"n =\"</code> et la variable <code>n</code>.",
          ],
          solution: `u = 1000\nn = 0\nwhile u <= 2000:\n    u = 1.05 * u\n    n = n + 1\nprint("n =", n)\n`,
          apres: `<span class="chapo">Pourquoi pas une boucle for ?</span>
            Parce qu'on ne connaît pas le nombre de tours à l'avance : c'est justement ce
            qu'on cherche. Remplace 2000 par 3000 pour savoir quand le capital triple.`,
        },

        {
          id: "d13",
          type: "qcm",
          titre: "for ou while ?",
          contenu: `<p>Pour chaque problème, il faut choisir la bonne boucle.</p>
            <ol>
              <li>calculer <em>u</em><sub>50</sub> ;</li>
              <li>trouver le premier rang où <em>u<sub>n</sub></em> &lt; 0,01 ;</li>
              <li>calculer la somme des 20 premiers termes.</li>
            </ol>`,
          question: "Quelle boucle pour chacun, dans l'ordre ?",
          options: [
            { texte: "<code>for</code>, <code>for</code>, <code>for</code>",
              explication: "Pour le 2, on ne sait pas combien de termes il faudra calculer." },
            { texte: "<code>for</code>, <code>while</code>, <code>for</code>", correct: true,
              explication: "Oui : pour 1 et 3, on connaît le nombre de tours (50 et 20). Pour 2, on répète tant que la condition n'est pas atteinte." },
            { texte: "<code>while</code>, <code>for</code>, <code>while</code>",
              explication: "C'est l'inverse : on utilise for quand le nombre de tours est connu." },
            { texte: "<code>while</code>, <code>while</code>, <code>while</code>",
              explication: "C'est possible, mais plus compliqué : quand le nombre de tours est connu, for est plus simple et plus sûr." },
          ],
          apres: `<span class="chapo">La règle</span>
            Nombre de tours <strong>connu</strong> → <code>for</code>. Nombre de tours
            <strong>inconnu</strong>, on s'arrête quand une condition est atteinte →
            <code>while</code>.`,
        },

        {
          id: "d14",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Le n-ième terme d'une suite récurrente
u = 3
for i in range(10):          # dix tours : de u0 à u10
    u = 2 * u + 1
print(u)

# Une somme
s = 0                        # avant la boucle !
for k in range(1, 101):      # k de 1 à 100
    s = s + k

# Un seuil
u = 1
n = 0
while u &lt;= 100:              # condition pour CONTINUER
    u = 2 * u
    n = n + 1</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>répéter <em>n</em> fois</td><td><code>for i in range(n):</code></td></tr>
              <tr><td>une variable de <em>a</em> à <em>b</em> inclus</td><td><code>for k in range(a, b + 1):</code></td></tr>
              <tr><td>répéter tant qu'une condition est vraie</td><td><code>while condition:</code></td></tr>
              <tr><td>additionner au fil des tours</td><td><code>s = 0</code> avant, <code>s = s + …</code> dedans</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li><code>range(1, 100)</code> s'arrête à 99 : pour inclure 100, <code>range(1, 101)</code> ;</li>
                <li>initialiser l'accumulateur <strong>dans</strong> la boucle : il repart de 0 à chaque tour ;</li>
                <li>décaler le <code>print</code> sans le vouloir : il affiche à chaque tour ;</li>
                <li>oublier <code>n = n + 1</code> dans un <code>while</code> : le rang reste faux.</li>
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
          titre: "Lire un range",
          contenu: `<p>On écrit <code>for k in range(2, 6):</code>.</p>`,
          question: "Quelles valeurs prend k ?",
          options: [
            { texte: "2, 3, 4, 5 et 6",
              explication: "range s'arrête juste avant le second nombre : 6 n'est pas atteint." },
            { texte: "2, 3, 4 et 5", correct: true,
              explication: "Oui : de 2 inclus à 6 exclu, soit quatre tours." },
            { texte: "3, 4 et 5",
              explication: "Le premier nombre, lui, est bien inclus." },
            { texte: "0, 1, 2, 3, 4 et 5",
              explication: "Avec deux nombres, on ne part plus de 0 mais du premier." },
          ],
          apres: `<span class="chapo">Le nombre de tours</span>
            <code>range(a, b)</code> fait <em>b</em> − <em>a</em> tours : ici
            6 − 2 = 4.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Tous les termes",
          contenu: `
            <p>La suite géométrique de premier terme <em>u</em><sub>0</sub> = 5 et de
            raison <em>q</em> = 3 : à la séance 1, tu en avais calculé trois termes en
            recopiant des lignes.</p>
            <p>Avec une boucle, affiche ses six premiers termes, de
            <em>u</em><sub>0</sub> à <em>u</em><sub>5</sub>, un par ligne :</p>
            <pre class="bloc-code"><code>5
15
45
135
405
1215</code></pre>`,
          depart: `u = 5\nq = 3\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(", message: "Utilise une boucle for." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(u\\s*\\*\\s*q|q\\s*\\*\\s*u)", message: "Dans la boucle, u reçoit u fois q." },
              { motif: "\\n[ \\t]+print\\s*\\(\\s*u\\s*\\)", message: "Le print(u) doit être dans la boucle, pour afficher chaque terme." },
            ],
            codeAbsent: [
              { motif: "\\b(15|45|135|405|1215)\\b", message: "Les termes doivent être calculés par Python." },
            ],
            sortie: "5\n15\n45\n135\n405\n1215",
          },
          felicitation: "Afficher, puis passer au suivant : l'ordre des deux lignes compte. 🌱",
          indices: [
            "Six termes à afficher, donc six tours. Le <code>print</code> est cette fois <strong>dans</strong> la boucle.",
            "Le premier terme affiché doit être 5 : dans la boucle, affiche d'abord <code>u</code>, et seulement ensuite calcule le suivant.",
            "Combien de tours pour six termes ? Dans la boucle, deux lignes décalées : l'affichage du terme, puis la même mise à jour qu'à la séance 1.",
          ],
          solution: `u = 5\nq = 3\nfor i in range(6):\n    print(u)\n    u = u * q\n`,
          apres: `<span class="chapo">Afficher avant ou après la mise à jour ?</span>
            Si tu mets la mise à jour en premier, la boucle affiche de
            <em>u</em><sub>1</sub> à <em>u</em><sub>6</sub> : le premier terme est
            perdu. Affiche d'abord, calcule ensuite.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La somme des termes",
          contenu: `
            <p>La suite arithmétique (<em>u<sub>n</sub></em>) a pour premier terme
            <em>u</em><sub>0</sub> = 4 et pour raison <em>r</em> = 3.</p>
            <p>Avec une boucle, calcule la somme de ses <strong>dix premiers
            termes</strong>, <em>S</em> = <em>u</em><sub>0</sub> + <em>u</em><sub>1</sub>
            + … + <em>u</em><sub>9</sub>, puis affiche :</p>
            <pre class="bloc-code"><code>S = 175</code></pre>`,
          depart: `u = 4\nr = 3\ns = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*10\\s*\\)\\s*:", message: "Dix termes, donc dix tours : range(10)." },
              { motif: "\\n[ \\t]+s\\s*=\\s*s\\s*\\+\\s*u", message: "Dans la boucle, ajoute le terme u à la somme s." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(u\\s*\\+\\s*r|r\\s*\\+\\s*u)", message: "Dans la boucle, passe au terme suivant : u reçoit u plus r." },
            ],
            codeAbsent: [
              { motif: "\\b175\\b", message: "La somme doit être calculée par Python." },
            ],
            sortie: "S = 175",
          },
          felicitation: "Deux variables qui évoluent ensemble : le terme et la somme. ➕",
          indices: [
            "À chaque tour, deux choses : ajouter le terme actuel à <code>s</code>, puis passer au terme suivant.",
            "Comme pour l'affichage des termes, l'ordre compte : on ajoute <code>u</code> à <code>s</code> <strong>avant</strong> de calculer le terme suivant.",
            "Dans <code>for i in range(10):</code>, deux lignes décalées : <code>s</code> reçoit <code>s + u</code>, puis <code>u</code> reçoit <code>u + r</code>. Le <code>print</code> vient après la boucle.",
          ],
          solution: `u = 4\nr = 3\ns = 0\nfor i in range(10):\n    s = s + u\n    u = u + r\nprint("S =", s)\n`,
          apres: `<span class="chapo">Vérifie avec la formule du cours</span>
            Pour une suite arithmétique, la somme vaut nombre de termes × (premier +
            dernier) / 2 = 10 × (4 + 31) / 2 = 175. La boucle et la formule
            s'accordent.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait calculer 1 + 2 + … + 50 et afficher :</p>
            <pre class="bloc-code"><code>Somme : 1275</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Deux sont signalées par Python ;
            la troisième donne seulement un résultat faux.</p>`,
          depart: `n = 50\ns = 0\nfor k in range(1, n)\ns = s + k\nprint("Somme :", s)\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+k\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*n\\s*\\+\\s*1\\s*\\)\\s*:", message: "k doit aller de 1 à n inclus : range(1, n + 1), et la ligne se termine par deux points." },
              { motif: "\\n[ \\t]+s\\s*=\\s*s\\s*\\+\\s*k", message: "L'addition doit être décalée, dans la boucle." },
              { motif: "\\nprint", message: "Le print reste après la boucle, sans décalage." },
            ],
            codeAbsent: [
              { motif: "\\b1275\\b", message: "La somme doit être calculée par Python." },
            ],
            sortie: "Somme : 1275",
          },
          felicitation: "Deux points, un décalage, un range qui s'arrêtait trop tôt. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> sur la ligne du <code>for</code> : comment se termine-t-elle ?",
            "La deuxième : l'addition doit faire partie de la boucle. Comment Python le sait-il ?",
            "Le programme affiche 1225 au lieu de 1275 : il manque 50. <code>range(1, n)</code> s'arrête juste avant <code>n</code>.",
          ],
          solution: `n = 50\ns = 0\nfor k in range(1, n + 1):\n    s = s + k\nprint("Somme :", s)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Un seuil",
          contenu: `
            <p>La suite (<em>u<sub>n</sub></em>) est définie par <em>u</em><sub>0</sub> = 3
            et <strong><em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> − 1</strong>.</p>
            <p>Détermine le plus petit entier <em>n</em> tel que
            <em>u<sub>n</sub></em> &gt; 1000, puis affiche :</p>
            <pre class="bloc-code"><code>n = 9</code></pre>`,
          depart: `u = 3\nn = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\s+u\\s*<=\\s*1000\\s*:|\\bwhile\\s+u\\s*<\\s*1001\\s*:|\\bwhile\\s+1000\\s*>=\\s*u\\s*:", message: "Continue tant que u n'a pas dépassé 1000 : while u <= 1000." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(2\\s*\\*\\s*u|u\\s*\\*\\s*2)\\s*-\\s*1", message: "Dans la boucle, u reçoit 2 fois u moins 1." },
              { motif: "\\n[ \\t]+n\\s*=\\s*n\\s*\\+\\s*1", message: "Dans la boucle, n augmente de 1." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^\\n]*\\b9\\b", message: "Le rang doit être trouvé par Python." },
            ],
            sortie: "n = 9",
          },
          felicitation: "Le schéma du seuil, appliqué à une nouvelle suite. 📈",
          indices: [
            "Même structure que « Doubler son capital » : seules la condition et la formule changent.",
            "On veut <em>u<sub>n</sub></em> &gt; 1000 : on continue donc tant que <code>u &lt;= 1000</code>.",
          ],
          solution: `u = 3\nn = 0\nwhile u <= 1000:\n    u = 2 * u - 1\n    n = n + 1\nprint("n =", n)\n`,
          apres: `<span class="chapo">Vérifie</span>
            Ajoute <code>print(u)</code> après la boucle : tu obtiens
            <em>u</em><sub>9</sub> = 1025, qui dépasse bien 1000, alors que
            <em>u</em><sub>8</sub> = 513 ne le dépassait pas.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "La factorielle",
          contenu: `
            <p>La <strong>factorielle</strong> de 10, notée 10!, est le produit
            1 × 2 × 3 × … × 10. Elle compte, par exemple, le nombre de façons de ranger
            10 livres sur une étagère.</p>
            <p>Calcule 10! avec une boucle, dans une variable <code>p</code>, puis
            affiche :</p>
            <pre class="bloc-code"><code>10! = 3628800</code></pre>`,
          depart: `p = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*(1|2)\\s*,\\s*11\\s*\\)\\s*:", message: "La variable de boucle va de 1 à 10 : range(1, 11)." },
              { motif: "\\n[ \\t]+p\\s*=\\s*p\\s*\\*", message: "Dans la boucle, p reçoit p multiplié par la variable de boucle." },
            ],
            codeAbsent: [
              { motif: "\\b3628800\\b", message: "Le produit doit être calculé par Python." },
            ],
            sortie: "10! = 3628800",
          },
          felicitation: "Un accumulateur de produit : il démarre à 1, pas à 0. ✖️",
          indices: [
            "C'est le schéma de la somme, mais avec une multiplication.",
            "<code>k</code> va de 1 à 10, et à chaque tour <code>p</code> reçoit <code>p</code> fois <code>k</code>.",
          ],
          solution: `p = 1\nfor k in range(1, 11):\n    p = p * k\nprint("10! =", p)\n`,
          apres: `<span class="chapo">Pourquoi p = 1 ?</span>
            Pour une somme, on part de 0 car ajouter 0 ne change rien. Pour un produit,
            on part de 1 car multiplier par 1 ne change rien. Avec <code>p = 0</code>,
            le résultat serait toujours 0 !`,
        },
      ],
    },
  ],
};

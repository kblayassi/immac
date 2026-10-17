/* Maths Première — séance 2 : décider.
 * Rappels de Seconde : comparaisons, if / else, elif, indentation.
 * Fil rouge maths : le signe du discriminant, puis les racines d'un trinôme
 * (sqrt importé du module math), et le sommet d'une parabole.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Décider",
  sousTitre: "if, elif, else : le discriminant décide",
  palier: "Partie 1 — Les rappels de Seconde",

  accroche: `Selon le signe de Δ, un trinôme a deux racines, une seule, ou aucune. Tu fais ce
    tri de tête depuis le début de l'année ; aujourd'hui, c'est Python qui va le faire.
    Pour cela, il doit savoir <strong>comparer</strong> deux nombres, puis
    <strong>choisir</strong> quelles instructions exécuter.`,

  objectifs: [
    "comparer deux valeurs : <code>&lt;</code>, <code>&gt;</code>, <code>==</code>, <code>!=</code>…",
    "écrire une instruction conditionnelle avec <code>if</code>, <code>elif</code> et <code>else</code>",
    "respecter l'<strong>indentation</strong>, qui délimite les blocs",
    "calculer les racines d'un trinôme avec <code>sqrt</code>",
  ],

  motDeLaFin: `Ton programme sait maintenant trouver lui-même les racines d'un trinôme, quel
    que soit le signe de Δ. À la séance 3, il apprend à <strong>répéter</strong> : calculer
    le vingtième terme d'une suite, une somme de cent termes, ou trouver à partir de quand
    une suite dépasse un seuil.`,

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
          titre: "Comparer deux valeurs",
          contenu: `
            <p>Une comparaison est une question à laquelle Python répond par
            <code>True</code> (vrai) ou <code>False</code> (faux).</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>En maths</th><th>En Python</th><th>Exemple</th><th>Réponse</th></tr>
              <tr><td>&lt;</td><td><code>&lt;</code></td><td><code>3 &lt; 5</code></td><td><code>True</code></td></tr>
              <tr><td>&gt;</td><td><code>&gt;</code></td><td><code>3 &gt; 5</code></td><td><code>False</code></td></tr>
              <tr><td>⩽</td><td><code>&lt;=</code></td><td><code>5 &lt;= 5</code></td><td><code>True</code></td></tr>
              <tr><td>⩾</td><td><code>&gt;=</code></td><td><code>4 &gt;= 5</code></td><td><code>False</code></td></tr>
              <tr><td>=</td><td><code>==</code></td><td><code>2 + 2 == 4</code></td><td><code>True</code></td></tr>
              <tr><td>≠</td><td><code>!=</code></td><td><code>2 + 2 != 4</code></td><td><code>False</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Un signe = ou deux ?</span>
              <code>x = 5</code> <strong>range</strong> 5 dans <code>x</code> (séance 1).
              <code>x == 5</code> <strong>demande</strong> si <code>x</code> vaut 5. Pour
              tester une égalité, il faut toujours deux signes égal.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Vrai ou faux ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `delta = -16\nprint(delta > 0)\nprint(delta != 0)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>True</code> puis <code>True</code>",
              explication: "−16 n'est pas strictement positif : la première comparaison est fausse." },
            { texte: "<code>False</code> puis <code>True</code>", correct: true,
              explication: "Oui : −16 &gt; 0 est faux, et −16 est bien différent de 0." },
            { texte: "<code>False</code> puis <code>False</code>",
              explication: "<code>!=</code> signifie « différent de » : −16 est bien différent de 0." },
            { texte: "<code>-16</code> puis <code>-16</code>",
              explication: "Une comparaison ne renvoie pas un nombre, mais <code>True</code> ou <code>False</code>." },
          ],
          apres: `<span class="chapo">Une question, une réponse</span>
            Une comparaison donne toujours <code>True</code> ou <code>False</code>. C'est
            exactement ce dont l'instruction <code>if</code> a besoin pour décider.`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "L'instruction if … else",
          contenu: `
            <p>L'instruction <code>if</code> (« si ») exécute un bloc d'instructions
            <strong>seulement si</strong> la condition est vraie. Le <code>else</code>
            (« sinon ») donne le bloc à exécuter dans le cas contraire.</p>

            <pre class="bloc-code"><code>note = 8
if note >= 10:
    print("Admis")
else:
    print("Ajourné")
print("Fin du programme")</code></pre>

            <p>Ici, la console affiche <code>Ajourné</code> puis <code>Fin du
            programme</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les deux points et le décalage</span>
              <ul style="margin-bottom:0">
                <li>la ligne du <code>if</code> et celle du <code>else</code> se terminent
                par deux points <code>:</code> ;</li>
                <li>les instructions du bloc sont <strong>décalées</strong> de quatre
                espaces (touche <kbd>Tab</kbd>) : c'est l'<strong>indentation</strong>.
                Elle indique à Python ce qui fait partie du bloc.</li>
              </ul>
            </div>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Positif ou négatif ?",
          contenu: `
            <p>La variable <code>x</code> contient un nombre. Écris un
            <code>if … else</code> qui affiche <code>positif ou nul</code> si
            <code>x</code> est supérieur ou égal à 0, et <code>négatif</code> sinon.</p>
            <p>Avec <code>x = -2.5</code>, la console doit montrer :</p>
            <pre class="bloc-code"><code>négatif</code></pre>
            <p>Change ensuite la valeur de <code>x</code> pour vérifier que l'autre cas
            fonctionne aussi.</p>`,
          depart: `x = -2.5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\s+x\\s*(>=|<)\\s*0\\s*:|\\bif\\s+0\\s*(<=|>)\\s*x\\s*:", message: "La condition compare x à 0, et la ligne du if se termine par deux points." },
              { motif: "\\belse\\s*:", message: "Il faut un else, suivi de deux points, pour l'autre cas." },
              { motif: "\\n[ \\t]+print", message: "Les print doivent être décalés sous le if et sous le else." },
            ],
            sortie: "négatif",
          },
          felicitation: "Une condition, deux blocs : Python a choisi le bon. ⚖️",
          indices: [
            "La condition « x est supérieur ou égal à 0 » s'écrit <code>x &gt;= 0</code>.",
            "Structure : une ligne <code>if</code> avec la condition et deux points, un <code>print</code> décalé, une ligne <code>else:</code>, un autre <code>print</code> décalé.",
            "Les textes à afficher sont <code>\"positif ou nul\"</code> et <code>\"négatif\"</code>. Chaque <code>print</code> commence par quatre espaces.",
          ],
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Ce qui est dans le bloc, et ce qui n'y est pas",
          contenu: `<p>Lis ce programme sans l'exécuter. Regarde bien le décalage de chaque
            ligne.</p>`,
          code: `x = 12\nif x > 20:\n    print("grand")\n    print("très grand")\nprint("fin")`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>grand</code>, <code>très grand</code> puis <code>fin</code>",
              explication: "12 &gt; 20 est faux : le bloc du if n'est pas exécuté." },
            { texte: "<code>très grand</code> puis <code>fin</code>",
              explication: "Les deux print décalés font partie du même bloc : ils sont exécutés ensemble, ou pas du tout." },
            { texte: "<code>fin</code>", correct: true,
              explication: "Oui : la condition est fausse, donc les deux lignes décalées sont sautées. La dernière n'est pas décalée : elle est hors du if, et s'exécute toujours." },
            { texte: "rien du tout",
              explication: "La dernière ligne n'est pas décalée : elle ne dépend pas du if." },
          ],
          apres: `<span class="chapo">L'indentation fait le bloc</span>
            Toutes les lignes décalées sous le <code>if</code> forment son bloc. La
            première ligne qui revient à gauche marque la fin du bloc : elle s'exécute
            quoi qu'il arrive.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Plus de deux cas : elif",
          contenu: `
            <p>Quand il y a plus de deux cas, on intercale des <code>elif</code>
            (contraction de « else if », « sinon si ») entre le <code>if</code> et le
            <code>else</code> :</p>

            <pre class="bloc-code"><code>temperature = 18
if temperature &lt; 0:
    print("Il gèle")
elif temperature &lt; 25:
    print("Il fait doux")
else:
    print("Il fait chaud")</code></pre>

            <p>Python teste les conditions <strong>dans l'ordre</strong>, et exécute le
            bloc de la <strong>première</strong> qui est vraie — et seulement celui-là.
            Le <code>else</code> ramasse tous les cas restants. Ici, la console affiche
            <code>Il fait doux</code>.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Combien de racines ?",
          contenu: `
            <p>Rappel du cours : un trinôme <em>ax</em>² + <em>bx</em> + <em>c</em> a
            <strong>deux racines</strong> si Δ &gt; 0, <strong>une racine double</strong>
            si Δ = 0, et <strong>aucune racine réelle</strong> si Δ &lt; 0.</p>
            <p>Complète le programme : calcule <code>delta</code>, puis affiche, avec un
            <code>if</code>, un <code>elif</code> et un <code>else</code>, l'une des trois
            phrases <code>Deux racines</code>, <code>Une racine double</code> ou
            <code>Aucune racine réelle</code>.</p>
            <p>Pour <em>x</em>² + 2<em>x</em> + 5, la console doit montrer :</p>
            <pre class="bloc-code"><code>Aucune racine réelle</code></pre>`,
          depart: `a = 1\nb = 2\nc = 5\ndelta = 0      # à remplacer par le calcul de Δ\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdelta\\s*=[^\\n]*\\bb\\b[^\\n]*\\*\\*", message: "Calcule delta à partir de a, b et c : b puissance 2, moins 4 fois a fois c." },
              { motif: "\\bif\\s+delta\\s*>\\s*0\\s*:", message: "Le premier cas teste si delta est strictement positif." },
              { motif: "\\belif\\s+delta\\s*==\\s*0\\s*:", message: "Le deuxième cas, avec elif, teste si delta est égal à 0 — avec deux signes égal." },
              { motif: "\\belse\\s*:", message: "Le dernier cas se traite avec else." },
            ],
            sortie: "Aucune racine réelle",
            tests: `assert delta == -16, "delta doit valoir b² − 4ac, soit -16 ici"`,
          },
          felicitation: "Les trois cas du cours, traduits en trois blocs. 🧭",
          indices: [
            "Commence par remplacer le 0 de la ligne <code>delta</code> par la formule de Δ, comme à la séance 1.",
            "Puis trois lignes de test : <code>if</code> pour Δ &gt; 0, <code>elif</code> pour Δ = 0, <code>else</code> pour le reste. Chacune se termine par deux points.",
            "Δ = 0 s'écrit <code>delta == 0</code>, avec deux signes égal. Sous chaque ligne de test, un <code>print</code> décalé avec la phrase correspondante.",
          ],
          apres: `<span class="chapo">Essaie les deux autres cas</span>
            Remplace <code>c = 5</code> par <code>c = 1</code> (Δ = 0), puis par
            <code>c = -3</code> (Δ = 16), et exécute à chaque fois : ton programme
            change de phrase tout seul.`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Un signe égal en moins",
          contenu: `<p>Ce programme ressemble beaucoup au tien. Lis-le sans
            l'exécuter.</p>`,
          code: `delta = 0\nif delta = 0:\n    print("Une racine double")`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "il affiche <code>Une racine double</code>",
              explication: "Il le ferait avec <code>==</code>. Ici, Python ne va même pas jusqu'à l'exécution." },
            { texte: "il n'affiche rien",
              explication: "Pire : le programme ne démarre pas du tout." },
            { texte: "une <code>SyntaxError</code>", correct: true,
              explication: "Oui : <code>delta = 0</code> est une affectation, un ordre, pas une question. Python refuse de la trouver après un <code>if</code>." },
            { texte: "il met <code>delta</code> à 0, puis affiche la phrase",
              explication: "Python ne devine pas : un seul signe égal après un if est une erreur d'écriture." },
          ],
          apres: `<span class="chapo">Le message à reconnaître</span>
            Python répond <code>SyntaxError: invalid syntax. Maybe you meant '==' or
            ':=' instead of '='?</code> — il suggère lui-même la correction. Quand un
            <code>if</code> provoque une erreur, vérifie les deux signes égal et les deux
            points.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "La racine carrée : sqrt",
          contenu: `
            <p>Quand Δ &gt; 0, les deux racines sont
            <strong><em>x</em><sub>1</sub> = (−<em>b</em> − √Δ) / (2<em>a</em>)</strong> et
            <strong><em>x</em><sub>2</sub> = (−<em>b</em> + √Δ) / (2<em>a</em>)</strong>.</p>

            <p>La racine carrée s'appelle <code>sqrt</code> (<em>square root</em>). Elle
            n'est pas disponible d'office : il faut l'<strong>importer</strong> du module
            <code>math</code>, une fois, en haut du programme.</p>

            <pre class="bloc-code"><code>from math import sqrt

print(sqrt(49))      # affiche 7.0
print(sqrt(2))       # affiche 1.4142135623730951</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux paires de parenthèses indispensables</span>
              La fraction s'écrit sur une seule ligne : il faut des parenthèses autour du
              <strong>numérateur</strong> <em>et</em> autour du <strong>dénominateur</strong>.
              <code>(-b + sqrt(delta)) / (2 * a)</code> — sans elles, Python ne divise
              pas ce qu'il faut.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Les deux racines",
          contenu: `
            <p>Pour le trinôme 2<em>x</em>² − 3<em>x</em> − 5, on a trouvé Δ = 49 à la
            séance 1 : il y a deux racines.</p>
            <p>Calcule-les dans les variables <code>x1</code> et <code>x2</code> avec les
            formules du cours, puis affiche-les :</p>
            <pre class="bloc-code"><code>x1 = -1.0
x2 = 2.5</code></pre>`,
          depart: `from math import sqrt\n\na = 2\nb = -3\nc = -5\ndelta = b ** 2 - 4 * a * c\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bx1\\s*=[^\\n]*sqrt\\s*\\(\\s*delta\\s*\\)", message: "x1 se calcule avec sqrt(delta)." },
              { motif: "\\bx2\\s*=[^\\n]*sqrt\\s*\\(\\s*delta\\s*\\)", message: "x2 se calcule avec sqrt(delta)." },
              { motif: "/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "Le dénominateur 2a doit être entre parenthèses : / (2 * a)." },
            ],
            codeAbsent: [
              { motif: "-1\\.0|2\\.5", message: "Les racines doivent être calculées par Python." },
            ],
            sortie: "x1 = -1.0\nx2 = 2.5",
            tests: `assert abs(x1 + 1) < 1e-9, "x1 doit valoir (-b - √Δ) / (2a), soit -1"\nassert abs(x2 - 2.5) < 1e-9, "x2 doit valoir (-b + √Δ) / (2a), soit 2.5"`,
          },
          felicitation: "Les formules du cours, parenthèses comprises. ✨",
          indices: [
            "Pour <code>x1</code> : moins <code>b</code>, moins la racine de <code>delta</code>, le tout divisé par 2 fois <code>a</code>. Pour <code>x2</code>, la même chose avec un plus.",
            "Mets des parenthèses autour du numérateur, et d'autres autour de <code>2 * a</code>.",
            "Puis deux <code>print</code>, avec les textes <code>\"x1 =\"</code> et <code>\"x2 =\"</code> suivis des variables.",
          ],
          apres: `<span class="chapo">Vérifie toujours</span>
            2 × (−1)² − 3 × (−1) − 5 = 2 + 3 − 5 = 0 : −1 est bien une racine. Tu peux
            faire vérifier Python lui-même : <code>print(2 * x2 ** 2 - 3 * x2 - 5)</code>
            doit afficher <code>0.0</code>.`,
        },

        {
          id: "d11",
          type: "prediction",
          titre: "Sans les parenthèses",
          contenu: `<p>Un élève a oublié les parenthèses. Avec <code>a = 2</code>,
            <code>b = -3</code> et <code>delta = 49</code>, que vaut son résultat ?</p>`,
          code: `x2 = -b + sqrt(delta) / 2 * a\nprint(x2)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>2.5</code>",
              explication: "Ce serait le bon résultat, mais les priorités ne s'appliquent pas comme dans la fraction." },
            { texte: "<code>10.0</code>", correct: true,
              explication: "Oui : Python calcule 7 / 2 = 3.5, puis 3.5 × 2 = 7, puis 3 + 7 = 10. Seule la racine est divisée, et elle est ensuite multipliée par a !" },
            { texte: "<code>0.625</code>",
              explication: "Il faudrait que la division porte sur tout le numérateur, et par 2a : ce n'est pas ce qu'écrit cette ligne." },
            { texte: "une erreur",
              explication: "La ligne est correcte pour Python : il calcule simplement autre chose que ce qu'on voulait." },
          ],
          apres: `<span class="chapo">Une erreur silencieuse</span>
            Python ne signale rien : le programme tourne, le résultat est faux. Contre ce
            genre d'erreur, une seule parade : <strong>vérifier</strong> le résultat, en
            remplaçant <em>x</em> par la valeur trouvée dans le trinôme.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>from math import sqrt              # une fois, en haut du programme

delta = b ** 2 - 4 * a * c
if delta > 0:                      # deux points en fin de ligne
    x1 = (-b - sqrt(delta)) / (2 * a)
    x2 = (-b + sqrt(delta)) / (2 * a)
    print("Deux racines :", x1, "et", x2)
elif delta == 0:                   # deux signes égal pour comparer
    print("Une racine double :", -b / (2 * a))
else:                              # tous les autres cas
    print("Aucune racine réelle")</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>tester une égalité</td><td><code>==</code> (et <code>!=</code> pour « différent »)</td></tr>
              <tr><td>⩽ ou ⩾</td><td><code>&lt;=</code> ou <code>&gt;=</code></td></tr>
              <tr><td>deux cas</td><td><code>if … :</code> puis <code>else:</code></td></tr>
              <tr><td>trois cas ou plus</td><td><code>if</code>, un ou plusieurs <code>elif</code>, <code>else</code></td></tr>
              <tr><td>√<em>x</em></td><td><code>sqrt(x)</code>, après <code>from math import sqrt</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>un seul signe égal dans la condition : <code>SyntaxError</code> ;</li>
                <li>les deux points oubliés en fin de ligne : <code>SyntaxError</code> ;</li>
                <li>un bloc mal décalé : <code>IndentationError</code>, ou pire, une ligne
                qui s'exécute quand il ne faut pas ;</li>
                <li>les parenthèses de la fraction oubliées : un résultat faux, sans message.</li>
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
          titre: "L'ordre des conditions",
          contenu: `<p>Ce programme doit donner une mention au bac. Quelle est la mention
            affichée pour une moyenne de 15 ?</p>`,
          code: `moyenne = 15\nif moyenne >= 10:\n    print("Passable")\nelif moyenne >= 12:\n    print("Assez bien")\nelif moyenne >= 14:\n    print("Bien")\nelse:\n    print("Ajourné")`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>Bien</code>",
              explication: "C'est ce qu'on voudrait. Mais Python s'arrête à la première condition vraie." },
            { texte: "<code>Passable</code>", correct: true,
              explication: "Oui : 15 &gt;= 10 est vrai, donc Python exécute le premier bloc et ignore tous les elif suivants." },
            { texte: "<code>Passable</code>, <code>Assez bien</code> puis <code>Bien</code>",
              explication: "Avec if / elif / else, un seul bloc est exécuté : celui de la première condition vraie." },
            { texte: "<code>Ajourné</code>",
              explication: "Le else n'est exécuté que si toutes les conditions précédentes sont fausses." },
          ],
          apres: `<span class="chapo">Du plus exigeant au moins exigeant</span>
            Pour que ce programme fonctionne, il faut tester d'abord <code>moyenne &gt;=
            14</code>, puis <code>&gt;= 12</code>, puis <code>&gt;= 10</code>. Avec des
            seuils, l'ordre des conditions compte.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "La valeur absolue",
          contenu: `
            <p>La valeur absolue d'un nombre est ce nombre sans son signe :
            |−7,5| = 7,5 et |3| = 3. Autrement dit : si <em>x</em> est négatif, on prend
            son opposé −<em>x</em> ; sinon, on garde <em>x</em>.</p>
            <p>Avec un <code>if … else</code>, range la valeur absolue de <code>x</code>
            dans une variable <code>v</code>, puis affiche :</p>
            <pre class="bloc-code"><code>Valeur absolue : 7.5</code></pre>
            <p>Python possède déjà une fonction <code>abs</code>, mais ici, c'est à toi
            de faire le travail.</p>`,
          depart: `x = -7.5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b[^\\n]*\\bx\\b[^\\n]*:", message: "Le if doit tester le signe de x." },
              { motif: "\\belse\\s*:", message: "Il faut un else pour le cas où x est positif." },
              { motif: "\\bv\\s*=\\s*-\\s*x\\b", message: "Dans le cas négatif, v reçoit l'opposé de x." },
              { motif: "print\\s*\\([^\\n]*,\\s*v\\s*\\)", message: "Affiche le texte puis la variable v." },
            ],
            codeAbsent: [
              { motif: "\\babs\\s*\\(", message: "N'utilise pas abs : écris toi-même le if." },
              { motif: "7\\.5\\s*\\)|=\\s*7\\.5", message: "La valeur absolue doit être calculée à partir de x." },
            ],
            sortie: "Valeur absolue : 7.5",
            tests: `assert v == 7.5, "v doit valoir 7.5, l'opposé de -7.5"`,
          },
          felicitation: "La définition du cours, traduite telle quelle. 📐",
          indices: [
            "Deux cas : <code>x</code> strictement négatif, ou non. Dans chacun, une affectation de <code>v</code>.",
            "Si <code>x &lt; 0</code>, <code>v</code> reçoit <code>-x</code> ; sinon, <code>v</code> reçoit <code>x</code>.",
            "Le <code>print</code> vient après le <code>if … else</code>, <strong>sans décalage</strong> : il doit s'exécuter dans les deux cas.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Le programme complet",
          contenu: `
            <p>Réunis tout ce que tu as fait : selon le signe de Δ, le programme
            affiche</p>
            <ul>
              <li>si Δ &gt; 0 : <code>Deux racines :</code> suivi de <em>x</em><sub>1</sub>,
              du mot <code>et</code>, puis de <em>x</em><sub>2</sub> ;</li>
              <li>si Δ = 0 : <code>Une racine double :</code> suivi de
              −<em>b</em> / (2<em>a</em>) ;</li>
              <li>sinon : <code>Aucune racine réelle</code>.</li>
            </ul>
            <p>Pour <em>x</em>² − 5<em>x</em> + 6, la console doit montrer :</p>
            <pre class="bloc-code"><code>Deux racines : 2.0 et 3.0</code></pre>`,
          depart: `from math import sqrt\n\na = 1\nb = -5\nc = 6\ndelta = b ** 2 - 4 * a * c\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\s+delta\\s*>\\s*0\\s*:", message: "Le premier cas teste si delta est strictement positif." },
              { motif: "\\belif\\s+delta\\s*==\\s*0\\s*:", message: "Le deuxième cas teste si delta est égal à 0." },
              { motif: "\\belse\\s*:", message: "Le dernier cas se traite avec else." },
              { motif: "\\(\\s*-\\s*b\\s*-\\s*sqrt\\s*\\(\\s*delta\\s*\\)\\s*\\)\\s*/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "x1 = (-b - sqrt(delta)) / (2 * a), avec ses deux paires de parenthèses." },
              { motif: "\\(\\s*-\\s*b\\s*\\+\\s*sqrt\\s*\\(\\s*delta\\s*\\)\\s*\\)\\s*/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "x2 = (-b + sqrt(delta)) / (2 * a), avec ses deux paires de parenthèses." },
              { motif: "-\\s*b\\s*/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "La racine double vaut -b / (2 * a)." },
            ],
            sortie: "Deux racines : 2.0 et 3.0",
          },
          felicitation: "Un vrai solveur de second degré, en une dizaine de lignes. 🏆",
          indices: [
            "Reprends la structure de « Combien de racines ? » : un <code>if</code>, un <code>elif</code>, un <code>else</code>.",
            "Dans le bloc du <code>if</code>, calcule <code>x1</code> et <code>x2</code> comme dans « Les deux racines », puis un seul <code>print</code> avec quatre morceaux : le texte, <code>x1</code>, <code>\"et\"</code>, <code>x2</code>.",
            "Dans le bloc du <code>elif</code>, un <code>print</code> avec le texte et le calcul <code>-b / (2 * a)</code>. Toutes les lignes d'un bloc ont le même décalage.",
          ],
          apres: `<span class="chapo">Teste les trois cas</span>
            Avec <code>b = 2</code> et <code>c = 1</code>, ton programme doit annoncer une
            racine double, −1.0. Avec <code>c = 5</code>, aucune racine. Un programme
            n'est vraiment juste que si <strong>chacun</strong> de ses blocs l'est.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Pour 2<em>x</em>² + 4<em>x</em> + 2, Δ = 0. Ce programme devrait
            afficher :</p>
            <pre class="bloc-code"><code>Une racine double : -1.0</code></pre>
            <p>Il contient <strong>trois erreurs</strong> de natures différentes. Corrige-les
            une par une, en lisant les messages. Attention : la dernière ne provoque
            aucun message.</p>`,
          depart: `a = 2\nb = 4\nc = 2\ndelta = b ** 2 - 4 * a * c\nif delta = 0:\nprint("Une racine double :", -b / 2 * a)\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\s+delta\\s*==\\s*0\\s*:", message: "La condition doit comparer delta à 0 avec deux signes égal." },
              { motif: "\\n[ \\t]+print", message: "Le print doit être décalé sous le if." },
              { motif: "-\\s*b\\s*/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "La racine double vaut -b divisé par (2 * a), avec des parenthèses." },
            ],
            sortie: "Une racine double : -1.0",
          },
          felicitation: "Un signe égal, un décalage, des parenthèses : trois erreurs, trois natures. 🐞",
          indices: [
            "Première erreur : la condition du <code>if</code> utilise le mauvais signe pour comparer.",
            "Deuxième erreur : <code>IndentationError</code>. Le bloc du <code>if</code> doit être décalé de quatre espaces.",
            "Troisième erreur : le programme affiche <code>-4.0</code>. Sans parenthèses, Python divise par 2 puis <strong>multiplie</strong> par <code>a</code>.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le sommet de la parabole",
          contenu: `
            <p>La parabole d'équation <em>y</em> = <em>ax</em>² + <em>bx</em> + <em>c</em>
            a pour sommet le point de coordonnées (α ; β), avec
            <strong>α = −<em>b</em> / (2<em>a</em>)</strong> et β = <em>f</em>(α). Elle
            est tournée vers le haut si <em>a</em> &gt; 0, vers le bas sinon.</p>
            <p>Calcule <code>alpha</code> et <code>beta</code>, affiche-les, puis affiche
            le sens de la parabole avec un <code>if … else</code>. Pour
            2<em>x</em>² − 8<em>x</em> + 3 :</p>
            <pre class="bloc-code"><code>alpha = 2.0
beta = -5.0
Tournée vers le haut</code></pre>
            <p>Dans l'autre cas, le programme affichera <code>Tournée vers le bas</code>.</p>`,
          depart: `a = 2\nb = -8\nc = 3\n\n`,
          validation: {
            codeContient: [
              { motif: "\\balpha\\s*=\\s*-\\s*b\\s*/\\s*\\(\\s*2\\s*\\*\\s*a\\s*\\)", message: "alpha reçoit -b / (2 * a)." },
              { motif: "\\bbeta\\s*=[^\\n]*\\balpha\\b", message: "beta se calcule en remplaçant x par alpha dans le trinôme." },
              { motif: "\\bif\\s+a\\s*(>|>=)\\s*0\\s*:|\\bif\\s+a\\s*(<|<=)\\s*0\\s*:", message: "Le sens de la parabole dépend du signe de a : le if teste a." },
              { motif: "\\belse\\s*:", message: "Il faut un else pour l'autre sens." },
            ],
            codeAbsent: [
              { motif: "2\\.0|-5\\.0", message: "Les coordonnées doivent être calculées par Python." },
            ],
            sortie: "alpha = 2.0\nbeta = -5.0\nTournée vers le haut",
            tests: `assert abs(alpha - 2) < 1e-9, "alpha doit valoir -b / (2a), soit 2"\nassert abs(beta + 5) < 1e-9, "beta doit valoir f(alpha), soit -5"`,
          },
          felicitation: "Le sommet et l'allure de la parabole, sans tracer la courbe. ⛰️",
          indices: [
            "<code>alpha</code> se calcule comme la racine double : moins <code>b</code>, divisé par (2 fois <code>a</code>).",
            "<code>beta</code> : reprends l'expression <em>ax</em>² + <em>bx</em> + <em>c</em> en Python, en écrivant <code>alpha</code> à la place de <em>x</em>.",
            "Après les deux <code>print</code>, un <code>if a &gt; 0:</code> avec son <code>print</code> décalé, puis <code>else:</code> avec l'autre.",
          ],
          apres: `<span class="chapo">Le lien avec la forme canonique</span>
            Tu retrouves la forme canonique du cours : 2<em>x</em>² − 8<em>x</em> + 3 =
            2(<em>x</em> − 2)² − 5. Comme <em>a</em> &gt; 0, β = −5 est le
            <strong>minimum</strong> de la fonction, atteint en <em>x</em> = 2.`,
        },
      ],
    },
  ],
};

/* Séance 3 — Dialoguer et comparer.
 * Fiche T6. Prérequis : séances 1 et 2.
 * Les booléens sont installés ici, AVANT le if de la séance 4 : une condition
 * est d'abord une valeur qu'on peut afficher, pas seulement un test.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Dialoguer et comparer",
  sousTitre: "Poser des questions, obtenir des réponses vraies ou fausses",
  palier: "T6 — Variables, affectation, instruction conditionnelle",

  accroche: `Jusqu'ici tes programmes récitaient. Ils vont maintenant
    <strong>poser des questions</strong> et <strong>comparer</strong>. Deux nouveautés
    qui changent tout : sans elles, un programme fait toujours exactement la même chose.`,

  objectifs: [
    "demander une information à l'utilisateur avec <code>input()</code>",
    "convertir une saisie en nombre avec <code>int()</code> ou <code>float()</code>",
    "utiliser les comparaisons <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code>",
    "combiner des conditions avec <code>and</code>, <code>or</code> et <code>not</code>",
  ],

  motDeLaFin: `Tu sais fabriquer des valeurs vraies ou fausses. À la séance 4, tu vas
    t'en servir pour faire <em>choisir</em> ton programme.`,

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
          titre: "Demander quelque chose à l'utilisateur",
          contenu: `
            <p>En Scratch, tu avais le bloc <strong>demander « … » et attendre</strong>,
            suivi de la variable <em>réponse</em>. En Python, les deux tiennent en une ligne :</p>

            <pre class="bloc-code"><code>prenom = input("Comment t'appelles-tu ? ")</code></pre>

            <p>Ce qui se passe, dans l'ordre :</p>
            <ol>
              <li>Python affiche la question ;</li>
              <li>il <strong>attend</strong> que l'utilisateur tape quelque chose et valide ;</li>
              <li>ce qui a été tapé est rangé dans la variable <code>prenom</code>.</li>
            </ol>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Dans ce parcours</span>
              Quand ton programme demande une saisie, un petit curseur apparaît
              <strong>dans la console</strong>, en dessous. Tape ta réponse, puis
              appuie sur <kbd>Entrée</kbd>.
            </div>

            <p>L'espace à la fin de la question — <code>"… ? "</code> — n'est pas une faute
            de frappe : il évite que la réponse soit collée au point d'interrogation.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ton premier dialogue",
          contenu: `
            <p>Écris un programme qui demande son prénom à l'utilisateur, puis le salue.
            Par exemple, si on répond <em>Ada</em> :</p>
            <pre class="bloc-code"><code>Comment t'appelles-tu ? Ada
Bonjour Ada !</code></pre>`,
          depart: `# Demande le prénom, puis salue\n`,
          saisiesTest: ["Ada"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton programme doit demander quelque chose avec input()." },
              { motif: "print\\s*\\(", message: "Il faut ensuite afficher la salutation avec print()." },
            ],
            sortieRegex: "Bonjour\\s+\\S+",
            sortieRegexMessage: "Après la saisie, ton programme doit afficher « Bonjour » suivi du prénom.",
          },
          felicitation: "Ton programme parle avec l'utilisateur. 💬",
          indices: [
            "Ligne 1 : <code>prenom = input(\"Comment t'appelles-tu ? \")</code>.",
            "Ligne 2 : <code>print(\"Bonjour\", prenom, \"!\")</code>.",
          ],
          solution: `prenom = input("Comment t'appelles-tu ? ")\nprint("Bonjour", prenom, "!")\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Le piège d'input()",
          contenu: `<p>Un élève écrit ce programme et répond <code>15</code> à la question.</p>`,
          code: `age = input("Ton âge ? ")\nprint(age + 1)`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "Il affiche <code>16</code>",
              explication: "Ce serait le cas si age contenait un nombre. Mais input() ne renvoie jamais de nombre." },
            { texte: "Il affiche <code>151</code>",
              explication: "Bonne intuition sur le collage de textes… mais Python refuse de coller un texte et un nombre." },
            { texte: "Il s'arrête sur une <code>TypeError</code>", correct: true,
              explication: "Oui : <code>age</code> contient le <strong>texte</strong> \"15\", et Python ne sait pas ajouter 1 à un texte." },
            { texte: "Il affiche <code>15</code>",
              explication: "Non, il y a bien une addition demandée — qui échoue." },
          ],
          apres: `<span class="chapo">La règle absolue</span>
            <code>input()</code> renvoie <strong>toujours</strong> du texte, même si
            l'utilisateur tape des chiffres. Pour calculer avec, il faut convertir :
            <code>int(input(…))</code> pour un entier, <code>float(input(…))</code> pour un décimal.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Convertir la saisie",
          contenu: `
            <p>Demande son âge à l'utilisateur, puis annonce l'âge qu'il aura l'an prochain :</p>
            <pre class="bloc-code"><code>Quel âge as-tu ? 15
L'an prochain tu auras 16 ans.</code></pre>
            <p>Le 16 doit être <strong>calculé</strong>. Pense à la conversion.</p>`,
          depart: `age = input("Quel âge as-tu ? ")\n\n`,
          saisiesTest: ["15"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(", message: "La saisie est du texte : convertis-la avec int()." },
              { motif: "\\+\\s*1", message: "L'âge de l'an prochain, c'est l'âge actuel plus 1." },
            ],
            sortieRegex: "auras\\s+\\d+\\s+ans",
            sortieRegexMessage: "Ton programme doit afficher « L'an prochain tu auras … ans. »",
          },
          felicitation: "Saisie convertie, calcul réussi. 🔢",
          indices: [
            "Modifie la ligne 1 : <code>age = int(input(\"Quel âge as-tu ? \"))</code> — deux parenthèses fermantes.",
            "Puis <code>print(\"L'an prochain tu auras\", age + 1, \"ans.\")</code>.",
          ],
          solution: `age = int(input("Quel âge as-tu ? "))\nprint("L'an prochain tu auras", age + 1, "ans.")\n`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Le quatrième type : vrai ou faux",
          contenu: `
            <p>Tu connais <code>int</code>, <code>float</code> et <code>str</code>. Voici le
            dernier type de l'année, et le plus important pour la suite : le
            <strong>booléen</strong>, en Python <code>bool</code>.</p>

            <p>Il n'a que <strong>deux valeurs possibles</strong> : <code>True</code> (vrai)
            et <code>False</code> (faux). Avec une majuscule, et sans guillemets — ce ne sont
            pas des textes.</p>

            <p>On en fabrique avec les <strong>opérateurs de comparaison</strong> :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>En Python</th><th>Se lit</th><th>Exemple vrai</th></tr>
              <tr><td><code>==</code></td><td>est égal à</td><td><code>3 == 3</code></td></tr>
              <tr><td><code>!=</code></td><td>est différent de</td><td><code>3 != 4</code></td></tr>
              <tr><td><code>&lt;</code></td><td>est strictement inférieur à</td><td><code>3 &lt; 4</code></td></tr>
              <tr><td><code>&lt;=</code></td><td>est inférieur ou égal à</td><td><code>3 &lt;= 3</code></td></tr>
              <tr><td><code>&gt;</code></td><td>est strictement supérieur à</td><td><code>4 &gt; 3</code></td></tr>
              <tr><td><code>&gt;=</code></td><td>est supérieur ou égal à</td><td><code>4 &gt;= 4</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Un signe égal, ou deux ?</span>
              <code>=</code> <strong>range</strong> une valeur dans une variable.
              <code>==</code> <strong>demande</strong> si deux valeurs sont égales et répond
              <code>True</code> ou <code>False</code>. Confondre les deux est l'erreur numéro
              un de toute l'année.
            </div>

            <p>Et comme <code>True</code> est une valeur, on peut l'afficher :</p>
            <pre class="bloc-code"><code>print(3 &lt; 4)      # True
print(3 == 4)     # False</code></pre>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Fabriquer des booléens",
          contenu: `
            <p>Avec <code>a = 7</code> et <code>b = 12</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>a plus petit que b : True
a egal a b : False
a different de b : True</code></pre>
            <p>Interdit d'écrire <code>True</code> ou <code>False</code> toi-même : ils
            doivent être <strong>produits par des comparaisons</strong>.</p>`,
          depart: `a = 7\nb = 12\n\n`,
          validation: {
            codeAbsent: [
              { motif: "True|False", message: "True et False doivent venir de comparaisons, pas être tapés." },
            ],
            sortie: "a plus petit que b : True\na egal a b : False\na different de b : True",
          },
          felicitation: "Trois booléens fabriqués sur mesure. ✅",
          indices: [
            "<code>print(\"a plus petit que b :\", a &lt; b)</code>",
            "Pour l'égalité, deux signes égal : <code>a == b</code>.",
            "Pour la différence : <code>a != b</code>.",
          ],
          solution: `a = 7\nb = 12\n\nprint("a plus petit que b :", a < b)\nprint("a egal a b :", a == b)\nprint("a different de b :", a != b)\n`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Un signe égal, ou deux ?",
          contenu: `<p>Lis attentivement : la troisième ligne n'est pas une comparaison.</p>`,
          code: `a = 3\nb = 4\nprint(a == b)\na = b\nprint(a == b)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>False</code> puis <code>False</code>",
              explication: "La ligne <code>a = b</code> a changé la valeur de a : après elle, a et b sont égaux." },
            { texte: "<code>False</code> puis <code>True</code>", correct: true,
              explication: "Exactement. <code>a = b</code> range 4 dans a ; ensuite <code>a == b</code> est vrai." },
            { texte: "<code>True</code> puis <code>True</code>",
              explication: "Au départ a vaut 3 et b vaut 4 : ils ne sont pas égaux." },
            { texte: "Une erreur de syntaxe",
              explication: "Les deux écritures sont valides — elles ne font simplement pas la même chose." },
          ],
          apres: `<span class="chapo">Deux instructions très différentes</span>
            <code>a = b</code> <strong>modifie</strong> a. <code>a == b</code>
            <strong>interroge</strong> sans rien modifier.`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Combiner des conditions",
          contenu: `
            <p>Une seule comparaison ne suffit pas toujours. Trois mots permettent de les
            combiner — ce sont les blocs <em>et</em>, <em>ou</em>, <em>non</em> de Scratch :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot</th><th>Vrai quand…</th><th>Exemple</th></tr>
              <tr><td><code>and</code></td><td><strong>les deux</strong> conditions sont vraies</td><td><code>age &gt;= 12 and age &lt;= 17</code></td></tr>
              <tr><td><code>or</code></td><td><strong>au moins une</strong> des deux est vraie</td><td><code>jour == 6 or jour == 7</code></td></tr>
              <tr><td><code>not</code></td><td>la condition est <strong>fausse</strong></td><td><code>not (age &gt;= 18)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une erreur très fréquente</span>
              Pour dire « x est entre 5 et 10 », on n'écrit <strong>pas</strong>
              <code>5 &lt; x and &lt; 10</code>. Chaque comparaison doit être complète :
              <code>x &gt; 5 and x &lt; 10</code>.
            </div>

            <p>Comme en mathématiques, le <strong>ou</strong> de Python est inclusif :
            <code>True or True</code> vaut <code>True</code>.</p>`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Deux conditions à la fois",
          contenu: `
            <p>La température est rangée dans <code>temperature</code>. Affiche exactement :</p>
            <pre class="bloc-code"><code>Il fait bon : True
Il fait extreme : False</code></pre>
            <p>« Il fait bon » signifie <strong>entre 15 et 25 inclus</strong>.
            « Il fait extrême » signifie <strong>en dessous de 0 ou au-dessus de 35</strong>.</p>`,
          depart: `temperature = 18\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "« Entre 15 et 25 » demande deux conditions reliées par and." },
              { motif: "\\bor\\b", message: "« En dessous de 0 ou au-dessus de 35 » demande un or." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés, pas écrits." },
            ],
            sortie: "Il fait bon : True\nIl fait extreme : False",
          },
          felicitation: "and et or maîtrisés. 🌡️",
          indices: [
            "<code>temperature >= 15 and temperature <= 25</code>",
            "<code>temperature < 0 or temperature > 35</code>",
            "Chaque expression se met directement dans un <code>print</code>, après le texte et une virgule.",
          ],
          solution: `temperature = 18\n\nprint("Il fait bon :", temperature >= 15 and temperature <= 25)\nprint("Il fait extreme :", temperature < 0 or temperature > 35)\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>On écrit…</th></tr>
              <tr><td>demander un texte</td><td><code>nom = input("Question ? ")</code></td></tr>
              <tr><td>demander un entier</td><td><code>n = int(input("Question ? "))</code></td></tr>
              <tr><td>demander un décimal</td><td><code>x = float(input("Question ? "))</code></td></tr>
              <tr><td>tester une égalité</td><td><code>a == b</code></td></tr>
              <tr><td>tester une différence</td><td><code>a != b</code></td></tr>
              <tr><td>exiger les deux</td><td><code>condition1 and condition2</code></td></tr>
              <tr><td>accepter l'une ou l'autre</td><td><code>condition1 or condition2</code></td></tr>
              <tr><td>inverser</td><td><code>not condition</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le test de divisibilité</span>
              <code>n % 3 == 0</code> vaut <code>True</code> exactement quand <code>n</code>
              est un multiple de 3. Tu vas t'en servir très souvent — et en maths aussi,
              au chapitre sur les multiples et diviseurs.
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
          type: "code",
          titre: "Le convertisseur d'euros",
          contenu: `
            <p>Demande un montant en euros, puis affiche sa valeur en dollars, avec un taux
            de change de <strong>1,08</strong>. Par exemple :</p>
            <pre class="bloc-code"><code>Montant en euros ? 250
250.0 euros font 270.0 dollars</code></pre>
            <p>Un montant peut avoir des centimes : convertis avec <code>float</code>.</p>`,
          depart: `\n`,
          saisiesTest: ["250"],
          validation: {
            codeContient: [
              { motif: "float\\s*\\(", message: "Un montant peut être décimal : utilise float() pour convertir la saisie." },
              { motif: "input\\s*\\(", message: "Le montant doit être demandé avec input()." },
              { motif: "108|1\\.08", message: "Applique le taux de change de 1,08 — en Python, 1.08 avec un point." },
            ],
            sortieRegex: "\\d+(\\.\\d+)?\\s+dollars",
            sortieRegexMessage: "Ton programme doit afficher un montant suivi du mot « dollars ».",
          },
          indices: [
            "<code>euros = float(input(\"Montant en euros ? \"))</code>",
            "Multiplier par 1.08 donne parfois un résultat approximatif. Préfère <code>euros * 108 / 100</code>.",
          ],
          solution: `euros = float(input("Montant en euros ? "))\ndollars = euros * 108 / 100\nprint(euros, "euros font", dollars, "dollars")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "La moyenne, à la demande",
          contenu: `
            <p>Demande trois notes entières, puis affiche leur moyenne :</p>
            <pre class="bloc-code"><code>Note 1 ? 12
Note 2 ? 15
Note 3 ? 9
Moyenne : 12.0</code></pre>`,
          depart: `\n`,
          saisiesTest: ["12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input[\\s\\S]*input", message: "Il faut trois saisies, donc trois input()." },
              { motif: "int\\s*\\(", message: "Les saisies sont du texte : convertis-les avec int()." },
              { motif: "/\\s*3", message: "La moyenne de trois notes se divise par 3." },
            ],
            sortieContient: ["Moyenne"],
          },
          indices: [
            "Trois lignes du type <code>note1 = int(input(\"Note 1 ? \"))</code>.",
            "Attention aux parenthèses de la somme : <code>(note1 + note2 + note3) / 3</code>.",
          ],
          solution: `note1 = int(input("Note 1 ? "))\nnote2 = int(input("Note 2 ? "))\nnote3 = int(input("Note 3 ? "))\nprint("Moyenne :", (note1 + note2 + note3) / 3)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Est-ce un multiple ?",
          contenu: `
            <p>Avec <code>n = 91</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>91 est multiple de 7 : True
91 est multiple de 5 : False</code></pre>
            <p>Rappel : <code>n</code> est multiple de <code>d</code> quand le reste de la
            division est nul.</p>`,
          depart: `n = 91\n\n`,
          validation: {
            codeContient: [
              { motif: "%", message: "Le test de divisibilité utilise le reste %." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "91 est multiple de 7 : True\n91 est multiple de 5 : False",
          },
          felicitation: "Le test de divisibilité : au programme de maths, chapitre 11. 🔍",
          indices: [
            "« Multiple de 7 » se traduit par <code>n % 7 == 0</code>.",
            "<code>print(n, \"est multiple de 7 :\", n % 7 == 0)</code>",
          ],
          solution: `n = 91\n\nprint(n, "est multiple de 7 :", n % 7 == 0)\nprint(n, "est multiple de 5 :", n % 5 == 0)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Trois comparaisons",
          contenu: `
            <p>Avec <code>a = 15</code> et <code>b = 15</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>a > b : False
a < b : False
a == b : True</code></pre>
            <p>Un cas volontairement piégeux : deux valeurs identiques.</p>`,
          depart: `a = 15\nb = 15\n\n`,
          validation: {
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "a > b : False\na < b : False\na == b : True",
          },
          indices: [
            "Le texte à afficher contient les symboles : <code>print(\"a > b :\", a > b)</code>.",
            "Attention : le premier <code>&gt;</code> est <em>dans</em> les guillemets, le second non.",
          ],
          solution: `a = 15\nb = 15\n\nprint("a > b :", a > b)\nprint("a < b :", a < b)\nprint("a == b :", a == b)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Dans l'intervalle ou pas",
          contenu: `
            <p>Une note vaut <strong>14</strong>. Affiche exactement :</p>
            <pre class="bloc-code"><code>Note valide : True
Mention assez bien : True
Mention tres bien : False</code></pre>
            <p>Une note est valide entre 0 et 20 inclus. La mention assez bien va de 12 à 14
            inclus, la mention très bien à partir de 16.</p>`,
          depart: `note = 14\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "Un intervalle demande deux conditions reliées par and." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Note valide : True\nMention assez bien : True\nMention tres bien : False",
          },
          indices: [
            "<code>note >= 0 and note <= 20</code>",
            "Pour la mention assez bien : <code>note >= 12 and note <= 14</code>.",
            "La mention très bien n'a besoin que d'une seule comparaison.",
          ],
          solution: `note = 14\n\nprint("Note valide :", note >= 0 and note <= 20)\nprint("Mention assez bien :", note >= 12 and note <= 14)\nprint("Mention tres bien :", note >= 16)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs : le dialogue cassé",
          contenu: `
            <p>Ce programme doit doubler le nombre saisi. Il en contient
            <strong>deux erreurs</strong>. Avec la saisie <code>21</code>, il doit afficher :</p>
            <pre class="bloc-code"><code>Un nombre ? 21
Le double vaut 42</code></pre>`,
          depart: `nombre = input("Un nombre ? ")\ndouble = nombre = 2\nprint("Le double vaut", double)\n`,
          saisiesTest: ["21"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(", message: "Il manque la conversion de la saisie en nombre." },
            ],
            sortieRegex: "Le double vaut 42",
            sortieRegexMessage: "Avec 21 en entrée, ton programme doit afficher « Le double vaut 42 ».",
          },
          felicitation: "Conversion oubliée et signe égal de trop : deux classiques. 🐞",
          indices: [
            "Ligne 1 : la saisie est du texte, il faut la convertir.",
            "Ligne 2 : il y a deux signes <code>=</code> alors qu'il devrait y avoir une multiplication.",
          ],
          solution: `nombre = int(input("Un nombre ? "))\ndouble = nombre * 2\nprint("Le double vaut", double)\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Pair ou impair",
          contenu: `
            <p>Avec <code>n = 47</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>47 est pair : False
47 est impair : True</code></pre>
            <p>Pour la seconde ligne, utilise <code>not</code> : « impair » c'est
            exactement « pas pair ».</p>`,
          depart: `n = 47\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bnot\\b", message: "La seconde ligne doit utiliser not." },
              { motif: "%", message: "La parité se teste avec le reste de la division par 2." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "47 est pair : False\n47 est impair : True",
          },
          indices: [
            "<code>n % 2 == 0</code> dit si n est pair.",
            "<code>not (n % 2 == 0)</code> dit s'il est impair. Les parenthèses aident à la lecture.",
          ],
          solution: `n = 47\n\nprint(n, "est pair :", n % 2 == 0)\nprint(n, "est impair :", not (n % 2 == 0))\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "L'année bissextile",
          contenu: `
            <p>Une année est bissextile si elle est divisible par 4, <strong>sauf</strong>
            les années divisibles par 100 — mais celles qui sont divisibles par 400 le sont
            quand même. 1900 est donc un cas d'école.</p>
            <p>Avec <code>annee = 1900</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>1900 divisible par 4 : True
1900 divisible par 100 : True
1900 divisible par 400 : False
1900 est bissextile : False</code></pre>`,
          depart: `annee = 1900\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "La règle combine un and…" },
              { motif: "\\bor\\b", message: "… et un or." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "1900 divisible par 4 : True\n1900 divisible par 100 : True\n1900 divisible par 400 : False\n1900 est bissextile : False",
          },
          felicitation: "La règle grégorienne, en une ligne de Python. 📅",
          indices: [
            "Les trois premières lignes sont trois tests de divisibilité, comme à l'exercice 3.",
            "La règle complète : divisible par 4 <strong>et</strong> pas par 100, <strong>ou</strong> divisible par 400.",
            "<code>(annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0</code>",
          ],
          solution: `annee = 1900\n\nprint(annee, "divisible par 4 :", annee % 4 == 0)\nprint(annee, "divisible par 100 :", annee % 100 == 0)\nprint(annee, "divisible par 400 :", annee % 400 == 0)\nprint(annee, "est bissextile :", (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0)\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Le contrôle des droits",
          contenu: `
            <p>Demande son âge à l'utilisateur, puis affiche trois droits. Par exemple
            avec 17 :</p>
            <pre class="bloc-code"><code>Ton âge ? 17
Peut voter : False
Peut conduire seul : False
Est un adolescent : True</code></pre>
            <p>Voter : 18 ans ou plus. Conduire seul : 18 ans ou plus.
            Adolescent : entre 13 et 17 ans inclus.</p>`,
          depart: `\n`,
          saisiesTest: ["17"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "L'âge doit être demandé et converti : int(input(…))." },
              { motif: "\\band\\b", message: "« Entre 13 et 17 » demande un and." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortieRegex: "Est un adolescent : (True|False)",
            sortieRegexMessage: "Ton programme doit afficher les trois droits, dont « Est un adolescent ».",
          },
          felicitation: "Saisie, conversion, comparaisons combinées : tu as tout. 🪪",
          indices: [
            "<code>age = int(input(\"Ton âge ? \"))</code>",
            "<code>print(\"Peut voter :\", age >= 18)</code>",
            "Adolescent : <code>age >= 13 and age <= 17</code>.",
          ],
          solution: `age = int(input("Ton âge ? "))\n\nprint("Peut voter :", age >= 18)\nprint("Peut conduire seul :", age >= 18)\nprint("Est un adolescent :", age >= 13 and age <= 17)\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le triangle est-il rectangle ?",
          contenu: `
            <p>Un triangle a pour côtés <code>a = 3</code>, <code>b = 4</code> et
            <code>c = 5</code> — <code>c</code> étant le plus long.</p>
            <p>D'après la réciproque du théorème de Pythagore, il est rectangle exactement
            quand <em>a</em>² + <em>b</em>² = <em>c</em>². Affiche :</p>
            <pre class="bloc-code"><code>Triangle 3 4 5
Rectangle : True</code></pre>`,
          depart: `a = 3\nb = 4\nc = 5\n\n`,
          validation: {
            codeAbsent: [
              { motif: "True|False", message: "Le booléen doit être calculé." },
            ],
            sortie: "Triangle 3 4 5\nRectangle : True",
          },
          felicitation: "Pythagore en une comparaison. 📐",
          indices: [
            "Le carré de a s'écrit <code>a * a</code> ou <code>a ** 2</code>.",
            "<code>print(\"Rectangle :\", a * a + b * b == c * c)</code>",
          ],
          solution: `a = 3\nb = 4\nc = 5\n\nprint("Triangle", a, b, c)\nprint("Rectangle :", a * a + b * b == c * c)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le point est-il dans le disque ?",
          contenu: `
            <p>Un disque a pour centre l'origine et pour rayon <strong>5</strong>. Un point
            <em>(x ; y)</em> est dedans quand <em>x</em>² + <em>y</em>² ⩽ 25.</p>
            <p>Teste les deux points donnés et affiche exactement :</p>
            <pre class="bloc-code"><code>Le point (3, 4) est dans le disque : True
Le point (6, 2) est dans le disque : False</code></pre>`,
          depart: `rayon = 5\nx1 = 3\ny1 = 4\nx2 = 6\ny2 = 2\n\n`,
          validation: {
            codeContient: [
              { motif: "rayon", message: "Utilise la variable rayon plutôt que d'écrire 25." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Le point (3, 4) est dans le disque : True\nLe point (6, 2) est dans le disque : False",
          },
          felicitation: "Géométrie analytique et booléens : joli mélange. 🎯",
          indices: [
            "Le carré du rayon s'écrit <code>rayon * rayon</code>.",
            "<code>x1 * x1 + y1 * y1 <= rayon * rayon</code>",
            "Attention aux parenthèses <em>dans le texte</em> : <code>print(\"Le point (3, 4) est dans le disque :\", …)</code>.",
          ],
          solution: `rayon = 5\nx1 = 3\ny1 = 4\nx2 = 6\ny2 = 2\n\nprint("Le point (3, 4) est dans le disque :", x1 * x1 + y1 * y1 <= rayon * rayon)\nprint("Le point (6, 2) est dans le disque :", x2 * x2 + y2 * y2 <= rayon * rayon)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Rangés dans l'ordre ?",
          contenu: `
            <p>Trois nombres : <code>a = 3</code>, <code>b = 7</code>, <code>c = 7</code>.
            Affiche exactement :</p>
            <pre class="bloc-code"><code>Croissant au sens large : True
Strictement croissant : False</code></pre>
            <p>« Au sens large » autorise l'égalité, « strictement » non. La différence tient
            à un seul caractère.</p>`,
          depart: `a = 3\nb = 7\nc = 7\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "Vérifier un ordre sur trois nombres demande deux comparaisons reliées par and." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Croissant au sens large : True\nStrictement croissant : False",
          },
          felicitation: "Large ou strict : la nuance est bien vue. 📊",
          indices: [
            "Au sens large : <code>a <= b and b <= c</code>.",
            "Strictement : les mêmes comparaisons, sans le signe égal.",
          ],
          solution: `a = 3\nb = 7\nc = 7\n\nprint("Croissant au sens large :", a <= b and b <= c)\nprint("Strictement croissant :", a < b and b < c)\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le mot de passe",
          contenu: `
            <p>Le mot de passe attendu est <code>python2026</code>. Demande-le à
            l'utilisateur puis annonce si c'est le bon :</p>
            <pre class="bloc-code"><code>Mot de passe : python2026
Acces autorise : True</code></pre>
            <p>Les comparaisons fonctionnent aussi sur les textes : <code>==</code> teste
            si deux chaînes sont identiques, majuscules comprises.</p>`,
          depart: `attendu = "python2026"\n\n`,
          saisiesTest: ["python2026"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Le mot de passe doit être demandé avec input()." },
              { motif: "==", message: "La comparaison de deux textes se fait avec ==." },
              { motif: "attendu", message: "Compare la saisie à la variable attendu." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Le booléen doit être calculé." },
            ],
            sortieRegex: "Acces autorise : (True|False)",
            sortieRegexMessage: "Ton programme doit afficher « Acces autorise : » suivi du résultat.",
          },
          felicitation: "Les comparaisons marchent aussi sur les mots. 🔐",
          indices: [
            "<code>saisi = input(\"Mot de passe : \")</code>",
            "<code>print(\"Acces autorise :\", saisi == attendu)</code>",
          ],
          solution: `attendu = "python2026"\n\nsaisi = input("Mot de passe : ")\nprint("Acces autorise :", saisi == attendu)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "La table de vérité du ET",
          contenu: `
            <p>Ici, et seulement ici, tu as le droit d'écrire <code>True</code> et
            <code>False</code> : il s'agit d'explorer le comportement de <code>and</code>.</p>
            <p>Affiche exactement (attention aux espaces d'alignement) :</p>
            <pre class="bloc-code"><code>True  and True  : True
True  and False : False
False and True  : False
False and False : False</code></pre>
            <p>Les résultats de droite doivent être <strong>calculés</strong> par Python,
            pas recopiés dans le texte.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: ",\\s*True\\s+and\\s+True", message: "Le résultat doit être calculé : print(\"…\", True and True)." },
            ],
            sortie: "True  and True  : True\nTrue  and False : False\nFalse and True  : False\nFalse and False : False",
          },
          felicitation: "Une vraie table de vérité, produite par la machine. 🧮",
          indices: [
            "Quatre lignes : <code>print(\"True  and True  :\", True and True)</code>.",
            "Aligne en ajoutant des espaces dans le texte : <code>True</code> fait 4 lettres, <code>False</code> en fait 5.",
          ],
          solution: `print("True  and True  :", True and True)\nprint("True  and False :", True and False)\nprint("False and True  :", False and True)\nprint("False and False :", False and False)\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton questionnaire à toi",
          contenu: `
            <p>Défi libre. Écris un petit questionnaire qui pose <strong>au moins deux
            questions</strong> avec <code>input()</code> et affiche <strong>au moins deux
            booléens calculés</strong> à partir des réponses.</p>
            <p>Des idées : un test d'éligibilité (âge et permis), un quiz avec deux questions
            dont on vérifie les réponses, un calculateur d'IMC qui dit si l'on est dans la
            norme…</p>`,
          depart: `# Ton questionnaire\n`,
          saisiesTest: ["12", "8"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Ton questionnaire doit poser au moins deux questions." },
              { motif: "(==|!=|<=|>=|<|>)[\\s\\S]*(==|!=|<=|>=|<|>)", message: "Il doit afficher au moins deux résultats de comparaison." },
            ],
            sortieRegex: "(True|False)[\\s\\S]*(True|False)",
            sortieRegexMessage: "Ton programme doit afficher au moins deux booléens.",
          },
          felicitation: "Séance 3 terminée. Ton programme sait écouter et juger. 🏁",
          indices: [
            "Deux saisies, puis deux <code>print</code> contenant chacun une comparaison.",
            "Exemple : <code>print(\"Bonne réponse :\", reponse == 20)</code>.",
          ],
          solution: `age = int(input("Ton âge ? "))\nnote = int(input("Ta note sur 20 ? "))\n\nprint("Majeur :", age >= 18)\nprint("Note au-dessus de la moyenne :", note >= 10)\n`,
        },
      ],
    },
  ],
};

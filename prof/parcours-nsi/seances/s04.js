/* NSI — chapitre 1, séance 4 : comparaisons et opérateurs logiques.
 * Reprend les encadrés « Opérateurs de comparaisons », « Ne pas confondre = et == »,
 * « Opérateurs logiques » et « Conditions avec des booléens » du cours.
 * Les booléens sont installés AVANT le if : une condition est d'abord une valeur.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "Comparaisons et opérateurs logiques",
  sousTitre: "Fabriquer des vrais et des faux",
  palier: "Partie 2 — Prendre des décisions",

  accroche: `Avant de faire choisir un programme, il faut savoir lui poser une question.
    Une question, en Python, c'est une expression qui vaut <code>True</code> ou
    <code>False</code> — et cela s'affiche, se range dans une variable, se combine.`,

  objectifs: [
    "utiliser les six opérateurs de comparaison",
    "distinguer sans hésiter <code>=</code> et <code>==</code>",
    "combiner des conditions avec <code>and</code>, <code>or</code> et <code>not</code>",
    "simplifier une condition portant sur un booléen",
  ],

  motDeLaFin: `Tu sais fabriquer des conditions. À la séance 5, tu vas t'en servir pour
    faire bifurquer un programme.`,

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
          titre: "Une condition, c'est une valeur",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : condition</span>
              Une <strong>condition</strong> est une expression qui renvoie une valeur
              booléenne : <code>True</code> (vrai) ou <code>False</code> (faux).
            </div>

            <p>Tu as rencontré le type <code>bool</code> à la séance 2. Ce qui est nouveau,
            c'est qu'on peut en <strong>fabriquer</strong>, avec les opérateurs de
            comparaison :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr>
              <tr><td><code>==</code></td><td>égal à</td><td><code>x == 5</code></td></tr>
              <tr><td><code>!=</code></td><td>différent de</td><td><code>nom != "Alice"</code></td></tr>
              <tr><td><code>&lt;</code> &nbsp; <code>&gt;</code></td><td>inférieur / supérieur</td><td><code>a &lt; 10</code></td></tr>
              <tr><td><code>&lt;=</code> &nbsp; <code>&gt;=</code></td><td>inférieur ou égal / supérieur ou égal</td><td><code>x &gt;= 3</code></td></tr>
            </table>
            </div>

            <p>Ce sont presque les mêmes qu'en mathématiques. La différence : le résultat
            est une <strong>valeur</strong> qu'on peut afficher, ranger dans une variable,
            réutiliser.</p>

            <pre class="bloc-code"><code>print(3 &lt; 4)      # True
print(3 == 4)     # False

est_majeur = age &gt;= 18   # une variable booléenne</code></pre>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Fabriquer des booléens",
          contenu: `
            <p>Avec <code>a = 7</code> et <code>b = 12</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>a inférieur à b : True
a égal à b : False
a différent de b : True
a supérieur ou égal à b : False</code></pre>
            <p>Interdit d'écrire <code>True</code> ou <code>False</code> toi-même : ils
            doivent être <strong>produits par des comparaisons</strong>.</p>`,
          depart: `a = 7\nb = 12\n\n`,
          validation: {
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent venir de comparaisons, pas être tapés." },
            ],
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi des variables déjà définies." },
            ],
            sortie: "a inférieur à b : True\na égal à b : False\na différent de b : True\na supérieur ou égal à b : False",
          },
          felicitation: "Quatre questions posées à Python, quatre réponses. ✅",
          indices: [
            "Quatre <code>print</code>, chacun avec un texte, une virgule, puis une comparaison.",
            "Attention : l'égalité se teste avec <strong>deux</strong> signes égal.",
          ],
          solution: `a = 7\nb = 12\n\nprint("a inférieur à b :", a < b)\nprint("a égal à b :", a == b)\nprint("a différent de b :", a != b)\nprint("a supérieur ou égal à b :", a >= b)\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Un signe égal, ou deux ?",
          contenu: `<p>La troisième ligne n'est pas une comparaison. Lis attentivement.</p>`,
          code: `a = 3\nb = 4\nprint(a == b)\na = b\nprint(a == b)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>False</code> puis <code>False</code>",
              explication: "La ligne <code>a = b</code> a changé la valeur de a : après elle, a et b sont égaux." },
            { texte: "<code>False</code> puis <code>True</code>", correct: true,
              explication: "Exactement. <code>a = b</code> range 4 dans a ; ensuite, <code>a == b</code> est vrai." },
            { texte: "<code>True</code> puis <code>True</code>",
              explication: "Au départ a vaut 3 et b vaut 4 : ils ne sont pas égaux." },
            { texte: "une erreur de syntaxe",
              explication: "Les deux écritures sont valides — elles ne font simplement pas la même chose." },
          ],
          apres: `<span class="chapo">La règle, une fois pour toutes</span>
            <code>=</code> <strong>affecte</strong> une valeur à une variable et ne renvoie
            rien. <code>==</code> <strong>interroge</strong> et renvoie un booléen, sans
            rien modifier. Confondre les deux est l'erreur numéro un de l'année.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Combiner plusieurs conditions",
          contenu: `
            <p>Une seule comparaison ne suffit pas toujours. Trois mots permettent de les
            combiner : ce sont les <strong>opérateurs logiques</strong>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opérateur</th><th>Vrai quand…</th><th>Exemple</th></tr>
              <tr><td><code>and</code></td><td><strong>les deux</strong> conditions sont vraies</td><td><code>x &gt; 0 and x &lt; 10</code></td></tr>
              <tr><td><code>or</code></td><td><strong>au moins une</strong> des deux est vraie</td><td><code>x &lt; 5 or x &gt; 15</code></td></tr>
              <tr><td><code>not</code></td><td>la condition est <strong>fausse</strong></td><td><code>not (x &gt; 10)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les parenthèses</span>
              Elles ne sont pas toujours obligatoires, mais elles lèvent les ambiguïtés —
              surtout avec <code>not</code>. Dans le doute, mets-en : un code lisible vaut
              mieux qu'un code court.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'erreur la plus fréquente</span>
              Pour dire « x est entre 5 et 10 », on n'écrit <strong>pas</strong>
              <code>5 &lt; x and &lt; 10</code>. Chaque comparaison doit être
              <strong>complète</strong> : <code>x &gt; 5 and x &lt; 10</code>.
              <br><br>
              <em>(Python accepte aussi la forme mathématique <code>5 &lt; x &lt; 10</code>,
              mais c'est une particularité du langage : mieux vaut connaître d'abord la
              forme générale.)</em>
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "La table de vérité du ET",
          contenu: `<p>Les quatre combinaisons possibles de <code>and</code>.</p>`,
          code: `print(True and True)\nprint(True and False)\nprint(False and True)\nprint(False and False)`,
          question: "Combien de ces quatre lignes affichent True ?",
          options: [
            { texte: "aucune", explication: "La première combine deux valeurs vraies : elle est vraie." },
            { texte: "une seule", correct: true,
              explication: "Oui : <code>and</code> n'est vrai que si <strong>les deux</strong> opérandes le sont." },
            { texte: "deux", explication: "Ce serait le cas de <code>or</code>… non, <code>or</code> en donnerait trois." },
            { texte: "les quatre", explication: "Non, sinon l'opérateur ne servirait à rien." },
          ],
          apres: `<span class="chapo">Et pour <code>or</code> ?</span>
            C'est l'inverse : <code>or</code> est vrai dans <strong>trois</strong> cas sur
            quatre, et faux seulement quand les deux opérandes sont faux. Attention, le
            « ou » de Python est <strong>inclusif</strong> : <code>True or True</code> vaut
            <code>True</code>.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Deux conditions à la fois",
          contenu: `
            <p>Avec <code>temperature = 18</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Il fait bon : True
Il fait extrême : False
Il ne gèle pas : True</code></pre>
            <p>« Il fait bon » signifie <strong>entre 15 et 25 inclus</strong> ;
            « extrême » signifie <strong>en dessous de 0 ou au-dessus de 35</strong> ;
            « il ne gèle pas » doit s'écrire avec <code>not</code>.</p>`,
          depart: `temperature = 18\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "« Entre 15 et 25 » demande un and." },
              { motif: "\\bor\\b", message: "« En dessous de 0 ou au-dessus de 35 » demande un or." },
              { motif: "\\bnot\\b", message: "La troisième ligne doit utiliser not." },
              { motif: "\\btemperature\\b[\\s\\S]*\\btemperature\\b", message: "Sers-toi de la variable temperature." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Il fait bon : True\nIl fait extrême : False\nIl ne gèle pas : True",
          },
          felicitation: "and, or et not, dans la même minute. 🌡️",
          indices: [
            "Chaque comparaison doit être complète : deux comparaisons reliées par <code>and</code>.",
            "« Il gèle » signifie une température strictement négative ; « il ne gèle pas » est sa négation.",
          ],
          solution: `temperature = 18\n\nprint("Il fait bon :", temperature >= 15 and temperature <= 25)\nprint("Il fait extrême :", temperature < 0 or temperature > 35)\nprint("Il ne gèle pas :", not (temperature < 0))\n`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Conditions portant sur un booléen",
          contenu: `
            <p>Quand une variable contient <strong>déjà</strong> un booléen, il est inutile
            de la comparer à <code>True</code>.</p>

            <pre class="bloc-code"><code>a_obtenu_permis = True

# Ce qu'on écrit spontanément :
age &gt;= 18 and a_obtenu_permis == True

# Ce qu'écrivent les programmeurs :
age &gt;= 18 and a_obtenu_permis</code></pre>

            <p>Écrire <code>a_obtenu_permis == True</code> revient à demander « est-il vrai
            que c'est vrai ? ». Les deux écritures fonctionnent, mais la seconde dit la
            même chose en moins de mots.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Au lieu de…</th><th>On écrit…</th></tr>
              <tr><td><code>variable == True</code></td><td><code>variable</code></td></tr>
              <tr><td><code>variable == False</code></td><td><code>not variable</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Majuscule obligatoire</span>
              <code>True</code> et <code>False</code> commencent par une majuscule.
              <code>true</code> n'existe pas en Python : il provoque une
              <code>NameError</code>. C'est un piège classique quand on vient d'un autre
              langage.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Simplifier une condition",
          contenu: `
            <p>Ce programme contient <strong>deux erreurs</strong> et une
            <strong>maladresse</strong>. Répare-le et simplifie la condition pour obtenir :</p>
            <pre class="bloc-code"><code>Peut conduire seul : False</code></pre>`,
          depart: `age = 17\na_obtenu_permis = true\n\nprint("Peut conduire seul :", age >= 18 and a_obtenu_permis == True)\n`,
          validation: {
            codeContient: [
              { motif: "a_obtenu_permis\\s*=\\s*True", message: "En Python, le booléen vrai s'écrit True, avec une majuscule." },
              { motif: "\\band\\b", message: "Garde la combinaison des deux conditions." },
            ],
            codeAbsent: [
              { motif: "==\\s*True|True\\s*==", message: "Comparer un booléen à True est inutile : écris la variable seule." },
            ],
            sortie: "Peut conduire seul : False",
          },
          felicitation: "Une majuscule, une comparaison en trop : le code est propre. 🧹",
          indices: [
            "La ligne 2 utilise un mot qui n'existe pas en Python. Regarde sa première lettre.",
            "Dans la condition, une des deux moitiés se raccourcit sans rien changer au sens.",
          ],
          solution: `age = 17\na_obtenu_permis = True\n\nprint("Peut conduire seul :", age >= 18 and a_obtenu_permis)\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Ranger une condition dans une variable",
          contenu: `
            <p>Une condition est une valeur : elle peut donc être <strong>nommée</strong>.
            C'est souvent ce qui rend un programme lisible.</p>
            <p>Avec <code>note = 14</code> et <code>absences = 2</code>, crée trois variables
            booléennes puis affiche exactement :</p>
            <pre class="bloc-code"><code>Note suffisante : True
Assidu : True
Félicitations : True</code></pre>
            <p>« Note suffisante » : au moins 12. « Assidu » : au plus 3 absences.
            « Félicitations » : les deux à la fois.</p>`,
          depart: `note = 14\nabsences = 2\n\nnote_suffisante = \nassidu = \nfelicitations = \n\n`,
          validation: {
            codeContient: [
              { motif: "felicitations\\s*=[^\\n]*note_suffisante", message: "felicitations doit se construire à partir des deux booléens précédents." },
              { motif: "\\band\\b", message: "« Les deux à la fois » demande un and." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Note suffisante : True\nAssidu : True\nFélicitations : True",
          },
          felicitation: "Des conditions nommées : ton code se lit comme une phrase. 📖",
          indices: [
            "Les deux premières variables reçoivent chacune une comparaison.",
            "La troisième ne recompare rien : elle combine les deux premières.",
          ],
          solution: `note = 14\nabsences = 2\n\nnote_suffisante = note >= 12\nassidu = absences <= 3\nfelicitations = note_suffisante and assidu\n\nprint("Note suffisante :", note_suffisante)\nprint("Assidu :", assidu)\nprint("Félicitations :", felicitations)\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour tester…</th><th>On écrit…</th></tr>
              <tr><td>une égalité</td><td><code>a == b</code></td></tr>
              <tr><td>une différence</td><td><code>a != b</code></td></tr>
              <tr><td>un intervalle</td><td><code>x &gt;= 5 and x &lt;= 10</code></td></tr>
              <tr><td>une alternative</td><td><code>jour == 6 or jour == 7</code></td></tr>
              <tr><td>une négation</td><td><code>not (x &gt; 10)</code></td></tr>
              <tr><td>un booléen déjà là</td><td><code>a_le_permis</code> et non <code>… == True</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le test de divisibilité</span>
              <code>n % 3 == 0</code> vaut <code>True</code> exactement quand <code>n</code>
              est un multiple de 3. Tu vas t'en servir très souvent — parité, multiples,
              années bissextiles.
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
          titre: "Deux valeurs identiques",
          contenu: `
            <p>Un cas volontairement piégeux : <code>a = 15</code> et <code>b = 15</code>.
            Affiche exactement :</p>
            <pre class="bloc-code"><code>a > b : False
a < b : False
a == b : True
a >= b : True</code></pre>`,
          depart: `a = 15\nb = 15\n\n`,
          validation: {
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi des variables déjà définies." },
            ],
            sortie: "a > b : False\na < b : False\na == b : True\na >= b : True",
          },
          indices: [
            "Attention : le premier symbole de chaque ligne est <em>dans</em> les guillemets, le second non.",
            "L'égalité rend <code>&gt;=</code> vrai : « supérieur <strong>ou égal</strong> ».",
          ],
          solution: `a = 15\nb = 15\n\nprint("a > b :", a > b)\nprint("a < b :", a < b)\nprint("a == b :", a == b)\nprint("a >= b :", a >= b)\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Dans l'intervalle ou pas",
          contenu: `
            <p>Une note vaut <strong>14</strong>. Affiche exactement :</p>
            <pre class="bloc-code"><code>Note valide : True
Mention assez bien : True
Mention très bien : False</code></pre>
            <p>Valide : entre 0 et 20 inclus. Assez bien : entre 12 et 14 inclus.
            Très bien : à partir de 16.</p>`,
          depart: `note = 14\n\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "Un intervalle demande deux comparaisons reliées par and." },
              { motif: "\\bnote\\b[\\s\\S]*\\bnote\\b", message: "Sers-toi de la variable note." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Note valide : True\nMention assez bien : True\nMention très bien : False",
          },
          indices: [
            "Les deux premières lignes demandent chacune deux comparaisons.",
            "La troisième n'en demande qu'une seule.",
          ],
          solution: `note = 14\n\nprint("Note valide :", note >= 0 and note <= 20)\nprint("Mention assez bien :", note >= 12 and note <= 14)\nprint("Mention très bien :", note >= 16)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Multiples, parité, divisibilité",
          contenu: `
            <p>Avec <code>n = 91</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>91 est pair : False
91 est impair : True
91 est multiple de 7 : True
91 est multiple de 5 : False</code></pre>
            <p>La deuxième ligne doit utiliser <code>not</code>.</p>`,
          depart: `n = 91\n\n`,
          validation: {
            codeContient: [
              { motif: "%", message: "La divisibilité se teste avec le reste." },
              { motif: "\\bnot\\b", message: "« Impair » c'est « pas pair » : utilise not." },
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "91 est pair : False\n91 est impair : True\n91 est multiple de 7 : True\n91 est multiple de 5 : False",
          },
          felicitation: "Le reste de la division : l'outil de toutes les divisibilités. 🔍",
          indices: [
            "« Pair » se traduit par : le reste de la division par 2 est nul.",
            "Le nombre affiché en début de ligne doit venir de la variable, pas être retapé.",
          ],
          solution: `n = 91\n\nprint(n, "est pair :", n % 2 == 0)\nprint(n, "est impair :", not (n % 2 == 0))\nprint(n, "est multiple de 7 :", n % 7 == 0)\nprint(n, "est multiple de 5 :", n % 5 == 0)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois conditions cassées",
          contenu: `
            <p>Ce programme contient <strong>trois erreurs</strong>. Il doit afficher :</p>
            <pre class="bloc-code"><code>Est majeur : False
Est un ado : True
A le droit d'entrer : True</code></pre>
            <p>« Ado » : entre 13 et 17 ans inclus. « Droit d'entrer » : majeur
            <strong>ou</strong> accompagné.</p>`,
          depart: `age = 16\naccompagne = True\n\nprint("Est majeur :", age = 18)\nprint("Est un ado :", age >= 13 and <= 17)\nprint("A le droit d'entrer :", age >= 18 or accompagne == true)\n`,
          validation: {
            codeContient: [
              { motif: "\\band\\b", message: "Garde le and de la deuxième ligne." },
              { motif: "\\bor\\b", message: "Garde le or de la troisième ligne." },
            ],
            sortie: "Est majeur : False\nEst un ado : True\nA le droit d'entrer : True",
          },
          felicitation: "Affectation, comparaison incomplète, majuscule : le triplé. 🐞",
          indices: [
            "Ligne 4 : il manque un signe. Tester n'est pas affecter.",
            "Ligne 5 : la seconde comparaison est incomplète — de quoi parle le <code>&lt;= 17</code> ?",
            "Ligne 6 : un mot n'existe pas en Python. Et une fois corrigé, il devient inutile.",
          ],
          solution: `age = 16\naccompagne = True\n\nprint("Est majeur :", age == 18)\nprint("Est un ado :", age >= 13 and age <= 17)\nprint("A le droit d'entrer :", age >= 18 or accompagne)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La table de vérité du OU",
          contenu: `
            <p>Ici — et seulement ici — tu as le droit d'écrire <code>True</code> et
            <code>False</code> : il s'agit d'explorer le comportement de <code>or</code>.</p>
            <pre class="bloc-code sans-copie"><code>True  or True  : True
True  or False : True
False or True  : True
False or False : False</code></pre>
            <p>Les résultats de droite doivent être <strong>calculés</strong> par Python.
            L'alignement, lui, est un confort de lecture : un espace de plus ou de
            moins ne sera pas compté comme une faute.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              // Virgule ou accolade : print("…", True or True) et f"… {True or True}"
              // font tous deux calculer le résultat par Python — ce qui est l'exigence.
              { motif: "[,{]\\s*True\\s+or\\s+True", message: "Le résultat doit être calculé : print(\"…\", True or True)." },
            ],
            sortie: "True  or True  : True\nTrue  or False : True\nFalse or True  : True\nFalse or False : False",
            // L'alignement des colonnes est proposé, pas exigé : l'exercice porte
            // sur le « ou », pas sur le comptage des espaces.
            sortieStricte: false,
          },
          felicitation: "Trois vrais sur quatre : le « ou » de Python est bien inclusif. 🧮",
          indices: [
            "Quatre lignes, sur le modèle <code>print(\"True  or True  :\", True or True)</code>.",
            "Pour aligner la colonne de droite, ajoute des espaces dans le texte : <code>True</code> fait 4 lettres, <code>False</code> en fait 5.",
          ],
          solution: `print("True  or True  :", True or True)\nprint("True  or False :", True or False)\nprint("False or True  :", False or True)\nprint("False or False :", False or False)\n`,
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
          titre: "Les lois de De Morgan",
          contenu: `
            <p>Deux règles de logique, découvertes au XIX<sup>e</sup> siècle, que tout
            programmeur finit par rencontrer :</p>
            <p style="text-align:center">
              <em>non (A et B)</em> équivaut à <em>(non A) ou (non B)</em><br>
              <em>non (A ou B)</em> équivaut à <em>(non A) et (non B)</em>
            </p>
            <p>Vérifie-les par le calcul, sur les quatre combinaisons possibles, en
            affichant :</p>
            <pre class="bloc-code sans-copie"><code>True True : True True
True False : True True
False True : True True
False False : True True</code></pre>
            <p>Chaque ligne affiche les deux valeurs de départ, puis <strong>deux
            comparaisons</strong> : la première loi, puis la seconde. Si elles sont vraies
            partout, les lois tiennent.</p>`,
          depart: `# Les quatre combinaisons de a et b\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bnot\\b[\\s\\S]*\\bnot\\b", message: "Les lois s'écrivent avec des not." },
              { motif: "==", message: "Il s'agit de comparer deux expressions logiques." },
            ],
            sortie: "True True : True True\nTrue False : True True\nFalse True : True True\nFalse False : True True",
          },
          felicitation: "Deux lois de logique vérifiées par la machine. 🧠",
          indices: [
            "Quatre lignes, une par combinaison : <code>a = True</code>, <code>b = True</code>, puis l'affichage.",
            "La première loi s'écrit <code>not (a and b) == ((not a) or (not b))</code>.",
            "Tu peux aussi tout écrire dans quatre <code>print</code>, en remplaçant a et b par True ou False directement.",
          ],
          solution: `a = True\nb = True\nprint(a, b, ":", not (a and b) == ((not a) or (not b)), not (a or b) == ((not a) and (not b)))\n\na = True\nb = False\nprint(a, b, ":", not (a and b) == ((not a) or (not b)), not (a or b) == ((not a) and (not b)))\n\na = False\nb = True\nprint(a, b, ":", not (a and b) == ((not a) or (not b)), not (a or b) == ((not a) and (not b)))\n\na = False\nb = False\nprint(a, b, ":", not (a and b) == ((not a) or (not b)), not (a or b) == ((not a) and (not b)))\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le triangle rectangle",
          contenu: `
            <p>Un triangle a pour côtés <code>AB = 4</code>, <code>BC = 3</code> et
            <code>AC = 5</code>. D'après la réciproque du théorème de Pythagore, il est
            rectangle <strong>en B</strong> exactement quand
            <em>AC</em>² = <em>AB</em>² + <em>BC</em>².</p>
            <p>Affiche exactement :</p>
            <pre class="bloc-code"><code>Rectangle en A : False
Rectangle en B : True
Rectangle en C : False
Rectangle quelque part : True</code></pre>
            <p>💡 L'angle droit est au sommet <strong>opposé au plus grand côté</strong> :
            rectangle en A signifie que [BC] est l'hypoténuse.</p>`,
          depart: `AB = 4\nBC = 3\nAC = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bor\\b", message: "La dernière ligne combine les trois cas avec des or." },
              { motif: "==", message: "Le test de Pythagore est une égalité." },
            ],
            codeAbsent: [
              { motif: "True|False", message: "Les booléens doivent être calculés." },
            ],
            sortie: "Rectangle en A : False\nRectangle en B : True\nRectangle en C : False\nRectangle quelque part : True",
          },
          felicitation: "Pythagore en booléens. Tu es prêt pour l'exercice 10. 📐",
          indices: [
            "Le carré d'une longueur s'écrit <code>AB ** 2</code> ou <code>AB * AB</code>.",
            "Rectangle en A : l'hypoténuse est [BC], donc <code>BC ** 2 == AB ** 2 + AC ** 2</code>.",
            "La dernière ligne réutilise les trois conditions, reliées par des <code>or</code>.",
          ],
          solution: `AB = 4\nBC = 3\nAC = 5\n\nen_a = BC ** 2 == AB ** 2 + AC ** 2\nen_b = AC ** 2 == AB ** 2 + BC ** 2\nen_c = AB ** 2 == AC ** 2 + BC ** 2\n\nprint("Rectangle en A :", en_a)\nprint("Rectangle en B :", en_b)\nprint("Rectangle en C :", en_c)\nprint("Rectangle quelque part :", en_a or en_b or en_c)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton test d'éligibilité",
          contenu: `
            <p>Défi libre. Écris un programme qui <strong>demande au moins deux
            informations</strong> à l'utilisateur et affiche <strong>au moins trois
            booléens calculés</strong>, dont un combinant les autres avec
            <code>and</code> ou <code>or</code>.</p>
            <p>Des idées : éligibilité à une bourse, droit de conduire, admission à un
            concours, accès à un manège selon la taille et l'âge, validité d'un mot de passe
            selon sa longueur…</p>`,
          depart: `# Ton test d'éligibilité\n`,
          saisiesTest: ["17", "160"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Ton programme doit poser au moins deux questions." },
              { motif: "\\band\\b|\\bor\\b", message: "Un des booléens doit combiner les autres." },
              { motif: "(==|!=|<=|>=|<|>)[\\s\\S]*(==|!=|<=|>=|<|>)", message: "Il faut au moins deux comparaisons." },
            ],
            sortieRegex: "(True|False)[\\s\\S]*(True|False)[\\s\\S]*(True|False)",
            sortieRegexMessage: "Ton programme doit afficher au moins trois booléens.",
          },
          felicitation: "Séance 4 terminée. Tu sais poser des questions à un programme. 🏁",
          indices: [
            "Range chaque condition dans une variable au nom parlant : le code se lit tout seul.",
            "N'oublie pas de convertir les saisies numériques avec <code>int()</code> ou <code>float()</code>.",
          ],
          solution: `age = int(input("Ton âge ? "))\ntaille = int(input("Ta taille en cm ? "))\n\nassez_grand = taille >= 140\nassez_age = age >= 12\npeut_monter = assez_grand and assez_age\n\nprint("Assez grand :", assez_grand)\nprint("Assez âgé :", assez_age)\nprint("Peut monter dans le manège :", peut_monter)\n`,
        },
      ],
    },
  ],
};

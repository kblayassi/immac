/* NSI — chapitre 4, séance 11 : une chaîne est une séquence.
 * Reprend les sections 1 à 4 de « Les chaînes de caractères » (longueur et
 * indexation, immuabilité, concaténation et répétition, parcours, in) et les
 * exercices 21, 22 et 23.
 */

export default {
  id: "s11",
  numero: 11,
  titre: "Une chaîne est une séquence",
  sousTitre: "Indexation, immuabilité, concaténation et répétition",
  palier: "Partie 4 — Les chaînes de caractères",

  accroche: `Tu manipules des chaînes depuis ton tout premier <code>print("Bonjour")</code>.
    Il est temps de découvrir qu'une chaîne n'est pas un bloc insécable : c'est une
    <strong>séquence</strong> de caractères, exactement comme un tableau — et presque
    tout ce que tu sais faire sur une liste, tu sais déjà le faire sur une chaîne.`,

  objectifs: [
    "lire un caractère d'une chaîne avec son indice, et sa longueur avec <code>len()</code>",
    "comprendre qu'une chaîne est <strong>immuable</strong>, et fabriquer une nouvelle chaîne à la place",
    "concaténer avec <code>+</code>, répéter avec <code>*</code>, convertir avec <code>str()</code>",
    "parcourir une chaîne, et y chercher une sous-chaîne avec <code>in</code>",
  ],

  motDeLaFin: `Une chaîne se lit comme une liste, mais ne se modifie jamais : on en
    construit une nouvelle. À la séance 12, la dernière, on découpe les chaînes en
    morceaux avec les tranches, et on chiffre des messages secrets.`,

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
          titre: "Une suite de caractères",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : chaîne de caractères</span>
              Une <strong>chaîne de caractères</strong> (type <code>str</code>) est une
              suite <strong>ordonnée</strong> de caractères, chacun repérable par son
              <strong>indice</strong>. Un caractère est une lettre, un chiffre, un espace,
              une ponctuation, un emoji…
            </div>

            <p>Tout se passe comme pour une liste : <code>len()</code> donne la longueur,
            et les crochets donnent un caractère.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Caractère</th><td><code>P</code></td><td><code>Y</code></td><td><code>T</code></td><td><code>H</code></td><td><code>O</code></td><td><code>N</code></td></tr>
              <tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
              <tr><th>Indice négatif</th><td>−6</td><td>−5</td><td>−4</td><td>−3</td><td>−2</td><td>−1</td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>a = "Bonjour"
b = 'Bonjour'          # guillemets simples ou doubles : c'est pareil
vide = ""              # la chaîne vide : 0 caractère</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un caractère est… une chaîne</span>
              Python n'a pas de type « caractère » à part : <code>mot[0]</code> renvoie une
              chaîne de longueur 1.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Lire un mot",
          contenu: `
            <p>Affiche la longueur de <code>mot</code>, puis son premier caractère, puis
            son dernier, en les lisant dans la chaîne :</p>
            <pre class="bloc-code"><code>6
P
N</code></pre>`,
          depart: `mot = "PYTHON"\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*mot\\s*\\)", message: "La longueur se calcule avec len(mot)." },
              { motif: "mot\\s*\\[\\s*0\\s*\\]", message: "Le premier caractère est à l'indice 0." },
              { motif: "mot\\s*\\[\\s*-\\s*1\\s*\\]", message: "Le dernier caractère se lit avec l'indice -1." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"']", message: "N'écris pas les caractères à la main : lis-les dans mot." },
            ],
            sortie: "6\nP\nN",
          },
          felicitation: "len(), [0], [-1] : rien de nouveau, et pourtant c'est une chaîne. 🔤",
          indices: [
            "Trois <code>print</code> : une longueur, puis deux lectures avec des crochets.",
            "Le premier caractère est à l'indice 0 ; le dernier, sans compter, à l'indice -1.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Un caractère de trop",
          contenu: `<p>La chaîne compte six caractères. Lis ce programme sans
            l'exécuter.</p>`,
          code: `mot = "PYTHON"\nprint(mot[6])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>N</code>",
              explication: "N est le dernier caractère, mais il est à l'indice 5." },
            { texte: "rien : une ligne vide",
              explication: "Python ne renvoie pas une chaîne vide : il refuse franchement." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : les indices valides vont de 0 à 5. Python s'arrête avec <code>IndexError: string index out of range</code>." },
            { texte: "<code>P</code>",
              explication: "Python ne revient pas au début : un indice trop grand est une erreur." },
          ],
          apres: `<span class="chapo">Comme pour une liste</span>
            Le dernier indice valide est toujours <code>len(mot) - 1</code>. Même message,
            à un mot près : <code>string</code> au lieu de <code>list</code>.`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Changer une lettre ?",
          contenu: `<p>Avec une liste, <code>L[0] = …</code> remplace le premier élément.
            Essayons avec une chaîne.</p>`,
          code: `mot = "PYTHON"\nmot[0] = "C"\nprint(mot)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>CYTHON</code>",
              explication: "C'est ce que ferait une liste… mais une chaîne refuse toute modification." },
            { texte: "<code>CPYTHON</code>",
              explication: "Une affectation dans une case ne s'insère jamais : et ici, elle est même refusée." },
            { texte: "une erreur <code>TypeError</code>", correct: true,
              explication: "Oui : Python s'arrête avec <code>TypeError: 'str' object does not support item assignment</code>. Une chaîne ne se modifie pas." },
            { texte: "<code>PYTHON</code>",
              explication: "Python ne fait pas semblant : il ne passe pas la ligne sous silence, il s'arrête sur une erreur." },
          ],
          apres: `<span class="chapo">Une chaîne ne se modifie pas</span>
            Voici <strong>la</strong> différence essentielle avec les listes. L'étape
            suivante explique comment faire quand même.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Immuable : on fabrique une nouvelle chaîne",
          contenu: `
            <div class="encadre">
              <span class="chapo">Propriété : les chaînes sont immuables</span>
              Une chaîne est <strong>immuable</strong> : une fois créée, son contenu ne peut
              plus changer. Pour « modifier » un mot, on en <strong>fabrique un
              nouveau</strong>.
            </div>

            <pre class="bloc-code"><code>mot = "PYTHON"
nouveau = "C" + mot[1:]      # "C" assemblé avec "YTHON"
print(nouveau)               # CYTHON
print(mot)                   # PYTHON : l'original est intact</code></pre>

            <p><code>mot[1:]</code> désigne la chaîne <strong>à partir de l'indice 1</strong>,
            c'est-à-dire tout sauf le premier caractère. Ces « tranches » seront détaillées
            à la séance 12.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Liste (<code>list</code>)</th><th>Chaîne (<code>str</code>)</th></tr>
              <tr><td>ordonnée, indexée à partir de 0</td><td>✅</td><td>✅</td></tr>
              <tr><td><code>len()</code>, parcours <code>for</code>, <code>in</code></td><td>✅</td><td>✅</td></tr>
              <tr><td>concaténation avec <code>+</code></td><td>✅</td><td>✅</td></tr>
              <tr><td>modifiable : <code>L[i] = …</code>, <code>append()</code></td><td>✅</td><td>❌</td></tr>
              <tr><td>risque d'alias</td><td>⚠️ oui</td><td>non</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une bonne nouvelle, en réalité</span>
              Une chaîne ne pouvant pas changer, la partager entre deux variables ne
              présente aucun danger : tous les pièges d'alias de la séance 6 disparaissent.
            </div>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "De la lune à la dune",
          contenu: `
            <p>Fabrique la chaîne <code>nouveau</code> en remplaçant la première lettre de
            <code>mot</code> par un <code>"d"</code>, sans réécrire le reste du mot. Le
            programme affiche ensuite les deux chaînes :</p>
            <pre class="bloc-code"><code>dune
lune</code></pre>`,
          depart: `mot = "lune"\nnouveau = \n\nprint(nouveau)\nprint(mot)\n`,
          validation: {
            codeContient: [
              { motif: "mot\\s*\\[\\s*1\\s*:\\s*\\]", message: "Le reste du mot se lit avec mot[1:]." },
            ],
            codeAbsent: [
              { motif: "[\"']dune[\"']", message: "N'écris pas le résultat : fabrique-le à partir de mot." },
              { motif: "mot\\s*\\[\\s*0\\s*\\]\\s*=(?!=)", message: "Une chaîne ne se modifie pas : fabrique une nouvelle chaîne." },
            ],
            sortie: "dune\nlune",
          },
          felicitation: "Une nouvelle chaîne, et l'ancienne intacte. 🌙",
          indices: [
            "La nouvelle chaîne est un assemblage, avec <code>+</code>, de deux morceaux.",
            "Le premier morceau est la lettre <code>\"d\"</code> ; le second, tout <code>mot</code> sauf son premier caractère.",
          ],
        },

        {
          id: "d7",
          type: "cours",
          titre: "Concaténer et répéter",
          contenu: `
            <p>L'opérateur <code>+</code> <strong>concatène</strong> deux chaînes bout à
            bout ; l'opérateur <code>*</code> <strong>répète</strong> une chaîne :</p>

            <pre class="bloc-code"><code>prenom = "Ada"
nom = "Lovelace"
complet = prenom + " " + nom     # "Ada Lovelace" : l'espace s'écrit à la main
ligne = "-" * 20                 # "--------------------"</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">On ne concatène pas un nombre</span>
              <code>"J'ai " + 17 + " ans"</code> provoque une <code>TypeError</code>. Il
              faut d'abord <strong>convertir</strong> le nombre : <code>str(17)</code>.
              Ou plus simplement, utiliser les virgules de <code>print</code>, ou une
              f-string.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Un nom souligné",
          contenu: `
            <p>Construis le nom complet à partir de <code>prenom</code> et de
            <code>nom</code>, puis affiche-le, souligné d'une ligne de tirets
            <strong>exactement aussi longue</strong> que lui :</p>
            <pre class="bloc-code"><code>Ada Lovelace
------------</code></pre>
            <p>Ton programme doit rester juste si l'on change le prénom ou le nom.</p>`,
          depart: `prenom = "Ada"\nnom = "Lovelace"\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bprenom\\b[\\s\\S]*\\bprenom\\b", message: "Construis le nom complet à partir de la variable prenom." },
              { motif: "\\bnom\\b[\\s\\S]*\\bnom\\b", message: "Construis le nom complet à partir de la variable nom." },
              { motif: "[\"']-[\"']\\s*\\*|\\*\\s*[\"']-[\"']", message: "La ligne de tirets se fabrique en répétant \"-\" avec *." },
              { motif: "len\\s*\\(", message: "Le nombre de tirets se calcule avec len()." },
            ],
            codeAbsent: [
              { motif: "-{3,}", message: "N'écris pas les tirets à la main : répète \"-\" avec *." },
              { motif: "Ada Lovelace", message: "N'écris pas le nom complet : assemble-le à partir des deux variables." },
            ],
            sortie: "Ada Lovelace\n------------",
          },
          felicitation: "Un assemblage avec +, une répétition avec *, une longueur avec len(). ✍️",
          indices: [
            "Range le nom complet dans une variable : le prénom, un espace, le nom, assemblés avec <code>+</code>.",
            "La ligne de tirets répète <code>\"-\"</code> autant de fois que le nom complet compte de caractères.",
          ],
        },

        {
          id: "d9",
          type: "prediction",
          titre: "Deux fois trois",
          contenu: `<p>Lis cette ligne sans l'exécuter : l'un des 3 est entre
            guillemets.</p>`,
          code: `print("3" * 2, 3 * 2)`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "<code>6 6</code>",
              explication: "<code>\"3\"</code> est une chaîne : <code>*</code> la répète, il ne la multiplie pas." },
            { texte: "<code>33 6</code>", correct: true,
              explication: "Oui : la chaîne <code>\"3\"</code> répétée deux fois donne <code>\"33\"</code>, et le nombre 3 multiplié par 2 donne 6." },
            { texte: "<code>33 33</code>",
              explication: "Le second 3 n'a pas de guillemets : c'est un nombre, multiplié normalement." },
            { texte: "une erreur",
              explication: "Répéter une chaîne un nombre entier de fois est parfaitement valide." },
          ],
          apres: `<span class="chapo">Le type décide de l'opération</span>
            <code>+</code> et <code>*</code> n'ont pas le même sens selon le type :
            additionner ou multiplier des nombres, concaténer ou répéter des chaînes.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Parcourir une chaîne",
          contenu: `
            <p>Les deux parcours des listes fonctionnent à l'identique :</p>

            <pre class="bloc-code"><code>mot = "NSI"
for lettre in mot:                 # par caractère
    print(lettre)

for i in range(len(mot)):          # par indice
    print("Indice", i, ":", mot[i])</code></pre>

            <p>Et l'opérateur <code>in</code> va plus loin que pour une liste : il cherche
            une <strong>sous-chaîne</strong>, pas seulement un caractère.</p>

            <pre class="bloc-code"><code>phrase = "J'aime la NSI"
print("NSI" in phrase)       # True
print("maths" in phrase)     # False
print("a" in "aeiouy")       # True : pratique pour reconnaître une voyelle</code></pre>`,
        },

        {
          id: "d11",
          type: "code",
          titre: "Compter les voyelles",
          contenu: `
            <p>Compte les voyelles de <code>mot</code> avec un accumulateur : parcours le
            mot caractère par caractère, et teste chaque lettre avec
            <code>in "aeiouy"</code>.</p>
            <pre class="bloc-code"><code>Voyelles : 10</code></pre>`,
          depart: `mot = "anticonstitutionnellement"\n\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+mot\\b", message: "Parcours mot caractère par caractère : for lettre in mot." },
              { motif: "\\bin\\s*[\"'][aeiouy]+[\"']", message: "Teste chaque lettre avec in \"aeiouy\"." },
            ],
            codeAbsent: [
              { motif: "\\b10\\b", message: "Le nombre de voyelles doit être calculé." },
              { motif: "\\.\\s*count\\s*\\(", message: "Pas de count() : c'est un accumulateur qu'on attend." },
            ],
            sortie: "Voyelles : 10",
          },
          felicitation: "Le schéma de l'accumulateur marche aussi sur une chaîne. 🅰️",
          indices: [
            "Un compteur à 0 avant la boucle, un <code>print</code> après.",
            "Dans la boucle sur les lettres, le compteur augmente quand la lettre se trouve dans la chaîne des voyelles.",
          ],
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>mot = "PYTHON"
len(mot)                  # 6
mot[0], mot[-1]           # "P", "N"
nouveau = "C" + mot[1:]   # "CYTHON" : une NOUVELLE chaîne
"Ada" + " " + "Lovelace"  # concaténation
"-" * 5                   # "-----" : répétition
"J'ai " + str(17) + " ans"   # convertir avant de concaténer
"NSI" in "J'aime la NSI"  # True : recherche d'une sous-chaîne

for lettre in mot:        # parcours par caractère
    print(lettre)</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li><code>mot[0] = "C"</code> : <code>TypeError</code>, une chaîne est immuable ;</li>
                <li><code>"J'ai " + 17</code> : <code>TypeError</code>, il faut <code>str(17)</code> ;</li>
                <li>oublier l'espace en concaténant : <code>"Ada" + "Lovelace"</code> donne <code>"AdaLovelace"</code>.</li>
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
          titre: "Lire une chaîne",
          contenu: `<p>On considère la chaîne suivante.</p>`,
          code: `mot = "ORDINATEUR"`,
          question: "Que valent len(mot), mot[0], mot[4], mot[-1], et quel est le plus grand indice utilisable ?",
          options: [
            { texte: "10 ; O ; N ; R ; 9", correct: true,
              explication: "Oui : 10 caractères, d'indices 0 à 9. mot[0] vaut O, mot[4] vaut N (O-R-D-I-N), et le dernier caractère est R." },
            { texte: "10 ; O ; I ; R ; 10",
              explication: "mot[4] est le <strong>cinquième</strong> caractère, N ; et avec 10 caractères, le dernier indice est 9." },
            { texte: "9 ; O ; N ; R ; 9",
              explication: "ORDINATEUR compte 10 lettres : len(mot) vaut 10. C'est le dernier indice qui vaut 9." },
            { texte: "10 ; R ; N ; O ; 9",
              explication: "mot[0] est le premier caractère, O ; mot[-1] le dernier, R." },
          ],
          apres: `<span class="chapo">Longueur et dernier indice</span>
            Comme pour une liste : une chaîne de 10 caractères a des indices de 0 à 9. Le
            plus grand indice utilisable est <code>len(mot) - 1</code>.`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Deux tentatives sur ORDINATEUR",
          contenu: `<p>Toujours avec <code>mot = "ORDINATEUR"</code>, on essaie
            successivement <code>mot[10]</code>, puis <code>mot[0] = "A"</code>.</p>`,
          question: "Que se passe-t-il, et comment obtenir malgré tout \"ARDINATEUR\" ?",
          options: [
            { texte: "IndexError, puis TypeError ; on écrit nouveau = \"A\" + mot[1:]", correct: true,
              explication: "Oui : l'indice 10 n'existe pas, et une chaîne ne se modifie pas. On fabrique donc une nouvelle chaîne : le A, puis tout sauf le premier caractère." },
            { texte: "IndexError, puis la chaîne devient ARDINATEUR",
              explication: "Une chaîne est immuable : <code>mot[0] = \"A\"</code> provoque une <code>TypeError</code>." },
            { texte: "mot[10] renvoie R, puis TypeError ; on écrit mot = mot.append(\"A\")",
              explication: "<code>mot[10]</code> est hors limites, et <code>append()</code> n'existe pas pour les chaînes." },
            { texte: "IndexError, puis TypeError ; c'est impossible",
              explication: "On ne peut pas modifier la chaîne, mais on peut en fabriquer une nouvelle : <code>\"A\" + mot[1:]</code>." },
          ],
          apres: `<span class="chapo">Fabriquer plutôt que modifier</span>
            <code>mot = "A" + mot[1:]</code> est même possible : <code>mot</code> désigne
            alors une nouvelle chaîne. L'ancienne n'a pas été modifiée, elle a été
            remplacée.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Les initiales",
          contenu: `
            <p>Écris la fonction <code>initiales(prenom, nom)</code>, qui renvoie les
            initiales en majuscules, chacune suivie d'un point.</p>
            <pre class="bloc-code"><code>initiales("ada", "lovelace")    # renvoie "A.L."</code></pre>
            <p>La méthode <code>upper()</code> renvoie une <strong>nouvelle</strong> chaîne
            tout en majuscules : <code>"a".upper()</code> vaut <code>"A"</code>.</p>`,
          depart: `def initiales(prenom, nom):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "prenom\\s*\\[\\s*0\\s*\\]", message: "L'initiale du prénom est son caractère d'indice 0." },
              { motif: "nom\\s*\\[\\s*0\\s*\\]", message: "L'initiale du nom est son caractère d'indice 0." },
              { motif: "\\.\\s*upper\\s*\\(", message: "Mets les initiales en majuscules avec upper()." },
            ],
            tests: `assert initiales("ada", "lovelace") == "A.L.", "initiales('ada', 'lovelace') doit renvoyer 'A.L.'"\nassert initiales("Alan", "turing") == "A.T.", "initiales('Alan', 'turing') doit renvoyer 'A.T.'"\nassert initiales("grace", "Hopper") == "G.H.", "initiales('grace', 'Hopper') doit renvoyer 'G.H.'"`,
          },
          felicitation: "Indexation, upper() et concaténation : trois outils, une fonction. 🔠",
          indices: [
            "La réponse est un assemblage de quatre morceaux : une initiale, un point, une initiale, un point.",
            "Chaque initiale est le premier caractère du mot, passé par <code>upper()</code>.",
          ],
        },

        {
          id: "a4",
          type: "prediction",
          titre: "Construire caractère par caractère",
          contenu: `<p>Suis l'évolution de <code>resultat</code>, lettre après lettre.</p>`,
          code: `mot = "NSI"\nresultat = ""\nfor lettre in mot:\n    resultat = lettre + resultat\nprint(resultat)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>NSI</code>",
              explication: "Chaque lettre est placée <strong>devant</strong> ce qui a déjà été construit, pas derrière." },
            { texte: "<code>ISN</code>", correct: true,
              explication: "Oui : \"\" → \"N\" → \"SN\" → \"ISN\". Chaque nouvelle lettre passe devant : le programme inverse le mot." },
            { texte: "<code>I</code>",
              explication: "resultat garde ce qui a déjà été construit : il ne contient pas que la dernière lettre." },
            { texte: "<code>NNSSII</code>",
              explication: "Chaque tour ajoute une seule lettre." },
          ],
          apres: `<span class="chapo">Une chaîne comme accumulateur</span>
            On retrouve le schéma de l'accumulateur, avec une chaîne vide au départ.
            Ici, chaque lettre se place devant : quel que soit le mot, le programme
            l'<strong>inverse</strong>.`,
        },

        {
          id: "a5",
          type: "qcm",
          titre: "Devant ou derrière",
          contenu: `<p>Dans le programme précédent, on remplace la ligne 4 par
            <code>resultat = resultat + lettre</code>.</p>`,
          question: "Qu'affiche-t-il alors ?",
          options: [
            { texte: "<code>ISN</code>",
              explication: "Chaque lettre s'ajoute maintenant <strong>à la suite</strong> : l'ordre est conservé." },
            { texte: "<code>NSI</code>", correct: true,
              explication: "Oui : \"\" → \"N\" → \"NS\" → \"NSI\". En ajoutant chaque lettre à la suite, on reconstruit le mot à l'identique." },
            { texte: "une erreur, car une chaîne est immuable",
              explication: "<code>resultat + lettre</code> ne modifie aucune chaîne : il en fabrique une nouvelle, que <code>resultat</code> désigne ensuite." },
            { texte: "<code>N</code>",
              explication: "resultat accumule toutes les lettres, pas seulement la première." },
          ],
          apres: `<span class="chapo">Immuable, et pourtant elle grandit ?</span>
            Aucune chaîne n'est modifiée ici : à chaque tour, <code>resultat + lettre</code>
            fabrique une <strong>nouvelle</strong> chaîne, et la variable la désigne. C'est
            la seule façon de « transformer » une chaîne — et c'est pourquoi
            <code>mot[0] = "X"</code> ne pourrait pas remplacer ce programme.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs : la présentation",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Bonjour Ada
Tu as 17 ans
Ton prénom commence par A</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `prenom = "Ada"\nage = 17\nprint("Bonjour + prenom)\nprint("Tu as " + age + " ans")\nprint("Ton prénom commence par", prenom[1])\n`,
          validation: {
            codeContient: [
              { motif: "prenom\\s*\\[\\s*0\\s*\\]", message: "La première lettre du prénom est à l'indice 0." },
              { motif: "\\bprenom\\b[\\s\\S]*\\bprenom\\b[\\s\\S]*\\bprenom\\b", message: "Garde la variable prenom dans le message de bienvenue." },
            ],
            codeAbsent: [
              { motif: "[\"']\\s*\\+\\s*age\\b", message: "On ne concatène pas une chaîne et un nombre : convertis age avec str(), ou utilise des virgules." },
            ],
            sortie: "Bonjour Ada\nTu as 17 ans\nTon prénom commence par A",
          },
          felicitation: "Un guillemet, une conversion, un décalage : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : une chaîne n'est pas refermée, et il manque l'espace après Bonjour.",
            "Ensuite, une <code>TypeError</code> : on ne colle pas un nombre à une chaîne avec <code>+</code>. Convertis-le, ou passe aux virgules.",
            "Enfin, la première lettre affichée est un d : le premier caractère est à l'indice 0.",
          ],
        },

        {
          id: "a7",
          type: "code",
          titre: "Sans espaces",
          contenu: `
            <p>Écris la fonction <code>sans_espaces(phrase)</code>, qui renvoie une
            <strong>nouvelle</strong> chaîne : la phrase, sans aucun de ses espaces.</p>
            <pre class="bloc-code"><code>sans_espaces("J'aime la NSI")    # renvoie "J'aimelaNSI"</code></pre>`,
          depart: `def sans_espaces(phrase):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours la phrase caractère par caractère." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*(replace|split|join)\\s*\\(", message: "Pas de replace(), split() ni join() : construis la chaîne toi-même." },
            ],
            tests: `assert sans_espaces("J'aime la NSI") == "J'aimelaNSI", "sans_espaces(\\"J'aime la NSI\\") doit renvoyer \\"J'aimelaNSI\\""\nassert sans_espaces("abc") == "abc", "sans espace, la chaîne reste la même"\nassert sans_espaces("  a b  ") == "ab", "tous les espaces disparaissent, même au début et à la fin"\nassert sans_espaces("") == "", "la chaîne vide reste vide"`,
          },
          felicitation: "Une chaîne neuve, construite caractère par caractère. ✂️",
          indices: [
            "L'accumulateur est une chaîne vide, préparée avant la boucle et renvoyée après.",
            "Dans la boucle sur les caractères, on ajoute le caractère à la suite de l'accumulateur, sauf si c'est un espace.",
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
          titre: "Le cadre",
          contenu: `
            <p>Écris la fonction <code>cadre(mot)</code>, qui renvoie une
            <strong>liste de trois chaînes</strong> : les trois lignes d'un cadre autour
            du mot, avec un espace de chaque côté.</p>
            <pre class="bloc-code"><code>cadre("NSI")    # renvoie ["+-----+", "| NSI |", "+-----+"]</code></pre>
            <p>Le programme de départ affiche ensuite les trois lignes :</p>
            <pre class="bloc-code"><code>+-----+
| NSI |
+-----+</code></pre>`,
          depart: `def cadre(mot):\n    pass\n\n\nfor ligne in cadre("NSI"):\n    print(ligne)\n`,
          validation: {
            codeContient: [
              { motif: "[\"']-[\"']\\s*\\*|\\*\\s*[\"']-[\"']", message: "La ligne de tirets se fabrique en répétant \"-\" avec *." },
              { motif: "len\\s*\\(\\s*mot\\s*\\)", message: "Le nombre de tirets dépend de len(mot)." },
            ],
            sortie: "+-----+\n| NSI |\n+-----+",
            tests: `assert cadre("NSI") == ["+-----+", "| NSI |", "+-----+"], "cadre('NSI') doit renvoyer ['+-----+', '| NSI |', '+-----+']"\nassert cadre("Python") == ["+--------+", "| Python |", "+--------+"], "le cadre doit s'adapter à la longueur du mot"\nassert cadre("a") == ["+---+", "| a |", "+---+"], "cadre('a') doit renvoyer ['+---+', '| a |', '+---+']"`,
          },
          felicitation: "Un cadre sur mesure, quelle que soit la longueur du mot. 🖼️",
          indices: [
            "Entre les deux <code>+</code>, la ligne du haut compte autant de tirets que la ligne du milieu compte de caractères entre ses barres : le mot et ses deux espaces.",
            "Fabrique la ligne de bord une fois, dans une variable, puis renvoie la liste formée de cette ligne, de la ligne du mot, et de nouveau de cette ligne.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Le palindrome",
          contenu: `
            <p>Un <strong>palindrome</strong> se lit de la même façon dans les deux sens :
            « radar », « kayak », « été ». Écris la fonction
            <code>est_palindrome(mot)</code>, qui renvoie <code>True</code> si
            <code>mot</code> est un palindrome, en comparant ses caractères deux à deux :
            le premier avec le dernier, le deuxième avec l'avant-dernier… Elle doit
            s'arrêter dès qu'une paire diffère.</p>
            <pre class="bloc-code"><code>est_palindrome("radar")     # renvoie True
est_palindrome("python")    # renvoie False</code></pre>`,
          depart: `def est_palindrome(mot):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Compare les caractères deux à deux, avec une boucle." },
            ],
            codeAbsent: [
              { motif: "::\\s*-\\s*1", message: "Pas de tranche inversée : compare les caractères toi-même." },
              { motif: "\\breversed\\b", message: "Pas de reversed() : compare les caractères toi-même." },
            ],
            tests: `assert est_palindrome("radar") == True, "radar est un palindrome"\nassert est_palindrome("kayak") == True, "kayak est un palindrome"\nassert est_palindrome("python") == False, "python n'est pas un palindrome"\nassert est_palindrome("abba") == True, "abba est un palindrome, de longueur paire"\nassert est_palindrome("abca") == False, "abca n'est pas un palindrome : b et c diffèrent"\nassert est_palindrome("a") == True, "un mot d'une seule lettre est un palindrome"`,
          },
          felicitation: "Les deux bouts du mot, comparés jusqu'au milieu. 🔁",
          indices: [
            "Le caractère d'indice <code>i</code> se compare à celui d'indice <code>-1 - i</code> (ou <code>len(mot) - 1 - i</code>).",
            "Dès qu'une paire diffère, renvoie <code>False</code> ; si la boucle se termine sans différence, renvoie <code>True</code>. Parcourir la moitié du mot suffit.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre transformation",
          contenu: `
            <p>Invente une transformation de texte, et programme-la avec une
            <strong>chaîne comme accumulateur</strong>. Quelques idées : doubler chaque
            lettre (« bboonnjjoouurr »), remplacer les voyelles par des étoiles, insérer
            un tiret entre les lettres…</p>
            <ul>
              <li>pars d'une chaîne vide ;</li>
              <li>parcours un mot ou une phrase de ton choix, caractère par caractère ;</li>
              <li>affiche le résultat.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "=\\s*[\"'][\"']", message: "Pars d'une chaîne vide : resultat = \"\"." },
              { motif: "\\bfor\\s+\\w+\\s+in\\b", message: "Parcours ton texte caractère par caractère, avec une boucle for." },
              { motif: "\\b(\\w+)\\s*(\\+=|=\\s*\\1\\s*\\+|=[^\\n]*\\+\\s*\\1\\b)", message: "Fais grandir ta chaîne dans la boucle : resultat = resultat + …" },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ta transformation, ta chaîne neuve. ✨",
          indices: [
            "Commence par ton texte et une variable <code>resultat</code> vide.",
            "Dans la boucle, ajoute à <code>resultat</code> ce que devient chaque caractère ; après la boucle, affiche-le.",
          ],
        },
      ],
    },
  ],
};

/* NSI — chapitre 6, séance 7 : construire un dictionnaire au fil d'un parcours.
 * Reprend la section « Construire un dictionnaire au fil d'un parcours » du
 * cours (compter les occurrences, le chaînon manquant du chapitre 4, le schéma
 * à retenir) et les exercices 23, 24 et 30, avec l'analyse fréquentielle.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "Construire au fil d'un parcours",
  sousTitre: "Compter les occurrences",
  palier: "Partie 2 — Les dictionnaires",

  accroche: `Combien de fois chaque lettre apparaît-elle dans un texte ? Au chapitre 4,
    il aurait fallu vingt-six compteurs, donc vingt-six variables. Un dictionnaire
    offre autant de compteurs que nécessaire, chacun désigné par un nom : c'est
    <strong>le</strong> cas d'usage emblématique du dictionnaire.`,

  objectifs: [
    "partir d'un dictionnaire vide et le remplir dans une boucle",
    "appliquer le schéma <strong>tester la clé, puis incrémenter ou créer</strong>",
    "dérouler un comptage à la main, entrée par entrée",
    "réutiliser un comptage pour trouver l'élément le plus fréquent",
  ],

  motDeLaFin: `Tester la clé, puis incrémenter ou créer : ce motif te servira à compter
    des mots, des votes, des couleurs de pixels… La partie sur les dictionnaires
    s'achève. Fais le bilan, puis, dans la dernière partie, on
    <strong>combine</strong> p-uplets, listes et dictionnaires pour organiser de vraies
    données.`,

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
          titre: "Un compteur par lettre",
          contenu: `
            <p>On veut savoir combien de fois chaque lettre apparaît dans
            <code>"banane"</code>. Le résultat attendu est un dictionnaire : chaque lettre
            est une clé, son nombre d'apparitions la valeur.</p>

            <pre class="bloc-code"><code>{'b': 1, 'a': 2, 'n': 2, 'e': 1}</code></pre>

            <p>On ne connaît pas les lettres à l'avance : on part donc du dictionnaire
            <strong>vide</strong>, et on le remplit en parcourant le texte, une lettre à
            chaque tour de boucle.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le chaînon manquant du chapitre 4</span>
              Au chapitre 4, l'analyse des fréquences butait sur cet obstacle : il aurait
              fallu un compteur par lettre. Un dictionnaire, c'est exactement cela :
              autant de compteurs que nécessaire, chacun désigné par un nom plutôt que par
              un numéro.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Un premier essai",
          contenu: `<p>Voici une première tentative. Lis-la sans l'exécuter.</p>`,
          code: `compteurs = {}\nfor lettre in "abba":\n    compteurs[lettre] = 1\nprint(compteurs)`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "<code>{'a': 2, 'b': 2}</code>",
              explication: "C'est ce qu'on voudrait. Mais <code>compteurs[lettre] = 1</code> <strong>remplace</strong> la valeur par 1 à chaque rencontre : rien ne s'additionne." },
            { texte: "<code>{'a': 1, 'b': 1}</code>", correct: true,
              explication: "Oui : chaque lettre est bien enregistrée, mais sa valeur est remise à 1 à chaque fois. On sait <em>quelles</em> lettres apparaissent, pas combien de fois." },
            { texte: "<code>{'a': 1, 'b': 1, 'b': 1, 'a': 1}</code>",
              explication: "Une clé n'existe qu'une fois : la seconde écriture de <code>'b'</code> modifie l'entrée existante." },
            { texte: "une erreur, car le dictionnaire est vide",
              explication: "Écrire dans une clé absente la crée : partir du vide ne pose aucun problème." },
          ],
          apres: `<span class="chapo">Il faut augmenter, pas remplacer</span>
            Quand la lettre est déjà connue, il faut ajouter 1 à son compteur :
            <code>compteurs[lettre] = compteurs[lettre] + 1</code>.`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Un deuxième essai",
          contenu: `<p>Deuxième tentative : on augmente toujours le compteur. Lis-la sans
            l'exécuter.</p>`,
          code: `compteurs = {}\nfor lettre in "abba":\n    compteurs[lettre] = compteurs[lettre] + 1\nprint(compteurs)`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "<code>{'a': 2, 'b': 2}</code>",
              explication: "Il faudrait d'abord que le compteur existe. Au premier tour, <code>compteurs[\"a\"]</code> est lu… dans un dictionnaire vide." },
            { texte: "<code>{'a': 1, 'b': 1}</code>",
              explication: "Le programme ne va pas si loin : il s'arrête dès le premier tour." },
            { texte: "rien : le programme s'arrête sur une erreur", correct: true,
              explication: "Oui : <code>KeyError: 'a'</code>. À droite du <code>=</code>, on <strong>lit</strong> <code>compteurs[\"a\"]</code>, qui n'existe pas encore." },
            { texte: "<code>{}</code>",
              explication: "L'instruction de la boucle est bien exécutée — et c'est là qu'elle échoue." },
          ],
          apres: `<span class="chapo">Deux cas à distinguer</span>
            Le premier essai marchait pour une lettre <strong>nouvelle</strong>, le second
            pour une lettre <strong>déjà vue</strong>. Il faut donc les deux, avec un
            <code>if</code> pour choisir.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Le schéma à retenir",
          contenu: `
            <p>Pour chaque élément rencontré, deux cas seulement :</p>
            <ul>
              <li><strong>la clé existe déjà</strong> : on incrémente son compteur ;</li>
              <li><strong>elle n'existe pas encore</strong> : on la crée avec la valeur 1.</li>
            </ul>

            <pre class="bloc-code"><code>compteurs = {}                       # on part d'un dictionnaire vide
for element in donnees:
    if element in compteurs:         # déjà rencontré ?
        compteurs[element] = compteurs[element] + 1
    else:
        compteurs[element] = 1       # première rencontre : on crée l'entrée</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le motif le plus utile du chapitre</span>
              Tester l'existence de la clé, puis incrémenter ou initialiser : ce motif
              revient sans cesse — compter des mots, des notes, des votes, des couleurs.
              Apprends-le par cœur.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Compter les lettres",
          contenu: `
            <p>Écris la fonction <code>compter_lettres(texte)</code>, qui renvoie un
            dictionnaire associant chaque caractère du texte à son nombre
            d'occurrences.</p>
            <pre class="bloc-code"><code>compter_lettres("banane")    # renvoie {'b': 1, 'a': 2, 'n': 2, 'e': 1}</code></pre>`,
          depart: `def compter_lettres(texte):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "=\\s*\\{\\s*\\}", message: "Pars du dictionnaire vide, {}." },
              { motif: "\\bfor\\b", message: "Parcours le texte avec une boucle for." },
              { motif: "\\bif\\b[^\\n]*\\bin\\b", message: "Teste si le caractère est déjà une clé, avec if … in …" },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            codeAbsent: [
              { motif: "\\.count\\s*\\(|\\bCounter\\b", message: "Écris le comptage toi-même, avec le schéma de la séance." },
            ],
            tests: `assert compter_lettres("banane") == {"b": 1, "a": 2, "n": 2, "e": 1}, "compter_lettres(\\"banane\\") doit renvoyer {\\"b\\": 1, \\"a\\": 2, \\"n\\": 2, \\"e\\": 1}"\nassert compter_lettres("") == {}, "un texte vide donne un dictionnaire vide"\nassert compter_lettres("aaaa") == {"a": 4}, "compter_lettres(\\"aaaa\\") doit renvoyer {\\"a\\": 4}"\nassert compter_lettres("a b") == {"a": 1, " ": 1, "b": 1}, "l'espace est un caractère comme un autre : il est compté aussi"`,
          },
          felicitation: "Le schéma est en place : tu as écrit le cœur de l'analyse fréquentielle. 🔡",
          indices: [
            "Un dictionnaire vide avant la boucle, renvoyé après. La boucle parcourt le texte caractère par caractère.",
            "Dans la boucle, un <code>if … else</code> : si le caractère est déjà une clé, on augmente sa valeur de 1 ; sinon on crée l'entrée avec la valeur 1.",
          ],
          solution: `def compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n`,
        },

        {
          id: "d6",
          type: "qcm",
          titre: "Dérouler un comptage",
          contenu: `<p>On applique <code>compter_lettres</code> au mot <code>"abba"</code>,
            et on note le contenu de <code>compteurs</code> après chaque lettre lue.</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Lettre lue</th><th>Contenu de <code>compteurs</code></th></tr>
              <tr><td>départ</td><td><code>{}</code></td></tr>
              <tr><td><code>a</code></td><td><code>{'a': 1}</code></td></tr>
              <tr><td><code>b</code></td><td><code>{'a': 1, 'b': 1}</code></td></tr>
              <tr><td><code>b</code></td><td>?</td></tr>
              <tr><td><code>a</code></td><td>?</td></tr>
            </table>
            </div>`,
          question: "Que contient compteurs après les deux dernières lettres ?",
          options: [
            { texte: "<code>{'a': 1, 'b': 2}</code> puis <code>{'a': 2, 'b': 2}</code>", correct: true,
              explication: "Oui : le deuxième <code>b</code> incrémente son compteur, puis le dernier <code>a</code> incrémente le sien." },
            { texte: "<code>{'a': 1, 'b': 1, 'b': 1}</code> puis <code>{'a': 1, 'b': 1, 'b': 1, 'a': 1}</code>",
              explication: "Une clé n'existe qu'une fois : une lettre déjà vue augmente son compteur, elle ne crée pas d'entrée." },
            { texte: "<code>{'a': 1, 'b': 2}</code> puis <code>{'a': 1, 'b': 2}</code>",
              explication: "Le dernier <code>a</code> est une lettre déjà vue : son compteur passe à 2." },
            { texte: "<code>{'a': 2, 'b': 2}</code> puis <code>{'a': 3, 'b': 2}</code>",
              explication: "À la troisième lettre, c'est un <code>b</code> qui est lu : seul son compteur change." },
          ],
          apres: `<span class="chapo">Une ligne par tour</span>
            À chaque tour, <strong>une seule</strong> entrée change : celle de la lettre
            lue. Elle est créée si c'est sa première apparition, augmentée sinon.`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Deux propriétés du comptage",
          contenu: `<p>On appelle <code>compter_lettres(t)</code> sur un texte
            <code>t</code> quelconque.</p>`,
          question: "Laquelle de ces affirmations est toujours vraie ?",
          options: [
            { texte: "le nombre d'entrées du dictionnaire est égal à <code>len(t)</code>",
              explication: "Faux : pour <code>\"aaaa\"</code>, il n'y a qu'une entrée, <code>{'a': 4}</code>. Le nombre d'entrées est le nombre de caractères <strong>différents</strong>." },
            { texte: "la somme des valeurs du dictionnaire est égale à <code>len(t)</code>", correct: true,
              explication: "Oui : chaque caractère lu ajoute exactement 1 au total, quel que soit le compteur concerné. Pour <code>\"abba\"</code> : 2 + 2 = 4." },
            { texte: "toutes les valeurs du dictionnaire valent au moins 2",
              explication: "Faux : une lettre vue une seule fois a pour valeur 1, comme <code>'b'</code> dans <code>\"banane\"</code>." },
            { texte: "le dictionnaire contient toujours 26 entrées",
              explication: "Faux : seuls les caractères présents ont une entrée. C'est tout l'avantage sur vingt-six variables." },
          ],
          apres: `<span class="chapo">Une vérification gratuite</span>
            La somme des valeurs égale la longueur du texte : c'est un excellent test pour
            vérifier un comptage.`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def compter(donnees):
    compteurs = {}                        # 1. un dictionnaire vide
    for element in donnees:               # 2. un parcours
        if element in compteurs:          # 3. la clé existe ?
            compteurs[element] = compteurs[element] + 1   #   oui : on incrémente
        else:
            compteurs[element] = 1        #   non : on crée
    return compteurs</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pour aller plus loin : la version avec get()</span>
              <code>compteurs[element] = compteurs.get(element, 0) + 1</code> fait les deux
              cas en une ligne : si la clé est absente, <code>get()</code> renvoie 0.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>oublier le <code>else</code> : la valeur est remise à 1 juste après avoir été augmentée ;</li>
                <li>incrémenter sans tester : <code>KeyError</code> à la première rencontre ;</li>
                <li>placer le <code>return</code> dans la boucle : la fonction s'arrête après un seul caractère ;</li>
                <li>créer le dictionnaire vide dans la boucle : il repart de zéro à chaque tour.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 35,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Chasse aux bugs : le compteur",
          contenu: `
            <p>Cette fonction devrait compter les caractères d'un texte, mais
            <code>compter("banane")</code> ne renvoie pas
            <code>{'b': 1, 'a': 2, 'n': 2, 'e': 1}</code>. Elle contient <strong>deux
            erreurs</strong>, sans aucun message de Python : exécute-la et compare.</p>`,
          depart: `def compter(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        compteurs[lettre] = 1\n        return compteurs\n\n\nprint(compter("banane"))\n`,
          validation: {
            codeContient: [
              { motif: "\\belse\\s*:", message: "La création de l'entrée ne doit se faire que si la lettre est nouvelle : il manque un else." },
              { motif: "\\n    return\\b", message: "Le return doit venir après la boucle, au niveau du for." },
            ],
            sortie: "{'b': 1, 'a': 2, 'n': 2, 'e': 1}",
            tests: `assert compter("abba") == {"a": 2, "b": 2}, "compter(\\"abba\\") doit renvoyer {\\"a\\": 2, \\"b\\": 2}"\nassert compter("") == {}, "un texte vide donne un dictionnaire vide"`,
          },
          felicitation: "Un else oublié, un return trop indenté : les deux pièges du comptage. 🐞",
          indices: [
            "Exécute : le dictionnaire affiché ne contient qu'une entrée. Combien de tours de boucle la fonction fait-elle avant de renvoyer ?",
            "Une fois le <code>return</code> remis à sa place, toutes les valeurs valent 1 : après l'incrémentation, une ligne remet le compteur à 1. Elle ne doit s'exécuter que pour une lettre nouvelle.",
          ],
          solution: `def compter(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\nprint(compter("banane"))\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Dépouiller un vote",
          contenu: `
            <p>Les élèves ont voté pour la sortie de fin d'année ; chaque bulletin est le
            nom d'une destination. Écris la fonction <code>depouiller(bulletins)</code>,
            qui renvoie le dictionnaire des voix obtenues par chaque destination.</p>
            <pre class="bloc-code"><code>depouiller(["zoo", "musée", "zoo", "parc", "zoo"])
# renvoie {'zoo': 3, 'musée': 1, 'parc': 1}</code></pre>`,
          depart: `def depouiller(bulletins):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours les bulletins avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            codeAbsent: [
              { motif: "\\.count\\s*\\(|\\bCounter\\b", message: "Écris le comptage toi-même." },
            ],
            tests: `assert depouiller(["zoo", "musée", "zoo", "parc", "zoo"]) == {"zoo": 3, "musée": 1, "parc": 1}, "depouiller([\\"zoo\\", \\"musée\\", \\"zoo\\", \\"parc\\", \\"zoo\\"]) doit renvoyer {\\"zoo\\": 3, \\"musée\\": 1, \\"parc\\": 1}"\nassert depouiller([]) == {}, "sans bulletin, aucune voix"\nassert depouiller(["a"] * 7) == {"a": 7}, "sept bulletins identiques donnent sept voix"`,
          },
          felicitation: "Des mots au lieu de lettres : le schéma n'a pas changé d'une ligne. 🗳️",
          indices: [
            "C'est exactement <code>compter_lettres</code>, appliqué à une liste de mots au lieu d'un texte.",
            "Dictionnaire vide, boucle sur les bulletins, <code>if … in …</code> pour incrémenter ou créer, puis <code>return</code> après la boucle.",
          ],
          solution: `def depouiller(bulletins):\n    voix = {}\n    for choix in bulletins:\n        if choix in voix:\n            voix[choix] = voix[choix] + 1\n        else:\n            voix[choix] = 1\n    return voix\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Combien par classe ?",
          contenu: `
            <p>Chaque élève est décrit par le couple <code>(nom, classe)</code>. Écris la
            fonction <code>effectifs(eleves)</code>, qui renvoie le dictionnaire du nombre
            d'élèves de chaque classe. Déballe chaque couple dans la boucle.</p>
            <pre class="bloc-code"><code>effectifs([("Léa", "1A"), ("Tom", "1B"), ("Nadia", "1A")])
# renvoie {'1A': 2, '1B': 1}</code></pre>`,
          depart: `def effectifs(eleves):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s*,\\s*\\w+\\s+in\\b", message: "Déballe chaque couple directement dans la boucle : for nom, classe in …" },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            tests: `assert effectifs([("Léa", "1A"), ("Tom", "1B"), ("Nadia", "1A")]) == {"1A": 2, "1B": 1}, "effectifs([(\\"Léa\\", \\"1A\\"), (\\"Tom\\", \\"1B\\"), (\\"Nadia\\", \\"1A\\")]) doit renvoyer {\\"1A\\": 2, \\"1B\\": 1}"\nassert effectifs([]) == {}, "aucun élève, aucune classe"\nassert effectifs([("A", "T1"), ("B", "T1"), ("C", "T1")]) == {"T1": 3}, "trois élèves de T1 donnent {\\"T1\\": 3}"`,
          },
          felicitation: "Un déballage pour lire, un comptage pour ranger : p-uplets et dictionnaires ensemble. 🏫",
          indices: [
            "Après le <code>for</code>, deux variables : la boucle déballe chaque couple, comme avec <code>items()</code>.",
            "C'est la <strong>classe</strong> qu'on compte : c'est elle qui sert de clé dans le schéma habituel.",
          ],
          solution: `def effectifs(eleves):\n    compteurs = {}\n    for nom, classe in eleves:\n        if classe in compteurs:\n            compteurs[classe] = compteurs[classe] + 1\n        else:\n            compteurs[classe] = 1\n    return compteurs\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Ranger par initiale",
          contenu: `
            <p>Le même schéma sert aussi à <strong>regrouper</strong> : au lieu d'un
            compteur, chaque clé reçoit une <strong>liste</strong>, créée à la première
            rencontre et complétée ensuite. Écris la fonction
            <code>par_initiale(mots)</code>, qui renvoie le dictionnaire associant chaque
            initiale à la liste des mots qui commencent par elle, dans l'ordre.</p>
            <pre class="bloc-code"><code>par_initiale(["chat", "loup", "cerf", "lynx"])
# renvoie {'c': ['chat', 'cerf'], 'l': ['loup', 'lynx']}</code></pre>`,
          depart: `def par_initiale(mots):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.append\\s*\\(", message: "Quand l'initiale est déjà connue, ajoute le mot à sa liste avec append()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            tests: `assert par_initiale(["chat", "loup", "cerf", "lynx"]) == {"c": ["chat", "cerf"], "l": ["loup", "lynx"]}, "par_initiale([\\"chat\\", \\"loup\\", \\"cerf\\", \\"lynx\\"]) doit renvoyer {\\"c\\": [\\"chat\\", \\"cerf\\"], \\"l\\": [\\"loup\\", \\"lynx\\"]}"\nassert par_initiale([]) == {}, "aucun mot, aucune initiale"\nassert par_initiale(["ours"]) == {"o": ["ours"]}, "un seul mot donne une liste d'un seul mot"`,
          },
          felicitation: "Le même schéma, avec une liste au lieu d'un compteur. 🗂️",
          indices: [
            "L'initiale d'un mot, c'est son premier caractère : <code>mot[0]</code>.",
            "Si l'initiale est déjà une clé, on ajoute le mot à la liste associée ; sinon on crée l'entrée avec une liste qui ne contient que ce mot.",
          ],
          solution: `def par_initiale(mots):\n    groupes = {}\n    for mot in mots:\n        initiale = mot[0]\n        if initiale in groupes:\n            groupes[initiale].append(mot)\n        else:\n            groupes[initiale] = [mot]\n    return groupes\n`,
          apres: `<span class="chapo">Une liste comme valeur</span>
            <code>groupes[initiale].append(mot)</code> se lit en deux temps :
            <code>groupes[initiale]</code> donne la liste, et <code>append()</code> la
            modifie sur place. Pas besoin de réaffecter l'entrée.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 25,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "La lettre la plus fréquente",
          contenu: `
            <p>Écris la fonction <code>lettre_la_plus_frequente(texte)</code>, qui renvoie
            le caractère qui revient le plus souvent dans un texte non vide. En cas
            d'égalité, on renvoie celui rencontré en <strong>premier</strong>.</p>
            <p>La fonction <code>compter_lettres</code> est donnée : la tienne doit
            l'appeler.</p>
            <pre class="bloc-code"><code>lettre_la_plus_frequente("banane")    # renvoie 'a' : a et n ont 2, a vient avant</code></pre>`,
          depart: `def compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef lettre_la_plus_frequente(texte):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+lettre_la_plus_frequente[\\s\\S]*\\bcompter_lettres\\s*\\(", message: "lettre_la_plus_frequente doit appeler compter_lettres." },
              { motif: "\\.items\\s*\\(\\s*\\)", message: "Parcours les entrées du dictionnaire obtenu, avec items()." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "Écris la recherche du maximum toi-même, sans max()." },
            ],
            tests: `assert lettre_la_plus_frequente("banane") == "a", "dans \\"banane\\", a et n apparaissent deux fois : a vient en premier"\nassert lettre_la_plus_frequente("abbb") == "b", "dans \\"abbb\\", b apparaît trois fois"\nassert lettre_la_plus_frequente("z") == "z", "un texte d'un seul caractère"\nassert lettre_la_plus_frequente("xyzzy") == "y", "dans \\"xyzzy\\", y et z apparaissent deux fois : y vient en premier"`,
          },
          felicitation: "Un comptage, puis un record : c'est l'analyse fréquentielle. 📈",
          indices: [
            "Commence par ranger le résultat de <code>compter_lettres(texte)</code> dans une variable.",
            "Puis c'est la recherche d'un maximum, sur les entrées de ce dictionnaire : une lettre record et son compteur record, qu'on remplace quand un compteur est <strong>strictement</strong> plus grand.",
            "Pourquoi strictement ? Les clés sont parcourues dans l'ordre de première apparition : garder le record en cas d'égalité, c'est garder la première lettre rencontrée.",
          ],
          solution: `def compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef lettre_la_plus_frequente(texte):\n    compteurs = compter_lettres(texte)\n    record = 0\n    lettre_record = ""\n    for lettre, n in compteurs.items():\n        if n > record:\n            record = n\n            lettre_record = lettre\n    return lettre_record\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Casser le code de César",
          contenu: `
            <p>Au chapitre 4, tu as chiffré des messages avec le code de César. On a
            intercepté ce message chiffré, sans connaître la clé :</p>
            <pre class="bloc-code"><code>wp dpncpe op npeep wpeecp pde pyqty apcnp</code></pre>
            <p>En français, la lettre la plus fréquente est presque toujours le
            <code>e</code>. Si la lettre la plus fréquente du message chiffré est
            <code>p</code>, c'est sans doute un <code>e</code> décalé : la clé est l'écart
            entre les deux.</p>
            <p>Écris la fonction <code>trouver_cle(secret)</code>, qui renvoie ce décalage,
            entre 0 et 25, en te servant des fonctions données. Puis affiche le message
            déchiffré.</p>`,
          depart: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef dechiffrer(message, decalage):\n    resultat = ""\n    for caractere in message:\n        resultat = resultat + decaler(caractere, -decalage)\n    return resultat\n\n\ndef compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef lettre_la_plus_frequente(texte):\n    compteurs = compter_lettres(texte)\n    record = 0\n    lettre_record = ""\n    for lettre, n in compteurs.items():\n        if n > record:\n            record = n\n            lettre_record = lettre\n    return lettre_record\n\n\ndef trouver_cle(secret):\n    pass\n\n\nsecret = "wp dpncpe op npeep wpeecp pde pyqty apcnp"\n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+trouver_cle[\\s\\S]*\\blettre_la_plus_frequente\\s*\\(", message: "trouver_cle doit appeler lettre_la_plus_frequente." },
              { motif: "def\\s+trouver_cle[\\s\\S]*\\brang\\s*\\(", message: "Le décalage se calcule avec les rangs des lettres : utilise rang()." },
              { motif: "%\\s*26[\\s\\S]*%\\s*26", message: "Le décalage doit rester entre 0 et 25 : pense au modulo 26." },
              { motif: "\\bdechiffrer\\s*\\(\\s*secret\\s*,\\s*trouver_cle\\s*\\(\\s*secret\\s*\\)\\s*\\)", message: "Affiche le message déchiffré avec la clé trouvée par trouver_cle(secret)." },
            ],
            codeAbsent: [
              { motif: "\\b11\\b", message: "La clé doit être trouvée par le programme, pas écrite à la main." },
            ],
            sortie: "le secret de cette lettre est enfin perce",
            tests: `assert trouver_cle(secret) == 11, "pour ce message, la clé trouvée doit être 11"\nassert trouver_cle("eeee") == 0, "si e est la lettre la plus fréquente, la clé est 0"\nassert trouver_cle("aaab") == 22, "si la lettre la plus fréquente est a, la clé est 22 : e décalé de 22 donne a"`,
          },
          felicitation: "Al-Kindi, IXᵉ siècle : l'analyse fréquentielle casse tous les César. 🔓",
          indices: [
            "Dans <code>trouver_cle</code>, deux rangs : celui de la lettre la plus fréquente du secret, et celui de <code>\"e\"</code>.",
            "La clé est leur différence, ramenée entre 0 et 25 avec <code>% 26</code> — une différence peut être négative.",
            "Sous la fonction, un <code>print</code> de ce que renvoie <code>dechiffrer</code> appelée avec le secret et la clé trouvée.",
          ],
          solution: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef dechiffrer(message, decalage):\n    resultat = ""\n    for caractere in message:\n        resultat = resultat + decaler(caractere, -decalage)\n    return resultat\n\n\ndef compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef lettre_la_plus_frequente(texte):\n    compteurs = compter_lettres(texte)\n    record = 0\n    lettre_record = ""\n    for lettre, n in compteurs.items():\n        if n > record:\n            record = n\n            lettre_record = lettre\n    return lettre_record\n\n\ndef trouver_cle(secret):\n    frequente = lettre_la_plus_frequente(secret)\n    return (rang(frequente) - rang("e")) % 26\n\n\nsecret = "wp dpncpe op npeep wpeecp pde pyqty apcnp"\nprint(dechiffrer(secret, trouver_cle(secret)))\n`,
          apres: `<span class="chapo">L'analyse fréquentielle</span>
            C'est la méthode inventée par le savant arabe <strong>Al-Kindi</strong> au
            IXᵉ siècle. En comparant les fréquences d'un texte chiffré à celles de la
            langue, on retrouve le décalage sans connaître la clé : elle a rendu obsolètes
            tous les chiffrements par substitution simple. Elle a ses limites : sur un
            message très court, ou si les espaces dominent, la lettre la plus fréquente
            n'est pas forcément un <code>e</code>.`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre comptage",
          contenu: `
            <p>À toi de choisir ce que tu comptes : les couleurs d'une liste de
            voitures, les résultats de lancers de dé que tu inventes, les mots d'une
            phrase… Écris une fonction qui construit le dictionnaire des occurrences avec
            le schéma de la séance, puis affiche chaque élément et son nombre
            d'apparitions avec une boucle sur <code>items()</code>.</p>`,
          depart: `# Ton comptage ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b", message: "Range ton comptage dans une fonction." },
              { motif: "=\\s*\\{\\s*\\}", message: "Pars du dictionnaire vide, {}." },
              { motif: "\\bif\\b[^\\n]*\\bin\\b", message: "Teste si la clé existe déjà, avec if … in …" },
              { motif: "\\.items\\s*\\(\\s*\\)", message: "Affiche le résultat avec une boucle sur items()." },
            ],
            codeAbsent: [
              { motif: "\\.count\\s*\\(|\\bCounter\\b", message: "Écris le comptage toi-même, avec le schéma de la séance." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Tes données, ton comptage : le schéma est à toi. ✨",
          indices: [
            "Une fonction qui reçoit une liste (ou un texte), part de <code>{}</code>, et applique le schéma « tester la clé, puis incrémenter ou créer ».",
            "Sous la fonction, une liste de données de ton choix, un appel, puis une boucle <code>for cle, n in ….items():</code> qui affiche chaque ligne.",
          ],
          solution: `def compter(donnees):\n    compteurs = {}\n    for element in donnees:\n        if element in compteurs:\n            compteurs[element] = compteurs[element] + 1\n        else:\n            compteurs[element] = 1\n    return compteurs\n\n\nvoitures = ["rouge", "bleue", "rouge", "noire", "rouge", "bleue"]\nfor couleur, n in compter(voitures).items():\n    print(couleur, ":", n)\n`,
        },
      ],
    },
  ],
};

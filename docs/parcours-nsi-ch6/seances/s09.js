/* NSI — chapitre 6, séance 9 : choisir la bonne structure.
 * Reprend la page « Tableau récapitulatif » (p-uplet, tableau, dictionnaire),
 * la conclusion du chapitre et l'exercice 22, puis des problèmes mixtes qui
 * combinent les trois structures.
 */

export default {
  id: "s09",
  numero: 9,
  titre: "Choisir la bonne structure",
  sousTitre: "P-uplet, tableau ou dictionnaire ?",
  palier: "Partie 3 — Organiser des données",

  accroche: `Tu connais maintenant trois façons de regrouper des valeurs. Laquelle
    choisir ? Deux questions suffisent presque toujours : les données
    doivent-elles <strong>changer</strong> ? Et les retrouve-t-on par leur
    <strong>position</strong> ou par leur <strong>nom</strong> ?`,

  objectifs: [
    "comparer p-uplet, tableau et dictionnaire sur la notation, la lecture et la modification",
    "choisir la structure adaptée à une situation, et le justifier",
    "combiner les trois structures dans un même programme",
  ],

  motDeLaFin: `Le chapitre est terminé : p-uplets, tableaux et dictionnaires n'ont plus
    de secret pour toi. Fais le bilan, puis attaque le projet
    <strong>Secret Santa</strong>, qui les réunit tous. Au chapitre suivant, les
    listes d'enregistrements deviennent des <strong>tables de données</strong>, qu'on
    apprendra à trier et à interroger. 📊`,

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
          titre: "Trois structures côte à côte",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>p-uplet</th><th>tableau (liste)</th><th>dictionnaire</th></tr>
              <tr><td>notation</td><td><code>(1, 8, 5)</code></td><td><code>[1, 8, 5]</code></td><td><code>{"a": 1, "b": 8}</code></td></tr>
              <tr><td>vide</td><td><code>()</code></td><td><code>[]</code></td><td><code>{}</code></td></tr>
              <tr><td>lecture</td><td>par indice : <code>t[0]</code></td><td>par indice : <code>L[0]</code></td><td>par clé : <code>d["a"]</code></td></tr>
              <tr><td><strong>modifiable ?</strong></td><td><strong>non</strong></td><td>oui</td><td>oui (les valeurs ; les clés sont immuables)</td></tr>
              <tr><td>types mélangés</td><td>oui, c'est sa raison d'être</td><td>en NSI, on s'en tient à un seul type</td><td>clés immuables, valeurs libres</td></tr>
              <tr><td><code>+</code> et <code>*</code></td><td>oui</td><td>oui</td><td>non : <code>TypeError</code></td></tr>
              <tr><td>longueur</td><td><code>len(t)</code></td><td><code>len(L)</code></td><td><code>len(d)</code>, en entrées</td></tr>
              <tr><td>méthodes</td><td>aucune à connaître</td><td><code>append()</code></td><td><code>keys()</code>, <code>values()</code>, <code>items()</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les deux questions décisives</span>
              <ol style="margin-bottom:0">
                <li>Les données vont-elles <strong>changer</strong> pendant le programme ?
                Si non, et qu'elles sont peu nombreuses, de rôles fixés : un
                <strong>p-uplet</strong>.</li>
                <li>Sinon, les retrouve-t-on par leur <strong>position</strong> — un
                <strong>tableau</strong> — ou par un <strong>nom</strong> — un
                <strong>dictionnaire</strong> ?</li>
              </ol>
            </div>`,
        },

        {
          id: "d2",
          type: "qcm",
          titre: "Des notes et un répertoire",
          contenu: `<p>Deux situations :</p>
            <ul>
              <li><strong>A.</strong> les 20 notes d'une classe, dans l'ordre où les copies ont été rendues ;</li>
              <li><strong>B.</strong> un répertoire téléphonique : à chaque nom correspond un numéro.</li>
            </ul>`,
          question: "Quelles structures choisir ?",
          options: [
            { texte: "A : un dictionnaire ; B : une liste",
              explication: "C'est l'inverse : les notes n'ont pas de nom, seulement un rang ; les numéros, eux, se cherchent par nom." },
            { texte: "A : une liste ; B : un dictionnaire", correct: true,
              explication: "Oui : des données de même nature, dont l'ordre a un sens, que l'on complète — une liste. Une recherche par nom — un dictionnaire." },
            { texte: "A : un p-uplet ; B : un p-uplet",
              explication: "Les notes s'ajoutent au fil des copies, les contacts aussi : il faut une structure modifiable." },
            { texte: "A : une liste ; B : une liste de couples <code>(nom, numéro)</code>",
              explication: "C'est possible, mais il faudrait parcourir tous les contacts à chaque recherche. Le dictionnaire trouve un nom directement." },
          ],
          apres: `<span class="chapo">Position ou nom</span>
            On ne demande jamais « la 7ᵉ entrée du répertoire », mais « le numéro de Léa ».
            Quand c'est un <strong>nom</strong> qui sert à chercher, c'est un dictionnaire.`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Un point et une date",
          contenu: `<p>Deux situations :</p>
            <ul>
              <li><strong>C.</strong> les coordonnées <em>(x, y)</em> d'un point du plan ;</li>
              <li><strong>D.</strong> la date de naissance d'une personne : jour, mois, année.</li>
            </ul>`,
          question: "Quelle structure convient le mieux, dans les deux cas ?",
          options: [
            { texte: "une liste, pour pouvoir les modifier",
              explication: "Un point, une date de naissance n'ont aucune raison de changer : la garantie d'immuabilité est un atout." },
            { texte: "un p-uplet — ou un dictionnaire pour nommer les champs de la date", correct: true,
              explication: "Oui : peu de valeurs, de rôles fixés, qui ne changent pas. Pour la date, <code>{\"jour\": 12, \"mois\": 5, \"annee\": 2008}</code> est aussi un bon choix : c'est un enregistrement." },
            { texte: "un dictionnaire, toujours",
              explication: "Pour un point, <code>{\"x\": 4, \"y\": -2}</code> est possible, mais <code>(4, -2)</code> est plus simple, immuable, et peut servir de clé." },
            { texte: "deux variables séparées, sans structure",
              explication: "On perdrait le lien entre les valeurs : une fonction ne pourrait plus renvoyer « un point »." },
          ],
          apres: `<span class="chapo">Peu de valeurs, des rôles fixés</span>
            C'est le terrain du p-uplet. Quand on veut <strong>nommer</strong> les champs
            pour gagner en lisibilité, le dictionnaire prend le relais : c'est
            l'enregistrement.`,
        },

        {
          id: "d4",
          type: "qcm",
          titre: "Des lettres et des températures",
          contenu: `<p>Deux situations :</p>
            <ul>
              <li><strong>E.</strong> le nombre d'occurrences de chaque lettre d'un texte ;</li>
              <li><strong>F.</strong> les températures relevées heure par heure pendant une journée.</li>
            </ul>`,
          question: "Quelles structures choisir ?",
          options: [
            { texte: "E : un dictionnaire ; F : une liste", correct: true,
              explication: "Oui : E associe une clé (la lettre) à une valeur (son compteur) — c'est la séance 7. F, ce sont 24 valeurs de même nature, l'indice tenant lieu d'heure." },
            { texte: "E : une liste de 26 compteurs ; F : un dictionnaire",
              explication: "Une liste de 26 cases impose de convertir chaque lettre en indice, et ignore les autres caractères. Pour F, numéroter des cases consécutives est précisément le métier de la liste." },
            { texte: "E : un p-uplet ; F : un p-uplet",
              explication: "Les compteurs changent à chaque lettre lue : un p-uplet ne le permet pas." },
            { texte: "E : une liste ; F : une liste",
              explication: "Pour E, on cherche le compteur d'une lettre par son nom : c'est un dictionnaire." },
          ],
          apres: `<span class="chapo">Le dictionnaire {0: 12.5, 1: 11.8, …} ?</span>
            Il conviendrait aussi pour F. Mais quand les clés sont 0, 1, 2… consécutives,
            une liste fait le même travail, plus simplement.`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Les opérations ne se ressemblent pas toutes",
          contenu: `<p>Lis ces deux lignes sans les exécuter.</p>`,
          code: `print(2 * (1, 8))\nprint({"a": 1} + {"b": 2})`,
          question: "Qu'affichent-elles ?",
          options: [
            { texte: "<code>(1, 8, 1, 8)</code>, puis <code>{'a': 1, 'b': 2}</code>",
              explication: "La première est juste. Mais <code>+</code> n'est pas défini entre deux dictionnaires." },
            { texte: "<code>(1, 8, 1, 8)</code>, puis une erreur", correct: true,
              explication: "Oui : un p-uplet se répète comme une liste ; deux dictionnaires ne s'additionnent pas : <code>TypeError</code>. Pour les réunir, il faut une boucle — la fonction <code>fusionner</code> de la séance 6." },
            { texte: "<code>(2, 16)</code>, puis une erreur",
              explication: "<code>*</code> répète le p-uplet, il ne multiplie pas ses composantes." },
            { texte: "une erreur dès la première ligne",
              explication: "Multiplier un p-uplet par un entier le répète : c'est permis." },
          ],
          apres: `<span class="chapo">Séquences et dictionnaires</span>
            P-uplets, listes et chaînes sont des <strong>séquences</strong> : indices,
            <code>+</code>, <code>*</code>. Un dictionnaire n'en est pas une : ni indice,
            ni concaténation.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>La situation</th><th>La structure</th><th>Exemple</th></tr>
              <tr><td>quelques valeurs de rôles fixés, qui ne changent pas</td><td>p-uplet</td><td><code>(4, -2)</code>, <code>(14, 7, 1789)</code></td></tr>
              <tr><td>une fonction qui renvoie plusieurs résultats</td><td>p-uplet</td><td><code>return q, r</code></td></tr>
              <tr><td>beaucoup de valeurs de même nature, dans un ordre</td><td>liste</td><td>des notes, des températures</td></tr>
              <tr><td>des valeurs retrouvées par un nom</td><td>dictionnaire</td><td>un répertoire, un lexique</td></tr>
              <tr><td>des compteurs, un par élément rencontré</td><td>dictionnaire</td><td><code>{'a': 2, 'b': 1}</code></td></tr>
              <tr><td>une fiche aux champs nommés</td><td>dictionnaire (enregistrement)</td><td><code>{"nom": "Alice", "age": 16}</code></td></tr>
              <tr><td>une collection de fiches</td><td>liste de dictionnaires (table)</td><td><code>[{…}, {…}]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les mauvais choix qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>une liste pour un répertoire : chaque recherche parcourt tout ;</li>
                <li>un p-uplet pour des données qui évoluent : il faut tout reconstruire à chaque changement ;</li>
                <li>une liste comme clé de dictionnaire : refusée, il faut un p-uplet.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 40,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Le carnet d'adresses",
          contenu: `
            <p>Un carnet associe à chaque nom le <strong>couple</strong>
            <code>(téléphone, ville)</code>. Écris la fonction
            <code>ville_de(carnet, nom)</code>, qui renvoie la ville d'un contact, ou
            <code>"inconnue"</code> s'il n'est pas dans le carnet.</p>
            <pre class="bloc-code"><code>ville_de(CARNET, "Bob")     # renvoie 'Lyon'
ville_de(CARNET, "Zoé")     # renvoie 'inconnue'</code></pre>`,
          depart: `CARNET = {\n    "Alice": ("06 12 34 56 78", "Paris"),\n    "Bob": ("07 98 76 54 32", "Lyon"),\n}\n\n\ndef ville_de(carnet, nom):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bin\\s+carnet\\b|carnet\\s*\\.\\s*get\\s*\\(", message: "Vérifie d'abord que le nom est dans le carnet." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la ville." },
            ],
            tests: `assert ville_de(CARNET, "Bob") == "Lyon", "ville_de(CARNET, \\"Bob\\") doit renvoyer \\"Lyon\\""\nassert ville_de(CARNET, "Alice") == "Paris", "ville_de(CARNET, \\"Alice\\") doit renvoyer \\"Paris\\""\nassert ville_de(CARNET, "Zoé") == "inconnue", "pour un contact absent, la fonction doit renvoyer \\"inconnue\\""\nassert ville_de({"X": ("0", "Nice")}, "X") == "Nice", "la fonction doit utiliser le carnet reçu en paramètre"`,
          },
          felicitation: "Un dictionnaire pour chercher, un p-uplet pour la fiche. 📇",
          indices: [
            "D'abord, le cas du contact absent : un <code>if</code> avec <code>in</code>.",
            "Sinon, <code>carnet[nom]</code> est un couple : la ville est sa composante d'indice 1 — ou déballe-le en deux variables.",
          ],
          solution: `CARNET = {\n    "Alice": ("06 12 34 56 78", "Paris"),\n    "Bob": ("07 98 76 54 32", "Lyon"),\n}\n\n\ndef ville_de(carnet, nom):\n    if nom in carnet:\n        return carnet[nom][1]\n    return "inconnue"\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "L'heure la plus chaude",
          contenu: `
            <p>Une liste contient les températures relevées heure par heure : l'indice
            est l'heure. Écris la fonction <code>plus_chaud(temperatures)</code>, qui
            renvoie le <strong>couple</strong> <code>(heure, température)</code> du
            relevé le plus chaud. En cas d'égalité, la première heure l'emporte.</p>
            <pre class="bloc-code"><code>plus_chaud([12.5, 14.0, 17.5, 16.0])     # renvoie (2, 17.5)</code></pre>`,
          depart: `def plus_chaud(temperatures):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[^\\n]*\\brange\\s*\\(\\s*len\\s*\\(", message: "Il faut connaître l'heure, c'est-à-dire l'indice : parcours par indice, avec range(len(…))." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le couple." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(|\\.index\\s*\\(", message: "Écris la recherche du maximum toi-même." },
            ],
            tests: `assert plus_chaud([12.5, 14.0, 17.5, 16.0]) == (2, 17.5), "plus_chaud([12.5, 14.0, 17.5, 16.0]) doit renvoyer (2, 17.5)"\nassert plus_chaud([3.0]) == (0, 3.0), "avec un seul relevé, c'est l'heure 0"\nassert plus_chaud([-5, -2, -2, -8]) == (1, -2), "en cas d'égalité, la première heure l'emporte ; et les températures peuvent être négatives"`,
          },
          felicitation: "Une liste pour les relevés, un p-uplet pour la réponse. 🌡️",
          indices: [
            "C'est une recherche de maximum où l'on retient l'<strong>indice</strong> du record : il commence à 0.",
            "Dans la boucle par indice, on remplace l'indice record quand la température est <strong>strictement</strong> plus grande que celle du record. Après la boucle, on renvoie l'indice et la température qu'il désigne.",
          ],
          solution: `def plus_chaud(temperatures):\n    heure = 0\n    for i in range(len(temperatures)):\n        if temperatures[i] > temperatures[heure]:\n            heure = i\n    return (heure, temperatures[heure])\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La bibliothèque",
          contenu: `
            <p>Chaque livre est un triplet <code>(titre, auteur, annee)</code>, et la
            bibliothèque une liste de livres. Écris la fonction
            <code>par_auteur(livres)</code>, qui renvoie le dictionnaire associant chaque
            auteur à la liste de ses titres, dans l'ordre de la bibliothèque.</p>
            <pre class="bloc-code"><code>par_auteur(LIVRES)
# renvoie {'Hugo': ['Les Misérables', 'Notre-Dame de Paris'], 'Verne': ['Vingt mille lieues sous les mers']}</code></pre>`,
          depart: `LIVRES = [\n    ("Les Misérables", "Hugo", 1862),\n    ("Vingt mille lieues sous les mers", "Verne", 1870),\n    ("Notre-Dame de Paris", "Hugo", 1831),\n]\n\n\ndef par_auteur(livres):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s+in\\b", message: "Déballe chaque triplet dans la boucle : for titre, auteur, annee in …" },
              { motif: "\\.append\\s*\\(", message: "Quand l'auteur est déjà connu, ajoute le titre à sa liste avec append()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            tests: `assert par_auteur(LIVRES) == {"Hugo": ["Les Misérables", "Notre-Dame de Paris"], "Verne": ["Vingt mille lieues sous les mers"]}, "chaque auteur doit être associé à la liste de ses titres, dans l'ordre"\nassert par_auteur([]) == {}, "une bibliothèque vide donne un dictionnaire vide"\nassert par_auteur([("A", "X", 1), ("B", "X", 2), ("C", "X", 3)]) == {"X": ["A", "B", "C"]}, "trois livres du même auteur donnent une seule entrée"`,
          },
          felicitation: "Des p-uplets dans une liste, regroupés dans un dictionnaire de listes. 📚",
          indices: [
            "C'est le regroupement de la séance 7 (<code>par_initiale</code>) : un dictionnaire vide, et, pour chaque livre, créer la liste ou la compléter.",
            "La boucle déballe chaque triplet en trois variables ; c'est l'auteur qui sert de clé, et le titre qu'on range.",
          ],
          solution: `LIVRES = [\n    ("Les Misérables", "Hugo", 1862),\n    ("Vingt mille lieues sous les mers", "Verne", 1870),\n    ("Notre-Dame de Paris", "Hugo", 1831),\n]\n\n\ndef par_auteur(livres):\n    resultat = {}\n    for titre, auteur, annee in livres:\n        if auteur in resultat:\n            resultat[auteur].append(titre)\n        else:\n            resultat[auteur] = [titre]\n    return resultat\n`,
        },

        {
          id: "a4",
          type: "qcm",
          titre: "Le plateau de jeu",
          contenu: `<p>Dans un jeu de bataille navale, on veut retenir l'état des cases déjà
            visées : <code>"touché"</code> ou <code>"à l'eau"</code>. Sur un plateau de
            10 × 10, seules quelques cases sont visées pendant la partie, et on veut savoir
            très vite si une case <em>(ligne, colonne)</em> l'a déjà été.</p>`,
          question: "Quelle structure choisir ?",
          options: [
            { texte: "une liste de couples <code>(ligne, colonne)</code>",
              explication: "Elle dit quelles cases ont été visées, mais pas le résultat. Et chaque recherche parcourt toute la liste." },
            { texte: "un dictionnaire dont les clés sont des couples <code>(ligne, colonne)</code>", correct: true,
              explication: "Oui : <code>(3, 4) in tirs</code> répond aussitôt, et <code>tirs[(3, 4)]</code> donne le résultat. Le couple, immuable, est une clé parfaite." },
            { texte: "un dictionnaire dont les clés sont des listes <code>[ligne, colonne]</code>",
              explication: "Une liste ne peut pas être une clé : <code>TypeError: unhashable type</code>." },
            { texte: "un p-uplet de 100 cases",
              explication: "Le plateau change à chaque tir : un p-uplet devrait être reconstruit à chaque fois." },
          ],
          apres: `<span class="chapo">L'immuabilité au service du dictionnaire</span>
            C'est la meilleure illustration du chapitre : le p-uplet, parce qu'il ne change
            pas, peut servir de clé ; le dictionnaire, parce qu'il change, enregistre la
            partie au fil des tirs.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Les moyennes par matière",
          contenu: `
            <p>Un bulletin associe à chaque matière la <strong>liste</strong> de ses notes.
            Écris la fonction <code>moyennes(bulletin)</code>, qui renvoie un
            <strong>nouveau</strong> dictionnaire associant chaque matière à sa moyenne.
            Une matière sans note est absente du résultat.</p>
            <pre class="bloc-code"><code>moyennes({"maths": [12, 16], "NSI": [18, 15, 18], "SVT": []})
# renvoie {'maths': 14.0, 'NSI': 17.0}</code></pre>`,
          depart: `def moyennes(bulletin):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.items\\s*\\(\\s*\\)", message: "Il faut la matière et ses notes à chaque tour : parcours items()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire des moyennes." },
            ],
            tests: `_b = {"maths": [12, 16], "NSI": [18, 15, 18], "SVT": []}\n_r = moyennes(_b)\nassert _r == {"maths": 14.0, "NSI": 17.0}, "moyennes doit renvoyer {\\"maths\\": 14.0, \\"NSI\\": 17.0} : SVT, sans note, est absente"\nassert _b == {"maths": [12, 16], "NSI": [18, 15, 18], "SVT": []}, "le bulletin reçu ne doit pas être modifié"\nassert moyennes({}) == {}, "un bulletin vide donne un dictionnaire vide"\nassert moyennes({"EPS": [10]}) == {"EPS": 10.0}, "avec une seule note, la moyenne est cette note"`,
          },
          felicitation: "Un dictionnaire de listes en entrée, un dictionnaire de nombres en sortie. 📒",
          indices: [
            "Un nouveau dictionnaire vide, et une boucle sur les entrées du bulletin.",
            "Pour chaque matière qui a au moins une note, on range sous son nom la somme de ses notes divisée par leur nombre — <code>sum()</code> et <code>len()</code> sont permis.",
          ],
          solution: `def moyennes(bulletin):\n    resultat = {}\n    for matiere, notes in bulletin.items():\n        if len(notes) > 0:\n            resultat[matiere] = sum(notes) / len(notes)\n    return resultat\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Des anagrammes",
          contenu: `
            <p>Deux mots sont des <strong>anagrammes</strong> s'ils utilisent exactement
            les mêmes lettres, autant de fois chacune : « chien » et « niche »,
            « ironique » et « onirique ». Écris la fonction
            <code>sont_anagrammes(mot1, mot2)</code> en comparant les comptages des deux
            mots. La fonction <code>compter_lettres</code> de la séance 7 est donnée.</p>
            <pre class="bloc-code"><code>sont_anagrammes("chien", "niche")     # renvoie True
sont_anagrammes("chien", "chiens")    # renvoie False</code></pre>`,
          depart: `def compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef sont_anagrammes(mot1, mot2):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+sont_anagrammes[\\s\\S]*\\bcompter_lettres\\s*\\([\\s\\S]*\\bcompter_lettres\\s*\\(", message: "Compare les comptages des deux mots, obtenus avec compter_lettres." },
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "sont_anagrammes doit renvoyer True ou False." },
            ],
            codeAbsent: [
              { motif: "\\bsorted\\s*\\(|\\.sort\\s*\\(", message: "Compare les comptages plutôt que de trier les lettres." },
            ],
            tests: `assert sont_anagrammes("chien", "niche") == True, "chien et niche sont des anagrammes"\nassert sont_anagrammes("ironique", "onirique") == True, "ironique et onirique sont des anagrammes"\nassert sont_anagrammes("chien", "chiens") == False, "chiens a une lettre de plus"\nassert sont_anagrammes("aab", "abb") == False, "mêmes lettres, mais pas autant de fois chacune"\nassert sont_anagrammes("", "") == True, "deux mots vides sont des anagrammes"`,
          },
          felicitation: "Deux dictionnaires égaux, deux mots anagrammes. 🔤",
          indices: [
            "Deux dictionnaires sont égaux, pour <code>==</code>, quand ils ont les mêmes entrées, quel que soit l'ordre dans lequel elles ont été ajoutées.",
            "La fonction renvoie directement le résultat de la comparaison des deux comptages.",
          ],
          solution: `def compter_lettres(texte):\n    compteurs = {}\n    for lettre in texte:\n        if lettre in compteurs:\n            compteurs[lettre] = compteurs[lettre] + 1\n        else:\n            compteurs[lettre] = 1\n    return compteurs\n\n\ndef sont_anagrammes(mot1, mot2):\n    return compter_lettres(mot1) == compter_lettres(mot2)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre modèle",
          contenu: `
            <p>Dernier défi du chapitre : choisis une situation qui te parle — ta
            collection de jeux, un championnat, une recette, un emploi du temps — et
            <strong>modélise-la</strong> en combinant au moins <strong>deux</strong> des
            trois structures : par exemple un dictionnaire dont les valeurs sont des
            p-uplets, ou une liste de dictionnaires.</p>
            <p>Écris ensuite <strong>une fonction</strong> qui répond à une question sur
            tes données, appelle-la, et affiche sa réponse avec une phrase.</p>`,
          depart: `# Ton modèle ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b", message: "Écris une fonction qui interroge tes données." },
              { motif: "\\breturn\\b", message: "Ta fonction doit renvoyer sa réponse." },
            ],
            sortieNonVide: true,
            tests: `_conteneurs = (list, tuple, dict)\n_vals = [v for k, v in list(globals().items()) if isinstance(v, _conteneurs) and not k.startswith("_")]\n_inner = lambda v: list(v.values()) if isinstance(v, dict) else list(v)\nassert any(any(isinstance(x, _conteneurs) for x in _inner(v)) for v in _vals), "Tes données doivent combiner deux structures : un conteneur qui contient d'autres conteneurs (des p-uplets, des listes ou des dictionnaires)."`,
          },
          felicitation: "Ton modèle, ta question, ta réponse : tu sais organiser des données. 🏁",
          indices: [
            "Par exemple : <code>jeux = {\"Zelda\": (2017, 18), \"Mario Kart\": (2014, 15)}</code>, un dictionnaire dont chaque valeur est le couple (année, note).",
            "Puis une fonction qui parcourt ces données pour répondre à une question — le jeu le plus récent, la note moyenne… — et un <code>print</code> qui affiche ce qu'elle renvoie.",
          ],
          solution: `jeux = {"Zelda": (2017, 18), "Mario Kart": (2014, 15), "Celeste": (2018, 19)}\n\n\ndef plus_recent(collection):\n    titre_record = ""\n    annee_record = 0\n    for titre, infos in collection.items():\n        if infos[0] > annee_record:\n            titre_record = titre\n            annee_record = infos[0]\n    return titre_record\n\n\nprint("Mon jeu le plus récent :", plus_recent(jeux))\n`,
        },
      ],
    },
  ],
};

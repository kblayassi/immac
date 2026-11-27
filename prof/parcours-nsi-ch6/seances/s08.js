/* NSI — chapitre 6, séance 8 : des structures imbriquées.
 * Reprend les « Exemples » de la page « Les dictionnaires » (dictionnaire de
 * dictionnaires, dictionnaires imbriqués), l'encadré sur le p-uplet nommé et
 * l'annonce des données en tables, et les exercices 27 et 28.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "Des structures imbriquées",
  sousTitre: "Des fiches, des tables, des dossiers",
  palier: "Partie 3 — Organiser des données",

  accroche: `Une classe, ce n'est pas un élève : c'est trente fiches qui ont toutes la
    même forme. Pour les ranger, on <strong>emboîte</strong> les structures : une
    liste de dictionnaires, ou un dictionnaire de dictionnaires. Chaque crochet
    descend d'un niveau.`,

  objectifs: [
    "lire une valeur à deux niveaux : <code>eleves[\"Alice\"][\"moyenne\"]</code> ou <code>classe[1][\"nom\"]</code>",
    "parcourir une <strong>liste d'enregistrements</strong>, première forme d'une table de données",
    "parcourir et compléter un <strong>dictionnaire de dictionnaires</strong>",
    "modifier une liste rangée comme valeur dans un dictionnaire",
  ],

  motDeLaFin: `Listes de fiches, dossiers de fiches : tu sais organiser des données à
    plusieurs niveaux. Dernière séance : face à un problème, comment
    <strong>choisir</strong> entre p-uplet, liste et dictionnaire ?`,

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
          titre: "Un dictionnaire de dictionnaires",
          contenu: `
            <p>Une valeur de dictionnaire peut être de n'importe quel type… y compris un
            autre dictionnaire. On range ainsi un <strong>dossier</strong> d'élèves : à
            chaque nom correspond une fiche.</p>

            <pre class="bloc-code"><code>eleves = {
    "Alice": {"age": 16, "moyenne": 15},
    "Bob":   {"age": 17, "moyenne": 12},
}

eleves["Alice"]               # {'age': 16, 'moyenne': 15} : une fiche
eleves["Alice"]["moyenne"]    # 15 : un champ de cette fiche</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Se lit de gauche à droite</span>
              Comme <code>segment[1][0]</code> à la séance 1 : d'abord
              <code>eleves["Alice"]</code>, qui donne la fiche, puis
              <code>["moyenne"]</code> sur cette fiche. Chaque paire de crochets descend
              d'un niveau.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Lire dans le dossier",
          contenu: `
            <p>Affiche l'âge de Bob, puis la moyenne de Chloé, en les lisant dans
            <code>eleves</code> :</p>
            <pre class="bloc-code"><code>17
18</code></pre>`,
          depart: `eleves = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n    "Chloé": {"age": 16, "moyenne": 18},\n}\n\n`,
          validation: {
            codeContient: [
              { motif: "eleves\\s*\\[\\s*[\"']Bob[\"']\\s*\\]\\s*\\[\\s*[\"']age[\"']\\s*\\]", message: "L'âge de Bob : la fiche de \"Bob\", puis son champ \"age\"." },
              { motif: "eleves\\s*\\[\\s*[\"']Chloé[\"']\\s*\\]\\s*\\[\\s*[\"']moyenne[\"']\\s*\\]", message: "La moyenne de Chloé : la fiche de \"Chloé\", puis son champ \"moyenne\"." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*1[78]\\s*\\)", message: "Lis les valeurs dans le dossier, ne les écris pas à la main." },
            ],
            sortie: "17\n18",
          },
          felicitation: "Deux crochets : la fiche, puis le champ. 🗃️",
          indices: [
            "Commence par afficher <code>eleves[\"Bob\"]</code> seul : c'est une fiche, donc un dictionnaire.",
            "Il reste à lire dans cette fiche la bonne clé, avec une seconde paire de crochets.",
          ],
          solution: `eleves = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n    "Chloé": {"age": 16, "moyenne": 18},\n}\nprint(eleves["Bob"]["age"])\nprint(eleves["Chloé"]["moyenne"])\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Un crochet de moins",
          contenu: `<p>Avec le même dossier <code>eleves</code>, lis cette instruction sans
            l'exécuter.</p>`,
          code: `print(eleves["moyenne"])`,
          question: "Qu'affiche-t-elle ?",
          options: [
            { texte: "les moyennes de tous les élèves",
              explication: "Python ne descend pas tout seul dans les fiches : il cherche <code>\"moyenne\"</code> parmi les clés du premier niveau." },
            { texte: "<code>15</code>, la moyenne du premier élève",
              explication: "Un dictionnaire n'a pas de « premier » élément lu par défaut : la clé doit exister au niveau où on la cherche." },
            { texte: "rien : le programme s'arrête sur une erreur", correct: true,
              explication: "Oui : <code>KeyError: 'moyenne'</code>. Les clés de <code>eleves</code> sont des noms ; <code>\"moyenne\"</code> est une clé des fiches, un niveau plus bas." },
            { texte: "<code>None</code>",
              explication: "Une clé absente, lue avec des crochets, provoque une erreur." },
          ],
          apres: `<span class="chapo">À chaque niveau ses clés</span>
            Au premier niveau, les noms ; au second, les champs. Pour lire un champ, il
            faut d'abord choisir la fiche.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Une liste d'enregistrements",
          contenu: `
            <p>Autre organisation : une <strong>liste</strong> de fiches. Chaque fiche est
            un dictionnaire qui nomme ses champs — on l'appelle un
            <strong>enregistrement</strong>, le fameux « p-uplet nommé » de la séance 4.</p>

            <pre class="bloc-code"><code>classe = [
    {"nom": "Alice", "age": 16, "moyenne": 15},
    {"nom": "Bob",   "age": 17, "moyenne": 12},
    {"nom": "Chloé", "age": 16, "moyenne": 18},
]

classe[1]                 # la fiche de Bob : on choisit d'abord par INDICE
classe[1]["moyenne"]      # 12 : puis le champ par CLÉ

for fiche in classe:      # une boucle donne chaque fiche
    print(fiche["nom"])</code></pre>

            <div class="encadre">
              <span class="chapo">Une table de données</span>
              Toutes les fiches partagent les mêmes clés, appelées
              <strong>descripteurs</strong>. Une liste d'enregistrements partageant les
              mêmes descripteurs, c'est une <strong>table de données</strong> : chaque fiche
              est une ligne, chaque descripteur une colonne. C'est l'objet du prochain
              chapitre. 📊
            </div>`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Trois types en une ligne",
          contenu: `<p>On reprend la liste <code>classe</code> de l'étape précédente.</p>`,
          question: "Quels sont les types de classe, de classe[0] et de classe[0][\"nom\"] ?",
          options: [
            { texte: "liste, liste, chaîne de caractères",
              explication: "<code>classe[0]</code> est entre accolades, avec des couples <code>clé: valeur</code> : c'est un dictionnaire." },
            { texte: "liste, dictionnaire, chaîne de caractères", correct: true,
              explication: "Oui : une liste de dictionnaires, dont chaque champ <code>\"nom\"</code> contient un texte." },
            { texte: "dictionnaire, dictionnaire, chaîne de caractères",
              explication: "<code>classe</code> est entre crochets : c'est une liste, qu'on lit par indice." },
            { texte: "liste, dictionnaire, dictionnaire",
              explication: "<code>classe[0][\"nom\"]</code> est la valeur du champ <code>\"nom\"</code> : le texte <code>\"Alice\"</code>." },
          ],
          apres: `<span class="chapo">Le type change à chaque crochet</span>
            Un crochet de plus, un niveau de moins : liste → dictionnaire → texte. Quand
            une expression imbriquée résiste, affiche-la morceau par morceau.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Parcourir la table",
          contenu: `
            <p>Affiche d'abord la moyenne de Bob, en la lisant dans <code>classe</code>,
            puis, avec une boucle, le nom de chaque élève :</p>
            <pre class="bloc-code"><code>12
Alice
Bob
Chloé</code></pre>`,
          depart: `classe = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\n\n`,
          validation: {
            codeContient: [
              { motif: "classe\\s*\\[\\s*1\\s*\\]\\s*\\[\\s*[\"']moyenne[\"']\\s*\\]", message: "La moyenne de Bob : la fiche d'indice 1, puis son champ \"moyenne\"." },
              { motif: "\\bfor\\s+\\w+\\s+in\\s+classe\\b", message: "Parcours les fiches avec une boucle for sur classe." },
              { motif: "\\[\\s*[\"']nom[\"']\\s*\\]", message: "Dans la boucle, lis le champ \"nom\" de chaque fiche." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(12|[\"'](Alice|Bob|Chloé))", message: "Lis les valeurs dans la table, ne les écris pas à la main." },
            ],
            sortie: "12\nAlice\nBob\nChloé",
          },
          felicitation: "Un indice pour la ligne, une clé pour la colonne. 📊",
          indices: [
            "Bob est la deuxième fiche de la liste : un indice, puis la clé <code>\"moyenne\"</code>.",
            "La boucle donne chaque fiche à sa variable ; dans la boucle, on en affiche le champ <code>\"nom\"</code>.",
          ],
          solution: `classe = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\nprint(classe[1]["moyenne"])\nfor fiche in classe:\n    print(fiche["nom"])\n`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Une liste comme valeur",
          contenu: `<p>Chaque élève a cette fois plusieurs notes, rangées dans une liste.
            Lis ce programme sans l'exécuter.</p>`,
          code: `notes = {"Alice": [12, 15, 8], "Bob": [10]}\nnotes["Alice"].append(17)\nprint(notes["Alice"][1], len(notes["Alice"]))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>15 4</code>", correct: true,
              explication: "Oui : <code>notes[\"Alice\"]</code> est une liste, que <code>append()</code> complète sur place. Son élément d'indice 1 est 15, et elle compte maintenant 4 notes." },
            { texte: "<code>15 3</code>",
              explication: "<code>append()</code> a bien modifié la liste rangée dans le dictionnaire : elle compte une note de plus." },
            { texte: "<code>12 4</code>",
              explication: "L'indice 1 désigne la deuxième note : 15." },
            { texte: "une erreur, car une liste ne peut pas être une valeur",
              explication: "Une liste ne peut pas être une <strong>clé</strong> ; comme valeur, elle est parfaitement permise." },
          ],
          apres: `<span class="chapo">Modifier sans réaffecter</span>
            <code>notes["Alice"]</code> désigne la liste elle-même, pas une copie :
            <code>append()</code> la modifie là où elle est rangée. Inutile d'écrire
            <code>notes["Alice"] = …</code>.`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Une liste d'enregistrements (une table)
classe = [{"nom": "Alice", "moyenne": 15}, {"nom": "Bob", "moyenne": 12}]
classe[1]["moyenne"]                  # indice, puis clé
for fiche in classe:
    print(fiche["nom"])

# Un dictionnaire de dictionnaires (un dossier)
eleves = {"Alice": {"age": 16, "moyenne": 15}}
eleves["Alice"]["moyenne"]            # clé, puis clé
eleves["Bob"] = {"age": 17, "moyenne": 12}   # inscrire : une fiche entière
for nom, fiche in eleves.items():
    print(nom, fiche["moyenne"])

# Une liste comme valeur
notes = {"Alice": [12, 15]}
notes["Alice"].append(17)             # modifiée sur place</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>liste d'enregistrements</th><th>dictionnaire de dictionnaires</th></tr>
              <tr><td>on retrouve une fiche…</td><td>par sa position, ou en parcourant</td><td>directement, par son nom</td></tr>
              <tr><td>le nom est…</td><td>un champ de la fiche</td><td>la clé du dossier</td></tr>
              <tr><td>adapté pour…</td><td>parcourir, trier, filtrer</td><td>chercher un élève précis</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>sauter un niveau : <code>eleves["moyenne"]</code> cherche un nom d'élève appelé « moyenne » ;</li>
                <li>lire la liste au lieu de la fiche : dans <code>for fiche in classe</code>, c'est <code>fiche["nom"]</code>, pas <code>classe["nom"]</code> ;</li>
                <li>oublier les guillemets du champ : <code>fiche[nom]</code> cherche une variable <code>nom</code>.</li>
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
          titre: "Chasse aux bugs : les moyennes",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Alice : 15
Bob : 12</code></pre>
            <p>Il contient <strong>deux erreurs</strong>, sur la même ligne.</p>`,
          depart: `classe = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n]\nfor fiche in classe:\n    print(fiche[nom], ":", classe["moyenne"])\n`,
          validation: {
            codeContient: [
              { motif: "fiche\\s*\\[\\s*[\"']nom[\"']\\s*\\]", message: "Le champ \"nom\" est une clé texte : il lui faut des guillemets." },
              { motif: "fiche\\s*\\[\\s*[\"']moyenne[\"']\\s*\\]", message: "La moyenne se lit dans la fiche courante, pas dans la liste." },
            ],
            sortie: "Alice : 15\nBob : 12",
          },
          felicitation: "Des guillemets pour la clé, la fiche plutôt que la liste. 🐞",
          indices: [
            "La première erreur est une <code>NameError</code> : Python cherche une variable qui n'existe pas. Que manque-t-il autour de la clé ?",
            "La seconde est une <code>TypeError</code> : une liste ne se lit que par indice. Quelle variable contient la fiche de l'élève courant ?",
          ],
          solution: `classe = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n]\nfor fiche in classe:\n    print(fiche["nom"], ":", fiche["moyenne"])\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le plus jeune",
          contenu: `
            <p>Écris la fonction <code>plus_jeune(classe)</code>, qui reçoit une liste
            d'enregistrements non vide et renvoie le <strong>nom</strong> de l'élève le
            plus jeune. En cas d'égalité, le premier de la liste l'emporte.</p>
            <pre class="bloc-code"><code>plus_jeune(CLASSE)     # renvoie 'Alice'</code></pre>`,
          depart: `CLASSE = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\n\n\ndef plus_jeune(classe):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours les fiches avec une boucle for." },
              { motif: "\\[\\s*[\"']age[\"']\\s*\\]", message: "Compare les âges, lus dans le champ \"age\"." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer un nom." },
            ],
            codeAbsent: [
              { motif: "\\bmin\\s*\\(|\\bsorted\\s*\\(|\\.sort\\s*\\(", message: "Écris la recherche du minimum toi-même." },
            ],
            tests: `assert plus_jeune(CLASSE) == "Alice", "Alice et Chloé ont 16 ans : Alice, la première, l'emporte"\nassert plus_jeune([{"nom": "Zoé", "age": 15}]) == "Zoé", "avec une seule fiche, c'est elle"\nassert plus_jeune([{"nom": "A", "age": 18}, {"nom": "B", "age": 14}, {"nom": "C", "age": 15}]) == "B", "B, 14 ans, est la plus jeune"`,
          },
          felicitation: "La recherche du minimum, sur un champ des fiches. 👶",
          indices: [
            "On retient la fiche record, en partant de la première : <code>classe[0]</code>.",
            "Dans la boucle, on remplace le record par la fiche courante si son âge est <strong>strictement</strong> plus petit. Après la boucle, on renvoie le nom du record.",
          ],
          solution: `CLASSE = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\n\n\ndef plus_jeune(classe):\n    record = classe[0]\n    for fiche in classe:\n        if fiche["age"] < record["age"]:\n            record = fiche\n    return record["nom"]\n`,
          apres: `<span class="chapo">Retenir la fiche entière</span>
            En gardant la fiche record plutôt que son seul âge, on a tout sous la main à la
            fin : le nom, mais aussi la moyenne si on en avait besoin.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La moyenne d'un élève",
          contenu: `
            <p>Les élèves sont maintenant rangés dans un dossier :
            <code>{nom: {"age": …, "moyenne": …}}</code>. Écris la fonction
            <code>moyenne_de(eleves, nom)</code>, qui renvoie la moyenne de l'élève, ou
            <code>None</code> s'il est inconnu.</p>
            <pre class="bloc-code"><code>moyenne_de(ELEVES, "Bob")     # renvoie 12
moyenne_de(ELEVES, "Zoé")     # renvoie None</code></pre>`,
          depart: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n}\n\n\ndef moyenne_de(eleves, nom):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bin\\s+eleves\\b|eleves\\s*\\.\\s*get\\s*\\(", message: "Vérifie que l'élève existe, avec in ou get()." },
              { motif: "\\[\\s*[\"']moyenne[\"']\\s*\\]", message: "La moyenne se lit dans le champ \"moyenne\" de la fiche." },
            ],
            tests: `assert moyenne_de(ELEVES, "Bob") == 12, "moyenne_de(ELEVES, \\"Bob\\") doit renvoyer 12"\nassert moyenne_de(ELEVES, "Alice") == 15, "moyenne_de(ELEVES, \\"Alice\\") doit renvoyer 15"\nassert moyenne_de(ELEVES, "Zoé") is None, "pour un élève inconnu, la fonction doit renvoyer None, sans erreur"\nassert moyenne_de({}, "Alice") is None, "dans un dossier vide, personne n'est connu"`,
          },
          felicitation: "Vérifier la clé du premier niveau, puis lire au second. 🔍",
          indices: [
            "Un <code>if</code> vérifie que le nom est une clé du dossier.",
            "Si oui, on renvoie le champ <code>\"moyenne\"</code> de sa fiche, avec deux paires de crochets ; sinon, <code>None</code>.",
          ],
          solution: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n}\n\n\ndef moyenne_de(eleves, nom):\n    if nom in eleves:\n        return eleves[nom]["moyenne"]\n    return None\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Inscrire un élève",
          contenu: `
            <p>Écris la fonction <code>inscrire(eleves, nom, age, moyenne)</code>, qui
            ajoute au dossier la fiche d'un élève. Elle ne renvoie rien : elle modifie le
            dossier reçu.</p>
            <pre class="bloc-code"><code>inscrire(ELEVES, "Chloé", 16, 18)
print(ELEVES["Chloé"])     # {'age': 16, 'moyenne': 18}</code></pre>`,
          depart: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n}\n\n\ndef inscrire(eleves, nom, age, moyenne):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "eleves\\s*\\[\\s*nom\\s*\\]\\s*=(?!=)", message: "Crée l'entrée de l'élève : eleves[nom] = …" },
            ],
            tests: `_e = {"Alice": {"age": 16, "moyenne": 15}}\ninscrire(_e, "Chloé", 16, 18)\nassert _e == {"Alice": {"age": 16, "moyenne": 15}, "Chloé": {"age": 16, "moyenne": 18}}, "après l'inscription, Chloé doit avoir la fiche {\\"age\\": 16, \\"moyenne\\": 18}"\ninscrire(_e, "Dan", 15, 9.5)\nassert _e["Dan"] == {"age": 15, "moyenne": 9.5}, "la fiche doit contenir l'âge et la moyenne reçus en paramètres"\nassert len(_e) == 3, "chaque inscription ajoute une entrée au dossier"`,
          },
          felicitation: "Une fiche entière, rangée sous un nom. 📝",
          indices: [
            "La nouvelle entrée a pour clé le nom de l'élève.",
            "Sa valeur est une fiche : un dictionnaire de deux entrées, <code>\"age\"</code> et <code>\"moyenne\"</code>, rempli avec les paramètres.",
          ],
          solution: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n}\n\n\ndef inscrire(eleves, nom, age, moyenne):\n    eleves[nom] = {"age": age, "moyenne": moyenne}\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La moyenne générale",
          contenu: `
            <p>Écris la fonction <code>moyenne_generale(eleves)</code>, qui renvoie la
            moyenne de toutes les moyennes d'un dossier non vide.</p>
            <pre class="bloc-code"><code>moyenne_generale(ELEVES)     # renvoie 15.0</code></pre>`,
          depart: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n    "Chloé": {"age": 16, "moyenne": 18},\n}\n\n\ndef moyenne_generale(eleves):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le dossier avec une boucle for." },
              { motif: "\\[\\s*[\"']moyenne[\"']\\s*\\]", message: "Lis le champ \"moyenne\" de chaque fiche." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la moyenne générale." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Calcule le total toi-même, avec un accumulateur." },
            ],
            tests: `assert moyenne_generale(ELEVES) == 15, "la moyenne de 15, 12 et 18 est 15.0"\nassert moyenne_generale({"Zoé": {"age": 15, "moyenne": 11}}) == 11, "avec un seul élève, c'est sa moyenne"\nassert abs(moyenne_generale({"A": {"age": 1, "moyenne": 10}, "B": {"age": 1, "moyenne": 13}}) - 11.5) < 1e-9, "la moyenne de 10 et 13 est 11.5"`,
          },
          felicitation: "Un accumulateur qui descend d'un niveau à chaque tour. 🎓",
          indices: [
            "Un total à 0 avant la boucle. La boucle peut parcourir les fiches directement, avec <code>values()</code>.",
            "À chaque tour, ajoute au total le champ <code>\"moyenne\"</code> de la fiche ; après la boucle, divise par le nombre d'élèves.",
          ],
          solution: `ELEVES = {\n    "Alice": {"age": 16, "moyenne": 15},\n    "Bob": {"age": 17, "moyenne": 12},\n    "Chloé": {"age": 16, "moyenne": 18},\n}\n\n\ndef moyenne_generale(eleves):\n    total = 0\n    for fiche in eleves.values():\n        total = total + fiche["moyenne"]\n    return total / len(eleves)\n`,
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
          titre: "Filtrer la table",
          contenu: `
            <p>Écris la fonction <code>admis(classe, seuil)</code>, qui renvoie la liste des
            <strong>noms</strong> des élèves dont la moyenne est supérieure ou égale à
            <code>seuil</code>, dans l'ordre de la table.</p>
            <pre class="bloc-code"><code>admis(CLASSE, 14)     # renvoie ['Alice', 'Chloé']</code></pre>`,
          depart: `CLASSE = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\n\n\ndef admis(classe, seuil):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours les fiches, avec une boucle ou une compréhension." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la liste des noms." },
            ],
            tests: `assert admis(CLASSE, 14) == ["Alice", "Chloé"], "admis(CLASSE, 14) doit renvoyer [\\"Alice\\", \\"Chloé\\"]"\nassert admis(CLASSE, 15) == ["Alice", "Chloé"], "le seuil est inclus : 15 suffit pour un seuil de 15"\nassert admis(CLASSE, 20) == [], "personne n'a 20"\nassert admis([], 10) == [], "une table vide ne donne aucun nom"`,
          },
          felicitation: "Filtrer les lignes, garder une colonne : ta première requête sur une table. 🔎",
          indices: [
            "Une liste vide, remplie dans une boucle sur les fiches — ou une liste en compréhension, avec une condition à la fin.",
            "Une fiche n'est retenue que si son champ <code>\"moyenne\"</code> atteint le seuil ; on n'en garde que le champ <code>\"nom\"</code>.",
          ],
          solution: `CLASSE = [\n    {"nom": "Alice", "age": 16, "moyenne": 15},\n    {"nom": "Bob", "age": 17, "moyenne": 12},\n    {"nom": "Chloé", "age": 16, "moyenne": 18},\n]\n\n\ndef admis(classe, seuil):\n    return [fiche["nom"] for fiche in classe if fiche["moyenne"] >= seuil]\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "De la table au dossier",
          contenu: `
            <p>Écris la fonction <code>vers_dossier(classe)</code>, qui transforme une liste
            d'enregistrements en dictionnaire de dictionnaires : chaque nom devient une
            clé, associée à une fiche contenant tous les <strong>autres</strong> champs.</p>
            <pre class="bloc-code"><code>vers_dossier([{"nom": "Alice", "age": 16, "moyenne": 15}])
# renvoie {'Alice': {'age': 16, 'moyenne': 15}}</code></pre>
            <p>La table reçue ne doit pas être modifiée.</p>`,
          depart: `def vers_dossier(classe):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[\\s\\S]*\\bfor\\b", message: "Deux parcours imbriqués : les fiches, puis les champs de chaque fiche." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dossier." },
            ],
            tests: `_t = [{"nom": "Alice", "age": 16, "moyenne": 15}, {"nom": "Bob", "age": 17, "moyenne": 12}]\n_r = vers_dossier(_t)\nassert _r == {"Alice": {"age": 16, "moyenne": 15}, "Bob": {"age": 17, "moyenne": 12}}, "chaque nom doit être associé à une fiche contenant ses autres champs"\nassert _t == [{"nom": "Alice", "age": 16, "moyenne": 15}, {"nom": "Bob", "age": 17, "moyenne": 12}], "la table reçue ne doit pas être modifiée"\nassert vers_dossier([{"nom": "Zoé", "ville": "Lyon"}]) == {"Zoé": {"ville": "Lyon"}}, "la fonction doit recopier tous les champs, quels qu'ils soient"\nassert vers_dossier([]) == {}, "une table vide donne un dossier vide"`,
          },
          felicitation: "Deux organisations de la même information : tu passes de l'une à l'autre. 🔁",
          indices: [
            "Pour chaque fiche, on fabrique une <strong>nouvelle</strong> fiche, vide au départ : recopier tel quel, puis supprimer <code>\"nom\"</code>, modifierait la table reçue.",
            "Une boucle intérieure sur les entrées de la fiche recopie chaque champ, sauf celui dont la clé est <code>\"nom\"</code>. Puis la nouvelle fiche est rangée dans le dossier, sous le nom de l'élève.",
          ],
          solution: `def vers_dossier(classe):\n    dossier = {}\n    for fiche in classe:\n        nouvelle = {}\n        for champ, valeur in fiche.items():\n            if champ != "nom":\n                nouvelle[champ] = valeur\n        dossier[fiche["nom"]] = nouvelle\n    return dossier\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre table",
          contenu: `
            <p>À toi de choisir le sujet : des films, des joueurs, des pays, des
            pokémons… Crée une <strong>liste d'au moins trois enregistrements</strong> qui
            partagent exactement les <strong>mêmes descripteurs</strong> (au moins deux).
            Puis, avec une boucle, affiche une phrase par fiche qui utilise au moins deux
            de ses champs.</p>`,
          depart: `# Ta table ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours ta table avec une boucle for." },
            ],
            sortieNonVide: true,
            tests: `_tables = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_")]\nassert any(len(t) >= 3 and all(isinstance(f, dict) for f in t) for t in _tables), "Ta table doit être une liste d'au moins trois dictionnaires."\nassert any(len(t) >= 3 and all(isinstance(f, dict) for f in t) and len(t[0]) >= 2 and all(set(f) == set(t[0]) for f in t) for t in _tables), "Toutes tes fiches doivent avoir exactement les mêmes clés, au moins deux : ce sont les descripteurs."`,
          },
          felicitation: "Ta première table de données : rendez-vous au prochain chapitre. ✨",
          indices: [
            "Commence par <code>ma_table = [ {…}, {…}, {…} ]</code>, où chaque fiche a les mêmes clés, par exemple <code>\"titre\"</code> et <code>\"annee\"</code>.",
            "Puis une boucle <code>for fiche in ma_table:</code> et un <code>print</code> qui lit deux champs de <code>fiche</code>.",
          ],
          solution: `films = [\n    {"titre": "Coco", "annee": 2017},\n    {"titre": "Wall-E", "annee": 2008},\n    {"titre": "Là-haut", "annee": 2009},\n]\nfor fiche in films:\n    print(fiche["titre"], "est sorti en", fiche["annee"])\n`,
        },
      ],
    },
  ],
};

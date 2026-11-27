/* NSI — chapitre 6, séance 4 : créer et lire un dictionnaire.
 * Reprend l'introduction de la page « Les dictionnaires » (le p-uplet nommé),
 * les sections « Créer un dictionnaire » et « Accéder à une valeur » (KeyError,
 * in, get), la remarque sur les clés immuables, le TP2 (accès aux éléments) et
 * les exercices 13, 15, 17 et 20.
 * L'ajout d'entrées (TP2, « Première approche ») est réservé à la séance 5.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "Créer et lire un dictionnaire",
  sousTitre: "Retrouver une valeur par son nom",
  palier: "Partie 2 — Les dictionnaires",

  accroche: `Dans le p-uplet <code>("Alice", 16, 15)</code>, qui se souvient que
    l'âge est à l'indice 1 ? On aimerait <strong>nommer</strong> chaque valeur
    plutôt que la numéroter, et écrire <code>eleve["age"]</code>. C'est exactement
    ce que permet le <strong>dictionnaire</strong>.`,

  objectifs: [
    "créer un dictionnaire avec des accolades et des couples <code>clé: valeur</code>",
    "lire une valeur par sa <strong>clé</strong>, et comprendre l'erreur <code>KeyError</code>",
    "tester la présence d'une clé avec <code>in</code>, et lire sans risque avec <code>get()</code>",
    "savoir quels types peuvent servir de clé",
  ],

  motDeLaFin: `Tu sais créer un dictionnaire et le lire sans jamais provoquer d'erreur.
    Comme une liste, et contrairement à un p-uplet, un dictionnaire est
    <strong>modifiable</strong> : à la séance 5, on lui ajoute, modifie et retire des
    entrées.`,

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
          titre: "Nommer plutôt que numéroter",
          contenu: `
            <p>Avec un p-uplet, chaque valeur a un <strong>numéro</strong>. Avec un
            dictionnaire, elle a un <strong>nom</strong>, qu'on appelle sa
            <strong>clé</strong> :</p>

            <pre class="bloc-code"><code>eleve = ("Alice", 16, 15)                          # p-uplet : eleve[1] est l'âge
eleve = {"nom": "Alice", "age": 16, "moyenne": 15}  # dictionnaire : eleve["age"]</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : dictionnaire</span>
              Un <strong>dictionnaire</strong> est une collection d'<strong>entrées</strong>.
              Chaque entrée associe une <strong>clé</strong> à une <strong>valeur</strong>,
              et s'écrit <code>clé: valeur</code>. Les entrées sont séparées par des
              virgules, le tout entre <strong>accolades</strong>. Son type Python est
              <code>dict</code>.
            </div>

            <p>Dans <code>eleve</code>, les clés sont <code>"nom"</code>, <code>"age"</code>
            et <code>"moyenne"</code> ; les valeurs sont <code>"Alice"</code>, 16 et 15.
            On écrit souvent un dictionnaire sur plusieurs lignes, une entrée par ligne :</p>

            <pre class="bloc-code"><code>personne = {
    "nom": "Alice",
    "age": 23,
    "etudiant": True,
}</code></pre>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "La fiche de Coco",
          contenu: `
            <p>À la séance 1, le film Coco tenait dans le p-uplet
            <code>("Coco", 2017, 105)</code>. Range-le cette fois dans le dictionnaire
            <code>film</code>, avec les clés <code>"titre"</code>, <code>"annee"</code> et
            <code>"duree"</code>. Affiche ensuite l'année, en la lisant par sa clé :</p>
            <pre class="bloc-code"><code>2017</code></pre>`,
          depart: `film = \n\n`,
          validation: {
            codeContient: [
              { motif: "film\\s*\\[\\s*[\"']annee[\"']\\s*\\]", message: "L'année se lit avec la clé \"annee\", entre crochets." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*2017\\s*\\)", message: "Lis l'année dans le dictionnaire, ne l'écris pas à la main." },
            ],
            sortie: "2017",
            tests: `assert type(film) == dict, "film doit être un dictionnaire : des accolades et des couples clé: valeur"\nassert film == {"titre": "Coco", "annee": 2017, "duree": 105}, "film doit associer \\"titre\\" à \\"Coco\\", \\"annee\\" à 2017 et \\"duree\\" à 105"`,
          },
          felicitation: "film[\"annee\"] se lit tout seul, bien mieux que film[1]. 🎬",
          indices: [
            "Trois entrées entre accolades, de la forme <code>\"clé\": valeur</code>, séparées par des virgules. Les clés sont des textes : il leur faut des guillemets.",
            "Pour lire, le nom du dictionnaire, puis la clé entre crochets — comme un indice, mais avec un nom.",
          ],
          solution: `film = {"titre": "Coco", "annee": 2017, "duree": 105}\nprint(film["annee"])\n`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Reconnaître un dictionnaire",
          contenu: `<p>Voici quatre variables.</p>`,
          code: `a = {"x": 3}\nb = {1, 2, 3}\nc = {}\nd = [("a", 1), ("b", 2)]`,
          question: "Lesquelles sont des dictionnaires ?",
          options: [
            { texte: "<code>a</code> et <code>c</code>", correct: true,
              explication: "Oui : <code>a</code> a des accolades et un couple <code>clé: valeur</code> ; <code>c</code> est le dictionnaire vide." },
            { texte: "<code>a</code>, <code>b</code> et <code>c</code>",
              explication: "<code>b</code> a des accolades, mais aucun <code>:</code> : c'est un <em>ensemble</em> (<code>set</code>), hors programme." },
            { texte: "<code>a</code> seulement",
              explication: "<code>{}</code> est bien un dictionnaire : le dictionnaire vide." },
            { texte: "<code>a</code>, <code>c</code> et <code>d</code>",
              explication: "<code>d</code> a des crochets : c'est une liste de couples. Elle contient la même information, mais ce n'est pas un dictionnaire." },
          ],
          apres: `<span class="chapo">Accolades ET deux-points</span>
            Un dictionnaire, ce sont des accolades <strong>et</strong> des couples
            <code>clé: valeur</code>. <code>{}</code> est le dictionnaire vide. La liste
            <code>d</code> se croisera souvent avec les dictionnaires au chapitre sur les
            données en tables.`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "La première entrée ?",
          contenu: `<p>Voici un petit lexique d'informatique. Lis ce programme sans
            l'exécuter.</p>`,
          code: `dico = {"bit": "élément d'information valant 0 ou 1",\n        "processeur": "unité de calcul de l'ordinateur"}\nprint(dico[0])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>élément d'information valant 0 ou 1</code>",
              explication: "Ce serait le cas d'une liste. Un dictionnaire n'a pas d'indices : <code>0</code> est cherché comme une <strong>clé</strong>." },
            { texte: "<code>bit</code>",
              explication: "Un dictionnaire n'a pas de « première » entrée qu'on lirait par sa position. <code>0</code> est cherché comme une clé." },
            { texte: "rien : le programme s'arrête sur une erreur", correct: true,
              explication: "Oui : <code>KeyError: 0</code>. Python cherche une clé égale à 0, et il n'y en a pas." },
            { texte: "<code>None</code>",
              explication: "Une clé absente ne donne pas <code>None</code> avec les crochets : elle provoque une erreur." },
          ],
          apres: `<span class="chapo">Pas d'indice, que des clés</span>
            Entre les crochets d'un dictionnaire, on écrit toujours une <strong>clé</strong>.
            <code>dico[0]</code> cherche la clé <code>0</code> ; elle n'existe pas, d'où la
            <code>KeyError</code> — l'erreur de clé.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Lire une valeur, compter les entrées",
          contenu: `
            <pre class="bloc-code"><code>personne = {"nom": "Alice", "age": 23}

personne["nom"]        # "Alice"
personne["age"]        # 23
personne["adresse"]    # KeyError: 'adresse' : cette clé n'existe pas
len(personne)          # 2 : le nombre d'ENTRÉES</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Des clés toutes différentes</span>
              Puisque la clé sert à retrouver la valeur, deux entrées ne peuvent pas avoir
              la même clé. Les <strong>valeurs</strong>, elles, peuvent se répéter : rien
              n'empêche deux élèves d'avoir la même note.
            </div>

            <p><code>len()</code> compte les entrées, c'est-à-dire les couples
            <code>clé: valeur</code> — pas les clés et les valeurs séparément.</p>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Le lexique",
          contenu: `
            <p>Affiche la définition du mot <code>"processeur"</code>, en la lisant dans
            <code>dico</code>, puis le nombre d'entrées du lexique :</p>
            <pre class="bloc-code"><code>unité de calcul de l'ordinateur
2</code></pre>`,
          depart: `dico = {"bit": "élément d'information valant 0 ou 1",\n        "processeur": "unité de calcul de l'ordinateur"}\n\n`,
          validation: {
            codeContient: [
              { motif: "dico\\s*\\[\\s*[\"']processeur[\"']\\s*\\]", message: "Lis la définition avec la clé \"processeur\", entre crochets." },
              { motif: "\\blen\\s*\\(\\s*dico\\s*\\)", message: "Le nombre d'entrées se calcule avec len()." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*2\\s*\\)", message: "Le nombre d'entrées doit être calculé par Python." },
            ],
            sortie: "unité de calcul de l'ordinateur\n2",
          },
          felicitation: "Une clé pour lire, len() pour compter. 📖",
          indices: [
            "La définition se lit avec le nom du dictionnaire suivi de la clé entre crochets — la clé est un texte, avec ses guillemets.",
            "Le second <code>print</code> affiche ce que renvoie <code>len()</code> appliqué au dictionnaire.",
          ],
          solution: `dico = {"bit": "élément d'information valant 0 ou 1",\n        "processeur": "unité de calcul de l'ordinateur"}\nprint(dico["processeur"])\nprint(len(dico))\n`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Que cherche in ?",
          contenu: `<p>L'opérateur <code>in</code> fonctionne aussi sur les dictionnaires.
            Lis ce programme sans l'exécuter.</p>`,
          code: `personne = {"nom": "Alice", "age": 23}\nprint("nom" in personne)\nprint("Alice" in personne)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>True</code> puis <code>True</code>",
              explication: "<code>\"Alice\"</code> est bien dans le dictionnaire… mais comme <strong>valeur</strong>. Et <code>in</code> ne regarde que les clés." },
            { texte: "<code>True</code> puis <code>False</code>", correct: true,
              explication: "Oui : <code>\"nom\"</code> est une clé, <code>\"Alice\"</code> n'est qu'une valeur. Sur un dictionnaire, <code>in</code> teste les <strong>clés</strong>, jamais les valeurs." },
            { texte: "<code>False</code> puis <code>True</code>",
              explication: "C'est l'inverse : <code>in</code> teste les clés." },
            { texte: "une erreur, car <code>in</code> ne marche que sur les listes",
              explication: "<code>in</code> marche sur les listes, les p-uplets, les chaînes… et les dictionnaires, où il cherche parmi les clés." },
          ],
          apres: `<span class="chapo">in regarde les clés</span>
            C'est le piège le plus fréquent du chapitre. Sur un dictionnaire,
            <code>x in d</code> répond à la question « <code>x</code> est-il une
            <strong>clé</strong> de <code>d</code> ? ».`,
        },

        {
          id: "d8",
          type: "code",
          titre: "La clé est-elle présente ?",
          contenu: `
            <p>Écris la fonction <code>est_present(dico, cle)</code>, qui renvoie
            <code>True</code> si <code>cle</code> est une clé de <code>dico</code>, et
            <code>False</code> sinon.</p>
            <pre class="bloc-code"><code>est_present({"a": 1, "b": 2}, "a")    # renvoie True
est_present({"a": 1, "b": 2}, 1)      # renvoie False : 1 est une valeur</code></pre>`,
          depart: `def est_present(dico, cle):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer True ou False." },
              { motif: "\\bin\\b", message: "Teste la présence de la clé avec in." },
            ],
            tests: `assert est_present({"a": 1, "b": 2}, "a") == True, "\\"a\\" est une clé du dictionnaire"\nassert est_present({"a": 1, "b": 2}, "z") == False, "\\"z\\" n'est pas une clé du dictionnaire"\nassert est_present({"a": 1, "b": 2}, 1) == False, "1 est une VALEUR du dictionnaire, pas une clé"\nassert est_present({}, "a") == False, "le dictionnaire vide n'a aucune clé"`,
          },
          felicitation: "in sur un dictionnaire : une question sur les clés, une réponse booléenne. 🔑",
          indices: [
            "Comme à la séance 1 avec <code>est_week_end</code>, pas besoin de <code>if</code> : le test vaut déjà <code>True</code> ou <code>False</code>.",
            "La fonction renvoie directement le résultat du test <code>… in …</code>, appliqué à la clé et au dictionnaire.",
          ],
          solution: `def est_present(dico, cle):\n    return cle in dico\n`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Lire sans risque",
          contenu: `
            <p>Pour éviter une <code>KeyError</code>, on demande d'abord si la clé existe :</p>

            <pre class="bloc-code"><code>if "adresse" in personne:
    print(personne["adresse"])
else:
    print("Adresse inconnue")</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pour aller plus loin : la méthode get()</span>
              <code>d.get(cle, defaut)</code> fait la même chose en une instruction : elle
              renvoie la valeur associée à <code>cle</code> si elle existe, et
              <code>defaut</code> sinon — sans jamais d'erreur. Sans second argument, elle
              renvoie <code>None</code>.
              <pre class="bloc-code"><code>personne.get("nom", "inconnu")        # "Alice"
personne.get("adresse", "inconnue")   # "inconnue"
personne.get("adresse")               # None</code></pre>
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Une valeur de repli",
          contenu: `
            <p>Écris la fonction <code>valeur_ou_defaut(dico, cle, defaut)</code>, qui
            renvoie la valeur associée à <code>cle</code> si elle existe, et
            <code>defaut</code> sinon — <strong>sans jamais provoquer d'erreur</strong>.
            Avec <code>in</code> ou avec <code>get()</code>, au choix.</p>
            <pre class="bloc-code"><code>valeur_ou_defaut({"a": 1}, "a", 0)     # renvoie 1
valeur_ou_defaut({"a": 1}, "z", 0)     # renvoie 0</code></pre>`,
          depart: `def valeur_ou_defaut(dico, cle, defaut):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer une valeur." },
            ],
            tests: `assert valeur_ou_defaut({"a": 1}, "a", 0) == 1, "la clé \\"a\\" existe : on renvoie sa valeur, 1"\nassert valeur_ou_defaut({"a": 1}, "z", 0) == 0, "la clé \\"z\\" n'existe pas : on renvoie la valeur de repli, 0"\nassert valeur_ou_defaut({"a": 1, "b": 2}, 2, "?") == "?", "2 est une valeur, pas une clé : on renvoie la valeur de repli"\nassert valeur_ou_defaut({"x": None}, "x", 5) is None, "la clé \\"x\\" existe, même si sa valeur est None"\nassert valeur_ou_defaut({}, "a", "vide") == "vide", "le dictionnaire vide n'a aucune clé"`,
          },
          felicitation: "Plus jamais de KeyError : la clé est vérifiée avant d'être lue. 🛡️",
          indices: [
            "Avec <code>in</code> : un <code>if</code> qui teste la présence de la clé ; dans ce cas on renvoie la valeur lue entre crochets, sinon la valeur de repli.",
            "Avec <code>get()</code> : une seule ligne, qui renvoie ce que donne la méthode appelée avec la clé et la valeur de repli.",
          ],
          solution: `def valeur_ou_defaut(dico, cle, defaut):\n    if cle in dico:\n        return dico[cle]\n    return defaut\n`,
        },

        {
          id: "d11",
          type: "qcm",
          titre: "Vrai ou faux ?",
          contenu: `<p>Voici quatre affirmations sur les dictionnaires.</p>`,
          question: "Laquelle est vraie ?",
          options: [
            { texte: "Un dictionnaire est indexé par des entiers consécutifs.",
              explication: "Faux : c'est la définition d'une liste. Un dictionnaire est indexé par des <strong>clés</strong>, qui ne sont pas forcément des entiers." },
            { texte: "Les valeurs d'un dictionnaire doivent être toutes différentes.",
              explication: "Faux : rien n'interdit que deux élèves aient la même note. Ce sont les <strong>clés</strong> qui doivent être uniques." },
            { texte: "Les clés d'un dictionnaire doivent être toutes différentes.", correct: true,
              explication: "Vrai : c'est ce qui permet à une clé de désigner une valeur sans ambiguïté." },
            { texte: "<code>len(d)</code> compte les clés et les valeurs : il vaut 4 pour <code>{\"a\": 1, \"b\": 2}</code>.",
              explication: "Faux : <code>len</code> compte les <strong>entrées</strong>, c'est-à-dire les couples. Il vaut 2." },
          ],
          apres: `<span class="chapo">Clés uniques, valeurs libres</span>
            Une clé désigne une seule entrée ; une valeur peut apparaître autant de fois
            qu'on veut.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Quelles clés ?",
          contenu: `
            <p>Les clés ne sont pas forcément des chaînes de caractères : des entiers, des
            flottants, des p-uplets conviennent aussi.</p>

            <pre class="bloc-code"><code>podium = {1: "Léa", 2: "Tom", 3: "Nadia"}       # des entiers
grille = {(0, 0): "départ", (3, 4): "arrivée"}  # des couples de coordonnées
notes = {"Alice": [12, 15, 8]}                  # une liste comme VALEUR : permis
erreur = {[1, 2]: "a"}                          # une liste comme CLÉ : TypeError</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une clé doit être immuable</span>
              Si on pouvait modifier une clé après coup, le dictionnaire ne saurait plus où
              retrouver l'entrée. Python n'accepte donc comme clés que des valeurs
              <strong>immuables</strong> : <code>int</code>, <code>float</code>,
              <code>str</code>, <code>tuple</code>. Une liste est refusée :
              <code>TypeError: unhashable type: 'list'</code>. Les
              <strong>valeurs</strong>, elles, peuvent être de n'importe quel type.
            </div>

            <p>Voilà une première utilité de l'immuabilité des p-uplets, vue à la séance 2 :
            un couple de coordonnées peut servir de clé.</p>`,
        },

        {
          id: "d13",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>eleve = {"nom": "Alice", "age": 16}   # des accolades, des couples clé: valeur
vide = {}                             # le dictionnaire vide

eleve["nom"]                          # "Alice"
eleve["ville"]                        # KeyError : la clé n'existe pas
len(eleve)                            # 2 entrées

"nom" in eleve                        # True  : in teste les CLÉS
"Alice" in eleve                      # False : "Alice" est une valeur
eleve.get("ville", "inconnue")        # "inconnue", sans erreur</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>créer un dictionnaire</td><td><code>d = {cle1: v1, cle2: v2}</code></td></tr>
              <tr><td>lire la valeur d'une clé</td><td><code>d[cle]</code></td></tr>
              <tr><td>savoir si une clé existe</td><td><code>cle in d</code></td></tr>
              <tr><td>lire sans risque d'erreur</td><td><code>d.get(cle, defaut)</code></td></tr>
              <tr><td>connaître le nombre d'entrées</td><td><code>len(d)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>lire par position : <code>d[0]</code> cherche la clé 0, et provoque une <code>KeyError</code> ;</li>
                <li>oublier que la casse compte : <code>"Paris"</code> et <code>"paris"</code> sont deux clés différentes ;</li>
                <li>chercher une valeur avec <code>in</code> : il ne regarde que les clés ;</li>
                <li>lire avec des parenthèses : <code>d("nom")</code> est une <code>TypeError</code>.</li>
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
          type: "code",
          titre: "Chasse aux bugs : les capitales",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Paris
Rome
Madrid</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Corrige-les sans toucher au
            dictionnaire.</p>`,
          depart: `capitales = {"France": "Paris", "Italie": "Rome", "Espagne": "Madrid"}\nprint(capitales[0])\nprint(capitales("Italie"))\nprint(capitales["espagne"])\n`,
          validation: {
            codeContient: [
              { motif: "capitales\\s*\\[\\s*[\"']France[\"']\\s*\\]", message: "La capitale de la France se lit avec la clé \"France\"." },
              { motif: "capitales\\s*\\[\\s*[\"']Italie[\"']\\s*\\]", message: "Un dictionnaire se lit avec des crochets, pas des parenthèses." },
              { motif: "capitales\\s*\\[\\s*[\"']Espagne[\"']\\s*\\]", message: "La clé s'écrit exactement comme dans le dictionnaire, majuscule comprise." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"'](Paris|Rome|Madrid)[\"']", message: "Lis les capitales dans le dictionnaire." },
            ],
            sortie: "Paris\nRome\nMadrid",
            tests: `assert capitales == {"France": "Paris", "Italie": "Rome", "Espagne": "Madrid"}, "le dictionnaire ne doit pas être modifié"`,
          },
          felicitation: "Pas d'indice, des crochets, et la clé exacte : les trois réflexes. 🗺️",
          indices: [
            "Première erreur, une <code>KeyError: 0</code> : un dictionnaire ne se lit pas par position.",
            "Deuxième erreur, une <code>TypeError</code> : on ne lit pas un dictionnaire comme on appelle une fonction.",
            "Troisième erreur, une autre <code>KeyError</code> : compare lettre à lettre la clé demandée et celle du dictionnaire.",
          ],
          solution: `capitales = {"France": "Paris", "Italie": "Rome", "Espagne": "Madrid"}\nprint(capitales["France"])\nprint(capitales["Italie"])\nprint(capitales["Espagne"])\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "En stock ?",
          contenu: `
            <p>Un magasin range ses quantités dans <code>stock</code>. Affiche la quantité
            du produit contenu dans <code>produit</code> s'il est connu, et le message
            <code>inconnu</code> sinon, sans jamais d'erreur. Avec
            <code>"kiwis"</code> :</p>
            <pre class="bloc-code"><code>kiwis : inconnu</code></pre>
            <p>Change ensuite <code>produit</code> en <code>"poires"</code> pour vérifier
            que ton programme affiche <code>poires : 0</code>, puis remets
            <code>"kiwis"</code>.</p>`,
          depart: `stock = {"pommes": 12, "poires": 0, "bananes": 7}\nproduit = "kiwis"\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bproduit\\s+in\\s+stock\\b|stock\\s*\\.\\s*get\\s*\\(\\s*produit", message: "Vérifie que produit est une clé de stock, avec in ou get()." },
              { motif: "\\bproduit\\b[\\s\\S]*\\bproduit\\b[\\s\\S]*\\bproduit\\b", message: "Sers-toi de la variable produit, dans le test comme dans l'affichage." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"']kiwis", message: "N'écris pas le nom du produit à la main : affiche la variable produit." },
            ],
            sortie: "kiwis : inconnu",
          },
          felicitation: "Le test d'abord, la lecture ensuite : le programme ne plante plus. 🍌",
          indices: [
            "Un <code>if</code> qui teste si <code>produit</code> est une clé de <code>stock</code>, et un <code>else</code>.",
            "Dans le premier cas, affiche le produit, <code>\":\"</code>, puis la quantité lue avec <code>produit</code> comme clé ; dans le second, le produit, <code>\":\"</code> et <code>\"inconnu\"</code>.",
          ],
          solution: `stock = {"pommes": 12, "poires": 0, "bananes": 7}\nproduit = "kiwis"\nif produit in stock:\n    print(produit, ":", stock[produit])\nelse:\n    print(produit, ":", "inconnu")\n`,
          apres: `<span class="chapo">Une clé dans une variable</span>
            Entre les crochets, on peut mettre une variable : <code>stock[produit]</code>
            cherche la clé contenue dans <code>produit</code>. C'est ainsi qu'on travaille
            presque toujours, la clé n'étant connue qu'à l'exécution.`,
        },

        {
          id: "a3",
          type: "prediction",
          titre: "Une liste comme clé",
          contenu: `<p>Lis ces deux lignes sans les exécuter.</p>`,
          code: `a = {(1, 2): "point"}\nb = {[1, 2]: "point"}`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "les deux lignes fonctionnent",
              explication: "La première oui. Mais une liste est modifiable : elle ne peut pas servir de clé." },
            { texte: "la première fonctionne, la seconde provoque une erreur", correct: true,
              explication: "Oui : un p-uplet est immuable, il peut servir de clé. Une liste ne le peut pas : <code>TypeError: unhashable type: 'list'</code>." },
            { texte: "la première provoque une erreur, la seconde fonctionne",
              explication: "C'est l'inverse : c'est justement parce qu'il est immuable que le p-uplet est accepté comme clé." },
            { texte: "les deux provoquent une erreur : une clé doit être un texte",
              explication: "Une clé peut être un entier, un flottant, un texte ou un p-uplet : tout type immuable convient." },
          ],
          apres: `<span class="chapo">Clé immuable, valeur libre</span>
            Une liste ne peut pas être une clé, parce qu'elle pourrait changer après coup.
            Elle peut en revanche être une <strong>valeur</strong> :
            <code>{"Alice": [12, 15, 8]}</code> est parfaitement valide.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Les cases d'une grille",
          contenu: `
            <p>Dans un jeu, chaque case remarquable d'une grille est repérée par le couple
            de ses coordonnées. Affiche ce qui se trouve en <code>(3, 4)</code>, puis si
            la case <code>(2, 2)</code> est connue de <code>grille</code> :</p>
            <pre class="bloc-code"><code>arrivée
False</code></pre>`,
          depart: `grille = {(0, 0): "départ", (1, 2): "mur", (3, 4): "arrivée"}\n\n`,
          validation: {
            codeContient: [
              { motif: "grille\\s*\\[\\s*\\(\\s*3\\s*,\\s*4\\s*\\)\\s*\\]", message: "La case se lit avec le couple (3, 4) comme clé." },
              { motif: "\\(\\s*2\\s*,\\s*2\\s*\\)\\s+in\\s+grille\\b", message: "Teste la présence du couple (2, 2) parmi les clés, avec in." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(True|False|[\"']arriv)", message: "Les réponses doivent venir du dictionnaire." },
            ],
            sortie: "arrivée\nFalse",
          },
          felicitation: "Un couple de coordonnées, une clé naturelle — et immuable. 🧩",
          indices: [
            "La clé est le couple lui-même : on l'écrit, avec ses parenthèses, entre les crochets.",
            "Pour la seconde ligne, affiche le résultat du test <code>… in grille</code> avec le couple <code>(2, 2)</code>.",
          ],
          solution: `grille = {(0, 0): "départ", (1, 2): "mur", (3, 4): "arrivée"}\nprint(grille[(3, 4)])\nprint((2, 2) in grille)\n`,
        },

        {
          id: "a5",
          type: "qcm",
          titre: "De quel type ?",
          contenu: `<p>On reprend le lexique : <code>dico = {"bit": "…", "processeur": "…"}</code>.</p>`,
          question: "De quel type sont les clés de dico, et que renvoie len(dico) ?",
          options: [
            { texte: "des entiers, et 2",
              explication: "Les clés ne sont pas numérotées : ce sont les textes <code>\"bit\"</code> et <code>\"processeur\"</code>." },
            { texte: "des chaînes de caractères, et 2", correct: true,
              explication: "Oui : les clés sont des <code>str</code>, et le lexique compte deux entrées." },
            { texte: "des chaînes de caractères, et 4",
              explication: "<code>len</code> compte les entrées, pas les clés et les valeurs séparément." },
            { texte: "des dictionnaires, et 1",
              explication: "<code>dico</code> est un dictionnaire, mais ses clés sont de simples textes." },
          ],
          apres: `<span class="chapo">Le tableau du TP2</span>
            Clé <code>"bit"</code> → « élément d'information valant 0 ou 1 » ; clé
            <code>"processeur"</code> → « unité de calcul de l'ordinateur ». Deux clés de
            type <code>str</code>, deux entrées.`,
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
          titre: "Traduire mot à mot",
          contenu: `
            <p>Écris la fonction <code>traduire(mots, lexique)</code>, qui reçoit une liste
            de mots français et renvoie la liste de leurs traductions anglaises, lues dans
            <code>lexique</code>. Un mot absent du lexique est remplacé par
            <code>"?"</code>.</p>
            <pre class="bloc-code"><code>traduire(["chat", "noir"], LEXIQUE)       # renvoie ['cat', 'black']
traduire(["chat", "bleu"], LEXIQUE)       # renvoie ['cat', '?']</code></pre>`,
          depart: `LEXIQUE = {"chat": "cat", "chien": "dog", "noir": "black", "blanc": "white", "petit": "small"}\n\n\ndef traduire(mots, lexique):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours la liste des mots avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la liste des traductions." },
              { motif: "\\bin\\s+lexique\\b|lexique\\s*\\.\\s*get\\s*\\(", message: "Vérifie que chaque mot est une clé du lexique, avec in ou get()." },
            ],
            tests: `assert traduire(["chat", "noir"], LEXIQUE) == ["cat", "black"], "traduire([\\"chat\\", \\"noir\\"], LEXIQUE) doit renvoyer [\\"cat\\", \\"black\\"]"\nassert traduire(["chat", "bleu"], LEXIQUE) == ["cat", "?"], "un mot absent du lexique devient \\"?\\""\nassert traduire([], LEXIQUE) == [], "une liste vide donne une liste vide"\nassert traduire(["un", "deux"], {"un": "one"}) == ["one", "?"], "la fonction doit utiliser le lexique reçu en paramètre"`,
          },
          felicitation: "Un dictionnaire pour chercher, une liste pour ranger. 🇬🇧",
          indices: [
            "On part d'une liste vide, et on parcourt les mots un par un.",
            "Pour chaque mot : s'il est une clé du lexique, on ajoute sa traduction au résultat ; sinon on ajoute <code>\"?\"</code>. Avec <code>get()</code>, une seule ligne suffit.",
          ],
          solution: `LEXIQUE = {"chat": "cat", "chien": "dog", "noir": "black", "blanc": "white", "petit": "small"}\n\n\ndef traduire(mots, lexique):\n    resultat = []\n    for mot in mots:\n        if mot in lexique:\n            resultat.append(lexique[mot])\n        else:\n            resultat.append("?")\n    return resultat\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le prix du panier",
          contenu: `
            <p>Écris la fonction <code>prix_total(panier, tarifs)</code>, qui reçoit la
            liste des articles d'un panier et renvoie leur prix total, lu dans le
            dictionnaire <code>tarifs</code>. Un article inconnu des tarifs est
            <strong>ignoré</strong>, et un article peut apparaître plusieurs fois.</p>
            <pre class="bloc-code"><code>prix_total(["pain", "lait", "pain"], TARIFS)      # renvoie 3.4
prix_total(["pain", "caviar"], TARIFS)            # renvoie 1.2</code></pre>`,
          depart: `TARIFS = {"pain": 1.2, "lait": 1.0, "beurre": 2.5}\n\n\ndef prix_total(panier, tarifs):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le panier avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le total." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Calcule le total toi-même, avec un accumulateur." },
            ],
            tests: `assert abs(prix_total(["pain", "lait", "pain"], TARIFS) - 3.4) < 1e-9, "deux pains et un lait coûtent 3.4"\nassert abs(prix_total(["pain", "caviar"], TARIFS) - 1.2) < 1e-9, "le caviar est inconnu des tarifs : il est ignoré"\nassert prix_total([], TARIFS) == 0, "un panier vide coûte 0"\nassert prix_total(["x"], {"x": 5}) == 5, "la fonction doit utiliser les tarifs reçus en paramètre"`,
          },
          felicitation: "L'accumulateur du chapitre 4, nourri par un dictionnaire. 🛒",
          indices: [
            "C'est un accumulateur : un total à 0 avant la boucle, qu'on augmente dans la boucle.",
            "Pour chaque article, on n'ajoute son prix que s'il est une clé de <code>tarifs</code> — sinon on ne fait rien.",
          ],
          solution: `TARIFS = {"pain": 1.2, "lait": 1.0, "beurre": 2.5}\n\n\ndef prix_total(panier, tarifs):\n    total = 0\n    for article in panier:\n        if article in tarifs:\n            total = total + tarifs[article]\n    return total\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre dictionnaire",
          contenu: `
            <p>À toi de choisir : les capitales que tu connais, les numéros de tes
            joueurs préférés, les ingrédients d'une recette et leur quantité… Crée un
            dictionnaire d'<strong>au moins trois</strong> entrées, puis affiche, avec des
            phrases de ton choix :</p>
            <ul>
              <li>une valeur, lue par sa clé ;</li>
              <li>si une clé <strong>absente</strong> est présente, calculé avec <code>in</code> ;</li>
              <li>le nombre d'entrées, calculé avec <code>len()</code>.</li>
            </ul>`,
          depart: `# Ton dictionnaire ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\[\\s*[^\\]\\s][^\\]]*\\]", message: "Lis une valeur par sa clé, entre crochets." },
              { motif: "\\bin\\s+\\w+", message: "Teste la présence d'une clé avec in." },
              { motif: "\\blen\\s*\\(", message: "Le nombre d'entrées doit être calculé par len()." },
            ],
            sortieNonVide: true,
            tests: `_dicos = [v for k, v in list(globals().items()) if isinstance(v, dict) and not k.startswith("_") and k != "__builtins__"]\nassert any(len(v) >= 3 for v in _dicos), "Ton dictionnaire doit contenir au moins trois entrées."`,
          },
          felicitation: "Ton dictionnaire, tes clés : tu sais créer et interroger un dictionnaire. ✨",
          indices: [
            "Commence par une ligne <code>mon_dico = { … }</code> avec au moins trois couples <code>clé: valeur</code>.",
            "Puis trois <code>print</code> : une valeur lue entre crochets, un test <code>… in mon_dico</code> avec une clé qui n'y est pas, et <code>len()</code>.",
          ],
          solution: `maillots = {"Mbappé": 10, "Griezmann": 7, "Maignan": 16}\nprint("Mbappé porte le", maillots["Mbappé"])\nprint("Zidane est-il dans l'équipe ?", "Zidane" in maillots)\nprint("Joueurs :", len(maillots))\n`,
        },
      ],
    },
  ],
};

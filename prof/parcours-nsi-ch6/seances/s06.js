/* NSI — chapitre 6, séance 6 : parcourir un dictionnaire.
 * Reprend la section « Parcourir un dictionnaire » du cours (keys, values,
 * items), la suite du TP3 (les méthodes, la fonction concatener, la fonction
 * cherche et le piège de la majuscule) et les exercices 18, 19, 21, 26 et 29.
 */

export default {
  id: "s06",
  numero: 6,
  titre: "Parcourir un dictionnaire",
  sousTitre: "Les clés, les valeurs, ou les deux",
  palier: "Partie 2 — Les dictionnaires",

  accroche: `Afficher tous les contacts d'un répertoire, additionner toutes les notes
    d'un carnet, retrouver le meilleur élève : il faut passer en revue
    <strong>chaque entrée</strong>. Une boucle <code>for</code> le fait, de trois
    façons selon ce qu'on veut récupérer.`,

  objectifs: [
    "parcourir les <strong>clés</strong> d'un dictionnaire, avec ou sans <code>keys()</code>",
    "parcourir ses <strong>valeurs</strong> avec <code>values()</code>",
    "parcourir ses <strong>entrées</strong> avec <code>items()</code> et le déballage",
    "construire un nouveau dictionnaire au fil d'une boucle",
  ],

  motDeLaFin: `Trois parcours, trois méthodes : <code>keys()</code>, <code>values()</code>,
    <code>items()</code>. À la séance 7, on combine tout ce que tu sais pour écrire
    l'algorithme le plus utile du chapitre : <strong>compter des occurrences</strong>.`,

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
          titre: "Parcourir les clés",
          contenu: `
            <p>Une boucle <code>for</code> sur un dictionnaire parcourt ses
            <strong>clés</strong> :</p>

            <pre class="bloc-code"><code>d = {"a": 1, "b": 2}

for cle in d:
    print(cle)          # a, puis b

for cle in d.keys():    # la même chose, écrite explicitement
    print(cle)</code></pre>

            <div class="encadre">
              <span class="chapo">La méthode keys()</span>
              <code>d.keys()</code> renvoie la collection des clés du dictionnaire :
              <code>dict_keys(['a', 'b'])</code>. On peut la parcourir avec
              <code>for</code>, comme une liste.
            </div>

            <p>Les clés sont parcourues dans l'<strong>ordre où elles ont été
            ajoutées</strong>. Et une clé permet toujours de retrouver sa valeur :
            <code>d[cle]</code>, dans la boucle.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Tous les pays",
          contenu: `
            <p>Affiche, avec une boucle, chaque pays de <code>capitales</code> suivi de sa
            capitale :</p>
            <pre class="bloc-code"><code>France Paris
Italie Rome
Espagne Madrid</code></pre>`,
          depart: `capitales = {"France": "Paris", "Italie": "Rome", "Espagne": "Madrid"}\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+capitales\\b", message: "Parcours les clés de capitales avec une boucle for." },
              { motif: "capitales\\s*\\[\\s*\\w+\\s*\\]", message: "Dans la boucle, lis la capitale avec la clé courante entre crochets." },
            ],
            codeAbsent: [
              { motif: "[\"'](Paris|Rome|Madrid)[\"'][\\s\\S]*[\"'](Paris|Rome|Madrid)[\"'][\\s\\S]*[\"'](Paris|Rome|Madrid)[\"'][\\s\\S]*[\"'](Paris|Rome|Madrid)[\"']", message: "N'écris pas les capitales à la main : lis-les dans le dictionnaire." },
            ],
            sortie: "France Paris\nItalie Rome\nEspagne Madrid",
          },
          felicitation: "Une boucle, trois tours, une ligne par entrée. 🌍",
          indices: [
            "La boucle donne à la variable de boucle chaque clé à tour de rôle : ici, chaque pays.",
            "Dans la boucle, un <code>print</code> du pays et de la valeur lue avec ce pays comme clé.",
          ],
          solution: `capitales = {"France": "Paris", "Italie": "Rome", "Espagne": "Madrid"}\nfor pays in capitales:\n    print(pays, capitales[pays])\n`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Parcourir les valeurs",
          contenu: `
            <p>Quand seules les valeurs comptent, la méthode <code>values()</code> les
            donne directement :</p>

            <pre class="bloc-code"><code>notes = {"Alice": 14, "Bob": 11, "Chloé": 17}

for note in notes.values():
    print(note)          # 14, 11, puis 17</code></pre>

            <div class="encadre">
              <span class="chapo">La méthode values()</span>
              <code>d.values()</code> renvoie la collection des valeurs :
              <code>dict_values([14, 11, 17])</code>. On perd l'information de la clé ;
              c'est le bon choix pour additionner, compter, chercher un maximum…
            </div>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "La somme des valeurs",
          contenu: `
            <p>Écris la fonction <code>somme_valeurs(dico)</code>, qui renvoie la somme des
            valeurs d'un dictionnaire de nombres, avec une boucle sur
            <code>values()</code>.</p>
            <pre class="bloc-code"><code>somme_valeurs({"Alice": 14, "Bob": 11})    # renvoie 25</code></pre>`,
          depart: `def somme_valeurs(dico):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.values\\s*\\(\\s*\\)", message: "Parcours les valeurs avec dico.values()." },
              { motif: "\\bfor\\b", message: "Parcours les valeurs avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Écris l'accumulateur toi-même, sans sum()." },
            ],
            tests: `assert somme_valeurs({"Alice": 14, "Bob": 11}) == 25, "somme_valeurs({\\"Alice\\": 14, \\"Bob\\": 11}) doit renvoyer 25"\nassert somme_valeurs({}) == 0, "la somme des valeurs d'un dictionnaire vide est 0"\nassert somme_valeurs({"a": -3, "b": 3, "c": 10}) == 10, "somme_valeurs({\\"a\\": -3, \\"b\\": 3, \\"c\\": 10}) doit renvoyer 10"`,
          },
          felicitation: "L'accumulateur du chapitre 4, branché sur values(). ➕",
          indices: [
            "Un total à 0 avant la boucle, augmenté de chaque valeur dans la boucle, renvoyé après.",
            "La boucle parcourt <code>dico.values()</code> : sa variable reçoit directement chaque valeur.",
          ],
          solution: `def somme_valeurs(dico):\n    total = 0\n    for valeur in dico.values():\n        total = total + valeur\n    return total\n`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Clés ou valeurs ?",
          contenu: `<p>On considère <code>d = {"a": 1, "b": 2}</code>. Lis ces instructions
            sans les exécuter.</p>`,
          code: `print("a" in d)\nprint(1 in d)\nprint("a" in d.keys())\nprint(1 in d.values())`,
          question: "Qu'affichent-elles, dans l'ordre ?",
          options: [
            { texte: "<code>True</code>, <code>True</code>, <code>True</code>, <code>True</code>",
              explication: "La deuxième est le piège : <code>1</code> est une valeur, et <code>in d</code> ne regarde que les clés." },
            { texte: "<code>True</code>, <code>False</code>, <code>True</code>, <code>True</code>", correct: true,
              explication: "Oui : <code>in d</code> et <code>in d.keys()</code> cherchent parmi les clés ; il faut <code>in d.values()</code> pour chercher parmi les valeurs." },
            { texte: "<code>True</code>, <code>False</code>, <code>True</code>, <code>False</code>",
              explication: "<code>d.values()</code> contient bien 1 : la dernière ligne affiche <code>True</code>." },
            { texte: "<code>True</code>, <code>False</code>, <code>False</code>, <code>True</code>",
              explication: "<code>d.keys()</code> contient bien <code>\"a\"</code> : <code>\"a\" in d.keys()</code> vaut <code>True</code>." },
          ],
          apres: `<span class="chapo">Demander explicitement les valeurs</span>
            Par défaut, un dictionnaire, c'est ses clés : pour <code>in</code> comme pour
            <code>for</code>. Pour interroger les valeurs, il faut le dire, avec
            <code>values()</code>.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Parcourir les entrées",
          contenu: `
            <p>Quand on a besoin de la clé <strong>et</strong> de la valeur, la méthode
            <code>items()</code> donne les entrées sous forme de couples, qu'on
            <strong>déballe</strong> dans la boucle — comme à la séance 3 :</p>

            <pre class="bloc-code"><code>d = {"a": 1, "b": 2}

for cle, valeur in d.items():
    print(cle, "→", valeur)      # a → 1, puis b → 2</code></pre>

            <div class="encadre">
              <span class="chapo">La méthode items()</span>
              <code>d.items()</code> renvoie la collection des entrées, chacune sous forme
              de p-uplet : <code>dict_items([('a', 1), ('b', 2)])</code>. Deux variables
              après le <code>for</code>, et chaque couple est déballé à chaque tour.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Le bulletin",
          contenu: `
            <p>Avec une boucle sur <code>items()</code>, affiche une ligne par élève :</p>
            <pre class="bloc-code"><code>Alice a obtenu 14
Bob a obtenu 11
Chloé a obtenu 17</code></pre>`,
          depart: `notes = {"Alice": 14, "Bob": 11, "Chloé": 17}\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s*,\\s*\\w+\\s+in\\s+notes\\s*\\.\\s*items\\s*\\(\\s*\\)", message: "Parcours les entrées avec for nom, note in notes.items()." },
            ],
            codeAbsent: [
              { motif: "notes\\s*\\[", message: "Avec items(), pas besoin de relire la valeur entre crochets : elle est déjà dans la deuxième variable." },
            ],
            sortie: "Alice a obtenu 14\nBob a obtenu 11\nChloé a obtenu 17",
          },
          felicitation: "Deux variables, un déballage par tour : items() donne tout. 📋",
          indices: [
            "Après le <code>for</code>, deux noms de variables séparés par une virgule ; après le <code>in</code>, l'appel de <code>items()</code> sur le dictionnaire.",
            "Dans la boucle, un <code>print</code> du nom, du texte <code>\"a obtenu\"</code> et de la note.",
          ],
          solution: `notes = {"Alice": 14, "Bob": 11, "Chloé": 17}\nfor nom, note in notes.items():\n    print(nom, "a obtenu", note)\n`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "La fonction concatener",
          contenu: `<p>Pierre a écrit cette fonction pour son lexique de verbes. Lis-la sans
            l'exécuter.</p>`,
          code: `def concatener(mots):\n    c = ""\n    for valeur in mots.values():\n        c = c + valeur + ", "\n    return c\n\nmots = {"avoir": "have, had, had", "aller": "go, went, gone"}\nprint(concatener(mots))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>avoir, aller, </code>",
              explication: "La boucle parcourt <code>values()</code>, pas les clés : ce sont les formes anglaises qui sont recollées." },
            { texte: "<code>have, had, had, go, went, gone, </code>", correct: true,
              explication: "Oui : chaque valeur est ajoutée, suivie de <code>\", \"</code> — y compris la dernière, d'où la virgule finale." },
            { texte: "<code>have, had, had, go, went, gone</code>",
              explication: "Presque : <code>\", \"</code> est ajouté après <strong>chaque</strong> valeur, la dernière comprise." },
            { texte: "<code>avoir have, had, had, aller go, went, gone, </code>",
              explication: "<code>values()</code> ne donne que les valeurs : les clés n'apparaissent pas." },
          ],
          apres: `<span class="chapo">Changer de parcours</span>
            Avec <code>mots.keys()</code> à la place de <code>mots.values()</code>, la
            fonction recollerait les verbes français : <code>avoir, aller, </code>. Avec
            <code>mots.items()</code>, chaque tour donnerait un couple, et
            <code>c + valeur</code> échouerait : on n'ajoute pas un p-uplet à un texte.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>notes = {"Alice": 14, "Bob": 11}

for nom in notes:                    # les clés (comme notes.keys())
    print(nom, notes[nom])

for note in notes.values():          # les valeurs
    print(note)

for nom, note in notes.items():      # les entrées, déballées
    print(nom, note)</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>Je parcours</th></tr>
              <tr><td>les clés (et lire la valeur au besoin)</td><td><code>for cle in d:</code></td></tr>
              <tr><td>seulement les valeurs</td><td><code>for v in d.values():</code></td></tr>
              <tr><td>la clé et la valeur</td><td><code>for cle, v in d.items():</code></td></tr>
              <tr><td>savoir si <code>x</code> est une valeur</td><td><code>x in d.values()</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>écrire <code>for cle, v in d:</code> sans <code>.items()</code> : la boucle donne des clés seules, le déballage échoue ;</li>
                <li>oublier les parenthèses : <code>d.items</code> sans <code>()</code> n'appelle pas la méthode ;</li>
                <li>ajouter ou supprimer des entrées <strong>pendant</strong> un parcours du même dictionnaire : <code>RuntimeError</code>.</li>
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
          titre: "La moyenne des valeurs",
          contenu: `
            <p>La fonction <code>somme_valeurs</code> est écrite. Écris
            <code>moyenne_valeurs(dico)</code>, qui renvoie la moyenne des valeurs d'un
            dictionnaire non vide, en <strong>appelant</strong>
            <code>somme_valeurs</code>.</p>
            <pre class="bloc-code"><code>moyenne_valeurs({"Alice": 14, "Bob": 11, "Chloé": 17})    # renvoie 14.0</code></pre>`,
          depart: `def somme_valeurs(dico):\n    total = 0\n    for valeur in dico.values():\n        total = total + valeur\n    return total\n\n\ndef moyenne_valeurs(dico):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+moyenne_valeurs[\\s\\S]*\\bsomme_valeurs\\s*\\(", message: "moyenne_valeurs doit appeler somme_valeurs." },
              { motif: "\\blen\\s*\\(", message: "Le nombre de valeurs, c'est le nombre d'entrées : len()." },
            ],
            codeAbsent: [
              { motif: "\\bfor\\b[\\s\\S]*\\bfor\\b", message: "Pas de nouvelle boucle : somme_valeurs fait déjà le parcours." },
            ],
            tests: `assert moyenne_valeurs({"Alice": 14, "Bob": 11, "Chloé": 17}) == 14, "la moyenne de 14, 11 et 17 est 14.0"\nassert moyenne_valeurs({"x": 5}) == 5, "avec une seule valeur, la moyenne est cette valeur"\nassert abs(moyenne_valeurs({"a": 1, "b": 2}) - 1.5) < 1e-9, "la moyenne de 1 et 2 est 1.5"`,
          },
          felicitation: "Une fonction qui en appelle une autre : rien n'est écrit deux fois. 🧮",
          indices: [
            "La moyenne, c'est la somme divisée par le nombre de valeurs.",
            "La somme, <code>somme_valeurs</code> la calcule déjà ; le nombre de valeurs est celui des entrées du dictionnaire.",
          ],
          solution: `def somme_valeurs(dico):\n    total = 0\n    for valeur in dico.values():\n        total = total + valeur\n    return total\n\n\ndef moyenne_valeurs(dico):\n    return somme_valeurs(dico) / len(dico)\n`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Le verbe introuvable",
          contenu: `<p>Pierre a écrit la fonction <code>cherche(verbe, mots)</code>, qui
            renvoie <code>verbe in mots</code>. Il crée son dictionnaire en recopiant
            l'en-tête du tableau du TP3, puis teste :</p>`,
          code: `mots = {"Avoir": "have, had, had", "Savoir": "know, knew, known"}\nprint(cherche("avoir", mots))`,
          question: "La console affiche False. Pourquoi ?",
          options: [
            { texte: "parce que <code>in</code> cherche parmi les valeurs",
              explication: "Non : <code>in</code> cherche bien parmi les clés. Le problème est dans l'écriture de la clé." },
            { texte: "parce que la clé est <code>\"Avoir\"</code>, avec une majuscule", correct: true,
              explication: "Oui : pour Python, <code>\"Avoir\"</code> et <code>\"avoir\"</code> sont deux textes différents. La clé cherchée n'existe pas." },
            { texte: "parce qu'il faut écrire <code>mots.keys()</code> dans <code>cherche</code>",
              explication: "<code>verbe in mots</code> et <code>verbe in mots.keys()</code> donnent le même résultat." },
            { texte: "parce qu'un dictionnaire ne peut pas contenir de verbes",
              explication: "Une clé peut être n'importe quel texte." },
          ],
          apres: `<span class="chapo">La casse compte</span>
            Une clé se compare caractère par caractère, majuscules comprises. Une parade :
            stocker toutes les clés en minuscules, et chercher
            <code>verbe.lower()</code>.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Le dictionnaire des carrés",
          contenu: `
            <p>Écris la fonction <code>carres(n)</code>, qui renvoie le dictionnaire
            associant chaque entier de 1 à <code>n</code> à son carré. Pars du dictionnaire
            vide et remplis-le avec une boucle.</p>
            <pre class="bloc-code"><code>carres(4)     # renvoie {1: 1, 2: 4, 3: 9, 4: 16}</code></pre>`,
          depart: `def carres(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "=\\s*\\{\\s*\\}", message: "Pars du dictionnaire vide, {}." },
              { motif: "\\bfor\\b", message: "Remplis le dictionnaire avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le dictionnaire." },
            ],
            tests: `assert carres(4) == {1: 1, 2: 4, 3: 9, 4: 16}, "carres(4) doit renvoyer {1: 1, 2: 4, 3: 9, 4: 16}"\nassert carres(1) == {1: 1}, "carres(1) doit renvoyer {1: 1}"\nassert carres(0) == {}, "carres(0) doit renvoyer le dictionnaire vide"\nassert len(carres(10)) == 10 and carres(10)[10] == 100, "carres(10) doit avoir 10 entrées, et associer 10 à 100"`,
          },
          felicitation: "Un dictionnaire vide, une boucle, une entrée par tour. 🔢",
          indices: [
            "La boucle doit parcourir les entiers de 1 à <code>n</code> inclus : attention à la borne de <code>range</code>.",
            "À chaque tour, une affectation crée l'entrée dont la clé est l'entier et la valeur son carré.",
          ],
          solution: `def carres(n):\n    d = {}\n    for i in range(1, n + 1):\n        d[i] = i * i\n    return d\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : qui a la moyenne ?",
          contenu: `
            <p>Ce programme devrait afficher le nom des élèves qui ont au moins 10 :</p>
            <pre class="bloc-code"><code>Alice a la moyenne
Chloé a la moyenne</code></pre>
            <p>Il contient <strong>deux erreurs</strong>.</p>`,
          depart: `notes = {"Alice": 14, "Bob": 9, "Chloé": 17}\nfor nom, note in notes:\n    if note >= 10\n        print(nom, "a la moyenne")\n`,
          validation: {
            codeContient: [
              { motif: "\\bin\\s+notes\\s*\\.\\s*items\\s*\\(\\s*\\)", message: "Pour obtenir le nom et la note à chaque tour, parcours notes.items()." },
            ],
            sortie: "Alice a la moyenne\nChloé a la moyenne",
          },
          felicitation: "Les deux-points du if, et items() pour avoir les deux. 🎓",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde la fin de la ligne du <code>if</code>.",
            "La seconde est une <code>ValueError</code> : sans méthode, la boucle donne des clés seules, qu'on ne peut pas déballer en deux variables.",
          ],
          solution: `notes = {"Alice": 14, "Bob": 9, "Chloé": 17}\nfor nom, note in notes.items():\n    if note >= 10:\n        print(nom, "a la moyenne")\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Fusionner deux dictionnaires",
          contenu: `
            <p>Écris la fonction <code>fusionner(d1, d2)</code>, qui renvoie un
            <strong>nouveau</strong> dictionnaire réunissant les entrées des deux. En cas
            de clé commune, c'est la valeur de <code>d2</code> qui l'emporte.</p>
            <p>Les deux dictionnaires reçus ne doivent <strong>pas</strong> être modifiés.</p>
            <pre class="bloc-code"><code>fusionner({"a": 1, "b": 2}, {"b": 20, "c": 30})
# renvoie {'a': 1, 'b': 20, 'c': 30}</code></pre>`,
          depart: `def fusionner(d1, d2):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Recopie les entrées avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nouveau dictionnaire." },
            ],
            codeAbsent: [
              { motif: "\\.update\\s*\\(|\\*\\*\\s*d[12]|\\|", message: "Écris la fusion toi-même, avec des boucles." },
            ],
            tests: `_a = {"a": 1, "b": 2}\n_b = {"b": 20, "c": 30}\n_r = fusionner(_a, _b)\nassert _r == {"a": 1, "b": 20, "c": 30}, "fusionner({\\"a\\": 1, \\"b\\": 2}, {\\"b\\": 20, \\"c\\": 30}) doit renvoyer {\\"a\\": 1, \\"b\\": 20, \\"c\\": 30}"\nassert _a == {"a": 1, "b": 2}, "d1 ne doit pas être modifié : construis un nouveau dictionnaire"\nassert _b == {"b": 20, "c": 30}, "d2 ne doit pas être modifié"\nassert fusionner({}, {}) == {}, "la fusion de deux dictionnaires vides est vide"\nassert fusionner({"x": 1}, {}) == {"x": 1}, "fusionner avec un dictionnaire vide redonne l'autre"`,
          },
          felicitation: "Un nouveau dictionnaire, deux boucles, et personne d'autre n'est touché. 🔗",
          indices: [
            "Le piège est celui du chapitre 4 : écrire <code>resultat = d1</code> ne copie rien, et modifier <code>resultat</code> modifierait <code>d1</code>. Pars du dictionnaire vide.",
            "Une boucle recopie les entrées de <code>d1</code>, puis une seconde celles de <code>d2</code> : celles-ci, écrites en dernier, écrasent les clés communes.",
          ],
          solution: `def fusionner(d1, d2):\n    resultat = {}\n    for cle, valeur in d1.items():\n        resultat[cle] = valeur\n    for cle, valeur in d2.items():\n        resultat[cle] = valeur\n    return resultat\n`,
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
          titre: "Inverser un dictionnaire",
          contenu: `
            <p>Écris la fonction <code>inverse(dico)</code>, qui renvoie un nouveau
            dictionnaire où les clés deviennent les valeurs, et réciproquement. On suppose
            les valeurs toutes différentes.</p>
            <pre class="bloc-code"><code>inverse({"un": 1, "deux": 2})     # renvoie {1: 'un', 2: 'deux'}</code></pre>
            <p>Une fois validé, essaie <code>print(inverse({"Alice": 15, "Bob": 15}))</code>.
            Que s'est-il passé ?</p>`,
          depart: `def inverse(dico):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.items\\s*\\(\\s*\\)", message: "Il faut la clé et la valeur à chaque tour : parcours items()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nouveau dictionnaire." },
            ],
            tests: `assert inverse({"un": 1, "deux": 2}) == {1: "un", 2: "deux"}, "inverse({\\"un\\": 1, \\"deux\\": 2}) doit renvoyer {1: \\"un\\", 2: \\"deux\\"}"\nassert inverse({}) == {}, "l'inverse du dictionnaire vide est vide"\n_d = {"a": "x"}\n_r = inverse(_d)\nassert _r == {"x": "a"} and _d == {"a": "x"}, "le dictionnaire reçu ne doit pas être modifié"`,
          },
          felicitation: "Chaque couple retourné : la valeur devient la clé. 🔃",
          indices: [
            "On part du dictionnaire vide, et on parcourt les entrées avec <code>items()</code>.",
            "À chaque tour, on crée dans le résultat l'entrée dont la <strong>clé</strong> est la valeur lue et la <strong>valeur</strong> est la clé lue.",
          ],
          solution: `def inverse(dico):\n    resultat = {}\n    for cle, valeur in dico.items():\n        resultat[valeur] = cle\n    return resultat\n`,
          apres: `<span class="chapo">Quand deux valeurs sont égales</span>
            <code>inverse({"Alice": 15, "Bob": 15})</code> donne <code>{15: 'Bob'}</code> :
            une seule entrée. Les deux élèves produisent la même clé 15 ; la seconde
            écriture écrase la première, et Alice disparaît. D'où l'hypothèse « valeurs
            toutes différentes » : sans elle, l'inversion perd de l'information.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Les carrés en une ligne",
          contenu: `
            <p>Au chapitre 4, une liste se construisait en une ligne, en compréhension :
            <code>[i * i for i in range(5)]</code>. Un dictionnaire aussi, avec un couple
            <code>clé: valeur</code> entre accolades :</p>
            <pre class="bloc-code"><code>{x: 2 * x for x in range(3)}     # {0: 0, 1: 2, 2: 4}</code></pre>
            <p>Écris <code>carres_comprehension(n)</code>, qui fait la même chose que
            <code>carres(n)</code>, mais dont le corps tient en <strong>une seule
            ligne</strong> : un <code>return</code> suivi d'une compréhension.</p>`,
          depart: `def carres_comprehension(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\s*\\{[^}]*:[^}]*\\bfor\\b[^}]*\\}", message: "Renvoie directement une compréhension de dictionnaire : {clé: valeur for … in …}." },
            ],
            codeAbsent: [
              { motif: "^\\s+for\\b", message: "Pas de boucle sur plusieurs lignes : tout tient dans la compréhension.", options: "m" },
            ],
            tests: `assert carres_comprehension(4) == {1: 1, 2: 4, 3: 9, 4: 16}, "carres_comprehension(4) doit renvoyer {1: 1, 2: 4, 3: 9, 4: 16}"\nassert carres_comprehension(0) == {}, "carres_comprehension(0) doit renvoyer le dictionnaire vide"\nassert carres_comprehension(1) == {1: 1}, "carres_comprehension(1) doit renvoyer {1: 1}"`,
          },
          felicitation: "Une compréhension de dictionnaire : le même travail, en une ligne. ⚡",
          indices: [
            "La forme générale : <code>{cle: valeur for variable in …}</code>.",
            "Ici, la clé est l'entier, la valeur son carré, et l'entier parcourt le même <code>range</code> que dans <code>carres</code>.",
          ],
          solution: `def carres_comprehension(n):\n    return {i: i * i for i in range(1, n + 1)}\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Le meilleur élève",
          contenu: `
            <p>Écris la fonction <code>meilleur(notes)</code>, qui reçoit un dictionnaire
            non vide <code>nom → note</code> et renvoie le <strong>couple</strong>
            <code>(nom, note)</code> de l'élève qui a la meilleure note. En cas d'égalité,
            le premier rencontré l'emporte.</p>
            <pre class="bloc-code"><code>meilleur({"Alice": 14, "Bob": 18, "Chloé": 17})    # renvoie ('Bob', 18)</code></pre>`,
          depart: `def meilleur(notes):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.items\\s*\\(\\s*\\)", message: "Il faut le nom et la note à chaque tour : parcours items()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le couple." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "Écris la recherche du maximum toi-même, sans max()." },
            ],
            tests: `assert meilleur({"Alice": 14, "Bob": 18, "Chloé": 17}) == ("Bob", 18), "meilleur({\\"Alice\\": 14, \\"Bob\\": 18, \\"Chloé\\": 17}) doit renvoyer (\\"Bob\\", 18)"\nassert meilleur({"Zoé": 5}) == ("Zoé", 5), "avec un seul élève, c'est lui le meilleur"\nassert meilleur({"A": 12, "B": 15, "C": 15}) == ("B", 15), "en cas d'égalité, le premier rencontré l'emporte"\nassert meilleur({"A": -2, "B": -1}) == ("B", -1), "les notes peuvent être négatives : le record ne part pas de 0"`,
          },
          felicitation: "La recherche du maximum, qui rend le nom et la note d'un coup. 🥇",
          indices: [
            "C'est la recherche d'un record du chapitre 4 : deux variables, le nom record et la note record. Pour les initialiser, une première boucle qui s'arrête tout de suite, ou <code>None</code> pour le nom et une note impossible.",
            "Dans la boucle sur <code>items()</code>, on remplace le record quand la note est <strong>strictement</strong> plus grande — c'est ce qui garde le premier en cas d'égalité.",
            "Après la boucle, renvoie les deux records ensemble.",
          ],
          solution: `def meilleur(notes):\n    nom_record = None\n    note_record = None\n    for nom, note in notes.items():\n        if note_record is None or note > note_record:\n            nom_record = nom\n            note_record = note\n    return (nom_record, note_record)\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Ton propre bulletin",
          contenu: `
            <p>Crée le dictionnaire de tes matières et de tes notes (inventées si tu
            préfères), avec <strong>au moins trois</strong> entrées. Puis, avec une boucle
            sur <code>items()</code>, affiche une ligne par matière, et termine par ta
            moyenne, calculée par le programme.</p>`,
          depart: `# Ton bulletin ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s*,\\s*\\w+\\s+in\\s+\\w+\\s*\\.\\s*items\\s*\\(\\s*\\)", message: "Affiche les matières avec une boucle sur items()." },
              { motif: "\\blen\\s*\\(", message: "La moyenne se calcule avec le nombre de matières : len()." },
            ],
            sortieNonVide: true,
            tests: `_dicos = [v for k, v in list(globals().items()) if isinstance(v, dict) and not k.startswith("_")]\nassert any(len(v) >= 3 and all(isinstance(x, (int, float)) for x in v.values()) for v in _dicos), "Ton bulletin doit associer au moins trois matières à des notes (des nombres)."`,
          },
          felicitation: "Ton bulletin, calculé par ton programme : les trois parcours sont acquis. ✨",
          indices: [
            "Commence par <code>bulletin = { … }</code> avec au moins trois couples <code>\"matière\": note</code>.",
            "Une boucle sur <code>items()</code> affiche chaque ligne et alimente un total ; après la boucle, affiche le total divisé par <code>len()</code>.",
          ],
          solution: `bulletin = {"maths": 15, "NSI": 18, "anglais": 13}\ntotal = 0\nfor matiere, note in bulletin.items():\n    print(matiere, ":", note)\n    total = total + note\nprint("Moyenne :", total / len(bulletin))\n`,
        },
      ],
    },
  ],
};

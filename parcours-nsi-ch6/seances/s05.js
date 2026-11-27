/* NSI — chapitre 6, séance 5 : modifier un dictionnaire.
 * Reprend les sections « Ajouter ou modifier une entrée » et « Supprimer une
 * entrée » du cours, la « Première approche » du TP2 (dictionnaire vide rempli
 * à la main, entrée RAM, len), le début du TP3 (le dictionnaire des verbes, la
 * clé en double) et les exercices 14, 16 et 25.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "Modifier un dictionnaire",
  sousTitre: "Ajouter, mettre à jour, supprimer",
  palier: "Partie 2 — Les dictionnaires",

  accroche: `Un dictionnaire n'est pas figé comme un p-uplet : une élève arrive, une
    note est corrigée, un contact est effacé. Une seule écriture sert à la fois à
    ajouter et à modifier, et une instruction de plus suffit à supprimer.`,

  objectifs: [
    "ajouter une entrée et modifier une valeur avec la même écriture <code>d[cle] = valeur</code>",
    "calculer une nouvelle valeur à partir de l'ancienne",
    "supprimer une entrée avec <code>del</code>, sans erreur si elle est absente",
    "comprendre qu'une clé ne peut pas exister en double",
  ],

  motDeLaFin: `Créer, lire, modifier, supprimer : tu as en main toutes les opérations
    sur une entrée. Il reste à les enchaîner sur <strong>toutes</strong> les entrées
    d'un dictionnaire : à la séance 6, on le parcourt avec une boucle.`,

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
          titre: "Une écriture pour deux usages",
          contenu: `
            <p>Pour ajouter une entrée <em>ou</em> modifier une valeur, on écrit la même
            chose : <code>d[cle] = valeur</code>.</p>

            <pre class="bloc-code"><code>personne = {"nom": "Alice", "age": 23}

personne["ville"] = "Paris"   # la clé "ville" n'existe pas : elle est AJOUTÉE
personne["age"] = 24          # la clé "age" existe : sa valeur est REMPLACÉE

print(personne)    # {'nom': 'Alice', 'age': 24, 'ville': 'Paris'}</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Tout dépend de la clé</span>
              Si la clé existe déjà, sa valeur est remplacée ; sinon, une nouvelle entrée
              est créée. On part très souvent du dictionnaire vide, <code>{}</code>, qu'on
              remplit entrée par entrée.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Remplir un lexique vide",
          contenu: `
            <p>Le lexique <code>dico</code> part vide. Ajoute-lui, avec la syntaxe
            <code>dico[clé] = valeur</code> :</p>
            <ul>
              <li>la clé <code>"bit"</code>, associée à <code>"élément d'information valant 0 ou 1"</code> ;</li>
              <li>la clé <code>"processeur"</code>, associée à <code>"unité de calcul de l'ordinateur"</code>.</li>
            </ul>
            <p>Puis affiche son nombre d'entrées :</p>
            <pre class="bloc-code"><code>2</code></pre>`,
          depart: `dico = {}\n\n`,
          validation: {
            codeContient: [
              { motif: "dico\\s*\\[\\s*[\"']bit[\"']\\s*\\]\\s*=(?!=)", message: "Ajoute la clé \"bit\" avec dico[\"bit\"] = …" },
              { motif: "dico\\s*\\[\\s*[\"']processeur[\"']\\s*\\]\\s*=(?!=)", message: "Ajoute la clé \"processeur\" avec dico[\"processeur\"] = …" },
              { motif: "\\blen\\s*\\(\\s*dico\\s*\\)", message: "Le nombre d'entrées se calcule avec len()." },
            ],
            codeAbsent: [
              { motif: "dico\\s*=\\s*\\{\\s*[\"']", message: "Pars du dictionnaire vide et ajoute les entrées une par une." },
            ],
            sortie: "2",
            tests: `assert dico == {"bit": "élément d'information valant 0 ou 1", "processeur": "unité de calcul de l'ordinateur"}, "dico doit contenir exactement les deux définitions demandées"`,
          },
          felicitation: "Deux affectations, deux entrées : le dictionnaire grandit à la demande. 📗",
          indices: [
            "Une ligne par entrée : le nom du dictionnaire, la clé entre crochets, un <code>=</code>, puis la définition. Les guillemets doubles permettent l'apostrophe à l'intérieur.",
            "Puis un <code>print</code> de ce que renvoie <code>len()</code>.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Remplacer une valeur",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `d = {"x": 5}\nd["x"] = 8\nprint(d)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>{'x': 8}</code>", correct: true,
              explication: "Oui : la clé <code>\"x\"</code> existait, sa valeur a été remplacée. Le dictionnaire compte toujours une seule entrée." },
            { texte: "<code>{'x': 5, 'x': 8}</code>",
              explication: "Une clé ne peut pas exister en double : la seconde affectation remplace la première valeur." },
            { texte: "<code>{'x': 13}</code>",
              explication: "<code>=</code> remplace, il n'additionne pas. Pour ajouter 8, il faudrait <code>d[\"x\"] = d[\"x\"] + 8</code>." },
            { texte: "<code>{'x': 5}</code>",
              explication: "Un dictionnaire est modifiable : l'affectation a bien eu lieu." },
          ],
          apres: `<span class="chapo">Modifier, c'est remplacer la valeur</span>
            La clé reste, seule sa valeur change. C'est ce que fait un dictionnaire, et
            ce qu'un p-uplet refuse.`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Une nouvelle clé calculée",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `d = {"a": 1, "b": 2}\nd["c"] = d["a"] + d["b"]\nprint(d)\nprint(len(d))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>{'a': 1, 'b': 2, 'c': 3}</code> puis <code>3</code>", correct: true,
              explication: "Oui : la clé <code>\"c\"</code> n'existait pas, elle a été créée, avec la somme des deux autres valeurs. Trois entrées en tout." },
            { texte: "une erreur, car la clé <code>\"c\"</code> n'existe pas",
              explication: "On <strong>écrit</strong> dans <code>d[\"c\"]</code>, on ne la lit pas : écrire dans une clé absente la crée. Seule la lecture d'une clé absente est une erreur." },
            { texte: "<code>{'a': 1, 'b': 2, 'c': 3}</code> puis <code>6</code>",
              explication: "<code>len</code> compte les entrées, pas la somme des valeurs." },
            { texte: "<code>{'c': 3}</code> puis <code>1</code>",
              explication: "Ajouter une entrée ne supprime pas les autres." },
          ],
          apres: `<span class="chapo">Lire à droite, écrire à gauche</span>
            À droite du <code>=</code>, <code>d["a"]</code> et <code>d["b"]</code> sont
            <strong>lus</strong> : ils doivent exister. À gauche, <code>d["c"]</code> est
            <strong>écrit</strong> : il est créé s'il le faut.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Le carnet de notes",
          contenu: `
            <p>En suivant les consignes en commentaire :</p>
            <ol>
              <li>crée le dictionnaire <code>notes</code> : Alice a 14, Bob a 11 ;</li>
              <li>Chloé arrive dans la classe avec 17 ;</li>
              <li>Bob a été noté trop sévèrement : sa note passe à 13 ;</li>
              <li>affiche la note de Bob, puis le nombre d'élèves.</li>
            </ol>
            <pre class="bloc-code"><code>13
3</code></pre>`,
          depart: `# 1. Le dictionnaire des notes : Alice a 14, Bob a 11\nnotes = {}\n\n# 2. Chloé arrive dans la classe avec 17\n\n\n# 3. Bob a été noté trop sévèrement : sa note passe à 13\n\n\n# 4. Affiche la note de Bob, puis le nombre d'élèves\n\n`,
          validation: {
            codeContient: [
              { motif: "notes\\s*\\[\\s*[\"']Chloé[\"']\\s*\\]\\s*=(?!=)", message: "Ajoute Chloé avec notes[\"Chloé\"] = …" },
              { motif: "notes\\s*\\[\\s*[\"']Bob[\"']\\s*\\]\\s*=(?!=)\\s*13", message: "Corrige la note de Bob avec notes[\"Bob\"] = 13." },
              { motif: "print\\s*\\(\\s*notes\\s*\\[\\s*[\"']Bob[\"']\\s*\\]\\s*\\)", message: "Affiche la note de Bob en la lisant dans le dictionnaire." },
              { motif: "\\blen\\s*\\(\\s*notes\\s*\\)", message: "Le nombre d'élèves se calcule avec len()." },
            ],
            sortie: "13\n3",
            tests: `assert notes == {"Alice": 14, "Bob": 13, "Chloé": 17}, "à la fin, notes doit valoir {\\"Alice\\": 14, \\"Bob\\": 13, \\"Chloé\\": 17}"`,
          },
          felicitation: "La même écriture a créé Chloé et corrigé Bob. 📝",
          indices: [
            "Pour l'étape 1, remplace <code>{}</code> par un dictionnaire de deux entrées.",
            "Les étapes 2 et 3 s'écrivent de la même façon : <code>notes[nom] = note</code>. La première crée une entrée, la seconde en modifie une.",
            "Pour l'étape 4, deux <code>print</code> : la valeur de la clé <code>\"Bob\"</code>, puis <code>len()</code>.",
          ],
        },

        {
          id: "d6",
          type: "cours",
          titre: "Supprimer une entrée",
          contenu: `
            <p>L'instruction <code>del</code> supprime une entrée — la clé et sa valeur :</p>

            <pre class="bloc-code"><code>personne = {"nom": "Alice", "age": 23}
del personne["age"]
print(personne)          # {'nom': 'Alice'}

del personne["ville"]    # KeyError : on ne supprime pas ce qui n'existe pas</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Supprimer sans risque</span>
              Comme pour la lecture, on vérifie d'abord que la clé existe :
              <pre class="bloc-code"><code>if "ville" in personne:
    del personne["ville"]</code></pre>
            </div>

            <p><code>del</code> n'est pas une fonction : il s'écrit sans parenthèses,
            suivi de l'entrée à supprimer.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Plus de poires",
          contenu: `
            <p>Le magasin ne vend plus de poires. Supprime cette entrée de
            <code>stock</code>, puis affiche le dictionnaire :</p>
            <pre class="bloc-code"><code>{'pommes': 12, 'bananes': 7}</code></pre>`,
          depart: `stock = {"pommes": 12, "poires": 0, "bananes": 7}\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdel\\s+stock\\s*\\[\\s*[\"']poires[\"']\\s*\\]", message: "Supprime l'entrée avec del stock[\"poires\"]." },
            ],
            codeAbsent: [
              { motif: "stock\\s*=\\s*\\{[\\s\\S]*stock\\s*=\\s*\\{", message: "Ne réécris pas le dictionnaire : supprime l'entrée." },
            ],
            sortie: "{'pommes': 12, 'bananes': 7}",
          },
          felicitation: "del, l'entrée, et c'est fini. 🍐",
          indices: [
            "<code>del</code>, suivi de l'entrée telle qu'on la lirait : le dictionnaire, puis la clé entre crochets.",
            "Termine par un <code>print</code> du dictionnaire entier.",
          ],
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Deux fois la même clé",
          contenu: `<p>Que se passe-t-il si l'on écrit deux entrées avec la même clé ?
            Lis ce programme sans l'exécuter.</p>`,
          code: `d = {"a": 1, "b": 2, "a": 3}\nprint(d)\nprint(len(d))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>{'a': 1, 'b': 2, 'a': 3}</code> puis <code>3</code>",
              explication: "Une clé ne peut exister qu'une fois : Python ne garde pas les deux." },
            { texte: "<code>{'a': 3, 'b': 2}</code> puis <code>2</code>", correct: true,
              explication: "Oui : la seconde valeur de <code>\"a\"</code> a remplacé la première. Il ne reste que deux entrées." },
            { texte: "<code>{'a': 1, 'b': 2}</code> puis <code>2</code>",
              explication: "Python lit les entrées dans l'ordre : c'est la <strong>dernière</strong> valeur écrite qui l'emporte." },
            { texte: "une erreur, car une clé ne peut pas être répétée",
              explication: "Python ne refuse pas : il traite la seconde entrée comme une modification de la première." },
          ],
          apres: `<span class="chapo">Une clé, une entrée</span>
            Écrire deux fois la même clé revient à créer l'entrée, puis à la modifier.
            Aucune erreur n'est signalée : c'est donc un bug discret, à surveiller quand on
            écrit un long dictionnaire à la main.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>notes = {}                         # on part souvent du dictionnaire vide
notes["Alice"] = 14                # la clé n'existe pas : AJOUT
notes["Alice"] = 15                # la clé existe : MODIFICATION
notes["Alice"] = notes["Alice"] + 1   # à partir de l'ancienne valeur

del notes["Alice"]                 # SUPPRESSION
if "Bob" in notes:                 # supprimer sans risque
    del notes["Bob"]</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th><th>Si la clé est absente</th></tr>
              <tr><td>ajouter ou modifier</td><td><code>d[cle] = v</code></td><td>l'entrée est créée</td></tr>
              <tr><td>lire</td><td><code>d[cle]</code></td><td><code>KeyError</code></td></tr>
              <tr><td>supprimer</td><td><code>del d[cle]</code></td><td><code>KeyError</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>écrire <code>==</code> au lieu de <code>=</code> : on compare au lieu d'affecter ;</li>
                <li>augmenter une valeur dont la clé n'existe pas encore : <code>KeyError</code> à la lecture ;</li>
                <li>écrire <code>del(d["x"])</code> ou <code>del d("x")</code> : <code>del</code> se suit directement de l'entrée.</li>
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
          titre: "Les verbes irréguliers",
          contenu: `
            <p>Pierre veut réviser ses verbes irréguliers anglais. Crée le dictionnaire
            <code>mots</code> dont les clés sont les verbes en français, et les valeurs des
            chaînes de caractères contenant leurs trois formes :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>avoir</th><th>savoir</th><th>aller</th><th>prendre</th><th>chercher</th></tr>
              <tr><td>have, had, had</td><td>know, knew, known</td><td>go, went, gone</td><td>take, took, taken</td><td>seek, sought, sought</td></tr>
            </table>
            </div>
            <p>Affiche ensuite les formes du verbe « prendre » :</p>
            <pre class="bloc-code"><code>take, took, taken</code></pre>`,
          depart: `mots = \n\n`,
          validation: {
            codeContient: [
              { motif: "mots\\s*\\[\\s*[\"']prendre[\"']\\s*\\]", message: "Lis les formes de « prendre » avec sa clé." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"']take", message: "Lis les formes dans le dictionnaire." },
            ],
            sortie: "take, took, taken",
            tests: `assert type(mots) == dict, "mots doit être un dictionnaire"\nassert len(mots) == 5, "mots doit contenir les cinq verbes"\nassert mots == {"avoir": "have, had, had", "savoir": "know, knew, known", "aller": "go, went, gone", "prendre": "take, took, taken", "chercher": "seek, sought, sought"}, "chaque verbe français (en minuscules) doit être associé à ses trois formes, séparées par une virgule et une espace"`,
          },
          felicitation: "Cinq verbes, cinq entrées : le lexique de Pierre est prêt. 🇬🇧",
          indices: [
            "Cinq entrées entre accolades. Chaque clé est un verbe français, en minuscules ; chaque valeur est <strong>une seule</strong> chaîne, par exemple <code>\"have, had, had\"</code>.",
            "Pour un dictionnaire long, une entrée par ligne se relit bien mieux. Puis un <code>print</code> de la valeur de la clé <code>\"prendre\"</code>.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Les points du match",
          contenu: `
            <p>Tom marque 5 points, Léa en perd 2. Mets à jour <code>scores</code> en
            calculant chaque nouvelle valeur <strong>à partir de l'ancienne</strong>, puis
            affiche le dictionnaire :</p>
            <pre class="bloc-code"><code>{'Léa': 8, 'Tom': 12}</code></pre>`,
          depart: `scores = {"Léa": 10, "Tom": 7}\n\n`,
          validation: {
            codeContient: [
              { motif: "scores\\s*\\[\\s*[\"']Tom[\"']\\s*\\]\\s*=(?!=)\\s*scores\\s*\\[\\s*[\"']Tom[\"']\\s*\\]\\s*\\+\\s*5|scores\\s*\\[\\s*[\"']Tom[\"']\\s*\\]\\s*\\+=\\s*5", message: "Le nouveau score de Tom, c'est l'ancien plus 5." },
              { motif: "scores\\s*\\[\\s*[\"']Léa[\"']\\s*\\]\\s*=(?!=)\\s*scores\\s*\\[\\s*[\"']Léa[\"']\\s*\\]\\s*-\\s*2|scores\\s*\\[\\s*[\"']Léa[\"']\\s*\\]\\s*-=\\s*2", message: "Le nouveau score de Léa, c'est l'ancien moins 2." },
            ],
            codeAbsent: [
              { motif: "\\b12\\b|=\\s*8\\b", message: "Calcule les nouveaux scores à partir des anciens, ne les écris pas à la main." },
            ],
            sortie: "{'Léa': 8, 'Tom': 12}",
          },
          felicitation: "Lire l'ancienne valeur, écrire la nouvelle : la mise à jour type. 🏀",
          indices: [
            "Pour chaque joueur, une affectation dont la partie droite lit son score actuel dans le dictionnaire.",
            "À droite du <code>=</code> pour Tom : son score lu entre crochets, plus 5. Même chose pour Léa, avec moins 2.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : l'inventaire",
          contenu: `
            <p>Ce programme gère les fournitures d'une classe. Il devrait ajouter 6 gommes,
            retirer un cahier, supprimer les stylos, et afficher :</p>
            <pre class="bloc-code"><code>{'cahiers': 3, 'gommes': 6}</code></pre>
            <p>Il contient <strong>trois erreurs</strong>.</p>`,
          depart: `stock = {"stylos": 10, "cahiers": 4}\nstock["gommes"] == 6\nstock["cahiers"] = stock["cahier"] - 1\ndel stock("stylos")\nprint(stock)\n`,
          validation: {
            codeContient: [
              { motif: "stock\\s*\\[\\s*[\"']gommes[\"']\\s*\\]\\s*=(?!=)", message: "Pour ajouter les gommes, il faut une affectation, avec un seul =." },
              { motif: "stock\\s*\\[\\s*[\"']cahiers[\"']\\s*\\]\\s*-\\s*1|stock\\s*\\[\\s*[\"']cahiers[\"']\\s*\\]\\s*-=", message: "Le nouveau nombre de cahiers se calcule à partir de l'ancien." },
              { motif: "\\bdel\\s+stock\\s*\\[", message: "del se suit de l'entrée, écrite avec des crochets." },
            ],
            sortie: "{'cahiers': 3, 'gommes': 6}",
          },
          felicitation: "Un == de trop, une lettre en moins, des parenthèses en trop : l'inventaire est juste. 📦",
          indices: [
            "Le programme s'arrête avant même de démarrer : regarde comment on supprime une entrée avec <code>del</code>.",
            "Ensuite, une <code>KeyError: 'gommes'</code> : la deuxième ligne compare au lieu d'affecter.",
            "Enfin, une <code>KeyError</code> sur la troisième ligne : compare lettre à lettre la clé lue et celle du dictionnaire.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Le répertoire téléphonique",
          contenu: `
            <p>Complète les trois fonctions d'un répertoire. Aucune ne doit provoquer
            d'erreur, même appelée sur un contact inexistant.</p>
            <ul>
              <li><code>ajouter(repertoire, nom, numero)</code> ajoute un contact, ou met à jour son numéro ;</li>
              <li><code>numero_de(repertoire, nom)</code> renvoie le numéro, ou <code>"inconnu"</code> ;</li>
              <li><code>supprimer(repertoire, nom)</code> supprime le contact s'il existe.</li>
            </ul>
            <p><code>ajouter</code> et <code>supprimer</code> ne renvoient rien : elles
            modifient le dictionnaire reçu.</p>`,
          depart: `def ajouter(repertoire, nom, numero):\n    pass\n\n\ndef numero_de(repertoire, nom):\n    pass\n\n\ndef supprimer(repertoire, nom):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bdel\\b", message: "supprimer doit retirer l'entrée avec del." },
              { motif: "\\breturn\\b", message: "numero_de doit renvoyer le numéro." },
            ],
            tests: `_r = {"Alice": "06 12 34 56 78"}\najouter(_r, "Bob", "07 98 76 54 32")\nassert _r == {"Alice": "06 12 34 56 78", "Bob": "07 98 76 54 32"}, "ajouter doit créer l'entrée de Bob dans le répertoire reçu"\najouter(_r, "Alice", "06 00 00 00 00")\nassert _r["Alice"] == "06 00 00 00 00", "ajouter sur un contact existant doit mettre à jour son numéro"\nassert len(_r) == 2, "mettre à jour un numéro ne doit pas créer de nouvelle entrée"\nassert numero_de(_r, "Bob") == "07 98 76 54 32", "numero_de doit renvoyer le numéro de Bob"\nassert numero_de(_r, "Zoé") == "inconnu", "numero_de doit renvoyer \\"inconnu\\" pour un contact absent"\nsupprimer(_r, "Bob")\nassert _r == {"Alice": "06 00 00 00 00"}, "supprimer doit retirer Bob du répertoire"\nsupprimer(_r, "Zoé")\nassert _r == {"Alice": "06 00 00 00 00"}, "supprimer un contact absent ne doit rien changer, ni provoquer d'erreur"`,
          },
          felicitation: "Ajouter, chercher, supprimer, sans jamais planter : un vrai répertoire. 📞",
          indices: [
            "<code>ajouter</code> tient en une ligne : la même écriture crée ou met à jour.",
            "<code>numero_de</code> est la <code>valeur_ou_defaut</code> de la séance 4, avec <code>\"inconnu\"</code> comme valeur de repli.",
            "<code>supprimer</code> vérifie avec <code>in</code> que le nom est une clé avant de le supprimer.",
          ],
          apres: `<span class="chapo">Une fonction qui modifie le dictionnaire reçu</span>
            Comme une liste au chapitre 4, un dictionnaire passé à une fonction n'est pas
            copié : <code>ajouter</code> et <code>supprimer</code> modifient le dictionnaire
            de l'appelant. C'est voulu ici ; on verra à la séance 6 comment l'éviter quand
            ce ne l'est pas.`,
        },

        {
          id: "a5",
          type: "prediction",
          titre: "Combien d'entrées ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `d = {}\nd["a"] = 1\nd["a"] = 2\nd["b"] = 1\nd["c"] = d["a"]\ndel d["a"]\nprint(d, len(d))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>{'b': 1, 'c': 2} 2</code>", correct: true,
              explication: "Oui : <code>\"a\"</code> est créée puis modifiée (elle vaut 2), <code>\"b\"</code> vaut 1, <code>\"c\"</code> reçoit la valeur de <code>\"a\"</code>, soit 2, puis <code>\"a\"</code> est supprimée." },
            { texte: "<code>{'b': 1, 'c': 1} 2</code>",
              explication: "Au moment de <code>d[\"c\"] = d[\"a\"]</code>, <code>\"a\"</code> vaut déjà 2." },
            { texte: "<code>{'b': 1} 1</code>",
              explication: "<code>d[\"c\"]</code> a reçu une copie de la valeur : supprimer <code>\"a\"</code> ensuite ne touche pas à <code>\"c\"</code>." },
            { texte: "<code>{'b': 1, 'c': 2} 4</code>",
              explication: "Il y a eu quatre affectations, mais seulement trois clés différentes, dont une supprimée : il reste deux entrées." },
          ],
          apres: `<span class="chapo">Suivre un dictionnaire ligne à ligne</span>
            Pour ce genre de question, on écrit l'état du dictionnaire après chaque ligne :
            <code>{}</code>, <code>{'a': 1}</code>, <code>{'a': 2}</code>,
            <code>{'a': 2, 'b': 1}</code>, <code>{'a': 2, 'b': 1, 'c': 2}</code>,
            <code>{'b': 1, 'c': 2}</code>.`,
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
          titre: "Renommer une clé",
          contenu: `
            <p>On ne peut pas modifier une clé — seulement sa valeur. Écris la fonction
            <code>renommer(d, ancienne, nouvelle)</code>, qui déplace la valeur de la clé
            <code>ancienne</code> vers la clé <code>nouvelle</code>, et fait disparaître
            l'ancienne. Si <code>ancienne</code> n'existe pas, rien ne change.</p>
            <pre class="bloc-code"><code>d = {"nom": "Alice", "age": 16}
renommer(d, "age", "âge")
print(d)        # {'nom': 'Alice', 'âge': 16}</code></pre>`,
          depart: `def renommer(d, ancienne, nouvelle):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bdel\\b", message: "L'ancienne entrée doit être supprimée avec del." },
              { motif: "\\bin\\b", message: "Vérifie d'abord que l'ancienne clé existe, avec in." },
            ],
            tests: `_d = {"nom": "Alice", "age": 16}\nrenommer(_d, "age", "âge")\nassert _d == {"nom": "Alice", "âge": 16}, "la valeur de \\"age\\" doit passer sous la clé \\"âge\\", et \\"age\\" doit disparaître"\nrenommer(_d, "ville", "commune")\nassert _d == {"nom": "Alice", "âge": 16}, "si l'ancienne clé n'existe pas, rien ne doit changer"\n_e = {1: "a"}\nrenommer(_e, 1, 2)\nassert _e == {2: "a"}, "la fonction doit marcher avec des clés de n'importe quel type"`,
          },
          felicitation: "Une écriture, une suppression : la clé a changé de nom. 🏷️",
          indices: [
            "Tout se passe dans un <code>if</code> qui vérifie que l'ancienne clé existe.",
            "Dedans, deux temps, dans cet ordre : créer l'entrée <code>nouvelle</code> avec la valeur lue sous <code>ancienne</code>, puis supprimer <code>ancienne</code>.",
          ],
          apres: `<span class="chapo">Et si ancienne vaut nouvelle ?</span>
            <code>renommer(d, "age", "age")</code> écrit la valeur sur elle-même, puis…
            supprime l'entrée ! Pour être tout à fait juste, la fonction devrait aussi
            vérifier que les deux clés diffèrent.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Échanger deux valeurs",
          contenu: `
            <p>Écris la fonction <code>echanger(d, c1, c2)</code>, qui échange les valeurs
            associées aux clés <code>c1</code> et <code>c2</code>, en <strong>une seule
            ligne</strong>, sans variable temporaire. Souviens-toi de la séance 3.</p>
            <pre class="bloc-code"><code>d = {"or": "Léa", "argent": "Tom"}
echanger(d, "or", "argent")
print(d)        # {'or': 'Tom', 'argent': 'Léa'}</code></pre>`,
          depart: `def echanger(d, c1, c2):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "d\\s*\\[\\s*c1\\s*\\]\\s*,\\s*d\\s*\\[\\s*c2\\s*\\]\\s*=\\s*\\(?\\s*d\\s*\\[\\s*c2\\s*\\]\\s*,\\s*d\\s*\\[\\s*c1\\s*\\]", message: "En une ligne : à gauche les deux entrées, à droite leurs valeurs dans l'ordre inverse." },
            ],
            tests: `_d = {"or": "Léa", "argent": "Tom"}\nechanger(_d, "or", "argent")\nassert _d == {"or": "Tom", "argent": "Léa"}, "les valeurs de \\"or\\" et \\"argent\\" doivent être échangées"\n_e = {1: 10, 2: 20, 3: 30}\nechanger(_e, 1, 3)\nassert _e == {1: 30, 2: 20, 3: 10}, "seules les deux clés demandées sont concernées"`,
          },
          felicitation: "Le déballage de la séance 3, appliqué à deux entrées d'un dictionnaire. 🥇",
          indices: [
            "La ligne a la forme <code>…, … = …, …</code>, comme l'échange de deux variables.",
            "À gauche, l'entrée de <code>c1</code> puis celle de <code>c2</code> ; à droite, leurs valeurs actuelles dans l'ordre inverse.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre dictionnaire vivant",
          contenu: `
            <p>À toi de choisir le sujet : un inventaire de jeu, une liste de courses,
            une collection… Pars du dictionnaire <strong>vide</strong>, puis :</p>
            <ul>
              <li>ajoute au moins <strong>trois</strong> entrées, une par une ;</li>
              <li>modifie une valeur ;</li>
              <li>supprime une entrée avec <code>del</code> ;</li>
              <li>affiche le dictionnaire après chaque étape.</li>
            </ul>`,
          depart: `# Ton dictionnaire ici\n\n`,
          validation: {
            codeContient: [
              { motif: "=\\s*\\{\\s*\\}", message: "Pars du dictionnaire vide, {}." },
              { motif: "(\\]\\s*=[^=][\\s\\S]*){4}", message: "Il faut au moins quatre affectations d[cle] = … : trois ajouts et une modification." },
              { motif: "\\bdel\\b", message: "Supprime une entrée avec del." },
              { motif: "(print[\\s\\S]*){3}", message: "Affiche le dictionnaire après chaque étape." },
            ],
            sortieNonVide: true,
            tests: `_dicos = [v for k, v in list(globals().items()) if isinstance(v, dict) and not k.startswith("_")]\nassert any(len(v) >= 2 for v in _dicos), "Après la suppression, ton dictionnaire doit encore contenir au moins deux entrées."`,
          },
          felicitation: "Créé vide, rempli, corrigé, élagué : tu sais faire vivre un dictionnaire. ✨",
          indices: [
            "Commence par <code>mon_dico = {}</code>, puis trois lignes <code>mon_dico[cle] = valeur</code> avec des clés différentes.",
            "Une quatrième affectation, sur une clé déjà présente, la modifie ; puis <code>del</code> sur une autre. Un <code>print</code> après chaque étape.",
          ],
        },
      ],
    },
  ],
};

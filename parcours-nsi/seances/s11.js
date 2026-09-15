/* NSI — chapitre 1, séance 11 : définir et appeler une fonction.
 * Reprend la section « Définir une fonction » du cours (def, appel, paramètres,
 * avantages). Le mot-clé return est réservé à la séance 12, comme dans le cours.
 */

export default {
  id: "s11",
  numero: 11,
  titre: "Les fonctions : définir et appeler",
  sousTitre: "Ranger du code sous un nom",
  palier: "Partie 4 — Structurer un programme",

  accroche: `Les fonctions permettent de regrouper un ensemble d'instructions sous un
    <strong>nom</strong>. C'est ce qui permet d'écrire des programmes de plus de vingt
    lignes sans s'y perdre — et de ne jamais écrire deux fois la même chose.`,

  objectifs: [
    "définir une fonction avec <code>def</code>",
    "distinguer la <strong>définition</strong> de l'<strong>appel</strong>",
    "passer une information par un <strong>paramètre</strong>",
    "appeler une fonction plusieurs fois, avec des valeurs différentes",
  ],

  motDeLaFin: `Tes fonctions savent agir. À la séance 12, elles vont apprendre à
    <em>renvoyer</em> un résultat — et ce n'est pas la même chose.`,

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
          titre: "Définir une fonction",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : fonction</span>
              Une <strong>fonction</strong> est un bloc de code qui <strong>porte un
              nom</strong> et qui peut être <strong>appelé à plusieurs endroits</strong>
              d'un programme.
            </div>

            <p>En Python, une fonction se définit avec le mot-clé <code>def</code> :</p>

            <pre class="bloc-code"><code>def nom_de_la_fonction(parametres):
    instructions</code></pre>

            <p>Une fonction sans paramètre :</p>

            <pre class="bloc-code"><code>def bonjour():
    print("Bonjour tout le monde !")</code></pre>

            <p>Pour l'exécuter, on écrit simplement :</p>

            <pre class="bloc-code"><code>bonjour()</code></pre>

            <p>Tu retrouves la mécanique connue : un mot-clé, les <strong>deux-points</strong>,
            et un <strong>corps indenté</strong>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Définir ≠ exécuter</span>
              <code>def</code> ne fait qu'<strong>expliquer à Python comment faire</strong>,
              un peu comme écrire une recette. Tant que personne ne l'appelle, la recette
              reste dans le tiroir : rien ne s'affiche.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Une définition, et rien d'autre",
          contenu: `
            <p>Le programme ci-dessous <strong>définit</strong> une fonction. Exécute-le :
            que se passe-t-il ?</p>
            <p>Puis ajoute la ligne qui l'<strong>appelle</strong>, pour obtenir :</p>
            <pre class="bloc-code"><code>Bonjour tout le monde !</code></pre>`,
          depart: `def bonjour():\n    print("Bonjour tout le monde !")\n\n# Ajoute l'appel ci-dessous\n`,
          validation: {
            codeContient: [
              { motif: "^bonjour\\s*\\(\\s*\\)", options: "m", message: "L'appel s'écrit sans décalage, tout à gauche." },
            ],
            sortie: "Bonjour tout le monde !",
          },
          felicitation: "Définition d'un côté, appel de l'autre : deux moments distincts. 📦",
          indices: [
            "L'appel est une ligne à lui tout seul, <strong>sans décalage</strong> : il n'est pas dans la fonction.",
            "Les parenthèses ne sont pas facultatives : <code>bonjour</code> désigne la fonction, <code>bonjour()</code> l'exécute.",
          ],
        },

        {
          id: "d3",
          type: "qcm",
          titre: "L'erreur silencieuse",
          contenu: `<p>Un élève écrit ceci et s'étonne que rien ne se passe.</p>
            <pre class="bloc-code"><code>def bonjour():
    print("Bonjour tout le monde !")

bonjour</code></pre>`,
          question: "Pourquoi rien ne s'affiche-t-il ?",
          options: [
            { texte: "La fonction n'est pas définie correctement",
              explication: "La définition est parfaitement correcte : deux-points, corps indenté." },
            { texte: "Il manque les <strong>parenthèses</strong> de l'appel", correct: true,
              explication: "Oui. <code>bonjour</code> tout seul désigne la fonction sans l'exécuter — et Python ne proteste pas." },
            { texte: "L'appel doit être indenté",
              explication: "Au contraire : indenté, il ferait partie de la fonction et ne s'exécuterait jamais." },
            { texte: "Il manque un <code>return</code>",
              explication: "Une fonction qui affiche n'a pas besoin de renvoyer quoi que ce soit." },
          ],
          apres: `<span class="chapo">Une erreur qui ne dit pas son nom</span>
            Oublier les parenthèses est une <strong>erreur silencieuse</strong> : le
            programme s'exécute, Python ne signale rien, et il ne se passe simplement rien.
            Ce sont les plus difficiles à trouver.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Donner une information : le paramètre",
          contenu: `
            <p>Une fonction qui dit toujours la même chose a peu d'intérêt. On lui passe une
            information : c'est le <strong>paramètre</strong>, écrit entre les parenthèses de
            la définition.</p>

            <pre class="bloc-code"><code>def dire_bonjour(prenom):
    print(f"Bonjour {prenom} !")

dire_bonjour("Ali")
dire_bonjour("Lucie")</code></pre>

            <p>À l'appel, la valeur donnée est automatiquement <strong>affectée</strong> au
            paramètre. La fonction peut donc être appelée autant de fois qu'on veut, avec
            des valeurs différentes.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les avantages des fonctions</span>
              ✂️ <strong>réutiliser</strong> du code facilement ·
              🧠 <strong>alléger</strong> le programme principal ·
              🧩 <strong>isoler</strong> des traitements pour mieux les tester ·
              🧹 <strong>améliorer la lisibilité</strong> du code
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le nom du paramètre n'existe que dans la fonction</span>
              <code>prenom</code> n'a de sens qu'entre le <code>def</code> et la fin du corps.
              En dehors, Python ne le connaît pas. On y reviendra à la séance 13.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Une fonction avec un paramètre",
          contenu: `
            <p>Écris la fonction <code>dire_bonjour</code>, puis appelle-la avec
            <code>"Ali"</code> et <code>"Lucie"</code> :</p>
            <pre class="bloc-code"><code>Bonjour Ali !
Bonjour Lucie !</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+dire_bonjour\\s*\\(\\s*\\w+\\s*\\)", message: "La fonction dire_bonjour doit avoir un paramètre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print, dans la fonction : ce sont les appels qui varient." },
            ],
            sortie: "Bonjour Ali !\nBonjour Lucie !",
          },
          felicitation: "Un paramètre, et la fonction devient utile. 🎁",
          indices: [
            "Le nom du paramètre est libre : <code>prenom</code> est un bon choix.",
            "Les deux appels viennent après la définition, sans décalage.",
          ],
        },

        {
          id: "d6",
          type: "code",
          titre: "Appeler dans une boucle",
          contenu: `
            <p>Une fonction peut être appelée depuis une boucle. Écris
            <code>afficher_carre(n)</code> qui affiche <code>n x n = …</code>, puis
            appelle-la pour <em>n</em> allant de 1 à 5 :</p>
            <pre class="bloc-code"><code>1 x 1 = 1
2 x 2 = 4
3 x 3 = 9
4 x 4 = 16
5 x 5 = 25</code></pre>`,
          depart: `def afficher_carre(n):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+afficher_carre\\s*\\(\\s*\\w+\\s*\\)", message: "Définis la fonction avec un paramètre." },
              { motif: "\\bfor\\b", message: "Les cinq appels doivent venir d'une boucle." },
              { motif: "afficher_carre\\s*\\(\\s*\\w+\\s*\\)", message: "La boucle doit appeler la fonction." },
            ],
            sortie: "1 x 1 = 1\n2 x 2 = 4\n3 x 3 = 9\n4 x 4 = 16\n5 x 5 = 25",
          },
          felicitation: "Une fonction appelée cinq fois par une boucle : le code se réduit. 🔁",
          indices: [
            "Le corps de la fonction tient en un <code>print</code>, avec le paramètre et son carré.",
            "La boucle vient après la définition et parcourt 1 à 5 inclus.",
          ],
        },

        {
          id: "d7",
          type: "code",
          titre: "Deux paramètres",
          contenu: `
            <p>La syntaxe ne change presque pas : on sépare les paramètres par des virgules,
            dans la définition comme dans l'appel.</p>
            <p>Écris <code>afficher_produit(a, b)</code> puis appelle-la trois fois :</p>
            <pre class="bloc-code"><code>12 x 7 = 84
5 x 5 = 25
10 x 3 = 30</code></pre>`,
          depart: `def afficher_produit(a, b):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+afficher_produit\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir deux paramètres." },
              { motif: "afficher_produit\\s*\\([^)]*\\)[\\s\\S]*afficher_produit\\s*\\(", message: "Trois appels sont attendus." },
            ],
            codeAbsent: [
              { motif: "\\b84\\b", message: "Le produit doit être calculé par la fonction." },
            ],
            sortie: "12 x 7 = 84\n5 x 5 = 25\n10 x 3 = 30",
          },
          indices: [
            "Le corps de la fonction est un seul <code>print</code> à quatre morceaux.",
            "À l'appel, les valeurs sont données dans l'ordre des paramètres.",
          ],
        },

        {
          id: "d8",
          type: "prediction",
          titre: "L'ordre des arguments",
          contenu: `<p>Une fonction qui calcule et affiche un pourcentage.</p>`,
          code: `def afficher_pourcentage(taux, valeur):\n    print(valeur * taux / 100)\n\nafficher_pourcentage(200, 10)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>20.0</code>",
              explication: "Ce serait 10 % de 200. Mais regarde l'ordre des paramètres dans la définition." },
            { texte: "<code>2000.0</code>", correct: true,
              explication: "Oui : <code>taux</code> reçoit 200 et <code>valeur</code> reçoit 10. Le calcul est 10 × 200 / 100." },
            { texte: "une <code>TypeError</code>",
              explication: "Non : il y a bien deux arguments pour deux paramètres, Python ne peut pas deviner l'intention." },
            { texte: "<code>10.0</code>",
              explication: "Refais le calcul avec l'ordre réel des paramètres." },
          ],
          apres: `<span class="chapo">Le bug le plus sournois</span>
            Python ne peut pas savoir que tu voulais dire autre chose. Le programme tourne,
            il affiche un résultat, et ce résultat est faux. Relis toujours l'ordre des
            paramètres dans la <em>définition</em> avant d'appeler.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def nom_de_la_fonction(parametre1, parametre2):
    # le corps, indenté
    ...

nom_de_la_fonction(valeur1, valeur2)   # l'appel, dans le MÊME ordre</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les quatre erreurs à connaître</span>
              <ol style="margin-bottom:0">
                <li>oublier les <strong>deux-points</strong> après la définition ;</li>
                <li>oublier d'<strong>indenter</strong> le corps ;</li>
                <li>définir la fonction… et ne jamais l'appeler ;</li>
                <li>appeler <code>fonction</code> au lieu de <code>fonction()</code>.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Nommer ses fonctions</span>
              Un <strong>verbe</strong> pour une action : <code>afficher_table</code>,
              <code>calculer_moyenne</code>, <code>dire_bonjour</code>. Comme pour les
              variables : minuscules et tirets bas.
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
          titre: "La ligne de séparation",
          contenu: `
            <p>Écris <code>separateur()</code>, sans paramètre, qui affiche une ligne de
            30 tirets. Appelle-la deux fois, de part et d'autre d'un titre :</p>
            <pre class="bloc-code"><code>------------------------------
      BULLETIN DE NOTES
------------------------------</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+separateur\\s*\\(\\s*\\)", message: "La fonction separateur ne prend pas de paramètre." },
              { motif: "separateur\\s*\\(\\s*\\)[\\s\\S]*separateur\\s*\\(\\s*\\)", message: "Appelle-la deux fois." },
            ],
            codeAbsent: [
              { motif: "-{6,}", message: "Ne tape pas les tirets à la main : fais-les répéter." },
            ],
            sortie: "------------------------------\n      BULLETIN DE NOTES\n------------------------------",
          },
          felicitation: "Une fonction écrite une fois, utilisée deux fois. C'est tout l'intérêt. ✂️",
          indices: [
            "Le corps de la fonction tient en un <code>print</code> avec une répétition de texte.",
            "Le titre est précédé de six espaces.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "La carte de visite",
          contenu: `
            <p>Écris <code>carte(prenom, age)</code> qui affiche deux lignes, puis appelle-la
            deux fois :</p>
            <pre class="bloc-code"><code>Prénom : Ada
Âge : 17 ans
Prénom : Alan
Âge : 20 ans</code></pre>`,
          depart: `def carte(prenom, age):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+carte\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir deux paramètres." },
              { motif: "carte\\s*\\([^)]*\\)[\\s\\S]*carte\\s*\\(", message: "Deux appels sont attendus." },
            ],
            sortie: "Prénom : Ada\nÂge : 17 ans\nPrénom : Alan\nÂge : 20 ans",
          },
          indices: [
            "Deux <code>print</code> dans le corps, indentés au même niveau.",
            "Les deux appels viennent après la définition.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "La table de multiplication",
          contenu: `
            <p>Écris <code>table_multiplication(nbre)</code> qui affiche les dix premiers
            résultats de la table, puis appelle-la avec 9 :</p>
            <pre class="bloc-code"><code>9
18
27
36
45
54
63
72
81
90</code></pre>`,
          depart: `def table_multiplication(nbre):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+table_multiplication\\s*\\(\\s*\\w+\\s*\\)", message: "Définis la fonction avec un paramètre." },
              { motif: "\\bfor\\b", message: "La fonction doit contenir une boucle." },
              { motif: "table_multiplication\\s*\\(\\s*9\\s*\\)", message: "Appelle la fonction avec 9." },
            ],
            sortie: "9\n18\n27\n36\n45\n54\n63\n72\n81\n90",
          },
          felicitation: "Une boucle dans une fonction : deux niveaux d'indentation. 🔁",
          indices: [
            "La boucle est dans la fonction : elle est donc décalée de quatre espaces, et le <code>print</code> de huit.",
            "Elle parcourt les multiplicateurs de 1 à 10 inclus.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : la fonction cassée",
          contenu: `
            <p>Trois erreurs, toutes propres aux fonctions. Le programme doit afficher :</p>
            <pre class="bloc-code"><code>Bonjour Ada !</code></pre>`,
          depart: `def saluer(prenom)\nprint(f"Bonjour {prenom} !")\n\nsaluer\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+saluer", message: "Garde la fonction saluer." },
            ],
            sortie: "Bonjour Ada !",
          },
          felicitation: "Deux-points, indentation, parenthèses de l'appel : le triplé. 🐞",
          indices: [
            "Ligne 1 : il manque le caractère qui annonce le corps.",
            "Ligne 2 : elle doit faire partie de la fonction.",
            "Ligne 4 : la fonction est nommée mais pas exécutée — et il lui manque son argument.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le rectangle paramétré",
          contenu: `
            <p>Écris <code>rectangle(largeur, hauteur)</code> qui dessine un rectangle plein
            de dièses, puis appelle-la deux fois :</p>
            <pre class="bloc-code sans-copie"><code>####
####
##
##
##</code></pre>
            <p>Le premier appel dessine 4 de large sur 2 de haut, le second 2 de large sur
            3 de haut.</p>`,
          depart: `def rectangle(largeur, hauteur):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+rectangle\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir deux paramètres." },
              { motif: "rectangle\\s*\\([^)]*\\)[\\s\\S]*rectangle\\s*\\(", message: "Deux appels sont attendus." },
              { motif: "\\bfor\\b", message: "La fonction doit contenir une boucle." },
            ],
            sortie: "####\n####\n##\n##\n##",
          },
          felicitation: "Une fonction qui dessine, à la demande. ▭",
          indices: [
            "Le nombre de lignes est donné par la hauteur, la longueur de chaque ligne par la largeur.",
            "Une boucle sur la hauteur, et dans son corps un <code>print</code> avec une répétition de texte.",
          ],
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
          titre: "Une fonction qui en appelle une autre",
          contenu: `
            <p>Écris deux fonctions :</p>
            <ul>
              <li><code>ligne(largeur)</code> affiche une ligne de dièses ;</li>
              <li><code>carre(cote)</code> dessine un carré <strong>en appelant</strong>
                <code>ligne</code>.</li>
            </ul>
            <p>Appelle ensuite <code>carre(4)</code> :</p>
            <pre class="bloc-code sans-copie"><code>####
####
####
####</code></pre>`,
          depart: `def ligne(largeur):\n    \n\ndef carre(cote):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+carre[\\s\\S]*ligne\\s*\\(", message: "carre doit appeler la fonction ligne." },
              { motif: "carre\\s*\\(\\s*4\\s*\\)", message: "Appelle carre avec 4." },
            ],
            sortie: "####\n####\n####\n####",
          },
          felicitation: "Des fonctions qui s'appellent : ton code devient un jeu de construction. 🧩",
          indices: [
            "<code>ligne</code> tient en un <code>print</code>.",
            "<code>carre</code> contient une boucle qui appelle <code>ligne</code> à chaque tour.",
            "Un carré a autant de lignes que de colonnes : le même paramètre sert deux fois.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Le compte à rebours paramétré",
          contenu: `
            <p>Écris <code>compte_a_rebours(depart)</code> qui affiche le décompte puis le
            décollage, et appelle-la avec 3 :</p>
            <pre class="bloc-code"><code>3
2
1
Décollage !</code></pre>
            <p>Le <code>Décollage !</code> doit être dans la fonction, pas après l'appel.</p>`,
          depart: `def compte_a_rebours(depart):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+compte_a_rebours\\s*\\(\\s*\\w+\\s*\\)", message: "Définis la fonction avec un paramètre." },
              { motif: "compte_a_rebours\\s*\\(\\s*3\\s*\\)", message: "Appelle la fonction avec 3." },
            ],
            codeAbsent: [
              { motif: "^print", options: "m", message: "Tous les affichages doivent être dans la fonction." },
            ],
            sortie: "3\n2\n1\nDécollage !",
          },
          indices: [
            "La boucle descend : le troisième argument de <code>range</code> est négatif.",
            "Le message de décollage est dans la fonction mais <strong>après</strong> la boucle : quatre espaces, pas huit.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta bibliothèque d'affichage",
          contenu: `
            <p>Défi libre. Écris <strong>au moins deux fonctions</strong>, dont une avec
            <strong>au moins deux paramètres</strong>, et un petit programme qui les appelle
            <strong>au moins trois fois</strong> en tout.</p>
            <p>Des idées : un encadreur de titre, un afficheur de fiche produit, un traceur
            de barres de progression, un formateur de date, un générateur de grille…</p>`,
          depart: `# Tes fonctions\n`,
          validation: {
            codeContient: [
              { motif: "def[\\s\\S]*\\bdef\\b", message: "Il faut au moins deux fonctions." },
              { motif: "def\\s+\\w+\\s*\\(\\s*\\w+\\s*,\\s*\\w+", message: "Une des fonctions doit avoir au moins deux paramètres." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins trois lignes.",
          },
          felicitation: "Séance 11 terminée. Tu construis tes propres outils. 🏁",
          indices: [
            "N'oublie pas d'<strong>appeler</strong> tes fonctions : une définition seule n'affiche rien.",
            "Une fonction qui en appelle une autre rend l'ensemble plus cohérent.",
          ],
        },
      ],
    },
  ],
};

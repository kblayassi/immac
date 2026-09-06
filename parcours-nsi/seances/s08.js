/* NSI — chapitre 1, séance 8 : la boucle non bornée.
 * Reprend la section « La boucle while » du cours et les exercices 15 à 21.
 *
 * Note : l'exercice 18 (le drapeau) mélangeait randint() et input(). Le parcours
 * rejoue le programme à chaque saisie, ce qui changerait le nombre caché entre
 * deux relances : il est ici fixé, et l'encadré explique comment le rendre
 * aléatoire sur Basthon ou Capytale.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "La boucle non bornée : while",
  sousTitre: "Répéter tant que…",
  palier: "Partie 3 — Répéter des instructions",

  accroche: `Un programme doit souvent répéter une suite d'instructions. Quand on ne
    sait pas <em>combien de fois</em>, mais seulement <em>quand s'arrêter</em>, c'est
    <code>while</code> qu'il faut.`,

  objectifs: [
    "écrire une boucle <code>while</code> et repérer ses trois ingrédients",
    "reconnaître et réparer une <strong>boucle infinie</strong>",
    "contrôler une saisie utilisateur",
    "utiliser un <strong>drapeau</strong> booléen",
  ],

  motDeLaFin: `Tu sais répéter jusqu'à ce qu'une condition tombe. À la séance 9, tu
    répéteras un nombre de fois connu à l'avance.`,

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
          titre: "Répéter tant qu'une condition est vraie",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : boucle non bornée</span>
              La boucle <code>while</code> est dite <strong>non bornée</strong> : on ne sait
              pas à l'avance combien de fois on passera dedans.
            </div>

            <p>La structure de base :</p>

            <pre class="bloc-code"><code>while condition:
    instructions</code></pre>

            <p>Un exemple : une succession de calculs jusqu'à dépasser 100.</p>

            <pre class="bloc-code"><code>x = 1
somme = 0

while somme &lt; 100:
    somme = somme + x
    x = x + 1

print(x)</code></pre>

            <p>À chaque tour, Python <strong>revérifie la condition</strong> avant de
            recommencer. Dès qu'elle devient fausse, la boucle s'arrête et le programme
            continue après.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Attention au sens</span>
              <code>while</code> se traduit par « <strong>tant que</strong> ». La boucle
              tourne tant que la condition est <em>vraie</em>, et s'arrête quand elle devient
              <em>fausse</em>.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Exercice 15 — Une boucle à observer",
          contenu: `<p>Lis attentivement avant d'exécuter.</p>`,
          code: `nombre = 3\n\nwhile nombre < 20:\n    nombre = 2 * nombre\n    print(nombre)`,
          question: "Combien de tours de boucle ce programme effectue-t-il, et que vaut le dernier nombre affiché ?",
          options: [
            { texte: "2 tours, dernier affichage 12",
              explication: "Après 12, la condition <code>12 &lt; 20</code> est encore vraie : un tour de plus a lieu." },
            { texte: "3 tours, dernier affichage 24", correct: true,
              explication: "Oui : 6, 12, puis 24. L'affichage a lieu <strong>après</strong> le doublement, c'est pourquoi 24 est affiché bien qu'il dépasse 20." },
            { texte: "3 tours, dernier affichage 12",
              explication: "Le troisième tour double 12 : il affiche 24." },
            { texte: "la boucle est infinie",
              explication: "<code>nombre</code> double à chaque tour : il finit forcément par dépasser 20." },
          ],
          apres: `<span class="chapo">Le dernier tour dépasse toujours</span>
            La condition n'est vérifiée qu'<strong>entre</strong> deux tours, jamais au
            milieu. À la sortie d'une boucle de seuil, la quantité a donc déjà franchi
            le seuil — c'est presque toujours ce qu'on veut, mais il faut y penser.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Exercice 15 (suite) — Le dé têtu",
          contenu: `
            <p>Ce second programme relance un dé tant qu'il n'obtient pas 6.
            <strong>Exécute-le plusieurs fois</strong> : le nombre de lignes change à chaque
            exécution.</p>
            <p>Il n'y a rien à écrire : lance-le, observe, puis valide.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi le nombre de lignes varie</span>
              Parce que le nombre de tours dépend du <strong>hasard</strong>. C'est toute
              la différence avec une boucle bornée : on ne peut pas savoir à l'avance
              combien de tours seront nécessaires, seulement quand s'arrêter.
            </div>`,
          depart: `from random import randint\n\nlancer_de = randint(1, 6)\n\nwhile lancer_de != 6:\n    print(lancer_de, "perdu !")\n    lancer_de = randint(1, 6)\n\nprint(lancer_de, "gagné !")\n`,
          validation: {
            sortieRegex: "6 gagné !$",
            sortieRegexMessage: "Le programme doit se terminer par « 6 gagné ! ».",
          },
          felicitation: "Un nombre de tours imprévisible : c'est bien une boucle non bornée. 🎲",
          indices: [
            "Il n'y a rien à modifier : clique sur ▶ Exécuter, plusieurs fois.",
          ],
        },

        {
          id: "d4",
          type: "cours",
          titre: "Les trois ingrédients",
          contenu: `
            <p>Toute boucle <code>while</code> correcte contient trois choses. Il en manque
            une, et la boucle tourne à l'infini.</p>

            <pre class="bloc-code"><code>n = 0            # 1. INITIALISATION, avant la boucle

while n &lt; 10:     # 2. CONDITION D'ARRÊT
    print(n)
    n = n + 1    # 3. PROGRESSION, dans la boucle</code></pre>

            <ol>
              <li><strong>L'initialisation</strong> : la variable de contrôle doit exister
                avant, sinon Python ne peut pas évaluer la condition ;</li>
              <li><strong>la condition</strong> : elle doit pouvoir devenir fausse un jour ;</li>
              <li><strong>la progression</strong> : quelque chose, dans le corps, doit
                rapprocher de cette fin.</li>
            </ol>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Boucle infinie</span>
              Si la condition est mal écrite, ou si vous oubliez de mettre à jour une
              variable, le programme tourne sans fin — cela peut faire planter le site, le
              logiciel ou l'ordinateur sur lequel vous codez.
              <br><br>
              <strong>Pensez à enregistrer votre travail avant d'exécuter une boucle
              <code>while</code> !</strong>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ici, tu ne risques rien</span>
              Dans ce parcours, ton programme s'exécute à l'écart de la page et est
              interrompu automatiquement au bout de quelques secondes. Sur Basthon, Capytale
              ou dans un notebook, <strong>ce n'est pas le cas</strong> : l'onglet se fige et
              la seule issue est de fermer la page.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Exercice 17 — La boucle qui ne s'arrête jamais",
          contenu: `
            <p><strong>1.</strong> Exécute le code ci-dessous et observe ce qui se passe.
            <strong>2.</strong> Pourquoi cette boucle est-elle infinie ? Corrige-la pour
            qu'elle affiche les entiers de 0 à 9.</p>
            <pre class="bloc-code"><code>0
1
...
9
fin de la boucle, n = 10</code></pre>`,
          depart: `n = 0\n\nwhile n < 10 :\n    print(n)\n\nprint("fin de la boucle, n =", n)\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Garde la boucle while." },
            ],
            sortie: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\nfin de la boucle, n = 10",
          },
          felicitation: "Boucle infinie diagnostiquée et réparée. 🔧",
          indices: [
            "Regarde ce qui, dans le corps de la boucle, pourrait faire changer la condition.",
            "La variable de la condition doit être modifiée <strong>à l'intérieur</strong> de la boucle. Il manque une ligne.",
          ],
        },

        {
          id: "d6",
          type: "code",
          titre: "Exercice 16 — Contrôler une saisie",
          contenu: `
            <p>Complète le programme : tant que l'utilisateur n'entre pas le bon mot de passe
            (<code>123456</code>), la question est reposée.</p>
            <pre class="bloc-code"><code>Mot de passe : 111
Mauvais mot de passe...
Mot de passe : 123456
Vous pouvez entrer !</code></pre>`,
          depart: `secret = 123456\n\n# On demande une première fois le mot de passe (un nombre entier) :\nmot_de_passe = \n\n# Tant que ce n'est pas le bon, on le redemande :\n\n\nprint("Vous pouvez entrer !")\n`,
          saisiesTest: ["111", "123456"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle pour redemander." },
              { motif: "input[\\s\\S]*input", message: "Deux saisies : une avant la boucle, une dedans." },
              { motif: "\\bsecret\\b[\\s\\S]*\\bsecret\\b", message: "Compare à la variable secret." },
            ],
            sortieRegex: "Vous pouvez entrer !$",
            sortieRegexMessage: "Le programme doit se terminer par « Vous pouvez entrer ! ».",
          },
          felicitation: "Une saisie à l'épreuve des étourdis. 🛡️",
          indices: [
            "Le schéma est toujours le même : une première saisie <strong>avant</strong> la boucle, puis une nouvelle saisie <strong>à l'intérieur</strong>.",
            "Sans cette seconde saisie, la condition ne changerait jamais… et la boucle tournerait indéfiniment.",
            "Le mot de passe est un nombre entier : pense à la conversion.",
          ],
        },

        {
          id: "d7",
          type: "code",
          titre: "Exercice 16 (suite) — Une saisie dans un intervalle",
          contenu: `
            <p>Sur le même principe, écris un programme qui demande un nombre décimal entre
            1 et 100. Tant que la saisie n'est pas dans l'intervalle, une nouvelle saisie est
            demandée.</p>
            <pre class="bloc-code"><code>Saisir un nombre entre 1 et 100 : 250
Ce nombre n'est pas dans l'intervalle demandé.
Saisir un nombre entre 1 et 100 : 42
On peut continuer !</code></pre>`,
          depart: `# Redemande un nombre tant que la saisie n'est pas entre 1 et 100.\n`,
          saisiesTest: ["250", "42"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle." },
              { motif: "\\bor\\b", message: "« Hors de l'intervalle » signifie trop petit OU trop grand." },
              { motif: "float\\s*\\(", message: "Un nombre décimal se convertit avec float()." },
            ],
            sortieRegex: "On peut continuer !$",
            sortieRegexMessage: "Le programme doit se terminer par « On peut continuer ! ».",
          },
          indices: [
            "La condition de rejet combine deux comparaisons : en dessous de 1, ou au-dessus de 100.",
            "Comme pour le mot de passe : une saisie avant, une saisie dans la boucle.",
          ],
        },

        {
          id: "d8",
          type: "code",
          titre: "Exercice 18 — Le drapeau",
          contenu: `
            <p>Un <strong>drapeau</strong> (<em>flag</em>) est une variable booléenne qui
            marque une situation. Ici, <code>continuer</code> vaut <code>True</code> tant que
            la partie n'est pas terminée, et passe à <code>False</code> quand elle l'est —
            que l'on ait gagné <strong>ou</strong> abandonné.</p>
            <p>Le programme est écrit. <strong>Joue quelques parties</strong> (le nombre
            caché est 7), puis repère les <strong>deux endroits</strong> où le drapeau est
            abaissé, avant de valider.</p>
            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi le nombre n'est pas tiré au hasard ici</span>
              Ce parcours <strong>rejoue le programme depuis le début</strong> à chaque
              saisie : un <code>randint</code> donnerait un nombre différent à chaque
              proposition, et le jeu deviendrait injouable. Sur Basthon ou Capytale, remplace
              la première ligne par <code>nombre_cache = randint(1, 10)</code>.
            </div>`,
          depart: `nombre_cache = 7\n\n# Au départ, on n'a ni trouvé, ni abandonné : le drapeau est levé.\ncontinuer = True\n\nwhile continuer:   # inutile d'écrire continuer == True : continuer est déjà un booléen\n    entree = input("Entre un nombre entre 1 et 10 (ou q pour quitter) : ")\n    if entree == "q":\n        continuer = False\n        print("Abandon !")\n    elif int(entree) == nombre_cache:\n        continuer = False\n        print("Bravo !")\n    else:\n        print("Ce n'est pas la bonne réponse")   # le drapeau reste levé : on refait un tour\n`,
          saisiesTest: ["3", "7"],
          validation: {
            sortieRegex: "(Bravo !|Abandon !)$",
            sortieRegexMessage: "Joue jusqu'à trouver le nombre — ou tape q pour abandonner.",
          },
          felicitation: "Un drapeau, deux façons de le baisser, une seule boucle. 🚩",
          indices: [
            "Il n'y a rien à écrire : joue, puis valide.",
            "Le nombre caché est 7. Tape <code>q</code> si tu veux tester l'abandon.",
          ],
          apres: `<span class="chapo">Pourquoi <code>while continuer</code> et pas
            <code>while continuer == True</code> ?</span>
            Parce que <code>continuer</code> <strong>est déjà</strong> un booléen. Écrire
            <code>continuer == True</code> revient à demander « est-il vrai que c'est
            vrai ? ». Les deux fonctionnent, mais la première écriture est celle des
            programmeurs.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>variable = valeur_de_depart   # initialisation

while condition:              # condition d'arrêt
    ...                       # le travail
    variable = ...            # progression, sinon boucle infinie</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Motif</th><th>Question type</th></tr>
              <tr><td><strong>saisie contrôlée</strong></td><td>redemander tant que la réponse est invalide</td></tr>
              <tr><td><strong>seuil</strong></td><td>en combien d'étapes dépasse-t-on une valeur ?</td></tr>
              <tr><td><strong>marqueur de fin</strong></td><td>lire des données jusqu'à une valeur sentinelle</td></tr>
              <tr><td><strong>drapeau</strong></td><td>continuer tant qu'un booléen reste levé</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le réflexe</span>
              Chaque fois que tu écris un <code>while</code>, demande-toi : « qu'est-ce qui,
              dans ce corps de boucle, va finir par rendre la condition fausse ? » Si tu ne
              sais pas répondre, la boucle est infinie.
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
          titre: "Le compte à rebours",
          contenu: `
            <p>Écris une boucle <code>while</code> qui affiche le décompte de 5 à 1, puis le
            décollage :</p>
            <pre class="bloc-code"><code>5
4
3
2
1
Décollage !</code></pre>`,
          depart: `n = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n." },
            ],
            sortie: "5\n4\n3\n2\n1\nDécollage !",
          },
          indices: [
            "La progression se fait vers le bas : la variable diminue à chaque tour.",
            "Le message de décollage est en dehors de la boucle.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Exercice 19 — Le bilan des dépenses",
          contenu: `
            <p>L'administration de l'université doit faire le bilan annuel de ses dépenses.
            Toutes ont été enregistrées, mais <strong>personne ne sait combien il y en
            a</strong>.</p>
            <p>Écris un programme qui lit une suite d'entiers positifs et affiche leur somme.
            Les saisies s'arrêtent quand l'utilisateur entre <code>-1</code> — ce n'est pas
            une dépense, seulement un <strong>marqueur de fin</strong>.</p>
            <pre class="bloc-code"><code>Entrez la somme dépensée : 200
Entrez la somme dépensée : 100
Entrez la somme dépensée : 40
Entrez la somme dépensée : -1
Dépense totale : 340</code></pre>
            <p>⚠️ Attention à ne pas ajouter le <code>-1</code> au total !</p>`,
          depart: `# Additionne les dépenses saisies jusqu'à ce que l'on entre -1.\n`,
          saisiesTest: ["200", "100", "40", "-1"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le nombre de dépenses est inconnu : il faut un while." },
              { motif: "input[\\s\\S]*input", message: "Une saisie avant la boucle, une dedans." },
              { motif: "-\\s*1", message: "La boucle s'arrête sur la valeur -1." },
            ],
            sortieRegex: "Dépense totale : 340$",
            sortieRegexMessage: "Avec 200, 100 et 40, le total doit valoir 340.",
          },
          felicitation: "Le marqueur de fin n'a pas été compté. 🧾",
          indices: [
            "Un accumulateur <code>total</code> initialisé à 0, avant tout.",
            "Le piège : si tu ajoutes avant de tester, le -1 sera compté. Demande d'abord, teste, puis ajoute — donc une saisie avant la boucle.",
            "Dans la boucle : ajouter la dépense au total, puis redemander.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Exercice 20 — Le capital d'Alice",
          contenu: `
            <p>Alice a déposé <strong>1000 €</strong> sur un compte rémunéré à
            <strong>5 % par an</strong>. Chaque année, son capital est multiplié par
            (1 + <em>t</em>/100).</p>
            <p>Écris la boucle qui calcule le nombre d'années au bout duquel son capital
            aura <strong>au moins doublé</strong> :</p>
            <pre class="bloc-code"><code>Le capital a doublé au bout de 15 années</code></pre>`,
          depart: `capital_initial = 1000\ntaux = 5              # en %\n\ncapital = capital_initial\nnb_annees = 0\n\n# Tant que le capital n'a pas doublé : une année de plus, et des intérêts en plus.\n\n\nprint("Le capital a doublé au bout de", nb_annees, "années")\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "\\btaux\\b[\\s\\S]*\\btaux\\b", message: "Utilise la variable taux : le programme doit rester modifiable." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "Le nombre d'années doit être compté par la boucle." },
            ],
            sortie: "Le capital a doublé au bout de 15 années",
          },
          felicitation: "Un algorithme de seuil complet. Change le taux pour voir. 💰",
          indices: [
            "« Doubler » signifie atteindre deux fois le capital initial.",
            "Le facteur multiplicatif s'écrit à partir de <code>taux</code>, pas de 1.05 en dur.",
            "Deux lignes dans la boucle : faire évoluer le capital, et compter une année de plus.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Exercice 21 — Combien de lancers pour un 6 ?",
          contenu: `
            <p>Écris un programme qui lance un dé jusqu'à obtenir un 6, puis affiche le
            nombre de lancers qu'il a fallu. Ce nombre doit être stocké dans une variable
            <code>nb_lancers</code>.</p>
            <pre class="bloc-code"><code>Il a fallu 4 lancer(s) pour obtenir un 6</code></pre>
            <p>💡 Exécute une dizaine de fois : en moyenne, combien de lancers sont
            nécessaires ? Le résultat te semble-t-il cohérent ?</p>`,
          depart: `from random import randint\n\n# Lance le dé jusqu'à obtenir un 6, en comptant les lancers dans nb_lancers.\nnb_lancers = \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le nombre de lancers est inconnu : il faut un while." },
              { motif: "randint[\\s\\S]*randint", message: "Un premier lancer avant la boucle, puis un lancer par tour." },
            ],
            sortieRegex: "Il a fallu \\d+ lancer\\(s\\) pour obtenir un 6",
            sortieRegexMessage: "Ton programme doit afficher le nombre de lancers.",
          },
          felicitation: "En moyenne 6 lancers — ce qui n'a rien d'un hasard. 🎲",
          indices: [
            "Comme pour la saisie contrôlée : un premier lancer avant la boucle, un nouveau lancer dedans.",
            "Le compteur démarre à 1, puisque le premier lancer a déjà eu lieu.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Combien de termes pour dépasser 100 ?",
          contenu: `
            <p>On additionne 1 + 2 + 3 + 4 + … jusqu'à dépasser 100. Affiche exactement :</p>
            <pre class="bloc-code"><code>Il faut 14 termes pour dépasser 100
La somme vaut alors 105</code></pre>
            <p>C'est le programme du cours, à reconstruire : deux variables évoluent
            ensemble.</p>`,
          depart: `somme = 0\nterme = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "On ne sait pas combien de termes : il faut un while." },
            ],
            codeAbsent: [
              { motif: "\\b105\\b|\\b14\\b", message: "Les deux résultats doivent être calculés." },
            ],
            sortie: "Il faut 14 termes pour dépasser 100\nLa somme vaut alors 105",
          },
          indices: [
            "La condition porte sur la somme, pas sur le terme.",
            "Dans la boucle : passer au terme suivant, <strong>puis</strong> l'ajouter à la somme.",
          ],
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 25,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le nombre mystère, en entier",
          contenu: `
            <p>À la séance 7, tu n'avais droit qu'à un seul essai. Cette fois, on rejoue tant
            que ce n'est pas trouvé, et on compte les tentatives :</p>
            <pre class="bloc-code"><code>Ta proposition ? 30
C'est plus !
Ta proposition ? 50
C'est moins !
Ta proposition ? 42
Bravo ! Trouvé en 3 essais.</code></pre>`,
          depart: `secret = 42\n\n`,
          saisiesTest: ["30", "50", "42"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut rejouer tant que ce n'est pas trouvé." },
              { motif: "\\bif\\b", message: "Il faut dire si c'est plus ou moins." },
              { motif: "input[\\s\\S]*input", message: "Deux saisies : une avant la boucle, une dedans." },
            ],
            sortieRegex: "Bravo ! Trouvé en \\d+ essais\\.$",
            sortieRegexMessage: "Ton programme doit finir par « Bravo ! Trouvé en … essais. »",
          },
          felicitation: "Ton premier jeu complet. 🎯",
          indices: [
            "Demande une première proposition avant la boucle, et initialise le compteur à 1.",
            "La condition de la boucle : tant que la proposition n'est pas le secret.",
            "Dans la boucle : le test plus/moins, puis une nouvelle saisie, puis l'incrément du compteur.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Combien de chiffres ?",
          contenu: `
            <p>Compte les chiffres de <code>48273</code> sans le transformer en texte :</p>
            <pre class="bloc-code"><code>48273 a 5 chiffres.</code></pre>
            <p>L'idée : diviser par 10 en division entière retire un chiffre à chaque fois.
            On s'arrête quand il n'en reste qu'un.</p>`,
          depart: `nombre = 48273\nreste = nombre\nchiffres = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "//", message: "Retirer un chiffre, c'est diviser par 10 en division entière." },
            ],
            codeAbsent: [
              { motif: "\\blen\\s*\\(|\\bstr\\s*\\(", message: "Interdit de passer par du texte : travaille sur le nombre." },
            ],
            sortie: "48273 a 5 chiffres.",
          },
          indices: [
            "La boucle tourne tant que le nombre restant a encore au moins deux chiffres.",
            "Deux lignes dans la boucle : retirer un chiffre, et compter un chiffre de plus.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Le PGCD par soustractions",
          contenu: `
            <p>La plus vieille méthode connue pour trouver le plus grand diviseur commun :
            tant que les deux nombres diffèrent, on remplace le plus grand par leur
            différence.</p>
            <p>Avec 48 et 36, affiche exactement :</p>
            <pre class="bloc-code"><code>PGCD de 48 et 36 : 12</code></pre>`,
          depart: `a = 48\nb = 36\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "\\bif\\b", message: "Il faut savoir lequel des deux est le plus grand." },
            ],
            codeAbsent: [
              { motif: "\\b12\\b", message: "Le PGCD doit être calculé." },
            ],
            sortie: "PGCD de 48 et 36 : 12",
          },
          felicitation: "L'algorithme d'Euclide, version soustractive. Il a 2 300 ans. 🏛️",
          indices: [
            "Garde les valeurs de départ dans deux autres variables, pour pouvoir les afficher à la fin.",
            "La boucle tourne tant que les deux valeurs de travail diffèrent.",
            "À la sortie, elles sont égales : c'est le PGCD.",
          ],
        },

        {
          id: "x4",
          type: "code",
          titre: "Ton algorithme de seuil",
          contenu: `
            <p>Défi libre. Écris un programme qui utilise une boucle <code>while</code> pour
            répondre à une question du type « <strong>au bout de combien de temps…</strong> ».</p>
            <p>Des idées : au bout de combien d'années une population qui baisse de 2 % par an
            passe-t-elle sous la moitié ? combien de fois faut-il plier une feuille de 0,1 mm
            pour dépasser la tour Eiffel ? combien de termes de la suite des inverses
            faut-il additionner pour dépasser 3 ?</p>`,
          depart: `# Ton algorithme de seuil\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Ton programme doit contenir une boucle while." },
              { motif: "^\\s*\\w+\\s*=\\s*[\\s\\S]*\\n[\\s\\S]*\\n\\s+\\w+\\s*=[^=]", options: "m",
                message: "Il faut une variable initialisée avant la boucle et modifiée dedans." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 8 terminée. Tu sais répéter jusqu'à ce que ça tombe. 🏁",
          indices: [
            "Structure : une quantité, un compteur, une boucle qui fait évoluer les deux.",
            "N'oublie pas la progression, sous peine de boucle infinie — l'éditeur t'arrêtera au bout de quinze secondes.",
          ],
        },
      ],
    },
  ],
};

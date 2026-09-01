/* Séance 10 — Projet & bilan.
 * Tout le Python de la Seconde, assemblé dans un programme complet.
 *
 * Le projet n'utilise PAS le hasard : le parcours rejoue le programme à chaque
 * input(), ce qui changerait les tirages entre deux relances. Saisie et hasard
 * ne se mélangent donc jamais dans une même étape — le défi x4 simule une classe
 * entière, mais sans aucune saisie.
 */

export default {
  id: "s10",
  numero: 10,
  titre: "Projet & bilan",
  sousTitre: "Assembler tout ce que tu sais",
  palier: "Pour finir",

  accroche: `Neuf séances, neuf outils. Il est temps de les faire tenir ensemble dans
    un seul programme qui sert vraiment à quelque chose : un <strong>bulletin de
    notes</strong> complet, construit étape par étape.`,

  objectifs: [
    "réviser les neuf séances en quelques minutes",
    "construire un programme complet, morceau par morceau",
    "traiter des données en un seul passage",
    "produire un affichage soigné",
  ],

  motDeLaFin: `Tu as terminé le parcours. La séance 11, en bonus, rassemble les
    algorithmes que ton cours de mathématiques va te réclamer cette année.`,

  parties: [

    /* ============================ RÉVISIONS ============================ */
    {
      id: "decouverte",
      titre: "Révisions express",
      minutes: 20,
      etoiles: 1,
      intention: "une question par séance, pour se remettre en jambes",
      etapes: [

        {
          id: "r1",
          type: "qcm",
          titre: "Séance 1 — afficher",
          contenu: `<pre class="bloc-code"><code>print("3 * 4")
print(3 * 4)</code></pre>`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>12</code> puis <code>12</code>", explication: "La première ligne est entre guillemets : c'est du texte." },
            { texte: "<code>3 * 4</code> puis <code>12</code>", correct: true,
              explication: "Guillemets = texte recopié ; sans guillemets = calcul effectué." },
            { texte: "<code>3 * 4</code> puis <code>3 * 4</code>", explication: "Sans guillemets, Python calcule." },
            { texte: "Une erreur", explication: "Les deux lignes sont correctes." },
          ],
        },

        {
          id: "r2",
          type: "code",
          titre: "Séance 2 — variables et division entière",
          contenu: `
            <p>Avec <code>total = 197</code> et <code>parpage = 12</code>, affiche
            exactement :</p>
            <pre class="bloc-code"><code>16 pages pleines, et 5 en trop</code></pre>`,
          depart: `total = 197\nparpage = 12\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le nombre de pages pleines s'obtient avec //." },
              { motif: "%", message: "Ce qui dépasse s'obtient avec %." },
            ],
            codeAbsent: [{ motif: "\\b16\\b", message: "Les résultats doivent être calculés." }],
            sortie: "16 pages pleines, et 5 en trop",
          },
          indices: ["<code>print(total // parpage, \"pages pleines, et\", total % parpage, \"en trop\")</code>"],
          solution: `total = 197\nparpage = 12\n\nprint(total // parpage, "pages pleines, et", total % parpage, "en trop")\n`,
        },

        {
          id: "r3",
          type: "qcm",
          titre: "Séance 3 — la saisie",
          contenu: `<pre class="bloc-code"><code>age = input("Ton âge ? ")
print(age * 2)</code></pre>
            <p>L'utilisateur tape <code>7</code>.</p>`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>14</code>", explication: "Ce serait le cas si age contenait un nombre." },
            { texte: "<code>77</code>", correct: true,
              explication: "<code>age</code> contient le texte \"7\" ; multiplier un texte par 2 le répète." },
            { texte: "Une <code>TypeError</code>", explication: "Non : multiplier un texte par un entier est légal en Python, cela le répète." },
            { texte: "<code>7</code>", explication: "Il y a bien une multiplication." },
          ],
          apres: `<span class="chapo">Le réflexe</span> Toujours convertir : <code>int(input(…))</code>.`,
        },

        {
          id: "r4",
          type: "code",
          titre: "Séance 4 — la cascade de tests",
          contenu: `
            <p>Avec <code>vitesse = 92</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Excès de vitesse</code></pre>
            <p>La règle : au-delà de 130 → <code>Grand excès</code> ; au-delà de 90 →
            <code>Excès de vitesse</code> ; sinon → <code>Vitesse correcte</code>.</p>`,
          depart: `vitesse = 92\n\n`,
          validation: {
            codeContient: [{ motif: "\\belif\\b", message: "Trois cas : il te faut un elif." }],
            sortie: "Excès de vitesse",
          },
          indices: ["Commence par le cas le plus élevé : <code>if vitesse > 130:</code>."],
          solution: `vitesse = 92\n\nif vitesse > 130:\n    print("Grand excès")\nelif vitesse > 90:\n    print("Excès de vitesse")\nelse:\n    print("Vitesse correcte")\n`,
        },

        {
          id: "r5",
          type: "code",
          titre: "Séance 5 — boucle et accumulateur",
          contenu: `
            <p>Calcule la somme des multiples de 3 entre 1 et 300, et affiche exactement :</p>
            <pre class="bloc-code"><code>Somme : 15150</code></pre>`,
          depart: `somme = 0\n\n`,
          validation: {
            codeContient: [{ motif: "\\bfor\\b", message: "Il faut une boucle." }],
            codeAbsent: [{ motif: "15150", message: "La somme doit être calculée." }],
            sortie: "Somme : 15150",
          },
          indices: [
            "<code>range(3, 301, 3)</code> ne donne que les multiples de 3.",
            "Ou parcours <code>range(1, 301)</code> avec un <code>if i % 3 == 0</code>.",
          ],
          solution: `somme = 0\n\nfor i in range(3, 301, 3):\n    somme = somme + i\n\nprint("Somme :", somme)\n`,
        },

        {
          id: "r6",
          type: "code",
          titre: "Séance 6 — l'algorithme de seuil",
          contenu: `
            <p>Une bactérie se divise toutes les heures : leur nombre double. On part
            d'<strong>une</strong> bactérie. Au bout de combien d'heures dépasse-t-on le
            million ?</p>
            <pre class="bloc-code"><code>Il faut 20 heures.</code></pre>`,
          depart: `bacteries = 1\nheures = 0\n\n`,
          validation: {
            codeContient: [{ motif: "\\bwhile\\b", message: "On ne sait pas d'avance : il faut un while." }],
            codeAbsent: [{ motif: "\\b20\\b", message: "Le nombre d'heures doit être compté." }],
            sortie: "Il faut 20 heures.",
          },
          indices: [
            "<code>while bacteries &lt;= 1000000:</code>",
            "Dans la boucle : doubler et incrémenter le compteur d'heures.",
          ],
          solution: `bacteries = 1\nheures = 0\n\nwhile bacteries <= 1000000:\n    bacteries = bacteries * 2\n    heures = heures + 1\n\nprint("Il faut", heures, "heures.")\n`,
        },

        {
          id: "r7",
          type: "code",
          titre: "Séances 7 et 8 — les fonctions",
          contenu: `
            <p>Écris <code>arrondi_au_dixieme(x)</code> qui renvoie <code>x</code> arrondi
            au dixième — sans utiliser <code>round()</code>.</p>
            <div class="encadre" data-ton="astuce">
              La méthode : multiplier par 10, arrondir à l'entier le plus proche en ajoutant
              0,5 puis en prenant la partie entière avec <code>int()</code>, et rediviser
              par 10. Ici, toutes les valeurs testées sont positives.
            </div>`,
          depart: `def arrondi_au_dixieme(x):\n    \n`,
          validation: {
            codeAbsent: [{ motif: "\\bround\\s*\\(", message: "round() est interdite : reconstruis-la." }],
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer le résultat." }],
            tests: `assert arrondi_au_dixieme(3.14159) == 3.1, "3.14159 arrondi au dixième vaut 3.1"\nassert arrondi_au_dixieme(2.75) == 2.8, "2.75 arrondi au dixième vaut 2.8"\nassert arrondi_au_dixieme(5) == 5, "un entier reste lui-même"`,
          },
          indices: [
            "<code>int(x * 10 + 0.5)</code> donne le nombre de dixièmes, arrondi.",
            "<code>return int(x * 10 + 0.5) / 10</code>",
          ],
          solution: `def arrondi_au_dixieme(x):\n    return int(x * 10 + 0.5) / 10\n`,
        },

        {
          id: "r8",
          type: "code",
          titre: "Séance 9 — la simulation",
          contenu: `
            <p>Estime par simulation la fréquence d'obtenir <strong>deux fois 6 de suite</strong>
            avec un dé, sur 20 000 essais. La probabilité théorique vaut 1/36 ≈ 0,028.</p>
            <pre class="bloc-code"><code>Fréquence : 0.02795</code></pre>`,
          depart: `from random import randint\n\ncompteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut répéter l'expérience." },
              { motif: "randint[\\s\\S]*randint", message: "Deux lancers par essai, donc deux appels." },
            ],
            sortieRegex: "Fréquence : 0\\.0[12]\\d*",
            sortieRegexMessage: "La fréquence doit tomber autour de 0.028.",
          },
          felicitation: "Neuf séances révisées. Place au projet. 🚀",
          indices: [
            "Dans la boucle : deux lancers, puis <code>if de1 == 6 and de2 == 6:</code>.",
            "La fréquence : <code>compteur / 20000</code>.",
          ],
          solution: `from random import randint\n\ncompteur = 0\n\nfor essai in range(20000):\n    de1 = randint(1, 6)\n    de2 = randint(1, 6)\n    if de1 == 6 and de2 == 6:\n        compteur = compteur + 1\n\nprint("Fréquence :", compteur / 20000)\n`,
        },
      ],
    },

    /* ============================== LE PROJET ============================== */
    {
      id: "application",
      titre: "Le projet : un bulletin de notes",
      minutes: 40,
      etoiles: 2,
      intention: "on construit un vrai programme, morceau par morceau",
      etapes: [

        {
          id: "p1",
          type: "cours",
          titre: "Ce qu'on va construire",
          contenu: `
            <p>Un programme qui demande des notes et produit un bulletin complet :</p>

            <pre class="bloc-code"><code>Combien de notes ? 5
Note 1 ? 12
Note 2 ? 15
Note 3 ? 9
Note 4 ? 18
Note 5 ? 11

===== BULLETIN =====
Moyenne : 13.0
Note la plus basse : 9
Note la plus haute : 18
Appréciation : Bien

Répartition :
 0 à  5 |
 5 à 10 |#
10 à 15 |##
15 à 20 |##
====================</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une contrainte, et une leçon</span>
              Tu ne connais pas encore les <strong>listes</strong> : impossible de garder
              les notes pour les reparcourir. Il faut donc tout calculer
              <strong>en un seul passage</strong> — moyenne, extrêmes et répartition en même
              temps que la saisie.
              <br><br>
              Ce n'est pas une limitation : c'est ainsi que travaillent les vrais programmes
              qui traitent des millions de données, car elles ne tiennent pas en mémoire.
            </div>

            <p>On y va morceau par morceau. Chaque étape part du programme de la
            précédente : ne repars jamais de zéro.</p>`,
        },

        {
          id: "p2",
          type: "code",
          titre: "Étape 1 — la saisie",
          contenu: `
            <p>Demande d'abord <strong>combien</strong> de notes, puis les notes une par une.
            Avec 3 notes — 12, 15 et 9 :</p>
            <pre class="bloc-code"><code>Combien de notes ? 3
Note ? 12
Note ? 15
Note ? 9
Saisie terminée.</code></pre>`,
          depart: `\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "Les saisies doivent être converties en nombres." },
              { motif: "\\bfor\\b", message: "Les notes se saisissent dans une boucle." },
            ],
            sortieContient: ["Saisie terminée."],
          },
          indices: [
            "<code>nombre = int(input(\"Combien de notes ? \"))</code>",
            "<code>for i in range(nombre):</code> puis, dedans, <code>note = int(input(\"Note ? \"))</code>.",
          ],
          solution: `nombre = int(input("Combien de notes ? "))\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n\nprint("Saisie terminée.")\n`,
        },

        {
          id: "p3",
          type: "code",
          titre: "Étape 2 — la moyenne",
          contenu: `
            <p>Ajoute un accumulateur pour la somme, et affiche la moyenne à la fin :</p>
            <pre class="bloc-code"><code>Combien de notes ? 3
Note ? 12
Note ? 15
Note ? 9
Moyenne : 12.0</code></pre>`,
          depart: `nombre = int(input("Combien de notes ? "))\nsomme = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "somme\\s*=\\s*somme\\s*\\+|somme\\s*\\+=", message: "Il faut accumuler les notes dans somme." },
              { motif: "/\\s*nombre", message: "La moyenne se divise par le nombre de notes saisies." },
            ],
            sortieRegex: "Moyenne : 12\\.0",
            sortieRegexMessage: "Avec 12, 15 et 9, la moyenne doit valoir 12.0.",
          },
          indices: [
            "Dans la boucle, après la saisie : <code>somme = somme + note</code>.",
            "Après la boucle : <code>print(\"Moyenne :\", somme / nombre)</code>.",
          ],
          solution: `nombre = int(input("Combien de notes ? "))\nsomme = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n\nprint("Moyenne :", somme / nombre)\n`,
        },

        {
          id: "p4",
          type: "code",
          titre: "Étape 3 — la plus basse et la plus haute",
          contenu: `
            <p>Ajoute deux « champions » : <code>mini</code> et <code>maxi</code>.</p>
            <pre class="bloc-code"><code>Moyenne : 12.0
Note la plus basse : 9
Note la plus haute : 15</code></pre>
            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège de l'initialisation</span>
              Si tu initialises <code>mini = 0</code>, aucune note ne sera jamais plus
              petite. Pars d'une valeur <strong>impossible</strong> : <code>mini = 21</code>
              et <code>maxi = -1</code>, puisque les notes vont de 0 à 20.
            </div>`,
          depart: `nombre = int(input("Combien de notes ? "))\nsomme = 0\nmini = 21\nmaxi = -1\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n\nprint("Moyenne :", somme / nombre)\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "mini\\s*=\\s*note", message: "Quand une note est plus petite que mini, mini doit la recevoir." },
              { motif: "maxi\\s*=\\s*note", message: "Même chose pour maxi." },
            ],
            sortieRegex: "Note la plus basse : 9\\nNote la plus haute : 15",
            sortieRegexMessage: "Avec 12, 15 et 9, la plus basse est 9 et la plus haute 15.",
          },
          felicitation: "Trois calculs menés en un seul passage. 🏆",
          indices: [
            "Dans la boucle : <code>if note &lt; mini:</code> puis <code>mini = note</code>.",
            "Et <code>if note > maxi:</code> puis <code>maxi = note</code>.",
            "Les deux <code>print</code> viennent après la boucle, sous celui de la moyenne.",
          ],
          solution: `nombre = int(input("Combien de notes ? "))\nsomme = 0\nmini = 21\nmaxi = -1\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note\n\nprint("Moyenne :", somme / nombre)\nprint("Note la plus basse :", mini)\nprint("Note la plus haute :", maxi)\n`,
        },

        {
          id: "p5",
          type: "code",
          titre: "Étape 4 — l'appréciation",
          contenu: `
            <p>Écris une fonction <code>appreciation(moyenne)</code> qui renvoie une chaîne :</p>
            <ul>
              <li>moins de 8 → <code>Insuffisant</code></li>
              <li>de 8 à moins de 10 → <code>Fragile</code></li>
              <li>de 10 à moins de 14 → <code>Satisfaisant</code></li>
              <li>de 14 à moins de 16 → <code>Bien</code></li>
              <li>16 et plus → <code>Très bien</code></li>
            </ul>
            <p>Place la fonction <strong>tout en haut</strong> du programme, et affiche
            l'appréciation après la moyenne.</p>`,
          depart: `def appreciation(moyenne):\n    \n\nnombre = int(input("Combien de notes ? "))\nsomme = 0\nmini = 21\nmaxi = -1\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note\n\nmoyenne = somme / nombre\nprint("Moyenne :", moyenne)\nprint("Note la plus basse :", mini)\nprint("Note la plus haute :", maxi)\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer l'appréciation." },
              { motif: "\\belif\\b", message: "Cinq cas : il te faut des elif." },
              { motif: "appreciation\\s*\\(\\s*moyenne\\s*\\)", message: "Appelle la fonction avec la moyenne calculée." },
            ],
            tests: `assert appreciation(7) == "Insuffisant", "7 de moyenne : Insuffisant"\nassert appreciation(9) == "Fragile", "9 de moyenne : Fragile"\nassert appreciation(12) == "Satisfaisant", "12 de moyenne : Satisfaisant"\nassert appreciation(15) == "Bien", "15 de moyenne : Bien"\nassert appreciation(18) == "Très bien", "18 de moyenne : Très bien"`,
            sortieRegex: "Appréciation : Satisfaisant",
            sortieRegexMessage: "Avec une moyenne de 12, l'appréciation doit être « Satisfaisant ».",
          },
          indices: [
            "Commence par le plus haut : <code>if moyenne >= 16: return \"Très bien\"</code>.",
            "Chaque cas renvoie directement : pas besoin de <code>else</code> entre eux.",
            "L'affichage : <code>print(\"Appréciation :\", appreciation(moyenne))</code>.",
          ],
          solution: `def appreciation(moyenne):\n    if moyenne >= 16:\n        return "Très bien"\n    elif moyenne >= 14:\n        return "Bien"\n    elif moyenne >= 10:\n        return "Satisfaisant"\n    elif moyenne >= 8:\n        return "Fragile"\n    return "Insuffisant"\n\nnombre = int(input("Combien de notes ? "))\nsomme = 0\nmini = 21\nmaxi = -1\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note\n\nmoyenne = somme / nombre\nprint("Moyenne :", moyenne)\nprint("Note la plus basse :", mini)\nprint("Note la plus haute :", maxi)\nprint("Appréciation :", appreciation(moyenne))\n`,
        },

        {
          id: "p6",
          type: "code",
          titre: "Étape 5 — la répartition",
          contenu: `
            <p>Ajoute <strong>quatre compteurs</strong> pour les tranches [0 ; 5[, [5 ; 10[,
            [10 ; 15[ et [15 ; 20]. Affiche-les à la fin :</p>
            <pre class="bloc-code"><code>Tranche 0-5 : 0
Tranche 5-10 : 1
Tranche 10-15 : 1
Tranche 15-20 : 1</code></pre>
            <p>Avec 12, 15 et 9. Attention : 15 appartient à la <em>dernière</em> tranche.</p>`,
          depart: `nombre = int(input("Combien de notes ? "))\nt1 = 0\nt2 = 0\nt3 = 0\nt4 = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "\\belif\\b", message: "Quatre tranches : une cascade de elif." },
            ],
            sortieRegex: "Tranche 0-5 : 0\\nTranche 5-10 : 1\\nTranche 10-15 : 1\\nTranche 15-20 : 1",
            sortieRegexMessage: "Avec 12, 15 et 9, la répartition doit être 0, 1, 1, 1.",
          },
          felicitation: "Quatre compteurs, un seul passage. 📊",
          indices: [
            "Dans la boucle : <code>if note &lt; 5: t1 = t1 + 1</code>.",
            "Puis <code>elif note &lt; 10:</code>, <code>elif note &lt; 15:</code>, et <code>else:</code>.",
            "L'ordre compte : une note de 3 est aussi inférieure à 10, mais le premier test l'a déjà attrapée.",
          ],
          solution: `nombre = int(input("Combien de notes ? "))\nt1 = 0\nt2 = 0\nt3 = 0\nt4 = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    if note < 5:\n        t1 = t1 + 1\n    elif note < 10:\n        t2 = t2 + 1\n    elif note < 15:\n        t3 = t3 + 1\n    else:\n        t4 = t4 + 1\n\nprint("Tranche 0-5 :", t1)\nprint("Tranche 5-10 :", t2)\nprint("Tranche 10-15 :", t3)\nprint("Tranche 15-20 :", t4)\n`,
        },

        {
          id: "p7",
          type: "code",
          titre: "Étape 6 — l'histogramme",
          contenu: `
            <p>Remplace les quatre affichages par un histogramme : une barre de dièses,
            longue comme l'effectif de la tranche.</p>
            <pre class="bloc-code"><code> 0 à  5 |
 5 à 10 |#
10 à 15 |#
15 à 20 |#</code></pre>
            <p>Écris une fonction <code>barre(libelle, effectif)</code> qui affiche une
            ligne — c'est plus propre que quatre <code>print</code> presque identiques.</p>`,
          depart: `def barre(libelle, effectif):\n    \n\nt1 = 0\nt2 = 1\nt3 = 1\nt4 = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+barre\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction barre doit avoir deux paramètres." },
              { motif: "\\*\\s*effectif|effectif\\s*\\*", message: "La longueur de la barre vient de l'effectif." },
            ],
            sortie: " 0 à  5 |\n 5 à 10 |#\n10 à 15 |#\n15 à 20 |#",
          },
          felicitation: "Un graphique, en quatre appels de fonction. 📈",
          indices: [
            "<code>print(libelle, \"|\" + \"#\" * effectif)</code>",
            "Attention aux espaces d'alignement dans les libellés : <code>\" 0 à  5\"</code> commence par une espace et en a deux avant le 5.",
            "Les appels : <code>barre(\" 0 à  5\", t1)</code>, etc.",
          ],
          solution: `def barre(libelle, effectif):\n    print(libelle, "|" + "#" * effectif)\n\nt1 = 0\nt2 = 1\nt3 = 1\nt4 = 1\n\nbarre(" 0 à  5", t1)\nbarre(" 5 à 10", t2)\nbarre("10 à 15", t3)\nbarre("15 à 20", t4)\n`,
        },

        {
          id: "p8",
          type: "code",
          titre: "Étape 7 — le bulletin complet",
          contenu: `
            <p>Assemble tout. Ton programme doit produire, avec 12, 15 et 9 :</p>
            <pre class="bloc-code"><code>Combien de notes ? 3
Note ? 12
Note ? 15
Note ? 9
===== BULLETIN =====
Moyenne : 12.0
Note la plus basse : 9
Note la plus haute : 15
Appréciation : Satisfaisant
Répartition :
 0 à  5 |
 5 à 10 |#
10 à 15 |#
15 à 20 |#
====================</code></pre>
            <p>Le code de départ contient déjà tes deux fonctions. À toi de reconstituer
            la boucle unique et l'affichage final.</p>`,
          depart: `def appreciation(moyenne):\n    if moyenne >= 16:\n        return "Très bien"\n    elif moyenne >= 14:\n        return "Bien"\n    elif moyenne >= 10:\n        return "Satisfaisant"\n    elif moyenne >= 8:\n        return "Fragile"\n    return "Insuffisant"\n\ndef barre(libelle, effectif):\n    print(libelle, "|" + "#" * effectif)\n\n`,
          saisiesTest: ["3", "12", "15", "9"],
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut la boucle de saisie." },
              { motif: "appreciation\\s*\\(", message: "Utilise la fonction appreciation." },
              { motif: "barre\\s*\\(", message: "Utilise la fonction barre pour l'histogramme." },
            ],
            sortieRegex: "===== BULLETIN =====\\nMoyenne : 12\\.0\\nNote la plus basse : 9\\nNote la plus haute : 15\\nAppréciation : Satisfaisant\\nRépartition :\\n 0 à  5 \\|\\n 5 à 10 \\|#\\n10 à 15 \\|#\\n15 à 20 \\|#\\n====================",
            sortieRegexMessage: "Le bulletin doit reprendre exactement la forme de l'énoncé.",
          },
          felicitation: "Ton premier vrai programme complet. Trente lignes qui font quelque chose d'utile. 🎓",
          indices: [
            "Reprends l'étape 3 pour la boucle, en y ajoutant les quatre compteurs de l'étape 5.",
            "Sept variables à initialiser avant la boucle : <code>somme</code>, <code>mini</code>, <code>maxi</code>, <code>t1</code> à <code>t4</code>.",
            "Les lignes d'encadrement : <code>print(\"===== BULLETIN =====\")</code> et <code>print(\"=\" * 20)</code>.",
          ],
          solution: `def appreciation(moyenne):\n    if moyenne >= 16:\n        return "Très bien"\n    elif moyenne >= 14:\n        return "Bien"\n    elif moyenne >= 10:\n        return "Satisfaisant"\n    elif moyenne >= 8:\n        return "Fragile"\n    return "Insuffisant"\n\ndef barre(libelle, effectif):\n    print(libelle, "|" + "#" * effectif)\n\nnombre = int(input("Combien de notes ? "))\nsomme = 0\nmini = 21\nmaxi = -1\nt1 = 0\nt2 = 0\nt3 = 0\nt4 = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note\n    if note < 5:\n        t1 = t1 + 1\n    elif note < 10:\n        t2 = t2 + 1\n    elif note < 15:\n        t3 = t3 + 1\n    else:\n        t4 = t4 + 1\n\nmoyenne = somme / nombre\n\nprint("===== BULLETIN =====")\nprint("Moyenne :", moyenne)\nprint("Note la plus basse :", mini)\nprint("Note la plus haute :", maxi)\nprint("Appréciation :", appreciation(moyenne))\nprint("Répartition :")\nbarre(" 0 à  5", t1)\nbarre(" 5 à 10", t2)\nbarre("10 à 15", t3)\nbarre("15 à 20", t4)\nprint("=" * 20)\n`,
        },
      ],
    },

    /* ============================== EXTENSIONS ============================== */
    {
      id: "defis",
      titre: "Extensions",
      minutes: 25,
      etoiles: 3,
      intention: "améliore ton bulletin, ou pars ailleurs",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Refuser les notes impossibles",
          contenu: `
            <p>Ton programme accepte une note de 47. Corrige cela : tant que la note saisie
            n'est pas entre 0 et 20, redemande-la.</p>
            <pre class="bloc-code"><code>Note ? 47
Note invalide, recommence.
Note ? 12
Note enregistrée : 12</code></pre>
            <p>Écris seulement la boucle de saisie sécurisée, pour une note.</p>`,
          depart: `\n`,
          saisiesTest: ["47", "12"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut redemander tant que la note est invalide." },
              { motif: "\\bor\\b", message: "Une note est invalide si elle est trop petite OU trop grande." },
            ],
            sortieRegex: "Note invalide, recommence\\.[\\s\\S]*Note enregistrée : 12",
            sortieRegexMessage: "Ton programme doit refuser 47 puis accepter 12.",
          },
          indices: [
            "Une première saisie <em>avant</em> la boucle.",
            "<code>while note &lt; 0 or note > 20:</code> avec, dedans, le message et une nouvelle saisie.",
          ],
          solution: `note = int(input("Note ? "))\n\nwhile note < 0 or note > 20:\n    print("Note invalide, recommence.")\n    note = int(input("Note ? "))\n\nprint("Note enregistrée :", note)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Les coefficients",
          contenu: `
            <p>Une vraie moyenne est <strong>pondérée</strong> : chaque note a un coefficient.
            Demande, pour chaque note, sa valeur puis son coefficient.</p>
            <p>Avec deux notes — 12 coefficient 1, puis 16 coefficient 3 :</p>
            <pre class="bloc-code"><code>Moyenne pondérée : 15.0</code></pre>
            <p><em>(12 × 1 + 16 × 3) / (1 + 3) = 60 / 4 = 15</em></p>`,
          depart: `nombre = int(input("Combien de notes ? "))\ntotal = 0\ntotal_coef = 0\n\n`,
          saisiesTest: ["2", "12", "1", "16", "3"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Deux saisies par note : la valeur et le coefficient." },
              { motif: "total_coef", message: "Il faut aussi accumuler la somme des coefficients." },
            ],
            sortieRegex: "Moyenne pondérée : 15\\.0",
            sortieRegexMessage: "Avec 12 (coef 1) et 16 (coef 3), la moyenne pondérée vaut 15.0.",
          },
          felicitation: "La vraie moyenne du bulletin. 🎯",
          indices: [
            "Dans la boucle : <code>note = int(input(\"Note ? \"))</code> puis <code>coef = int(input(\"Coefficient ? \"))</code>.",
            "<code>total = total + note * coef</code> et <code>total_coef = total_coef + coef</code>.",
            "À la fin : <code>total / total_coef</code>, et surtout pas <code>/ nombre</code>.",
          ],
          solution: `nombre = int(input("Combien de notes ? "))\ntotal = 0\ntotal_coef = 0\n\nfor i in range(nombre):\n    note = int(input("Note ? "))\n    coef = int(input("Coefficient ? "))\n    total = total + note * coef\n    total_coef = total_coef + coef\n\nprint("Moyenne pondérée :", total / total_coef)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "L'écart à la moyenne de la classe",
          contenu: `
            <p>La moyenne de la classe vaut 11,5. Écris <code>situation(moyenne, classe)</code>
            qui renvoie une phrase :</p>
            <ul>
              <li>écart supérieur à 3 points → <code>Nettement au-dessus</code></li>
              <li>écart entre 0 et 3 → <code>Au-dessus</code></li>
              <li>écart entre −3 et 0 → <code>En dessous</code></li>
              <li>écart inférieur à −3 → <code>Nettement en dessous</code></li>
            </ul>`,
          depart: `def situation(moyenne, classe):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer une chaîne." },
              { motif: "\\belif\\b", message: "Quatre cas : il te faut des elif." },
            ],
            tests: `assert situation(16, 11.5) == "Nettement au-dessus", "16 contre 11,5 : nettement au-dessus"\nassert situation(13, 11.5) == "Au-dessus", "13 contre 11,5 : au-dessus"\nassert situation(10, 11.5) == "En dessous", "10 contre 11,5 : en dessous"\nassert situation(7, 11.5) == "Nettement en dessous", "7 contre 11,5 : nettement en dessous"\nassert situation(11.5, 11.5) == "En dessous", "à égalité, l'écart est nul, donc pas au-dessus"`,
          },
          indices: [
            "Calcule d'abord l'écart : <code>ecart = moyenne - classe</code>.",
            "Puis une cascade sur <code>ecart</code>, du plus grand au plus petit.",
            "Attention au cas d'égalité : un écart nul n'est pas strictement positif.",
          ],
          solution: `def situation(moyenne, classe):\n    ecart = moyenne - classe\n    if ecart > 3:\n        return "Nettement au-dessus"\n    elif ecart > 0:\n        return "Au-dessus"\n    elif ecart > -3:\n        return "En dessous"\n    return "Nettement en dessous"\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Simuler une classe entière",
          contenu: `
            <p>Plutôt que de saisir les notes, <strong>tire-les au hasard</strong> : 30 notes
            entre 0 et 20, et sors-en les statistiques.</p>
            <pre class="bloc-code"><code>Effectif : 30
Moyenne : 10.4
Minimum : 0
Maximum : 20
Au-dessus de 10 : 16</code></pre>
            <p><em>(tes valeurs seront différentes)</em></p>
            <div class="encadre" data-ton="attention">
              Aucune saisie dans ce défi : hasard et <code>input()</code> ne se mélangent pas
              dans ce parcours, car le programme est rejoué à chaque saisie.
            </div>`,
          depart: `from random import randint\n\nsomme = 0\nmini = 21\nmaxi = -1\nau_dessus = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "randint\\s*\\(\\s*0\\s*,\\s*20\\s*\\)", message: "Les notes vont de 0 à 20 : randint(0, 20)." },
              { motif: "\\bfor\\b", message: "Il faut une boucle sur les 30 élèves." },
            ],
            codeAbsent: [
              { motif: "\\binput\\b", message: "Pas de saisie dans ce défi : les notes sont tirées au hasard." },
            ],
            sortieRegex: "Effectif : 30\\nMoyenne : \\d+(\\.\\d+)?\\nMinimum : \\d+\\nMaximum : \\d+\\nAu-dessus de 10 : \\d+",
            sortieRegexMessage: "Ton programme doit afficher les cinq lignes de statistiques.",
          },
          felicitation: "Un jeu de données complet, généré et analysé en un passage. 🎲📊",
          indices: [
            "Dans la boucle : <code>note = randint(0, 20)</code>, puis les mêmes mises à jour qu'au projet.",
            "<code>if note > 10:</code> pour le dernier compteur.",
            "La moyenne se divise par 30.",
          ],
          solution: `from random import randint\n\nsomme = 0\nmini = 21\nmaxi = -1\nau_dessus = 0\n\nfor eleve in range(30):\n    note = randint(0, 20)\n    somme = somme + note\n    if note < mini:\n        mini = note\n    if note > maxi:\n        maxi = note\n    if note > 10:\n        au_dessus = au_dessus + 1\n\nprint("Effectif :", 30)\nprint("Moyenne :", somme / 30)\nprint("Minimum :", mini)\nprint("Maximum :", maxi)\nprint("Au-dessus de 10 :", au_dessus)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Ton projet à toi",
          contenu: `
            <p>Dernier défi du parcours, entièrement libre. Écris un programme qui réunit
            <strong>au moins une fonction</strong>, <strong>une boucle</strong> et
            <strong>une instruction conditionnelle</strong>, et qui produit un affichage
            soigné.</p>
            <p>Des idées : une caisse de supermarché avec ticket et rendu de monnaie, un quiz
            noté avec appréciation finale, un convertisseur multi-unités, un générateur de
            grilles de sudoku vides, un calculateur de mensualités de prêt, un simulateur de
            trajectoire…</p>`,
          depart: `# Ton projet\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b", message: "Ton projet doit contenir au moins une fonction." },
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Il doit contenir au moins une boucle." },
              { motif: "\\bif\\b", message: "Il doit contenir au moins une instruction conditionnelle." },
              { motif: "\\bprint\\b", message: "Il doit afficher quelque chose." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n",
            sortieRegexMessage: "Ton projet doit produire au moins quatre lignes d'affichage.",
          },
          felicitation: "Parcours terminé. Tu programmes. 🏁🎓",
          indices: [
            "Commence par écrire ce que le programme doit <em>afficher</em> : le reste en découle.",
            "Une fonction par tâche : c'est ce qui rend un programme lisible.",
          ],
          solution: `def note_sur_20(bonnes, total):\n    return bonnes * 20 / total\n\ndef appreciation(note):\n    if note >= 16:\n        return "Excellent"\n    elif note >= 10:\n        return "Correct"\n    return "À revoir"\n\nprint("===== QUIZ =====")\nbonnes = 0\n\nfor question in range(1, 6):\n    print("Question", question, ": traitée")\n    if question % 2 == 1:\n        bonnes = bonnes + 1\n\nnote = note_sur_20(bonnes, 5)\nprint("-" * 16)\nprint("Bonnes réponses :", bonnes, "sur 5")\nprint("Note :", note)\nprint("Appréciation :", appreciation(note))\n`,
        },
      ],
    },
  ],
};

/* Séance 6 — La boucle non bornée while.
 * Fiche T7, seconde moitié. Prérequis : séance 5.
 * Porte trois algorithmes exigibles du programme de maths :
 *   seuil (ch. 3, première puissance dépassant une valeur),
 *   balayage (ch. 4, encadrement de racine de 2),
 *   dichotomie (ch. 14, en défi).
 */

export default {
  id: "s06",
  numero: 6,
  titre: "La boucle non bornée while",
  sousTitre: "Répéter jusqu'à ce que…",
  palier: "T7 — Boucle bornée et boucle non bornée",

  accroche: `Avec <code>for</code>, tu sais combien de tours tu vas faire. Mais
    « combien de fois faut-il doubler 1 € pour dépasser 1 000 € ? » — là, tu ne sais pas
    à l'avance. Il faut une boucle qui s'arrête <strong>quand quelque chose arrive</strong>.`,

  objectifs: [
    "écrire une boucle <code>while</code> et repérer ses trois ingrédients",
    "reconnaître et réparer une boucle infinie",
    "écrire un <strong>algorithme de seuil</strong>",
    "encadrer un nombre par <strong>balayage</strong>",
  ],

  motDeLaFin: `La fiche T7 est bouclée. Les deux boucles de Python n'ont plus de secret.
    À la séance 7, on range du code dans des boîtes réutilisables : les fonctions.`,

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
          titre: "Répéter tant que…",
          contenu: `
            <p>Scratch avait deux blocs de répétition : <strong>répéter 10 fois</strong>, et
            <strong>répéter jusqu'à ce que …</strong>. Python aussi :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Situation</th><th>Boucle</th></tr>
              <tr><td>je sais combien de tours</td><td><code>for</code></td></tr>
              <tr><td>je sais seulement <em>quand m'arrêter</em></td><td><code>while</code></td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>i = 1

while i &lt;= 5:
    print(i)
    i = i + 1</code></pre>

            <p>Ce programme affiche 1, 2, 3, 4, 5 — comme la boucle <code>for</code> de la
            séance précédente. Mais la mécanique est différente : à chaque tour, Python
            <strong>revérifie la condition</strong> avant de recommencer.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Attention au sens</span>
              <code>while</code> se traduit par « <strong>tant que</strong> », pas par
              « jusqu'à ». La boucle tourne <em>tant que la condition est vraie</em>, et
              s'arrête dès qu'elle devient fausse. C'est l'inverse du bloc Scratch !
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première boucle while",
          contenu: `
            <p>Écris une boucle <code>while</code> qui affiche les entiers de 1 à 5 :</p>
            <pre class="bloc-code"><code>1
2
3
4
5</code></pre>
            <p><code>for</code> est <strong>interdit</strong> : c'est <code>while</code>
            qu'on travaille.</p>`,
          depart: `i = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
            ],
            codeAbsent: [
              { motif: "\\bfor\\b", message: "Pour cet exercice, for est interdit." },
            ],
            sortie: "1\n2\n3\n4\n5",
          },
          felicitation: "Ta première boucle non bornée. 🔄",
          indices: [
            "<code>while i &lt;= 5:</code> — les deux-points comme toujours.",
            "Dans le corps : afficher <code>i</code>, <strong>puis</strong> l'augmenter de 1.",
            "Sans la ligne <code>i = i + 1</code>, la boucle ne s'arrêterait jamais.",
          ],
          solution: `i = 1\n\nwhile i <= 5:\n    print(i)\n    i = i + 1\n`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Les trois ingrédients",
          contenu: `
            <p>Toute boucle <code>while</code> correcte contient trois choses. Il en manque
            une, et la boucle tourne à l'infini.</p>

            <pre class="bloc-code"><code>i = 1              # 1. INITIALISATION : avant la boucle

while i &lt;= 5:       # 2. CONDITION D'ARRÊT
    print(i)
    i = i + 1      # 3. PROGRESSION : dans la boucle</code></pre>

            <ol>
              <li><strong>L'initialisation</strong> : la variable de contrôle doit exister
                <em>avant</em>, sinon Python ne peut pas évaluer la condition.</li>
              <li><strong>La condition</strong> : elle doit pouvoir devenir fausse un jour.</li>
              <li><strong>La progression</strong> : quelque chose, dans le corps, doit
                rapprocher de cette fin.</li>
            </ol>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La boucle infinie</span>
              Si tu oublies la progression, ton programme tourne sans fin. Dans ce parcours,
              il est arrêté au bout de quinze secondes avec un message d'avertissement —
              tu ne casseras rien. Sur un vrai ordinateur, il faudrait interrompre le
              programme à la main.
            </div>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Que fait ce programme ?",
          contenu: `<p>Lis-le attentivement <strong>avant</strong> de répondre. Il manque
            quelque chose.</p>`,
          code: `i = 1\n\nwhile i <= 3:\n    print("Tour", i)`,
          question: "Que se passe-t-il à l'exécution ?",
          options: [
            { texte: "Il affiche <code>Tour 1</code>, <code>Tour 2</code>, <code>Tour 3</code>",
              explication: "Ce serait le cas si <code>i</code> augmentait. Ici, rien ne le fait changer." },
            { texte: "Il n'affiche rien",
              explication: "Non : la condition est vraie au départ, donc le corps s'exécute au moins une fois." },
            { texte: "Il affiche <code>Tour 1</code> indéfiniment", correct: true,
              explication: "Oui. <code>i</code> vaut 1 pour toujours, la condition reste vraie, la boucle ne s'arrête jamais." },
            { texte: "Python signale une erreur",
              explication: "Non, et c'est bien le problème : le programme est syntaxiquement correct, il tourne simplement sans fin." },
          ],
          apres: `<span class="chapo">Le réflexe à prendre</span>
            Chaque fois que tu écris un <code>while</code>, pose-toi la question :
            « qu'est-ce qui, dans ce corps de boucle, va finir par rendre la condition
            fausse ? » Si tu ne sais pas répondre, la boucle est infinie.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "La saisie qu'on redemande",
          contenu: `
            <p>Premier usage typique de <code>while</code> : refuser une réponse invalide et
            redemander, autant de fois qu'il le faut.</p>
            <p>Demande une note sur 20. Tant qu'elle est hors de l'intervalle, affiche
            <code>Note invalide.</code> et redemande. Exemple :</p>
            <pre class="bloc-code"><code>Note sur 20 ? 25
Note invalide.
Note sur 20 ? 14
Note enregistrée : 14</code></pre>`,
          depart: `note = int(input("Note sur 20 ? "))\n\n`,
          saisiesTest: ["25", "14"],
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while pour redemander." },
              { motif: "input[\\s\\S]*input", message: "Il faut deux saisies : une avant la boucle, une dedans." },
            ],
            sortieRegex: "Note enregistrée : \\d+",
            sortieRegexMessage: "Ton programme doit finir par « Note enregistrée : » suivi de la note.",
          },
          felicitation: "Une saisie à l'épreuve des étourdis. 🛡️",
          indices: [
            "La condition d'invalidité : <code>note &lt; 0 or note > 20</code>.",
            "Dans la boucle : afficher le message d'erreur, <strong>puis redemander</strong>. C'est cette seconde saisie qui fait progresser.",
            "Le <code>print</code> final est en dehors de la boucle.",
          ],
          solution: `note = int(input("Note sur 20 ? "))\n\nwhile note < 0 or note > 20:\n    print("Note invalide.")\n    note = int(input("Note sur 20 ? "))\n\nprint("Note enregistrée :", note)\n`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "L'algorithme de seuil",
          contenu: `
            <p>Voici le motif que ton cours de mathématiques va te réclamer toute l'année.
            La question type : <em>à partir de quel rang une quantité dépasse-t-elle une
            valeur donnée ?</em></p>

            <p>Exemple : une population de 1 000 habitants augmente de 3 % par an. En combien
            d'années dépasse-t-elle 1 500 ?</p>

            <pre class="bloc-code"><code>population = 1000
annees = 0

while population &lt;= 1500:
    population = population * 1.03
    annees = annees + 1

print("Il faut", annees, "années.")</code></pre>

            <p>Le squelette est toujours le même :</p>
            <ol>
              <li>une variable pour <strong>la quantité</strong>, à sa valeur de départ ;</li>
              <li>une variable pour <strong>compter les étapes</strong>, à 0 ;</li>
              <li><code>while</code> quantité pas encore au seuil : faire évoluer la
                quantité <em>et</em> incrémenter le compteur.</li>
            </ol>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège du dernier tour</span>
              Après la boucle, la quantité a <strong>déjà dépassé</strong> le seuil : la
              boucle ne s'arrête qu'une fois la condition devenue fausse. C'est bien ce
              qu'on veut ici — mais il faut y penser.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "La première puissance de 2 qui dépasse 1000",
          contenu: `
            <p>Un algorithme <strong>exigible au programme de maths</strong> : trouver la
            première puissance d'un nombre qui dépasse une valeur donnée.</p>
            <p>Affiche exactement :</p>
            <pre class="bloc-code"><code>Exposant : 10
Puissance : 1024</code></pre>
            <p>Il te faut deux variables : la puissance, qui part de 1 et double à chaque
            tour, et l'exposant, qui compte les doublements.</p>`,
          depart: `puissance = 1\nexposant = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while : on ne sait pas d'avance combien de tours." },
            ],
            codeAbsent: [
              { motif: "1024", message: "La puissance doit être calculée par la boucle." },
            ],
            sortie: "Exposant : 10\nPuissance : 1024",
          },
          felicitation: "Chapitre 3 de maths, algorithme validé. 📈",
          indices: [
            "La condition : <code>while puissance &lt;= 1000:</code>.",
            "Dans la boucle : <code>puissance = puissance * 2</code> et <code>exposant = exposant + 1</code>.",
            "Les deux <code>print</code> viennent après la boucle, sans décalage.",
          ],
          solution: `puissance = 1\nexposant = 0\n\nwhile puissance <= 1000:\n    puissance = puissance * 2\n    exposant = exposant + 1\n\nprint("Exposant :", exposant)\nprint("Puissance :", puissance)\n`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le balayage",
          contenu: `
            <p>Second algorithme réclamé par le programme : <strong>encadrer</strong> un
            nombre qu'on ne sait pas calculer exactement — typiquement √2.</p>

            <p>L'idée du <em>balayage</em> : on avance à petits pas depuis 1, et on s'arrête
            dès qu'on a dépassé. La valeur cherchée est alors entre le dernier pas et
            celui-ci.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi on travaille en entiers</span>
              Avancer de 0,01 en 0,01 semble naturel, mais les nombres décimaux de
              l'ordinateur sont approchés : après cent additions, on obtiendrait
              <code>1.4200000000000017</code>. On compte donc en <strong>centièmes
              entiers</strong> : la variable va de 100 à 142, et on divise par 100 seulement
              à l'affichage.
            </div>

            <p>Le test « le carré dépasse-t-il 2 ? » devient alors, en centièmes :
            <code>n * n &lt;= 2 * 100 * 100</code>.</p>`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Encadrer racine de 2 au centième",
          contenu: `
            <p>Trouve par balayage un encadrement de √2 d'amplitude 0,01. Affiche
            exactement :</p>
            <pre class="bloc-code"><code>1.41 &lt; racine de 2 &lt; 1.42</code></pre>
            <p>La variable <code>n</code> compte en <strong>centièmes</strong> : elle part de
            100 (c'est-à-dire 1,00) et avance de 1 en 1. La boucle s'arrête dès que le carré
            dépasse 2.</p>`,
          depart: `n = 100\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le balayage s'écrit avec une boucle while." },
            ],
            codeAbsent: [
              { motif: "1\\.41|1\\.42|\\b142\\b", message: "L'encadrement doit être trouvé par la boucle, pas écrit." },
            ],
            sortie: "1.41 < racine de 2 < 1.42",
          },
          felicitation: "Chapitre 4 de maths, algorithme validé. 📐",
          indices: [
            "La condition : <code>while n * n &lt;= 2 * 100 * 100:</code>, et dans la boucle <code>n = n + 1</code>.",
            "À la sortie, <code>n</code> est le premier centième dont le carré dépasse 2 : la borne supérieure est <code>n / 100</code>.",
            "La borne inférieure est celle d'avant : <code>(n - 1) / 100</code>.",
          ],
          solution: `n = 100\n\nwhile n * n <= 2 * 100 * 100:\n    n = n + 1\n\nprint((n - 1) / 100, "< racine de 2 <", n / 100)\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Le squelette d'un while
variable = valeur_de_depart      # initialisation

while condition:                 # condition d'arrêt
    ...                          # le travail
    variable = ...               # progression, sinon boucle infinie</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Motif</th><th>Question type</th></tr>
              <tr><td><strong>seuil</strong></td><td>en combien d'étapes dépasse-t-on une valeur ?</td></tr>
              <tr><td><strong>balayage</strong></td><td>entre quelles valeurs se trouve le résultat ?</td></tr>
              <tr><td><strong>saisie validée</strong></td><td>redemander tant que la réponse est incorrecte</td></tr>
              <tr><td><strong>jeu</strong></td><td>rejouer tant que ce n'est pas trouvé</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">for ou while ?</span>
              Si tu peux dire à l'avance combien de tours il faut, prends <code>for</code>.
              Sinon, prends <code>while</code>. Tout <code>for</code> peut s'écrire avec
              <code>while</code>, mais l'inverse est faux.
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
          titre: "Le compte à rebours, version while",
          contenu: `
            <p>Reprends le décompte de la séance 5, mais avec <code>while</code> :</p>
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
            ],
            codeAbsent: [
              { motif: "\\bfor\\b", message: "for est interdit dans cette séance." },
            ],
            sortie: "5\n4\n3\n2\n1\nDécollage !",
          },
          indices: [
            "<code>while n >= 1:</code>",
            "La progression se fait vers le bas : <code>n = n - 1</code>.",
          ],
          solution: `n = 5\n\nwhile n >= 1:\n    print(n)\n    n = n - 1\n\nprint("Décollage !")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Combien de termes pour dépasser 100 ?",
          contenu: `
            <p>On additionne 1 + 2 + 3 + 4 + … jusqu'à dépasser 100. Affiche exactement :</p>
            <pre class="bloc-code"><code>Il faut 14 termes pour dépasser 100.
La somme vaut alors 105</code></pre>
            <p>Un algorithme de seuil, avec un accumulateur : deux variables évoluent
            ensemble.</p>`,
          depart: `somme = 0\nterme = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "On ne sait pas combien de termes : il faut un while." },
            ],
            codeAbsent: [
              { motif: "\\b105\\b|\\b14\\b", message: "Les deux résultats doivent être calculés." },
            ],
            sortie: "Il faut 14 termes pour dépasser 100.\nLa somme vaut alors 105",
          },
          indices: [
            "La condition : <code>while somme &lt;= 100:</code>.",
            "Dans la boucle : d'abord passer au terme suivant, puis l'ajouter à la somme.",
            "<code>terme = terme + 1</code> puis <code>somme = somme + terme</code>.",
          ],
          solution: `somme = 0\nterme = 0\n\nwhile somme <= 100:\n    terme = terme + 1\n    somme = somme + terme\n\nprint("Il faut", terme, "termes pour dépasser 100.")\nprint("La somme vaut alors", somme)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La division, à l'ancienne",
          contenu: `
            <p>Avant les opérateurs <code>//</code> et <code>%</code>, on divisait par
            <strong>soustractions successives</strong> : on retire le diviseur tant qu'on
            peut, en comptant combien de fois.</p>
            <p>Divise 47 par 5 de cette façon et affiche exactement :</p>
            <pre class="bloc-code"><code>47 = 5 x 9 + 2</code></pre>
            <p><code>//</code> et <code>%</code> sont <strong>interdits</strong> :
            c'est justement eux qu'on reconstruit.</p>`,
          depart: `dividende = 47\ndiviseur = 5\nquotient = 0\nreste = dividende\n\n`,
          validation: {
            codeAbsent: [
              { motif: "//|%", message: "// et % sont interdits : utilise des soustractions." },
            ],
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
            ],
            sortie: "47 = 5 x 9 + 2",
          },
          felicitation: "Tu viens de reconstruire la division euclidienne. ➗",
          indices: [
            "Tant que le reste est assez grand, on peut encore retirer le diviseur : <code>while reste >= diviseur:</code>.",
            "Dans la boucle : <code>reste = reste - diviseur</code> et <code>quotient = quotient + 1</code>.",
            "L'affichage : <code>print(dividende, \"=\", diviseur, \"x\", quotient, \"+\", reste)</code>.",
          ],
          solution: `dividende = 47\ndiviseur = 5\nquotient = 0\nreste = dividende\n\nwhile reste >= diviseur:\n    reste = reste - diviseur\n    quotient = quotient + 1\n\nprint(dividende, "=", diviseur, "x", quotient, "+", reste)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Le capital qui double",
          contenu: `
            <p>On place <strong>1 000 €</strong> à <strong>5 % par an</strong>. Au bout de
            combien d'années le capital a-t-il doublé ?</p>
            <pre class="bloc-code"><code>Il faut 15 années pour doubler.</code></pre>
            <p>Augmenter de 5 %, c'est multiplier par 1,05.</p>`,
          depart: `capital = 1000\nannees = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut un algorithme de seuil, donc un while." },
              { motif: "1\\.05|105", message: "Augmenter de 5 % revient à multiplier par 1.05." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "Le nombre d'années doit être compté par la boucle." },
            ],
            sortie: "Il faut 15 années pour doubler.",
          },
          felicitation: "Un vrai calcul financier, en cinq lignes. 💰",
          indices: [
            "Doubler, c'est atteindre 2000 : <code>while capital &lt; 2000:</code>.",
            "Dans la boucle : <code>capital = capital * 1.05</code> et <code>annees = annees + 1</code>.",
          ],
          solution: `capital = 1000\nannees = 0\n\nwhile capital < 2000:\n    capital = capital * 1.05\n    annees = annees + 1\n\nprint("Il faut", annees, "années pour doubler.")\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Combien de chiffres ?",
          contenu: `
            <p>Compte les chiffres de <code>48273</code> sans le transformer en texte :</p>
            <pre class="bloc-code"><code>48273 a 5 chiffres.</code></pre>
            <p>L'idée : diviser par 10 (division entière) retire un chiffre à chaque fois.
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
            "<code>while reste >= 10:</code>",
            "Dans la boucle : <code>reste = reste // 10</code> et <code>chiffres = chiffres + 1</code>.",
          ],
          solution: `nombre = 48273\nreste = nombre\nchiffres = 1\n\nwhile reste >= 10:\n    reste = reste // 10\n    chiffres = chiffres + 1\n\nprint(nombre, "a", chiffres, "chiffres.")\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs : la boucle sans fin",
          contenu: `
            <p>Ce programme devrait afficher les entiers de 1 à 5. Il contient
            <strong>deux erreurs</strong> — et l'une des deux fait qu'il ne s'arrête jamais.</p>
            <pre class="bloc-code"><code>1
2
3
4
5</code></pre>
            <div class="encadre" data-ton="attention">
              Exécute-le pour voir : au bout de quinze secondes, le parcours l'interrompt
              et t'explique pourquoi. C'est exactement le message que tu dois apprendre
              à reconnaître.
            </div>`,
          depart: `i = 1\n\nwhile i < 5:\n    print(i)\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Garde la boucle while." },
            ],
            sortie: "1\n2\n3\n4\n5",
          },
          felicitation: "Boucle infinie diagnostiquée et réparée. 🔧",
          indices: [
            "Premier bug : rien ne fait progresser <code>i</code> dans le corps de la boucle.",
            "Second bug : avec <code>i &lt; 5</code>, le 5 ne serait jamais affiché.",
          ],
          solution: `i = 1\n\nwhile i <= 5:\n    print(i)\n    i = i + 1\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Le nombre mystère, en entier",
          contenu: `
            <p>À la séance 4, tu n'avais droit qu'à un seul essai. Cette fois, on rejoue
            tant que ce n'est pas trouvé, et on compte les tentatives :</p>
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
            sortieRegex: "Bravo ! Trouvé en \\d+ essais\\.",
            sortieRegexMessage: "Ton programme doit finir par « Bravo ! Trouvé en … essais. »",
          },
          felicitation: "Ton premier jeu complet. 🎯",
          indices: [
            "Demande une première proposition <em>avant</em> la boucle, et initialise <code>essais</code> à 1.",
            "<code>while proposition != secret:</code>",
            "Dans la boucle : le <code>if</code> plus/moins, puis une nouvelle saisie, puis <code>essais = essais + 1</code>.",
          ],
          solution: `secret = 42\n\nproposition = int(input("Ta proposition ? "))\nessais = 1\n\nwhile proposition != secret:\n    if proposition < secret:\n        print("C'est plus !")\n    else:\n        print("C'est moins !")\n    proposition = int(input("Ta proposition ? "))\n    essais = essais + 1\n\nprint("Bravo ! Trouvé en", essais, "essais.")\n`,
        },

        {
          id: "a8",
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
            "Garde les valeurs de départ dans deux autres variables pour pouvoir les afficher à la fin.",
            "<code>while x != y:</code> avec, dedans, <code>if x > y: x = x - y</code> et sinon <code>y = y - x</code>.",
            "À la sortie, <code>x</code> et <code>y</code> sont égaux : c'est le PGCD.",
          ],
          solution: `a = 48\nb = 36\n\nx = a\ny = b\n\nwhile x != y:\n    if x > y:\n        x = x - y\n    else:\n        y = y - x\n\nprint("PGCD de", a, "et", b, ":", x)\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Renverser un nombre",
          contenu: `
            <p>Retourne <code>4728</code> pour obtenir <code>8274</code> :</p>
            <pre class="bloc-code"><code>4728 renversé donne 8274</code></pre>
            <p>La méthode : à chaque tour, on prend le dernier chiffre du nombre restant
            (avec <code>%</code>) et on l'ajoute au résultat en le décalant (× 10).</p>`,
          depart: `nombre = 4728\nreste = nombre\nenvers = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "%", message: "Le dernier chiffre s'obtient avec le reste %." },
              { motif: "//", message: "Retirer le dernier chiffre, c'est diviser par 10 en division entière." },
            ],
            codeAbsent: [
              { motif: "8274", message: "Le résultat doit être calculé." },
            ],
            sortie: "4728 renversé donne 8274",
          },
          felicitation: "Un algorithme classique, et pas si facile. 🔁",
          indices: [
            "<code>while reste > 0:</code>",
            "Dans la boucle : <code>envers = envers * 10 + reste % 10</code>.",
            "Puis <code>reste = reste // 10</code> pour passer au chiffre suivant.",
          ],
          solution: `nombre = 4728\nreste = nombre\nenvers = 0\n\nwhile reste > 0:\n    envers = envers * 10 + reste % 10\n    reste = reste // 10\n\nprint(nombre, "renversé donne", envers)\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le balayage au millième",
          contenu: `
            <p>Reprends l'encadrement de √2, mais cette fois d'amplitude
            <strong>0,001</strong> :</p>
            <pre class="bloc-code"><code>1.414 &lt; racine de 2 &lt; 1.415</code></pre>
            <p>Le principe est identique, seule l'unité change : <code>n</code> compte
            maintenant en <strong>millièmes</strong>.</p>`,
          depart: `n = 1000\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "1000", message: "Cette fois, on compte en millièmes." },
            ],
            codeAbsent: [
              { motif: "1\\.414|1\\.415", message: "L'encadrement doit être trouvé par la boucle." },
            ],
            sortie: "1.414 < racine de 2 < 1.415",
          },
          felicitation: "Trois décimales exactes de √2, obtenues sans calculatrice. 📏",
          indices: [
            "La condition devient <code>while n * n &lt;= 2 * 1000 * 1000:</code>.",
            "Les bornes s'obtiennent en divisant par 1000.",
          ],
          solution: `n = 1000\n\nwhile n * n <= 2 * 1000 * 1000:\n    n = n + 1\n\nprint((n - 1) / 1000, "< racine de 2 <", n / 1000)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "La dichotomie",
          contenu: `
            <p>Le balayage est lent : pour gagner une décimale, il faut dix fois plus de
            tours. La <strong>dichotomie</strong> fait mieux : à chaque étape, elle
            <strong>coupe l'intervalle en deux</strong> et garde la moitié qui contient la
            solution.</p>
            <p>On part de l'intervalle [1 ; 2], qui contient √2. Combien d'étapes faut-il
            pour que son amplitude descende en dessous de 0,001 ?</p>
            <pre class="bloc-code"><code>Il faut 10 etapes.</code></pre>
            <p><em>Cet algorithme est au programme de maths, chapitre 14.</em></p>`,
          depart: `a = 1\nb = 2\netapes = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "/\\s*2|\\*\\s*0\\.5", message: "La dichotomie calcule le milieu de l'intervalle." },
              { motif: "\\bif\\b", message: "Il faut choisir quelle moitié garder." },
            ],
            codeAbsent: [
              { motif: "\\b10\\b", message: "Le nombre d'étapes doit être compté." },
            ],
            sortie: "Il faut 10 etapes.",
          },
          felicitation: "Dix étapes au lieu de plusieurs centaines. La dichotomie est redoutable. ⚡",
          indices: [
            "La condition d'arrêt porte sur l'amplitude : <code>while b - a >= 0.001:</code>.",
            "Le milieu : <code>m = (a + b) / 2</code>. Si <code>m * m &lt; 2</code>, la racine est à droite, donc <code>a = m</code> ; sinon <code>b = m</code>.",
            "N'oublie pas <code>etapes = etapes + 1</code> à chaque tour.",
          ],
          solution: `a = 1\nb = 2\netapes = 0\n\nwhile b - a >= 0.001:\n    m = (a + b) / 2\n    if m * m < 2:\n        a = m\n    else:\n        b = m\n    etapes = etapes + 1\n\nprint("Il faut", etapes, "etapes.")\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "La suite de Syracuse",
          contenu: `
            <p>Une règle enfantine, un problème toujours ouvert en mathématiques. On part
            d'un entier, puis :</p>
            <ul>
              <li>s'il est pair, on le divise par 2 ;</li>
              <li>s'il est impair, on le multiplie par 3 et on ajoute 1.</li>
            </ul>
            <p>On conjecture qu'on finit <em>toujours</em> par tomber sur 1 — personne n'a
            su le démontrer. Pour 27, affiche exactement :</p>
            <pre class="bloc-code"><code>27 atteint 1 en 111 etapes.
Altitude maximale : 9232</code></pre>`,
          depart: `depart = 27\nn = depart\netapes = 0\nmaximum = depart\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "\\bif\\b", message: "Il faut distinguer les nombres pairs des impairs." },
            ],
            codeAbsent: [
              { motif: "\\b111\\b|9232", message: "Les deux résultats doivent être calculés." },
            ],
            sortie: "27 atteint 1 en 111 etapes.\nAltitude maximale : 9232",
          },
          felicitation: "111 étapes et un pic à 9232, pour un départ à 27. Vertigineux. 🎢",
          indices: [
            "<code>while n != 1:</code> — on s'arrête en arrivant à 1.",
            "Dans la boucle : <code>if n % 2 == 0: n = n // 2</code> sinon <code>n = 3 * n + 1</code>.",
            "Pour l'altitude maximale, garde un champion : <code>if n > maximum: maximum = n</code>.",
          ],
          solution: `depart = 27\nn = depart\netapes = 0\nmaximum = depart\n\nwhile n != 1:\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        n = 3 * n + 1\n    etapes = etapes + 1\n    if n > maximum:\n        maximum = n\n\nprint(depart, "atteint 1 en", etapes, "etapes.")\nprint("Altitude maximale :", maximum)\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Euclide, version rapide",
          contenu: `
            <p>Le PGCD par soustractions est lent quand les nombres sont très différents :
            pour 1 000 000 et 3, il faut plus de trois cent mille tours. Euclide a mieux :
            <strong>on remplace le plus grand par le reste de la division</strong>.</p>
            <p>Avec 1071 et 462, affiche exactement :</p>
            <pre class="bloc-code"><code>PGCD = 21
Nombre d'etapes : 3</code></pre>`,
          depart: `a = 1071\nb = 462\netapes = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "%", message: "La version rapide utilise le reste %." },
            ],
            codeAbsent: [
              { motif: "\\b21\\b", message: "Le PGCD doit être calculé." },
            ],
            sortie: "PGCD = 21\nNombre d'etapes : 3",
          },
          felicitation: "Trois étapes là où les soustractions en demandaient des dizaines. ⚡",
          indices: [
            "La boucle tourne tant que le reste n'est pas nul : <code>while b != 0:</code>.",
            "Dans la boucle : <code>a, b = b, a % b</code> — l'affectation multiple de la séance 2 évite une variable temporaire.",
            "À la sortie, le PGCD est dans <code>a</code>.",
          ],
          solution: `a = 1071\nb = 462\netapes = 0\n\nwhile b != 0:\n    a, b = b, a % b\n    etapes = etapes + 1\n\nprint("PGCD =", a)\nprint("Nombre d'etapes :", etapes)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "La première puissance de 3 à six chiffres",
          contenu: `
            <p>Même motif que le seuil de la découverte, mais avec une condition portant sur
            le <strong>nombre de chiffres</strong>. Trouve la première puissance de 3 qui
            atteint six chiffres :</p>
            <pre class="bloc-code"><code>Exposant : 11
Valeur : 177147</code></pre>
            <p>Un nombre a six chiffres à partir de 100 000.</p>`,
          depart: `puissance = 1\nexposant = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "\\*\\s*3|3\\s*\\*", message: "À chaque tour, la puissance est multipliée par 3." },
            ],
            codeAbsent: [
              { motif: "177147", message: "La valeur doit être calculée." },
            ],
            sortie: "Exposant : 11\nValeur : 177147",
          },
          felicitation: "Le motif du seuil, réutilisé sans hésiter. 📈",
          indices: [
            "<code>while puissance &lt; 100000:</code>",
            "Dans la boucle : multiplier par 3 et incrémenter l'exposant.",
          ],
          solution: `puissance = 1\nexposant = 0\n\nwhile puissance < 100000:\n    puissance = puissance * 3\n    exposant = exposant + 1\n\nprint("Exposant :", exposant)\nprint("Valeur :", puissance)\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton algorithme de seuil",
          contenu: `
            <p>Défi libre. Écris un programme qui utilise une boucle <code>while</code> pour
            répondre à une question de type « <strong>au bout de combien de temps…</strong> ».</p>
            <p>Des idées : au bout de combien d'années une population qui baisse de 2 % par an
            passe-t-elle sous la moitié ? combien de fois faut-il plier une feuille de
            0,1 mm pour dépasser la hauteur de la tour Eiffel ? combien de termes de la suite
            des inverses faut-il additionner pour dépasser 3 ?</p>`,
          depart: `# Ton algorithme de seuil\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Ton programme doit contenir une boucle while." },
              { motif: "^\\s*\\w+\\s*=\\s*[\\s\\S]*\\n[\\s\\S]*\\n\\s+\\w+\\s*=[^=]", options: "m",
                message: "Il faut une variable initialisée avant la boucle et modifiée dedans." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 6 terminée, fiche T7 bouclée. Les deux boucles sont à toi. 🏁",
          indices: [
            "Structure : une quantité, un compteur, une boucle qui fait évoluer les deux.",
            "Exemple de la feuille pliée : <code>epaisseur = 0.1</code> en millimètres, la tour Eiffel fait 330 000 mm.",
          ],
          solution: `epaisseur = 0.1\npliages = 0\n\nwhile epaisseur < 330000:\n    epaisseur = epaisseur * 2\n    pliages = pliages + 1\n\nprint("Il faut", pliages, "pliages pour dépasser la tour Eiffel.")\n`,
        },
      ],
    },
  ],
};

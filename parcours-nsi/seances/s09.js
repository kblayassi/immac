/* NSI — chapitre 1, séance 9 : la boucle bornée.
 * Reprend la section « La boucle for avec range() » du cours et les exercices
 * 22 à 30. L'exercice 27, prévu sur papier, devient un exercice de code.
 */

export default {
  id: "s09",
  numero: 9,
  titre: "La boucle bornée : for et range()",
  sousTitre: "Répéter un nombre connu de fois",
  palier: "Partie 3 — Répéter des instructions",

  accroche: `Quand on sait à l'avance combien de tours il faut, <code>while</code> devient
    inutilement bavard. La boucle <code>for</code> dit la même chose en une ligne — à
    condition de maîtriser <code>range()</code>, qui réserve quelques pièges.`,

  objectifs: [
    "écrire une boucle <code>for</code> avec <code>range()</code>",
    "maîtriser les <strong>trois formes</strong> de <code>range</code>",
    "utiliser la variable de boucle dans le corps de la boucle",
    "accumuler un résultat : somme, produit, compteur",
  ],

  motDeLaFin: `Les deux boucles de Python sont à toi. À la séance 10, on les imbrique
    et on apprend à en sortir plus tôt.`,

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
          titre: "La boucle bornée",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définition : boucle bornée</span>
              Contrairement à <code>while</code>, il faut connaître à l'avance le nombre de
              passages : on parle de boucle <strong>bornée</strong>.
            </div>

            <pre class="bloc-code"><code>for variable_de_boucle in range(...):
    instructions</code></pre>

            <p>La <strong>variable de boucle</strong> n'existe que le temps de la boucle.
            On la note souvent <code>i</code>, parfois <code>loop</code>, et
            <code>_</code> quand on ne s'en sert pas.</p>

            <p><code>range()</code> s'utilise avec 1, 2 ou 3 arguments :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Écriture</th><th>Valeurs prises</th><th>Nombre de tours</th></tr>
              <tr><td><code>range(n)</code></td><td>de 0 à n − 1</td><td>n</td></tr>
              <tr><td><code>range(a, b)</code></td><td>de a à b − 1</td><td>b − a</td></tr>
              <tr><td><code>range(a, b, p)</code></td><td>de a à b − 1, de p en p</td><td>—</td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>for loop in range(30):     # 30 fois
    print("Coucou !")

for i in range(101):       # les nombres de 0 à 100
    print(i)

for i in range(100, 1001, 2):   # les nombres pairs de 100 à 1000
    print(i)

for _ in range(100):       # 100 fois, sans se servir du compteur
    print("Je ne triche pas en DS.")</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La borne de droite est toujours exclue</span>
              Pour parcourir les entiers <strong>de 1 à 10 inclus</strong>, il faut écrire
              <code>range(1, 11)</code>. C'est l'erreur la plus fréquente avec les boucles.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Exercice 22 — Premiers for",
          contenu: `
            <p>Écris un programme qui affiche <strong>7 fois</strong> la phrase
            <code>Je dois respecter le Grand Sorcier.</code></p>
            <p>⚠️ Ton programme ne doit pas faire plus de <strong>2 lignes</strong>.</p>`,
          depart: `# Deux lignes maximum !\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle for." },
              { motif: "range\\s*\\(", message: "La boucle bornée s'écrit avec range()." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print : c'est la boucle qui répète." },
            ],
            sortie: "Je dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.\nJe dois respecter le Grand Sorcier.",
          },
          felicitation: "Sept affichages, deux lignes de code. 🔁",
          indices: [
            "La variable de boucle ne sert à rien ici : tu peux l'appeler <code>i</code> ou <code>_</code>.",
            "Avec un seul argument, <code>range</code> compte à partir de 0 : <code>range(7)</code> donne bien sept tours.",
          ],
        },

        {
          id: "d3",
          type: "code",
          titre: "Exercice 22 (suite) — Deux erreurs à corriger",
          contenu: `
            <p>Teste ce script, puis corrige la ou les erreurs pour que la phrase s'affiche
            <strong>10 fois</strong>.</p>`,
          depart: `for i in range(10)\nprint("J'ai tout compris 😊 !")\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Garde la boucle." },
            ],
            sortie: "J'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !\nJ'ai tout compris 😊 !",
          },
          felicitation: "Deux-points et indentation : les deux fautes de toute boucle. 🐞",
          indices: [
            "Deux erreurs se cachent dans ces deux lignes : l'une concerne un caractère manquant en fin de première ligne.",
            "L'autre concerne l'<strong>indentation</strong>. Sans elle, comment Python saurait-il quelles instructions répéter ?",
          ],
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Exercice 24 — Les trois visages de range()",
          contenu: `<p>Trois boucles, trois écritures de <code>range</code>.</p>`,
          code: `for i in range(10):\n    print(i)\n\nfor i in range(1, 10):\n    print(i)\n\nfor i in range(5, 55, 5):\n    print(i)`,
          question: "Combien de tours effectue chacune des trois boucles ?",
          options: [
            { texte: "10, 10 et 11",
              explication: "La deuxième perd un tour en démarrant à 1 : la borne de droite reste 10, exclue." },
            { texte: "10, 9 et 10", correct: true,
              explication: "Oui : 0→9 (10 tours), 1→9 (9 tours), et 5, 10, …, 50 (10 tours, car 55 est exclu)." },
            { texte: "9, 9 et 11",
              explication: "<code>range(10)</code> produit bien dix valeurs, de 0 à 9." },
            { texte: "10, 10 et 10",
              explication: "Attention : passer de <code>range(10)</code> à <code>range(1, 10)</code> fait perdre un tour." },
          ],
          apres: `<span class="chapo">Trois règles à retenir</span>
            Avec <strong>un</strong> argument, on part toujours de 0 · la valeur de fin est
            <strong>toujours exclue</strong> — c'est pourquoi <code>range(5, 55, 5)</code>
            s'arrête à 50 · avec <strong>trois</strong> arguments, le dernier est le
            <strong>pas</strong>.
            <br><br>
            ⚠️ Piège classique : pour conserver 10 tours en démarrant à 1, il faut écrire
            <code>range(1, 11)</code>.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Exercice 23 — Bob et les fraises",
          contenu: `
            <p>Bob découvre un fraisier. Il cueille une fraise et la mange. Y prenant goût,
            il y retourne et en prend 2, puis 3 — et ainsi de suite jusqu'à 10.</p>
            <p>Teste le programme. Quel est le problème ? Corrige-le pour que Bob mange bien
            1, puis 2, puis 3 fraises… jusqu'à 10.</p>
            <pre class="bloc-code"><code>Bob mange 1 fraises
Bob mange 2 fraises
...
Bob mange 10 fraises</code></pre>`,
          depart: `# On définit une variable nombre qu'on initialise à 0 :\nnombre = 0\n\n# Bob répète ses cueillettes :\nfor i in range(10) :\n    print("Bob mange", nombre, "fraises")\n    nombre = nombre + 1   # à chaque cueillette, il en mange une de plus\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Garde la boucle." },
            ],
            sortie: "Bob mange 1 fraises\nBob mange 2 fraises\nBob mange 3 fraises\nBob mange 4 fraises\nBob mange 5 fraises\nBob mange 6 fraises\nBob mange 7 fraises\nBob mange 8 fraises\nBob mange 9 fraises\nBob mange 10 fraises",
          },
          felicitation: "Le décalage d'un cran : l'erreur la plus fréquente des accumulateurs. 🍓",
          indices: [
            "Exécute d'abord : à la première cueillette, combien de fraises Bob mange-t-il ?",
            "Et à la dernière ? Le compte est décalé d'un cran du début à la fin.",
            "Deux corrections possibles : changer la valeur de départ, ou incrémenter <strong>avant</strong> d'afficher.",
          ],
        },

        {
          id: "d6",
          type: "code",
          titre: "Exercice 23 (suite) — La variable était inutile",
          contenu: `
            <p>En réalité, la variable <code>nombre</code> ne servait à rien : la variable de
            boucle <code>i</code> suffit !</p>
            <p>Exécute cette seconde version et compare les affichages. Rien à écrire.</p>`,
          depart: `for i in range(10) :\n    print("Bob mange", i + 1, "fraises")\n`,
          validation: {
            sortie: "Bob mange 1 fraises\nBob mange 2 fraises\nBob mange 3 fraises\nBob mange 4 fraises\nBob mange 5 fraises\nBob mange 6 fraises\nBob mange 7 fraises\nBob mange 8 fraises\nBob mange 9 fraises\nBob mange 10 fraises",
          },
          felicitation: "Une variable de moins, un programme plus clair. ✂️",
          apres: `<p>La variable de boucle prend les valeurs 0 à 9 ; <code>i + 1</code> donne
            donc 1 à 10. Chaque fois que tu es tenté d'ajouter un compteur à côté d'une boucle
            <code>for</code>, demande-toi d'abord si <code>i</code> ne suffirait pas.</p>`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Accumuler dans une variable",
          contenu: `
            <p>Le geste le plus important de la séance. On veut la somme 1 + 2 + 3 + 4 + 5 :</p>

            <pre class="bloc-code"><code>somme = 0                # 1. AVANT la boucle

for i in range(1, 6):
    somme = somme + i    # 2. on fait grandir

print(somme)             # 3. APRÈS la boucle → 15</code></pre>

            <p>On appelle <code>somme</code> un <strong>accumulateur</strong>. Le même geste
            sert à trois choses :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>Valeur de départ</th><th>Dans la boucle</th></tr>
              <tr><td>une somme</td><td><code>0</code></td><td><code>s = s + i</code></td></tr>
              <tr><td>un produit</td><td><code>1</code></td><td><code>p = p * i</code></td></tr>
              <tr><td>un compteur</td><td><code>0</code></td><td><code>c = c + 1</code>, dans un <code>if</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi 1 pour un produit ?</span>
              Parce que multiplier par 0 donnerait… 0 ! L'initialisation doit être
              l'<strong>élément neutre</strong> de l'opération : 0 pour une somme, 1 pour
              un produit.
            </div>`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Exercice 28 — Dérouler une boucle",
          contenu: `<p>Sans exécuter, déroule ce programme tour par tour.</p>`,
          code: `somme = 0\n\nfor i in range(1, 6):\n    somme = somme + i\n\nprint(somme)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>5</code>", explication: "Ce serait la dernière valeur de i, pas la somme accumulée." },
            { texte: "<code>15</code>", correct: true,
              explication: "Oui : 1, puis 3, puis 6, puis 10, puis 15. C'est la somme des entiers de 1 à 5." },
            { texte: "<code>21</code>", explication: "Ce serait la somme jusqu'à 6 : mais la borne de droite est exclue." },
            { texte: "les cinq totaux intermédiaires",
              explication: "Le <code>print</code> est <strong>après</strong> la boucle : il ne s'exécute qu'une fois." },
          ],
          apres: `<span class="chapo">Le déroulé, tour par tour</span>
            1<sup>er</sup> passage : 0 + 1 = 1 · 2<sup>e</sup> : 1 + 2 = 3 ·
            3<sup>e</sup> : 3 + 3 = 6 · 4<sup>e</sup> : 6 + 4 = 10 · 5<sup>e</sup> : 10 + 5 = 15.
            <br><br>Cette méthode — dérouler à la main sur un papier — est le meilleur outil
            pour comprendre une boucle qui ne fait pas ce qu'on croit.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Exercice 29 — Accumuler dans une variable",
          contenu: `
            <p>Complète le programme pour qu'à la fin :</p>
            <ol>
              <li><code>somme</code> contienne la somme des entiers de 1 à 100 inclus ;</li>
              <li><code>produit</code> contienne le produit des entiers de 1 à 10 inclus ;</li>
              <li><code>somme_carres</code> contienne la somme des carrés des entiers
                de 1 à 5 inclus.</li>
            </ol>
            <p>Aucun affichage n'est demandé : la validation vérifie le contenu des
            variables.</p>`,
          depart: `# 1. somme des entiers de 1 à 100\nsomme = 0\n\n\n# 2. produit des entiers de 1 à 10\nproduit = 1\n\n\n# 3. somme des carrés des entiers de 1 à 5\nsomme_carres = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*for[\\s\\S]*for", message: "Trois accumulations, donc trois boucles." },
            ],
            codeAbsent: [
              { motif: "5050|3628800", message: "Les résultats doivent être calculés par les boucles." },
            ],
            tests: `assert somme == 5050, "la somme des entiers de 1 à 100 vaut 5050"\nassert produit == 3628800, "le produit des entiers de 1 à 10 vaut 3628800"\nassert somme_carres == 55, "la somme des carrés de 1 à 5 vaut 55"`,
          },
          felicitation: "Somme, produit, somme de carrés : les trois accumulateurs. 🧮",
          indices: [
            "Chaque accumulation suit le même schéma : la variable est déjà initialisée, il ne reste que la boucle.",
            "Attention aux bornes : « de 1 à 100 inclus » s'écrit <code>range(1, 101)</code>.",
            "Le carré d'un nombre s'écrit <code>i ** 2</code>.",
          ],
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Répéter n fois
for i in range(n):
    ...

# Parcourir de a à b INCLUS
for i in range(a, b + 1):
    ...

# Accumuler
resultat = 0                    # avant
for i in range(...):
    resultat = resultat + i     # pendant
print(resultat)                 # après</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">for ou while ?</span>
              Si tu peux dire à l'avance combien de tours il faut, prends <code>for</code>.
              Sinon, prends <code>while</code>. Tout <code>for</code> peut s'écrire avec
              <code>while</code>, mais l'inverse est faux.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le doute sur l'indentation</span>
              Une seule question : « cette ligne doit-elle s'exécuter <strong>à chaque
              tour</strong> ? » Si oui, elle est décalée. Si non, elle est en dehors.
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
          titre: "Exercice 25 — Compter jusqu'à 50",
          contenu: `
            <p>Écris un programme qui affiche exactement :</p>
            <pre class="bloc-code"><code>i = 0
i = 1
i = 2
...
i = 49
i = 50</code></pre>
            <p>Attention à la dernière valeur : elle doit bien apparaître.</p>`,
          depart: `# Affiche i = 0, i = 1, … jusqu'à i = 50\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle for." },
            ],
            sortie: "i = 0\ni = 1\ni = 2\ni = 3\ni = 4\ni = 5\ni = 6\ni = 7\ni = 8\ni = 9\ni = 10\ni = 11\ni = 12\ni = 13\ni = 14\ni = 15\ni = 16\ni = 17\ni = 18\ni = 19\ni = 20\ni = 21\ni = 22\ni = 23\ni = 24\ni = 25\ni = 26\ni = 27\ni = 28\ni = 29\ni = 30\ni = 31\ni = 32\ni = 33\ni = 34\ni = 35\ni = 36\ni = 37\ni = 38\ni = 39\ni = 40\ni = 41\ni = 42\ni = 43\ni = 44\ni = 45\ni = 46\ni = 47\ni = 48\ni = 49\ni = 50",
          },
          indices: [
            "Cinquante et une valeurs : de 0 à 50 inclus.",
            "La borne de droite est exclue : à toi d'en tenir compte.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Exercice 26 — Le même affichage, un argument",
          contenu: `
            <p>Affiche cette suite avec une boucle <code>for i in range(...)</code> à
            <strong>un seul</strong> argument :</p>
            <pre class="bloc-code"><code>3
6
9
12
15
18</code></pre>
            <p>💡 Ici, <code>i</code> ne prend pas les valeurs affichées : c'est le
            <code>print()</code> qui doit faire le calcul.</p>`,
          depart: `# Affiche 3, 6, 9, 12, 15 puis 18.\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*\\d+\\s*\\)", message: "range doit n'avoir qu'un seul argument." },
            ],
            sortie: "3\n6\n9\n12\n15\n18",
          },
          indices: [
            "Six valeurs à afficher : <code>range(6)</code> donne i = 0, 1, 2, 3, 4, 5.",
            "Il reste à transformer ces six valeurs en 3, 6, 9, 12, 15, 18 par un calcul.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Exercice 26 (suite) — Deux, puis trois arguments",
          contenu: `
            <p>Le même affichage, deux fois de plus : d'abord avec une boucle à
            <strong>deux</strong> arguments, puis avec une boucle à
            <strong>trois</strong> arguments. Douze lignes en tout.</p>
            <pre class="bloc-code"><code>3
6
9
12
15
18
3
6
9
12
15
18</code></pre>
            <p>Dans la version à trois arguments, <code>i</code> prend directement les
            valeurs affichées.</p>`,
          depart: `# Version à deux arguments\n\n\n# Version à trois arguments\n\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*\\)", message: "Il faut une boucle à deux arguments." },
              { motif: "range\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*\\)", message: "Il faut aussi une boucle à trois arguments." },
            ],
            sortie: "3\n6\n9\n12\n15\n18\n3\n6\n9\n12\n15\n18",
          },
          felicitation: "Trois écritures, un seul résultat. Tu maîtrises range(). 🎯",
          indices: [
            "Version à deux arguments : fais prendre à <code>i</code> les valeurs 1 à 6, puis multiplie.",
            "Version à trois arguments : le pas est 3, et il faut s'arrêter après 18 — donc avant 19 ou plus.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Exercice 27 — Quatre boucles à écrire",
          contenu: `
            <p>Cet exercice se faisait sur le papier ; ici, tu l'écris directement.
            Quatre boucles, dans cet ordre :</p>
            <ol>
              <li>les carrés des entiers de 1 à 10 inclus ;</li>
              <li>les multiples de 5 de 5 à 100 inclus.</li>
            </ol>
            <pre class="bloc-code"><code>1
4
9
...
100
5
10
15
...
100</code></pre>`,
          depart: `# 1. Les carrés des entiers de 1 à 10\n\n\n# 2. Les multiples de 5 de 5 à 100\n\n`,
          validation: {
            codeContient: [
              { motif: "for[\\s\\S]*for", message: "Deux boucles sont attendues." },
            ],
            sortie: "1\n4\n9\n16\n25\n36\n49\n64\n81\n100\n5\n10\n15\n20\n25\n30\n35\n40\n45\n50\n55\n60\n65\n70\n75\n80\n85\n90\n95\n100",
          },
          indices: [
            "Pour les carrés, la variable de boucle va de 1 à 10 : c'est le <code>print</code> qui élève au carré.",
            "Pour les multiples de 5, le pas de <code>range</code> fait tout le travail — sans oublier que 100 doit apparaître.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Exercice 30 — Le triangle de dièses",
          contenu: `
            <p>Écris un programme qui affiche 20 lignes, la <em>n</em>-ième contenant
            <em>n</em> symboles <code>#</code> :</p>
            <pre class="bloc-code sans-copie"><code>#
##
###
####
#####
...
####################</code></pre>
            <div class="encadre" data-ton="astuce">
              Teste d'abord ces trois instructions : <code>print("#" + "#")</code>,
              <code>print(3 * "#")</code>, <code>print(1 * "#")</code>.
            </div>`,
          depart: `# Rappel : 3 * "#" vaut "###"\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "#{3,}", message: "Ne tape pas les dièses à la main : fais-les répéter." },
            ],
            sortie: "#\n##\n###\n####\n#####\n######\n#######\n########\n#########\n##########\n###########\n############\n#############\n##############\n###############\n################\n#################\n##################\n###################\n####################",
          },
          felicitation: "Répétition de texte dans une boucle : le duo gagnant. 🔺",
          indices: [
            "À la ligne numéro <code>i</code>, il y a exactement <code>i</code> dièses.",
            "La variable de boucle doit donc aller de 1 à 20 inclus.",
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
          titre: "La table de multiplication",
          contenu: `
            <p>Affiche la table de 7, de 1 à 10, avec un <strong>seul</strong>
            <code>print</code> :</p>
            <pre class="bloc-code"><code>7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70</code></pre>`,
          depart: `table = 7\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "\\btable\\b[\\s\\S]*\\btable\\b", message: "Sers-toi de la variable table : change-la, et tout doit suivre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print." },
            ],
            sortie: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
          },
          indices: [
            "Le <code>print</code> reçoit quatre morceaux séparés par des virgules.",
            "Change ensuite <code>table</code> en 9 pour vérifier que tout suit — puis remets 7.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Compter sous condition",
          contenu: `
            <p>Un accumulateur peut aussi être un <strong>compteur</strong> : au lieu
            d'ajouter la valeur, on ajoute 1 — mais seulement quand une condition est vraie.</p>
            <p>Compte les multiples de 7 entre 1 et 100, et affiche exactement :</p>
            <pre class="bloc-code"><code>Il y a 14 multiples de 7 entre 1 et 100.</code></pre>`,
          depart: `compteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut parcourir les nombres." },
              { motif: "\\bif\\b", message: "Il faut tester chaque nombre." },
              { motif: "%", message: "La divisibilité se teste avec le reste." },
            ],
            codeAbsent: [
              { motif: "\\b14\\b", message: "Le résultat doit être compté par le programme." },
            ],
            sortie: "Il y a 14 multiples de 7 entre 1 et 100.",
          },
          felicitation: "Boucle, test et compteur assemblés : le trio complet. 🔢",
          indices: [
            "Trois niveaux d'indentation : la boucle à 0, le test à 4, l'incrément à 8.",
            "Le <code>print</code> final est en dehors de la boucle.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "La suite de Fibonacci",
          contenu: `
            <p>Chaque terme est la somme des deux précédents ; les deux premiers valent 1.
            Affiche les dix premiers, un par ligne :</p>
            <pre class="bloc-code"><code>1
1
2
3
5
8
13
21
34
55</code></pre>
            <p>Il te faut <strong>deux</strong> variables qui avancent ensemble.</p>`,
          depart: `a = 1\nb = 1\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
            ],
            codeAbsent: [
              { motif: "\\b55\\b", message: "Les termes doivent être calculés." },
            ],
            sortie: "1\n1\n2\n3\n5\n8\n13\n21\n34\n55",
          },
          felicitation: "Une suite née en 1202, qui tourne dans ton navigateur. 🐚",
          indices: [
            "À chaque tour : afficher le premier terme, puis faire avancer les deux variables.",
            "Le nouveau <code>a</code> est l'ancien <code>b</code> ; le nouveau <code>b</code> est leur somme.",
            "Sans l'affectation multiple <code>a, b = …, …</code>, l'ordre des lignes casserait tout.",
          ],
        },

        {
          id: "x4",
          type: "code",
          titre: "Ton programme répétitif",
          contenu: `
            <p>Défi libre. Écris un programme contenant <strong>une boucle
            <code>for</code></strong> et <strong>un accumulateur</strong> (somme, produit ou
            compteur), et qui affiche un résultat final calculé.</p>
            <p>Des idées : la somme des cubes des vingt premiers entiers, un tableau de
            conversion de températures de 0 à 100 de 10 en 10, le total d'un placement à
            intérêts sur dix ans, le nombre de nombres à trois chiffres divisibles par 13…</p>`,
          depart: `# Ton programme\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Ton programme doit contenir une boucle for." },
              { motif: "^\\s*\\w+\\s*=\\s*[\\s\\S]*\\n[\\s\\S]*\\n\\s+\\w+\\s*=[^=]", options: "m",
                message: "Il faut un accumulateur : une variable initialisée avant la boucle et modifiée dedans." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 9 terminée. La répétition n'a plus de secret. 🏁",
          indices: [
            "Structure : initialisation, boucle qui fait grandir, affichage final.",
            "Exemple : <code>somme = 0</code>, puis <code>for i in range(1, 21): somme = somme + i ** 3</code>.",
          ],
        },
      ],
    },
  ],
};

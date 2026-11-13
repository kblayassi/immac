/* NSI — chapitre 4, séance 1 : créer une liste et lire ses éléments.
 * Reprend l'introduction du chapitre et les sections « Créer une liste » et
 * « Indexation des éléments » du cours, ainsi que l'exercice 1.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Créer une liste et lire ses éléments",
  sousTitre: "Ranger plusieurs valeurs dans une seule variable",
  palier: "Partie 1 — Les listes",

  accroche: `Jusqu'ici, une variable ne contenait qu'<strong>une seule</strong> valeur.
    Mais comment ranger les 25 notes d'une classe, les jours de la semaine ou les
    joueurs d'une équipe ? Avec une <strong>liste</strong> : une seule variable, et
    toutes les valeurs rangées dedans, chacune à sa place.`,

  objectifs: [
    "créer une liste avec des <strong>crochets</strong>",
    "lire un élément grâce à son <strong>indice</strong>, qui commence à 0",
    "connaître la longueur d'une liste avec <code>len()</code>",
    "utiliser les <strong>indices négatifs</strong> pour partir de la fin",
  ],

  motDeLaFin: `Tu sais créer une liste et lire n'importe laquelle de ses cases. À la
    séance 2, on la modifie : changer une valeur, en ajouter une, et laisser Python
    calculer la somme, le minimum ou le maximum.`,

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
          titre: "Plusieurs valeurs dans une seule variable",
          contenu: `
            <p>Pour ranger les quatre notes de Quentin, on pourrait créer quatre
            variables : <code>note1</code>, <code>note2</code>, <code>note3</code>,
            <code>note4</code>. Avec 25 élèves et dix notes chacun, ce serait intenable.</p>

            <p>Python propose mieux : une <strong>liste</strong>. Les valeurs s'écrivent
            entre <strong>crochets</strong>, séparées par des virgules.</p>

            <pre class="bloc-code"><code>notes = [12, 15, 8, 18]
couleurs = ["rouge", "vert", "bleu"]
vide = []                # une liste qui ne contient rien, pour l'instant</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : tableau (liste)</span>
              Un <strong>tableau</strong> — une <em>liste</em> en Python — est une collection
              <strong>ordonnée</strong> et <strong>indexée</strong> d'éléments : chacun a
              sa place, et on peut le retrouver par sa position. Son type est
              <code>list</code>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Restriction du programme</span>
              Python accepte de mélanger les types dans une liste
              (<code>[12, "rouge", True]</code>). En NSI, on ne le fait pas : une liste
              contient toujours des éléments <strong>du même type</strong>.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première liste",
          contenu: `
            <p>Crée la liste <code>notes</code> qui contient, dans cet ordre, les notes
            12, 15, 8 et 18, puis affiche-la. La console doit montrer :</p>
            <pre class="bloc-code"><code>[12, 15, 8, 18]</code></pre>`,
          depart: `notes = \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bprint\\s*\\(\\s*notes\\s*\\)", message: "Affiche la liste en passant la variable notes à print." },
            ],
            sortie: "[12, 15, 8, 18]",
            tests: `assert notes == [12, 15, 8, 18], "notes doit contenir 12, 15, 8 et 18, dans cet ordre"`,
          },
          felicitation: "Une seule variable, quatre valeurs rangées dans l'ordre. 📚",
          indices: [
            "Les valeurs s'écrivent entre crochets <code>[ ]</code>, séparées par des virgules.",
            "Sur la deuxième ligne, un <code>print</code> qui reçoit la variable <code>notes</code>.",
          ],
          solution: `notes = [12, 15, 8, 18]\nprint(notes)\n`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Reconnaître une liste",
          contenu: `<p>Voici cinq variables. Elles se ressemblent, mais elles ne sont pas
            toutes des listes.</p>`,
          code: `a = (1, 2, 3)\nb = [1, 2, 3]\nc = []\nd = "1, 2, 3"\ne = [4]`,
          question: "Lesquelles sont des listes ?",
          options: [
            { texte: "<code>a</code>, <code>b</code> et <code>d</code>",
              explication: "<code>a</code> utilise des parenthèses et <code>d</code> est entre guillemets : aucun des deux n'a de crochets." },
            { texte: "<code>b</code> seulement",
              explication: "<code>b</code> en est une, mais pas la seule : regarde bien les crochets de <code>c</code> et de <code>e</code>." },
            { texte: "<code>b</code>, <code>c</code> et <code>e</code>", correct: true,
              explication: "Oui : ce sont les trois qui ont des crochets. <code>c</code> est une liste vide, <code>e</code> une liste d'un seul élément — les deux sont parfaitement valides." },
            { texte: "toutes les cinq",
              explication: "<code>d</code> est une chaîne de caractères qui <em>ressemble</em> à une liste, et <code>a</code> utilise des parenthèses." },
          ],
          apres: `<span class="chapo">Ce sont les crochets qui font la liste</span>
            <code>a</code>, avec ses parenthèses, est un <em>p-uplet</em> : un autre type,
            que nous verrons dans un chapitre ultérieur. <code>d</code> est un texte comme
            un autre : les chiffres et les virgules qu'il contient ne sont que des
            caractères.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Chaque élément a son indice",
          contenu: `
            <p>Chaque élément d'une liste occupe une <strong>position</strong>, qu'on
            appelle son <strong>indice</strong> (ou <em>index</em>). On lit l'élément
            d'indice <code>i</code> de la liste <code>L</code> avec la syntaxe
            <code>L[i]</code>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Élément</th><td><code>12</code></td><td><code>15</code></td><td><code>8</code></td><td><code>18</code></td></tr>
              <tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
              <tr><th>Se lit</th><td><code>notes[0]</code></td><td><code>notes[1]</code></td><td><code>notes[2]</code></td><td><code>notes[3]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La numérotation commence à 0</span>
              Le premier élément porte l'indice <strong>0</strong>, le deuxième l'indice 1,
              et ainsi de suite. Pour une liste de <code>n</code> éléments, les indices vont
              donc de <strong>0 à n − 1</strong>. Nous verrons à la séance 6 pourquoi ce
              choix, qui surprend au début, est en fait très naturel.
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Le troisième élément",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `L = [5, 12, 9, 4]\nprint(L[2])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>12</code>",
              explication: "<code>12</code> est le deuxième élément : son indice est 1. On a compté à partir de 1." },
            { texte: "<code>9</code>", correct: true,
              explication: "Oui : indice 0 → 5, indice 1 → 12, indice 2 → 9. <code>L[2]</code> est le <strong>troisième</strong> élément." },
            { texte: "<code>2</code>",
              explication: "Le 2 entre crochets est une position, pas une valeur : on affiche ce qui se trouve à cette position." },
            { texte: "<code>[5, 12]</code>",
              explication: "<code>L[2]</code> désigne une seule case, pas un morceau de la liste." },
          ],
          apres: `<span class="chapo">Le décalage d'une unité</span>
            Le troisième élément a l'indice 2, le dixième l'indice 9 : l'indice vaut
            toujours <strong>le rang moins un</strong>. C'est l'erreur la plus fréquente
            avec les listes, et elle ne provoque souvent aucun message — juste une
            mauvaise valeur.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Lire deux cases",
          contenu: `
            <p>Affiche la <strong>première</strong> couleur de la liste, puis la
            <strong>troisième</strong>, en lisant les cases de <code>couleurs</code> :</p>
            <pre class="bloc-code"><code>rouge
bleu</code></pre>`,
          depart: `couleurs = ["rouge", "vert", "bleu", "jaune"]\n\n`,
          validation: {
            codeContient: [
              { motif: "couleurs\\s*\\[\\s*0\\s*\\]", message: "La première couleur se lit à l'indice 0." },
              { motif: "couleurs\\s*\\[\\s*2\\s*\\]", message: "La troisième couleur se lit à l'indice 2." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"']", message: "N'écris pas les couleurs à la main : lis-les dans la liste." },
            ],
            sortie: "rouge\nbleu",
          },
          felicitation: "Rang 1 → indice 0, rang 3 → indice 2. 🎯",
          indices: [
            "Un <code>print</code> par couleur, et dans chacun la liste suivie d'un indice entre crochets.",
            "La troisième couleur n'est pas à l'indice 3 : on compte à partir de 0.",
          ],
          solution: `couleurs = ["rouge", "vert", "bleu", "jaune"]\nprint(couleurs[0])\nprint(couleurs[2])\n`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Combien d'éléments ?",
          contenu: `
            <p>La fonction <code>len()</code> — pour <em>length</em>, longueur — renvoie
            le <strong>nombre d'éléments</strong> d'une liste.</p>
            <pre class="bloc-code"><code>len([12, 15, 8, 18])    # vaut 4
len([])                 # vaut 0</code></pre>
            <p>Affiche le nombre de planètes du système solaire, <strong>calculé par
            Python</strong> à partir de la liste :</p>
            <pre class="bloc-code"><code>8</code></pre>`,
          depart: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*planetes\\s*\\)", message: "Utilise len() sur la liste planetes." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*8\\s*\\)", message: "Le nombre doit être calculé par Python, pas écrit à la main." },
            ],
            sortie: "8",
          },
          felicitation: "len() compte pour toi, même quand la liste change. 🪐",
          indices: [
            "<code>len</code> reçoit la liste entre ses parenthèses, et <code>print</code> affiche ce qu'elle renvoie.",
          ],
          solution: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\nprint(len(planetes))\n`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Une case de trop",
          contenu: `<p>La liste compte quatre éléments. Que se passe-t-il si on demande la
            case d'indice 4 ?</p>`,
          code: `L = [5, 12, 9, 4]\nprint(L[4])`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>4</code>",
              explication: "<code>4</code> est bien le dernier élément, mais il est à l'indice 3." },
            { texte: "<code>None</code>",
              explication: "Python ne renvoie pas « rien » : il refuse franchement." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : les indices valides vont de 0 à 3. L'indice 4 n'existe pas, et Python s'arrête avec <code>IndexError: list index out of range</code>." },
            { texte: "<code>0</code>",
              explication: "Une case qui n'existe pas ne vaut pas 0 : elle n'existe pas du tout." },
          ],
          apres: `<span class="chapo">IndexError : list index out of range</span>
            Ce message signifie « indice hors limites ». Le dernier indice valide est
            toujours <code>len(L) - 1</code>. Quand tu le rencontres, cherche un
            décalage d'une unité : c'est presque toujours ça.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Le dernier élément, quelle que soit la longueur",
          contenu: `
            <p>Écrire <code>planetes[7]</code> fonctionne… tant que la liste compte huit
            éléments. Si on en ajoute un, le dernier n'est plus à l'indice 7.</p>
            <p>Affiche la dernière planète en calculant son indice <strong>à partir de
            <code>len()</code></strong>, pour que ton programme reste juste quelle que
            soit la longueur de la liste :</p>
            <pre class="bloc-code"><code>Neptune</code></pre>`,
          depart: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\n\n`,
          validation: {
            codeContient: [
              { motif: "planetes\\s*\\[\\s*len\\s*\\(\\s*planetes\\s*\\)\\s*-\\s*1\\s*\\]", message: "L'indice du dernier élément se calcule avec len(planetes)." },
            ],
            sortie: "Neptune",
          },
          felicitation: "Le dernier indice vaut toujours len(L) - 1. 📏",
          indices: [
            "Si la liste compte <code>n</code> éléments, le dernier a l'indice <code>n - 1</code>.",
            "Entre les crochets, on peut écrire un calcul : la longueur de la liste, moins un.",
          ],
          solution: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\nprint(planetes[len(planetes) - 1])\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Les indices négatifs",
          contenu: `
            <p><code>L[len(L) - 1]</code> est juste, mais un peu long. Python propose un
            raccourci : les <strong>indices négatifs</strong>, qui comptent
            <strong>depuis la fin</strong>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Élément</th><td><code>10</code></td><td><code>20</code></td><td><code>30</code></td><td><code>40</code></td></tr>
              <tr><th>Indice</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
              <tr><th>Indice négatif</th><td>−4</td><td>−3</td><td>−2</td><td>−1</td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>L = [10, 20, 30, 40]
print(L[-1])    # 40 : le dernier élément
print(L[-2])    # 30 : l'avant-dernier</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">À retenir</span>
              <code>L[-1]</code> désigne <strong>toujours</strong> le dernier élément, quelle
              que soit la longueur de la liste. C'est l'écriture la plus lisible, et celle
              qu'on utilisera désormais.
            </div>`,
        },

        {
          id: "d11",
          type: "code",
          titre: "Depuis la fin",
          contenu: `
            <p>Avec des <strong>indices négatifs</strong>, affiche la dernière planète
            puis l'avant-dernière :</p>
            <pre class="bloc-code"><code>Neptune
Uranus</code></pre>`,
          depart: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\n\n`,
          validation: {
            codeContient: [
              { motif: "planetes\\s*\\[\\s*-\\s*1\\s*\\]", message: "La dernière planète se lit à l'indice -1." },
              { motif: "planetes\\s*\\[\\s*-\\s*2\\s*\\]", message: "L'avant-dernière se lit à l'indice -2." },
            ],
            sortie: "Neptune\nUranus",
          },
          felicitation: "-1 pour la dernière, -2 pour l'avant-dernière. ⏪",
          indices: [
            "En partant de la fin, la première case rencontrée a l'indice <code>-1</code>.",
          ],
          solution: `planetes = ["Mercure", "Vénus", "Terre", "Mars",\n            "Jupiter", "Saturne", "Uranus", "Neptune"]\nprint(planetes[-1])\nprint(planetes[-2])\n`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>notes = [12, 15, 8, 18]     # une liste : des crochets, des virgules
vide = []                   # la liste vide

notes[0]                    # 12 : le premier élément, indice 0
notes[2]                    # 8  : le troisième élément, indice 2
notes[-1]                   # 18 : le dernier élément
len(notes)                  # 4  : le nombre d'éléments</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>le premier élément</td><td><code>L[0]</code></td></tr>
              <tr><td>l'élément de rang <em>k</em> (en comptant à partir de 1)</td><td><code>L[k - 1]</code></td></tr>
              <tr><td>le dernier élément</td><td><code>L[-1]</code> ou <code>L[len(L) - 1]</code></td></tr>
              <tr><td>le nombre d'éléments</td><td><code>len(L)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>compter à partir de 1 : le troisième élément est <code>L[2]</code>, pas <code>L[3]</code> ;</li>
                <li>demander <code>L[len(L)]</code> : une case de trop, et c'est l'<code>IndexError</code> ;</li>
                <li>oublier un crochet ou une virgule en créant la liste : <code>SyntaxError</code>.</li>
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
          type: "qcm",
          titre: "Lire une liste",
          contenu: `<p>On considère la liste suivante.</p>`,
          code: `L = [5, 12, 9, 4]`,
          question: "Que valent L[0], L[2], L[-1] et len(L), dans cet ordre ?",
          options: [
            { texte: "5, 12, 4 et 4",
              explication: "<code>L[2]</code> ne vaut pas 12 : 12 est à l'indice 1." },
            { texte: "5, 9, 4 et 4", correct: true,
              explication: "Oui : indice 0 → 5, indice 2 → 9, dernier élément → 4, et la liste compte 4 éléments." },
            { texte: "12, 4, 5 et 3",
              explication: "On a compté à partir de 1, et pris le dernier indice pour la longueur. <code>len(L)</code> compte les éléments : il y en a 4." },
            { texte: "5, 9, 4 et 3",
              explication: "Presque : <code>len(L)</code> vaut 4, le nombre d'éléments. C'est le dernier <em>indice</em> qui vaut 3." },
          ],
          apres: `<span class="chapo">Longueur et dernier indice</span>
            Une liste de 4 éléments a une <strong>longueur</strong> de 4, et un
            <strong>dernier indice</strong> de 3. Les deux nombres diffèrent toujours
            d'une unité — ne les confonds pas.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le podium",
          contenu: `
            <p>La liste <code>classement</code> range les coureurs de la course, du
            premier au dernier arrivé. Affiche le podium, puis la lanterne rouge — le
            dernier — en <strong>lisant la liste</strong> :</p>
            <pre class="bloc-code"><code>Or : Léa
Argent : Tom
Bronze : Inès
Lanterne rouge : Zoé</code></pre>`,
          depart: `classement = ["Léa", "Tom", "Inès", "Hugo", "Sacha", "Zoé"]\n\n`,
          validation: {
            codeContient: [
              { motif: "classement\\s*\\[\\s*0\\s*\\]", message: "La médaille d'or revient au coureur d'indice 0." },
              { motif: "classement\\s*\\[\\s*2\\s*\\]", message: "Le bronze revient au troisième, d'indice 2." },
              { motif: "classement\\s*\\[\\s*-\\s*1\\s*\\]", message: "La lanterne rouge est le dernier : utilise un indice négatif." },
            ],
            codeAbsent: [
              { motif: "\\bLea\\b[\\s\\S]*\\bLea\\b|\\bInes\\b[\\s\\S]*\\bInes\\b|\\bZoe\\b[\\s\\S]*\\bZoe\\b", message: "N'écris pas les prénoms à la main : lis-les dans la liste." },
            ],
            sortie: "Or : Léa\nArgent : Tom\nBronze : Inès\nLanterne rouge : Zoé",
          },
          felicitation: "Quatre lectures, aucun prénom recopié. 🏅",
          indices: [
            "Chaque ligne affiche un texte puis un élément de la liste : <code>print</code> accepte les deux, séparés par une virgule.",
            "Or, argent, bronze : indices 0, 1 et 2. Pour le dernier, sans compter les coureurs, un indice négatif.",
          ],
          solution: `classement = ["Léa", "Tom", "Inès", "Hugo", "Sacha", "Zoé"]\nprint("Or :", classement[0])\nprint("Argent :", classement[1])\nprint("Bronze :", classement[2])\nprint("Lanterne rouge :", classement[-1])\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Le jour numéro 3",
          contenu: `
            <p>Pour un humain, mercredi est le jour <strong>numéro 3</strong> de la
            semaine. La variable <code>numero</code> contient ce numéro, compté
            à partir de 1.</p>
            <p>Affiche le jour correspondant en lisant la liste <code>jours</code> à
            l'aide de <code>numero</code> :</p>
            <pre class="bloc-code"><code>mercredi</code></pre>
            <p>Ton programme doit rester juste si l'on change la valeur de
            <code>numero</code> : avec 1, il afficherait <code>lundi</code>.</p>`,
          depart: `jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\nnumero = 3\n\n`,
          validation: {
            codeContient: [
              { motif: "jours\\s*\\[[^\\]]*\\bnumero\\b", message: "L'indice doit être calculé à partir de la variable numero." },
            ],
            codeAbsent: [
              { motif: "jours\\s*\\[\\s*\\d+\\s*\\]", message: "N'écris pas l'indice en dur : calcule-le à partir de numero." },
            ],
            sortie: "mercredi",
          },
          felicitation: "Le rang humain moins un donne l'indice. 📅",
          indices: [
            "Avec <code>jours[numero]</code>, on obtient jeudi : il y a un décalage.",
            "Le jour numéro 1 est à l'indice 0 : il faut retirer quelque chose à <code>numero</code>.",
          ],
          solution: `jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\nnumero = 3\nprint(jours[numero - 1])\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Première note : 12
Dernière note : 18
Nombre de notes : 4</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `notes = [12, 15, 8, 18\nprint("Première note :", notes[1])\nprint("Dernière note :", notes[4])\nprint("Nombre de notes :", len(notes))\n`,
          validation: {
            codeContient: [
              { motif: "notes\\s*\\[\\s*0\\s*\\]", message: "La première note est à l'indice 0." },
              { motif: "notes\\s*\\[\\s*(-\\s*1|3|len\\s*\\(\\s*notes\\s*\\)\\s*-\\s*1)\\s*\\]", message: "La dernière note se lit à l'indice -1." },
            ],
            sortie: "Première note : 12\nDernière note : 18\nNombre de notes : 4",
          },
          felicitation: "Un crochet oublié, un décalage, un indice hors limites : les trois classiques. 🐞",
          indices: [
            "La première erreur empêche même le programme de démarrer : regarde comment se termine la liste.",
            "Une fois la liste réparée, la première note affichée n'est pas la bonne : à quel indice se trouve le premier élément ?",
            "La dernière erreur est une <code>IndexError</code> : quatre éléments, donc quel est le dernier indice valide ?",
          ],
          solution: `notes = [12, 15, 8, 18]\nprint("Première note :", notes[0])\nprint("Dernière note :", notes[-1])\nprint("Nombre de notes :", len(notes))\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "L'élément du milieu",
          contenu: `
            <p>Une liste qui compte un nombre <strong>impair</strong> d'éléments a un
            élément au milieu. Pour <code>[11, 14, 9, 17, 13]</code>, c'est
            <code>9</code>.</p>
            <p>Affiche l'élément du milieu de <code>notes</code> en calculant son indice
            à partir de la longueur de la liste :</p>
            <pre class="bloc-code"><code>9</code></pre>
            <p>Ton calcul doit fonctionner pour n'importe quelle liste de longueur
            impaire.</p>`,
          depart: `notes = [11, 14, 9, 17, 13]\n\n`,
          validation: {
            codeContient: [
              { motif: "len\\s*\\(\\s*notes\\s*\\)", message: "L'indice du milieu se calcule à partir de len(notes)." },
              { motif: "//", message: "Un indice est un entier : la division entière // est la bonne." },
            ],
            codeAbsent: [
              { motif: "notes\\s*\\[\\s*2\\s*\\]", message: "N'écris pas l'indice en dur : calcule-le." },
            ],
            sortie: "9",
          },
          felicitation: "len(L) // 2 : le milieu de n'importe quelle liste impaire. ⚖️",
          indices: [
            "Pour 5 éléments, le milieu est à l'indice 2 ; pour 7, à l'indice 3. Quel lien avec la longueur ?",
            "La division <code>/</code> donne un flottant, refusé comme indice. La division entière <code>//</code>, elle, donne un entier.",
          ],
          solution: `notes = [11, 14, 9, 17, 13]\nprint(notes[len(notes) // 2])\n`,
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
          titre: "Les deux bouts",
          contenu: `
            <p>Écris la fonction <code>extremites(L)</code>, qui <strong>renvoie</strong>
            une nouvelle liste formée du premier et du dernier élément de
            <code>L</code>.</p>
            <pre class="bloc-code"><code>extremites([12, 15, 8, 18])      # renvoie [12, 18]
extremites(["lundi", "mardi"])   # renvoie ["lundi", "mardi"]
extremites([7])                  # renvoie [7, 7]</code></pre>
            <p>On suppose que <code>L</code> n'est jamais vide.</p>`,
          depart: `def extremites(L):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la nouvelle liste." },
            ],
            tests: `assert extremites([12, 15, 8, 18]) == [12, 18], "extremites([12, 15, 8, 18]) doit renvoyer [12, 18]"\nassert extremites(["lundi", "mardi"]) == ["lundi", "mardi"], "avec deux éléments, on retrouve la liste entière"\nassert extremites([7]) == [7, 7], "avec un seul élément, il est à la fois le premier et le dernier"\nassert extremites([3, 1, 4, 1, 5, 9, 2, 6]) == [3, 6], "la fonction doit marcher quelle que soit la longueur"`,
          },
          felicitation: "Une liste fabriquée à partir de deux lectures. 🔚",
          indices: [
            "La nouvelle liste s'écrit entre crochets, comme n'importe quelle liste — ses deux éléments peuvent être des lectures dans <code>L</code>.",
            "Le premier élément est à l'indice 0 ; le dernier, quelle que soit la longueur, à l'indice -1.",
          ],
          solution: `def extremites(L):\n    return [L[0], L[-1]]\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Dans cent jours",
          contenu: `
            <p>Les jours sont numérotés à partir de 0 : lundi a l'indice 0, dimanche
            l'indice 6. Écris la fonction <code>jour_dans(aujourdhui, n)</code>, qui
            renvoie le <strong>nom</strong> du jour qu'il sera dans <code>n</code> jours,
            si l'on est aujourd'hui le jour d'indice <code>aujourdhui</code>.</p>
            <pre class="bloc-code"><code>jour_dans(0, 1)      # lundi + 1 jour    → "mardi"
jour_dans(5, 3)      # samedi + 3 jours  → "mardi"
jour_dans(2, 100)    # mercredi + 100 jours → "vendredi"</code></pre>`,
          depart: `JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\n\n\ndef jour_dans(aujourdhui, n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bJOURS\\s*\\[", message: "Le nom du jour se lit dans la liste JOURS." },
              { motif: "%", message: "Après dimanche, on revient à lundi : pense au reste de la division." },
            ],
            tests: `assert jour_dans(0, 1) == "mardi", "lundi + 1 jour donne mardi"\nassert jour_dans(5, 3) == "mardi", "samedi + 3 jours donne mardi : après dimanche, on repart au début"\nassert jour_dans(2, 100) == "vendredi", "mercredi + 100 jours donne vendredi"\nassert jour_dans(6, 0) == "dimanche", "dans 0 jour, on est toujours le même jour"\nassert jour_dans(3, 7) == "jeudi", "une semaine plus tard, c'est le même jour"`,
          },
          felicitation: "Le modulo fait boucler les indices : la semaine recommence. 🔁",
          indices: [
            "Sans la fin de semaine, l'indice cherché serait simplement <code>aujourdhui + n</code>.",
            "Cet indice peut dépasser 6. Le reste de sa division par 7 retombe toujours entre 0 et 6 — c'est l'opérateur <code>%</code>.",
          ],
          solution: `JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\n\n\ndef jour_dans(aujourdhui, n):\n    return JOURS[(aujourdhui + n) % 7]\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre liste",
          contenu: `
            <p>À toi de choisir le sujet : tes films préférés, les villes où tu as
            voyagé, tes dernières notes… Crée une liste d'<strong>au moins cinq</strong>
            éléments, tous <strong>du même type</strong>, puis affiche, avec des phrases
            de ton choix :</p>
            <ul>
              <li>son premier élément ;</li>
              <li>son dernier élément, avec un indice négatif ;</li>
              <li>son nombre d'éléments, calculé par <code>len()</code>.</li>
            </ul>`,
          depart: `# Ta liste ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\[\\s*0\\s*\\]", message: "Affiche le premier élément, d'indice 0." },
              { motif: "\\[\\s*-\\s*1\\s*\\]", message: "Affiche le dernier élément avec l'indice -1." },
              { motif: "len\\s*\\(", message: "Le nombre d'éléments doit être calculé par len()." },
            ],
            sortieNonVide: true,
            tests: `_listes = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_")]\nassert any(len(v) >= 5 for v in _listes), "Ta liste doit contenir au moins cinq éléments."\nassert all(all(type(x) == type(v[0]) for x in v) for v in _listes if len(v) >= 5), "Tous les éléments de ta liste doivent être du même type."`,
          },
          felicitation: "Ta liste, tes phrases : tu maîtrises la lecture d'une liste. ✨",
          indices: [
            "Commence par une ligne <code>ma_liste = [ … ]</code> avec au moins cinq valeurs du même type : que des textes, ou que des nombres.",
            "Puis trois <code>print</code> : un pour l'indice 0, un pour l'indice -1, un pour <code>len()</code>.",
          ],
          solution: `films = ["Up", "Coco", "Wall-E", "Soul", "Luca"]\nprint("Mon premier film :", films[0])\nprint("Mon dernier film :", films[-1])\nprint("Nombre de films :", len(films))\n`,
        },
      ],
    },
  ],
};

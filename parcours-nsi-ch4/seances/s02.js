/* NSI — chapitre 4, séance 2 : modifier une liste.
 * Reprend les sections « Modifier un élément » et « Quelques fonctions utiles »
 * du cours, ainsi que les exercices 2 et 3.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Modifier une liste",
  sousTitre: "Changer une case, en ajouter une, et laisser Python calculer",
  palier: "Partie 1 — Les listes",

  accroche: `Une liste n'est pas figée : une note rattrapée, un article ajouté au
    panier, un score qui grimpe… Son contenu peut changer après sa création. Et pour
    la somme, le minimum ou le maximum, Python a déjà tout prévu.`,

  objectifs: [
    "remplacer un élément avec <code>L[i] = valeur</code>",
    "ajouter un élément à la fin avec <code>append()</code>",
    "remplir une liste partie de rien",
    "utiliser <code>len</code>, <code>sum</code>, <code>min</code>, <code>max</code> et <code>in</code>",
  ],

  motDeLaFin: `Tu sais modifier une liste et l'interroger avec les fonctions de Python.
    À la séance 3, on la parcourt : passer sur chaque élément, un par un, et
    reprogrammer soi-même ce que fait <code>sum()</code>.`,

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
          titre: "Une liste se modifie",
          contenu: `
            <p>La syntaxe <code>L[i]</code> sert à <strong>lire</strong> une case. Placée à
            gauche d'un <code>=</code>, elle sert à la <strong>remplacer</strong> :</p>

            <pre class="bloc-code"><code>couleurs = ["rouge", "vert", "bleu"]
couleurs[1] = "jaune"        # la case d'indice 1 reçoit "jaune"
print(couleurs)              # ['rouge', 'jaune', 'bleu']</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : liste mutable</span>
              On dit qu'une liste est <strong>mutable</strong> (ou <em>modifiable</em>) : son
              contenu peut changer après sa création, sans qu'on ait à la réécrire.
            </div>

            <p>Comme pour une variable, <code>=</code> se lit « <strong>reçoit</strong> » :
            Python calcule ce qui est à droite, puis le range dans la case désignée à
            gauche. Les autres cases ne bougent pas.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "La note rattrapée",
          contenu: `
            <p>La liste <code>notes_NSI</code> contient les notes de Quentin au premier
            trimestre. Après un rattrapage, sa <strong>dernière</strong> note passe de 9 à 15.</p>
            <p>Modifie la case concernée, <strong>sans réécrire la liste</strong>. La
            console doit montrer :</p>
            <pre class="bloc-code"><code>[16, 14, 15]</code></pre>`,
          depart: `notes_NSI = [16, 14, 9]\n\n# la dernière note passe de 9 à 15\n\nprint(notes_NSI)\n`,
          validation: {
            codeContient: [
              { motif: "notes_NSI\\s*\\[\\s*(-\\s*1|2)\\s*\\]\\s*=(?!=)", message: "Remplace la dernière case de notes_NSI avec une affectation : notes_NSI[…] = …" },
            ],
            codeAbsent: [
              { motif: "notes_NSI\\s*=\\s*\\[[\\s\\S]*notes_NSI\\s*=\\s*\\[", message: "Ne réécris pas toute la liste : modifie seulement la case concernée." },
            ],
            sortie: "[16, 14, 15]",
          },
          felicitation: "Une seule case remplacée, les autres intactes. ✏️",
          indices: [
            "Entre le commentaire et le <code>print</code>, une ligne : la case à modifier, puis <code>=</code>, puis la nouvelle note.",
            "La dernière case se désigne avec l'indice <code>2</code>, ou mieux avec <code>-1</code>.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Une case calculée",
          contenu: `<p>Lis ce programme sans l'exécuter. Attention à la deuxième ligne :
            la droite du <code>=</code> est calculée avant d'être rangée.</p>`,
          code: `L = [3, 6, 9]\nL[1] = L[0] + L[2]\nprint(L)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[3, 6, 9]</code>",
              explication: "La deuxième ligne modifie bien la liste : la case d'indice 1 reçoit une nouvelle valeur." },
            { texte: "<code>[3, 12, 9]</code>", correct: true,
              explication: "Oui : <code>L[0] + L[2]</code> vaut 3 + 9 = 12, et ce 12 remplace le 6 dans la case d'indice 1." },
            { texte: "<code>[12, 6, 9]</code>",
              explication: "C'est la case <strong>d'indice 1</strong> qui reçoit le résultat, c'est-à-dire la deuxième." },
            { texte: "<code>[3, 9, 9]</code>",
              explication: "On n'a pas copié <code>L[2]</code> : on a additionné <code>L[0]</code> et <code>L[2]</code>." },
          ],
          apres: `<span class="chapo">Lire à droite, écrire à gauche</span>
            Dans <code>L[1] = L[0] + L[2]</code>, les cases de droite sont
            <strong>lues</strong>, celle de gauche est <strong>écrite</strong>. Une même
            ligne peut donc lire une case et en modifier une autre — ou la même.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Cinq points de plus",
          contenu: `
            <p>La liste <code>scores</code> range les points de trois joueurs. Tom,
            le joueur d'indice 1, vient de marquer <strong>5 points</strong>.</p>
            <p>Augmente son score de 5 en partant de sa valeur actuelle — ton programme
            doit rester juste quel que soit le score de départ :</p>
            <pre class="bloc-code"><code>[10, 12, 12]</code></pre>`,
          depart: `scores = [10, 7, 12]\n\n\nprint(scores)\n`,
          validation: {
            codeContient: [
              { motif: "scores\\s*\\[\\s*1\\s*\\]\\s*(\\+=|=\\s*scores\\s*\\[\\s*1\\s*\\]\\s*\\+)", message: "Le nouveau score se calcule à partir de scores[1] : son ancienne valeur, plus 5." },
            ],
            codeAbsent: [
              { motif: "scores\\s*\\[\\s*1\\s*\\]\\s*=\\s*12\\b", message: "N'écris pas 12 à la main : calcule-le à partir de l'ancien score." },
            ],
            sortie: "[10, 12, 12]",
          },
          felicitation: "Lire la case, ajouter, réécrire : l'incrémentation marche aussi sur une liste. ➕",
          indices: [
            "C'est le même geste que <code>vies = vies + 1</code>, mais avec une case de liste à la place de la variable.",
            "À gauche du <code>=</code>, la case de Tom ; à droite, cette même case, plus 5.",
          ],
          apres: `<span class="chapo">La version courte marche aussi</span>
            <code>scores[1] += 5</code> fait exactement la même chose que
            <code>scores[1] = scores[1] + 5</code>.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Ajouter un élément : append()",
          contenu: `
            <p>Remplacer une case ne change pas la <strong>longueur</strong> de la liste.
            Pour ajouter un élément, on utilise la <strong>méthode</strong>
            <code>append()</code>, qui le place <strong>à la fin</strong> :</p>

            <pre class="bloc-code"><code>notes = [12, 15, 9]
notes.append(18)             # on ajoute 18 au bout
print(notes)                 # [12, 15, 9, 18]
print(len(notes))            # 4 : la liste s'est allongée</code></pre>

            <div class="encadre">
              <span class="chapo">Une méthode s'écrit avec un point</span>
              Une <strong>méthode</strong> est une fonction attachée à une valeur. On
              l'appelle avec un <strong>point</strong> : d'abord la liste, puis le nom de la
              méthode, puis ses parenthèses. <code>notes.append(18)</code> se lit « ajoute 18
              à la liste <code>notes</code> ».
            </div>

            <p><code>append()</code> <strong>modifie</strong> la liste elle-même : il n'y a
            rien à récupérer, ni de <code>=</code> à écrire devant.</p>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "La liste de courses",
          contenu: `
            <p>Ajoute <code>"beurre"</code> puis <code>"riz"</code> à la liste de
            courses, avec <code>append()</code>. Le programme affiche ensuite la liste et
            sa longueur :</p>
            <pre class="bloc-code"><code>['pain', 'lait', 'beurre', 'riz']
4</code></pre>`,
          depart: `courses = ["pain", "lait"]\n\n\nprint(courses)\nprint(len(courses))\n`,
          validation: {
            codeContient: [
              { motif: "courses\\s*\\.\\s*append\\s*\\(\\s*[\"']beurre[\"']\\s*\\)", message: "Ajoute \"beurre\" avec courses.append(…)." },
              { motif: "courses\\s*\\.\\s*append\\s*\\(\\s*[\"']riz[\"']\\s*\\)", message: "Ajoute \"riz\" avec courses.append(…)." },
            ],
            codeAbsent: [
              { motif: "courses\\s*=\\s*\\[[\\s\\S]*courses\\s*=\\s*\\[", message: "Ne réécris pas la liste : ajoute les articles un par un." },
            ],
            sortie: "['pain', 'lait', 'beurre', 'riz']\n4",
          },
          felicitation: "Deux append(), deux cases de plus, au bout de la liste. 🛒",
          indices: [
            "Un <code>append()</code> par article, chacun sur sa ligne, avant les <code>print</code>.",
            "La liste d'abord, puis un point, puis <code>append</code> et l'article entre parenthèses — sans oublier ses guillemets.",
          ],
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Écrire dans une case qui n'existe pas",
          contenu: `<p>La liste a deux éléments, d'indices 0 et 1. Que se passe-t-il si
            l'on essaie de remplir la case d'indice 2 ?</p>`,
          code: `L = [1, 2]\nL[2] = 3\nprint(L)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>[1, 2, 3]</code>",
              explication: "C'est ce qu'on aimerait, mais Python ne crée pas de case par affectation." },
            { texte: "<code>[1, 3]</code>",
              explication: "La case d'indice 1 n'est pas concernée : on vise l'indice 2." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : la case d'indice 2 n'existe pas, on ne peut donc pas y écrire. Python s'arrête avec <code>IndexError: list assignment index out of range</code>." },
            { texte: "<code>[1, 2, None, 3]</code>",
              explication: "Python ne bouche pas les trous : il refuse d'écrire hors de la liste." },
          ],
          apres: `<span class="chapo">Remplacer ou ajouter, deux gestes distincts</span>
            <code>L[i] = …</code> ne fait que <strong>remplacer</strong> une case qui existe
            déjà. Pour <strong>ajouter</strong> une case, il n'y a qu'un moyen :
            <code>append()</code>.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Remplir une liste vide",
          contenu: `
            <p>On part souvent d'une liste vide, qu'on remplit au fil d'une boucle.</p>
            <p>Complète la boucle pour que la liste <code>multiples</code> reçoive, un par
            un, les cinq premiers multiples de 7 :</p>
            <pre class="bloc-code"><code>[7, 14, 21, 28, 35]</code></pre>`,
          depart: `multiples = []\n\nfor i in range(1, 6):\n    pass\n\nprint(multiples)\n`,
          validation: {
            codeContient: [
              { motif: "multiples\\s*\\.\\s*append\\s*\\(", message: "Chaque multiple s'ajoute à la liste avec multiples.append(…)." },
              { motif: "\\n[ \\t]+multiples\\s*\\.\\s*append", message: "L'ajout doit se faire dans la boucle, indenté sous le for." },
            ],
            codeAbsent: [
              { motif: "multiples\\s*=\\s*\\[\\s*\\d", message: "Ne recopie pas les valeurs : la boucle doit les calculer." },
            ],
            sortie: "[7, 14, 21, 28, 35]",
          },
          felicitation: "Une liste vide, une boucle, un append() par tour. 🔁",
          indices: [
            "La variable <code>i</code> prend les valeurs 1, 2, 3, 4 et 5 : à chaque tour, quel multiple de 7 faut-il ajouter ?",
            "Remplace <code>pass</code> par un <code>append()</code> sur <code>multiples</code>, avec un calcul qui utilise <code>i</code> entre les parenthèses.",
          ],
        },

        {
          id: "d9",
          type: "cours",
          titre: "Les fonctions qui interrogent une liste",
          contenu: `
            <p>Python fournit quelques fonctions toutes prêtes pour interroger une liste
            de nombres :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Écriture</th><th>Ce qu'elle renvoie</th><th>Avec <code>L = [3, 6, 9]</code></th></tr>
              <tr><td><code>len(L)</code></td><td>le nombre d'éléments</td><td><code>3</code></td></tr>
              <tr><td><code>sum(L)</code></td><td>la somme des éléments</td><td><code>18</code></td></tr>
              <tr><td><code>min(L)</code></td><td>le plus petit élément</td><td><code>3</code></td></tr>
              <tr><td><code>max(L)</code></td><td>le plus grand élément</td><td><code>9</code></td></tr>
              <tr><td><code>x in L</code></td><td><code>True</code> si <code>x</code> est dans la liste, <code>False</code> sinon</td><td><code>6 in L</code> vaut <code>True</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Elles suivent la liste</span>
              Ces fonctions recalculent leur résultat à chaque appel : si la liste change,
              le résultat change aussi. C'est tout l'intérêt de ne jamais écrire un total
              à la main.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Le bulletin",
          contenu: `
            <p>À partir de la liste <code>notes</code>, affiche le total, la note la plus
            basse, la plus haute et la moyenne, <strong>toutes calculées par Python</strong> :</p>
            <pre class="bloc-code"><code>Total : 64
Plus basse : 8
Plus haute : 18
Moyenne : 12.8</code></pre>`,
          depart: `notes = [12, 15, 8, 18, 11]\n\n`,
          validation: {
            codeContient: [
              { motif: "sum\\s*\\(\\s*notes\\s*\\)", message: "Le total se calcule avec sum(notes)." },
              { motif: "min\\s*\\(\\s*notes\\s*\\)", message: "La note la plus basse se calcule avec min(notes)." },
              { motif: "max\\s*\\(\\s*notes\\s*\\)", message: "La note la plus haute se calcule avec max(notes)." },
              { motif: "len\\s*\\(\\s*notes\\s*\\)", message: "La moyenne divise le total par le nombre de notes : len(notes)." },
            ],
            codeAbsent: [
              { motif: "\\b64\\b|\\b12\\.8\\b", message: "Les résultats doivent être calculés par Python, pas écrits à la main." },
            ],
            sortie: "Total : 64\nPlus basse : 8\nPlus haute : 18\nMoyenne : 12.8",
          },
          felicitation: "Quatre résultats, zéro calcul à la main. 📊",
          indices: [
            "Quatre <code>print</code>, chacun avec un texte puis le résultat d'une fonction appliquée à <code>notes</code>.",
            "La moyenne, c'est le total divisé par le nombre de notes : deux fonctions du tableau, et une division.",
          ],
        },

        {
          id: "d11",
          type: "prediction",
          titre: "Le kiwi est-il dans la liste ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `fruits = ["pomme", "kiwi", "poire"]\nprint("Kiwi" in fruits)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>True</code>",
              explication: "Regarde bien la première lettre : la liste contient <code>\"kiwi\"</code>, pas <code>\"Kiwi\"</code>." },
            { texte: "<code>False</code>", correct: true,
              explication: "Oui : <code>\"Kiwi\"</code> et <code>\"kiwi\"</code> sont deux chaînes différentes, car la majuscule compte. Aucun élément n'est égal à <code>\"Kiwi\"</code>." },
            { texte: "<code>1</code>",
              explication: "<code>in</code> ne renvoie pas une position, mais un booléen : <code>True</code> ou <code>False</code>." },
            { texte: "une erreur",
              explication: "Chercher une valeur absente n'est pas une erreur : <code>in</code> répond simplement <code>False</code>." },
          ],
          apres: `<span class="chapo">in cherche une égalité exacte</span>
            <code>x in L</code> vaut <code>True</code> seulement si un élément de
            <code>L</code> est <strong>égal</strong> à <code>x</code>. Pour du texte, la
            casse compte : <code>"Kiwi" == "kiwi"</code> vaut <code>False</code>.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>notes = [12, 15, 9]

notes[2] = 11            # remplace la case d'indice 2   → [12, 15, 11]
notes[0] = notes[0] + 1  # augmente la case d'indice 0   → [13, 15, 11]
notes.append(18)         # ajoute 18 à la fin            → [13, 15, 11, 18]

vide = []
for i in range(3):
    vide.append(i)       # remplit une liste vide        → [0, 1, 2]</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>remplacer l'élément d'indice <code>i</code></td><td><code>L[i] = valeur</code></td></tr>
              <tr><td>ajouter un élément à la fin</td><td><code>L.append(valeur)</code></td></tr>
              <tr><td>la somme, le minimum, le maximum</td><td><code>sum(L)</code>, <code>min(L)</code>, <code>max(L)</code></td></tr>
              <tr><td>la moyenne</td><td><code>sum(L) / len(L)</code></td></tr>
              <tr><td>savoir si une valeur est présente</td><td><code>valeur in L</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>écrire <code>L[len(L)] = x</code> pour ajouter : c'est une <code>IndexError</code>, il faut <code>append()</code> ;</li>
                <li>écrire <code>L = L.append(x)</code> : <code>append()</code> ne renvoie rien, et <code>L</code> est perdue ;</li>
                <li>oublier que la casse compte : <code>"Kiwi" in ["kiwi"]</code> vaut <code>False</code>.</li>
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
          type: "prediction",
          titre: "Prévoir sans exécuter",
          contenu: `<p>Lis ce programme ligne par ligne, en suivant le contenu de
            <code>L</code>.</p>`,
          code: `L = [3, 6, 9]\nL[1] = 100\nL.append(12)\nprint(L)\nprint(len(L))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[3, 100, 9, 12]</code> puis <code>4</code>", correct: true,
              explication: "Oui : le 6 (indice 1) est remplacé par 100, puis 12 s'ajoute à la fin. La liste compte alors 4 éléments." },
            { texte: "<code>[100, 6, 9, 12]</code> puis <code>4</code>",
              explication: "L'indice 1 désigne la <strong>deuxième</strong> case, celle du 6 — pas la première." },
            { texte: "<code>[3, 100, 6, 9, 12]</code> puis <code>5</code>",
              explication: "<code>L[1] = 100</code> remplace le 6, il ne s'insère pas devant. Seul <code>append()</code> ajoute une case." },
            { texte: "<code>[3, 100, 9, 12]</code> puis <code>3</code>",
              explication: "La liste est juste, mais <code>len()</code> compte les éléments <strong>au moment où il est appelé</strong> : après l'ajout, il y en a 4." },
          ],
          apres: `<span class="chapo">Suivre la liste ligne après ligne</span>
            Pour prévoir un programme qui modifie une liste, on réécrit son contenu
            après chaque ligne : <code>[3, 6, 9]</code>, puis <code>[3, 100, 9]</code>,
            puis <code>[3, 100, 9, 12]</code>.`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Une seule affirmation est fausse",
          contenu: `<p>Voici quatre affirmations sur les listes. Trois sont vraies.</p>`,
          question: "Laquelle est fausse ?",
          options: [
            { texte: "Les indices d'une liste commencent à 0.",
              explication: "C'est vrai : le premier élément est toujours <code>L[0]</code>." },
            { texte: "Une liste peut être modifiée après sa création.",
              explication: "C'est vrai : on peut remplacer un élément ou en ajouter un." },
            { texte: "Une liste est immuable.", correct: true,
              explication: "Oui, c'est faux : « immuable » veut dire « qui ne peut pas changer ». Une liste est au contraire <strong>mutable</strong>. Nous verrons que ce sont les chaînes de caractères qui sont immuables." },
            { texte: "En NSI, les éléments d'une liste sont tous du même type.",
              explication: "C'est vrai dans le cadre du programme, même si Python accepte de mélanger les types." },
          ],
          apres: `<span class="chapo">Mutable et immuable</span>
            Une valeur <strong>mutable</strong> peut être modifiée sur place, une valeur
            <strong>immuable</strong> ne le peut jamais. Les listes sont mutables ; les
            nombres et les chaînes sont immuables.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Créer et modifier",
          contenu: `
            <p>Suis les consignes du code de départ, dans l'ordre. À la fin, le programme
            affiche :</p>
            <pre class="bloc-code"><code>5
16</code></pre>
            <p>Attention : la <strong>troisième</strong> note n'est pas
            <code>notes[3]</code> !</p>`,
          depart: `# 1. Crée la liste des notes : 12, 15, 8, 18\nnotes = \n\n# 2. Corrige la troisième note : elle devient 11\n\n\n# 3. Ajoute une cinquième note : 16\n\n\n# 4. Affiche le nombre de notes, puis la dernière note\n\n`,
          validation: {
            codeContient: [
              { motif: "notes\\s*\\[\\s*2\\s*\\]\\s*=(?!=)", message: "La troisième note se corrige à l'indice 2." },
              { motif: "notes\\s*\\.\\s*append\\s*\\(\\s*16\\s*\\)", message: "La cinquième note s'ajoute avec append()." },
              { motif: "len\\s*\\(\\s*notes\\s*\\)", message: "Le nombre de notes se calcule avec len()." },
              { motif: "notes\\s*\\[\\s*-\\s*1\\s*\\]", message: "La dernière note se lit avec l'indice -1." },
            ],
            codeAbsent: [
              { motif: "notes\\s*\\[\\s*3\\s*\\]\\s*=(?!=)", message: "notes[3] est la quatrième note : la troisième est à l'indice 2." },
              { motif: "notes\\s*=\\s*\\[[^\\]]*\\b11\\b", message: "Crée d'abord la liste avec la note d'origine, 8, puis corrige-la à l'étape 2." },
            ],
            sortie: "5\n16",
            tests: `assert notes == [12, 15, 11, 18, 16], "À la fin, notes doit valoir [12, 15, 11, 18, 16]."`,
          },
          felicitation: "Créer, corriger, ajouter, interroger : tout le cycle de vie d'une liste. 📝",
          indices: [
            "Une ou deux lignes par consigne, dans l'ordre : création, correction, ajout, puis deux <code>print</code>.",
            "La correction est une affectation dans une case ; l'ajout est un <code>append()</code> ; le dernier élément se lit à l'indice <code>-1</code>.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "L'écart de températures",
          contenu: `
            <p>La liste <code>temperatures</code> contient les relevés d'une journée.
            L'<strong>écart</strong> est la différence entre la plus haute et la plus basse
            température.</p>
            <p>Affiche-le, en le calculant à partir de la liste :</p>
            <pre class="bloc-code"><code>Écart : 15</code></pre>`,
          depart: `temperatures = [14, 9, 21, 17, 6, 12]\n\n`,
          validation: {
            codeContient: [
              { motif: "max\\s*\\(\\s*temperatures\\s*\\)", message: "La plus haute température se calcule avec max(temperatures)." },
              { motif: "min\\s*\\(\\s*temperatures\\s*\\)", message: "La plus basse température se calcule avec min(temperatures)." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "L'écart doit être calculé par Python, pas écrit à la main." },
            ],
            sortie: "Écart : 15",
          },
          felicitation: "max() moins min() : l'écart s'adapte à n'importe quel relevé. 🌡️",
          indices: [
            "L'écart est une soustraction : la plus haute, moins la plus basse.",
            "Les deux termes de la soustraction sont donnés par deux fonctions appliquées à <code>temperatures</code>.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : l'inventaire",
          contenu: `
            <p>Un magasin tient son stock dans une liste. Le <strong>deuxième</strong>
            produit est réapprovisionné de 10 unités, puis on ajoute un nouveau produit,
            en 3 exemplaires. Le programme devrait afficher :</p>
            <pre class="bloc-code"><code>[4, 10, 7, 3]
Total : 24</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Exécute-le, lis les messages,
            et corrige-les une par une.</p>`,
          depart: `stock = [4, 0, 7]\nstock[2] = stock[2] + 10\nstock = stock.append(3)\nprint(stock)\nprint("Total :", sum(stock)\n`,
          validation: {
            codeContient: [
              { motif: "stock\\s*\\[\\s*1\\s*\\]\\s*(\\+=|=\\s*stock\\s*\\[\\s*1\\s*\\])", message: "Le deuxième produit est à l'indice 1." },
              { motif: "stock\\s*\\.\\s*append\\s*\\(\\s*3\\s*\\)", message: "Garde l'ajout du nouveau produit avec append()." },
            ],
            codeAbsent: [
              { motif: "=\\s*stock\\s*\\.\\s*append", message: "append() modifie la liste et ne renvoie rien : n'affecte pas son résultat." },
            ],
            sortie: "[4, 10, 7, 3]\nTotal : 24",
          },
          felicitation: "Une parenthèse, un décalage, un append() mal employé : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : compte les parenthèses de la dernière ligne.",
            "Ensuite, regarde quel produit a reçu les 10 unités : le deuxième produit n'est pas à l'indice 2.",
            "Enfin, la console affiche <code>None</code> : <code>append()</code> modifie la liste sans rien renvoyer, donc la ligne ne doit pas commencer par <code>stock =</code>.",
          ],
          apres: `<span class="chapo">Pourquoi None ?</span>
            <code>append()</code> modifie la liste <strong>sur place</strong> et ne renvoie
            rien — c'est-à-dire <code>None</code>, la valeur « rien » de Python. Écrire
            <code>stock = stock.append(3)</code> ajoute bien le 3… puis remplace la liste
            par <code>None</code>.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Pas de doublon",
          contenu: `
            <p>On inscrit des élèves à un atelier, sans jamais inscrire deux fois la même
            personne. L'opérateur <code>not in</code> fait l'inverse de <code>in</code> :
            <code>x not in L</code> vaut <code>True</code> quand <code>x</code> n'est
            <strong>pas</strong> dans la liste.</p>
            <p>Complète le programme : à chaque fois, <code>candidat</code> n'est ajouté à
            <code>inscrits</code> que s'il n'y est pas déjà.</p>
            <pre class="bloc-code"><code>['Léa', 'Tom', 'Inès']</code></pre>`,
          depart: `inscrits = ["Léa", "Tom"]\n\ncandidat = "Inès"\n# ajoute candidat à inscrits, sauf s'il y est déjà\n\n\ncandidat = "Tom"\n# même chose\n\n\nprint(inscrits)\n`,
          validation: {
            codeContient: [
              { motif: "\\bin\\s+inscrits\\b[\\s\\S]*\\bin\\s+inscrits\\b", message: "À chaque candidat, teste s'il est déjà dans inscrits, avec un if." },
              { motif: "inscrits\\s*\\.\\s*append\\s*\\(\\s*candidat\\s*\\)[\\s\\S]*inscrits\\s*\\.\\s*append\\s*\\(\\s*candidat\\s*\\)", message: "À chaque fois, ajoute la variable candidat avec append()." },
              { motif: "\\bif\\b", message: "L'ajout ne doit se faire que sous une condition : utilise un if." },
            ],
            sortie: "['Léa', 'Tom', 'Inès']",
          },
          felicitation: "Un test avant chaque ajout : la liste reste sans doublon. ✅",
          indices: [
            "Sous chaque commentaire, un <code>if</code> qui teste si <code>candidat</code> est absent de <code>inscrits</code>.",
            "Dans le bloc du <code>if</code>, indenté, l'ajout de <code>candidat</code> à la liste.",
          ],
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
          titre: "Le podium corrigé",
          contenu: `
            <p>Après visionnage de l'arrivée, le jury inverse les deux premières places.
            Échange le contenu des cases 0 et 1 de <code>podium</code>,
            <strong>sans écrire aucun prénom</strong> : ton programme doit marcher quels que
            soient les coureurs.</p>
            <pre class="bloc-code"><code>['Tom', 'Léa', 'Inès']</code></pre>`,
          depart: `podium = ["Léa", "Tom", "Inès"]\n\n\nprint(podium)\n`,
          validation: {
            codeContient: [
              { motif: "podium\\s*\\[\\s*0\\s*\\]\\s*(=(?!=)|,)", message: "La case 0 doit recevoir une nouvelle valeur." },
              { motif: "podium\\s*\\[\\s*1\\s*\\]\\s*=(?!=)", message: "La case 1 doit recevoir une nouvelle valeur." },
            ],
            codeAbsent: [
              { motif: "[\"']Lea[\"'][\\s\\S]*[\"']Lea[\"']|[\"']Tom[\"'][\\s\\S]*[\"']Tom[\"']", message: "N'écris aucun prénom : échange le contenu des cases." },
            ],
            sortie: "['Tom', 'Léa', 'Inès']",
          },
          felicitation: "L'échange de deux variables marche aussi entre deux cases. 🔄",
          indices: [
            "Si tu écris directement <code>podium[0] = podium[1]</code>, Léa est écrasée avant d'avoir été recopiée.",
            "Comme pour échanger deux variables : mets d'abord le contenu d'une case de côté, dans une variable temporaire.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "La table de multiplication",
          contenu: `
            <p>Écris la fonction <code>table(n)</code>, qui <strong>renvoie</strong> la liste
            des dix premiers multiples de <code>n</code>, de <code>n × 1</code> à
            <code>n × 10</code>.</p>
            <pre class="bloc-code"><code>table(7)    # renvoie [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]
table(1)    # renvoie [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</code></pre>`,
          depart: `def table(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.\\s*append\\s*\\(", message: "Remplis une liste au fil d'une boucle, avec append()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la liste." },
            ],
            tests: `assert table(7) == [7, 14, 21, 28, 35, 42, 49, 56, 63, 70], "table(7) doit renvoyer les dix premiers multiples de 7"\nassert table(1) == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "table(1) doit renvoyer les entiers de 1 à 10"\nassert table(12) == [12, 24, 36, 48, 60, 72, 84, 96, 108, 120], "la fonction doit marcher pour n'importe quel n"`,
          },
          felicitation: "Une fonction qui fabrique et renvoie sa propre liste. ✖️",
          indices: [
            "Dans la fonction : une liste vide, une boucle sur les facteurs de 1 à 10, et un <code>return</code> après la boucle.",
            "La boucle se fait avec <code>range(1, 11)</code> ; à chaque tour, on ajoute le produit de <code>n</code> par la variable de boucle.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta liste qui évolue",
          contenu: `
            <p>À toi de choisir le sujet : ta playlist, tes dépenses de la semaine, les
            scores d'une partie… Écris un programme qui :</p>
            <ul>
              <li>part d'une <strong>liste vide</strong> ;</li>
              <li>la remplit avec <strong>au moins trois</strong> <code>append()</code> ;</li>
              <li><strong>remplace</strong> l'un de ses éléments par son indice ;</li>
              <li>affiche la liste et au moins un résultat calculé par <code>len</code>,
              <code>sum</code>, <code>min</code> ou <code>max</code>.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "=\\s*\\[\\s*\\]", message: "Pars d'une liste vide : ma_liste = []." },
              { motif: "\\.\\s*append\\s*\\([\\s\\S]*\\.\\s*append\\s*\\([\\s\\S]*\\.\\s*append\\s*\\(", message: "Remplis ta liste avec au moins trois append()." },
              { motif: "\\w\\s*\\[[^\\]]+\\]\\s*=(?!=)", message: "Remplace un élément de ta liste : ma_liste[…] = …" },
              { motif: "\\b(len|sum|min|max)\\s*\\(", message: "Affiche au moins un résultat calculé par len, sum, min ou max." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Créée, remplie, modifiée, interrogée : ta liste a vécu toute une vie. ✨",
          indices: [
            "Commence par <code>ma_liste = []</code>, puis trois lignes d'<code>append()</code> avec des valeurs du même type.",
            "Ensuite, une affectation dans une case existante, puis des <code>print</code> pour la liste et pour un calcul.",
          ],
        },
      ],
    },
  ],
};

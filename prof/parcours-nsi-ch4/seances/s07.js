/* NSI — chapitre 4, séance 7 : de l'algorithme au programme.
 * Reprend le TP1 (algorithme d'Euclide : organigramme, pseudo-code, Python)
 * et les conventions du pseudo-code utilisées dans toute la partie 3.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "De l'algorithme au programme",
  sousTitre: "Organigramme, pseudo-code, puis Python : l'algorithme d'Euclide",
  palier: "Partie 3 — Premiers algorithmes",

  accroche: `Il y a plus de deux mille ans, Euclide décrivait une méthode pour calculer le
    plus grand diviseur commun de deux nombres. Il n'avait pas d'ordinateur, et
    pourtant sa méthode est un vrai <strong>algorithme</strong>. Cette séance suit
    le chemin complet : du dessin de la méthode jusqu'au programme qui l'exécute.`,

  objectifs: [
    "dérouler un algorithme à la main, en suivant ses variables",
    "lire un <strong>organigramme</strong> et repérer une itération",
    "écrire et lire un algorithme en <strong>pseudo-code</strong>",
    "traduire un pseudo-code en programme Python",
  ],

  motDeLaFin: `Organigramme, pseudo-code, programme : tu as parcouru les trois étapes qui
    mènent d'une idée à un programme. Toute la suite de la partie présente les
    algorithmes de cette façon, pseudo-code à gauche et Python à droite. À la
    séance 8, on parcourt les tableaux : en entier, ou en s'arrêtant en route.`,

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
          titre: "L'algorithme d'Euclide, en organigramme",
          contenu: `
            <p>Le <strong>PGCD</strong> (plus grand commun diviseur) de deux entiers est le
            plus grand nombre qui les divise tous les deux. Par exemple, PGCD(48, 36) = 12,
            ce qui permet de simplifier la fraction 36/48 en 3/4.</p>

            <p>Voici la méthode d'Euclide, présentée sous forme d'<strong>organigramme</strong> :
            on suit les flèches, de boîte en boîte.</p>

            <svg viewBox="0 0 360 362" role="img" aria-label="Organigramme de l'algorithme d'Euclide : calculer le reste r de a par b ; si r vaut 0, le PGCD est b ; sinon a prend la valeur de b, b celle de r, et on recommence." style="display:block; width:100%; max-width:440px; margin:1rem auto; font-size:16px; font-family:inherit"><defs><marker id="fl-euclide" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs><rect x="50" y="10" width="240" height="52" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="170.0" y="32" text-anchor="middle">a et b : deux entiers</text><text x="170.0" y="50" text-anchor="middle">positifs non nuls</text><polyline points="170,62 170,92" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-euclide)"/><rect x="50" y="94" width="240" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="170.0" y="118" text-anchor="middle">calculer r, le reste de</text><text x="170.0" y="136" text-anchor="middle">la division de a par b</text><polyline points="170,150 170,180" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-euclide)"/><polygon points="170,182 232,220 170,258 108,220" fill="none" stroke="currentColor" stroke-width="2"/><text x="170" y="225" text-anchor="middle">r = 0 ?</text><polyline points="232,220 262,220" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-euclide)"/><text x="247" y="208" text-anchor="middle" font-style="italic">oui</text><rect x="264" y="194" width="90" height="52" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="309.0" y="216" text-anchor="middle">le PGCD</text><text x="309.0" y="234" text-anchor="middle">est b</text><polyline points="170,258 170,294" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-euclide)"/><text x="190" y="282" text-anchor="middle" font-style="italic">non</text><rect x="50" y="296" width="240" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="170.0" y="320" text-anchor="middle">a prend la valeur de b</text><text x="170.0" y="338" text-anchor="middle">b prend la valeur de r</text><polyline points="50,324 20,324 20,122 48,122" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-euclide)"/></svg>

            <div class="encadre">
              <span class="chapo">Définition : algorithme</span>
              Un <strong>algorithme</strong> est une suite finie d'instructions qui permet
              de résoudre un problème. Il ne dépend d'aucun langage : un organigramme, un
              texte ou un programme peuvent décrire le même algorithme.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Le reste d'une division",
          contenu: `
            <p>En Python, l'opérateur <code>%</code> donne le reste de la division
            euclidienne : <code>a % b</code>.</p>
            <p>Affiche le reste de la division de 782 par 221, puis celui de la division
            de 221 par 119 — ce sont les deux premiers calculs de l'algorithme pour
            a = 782 et b = 221 :</p>
            <pre class="bloc-code"><code>119
102</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "782\\s*%\\s*221", message: "Calcule 782 % 221." },
              { motif: "221\\s*%\\s*119", message: "Calcule 221 % 119." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(119|102)\\s*\\)", message: "Les restes doivent être calculés par Python." },
            ],
            sortie: "119\n102",
          },
          felicitation: "% : l'opérateur dont tout l'algorithme dépend. ➗",
          indices: [
            "Deux <code>print</code>, chacun avec un calcul de reste.",
          ],
          solution: `print(782 % 221)\nprint(221 % 119)\n`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "La ligne suivante",
          contenu: `<p>On déroule l'algorithme avec a = 782 et b = 221. Au premier
            passage, on calcule r = 119 :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th><code>a</code></th><th><code>b</code></th><th><code>r</code></th></tr>
              <tr><td>782</td><td>221</td><td>119</td></tr>
              <tr><td>?</td><td>?</td><td>?</td></tr>
            </table>
            </div>`,
          question: "Comme r n'est pas nul, quelle est la ligne suivante ?",
          options: [
            { texte: "a = 221, b = 119, r = 102", correct: true,
              explication: "Oui : a prend la valeur de b (221), b prend la valeur de r (119), puis on recalcule le reste : 221 % 119 = 102." },
            { texte: "a = 119, b = 221, r = 119",
              explication: "a prend la valeur de <strong>b</strong>, et b celle de <strong>r</strong> — pas l'inverse." },
            { texte: "a = 782, b = 119, r = 68",
              explication: "a ne garde pas sa valeur : il prend celle de b." },
            { texte: "a = 221, b = 119, r = 119",
              explication: "Le reste se recalcule avec les nouvelles valeurs : 221 % 119 vaut 102." },
          ],
          apres: `<span class="chapo">Suivre les flèches</span>
            Dans l'organigramme, après « r = 0 ? → non », on remplace a et b, puis la
            flèche nous ramène au calcul du reste : c'est un nouveau passage.`,
        },

        {
          id: "d4",
          type: "qcm",
          titre: "Jusqu'au bout",
          contenu: `<p>Continue le tableau, ligne après ligne, jusqu'à ce que le reste
            soit nul.</p>`,
          question: "Quel est le PGCD de 782 et de 221 ?",
          options: [
            { texte: "0",
              explication: "0 est la valeur de r qui arrête l'algorithme ; le PGCD, lui, est la valeur de b à ce moment-là." },
            { texte: "17", correct: true,
              explication: "Oui : (782, 221, 119), puis (221, 119, 102), puis (119, 102, 17), puis (102, 17, 0). Le reste est nul : le PGCD est le dernier b, soit 17." },
            { texte: "102",
              explication: "On s'arrête quand <strong>r</strong> vaut 0 : il faut encore deux passages." },
            { texte: "1",
              explication: "782 et 221 ont un diviseur commun plus grand que 1 : 782 = 17 × 46 et 221 = 17 × 13." },
          ],
          apres: `<span class="chapo">Le tableau d'évolution complet</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th><code>a</code></th><th><code>b</code></th><th><code>r</code></th></tr>
              <tr><td>782</td><td>221</td><td>119</td></tr>
              <tr><td>221</td><td>119</td><td>102</td></tr>
              <tr><td>119</td><td>102</td><td>17</td></tr>
              <tr><td>102</td><td>17</td><td>0</td></tr>
            </table>
            </div>`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Une boucle, mais laquelle ?",
          contenu: `<p>L'organigramme contient une flèche qui remonte : après avoir
            remplacé a et b, on revient au calcul du reste. C'est la marque d'une
            <strong>itération</strong>, c'est-à-dire d'une boucle.</p>`,
          question: "Quelle boucle traduit le mieux cette flèche de retour ?",
          options: [
            { texte: "une boucle <code>for</code>, car on répète le même calcul",
              explication: "Une boucle <code>for</code> suppose de connaître le nombre de tours à l'avance. Ici, il dépend des nombres de départ." },
            { texte: "une boucle <code>while</code> : tant que le reste n'est pas nul", correct: true,
              explication: "Oui : on ne sait pas à l'avance combien de passages seront nécessaires, seulement quand s'arrêter. C'est une boucle non bornée." },
            { texte: "un <code>if</code>, car il y a un losange",
              explication: "Le losange est bien une condition, mais la flèche qui remonte fait recommencer : un <code>if</code> ne s'exécute qu'une fois." },
            { texte: "aucune : il suffit de calculer le reste une fois",
              explication: "Le tableau précédent a demandé quatre passages : il faut bien répéter." },
          ],
          apres: `<span class="chapo">Boucle bornée ou non bornée</span>
            Quand on connaît le nombre de tours avant de commencer, on choisit
            <code>for</code> ; quand on connaît seulement la condition d'arrêt, on choisit
            <code>while</code>. Ces itérations répètent le même calcul sur des nombres de
            plus en plus petits, jusqu'à tomber sur un reste nul.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Écrire un algorithme en pseudo-code",
          contenu: `
            <p>Le <strong>pseudo-code</strong> décrit un algorithme en langage presque
            naturel, sans dépendre d'un langage de programmation. Nous retiendrons ces
            conventions :</p>

            <ul>
              <li>les <strong>spécifications</strong> (entrées, sortie) sont précisées en
              dehors de l'algorithme ;</li>
              <li>le bloc d'une boucle ou d'une condition est <strong>indenté</strong> ;</li>
              <li>la flèche <code>←</code> note l'<strong>affectation</strong> ;</li>
              <li>les tableaux commencent à 0, et <code>tableau[i]</code> désigne l'élément
              d'indice <code>i</code> ;</li>
              <li>les noms de variables et de fonctions sont <strong>explicites</strong>.</li>
            </ul>

            <pre class="bloc-code"><code>Algorithme somme_carres

Entrée :
    n, un entier positif

total ← 0
Pour i allant de 1 à n :
    total ← total + i × i
Fin Pour

Renvoyer total

Sortie :
    la somme 1² + 2² + … + n²</code></pre>`,
        },

        {
          id: "d7",
          type: "qcm",
          titre: "Le bon pseudo-code",
          contenu: `<p>Voici quatre traductions de l'organigramme d'Euclide en
            pseudo-code. Une seule est juste.</p>`,
          code: `── Version A ──\nr ← reste de a par b\nTant que r ≠ 0 :\n    b ← r\n    a ← b\n    r ← reste de a par b\nFin Tant que\nRenvoyer b\n\n── Version B ──\nr ← reste de a par b\nTant que r ≠ 0 :\n    a ← b\n    b ← r\n    r ← reste de a par b\nFin Tant que\nRenvoyer b\n\n── Version C ──\nr ← reste de a par b\nTant que r ≠ 0 :\n    a ← b\n    b ← r\nFin Tant que\nRenvoyer b\n\n── Version D ──\nr ← reste de a par b\nTant que r ≠ 0 :\n    a ← b\n    b ← r\n    r ← reste de a par b\nFin Tant que\nRenvoyer r`,
          question: "Laquelle est juste ?",
          options: [
            { texte: "la version A",
              explication: "L'ordre des affectations compte : en écrivant <code>b ← r</code> d'abord, l'ancienne valeur de b est perdue, et a reçoit r au lieu de b." },
            { texte: "la version B", correct: true,
              explication: "Oui : a reçoit b, puis b reçoit r, puis on recalcule le reste avec les nouvelles valeurs. C'est la traduction fidèle de l'organigramme." },
            { texte: "la version C",
              explication: "Le reste n'est jamais recalculé dans la boucle : r garde sa valeur, et la condition reste vraie pour toujours. C'est une boucle infinie." },
            { texte: "la version D",
              explication: "On ne sort de la boucle que lorsque r vaut 0 : renvoyer r renverrait toujours 0. Le PGCD est b." },
          ],
          apres: `<span class="chapo">L'algorithme pgcd en pseudo-code</span>
            Chaque boîte de l'organigramme devient une instruction, le losange devient la
            condition du <em>Tant que</em>, et la flèche de retour devient la boucle
            elle-même. Tu traduiras cette version B en Python dans les exercices.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Traduire un pseudo-code",
          contenu: `
            <p>Traduis cet algorithme en une fonction Python
            <code>puissance_de_deux(n)</code>, ligne par ligne :</p>
            <pre class="bloc-code"><code>Algorithme puissance_de_deux

Entrée :
    n, un entier positif non nul

p ← 1
Tant que p &lt; n :
    p ← 2 × p
Fin Tant que

Renvoyer p

Sortie :
    la plus petite puissance de 2 supérieure ou égale à n</code></pre>
            <pre class="bloc-code"><code>puissance_de_deux(5)      # renvoie 8
puissance_de_deux(100)    # renvoie 128</code></pre>`,
          depart: `def puissance_de_deux(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "« Tant que » se traduit par une boucle while." },
              { motif: "\\breturn\\b", message: "« Renvoyer » se traduit par return." },
            ],
            tests: `assert puissance_de_deux(5) == 8, "puissance_de_deux(5) doit renvoyer 8"\nassert puissance_de_deux(100) == 128, "puissance_de_deux(100) doit renvoyer 128"\nassert puissance_de_deux(8) == 8, "8 est déjà une puissance de 2 : la fonction doit renvoyer 8"\nassert puissance_de_deux(1) == 1, "puissance_de_deux(1) doit renvoyer 1"`,
          },
          felicitation: "Une ligne de pseudo-code, une ligne de Python. 🔤",
          indices: [
            "<code>←</code> devient <code>=</code>, « Tant que » devient <code>while</code> suivi de deux-points, « Renvoyer » devient <code>return</code>.",
            "Le <code>return</code> se place après la boucle, au niveau du <code>while</code> — comme « Renvoyer » se trouve après « Fin Tant que ».",
          ],
          solution: `def puissance_de_deux(n):\n    p = 1\n    while p < n:\n        p = 2 * p\n    return p\n`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <p>Trois étapes mènent d'une idée à un programme : un
            <strong>organigramme</strong> qui décrit la méthode visuellement, un
            <strong>pseudo-code</strong> indépendant de tout langage, et un
            <strong>programme</strong> exécutable. L'algorithme est la méthode ; le
            programme n'en est qu'une traduction.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pseudo-code</th><th>Python</th></tr>
              <tr><td><code>x ← 0</code></td><td><code>x = 0</code></td></tr>
              <tr><td><code>Tant que condition :</code> … <code>Fin Tant que</code></td><td><code>while condition:</code> + bloc indenté</td></tr>
              <tr><td><code>Pour i allant de 0 à n - 1 :</code></td><td><code>for i in range(n):</code></td></tr>
              <tr><td><code>Pour chaque élément du tableau :</code></td><td><code>for element in tableau:</code></td></tr>
              <tr><td><code>Si … :</code> … <code>Sinon :</code></td><td><code>if …:</code> … <code>else:</code></td></tr>
              <tr><td><code>Renvoyer x</code></td><td><code>return x</code></td></tr>
              <tr><td><code>a = b</code>, <code>a ≠ b</code></td><td><code>a == b</code>, <code>a != b</code></td></tr>
              <tr><td>reste de a par b</td><td><code>a % b</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>inverser deux affectations qui dépendent l'une de l'autre : une valeur est écrasée avant d'avoir servi ;</li>
                <li>oublier de mettre à jour, dans la boucle, la variable de la condition : boucle infinie ;</li>
                <li>placer le <code>return</code> dans la boucle au lieu de après.</li>
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
          titre: "Euclide en Python",
          contenu: `
            <p>Traduis l'algorithme d'Euclide en une fonction Python
            <code>pgcd(a, b)</code>. Voici son pseudo-code :</p>
            <pre class="bloc-code"><code>Algorithme pgcd

Entrées :
    a, b : deux entiers positifs non nuls

r ← reste de la division de a par b
Tant que r ≠ 0 :
    a ← b
    b ← r
    r ← reste de la division de a par b
Fin Tant que

Renvoyer b

Sortie :
    le PGCD de a et de b</code></pre>
            <pre class="bloc-code"><code>pgcd(782, 221)    # renvoie 17
pgcd(48, 36)      # renvoie 12</code></pre>`,
          depart: `def pgcd(a, b):\n    pass\n\n\n# print(pgcd(782, 221))\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "« Tant que » se traduit par une boucle while." },
              { motif: "%", message: "Le reste de la division se calcule avec %." },
            ],
            tests: `assert pgcd(782, 221) == 17, "pgcd(782, 221) doit renvoyer 17, comme dans ton tableau"\nassert pgcd(48, 36) == 12, "pgcd(48, 36) doit renvoyer 12"\nassert pgcd(17, 5) == 1, "17 et 5 n'ont que 1 comme diviseur commun"\nassert pgcd(9, 9) == 9, "le PGCD d'un nombre et de lui-même est ce nombre"\nassert pgcd(100, 25) == 25, "25 divise 100 : pgcd(100, 25) doit renvoyer 25"`,
          },
          felicitation: "Un algorithme de plus de deux mille ans, en six lignes de Python. 🏛️",
          indices: [
            "Traduis ligne par ligne : chaque <code>←</code> devient un <code>=</code>, et « reste de a par b » devient <code>a % b</code>.",
            "Dans la boucle, garde l'ordre du pseudo-code : a reçoit b, b reçoit r, puis le reste est recalculé. Le <code>return</code> vient après la boucle.",
          ],
          solution: `def pgcd(a, b):\n    r = a % b\n    while r != 0:\n        a = b\n        b = r\n        r = a % b\n    return b\n\n\n# print(pgcd(782, 221))\n`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Et dans l'autre sens ?",
          contenu: `<p>On appelle maintenant <code>pgcd(221, 782)</code> : le plus petit
            nombre est donné en premier.</p>`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "une erreur, car a doit être plus grand que b",
              explication: "Rien dans l'algorithme n'exige que a soit le plus grand : le calcul du reste a toujours un sens." },
            { texte: "au premier passage, r vaut 221 ; les nombres s'échangent, et la fonction renvoie 17", correct: true,
              explication: "Oui : 221 % 782 vaut 221, car 221 est plus petit que 782. On affecte alors a = 782 et b = 221 : l'algorithme s'est remis tout seul dans le bon ordre, au prix d'un passage de plus." },
            { texte: "la fonction renvoie 221",
              explication: "Le reste n'est pas nul au premier passage : la boucle tourne, et le calcul continue jusqu'à 17." },
            { texte: "la boucle ne s'arrête jamais",
              explication: "Le reste diminue à chaque passage à partir du deuxième : il finit forcément par valoir 0." },
          ],
          apres: `<span class="chapo">Un algorithme qui se remet en ordre</span>
            Le PGCD ne dépend pas de l'ordre des deux nombres, et l'algorithme non plus :
            aucun test préalable n'est nécessaire.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Simplifier une fraction",
          contenu: `
            <p>La fonction <code>pgcd</code> est déjà écrite. Écris la fonction
            <code>simplifier(numerateur, denominateur)</code>, qui renvoie la fraction
            simplifiée sous la forme d'une <strong>liste</strong>
            <code>[numérateur, dénominateur]</code>.</p>
            <pre class="bloc-code"><code>simplifier(36, 48)    # renvoie [3, 4]
simplifier(10, 5)     # renvoie [2, 1]</code></pre>
            <p>Pour simplifier une fraction, on divise son numérateur et son dénominateur
            par leur PGCD.</p>`,
          depart: `def pgcd(a, b):\n    r = a % b\n    while r != 0:\n        a = b\n        b = r\n        r = a % b\n    return b\n\n\ndef simplifier(numerateur, denominateur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+simplifier[\\s\\S]*\\bpgcd\\s*\\(", message: "simplifier doit appeler la fonction pgcd." },
              { motif: "//", message: "Les termes de la fraction sont des entiers : divise avec //." },
            ],
            tests: `assert simplifier(36, 48) == [3, 4], "simplifier(36, 48) doit renvoyer [3, 4]"\nassert simplifier(10, 5) == [2, 1], "simplifier(10, 5) doit renvoyer [2, 1]"\nassert simplifier(7, 13) == [7, 13], "une fraction déjà simplifiée reste la même"\nassert simplifier(782, 221) == [46, 13], "simplifier(782, 221) doit renvoyer [46, 13]"`,
          },
          felicitation: "Euclide au service des fractions. ½",
          indices: [
            "Calcule d'abord le PGCD des deux nombres, et range-le dans une variable.",
            "La fonction renvoie une liste de deux éléments : chacun est un terme de la fraction, divisé par ce PGCD avec <code>//</code>.",
          ],
          solution: `def pgcd(a, b):\n    r = a % b\n    while r != 0:\n        a = b\n        b = r\n        r = a % b\n    return b\n\n\ndef simplifier(numerateur, denominateur):\n    d = pgcd(numerateur, denominateur)\n    return [numerateur // d, denominateur // d]\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : la somme des entiers",
          contenu: `
            <p>Cette fonction devrait renvoyer la somme 1 + 2 + … + n, en suivant cet
            algorithme :</p>
            <pre class="bloc-code"><code>total ← 0
i ← 1
Tant que i ≤ n :
    total ← total + i
    i ← i + 1
Fin Tant que
Renvoyer total</code></pre>
            <p>Le programme devrait afficher <code>10</code>. La traduction contient
            <strong>trois erreurs</strong>, de natures différentes : retrouve-les en
            comparant chaque ligne au pseudo-code.</p>`,
          depart: `def somme_entiers(n):\n    total = 0\n    i = 1\n    while i < n:\n        total = total + i\n        return total\n\n\nprint(somme_entiers(4))\n`,
          validation: {
            codeContient: [
              { motif: "\\bi\\s*(\\+=|=\\s*i\\s*\\+)\\s*1", message: "Dans la boucle, i doit augmenter de 1 à chaque tour." },
            ],
            codeAbsent: [
              { motif: "\\n {8,}return\\b", message: "Le return est dans la boucle : il doit venir après." },
            ],
            sortie: "10",
            tests: `assert somme_entiers(4) == 10, "somme_entiers(4) doit renvoyer 1 + 2 + 3 + 4 = 10"\nassert somme_entiers(1) == 1, "somme_entiers(1) doit renvoyer 1"\nassert somme_entiers(100) == 5050, "somme_entiers(100) doit renvoyer 5050"`,
          },
          felicitation: "Un return mal placé, un oubli, une inégalité trop stricte : réparés. 🐞",
          indices: [
            "Le programme affiche 1 : le <code>return</code> est indenté dans la boucle, la fonction s'arrête au premier tour.",
            "Une fois ce <code>return</code> remis à sa place, le programme ne s'arrête plus : une ligne du pseudo-code n'a pas été traduite.",
            "Enfin, le résultat vaut 6 au lieu de 10 : compare la condition du <code>while</code> à celle du pseudo-code, « i ≤ n ».",
          ],
          solution: `def somme_entiers(n):\n    total = 0\n    i = 1\n    while i <= n:\n        total = total + i\n        i = i + 1\n    return total\n\n\nprint(somme_entiers(4))\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Les chiffres d'un nombre",
          contenu: `
            <p>Traduis cet algorithme en une fonction Python <code>chiffres(n)</code>. Elle
            renvoie la liste des chiffres de <code>n</code>, en commençant par celui des
            unités :</p>
            <pre class="bloc-code"><code>Algorithme chiffres

Entrée :
    n, un entier positif non nul

liste ← tableau vide
Tant que n > 0 :
    Ajouter (reste de n par 10) à liste
    n ← quotient entier de n par 10
Fin Tant que

Renvoyer liste</code></pre>
            <pre class="bloc-code"><code>chiffres(2026)    # renvoie [6, 2, 0, 2]</code></pre>`,
          depart: `def chiffres(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "« Tant que » se traduit par une boucle while." },
              { motif: "\\.\\s*append\\s*\\(", message: "« Ajouter à liste » se traduit par append()." },
              { motif: "//\\s*10", message: "Le quotient entier par 10 se calcule avec // 10." },
            ],
            tests: `assert chiffres(2026) == [6, 2, 0, 2], "chiffres(2026) doit renvoyer [6, 2, 0, 2]"\nassert chiffres(7) == [7], "chiffres(7) doit renvoyer [7]"\nassert chiffres(530) == [0, 3, 5], "chiffres(530) doit renvoyer [0, 3, 5]"\nassert chiffres(10000) == [0, 0, 0, 0, 1], "chiffres(10000) doit renvoyer [0, 0, 0, 0, 1]"`,
          },
          felicitation: "Un algorithme qui remplit une liste : la partie 3 commence pour de bon. 🔢",
          indices: [
            "« tableau vide » devient <code>[]</code>, « Ajouter … à liste » devient un <code>append()</code>.",
            "Le reste de <code>n</code> par 10 donne le chiffre des unités ; le quotient entier de <code>n</code> par 10 l'efface.",
          ],
          solution: `def chiffres(n):\n    liste = []\n    while n > 0:\n        liste.append(n % 10)\n        n = n // 10\n    return liste\n`,
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
          titre: "La suite de Syracuse",
          contenu: `
            <p>Voici un organigramme célèbre : on part d'un entier n, et on recommence
            jusqu'à tomber sur 1.</p>
            <svg viewBox="0 0 360 376" role="img" aria-label="Organigramme de la suite de Syracuse : tant que n est différent de 1, n devient n ÷ 2 s'il est pair, 3 × n + 1 sinon." style="display:block; width:100%; max-width:440px; margin:1rem auto; font-size:16px; font-family:inherit"><defs><marker id="fl-syracuse" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs><rect x="100" y="10" width="160" height="44" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="180.0" y="37" text-anchor="middle">n : un entier > 0</text><polyline points="180,54 180,84" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/><polygon points="180,86 242,122 180,158 118,122" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="127" text-anchor="middle">n = 1 ?</text><polyline points="242,122 272,122" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/><text x="257" y="110" text-anchor="middle" font-style="italic">oui</text><rect x="274" y="102" width="70" height="40" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="309.0" y="127" text-anchor="middle">fin</text><polyline points="180,158 180,190" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/><text x="200" y="178" text-anchor="middle" font-style="italic">non</text><polygon points="180,192 246,228 180,264 114,228" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="233" text-anchor="middle">n pair ?</text><polyline points="114,228 90,228 90,284" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/><text x="98" y="216" text-anchor="middle" font-style="italic">oui</text><polyline points="246,228 270,228 270,284" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/><text x="262" y="216" text-anchor="middle" font-style="italic">non</text><rect x="30" y="286" width="120" height="44" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="90.0" y="313" text-anchor="middle">n ← n ÷ 2</text><rect x="205" y="286" width="130" height="44" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="270.0" y="313" text-anchor="middle">n ← 3 × n + 1</text><polyline points="270,330 270,364 90,364" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="90,330 90,364 12,364 12,122 116,122" fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#fl-syracuse)"/></svg>
            <p>Écris la fonction <code>syracuse(n)</code>, qui renvoie la
            <strong>liste</strong> de toutes les valeurs prises par n, de la valeur de
            départ jusqu'à 1 compris.</p>
            <pre class="bloc-code"><code>syracuse(6)    # renvoie [6, 3, 10, 5, 16, 8, 4, 2, 1]</code></pre>`,
          depart: `def syracuse(n):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "On ne sait pas combien de tours il faudra : utilise une boucle while." },
              { motif: "\\.\\s*append\\s*\\(", message: "Range chaque valeur dans la liste avec append()." },
            ],
            tests: `assert syracuse(6) == [6, 3, 10, 5, 16, 8, 4, 2, 1], "syracuse(6) doit renvoyer [6, 3, 10, 5, 16, 8, 4, 2, 1]"\nassert syracuse(1) == [1], "en partant de 1, la liste ne contient que 1"\nassert syracuse(4) == [4, 2, 1], "syracuse(4) doit renvoyer [4, 2, 1]"\nassert len(syracuse(27)) == 112, "en partant de 27, la suite prend 112 valeurs avant d'arriver à 1"`,
          },
          felicitation: "Personne n'a jamais prouvé que cette boucle s'arrête toujours… mais elle s'est arrêtée. 🌀",
          indices: [
            "Range d'abord la valeur de départ dans la liste ; puis, tant que n est différent de 1, calcule la valeur suivante et range-la.",
            "n est pair quand <code>n % 2 == 0</code> ; pour la moitié, utilise <code>//</code> afin de garder un entier.",
          ],
          solution: `def syracuse(n):\n    valeurs = [n]\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = 3 * n + 1\n        valeurs.append(n)\n    return valeurs\n`,
          apres: `<span class="chapo">Une conjecture ouverte</span>
            Tous les nombres essayés finissent par arriver à 1, mais personne n'a jamais
            réussi à démontrer que c'est toujours le cas. C'est la <strong>conjecture de
            Syracuse</strong> : on ne sait pas prouver que cet algorithme se termine pour
            tout entier.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le PPCM",
          contenu: `
            <p>Le <strong>PPCM</strong> (plus petit commun multiple) de deux entiers est
            le plus petit nombre non nul qui soit multiple des deux. Il se calcule à partir
            du PGCD :</p>
            <pre class="bloc-code"><code>PPCM(a, b) = a × b ÷ PGCD(a, b)</code></pre>
            <p>La fonction <code>pgcd</code> est déjà écrite. Écris la fonction
            <code>ppcm(a, b)</code>, qui renvoie un entier.</p>
            <pre class="bloc-code"><code>ppcm(4, 6)     # renvoie 12
ppcm(21, 6)    # renvoie 42</code></pre>`,
          depart: `def pgcd(a, b):\n    r = a % b\n    while r != 0:\n        a = b\n        b = r\n        r = a % b\n    return b\n\n\ndef ppcm(a, b):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+ppcm[\\s\\S]*\\bpgcd\\s*\\(", message: "ppcm doit appeler la fonction pgcd." },
            ],
            tests: `assert ppcm(4, 6) == 12, "ppcm(4, 6) doit renvoyer 12"\nassert ppcm(21, 6) == 42, "ppcm(21, 6) doit renvoyer 42"\nassert ppcm(5, 7) == 35, "ppcm(5, 7) doit renvoyer 35"\nassert ppcm(3, 3) == 3, "ppcm(3, 3) doit renvoyer 3"\nassert type(ppcm(4, 6)) == int, "ppcm doit renvoyer un entier : utilise la division entière //"`,
          },
          felicitation: "Un algorithme qui en appelle un autre. 🔗",
          indices: [
            "Une seule ligne suffit : le produit de a et de b, divisé par leur PGCD.",
            "Pour obtenir un entier, la division doit être la division entière <code>//</code>.",
          ],
          solution: `def pgcd(a, b):\n    r = a % b\n    while r != 0:\n        a = b\n        b = r\n        r = a % b\n    return b\n\n\ndef ppcm(a, b):\n    return a * b // pgcd(a, b)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre algorithme",
          contenu: `
            <p>Invente un algorithme qui utilise une <strong>boucle non bornée</strong>,
            puis traduis-le en Python. Quelques idées : combien d'années faut-il pour
            doubler une somme placée à 5 % par an ? Combien de fois peut-on diviser un
            nombre par 2 avant d'arriver sous 1 ?</p>
            <ul>
              <li>écris une fonction qui contient une boucle <code>while</code> et renvoie
              un résultat avec <code>return</code> ;</li>
              <li>appelle-la et affiche le résultat.</li>
            </ul>`,
          depart: `# Ton algorithme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\s+\\w+\\s*\\(", message: "Écris une fonction avec def." },
              { motif: "\\bwhile\\b", message: "Ton algorithme doit utiliser une boucle while." },
              { motif: "\\breturn\\b", message: "Ta fonction doit renvoyer son résultat avec return." },
              { motif: "\\bprint\\s*\\(", message: "Appelle ta fonction et affiche le résultat." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ton idée, ton algorithme, ton programme. ✨",
          indices: [
            "Commence par écrire ton algorithme en pseudo-code dans un commentaire : la condition du « Tant que », et ce qui change à chaque tour.",
            "Traduis-le ensuite ligne par ligne dans une fonction, et termine par un <code>print</code> qui l'appelle.",
          ],
          solution: `def annees_pour_doubler(somme):\n    objectif = 2 * somme\n    annees = 0\n    while somme < objectif:\n        somme = somme * 1.05\n        annees = annees + 1\n    return annees\n\n\nprint("Il faut", annees_pour_doubler(1000), "ans pour doubler la somme.")\n`,
        },
      ],
    },
  ],
};

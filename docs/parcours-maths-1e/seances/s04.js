/* Maths Première — séance 4 : les fonctions.
 * Rappels de Seconde : def, paramètres, return, la différence entre return et
 * print, une fonction qui contient un if ou une boucle.
 * Fil rouge maths : f(x), delta(a, b, c), u(n) explicite, terme(n) récurrent,
 * tableau de valeurs, seuil, factorielle.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "Les fonctions",
  sousTitre: "def et return : des calculs réutilisables",
  palier: "Partie 1 — Les rappels de Seconde",

  accroche: `En maths, une fonction associe à chaque nombre <em>x</em> son image
    <em>f</em>(<em>x</em>). En Python, c'est la même idée : on écrit le calcul
    <strong>une fois</strong>, on lui donne un nom, et on l'utilise ensuite avec n'importe
    quelle valeur. Fini les programmes à modifier ligne par ligne pour changer de
    nombre.`,

  objectifs: [
    "définir une fonction avec <code>def</code>, et renvoyer un résultat avec <code>return</code>",
    "appeler une fonction, avec un ou plusieurs arguments",
    "faire la différence entre <strong>renvoyer</strong> (<code>return</code>) et <strong>afficher</strong> (<code>print</code>)",
    "écrire une fonction qui contient un <code>if</code> ou une boucle",
  ],

  motDeLaFin: `C'est la fin des rappels : afficher, calculer, décider, répéter, et ranger tout
    cela dans des fonctions. Tu as tous les outils pour la suite. À la séance 5, on
    découvre les <strong>listes</strong>, qui rangent plusieurs valeurs dans une seule
    variable — par exemple tous les termes d'une suite.`,

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
            <p>La fonction <em>f</em> : <em>x</em> ↦ 3<em>x</em>² − 5<em>x</em> + 2 de
            la séance 1 s'écrit ainsi en Python :</p>

            <pre class="bloc-code"><code>def f(x):
    return 3 * x ** 2 - 5 * x + 2

print(f(4))      # affiche 30
print(f(-1))     # affiche 10</code></pre>

            <ul>
              <li><code>def</code> (pour <em>define</em>) annonce la définition, suivie du
              <strong>nom</strong> de la fonction, de son <strong>paramètre</strong> entre
              parenthèses, et de deux points ;</li>
              <li><code>return</code> (« renvoyer ») indique le résultat de la fonction :
              c'est l'image ;</li>
              <li>le corps de la fonction est décalé, comme un bloc de <code>if</code>.</li>
            </ul>

            <div class="encadre">
              <span class="chapo">Définir, puis appeler</span>
              Les lignes <code>def … return</code> ne calculent rien : elles
              <strong>apprennent</strong> à Python ce qu'est <em>f</em>. Le calcul a lieu
              quand on <strong>appelle</strong> la fonction : <code>f(4)</code> remplace
              <code>x</code> par 4 et vaut 30.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Deux appels",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `def carre(x):\n    return x * x\n\nprint(carre(3) + carre(4))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>49</code>",
              explication: "Ce serait le carré de 3 + 4. Ici, on additionne deux carrés." },
            { texte: "<code>25</code>", correct: true,
              explication: "Oui : carre(3) vaut 9, carre(4) vaut 16, et 9 + 16 = 25." },
            { texte: "<code>9</code> puis <code>16</code>",
              explication: "Il n'y a qu'un print : il affiche la somme des deux résultats." },
            { texte: "rien, car on n'a pas donné de valeur à x",
              explication: "x reçoit sa valeur à chaque appel : 3 au premier, 4 au second." },
          ],
          apres: `<span class="chapo">Un résultat comme un autre</span>
            Ce que renvoie une fonction s'utilise comme un nombre : on peut l'additionner,
            l'afficher, le ranger dans une variable. Et le paramètre <code>x</code> prend
            une nouvelle valeur à chaque appel.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Ta première fonction",
          contenu: `
            <p>Définis la fonction <code>g</code> qui, à tout nombre <em>x</em>, associe
            <strong><em>g</em>(<em>x</em>) = <em>x</em>² − 4<em>x</em> + 1</strong>.
            Puis affiche <em>g</em>(5) :</p>
            <pre class="bloc-code"><code>6</code></pre>`,
          depart: `def g(x):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer l'image avec return." },
              { motif: "print\\s*\\(\\s*g\\s*\\(\\s*5\\s*\\)\\s*\\)", message: "Affiche g(5) en appelant la fonction." },
            ],
            sortie: "6",
            tests: `assert g(5) == 6, "g(5) doit valoir 25 - 20 + 1 = 6"\nassert g(0) == 1, "g(0) doit valoir 1"\nassert g(-1) == 6, "g(-1) doit valoir 1 + 4 + 1 = 6"\nassert g(2) == -3, "g(2) doit valoir 4 - 8 + 1 = -3"`,
          },
          felicitation: "Une fonction mathématique, devenue une fonction Python. 📈",
          indices: [
            "Remplace <code>pass</code> par une ligne <code>return</code> suivie de l'expression de <em>g</em>(<em>x</em>), écrite en Python.",
            "<em>x</em>² s'écrit <code>x ** 2</code> et 4<em>x</em> s'écrit <code>4 * x</code>. Garde le décalage de quatre espaces devant <code>return</code>.",
            "Après la fonction, revenu tout à gauche : un <code>print</code> qui reçoit l'appel <code>g(5)</code>.",
          ],
          solution: `def g(x):\n    return x ** 2 - 4 * x + 1\n\nprint(g(5))\n`,
          apres: `<span class="chapo">Une fonction vérifiée sur plusieurs valeurs</span>
            La page a aussi testé <em>g</em>(0), <em>g</em>(−1) et <em>g</em>(2) : une
            fonction, c'est un calcul qui doit marcher pour <strong>tous</strong> les
            nombres, pas seulement pour celui qu'on affiche.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "return n'est pas print",
          contenu: `
            <p>Deux fonctions qui se ressemblent, mais pas du tout pour Python :</p>

            <pre class="bloc-code"><code>def triple_renvoie(x):
    return 3 * x       # donne le résultat au programme

def triple_affiche(x):
    print(3 * x)       # montre le résultat à l'écran, et c'est tout</code></pre>

            <ul>
              <li><code>return</code> <strong>renvoie</strong> le résultat : on peut le
              ranger dans une variable, l'utiliser dans un calcul, le comparer… ;</li>
              <li><code>print</code> l'<strong>affiche</strong> : un humain le voit, mais
              le programme ne peut plus s'en servir.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La règle</span>
              Une fonction qui calcule quelque chose le <strong>renvoie</strong> avec
              <code>return</code>. L'affichage se fait à l'extérieur, au moment où on en a
              besoin : <code>print(triple_renvoie(5))</code>.
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Une fonction qui affiche",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `def double(x):\n    print(2 * x)\n\ny = double(3)\nprint(y)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>6</code>",
              explication: "Le 6 est bien affiché, par le print de la fonction. Mais il y a un second print." },
            { texte: "<code>6</code> puis <code>6</code>",
              explication: "La fonction affiche 6, mais ne le renvoie pas : y ne reçoit pas 6." },
            { texte: "<code>6</code> puis <code>None</code>", correct: true,
              explication: "Oui : l'appel affiche 6, mais la fonction n'a pas de return. Elle renvoie donc « rien », que Python note None, et c'est ce que contient y." },
            { texte: "une erreur",
              explication: "Le programme fonctionne… mais pas comme on l'espérait." },
          ],
          apres: `<span class="chapo">None : le signe d'un return oublié</span>
            Quand tu vois <code>None</code> s'afficher là où tu attendais un nombre,
            cherche la fonction qui affiche au lieu de renvoyer.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Plusieurs paramètres",
          contenu: `
            <p>Une fonction peut avoir plusieurs paramètres, séparés par des virgules.
            Par exemple, l'aire d'un trapèze de bases <em>B</em> et <em>b</em> et de
            hauteur <em>h</em> :</p>

            <pre class="bloc-code"><code>def aire_trapeze(B, b, h):
    return (B + b) * h / 2

print(aire_trapeze(10, 6, 3))    # B = 10, b = 6, h = 3 : affiche 24.0</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre compte</span>
              À l'appel, les valeurs sont attribuées aux paramètres <strong>dans
              l'ordre</strong> : la première à <code>B</code>, la deuxième à
              <code>b</code>, la troisième à <code>h</code>.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "La fonction delta",
          contenu: `
            <p>Écris la fonction <code>delta(a, b, c)</code> qui renvoie le discriminant
            <em>b</em>² − 4<em>ac</em> du trinôme <em>ax</em>² + <em>bx</em> + <em>c</em>.
            Puis affiche le discriminant de 2<em>x</em>² − 3<em>x</em> − 5 :</p>
            <pre class="bloc-code"><code>49</code></pre>`,
          depart: `def delta(a, b, c):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le discriminant avec return." },
              { motif: "print\\s*\\(\\s*delta\\s*\\(\\s*2\\s*,\\s*-\\s*3\\s*,\\s*-\\s*5\\s*\\)\\s*\\)", message: "Affiche delta(2, -3, -5), dans cet ordre." },
            ],
            codeAbsent: [
              { motif: "\\b49\\b", message: "Le discriminant doit être calculé par la fonction." },
            ],
            sortie: "49",
            tests: `assert delta(2, -3, -5) == 49, "delta(2, -3, -5) doit valoir 9 + 40 = 49"\nassert delta(1, 2, 5) == -16, "delta(1, 2, 5) doit valoir 4 - 20 = -16"\nassert delta(1, -2, 1) == 0, "delta(1, -2, 1) doit valoir 0"`,
          },
          felicitation: "delta(a, b, c) : la formule du cours, utilisable pour tous les trinômes. 🎯",
          indices: [
            "Le corps de la fonction tient en une ligne : <code>return</code>, suivi de la formule de Δ en Python.",
            "À l'appel, les trois coefficients se donnent dans l'ordre <em>a</em>, <em>b</em>, <em>c</em>, séparés par des virgules.",
          ],
          solution: `def delta(a, b, c):\n    return b ** 2 - 4 * a * c\n\nprint(delta(2, -3, -5))\n`,
          apres: `<span class="chapo">Plus besoin de modifier le programme</span>
            À la séance 2, pour changer de trinôme, il fallait réécrire les lignes
            <code>a = …</code>, <code>b = …</code>, <code>c = …</code>. Maintenant,
            <code>delta(1, 2, 5)</code> suffit.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Une suite explicite",
          contenu: `
            <p>La suite géométrique de premier terme 5 et de raison 3 a pour terme
            général <strong><em>u<sub>n</sub></em> = 5 × 3<sup><em>n</em></sup></strong>.</p>
            <p>Écris la fonction <code>u(n)</code> qui renvoie ce terme, puis affiche
            <em>u</em><sub>4</sub> :</p>
            <pre class="bloc-code"><code>405</code></pre>`,
          depart: `def u(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le terme avec return." },
              { motif: "\\*\\*\\s*n\\b", message: "3 puissance n s'écrit 3 ** n." },
              { motif: "print\\s*\\(\\s*u\\s*\\(\\s*4\\s*\\)\\s*\\)", message: "Affiche u(4) en appelant la fonction." },
            ],
            codeAbsent: [
              { motif: "\\b405\\b", message: "Le terme doit être calculé par la fonction." },
            ],
            sortie: "405",
            tests: `assert u(0) == 5, "u(0) doit valoir 5, le premier terme"\nassert u(1) == 15, "u(1) doit valoir 15"\nassert u(10) == 295245, "u(10) doit valoir 5 × 3^10 = 295245"`,
          },
          felicitation: "Avec la forme explicite, un terme se calcule directement, sans boucle. ⚡",
          indices: [
            "Le paramètre s'appelle <code>n</code> : la fonction renvoie 5 fois 3 puissance <code>n</code>.",
            "La puissance s'écrit <code>**</code>. Puis, hors de la fonction, un <code>print</code> de l'appel <code>u(4)</code>.",
          ],
          solution: `def u(n):\n    return 5 * 3 ** n\n\nprint(u(4))\n`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Des if et des boucles dans une fonction",
          contenu: `
            <p>Le corps d'une fonction peut contenir tout ce que tu connais : des
            variables, des <code>if</code>, des boucles. Le <code>return</code> peut
            même apparaître plusieurs fois :</p>

            <pre class="bloc-code"><code>def valeur_absolue(x):
    if x &lt; 0:
        return -x
    else:
        return x

print(valeur_absolue(-7.5))    # affiche 7.5</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">return arrête la fonction</span>
              Dès qu'un <code>return</code> est exécuté, la fonction s'arrête et renvoie
              sa valeur : les lignes suivantes de la fonction ne sont pas lues. Attention
              donc aux décalages : chaque ligne doit être dans le bon bloc.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Combien de racines ?",
          contenu: `
            <p>La fonction <code>delta</code> est déjà écrite. Écris la fonction
            <code>nb_racines(a, b, c)</code> qui <strong>renvoie</strong> le nombre de
            racines réelles du trinôme : 2, 1 ou 0. Elle doit utiliser
            <code>delta</code>.</p>
            <pre class="bloc-code"><code>nb_racines(1, -5, 6)    # renvoie 2
nb_racines(1, -2, 1)    # renvoie 1
nb_racines(1, 2, 5)     # renvoie 0</code></pre>
            <p>Termine en affichant <code>nb_racines(1, -5, 6)</code>.</p>`,
          depart: `def delta(a, b, c):\n    return b ** 2 - 4 * a * c\n\n\ndef nb_racines(a, b, c):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdelta\\s*\\(\\s*a\\s*,\\s*b\\s*,\\s*c\\s*\\)", message: "Dans nb_racines, calcule le discriminant en appelant delta(a, b, c)." },
              { motif: "\\bif\\b", message: "Le nombre de racines dépend du signe de Δ : il faut un if." },
              { motif: "print\\s*\\(\\s*nb_racines\\s*\\(\\s*1\\s*,\\s*-\\s*5\\s*,\\s*6\\s*\\)\\s*\\)", message: "Termine en affichant nb_racines(1, -5, 6)." },
            ],
            sortie: "2",
            tests: `assert nb_racines(1, -5, 6) == 2, "x² - 5x + 6 a deux racines : la fonction doit renvoyer 2"\nassert nb_racines(1, -2, 1) == 1, "x² - 2x + 1 a une racine double : la fonction doit renvoyer 1"\nassert nb_racines(1, 2, 5) == 0, "x² + 2x + 5 n'a pas de racine réelle : la fonction doit renvoyer 0"\nassert nb_racines(-1, 0, 4) == 2, "-x² + 4 a deux racines : la fonction doit renvoyer 2"`,
          },
          felicitation: "Une fonction qui en appelle une autre : chacune fait une seule chose. 🧩",
          indices: [
            "Commence par ranger le discriminant dans une variable : <code>d</code> reçoit l'appel <code>delta(a, b, c)</code>.",
            "Puis la structure de la séance 2 : <code>if</code>, <code>elif</code>, <code>else</code> sur le signe de <code>d</code>. Mais au lieu d'afficher une phrase, chaque bloc <strong>renvoie</strong> un nombre.",
            "Les trois blocs : <code>return 2</code> si <code>d &gt; 0</code>, <code>return 1</code> si <code>d == 0</code>, <code>return 0</code> sinon. Ils sont décalés de huit espaces.",
          ],
          solution: `def delta(a, b, c):\n    return b ** 2 - 4 * a * c\n\n\ndef nb_racines(a, b, c):\n    d = delta(a, b, c)\n    if d > 0:\n        return 2\n    elif d == 0:\n        return 1\n    else:\n        return 0\n\nprint(nb_racines(1, -5, 6))\n`,
          apres: `<span class="chapo">Testée sur quatre trinômes</span>
            La page a vérifié tes trois cas, plus −<em>x</em>² + 4. C'est tout l'intérêt
            d'une fonction : on peut la tester sur autant d'exemples qu'on veut, sans
            toucher à son code.`,
        },

        {
          id: "d11",
          type: "code",
          titre: "Le terme de rang n",
          contenu: `
            <p>Pour la suite récurrente <em>u</em><sub>0</sub> = 3,
            <em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 1, il n'y a
            pas de formule directe à disposition : il faut une boucle.</p>
            <p>Écris la fonction <code>terme(n)</code> qui renvoie
            <em>u<sub>n</sub></em>, puis affiche <em>u</em><sub>10</sub> :</p>
            <pre class="bloc-code"><code>4095</code></pre>`,
          depart: `def terme(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*n\\s*\\)", message: "Pour aller de u0 à u(n), il faut n tours : range(n)." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le terme avec return." },
              { motif: "print\\s*\\(\\s*terme\\s*\\(\\s*10\\s*\\)\\s*\\)", message: "Affiche terme(10)." },
            ],
            codeAbsent: [
              { motif: "\\b4095\\b", message: "Le terme doit être calculé par la fonction." },
            ],
            sortie: "4095",
            tests: `assert terme(0) == 3, "terme(0) doit renvoyer u0 = 3"\nassert terme(1) == 7, "terme(1) doit renvoyer u1 = 7"\nassert terme(3) == 31, "terme(3) doit renvoyer u3 = 31"\nassert terme(10) == 4095, "terme(10) doit renvoyer 4095"`,
          },
          felicitation: "La boucle de la séance 3, enfermée dans une fonction. 🔁",
          indices: [
            "Reprends le schéma de la séance 3 : <code>u</code> reçoit 3, puis une boucle de <code>n</code> tours qui met <code>u</code> à jour.",
            "Le <code>return u</code> vient <strong>après</strong> la boucle : décalé de quatre espaces (il est dans la fonction), mais pas de huit (il n'est pas dans la boucle).",
            "Trois niveaux : <code>u = 3</code> et <code>for i in range(n):</code> à quatre espaces, la mise à jour à huit espaces, puis <code>return u</code> à quatre espaces.",
          ],
          solution: `def terme(n):\n    u = 3\n    for i in range(n):\n        u = 2 * u + 1\n    return u\n\nprint(terme(10))\n`,
          apres: `<span class="chapo">Un return trop décalé</span>
            Si <code>return u</code> est décalé de huit espaces, il est dans la boucle :
            la fonction s'arrête dès le premier tour, et renvoie toujours
            <em>u</em><sub>1</sub> = 7. C'est une erreur très fréquente.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def delta(a, b, c):            # nom, paramètres, deux points
    return b ** 2 - 4 * a * c    # le résultat, renvoyé

def terme(n):
    u = 3
    for i in range(n):
        u = 2 * u + 1
    return u                     # après la boucle, dans la fonction

print(delta(2, -3, -5))          # appel, puis affichage : 49
print(terme(10))                 # 4095</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>définir une fonction</td><td><code>def nom(paramètres):</code></td></tr>
              <tr><td>donner son résultat</td><td><code>return valeur</code></td></tr>
              <tr><td>utiliser la fonction</td><td><code>nom(valeurs)</code>, dans l'ordre des paramètres</td></tr>
              <tr><td>voir le résultat</td><td><code>print(nom(valeurs))</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li><code>print</code> au lieu de <code>return</code> dans la fonction :
                <code>None</code> apparaît ;</li>
                <li><code>return</code> placé dans la boucle : la fonction s'arrête au
                premier tour ;</li>
                <li>oublier les deux points après <code>def</code>, ou le décalage du corps ;</li>
                <li>définir la fonction sans jamais l'appeler : rien ne s'affiche.</li>
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
      intention: "on réinvestit, du plus simple au plus complet",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "La bonne fonction",
          contenu: `<p>On veut une fonction <code>moyenne(a, b)</code> qui renvoie la
            moyenne de deux nombres, pour pouvoir écrire
            <code>m = moyenne(12, 15)</code>.</p>`,
          question: "Laquelle convient ?",
          options: [
            { texte: "<code>def moyenne(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;print((a + b) / 2)</code>",
              explication: "Elle affiche la moyenne, mais ne la renvoie pas : m vaudrait None." },
            { texte: "<code>def moyenne(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a + b / 2</code>",
              explication: "Les priorités : seul b est divisé par 2. moyenne(12, 15) vaudrait 19.5." },
            { texte: "<code>def moyenne(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;return (a + b) / 2</code>", correct: true,
              explication: "Oui : elle renvoie bien la somme divisée par 2, et m reçoit 13.5." },
            { texte: "<code>def moyenne(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;m = (a + b) / 2</code>",
              explication: "Le calcul est juste, mais la fonction ne renvoie rien : il manque le return." },
          ],
          apres: `<span class="chapo">Trois erreurs classiques en une question</span>
            Afficher au lieu de renvoyer, oublier les parenthèses, oublier le
            <code>return</code> : tu les retrouveras dans la chasse aux bugs.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Un tableau de valeurs",
          contenu: `
            <p>Définis la fonction <em>f</em>(<em>x</em>) = <em>x</em>² − 2<em>x</em>,
            puis, avec une boucle où <code>x</code> va de −2 à 2, affiche sur chaque ligne
            <code>x</code> et <em>f</em>(<em>x</em>) :</p>
            <pre class="bloc-code"><code>-2 8
-1 3
0 0
1 -1
2 0</code></pre>`,
          depart: `def f(x):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction f doit renvoyer l'image avec return." },
              { motif: "\\bfor\\s+x\\s+in\\s+range\\s*\\(\\s*-\\s*2\\s*,\\s*3\\s*\\)", message: "x va de -2 à 2 inclus : range(-2, 3)." },
              { motif: "print\\s*\\(\\s*x\\s*,\\s*f\\s*\\(\\s*x\\s*\\)\\s*\\)", message: "Dans la boucle, affiche x puis f(x)." },
            ],
            sortie: "-2 8\n-1 3\n0 0\n1 -1\n2 0",
            tests: `assert f(3) == 3, "f(3) doit valoir 9 - 6 = 3"\nassert f(10) == 80, "f(10) doit valoir 100 - 20 = 80"`,
          },
          felicitation: "Une fonction, une boucle : le tableau de valeurs de la calculatrice. 📋",
          indices: [
            "D'abord la fonction : <code>return</code> suivi de <em>x</em>² − 2<em>x</em> en Python.",
            "Ensuite, hors de la fonction, une boucle <code>for</code> dont la variable s'appelle <code>x</code>. Pour aller de −2 à 2 inclus, le second nombre du <code>range</code> est 3.",
            "Dans la boucle, un <code>print</code> qui reçoit deux valeurs : <code>x</code>, puis l'appel <code>f(x)</code>.",
          ],
          solution: `def f(x):\n    return x ** 2 - 2 * x\n\nfor x in range(-2, 3):\n    print(x, f(x))\n`,
          apres: `<span class="chapo">Ce que dit le tableau</span>
            <em>f</em> s'annule en 0 et en 2, et prend une valeur négative entre les deux :
            tu retrouves le signe d'un trinôme, du signe de <em>a</em> à l'extérieur des
            racines.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Un seuil à la demande",
          contenu: `
            <p>On place 1 000 € à 5 % par an. Écris la fonction <code>seuil(S)</code> qui
            renvoie le nombre d'années au bout duquel le capital dépasse
            <code>S</code> euros.</p>
            <pre class="bloc-code"><code>seuil(2000)    # renvoie 15
seuil(1500)    # renvoie 9</code></pre>
            <p>Termine en affichant <code>seuil(2000)</code>.</p>`,
          depart: `def seuil(S):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b[^\\n]*\\bS\\b", message: "La boucle while compare le capital au seuil S." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nombre d'années avec return." },
              { motif: "print\\s*\\(\\s*seuil\\s*\\(\\s*2000\\s*\\)\\s*\\)", message: "Termine en affichant seuil(2000)." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "Le nombre d'années doit être calculé par la fonction." },
            ],
            sortie: "15",
            tests: `assert seuil(2000) == 15, "le capital dépasse 2000 euros au bout de 15 ans"\nassert seuil(1500) == 9, "le capital dépasse 1500 euros au bout de 9 ans"\nassert seuil(3000) == 23, "le capital dépasse 3000 euros au bout de 23 ans"`,
          },
          felicitation: "Le seuil n'est plus écrit en dur : c'est un paramètre. 💶",
          indices: [
            "Reprends « Doubler son capital » de la séance 3, à l'intérieur de la fonction : <code>u</code> reçoit 1000, <code>n</code> reçoit 0, puis la boucle.",
            "La condition du <code>while</code> utilise le paramètre : on continue tant que <code>u &lt;= S</code>.",
            "Après la boucle, au lieu d'afficher <code>n</code>, la fonction le <strong>renvoie</strong>.",
          ],
          solution: `def seuil(S):\n    u = 1000\n    n = 0\n    while u <= S:\n        u = 1.05 * u\n        n = n + 1\n    return n\n\nprint(seuil(2000))\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Moyenne : 13.5</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Attention : une fois la première
            corrigée, le programme tourne… mais affiche des choses étranges.</p>`,
          depart: `def moyenne(a, b)\n    m = a + b / 2\n    print(m)\n\nresultat = moyenne(12, 15)\nprint("Moyenne :", resultat)\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+moyenne\\s*\\(\\s*a\\s*,\\s*b\\s*\\)\\s*:", message: "La ligne def se termine par deux points." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la moyenne, pas l'afficher." },
              { motif: "\\(\\s*a\\s*\\+\\s*b\\s*\\)\\s*/\\s*2", message: "La moyenne, c'est (a + b) / 2, avec des parenthèses." },
            ],
            codeAbsent: [
              { motif: "\\n[ \\t]+print", message: "La fonction ne doit rien afficher elle-même : c'est le print du bas qui s'en charge." },
            ],
            sortie: "Moyenne : 13.5",
            tests: `assert moyenne(10, 20) == 15, "moyenne(10, 20) doit renvoyer 15"\nassert moyenne(12, 15) == 13.5, "moyenne(12, 15) doit renvoyer 13.5"`,
          },
          felicitation: "Deux points, un return, des parenthèses : la fonction est réparée. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> sur la ligne <code>def</code> : comment se termine-t-elle ?",
            "Ensuite, le programme affiche un nombre puis <code>Moyenne : None</code> : la fonction affiche au lieu de renvoyer.",
            "Enfin, le nombre est faux : 12 + 15 / 2 = 19.5. Il manque des parenthèses.",
          ],
          solution: `def moyenne(a, b):\n    m = (a + b) / 2\n    return m\n\nresultat = moyenne(12, 15)\nprint("Moyenne :", resultat)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La fonction factorielle",
          contenu: `
            <p>Écris la fonction <code>factorielle(n)</code> qui renvoie
            <em>n</em>! = 1 × 2 × … × <em>n</em>. Par convention, 0! = 1.</p>
            <pre class="bloc-code"><code>factorielle(5)    # renvoie 120
factorielle(0)    # renvoie 1</code></pre>
            <p>Termine en affichant <code>factorielle(6)</code>.</p>`,
          depart: `def factorielle(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Utilise une boucle for pour multiplier les entiers de 1 à n." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le produit avec return." },
              { motif: "print\\s*\\(\\s*factorielle\\s*\\(\\s*6\\s*\\)\\s*\\)", message: "Termine en affichant factorielle(6)." },
            ],
            codeAbsent: [
              { motif: "\\b720\\b", message: "Le résultat doit être calculé par la fonction." },
            ],
            sortie: "720",
            tests: `assert factorielle(5) == 120, "factorielle(5) doit renvoyer 1 × 2 × 3 × 4 × 5 = 120"\nassert factorielle(1) == 1, "factorielle(1) doit renvoyer 1"\nassert factorielle(0) == 1, "factorielle(0) doit renvoyer 1 : la boucle ne fait aucun tour, et le produit reste à 1"\nassert factorielle(10) == 3628800, "factorielle(10) doit renvoyer 3628800"`,
          },
          felicitation: "Et 0! = 1 sans rien prévoir de spécial : la boucle ne tourne pas. ✖️",
          indices: [
            "Reprends la factorielle de la séance 3 dans la fonction : un produit qui démarre à 1, et une boucle.",
            "La variable de boucle va de 1 à <code>n</code> inclus : <code>range(1, n + 1)</code>. Le <code>return</code> vient après la boucle.",
          ],
          solution: `def factorielle(n):\n    p = 1\n    for k in range(1, n + 1):\n        p = p * k\n    return p\n\nprint(factorielle(6))\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "La somme des nombres impairs",
          contenu: `
            <p>Écris la fonction <code>somme_impairs(n)</code> qui renvoie la somme des
            <em>n</em> premiers nombres impairs : 1 + 3 + 5 + … Le <em>k</em>-ième nombre
            impair est 2<em>k</em> − 1.</p>
            <pre class="bloc-code"><code>somme_impairs(3)    # 1 + 3 + 5, renvoie 9
somme_impairs(4)    # 1 + 3 + 5 + 7, renvoie 16</code></pre>
            <p>Termine en affichant <code>somme_impairs(10)</code>.</p>`,
          depart: `def somme_impairs(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Utilise une boucle pour additionner les nombres impairs." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme avec return." },
              { motif: "print\\s*\\(\\s*somme_impairs\\s*\\(\\s*10\\s*\\)\\s*\\)", message: "Termine en affichant somme_impairs(10)." },
            ],
            codeAbsent: [
              { motif: "\\bn\\s*\\*\\s*n\\b|\\bn\\s*\\*\\*\\s*2", message: "Calcule vraiment la somme avec une boucle : c'est elle qui va révéler la formule." },
            ],
            sortie: "100",
            tests: `assert somme_impairs(1) == 1, "somme_impairs(1) doit renvoyer 1"\nassert somme_impairs(3) == 9, "somme_impairs(3) doit renvoyer 1 + 3 + 5 = 9"\nassert somme_impairs(4) == 16, "somme_impairs(4) doit renvoyer 16"\nassert somme_impairs(7) == 49, "somme_impairs(7) doit renvoyer 49"`,
          },
          felicitation: "9, 16, 100… tu as sans doute repéré quelque chose. 🔍",
          indices: [
            "Un accumulateur <code>s</code> à 0, et une boucle où <code>k</code> va de 1 à <code>n</code> inclus.",
            "À chaque tour, on ajoute le <em>k</em>-ième nombre impair : <code>s</code> reçoit <code>s</code> plus 2 fois <code>k</code> moins 1.",
            "Le <code>return s</code> vient après la boucle, décalé de quatre espaces seulement.",
          ],
          solution: `def somme_impairs(n):\n    s = 0\n    for k in range(1, n + 1):\n        s = s + 2 * k - 1\n    return s\n\nprint(somme_impairs(10))\n`,
          apres: `<span class="chapo">Une conjecture</span>
            1, 4, 9, 16, … , 100 : la somme des <em>n</em> premiers nombres impairs semble
            valoir <em>n</em>². Python ne le <strong>démontre</strong> pas — il le vérifie
            sur des exemples. La démonstration, c'est le travail du mathématicien : tu la
            verras en Terminale, avec la récurrence.`,
        },
      ],
    },
  ],
};

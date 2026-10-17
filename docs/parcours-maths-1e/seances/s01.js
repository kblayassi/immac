/* Maths Première — séance 1 : calculer et mémoriser.
 * Rappels de Seconde : print(), les opérations, les variables, la mise à jour
 * d'une variable. Fil rouge maths : image d'un nombre par une fonction, termes
 * d'une suite récurrente, discriminant d'un trinôme.
 * Première séance du parcours : elle explique aussi comment travailler seul.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Calculer et mémoriser",
  sousTitre: "print(), les opérations et les variables",
  palier: "Partie 1 — Les rappels de Seconde",

  accroche: `Python est une calculatrice très obéissante : il fait exactement ce que tu
    écris, ni plus ni moins. Dans cette première séance, on reprend les bases vues en
    Seconde — afficher, calculer, ranger un résultat dans une variable — et on s'en sert
    déjà pour des maths de Première : l'image d'un nombre, les termes d'une suite, le
    discriminant d'un trinôme.`,

  objectifs: [
    "afficher un texte ou un résultat avec <code>print()</code>",
    "traduire une expression mathématique en Python : <code>3x²</code> devient <code>3 * x ** 2</code>",
    "ranger une valeur dans une <strong>variable</strong>, et la mettre à jour",
    "lire un message d'erreur pour corriger son programme seul",
  ],

  motDeLaFin: `Tu sais faire calculer Python, ranger les résultats dans des variables et
    les afficher proprement. Tu as même calculé un discriminant. À la séance 2, Python
    apprend à <strong>décider</strong> : selon le signe du discriminant, il trouvera
    lui-même combien le trinôme a de racines, et lesquelles.`,

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
          titre: "Avant de commencer : travailler seul",
          contenu: `
            <p>Tu vas faire ce parcours <strong>chez toi, à ton rythme</strong>. Personne
            ne te regarde et rien n'est noté : tu peux essayer, te tromper et
            recommencer autant de fois que tu veux. C'est même comme ça qu'on apprend à
            programmer.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Bouton</th><th>Ce qu'il fait</th></tr>
              <tr><td><strong>▶ Exécuter</strong></td><td>lance ton programme et montre ce qu'il affiche. Sers-t'en sans modération pour essayer.</td></tr>
              <tr><td><strong>✓ Valider</strong></td><td>vérifie que ton programme fait ce qui est demandé, et débloque l'étape suivante.</td></tr>
              <tr><td><strong>💡 Coup de pouce</strong></td><td>donne un indice, puis un autre. Ils ne retirent rien : utilise-les dès que tu bloques.</td></tr>
              <tr><td><strong>↺</strong></td><td>remet le code de départ, si tu t'es perdu.</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La bonne méthode</span>
              <ol style="margin-bottom:0">
                <li>lis la consigne <strong>jusqu'au bout</strong>, exemple compris ;</li>
                <li>écris une première version, et clique sur <strong>▶ Exécuter</strong> ;</li>
                <li>compare ce qui s'affiche avec ce qui est attendu ;</li>
                <li>bloqué depuis plus de cinq minutes ? Un <strong>coup de pouce</strong>.
                Toujours bloqué après le dernier ? Note ta question, on en parlera en classe.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ta progression</span>
              Elle est enregistrée <strong>dans ce navigateur, sur cet appareil</strong>.
              Travaille toujours au même endroit, ou emporte-la avec le menu
              <strong>☰</strong> en haut à droite (« Télécharger ma progression »). Un
              ordinateur ou une tablette avec clavier est bien plus confortable qu'un
              téléphone pour écrire du code.
            </div>`,
          libelleBouton: "C'est parti →",
        },

        {
          id: "d2",
          type: "cours",
          titre: "Afficher avec print()",
          contenu: `
            <p>L'instruction <code>print()</code> affiche dans la console ce qu'on lui
            donne entre ses parenthèses. Deux cas à bien distinguer :</p>

            <pre class="bloc-code"><code>print("Bonjour")    # un texte, entre guillemets : affiché tel quel
print(3 + 4)        # un calcul, sans guillemets : Python l'effectue, et affiche 7</code></pre>

            <p>Un programme est une liste d'instructions, exécutées <strong>de haut en
            bas</strong>, une par ligne. Chaque <code>print</code> affiche sur une
            nouvelle ligne.</p>

            <div class="encadre">
              <span class="chapo">Les commentaires</span>
              Tout ce qui suit un <code>#</code> sur une ligne est un
              <strong>commentaire</strong> : Python l'ignore. Il sert à expliquer le
              code à celui qui le lit.
            </div>`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Ton premier programme",
          contenu: `
            <p>Écris un programme qui affiche le texte <code>Maths et Python</code>, puis,
            sur la ligne suivante, le résultat de <strong>17 × 23</strong>, calculé par
            Python. En Python, la multiplication s'écrit avec une étoile :
            <code>*</code>.</p>
            <p>La console doit montrer :</p>
            <pre class="bloc-code"><code>Maths et Python
391</code></pre>`,
          depart: `# Écris ton programme sous cette ligne\n\n`,
          validation: {
            codeContient: [
              { motif: "17\\s*\\*\\s*23|23\\s*\\*\\s*17", message: "Le résultat doit être calculé par Python : écris la multiplication 17 * 23." },
            ],
            codeAbsent: [
              { motif: "\\b391\\b", message: "N'écris pas 391 toi-même : c'est à Python de faire le calcul." },
            ],
            sortie: "Maths et Python\n391",
          },
          felicitation: "Un texte affiché tel quel, un calcul effectué : les deux usages de print(). 🎉",
          indices: [
            "Il faut deux lignes, donc deux <code>print</code>.",
            "Le texte s'écrit entre guillemets droits <code>\" \"</code> — pas les guillemets « » du français. Le calcul, lui, s'écrit <strong>sans</strong> guillemets.",
            "Première ligne : un <code>print</code> qui reçoit le texte entre guillemets. Deuxième ligne : un <code>print</code> qui reçoit la multiplication de 17 par 23, avec <code>*</code>.",
          ],
          solution: `print("Maths et Python")\nprint(17 * 23)\n`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Avec ou sans guillemets",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `print("2 + 3")\nprint(2 + 3)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>5</code> puis <code>5</code>",
              explication: "La première ligne a des guillemets : Python n'y voit pas un calcul, mais un texte." },
            { texte: "<code>2 + 3</code> puis <code>5</code>", correct: true,
              explication: "Oui : entre guillemets, <code>\"2 + 3\"</code> est un texte de cinq caractères, affiché tel quel. Sans guillemets, c'est un calcul." },
            { texte: "<code>2 + 3</code> puis <code>2 + 3</code>",
              explication: "La deuxième ligne n'a pas de guillemets : Python effectue le calcul." },
            { texte: "une erreur",
              explication: "Les deux lignes sont correctes : elles ne font simplement pas la même chose." },
          ],
          apres: `<span class="chapo">Les guillemets changent tout</span>
            Entre guillemets, c'est du <strong>texte</strong> : Python le recopie sans
            chercher à le comprendre. Sans guillemets, c'est une <strong>expression</strong>
            que Python calcule.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Les opérations",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>En maths</th><th>En Python</th><th>Résultat</th></tr>
              <tr><td>7 + 2</td><td><code>7 + 2</code></td><td><code>9</code></td></tr>
              <tr><td>7 − 2</td><td><code>7 - 2</code></td><td><code>5</code></td></tr>
              <tr><td>7 × 2</td><td><code>7 * 2</code></td><td><code>14</code></td></tr>
              <tr><td>7 ÷ 2</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
              <tr><td>7²</td><td><code>7 ** 2</code></td><td><code>49</code></td></tr>
            </table>
            </div>

            <p>Les <strong>priorités</strong> sont celles des maths : d'abord les
            puissances, puis les multiplications et divisions, enfin les additions et
            soustractions. Les parenthèses passent avant tout.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Trois différences avec l'écriture des maths</span>
              <ul style="margin-bottom:0">
                <li>la virgule décimale est un <strong>point</strong> : 2,5 s'écrit <code>2.5</code> ;</li>
                <li>la puissance s'écrit <code>**</code>, jamais <code>^</code> (qui fait tout autre chose) ;</li>
                <li>la division <code>/</code> donne toujours un nombre décimal : <code>6 / 2</code> vaut <code>3.0</code>.</li>
              </ul>
            </div>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Comme sur la calculatrice",
          contenu: `
            <p>Fais calculer et afficher par Python, une valeur par ligne :</p>
            <ul>
              <li>2<sup>10</sup> ;</li>
              <li>3,5 × 4 ;</li>
              <li>(7 + 5) ÷ 4.</li>
            </ul>
            <p>La console doit montrer :</p>
            <pre class="bloc-code"><code>1024
14.0
3.0</code></pre>`,
          depart: `# Un print par calcul\n\n`,
          validation: {
            codeContient: [
              { motif: "2\\s*\\*\\*\\s*10", message: "2 puissance 10 s'écrit avec ** ." },
              { motif: "3\\.5\\s*\\*\\s*4|4\\s*\\*\\s*3\\.5", message: "3,5 s'écrit 3.5 en Python, avec un point." },
              { motif: "\\(\\s*7\\s*\\+\\s*5\\s*\\)\\s*/\\s*4", message: "Pour le dernier calcul, des parenthèses autour de 7 + 5, puis la division par 4." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(1024|14(\\.0)?|3(\\.0)?)\\s*\\)", message: "Les résultats doivent être calculés par Python, pas écrits à la main." },
            ],
            sortie: "1024\n14.0\n3.0",
          },
          felicitation: "Puissance, point décimal, parenthèses : les trois pièges sont évités. 🧮",
          indices: [
            "Trois lignes, trois <code>print</code>, et un calcul dans chacun.",
            "La puissance s'écrit <code>**</code> ; la virgule de 3,5 devient un point.",
            "Sans parenthèses, <code>7 + 5 / 4</code> divise seulement 5 par 4 : entoure la somme de parenthèses avant de diviser.",
          ],
          solution: `print(2 ** 10)\nprint(3.5 * 4)\nprint((7 + 5) / 4)\n`,
          apres: `<span class="chapo">Pourquoi 14.0 et pas 14 ?</span>
            Dès qu'un nombre décimal entre dans un calcul, ou dès qu'on divise avec
            <code>/</code>, le résultat est un nombre décimal — Python dit un
            <em>flottant</em> — et il l'affiche avec un <code>.0</code>. C'est la même
            valeur que 14 : seule l'écriture change.`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Les priorités",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `print(2 + 3 * 4)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>20</code>",
              explication: "C'est (2 + 3) × 4 : on a fait l'addition d'abord, en lisant de gauche à droite." },
            { texte: "<code>14</code>", correct: true,
              explication: "Oui : la multiplication passe avant l'addition. 3 × 4 = 12, puis 2 + 12 = 14." },
            { texte: "<code>24</code>",
              explication: "Aucun ordre de calcul ne donne 24 ici." },
            { texte: "<code>2 + 3 * 4</code>",
              explication: "Il n'y a pas de guillemets : Python effectue le calcul." },
          ],
          apres: `<span class="chapo">Exactement comme en maths</span>
            Python respecte les priorités opératoires. Pour faire l'addition d'abord, il
            faut des parenthèses : <code>(2 + 3) * 4</code> vaut 20. Dans le doute, mets
            des parenthèses : elles ne coûtent rien.`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Les variables",
          contenu: `
            <p>Une <strong>variable</strong> est une boîte qui porte un nom et contient une
            valeur. On la remplit avec le signe <code>=</code> :</p>

            <pre class="bloc-code"><code>prix = 12              # prix reçoit 12
quantite = 3           # quantite reçoit 3
total = prix * quantite
print(total)           # affiche 36</code></pre>

            <p>Ensuite, partout où on écrit le nom de la variable, Python le remplace par
            sa valeur. C'est ce qui permet de faire un calcul une fois, et de le refaire
            avec d'autres valeurs en changeant une seule ligne.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le = de Python n'est pas celui des maths</span>
              <code>total = prix * quantite</code> ne dit pas « total est égal à… » : c'est un
              <strong>ordre</strong>. Python calcule d'abord ce qui est à droite, puis range
              le résultat dans la variable de gauche. On le lit « total
              <strong>reçoit</strong> prix fois quantité ».
            </div>

            <div class="encadre">
              <span class="chapo">Nommer une variable</span>
              Des lettres, des chiffres et le tiret bas <code>_</code>, sans espace et sans
              commencer par un chiffre. Python distingue majuscules et minuscules :
              <code>Prix</code> et <code>prix</code> sont deux variables différentes.
            </div>`,
        },

        {
          id: "d9",
          type: "code",
          titre: "L'image d'un nombre",
          contenu: `
            <p>On considère la fonction <em>f</em> définie par
            <strong><em>f</em>(<em>x</em>) = 3<em>x</em>² − 5<em>x</em> + 2</strong>.</p>
            <p>La variable <code>x</code> contient déjà 4. Calcule l'image de
            <code>x</code> par <em>f</em> dans une variable <code>y</code>, puis affiche
            <code>y</code>. La console doit montrer :</p>
            <pre class="bloc-code"><code>30</code></pre>`,
          depart: `x = 4\n\n`,
          validation: {
            codeContient: [
              { motif: "\\by\\s*=", message: "Range le résultat dans une variable y." },
              { motif: "\\bx\\b[\\s\\S]*\\bx\\b", message: "Le calcul doit utiliser la variable x, pas sa valeur 4." },
              { motif: "print\\s*\\(\\s*y\\s*\\)", message: "Termine en affichant la variable y." },
            ],
            codeAbsent: [
              { motif: "\\b30\\b", message: "N'écris pas 30 : c'est à Python de calculer l'image." },
            ],
            sortie: "30",
            tests: `assert y == 30, "y doit contenir l'image de 4 par f, c'est-à-dire 30"`,
          },
          felicitation: "Une expression mathématique traduite en Python, multiplications comprises. 📈",
          indices: [
            "En maths, on n'écrit pas le signe × devant une lettre. En Python, il est obligatoire : <code>3x</code> s'écrit <code>3 * x</code>.",
            "<em>x</em>² s'écrit avec la puissance <code>**</code>.",
            "<code>y</code> reçoit : 3 fois <code>x</code> puissance 2, moins 5 fois <code>x</code>, plus 2. Puis un <code>print</code> de <code>y</code>.",
          ],
          solution: `x = 4\ny = 3 * x ** 2 - 5 * x + 2\nprint(y)\n`,
          apres: `<span class="chapo">Du papier à Python</span>
            <code>3x</code> devient <code>3 * x</code>, <code>x²</code> devient
            <code>x ** 2</code>. Et grâce à la variable, ton programme calcule l'image de
            n'importe quel nombre : remplace <code>x = 4</code> par <code>x = -1</code>,
            exécute, et tu obtiens <em>f</em>(−1) = 10.`,
        },

        {
          id: "d10",
          type: "prediction",
          titre: "x = x + 2",
          contenu: `<p>En maths, l'égalité <em>x</em> = <em>x</em> + 2 est impossible.
            Mais en Python ? Lis ce programme sans l'exécuter.</p>`,
          code: `x = 5\nx = x + 2\nprint(x)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>5</code>",
              explication: "La deuxième ligne change bien la valeur de x : elle n'est pas ignorée." },
            { texte: "<code>7</code>", correct: true,
              explication: "Oui : Python calcule x + 2 avec la valeur actuelle de x, soit 5 + 2 = 7, puis range 7 dans x." },
            { texte: "une erreur, car x ne peut pas valoir x + 2",
              explication: "C'est vrai d'une équation, mais en Python le = est un ordre, pas une égalité." },
            { texte: "<code>2</code>",
              explication: "x reçoit x + 2, pas 2 : l'ancienne valeur compte." },
          ],
          apres: `<span class="chapo">Mettre à jour une variable</span>
            <code>x = x + 2</code> se lit « x reçoit son ancienne valeur plus 2 ». C'est
            ainsi qu'on fait évoluer une valeur pas à pas — exactement ce qu'il faut pour
            calculer les termes d'une suite.`,
        },

        {
          id: "d11",
          type: "code",
          titre: "Les premiers termes d'une suite",
          contenu: `
            <p>On considère la suite (<em>u<sub>n</sub></em>) définie par
            <em>u</em><sub>0</sub> = 3 et, pour tout entier <em>n</em>,
            <strong><em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 1</strong>.</p>
            <p>La variable <code>u</code> contient <em>u</em><sub>0</sub>. Écris
            <strong>trois fois</strong> la ligne qui met à jour <code>u</code> pour passer
            au terme suivant, chacune suivie d'un <code>print(u)</code>. Tu dois obtenir
            <em>u</em><sub>1</sub>, <em>u</em><sub>2</sub> et <em>u</em><sub>3</sub> :</p>
            <pre class="bloc-code"><code>7
15
31</code></pre>`,
          depart: `u = 3\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bu\\s*=\\s*(2\\s*\\*\\s*u|u\\s*\\*\\s*2)\\s*\\+\\s*1", message: "La mise à jour doit calculer le terme suivant à partir de u : u reçoit 2 fois u plus 1." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(7|15|31)\\s*\\)", message: "Les termes doivent être calculés par Python, pas écrits à la main." },
            ],
            sortie: "7\n15\n31",
          },
          felicitation: "Chaque terme calculé à partir du précédent : c'est la définition d'une suite récurrente. 🔁",
          indices: [
            "La formule dit comment obtenir le terme suivant à partir du terme actuel. En Python, cela devient une mise à jour de <code>u</code>, comme <code>x = x + 2</code>.",
            "La ligne de mise à jour : <code>u</code> reçoit 2 fois <code>u</code>, plus 1.",
            "Ton programme compte six lignes sous <code>u = 3</code> : la mise à jour, puis <code>print(u)</code>, et ce couple trois fois de suite.",
          ],
          solution: `u = 3\nu = 2 * u + 1\nprint(u)\nu = 2 * u + 1\nprint(u)\nu = 2 * u + 1\nprint(u)\n`,
          apres: `<span class="chapo">Une ligne, recopiée trois fois</span>
            Pour <em>u</em><sub>3</sub>, ça va. Pour <em>u</em><sub>50</sub>, il faudrait
            recopier la ligne cinquante fois ! À la séance 3, une <strong>boucle</strong>
            le fera pour toi, quel que soit le nombre de termes voulu.`,
        },

        {
          id: "d12",
          type: "code",
          titre: "Du texte et des nombres",
          contenu: `
            <p><code>print</code> accepte plusieurs valeurs, séparées par des virgules. Il
            les affiche sur la même ligne, en ajoutant <strong>une espace</strong> entre
            chacune :</p>
            <pre class="bloc-code"><code>n = 28
print("Il y a", n, "élèves")    # affiche : Il y a 28 élèves</code></pre>
            <p>En utilisant les variables <code>x</code> et <code>y</code>, affiche :</p>
            <pre class="bloc-code"><code>L'image de 4 est 30</code></pre>
            <div class="encadre" data-ton="attention">
              <span class="chapo">Une apostrophe dans le texte</span>
              Le texte contient une apostrophe : entoure-le de guillemets
              <strong>doubles</strong> <code>"</code>, sinon Python croira que
              l'apostrophe termine le texte.
            </div>`,
          depart: `x = 4\ny = 3 * x ** 2 - 5 * x + 2\n\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\([^\\n]*,\\s*x\\s*,[^\\n]*,\\s*y\\s*\\)", message: "Dans un seul print : un texte, la variable x, un texte, la variable y, séparés par des virgules." },
            ],
            codeAbsent: [
              { motif: "[\"'][^\"'\\n]*\\b(4|30)\\b", message: "Les nombres 4 et 30 ne doivent pas être écrits dans le texte : affiche les variables x et y." },
            ],
            sortie: "L'image de 4 est 30",
          },
          felicitation: "Texte et variables mêlés dans un seul print. 💬",
          indices: [
            "Quatre morceaux dans le <code>print</code>, séparés par des virgules : un texte, une variable, un texte, une variable.",
            "Les morceaux de texte sont <code>\"L'image de\"</code> et <code>\"est\"</code> — sans espace à leurs bouts : <code>print</code> en ajoute déjà une.",
          ],
          solution: `x = 4\ny = 3 * x ** 2 - 5 * x + 2\nprint("L'image de", x, "est", y)\n`,
          apres: `<span class="chapo">L'espace est automatique</span>
            Si tu écris <code>"L'image de "</code> avec une espace à la fin, tu en
            obtiens deux à l'affichage. Laisse <code>print</code> s'en occuper.`,
        },

        {
          id: "d13",
          type: "qcm",
          titre: "Lire un message d'erreur",
          contenu: `
            <p>Seul chez toi, le message d'erreur est ton meilleur allié : il dit
            <strong>où</strong> et <strong>quoi</strong>. Ce programme s'arrête avec le
            message ci-dessous.</p>
            <pre class="bloc-code"><code>x = 4
y = 3 * x ** 2 - 5x + 2
print(y)</code></pre>
            <pre class="bloc-code"><code>  File "programme.py", line 2
    y = 3 * x ** 2 - 5x + 2
                     ^
SyntaxError: invalid decimal literal</code></pre>`,
          question: "Que faut-il corriger ?",
          options: [
            { texte: "remplacer <code>**</code> par <code>^</code>",
              explication: "<code>**</code> est bien la puissance en Python ; <code>^</code> ferait autre chose." },
            { texte: "ajouter <code>*</code> entre <code>5</code> et <code>x</code>", correct: true,
              explication: "Oui : la ligne 2 est désignée, et la flèche <code>^</code> pointe sur <code>5x</code>. Python ne comprend pas un nombre collé à une lettre." },
            { texte: "renommer la variable <code>y</code>",
              explication: "Le nom <code>y</code> est parfaitement valable. Regarde où pointe la flèche." },
            { texte: "corriger la ligne 3",
              explication: "Le message indique <code>line 2</code> : la ligne 3 n'a même pas été lue." },
          ],
          apres: `<span class="chapo">Les messages que tu rencontreras le plus</span>
            <ul style="margin-bottom:0">
              <li><code>SyntaxError</code> : Python ne comprend pas ce qui est écrit — un
              signe oublié, une parenthèse ou un guillemet non fermé ;</li>
              <li><code>NameError: name '…' is not defined</code> : un nom inconnu — une
              faute de frappe, une majuscule en trop, ou des guillemets oubliés autour
              d'un texte ;</li>
              <li><code>ZeroDivisionError</code> : une division par zéro.</li>
            </ul>
            Lis toujours la <strong>dernière ligne</strong> du message (la nature de
            l'erreur), puis le <strong>numéro de ligne</strong> au-dessus.`,
        },

        {
          id: "d14",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>print("Bonjour")              # un texte, affiché tel quel
print(3 * 4 + 1)              # un calcul, effectué : 13
x = 4                         # x reçoit 4
y = 3 * x ** 2 - 5 * x + 2    # f(x) = 3x² − 5x + 2
print("L'image de", x, "est", y)
u = 2 * u + 1                 # u reçoit son ancienne valeur fois 2, plus 1</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>En maths</th><th>En Python</th></tr>
              <tr><td>3<em>x</em></td><td><code>3 * x</code></td></tr>
              <tr><td><em>x</em>²</td><td><code>x ** 2</code></td></tr>
              <tr><td>2,5</td><td><code>2.5</code></td></tr>
              <tr><td>(<em>a</em> + <em>b</em>) ÷ 2</td><td><code>(a + b) / 2</code></td></tr>
              <tr><td><em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 1</td><td><code>u = 2 * u + 1</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>oublier le <code>*</code> : <code>5x</code> provoque une <code>SyntaxError</code> ;</li>
                <li>écrire <code>^</code> pour la puissance, ou une virgule à la place du point ;</li>
                <li>oublier des parenthèses : <code>a + b / 2</code> ne divise que <code>b</code> ;</li>
                <li>écrire <code>Print</code> avec une majuscule : <code>NameError</code>.</li>
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
          titre: "Traduire une expression",
          contenu: `<p>La variable <code>x</code> contient un nombre. On veut calculer
            <strong>2<em>x</em>³ − <em>x</em> + 1</strong>.</p>`,
          question: "Quelle ligne est correcte ?",
          options: [
            { texte: "<code>y = 2x ** 3 - x + 1</code>",
              explication: "Il manque le <code>*</code> entre 2 et x : c'est une <code>SyntaxError</code>." },
            { texte: "<code>y = 2 * x ^ 3 - x + 1</code>",
              explication: "<code>^</code> n'est pas la puissance en Python : le résultat serait faux, sans message d'erreur." },
            { texte: "<code>y = 2 * x ** 3 - x + 1</code>", correct: true,
              explication: "Oui : la puissance est calculée en premier, puis la multiplication par 2, puis le reste." },
            { texte: "<code>y = (2 * x) ** 3 - x + 1</code>",
              explication: "Les parenthèses font calculer (2x)³, c'est-à-dire 8x³ : ce n'est pas la même expression." },
          ],
          apres: `<span class="chapo">La puissance ne porte que sur ce qui la précède</span>
            Dans <code>2 * x ** 3</code>, seul <code>x</code> est élevé au cube, comme
            dans 2<em>x</em>³. Pour élever 2<em>x</em> au cube, il faut des parenthèses.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "La moyenne de trois notes",
          contenu: `
            <p>Les variables <code>n1</code>, <code>n2</code> et <code>n3</code>
            contiennent trois notes. Calcule leur moyenne dans une variable
            <code>moyenne</code>, puis affiche :</p>
            <pre class="bloc-code"><code>Moyenne : 12.0</code></pre>`,
          depart: `n1 = 12\nn2 = 15\nn3 = 9\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bmoyenne\\s*=", message: "Range le résultat dans une variable moyenne." },
              { motif: "\\bn1\\b[\\s\\S]*\\bn1\\b", message: "Sers-toi des variables n1, n2 et n3, pas de leurs valeurs." },
              { motif: "\\bn2\\b[\\s\\S]*\\bn2\\b", message: "Sers-toi des variables n1, n2 et n3, pas de leurs valeurs." },
              { motif: "\\bn3\\b[\\s\\S]*\\bn3\\b", message: "Sers-toi des variables n1, n2 et n3, pas de leurs valeurs." },
              { motif: "print\\s*\\([^\\n]*,\\s*moyenne\\s*\\)", message: "Affiche le texte puis la variable moyenne, dans un print." },
            ],
            codeAbsent: [
              { motif: "\\b36\\b|12\\.0", message: "Les calculs doivent être faits par Python." },
            ],
            sortie: "Moyenne : 12.0",
            tests: `assert abs(moyenne - 12) < 1e-9, "moyenne doit valoir 12 : la somme des trois notes, divisée par 3"`,
          },
          felicitation: "La somme d'abord, la division ensuite : les parenthèses ont fait leur travail. 📊",
          indices: [
            "La moyenne de trois nombres, c'est leur somme divisée par 3.",
            "Attention aux priorités : sans parenthèses, seule la dernière note serait divisée par 3.",
            "<code>moyenne</code> reçoit la somme des trois variables entre parenthèses, divisée par 3. Puis un <code>print</code> avec le texte <code>\"Moyenne :\"</code> et la variable.",
          ],
          solution: `n1 = 12\nn2 = 15\nn3 = 9\nmoyenne = (n1 + n2 + n3) / 3\nprint("Moyenne :", moyenne)\n`,
          apres: `<span class="chapo">L'erreur la plus courante</span>
            <code>n1 + n2 + n3 / 3</code> calcule 12 + 15 + 3 = 30 : la division passe
            avant les additions. Python ne signale rien, le résultat est simplement faux.
            C'est pour cela qu'il faut toujours <strong>regarder</strong> si le résultat
            est vraisemblable.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Une augmentation de 25 %",
          contenu: `
            <p>Un article coûte <code>prix</code> euros et augmente de
            <code>taux</code> %. On rappelle qu'augmenter de <em>t</em> % revient à
            multiplier par le coefficient <strong>1 + <em>t</em>/100</strong>.</p>
            <p>Calcule le coefficient dans une variable <code>coef</code>, à partir de
            <code>taux</code>, puis le nouveau prix dans une variable
            <code>nouveau</code>, et affiche :</p>
            <pre class="bloc-code"><code>Nouveau prix : 150.0</code></pre>`,
          depart: `prix = 120\ntaux = 25\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bcoef\\s*=[^\\n]*\\btaux\\b", message: "Le coefficient se calcule à partir de la variable taux." },
              { motif: "\\bnouveau\\s*=[^\\n]*\\bprix\\b", message: "Le nouveau prix se calcule à partir de la variable prix." },
              { motif: "\\bnouveau\\s*=[^\\n]*\\bcoef\\b", message: "Le nouveau prix utilise le coefficient coef." },
            ],
            codeAbsent: [
              { motif: "1\\.25|\\b150\\b", message: "Ne calcule rien de tête : le coefficient et le prix doivent être calculés par Python." },
            ],
            sortie: "Nouveau prix : 150.0",
            tests: `assert abs(coef - 1.25) < 1e-9, "coef doit valoir 1 + taux / 100, soit 1.25"\nassert abs(nouveau - 150) < 1e-9, "nouveau doit valoir prix fois coef, soit 150"`,
          },
          felicitation: "Le coefficient multiplicateur, calculé puis utilisé. 🏷️",
          indices: [
            "Deux calculs, deux lignes : d'abord <code>coef</code>, ensuite <code>nouveau</code>.",
            "<code>coef</code> reçoit 1 plus <code>taux</code> divisé par 100 ; <code>nouveau</code> reçoit <code>prix</code> fois <code>coef</code>.",
          ],
          solution: `prix = 120\ntaux = 25\ncoef = 1 + taux / 100\nnouveau = prix * coef\nprint("Nouveau prix :", nouveau)\n`,
          apres: `<span class="chapo">Des étapes nommées</span>
            Ranger le coefficient dans sa propre variable rend le programme lisible, et
            réutilisable : remplace <code>taux = 25</code> par <code>taux = -10</code>, et
            tu calcules une <strong>baisse</strong> de 10 %.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait calculer l'image de 5 par la fonction
            <em>g</em>(<em>x</em>) = 2<em>x</em>² + 3, et afficher :</p>
            <pre class="bloc-code"><code>g(5) vaut 53</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Exécute-le, lis le message,
            corrige l'erreur signalée, et recommence jusqu'à ce qu'il fonctionne.</p>`,
          depart: `x = 5\ny = 2x ** 2 + 3\nPrint("g(5) vaut", Y)\n`,
          validation: {
            codeContient: [
              { motif: "\\by\\s*=\\s*2\\s*\\*\\s*x\\s*\\*\\*\\s*2\\s*\\+\\s*3", message: "La formule de g doit rester 2x² + 3, multiplication écrite." },
              { motif: "print\\s*\\([^\\n]*,\\s*y\\s*\\)", message: "Affiche la variable y, en minuscule." },
            ],
            codeAbsent: [
              { motif: "\\b53\\b", message: "N'écris pas 53 : c'est à Python de le calculer." },
            ],
            sortie: "g(5) vaut 53",
          },
          felicitation: "Un signe oublié, une majuscule de trop, une variable mal nommée : tu as lu les messages. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> à la ligne 2 : regarde où pointe la flèche.",
            "La suivante est une <code>NameError</code> : Python ne connaît pas <code>Print</code>. Une instruction s'écrit toujours en minuscules.",
            "La dernière est aussi une <code>NameError</code>, sur <code>Y</code> : la variable créée ligne 2 s'appelle <code>y</code>, en minuscule.",
          ],
          solution: `x = 5\ny = 2 * x ** 2 + 3\nprint("g(5) vaut", y)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Le discriminant",
          contenu: `
            <p>Pour le trinôme <strong>2<em>x</em>² − 3<em>x</em> − 5</strong>, on a
            <em>a</em> = 2, <em>b</em> = −3 et <em>c</em> = −5. Son discriminant est
            <strong>Δ = <em>b</em>² − 4<em>ac</em></strong>.</p>
            <p>Calcule Δ dans une variable <code>delta</code>, à partir de
            <code>a</code>, <code>b</code> et <code>c</code>, puis affiche :</p>
            <pre class="bloc-code"><code>Delta vaut 49</code></pre>`,
          depart: `a = 2\nb = -3\nc = -5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdelta\\s*=", message: "Range le résultat dans une variable delta." },
              { motif: "\\bdelta\\s*=[^\\n]*\\bb\\b[^\\n]*\\ba\\b|\\bdelta\\s*=[^\\n]*\\ba\\b[^\\n]*\\bb\\b", message: "Le calcul doit utiliser les variables a, b et c." },
              { motif: "\\bdelta\\s*=[^\\n]*\\bc\\b", message: "Le calcul doit utiliser les variables a, b et c." },
              { motif: "print\\s*\\([^\\n]*,\\s*delta\\s*\\)", message: "Affiche le texte puis la variable delta." },
            ],
            codeAbsent: [
              { motif: "\\b49\\b", message: "N'écris pas 49 : c'est à Python de calculer Δ." },
            ],
            sortie: "Delta vaut 49",
            tests: `assert delta == 49, "delta doit valoir b² − 4ac, soit 49 pour ce trinôme"`,
          },
          felicitation: "Δ = 49 : la formule du cours, traduite en une ligne. 🎯",
          indices: [
            "Traduis la formule en écrivant chaque multiplication : 4<em>ac</em>, c'est 4 fois <code>a</code> fois <code>c</code>.",
            "<em>b</em>² s'écrit avec <code>**</code>.",
            "<code>delta</code> reçoit <code>b</code> puissance 2, moins 4 fois <code>a</code> fois <code>c</code>. Puis un <code>print</code> avec le texte <code>\"Delta vaut\"</code> et la variable.",
          ],
          solution: `a = 2\nb = -3\nc = -5\ndelta = b ** 2 - 4 * a * c\nprint("Delta vaut", delta)\n`,
          apres: `<span class="chapo">Un piège évité grâce aux variables</span>
            Si tu avais écrit directement <code>-3 ** 2</code>, Python aurait calculé
            −(3²) = −9 : la puissance passe avant le signe moins. Avec la variable
            <code>b</code>, ou avec des parenthèses <code>(-3) ** 2</code>, on obtient
            bien 9. Et comme Δ &gt; 0, ce trinôme a deux racines : à la séance 2, Python
            les trouvera tout seul.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Une suite géométrique",
          contenu: `
            <p>La suite (<em>u<sub>n</sub></em>) est géométrique, de premier terme
            <em>u</em><sub>0</sub> = 5 et de raison <em>q</em> = 3 : on passe d'un terme
            au suivant en multipliant par <em>q</em>.</p>
            <p>En mettant à jour la variable <code>u</code> avec la variable
            <code>q</code>, affiche les trois termes suivants, sous cette forme :</p>
            <pre class="bloc-code"><code>u1 = 15
u2 = 45
u3 = 135</code></pre>`,
          depart: `u = 5\nq = 3\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bu\\s*=\\s*(u\\s*\\*\\s*q|q\\s*\\*\\s*u)", message: "Mets à jour u en le multipliant par la variable q." },
              { motif: "print\\s*\\([^\\n]*,\\s*u\\s*\\)", message: "Affiche chaque terme avec un texte suivi de la variable u." },
            ],
            codeAbsent: [
              { motif: "\\b(15|45|135)\\b", message: "Les termes doivent être calculés par Python." },
            ],
            sortie: "u1 = 15\nu2 = 45\nu3 = 135",
          },
          felicitation: "Trois termes d'une suite géométrique, calculés de proche en proche. 🌱",
          indices: [
            "Même principe qu'avec la suite <em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 1 : une mise à jour de <code>u</code>, puis un affichage, trois fois.",
            "La mise à jour : <code>u</code> reçoit <code>u</code> fois <code>q</code>. L'affichage : un texte comme <code>\"u1 =\"</code>, puis la variable <code>u</code>.",
          ],
          solution: `u = 5\nq = 3\nu = u * q\nprint("u1 =", u)\nu = u * q\nprint("u2 =", u)\nu = u * q\nprint("u3 =", u)\n`,
          apres: `<span class="chapo">Le même schéma pour toutes les suites récurrentes</span>
            Une variable pour le terme courant, une ligne qui calcule le suivant à partir
            de lui. Seule la formule change d'une suite à l'autre. Retiens ce schéma : il
            reviendra à chaque séance.`,
        },
      ],
    },
  ],
};

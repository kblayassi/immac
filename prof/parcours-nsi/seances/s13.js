/* NSI — chapitre 1, séance 13 : portée des variables et documentation.
 * Reprend la section « Paramètres, variables locales et variables globales » du
 * cours, l'encadré docstring, et les exercices 35, 37, 38 et 39.
 */

export default {
  id: "s13",
  numero: 13,
  titre: "Variables locales, globales et docstring",
  sousTitre: "Où vit une variable, et comment expliquer une fonction",
  palier: "Partie 4 — Structurer un programme",

  accroche: `Une variable créée dans une fonction disparaît quand la fonction se termine.
    Cette règle, qui paraît arbitraire, est ce qui permet d'écrire des programmes de
    milliers de lignes sans que tout se mélange.`,

  objectifs: [
    "distinguer <strong>paramètre</strong>, variable <strong>locale</strong> et variable <strong>globale</strong>",
    "savoir qu'on peut lire une globale, mais pas la modifier sans <code>global</code>",
    "documenter une fonction avec un <strong>docstring</strong>",
    "assembler plusieurs fonctions dans un programme complet",
  ],

  motDeLaFin: `Tu as parcouru tout le chapitre 1. Les listes, les dictionnaires et les
    projets t'attendent dans la suite du programme de NSI.`,

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
          titre: "Trois notions à distinguer",
          contenu: `
            <div class="encadre">
              <span class="chapo">Définitions</span>
              <ul style="margin-bottom:0">
                <li>Un <strong>paramètre</strong> (ou <em>argument</em>) est une variable
                  donnée entre parenthèses lors de la création d'une fonction.</li>
                <li>Une <strong>variable locale</strong> n'existe que
                  <strong>pendant l'exécution de la fonction</strong>.</li>
                <li>Une <strong>variable globale</strong> est définie
                  <strong>en dehors des fonctions</strong> et accessible dans tout le
                  programme.</li>
              </ul>
            </div>

            <pre class="bloc-code"><code>a = 123

def carre(n):
    resultat = n * n
    return resultat

print(carre(a))</code></pre>

            <p>Dans ce programme :</p>
            <ul>
              <li><code>a</code> est une variable <strong>globale</strong> ;</li>
              <li><code>n</code> est un <strong>paramètre</strong> de <code>carre</code>,
                donc une variable locale ;</li>
              <li><code>resultat</code> est une variable <strong>locale</strong>.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le même nom, deux variables différentes</span>
              Rien n'interdit d'appeler <code>a</code> une variable globale <em>et</em> le
              paramètre d'une fonction : ce sont deux cases mémoire distinctes, qui ne se
              voient pas. C'est déroutant au début, et c'est pourtant ce qui rend les
              fonctions réutilisables.
            </div>`,
        },

        {
          id: "d2",
          type: "qcm",
          titre: "Exercice 35 — Locale ou globale ?",
          contenu: `<p>On considère le programme suivant.</p>
            <pre class="bloc-code"><code>def euro_vers_dollar(euros):
    return euros * 1.19

def euro_vers_yuan(montant):
    montant_dollar = euro_vers_dollar(montant)
    return montant_dollar * 6.93

euros = float(input("entrez le montant en euros : "))
montant_converti = euro_vers_yuan(euros)
print(euros, "€ représente", montant_converti, "yuan")</code></pre>`,
          question: "Quelle affirmation est exacte ?",
          options: [
            { texte: "<code>montant_dollar</code> est une variable globale",
              explication: "Non : elle est créée <em>dans</em> <code>euro_vers_yuan</code>, elle disparaît à la fin de l'appel." },
            { texte: "<code>euros</code> de la ligne 8 et <code>euros</code> paramètre de la première fonction sont la même variable",
              explication: "Non : elles portent le même nom mais vivent dans deux espaces différents." },
            { texte: "<code>montant</code> est un paramètre, donc une variable locale de <code>euro_vers_yuan</code>", correct: true,
              explication: "Exactement. Tout paramètre est une variable locale de la fonction où il est déclaré." },
            { texte: "<code>montant_converti</code> est une variable locale",
              explication: "Elle est créée en dehors de toute fonction : elle est globale." },
          ],
          apres: `<span class="chapo">Le relevé complet</span>
            <strong>Globales</strong> : <code>euros</code> (ligne 8) et
            <code>montant_converti</code>. <strong>Locales</strong> : <code>euros</code>
            (paramètre de <code>euro_vers_dollar</code>), <code>montant</code> (paramètre de
            <code>euro_vers_yuan</code>) et <code>montant_dollar</code>.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Une locale n'existe pas dehors",
          contenu: `
            <p>Ce programme provoque une erreur. <strong>Exécute-le</strong> pour lire le
            message, puis corrige-le pour qu'il affiche :</p>
            <pre class="bloc-code"><code>Le carré vaut 25</code></pre>
            <p>⚠️ Interdit de sortir <code>resultat</code> de la fonction : c'est la fonction
            qui doit <strong>renvoyer</strong> sa valeur.</p>`,
          depart: `def carre(n):\n    resultat = n * n\n\ncarre(5)\nprint("Le carré vaut", resultat)\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer son résultat." },
              { motif: "carre\\s*\\(\\s*5\\s*\\)", message: "Garde l'appel avec 5." },
            ],
            codeAbsent: [
              { motif: "^resultat\\s*=", options: "m", message: "Ne recopie pas le calcul en dehors : la fonction doit le renvoyer." },
            ],
            sortie: "Le carré vaut 25",
          },
          felicitation: "NameError comprise : une locale meurt avec sa fonction. 🔒",
          indices: [
            "Python répond <code>NameError: name 'resultat' is not defined</code> : à la ligne du <code>print</code>, cette variable n'existe plus.",
            "La solution : la fonction renvoie sa valeur, et l'appel la range dans une variable globale.",
          ],
          solution: `def carre(n):\n    resultat = n * n\n    return resultat\n\nvaleur = carre(5)\nprint("Le carré vaut", valeur)\n`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Lire une globale, la modifier",
          contenu: `
            <p>Il est possible <strong>de lire</strong> simplement une variable globale
            depuis une fonction. En revanche, pour <strong>la modifier</strong>, il faut le
            mot-clé <code>global</code> :</p>

            <pre class="bloc-code"><code>compteur = 0

def incrementer():
    global compteur
    compteur = compteur + 1</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">À utiliser exceptionnellement</span>
              Cet usage n'est <strong>pas encouragé</strong> : une fonction qui modifie des
              variables extérieures rend un programme difficile à comprendre et à maintenir.
              On préfère presque toujours passer la valeur en paramètre et renvoyer le
              résultat.
            </div>

            <p>Sans le mot-clé <code>global</code>, l'affectation créerait une
            <strong>nouvelle variable locale</strong> du même nom, et la globale resterait
            inchangée : une erreur très déroutante, car le programme ne signale rien.</p>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Le compteur d'appels",
          contenu: `
            <p>Complète la fonction pour que le compteur soit réellement incrémenté :</p>
            <pre class="bloc-code"><code>Nombre d'appels : 3</code></pre>
            <p>Sans le mot-clé qui convient, le compteur resterait à 0.</p>`,
          depart: `compteur = 0\n\ndef incrementer():\n    compteur = compteur + 1\n\nincrementer()\nincrementer()\nincrementer()\n\nprint("Nombre d'appels :", compteur)\n`,
          validation: {
            codeContient: [
              { motif: "\\bglobal\\b", message: "Pour modifier une variable globale depuis une fonction, il faut le mot-clé global." },
            ],
            sortie: "Nombre d'appels : 3",
          },
          felicitation: "Le mot-clé global, compris — et à n'utiliser qu'en dernier recours. 🌍",
          indices: [
            "Une seule ligne à ajouter, en tête du corps de la fonction.",
            "Exécute d'abord sans rien changer : Python signale que la variable est utilisée avant d'être affectée dans cette portée.",
          ],
          solution: `compteur = 0\n\ndef incrementer():\n    global compteur\n    compteur = compteur + 1\n\nincrementer()\nincrementer()\nincrementer()\n\nprint("Nombre d'appels :", compteur)\n`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Documenter : le docstring",
          contenu: `
            <p>Nous reviendrons plus tard dans l'année — au chapitre 5 — sur le
            « <strong>docstring</strong> » d'une fonction. Pour le moment, nous l'utiliserons
            pour expliquer le <strong>rôle</strong> d'une fonction.</p>

            <p>Un docstring est composé de lignes de texte écrites entre
            <code>"""</code> et <code>"""</code>, juste après la ligne du <code>def</code>.
            Ces lignes ne sont pas exécutées : elles sont destinées à celui qui lit le
            code.</p>

            <pre class="bloc-code"><code>def euro_vers_dollar(montant):
    """
    Renvoie la valeur de montant euros convertie en dollars.
    Par exemple euro_vers_dollar(2) doit renvoyer 2.38
    """
    return montant * 1.19</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Que mettre dedans ?</span>
              Ce que la fonction <strong>renvoie</strong>, pas comment elle s'y prend — le
              code est déjà là pour ça. Un <strong>exemple</strong> chiffré vaut souvent
              mieux qu'une longue phrase.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Docstring ou commentaire ?</span>
              Le <code>#</code> explique une ligne précise, à l'intérieur du code. Le
              docstring décrit la fonction <strong>vue de l'extérieur</strong> : ce qu'elle
              fait, sans qu'on ait besoin de lire son corps.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Documenter une fonction",
          contenu: `
            <p>Ajoute un docstring à cette fonction, puis affiche-le grâce à
            <code>__doc__</code> — l'attribut où Python le range :</p>
            <pre class="bloc-code"><code>Renvoie le prix TTC à partir du prix hors taxes, avec 20 % de TVA.</code></pre>
            <p>Écris exactement cette phrase, sur une seule ligne, entre triples
            guillemets.</p>`,
          depart: `def prix_ttc(ht):\n    return ht * 1.2\n\nprint(prix_ttc.__doc__)\n`,
          validation: {
            codeContient: [
              { motif: "\"\"\"", message: "Le docstring s'écrit entre triples guillemets." },
            ],
            sortie: "Renvoie le prix TTC à partir du prix hors taxes, avec 20 % de TVA.",
          },
          felicitation: "Une fonction documentée se relit six mois plus tard sans effort. 📖",
          indices: [
            "Le docstring se place <strong>juste après</strong> la ligne du <code>def</code>, indenté comme le corps.",
            "Sur une seule ligne : <code>\"\"\"…\"\"\"</code>, ouvrant et fermant sur la même ligne.",
          ],
          solution: `def prix_ttc(ht):\n    """Renvoie le prix TTC à partir du prix hors taxes, avec 20 % de TVA."""\n    return ht * 1.2\n\nprint(prix_ttc.__doc__)\n`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>compteur = 0                 # GLOBALE

def exemple(parametre):      # parametre : LOCALE
    """Ce que fait la fonction."""
    interne = parametre * 2  # interne : LOCALE
    print(compteur)          # on peut LIRE une globale
    return interne

# ici, ni parametre ni interne n'existent</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Depuis une fonction…</th><th>Sur une variable globale</th></tr>
              <tr><td>la <strong>lire</strong></td><td>possible directement</td></tr>
              <tr><td>la <strong>modifier</strong></td><td>possible avec <code>global</code>, mais déconseillé</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La bonne pratique</span>
              Tout ce dont une fonction a besoin entre par ses <strong>paramètres</strong>,
              tout ce qu'elle produit sort par son <strong><code>return</code></strong>.
              Une fonction écrite ainsi peut être déplacée, testée et réutilisée n'importe où.
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
          titre: "Exercice 37 — Compter les voyelles",
          contenu: `
            <p>Deux nouveautés de Python, données ici :</p>
            <ul>
              <li><code>"e" in "aeiouy"</code> vaut <code>True</code> : l'opérateur
                <code>in</code> teste l'appartenance ;</li>
              <li><code>for lettre in mot:</code> parcourt le mot
                <strong>caractère par caractère</strong> — une boucle bornée, mais sans
                <code>range()</code>.</li>
            </ul>
            <p>Complète <code>nombre_voyelles(mot)</code>, qui renvoie le nombre de voyelles
            contenues dans <code>mot</code>. On considérera que <code>y</code> est une
            voyelle, et on ne s'occupera pas des majuscules.</p>`,
          depart: `def nombre_voyelles(mot):\n    compteur = 0\n    for lettre in mot:\n        \n    return compteur\n`,
          validation: {
            codeContient: [
              { motif: "\\bin\\b\\s*\"aeiouy\"|\\bin\\b\\s*'aeiouy'", message: "Teste l'appartenance de la lettre à la chaîne des voyelles." },
              { motif: "\\bfor\\b", message: "Garde la boucle sur les lettres du mot." },
            ],
            tests: `assert nombre_voyelles("bonjour") == 3, "bonjour contient trois voyelles"\nassert nombre_voyelles("python") == 2, "python contient y et o"\nassert nombre_voyelles("") == 0, "un mot vide ne contient aucune voyelle"\nassert nombre_voyelles("aeiouy") == 6, "toutes les voyelles"\nassert nombre_voyelles("brrr") == 0, "aucune voyelle ici"`,
          },
          felicitation: "Parcourir un mot lettre à lettre : une boucle bornée sans range(). 🔤",
          indices: [
            "Dans la boucle, un <code>if</code> teste si la lettre courante fait partie des voyelles.",
            "Si c'est le cas, on incrémente le compteur — c'est l'accumulateur de la séance 9.",
          ],
          solution: `def nombre_voyelles(mot):\n    compteur = 0\n    for lettre in mot:\n        if lettre in "aeiouy":\n            compteur = compteur + 1\n    return compteur\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Exercice 38 — La suite de Syracuse",
          contenu: `
            <p>La <strong>conjecture de Syracuse</strong>. Partons d'un entier <em>n</em> :
            s'il est pair, on le divise par 2 ; sinon, on le multiplie par 3 puis on ajoute 1.
            On recommence indéfiniment, et on finit <strong>toujours</strong> par tomber
            sur 1 — du moins, personne n'a encore trouvé de contre-exemple, ni réussi à le
            démontrer.</p>
            <ol>
              <li>Complète <code>suivant(n)</code>, qui renvoie le successeur de
                <code>n</code> ;</li>
              <li>écris <code>syracuse(n)</code>, qui <strong>affiche</strong> tous les
                termes de la suite en partant de <code>n</code> jusqu'à 1. Tu appelleras
                obligatoirement <code>suivant</code>.</li>
            </ol>
            <p>L'appel <code>syracuse(5)</code> doit afficher :</p>
            <pre class="bloc-code"><code>5
16
8
4
2
1</code></pre>`,
          depart: `def suivant(n):\n    \n\n\ndef syracuse(n):\n    \n\n\nsyracuse(5)\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+syracuse[\\s\\S]*suivant\\s*\\(", message: "syracuse doit appeler suivant." },
              { motif: "//", message: "Pour diviser par 2 en restant dans les entiers, utilise // et non /." },
            ],
            tests: `assert suivant(5) == 16, "5 est impair : 3 x 5 + 1 = 16"\nassert suivant(16) == 8, "16 est pair : 16 / 2 = 8"\nassert suivant(1) == 4, "1 est impair : 3 x 1 + 1 = 4"`,
            sortie: "5\n16\n8\n4\n2\n1",
          },
          felicitation: "Un problème ouvert depuis 1937, programmé en dix lignes. 🌀",
          indices: [
            "Pour savoir si <code>n</code> est pair, teste le reste de sa division par 2.",
            "<code>syracuse</code> affiche d'abord <code>n</code>, puis boucle tant que <code>n</code> n'est pas 1 : à chaque tour, elle avance et affiche.",
            "Attention : la division par 2 doit rester entière, sinon les termes deviennent des flottants.",
          ],
          solution: `def suivant(n):\n    if n % 2 == 0:\n        return n // 2\n    else:\n        return 3 * n + 1\n\n\ndef syracuse(n):\n    print(n)\n    while n != 1:\n        n = suivant(n)\n        print(n)\n\n\nsyracuse(5)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Exercice 38 (suite) — Le temps de vol",
          contenu: `
            <p>Écris <code>temps_de_vol(n)</code>, qui renvoie le <strong>nombre
            d'étapes</strong> nécessaires pour arriver à 1 en partant de <code>n</code>.</p>
            <p>Par exemple, <code>temps_de_vol(5)</code> renvoie 5 : la suite 5, 16, 8, 4, 2,
            1 comporte cinq passages.</p>`,
          depart: `def suivant(n):\n    if n % 2 == 0:\n        return n // 2\n    else:\n        return 3 * n + 1\n\n\ndef temps_de_vol(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "def\\s+temps_de_vol[\\s\\S]*suivant\\s*\\(", message: "temps_de_vol doit appeler suivant." },
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "temps_de_vol doit renvoyer le nombre d'étapes." },
            ],
            tests: `assert temps_de_vol(1) == 0, "on est déjà arrivé : zéro étape"\nassert temps_de_vol(5) == 5, "la suite partant de 5 compte cinq étapes"\nassert temps_de_vol(27) == 111, "27 est célèbre : 111 étapes"\nassert temps_de_vol(2) == 1, "2 arrive à 1 en une étape"`,
          },
          felicitation: "111 étapes pour 27 : la suite ne monte pas toujours tout droit. 🎢",
          indices: [
            "Un compteur à 0 avant la boucle, un <code>return</code> après.",
            "La boucle tourne tant que <code>n</code> n'a pas atteint 1 ; à chaque tour, on avance et on compte.",
          ],
          solution: `def suivant(n):\n    if n % 2 == 0:\n        return n // 2\n    else:\n        return 3 * n + 1\n\n\ndef temps_de_vol(n):\n    etapes = 0\n    while n != 1:\n        n = suivant(n)\n        etapes = etapes + 1\n    return etapes\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Exercice 39 — La parfumerie",
          contenu: `
            <p>Dans une parfumerie, deux promotions sont proposées pour l'achat de deux
            articles :</p>
            <ul>
              <li><strong>Formule A</strong> : 50 % de réduction sur le prix du 2<sup>e</sup>
                article — <em>le moins cher</em> ;</li>
              <li><strong>Formule B</strong> : 20 % de réduction sur le montant total.</li>
            </ul>
            <p>Écris les trois fonctions. <code>meilleure_formule</code> renvoie
            <code>"A"</code> ou <code>"B"</code> ; en cas d'égalité, on renvoie
            <code>"A"</code>.</p>
            <div class="encadre" data-ton="astuce">
              Pour la formule A, attention : la réduction porte sur le
              <strong>moins cher</strong> des deux parfums, quel que soit l'ordre dans lequel
              les prix ont été donnés. Un <code>if</code> s'impose.
            </div>`,
          depart: `# 1. Formule A : 50 % de réduction sur le moins cher des deux articles\ndef promo_A(prix_1, prix_2):\n    \n\n\n# 2. Formule B : 20 % de réduction sur le montant total\ndef promo_B(prix_1, prix_2):\n    \n\n\n# 3. Renvoie "A" ou "B" : la formule la plus avantageuse (en cas d'égalité, "A")\ndef meilleure_formule(prix_1, prix_2):\n    \n`,
          validation: {
            codeContient: [
              { motif: "def\\s+meilleure_formule[\\s\\S]*promo_A\\s*\\(", message: "meilleure_formule doit appeler promo_A." },
              { motif: "def\\s+meilleure_formule[\\s\\S]*promo_B\\s*\\(", message: "… et promo_B." },
              { motif: "def\\s+promo_A[\\s\\S]*\\bif\\b", message: "promo_A doit distinguer lequel des deux prix est le moins cher." },
            ],
            tests: `assert promo_A(10, 20) == 25, "promo_A(10, 20) doit valoir 25"\nassert promo_A(20, 10) == 25, "promo_A(20, 10) doit valoir 25 aussi"\nassert abs(promo_B(10, 20) - 24) < 0.0001, "promo_B(10, 20) doit valoir 24"\nassert meilleure_formule(10, 20) == "B", "avec 10 et 20, la formule B est meilleure"\nassert meilleure_formule(10, 10) == "A", "avec 10 et 10 : A donne 15, B donne 16"\nassert meilleure_formule(1, 100) == "B", "quand un article est bien moins cher, la remise de A porte sur peu : B l'emporte"`,
          },
          felicitation: "Trois fonctions, dont une qui arbitre entre les deux autres. 💅",
          indices: [
            "<code>promo_A</code> : le plus cher est payé plein tarif, le moins cher à moitié prix.",
            "<code>promo_B</code> tient en une ligne : le total, multiplié par 0.8.",
            "<code>meilleure_formule</code> ne recalcule rien : elle compare les résultats des deux appels.",
          ],
          solution: `def promo_A(prix_1, prix_2):\n    if prix_1 < prix_2:\n        return prix_2 + prix_1 / 2\n    else:\n        return prix_1 + prix_2 / 2\n\n\ndef promo_B(prix_1, prix_2):\n    return (prix_1 + prix_2) * 0.8\n\n\ndef meilleure_formule(prix_1, prix_2):\n    if promo_A(prix_1, prix_2) <= promo_B(prix_1, prix_2):\n        return "A"\n    else:\n        return "B"\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Exercice 39 (fin) — Le programme principal",
          contenu: `
            <p>Muni d'un billet de <strong>50 €</strong>, Nicolas souhaite offrir deux parfums
            à sa mère. Ajoute le programme principal : il demande le prix des deux parfums,
            affiche le total pour chaque formule, indique la plus avantageuse, et précise si
            Nicolas peut s'offrir les deux parfums.</p>
            <p>Avec 10 € et 20 € :</p>
            <pre class="bloc-code"><code>Prix du premier parfum : 10
Prix du second parfum : 20
Formule A : 25.0 €
Formule B : 24.0 €
La formule la plus avantageuse est la formule B
Nicolas peut offrir les deux parfums à sa mère.</code></pre>
            <p>Teste ensuite avec 12 € et 45 €, puis 35 € et 20 €.</p>`,
          depart: `def promo_A(prix_1, prix_2):\n    if prix_1 < prix_2:\n        return prix_2 + prix_1 / 2\n    else:\n        return prix_1 + prix_2 / 2\n\ndef promo_B(prix_1, prix_2):\n    return (prix_1 + prix_2) * 0.8\n\ndef meilleure_formule(prix_1, prix_2):\n    if promo_A(prix_1, prix_2) <= promo_B(prix_1, prix_2):\n        return "A"\n    else:\n        return "B"\n\n# 4. Le programme principal\n`,
          saisiesTest: ["10", "20"],
          validation: {
            codeContient: [
              { motif: "float\\s*\\(\\s*input", message: "Les deux prix doivent être demandés et convertis." },
              { motif: "meilleure_formule\\s*\\(", message: "Le programme doit appeler meilleure_formule." },
              { motif: "\\bif\\b", message: "Il faut un test pour savoir si les 50 € suffisent." },
            ],
            sortie: "Prix du premier parfum : 10\nPrix du second parfum : 20\nFormule A : 25.0 €\nFormule B : 24.0 €\nLa formule la plus avantageuse est la formule B\nNicolas peut offrir les deux parfums à sa mère.",
          },
          felicitation: "Un programme complet : des fonctions, un dialogue, une décision. 🛍️",
          indices: [
            "Range les deux totaux dans des variables : ils servent deux fois, à l'affichage puis au test.",
            "Le test final compare le <strong>meilleur</strong> des deux totaux à 50.",
            "Le message alternatif : <code>50 € ne suffiront pas...</code>",
          ],
          solution: `def promo_A(prix_1, prix_2):\n    if prix_1 < prix_2:\n        return prix_2 + prix_1 / 2\n    else:\n        return prix_1 + prix_2 / 2\n\ndef promo_B(prix_1, prix_2):\n    return (prix_1 + prix_2) * 0.8\n\ndef meilleure_formule(prix_1, prix_2):\n    if promo_A(prix_1, prix_2) <= promo_B(prix_1, prix_2):\n        return "A"\n    else:\n        return "B"\n\nparfum_1 = float(input("Prix du premier parfum : "))\nparfum_2 = float(input("Prix du second parfum : "))\n\ntotal_a = promo_A(parfum_1, parfum_2)\ntotal_b = promo_B(parfum_1, parfum_2)\n\nprint("Formule A :", total_a, "€")\nprint("Formule B :", total_b, "€")\nprint("La formule la plus avantageuse est la formule", meilleure_formule(parfum_1, parfum_2))\n\nif total_a <= 50 or total_b <= 50:\n    print("Nicolas peut offrir les deux parfums à sa mère.")\nelse:\n    print("50 € ne suffiront pas...")\n`,
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
          titre: "Exercice 38 (fin) — Le record de Syracuse",
          contenu: `
            <p>Écris <code>temps_max(n)</code>, qui renvoie le plus grand temps de vol obtenu
            pour un nombre de départ inférieur ou égal à <code>n</code>, ainsi que le nombre
            de départ correspondant.</p>
            <div class="encadre" data-ton="astuce">
              <code>temps_max</code> renvoie <strong>deux</strong> valeurs à la fois : c'est
              un <em>couple</em>, que l'on écrit <code>return (maximum, depart)</code> et que
              l'on récupère par exemple avec <code>(maxi, dep) = temps_max(100)</code>.
            </div>`,
          depart: `def suivant(n):\n    if n % 2 == 0:\n        return n // 2\n    else:\n        return 3 * n + 1\n\ndef temps_de_vol(n):\n    etapes = 0\n    while n != 1:\n        n = suivant(n)\n        etapes = etapes + 1\n    return etapes\n\n\ndef temps_max(n):\n    maximum = 0\n    depart = 1\n    for k in range(1, ):\n        \n    return (maximum, depart)\n`,
          validation: {
            codeContient: [
              { motif: "temps_de_vol\\s*\\(", message: "temps_max doit appeler temps_de_vol." },
              { motif: "\\bfor\\b", message: "Il faut parcourir tous les départs possibles." },
            ],
            tests: `assert temps_max(10) == (19, 9), "pour n ≤ 10, le record est 19 étapes, atteint en partant de 9"\nassert temps_max(100) == (118, 97), "pour n ≤ 100, le record est 118 étapes, atteint en partant de 97"\nassert temps_max(1) == (0, 1), "pour n = 1, aucun vol"`,
          },
          felicitation: "97 détient le record sous 100, avec 118 étapes. 🏆",
          indices: [
            "La boucle doit parcourir tous les départs de 1 à <code>n</code> <strong>inclus</strong>.",
            "C'est l'algorithme du champion : on garde le meilleur temps rencontré, et le départ qui l'a produit.",
            "Deux lignes dans le <code>if</code> : mettre à jour le maximum <em>et</em> le départ.",
          ],
          solution: `def suivant(n):\n    if n % 2 == 0:\n        return n // 2\n    else:\n        return 3 * n + 1\n\ndef temps_de_vol(n):\n    etapes = 0\n    while n != 1:\n        n = suivant(n)\n        etapes = etapes + 1\n    return etapes\n\n\ndef temps_max(n):\n    maximum = 0\n    depart = 1\n    for k in range(1, n + 1):\n        duree = temps_de_vol(k)\n        if duree > maximum:\n            maximum = duree\n            depart = k\n    return (maximum, depart)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Compter sans distinction de casse",
          contenu: `
            <p>Améliore <code>nombre_voyelles</code> pour qu'elle compte aussi les voyelles
            <strong>majuscules</strong>.</p>
            <div class="encadre" data-ton="astuce">
              <code>"A".lower()</code> renvoie <code>"a"</code> : la méthode
              <code>.lower()</code> met un texte en minuscules, sans le modifier.
            </div>`,
          depart: `def nombre_voyelles(mot):\n    compteur = 0\n    for lettre in mot:\n        if lettre in "aeiouy":\n            compteur = compteur + 1\n    return compteur\n`,
          validation: {
            codeContient: [
              { motif: "\\.lower\\s*\\(\\s*\\)", message: "Utilise la méthode .lower() pour ignorer la casse." },
            ],
            tests: `assert nombre_voyelles("Bonjour") == 3, "Bonjour contient trois voyelles"\nassert nombre_voyelles("PYTHON") == 2, "PYTHON contient Y et O"\nassert nombre_voyelles("AeIoU") == 5, "cinq voyelles, quelle que soit la casse"\nassert nombre_voyelles("BRRR") == 0, "aucune voyelle"`,
          },
          felicitation: "Une méthode bien placée, et la casse n'est plus un problème. 🔤",
          indices: [
            "Deux endroits possibles : mettre tout le mot en minuscules avant la boucle, ou chaque lettre dans le test.",
            "La première solution est plus efficace : une seule conversion au lieu d'une par lettre.",
          ],
          solution: `def nombre_voyelles(mot):\n    compteur = 0\n    for lettre in mot.lower():\n        if lettre in "aeiouy":\n            compteur = compteur + 1\n    return compteur\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Une bibliothèque documentée",
          contenu: `
            <p>Défi final du parcours. Écris <strong>trois fonctions</strong> sur un même
            thème, chacune munie d'un <strong>docstring</strong>, dont une qui en appelle une
            autre — puis un programme qui les utilise et affiche
            <strong>au moins trois lignes</strong>.</p>
            <p>Des idées : une bibliothèque de géométrie, un convertisseur multi-devises, un
            calculateur de statistiques, un simulateur de prêt, un outil de mise en forme de
            texte…</p>`,
          depart: `# Ta bibliothèque documentée\n`,
          validation: {
            codeContient: [
              { motif: "def[\\s\\S]*def[\\s\\S]*\\bdef\\b", message: "Il faut au moins trois fonctions." },
              { motif: "\"\"\"[\\s\\S]*\"\"\"[\\s\\S]*\"\"\"[\\s\\S]*\"\"\"[\\s\\S]*\"\"\"[\\s\\S]*\"\"\"",
                message: "Chacune des trois fonctions doit avoir son docstring." },
              { motif: "\\breturn\\b", message: "Tes fonctions doivent renvoyer leurs résultats." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins trois lignes.",
          },
          felicitation: "Parcours NSI terminé. Tout le chapitre 1, du premier print à la dernière fonction. 🏁🎓",
          indices: [
            "Un docstring d'une ligne suffit : dis ce que la fonction <strong>renvoie</strong>, avec un exemple chiffré.",
            "La fonction qui en appelle une autre est celle qui donne sa cohérence à l'ensemble.",
          ],
          solution: `def aire_disque(rayon):\n    """Renvoie l'aire d'un disque. Par exemple aire_disque(1) renvoie environ 3.14."""\n    return 3.14159 * rayon * rayon\n\n\ndef volume_cylindre(rayon, hauteur):\n    """Renvoie le volume d'un cylindre, en appelant aire_disque."""\n    return aire_disque(rayon) * hauteur\n\n\ndef masse_eau(volume):\n    """Renvoie la masse en kg de volume litres d'eau. 1 litre pèse 1 kg."""\n    return volume\n\n\nv = volume_cylindre(0.5, 2)\n\nprint("Aire de la base :", aire_disque(0.5), "m2")\nprint("Volume du cylindre :", v, "m3")\nprint("Masse d'eau contenue :", masse_eau(v * 1000), "kg")\n`,
        },
      ],
    },
  ],
};

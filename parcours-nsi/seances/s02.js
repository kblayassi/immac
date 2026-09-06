/* NSI — chapitre 1, séance 2 : les types et les conversions.
 * Reprend « Les types fondamentaux », « Les conversions de types » et l'encadré
 * input() du cours, ainsi que les exercices 2, 5, 6 et 7 (question 1).
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Les types et les conversions",
  sousTitre: "Toutes les valeurs ne se ressemblent pas",
  palier: "Partie 1 — Manipuler des données",

  accroche: `Une variable retient une valeur — mais de quelle nature ? Un entier, un
    nombre à virgule, du texte, un vrai-ou-faux ? Cette question n'est pas théorique :
    elle décide de ce que Python accepte de faire avec.`,

  objectifs: [
    "reconnaître les quatre types fondamentaux : <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>",
    "déterminer un type avec <code>type()</code>",
    "convertir avec <code>int()</code>, <code>float()</code> et <code>str()</code>",
    "savoir que <code>input()</code> renvoie <strong>toujours</strong> une chaîne",
  ],

  motDeLaFin: `Tu sais de quoi sont faites tes données. À la séance 3, on apprend à
    les afficher proprement.`,

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
          titre: "Les quatre types fondamentaux",
          contenu: `
            <p>Chaque valeur manipulée par un programme a un <strong>type</strong>. Voici
            les quatre les plus utilisés en NSI :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Type</th><th>Signification</th><th>Description</th><th>Exemples</th></tr>
              <tr><td><code>int</code></td><td>Integer</td><td>entier, positif ou négatif</td><td><code>12</code> &nbsp; <code>-24</code></td></tr>
              <tr><td><code>float</code></td><td>Float</td><td>nombre décimal (flottant)</td><td><code>3.14</code> &nbsp; <code>-0.5</code></td></tr>
              <tr><td><code>str</code></td><td>String</td><td>texte (chaîne de caractères)</td><td><code>"Bonjour"</code> &nbsp; <code>"12"</code></td></tr>
              <tr><td><code>bool</code></td><td>Boolean</td><td>booléen (valeur logique)</td><td><code>True</code> &nbsp; <code>False</code></td></tr>
            </table>
            </div>

            <p>En Python, on n'indique <strong>jamais</strong> le type d'une variable : il est
            déduit automatiquement de la valeur qu'on lui donne. Mais on peut le demander,
            avec la fonction <code>type()</code> :</p>

            <pre class="bloc-code"><code>type(42)        # &lt;class 'int'&gt;
type("Salut")   # &lt;class 'str'&gt;
type(3.14)      # &lt;class 'float'&gt;
type(True)      # &lt;class 'bool'&gt;</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le point, jamais la virgule</span>
              Un décimal s'écrit <code>3.14</code> et non <code>3,14</code>. En Python, la
              virgule sert à séparer des éléments, pas à marquer les décimales.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Interroger les types",
          contenu: `
            <p>Quatre variables t'attendent, une par type. Affiche le type de chacune, une
            par ligne, pour obtenir exactement :</p>
            <pre class="bloc-code"><code>&lt;class 'int'&gt;
&lt;class 'float'&gt;
&lt;class 'str'&gt;
&lt;class 'bool'&gt;</code></pre>`,
          depart: `nombre = 42\ndecimal = 3.14\ntexte = "Salut"\nbooleen = True\n\n`,
          validation: {
            codeContient: [
              { motif: "type\\s*\\(", message: "Utilise la fonction type()." },
              { motif: "\\bnombre\\b[\\s\\S]*\\bnombre\\b", message: "Sers-toi des variables déjà définies." },
            ],
            sortie: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
          },
          felicitation: "Quatre types, quatre réponses de Python. 🔍",
          indices: [
            "Quatre lignes du type <code>print(type(…))</code>, une par variable.",
            "L'ordre demandé est celui du code de départ.",
          ],
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Exercice 2 — Le piège du .0",
          contenu: `<p>Voici deux affectations qui se ressemblent beaucoup.</p>
            <pre class="bloc-code"><code>c = 3.14
d = 1.0</code></pre>`,
          question: "Quels sont les types de c et d ?",
          options: [
            { texte: "<code>c</code> est un float, <code>d</code> est un int",
              explication: "Non : le <code>.0</code> suffit à faire de <code>d</code> un flottant, même si sa valeur est entière." },
            { texte: "les deux sont des float", correct: true,
              explication: "Oui. Ce qui compte, c'est l'<strong>écriture</strong> : dès qu'il y a un point décimal, la valeur est un flottant." },
            { texte: "les deux sont des int", explication: "<code>3.14</code> n'a rien d'un entier." },
            { texte: "<code>c</code> est un float, <code>d</code> est un bool",
              explication: "<code>1.0</code> n'est pas un booléen : les booléens s'écrivent <code>True</code> et <code>False</code>." },
          ],
          apres: `<span class="chapo">1 et 1.0 ne sont pas la même chose</span>
            Ils valent la même quantité, mais Python ne les range pas dans le même type.
            La distinction comptera dès qu'on parlera de division.`,
        },

        {
          id: "d4",
          type: "qcm",
          titre: "Exercice 2 (suite) — Le type d'un résultat",
          contenu: `<p>Le type d'une variable dépend aussi du <strong>calcul</strong> qui la
            remplit.</p>
            <pre class="bloc-code"><code>f = "Bonjour, " + "ça va ?"
g = 2 + 6
h = 4.2 + 1</code></pre>`,
          question: "Quels sont les types de f, g et h ?",
          options: [
            { texte: "<code>str</code>, <code>int</code>, <code>int</code>",
              explication: "Presque : <code>h</code> vaut 5.2, ce n'est pas un entier." },
            { texte: "<code>str</code>, <code>int</code>, <code>float</code>", correct: true,
              explication: "Oui. Deux chaînes additionnées donnent une chaîne ; deux entiers donnent un entier ; dès qu'un flottant intervient, le résultat est flottant." },
            { texte: "<code>str</code>, <code>str</code>, <code>float</code>",
              explication: "<code>2 + 6</code> porte sur deux nombres : le résultat est le nombre 8, pas le texte \"8\"." },
            { texte: "les trois sont des <code>str</code>",
              explication: "Seule la première ligne manipule du texte." },
          ],
          apres: `<span class="chapo">La contamination du flottant</span>
            Un calcul qui mélange un entier et un flottant donne toujours un
            <strong>flottant</strong>. On dit que le flottant « l'emporte ».`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Convertir d'un type à l'autre",
          contenu: `
            <p>Il est souvent utile de <strong>convertir</strong> une valeur en un autre type.
            Python fournit trois fonctions pour cela :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Fonction</th><th>Effet</th><th>Exemple</th></tr>
              <tr><td><code>int()</code></td><td>vers un entier</td><td><code>int("42")</code> donne <code>42</code></td></tr>
              <tr><td><code>float()</code></td><td>vers un flottant</td><td><code>float("3.14")</code> donne <code>3.14</code></td></tr>
              <tr><td><code>str()</code></td><td>vers une chaîne</td><td><code>str(42)</code> donne <code>"42"</code></td></tr>
            </table>
            </div>

            <p>Les opérateurs arithmétiques de Python, pour mémoire :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opérateur</th><th>Symbole</th><th>Opérateur</th><th>Symbole</th></tr>
              <tr><td>addition</td><td><code>+</code></td><td>puissance</td><td><code>**</code></td></tr>
              <tr><td>soustraction</td><td><code>-</code></td><td>quotient entier</td><td><code>//</code></td></tr>
              <tr><td>multiplication</td><td><code>*</code></td><td>reste</td><td><code>%</code></td></tr>
              <tr><td>division</td><td><code>/</code></td><td></td><td></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux divisions, deux types</span>
              <code>/</code> renvoie <strong>toujours</strong> un flottant, même quand ça
              tombe juste : <code>6 / 2</code> vaut <code>3.0</code>. Pour rester dans les
              entiers, il faut <code>//</code>.
            </div>`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Exercice 5 — Prévoir le type d'un calcul",
          contenu: `<p>Sept calculs. L'un d'eux ne fonctionne pas du tout.</p>`,
          code: `a = 3 + 2.0\nb = 6 / 2\nc = 6 // 2\nd = 1.5 ** 3\ne = "py" + "thon"\nf = 3 * "miaou"\ng = 2 + "a"`,
          question: "Quelle ligne provoque une erreur ?",
          options: [
            { texte: "la ligne <code>c</code> : on ne peut pas diviser avec <code>//</code>",
              explication: "<code>//</code> est parfaitement valide : c'est la division entière, elle donne 3." },
            { texte: "la ligne <code>f</code> : on ne peut pas multiplier du texte",
              explication: "Si ! Multiplier une chaîne par un entier la <strong>répète</strong> : on obtient \"miaoumiaoumiaou\"." },
            { texte: "la ligne <code>g</code> : on ne peut pas additionner un entier et une chaîne", correct: true,
              explication: "Oui : <code>TypeError</code>. Python ne devine pas si tu voulais le nombre 2 ou le texte \"2\"." },
            { texte: "aucune : les sept lignes fonctionnent",
              explication: "Six fonctionnent, mais pas la septième." },
          ],
          apres: `<span class="chapo">Le récapitulatif</span>
            <code>a</code> vaut 5.0 (float) · <code>b</code> vaut 3.0 (float, à cause de
            <code>/</code>) · <code>c</code> vaut 3 (int) · <code>d</code> vaut 3.375 (float) ·
            <code>e</code> vaut "python" (str, concaténation) · <code>f</code> vaut
            "miaoumiaoumiaou" (str, répétition).
            <br><br>Pour additionner <code>2</code> et <code>"a"</code>, il faut
            <strong>convertir</strong> : <code>str(2) + "a"</code> donne <code>"2a"</code>.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Vérifier soi-même",
          contenu: `
            <p>Reprends les six calculs qui fonctionnent et affiche, pour chacun, sa valeur
            <strong>et</strong> son type. Sortie attendue :</p>
            <pre class="bloc-code sans-copie"><code>5.0 &lt;class 'float'&gt;
3.0 &lt;class 'float'&gt;
3 &lt;class 'int'&gt;
3.375 &lt;class 'float'&gt;
python &lt;class 'str'&gt;
miaoumiaoumiaou &lt;class 'str'&gt;</code></pre>
            <p>La ligne fautive a été retirée du code de départ.</p>`,
          depart: `a = 3 + 2.0\nb = 6 / 2\nc = 6 // 2\nd = 1.5 ** 3\ne = "py" + "thon"\nf = 3 * "miaou"\n\n`,
          validation: {
            codeContient: [
              { motif: "type\\s*\\(", message: "Chaque ligne doit afficher aussi le type." },
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi des variables déjà définies." },
            ],
            sortie: "5.0 <class 'float'>\n3.0 <class 'float'>\n3 <class 'int'>\n3.375 <class 'float'>\npython <class 'str'>\nmiaoumiaoumiaou <class 'str'>",
          },
          felicitation: "Six calculs, six types confirmés par Python. ✅",
          indices: [
            "Six lignes, sur le modèle <code>print(a, type(a))</code>.",
            "La virgule sépare les deux informations : Python glisse une espace entre elles.",
          ],
        },

        {
          id: "d8",
          type: "code",
          titre: "Exercice 6 — Trouver la ligne fautive",
          contenu: `
            <p>L'exécution de ce code provoque une erreur.</p>
            <p><strong>1.</strong> Sans exécuter, devine quelle instruction est fautive.
            <strong>2.</strong> Vérifie en exécutant, puis <strong>commente</strong> la ligne
            responsable — un <code>#</code> en début de ligne — et retire la variable
            correspondante du <code>print</code>.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les commentaires</span>
              Tout ce qui suit un dièse <code>#</code> n'est pas interprété par Python.
              Deux usages : <strong>documenter</strong> son code, et <strong>désactiver</strong>
              des lignes sans les supprimer — très pratique pour déboguer.
            </div>`,
          depart: `lisa = 2\nmarge = 5\nbart = lisa + 2 * marge\nmaggie = bart / (10 - 2 * marge)\nhomer = bart * "D'oh!"\n\nprint(bart, maggie, homer)\n`,
          validation: {
            codeContient: [
              { motif: "^\\s*#\\s*maggie", options: "m", message: "La ligne fautive doit être commentée, pas supprimée." },
              { motif: "\\bhomer\\b[\\s\\S]*\\bhomer\\b", message: "Garde l'affichage de bart et homer." },
            ],
            sortie: "12 D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!D'oh!",
          },
          felicitation: "Division par zéro repérée — et le piège de la dernière ligne évité. 🐞",
          indices: [
            "Une seule des cinq lignes provoque l'erreur. Calcule mentalement ce que vaut le dénominateur.",
            "<code>marge</code> vaut 5, donc <code>10 - 2 * marge</code> vaut… et Python refuse cette division.",
            "Attention au piège : la ligne de <code>homer</code>, elle, est parfaitement valide — multiplier une chaîne par un entier la répète.",
          ],
        },

        {
          id: "d9",
          type: "cours",
          titre: "Demander une valeur à l'utilisateur",
          contenu: `
            <p>Pour demander une valeur, on utilise la fonction <code>input()</code> :</p>

            <pre class="bloc-code"><code>age = input("Quel âge as-tu ? ")</code></pre>

            <p>Python affiche la question, attend une saisie validée par
            <kbd>Entrée</kbd>, et range le texte tapé dans la variable.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle qui coûte le plus de bugs de l'année</span>
              <code>input()</code> renvoie <strong>toujours une chaîne de caractères</strong>,
              même si l'utilisateur tape des chiffres. Pour calculer avec, il faut convertir :
              <code>int(input(…))</code> ou <code>float(input(…))</code>.
            </div>

            <p>Sans conversion, <code>"2" + "3"</code> donnerait <code>"23"</code> et non
            <code>5</code> — et <code>age + 1</code> provoquerait une <code>TypeError</code>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Dans ce parcours</span>
              Quand ton programme demande une saisie, un curseur apparaît <strong>dans la
              console</strong>, juste en dessous. Tape ta réponse, puis <kbd>Entrée</kbd>.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Exercice 7 — Dialoguer avec l'utilisateur",
          contenu: `
            <p>Écris un programme qui demande <strong>deux nombres</strong> à l'utilisateur,
            puis affiche leur somme. Exemple avec 2 et 3 :</p>
            <pre class="bloc-code"><code>Premier nombre : 2
Deuxième nombre : 3
La somme vaut 5.0</code></pre>
            <p>Les nombres peuvent être décimaux : convertis avec <code>float</code>.</p>`,
          depart: `# Demande deux nombres à l'utilisateur, puis affiche leur somme.\n`,
          saisiesTest: ["2", "3"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Il faut deux saisies." },
              { motif: "float\\s*\\(", message: "Les nombres peuvent être décimaux : convertis avec float()." },
            ],
            sortieRegex: "La somme vaut \\d+(\\.\\d+)?",
            sortieRegexMessage: "Ton programme doit afficher « La somme vaut » suivi du résultat.",
          },
          felicitation: "Deux saisies, une conversion, un calcul. 💬",
          indices: [
            "Chaque saisie s'écrit sur le modèle <code>nombre_1 = float(input(\"…\"))</code>.",
            "Sans la conversion, Python collerait les deux textes au lieu de les additionner.",
          ],
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>On écrit…</th></tr>
              <tr><td>connaître un type</td><td><code>type(valeur)</code></td></tr>
              <tr><td>convertir en entier</td><td><code>int("42")</code></td></tr>
              <tr><td>convertir en flottant</td><td><code>float("3.14")</code></td></tr>
              <tr><td>convertir en texte</td><td><code>str(42)</code></td></tr>
              <tr><td>demander un entier</td><td><code>n = int(input("… "))</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les trois règles de type</span>
              <ol style="margin-bottom:0">
                <li>un calcul mêlant <code>int</code> et <code>float</code> donne un <code>float</code> ;</li>
                <li><code>/</code> donne toujours un <code>float</code>, <code>//</code> reste entier ;</li>
                <li><code>input()</code> donne toujours un <code>str</code>.</li>
              </ol>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 25,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Les deux divisions",
          contenu: `
            <p>Avec <code>a = 17</code> et <code>b = 5</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>17 / 5 = 3.4
17 // 5 = 3
17 % 5 = 2</code></pre>
            <p>Les trois résultats doivent être calculés à partir des variables.</p>`,
          depart: `a = 17\nb = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "La deuxième ligne demande la division entière." },
              { motif: "%", message: "La troisième ligne demande le reste." },
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi des variables déjà définies." },
            ],
            codeAbsent: [
              { motif: "3\\.4", message: "Les résultats doivent être calculés." },
            ],
            sortie: "17 / 5 = 3.4\n17 // 5 = 3\n17 % 5 = 2",
          },
          indices: [
            "Chaque ligne affiche la variable, un texte contenant l'opérateur, le signe égal, puis le calcul.",
            "Le symbole d'opération dans le texte est entre guillemets ; celui du calcul ne l'est pas.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Réparer les conversions",
          contenu: `
            <p>Ce programme veut calculer un prix total, mais il ne fonctionne pas.
            Trouve les <strong>deux</strong> conversions manquantes. Avec les saisies
            <code>3</code> puis <code>2.5</code>, il doit afficher :</p>
            <pre class="bloc-code"><code>Total : 7.5</code></pre>`,
          depart: `quantite = input("Combien d'articles ? ")\nprix_unitaire = input("Prix unitaire ? ")\n\nprint("Total :", quantite * prix_unitaire)\n`,
          saisiesTest: ["3", "2.5"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(", message: "Une quantité est un entier : convertis-la avec int()." },
              { motif: "float\\s*\\(", message: "Un prix peut être décimal : convertis-le avec float()." },
            ],
            sortieRegex: "Total : 7\\.5",
            sortieRegexMessage: "Avec 3 articles à 2.5, le total doit valoir 7.5.",
          },
          felicitation: "Sans conversion, Python aurait répété le texte trois fois. 🔁",
          indices: [
            "Sans conversion, <code>quantite</code> contient le texte \"3\" : multiplier un texte par un texte n'a aucun sens pour Python.",
            "La quantité est un entier, le prix un décimal : les deux conversions ne sont pas les mêmes.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Du texte vers des nombres",
          contenu: `
            <p>Les trois valeurs ci-dessous sont du <strong>texte</strong>. Convertis-les
            pour que les calculs fonctionnent, et affiche exactement :</p>
            <pre class="bloc-code"><code>Somme : 30
Produit : 200
Moyenne : 15.5</code></pre>`,
          depart: `a = "10"\nb = "20"\nc = "16.5"\n\n`,
          validation: {
            codeContient: [
              { motif: "int\\s*\\(", message: "a et b doivent devenir des entiers." },
              { motif: "float\\s*\\(", message: "c est décimal : il faut float()." },
            ],
            codeAbsent: [
              { motif: "\\b30\\b|\\b200\\b", message: "Les résultats doivent être calculés." },
            ],
            sortie: "Somme : 30\nProduit : 200\nMoyenne : 15.5",
          },
          indices: [
            "La somme et le produit portent sur <code>a</code> et <code>b</code>.",
            "La moyenne porte sur les trois valeurs : (10 + 20 + 16.5) / 3 = 15.5.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "L'âge en jours",
          contenu: `
            <p>Demande son âge à l'utilisateur (en années entières) et affiche son âge
            approximatif en jours, en comptant des années de 365 jours. Avec 17 :</p>
            <pre class="bloc-code"><code>Quel âge as-tu ? 17
Tu as vécu environ 6205 jours</code></pre>`,
          depart: `\n`,
          saisiesTest: ["17"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "L'âge doit être demandé et converti en entier." },
              { motif: "365", message: "Une année vaut 365 jours." },
            ],
            sortieRegex: "environ \\d+ jours",
            sortieRegexMessage: "Ton programme doit afficher « environ … jours ».",
          },
          indices: [
            "Une saisie convertie, puis un affichage contenant une multiplication.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le convertisseur de secondes",
          contenu: `
            <p>Une durée est donnée en secondes. Décompose-la en minutes et secondes, et
            affiche exactement :</p>
            <pre class="bloc-code"><code>500 secondes, c'est 8 minutes et 20 secondes</code></pre>
            <p>Les deux nombres doivent être calculés à partir de la variable.</p>`,
          depart: `duree = 500\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le nombre de minutes s'obtient par division entière." },
              { motif: "%", message: "Les secondes restantes s'obtiennent avec le reste." },
              { motif: "\\bduree\\b[\\s\\S]*\\bduree\\b", message: "Sers-toi de la variable duree." },
            ],
            codeAbsent: [
              { motif: "\\b20\\b", message: "Les résultats doivent être calculés." },
            ],
            sortie: "500 secondes, c'est 8 minutes et 20 secondes",
          },
          felicitation: "Quotient et reste : le duo qui décompose tout. ⏱️",
          indices: [
            "Une minute vaut 60 secondes.",
            "Le quotient donne les minutes entières, le reste donne ce qui dépasse.",
          ],
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 20,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Additionner un nombre et une lettre",
          contenu: `
            <p>La ligne <code>2 + "a"</code> de l'exercice 5 provoquait une
            <code>TypeError</code>. Fais-la fonctionner de <strong>deux façons
            différentes</strong> :</p>
            <pre class="bloc-code"><code>2a
99</code></pre>
            <p>La première ligne colle les deux morceaux ; la seconde additionne
            <code>2</code> et le code du caractère <code>"a"</code>, que renvoie
            <code>ord("a")</code>.</p>`,
          depart: `nombre = 2\nlettre = "a"\n\n`,
          validation: {
            codeContient: [
              { motif: "str\\s*\\(", message: "La première ligne demande une conversion en texte." },
              { motif: "ord\\s*\\(", message: "La seconde ligne demande la fonction ord()." },
            ],
            codeAbsent: [
              { motif: "\"2a\"|'2a'|\\b99\\b", message: "Les deux résultats doivent être calculés." },
            ],
            sortie: "2a\n99",
          },
          felicitation: "Deux interprétations, deux conversions. Python ne choisit pas à ta place. 🔀",
          indices: [
            "Pour coller, il faut que les deux morceaux soient du <strong>texte</strong>.",
            "<code>ord(\"a\")</code> renvoie 97, un entier : l'addition redevient possible.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Arrondir sans arrondir",
          contenu: `
            <p>Sans utiliser <code>round()</code>, affiche <code>3.14159</code> arrondi au
            centième :</p>
            <pre class="bloc-code"><code>3.14</code></pre>
            <p>💡 Multiplier par 100 amène les centièmes devant la virgule ;
            <code>int()</code> tronque la partie décimale.</p>`,
          depart: `x = 3.14159\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bround\\s*\\(", message: "round() est interdite : reconstruis l'arrondi." },
              { motif: "3\\.14\\b(?!159)", message: "Le résultat doit être calculé à partir de x." },
            ],
            codeContient: [
              { motif: "int\\s*\\(", message: "Il te faut int() pour tronquer." },
              { motif: "100", message: "Il faut passer par les centièmes." },
            ],
            sortie: "3.14",
          },
          felicitation: "Un arrondi reconstruit à la main. 📐",
          indices: [
            "<code>x * 100</code> vaut 314.159 : tronquer donne 314.",
            "Ajouter 0.5 avant de tronquer donnerait l'arrondi au plus proche ; ici, tronquer suffit.",
            "Il ne reste qu'à rediviser par 100.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre convertisseur",
          contenu: `
            <p>Défi libre. Écris un convertisseur qui <strong>demande une valeur</strong>,
            la convertit, et affiche <strong>au moins trois lignes</strong> de résultats.</p>
            <p>Des idées : des euros vers plusieurs devises, des degrés Celsius vers
            Fahrenheit et Kelvin, des octets vers Ko / Mo / Go, une distance en km vers
            m / cm / miles…</p>`,
          depart: `# Ton convertisseur\n`,
          saisiesTest: ["25"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton convertisseur doit demander une valeur." },
              { motif: "int\\s*\\(|float\\s*\\(", message: "La saisie doit être convertie en nombre." },
              { motif: "=[^\\n=]*[-+*/]", message: "Au moins une valeur doit être calculée." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins trois lignes.",
          },
          felicitation: "Séance 2 terminée. Les types n'ont plus de secret. 🏁",
          indices: [
            "Une saisie convertie, quelques variables calculées, puis les affichages.",
            "Pense à rappeler la valeur de départ dans ton premier affichage.",
          ],
        },
      ],
    },
  ],
};

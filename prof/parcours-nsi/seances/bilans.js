/* Bilans de fin de partie — NSI Première, chapitre 1.
 *
 * Une fiche par partie du manifeste (clé = id du palier). Ni exercice ni
 * correction : la liste de ce que l'élève doit savoir faire en sortant de la
 * partie, chaque savoir-faire illustré par une ligne de code.
 * Forme décrite dans docs/.Ressources/parcours-interactifs.md.
 *
 * Les exemples reprennent ceux des mémos de séance : l'élève doit y reconnaître
 * ce qu'il a déjà écrit, pas découvrir quelque chose de nouveau.
 */

export default {

  /* ================================================== PARTIE 1 — DONNÉES */
  donnees: {
    titre: "Manipuler des données",
    accroche: `Variables, types, affichage : les trois briques de tout programme. Voici
      ce que tu dois savoir faire, sans hésiter, avant d'écrire des conditions.`,

    sections: [
      {
        titre: "Les variables",
        seances: ["s01"],
        savoirs: [
          { sait: `créer une variable par une affectation : <code>=</code> se lit
              « <strong>reçoit</strong> » — Python calcule la droite, puis range le résultat à gauche`,
            code: `age = 17\nnom = "Ali"` },
          { sait: "incrémenter une variable, en version longue ou courte",
            code: `vies = vies - 1\nvies -= 1          # même chose` },
          { sait: `anticiper la valeur d'une variable ligne après ligne : une affectation
              utilise les valeurs <strong>du moment</strong>, elle ne se recalcule pas ensuite`,
            code: `a = 3\nb = a + 1    # b vaut 4\na = 10       # b vaut toujours 4` },
          { sait: "échanger deux variables en passant par une troisième",
            code: `temp = a\na = b\nb = temp` },
          { sait: `nommer ses variables en <strong>snake_case</strong> : minuscules, mots
              séparés par <code>_</code>, ni accent, ni espace, ni chiffre au début, jamais un mot-clé`,
            code: `age_capitaine = 42` },
        ],
      },
      {
        titre: "Les types et les conversions",
        seances: ["s02"],
        savoirs: [
          { sait: "reconnaître les quatre types et les demander à Python avec <code>type()</code>",
            code: `type(42)        # int\ntype(3.14)      # float\ntype("Salut")   # str\ntype(True)      # bool` },
          { sait: "convertir d'un type à l'autre",
            code: `int("42")       # 42\nfloat("3.14")   # 3.14\nstr(42)         # "42"` },
          { sait: `prévoir le type d'un calcul : <code>int</code> et <code>float</code> mêlés
              donnent un <code>float</code> ; <code>/</code> donne toujours un <code>float</code>`,
            code: `6 / 2       # 3.0\n6 // 2      # 3\n7 % 2       # 1\n2 ** 10     # 1024` },
          { sait: "demander une valeur à l'utilisateur et la convertir",
            code: `n = int(input("Un entier ? "))` },
        ],
        pieges: `<ul>
            <li><code>input()</code> renvoie <strong>toujours</strong> une chaîne : <code>"2" + "3"</code> vaut <code>"23"</code> ;</li>
            <li>un décimal s'écrit <code>3.14</code>, jamais <code>3,14</code> ;</li>
            <li><code>1</code> et <code>1.0</code> valent la même quantité, mais n'ont pas le même type.</li>
          </ul>`,
      },
      {
        titre: "Afficher",
        seances: ["s03"],
        savoirs: [
          { sait: "afficher plusieurs valeurs avec des virgules : <code>print</code> met les espaces tout seul",
            code: `print("Tu as", age, "ans.")` },
          { sait: "assembler des chaînes avec <code>+</code>, en convertissant les nombres et en écrivant les espaces soi-même",
            code: `print("Tu as " + str(age) + " ans.")` },
          { sait: "écrire une <strong>f-string</strong>, avec des variables ou des calculs entre accolades",
            code: `print(f"{nom} a {age} ans.")\nprint(f"L'an prochain tu auras {age + 1} ans.")` },
        ],
        pieges: `<code>"Tu as " + age</code> lève une <code>TypeError</code> :
          <code>+</code> ne colle une chaîne qu'à une autre chaîne. Soit tu convertis avec
          <code>str()</code>, soit tu passes à la f-string.`,
      },
    ],

    suite: `<strong>Le point qui coince toujours :</strong> <code>=</code> ne veut pas dire
      « est égal à » mais « reçoit ». C'est pour cela que <code>a = a + 1</code> a un sens.`,
  },

  /* ================================================= PARTIE 2 — DÉCIDER */
  decider: {
    titre: "Prendre des décisions",
    accroche: `Comparer des valeurs, puis faire choisir le programme entre un, deux ou
      plusieurs cas. Voici ce que tu dois savoir faire avant d'écrire des boucles.`,

    sections: [
      {
        titre: "Comparer et combiner",
        seances: ["s04"],
        savoirs: [
          { sait: `fabriquer un booléen avec les six comparaisons <code>==</code> <code>!=</code>
              <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>`,
            code: `print(3 < 4)          # True\nest_majeur = age >= 18` },
          { sait: "combiner des conditions avec <code>and</code>, <code>or</code>, <code>not</code> — chaque comparaison écrite en entier",
            code: `x >= 5 and x <= 10\njour == 6 or jour == 7\nnot (x > 10)` },
          { sait: "tester la divisibilité avec le reste",
            code: `n % 3 == 0       # n est un multiple de 3` },
          { sait: "écrire une condition sur un booléen sans le comparer à <code>True</code>",
            code: `age >= 18 and a_le_permis      # et non a_le_permis == True` },
        ],
        pieges: `<ul>
            <li><code>=</code> affecte, <code>==</code> compare : l'erreur numéro un de l'année ;</li>
            <li><code>5 &lt; x and &lt; 10</code> ne veut rien dire : <code>x &gt; 5 and x &lt; 10</code> ;</li>
            <li><code>True</code> et <code>False</code> prennent une majuscule.</li>
          </ul>`,
      },
      {
        titre: "if, puis if … else",
        seances: ["s05", "s06"],
        savoirs: [
          { sait: "écrire un <code>if</code> : condition, deux-points, bloc indenté de quatre espaces",
            code: `if age >= 18:\n    print("Majeur")\nprint("Fin du programme")   # exécuté dans tous les cas` },
          { sait: "traiter les deux cas avec <code>else</code>, sans condition, aligné sur son <code>if</code>",
            code: `if age >= 18:\n    print("Majeur")\nelse:\n    print("Mineur")` },
          { sait: `choisir : deux cas complémentaires → <code>if … else</code> ; deux tests
              indépendants, vrais en même temps → deux <code>if</code> séparés` },
        ],
      },
      {
        titre: "Plusieurs cas : elif",
        seances: ["s07"],
        savoirs: [
          { sait: "écrire une cascade : Python s'arrête à la <strong>première</strong> condition vraie",
            code: `if age < 11:\n    print("Primaire")\nelif age < 15:\n    print("Collège")\nelif age < 18:\n    print("Lycée")\nelse:\n    print("Adulte")` },
          { sait: "ordonner les tests du plus restrictif au plus général, sans retester ce qui est déjà acquis" },
          { sait: `choisir la bonne forme : cas exclusifs → cascade ; tests cumulables →
              <code>if</code> séparés ; deux branches identiques → un seul <code>if</code> avec <code>or</code>` },
        ],
        pieges: `<ul>
            <li>oublier les deux-points, ou l'indentation du bloc ;</li>
            <li>donner une condition à <code>else</code> ou l'indenter ;</li>
            <li>mettre <code>note &gt;= 10</code> en tête de cascade : un 18 n'obtiendrait jamais « très bien ».</li>
          </ul>`,
      },
    ],

    suite: `Énonce la règle à voix haute, en français, avant de l'écrire. Puis relis-toi :
      « existe-t-il un cas où rien ne s'afficherait ? »`,
  },

  /* ================================================= PARTIE 3 — RÉPÉTER */
  repeter: {
    titre: "Répéter des instructions",
    accroche: `Deux boucles, et de quoi les contrôler finement. Voici ce que tu dois savoir
      faire avant d'écrire tes propres fonctions.`,

    sections: [
      {
        titre: "La boucle non bornée while",
        seances: ["s08"],
        savoirs: [
          { sait: "écrire un <code>while</code> avec ses trois ingrédients",
            code: `n = 0               # 1. initialisation\nwhile n < 10:       # 2. condition d'arrêt\n    print(n)\n    n = n + 1       # 3. progression` },
          { sait: "contrôler une saisie : redemander tant que la réponse est invalide",
            code: `note = int(input("Note ? "))\nwhile note < 0 or note > 20:\n    note = int(input("Entre 0 et 20 : "))` },
          { sait: "écrire un algorithme de seuil : compter les étapes pour dépasser une valeur" },
          { sait: "piloter une boucle par un <strong>drapeau</strong> booléen",
            code: `continuer = True\nwhile continuer:\n    ...\n    if reponse == "non":\n        continuer = False` },
        ],
        pieges: `Chaque fois que tu écris un <code>while</code>, demande-toi : « qu'est-ce qui,
          dans ce corps, va rendre la condition fausse ? » Sans réponse, la boucle est infinie.`,
      },
      {
        titre: "La boucle bornée for",
        seances: ["s09"],
        savoirs: [
          { sait: "maîtriser les trois formes de <code>range</code> — la borne de droite est toujours exclue",
            code: `range(5)            # 0, 1, 2, 3, 4\nrange(1, 11)        # 1 à 10\nrange(100, 1001, 2) # les pairs de 100 à 1000` },
          { sait: "se servir de la variable de boucle, ou l'appeler <code>_</code> quand elle ne sert pas",
            code: `for _ in range(3):\n    print("Coucou !")` },
          { sait: "accumuler : initialiser avant, faire grandir pendant, afficher après",
            code: `somme = 0\nfor i in range(1, 6):\n    somme = somme + i\nprint(somme)    # 15` },
          { sait: `choisir la valeur de départ : <code>0</code> pour une somme ou un compteur,
              <code>1</code> pour un produit` },
        ],
      },
      {
        titre: "Boucles imbriquées, break et continue",
        seances: ["s10"],
        savoirs: [
          { sait: "imbriquer deux boucles, et compter les tours : <code>n × m</code>",
            code: `for i in range(3):\n    for j in range(2):\n        print(i, j)     # 6 affichages` },
          { sait: "construire une ligne de texte dans la boucle intérieure, l'afficher dans l'extérieure",
            code: `for i in range(1, 6):\n    ligne = ""\n    for j in range(i):\n        ligne = ligne + "#"\n    print(ligne)` },
          { sait: "arrêter une boucle avec <code>break</code>, sauter un tour avec <code>continue</code>",
            code: `for i in range(1, 21):\n    if i == 13:\n        continue\n    print(i)` },
        ],
        pieges: `<code>break</code> ne sort que de la boucle <strong>la plus intérieure</strong>.
          Pour sortir des deux : un drapeau, ou une fonction avec <code>return</code>.`,
      },
    ],

    suite: `<strong>for ou while ?</strong> Si tu sais à l'avance combien de tours il faut,
      prends <code>for</code>. Sinon, prends <code>while</code>.`,
  },

  /* ============================================== PARTIE 4 — STRUCTURER */
  structurer: {
    titre: "Structurer un programme",
    accroche: `Les fonctions découpent un programme en morceaux qu'on écrit, teste et
      réutilise séparément. Voici ce que tu dois savoir faire à la fin du chapitre.`,

    sections: [
      {
        titre: "Définir et appeler",
        seances: ["s11"],
        savoirs: [
          { sait: "définir une fonction avec <code>def</code>, et l'appeler — définir n'exécute rien",
            code: `def bonjour():\n    print("Bonjour tout le monde !")\n\nbonjour()` },
          { sait: "lui passer des informations par des paramètres, dans le <strong>même ordre</strong> à l'appel",
            code: `def presenter(prenom, age):\n    print(f"{prenom} a {age} ans.")\n\npresenter("Ali", 16)` },
          { sait: "nommer une fonction par un verbe : <code>afficher_table</code>, <code>calculer_moyenne</code>" },
        ],
        pieges: `Écrire <code>bonjour</code> au lieu de <code>bonjour()</code> est une erreur
          <strong>silencieuse</strong> : Python ne dit rien, et rien ne se passe.`,
      },
      {
        titre: "return, procédures et composition",
        seances: ["s12"],
        savoirs: [
          { sait: "renvoyer un résultat avec <code>return</code>, et le réutiliser",
            code: `def carre(n):\n    return n * n\n\nx = carre(5)     # 25\nprint(x + 1)     # 26` },
          { sait: `distinguer <code>return</code> (le programme récupère la valeur) et
              <code>print</code> (l'humain la voit, elle est perdue). Dans le doute : <code>return</code>,
              et on affiche à l'extérieur` },
          { sait: "écrire une <strong>procédure</strong> : une fonction qui agit sans rien renvoyer",
            code: `def afficher_table(n):\n    for i in range(1, 11):\n        print(i * n)` },
          { sait: "savoir que <code>return</code> arrête la fonction aussitôt — et s'en servir pour sortir d'une boucle" },
          { sait: "faire coopérer des fonctions : l'une appelle l'autre, ou utilise son résultat" },
        ],
        pieges: `Les trois symptômes du <code>return</code> oublié : <code>None</code> s'affiche,
          une <code>TypeError</code> parle de <code>NoneType</code>, une variable qui devrait
          contenir un résultat est vide.`,
      },
      {
        titre: "Variables locales et globales",
        seances: ["s13"],
        savoirs: [
          { sait: `distinguer paramètre, variable <strong>locale</strong> (n'existe que pendant
              l'appel) et variable <strong>globale</strong> (définie hors de toute fonction)`,
            code: `a = 123                # globale\ndef carre(n):          # n : locale\n    resultat = n * n   # locale\n    return resultat` },
          { sait: "lire une globale depuis une fonction ; la modifier exige <code>global</code>, à éviter" },
          { sait: "faire entrer les données par les paramètres et sortir le résultat par <code>return</code>" },
        ],
      },
    ],

    suite: `<strong>La bonne pratique :</strong> tout ce dont une fonction a besoin entre
      par ses paramètres, tout ce qu'elle produit sort par son <code>return</code>. Écrite
      ainsi, elle se déplace, se teste et se réutilise n'importe où.`,
  },
};

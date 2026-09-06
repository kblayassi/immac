/* NSI — chapitre 1, séance 12 : return, procédures et composition.
 * Reprend la section « Retourner une valeur avec return » du cours et les
 * exercices 31, 32, 33, 34, 36 et 40 du chapitre.
 */

export default {
  id: "s12",
  numero: 12,
  titre: "return, procédures et composition",
  sousTitre: "Renvoyer un résultat plutôt que l'afficher",
  palier: "Partie 4 — Structurer un programme",

  accroche: `Afficher, ce n'est pas donner un résultat. Une fonction qui <em>affiche</em>
    parle à l'humain ; une fonction qui <em>renvoie</em> parle au programme — et son
    résultat peut alors servir ailleurs. C'est le point le plus important de l'année.`,

  objectifs: [
    "renvoyer un résultat avec <code>return</code>",
    "distinguer <code>return</code> de <code>print</code>",
    "savoir ce qu'est une <strong>procédure</strong>",
    "faire coopérer plusieurs fonctions",
  ],

  motDeLaFin: `Tes fonctions produisent des résultats réutilisables. À la séance 13,
    on regarde où vivent leurs variables — et comment les documenter.`,

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
          titre: "Retourner une valeur",
          contenu: `
            <p>Certaines fonctions <strong>retournent un résultat</strong> après un calcul.
            On utilise pour cela le mot-clé <code>return</code> :</p>

            <pre class="bloc-code"><code>def nom_de_la_fonction(parametres):
    instructions
    return resultat</code></pre>

            <p>Par exemple, une fonction qui renvoie le carré du nombre passé en
            paramètre :</p>

            <pre class="bloc-code"><code>def carre(n):
    return n * n

carre(5)      # vaut 25</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th><code>print</code></th><th><code>return</code></th></tr>
              <tr><td>Qui en profite ?</td><td>l'humain qui regarde l'écran</td><td>le <strong>programme</strong></td></tr>
              <tr><td>Peut-on réutiliser ?</td><td>non, c'est perdu</td><td>oui, on peut le ranger dans une variable</td></tr>
              <tr><td>Effet sur la fonction</td><td>aucun, elle continue</td><td>elle <strong>s'arrête aussitôt</strong></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle de décision</span>
              Une fonction qui <strong>calcule quelque chose</strong> doit
              <code>return</code>. Une fonction dont le travail <em>est</em> d'écrire à
              l'écran peut se contenter de <code>print</code>. Dans le doute :
              <code>return</code>, et on affiche à l'extérieur.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première fonction qui renvoie",
          contenu: `
            <p>Écris <code>carre(n)</code> qui <strong>renvoie</strong> le carré de son
            paramètre — sans rien afficher.</p>
            <p>Il n'y a rien à voir dans la console : c'est le bouton
            <strong>✓ Valider</strong> qui va tester ta fonction avec plusieurs valeurs.</p>`,
          depart: `def carre(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer son résultat." },
            ],
            codeAbsent: [
              { motif: "\\bprint\\b", message: "Cette fonction ne doit rien afficher : elle renvoie." },
            ],
            tests: `assert carre(5) == 25, "carre(5) doit valoir 25"\nassert carre(0) == 0, "carre(0) doit valoir 0"\nassert carre(-4) == 16, "le carré d'un nombre négatif est positif"\nassert carre(12) == 144, "carre(12) doit valoir 144"`,
          },
          felicitation: "Quatre valeurs testées, quatre réussites. ✅",
          indices: [
            "Une seule ligne dans le corps, avec <code>return</code>.",
            "Le carré s'écrit <code>n * n</code> ou <code>n ** 2</code>.",
          ],
          solution: `def carre(n):\n    return n * n\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Sans return, que vaut le résultat ?",
          contenu: `<p>Regarde bien : la fonction affiche, mais ne renvoie rien.</p>`,
          code: `def double(n):\n    print(n * 2)\n\nresultat = double(5)\nprint(resultat)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>10</code> puis <code>10</code>",
              explication: "Le premier 10 vient du print de la fonction. Mais <code>resultat</code> n'a rien reçu." },
            { texte: "<code>10</code> puis <code>None</code>", correct: true,
              explication: "Oui : une fonction sans <code>return</code> renvoie <code>None</code>, le « rien » de Python." },
            { texte: "<code>10</code> seulement",
              explication: "Le second <code>print</code> s'exécute aussi, et affiche ce que contient <code>resultat</code>." },
            { texte: "une erreur",
              explication: "Le programme tourne — c'est bien ce qui le rend piégeux." },
          ],
          apres: `<span class="chapo">None, le signe qui ne trompe pas</span>
            Si tu vois <code>None</code> s'afficher, ou une <code>TypeError</code> parlant de
            <code>NoneType</code>, cherche une fonction où tu as écrit <code>print</code>
            au lieu de <code>return</code>. C'est presque toujours ça.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Exercice 31 — Le parc d'attraction",
          contenu: `
            <p>Le droit d'entrée journalier dans un parc est de <strong>37 €</strong> pour un
            adulte et de <strong>28 €</strong> pour un enfant. Alice et Bob font payer les
            entrées, mais leur caisse est en panne et la queue s'allonge…</p>
            <p>La fonction <code>prix</code> leur est fournie. <strong>Exécute d'abord</strong>
            le programme : que se passe-t-il ? Puis ajoute les deux appels pour obtenir :</p>
            <pre class="bloc-code"><code>167
158</code></pre>
            <p>Le premier appel correspond à 3 adultes et 2 enfants, le second à 2 adultes et
            3 enfants.</p>`,
          depart: `def prix(nbre_adultes, nbre_enfants):\n    resultat = 37 * nbre_adultes + 28 * nbre_enfants\n    return resultat\n\n# Ajoute les deux appels ci-dessous\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\(\\s*prix\\s*\\(", message: "Il faut afficher le résultat renvoyé par la fonction." },
            ],
            sortie: "167\n158",
          },
          felicitation: "Deux appels, deux résultats différents. L'ordre compte. 🎢",
          indices: [
            "Sans appel, rien ne s'affiche : définir une fonction, c'est seulement écrire la recette.",
            "Le résultat de <code>prix(…)</code> doit être passé à <code>print</code>.",
            "Attention à l'ordre des arguments : le premier est le nombre d'adultes.",
          ],
          solution: `def prix(nbre_adultes, nbre_enfants):\n    resultat = 37 * nbre_adultes + 28 * nbre_enfants\n    return resultat\n\nprint(prix(3, 2))\nprint(prix(2, 3))\n`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Exercice 31 (suite) — Pourquoi le résultat change",
          contenu: `<p><code>prix(3, 2)</code> renvoie 167 et <code>prix(2, 3)</code>
            renvoie 158, alors que les deux groupes comptent cinq personnes.</p>`,
          question: "Pourquoi ?",
          options: [
            { texte: "Parce que Python calcule dans l'ordre inverse",
              explication: "Non : Python affecte simplement chaque argument au paramètre correspondant, dans l'ordre." },
            { texte: "Parce que le premier argument va à <code>nbre_adultes</code> et le second à <code>nbre_enfants</code>", correct: true,
              explication: "Oui. <code>prix(3, 2)</code> facture 3 adultes et 2 enfants : 3 × 37 + 2 × 28 = 167 €. L'ordre des arguments est capital." },
            { texte: "Parce que la fonction contient une erreur",
              explication: "La fonction est correcte : ce sont les deux situations qui diffèrent." },
            { texte: "Parce que <code>resultat</code> garde sa valeur d'un appel à l'autre",
              explication: "Non : <code>resultat</code> est recréée à chaque appel. On y reviendra à la séance 13." },
          ],
          apres: `<span class="chapo">Un adulte coûte 9 € de plus qu'un enfant</span>
            Échanger un adulte contre un enfant fait donc varier le total de 9 € :
            167 − 158 = 9. Vérifie que le calcul te paraît cohérent — c'est le meilleur
            moyen de repérer une inversion d'arguments.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Exercice 31 (fin) — Le vrai programme d'Alice et Bob",
          contenu: `
            <p>Alice et Bob veulent aller plus vite : saisir simplement les nombres, sans
            avoir à écrire <code>prix(3, 2)</code>. Complète leur programme.</p>
            <pre class="bloc-code"><code>Nombre d'adultes ? 3
Nombre d'enfants ? 2
À payer : 167 €</code></pre>`,
          depart: `def prix(nbre_adultes, nbre_enfants):\n    resultat = 37 * nbre_adultes + 28 * nbre_enfants\n    return resultat\n\nadultes = \nenfants = \n\n`,
          saisiesTest: ["3", "2"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "Les deux nombres doivent être demandés et convertis." },
              { motif: "a_payer\\s*=\\s*prix\\s*\\(|prix\\s*\\(\\s*adultes", message: "Le résultat de la fonction doit être récupéré." },
            ],
            sortieRegex: "À payer : \\d+ €",
            sortieRegexMessage: "Le programme doit afficher « À payer : … € ».",
          },
          felicitation: "Le résultat renvoyé, rangé dans une variable, puis affiché. 💶",
          indices: [
            "Les deux saisies se convertissent en entiers.",
            "Range le résultat dans une variable <code>a_payer</code> : c'est plus lisible que de tout mettre dans le <code>print</code>.",
          ],
          solution: `def prix(nbre_adultes, nbre_enfants):\n    resultat = 37 * nbre_adultes + 28 * nbre_enfants\n    return resultat\n\nadultes = int(input("Nombre d'adultes ? "))\nenfants = int(input("Nombre d'enfants ? "))\n\na_payer = prix(adultes, enfants)\nprint("À payer :", a_payer, "€")\n`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Exercice 32 — Le tarif étudiant",
          contenu: `
            <p>Un nouveau tarif entre en vigueur : le tarif <strong>étudiant</strong>, à
            30 €.</p>
            <p>Écris <code>prix_etudiants</code>, qui prend en paramètres un nombre
            d'adultes, un nombre d'étudiants et un nombre d'enfants — <strong>dans cet
            ordre</strong> — et <strong>renvoie</strong> le prix total.</p>
            <pre class="bloc-code"><code>1 adulte, 2 étudiants, 3 enfants : 181 €</code></pre>
            <p>⚠️ La fonction doit <strong>renvoyer</strong> le prix, et non l'afficher :
            c'est le programme appelant qui décide quoi en faire.</p>`,
          depart: `def prix_etudiants(nbre_adultes, nbre_etudiants, nbre_enfants):\n    \n\n\n# Un test rapide : 1 adulte, 2 étudiants et 3 enfants doivent payer 181 €\nprint("1 adulte, 2 étudiants, 3 enfants :", prix_etudiants(1, 2, 3), "€")\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le prix." },
            ],
            codeAbsent: [
              { motif: "\\n {4,}print", message: "La fonction ne doit rien afficher : elle renvoie." },
            ],
            tests: `assert prix_etudiants(1, 2, 3) == 181, "1 adulte, 2 étudiants, 3 enfants : 181 €"\nassert prix_etudiants(0, 0, 0) == 0, "un groupe vide ne paie rien"\nassert prix_etudiants(2, 0, 0) == 74, "deux adultes paient 74 €"\nassert prix_etudiants(0, 1, 0) == 30, "un étudiant paie 30 €"`,
            sortie: "1 adulte, 2 étudiants, 3 enfants : 181 €",
          },
          felicitation: "Trois tarifs, trois paramètres, un seul return. 🎟️",
          indices: [
            "Le calcul additionne trois produits : nombre × tarif, pour chaque catégorie.",
            "Attention à l'ordre : adultes, étudiants, enfants — dans cet ordre exact.",
          ],
          solution: `def prix_etudiants(nbre_adultes, nbre_etudiants, nbre_enfants):\n    resultat = 37 * nbre_adultes + 30 * nbre_etudiants + 28 * nbre_enfants\n    return resultat\n\n\nprint("1 adulte, 2 étudiants, 3 enfants :", prix_etudiants(1, 2, 3), "€")\n`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "Exercice 33 — Le piège du return",
          contenu: `<p>Bob veut afficher les dix premiers résultats de la table de 9. Il écrit
            ceci.</p>`,
          code: `def table_mult(nbre):\n    for i in range(1, 11):\n        return i * nbre\n\nprint(table_mult(9))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "les dix résultats, de 9 à 90",
              explication: "C'est ce à quoi on s'attend — mais <code>return</code> ne laisse pas la boucle finir." },
            { texte: "<code>9</code> seulement", correct: true,
              explication: "Oui : dès que Python rencontre <code>return</code>, il <strong>sort immédiatement de la fonction</strong>, même au milieu d'une boucle. Un seul tour a lieu." },
            { texte: "<code>90</code> seulement",
              explication: "Ce serait le dernier tour — mais la boucle n'atteint jamais le dernier tour." },
            { texte: "<code>None</code>",
              explication: "La fonction renvoie bien une valeur, dès le premier tour." },
          ],
          apres: `<span class="chapo">return arrête tout</span>
            Ce comportement n'est pas un défaut : il est souvent très utile — c'est ainsi
            qu'on sort d'une boucle dès qu'on a trouvé ce qu'on cherchait. Mais ici, Bob
            voulait afficher dix lignes : il lui fallait <code>print</code>, pas
            <code>return</code>.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Exercice 33 (suite) — La procédure",
          contenu: `
            <p>Corrige la fonction de Bob pour qu'elle affiche bien les dix résultats :</p>
            <pre class="bloc-code"><code>9
18
27
36
45
54
63
72
81
90</code></pre>
            <div class="encadre">
              <span class="chapo">Définition : procédure</span>
              Une fonction qui ne renvoie rien mais réalise des actions — des affichages, par
              exemple — s'appelle une <strong>procédure</strong>. En Python, on parle le plus
              souvent simplement de <em>fonction</em>.
            </div>
            <p>Inutile d'écrire <code>return None</code> à la fin : Python renvoie
            <code>None</code> de toute façon.</p>`,
          depart: `def table_mult(nbre):\n    for i in range(1, 11):\n        return i * nbre\n\ntable_mult(9)\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Garde la boucle." },
            ],
            codeAbsent: [
              { motif: "\\breturn\\b", message: "Une procédure n'a pas besoin de return." },
            ],
            sortie: "9\n18\n27\n36\n45\n54\n63\n72\n81\n90",
          },
          felicitation: "Une procédure : elle agit, elle ne renvoie rien. 📢",
          indices: [
            "Un seul mot change dans la fonction.",
            "L'appel, lui, n'a plus besoin d'être entouré d'un <code>print</code> : la fonction affiche elle-même.",
          ],
          solution: `def table_mult(nbre):\n    for i in range(1, 11):\n        print(i * nbre)\n\ntable_mult(9)\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># Une fonction qui CALCULE : elle renvoie
def carre(n):
    return n * n

x = carre(5)        # x vaut 25
print(x + 1)        # 26

# Une PROCÉDURE : elle agit, elle ne renvoie rien
def afficher_table(n):
    for i in range(1, 11):
        print(i * n)

afficher_table(9)   # pas de print autour : elle affiche elle-même</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les trois symptômes du return oublié</span>
              <ol style="margin-bottom:0">
                <li><code>None</code> s'affiche à l'écran ;</li>
                <li><code>TypeError</code> mentionnant <code>NoneType</code> ;</li>
                <li>une variable qui devrait contenir un résultat est vide.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Des éléments facultatifs</span>
              Les <strong>paramètres</strong> le sont : une fonction sans donnée d'entrée
              garde ses parenthèses, vides. Le <strong><code>return</code></strong> aussi :
              une procédure s'en passe.
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
          titre: "Exercice 34 — Afficher le calcul complet",
          contenu: `
            <p>Modifie la fonction pour qu'elle affiche également le calcul.
            <code>table_multiplication(9)</code> doit afficher :</p>
            <pre class="bloc-code"><code>9 x 1 = 9
9 x 2 = 18
9 x 3 = 27
...
9 x 10 = 90</code></pre>
            <p>💡 Un seul <code>print()</code> suffit : il accepte autant d'arguments que
            l'on veut, séparés par des virgules.</p>`,
          depart: `def table_multiplication(nbre):\n    for i in range(1, 11):\n        print(i * nbre)\n\ntable_multiplication(9)\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Garde la boucle." },
              { motif: "\\bnbre\\b[\\s\\S]*\\bnbre\\b", message: "Sers-toi du paramètre nbre." },
            ],
            sortie: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90",
          },
          indices: [
            "Le <code>print</code> reçoit maintenant cinq morceaux : le nombre, le texte « x », le multiplicateur, le texte « = », et le produit.",
          ],
          solution: `def table_multiplication(nbre):\n    for i in range(1, 11):\n        print(nbre, "x", i, "=", nbre * i)\n\ntable_multiplication(9)\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Chasse aux bugs : le return oublié",
          contenu: `
            <p>Cette fonction devrait renvoyer le triple de son paramètre, et le programme
            afficher <code>Le triple de 7 est 21</code>. Il y a
            <strong>deux erreurs</strong>.</p>`,
          depart: `def triple(n)\n    print(n * 3)\n\nprint("Le triple de 7 est", triple(7))\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer, pas afficher." },
            ],
            sortie: "Le triple de 7 est 21",
          },
          felicitation: "Deux-points et return : les deux bugs les plus fréquents. 🐞",
          indices: [
            "Ligne 1 : il manque le caractère qui annonce le corps.",
            "Ligne 2 : la fonction affiche au lieu de renvoyer — d'où le <code>None</code> à l'arrivée.",
          ],
          solution: `def triple(n):\n    return n * 3\n\nprint("Le triple de 7 est", triple(7))\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Exercice 36 — Le plus grand",
          contenu: `
            <ol>
              <li>Écris <code>maxi_2(n1, n2)</code>, qui renvoie le plus grand des deux
                entiers ;</li>
              <li>écris <code>maxi_3(n1, n2, n3)</code>, qui renvoie le plus grand des trois.
                ⚠️ Tu appelleras <strong>obligatoirement</strong> <code>maxi_2</code>.</li>
            </ol>
            <div class="encadre" data-ton="astuce">
              💡 Réutiliser une fonction déjà écrite plutôt que de recopier son code, c'est
              tout l'intérêt des fonctions : le jour où l'on corrige <code>maxi_2</code>,
              <code>maxi_3</code> est corrigée elle aussi.
            </div>`,
          depart: `# 1.\ndef maxi_2(n1, n2):\n    \n\n\n# 2. Cette fonction doit obligatoirement appeler maxi_2\ndef maxi_3(n1, n2, n3):\n    \n`,
          validation: {
            codeContient: [
              { motif: "def\\s+maxi_3[\\s\\S]*maxi_2\\s*\\(", message: "maxi_3 doit appeler maxi_2." },
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "Les deux fonctions doivent renvoyer un résultat." },
            ],
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "max() est interdite : ce sont ces fonctions que tu reconstruis." },
            ],
            tests: `assert maxi_2(3, 8) == 8, "maxi_2(3, 8) doit valoir 8"\nassert maxi_2(8, 3) == 8, "maxi_2(8, 3) doit valoir 8"\nassert maxi_2(5, 5) == 5, "maxi_2(5, 5) doit valoir 5"\nassert maxi_3(1, 2, 3) == 3, "maxi_3(1, 2, 3) doit valoir 3"\nassert maxi_3(3, 2, 1) == 3, "maxi_3(3, 2, 1) doit valoir 3"\nassert maxi_3(2, 9, 2) == 9, "maxi_3(2, 9, 2) doit valoir 9"`,
          },
          felicitation: "Une fonction bâtie sur une autre : c'est ainsi qu'on construit gros. 🥇",
          indices: [
            "<code>maxi_2</code> tient en un <code>if … else</code>, chaque branche renvoyant l'un des deux.",
            "Le plus grand de trois, c'est le plus grand entre le troisième et le plus grand des deux premiers.",
            "Autrement dit, <code>maxi_2</code> appelée <strong>deux fois</strong>, l'une dans l'autre.",
          ],
          solution: `def maxi_2(n1, n2):\n    if n1 > n2:\n        return n1\n    else:\n        return n2\n\n\ndef maxi_3(n1, n2, n3):\n    return maxi_2(maxi_2(n1, n2), n3)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Exercice 40 — La distance d'arrêt",
          contenu: `
            <p>Pour déterminer la distance d'arrêt d'un véhicule, on additionne la distance
            parcourue pendant le <strong>temps de réaction</strong> et la <strong>distance
            de freinage</strong>. Sur route sèche, avec <em>V</em> la vitesse en km/h :</p>
            <ul>
              <li>distance de réaction : <em>R</em> = <em>V</em> / 3,6 (en m) ;</li>
              <li>distance de freinage : <em>F</em> = <em>V</em>² / 200 (en m) ;</li>
              <li>distance d'arrêt : <em>A</em> = <em>R</em> + <em>F</em> (en m).</li>
            </ul>
            <p>Complète les trois fonctions en remplaçant <code>pass</code> par les
            instructions nécessaires.</p>
            <p>💡 La fonction <code>arret</code> doit <strong>appeler</strong> les deux
            précédentes plutôt que de refaire les calculs.</p>`,
          depart: `def reaction(vitesse):\n    """Distance parcourue pendant le temps de réaction, en mètres."""\n    pass\n\n\ndef freinage(vitesse):\n    """Distance de freinage, en mètres."""\n    pass\n\n\ndef arret(vitesse):\n    """Distance d'arrêt totale, en mètres. Appelle les deux fonctions précédentes."""\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+arret[\\s\\S]*reaction\\s*\\(", message: "arret doit appeler reaction." },
              { motif: "def\\s+arret[\\s\\S]*freinage\\s*\\(", message: "arret doit appeler freinage." },
            ],
            codeAbsent: [
              { motif: "\\bpass\\b", message: "Il ne doit plus rester de pass." },
            ],
            tests: `assert abs(reaction(50) - 13.888888888888888) < 0.0001, "reaction(50) doit valoir environ 13,89 m"\nassert freinage(50) == 12.5, "freinage(50) doit valoir 12,5 m"\nassert abs(arret(50) - 26.38888888888889) < 0.0001, "arret(50) doit valoir environ 26,39 m"\nassert abs(arret(130) - 120.61111111111111) < 0.0001, "arret(130) doit valoir environ 120,6 m"`,
          },
          felicitation: "À 130 km/h, la distance d'arrêt est presque cinq fois celle de 50 km/h. 🚗",
          indices: [
            "Chaque fonction tient en une ligne, avec <code>return</code>.",
            "Le carré de la vitesse s'écrit <code>vitesse ** 2</code>.",
            "<code>arret</code> additionne les résultats des deux appels : elle ne refait aucun calcul.",
          ],
          solution: `def reaction(vitesse):\n    """Distance parcourue pendant le temps de réaction, en mètres."""\n    return vitesse / 3.6\n\n\ndef freinage(vitesse):\n    """Distance de freinage, en mètres."""\n    return vitesse ** 2 / 200\n\n\ndef arret(vitesse):\n    """Distance d'arrêt totale, en mètres. Appelle les deux fonctions précédentes."""\n    return reaction(vitesse) + freinage(vitesse)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Le programme complet de la distance d'arrêt",
          contenu: `
            <p>Ajoute maintenant le programme principal : il demande la vitesse à
            l'utilisateur et affiche les trois distances. Exemple avec 50 :</p>
            <pre class="bloc-code"><code>Quelle est votre vitesse en km/h ? 50
Distance de réaction : 13.88888888888889 m
Distance de freinage : 12.5 m
Distance d'arrêt : 26.38888888888889 m</code></pre>`,
          depart: `def reaction(vitesse):\n    return vitesse / 3.6\n\ndef freinage(vitesse):\n    return vitesse ** 2 / 200\n\ndef arret(vitesse):\n    return reaction(vitesse) + freinage(vitesse)\n\n`,
          saisiesTest: ["50"],
          validation: {
            codeContient: [
              { motif: "float\\s*\\(\\s*input", message: "La vitesse doit être demandée et convertie." },
              { motif: "arret\\s*\\(", message: "Le programme doit appeler les trois fonctions." },
            ],
            sortie: "Quelle est votre vitesse en km/h ? 50\nDistance de réaction : 13.88888888888889 m\nDistance de freinage : 12.5 m\nDistance d'arrêt : 26.38888888888889 m",
          },
          felicitation: "Trois fonctions, un programme principal : voilà un code structuré. 🚗",
          indices: [
            "Une saisie convertie en décimal, puis trois affichages.",
            "Chaque affichage appelle une fonction : le programme principal ne calcule rien lui-même.",
          ],
          solution: `def reaction(vitesse):\n    return vitesse / 3.6\n\ndef freinage(vitesse):\n    return vitesse ** 2 / 200\n\ndef arret(vitesse):\n    return reaction(vitesse) + freinage(vitesse)\n\nvitesse = float(input("Quelle est votre vitesse en km/h ? "))\n\nprint("Distance de réaction :", reaction(vitesse), "m")\nprint("Distance de freinage :", freinage(vitesse), "m")\nprint("Distance d'arrêt :", arret(vitesse), "m")\n`,
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
          titre: "Des fonctions qui décident",
          contenu: `
            <p>Une fonction peut renvoyer un <strong>booléen</strong>. Par convention, on la
            nomme <code>est_…</code>.</p>
            <p>Écris <code>est_pair(n)</code> et <code>est_multiple(a, b)</code>. Chacune
            tient en <strong>une seule ligne</strong> : la comparaison <em>est</em> déjà le
            résultat, aucun <code>if</code> n'est nécessaire.</p>`,
          depart: `def est_pair(n):\n    \n\ndef est_multiple(a, b):\n    \n`,
          validation: {
            codeContient: [
              { motif: "%", message: "Les deux tests utilisent le reste." },
            ],
            codeAbsent: [
              { motif: "\\bif\\b", message: "Pas besoin de if : la comparaison est déjà un booléen." },
            ],
            tests: `assert est_pair(4) == True, "4 est pair"\nassert est_pair(7) == False, "7 est impair"\nassert est_pair(0) == True, "0 est pair"\nassert est_multiple(91, 7) == True, "91 est un multiple de 7"\nassert est_multiple(91, 5) == False, "91 n'est pas un multiple de 5"\nassert est_multiple(12, 12) == True, "un nombre est multiple de lui-même"`,
          },
          felicitation: "Deux lignes, six cas justes. C'est ça, du code élégant. ✨",
          indices: [
            "Le piège classique serait d'écrire <code>if … : return True else: return False</code> — trois fois trop long.",
            "La comparaison <code>n % 2 == 0</code> vaut déjà True ou False : renvoie-la telle quelle.",
          ],
          solution: `def est_pair(n):\n    return n % 2 == 0\n\ndef est_multiple(a, b):\n    return a % b == 0\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "La chaîne de conversions",
          contenu: `
            <p>Trois fonctions qui s'enchaînent, comme dans l'exercice 35 du chapitre :</p>
            <ul>
              <li><code>euro_vers_dollar(euros)</code> : un euro vaut 1,19 dollar ;</li>
              <li><code>dollar_vers_yuan(dollars)</code> : un dollar vaut 6,93 yuans ;</li>
              <li><code>euro_vers_yuan(montant)</code> : elle doit
                <strong>appeler les deux précédentes</strong>, jamais refaire le calcul.</li>
            </ul>`,
          depart: `def euro_vers_dollar(euros):\n    \n\ndef dollar_vers_yuan(dollars):\n    \n\ndef euro_vers_yuan(montant):\n    \n`,
          validation: {
            codeContient: [
              { motif: "def\\s+euro_vers_yuan[\\s\\S]*euro_vers_dollar\\s*\\(", message: "euro_vers_yuan doit appeler euro_vers_dollar." },
              { motif: "def\\s+euro_vers_yuan[\\s\\S]*dollar_vers_yuan\\s*\\(", message: "euro_vers_yuan doit aussi appeler dollar_vers_yuan." },
            ],
            codeAbsent: [
              { motif: "def\\s+euro_vers_yuan[\\s\\S]*1\\.19", message: "euro_vers_yuan ne doit pas refaire le calcul : elle appelle les deux autres." },
            ],
            tests: `assert abs(euro_vers_dollar(2) - 2.38) < 0.0001, "2 € valent 2,38 $"\nassert abs(dollar_vers_yuan(1) - 6.93) < 0.0001, "1 $ vaut 6,93 yuans"\nassert abs(euro_vers_yuan(1) - 8.2467) < 0.0001, "1 € vaut environ 8,25 yuans"\nassert abs(euro_vers_yuan(0) - 0) < 0.0001, "0 € valent 0 yuan"`,
          },
          felicitation: "Une chaîne de conversions : chaque maillon ne fait qu'une chose. 🔗",
          indices: [
            "Les deux premières fonctions tiennent chacune en une multiplication.",
            "La troisième convertit d'abord en dollars, range le résultat, puis convertit ce résultat en yuans.",
          ],
          solution: `def euro_vers_dollar(euros):\n    return euros * 1.19\n\ndef dollar_vers_yuan(dollars):\n    return dollars * 6.93\n\ndef euro_vers_yuan(montant):\n    montant_dollar = euro_vers_dollar(montant)\n    montant_yuan = dollar_vers_yuan(montant_dollar)\n    return montant_yuan\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Le nombre premier, avec return",
          contenu: `
            <p>Écris <code>est_premier(n)</code> qui renvoie <code>True</code> si
            <code>n</code> est premier.</p>
            <p>💡 Sers-toi de ce que tu as appris à l'étape du piège : <code>return</code>
            <strong>arrête la fonction sur-le-champ</strong>. Dès qu'un diviseur est trouvé,
            inutile de continuer.</p>
            <div class="encadre" data-ton="attention">
              N'oublie pas les cas limites : 0 et 1 ne sont <strong>pas</strong> premiers,
              2 l'est.
            </div>`,
          depart: `def est_premier(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Il faut chercher un diviseur avec une boucle." },
              { motif: "return\\s+False", message: "Dès qu'un diviseur est trouvé, on renvoie False." },
              { motif: "return\\s+True", message: "Si aucun diviseur n'est trouvé, on renvoie True." },
            ],
            tests: `assert est_premier(97) == True, "97 est premier"\nassert est_premier(2) == True, "2 est premier"\nassert est_premier(1) == False, "1 n'est pas premier"\nassert est_premier(0) == False, "0 n'est pas premier"\nassert est_premier(91) == False, "91 = 7 x 13 n'est pas premier"`,
          },
          felicitation: "Y compris les cas limites. C'est du travail de professionnel. 🚩",
          indices: [
            "Commence par écarter les petits cas : en dessous de 2, ce n'est jamais premier.",
            "Puis cherche un diviseur entre 2 et n − 1 : dès qu'on en trouve un, on peut conclure immédiatement.",
            "Si la boucle se termine sans rien trouver, le nombre est premier : le <code>return True</code> vient après la boucle.",
          ],
          solution: `def est_premier(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Ta boîte à outils",
          contenu: `
            <p>Défi libre. Écris <strong>au moins trois fonctions</strong> sur un même thème,
            dont <strong>une qui en appelle une autre</strong>, puis un programme qui les
            utilise et affiche des résultats.</p>
            <p>Des idées : géométrie (périmètre, aire, volume), finance (TVA, remise, prix
            final), conversions en chaîne, statistiques simples, calculs de dates…</p>`,
          depart: `# Tes fonctions\n`,
          validation: {
            codeContient: [
              { motif: "def[\\s\\S]*def[\\s\\S]*\\bdef\\b", message: "Il faut au moins trois fonctions." },
              { motif: "\\breturn\\b", message: "Tes fonctions doivent renvoyer leurs résultats." },
              { motif: "\\bprint\\b", message: "Le programme doit afficher quelque chose." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins deux lignes.",
          },
          felicitation: "Séance 12 terminée. Tes fonctions produisent des résultats réutilisables. 🏁",
          indices: [
            "Pense à faire appeler une fonction par une autre : c'est ce qui rend une bibliothèque cohérente.",
            "Exemple : <code>aire_base</code>, <code>volume</code> qui l'appelle, et <code>prix_au_litre</code>.",
          ],
          solution: `def aire_rectangle(longueur, largeur):\n    return longueur * largeur\n\ndef volume_pave(longueur, largeur, hauteur):\n    return aire_rectangle(longueur, largeur) * hauteur\n\ndef prix_beton(volume, prix_au_metre_cube):\n    return volume * prix_au_metre_cube\n\nv = volume_pave(4, 3, 2)\n\nprint("Aire de la base :", aire_rectangle(4, 3), "m2")\nprint("Volume du pavé :", v, "m3")\nprint("Prix du béton :", prix_beton(v, 120), "euros")\n`,
        },
      ],
    },
  ],
};

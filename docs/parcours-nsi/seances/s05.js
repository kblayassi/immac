/* NSI — chapitre 1, séance 5 : la condition simple.
 * Reprend la section « Structure if » du cours et l'exercice 10.
 * Séquence courte et volontairement resserrée : uniquement le if, sans else.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "La condition simple : if",
  sousTitre: "Exécuter des instructions seulement si…",
  palier: "Partie 2 — Prendre des décisions",

  accroche: `Tes programmes savent poser des questions. Il est temps qu'ils en tirent
    des conséquences : exécuter certaines instructions <strong>seulement si</strong> une
    condition est vraie.`,

  objectifs: [
    "écrire une instruction <code>if</code> correctement formée",
    "comprendre que l'<strong>indentation</strong> délimite le bloc",
    "traduire un énoncé mathématique en condition",
    "repérer ce qu'un <code>if</code> seul ne permet pas de faire",
  ],

  motDeLaFin: `Un <code>if</code> seul reste muet quand la condition est fausse.
    À la séance 6, on répare cela avec <code>else</code>.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 30,
      etoiles: 1,
      intention: "une seule idée, mais bien installée",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "La structure conditionnelle",
          contenu: `
            <p>Pour qu'un programme <strong>prenne des décisions</strong>, il doit pouvoir
            tester des conditions. La structure de base :</p>

            <pre class="bloc-code"><code>if condition:
    instructions</code></pre>

            <p>Un exemple complet :</p>

            <pre class="bloc-code"><code>age = 17

if age &gt;= 18:
    print("Majeur")

print("Fin du programme")</code></pre>

            <p>Trois éléments obligatoires :</p>
            <ul>
              <li>le mot <code>if</code>, suivi d'une <strong>condition</strong> — exactement
                le genre d'expression fabriquée à la séance 4 ;</li>
              <li>les <strong>deux-points</strong> <code>:</code> en fin de ligne ;</li>
              <li>le bloc d'instructions <strong>indenté</strong>, en général de quatre
                espaces.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">IndentationError</span>
              Si le bloc n'est pas indenté, Python refuse : <code>IndentationError</code>.
              Et s'il est indenté n'importe comment, le programme fait autre chose que ce
              que tu crois. L'indentation <strong>fait partie du sens</strong> — c'est une
              particularité de Python.
            </div>

            <p>Ici, <code>print("Fin du programme")</code> n'est pas indenté : il est
            <em>en dehors</em> du bloc, donc il s'exécute dans tous les cas.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ton premier if",
          contenu: `
            <p>La température vaut 32 degrés. Écris un test qui affiche
            <code>Il fait chaud !</code> quand elle dépasse 30.</p>
            <pre class="bloc-code"><code>Il fait chaud !</code></pre>`,
          depart: `temperature = 32\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut une instruction if." },
              { motif: "\\btemperature\\b[\\s\\S]*\\btemperature\\b", message: "La condition doit porter sur la variable temperature." },
            ],
            sortie: "Il fait chaud !",
          },
          felicitation: "Ton programme prend sa première décision. 🔀",
          indices: [
            "La ligne du test se termine par les deux-points.",
            "La ligne suivante est décalée de quatre espaces — la touche <kbd>Tab</kbd> le fait pour toi.",
          ],
          solution: `temperature = 32\n\nif temperature > 30:\n    print("Il fait chaud !")\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Le piège de l'indentation",
          contenu: `<p>Ici, <code>note</code> vaut 8. Regarde bien quelles lignes sont
            décalées.</p>`,
          code: `note = 8\n\nif note >= 10:\n    print("Reçu")\nprint("Fin du bulletin")`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>Reçu</code> puis <code>Fin du bulletin</code>",
              explication: "La condition est fausse : le bloc du if est sauté." },
            { texte: "seulement <code>Fin du bulletin</code>", correct: true,
              explication: "Oui. Le premier print est dans le if, qui est faux ; le second n'est pas indenté, donc il s'exécute toujours." },
            { texte: "seulement <code>Reçu</code>",
              explication: "Deux fois non : la condition est fausse, et la dernière ligne s'exécute." },
            { texte: "rien du tout",
              explication: "La dernière ligne est en dehors du if : elle s'exécute quoi qu'il arrive." },
          ],
          apres: `<span class="chapo">La question à se poser</span>
            Pour chaque ligne : « doit-elle s'exécuter <strong>seulement si</strong> la
            condition est vraie ? » Si oui, elle est indentée. Sinon, elle ne l'est pas.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Exercice 10 — Triangle rectangle en B ?",
          contenu: `
            <p>On considère un triangle <em>ABC</em> tel que <em>BC</em> = 3,
            <em>AC</em> = 5 et <em>AB</em> = 4. On cherche à déterminer s'il est rectangle
            <strong>en B</strong>.</p>
            <p>Complète la condition pour obtenir :</p>
            <pre class="bloc-code"><code>ABC est un triangle rectangle en B</code></pre>
            <div class="encadre" data-ton="astuce">
              💡 Si l'angle droit est en <em>B</em>, quel côté est l'hypoténuse ?
            </div>`,
          depart: `BC = 3\nAC = 5\nAB = 4\n\nif :\n    print("ABC est un triangle rectangle en B")\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Garde l'instruction if." },
              { motif: "==", message: "La réciproque de Pythagore est une égalité." },
              { motif: "\\bAC\\b[\\s\\S]*\\bAC\\b", message: "La condition doit porter sur les trois longueurs." },
            ],
            sortie: "ABC est un triangle rectangle en B",
          },
          felicitation: "Réciproque de Pythagore, traduite en Python. 📐",
          indices: [
            "L'hypoténuse est le côté opposé à l'angle droit : si l'angle est en B, c'est [AC].",
            "Le carré d'une longueur s'écrit <code>AC ** 2</code>.",
            "L'égalité de Pythagore compare le carré de l'hypoténuse à la somme des carrés des deux autres côtés.",
          ],
          solution: `BC = 3\nAC = 5\nAB = 4\n\nif AC ** 2 == AB ** 2 + BC ** 2:\n    print("ABC est un triangle rectangle en B")\n`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Exercice 10 (suite) — Et si ce n'était pas le cas ?",
          contenu: `<p>Reprends le programme précédent, mais avec <code>AC = 6</code> :
            le triangle n'est alors plus rectangle.</p>
            <pre class="bloc-code"><code>BC = 3
AC = 6
AB = 4

if AC ** 2 == AB ** 2 + BC ** 2:
    print("ABC est un triangle rectangle en B")</code></pre>`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>ABC n'est pas un triangle rectangle en B</code>",
              explication: "Il faudrait l'écrire quelque part ! Le programme ne le devine pas." },
            { texte: "<strong>rien du tout</strong>", correct: true,
              explication: "Oui. Sans <code>else</code>, un <code>if</code> dont la condition est fausse ne produit aucune sortie." },
            { texte: "<code>False</code>",
              explication: "La condition vaut bien False, mais elle n'est pas affichée : elle sert seulement à décider." },
            { texte: "une erreur",
              explication: "Le programme est parfaitement valide. Il est simplement muet." },
          ],
          apres: `<span class="chapo">Le vrai problème</span>
            L'utilisateur ne peut pas distinguer « le triangle n'est pas rectangle » de
            « le programme n'a pas fonctionné ». C'est exactement ce que corrige la
            séance suivante, avec <code>else</code>.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>if condition:
    # exécuté seulement si la condition est vraie
    ...

# exécuté dans tous les cas</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les trois fautes qui reviennent</span>
              <ol style="margin-bottom:0">
                <li>oublier les <strong>deux-points</strong> en fin de ligne ;</li>
                <li>oublier d'<strong>indenter</strong> le bloc ;</li>
                <li>écrire <code>=</code> au lieu de <code>==</code> dans la condition.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un conseil de méthode</span>
              Énonce d'abord la règle <strong>à voix haute, en français</strong> :
              « si la température dépasse 30, alors afficher… ». La traduction en Python
              suit presque mot à mot.
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
          titre: "Le seuil de réussite",
          contenu: `
            <p>Avec <code>moyenne = 12.5</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Bulletin
Admis</code></pre>
            <p>Le mot <code>Bulletin</code> s'affiche toujours ; <code>Admis</code>
            seulement si la moyenne atteint 10.</p>`,
          depart: `moyenne = 12.5\n\nprint("Bulletin")\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut un test." },
              { motif: "\\bmoyenne\\b[\\s\\S]*\\bmoyenne\\b", message: "La condition doit porter sur la variable moyenne." },
            ],
            sortie: "Bulletin\nAdmis",
          },
          indices: [
            "La ligne <code>print(\"Bulletin\")</code> reste en dehors du test.",
            "Remplace 12.5 par 8 pour vérifier que le second message disparaît — puis remets 12.5.",
          ],
          solution: `moyenne = 12.5\n\nprint("Bulletin")\n\nif moyenne >= 10:\n    print("Admis")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le contrôle d'accès",
          contenu: `
            <p>Demande un mot de passe. S'il correspond à <code>python2026</code>, affiche
            deux lignes ; sinon, le programme reste muet.</p>
            <pre class="bloc-code"><code>Mot de passe : python2026
Accès autorisé
Bienvenue !</code></pre>
            <p>Attention : les <strong>deux</strong> messages sont dans le bloc du test.</p>`,
          depart: `attendu = "python2026"\n\n`,
          saisiesTest: ["python2026"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Le mot de passe doit être demandé." },
              { motif: "\\bif\\b", message: "Il faut un test." },
              { motif: "\\battendu\\b[\\s\\S]*\\battendu\\b", message: "Compare la saisie à la variable attendu." },
            ],
            sortieRegex: "Accès autorisé\\nBienvenue !",
            sortieRegexMessage: "Les deux messages doivent s'afficher, dans cet ordre.",
          },
          felicitation: "Deux instructions dans le même bloc : elles vont ensemble. 🔐",
          indices: [
            "Les comparaisons fonctionnent aussi sur les textes, avec <code>==</code>.",
            "Les deux <code>print</code> doivent être indentés au même niveau.",
          ],
          solution: `attendu = "python2026"\n\nsaisi = input("Mot de passe : ")\n\nif saisi == attendu:\n    print("Accès autorisé")\n    print("Bienvenue !")\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Plusieurs tests indépendants",
          contenu: `
            <p>Avec <code>n = 30</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>30 est pair
30 est un multiple de 5
30 est un multiple de 3</code></pre>
            <p>Trois <code>if</code> <strong>séparés</strong> : chacun est évalué, donc
            plusieurs messages peuvent s'afficher.</p>`,
          depart: `n = 30\n\n`,
          validation: {
            codeContient: [
              { motif: "if[\\s\\S]*if[\\s\\S]*if", message: "Trois tests indépendants sont attendus." },
              { motif: "%", message: "Les divisibilités se testent avec le reste." },
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n." },
            ],
            sortie: "30 est pair\n30 est un multiple de 5\n30 est un multiple de 3",
          },
          felicitation: "Trois tests, trois messages : c'est bien ce qu'on voulait. ✅",
          indices: [
            "Chaque test est autonome : il n'y a ni <code>elif</code> ni <code>else</code>.",
            "Le nombre affiché doit venir de la variable, pas être retapé.",
          ],
          solution: `n = 30\n\nif n % 2 == 0:\n    print(n, "est pair")\n\nif n % 5 == 0:\n    print(n, "est un multiple de 5")\n\nif n % 3 == 0:\n    print(n, "est un multiple de 3")\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : le test cassé",
          contenu: `
            <p>Trois erreurs, toutes typiques du <code>if</code>. Avec
            <code>note = 15</code>, le programme doit afficher :</p>
            <pre class="bloc-code"><code>Reçu
Fin</code></pre>`,
          depart: `note = 15\n\nif note = 10\nprint("Reçu")\n\nprint("Fin")\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Garde le test." },
            ],
            sortie: "Reçu\nFin",
          },
          felicitation: "Affectation, deux-points, indentation : les trois classiques. 🐞",
          indices: [
            "Ligne 3 : tester n'est pas affecter. Il manque un signe.",
            "Ligne 3 encore : il manque aussi le caractère qui annonce le bloc.",
            "Ligne 4 : elle doit être dans le bloc du test — contrairement à la dernière.",
          ],
          solution: `note = 15\n\nif note >= 10:\n    print("Reçu")\n\nprint("Fin")\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Une condition composée",
          contenu: `
            <p>Un parc autorise l'entrée si le visiteur a <strong>18 ans ou plus</strong>,
            <strong>ou bien</strong> s'il a <strong>au moins 12 ans et qu'il est
            accompagné</strong>.</p>
            <p>Avec <code>age = 16</code> et <code>accompagne = True</code>, affiche :</p>
            <pre class="bloc-code"><code>Tu peux entrer.</code></pre>
            <p>Change <code>accompagne</code> en <code>False</code> pour vérifier que rien
            ne s'affiche, puis remets <code>True</code>.</p>`,
          depart: `age = 16\naccompagne = True\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut un test." },
              { motif: "\\bor\\b", message: "La règle contient un « ou bien »." },
              { motif: "\\band\\b", message: "La seconde moitié de la règle contient un « et »." },
            ],
            codeAbsent: [
              { motif: "==\\s*True", message: "accompagne est déjà un booléen : inutile de le comparer à True." },
            ],
            sortie: "Tu peux entrer.",
          },
          felicitation: "Séance 4 et séance 5 réunies dans une seule ligne. 🎢",
          indices: [
            "La condition ressemble à : majeur <em>ou</em> (assez grand <em>et</em> accompagné).",
            "Les parenthèses ne sont pas obligatoires ici, mais elles rendent la règle beaucoup plus lisible.",
          ],
          solution: `age = 16\naccompagne = True\n\nif age >= 18 or (age >= 12 and accompagne):\n    print("Tu peux entrer.")\n`,
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
          titre: "Un test dans un test",
          contenu: `
            <p>On peut placer un <code>if</code> <strong>à l'intérieur</strong> d'un autre :
            il suffit de le décaler d'un cran de plus.</p>
            <p>Avec <code>age = 20</code> et <code>permis = True</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Majeur
Tu peux conduire</code></pre>
            <p>Le second message ne doit s'afficher que si la personne est majeure
            <strong>et</strong> a le permis — mais sans utiliser <code>and</code>.</p>`,
          depart: `age = 20\npermis = True\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\band\\b", message: "Pour ce défi, and est interdit : imbrique deux if." },
            ],
            codeContient: [
              { motif: "\\n {4,}if\\b", message: "Le second if doit être imbriqué dans le premier, donc décalé." },
            ],
            sortie: "Majeur\nTu peux conduire",
          },
          felicitation: "Deux niveaux d'indentation maîtrisés. 🪜",
          indices: [
            "Le premier test porte sur l'âge, et affiche <code>Majeur</code>.",
            "Le second test est <em>dans</em> le premier : il est décalé de quatre espaces, et son propre bloc de huit.",
            "Un test imbriqué et un <code>and</code> disent exactement la même chose — c'est justement ce que ce défi montre.",
          ],
          solution: `age = 20\npermis = True\n\nif age >= 18:\n    print("Majeur")\n    if permis:\n        print("Tu peux conduire")\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le plus grand, sans else",
          contenu: `
            <p>Avec <code>a = 7</code> et <code>b = 19</code>, affiche le plus grand des
            deux — <strong>sans <code>else</code></strong>, et avec un <strong>seul</strong>
            <code>print</code>.</p>
            <pre class="bloc-code"><code>Le plus grand est 19</code></pre>
            <p>⚠️ Ton programme doit fonctionner aussi quand <code>a</code> est le plus
            grand. Teste-le en échangeant les valeurs.</p>`,
          depart: `a = 7\nb = 19\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\belse\\b", message: "Pas de else dans ce défi." },
              { motif: "\\bmax\\s*\\(", message: "max() est interdite." },
              { motif: "\\b19\\b\\s*\\)", message: "Le résultat doit venir des variables." },
              { motif: "print[\\s\\S]*print", message: "Un seul print : range le plus grand dans une variable avant d'afficher." },
            ],
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut au moins un test." },
            ],
            sortie: "Le plus grand est 19",
          },
          felicitation: "L'algorithme du champion : un seul test, et il s'étend à autant de nombres qu'on veut. 🥇",
          indices: [
            "Une méthode sûre : ranger le plus grand dans une variable, puis l'afficher une seule fois à la fin.",
            "Suppose d'abord que c'est <code>a</code>, puis corrige avec un test si <code>b</code> fait mieux.",
            "Cette méthode a un avantage : elle s'étend à trois nombres, ou à trente.",
          ],
          solution: `a = 7\nb = 19\n\nplus_grand = a\nif b > plus_grand:\n    plus_grand = b\n\nprint("Le plus grand est", plus_grand)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton programme à conditions",
          contenu: `
            <p>Défi libre. Écris un programme qui <strong>demande une information</strong> et
            contient <strong>au moins deux <code>if</code></strong>, dont un avec une
            condition composée (<code>and</code> ou <code>or</code>).</p>
            <p>Des idées : un contrôle de billetterie, un diagnostic de température, un
            vérificateur de mot de passe (longueur et contenu), un test d'année bissextile…</p>`,
          depart: `# Ton programme\n`,
          saisiesTest: ["16"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton programme doit demander une information." },
              { motif: "if[\\s\\S]*if", message: "Il doit contenir au moins deux tests." },
              { motif: "\\band\\b|\\bor\\b", message: "Un des tests doit avoir une condition composée." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 5 terminée. Tes programmes bifurquent. 🏁",
          indices: [
            "N'oublie pas de convertir la saisie si tu comptes faire un calcul avec.",
            "Un <code>if</code> seul reste muet quand la condition est fausse : prévois un message qui s'affiche toujours, sinon tu croiras que ton programme ne marche pas.",
          ],
          solution: `age = int(input("Ton âge ? "))\n\nprint("Analyse en cours...")\n\nif age >= 18:\n    print("Tu es majeur")\n\nif age >= 12 and age <= 17:\n    print("Tu es un adolescent")\n`,
        },
      ],
    },
  ],
};

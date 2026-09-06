/* NSI — chapitre 1, séance 7 : les cascades de tests.
 * Reprend la section « Alternatives : elif » du cours et les exercices 9, 12,
 * 13 et 14 du chapitre.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "Plusieurs cas : elif",
  sousTitre: "Quand deux issues ne suffisent plus",
  palier: "Partie 2 — Prendre des décisions",

  accroche: `Majeur ou mineur, c'est deux cas. Mais une mention au bac, un tarif, un
    barème de points : il en faut cinq, six, parfois davantage. Un mot-clé règle la
    question — à condition d'avoir compris dans quel ordre écrire les tests.`,

  objectifs: [
    "enchaîner plusieurs cas avec <code>elif</code>",
    "comprendre pourquoi une cascade est <strong>exclusive</strong>",
    "distinguer une cascade de <code>elif</code> de plusieurs <code>if</code> indépendants",
    "ordonner les tests du plus restrictif au plus général",
  ],

  motDeLaFin: `Tes programmes savent décider dans toutes les situations. À la séance 8,
    ils vont apprendre à répéter.`,

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
          titre: "Sinon si : elif",
          contenu: `
            <p>On pourrait empiler des <code>if</code>, mais Python offre mieux :
            <code>elif</code>, contraction de <em>else if</em>, « sinon si ».</p>

            <pre class="bloc-code"><code>if age &gt;= 18:
    print("Majeur")
elif age &gt;= 16:
    print("Presque majeur")
else:
    print("Mineur")</code></pre>

            <p>Python teste les conditions <strong>de haut en bas</strong> et s'arrête à la
            première vraie. Les autres ne sont même pas évaluées.</p>

            <p>Une cascade peut contenir autant de <code>elif</code> qu'on veut, et le
            <code>else</code> final est facultatif :</p>

            <pre class="bloc-code"><code>if age &lt; 11:
    print("Tu es à l'école primaire")
elif age &lt; 15:
    print("Tu es au collège")
elif age &lt; 18:
    print("Tu es au lycée")
else:
    print("Tu es adulte")</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'économie de la cascade</span>
              Remarque la deuxième condition : <code>age &lt; 15</code>, et non
              <code>age &gt;= 11 and age &lt; 15</code>. Inutile de retester : on n'arrive
              à ce <code>elif</code> que si le premier test a échoué, donc si l'âge atteint
              déjà 11 ans.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première cascade",
          contenu: `
            <p>Un cinéma pratique trois tarifs :</p>
            <ul>
              <li>moins de 12 ans : <strong>5 euros</strong> ;</li>
              <li>de 12 à 25 ans : <strong>8 euros</strong> ;</li>
              <li>26 ans et plus : <strong>12 euros</strong>.</li>
            </ul>
            <p>Avec <code>age = 25</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Tarif : 8 euros</code></pre>`,
          depart: `age = 25\n\n`,
          validation: {
            codeContient: [
              { motif: "\\belif\\b", message: "Trois cas : utilise elif plutôt que d'empiler des if." },
              { motif: "\\belse\\b", message: "Le dernier cas se traite avec else." },
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "La cascade doit porter sur la variable age." },
            ],
            sortie: "Tarif : 8 euros",
          },
          felicitation: "Une cascade propre, du plus jeune au plus âgé. 🎟️",
          indices: [
            "Commence par le cas le plus restrictif : les moins de 12 ans.",
            "Le deuxième test n'a besoin que d'une seule comparaison : on sait déjà que l'âge atteint 12 ans.",
            "Le dernier cas ne demande aucune condition.",
          ],
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Exercice 9 — Une cascade de mentions",
          contenu: `<p>Ce programme demande une note et affiche une mention. L'utilisateur
            saisit <strong>18</strong>.</p>`,
          code: `note = float(input("Saisir votre note : "))\n\nif note >= 16:\n    print("TB")\nelif note >= 14:\n    print("B")\nelif note >= 12:\n    print("AB")\nelif note >= 10:\n    print("reçu")\nelse:\n    print("refusé")`,
          question: "Qu'affiche le programme ?",
          options: [
            { texte: "<code>TB</code>, <code>B</code>, <code>AB</code> et <code>reçu</code>",
              explication: "Ce serait le cas avec quatre <code>if</code> séparés. Avec une cascade, non." },
            { texte: "<code>TB</code> seulement", correct: true,
              explication: "Oui : dès qu'une condition est vraie, son bloc s'exécute et <strong>tous les tests suivants sont ignorés</strong>." },
            { texte: "<code>refusé</code>",
              explication: "Le <code>else</code> n'est atteint que si toutes les conditions ont échoué." },
            { texte: "rien : 18 n'est pas prévu",
              explication: "18 est bien supérieur ou égal à 16 : le premier test est vrai." },
          ],
          apres: `<span class="chapo">Exclusif</span>
            Dans une cascade, <strong>au plus un bloc</strong> s'exécute. C'est ce qui la
            distingue d'une suite de <code>if</code> — et c'est exactement ce qu'on veut ici :
            une note ne mérite qu'une seule mention.`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Exercice 9 (suite) — Deux if indépendants",
          contenu: `<p>Ce second programme n'a pas de <code>elif</code>. L'utilisateur
            saisit <strong>20</strong>.</p>`,
          code: `note = float(input("Saisir votre note : "))\n\nif note == 20:\n    print("Parfait !")\nif note != 0:\n    print("Ce n'est pas nul !")`,
          question: "Qu'affiche le programme ?",
          options: [
            { texte: "<code>Parfait !</code> seulement",
              explication: "Le second test est indépendant : il est évalué aussi, et 20 est bien différent de 0." },
            { texte: "<code>Parfait !</code> puis <code>Ce n'est pas nul !</code>", correct: true,
              explication: "Oui : les deux <code>if</code> sont indépendants, donc les deux sont évalués, et tous deux sont vrais." },
            { texte: "<code>Ce n'est pas nul !</code> seulement",
              explication: "La note vaut exactement 20 : le premier test est vrai lui aussi." },
            { texte: "rien",
              explication: "Les deux conditions sont vraies pour 20." },
          ],
          apres: `<span class="chapo">Avec 0, puis avec 10</span>
            Avec <strong>0</strong> : rien ne s'affiche (la note n'est pas 20, et elle est
            nulle). Avec <strong>10</strong> : seul le second message s'affiche.
            <br><br>
            <strong>La différence à retenir</strong> — avec <code>elif</code>, les cas sont
            exclusifs : au plus un bloc. Avec des <code>if</code> séparés, chaque condition
            est testée à son tour, et plusieurs blocs peuvent s'exécuter.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Exercice 12 — Où est l'angle droit ?",
          contenu: `
            <p>Détermine si le triangle <em>ABC</em> est rectangle, et si oui
            <strong>en quel sommet</strong>. Avec <em>AB</em> = 5, <em>AC</em> = 3 et
            <em>BC</em> = 4, le programme doit afficher :</p>
            <pre class="bloc-code"><code>AB = 5 ; AC = 3 ; BC = 4
ABC est un triangle rectangle en C</code></pre>
            <div class="encadre" data-ton="astuce">
              L'angle droit est au sommet <strong>opposé au plus grand côté</strong> :
              rectangle en A signifie que [BC] est l'hypoténuse, et ainsi de suite.
            </div>`,
          depart: `AB = 5\nAC = 3\nBC = 4\n\nprint("AB =", AB, "; AC =", AC, "; BC =", BC)\n\nif :\n    print("ABC est un triangle rectangle en A")\nelif :\n    print("ABC est un triangle rectangle en B")\nelif :\n    print("ABC est un triangle rectangle en C")\nelse :\n    print("ABC n'est pas un triangle rectangle")\n`,
          validation: {
            codeContient: [
              { motif: "elif[\\s\\S]*elif", message: "Garde la cascade à quatre cas." },
              { motif: "==", message: "Chaque test est une égalité de Pythagore." },
            ],
            sortie: "AB = 5 ; AC = 3 ; BC = 4\nABC est un triangle rectangle en C",
          },
          felicitation: "Trois hypothèses testées dans l'ordre, et la bonne trouvée. 📐",
          indices: [
            "Rectangle en A : l'hypoténuse est [BC], donc son carré doit égaler la somme des carrés de [AB] et [AC].",
            "Pour les deux autres sommets, c'est la même égalité avec un côté différent en hypoténuse.",
            "Une fois validé, teste avec <em>AB</em> = 6, <em>AC</em> = 8, <em>BC</em> = 10, puis 2, 3 et 4.",
          ],
        },

        {
          id: "d6",
          type: "code",
          titre: "Exercice 13 — Les fléchettes de Bob",
          contenu: `
            <p>Bob lance une fléchette sur un plateau de 5 cases sur 5, et gagne si elle
            atteint la <strong>croix rouge</strong> : la ligne du milieu ou la colonne du
            milieu.</p>
            <p style="text-align:center">
              <img src="../files/NSI/Python1/flechettes_plateau1.png"
                   alt="Plateau de jeu 5 sur 5 avec une croix rouge"
                   style="width:30%;border-radius:9px">
            </p>
            <p><code>randint(0, 4)</code> renvoie un entier au hasard entre 0 et 4
            <strong>inclus</strong>. Complète les deux conditions.</p>`,
          depart: `from random import randint\n\nnumero_ligne = randint(0, 4)\nnumero_colonne = randint(0, 4)\n\nprint("La fléchette atteint la case ligne", numero_ligne, ", colonne", numero_colonne)\n\nif :\n    print("Bob a gagné")\nelif :\n    print("Bob a gagné")\nelse :\n    print("Bob a perdu")\n`,
          validation: {
            codeContient: [
              { motif: "numero_ligne\\s*==\\s*2", message: "La ligne du milieu porte le numéro 2." },
              { motif: "numero_colonne\\s*==\\s*2", message: "La colonne du milieu porte aussi le numéro 2." },
              { motif: "\\belif\\b", message: "Garde la cascade." },
            ],
            sortieRegex: "Bob a (gagné|perdu)",
            sortieRegexMessage: "Ton programme doit annoncer le résultat du lancer.",
          },
          felicitation: "Exécute plusieurs fois : environ 9 cases sur 25 sont gagnantes. 🎯",
          indices: [
            "Les cases sont numérotées de 0 à 4 : le milieu est donc la case numéro 2.",
            "La première condition porte sur la ligne, la seconde sur la colonne.",
          ],
        },

        {
          id: "d7",
          type: "qcm",
          titre: "Exercice 13 (suite) — La case centrale",
          contenu: `<p>Reprends le programme précédent. La fléchette tombe sur la case
            centrale : <code>numero_ligne</code> vaut 2 <strong>et</strong>
            <code>numero_colonne</code> vaut 2.</p>`,
          question: "La seconde condition est-elle testée ? Cela change-t-il le résultat ?",
          options: [
            { texte: "Elle est testée, et le message s'affiche deux fois",
              explication: "Non : dans une cascade, dès qu'une condition est vraie, les suivantes sont ignorées." },
            { texte: "Elle n'est pas testée, et cela ne change rien ici", correct: true,
              explication: "Exactement. Les deux branches affichent le même message, donc l'ordre est sans conséquence — pour l'instant." },
            { texte: "Elle n'est pas testée, et Bob perd",
              explication: "La première condition est vraie : Bob gagne bien." },
            { texte: "Python signale une ambiguïté",
              explication: "Python ne signale rien : il applique simplement la règle de la cascade." },
          ],
          apres: `<span class="chapo">Une écriture plus lisible</span>
            Puisque les deux branches font la même chose, un seul test avec <code>or</code>
            suffirait :
            <br><code>if numero_ligne == 2 or numero_colonne == 2:</code>
            <br><br>À la question suivante, en revanche, cette subtilité devient
            <strong>déterminante</strong>.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Exercice 13 (fin) — Le nouveau barème",
          contenu: `
            <p>Bob change les règles : la <strong>case rouge centrale</strong> rapporte
            désormais 100 points, les cases <strong>oranges</strong> de la croix 50 points,
            et les cases blanches ne rapportent rien.</p>
            <p style="text-align:center">
              <img src="../files/NSI/Python1/flechettes_plateau2.png"
                   alt="Plateau de jeu 5 sur 5 avec une case rouge centrale et une croix orange"
                   style="width:30%;border-radius:9px">
            </p>
            <div class="encadre" data-ton="attention">
              ⚠️ L'<strong>ordre</strong> des tests a ici une importance capitale : la case
              rouge appartient <em>aussi</em> à la croix orange.
            </div>`,
          depart: `from random import randint\n\nnumero_ligne = randint(0, 4)\nnumero_colonne = randint(0, 4)\n\nprint("La fléchette atteint la case ligne", numero_ligne, ", colonne", numero_colonne)\n\nif :\n    print("100 points")\nelif :\n    print("50 points")\nelse :\n    print("0 point")\n`,
          validation: {
            codeContient: [
              { motif: "if[^\\n]*\\band\\b", message: "Le premier test doit exiger les deux conditions à la fois : c'est la case centrale." },
              { motif: "elif[^\\n]*\\bor\\b", message: "Le second test accepte la ligne ou la colonne : c'est la croix." },
            ],
            sortieRegex: "(100 points|50 points|0 point)",
            sortieRegexMessage: "Ton programme doit annoncer le nombre de points.",
          },
          felicitation: "Le test le plus restrictif en premier : c'est la règle des cascades. 🎯",
          indices: [
            "La case rouge est celle où la ligne <strong>et</strong> la colonne valent 2.",
            "La croix orange est celle où la ligne <strong>ou</strong> la colonne vaut 2.",
            "Si tu testais la croix en premier, la case rouge ne rapporterait que 50 points : elle serait attrapée trop tôt.",
          ],
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>if condition1:
    # si condition1 est vraie
elif condition2:
    # si condition1 est FAUSSE et condition2 vraie
elif condition3:
    # si les deux précédentes sont fausses et condition3 vraie
else:
    # si toutes les conditions sont fausses</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre décide de tout</span>
              Dans une cascade, on va du <strong>plus restrictif au plus général</strong>.
              Si tu écrivais <code>note &gt;= 10</code> en premier, une note de 18 afficherait
              « reçu » et jamais « très bien » : elle serait attrapée trop tôt.
            </div>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Situation</th><th>Écriture</th></tr>
              <tr><td>cas mutuellement exclusifs</td><td>cascade <code>if / elif / else</code></td></tr>
              <tr><td>tests indépendants, cumulables</td><td>plusieurs <code>if</code> séparés</td></tr>
              <tr><td>deux branches identiques</td><td>un seul <code>if</code> avec <code>or</code></td></tr>
            </table>
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
          titre: "Les quatre niveaux de scolarité",
          contenu: `
            <p>Reprends la cascade du cours. Avec <code>age = 16</code>, affiche
            exactement :</p>
            <pre class="bloc-code"><code>Tu es au lycée</code></pre>
            <p>Moins de 11 ans : <code>Tu es à l'école primaire</code>. Moins de 15 ans :
            <code>Tu es au collège</code>. Moins de 18 ans : <code>Tu es au lycée</code>.
            Sinon : <code>Tu es adulte</code>.</p>`,
          depart: `age = 16\n\n`,
          validation: {
            codeContient: [
              { motif: "elif[\\s\\S]*elif", message: "Quatre cas : au moins deux elif." },
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "La cascade doit porter sur la variable age." },
            ],
            sortie: "Tu es au lycée",
          },
          indices: [
            "Va du plus jeune au plus âgé : chaque test n'a besoin que d'une comparaison.",
            "Le dernier cas n'a pas de condition.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Le signe d'un nombre",
          contenu: `
            <p>Avec <code>n = 0</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>0 est nul.</code></pre>
            <p>Les trois messages : <code>… est positif.</code>, <code>… est négatif.</code>,
            <code>… est nul.</code> — le nombre affiché doit venir de la variable.</p>`,
          depart: `n = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\belif\\b", message: "Trois cas : positif, négatif, nul." },
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n." },
            ],
            sortie: "0 est nul.",
          },
          indices: [
            "Attention : zéro n'est ni positif ni négatif au sens strict.",
            "Le dernier cas — le zéro — se traite naturellement avec <code>else</code>.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : la cascade à l'envers",
          contenu: `
            <p>Ce programme compile et s'exécute sans erreur… mais il donne un résultat
            faux. Avec <code>moyenne = 18</code>, il doit afficher :</p>
            <pre class="bloc-code"><code>Mention très bien</code></pre>
            <p>Ne change aucune condition : réorganise seulement l'ordre des cas.</p>`,
          depart: `moyenne = 18\n\nif moyenne >= 10:\n    print("Admis sans mention")\nelif moyenne >= 12:\n    print("Mention assez bien")\nelif moyenne >= 14:\n    print("Mention bien")\nelif moyenne >= 16:\n    print("Mention très bien")\nelse:\n    print("Recalé")\n`,
          validation: {
            codeContient: [
              { motif: "elif[\\s\\S]*elif[\\s\\S]*elif", message: "Garde les cinq cas." },
              { motif: "if\\s+moyenne\\s*>=\\s*16", message: "Le cas le plus restrictif doit venir en premier." },
            ],
            sortie: "Mention très bien",
          },
          felicitation: "Le bug le plus sournois des cascades : l'ordre. 🐞",
          indices: [
            "Suis le programme pas à pas avec 18 : quel est le premier test vrai ?",
            "Dans une cascade, on va toujours du plus exigeant au moins exigeant.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Exercice 14 — Le simulateur de bac",
          contenu: `
            <p>On simule le résultat du baccalauréat, en ne tenant compte que des épreuves
            terminales :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Épreuve</th><th>Coefficient</th><th>Épreuve</th><th>Coefficient</th></tr>
              <tr><td>écrit de français</td><td>3</td><td>grand oral</td><td>10</td></tr>
              <tr><td>oral de français</td><td>3</td><td>spécialité 1</td><td>16</td></tr>
              <tr><td>mathématiques</td><td>2</td><td>spécialité 2</td><td>16</td></tr>
              <tr><td>philosophie</td><td>8</td><td></td><td></td></tr>
            </table>
            </div>
            <p><strong>1.</strong> Calcule la <strong>moyenne pondérée</strong> dans la
            variable <code>moyenne</code>. <strong>2.</strong> Affiche le résultat :</p>
            <ul>
              <li>≥ 16 : <code>Admis mention très bien</code> · ≥ 14 : <code>Admis mention bien</code></li>
              <li>≥ 12 : <code>Admis mention assez bien</code> · ≥ 10 : <code>Admis</code></li>
              <li>≥ 8 : <code>Rattrapage</code> · sinon : <code>Non admis</code></li>
            </ul>
            <p>Sortie attendue avec les notes fournies :</p>
            <pre class="bloc-code"><code>Moyenne : 14.275862068965518
Admis mention bien</code></pre>`,
          depart: `ecrit_francais = 12\noral_francais = 14\nmaths = 15\nphilosophie = 8\ngrand_oral = 16\neds_1 = 13\neds_2 = 18\n\n# 1. La moyenne pondérée\nmoyenne = \n\nprint("Moyenne :", moyenne)\n\n# 2. Le résultat\n`,
          validation: {
            codeContient: [
              { motif: "elif[\\s\\S]*elif[\\s\\S]*elif[\\s\\S]*elif", message: "Six cas : il faut quatre elif." },
              { motif: "58", message: "La somme des coefficients vaut 58." },
              { motif: "\\bmaths\\b[\\s\\S]*\\bmaths\\b", message: "Sers-toi des variables de notes." },
            ],
            codeAbsent: [
              { motif: "14\\.27", message: "La moyenne doit être calculée." },
            ],
            sortie: "Moyenne : 14.275862068965518\nAdmis mention bien",
          },
          felicitation: "Moyenne pondérée et barème complet : le simulateur fonctionne. 🎓",
          indices: [
            "Une moyenne pondérée, c'est la somme des (note × coefficient) divisée par la <strong>somme des coefficients</strong> — ici 3+3+2+8+10+16+16.",
            "Range le numérateur dans une variable <code>total</code> : le calcul tient sur plusieurs lignes sans devenir illisible.",
            "Pour la cascade, va du plus haut barème au plus bas.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le distributeur de boissons",
          contenu: `
            <p>Une boisson coûte <strong>2 euros</strong>. Demande le montant inséré et
            réagis :</p>
            <ul>
              <li>montant insuffisant → <code>Montant insuffisant.</code></li>
              <li>montant exact → <code>Boisson servie.</code></li>
              <li>montant supérieur → <code>Boisson servie. Rendu : … euros</code></li>
            </ul>
            <p>Exemple avec 5 euros :</p>
            <pre class="bloc-code"><code>Montant inséré ? 5
Boisson servie. Rendu : 3 euros</code></pre>`,
          depart: `prix = 2\n\n`,
          saisiesTest: ["5"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "Le montant doit être demandé et converti." },
              { motif: "\\belif\\b", message: "Trois cas : il te faut un elif." },
              { motif: "\\bprix\\b[\\s\\S]*\\bprix\\b", message: "Utilise la variable prix, pour que le programme reste modifiable." },
            ],
            sortieRegex: "Boisson servie\\. Rendu : \\d+ euros",
            sortieRegexMessage: "Avec un montant supérieur au prix, le rendu doit être affiché et calculé.",
          },
          felicitation: "Un automate complet, en dix lignes. 🥤",
          indices: [
            "Les trois cas se distinguent par une comparaison entre le montant et le prix.",
            "Le rendu se calcule par une soustraction : ne l'écris pas en dur.",
          ],
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
          titre: "La même cascade, sans elif",
          contenu: `
            <p>Réécris la cascade des tarifs de la découverte <strong>sans utiliser
            <code>elif</code></strong>, uniquement avec des <code>if … else</code>
            imbriqués. Avec <code>age = 25</code> :</p>
            <pre class="bloc-code"><code>Tarif : 8 euros</code></pre>
            <p>C'est plus long — et c'est exactement ce que <code>elif</code> abrège.</p>`,
          depart: `age = 25\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\belif\\b", message: "elif est interdit dans ce défi." },
            ],
            codeContient: [
              { motif: "\\n {4,}if\\b", message: "Il faut un if imbriqué dans le else du premier." },
              { motif: "else[\\s\\S]*else", message: "Il faut deux else." },
            ],
            sortie: "Tarif : 8 euros",
          },
          felicitation: "Deux écritures, un seul comportement. Tu as compris la mécanique. 🪜",
          indices: [
            "Le premier test sépare les moins de 12 ans du reste.",
            "Dans le <code>else</code>, un second <code>if … else</code> sépare les 12-25 ans des plus âgés.",
            "Compte les espaces : le second <code>if</code> est à quatre, ses blocs à huit.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Le nombre mystère, premier tour",
          contenu: `
            <p>Le nombre secret est <strong>42</strong>. Demande une proposition et
            réponds :</p>
            <ul>
              <li>proposition trop petite → <code>C'est plus !</code></li>
              <li>proposition trop grande → <code>C'est moins !</code></li>
              <li>proposition juste → <code>Bravo, c'est gagné !</code></li>
            </ul>
            <p>Un seul tour pour l'instant. À la séance 8, tu boucleras jusqu'à la
            victoire.</p>`,
          depart: `secret = 42\n\n`,
          saisiesTest: ["30"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "La proposition doit être demandée et convertie." },
              { motif: "\\belif\\b", message: "Trois réponses possibles : il te faut un elif." },
              { motif: "\\bsecret\\b[\\s\\S]*\\bsecret\\b", message: "Compare à la variable secret." },
            ],
            sortieRegex: "(C'est plus !|C'est moins !|Bravo, c'est gagné !)",
            sortieRegexMessage: "Ton programme doit répondre par l'un des trois messages.",
          },
          felicitation: "Le cœur du jeu est écrit. Il ne manque que la boucle. 🎯",
          indices: [
            "Les deux premiers cas se distinguent par une comparaison stricte.",
            "N'oublie pas le cas de l'égalité : c'est le <code>else</code>.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "La nature du triangle",
          contenu: `
            <p>Trois longueurs. D'abord, le triangle existe-t-il ? L'inégalité triangulaire
            dit que <strong>chaque côté doit être plus court que la somme des deux
            autres</strong>.</p>
            <p>S'il existe, il est <em>équilatéral</em> (trois côtés égaux),
            <em>isocèle</em> (deux côtés égaux) ou <em>quelconque</em>.</p>
            <p>Avec <code>a = 5</code>, <code>b = 5</code> et <code>c = 8</code> :</p>
            <pre class="bloc-code"><code>Triangle isocèle</code></pre>
            <p>Le message si le triangle n'existe pas : <code>Ce triangle n'existe pas</code>.</p>`,
          depart: `a = 5\nb = 5\nc = 8\n\n`,
          validation: {
            codeContient: [
              { motif: "\\n {4,}if\\b", message: "Il faut d'abord tester l'existence, puis la nature à l'intérieur." },
              { motif: "\\bor\\b", message: "« Deux côtés égaux » demande plusieurs égalités reliées par or." },
              { motif: "\\band\\b", message: "L'inégalité triangulaire demande trois conditions reliées par and." },
            ],
            sortie: "Triangle isocèle",
          },
          felicitation: "Existence puis nature : la démarche du géomètre. 📐",
          indices: [
            "L'existence se teste en une seule condition composée de trois comparaisons.",
            "Teste l'équilatéral <strong>en premier</strong> : sinon un triangle équilatéral serait déclaré isocèle, puisqu'il a bien deux côtés égaux.",
            "Isocèle : au moins une des trois égalités entre côtés.",
          ],
        },

        {
          id: "x4",
          type: "code",
          titre: "Ton barème à toi",
          contenu: `
            <p>Défi libre. Écris un programme qui <strong>demande une information</strong> et
            la classe en <strong>au moins quatre catégories</strong>, avec une cascade
            <code>if</code> / <code>elif</code> / <code>else</code>.</p>
            <p>Des idées : un indice de qualité de l'air, une échelle de Richter, une
            catégorie d'IMC, un conseil vestimentaire selon la température, un niveau de
            batterie, une tranche d'imposition…</p>`,
          depart: `# Ton barème\n`,
          saisiesTest: ["18"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton programme doit demander une information." },
              { motif: "elif[\\s\\S]*elif", message: "Au moins quatre catégories, donc au moins deux elif." },
              { motif: "\\belse\\b", message: "Termine ta cascade par un else." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 7 terminée, et la partie 2 avec elle. 🏁",
          indices: [
            "Écris d'abord tes seuils du plus haut au plus bas : la cascade s'écrit ensuite toute seule.",
            "Chaque branche doit afficher quelque chose, sinon certains cas resteront muets.",
          ],
        },
      ],
    },
  ],
};

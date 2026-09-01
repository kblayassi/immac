/* Séance 1 — De Scratch à Python.
 *
 * Public : élèves de Seconde, zéro notion de Python, une année de Scratch au collège.
 * Fiche de rattachement : T6 (variables, affectation, instruction conditionnelle).
 *
 * Trois temps — repère pour l'enseignant, jamais affiché à l'élève : environ
 * 45 min de découverte, 30 min d'application, 30 min de défis.
 * Le parcours est linéaire : chaque étape réussie ouvre la suivante.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "De Scratch à Python",
  sousTitre: "Ton tout premier programme",
  palier: "T6 — Variables, affectation, instruction conditionnelle",

  accroche: `Tu sais déjà programmer. En Scratch, tu empilais des blocs ;
    ici, tu vas écrire ces mêmes ordres au clavier. C'est tout ce qui change —
    et c'est aussi ce qui rend Python bien plus puissant.`,

  objectifs: [
    "écrire et exécuter un programme Python",
    "afficher du texte et des résultats de calculs avec <code>print()</code>",
    "comprendre qu'un programme s'exécute ligne après ligne, de haut en bas",
    "lire un message d'erreur et réparer ton code",
  ],

  motDeLaFin: `Tu viens d'écrire tes premiers programmes Python. À la séance 2,
    on apprend à faire retenir des choses à l'ordinateur : les variables.`,

  parties: [

    /* ================================================================
       DÉCOUVERTE — ~45 min
       ================================================================ */
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
          titre: "Scratch et Python font le même métier",
          contenu: `
            <p>En Scratch, pour faire parler ton personnage, tu attrapais le bloc
            <strong>dire « Bonjour ! »</strong> et tu le glissais sous le chapeau.</p>

            <p>En Python, il n'y a plus de bloc à attraper : tu <strong>écris</strong>
            le même ordre au clavier.</p>

            <pre class="bloc-code"><code>print("Bonjour !")</code></pre>

            <p>Même idée, autre écriture. Et chaque famille de blocs que tu connais a son
            équivalent en Python. Tu ne les connais pas encore — c'est justement le
            programme de l'année :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Le bloc Scratch que tu connais</th><th>S'écrira en Python…</th><th>Quand ?</th></tr>
              <tr><td>dire « Bonjour ! »</td><td><code>print("Bonjour !")</code></td><td><strong>aujourd'hui</strong></td></tr>
              <tr><td>mettre <em>score</em> à 0</td><td><code>score = 0</code></td><td>séance 2</td></tr>
              <tr><td>si … alors</td><td><code>if … :</code></td><td>séance 4</td></tr>
              <tr><td>répéter 10 fois</td><td><code>for i in range(10):</code></td><td>séance 5</td></tr>
              <tr><td>répéter jusqu'à …</td><td><code>while … :</code></td><td>séance 6</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Rien à retenir dans ce tableau</span>
              Il est là pour te montrer où tu vas. Cette séance ne parle que de la
              <strong>première ligne</strong> : <code>print</code>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La vraie différence</span>
              Un bloc Scratch, on ne peut pas mal l'écrire : il existe, ou il n'existe pas.
              Une ligne Python, si. Une majuscule de travers, une parenthèse oubliée, et
              Python refuse d'exécuter. Ce n'est pas de la sévérité : c'est ce qui lui
              permet de comprendre <em>exactement</em> ce que tu veux.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Exécute ton premier programme",
          contenu: `
            <p>Le programme est déjà écrit. Clique sur <strong>▶ Exécuter</strong> pour
            le lancer, puis sur <strong>✓ Valider</strong> pour valider l'étape.</p>`,
          depart: `print("Bonjour !")\n`,
          validation: { sortie: "Bonjour !" },
          felicitation: "Ton premier programme Python tourne. 🎉",
          apres: `
            <p>Décortiquons cette ligne :</p>
            <ul>
              <li><code>print</code> est le nom de l'<strong>instruction</strong> : « affiche ».</li>
              <li>Les <strong>parenthèses</strong> contiennent ce qu'on lui donne à afficher.</li>
              <li>Les <strong>guillemets</strong> disent : « ceci est du texte ».</li>
            </ul>`,
          indices: [
            "Il n'y a rien à écrire : le bouton ▶ Exécuter est en bas à gauche de l'éditeur.",
          ],
        },

        {
          id: "d3",
          type: "code",
          titre: "À toi d'écrire",
          contenu: `
            <p>Écris un programme qui affiche <strong>ton prénom</strong>.</p>
            <p>Attention à recopier la forme exacte : le nom de l'instruction, les deux
            parenthèses, les deux guillemets.</p>`,
          depart: `# Écris ton programme sous cette ligne\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\(", message: "Ton programme doit utiliser l'instruction print()." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Parfait — tu viens d'écrire ton premier programme sans modèle.",
          indices: [
            "Reprends la ligne de l'étape précédente et remplace <code>Bonjour !</code> par ton prénom.",
            "La forme est : <code>print(\"…\")</code>. Le texte va entre les guillemets.",
          ],
          solution: `print("Ada")\n`,
          apres: `<p>La ligne qui commence par <code>#</code> est un <strong>commentaire</strong> :
            Python l'ignore complètement. C'est une note que tu laisses pour toi, ou pour
            celui qui relira ton code.</p>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Guillemets ou pas guillemets ?",
          contenu: `<p>Voici un programme de deux lignes. <strong>Avant de lire la suite</strong>,
            réfléchis : qu'est-ce qu'il va afficher ?</p>`,
          code: `print("2 + 3")\nprint(2 + 3)`,
          question: "Que va afficher ce programme ?",
          options: [
            { texte: "<code>5</code> puis <code>5</code>",
              explication: "Presque : la deuxième ligne affiche bien 5, mais pas la première." },
            { texte: "<code>2 + 3</code> puis <code>5</code>", correct: true,
              explication: "Exactement. La première ligne affiche du texte, la seconde un calcul." },
            { texte: "<code>2 + 3</code> puis <code>2 + 3</code>",
              explication: "Non : sans guillemets, Python ne recopie pas, il calcule." },
            { texte: "Un message d'erreur",
              explication: "Non, les deux lignes sont parfaitement correctes." },
          ],
          apres: `
            <span class="chapo">La règle</span>
            Ce qui est <strong>entre guillemets</strong> est du texte : Python le recopie
            tel quel, sans le comprendre. <strong>Sans guillemets</strong>, Python lit un
            calcul et affiche le résultat.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Faire calculer Python",
          contenu: `
            <p>Fais afficher à Python le résultat de <strong>17 × 24</strong>.</p>
            <p>En Python, le signe de la multiplication est l'étoile : <code>*</code>.</p>
            <div class="encadre" data-ton="attention">
              Interdit d'écrire le résultat toi-même : c'est <em>Python</em> qui doit calculer.
            </div>`,
          depart: `print()\n`,
          validation: {
            codeAbsent: [
              { motif: "408", message: "Tu as écrit le résultat à la main. Laisse Python faire le calcul : donne-lui 17 * 24." },
            ],
            sortie: "408",
          },
          felicitation: "Python est maintenant ta calculatrice.",
          indices: [
            "Le calcul se met entre les parenthèses, <strong>sans</strong> guillemets.",
            "La forme est : <code>print(17 * 24)</code> — à toi de la retrouver.",
          ],
          solution: `print(17 * 24)\n`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Plusieurs instructions, dans l'ordre",
          contenu: `
            <p>Un programme, c'est une <strong>suite d'instructions</strong>. Python les
            exécute une par une, de haut en bas, comme tu lis un texte.</p>
            <p>Écris un programme de <strong>trois lignes</strong> qui affiche exactement :</p>
            <pre class="bloc-code"><code>Bonjour !
Je m'appelle Python.
J'ai 35 ans.</code></pre>`,
          depart: `print("Bonjour !")\n`,
          validation: {
            sortie: "Bonjour !\nJe m'appelle Python.\nJ'ai 35 ans.",
          },
          felicitation: "Trois instructions, trois lignes affichées, dans l'ordre.",
          indices: [
            "Il te faut trois lignes <code>print(…)</code>, une sous l'autre.",
            "L'apostrophe de <em>m'appelle</em> ne pose aucun problème tant que ton texte est entouré de guillemets doubles <code>\"</code>.",
            "Recopie la ponctuation à l'identique : le point d'exclamation, les points, les majuscules.",
          ],
          solution: `print("Bonjour !")\nprint("Je m'appelle Python.")\nprint("J'ai 35 ans.")\n`,
          apres: `<p>Chaque <code>print</code> affiche sur une <strong>nouvelle ligne</strong> :
            tu n'as rien à faire pour aller à la ligne.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Ta première erreur (elle est volontaire)",
          contenu: `
            <p>Le programme ci-dessous <strong>ne fonctionne pas</strong>.</p>
            <p>Commence par cliquer sur <strong>▶ Exécuter</strong> pour lire ce que Python
            te répond, puis répare-le. Il doit afficher <code>Bienvenue en Seconde !</code></p>`,
          depart: `print("Bienvenue en Seconde !"\n`,
          validation: { sortie: "Bienvenue en Seconde !" },
          felicitation: "Erreur trouvée et réparée. C'est 80 % du métier. 🔧",
          indices: [
            "Python te répond <code>SyntaxError</code> : c'est une <em>faute de grammaire</em>, il n'a même pas commencé à exécuter.",
            "Compte les parenthèses ouvrantes, puis les fermantes.",
          ],
          solution: `print("Bienvenue en Seconde !")\n`,
          apres: `
            <p>Un <strong>SyntaxError</strong>, c'est Python qui dit : « je n'arrive pas à
            lire ta phrase ». Il indique toujours <strong>la ligne</strong> où il a butté —
            et parfois l'erreur est juste au-dessus.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Réflexe à prendre</span>
              Un message d'erreur n'est pas une punition, c'est une indication. Lis toujours
              la <strong>dernière ligne</strong> du message : c'est là qu'est le diagnostic.
            </div>`,
        },

        {
          id: "d8",
          type: "qcm",
          titre: "Lire un message d'erreur",
          contenu: `<p>Un camarade a écrit ce programme :</p>
            <pre class="bloc-code"><code>Print("Bonjour")</code></pre>
            <p>Python lui répond :</p>
            <pre class="bloc-code"><code>NameError: name 'Print' is not defined</code></pre>`,
          question: "Où est le problème ?",
          options: [
            { texte: "Il manque les guillemets autour de Bonjour",
              explication: "Les guillemets sont bien là, autour de Bonjour." },
            { texte: "L'instruction s'écrit <code>print</code>, tout en minuscules", correct: true,
              explication: "Python distingue les majuscules des minuscules : <code>Print</code> et <code>print</code> sont deux mots différents pour lui." },
            { texte: "Il manque un point-virgule à la fin de la ligne",
              explication: "En Python, pas de point-virgule en fin de ligne — contrairement à d'autres langages." },
            { texte: "Il faut mettre un espace après <code>print</code>",
              explication: "Non, la parenthèse suit directement le nom de l'instruction." },
          ],
          apres: `<span class="chapo">Deux erreurs à savoir reconnaître</span>
            <strong>SyntaxError</strong> : la phrase est mal formée (parenthèse, guillemet…).
            <strong>NameError</strong> : Python ne connaît pas ce mot-là.`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Mélanger texte et calcul",
          contenu: `
            <p>On peut donner <strong>plusieurs choses</strong> à <code>print</code>, séparées
            par des virgules. Python les affiche à la suite, en glissant une espace entre elles :</p>
            <pre class="bloc-code"><code>print("J'ai", 15, "ans")</code></pre>
            <p>affiche <code>J'ai 15 ans</code>.</p>
            <p><strong>À toi.</strong> Affiche exactement :</p>
            <pre class="bloc-code"><code>Il reste 27 jours avant les vacances.</code></pre>
            <p>… mais sans écrire <code>27</code> : le nombre doit être <strong>calculé</strong>
            à partir de 30 et de 3.</p>`,
          depart: `print("Il reste", 0, "jours avant les vacances.")\n`,
          validation: {
            codeAbsent: [
              { motif: "27", message: "Le 27 doit être calculé par Python, pas tapé à la main. Que faut-il faire avec 30 et 3 ?" },
            ],
            sortie: "Il reste 27 jours avant les vacances.",
          },
          felicitation: "Texte et calcul dans le même affichage : bien joué.",
          indices: [
            "27, c'est 30 moins 3.",
            "Remplace le <code>0</code> par le calcul <code>30 - 3</code>, sans guillemets.",
          ],
          solution: `print("Il reste", 30 - 3, "jours avant les vacances.")\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Ce que tu sais faire maintenant",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Pour…</th><th>On écrit…</th></tr>
              <tr><td>afficher du texte</td><td><code>print("Bonjour")</code></td></tr>
              <tr><td>afficher un calcul</td><td><code>print(17 * 24)</code></td></tr>
              <tr><td>mélanger les deux</td><td><code>print("Total :", 12 + 5)</code></td></tr>
              <tr><td>laisser une note à soi-même</td><td><code># ceci est un commentaire</code></td></tr>
            </table>
            </div>

            <p>Les quatre opérations : <code>+</code> &nbsp; <code>-</code> &nbsp;
            <code>*</code> (multiplier) &nbsp; <code>/</code> (diviser).</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les trois pièges du débutant</span>
              <ol style="margin-bottom:0">
                <li>Une parenthèse ouverte doit être refermée.</li>
                <li>Un guillemet ouvert doit être refermé.</li>
                <li><code>print</code> s'écrit en minuscules.</li>
              </ol>
            </div>`,
        },
      ],
    },

    /* ================================================================
       APPLICATION — ~30 min
       ================================================================ */
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
          titre: "Ta carte de visite",
          contenu: `
            <p>Écris un programme qui affiche <strong>trois lignes</strong> :
            ton prénom, ta classe, et ta matière préférée.</p>
            <p>Par exemple :</p>
            <pre class="bloc-code"><code>Ada
Seconde 3
Mathématiques</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\(", message: "Utilise l'instruction print()." },
            ],
            sortieRegex: "^[^\\n]+\\n[^\\n]+\\n[^\\n]+",
            sortieRegexMessage: "Ton programme doit afficher trois lignes non vides.",
          },
          indices: [
            "Trois informations à afficher, donc trois instructions <code>print</code>.",
          ],
          solution: `print("Ada")\nprint("Seconde 3")\nprint("Mathématiques")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Traduis ce script Scratch",
          contenu: `
            <p>Voici un script Scratch, écrit en toutes lettres :</p>
            <div class="encadre" data-ton="scratch">
              quand le drapeau vert est cliqué<br>
              &nbsp;&nbsp;dire « Bonjour ! »<br>
              &nbsp;&nbsp;dire « Je suis un robot. »<br>
              &nbsp;&nbsp;dire « Au revoir ! »
            </div>
            <p>Traduis-le en Python.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Et le drapeau vert ?</span>
              Il ne devient pas une ligne de code : en Python, c'est le bouton
              <strong>▶ Exécuter</strong> qui joue son rôle. Cliquer sur ▶, c'est
              exactement cliquer sur le drapeau vert.
            </div>`,
          depart: `\n`,
          validation: {
            sortie: "Bonjour !\nJe suis un robot.\nAu revoir !",
          },
          indices: [
            "Chaque bloc <em>dire</em> devient une ligne <code>print(…)</code>.",
            "Recopie les textes à l'identique, ponctuation comprise. Les guillemets français « » ne s'écrivent pas : ce sont les guillemets droits <code>\"</code> du clavier.",
          ],
          solution: `print("Bonjour !")\nprint("Je suis un robot.")\nprint("Au revoir !")\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La chasse aux bugs",
          contenu: `
            <p>Ce programme contient <strong>trois erreurs</strong>. Répare-les toutes
            pour qu'il affiche :</p>
            <pre class="bloc-code"><code>Résultat du calcul :
96
Fin du programme</code></pre>
            <p>Exécute d'abord : Python ne signale qu'une erreur à la fois, donc il faudra
            recommencer plusieurs fois.</p>`,
          depart: `Print("Résultat du calcul :")\nprint(12 * 8\nprint("Fin du programme)\n`,
          validation: {
            sortie: "Résultat du calcul :\n96\nFin du programme",
          },
          felicitation: "Trois bugs, trois réparations. Tu deviens efficace. 🐛",
          indices: [
            "Ligne 1 : regarde bien la première lettre de l'instruction.",
            "Ligne 2 : compte les parenthèses.",
            "Ligne 3 : compte les guillemets.",
          ],
          solution: `print("Résultat du calcul :")\nprint(12 * 8)\nprint("Fin du programme")\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Combien de secondes dans une journée ?",
          contenu: `
            <p>Affiche exactement :</p>
            <pre class="bloc-code"><code>Une journée dure 86400 secondes.</code></pre>
            <p>Le nombre doit être <strong>calculé par Python</strong>, à partir des
            24 heures, des 60 minutes et des 60 secondes.</p>`,
          depart: `\n`,
          validation: {
            codeAbsent: [
              { motif: "86\\s*400", message: "Le résultat doit être calculé par Python, pas écrit à la main." },
            ],
            sortie: "Une journée dure 86400 secondes.",
          },
          indices: [
            "Une journée : 24 heures, chacune de 60 minutes, chacune de 60 secondes. Il faut donc multiplier.",
            "Reprends la forme de la découverte : <code>print(\"…\", calcul, \"…\")</code>.",
          ],
          solution: `print("Une journée dure", 24 * 60 * 60, "secondes.")\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Le début de la table de 7",
          contenu: `
            <p>Affiche les trois premières lignes de la table de 7 :</p>
            <pre class="bloc-code"><code>7 x 1 = 7
7 x 2 = 14
7 x 3 = 21</code></pre>
            <p>Les résultats <strong>14</strong> et <strong>21</strong> doivent être calculés
            par Python.</p>`,
          depart: `print("7 x 1 =", 7 * 1)\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b14\\b|\\b21\\b", message: "14 et 21 doivent être calculés : écris 7 * 2 et 7 * 3." },
            ],
            sortie: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21",
          },
          indices: [
            "La première ligne t'est donnée : recopie-la deux fois et adapte-la.",
            "Attention, il y a <strong>deux</strong> nombres à changer sur chaque ligne : celui du texte et celui du calcul.",
          ],
          solution: `print("7 x 1 =", 7 * 1)\nprint("7 x 2 =", 7 * 2)\nprint("7 x 3 =", 7 * 3)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le mur de briques",
          contenu: `
            <p>Affiche ce dessin, exactement :</p>
            <pre class="bloc-code sans-copie"><code>##########
#        #
#        #
##########</code></pre>
            <p>Chaque ligne fait <strong>10 caractères</strong> de large. Les lignes du
            milieu ont un <code>#</code>, huit espaces, puis un <code>#</code>.</p>`,
          depart: `\n`,
          validation: {
            sortie: "##########\n#        #\n#        #\n##########",
          },
          felicitation: "Un dessin en quatre instructions. C'est de l'art. 🧱",
          indices: [
            "Quatre lignes affichées, donc quatre <code>print</code>.",
            "Compte précisément : 10 dièses pour le haut et le bas, et pour le milieu 1 dièse + 8 espaces + 1 dièse.",
          ],
          solution: `print("##########")\nprint("#        #")\nprint("#        #")\nprint("##########")\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Périmètre et aire",
          contenu: `
            <p>Un rectangle mesure <strong>12 cm</strong> de long et <strong>7 cm</strong>
            de large. Affiche exactement :</p>
            <pre class="bloc-code"><code>Rectangle 12 x 7
Périmètre : 38 cm
Aire : 84 cm²</code></pre>
            <p>Les deux résultats doivent être <strong>calculés</strong> à partir de 12 et 7.</p>
            <p><em>Rappel :</em> périmètre = 2 × (longueur + largeur), aire = longueur × largeur.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où trouver le petit 2 de cm² ?</span>
              Sur un clavier français, la touche <kbd>²</kbd> est tout en haut à gauche,
              juste à gauche du <kbd>&amp;</kbd> (celle du 1). Une seule frappe suffit :
              il n'y a pas besoin de <kbd>Maj</kbd>.
            </div>`,
          depart: `print("Rectangle 12 x 7")\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b38\\b|\\b84\\b", message: "Le périmètre et l'aire doivent être calculés par Python à partir de 12 et 7." },
            ],
            sortie: "Rectangle 12 x 7\nPérimètre : 38 cm\nAire : 84 cm²",
          },
          felicitation: "Python vient de faire tes maths à ta place. 📐",
          indices: [
            "Le périmètre s'écrit <code>2 * (12 + 7)</code> — les parenthèses comptent, exactement comme en maths.",
            "L'aire s'écrit <code>12 * 7</code>.",
            "Forme d'une ligne : <code>print(\"Périmètre :\", 2 * (12 + 7), \"cm\")</code>.",
          ],
          solution: `print("Rectangle 12 x 7")\nprint("Périmètre :", 2 * (12 + 7), "cm")\nprint("Aire :", 12 * 7, "cm²")\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Le damier",
          contenu: `
            <p>Un dessin plus exigeant. Affiche exactement :</p>
            <pre class="bloc-code sans-copie"><code>+---+---+
|   |   |
+---+---+
|   |   |
+---+---+</code></pre>
            <p>Cinq lignes, neuf caractères chacune. Compte bien.</p>`,
          depart: `\n`,
          validation: {
            sortie: "+---+---+\n|   |   |\n+---+---+\n|   |   |\n+---+---+",
          },
          felicitation: "Cinq lignes au caractère près. Tu es précis. ▦",
          indices: [
            "Deux lignes différentes seulement, qui alternent : <code>+---+---+</code> et <code>|   |   |</code>.",
            "La ligne verticale : barre, trois espaces, barre, trois espaces, barre.",
            "Ordre : séparateur, cellule, séparateur, cellule, séparateur.",
          ],
          solution: `print("+---+---+")\nprint("|   |   |")\nprint("+---+---+")\nprint("|   |   |")\nprint("+---+---+")\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Répare et complète",
          contenu: `
            <p>Le dernier exercice mélange les deux gestes de la séance : il y a
            <strong>une erreur à corriger</strong> et <strong>un calcul à écrire</strong>.</p>
            <p>Le programme doit afficher :</p>
            <pre class="bloc-code"><code>Bilan de l'année
Nombre de semaines de cours : 36
Nombre d'heures de SNT : 72</code></pre>
            <p>Il y a 2 heures de SNT par semaine : le 72 doit être calculé.</p>`,
          depart: `print("Bilan de l'année")\nprint("Nombre de semaines de cours :", 36\nprint("Nombre d'heures de SNT :", 0)\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b72\\b", message: "Le 72 doit être calculé : 36 semaines de 2 heures." },
            ],
            sortie: "Bilan de l'année\nNombre de semaines de cours : 36\nNombre d'heures de SNT : 72",
          },
          felicitation: "Réparer et compléter : tu as les deux gestes. 🏗️",
          indices: [
            "Commence par exécuter : Python te signale d'abord l'erreur de syntaxe.",
            "Ligne 2 : il manque une parenthèse fermante.",
            "Ligne 3 : remplace le <code>0</code> par <code>36 * 2</code>.",
          ],
          solution: `print("Bilan de l'année")\nprint("Nombre de semaines de cours :", 36)\nprint("Nombre d'heures de SNT :", 36 * 2)\n`,
        },
      ],
    },

    /* ================================================================
       DÉFIS — ~30 min
       ================================================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le sapin",
          contenu: `
            <p>Affiche ce sapin, au caractère près :</p>
            <pre class="bloc-code sans-copie"><code>   *
  ***
 *****
*******
   |</code></pre>
            <p>La difficulté est dans les <strong>espaces du début</strong> de chaque ligne.</p>`,
          depart: `\n`,
          validation: {
            sortie: "   *\n  ***\n *****\n*******\n   |",
          },
          felicitation: "Sapin conforme. 🎄",
          indices: [
            "Cinq lignes affichées, donc cinq <code>print</code>.",
            "Ligne 1 : trois espaces puis une étoile. Ligne 2 : deux espaces puis trois étoiles. Une espace de moins et deux étoiles de plus à chaque fois.",
            "Les espaces comptent : ils doivent être <em>à l'intérieur</em> des guillemets.",
          ],
          solution: `print("   *")\nprint("  ***")\nprint(" *****")\nprint("*******")\nprint("   |")\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Quarante tirets, sans en taper quarante",
          contenu: `
            <p>Affiche une ligne de <strong>40 tirets</strong> :</p>
            <pre class="bloc-code"><code>----------------------------------------</code></pre>
            <p>Mais interdiction de les taper à la main. Python sait répéter un texte —
            à toi de trouver comment. <em>Indice général : le symbole est le même que
            pour la multiplication.</em></p>`,
          depart: `\n`,
          validation: {
            codeAbsent: [
              { motif: "-{6,}", message: "Tu tapes les tirets à la main. Cherche le moyen de demander à Python de répéter." },
            ],
            sortie: "----------------------------------------",
          },
          felicitation: "Tu viens de découvrir la répétition de texte. 💪",
          indices: [
            "En Python, <code>\"ab\" * 3</code> vaut <code>\"ababab\"</code>.",
            "Il te faut donc un texte contenant un seul tiret, multiplié par 40.",
          ],
          solution: `print("-" * 40)\n`,
          apres: `<p>Multiplier un <strong>texte</strong> par un nombre le répète. C'est
            une particularité de Python que tu réutiliseras souvent pour tracer des
            séparateurs, des barres de progression ou des dessins.</p>`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Le losange",
          contenu: `
            <p>Plus dur que le sapin, parce qu'il faut redescendre :</p>
            <pre class="bloc-code sans-copie"><code>   *
  * *
 *   *
*     *
 *   *
  * *
   *</code></pre>
            <p>Sept lignes. Regarde bien : les espaces <em>entre</em> les étoiles comptent
            autant que ceux du début.</p>`,
          depart: `\n`,
          validation: {
            sortie: "   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *",
          },
          felicitation: "Losange parfait. La symétrie n'a plus de secret. 💎",
          indices: [
            "Les trois dernières lignes sont exactement les trois premières, dans l'autre sens.",
            "Ligne 2 : deux espaces, une étoile, une espace, une étoile.",
            "Ligne 4 : une étoile, cinq espaces, une étoile — aucun espace au début.",
          ],
          solution: `print("   *")\nprint("  * *")\nprint(" *   *")\nprint("*     *")\nprint(" *   *")\nprint("  * *")\nprint("   *")\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le nombre que ta calculatrice ne sait pas afficher",
          contenu: `
            <p>Calcule <strong>2 multiplié par lui-même 64 fois</strong> — ce qu'on note
            2<sup>64</sup>.</p>
            <p>Ta calculatrice répond <code>1.844674407e19</code> : une valeur approchée.
            Python, lui, donne le nombre <strong>exact</strong>, avec ses 20 chiffres.</p>
            <p>En Python, la puissance s'écrit avec deux étoiles : <code>2 ** 5</code>
            vaut 32.</p>`,
          depart: `print()\n`,
          validation: {
            codeAbsent: [
              { motif: "18446744073709551616", message: "Trop facile de recopier le résultat : c'est Python qui doit calculer." },
            ],
            sortie: "18446744073709551616",
          },
          felicitation: "20 chiffres exacts. Python ne fait aucune approximation sur les entiers. 🤯",
          indices: [
            "La forme est <code>2 ** 64</code>.",
            "Il ne reste plus qu'à mettre ce calcul dans un <code>print</code>.",
          ],
          solution: `print(2 ** 64)\n`,
          apres: `<p>Contrairement à une calculatrice, Python calcule sur des entiers
            <strong>aussi grands qu'on veut</strong>, sans jamais arrondir. Essaie
            <code>2 ** 1000</code> pour voir.</p>`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le partage du butin",
          contenu: `
            <p>Un défi qui utilise deux opérations que tu ne connais pas encore — tu les
            reverras à la séance 2 :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Ce qu'elle donne</th><th>Exemple</th></tr>
              <tr><td><code>//</code></td><td>le <strong>quotient</strong> entier</td><td><code>17 // 5</code> vaut 3</td></tr>
              <tr><td><code>%</code></td><td>le <strong>reste</strong></td><td><code>17 % 5</code> vaut 2</td></tr>
            </table>
            </div>
            <p><strong>1000 pièces d'or</strong> à partager équitablement entre
            <strong>7 pirates</strong>. Affiche exactement :</p>
            <pre class="bloc-code"><code>Chaque pirate reçoit 142 pièces.
Il en reste 6 pour le perroquet.</code></pre>
            <p>Les deux nombres doivent être calculés à partir de 1000 et 7.</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Il te faut la division entière // pour la part de chaque pirate." },
              { motif: "%", message: "Il te faut le reste % pour la part du perroquet." },
            ],
            codeAbsent: [
              { motif: "\\b142\\b", message: "Le 142 doit être calculé par Python, pas écrit à la main." },
            ],
            sortie: "Chaque pirate reçoit 142 pièces.\nIl en reste 6 pour le perroquet.",
          },
          felicitation: "Division entière et reste : tu as pris de l'avance sur la séance 2. 🏴‍☠️",
          indices: [
            "La part de chaque pirate, c'est <code>1000 // 7</code>.",
            "Ce qui reste, c'est <code>1000 % 7</code>.",
            "Forme : <code>print(\"Chaque pirate reçoit\", 1000 // 7, \"pièces.\")</code>.",
          ],
          solution: `print("Chaque pirate reçoit", 1000 // 7, "pièces.")\nprint("Il en reste", 1000 % 7, "pour le perroquet.")\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton affiche de cinéma",
          contenu: `
            <p>Dernier défi, libre celui-là. Écris un programme d'<strong>au moins
            cinq lignes affichées</strong> qui présente un film, un jeu ou un livre que
            tu aimes : titre, année, une phrase de résumé, une note…</p>
            <p>Une seule contrainte technique : ton programme doit contenir
            <strong>au moins un calcul</strong> (par exemple l'âge du film :
            <code>2026 - 1999</code>).</p>`,
          depart: `print("=" * 30)\n`,
          validation: {
            codeContient: [
              { motif: "\\d\\s*[-+*/]\\s*\\d", message: "Ajoute au moins un calcul dans un de tes print() : une soustraction, une multiplication…" },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n",
            sortieRegexMessage: "Ton programme doit afficher au moins cinq lignes.",
          },
          felicitation: "Belle affiche. Tu as terminé la séance 1. 🏁",
          indices: [
            "Commence par une ligne de séparation, puis le titre, puis les informations.",
            "Pour l'âge : <code>print(\"Sorti il y a\", 2026 - 1999, \"ans\")</code>.",
          ],
          solution: `print("=" * 30)\nprint("MATRIX")\nprint("Science-fiction, 1999")\nprint("Sorti il y a", 2026 - 1999, "ans")\nprint("Ma note : 19 / 20")\nprint("=" * 30)\n`,
        },
      ],
    },
  ],
};

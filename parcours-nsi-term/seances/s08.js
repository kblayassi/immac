/* NSI Terminale — chapitre 1, séance 8 : piles et files au travail.
 *
 * Aucune notion nouvelle : uniquement des applications, sur de vrais problèmes.
 *   - découverte : la notation polonaise inverse, de bout en bout ;
 *   - application : le TRI CRÊPES du sujet zéro de l'épreuve écrite ;
 *   - défis : le parcours d'un labyrinthe en profondeur (pile) puis en largeur
 *     (file), qui prépare directement le chapitre des graphes.
 *
 * Séance la plus longue du chapitre (2 h annoncées). Les implémentations de
 * pile et de file sont fournies partout : ce qui est évalué, ce sont les
 * algorithmes clients.
 *
 * Règles de rédaction : voir l'en-tête de s01.js. `apres` est DÉJÀ un encadré.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "Piles et files au travail",
  sousTitre: "Notation polonaise, tri crêpes, labyrinthes — rien de nouveau, tout à faire",
  palier: "Partie 4 — Choisir et appliquer",

  accroche: `Dernière séance, et pas une notion de plus : uniquement des problèmes. Une
    calculatrice qui se passe de parenthèses, un exercice tombé au baccalauréat, et deux
    façons de traverser un labyrinthe qui ne diffèrent que par une lettre — celle qui
    sépare une pile d'une file.`,

  objectifs: [
    "évaluer une expression en <strong>notation polonaise inverse</strong>",
    "écrire le <strong>tri crêpes</strong> du sujet zéro de l'épreuve écrite",
    "traverser un labyrinthe <strong>en profondeur</strong> avec une pile",
    "le traverser <strong>en largeur</strong> avec une file, et obtenir le plus court chemin",
  ],

  motDeLaFin: `Le chapitre est terminé. Tu sais spécifier une structure, en écrire plusieurs
    implémentations, comparer ce qu'elles coûtent et choisir la bonne. Le chapitre suivant
    reprendra ces mêmes piles et ces mêmes files pour les réécrire avec des
    <strong>classes</strong> — et tu verras que le langage sait faire tout seul la
    séparation que tu tiens à la main depuis la séance 1.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "une calculatrice qui se passe de parenthèses",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Écrire un calcul sans parenthèses",
          contenu: `
            <p>Pour calculer <code>(3 + 4) × 2</code>, un ordinateur doit comprendre que
            l'addition passe avant la multiplication <em>parce qu'il y a des parenthèses</em>.
            C'est tout un travail d'analyse.</p>

            <p>Il existe une écriture qui s'en dispense entièrement : on place
            l'opérateur <strong>après</strong> ses deux opérandes.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Écriture habituelle</th><th>Notation polonaise inverse</th></tr>
              <tr><td><code>3 + 4</code></td><td><code>3 4 +</code></td></tr>
              <tr><td><code>(3 + 4) × 2</code></td><td><code>3 4 + 2 *</code></td></tr>
              <tr><td><code>3 + 4 × 2</code></td><td><code>3 4 2 * +</code></td></tr>
              <tr><td><code>(1 + 2) × (3 + 4)</code></td><td><code>1 2 + 3 4 + *</code></td></tr>
            </table>
            </div>

            <p>Regarde la troisième ligne et la deuxième : les deux expressions habituelles
            ont les mêmes symboles dans le même ordre, et ne se distinguent que par des
            parenthèses. En notation polonaise inverse, elles s'écrivent différemment —
            <strong>l'ordre suffit</strong>, et aucune parenthèse n'est nécessaire. Jamais.</p>

            <div class="encadre">
              <span class="chapo">La règle d'évaluation, et c'est une pile</span>
              On lit l'expression de gauche à droite :
              <ul>
                <li>un <strong>nombre</strong> → on l'empile ;</li>
                <li>un <strong>opérateur</strong> → on dépile <strong>deux</strong> valeurs,
                on applique l'opération, et on empile le résultat.</li>
              </ul>
              À la fin, la pile contient exactement une valeur : le résultat.
            </div>

            <p>Déroulons <code>3 4 + 2 *</code>, la pile écrite du fond vers le sommet :</p>

            <pre class="bloc-code"><code>jeton    action                        pile
  3      empiler 3                     [3]
  4      empiler 4                     [3, 4]
  +      dépiler 4 et 3, empiler 7     [7]
  2      empiler 2                     [7, 2]
  *      dépiler 2 et 7, empiler 14    [14]

résultat : 14</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">D'où cela vient</span>
              Le logicien polonais <strong>Jan Łukasiewicz</strong> propose en 1924 de placer
              l'opérateur <em>avant</em> ses opérandes, pour se passer de parenthèses. La
              variante <em>inverse</em> — l'opérateur après — est mise au point dans les
              années 1950, et devient la façon standard d'évaluer des expressions dans un
              ordinateur.
              <br><br>
              Les calculatrices <strong>HP</strong> ont fonctionné ainsi pendant quarante ans,
              et beaucoup de machines virtuelles — dont celle de Python — exécutent encore
              aujourd'hui du code organisé de cette façon, autour d'une pile.
            </div>`,
          libelleBouton: "Essayer à la main →",
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Dérouler à la main",
          contenu: `
            <p>Applique la règle sur cette expression, en écrivant l'état de la pile après
            chaque jeton. Ne calcule pas de tête : suis la règle.</p>
            <pre class="bloc-code"><code>5  1  2  +  4  *  +</code></pre>`,
          question: "Que vaut le résultat ?",
          options: [
            { texte: "<code>17</code>", correct: true,
              explication: "Oui. On empile 5, 1 et 2 ; le <code>+</code> les remplace par 3 ; on empile 4 ; le <code>*</code> donne 12 ; le dernier <code>+</code> donne 5 + 12 = 17. En écriture habituelle : 5 + (1 + 2) × 4." },
            { texte: "<code>32</code>",
              explication: "Ce serait (5 + 1 + 2) × 4. Mais le premier <code>+</code> ne consomme que les <strong>deux</strong> valeurs du sommet — le 1 et le 2 — et le 5 reste dessous, en attente." },
            { texte: "<code>24</code>",
              explication: "Ce serait (5 + 1) × 4, en oubliant le 2. Chaque nombre de l'expression est empilé, aucun ne se perd." },
            { texte: "<code>13</code>",
              explication: "Ce serait 5 + 2 × 4. Le 1 a bien été empilé, et le premier <code>+</code> l'additionne au 2." },
          ],
          apres: `<span class="chapo">Pourquoi la pile est la bonne structure</span>
            Un opérateur consomme toujours les <strong>deux valeurs les plus récentes</strong>,
            et rend un résultat qui sera lui-même consommé plus tard. Dernier arrivé, premier
            servi : c'est la définition d'une pile.
            <br><br>
            Remarque le 5 : il est empilé en premier et n'est utilisé qu'à la toute fin. Il
            attend patiemment au fond pendant qu'on calcule au-dessus de lui. Aucun tableau
            indexé n'exprimerait cela aussi simplement.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "La calculatrice, premier jet",
          contenu: `
            <p>Écris <code>evaluer(expression)</code>. L'expression est un
            <strong>tableau de chaînes</strong> : soit un nombre écrit en chiffres, soit
            <code>"+"</code>, soit <code>"*"</code>.</p>

            <pre class="bloc-code"><code>evaluer(["3", "4", "+", "2", "*"])  →  14
evaluer(["7"])                      →  7</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              L'expression est bien formée : chaque opérateur trouve deux valeurs, et il en
              reste exactement une à la fin. On vérifiera cela dans deux étapes.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les jetons sont des chaînes</span>
              <code>"3"</code> n'est pas <code>3</code> : il faut convertir avec
              <code>int(jeton)</code> avant d'empiler, sinon <code>"3" + "4"</code> donnerait
              <code>"34"</code>.
            </div>`,
          nomFichier: "npi.py",
          depart: `# ---- La pile. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef evaluer(expression):\n    """Renvoie la valeur de l'expression en notation polonaise inverse.\n\n    expression est un tableau de chaines : des nombres, "+" ou "*".\n    Precondition : l'expression est bien formee.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bint\\s*\\(", message: "Les jetons sont des chaînes : il faut les convertir en nombres." },
              { motif: "\\bempiler\\s*\\([\\s\\S]*\\bempiler\\s*\\(", message: "On empile les nombres, et aussi les résultats intermédiaires." },
            ],
            tests: `assert evaluer(["7"]) == 7, "Une expression réduite à un nombre vaut ce nombre."\nassert evaluer(["3", "4", "+"]) == 7, "3 + 4."\nassert evaluer(["3", "4", "*"]) == 12, "3 × 4."\nassert evaluer(["3", "4", "+", "2", "*"]) == 14, "(3 + 4) × 2."\nassert evaluer(["3", "4", "2", "*", "+"]) == 11, "3 + 4 × 2."\nassert evaluer(["5", "1", "2", "+", "4", "*", "+"]) == 17, "5 + (1 + 2) × 4."\nassert evaluer(["1", "2", "+", "3", "4", "+", "*"]) == 21, "(1 + 2) × (3 + 4)."\nassert evaluer(["2", "3", "*", "4", "5", "*", "+"]) == 26, "2 × 3 + 4 × 5."\nassert evaluer(["10", "20", "+"]) == 30, "Les nombres peuvent avoir plusieurs chiffres."\nassert evaluer(["2", "2", "*", "2", "*", "2", "*"]) == 16, "Quatre facteurs de suite."`,
          },
          felicitation: "Une calculatrice en douze lignes, et pas une parenthèse à analyser. 🧮",
          indices: [
            "Une pile neuve, une boucle <code>for</code> sur les jetons, et le résultat à la fin.",
            "Dans la boucle, trois cas : le jeton est <code>\"+\"</code>, il est <code>\"*\"</code>, ou c'est un nombre — et ce dernier cas est le <code>else</code>.",
            "Pour un opérateur : deux dépilements, l'opération, puis un empilement du résultat. À la fin de la boucle, la pile ne contient plus qu'une valeur : c'est elle qu'on renvoie.",
          ],
          apres: `<span class="chapo">Tu viens d'écrire un interprète</span>
            Aussi modeste soit-il, ce programme <em>exécute</em> un autre programme : il lit
            une suite d'instructions et les applique une à une à une pile. C'est exactement
            l'architecture d'une <strong>machine virtuelle</strong>.
            <br><br>
            Celle de Python fonctionne ainsi. Quand tu écris <code>x = 3 + 4 * 2</code>,
            Python traduit ta ligne en une suite d'instructions de pile — charger 3, charger
            4, charger 2, multiplier, additionner, ranger — puis les exécute. Tu peux même les
            afficher, avec le module <code>dis</code> de la bibliothèque standard.
            <br><br>
            L'addition et la multiplication ont ceci de particulier qu'elles sont
            commutatives : l'ordre des deux dépilements n'a pas d'importance. Ce sera une
            autre affaire à l'étape suivante.`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Le piège de la soustraction",
          contenu: `
            <p>Ajoutons la soustraction à la calculatrice, en recopiant simplement le cas de
            l'addition.</p>`,
          code: `def evaluer(expression):\n    p = pile_vide()\n    for jeton in expression:\n        if jeton == "-":\n            a = depiler(p)\n            b = depiler(p)\n            empiler(p, a - b)\n        else:\n            empiler(p, int(jeton))\n    return depiler(p)\n\nprint(evaluer(["10", "3", "-"]))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>-7</code>", correct: true,
              explication: "Oui, et c'est un bug. <code>10 3 -</code> doit valoir 10 − 3 = 7. Mais le premier dépilement rend le <strong>sommet</strong>, c'est-à-dire le 3 : la fonction calcule donc 3 − 10." },
            { texte: "<code>7</code>",
              explication: "C'est le résultat attendu, mais pas celui du programme. Regarde bien l'ordre : <code>a</code> reçoit le premier dépilement, donc le dernier empilé — le 3." },
            { texte: "<code>13</code>",
              explication: "L'opération est bien une soustraction, elle est seulement faite à l'envers." },
            { texte: "Une erreur : la pile est vide à la fin.",
              explication: "Les deux nombres sont dépilés et le résultat empilé : il reste exactement une valeur, et le dernier dépilement la rend." },
          ],
          apres: `<span class="chapo">La règle à ne jamais oublier</span>
            Le <strong>premier dépilement donne l'opérande de droite</strong>, le second celui
            de gauche. C'est logique : le dernier empilé est celui qui était écrit en second
            dans l'expression.
            <pre class="bloc-code"><code>droite = depiler(p)     # le dernier écrit
gauche = depiler(p)     # celui d'avant
empiler(p, gauche - droite)</code></pre>
            L'addition et la multiplication pardonnent cette confusion, puisqu'elles sont
            commutatives. La soustraction et la division, non — et c'est pour cela qu'on les
            teste toujours en premier quand on relit ce genre de code.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "La calculatrice complète",
          contenu: `
            <p>Reprends <code>evaluer</code> avec les <strong>quatre</strong> opérateurs :
            <code>"+"</code>, <code>"-"</code>, <code>"*"</code> et <code>"//"</code>, la
            division entière.</p>

            <pre class="bloc-code"><code>evaluer(["10", "3", "-"])        →  7
evaluer(["20", "4", "//"])       →  5
evaluer(["10", "2", "-", "3", "*"])  →  24</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre des opérandes</span>
              Tu viens de voir pourquoi il compte. Nomme tes deux variables
              <code>droite</code> et <code>gauche</code> plutôt que <code>a</code> et
              <code>b</code> : le code se relit alors tout seul.
            </div>`,
          nomFichier: "npi.py",
          depart: `# ---- La pile. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef evaluer(expression):\n    """Renvoie la valeur de l'expression en notation polonaise inverse.\n\n    Les operateurs sont "+", "-", "*" et "//".\n    Precondition : l'expression est bien formee.\n    """\n    pass\n`,
          validation: {
            tests: `assert evaluer(["7"]) == 7, "Un nombre seul."\nassert evaluer(["3", "4", "+"]) == 7, "3 + 4."\nassert evaluer(["10", "3", "-"]) == 7, "10 − 3, et surtout pas 3 − 10."\nassert evaluer(["3", "10", "-"]) == -7, "Dans l'autre sens, le résultat est négatif."\nassert evaluer(["20", "4", "//"]) == 5, "20 // 4."\nassert evaluer(["4", "20", "//"]) == 0, "4 // 20 vaut 0 : là encore l'ordre compte."\nassert evaluer(["3", "4", "*"]) == 12, "3 × 4."\nassert evaluer(["10", "2", "-", "3", "*"]) == 24, "(10 − 2) × 3."\nassert evaluer(["100", "10", "//", "3", "-"]) == 7, "100 // 10 − 3."\nassert evaluer(["5", "1", "2", "+", "4", "*", "+"]) == 17, "5 + (1 + 2) × 4."\nassert evaluer(["7", "2", "//", "1", "+"]) == 4, "7 // 2 + 1."\nassert evaluer(["1", "2", "+", "3", "4", "+", "*"]) == 21, "(1 + 2) × (3 + 4)."\nassert evaluer(["50", "10", "-", "8", "//"]) == 5, "(50 − 10) // 8."`,
          },
          felicitation: "Quatre opérateurs, et l'ordre des opérandes respecté. ➗",
          indices: [
            "Reprends la structure de l'étape 3 et ajoute deux cas à la cascade de <code>if</code>.",
            "Les quatre cas commencent tous de la même façon : deux dépilements. Tu peux donc les faire <strong>une fois</strong>, dès qu'on sait que le jeton est un opérateur.",
            "Un moyen commode de savoir si un jeton est un opérateur : tester s'il figure dans un tableau <code>[\"+\", \"-\", \"*\", \"//\"]</code>, avec l'opérateur <code>in</code>.",
          ],
          apres: `<span class="chapo">Factoriser ce qui est commun</span>
            Les deux dépilements sont identiques pour les quatre opérateurs : les sortir de la
            cascade évite de les répéter quatre fois. Le jour où l'on ajoutera la puissance ou
            le modulo, il n'y aura qu'une ligne à écrire.
            <br><br>
            C'est un réflexe qui dépasse largement cet exercice : <strong>quand plusieurs
            branches commencent pareil, le début se remonte au-dessus du test</strong>. Le
            code raccourcit, et surtout il devient impossible de se tromper dans une seule des
            quatre copies.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Voir la pile travailler",
          contenu: `
            <p>Écris <code>evaluer_trace(expression)</code> : elle fait exactement le même
            calcul, mais <strong>affiche l'état de la pile</strong> après chaque jeton, puis
            renvoie le résultat.</p>

            <p>Le format d'affichage : le jeton, puis la pile, séparés par
            <code>" -> "</code>.</p>

            <p>L'appel du bas, sur <code>3 4 + 2 *</code>, doit produire :</p>
            <pre class="bloc-code"><code>3 -> [3]
4 -> [3, 4]
+ -> [7]
2 -> [7, 2]
* -> [14]
résultat : 14</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Afficher une pile</span>
              L'implémentation range la pile dans un tableau Python, du fond vers le sommet :
              <code>print(jeton, "->", p)</code> suffit donc à produire exactement ces
              lignes.
            </div>`,
          nomFichier: "trace.py",
          depart: `# ---- La pile. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef evaluer_trace(expression):\n    """Evalue l'expression en affichant la pile apres chaque jeton.\n\n    Renvoie la valeur de l'expression.\n    """\n    pass\n\n\n# ---- L'essai. Ne modifie pas ces lignes. ----\nprint("résultat :", evaluer_trace(["3", "4", "+", "2", "*"]))\n`,
          validation: {
            codeContient: [
              { motif: "\\bprint\\s*\\(", message: "La fonction doit afficher l'état de la pile après chaque jeton." },
            ],
            sortie: "3 -> [3]\n4 -> [3, 4]\n+ -> [7]\n2 -> [7, 2]\n* -> [14]\nrésultat : 14",
            tests: `assert evaluer_trace(["7"]) == 7, "La fonction doit toujours renvoyer le résultat."\nassert evaluer_trace(["3", "4", "+"]) == 7, "..."\nassert evaluer_trace(["10", "3", "-"]) == 7, "L'ordre des opérandes doit être respecté."\nassert evaluer_trace(["5", "1", "2", "+", "4", "*", "+"]) == 17, "..."`,
          },
          felicitation: "Une calculatrice qui montre son travail. 👁️",
          indices: [
            "Pars de la fonction de l'étape précédente : une seule ligne est à ajouter.",
            "Cette ligne doit s'exécuter <strong>après</strong> le traitement de chaque jeton, quel qu'il soit — donc à la fin du corps de la boucle, au même niveau que le <code>if</code>.",
            "<code>print</code> accepte plusieurs valeurs séparées par des virgules : le jeton, la chaîne <code>\"-&gt;\"</code>, puis la pile.",
          ],
          apres: `<span class="chapo">La trace est l'outil de débogage des piles</span>
            Un algorithme à pile est difficile à suivre dans sa tête au-delà de trois ou
            quatre jetons. Afficher l'état après chaque étape transforme une séance
            d'interrogation en une lecture.
            <br><br>
            Prends l'habitude : dès qu'un programme à pile ne donne pas ce que tu attends,
            ajoute une ligne d'affichage dans la boucle, relance, et compare avec ce que tu
            aurais fait à la main. Tu verras immédiatement à quel jeton les deux divergent.
            <br><br>
            C'est aussi ce que fait un <em>débogueur</em>, en plus confortable : il montre
            l'état des variables après chaque instruction.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Détecter une expression fautive",
          contenu: `
            <p>Jusqu'ici, la précondition nous protégeait. Levons-la.</p>

            <p><code>est_valide(expression)</code> renvoie <code>True</code> si l'expression
            peut être évaluée, <code>False</code> sinon. Deux choses peuvent clocher :</p>

            <ul>
              <li>un opérateur se présente alors qu'il reste <strong>moins de deux
              valeurs</strong> dans la pile ;</li>
              <li>à la fin, la pile ne contient <strong>pas exactement une</strong> valeur.</li>
            </ul>

            <pre class="bloc-code"><code>["3", "4", "+"]        →  True
["3", "+"]             →  False   un seul opérande
["3", "4"]             →  False   il reste deux valeurs
[]                     →  False   il n'en reste aucune</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pas besoin de calculer</span>
              Seul le <em>nombre</em> de valeurs sur la pile importe, pas leur contenu. Un
              simple compteur suffit : un nombre le fait monter de 1, un opérateur le fait
              descendre de 1 — il en consomme deux et en rend une.
            </div>`,
          nomFichier: "valide.py",
          depart: `# ---- À toi. ----\n\ndef est_valide(expression):\n    """Renvoie True si l'expression en notation polonaise inverse est evaluable.\n\n    expression est un tableau de chaines : des nombres, "+", "-", "*" ou "//".\n    """\n    pass\n`,
          validation: {
            tests: `assert est_valide([]) == False, "Une expression vide ne donne aucun résultat."\nassert est_valide(["7"]) == True, "Un nombre seul est une expression valide."\nassert est_valide(["3", "4", "+"]) == True, "Deux opérandes, un opérateur."\nassert est_valide(["3", "+"]) == False, "Le + ne trouve qu'un seul opérande."\nassert est_valide(["+"]) == False, "Le + n'en trouve aucun."\nassert est_valide(["3", "4"]) == False, "Il reste deux valeurs à la fin."\nassert est_valide(["3", "4", "+", "2", "*"]) == True, "..."\nassert est_valide(["3", "4", "+", "*"]) == False, "Le second opérateur ne trouve qu'une valeur."\nassert est_valide(["5", "1", "2", "+", "4", "*", "+"]) == True, "..."\nassert est_valide(["1", "2", "+", "3", "4", "+", "*"]) == True, "..."\nassert est_valide(["1", "2", "3", "+"]) == False, "Il reste deux valeurs à la fin."\nassert est_valide(["+", "1", "2"]) == False, "L'opérateur arrive avant ses opérandes."\nassert est_valide(["10", "2", "//", "3", "-"]) == True, "..."\nassert est_valide(["2", "3", "*", "4", "5", "*"]) == False, "Deux résultats indépendants, jamais combinés."`,
          },
          felicitation: "Un vérificateur qui ne calcule rien et voit tout. ✅",
          indices: [
            "Un compteur à zéro avant la boucle, qui représente le nombre de valeurs qui seraient sur la pile.",
            "Un opérateur exige que le compteur vaille au moins 2 <em>avant</em> de l'appliquer ; si ce n'est pas le cas, la réponse est connue tout de suite.",
            "S'il vaut au moins 2, l'opérateur le fait descendre de 1. Un nombre le fait monter de 1. À la fin, il ne reste qu'à comparer le compteur à 1.",
          ],
          apres: `<span class="chapo">Quand un compteur suffit, et quand il ne suffit plus</span>
            Ici, le compteur remplace la pile parce que <strong>seul son nombre d'éléments
            compte</strong> : les valeurs ne jouent aucun rôle dans la validité.
            <br><br>
            Compare avec le vérificateur de parenthèses de la séance 3. Avec une seule sorte
            de parenthèse, un compteur suffisait aussi. Avec trois sortes, il fallait retenir
            <em>quoi</em> avait été ouvert, et la pile redevenait indispensable.
            <br><br>
            La question à se poser est donc toujours la même : <strong>ai-je besoin de savoir
            combien, ou de savoir quoi ?</strong> Si « combien » suffit, un entier fait
            l'affaire, et il coûte infiniment moins cher qu'une structure.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "La calculatrice qui lit du texte",
          contenu: `
            <p>Dernière touche : accepter une expression écrite comme une simple
            <strong>chaîne de caractères</strong>, avec des espaces entre les jetons.</p>

            <p><code>calculer(texte)</code> renvoie la valeur de l'expression, ou la chaîne
            <code>"expression invalide"</code> si elle ne peut pas être évaluée.</p>

            <pre class="bloc-code"><code>calculer("3 4 + 2 *")   →  14
calculer("10 3 -")      →  7
calculer("3 +")         →  "expression invalide"</code></pre>

            <p><code>evaluer</code> et <code>est_valide</code> te sont fournies.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Découper une chaîne</span>
              <code>texte.split()</code> renvoie le tableau des morceaux séparés par des
              espaces. <code>"3 4 +".split()</code> vaut <code>["3", "4", "+"]</code>, et
              <code>"".split()</code> vaut <code>[]</code>.
            </div>`,
          nomFichier: "calculer.py",
          depart: `# ---- Fournies. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef evaluer(expression):\n    """Precondition : l'expression est bien formee."""\n    p = pile_vide()\n    for jeton in expression:\n        if jeton in ["+", "-", "*", "//"]:\n            droite = depiler(p)\n            gauche = depiler(p)\n            if jeton == "+":\n                empiler(p, gauche + droite)\n            elif jeton == "-":\n                empiler(p, gauche - droite)\n            elif jeton == "*":\n                empiler(p, gauche * droite)\n            else:\n                empiler(p, gauche // droite)\n        else:\n            empiler(p, int(jeton))\n    return depiler(p)\n\ndef est_valide(expression):\n    en_attente = 0\n    for jeton in expression:\n        if jeton in ["+", "-", "*", "//"]:\n            if en_attente < 2:\n                return False\n            en_attente = en_attente - 1\n        else:\n            en_attente = en_attente + 1\n    return en_attente == 1\n\n\n# ---- À toi. ----\n\ndef calculer(texte):\n    """Renvoie la valeur de l'expression ecrite dans texte.\n\n    Les jetons y sont separes par des espaces.\n    Renvoie la chaine "expression invalide" si elle ne peut pas etre evaluee.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.split\\s*\\(", message: "Découpe le texte en jetons avec split()." },
              { motif: "\\best_valide\\s*\\(", message: "Vérifie l'expression avant de l'évaluer : evaluer() a une précondition." },
              { motif: "\\bevaluer\\s*\\([\\s\\S]*\\bevaluer\\s*\\(", message: "Le calcul lui-même doit être confié à evaluer()." },
            ],
            tests: `assert calculer("3 4 + 2 *") == 14, "(3 + 4) × 2."\nassert calculer("10 3 -") == 7, "L'ordre des opérandes doit être respecté."\nassert calculer("7") == 7, "Un nombre seul."\nassert calculer("20 4 //") == 5, "..."\nassert calculer("5 1 2 + 4 * +") == 17, "..."\nassert calculer("3 +") == "expression invalide", "Un opérateur sans assez d'opérandes."\nassert calculer("3 4") == "expression invalide", "Deux valeurs restantes."\nassert calculer("") == "expression invalide", "Une chaîne vide n'est pas une expression."\nassert calculer("+") == "expression invalide", "..."\nassert calculer("1 2 3 +") == "expression invalide", "..."\nassert calculer("2 3 * 4 5 * +") == 26, "2 × 3 + 4 × 5."`,
          },
          felicitation: "Une calculatrice complète, du texte au résultat. 🖩",
          indices: [
            "Trois temps : découper le texte, vérifier, évaluer.",
            "Le découpage se fait avec <code>split()</code>, et donne le tableau de jetons attendu par les deux fonctions fournies.",
            "Si <code>est_valide</code> répond <code>False</code>, la fonction renvoie la chaîne annoncée et s'arrête là. Sinon, elle renvoie ce que donne <code>evaluer</code>.",
          ],
          apres: `<span class="chapo">Trois fonctions, trois responsabilités</span>
            <code>split</code> découpe, <code>est_valide</code> contrôle,
            <code>evaluer</code> calcule. Chacune fait une chose, et <code>calculer</code> les
            assemble en trois lignes.
            <br><br>
            Remarque surtout le rôle de <code>est_valide</code> : elle est là pour
            <strong>garantir la précondition</strong> de <code>evaluer</code>. C'est la
            réponse à une question posée dès la séance 1 — « si la précondition n'est pas
            vérifiée par la fonction, qui la vérifie ? ». La réponse est : l'appelant, et
            souvent une fonction dédiée, juste avant l'appel.
            <br><br>
            C'est exactement l'architecture d'un vrai interprète : un <em>analyseur lexical</em>
            qui découpe, un <em>analyseur syntaxique</em> qui vérifie, et un
            <em>évaluateur</em> qui exécute.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="encadre">
              <span class="chapo">Évaluer en notation polonaise inverse</span>
              <pre class="bloc-code"><code>pour chaque jeton :
    si c'est un opérateur :
        droite = depiler(p)     # le dernier écrit
        gauche = depiler(p)
        empiler(p, gauche OP droite)
    sinon :
        empiler(p, int(jeton))
renvoyer depiler(p)</code></pre>
              L'ordre des deux dépilements est la faute la plus fréquente, et elle ne se voit
              que sur <code>-</code> et <code>//</code>.
            </div>

            <div class="encadre">
              <span class="chapo">Les trois usages de pile déjà rencontrés</span>
              <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Problème</th><th>Ce qu'on empile</th></tr>
                <tr><td>Parenthésage (séance 3)</td><td>les ouvrantes en attente</td></tr>
                <tr><td>Annuler une action (séance 3)</td><td>les états successifs</td></tr>
                <tr><td>Notation polonaise inverse</td><td>les valeurs en attente d'opérateur</td></tr>
              </table>
              </div>
              Le point commun : <strong>quelque chose attend, et c'est le plus récent qui sera
              traité en premier</strong>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Inverser les opérandes.</strong> Le premier dépilement est celui
                de droite.</li>
                <li><strong>Oublier <code>int(jeton)</code>.</strong>
                <code>"3" + "4"</code> vaut <code>"34"</code>, sans la moindre erreur.</li>
                <li><strong>Dépiler sans vérifier.</strong> Une expression fautive vide la
                pile, et <code>depiler</code> lève une erreur incompréhensible.</li>
                <li><strong>Renvoyer la pile au lieu de son contenu.</strong> Le résultat est
                la valeur qui reste, obtenue par un dernier dépilement.</li>
              </ul>
            </div>`,
          libelleBouton: "Passer aux exercices →",
        },
      ],
    },

    /* ============================= APPLICATION ============================= */
    {
      id: "application",
      titre: "Application",
      minutes: 45,
      etoiles: 2,
      intention: "l'exercice du baccalauréat, et une vraie simulation",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Trouver le plus grand, et à quelle profondeur",
          contenu: `
            <p>On attaque l'exercice du <strong>sujet zéro</strong> de l'épreuve écrite. Il se
            construit en trois fonctions ; en voici la deuxième.</p>

            <p><code>max_pile(p, i)</code> considère les <code>i</code> éléments du
            <strong>sommet</strong> de la pile, et renvoie la <strong>profondeur</strong> du
            plus grand — <code>1</code> s'il est déjà au sommet, <code>i</code> s'il est le
            plus profond des <code>i</code>. La pile doit être <strong>intacte</strong> après
            l'appel.</p>

            <pre class="bloc-code"><code>p, du fond vers le sommet :  [3, 9, 1, 5]

max_pile(p, 2)  →  1     parmi 1 et 5, le plus grand est 5, au sommet
max_pile(p, 4)  →  3     parmi tous, le plus grand est 9, à 3 crans du sommet</code></pre>

            <div class="encadre">
              <span class="chapo">Préconditions</span>
              <code>1 &lt;= i &lt;= hauteur(p)</code>. En cas d'égalité entre plusieurs
              maximums, on renvoie la profondeur du <strong>moins profond</strong> — celui
              qu'on rencontre en premier en dépilant.
            </div>`,
          nomFichier: "max_pile.py",
          depart: `# ---- La pile, et hauteur(). N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef hauteur(p):\n    """Renvoie le nombre d'elements de p, sans la modifier."""\n    reserve = pile_vide()\n    n = 0\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n        n = n + 1\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return n\n\n\n# ---- À toi. ----\n\ndef max_pile(p, i):\n    """Renvoie la profondeur du plus grand des i elements du sommet de p.\n\n    Vaut 1 si ce maximum est deja au sommet.\n    Precondition : 1 <= i <= hauteur(p).\n    Effet : p est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
              { motif: "\\bmax\\s*\\(", message: "max() ne connaît pas nos piles : compare en dépilant." },
            ],
            tests: `p = pile_vide()\nfor v in [3, 9, 1, 5]:\n    empiler(p, v)\nassert max_pile(p, 1) == 1, "Un seul élément considéré : il est au sommet."\nassert max_pile(p, 2) == 1, "Entre 1 et 5, le plus grand est 5, déjà au sommet."\nassert max_pile(p, 3) == 3, "Les trois du sommet sont 5, 1 et 9 : le maximum est 9, à 3 crans du sommet."\nassert max_pile(p, 4) == 3, "Sur toute la pile, le maximum est 9, à 3 crans du sommet."\nassert hauteur(p) == 4, "La pile doit être intacte après tous ces appels."\nassert depiler(p) == 5, "Et dans le bon ordre."\nassert depiler(p) == 1, "..."\nassert depiler(p) == 9, "..."\nassert depiler(p) == 3, "..."\nq = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(q, v)\nassert max_pile(q, 3) == 1, "Le maximum est au sommet."\nr = pile_vide()\nfor v in [3, 2, 1]:\n    empiler(r, v)\nassert max_pile(r, 3) == 3, "Le maximum est au fond."\ns = pile_vide()\nfor v in [5, 5, 5]:\n    empiler(s, v)\nassert max_pile(s, 3) == 1, "Tous égaux : on renvoie la profondeur du moins profond."\nt = pile_vide()\nfor v in [-8, -3, -20]:\n    empiler(t, v)\nassert max_pile(t, 3) == 2, "Sur des négatifs, le maximum est -3, à 2 crans du sommet."`,
          },
          felicitation: "La deuxième brique du sujet zéro est posée. 🔎",
          indices: [
            "C'est le double transfert de la séance 3, mais limité aux <code>i</code> éléments du sommet : une boucle <code>for</code> de <code>i</code> tours, pas un <code>while</code>.",
            "Compte la profondeur au fur et à mesure — 1 pour le premier dépilé, 2 pour le suivant — et retiens celle du meilleur élément vu.",
            "Attention à la comparaison : pour que le <strong>moins profond</strong> gagne en cas d'égalité, il faut ne remplacer le meilleur que si l'on trouve <strong>strictement</strong> mieux. N'oublie pas de tout remettre en place ensuite.",
          ],
          apres: `<span class="chapo">Pourquoi la <em>profondeur</em>, et pas la valeur</span>
            La fonction pourrait renvoyer le plus grand élément. Elle renvoie sa
            <strong>position</strong>, parce que c'est cela qui servira : l'étape suivante a
            besoin de savoir <em>combien d'éléments retourner</em> pour l'amener au sommet.
            <br><br>
            C'est un principe de conception qui revient souvent : une fonction doit renvoyer
            ce dont son appelant a besoin, pas ce qui semble le plus naturel. Ici, la
            profondeur est directement l'argument à passer à <code>retourner</code>.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le tri crêpes",
          contenu: `
            <p>La question finale du sujet zéro, et un vrai problème d'algorithmique.</p>

            <p>Imagine une pile de crêpes de tailles différentes. Le seul geste autorisé :
            glisser une spatule à un endroit et <strong>retourner tout le bloc du
            dessus</strong>. Comment les trier, la plus grande en bas ?</p>

            <pre class="bloc-code"><code>       ▁▁▁▁▁                ▁▁▁▁▁▁▁▁▁
      ▁▁▁▁▁▁▁▁▁    ───▶      ▁▁▁▁▁▁▁
       ▁▁▁▁▁▁▁                ▁▁▁▁▁
       en désordre            triées</code></pre>

            <p><code>tri_crepes(p)</code> trie la pile : le plus grand élément au
            <strong>fond</strong>, le plus petit au sommet. Elle ne renvoie rien.</p>

            <p><code>hauteur</code>, <code>max_pile</code> et <code>retourner</code> te sont
            fournies. <code>retourner(p, k)</code> inverse l'ordre des <code>k</code> éléments
            du sommet.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La stratégie, en deux retournements par tour</span>
              Au tour où il reste <code>i</code> éléments à placer :
              <ol>
                <li>trouver la profondeur du plus grand des <code>i</code> du sommet, et
                retourner ce bloc — le maximum arrive <strong>au sommet</strong> ;</li>
                <li>retourner les <code>i</code> du sommet — le maximum part
                <strong>au fond</strong> du bloc, à sa place définitive.</li>
              </ol>
              On recommence avec <code>i - 1</code>, et ainsi de suite jusqu'à ce qu'il ne
              reste qu'un élément.
            </div>`,
          nomFichier: "crepes.py",
          depart: `# ---- Fournies : la pile, hauteur, max_pile, retourner. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef hauteur(p):\n    reserve = pile_vide()\n    n = 0\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n        n = n + 1\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return n\n\ndef max_pile(p, i):\n    """Profondeur du plus grand des i elements du sommet. 1 s'il y est deja."""\n    reserve = pile_vide()\n    plus_grand = depiler(p)\n    empiler(reserve, plus_grand)\n    profondeur = 1\n    for k in range(2, i + 1):\n        x = depiler(p)\n        empiler(reserve, x)\n        if x > plus_grand:\n            plus_grand = x\n            profondeur = k\n    for k in range(i):\n        empiler(p, depiler(reserve))\n    return profondeur\n\ndef retourner(p, k):\n    """Inverse l'ordre des k elements du sommet de p."""\n    a = pile_vide()\n    b = pile_vide()\n    for _ in range(k):\n        empiler(a, depiler(p))\n    for _ in range(k):\n        empiler(b, depiler(a))\n    for _ in range(k):\n        empiler(p, depiler(b))\n\n\n# ---- À toi. ----\n\ndef tri_crepes(p):\n    """Trie la pile p : le plus grand au fond, le plus petit au sommet.\n\n    Effet : p est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bmax_pile\\s*\\(", message: "Sers-toi de max_pile pour localiser le maximum." },
              { motif: "\\bretourner\\s*\\([\\s\\S]*\\bretourner\\s*\\(", message: "Chaque tour demande deux retournements." },
            ],
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
              { motif: "\\bsorted\\s*\\(", message: "Le seul geste autorisé est le retournement." },
            ],
            tests: `def _tab(p):\n    r = pile_vide()\n    while not est_vide(p):\n        empiler(r, depiler(p))\n    t = []\n    while not est_vide(r):\n        x = depiler(r)\n        t.append(x)\n        empiler(p, x)\n    return t\np = pile_vide()\nfor v in [3, 1, 2]:\n    empiler(p, v)\ntri_crepes(p)\nassert _tab(p) == [3, 2, 1], "Du fond vers le sommet : le plus grand en bas, le plus petit en haut."\nq = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(q, v)\ntri_crepes(q)\nassert _tab(q) == [3, 2, 1], "Une pile déjà à l'envers doit être remise dans l'ordre."\nr = pile_vide()\nfor v in [3, 2, 1]:\n    empiler(r, v)\ntri_crepes(r)\nassert _tab(r) == [3, 2, 1], "Une pile déjà triée doit le rester."\ns = pile_vide()\nempiler(s, 7)\ntri_crepes(s)\nassert _tab(s) == [7], "Un seul élément."\nt = pile_vide()\nfor v in [5, 1, 4, 2, 8, 3]:\n    empiler(t, v)\ntri_crepes(t)\nassert _tab(t) == [8, 5, 4, 3, 2, 1], "Sur six éléments."\nu = pile_vide()\nfor v in [2, 2, 1, 3, 1]:\n    empiler(u, v)\ntri_crepes(u)\nassert _tab(u) == [3, 2, 2, 1, 1], "Les doublons doivent être conservés, et bien placés."\nv = pile_vide()\nfor k in [9, 4, 7, 1, 8, 2, 6, 3, 5]:\n    empiler(v, k)\ntri_crepes(v)\nassert _tab(v) == [9, 8, 7, 6, 5, 4, 3, 2, 1], "Sur neuf éléments."`,
          },
          felicitation: "Le tri crêpes, tombé au baccalauréat, et tu l'as écrit. 🥞",
          indices: [
            "Commence par relever la hauteur de la pile : c'est le nombre d'éléments à placer.",
            "Une boucle <code>for</code> qui fait <strong>décroître</strong> <code>i</code> depuis la hauteur jusqu'à 2 — inutile de traiter le dernier élément, il est forcément à sa place.",
            "À chaque tour, deux appels à <code>retourner</code> : le premier avec ce que rend <code>max_pile(p, i)</code>, le second avec <code>i</code>.",
          ],
          apres: `<span class="chapo">Quatre lignes, parce que trois fonctions ont été écrites avant</span>
            C'est la leçon de méthode de tout le sujet zéro : l'énoncé fait construire
            <code>hauteur_pile</code>, puis <code>max_pile</code>, puis
            <code>retourner</code>, et la question finale devient presque triviale.
            <br><br>
            En devoir, quand un exercice enchaîne plusieurs fonctions, ce n'est jamais un
            hasard : chacune est un outil pour la suivante. Les traiter dans l'ordre, et
            <strong>réutiliser celles d'avant</strong> au lieu de tout réécrire, fait gagner
            autant de points que de temps.
            <br><br>
            Ce tri n'a rien d'anecdotique. Le problème des crêpes a occupé des chercheurs
            pendant trente ans — le nombre minimal de retournements nécessaires pour trier
            <em>n</em> crêpes n'est toujours pas connu en général. Le premier article publié
            dessus par <strong>Bill Gates</strong>, en 1979, est resté la meilleure borne
            connue pendant près de trente ans.`,
        },

        {
          id: "a3",
          type: "qcm",
          titre: "Pourquoi le tri crêpes fonctionne",
          contenu: `
            <p>Un algorithme ne se justifie pas en le déroulant sur un exemple. Il se justifie
            par un <strong>invariant</strong> : une propriété vraie à chaque tour de boucle, et
            qui suffit à garantir le résultat à la fin.</p>
            <pre class="bloc-code"><code>n = hauteur(p)
pour i de n jusqu'à 2 :
    retourner(p, max_pile(p, i))   # le max des i du sommet arrive au sommet
    retourner(p, i)                # il part au fond du bloc de i</code></pre>`,
          question: "Quel est l'invariant de cette boucle ?",
          options: [
            { texte: "Après le tour n° <em>i</em>, les <code>n - i + 1</code> éléments du fond sont les plus grands, à leur place définitive.", correct: true,
              explication: "Oui. Chaque tour prend le plus grand des <em>i</em> éléments encore en désordre — ceux du sommet — et l'envoie juste au-dessus de ceux déjà placés. Les éléments du fond ne sont plus jamais touchés, puisque les retournements suivants portent sur <em>i − 1</em> éléments ou moins." },
            { texte: "Après chaque tour, la pile est un peu plus triée que la précédente.",
              explication: "C'est vrai mais trop vague pour démontrer quoi que ce soit. Un invariant doit être une propriété <em>précise</em>, qu'on puisse vérifier — et dont on puisse déduire le résultat final." },
            { texte: "À chaque tour, le sommet de la pile contient le plus petit élément.",
              explication: "Rien ne le garantit. Ce qui est certain concerne le <em>fond</em> : c'est là que les éléments se placent définitivement, du plus grand vers le plus petit." },
            { texte: "Le nombre de retournements diminue à chaque tour.",
              explication: "Il y a exactement deux retournements par tour, du début à la fin. Ce qui diminue, c'est la <em>taille</em> des blocs retournés." },
          ],
          apres: `<span class="chapo">Un invariant, et la boucle s'explique toute seule</span>
            Une fois l'invariant énoncé, la démonstration tient en deux phrases :
            <ul>
              <li>il est vrai <strong>au départ</strong> — aucun élément n'est encore placé,
              et la propriété ne dit rien ;</li>
              <li>s'il est vrai au début d'un tour, il l'est encore à la fin — le tour place
              correctement un élément de plus ;</li>
              <li>donc à la sortie, quand <em>i</em> vaut 1, les <em>n</em> − 1 éléments du
              fond sont placés… et le dernier l'est forcément aussi.</li>
            </ul>
            C'est exactement ce qu'on attend d'une justification à l'écrit du baccalauréat.
            Dérouler l'algorithme sur un exemple <em>illustre</em> ; seul l'invariant
            <strong>démontre</strong>.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : un tri qui n'en est pas un",
          contenu: `
            <p>Cette version du tri crêpes contient <strong>trois erreurs de natures
            différentes</strong> :</p>
            <ul>
              <li>une qui plante sur une pile d'un seul élément ;</li>
              <li>une qui ne trie que les deux derniers éléments ;</li>
              <li>une qui inverse l'effet des deux retournements.</li>
            </ul>
            <p>Les trois fonctions fournies sont justes : seul <code>tri_crepes</code> est à
            réparer.</p>`,
          nomFichier: "crepes_cassees.py",
          depart: `# ---- Fournies et justes. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef hauteur(p):\n    reserve = pile_vide()\n    n = 0\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n        n = n + 1\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return n\n\ndef max_pile(p, i):\n    reserve = pile_vide()\n    plus_grand = depiler(p)\n    empiler(reserve, plus_grand)\n    profondeur = 1\n    for k in range(2, i + 1):\n        x = depiler(p)\n        empiler(reserve, x)\n        if x > plus_grand:\n            plus_grand = x\n            profondeur = k\n    for k in range(i):\n        empiler(p, depiler(reserve))\n    return profondeur\n\ndef retourner(p, k):\n    a = pile_vide()\n    b = pile_vide()\n    for _ in range(k):\n        empiler(a, depiler(p))\n    for _ in range(k):\n        empiler(b, depiler(a))\n    for _ in range(k):\n        empiler(p, depiler(b))\n\n\n# ---- À réparer. ----\n\ndef tri_crepes(p):\n    """Trie la pile p : le plus grand au fond, le plus petit au sommet."""\n    n = hauteur(p)\n    for i in range(2, n):\n        retourner(p, i)\n        retourner(p, max_pile(p, i))\n`,
          validation: {
            tests: `def _tab(p):\n    r = pile_vide()\n    while not est_vide(p):\n        empiler(r, depiler(p))\n    t = []\n    while not est_vide(r):\n        x = depiler(r)\n        t.append(x)\n        empiler(p, x)\n    return t\ns = pile_vide()\nempiler(s, 7)\ntri_crepes(s)\nassert _tab(s) == [7], "Sur un seul élément, la fonction doit se terminer sans erreur."\nvide = pile_vide()\ntri_crepes(vide)\nassert _tab(vide) == [], "Sur une pile vide non plus."\np = pile_vide()\nfor v in [3, 1, 2]:\n    empiler(p, v)\ntri_crepes(p)\nassert _tab(p) == [3, 2, 1], "Du fond vers le sommet : le plus grand en bas."\nq = pile_vide()\nfor v in [5, 1, 4, 2, 8, 3]:\n    empiler(q, v)\ntri_crepes(q)\nassert _tab(q) == [8, 5, 4, 3, 2, 1], "Sur six éléments, TOUS doivent être triés."\nr = pile_vide()\nfor v in [1, 2, 3, 4]:\n    empiler(r, v)\ntri_crepes(r)\nassert _tab(r) == [4, 3, 2, 1], "Une pile à l'envers doit être entièrement remise dans l'ordre."\nt = pile_vide()\nfor v in [9, 4, 7, 1, 8, 2, 6, 3, 5]:\n    empiler(t, v)\ntri_crepes(t)\nassert _tab(t) == [9, 8, 7, 6, 5, 4, 3, 2, 1], "Sur neuf éléments."`,
          },
          felicitation: "Trois bugs, et celui de la boucle est le plus instructif. 🐛",
          indices: [
            "Exécute d'abord : sur une pile d'un seul élément, <code>range(2, 1)</code> ne tourne pas — mais que se passe-t-il sur une pile vide, et que vaut alors <code>hauteur</code> ?",
            "Regarde les bornes de la boucle. Dans quel sens <code>i</code> doit-il varier, et quelles valeurs doit-il prendre pour que <strong>tous</strong> les éléments soient placés ?",
            "Regarde enfin l'ordre des deux <code>retourner</code> : lequel amène le maximum au sommet, et lequel l'envoie au fond ? Peuvent-ils être échangés ?",
          ],
          apres: `<span class="chapo">Le bug de la boucle, et pourquoi il est si courant</span>
            <code>range(2, n)</code> au lieu de <code>range(n, 1, -1)</code> : la boucle
            tourne le bon nombre de fois, ou presque, mais dans le mauvais sens.
            <br><br>
            Le tri ne peut pas fonctionner dans ce sens-là. Placer d'abord le maximum des
            <em>deux</em> éléments du sommet, puis des trois, puis des quatre, défait
            systématiquement ce qui vient d'être fait : les retournements suivants, plus
            larges, emportent les éléments déjà placés.
            <br><br>
            C'est précisément ce que l'invariant de l'étape précédente permet de voir sans
            rien exécuter : il exige que les éléments placés soient <strong>au fond</strong>,
            donc hors d'atteinte des retournements suivants, donc que ceux-ci soient de plus
            en plus <em>petits</em>. Un invariant bien choisi ne sert pas qu'à démontrer : il
            sert aussi à trouver les bugs.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Une vraie file d'attente",
          contenu: `
            <p>Changement de sujet : une simulation. Un guichet unique reçoit des clients, et
            l'on veut mesurer <strong>combien de temps ils attendent</strong>.</p>

            <p>On se donne un tableau de couples <code>[arrivee, duree]</code> : l'instant où
            le client arrive, et le temps que prend son service. Les clients sont donnés
            <strong>par ordre d'arrivée croissant</strong>.</p>

            <p><code>attentes(clients)</code> renvoie le tableau des temps d'attente, dans le
            même ordre.</p>

            <div class="encadre">
              <span class="chapo">La règle</span>
              Le guichet sert un client à la fois, dans l'ordre d'arrivée. Un client est
              servi dès que le guichet se libère — ou dès son arrivée, si le guichet
              l'attendait déjà. Son <strong>attente</strong> est le temps écoulé entre son
              arrivée et le début de son service.
            </div>

            <pre class="bloc-code"><code>clients          [[0, 5], [1, 3], [2, 4]]

client 0  arrive à 0, servi de 0 à 5     attente 0
client 1  arrive à 1, servi de 5 à 8     attente 4
client 2  arrive à 2, servi de 8 à 12    attente 6

attentes  →  [0, 4, 6]</code></pre>`,
          nomFichier: "guichet.py",
          depart: `# ---- À toi. ----\n\ndef attentes(clients):\n    """Renvoie le tableau des temps d'attente, dans l'ordre d'arrivee.\n\n    clients est un tableau de couples [arrivee, duree], tries par arrivee.\n    """\n    pass\n`,
          validation: {
            tests: `assert attentes([]) == [], "Aucun client."\nassert attentes([[0, 5]]) == [0], "Le premier client n'attend jamais."\nassert attentes([[3, 5]]) == [0], "Même s'il arrive tard."\nassert attentes([[0, 5], [1, 3], [2, 4]]) == [0, 4, 6], "Le guichet prend du retard."\nassert attentes([[0, 2], [5, 2], [10, 2]]) == [0, 0, 0], "Si les clients s'espacent, personne n'attend."\nassert attentes([[0, 10], [1, 1], [2, 1]]) == [0, 9, 9], "Un client très long fait attendre les suivants."\nassert attentes([[0, 1], [0, 1], [0, 1]]) == [0, 1, 2], "Trois clients à l'instant 0 : ils se suivent."\nassert attentes([[0, 3], [10, 3], [11, 3]]) == [0, 0, 2], "Le guichet se vide entre les deux vagues."\nc = [[0, 2], [1, 2]]\nattentes(c)\nassert c == [[0, 2], [1, 2]], "Le tableau reçu ne doit pas être modifié."\nlong = []\nfor i in range(50):\n    long.append([i, 2])\nr = attentes(long)\nassert r[0] == 0, "Le premier n'attend pas."\nassert r[49] == 49, "Chaque client prend une unité de retard sur le précédent."`,
          },
          felicitation: "Une file d'attente simulée, et des chiffres pour en parler. ⏱️",
          indices: [
            "Une seule variable suffit à décrire l'état du guichet : l'instant où il se libère. Elle vaut 0 au départ.",
            "Pour chaque client, le service commence au plus tard entre son arrivée et la libération du guichet — c'est un maximum entre deux nombres.",
            "Son attente est la différence entre ce début de service et son arrivée. Et n'oublie pas de faire avancer l'instant de libération du guichet.",
          ],
          apres: `<span class="chapo">Où est passée la file ?</span>
            Nulle part — et c'est instructif. Comme les clients sont donnés
            <strong>déjà triés par arrivée</strong> et servis dans cet ordre, le tableau
            <em>est</em> la file : le parcourir de gauche à droite, c'est défiler.
            <br><br>
            Une structure explicite deviendrait nécessaire dès que l'ordre de service cesse
            d'être l'ordre du tableau : plusieurs guichets, des priorités, des clients qui
            renoncent. C'est l'exercice suivant.
            <br><br>
            Retiens la leçon générale : <strong>une structure ne s'impose que lorsque l'ordre
            de traitement diffère de l'ordre des données</strong>. Sortir une file quand un
            simple parcours suffit n'est pas une rigueur, c'est une complication.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Deux guichets",
          contenu: `
            <p>Ouvrons un second guichet. Chaque client va au guichet qui se libère
            <strong>le plus tôt</strong> ; en cas d'égalité, au guichet A.</p>

            <p><code>attentes_deux(clients)</code> renvoie, comme avant, le tableau des temps
            d'attente dans l'ordre d'arrivée.</p>

            <pre class="bloc-code"><code>clients          [[0, 5], [1, 3], [2, 4]]

client 0  →  guichet A, servi de 0 à 5     attente 0
client 1  →  guichet B, servi de 1 à 4     attente 0
client 2  →  guichet B (libre à 4), 4 à 8  attente 2

attentes_deux  →  [0, 0, 2]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux variables au lieu d'une</span>
              L'état du système, ce sont maintenant <strong>deux</strong> instants de
              libération. Pour chaque client, il faut choisir le plus petit des deux, puis
              mettre à jour celui-là seulement.
            </div>`,
          nomFichier: "deux_guichets.py",
          depart: `# ---- À toi. ----\n\ndef attentes_deux(clients):\n    """Renvoie le tableau des temps d'attente avec deux guichets.\n\n    Chaque client va au guichet qui se libere le plus tot.\n    En cas d'egalite, au guichet A.\n    clients est un tableau de couples [arrivee, duree], tries par arrivee.\n    """\n    pass\n`,
          validation: {
            tests: `assert attentes_deux([]) == [], "Aucun client."\nassert attentes_deux([[0, 5]]) == [0], "Un seul client."\nassert attentes_deux([[0, 5], [1, 3], [2, 4]]) == [0, 0, 2], "Le second guichet absorbe le deuxième client."\nassert attentes_deux([[0, 2], [0, 2]]) == [0, 0], "Deux clients à l'instant 0 : un par guichet, personne n'attend."\nassert attentes_deux([[0, 2], [0, 2], [0, 2]]) == [0, 0, 2], "Le troisième doit attendre qu'un guichet se libère."\nassert attentes_deux([[0, 10], [0, 1], [1, 1], [2, 1]]) == [0, 0, 0, 0], "Pendant que le guichet A traite le client long, le guichet B enchaîne les courts sans faire attendre personne."\nassert attentes_deux([[0, 1], [5, 1], [10, 1]]) == [0, 0, 0], "Des clients bien espacés n'attendent jamais."\nun = attentes([[0, 5], [1, 3], [2, 4]]) if "attentes" in dir() else None\nassert attentes_deux([[0, 3], [1, 3], [2, 3], [3, 3]]) == [0, 0, 1, 1], "Les clients alternent entre les deux guichets."\nc = [[0, 2], [1, 2]]\nattentes_deux(c)\nassert c == [[0, 2], [1, 2]], "Le tableau reçu ne doit pas être modifié."`,
          },
          felicitation: "Deux guichets, et l'attente s'effondre. 🎫",
          indices: [
            "Deux variables à zéro avant la boucle : l'instant de libération de chaque guichet.",
            "Pour chaque client, compare les deux : on choisit celui qui se libère le plus tôt, et le guichet A l'emporte en cas d'égalité.",
            "Le reste est identique à l'exercice précédent — début de service, attente, mise à jour — mais la mise à jour ne concerne que le guichet choisi.",
          ],
          apres: `<span class="chapo">Comparer les deux simulations</span>
            Sur <code>[[0, 5], [1, 3], [2, 4]]</code> :
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Un guichet</th><th>Deux guichets</th></tr>
              <tr><td>Attentes</td><td>0, 4, 6</td><td>0, 0, 2</td></tr>
              <tr><td>Attente totale</td><td>10</td><td>2</td></tr>
            </table>
            </div>
            Doubler les guichets n'a pas divisé l'attente par deux : il l'a divisée par cinq.
            C'est un résultat classique des files d'attente, et il est contre-intuitif — les
            temps d'attente ne varient pas proportionnellement aux moyens, parce que chaque
            retard se répercute sur tous les clients suivants.
            <br><br>
            C'est pour cette raison que ce type de simulation est utilisé partout : dans les
            hôpitaux, les péages, les centres d'appel et le dimensionnement des serveurs. On
            ne peut pas deviner de tête, il faut mesurer. Tu viens d'écrire l'outil.`,
        },

        {
          id: "a7",
          type: "qcm",
          titre: "Lire une simulation",
          contenu: `
            <p>On fait tourner la simulation à un guichet sur une journée entière, et l'on
            obtient les attentes suivantes, exprimées en minutes.</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Client</th><th>1</th><th>10</th><th>50</th><th>100</th><th>200</th></tr>
              <tr><td>Attente</td><td>0</td><td>4</td><td>48</td><td>101</td><td>203</td></tr>
            </table>
            </div>
            <p>Les clients arrivent régulièrement, un peu plus vite que le guichet ne peut les
            servir.</p>`,
          question: "Que dit cette simulation ?",
          options: [
            { texte: "L'attente grandit sans limite : le guichet ne rattrapera jamais son retard.", correct: true,
              explication: "Oui. Chaque client ajoute un peu de retard qui se transmet à tous les suivants, et rien ne l'efface. L'attente croît à peu près proportionnellement au rang du client — c'est le signe d'un système <em>saturé</em>." },
            { texte: "L'attente se stabilisera autour de 200 minutes.",
              explication: "Rien dans les chiffres ne l'indique : entre le 100<sup>e</sup> et le 200<sup>e</sup> client, l'attente double encore. Elle ne se stabilise que si le guichet sert au moins aussi vite que les clients arrivent." },
            { texte: "Il suffit d'accélérer le service de 1 % pour ramener l'attente à zéro.",
              explication: "Un guichet à peine plus rapide que les arrivées reste au bord de la saturation : la moindre irrégularité recrée une file. Il faut une marge, pas une égalité." },
            { texte: "Les chiffres sont faux : une attente ne peut pas dépasser la durée d'un service.",
              explication: "Elle le peut tout à fait : l'attente d'un client est la somme de tous les retards accumulés avant lui, pas la durée d'un seul service." },
          ],
          apres: `<span class="chapo">La leçon des files d'attente</span>
            Tant que le débit de service dépasse le débit d'arrivée, la file reste courte et
            l'attente bornée. Dès que le rapport s'inverse, <strong>même très
            légèrement</strong>, l'attente croît sans limite : la file ne se résorbe jamais.
            <br><br>
            Il n'y a pas d'intermédiaire confortable, et c'est ce qui rend le dimensionnement
            si délicat. Un serveur web qui traite 1 000 requêtes par seconde et en reçoit
            1 001 ne sera pas « un peu lent » : il s'effondrera au bout de quelques heures.
            <br><br>
            C'est aussi pourquoi ces systèmes prévoient presque toujours une porte de sortie :
            au-delà d'une certaine longueur de file, on refuse les nouveaux arrivants plutôt
            que de les faire attendre indéfiniment. Une file bornée, comme celle de la
            séance 5 — et la précondition <code>est_pleine</code> prend soudain tout son
            sens.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "traverser un labyrinthe, deux fois, de deux façons",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le labyrinthe, en profondeur",
          contenu: `
            <p>Dernier grand exercice du chapitre, et il annonce le chapitre des graphes.</p>

            <p>Un labyrinthe est un tableau de chaînes : <code>"#"</code> est un mur,
            <code>"."</code> un passage, <code>"D"</code> le départ et <code>"A"</code>
            l'arrivée.</p>

            <pre class="bloc-code"><code>"#######"
"#D..#.#"
"#.#.#.#"
"#.#...#"
"#....A#"
"#######"</code></pre>

            <p><code>accessible(laby)</code> renvoie <code>True</code> si l'on peut aller du
            départ à l'arrivée en se déplaçant d'une case à la fois, horizontalement ou
            verticalement, sans traverser de mur.</p>

            <p><code>trouver</code> et <code>voisins</code> te sont fournies : la première
            localise une marque, la seconde donne les cases praticables voisines.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'algorithme, et il tient en six lignes</span>
              Une <strong>pile</strong> des cases à explorer, et un <strong>dictionnaire</strong>
              des cases déjà vues.
              <ol>
                <li>empiler le départ, et le marquer comme vu ;</li>
                <li>tant que la pile n'est pas vide : dépiler une case ; si c'est l'arrivée,
                c'est gagné ;</li>
                <li>sinon, empiler chacun de ses voisins pas encore vus, en les marquant.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le dictionnaire n'est pas facultatif</span>
              Sans lui, l'exploration reviendrait indéfiniment sur ses pas et la boucle ne se
              terminerait jamais. Une case est une liste de deux nombres ; pour en faire une
              clé, il faut un <strong>p-uplet</strong> : <code>(case[0], case[1])</code>.
            </div>`,
          nomFichier: "profondeur.py",
          depart: `# ---- La pile, et deux aides. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef trouver(laby, marque):\n    """Renvoie [ligne, colonne] de la case portant marque."""\n    for i in range(len(laby)):\n        for j in range(len(laby[i])):\n            if laby[i][j] == marque:\n                return [i, j]\n    return None\n\ndef voisins(laby, case):\n    """Renvoie le tableau des cases praticables voisines de case."""\n    i = case[0]\n    j = case[1]\n    resultat = []\n    for pas in [[-1, 0], [1, 0], [0, -1], [0, 1]]:\n        li = i + pas[0]\n        co = j + pas[1]\n        if 0 <= li < len(laby) and 0 <= co < len(laby[li]):\n            if laby[li][co] != "#":\n                resultat.append([li, co])\n    return resultat\n\n\nLABY = [\n    "#######",\n    "#D..#.#",\n    "#.#.#.#",\n    "#.#...#",\n    "#....A#",\n    "#######",\n]\n\nMURE = [\n    "#####",\n    "#D#A#",\n    "#####",\n]\n\n\n# ---- À toi. ----\n\ndef accessible(laby):\n    """Renvoie True si l'arrivee est atteignable depuis le depart."""\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bempiler\\s*\\([\\s\\S]*\\bempiler\\s*\\(", message: "L'exploration en profondeur se fait avec une pile." },
              { motif: "\\bdepiler\\s*\\(", message: "Il faut dépiler la prochaine case à explorer." },
              { motif: "\\bvoisins\\s*\\(", message: "Sers-toi de voisins() pour connaître les cases praticables." },
            ],
            tests: `assert accessible(LABY) == True, "Un chemin existe dans ce labyrinthe."\nassert accessible(MURE) == False, "Le départ et l'arrivée sont séparés par un mur."\nouvert = ["###", "#D#", "#.#", "#A#", "###"]\nassert accessible(ouvert) == True, "Un couloir droit."\nferme = ["###", "#D#", "###", "#A#", "###"]\nassert accessible(ferme) == False, "Le couloir est coupé."\ncolle = ["####", "#DA#", "####"]\nassert accessible(colle) == True, "Le départ et l'arrivée sont voisins."\ngrand = [\n    "#########",\n    "#D......#",\n    "#.#####.#",\n    "#.....#.#",\n    "#####.#.#",\n    "#A....#.#",\n    "#########",\n]\nassert accessible(grand) == True, "Un chemin existe, même s'il fait le tour."\npiege = [\n    "#########",\n    "#D..#...#",\n    "#...#.A.#",\n    "#...#...#",\n    "#########",\n]\nassert accessible(piege) == False, "Le mur central sépare complètement les deux moitiés."`,
          },
          felicitation: "Un parcours en profondeur : ton premier algorithme de graphe. 🧭",
          indices: [
            "Repère d'abord le départ et l'arrivée avec <code>trouver</code>, puis prépare la pile et le dictionnaire des cases vues.",
            "Marque une case comme vue <strong>au moment où tu l'empiles</strong>, pas au moment où tu la dépiles : sinon elle pourrait être empilée plusieurs fois.",
            "Une case est une liste : compare-la à l'arrivée avec <code>==</code>, mais pour la ranger dans le dictionnaire, transforme-la en p-uplet avec <code>(case[0], case[1])</code>.",
          ],
          apres: `<span class="chapo">Trois structures du chapitre, dans six lignes</span>
            La <strong>pile</strong> retient ce qu'il reste à explorer, le
            <strong>dictionnaire</strong> ce qu'on a déjà vu, et le <strong>tableau</strong>
            porte le labyrinthe. Chacune fait ce qu'elle sait faire.
            <br><br>
            La pile donne son nom à l'algorithme : on explore <em>en profondeur</em>, c'est-à-dire
            qu'on suit un couloir aussi loin que possible avant de revenir sur ses pas. C'est
            ce que fait quiconque cherche la sortie en tâtonnant.
            <br><br>
            Ce que tu viens d'écrire est le <strong>parcours en profondeur d'un graphe</strong>.
            Un labyrinthe en est un : les cases sont les sommets, les passages entre cases
            voisines les arêtes. Le même code, avec une autre fonction <code>voisins</code>,
            explore un réseau social, une carte routière ou l'ensemble des positions d'un jeu.
            Tu le retrouveras tel quel au chapitre des graphes.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le même labyrinthe, en largeur",
          contenu: `
            <p>Une seule ligne va changer, et l'algorithme ne répondra plus à la même
            question.</p>

            <p><code>distance(laby)</code> renvoie le <strong>nombre minimal de
            déplacements</strong> pour aller du départ à l'arrivée, ou <code>-1</code> si
            c'est impossible.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Remplace la pile par une file</span>
              Avec une pile, on s'enfonce dans un couloir jusqu'au bout. Avec une
              <strong>file</strong>, on explore toutes les cases à distance 1, puis toutes
              celles à distance 2, et ainsi de suite — <em>en largeur</em>.
              <br><br>
              La première fois qu'on atteint l'arrivée, c'est donc forcément par un chemin le
              plus court. Aucune pile ne peut garantir cela.
            </div>

            <div class="encadre">
              <span class="chapo">Retenir la distance</span>
              Enfile des couples <code>[case, distance]</code> plutôt que des cases seules :
              chaque voisin est à une case de plus que celui dont il vient.
            </div>`,
          nomFichier: "largeur.py",
          depart: `# ---- La file, et deux aides. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\ndef trouver(laby, marque):\n    for i in range(len(laby)):\n        for j in range(len(laby[i])):\n            if laby[i][j] == marque:\n                return [i, j]\n    return None\n\ndef voisins(laby, case):\n    i = case[0]\n    j = case[1]\n    resultat = []\n    for pas in [[-1, 0], [1, 0], [0, -1], [0, 1]]:\n        li = i + pas[0]\n        co = j + pas[1]\n        if 0 <= li < len(laby) and 0 <= co < len(laby[li]):\n            if laby[li][co] != "#":\n                resultat.append([li, co])\n    return resultat\n\n\nLABY = [\n    "#######",\n    "#D..#.#",\n    "#.#.#.#",\n    "#.#...#",\n    "#....A#",\n    "#######",\n]\n\nMURE = [\n    "#####",\n    "#D#A#",\n    "#####",\n]\n\n\n# ---- À toi. ----\n\ndef distance(laby):\n    """Renvoie le nombre minimal de deplacements du depart a l'arrivee.\n\n    Renvoie -1 si l'arrivee n'est pas atteignable.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\benfiler\\s*\\([\\s\\S]*\\benfiler\\s*\\(", message: "L'exploration en largeur se fait avec une file." },
              { motif: "\\bdefiler\\s*\\(", message: "Il faut défiler la prochaine case à explorer." },
            ],
            tests: `colle = ["####", "#DA#", "####"]\nassert distance(colle) == 1, "Le départ et l'arrivée sont voisins : un seul déplacement."\nassert distance(MURE) == -1, "Un mur sépare les deux."\ncouloir = ["###", "#D#", "#.#", "#.#", "#A#", "###"]\nassert distance(couloir) == 3, "Trois déplacements dans un couloir droit."\nassert distance(LABY) == 7, "Le plus court chemin du labyrinthe fait sept déplacements."\ndeux_chemins = [\n    "#######",\n    "#D....#",\n    "#.###.#",\n    "#....A#",\n    "#######",\n]\nassert distance(deux_chemins) == 6, "Il y a deux chemins possibles ; il faut le plus court."\nferme = ["###", "#D#", "###", "#A#", "###"]\nassert distance(ferme) == -1, "Le couloir est coupé."\ngrand = [\n    "#########",\n    "#D......#",\n    "#.#####.#",\n    "#.....#.#",\n    "#####.#.#",\n    "#A....#.#",\n    "#########",\n]\nassert distance(grand) == 12, "Le chemin doit faire le tour."\nmeme_case = ["###", "#D#", "###"]\nassert distance(meme_case) == -1, "Sans arrivée, il n'y a pas de chemin."`,
          },
          felicitation: "Un parcours en largeur, et le plus court chemin par-dessus le marché. 📏",
          indices: [
            "Pars de l'algorithme de l'exercice précédent, et remplace la pile par une file — <code>enfiler</code> et <code>defiler</code> à la place d'<code>empiler</code> et <code>depiler</code>.",
            "Enfile des couples <code>[case, distance]</code>. Le départ est à la distance 0.",
            "Chaque voisin hérite de la distance de la case dont il vient, plus 1. Et si la file se vide sans avoir atteint l'arrivée, il faut renvoyer <code>-1</code>. Attention aussi au cas où l'arrivée n'existe pas dans le labyrinthe.",
          ],
          apres: `<span class="chapo">Une structure changée, une question différente</span>
            Le code est le même à quatre mots près. Et pourtant :
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Avec une pile</th><th>Avec une file</th></tr>
              <tr><td>Nom</td><td>parcours en <strong>profondeur</strong></td><td>parcours en <strong>largeur</strong></td></tr>
              <tr><td>Explore</td><td>un couloir jusqu'au bout, puis revient</td><td>toutes les cases à distance 1, puis 2…</td></tr>
              <tr><td>Répond à</td><td>« peut-on y aller ? »</td><td>« peut-on y aller, et en combien de pas ? »</td></tr>
              <tr><td>Trouve le plus court</td><td><strong>non</strong></td><td><strong>oui, toujours</strong></td></tr>
            </table>
            </div>
            Pourquoi le plus court est-il garanti ? Parce que la file traite les cases dans
            l'ordre où elles ont été découvertes : toutes celles à distance 1 avant toutes
            celles à distance 2. La première fois que l'arrivée sort de la file, aucun chemin
            plus court n'a pu être manqué.
            <br><br>
            C'est le résultat le plus important du chapitre des graphes, et tu viens de
            l'établir. Le programme officiel demande de « parcourir un graphe en profondeur
            d'abord, en largeur d'abord » — c'est exactement ce que font tes deux fonctions.`,
        },

        {
          id: "x3",
          type: "qcm",
          titre: "Profondeur ou largeur ?",
          contenu: `
            <p>Quatre problèmes. Un seul <strong>exige</strong> le parcours en largeur.</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Problème</th></tr>
              <tr><td><strong>A</strong></td><td>Savoir si deux personnes sont reliées, même de très loin, dans un réseau social.</td></tr>
              <tr><td><strong>B</strong></td><td>Trouver en combien de relations minimum deux personnes sont reliées.</td></tr>
              <tr><td><strong>C</strong></td><td>Colorier toute une zone d'une image, comme le pot de peinture d'un logiciel de dessin.</td></tr>
              <tr><td><strong>D</strong></td><td>Vérifier qu'un labyrinthe n'a aucune case inatteignable.</td></tr>
            </table>
            </div>`,
          question: "Lequel exige la largeur ?",
          options: [
            { texte: "B", correct: true,
              explication: "Oui : « en combien de relations <strong>minimum</strong> » est une question de plus court chemin, et seule la largeur la garantit. C'est exactement ce que calcule le fameux « degré de séparation » entre deux personnes." },
            { texte: "A",
              explication: "La question est seulement « sont-ils reliés ? ». Les deux parcours visitent exactement les mêmes cases, donc les deux répondent. La profondeur consomme d'ailleurs souvent moins de mémoire." },
            { texte: "C",
              explication: "Il s'agit de visiter <em>toutes</em> les cases d'une même zone, sans se soucier de l'ordre ni de la distance. Les deux conviennent — et le pot de peinture est justement l'exemple d'école du parcours en profondeur." },
            { texte: "D",
              explication: "On part d'une case, on visite tout ce qui est atteignable, et l'on compare le compte au nombre de cases libres. L'ordre de visite n'a aucune importance." },
          ],
          apres: `<span class="chapo">La règle tient en une phrase</span>
            <strong>Dès que le mot « plus court », « minimum » ou « le plus vite » apparaît
            dans l'énoncé, c'est une file.</strong> Partout ailleurs, les deux conviennent, et
            l'on choisit selon d'autres critères.
            <br><br>
            Le principal est la mémoire : la profondeur ne retient qu'un chemin à la fois, la
            largeur retient toute une « couronne » de cases à la même distance. Sur une très
            grande carte, la file peut devenir énorme là où la pile reste modeste.
            <br><br>
            En revanche, la profondeur peut s'enfoncer très loin et, sur un graphe infini ou
            très profond, ne jamais revenir. La largeur, elle, trouve toujours la solution la
            plus proche en premier. Aucun des deux n'est meilleur : ils répondent à des
            questions différentes.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Retrouver le chemin, et pas seulement sa longueur",
          contenu: `
            <p>Savoir qu'il faut sept déplacements est utile ; savoir <strong>lesquels</strong>
            l'est davantage.</p>

            <p><code>chemin(laby)</code> renvoie le tableau des cases du plus court chemin,
            <strong>du départ à l'arrivée, les deux inclus</strong>, ou un tableau vide si
            l'arrivée n'est pas atteignable.</p>

            <pre class="bloc-code"><code>["####", "#DA#", "####"]  →  [[1, 1], [1, 2]]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Retenir d'où l'on vient</span>
              Pendant le parcours en largeur, range dans un dictionnaire, pour chaque case
              découverte, la case <strong>depuis laquelle</strong> on l'a atteinte. Une fois
              l'arrivée trouvée, on remonte de proche en proche jusqu'au départ.
              <br><br>
              Le chemin est alors obtenu <strong>à l'envers</strong> — de l'arrivée vers le
              départ. Il ne reste qu'à le renverser, et tu sais faire cela depuis la
              séance 2.
            </div>`,
          nomFichier: "chemin.py",
          depart: `# ---- La file, et deux aides. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\ndef trouver(laby, marque):\n    for i in range(len(laby)):\n        for j in range(len(laby[i])):\n            if laby[i][j] == marque:\n                return [i, j]\n    return None\n\ndef voisins(laby, case):\n    i = case[0]\n    j = case[1]\n    resultat = []\n    for pas in [[-1, 0], [1, 0], [0, -1], [0, 1]]:\n        li = i + pas[0]\n        co = j + pas[1]\n        if 0 <= li < len(laby) and 0 <= co < len(laby[li]):\n            if laby[li][co] != "#":\n                resultat.append([li, co])\n    return resultat\n\n\nLABY = [\n    "#######",\n    "#D..#.#",\n    "#.#.#.#",\n    "#.#...#",\n    "#....A#",\n    "#######",\n]\n\n\n# ---- À toi. ----\n\ndef chemin(laby):\n    """Renvoie le tableau des cases du plus court chemin, depart et arrivee inclus.\n\n    Renvoie [] si l'arrivee n'est pas atteignable.\n    """\n    pass\n`,
          validation: {
            tests: `colle = ["####", "#DA#", "####"]\nassert chemin(colle) == [[1, 1], [1, 2]], "Deux cases : le départ et l'arrivée."\nmure = ["#####", "#D#A#", "#####"]\nassert chemin(mure) == [], "Aucun chemin."\ncouloir = ["###", "#D#", "#.#", "#A#", "###"]\nassert chemin(couloir) == [[1, 1], [2, 1], [3, 1]], "Un couloir droit de trois cases."\nc = chemin(LABY)\nassert len(c) == 8, "Sept déplacements, donc huit cases."\nassert c[0] == trouver(LABY, "D"), "Le chemin commence au départ."\nassert c[-1] == trouver(LABY, "A"), "Et se termine à l'arrivée."\nfor k in range(len(c) - 1):\n    ecart = abs(c[k][0] - c[k + 1][0]) + abs(c[k][1] - c[k + 1][1])\n    assert ecart == 1, "Deux cases consécutives du chemin doivent être voisines."\nfor case in c:\n    assert LABY[case[0]][case[1]] != "#", "Le chemin ne doit traverser aucun mur."\ndeux = ["#######", "#D....#", "#.###.#", "#....A#", "#######"]\nd = chemin(deux)\nassert len(d) == 7, "Le plus court des deux chemins fait six déplacements, donc sept cases."\nferme = ["###", "#D#", "###", "#A#", "###"]\nassert chemin(ferme) == [], "Le couloir est coupé."`,
          },
          felicitation: "Non seulement la distance, mais le trajet. 🗺️",
          indices: [
            "Reprends le parcours en largeur de l'exercice précédent. Au lieu de retenir seulement « vue », le dictionnaire retient la case <strong>d'où l'on vient</strong>.",
            "Pour le départ, il n'y a pas de case précédente : range <code>None</code>.",
            "Une fois l'arrivée atteinte, pars d'elle et remonte de précédent en précédent jusqu'à tomber sur <code>None</code>, en accumulant les cases. Le tableau obtenu est à l'envers : renverse-le avant de le renvoyer.",
          ],
          apres: `<span class="chapo">Le chemin se reconstruit toujours à l'envers</span>
            C'est inévitable : on connaît la case d'où l'on vient, jamais celle où l'on va.
            Remonter depuis l'arrivée donne donc le trajet dans le mauvais sens, et il faut le
            renverser — exactement comme les listes construites en tête à la séance 2, ou le
            mot renversé par une pile à la séance 3.
            <br><br>
            C'est d'ailleurs une pile qu'on utiliserait le plus naturellement : empiler les
            cases en remontant, puis les dépiler donne le chemin à l'endroit, sans aucun
            renversement explicite. Les deux écritures sont justes.
            <br><br>
            Ce dictionnaire « d'où je viens » porte un nom : c'est un <strong>arbre des
            plus courts chemins</strong>. Il contient, en une seule structure, le trajet
            optimal du départ vers <em>toutes</em> les cases atteignables — pas seulement vers
            l'arrivée. C'est ainsi qu'un GPS calcule un itinéraire, et le chapitre des graphes
            reprendra cette idée avec des distances qui ne valent plus toutes 1.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "L'ordonnanceur",
          contenu: `
            <p>Une file au cœur du système d'exploitation. Plusieurs programmes veulent le
            processeur ; il n'y en a qu'un. La solution universelle s'appelle le
            <strong>tourniquet</strong> : chacun son tour, pendant une durée fixe appelée
            <em>quantum</em>.</p>

            <p><code>tourniquet(taches, quantum)</code> reçoit un tableau de couples
            <code>[nom, duree]</code> et renvoie le tableau des noms, <strong>dans l'ordre où
            les tâches se terminent</strong>.</p>

            <div class="encadre">
              <span class="chapo">La règle</span>
              On défile la première tâche. Si sa durée restante est inférieure ou égale au
              quantum, elle se termine — on note son nom. Sinon elle consomme un quantum et
              <strong>repart à la fin de la file</strong> avec sa durée diminuée.
            </div>

            <pre class="bloc-code"><code>tourniquet([["A", 5], ["B", 2], ["C", 3]], 2)

tour 1 : A tourne 2, reste 3  →  file B, C, A
tour 2 : B tourne 2, reste 0  →  B TERMINÉE
tour 3 : C tourne 2, reste 1  →  file A, C
tour 4 : A tourne 2, reste 1  →  file C, A
tour 5 : C tourne 1           →  C TERMINÉE
tour 6 : A tourne 1           →  A TERMINÉE

résultat : ["B", "C", "A"]</code></pre>`,
          nomFichier: "tourniquet.py",
          depart: `# ---- La file. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef tourniquet(taches, quantum):\n    """Renvoie le tableau des noms, dans l'ordre ou les taches se terminent.\n\n    taches est un tableau de couples [nom, duree].\n    Une tache qui ne finit pas repart a la fin de la file.\n    Effet : le tableau recu n'est pas modifie.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\benfiler\\s*\\([\\s\\S]*\\benfiler\\s*\\(", message: "Une tâche inachevée doit repartir à la fin de la file." },
              { motif: "\\bdefiler\\s*\\(", message: "On prend toujours la tâche en tête de file." },
            ],
            tests: `assert tourniquet([], 2) == [], "Aucune tâche."\nassert tourniquet([["A", 3]], 5) == ["A"], "Une tâche plus courte que le quantum se termine du premier coup."\nassert tourniquet([["A", 5], ["B", 2], ["C", 3]], 2) == ["B", "C", "A"], "L'exemple de l'énoncé."\nassert tourniquet([["A", 1], ["B", 1], ["C", 1]], 1) == ["A", "B", "C"], "Des tâches égales se terminent dans l'ordre d'arrivée."\nassert tourniquet([["A", 10], ["B", 1]], 3) == ["B", "A"], "La tâche courte passe devant la longue."\nassert tourniquet([["A", 4], ["B", 4]], 2) == ["A", "B"], "Deux tâches identiques alternent et finissent dans l'ordre."\nassert tourniquet([["A", 6]], 2) == ["A"], "Une seule tâche, plusieurs tours."\nassert tourniquet([["A", 2], ["B", 5], ["C", 1]], 2) == ["A", "C", "B"], "..."\nt = [["A", 3], ["B", 3]]\ntourniquet(t, 1)\nassert t == [["A", 3], ["B", 3]], "Le tableau reçu ne doit pas être modifié."\ngros = []\nfor i in range(10):\n    gros.append(["t" + str(i), 3])\nassert len(tourniquet(gros, 1)) == 10, "Toutes les tâches doivent finir par se terminer."\nassert tourniquet(gros, 1)[0] == "t0", "Et la première arrivée se termine en premier quand toutes sont égales."`,
          },
          felicitation: "Le tourniquet, l'algorithme qui fait tourner ton ordinateur. ⚙️",
          indices: [
            "Commence par enfiler toutes les tâches — mais recopie chaque couple, sinon tu modifierais le tableau reçu en diminuant les durées.",
            "Une boucle tant que la file n'est pas vide : on défile une tâche, et l'on compare sa durée restante au quantum.",
            "Si elle tient dans le quantum, son nom rejoint le résultat et elle ne revient pas. Sinon, sa durée diminue du quantum et elle est réenfilée.",
          ],
          apres: `<span class="chapo">Pourquoi une file, et pourquoi un quantum</span>
            La file garantit l'<strong>équité</strong> : aucune tâche ne peut être ignorée
            indéfiniment, puisque chacune revient forcément en tête après avoir fait le tour.
            C'est exactement la propriété qui manquait à la file de priorité de la séance 4,
            où les urgences pouvaient affamer les autres.
            <br><br>
            Le quantum, lui, règle un compromis. Trop grand, une tâche longue monopolise la
            machine et les autres semblent figées. Trop petit, on passe son temps à changer de
            tâche — et chaque changement coûte. Les systèmes réels choisissent quelques
            millisecondes, ce qui donne l'illusion que tout tourne en même temps sur un seul
            processeur.
            <br><br>
            Tu retrouveras cet algorithme au chapitre « systèmes d'exploitation », où il porte
            son nom anglais de <em>round-robin</em>. Il figure au programme de terminale, et tu
            viens de l'écrire en douze lignes.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "La calculatrice à variables",
          contenu: `
            <p>Dernier exercice guidé du chapitre : on combine la notation polonaise inverse
            de la découverte et le dictionnaire de la séance 7.</p>

            <p><code>executer(programme)</code> reçoit un tableau de lignes. Chaque ligne est
            une chaîne :</p>
            <ul>
              <li><code>"x = 3 4 +"</code> range le résultat de l'expression dans la variable
              <code>x</code> ;</li>
              <li><code>"afficher x 2 *"</code> affiche la valeur de l'expression.</li>
            </ul>
            <p>Dans une expression, un jeton peut être un nombre, un opérateur, ou le
            <strong>nom d'une variable déjà définie</strong>.</p>

            <p>La fonction renvoie le tableau des valeurs affichées.</p>

            <pre class="bloc-code"><code>executer(["x = 3 4 +", "y = x 2 *", "afficher y", "afficher y x -"])
   →  [14, 7]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Reconnaître un jeton</span>
              Dans l'ordre : est-ce un opérateur ? est-ce une variable connue ? sinon, c'est
              un nombre. Les noms de variables ne contiennent jamais de chiffre.
            </div>`,
          nomFichier: "langage.py",
          depart: `# ---- La pile. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\nOPERATEURS = ["+", "-", "*", "//"]\n\n\n# ---- À toi. ----\n\ndef evaluer(jetons, variables):\n    """Renvoie la valeur de l'expression, en lisant les variables dans variables.\n\n    jetons est un tableau de chaines : nombres, operateurs, ou noms de variables.\n    variables est un dictionnaire nom -> valeur.\n    """\n    pass\n\ndef executer(programme):\n    """Execute les lignes et renvoie le tableau des valeurs affichees.\n\n    Une ligne est soit "nom = expression", soit "afficher expression".\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\.split\\s*\\(", message: "Chaque ligne doit être découpée en jetons." },
              { motif: "\\bvariables\\b[\\s\\S]*\\bvariables\\b", message: "Les variables doivent être rangées dans un dictionnaire, et relues ensuite." },
            ],
            tests: `assert evaluer(["3", "4", "+"], {}) == 7, "Sans variable, c'est la calculatrice de la découverte."\nassert evaluer(["x"], {"x": 5}) == 5, "Un jeton qui est une variable connue vaut sa valeur."\nassert evaluer(["x", "2", "*"], {"x": 5}) == 10, "Une variable dans une expression."\nassert evaluer(["x", "y", "-"], {"x": 10, "y": 3}) == 7, "Deux variables, et l'ordre des opérandes respecté."\nassert executer([]) == [], "Un programme vide n'affiche rien."\nassert executer(["afficher 3 4 +"]) == [7], "Un simple affichage."\nassert executer(["x = 3 4 +", "afficher x"]) == [7], "Une affectation, puis un affichage."\nassert executer(["x = 3 4 +", "y = x 2 *", "afficher y", "afficher y x -"]) == [14, 7], "L'exemple de l'énoncé."\nassert executer(["x = 10", "x = x 1 -", "afficher x"]) == [9], "Une variable peut être réaffectée à partir d'elle-même."\nassert executer(["a = 2", "b = 3", "afficher a b *", "afficher a b +"]) == [6, 5], "Deux affichages successifs."\nassert executer(["x = 20 4 //", "afficher x"]) == [5], "La division entière."\nassert executer(["n = 5", "n = n n *", "afficher n"]) == [25], "Une variable lue deux fois dans la même expression."`,
          },
          felicitation: "Un langage de programmation miniature : lecture, variables, affichage. 🏆",
          indices: [
            "Pour <code>evaluer</code> : reprends la boucle de la découverte, et ajoute un cas entre l'opérateur et le nombre — si le jeton est une clé du dictionnaire, c'est sa valeur qu'on empile.",
            "Pour <code>executer</code> : un dictionnaire de variables vide, un tableau de résultats, et une boucle sur les lignes. Chaque ligne se découpe avec <code>split()</code>.",
            "Une ligne d'affectation a <code>\"=\"</code> comme deuxième jeton : le nom est le premier, l'expression est tout ce qui suit — ce qu'une tranche <code>jetons[2:]</code> donne. Une ligne d'affichage commence par <code>\"afficher\"</code>, et son expression est <code>jetons[1:]</code>.",
          ],
          apres: `<span class="chapo">Tu viens d'écrire un interprète complet</span>
            Il a tout ce qu'un langage a de minimal : des expressions, des variables, une
            affectation, une sortie. Et son architecture est celle de tous les autres :
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Étage</th><th>Ce qu'il fait</th><th>Chez toi</th></tr>
              <tr><td>Analyse lexicale</td><td>découper en jetons</td><td><code>split()</code></td></tr>
              <tr><td>Analyse syntaxique</td><td>reconnaître la forme de la ligne</td><td>le test sur <code>jetons[0]</code></td></tr>
              <tr><td>Évaluation</td><td>calculer</td><td><code>evaluer</code>, et sa pile</td></tr>
              <tr><td>État du programme</td><td>retenir les variables</td><td>le dictionnaire</td></tr>
            </table>
            </div>
            Deux structures du chapitre portent l'ensemble : une <strong>pile</strong> pour
            les calculs en attente, un <strong>dictionnaire</strong> pour les variables. C'est
            très exactement ainsi que Python exécute ton code — en plus gros.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "Le projet de fin de chapitre",
          contenu: `
            <p>Dernier défi, libre, et il clôt le chapitre.</p>

            <p>Choisis un problème qui te plaît et résous-le avec les structures du chapitre.
            Quelques idées :</p>
            <ul>
              <li>un <strong>gestionnaire de tâches</strong> : file d'attente, priorités,
              historique des tâches faites ;</li>
              <li>un <strong>jeu de cartes</strong> : pioche en pile, défausse en pile, mains
              des joueurs dans un dictionnaire ;</li>
              <li>un <strong>correcteur de code</strong> : parenthèses, accolades, et guillemets
              appariés ;</li>
              <li>un <strong>simulateur d'ascenseur</strong> : une file d'appels, un étage
              courant, un historique ;</li>
              <li>un <strong>pot de peinture</strong> : colorier une zone d'une image donnée
              comme un tableau de chaînes ;</li>
              <li>un <strong>plus court chemin</strong> sur ton propre labyrinthe, avec des
              cases à coût différent.</li>
            </ul>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>un <strong>commentaire en tête</strong> qui décrit le problème et nomme les
              structures retenues, avec la question à laquelle chacune répond ;</li>
              <li>au moins <strong>quatre fonctions</strong>, chacune avec sa
              <strong>docstring</strong> ;</li>
              <li>au moins <strong>deux structures</strong> différentes du chapitre ;</li>
              <li>au moins une <strong>boucle</strong> qui consomme une pile ou une file ;</li>
              <li>un programme d'essai qui affiche au moins <strong>quatre lignes</strong>.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le conseil de fin de chapitre</span>
              Écris les <strong>spécifications avant le code</strong> : les quatre docstrings
              d'abord, le corps ensuite. C'est la méthode de la séance 1, et c'est celle qui
              fait gagner le plus de temps sur un programme qu'on n'a pas encore en tête.
            </div>`,
          nomFichier: "projet.py",
          depart: `# Mon problème : .....................\n#\n# Structure 1 : ............ pour répondre à « ............ »\n# Structure 2 : ............ pour répondre à « ............ »\n#\n# Écris ici tes fonctions, chacune avec sa docstring,\n# puis le programme d'essai en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){4}",
                message: "Il faut au moins quatre fonctions." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){4}",
                message: "Chacune de tes fonctions doit porter une docstring." },
              { motif: "\\bwhile\\b",
                message: "Au moins une boucle doit consommer une pile ou une file." },
              { motif: "(\\bappend\\s*\\(|\\benfiler\\s*\\(|\\bempiler\\s*\\()",
                message: "Quelque chose doit s'ajouter à une pile ou à une file." },
              { motif: "(\\bpop\\s*\\(|\\bdefiler\\s*\\(|\\bdepiler\\s*\\()",
                message: "Et quelque chose doit en sortir." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme d'essai doit afficher au moins quatre lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins quatre lignes.",
          },
          felicitation: "Le chapitre est terminé. Rendez-vous au suivant, pour tout réécrire en objet. 🏁",
          indices: [
            "Commence par les deux lignes de l'en-tête : tant que tu n'arrives pas à nommer la question à laquelle chaque structure répond, ne code rien.",
            "Écris ensuite les quatre <code>def</code> avec leur docstring et un <code>pass</code> dans le corps. Tu verras tout de suite si le découpage tient debout.",
            "Remplis les corps un par un, en essayant après chacun. Le programme d'essai vient tout en bas, sans indentation.",
          ],
        },
      ],
    },
  ],
};

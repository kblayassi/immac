/* NSI — chapitre 4, séance 12 : parcourir et découper une chaîne.
 * Reprend la section « Pour aller plus loin : les tranches » du cours, et les
 * exercices 24 (analyse de fréquences), 25 (tranches) et 26 (chiffre de César).
 */

export default {
  id: "s12",
  numero: 12,
  titre: "Parcourir et découper une chaîne",
  sousTitre: "Sous-chaînes, tranches, et le chiffre de César",
  palier: "Partie 4 — Les chaînes de caractères",

  accroche: `Extraire l'année d'une date, l'extension d'un nom de fichier, les trois
    premiers d'un classement : découper une séquence est si courant que Python offre
    une syntaxe dédiée, les <strong>tranches</strong>. Et pour finir le chapitre en
    beauté, tu vas chiffrer des messages comme Jules César… puis casser son code.`,

  objectifs: [
    "extraire un morceau de chaîne avec une <strong>tranche</strong> <code>mot[debut:fin]</code>",
    "utiliser les bornes omises, les indices négatifs et le pas : <code>mot[::-1]</code>",
    "appliquer les tranches aux listes",
    "parcourir une chaîne pour compter, analyser et chiffrer",
  ],

  motDeLaFin: `C'est la fin du chapitre : listes, matrices, mémoire, algorithmes de
    référence et chaînes de caractères. Fais le bilan de la partie 4. Au chapitre
    suivant, on apprendra à vérifier que nos fonctions sont justes, en les spécifiant
    et en les testant.`,

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
          titre: "Les tranches",
          contenu: `
            <p>Une <strong>tranche</strong> extrait un morceau d'une chaîne :</p>

            <pre class="bloc-code"><code>mot[debut:fin]      # les caractères d'indice debut à fin - 1</code></pre>

            <pre class="bloc-code"><code>mot = "INFORMATIQUE"
print(mot[0:5])     # INFOR    (indices 0, 1, 2, 3, 4)
print(mot[5:9])     # MATI     (indices 5, 6, 7, 8)</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La fin est exclue</span>
              Comme pour <code>range()</code>, l'indice de <strong>fin</strong> n'est pas
              compris dans la tranche. Avantage : la tranche <code>mot[debut:fin]</code>
              compte exactement <code>fin - debut</code> caractères.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Découper une date",
          contenu: `
            <p>La chaîne <code>date</code> est écrite au format année-mois-jour. Affiche
            l'année, puis le mois, puis le jour, chacun extrait par une
            <strong>tranche</strong> :</p>
            <pre class="bloc-code"><code>2026
10
17</code></pre>`,
          depart: `date = "2026-10-17"\n\n`,
          validation: {
            codeContient: [
              { motif: "date\\s*\\[[^\\]]*:[^\\]]*\\][\\s\\S]*date\\s*\\[[^\\]]*:[^\\]]*\\][\\s\\S]*date\\s*\\[[^\\]]*:[^\\]]*\\]", message: "Extrais l'année, le mois et le jour avec trois tranches de date." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*[\"']?\\d", message: "N'écris pas les nombres à la main : découpe-les dans date." },
            ],
            sortie: "2026\n10\n17",
          },
          felicitation: "Trois tranches, trois morceaux de date. 📅",
          indices: [
            "Repère les indices : l'année occupe les indices 0 à 3, le premier tiret l'indice 4, le mois les indices 5 et 6.",
            "La fin d'une tranche est exclue : pour l'année, la tranche s'arrête à 4.",
          ],
          solution: `date = "2026-10-17"\nprint(date[0:4])\nprint(date[5:7])\nprint(date[8:10])\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Une tranche au milieu",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `mot = "PYTHON"\nprint(mot[1:4])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>PYT</code>",
              explication: "La tranche commence à l'indice 1, c'est-à-dire au Y." },
            { texte: "<code>YTH</code>", correct: true,
              explication: "Oui : indices 1, 2 et 3, soit Y, T et H. L'indice 4 est exclu." },
            { texte: "<code>YTHO</code>",
              explication: "L'indice de fin, 4, n'est pas compris : la tranche compte 4 − 1 = 3 caractères." },
            { texte: "<code>Y</code>",
              explication: "Une tranche peut contenir plusieurs caractères : tous ceux de l'indice 1 jusqu'à l'indice 3." },
          ],
          apres: `<span class="chapo">fin − debut caractères</span>
            <code>mot[1:4]</code> compte 4 − 1 = 3 caractères. C'est le moyen le plus sûr
            de vérifier une tranche.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Bornes omises, indices négatifs, pas",
          contenu: `
            <p>Les tranches acceptent plusieurs raccourcis :</p>

            <pre class="bloc-code"><code>mot = "INFORMATIQUE"
mot[:5]       # INFOR         depuis le début
mot[5:]       # MATIQUE       jusqu'à la fin
mot[-3:]      # QUE           les trois derniers
mot[:-1]      # INFORMATIQU   tout sauf le dernier
mot[::2]      # IFRAIU        un caractère sur deux
mot[::-1]     # EUQITAMROFNI  à l'envers !</code></pre>

            <div class="encadre">
              <span class="chapo">Syntaxe complète : mot[debut:fin:pas]</span>
              Une borne omise veut dire « depuis le début » ou « jusqu'à la fin ». Le
              <strong>pas</strong>, facultatif, indique de combien on avance ; un pas de
              −1 parcourt la chaîne à l'envers.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Le nom et l'extension",
          contenu: `
            <p>Affiche l'extension du fichier (ses trois derniers caractères), puis son nom
            sans l'extension ni le point (tout sauf ses quatre derniers caractères), avec
            des tranches à <strong>indices négatifs</strong> :</p>
            <pre class="bloc-code"><code>pdf
rapport_final</code></pre>`,
          depart: `fichier = "rapport_final.pdf"\n\n`,
          validation: {
            codeContient: [
              { motif: "fichier\\s*\\[\\s*-\\s*3\\s*:\\s*\\]", message: "L'extension, ce sont les trois derniers caractères : fichier[-3:]." },
              { motif: "fichier\\s*\\[\\s*:\\s*-\\s*4\\s*\\]", message: "Le nom, c'est tout sauf les quatre derniers caractères : une tranche jusqu'à -4." },
            ],
            sortie: "pdf\nrapport_final",
          },
          felicitation: "Des indices négatifs : la tranche marche quelle que soit la longueur du nom. 📄",
          indices: [
            "Pour les trois derniers caractères, la tranche commence à -3 et va jusqu'à la fin.",
            "Pour le nom, la tranche part du début et s'arrête avant les quatre derniers caractères.",
          ],
          solution: `fichier = "rapport_final.pdf"\nprint(fichier[-3:])\nprint(fichier[:-4])\n`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Un caractère sur deux",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `lettres = "ABCDEFG"\nprint(lettres[::2])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>AB</code>",
              explication: "Le 2 est ici le <strong>pas</strong>, pas la fin : les deux-points sont doublés." },
            { texte: "<code>ACEG</code>", correct: true,
              explication: "Oui : du début à la fin, en avançant de 2 : indices 0, 2, 4 et 6." },
            { texte: "<code>BDF</code>",
              explication: "On part du début, donc de l'indice 0 : le A est pris." },
            { texte: "<code>GECA</code>",
              explication: "Le pas est positif : on avance de gauche à droite." },
          ],
          apres: `<span class="chapo">Lire les deux-points</span>
            Avec un seul deux-points, on donne <code>debut:fin</code> ; avec deux, on
            ajoute le pas : <code>debut:fin:pas</code>. Ici, début et fin sont omis.`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Les tranches marchent aussi sur les listes",
          contenu: `
            <p>Tout ceci s'applique aux listes :</p>

            <pre class="bloc-code"><code>L = [10, 20, 30, 40, 50]
L[1:3]        # [20, 30]
L[-2:]        # [40, 50]
L[::-1]       # [50, 40, 30, 20, 10]
L[:]          # [10, 20, 30, 40, 50] : une COPIE, vue à la séance 6</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le palindrome en une ligne</span>
              Tu as écrit <code>est_palindrome</code> en comparant les caractères deux à
              deux. Avec une tranche, une ligne suffit :
              <code>return mot == mot[::-1]</code>. Mais sache toujours écrire la version
              avec la boucle : c'est elle qui montre l'algorithme.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Le haut et le bas du classement",
          contenu: `
            <p>Avec deux tranches de <code>classement</code>, affiche les trois premiers,
            puis les deux derniers :</p>
            <pre class="bloc-code"><code>['Léa', 'Tom', 'Inès']
['Sacha', 'Zoé']</code></pre>`,
          depart: `classement = ["Léa", "Tom", "Inès", "Hugo", "Sacha", "Zoé"]\n\n`,
          validation: {
            codeContient: [
              { motif: "classement\\s*\\[\\s*(0\\s*)?:\\s*3\\s*\\]", message: "Les trois premiers : une tranche depuis le début jusqu'à 3." },
              { motif: "classement\\s*\\[\\s*-\\s*2\\s*:\\s*\\]", message: "Les deux derniers : une tranche depuis -2 jusqu'à la fin." },
            ],
            sortie: "['Léa', 'Tom', 'Inès']\n['Sacha', 'Zoé']",
          },
          felicitation: "Une tranche de liste est une nouvelle liste. 🏁",
          indices: [
            "La première tranche part du début et s'arrête avant l'indice 3.",
            "La seconde part de l'indice -2 et va jusqu'à la fin : la borne de fin est omise.",
          ],
          solution: `classement = ["Léa", "Tom", "Inès", "Hugo", "Sacha", "Zoé"]\nprint(classement[:3])\nprint(classement[-2:])\n`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Décaler une lettre dans l'alphabet",
          contenu: `
            <p>Le <strong>chiffre de César</strong> remplace chaque lettre par celle
            située quelques rangs plus loin dans l'alphabet. Avec un décalage de 3,
            <code>a</code> devient <code>d</code>, <code>b</code> devient
            <code>e</code>… et <code>z</code> revient à <code>c</code>.</p>

            <p>Pour décaler une lettre, deux outils suffisent :</p>
            <ul>
              <li>la fonction <code>rang(lettre)</code>, qui renvoie la position d'une lettre
              dans <code>ALPHABET</code> (0 pour a, 25 pour z), ou −1 si ce n'est pas une
              lettre minuscule. Tu la reconnaîtras : c'est l'algorithme de la première
              occurrence, appliqué à une chaîne ;</li>
              <li>le <strong>modulo</strong>, pour revenir au début après le z :
              <code>(position + decalage) % 26</code> retombe toujours entre 0 et 25.</li>
            </ul>

            <pre class="bloc-code"><code>ALPHABET = "abcdefghijklmnopqrstuvwxyz"
# rang("x") vaut 23 ; avec un décalage de 3 :
# (23 + 3) % 26 = 0, et ALPHABET[0] vaut "a"</code></pre>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Décaler une lettre",
          contenu: `
            <p>La fonction <code>rang</code> est déjà écrite. Écris la fonction
            <code>decaler(lettre, decalage)</code>, qui renvoie la lettre décalée de
            <code>decalage</code> rangs dans l'alphabet. Un caractère qui n'est pas une
            lettre minuscule (espace, ponctuation) est renvoyé tel quel.</p>
            <pre class="bloc-code"><code>decaler("a", 3)    # renvoie "d"
decaler("z", 3)    # renvoie "c"
decaler("!", 3)    # renvoie "!"</code></pre>`,
          depart: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+decaler[\\s\\S]*\\brang\\s*\\(", message: "decaler doit appeler rang pour connaître la position de la lettre." },
              { motif: "%\\s*26", message: "Pour revenir au début après le z, utilise le modulo : % 26." },
            ],
            tests: `assert decaler("a", 3) == "d", "decaler('a', 3) doit renvoyer 'd'"\nassert decaler("z", 3) == "c", "après le z, on repart au début : decaler('z', 3) doit renvoyer 'c'"\nassert decaler("!", 3) == "!", "un caractère qui n'est pas une lettre est renvoyé tel quel"\nassert decaler(" ", 5) == " ", "un espace est renvoyé tel quel"\nassert decaler("c", -3) == "z", "un décalage négatif recule : decaler('c', -3) doit renvoyer 'z'"`,
          },
          felicitation: "Le cœur du chiffre de César : une lettre décalée, avec retour au début. 🔐",
          indices: [
            "Range d'abord le rang de la lettre dans une variable. S'il vaut -1, renvoie la lettre telle quelle.",
            "Sinon, la nouvelle position est le rang plus le décalage, modulo 26 ; la lettre se lit dans <code>ALPHABET</code> à cette position.",
          ],
          solution: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n`,
          apres: `<span class="chapo">Un modulo qui marche aussi à reculons</span>
            En Python, <code>(2 - 3) % 26</code> vaut 25 : le reste est toujours positif.
            C'est pour cela qu'un décalage négatif recule correctement de c à z.`,
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Tranche</th><th>Avec <code>mot = "PYTHON"</code></th><th>Ce qu'elle donne</th></tr>
              <tr><td><code>mot[1:4]</code></td><td><code>YTH</code></td><td>de l'indice 1 à 3, la fin est exclue</td></tr>
              <tr><td><code>mot[:2]</code></td><td><code>PY</code></td><td>depuis le début</td></tr>
              <tr><td><code>mot[2:]</code></td><td><code>THON</code></td><td>jusqu'à la fin</td></tr>
              <tr><td><code>mot[-3:]</code></td><td><code>HON</code></td><td>les trois derniers</td></tr>
              <tr><td><code>mot[:-1]</code></td><td><code>PYTHO</code></td><td>tout sauf le dernier</td></tr>
              <tr><td><code>mot[::2]</code></td><td><code>PTO</code></td><td>un sur deux</td></tr>
              <tr><td><code>mot[::-1]</code></td><td><code>NOHTYP</code></td><td>à l'envers</td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>ALPHABET[(rang(lettre) + decalage) % 26]   # décaler une lettre, avec retour au début</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>oublier que la fin est exclue : <code>mot[0:3]</code> compte 3 caractères, pas 4 ;</li>
                <li>confondre <code>mot[n:]</code> (à partir de l'indice n) et <code>mot[-n:]</code> (les n derniers) ;</li>
                <li>écrire <code>mot[::1]</code> pour inverser : c'est le pas <strong>−1</strong>.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 35,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Les tranches de PROGRAMME, 1",
          contenu: `<p>On considère la chaîne <code>mot = "PROGRAMME"</code>, qui compte 9
            caractères, d'indices 0 à 8.</p>`,
          question: "Que valent mot[0:4], mot[:3] et mot[4:] ?",
          options: [
            { texte: "PROG ; PRO ; RAMME", correct: true,
              explication: "Oui : indices 0 à 3, puis 0 à 2, puis de 4 jusqu'à la fin." },
            { texte: "PROGR ; PRO ; RAMME",
              explication: "La fin est exclue : <code>mot[0:4]</code> s'arrête à l'indice 3." },
            { texte: "PROG ; PROG ; GRAMME",
              explication: "<code>mot[:3]</code> s'arrête avant l'indice 3, et <code>mot[4:]</code> commence à l'indice 4, le R." },
            { texte: "PROG ; MME ; RAMME",
              explication: "<code>mot[:3]</code> part du début : ce sont les trois premiers caractères." },
          ],
          apres: `<span class="chapo">Deux tranches complémentaires</span>
            <code>mot[:4] + mot[4:]</code> redonne toujours <code>mot</code> : le caractère
            d'indice 4 est dans la seconde tranche, pas dans la première.`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Les tranches de PROGRAMME, 2",
          contenu: `<p>Toujours avec <code>mot = "PROGRAMME"</code>.</p>`,
          question: "Que valent mot[-3:], mot[::2], mot[::-1] et len(mot[2:5]) ?",
          options: [
            { texte: "MME ; PORME ; EMMARGORP ; 3", correct: true,
              explication: "Oui : les trois derniers ; les indices 0, 2, 4, 6, 8 ; la chaîne à l'envers ; et la tranche « OGR » compte 5 − 2 = 3 caractères." },
            { texte: "MME ; RGAM ; EMMARGORP ; 3",
              explication: "<code>mot[::2]</code> part du début, indice 0 : P, O, R, M, E." },
            { texte: "PRO ; PORME ; EMMARGORP ; 4",
              explication: "<code>mot[-3:]</code> donne les trois <strong>derniers</strong> caractères ; et la fin d'une tranche est exclue." },
            { texte: "MME ; PORME ; PROGRAMME ; 3",
              explication: "Un pas de −1 parcourt la chaîne à l'envers." },
          ],
          apres: `<span class="chapo">La longueur d'une tranche</span>
            <code>len(mot[debut:fin])</code> vaut <code>fin - debut</code>, tant que les
            indices restent dans la chaîne.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Compter une lettre",
          contenu: `
            <p>En français, certaines lettres reviennent bien plus souvent que d'autres —
            c'est ce qui permet de casser des codes secrets ! Le code de départ contient
            les deux premiers vers d'une fable de La Fontaine.</p>
            <p>Écris <code>compter_lettre(texte, lettre)</code>, qui compte les occurrences
            de <code>lettre</code> dans <code>texte</code>, <strong>sans
            <code>count()</code></strong>.</p>`,
          depart: `fable = """maitre corbeau sur un arbre perche tenait en son bec un fromage\nmaitre renard par l odeur alleche lui tint a peu pres ce langage"""\n\n\ndef compter_lettre(texte, lettre):\n    pass\n\n\nprint(compter_lettre(fable, "e"))\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le texte avec une boucle for." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*count\\s*\\(", message: "Pas de count() : c'est ce que tu reprogrammes." },
            ],
            sortie: "18",
            tests: `assert compter_lettre("banane", "a") == 2, "compter_lettre('banane', 'a') doit renvoyer 2"\nassert compter_lettre("banane", "z") == 0, "une lettre absente a zéro occurrence"\nassert compter_lettre(fable, "n") == 8, "il y a 8 n dans la fable"`,
          },
          felicitation: "18 e dans deux vers : la lettre reine du français. 🔎",
          indices: [
            "C'est l'algorithme <code>comptage</code> de la séance 8, appliqué à une chaîne au lieu d'un tableau.",
            "Un compteur à 0, une boucle sur les caractères du texte, et le compteur augmente quand le caractère vaut <code>lettre</code>.",
          ],
          solution: `fable = """maitre corbeau sur un arbre perche tenait en son bec un fromage\nmaitre renard par l odeur alleche lui tint a peu pres ce langage"""\n\n\ndef compter_lettre(texte, lettre):\n    compteur = 0\n    for caractere in texte:\n        if caractere == lettre:\n            compteur = compteur + 1\n    return compteur\n\n\nprint(compter_lettre(fable, "e"))\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "L'analyse de fréquences",
          contenu: `
            <p>La fonction <code>compter_lettre</code> est déjà écrite.</p>
            <ol>
              <li>Écris <code>frequence(texte, lettre)</code>, qui renvoie le
              <strong>pourcentage</strong> d'occurrences de <code>lettre</code> parmi tous
              les caractères de <code>texte</code>.</li>
              <li>Puis, avec une boucle, affiche la fréquence de chacune des cinq lettres
              <code>e</code>, <code>a</code>, <code>s</code>, <code>i</code>,
              <code>n</code> dans la fable, pour pouvoir les classer.</li>
            </ol>`,
          depart: `fable = """maitre corbeau sur un arbre perche tenait en son bec un fromage\nmaitre renard par l odeur alleche lui tint a peu pres ce langage"""\n\n\ndef compter_lettre(texte, lettre):\n    compteur = 0\n    for caractere in texte:\n        if caractere == lettre:\n            compteur = compteur + 1\n    return compteur\n\n\ndef frequence(texte, lettre):\n    pass\n\n\n# Affiche la fréquence de e, a, s, i et n dans la fable\n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+frequence[\\s\\S]*\\bcompter_lettre\\s*\\(", message: "frequence doit appeler compter_lettre." },
              { motif: "\\bfor\\b[^\\n]*\\n[\\s\\S]*frequence\\s*\\(\\s*fable", message: "Affiche les fréquences avec une boucle qui appelle frequence(fable, …)." },
            ],
            sortieNonVide: true,
            tests: `assert abs(frequence("aab", "a") - 66.667) < 0.01, "dans 'aab', la lettre a représente environ 66.67 % des caractères"\nassert frequence("abcd", "z") == 0, "une lettre absente a une fréquence nulle"\nassert abs(frequence(fable, "e") - 14.0625) < 0.001, "dans la fable, e représente 14.0625 % des caractères"`,
          },
          felicitation: "e, a, n, i, s : le classement des fréquences, calculé par toi. 📊",
          indices: [
            "Un pourcentage, c'est le nombre d'occurrences divisé par le nombre total de caractères, multiplié par 100.",
            "Pour l'affichage, une boucle sur la chaîne <code>\"easin\"</code> : à chaque tour, un <code>print</code> de la lettre et de sa fréquence dans la fable.",
          ],
          solution: `fable = """maitre corbeau sur un arbre perche tenait en son bec un fromage\nmaitre renard par l odeur alleche lui tint a peu pres ce langage"""\n\n\ndef compter_lettre(texte, lettre):\n    compteur = 0\n    for caractere in texte:\n        if caractere == lettre:\n            compteur = compteur + 1\n    return compteur\n\n\ndef frequence(texte, lettre):\n    return compter_lettre(texte, lettre) / len(texte) * 100\n\n\n# Affiche la fréquence de e, a, s, i et n dans la fable\nfor lettre in "easin":\n    print(lettre, ":", frequence(fable, lettre), "%")\n`,
          apres: `<span class="chapo">Pour aller plus loin</span>
            Les lettres les plus fréquentes ne sont pas les mêmes dans toutes les langues :
            en anglais, ce sont e et t. Comparer les fréquences d'un texte chiffré à celles
            de la langue permet de le déchiffrer <strong>sans connaître la clé</strong>.
            Pour associer un compteur à chaque lettre, il faudra les
            <strong>dictionnaires</strong>, au chapitre sur les types construits.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : trois tranches",
          contenu: `
            <p>Ces trois fonctions utilisent des tranches. Le programme devrait
            afficher :</p>
            <pre class="bloc-code"><code>PRO
MME
True</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. Exécute-le, lis les messages, et
            corrige-les une par une.</p>`,
          depart: `def debut(mot, n):\n    """Renvoie les n premiers caractères de mot."""\n    return mot[1:n]\n\n\ndef fin(mot, n):\n    """Renvoie les n derniers caractères de mot."""\n    return mot[n:]\n\n\ndef est_palindrome(mot):\n    return mot == mot[::-1\n\n\nprint(debut("PROGRAMME", 3))\nprint(fin("PROGRAMME", 3))\nprint(est_palindrome("kayak"))\n`,
          validation: {
            codeContient: [
              { motif: "mot\\s*\\[\\s*(0\\s*)?:\\s*n\\s*\\]", message: "Les n premiers caractères : une tranche depuis le début jusqu'à n." },
              { motif: "mot\\s*\\[\\s*-\\s*n\\s*:\\s*\\]", message: "Les n derniers caractères : une tranche depuis -n jusqu'à la fin." },
            ],
            sortie: "PRO\nMME\nTrue",
            tests: `assert debut("PYTHON", 2) == "PY", "debut('PYTHON', 2) doit renvoyer 'PY'"\nassert fin("PYTHON", 2) == "ON", "fin('PYTHON', 2) doit renvoyer 'ON'"\nassert est_palindrome("python") == False, "python n'est pas un palindrome"`,
          },
          felicitation: "Un crochet, un décalage, un signe : les trois pièges des tranches. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : une tranche n'est pas refermée.",
            "Ensuite, <code>debut</code> affiche « RO » : la tranche ne part pas du premier caractère, d'indice 0.",
            "Enfin, <code>fin</code> affiche « GRAMME » : <code>mot[n:]</code> part de l'indice n. Pour les n derniers, l'indice de début est négatif.",
          ],
          solution: `def debut(mot, n):\n    """Renvoie les n premiers caractères de mot."""\n    return mot[:n]\n\n\ndef fin(mot, n):\n    """Renvoie les n derniers caractères de mot."""\n    return mot[-n:]\n\n\ndef est_palindrome(mot):\n    return mot == mot[::-1]\n\n\nprint(debut("PROGRAMME", 3))\nprint(fin("PROGRAMME", 3))\nprint(est_palindrome("kayak"))\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le chiffre de César",
          contenu: `
            <p>Les fonctions <code>rang</code> et <code>decaler</code> sont déjà
            écrites.</p>
            <ol>
              <li>Écris <code>chiffrer(message, decalage)</code>, qui renvoie le message
              chiffré : chaque lettre minuscule est décalée, les autres caractères sont
              recopiés tels quels.</li>
              <li>Écris <code>dechiffrer(message, decalage)</code>. Une seule ligne suffit :
              déchiffrer revient à chiffrer… dans l'autre sens.</li>
            </ol>
            <pre class="bloc-code"><code>chiffrer("ave cesar !", 3)      # renvoie "dyh fhvdu !"
dechiffrer("dyh fhvdu !", 3)    # renvoie "ave cesar !"</code></pre>`,
          depart: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef chiffrer(message, decalage):\n    pass\n\n\ndef dechiffrer(message, decalage):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+chiffrer[\\s\\S]*\\bdecaler\\s*\\(", message: "chiffrer doit appeler decaler pour chaque caractère." },
              { motif: "def\\s+dechiffrer[^\\n]*\\n[\\s\\S]*\\bchiffrer\\s*\\(", message: "dechiffrer doit appeler chiffrer, avec le décalage inverse." },
            ],
            tests: `assert chiffrer("abc", 3) == "def", "chiffrer('abc', 3) doit renvoyer 'def'"\nassert chiffrer("xyz", 3) == "abc", "après le z, on repart au début : chiffrer('xyz', 3) doit renvoyer 'abc'"\nassert chiffrer("ave cesar !", 3) == "dyh fhvdu !", "les espaces et la ponctuation sont recopiés tels quels"\nassert dechiffrer("def", 3) == "abc", "dechiffrer('def', 3) doit renvoyer 'abc'"\nassert dechiffrer(chiffrer("bonjour la nsi", 7), 7) == "bonjour la nsi", "déchiffrer un message chiffré doit redonner le message d'origine"`,
          },
          felicitation: "Ave César : ton message est chiffré, et tu sais le déchiffrer. 🏛️",
          indices: [
            "<code>chiffrer</code> est un accumulateur de chaîne : une chaîne vide, puis chaque caractère du message, passé par <code>decaler</code>, s'ajoute à la suite.",
            "<code>dechiffrer</code> renvoie le résultat de <code>chiffrer</code> appliqué au même message, avec le décalage opposé.",
          ],
          solution: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef chiffrer(message, decalage):\n    resultat = ""\n    for caractere in message:\n        resultat = resultat + decaler(caractere, decalage)\n    return resultat\n\n\ndef dechiffrer(message, decalage):\n    return chiffrer(message, -decalage)\n`,
          apres: `<span class="chapo">Un peu d'histoire</span>
            Jules César utilisait ce procédé, avec un décalage de 3, pour ses
            correspondances militaires. Le chiffre a résisté quelques siècles — jusqu'à
            ce que les savants arabes du IXᵉ siècle inventent l'<strong>analyse
            fréquentielle</strong>, qui le casse en quelques minutes.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 25,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Casser le code",
          contenu: `
            <p>Tu as intercepté ce message, chiffré par César, mais tu ne connais pas le
            décalage. Il n'y a que 25 décalages possibles : essaie-les tous !</p>
            <p>Avec une boucle, affiche le message déchiffré avec chacun des décalages de
            1 à 25. Repère la seule ligne qui veut dire quelque chose : la page la
            cherchera dans ta console.</p>`,
          depart: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef chiffrer(message, decalage):\n    resultat = ""\n    for caractere in message:\n        resultat = resultat + decaler(caractere, decalage)\n    return resultat\n\n\ndef dechiffrer(message, decalage):\n    return chiffrer(message, -decalage)\n\n\nsecret = "slz zohkvrz wvtwhplua"\n\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+range\\s*\\(", message: "Essaie tous les décalages avec une boucle for sur un range." },
              { motif: "dechiffrer\\s*\\(\\s*secret\\b", message: "À chaque tour, déchiffre le message secret." },
            ],
            sortieContient: ["les shadoks pompaient"],
          },
          felicitation: "25 essais, une seule phrase lisible : tu as cassé le chiffre de César. 🕵️",
          indices: [
            "Une boucle sur les décalages de 1 à 25 : attention, la borne de fin d'un <code>range</code> est exclue.",
            "À chaque tour, affiche le décalage et le résultat de <code>dechiffrer</code> appliqué à <code>secret</code> avec ce décalage.",
          ],
          solution: `ALPHABET = "abcdefghijklmnopqrstuvwxyz"\n\n\ndef rang(lettre):\n    for i in range(len(ALPHABET)):\n        if ALPHABET[i] == lettre:\n            return i\n    return -1\n\n\ndef decaler(lettre, decalage):\n    position = rang(lettre)\n    if position == -1:\n        return lettre\n    return ALPHABET[(position + decalage) % 26]\n\n\ndef chiffrer(message, decalage):\n    resultat = ""\n    for caractere in message:\n        resultat = resultat + decaler(caractere, decalage)\n    return resultat\n\n\ndef dechiffrer(message, decalage):\n    return chiffrer(message, -decalage)\n\n\nsecret = "slz zohkvrz wvtwhplua"\nfor cle in range(1, 26):\n    print(cle, dechiffrer(secret, cle))\n`,
          apres: `<span class="chapo">L'attaque par force brute</span>
            Essayer toutes les clés possibles s'appelle une attaque par <strong>force
            brute</strong>. Avec 25 clés, c'est immédiat : c'est pourquoi les chiffrements
            modernes utilisent des clés si nombreuses qu'aucun ordinateur ne pourrait
            toutes les essayer.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "La compression",
          contenu: `
            <p>Pour compresser un texte qui contient de longues répétitions, on remplace
            chaque série de caractères identiques par le caractère suivi du nombre de
            répétitions. Écris la fonction <code>compresser(texte)</code>, pour un texte
            non vide.</p>
            <pre class="bloc-code"><code>compresser("aaabcc")    # renvoie "a3b1c2"
compresser("zzzz")      # renvoie "z4"</code></pre>`,
          depart: `def compresser(texte):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Parcours le texte avec une boucle." },
              { motif: "\\bstr\\s*\\(|\\bf[\"']", message: "Le nombre de répétitions doit être converti en chaîne : str() ou une f-string." },
            ],
            tests: `assert compresser("aaabcc") == "a3b1c2", "compresser('aaabcc') doit renvoyer 'a3b1c2'"\nassert compresser("zzzz") == "z4", "compresser('zzzz') doit renvoyer 'z4'"\nassert compresser("abc") == "a1b1c1", "compresser('abc') doit renvoyer 'a1b1c1'"\nassert compresser("a") == "a1", "compresser('a') doit renvoyer 'a1'"\nassert compresser("aabaa") == "a2b1a2", "deux séries de la même lettre restent séparées"`,
          },
          felicitation: "Le principe des premiers formats d'image compressés. 🗜️",
          indices: [
            "Garde le caractère de la série en cours et un compteur. Quand le caractère lu est le même, le compteur augmente.",
            "Quand il change, ajoute au résultat le caractère de la série et son compteur converti, puis démarre une nouvelle série. N'oublie pas la dernière série, après la boucle.",
          ],
          solution: `def compresser(texte):\n    resultat = ""\n    courant = texte[0]\n    compteur = 0\n    for caractere in texte:\n        if caractere == courant:\n            compteur = compteur + 1\n        else:\n            resultat = resultat + courant + str(compteur)\n            courant = caractere\n            compteur = 1\n    resultat = resultat + courant + str(compteur)\n    return resultat\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre découpe",
          contenu: `
            <p>Invente une fonction qui transforme une chaîne grâce aux
            <strong>tranches</strong>. Quelques idées : le verlan (couper un mot en deux et
            échanger les moitiés), un nom de fichier sans son extension, les initiales d'un
            prénom composé, un mot en miroir…</p>
            <ul>
              <li>écris une fonction qui utilise au moins une tranche et renvoie une
              chaîne ;</li>
              <li>appelle-la sur deux exemples et affiche les résultats.</li>
            </ul>`,
          depart: `# Ta fonction ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\s+\\w+\\s*\\(", message: "Écris une fonction avec def." },
              { motif: "\\w\\s*\\[[^\\]\\n]*:[^\\]\\n]*\\]", message: "Utilise au moins une tranche : mot[debut:fin]." },
              { motif: "\\breturn\\b", message: "Ta fonction doit renvoyer une chaîne." },
              { motif: "\\bprint\\s*\\([\\s\\S]*\\bprint\\s*\\(", message: "Affiche le résultat d'au moins deux appels." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ta découpe, ta fonction : le chapitre est terminé. 🎉",
          indices: [
            "Pour couper un mot en deux, le milieu est à l'indice <code>len(mot) // 2</code>.",
            "Termine par deux <code>print</code> qui appellent ta fonction sur deux mots différents.",
          ],
          solution: `def verlan(mot):\n    milieu = len(mot) // 2\n    return mot[milieu:] + mot[:milieu]\n\n\nprint(verlan("bonjour"))\nprint(verlan("fete"))\n`,
        },
      ],
    },
  ],
};

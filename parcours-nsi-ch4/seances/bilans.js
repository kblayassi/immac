/* Bilans de fin de partie — NSI Première, chapitre 4.
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

  /* ================================================== PARTIE 1 — LISTES */
  listes: {
    titre: "Les listes",
    accroche: `Créer, lire, modifier, parcourir, construire : tout le travail sur les
      listes repose sur ces cinq gestes. Voici ce que tu dois savoir faire, sans
      hésiter, avant de passer aux matrices.`,

    sections: [
      {
        titre: "Créer une liste et la lire",
        seances: ["s01"],
        savoirs: [
          { sait: "créer une liste avec des crochets, et la liste vide",
            code: `notes = [12, 15, 8, 18]\nvide = []` },
          { sait: `lire un élément par son <strong>indice</strong>, qui commence à
              <strong>0</strong> : l'élément de rang k est <code>L[k - 1]</code>`,
            code: `notes[0]      # 12 : le premier\nnotes[2]      # 8  : le troisième` },
          { sait: "lire le dernier élément, quelle que soit la longueur",
            code: `notes[-1]                  # 18\nnotes[len(notes) - 1]      # 18 aussi` },
          { sait: "connaître le nombre d'éléments avec <code>len()</code>",
            code: `len(notes)    # 4` },
        ],
        pieges: `<ul>
            <li>une liste de 4 éléments a des indices de 0 à <strong>3</strong> : <code>L[4]</code> est une <code>IndexError</code> ;</li>
            <li>la longueur (4) et le dernier indice (3) diffèrent toujours d'une unité.</li>
          </ul>`,
      },
      {
        titre: "Modifier une liste",
        seances: ["s02"],
        savoirs: [
          { sait: "remplacer un élément, éventuellement à partir de son ancienne valeur",
            code: `notes[2] = 11\nnotes[0] = notes[0] + 1` },
          { sait: "ajouter un élément à la fin avec <code>append()</code>, et remplir une liste vide dans une boucle",
            code: `multiples = []\nfor i in range(1, 6):\n    multiples.append(7 * i)` },
          { sait: "interroger une liste avec les fonctions de Python",
            code: `sum(notes)    min(notes)    max(notes)\nsum(notes) / len(notes)    # la moyenne\n15 in notes                # True ou False` },
        ],
        pieges: `<ul>
            <li><code>L[len(L)] = x</code> ne crée pas de case : c'est <code>append()</code> qui ajoute ;</li>
            <li><code>L = L.append(x)</code> remplace la liste par <code>None</code> : <code>append()</code> ne renvoie rien.</li>
          </ul>`,
      },
      {
        titre: "Parcourir une liste",
        seances: ["s03"],
        savoirs: [
          { sait: "parcourir une liste <strong>par élément</strong>, quand seules les valeurs comptent",
            code: `for note in notes:\n    print(note)` },
          { sait: "parcourir une liste <strong>par indice</strong>, pour connaître la position, lire deux listes ou modifier les cases",
            code: `for i in range(len(notes)):\n    notes[i] = notes[i] + 1` },
          { sait: `appliquer le schéma de l'<strong>accumulateur</strong> : préparer avant la
              boucle, faire évoluer dedans, utiliser après`,
            code: `total = 0\nfor note in notes:\n    total = total + note\nprint(total)` },
        ],
        pieges: `<ul>
            <li>une initialisation placée <strong>dans</strong> la boucle repart de zéro à chaque tour ;</li>
            <li>dans un parcours par élément, <code>note = note + 1</code> ne modifie pas la liste.</li>
          </ul>`,
      },
      {
        titre: "Les listes en compréhension",
        seances: ["s04"],
        savoirs: [
          { sait: "construire une liste en compréhension, en transformant chaque élément",
            code: `[x * 2 for x in L]\n[i * i for i in range(11)]` },
          { sait: "filtrer une liste avec une condition placée à la fin",
            code: `[x for x in L if x >= 10]` },
          { sait: "passer d'une boucle avec <code>append()</code> à une compréhension, et inversement",
            code: `M = []\nfor x in L:\n    if x % 2 == 0:\n        M.append(x)\n\nM = [x for x in L if x % 2 == 0]      # la même chose` },
        ],
      },
    ],

    suite: `<strong>Le point qui coince toujours :</strong> les indices commencent à 0.
      Le troisième élément est <code>L[2]</code>, et le dernier indice valide est
      <code>len(L) - 1</code>.`,
  },

  /* ======================================== PARTIE 2 — MATRICES ET MÉMOIRE */
  memoire: {
    titre: "Matrices et mémoire",
    accroche: `Des listes de listes pour représenter une grille, et ce qui se passe
      réellement dans la mémoire quand on écrit <code>M = L</code>. Voici ce que tu
      dois savoir faire avant d'attaquer les algorithmes.`,

    sections: [
      {
        titre: "Les matrices",
        seances: ["s05"],
        savoirs: [
          { sait: "représenter une grille par une liste de lignes, toutes de même longueur",
            code: `M = [[1, 2, 3],\n     [4, 5, 6]]` },
          { sait: "lire et modifier une case avec <code>M[ligne][colonne]</code>, la ligne <strong>toujours</strong> en premier",
            code: `M[1][2]          # 6\nM[0][1] = 20` },
          { sait: "obtenir le nombre de lignes et de colonnes",
            code: `len(M)           # 2 : les lignes\nlen(M[0])        # 3 : les colonnes` },
          { sait: "parcourir une matrice case par case, avec deux boucles imbriquées",
            code: `for i in range(len(M)):\n    for j in range(len(M[i])):\n        print(M[i][j])` },
          { sait: "construire une matrice par compréhensions imbriquées",
            code: `[[0 for j in range(3)] for i in range(2)]` },
        ],
        pieges: `<code>M[0][2]</code> et <code>M[2][0]</code> ne désignent pas la même case,
          et <code>len(M)</code> compte les lignes, pas les colonnes.`,
      },
      {
        titre: "Ce qui se passe en mémoire",
        seances: ["s06"],
        savoirs: [
          { sait: `expliquer pourquoi les indices commencent à 0 : un indice dit
              <strong>combien de cases sauter</strong> depuis le début du bloc` },
          { sait: "reconnaître deux <strong>alias</strong> : deux noms pour la même liste",
            code: `M = L          # un alias : M[0] = 100 modifie aussi L` },
          { sait: "distinguer <code>==</code> (même contenu) et <code>is</code> (même objet)",
            code: `L == N         # les contenus sont-ils égaux ?\nL is M         # est-ce la même liste ?` },
          { sait: "copier vraiment une liste, et une matrice ligne par ligne",
            code: `C = L.copy()\nN = [ligne.copy() for ligne in M]` },
          { sait: "savoir qu'une fonction qui reçoit une liste peut la modifier, et choisir entre modifier et renvoyer du neuf" },
        ],
        pieges: `<ul>
            <li><code>M = L</code> ne copie <strong>jamais</strong> une liste ;</li>
            <li><code>M.copy()</code> sur une matrice laisse les lignes partagées : c'est une copie superficielle.</li>
          </ul>`,
      },
    ],

    suite: `<strong>L'image à garder :</strong> une variable est une étiquette collée
      sur une liste, pas une boîte qui la contient. <code>M = L</code> colle une seconde
      étiquette sur la même liste.`,
  },

  /* ===================================== PARTIE 3 — PREMIERS ALGORITHMES */
  algorithmes: {
    titre: "Premiers algorithmes",
    accroche: `Les algorithmes de référence du programme, tous construits sur un
      parcours. Tu dois savoir les écrire en pseudo-code et en Python, sans
      <code>in</code>, <code>index()</code>, <code>max()</code> ni <code>sum()</code>.`,

    sections: [
      {
        titre: "De l'algorithme au programme",
        seances: ["s07"],
        savoirs: [
          { sait: "dérouler un algorithme à la main, en dressant le tableau d'évolution de ses variables" },
          { sait: "traduire un pseudo-code en Python, ligne par ligne",
            code: `x ← 0                  →  x = 0\nTant que r ≠ 0 :       →  while r != 0:\nreste de a par b       →  a % b\nRenvoyer b             →  return b` },
          { sait: "choisir <code>while</code> quand on ne connaît que la condition d'arrêt, <code>for</code> quand on connaît le nombre de tours" },
        ],
        pieges: `Dans une boucle <code>while</code>, la variable de la condition doit évoluer,
          sinon la boucle est infinie. Et l'ordre de deux affectations qui dépendent l'une
          de l'autre compte.`,
      },
      {
        titre: "Parcours total, parcours partiel",
        seances: ["s08"],
        savoirs: [
          { sait: "distinguer un parcours <strong>total</strong> (tout lire) d'un parcours <strong>partiel</strong> (s'arrêter dès qu'on a trouvé)" },
          { sait: "rechercher une occurrence : <code>return True</code> dans la boucle, <code>return False</code> après",
            code: `def recherche(tableau, valeur):\n    for element in tableau:\n        if element == valeur:\n            return True\n    return False` },
          { sait: "écrire le même parcours partiel avec <code>while</code>, en testant l'indice en premier",
            code: `i = 0\nwhile i < len(tableau) and tableau[i] != valeur:\n    i = i + 1\nreturn i < len(tableau)` },
          { sait: "compter les occurrences d'une valeur",
            code: `compteur = 0\nfor element in tableau:\n    if element == valeur:\n        compteur = compteur + 1` },
        ],
        pieges: `<ul>
            <li>un <code>else: return False</code> dans la boucle ne regarde que la première case ;</li>
            <li>tester <code>tableau[i]</code> avant <code>i &lt; len(tableau)</code> provoque une <code>IndexError</code>.</li>
          </ul>`,
      },
      {
        titre: "Où se trouve la valeur ?",
        seances: ["s09"],
        savoirs: [
          { sait: "renvoyer l'indice de la première occurrence, ou <code>-1</code> si la valeur est absente",
            code: `for i in range(len(tableau)):\n    if tableau[i] == valeur:\n        return i\nreturn -1` },
          { sait: "tester la convention <code>-1</code> avant d'utiliser le résultat",
            code: `position = premier_indice(notes, 20)\nif position == -1:\n    print("Absente")` },
          { sait: "construire la liste de toutes les positions, vide si la valeur est absente",
            code: `positions = []\nfor i in range(len(tableau)):\n    if tableau[i] == valeur:\n        positions.append(i)` },
          { sait: "connaître <code>in</code>, <code>index()</code> et <code>count()</code>, et savoir que <code>index()</code> plante si la valeur est absente" },
        ],
      },
      {
        titre: "Extremum et moyenne",
        seances: ["s10"],
        savoirs: [
          { sait: "chercher un maximum ou un minimum, le record partant du <strong>premier élément</strong>",
            code: `maxi = tableau[0]\nfor element in tableau:\n    if element > maxi:\n        maxi = element` },
          { sait: "trouver la <strong>position</strong> du record en mémorisant son indice",
            code: `indice_record = 0\nfor i in range(len(tableau)):\n    if tableau[i] > tableau[indice_record]:\n        indice_record = i` },
          { sait: "calculer une moyenne, en divisant après la boucle",
            code: `total = 0\nfor element in tableau:\n    total = total + element\nmoyenne = total / len(tableau)` },
        ],
        pieges: `Un record initialisé à 0 donne un résultat faux dès que toutes les valeurs
          sont négatives. Et un tableau vide n'a ni maximum ni moyenne.`,
      },
    ],

    suite: `<strong>La question qui décide de tout :</strong> peut-on répondre avant
      d'avoir tout lu ? Si oui, parcours partiel ; si non, parcours total.`,
  },

  /* ========================================== PARTIE 4 — LES CHAÎNES */
  chaines: {
    titre: "Les chaînes de caractères",
    accroche: `Une chaîne se lit comme une liste, mais ne se modifie jamais. Voici ce
      que tu dois savoir faire sur les chaînes à la fin du chapitre.`,

    sections: [
      {
        titre: "Une chaîne est une séquence",
        seances: ["s11"],
        savoirs: [
          { sait: "lire la longueur et les caractères d'une chaîne, comme pour une liste",
            code: `mot = "PYTHON"\nlen(mot)       # 6\nmot[0]         # "P"\nmot[-1]        # "N"` },
          { sait: `savoir qu'une chaîne est <strong>immuable</strong>, et fabriquer une
              nouvelle chaîne au lieu de la modifier`,
            code: `nouveau = "C" + mot[1:]      # "CYTHON"` },
          { sait: "concaténer avec <code>+</code>, répéter avec <code>*</code>, convertir un nombre avec <code>str()</code>",
            code: `prenom + " " + nom\n"-" * 20\n"J'ai " + str(17) + " ans"` },
          { sait: "parcourir une chaîne, et y chercher une sous-chaîne avec <code>in</code>",
            code: `for lettre in mot:\n    if lettre in "aeiouy":\n        compteur = compteur + 1` },
          { sait: "construire une chaîne avec un accumulateur qui part de la chaîne vide",
            code: `resultat = ""\nfor lettre in mot:\n    resultat = lettre + resultat     # le mot à l'envers` },
        ],
        pieges: `<ul>
            <li><code>mot[0] = "C"</code> provoque une <code>TypeError</code> ;</li>
            <li><code>"J'ai " + 17</code> aussi : il faut convertir le nombre.</li>
          </ul>`,
      },
      {
        titre: "Découper et chiffrer",
        seances: ["s12"],
        savoirs: [
          { sait: "extraire un morceau avec une tranche, la fin étant exclue",
            code: `mot[1:4]       # "YTH" : indices 1, 2, 3` },
          { sait: "utiliser les bornes omises, les indices négatifs et le pas",
            code: `mot[:2]   mot[2:]   mot[-3:]   mot[::2]   mot[::-1]` },
          { sait: "appliquer les tranches aux listes",
            code: `classement[:3]      # les trois premiers\nL[:]                # une copie` },
          { sait: "décaler une lettre dans l'alphabet, avec retour au début grâce au modulo",
            code: `ALPHABET[(rang(lettre) + decalage) % 26]` },
        ],
        pieges: `<code>mot[n:]</code> part de l'indice n, tandis que <code>mot[-n:]</code>
          donne les n derniers caractères.`,
      },
    ],

    suite: `<strong>Les trois idées du chapitre :</strong> l'accumulateur (avant, dans,
      après la boucle) ; modifiable ou non (une liste se modifie et se partage, une
      chaîne jamais) ; et tout finit par un parcours, car l'ordinateur lit les cases
      une à une.`,
  },
};

/* Bilans de fin de partie — NSI Première, chapitre 6 « Types construits ».
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

  /* ================================================ PARTIE 1 — P-UPLETS */
  puplets: {
    titre: "Les p-uplets",
    accroche: `Créer, lire, remplacer, renvoyer, déballer : voici ce que tu dois savoir
      faire avec un p-uplet, sans hésiter, avant de passer aux dictionnaires.`,

    sections: [
      {
        titre: "Créer et lire un p-uplet",
        seances: ["s01"],
        savoirs: [
          { sait: "créer un p-uplet avec des parenthèses et des virgules, y compris d'une seule composante",
            code: `eleve = ("Alice", 16, 15.5)\nseul = (5,)       # la virgule est obligatoire\nvide = ()` },
          { sait: "lire une composante par son <strong>indice</strong>, positif ou négatif",
            code: `eleve[0]      # "Alice"\neleve[-1]     # 15.5` },
          { sait: "connaître la longueur et tester une appartenance",
            code: `len(eleve)        # 3\n16 in eleve       # True` },
          { sait: "concaténer, répéter, et lire dans un p-uplet imbriqué",
            code: `(1, 2) + ("a",)            # (1, 2, 'a')\n2 * (1, 2)                 # (1, 2, 1, 2)\n((0, 0), (4, 3))[1][0]     # 4` },
        ],
        pieges: `<ul>
            <li><code>(5)</code> est l'entier 5 : c'est la virgule qui fait le p-uplet ;</li>
            <li>on crée avec des parenthèses, mais on lit avec des crochets : <code>t[0]</code>, jamais <code>t(0)</code>.</li>
          </ul>`,
      },
      {
        titre: "Un p-uplet ne se modifie pas",
        seances: ["s02"],
        savoirs: [
          { sait: "expliquer qu'un p-uplet est <strong>immuable</strong>, et reconnaître l'erreur provoquée",
            code: `t[0] = 5      # TypeError: 'tuple' object does not support item assignment` },
          { sait: "« modifier » une variable en lui donnant un <strong>nouveau</strong> p-uplet",
            code: `t = t + (4,)              # un nouvel objet : id(t) a changé\njoueur = (joueur[0], 12)` },
          { sait: "passer par une liste avec <code>list()</code> et <code>tuple()</code>",
            code: `L = list(t)\nL[0] = 100\nt = tuple(L)` },
        ],
        pieges: `<ul>
            <li>calculer <code>t + (4,)</code> sans ranger le résultat ne change rien à <code>t</code> ;</li>
            <li><code>t + 4</code> est une <code>TypeError</code> : on ne concatène qu'un p-uplet, <code>(4,)</code>.</li>
          </ul>`,
      },
      {
        titre: "Renvoyer plusieurs valeurs",
        seances: ["s03"],
        savoirs: [
          { sait: "écrire une fonction qui renvoie un p-uplet",
            code: `def division_euclidienne(a, b):\n    return a // b, a % b` },
          { sait: "<strong>déballer</strong> le résultat dans autant de variables que de composantes",
            code: `q, r = division_euclidienne(17, 5)    # q vaut 3, r vaut 2\nx, y = point` },
          { sait: "échanger deux variables en une ligne",
            code: `a, b = b, a` },
          { sait: "calculer plusieurs résultats en un seul parcours, et les renvoyer ensemble",
            code: `return (mini, maxi, total / len(tableau))` },
        ],
        pieges: `<ul>
            <li>deux <code>return</code> à la suite : le second n'est jamais atteint ;</li>
            <li>trois variables pour deux composantes : <code>ValueError: not enough values to unpack</code>.</li>
          </ul>`,
      },
    ],
    suite: `Un p-uplet range des valeurs par <strong>position</strong>. Dans la partie
      suivante, le dictionnaire les range par <strong>nom</strong>.`,
  },

  /* =========================================== PARTIE 2 — DICTIONNAIRES */
  dictionnaires: {
    titre: "Les dictionnaires",
    accroche: `Créer, lire sans risque, modifier, parcourir, compter : voici ce que tu
      dois savoir faire avec un dictionnaire avant d'organiser de vraies données.`,

    sections: [
      {
        titre: "Créer et lire un dictionnaire",
        seances: ["s04"],
        savoirs: [
          { sait: "créer un dictionnaire de couples <code>clé: valeur</code>, et le dictionnaire vide",
            code: `eleve = {"nom": "Alice", "age": 16}\nvide = {}` },
          { sait: "lire une valeur par sa <strong>clé</strong>, et compter les entrées",
            code: `eleve["nom"]      # "Alice"\nlen(eleve)        # 2` },
          { sait: "tester la présence d'une <strong>clé</strong> avant de la lire, ou lire avec une valeur de repli",
            code: `if "ville" in eleve:\n    print(eleve["ville"])\neleve.get("ville", "inconnue")` },
          { sait: "savoir qu'une clé doit être immuable : texte, nombre, p-uplet",
            code: `grille = {(0, 0): "départ", (3, 4): "arrivée"}` },
        ],
        pieges: `<ul>
            <li><code>d[0]</code> cherche la clé 0 : un dictionnaire n'a pas d'indices ;</li>
            <li><code>in</code> ne regarde que les clés, jamais les valeurs ;</li>
            <li>une liste ne peut pas être une clé : <code>TypeError: unhashable type</code>.</li>
          </ul>`,
      },
      {
        titre: "Modifier un dictionnaire",
        seances: ["s05"],
        savoirs: [
          { sait: "ajouter une entrée ou modifier une valeur avec la même écriture",
            code: `notes["Chloé"] = 17               # la clé n'existe pas : ajout\nnotes["Bob"] = notes["Bob"] + 2   # elle existe : modification` },
          { sait: "supprimer une entrée avec <code>del</code>, sans erreur si elle est absente",
            code: `if "Bob" in notes:\n    del notes["Bob"]` },
        ],
        pieges: `<ul>
            <li>écrire deux fois la même clé : la seconde valeur écrase la première, sans message ;</li>
            <li><code>==</code> au lieu de <code>=</code> : on compare au lieu d'affecter.</li>
          </ul>`,
      },
      {
        titre: "Parcourir un dictionnaire",
        seances: ["s06"],
        savoirs: [
          { sait: "parcourir les clés, les valeurs, ou les entrées",
            code: `for nom in notes:                    # les clés\nfor note in notes.values():          # les valeurs\nfor nom, note in notes.items():      # les deux` },
          { sait: "construire un <strong>nouveau</strong> dictionnaire dans une boucle, sans modifier celui qu'on lit",
            code: `resultat = {}\nfor cle, valeur in d.items():\n    resultat[valeur] = cle` },
        ],
        pieges: `<ul>
            <li><code>for cle, v in d:</code> sans <code>.items()</code> : le déballage échoue ;</li>
            <li><code>resultat = d1</code> ne copie rien : modifier <code>resultat</code>, c'est modifier <code>d1</code>.</li>
          </ul>`,
      },
      {
        titre: "Compter des occurrences",
        seances: ["s07"],
        savoirs: [
          { sait: "appliquer le schéma <strong>tester la clé, puis incrémenter ou créer</strong>",
            code: `compteurs = {}\nfor lettre in texte:\n    if lettre in compteurs:\n        compteurs[lettre] = compteurs[lettre] + 1\n    else:\n        compteurs[lettre] = 1` },
          { sait: "regrouper des éléments dans des listes avec le même schéma",
            code: `if initiale in groupes:\n    groupes[initiale].append(mot)\nelse:\n    groupes[initiale] = [mot]` },
          { sait: "chercher l'entrée record d'un comptage",
            code: `for lettre, n in compteurs.items():\n    if n > record:\n        record = n\n        lettre_record = lettre` },
        ],
        pieges: `<ul>
            <li>oublier le <code>else</code> : le compteur est remis à 1 juste après avoir été augmenté ;</li>
            <li>un <code>return</code> dans la boucle : la fonction s'arrête au premier caractère.</li>
          </ul>`,
      },
    ],
    suite: `Le schéma « tester la clé, puis incrémenter ou créer » est le plus utile du
      chapitre : il resservira bien au-delà.`,
  },

  /* ==================================== PARTIE 3 — ORGANISER DES DONNÉES */
  organiser: {
    titre: "Organiser des données",
    accroche: `Emboîter les structures et choisir la bonne : voici ce que tu dois savoir
      faire avant le projet Secret Santa et le chapitre sur les tables de données.`,

    sections: [
      {
        titre: "Des structures imbriquées",
        seances: ["s08"],
        savoirs: [
          { sait: "lire dans une <strong>liste d'enregistrements</strong> (une table) : l'indice, puis la clé",
            code: `classe[1]["moyenne"]\nfor fiche in classe:\n    print(fiche["nom"])` },
          { sait: "lire et compléter un <strong>dictionnaire de dictionnaires</strong> : la clé, puis la clé",
            code: `eleves["Alice"]["moyenne"]\neleves["Chloé"] = {"age": 16, "moyenne": 18}` },
          { sait: "modifier une liste rangée comme valeur, sans réaffecter",
            code: `notes["Alice"].append(17)` },
        ],
        pieges: `<ul>
            <li>sauter un niveau : <code>eleves["moyenne"]</code> cherche un élève nommé « moyenne » ;</li>
            <li>dans <code>for fiche in classe</code>, on lit <code>fiche["nom"]</code>, pas <code>classe["nom"]</code>.</li>
          </ul>`,
      },
      {
        titre: "Choisir la bonne structure",
        seances: ["s09"],
        savoirs: [
          { sait: "choisir un <strong>p-uplet</strong> pour quelques valeurs de rôles fixés, qui ne changent pas",
            code: `point = (4, -2)\nreturn q, r` },
          { sait: "choisir une <strong>liste</strong> pour beaucoup de valeurs de même nature, dans un ordre",
            code: `temperatures = [12.5, 14.0, 17.5]` },
          { sait: "choisir un <strong>dictionnaire</strong> pour retrouver une valeur par un nom",
            code: `repertoire = {"Léa": "06 12 34 56 78"}\ntirs = {(3, 4): "touché"}` },
        ],
        pieges: `<ul>
            <li>une liste pour un répertoire : chaque recherche parcourt tout ;</li>
            <li>un p-uplet pour des données qui évoluent : il faut tout reconstruire.</li>
          </ul>`,
      },
    ],
    suite: `Le chapitre est terminé. Place au projet <strong>Secret Santa</strong>, qui
      réunit p-uplets, listes et dictionnaires.`,
  },
};

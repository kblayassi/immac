/* NSI — chapitre 4, séance 9 : où se trouve la valeur ?
 * Reprend les sections 3 et 4 de « Premiers algorithmes » (indice de la première
 * occurrence, convention -1, outils de Python, liste de toutes les occurrences)
 * et l'exercice 16.
 */

export default {
  id: "s09",
  numero: 9,
  titre: "Où se trouve la valeur ?",
  sousTitre: "Indice de la première occurrence, liste de toutes les occurrences",
  palier: "Partie 3 — Premiers algorithmes",

  accroche: `Savoir qu'une valeur est présente, c'est bien ; savoir <strong>où</strong>,
    c'est mieux. Cette fois, nos fonctions ne renverront plus un simple oui ou non,
    mais une <strong>position</strong> — ou toutes les positions d'une valeur qui
    revient plusieurs fois.`,

  objectifs: [
    "renvoyer l'<strong>indice</strong> de la première occurrence d'une valeur",
    "signaler une absence avec la convention <code>-1</code>, et la tester",
    "connaître <code>in</code>, <code>index()</code> et <code>count()</code>, et leurs limites",
    "construire la liste de <strong>toutes</strong> les positions d'une valeur",
  ],

  motDeLaFin: `Tu sais trouver une valeur et toutes ses positions. À la séance 10, dernier
    type de recherche : le record. La plus grande valeur, la plus petite, leur
    position, et la moyenne.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 35,
      etoiles: 1,
      intention: "on avance ensemble, une idée à la fois",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "D'un booléen à une position",
          contenu: `
            <p>Pour renvoyer une <strong>position</strong>, il faut la connaître pendant le
            parcours : on parcourt donc le tableau <strong>par indice</strong>. Le schéma
            reste celui du parcours partiel, mais on renvoie <code>i</code> au lieu de
            <code>True</code> :</p>

            <pre class="bloc-code"><code>Pour i allant de 0 à longueur(tableau) - 1 :
    Si tableau[i] vérifie la condition :
        Renvoyer i           ← la position de la première case trouvée
    Fin Si
Fin Pour
Renvoyer -1                  ← aucune case trouvée</code></pre>

            <div class="encadre">
              <span class="chapo">La convention -1</span>
              Il faut bien renvoyer <strong>quelque chose</strong> quand rien n'est trouvé.
              On choisit une valeur qui ne peut <strong>jamais</strong> être un indice
              valide : comme les indices vont de 0 à n − 1, la valeur −1 est impossible…
              et donc parfaite pour signaler l'échec. C'est une convention très répandue
              en informatique.
            </div>`,
        },

        {
          id: "d2",
          type: "qcm",
          titre: "Pourquoi pas 0 ?",
          contenu: `<p>Une élève propose de renvoyer <code>0</code> quand la valeur
            cherchée est absente, « parce que 0, c'est rien ».</p>`,
          question: "Pourquoi est-ce une mauvaise idée ?",
          options: [
            { texte: "parce que 0 provoque une erreur quand on le renvoie",
              explication: "Renvoyer 0 est parfaitement possible : le problème n'est pas là." },
            { texte: "parce que 0 est un indice valide : on ne saurait plus si la valeur est absente ou dans la première case", correct: true,
              explication: "Oui : une fonction qui renvoie 0 pourrait vouloir dire « dans la case d'indice 0 ». Le signal d'absence doit être une valeur qui n'est jamais un indice." },
            { texte: "parce que la fonction doit renvoyer un booléen",
              explication: "Cette fonction renvoie un indice, donc un entier : le signal d'absence doit être un entier, lui aussi." },
            { texte: "ce n'est pas une mauvaise idée",
              explication: "Essaie avec une valeur placée dans la première case : la fonction renverrait 0… comme si elle était absente." },
          ],
          apres: `<span class="chapo">Une valeur impossible</span>
            Un signal d'échec doit pouvoir se distinguer de toutes les réponses normales.
            −1 n'est jamais une position : il ne prête à aucune confusion.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Le premier jour de gel",
          contenu: `
            <p>Écris la fonction <code>premier_negatif(tableau)</code>, qui renvoie
            l'<strong>indice</strong> du premier élément strictement négatif, ou
            <code>-1</code> s'il n'y en a aucun.</p>
            <pre class="bloc-code"><code>premier_negatif([4, 2, -3, 0, -5])    # renvoie 2
premier_negatif([4, 2, 7])            # renvoie -1</code></pre>`,
          depart: `def premier_negatif(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*tableau\\s*\\)\\s*\\)", message: "Pour renvoyer une position, parcours les indices : range(len(tableau))." },
              { motif: "return\\s+-\\s*1", message: "Après la boucle, renvoie -1 pour signaler qu'aucun négatif n'a été trouvé." },
            ],
            tests: `assert premier_negatif([4, 2, -3, 0, -5]) == 2, "premier_negatif([4, 2, -3, 0, -5]) doit renvoyer 2"\nassert premier_negatif([4, 2, 7]) == -1, "sans négatif, la fonction renvoie -1"\nassert premier_negatif([-1, 5]) == 0, "le premier négatif peut être dans la case d'indice 0"\nassert premier_negatif([3, 3, 3, -8]) == 3, "il peut être dans la dernière case"`,
          },
          felicitation: "Une position, ou -1 : la réponse dit où, pas seulement si. 📍",
          indices: [
            "Une boucle sur les indices ; dans la boucle, un <code>if</code> qui teste si <code>tableau[i]</code> est plus petit que 0.",
            "Dans ce <code>if</code>, on renvoie l'indice du tour ; après la boucle, la valeur conventionnelle de l'échec.",
          ],
          solution: `def premier_negatif(tableau):\n    for i in range(len(tableau)):\n        if tableau[i] < 0:\n            return i\n    return -1\n`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Tester la convention",
          contenu: `
            <p>La fonction <code>premier_negatif</code> est déjà écrite. Écris la fonction
            <code>message_gel(releve)</code>, qui renvoie l'une de ces deux phrases selon
            le résultat de <code>premier_negatif</code> :</p>
            <pre class="bloc-code"><code>message_gel([4, 2, 1, -3, 0])    # renvoie "Premier jour de gel : indice 3"
message_gel([4, 2, 1])           # renvoie "Aucun jour de gel"</code></pre>`,
          depart: `def premier_negatif(tableau):\n    for i in range(len(tableau)):\n        if tableau[i] < 0:\n            return i\n    return -1\n\n\ndef message_gel(releve):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+message_gel[\\s\\S]*\\bpremier_negatif\\s*\\(", message: "message_gel doit appeler premier_negatif." },
              { motif: "[!=]=\\s*-\\s*1", message: "Compare le résultat de premier_negatif à -1." },
            ],
            tests: `assert message_gel([4, 2, 1, -3, 0]) == "Premier jour de gel : indice 3", "avec un gel à l'indice 3, la phrase doit être : Premier jour de gel : indice 3"\nassert message_gel([4, 2, 1]) == "Aucun jour de gel", "sans gel, la phrase doit être : Aucun jour de gel"\nassert message_gel([-2]) == "Premier jour de gel : indice 0", "un gel à l'indice 0 n'est pas une absence"`,
          },
          felicitation: "Tu testes -1 avant de t'en servir : c'est le bon réflexe. ❄️",
          indices: [
            "Range le résultat de <code>premier_negatif(releve)</code> dans une variable, puis teste s'il vaut -1.",
            "Dans un cas, renvoie la phrase fixe ; dans l'autre, une f-string qui insère la position.",
          ],
          solution: `def premier_negatif(tableau):\n    for i in range(len(tableau)):\n        if tableau[i] < 0:\n            return i\n    return -1\n\n\ndef message_gel(releve):\n    position = premier_negatif(releve)\n    if position == -1:\n        return "Aucun jour de gel"\n    return f"Premier jour de gel : indice {position}"\n`,
          apres: `<span class="chapo">Toujours tester avant d'utiliser</span>
            Une fonction qui renvoie -1 en cas d'échec oblige l'appelant à le tester.
            Sans ce test, <code>releve[position]</code> lirait en silence le
            <strong>dernier</strong> élément : <code>releve[-1]</code> est un indice
            valide en Python.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Les outils de Python",
          contenu: `
            <p>Python sait déjà répondre à ces questions :</p>

            <pre class="bloc-code"><code>notes = [12, 15, 8, 15]
print(15 in notes)        # True : la recherche d'une occurrence
print(notes.index(15))    # 1    : l'indice de la première occurrence
print(notes.count(15))    # 2    : le nombre d'occurrences</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">index() ne renvoie pas -1</span>
              Contrairement à nos fonctions, <code>index()</code> provoque une
              <strong>erreur</strong> si la valeur est absente. Il faut donc vérifier la
              présence avec <code>in</code> avant de l'appeler.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Utiliser, et savoir réécrire</span>
              Sers-toi de ces outils dans tes programmes… mais sache
              <strong>toujours</strong> réécrire l'algorithme correspondant : c'est lui
              qui est évalué à l'épreuve.
            </div>`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "index() sur une valeur absente",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `notes = [12, 15, 8, 15]\nprint(notes.index(20))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>-1</code>",
              explication: "C'est la convention de <strong>nos</strong> fonctions, pas celle de <code>index()</code>." },
            { texte: "<code>None</code>",
              explication: "<code>index()</code> ne renvoie pas « rien » : il refuse." },
            { texte: "une erreur <code>ValueError</code>", correct: true,
              explication: "Oui : 20 n'est pas dans la liste, et <code>index()</code> s'arrête avec <code>ValueError: 20 is not in list</code>." },
            { texte: "<code>4</code>",
              explication: "<code>index()</code> ne renvoie pas la position « suivante » : il cherche une valeur qui n'existe pas." },
          ],
          apres: `<span class="chapo">Deux conventions pour un échec</span>
            Signaler un échec par une valeur impossible (−1) ou par une erreur : les deux
            existent. Avec <code>index()</code>, on écrit d'abord
            <code>if 20 in notes:</code>.`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Toutes les occurrences",
          contenu: `
            <p>Une valeur peut apparaître plusieurs fois, et <code>index()</code> ne donne
            que la première position. Pour les obtenir <strong>toutes</strong>,
            impossible de s'arrêter en route : c'est un <strong>parcours total</strong>.</p>

            <p>La réponse n'est plus un indice, mais un <strong>tableau d'indices</strong>.
            L'accumulateur est donc une liste, préparée vide, et remplie au fil du
            parcours :</p>

            <pre class="bloc-code"><code>positions ← tableau vide
Pour i allant de 0 à longueur(tableau) - 1 :
    Si tableau[i] vérifie la condition :
        Ajouter i à positions
    Fin Si
Fin Pour
Renvoyer positions</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le cas « aucune occurrence »</span>
              Pas besoin de convention ici : si rien n'est trouvé, la fonction renvoie tout
              naturellement une <strong>liste vide</strong> <code>[]</code>.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Les jours de pluie",
          contenu: `
            <p>Écris la fonction <code>jours_de_pluie(releves)</code>, qui renvoie la liste
            des <strong>indices</strong> des jours où il a plu, c'est-à-dire où le relevé
            est strictement positif.</p>
            <pre class="bloc-code"><code>jours_de_pluie([0, 3, 0, 12, 5, 0, 1])    # renvoie [1, 3, 4, 6]
jours_de_pluie([0, 0])                    # renvoie []</code></pre>`,
          depart: `def jours_de_pluie(releves):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*releves\\s*\\)\\s*\\)", message: "Pour collecter des positions, parcours les indices : range(len(releves))." },
            ],
            tests: `assert jours_de_pluie([0, 3, 0, 12, 5, 0, 1]) == [1, 3, 4, 6], "jours_de_pluie([0, 3, 0, 12, 5, 0, 1]) doit renvoyer [1, 3, 4, 6]"\nassert jours_de_pluie([0, 0]) == [], "sans pluie, la liste renvoyée est vide"\nassert jours_de_pluie([2]) == [0], "jours_de_pluie([2]) doit renvoyer [0]"`,
          },
          felicitation: "Un parcours total, et une liste qui collecte les positions. 🌧️",
          indices: [
            "L'accumulateur est une liste vide, préparée avant la boucle et renvoyée après.",
            "Dans la boucle sur les indices, on ajoute <code>i</code> — et non le relevé — quand <code>releves[i]</code> est positif.",
          ],
          solution: `def jours_de_pluie(releves):\n    positions = []\n    for i in range(len(releves)):\n        if releves[i] > 0:\n            positions.append(i)\n    return positions\n`,
        },

        {
          id: "d9",
          type: "prediction",
          titre: "La même chose en compréhension",
          contenu: `<p>Une collecte d'indices s'écrit aussi en une ligne. Lis ce programme
            sans l'exécuter.</p>`,
          code: `L = [12, 5, 18, 7, 11]\nprint([i for i in range(len(L)) if L[i] > 10])`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[12, 18, 11]</code>",
              explication: "L'expression de la compréhension est <code>i</code>, l'indice : on collecte les positions, pas les valeurs." },
            { texte: "<code>[0, 2, 4]</code>", correct: true,
              explication: "Oui : les valeurs supérieures à 10 sont aux indices 0, 2 et 4, et ce sont ces indices qu'on range dans la liste." },
            { texte: "<code>[1, 3, 5]</code>",
              explication: "Les indices commencent à 0 : 12 est à l'indice 0." },
            { texte: "<code>3</code>",
              explication: "Une compréhension fabrique une liste, pas un compte." },
          ],
          apres: `<span class="chapo">Sache lire les deux écritures</span>
            La boucle avec <code>append()</code> et la compréhension font exactement le
            même travail. L'expression placée en tête dit ce qu'on collecte : ici
            l'indice <code>i</code>, et non la valeur <code>L[i]</code>.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># la première position : parcours partiel, -1 si absent
for i in range(len(tableau)):
    if tableau[i] == valeur:
        return i
return -1

# toutes les positions : parcours total, [] si absent
positions = []
for i in range(len(tableau)):
    if tableau[i] == valeur:
        positions.append(i)
return positions</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris mon algorithme</th><th>Python le fait avec</th></tr>
              <tr><td>savoir si la valeur est présente</td><td>parcours partiel, booléen</td><td><code>valeur in L</code></td></tr>
              <tr><td>la première position</td><td>parcours partiel, indice ou -1</td><td><code>L.index(valeur)</code> (erreur si absente)</td></tr>
              <tr><td>toutes les positions</td><td>parcours total, liste d'indices</td><td>—</td></tr>
              <tr><td>le nombre d'occurrences</td><td>parcours total, compteur</td><td><code>L.count(valeur)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>parcourir par élément quand on doit renvoyer une position : on n'a pas l'indice ;</li>
                <li>utiliser le résultat sans tester -1 : <code>L[-1]</code> lit le dernier élément ;</li>
                <li>ajouter <code>tableau[i]</code> au lieu de <code>i</code> dans la liste des positions.</li>
              </ul>
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
          type: "qcm",
          titre: "Trois recherches",
          contenu: `<p>La fonction <code>premier_indice(tableau, valeur)</code> renvoie
            l'indice de la première occurrence de <code>valeur</code>, ou -1 si elle est
            absente. On l'appelle sur ce tableau :</p>`,
          code: `T = [7, 3, 7, 7, 1]\n\npremier_indice(T, 7)\npremier_indice(T, 1)\npremier_indice(T, 5)`,
          question: "Que renvoient ces trois appels, dans l'ordre ?",
          options: [
            { texte: "0, 4 et -1", correct: true,
              explication: "Oui : le premier 7 est à l'indice 0, le 1 à l'indice 4, et 5 est absent." },
            { texte: "3, 4 et -1",
              explication: "La recherche s'arrête à la <strong>première</strong> occurrence : le 7 d'indice 0." },
            { texte: "0, 4 et 0",
              explication: "0 est un indice valide : il ne peut pas signaler une absence." },
            { texte: "1, 5 et -1",
              explication: "Les indices commencent à 0 : le premier élément est à l'indice 0." },
          ],
          apres: `<span class="chapo">La première, seulement</span>
            Le 7 apparaît trois fois, mais <code>premier_indice</code> s'arrête dès le
            premier : c'est un parcours partiel.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "L'indice de la première occurrence",
          contenu: `
            <p>Écris la fonction <code>premier_indice(tableau, valeur)</code>, qui renvoie
            l'indice de la première occurrence de <code>valeur</code>, ou <code>-1</code>
            si elle est absente.</p>
            <pre class="bloc-code"><code>premier_indice([7, 3, 7, 7, 1], 7)    # renvoie 0
premier_indice([7, 3, 7, 7, 1], 5)    # renvoie -1</code></pre>`,
          depart: `def premier_indice(tableau, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*tableau\\s*\\)\\s*\\)|\\bwhile\\b", message: "Pour renvoyer une position, parcours les indices." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*index\\s*\\(", message: "Pas d'index() : c'est ce que tu reprogrammes." },
            ],
            tests: `assert premier_indice([7, 3, 7, 7, 1], 7) == 0, "premier_indice([7, 3, 7, 7, 1], 7) doit renvoyer 0"\nassert premier_indice([7, 3, 7, 7, 1], 1) == 4, "premier_indice([7, 3, 7, 7, 1], 1) doit renvoyer 4"\nassert premier_indice([7, 3, 7, 7, 1], 5) == -1, "une valeur absente donne -1"\nassert premier_indice([], 2) == -1, "dans un tableau vide, la valeur est absente"\nassert premier_indice([4, 9, 9], 9) == 1, "premier_indice([4, 9, 9], 9) doit renvoyer 1"`,
          },
          felicitation: "Tu viens de reprogrammer index(), en plus prudent. 📍",
          indices: [
            "C'est le schéma de <code>premier_negatif</code>, avec une condition d'égalité à <code>valeur</code>.",
            "Dans la boucle sur les indices, renvoie <code>i</code> dès que la case vaut <code>valeur</code> ; après la boucle, renvoie la valeur d'échec.",
          ],
          solution: `def premier_indice(tableau, valeur):\n    for i in range(len(tableau)):\n        if tableau[i] == valeur:\n            return i\n    return -1\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Toutes les occurrences",
          contenu: `
            <p>Écris la fonction <code>indices_occurrences(tableau, valeur)</code>, qui
            renvoie la liste des indices de <strong>toutes</strong> les occurrences de
            <code>valeur</code>.</p>
            <pre class="bloc-code"><code>indices_occurrences([12, 15, 8, 15, 15], 15)    # renvoie [1, 3, 4]
indices_occurrences([12, 15, 8, 15, 15], 20)    # renvoie []</code></pre>`,
          depart: `def indices_occurrences(tableau, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*tableau\\s*\\)\\s*\\)", message: "Pour collecter des positions, parcours les indices : range(len(tableau))." },
            ],
            tests: `assert indices_occurrences([12, 15, 8, 15, 15], 15) == [1, 3, 4], "indices_occurrences([12, 15, 8, 15, 15], 15) doit renvoyer [1, 3, 4]"\nassert indices_occurrences([12, 15, 8, 15, 15], 20) == [], "une valeur absente donne une liste vide"\nassert indices_occurrences([7, 3, 7, 7, 1], 7) == [0, 2, 3], "indices_occurrences([7, 3, 7, 7, 1], 7) doit renvoyer [0, 2, 3]"\nassert indices_occurrences([], 1) == [], "un tableau vide donne une liste vide"`,
          },
          felicitation: "Une liste d'indices, vide si besoin : aucune convention à retenir. 🔍",
          indices: [
            "C'est le schéma de <code>jours_de_pluie</code>, avec une condition d'égalité à <code>valeur</code>.",
            "Une liste vide avant la boucle ; dans la boucle, on y ajoute l'indice quand la case vaut <code>valeur</code> ; on la renvoie après.",
          ],
          solution: `def indices_occurrences(tableau, valeur):\n    positions = []\n    for i in range(len(tableau)):\n        if tableau[i] == valeur:\n            positions.append(i)\n    return positions\n`,
        },

        {
          id: "a4",
          type: "qcm",
          titre: "Lequel s'arrête en route ?",
          contenu: `<p>Tu viens d'écrire <code>premier_indice</code> et
            <code>indices_occurrences</code>.</p>`,
          question: "Quel type de parcours fait chacune ?",
          options: [
            { texte: "les deux font un parcours total",
              explication: "<code>premier_indice</code> renvoie dès la première occurrence trouvée : elle peut s'arrêter avant la fin." },
            { texte: "premier_indice : partiel ; indices_occurrences : total", correct: true,
              explication: "Oui : la première s'arrête dès qu'elle a trouvé. La seconde ne peut pas savoir s'il reste des occurrences sans avoir tout lu." },
            { texte: "premier_indice : total ; indices_occurrences : partiel",
              explication: "C'est l'inverse : pour collecter <strong>toutes</strong> les positions, il faut lire toutes les cases." },
            { texte: "les deux font un parcours partiel",
              explication: "<code>indices_occurrences</code> ne peut jamais s'arrêter avant la fin : une case non lue pourrait encore contenir la valeur." },
          ],
          apres: `<span class="chapo">La question décide du parcours</span>
            « La première » permet de s'arrêter ; « toutes » oblige à aller au bout.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : la dernière occurrence",
          contenu: `
            <p>La fonction <code>dernier_indice</code> devrait renvoyer l'indice de la
            <strong>dernière</strong> occurrence d'une valeur, ou -1 si elle est absente.
            Le programme devrait afficher :</p>
            <pre class="bloc-code"><code>3
-1</code></pre>
            <p>Elle contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-la, lis les messages, et corrige-les une par une.</p>`,
          depart: `def dernier_indice(tableau, valeur):\n    position = 0\n    for i in range(len(tableau)):\n        if tableau[i] = valeur:\n            position = i\n            return position\n    return position\n\n\nprint(dernier_indice([7, 3, 7, 7, 1], 7))\nprint(dernier_indice([7, 3, 7, 7, 1], 5))\n`,
          validation: {
            codeContient: [
              { motif: "position\\s*=\\s*-\\s*1", message: "Si la valeur est absente, position doit valoir -1 : initialise-la à -1." },
            ],
            sortie: "3\n-1",
            tests: `assert dernier_indice([4, 9, 9, 2], 9) == 2, "dernier_indice([4, 9, 9, 2], 9) doit renvoyer 2"\nassert dernier_indice([5], 5) == 0, "dernier_indice([5], 5) doit renvoyer 0"`,
          },
          felicitation: "Un =, une initialisation, un return trop pressé : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : dans un <code>if</code>, on compare avec <code>==</code>.",
            "Ensuite, la fonction renvoie le premier 7, pas le dernier : le <code>return</code> dans la boucle l'arrête trop tôt. Pour la dernière occurrence, il faut tout lire.",
            "Enfin, une valeur absente donne 0 au lieu de -1 : regarde la valeur de départ de <code>position</code>.",
          ],
          solution: `def dernier_indice(tableau, valeur):\n    position = -1\n    for i in range(len(tableau)):\n        if tableau[i] == valeur:\n            position = i\n    return position\n\n\nprint(dernier_indice([7, 3, 7, 7, 1], 7))\nprint(dernier_indice([7, 3, 7, 7, 1], 5))\n`,
          apres: `<span class="chapo">La dernière occurrence : un parcours total</span>
            On ne peut pas savoir qu'une occurrence est la dernière sans avoir lu la suite.
            La variable <code>position</code> est écrasée à chaque occurrence rencontrée :
            à la fin, il ne reste que la dernière.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le carnet d'adresses",
          contenu: `
            <p>Un carnet d'adresses est rangé dans deux listes qui se correspondent case
            par case : <code>noms[i]</code> a pour numéro <code>telephones[i]</code>.</p>
            <p>Écris la fonction <code>numero(noms, telephones, nom)</code>, qui renvoie le
            numéro de <code>nom</code>, ou <code>"inconnu"</code> s'il n'est pas dans le
            carnet.</p>
            <pre class="bloc-code"><code>noms = ["Léa", "Tom", "Inès"]
telephones = ["06 11", "06 22", "06 33"]
numero(noms, telephones, "Tom")     # renvoie "06 22"
numero(noms, telephones, "Zoé")     # renvoie "inconnu"</code></pre>`,
          depart: `def numero(noms, telephones, nom):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "telephones\\s*\\[", message: "Le numéro se lit dans telephones, à la position trouvée dans noms." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*index\\s*\\(", message: "Pas d'index() : cherche la position toi-même." },
            ],
            tests: `_n = ["Léa", "Tom", "Inès"]\n_t = ["06 11", "06 22", "06 33"]\nassert numero(_n, _t, "Tom") == "06 22", "le numéro de Tom est 06 22"\nassert numero(_n, _t, "Léa") == "06 11", "le numéro de Léa est 06 11"\nassert numero(_n, _t, "Inès") == "06 33", "le numéro d'Inès est 06 33"\nassert numero(_n, _t, "Zoé") == "inconnu", "Zoé n'est pas dans le carnet : la fonction renvoie inconnu"`,
          },
          felicitation: "Une position trouvée dans une liste sert à lire l'autre. 📇",
          indices: [
            "Parcours les indices de <code>noms</code> : dès que <code>noms[i]</code> est le nom cherché, la réponse est dans <code>telephones</code>, à ce même indice.",
            "Si la boucle se termine sans avoir trouvé, renvoie <code>\"inconnu\"</code>.",
          ],
          solution: `def numero(noms, telephones, nom):\n    for i in range(len(noms)):\n        if noms[i] == nom:\n            return telephones[i]\n    return "inconnu"\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 20,
      etoiles: 3,
      intention: "pour aller plus loin, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "La deuxième occurrence",
          contenu: `
            <p>Écris la fonction <code>deuxieme_indice(tableau, valeur)</code>, qui
            renvoie l'indice de la <strong>deuxième</strong> occurrence de
            <code>valeur</code>, ou <code>-1</code> si la valeur apparaît moins de deux
            fois. Elle doit s'arrêter dès qu'elle a trouvé.</p>
            <pre class="bloc-code"><code>deuxieme_indice([7, 3, 7, 7, 1], 7)    # renvoie 2
deuxieme_indice([7, 3, 1], 7)          # renvoie -1</code></pre>`,
          depart: `def deuxieme_indice(tableau, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Parcours le tableau avec une boucle." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*(index|count)\\s*\\(", message: "Pas d'index() ni de count() : cherche toi-même." },
            ],
            tests: `assert deuxieme_indice([7, 3, 7, 7, 1], 7) == 2, "deuxieme_indice([7, 3, 7, 7, 1], 7) doit renvoyer 2"\nassert deuxieme_indice([7, 3, 1], 7) == -1, "une seule occurrence : la fonction renvoie -1"\nassert deuxieme_indice([7, 3, 1], 5) == -1, "aucune occurrence : la fonction renvoie -1"\nassert deuxieme_indice([2, 2], 2) == 1, "deuxieme_indice([2, 2], 2) doit renvoyer 1"`,
          },
          felicitation: "Un compteur d'occurrences dans un parcours partiel. 2️⃣",
          indices: [
            "Compte les occurrences au fil du parcours par indice, avec un compteur préparé avant la boucle.",
            "Dès que ce compteur atteint 2, renvoie l'indice du tour ; après la boucle, renvoie -1.",
          ],
          solution: `def deuxieme_indice(tableau, valeur):\n    vues = 0\n    for i in range(len(tableau)):\n        if tableau[i] == valeur:\n            vues = vues + 1\n            if vues == 2:\n                return i\n    return -1\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Bataille navale",
          contenu: `
            <p>Une grille de bataille navale est une matrice : <code>"~"</code> pour l'eau,
            une lettre pour un navire. Écris la fonction <code>trouver(grille, valeur)</code>,
            qui renvoie la position <code>[ligne, colonne]</code> de la première case
            contenant <code>valeur</code> (en lisant ligne par ligne), ou
            <code>[-1, -1]</code> si elle est absente.</p>
            <pre class="bloc-code"><code>grille = [["~", "~", "~"],
          ["~", "S", "~"],
          ["P", "P", "~"]]
trouver(grille, "S")    # renvoie [1, 1]
trouver(grille, "P")    # renvoie [2, 0]
trouver(grille, "C")    # renvoie [-1, -1]</code></pre>`,
          depart: `def trouver(grille, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b[^\\n]*\\n[ \\t]+for\\b", message: "Parcours la grille avec deux boucles imbriquées." },
            ],
            tests: `_g = [["~", "~", "~"], ["~", "S", "~"], ["P", "P", "~"]]\nassert trouver(_g, "S") == [1, 1], "le S est à la ligne 1, colonne 1"\nassert trouver(_g, "P") == [2, 0], "le premier P rencontré est à la ligne 2, colonne 0"\nassert trouver(_g, "C") == [-1, -1], "une valeur absente donne [-1, -1]"\nassert trouver(_g, "~") == [0, 0], "la première case d'eau est en haut à gauche"`,
          },
          felicitation: "Une recherche en deux dimensions, avec sa propre convention d'échec. 🚢",
          indices: [
            "Deux boucles sur les indices : <code>i</code> pour les lignes, <code>j</code> pour les colonnes. Dès que la case vaut <code>valeur</code>, renvoie la liste des deux indices.",
            "Le <code>return [-1, -1]</code> se place après les deux boucles, au niveau de la première.",
          ],
          solution: `def trouver(grille, valeur):\n    for i in range(len(grille)):\n        for j in range(len(grille[i])):\n            if grille[i][j] == valeur:\n                return [i, j]\n    return [-1, -1]\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre recherche",
          contenu: `
            <p>À toi de choisir : la position du premier mot trop long d'une liste, celles
            de toutes les notes au-dessus de 15, celle du premier jour de canicule…</p>
            <ul>
              <li>écris une fonction qui renvoie une <strong>position</strong> (ou -1), ou
              une <strong>liste de positions</strong> (éventuellement vide) ;</li>
              <li>appelle-la sur un tableau où elle trouve, et sur un autre où elle ne
              trouve rien, et affiche les résultats.</li>
            </ul>`,
          depart: `# Ta fonction ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\s+\\w+\\s*\\(", message: "Écris une fonction avec def." },
              { motif: "range\\s*\\(\\s*len\\s*\\(", message: "Pour renvoyer des positions, parcours les indices : range(len(…))." },
              { motif: "return\\s+-\\s*1|=\\s*\\[\\s*\\]", message: "Prévois le cas où rien n'est trouvé : -1, ou une liste vide." },
              { motif: "\\bprint\\s*\\([\\s\\S]*\\bprint\\s*\\(", message: "Affiche le résultat d'au moins deux appels." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ta recherche, avec sa convention d'échec. ✨",
          indices: [
            "Reprends le schéma de <code>premier_indice</code> ou celui de <code>indices_occurrences</code>, en changeant la condition.",
            "Termine par deux <code>print</code> : un appel qui trouve, un appel qui ne trouve rien.",
          ],
          solution: `def notes_excellentes(notes):\n    positions = []\n    for i in range(len(notes)):\n        if notes[i] > 15:\n            positions.append(i)\n    return positions\n\n\nprint(notes_excellentes([12, 17, 9, 19]))\nprint(notes_excellentes([8, 10]))\n`,
        },
      ],
    },
  ],
};

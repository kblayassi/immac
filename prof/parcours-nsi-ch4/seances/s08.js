/* NSI — chapitre 4, séance 8 : parcours total, parcours partiel.
 * Reprend les sections 1 et 2 de « Premiers algorithmes » (parcours total,
 * accumulateur, parcours partiel, recherche d'une occurrence, version while),
 * le TP2 et les exercices 13, 14, 15 et 19.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "Parcours total, parcours partiel",
  sousTitre: "Tout lire, ou s'arrêter dès qu'on a trouvé",
  palier: "Partie 3 — Premiers algorithmes",

  accroche: `Dans un tableau de 1000 notes, quelqu'un a-t-il eu 20 ? Combien d'élèves ont
    eu 20 ? Les deux questions se ressemblent, mais pas le travail : pour la
    première, on peut s'arrêter dès le premier 20 trouvé ; pour la seconde, il faut
    tout lire. C'est la différence entre <strong>parcours partiel</strong> et
    <strong>parcours total</strong>.`,

  objectifs: [
    "distinguer un <strong>parcours total</strong> d'un <strong>parcours partiel</strong>",
    "rechercher une <strong>occurrence</strong> en s'arrêtant dès qu'on l'a trouvée",
    "écrire ce parcours avec <code>for</code> et <code>return</code>, puis avec <code>while</code>",
    "compter les occurrences d'une valeur",
  ],

  motDeLaFin: `Tu sais quand tout lire et quand t'arrêter. À la séance 9, on ne se
    contente plus de savoir si une valeur est présente : on veut savoir
    <strong>où</strong> elle se trouve.`,

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
          titre: "Le parcours total",
          contenu: `
            <p>L'ordinateur ne « voit » pas un tableau d'un coup d'œil, comme nous sur le
            papier : il doit lire les cases une à une. Tous les algorithmes de cette partie
            reposent donc sur un <strong>parcours</strong>.</p>

            <div class="encadre">
              <span class="chapo">Définition : parcours total</span>
              Un <strong>parcours total</strong> examine <strong>tous</strong> les éléments
              du tableau. On l'écrit naturellement avec une boucle <code>for</code>.
            </div>

            <pre class="bloc-code"><code>Algorithme afficher

Entrée :
    tableau, un tableau de valeurs

Pour chaque élément du tableau :
    Afficher élément
Fin Pour</code></pre>

            <pre class="bloc-code"><code>def afficher(tableau):
    for element in tableau:
        print(element)</code></pre>

            <p>On le choisit dès que la réponse dépend de <strong>toutes</strong> les
            valeurs : additionner, compter, chercher un maximum, calculer une moyenne. La
            plupart de ces parcours suivent le schéma de l'<strong>accumulateur</strong>
            vu à la séance 3 : préparer avant, faire évoluer dans, utiliser après.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "La somme des positifs",
          contenu: `
            <p>Écris la fonction <code>somme_positifs(tableau)</code>, qui renvoie la somme
            des éléments <strong>strictement positifs</strong> du tableau. C'est un
            parcours total : chaque case peut contenir un nombre à ajouter.</p>
            <pre class="bloc-code"><code>somme_positifs([3, -2, 5, -1])    # renvoie 8</code></pre>`,
          depart: `def somme_positifs(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Un parcours total s'écrit avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est un accumulateur qu'on attend." },
            ],
            tests: `assert somme_positifs([3, -2, 5, -1]) == 8, "somme_positifs([3, -2, 5, -1]) doit renvoyer 8"\nassert somme_positifs([-4, -1]) == 0, "s'il n'y a aucun positif, la somme vaut 0"\nassert somme_positifs([10, 20]) == 30, "somme_positifs([10, 20]) doit renvoyer 30"\nassert somme_positifs([0, 7, 0]) == 7, "0 n'est pas strictement positif, mais l'ajouter ne change rien"`,
          },
          felicitation: "Un parcours total, un accumulateur, une condition. ➕",
          indices: [
            "Un total à 0 avant la boucle, renvoyé après la boucle.",
            "Dans la boucle, l'élément ne s'ajoute au total que s'il est plus grand que 0.",
          ],
          solution: `def somme_positifs(tableau):\n    total = 0\n    for element in tableau:\n        if element > 0:\n            total = total + element\n    return total\n`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Le parcours partiel",
          contenu: `
            <p>Il n'est pas toujours nécessaire d'aller jusqu'au bout. Pour savoir si 18
            est <strong>présent</strong> dans <code>[12, 15, 9, 18, 14]</code>, inutile de
            lire la dernière case une fois le 18 trouvé.</p>

            <div class="encadre">
              <span class="chapo">Définitions : parcours partiel, occurrence</span>
              Un <strong>parcours partiel</strong> peut s'arrêter <strong>avant la fin</strong>
              du tableau. Une <strong>occurrence</strong> d'une valeur est une case qui
              contient cette valeur : dans <code>[7, 3, 7, 7, 1]</code>, 7 a trois
              occurrences.
            </div>

            <p>Dans une fonction, <code>return</code> interrompt tout, boucle comprise.
            D'où le schéma d'un parcours partiel qui répond par oui ou non :</p>

            <pre class="bloc-code"><code>Pour chaque élément du tableau :
    Si élément vérifie la condition :
        Renvoyer Vrai        ← on a trouvé : on s'arrête là
    Fin Si
Fin Pour
Renvoyer Faux                ← on a tout lu sans rien trouver</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Oui tout de suite, non à la fin</span>
              Pour répondre <strong>oui</strong>, une seule case suffit. Pour répondre
              <strong>non</strong>, il faut les avoir <strong>toutes</strong> vues : le
              <code>Renvoyer Faux</code> se place <strong>après</strong> la boucle.
            </div>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Y a-t-il un nombre négatif ?",
          contenu: `
            <p>En suivant ce schéma, écris la fonction <code>contient_negatif(tableau)</code>,
            qui renvoie <code>True</code> dès qu'elle trouve un élément strictement
            négatif, et <code>False</code> si elle n'en trouve aucun.</p>
            <pre class="bloc-code"><code>contient_negatif([4, -2, 7])    # renvoie True
contient_negatif([4, 2, 7])     # renvoie False</code></pre>`,
          depart: `def contient_negatif(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
              { motif: "\\n {8,}return\\s+True", message: "Le return True se place dans la boucle, sous le if : on s'arrête dès qu'on a trouvé." },
              { motif: "\\n {4}return\\s+False", message: "Le return False se place après la boucle, au niveau du for." },
            ],
            tests: `assert contient_negatif([4, -2, 7]) == True, "contient_negatif([4, -2, 7]) doit renvoyer True"\nassert contient_negatif([4, 2, 7]) == False, "contient_negatif([4, 2, 7]) doit renvoyer False"\nassert contient_negatif([1, 2, 3, -9]) == True, "le négatif peut être dans la dernière case"\nassert contient_negatif([0, 5]) == False, "0 n'est pas strictement négatif"`,
          },
          felicitation: "Oui dès la première case trouvée, non seulement après la dernière. 🔍",
          indices: [
            "Dans la boucle, un <code>if</code> qui teste si l'élément est plus petit que 0, et un <code>return True</code> dans ce <code>if</code>.",
            "Le <code>return False</code> ne s'écrit qu'une fois la boucle terminée : il est au même niveau d'indentation que le <code>for</code>.",
          ],
          solution: `def contient_negatif(tableau):\n    for element in tableau:\n        if element < 0:\n            return True\n    return False\n`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "return arrête tout",
          contenu: `<p>Cette fonction renvoie un élément dès qu'il vérifie une condition.
            Lis-la sans l'exécuter.</p>`,
          code: `def premier_pair(tableau):\n    for x in tableau:\n        if x % 2 == 0:\n            return x\n    return None\n\nprint(premier_pair([3, 7, 8, 5, 4]))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>8</code>", correct: true,
              explication: "Oui : 3 et 7 sont impairs, 8 est pair. Le <code>return</code> renvoie 8 et interrompt la boucle : le 4 n'est jamais lu." },
            { texte: "<code>4</code>",
              explication: "Le 4 est pair aussi, mais la fonction s'est arrêtée avant de l'atteindre." },
            { texte: "<code>8</code> puis <code>4</code>",
              explication: "Une fonction ne renvoie qu'une seule valeur : le premier <code>return</code> exécuté met fin à l'appel." },
            { texte: "<code>None</code>",
              explication: "<code>return None</code> n'est atteint que si aucun élément n'est pair." },
          ],
          apres: `<span class="chapo">return interrompt la boucle et la fonction</span>
            Dès qu'un <code>return</code> s'exécute, la fonction s'arrête, même au milieu
            d'une boucle. C'est ce qui rend le parcours partiel possible avec un
            <code>for</code>.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Le parcours partiel avec while",
          contenu: `
            <p>On peut aussi écrire un parcours partiel avec une boucle
            <code>while</code>, qui avance <strong>tant que</strong> deux conditions sont
            réunies : on n'a pas dépassé la fin, et la case lue n'est pas celle qu'on
            cherche.</p>

            <pre class="bloc-code"><code>i ← 0
Tant que i &lt; longueur(tableau) et tableau[i] ne vérifie pas la condition :
    i ← i + 1
Fin Tant que
Renvoyer i &lt; longueur(tableau)</code></pre>

            <p>À la sortie de la boucle, deux situations sont possibles :</p>
            <ul>
              <li><code>i &lt; longueur(tableau)</code> : on s'est arrêté sur une case qui
              convient, la réponse est <strong>oui</strong> ;</li>
              <li><code>i == longueur(tableau)</code> : on est sorti par la fin, la réponse
              est <strong>non</strong>.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un booléen se renvoie directement</span>
              <code>i &lt; len(tableau)</code> est une comparaison : elle vaut déjà
              <code>True</code> ou <code>False</code>. Inutile d'écrire un
              <code>if</code> pour la renvoyer.
            </div>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Le nombre négatif, avec while",
          contenu: `
            <p>Réécris <code>contient_negatif(tableau)</code> avec une boucle
            <code>while</code>, en suivant le schéma : avance tant que tu n'as pas atteint
            la fin <strong>et</strong> que la case lue est positive ou nulle.</p>`,
          depart: `def contient_negatif(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Cette fois, la boucle est un while." },
              { motif: "\\bi\\s*(\\+=|=\\s*i\\s*\\+)\\s*1", message: "Dans la boucle, i avance d'une case : i = i + 1." },
            ],
            codeAbsent: [
              { motif: "\\bfor\\b", message: "Pas de for ici : c'est la version while qu'on veut." },
            ],
            tests: `assert contient_negatif([4, -2, 7]) == True, "contient_negatif([4, -2, 7]) doit renvoyer True"\nassert contient_negatif([4, 2, 7]) == False, "contient_negatif([4, 2, 7]) doit renvoyer False"\nassert contient_negatif([1, 2, 3, -9]) == True, "le négatif peut être dans la dernière case"\nassert contient_negatif([]) == False, "un tableau vide ne contient aucun négatif"`,
          },
          felicitation: "Deux conditions, deux façons de sortir, une seule réponse. 🔁",
          indices: [
            "Un indice <code>i</code> à 0 avant la boucle ; la condition du <code>while</code> combine deux comparaisons avec <code>and</code>.",
            "La première vérifie que <code>i</code> est un indice valide, la seconde que <code>tableau[i]</code> est positif ou nul. Après la boucle, renvoie la comparaison entre <code>i</code> et la longueur.",
          ],
          solution: `def contient_negatif(tableau):\n    i = 0\n    while i < len(tableau) and tableau[i] >= 0:\n        i = i + 1\n    return i < len(tableau)\n`,
        },

        {
          id: "d8",
          type: "prediction",
          titre: "L'ordre des conditions",
          contenu: `<p>Dans cette version, les deux conditions du <code>while</code> ont
            été écrites dans l'autre ordre.</p>`,
          code: `def contient_negatif(tableau):\n    i = 0\n    while tableau[i] >= 0 and i < len(tableau):\n        i = i + 1\n    return i < len(tableau)\n\nprint(contient_negatif([4, 8, 1]))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>False</code>",
              explication: "C'est la bonne réponse attendue… mais le programme s'arrête avant de pouvoir la donner." },
            { texte: "<code>True</code>",
              explication: "Il n'y a aucun négatif dans <code>[4, 8, 1]</code>, et de toute façon le programme plante avant." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : après trois tours, <code>i</code> vaut 3. Python évalue d'abord <code>tableau[3]</code>, qui n'existe pas, avant même de vérifier que <code>i &lt; len(tableau)</code>." },
            { texte: "une boucle infinie",
              explication: "<code>i</code> augmente à chaque tour : la boucle ne tourne pas indéfiniment, elle plante." },
          ],
          apres: `<span class="chapo">and s'évalue de gauche à droite</span>
            Si la première condition d'un <code>and</code> est fausse, Python n'évalue pas
            la seconde. En plaçant <code>i &lt; len(tableau)</code> en premier, on est sûr
            de ne jamais lire une case qui n'existe pas.`,
        },

        {
          id: "d9",
          type: "qcm",
          titre: "Cette boucle s'arrête-t-elle toujours ?",
          contenu: `<p>On reprend la version juste :</p>`,
          code: `i = 0\nwhile i < len(tableau) and tableau[i] >= 0:\n    i = i + 1`,
          question: "Pourquoi cette boucle se termine-t-elle forcément ?",
          options: [
            { texte: "parce que le tableau contient forcément un nombre négatif",
              explication: "Pas du tout : sans négatif, la boucle s'arrête aussi, en sortant par la fin." },
            { texte: "parce que i augmente de 1 à chaque tour et que la condition exige i &lt; len(tableau)", correct: true,
              explication: "Oui : i part de 0 et grandit à chaque tour. Au bout d'au plus <code>len(tableau)</code> tours, la condition <code>i &lt; len(tableau)</code> devient fausse." },
            { texte: "parce que Python arrête toute boucle au bout de quelques secondes",
              explication: "C'est la page qui interrompt les programmes trop longs, pas Python. Et une boucle mal écrite peut tourner indéfiniment." },
            { texte: "elle ne se termine pas toujours",
              explication: "Elle se termine toujours : i ne peut pas grandir indéfiniment sans dépasser la longueur du tableau." },
          ],
          apres: `<span class="chapo">Un raisonnement de terminaison</span>
            Une quantité entière qui augmente à chaque tour et qui est bornée par la
            condition garantit que la boucle s'arrête. Le chapitre d'algorithmique
            donnera un nom à ce raisonnement : le <strong>variant de boucle</strong>.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code># parcours partiel avec for : return dans la boucle, return après
def contient_negatif(tableau):
    for element in tableau:
        if element &lt; 0:
            return True
    return False

# parcours partiel avec while : l'ordre des conditions compte
def contient_negatif(tableau):
    i = 0
    while i &lt; len(tableau) and tableau[i] >= 0:
        i = i + 1
    return i &lt; len(tableau)</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Parcours total</th><th>Parcours partiel</th></tr>
              <tr><th>On s'arrête</th><td>à la fin, toujours</td><td>dès qu'on a trouvé</td></tr>
              <tr><th>Boucle</th><td><code>for</code></td><td><code>for</code> + <code>return</code>, ou <code>while</code></td></tr>
              <tr><th>Exemples</th><td>compter, additionner, maximum, moyenne</td><td>présence d'une valeur, existence d'un élément qui vérifie une condition</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>un <code>else: return False</code> dans la boucle : la fonction ne regarde que la première case ;</li>
                <li>oublier <code>i = i + 1</code> dans un <code>while</code> : boucle infinie ;</li>
                <li>tester <code>tableau[i]</code> avant <code>i &lt; len(tableau)</code> : <code>IndexError</code>.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 40,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Total ou partiel ?",
          contenu: `<p>On dispose d'un tableau de 1000 notes. Pour chaque question,
            peut-on s'arrêter avant la fin, ou faut-il tout lire ?</p>
            <ol>
              <li>Quelqu'un a-t-il eu 20 ?</li>
              <li>Combien d'élèves ont eu 20 ?</li>
              <li>Quelle est la meilleure note ?</li>
              <li>Quelle est la position du premier 20 ?</li>
              <li>Quelle est la moyenne de la classe ?</li>
              <li>Y a-t-il au moins une note en dessous de 5 ?</li>
            </ol>`,
          question: "Quelle est la bonne classification, de la question 1 à la question 6 ?",
          options: [
            { texte: "partiel, total, total, partiel, total, partiel", correct: true,
              explication: "Oui : un premier 20 ou une note sous 5 suffit à répondre (1, 4, 6) ; compter, chercher le record ou faire la moyenne demande toutes les notes (2, 3, 5)." },
            { texte: "partiel, partiel, total, partiel, total, partiel",
              explication: "Pour <strong>compter</strong> les 20 (question 2), une case non lue pourrait encore en contenir un : il faut tout lire." },
            { texte: "partiel, total, partiel, partiel, total, partiel",
              explication: "La meilleure note (question 3) peut se cacher dans la toute dernière case : il faut tout lire." },
            { texte: "total, total, total, total, total, total",
              explication: "Pour les questions 1, 4 et 6, la réponse est connue dès qu'on a trouvé la bonne case." },
          ],
          apres: `<span class="chapo">Et si la valeur est absente ?</span>
            Même un parcours partiel lit alors tout le tableau : pour affirmer qu'il n'y a
            aucun 20, il faut avoir vu toutes les notes. Le parcours partiel fait gagner du
            temps quand on trouve, jamais quand on ne trouve pas.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Rechercher une occurrence",
          contenu: `
            <p>Écris la fonction <code>recherche(tableau, valeur)</code>, qui renvoie
            <code>True</code> si <code>valeur</code> figure dans <code>tableau</code>, et
            <code>False</code> sinon.</p>
            <pre class="bloc-code"><code>recherche([12, 15, 8], 15)    # renvoie True
recherche([12, 15, 8], 20)    # renvoie False</code></pre>
            <p>⚠️ Interdit d'utiliser l'opérateur <code>in</code> pour tester la présence :
            c'est justement ce que tu reprogrammes ! (Le <code>in</code> d'une boucle
            <code>for</code> reste permis.)</p>`,
          depart: `def recherche(tableau, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Parcours le tableau avec une boucle." },
            ],
            codeAbsent: [
              { motif: "^(?![ \\t]*for\\b).*\\bin\\b", message: "Pas d'opérateur in pour tester la présence : seul le for … in est permis.", options: "m" },
            ],
            tests: `assert recherche([12, 15, 8], 15) == True, "recherche([12, 15, 8], 15) doit renvoyer True"\nassert recherche([12, 15, 8], 20) == False, "recherche([12, 15, 8], 20) doit renvoyer False"\nassert recherche([12, 15, 8], 12) == True, "la valeur peut être dans la première case"\nassert recherche([12, 15, 8], 8) == True, "la valeur peut être dans la dernière case"\nassert recherche([], 3) == False, "un tableau vide ne contient rien"`,
          },
          felicitation: "Tu viens de reprogrammer l'opérateur in. 🔎",
          indices: [
            "C'est le schéma du parcours partiel, avec pour condition l'égalité entre l'élément et <code>valeur</code>.",
            "<code>return True</code> dans la boucle, sous le <code>if</code> ; <code>return False</code> après la boucle.",
          ],
          solution: `def recherche(tableau, valeur):\n    for element in tableau:\n        if element == valeur:\n            return True\n    return False\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : la recherche de Théo",
          contenu: `
            <p>Théo a écrit sa propre fonction de recherche. Le programme devrait
            afficher :</p>
            <pre class="bloc-code"><code>True
True
False</code></pre>
            <p>Sa fonction contient <strong>deux erreurs</strong> : une qui empêche le
            programme de démarrer, et une qui fausse les réponses. Corrige-les.</p>`,
          depart: `def recherche(tableau, valeur):\n    for element in tableau:\n        if element = valeur:\n            return True\n        else:\n            return False\n\n\nprint(recherche([12, 15, 8], 12))\nprint(recherche([12, 15, 8], 15))\nprint(recherche([12, 15, 8], 20))\n`,
          validation: {
            codeAbsent: [
              { motif: "\\n {8,}return\\s+False", message: "Le return False est encore dans la boucle : la fonction ne regarde que la première case." },
            ],
            sortie: "True\nTrue\nFalse",
            tests: `assert recherche([12, 15, 8], 8) == True, "la valeur peut être dans la dernière case"\nassert recherche([], 1) == False, "un tableau vide ne contient rien"`,
          },
          felicitation: "Pour dire non, il faut avoir tout vu. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> : pour comparer, ce n'est pas <code>=</code>.",
            "Ensuite, <code>recherche([12, 15, 8], 15)</code> répond <code>False</code> : au premier tour, 12 n'est pas 15, et le <code>else</code> renvoie aussitôt <code>False</code>.",
            "On ne peut affirmer l'absence qu'après avoir examiné toutes les cases : le <code>return False</code> doit quitter la boucle.",
          ],
          solution: `def recherche(tableau, valeur):\n    for element in tableau:\n        if element == valeur:\n            return True\n    return False\n\n\nprint(recherche([12, 15, 8], 12))\nprint(recherche([12, 15, 8], 15))\nprint(recherche([12, 15, 8], 20))\n`,
          apres: `<span class="chapo">L'erreur la plus fréquente</span>
            La version de Théo semblait marcher sur son premier essai : la valeur cherchée
            était dans la première case. Teste toujours une valeur au milieu, une à la fin,
            et une absente.`,
        },

        {
          id: "a4",
          type: "qcm",
          titre: "L'algorithme de Léa",
          contenu: `<p>Léa a écrit son algorithme en pseudo-code :</p>`,
          code: `Algorithme present\n\nEntrées :\n    tableau, un tableau de valeurs\n    valeur, la valeur recherchée\n\ntrouve ← Faux\ni ← 0\nTant que trouve = Faux et i < longueur(tableau) :\n    Si tableau[i] = valeur :\n        trouve ← Vrai\nFin Tant que\n\nRenvoyer trouve`,
          question: "Que manque-t-il, et que se passe-t-il si on l'exécute tel quel ?",
          options: [
            { texte: "il manque « Renvoyer Faux » à la fin ; l'algorithme ne renvoie rien",
              explication: "<code>Renvoyer trouve</code> renvoie bien Faux si la valeur est absente… à condition d'arriver jusque-là." },
            { texte: "il manque « i ← i + 1 » dans la boucle ; si la valeur n'est pas dans la première case, la boucle ne s'arrête jamais", correct: true,
              explication: "Oui : sans cette ligne, i vaut toujours 0. On relit indéfiniment la même case et, si elle ne contient pas la valeur, la condition reste vraie pour toujours : c'est une boucle infinie." },
            { texte: "il ne manque rien, l'algorithme est juste",
              explication: "Essaie-le à la main avec un tableau où la valeur est en deuxième position : i ne bouge jamais." },
            { texte: "il manque un « Sinon trouve ← Faux » ; sinon trouve ne change pas",
              explication: "trouve vaut déjà Faux au départ : il n'a besoin de changer que si l'on trouve la valeur." },
          ],
          apres: `<span class="chapo">La variable de la condition doit évoluer</span>
            Dans une boucle « Tant que », il faut que quelque chose, dans le bloc, finisse
            par rendre la condition fausse. Ici, c'est l'avancée de i.`,
        },

        {
          id: "a5",
          type: "qcm",
          titre: "Compléter l'algorithme compter",
          contenu: `<p>On veut un algorithme qui renvoie le nombre d'occurrences d'une
            valeur dans un tableau.</p>`,
          code: `Algorithme compter\n\nEntrées :\n    tableau, un tableau de valeurs\n    valeur, la valeur recherchée\n\ncompteur ← (1)\nPour chaque élément du tableau :\n    Si (2) :\n        (3)\n    Fin Si\nFin Pour\n\nRenvoyer (4)`,
          question: "Comment compléter les trous (1), (2), (3) et (4) ?",
          options: [
            { texte: "(1) 0 · (2) élément = valeur · (3) compteur ← compteur + 1 · (4) compteur", correct: true,
              explication: "Oui : le compteur part de 0, augmente de 1 à chaque élément égal à la valeur cherchée, et on le renvoie après la boucle." },
            { texte: "(1) 1 · (2) élément = valeur · (3) compteur ← compteur + 1 · (4) compteur",
              explication: "En partant de 1, on compterait une occurrence de trop — même si la valeur est absente." },
            { texte: "(1) 0 · (2) élément = valeur · (3) Renvoyer Vrai · (4) compteur",
              explication: "Renvoyer Vrai arrêterait le parcours au premier élément trouvé : on veut les compter tous." },
            { texte: "(1) 0 · (2) compteur = valeur · (3) compteur ← compteur + 1 · (4) valeur",
              explication: "C'est l'élément qu'on compare à la valeur cherchée, et c'est le compteur qu'on renvoie." },
          ],
          apres: `<span class="chapo">Un parcours total</span>
            Pour n'oublier aucune occurrence, il faut examiner toutes les cases, y compris
            la dernière : compter est un parcours <strong>total</strong>.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "L'analyse de Julie",
          contenu: `
            <p>Julie, fan de cryptographie, travaille sur un tableau de lettres. Traduis
            l'algorithme <code>compter</code> en une fonction
            <code>comptage(tableau, lettre)</code>, qui renvoie le nombre d'occurrences de
            <code>lettre</code> dans <code>tableau</code>.</p>
            <pre class="bloc-code"><code>comptage(["a", "n", "a", "l", "y", "s", "e", "a"], "a")    # renvoie 3</code></pre>`,
          depart: `tableau = ["a", "n", "a", "l", "y", "s", "e", "a"]\n\n\ndef comptage(tableau, lettre):\n    pass\n\n\nprint(comptage(tableau, "a"))\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Compter est un parcours total : utilise une boucle for." },
            ],
            codeAbsent: [
              { motif: "\\.\\s*count\\s*\\(", message: "Pas de count() : c'est ce que tu reprogrammes." },
            ],
            sortie: "3",
            tests: `assert comptage(["a", "n", "a", "l", "y", "s", "e", "a"], "a") == 3, "il y a trois a dans le tableau de Julie"\nassert comptage(["a", "n", "a", "l", "y", "s", "e", "a"], "z") == 0, "une lettre absente a zéro occurrence"\nassert comptage(["b", "b"], "b") == 2, "comptage(['b', 'b'], 'b') doit renvoyer 2"\nassert comptage([], "a") == 0, "un tableau vide ne contient aucune lettre"`,
          },
          felicitation: "Un compteur, un parcours total : Julie peut lancer son analyse. 🔐",
          indices: [
            "Traduis les quatre trous de l'algorithme <code>compter</code> : un compteur à 0, une boucle, un test, un <code>return</code>.",
            "Dans la boucle, le compteur augmente de 1 quand l'élément est égal à <code>lettre</code>. Le <code>return</code> vient après la boucle.",
          ],
          solution: `tableau = ["a", "n", "a", "l", "y", "s", "e", "a"]\n\n\ndef comptage(tableau, lettre):\n    compteur = 0\n    for element in tableau:\n        if element == lettre:\n            compteur = compteur + 1\n    return compteur\n\n\nprint(comptage(tableau, "a"))\n`,
        },

        {
          id: "a7",
          type: "prediction",
          titre: "Suivre le compteur",
          contenu: `<p>On applique <code>comptage</code> au tableau
            <code>[7, 3, 7, 7, 1]</code> avec la valeur 7.</p>`,
          question: "Quelle est la valeur du compteur après chacun des cinq tours ?",
          options: [
            { texte: "1, 2, 3, 4, 5",
              explication: "Le compteur n'augmente que lorsque l'élément vaut 7 : pas au tour du 3, ni à celui du 1." },
            { texte: "1, 1, 2, 3, 3", correct: true,
              explication: "Oui : 7 (1), 3 (toujours 1), 7 (2), 7 (3), 1 (toujours 3). La fonction renvoie 3." },
            { texte: "0, 1, 1, 2, 3",
              explication: "Ce sont les valeurs <strong>avant</strong> chaque tour. Après le premier tour, le premier 7 est déjà compté." },
            { texte: "1, 0, 1, 1, 0",
              explication: "Le compteur ne retombe jamais : il garde le nombre de 7 déjà rencontrés." },
          ],
          apres: `<span class="chapo">Un accumulateur ne fait que grandir</span>
            Un compteur garde tout ce qu'il a déjà compté : il ne peut que stagner ou
            augmenter, tour après tour.`,
        },

        {
          id: "a8",
          type: "code",
          titre: "La présence, avec while",
          contenu: `
            <p>Julie veut maintenant savoir si une lettre est
            <strong>présente</strong> : inutile de tout lire, un parcours partiel suffit.
            Écris <code>recherche(tableau, lettre)</code> avec une boucle
            <code>while</code>, sans <code>for</code> ni <code>in</code>.</p>
            <pre class="bloc-code"><code>recherche(["a", "n", "a", "l", "y", "s", "e"], "y")    # renvoie True
recherche(["a", "n", "a", "l", "y", "s", "e"], "z")    # renvoie False</code></pre>`,
          depart: `def recherche(tableau, lettre):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "La boucle est un while." },
              { motif: "\\bi\\s*(\\+=|=\\s*i\\s*\\+)\\s*1", message: "Dans la boucle, i avance d'une case : i = i + 1." },
            ],
            codeAbsent: [
              { motif: "\\bfor\\b", message: "Pas de for : c'est la version while qu'on veut." },
              { motif: "\\bin\\b", message: "Pas d'opérateur in : c'est ce que tu reprogrammes." },
            ],
            tests: `_t = ["a", "n", "a", "l", "y", "s", "e"]\nassert recherche(_t, "y") == True, "y est dans le tableau"\nassert recherche(_t, "z") == False, "z n'est pas dans le tableau"\nassert recherche(_t, "a") == True, "la lettre peut être dans la première case"\nassert recherche(_t, "e") == True, "la lettre peut être dans la dernière case"\nassert recherche([], "a") == False, "un tableau vide ne contient rien"`,
          },
          felicitation: "Tu t'arrêtes dès que tu as trouvé, et jamais hors du tableau. ⏹️",
          indices: [
            "Même schéma que la version <code>while</code> de <code>contient_negatif</code> : seule la seconde condition change.",
            "On avance tant que <code>i</code> est un indice valide et que la case lue n'est pas égale à <code>lettre</code>.",
          ],
          solution: `def recherche(tableau, lettre):\n    i = 0\n    while i < len(tableau) and tableau[i] != lettre:\n        i = i + 1\n    return i < len(tableau)\n`,
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
          titre: "Tous positifs ?",
          contenu: `
            <p>Écris la fonction <code>tous_positifs(tableau)</code>, qui renvoie
            <code>True</code> si <strong>tous</strong> les éléments du tableau sont
            positifs ou nuls, et <code>False</code> sinon. Elle doit s'arrêter dès que la
            réponse est connue.</p>
            <pre class="bloc-code"><code>tous_positifs([3, 0, 8])     # renvoie True
tous_positifs([3, -1, 8])    # renvoie False</code></pre>`,
          depart: `def tous_positifs(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Parcours le tableau avec une boucle." },
            ],
            tests: `assert tous_positifs([3, 0, 8]) == True, "tous_positifs([3, 0, 8]) doit renvoyer True"\nassert tous_positifs([3, -1, 8]) == False, "tous_positifs([3, -1, 8]) doit renvoyer False"\nassert tous_positifs([5, 6, -2]) == False, "un seul négatif suffit, même dans la dernière case"\nassert tous_positifs([7]) == True, "tous_positifs([7]) doit renvoyer True"`,
          },
          felicitation: "« Pour tous » se vérifie en cherchant un contre-exemple. ✔️",
          indices: [
            "C'est le contraire de <code>contient_negatif</code> : un seul négatif suffit pour répondre <code>False</code>.",
            "Dès qu'un élément est négatif, renvoie <code>False</code> ; si la boucle se termine sans en trouver, renvoie <code>True</code>.",
          ],
          solution: `def tous_positifs(tableau):\n    for element in tableau:\n        if element < 0:\n            return False\n    return True\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le tableau est-il trié ?",
          contenu: `
            <p>Écris la fonction <code>est_trie(tableau)</code>, qui renvoie
            <code>True</code> si les éléments sont rangés dans l'ordre croissant (deux
            éléments voisins peuvent être égaux), et <code>False</code> sinon. Elle doit
            s'arrêter dès qu'elle trouve deux voisins mal rangés.</p>
            <pre class="bloc-code"><code>est_trie([1, 2, 2, 5])    # renvoie True
est_trie([1, 3, 2, 4])    # renvoie False</code></pre>`,
          depart: `def est_trie(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Parcours le tableau avec une boucle." },
            ],
            codeAbsent: [
              { motif: "\\bsort(ed)?\\b", message: "Pas de tri : compare les voisins un par un." },
            ],
            tests: `assert est_trie([1, 2, 2, 5]) == True, "est_trie([1, 2, 2, 5]) doit renvoyer True"\nassert est_trie([1, 3, 2, 4]) == False, "est_trie([1, 3, 2, 4]) doit renvoyer False"\nassert est_trie([3, 1]) == False, "est_trie([3, 1]) doit renvoyer False"\nassert est_trie([5]) == True, "un tableau d'un seul élément est trié"\nassert est_trie([1, 2, 3, 0]) == False, "le désordre peut être tout à la fin"`,
          },
          felicitation: "Un parcours partiel sur des paires de voisins. 📶",
          indices: [
            "Il faut comparer chaque élément à son voisin de droite : un parcours par indice, où <code>tableau[i]</code> est comparé à <code>tableau[i + 1]</code>.",
            "Attention à la borne : le dernier élément n'a pas de voisin de droite, donc <code>i</code> s'arrête à l'avant-dernier indice.",
          ],
          solution: `def est_trie(tableau):\n    for i in range(len(tableau) - 1):\n        if tableau[i] > tableau[i + 1]:\n            return False\n    return True\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre parcours partiel",
          contenu: `
            <p>À toi de choisir la question : y a-t-il un mot de plus de dix lettres dans
            une liste ? un jour de canicule dans un relevé ? une note éliminatoire ?</p>
            <ul>
              <li>écris une fonction qui parcourt un tableau et <strong>s'arrête dès que
              la réponse est connue</strong> ;</li>
              <li>appelle-la sur au moins deux tableaux, un où la réponse est oui et un où
              elle est non, et affiche les résultats.</li>
            </ul>`,
          depart: `# Ta fonction ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\s+\\w+\\s*\\(", message: "Écris une fonction avec def." },
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Ta fonction doit parcourir un tableau avec une boucle." },
              { motif: "\\n {8,}return\\b", message: "Un return dans la boucle permet de s'arrêter dès que la réponse est connue." },
              { motif: "\\n {4}return\\b", message: "Un return après la boucle donne la réponse quand on a tout lu." },
              { motif: "\\bprint\\s*\\([\\s\\S]*\\bprint\\s*\\(", message: "Affiche le résultat d'au moins deux appels." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ta question, ton parcours partiel. ✨",
          indices: [
            "Reprends le schéma de <code>contient_negatif</code> en changeant la condition testée dans le <code>if</code>.",
            "Termine par deux <code>print</code>, chacun appelant ta fonction sur un tableau différent.",
          ],
          solution: `def contient_canicule(temperatures):\n    for t in temperatures:\n        if t >= 35:\n            return True\n    return False\n\n\nprint(contient_canicule([28, 31, 36, 30]))\nprint(contient_canicule([20, 22, 25]))\n`,
        },
      ],
    },
  ],
};

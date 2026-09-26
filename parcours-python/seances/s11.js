/* Séance 11 (bonus) — La boîte à outils algorithmique des mathématiques.
 *
 * Rassemble, sous forme de fonctions réutilisables, tous les algorithmes que le
 * programme de Seconde déclare exigibles, chapitre par chapitre. Prévue pour la
 * fin d'année, quand les chapitres de maths concernés ont été traités.
 */

export default {
  id: "s11",
  numero: 11,
  titre: "La boîte à outils des maths",
  sousTitre: "Tous les algorithmes exigibles, rassemblés",
  palier: "Partie 4 — Pour finir",

  accroche: `Le programme de mathématiques de Seconde nomme une dizaine d'algorithmes
    que tu dois savoir lire, compléter ou écrire. Tu les as déjà tous croisés dans le
    parcours : ils sont ici réunis, sous forme de <strong>fonctions réutilisables</strong>,
    chapitre par chapitre.`,

  objectifs: [
    "reconnaître le motif algorithmique qui convient à un problème",
    "écrire les algorithmes exigibles des chapitres 3, 4, 11, 12, 13 et 14",
    "lire et corriger une fonction statistique",
    "comparer l'efficacité de deux méthodes",
  ],

  motDeLaFin: `Ta boîte à outils est complète. Garde cette page : c'est ton mémo pour
    toute l'année de mathématiques.`,

  parties: [

    /* ================================ LE MÉMO ================================ */
    {
      id: "decouverte",
      titre: "Le mémo",
      minutes: 20,
      etoiles: 1,
      intention: "reconnaître le bon motif avant d'écrire une ligne",
      etapes: [

        {
          id: "m1",
          type: "cours",
          titre: "Les algorithmes exigibles, chapitre par chapitre",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Chapitre de maths</th><th>Algorithme attendu</th><th>Motif</th></tr>
              <tr><td>3 — Puissances</td><td>première puissance dépassant une valeur</td><td>seuil</td></tr>
              <tr><td>4 — Nombres réels</td><td>encadrer √2 à 10<sup>−n</sup> près</td><td>balayage</td></tr>
              <tr><td>5 — Statistiques</td><td>lire une fonction moyenne, écart type</td><td>accumulation</td></tr>
              <tr><td>11 — Multiples</td><td>tester un multiple, trouver le plus grand</td><td>reste et quotient</td></tr>
              <tr><td>12 — Droites</td><td>alignement, équation par deux points</td><td>formule directe</td></tr>
              <tr><td>13 — Probabilités</td><td>expérience aléatoire, répétition, loi des grands nombres</td><td>simulation</td></tr>
              <tr><td>14 — Variations</td><td>extrémum approché, longueur d'une courbe</td><td>balayage, dichotomie</td></tr>
            </table>
            </div>

            <p>Trois motifs suffisent à tout couvrir :</p>
            <ul>
              <li><strong>l'accumulation</strong> — une variable grandit dans une boucle
                (somme, produit, compteur, champion) ;</li>
              <li><strong>le seuil</strong> — on répète jusqu'à dépasser une valeur, en
                comptant les étapes ;</li>
              <li><strong>l'encadrement</strong> — on resserre un intervalle, pas à pas
                (balayage) ou en le coupant en deux (dichotomie).</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le réflexe d'écriture</span>
              Écris chaque algorithme sous forme de <strong>fonction</strong>, avec ses
              données en paramètres. Une fonction écrite une fois répond à toutes les
              questions du même type, sans être retouchée.
            </div>`,
        },

        {
          id: "m2",
          type: "qcm",
          titre: "Quel motif pour quel problème ?",
          contenu: `<p>« Au bout de combien d'années un capital placé à 4 % dépasse-t-il
            le double de sa valeur initiale ? »</p>`,
          question: "Quel outil convient ?",
          options: [
            { texte: "Une boucle <code>for</code> sur un nombre d'années connu",
              explication: "On ne sait justement pas combien d'années il faudra : c'est ce qu'on cherche." },
            { texte: "Une boucle <code>while</code>, motif du seuil", correct: true,
              explication: "Oui : on répète tant que le capital n'a pas atteint le double, en comptant les tours." },
            { texte: "Une dichotomie",
              explication: "La dichotomie sert à resserrer un intervalle sur une valeur inconnue, pas à compter des étapes." },
            { texte: "Une simulation aléatoire",
              explication: "Il n'y a aucun hasard dans ce problème : le capital évolue de façon déterministe." },
          ],
        },

        {
          id: "m3",
          type: "code",
          titre: "Le squelette du seuil",
          contenu: `
            <p>Réécris de mémoire le motif du seuil, sous forme de fonction :
            <code>etapes_pour_depasser(depart, facteur, seuil)</code> renvoie le nombre de
            multiplications par <code>facteur</code> nécessaires pour que
            <code>depart</code> dépasse strictement <code>seuil</code>.</p>`,
          depart: `def etapes_pour_depasser(depart, facteur, seuil):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le motif du seuil s'écrit avec while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nombre d'étapes." },
            ],
            tests: `assert etapes_pour_depasser(1, 2, 1000) == 10, "il faut 10 doublements pour dépasser 1000"\nassert etapes_pour_depasser(1000, 1.05, 2000) == 15, "il faut 15 années à 5 % pour doubler 1000"\nassert etapes_pour_depasser(5, 3, 4) == 0, "5 dépasse déjà 4 : aucune étape"`,
          },
          felicitation: "Le motif du seuil, en version réutilisable. 📈",
          indices: [
            "Une variable <code>valeur = depart</code> et un compteur <code>etapes = 0</code>.",
            "<code>while valeur &lt;= seuil:</code> puis, dedans, la multiplication et l'incrément.",
          ],
        },

        {
          id: "m4",
          type: "code",
          titre: "Le squelette de l'encadrement",
          contenu: `
            <p>Même exercice pour le balayage. <code>borne_inferieure(unite)</code> renvoie
            le plus grand multiple de 1/<code>unite</code> dont le carré ne dépasse pas 2.</p>
            <p>Rappel : on compte en <strong>entiers</strong> pour éviter les approximations,
            et on divise seulement à la fin.</p>`,
          depart: `def borne_inferieure(unite):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le balayage s'écrit avec while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la borne." },
            ],
            tests: `assert borne_inferieure(100) == 1.41, "au centième, la borne inférieure vaut 1.41"\nassert borne_inferieure(1000) == 1.414, "au millième, elle vaut 1.414"\nassert borne_inferieure(10000) == 1.4142, "au dix-millième, elle vaut 1.4142"`,
          },
          felicitation: "Quatre décimales exactes de √2, à la demande. 📐",
          indices: [
            "Pars de <code>n = unite</code>, qui représente 1,00.",
            "La boucle avance d'un cran tant que le carré de <code>n</code> ne dépasse pas 2, exprimé à la même échelle — donc multiplié deux fois par <code>unite</code>.",
            "À la sortie, <code>n</code> a franchi la limite : la borne inférieure est le cran précédent, ramené à l'échelle par une division.",
          ],
        },

        {
          id: "m5",
          type: "cours",
          titre: "Écrire pour réutiliser",
          libelleBouton: "Passer aux algorithmes →",
          contenu: `
            <p>Compare les deux écritures d'un même algorithme :</p>

            <pre class="bloc-code"><code># Version « une seule question »
puissance = 1
while puissance &lt;= 1000:
    puissance = puissance * 2
print(puissance)

# Version réutilisable
def premiere_puissance(base, seuil):
    puissance = 1
    while puissance &lt;= seuil:
        puissance = puissance * base
    return puissance

print(premiere_puissance(2, 1000))
print(premiere_puissance(3, 100000))
print(premiere_puissance(7, 10**9))</code></pre>

            <p>La seconde n'est pas plus longue à écrire, et répond à toutes les questions
            du chapitre au lieu d'une seule. C'est exactement ce qu'on attend de toi en
            devoir : une fonction, testée sur plusieurs valeurs.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les trois questions à se poser</span>
              Qu'est-ce qui <strong>varie</strong> d'une question à l'autre ? → ce sont les
              paramètres. Qu'est-ce que la fonction <strong>produit</strong> ? → c'est le
              <code>return</code>. Comment la <strong>vérifier</strong> ? → sur un cas dont
              tu connais déjà la réponse.
            </div>`,
        },
      ],
    },

    /* ====================== LES ALGORITHMES EXIGIBLES ====================== */
    {
      id: "application",
      titre: "Les algorithmes exigibles",
      minutes: 35,
      etoiles: 2,
      intention: "un algorithme du programme par étape",
      etapes: [

        {
          id: "g1",
          type: "code",
          titre: "Chapitre 3 — la première puissance dépassant un seuil",
          contenu: `
            <p>Écris <code>premiere_puissance(base, seuil)</code> qui renvoie la première
            puissance de <code>base</code> <strong>strictement supérieure</strong> à
            <code>seuil</code>.</p>`,
          depart: `def premiere_puissance(base, seuil):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le nombre d'étapes est inconnu : while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la puissance." },
            ],
            tests: `assert premiere_puissance(2, 1000) == 1024, "2^10 = 1024 est la première puissance de 2 dépassant 1000"\nassert premiere_puissance(3, 100000) == 177147, "3^11 = 177147"\nassert premiere_puissance(10, 5) == 10, "la première puissance de 10 dépassant 5 est 10"\nassert premiere_puissance(2, 1024) == 2048, "il faut être STRICTEMENT supérieur"`,
          },
          indices: [
            "<code>puissance = 1</code> avant la boucle.",
            "<code>while puissance &lt;= seuil:</code> — l'inégalité large garantit le « strictement supérieur » à la sortie.",
          ],
        },

        {
          id: "g2",
          type: "code",
          titre: "Chapitre 4 — encadrer une racine carrée",
          contenu: `
            <p>Généralise le balayage : <code>encadrer_racine(nombre, unite)</code> renvoie
            la borne inférieure d'un encadrement de √<code>nombre</code> au
            1/<code>unite</code> près.</p>
            <p>La fonction doit marcher pour √2, √3, √10…</p>`,
          depart: `def encadrer_racine(nombre, unite):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Le balayage s'écrit avec while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la borne inférieure." },
            ],
            tests: `assert encadrer_racine(2, 100) == 1.41, "√2 ≈ 1,41 au centième"\nassert encadrer_racine(3, 1000) == 1.732, "√3 ≈ 1,732 au millième"\nassert encadrer_racine(10, 100) == 3.16, "√10 ≈ 3,16 au centième"\nassert encadrer_racine(9, 10) == 3.0, "√9 vaut exactement 3"`,
          },
          felicitation: "Un encadrement pour n'importe quelle racine, à n'importe quelle précision. 📐",
          indices: [
            "Cette fois, pars de <code>n = 0</code> : la racine cherchée peut être inférieure à 1.",
            "La condition compare le carré de <code>n</code> au nombre visé, tous deux ramenés à l'échelle de l'unité — donc multiplié deux fois par <code>unite</code>.",
            "À la sortie, <code>n</code> a dépassé d'un cran : la borne inférieure est celle d'avant, ramenée à l'échelle.",
          ],
        },

        {
          id: "g3",
          type: "code",
          titre: "Chapitre 5 — corriger une fonction statistique",
          contenu: `
            <p>Cette fonction devrait renvoyer la moyenne d'une série. Elle contient
            <strong>une erreur d'indentation</strong> qui la rend fausse — mais elle ne
            plante pas, ce qui la rend d'autant plus dangereuse.</p>
            <p>Trouve-la et corrige-la. <strong>Ne réécris pas la fonction</strong> :
            déplace une seule ligne.</p>`,
          depart: `def moyenne(valeurs):\n    somme = 0\n    for v in valeurs:\n        somme = somme + v\n        return somme / len(valeurs)\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Garde la boucle." },
              { motif: "len\\s*\\(", message: "Garde la division par le nombre de valeurs." },
            ],
            tests: `assert moyenne([12, 15, 9, 18, 11]) == 13, "la moyenne de cette série vaut 13"\nassert moyenne([10]) == 10, "la moyenne d'une seule valeur est cette valeur"\nassert moyenne([0, 20]) == 10, "la moyenne de 0 et 20 vaut 10"`,
          },
          felicitation: "Un bug d'indentation qui donnait toujours la première valeur divisée par l'effectif. 🐞",
          indices: [
            "Exécute mentalement avec <code>[12, 15, 9]</code> : que se passe-t-il au premier tour de boucle ?",
            "Le <code>return</code> est <em>dans</em> la boucle : il l'interrompt dès le premier passage.",
            "Il doit être décalé de quatre espaces seulement, pour être dans la fonction mais après la boucle.",
          ],
        },

        {
          id: "g4",
          type: "code",
          titre: "Chapitre 11 — multiples et diviseurs",
          contenu: `
            <p>Les deux algorithmes exigibles du chapitre, en une étape :</p>
            <ul>
              <li><code>est_multiple(a, b)</code> : <code>a</code> est-il un multiple de
                <code>b</code> ?</li>
              <li><code>plus_grand_multiple(a, b)</code> : le plus grand multiple de
                <code>a</code> inférieur ou égal à <code>b</code>.</li>
            </ul>`,
          depart: `def est_multiple(a, b):\n    \n\ndef plus_grand_multiple(a, b):\n    \n`,
          validation: {
            codeContient: [
              { motif: "%", message: "Le test de divisibilité utilise le reste." },
              { motif: "//", message: "Le plus grand multiple s'obtient avec la division entière." },
            ],
            tests: `assert est_multiple(91, 7) == True, "91 est un multiple de 7"\nassert est_multiple(91, 5) == False, "91 n'est pas un multiple de 5"\nassert plus_grand_multiple(7, 100) == 98, "le plus grand multiple de 7 sous 100 est 98"\nassert plus_grand_multiple(12, 12) == 12, "12 est un multiple de 12"\nassert plus_grand_multiple(25, 7) == 0, "aucun multiple de 25 sous 7, sauf 0"`,
          },
          indices: [
            "Pour la première : « a est multiple de b » signifie que le reste de la division de a par b est nul.",
            "Pour la seconde : le quotient entier de b par a compte combien de fois a tient dans b ; il suffit de le remultiplier par a.",
          ],
        },

        {
          id: "g5",
          type: "code",
          titre: "Chapitre 12 — l'alignement de trois points",
          contenu: `
            <p><code>sont_alignes(xa, ya, xb, yb, xc, yc)</code> renvoie <code>True</code>
            si les trois points sont alignés.</p>
            <p>Critère : le déterminant des vecteurs <em>AB</em> et <em>AC</em> est nul.</p>`,
          depart: `def sont_alignes(xa, ya, xb, yb, xc, yc):\n    \n`,
          validation: {
            codeContient: [{ motif: "==\\s*0", message: "L'alignement se traduit par un déterminant nul." }],
            tests: `assert sont_alignes(1, 2, 4, 11, 2, 5) == True, "A(1;2), B(4;11), C(2;5) sont alignés"\nassert sont_alignes(0, 0, 1, 1, 2, 3) == False, "ces trois points ne sont pas alignés"\nassert sont_alignes(3, 3, 3, 7, 3, -2) == True, "trois points d'une même verticale sont alignés"\nassert sont_alignes(0, 0, 0, 0, 5, 5) == True, "deux points confondus : le déterminant est nul"`,
          },
          indices: [
            "Range le déterminant dans une variable avant de le tester : deux lignes valent mieux qu'une ligne illisible.",
            "Le déterminant croise les deux vecteurs : abscisse du premier par ordonnée du second, moins ordonnée du premier par abscisse du second. Les points sont alignés quand il est nul.",
          ],
        },

        {
          id: "g6",
          type: "code",
          titre: "Chapitre 12 — l'équation d'une droite",
          contenu: `
            <p>Écris <code>afficher_equation(xa, ya, xb, yb)</code> qui affiche l'équation
            de la droite (AB) — <strong>en traitant le cas de la droite verticale</strong>,
            qui n'a pas d'équation réduite.</p>
            <p>Ton programme doit produire :</p>
            <pre class="bloc-code"><code>y = 3.0 x + -1.0
Droite verticale d'équation x = 2</code></pre>
            <p>en appelant la fonction avec (1 ; 2) et (4 ; 11), puis avec (2 ; 0) et (2 ; 5).</p>`,
          depart: `def afficher_equation(xa, ya, xb, yb):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut distinguer le cas vertical." },
              { motif: "xa\\s*==\\s*xb|xb\\s*==\\s*xa", message: "Une droite est verticale quand les deux abscisses sont égales." },
            ],
            sortie: "y = 3.0 x + -1.0\nDroite verticale d'équation x = 2",
          },
          felicitation: "Le cas particulier traité : c'est ce qui distingue un bon programme. 📏",
          indices: [
            "<code>if xa == xb:</code> puis l'affichage du cas vertical.",
            "Sinon : <code>m = (yb - ya) / (xb - xa)</code> et <code>p = ya - m * xa</code>.",
            "<code>print(\"y =\", m, \"x +\", p)</code>",
          ],
        },

        {
          id: "g7",
          type: "code",
          titre: "Chapitre 13 — expérience aléatoire et répétition",
          contenu: `
            <p>Les deux capacités attendues, en une étape :</p>
            <ul>
              <li><code>au_moins_un_six(lancers)</code> : simule <code>lancers</code> lancers
                de dé et renvoie <code>True</code> si au moins un 6 est sorti ;</li>
              <li><code>frequence(lancers, essais)</code> : répète cette expérience
                <code>essais</code> fois et renvoie la fréquence de réussite.</li>
            </ul>
            <p>Affiche ensuite la fréquence pour 4 lancers sur 20 000 essais. La théorie
            prédit 1 − (5/6)⁴ ≈ 0,518.</p>`,
          depart: `from random import randint\n\ndef au_moins_un_six(lancers):\n    \n\ndef frequence(lancers, essais):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "randint", message: "Il faut simuler les lancers." },
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "Les deux fonctions doivent renvoyer un résultat." },
            ],
            tests: `f = frequence(4, 5000)\nassert 0.47 < f < 0.57, "la fréquence doit être proche de 0,518"\nf1 = frequence(1, 5000)\nassert 0.13 < f1 < 0.21, "avec un seul lancer, la fréquence doit être proche de 1/6"`,
            sortieRegex: "0\\.[45]\\d*",
            sortieRegexMessage: "La fréquence affichée doit tomber autour de 0.518.",
          },
          felicitation: "Loi des grands nombres : 0,518 prédit, 0,518 observé. 🎲",
          indices: [
            "Dans <code>au_moins_un_six</code> : une boucle de <code>lancers</code> tours ; dès qu'un 6 sort, <code>return True</code>. Après la boucle, <code>return False</code>.",
            "Dans <code>frequence</code> : un compteur, une boucle de <code>essais</code> tours, et <code>return succes / essais</code>.",
            "<code>print(frequence(4, 20000))</code>",
          ],
        },

        {
          id: "g8",
          type: "code",
          titre: "Chapitre 14 — un extrémum par balayage",
          contenu: `
            <p>Soit <em>f</em>(<em>x</em>) = −<em>x</em>² + 4<em>x</em> + 1 sur [0 ; 4].
            Trouve son maximum en balayant l'intervalle au millième.</p>
            <pre class="bloc-code"><code>Maximum : 5.0 atteint en x = 2.0</code></pre>
            <p>On compte encore en entiers : <code>n</code> va de 0 à 4000, et
            <code>x = n / 1000</code>.</p>`,
          depart: `def f(x):\n    return -x * x + 4 * x + 1\n\nmeilleur_x = 0\nmeilleur_y = f(0)\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bmeilleur_x\\b[\\s\\S]*\\bmeilleur_x\\b", message: "Sers-toi de la variable meilleur_x déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bmeilleur_y\\b[\\s\\S]*\\bmeilleur_y\\b", message: "Sers-toi de la variable meilleur_y déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bfor\\b", message: "Le balayage parcourt tous les points : boucle for." },
              { motif: "f\\s*\\(", message: "Utilise la fonction f fournie." },
            ],
            codeAbsent: [
              { motif: "\\b5\\.0\\b", message: "Le maximum doit être trouvé par le balayage." },
            ],
            sortie: "Maximum : 5.0 atteint en x = 2.0",
          },
          felicitation: "Chapitre 14, algorithme du balayage validé. 📈",
          indices: [
            "<code>for n in range(4001):</code> puis <code>x = n / 1000</code>.",
            "C'est l'algorithme du champion : <code>if f(x) > meilleur_y:</code> alors on met à jour les deux variables.",
            "<code>print(\"Maximum :\", meilleur_y, \"atteint en x =\", meilleur_x)</code>",
          ],
        },

        {
          id: "g9",
          type: "code",
          titre: "Chapitre 14 — la dichotomie",
          contenu: `
            <p>Écris <code>dichotomie(a, b, precision)</code> qui renvoie une valeur
            approchée de √2 en resserrant l'intervalle [<code>a</code> ; <code>b</code>]
            jusqu'à ce que son amplitude passe sous <code>precision</code>.</p>
            <p>La fonction renvoie le <strong>milieu</strong> de l'intervalle final.</p>`,
          depart: `def dichotomie(a, b, precision):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "La dichotomie boucle jusqu'à la précision voulue." },
              { motif: "/\\s*2", message: "À chaque étape, on prend le milieu de l'intervalle." },
              { motif: "\\bif\\b", message: "Il faut choisir la moitié qui contient la solution." },
            ],
            tests: `r = dichotomie(1, 2, 0.001)\nassert abs(r - 1.41421356) < 0.001, "la dichotomie doit approcher √2 à 0,001 près"\nr2 = dichotomie(1, 2, 0.0000001)\nassert abs(r2 - 1.41421356) < 0.0000001, "avec plus de précision, l'approximation doit être meilleure"\nassert abs(dichotomie(0, 3, 0.001) - 1.41421356) < 0.001, "l'intervalle de départ peut être plus large"`,
          },
          felicitation: "Vingt étapes là où le balayage en demandait des millions. ⚡",
          indices: [
            "La boucle tourne tant que l'amplitude de l'intervalle dépasse la précision demandée.",
            "À chaque tour : calcule le milieu, puis compare son carré à 2 pour savoir laquelle des deux moitiés garder.",
            "Après la boucle, renvoie le milieu de l'intervalle final — c'est la meilleure estimation disponible.",
          ],
        },

        {
          id: "g10",
          type: "code",
          titre: "Chapitre 14 — la longueur d'une portion de courbe",
          contenu: `
            <p>Le dernier algorithme exigible du programme. On approche la courbe de
            <em>f</em> par une <strong>ligne brisée</strong> de <code>n</code> segments, et
            on additionne les longueurs de ces segments.</p>
            <p>Écris <code>longueur(n)</code> qui renvoie la longueur approchée de la courbe
            de <em>f</em>(<em>x</em>) = <em>x</em>² sur [0 ; 1], avec <code>n</code>
            segments.</p>
            <div class="encadre" data-ton="astuce">
              La longueur d'un segment entre deux points vaut
              √(Δ<em>x</em>² + Δ<em>y</em>²), et la racine carrée s'écrit
              <code>** 0.5</code>.
            </div>`,
          depart: `def f(x):\n    return x * x\n\ndef longueur(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut additionner les segments dans une boucle." },
              { motif: "0\\.5", message: "La longueur d'un segment est une racine carrée." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le total." },
            ],
            tests: `assert abs(longueur(100) - 1.4789) < 0.001, "avec 100 segments, la longueur vaut environ 1,4789"\nassert abs(longueur(1000) - 1.47894) < 0.0001, "avec 1000 segments, l'approximation est meilleure"\nassert longueur(1) == 2 ** 0.5, "avec un seul segment, on obtient la diagonale du carré unité"`,
          },
          felicitation: "Tous les algorithmes exigibles du programme sont écrits. 🎓",
          indices: [
            "La largeur d'un segment vaut 1 divisé par leur nombre ; la boucle parcourt les <code>n</code> segments.",
            "Pour chaque segment, calcule ses deux abscisses, puis l'écart vertical entre les deux images par <code>f</code>.",
            "Ajoute au total la racine carrée de la somme des carrés des deux écarts — c'est Pythagore, comme pour la distance de la séance 8.",
          ],
        },
      ],
    },

    /* ========================= POUR ALLER PLUS LOIN ========================= */
    {
      id: "defis",
      titre: "Pour aller plus loin",
      minutes: 20,
      etoiles: 3,
      intention: "au-delà du programme, pour le plaisir",
      etapes: [

        {
          id: "h1",
          type: "code",
          titre: "Résoudre une équation par dichotomie",
          contenu: `
            <p>L'équation <em>x</em>³ + <em>x</em> − 1 = 0 n'a pas de solution exprimable
            simplement. Mais on peut l'approcher aussi précisément qu'on veut.</p>
            <p>Écris <code>resoudre(precision)</code> qui renvoie la solution sur [0 ; 1],
            par dichotomie. La fonction <code>g</code> t'est donnée.</p>`,
          depart: `def g(x):\n    return x * x * x + x - 1\n\ndef resoudre(precision):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "La dichotomie boucle jusqu'à la précision voulue." },
              { motif: "g\\s*\\(", message: "Utilise la fonction g fournie plutôt que de recopier son expression." },
            ],
            tests: `assert abs(resoudre(0.0001) - 0.6823278) < 0.0001, "la solution vaut environ 0,68233"\nassert abs(g(resoudre(0.000001))) < 0.00001, "la solution trouvée doit annuler g"`,
          },
          felicitation: "Une équation du troisième degré, résolue sans formule. 🔍",
          indices: [
            "<code>a = 0</code> et <code>b = 1</code> : on sait que <code>g(0) = -1</code> et <code>g(1) = 1</code>.",
            "Si <code>g(m) &lt; 0</code>, la solution est au-dessus de <code>m</code> : <code>a = m</code>.",
            "Sinon <code>b = m</code>. À la fin, <code>return (a + b) / 2</code>.",
          ],
        },

        {
          id: "h2",
          type: "code",
          titre: "Balayage contre dichotomie",
          contenu: `
            <p>Combien d'étapes chaque méthode demande-t-elle pour encadrer √2 à
            10<sup>−4</sup> près ? Compte-les et affiche le verdict :</p>
            <pre class="bloc-code"><code>Balayage : 4143 étapes
Dichotomie : 14 étapes</code></pre>
            <p>Pour le balayage, on compte en dix-millièmes à partir de 10000 ;
            pour la dichotomie, on part de [1 ; 2].</p>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b[\\s\\S]*\\bwhile\\b", message: "Il faut compter les étapes des deux méthodes." },
            ],
            codeAbsent: [
              { motif: "4143|\\b14 étapes", message: "Les deux nombres doivent être comptés par les boucles." },
            ],
            sortie: "Balayage : 4143 étapes\nDichotomie : 14 étapes",
          },
          felicitation: "296 fois moins d'étapes. C'est pour cela que la dichotomie existe. ⚡",
          indices: [
            "Balayage : <code>n = 10000</code>, un compteur, et <code>while n * n &lt;= 2 * 10000 * 10000:</code>.",
            "Dichotomie : <code>a = 1</code>, <code>b = 2</code>, un compteur, et <code>while b - a > 0.0001:</code>.",
            "Chaque boucle incrémente son propre compteur.",
          ],
        },

        {
          id: "h3",
          type: "code",
          titre: "La convergence de la ligne brisée",
          contenu: `
            <p>Reprends <code>longueur(n)</code> et affiche le résultat pour n = 1, 10, 100
            et 1000. Regarde les décimales se figer une à une.</p>
            <pre class="bloc-code"><code>1 segments : 1.4142135623730951
10 segments : 1.4785301199324665
100 segments : 1.478935026061138
1000 segments : 1.4789427886161535</code></pre>`,
          depart: `def f(x):\n    return x * x\n\ndef longueur(n):\n    total = 0\n    dx = 1 / n\n    for i in range(n):\n        x1 = i * dx\n        x2 = (i + 1) * dx\n        dy = f(x2) - f(x1)\n        total = total + (dx * dx + dy * dy) ** 0.5\n    return total\n\n`,
          validation: {
            codeContient: [
              { motif: "longueur\\s*\\(\\s*1000\\s*\\)", message: "Affiche aussi le résultat pour 1000 segments." },
            ],
            sortieRegex: "1 segments : 1\\.414[\\s\\S]*1000 segments : 1\\.4789",
            sortieRegexMessage: "Ton programme doit afficher les quatre longueurs, de 1 à 1000 segments.",
          },
          felicitation: "La vraie valeur est 1,478942857… La ligne brisée y va tout droit. 📉",
          indices: [
            "Quatre <code>print</code> suffisent : <code>print(1, \"segments :\", longueur(1))</code>.",
            "Ou une boucle sur les valeurs 1, 10, 100, 1000 — mais quatre lignes sont plus simples ici.",
          ],
        },

        {
          id: "h4",
          type: "code",
          titre: "L'aire sous la courbe",
          contenu: `
            <p>Hors programme de Seconde, mais tu as tout ce qu'il faut. Pour approcher
            l'aire sous la courbe de <em>f</em>(<em>x</em>) = <em>x</em>² entre 0 et 1, on
            découpe en <code>n</code> rectangles et on additionne leurs aires.</p>
            <p>Écris <code>aire(n)</code>. Le résultat doit s'approcher de 1/3.</p>`,
          depart: `def f(x):\n    return x * x\n\ndef aire(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut additionner les rectangles." },
              { motif: "f\\s*\\(", message: "Utilise la fonction f." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer l'aire." },
            ],
            tests: `assert abs(aire(1000) - 0.3333333) < 0.001, "avec 1000 rectangles, l'aire vaut environ 1/3"\nassert abs(aire(10000) - 0.3333333) < 0.0001, "avec 10000 rectangles, c'est encore plus proche"\nassert aire(1) >= 0, "l'aire est positive"`,
          },
          felicitation: "Tu viens de calculer une intégrale. En Terminale, on lui donnera un nom. ∫",
          indices: [
            "Chaque rectangle a pour largeur <code>dx = 1 / n</code>.",
            "Sa hauteur est <code>f(x)</code> pour <code>x = i * dx</code>.",
            "<code>total = total + f(x) * dx</code>",
          ],
        },

        {
          id: "h5",
          type: "code",
          titre: "Ton algorithme à toi",
          contenu: `
            <p>Dernière étape du parcours. Écris une <strong>fonction paramétrée</strong> qui
            résout une famille de problèmes de ton cours de mathématiques — pas un seul
            problème, toute une famille.</p>
            <p>Des idées : le terme de rang <em>n</em> d'une suite définie par récurrence,
            le PGCD de deux entiers, la somme des <em>n</em> premiers termes d'une suite
            arithmétique, le nombre de diviseurs d'un entier, la décomposition en base 2…</p>`,
          depart: `# Ton algorithme\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+\\w+\\s*\\(\\s*\\w+", message: "Ta fonction doit avoir au moins un paramètre." },
              { motif: "\\breturn\\b", message: "Elle doit renvoyer un résultat." },
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Elle doit contenir une boucle." },
              { motif: "\\bprint\\b", message: "Montre ta fonction à l'œuvre sur plusieurs valeurs." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Parcours Python terminé, du premier print au dernier algorithme. 🏁🎓",
          indices: [
            "Choisis un problème dont tu connais déjà la réponse pour au moins deux valeurs : c'est ainsi que tu vérifieras ta fonction.",
            "Appelle-la trois ou quatre fois avec des valeurs différentes, et affiche les résultats.",
          ],
        },
      ],
    },
  ],
};

/* NSI Terminale — chapitre 1, séance 6 : les listes chaînées.
 *
 * On change de support : plus de tableau du tout. Un maillon est une liste
 * Python de deux cases — [valeur, suivant] — et la chaîne vide est None.
 *
 * Différence capitale avec la séance 2 : les maillons sont MUTABLES. C'est ce
 * qui rend possible l'insertion en temps constant, et ce qui rend le partage
 * dangereux. Les deux faces sont traitées (d3 pour le piège, d8 pour le gain).
 *
 * Le sommet de la séance est la file chaînée à DEUX pointeurs (a5) : enfiler et
 * defiler tous deux constants, sans capacité à déclarer. C'est mieux que les
 * trois implémentations de la séance 5, et c'est dit explicitement.
 *
 * Ici, nous sommes du côté de l'IMPLÉMENTATION : indexer un maillon est notre
 * métier, pas une triche. En revanche, dès qu'on bâtit une pile ou une file
 * par-dessus, ce sont elles qui exposent une interface.
 *
 * Règles de rédaction : voir l'en-tête de s01.js. `apres` est DÉJÀ un encadré.
 */

export default {
  id: "s06",
  numero: 6,
  titre: "Les listes chaînées",
  sousTitre: "Des maillons reliés un à un, et ce que le chaînage rend gratuit",
  palier: "Partie 3 — Plusieurs implémentations",

  accroche: `Toutes les structures du chapitre reposaient jusqu'ici sur un tableau, et
    toutes butaient sur la même chose : un tableau n'a qu'une extrémité bon marché. On
    change donc de support. Les maillons d'une chaîne n'ont pas d'extrémité privilégiée —
    et l'on va voir ce que cela permet.`,

  objectifs: [
    "représenter une liste par des <strong>maillons</strong> reliés un à un",
    "comprendre ce que la <strong>mutabilité</strong> des maillons rend possible, et dangereux",
    "implémenter une <strong>pile</strong> et une <strong>file</strong> par chaînage",
    "comparer, chiffres en main, le <strong>tableau</strong> et le <strong>chaînage</strong>",
  ],

  motDeLaFin: `Tu disposes maintenant de deux supports — le tableau et le chaînage — et de
    quoi choisir entre eux. À la séance 7, on ajoute une troisième façon de ranger des
    données, qui ne ressemble à aucune des deux : le dictionnaire. Et l'on se demandera,
    pour de bon, comment choisir.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "un maillon, un lien, et rien d'autre",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Un maillon, et un lien",
          contenu: `
            <p>Une <strong>liste chaînée</strong> ne range pas ses éléments côte à côte. Elle
            les met dans des <strong>maillons</strong> éparpillés en mémoire, dont chacun
            retient deux choses : sa valeur, et l'endroit où se trouve le maillon suivant.</p>

            <pre class="bloc-code"><code>c ─▶ ┌────┬───┐   ┌───┬───┐   ┌────┬───┐
     │ 12 │ ──┼──▶│ 5 │ ──┼──▶│ 32 │ ──┼──▶ None
     └────┴───┘   └───┴───┘   └────┴───┘
      valeur suivant</code></pre>

            <p>Le dessin est celui de la séance 2, et ce n'est pas un hasard : c'est la même
            idée. Ce qui change, c'est la matière dont les maillons sont faits.</p>

            <div class="encadre">
              <span class="chapo">La représentation de la séance</span>
              Un <strong>maillon</strong> est une liste Python de deux cases :
              <code>[valeur, suivant]</code>. La <strong>chaîne vide</strong> est
              <code>None</code>. Une chaîne, c'est donc simplement son premier maillon — ou
              <code>None</code> s'il n'y en a aucun.
              <br><br>
              La chaîne du dessin s'écrit <code>[12, [5, [32, None]]]</code>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ce qui change par rapport à la séance 2</span>
              Là-bas, un maillon était un <strong>p-uplet</strong> : une fois construit, il
              ne pouvait plus changer. <code>cons</code> fabriquait, <code>cdr</code>
              désignait, et rien n'écrasait jamais rien.
              <br><br>
              Ici, un maillon est une <strong>liste</strong> : on peut écrire
              <code>m[0] = 99</code> ou <code>m[1] = autre_maillon</code>. Cette seule
              différence est le sujet de toute la séance — c'est elle qui permettra d'insérer
              au milieu d'une chaîne sans rien recopier, et c'est elle qui rendra le partage
              de maillons délicat.
            </div>

            <p>Une dernière remarque de vocabulaire, importante pour la suite :</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Nous sommes du côté de l'implémentation</span>
              Depuis la séance 1, écrire <code>m[0]</code> sur une structure abstraite était
              une faute. Ici, ce n'est plus le cas : <strong>nous fabriquons la structure</strong>,
              et connaître la forme des maillons est précisément notre travail.
              <br><br>
              La discipline reprendra dès qu'on bâtira une pile ou une file par-dessus : ce
              sont <em>elles</em> qui exposeront une interface, et leurs clients n'auront
              toujours pas le droit de regarder dedans.
            </div>`,
          libelleBouton: "Construire une chaîne →",
        },

        {
          id: "d2",
          type: "code",
          titre: "Construire une chaîne",
          contenu: `
            <p>La fonction <code>maillon(valeur, suivant)</code> t'est donnée : elle fabrique
            un maillon et rien de plus.</p>

            <p>Construis la chaîne contenant <strong>12, 5 puis 32</strong>, range-la dans une
            variable <code>c</code>, puis affiche successivement la chaîne entière, la valeur
            de son premier maillon, et celle du deuxième :</p>

            <pre class="bloc-code"><code>[12, [5, [32, None]]]
12
5</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Lire un maillon</span>
              <code>m[0]</code> est la valeur du maillon <code>m</code>, et <code>m[1]</code>
              le maillon suivant. Le deuxième maillon de la chaîne est donc
              <code>c[1]</code>, et sa valeur <code>c[1][0]</code>.
            </div>`,
          nomFichier: "chaine.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    """Renvoie un nouveau maillon."""\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n`,
          validation: {
            codeContient: [
              { motif: "(\\bmaillon\\s*\\([\\s\\S]*?){4}",
                message: "Trois éléments, donc trois appels à maillon()." },
            ],
            codeAbsent: [
              { motif: "\\[\\s*12\\s*,\\s*\\[", message: "Construis la chaîne avec maillon(), sans écrire les listes emboîtées à la main." },
            ],
            sortie: "[12, [5, [32, None]]]\n12\n5",
          },
          felicitation: "Trois maillons accrochés les uns aux autres. 🔗",
          indices: [
            "Le dernier maillon de la chaîne n'a pas de suivant : son second argument est <code>None</code>.",
            "Emboîte les appels, en commençant par le plus profond — celui qui contient 32.",
            "Trois <code>print</code> : la chaîne entière, puis la valeur du premier maillon, puis celle du maillon suivant.",
          ],
          apres: `<span class="chapo">Compte les crochets</span>
            <code>[12, [5, [32, None]]]</code> : un crochet ouvrant par maillon, et le
            <code>None</code> tout au fond qui ferme la marche. C'est exactement la forme
            qu'avaient les listes de la séance 2 — les parenthèses en moins.
            <br><br>
            Cette ressemblance n'est pas décorative : le chaînage est la façon naturelle de
            réaliser le type abstrait liste. Ce que la séance ajoute, c'est la possibilité de
            <em>modifier</em> ces maillons une fois qu'ils existent.`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Deux noms pour le même maillon",
          contenu: `
            <p>C'est ici que le chaînage se sépare vraiment de la séance 2. Lis le programme
            avec attention : la variable <code>a</code> et le second maillon de <code>b</code>
            désignent le <strong>même</strong> objet en mémoire.</p>`,
          code: `def maillon(valeur, suivant):\n    return [valeur, suivant]\n\na = maillon(5, None)\nb = maillon(12, a)\n\na[0] = 99\n\nprint(b)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>[12, [99, None]]</code>", correct: true,
              explication: "Oui. <code>b[1]</code> n'est pas une copie de <code>a</code> : c'est <code>a</code>. Modifier le maillon par l'un de ses noms le modifie pour tous les autres." },
            { texte: "<code>[12, [5, None]]</code>",
              explication: "Ce serait le cas si <code>maillon(12, a)</code> avait recopié <code>a</code>. Il n'en fait rien : il range simplement l'endroit où <code>a</code> se trouve." },
            { texte: "<code>[99, [5, None]]</code>",
              explication: "<code>a[0] = 99</code> ne touche qu'au maillon <code>a</code>, qui est le second de la chaîne. Le 12 du premier ne bouge pas." },
            { texte: "Une erreur : on ne modifie pas un maillon déjà construit.",
              explication: "Avec les p-uplets de la séance 2, ce serait effectivement une erreur. Ici, un maillon est une liste, et une liste se modifie." },
          ],
          apres: `<span class="chapo">Les deux faces d'une même pièce</span>
            Le partage de maillons existait déjà à la séance 2 — deux listes pouvaient avoir
            la même fin, sans aucune copie. Il était alors <strong>sans le moindre
            risque</strong>, puisque personne ne pouvait modifier quoi que ce soit.
            <br><br>
            Maintenant qu'un maillon est modifiable, ce partage devient :
            <ul>
              <li>une <strong>puissance</strong> : pour insérer une valeur au milieu d'une
              chaîne, il suffira de tenir le maillon d'avant et de changer une seule flèche —
              aucune recopie, quel que soit le nombre d'éléments ;</li>
              <li>un <strong>danger</strong> : modifier une chaîne peut en modifier une autre
              à l'autre bout du programme, sans qu'aucune ligne ne la mentionne.</li>
            </ul>
            Tout le reste de la séance vit dans cette tension. Retiens le mot :
            <strong>mutable</strong>.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Parcourir une chaîne",
          contenu: `
            <p>Écris <code>vers_tableau(c)</code> : elle renvoie le tableau Python des valeurs
            de la chaîne, dans l'ordre.</p>

            <pre class="bloc-code"><code>vers_tableau(maillon(12, maillon(5, maillon(32, None))))  →  [12, 5, 32]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le schéma de parcours d'une chaîne</span>
              <pre class="bloc-code"><code>m = c
while m is not None:
    ...        # travailler avec m[0]
    m = m[1]   # avancer d'un maillon</code></pre>
              C'est celui de la séance 2, avec <code>m[1]</code> à la place de
              <code>cdr(L)</code> et <code>m is not None</code> à la place de
              <code>not est_vide(L)</code>.
            </div>

            <div class="encadre">
              <span class="chapo">Pourquoi <code>is None</code> et pas <code>== None</code></span>
              <code>is</code> demande « est-ce le même objet ? », <code>==</code> demande
              « ont-ils la même valeur ? ». Pour <code>None</code>, qui n'existe qu'en un seul
              exemplaire dans tout Python, la première question est la bonne — et c'est
              l'écriture que tu verras partout.
            </div>`,
          nomFichier: "parcours.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef vers_tableau(c):\n    """Renvoie le tableau Python des valeurs de la chaine c, dans l'ordre."""\n    pass\n`,
          validation: {
            tests: `assert vers_tableau(None) == [], "La chaîne vide donne le tableau vide."\nassert vers_tableau(maillon(4, None)) == [4], "Un seul maillon."\nc = maillon(12, maillon(5, maillon(32, None)))\nassert vers_tableau(c) == [12, 5, 32], "Les trois valeurs, dans l'ordre de la chaîne."\nassert vers_tableau(c) == [12, 5, 32], "Deux appels de suite doivent donner le même résultat : la chaîne n'est pas consommée."\nassert vers_tableau(c[1]) == [5, 32], "À partir du second maillon, il n'en reste que deux."\nlongue = None\nfor v in range(30):\n    longue = maillon(v, longue)\nassert vers_tableau(longue)[0] == 29, "Le dernier accroché est en tête."\nassert len(vers_tableau(longue)) == 30, "Trente maillons, trente valeurs."`,
          },
          felicitation: "Le schéma de parcours des chaînes est en place. 🔁",
          indices: [
            "Prépare un tableau vide avant la boucle, et renvoie-le après.",
            "Une variable de parcours part du premier maillon, et la boucle continue tant qu'elle ne vaut pas <code>None</code>.",
            "À chaque tour, deux choses : ajouter <code>m[0]</code> au tableau, puis faire avancer <code>m</code> vers <code>m[1]</code>. Sans cette seconde ligne, la boucle ne s'arrête jamais.",
          ],
          apres: `<span class="chapo">Garde-la sous la main</span>
            <code>vers_tableau</code> va te servir dans tous les exercices de la séance :
            une chaîne s'affiche mal, un tableau s'affiche bien. Dès qu'un résultat te
            surprend, recopie cette fonction et affiche
            <code>vers_tableau(ta_chaine)</code> — c'est le réflexe qui fait gagner le plus
            de temps sur les listes chaînées.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Accrocher un maillon en tête",
          contenu: `
            <p>Deux opérations élémentaires, et elles doivent toutes les deux se faire
            <strong>sans la moindre boucle</strong>.</p>

            <ul>
              <li><code>est_vide(c)</code> renvoie <code>True</code> si la chaîne ne contient
              aucun maillon ;</li>
              <li><code>ajouter_en_tete(c, valeur)</code> renvoie la chaîne obtenue en plaçant
              un nouveau maillon <strong>devant</strong> <code>c</code>.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Aucune boucle, et ce n'est pas un caprice</span>
              <strong>✓ Valider</strong> refusera toute boucle dans ton fichier. C'est l'objet
              même de l'exercice : accrocher un maillon en tête doit coûter la même chose que
              la chaîne contienne trois maillons ou trois millions.
            </div>`,
          nomFichier: "en_tete.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef est_vide(c):\n    """Renvoie True si la chaine c ne contient aucun maillon."""\n    pass\n\ndef ajouter_en_tete(c, valeur):\n    """Renvoie la chaine obtenue en placant valeur devant c.\n\n    Effet : c n'est pas modifiee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b", message: "Aucune boucle : accrocher un maillon en tête doit coûter la même chose quelle que soit la longueur." },
              { motif: "\\bfor\\b", message: "Aucune boucle : accrocher un maillon en tête doit coûter la même chose quelle que soit la longueur." },
            ],
            tests: `assert est_vide(None) == True, "La chaîne vide est None."\nassert est_vide(maillon(1, None)) == False, "Un maillon suffit à ce qu'une chaîne ne soit pas vide."\nc = ajouter_en_tete(None, 32)\nassert c == [32, None], "Ajouter à la chaîne vide donne une chaîne d'un seul maillon."\nc = ajouter_en_tete(c, 5)\nassert c == [5, [32, None]], "Le nouveau maillon passe DEVANT."\nc = ajouter_en_tete(c, 12)\nassert c == [12, [5, [32, None]]], "Et ainsi de suite."\nassert est_vide(c) == False, "..."\nancienne = maillon(7, None)\nnouvelle = ajouter_en_tete(ancienne, 3)\nassert ancienne == [7, None], "L'ancienne chaîne ne doit pas être modifiée : le nouveau maillon la prend pour suivant."\nassert nouvelle[1] is ancienne, "Et il ne la recopie pas : il pointe dessus."`,
          },
          felicitation: "Un maillon accroché en tête, à prix constant. ⚡",
          indices: [
            "<code>est_vide</code> tient en une comparaison avec <code>None</code>.",
            "Pour <code>ajouter_en_tete</code>, il n'y a rien à parcourir : le nouveau maillon doit simplement prendre la chaîne reçue comme suivant.",
            "Une seule ligne suffit, et elle appelle <code>maillon</code>.",
          ],
          apres: `<span class="chapo">Le dernier test mérite un mot</span>
            <code>nouvelle[1] is ancienne</code> : le nouveau maillon ne contient pas une
            <em>copie</em> de l'ancienne chaîne, il contient l'ancienne chaîne
            <strong>elle-même</strong>.
            <br><br>
            C'est ce qui rend l'opération gratuite — rien n'est recopié — et c'est aussi ce
            qui la rend délicate : si quelqu'un modifie un maillon de <code>ancienne</code>,
            <code>nouvelle</code> changera aussi. Souviens-toi de l'étape 3.`,
        },

        {
          id: "d6",
          type: "qcm",
          titre: "Pourquoi en tête et pas en fin",
          contenu: `
            <p>Tu viens d'accrocher un maillon en tête sans écrire la moindre boucle.
            Essayons maintenant de l'accrocher <strong>à la fin</strong> d'une chaîne de
            10 000 maillons.</p>
            <pre class="bloc-code"><code>c ─▶ ┌───┬───┐   ┌───┬───┐         ┌───┬───┐
     │ · │ ──┼──▶│ · │ ──┼──▶ ⋯ ──▶│ · │ ──┼──▶ None
     └───┴───┘   └───┴───┘         └───┴───┘
                                    il faut accrocher ICI</code></pre>`,
          question: "Combien de maillons faut-il traverser pour y arriver ?",
          options: [
            { texte: "Les 10 000 : rien ne dit où se trouve le dernier.", correct: true,
              explication: "Oui. Chaque maillon ne connaît que son <em>suivant</em> ; le seul moyen d'atteindre le dernier est de partir du premier et de suivre les flèches une à une. C'est un coût linéaire, là où l'ajout en tête était constant." },
            { texte: "Aucun : il suffit de prendre <code>c[-1]</code>.",
              explication: "Les crochets négatifs sont une commodité des <em>tableaux</em> Python, dont les cases se suivent. Ici, <code>c</code> est un maillon de deux cases : <code>c[-1]</code> désigne son suivant, pas le dernier de la chaîne." },
            { texte: "La moitié, en moyenne.",
              explication: "C'est vrai pour une <em>recherche</em>, qui s'arrête quand elle trouve. Pour atteindre le dernier maillon, il faut aller jusqu'au bout, à chaque fois." },
            { texte: "Un seul, si l'on garde le dernier maillon dans une variable.",
              explication: "Excellente idée, et c'est exactement ce qu'on fera dans les exercices ! Mais elle suppose de retenir cette variable en plus de la chaîne : ce n'est plus la même structure." },
          ],
          apres: `<span class="chapo">Le tableau et la chaîne sont des miroirs</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Tableau</th><th>Chaîne</th></tr>
              <tr><td>Ajouter à la <strong>fin</strong></td><td>immédiat</td><td>il faut tout traverser</td></tr>
              <tr><td>Ajouter en <strong>tête</strong></td><td>il faut tout décaler</td><td>immédiat</td></tr>
              <tr><td>Lire la case n°&nbsp;<em>n</em></td><td>immédiat</td><td>il faut traverser <em>n</em> maillons</td></tr>
              <tr><td>Insérer au <strong>milieu</strong></td><td>il faut décaler la moitié</td><td>immédiat, <em>si l'on tient le maillon</em></td></tr>
            </table>
            </div>
            Aucune des deux structures n'est meilleure : elles sont bonnes à des choses
            opposées. La dernière ligne est celle que le chaînage seul rend possible, et
            c'est l'objet de l'étape 8.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Accrocher un maillon en fin",
          contenu: `
            <p>Écris <code>ajouter_en_fin(c, valeur)</code> : elle renvoie la chaîne obtenue
            en accrochant un nouveau maillon <strong>après le dernier</strong>.</p>

            <pre class="bloc-code"><code>ajouter_en_fin(maillon(12, maillon(5, None)), 32)  →  [12, [5, [32, None]]]</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux cas, et le premier est facile à oublier</span>
              Si la chaîne est <strong>vide</strong>, il n'y a pas de « dernier maillon » à
              qui s'accrocher : la fonction doit renvoyer une chaîne d'un seul maillon.
              <br><br>
              Sinon, il faut aller jusqu'au dernier — celui dont le suivant est
              <code>None</code> — et lui accrocher le nouveau. Dans ce second cas, la chaîne
              reçue est modifiée sur place, et c'est elle qu'on renvoie.
            </div>`,
          nomFichier: "en_fin.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef ajouter_en_fin(c, valeur):\n    """Renvoie la chaine obtenue en accrochant valeur apres le dernier maillon de c."""\n    pass\n`,
          validation: {
            tests: `assert ajouter_en_fin(None, 7) == [7, None], "Sur la chaîne vide, on obtient une chaîne d'un seul maillon."\nassert ajouter_en_fin(maillon(1, None), 2) == [1, [2, None]], "Le nouveau maillon se place APRÈS."\nc = maillon(12, maillon(5, None))\nr = ajouter_en_fin(c, 32)\nassert r == [12, [5, [32, None]]], "Sur trois maillons aussi."\nassert r is c, "Quand la chaîne n'est pas vide, c'est elle qu'on modifie et qu'on renvoie."\nd = None\nfor v in [1, 2, 3, 4]:\n    d = ajouter_en_fin(d, v)\nassert d == [1, [2, [3, [4, None]]]], "Quatre ajouts successifs doivent conserver l'ordre d'arrivée."\ne = maillon("a", None)\najouter_en_fin(e, "b")\najouter_en_fin(e, "c")\nassert e == ["a", ["b", ["c", None]]], "Les ajouts suivants doivent bien aller jusqu'au nouveau dernier maillon."`,
          },
          felicitation: "Il a fallu traverser toute la chaîne. C'est le prix du chaînage. 🐌",
          indices: [
            "Commence par traiter la chaîne vide : dans ce cas, il n'y a rien à parcourir et la réponse tient en une ligne.",
            "Sinon, fais avancer une variable de maillon en maillon tant que son <strong>suivant</strong> n'est pas <code>None</code> — attention, la condition ne porte pas sur le maillon lui-même.",
            "Quand la boucle s'arrête, la variable désigne le dernier maillon. Il ne reste qu'à remplacer son suivant par un maillon neuf, puis à renvoyer la chaîne de départ.",
          ],
          apres: `<span class="chapo">La condition qui change tout</span>
            Compare les deux boucles de la séance :
            <pre class="bloc-code"><code>while m is not None:      # aller jusqu'au bout, et sortir de la chaîne
while m[1] is not None:   # s'arrêter SUR le dernier maillon</code></pre>
            La première convient quand on veut <em>visiter</em> tous les maillons ; la seconde
            quand on veut <em>s'arrêter</em> sur le dernier pour le modifier. Se tromper de
            condition donne soit une <code>TypeError</code> sur <code>None</code>, soit un
            maillon accroché à la mauvaise place.
            <br><br>
            Remarque enfin le <code>return c</code> de la fin : la chaîne a été modifiée sur
            place, mais la fonction la renvoie quand même. C'est ce qui permet d'écrire
            <code>d = ajouter_en_fin(d, v)</code> dans les deux cas — y compris quand
            <code>d</code> valait <code>None</code> et qu'aucune modification sur place
            n'était possible.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Insérer au milieu, sans rien déplacer",
          contenu: `
            <p>Voici ce que le chaînage rend gratuit, et qu'aucun tableau ne peut offrir.</p>

            <p><code>inserer_apres(m, valeur)</code> glisse un nouveau maillon
            <strong>juste après</strong> le maillon <code>m</code> — au beau milieu de la
            chaîne, sans déplacer quoi que ce soit.</p>

            <pre class="bloc-code"><code>avant    ┌────┬───┐               ┌───┬───┐
    m ──▶│ 12 │ ──┼──────────────▶│ 5 │ ──┼──▶ None
         └────┴───┘               └───┴───┘

après    ┌────┬───┐   ┌───┬───┐   ┌───┬───┐
    m ──▶│ 12 │ ──┼──▶│ 9 │ ──┼──▶│ 5 │ ──┼──▶ None
         └────┴───┘   └───┴───┘   └───┴───┘</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>m</code> n'est pas <code>None</code>. La fonction ne renvoie rien : elle
              modifie la chaîne.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Aucune boucle, là non plus</span>
              <strong>✓ Valider</strong> la refusera. Toute la beauté de l'opération est
              qu'elle coûte la même chose que la chaîne ait trois maillons ou trois millions,
              et que l'insertion ait lieu au début ou au milieu.
            </div>`,
          nomFichier: "inserer.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef inserer_apres(m, valeur):\n    """Insere un maillon de valeur juste apres le maillon m.\n\n    Precondition : m n'est pas None.\n    Effet : la chaine est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b", message: "Aucune boucle : insérer après un maillon qu'on tient déjà doit coûter un prix constant." },
              { motif: "\\bfor\\b", message: "Aucune boucle : insérer après un maillon qu'on tient déjà doit coûter un prix constant." },
            ],
            tests: `c = maillon(12, maillon(5, None))\ninserer_apres(c, 9)\nassert c == [12, [9, [5, None]]], "Le 9 doit se glisser entre le 12 et le 5."\nd = maillon(1, None)\ninserer_apres(d, 2)\nassert d == [1, [2, None]], "Insérer après le dernier maillon allonge la chaîne."\ninserer_apres(d, 3)\nassert d == [1, [3, [2, None]]], "Un second appel sur le même maillon insère juste après lui."\ne = maillon("a", maillon("b", maillon("c", None)))\ninserer_apres(e[1], "x")\nassert e == ["a", ["b", ["x", ["c", None]]]], "On peut insérer au milieu, en tenant n'importe quel maillon."\nf = maillon(1, maillon(2, None))\nfin = f[1]\ninserer_apres(f, 99)\nassert f[1][1] is fin, "L'ancien suivant ne doit pas être recopié : le nouveau maillon pointe dessus."`,
          },
          felicitation: "Une insertion au milieu, en une ligne et à prix constant. ✨",
          indices: [
            "Le nouveau maillon doit prendre pour suivant celui que <code>m</code> avait jusqu'ici.",
            "Puis <code>m</code> doit prendre pour suivant le nouveau maillon.",
            "Ces deux gestes tiennent en une seule ligne, à condition de fabriquer le nouveau maillon <em>dans</em> l'affectation : l'ancien suivant est lu avant d'être écrasé.",
          ],
          apres: `<span class="chapo">Une ligne, et l'ordre de lecture compte</span>
            <code>m[1] = maillon(valeur, m[1])</code> : Python évalue d'abord la droite — il
            lit donc l'ancien <code>m[1]</code> et le range dans le nouveau maillon — puis
            écrase <code>m[1]</code>. Les deux gestes sont faits, dans le bon ordre, sans
            variable intermédiaire.
            <br><br>
            Si tu avais écrit l'inverse — d'abord accrocher le nouveau maillon à
            <code>m</code>, puis lui donner un suivant — l'ancienne suite de la chaîne serait
            perdue : plus personne ne pointerait dessus.
            <br><br>
            Compare enfin avec un tableau. Insérer au milieu d'un tableau de 10 000 cases en
            décale 5 000. Ici : <strong>une écriture, quelle que soit la taille</strong>.
            C'est la raison d'être des listes chaînées, et elle tient dans cette ligne.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="encadre">
              <span class="chapo">La représentation</span>
              <pre class="bloc-code"><code>un maillon  :  [valeur, suivant]
m[0]        :  sa valeur
m[1]        :  le maillon suivant, ou None
la chaîne vide : None
une chaîne  :  son premier maillon</code></pre>
            </div>

            <div class="encadre">
              <span class="chapo">Les deux boucles</span>
              <pre class="bloc-code"><code>m = c                     m = c
while m is not None:      while m[1] is not None:
    ...                       m = m[1]
    m = m[1]              # m est le DERNIER maillon

# visiter tous les maillons</code></pre>
            </div>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Coût</th><th>Pourquoi</th></tr>
              <tr><td>ajouter en tête</td><td>constant</td><td>un maillon devant, rien d'autre</td></tr>
              <tr><td>insérer après un maillon connu</td><td>constant</td><td>une flèche à changer</td></tr>
              <tr><td>ajouter en fin</td><td>linéaire</td><td>il faut trouver le dernier</td></tr>
              <tr><td>lire la valeur de rang <em>n</em></td><td>linéaire</td><td>il faut suivre <em>n</em> flèches</td></tr>
              <tr><td>connaître la longueur</td><td>linéaire</td><td>il faut compter</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Oublier <code>m = m[1]</code>.</strong> La boucle ne s'arrête
                jamais.</li>
                <li><strong>Se tromper de condition d'arrêt.</strong>
                <code>m is not None</code> visite tout ; <code>m[1] is not None</code>
                s'arrête sur le dernier. Confondre les deux donne une
                <code>TypeError</code>.</li>
                <li><strong>Oublier le cas de la chaîne vide.</strong> Il n'y a alors aucun
                maillon à modifier : la fonction doit en fabriquer un et le renvoyer.</li>
                <li><strong>Écraser une flèche avant de l'avoir lue.</strong> Le reste de la
                chaîne devient inatteignable, et disparaît pour de bon.</li>
                <li><strong>Croire qu'un maillon est copié.</strong> Il ne l'est jamais :
                deux chaînes peuvent partager toute une fin, et modifier l'une modifie
                l'autre.</li>
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
      intention: "bâtir la pile et la file sur des maillons",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Compter et chercher",
          contenu: `
            <p>Deux fonctions de parcours, pour se mettre en jambes.</p>
            <ul>
              <li><code>longueur(c)</code> renvoie le nombre de maillons de la chaîne ;</li>
              <li><code>appartient(c, valeur)</code> renvoie <code>True</code> si
              <code>valeur</code> figure dans la chaîne.</li>
            </ul>
            <p>Aucune des deux ne modifie quoi que ce soit.</p>`,
          nomFichier: "compter.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef longueur(c):\n    """Renvoie le nombre de maillons de la chaine c."""\n    pass\n\ndef appartient(c, valeur):\n    """Renvoie True si valeur figure dans la chaine c, False sinon."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\blen\\s*\\(", message: "len() compterait les deux cases d'un maillon, pas les maillons de la chaîne." },
            ],
            tests: `assert longueur(None) == 0, "La chaîne vide a une longueur de 0."\nassert longueur(maillon(4, None)) == 1, "Un seul maillon."\nc = maillon(12, maillon(5, maillon(32, None)))\nassert longueur(c) == 3, "Trois maillons."\nassert longueur(c[1]) == 2, "À partir du second maillon, il n'en reste que deux."\nassert longueur(c) == 3, "longueur() ne doit rien modifier."\nassert appartient(c, 5) == True, "Le 5 est au milieu."\nassert appartient(c, 12) == True, "Le 12 est en tête."\nassert appartient(c, 32) == True, "Le 32 est au bout : il ne faut pas s'arrêter avant."\nassert appartient(c, 7) == False, "Le 7 ne figure pas dans la chaîne."\nassert appartient(None, 7) == False, "Rien n'appartient à la chaîne vide."\nlongue = None\nfor v in range(50):\n    longue = maillon(v, longue)\nassert longueur(longue) == 50, "Cinquante maillons."\nassert appartient(longue, 0) == True, "Le premier accroché est tout au bout de la chaîne."\nassert appartient(longue, 50) == False, "..."`,
          },
          felicitation: "Deux parcours de chaîne, et le schéma est acquis. 🔍",
          indices: [
            "Les deux suivent le même schéma : une variable qui part du premier maillon et avance tant qu'elle ne vaut pas <code>None</code>.",
            "Pour <code>longueur</code>, un compteur préparé avant la boucle et renvoyé après.",
            "Pour <code>appartient</code>, dès que la valeur est trouvée la réponse est connue : la fonction peut s'arrêter là. Et si la boucle se termine, c'est que la valeur n'y était pas.",
          ],
          apres: `<span class="chapo">Deux coûts linéaires, et c'est sans remède</span>
            Compter les maillons d'une chaîne demande de tous les traverser, et chercher une
            valeur aussi. Ni l'un ni l'autre ne peut être rendu immédiat par une meilleure
            écriture : l'information n'est nulle part.
            <br><br>
            À moins, bien sûr, de <strong>la ranger quelque part</strong> — un compteur à côté
            de la chaîne, comme la file circulaire de la séance 5 le faisait. C'est un
            compromis classique : on paie un peu de mémoire et un peu de tenue à jour, et l'on
            gagne une réponse immédiate. Tu le retrouveras dans les exercices.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Une pile chaînée",
          contenu: `
            <p>On remonte d'un étage : les maillons deviennent l'<strong>implémentation</strong>
            d'une structure abstraite, et c'est elle qui expose une interface.</p>

            <p>Écris les quatre opérations de la pile de la séance 3 —
            <code>pile_vide</code>, <code>est_vide</code>, <code>empiler</code>,
            <code>depiler</code> — en chaînant des maillons.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi une pile est <code>[premier_maillon]</code></span>
              L'interface impose que <code>empiler</code> <strong>modifie</strong> la pile et
              ne renvoie rien. Or une chaîne, c'est son premier maillon — et empiler change
              ce premier maillon. Si la pile <em>était</em> le maillon, la fonction n'aurait
              aucun moyen de prévenir l'appelant.
              <br><br>
              On range donc la chaîne dans une liste d'une seule case : <code>p[0]</code> est
              le premier maillon, ou <code>None</code>. C'est exactement le procédé de la
              tirelire de la séance 1 — le plus petit récipient modifiable que Python
              propose.
            </div>

            <p>Une pile neuve vaut donc <code>[None]</code>, et une pile contenant 5 puis 8
            — le 8 au sommet — vaut <code>[[8, [5, None]]]</code>.</p>`,
          nomFichier: "pile_chainee.py",
          depart: `# Un maillon est [valeur, suivant]. Une pile est [premier maillon].\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef pile_vide():\n    """Renvoie une pile vide."""\n    pass\n\ndef est_vide(p):\n    """Renvoie True si la pile ne contient aucun element."""\n    pass\n\ndef empiler(p, element):\n    """Pose element au sommet de la pile."""\n    pass\n\ndef depiler(p):\n    """Renvoie l'element du sommet, et le retire.\n\n    Precondition : la pile n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b", message: "Aucune boucle n'est nécessaire : c'est tout l'intérêt de la pile chaînée." },
              { motif: "\\bfor\\b", message: "Aucune boucle n'est nécessaire : c'est tout l'intérêt de la pile chaînée." },
            ],
            tests: `p = pile_vide()\nassert p == [None], "Une pile neuve : une seule case, à None."\nassert est_vide(p) == True, "..."\nempiler(p, 5)\nassert p == [[5, None]], "Un maillon, rangé dans la case de la pile."\nassert est_vide(p) == False, "..."\nempiler(p, 8)\nassert p == [[8, [5, None]]], "Le 8 devient le premier maillon, et le 5 son suivant."\nassert depiler(p) == 8, "Le dernier empilé sort en premier."\nassert p == [[5, None]], "Et il a bien été retiré de la chaîne."\nassert depiler(p) == 5, "..."\nassert est_vide(p) == True, "..."\nq = pile_vide()\nfor v in range(100):\n    empiler(q, v)\nfor v in range(99, -1, -1):\n    assert depiler(q) == v, "Sur cent éléments, l'ordre LIFO doit être respecté."\nassert est_vide(q) == True, "..."\nr = pile_vide()\nempiler(r, "a")\ns = pile_vide()\nassert est_vide(s) == True, "Chaque appel à pile_vide() doit rendre une pile neuve et indépendante."`,
          },
          felicitation: "Une pile sans tableau, sans capacité, et sans une seule boucle. 🥞",
          indices: [
            "Une pile neuve, c'est une liste d'une case contenant la chaîne vide.",
            "<code>empiler</code> accroche un maillon en tête de <code>p[0]</code>, et range le résultat dans <code>p[0]</code>.",
            "<code>depiler</code> doit lire la valeur du premier maillon <em>avant</em> de faire avancer <code>p[0]</code> vers le suivant.",
          ],
          apres: `<span class="chapo">Compare avec les piles de la séance 3</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>par tableau</th><th>à capacité fixe</th><th>chaînée</th></tr>
              <tr><td><code>empiler</code></td><td>constant amorti</td><td>constant</td><td><strong>constant</strong></td></tr>
              <tr><td><code>depiler</code></td><td>constant</td><td>constant</td><td><strong>constant</strong></td></tr>
              <tr><td>Taille</td><td>libre</td><td>fixée d'avance</td><td><strong>libre</strong></td></tr>
              <tr><td>Mémoire par élément</td><td>une case</td><td>une case, réservée d'avance</td><td>deux cases</td></tr>
            </table>
            </div>
            La pile chaînée est la seule des trois à cumuler le coût constant garanti et la
            taille libre. Son prix est la mémoire : chaque élément occupe deux cases au lieu
            d'une, puisqu'il faut ranger la flèche à côté de la valeur.
            <br><br>
            Pour une pile, le tableau reste souvent préférable en pratique — ses cases se
            suivent en mémoire, ce que les processeurs aiment beaucoup. Pour une file, en
            revanche, la donne va changer complètement.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : une chaîne qui casse",
          contenu: `
            <p>Trois fonctions, <strong>trois erreurs de natures différentes</strong> :</p>
            <ul>
              <li>une qui plante sur la chaîne vide ;</li>
              <li>une qui tourne indéfiniment ;</li>
              <li>une qui perd la moitié de la chaîne, sans rien signaler.</li>
            </ul>
            <p>Répare les trois sans changer les noms ni les signatures.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Avant de cliquer sur ▶</span>
              L'un des bugs est une boucle sans fin. Relis les trois fonctions
              <strong>avant</strong> d'exécuter : une boucle infinie bloque l'onglet, et il
              faudra recharger la page.
            </div>`,
          nomFichier: "chaine_cassee.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- Les trois fonctions à réparer. ----\n\ndef premiere_valeur(c):\n    """Renvoie la valeur du premier maillon, ou None si la chaine est vide."""\n    return c[0]\n\ndef longueur(c):\n    """Renvoie le nombre de maillons de la chaine c."""\n    n = 0\n    m = c\n    while m is not None:\n        n = n + 1\n    return n\n\ndef sans_le_premier(c):\n    """Renvoie la chaine privee de son premier maillon.\n\n    Precondition : c n'est pas vide.\n    """\n    return c[1][1]\n`,
          validation: {
            tests: `assert premiere_valeur(None) is None, "Sur la chaîne vide, la fonction doit renvoyer None au lieu de planter."\nassert premiere_valeur(maillon(7, None)) == 7, "Sinon, c'est la valeur du premier maillon."\nc = maillon(12, maillon(5, maillon(32, None)))\nassert premiere_valeur(c) == 12, "..."\nassert longueur(None) == 0, "La chaîne vide a une longueur de 0."\nassert longueur(c) == 3, "Trois maillons — et la fonction doit s'arrêter."\nassert longueur(maillon(1, None)) == 1, "..."\nassert sans_le_premier(c) == [5, [32, None]], "Il ne doit manquer QUE le premier maillon."\nassert sans_le_premier(maillon(1, maillon(2, None))) == [2, None], "Sur deux maillons, il en reste un."\nassert sans_le_premier(maillon(1, None)) is None, "Sur un seul maillon, il ne reste que la chaîne vide."\nassert c == [12, [5, [32, None]]], "Aucune des trois fonctions ne doit modifier la chaîne."`,
          },
          felicitation: "Trois bugs, et le deuxième est celui qui fait redémarrer le navigateur. 🐛",
          indices: [
            "Dans <code>premiere_valeur</code>, demande-toi ce que vaut <code>c</code> quand la chaîne est vide, et ce que <code>c[0]</code> donne alors.",
            "Dans <code>longueur</code>, regarde ce qui change à chaque tour de boucle. La variable testée par la condition évolue-t-elle ?",
            "Dans <code>sans_le_premier</code>, compte les flèches : combien de maillons <code>c[1][1]</code> saute-t-il, et combien faudrait-il en sauter ?",
          ],
          apres: `<span class="chapo">Les trois symptômes, et comment les reconnaître</span>
            <ul>
              <li><strong><code>TypeError: 'NoneType' object is not subscriptable</code></strong> :
              tu as indexé <code>None</code>. Quelque part, une chaîne vide n'a pas été
              traitée à part. C'est de loin l'erreur la plus fréquente des listes
              chaînées.</li>
              <li><strong>L'onglet ne répond plus</strong> : une boucle avance sur une
              variable qui ne change pas. Cherche la ligne <code>m = m[1]</code>
              manquante.</li>
              <li><strong>Aucune erreur, un résultat trop court</strong> : une flèche de trop
              a été suivie. Sur une chaîne, chaque <code>[1]</code> supplémentaire saute un
              maillon — et il n'y a aucun message pour le dire.</li>
            </ul>
            Le troisième est le seul dangereux, parce qu'il ne se voit qu'en comparant au
            résultat attendu. C'est pour cela qu'on écrit des tests.`,
        },

        {
          id: "a4",
          type: "qcm",
          titre: "Ce qui manque à la file chaînée",
          contenu: `
            <p>Passons à la file. La contrainte est d'une autre nature que pour la pile : une
            file utilise <strong>ses deux extrémités</strong>.</p>

            <p>Supposons qu'on la représente comme la pile, par une seule case contenant le
            premier maillon. On sert en tête — immédiat, comme pour la pile. Mais il faut
            aussi faire entrer les arrivants à l'<strong>autre bout</strong>.</p>

            <pre class="bloc-code"><code>f[0] ─▶ ┌───┬───┐   ┌───┬───┐         ┌───┬───┐
        │ · │ ──┼──▶│ · │ ──┼──▶ ⋯ ──▶│ · │ ──┼──▶ None
        └───┴───┘   └───┴───┘         └───┴───┘
         on sert ici                   on doit entrer ici</code></pre>`,
          question: "Que coûte enfiler dans cette représentation ?",
          options: [
            { texte: "Un parcours complet de la file, à chaque arrivée.", correct: true,
              explication: "Oui : il faut retrouver le dernier maillon, et le seul chemin passe par le premier. On a réparé <code>defiler</code>, et cassé <code>enfiler</code> — exactement le problème de la séance 5, sous une autre forme." },
            { texte: "Rien : on accroche le maillon en tête, comme pour la pile.",
              explication: "Accrocher en tête placerait l'arrivant <em>devant</em> tout le monde. La structure servirait alors le dernier arrivé : ce serait une pile, pas une file." },
            { texte: "Un parcours de la moitié de la file, en moyenne.",
              explication: "C'est le coût d'une recherche, qui peut s'arrêter en chemin. Atteindre le dernier maillon demande d'aller jusqu'au bout, à chaque fois." },
            { texte: "Rien, à condition de garder le dernier maillon de côté.",
              explication: "C'est exactement la solution — et c'est ce que tu vas écrire à l'exercice suivant. Mais dans la représentation proposée ici, à une seule case, ce maillon n'est gardé nulle part." },
          ],
          apres: `<span class="chapo">La réparation tient en un champ</span>
            Une file chaînée retiendra donc <strong>deux</strong> choses : le premier maillon,
            pour servir, et le <strong>dernier</strong>, pour faire entrer.
            <pre class="bloc-code"><code>f[0]  le premier maillon — on sert ici
f[1]  le dernier maillon  — on accroche ici</code></pre>
            Le second est un simple raccourci : il ne contient rien de nouveau, il évite
            seulement de reparcourir toute la chaîne pour retrouver une information qu'on
            connaissait déjà.
            <br><br>
            C'est le même compromis qu'au début de la séance : <strong>ranger une information
            à côté, pour ne plus avoir à la recalculer</strong>. Le prix est qu'il faudra
            penser à la tenir à jour — et c'est là que se logent les bugs.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Une file chaînée, à deux pointeurs",
          contenu: `
            <p>Écris les quatre opérations de la file de la séance 4 —
            <code>file_vide</code>, <code>est_vide</code>, <code>enfiler</code>,
            <code>defiler</code> — sur une chaîne à <strong>deux pointeurs</strong>.</p>

            <p>Une file est <code>[premier, dernier]</code>. Une file vide vaut
            <code>[None, None]</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les deux cas particuliers, et ils sont symétriques</span>
              <ul>
                <li><code>enfiler</code> dans une file <strong>vide</strong> : il n'y a pas de
                « dernier maillon » à qui s'accrocher. Le nouveau maillon devient à la fois le
                premier <em>et</em> le dernier.</li>
                <li><code>defiler</code> le <strong>dernier</strong> élément : la file devient
                vide, et le pointeur de fin doit repasser à <code>None</code> — sinon il
                désignerait un maillon qui ne fait plus partie de la file.</li>
              </ul>
              Ces deux cas sont exactement ce que le jeu de tests traque.
            </div>`,
          nomFichier: "file_chainee.py",
          depart: `# Un maillon est [valeur, suivant]. Une file est [premier, dernier].\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef file_vide():\n    """Renvoie une file vide."""\n    pass\n\ndef est_vide(f):\n    """Renvoie True si la file ne contient aucun element."""\n    pass\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file."""\n    pass\n\ndef defiler(f):\n    """Renvoie le premier element arrive, et le retire.\n\n    Precondition : la file n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b", message: "Aucune boucle : c'est tout l'intérêt du second pointeur." },
              { motif: "\\bfor\\b", message: "Aucune boucle : c'est tout l'intérêt du second pointeur." },
            ],
            tests: `f = file_vide()\nassert f == [None, None], "Une file neuve : deux pointeurs à None."\nassert est_vide(f) == True, "..."\nenfiler(f, "a")\nassert est_vide(f) == False, "..."\nassert f[0] is f[1], "Avec un seul maillon, le premier et le dernier sont le même."\nassert f[0][0] == "a", "..."\nenfiler(f, "b")\nassert f[0][0] == "a", "Le premier reste le premier arrivé."\nassert f[1][0] == "b", "Et le dernier pointeur suit le dernier arrivé."\nassert f[0][1] is f[1], "Le maillon de a doit pointer vers celui de b."\nassert defiler(f) == "a", "On sert le premier arrivé."\nassert f[0][0] == "b", "Le b devient le premier."\nassert defiler(f) == "b", "..."\nassert est_vide(f) == True, "La file est vide."\nassert f[1] is None, "Le pointeur de fin doit repasser à None : sinon il désigne un maillon qui n'existe plus pour la file."\nenfiler(f, "c")\nassert defiler(f) == "c", "La file doit pouvoir resservir après avoir été vidée."\nassert est_vide(f) == True, "..."\ng = file_vide()\nfor v in range(200):\n    enfiler(g, v)\nfor v in range(200):\n    assert defiler(g) == v, "Sur deux cents éléments, l'ordre d'arrivée doit être respecté."\nassert est_vide(g) == True, "..."`,
          },
          felicitation: "Les deux opérations à prix constant, et aucune capacité à déclarer. 🏆",
          indices: [
            "<code>est_vide</code> n'a besoin de regarder qu'un seul des deux pointeurs : si le premier est <code>None</code>, il n'y a aucun maillon.",
            "Dans <code>enfiler</code>, fabrique d'abord le nouveau maillon — son suivant est toujours <code>None</code>, puisqu'il entre en dernier. Ensuite, deux cas selon que la file était vide ou non.",
            "Dans <code>defiler</code>, lis la valeur du premier maillon, fais avancer <code>f[0]</code> vers le suivant, et n'oublie pas de remettre <code>f[1]</code> à <code>None</code> si la file vient de se vider.",
          ],
          apres: `<span class="chapo">La meilleure file du chapitre</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Implémentation</th><th><code>enfiler</code></th><th><code>defiler</code></th><th>Taille</th><th>Interface</th></tr>
              <tr><td>par tableau</td><td>constant</td><td>linéaire</td><td>libre</td><td>celle de la séance 4</td></tr>
              <tr><td>circulaire</td><td>constant</td><td>constant</td><td><strong>fixée</strong></td><td>+ <code>est_pleine</code></td></tr>
              <tr><td>par deux piles</td><td>constant</td><td>constant amorti</td><td>libre</td><td>celle de la séance 4</td></tr>
              <tr><td><strong>chaînée</strong></td><td><strong>constant</strong></td><td><strong>constant</strong></td><td><strong>libre</strong></td><td>celle de la séance 4</td></tr>
            </table>
            </div>
            C'est la seule des quatre à tout cumuler : les deux opérations vraiment
            constantes — pas seulement amorties —, aucune capacité à prévoir, et l'interface
            d'origine sans un ajout.
            <br><br>
            Elle a un prix, et il faut savoir le nommer : deux cases de mémoire par élément
            au lieu d'une, et des maillons éparpillés que le processeur met plus de temps à
            lire qu'un tableau bien rangé. C'est pourquoi <code>collections.deque</code>, la
            file de la bibliothèque Python, est en réalité un compromis entre les deux — une
            chaîne de petits tableaux.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Supprimer une valeur",
          contenu: `
            <p><code>supprimer(c, valeur)</code> renvoie la chaîne privée du
            <strong>premier</strong> maillon qui porte cette valeur. Si aucun ne la porte, la
            chaîne est rendue inchangée.</p>

            <pre class="bloc-code"><code>supprimer([12, [5, [32, None]]], 5)   →  [12, [32, None]]
supprimer([12, [5, [32, None]]], 12)  →  [5, [32, None]]
supprimer([12, [5, [32, None]]], 99)  →  [12, [5, [32, None]]]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Supprimer, c'est court-circuiter</span>
              On ne « retire » jamais un maillon : on fait pointer son
              <strong>prédécesseur</strong> vers son successeur. Le maillon devient
              inatteignable, et Python s'en débarrassera tout seul.
              <br><br>
              Deux conséquences : il faut tenir le maillon <em>d'avant</em>, et le premier
              maillon — qui n'en a pas — est forcément un cas à part.
            </div>`,
          nomFichier: "supprimer.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef supprimer(c, valeur):\n    """Renvoie la chaine privee du premier maillon portant valeur.\n\n    Si aucun maillon ne la porte, la chaine est rendue inchangee.\n    """\n    pass\n`,
          validation: {
            tests: `assert supprimer(None, 5) is None, "Supprimer dans la chaîne vide ne fait rien."\nc = maillon(12, maillon(5, maillon(32, None)))\nassert supprimer(c, 5) == [12, [32, None]], "Le maillon du milieu est court-circuité."\nd = maillon(12, maillon(5, maillon(32, None)))\nassert supprimer(d, 12) == [5, [32, None]], "Supprimer le premier maillon change la chaîne elle-même."\ne = maillon(12, maillon(5, maillon(32, None)))\nassert supprimer(e, 32) == [12, [5, None]], "Supprimer le dernier laisse un suivant à None."\nf = maillon(12, maillon(5, maillon(32, None)))\nassert supprimer(f, 99) == [12, [5, [32, None]]], "Une valeur absente laisse la chaîne inchangée."\ng = maillon(1, maillon(1, maillon(2, None)))\nassert supprimer(g, 1) == [1, [2, None]], "Seul le PREMIER maillon portant la valeur est retiré."\nh = maillon(7, None)\nassert supprimer(h, 7) is None, "Supprimer le seul maillon donne la chaîne vide."`,
          },
          felicitation: "Un maillon court-circuité, sans rien recopier. ✂️",
          indices: [
            "Commence par les deux cas où il n'y a rien à chercher : la chaîne vide, et le cas où c'est le premier maillon qui porte la valeur.",
            "Sinon, fais avancer une variable tant que le <strong>suivant</strong> existe et ne porte pas la valeur cherchée. Attention à l'ordre des deux conditions.",
            "Quand la boucle s'arrête, ou bien on est au bout — la valeur n'y était pas — ou bien la variable désigne le maillon d'avant. Il ne reste qu'à lui faire sauter un cran.",
          ],
          apres: `<span class="chapo">Pourquoi le premier maillon est toujours à part</span>
            Tous les autres maillons ont un prédécesseur qu'on peut modifier. Le premier n'en
            a pas : le « prédécesseur » du premier maillon, c'est la variable de l'appelant,
            et une fonction ne peut pas la changer.
            <br><br>
            D'où les deux formes qu'on rencontre partout dans le code sur les chaînes :
            <ul>
              <li><strong>renvoyer la nouvelle chaîne</strong>, et laisser l'appelant écrire
              <code>c = supprimer(c, v)</code> — c'est ce qu'on a fait ici ;</li>
              <li><strong>ranger la chaîne dans une case</strong>, comme <code>p[0]</code>
              pour la pile chaînée, ce qui permet à la fonction de modifier le premier
              maillon elle-même.</li>
            </ul>
            Les deux sont justes. La seconde est plus commode dès qu'une structure complète
            se construit par-dessus.
            <br><br>
            Note enfin l'ordre des conditions du <code>while</code> :
            <code>m[1] is not None</code> doit venir en premier, sinon on lirait
            <code>m[1][0]</code> sur <code>None</code> au dernier tour. C'est le même
            mécanisme d'évaluation paresseuse qu'à la séance 2.`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Une chaîne qui connaît sa longueur",
          contenu: `
            <p>Compter les maillons coûte un parcours complet — tu l'as écrit à l'exercice 1
            de cette partie. Réparons-le en rangeant le compte <strong>à côté</strong>.</p>

            <p>Une <strong>chaîne comptée</strong> est <code>[premier_maillon, nombre]</code>.
            Écris ses quatre opérations :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th><th>Coût exigé</th></tr>
              <tr><td><code>comptee_vide()</code></td><td>une chaîne comptée sans maillon</td><td>constant</td></tr>
              <tr><td><code>comptee_longueur(cc)</code></td><td>le nombre de maillons</td><td><strong>constant</strong></td></tr>
              <tr><td><code>comptee_ajouter(cc, valeur)</code></td><td>accroche un maillon en tête</td><td>constant</td></tr>
              <tr><td><code>comptee_retirer(cc)</code></td><td>retire le premier maillon et renvoie sa valeur</td><td>constant</td></tr>
            </table>
            </div>

            <p>Précondition de <code>comptee_retirer</code> : la chaîne n'est pas vide.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Aucune boucle nulle part</span>
              C'est tout l'objet de l'exercice : les quatre opérations, y compris
              <code>comptee_longueur</code>, doivent coûter la même chose quel que soit le
              nombre de maillons.
            </div>`,
          nomFichier: "comptee.py",
          depart: `# Un maillon est [valeur, suivant].\n# Une chaîne comptée est [premier maillon, nombre de maillons].\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# ---- À toi. ----\n\ndef comptee_vide():\n    """Renvoie une chaine comptee sans aucun maillon."""\n    pass\n\ndef comptee_longueur(cc):\n    """Renvoie le nombre de maillons, en temps constant."""\n    pass\n\ndef comptee_ajouter(cc, valeur):\n    """Accroche un maillon de valeur en tete. Ne renvoie rien."""\n    pass\n\ndef comptee_retirer(cc):\n    """Retire le premier maillon et renvoie sa valeur.\n\n    Precondition : la chaine n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b", message: "Aucune boucle : la longueur doit être lue, pas recomptée." },
              { motif: "\\bfor\\b", message: "Aucune boucle : la longueur doit être lue, pas recomptée." },
            ],
            tests: `cc = comptee_vide()\nassert cc == [None, 0], "Une chaîne comptée neuve : aucun maillon, et un compte à zéro."\nassert comptee_longueur(cc) == 0, "..."\ncomptee_ajouter(cc, 5)\nassert cc[1] == 1, "Le compte doit suivre les ajouts."\nassert cc[0] == [5, None], "Et le maillon doit être accroché."\ncomptee_ajouter(cc, 8)\nassert comptee_longueur(cc) == 2, "Deux maillons."\nassert cc[0] == [8, [5, None]], "Le dernier ajouté passe en tête."\nassert comptee_retirer(cc) == 8, "On retire par la tête."\nassert comptee_longueur(cc) == 1, "Le compte doit suivre les retraits."\nassert comptee_retirer(cc) == 5, "..."\nassert comptee_longueur(cc) == 0, "..."\nassert cc == [None, 0], "Une fois vidée, la chaîne comptée doit retrouver son état initial."\ndd = comptee_vide()\nfor v in range(500):\n    comptee_ajouter(dd, v)\nassert comptee_longueur(dd) == 500, "Cinq cents ajouts."\nfor v in range(499, -1, -1):\n    assert comptee_retirer(dd) == v, "Et les retraits se font dans l'ordre inverse."\nassert comptee_longueur(dd) == 0, "..."`,
          },
          felicitation: "Une longueur lue au lieu d'être recomptée. 📏",
          indices: [
            "Les quatre opérations travaillent sur les deux cases de <code>cc</code> : <code>cc[0]</code> pour la chaîne, <code>cc[1]</code> pour le compte.",
            "<code>comptee_longueur</code> tient en une lecture — elle ne parcourt rien du tout.",
            "<code>comptee_ajouter</code> et <code>comptee_retirer</code> font chacune deux choses : modifier la chaîne, et <strong>tenir le compte à jour</strong>. Oublier la seconde est l'erreur de l'exercice.",
          ],
          apres: `<span class="chapo">Le compromis, et sa contrepartie</span>
            On a échangé un parcours complet contre une case de mémoire et deux lignes de
            tenue à jour. L'affaire est excellente — mais elle crée une obligation nouvelle :
            <strong>toute opération qui touche à la chaîne doit penser au compteur</strong>.
            <br><br>
            C'est un <em>invariant</em> : une propriété qui doit rester vraie entre deux
            appels, ici « <code>cc[1]</code> est le nombre de maillons de <code>cc[0]</code> ».
            Le jour où quelqu'un ajoutera une opération et oubliera de mettre le compteur à
            jour, la structure mentira sans jamais lever d'erreur.
            <br><br>
            Tu as déjà rencontré cette idée sans la nommer : le compteur de la file
            circulaire, et le pointeur de fin de la file chaînée, sont exactement de la même
            nature. Chaque fois qu'une structure retient une information redondante, elle
            gagne en vitesse et se donne un invariant à tenir.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "retourner les flèches, et faire coopérer deux chaînes",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Le piège du partage",
          contenu: `
            <p>Deux chaînes sont construites à partir d'une même queue.</p>
            <pre class="bloc-code"><code>queue = maillon(5, maillon(32, None))
a = maillon(12, queue)
b = maillon(99, queue)

a[1][0] = 7

print(vers_tableau(b))</code></pre>
            <p>Rappel du dessin :</p>
            <pre class="bloc-code"><code>a ─▶ ┌────┬───┐
     │ 12 │ ──┼──┐
     └────┴───┘  │   ┌───┬───┐   ┌────┬───┐
                 ├──▶│ 5 │ ──┼──▶│ 32 │ ──┼──▶ None
     ┌────┬───┐  │   └───┴───┘   └────┴───┘
b ─▶ │ 99 │ ──┼──┘
     └────┴───┘</code></pre>`,
          question: "Qu'affiche la dernière ligne ?",
          options: [
            { texte: "<code>[99, 7, 32]</code>", correct: true,
              explication: "Oui. <code>a[1]</code> est le maillon du 5 — et c'est exactement le même objet que <code>b[1]</code>. Le modifier par le chemin de <code>a</code> le modifie pour <code>b</code> aussi." },
            { texte: "<code>[99, 5, 32]</code>",
              explication: "Ce serait le cas si <code>b</code> possédait sa propre copie de la queue. Or aucune copie n'a été faite : les deux maillons de tête pointent vers la même chaîne." },
            { texte: "<code>[7, 5, 32]</code>",
              explication: "<code>a[1][0]</code> désigne la valeur du <em>second</em> maillon, pas du premier. Le 99 de <code>b</code> ne bouge pas." },
            { texte: "Une erreur : <code>b</code> n'a pas été modifiée.",
              explication: "Aucune erreur : la ligne modifie un maillon parfaitement valide. C'est bien ce qui rend le piège sournois." },
          ],
          apres: `<span class="chapo">La contrepartie du chaînage</span>
            À la séance 2, ce partage était sans danger : les maillons étaient des p-uplets,
            que personne ne pouvait modifier. Ici, une seule ligne à un endroit du programme
            change ce qu'affiche un autre endroit — sans que rien ne le laisse deviner.
            <br><br>
            Deux réflexes à prendre :
            <ul>
              <li>quand une fonction reçoit une chaîne et la modifie, sa spécification doit le
              <strong>dire</strong> — c'est à cela que sert la ligne « Effet » ;</li>
              <li>quand on veut vraiment deux chaînes indépendantes, il faut les
              <strong>copier maillon par maillon</strong>, et pas seulement recopier le
              premier pointeur.</li>
            </ul>
            C'est le même piège que <code>M = L</code> sur les listes Python, vu en Première.
            En chaînage, il est simplement plus facile à créer sans s'en apercevoir.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Retourner toutes les flèches",
          contenu: `
            <p>Le classique des listes chaînées, et une question d'entretien d'embauche
            célèbre. <code>renverser(c)</code> renvoie la chaîne dont les maillons sont dans
            l'ordre inverse.</p>

            <pre class="bloc-code"><code>avant  12 ──▶ 5 ──▶ 32 ──▶ None
après  32 ──▶ 5 ──▶ 12 ──▶ None</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Sur place, sans fabriquer un seul maillon</span>
              <strong>✓ Valider</strong> refusera tout appel à <code>maillon</code> : il ne
              s'agit pas de reconstruire une chaîne, mais de <strong>retourner les
              flèches</strong> des maillons existants.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le geste</span>
              Avance de maillon en maillon en faisant pointer chacun vers celui que tu viens
              de quitter. Il te faut donc retenir trois choses à la fois : le maillon
              précédent, le maillon courant, et — avant de l'écraser — le maillon suivant.
              <br><br>
              Cette troisième variable est le cœur de l'exercice : si tu écrases la flèche
              avant d'avoir noté où elle menait, tout le reste de la chaîne est perdu.
            </div>`,
          nomFichier: "renverser.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\ndef vers_tableau(c):\n    """Fournie, pour tes essais."""\n    t = []\n    m = c\n    while m is not None:\n        t.append(m[0])\n        m = m[1]\n    return t\n\n\n# ---- À toi. ----\n\ndef renverser(c):\n    """Renvoie la chaine c, ses maillons dans l'ordre inverse.\n\n    Effet : les maillons de c sont modifies sur place.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bmaillon\\s*\\([\\s\\S]*\\bmaillon\\s*\\([\\s\\S]*\\bmaillon\\s*\\(",
                message: "Ne fabrique pas de nouveaux maillons : retourne les flèches de ceux qui existent." },
            ],
            tests: `assert renverser(None) is None, "La chaîne vide renversée reste vide."\nc = maillon(4, None)\nassert vers_tableau(renverser(c)) == [4], "Une chaîne d'un maillon est son propre renversé."\nd = maillon(12, maillon(5, maillon(32, None)))\nr = renverser(d)\nassert vers_tableau(r) == [32, 5, 12], "Les trois valeurs dans l'ordre inverse."\nassert r is not None, "..."\ne = maillon(1, maillon(2, None))\npremier = e\nr2 = renverser(e)\nassert vers_tableau(r2) == [2, 1], "Sur deux maillons."\nassert premier[1] is None, "L'ancien premier maillon est devenu le dernier : son suivant doit être None."\nf = None\nfor v in range(6):\n    f = maillon(v, f)\nassert vers_tableau(f) == [5, 4, 3, 2, 1, 0], "..."\nassert vers_tableau(renverser(f)) == [0, 1, 2, 3, 4, 5], "Sur six maillons aussi."\ng = maillon("a", maillon("b", maillon("c", None)))\nassert vers_tableau(renverser(renverser(g))) == ["a", "b", "c"], "Renverser deux fois redonne la chaîne de départ."`,
          },
          felicitation: "Toutes les flèches retournées, et pas un maillon fabriqué. ↩️",
          indices: [
            "Trois variables avant la boucle : le précédent — qui vaut <code>None</code> au départ, puisque le premier maillon deviendra le dernier —, le courant, et de quoi retenir le suivant.",
            "À chaque tour, quatre gestes dans cet ordre : noter le suivant, faire pointer le courant vers le précédent, avancer le précédent sur le courant, avancer le courant sur le suivant noté.",
            "Quand la boucle s'arrête, le courant vaut <code>None</code> et c'est le <em>précédent</em> qui désigne le nouveau premier maillon : c'est lui qu'il faut renvoyer.",
          ],
          apres: `<span class="chapo">Pourquoi trois variables, et pas deux</span>
            La ligne <code>courant[1] = precedent</code> détruit l'information « où est le
            maillon suivant ». Si on ne l'a pas notée juste avant, le reste de la chaîne
            devient inatteignable : plus aucun maillon ne pointe dessus, et Python le
            supprime. La chaîne est perdue pour de bon.
            <br><br>
            C'est une situation qu'on retrouve partout dès qu'on manipule des liens :
            <strong>avant d'écraser une référence, s'assurer que ce qu'elle désigne est
            atteignable autrement</strong>. Le même raisonnement vaudra pour les arbres, au
            chapitre suivant.
            <br><br>
            Remarque enfin le coût : un seul parcours, aucune allocation. Renverser une chaîne
            de dix mille maillons ne consomme pas un octet de plus.`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Concaténer en temps constant",
          contenu: `
            <p>Accrocher une chaîne au bout d'une autre demande normalement de parcourir la
            première jusqu'au dernier maillon. Avec un <strong>pointeur de fin</strong>, cela
            devient immédiat.</p>

            <p>On travaille ici sur des <strong>chaînes à deux pointeurs</strong>, comme la
            file de l'exercice 5 : <code>[premier, dernier]</code>, et
            <code>[None, None]</code> quand elle est vide.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th><th>Coût exigé</th></tr>
              <tr><td><code>bout_vide()</code></td><td>une chaîne à deux pointeurs, vide</td><td>constant</td></tr>
              <tr><td><code>bout_ajouter(b, valeur)</code></td><td>accroche un maillon à la fin</td><td>constant</td></tr>
              <tr><td><code>concatener(b1, b2)</code></td><td>accroche <code>b2</code> à la fin de <code>b1</code></td><td><strong>constant</strong></td></tr>
            </table>
            </div>

            <p><code>concatener</code> modifie <code>b1</code> et ne renvoie rien. Après
            l'appel, <code>b2</code> ne doit plus être utilisée — ses maillons appartiennent
            désormais à <code>b1</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Trois cas, et deux sont vite expédiés</span>
              Si <code>b2</code> est vide, il n'y a rien à faire. Si <code>b1</code> est vide,
              elle devient tout simplement <code>b2</code>. Sinon, une seule flèche à changer,
              et un pointeur de fin à mettre à jour.
            </div>`,
          nomFichier: "concatener.py",
          depart: `# Un maillon est [valeur, suivant].\n# Une chaîne à deux pointeurs est [premier, dernier].\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\ndef vers_tableau(b):\n    """Fournie, pour tes essais."""\n    t = []\n    m = b[0]\n    while m is not None:\n        t.append(m[0])\n        m = m[1]\n    return t\n\n\n# ---- À toi. ----\n\ndef bout_vide():\n    """Renvoie une chaine a deux pointeurs, vide."""\n    pass\n\ndef bout_ajouter(b, valeur):\n    """Accroche un maillon de valeur a la fin de b. Ne renvoie rien."""\n    pass\n\ndef concatener(b1, b2):\n    """Accroche b2 a la fin de b1, en temps constant.\n\n    Effet : b1 est modifiee. b2 ne doit plus etre utilisee ensuite.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bwhile\\b[\\s\\S]*\\bwhile\\b",
                message: "Aucune boucle dans tes trois fonctions : c'est tout l'objet du pointeur de fin. (Celle de vers_tableau, fournie pour tes essais, ne compte pas.)" },
              { motif: "\\bfor\\b", message: "Aucune boucle : c'est tout l'objet du pointeur de fin." },
            ],
            tests: `b = bout_vide()\nassert b == [None, None], "Une chaîne à deux pointeurs, vide."\nassert vers_tableau(b) == [], "..."\nbout_ajouter(b, 1)\nassert b[0] is b[1], "Avec un seul maillon, le premier et le dernier sont le même."\nbout_ajouter(b, 2)\nbout_ajouter(b, 3)\nassert vers_tableau(b) == [1, 2, 3], "Les ajouts se font à la fin, dans l'ordre."\nassert b[1][0] == 3, "Le pointeur de fin doit désigner le dernier ajouté."\nx = bout_vide()\ny = bout_vide()\nfor v in [1, 2]:\n    bout_ajouter(x, v)\nfor v in [3, 4]:\n    bout_ajouter(y, v)\nconcatener(x, y)\nassert vers_tableau(x) == [1, 2, 3, 4], "Les maillons de y doivent suivre ceux de x."\nassert x[1][0] == 4, "Le pointeur de fin de x doit désigner le dernier maillon de y."\nbout_ajouter(x, 5)\nassert vers_tableau(x) == [1, 2, 3, 4, 5], "Et la chaîne doit rester utilisable après la concaténation."\nu = bout_vide()\nv = bout_vide()\nfor k in [7, 8]:\n    bout_ajouter(v, k)\nconcatener(u, v)\nassert vers_tableau(u) == [7, 8], "Concaténer sur une chaîne vide donne la seconde."\nassert u[1][0] == 8, "Et son pointeur de fin doit suivre."\nw = bout_vide()\nfor k in [1, 2]:\n    bout_ajouter(w, k)\nconcatener(w, bout_vide())\nassert vers_tableau(w) == [1, 2], "Concaténer une chaîne vide ne change rien."\nassert w[1][0] == 2, "Et ne doit surtout pas effacer le pointeur de fin."`,
          },
          felicitation: "Deux chaînes de mille maillons recollées en trois affectations. ⚡",
          indices: [
            "<code>bout_ajouter</code> est l'<code>enfiler</code> de la file chaînée, mot pour mot : un maillon neuf, puis deux cas selon que la chaîne était vide ou non.",
            "Dans <code>concatener</code>, traite d'abord le cas où <code>b2</code> est vide : il n'y a rien à faire, et surtout rien à écraser.",
            "Ensuite, si <code>b1</code> est vide, ses deux pointeurs prennent ceux de <code>b2</code>. Sinon, le dernier maillon de <code>b1</code> doit pointer vers le premier de <code>b2</code>, et le pointeur de fin de <code>b1</code> devient celui de <code>b2</code>.",
          ],
          apres: `<span class="chapo">Compare avec les tableaux</span>
            Concaténer deux tableaux de mille cases en recopie deux mille. Ici : trois
            affectations, quelle que soit la longueur des deux chaînes.
            <br><br>
            C'est l'argument décisif en faveur du chaînage dans tous les programmes qui
            passent leur temps à <strong>assembler</strong> des morceaux — un éditeur de
            texte, un compilateur qui construit du code, un moteur de rendu qui empile des
            fragments.
            <br><br>
            Et remarque la phrase de la spécification : « <code>b2</code> ne doit plus être
            utilisée ensuite ». Ce n'est pas une précaution de style. Après l'appel, les deux
            chaînes partagent des maillons : ajouter quelque chose à <code>b2</code>
            l'ajouterait aussi à <code>b1</code>, et le pointeur de fin de <code>b1</code>
            deviendrait faux. Quand une opération consomme son argument, la spécification
            doit le dire — sinon le piège de l'exercice précédent est garanti.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Insérer à sa place dans une chaîne triée",
          contenu: `
            <p><code>inserer_trie(c, valeur)</code> reçoit une chaîne <strong>triée par ordre
            croissant</strong> et y insère un maillon à la bonne place. Elle renvoie la chaîne
            obtenue.</p>

            <pre class="bloc-code"><code>inserer_trie([2, [7, [9, None]]], 5)  →  [2, [5, [7, [9, None]]]]
inserer_trie([2, [7, [9, None]]], 1)  →  [1, [2, [7, [9, None]]]]
inserer_trie([2, [7, [9, None]]], 42) →  [2, [7, [9, [42, None]]]]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Compare avec la séance 2</span>
              Là-bas, les maillons étaient immuables : il fallait mettre de côté tout ce qu'on
              traversait, puis le reconstruire — deux boucles et une réserve.
              <br><br>
              Ici, rien de tout cela. Il suffit de <strong>s'arrêter sur le maillon
              d'avant</strong> et de glisser le nouveau derrière lui. Rien n'est recopié.
            </div>

            <div class="encadre">
              <span class="chapo">Le cas à part, toujours le même</span>
              Si la valeur doit se placer en tête — chaîne vide, ou premier maillon déjà plus
              grand —, il n'y a pas de maillon d'avant à modifier. La fonction renvoie alors
              une nouvelle tête.
            </div>`,
          nomFichier: "trie.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\ndef vers_tableau(c):\n    """Fournie, pour tes essais."""\n    t = []\n    m = c\n    while m is not None:\n        t.append(m[0])\n        m = m[1]\n    return t\n\n\n# ---- À toi. ----\n\ndef inserer_trie(c, valeur):\n    """Renvoie la chaine triee c, avec un maillon de valeur a sa place.\n\n    Precondition : c est triee par ordre croissant.\n    """\n    pass\n`,
          validation: {
            tests: `assert vers_tableau(inserer_trie(None, 5)) == [5], "Insérer dans la chaîne vide donne un seul maillon."\nc = maillon(2, maillon(7, maillon(9, None)))\nassert vers_tableau(inserer_trie(c, 5)) == [2, 5, 7, 9], "Le 5 se glisse entre 2 et 7."\nd = maillon(2, maillon(7, maillon(9, None)))\nassert vers_tableau(inserer_trie(d, 1)) == [1, 2, 7, 9], "Un élément plus petit que tous les autres passe en tête."\ne = maillon(2, maillon(7, maillon(9, None)))\nassert vers_tableau(inserer_trie(e, 42)) == [2, 7, 9, 42], "Un élément plus grand que tous les autres se place à la fin."\nf = maillon(2, maillon(7, None))\nassert vers_tableau(inserer_trie(f, 7)) == [2, 7, 7], "Un doublon est accepté."\ng = None\nfor v in [9, 3, 7, 1, 5]:\n    g = inserer_trie(g, v)\nassert vers_tableau(g) == [1, 3, 5, 7, 9], "Cinq insertions successives doivent produire une chaîne triée."\nh = None\nfor v in [4, 4, 2, 8]:\n    h = inserer_trie(h, v)\nassert vers_tableau(h) == [2, 4, 4, 8], "L'ordre d'insertion ne change rien au résultat."`,
          },
          felicitation: "Le tri par insertion, version chaînée — et sans la moindre recopie. 🪡",
          indices: [
            "Commence par le cas où la valeur passe en tête : chaîne vide, ou première valeur déjà supérieure ou égale. Un seul maillon à fabriquer, et c'est lui qu'on renvoie.",
            "Sinon, avance tant que le <strong>suivant</strong> existe et porte une valeur strictement inférieure à celle qu'on insère.",
            "Quand la boucle s'arrête, la variable désigne le maillon d'avant. Glisse le nouveau maillon derrière lui — c'est l'insertion en temps constant de la découverte — puis renvoie la chaîne de départ.",
          ],
          apres: `<span class="chapo">Le même problème, deux supports, deux programmes</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Séance 2 — p-uplets immuables</th><th>Ici — maillons mutables</th></tr>
              <tr><td>Structure du code</td><td>deux boucles, une réserve</td><td>une boucle, une affectation</td></tr>
              <tr><td>Maillons fabriqués</td><td>tous ceux d'avant, plus le nouveau</td><td><strong>un seul</strong></td></tr>
              <tr><td>Chaîne d'origine</td><td>intacte</td><td><strong>modifiée</strong></td></tr>
            </table>
            </div>
            La version mutable est plus courte et bien moins coûteuse. Elle a un revers, et il
            est important : la chaîne reçue est modifiée, donc toute autre partie du programme
            qui la désignait voit le changement — le piège de l'exercice 1.
            <br><br>
            Ce n'est pas un progrès unilatéral, c'est un <strong>échange</strong> : on gagne
            en vitesse et en mémoire, on perd la tranquillité du partage. Savoir nommer cet
            échange vaut mieux que savoir écrire les deux versions.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le maillon du milieu, en un seul parcours",
          contenu: `
            <p>Trouver le maillon du milieu d'une chaîne demande naïvement
            <strong>deux</strong> parcours : un pour compter, un pour avancer de la moitié.</p>

            <p><code>milieu(c)</code> doit le faire en <strong>un seul</strong>, et renvoyer
            la <em>valeur</em> du maillon du milieu. Si la chaîne a un nombre pair de
            maillons, on prend celui de droite — le <em>n</em>/2-ième en comptant à partir
            de 0.</p>

            <pre class="bloc-code"><code>[1, 2, 3]        →  2      (3 maillons, celui de rang 1)
[1, 2, 3, 4]     →  3      (4 maillons, celui de rang 2)
[1]              →  1</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La technique des deux curseurs</span>
              Fais avancer <strong>deux</strong> variables en même temps depuis le début : la
              lente d'un maillon par tour, la rapide de <strong>deux</strong>. Quand la rapide
              atteint le bout, la lente est au milieu.
              <br><br>
              Toute la difficulté est la condition d'arrêt : la rapide doit pouvoir faire
              <em>deux</em> pas, et il faut donc vérifier qu'elle et son suivant existent
              tous les deux — dans cet ordre.
            </div>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>c</code> n'est pas vide.
            </div>`,
          nomFichier: "milieu.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\ndef depuis_tableau(t):\n    """Fournie, pour tes essais."""\n    c = None\n    for i in range(len(t) - 1, -1, -1):\n        c = maillon(t[i], c)\n    return c\n\n\n# ---- À toi. ----\n\ndef milieu(c):\n    """Renvoie la valeur du maillon du milieu de c, en un seul parcours.\n\n    Pour un nombre pair de maillons, c'est celui de rang n // 2.\n    Precondition : c n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\blen\\s*\\(\\s*c\\b", message: "On ne connaît pas la longueur de la chaîne : c'est justement le problème." },
            ],
            tests: `assert milieu(depuis_tableau([1])) == 1, "Un seul maillon : c'est lui le milieu."\nassert milieu(depuis_tableau([1, 2])) == 2, "Deux maillons : on prend celui de rang 1."\nassert milieu(depuis_tableau([1, 2, 3])) == 2, "Trois maillons : celui de rang 1."\nassert milieu(depuis_tableau([1, 2, 3, 4])) == 3, "Quatre maillons : celui de rang 2."\nassert milieu(depuis_tableau([1, 2, 3, 4, 5])) == 3, "Cinq maillons : celui de rang 2."\nassert milieu(depuis_tableau([1, 2, 3, 4, 5, 6])) == 4, "Six maillons : celui de rang 3."\nassert milieu(depuis_tableau(["a", "b", "c"])) == "b", "La fonction ne suppose rien du type des valeurs."\ngrand = depuis_tableau(list(range(101)))\nassert milieu(grand) == 50, "Sur 101 maillons, le milieu est le rang 50."\npair = depuis_tableau(list(range(100)))\nassert milieu(pair) == 50, "Sur 100 maillons, on prend le rang 50."\nc = depuis_tableau([1, 2, 3])\nmilieu(c)\nassert c == [1, [2, [3, None]]], "milieu() ne doit rien modifier."`,
          },
          felicitation: "Deux curseurs, un seul parcours, et aucune longueur à connaître. 🐢🐇",
          indices: [
            "Deux variables partent du premier maillon. La boucle continue tant que la rapide peut avancer de deux crans.",
            "La condition d'arrêt doit vérifier deux choses : que la rapide existe, et que son suivant existe aussi. L'ordre compte — tester le suivant d'un maillon qui n'existe pas provoquerait une erreur.",
            "Dans la boucle, la lente avance d'un cran et la rapide de deux. À la sortie, c'est la valeur portée par la lente qu'il faut renvoyer.",
          ],
          apres: `<span class="chapo">Une technique qui sert bien au-delà</span>
            Les « deux curseurs à vitesses différentes » — la <em>tortue et le lièvre</em> —
            résolvent plusieurs problèmes qu'on ne saurait pas traiter autrement sur une
            chaîne dont on ignore la longueur :
            <ul>
              <li>trouver le milieu, comme ici ;</li>
              <li>trouver le <em>k</em>-ième maillon avant la fin, en décalant simplement le
              départ d'un des deux curseurs ;</li>
              <li><strong>détecter un cycle</strong> : si une chaîne se referme sur
              elle-même, la rapide finit par rattraper la lente. Sans cycle, elle atteint la
              fin. C'est le seul moyen connu de le savoir sans mémoire supplémentaire.</li>
            </ul>
            Ce dernier point n'est pas théorique : une chaîne qui boucle est un bug classique
            du chaînage — il suffit de faire pointer un maillon vers un de ses prédécesseurs,
            et tout parcours tourne indéfiniment.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Fusionner deux chaînes triées",
          contenu: `
            <p>Défi de synthèse, et une brique que tu retrouveras cette année.
            <code>fusionner(a, b)</code> reçoit <strong>deux chaînes triées par ordre
            croissant</strong> et renvoie une chaîne triée contenant tous leurs maillons.</p>

            <pre class="bloc-code"><code>a : 1 ──▶ 4 ──▶ 9
b : 2 ──▶ 3 ──▶ 10

résultat : 1 ──▶ 2 ──▶ 3 ──▶ 4 ──▶ 9 ──▶ 10</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Sans fabriquer un seul maillon</span>
              <strong>✓ Valider</strong> refusera tout appel à <code>maillon</code> : il s'agit
              de <strong>recoudre</strong> les maillons existants, pas d'en créer. C'est ce qui
              rend la fusion de deux chaînes bien moins coûteuse que celle de deux tableaux.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le geste</span>
              À chaque tour, compare les deux premières valeurs encore disponibles, décroche la
              plus petite, et accroche-la à la fin du résultat. Quand l'une des deux chaînes
              est épuisée, il ne reste qu'à accrocher tout le reste de l'autre <em>d'un
              bloc</em> — elle est déjà triée.
              <br><br>
              Garde une variable sur le dernier maillon du résultat : sans elle, il faudrait
              reparcourir à chaque fois.
            </div>`,
          nomFichier: "fusionner.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\ndef depuis_tableau(t):\n    """Fournie, pour tes essais."""\n    c = None\n    for i in range(len(t) - 1, -1, -1):\n        c = maillon(t[i], c)\n    return c\n\ndef vers_tableau(c):\n    """Fournie, pour tes essais."""\n    t = []\n    m = c\n    while m is not None:\n        t.append(m[0])\n        m = m[1]\n    return t\n\n\n# ---- À toi. ----\n\ndef fusionner(a, b):\n    """Renvoie une chaine triee contenant les maillons de a et de b.\n\n    Precondition : a et b sont triees par ordre croissant.\n    Effet : les maillons de a et b sont recousus. a et b ne doivent plus servir.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bmaillon\\s*\\([\\s\\S]*\\bmaillon\\s*\\([\\s\\S]*\\bmaillon\\s*\\([\\s\\S]*\\bmaillon\\s*\\(",
                message: "Ne fabrique pas de maillons : recouds ceux qui existent." },
              { motif: "\\bsorted\\s*\\(", message: "Les deux chaînes sont déjà triées : il n'y a rien à trier, seulement à intercaler." },
            ],
            tests: `assert fusionner(None, None) is None, "Deux chaînes vides donnent la chaîne vide."\nassert vers_tableau(fusionner(depuis_tableau([1, 2]), None)) == [1, 2], "Si b est vide, on obtient a."\nassert vers_tableau(fusionner(None, depuis_tableau([3, 4]))) == [3, 4], "Si a est vide, on obtient b."\nr = fusionner(depuis_tableau([1, 4, 9]), depuis_tableau([2, 3, 10]))\nassert vers_tableau(r) == [1, 2, 3, 4, 9, 10], "Les six valeurs, triées."\nr2 = fusionner(depuis_tableau([1, 2, 3]), depuis_tableau([4, 5, 6]))\nassert vers_tableau(r2) == [1, 2, 3, 4, 5, 6], "Quand toute une chaîne précède l'autre."\nr3 = fusionner(depuis_tableau([4, 5, 6]), depuis_tableau([1, 2, 3]))\nassert vers_tableau(r3) == [1, 2, 3, 4, 5, 6], "Et dans l'autre sens."\nr4 = fusionner(depuis_tableau([1, 3, 5]), depuis_tableau([1, 3, 5]))\nassert vers_tableau(r4) == [1, 1, 3, 3, 5, 5], "Les doublons sont conservés."\nr5 = fusionner(depuis_tableau([7]), depuis_tableau([2, 9]))\nassert vers_tableau(r5) == [2, 7, 9], "Sur des chaînes de longueurs différentes."\nr6 = fusionner(depuis_tableau(list(range(0, 60, 2))), depuis_tableau(list(range(1, 60, 2))))\nassert vers_tableau(r6) == list(range(60)), "Sur soixante valeurs alternées."`,
          },
          felicitation: "Deux chaînes triées recousues en une seule. C'est le cœur du tri fusion. 🧵",
          indices: [
            "Commence par les deux cas faciles : si l'une des deux chaînes est vide, la réponse est l'autre.",
            "Choisis ensuite le premier maillon du résultat : c'est celui des deux qui porte la plus petite valeur. Avance la chaîne correspondante d'un cran, et retiens ce maillon comme « dernier du résultat ».",
            "Puis une boucle tant que les <strong>deux</strong> chaînes ont encore quelque chose : accroche la plus petite tête au dernier du résultat, et fais avancer les deux variables concernées. À la sortie, accroche d'un coup ce qui reste de la chaîne non épuisée.",
          ],
          apres: `<span class="chapo">Ce que tu viens d'écrire</span>
            La fusion de deux listes triées est la seconde moitié du <strong>tri
            fusion</strong>, qui figure au programme de terminale dans la rubrique
            « diviser pour régner ». Le principe : couper la liste en deux, trier chaque
            moitié — de la même façon —, puis fusionner. C'est un des rares tris dont le coût
            reste de l'ordre de <em>n</em>&nbsp;log<sub>2</sub>&nbsp;<em>n</em> même dans le
            pire des cas.
            <br><br>
            Et sur une liste chaînée, la fusion ne coûte <strong>aucune mémoire
            supplémentaire</strong> : on recoud des maillons qui existent déjà. Sur un
            tableau, il faudrait un second tableau de même taille pour y ranger le résultat.
            C'est l'une des rares situations où le chaînage l'emporte nettement — et c'est
            pour cela que les bibliothèques qui trient des listes chaînées utilisent
            précisément ce tri.
            <br><br>
            Tu retrouveras cet algorithme cette année, presque à l'identique.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "À toi de chaîner",
          contenu: `
            <p>Dernier défi, libre. Construis une structure de ton choix sur des maillons, et
            fais-la fonctionner.</p>

            <p>Quelques idées : une <strong>playlist</strong> où l'on insère un titre après
            celui qui joue, un <strong>historique</strong> qui ne garde que les dernières
            entrées, un <strong>ensemble trié</strong> sans doublons, un
            <strong>polynôme</strong> dont chaque maillon porte un coefficient et un degré,
            une <strong>liste circulaire</strong> dont le dernier maillon pointe vers le
            premier…</p>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>au moins <strong>trois fonctions</strong>, chacune avec sa
              <strong>docstring</strong> : une qui crée, une qui modifie la chaîne, une qui
              l'interroge sans la modifier ;</li>
              <li>au moins une qui <strong>parcourt</strong> les maillons avec une
              boucle ;</li>
              <li>en dessous, un programme d'essai qui affiche au moins <strong>trois
              lignes</strong>.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux pièges à surveiller</span>
              Traite la chaîne vide dans chaque fonction — c'est là que tout casse. Et si tu
              choisis la liste circulaire, souviens-toi qu'un parcours ordinaire n'y
              terminerait jamais : il faut s'arrêter au retour sur le premier maillon.
            </div>`,
          nomFichier: "ma_chaine.py",
          depart: `# Un maillon est [valeur, suivant]. La chaîne vide est None.\n\ndef maillon(valeur, suivant):\n    return [valeur, suivant]\n\n\n# Ma structure : .....................\n#\n# Écris ici tes fonctions, chacune avec sa docstring,\n# puis le programme d'essai en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){4}",
                message: "Il faut au moins trois fonctions à toi, en plus de maillon()." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){3}",
                message: "Chacune de tes fonctions doit porter une docstring." },
              { motif: "\\bwhile\\b",
                message: "Au moins une de tes fonctions doit parcourir les maillons avec une boucle." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme d'essai doit afficher au moins trois lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Une structure chaînée conçue, écrite et essayée. La séance est bouclée. 🏁",
          indices: [
            "Commence par écrire, en commentaire, ce qu'un maillon de <em>ta</em> structure contient : une valeur simple, ou un couple, ou autre chose.",
            "Écris la fonction qui crée la structure vide en premier : elle décide de tout le reste.",
            "Le programme d'essai vient tout en bas, sans indentation. Recopie <code>vers_tableau</code> si tu veux voir ta chaîne d'un coup d'œil.",
          ],
        },
      ],
    },
  ],
};

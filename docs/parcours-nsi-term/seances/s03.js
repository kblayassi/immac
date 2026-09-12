/* NSI Terminale — chapitre 1, séance 3 : les piles.
 *
 * Interface volontairement minimale, celle des sujets de baccalauréat :
 * pile_vide, est_vide, empiler, depiler. Pas de taille : la calculer est un
 * exercice (hauteur_pile du sujet zéro), et c'est ce qui fait comprendre le prix
 * d'une structure qui n'expose qu'une extrémité.
 *
 * Deux implémentations nommées, et on y renvoie toujours par leur nom :
 *   - « sommet en fin »  : donnée dès la découverte, append / pop ;
 *   - « sommet en tête » : écrite par l'élève en a1, insert(0) / pop(0) ;
 *   - une troisième, « à capacité fixe », en défi x6 — elle prépare le tableau
 *     circulaire de la séance 5.
 *
 * Règles de rédaction (voir l'en-tête de s01.js) : ce qui doit être compris vit
 * dans le `apres`, jamais dans un coup de pouce seul ; les amorces sont des
 * `pass` ; aucune étape ne livre le code qu'une étape suivante demande ; une
 * méthode inconnue des élèves est donnée dans la consigne, pas dans un indice.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Les piles : dernier arrivé, premier servi",
  sousTitre: "Une seule extrémité accessible, et c'est une force",
  palier: "Partie 2 — Les deux structures linéaires",

  accroche: `Tu as écrit une pile à la séance 2 sans le savoir, deux fois : la réserve de
    <code>inserer_trie</code>, et le journal de bord de la séance 1. C'est la structure la
    plus pauvre du chapitre — quatre opérations, une seule extrémité — et c'est justement
    cette pauvreté qui la rend irremplaçable.`,

  objectifs: [
    "reconnaître une situation <strong>LIFO</strong> et la nommer",
    "utiliser les quatre opérations <code>pile_vide</code>, <code>est_vide</code>, <code>empiler</code>, <code>depiler</code>",
    "écrire des fonctions clientes qui <strong>restaurent</strong> la pile après l'avoir parcourue",
    "écrire deux implémentations de la pile et comparer ce qu'elles coûtent",
  ],

  motDeLaFin: `Tu sais empiler, dépiler, et surtout remettre en place ce que tu as pris.
    À la séance 4, on ouvre l'autre extrémité : les éléments sortiront par où ils ne sont
    pas entrés, et presque tous tes réflexes de pile devront être révisés.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "quatre opérations, et pas une de plus",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Dernier arrivé, premier servi",
          contenu: `
            <p>Imagine une pile d'assiettes propres. Tu poses la dernière lavée
            <strong>sur le dessus</strong>, et c'est celle-là que tu reprendras en premier.
            Celle du fond attendra longtemps.</p>

            <pre class="bloc-code"><code>           ┌────┐
  empiler ─▶│ 32 │─▶ depiler     le sommet : la seule case accessible
           ├────┤
           │  5 │
           ├────┤
           │ 12 │                 le fond : inatteignable directement
           └────┘</code></pre>

            <div class="encadre">
              <span class="chapo">Définition</span>
              Une <strong>pile</strong> est une structure linéaire dans laquelle les ajouts
              et les retraits se font par la <strong>même extrémité</strong>, appelée le
              <strong>sommet</strong>. Le dernier élément entré est donc le premier à
              sortir : on dit qu'une pile est <strong>LIFO</strong>, de l'anglais <em>Last
              In, First Out</em>.
            </div>

            <p>Quatre opérations suffisent, et c'est exactement celles que tu trouveras dans
            les sujets de baccalauréat :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>pile_vide()</code></td><td>une pile sans aucun élément</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>est_vide(p)</code></td><td><code>True</code> si <code>p</code> est vide</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>empiler(p, element)</code></td><td>rien</td><td>aucune</td><td><code>element</code> devient le sommet</td></tr>
              <tr><td><code>depiler(p)</code></td><td>l'élément du sommet</td><td><code>p</code> n'est pas vide</td><td>cet élément <strong>quitte</strong> la pile</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo"><code>depiler</code> est l'exception à la règle de la séance 1</span>
              On avait posé qu'une opération <em>modifie</em> ou <em>renvoie</em>, mais pas
              les deux. <code>depiler</code> fait les deux : il rend le sommet <strong>et</strong>
              le retire.
              <br><br>
              On aurait pu le couper en deux opérations — une qui lit, une qui enlève — mais
              l'usage universel, et tous les sujets de bac, en font une seule. Quand une
              opération fait les deux, sa spécification doit le dire très explicitement :
              c'est le rôle de la colonne « Effet » ci-dessus. Retiens-en surtout ceci :
              <strong>appeler <code>depiler</code> modifie la pile</strong>, même si tu ne
              gardes pas la valeur qu'il renvoie.
            </div>

            <p>Ce qui frappe dans ce tableau, c'est ce qui n'y est <strong>pas</strong> : pas
            de longueur, pas d'indice, aucun moyen de regarder le deuxième élément, ni le
            fond. Une pile ne donne accès qu'à une seule case.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où en trouve-t-on, en vrai ?</span>
              <ul>
                <li><strong>Ctrl+Z</strong> dans n'importe quel logiciel : on annule la
                dernière action, jamais l'avant-dernière d'abord.</li>
                <li>Le bouton <strong>Précédent</strong> d'un navigateur.</li>
                <li>La <strong>pile d'exécution</strong> d'un programme : quand une fonction
                en appelle une autre, c'est toujours la plus récente qui se termine en
                premier. C'est aussi ce que Python affiche quand il plante.</li>
                <li>La vérification des <strong>parenthèses</strong> d'une expression — tu
                l'écriras tout à l'heure.</li>
              </ul>
              Le point commun de ces quatre situations : <em>on ne peut revenir en arrière
              que dans l'ordre inverse de celui où l'on est allé de l'avant.</em>
            </div>`,
          libelleBouton: "Essayer sur du code →",
        },

        {
          id: "d2",
          type: "code",
          titre: "Se servir d'une pile",
          contenu: `
            <p>Voici une implémentation des quatre opérations. On l'appellera
            <strong>« sommet en fin »</strong>, parce que le sommet de la pile y est la
            <strong>dernière case</strong> d'un tableau Python.</p>

            <p>Écris en dessous le programme qui empile <strong>3</strong>, puis
            <strong>7</strong>, puis <strong>12</strong>, dépile deux fois en affichant
            chaque valeur retirée, puis annonce s'il reste quelque chose :</p>

            <pre class="bloc-code"><code>Je dépile : 12
Je dépile : 7
La pile est vide : False</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ne calcule rien de tête</span>
              Les deux nombres affichés doivent venir de <code>depiler</code>, et le
              <code>False</code> de <code>est_vide</code>.
            </div>`,
          nomFichier: "pile.py",
          depart: `# ---- L'implémentation « sommet en fin ». Tu peux l'ignorer : c'est le but. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi : le programme qui se sert de la pile. ----\n`,
          validation: {
            codeContient: [
              { motif: "(\\bpile_vide\\s*\\(\\s*\\)[\\s\\S]*?){2}",
                message: "Crée ta pile en appelant pile_vide()." },
              { motif: "(\\bempiler\\s*\\([\\s\\S]*?){4}",
                message: "Il faut trois empilements : 3, puis 7, puis 12." },
              { motif: "(\\bdepiler\\s*\\([\\s\\S]*?){3}",
                message: "Il faut deux dépilements, et leurs valeurs doivent être affichées." },
              { motif: "\\best_vide\\s*\\([\\s\\S]*\\best_vide\\s*\\(",
                message: "La dernière ligne doit interroger est_vide(), pas répondre à sa place." },
            ],
            codeAbsent: [
              { motif: "\\bFalse\\b", message: "La réponse doit être calculée par est_vide(), pas écrite à la main." },
            ],
            sortie: "Je dépile : 12\nJe dépile : 7\nLa pile est vide : False",
          },
          felicitation: "Dernier entré, premier sorti : le 12 est ressorti avant le 7. 🥞",
          indices: [
            "Range d'abord le résultat de <code>pile_vide()</code> dans une variable : c'est ta pile.",
            "Chaque empilement est un appel à <code>empiler</code>, avec la pile en premier argument et la valeur en second.",
            "Pour afficher une valeur dépilée, passe directement l'appel à <code>depiler</code> à <code>print</code>, à côté du texte.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». Tu peux l'ignorer : c'est le but. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi : le programme qui se sert de la pile. ----\nma_pile = pile_vide()\nempiler(ma_pile, 3)\nempiler(ma_pile, 7)\nempiler(ma_pile, 12)\nprint("Je dépile :", depiler(ma_pile))\nprint("Je dépile :", depiler(ma_pile))\nprint("La pile est vide :", est_vide(ma_pile))\n`,
          apres: `<p>Le 3, entré en premier, est toujours là — et il faudrait dépiler encore
            une fois pour l'atteindre. C'est toute la structure en une ligne.</p>
            <p>Remarque aussi que <code>empiler</code> ne renvoie rien : on l'appelle pour son
            <em>effet</em>. Écrire <code>ma_pile = empiler(ma_pile, 3)</code> écraserait ta
            pile par <code>None</code> — une faute que l'on voit chaque année, et que la
            colonne « Renvoie » du tableau suffit à éviter.</p>`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Suis la pile à la trace",
          contenu: `
            <p>Sans rien exécuter, suis ce programme ligne à ligne. L'implémentation est
            toujours « sommet en fin », donc afficher la pile montre le
            <strong>fond à gauche</strong> et le <strong>sommet à droite</strong>.</p>`,
          code: `p = pile_vide()\nempiler(p, 34)\nempiler(p, 76)\nempiler(p, 43)\na = depiler(p)\nempiler(p, 42)\n\nprint(a)\nprint(p)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>43</code> puis <code>[34, 76, 42]</code>", correct: true,
              explication: "Oui. Le 43 était au sommet, il sort le premier. Le 42, empilé ensuite, vient prendre sa place au sommet — donc à droite." },
            { texte: "<code>34</code> puis <code>[76, 43, 42]</code>",
              explication: "C'est ce qu'on obtiendrait avec une <em>file</em>, où l'on sert le premier arrivé. Une pile sert le dernier." },
            { texte: "<code>43</code> puis <code>[34, 76, 43, 42]</code>",
              explication: "Le 43 est bien celui qui sort, mais il ne peut pas être resté dans la pile : <code>depiler</code> rend le sommet <strong>et</strong> le retire." },
            { texte: "<code>43</code> puis <code>[42, 34, 76]</code>",
              explication: "Ce serait le cas si <code>empiler</code> ajoutait au début du tableau. Dans cette implémentation, le sommet est la dernière case." },
          ],
          apres: `<span class="chapo">Le réflexe à prendre</span>
            Pour suivre un programme à piles, dessine la pile à côté de chaque ligne, avec le
            sommet toujours du même côté. Trois colonnes suffisent : l'instruction, l'état de
            la pile, la valeur renvoyée. C'est exactement ce qu'on attend de toi à l'écrit du
            baccalauréat, et c'est aussi la façon la plus rapide de trouver un bug.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Vider une pile",
          contenu: `
            <p>Écris <code>tout_afficher(p)</code> : elle affiche tous les éléments de la
            pile, <strong>du sommet vers le fond</strong>, un par ligne.</p>

            <p>Le programme d'essai, en bas, empile trois assiettes et appelle ta fonction.
            Il doit afficher :</p>

            <pre class="bloc-code"><code>assiette 3
assiette 2
assiette 1</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Oui, la pile sera vide à la fin</span>
              C'est inévitable : la seule façon de voir un élément est de le dépiler. On
              verra à l'étape 8 comment lire une pile sans la détruire — mais pour l'instant,
              profite-en pour installer le schéma de parcours.
            </div>`,
          nomFichier: "vider.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef tout_afficher(p):\n    """Affiche les elements de p, du sommet vers le fond, un par ligne."""\n    pass\n\n\n# ---- Le programme d'essai. Ne le modifie pas. ----\nassiettes = pile_vide()\nempiler(assiettes, "assiette 1")\nempiler(assiettes, "assiette 2")\nempiler(assiettes, "assiette 3")\ntout_afficher(assiettes)\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par depiler() : un client ne connaît pas la forme de la pile." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface de la pile." },
            ],
            sortie: "assiette 3\nassiette 2\nassiette 1",
            tests: `q = pile_vide()\nempiler(q, 1)\nempiler(q, 2)\ntout_afficher(q)\nassert est_vide(q), "tout_afficher() dépile tout : la pile doit être vide à la fin."\nr = pile_vide()\ntout_afficher(r)\nassert est_vide(r), "Sur une pile déjà vide, la fonction ne doit rien afficher — et surtout pas planter."`,
          },
          felicitation: "Le schéma de parcours d'une pile est en place. 🔁",
          indices: [
            "La condition de la boucle est « tant que la pile n'est pas vide » : <code>est_vide</code> répond exactement à cette question.",
            "À chaque tour, un seul geste suffit : retirer le sommet et l'afficher.",
            "Contrairement aux listes de la séance 2, il n'y a pas de ligne « passer au suivant » : c'est <code>depiler</code> qui fait avancer la boucle, puisqu'il retire l'élément.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef tout_afficher(p):\n    """Affiche les elements de p, du sommet vers le fond, un par ligne."""\n    while not est_vide(p):\n        print(depiler(p))\n\n\n# ---- Le programme d'essai. Ne le modifie pas. ----\nassiettes = pile_vide()\nempiler(assiettes, "assiette 1")\nempiler(assiettes, "assiette 2")\nempiler(assiettes, "assiette 3")\ntout_afficher(assiettes)\n`,
          apres: `<div class="encadre" data-ton="attention">
              <span class="chapo">Une boucle de pile n'a que deux lignes</span>
              <pre class="bloc-code"><code>while not est_vide(p):
    x = depiler(p)
    ...   # travailler avec x</code></pre>
              Il n'y a pas d'équivalent du <code>L = cdr(L)</code> des listes : c'est
              <code>depiler</code> lui-même qui fait progresser la boucle, puisqu'il retire
              un élément à chaque appel. Oublier d'appeler <code>depiler</code> dans le corps
              donne donc, ici aussi, une boucle sans fin.
              <br><br>
              La contrepartie est sévère : <strong>parcourir une pile, c'est la
              détruire</strong>. C'est le problème central de la structure, et les deux
              étapes qui suivent lui sont entièrement consacrées.
            </div>`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Ce qu'une pile refuse",
          contenu: `
            <p>Une pile contient, <strong>du fond vers le sommet</strong> : 5, 8, 2. On
            voudrait connaître le 5 — celui du fond — <strong>et retrouver la pile
            intacte</strong> ensuite.</p>
            <p>Rappel : les seules opérations disponibles sont <code>pile_vide</code>,
            <code>est_vide</code>, <code>empiler</code> et <code>depiler</code>.</p>`,
          question: "Comment faire ?",
          options: [
            { texte: "Dépiler 2 et 8, lire 5, puis tout remettre en place en prenant garde à l'ordre.", correct: true,
              explication: "C'est la seule méthode possible, et elle est coûteuse : pour lire un élément, il faut retirer tous ceux qui sont au-dessus, puis les remettre dans le bon ordre. Tu vas écrire ce mécanisme deux fois dans les étapes qui suivent." },
            { texte: "Écrire <code>p[0]</code> : dans cette implémentation, le fond est la case 0.",
              explication: "Cela fonctionnerait avec l'implémentation « sommet en fin », et seulement avec elle. C'est exactement la triche dénoncée à la séance 1 : le client regarde dans la structure." },
            { texte: "C'est impossible : une pile ne permet pas d'atteindre son fond.",
              explication: "Trop pessimiste. C'est possible — mais uniquement en passant par le sommet, donc en démontant la pile. La pile n'interdit pas, elle fait payer." },
            { texte: "Dépiler trois fois, puis empiler trois fois les valeurs obtenues.",
              explication: "Le premier geste est bon, le second retourne la pile : en réempilant 2, 8, 5 dans cet ordre, le 5 se retrouve au sommet. Il faut une pile auxiliaire, ou faire les choses dans l'autre sens." },
          ],
          apres: `<span class="chapo">Pourquoi s'infliger une structure aussi pauvre ?</span>
            Parce que ce qu'elle interdit vaut mieux que ce qu'elle coûte. Un programme qui
            manipule une pile ne <em>peut pas</em> aller lire un élément du milieu ; il ne
            peut donc pas non plus s'en servir par erreur, ni dépendre d'un ordre qu'on aurait
            oublié de garantir.
            <br><br>
            Une structure qui n'autorise qu'un seul geste est une structure où l'on ne peut
            pas se tromper de geste. C'est la raison pour laquelle on choisit délibérément une
            pile là où un tableau ferait « aussi bien » : le tableau ferait aussi bien, et
            bien pire.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Le sommet sans le perdre",
          contenu: `
            <p><code>sommet(p)</code> renvoie l'élément du sommet <strong>sans le
            retirer</strong> : après l'appel, la pile doit être exactement dans l'état où on
            l'a trouvée.</p>

            <p>Beaucoup de bibliothèques offrent cette opération ; la nôtre, non — et c'est
            l'occasion de voir qu'on peut l'ajouter <strong>en client</strong>, sans toucher
            à l'implémentation.</p>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>p</code> n'est pas vide. Le sommet d'une pile vide n'existe pas.
            </div>`,
          nomFichier: "sommet.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef sommet(p):\n    """Renvoie l'element du sommet de p, sans le retirer.\n\n    Precondition : p n'est pas vide.\n    Effet : p est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface : un client ne connaît pas la forme de la pile." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface de la pile." },
            ],
            tests: `p = pile_vide()\nempiler(p, 5)\nempiler(p, 8)\nassert sommet(p) == 8, "Le dernier empilé est au sommet."\nassert sommet(p) == 8, "Deux appels de suite doivent rendre la même valeur : sommet() ne consomme rien."\nassert depiler(p) == 8, "Après sommet(), le 8 doit toujours être là."\nassert sommet(p) == 5, "Une fois le 8 retiré, le sommet est le 5."\nassert depiler(p) == 5, "Et le 5 est toujours là lui aussi."\nassert est_vide(p), "La pile ne contenait que ces deux éléments."\nq = pile_vide()\nempiler(q, "a")\nassert sommet(q) == "a", "La fonction ne suppose rien du type des éléments."\nassert sommet(q) == "a", "Même sur une pile d'un seul élément, rien ne doit se perdre."`,
          },
          felicitation: "Deux lignes, et la pile ressort intacte. 👀",
          indices: [
            "La seule façon de voir le sommet est de le dépiler : commence par là, et range la valeur obtenue dans une variable.",
            "Une fois la valeur lue, la pile a perdu un élément. Que faut-il faire pour la remettre dans l'état où on l'a trouvée ?",
            "Trois lignes en tout : retirer, remettre, renvoyer. L'ordre des deux dernières n'a aucune importance.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef sommet(p):\n    """Renvoie l'element du sommet de p, sans le retirer.\n\n    Precondition : p n'est pas vide.\n    Effet : p est inchangee apres l'appel.\n    """\n    x = depiler(p)\n    empiler(p, x)\n    return x\n`,
          apres: `<div class="encadre">
              <span class="chapo">Le geste fondamental des piles : rendre ce qu'on a pris</span>
              Tu viens d'écrire, en trois lignes, le motif sur lequel repose <em>tout</em> le
              reste de la séance : <strong>dépiler pour regarder, ré-empiler pour
              réparer</strong>.
              <br><br>
              Il marche ici parce qu'on ne retire qu'un seul élément. Dès qu'il faudra en
              retirer plusieurs, remettre les valeurs dans l'ordre où on les a prises les
              remettrait <em>à l'envers</em> — et il faudra une pile auxiliaire. C'est
              exactement le problème de l'étape 8.
            </div>
            <p>Note enfin que <code>sommet</code> ne fait <strong>pas</strong> partie de
            l'interface : c'est une fonction cliente, écrite au-dessus des quatre opérations.
            Ajouter un service sans toucher à l'implémentation, c'est précisément ce que la
            séparation de la séance 1 rend possible.</p>`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Compter coûte cher",
          contenu: `
            <p>On cherche à connaître le nombre d'éléments d'une pile. Voici la première idée
            qui vient à l'esprit.</p>`,
          code: `p = pile_vide()\nempiler(p, 10)\nempiler(p, 20)\nempiler(p, 30)\n\nn = 0\nwhile not est_vide(p):\n    depiler(p)\n    n = n + 1\n\nprint(n)\nprint(est_vide(p))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>3</code> puis <code>True</code>", correct: true,
              explication: "Le compte est juste — mais la pile est vide. Pour savoir combien elle contenait d'éléments, on les a tous jetés." },
            { texte: "<code>3</code> puis <code>False</code>",
              explication: "La boucle ne s'arrête que lorsque <code>est_vide(p)</code> devient vraie : à la sortie, la pile est nécessairement vide." },
            { texte: "<code>0</code> puis <code>True</code>",
              explication: "La boucle tourne bel et bien trois fois, et <code>n</code> est augmenté à chaque tour." },
            { texte: "Le programme ne s'arrête jamais.",
              explication: "<code>depiler</code> retire un élément à chaque tour : la pile finit par se vider, et la condition devient fausse." },
          ],
          apres: `<span class="chapo">Une fonction qui détruit son argument est une fonction dangereuse</span>
            Imagine cette boucle écrite dans une fonction <code>hauteur(p)</code>. Elle
            renverrait le bon nombre, et l'appelant retrouverait sa pile vidée sans avoir rien
            demandé. Une seule ligne de programme, et toutes les données ont disparu.
            <br><br>
            C'est un défaut de <strong>spécification</strong> autant que de code : la colonne
            « Effet » aurait dû annoncer « la pile est vidée ». Mais surtout, ce n'est pas ce
            qu'on veut. Une fonction qui se contente de <em>regarder</em> une structure doit
            la <strong>rendre intacte</strong> — et c'est le travail de l'étape suivante.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Compter sans détruire",
          contenu: `
            <p><code>hauteur(p)</code> renvoie le nombre d'éléments de <code>p</code>, et
            laisse la pile <strong>exactement dans l'état où elle était</strong>.</p>

            <p>C'est la fonction <code>hauteur_pile</code> du sujet zéro de l'épreuve écrite :
            elle tombe et retombe, parce qu'elle oblige à comprendre le seul vrai obstacle de
            la structure.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi le truc de l'étape 6 ne suffit plus</span>
              Pour <code>sommet</code>, un seul élément sortait, et le remettre suffisait.
              Ici, il faut tous les sortir. Si tu les remets ensuite dans l'ordre où tu les
              as pris, la pile se retrouve <strong>à l'envers</strong> : le fond au sommet.
              <br><br>
              Il te faut donc un endroit où déposer temporairement ce que tu retires — et il
              se trouve que déposer des choses pour les reprendre en sens inverse, c'est
              précisément ce que sait faire une pile.
            </div>`,
          nomFichier: "hauteur.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef hauteur(p):\n    """Renvoie le nombre d'elements de la pile p.\n\n    Effet : p est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface : un client ne connaît pas la forme de la pile." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface — et c'est justement tout l'exercice." },
            ],
            tests: `vide = pile_vide()\nassert hauteur(vide) == 0, "Une pile vide a une hauteur de 0."\nassert est_vide(vide), "Et elle doit le rester."\np = pile_vide()\nfor v in [5, 8, 2]:\n    empiler(p, v)\nassert hauteur(p) == 3, "Trois empilements, une hauteur de 3."\nassert hauteur(p) == 3, "Deux appels de suite doivent donner le même résultat : hauteur() restaure la pile."\nassert depiler(p) == 2, "Après hauteur(), le sommet doit toujours être le 2."\nassert depiler(p) == 8, "Et l'ordre du reste doit être préservé."\nassert depiler(p) == 5, "Le 5 était au fond : il sort en dernier."\nassert est_vide(p), "La pile ne contenait que ces trois éléments."\nq = pile_vide()\nfor v in range(40):\n    empiler(q, v)\nassert hauteur(q) == 40, "Quarante empilements, une hauteur de 40."\nassert depiler(q) == 39, "Le dernier empilé doit toujours être au sommet."`,
          },
          felicitation: "Tu viens d'écrire hauteur_pile, du sujet zéro du baccalauréat. 📏",
          indices: [
            "Il te faut une seconde pile, créée au début de la fonction : c'est la réserve.",
            "Premier temps : vider <code>p</code> dans la réserve en comptant au passage. Second temps : vider la réserve dans <code>p</code>.",
            "C'est le double renversement : en passant deux fois d'une pile à l'autre, les éléments retrouvent leur ordre initial. Le compteur, lui, n'a besoin d'être augmenté que pendant le premier temps.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef hauteur(p):\n    """Renvoie le nombre d'elements de la pile p.\n\n    Effet : p est inchangee apres l'appel.\n    """\n    reserve = pile_vide()\n    n = 0\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n        n = n + 1\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return n\n`,
          apres: `<div class="encadre">
              <span class="chapo">Le double transfert, à connaître par cœur</span>
              <pre class="bloc-code"><code>reserve = pile_vide()
while not est_vide(p):          # 1er transfert : p se vide,
    x = depiler(p)              #    la réserve se remplit
    ...                         #    (c'est ICI qu'on travaille)
    empiler(reserve, x)

while not est_vide(reserve):    # 2e transfert : on remet tout
    empiler(p, depiler(reserve))</code></pre>
              Le premier transfert retourne la pile ; le second la retourne à nouveau. Deux
              renversements s'annulent : <code>p</code> ressort identique.
              <br><br>
              Ce patron répond à <strong>toutes</strong> les questions de la forme « que
              contient cette pile ? » : compter, chercher un maximum, vérifier qu'une valeur
              s'y trouve, la recopier. Seule change la ligne du milieu — exactement comme le
              patron « construire à l'envers puis renverser » de la séance 2.
            </div>
            <p>Il a un prix, et il faut le connaître : une pile de <em>n</em> éléments est
            parcourue <strong>deux fois</strong> entièrement. Demander la hauteur d'une pile
            dans la condition d'une boucle qui, elle-même, la parcourt, revient donc à faire
            le travail <em>n</em> fois de trop. On y reviendra à la séance 7.</p>`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Rôle</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>pile_vide()</code></td><td>une pile neuve</td><td>—</td><td>—</td></tr>
              <tr><td><code>est_vide(p)</code></td><td>p est-elle vide ?</td><td>—</td><td>—</td></tr>
              <tr><td><code>empiler(p, e)</code></td><td>pose <code>e</code> au sommet</td><td>—</td><td>p grandit</td></tr>
              <tr><td><code>depiler(p)</code></td><td>rend le sommet</td><td><code>not est_vide(p)</code></td><td>p rétrécit</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">Le schéma de parcours</span>
              <pre class="bloc-code"><code>while not est_vide(p):
    x = depiler(p)
    ...   # travailler avec x</code></pre>
              Il vide la pile. C'est le bon schéma quand on veut <em>consommer</em> la pile,
              et seulement dans ce cas.
            </div>

            <div class="encadre">
              <span class="chapo">Le schéma qui restaure</span>
              <pre class="bloc-code"><code>reserve = pile_vide()
while not est_vide(p):
    x = depiler(p)
    ...   # travailler avec x
    empiler(reserve, x)
while not est_vide(reserve):
    empiler(p, depiler(reserve))</code></pre>
              Il laisse la pile intacte. C'est le bon schéma dès qu'on veut seulement
              <em>regarder</em>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Croire que <code>depiler</code> ne fait que lire.</strong> Il
                retire. Même si tu jettes la valeur qu'il renvoie, la pile a changé.</li>
                <li><strong>Écrire <code>p = empiler(p, x)</code>.</strong>
                <code>empiler</code> ne renvoie rien : <code>p</code> vaudrait
                <code>None</code>, et la suite du programme s'effondrerait.</li>
                <li><strong>Remettre les éléments dans l'ordre où on les a pris.</strong> La
                pile ressort à l'envers. Il faut une pile auxiliaire, donc deux
                transferts.</li>
                <li><strong>Dépiler sans avoir vérifié.</strong> La précondition s'adresse à
                l'appelant : <code>est_vide</code> d'abord, toujours.</li>
                <li><strong>Utiliser <code>len(p)</code> ou <code>p[0]</code>.</strong> Cela
                marche avec l'implémentation « sommet en fin », et cassera avec la suivante —
                que tu écris dès l'exercice qui suit.</li>
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
      intention: "deux implémentations, et des piles au travail",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Deuxième implémentation : sommet en tête",
          contenu: `
            <p>Même interface, autre intérieur. Dans cette implémentation, que l'on appellera
            <strong>« sommet en tête »</strong>, le sommet de la pile est la
            <strong>case 0</strong> du tableau, et non plus la dernière.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>La pile où l'on a empilé 5 puis 8</th><th>« sommet en fin »</th><th>« sommet en tête »</th></tr>
              <tr><td>s'écrit</td><td><code>[5, 8]</code></td><td><code>[8, 5]</code></td></tr>
              <tr><td>le sommet est</td><td>la dernière case</td><td>la case 0</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux méthodes des listes dont tu auras besoin</span>
              <code>ma_liste.insert(0, valeur)</code> insère <code>valeur</code> <strong>au
              début</strong> de la liste, en décalant tout le reste d'un cran. Elle modifie
              la liste sur place et ne renvoie rien.
              <br><br>
              <code>ma_liste.pop(0)</code> retire la case 0 et <strong>renvoie</strong> sa
              valeur, en recollant le reste. Sans argument, <code>pop()</code> agit sur la
              dernière case — c'est ce qu'utilisait l'implémentation « sommet en fin ».
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'épreuve</span>
              <strong>✓ Valider</strong> fera tourner sur ton implémentation une fonction
              cliente rédigée pour l'<em>autre</em>, sans en changer une ligne.
            </div>`,
          nomFichier: "pile_tete.py",
          depart: `# Deuxième implémentation de la pile : « sommet en tête ».\n\ndef pile_vide():\n    pass\n\ndef est_vide(p):\n    pass\n\ndef empiler(p, element):\n    pass\n\ndef depiler(p):\n    pass\n`,
          validation: {
            tests: `p = pile_vide()\nassert p == [], "Une pile neuve est un tableau vide."\nassert est_vide(p) == True, "est_vide() doit reconnaître la pile vide."\nempiler(p, 5)\nassert p == [5], "Un seul élément : il est à la fois le fond et le sommet."\nempiler(p, 8)\nassert p == [8, 5], "Le sommet est la case 0 : le dernier empilé passe DEVANT."\nassert est_vide(p) == False, "Une pile de deux éléments n'est pas vide."\nassert depiler(p) == 8, "depiler() rend le sommet, donc le dernier empilé."\nassert p == [5], "Et il doit l'avoir retiré du tableau."\nassert depiler(p) == 5, "Il ne restait que le 5."\nassert est_vide(p) == True, "La pile est vide."\ndef hauteur(p):\n    reserve = pile_vide()\n    n = 0\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n        n = n + 1\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return n\nr = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(r, v)\nassert hauteur(r) == 3, "Un client écrit pour l'implémentation « sommet en fin » doit fonctionner ici sans une retouche."\nassert depiler(r) == 3, "Et il doit avoir laissé la pile intacte."\nassert depiler(r) == 2, "Dans le bon ordre."`,
          },
          felicitation: "Deux implémentations, un seul contrat. Le client n'y voit que du feu. 🎯",
          indices: [
            "<code>pile_vide</code> et <code>est_vide</code> ne changent pas : dans les deux implémentations, la pile vide est le tableau vide.",
            "<code>empiler</code> doit faire passer le nouvel élément devant tous les autres, et <code>depiler</code> doit retirer celui qui est devant.",
            "Les deux méthodes présentées dans l'énoncé font exactement cela. Attention à bien renvoyer la valeur dans <code>depiler</code>, et à ne rien renvoyer dans <code>empiler</code>.",
          ],
          solution: `# Deuxième implémentation de la pile : « sommet en tête ».\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.insert(0, element)\n\ndef depiler(p):\n    return p.pop(0)\n`,
          apres: `<p>Le tableau interne est écrit dans l'autre sens, <code>hauteur</code>
            n'a pas bougé d'un caractère, et le résultat est le même. C'est la troisième fois
            que tu le constates depuis la séance 1 — et cette fois, c'est sur la structure
            que les sujets de bac utilisent le plus.</p>
            <p>Reste une question, et elle n'est pas anodine : ces deux implémentations
            coûtent-elles la même chose ?</p>`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Laquelle coûte le plus cher ?",
          contenu: `
            <p>Une pile contient <strong>10 000</strong> éléments. On empile un élément de
            plus.</p>
            <pre class="bloc-code"><code># « sommet en fin »          # « sommet en tête »
def empiler(p, element):     def empiler(p, element):
    p.append(element)            p.insert(0, element)</code></pre>
            <p>Souviens-toi de ce qu'est un tableau Python : une zone de mémoire d'un seul
            tenant, dont les cases se suivent.</p>`,
          question: "Que fait la machine dans chaque cas ?",
          options: [
            { texte: "« sommet en fin » écrit une case de plus au bout ; « sommet en tête » décale les 10 000 cases d'un cran.", correct: true,
              explication: "Oui. Insérer au début d'un tableau oblige à faire de la place : chaque élément doit reculer d'une case. L'ajout à la fin, lui, ne dérange personne." },
            { texte: "Les deux ajoutent une case : c'est la même chose.",
              explication: "Le résultat est le même, le travail ne l'est pas. Les cases d'un tableau se suivent en mémoire : on ne peut pas en glisser une devant sans pousser toutes les autres." },
            { texte: "« sommet en tête » est plus rapide : la case 0 est la plus facile à trouver.",
              explication: "La trouver est en effet immédiat. Y faire de la place ne l'est pas du tout, et c'est ce qui coûte." },
            { texte: "Impossible à dire sans mesurer.",
              explication: "Lire les deux implémentations suffit, à condition de savoir ce qu'est un tableau. C'est l'interface qui ne dit rien du coût — pas l'implémentation." },
          ],
          apres: `<span class="chapo">Le même contrat, et un rapport de 1 à 10 000</span>
            Les deux implémentations sont <em>correctes</em> : elles tiennent exactement les
            mêmes promesses, et aucun client ne peut les distinguer par leurs résultats. L'une
            est pourtant inutilisable dès que la pile grossit.
            <br><br>
            C'est la démonstration la plus nette de ce qu'on a posé à la séance 1 :
            <strong>choisir une implémentation, ce n'est pas choisir ce que fait la structure,
            c'est choisir ce qu'elle coûte.</strong> Pour une pile sur tableau, la réponse est
            sans appel : le sommet doit être à la fin.
            <br><br>
            Garde tout de même « sommet en tête » dans un coin de ta tête. À la séance 4, la
            file aura besoin des deux extrémités — et l'une des deux sera forcément la
            mauvaise.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : une pile qui fuit",
          contenu: `
            <p>Cette implémentation contient <strong>trois erreurs de natures
            différentes</strong> :</p>
            <ul>
              <li>une que Python refuse d'exécuter ;</li>
              <li>une qui ne provoque rien, mais laisse la pile obstinément vide ;</li>
              <li>une qui donne un résultat juste <em>une fois</em>, puis toujours le
              même.</li>
            </ul>
            <p>Répare les trois sans changer les noms ni la façon de représenter la pile —
            le sommet reste la dernière case.</p>`,
          nomFichier: "pile_cassee.py",
          depart: `def pile_vide():\n    return []\n\ndef est_vide(p):\n    return p = []\n\ndef empiler(p, element):\n    p = p + [element]\n\ndef depiler(p):\n    return p[-1]\n`,
          validation: {
            tests: `p = pile_vide()\nassert est_vide(p) == True, "Une pile neuve est vide."\nempiler(p, 5)\nassert est_vide(p) == False, "Après un empilement la pile n'est plus vide. Si elle l'est encore, c'est qu'empiler() ne modifie pas la pile qu'on lui confie."\nempiler(p, 8)\nassert depiler(p) == 8, "depiler() rend le sommet, donc le dernier empilé."\nassert est_vide(p) == False, "Il reste le 5."\nassert depiler(p) == 5, "depiler() doit aussi RETIRER le sommet : sans cela, ce second appel rendrait encore 8."\nassert est_vide(p) == True, "Les deux éléments ont été dépilés : la pile est vide."`,
          },
          felicitation: "Trois bugs, trois natures — et le troisième est un piège de spécification. 🐛",
          indices: [
            "Exécute d'abord avec <strong>▶</strong> et lis le message : Python refuse le fichier entier tant qu'il ne parvient pas à le lire, et il indique la ligne.",
            "Dans <code>empiler</code>, demande-toi si la ligne modifie la liste reçue, ou si elle en fabrique une autre. Tu as déjà vu ce piège exact à la séance 1.",
            "Dans <code>depiler</code>, relis la colonne « Effet » de la spécification : la fonction doit-elle seulement lire le sommet, ou aussi faire quelque chose ?",
          ],
          solution: `def pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n`,
          apres: `<div class="encadre" data-ton="attention">
              <span class="chapo">Le troisième bug n'est pas une faute de code</span>
              <code>return p[-1]</code> est du Python irréprochable : il rend bien le sommet.
              Ce qu'il ne fait pas, c'est le <strong>retirer</strong> — et la spécification,
              elle, l'exige.
              <br><br>
              Une fonction écrite ainsi produit exactement la fonction <code>sommet</code> de
              l'étape 6, sous le nom de <code>depiler</code>. Tous les clients qui font
              confiance à son nom tourneront alors indéfiniment : leur boucle
              <code>while not est_vide(p)</code> ne verra jamais la pile se vider.
              <br><br>
              Retiens-en la leçon générale : <strong>une implémentation ne se juge pas à ce
              qu'elle fait, mais à l'écart entre ce qu'elle fait et ce qu'elle avait
              promis.</strong> C'est pour cela qu'on écrit les spécifications avant le code.
            </div>`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Aller et retour avec les tableaux",
          contenu: `
            <p>Deux fonctions clientes, pour rendre tes piles lisibles pendant la mise au
            point.</p>
            <ul>
              <li><code>depuis_tableau(t)</code> renvoie une pile obtenue en empilant les
              éléments de <code>t</code> dans l'ordre — le premier du tableau se retrouve
              donc au <strong>fond</strong> ;</li>
              <li><code>vers_tableau(p)</code> renvoie le tableau des éléments de
              <code>p</code>, <strong>du fond vers le sommet</strong>, en laissant la pile
              intacte.</li>
            </ul>
            <pre class="bloc-code"><code>vers_tableau(depuis_tableau([5, 8, 2]))  →  [5, 8, 2]</code></pre>
            <p>Les deux doivent n'utiliser que les quatre opérations de l'interface.</p>`,
          nomFichier: "conversions.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef depuis_tableau(t):\n    """Renvoie une pile contenant les elements de t, le premier au fond."""\n    pass\n\ndef vers_tableau(p):\n    """Renvoie le tableau des elements de p, du fond vers le sommet.\n\n    Effet : p est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface : un client ne connaît pas la forme de la pile." },
            ],
            tests: `p = depuis_tableau([5, 8, 2])\nassert depiler(p) == 2, "Le dernier élément du tableau doit se retrouver au sommet."\nempiler(p, 2)\nassert vers_tableau(p) == [5, 8, 2], "vers_tableau() rend les éléments du fond vers le sommet."\nassert vers_tableau(p) == [5, 8, 2], "Deux appels de suite doivent donner le même résultat : la pile est restaurée."\nassert depiler(p) == 2, "Après vers_tableau(), le sommet est toujours le 2."\nassert depiler(p) == 8, "Et l'ordre du reste est préservé."\nassert vers_tableau(pile_vide()) == [], "Une pile vide donne un tableau vide."\nq = depuis_tableau([])\nassert est_vide(q), "Un tableau vide donne une pile vide."\nr = depuis_tableau(["a", "b"])\nassert vers_tableau(r) == ["a", "b"], "Les deux fonctions doivent être l'inverse l'une de l'autre."\nassert depiler(r) == "b", "Et r doit être intacte après vers_tableau()."`,
          },
          felicitation: "Tes piles sont enfin lisibles d'un coup d'œil. 👀",
          indices: [
            "<code>depuis_tableau</code> est la plus simple des deux : une pile neuve, puis une boucle qui empile chaque élément dans l'ordre de lecture.",
            "Pour <code>vers_tableau</code>, reprends le double transfert de l'étape 8 : le premier vide <code>p</code> dans une réserve, le second la remet en place.",
            "Reste à choisir pendant lequel des deux transferts remplir le tableau. Les éléments sortent de la réserve du fond vers le sommet : c'est exactement l'ordre demandé.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef depuis_tableau(t):\n    """Renvoie une pile contenant les elements de t, le premier au fond."""\n    p = pile_vide()\n    for x in t:\n        empiler(p, x)\n    return p\n\ndef vers_tableau(p):\n    """Renvoie le tableau des elements de p, du fond vers le sommet.\n\n    Effet : p est inchangee apres l'appel.\n    """\n    reserve = pile_vide()\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n    t = []\n    while not est_vide(reserve):\n        x = depiler(reserve)\n        t.append(x)\n        empiler(p, x)\n    return t\n`,
          apres: `<div class="encadre" data-ton="astuce">
              <span class="chapo">Le travail se fait pendant le second transfert</span>
              C'est la seule subtilité de <code>vers_tableau</code>, et elle mérite qu'on
              s'y arrête. Pendant le premier transfert, les éléments sortent de <code>p</code>
              <em>du sommet vers le fond</em> : les recueillir là donnerait le tableau à
              l'envers. Pendant le second, ils sortent de la réserve <em>du fond vers le
              sommet</em> : c'est l'ordre demandé.
              <br><br>
              Le patron de l'étape 8 a donc deux emplacements possibles pour la ligne de
              travail, et ils ne donnent pas le même ordre. Se demander « dans quel sens les
              éléments défilent-ils à cet endroit ? » est le réflexe qui évite la moitié des
              erreurs sur les piles.
            </div>
            <p>Garde <code>vers_tableau</code> sous la main : dans tous les exercices qui
            suivent, si un résultat te surprend, la recopier et afficher
            <code>vers_tableau(p)</code> vaut mieux que dix minutes de raisonnement.</p>`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Renverser un mot",
          contenu: `
            <p><code>renverser_texte(mot)</code> renvoie la chaîne <code>mot</code> écrite à
            l'envers, <strong>en se servant d'une pile</strong>.</p>
            <pre class="bloc-code"><code>renverser_texte("chat")  →  "tahc"</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les raccourcis sont interdits ici</span>
              <code>mot[::-1]</code> et <code>reversed</code> font le travail en un
              caractère, et ce n'est pas ce qu'on te demande. L'exercice consiste à
              <strong>reconnaître une pile</strong> dans un problème qui n'en parle pas.
            </div>

            <p>Rappel : une boucle <code>for</code> sur une chaîne parcourt ses caractères un
            à un, de gauche à droite.</p>`,
          nomFichier: "renverser.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef renverser_texte(mot):\n    """Renvoie la chaine mot ecrite a l'envers, en se servant d'une pile."""\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bempiler\\s*\\([\\s\\S]*\\bempiler\\s*\\(", message: "La solution attendue empile les caractères un à un." },
              { motif: "\\bdepiler\\s*\\([\\s\\S]*\\bdepiler\\s*\\(", message: "Puis elle les dépile pour reconstruire la chaîne." },
            ],
            codeAbsent: [
              { motif: "\\[\\s*::\\s*-\\s*1\\s*\\]", message: "La tranche inversée est interdite ici : sers-toi d'une pile." },
              { motif: "\\breversed\\s*\\(", message: "reversed() est interdit ici : sers-toi d'une pile." },
            ],
            tests: `assert renverser_texte("chat") == "tahc", "Les quatre lettres doivent ressortir dans l'ordre inverse."\nassert renverser_texte("") == "", "Le mot vide renversé reste vide."\nassert renverser_texte("a") == "a", "Un mot d'une lettre est son propre renversé."\nassert renverser_texte("kayak") == "kayak", "Un palindrome est égal à son renversé : c'est un bon contrôle."\nassert renverser_texte("Python") == "nohtyP", "La casse doit être conservée telle quelle."\nassert renverser_texte("ab cd") == "dc ba", "Les espaces sont des caractères comme les autres."`,
          },
          felicitation: "Une pile reconnue dans un problème qui n'en parlait pas. 🔄",
          indices: [
            "Deux temps, comme souvent : d'abord tout empiler, ensuite tout dépiler.",
            "Une boucle <code>for</code> sur le mot empile chaque caractère ; la dernière lettre se retrouve donc au sommet.",
            "Pour reconstruire la chaîne, pars d'une chaîne vide et allonge-la à chaque dépilement. Deux chaînes se collent avec l'opérateur <code>+</code>.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef renverser_texte(mot):\n    """Renvoie la chaine mot ecrite a l'envers, en se servant d'une pile."""\n    p = pile_vide()\n    for lettre in mot:\n        empiler(p, lettre)\n    resultat = ""\n    while not est_vide(p):\n        resultat = resultat + depiler(p)\n    return resultat\n`,
          apres: `<div class="encadre">
              <span class="chapo">La propriété qu'il faut savoir citer</span>
              <strong>Une pile inverse l'ordre.</strong> C'est sa caractéristique la plus
              utile, et elle se démontre en une phrase : le premier entré est le dernier
              sorti, donc l'ordre de sortie est exactement l'ordre d'entrée à l'envers.
              <br><br>
              Retiens la conséquence pratique, parce qu'elle te servira souvent : <em>chaque
              fois qu'un problème demande de traiter des choses dans l'ordre inverse de leur
              arrivée, une pile est la réponse.</em> Renverser un mot, revenir sur ses pas
              dans un labyrinthe, annuler des actions, remonter la liste des fonctions
              appelées quand un programme plante — c'est à chaque fois le même mécanisme.
            </div>`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le vérificateur de parenthèses",
          contenu: `
            <p><code>bien_parenthesee(texte)</code> renvoie <code>True</code> si les
            parenthèses du texte sont correctement appariées, <code>False</code> sinon. Les
            autres caractères sont ignorés.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Texte</th><th>Réponse</th><th>Pourquoi</th></tr>
              <tr><td><code>(a(b)c)</code></td><td><code>True</code></td><td>chaque ouvrante trouve sa fermante</td></tr>
              <tr><td><code>(()</code></td><td><code>False</code></td><td>une ouvrante n'est jamais refermée</td></tr>
              <tr><td><code>())(</code></td><td><code>False</code></td><td>une fermante arrive alors que rien n'est ouvert</td></tr>
              <tr><td><code>abc</code></td><td><code>True</code></td><td>aucune parenthèse, donc rien à reprocher</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'idée</span>
              Parcours le texte caractère par caractère. Une parenthèse ouvrante est une
              promesse : empile-la. Une fermante tient la promesse la plus récente : c'est
              exactement le sommet de la pile.
              <br><br>
              Il reste à te demander ce qui doit arriver quand une fermante se présente alors
              que la pile est vide, et dans quel état la pile doit se trouver à la fin du
              texte.
            </div>`,
          nomFichier: "parentheses.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef bien_parenthesee(texte):\n    """Renvoie True si les parentheses de texte sont correctement appariees."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
              { motif: "\\bcount\\s*\\(", message: "Compter les parenthèses ne suffit pas : « )( » en contient autant de chaque, et n'est pas bien parenthésée." },
            ],
            tests: `assert bien_parenthesee("(a(b)c)") == True, "Chaque ouvrante trouve sa fermante."\nassert bien_parenthesee("") == True, "Un texte vide est bien parenthésé."\nassert bien_parenthesee("abc") == True, "Un texte sans parenthèse est bien parenthésé."\nassert bien_parenthesee("()") == True, "Le cas le plus simple."\nassert bien_parenthesee("(())") == True, "Des parenthèses imbriquées."\nassert bien_parenthesee("()()") == True, "Des parenthèses successives."\nassert bien_parenthesee("(()") == False, "Une ouvrante n'est jamais refermée : la pile n'est pas vide à la fin."\nassert bien_parenthesee("())") == False, "Une fermante de trop."\nassert bien_parenthesee(")(") == False, "Autant de chaque, mais dans le mauvais ordre : la fermante arrive alors que rien n'est ouvert."\nassert bien_parenthesee("(") == False, "Une seule ouvrante."\nassert bien_parenthesee(")") == False, "Une seule fermante."\nassert bien_parenthesee("(2 + (3 * 4)) - 1") == True, "Les autres caractères doivent être ignorés."`,
          },
          felicitation: "L'algorithme le plus célèbre des piles, et tu viens de l'écrire. 🧮",
          indices: [
            "Une pile neuve au début, une boucle <code>for</code> sur les caractères du texte, et une réponse à la fin.",
            "Deux caractères seulement t'intéressent dans la boucle : l'ouvrante, qu'il faut mémoriser, et la fermante, qui doit consommer une mémorisation.",
            "Attention au cas où une fermante arrive sur une pile vide : la précondition de <code>depiler</code> t'interdit de l'appeler, et la réponse est connue d'avance. Et à la fin du texte, demande-toi ce que signifie une pile qui n'est pas vide.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef bien_parenthesee(texte):\n    """Renvoie True si les parentheses de texte sont correctement appariees."""\n    p = pile_vide()\n    for caractere in texte:\n        if caractere == "(":\n            empiler(p, caractere)\n        elif caractere == ")":\n            if est_vide(p):\n                return False\n            depiler(p)\n    return est_vide(p)\n`,
          apres: `<div class="encadre">
              <span class="chapo">Pourquoi une pile, et pas un compteur</span>
              On pourrait croire qu'il suffit de compter : +1 par ouvrante, −1 par fermante,
              et vérifier qu'on finit à zéro. Le texte <code>)(</code> suffit à ruiner cette
              idée — le compte revient bien à zéro, et le texte est pourtant faux.
              <br><br>
              Ce que le compteur ne sait pas dire, c'est <em>à quel moment</em> il est passé
              en négatif. La pile, elle, le dit : une fermante sur une pile vide est une
              faute immédiate. Voilà ce qui distingue une structure d'un simple nombre —
              elle retient non seulement <em>combien</em>, mais <em>quoi</em> et
              <em>dans quel ordre</em>.
            </div>
            <p>Les deux <code>return</code> méritent aussi qu'on les distingue : celui de
            l'intérieur signale une fermante orpheline, celui de la fin vérifie qu'aucune
            ouvrante n'est restée en attente. Deux fautes différentes, deux endroits
            différents — et c'est bien pour cela qu'un seul test final ne suffirait pas.</p>`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Annuler la dernière action",
          contenu: `
            <p>Un éditeur de texte minuscule. <code>executer(commandes)</code> reçoit une
            liste de commandes et renvoie le texte obtenu.</p>
            <ul>
              <li>une commande ordinaire est un mot : il est <strong>ajouté à la fin</strong>
              du texte ;</li>
              <li>la commande <code>"ANNULER"</code> revient à l'état <strong>d'avant la
              dernière action</strong> ;</li>
              <li>annuler alors qu'il n'y a plus rien à annuler ne fait rien du tout.</li>
            </ul>

            <pre class="bloc-code"><code>executer(["bon", "jour"])                     →  "bonjour"
executer(["bon", "jour", "ANNULER"])          →  "bon"
executer(["bon", "ANNULER", "ANNULER"])       →  ""</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ce qu'il faut empiler</span>
              Pas les commandes : les <strong>états successifs du texte</strong>. Avant
              chaque modification, on met de côté le texte tel qu'il est ; annuler, c'est
              reprendre le dernier état mis de côté.
            </div>`,
          nomFichier: "editeur.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef executer(commandes):\n    """Renvoie le texte obtenu apres avoir joue la liste de commandes.\n\n    Une commande est soit un mot a ajouter a la fin du texte,\n    soit la chaine "ANNULER" qui revient a l'etat precedent.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bempiler\\s*\\(", message: "L'historique des états doit être rangé dans une pile." },
              { motif: "\\bdepiler\\s*\\(", message: "Annuler, c'est dépiler le dernier état mis de côté." },
            ],
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
            ],
            tests: `assert executer([]) == "", "Aucune commande : le texte est vide."\nassert executer(["bon", "jour"]) == "bonjour", "Les mots s'ajoutent à la fin, dans l'ordre."\nassert executer(["bon", "jour", "ANNULER"]) == "bon", "Annuler revient à l'état d'avant le dernier ajout."\nassert executer(["bon", "jour", "ANNULER", "ANNULER"]) == "", "Deux annulations effacent les deux ajouts."\nassert executer(["bon", "ANNULER", "ANNULER"]) == "", "Annuler quand il n'y a plus rien à annuler ne doit rien faire — et surtout pas planter."\nassert executer(["ANNULER"]) == "", "Annuler d'emblée ne fait rien."\nassert executer(["a", "b", "ANNULER", "c"]) == "ac", "Après une annulation, on peut continuer à écrire."\nassert executer(["a", "b", "ANNULER", "c", "ANNULER"]) == "a", "Et annuler à nouveau."\nassert executer(["ANNULER", "x"]) == "x", "Une annulation inutile ne doit pas gêner la suite."`,
          },
          felicitation: "Ctrl+Z, expliqué et écrit. C'est une pile, et rien d'autre. ↩️",
          indices: [
            "Deux variables avant la boucle : le texte courant, qui commence vide, et une pile d'historique.",
            "Pour une commande ordinaire : mettre de côté le texte <em>actuel</em>, puis seulement ensuite lui ajouter le mot. L'ordre des deux gestes est décisif.",
            "Pour <code>\"ANNULER\"</code> : si l'historique n'est pas vide, le texte courant redevient ce que l'on dépile. Sinon, ne rien faire — la précondition de <code>depiler</code> l'impose.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef executer(commandes):\n    """Renvoie le texte obtenu apres avoir joue la liste de commandes.\n\n    Une commande est soit un mot a ajouter a la fin du texte,\n    soit la chaine "ANNULER" qui revient a l'etat precedent.\n    """\n    historique = pile_vide()\n    texte = ""\n    for commande in commandes:\n        if commande == "ANNULER":\n            if not est_vide(historique):\n                texte = depiler(historique)\n        else:\n            empiler(historique, texte)\n            texte = texte + commande\n    return texte\n`,
          apres: `<div class="encadre">
              <span class="chapo">Pourquoi une pile, et pourquoi les états</span>
              L'annulation est LIFO par nature : on défait toujours l'action la plus récente.
              Aucune autre structure ne convient — une file rendrait les actions dans
              l'ordre où elles ont été faites, ce qui n'a aucun sens ici.
              <br><br>
              Empiler les <em>états</em> plutôt que les <em>actions</em> est l'autre décision
              de cet exercice, et c'est celle que font la plupart des éditeurs simples :
              annuler devient une affectation, sans avoir à savoir défaire quoi que ce soit.
              Le prix à payer est la mémoire — chaque état est conservé en entier. Les vrais
              logiciels empilent plutôt le <em>moyen de revenir en arrière</em>, ce qui prend
              beaucoup moins de place et coûte beaucoup plus de code.
            </div>
            <p>Un mot sur l'ordre des deux lignes du <code>else</code> : si l'on ajoutait le
            mot <em>avant</em> de mettre de côté, l'historique retiendrait l'état
            <em>après</em> modification, et annuler ne changerait rien. Une inversion de deux
            lignes, et la fonctionnalité entière disparaît sans la moindre erreur.</p>`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "des piles auxiliaires, et une troisième implémentation",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Qui triche ?",
          contenu: `
            <p>Quatre fonctions clientes de la pile. Trois n'utilisent que l'interface ; une
            s'appuie en douce sur l'implémentation « sommet en fin ».</p>
            <pre class="bloc-code"><code># A
def est_pleine(p, maximum):
    return hauteur(p) &gt;= maximum

# B
def vider(p):
    while not est_vide(p):
        depiler(p)

# C
def sommet(p):
    return p[-1]

# D
def empiler_tout(p, elements):
    for x in elements:
        empiler(p, x)</code></pre>`,
          question: "Laquelle cessera de fonctionner avec l'implémentation « sommet en tête » ?",
          options: [
            { texte: "A",
              explication: "Elle passe par <code>hauteur</code>, qui est elle-même un client honnête. Rien à lui reprocher." },
            { texte: "B",
              explication: "Deux opérations de l'interface, et une condition d'arrêt qui repose sur <code>est_vide</code>. Elle marchera partout." },
            { texte: "C", correct: true,
              explication: "Oui. <code>p[-1]</code> lit la dernière case du tableau. Avec « sommet en tête », le sommet est la case 0 : la fonction rendrait le <strong>fond</strong> de la pile, sans lever la moindre erreur. Il fallait dépiler puis ré-empiler." },
            { texte: "D",
              explication: "Elle parcourt <code>elements</code>, qui est un tableau ordinaire fourni par le client, et n'interroge la pile que par <code>empiler</code>." },
          ],
          apres: `<span class="chapo">Le symptôme à reconnaître</span>
            <code>C</code> ne plante pas : elle rend une valeur, et cette valeur est du bon
            type. Un programme qui l'utilise continuera de tourner, et donnera des résultats
            faux — le fond au lieu du sommet, c'est-à-dire l'exact contraire de ce qu'on
            voulait.
            <br><br>
            C'est le troisième exemple depuis la séance 1, et toujours le même schéma : la
            triche se paie non pas en erreurs, mais en <strong>résultats plausibles et
            faux</strong>. Voilà pourquoi la règle est absolue plutôt que raisonnable : un
            client ne met jamais de crochet sur une structure abstraite.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le plus grand de la pile",
          contenu: `
            <p><code>maximum(p)</code> renvoie le plus grand élément de la pile, et la laisse
            <strong>intacte</strong>.</p>
            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>p</code> n'est pas vide.
            </div>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux schémas à combiner</span>
              Le double transfert de l'étape 8, pour regarder sans détruire ; et la recherche
              de maximum de la séance 2, pour retenir le meilleur au passage. Il n'y a rien
              de nouveau à inventer.
            </div>`,
          nomFichier: "maximum.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef maximum(p):\n    """Renvoie le plus grand element de la pile p.\n\n    Precondition : p n'est pas vide.\n    Effet : p est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
              { motif: "\\bmax\\s*\\(", message: "max() ne connaît pas nos piles : il faut comparer en dépilant." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface." },
            ],
            tests: `p = pile_vide()\nempiler(p, 7)\nassert maximum(p) == 7, "Le maximum d'une pile d'un seul élément est cet élément."\nassert depiler(p) == 7, "Et la pile doit être intacte."\nq = pile_vide()\nfor v in [5, 12, 3, 9]:\n    empiler(q, v)\nassert maximum(q) == 12, "Le plus grand des quatre est 12, et il n'est ni au fond ni au sommet."\nassert maximum(q) == 12, "Deux appels de suite doivent donner le même résultat : la pile est restaurée."\nassert depiler(q) == 9, "Après maximum(), le sommet doit toujours être le 9."\nassert depiler(q) == 3, "Et l'ordre du reste est préservé."\nassert depiler(q) == 12, "..."\nassert depiler(q) == 5, "Le 5 était au fond."\nr = pile_vide()\nfor v in [-8, -3, -20]:\n    empiler(r, v)\nassert maximum(r) == -3, "Sur des nombres négatifs, partir de 0 donnerait un résultat faux."\ns = pile_vide()\nfor v in [4, 4, 4]:\n    empiler(s, v)\nassert maximum(s) == 4, "Des valeurs toutes égales : le maximum est cette valeur."`,
          },
          felicitation: "Regarder une pile entière sans en déranger un seul élément. 🏔️",
          indices: [
            "Le premier élément dépilé fournit un candidat de départ : la précondition garantit qu'il existe.",
            "Pendant le premier transfert, chaque élément dépilé est comparé au meilleur connu, puis rangé dans la réserve.",
            "Le second transfert ne fait que remettre en place : il n'a plus rien à comparer. Attention à ne pas oublier de ranger aussi le tout premier élément dans la réserve.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef maximum(p):\n    """Renvoie le plus grand element de la pile p.\n\n    Precondition : p n'est pas vide.\n    Effet : p est inchangee apres l'appel.\n    """\n    reserve = pile_vide()\n    plus_grand = depiler(p)\n    empiler(reserve, plus_grand)\n    while not est_vide(p):\n        x = depiler(p)\n        if x > plus_grand:\n            plus_grand = x\n        empiler(reserve, x)\n    while not est_vide(reserve):\n        empiler(p, depiler(reserve))\n    return plus_grand\n`,
          apres: `<p>Tu peux aussi initialiser <code>plus_grand</code> à l'intérieur de la
            boucle, à l'aide d'un drapeau, ou dépiler le premier élément sans le traiter à
            part et le comparer à lui-même : toutes ces variantes sont justes. Ce qui ne l'est
            pas, c'est de partir de <code>0</code> — les nombres négatifs du test sont là pour
            le rappeler.</p>
            <p>Remarque enfin que <code>maximum</code>, <code>hauteur</code> et
            <code>vers_tableau</code> ont exactement la même charpente. Trois questions
            différentes, un seul patron : quand tu le reconnaîtras d'emblée dans un sujet de
            bac, tu auras gagné dix minutes.</p>`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Trois sortes de parenthèses",
          contenu: `
            <p>On reprend le vérificateur de l'exercice 6, en plus sérieux :
            <code>bien_formee(texte)</code> doit gérer les <strong>trois</strong> sortes de
            délimiteurs — <code>( )</code>, <code>[ ]</code> et <code>{ }</code> — et
            vérifier qu'ils s'apparient correctement.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Texte</th><th>Réponse</th><th>Pourquoi</th></tr>
              <tr><td><code>{[()]}</code></td><td><code>True</code></td><td>bien imbriqués</td></tr>
              <tr><td><code>([)]</code></td><td><code>False</code></td><td>ils se croisent au lieu de s'imbriquer</td></tr>
              <tr><td><code>(]</code></td><td><code>False</code></td><td>la fermante ne correspond pas à l'ouvrante</td></tr>
            </table>
            </div>

            <p>Le dictionnaire <code>PAIRES</code> t'est fourni : il associe chaque fermante à
            l'ouvrante qui doit lui correspondre.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ce qui change par rapport à l'exercice 6</span>
              Il ne suffit plus de vérifier qu'<em>une</em> ouvrante attend : il faut vérifier
              que c'est <strong>la bonne</strong>. La pile ne sert donc plus seulement à
              compter — elle sert à se souvenir de <em>quoi</em> a été ouvert, et dans quel
              ordre.
            </div>`,
          nomFichier: "delimiteurs.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# À chaque fermante, l'ouvrante qui doit lui correspondre.\nPAIRES = {")": "(", "]": "[", "}": "{"}\n\n\n# ---- À toi. ----\n\ndef bien_formee(texte):\n    """Renvoie True si les delimiteurs de texte sont correctement apparies."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
            ],
            tests: `assert bien_formee("") == True, "Un texte vide est bien formé."\nassert bien_formee("abc") == True, "Un texte sans délimiteur est bien formé."\nassert bien_formee("()") == True, "Le cas le plus simple."\nassert bien_formee("{[()]}") == True, "Trois sortes bien imbriquées."\nassert bien_formee("()[]{}") == True, "Trois sortes successives."\nassert bien_formee("a(b[c]d)e") == True, "Les autres caractères sont ignorés."\nassert bien_formee("([)]") == False, "Ils se croisent : quand le ) arrive, c'est le [ qui attend."\nassert bien_formee("(]") == False, "La fermante ne correspond pas à l'ouvrante."\nassert bien_formee("(") == False, "Une ouvrante jamais refermée."\nassert bien_formee(")") == False, "Une fermante alors que rien n'est ouvert."\nassert bien_formee("{[}]") == False, "Croisement à nouveau."\nassert bien_formee("[{()}]") == True, "Trois niveaux d'imbrication."\nassert bien_formee("f(g[h{i}j]k)l") == True, "Un cas réaliste."`,
          },
          felicitation: "C'est exactement ce que fait ton éditeur de code quand il souligne une accolade. 🧩",
          indices: [
            "Reprends la structure de l'exercice 6 : une pile, une boucle sur les caractères, une réponse finale.",
            "Un caractère est une ouvrante s'il figure dans <code>\"([{\"</code> ; il est une fermante s'il figure parmi les clés de <code>PAIRES</code>, ce que l'opérateur <code>in</code> sait tester.",
            "Quand une fermante arrive, deux choses peuvent clocher : la pile est vide, ou bien ce qu'elle rend ne correspond pas à ce que <code>PAIRES</code> annonce pour cette fermante.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# À chaque fermante, l'ouvrante qui doit lui correspondre.\nPAIRES = {")": "(", "]": "[", "}": "{"}\n\n\n# ---- À toi. ----\n\ndef bien_formee(texte):\n    """Renvoie True si les delimiteurs de texte sont correctement apparies."""\n    p = pile_vide()\n    for caractere in texte:\n        if caractere in "([{":\n            empiler(p, caractere)\n        elif caractere in PAIRES:\n            if est_vide(p):\n                return False\n            if depiler(p) != PAIRES[caractere]:\n                return False\n    return est_vide(p)\n`,
          apres: `<div class="encadre">
              <span class="chapo">Pourquoi seule une pile peut répondre</span>
              Regarde <code>([)]</code>. Les délimiteurs sont en nombre correct, chacun a son
              partenaire quelque part, et pourtant le texte est faux : ils se
              <em>croisent</em> au lieu de s'imbriquer.
              <br><br>
              Ce que la pile capture, et qu'aucun compteur ne peut capturer, c'est
              l'<strong>imbrication</strong> : à tout instant, son sommet est la dernière
              ouvrante encore en attente, donc celle que la prochaine fermante doit
              satisfaire. Trois compteurs indépendants — un par sorte — accepteraient
              <code>([)]</code> sans broncher.
            </div>
            <p>Cet algorithme n'est pas un exercice d'école : c'est, à peu de chose près, la
            première étape de tout <strong>analyseur syntaxique</strong>. Quand Python te
            signale <code>unexpected EOF while parsing</code>, c'est une pile de ce genre qui
            n'est pas revenue à zéro. Tu retrouveras la même idée à la séance 8, avec la
            notation polonaise inverse.</p>`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Retourner le haut de la pile",
          contenu: `
            <p>Exercice du sujet zéro de l'épreuve écrite. <code>retourner(p, j)</code>
            <strong>inverse l'ordre</strong> des <code>j</code> éléments situés au sommet de
            la pile, et laisse le reste intact.</p>

            <pre class="bloc-code"><code>p vaut, du fond vers le sommet :  [1, 2, 3, 4, 5]
retourner(p, 3)
p vaut désormais :                [1, 2, 5, 4, 3]</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>p</code> contient au moins <code>j</code> éléments. La fonction ne renvoie
              rien : elle modifie la pile.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Compte tes renversements</span>
              Un transfert d'une pile vers une autre renverse l'ordre. Deux transferts le
              rétablissent. Ici, on veut un ordre <em>renversé</em> : combien de transferts
              faut-il donc, et combien de piles auxiliaires cela suppose-t-il ?
            </div>

            <p><code>vers_tableau</code>, écrite à l'exercice 4, t'est fournie pour tes
            essais.</p>`,
          nomFichier: "retourner.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Déjà écrite à l'exercice 4, pour tes essais. ----\n\ndef vers_tableau(p):\n    """Renvoie le tableau des elements de p, du fond vers le sommet."""\n    reserve = pile_vide()\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n    t = []\n    while not est_vide(reserve):\n        x = depiler(reserve)\n        t.append(x)\n        empiler(p, x)\n    return t\n\n\n# ---- À toi. ----\n\ndef retourner(p, j):\n    """Inverse l'ordre des j elements du sommet de p.\n\n    Precondition : p contient au moins j elements.\n    Effet : p est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bp\\s*\\[", message: "Passe par l'interface de la pile." },
              { motif: "\\breversed\\s*\\(", message: "Sers-toi de piles auxiliaires, pas des outils de Python." },
            ],
            tests: `def _tab(p):\n    r = pile_vide()\n    while not est_vide(p):\n        empiler(r, depiler(p))\n    t = []\n    while not est_vide(r):\n        x = depiler(r)\n        t.append(x)\n        empiler(p, x)\n    return t\np = pile_vide()\nfor v in [1, 2, 3, 4, 5]:\n    empiler(p, v)\nretourner(p, 3)\nassert _tab(p) == [1, 2, 5, 4, 3], "Les trois du sommet doivent être inversés, et le fond ne pas bouger."\nq = pile_vide()\nfor v in [1, 2, 3, 4, 5]:\n    empiler(q, v)\nretourner(q, 5)\nassert _tab(q) == [5, 4, 3, 2, 1], "Retourner toute la pile l'inverse entièrement."\nr = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(r, v)\nretourner(r, 1)\nassert _tab(r) == [1, 2, 3], "Retourner un seul élément ne change rien."\ns = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(s, v)\nretourner(s, 0)\nassert _tab(s) == [1, 2, 3], "Retourner zéro élément ne change rien non plus."\nu = pile_vide()\nfor v in [7, 8, 9, 10]:\n    empiler(u, v)\nretourner(u, 2)\nassert _tab(u) == [7, 8, 10, 9], "Seuls les deux du sommet sont échangés."\nretourner(u, 2)\nassert _tab(u) == [7, 8, 9, 10], "Retourner deux fois de suite redonne la pile de départ."`,
          },
          felicitation: "Un exercice de sujet zéro, écrit sans filet. 🔁",
          indices: [
            "Deux piles auxiliaires, et trois boucles <code>for</code> de <code>j</code> tours chacune : tu sais combien d'éléments déplacer, un <code>while</code> serait donc mal choisi.",
            "Le premier transfert sort les <code>j</code> éléments du sommet ; il les renverse. Le deuxième les renverse à nouveau ; le troisième les remet sur <code>p</code> en les renversant une troisième fois.",
            "Trois renversements, c'est un renversement — et c'est exactement ce qu'on veut. Attention à ne pas toucher au reste de la pile : les boucles ne doivent tourner que <code>j</code> fois.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Déjà écrite à l'exercice 4, pour tes essais. ----\n\ndef vers_tableau(p):\n    """Renvoie le tableau des elements de p, du fond vers le sommet."""\n    reserve = pile_vide()\n    while not est_vide(p):\n        empiler(reserve, depiler(p))\n    t = []\n    while not est_vide(reserve):\n        x = depiler(reserve)\n        t.append(x)\n        empiler(p, x)\n    return t\n\n\n# ---- À toi. ----\n\ndef retourner(p, j):\n    """Inverse l'ordre des j elements du sommet de p.\n\n    Precondition : p contient au moins j elements.\n    Effet : p est modifiee. La fonction ne renvoie rien.\n    """\n    q = pile_vide()\n    r = pile_vide()\n    for _ in range(j):\n        empiler(q, depiler(p))\n    for _ in range(j):\n        empiler(r, depiler(q))\n    for _ in range(j):\n        empiler(p, depiler(r))\n`,
          apres: `<div class="encadre">
              <span class="chapo">Compter les renversements</span>
              <pre class="bloc-code"><code>départ    : 1 2 3 | 4 5   (le | marque les j du sommet, ici j = 3)
q reçoit  : 5 4 3          1er renversement
r reçoit  : 3 4 5          2e  — retour à l'ordre initial
p reçoit  : 5 4 3          3e  — l'ordre voulu</code></pre>
              Un nombre <strong>impair</strong> de transferts renverse ; un nombre
              <strong>pair</strong> conserve. C'est la seule chose à retenir, et elle permet
              de concevoir ce genre d'algorithme sans tâtonner : on décide d'abord si l'on
              veut renverser ou conserver, on en déduit la parité, et on sait combien de
              piles auxiliaires prévoir.
            </div>
            <p>Le <code>for</code> plutôt que le <code>while</code> n'est pas un détail non
            plus : on connaît le nombre exact d'éléments à déplacer, et surtout il ne faut
            <strong>pas</strong> vider la pile. Un <code>while not est_vide(p)</code>
            emporterait le fond avec le reste.</p>
            <p>Cette fonction est la brique du <strong>tri crêpes</strong>, qui trie une pile
            en ne sachant faire que des retournements par le haut. Tu l'écriras à la
            séance 8.</p>`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Précédent et suivant",
          contenu: `
            <p>Le bouton <strong>Précédent</strong> d'un navigateur, et son jumeau
            <strong>Suivant</strong>. Deux piles suffisent.</p>

            <p>Un navigateur est représenté par une liste de trois cases :</p>
            <pre class="bloc-code"><code>nav[0]  la page courante
nav[1]  la pile des pages visitées AVANT (pour reculer)
nav[2]  la pile des pages quittées par un retour (pour avancer)</code></pre>

            <p><code>navigateur</code> et <code>courante</code> te sont fournies. Écris les
            trois autres :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th><th>Précondition</th></tr>
              <tr><td><code>visiter(nav, page)</code></td><td>va sur une nouvelle page</td><td>aucune</td></tr>
              <tr><td><code>precedent(nav)</code></td><td>revient à la page précédente</td><td><code>nav[1]</code> n'est pas vide</td></tr>
              <tr><td><code>suivant(nav)</code></td><td>repart en avant</td><td><code>nav[2]</code> n'est pas vide</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle que tout le monde oublie</span>
              Quand on visite une <strong>nouvelle</strong> page après être revenu en
              arrière, l'historique « suivant » est <strong>effacé</strong> : on ne peut plus
              avancer vers ce qu'on avait quitté. Essaie dans ton navigateur, c'est bien ce
              qui se passe.
            </div>`,
          nomFichier: "navigateur.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Fournies. ----\n\ndef navigateur(page):\n    """Cree un navigateur ouvert sur page, sans aucun historique."""\n    return [page, pile_vide(), pile_vide()]\n\ndef courante(nav):\n    """Renvoie la page actuellement affichee."""\n    return nav[0]\n\n\n# ---- À toi. ----\n\ndef visiter(nav, page):\n    """Affiche page. L'historique « suivant » est efface."""\n    pass\n\ndef precedent(nav):\n    """Revient a la page precedente.\n\n    Precondition : nav[1] n'est pas vide.\n    """\n    pass\n\ndef suivant(nav):\n    """Repart vers la page quittee par un retour en arriere.\n\n    Precondition : nav[2] n'est pas vide.\n    """\n    pass\n`,
          validation: {
            tests: `n = navigateur("accueil")\nassert courante(n) == "accueil", "Le navigateur s'ouvre sur la page donnée."\nassert est_vide(n[1]) and est_vide(n[2]), "Un navigateur neuf n'a aucun historique."\nvisiter(n, "cours")\nassert courante(n) == "cours", "visiter() change la page courante."\nvisiter(n, "exercices")\nassert courante(n) == "exercices", "..."\nprecedent(n)\nassert courante(n) == "cours", "Le bouton Précédent revient à la page d'avant."\nprecedent(n)\nassert courante(n) == "accueil", "Deux retours ramènent à l'accueil."\nsuivant(n)\nassert courante(n) == "cours", "Le bouton Suivant repart dans l'autre sens."\nsuivant(n)\nassert courante(n) == "exercices", "Et l'on retrouve la page la plus récente."\nprecedent(n)\nassert courante(n) == "cours", "On recule à nouveau d'un cran."\nvisiter(n, "corriges")\nassert courante(n) == "corriges", "On part sur une nouvelle page."\nassert est_vide(n[2]), "Visiter une nouvelle page doit effacer l'historique « suivant »."\nprecedent(n)\nassert courante(n) == "cours", "Le retour en arrière fonctionne toujours après une nouvelle visite."\nprecedent(n)\nassert courante(n) == "accueil", "Et l'historique « avant » est resté complet."`,
          },
          felicitation: "Deux piles dos à dos, et tu as reconstruit la barre de navigation. 🧭",
          indices: [
            "Les trois fonctions font toutes le même genre de geste : ranger la page courante quelque part, et en reprendre une autre ailleurs.",
            "Pour <code>precedent</code> : la page courante devient une page « avant », et la nouvelle page courante est celle qu'on dépile de l'historique arrière. <code>suivant</code> est le miroir exact.",
            "Pour <code>visiter</code> : la page courante rejoint l'historique arrière, la nouvelle page devient courante, et <code>nav[2]</code> doit être remplacé par une pile neuve.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Fournies. ----\n\ndef navigateur(page):\n    """Cree un navigateur ouvert sur page, sans aucun historique."""\n    return [page, pile_vide(), pile_vide()]\n\ndef courante(nav):\n    """Renvoie la page actuellement affichee."""\n    return nav[0]\n\n\n# ---- À toi. ----\n\ndef visiter(nav, page):\n    """Affiche page. L'historique « suivant » est efface."""\n    empiler(nav[1], nav[0])\n    nav[0] = page\n    nav[2] = pile_vide()\n\ndef precedent(nav):\n    """Revient a la page precedente.\n\n    Precondition : nav[1] n'est pas vide.\n    """\n    empiler(nav[2], nav[0])\n    nav[0] = depiler(nav[1])\n\ndef suivant(nav):\n    """Repart vers la page quittee par un retour en arriere.\n\n    Precondition : nav[2] n'est pas vide.\n    """\n    empiler(nav[1], nav[0])\n    nav[0] = depiler(nav[2])\n`,
          apres: `<div class="encadre">
              <span class="chapo">Pourquoi deux piles, et pourquoi des piles</span>
              L'historique arrière est LIFO : on revient d'abord sur la page la plus
              récemment quittée. L'historique avant l'est tout autant, dans l'autre sens.
              Chacun des deux boutons dépile d'un côté et empile de l'autre — la page
              courante fait la navette entre les deux.
              <br><br>
              Quant à l'effacement de <code>nav[2]</code> : dès qu'on part dans une direction
              nouvelle, les pages « en avant » deviennent inatteignables, puisqu'aucun chemin
              n'y mène plus. C'est ce qui explique le comportement, souvent jugé agaçant, de
              tous les navigateurs du monde — et qui n'est pas un défaut, mais la conséquence
              logique de la structure.
            </div>
            <p>Tu remarqueras que <code>nav</code> est un tableau que le client indexe
            librement : c'est <em>sa</em> structure, pas une pile. Les crochets sur
            <code>nav[1]</code> et <code>nav[2]</code> ne sont donc pas de la triche — ce
            qu'ils contiennent, en revanche, n'est manipulé que par l'interface.</p>`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Troisième implémentation : une pile à capacité fixe",
          contenu: `
            <p>Les deux implémentations précédentes s'agrandissent toutes seules. Ce n'est
            pas toujours possible : dans un microcontrôleur, ou dans la pile d'exécution d'un
            programme, la mémoire est <strong>réservée à l'avance</strong>.</p>

            <p>Écris donc une pile bâtie sur un <strong>tableau de taille fixe</strong>. Elle
            retient deux choses : le tableau, et le nombre d'éléments réellement présents.</p>

            <pre class="bloc-code"><code>p = pile_vide(3)          →  [[None, None, None], 0]
empiler(p, 5)             →  [[5, None, None], 1]
empiler(p, 8)             →  [[5, 8, None], 2]
depiler(p)  rend 8        →  [[5, 8, None], 1]</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Dépiler n'efface rien</span>
              Regarde la dernière ligne : le 8 est toujours écrit dans le tableau. Ce qui a
              changé, c'est le <strong>compteur</strong> — et il est la seule chose qui fasse
              foi. Tout ce qui se trouve au-delà n'existe plus, même si les octets sont encore
              là.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux points de syntaxe</span>
              <code>[None] * capacite</code> fabrique un tableau de <code>capacite</code>
              cases toutes à <code>None</code>. Et l'interface gagne une opération,
              <code>est_pleine(p)</code>, puisqu'une pile bornée peut désormais refuser un
              élément.
            </div>

            <p>L'interface devient donc : <code>pile_vide(capacite)</code>,
            <code>est_vide(p)</code>, <code>est_pleine(p)</code>,
            <code>empiler(p, element)</code> — précondition : la pile n'est pas pleine — et
            <code>depiler(p)</code>.</p>`,
          nomFichier: "pile_bornee.py",
          depart: `# Troisième implémentation : un tableau de taille fixe, et un compteur.\n#\n# Une pile est [tableau, nombre d'elements].\n\ndef pile_vide(capacite):\n    """Renvoie une pile vide pouvant contenir au plus capacite elements."""\n    pass\n\ndef est_vide(p):\n    pass\n\ndef est_pleine(p):\n    pass\n\ndef empiler(p, element):\n    """Precondition : la pile n'est pas pleine."""\n    pass\n\ndef depiler(p):\n    """Precondition : la pile n'est pas vide."""\n    pass\n`,
          validation: {
            tests: `p = pile_vide(3)\nassert p == [[None, None, None], 0], "Une pile neuve de capacité 3 : trois cases libres, et un compteur à zéro."\nassert est_vide(p) == True, "Le compteur vaut zéro : la pile est vide."\nassert est_pleine(p) == False, "Aucun élément sur trois possibles : elle n'est pas pleine."\nempiler(p, 5)\nassert p[1] == 1, "Le compteur doit suivre le nombre d'éléments."\nassert p[0][0] == 5, "Le premier élément empilé occupe la case 0."\nassert est_vide(p) == False, "..."\nempiler(p, 8)\nassert p[0][1] == 8, "Le deuxième occupe la case 1."\nassert p[1] == 2, "..."\nempiler(p, 2)\nassert est_pleine(p) == True, "Trois éléments dans une pile de capacité 3 : elle est pleine."\nassert depiler(p) == 2, "depiler() rend le dernier empilé."\nassert p[1] == 2, "Et le compteur redescend."\nassert est_pleine(p) == False, "Il y a de nouveau de la place."\nassert depiler(p) == 8, "..."\nassert depiler(p) == 5, "Le 5 était au fond."\nassert est_vide(p) == True, "..."\nassert len(p[0]) == 3, "Le tableau garde toujours sa taille : dépiler ne le raccourcit pas."\nq = pile_vide(2)\nassert est_pleine(q) == False, "Une pile de capacité 2, encore vide."\nempiler(q, "a")\nempiler(q, "b")\nassert est_pleine(q) == True, "..."\nassert depiler(q) == "b", "La fonction ne suppose rien du type des éléments."`,
          },
          felicitation: "Une pile qui ne grandit jamais — celle des vrais processeurs. 📦",
          indices: [
            "<code>est_vide</code> et <code>est_pleine</code> ne regardent que le compteur : l'un le compare à zéro, l'autre à la taille du tableau.",
            "<code>empiler</code> écrit dans la case dont l'indice est le compteur actuel — c'est la première case libre — puis augmente le compteur d'une unité.",
            "<code>depiler</code> fait l'inverse, et dans l'ordre inverse : il diminue d'abord le compteur, ce qui le fait désigner le sommet, puis renvoie la case correspondante.",
          ],
          solution: `# Troisième implémentation : un tableau de taille fixe, et un compteur.\n#\n# Une pile est [tableau, nombre d'elements].\n\ndef pile_vide(capacite):\n    """Renvoie une pile vide pouvant contenir au plus capacite elements."""\n    return [[None] * capacite, 0]\n\ndef est_vide(p):\n    return p[1] == 0\n\ndef est_pleine(p):\n    return p[1] == len(p[0])\n\ndef empiler(p, element):\n    """Precondition : la pile n'est pas pleine."""\n    p[0][p[1]] = element\n    p[1] = p[1] + 1\n\ndef depiler(p):\n    """Precondition : la pile n'est pas vide."""\n    p[1] = p[1] - 1\n    return p[0][p[1]]\n`,
          apres: `<div class="encadre">
              <span class="chapo">Ce que cette implémentation a de remarquable</span>
              <strong>Aucune case n'est jamais déplacée.</strong> Empiler et dépiler ne font
              qu'écrire une case et bouger un compteur d'une unité — quel que soit le nombre
              d'éléments déjà présents. C'est aussi rapide que l'implémentation « sommet en
              fin », et cela ne demande jamais la moindre réallocation de mémoire.
              <br><br>
              Le prix est annoncé d'avance : la capacité est fixée une fois pour toutes, et
              l'interface a dû gagner une opération, <code>est_pleine</code>, ainsi qu'une
              précondition supplémentaire sur <code>empiler</code>. C'est un vrai changement
              de contrat, pas seulement d'implémentation : un client écrit pour les versions
              précédentes ne saurait pas qu'il doit vérifier avant d'empiler.
            </div>
            <p>C'est exactement ainsi que fonctionne la <strong>pile d'exécution</strong> d'un
            programme, celle où s'empilent les appels de fonctions. Sa capacité est fixée au
            lancement — et quand un programme récursif l'épuise, Python lève une
            <code>RecursionError</code>. Tu viens d'en écrire le mécanisme.</p>
            <p>Le compteur qui désigne la première case libre s'appelle un
            <strong>pointeur de pile</strong>. Retiens l'idée : à la séance 5, deux compteurs
            du même genre transformeront un tableau ordinaire en file circulaire.</p>`,
        },

        {
          id: "x7",
          type: "code",
          titre: "À toi de trouver une pile",
          contenu: `
            <p>Dernier défi, libre. Trouve une situation où une pile s'impose, et programme-la.</p>

            <p>Quelques idées, si aucune ne te vient : un <strong>correcteur de balises
            HTML</strong> (chaque <code>&lt;p&gt;</code> doit être refermé par
            <code>&lt;/p&gt;</code>), l'historique d'une <strong>calculatrice</strong>, un
            <strong>labyrinthe</strong> où l'on revient sur ses pas, la <strong>tour de
            Hanoï</strong>, un <strong>jeu de cartes</strong> où l'on pioche sur le dessus du
            talon…</p>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>au moins <strong>deux fonctions clientes</strong>, chacune avec sa
              <strong>docstring</strong> ;</li>
              <li>elles n'utilisent la pile que par les quatre opérations de l'interface —
              aucun crochet, aucun <code>len</code> sur la pile ;</li>
              <li>en dessous, un programme d'essai qui affiche au moins
              <strong>trois lignes</strong>.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Comment savoir si c'est bien une pile</span>
              Pose-toi la question du dernier arrivé : dans ta situation, est-ce bien lui
              qu'il faut traiter en premier ? Si l'ordre naturel est celui de l'arrivée, c'est
              une <em>file</em> qu'il te faut — et c'est la séance prochaine.
            </div>`,
          nomFichier: "ma_pile.py",
          depart: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# Ma situation : .....................\n#\n# Écris ici tes fonctions clientes, chacune avec sa docstring,\n# puis le programme d'essai en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){6}",
                message: "Il faut au moins deux fonctions clientes, en plus des quatre de l'implémentation." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){2}",
                message: "Chacune de tes fonctions doit porter une docstring." },
              { motif: "\\bempiler\\s*\\([\\s\\S]*\\bempiler\\s*\\(",
                message: "Tes fonctions doivent réellement se servir d'une pile." },
              { motif: "\\bdepiler\\s*\\([\\s\\S]*\\bdepiler\\s*\\(",
                message: "Et dépiler quelque part, sinon ce n'est pas une pile." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme d'essai doit afficher au moins trois lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Une pile repérée, spécifiée, programmée et essayée. La séance est bouclée. 🏁",
          indices: [
            "Commence par écrire, en commentaire, la phrase « dans ma situation, le dernier arrivé est le premier à … ». Si tu n'arrives pas à la finir, change de situation.",
            "Écris la docstring de chaque fonction avant son corps : elle t'oblige à décider ce que la fonction renvoie et ce qu'elle modifie.",
            "Le programme d'essai vient tout en bas, sans indentation : il fabrique une pile, appelle tes fonctions, et affiche ce qu'elles rendent.",
          ],
          solution: `# ---- L'implémentation « sommet en fin ». N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# Ma situation : le correcteur de balises HTML.\n#\n# Le dernier arrivé est le premier à devoir être refermé.\n\ndef balises_correctes(balises):\n    """Renvoie True si la liste de balises est correctement imbriquee.\n\n    Une balise ouvrante s'ecrit "p", une fermante "/p".\n    """\n    attente = pile_vide()\n    for balise in balises:\n        if balise[0] == "/":\n            if est_vide(attente):\n                return False\n            if depiler(attente) != balise[1:]:\n                return False\n        else:\n            empiler(attente, balise)\n    return est_vide(attente)\n\ndef premiere_non_fermee(balises):\n    """Renvoie la premiere balise restee ouverte, ou "" s'il n'y en a pas."""\n    attente = pile_vide()\n    for balise in balises:\n        if balise[0] == "/":\n            if not est_vide(attente):\n                depiler(attente)\n        else:\n            empiler(attente, balise)\n    resultat = ""\n    while not est_vide(attente):\n        resultat = depiler(attente)\n    return resultat\n\n\n# ---- Le programme d'essai ----\nbon = ["html", "body", "p", "/p", "/body", "/html"]\ncroise = ["html", "body", "/html", "/body"]\noublie = ["html", "body", "p", "/p"]\n\nprint("Document bien formé :", balises_correctes(bon))\nprint("Document croisé :", balises_correctes(croise))\nprint("Balise oubliée :", premiere_non_fermee(oublie))\n`,
        },
      ],
    },
  ],
};

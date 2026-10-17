/* NSI Terminale — chapitre 1, séance 2 : les listes, un type abstrait.
 *
 * Le type abstrait « liste » au sens de Lisp : vide, est_vide, cons, car, cdr.
 * Deux implémentations nommées, et on y renvoie toujours par leur nom :
 *   - « par p-uplets » : le fil rouge, donnée dès la découverte ;
 *   - « par tableau »  : écrite par l'élève au défi x4, jamais montrée avant.
 *
 * Tous les parcours de liste sont écrits ITÉRATIVEMENT (une boucle qui descend
 * les cdr). La définition récursive est montrée et nommée, mais le chapitre
 * « récursivité » n'a pas encore eu lieu : on ne s'en sert pas ici.
 *
 * Règles de rédaction (voir l'en-tête de s01.js) : ce qui doit être compris vit
 * dans le `apres`, jamais dans un coup de pouce seul ; les amorces sont des
 * `pass` ; aucune étape ne livre le code qu'une étape suivante demande.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Les listes, un type abstrait",
  sousTitre: "Une tête, une queue, et rien d'autre",
  palier: "Partie 1 — Spécifier avant de programmer",

  accroche: `Le mot « liste » désigne deux choses très différentes, et les confondre coûte
    des points chaque année au baccalauréat. Il y a le <code>list</code> de Python, qui est
    un tableau ; et il y a la <strong>liste</strong> des informaticiens, née en 1958, qui
    n'a que cinq opérations et pas un seul indice. C'est celle-là qu'on installe
    aujourd'hui — et les piles et les files en descendent toutes les deux.`,

  objectifs: [
    "définir une liste comme une <strong>tête</strong> suivie d'une <strong>queue</strong>",
    "utiliser les cinq opérations <code>vide</code>, <code>est_vide</code>, <code>cons</code>, <code>car</code>, <code>cdr</code>",
    "écrire des fonctions clientes qui <strong>descendent</strong> une liste",
    "distinguer le type abstrait liste du <code>list</code> de Python",
  ],

  motDeLaFin: `Tu sais construire, parcourir et reconstruire une liste sans jamais écrire
    un crochet, et tu en as vu deux implémentations. À la séance 3, on restreint
    volontairement cette interface : il ne restera plus qu'une seule extrémité accessible,
    et cette pauvreté fera toute la force de la structure obtenue — la pile.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "cinq opérations, et tout le reste s'en déduit",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Une liste, c'est une tête et une queue",
          contenu: `
            <p>Le type abstrait <strong>liste</strong> se définit en une seule phrase, et
            cette phrase se mord la queue — c'est voulu :</p>

            <div class="encadre">
              <span class="chapo">Définition</span>
              Une liste est <strong>soit</strong> la liste vide, <strong>soit</strong> un
              élément — sa <strong>tête</strong> — suivi d'une liste — sa
              <strong>queue</strong>.
            </div>

            <p>C'est tout. Il n'y a pas d'indice, pas de longueur, pas de « troisième
            élément » : ces notions-là n'appartiennent pas à la définition. La liste vide se
            note traditionnellement <strong>nil</strong>.</p>

            <p>Voici à quoi ressemble la liste contenant 12, 5 et 32 :</p>

            <pre class="bloc-code"><code>L ─▶ ┌────┬───┐   ┌───┬───┐   ┌────┬───┐
     │ 12 │ ──┼──▶│ 5 │ ──┼──▶│ 32 │ ──┼──▶ nil
     └────┴───┘   └───┴───┘   └────┴───┘</code></pre>

            <p>Chaque case double retient <strong>un élément</strong> et <strong>l'endroit où
            se trouve la suite</strong>. La dernière pointe vers <em>nil</em> : c'est cette
            marque de fin qui permettra à toutes nos boucles de savoir où s'arrêter.</p>

            <p>La tête et la queue de cette liste, ce sont donc :</p>

            <pre class="bloc-code"><code>tête ─▶ 12        queue ─▶ ┌───┬───┐   ┌────┬───┐
                           │ 5 │ ──┼──▶│ 32 │ ──┼──▶ nil
                           └───┴───┘   └────┴───┘</code></pre>

            <p>Remarque bien que la queue n'est pas « le reste des éléments » en vrac :
            c'est une <strong>liste</strong>, avec sa propre tête et sa propre queue. C'est
            ce qui permet de tout parcourir en répétant toujours le même geste.</p>

            <p>Cinq opérations suffisent à tout faire :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th></tr>
              <tr><td><code>vide()</code></td><td>la liste vide</td><td>aucune</td></tr>
              <tr><td><code>est_vide(L)</code></td><td><code>True</code> si <code>L</code> est vide</td><td>aucune</td></tr>
              <tr><td><code>cons(e, L)</code></td><td>une <strong>nouvelle</strong> liste : <code>e</code> en tête, <code>L</code> en queue</td><td>aucune</td></tr>
              <tr><td><code>car(L)</code></td><td>la tête de <code>L</code></td><td><code>L</code> n'est pas vide</td></tr>
              <tr><td><code>cdr(L)</code></td><td>la queue de <code>L</code></td><td><code>L</code> n'est pas vide</td></tr>
            </table>
            </div>

            <p>Aucune de ces cinq opérations ne modifie quoi que ce soit : elles
            <em>renvoient</em>. Une liste, une fois construite, ne change plus.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo"><code>cons</code> ajoute en tête, jamais à la fin</span>
              C'est la seule façon de faire grandir une liste, et la conséquence est
              contre-intuitive : le <strong>dernier élément ajouté</strong> est celui que
              <code>car</code> renvoie. Tu retrouveras exactement ce comportement à la
              séance 3, sous un autre nom.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">D'où viennent ces noms bizarres ?</span>
              De <strong>Lisp</strong>, le langage créé par <strong>John McCarthy</strong> en
              1958 — le deuxième plus ancien langage encore utilisé aujourd'hui. Sur l'IBM
              704 de l'époque, un couple de valeurs tenait dans un mot machine coupé en deux
              moitiés : <em>Contents of the Address part of Register</em> et <em>Contents of
              the Decrement part of Register</em>. D'où <code>car</code> et <code>cdr</code>.
              Soixante-cinq ans plus tard, les noms sont restés — et tu les retrouveras dans
              les sujets de baccalauréat.
              <br><br>
              <code>cons</code>, lui, vient de <em>construct</em> : c'est la seule opération
              qui fabrique de la liste.
            </div>`,
          libelleBouton: "Voir ce que ça donne →",
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Dans quel sens ?",
          contenu: `
            <p>Voici une implémentation de ces cinq opérations. On l'appellera
            <strong>« par p-uplets »</strong>, parce qu'une liste y est représentée par des
            p-uplets emboîtés — un par case double du dessin — et la liste vide par
            <code>None</code>.</p>
            <p>Lis le programme, et anticipe son affichage avant de cliquer.</p>`,
          code: `def vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\nL = vide()\nL = cons(7, L)\nL = cons(3, L)\nprint(L)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>(3, (7, None))</code>", correct: true,
              explication: "Oui. Le 7 est entré en premier, mais le 3, ajouté ensuite, est passé devant lui : <code>cons</code> ajoute toujours en tête." },
            { texte: "<code>(7, (3, None))</code>",
              explication: "Ce serait le cas si <code>cons</code> ajoutait à la fin. Relis-le : il place son premier argument en tête, et toute la liste reçue derrière." },
            { texte: "<code>[3, 7]</code>",
              explication: "L'affichage montre la structure réelle, qui est faite de p-uplets emboîtés — ce n'est pas une liste Python." },
            { texte: "<code>(3, 7)</code>",
              explication: "Le second membre du p-uplet n'est pas un élément : c'est une <em>liste</em> entière. D'où l'emboîtement, et le <code>None</code> qui ferme la marche." },
          ],
          apres: `<span class="chapo">Retrouve le dessin dans l'affichage</span>
            <code>(3, (7, None))</code>, ce sont exactement les deux cases doubles du schéma
            de l'étape précédente : <code>3</code> et la suite, puis <code>7</code> et la
            suite, qui est <em>nil</em>. Ce que Python affiche n'est pas une commodité : c'est
            la structure elle-même, telle qu'elle est en mémoire.
            <br><br>
            Garde ce réflexe pour toute la séance : quand tu ne comprends plus ce que fait ton
            code, affiche la liste entière et compte les parenthèses ouvrantes — il y en a une
            par élément.`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Construire une liste",
          contenu: `
            <p>L'implémentation « par p-uplets » t'est donnée. Construis la liste contenant,
            dans cet ordre, <strong>12, 5 puis 32</strong>, range-la dans une variable
            <code>L</code>, et affiche successivement <code>L</code>, sa tête, puis sa
            queue :</p>

            <pre class="bloc-code"><code>(12, (5, (32, None)))
12
(5, (32, None))</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Uniquement par l'interface</span>
              Pars de <code>vide()</code> et n'utilise que <code>cons</code> : aucun p-uplet
              écrit à la main. Le premier élément de la liste étant le
              <strong>dernier</strong> ajouté, réfléchis à l'ordre de tes appels — ou
              emboîte-les les uns dans les autres.
            </div>`,
          nomFichier: "liste.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n`,
          validation: {
            codeContient: [
              { motif: "(\\bcons\\s*\\([\\s\\S]*?){4}",
                message: "Trois éléments, donc trois appels à cons()." },
              { motif: "(\\bvide\\s*\\(\\s*\\)[\\s\\S]*?){2}",
                message: "Toute liste se construit à partir de vide()." },
              { motif: "(\\bcar\\s*\\([\\s\\S]*?){2}",
                message: "La tête doit être obtenue par car(), pas en allant lire dans le p-uplet." },
              { motif: "(\\bcdr\\s*\\([\\s\\S]*?){2}",
                message: "La queue doit être obtenue par cdr(), pas en allant lire dans le p-uplet." },
            ],
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Écrire L[0] ou L[1], c'est se servir de l'implémentation. Passe par car() et cdr()." },
            ],
            sortie: "(12, (5, (32, None)))\n12\n(5, (32, None))",
          },
          felicitation: "Une liste construite sans le moindre crochet. 🧱",
          indices: [
            "L'élément que <code>car</code> doit rendre est <strong>12</strong> : c'est donc lui qui a été consé en dernier.",
            "Si tu emboîtes les appels, celui qui contient 32 est le plus profond, et prend <code>vide()</code> comme queue.",
            "Trois <code>print</code> : la liste entière, puis <code>car</code> appliqué à la liste, puis <code>cdr</code> appliqué à la liste.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\nL = cons(12, cons(5, cons(32, vide())))\nprint(L)\nprint(car(L))\nprint(cdr(L))\n`,
          apres: `<p>Deux écritures menaient au but, et elles disent la même chose :</p>
            <pre class="bloc-code"><code>L = cons(12, cons(5, cons(32, vide())))     # emboîtée

L = vide()                                 # ou pas à pas,
L = cons(32, L)                            # en commençant
L = cons(5, L)                             # par le DERNIER
L = cons(12, L)                            # élément</code></pre>
            <p>La seconde forme est celle qu'on utilisera dans les boucles, et elle montre
            bien le mécanisme : chaque <code>cons</code> fabrique une nouvelle liste et on
            range cette nouvelle liste dans la même variable. <strong>Rien n'est
            modifié</strong> : l'ancienne liste existe toujours, elle est simplement devenue
            la queue de la nouvelle.</p>`,
        },

        {
          id: "d4",
          type: "qcm",
          titre: "Suivre les opérations à la trace",
          contenu: `
            <p>Sans rien exécuter, suis ce programme ligne à ligne. Note l'état de
            <code>L</code>, celui de <code>L1</code> et la valeur de <code>a</code>.</p>`,
          code: `L = vide()\nL = cons(12, cons(5, cons(32, L)))\na = car(L)\nL1 = cdr(L)\nL1 = cons(42, cons(23, L1))`,
          question: "Que contiennent L et L1 à la fin, et que vaut a ?",
          options: [
            { texte: "L : 12, 5, 32 — L1 : 42, 23, 5, 32 — <code>a</code> vaut 12", correct: true,
              explication: "Exact. <code>cdr(L)</code> a laissé de côté la tête 12, puis le premier <code>cons</code> a placé 23 devant, et le second 42 devant lui." },
            { texte: "L : 32, 5, 12 — L1 : 5, 32, 23, 42 — <code>a</code> vaut 32",
              explication: "Tout est à l'envers : dans <code>cons(12, cons(5, cons(32, L)))</code>, c'est le 12, appliqué en dernier, qui finit en tête." },
            { texte: "L : 12, 5, 32 — L1 : 5, 32, 23, 42 — <code>a</code> vaut 12",
              explication: "L'état de L et la valeur de <code>a</code> sont bons, mais <code>cons</code> n'ajoute jamais à la fin : 23 puis 42 passent devant." },
            { texte: "L : 12, 5, 32 — L1 : 42, 23, 12, 5, 32 — <code>a</code> vaut 12",
              explication: "C'est le piège : <code>L1 = cdr(L)</code> ne recopie pas L, il en prend la <strong>queue</strong>. Le 12 n'en fait plus partie." },
          ],
          apres: `<span class="chapo">L n'a pas bougé d'un pouce</span>
            Aucune de ces cinq lignes ne modifie quoi que ce soit : <code>cons</code> et
            <code>cdr</code> <strong>renvoient</strong>. À la fin, L contient toujours 12, 5,
            32.
            <br><br>
            Il y a mieux : les deux listes <strong>partagent leur fin en mémoire</strong>. Le
            morceau « 5 puis 32 » n'existe qu'une seule fois, et sert à la fois de queue à L
            et de fin à L1. Aucune copie n'a été faite. C'est le grand avantage des
            structures qu'on ne modifie jamais : on peut les partager sans aucun risque,
            puisque personne ne peut les abîmer.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Une liste n'est pas un tableau",
          contenu: `
            <p>Le <code>list</code> de Python <strong>n'est pas</strong> le type abstrait
            liste. C'est un <strong>tableau dynamique</strong> : une zone de mémoire d'un
            seul tenant, dont les cases se suivent, et qui est réallouée quand elle
            déborde.</p>

            <p>La différence n'est pas une subtilité de vocabulaire : elle se voit dans le
            dessin, et elle se paie à l'exécution.</p>

            <pre class="bloc-code"><code>Tableau      ┌────┬───┬────┬───┐
             │ 12 │ 5 │ 32 │ 7 │     les cases se suivent
             └────┴───┴────┴───┘

Liste   L ─▶ ┌────┬───┐   ┌───┬───┐   ┌────┬───┐
             │ 12 │ ──┼──▶│ 5 │ ──┼──▶│ 32 │ ──┼──▶ nil
             └────┴───┘   └───┴───┘   └────┴───┘
                                       chaque case dit où est la suivante</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr>
                <th></th>
                <th>Tableau <span style="font-weight:400">(le <code>list</code> de Python)</span></th>
                <th>Liste <span style="font-weight:400">(le type abstrait)</span></th>
              </tr>
              <tr><td>Lire la case n°&nbsp;<em>n</em></td><td>immédiat : l'adresse se calcule</td><td>il faut descendre <em>n</em> maillons</td></tr>
              <tr><td>Ajouter en tête</td><td>coûteux : tout décaler d'un cran</td><td>immédiat : un maillon de plus devant</td></tr>
              <tr><td>Connaître la longueur</td><td>immédiat : elle est rangée à côté</td><td>il faut compter</td></tr>
              <tr><td>Modifiable ?</td><td>oui, sur place</td><td>non : on en fabrique de nouvelles</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le vocabulaire du baccalauréat</span>
              Quand un sujet parle de <strong>liste</strong>, il parle du type abstrait ;
              quand il parle de <strong>tableau</strong>, il parle du <code>list</code> de
              Python. Le programme officiel prend d'ailleurs soin de préciser qu'on
              « distingue le type abstrait liste du type <code>list</code> de Python ».
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le mot juste : immuable</span>
              On dit qu'une structure est <strong>immuable</strong> quand aucune de ses
              opérations ne la modifie. Nos listes le sont : <code>cons</code> fabrique,
              <code>car</code> et <code>cdr</code> désignent, et rien n'écrase jamais rien.
              C'est ce qui autorise le partage en mémoire que tu viens de voir. Le
              <code>list</code> de Python, lui, est <strong>mutable</strong> — et c'est
              justement pour cela qu'il faut se méfier quand on le passe à une fonction.
            </div>

            <p>Dans ce chapitre, nous implémentons le type abstrait liste avec des p-uplets.
            Rien n'empêcherait de l'implémenter avec un tableau : tu le feras toi-même en
            défi. Mais ce serait renoncer à ce que le chaînage a de meilleur — et c'est le
            sujet de la séance 6.</p>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Compter les éléments",
          contenu: `
            <p>Première fonction cliente. <code>longueur(L)</code> renvoie le nombre
            d'éléments de <code>L</code>, et <code>0</code> si elle est vide.</p>

            <p>Le schéma est celui de <strong>tous</strong> les parcours de liste, et tu vas
            le réécrire une dizaine de fois aujourd'hui :</p>

            <pre class="bloc-code"><code>tant que la liste n'est pas vide :
        faire quelque chose avec sa tête
        remplacer la liste par sa queue</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Uniquement l'interface</span>
              Interdiction d'écrire <code>L[0]</code> ou <code>L[1]</code>, et interdiction
              d'appeler <code>len</code>. Les cinq opérations suffisent — et elles sont les
              seules qui survivront au changement d'implémentation, nécessaire dans les
              défis en fin de séance.
            </div>`,
          nomFichier: "longueur.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef longueur(L):\n    """Renvoie le nombre d'elements de la liste L."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr() : un client ne connaît pas la forme des maillons." },
              { motif: "\\blen\\s*\\(", message: "len() ne sait rien de nos listes. Il faut compter en descendant." },
            ],
            tests: `assert longueur(vide()) == 0, "La liste vide a une longueur de 0."\nassert longueur(cons(4, vide())) == 1, "Une liste d'un seul élément a une longueur de 1."\nL = cons(12, cons(5, cons(32, vide())))\nassert longueur(L) == 3, "Cette liste contient trois éléments."\nassert longueur(cdr(L)) == 2, "La queue d'une liste de trois éléments en contient deux."\nassert longueur(L) == 3, "longueur() ne doit pas consommer la liste : L doit être intacte après l'appel."\nM = vide()\nfor i in range(50):\n    M = cons(i, M)\nassert longueur(M) == 50, "Cinquante cons, cinquante éléments."`,
          },
          felicitation: "Tu tiens le schéma de parcours. Tout le reste de la séance en découle. 🔁",
          indices: [
            "Prépare un compteur à 0 <em>avant</em> la boucle, et renvoie-le <em>après</em>.",
            "La condition de la boucle, c'est « tant que la liste n'est pas vide » : <code>est_vide</code> répond exactement à cette question.",
            "À chaque tour, deux choses doivent se produire : le compteur augmente, et <code>L</code> doit désigner un maillon plus loin.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef longueur(L):\n    """Renvoie le nombre d'elements de la liste L."""\n    n = 0\n    while not est_vide(L):\n        n = n + 1\n        L = cdr(L)\n    return n\n`,
          apres: `<span class="chapo">Ce qu'il faut retenir de cet exercice</span>
              <strong>1. La ligne <code>L = cdr(L)</code> n'est pas optionnelle.</strong>
              C'est elle qui fait avancer le parcours. Si tu l'oublies, la liste testée reste
              la même à chaque tour, la condition reste vraie, et la boucle ne s'arrête
              jamais. C'est l'erreur numéro un de la séance, et elle bloque l'onglet du
              navigateur — pense à relire tes boucles avant de les lancer.
              <br><br>
              <strong>2. Réaffecter <code>L</code> ne casse rien chez l'appelant.</strong>
              <code>L</code> est une variable locale qui <em>désigne</em> un maillon ; on la
              fait glisser de maillon en maillon, sans jamais toucher aux maillons
              eux-mêmes. C'est pourquoi le dernier test passe : après l'appel, la liste de
              l'appelant est intacte.
            <p>C'est aussi la différence avec la tirelire de la séance 1 : là-bas, on voulait
            modifier l'objet, et il fallait donc <code>t.append(…)</code>. Ici, on veut
            seulement se déplacer, et l'affectation est exactement le bon outil.</p>`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Et si la liste est vide ?",
          contenu: `
            <p>Les spécifications de <code>car</code> et <code>cdr</code> portent une
            précondition : <em>la liste n'est pas vide</em>. Voyons ce qu'il advient quand on
            ne la respecte pas.</p>`,
          code: `L = vide()\nprint(est_vide(L))\nprint(cdr(L))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>True</code>, puis le programme s'arrête sur une erreur", correct: true,
              explication: "Oui. <code>cdr</code> tente de lire <code>None[1]</code>, et Python refuse : <code>TypeError</code>. La précondition n'était pas une formalité." },
            { texte: "<code>True</code> puis <code>None</code>",
              explication: "Ce serait le cas si <code>cdr</code> se protégeait. Il ne le fait pas : il applique directement l'indexation à ce qu'on lui donne." },
            { texte: "<code>False</code> puis <code>None</code>",
              explication: "<code>est_vide</code> répond bien <code>True</code> : <code>L</code> vient d'être créée par <code>vide()</code>." },
            { texte: "Deux erreurs",
              explication: "La première ligne s'exécute très bien : <code>est_vide</code> n'a aucune précondition, et c'est justement à cela qu'il sert." },
          ],
          apres: `<span class="chapo">C'est au client de vérifier</span>
            Une précondition n'est pas un test caché dans la fonction : c'est une
            <strong>obligation pour l'appelant</strong>. <code>cdr</code> n'a rien promis sur
            la liste vide, et il n'a donc rien à se reprocher.
            <br><br>
            D'où le réflexe qui structure toute la séance, et que tu viens d'appliquer sans y
            penser dans <code>longueur</code> : on ne touche jamais à la tête ni à la queue
            d'une liste sans avoir demandé <code>est_vide</code> d'abord. C'est exactement ce
            que fait la condition de la boucle.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Chercher un élément",
          contenu: `
            <p><code>appartient(L, x)</code> renvoie <code>True</code> si <code>x</code>
            figure dans <code>L</code>, <code>False</code> sinon.</p>
            <p>Même schéma que pour <code>longueur</code>, à une différence près : dès que
            l'élément est trouvé, il est inutile de continuer.</p>`,
          nomFichier: "appartient.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef appartient(L, x):\n    """Renvoie True si x figure dans la liste L, False sinon."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bin\\s+L\\b", message: "L'opérateur in ne connaît pas nos listes : il faut les descendre." },
            ],
            tests: `L = cons(12, cons(5, cons(32, vide())))\nassert appartient(L, 5) == True, "5 figure bien dans la liste."\nassert appartient(L, 12) == True, "12 est la tête : il appartient à la liste."\nassert appartient(L, 32) == True, "32 est le dernier élément : il ne faut pas s'arrêter avant."\nassert appartient(L, 7) == False, "7 ne figure pas dans la liste."\nassert appartient(vide(), 7) == False, "Rien n'appartient à la liste vide."\nassert appartient(L, 5) == True, "appartient() ne doit pas consommer la liste."`,
          },
          felicitation: "Recherche séquentielle sur liste chaînée : un classique des sujets de bac. 🔍",
          indices: [
            "Reprends la boucle de <code>longueur</code> : tant que la liste n'est pas vide, on regarde sa tête, puis on passe à la queue.",
            "Si la tête est la valeur cherchée, la réponse est connue : la fonction peut s'arrêter immédiatement, sans finir la boucle.",
            "Et si la boucle se termine sans avoir rien trouvé, c'est que la liste a été parcourue en entier. Il ne reste qu'à renvoyer la réponse négative, <em>après</em> la boucle.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef appartient(L, x):\n    """Renvoie True si x figure dans la liste L, False sinon."""\n    while not est_vide(L):\n        if car(L) == x:\n            return True\n        L = cdr(L)\n    return False\n`,
          apres: `<span class="chapo">Deux <code>return</code>, et ce n'est pas un défaut</span>
              Celui de l'intérieur dit « j'ai trouvé, je n'ai plus rien à faire » ; celui de
              la fin dit « j'ai tout regardé, ce n'était pas là ». Le second ne peut être
              atteint que si la boucle s'est terminée d'elle-même, donc si la liste est
              épuisée.
              <br><br>
              Sortir d'une fonction dès que la réponse est connue s'appelle un
              <strong>arrêt anticipé</strong>. Ce n'est pas seulement plus rapide : c'est
              aussi plus lisible, parce que chaque <code>return</code> dit une chose et une
              seule.
            <p>Attention en revanche à ne pas écrire <code>return False</code>
            <em>dans</em> la boucle : la fonction s'arrêterait au premier élément qui n'est
            pas le bon, sans jamais regarder les suivants. Tu verras cette erreur exacte, en
            vrai, dans la chasse aux bugs.</p>`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Rôle</th><th>Précondition</th></tr>
              <tr><td><code>vide()</code></td><td>la liste vide, <em>nil</em></td><td>—</td></tr>
              <tr><td><code>est_vide(L)</code></td><td>L est-elle vide ?</td><td>—</td></tr>
              <tr><td><code>cons(e, L)</code></td><td>nouvelle liste, <code>e</code> en tête</td><td>—</td></tr>
              <tr><td><code>car(L)</code></td><td>la tête — un <strong>élément</strong></td><td><code>not est_vide(L)</code></td></tr>
              <tr><td><code>cdr(L)</code></td><td>la queue — une <strong>liste</strong></td><td><code>not est_vide(L)</code></td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">Le schéma de parcours, à connaître par cœur</span>
              <pre class="bloc-code"><code>while not est_vide(L):
    ...   # travailler avec car(L)
    L = cdr(L)</code></pre>
              Oublier la dernière ligne, c'est écrire une boucle qui ne s'arrête jamais.
            </div>

            <div class="encadre">
              <span class="chapo">Le schéma de construction</span>
              <pre class="bloc-code"><code>resultat = vide()
while ... :
    resultat = cons(..., resultat)</code></pre>
              Comme <code>cons</code> ajoute en tête, ce schéma construit la liste
              <strong>dans l'ordre inverse</strong> de celui où les éléments arrivent. C'est
              souvent commode ; quand ce ne l'est pas, on construit à l'envers puis on
              renverse.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Confondre <code>car</code> et <code>cdr</code>.</strong>
                <code>car</code> rend un <em>élément</em>, <code>cdr</code> rend une
                <em>liste</em>. Écrire <code>L = car(L)</code> dans une boucle range un entier
                dans une variable censée contenir une liste, et tout casse au tour
                suivant.</li>
                <li><strong>Oublier <code>L = cdr(L)</code>.</strong> La boucle tourne
                indéfiniment, et l'onglet ne répond plus.</li>
                <li><strong>Appeler <code>car</code> sans vérifier.</strong> La précondition
                s'adresse à l'appelant, pas à la fonction.</li>
                <li><strong>Croire que <code>cons</code> modifie la liste.</strong> Il en
                <em>renvoie</em> une nouvelle : sans affectation, il ne se passe rien.</li>
                <li><strong>Dire « liste » pour un <code>list</code> Python.</strong> Le
                premier est un type abstrait, le second un tableau.</li>
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
      intention: "descendre, accumuler, reconstruire",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "De la liste au tableau",
          contenu: `
            <p><code>vers_python(L)</code> renvoie un <strong>tableau Python</strong>
            contenant les éléments de <code>L</code>, dans le même ordre.</p>
            <pre class="bloc-code"><code>vers_python(cons(12, cons(5, cons(32, vide()))))  →  [12, 5, 32]</code></pre>
            <p>C'est la fonction qu'on écrit toujours en premier quand on met au point un
            programme sur les listes : elle rend le contenu lisible d'un coup d'œil.</p>`,
          nomFichier: "conversions.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef vers_python(L):\n    """Renvoie le tableau Python des elements de L, dans le meme ordre."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `assert vers_python(vide()) == [], "La liste vide donne le tableau vide."\nassert vers_python(cons(4, vide())) == [4], "Un élément, un tableau d'un élément."\nL = cons(12, cons(5, cons(32, vide())))\nassert vers_python(L) == [12, 5, 32], "L'ordre doit être conservé : la tête en premier."\nassert vers_python(cdr(L)) == [5, 32], "La queue donne le tableau privé de son premier élément."\nassert vers_python(L) == [12, 5, 32], "vers_python() ne doit pas consommer la liste."`,
          },
          felicitation: "Tes listes sont enfin lisibles d'un coup d'œil. 👀",
          indices: [
            "Prépare un tableau vide avant la boucle, et renvoie-le après.",
            "À chaque tour, la tête courante doit rejoindre le tableau — et il faut réfléchir à quel bout, si l'on veut conserver l'ordre.",
            "La méthode des tableaux qui ajoute en fin est <code>append</code>. N'oublie pas non plus de passer à la queue à chaque tour.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef vers_python(L):\n    """Renvoie le tableau Python des elements de L, dans le meme ordre."""\n    resultat = []\n    while not est_vide(L):\n        resultat.append(car(L))\n        L = cdr(L)\n    return resultat\n`,
          apres: `<p>Note la dissymétrie, elle n'est pas anodine : on <strong>descend</strong>
            la liste depuis la tête, et on <strong>ajoute à la fin</strong> du tableau. Deux
            extrémités opposées, et c'est ce qui préserve l'ordre.</p>
            <p>Garde cette fonction dans un coin : dans tous les exercices qui suivent, si un
            résultat te surprend, la recopier au-dessus de ton code et afficher
            <code>vers_python(ton_resultat)</code> vaut mieux que dix minutes de
            raisonnement.</p>`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Du tableau à la liste",
          contenu: `
            <p>Le trajet inverse. <code>depuis_python(t)</code> renvoie la liste contenant les
            éléments du tableau <code>t</code>, <strong>dans le même ordre</strong>.</p>
            <pre class="bloc-code"><code>depuis_python([12, 5, 32])  →  (12, (5, (32, None)))</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Attention au sens</span>
              <code>cons</code> ajoute en tête. Si tu parcours le tableau de gauche à droite,
              tu obtiendras la liste <strong>à l'envers</strong>. Trouve l'ordre de parcours
              qui règle le problème, sans rien avoir à renverser ensuite.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Rappel : parcourir un tableau à rebours</span>
              <code>range</code> accepte trois arguments — <em>début</em>, <em>fin exclue</em>
              et <em>pas</em> — et le pas peut être négatif. Pour aller du dernier indice
              jusqu'à l'indice 0 <strong>inclus</strong>, la fin exclue doit donc valoir
              <code>-1</code>.
            </div>`,
          nomFichier: "conversions.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef depuis_python(t):\n    """Renvoie la liste des elements du tableau t, dans le meme ordre."""\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "(\\bcons\\s*\\([\\s\\S]*?){2}", message: "La liste se construit avec cons()." },
            ],
            tests: `assert est_vide(depuis_python([])), "Le tableau vide donne la liste vide."\nassert depuis_python([4]) == (4, None), "Un seul élément : un seul maillon, suivi de la liste vide."\nassert depuis_python([12, 5, 32]) == (12, (5, (32, None))), "L'ordre doit être conservé : 12 en tête."\nassert car(depuis_python([1, 2, 3])) == 1, "La tête de la liste doit être le premier élément du tableau."\nassert depuis_python(["a", "b"]) == ("a", ("b", None)), "La fonction ne suppose rien du type des éléments."\nt = [7, 8, 9]\ndepuis_python(t)\nassert t == [7, 8, 9], "Le tableau reçu ne doit pas être modifié."`,
          },
          felicitation: "Aller et retour : tes listes communiquent avec le reste du monde. ↔️",
          indices: [
            "Comme toujours : un résultat initialisé à <code>vide()</code> avant la boucle, renvoyé après.",
            "Le dernier élément consé est celui qui finit en tête. Lequel des éléments du tableau doit donc être traité en dernier ?",
            "Il faut parcourir le tableau en commençant par la fin. Sers-toi du <code>range</code> à trois arguments rappelé dans l'énoncé.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef depuis_python(t):\n    """Renvoie la liste des elements du tableau t, dans le meme ordre."""\n    L = vide()\n    for i in range(len(t) - 1, -1, -1):\n        L = cons(t[i], L)\n    return L\n`,
          apres: `<span class="chapo">Le renversement, premier épisode</span>
              Tu viens de rencontrer la difficulté qui va revenir dans tout le reste de la
              séance : <strong>on ne peut construire qu'en tête, donc le dernier élément
              traité est le premier de la liste obtenue.</strong>
              <br><br>
              Deux façons de s'en sortir, et les deux sont justes :
              <ul>
                <li><strong>parcourir la source à l'envers</strong>, comme ici — un seul
                parcours, mais il faut pouvoir remonter, ce qu'un tableau permet ;</li>
                <li><strong>construire à l'envers puis renverser</strong> — deux parcours,
                mais applicable même quand on ne peut avancer que dans un sens.</li>
              </ul>
              Sur une liste chaînée, on ne peut pas remonter : c'est donc la seconde méthode
              qui s'imposera, et tu écriras l'outil qui la rend possible dans quelques
              étapes.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : trois parcours ratés",
          contenu: `
            <p>Trois fonctions, trois erreurs de natures différentes :</p>
            <ul>
              <li>une erreur de <strong>syntaxe</strong>, que Python signale tout de suite ;</li>
              <li>une confusion entre <code>car</code> et <code>cdr</code>, qui provoque une
              erreur plus loin, et bien plus obscure ;</li>
              <li>une erreur de <strong>structure</strong> : la fonction s'arrête après un
              seul tour de boucle.</li>
            </ul>
            <p>Répare les trois sans changer les noms ni les signatures.</p>`,
          nomFichier: "casse.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Les trois fonctions à réparer. ----\n\ndef longueur(L):\n    n = 0\n    while not est_vide(L)\n        n = n + 1\n        L = cdr(L)\n    return n\n\ndef appartient(L, x):\n    while not est_vide(L):\n        if car(L) == x:\n            return True\n        L = car(L)\n    return False\n\ndef somme(L):\n    total = 0\n    while not est_vide(L):\n        total = total + car(L)\n        L = cdr(L)\n        return total\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Répare avec car() et cdr() : un client ne connaît pas la forme des maillons." },
            ],
            tests: `L = cons(12, cons(5, cons(32, vide())))\nassert longueur(vide()) == 0, "La liste vide a une longueur de 0."\nassert longueur(L) == 3, "Cette liste contient trois éléments."\nassert appartient(L, 32) == True, "32 est le dernier élément : la recherche doit aller jusqu'au bout."\nassert appartient(L, 7) == False, "7 ne figure pas dans la liste."\nassert somme(vide()) == 0, "La somme d'une liste vide vaut 0."\nassert somme(L) == 49, "12 + 5 + 32 font 49 — la fonction doit parcourir toute la liste, pas seulement sa tête."\nassert somme(cons(4, vide())) == 4, "Une liste d'un seul élément : la somme est cet élément."`,
          },
          felicitation: "Trois bugs, trois natures. Le deuxième est celui qui coûte le plus de temps en devoir. 🐛",
          indices: [
            "Commence par exécuter avec <strong>▶</strong> et lis le message : Python refuse le fichier entier tant qu'il n'arrive pas à le lire, et il indique la ligne.",
            "Dans <code>appartient</code>, regarde ce que <code>L</code> devient à chaque tour : elle doit désigner une <em>liste</em>, or on lui affecte un <em>élément</em>.",
            "Dans <code>somme</code>, compare l'indentation de la dernière ligne avec celle du reste : elle est au même niveau que le corps de la boucle. À quel moment s'exécute-t-elle donc ?",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Les trois fonctions à réparer. ----\n\ndef longueur(L):\n    n = 0\n    while not est_vide(L):\n        n = n + 1\n        L = cdr(L)\n    return n\n\ndef appartient(L, x):\n    while not est_vide(L):\n        if car(L) == x:\n            return True\n        L = cdr(L)\n    return False\n\ndef somme(L):\n    total = 0\n    while not est_vide(L):\n        total = total + car(L)\n        L = cdr(L)\n    return total\n`,
          apres: `<span class="chapo">Les trois bugs, et ce qu'ils t'apprennent</span>
              <strong>Le deux-points oublié.</strong> Python ne comprend pas le fichier et
              refuse de l'exécuter, même les parties saines. C'est le bug le plus facile :
              le message donne le numéro de la ligne.
              <br><br>
              <strong><code>L = car(L)</code> au lieu de <code>L = cdr(L)</code>.</strong>
              Au premier tour, <code>L</code> reçoit <code>12</code> — un entier. Au tour
              suivant, <code>est_vide(12)</code> répond <code>False</code>, puis
              <code>car(12)</code> essaie d'écrire <code>12[0]</code> et Python s'arrête sur
              une <code>TypeError</code>. Retiens le symptôme : <strong>une erreur de type
              une ligne après la ligne fautive</strong> vient presque toujours d'une variable
              qui ne contient plus ce qu'on croit. Le bon réflexe est d'afficher
              <code>L</code> au début de chaque tour.
              <br><br>
              <strong><code>return total</code> dans la boucle.</strong> Aucune erreur, aucun
              message : la fonction rend simplement la somme du premier élément, et s'en va.
              Un <code>return</code> ne termine pas un tour de boucle — il termine la
              <em>fonction</em>, immédiatement. C'est l'exacte contrepartie de l'arrêt
              anticipé que tu as utilisé, à bon escient cette fois, dans
              <code>appartient</code> : le même geste est une qualité ou un bug selon
              l'endroit où on le pose.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "L'élément de rang n",
          contenu: `
            <p>Le type abstrait liste n'a pas d'indice. Rien n'empêche cependant d'écrire une
            fonction cliente qui en simule un.</p>
            <p><code>nieme(L, n)</code> renvoie l'élément de rang <code>n</code>, en comptant
            à partir de <strong>0</strong> comme partout ailleurs.</p>
            <pre class="bloc-code"><code>nieme(cons(12, cons(5, cons(32, vide()))), 1)  →  5</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>0 &lt;= n &lt; longueur(L)</code>. La fonction n'a rien à promettre en
              dehors de ce cas, et n'a donc rien à vérifier.
            </div>`,
          nomFichier: "nieme.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef nieme(L, n):\n    """Renvoie l'element de rang n de la liste L, le premier ayant le rang 0.\n\n    Precondition : 0 <= n < longueur(L).\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `L = cons(12, cons(5, cons(32, vide())))\nassert nieme(L, 0) == 12, "Le rang 0, c'est la tête."\nassert nieme(L, 1) == 5, "Le rang 1 s'obtient après une descente."\nassert nieme(L, 2) == 32, "Le rang 2 est le dernier élément de cette liste."\nassert nieme(L, 0) == 12, "nieme() ne doit pas consommer la liste."\nM = vide()\nfor i in range(20):\n    M = cons(i, M)\nassert nieme(M, 0) == 19, "Le dernier consé est en tête : c'est 19."\nassert nieme(M, 19) == 0, "Et le premier consé se retrouve tout au fond."`,
          },
          felicitation: "Un indice simulé — et tu vas voir tout de suite ce qu'il coûte. 🔢",
          indices: [
            "Pour atteindre le rang <code>n</code>, il faut descendre un certain nombre de fois, puis lire la tête de ce qui reste.",
            "On sait à l'avance combien de descentes faire : une boucle <code>for</code> convient donc mieux qu'un <code>while</code>.",
            "<code>range(n)</code> répète exactement <code>n</code> fois. La variable de boucle ne sert à rien ici : seule compte la descente qu'on répète.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef nieme(L, n):\n    """Renvoie l'element de rang n de la liste L, le premier ayant le rang 0.\n\n    Precondition : 0 <= n < longueur(L).\n    """\n    for _ in range(n):\n        L = cdr(L)\n    return car(L)\n`,
          apres: `<p>Le tiret bas <code>_</code> est un nom de variable comme un autre, mais
            c'est une convention Python : il signale au lecteur que <strong>la valeur ne sert
            pas</strong>. Ici, on ne veut que répéter la descente ; le numéro du tour n'a
            aucun intérêt, et l'écrire <code>_</code> l'annonce d'emblée.</p>
            <p>Cette fonction <em>marche</em>. La question est de savoir ce qu'elle coûte —
            et c'est l'objet de l'étape suivante.</p>`,
        },

        {
          id: "a5",
          type: "qcm",
          titre: "Ce que coûte un indice",
          contenu: `
            <p>Deux collections de <strong>1 000</strong> nombres : un tableau Python
            <code>t</code>, et une liste <code>L</code>. On veut l'élément de rang 999.</p>
            <pre class="bloc-code"><code>t[999]          nieme(L, 999)</code></pre>`,
          question: "Que fait la machine dans chaque cas ?",
          options: [
            { texte: "Les deux vont chercher directement la bonne case.",
              explication: "C'est vrai du tableau, dont les cases se suivent en mémoire et dont l'adresse se calcule par une simple addition. Ce n'est pas vrai de la liste : ses maillons sont éparpillés, et chacun ne connaît que son successeur." },
            { texte: "<code>t[999]</code> est immédiat ; <code>nieme(L, 999)</code> traverse 999 maillons.", correct: true,
              explication: "Oui. C'est le compromis du chaînage : on gagne sur l'ajout en tête, on perd sur l'accès direct." },
            { texte: "<code>nieme(L, 999)</code> est plus rapide : il n'y a pas de calcul d'adresse à faire.",
              explication: "La traversée de 999 maillons coûte incomparablement plus cher qu'une addition d'adresse." },
            { texte: "Cela dépend de l'implémentation de la liste, on ne peut pas savoir.",
              explication: "Ici on le sait : nos maillons ne connaissent que leur successeur, il faut donc les suivre. Aucune implémentation chaînée ne permet d'atteindre le rang 999 sans traverser les 999 premiers." },
          ],
          apres: `<span class="chapo">La règle du chapitre</span>
            Le tableau est bon pour l'<strong>accès par rang</strong> ; la liste chaînée est
            bonne pour l'<strong>ajout et le retrait en tête</strong>. Aucune des deux n'est
            « meilleure » dans l'absolu.
            <br><br>
            Ce qui doit guider le choix, c'est la question suivante : <em>de quelle opération
            mon programme va-t-il le plus se servir ?</em> Si c'est de <code>nieme</code>, la
            liste chaînée est un mauvais choix — et écrire <code>nieme</code> comme tu viens
            de le faire, sans y penser, dans une boucle qui la rappelle pour chaque rang,
            transforme un parcours en 1 000 traversées. On y reviendra chiffres en main à la
            séance 7.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Le plus grand",
          contenu: `
            <p><code>maximum(L)</code> renvoie le plus grand élément de <code>L</code>.</p>
            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>L</code> n'est pas vide — le maximum d'une liste vide n'existe pas.
            </div>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Par quoi commencer ?</span>
              Surtout pas par <code>0</code> : une liste de nombres négatifs donnerait alors
              un maximum faux. La liste n'étant pas vide, il existe pourtant un candidat tout
              trouvé.
            </div>`,
          nomFichier: "maximum.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef maximum(L):\n    """Renvoie le plus grand element de la liste L.\n\n    Precondition : L n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bmax\\s*\\(", message: "max() ne connaît pas nos listes : il faut comparer en descendant." },
            ],
            tests: `assert maximum(cons(4, vide())) == 4, "Le maximum d'une liste d'un seul élément est cet élément."\nL = cons(12, cons(5, cons(32, vide())))\nassert maximum(L) == 32, "Le plus grand des trois est 32, et il est au fond de la liste."\nassert maximum(cons(99, cons(5, cons(32, vide())))) == 99, "Le maximum peut aussi se trouver en tête."\nassert maximum(cons(-12, cons(-5, cons(-32, vide())))) == -5, "Sur des nombres négatifs, partir de 0 donnerait un résultat faux."\nassert maximum(L) == 32, "maximum() ne doit pas consommer la liste."\nM = vide()\nfor i in range(30):\n    M = cons(i, M)\nassert maximum(M) == 29, "Le plus grand des entiers de 0 à 29 est 29."`,
          },
          felicitation: "L'accumulateur, transposé aux listes chaînées. 🏔️",
          indices: [
            "Le candidat de départ existe forcément, puisque la précondition garantit que la liste n'est pas vide.",
            "Une fois ce candidat choisi, on descend le reste de la liste et on le remplace chaque fois qu'on trouve mieux.",
            "Attention à ne pas recompter deux fois le même élément : si tu prends la tête comme candidat initial, la boucle peut commencer à la queue.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef maximum(L):\n    """Renvoie le plus grand element de la liste L.\n\n    Precondition : L n'est pas vide.\n    """\n    plus_grand = car(L)\n    L = cdr(L)\n    while not est_vide(L):\n        if car(L) > plus_grand:\n            plus_grand = car(L)\n        L = cdr(L)\n    return plus_grand\n`,
          apres: `<p>Recommencer la boucle à la tête plutôt qu'à la queue aurait aussi
            marché : le premier élément se serait simplement comparé à lui-même, sans
            dommage. Ce qui compte, c'est l'idée générale : <strong>quand une fonction ne
            promet rien sur le cas vide, on peut se servir du premier élément comme valeur de
            départ</strong> — et c'est précisément ce que la précondition autorise.</p>
            <p>C'est ce qui distingue une précondition bien choisie d'une précondition
            gratuite : ici, elle ne sert pas à se débarrasser d'un cas gênant, elle rend la
            fonction plus simple <em>et</em> plus juste.</p>`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Renverser une liste",
          contenu: `
            <p><code>renverser(L)</code> renvoie une <strong>nouvelle</strong> liste contenant
            les mêmes éléments, dans l'ordre inverse. <code>L</code> doit rester intacte.</p>
            <pre class="bloc-code"><code>renverser((12, (5, (32, None))))  →  (32, (5, (12, None)))</code></pre>
            <p>Souviens-toi de ce que tu as constaté en écrivant <code>depuis_python</code> :
            construire une liste et la parcourir ne vont pas dans le même sens. Ici, pour une
            fois, c'est ce qu'on veut.</p>`,
          nomFichier: "renverser.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse.\n\n    Effet : L n'est pas modifiee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `assert est_vide(renverser(vide())), "La liste vide renversée reste vide."\nassert renverser(cons(4, vide())) == (4, None), "Une liste d'un élément est son propre renversé."\nL = cons(12, cons(5, cons(32, vide())))\nassert renverser(L) == (32, (5, (12, None))), "Les trois éléments doivent se retrouver dans l'ordre inverse."\nassert L == (12, (5, (32, None))), "renverser() ne doit pas modifier la liste reçue."\nassert renverser(renverser(L)) == L, "Renverser deux fois redonne la liste de départ."\nM = vide()\nfor i in range(10):\n    M = cons(i, M)\nassert car(renverser(M)) == 0, "Le premier consé, tout au fond, doit remonter en tête."`,
          },
          felicitation: "L'outil le plus réutilisé du chapitre est écrit. ↩️",
          indices: [
            "C'est le schéma de construction du mémo : un résultat initialisé à <code>vide()</code>, qu'on fait grandir tour après tour.",
            "À chaque tour, tu disposes de la tête courante de <code>L</code>. Où faut-il la placer dans le résultat pour obtenir l'ordre inverse ?",
            "Deux lignes suffisent dans la boucle : l'une fait grandir le résultat, l'autre fait descendre <code>L</code>. Aucune des deux n'est facultative.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse.\n\n    Effet : L n'est pas modifiee.\n    """\n    resultat = vide()\n    while not est_vide(L):\n        resultat = cons(car(L), resultat)\n        L = cdr(L)\n    return resultat\n`,
          apres: `<span class="chapo">Pourquoi il n'y a rien de plus à faire</span>
              Regarde ce que devient le résultat, tour après tour, pour la liste 12, 5, 32 :
              <pre class="bloc-code"><code>départ  : nil
tour 1  : (12, nil)             on a consé 12
tour 2  : (5, (12, nil))        5 est passé DEVANT 12
tour 3  : (32, (5, (12, nil)))  et 32 devant tout le monde</code></pre>
              Le premier élément lu finit au fond, le dernier lu finit en tête. Le
              renversement n'est pas un traitement supplémentaire : c'est la
              <strong>conséquence automatique</strong> du fait que <code>cons</code> ajoute
              en tête.
            <p>Retiens cette fonction, elle va te servir sans arrêt. Chaque fois qu'un
            exercice demandera une liste <em>dans l'ordre</em> alors que tu ne peux la
            construire qu'en tête, la recette sera la même : <strong>construire à l'envers,
            puis renverser</strong>. C'est le geste central de toute la fin de séance.</p>`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "construire, filtrer, et changer d'implémentation sans rien casser",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Concaténer deux listes",
          contenu: `
            <p><code>concatener(L1, L2)</code> renvoie une nouvelle liste contenant les
            éléments de <code>L1</code> suivis de ceux de <code>L2</code>. Les deux listes
            reçues restent intactes.</p>
            <pre class="bloc-code"><code>concatener((1, (2, None)), (3, (4, None)))  →  (1, (2, (3, (4, None))))</code></pre>

            <p><code>renverser</code>, que tu viens d'écrire, t'est fournie.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Par quel bout commencer ?</span>
              On ne peut coller quelque chose qu'<strong>en tête</strong>. Demande-toi donc
              quelle liste est déjà à sa place définitive dans le résultat, et dans quel ordre
              les éléments de l'autre doivent venir se poser devant elle.
            </div>`,
          nomFichier: "concatener.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Déjà écrite à l'exercice précédent. ----\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse."""\n    resultat = vide()\n    while not est_vide(L):\n        resultat = cons(car(L), resultat)\n        L = cdr(L)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef concatener(L1, L2):\n    """Renvoie une nouvelle liste : les elements de L1, puis ceux de L2.\n\n    Effet : ni L1 ni L2 ne sont modifiees.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL1\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bL2\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `A = cons(1, cons(2, vide()))\nB = cons(3, cons(4, vide()))\nassert concatener(A, B) == (1, (2, (3, (4, None)))), "Les éléments de L1 doivent précéder ceux de L2, sans changer d'ordre."\nassert A == (1, (2, None)) and B == (3, (4, None)), "concatener() ne doit modifier aucune des deux listes reçues."\nassert concatener(vide(), B) == (3, (4, None)), "Concaténer la liste vide à gauche redonne L2."\nassert concatener(A, vide()) == (1, (2, None)), "Concaténer la liste vide à droite redonne L1."\nassert est_vide(concatener(vide(), vide())), "Deux listes vides donnent une liste vide."\nC = cons(9, vide())\nassert concatener(C, C) == (9, (9, None)), "Une liste concaténée avec elle-même donne ses éléments deux fois."`,
          },
          felicitation: "Le renversement comme outil : tu viens d'installer le réflexe du chapitre. 🔗",
          indices: [
            "<code>L2</code> se retrouve telle quelle à la fin du résultat : elle peut donc servir de point de départ à la construction.",
            "Il reste à coller les éléments de <code>L1</code> devant, et comme on ne colle qu'en tête, il faut commencer par le <strong>dernier</strong>.",
            "Renverse <code>L1</code>, puis descends ce renversé en consant chaque tête sur le résultat.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Déjà écrite à l'exercice précédent. ----\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse."""\n    resultat = vide()\n    while not est_vide(L):\n        resultat = cons(car(L), resultat)\n        L = cdr(L)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef concatener(L1, L2):\n    """Renvoie une nouvelle liste : les elements de L1, puis ceux de L2.\n\n    Effet : ni L1 ni L2 ne sont modifiees.\n    """\n    resultat = L2\n    envers = renverser(L1)\n    while not est_vide(envers):\n        resultat = cons(car(envers), resultat)\n        envers = cdr(envers)\n    return resultat\n`,
          apres: `<span class="chapo">Deux renversements qui s'annulent</span>
              <code>renverser(L1)</code> met le dernier élément de L1 en tête ; la boucle le
              consomme donc en premier et le pose au plus près de L2. Puis l'avant-dernier
              vient devant lui, et ainsi de suite : le second renversement, celui que fait la
              boucle, défait le premier. L1 se retrouve à l'endroit, devant L2.
            <p>Remarque au passage que <code>L2</code> n'est pas recopiée : le résultat
            <strong>partage</strong> ses maillons avec elle. C'est sans danger, puisque
            personne ne peut les modifier — et c'est ce qui rend cette concaténation bien
            moins coûteuse qu'il n'y paraît.</p>`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Ne garder que les bons",
          contenu: `
            <p><code>filtrer(L, seuil)</code> renvoie une nouvelle liste contenant, dans le
            <strong>même ordre</strong>, les seuls éléments de <code>L</code> strictement
            supérieurs à <code>seuil</code>.</p>
            <pre class="bloc-code"><code>filtrer((12, (5, (32, (7, None)))), 10)  →  (12, (32, None))</code></pre>
            <p><code>renverser</code> t'est toujours fournie. Un seul parcours de
            <code>L</code> suffit.</p>`,
          nomFichier: "filtrer.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse."""\n    resultat = vide()\n    while not est_vide(L):\n        resultat = cons(car(L), resultat)\n        L = cdr(L)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef filtrer(L, seuil):\n    """Renvoie la liste des elements de L strictement superieurs a seuil.\n\n    L'ordre d'origine est conserve. L n'est pas modifiee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `L = cons(12, cons(5, cons(32, cons(7, vide()))))\nassert filtrer(L, 10) == (12, (32, None)), "Seuls 12 et 32 dépassent 10, et dans cet ordre."\nassert filtrer(L, 0) == (12, (5, (32, (7, None)))), "Tous les éléments dépassent 0 : la liste est reproduite à l'identique."\nassert est_vide(filtrer(L, 100)), "Aucun élément ne dépasse 100 : le résultat est vide."\nassert filtrer(L, 12) == (32, None), "Le seuil est strict : 12 ne dépasse pas 12."\nassert est_vide(filtrer(vide(), 10)), "Filtrer la liste vide donne la liste vide."\nassert L == (12, (5, (32, (7, None)))), "filtrer() ne doit pas modifier la liste reçue."`,
          },
          felicitation: "Construire à l'envers puis renverser : le geste est installé. ⚗️",
          indices: [
            "Descends <code>L</code> comme d'habitude ; à chaque tour, il s'agit seulement de décider si la tête courante mérite d'être gardée.",
            "Les éléments retenus s'accumulent sur un résultat qui grandit en tête : dans quel ordre s'y retrouvent-ils ?",
            "D'où la toute dernière ligne de la fonction : il reste un geste à faire avant de renvoyer.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\ndef renverser(L):\n    """Renvoie une nouvelle liste contenant les elements de L en ordre inverse."""\n    resultat = vide()\n    while not est_vide(L):\n        resultat = cons(car(L), resultat)\n        L = cdr(L)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef filtrer(L, seuil):\n    """Renvoie la liste des elements de L strictement superieurs a seuil.\n\n    L'ordre d'origine est conserve. L n'est pas modifiee.\n    """\n    envers = vide()\n    while not est_vide(L):\n        if car(L) > seuil:\n            envers = cons(car(L), envers)\n        L = cdr(L)\n    return renverser(envers)\n`,
          apres: `<span class="chapo">Le patron « construire à l'envers puis renverser »</span>
              <pre class="bloc-code"><code>envers = vide()
while not est_vide(L):
    si la tête m'intéresse :
        envers = cons(car(L), envers)
    L = cdr(L)
return renverser(envers)</code></pre>
              Il répond à <strong>toutes</strong> les questions de la forme « fabrique une
              nouvelle liste à partir de celle-ci, dans le même ordre » : filtrer, doubler
              chaque valeur, ne garder que les nombres pairs, remplacer les négatifs par
              zéro… Seule change la ligne du milieu.
            <p>Cela fait bien deux parcours complets de la liste au lieu d'un. On aurait pu
            les éviter en descendant <code>L</code> à l'envers — mais c'est impossible : un
            maillon connaît son successeur, jamais son prédécesseur. Le renversement est le
            prix du chaînage, et il reste très raisonnable.</p>`,
        },

        {
          id: "x3",
          type: "qcm",
          titre: "Qui regarde dans les maillons ?",
          contenu: `
            <p>Quatre fonctions clientes des listes. Trois n'utilisent que l'interface ; une
            s'appuie en douce sur le fait qu'un maillon est un p-uplet.</p>
            <pre class="bloc-code"><code># A
def deuxieme(L):
    return car(cdr(L))

# B
def premier_ou(L, defaut):
    if est_vide(L):
        return defaut
    return car(L)

# C
def deux_premiers(L):
    return [L[0], L[1][0]]

# D
def doubler_tete(L):
    return cons(car(L), L)</code></pre>`,
          question: "Laquelle cessera de fonctionner si l'on change l'implémentation des listes ?",
          options: [
            { texte: "A",
              explication: "Elle enchaîne <code>cdr</code> puis <code>car</code> : deux opérations de l'interface, rien d'autre." },
            { texte: "B",
              explication: "Elle demande <code>est_vide</code> avant d'appeler <code>car</code>, ce qui est exactement la précaution qu'impose la précondition. C'est un modèle du genre." },
            { texte: "C", correct: true,
              explication: "Oui. <code>L[0]</code> et <code>L[1][0]</code> supposent que le maillon est un p-uplet indexable. Avec une autre implémentation, cette fonction plante ou ment. Il fallait écrire <code>[car(L), car(cdr(L))]</code>." },
            { texte: "D",
              explication: "Elle remet la tête devant la liste entière, avec <code>car</code> et <code>cons</code>. Parfaitement neutre — et remarque au passage qu'elle ne copie rien : la queue est partagée." },
          ],
          apres: `<span class="chapo">Le test infaillible</span>
            Passe ton code au crible : <strong>s'il contient un crochet appliqué à une
            liste, il triche</strong>. Les crochets sont réservés aux tableaux, et aux cinq
            fonctions de l'implémentation — qui, elles, ont le droit et même le devoir de
            connaître la forme des maillons.
            <br><br>
            Tu vas pouvoir le vérifier toi-même à l'étape suivante, et sur pièces.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le même type abstrait, en tableaux",
          contenu: `
            <p>Écris une <strong>deuxième implémentation</strong> du type abstrait liste. On
            l'appellera <strong>« par tableau »</strong> : une liste y est un tableau Python
            ordinaire, la tête est la case 0, et la queue est tout le reste.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>La liste 3 puis 7</th><th>« par p-uplets »</th><th>« par tableau »</th></tr>
              <tr><td>s'écrit</td><td><code>(3, (7, None))</code></td><td><code>[3, 7]</code></td></tr>
              <tr><td>la liste vide</td><td><code>None</code></td><td><code>[]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'épreuve</span>
              Une fois tes cinq opérations écrites, <strong>✓ Valider</strong> fera tourner
              dessus deux fonctions clientes rédigées pour l'<em>autre</em> implémentation,
              sans en changer une ligne. Si elles fonctionnent, c'est que ton implémentation
              respecte le contrat.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux outils utiles</span>
              <code>[element] + tableau</code> fabrique un <strong>nouveau</strong> tableau
              avec <code>element</code> devant. Et une <em>tranche</em> écrite
              <code>tableau[1:]</code> donne un nouveau tableau privé de sa première case.
              Aucun des deux ne modifie l'original — c'est exactement ce qu'il faut, puisque
              nos listes sont immuables.
            </div>`,
          nomFichier: "liste_tableau.py",
          depart: `# Deuxième implémentation du type abstrait liste : « par tableau ».\n\ndef vide():\n    pass\n\ndef est_vide(liste):\n    pass\n\ndef cons(element, liste):\n    pass\n\ndef car(liste):\n    pass\n\ndef cdr(liste):\n    pass\n`,
          validation: {
            tests: `assert vide() == [], "Dans cette implémentation, la liste vide est le tableau vide."\nassert est_vide(vide()) == True, "est_vide() doit reconnaître la liste vide."\nL = cons(7, vide())\nassert L == [7], "Conser 7 sur la liste vide donne le tableau [7]."\nassert est_vide(L) == False, "Une liste d'un élément n'est pas vide."\nL = cons(3, L)\nassert L == [3, 7], "cons ajoute en tête : le 3 passe devant le 7."\nassert car(L) == 3, "La tête est la case 0."\nassert cdr(L) == [7], "La queue est tout le reste, et c'est une liste."\nassert est_vide(cdr(cdr(L))), "Après deux descentes il ne reste que la liste vide."\nM = cons(1, cons(2, vide()))\ncons(99, M)\nassert M == [1, 2], "cons ne doit pas modifier la liste reçue : il en fabrique une nouvelle."\ncdr(M)\nassert M == [1, 2], "cdr ne doit pas modifier la liste reçue non plus."\ndef longueur(L):\n    n = 0\n    while not est_vide(L):\n        n = n + 1\n        L = cdr(L)\n    return n\ndef renverser(L):\n    r = vide()\n    while not est_vide(L):\n        r = cons(car(L), r)\n        L = cdr(L)\n    return r\nassert longueur(cons(1, cons(2, cons(3, vide())))) == 3, "Un client écrit pour l'implémentation « par p-uplets » doit fonctionner ici sans une retouche."\nassert longueur(vide()) == 0, "Et il doit aussi traiter la liste vide."\nassert renverser(cons(1, cons(2, cons(3, vide())))) == [3, 2, 1], "Le renversement doit donner le même résultat, exprimé dans la nouvelle représentation."`,
          },
          felicitation: "Deux implémentations, un seul contrat, et des clients qui n'y voient que du feu. 🎯",
          indices: [
            "<code>vide</code> et <code>est_vide</code> se règlent en une ligne chacune : la liste vide est le tableau sans aucune case.",
            "<code>cons</code> ne doit rien modifier : il faut <em>fabriquer</em> un nouveau tableau avec l'élément devant, et surtout pas appeler <code>append</code> ni <code>insert</code>.",
            "<code>car</code> lit la case d'indice 0. <code>cdr</code> renvoie une tranche qui commence à l'indice 1 et va jusqu'au bout.",
          ],
          solution: `# Deuxième implémentation du type abstrait liste : « par tableau ».\n\ndef vide():\n    return []\n\ndef est_vide(liste):\n    return liste == []\n\ndef cons(element, liste):\n    return [element] + liste\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1:]\n`,
          apres: `<span class="chapo">Le contrat est tenu ; le prix, lui, a changé</span>
              <code>cdr</code> fabrique ici une <strong>copie</strong> de tout le reste du
              tableau. Descendre une liste de 1 000 éléments recopie donc 999 cases, puis
              998, puis 997… soit près de <strong>500 000 recopies</strong> pour un seul
              parcours. Avec les p-uplets, <code>cdr</code> ne coûtait rigoureusement rien :
              il rendait le second membre d'un couple déjà existant.
              <br><br>
              Tes deux clients rendent pourtant le même résultat. C'est la leçon de la
              séance 1, vérifiée sur pièces : <strong>deux implémentations d'une même
              interface sont interchangeables du point de vue du résultat, jamais du point de
              vue du temps.</strong>
            <p>Et c'est aussi pourquoi la remarque de l'étape précédente compte : un client
            qui écrivait <code>L[0]</code> marchait par accident sur cette implémentation-ci
            — puisqu'un tableau s'indexe — tout en étant faux sur l'autre. Les erreurs les
            plus coûteuses sont celles qui fonctionnent la moitié du temps.</p>`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Comparer deux listes",
          contenu: `
            <p><code>egales(L1, L2)</code> renvoie <code>True</code> si les deux listes
            contiennent les <strong>mêmes éléments dans le même ordre</strong>,
            <code>False</code> sinon.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pas de raccourci</span>
              Écrire <code>L1 == L2</code> marcherait avec l'implémentation « par p-uplets »,
              et seulement avec elle. Ta fonction doit descendre les deux listes
              <strong>en parallèle</strong>, avec l'interface.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Trois situations, et une seule boucle</span>
              La boucle s'arrête forcément pour l'une de ces raisons : deux têtes diffèrent ;
              l'une des listes s'épuise avant l'autre ; les deux s'épuisent en même temps.
              Seule la troisième correspond à deux listes égales.
              <br><br>
              Les longueurs ne sont pas connues d'avance : un <code>for</code> est donc exclu.
            </div>`,
          nomFichier: "egales.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef egales(L1, L2):\n    """Renvoie True si L1 et L2 ont les memes elements dans le meme ordre."""\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL1\\s*==\\s*L2\\b", message: "Ce raccourci ne marche qu'avec cette implémentation : descends les deux listes." },
              { motif: "\\bL2\\s*==\\s*L1\\b", message: "Ce raccourci ne marche qu'avec cette implémentation : descends les deux listes." },
              { motif: "\\bL1\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bL2\\s*\\[", message: "Passe par car() et cdr()." },
            ],
            tests: `A = cons(1, cons(2, cons(3, vide())))\nB = cons(1, cons(2, cons(3, vide())))\nassert egales(A, B) == True, "Mêmes éléments, même ordre : les listes sont égales."\nassert egales(vide(), vide()) == True, "Deux listes vides sont égales."\nassert egales(A, vide()) == False, "Une liste non vide n'est pas égale à la liste vide."\nassert egales(vide(), A) == False, "Et réciproquement."\nassert egales(A, cons(1, cons(2, vide()))) == False, "La seconde est un début de la première, mais il lui manque un élément : elles ne sont pas égales."\nassert egales(cons(1, cons(2, vide())), A) == False, "Même chose dans l'autre sens : la plus courte ne doit pas être déclarée égale."\nassert egales(A, cons(1, cons(9, cons(3, vide())))) == False, "Un seul élément différent suffit."\nassert egales(A, cons(3, cons(2, cons(1, vide())))) == False, "Mêmes éléments mais ordre différent : les listes ne sont pas égales."\nassert A == (1, (2, (3, None))), "egales() ne doit consommer aucune des deux listes."`,
          },
          felicitation: "Deux descentes en parallèle, et une sortie qui traite les trois cas d'un coup. ⚖️",
          indices: [
            "La boucle ne peut continuer que tant qu'<strong>aucune</strong> des deux listes n'est vide : <code>and</code> combine les deux conditions.",
            "Dans la boucle, une seule raison d'arrêter tout de suite : deux têtes qui diffèrent. Sinon, il faut faire descendre les <em>deux</em> listes.",
            "Et après la boucle ? Elle s'est arrêtée parce qu'au moins une liste est vide. Les listes ne sont égales que si elles le sont <strong>toutes les deux</strong> : c'est cette condition qu'il faut renvoyer.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef egales(L1, L2):\n    """Renvoie True si L1 et L2 ont les memes elements dans le meme ordre."""\n    while not est_vide(L1) and not est_vide(L2):\n        if car(L1) != car(L2):\n            return False\n        L1 = cdr(L1)\n        L2 = cdr(L2)\n    return est_vide(L1) and est_vide(L2)\n`,
          apres: `<span class="chapo">La dernière ligne fait tout le travail</span>
              Beaucoup écrivent <code>return True</code> après la boucle, et la fonction
              déclare alors égales une liste et son propre début — l'erreur que les deux
              tests du milieu attrapent.
              <br><br>
              La bonne question à se poser est : <em>pourquoi la boucle s'est-elle
              arrêtée ?</em> Elle ne peut s'être arrêtée que parce qu'au moins une des deux
              listes est épuisée. Écrire <code>est_vide(L1) and est_vide(L2)</code>, c'est
              demander « les deux le sont-elles ? », et donc distinguer « elles se sont
              terminées ensemble » de « l'une a fini avant l'autre ».
              <br><br>
              C'est un réflexe qui sert bien au-delà de cet exercice : <strong>après une
              boucle <code>while</code>, se demander systématiquement quelle condition l'a
              fait sortir</strong>, et écrire la suite en fonction.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Insérer sans casser l'ordre",
          contenu: `
            <p><code>inserer_trie(L, x)</code> reçoit une liste <strong>triée par ordre
            croissant</strong> et renvoie une nouvelle liste, triée elle aussi, contenant en
            plus l'élément <code>x</code>.</p>
            <pre class="bloc-code"><code>inserer_trie((2, (7, (9, None))), 5)  →  (2, (5, (7, (9, None))))</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La stratégie, en deux temps</span>
              Descends la liste tant que les têtes sont <strong>strictement plus petites</strong>
              que <code>x</code>, en mettant de côté ce que tu traverses. Au premier élément
              qui n'est pas plus petit, tu es au bon endroit : c'est là que <code>x</code>
              doit se glisser, devant ce qui reste. Il ne te restera qu'à remettre devant lui
              ce que tu avais mis de côté.
            </div>`,
          nomFichier: "inserer.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef inserer_trie(L, x):\n    """Renvoie une nouvelle liste triee contenant les elements de L et x.\n\n    Precondition : L est triee par ordre croissant.\n    Effet : L n'est pas modifiee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bsorted\\s*\\(", message: "sorted() ne connaît pas nos listes — et il n'y a rien à trier : la liste l'est déjà." },
            ],
            tests: `L = cons(2, cons(7, cons(9, vide())))\nassert inserer_trie(L, 5) == (2, (5, (7, (9, None)))), "5 doit se glisser entre 2 et 7."\nassert inserer_trie(L, 1) == (1, (2, (7, (9, None)))), "Un élément plus petit que tous les autres se place en tête."\nassert inserer_trie(L, 42) == (2, (7, (9, (42, None)))), "Un élément plus grand que tous les autres se place à la fin."\nassert inserer_trie(L, 7) == (2, (7, (7, (9, None)))), "Un doublon est accepté, et se place à côté de son jumeau."\nassert inserer_trie(vide(), 5) == (5, None), "Insérer dans la liste vide donne une liste d'un seul élément."\nassert L == (2, (7, (9, None))), "inserer_trie() ne doit pas modifier la liste reçue."\nM = vide()\nfor v in [9, 7, 5, 3, 1]:\n    M = inserer_trie(M, v)\nassert M == (1, (3, (5, (7, (9, None))))), "Cinq insertions successives doivent produire une liste triée."\nN = vide()\nfor v in [4, 1, 8, 2]:\n    N = inserer_trie(N, v)\nassert N == (1, (2, (4, (8, None)))), "L'ordre d'insertion ne doit rien changer au résultat."`,
          },
          felicitation: "Tu viens d'écrire le cœur du tri par insertion, sur liste chaînée. 🪡",
          indices: [
            "Deux boucles à la suite : la première descend et met de côté, la seconde recolle.",
            "La première s'arrête dès que la liste est vide <strong>ou</strong> que sa tête n'est plus strictement plus petite que <code>x</code>. Attention à l'ordre des deux conditions — tester la tête d'une liste vide est interdit.",
            "Une fois arrêté, construis le résultat en consant <code>x</code> sur ce qui reste de <code>L</code>. Puis la seconde boucle vide la réserve sur ce résultat.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- À toi. ----\n\ndef inserer_trie(L, x):\n    """Renvoie une nouvelle liste triee contenant les elements de L et x.\n\n    Precondition : L est triee par ordre croissant.\n    Effet : L n'est pas modifiee.\n    """\n    de_cote = vide()\n    while not est_vide(L) and car(L) < x:\n        de_cote = cons(car(L), de_cote)\n        L = cdr(L)\n    resultat = cons(x, L)\n    while not est_vide(de_cote):\n        resultat = cons(car(de_cote), resultat)\n        de_cote = cdr(de_cote)\n    return resultat\n`,
          apres: `<span class="chapo">Deux choses à retenir de cet exercice</span>
              <strong>1. L'ordre des conditions n'est pas décoratif.</strong>
              <code>not est_vide(L) and car(L) &lt; x</code> : si la liste est vide, Python
              n'évalue même pas la seconde condition, et <code>car</code> n'est jamais appelé
              sur une liste vide. Écrit dans l'autre sens, le programme planterait dès que
              <code>x</code> est plus grand que tous les éléments. Cette évaluation
              « paresseuse » du <code>and</code> est un outil, et elle sert précisément à
              protéger une précondition.
              <br><br>
              <strong>2. La réserve se vide toute seule dans le bon ordre.</strong>
              <code>de_cote</code> a été remplie en partant du début de la liste, donc ses
              éléments y sont à l'envers. En les reconsant un à un sur le résultat, on les
              remet à l'endroit. Aucun renversement explicite n'a été nécessaire.
            <span class="chapo">Tu viens d'utiliser une pile sans le savoir</span>
              Regarde <code>de_cote</code> : elle se remplit par la tête, et se vide par la
              tête — donc dans l'ordre inverse de l'entrée. C'est une <strong>pile</strong>,
              et c'est le sujet de la séance 3. Tu la reconnaîtras désormais partout : dès
              qu'un algorithme met des choses de côté pour les reprendre en sens inverse, il
              y a une pile dedans.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "Le podium",
          contenu: `
            <p>Défi de synthèse. <code>podium(L)</code> reçoit une liste de scores et renvoie
            la liste des <strong>trois meilleurs</strong>, du plus grand au plus petit.</p>
            <pre class="bloc-code"><code>podium((12, (45, (7, (30, (22, None))))))  →  (45, (30, (22, None)))</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>L</code> contient au moins trois éléments. Les doublons sont possibles, et
              comptent chacun pour eux-mêmes.
            </div>

            <p><code>inserer_trie</code>, écrite au défi précédent, t'est fournie — mais elle
            trie par ordre <strong>croissant</strong>. À toi de voir ce que tu en fais.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une piste parmi d'autres</span>
              Insérer un à un tous les éléments dans une liste triée, c'est trier la liste. Le
              podium n'est alors plus qu'une question d'extrémité — et remettre une liste dans
              l'autre sens, tu sais faire.
            </div>`,
          nomFichier: "podium.py",
          depart: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Déjà écrite au défi précédent. ----\n\ndef inserer_trie(L, x):\n    """Renvoie une nouvelle liste triee croissante contenant les elements de L et x."""\n    de_cote = vide()\n    while not est_vide(L) and car(L) < x:\n        de_cote = cons(car(L), de_cote)\n        L = cdr(L)\n    resultat = cons(x, L)\n    while not est_vide(de_cote):\n        resultat = cons(car(de_cote), resultat)\n        de_cote = cdr(de_cote)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef podium(L):\n    """Renvoie la liste des trois plus grands elements de L, du plus grand au plus petit.\n\n    Precondition : L contient au moins trois elements.\n    Effet : L n'est pas modifiee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bL\\s*\\[", message: "Passe par car() et cdr()." },
              { motif: "\\bsorted\\s*\\(", message: "sorted() ne connaît pas nos listes." },
            ],
            tests: `L = cons(12, cons(45, cons(7, cons(30, cons(22, vide())))))\nassert podium(L) == (45, (30, (22, None))), "Les trois meilleurs sont 45, 30 et 22, dans cet ordre décroissant."\nassert L == (12, (45, (7, (30, (22, None))))), "podium() ne doit pas modifier la liste reçue."\nM = cons(1, cons(2, cons(3, vide())))\nassert podium(M) == (3, (2, (1, None))), "Avec exactement trois éléments, le podium est la liste entière, en ordre décroissant."\nN = cons(5, cons(5, cons(5, cons(2, vide()))))\nassert podium(N) == (5, (5, (5, None))), "Les doublons comptent chacun pour eux-mêmes."\nP = cons(-3, cons(-10, cons(-1, cons(-7, vide()))))\nassert podium(P) == (-1, (-3, (-7, None))), "Sur des scores négatifs, le meilleur est celui qui est le plus proche de zéro."\nQ = vide()\nfor v in [8, 3, 91, 17, 42, 5, 60]:\n    Q = cons(v, Q)\nassert podium(Q) == (91, (60, (42, None))), "Sur sept valeurs, seuls les trois plus grands doivent rester."`,
          },
          felicitation: "Tri, extraction, renversement : toute la séance tient dans cette fonction. 🥇",
          indices: [
            "Commence par construire une liste triée à partir de tous les éléments de <code>L</code> : une boucle qui descend <code>L</code>, et <code>inserer_trie</code> à chaque tour.",
            "Cette liste est croissante : les trois meilleurs sont donc à la <strong>fin</strong>, c'est-à-dire au mauvais bout pour nous. Que faire pour amener le meilleur en tête ?",
            "Une fois la liste décroissante obtenue, garder ses trois premiers éléments demande trois descentes — et un dernier renversement, puisque tu les auras accumulés en tête.",
          ],
          solution: `# ---- L'implémentation « par p-uplets ». N'y touche pas. ----\n\ndef vide():\n    return None\n\ndef est_vide(liste):\n    return liste is None\n\ndef cons(element, liste):\n    return (element, liste)\n\ndef car(liste):\n    return liste[0]\n\ndef cdr(liste):\n    return liste[1]\n\n\n# ---- Déjà écrite au défi précédent. ----\n\ndef inserer_trie(L, x):\n    """Renvoie une nouvelle liste triee croissante contenant les elements de L et x."""\n    de_cote = vide()\n    while not est_vide(L) and car(L) < x:\n        de_cote = cons(car(L), de_cote)\n        L = cdr(L)\n    resultat = cons(x, L)\n    while not est_vide(de_cote):\n        resultat = cons(car(de_cote), resultat)\n        de_cote = cdr(de_cote)\n    return resultat\n\n\n# ---- À toi. ----\n\ndef podium(L):\n    """Renvoie la liste des trois plus grands elements de L, du plus grand au plus petit.\n\n    Precondition : L contient au moins trois elements.\n    Effet : L n'est pas modifiee.\n    """\n    triee = vide()\n    while not est_vide(L):\n        triee = inserer_trie(triee, car(L))\n        L = cdr(L)\n\n    decroissante = vide()\n    while not est_vide(triee):\n        decroissante = cons(car(triee), decroissante)\n        triee = cdr(triee)\n\n    envers = vide()\n    for _ in range(3):\n        envers = cons(car(decroissante), envers)\n        decroissante = cdr(decroissante)\n\n    resultat = vide()\n    while not est_vide(envers):\n        resultat = cons(car(envers), resultat)\n        envers = cdr(envers)\n    return resultat\n`,
          apres: `<span class="chapo">Quatre étapes, et chacune est un schéma que tu connais</span>
              <ol>
                <li><strong>Trier</strong> : descendre <code>L</code> en insérant chaque tête
                dans une liste triée — c'est le tri par insertion, et il tient en trois
                lignes.</li>
                <li><strong>Renverser</strong> pour passer du croissant au décroissant.</li>
                <li><strong>Prendre les trois premiers</strong> : trois descentes, en
                accumulant en tête.</li>
                <li><strong>Renverser à nouveau</strong>, puisque l'accumulation a inversé
                l'ordre.</li>
              </ol>
              Aucune de ces étapes n'est nouvelle. Un exercice de synthèse ne demande presque
              jamais une idée neuve : il demande de reconnaître, dans un énoncé, des gestes
              déjà pratiqués — et de les mettre dans le bon ordre.
            <p>Ce n'est évidemment pas la façon la plus économique de trouver trois maximums :
            on trie mille scores pour n'en garder que trois. À la séance 7, on saura dire
            précisément ce que cela coûte, et pourquoi ce n'est pas toujours grave.</p>`,
        },
      ],
    },
  ],
};

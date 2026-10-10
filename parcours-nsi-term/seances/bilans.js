/* Bilans de fin de partie — NSI Terminale, chapitre 1 « Listes, piles et files ».
 *
 * Une fiche par partie du manifeste (clé = id du palier). Ni exercice ni
 * correction : la liste de ce que l'élève doit savoir faire en sortant de la
 * partie, chaque savoir-faire illustré par quelques lignes de code.
 * Forme décrite dans docs/.Ressources/parcours-interactifs.md.
 *
 * Les exemples reprennent les mémos de séance et les conventions du chapitre :
 * tout en fonctions, snake_case, parcours itératifs.
 */

export default {

  /* ============================================== PARTIE 1 — SPÉCIFIER */
  specifier: {
    titre: "Spécifier avant de programmer",
    accroche: `Une structure se décrit par ce qu'elle sait faire, pas par la façon dont
      elle est faite. Voici ce que tu dois savoir faire avant d'aborder les piles et les files.`,

    sections: [
      {
        titre: "Interface et implémentation",
        seances: ["s01"],
        savoirs: [
          { sait: `distinguer l'<strong>interface</strong> (« qu'est-ce que ça sait faire ? »)
              de l'<strong>implémentation</strong> (« comment est-ce fait ? »)` },
          { sait: `écrire la <strong>spécification</strong> d'une opération dans une docstring :
              rôle, précondition, ce qui est renvoyé, ce qui est modifié`,
            code: `def deposer(t, montant):\n    """Ajoute montant au contenu de la tirelire t.\n\n    Precondition : montant est un nombre positif.\n    Effet : t est modifiee sur place. La fonction ne renvoie rien.\n    """` },
          { sait: "respecter la règle : une opération <strong>modifie</strong> ou elle <strong>renvoie</strong>, pas les deux" },
          { sait: "écrire plusieurs implémentations d'une même interface (« le total », « le relevé »…)" },
          { sait: `écrire un <strong>client</strong> qui n'utilise que l'interface, et qui
              fonctionne donc avec n'importe quelle implémentation`,
            code: `t = tirelire_vide()\ndeposer(t, 20)\nprint(solde(t))      # et jamais t[0]` },
        ],
        pieges: `<ul>
            <li>« ouvrir » la structure (<code>t[0]</code>, <code>len(t)</code>) : ça marche… jusqu'au changement d'implémentation ;</li>
            <li>une précondition s'adresse à l'<strong>appelant</strong> : c'est à lui de la vérifier ;</li>
            <li>l'interface promet un résultat, jamais un coût.</li>
          </ul>`,
      },
      {
        titre: "Les listes, un type abstrait",
        seances: ["s02"],
        savoirs: [
          { sait: "définir une liste : soit la liste vide, soit une <strong>tête</strong> suivie d'une <strong>queue</strong> qui est elle-même une liste" },
          { sait: "utiliser les cinq opérations, et connaître leurs préconditions",
            code: `vide()          # la liste vide\nest_vide(L)\ncons(e, L)      # nouvelle liste, e en tête\ncar(L)          # la tête — L non vide\ncdr(L)          # la queue — L non vide` },
          { sait: "parcourir une liste avec le schéma à connaître par cœur",
            code: `while not est_vide(L):\n    ...              # travailler avec car(L)\n    L = cdr(L)` },
          { sait: "construire une liste — elle sort dans l'ordre <strong>inverse</strong> de l'arrivée",
            code: `resultat = vide()\nwhile ...:\n    resultat = cons(..., resultat)` },
          { sait: `distinguer le type abstrait <strong>liste</strong> du <code>list</code> de
              Python, qui est un <strong>tableau</strong> dynamique` },
        ],
        pieges: `<ul>
            <li><code>car</code> rend un élément, <code>cdr</code> rend une liste : <code>L = car(L)</code> casse tout ;</li>
            <li>oublier <code>L = cdr(L)</code> : la boucle ne s'arrête jamais ;</li>
            <li><code>cons</code> ne modifie rien : sans affectation, il ne se passe rien.</li>
          </ul>`,
      },
    ],

    suite: `<strong>Le test qui tranche :</strong> « si je réécris entièrement l'intérieur de
      la structure, cette phrase reste-t-elle vraie ? » Si oui, elle appartient à l'interface.`,
  },

  /* ============================================== PARTIE 2 — LINÉAIRES */
  lineaires: {
    titre: "Les deux structures linéaires",
    accroche: `La pile et la file ont la même interface à quatre opérations, et un
      comportement opposé. Voici ce que tu dois savoir faire avant de comparer leurs implémentations.`,

    sections: [
      {
        titre: "Les piles (LIFO)",
        seances: ["s03"],
        savoirs: [
          { sait: "reconnaître une situation « dernier arrivé, premier servi » : annuler, revenir en arrière, parenthésage" },
          { sait: `utiliser les quatre opérations — <code>depiler</code> <strong>renvoie et
              retire</strong> le sommet`,
            code: `p = pile_vide()\nempiler(p, 3)\nempiler(p, 7)\nx = depiler(p)       # 7\nest_vide(p)          # False` },
          { sait: "consommer une pile",
            code: `while not est_vide(p):\n    x = depiler(p)\n    ...` },
          { sait: "parcourir une pile <strong>sans la détruire</strong> : deux transferts",
            code: `reserve = pile_vide()\nwhile not est_vide(p):\n    x = depiler(p)\n    ...\n    empiler(reserve, x)\nwhile not est_vide(reserve):\n    empiler(p, depiler(reserve))` },
          { sait: "écrire les implémentations « sommet en fin » et « sommet en tête », et dire laquelle coûte le plus cher" },
        ],
      },
      {
        titre: "Les files (FIFO)",
        seances: ["s04"],
        savoirs: [
          { sait: "utiliser <code>file_vide</code>, <code>est_vide</code>, <code>enfiler</code>, <code>defiler</code> : on entre derrière, on sort devant" },
          { sait: "parcourir une file en la restaurant : un aller, un retour — le transfert conserve l'ordre",
            code: `g = file_vide()\nwhile not est_vide(f):\n    x = defiler(f)\n    ...\n    enfiler(g, x)\nwhile not est_vide(g):\n    enfiler(f, defiler(g))` },
          { sait: "faire tourner une file de <code>k</code> crans",
            code: `for _ in range(k):\n    enfiler(f, defiler(f))` },
          { sait: `choisir : traiter dans l'ordre d'arrivée → <strong>file</strong> ; le plus
              récent d'abord → <strong>pile</strong>` },
        ],
        pieges: `<ul>
            <li><code>p = empiler(p, x)</code> ou <code>f = enfiler(f, x)</code> : ces opérations ne renvoient rien, la structure vaudrait <code>None</code> ;</li>
            <li>dépiler ou défiler sans avoir testé <code>est_vide</code> ;</li>
            <li>appliquer le truc de la pile à une file : défiler puis enfiler fait <strong>tourner</strong> la file ;</li>
            <li>utiliser <code>len(p)</code> ou <code>p[0]</code> dans un client.</li>
          </ul>`,
      },
    ],

    suite: `Pour suivre un programme à piles ou à files, dessine la structure à côté de
      chaque ligne, la sortie toujours du même côté : c'est ce qu'on attend à l'écrit du bac.`,
  },

  /* ======================================== PARTIE 3 — IMPLÉMENTATIONS */
  implementations: {
    titre: "Plusieurs implémentations",
    accroche: `Même interface, coûts très différents. Voici ce que tu dois savoir faire
      avant d'apprendre à choisir une structure.`,

    sections: [
      {
        titre: "Mesurer un coût",
        seances: ["s05"],
        savoirs: [
          { sait: "mesurer un coût en comptant les opérations élémentaires, plutôt qu'au chronomètre" },
          { sait: `nommer un coût selon ce qui arrive quand les données doublent : <strong>constant</strong>
              (rien ne change), <strong>linéaire</strong> (il double), <strong>quadratique</strong> (il quadruple)` },
          { sait: "expliquer un coût <strong>amorti</strong> : une opération parfois chère, mais constante en moyenne sur une longue suite" },
        ],
      },
      {
        titre: "La file, trois fois",
        seances: ["s05"],
        savoirs: [
          { sait: "dire pourquoi une file sur un tableau Python est coûteuse : <code>pop(0)</code> ou <code>insert(0, …)</code> décalent tout" },
          { sait: "écrire une file sur un <strong>tableau circulaire</strong> : rien ne bouge, ce sont les indices qui tournent",
            code: `# f[0] le tableau, f[1] l'indice du premier, f[2] le nombre d'éléments\nplace = (f[1] + f[2]) % capacite      # enfiler écrit ici\nf[1] = (f[1] + 1) % capacite          # defiler avance, après avoir lu` },
          { sait: "écrire une file avec <strong>deux piles</strong>, une d'entrée et une de sortie",
            code: `def defiler(f):\n    if pile_est_vide(f[1]):\n        while not pile_est_vide(f[0]):\n            empiler(f[1], depiler(f[0]))\n    return depiler(f[1])` },
        ],
        pieges: `<ul>
            <li>oublier le modulo : tout marche, jusqu'au jour où la file fait le tour ;</li>
            <li>avancer <code>premier</code> avant d'avoir lu l'élément ;</li>
            <li>se passer du compteur : file vide et file pleine deviennent indiscernables.</li>
          </ul>`,
      },
      {
        titre: "Les listes chaînées",
        seances: ["s06"],
        savoirs: [
          { sait: "représenter une chaîne : un maillon est <code>[valeur, suivant]</code>, la chaîne vide est <code>None</code>",
            code: `c = [12, [5, [32, None]]]` },
          { sait: "choisir la bonne boucle : tout visiter, ou s'arrêter sur le dernier maillon",
            code: `m = c\nwhile m is not None:        # visite tous les maillons\n    ...\n    m = m[1]\n\nm = c\nwhile m[1] is not None:     # s'arrête SUR le dernier\n    m = m[1]` },
          { sait: "ajouter en tête et insérer après un maillon connu, en temps constant",
            code: `m[1] = maillon(valeur, m[1])     # lit l'ancien m[1] avant de l'écraser` },
          { sait: "implémenter une pile chaînée, et une file chaînée à deux pointeurs (tête et queue)" },
          { sait: "comparer tableau et chaîne : lire le rang n est immédiat dans l'un, ajouter en tête l'est dans l'autre" },
        ],
        pieges: `<ul>
            <li>oublier <code>m = m[1]</code> : boucle infinie ;</li>
            <li>écraser une flèche avant de l'avoir lue : la fin de la chaîne est perdue ;</li>
            <li>oublier la chaîne vide : il n'y a alors aucun maillon à modifier ;</li>
            <li>croire qu'un maillon est copié : deux chaînes peuvent partager leur fin.</li>
          </ul>`,
      },
    ],

    suite: `Une interface ne promet aucun coût : c'est précisément ce qui permet de changer
      d'implémentation sans toucher à un seul client.`,
  },

  /* ============================================= PARTIE 4 — CHOISIR */
  choisir: {
    titre: "Choisir et appliquer",
    accroche: `Choisir la structure à partir des opérations dont un problème a besoin, puis
      s'en servir sur des exercices de type bac. Voici ce que tu dois savoir faire à la fin du chapitre.`,

    sections: [
      {
        titre: "Le dictionnaire",
        seances: ["s07"],
        savoirs: [
          { sait: `utiliser un dictionnaire comme type abstrait : on cherche par la
              <strong>clé</strong>, on obtient la <strong>valeur</strong> — jamais l'inverse`,
            code: `comptes = {}\nfor mot in mots:\n    if mot in comptes:\n        comptes[mot] = comptes[mot] + 1\n    else:\n        comptes[mot] = 1` },
          { sait: "comparer : une recherche séquentielle est linéaire, une recherche par clé est constante en moyenne" },
          { sait: `expliquer d'où vient cette vitesse : la clé donne une <strong>empreinte</strong>,
              le modulo la ramène à un <strong>seau</strong>, et l'on ne regarde que celui-là ;
              les <strong>collisions</strong> sont inévitables` },
        ],
        pieges: `Un dictionnaire ne promet <strong>aucun ordre</strong>, et il n'est rapide que
          dans un sens : chercher par la valeur reste un parcours.`,
      },
      {
        titre: "Choisir la bonne structure",
        seances: ["s07"],
        savoirs: [
          { sait: `se poser les quatre questions : dans quel <strong>ordre</strong> traite-t-on ?
              (arrivée → file, inverse → pile) Comment <strong>cherche</strong>-t-on ? (clé →
              dictionnaire, rang → tableau) Où <strong>ajoute</strong>-t-on ? (au milieu → chaînage)
              Le <strong>nombre</strong> d'éléments est-il fixe ?` },
          { sait: "justifier son choix par le coût des opérations dont le problème a besoin" },
        ],
      },
      {
        titre: "Piles et files au travail",
        seances: ["s08"],
        savoirs: [
          { sait: "évaluer une expression en notation polonaise inverse avec une pile — le premier dépilé est l'opérande de <strong>droite</strong>",
            code: `droite = depiler(p)\ngauche = depiler(p)\nempiler(p, gauche - droite)` },
          { sait: "écrire le tri crêpes du sujet zéro à partir de <code>hauteur</code>, <code>max_pile</code> et <code>retourner</code>",
            code: `for i in range(n, 1, -1):\n    profondeur = max_pile(p, i)\n    retourner(p, profondeur)\n    retourner(p, i)` },
          { sait: "simuler une file d'attente avec une file" },
          { sait: `parcourir un labyrinthe <strong>en profondeur</strong> avec une pile, et
              <strong>en largeur</strong> avec une file — c'est le parcours en largeur qui donne
              le plus court chemin (défis)` },
        ],
        pieges: `<ul>
            <li>inverser les opérandes : l'erreur ne se voit que sur <code>-</code> et <code>//</code> ;</li>
            <li>oublier <code>int(jeton)</code> : <code>"3" + "4"</code> vaut <code>"34"</code>, sans erreur.</li>
          </ul>`,
      },
    ],

    suite: `Le point commun de tous les usages de pile du chapitre : quelque chose
      <strong>attend</strong>, et c'est le plus récent qui sera traité en premier. Pour la
      file, c'est le plus ancien.`,
  },
};

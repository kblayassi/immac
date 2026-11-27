/* NSI Terminale — chapitre 1, séance 4 : les files.
 *
 * Interface symétrique de celle des piles : file_vide, est_vide, enfiler, defiler.
 * Le fil conducteur de la séance est le CONTRASTE avec la pile — mêmes valeurs,
 * mêmes schémas, résultats opposés — et le point de bascule est l'étape d6 :
 * défiler puis enfiler ne restaure pas la file, il la fait tourner.
 *
 * Deux implémentations nommées :
 *   - « entrée en fin »  : donnée dès la découverte, append / pop(0) ;
 *   - « entrée en tête » : écrite par l'élève en a1, insert(0) / pop().
 * Les DEUX sont coûteuses à une extrémité : c'est le problème que la séance 5
 * résoudra (tableau circulaire, puis deux piles). Ne PAS traiter ces deux
 * implémentations-là ici.
 *
 * Règles de rédaction : voir l'en-tête de s01.js.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "Les files : premier arrivé, premier servi",
  sousTitre: "Deux extrémités, et plus aucun de tes réflexes de pile",
  palier: "Partie 2 — Les deux structures linéaires",

  accroche: `À première vue, une file est une pile à l'envers : même nombre d'opérations,
    même pauvreté, même discipline. En pratique, presque tous les gestes appris à la
    séance 3 cessent de fonctionner — à commencer par celui qui permettait de regarder
    sans rien casser. C'est ce qui rend cette séance instructive.`,

  objectifs: [
    "reconnaître une situation <strong>FIFO</strong> et la nommer",
    "utiliser les quatre opérations <code>file_vide</code>, <code>est_vide</code>, <code>enfiler</code>, <code>defiler</code>",
    "savoir pourquoi un transfert de file <strong>conserve</strong> l'ordre, alors qu'un transfert de pile l'inverse",
    "choisir entre une pile et une file selon l'ordre de traitement demandé",
  ],

  motDeLaFin: `Tu sais enfiler, défiler, faire tourner une file et la parcourir sans la
    perdre. Il reste un problème sérieux, que tu auras repéré en chemin : quelle que soit
    l'implémentation par tableau que l'on choisit, l'une des deux opérations est ruineuse.
    C'est exactement le sujet de la séance 5.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "la même pauvreté que la pile, dans l'autre sens",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Premier arrivé, premier servi",
          contenu: `
            <p>La file d'attente d'une boulangerie. On se place <strong>derrière</strong>, on
            est servi <strong>devant</strong>, et personne ne double. C'est toute la
            structure.</p>

            <pre class="bloc-code"><code>              ┌────┬────┬────┐
   defiler ◀──│ 12 │  5 │ 32 │◀── enfiler
              └────┴────┴────┘
               le premier      le dernier
               arrivé          arrivé</code></pre>

            <div class="encadre">
              <span class="chapo">Définition</span>
              Une <strong>file</strong> est une structure linéaire dans laquelle les ajouts
              se font par une extrémité et les retraits par <strong>l'autre</strong>. Le
              premier élément entré est donc le premier à sortir : on dit qu'une file est
              <strong>FIFO</strong>, de l'anglais <em>First In, First Out</em>.
            </div>

            <p>Quatre opérations, exactement comme pour la pile :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>file_vide()</code></td><td>une file sans aucun élément</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>est_vide(f)</code></td><td><code>True</code> si <code>f</code> est vide</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>enfiler(f, element)</code></td><td>rien</td><td>aucune</td><td><code>element</code> se place en <strong>dernier</strong></td></tr>
              <tr><td><code>defiler(f)</code></td><td>le <strong>premier</strong> élément entré</td><td><code>f</code> n'est pas vide</td><td>cet élément quitte la file</td></tr>
            </table>
            </div>

            <p>Comme <code>depiler</code>, <code>defiler</code> fait deux choses à la fois :
            il rend un élément <strong>et</strong> le retire. Et comme pour la pile, il n'y a
            ni longueur, ni indice, ni moyen de regarder le troisième de la queue.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Pile</th><th>File</th></tr>
              <tr><td>On ajoute</td><td>au sommet</td><td>à la fin</td></tr>
              <tr><td>On retire</td><td>au sommet — <strong>la même extrémité</strong></td><td>au début — <strong>l'autre extrémité</strong></td></tr>
              <tr><td>Qui sort en premier</td><td>le dernier arrivé (LIFO)</td><td>le premier arrivé (FIFO)</td></tr>
              <tr><td>Effet d'un transfert</td><td>l'ordre est <strong>inversé</strong></td><td>l'ordre est <strong>conservé</strong></td></tr>
              <tr><td>L'image</td><td>une pile d'assiettes</td><td>la queue à la boulangerie</td></tr>
            </table>
            </div>

            <p>Retiens dès maintenant la quatrième ligne de ce tableau : c'est elle qui
            explique pourquoi presque tous les algorithmes de la séance 3 devront être
            repensés.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où en trouve-t-on, en vrai ?</span>
              <ul>
                <li>La <strong>file d'impression</strong> : les documents sortent dans
                l'ordre où ils ont été envoyés.</li>
                <li>Les <strong>requêtes</strong> reçues par un serveur web, traitées dans
                l'ordre d'arrivée.</li>
                <li>Le <strong>tampon</strong> d'une vidéo en ligne : les images arrivent
                d'un côté, se consomment de l'autre.</li>
                <li>Le <strong>parcours en largeur</strong> d'un graphe ou d'un labyrinthe —
                tu le verras au chapitre des graphes, et c'est une file qui le porte.</li>
              </ul>
              Le point commun : <em>l'équité</em>. Une file garantit que personne ne double,
              et donc que personne n'attend indéfiniment. Une pile, elle, peut laisser le
              premier arrivé au fond pour toujours.
            </div>`,
          libelleBouton: "Essayer sur du code →",
        },

        {
          id: "d2",
          type: "code",
          titre: "Se servir d'une file",
          contenu: `
            <p>Voici une implémentation des quatre opérations. On l'appellera
            <strong>« entrée en fin »</strong> : les nouveaux arrivants sont ajoutés à la
            <strong>dernière case</strong> du tableau, et l'on sert la case 0.</p>

            <p>Écris en dessous le programme qui enfile <strong>3</strong>, puis
            <strong>7</strong>, puis <strong>12</strong>, défile deux fois en affichant chaque
            valeur, puis annonce s'il reste quelque chose :</p>

            <pre class="bloc-code"><code>Je défile : 3
Je défile : 7
La file est vide : False</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Compare avec la séance 3</span>
              Ce sont exactement les trois mêmes valeurs, enfilées dans le même ordre que
              lorsque tu les empilais. Le résultat, lui, n'est pas du tout le même — et c'est
              tout l'intérêt de l'exercice.
            </div>`,
          nomFichier: "file.py",
          depart: `# ---- L'implémentation « entrée en fin ». Tu peux l'ignorer : c'est le but. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi : le programme qui se sert de la file. ----\n`,
          validation: {
            codeContient: [
              { motif: "(\\bfile_vide\\s*\\(\\s*\\)[\\s\\S]*?){2}",
                message: "Crée ta file en appelant file_vide()." },
              { motif: "(\\benfiler\\s*\\([\\s\\S]*?){4}",
                message: "Il faut trois arrivées : 3, puis 7, puis 12." },
              { motif: "(\\bdefiler\\s*\\([\\s\\S]*?){3}",
                message: "Il faut deux départs, et leurs valeurs doivent être affichées." },
              { motif: "\\best_vide\\s*\\([\\s\\S]*\\best_vide\\s*\\(",
                message: "La dernière ligne doit interroger est_vide(), pas répondre à sa place." },
            ],
            codeAbsent: [
              { motif: "\\bFalse\\b", message: "La réponse doit être calculée par est_vide(), pas écrite à la main." },
            ],
            sortie: "Je défile : 3\nJe défile : 7\nLa file est vide : False",
          },
          felicitation: "Premier entré, premier sorti : le 3 est ressorti avant le 7. 🥖",
          indices: [
            "Range d'abord le résultat de <code>file_vide()</code> dans une variable : c'est ta file.",
            "Chaque arrivée est un appel à <code>enfiler</code>, avec la file en premier argument et la valeur en second.",
            "Pour afficher une valeur défilée, passe directement l'appel à <code>defiler</code> à <code>print</code>, à côté du texte.",
          ],
          apres: `<span class="chapo">Le même programme, deux structures, deux résultats</span>
              <pre class="bloc-code"><code>on entre    3, 7, 12       3, 7, 12
structure   pile           file
on sort     12, puis 7     3, puis 7
il reste    3              12</code></pre>
              Pas une ligne du programme client ne change entre les deux : seules les quatre
              fonctions du haut ont été remplacées. C'est la même interface — quatre
              opérations, mêmes noms de rôle — et pourtant ce n'est pas le même
              <strong>contrat</strong> : <code>depiler</code> promettait le dernier arrivé,
              <code>defiler</code> promet le premier.
              <br><br>
              Deux structures distinctes ne se reconnaissent donc pas au nombre de leurs
              opérations, mais à ce que ces opérations promettent. C'est ce que le programme
              officiel appelle « distinguer des structures par le jeu des méthodes qui les
              caractérisent ».`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Suis la file à la trace",
          contenu: `
            <p>Sans rien exécuter, suis ce programme ligne à ligne. L'implémentation est
            « entrée en fin », donc afficher la file montre le <strong>premier à gauche</strong>
            et le <strong>dernier arrivé à droite</strong>.</p>`,
          code: `f = file_vide()\nenfiler(f, 67)\nenfiler(f, 34)\nenfiler(f, 78)\na = defiler(f)\nenfiler(f, 23)\n\nprint(a)\nprint(f)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>67</code> puis <code>[34, 78, 23]</code>", correct: true,
              explication: "Oui. Le 67 était arrivé en premier, il sort en premier. Le 23, enfilé ensuite, se place au bout de la queue — donc à droite." },
            { texte: "<code>78</code> puis <code>[67, 34, 23]</code>",
              explication: "C'est ce qu'on obtiendrait avec une <em>pile</em>, qui sert le dernier arrivé. Une file sert le premier." },
            { texte: "<code>67</code> puis <code>[67, 34, 78, 23]</code>",
              explication: "Le 67 est bien celui qui sort, mais il ne peut pas être resté : <code>defiler</code> rend le premier <strong>et</strong> le retire." },
            { texte: "<code>67</code> puis <code>[23, 34, 78]</code>",
              explication: "Ce serait le cas si <code>enfiler</code> ajoutait au début du tableau. Dans cette implémentation, les arrivants se placent à la fin." },
          ],
          apres: `<span class="chapo">Le réflexe à prendre</span>
            Comme pour la pile : dessine la file à côté de chaque ligne, avec la sortie
            toujours du même côté. Une flèche « ← sort » à gauche et une flèche « entre ← » à
            droite évitent l'essentiel des erreurs de copie à l'écrit du baccalauréat.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Servir tout le monde",
          contenu: `
            <p>Écris <code>tout_afficher(f)</code> : elle affiche tous les éléments de la
            file, <strong>dans l'ordre où ils sont servis</strong>, un par ligne.</p>

            <p>Le programme d'essai, en bas, fait arriver trois clients et appelle ta
            fonction. Il doit afficher :</p>

            <pre class="bloc-code"><code>client 1
client 2
client 3</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Oui, la file sera vide à la fin</span>
              C'est inévitable pour l'instant : la seule façon de voir un élément est de le
              défiler. Deux étapes plus loin, on verra comment lire une file sans la
              détruire.
            </div>`,
          nomFichier: "servir.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef tout_afficher(f):\n    """Affiche les elements de f dans l'ordre ou ils sont servis, un par ligne."""\n    pass\n\n\n# ---- Le programme d'essai. Ne le modifie pas. ----\nguichet = file_vide()\nenfiler(guichet, "client 1")\nenfiler(guichet, "client 2")\nenfiler(guichet, "client 3")\ntout_afficher(guichet)\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par defiler() : un client ne connaît pas la forme de la file." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface de la file." },
            ],
            sortie: "client 1\nclient 2\nclient 3",
            tests: `g = file_vide()\nenfiler(g, 1)\nenfiler(g, 2)\ntout_afficher(g)\nassert est_vide(g), "tout_afficher() défile tout : la file doit être vide à la fin."\nh = file_vide()\ntout_afficher(h)\nassert est_vide(h), "Sur une file déjà vide, la fonction ne doit rien afficher — et surtout pas planter."`,
          },
          felicitation: "Le schéma de parcours d'une file est en place, et il ressemble beaucoup à celui de la pile. 🔁",
          indices: [
            "La condition de la boucle est « tant que la file n'est pas vide » : <code>est_vide</code> répond exactement à cette question.",
            "À chaque tour, un seul geste : retirer le premier et l'afficher.",
            "Comme pour la pile, il n'y a pas de ligne « passer au suivant » : c'est <code>defiler</code> qui fait avancer la boucle, puisqu'il retire un élément.",
          ],
          apres: `<p>Mot pour mot la même fonction que celle de la séance 3 — seuls les noms
            <code>est_vide</code> et <code>defiler</code> ont changé. Et pourtant l'affichage
            est dans l'<strong>ordre d'arrivée</strong>, alors que la pile donnait l'ordre
            inverse.</p>
            <p>C'est la première illustration de la règle qui va organiser toute la séance :
            <strong>le code ne dit pas l'ordre ; c'est la structure qui le dit.</strong> Deux
            programmes identiques, deux résultats opposés, parce que le contrat des quatre
            opérations n'est pas le même.</p>`,
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Pile ou file ?",
          contenu: `
            <p>Quatre situations. Dans trois d'entre elles, il faut traiter en premier
            l'élément arrivé en <strong>dernier</strong> ; dans une seule, celui arrivé en
            <strong>premier</strong>.</p>`,
          question: "Laquelle demande une file ?",
          options: [
            { texte: "Les documents envoyés à une imprimante partagée par toute la classe.", correct: true,
              explication: "Oui. Le premier document envoyé doit sortir en premier : c'est une exigence d'équité, et donc une file. Avec une pile, celui qui a lancé son impression le premier pourrait attendre indéfiniment." },
            { texte: "Le bouton Annuler d'un traitement de texte.",
              explication: "On annule toujours l'action la <em>plus récente</em> : dernier arrivé, premier servi. C'est une pile — tu l'as écrite à la séance 3." },
            { texte: "La vérification des parenthèses d'une formule mathématique.",
              explication: "Une fermante correspond toujours à l'ouvrante la plus récemment rencontrée. C'est une pile, et c'était l'exercice 6 de la séance 3." },
            { texte: "Revenir sur ses pas dans un labyrinthe quand on tombe sur un cul-de-sac.",
              explication: "On repart du dernier carrefour visité, pas du premier. C'est une pile — et c'est exactement ce que fait un parcours en profondeur." },
          ],
          apres: `<span class="chapo">La question à se poser, et elle suffit</span>
            <em>Dans quel ordre les éléments doivent-ils être traités ?</em>
            <ul>
              <li>« le plus récent d'abord », « revenir en arrière », « annuler », « ce qui
              était en attente le plus récemment » → <strong>pile</strong> ;</li>
              <li>« dans l'ordre d'arrivée », « chacun son tour », « sans que personne ne
              double » → <strong>file</strong>.</li>
            </ul>
            Ce n'est pas une question de commodité de programmation : c'est une décision de
            <em>modélisation</em>, et elle se prend avant d'écrire la première ligne. Le
            programme officiel la nomme « choisir une structure de données adaptée à la
            situation à modéliser » — et c'est très exactement ce qu'on vient de faire.`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Le tour de passe-passe qui ne marche plus",
          contenu: `
            <p>À la séance 3, pour regarder le sommet d'une pile sans le perdre, il suffisait
            de dépiler puis de ré-empiler : deux lignes, et la pile ressortait intacte.</p>
            <p>Essayons la même chose avec une file.</p>`,
          code: `f = file_vide()\nenfiler(f, "a")\nenfiler(f, "b")\nenfiler(f, "c")\n\nx = defiler(f)\nenfiler(f, x)\n\nprint(x)\nprint(f)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>a</code> puis <code>['b', 'c', 'a']</code>", correct: true,
              explication: "Oui. Le <code>a</code> est bien lu, mais en le remettant on l'a envoyé <strong>à l'autre bout</strong> : la file a tourné d'un cran. Elle n'est pas restaurée." },
            { texte: "<code>a</code> puis <code>['a', 'b', 'c']</code>",
              explication: "Ce serait le cas avec une pile, où l'on entre et sort par la même extrémité. Dans une file, on sort devant et on entre derrière : ce qui ressort ne peut pas revenir à sa place." },
            { texte: "<code>c</code> puis <code>['a', 'b', 'c']</code>",
              explication: "<code>defiler</code> rend le premier arrivé, donc le <code>a</code>. Le <code>c</code> est le dernier de la queue." },
            { texte: "<code>a</code> puis <code>['b', 'c']</code>",
              explication: "Le <code>a</code> a bien été remis dans la file par <code>enfiler</code> : il n'est pas perdu, il a seulement changé de place." },
          ],
          apres: `<span class="chapo">Ce que la pile permettait et que la file interdit</span>
              <pre class="bloc-code"><code>PILE :  depiler puis empiler  →  identique
FILE :  defiler puis enfiler  →  la file a TOURNÉ d'un cran</code></pre>
              La différence tient en une phrase : dans une pile, l'entrée et la sortie sont la
              <strong>même</strong> extrémité ; dans une file, ce sont deux extrémités
              opposées. Remettre un élément par où il n'est pas sorti le place à l'autre bout.
            <p>Ce n'est pas seulement une gêne, c'est aussi une possibilité : tu viens de
            découvrir qu'une file peut <strong>tourner</strong>, à très bas prix. On s'en
            servira à l'étape 8, puis dans un jeu entier en défi.</p>
            <p>Mais pour l'instant, il faut régler le problème : comment lire le premier
            élément d'une file <em>et</em> la retrouver intacte ? C'est l'étape suivante.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Regarder sans déranger",
          contenu: `
            <p><code>premier(f)</code> renvoie le premier élément de la file —
            celui qui sera servi — <strong>sans modifier la file</strong> : après l'appel,
            elle doit être exactement dans l'état où on l'a trouvée.</p>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>f</code> n'est pas vide.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une bonne nouvelle, pour une fois</span>
              Il te faudra une file auxiliaire, et tout y transférer. Mais souviens-toi du
              tableau de l'étape 1 : un transfert de file à file <strong>conserve</strong>
              l'ordre. Là où la pile exigeait deux transferts pour se retrouver à l'endroit,
              un seul aller et un seul retour suffiront ici.
            </div>`,
          nomFichier: "premier.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef premier(f):\n    """Renvoie le premier element de f, celui qui sera servi, sans le retirer.\n\n    Precondition : f n'est pas vide.\n    Effet : f est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface : un client ne connaît pas la forme de la file." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface de la file." },
            ],
            tests: `f = file_vide()\nenfiler(f, 5)\nenfiler(f, 8)\nenfiler(f, 2)\nassert premier(f) == 5, "Le premier arrivé est le premier servi."\nassert premier(f) == 5, "Deux appels de suite doivent rendre la même valeur : premier() ne consomme rien."\nassert defiler(f) == 5, "Après premier(), le 5 doit toujours être en tête."\nassert defiler(f) == 8, "Et l'ordre du reste doit être préservé."\nassert defiler(f) == 2, "..."\nassert est_vide(f), "La file ne contenait que ces trois éléments."\ng = file_vide()\nenfiler(g, "seul")\nassert premier(g) == "seul", "Sur une file d'un seul élément, rien ne doit se perdre."\nassert premier(g) == "seul", "Ni au second appel."\nassert defiler(g) == "seul", "..."\nh = file_vide()\nfor v in range(30):\n    enfiler(h, v)\nassert premier(h) == 0, "Le tout premier enfilé reste en tête."\nassert defiler(h) == 0, "Et la file de trente éléments doit être intacte."\nassert defiler(h) == 1, "Dans le bon ordre."`,
          },
          felicitation: "Un seul aller-retour, et la file ressort intacte. 👀",
          indices: [
            "Commence par défiler le premier élément et le ranger dans une variable : c'est la valeur que tu renverras.",
            "Il te faut ensuite une file auxiliaire, dans laquelle tu déposeras cette valeur puis tout le reste de <code>f</code> — dans l'ordre.",
            "Une seconde boucle vide l'auxiliaire dans <code>f</code>. Puisqu'un transfert conserve l'ordre, <code>f</code> se retrouve exactement comme avant.",
          ],
          apres: `<span class="chapo">Le transfert, et pourquoi il se compte différemment</span>
              <pre class="bloc-code"><code>PILE   p → q  : l'ordre est INVERSÉ
              il faut DEUX transferts pour restaurer

FILE   f → g  : l'ordre est CONSERVÉ
              UN transfert aller, UN retour, et c'est réglé</code></pre>
              La raison tient en une ligne : dans une pile, on sort par où l'on entre, donc le
              premier sorti devient le dernier entré ailleurs. Dans une file, on sort par
              devant et l'on entre par derrière — les rangs sont préservés.
              <br><br>
              Une file est donc, à ce jeu-là, <em>plus</em> commode qu'une pile : deux boucles
              au lieu de deux boucles, mais sans avoir à réfléchir à la parité des
              renversements.
            <p>Le prix reste le même, en revanche, et il faut le connaître : lire un seul
            élément a coûté un parcours complet de la file, deux fois. Une structure qui
            n'expose qu'une extrémité fait payer très cher tout ce qui n'est pas cette
            extrémité — c'est vrai des piles comme des files.</p>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Faire tourner la file",
          contenu: `
            <p>Tu as vu à l'étape 6 que défiler puis enfiler fait <strong>tourner</strong> la
            file d'un cran. Transformons ce défaut en outil.</p>

            <p><code>faire_tourner(f, k)</code> envoie les <code>k</code> premiers éléments à
            la fin de la file, un par un, sans rien perdre.</p>

            <pre class="bloc-code"><code>f vaut, du premier au dernier :  [1, 2, 3, 4]
faire_tourner(f, 1)   →  [2, 3, 4, 1]
faire_tourner(f, 2)   →  [3, 4, 1, 2]   (depuis [1, 2, 3, 4])</code></pre>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>f</code> contient au moins un élément dès que <code>k</code> est non nul.
              La fonction ne renvoie rien : elle modifie la file.
            </div>`,
          nomFichier: "tourner.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef faire_tourner(f, k):\n    """Envoie les k premiers elements de f a la fin, un par un.\n\n    Precondition : f n'est pas vide des que k est non nul.\n    Effet : f est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
            ],
            tests: `f = file_vide()\nfor v in [1, 2, 3, 4]:\n    enfiler(f, v)\nfaire_tourner(f, 1)\nassert defiler(f) == 2, "Après un cran, c'est le 2 qui est devant."\nassert defiler(f) == 3, "Puis le 3."\nassert defiler(f) == 4, "Puis le 4."\nassert defiler(f) == 1, "Et le 1, parti à la fin, sort en dernier."\nassert est_vide(f), "Aucun élément ne doit se perdre en chemin."\ng = file_vide()\nfor v in [1, 2, 3, 4]:\n    enfiler(g, v)\nfaire_tourner(g, 2)\nassert defiler(g) == 3, "Après deux crans, c'est le 3 qui est devant."\nassert defiler(g) == 4, "Puis le 4."\nassert defiler(g) == 1, "Puis le 1."\nassert defiler(g) == 2, "Et enfin le 2."\nh = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(h, v)\nfaire_tourner(h, 0)\nassert defiler(h) == 1, "Tourner de zéro cran ne change rien."\nk = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(k, v)\nfaire_tourner(k, 3)\nassert defiler(k) == 1, "Un tour complet ramène la file dans son état initial."\nassert defiler(k) == 2, "Puis le 2."\nassert defiler(k) == 3, "Puis le 3."\nassert est_vide(k), "Et rien ne s'est perdu."`,
          },
          felicitation: "Trois lignes, et ta file tourne en rond. 🎠",
          indices: [
            "Tu sais combien de crans faire : une boucle <code>for</code> convient mieux qu'un <code>while</code>.",
            "Un cran, c'est exactement ce que tu as vu à l'étape 6 : défiler, puis enfiler la valeur obtenue.",
            "Les deux opérations peuvent s'écrire sur une seule ligne, l'une à l'intérieur de l'autre. La variable de boucle ne sert à rien : <code>_</code> convient.",
          ],
          apres: `<span class="chapo">Une file se prête à la ronde, une pile non</span>
              Faire tourner une file coûte <code>k</code> opérations élémentaires, et rien de
              plus : aucune structure auxiliaire, aucun parcours complet. C'est le seul geste
              de la séance qui soit réellement bon marché.
              <br><br>
              Essaie de faire tourner une pile pour voir : mettre le sommet au fond suppose
              de vider entièrement la pile, deux fois. Là où la file est naturellement
              circulaire, la pile est irrémédiablement linéaire.
            <p>Retiens cette fonction : c'est elle qui porte tous les problèmes de
            <strong>rondes</strong> et d'<strong>éliminations en cercle</strong> — les enfants
            qui se passent un objet en chantant, les tours de parole, les tournois. Tu en
            programmeras un en défi.</p>`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Rôle</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>file_vide()</code></td><td>une file neuve</td><td>—</td><td>—</td></tr>
              <tr><td><code>est_vide(f)</code></td><td>f est-elle vide ?</td><td>—</td><td>—</td></tr>
              <tr><td><code>enfiler(f, e)</code></td><td>place <code>e</code> en dernier</td><td>—</td><td>f grandit</td></tr>
              <tr><td><code>defiler(f)</code></td><td>rend le premier arrivé</td><td><code>not est_vide(f)</code></td><td>f rétrécit</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">Les trois schémas de la séance</span>
              <pre class="bloc-code"><code># 1. consommer la file
while not est_vide(f):
    x = defiler(f)
    ...

# 2. la parcourir en la restaurant
g = file_vide()
while not est_vide(f):
    x = defiler(f)
    ...
    enfiler(g, x)
while not est_vide(g):
    enfiler(f, defiler(g))

# 3. la faire tourner de k crans
for _ in range(k):
    enfiler(f, defiler(f))</code></pre>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pile et file : ce qui change vraiment</span>
              <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th></th><th>Pile</th><th>File</th></tr>
                <tr><td>Lire l'élément accessible sans le perdre</td><td>dépiler puis rempiler — 2 lignes</td><td><strong>impossible en 2 lignes</strong> : il faut tout transférer</td></tr>
                <tr><td>Un transfert vers une structure de même nature</td><td>inverse l'ordre</td><td>conserve l'ordre</td></tr>
                <tr><td>Restaurer après un parcours</td><td>2 transferts</td><td>1 aller, 1 retour</td></tr>
                <tr><td>Faire tourner</td><td>très coûteux</td><td><strong>k opérations</strong></td></tr>
                <tr><td>Inverser l'ordre des éléments</td><td>gratuit, c'est sa nature</td><td>impossible seule — il faut une pile</td></tr>
              </table>
              </div>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Appliquer le truc de la pile.</strong> <code>defiler</code> puis
                <code>enfiler</code> ne restaure rien : la file a tourné.</li>
                <li><strong>Écrire <code>f = enfiler(f, x)</code>.</strong>
                <code>enfiler</code> ne renvoie rien : <code>f</code> vaudrait
                <code>None</code>.</li>
                <li><strong>Confondre les deux extrémités.</strong> On entre derrière, on sort
                devant — et l'implémentation choisie n'y change rien.</li>
                <li><strong>Défiler sans avoir vérifié.</strong> La précondition s'adresse à
                l'appelant : <code>est_vide</code> d'abord, toujours.</li>
                <li><strong>Utiliser <code>len(f)</code> ou <code>f[0]</code>.</strong> Cela
                marche avec l'implémentation « entrée en fin », et cassera avec la suivante —
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
      intention: "une deuxième implémentation, et des files au travail",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Deuxième implémentation : entrée en tête",
          contenu: `
            <p>Même interface, autre intérieur. Dans cette implémentation, que l'on appellera
            <strong>« entrée en tête »</strong>, les arrivants sont insérés à la
            <strong>case 0</strong>, et l'on sert la <strong>dernière</strong> case.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>La file où sont arrivés 5 puis 8</th><th>« entrée en fin »</th><th>« entrée en tête »</th></tr>
              <tr><td>s'écrit</td><td><code>[5, 8]</code></td><td><code>[8, 5]</code></td></tr>
              <tr><td>le prochain servi est</td><td>la case 0</td><td>la dernière case</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Rappel des deux méthodes</span>
              <code>ma_liste.insert(0, valeur)</code> insère au début, en décalant tout le
              reste ; elle ne renvoie rien. <code>ma_liste.pop()</code>, sans argument, retire
              la <strong>dernière</strong> case et renvoie sa valeur.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'épreuve</span>
              <strong>✓ Valider</strong> fera tourner sur ton implémentation une fonction
              cliente rédigée pour l'<em>autre</em>, sans en changer une ligne.
            </div>`,
          nomFichier: "file_tete.py",
          depart: `# Deuxième implémentation de la file : « entrée en tête ».\n\ndef file_vide():\n    pass\n\ndef est_vide(f):\n    pass\n\ndef enfiler(f, element):\n    pass\n\ndef defiler(f):\n    pass\n`,
          validation: {
            tests: `f = file_vide()\nassert f == [], "Une file neuve est un tableau vide."\nassert est_vide(f) == True, "est_vide() doit reconnaître la file vide."\nenfiler(f, 5)\nassert f == [5], "Un seul élément : il est à la fois le premier et le dernier."\nenfiler(f, 8)\nassert f == [8, 5], "Les arrivants entrent par la case 0 : le 8 passe DEVANT le 5 dans le tableau."\nassert est_vide(f) == False, "Une file de deux éléments n'est pas vide."\nassert defiler(f) == 5, "defiler() rend le premier ARRIVÉ, donc le 5."\nassert f == [8], "Et il doit l'avoir retiré du tableau."\nassert defiler(f) == 8, "Il ne restait que le 8."\nassert est_vide(f) == True, "La file est vide."\ndef premier(f):\n    resultat = defiler(f)\n    auxiliaire = file_vide()\n    enfiler(auxiliaire, resultat)\n    while not est_vide(f):\n        enfiler(auxiliaire, defiler(f))\n    while not est_vide(auxiliaire):\n        enfiler(f, defiler(auxiliaire))\n    return resultat\ng = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(g, v)\nassert premier(g) == 1, "Un client écrit pour l'implémentation « entrée en fin » doit fonctionner ici sans une retouche."\nassert defiler(g) == 1, "Et il doit avoir laissé la file intacte."\nassert defiler(g) == 2, "Dans le bon ordre."\nassert defiler(g) == 3, "..."`,
          },
          felicitation: "Deux implémentations, un seul contrat. Le client n'y voit que du feu. 🎯",
          indices: [
            "<code>file_vide</code> et <code>est_vide</code> ne changent pas : dans les deux implémentations, la file vide est le tableau vide.",
            "<code>enfiler</code> doit faire entrer le nouvel arrivant par la case 0, et <code>defiler</code> doit servir celui qui est tout au bout — c'est-à-dire le plus ancien.",
            "Les deux méthodes rappelées dans l'énoncé font exactement cela. Attention à bien renvoyer la valeur dans <code>defiler</code>, et à ne rien renvoyer dans <code>enfiler</code>.",
          ],
          apres: `<p>Le tableau interne est écrit dans l'autre sens, le client n'a pas bougé
            d'un caractère, et le résultat est le même. Tu commences à avoir l'habitude.</p>
            <p>Reste la question qui compte, et pour les files, elle réserve une mauvaise
            surprise.</p>`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Le problème que les deux implémentations partagent",
          contenu: `
            <p>Une file contient <strong>10 000</strong> éléments. Rappel des deux
            implémentations :</p>
            <pre class="bloc-code"><code># « entrée en fin »            # « entrée en tête »
def enfiler(f, element):       def enfiler(f, element):
    f.append(element)              f.insert(0, element)

def defiler(f):                def defiler(f):
    return f.pop(0)                return f.pop()</code></pre>
            <p>Souviens-toi qu'un tableau Python est une zone de mémoire d'un seul tenant :
            insérer ou retirer une case ailleurs qu'à la fin oblige à décaler tout ce qui
            suit.</p>`,
          question: "Laquelle des deux est efficace ?",
          options: [
            { texte: "Aucune des deux : chacune a une opération qui décale les 10 000 cases.", correct: true,
              explication: "Exactement. « Entrée en fin » enfile pour rien du tout, mais <code>pop(0)</code> décale tout. « Entrée en tête » défile pour rien, mais <code>insert(0, …)</code> décale tout. Le problème n'est pas le choix : il est dans le tableau lui-même." },
            { texte: "« entrée en fin », parce que <code>append</code> ne coûte rien.",
              explication: "<code>append</code> ne coûte rien, c'est vrai — mais <code>pop(0)</code>, lui, recolle les 9 999 cases restantes à chaque client servi." },
            { texte: "« entrée en tête », parce que <code>pop()</code> ne coûte rien.",
              explication: "Même raisonnement à l'envers : <code>pop()</code> est immédiat, mais <code>insert(0, …)</code> décale les 10 000 cases à chaque arrivée." },
            { texte: "Les deux, à condition de ne pas dépasser quelques centaines d'éléments.",
              explication: "C'est la conclusion pratique, et elle n'est pas fausse. Mais la question portait sur l'efficacité, et l'une des deux opérations reste proportionnelle au nombre d'éléments dans les deux cas." },
          ],
          apres: `<span class="chapo">Une structure à deux bouts sur un tableau à un bout</span>
            Une pile n'utilise qu'une extrémité : il suffit de choisir la bonne — la fin — et
            tout devient immédiat. Une file en utilise <strong>deux</strong>, et un tableau
            Python n'en a qu'une de bon marché. Quel que soit le sens choisi, l'autre
            extrémité coûte cher.
            <br><br>
            Ce n'est donc pas un défaut d'implémentation : c'est une <strong>inadéquation
            entre la structure voulue et le support choisi</strong>. Il existe deux façons de
            s'en sortir, et aucune n'est évidente : faire tourner les indices dans un tableau
            de taille fixe, ou bâtir la file sur <em>deux piles</em>. Les deux sont au
            programme de la séance 5, et c'est même l'exemple que le programme officiel cite
            nommément.
            <br><br>
            En attendant, l'implémentation « entrée en fin » restera la nôtre : elle est la
            plus lisible, et nos files d'exercice sont courtes.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : une file qui n'en est pas une",
          contenu: `
            <p>Ce fichier contient <strong>trois erreurs de natures différentes</strong> :</p>
            <ul>
              <li>une que Python refuse d'exécuter ;</li>
              <li>une qui transforme la file en pile, sans le moindre message ;</li>
              <li>une dans la fonction cliente du bas, qui rend les deux valeurs dans le
              mauvais ordre.</li>
            </ul>
            <p>Répare les trois sans changer les noms ni les signatures.</p>`,
          nomFichier: "file_cassee.py",
          depart: `def file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element)\n    f.append(element)\n\ndef defiler(f):\n    return f.pop()\n\n\ndef deux_premiers(f):\n    """Renvoie le tableau des deux premiers elements servis, dans l'ordre."""\n    a = defiler(f)\n    b = defiler(f)\n    return [b, a]\n`,
          validation: {
            tests: `f = file_vide()\nassert est_vide(f) == True, "Une file neuve est vide."\nenfiler(f, 5)\nenfiler(f, 8)\nassert est_vide(f) == False, "Deux éléments : la file n'est pas vide."\nassert defiler(f) == 5, "Une FILE sert le premier arrivé. Si tu obtiens 8, c'est que defiler() retire du mauvais côté."\nassert defiler(f) == 8, "Puis le suivant."\nassert est_vide(f) == True, "..."\ng = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(g, v)\nassert deux_premiers(g) == [1, 2], "Les deux premiers servis sont 1 puis 2, et le tableau doit les rendre dans cet ordre."\nassert defiler(g) == 3, "Le troisième doit être resté dans la file."\nh = file_vide()\nfor v in ["a", "b", "c", "d"]:\n    enfiler(h, v)\nassert deux_premiers(h) == ["a", "b"], "Même exigence avec des chaînes."`,
          },
          felicitation: "Trois bugs, trois natures — et le deuxième change la structure elle-même. 🐛",
          indices: [
            "Exécute d'abord avec <strong>▶</strong> et lis le message : Python refuse le fichier entier tant qu'il ne parvient pas à le lire, et il indique la ligne.",
            "Dans <code>defiler</code>, demande-toi de quel côté on sert : une file sert le plus ancien, donc celui qui est arrivé le premier dans le tableau.",
            "Dans <code>deux_premiers</code>, relis la docstring : dans quel ordre les deux valeurs doivent-elles figurer dans le tableau renvoyé ?",
          ],
          apres: `<span class="chapo">Le deuxième bug est le plus grave de tout le chapitre</span>
              <code>f.pop()</code> au lieu de <code>f.pop(0)</code> : un seul caractère. Le
              programme continue de tourner, aucune erreur n'est levée, toutes les fonctions
              clientes s'exécutent — et la structure n'est plus une file. C'est une
              <strong>pile</strong> portant le nom d'une file.
              <br><br>
              Dans un vrai programme, cela signifierait que le dernier client arrivé est servi
              en premier, indéfiniment, et que le premier de la queue n'est jamais servi. Le
              logiciel « fonctionne » ; c'est le comportement qui est faux, et il faudra des
              jours pour s'en apercevoir.
              <br><br>
              Retiens-en la règle : <strong>c'est la spécification qui définit la structure,
              pas le nom des fonctions.</strong> Écrire <code>file_vide</code> en haut d'un
              fichier ne garantit rien du tout — seuls les tests le garantissent.
            <p>Note au passage que <code>deux_premiers</code> est correcte dans la solution :
            <code>a</code> est servi en premier, <code>b</code> ensuite, et le tableau doit
            donc contenir <code>[a, b]</code>. Si tu as écrit <code>[b, a]</code>, relis la
            docstring une deuxième fois — c'est précisément l'écart entre ce qui est promis et
            ce qui est fait.</p>`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Aller et retour avec les tableaux",
          contenu: `
            <p>Deux fonctions clientes, pour rendre tes files lisibles pendant la mise au
            point.</p>
            <ul>
              <li><code>depuis_tableau(t)</code> renvoie une file où les éléments de
              <code>t</code> sont arrivés dans l'ordre — le premier du tableau sera donc servi
              en premier ;</li>
              <li><code>vers_tableau(f)</code> renvoie le tableau des éléments de
              <code>f</code>, <strong>dans l'ordre de service</strong>, en laissant la file
              intacte.</li>
            </ul>
            <pre class="bloc-code"><code>vers_tableau(depuis_tableau([5, 8, 2]))  →  [5, 8, 2]</code></pre>`,
          nomFichier: "conversions.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef depuis_tableau(t):\n    """Renvoie une file ou les elements de t sont arrives dans l'ordre."""\n    pass\n\ndef vers_tableau(f):\n    """Renvoie le tableau des elements de f, dans l'ordre de service.\n\n    Effet : f est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface : un client ne connaît pas la forme de la file." },
            ],
            tests: `f = depuis_tableau([5, 8, 2])\nassert defiler(f) == 5, "Le premier élément du tableau doit être servi en premier."\ng = depuis_tableau([5, 8, 2])\nassert vers_tableau(g) == [5, 8, 2], "vers_tableau() rend les éléments dans l'ordre de service."\nassert vers_tableau(g) == [5, 8, 2], "Deux appels de suite doivent donner le même résultat : la file est restaurée."\nassert defiler(g) == 5, "Après vers_tableau(), le premier servi est toujours le 5."\nassert defiler(g) == 8, "Et l'ordre du reste est préservé."\nassert vers_tableau(file_vide()) == [], "Une file vide donne un tableau vide."\nh = depuis_tableau([])\nassert est_vide(h), "Un tableau vide donne une file vide."\nk = depuis_tableau(["a", "b"])\nassert vers_tableau(k) == ["a", "b"], "Les deux fonctions doivent être l'inverse l'une de l'autre."\nassert defiler(k) == "a", "Et k doit être intacte après vers_tableau()."`,
          },
          felicitation: "Tes files sont enfin lisibles d'un coup d'œil. 👀",
          indices: [
            "<code>depuis_tableau</code> est la plus simple : une file neuve, puis une boucle qui enfile chaque élément dans l'ordre de lecture.",
            "Pour <code>vers_tableau</code>, reprends le schéma de l'étape 7 : un transfert aller vers une file auxiliaire, un transfert retour.",
            "Reste à choisir pendant lequel des deux transferts remplir le tableau. Comme un transfert conserve l'ordre, les deux conviennent ici — contrairement à ce qui se passait avec les piles.",
          ],
          apres: `<span class="chapo">Une différence avec la version « pile », et elle est instructive</span>
              Dans <code>vers_tableau</code> pour les piles, la ligne de travail devait
              impérativement se trouver dans le <strong>second</strong> transfert : c'était le
              seul endroit où les éléments défilaient du fond vers le sommet.
              <br><br>
              Ici, les deux transferts conservent l'ordre : la ligne de travail peut être dans
              l'un ou dans l'autre indifféremment. Une contrainte de moins — et c'est la
              conséquence directe de la ligne « effet d'un transfert » du tableau
              comparatif.
            <p>Garde <code>vers_tableau</code> sous la main : dans tous les exercices qui
            suivent, si un résultat te surprend, la recopier et afficher
            <code>vers_tableau(f)</code> vaut mieux que dix minutes de raisonnement.</p>`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Combien de clients attendent ?",
          contenu: `
            <p><code>longueur(f)</code> renvoie le nombre d'éléments de la file, et la laisse
            <strong>intacte</strong>.</p>
            <p>C'est le jumeau exact de <code>hauteur</code>, écrite pour les piles à la
            séance 3 — avec un transfert de moins, puisqu'une file n'a pas besoin d'être
            renversée deux fois.</p>`,
          nomFichier: "longueur.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef longueur(f):\n    """Renvoie le nombre d'elements de la file f.\n\n    Effet : f est inchangee apres l'appel.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
              { motif: "\\blen\\s*\\(", message: "len() ne fait pas partie de l'interface — et c'est justement tout l'exercice." },
            ],
            tests: `vide = file_vide()\nassert longueur(vide) == 0, "Une file vide a une longueur de 0."\nassert est_vide(vide), "Et elle doit le rester."\nf = file_vide()\nfor v in [5, 8, 2]:\n    enfiler(f, v)\nassert longueur(f) == 3, "Trois arrivées, une longueur de 3."\nassert longueur(f) == 3, "Deux appels de suite doivent donner le même résultat : longueur() restaure la file."\nassert defiler(f) == 5, "Après longueur(), le premier servi est toujours le 5."\nassert defiler(f) == 8, "Et l'ordre du reste est préservé."\nassert defiler(f) == 2, "..."\nassert est_vide(f), "La file ne contenait que ces trois éléments."\ng = file_vide()\nfor v in range(40):\n    enfiler(g, v)\nassert longueur(g) == 40, "Quarante arrivées, une longueur de 40."\nassert defiler(g) == 0, "Le tout premier arrivé doit toujours être servi en premier."`,
          },
          felicitation: "Compter sans déranger : le schéma est désormais un réflexe. 📏",
          indices: [
            "Il te faut une file auxiliaire, créée au début de la fonction.",
            "Premier temps : vider <code>f</code> dans l'auxiliaire en comptant au passage. Second temps : la reverser dans <code>f</code>.",
            "Le compteur n'a besoin d'être augmenté que pendant le premier temps — mais assure-toi qu'aucun élément ne se perde pendant le second.",
          ],
          apres: `<p>Une remarque qui vaut pour les piles comme pour les files, et qu'il faut
            avoir en tête avant l'épreuve : <strong>connaître le nombre d'éléments coûte un
            parcours complet</strong>. Écrire <code>while i &lt; longueur(f)</code> dans une
            boucle qui, elle-même, parcourt la file, c'est donc refaire ce parcours à chaque
            tour — et transformer un travail proportionnel à <em>n</em> en un travail
            proportionnel à <em>n²</em>.</p>
            <p>Le bon réflexe est de ranger la longueur dans une variable <em>avant</em> la
            boucle. On y reviendra sérieusement à la séance 7.</p>`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Une journée au guichet",
          contenu: `
            <p><code>journee(evenements)</code> simule une journée de guichet et renvoie le
            tableau des clients servis, <strong>dans l'ordre où ils l'ont été</strong>.</p>
            <ul>
              <li>un événement est soit le <strong>nom d'un client</strong> qui arrive et
              prend place dans la file ;</li>
              <li>soit la chaîne <code>"SERVIR"</code>, qui appelle le premier de la file ;</li>
              <li>servir alors que la file est vide ne fait <strong>rien</strong> — le guichet
              attend.</li>
            </ul>

            <pre class="bloc-code"><code>journee(["Alice", "Bob", "SERVIR", "Chloe", "SERVIR"])
   →  ["Alice", "Bob"]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un air de déjà-vu</span>
              Cette fonction a exactement la même charpente que l'éditeur avec Ctrl+Z de la
              séance 3 : une boucle sur des commandes, une structure, et un cas particulier
              quand elle est vide. Seule la structure change — et elle change tout.
            </div>`,
          nomFichier: "guichet.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef journee(evenements):\n    """Renvoie le tableau des clients servis, dans l'ordre.\n\n    Un evenement est soit le nom d'un client qui arrive,\n    soit la chaine "SERVIR" qui appelle le premier de la file.\n    Servir alors que la file est vide ne fait rien.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\benfiler\\s*\\(", message: "Les clients qui arrivent doivent être enfilés." },
              { motif: "\\bdefiler\\s*\\(", message: "Servir, c'est défiler le premier de la file." },
            ],
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
            ],
            tests: `assert journee([]) == [], "Aucun événement : personne n'est servi."\nassert journee(["Alice", "Bob", "SERVIR", "Chloe", "SERVIR"]) == ["Alice", "Bob"], "On sert dans l'ordre d'arrivée : Alice puis Bob."\nassert journee(["SERVIR"]) == [], "Servir alors que personne n'attend ne fait rien — et ne doit pas planter."\nassert journee(["SERVIR", "SERVIR", "Alice"]) == [], "Alice arrive après les deux appels : elle n'est pas servie."\nassert journee(["Alice", "SERVIR", "SERVIR"]) == ["Alice"], "Le second appel trouve la file vide."\nassert journee(["Alice", "Bob", "Chloe", "SERVIR", "SERVIR", "SERVIR"]) == ["Alice", "Bob", "Chloe"], "Trois arrivées, trois services, dans l'ordre d'arrivée."\nassert journee(["Alice", "SERVIR", "Bob", "SERVIR"]) == ["Alice", "Bob"], "Les arrivées et les services peuvent s'entremêler."\nassert journee(["Alice", "Bob"]) == [], "Personne n'est servi si l'on n'appelle jamais."`,
          },
          felicitation: "Une file d'attente, simulée d'un bout à l'autre. 🎫",
          indices: [
            "Deux variables avant la boucle : la file des clients qui attendent, et le tableau de ceux qui ont été servis.",
            "Pour un événement ordinaire, le client rejoint la fin de la file. Pour <code>\"SERVIR\"</code>, il faut d'abord vérifier que quelqu'un attend.",
            "La précondition de <code>defiler</code> t'impose ce test : <code>est_vide</code> d'abord, et l'on ne fait rien si la file est vide.",
          ],
          apres: `<span class="chapo">Le même programme, l'autre structure</span>
              Mets cette fonction et l'éditeur Ctrl+Z de la séance 3 côte à côte : même
              boucle, même test sur une commande particulière, même précaution avant de
              retirer. Deux problèmes qui n'ont rien à voir, un seul patron.
              <br><br>
              Ce qui les sépare est la seule chose qui compte : l'un annule la dernière
              action, l'autre sert le premier arrivé. Change la structure, et tu changes le
              comportement du logiciel entier sans toucher à sa charpente. C'est ce qui rend
              le choix de la structure si décisif — et c'est pourquoi on le fait <em>avant</em>
              d'écrire le code.
            <p>Remarque enfin que <code>servis</code> est un tableau Python ordinaire, et non
            une file : c'est un résultat, pas une file d'attente. Toutes les collections d'un
            programme n'ont pas à être des structures abstraites — seules celles dont
            l'<em>ordre de traitement</em> est une règle du problème.</p>`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Deux files n'en font plus qu'une",
          contenu: `
            <p><code>alterner(f1, f2)</code> renvoie une <strong>nouvelle</strong> file
            composée alternativement d'un élément de <code>f1</code> et d'un élément de
            <code>f2</code>, en commençant par <code>f1</code>. Quand l'une des deux est
            épuisée, on verse le reste de l'autre à la suite.</p>

            <pre class="bloc-code"><code>f1 : [1, 2, 3]      f2 : ["a", "b"]
alterner(f1, f2)  →  [1, "a", 2, "b", 3]</code></pre>

            <div class="encadre">
              <span class="chapo">Effet</span>
              <code>f1</code> et <code>f2</code> sont <strong>vidées</strong> au passage. La
              spécification l'annonce, donc l'appelant est prévenu — c'est une décision, pas
              un oubli.
            </div>`,
          nomFichier: "alterner.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef alterner(f1, f2):\n    """Renvoie une nouvelle file alternant les elements de f1 et de f2.\n\n    On commence par f1. Quand l'une est epuisee, on verse le reste de l'autre.\n    Effet : f1 et f2 sont videes.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf1\\s*\\[", message: "Passe par l'interface de la file." },
              { motif: "\\bf2\\s*\\[", message: "Passe par l'interface de la file." },
            ],
            tests: `def _tab(f):\n    t = []\n    while not est_vide(f):\n        t.append(defiler(f))\n    return t\na = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(a, v)\nb = file_vide()\nfor v in ["a", "b"]:\n    enfiler(b, v)\nr = alterner(a, b)\nassert est_vide(a) and est_vide(b), "alterner() vide ses deux files, comme la spécification l'annonce."\nassert _tab(r) == [1, "a", 2, "b", 3], "Un élément de chaque, en commençant par f1, puis le reste de la plus longue."\nc = file_vide()\nd = file_vide()\nfor v in [1, 2]:\n    enfiler(c, v)\nfor v in [7, 8]:\n    enfiler(d, v)\nassert _tab(alterner(c, d)) == [1, 7, 2, 8], "Deux files de même longueur s'alternent jusqu'au bout."\ne = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(e, v)\nassert _tab(alterner(e, file_vide())) == [1, 2, 3], "Si f2 est vide, on obtient f1 telle quelle."\ng = file_vide()\nfor v in [9, 8]:\n    enfiler(g, v)\nassert _tab(alterner(file_vide(), g)) == [9, 8], "Si f1 est vide, on obtient f2 telle quelle."\nassert _tab(alterner(file_vide(), file_vide())) == [], "Deux files vides donnent une file vide."`,
          },
          felicitation: "Trois boucles, et deux files se fondent en une seule. 🔀",
          indices: [
            "Une file neuve au début : c'est elle que tu renverras.",
            "Tant que les <strong>deux</strong> files ont encore quelque chose, on prend un élément de chacune — dans l'ordre annoncé.",
            "Quand cette première boucle s'arrête, l'une au moins est vide. Deux boucles de plus, l'une pour chaque file, suffisent à verser ce qui reste : celle qui est déjà vide ne fera aucun tour.",
          ],
          apres: `<p>Les deux dernières boucles ne sont pas une maladresse : l'une des deux ne
            fera jamais le moindre tour, et on ne sait pas laquelle à l'avance. Les écrire
            toutes les deux évite un <code>if</code>, et surtout évite d'avoir à se demander
            laquelle des deux files s'est épuisée la première.</p>
            <p>C'est le même réflexe qu'à la séance 2, avec <code>egales</code> : après une
            boucle <code>while</code> à deux conditions, se demander systématiquement
            <em>laquelle</em> des deux a cédé — et écrire la suite de manière à ne pas avoir à
            le savoir, quand c'est possible.</p>`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "faire coopérer une pile et une file",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Qui triche ?",
          contenu: `
            <p>Quatre fonctions clientes de la file. Trois n'utilisent que l'interface ; une
            s'appuie en douce sur l'implémentation « entrée en fin ».</p>
            <pre class="bloc-code"><code># A
def vider(f):
    while not est_vide(f):
        defiler(f)

# B
def enfiler_tout(f, elements):
    for x in elements:
        enfiler(f, x)

# C
def prochain(f):
    return f[0]

# D
def echanger_les_deux_premiers(f):
    a = defiler(f)
    b = defiler(f)
    enfiler(f, b)
    enfiler(f, a)</code></pre>`,
          question: "Laquelle cessera de dire la vérité avec l'implémentation « entrée en tête » ?",
          options: [
            { texte: "A",
              explication: "Deux opérations de l'interface, et une condition d'arrêt qui repose sur <code>est_vide</code>. Elle marchera partout." },
            { texte: "B",
              explication: "Elle parcourt <code>elements</code>, qui est un tableau ordinaire fourni par le client, et n'interroge la file que par <code>enfiler</code>." },
            { texte: "C", correct: true,
              explication: "Oui. <code>f[0]</code> lit la case 0 du tableau. Avec « entrée en tête », la case 0 est le <strong>dernier arrivé</strong> : la fonction rendrait l'exact contraire de ce qu'elle promet, sans lever la moindre erreur. Il fallait écrire la version de l'étape 7." },
            { texte: "D",
              explication: "Elle ne passe que par l'interface. Attention tout de même : elle ne fait pas ce que son nom dit — les deux éléments repartent à la <em>fin</em> de la file, pas au début. Mais ce défaut-là ne dépend pas de l'implémentation." },
          ],
          apres: `<span class="chapo">Et la remarque sur D mérite qu'on s'y arrête</span>
            <code>echanger_les_deux_premiers</code> est un client honnête — et une fonction
            fausse. Elle retire bien les deux premiers, mais les remet <em>derrière tout le
            monde</em> : sur une file de dix éléments, ils se retrouvent en neuvième et
            dixième position.
            <br><br>
            C'est la leçon de l'étape 6, sous une autre forme : dans une file, <strong>on ne
            remet jamais quelque chose à sa place</strong>. Tout ce qui ressort repart à la
            fin. Échanger réellement les deux premiers exige de faire tourner la file
            entière — et donc d'en connaître la longueur.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Renverser une file",
          contenu: `
            <p><code>renverser_file(f)</code> inverse l'ordre des éléments de la file : le
            dernier arrivé devient le premier servi.</p>
            <pre class="bloc-code"><code>f vaut, du premier au dernier :  [1, 2, 3]
renverser_file(f)
f vaut désormais :               [3, 2, 1]</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une file ne sait pas s'inverser toute seule</span>
              Tu l'as établi à l'étape 7 : un transfert de file à file <strong>conserve</strong>
              l'ordre. Autant de files auxiliaires que tu voudras n'y changeront rien — il te
              faut une structure qui, elle, inverse.
              <br><br>
              Elle t'est fournie en haut du fichier, sous des noms distincts pour éviter toute
              confusion : <code>pile_vide</code>, <code>pile_est_vide</code>,
              <code>empiler</code>, <code>depiler</code>.
            </div>

            <p>La fonction ne renvoie rien : elle modifie la file reçue.</p>`,
          nomFichier: "renverser_file.py",
          depart: `# ---- La file, implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- Une pile, pour t'aider. N'y touche pas non plus. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef renverser_file(f):\n    """Inverse l'ordre des elements de la file f.\n\n    Effet : f est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bempiler\\s*\\([\\s\\S]*\\bempiler\\s*\\(", message: "Sers-toi de la pile fournie : elle seule sait inverser l'ordre." },
              { motif: "\\bdepiler\\s*\\([\\s\\S]*\\bdepiler\\s*\\(", message: "Et dépile-la ensuite pour remplir la file." },
            ],
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
              { motif: "\\breversed\\s*\\(", message: "Sers-toi de la pile, pas des outils de Python." },
            ],
            tests: `def _tab(f):\n    t = []\n    aux = file_vide()\n    while not est_vide(f):\n        x = defiler(f)\n        t.append(x)\n        enfiler(aux, x)\n    while not est_vide(aux):\n        enfiler(f, defiler(aux))\n    return t\nf = file_vide()\nfor v in [1, 2, 3]:\n    enfiler(f, v)\nrenverser_file(f)\nassert _tab(f) == [3, 2, 1], "Le dernier arrivé doit devenir le premier servi."\nrenverser_file(f)\nassert _tab(f) == [1, 2, 3], "Renverser deux fois redonne la file de départ."\ng = file_vide()\nrenverser_file(g)\nassert est_vide(g), "Renverser une file vide ne doit rien faire — et surtout pas planter."\nh = file_vide()\nenfiler(h, "seul")\nrenverser_file(h)\nassert _tab(h) == ["seul"], "Une file d'un seul élément est son propre renversé."\nk = file_vide()\nfor v in range(6):\n    enfiler(k, v)\nrenverser_file(k)\nassert _tab(k) == [5, 4, 3, 2, 1, 0], "Sur six éléments aussi."`,
          },
          felicitation: "Une pile et une file qui travaillent ensemble : la file seule n'y arrivait pas. 🔄",
          indices: [
            "Deux temps : d'abord vider la file dans la pile, ensuite vider la pile dans la file.",
            "Le premier transfert inverse l'ordre — c'est exactement ce qu'on cherche. Le second, de la pile vers la file, ne l'inverse pas une seconde fois : il rend les éléments dans l'ordre où la pile les restitue.",
            "Attention à utiliser <code>pile_est_vide</code> pour la boucle sur la pile, et <code>est_vide</code> pour celle sur la file : ce sont deux fonctions différentes.",
          ],
          apres: `<span class="chapo">Chaque structure sait faire ce que l'autre ne sait pas</span>
              <pre class="bloc-code"><code>file → file   conserve l'ordre   (donc : restaurer)
file → pile   INVERSE l'ordre    (donc : renverser)
pile → pile   inverse l'ordre    (donc : deux transferts pour restaurer)</code></pre>
              Renverser une file est <em>impossible</em> avec des files seules, et
              <em>gratuit</em> dès qu'on dispose d'une pile. C'est la première fois du
              chapitre que deux structures coopèrent, et ce ne sera pas la dernière : à la
              séance 5, on construira une file entière à partir de <strong>deux
              piles</strong>, et c'est le même mécanisme, poussé un cran plus loin.
            <p>Retiens aussi la précaution de nommage : quand deux structures cohabitent dans
            un fichier, leurs opérations doivent porter des noms distincts. Deux fonctions
            <code>est_vide</code> se seraient écrasées l'une l'autre, et la seconde aurait
            silencieusement pris la place de la première.</p>`,
        },

        {
          id: "x3",
          type: "code",
          titre: "La patate chaude",
          contenu: `
            <p>Des joueurs sont assis en cercle et se passent un objet. À chaque tour, l'objet
            passe de main en main <strong><code>k</code> fois</strong> ; celui qui le tient
            alors est <strong>éliminé</strong> et quitte le cercle. On recommence jusqu'à ce
            qu'il ne reste qu'un joueur.</p>

            <p><code>patate_chaude(noms, k)</code> renvoie le nom du <strong>dernier joueur
            restant</strong>.</p>

            <pre class="bloc-code"><code>patate_chaude(["a", "b", "c"], 1)  →  "c"</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi une file, et pas un tableau</span>
              Un cercle de joueurs, c'est une file qui tourne : passer l'objet à son voisin,
              c'est envoyer le premier à la fin. Tu as écrit ce geste à l'étape 8, et il ne
              coûte rien.
              <br><br>
              Avec un tableau, il faudrait gérer soi-même le retour à l'indice 0 et les
              décalages après chaque élimination. La file fait tout cela sans qu'on ait à y
              penser — c'est un cas d'école de « choisir une structure adaptée à la situation
              à modéliser ».
            </div>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              <code>noms</code> contient au moins un nom, et <code>k</code> est positif ou
              nul. Le tableau <code>noms</code> est un tableau Python ordinaire : tu peux en
              demander la longueur.
            </div>`,
          nomFichier: "patate.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef patate_chaude(noms, k):\n    """Renvoie le nom du dernier joueur restant.\n\n    Les joueurs sont en cercle, dans l'ordre de noms. A chaque tour, l'objet\n    passe k fois de main en main, et celui qui le tient alors est elimine.\n\n    Precondition : noms contient au moins un nom, et k >= 0.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
            ],
            tests: `assert patate_chaude(["seul"], 3) == "seul", "Un seul joueur : il gagne sans jouer."\nassert patate_chaude(["a", "b"], 0) == "b", "Avec k = 0, on élimine directement celui qui tient l'objet : a sort, b reste."\nassert patate_chaude(["a", "b", "c"], 1) == "c", "L'objet passe une fois, b est éliminé ; puis a ; il reste c."\nassert patate_chaude(["a", "b", "c", "d", "e"], 2) == "d", "Sur cinq joueurs et deux passes, c'est d qui survit."\nassert patate_chaude(["a", "b", "c", "d"], 0) == "d", "Avec k = 0, on élimine dans l'ordre du cercle : il reste le dernier."\nassert patate_chaude(["x", "y", "z"], 3) == "y", "Trois passes font un tour complet : on élimine x, puis z ; il reste y."\njoueurs = ["a", "b", "c"]\npatate_chaude(joueurs, 1)\nassert joueurs == ["a", "b", "c"], "Le tableau reçu ne doit pas être modifié."`,
          },
          felicitation: "Un problème de cercle résolu par une file qui tourne. 🥔",
          indices: [
            "Commence par enfiler tous les joueurs dans une file : le cercle est prêt.",
            "Tu dois t'arrêter quand il ne reste qu'un joueur. Comme la file ne sait pas dire combien elle en contient, tiens toi-même le compte à partir de la longueur du tableau <code>noms</code>.",
            "Un tour de jeu : faire tourner la file de <code>k</code> crans, puis défiler une fois — cette valeur-là est éliminée, on ne la remet pas. À la fin, le dernier défilement rend le gagnant.",
          ],
          apres: `<span class="chapo">Un problème vieux de deux mille ans</span>
              Ce jeu porte un nom : le <strong>problème de Josèphe</strong>, d'après
              l'historien Flavius Josèphe, qui aurait survécu au siège de Yodfat en 67 de
              notre ère en calculant la bonne place dans un cercle de ce genre. On le retrouve
              aujourd'hui dans les algorithmes de répartition de charge — à qui confier la
              prochaine requête — et dans les tirages au sort.
              <br><br>
              Ce qui doit te rester, c'est la <em>modélisation</em> : un cercle n'est pas une
              structure particulière, c'est une file dont on recycle le premier élément. La
              bonne question n'était pas « comment programmer un cercle ? » mais « quelle
              structure rend ce mouvement gratuit ? ».
            <p>Note enfin qu'on a dû tenir le compte des restants à la main : l'interface de
            la file n'offre pas de longueur, et la calculer à chaque tour aurait coûté un
            parcours complet par élimination. Compter soi-même, ici, n'est pas de la
            paresse — c'est le bon choix.</p>`,
        },

        {
          id: "x4",
          type: "code",
          titre: "La file d'attente des urgences",
          contenu: `
            <p>Dans une salle d'attente, les patients ne sont pas tous égaux : les
            <strong>urgences</strong> passent avant les autres. Mais à l'intérieur de chaque
            catégorie, l'ordre d'arrivée reste respecté.</p>

            <p>Une <strong>file de priorité à deux niveaux</strong> se construit très
            simplement : <strong>deux files</strong>, rangées dans une liste de deux cases.</p>

            <pre class="bloc-code"><code>fp[0]  la file des urgences
fp[1]  la file des cas ordinaires</code></pre>

            <p>Écris les quatre opérations de sa nouvelle interface :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th></tr>
              <tr><td><code>fp_vide()</code></td><td>une file de priorité sans personne</td><td>aucune</td></tr>
              <tr><td><code>fp_est_vide(fp)</code></td><td><code>True</code> si plus personne n'attend</td><td>aucune</td></tr>
              <tr><td><code>fp_ajouter(fp, patient, urgent)</code></td><td>rien</td><td>aucune</td></tr>
              <tr><td><code>fp_servir(fp)</code></td><td>le prochain patient à voir</td><td><code>fp</code> n'est pas vide</td></tr>
            </table>
            </div>

            <p><code>urgent</code> est un booléen. <code>fp_servir</code> prend un patient
            urgent s'il y en a un, et sinon un patient ordinaire.</p>`,
          nomFichier: "urgences.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef fp_vide():\n    """Renvoie une file de priorite ou personne n'attend."""\n    pass\n\ndef fp_est_vide(fp):\n    """Renvoie True si aucun patient n'attend, ni urgent ni ordinaire."""\n    pass\n\ndef fp_ajouter(fp, patient, urgent):\n    """Ajoute patient dans la file correspondant a sa categorie."""\n    pass\n\ndef fp_servir(fp):\n    """Renvoie le prochain patient a voir, et le retire.\n\n    Precondition : fp n'est pas vide.\n    """\n    pass\n`,
          validation: {
            tests: `fp = fp_vide()\nassert fp_est_vide(fp) == True, "Une file de priorité neuve n'a personne."\nfp_ajouter(fp, "Alice", False)\nassert fp_est_vide(fp) == False, "Un patient ordinaire attend : la file n'est pas vide."\nfp_ajouter(fp, "Bob", True)\nfp_ajouter(fp, "Chloe", False)\nassert fp_servir(fp) == "Bob", "Bob est une urgence : il passe avant les deux autres, bien qu'arrivé après Alice."\nassert fp_servir(fp) == "Alice", "Plus d'urgence : on reprend l'ordre d'arrivée des cas ordinaires."\nassert fp_servir(fp) == "Chloe", "Puis Chloé."\nassert fp_est_vide(fp) == True, "Tout le monde a été vu."\ngp = fp_vide()\nfp_ajouter(gp, "u1", True)\nfp_ajouter(gp, "u2", True)\nassert fp_servir(gp) == "u1", "Entre deux urgences, l'ordre d'arrivée est respecté."\nassert fp_servir(gp) == "u2", "..."\nhp = fp_vide()\nfp_ajouter(hp, "n1", False)\nfp_ajouter(hp, "u1", True)\nfp_ajouter(hp, "n2", False)\nfp_ajouter(hp, "u2", True)\nassert fp_servir(hp) == "u1", "Les deux urgences d'abord, dans leur ordre d'arrivée."\nassert fp_servir(hp) == "u2", "..."\nassert fp_servir(hp) == "n1", "Puis les ordinaires, dans leur ordre d'arrivée."\nassert fp_servir(hp) == "n2", "..."\nassert fp_est_vide(hp) == True, "..."`,
          },
          felicitation: "Une file de priorité, bâtie en quatre lignes sur deux files ordinaires. 🚑",
          indices: [
            "Une file de priorité neuve, ce sont deux files neuves rangées dans une liste de deux cases.",
            "Elle est vide seulement si les <strong>deux</strong> files le sont. <code>fp_ajouter</code> choisit la file selon le booléen <code>urgent</code>.",
            "<code>fp_servir</code> regarde d'abord si la file des urgences a quelqu'un : si oui, elle la sert ; sinon, elle sert l'autre. La précondition garantit qu'au moins l'une des deux n'est pas vide.",
          ],
          apres: `<span class="chapo">Une structure bâtie sur une autre</span>
              Tu viens de faire ce que fait un bibliothécaire : construire un
              <strong>nouveau type abstrait</strong> — la file de priorité, avec sa propre
              interface — en <em>utilisant</em> un type abstrait existant, sans jamais
              regarder dans ses tableaux.
              <br><br>
              C'est le sommet de ce que la séance 1 rendait possible : le jour où tu
              remplaceras l'implémentation des files, ta file de priorité continuera de
              fonctionner sans une retouche. Et le jour où tu voudras trois niveaux de
              priorité au lieu de deux, seul ce fichier-ci changera — pas les programmes qui
              s'en servent.
            <span class="chapo">Le défaut de cette file de priorité, et il est réel</span>
              Tant qu'il arrive des urgences, les patients ordinaires ne sont
              <strong>jamais</strong> servis. On appelle cela la <em>famine</em>, et c'est un
              vrai problème dans les systèmes d'exploitation, qui répartissent ainsi le temps
              du processeur. La parade consiste à faire monter la priorité de ceux qui
              attendent depuis longtemps — mais cela demande de connaître leur temps
              d'attente, donc une structure plus riche que deux files.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Palindrome, avec une pile et une file",
          contenu: `
            <p>Un mot est un <strong>palindrome</strong> s'il se lit de la même façon dans les
            deux sens : <em>kayak</em>, <em>ressasser</em>, <em>radar</em>.</p>

            <p><code>est_palindrome(mot)</code> renvoie <code>True</code> ou
            <code>False</code>, en se servant d'<strong>une pile et d'une file</strong>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'idée, et elle est élégante</span>
              Verse le mot, lettre par lettre, dans une pile <em>et</em> dans une file. Puis
              vide-les toutes les deux en même temps.
              <br><br>
              La file rend les lettres dans l'ordre de lecture ; la pile les rend dans l'ordre
              inverse. Le mot est un palindrome si les deux disent exactement la même chose.
            </div>

            <p>Les deux structures te sont fournies, sous des noms distincts.</p>`,
          nomFichier: "palindrome.py",
          depart: `# ---- La file, implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- La pile. N'y touche pas non plus. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi. ----\n\ndef est_palindrome(mot):\n    """Renvoie True si mot se lit de la meme facon dans les deux sens.\n\n    La comparaison est exacte : les accents, les espaces et la casse comptent.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bempiler\\s*\\(", message: "Verse le mot dans une pile." },
              { motif: "\\benfiler\\s*\\(", message: "Et aussi dans une file." },
              { motif: "\\bdepiler\\s*\\(", message: "Puis vide-les toutes les deux." },
              { motif: "\\bdefiler\\s*\\(", message: "Puis vide-les toutes les deux." },
            ],
            codeAbsent: [
              { motif: "\\[\\s*::\\s*-\\s*1\\s*\\]", message: "La tranche inversée est interdite ici : sers-toi des deux structures." },
              { motif: "\\breversed\\s*\\(", message: "reversed() est interdit ici : sers-toi des deux structures." },
            ],
            tests: `assert est_palindrome("kayak") == True, "kayak se lit pareil dans les deux sens."\nassert est_palindrome("ressasser") == True, "ressasser aussi."\nassert est_palindrome("radar") == True, "radar aussi."\nassert est_palindrome("") == True, "Le mot vide est un palindrome."\nassert est_palindrome("a") == True, "Un mot d'une lettre aussi."\nassert est_palindrome("abba") == True, "Un palindrome de longueur paire."\nassert est_palindrome("python") == False, "python ne se lit pas pareil à l'envers."\nassert est_palindrome("abab") == False, "Attention : ce n'en est pas un."\nassert est_palindrome("ab") == False, "Deux lettres différentes."\nassert est_palindrome("aabaa") == True, "Un palindrome de longueur impaire."\nassert est_palindrome("Kayak") == False, "La casse compte : K majuscule et k minuscule diffèrent."`,
          },
          felicitation: "Deux structures opposées, et leur désaccord suffit à répondre. 🪞",
          indices: [
            "Une pile et une file, créées au début. Une seule boucle <code>for</code> sur le mot suffit à les remplir toutes les deux.",
            "Ensuite, une boucle qui retire un élément de chaque et les compare. Dès qu'ils diffèrent, la réponse est connue.",
            "Les deux structures contiennent le même nombre de lettres : tester l'une des deux dans la condition de la boucle suffit. Et si la boucle se termine sans désaccord, c'est un palindrome.",
          ],
          apres: `<span class="chapo">Ce que cet algorithme dit des deux structures</span>
              Le mot est versé une seule fois, dans deux réceptacles qui ne diffèrent que par
              l'extrémité de sortie. L'un restitue l'ordre, l'autre son contraire — et c'est
              exactement ce qu'on voulait comparer.
              <br><br>
              Aucune des deux structures ne pourrait répondre seule : deux files diraient
              toujours la même chose, deux piles aussi. C'est leur <strong>opposition</strong>
              qui porte l'information, et c'est pour cela que l'algorithme est joli.
            <p>Un mot sur l'efficacité, pour être honnête : comparer <code>mot</code> à son
            renversé, ou remonter depuis les deux bouts avec deux indices, ferait le même
            travail plus vite et avec moins de mémoire. L'intérêt de cette version-ci est
            <em>pédagogique</em> — et le jour où le problème ne portera plus sur une chaîne
            mais sur un flux qu'on ne peut lire qu'une fois, dans un seul sens, c'est bien
            celle-ci qu'il faudra écrire.</p>`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ouvrir un second guichet",
          contenu: `
            <p>La queue s'allonge, on ouvre un deuxième guichet. <code>repartir(f)</code>
            distribue les clients <strong>alternativement</strong> entre deux files : le
            premier au guichet A, le deuxième au guichet B, le troisième au guichet A, et
            ainsi de suite.</p>

            <p>Elle renvoie une liste de deux cases : <code>[guichet_A, guichet_B]</code>.</p>

            <pre class="bloc-code"><code>f : [1, 2, 3, 4, 5]
repartir(f)  →  [ [1, 3, 5] , [2, 4] ]</code></pre>

            <div class="encadre">
              <span class="chapo">Effet</span>
              <code>f</code> est <strong>vidée</strong> au passage. À l'intérieur de chaque
              guichet, l'ordre d'arrivée doit être respecté.
            </div>`,
          nomFichier: "repartir.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef repartir(f):\n    """Repartit les clients de f alternativement entre deux files.\n\n    Renvoie [guichet_A, guichet_B]. Le premier client va en A.\n    Effet : f est videe.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Passe par l'interface de la file." },
            ],
            tests: `def _tab(f):\n    t = []\n    while not est_vide(f):\n        t.append(defiler(f))\n    return t\nf = file_vide()\nfor v in [1, 2, 3, 4, 5]:\n    enfiler(f, v)\ng = repartir(f)\nassert est_vide(f), "repartir() vide la file d'origine, comme la spécification l'annonce."\nassert _tab(g[0]) == [1, 3, 5], "Le premier, le troisième et le cinquième vont au guichet A."\nassert _tab(g[1]) == [2, 4], "Le deuxième et le quatrième vont au guichet B."\nh = file_vide()\nfor v in ["a", "b", "c", "d"]:\n    enfiler(h, v)\nk = repartir(h)\nassert _tab(k[0]) == ["a", "c"], "Avec un nombre pair de clients, les deux guichets sont à égalité."\nassert _tab(k[1]) == ["b", "d"], "..."\nvide = repartir(file_vide())\nassert est_vide(vide[0]) and est_vide(vide[1]), "Une file vide donne deux guichets vides."\nun = file_vide()\nenfiler(un, "seul")\nr = repartir(un)\nassert _tab(r[0]) == ["seul"], "Un seul client va au guichet A."\nassert _tab(r[1]) == [], "Et le guichet B reste vide."`,
          },
          felicitation: "Deux guichets, et personne n'a doublé. 🎟️",
          indices: [
            "Deux files neuves au début, et une variable qui retient à qui revient le prochain client.",
            "Une seule boucle : tant que <code>f</code> n'est pas vide, on défile un client et on l'envoie dans la bonne file.",
            "Pour alterner, un booléen suffit : on l'inverse à chaque tour avec <code>not</code>. La fonction renvoie une liste des deux files.",
          ],
          apres: `<p>Le booléen qu'on inverse à chaque tour — <code>tour_de_a = not
            tour_de_a</code> — est un petit outil qui sert souvent : alterner deux couleurs
            de lignes dans un tableau, deux joueurs dans un jeu, deux destinations dans une
            répartition. Il vaut mieux que <code>i % 2</code>, parce qu'il ne suppose pas
            qu'on compte les tours.</p>
            <span class="chapo">Ce que cette répartition n'est pas</span>
              Distribuer un client sur deux ignore complètement la <em>durée</em> de chaque
              service. Si tous les clients impairs ont une opération longue, le guichet A
              croulera pendant que B s'ennuiera. Les vrais répartiteurs de charge envoient
              plutôt le prochain client au guichet le <strong>moins occupé</strong> — ce qui
              suppose de connaître la longueur de chaque file, donc un parcours complet à
              chaque arrivée, ou bien une structure qui retient sa taille.
              <br><br>
              C'est exactement la limite que la séance 5 va lever.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "À toi de trouver une file",
          contenu: `
            <p>Dernier défi, libre. Trouve une situation où une file s'impose, et
            programme-la.</p>

            <p>Quelques idées, si aucune ne te vient : une <strong>file d'impression</strong>,
            un <strong>tour de parole</strong> en classe, la gestion des
            <strong>commandes</strong> d'un restaurant, une <strong>liste d'attente</strong>
            pour un club, le <strong>tampon</strong> d'un lecteur vidéo, un
            <strong>tournoi</strong> où les perdants repassent en fin de liste…</p>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>au moins <strong>deux fonctions clientes</strong>, chacune avec sa
              <strong>docstring</strong> ;</li>
              <li>elles n'utilisent la file que par les quatre opérations de l'interface —
              aucun crochet, aucun <code>len</code> sur la file ;</li>
              <li>en dessous, un programme d'essai qui affiche au moins
              <strong>trois lignes</strong>.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Comment vérifier que c'est bien une file</span>
              Pose-toi la question de l'équité : dans ta situation, celui qui arrive en
              premier doit-il être traité en premier ? Si l'ordre naturel est celui du
              <em>dernier</em> arrivé, c'est une pile qu'il te faut — et c'était la séance
              précédente.
            </div>`,
          nomFichier: "ma_file.py",
          depart: `# ---- L'implémentation « entrée en fin ». N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# Ma situation : .....................\n#\n# Écris ici tes fonctions clientes, chacune avec sa docstring,\n# puis le programme d'essai en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){6}",
                message: "Il faut au moins deux fonctions clientes, en plus des quatre de l'implémentation." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){2}",
                message: "Chacune de tes fonctions doit porter une docstring." },
              { motif: "\\benfiler\\s*\\([\\s\\S]*\\benfiler\\s*\\(",
                message: "Tes fonctions doivent réellement se servir d'une file." },
              { motif: "\\bdefiler\\s*\\([\\s\\S]*\\bdefiler\\s*\\(",
                message: "Et défiler quelque part, sinon ce n'est pas une file." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme d'essai doit afficher au moins trois lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Une file repérée, spécifiée, programmée et essayée. La séance est bouclée. 🏁",
          indices: [
            "Commence par écrire, en commentaire, la phrase « dans ma situation, le premier arrivé est le premier à … ». Si tu n'arrives pas à la finir, change de situation.",
            "Écris la docstring de chaque fonction avant son corps : elle t'oblige à décider ce que la fonction renvoie et ce qu'elle modifie.",
            "Le programme d'essai vient tout en bas, sans indentation : il fabrique une file, appelle tes fonctions, et affiche ce qu'elles rendent.",
          ],
        },
      ],
    },
  ],
};

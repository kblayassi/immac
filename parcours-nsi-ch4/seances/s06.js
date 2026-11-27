/* NSI — chapitre 4, séance 6 : ce qui se passe en mémoire.
 * Reprend la section « Ce qui se passe dans la mémoire » du cours (adresses,
 * alias, == et is, copies, listes passées aux fonctions, copie d'une matrice),
 * ainsi que les exercices 9 à 12.
 */

export default {
  id: "s06",
  numero: 6,
  titre: "Ce qui se passe en mémoire",
  sousTitre: "Adresses, alias, et comment copier vraiment une liste",
  palier: "Partie 2 — Matrices et mémoire",

  accroche: `Voici le piège le plus célèbre des listes : on écrit <code>M = L</code>, on
    modifie <code>M</code>… et <code>L</code> change aussi. Pour comprendre, il faut
    regarder où les listes sont vraiment rangées : dans la <strong>mémoire</strong>
    de l'ordinateur.`,

  objectifs: [
    "expliquer ce qu'est une <strong>adresse mémoire</strong>, et pourquoi les indices commencent à 0",
    "reconnaître deux <strong>alias</strong> d'une même liste",
    "distinguer <code>==</code>, qui compare les contenus, et <code>is</code>, qui compare les identités",
    "copier vraiment une liste, et une matrice",
  ],

  motDeLaFin: `Tu sais maintenant ce que cache <code>M = L</code>, et comment faire une
    vraie copie. La partie 2 est terminée : fais-en le bilan, puis place aux
    premiers algorithmes, qui vont tous reposer sur le parcours.`,

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
          titre: "La mémoire est une suite de cases numérotées",
          contenu: `
            <p>La mémoire vive (RAM) est une très longue suite de <strong>cases</strong>,
            chacune repérée par un numéro unique. Comme dans une rue aux maisons
            numérotées : pour livrer un colis, pas besoin de parcourir la rue, le numéro
            suffit pour s'y rendre directement.</p>

            <div class="encadre">
              <span class="chapo">Définition : adresse mémoire</span>
              L'<strong>adresse</strong> d'une case mémoire est le numéro qui la repère.
            </div>

            <p>Les éléments d'une liste sont rangés dans un <strong>bloc de cases qui se
            suivent</strong> :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Adresse</th><td>1000</td><td>1001</td><td>1002</td><td>1003</td></tr>
              <tr><th>Contenu</th><td><code>12</code></td><td><code>15</code></td><td><code>8</code></td><td><code>18</code></td></tr>
              <tr><th>Se lit</th><td><code>notes[0]</code></td><td><code>notes[1]</code></td><td><code>notes[2]</code></td><td><code>notes[3]</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi les indices commencent à 0</span>
              Un indice ne compte pas les éléments : il dit <strong>combien de cases il faut
              sauter</strong> depuis le début du bloc. Pour le premier élément, il n'y a
              rien à sauter : indice 0. Pour le deuxième, une case : indice 1. C'est la
              promesse de la séance 1, tenue.
            </div>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Un résultat surprenant",
          contenu: `<p>Lis ce programme et prévois son affichage. Attention : on ne
            touche jamais à <code>L</code> après la deuxième ligne.</p>`,
          code: `L = [1, 2, 3]\nM = L\nM[0] = 100\nprint(L)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[1, 2, 3]</code>",
              explication: "C'est ce que tout le monde attend… et pourtant non : <code>L</code> a bien changé." },
            { texte: "<code>[100, 2, 3]</code>", correct: true,
              explication: "Oui, aussi surprenant que ce soit : <code>M = L</code> n'a pas copié la liste. <code>L</code> et <code>M</code> désignent la même liste, et la modifier par <code>M</code> la modifie pour <code>L</code>." },
            { texte: "<code>[100]</code>",
              explication: "<code>M[0] = 100</code> remplace une seule case : les autres restent en place." },
            { texte: "une erreur",
              explication: "Le programme est parfaitement valide pour Python." },
          ],
          apres: `<span class="chapo">M = L ne copie pas la liste</span>
            Cette ligne donne simplement un <strong>second nom</strong> à la même liste.
            L'étape suivante explique pourquoi.`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Une variable est une étiquette, pas une boîte",
          contenu: `
            <p>Une variable ne <em>contient</em> pas la liste : elle
            <strong>désigne</strong> l'endroit de la mémoire où la liste se trouve.
            L'instruction <code>M = L</code> ne recopie que cette désignation — pas les
            valeurs.</p>

            <pre class="bloc-code"><code>  L ──┐
      ├──►  [100, 2, 3]     une seule liste, en mémoire
  M ──┘</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : alias</span>
              Deux variables sont des <strong>alias</strong> lorsqu'elles désignent le même
              objet en mémoire. Toute modification faite à travers l'une est visible à
              travers l'autre.
            </div>

            <p>Python permet de le vérifier : la fonction <code>id()</code> renvoie
            l'<strong>identifiant</strong> d'un objet, un nombre propre à chaque objet en
            mémoire. Deux alias ont le même identifiant.</p>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Le même objet, ou deux objets ?",
          contenu: `
            <p><code>M</code> est un alias de <code>L</code>, tandis que <code>N</code> est
            une autre liste, créée à part, au contenu identique.</p>
            <p>Affiche le résultat de deux comparaisons : l'identifiant de <code>L</code>
            est-il égal à celui de <code>M</code> ? Et à celui de <code>N</code> ?</p>
            <pre class="bloc-code"><code>True
False</code></pre>`,
          depart: `L = [1, 2, 3]\nM = L\nN = [1, 2, 3]\n\n`,
          validation: {
            codeContient: [
              { motif: "id\\s*\\(\\s*L\\s*\\)\\s*==\\s*id\\s*\\(\\s*M\\s*\\)|id\\s*\\(\\s*M\\s*\\)\\s*==\\s*id\\s*\\(\\s*L\\s*\\)", message: "Compare id(L) et id(M) avec ==." },
              { motif: "id\\s*\\(\\s*L\\s*\\)\\s*==\\s*id\\s*\\(\\s*N\\s*\\)|id\\s*\\(\\s*N\\s*\\)\\s*==\\s*id\\s*\\(\\s*L\\s*\\)", message: "Compare id(L) et id(N) avec ==." },
            ],
            sortie: "True\nFalse",
          },
          felicitation: "Même contenu ne veut pas dire même objet. 🔎",
          indices: [
            "Deux <code>print</code>, chacun avec une comparaison <code>==</code> entre deux identifiants.",
            "L'identifiant d'une variable s'obtient en la passant à <code>id()</code>.",
          ],
        },

        {
          id: "d5",
          type: "cours",
          titre: "== ou is ?",
          contenu: `
            <p>Comparer deux listes peut vouloir dire deux choses différentes :</p>

            <pre class="bloc-code"><code>L = [1, 2, 3]
M = L             # un alias
N = [1, 2, 3]     # une autre liste, au contenu identique

print(L == M)     # True  : même contenu
print(L is M)     # True  : et même objet
print(L == N)     # True  : même contenu
print(L is N)     # False : mais deux objets distincts</code></pre>

            <div class="encadre">
              <span class="chapo">Propriété : == ou is</span>
              <ul style="margin-bottom:0">
                <li><code>==</code> compare les <strong>contenus</strong> : « ces deux listes se ressemblent-elles ? » ;</li>
                <li><code>is</code> compare les <strong>identités</strong> : « est-ce la même liste ? ». <code>L is M</code> revient à <code>id(L) == id(M)</code>.</li>
              </ul>
            </div>

            <p>Dans tes programmes, c'est presque toujours <code>==</code> qu'il faut
            utiliser ; <code>is</code> sert surtout à comprendre ce qui se passe.</p>`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Deux listes jumelles",
          contenu: `<p>Cette fois, <code>A</code> et <code>B</code> sont créées
            séparément. Lis ce programme sans l'exécuter.</p>`,
          code: `A = [0, 0]\nB = [0, 0]\nA[0] = 5\nprint(B)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[5, 0]</code>",
              explication: "<code>A</code> et <code>B</code> ne sont pas des alias : chacune a été créée par ses propres crochets." },
            { texte: "<code>[0, 0]</code>", correct: true,
              explication: "Oui : deux listes créées séparément sont deux objets distincts, même si leur contenu est identique. Modifier l'une ne touche pas l'autre." },
            { texte: "<code>[5, 5]</code>",
              explication: "Une affectation dans une case ne modifie qu'une case, et ici ce n'est même pas la liste <code>B</code>." },
            { texte: "une erreur",
              explication: "Le programme est valide." },
          ],
          apres: `<span class="chapo">Des crochets, un nouvel objet</span>
            Chaque fois que des crochets créent une liste, un nouvel objet apparaît en
            mémoire. L'alias ne naît que d'une affectation d'une variable à une autre :
            <code>B = A</code>.`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "Copier vraiment une liste",
          contenu: `
            <p>Pour obtenir une liste indépendante, il faut la demander
            explicitement. Trois écritures font la même chose :</p>

            <pre class="bloc-code"><code>M = L.copy()     # la méthode dédiée : la plus lisible
M = L[:]         # une « tranche » qui reprend toute la liste
M = list(L)      # une reconstruction à partir de L</code></pre>

            <pre class="bloc-code"><code>L = [1, 2, 3]
M = L.copy()
M[0] = 100
print(L)         # [1, 2, 3]   L est intacte
print(L is M)    # False       deux objets bien distincts</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Laquelle choisir ?</span>
              <code>L.copy()</code> dit exactement ce qu'elle fait : c'est celle qu'on
              utilisera. Les tranches comme <code>L[:]</code> seront détaillées à la séance 12.
            </div>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "La sauvegarde qui ne sauvegarde rien",
          contenu: `
            <p>Ce programme veut garder une sauvegarde des notes avant de les modifier.
            Mais la sauvegarde change en même temps que les notes !</p>
            <p>Corrige la deuxième ligne pour que <code>sauvegarde</code> soit une vraie
            copie :</p>
            <pre class="bloc-code"><code>Notes : [20, 15, 8]
Sauvegarde : [12, 15, 8]</code></pre>`,
          depart: `notes = [12, 15, 8]\nsauvegarde = notes\nnotes[0] = 20\nprint("Notes :", notes)\nprint("Sauvegarde :", sauvegarde)\n`,
          validation: {
            codeContient: [
              { motif: "sauvegarde\\s*=\\s*(notes\\s*\\.\\s*copy\\s*\\(\\s*\\)|notes\\s*\\[\\s*:\\s*\\]|list\\s*\\(\\s*notes\\s*\\))", message: "sauvegarde doit recevoir une copie de notes : notes.copy()." },
            ],
            sortie: "Notes : [20, 15, 8]\nSauvegarde : [12, 15, 8]",
          },
          felicitation: "Une vraie copie, et la sauvegarde reste intacte. 💾",
          indices: [
            "Pour l'instant, <code>sauvegarde</code> est un alias de <code>notes</code> : un second nom pour la même liste.",
            "Il faut que <code>sauvegarde</code> reçoive une copie de <code>notes</code>, avec la méthode dédiée.",
          ],
        },

        {
          id: "d9",
          type: "prediction",
          titre: "Une liste passée à une fonction",
          contenu: `<p>La fonction reçoit une liste et lui ajoute un élément. Lis ce
            programme sans l'exécuter.</p>`,
          code: `def ajouter_zero(tableau):\n    tableau.append(0)\n\nnotes = [12, 15]\najouter_zero(notes)\nprint(notes)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[12, 15]</code>",
              explication: "La fonction n'a pas reçu une copie : elle a travaillé sur la liste <code>notes</code> elle-même." },
            { texte: "<code>[12, 15, 0]</code>", correct: true,
              explication: "Oui : à l'appel, <code>tableau</code> devient un alias de <code>notes</code>. Ajouter un élément à <code>tableau</code>, c'est l'ajouter à <code>notes</code>." },
            { texte: "<code>None</code>",
              explication: "La fonction ne renvoie rien, mais on affiche <code>notes</code>, pas le résultat de la fonction." },
            { texte: "<code>[0]</code>",
              explication: "<code>append()</code> ajoute un élément à la fin, il ne remplace pas la liste." },
          ],
          apres: `<span class="chapo">Le paramètre est un alias</span>
            Quand on passe une liste à une fonction, c'est la désignation de la liste qui
            est transmise : le paramètre devient un alias de la liste de l'appelant. Ce
            n'est ni un bug, ni interdit — c'est parfois exactement ce qu'on veut. Mais il
            faut le <strong>savoir</strong>.`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Modifier sur place, exprès",
          contenu: `
            <p>Parfois, modifier la liste reçue est justement le but. Écris la fonction
            <code>remise_a_zero(tableau)</code>, qui met <strong>toutes les cases</strong>
            du tableau reçu à 0. Elle <strong>ne renvoie rien</strong> : c'est la liste de
            l'appelant qui change.</p>
            <pre class="bloc-code"><code>scores = [3, 7, 2]
remise_a_zero(scores)
print(scores)          # [0, 0, 0]</code></pre>`,
          depart: `def remise_a_zero(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "tableau\\s*\\[\\s*\\w+\\s*\\]\\s*=(?!=)", message: "Modifie les cases du tableau reçu : tableau[i] = 0." },
            ],
            tests: `_s = [3, 7, 2]\n_r = remise_a_zero(_s)\nassert _s == [0, 0, 0], "après l'appel, la liste de l'appelant doit valoir [0, 0, 0]"\nassert _r is None, "la fonction ne renvoie rien : elle modifie la liste reçue"\n_t = [5]\nremise_a_zero(_t)\nassert _t == [0], "la fonction doit marcher quelle que soit la longueur"`,
          },
          felicitation: "Une fonction qui modifie la liste de l'appelant, en toute connaissance de cause. 🧹",
          indices: [
            "Pour écrire dans les cases, il faut leurs indices : un parcours par indice sur <code>tableau</code>.",
            "Dans la boucle, chaque case reçoit 0. Pas de <code>return</code> : l'appelant voit le changement sur sa propre liste.",
          ],
        },

        {
          id: "d11",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>L = [1, 2, 3]
M = L               # un alias : la MÊME liste, sous deux noms
C = L.copy()        # une copie : une AUTRE liste, au même contenu

M[0] = 100          # L vaut [100, 2, 3]
C[1] = 50           # L ne bouge pas

L == C              # False : les contenus diffèrent maintenant
L is M              # True  : même objet
id(L) == id(M)      # True  : même identifiant</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>comparer deux contenus</td><td><code>L == M</code></td></tr>
              <tr><td>savoir si c'est le même objet</td><td><code>L is M</code></td></tr>
              <tr><td>copier une liste</td><td><code>L.copy()</code>, <code>L[:]</code> ou <code>list(L)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>croire que <code>M = L</code> copie la liste : c'est un alias ;</li>
                <li>oublier qu'une fonction qui reçoit une liste peut la modifier ;</li>
                <li>utiliser <code>is</code> pour comparer des contenus : c'est <code>==</code>.</li>
              </ul>
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 35,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Le piège de la copie",
          contenu: `<p>On considère le code suivant, qui affiche <code>[100, 2, 3]</code>.</p>`,
          code: `L = [1, 2, 3]\nM = L\nM[0] = 100\nprint(L)`,
          question: "Quelle est la bonne explication ?",
          options: [
            { texte: "<code>M[0] = 100</code> modifie toutes les listes qui commencent par 1.",
              explication: "Python ne relie pas les listes par leur contenu : seules des variables qui désignent le même objet sont liées." },
            { texte: "<code>M = L</code> donne un second nom à la même liste : <code>L</code> et <code>M</code> sont des alias.", correct: true,
              explication: "Oui : il n'y a qu'une seule liste en mémoire, désignée par deux variables. La modifier à travers l'une, c'est la modifier pour l'autre." },
            { texte: "<code>M = L</code> copie la liste, puis Python recopie les modifications de <code>M</code> dans <code>L</code>.",
              explication: "Il n'y a jamais eu de copie : une seule liste existe, sous deux noms." },
            { texte: "<code>print(L)</code> affiche en réalité la variable modifiée en dernier.",
              explication: "<code>print(L)</code> affiche bien la liste désignée par <code>L</code> — qui est aussi celle de <code>M</code>." },
          ],
          apres: `<span class="chapo">Une liste, deux noms</span>
            Retiens l'image des étiquettes : <code>M = L</code> colle une seconde étiquette
            sur la même liste.`,
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Lequel ne protège pas L ?",
          contenu: `<p>Dans le programme précédent, on remplace la ligne
            <code>M = L</code> par l'une des écritures ci-dessous, puis on exécute
            <code>M[0] = 100</code> et <code>print(L)</code>.</p>`,
          question: "Avec laquelle L est-elle encore modifiée ?",
          options: [
            { texte: "<code>M = L.copy()</code>",
              explication: "C'est une vraie copie : <code>L</code> reste <code>[1, 2, 3]</code>." },
            { texte: "<code>M = list(L)</code>",
              explication: "<code>list(L)</code> reconstruit une nouvelle liste : <code>L</code> reste intacte." },
            { texte: "<code>M = L[:]</code>",
              explication: "Une tranche complète fabrique une nouvelle liste : <code>L</code> reste intacte." },
            { texte: "<code>N = L</code> puis <code>M = N</code>", correct: true,
              explication: "Oui : <code>N</code> est un alias de <code>L</code>, et <code>M</code> un alias de <code>N</code>. Les trois variables désignent la même liste, qui est donc modifiée." },
          ],
          apres: `<span class="chapo">Un alias d'alias reste un alias</span>
            Aucune affectation entre variables ne copie une liste. Seuls
            <code>copy()</code>, <code>[:]</code> ou <code>list()</code> en fabriquent une
            nouvelle.`,
        },

        {
          id: "a3",
          type: "qcm",
          titre: "== ou is ?",
          contenu: `<p>On exécute les instructions suivantes, puis cinq affichages.</p>`,
          code: `L = [1, 2, 3]\nM = L\nN = [1, 2, 3]\n\nprint(L == M)\nprint(L is M)\nprint(L == N)\nprint(L is N)\nprint(id(L) == id(M))`,
          question: "Qu'affichent ces cinq lignes, dans l'ordre ?",
          options: [
            { texte: "True, True, True, True, True",
              explication: "<code>L</code> et <code>N</code> ont le même contenu, mais ce sont deux objets distincts : <code>L is N</code> vaut <code>False</code>." },
            { texte: "True, True, True, False, True", correct: true,
              explication: "Oui : <code>L</code> et <code>M</code> sont le même objet (donc égaux et identiques) ; <code>L</code> et <code>N</code> sont égaux mais distincts ; et <code>id(L) == id(M)</code> teste exactement la même chose que <code>L is M</code>." },
            { texte: "True, True, False, False, True",
              explication: "<code>==</code> compare les contenus, élément par élément : <code>L == N</code> vaut <code>True</code>." },
            { texte: "True, False, True, False, False",
              explication: "<code>M = L</code> crée un alias : <code>L is M</code> vaut <code>True</code>, et leurs identifiants sont égaux." },
          ],
          apres: `<span class="chapo">Contenu ou identité</span>
            <code>==</code> compare les <strong>contenus</strong>, <code>is</code> compare les
            <strong>identités</strong>. Deux alias sont toujours égaux ; deux listes égales
            ne sont pas forcément des alias.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Ne pas abîmer ce qu'on reçoit",
          contenu: `
            <p>Écris deux fonctions qui renvoient un <strong>nouveau</strong> tableau, sans
            jamais modifier celui qu'elles reçoivent :</p>
            <ul>
              <li><code>doubler(tableau)</code> renvoie le double de chaque valeur ;</li>
              <li><code>ajouter_note(notes, note)</code> renvoie une copie de
              <code>notes</code>, avec <code>note</code> ajoutée à la fin.</li>
            </ul>
            <pre class="bloc-code"><code>doubler([1, 2, 3])           # renvoie [2, 4, 6]
ajouter_note([12, 15], 9)    # renvoie [12, 15, 9]</code></pre>
            <p>⚠️ Le piège se cache dans <code>ajouter_note</code> : écrire directement
            <code>notes.append(note)</code> modifierait le tableau de l'appelant.</p>`,
          depart: `def doubler(tableau):\n    pass\n\n\ndef ajouter_note(notes, note):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b[\\s\\S]*\\breturn\\b", message: "Chacune des deux fonctions doit renvoyer un nouveau tableau." },
            ],
            tests: `_t = [1, 2, 3]\nassert doubler(_t) == [2, 4, 6], "doubler([1, 2, 3]) doit renvoyer [2, 4, 6]"\nassert _t == [1, 2, 3], "doubler ne doit pas modifier le tableau reçu"\nassert doubler([]) == [], "doubler([]) doit renvoyer une liste vide"\n_n = [12, 15]\nassert ajouter_note(_n, 9) == [12, 15, 9], "ajouter_note([12, 15], 9) doit renvoyer [12, 15, 9]"\nassert _n == [12, 15], "ajouter_note ne doit pas modifier le tableau reçu : travaille sur une copie"\nassert ajouter_note([], 10) == [10], "ajouter_note([], 10) doit renvoyer [10]"`,
          },
          felicitation: "Deux fonctions qui renvoient du neuf et laissent l'original intact. 🛡️",
          indices: [
            "Pour <code>doubler</code>, une compréhension fabrique directement une nouvelle liste.",
            "Pour <code>ajouter_note</code>, commence par faire une copie de <code>notes</code> ; c'est à cette copie qu'on ajoute la note, et c'est elle qu'on renvoie.",
          ],
        },

        {
          id: "a5",
          type: "prediction",
          titre: "Et avec une chaîne ?",
          contenu: `<p>Le même scénario, mais avec une chaîne de caractères au lieu
            d'une liste.</p>`,
          code: `mot = "chat"\nautre = mot\nautre = autre + "s"\nprint(mot)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>chats</code>",
              explication: "<code>autre + \"s\"</code> ne modifie pas la chaîne : il en fabrique une nouvelle." },
            { texte: "<code>chat</code>", correct: true,
              explication: "Oui : une chaîne ne peut pas être modifiée. <code>autre + \"s\"</code> fabrique une <strong>nouvelle</strong> chaîne, que <code>autre</code> désigne désormais ; <code>mot</code> désigne toujours l'ancienne." },
            { texte: "<code>s</code>",
              explication: "On affiche <code>mot</code>, qui n'a jamais été réaffecté." },
            { texte: "une erreur",
              explication: "Concaténer deux chaînes est parfaitement valide." },
          ],
          apres: `<span class="chapo">Les chaînes sont immuables</span>
            Une chaîne ne se modifie jamais sur place : toute « modification » fabrique une
            nouvelle chaîne. Le piège de l'alias ne peut donc pas se produire avec elles —
            nous y reviendrons à la séance 11.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs : le bonus",
          contenu: `
            <p>La fonction <code>augmenter</code> doit renvoyer une
            <strong>nouvelle</strong> liste de notes augmentées, sans toucher à celle
            qu'elle reçoit. Le programme devrait afficher :</p>
            <pre class="bloc-code"><code>Avant : [12, 9, 15]
Après : [14, 11, 17]
Même liste ? False</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `def augmenter(notes, bonus)\n    resultat = notes\n    for i in range(len(resultat)):\n        resultat[i] = resultat[i] + bonus\n        return resultat\n\nclasse = [12, 9, 15]\nameliorees = augmenter(classe, 2)\nprint("Avant :", classe)\nprint("Après :", ameliorees)\nprint("Même liste ?", classe is ameliorees)\n`,
          validation: {
            codeAbsent: [
              { motif: "resultat\\s*=\\s*notes\\s*$", message: "resultat = notes crée un alias : la liste de l'appelant serait modifiée.", options: "m" },
              { motif: "\\n {8,}return\\b", message: "Le return est dans la boucle : la fonction s'arrête dès le premier tour." },
            ],
            sortie: "Avant : [12, 9, 15]\nAprès : [14, 11, 17]\nMême liste ? False",
            tests: `_c = [12, 9, 15]\n_r = augmenter(_c, 2)\nassert _c == [12, 9, 15], "augmenter ne doit pas modifier la liste reçue"\nassert _r == [14, 11, 17], "augmenter([12, 9, 15], 2) doit renvoyer [14, 11, 17]"`,
          },
          felicitation: "Un deux-points, un return mal placé, un alias : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde la fin de la ligne <code>def</code>.",
            "Ensuite, une seule note est augmentée : le <code>return</code> est indenté dans la boucle, il interrompt la fonction au premier tour.",
            "Enfin, <code>classe</code> est modifiée et la dernière ligne affiche <code>True</code> : <code>resultat</code> doit être une copie de <code>notes</code>, pas un alias.",
          ],
        },

        {
          id: "a7",
          type: "code",
          titre: "Copier une matrice",
          contenu: `
            <p><strong>1.</strong> Exécute d'abord le code de départ : on copie une
            matrice avec <code>copy()</code>, puis on modifie la copie. Observe ce qui
            arrive à l'original.</p>
            <p><strong>2.</strong> Écris la fonction <code>copier_matrice(M)</code>, qui
            renvoie une copie <strong>vraiment</strong> indépendante de <code>M</code> :
            modifier une case de la copie ne doit jamais toucher l'original.</p>`,
          depart: `M = [[1, 2], [3, 4]]\n\n# Observe d'abord ce que donne une copie « ordinaire » :\nN = M.copy()\nN[0][1] = 99\nprint("M vaut", M, "après avoir modifié N...")\n\n\ndef copier_matrice(M):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+copier_matrice[\\s\\S]*\\breturn\\b", message: "copier_matrice doit renvoyer la nouvelle matrice." },
            ],
            tests: `_m = [[1, 2], [3, 4]]\n_c = copier_matrice(_m)\nassert _c == [[1, 2], [3, 4]], "la copie doit avoir le même contenu que l'original"\n_c[0][1] = 99\nassert _m == [[1, 2], [3, 4]], "modifier une case de la copie ne doit pas toucher l'original : chaque ligne doit être copiée"\n_c.append([5, 6])\nassert len(_m) == 2, "ajouter une ligne à la copie ne doit pas toucher l'original"\nassert copier_matrice([[7, 8, 9]]) == [[7, 8, 9]], "la fonction doit marcher pour n'importe quelles dimensions"`,
          },
          felicitation: "Une copie ligne par ligne : enfin indépendante. 🧬",
          indices: [
            "<code>copy()</code> fabrique une nouvelle liste extérieure… mais ses éléments, les lignes, sont les mêmes listes que dans l'original.",
            "Il faut donc une copie de <strong>chaque ligne</strong> : une compréhension qui parcourt les lignes de <code>M</code> et range dans la nouvelle matrice la copie de chacune.",
          ],
          apres: `<span class="chapo">Copie superficielle</span>
            <code>M.copy()</code> recopie la liste des lignes, mais chaque ligne reste
            <strong>partagée</strong> entre les deux matrices : c'est une <strong>copie
            superficielle</strong>. Pour une matrice, il faut recopier chaque ligne :
            <code>[ligne.copy() for ligne in M]</code>.`,
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
          titre: "Modifier ou renvoyer",
          contenu: `
            <p>Écris deux fonctions qui ajoutent <code>x</code> à chaque élément d'une
            liste, mais de deux façons opposées :</p>
            <ul>
              <li><code>ajouter_partout(L, x)</code> <strong>modifie</strong> la liste reçue
              et ne renvoie rien ;</li>
              <li><code>avec_ajout(L, x)</code> <strong>renvoie</strong> une nouvelle liste
              et laisse <code>L</code> intacte.</li>
            </ul>
            <pre class="bloc-code"><code>L = [1, 2, 3]
ajouter_partout(L, 10)      # L vaut maintenant [11, 12, 13]
M = avec_ajout(L, 1)        # M vaut [12, 13, 14], L n'a pas bougé</code></pre>`,
          depart: `def ajouter_partout(L, x):\n    pass\n\n\ndef avec_ajout(L, x):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+avec_ajout[\\s\\S]*\\breturn\\b", message: "avec_ajout doit renvoyer la nouvelle liste." },
            ],
            tests: `_l = [1, 2, 3]\n_r = ajouter_partout(_l, 10)\nassert _l == [11, 12, 13], "ajouter_partout doit modifier la liste reçue"\nassert _r is None, "ajouter_partout modifie la liste et ne renvoie rien"\n_m = avec_ajout(_l, 1)\nassert _m == [12, 13, 14], "avec_ajout([11, 12, 13], 1) doit renvoyer [12, 13, 14]"\nassert _l == [11, 12, 13], "avec_ajout ne doit pas modifier la liste reçue"`,
          },
          felicitation: "Modifier sur place ou renvoyer du neuf : tu choisis en connaissance de cause. ⚖️",
          indices: [
            "<code>ajouter_partout</code> écrit dans les cases de <code>L</code> : parcours par indice, sans <code>return</code>.",
            "<code>avec_ajout</code> fabrique une nouvelle liste, par exemple en compréhension, et la renvoie.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "La rotation",
          contenu: `
            <p>Écris la fonction <code>rotation(L)</code>, qui renvoie une
            <strong>nouvelle</strong> liste : le dernier élément de <code>L</code> passe en
            tête, et les autres se décalent d'un cran vers la droite. <code>L</code> ne
            doit pas être modifiée. On suppose <code>L</code> non vide.</p>
            <pre class="bloc-code"><code>rotation([1, 2, 3, 4])    # renvoie [4, 1, 2, 3]
rotation(["a"])           # renvoie ["a"]</code></pre>`,
          depart: `def rotation(L):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la nouvelle liste." },
            ],
            tests: `_l = [1, 2, 3, 4]\nassert rotation(_l) == [4, 1, 2, 3], "rotation([1, 2, 3, 4]) doit renvoyer [4, 1, 2, 3]"\nassert _l == [1, 2, 3, 4], "rotation ne doit pas modifier la liste reçue"\nassert rotation(["a"]) == ["a"], "avec un seul élément, la liste ne change pas"\nassert rotation([5, 6]) == [6, 5], "rotation([5, 6]) doit renvoyer [6, 5]"`,
          },
          felicitation: "Une nouvelle liste, l'original intact : le dernier est passé premier. 🔁",
          indices: [
            "La nouvelle liste commence par le dernier élément de <code>L</code> : prépare-la avec cet élément seul.",
            "Ajoute-lui ensuite, dans l'ordre, tous les éléments de <code>L</code> sauf le dernier : leurs indices vont de 0 à <code>len(L) - 2</code>.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Montre le piège",
          contenu: `
            <p>Écris un petit programme qui <strong>démontre</strong> le piège de l'alias à
            quelqu'un qui ne le connaît pas, avec les données de ton choix :</p>
            <ul>
              <li>crée une liste, puis un alias et une vraie copie de cette liste ;</li>
              <li>modifie la liste à travers l'alias ;</li>
              <li>affiche les trois variables, et le résultat d'au moins une comparaison
              avec <code>is</code>.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\.\\s*copy\\s*\\(\\s*\\)|\\[\\s*:\\s*\\]|\\blist\\s*\\(", message: "Crée une vraie copie : copy(), [:] ou list()." },
              { motif: "^\\s*\\w+\\s*=\\s*\\w+\\s*$", message: "Crée un alias : une affectation d'une variable à une autre, comme M = L.", options: "m" },
              { motif: "\\bis\\b", message: "Affiche au moins une comparaison avec is." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Tu sais montrer le piège : c'est que tu l'as compris. ✨",
          indices: [
            "Trois lignes de départ : la liste, l'alias par une simple affectation, la copie avec <code>copy()</code>.",
            "Puis une affectation dans une case de l'alias, et des <code>print</code> pour les trois variables et pour une comparaison <code>is</code>.",
          ],
        },
      ],
    },
  ],
};

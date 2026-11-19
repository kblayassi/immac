/* NSI Terminale — chapitre 1, séance 5 : la même file, trois fois.
 *
 * C'est l'exemple que le programme officiel cite nommément : « l'abstraction
 * des structures de données est introduite après plusieurs implémentations
 * d'une structure simple comme la file (avec un tableau ou avec deux piles) ».
 *
 * Trois implémentations nommées :
 *   - « par tableau »    : celle de la séance 4, reprise pour être MESURÉE ;
 *   - « circulaire »     : tableau de taille fixe, deux indices, pas un décalage ;
 *   - « par deux piles » : une pile d'entrée, une pile de sortie, coût amorti.
 *
 * La séance introduit la mesure du coût — un compteur de cases déplacées — et
 * c'est la première fois du chapitre qu'on compare des implémentations avec des
 * chiffres plutôt qu'avec des mots.
 *
 * Règles de rédaction : voir l'en-tête de s01.js. En particulier, `apres` est
 * DÉJÀ un encadré : ne jamais en imbriquer un dedans.
 */

export default {
  id: "s05",
  numero: 5,
  titre: "La même file, trois fois",
  sousTitre: "Même contrat, trois intérieurs, et des prix qui n'ont rien à voir",
  palier: "Partie 3 — Plusieurs implémentations",

  accroche: `Tu as constaté à la séance 4 que les deux façons évidentes de poser une file
    sur un tableau sont mauvaises, chacune à un bout. On va d'abord <strong>mesurer</strong>
    à quel point, puis écrire deux implémentations qui règlent le problème — dont une qui
    n'utilise aucun tableau, seulement deux piles.`,

  objectifs: [
    "<strong>mesurer</strong> le coût d'une implémentation, au lieu de le supposer",
    "écrire une file sur un <strong>tableau circulaire</strong>",
    "écrire une file avec <strong>deux piles</strong>",
    "comprendre ce qu'est un coût <strong>amorti</strong>",
  ],

  motDeLaFin: `Trois implémentations, un seul contrat, et des clients qui n'ont pas bougé
    d'une ligne. À la séance 6, on change de support : plus de tableau du tout, mais des
    maillons reliés un à un — et l'on verra ce que le chaînage rend enfin gratuit.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "mesurer d'abord, réparer ensuite",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Le problème qu'on va résoudre",
          contenu: `
            <p>Reprenons le constat de la séance 4. Une file a <strong>deux</strong>
            extrémités actives ; un tableau Python n'en a qu'une de bon marché.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Implémentation</th><th><code>enfiler</code></th><th><code>defiler</code></th></tr>
              <tr><td>« entrée en fin »</td><td><code>append</code> — immédiat</td><td><code>pop(0)</code> — <strong>décale tout</strong></td></tr>
              <tr><td>« entrée en tête »</td><td><code>insert(0, …)</code> — <strong>décale tout</strong></td><td><code>pop()</code> — immédiat</td></tr>
            </table>
            </div>

            <p>« Décale tout » est resté jusqu'ici une formule. Cette séance commence par lui
            donner un chiffre.</p>

            <div class="encadre">
              <span class="chapo">Compter, et compter quoi</span>
              Mesurer le temps d'un programme avec un chronomètre dépend de la machine, de
              ce qui tourne à côté, du navigateur. On compte donc plutôt des
              <strong>opérations élémentaires</strong> : ici, le nombre de cases que la
              machine doit déplacer en mémoire. C'est une mesure qui ne dépend d'aucun
              matériel, et c'est celle que le baccalauréat attend.
            </div>

            <p>Ensuite, deux réparations, et elles ne se ressemblent pas :</p>

            <ul>
              <li>le <strong>tableau circulaire</strong> — on garde un tableau, mais on
              cesse de décaler quoi que ce soit : ce sont les <em>indices</em> qui se
              déplacent, et le tableau se referme sur lui-même ;</li>
              <li>la file <strong>par deux piles</strong> — on abandonne le tableau, et l'on
              bâtit la file sur la structure de la séance 3. C'est l'exemple que le
              programme officiel cite nommément.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ce qui ne change pas</span>
              Les quatre opérations, leurs noms, leurs promesses. Un programme client écrit
              à la séance 4 devra fonctionner sur les trois implémentations sans qu'on y
              touche — et tu le vérifieras à chaque fois.
            </div>`,
          libelleBouton: "Aller mesurer →",
        },

        {
          id: "d2",
          type: "code",
          titre: "Mettre un chiffre sur « décale tout »",
          contenu: `
            <p>L'implémentation « entrée en fin » de la séance 4 t'est donnée, avec un
            <strong>compteur</strong> en plus : <code>COUT</code> retient le nombre total de
            cases déplacées depuis le début.</p>

            <p>Écris <code>mesurer(n)</code> : elle remet le compteur à zéro, fait arriver
            <code>n</code> clients, les sert tous les <code>n</code>, et renvoie le nombre de
            cases déplacées.</p>

            <p>Les trois appels du bas doivent alors afficher :</p>
            <pre class="bloc-code"><code>n = 10 : 45 cases déplacées
n = 50 : 1225 cases déplacées
n = 100 : 4950 cases déplacées</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi <code>COUT</code> est une liste d'un seul nombre</span>
              Exactement pour la raison vue à la séance 1 avec la tirelire : une fonction ne
              peut pas modifier un nombre qu'on lui a donné, mais elle peut modifier une
              liste. <code>COUT[0] = COUT[0] + 1</code> se voit de l'extérieur ;
              <code>COUT = COUT + 1</code> ne se verrait pas.
            </div>`,
          nomFichier: "mesure.py",
          depart: `# ---- L'implémentation « par tableau », instrumentée. N'y touche pas. ----\n\nCOUT = [0]        # nombre de cases déplacées depuis le début\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)              # on écrit au bout : aucune case ne bouge\n\ndef defiler(f):\n    COUT[0] = COUT[0] + len(f) - 1  # pop(0) recolle tout le reste\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de cases deplacees par n arrivees puis n departs.\n\n    Le compteur est remis a zero au debut.\n    """\n    pass\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 10 :", mesurer(10), "cases déplacées")\nprint("n = 50 :", mesurer(50), "cases déplacées")\nprint("n = 100 :", mesurer(100), "cases déplacées")\n`,
          validation: {
            codeContient: [
              { motif: "\\bCOUT\\s*\\[\\s*0\\s*\\]\\s*=\\s*0", message: "mesurer() doit remettre le compteur à zéro avant de commencer." },
              { motif: "\\benfiler\\s*\\([\\s\\S]*\\benfiler\\s*\\(", message: "Les n clients doivent arriver par enfiler()." },
              { motif: "\\bdefiler\\s*\\([\\s\\S]*\\bdefiler\\s*\\(", message: "Et repartir par defiler()." },
            ],
            sortie: "n = 10 : 45 cases déplacées\nn = 50 : 1225 cases déplacées\nn = 100 : 4950 cases déplacées",
            tests: `assert mesurer(0) == 0, "Sans aucun client, rien ne se déplace."\nassert mesurer(1) == 0, "Un seul client : quand on le sert, il n'y a rien derrière lui à recoller."\nassert mesurer(2) == 1, "Deux clients : servir le premier fait reculer le second d'une case."\nassert mesurer(3) == 3, "Trois clients : 2 cases, puis 1, puis 0."\nassert mesurer(10) == 45, "Dix clients : 9 + 8 + ... + 1 + 0."\nassert mesurer(100) == 4950, "Cent clients."\nassert mesurer(10) == 45, "Deux mesures de suite doivent donner le même résultat : le compteur est bien remis à zéro."`,
          },
          felicitation: "Le coût n'est plus une impression : c'est un nombre. 📏",
          indices: [
            "Trois temps dans la fonction : remettre le compteur à zéro, faire arriver les clients, les servir tous.",
            "Deux boucles <code>for</code> de <code>n</code> tours, l'une après l'autre — pas l'une dans l'autre.",
            "La valeur à renvoyer est ce que contient le compteur à la fin, c'est-à-dire <code>COUT[0]</code>.",
          ],
          solution: `# ---- L'implémentation « par tableau », instrumentée. N'y touche pas. ----\n\nCOUT = [0]        # nombre de cases déplacées depuis le début\n\ndef file_vide():\n    return []\n\ndef est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)              # on écrit au bout : aucune case ne bouge\n\ndef defiler(f):\n    COUT[0] = COUT[0] + len(f) - 1  # pop(0) recolle tout le reste\n    return f.pop(0)\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de cases deplacees par n arrivees puis n departs.\n\n    Le compteur est remis a zero au debut.\n    """\n    COUT[0] = 0\n    f = file_vide()\n    for i in range(n):\n        enfiler(f, i)\n    for i in range(n):\n        defiler(f)\n    return COUT[0]\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 10 :", mesurer(10), "cases déplacées")\nprint("n = 50 :", mesurer(50), "cases déplacées")\nprint("n = 100 :", mesurer(100), "cases déplacées")\n`,
          apres: `<span class="chapo">Ce que ces trois nombres disent</span>
            Servir dix clients a demandé 45 déplacements ; en servir cent en a demandé 4950.
            Le nombre de clients a été multiplié par 10, le travail par 110. Ce n'est pas une
            petite lenteur : c'est un changement de nature, et l'étape suivante lui donne
            son nom.`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Lire une mesure",
          contenu: `
            <p>Les trois mesures que tu viens d'obtenir :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Clients servis</th><th>Cases déplacées</th></tr>
              <tr><td>10</td><td>45</td></tr>
              <tr><td>50</td><td>1 225</td></tr>
              <tr><td>100</td><td>4 950</td></tr>
            </table>
            </div>
            <p>Le passage de 50 à 100 clients double le nombre de clients.</p>`,
          question: "Par combien le travail est-il multiplié quand on double le nombre de clients ?",
          options: [
            { texte: "Par 4, environ — le travail croît comme le <strong>carré</strong> du nombre de clients.", correct: true,
              explication: "Oui : 4950 ÷ 1225 ≈ 4. En effet, servir le k-ième client depuis la fin coûte k déplacements, et la somme 1 + 2 + … + n vaut n(n−1)/2 — un demi-carré. On dit que le coût est <strong>quadratique</strong>." },
            { texte: "Par 2 — deux fois plus de clients, deux fois plus de travail.",
              explication: "Ce serait le cas si chaque client coûtait la même chose. Ici, plus la file est longue, plus servir un client coûte cher : les deux facteurs se multiplient." },
            { texte: "Par 10, comme entre la première et la troisième ligne.",
              explication: "Entre 10 et 100 clients, le facteur est 10 sur les clients et 110 sur le travail. Entre 50 et 100, le facteur sur les clients n'est que de 2." },
            { texte: "Cela dépend de la machine.",
              explication: "Non, et c'est tout l'intérêt de compter des cases plutôt que des secondes : le nombre de déplacements est le même sur n'importe quel ordinateur." },
          ],
          apres: `<span class="chapo">Linéaire, quadratique</span>
            Retiens les deux mots, ils reviendront tout le reste de l'année.
            <ul>
              <li>Un coût <strong>linéaire</strong> double quand les données doublent. C'est
              le cas d'un parcours : chaque élément est vu une fois.</li>
              <li>Un coût <strong>quadratique</strong> est multiplié par quatre quand les
              données doublent. C'est ce qu'on vient de mesurer.</li>
            </ul>
            La différence est invisible sur dix éléments et rédhibitoire sur un million :
            un parcours linéaire d'un million d'éléments se compte en millions d'opérations,
            un traitement quadratique en milliers de milliards. Pour une file d'attente de
            serveur qui reçoit des milliers de requêtes, ce n'est pas un détail — c'est la
            différence entre un service qui répond et un service qui tombe.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "L'idée du tableau circulaire",
          contenu: `
            <p>Pourquoi <code>pop(0)</code> coûte-t-il si cher ? Parce qu'il tient à ce que
            le premier élément reste dans la case 0. Tout le reste doit donc reculer.</p>

            <p>Renonçons-y. Le tableau garde ses éléments <strong>où ils sont</strong>, et
            l'on retient simplement <strong>où commence la file</strong>.</p>

            <pre class="bloc-code"><code>capacité 6, la file contient c, d, e

      0     1     2     3     4     5
   ┌─────┬─────┬─────┬─────┬─────┬─────┐
   │  ·  │  ·  │  c  │  d  │  e  │  ·  │
   └─────┴─────┴─────┴─────┴─────┴─────┘
                  ▲                 ▲
               premier = 2      la prochaine place libre
                                (2 + 3) modulo 6 = 5</code></pre>

            <p>Défiler ne déplace plus rien : on lit la case <code>premier</code>, puis on
            avance <code>premier</code> d'un cran. Enfiler écrit dans la première case libre,
            qui se calcule.</p>

            <p>Et quand on arrive au bout du tableau ? <strong>On repart à zéro.</strong>
            C'est ce qui fait que le tableau se comporte comme un anneau :</p>

            <pre class="bloc-code"><code>      0     1     2     3     4     5
   ┌─────┬─────┬─────┬─────┬─────┬─────┐
   │  g  │  ·  │  ·  │  d  │  e  │  f  │
   └─────┴─────┴─────┴─────┴─────┴─────┘
      ▲                 ▲
   le g a « fait      premier = 3
   le tour »</code></pre>

            <div class="encadre">
              <span class="chapo">L'opérateur qui fait le tour</span>
              <code>%</code> donne le reste d'une division entière. Quand un indice
              atteindrait la capacité, <code>indice % capacite</code> le ramène à 0 :
              <code>5 % 6</code> vaut 5, mais <code>6 % 6</code> vaut 0 et
              <code>7 % 6</code> vaut 1. C'est tout le mécanisme de l'anneau.
            </div>

            <p>Une file circulaire retient donc <strong>trois choses</strong> :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Champ</th><th>Ce qu'il contient</th></tr>
              <tr><td><code>f[0]</code></td><td>le tableau, de taille fixe</td></tr>
              <tr><td><code>f[1]</code></td><td>l'indice du <strong>premier</strong> élément</td></tr>
              <tr><td><code>f[2]</code></td><td>le <strong>nombre</strong> d'éléments présents</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi un compteur, et pas un second indice</span>
              On pourrait retenir « l'indice du premier » et « l'indice de la prochaine place
              libre ». Mais alors, quand les deux indices sont égaux, impossible de savoir si
              la file est <strong>vide</strong> ou <strong>pleine</strong> : les deux
              situations se ressemblent. Le compteur lève l'ambiguïté, et donne
              <code>longueur</code> gratuitement.
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Où sont passés les éléments ?",
          contenu: `
            <p>Voici une suite d'opérations sur une file circulaire de capacité
            <strong>4</strong>. Rappel de la représentation :
            <code>[tableau, premier, nombre]</code>, et les cases jamais écrites valent
            <code>None</code>.</p>
            <p>Suis les trois champs ligne à ligne, sans rien exécuter.</p>`,
          code: `f = file_vide(4)\nenfiler(f, "a")\nenfiler(f, "b")\nenfiler(f, "c")\ndefiler(f)\ndefiler(f)\nenfiler(f, "d")\nenfiler(f, "e")\n\nprint(f)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>[['e', 'b', 'c', 'd'], 2, 3]</code>", correct: true,
              explication: "Oui. Après deux départs, <code>premier</code> vaut 2. Le <code>d</code> a pris la case 3 ; le <code>e</code> aurait dû prendre la case 4, qui n'existe pas — il a donc fait le tour et s'est écrit en case 0, par-dessus le <code>a</code>." },
            { texte: "<code>[['c', 'd', 'e', None], 0, 3]</code>",
              explication: "Ce serait le cas si défiler décalait les éléments vers la gauche — c'est précisément ce qu'on cherche à éviter. Ici, rien ne bouge : seuls les indices changent." },
            { texte: "<code>[[None, None, 'c', 'd'], 2, 2]</code>",
              explication: "Il y a bien eu trois arrivées et deux départs au début, mais deux arrivées ensuite : la file contient trois éléments, pas deux. Et le <code>e</code> est quelque part." },
            { texte: "<code>[['e', None, 'c', 'd'], 2, 3]</code>",
              explication: "Presque. Mais rien n'efface jamais une case : le <code>b</code> de la case 1 est encore écrit, il ne fait simplement plus partie de la file." },
          ],
          apres: `<span class="chapo">Le tableau ment, les indices disent la vérité</span>
            Le <code>b</code> est toujours visible en case 1, et il ne compte plus pour
            personne. C'est normal, et c'est même le principe : <strong>défiler n'efface
            rien</strong>, il avance seulement <code>premier</code>.
            <br><br>
            Ce qui définit le contenu de la file, ce n'est donc pas le tableau — c'est le
            couple <code>(premier, nombre)</code>. Retiens-le : quand tu déboguera une file
            circulaire, regarde les indices avant de regarder les cases.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "La file circulaire : créer et interroger",
          contenu: `
            <p>Écris les trois opérations les plus simples de l'implémentation
            <strong>« circulaire »</strong>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th></tr>
              <tr><td><code>file_vide(capacite)</code></td><td>une file vide, dont le tableau a <code>capacite</code> cases</td></tr>
              <tr><td><code>est_vide(f)</code></td><td><code>True</code> si la file ne contient aucun élément</td></tr>
              <tr><td><code>est_pleine(f)</code></td><td><code>True</code> si elle ne peut plus rien accepter</td></tr>
            </table>
            </div>

            <p>Une file neuve de capacité 3 doit valoir exactement
            <code>[[None, None, None], 0, 0]</code>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux rappels</span>
              <code>[None] * capacite</code> fabrique un tableau de <code>capacite</code>
              cases toutes à <code>None</code>. Et <code>len(f[0])</code> donne la capacité —
              elle n'a pas besoin d'être rangée à part.
            </div>`,
          nomFichier: "circulaire.py",
          depart: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    """Renvoie une file vide pouvant contenir au plus capacite elements."""\n    pass\n\ndef est_vide(f):\n    pass\n\ndef est_pleine(f):\n    pass\n`,
          validation: {
            tests: `f = file_vide(3)\nassert f == [[None, None, None], 0, 0], "Une file neuve de capacité 3 : trois cases vides, premier à 0, zéro élément."\nassert est_vide(f) == True, "Le compteur vaut zéro : la file est vide."\nassert est_pleine(f) == False, "Zéro élément sur trois possibles : elle n'est pas pleine."\ng = file_vide(1)\nassert g == [[None], 0, 0], "Une capacité de 1 donne un tableau d'une seule case."\nassert est_vide(g) == True, "..."\nassert est_pleine(g) == False, "..."\nh = file_vide(5)\nh[2] = 5\nassert est_pleine(h) == True, "Cinq éléments sur une capacité de 5 : la file est pleine."\nassert est_vide(h) == False, "..."\nh[2] = 2\nassert est_pleine(h) == False, "Deux éléments sur cinq : il reste de la place."\nassert est_vide(h) == False, "Et elle n'est pas vide non plus."\nh[1] = 4\nassert est_pleine(h) == False, "L'indice du premier ne doit jouer aucun rôle dans ces deux réponses."\nassert est_vide(h) == False, "Seul le compteur compte."`,
          },
          felicitation: "Les trois champs sont en place. Reste à les faire tourner. ⚙️",
          indices: [
            "Une file neuve, ce sont trois choses : un tableau de cases vides, un indice de départ, et un compteur — dans cet ordre, rangés dans une liste.",
            "<code>est_vide</code> et <code>est_pleine</code> ne regardent <strong>que le compteur</strong> : l'indice du premier ne les concerne pas.",
            "Pour <code>est_pleine</code>, il faut comparer le compteur à la capacité, que <code>len</code> donne à partir du tableau.",
          ],
          solution: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    """Renvoie une file vide pouvant contenir au plus capacite elements."""\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef est_pleine(f):\n    return f[2] == len(f[0])\n`,
        },

        {
          id: "d7",
          type: "code",
          titre: "La file circulaire : entrer et sortir",
          contenu: `
            <p>Les deux opérations qui font tout le travail. Aucune des deux ne doit déplacer
            la moindre case du tableau.</p>

            <ul>
              <li><code>enfiler(f, element)</code> écrit dans la première place libre, puis
              augmente le compteur. Précondition : la file n'est pas pleine.</li>
              <li><code>defiler(f)</code> lit la case <code>premier</code>, avance
              <code>premier</code> d'un cran, diminue le compteur, et renvoie l'élément.
              Précondition : la file n'est pas vide.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les deux calculs d'indice</span>
              La première place libre est à <code>premier + nombre</code> crans du début du
              tableau. Et avancer <code>premier</code>, c'est lui ajouter 1. Dans les deux
              cas, l'indice obtenu peut dépasser la capacité : c'est là que
              <code>% len(f[0])</code> intervient pour le ramener dans le tableau.
            </div>`,
          nomFichier: "circulaire.py",
          depart: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    """Renvoie une file vide pouvant contenir au plus capacite elements."""\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef est_pleine(f):\n    return f[2] == len(f[0])\n\n\n# ---- À toi. ----\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file.\n\n    Precondition : la file n'est pas pleine.\n    """\n    pass\n\ndef defiler(f):\n    """Renvoie le premier element arrive, et le retire.\n\n    Precondition : la file n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "%", message: "Sans l'opérateur %, les indices sortiront du tableau : c'est lui qui fait le tour." },
            ],
            tests: `f = file_vide(4)\nenfiler(f, "a")\nassert f == [["a", None, None, None], 0, 1], "Le premier arrivé s'écrit en case 0."\nenfiler(f, "b")\nenfiler(f, "c")\nassert f == [["a", "b", "c", None], 0, 3], "Les suivants occupent les cases 1 et 2, et premier ne bouge pas."\nassert defiler(f) == "a", "On sert le premier arrivé."\nassert f[1] == 1, "premier avance d'un cran."\nassert f[2] == 2, "Et le compteur redescend."\nassert f[0][0] == "a", "Défiler n'efface rien : la case 0 contient toujours 'a'."\nassert defiler(f) == "b", "..."\nenfiler(f, "d")\nenfiler(f, "e")\nassert f == [["e", "b", "c", "d"], 2, 3], "Le e a fait le tour : la case 3 étant prise, il s'écrit en case 0."\nassert defiler(f) == "c", "L'ordre d'arrivée est respecté malgré le tour."\nassert defiler(f) == "d", "..."\nassert defiler(f) == "e", "..."\nassert est_vide(f) == True, "Tout le monde a été servi."\ng = file_vide(3)\nfor tour in range(10):\n    enfiler(g, tour)\n    assert defiler(g) == tour, "Une file d'un seul élément doit tourner indéfiniment sans se perdre."\nassert est_vide(g) == True, "..."\nh = file_vide(2)\nenfiler(h, 1)\nenfiler(h, 2)\nassert est_pleine(h) == True, "Deux éléments dans une capacité de 2."\nassert defiler(h) == 1, "..."\nenfiler(h, 3)\nassert est_pleine(h) == True, "La place libérée est aussitôt réutilisable."\nassert defiler(h) == 2, "..."\nassert defiler(h) == 3, "..."`,
          },
          felicitation: "Une file qui ne déplace plus jamais une seule case. 🔄",
          indices: [
            "<code>enfiler</code> tient en trois lignes : calculer la place, y écrire, augmenter le compteur.",
            "<code>defiler</code> en tient quatre : lire la case <code>f[1]</code>, faire avancer <code>f[1]</code>, diminuer <code>f[2]</code>, renvoyer ce qu'on a lu. Attention à lire <strong>avant</strong> de faire avancer.",
            "Dans les deux cas, l'indice calculé doit être ramené dans le tableau : c'est <code>% len(f[0])</code> qui s'en charge. Et surtout, ne touche jamais à une case autre que celle que tu vises.",
          ],
          solution: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    """Renvoie une file vide pouvant contenir au plus capacite elements."""\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef est_pleine(f):\n    return f[2] == len(f[0])\n\n\n# ---- À toi. ----\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file.\n\n    Precondition : la file n'est pas pleine.\n    """\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\ndef defiler(f):\n    """Renvoie le premier element arrive, et le retire.\n\n    Precondition : la file n'est pas vide.\n    """\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n`,
          apres: `<span class="chapo">Compte les opérations, maintenant</span>
            <code>enfiler</code> : une addition, un modulo, une écriture, une addition.
            <code>defiler</code> : une lecture, une addition, un modulo, une soustraction.
            <br><br>
            Quatre opérations chacune — et surtout, <strong>toujours les mêmes quatre</strong>,
            que la file contienne trois éléments ou trois millions. C'est ce qu'on appelle un
            coût <strong>constant</strong>, et c'est le mieux qu'on puisse espérer. Le 4950
            de tout à l'heure devient 0.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Vérifier que le client n'a rien vu",
          contenu: `
            <p>Une implémentation qui tient ses promesses doit faire tourner, sans une
            retouche, les fonctions clientes écrites pour une autre.</p>

            <p>Écris <code>longueur(f)</code> et <code>vers_tableau(f)</code> —
            <strong>exactement</strong> celles de la séance 4, qui n'utilisent que l'interface
            et ignorent tout de la forme de la file.</p>

            <ul>
              <li><code>longueur(f)</code> renvoie le nombre d'éléments et laisse la file
              intacte ;</li>
              <li><code>vers_tableau(f)</code> renvoie le tableau des éléments dans l'ordre de
              service, et laisse la file intacte.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle du jeu</span>
              Interdiction d'écrire <code>f[0]</code>, <code>f[1]</code> ou <code>f[2]</code>.
              Ces fonctions doivent pouvoir être recopiées telles quelles au-dessus de
              n'importe laquelle des trois implémentations de la séance.
              <br><br>
              Il te faudra donc une file auxiliaire — et, puisque la file circulaire a une
              capacité, pense à lui en donner une suffisante.
            </div>`,
          nomFichier: "clients.py",
          depart: `# ---- L'implémentation « circulaire ». N'y touche pas. ----\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(file):\n    return file[2] == 0\n\ndef est_pleine(file):\n    return file[2] == len(file[0])\n\ndef enfiler(file, element):\n    place = (file[1] + file[2]) % len(file[0])\n    file[0][place] = element\n    file[2] = file[2] + 1\n\ndef defiler(file):\n    element = file[0][file[1]]\n    file[1] = (file[1] + 1) % len(file[0])\n    file[2] = file[2] - 1\n    return element\n\n\n# ---- À toi : deux clients, qui ne regardent pas dedans. ----\n\ndef longueur(f):\n    """Renvoie le nombre d'elements de f. Effet : f est inchangee."""\n    pass\n\ndef vers_tableau(f):\n    """Renvoie le tableau des elements de f, dans l'ordre de service.\n\n    Effet : f est inchangee.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bf\\s*\\[", message: "Un client ne connaît pas la forme de la file : passe par est_vide(), enfiler() et defiler()." },
            ],
            tests: `f = file_vide(10)\nassert longueur(f) == 0, "Une file vide a une longueur de 0."\nassert vers_tableau(f) == [], "Et donne un tableau vide."\nfor v in [5, 8, 2]:\n    enfiler(f, v)\nassert longueur(f) == 3, "Trois arrivées."\nassert longueur(f) == 3, "Deux appels de suite : la file doit être restaurée."\nassert vers_tableau(f) == [5, 8, 2], "Les éléments dans l'ordre de service."\nassert vers_tableau(f) == [5, 8, 2], "Là aussi, deux fois de suite."\nassert defiler(f) == 5, "Après ces appels, le premier servi est toujours le 5."\nassert defiler(f) == 8, "Et l'ordre est préservé."\nassert defiler(f) == 2, "..."\nassert est_vide(f) == True, "..."\ng = file_vide(4)\nfor v in ["a", "b", "c"]:\n    enfiler(g, v)\ndefiler(g)\nenfiler(g, "d")\nenfiler(g, "e")\nassert vers_tableau(g) == ["b", "c", "d", "e"], "Les clients doivent marcher même quand la file a fait le tour du tableau."\nassert longueur(g) == 4, "..."\nassert defiler(g) == "b", "Et la file doit être intacte après tout cela."`,
          },
          felicitation: "Les clients de la séance 4 tournent sur la circulaire sans une retouche. 🎯",
          indices: [
            "Reprends exactement les fonctions de la séance 4 : un transfert vers une file auxiliaire, puis un transfert retour.",
            "Ici <code>file_vide</code> réclame une capacité. Donne-lui la même que celle de <code>f</code> — mais tu n'as pas le droit de la lire… alors donne-lui simplement une capacité largement suffisante.",
            "Un transfert de file à file conserve l'ordre : un aller, un retour, et <code>f</code> ressort identique. Le travail se fait pendant l'aller.",
          ],
          solution: `# ---- L'implémentation « circulaire ». N'y touche pas. ----\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(file):\n    return file[2] == 0\n\ndef est_pleine(file):\n    return file[2] == len(file[0])\n\ndef enfiler(file, element):\n    place = (file[1] + file[2]) % len(file[0])\n    file[0][place] = element\n    file[2] = file[2] + 1\n\ndef defiler(file):\n    element = file[0][file[1]]\n    file[1] = (file[1] + 1) % len(file[0])\n    file[2] = file[2] - 1\n    return element\n\n\n# ---- À toi : deux clients, qui ne regardent pas dedans. ----\n\ndef longueur(f):\n    """Renvoie le nombre d'elements de f. Effet : f est inchangee."""\n    auxiliaire = file_vide(1000)\n    n = 0\n    while not est_vide(f):\n        enfiler(auxiliaire, defiler(f))\n        n = n + 1\n    while not est_vide(auxiliaire):\n        enfiler(f, defiler(auxiliaire))\n    return n\n\ndef vers_tableau(f):\n    """Renvoie le tableau des elements de f, dans l'ordre de service.\n\n    Effet : f est inchangee.\n    """\n    auxiliaire = file_vide(1000)\n    t = []\n    while not est_vide(f):\n        x = defiler(f)\n        t.append(x)\n        enfiler(auxiliaire, x)\n    while not est_vide(auxiliaire):\n        enfiler(f, defiler(auxiliaire))\n    return t\n`,
          apres: `<span class="chapo">La fissure dans le contrat</span>
            Tu as dû choisir une capacité au jugé pour la file auxiliaire, et c'est gênant :
            un client honnête a été obligé de <em>deviner</em> quelque chose sur
            l'implémentation.
            <br><br>
            C'est le signe que l'interface a changé sans le dire. <code>file_vide()</code>
            ne prend pas les mêmes arguments que <code>file_vide(capacite)</code> : ce n'est
            plus tout à fait la même structure, c'est une <strong>file bornée</strong>. Le
            contrat a gagné une précondition sur <code>enfiler</code> et une opération,
            <code>est_pleine</code>.
            <br><br>
            Il faut savoir le reconnaître : on ne dit pas qu'une implémentation est fausse
            parce qu'elle impose une contrainte, on dit qu'<strong>elle réalise un autre type
            abstrait</strong>. L'implémentation qui arrive dans les exercices, elle, n'a pas
            ce défaut.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot</th><th>Ce qu'il veut dire</th><th>Si les données doublent</th></tr>
              <tr><td><strong>constant</strong></td><td>le travail ne dépend pas du nombre d'éléments</td><td>il ne change pas</td></tr>
              <tr><td><strong>linéaire</strong></td><td>chaque élément est vu une fois</td><td>il double</td></tr>
              <tr><td><strong>quadratique</strong></td><td>chaque élément est vu une fois par élément</td><td>il quadruple</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">La file circulaire en trois champs</span>
              <pre class="bloc-code"><code>f[0]  le tableau, de taille fixe
f[1]  l'indice du premier élément
f[2]  le nombre d'éléments présents

enfiler  :  place = (f[1] + f[2]) % capacité, on écrit, f[2] augmente
defiler  :  on lit f[1], f[1] avance de 1 modulo capacité, f[2] diminue</code></pre>
              Aucune case ne se déplace jamais : le coût est <strong>constant</strong>.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Oublier le modulo.</strong> Le programme marche jusqu'au jour où
                la file fait le tour, puis lève une <code>IndexError</code> — souvent bien
                après l'écriture du code.</li>
                <li><strong>Faire avancer <code>premier</code> avant d'avoir lu.</strong> On
                renvoie alors l'élément suivant, et le premier est perdu à jamais.</li>
                <li><strong>Croire qu'une case doit être effacée.</strong> Elle ne le sera
                jamais, et ce n'est pas un problème : seul le couple
                <code>(premier, nombre)</code> définit le contenu.</li>
                <li><strong>Se passer du compteur.</strong> Avec deux indices seuls, file
                vide et file pleine deviennent indiscernables.</li>
                <li><strong>Enfiler dans une file pleine.</strong> La précondition est pour
                l'appelant : <code>est_pleine</code> d'abord.</li>
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
      intention: "réparer la circulaire, puis bâtir une file sur deux piles",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Vide ou pleine ?",
          contenu: `
            <p>Imaginons une file circulaire sans compteur, qui retiendrait seulement deux
            indices : <code>premier</code>, et <code>libre</code> — la prochaine place
            disponible.</p>

            <pre class="bloc-code"><code>capacité 4, cas A                 capacité 4, cas B
   ┌────┬────┬────┬────┐             ┌────┬────┬────┬────┐
   │ ·  │ ·  │ ·  │ ·  │             │ w  │ x  │ y  │ z  │
   └────┴────┴────┴────┘             └────┴────┴────┴────┘
     ▲                                 ▲
  premier = libre = 0               premier = libre = 0</code></pre>

            <p>Dans le cas A on vient de créer la file ; dans le cas B on a enfilé quatre
            éléments, et <code>libre</code> a fait le tour complet pour revenir en 0.</p>`,
          question: "Que peut faire le programme pour distinguer ces deux situations ?",
          options: [
            { texte: "Rien : avec ces deux indices seuls, les deux situations sont identiques.", correct: true,
              explication: "Exactement. <code>premier</code> et <code>libre</code> valent 0 dans les deux cas, et le programme n'a aucun autre moyen de savoir. C'est pour cela que notre implémentation retient un <strong>compteur</strong> plutôt qu'un second indice." },
            { texte: "Regarder si les cases valent <code>None</code>.",
              explication: "Cela paraît tentant, mais <code>None</code> pourrait être une valeur légitime rangée par le client — et surtout, défiler n'efface jamais rien : une case « libre » contient encore l'ancienne valeur." },
            { texte: "Comparer <code>premier</code> à la capacité.",
              explication: "<code>premier</code> vaut 0 dans les deux cas, et la capacité 4 dans les deux cas. La comparaison donne la même réponse." },
            { texte: "Interdire que la file soit pleine, en gardant toujours une case libre.",
              explication: "C'est une vraie solution, et certaines bibliothèques la retiennent ! Elle fonctionne, mais elle gaspille une case et complique <code>est_pleine</code>. Le compteur est plus simple, et il donne la longueur en prime." },
          ],
          apres: `<span class="chapo">Ce que le troisième champ achète</span>
            Retenir le nombre d'éléments coûte un entier de plus, et rapporte trois choses :
            <code>est_vide</code>, <code>est_pleine</code> et <code>longueur</code>, toutes
            les trois <strong>immédiates</strong>.
            <br><br>
            Souviens-toi qu'à la séance 4, connaître la longueur d'une file coûtait un
            parcours complet. Ici, c'est une lecture. Choisir ce qu'une structure
            <em>retient</em> est aussi important que choisir comment elle range : un champ
            bien choisi supprime des parcours entiers.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Chasse aux bugs : une circulaire qui déraille",
          contenu: `
            <p>Cette file circulaire contient <strong>trois erreurs de natures
            différentes</strong> :</p>
            <ul>
              <li>une qui plante dès que la file fait le tour du tableau ;</li>
              <li>une qui renvoie le mauvais élément, sans jamais rien signaler ;</li>
              <li>une qui laisse un compteur faux, si bien que la file se croit pleine alors
              qu'elle est vide.</li>
            </ul>
            <p>Répare les trois sans changer la représentation.</p>`,
          nomFichier: "circulaire_cassee.py",
          depart: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef est_pleine(f):\n    return f[2] == len(f[0])\n\ndef enfiler(f, element):\n    place = f[1] + f[2]\n    f[0][place] = element\n    f[2] = f[2] + 1\n\ndef defiler(f):\n    f[1] = (f[1] + 1) % len(f[0])\n    element = f[0][f[1]]\n    f[2] = f[2] + 1\n    return element\n`,
          validation: {
            tests: `f = file_vide(4)\nenfiler(f, "a")\nenfiler(f, "b")\nassert f[2] == 2, "Deux arrivées, deux éléments."\nassert defiler(f) == "a", "defiler() doit renvoyer le premier ARRIVÉ. S'il renvoie 'b', c'est que l'indice avance avant la lecture."\nassert f[2] == 1, "Après un départ il ne reste qu'un élément : le compteur doit DIMINUER."\nassert defiler(f) == "b", "..."\nassert est_vide(f) == True, "La file est vide."\ng = file_vide(3)\nfor v in [1, 2, 3]:\n    enfiler(g, v)\nassert est_pleine(g) == True, "Trois éléments dans une capacité de 3."\nassert defiler(g) == 1, "..."\nenfiler(g, 4)\nassert est_pleine(g) == True, "La place libérée est réutilisable : le 4 doit faire le tour et s'écrire en case 0."\nassert defiler(g) == 2, "..."\nassert defiler(g) == 3, "..."\nassert defiler(g) == 4, "Le 4 ne doit pas s'être perdu."\nassert est_vide(g) == True, "..."\nh = file_vide(2)\nfor tour in range(6):\n    enfiler(h, tour)\n    assert defiler(h) == tour, "La file doit tourner indéfiniment sans jamais sortir du tableau."`,
          },
          felicitation: "Trois bugs, et le premier ne se voit qu'au bout de quelques tours. 🐛",
          indices: [
            "Exécute d'abord avec <strong>▶</strong> : la première erreur se manifeste par une <code>IndexError</code>, et son message dit quel indice sortait du tableau.",
            "Dans <code>defiler</code>, compare l'ordre des deux premières lignes avec ce que dit la spécification : quel élément faut-il lire, et à quel moment l'indice doit-il avancer ?",
            "Toujours dans <code>defiler</code>, regarde le signe de l'opération sur le compteur : un départ fait-il grandir ou rétrécir la file ?",
          ],
          solution: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef est_pleine(f):\n    return f[2] == len(f[0])\n\ndef enfiler(f, element):\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\ndef defiler(f):\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n`,
          apres: `<span class="chapo">Le premier bug est le plus instructif</span>
            <code>place = f[1] + f[2]</code> sans modulo fonctionne parfaitement tant que la
            file n'a pas atteint le bout du tableau. Un programme d'essai court ne le verra
            jamais ; un serveur le verra au bout de quelques heures.
            <br><br>
            C'est le genre d'erreur que seul un <strong>jeu de tests bien choisi</strong>
            attrape : il ne suffit pas d'essayer « ça marche », il faut essayer le cas qui
            fait tourner. Remarque le dernier test ci-dessus — six tours sur une capacité de
            2 — il est là exactement pour cela.`,
        },

        {
          id: "a3",
          type: "prediction",
          titre: "Deux piles dos à dos",
          contenu: `
            <p>Changement complet de support : on abandonne le tableau, et l'on bâtit la file
            sur <strong>deux piles</strong>.</p>

            <p>L'idée tient en une phrase : les arrivants s'empilent d'un côté, les partants
            se dépilent de l'autre — et quand le côté « sortie » est vide, on <strong>verse</strong>
            tout le côté « entrée » dedans.</p>

            <pre class="bloc-code"><code>on enfile a, b, c        puis on verse             on peut défiler
  entrée   sortie          entrée   sortie          entrée   sortie
    c        ·                ·       a                ·       a
    b        ·                ·       b                ·       b
    a        ·                ·       c                ·       c</code></pre>

            <p>Le programme ci-dessous simule ce versement avec les opérations de pile de la
            séance 3.</p>`,
          code: `entree = pile_vide()\nsortie = pile_vide()\n\nempiler(entree, "a")\nempiler(entree, "b")\nempiler(entree, "c")\n\nwhile not pile_est_vide(entree):\n    empiler(sortie, depiler(entree))\n\nprint(depiler(sortie))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>a</code>", correct: true,
              explication: "Oui. Le <code>a</code> était au fond de la pile d'entrée ; le versement l'a donc sorti en dernier, ce qui le place au sommet de la pile de sortie. Le premier arrivé est redevenu le premier servi." },
            { texte: "<code>c</code>",
              explication: "C'est ce qu'aurait donné <code>depiler(entree)</code> — le comportement d'une pile. Le versement inverse justement cet ordre." },
            { texte: "<code>b</code>",
              explication: "Le versement vide entièrement la pile d'entrée : les trois éléments passent, et c'est le <code>a</code> qui finit au sommet." },
            { texte: "Une erreur : la pile de sortie est vide.",
              explication: "Elle l'était avant la boucle. Celle-ci y a transféré les trois éléments." },
          ],
          apres: `<span class="chapo">Un renversement, et le tour est joué</span>
            Une pile inverse l'ordre — tu l'as établi à la séance 3. Deux piles dos à dos
            inversent donc <strong>deux fois</strong>, et deux inversions font une
            conservation : on retrouve le comportement FIFO d'une file.
            <br><br>
            Tout l'art de l'implémentation qui vient tient dans une seule décision :
            <em>quand</em> verser. La réponse, contre-intuitive, est « le plus tard
            possible » — et tu vas voir pourquoi.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "La file par deux piles : créer, interroger, enfiler",
          contenu: `
            <p>Écris les trois premières opérations de l'implémentation
            <strong>« par deux piles »</strong>. Une file y est une liste de deux piles :
            <code>f[0]</code> pour l'entrée, <code>f[1]</code> pour la sortie.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th></tr>
              <tr><td><code>file_vide()</code></td><td>deux piles vides — et <strong>aucune capacité à donner</strong></td></tr>
              <tr><td><code>est_vide(f)</code></td><td><code>True</code> si plus rien n'attend nulle part</td></tr>
              <tr><td><code>enfiler(f, element)</code></td><td>l'arrivant s'empile du côté entrée</td></tr>
            </table>
            </div>

            <p>Les quatre opérations de pile te sont fournies, sous des noms distincts :
            <code>pile_vide</code>, <code>pile_est_vide</code>, <code>empiler</code>,
            <code>depiler</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège de <code>est_vide</code></span>
              Une file peut très bien avoir une pile d'entrée vide et une pile de sortie
              pleine — c'est même le cas juste après un versement. Elle n'est vide que si
              <strong>les deux</strong> le sont.
            </div>`,
          nomFichier: "deux_piles.py",
          depart: `# ---- Les piles. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi : la file, bâtie sur deux piles. ----\n#\n# Une file est [pile d'entrée, pile de sortie].\n\ndef file_vide():\n    """Renvoie une file vide."""\n    pass\n\ndef est_vide(f):\n    """Renvoie True si la file ne contient plus aucun element."""\n    pass\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file."""\n    pass\n`,
          validation: {
            tests: `f = file_vide()\nassert f == [[], []], "Une file neuve, ce sont deux piles vides."\nassert est_vide(f) == True, "Les deux piles sont vides : la file l'est aussi."\nenfiler(f, "a")\nassert est_vide(f) == False, "Un élément attend du côté entrée."\nassert f[0] == ["a"], "L'arrivant s'empile du côté entrée."\nassert f[1] == [], "La pile de sortie n'a pas bougé."\nenfiler(f, "b")\nassert f[0] == ["a", "b"], "Le second arrivant s'empile par-dessus."\ng = file_vide()\ng[1] = ["z", "y"]\nassert est_vide(g) == False, "La pile d'entrée est vide, mais deux éléments attendent côté sortie : la file n'est pas vide."\ng[1] = []\nassert est_vide(g) == True, "Cette fois les deux piles sont vides."\nh = file_vide()\nfor v in range(50):\n    enfiler(h, v)\nassert est_vide(h) == False, "Cinquante arrivées, aucune capacité à déclarer : la file grandit toute seule."\nassert len(h[0]) == 50, "Et tout le monde attend du côté entrée."`,
          },
          felicitation: "Une file sans le moindre tableau, et sans capacité à prévoir. 🥞🥞",
          indices: [
            "Une file neuve, ce sont deux piles neuves rangées dans une liste de deux cases.",
            "<code>est_vide</code> doit interroger les <strong>deux</strong> piles, et les combiner avec <code>and</code>.",
            "<code>enfiler</code> ne touche qu'à une seule des deux : celle de l'entrée, c'est-à-dire <code>f[0]</code>.",
          ],
          solution: `# ---- Les piles. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- À toi : la file, bâtie sur deux piles. ----\n#\n# Une file est [pile d'entrée, pile de sortie].\n\ndef file_vide():\n    """Renvoie une file vide."""\n    return [pile_vide(), pile_vide()]\n\ndef est_vide(f):\n    """Renvoie True si la file ne contient plus aucun element."""\n    return pile_est_vide(f[0]) and pile_est_vide(f[1])\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file."""\n    empiler(f[0], element)\n`,
          apres: `<span class="chapo">Remarque ce que <code>file_vide</code> ne demande pas</span>
            Pas de capacité. Contrairement à la circulaire, cette file grandit aussi loin que
            la mémoire le permet, et son interface est <strong>exactement</strong> celle de
            la séance 4 — mêmes signatures, mêmes préconditions, pas d'<code>est_pleine</code>
            en plus.
            <br><br>
            C'est ce qui en fait la meilleure réponse au problème posé en début de séance :
            elle règle le coût <em>sans</em> changer le contrat. Reste à écrire l'opération
            où tout se joue.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La file par deux piles : défiler",
          contenu: `
            <p>L'opération où tout se joue. <code>defiler(f)</code> renvoie le premier
            arrivé, et le retire.</p>

            <p>Les éléments servables sont dans la pile de <strong>sortie</strong>. Si elle
            est vide, il faut d'abord y <strong>verser</strong> toute la pile d'entrée — c'est
            le mouvement que tu as prédit deux étapes plus haut.</p>

            <div class="encadre">
              <span class="chapo">Précondition</span>
              La file n'est pas vide. Autrement dit : au moins une des deux piles contient
              quelque chose.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ne verse pas à chaque fois</span>
              Si la pile de sortie contient déjà quelque chose, il ne faut
              <strong>surtout pas</strong> verser : les nouveaux arrivants passeraient devant
              ceux qui attendent depuis plus longtemps, et la file cesserait d'être une file.
            </div>`,
          nomFichier: "deux_piles.py",
          depart: `# ---- Les piles. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Déjà écrites à l'exercice précédent. ----\n\ndef file_vide():\n    return [pile_vide(), pile_vide()]\n\ndef est_vide(f):\n    return pile_est_vide(f[0]) and pile_est_vide(f[1])\n\ndef enfiler(f, element):\n    empiler(f[0], element)\n\n\n# ---- À toi. ----\n\ndef defiler(f):\n    """Renvoie le premier element arrive, et le retire.\n\n    Precondition : la file n'est pas vide.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bdepiler\\s*\\([\\s\\S]*\\bdepiler\\s*\\(", message: "Il faut dépiler la pile d'entrée pendant le versement, et la pile de sortie pour servir." },
              { motif: "\\bpile_est_vide\\s*\\([\\s\\S]*\\bpile_est_vide\\s*\\(", message: "Deux tests : le versement n'a lieu que si la pile de sortie est vide, et la boucle s'arrête quand la pile d'entrée l'est." },
            ],
            tests: `f = file_vide()\nfor v in ["a", "b", "c"]:\n    enfiler(f, v)\nassert defiler(f) == "a", "Le premier arrivé est le premier servi."\nassert defiler(f) == "b", "Puis le deuxième."\nenfiler(f, "d")\nassert defiler(f) == "c", "Le c attendait depuis plus longtemps que le d : il passe d'abord. Si tu obtiens 'd', c'est que tu as versé alors que la pile de sortie n'était pas vide."\nassert defiler(f) == "d", "Puis le d."\nassert est_vide(f) == True, "Tout le monde a été servi."\ng = file_vide()\nenfiler(g, 1)\nassert defiler(g) == 1, "Un seul élément."\nassert est_vide(g) == True, "..."\nenfiler(g, 2)\nenfiler(g, 3)\nassert defiler(g) == 2, "La file peut resservir après avoir été vidée."\nassert defiler(g) == 3, "..."\nh = file_vide()\nfor v in range(20):\n    enfiler(h, v)\nfor v in range(20):\n    assert defiler(h) == v, "Sur vingt éléments, l'ordre d'arrivée doit être respecté du premier au dernier."\nassert est_vide(h) == True, "..."\nk = file_vide()\nenfiler(k, "x")\nenfiler(k, "y")\nassert defiler(k) == "x", "..."\nenfiler(k, "z")\nenfiler(k, "w")\nassert defiler(k) == "y", "Les arrivées et les départs peuvent s'entremêler sans casser l'ordre."\nassert defiler(k) == "z", "..."\nassert defiler(k) == "w", "..."`,
          },
          felicitation: "Trois implémentations d'une file, et celle-ci ne coûte presque rien. 🎯",
          indices: [
            "Deux temps : d'abord verser <em>si nécessaire</em>, ensuite servir.",
            "Le versement est une boucle qui vide la pile d'entrée dans la pile de sortie, un élément à la fois. Il ne doit s'exécuter que sous une condition.",
            "Cette condition est « la pile de sortie est vide ». Une fois le versement fait — ou sauté —, servir se réduit à dépiler la pile de sortie.",
          ],
          solution: `# ---- Les piles. N'y touche pas. ----\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\n\n# ---- Déjà écrites à l'exercice précédent. ----\n\ndef file_vide():\n    return [pile_vide(), pile_vide()]\n\ndef est_vide(f):\n    return pile_est_vide(f[0]) and pile_est_vide(f[1])\n\ndef enfiler(f, element):\n    empiler(f[0], element)\n\n\n# ---- À toi. ----\n\ndef defiler(f):\n    """Renvoie le premier element arrive, et le retire.\n\n    Precondition : la file n'est pas vide.\n    """\n    if pile_est_vide(f[1]):\n        while not pile_est_vide(f[0]):\n            empiler(f[1], depiler(f[0]))\n    return depiler(f[1])\n`,
          apres: `<span class="chapo">Pourquoi « le plus tard possible »</span>
            Le test <code>if pile_est_vide(f[1])</code> n'est pas une optimisation : c'est la
            <strong>correction</strong> de l'algorithme. Verser alors que la sortie contient
            encore des clients placerait les nouveaux arrivants par-dessus eux — et la file
            servirait le dernier arrivé.
            <br><br>
            C'est le test que le sujet de bac attend, et celui qu'on oublie. Le quatrième
            test ci-dessus est écrit exactement pour l'attraper.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Mesurer les deux piles",
          contenu: `
            <p>Même protocole qu'au début de séance : <code>n</code> arrivées, puis
            <code>n</code> départs, et l'on compte les <strong>déplacements
            d'éléments</strong> — ici, les transferts d'une pile à l'autre.</p>

            <p>L'implémentation t'est donnée, instrumentée. Écris <code>mesurer(n)</code>,
            exactement comme à l'étape 2.</p>

            <pre class="bloc-code"><code>n = 10 : 10 transferts
n = 50 : 50 transferts
n = 100 : 100 transferts</code></pre>`,
          nomFichier: "mesure_piles.py",
          depart: `# ---- Les piles et la file par deux piles, instrumentées. N'y touche pas. ----\n\nCOUT = [0]        # nombre d'éléments transférés depuis le début\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef file_vide():\n    return [pile_vide(), pile_vide()]\n\ndef est_vide(f):\n    return pile_est_vide(f[0]) and pile_est_vide(f[1])\n\ndef enfiler(f, element):\n    empiler(f[0], element)\n\ndef defiler(f):\n    if pile_est_vide(f[1]):\n        while not pile_est_vide(f[0]):\n            COUT[0] = COUT[0] + 1        # un élément change de pile\n            empiler(f[1], depiler(f[0]))\n    return depiler(f[1])\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de transferts pour n arrivees puis n departs.\n\n    Le compteur est remis a zero au debut.\n    """\n    pass\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 10 :", mesurer(10), "transferts")\nprint("n = 50 :", mesurer(50), "transferts")\nprint("n = 100 :", mesurer(100), "transferts")\n`,
          validation: {
            codeContient: [
              { motif: "\\bCOUT\\s*\\[\\s*0\\s*\\]\\s*=\\s*0", message: "mesurer() doit remettre le compteur à zéro avant de commencer." },
            ],
            sortie: "n = 10 : 10 transferts\nn = 50 : 50 transferts\nn = 100 : 100 transferts",
            tests: `assert mesurer(0) == 0, "Sans aucun client, rien ne se transfère."\nassert mesurer(1) == 1, "Un client : il passe une fois de la pile d'entrée à la pile de sortie."\nassert mesurer(10) == 10, "Dix clients, dix transferts : chacun change de pile exactement une fois."\nassert mesurer(100) == 100, "Cent clients, cent transferts."\nassert mesurer(10) == 10, "Deux mesures de suite doivent donner le même résultat."`,
          },
          felicitation: "4950 déplacements sont devenus 100. 📉",
          indices: [
            "C'est mot pour mot la fonction de l'étape 2 : remettre le compteur à zéro, deux boucles <code>for</code>, renvoyer le compteur.",
            "La file par deux piles n'a pas de capacité à déclarer : <code>file_vide()</code> s'appelle sans argument.",
            "Attention à ne pas imbriquer les deux boucles : toutes les arrivées d'abord, tous les départs ensuite.",
          ],
          solution: `# ---- Les piles et la file par deux piles, instrumentées. N'y touche pas. ----\n\nCOUT = [0]        # nombre d'éléments transférés depuis le début\n\ndef pile_vide():\n    return []\n\ndef pile_est_vide(p):\n    return p == []\n\ndef empiler(p, element):\n    p.append(element)\n\ndef depiler(p):\n    return p.pop()\n\ndef file_vide():\n    return [pile_vide(), pile_vide()]\n\ndef est_vide(f):\n    return pile_est_vide(f[0]) and pile_est_vide(f[1])\n\ndef enfiler(f, element):\n    empiler(f[0], element)\n\ndef defiler(f):\n    if pile_est_vide(f[1]):\n        while not pile_est_vide(f[0]):\n            COUT[0] = COUT[0] + 1        # un élément change de pile\n            empiler(f[1], depiler(f[0]))\n    return depiler(f[1])\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de transferts pour n arrivees puis n departs.\n\n    Le compteur est remis a zero au debut.\n    """\n    COUT[0] = 0\n    f = file_vide()\n    for i in range(n):\n        enfiler(f, i)\n    for i in range(n):\n        defiler(f)\n    return COUT[0]\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 10 :", mesurer(10), "transferts")\nprint("n = 50 :", mesurer(50), "transferts")\nprint("n = 100 :", mesurer(100), "transferts")\n`,
          apres: `<span class="chapo">Le même scénario, sur les trois implémentations</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Implémentation</th><th>n = 10</th><th>n = 100</th><th>Croissance</th></tr>
              <tr><td>par tableau</td><td>45</td><td>4 950</td><td>quadratique</td></tr>
              <tr><td>circulaire</td><td>0</td><td>0</td><td>rien ne bouge</td></tr>
              <tr><td>par deux piles</td><td>10</td><td>100</td><td>linéaire</td></tr>
            </table>
            </div>
            Cent clients servis coûtent cent transferts : <strong>un par client</strong>. La
            file par deux piles est donc à peine plus chère que la circulaire — et elle n'a
            ni capacité à prévoir, ni <code>est_pleine</code> à ajouter au contrat.`,
        },

        {
          id: "a7",
          type: "qcm",
          titre: "Un coût amorti",
          contenu: `
            <p>Une objection se présente. Dans la file par deux piles, la plupart des
            <code>defiler</code> ne transfèrent rien du tout — mais de temps en temps, l'un
            d'eux vide toute la pile d'entrée d'un coup.</p>

            <p>Sur cent clients, on a mesuré cent transferts. Pourtant, un
            <strong>seul</strong> appel à <code>defiler</code> peut en faire cent à lui tout
            seul.</p>`,
          question: "Peut-on dire que defiler coûte peu ?",
          options: [
            { texte: "Oui, si l'on raisonne sur l'ensemble : chaque élément ne change de pile qu'<strong>une seule fois</strong> dans sa vie.", correct: true,
              explication: "Exactement. Un élément entre par la pile d'entrée, passe une fois vers la sortie, et repart. Il ne peut pas repasser. Le total sur n clients est donc n transferts, quelle que soit la façon dont les appels se répartissent." },
            { texte: "Non : un appel peut coûter n opérations, donc <code>defiler</code> est linéaire.",
              explication: "C'est vrai d'un appel isolé — c'est ce qu'on appelle le coût « au pire ». Mais ce pire cas ne peut pas se produire deux fois de suite : après un gros versement, la pile d'entrée est vide, et les appels suivants ne coûtent rien." },
            { texte: "Non : cela dépend de l'ordre des arrivées et des départs.",
                explication: "L'ordre change la répartition des transferts entre les appels, mais jamais le total : chaque élément en subit exactement un." },
            { texte: "Oui, parce que les transferts sont des opérations très rapides.",
              explication: "La vitesse d'une opération élémentaire n'est pas la question — on compte des opérations, pas des secondes, précisément pour ne pas dépendre de cela." },
          ],
          apres: `<span class="chapo">Amorti : le mot à retenir</span>
            On dit qu'une opération a un <strong>coût amorti constant</strong> quand une
            longue suite de <em>n</em> appels coûte au total de l'ordre de <em>n</em>
            opérations — même si un appel isolé peut coûter beaucoup plus cher.
            <br><br>
            C'est un raisonnement qu'on retrouve partout en informatique, et notamment dans
            le <code>list</code> de Python : quand un tableau dynamique est plein, il en
            alloue un deux fois plus grand et recopie tout — une opération très coûteuse.
            Mais elle est si rare que, ramenée au nombre d'<code>append</code>, elle ne coûte
            presque rien. C'est pour cette raison que <code>append</code> est considéré comme
            immédiat alors qu'il ne l'est pas toujours.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "pousser chaque implémentation dans ses retranchements",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Laquelle choisir ?",
          contenu: `
            <p>Un récapitulatif, avant de choisir :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>par tableau</th><th>circulaire</th><th>par deux piles</th></tr>
              <tr><td>Coût d'un service</td><td>linéaire</td><td>constant</td><td>constant amorti</td></tr>
              <tr><td>Taille</td><td>libre</td><td><strong>fixée d'avance</strong></td><td>libre</td></tr>
              <tr><td>Mémoire</td><td>juste ce qu'il faut</td><td>toute la capacité, toujours</td><td>juste ce qu'il faut</td></tr>
              <tr><td>Interface</td><td>celle de la séance 4</td><td>+ <code>est_pleine</code></td><td>celle de la séance 4</td></tr>
            </table>
            </div>
            <p>Un capteur embarqué enregistre des mesures dans une mémoire de
            <strong>quelques kilo-octets</strong>, sans système d'exploitation et sans
            possibilité d'allouer de la mémoire en cours de route. Les mesures sont traitées
            dans l'ordre d'arrivée.</p>`,
          question: "Quelle implémentation faut-il retenir ?",
          options: [
            { texte: "La circulaire.", correct: true,
              explication: "Oui. C'est précisément le cas où la contrainte « taille fixée d'avance » cesse d'être un défaut : la mémoire est de toute façon réservée au démarrage, et le programme ne peut pas en demander plus. On obtient un coût constant garanti, sans aucune allocation." },
            { texte: "La file par deux piles.",
              explication: "Son coût est excellent, mais elle grandit à volonté — ce qui suppose un système capable d'allouer de la mémoire à la demande. Sur un capteur embarqué, cette hypothèse est fausse." },
            { texte: "L'implémentation par tableau, plus simple à relire.",
              explication: "Sa simplicité est réelle, mais elle décale tout le tableau à chaque mesure traitée. Sur un capteur qui en enregistre des milliers, c'est exactement ce qu'il ne faut pas." },
            { texte: "N'importe laquelle : le client ne voit pas la différence.",
              explication: "Le client ne voit pas la différence de <em>résultat</em> — c'est la leçon de la séance 1. Il voit très bien celle de coût et de mémoire, et ici elle décide de la faisabilité." },
          ],
          apres: `<span class="chapo">Choisir, c'est nommer la contrainte qui décide</span>
            Il n'y a pas d'implémentation meilleure dans l'absolu. Il y a une contrainte
            dominante, et elle change avec la situation :
            <ul>
              <li>mémoire fixée d'avance → <strong>circulaire</strong> ;</li>
              <li>nombre d'éléments imprévisible → <strong>deux piles</strong> ;</li>
              <li>files toujours minuscules, code à relire en cours →
              <strong>par tableau</strong>, et ce n'est pas déshonorant.</li>
            </ul>
            En devoir, la bonne réponse n'est jamais « la plus rapide » : c'est celle que tu
            sais <em>justifier</em> par la contrainte de l'énoncé.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Une circulaire qui s'agrandit",
          contenu: `
            <p>Le seul défaut de la circulaire est sa capacité fixe. Réparons-le :
            <code>enfiler</code> ne refusera plus rien — quand la file est pleine, elle
            <strong>double</strong> sa capacité.</p>

            <p>Écris <code>agrandir(f)</code> : elle remplace le tableau de <code>f</code> par
            un tableau <strong>deux fois plus grand</strong>, dans lequel les éléments sont
            recopiés <strong>dans l'ordre de service, à partir de la case 0</strong>. L'indice
            du premier redevient donc 0.</p>

            <pre class="bloc-code"><code>avant  [['c', 'd', 'a', 'b'], 2, 4]      capacité 4, premier = 2
après  [['a', 'b', 'c', 'd', None, None, None, None], 0, 4]</code></pre>

            <p><code>enfiler</code> t'est donnée dans sa version définitive : elle appelle
            <code>agrandir</code> quand il le faut.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une précondition en moins</span>
              Avec cette version, <code>enfiler</code> n'a plus de précondition du tout, et
              <code>est_pleine</code> ne sert plus à personne. L'interface redevient
              exactement celle de la séance 4 — c'est tout l'objet de l'exercice.
            </div>`,
          nomFichier: "agrandir.py",
          depart: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef defiler(f):\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n\n\n# ---- Fournie : elle appelle agrandir() quand la file déborde. ----\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file. Aucune precondition."""\n    if f[2] == len(f[0]):\n        agrandir(f)\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\n\n# ---- À toi. ----\n\ndef agrandir(f):\n    """Double la capacite de f, en remettant les elements a partir de la case 0.\n\n    Effet : f est modifiee. La fonction ne renvoie rien.\n    """\n    pass\n`,
          validation: {
            tests: `f = file_vide(4)\nfor v in ["a", "b", "c", "d"]:\n    enfiler(f, v)\nassert len(f[0]) == 4, "Quatre éléments dans une capacité de 4 : pas encore besoin d'agrandir."\nenfiler(f, "e")\nassert len(f[0]) == 8, "Le cinquième arrivant double la capacité."\nassert f[1] == 0, "Après l'agrandissement, le premier élément est en case 0."\nassert f[2] == 5, "Et les cinq éléments sont là."\nassert f[0][0] == "a" and f[0][4] == "e", "Les éléments sont recopiés dans l'ordre de service."\nfor attendu in ["a", "b", "c", "d", "e"]:\n    assert defiler(f) == attendu, "L'ordre d'arrivée doit être intact après l'agrandissement."\nassert est_vide(f) == True, "..."\ng = file_vide(4)\nfor v in [1, 2, 3, 4]:\n    enfiler(g, v)\ndefiler(g)\ndefiler(g)\nenfiler(g, 5)\nenfiler(g, 6)\nassert len(g[0]) == 4, "Quatre éléments dans quatre cases : la file a fait le tour, sans agrandir."\nenfiler(g, 7)\nassert len(g[0]) == 8, "Le cinquième déborde."\nfor attendu in [3, 4, 5, 6, 7]:\n    assert defiler(g) == attendu, "Même quand la file avait fait le tour, l'ordre doit être préservé."\nh = file_vide(1)\nfor v in range(20):\n    enfiler(h, v)\nfor v in range(20):\n    assert defiler(h) == v, "Depuis une capacité de 1, la file doit pouvoir accueillir vingt éléments."`,
          },
          felicitation: "Ta circulaire n'a plus de plafond, et son coût reste amorti constant. 📈",
          indices: [
            "Trois temps : fabriquer le nouveau tableau, y recopier les éléments dans l'ordre, puis installer le tout dans <code>f</code>.",
            "Pour parcourir les éléments dans l'ordre de service, la case du <em>i</em>-ième s'obtient à partir de <code>f[1]</code> et de <code>i</code> — sans oublier le modulo, puisque la file peut avoir fait le tour.",
            "La nouvelle taille est <code>2 * len(f[0])</code>. Attention à installer le nouveau tableau dans <code>f[0]</code> <strong>et</strong> à remettre <code>f[1]</code> à 0 : le nombre d'éléments, lui, ne change pas.",
          ],
          solution: `# Implémentation « circulaire » : [tableau, indice du premier, nombre d'éléments].\n\ndef file_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef est_vide(f):\n    return f[2] == 0\n\ndef defiler(f):\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n\n\n# ---- Fournie : elle appelle agrandir() quand la file déborde. ----\n\ndef enfiler(f, element):\n    """Ajoute element a la fin de la file. Aucune precondition."""\n    if f[2] == len(f[0]):\n        agrandir(f)\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\n\n# ---- À toi. ----\n\ndef agrandir(f):\n    """Double la capacite de f, en remettant les elements a partir de la case 0.\n\n    Effet : f est modifiee. La fonction ne renvoie rien.\n    """\n    ancienne = len(f[0])\n    grand = [None] * (2 * ancienne)\n    for i in range(f[2]):\n        grand[i] = f[0][(f[1] + i) % ancienne]\n    f[0] = grand\n    f[1] = 0\n`,
          apres: `<span class="chapo">Doubler, et pas ajouter dix cases</span>
            Agrandir coûte cher : il faut recopier tous les éléments. Mais parce que la
            capacité <strong>double</strong> à chaque fois, ces recopies deviennent de plus en
            plus rares — une fois sur 4, puis sur 8, puis sur 16…
            <br><br>
            Le total sur <em>n</em> ajouts reste de l'ordre de <em>n</em> recopies : c'est le
            même raisonnement <strong>amorti</strong> qu'à l'étape précédente. Si l'on
            ajoutait dix cases au lieu de doubler, il faudrait recopier tous les dix ajouts,
            et le coût total redeviendrait quadratique.
            <br><br>
            Tu viens d'écrire, à quelques détails près, ce que fait le <code>list</code> de
            Python à chaque fois qu'un <code>append</code> le fait déborder.`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Une pile avec deux files",
          contenu: `
            <p>Le miroir exact de l'exercice précédent : on a bâti une file avec deux piles ;
            bâtissons maintenant une <strong>pile</strong> avec deux <strong>files</strong>.</p>

            <p>Les quatre opérations de file te sont fournies. Écris les quatre opérations de
            pile : <code>pile_vide</code>, <code>pile_est_vide</code>, <code>empiler</code>,
            <code>depiler</code>. Une pile est une liste de deux files.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">L'idée</span>
              Une file rend toujours son plus ancien élément ; une pile doit rendre le plus
              récent. Il faut donc, au moment de dépiler, faire passer <strong>tous les
              éléments sauf le dernier</strong> dans la seconde file : celui qui reste est
              justement le plus récent. Les deux files échangent alors leurs rôles.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Comment savoir qu'il ne reste qu'un élément</span>
              L'interface de la file ne donne pas sa longueur. Mais tu peux défiler un élément
              et regarder si la file est devenue vide : si oui, c'était le dernier.
            </div>`,
          nomFichier: "pile_deux_files.py",
          depart: `# ---- Les files. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef file_est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi : la pile, bâtie sur deux files. ----\n#\n# Une pile est [file principale, file auxiliaire].\n\ndef pile_vide():\n    """Renvoie une pile vide."""\n    pass\n\ndef pile_est_vide(p):\n    """Renvoie True si la pile ne contient aucun element."""\n    pass\n\ndef empiler(p, element):\n    """Ajoute element au sommet de la pile."""\n    pass\n\ndef depiler(p):\n    """Renvoie l'element du sommet, et le retire.\n\n    Precondition : la pile n'est pas vide.\n    """\n    pass\n`,
          validation: {
            tests: `p = pile_vide()\nassert pile_est_vide(p) == True, "Une pile neuve est vide."\nempiler(p, "a")\nassert pile_est_vide(p) == False, "Un élément a été empilé."\nassert depiler(p) == "a", "Un seul élément : c'est lui le sommet."\nassert pile_est_vide(p) == True, "..."\nq = pile_vide()\nfor v in [1, 2, 3]:\n    empiler(q, v)\nassert depiler(q) == 3, "Le dernier empilé est le premier dépilé — c'est bien une pile."\nassert depiler(q) == 2, "Puis le 2."\nempiler(q, 4)\nassert depiler(q) == 4, "Le 4, empilé après, passe avant le 1."\nassert depiler(q) == 1, "Et le 1, empilé en premier, sort en dernier."\nassert pile_est_vide(q) == True, "..."\nr = pile_vide()\nfor v in range(12):\n    empiler(r, v)\nfor v in range(11, -1, -1):\n    assert depiler(r) == v, "Sur douze éléments, l'ordre LIFO doit être respecté du premier au dernier."\nassert pile_est_vide(r) == True, "..."\ns = pile_vide()\nempiler(s, "x")\nassert depiler(s) == "x", "..."\nempiler(s, "y")\nempiler(s, "z")\nassert depiler(s) == "z", "La pile doit resservir après avoir été vidée."\nassert depiler(s) == "y", "..."`,
          },
          felicitation: "Chaque structure peut simuler l'autre. Ce sont les mêmes briques. 🔁",
          indices: [
            "<code>empiler</code> est la plus simple : l'élément rejoint la file principale, et rien d'autre ne bouge.",
            "Dans <code>depiler</code>, vide la file principale dans l'auxiliaire, mais en gardant de côté le dernier élément sorti : c'est lui qu'il faudra renvoyer.",
            "Défile un élément, puis regarde si la file principale est devenue vide. Si oui, c'est le sommet ; sinon, enfile-le dans l'auxiliaire et continue. À la fin, il ne reste qu'à échanger les deux files.",
          ],
          solution: `# ---- Les files. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef file_est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# ---- À toi : la pile, bâtie sur deux files. ----\n#\n# Une pile est [file principale, file auxiliaire].\n\ndef pile_vide():\n    """Renvoie une pile vide."""\n    return [file_vide(), file_vide()]\n\ndef pile_est_vide(p):\n    """Renvoie True si la pile ne contient aucun element."""\n    return file_est_vide(p[0]) and file_est_vide(p[1])\n\ndef empiler(p, element):\n    """Ajoute element au sommet de la pile."""\n    enfiler(p[0], element)\n\ndef depiler(p):\n    """Renvoie l'element du sommet, et le retire.\n\n    Precondition : la pile n'est pas vide.\n    """\n    element = defiler(p[0])\n    while not file_est_vide(p[0]):\n        enfiler(p[1], element)\n        element = defiler(p[0])\n    p[0] = p[1]\n    p[1] = file_vide()\n    return element\n`,
          apres: `<span class="chapo">Possible ne veut pas dire raisonnable</span>
            Cela fonctionne, et c'est un exercice classique. Mais compare les prix :
            <ul>
              <li>une file par deux piles : <strong>un transfert par élément</strong>, une
              fois pour toutes ;</li>
              <li>une pile par deux files : <strong>tout le contenu défile à chaque
              <code>depiler</code></strong>, et rien ne se réutilise d'un appel au suivant.</li>
            </ul>
            Le second est linéaire à chaque appel, pas amorti. La symétrie apparente entre
            les deux structures s'arrête donc ici : les piles simulent bien les files,
            l'inverse est bien plus coûteux.
            <br><br>
            La leçon générale vaut pour tout le chapitre : <strong>qu'une chose soit
            possible ne dit rien de son prix</strong>, et c'est le prix qui décide en
            pratique.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le tampon des dernières mesures",
          contenu: `
            <p>Un usage très courant du tableau circulaire, qui n'est pas une file : le
            <strong>tampon circulaire</strong>. Il retient les <code>k</code> dernières
            valeurs reçues, et <strong>oublie</strong> les plus anciennes au fur et à mesure.</p>

            <p>C'est ce que fait la boîte noire d'un avion, le journal d'erreurs d'un
            serveur, ou la fonction « revoir les 30 dernières secondes » d'une console de
            jeu.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th></tr>
              <tr><td><code>tampon_vide(k)</code></td><td>un tampon qui retiendra au plus <code>k</code> valeurs</td></tr>
              <tr><td><code>noter(t, valeur)</code></td><td>enregistre <code>valeur</code> ; si le tampon est plein, la plus ancienne est oubliée</td></tr>
              <tr><td><code>contenu(t)</code></td><td>le tableau des valeurs retenues, <strong>de la plus ancienne à la plus récente</strong></td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>t = tampon_vide(3)
noter(t, 1) ; noter(t, 2) ; noter(t, 3)   →  contenu(t) vaut [1, 2, 3]
noter(t, 4)                               →  contenu(t) vaut [2, 3, 4]</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où est la différence avec une file</span>
              Une file pleine <em>refuse</em> ; un tampon plein <em>écrase</em>. C'est la
              seule ligne à changer — mais elle change aussi ce que le compteur doit devenir
              une fois le tampon plein.
            </div>`,
          nomFichier: "tampon.py",
          depart: `# Un tampon circulaire : [tableau, indice du plus ancien, nombre de valeurs].\n\ndef tampon_vide(k):\n    """Renvoie un tampon qui retiendra au plus k valeurs."""\n    pass\n\ndef noter(t, valeur):\n    """Enregistre valeur. Si le tampon est plein, oublie la plus ancienne."""\n    pass\n\ndef contenu(t):\n    """Renvoie le tableau des valeurs retenues, de la plus ancienne a la plus recente."""\n    pass\n`,
          validation: {
            tests: `t = tampon_vide(3)\nassert contenu(t) == [], "Un tampon neuf ne retient rien."\nnoter(t, 1)\nassert contenu(t) == [1], "Une valeur notée."\nnoter(t, 2)\nnoter(t, 3)\nassert contenu(t) == [1, 2, 3], "Trois valeurs, de la plus ancienne à la plus récente."\nnoter(t, 4)\nassert contenu(t) == [2, 3, 4], "Le tampon est plein : la plus ancienne valeur, le 1, est oubliée."\nnoter(t, 5)\nassert contenu(t) == [3, 4, 5], "Et ainsi de suite."\nfor v in range(6, 20):\n    noter(t, v)\nassert contenu(t) == [17, 18, 19], "Après beaucoup de valeurs, seules les trois dernières restent."\nu = tampon_vide(1)\nnoter(u, "a")\nassert contenu(u) == ["a"], "Un tampon de capacité 1."\nnoter(u, "b")\nassert contenu(u) == ["b"], "Il ne retient que la dernière valeur."\nv = tampon_vide(5)\nfor x in [10, 20, 30]:\n    noter(v, x)\nassert contenu(v) == [10, 20, 30], "Tant que le tampon n'est pas plein, rien n'est oublié."\nassert len(v[0]) == 5, "Le tableau garde toujours sa taille."`,
          },
          felicitation: "Tu viens d'écrire une boîte noire. ✈️",
          indices: [
            "La représentation est celle de la file circulaire : un tableau de taille fixe, l'indice de la plus ancienne valeur, et le nombre de valeurs retenues.",
            "Dans <code>noter</code>, la valeur s'écrit toujours à la même place calculée que pour <code>enfiler</code>. Ce qui change est ce qui se passe <em>ensuite</em>, selon que le tampon était plein ou non.",
            "S'il n'était pas plein, le compteur augmente et l'indice du plus ancien ne bouge pas. S'il l'était, le compteur reste au maximum et c'est l'indice du plus ancien qui doit avancer d'un cran — modulo la capacité.",
          ],
          solution: `# Un tampon circulaire : [tableau, indice du plus ancien, nombre de valeurs].\n\ndef tampon_vide(k):\n    """Renvoie un tampon qui retiendra au plus k valeurs."""\n    return [[None] * k, 0, 0]\n\ndef noter(t, valeur):\n    """Enregistre valeur. Si le tampon est plein, oublie la plus ancienne."""\n    capacite = len(t[0])\n    place = (t[1] + t[2]) % capacite\n    t[0][place] = valeur\n    if t[2] < capacite:\n        t[2] = t[2] + 1\n    else:\n        t[1] = (t[1] + 1) % capacite\n\ndef contenu(t):\n    """Renvoie le tableau des valeurs retenues, de la plus ancienne a la plus recente."""\n    capacite = len(t[0])\n    resultat = []\n    for i in range(t[2]):\n        resultat.append(t[0][(t[1] + i) % capacite])\n    return resultat\n`,
          apres: `<span class="chapo">La même structure, un autre contrat</span>
            Le tableau, les deux indices, le modulo : tout est identique à la file
            circulaire. Seule la <strong>spécification</strong> de l'ajout diffère — refuser
            ou écraser — et cela suffit à faire une structure différente, avec d'autres
            usages.
            <br><br>
            C'est la meilleure illustration possible de la séance 1 : une implémentation
            n'est pas une structure. La même mémoire, les mêmes calculs d'indices, et deux
            types abstraits distincts selon ce qu'on promet.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Comparer les trois, sur le même scénario",
          contenu: `
            <p>Jusqu'ici, chaque implémentation a été mesurée séparément. Écrivons le banc
            d'essai qui les compare toutes les trois sur un même scénario.</p>

            <p><code>rejouer(scenario, enfiler_op, defiler_op, f)</code> déroule un scénario
            sur la file <code>f</code>, en se servant des deux opérations qu'on lui passe, et
            renvoie le tableau des éléments servis.</p>

            <ul>
              <li>un scénario est un tableau : un nombre signifie « ce client arrive », la
              chaîne <code>"SERVIR"</code> signifie « on sert le premier » ;</li>
              <li>servir alors que la file est vide ne fait rien ;</li>
              <li><code>est_vide</code> est commune aux trois implémentations : tu peux
              l'appeler directement.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Passer une fonction en argument</span>
              En Python, une fonction est une valeur comme une autre. Écrit sans parenthèses,
              <code>enfiler</code> désigne la fonction elle-même ; on peut la ranger dans une
              variable et l'appeler plus tard. C'est ce qui permet à <code>rejouer</code> de
              fonctionner avec n'importe quelle implémentation, sans rien savoir d'elle.
            </div>`,
          nomFichier: "banc.py",
          depart: `# ---- Deux implémentations complètes, et leur est_vide commun. ----\n\ndef est_vide(f):\n    """Marche pour les deux : la circulaire range son compteur en f[2],\n    la file par deux piles range deux piles en f[0] et f[1]."""\n    if len(f) == 3:\n        return f[2] == 0\n    return f[0] == [] and f[1] == []\n\n# Implémentation « circulaire »\ndef circulaire_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef circulaire_enfiler(f, element):\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\ndef circulaire_defiler(f):\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n\n# Implémentation « par deux piles »\ndef piles_vide():\n    return [[], []]\n\ndef piles_enfiler(f, element):\n    f[0].append(element)\n\ndef piles_defiler(f):\n    if f[1] == []:\n        while f[0] != []:\n            f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- À toi. ----\n\ndef rejouer(scenario, enfiler_op, defiler_op, f):\n    """Deroule scenario sur f et renvoie le tableau des elements servis.\n\n    Un element du scenario est soit une valeur qui arrive,\n    soit la chaine "SERVIR". Servir une file vide ne fait rien.\n    """\n    pass\n\n\n# ---- Le banc d'essai. Ne modifie pas ces lignes. ----\nSCENARIO = [1, 2, "SERVIR", 3, "SERVIR", "SERVIR", "SERVIR", 4, "SERVIR"]\n\nprint("circulaire  :", rejouer(SCENARIO, circulaire_enfiler, circulaire_defiler, circulaire_vide(10)))\nprint("deux piles  :", rejouer(SCENARIO, piles_enfiler, piles_defiler, piles_vide()))\n`,
          validation: {
            sortie: "circulaire  : [1, 2, 3, 4]\ndeux piles  : [1, 2, 3, 4]",
            tests: `r = rejouer([], circulaire_enfiler, circulaire_defiler, circulaire_vide(5))\nassert r == [], "Un scénario vide ne sert personne."\nr = rejouer(["SERVIR", "SERVIR"], piles_enfiler, piles_defiler, piles_vide())\nassert r == [], "Servir une file vide ne fait rien, et ne doit pas planter."\nr = rejouer([7, 8, 9], circulaire_enfiler, circulaire_defiler, circulaire_vide(5))\nassert r == [], "Sans SERVIR, personne n'est servi."\nr = rejouer([7, "SERVIR", 8, "SERVIR"], piles_enfiler, piles_defiler, piles_vide())\nassert r == [7, 8], "Les arrivées et les services peuvent s'entremêler."\nscen = [1, 2, 3, "SERVIR", "SERVIR", 4, "SERVIR", "SERVIR", "SERVIR"]\na = rejouer(scen, circulaire_enfiler, circulaire_defiler, circulaire_vide(10))\nb = rejouer(scen, piles_enfiler, piles_defiler, piles_vide())\nassert a == [1, 2, 3, 4], "L'ordre d'arrivée doit être respecté."\nassert a == b, "Les deux implémentations doivent donner exactement le même résultat : c'est tout l'objet du banc."`,
          },
          felicitation: "Un banc d'essai qui ne sait rien des implémentations qu'il éprouve. 🔬",
          indices: [
            "Une boucle <code>for</code> sur le scénario, un tableau de résultats, et un <code>if</code> pour distinguer les deux sortes d'événements.",
            "Pour appeler la fonction qu'on t'a passée, écris simplement <code>enfiler_op(f, x)</code> : le nom du paramètre suffit.",
            "Avant de servir, vérifie <code>est_vide(f)</code> — la précondition de <code>defiler</code> s'applique quelle que soit l'implémentation.",
          ],
          solution: `# ---- Deux implémentations complètes, et leur est_vide commun. ----\n\ndef est_vide(f):\n    """Marche pour les deux : la circulaire range son compteur en f[2],\n    la file par deux piles range deux piles en f[0] et f[1]."""\n    if len(f) == 3:\n        return f[2] == 0\n    return f[0] == [] and f[1] == []\n\n# Implémentation « circulaire »\ndef circulaire_vide(capacite):\n    return [[None] * capacite, 0, 0]\n\ndef circulaire_enfiler(f, element):\n    place = (f[1] + f[2]) % len(f[0])\n    f[0][place] = element\n    f[2] = f[2] + 1\n\ndef circulaire_defiler(f):\n    element = f[0][f[1]]\n    f[1] = (f[1] + 1) % len(f[0])\n    f[2] = f[2] - 1\n    return element\n\n# Implémentation « par deux piles »\ndef piles_vide():\n    return [[], []]\n\ndef piles_enfiler(f, element):\n    f[0].append(element)\n\ndef piles_defiler(f):\n    if f[1] == []:\n        while f[0] != []:\n            f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- À toi. ----\n\ndef rejouer(scenario, enfiler_op, defiler_op, f):\n    """Deroule scenario sur f et renvoie le tableau des elements servis.\n\n    Un element du scenario est soit une valeur qui arrive,\n    soit la chaine "SERVIR". Servir une file vide ne fait rien.\n    """\n    servis = []\n    for evenement in scenario:\n        if evenement == "SERVIR":\n            if not est_vide(f):\n                servis.append(defiler_op(f))\n        else:\n            enfiler_op(f, evenement)\n    return servis\n\n\n# ---- Le banc d'essai. Ne modifie pas ces lignes. ----\nSCENARIO = [1, 2, "SERVIR", 3, "SERVIR", "SERVIR", "SERVIR", 4, "SERVIR"]\n\nprint("circulaire  :", rejouer(SCENARIO, circulaire_enfiler, circulaire_defiler, circulaire_vide(10)))\nprint("deux piles  :", rejouer(SCENARIO, piles_enfiler, piles_defiler, piles_vide()))\n`,
          apres: `<span class="chapo">Ce qu'un banc d'essai prouve, et ce qu'il ne prouve pas</span>
            Les deux lignes affichent la même chose : sur ce scénario-là, les deux
            implémentations sont indiscernables. C'est exactement ce que l'interface
            promettait, et c'est ainsi qu'on le <em>vérifie</em> plutôt que de l'espérer.
            <br><br>
            Un banc ne démontre rien pour autant : il constate sur les scénarios qu'on lui
            donne. Plus ils sont variés — file vidée puis remplie, services sur file vide,
            entrées et sorties entremêlées — plus la confiance est grande. C'est exactement
            l'esprit du chapitre « spécifier et tester » de la Première.
            <br><br>
            Remarque enfin la ligne <code>est_vide</code> du haut : elle triche, elle regarde
            la forme de la file pour deviner l'implémentation. C'est un pis-aller qui n'a sa
            place que dans un banc d'essai — et qui disparaîtra complètement le jour où ces
            structures deviendront des classes.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Le jeu de tests qui départage",
          contenu: `
            <p>On te donne une implémentation de file <strong>sabotée</strong> : elle passe
            sans broncher les tests naïfs, et elle est pourtant fausse.</p>

            <p>À toi d'écrire le scénario qui la démasque. <code>jeu_de_tests()</code> doit
            renvoyer un tableau d'événements — même format qu'à l'exercice précédent — tel
            que la file sabotée et une file correcte <strong>ne donnent pas le même
            résultat</strong>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Cherche par où ça pèche</span>
              Lis <code>defiler</code> de la version sabotée et compare-la à la tienne. Elle
              verse à un moment où il ne faut pas. Demande-toi ensuite quel enchaînement
              d'arrivées et de départs rend cette faute visible — il faut au minimum qu'un
              client arrive alors que d'autres attendent déjà d'être servis.
            </div>

            <p>Ton scénario doit contenir <strong>au moins six événements</strong>.</p>`,
          nomFichier: "demasquer.py",
          depart: `# ---- Une file par deux piles CORRECTE. ----\n\ndef juste_vide():\n    return [[], []]\n\ndef juste_enfiler(f, x):\n    f[0].append(x)\n\ndef juste_defiler(f):\n    if f[1] == []:\n        while f[0] != []:\n            f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- La même, SABOTÉE : elle verse à chaque fois. ----\n\ndef fausse_vide():\n    return [[], []]\n\ndef fausse_enfiler(f, x):\n    f[0].append(x)\n\ndef fausse_defiler(f):\n    while f[0] != []:\n        f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- Le banc, fourni. ----\n\ndef vide(f):\n    return f[0] == [] and f[1] == []\n\ndef rejouer(scenario, enf, def_, f):\n    servis = []\n    for e in scenario:\n        if e == "SERVIR":\n            if not vide(f):\n                servis.append(def_(f))\n        else:\n            enf(f, e)\n    return servis\n\n\n# ---- À toi. ----\n\ndef jeu_de_tests():\n    """Renvoie un scenario sur lequel la version sabotee se trahit.\n\n    Un evenement est soit une valeur qui arrive, soit la chaine "SERVIR".\n    """\n    pass\n\n\n# ---- La confrontation. Ne modifie pas ces lignes. ----\nscenario = jeu_de_tests()\nprint("correcte :", rejouer(scenario, juste_enfiler, juste_defiler, juste_vide()))\nprint("sabotée  :", rejouer(scenario, fausse_enfiler, fausse_defiler, fausse_vide()))\n`,
          validation: {
            sortieNonVide: true,
            tests: `s = jeu_de_tests()\nassert isinstance(s, list), "jeu_de_tests() doit renvoyer un tableau d'événements."\nassert len(s) >= 6, "Il faut au moins six événements pour que la faute puisse apparaître."\nassert s.count("SERVIR") >= 2, "Il faut au moins deux services : c'est au second que la faute se voit."\na = rejouer(s, juste_enfiler, juste_defiler, juste_vide())\nb = rejouer(s, fausse_enfiler, fausse_defiler, fausse_vide())\nassert a != b, "Ton scénario ne démasque pas la version sabotée : les deux donnent le même résultat. Il faut qu'un client arrive pendant que d'autres attendent déjà côté sortie."\nassert len(a) >= 2, "Le scénario doit réellement faire servir des clients."`,
          },
          felicitation: "Tu viens d'écrire un test qui attrape un bug que personne n'aurait vu. 🎣",
          indices: [
            "Commence par faire arriver deux ou trois clients, puis sers-en un : à cet instant, la pile de sortie contient les autres, qui attendent.",
            "Fais maintenant arriver un nouveau client, puis sers à nouveau. C'est là que les deux versions divergent.",
            "Écris simplement le tableau à la main, par exemple sous la forme <code>[1, 2, 3, \"SERVIR\", 4, \"SERVIR\"]</code>, et essaie : si les deux lignes affichent la même chose, allonge-le.",
          ],
          solution: `# ---- Une file par deux piles CORRECTE. ----\n\ndef juste_vide():\n    return [[], []]\n\ndef juste_enfiler(f, x):\n    f[0].append(x)\n\ndef juste_defiler(f):\n    if f[1] == []:\n        while f[0] != []:\n            f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- La même, SABOTÉE : elle verse à chaque fois. ----\n\ndef fausse_vide():\n    return [[], []]\n\ndef fausse_enfiler(f, x):\n    f[0].append(x)\n\ndef fausse_defiler(f):\n    while f[0] != []:\n        f[1].append(f[0].pop())\n    return f[1].pop()\n\n\n# ---- Le banc, fourni. ----\n\ndef vide(f):\n    return f[0] == [] and f[1] == []\n\ndef rejouer(scenario, enf, def_, f):\n    servis = []\n    for e in scenario:\n        if e == "SERVIR":\n            if not vide(f):\n                servis.append(def_(f))\n        else:\n            enf(f, e)\n    return servis\n\n\n# ---- À toi. ----\n\ndef jeu_de_tests():\n    """Renvoie un scenario sur lequel la version sabotee se trahit.\n\n    Un evenement est soit une valeur qui arrive, soit la chaine "SERVIR".\n    """\n    return [1, 2, 3, "SERVIR", 4, "SERVIR", "SERVIR", "SERVIR"]\n\n\n# ---- La confrontation. Ne modifie pas ces lignes. ----\nscenario = jeu_de_tests()\nprint("correcte :", rejouer(scenario, juste_enfiler, juste_defiler, juste_vide()))\nprint("sabotée  :", rejouer(scenario, fausse_enfiler, fausse_defiler, fausse_vide()))\n`,
          apres: `<span class="chapo">Écrire le test est un exercice à part entière</span>
            La version sabotée sert correctement tant qu'on ne fait pas arriver de client
            <em>pendant</em> que d'autres attendent côté sortie. Beaucoup de jeux de tests
            raisonnables — n arrivées, puis n départs — la déclareraient donc juste.
            <br><br>
            Retiens le réflexe : un bon test ne se contente pas de vérifier le cas nominal,
            il vise l'<strong>entrelacement</strong>. C'est vrai des files comme de tout le
            reste, et c'est ce qui distingue « j'ai essayé, ça marche » de « je l'ai
            testé ».`,
        },

        {
          id: "x7",
          type: "code",
          titre: "À toi de mesurer",
          contenu: `
            <p>Dernier défi, libre. Choisis une question de coût, écris le programme qui y
            répond par une <strong>mesure</strong>, et affiche le résultat.</p>

            <p>Quelques questions possibles :</p>
            <ul>
              <li>combien de cases une pile « sommet en tête » déplace-t-elle pour
              <code>n</code> empilements, comparée à « sommet en fin » ?</li>
              <li>combien de fois un tableau qui double sa capacité recopie-t-il ses éléments
              pour arriver à <code>n</code> ajouts ?</li>
              <li>combien d'éléments une <code>pile par deux files</code> fait-elle défiler
              pour <code>n</code> dépilements ?</li>
              <li>combien de tours de boucle coûte <code>longueur(f)</code> si on l'appelle
              dans la condition d'une boucle qui parcourt la file ?</li>
            </ul>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>une <strong>fonction de mesure</strong>, avec sa <strong>docstring</strong>,
              qui prend une taille <code>n</code> et renvoie un nombre d'opérations ;</li>
              <li>un <strong>compteur</strong> rangé dans une liste, à la manière de
              <code>COUT</code> ;</li>
              <li>au moins <strong>trois</strong> mesures affichées, pour trois tailles
              différentes — de quoi voir la croissance.</li>
            </ul>`,
          nomFichier: "ma_mesure.py",
          depart: `# Ma question : .....................\n#\n# Écris ici le compteur, l'implémentation instrumentée,\n# ta fonction de mesure, puis les trois affichages.\n\nCOUT = [0]\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){2}",
                message: "Il faut au moins deux fonctions : ce que tu mesures, et la mesure elle-même." },
              { motif: "\"\"\"[\\s\\S]*?\"\"\"",
                message: "Ta fonction de mesure doit porter une docstring qui dit ce qu'elle compte." },
              { motif: "\\bCOUT\\s*\\[\\s*0\\s*\\]\\s*=[\\s\\S]*\\bCOUT\\s*\\[\\s*0\\s*\\]\\s*=",
                message: "Le compteur doit être remis à zéro, puis augmenté pendant la mesure." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Affiche au moins trois mesures, pour trois tailles différentes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Une question de coût posée, mesurée, et répondue par des chiffres. 🏁",
          indices: [
            "Commence par écrire, en commentaire, la phrase « je compte le nombre de … ». Si tu n'arrives pas à la finir, la mesure ne voudra rien dire.",
            "Recopie une implémentation de la séance et glisse-y une seule ligne : <code>COUT[0] = COUT[0] + 1</code>, à l'endroit exact de l'opération que tu comptes.",
            "Ta fonction de mesure remet le compteur à zéro, joue le scénario pour la taille demandée, et renvoie <code>COUT[0]</code>. Les trois <code>print</code> l'appellent avec trois tailles, par exemple 10, 100 et 1000.",
          ],
          solution: `# Ma question : combien de cases une pile « sommet en tête » déplace-t-elle ?\n#\n# insert(0, x) décale toutes les cases déjà présentes ; append n'en décale aucune.\n\nCOUT = [0]\n\ndef empiler_en_tete(p, element):\n    """Empile element en case 0, en decalant tout le reste."""\n    COUT[0] = COUT[0] + len(p)\n    p.insert(0, element)\n\ndef mesurer(n):\n    """Renvoie le nombre de cases deplacees par n empilements en tete."""\n    COUT[0] = 0\n    p = []\n    for i in range(n):\n        empiler_en_tete(p, i)\n    return COUT[0]\n\n\nprint("n =   10 :", mesurer(10), "cases déplacées")\nprint("n =  100 :", mesurer(100), "cases déplacées")\nprint("n = 1000 :", mesurer(1000), "cases déplacées")\n`,
        },
      ],
    },
  ],
};

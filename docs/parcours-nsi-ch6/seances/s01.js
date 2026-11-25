/* NSI — chapitre 6, séance 1 : créer et lire un p-uplet.
 * Reprend l'introduction du chapitre, les sections « Créer un p-uplet »,
 * « Indexation des éléments » et « Longueur d'un p-uplet » du cours, le TP1
 * (création, test d'appartenance, + et *, accès), et les exercices 1, 2 et 7.
 * L'immuabilité (TP1, dernière partie ; ex. 3 et 11) est réservée à la séance 2,
 * les fonctions qui renvoient un p-uplet (TP1, « Premières utilisations ») à la
 * séance 3.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Créer et lire un p-uplet",
  sousTitre: "Regrouper des valeurs qui vont ensemble",
  palier: "Partie 1 — Les p-uplets",

  accroche: `Une date, c'est un jour, un mois et une année. Un point du plan, une
    abscisse et une ordonnée. Ces valeurs ne vont jamais l'une sans l'autre : on
    aimerait les ranger <strong>ensemble</strong>, dans un seul objet. C'est le rôle
    du <strong>p-uplet</strong>, le premier type construit de ce chapitre.`,

  objectifs: [
    "créer un p-uplet avec des <strong>virgules</strong> — et des parenthèses pour la lisibilité",
    "lire une composante par son <strong>indice</strong>, positif ou négatif",
    "connaître sa longueur avec <code>len()</code> et tester une appartenance avec <code>in</code>",
    "assembler des p-uplets avec <code>+</code> et <code>*</code>, et les imbriquer",
  ],

  motDeLaFin: `Tu sais créer un p-uplet et lire n'importe laquelle de ses composantes.
    Tout cela ressemble beaucoup aux listes du chapitre 4… À la séance 2, on découvre
    ce qui les sépare : un p-uplet, une fois créé, <strong>ne se modifie plus</strong>.`,

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
          titre: "Des valeurs qui vont ensemble",
          contenu: `
            <p>Au chapitre 4, la liste rangeait des valeurs <strong>de même nature</strong> :
            25 notes, 8 planètes. Mais une fiche d'élève, c'est un nom, un âge et une
            moyenne : trois valeurs <strong>de types différents</strong>, qui décrivent
            ensemble une seule chose.</p>

            <p>Python les regroupe dans un <strong>p-uplet</strong>, qui s'écrit avec des
            <strong>parenthèses</strong> :</p>

            <pre class="bloc-code"><code>eleve = ("Alice", 16, 15.5)     # un nom, un âge, une moyenne
point = (4, -2)                 # une abscisse, une ordonnée
date = (14, "juillet", 1789)    # un jour, un mois, une année</code></pre>

            <div class="encadre">
              <span class="chapo">Définition : p-uplet</span>
              Un <strong>p-uplet</strong> — <em>tuple</em> en anglais — est une collection
              <strong>ordonnée</strong> d'éléments, appelés ses <strong>composantes</strong>.
              Chacune peut être de n'importe quel type. Son type Python est
              <code>tuple</code>.
            </div>

            <p>Selon le nombre de composantes, on parle d'un <strong>couple</strong>
            (2), d'un <strong>triplet</strong> (3), d'un quadruplet (4)… et, dans le cas
            général, d'un p-uplet de <em>p</em> composantes.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ton premier p-uplet",
          contenu: `
            <p>Crée le p-uplet <code>film</code> qui contient, dans cet ordre, le titre
            <code>"Coco"</code>, l'année de sortie 2017 et la durée 105 minutes. Affiche-le,
            puis affiche son type. La console doit montrer :</p>
            <pre class="bloc-code"><code>('Coco', 2017, 105)
&lt;class 'tuple'&gt;</code></pre>`,
          depart: `film = \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bprint\\s*\\(\\s*film\\s*\\)", message: "Affiche le p-uplet en passant la variable film à print." },
              { motif: "\\btype\\s*\\(\\s*film\\s*\\)", message: "Le type se demande à Python avec type(film)." },
            ],
            sortie: "('Coco', 2017, 105)\n<class 'tuple'>",
            tests: `assert film == ("Coco", 2017, 105), "film doit contenir \\"Coco\\", 2017 et 105, dans cet ordre"`,
          },
          felicitation: "Un texte et deux entiers, rangés dans un seul objet. 🎬",
          indices: [
            "Les trois valeurs s'écrivent entre parenthèses, séparées par des virgules. Le titre est un texte : il lui faut des guillemets.",
            "Puis deux <code>print</code> : l'un reçoit la variable <code>film</code>, l'autre ce que renvoie <code>type()</code> appliqué à <code>film</code>.",
          ],
          solution: `film = ("Coco", 2017, 105)\nprint(film)\nprint(type(film))\n`,
          apres: `<span class="chapo">Des types mélangés, et c'est voulu</span>
            Au chapitre 4, on s'interdisait de mélanger les types dans une liste. Pour un
            p-uplet, c'est l'inverse : regrouper des valeurs <strong>différentes</strong>
            qui décrivent une même chose est sa raison d'être.`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Des parenthèses autour d'un nombre",
          contenu: `<p>Lis ce programme sans l'exécuter. On veut un p-uplet qui ne contient
            qu'une seule valeur.</p>`,
          code: `a = (5)\nprint(type(a))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>&lt;class 'tuple'&gt;</code>",
              explication: "C'est ce qu'on espérait, mais Python ne voit ici que des parenthèses de calcul, comme dans <code>(2 + 3) * 4</code>." },
            { texte: "<code>&lt;class 'int'&gt;</code>", correct: true,
              explication: "Oui : <code>(5)</code> vaut 5, tout simplement. Des parenthèses autour d'un nombre ne changent rien, sinon <code>(2 + 3) * 4</code> deviendrait un p-uplet !" },
            { texte: "<code>&lt;class 'list'&gt;</code>",
              explication: "Une liste s'écrit avec des crochets, et il n'y en a aucun ici." },
            { texte: "une erreur <code>SyntaxError</code>",
              explication: "<code>a = (5)</code> est parfaitement correct : c'est l'entier 5, entouré de parenthèses inutiles." },
          ],
          apres: `<span class="chapo">C'est la virgule qui fait le p-uplet</span>
            Pour un p-uplet d'une seule composante, il faut une <strong>virgule</strong> :
            <code>(5,)</code>. Les parenthèses, elles, sont même <strong>facultatives</strong> :
            <code>t = 5, 10, 15</code> crée bien le p-uplet <code>(5, 10, 15)</code>. On les
            écrit quand même, toujours : c'est bien plus lisible.
            <pre class="bloc-code"><code>a = (5)       # l'entier 5
b = (5,)      # un p-uplet d'une seule composante
c = 5, 10     # un couple, sans parenthèses
e = ()        # le p-uplet vide</code></pre>`,
        },

        {
          id: "d4",
          type: "qcm",
          titre: "Reconnaître un p-uplet",
          contenu: `<p>Voici cinq variables.</p>`,
          code: `a = (5)\nb = (5,)\nc = 5, 6\nd = [5, 6]\ne = ()`,
          question: "Lesquelles sont des p-uplets ?",
          options: [
            { texte: "<code>a</code>, <code>b</code> et <code>e</code>",
              explication: "<code>a</code> n'a pas de virgule : c'est l'entier 5. Et tu as oublié <code>c</code>." },
            { texte: "<code>a</code> et <code>b</code> seulement",
              explication: "<code>a</code> est un entier, et d'autres p-uplets se cachent dans la liste." },
            { texte: "<code>b</code>, <code>c</code> et <code>e</code>", correct: true,
              explication: "Oui : <code>b</code> a sa virgule, <code>c</code> est un couple sans parenthèses, <code>e</code> est le p-uplet vide." },
            { texte: "<code>b</code>, <code>c</code>, <code>d</code> et <code>e</code>",
              explication: "<code>d</code> a des crochets : c'est une liste." },
          ],
          apres: `<span class="chapo">Trois écritures à reconnaître</span>
            Parenthèses <strong>avec</strong> virgule, virgules <strong>sans</strong>
            parenthèses, et <code>()</code> pour le p-uplet vide. Des crochets donnent une
            liste ; des parenthèses sans virgule ne donnent rien du tout.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Chaque composante a son indice",
          contenu: `
            <p>Comme les éléments d'une liste, les composantes d'un p-uplet sont
            <strong>indexées</strong> à partir de <strong>0</strong>, et se lisent avec des
            <strong>crochets</strong> :</p>

            <div style="text-align:center"><img src="../files/NSI/Types_construits/puplet_acces.png" alt="Un p-uplet et les indices de ses composantes" style="max-width:min(100%, 420px)"></div>

            <pre class="bloc-code"><code>eleve = ("Alice", 16, 15.5)
eleve[0]       # "Alice" : la première composante
eleve[1]       # 16
eleve[-1]      # 15.5 : la dernière, comme pour les listes
len(eleve)     # 3 : le nombre de composantes</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les crochets servent à lire</span>
              On <strong>crée</strong> un p-uplet avec des parenthèses, mais on
              <strong>lit</strong> ses composantes avec des crochets, exactement comme pour
              une liste. Pour un p-uplet de <em>n</em> composantes, les indices vont de
              0 à <em>n</em> − 1.
            </div>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Le point A",
          contenu: `
            <p>Écris un p-uplet <code>point</code> contenant les coordonnées du point
            <em>A</em> d'abscisse 4 et d'ordonnée −2, puis affiche ces deux coordonnées
            <strong>séparément</strong>, en lisant les composantes de <code>point</code> :</p>
            <pre class="bloc-code"><code>Abscisse : 4
Ordonnée : -2</code></pre>`,
          depart: `point = \n\n`,
          validation: {
            codeContient: [
              { motif: "point\\s*\\[\\s*0\\s*\\]", message: "L'abscisse est la composante d'indice 0." },
              { motif: "point\\s*\\[\\s*(1|-\\s*1)\\s*\\]", message: "L'ordonnée est la composante d'indice 1." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^)\\n]*,\\s*-?\\s*[24]\\s*\\)", message: "N'écris pas les coordonnées à la main dans les print : lis-les dans le p-uplet." },
            ],
            sortie: "Abscisse : 4\nOrdonnée : -2",
            tests: `assert point == (4, -2), "point doit être le couple (4, -2)"`,
          },
          felicitation: "Un point, deux coordonnées, une seule variable. 📍",
          indices: [
            "Le couple s'écrit entre parenthèses : l'abscisse d'abord, l'ordonnée ensuite.",
            "Dans chaque <code>print</code>, un texte puis une composante de <code>point</code> lue entre crochets.",
          ],
          solution: `point = (4, -2)\nprint("Abscisse :", point[0])\nprint("Ordonnée :", point[1])\n`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Lire un triplet",
          contenu: `<p>On considère le p-uplet suivant.</p>`,
          code: `t = (3, 7, 9)`,
          question: "Que valent t[0], t[2], t[-1] et len(t), dans cet ordre ?",
          options: [
            { texte: "3, 7, 9 et 3",
              explication: "<code>t[2]</code> n'est pas 7 : 7 est à l'indice 1. Et <code>t[-1]</code> est la dernière composante." },
            { texte: "3, 9, 9 et 3", correct: true,
              explication: "Oui : indice 0 → 3, indice 2 → 9, et la dernière composante est encore 9. Trois composantes en tout." },
            { texte: "3, 9, 9 et 2",
              explication: "<code>len(t)</code> compte les composantes : il y en a 3. C'est le dernier <em>indice</em> qui vaut 2." },
            { texte: "7, 9, 3 et 3",
              explication: "On a compté à partir de 1. Le premier indice est 0." },
          ],
          apres: `<span class="chapo">Deux chemins vers la même case</span>
            Dans un triplet, <code>t[2]</code> et <code>t[-1]</code> désignent la même
            composante. <code>t[-1]</code> a l'avantage de rester juste quelle que soit la
            longueur.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Est-ce une voyelle ?",
          contenu: `
            <p>L'opérateur <code>in</code> que tu as utilisé sur les listes marche aussi
            sur les p-uplets : <code>x in t</code> vaut <code>True</code> si <code>x</code>
            est l'une des composantes de <code>t</code>, <code>False</code> sinon.</p>
            <p>Affiche si la lettre contenue dans <code>lettre</code> fait partie des
            <code>voyelles</code>. Avec la lettre <code>"k"</code>, la console doit
            montrer :</p>
            <pre class="bloc-code"><code>False</code></pre>
            <p>Change ensuite la valeur de <code>lettre</code> en <code>"e"</code> pour
            vérifier que ton programme affiche <code>True</code>, puis remets
            <code>"k"</code>.</p>`,
          depart: `voyelles = ("a", "e", "i", "o", "u", "y")\nlettre = "k"\n\n`,
          validation: {
            codeContient: [
              { motif: "\\blettre\\s+in\\s+voyelles\\b", message: "Teste l'appartenance de lettre au p-uplet voyelles, avec in." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\(\\s*(True|False)\\s*\\)", message: "La réponse doit être calculée par Python, pas écrite à la main." },
            ],
            sortie: "False",
          },
          felicitation: "in parcourt le p-uplet pour toi. 🔤",
          indices: [
            "Ce qu'il faut afficher est directement le résultat du test <code>… in …</code>.",
            "À gauche du <code>in</code>, la variable qui contient la lettre ; à droite, le p-uplet où la chercher.",
          ],
          solution: `voyelles = ("a", "e", "i", "o", "u", "y")\nlettre = "k"\nprint(lettre in voyelles)\n`,
        },

        {
          id: "d9",
          type: "prediction",
          titre: "Additionner des p-uplets ?",
          contenu: `<p>Les opérateurs <code>+</code> et <code>*</code> ont un sens pour les
            p-uplets. Lis ce programme sans l'exécuter.</p>`,
          code: `t1 = (1, 2)\nt2 = ("a", "b")\nprint(t1 + t2)\nprint(2 * t1)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>(1, 2, 'a', 'b')</code> puis <code>(1, 2, 1, 2)</code>", correct: true,
              explication: "Oui : <code>+</code> <strong>met bout à bout</strong> les deux p-uplets, et <code>2 * t1</code> répète <code>t1</code> deux fois." },
            { texte: "<code>(1, 2, 'a', 'b')</code> puis <code>(2, 4)</code>",
              explication: "La concaténation est juste, mais <code>*</code> ne multiplie pas chaque composante : il répète le p-uplet." },
            { texte: "<code>((1, 2), ('a', 'b'))</code> puis <code>(1, 2, 1, 2)</code>",
              explication: "<code>+</code> ne range pas les deux p-uplets l'un dans l'autre : il les fusionne en un seul, à plat." },
            { texte: "une erreur, car on ne peut pas additionner un nombre et un texte",
              explication: "On n'additionne pas 1 et <code>'a'</code> : on met deux p-uplets bout à bout. Leur contenu n'a pas d'importance." },
          ],
          apres: `<span class="chapo">Concaténation et répétition</span>
            C'est exactement le comportement des listes et des chaînes de caractères :
            <code>+</code> <strong>concatène</strong>, <code>*</code> par un entier
            <strong>répète</strong>. Dans les deux cas, Python fabrique un
            <strong>nouveau</strong> p-uplet — retiens ce mot, il servira à la séance 2.`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Un p-uplet dans un p-uplet",
          contenu: `
            <p>Une composante peut être de n'importe quel type… y compris un autre
            p-uplet. Un segment, par exemple, c'est un couple de points, et chaque point
            est lui-même un couple :</p>

            <pre class="bloc-code"><code>segment = ((0, 0), (4, 3))

segment[1]       # (4, 3) : la deuxième extrémité, un couple
segment[1][0]    # 4 : l'abscisse de cette extrémité
len(segment)     # 2 : deux composantes, qui sont deux points</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Se lit de gauche à droite</span>
              <code>segment[1][0]</code> se lit en deux temps : d'abord
              <code>segment[1]</code>, qui donne le point <code>(4, 3)</code>, puis
              <code>[0]</code> sur ce point. C'est le même geste que pour les matrices du
              chapitre 4, <code>M[i][j]</code>.
            </div>`,
        },

        {
          id: "d11",
          type: "prediction",
          titre: "Combien de composantes ?",
          contenu: `<p>On considère le p-uplet suivant.</p>`,
          code: `t = (1, (2, 3), 4)`,
          question: "Que valent len(t) et t[1][0] ?",
          options: [
            { texte: "4 et 2",
              explication: "<code>(2, 3)</code> ne compte que pour <strong>une</strong> composante de <code>t</code>, même s'il en contient deux." },
            { texte: "3 et 2", correct: true,
              explication: "Oui : trois composantes — <code>1</code>, <code>(2, 3)</code> et <code>4</code>. Puis <code>t[1]</code> vaut <code>(2, 3)</code>, dont l'indice 0 est 2." },
            { texte: "3 et 1",
              explication: "<code>t[1]</code> n'est pas 1 : c'est la composante d'indice 1, le p-uplet <code>(2, 3)</code>." },
            { texte: "3 et (2, 3)",
              explication: "<code>(2, 3)</code>, c'est <code>t[1]</code>. Le <code>[0]</code> qui suit va chercher à l'intérieur." },
          ],
          apres: `<span class="chapo">Un p-uplet imbriqué compte pour un</span>
            <code>len</code> ne regarde pas à l'intérieur des composantes : un p-uplet
            imbriqué est <strong>une</strong> composante, comme un nombre. Ici,
            <code>len(t[1])</code> vaut 2.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>eleve = ("Alice", 16, 15.5)   # un triplet : des parenthèses, des virgules
seul = (5,)                   # une seule composante : la virgule est obligatoire
vide = ()                     # le p-uplet vide

eleve[0]                      # "Alice" : la première composante
eleve[-1]                     # 15.5 : la dernière
len(eleve)                    # 3
16 in eleve                   # True

(1, 2) + ("a",)               # (1, 2, 'a') : concaténation
2 * (1, 2)                    # (1, 2, 1, 2) : répétition
((0, 0), (4, 3))[1][0]        # 4 : un p-uplet dans un p-uplet</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>créer un p-uplet</td><td><code>t = (a, b, c)</code></td></tr>
              <tr><td>lire la composante d'indice <em>i</em></td><td><code>t[i]</code></td></tr>
              <tr><td>lire la dernière composante</td><td><code>t[-1]</code></td></tr>
              <tr><td>connaître le nombre de composantes</td><td><code>len(t)</code></td></tr>
              <tr><td>savoir si <code>x</code> en fait partie</td><td><code>x in t</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>oublier la virgule d'un p-uplet à une composante : <code>(5)</code> est l'entier 5 ;</li>
                <li>lire avec des parenthèses : <code>t(0)</code> appelle <code>t</code> comme une fonction, et c'est une <code>TypeError</code> — on lit avec <code>t[0]</code> ;</li>
                <li>compter à partir de 1, ou demander <code>t[len(t)]</code> : <code>IndexError</code>.</li>
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
          type: "code",
          titre: "La fiche d'un film",
          contenu: `
            <p>Le p-uplet <code>film</code> range un titre, une année de sortie et une
            durée en minutes. Affiche la phrase suivante <strong>en lisant ses
            composantes</strong> :</p>
            <pre class="bloc-code"><code>Wall-E est sorti en 2008 et dure 98 minutes</code></pre>
            <p>Ton programme doit rester juste si l'on remplace le film par un autre.</p>`,
          depart: `film = ("Wall-E", 2008, 98)\n\n`,
          validation: {
            codeContient: [
              { motif: "film\\s*\\[\\s*0\\s*\\]", message: "Le titre est la composante d'indice 0." },
              { motif: "film\\s*\\[\\s*1\\s*\\]", message: "L'année est la composante d'indice 1." },
              { motif: "film\\s*\\[\\s*(2|-\\s*1)\\s*\\]", message: "La durée est la dernière composante." },
            ],
            codeAbsent: [
              { motif: "\\b2008\\b[\\s\\S]*\\b2008\\b|\\b98\\b[\\s\\S]*\\b98\\b|Wall-E[\\s\\S]*Wall-E", message: "N'écris pas les valeurs à la main : lis-les dans le p-uplet." },
            ],
            sortie: "Wall-E est sorti en 2008 et dure 98 minutes",
          },
          felicitation: "Trois lectures, et la phrase s'adapte à n'importe quel film. 🎞️",
          indices: [
            "Un seul <code>print</code>, qui alterne des morceaux de texte et des composantes de <code>film</code> — séparés par des virgules, ou dans une f-string.",
            "Titre, année, durée : les indices 0, 1 et 2.",
          ],
          solution: `film = ("Wall-E", 2008, 98)\nprint(film[0], "est sorti en", film[1], "et dure", film[2], "minutes")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait afficher :</p>
            <pre class="bloc-code"><code>Jour : 14
Mois : juillet
Année : 1789</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `date = (14, "juillet", 1789\nprint("Jour :", date[1])\nprint("Mois :", date[1])\nprint("Année :", date[3])\n`,
          validation: {
            codeContient: [
              { motif: "date\\s*\\[\\s*0\\s*\\]", message: "Le jour est la première composante, d'indice 0." },
              { motif: "date\\s*\\[\\s*(2|-\\s*1)\\s*\\]", message: "L'année est la dernière composante." },
            ],
            sortie: "Jour : 14\nMois : juillet\nAnnée : 1789",
          },
          felicitation: "Une parenthèse oubliée, un décalage, un indice hors limites : les trois classiques. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : Python signale une <code>SyntaxError</code>. Regarde comment se termine la première ligne.",
            "Une fois la date réparée, le jour affiché n'est pas le bon : à quel indice se trouve la première composante ?",
            "La dernière erreur est une <code>IndexError</code> : un triplet n'a que les indices 0, 1 et 2.",
          ],
          solution: `date = (14, "juillet", 1789)\nprint("Jour :", date[0])\nprint("Mois :", date[1])\nprint("Année :", date[2])\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Le week-end",
          contenu: `
            <p>Écris la fonction <code>est_week_end(jour)</code>, qui <strong>renvoie</strong>
            <code>True</code> si <code>jour</code> fait partie du p-uplet
            <code>WEEK_END</code>, et <code>False</code> sinon.</p>
            <pre class="bloc-code"><code>est_week_end("samedi")    # renvoie True
est_week_end("mardi")     # renvoie False</code></pre>`,
          depart: `WEEK_END = ("samedi", "dimanche")\n\n\ndef est_week_end(jour):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer sa réponse." },
              { motif: "\\bin\\s+WEEK_END\\b", message: "Cherche jour dans le p-uplet WEEK_END, avec in." },
            ],
            tests: `assert est_week_end("samedi") == True, "samedi fait partie du week-end"\nassert est_week_end("dimanche") == True, "dimanche fait partie du week-end"\nassert est_week_end("mardi") == False, "mardi n'est pas un jour du week-end"\nassert est_week_end("lundi") == False, "lundi n'est pas un jour du week-end"`,
          },
          felicitation: "Un p-uplet constant, et in pour l'interroger. 🛋️",
          indices: [
            "Pas besoin de <code>if</code> : le test <code>… in …</code> vaut déjà <code>True</code> ou <code>False</code>.",
            "La fonction renvoie directement le résultat de ce test, appliqué à <code>jour</code> et à <code>WEEK_END</code>.",
          ],
          solution: `WEEK_END = ("samedi", "dimanche")\n\n\ndef est_week_end(jour):\n    return jour in WEEK_END\n`,
          apres: `<span class="chapo">Un p-uplet pour une donnée qui ne change pas</span>
            Les jours du week-end ne bougeront pas pendant l'exécution : un p-uplet, écrit
            en <strong>majuscules</strong> comme toute constante, est le bon choix. On
            verra à la séance 2 pourquoi Python garantit qu'il restera intact.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Les sommets d'un triangle",
          contenu: `
            <p>Un triangle est représenté par le p-uplet de ses trois sommets, chacun
            étant un couple <code>(x, y)</code>. Affiche l'<strong>abscisse du deuxième
            sommet</strong>, puis l'<strong>ordonnée du troisième</strong>, en lisant
            <code>triangle</code> :</p>
            <pre class="bloc-code"><code>4
3</code></pre>`,
          depart: `triangle = ((0, 0), (4, 0), (0, 3))\n\n`,
          validation: {
            codeContient: [
              { motif: "triangle\\s*\\[\\s*1\\s*\\]\\s*\\[\\s*0\\s*\\]", message: "Le deuxième sommet est triangle[1] ; son abscisse, sa composante d'indice 0." },
              { motif: "triangle\\s*\\[\\s*(2|-\\s*1)\\s*\\]\\s*\\[\\s*(1|-\\s*1)\\s*\\]", message: "Le troisième sommet est triangle[2] ; son ordonnée, sa composante d'indice 1." },
            ],
            sortie: "4\n3",
          },
          felicitation: "Deux paires de crochets : le sommet, puis la coordonnée. 📐",
          indices: [
            "Commence par afficher <code>triangle[1]</code> tout seul : c'est un couple. Il reste à y lire la bonne coordonnée.",
            "Le premier indice choisit le sommet, le second la coordonnée : 0 pour l'abscisse, 1 pour l'ordonnée.",
          ],
          solution: `triangle = ((0, 0), (4, 0), (0, 3))\nprint(triangle[1][0])\nprint(triangle[2][1])\n`,
        },

        {
          id: "a5",
          type: "prediction",
          titre: "Répéter un p-uplet imbriqué",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `t = 2 * (1, (2, 3))\nprint(len(t))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>2</code>",
              explication: "C'est la longueur de <code>(1, (2, 3))</code>. Mais on l'a répété deux fois." },
            { texte: "<code>4</code>", correct: true,
              explication: "Oui : <code>t</code> vaut <code>(1, (2, 3), 1, (2, 3))</code>. Quatre composantes, dont deux sont des couples." },
            { texte: "<code>6</code>",
              explication: "On a compté les nombres à l'intérieur des couples. <code>len</code> ne regarde pas dedans : <code>(2, 3)</code> compte pour un." },
            { texte: "une erreur, car on ne multiplie pas un p-uplet",
              explication: "Multiplier un p-uplet par un entier le répète : c'est permis." },
          ],
          apres: `<span class="chapo">Les deux règles ensemble</span>
            <code>*</code> répète les composantes telles qu'elles sont, et
            <code>len</code> compte les composantes sans ouvrir celles qui sont
            elles-mêmes des p-uplets.`,
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
          titre: "La date en toutes lettres",
          contenu: `
            <p>Une date est représentée par le triplet <code>(jour, mois, annee)</code>,
            où le mois est un <strong>numéro</strong>, de 1 à 12. Écris la fonction
            <code>en_lettres(date)</code>, qui renvoie la date écrite en toutes lettres,
            en lisant le nom du mois dans le p-uplet <code>MOIS</code>.</p>
            <pre class="bloc-code"><code>en_lettres((14, 7, 1789))    # renvoie "14 juillet 1789"
en_lettres((1, 1, 2000))     # renvoie "1 janvier 2000"</code></pre>
            <p>Pour coller un nombre à un texte, <code>str(n)</code> le convertit en
            chaîne — ou utilise une f-string.</p>`,
          depart: `MOIS = ("janvier", "février", "mars", "avril", "mai", "juin", "juillet",\n        "août", "septembre", "octobre", "novembre", "décembre")\n\n\ndef en_lettres(date):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la date en lettres." },
              { motif: "\\bMOIS\\s*\\[", message: "Le nom du mois se lit dans le p-uplet MOIS." },
            ],
            tests: `assert en_lettres((14, 7, 1789)) == "14 juillet 1789", "en_lettres((14, 7, 1789)) doit renvoyer \\"14 juillet 1789\\""\nassert en_lettres((1, 1, 2000)) == "1 janvier 2000", "le mois numéro 1 est janvier, qui est à l'indice 0 de MOIS"\nassert en_lettres((25, 12, 2026)) == "25 décembre 2026", "le mois numéro 12 est décembre, le dernier"\nassert en_lettres((29, 2, 2024)) == "29 février 2024", "en_lettres((29, 2, 2024)) doit renvoyer \\"29 février 2024\\""`,
          },
          felicitation: "Un numéro humain, un indice Python : il y a toujours un décalage d'une unité. 📅",
          indices: [
            "Le jour est <code>date[0]</code>, le numéro du mois <code>date[1]</code>, l'année <code>date[2]</code>.",
            "Le mois numéro 1, janvier, est à l'indice 0 de <code>MOIS</code> : il faut retirer quelque chose au numéro.",
            "Assemble trois morceaux séparés par des espaces : le jour converti en texte, le nom du mois, l'année convertie en texte.",
          ],
          solution: `MOIS = ("janvier", "février", "mars", "avril", "mai", "juin", "juillet",\n        "août", "septembre", "octobre", "novembre", "décembre")\n\n\ndef en_lettres(date):\n    return str(date[0]) + " " + MOIS[date[1] - 1] + " " + str(date[2])\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Combien de fois ?",
          contenu: `
            <p>Un p-uplet se parcourt avec une boucle <code>for</code>, exactement comme
            une liste. Écris la fonction <code>nb_occurrences(t, x)</code>, qui renvoie le
            nombre de composantes de <code>t</code> égales à <code>x</code>.</p>
            <pre class="bloc-code"><code>nb_occurrences((1, 3, 1, 1, 2), 1)       # renvoie 3
nb_occurrences(("a", "b"), "z")          # renvoie 0</code></pre>`,
          depart: `def nb_occurrences(t, x):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le p-uplet avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nombre trouvé." },
            ],
            codeAbsent: [
              { motif: "\\.count\\s*\\(", message: "Écris le parcours toi-même, sans la méthode count()." },
            ],
            tests: `assert nb_occurrences((1, 3, 1, 1, 2), 1) == 3, "1 apparaît trois fois dans (1, 3, 1, 1, 2)"\nassert nb_occurrences(("a", "b"), "z") == 0, "\\"z\\" n'apparaît pas dans (\\"a\\", \\"b\\")"\nassert nb_occurrences((), 5) == 0, "le p-uplet vide ne contient rien"\nassert nb_occurrences((7, 7, 7), 7) == 3, "dans (7, 7, 7), toutes les composantes valent 7"`,
          },
          felicitation: "Le compteur du chapitre 4, appliqué à un p-uplet : rien n'a changé. 🔁",
          indices: [
            "C'est le schéma du compteur : une variable à 0 avant la boucle, qu'on augmente de 1 à chaque composante égale à <code>x</code>.",
            "On renvoie le compteur <strong>après</strong> la boucle, pas dedans.",
          ],
          solution: `def nb_occurrences(t, x):\n    compteur = 0\n    for element in t:\n        if element == x:\n            compteur = compteur + 1\n    return compteur\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre fiche",
          contenu: `
            <p>À toi de choisir le sujet : un livre, une ville, un joueur, un pays…
            Crée un p-uplet d'<strong>au moins trois</strong> composantes, dont
            <strong>au moins deux types différents</strong>, puis affiche, avec des phrases
            de ton choix :</p>
            <ul>
              <li>sa première composante ;</li>
              <li>sa dernière composante, avec un indice négatif ;</li>
              <li>son nombre de composantes, calculé par <code>len()</code>.</li>
            </ul>`,
          depart: `# Ta fiche ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\[\\s*0\\s*\\]", message: "Affiche la première composante, d'indice 0." },
              { motif: "\\[\\s*-\\s*1\\s*\\]", message: "Affiche la dernière composante avec l'indice -1." },
              { motif: "len\\s*\\(", message: "Le nombre de composantes doit être calculé par len()." },
            ],
            sortieNonVide: true,
            tests: `_fiches = [v for k, v in list(globals().items()) if isinstance(v, tuple) and not k.startswith("_")]\nassert any(len(v) >= 3 for v in _fiches), "Ton p-uplet doit contenir au moins trois composantes."\nassert any(len(v) >= 3 and len(set(type(c) for c in v)) >= 2 for v in _fiches), "Ton p-uplet doit mélanger au moins deux types : du texte et des nombres, par exemple."`,
          },
          felicitation: "Ta fiche, tes phrases : tu sais construire et lire un p-uplet. ✨",
          indices: [
            "Commence par une ligne <code>ma_fiche = ( … )</code> avec au moins trois valeurs, par exemple un texte et deux nombres.",
            "Puis trois <code>print</code> : un pour l'indice 0, un pour l'indice -1, un pour <code>len()</code>.",
          ],
          solution: `livre = ("Le Petit Prince", "Saint-Exupéry", 1943, 96)\nprint("Titre :", livre[0])\nprint("Nombre de pages :", livre[-1])\nprint("Composantes :", len(livre))\n`,
        },
      ],
    },
  ],
};

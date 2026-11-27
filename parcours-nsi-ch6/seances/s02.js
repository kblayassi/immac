/* NSI — chapitre 6, séance 2 : un p-uplet ne se modifie pas.
 * Reprend la définition « immuable » du cours, la section « Convertir un
 * p-uplet en liste », la dernière partie du TP1 (« Un p-uplet n'est pas
 * modifiable par affectation ») et les exercices 3 et 11.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Un p-uplet ne se modifie pas",
  sousTitre: "Remplacer plutôt que modifier",
  palier: "Partie 1 — Les p-uplets",

  accroche: `Un p-uplet ressemble à une liste, à un détail près : une fois créé, il
    ne bouge plus. Impossible d'en changer une composante. Pourquoi Python
    s'impose-t-il cette règle, et comment fait-on quand il faut quand même
    « changer » un p-uplet ? C'est l'objet de cette séance.`,

  objectifs: [
    "reconnaître l'erreur provoquée par une affectation dans un p-uplet",
    "distinguer <strong>modifier</strong> un objet et <strong>remplacer</strong> le contenu d'une variable",
    "fabriquer un nouveau p-uplet avec <code>+</code>, et vérifier avec <code>id()</code> que c'en est un autre",
    "passer d'un p-uplet à une liste et retour avec <code>list()</code> et <code>tuple()</code>",
  ],

  motDeLaFin: `Un p-uplet ne change jamais ; c'est la variable qui, parfois, en désigne
    un nouveau. Cette garantie a un usage immédiat : à la séance 3, une fonction
    renverra <strong>plusieurs valeurs</strong> à la fois, rangées dans un p-uplet.`,

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
          type: "prediction",
          titre: "Changer une composante ?",
          contenu: `<p>Avec une liste, <code>L[1] = 10</code> remplace l'élément d'indice 1.
            Lis ce programme sans l'exécuter.</p>`,
          code: `t = (1, 2, 3)\nt[1] = 10\nprint(t)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>(1, 10, 3)</code>",
              explication: "C'est ce que ferait une liste. Un p-uplet, lui, refuse qu'on touche à ses composantes." },
            { texte: "<code>(1, 2, 3)</code> : l'affectation est ignorée",
              explication: "Python n'ignore jamais une instruction en silence : il exécute, ou il s'arrête sur une erreur." },
            { texte: "<code>(10, 2, 3)</code>",
              explication: "Même si l'affectation était permise, l'indice 1 désigne la deuxième composante, pas la première." },
            { texte: "rien : le programme s'arrête sur une erreur", correct: true,
              explication: "Oui : <code>TypeError: 'tuple' object does not support item assignment</code>. Un p-uplet n'accepte pas l'affectation d'une composante." },
          ],
          apres: `<span class="chapo">Un p-uplet est immuable</span>
            Le message se traduit par « un objet tuple ne permet pas l'affectation d'un
            élément ». On dit que le p-uplet est <strong>immuable</strong> : une fois créé,
            plus aucune de ses composantes ne change. La liste, elle, est
            <strong>mutable</strong>.`,
        },

        {
          id: "d2",
          type: "cours",
          titre: "Pourquoi s'interdire de modifier ?",
          contenu: `
            <div class="encadre">
              <span class="chapo">Immuable</span>
              Un objet est <strong>immuable</strong> quand son contenu ne peut plus changer
              après sa création. Les p-uplets sont immuables, comme les chaînes de
              caractères du chapitre 4 ; les listes ne le sont pas.
            </div>

            <p>Cette contrainte est une <strong>garantie</strong>. Une date de naissance,
            les coordonnées d'un sommet, les jours du week-end : ces données n'ont aucune
            raison de changer pendant l'exécution. En les rangeant dans un p-uplet, on est
            sûr qu'aucune ligne du programme — ni une fonction à qui on les confie — ne
            les abîmera par erreur.</p>

            <p>Pour « changer » un p-uplet, on fait donc comme avec les chaînes : on en
            <strong>fabrique un nouveau</strong>, et on le range dans la variable.</p>

            <pre class="bloc-code"><code>joueur = ("Léa", 10)
joueur[1] = 12                  # TypeError : interdit
joueur = (joueur[0], 12)        # permis : un nouveau p-uplet, rangé dans joueur</code></pre>`,
        },

        {
          id: "d3",
          type: "code",
          titre: "Le nouveau score de Léa",
          contenu: `
            <p>Ce programme veut faire passer le score de Léa à 12, mais il s'arrête sur
            une <code>TypeError</code>. Exécute-le pour voir l'erreur, puis corrige-le :
            range dans <code>joueur</code> un <strong>nouveau</strong> p-uplet, qui reprend
            le nom lu dans l'ancien. La console doit montrer :</p>
            <pre class="bloc-code"><code>('Léa', 12)</code></pre>`,
          depart: `joueur = ("Léa", 10)\njoueur[1] = 12\nprint(joueur)\n`,
          validation: {
            codeAbsent: [
              { motif: "joueur\\s*\\[[^\\]]*\\]\\s*=(?!=)", message: "On ne peut pas affecter une composante d'un p-uplet : fabrique un nouveau p-uplet entier." },
              { motif: "[\"']Léa[\"'][\\s\\S]*[\"']Léa[\"']", message: "N'écris pas le nom une deuxième fois : lis-le dans l'ancien p-uplet." },
            ],
            codeContient: [
              { motif: "joueur\\s*\\[\\s*0\\s*\\]", message: "Le nom se lit dans l'ancien p-uplet : c'est sa composante d'indice 0." },
            ],
            sortie: "('Léa', 12)",
            tests: `assert joueur == ("Léa", 12), "joueur doit finir par valoir (\\"Léa\\", 12)"`,
          },
          felicitation: "On ne modifie pas le p-uplet : on en range un autre dans la variable. 🔁",
          indices: [
            "La deuxième ligne est celle qui fâche Python : elle doit disparaître, remplacée par une affectation de <code>joueur</code> tout entier.",
            "Le nouveau couple s'écrit entre parenthèses : en premier la composante d'indice 0 de l'ancien <code>joueur</code>, en second le nouveau score.",
          ],
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Une concaténation qui ne change rien ?",
          contenu: `<p>Lis ce programme sans l'exécuter. Attention à la dernière ligne.</p>`,
          code: `t = (4, 8, 15, 16)\nprint(t[-1])\nprint(len(t))\nprint(t + (23, 42))\nprint(t)`,
          question: "Que montrent les quatre lignes affichées ?",
          options: [
            { texte: "<code>16</code>, <code>4</code>, <code>(4, 8, 15, 16, 23, 42)</code>, <code>(4, 8, 15, 16, 23, 42)</code>",
              explication: "La troisième ligne affiche bien la concaténation, mais elle ne la range nulle part : <code>t</code> n'a pas changé." },
            { texte: "<code>16</code>, <code>4</code>, <code>(4, 8, 15, 16, 23, 42)</code>, <code>(4, 8, 15, 16)</code>", correct: true,
              explication: "Oui : <code>t + (23, 42)</code> fabrique un <strong>nouveau</strong> p-uplet, aussitôt affiché puis oublié. <code>t</code> est intact." },
            { texte: "<code>16</code>, <code>3</code>, <code>(4, 8, 15, 16, 23, 42)</code>, <code>(4, 8, 15, 16)</code>",
              explication: "<code>len(t)</code> compte les composantes : il y en a 4. C'est le dernier indice qui vaut 3." },
            { texte: "<code>16</code>, <code>4</code>, puis une erreur, car un p-uplet ne se modifie pas",
              explication: "La concaténation ne modifie rien : elle crée un autre p-uplet. Elle est donc permise." },
          ],
          apres: `<span class="chapo">Un résultat qu'on ne range pas est perdu</span>
            <code>+</code> ne touche jamais aux p-uplets qu'il assemble. Pour garder le
            résultat, il faut l'affecter à une variable — éventuellement la même :
            <code>t = t + (23, 42)</code>.`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Remplacer n'est pas modifier",
          contenu: `
            <p>Que se passe-t-il exactement quand on écrit <code>t = t + (4,)</code> ?</p>
            <ol>
              <li>Python calcule <code>t + (4,)</code> : il fabrique un <strong>nouveau</strong>
              p-uplet <code>(1, 2, 3, 4)</code>, ailleurs en mémoire ;</li>
              <li>la variable <code>t</code> désigne désormais ce nouveau p-uplet ;</li>
              <li>l'ancien <code>(1, 2, 3)</code>, que plus rien ne désigne, est abandonné.
              Il n'a jamais été modifié.</li>
            </ol>

            <p>La fonction <code>id()</code>, déjà croisée au chapitre 4, le confirme : elle
            renvoie l'<strong>identifiant</strong> d'un objet, c'est-à-dire une sorte
            d'adresse en mémoire. Deux objets différents n'ont jamais le même.</p>

            <pre class="bloc-code"><code>t = (1, 2, 3)
avant = id(t)
t = t + (4,)
print(id(t) == avant)     # False : t désigne un autre objet</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">(4,) et pas (4)</span>
              On ne peut concaténer qu'un p-uplet avec un p-uplet. Pour ajouter une seule
              valeur, on l'emballe dans un p-uplet d'une composante — avec sa virgule,
              souviens-toi de la séance 1.
            </div>`,
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Le même objet ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `t = (1, 2, 3)\nprint(id(t))\nt = t + (4,)\nprint(t)\nprint(id(t))`,
          question: "Les deux appels à id() affichent-ils le même nombre ?",
          options: [
            { texte: "oui : c'est toujours la variable <code>t</code>",
              explication: "<code>id()</code> ne regarde pas le nom de la variable, mais l'objet qu'elle désigne. Et cet objet a changé." },
            { texte: "non : <code>t</code> désigne maintenant un autre p-uplet", correct: true,
              explication: "Oui : la concaténation a fabriqué un nouveau p-uplet <code>(1, 2, 3, 4)</code>, et <code>t</code> a été réaffectée vers lui." },
            { texte: "oui : on a ajouté 4 au p-uplet de départ",
              explication: "C'est justement impossible : un p-uplet est immuable. On n'a rien ajouté <em>à</em> l'ancien ; on en a fait un autre." },
            { texte: "le programme s'arrête sur une erreur à la troisième ligne",
              explication: "<code>t + (4,)</code> concatène deux p-uplets : c'est permis, et cela ne modifie ni l'un ni l'autre." },
          ],
          apres: `<span class="chapo">L'immuabilité est respectée</span>
            Le p-uplet de départ n'a pas bougé : c'est la <strong>variable</strong> qui a
            changé de cible. Exactement ce qui se passait au chapitre 4 avec
            <code>mot = mot + "s"</code> sur une chaîne de caractères.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Ajouter une composante",
          contenu: `
            <p>Fais en sorte que <code>t</code> désigne un p-uplet qui contient, en plus,
            la valeur <code>4</code> à la fin. Puis affiche <code>t</code>, et affiche si
            son identifiant est encore celui mémorisé dans <code>avant</code>. La console
            doit montrer :</p>
            <pre class="bloc-code"><code>(1, 2, 3, 4)
False</code></pre>`,
          depart: `t = (1, 2, 3)\navant = id(t)\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bt\\s*=\\s*t\\s*\\+", message: "Range dans t la concaténation de t et d'un autre p-uplet." },
              { motif: "\\bid\\s*\\(\\s*t\\s*\\)[\\s\\S]*\\bid\\s*\\(\\s*t\\s*\\)", message: "Compare id(t), calculé après la concaténation, à la valeur de avant." },
              { motif: "\\bavant\\b[\\s\\S]*\\bavant\\b", message: "Sers-toi de la variable avant pour comparer." },
            ],
            codeAbsent: [
              { motif: "\\(\\s*1\\s*,\\s*2\\s*,\\s*3\\s*,\\s*4\\s*\\)", message: "N'écris pas le résultat à la main : fabrique-le par concaténation." },
              { motif: "print\\s*\\(\\s*(True|False)\\s*\\)", message: "La comparaison doit être calculée par Python." },
            ],
            sortie: "(1, 2, 3, 4)\nFalse",
            tests: `assert t == (1, 2, 3, 4), "t doit finir par valoir (1, 2, 3, 4)"`,
          },
          felicitation: "Un nouveau p-uplet, un nouvel identifiant : la preuve par id(). 🆔",
          indices: [
            "On ne concatène qu'un p-uplet avec un p-uplet : la valeur 4 doit être emballée dans un p-uplet d'une seule composante.",
            "Affecte à <code>t</code> la somme de <code>t</code> et de ce petit p-uplet, puis affiche <code>t</code>.",
            "Pour la dernière ligne, affiche le résultat de la comparaison <code>==</code> entre l'identifiant actuel de <code>t</code> et <code>avant</code>.",
          ],
        },

        {
          id: "d8",
          type: "qcm",
          titre: "Et avec une liste ?",
          contenu: `<p>Comparons avec une liste, qui, elle, est mutable.</p>`,
          code: `L = [1, 2, 3]\navant = id(L)\nL.append(4)\nprint(id(L) == avant)`,
          question: "Qu'affiche ce programme, et pourquoi ?",
          options: [
            { texte: "<code>False</code> : <code>append()</code> fabrique une nouvelle liste",
              explication: "<code>append()</code> ne fabrique rien : il ajoute l'élément dans la liste existante." },
            { texte: "<code>True</code> : la liste a été modifiée <strong>sur place</strong>", correct: true,
              explication: "Oui : l'objet reste le même, seul son contenu a changé. C'est toute la différence entre <strong>modifier</strong> un objet et <strong>remplacer</strong> le contenu d'une variable." },
            { texte: "<code>True</code> : <code>id()</code> renvoie toujours le même nombre pour une même variable",
              explication: "La séance vient de montrer le contraire avec <code>t = t + (4,)</code>. <code>id()</code> suit l'objet, pas le nom." },
            { texte: "une erreur, car on ne peut pas ajouter à une liste",
              explication: "Ajouter à une liste, c'est précisément le rôle d'<code>append()</code>, vu au chapitre 4." },
          ],
          apres: `<span class="chapo">Modifier ou remplacer</span>
            <code>L.append(4)</code> <strong>modifie</strong> la liste : même objet, contenu
            différent. <code>t = t + (4,)</code> <strong>remplace</strong> : nouvel objet,
            l'ancien reste intact. Un p-uplet ne connaît que la seconde façon.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Passer par une liste",
          contenu: `
            <p>Un p-uplet et une liste se ressemblent tant qu'on passe facilement de l'un à
            l'autre :</p>

            <pre class="bloc-code"><code>coordonnees = (1, 2, 3)

L = list(coordonnees)    # [1, 2, 3] : une liste, donc modifiable
L[0] = 100               # permis !
T = tuple(L)             # (100, 2, 3) : de nouveau un p-uplet</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le détour classique</span>
              Pour « modifier » un p-uplet : on le <strong>convertit</strong> en liste, on
              travaille sur la liste, puis on <strong>reconstruit</strong> un p-uplet.
              <code>list()</code> et <code>tuple()</code> fabriquent chacune un nouvel
              objet : le p-uplet de départ, lui, n'a pas bougé.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Le détour par une liste",
          contenu: `
            <p>Fabrique, à partir de <code>coordonnees</code>, le p-uplet
            <code>nouvelles</code> dont la <strong>première</strong> composante vaut 100,
            en passant par une liste. Affiche ensuite les deux p-uplets : l'original doit
            être intact.</p>
            <pre class="bloc-code"><code>(1, 2, 3)
(100, 2, 3)</code></pre>`,
          depart: `coordonnees = (1, 2, 3)\n\n`,
          validation: {
            codeContient: [
              { motif: "\\blist\\s*\\(\\s*coordonnees\\s*\\)", message: "Commence par convertir coordonnees en liste avec list()." },
              { motif: "\\btuple\\s*\\(", message: "Reconstruis un p-uplet à partir de la liste, avec tuple()." },
              { motif: "\\[\\s*0\\s*\\]\\s*=(?!=)", message: "Sur la liste, remplace l'élément d'indice 0." },
            ],
            codeAbsent: [
              { motif: "\\(\\s*100\\s*,\\s*2\\s*,\\s*3\\s*\\)", message: "N'écris pas le résultat à la main : fabrique-le à partir de coordonnees." },
            ],
            sortie: "(1, 2, 3)\n(100, 2, 3)",
            tests: `assert coordonnees == (1, 2, 3), "coordonnees ne doit pas changer"\nassert nouvelles == (100, 2, 3), "nouvelles doit valoir (100, 2, 3)"\nassert type(nouvelles) == tuple, "nouvelles doit être un p-uplet, pas une liste"`,
          },
          felicitation: "Convertir, modifier, reconstruire : le détour est en place. 🛠️",
          indices: [
            "Trois temps : une variable reçoit la conversion de <code>coordonnees</code> en liste ; on modifie son premier élément ; <code>nouvelles</code> reçoit la conversion de cette liste en p-uplet.",
            "Pour finir, deux <code>print</code> : l'un pour <code>coordonnees</code>, l'autre pour <code>nouvelles</code>.",
          ],
        },

        {
          id: "d11",
          type: "prediction",
          titre: "Convertir une liste d'un seul élément",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `L = [5]\nprint(tuple(L))`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>(5)</code>",
              explication: "Python n'affiche jamais un p-uplet d'une composante sans sa virgule : <code>(5)</code> serait l'entier 5." },
            { texte: "<code>(5,)</code>", correct: true,
              explication: "Oui : un p-uplet d'une seule composante, que Python affiche avec sa virgule pour ne pas le confondre avec l'entier 5." },
            { texte: "<code>5</code>",
              explication: "<code>tuple()</code> renvoie toujours un p-uplet, même quand il n'y a qu'une valeur à ranger." },
            { texte: "<code>[5]</code>",
              explication: "Ce serait la liste elle-même. <code>tuple()</code> en fabrique un p-uplet." },
          ],
          apres: `<span class="chapo">La virgule, encore elle</span>
            À l'affichage aussi, c'est la virgule qui signale un p-uplet d'une seule
            composante.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>t = (1, 2, 3)
t[0] = 5                  # TypeError : un p-uplet est immuable

t = t + (4,)              # permis : un NOUVEAU p-uplet, rangé dans t
t = (5,) + t              # (5, 1, 2, 3, 4)

L = list(t)               # une liste, modifiable
L[0] = 100
t = tuple(L)              # de nouveau un p-uplet</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>p-uplet</th><th>liste</th></tr>
              <tr><td>création</td><td><code>(1, 2, 3)</code></td><td><code>[1, 2, 3]</code></td></tr>
              <tr><td>lire <code>x[i]</code></td><td>oui</td><td>oui</td></tr>
              <tr><td>affecter <code>x[i] = v</code></td><td><strong>non</strong> : <code>TypeError</code></td><td>oui</td></tr>
              <tr><td>ajouter un élément</td><td>non : on en fabrique un autre avec <code>+</code></td><td><code>append()</code>, sur place</td></tr>
              <tr><td>conversion</td><td><code>tuple(L)</code></td><td><code>list(t)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>affecter une composante : <code>t[0] = 5</code> est une <code>TypeError</code> ;</li>
                <li>calculer <code>t + (4,)</code> sans ranger le résultat : <code>t</code> ne change pas ;</li>
                <li>concaténer un nombre seul : <code>t + 4</code> est une <code>TypeError</code>, il faut <code>t + (4,)</code>.</li>
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
          titre: "Chasse aux bugs : bonne année !",
          contenu: `
            <p>Ce programme part du 31 décembre 2025 et devrait afficher le lendemain :</p>
            <pre class="bloc-code"><code>Le lendemain : (1, 1, 2026)</code></pre>
            <p>Il contient <strong>deux erreurs</strong> de natures différentes. L'année
            doit rester calculée à partir de <code>date</code>.</p>`,
          depart: `date = (31, 12, 2025)\ndate[0] = 1\ndate[1] = 1\ndate[2] = date[2] + 1\nprint("Le lendemain :" date)\n`,
          validation: {
            codeAbsent: [
              { motif: "date\\s*\\[[^\\]]*\\]\\s*=(?!=)", message: "Un p-uplet ne se modifie pas composante par composante : fabrique-en un nouveau." },
              { motif: "\\b2026\\b", message: "L'année du lendemain doit être calculée à partir de date, pas écrite à la main." },
            ],
            codeContient: [
              { motif: "date\\s*\\[\\s*(2|-\\s*1)\\s*\\]\\s*\\+\\s*1", message: "L'année du lendemain, c'est l'année de date plus 1." },
            ],
            sortie: "Le lendemain : (1, 1, 2026)",
          },
          felicitation: "Une virgule oubliée, et trois affectations interdites remplacées par une seule. 🎆",
          indices: [
            "La première erreur empêche le programme de démarrer : regarde ce qui sépare le texte de la variable dans le <code>print</code>.",
            "La seconde est une <code>TypeError</code> : les trois lignes du milieu tentent de modifier un p-uplet.",
            "Remplace-les par une seule affectation de <code>date</code> : un nouveau triplet dont le jour et le mois valent 1 et dont l'année se calcule à partir de l'ancienne.",
          ],
        },

        {
          id: "a2",
          type: "qcm",
          titre: "Laquelle ne passe pas ?",
          contenu: `<p>On part de <code>t = (1, 2, 3)</code>.</p>`,
          question: "Laquelle de ces instructions provoque une erreur ?",
          options: [
            { texte: "<code>t = (5, 2, 3)</code>",
              explication: "On range un tout nouveau p-uplet dans la variable : rien n'est modifié, c'est permis." },
            { texte: "<code>t = t + (4,)</code>",
              explication: "La concaténation fabrique un nouveau p-uplet, qu'on range dans <code>t</code> : permis." },
            { texte: "<code>t[0] = 5</code>", correct: true,
              explication: "Oui : c'est la seule qui tente de <strong>modifier</strong> le p-uplet existant. <code>TypeError</code>." },
            { texte: "<code>L = list(t)</code>",
              explication: "La conversion fabrique une liste, sans toucher au p-uplet : permis." },
          ],
          apres: `<span class="chapo">Le critère</span>
            Une instruction qui affecte une composante, <code>t[i] = …</code>, est refusée.
            Toutes celles qui affectent la <strong>variable</strong>, <code>t = …</code>,
            sont acceptées.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Ajouter à la fin",
          contenu: `
            <p>Écris la fonction <code>ajouter_fin(t, x)</code>, qui renvoie un
            <strong>nouveau</strong> p-uplet : celui de <code>t</code>, avec
            <code>x</code> en plus à la fin.</p>
            <pre class="bloc-code"><code>ajouter_fin((1, 2), 3)      # renvoie (1, 2, 3)
ajouter_fin((), "a")        # renvoie ('a',)</code></pre>`,
          depart: `def ajouter_fin(t, x):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nouveau p-uplet." },
              { motif: "\\(\\s*x\\s*,\\s*\\)", message: "Emballe x dans un p-uplet d'une composante, avec sa virgule." },
            ],
            codeAbsent: [
              { motif: "\\blist\\s*\\(", message: "Pas besoin de liste ici : une concaténation suffit." },
            ],
            tests: `assert ajouter_fin((1, 2), 3) == (1, 2, 3), "ajouter_fin((1, 2), 3) doit renvoyer (1, 2, 3)"\nassert ajouter_fin((), "a") == ("a",), "ajouter_fin((), \\"a\\") doit renvoyer (\\"a\\",)"\nassert ajouter_fin((7,), (8, 9)) == (7, (8, 9)), "x peut être lui-même un p-uplet : il devient UNE composante de plus"\n_t = (4, 5)\n_r = ajouter_fin(_t, 6)\nassert _t == (4, 5), "le p-uplet reçu ne doit pas changer (et de toute façon, il ne peut pas)"`,
          },
          felicitation: "Une virgule et un + : la fonction ne touche à rien, elle fabrique. ➕",
          indices: [
            "On ne peut concaténer que deux p-uplets : il faut d'abord faire de <code>x</code> un p-uplet d'une composante.",
            "La fonction renvoie la concaténation de <code>t</code> et de ce petit p-uplet.",
          ],
          apres: `<span class="chapo">Pourquoi (x,) et pas x ?</span>
            Avec <code>(x,)</code>, <code>x</code> devient <strong>une</strong> composante,
            quel que soit son type : c'est ce que vérifiait le troisième test, où
            <code>x</code> était le couple <code>(8, 9)</code>.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Remplacer une composante",
          contenu: `
            <p>Écris la fonction <code>remplacer(t, i, valeur)</code>, qui renvoie un
            <strong>nouveau</strong> p-uplet identique à <code>t</code>, sauf la composante
            d'indice <code>i</code>, qui vaut <code>valeur</code>. Passe par une liste.</p>
            <pre class="bloc-code"><code>remplacer((1, 2, 3), 0, 100)      # renvoie (100, 2, 3)
remplacer(("a", "b"), 1, "z")     # renvoie ('a', 'z')</code></pre>`,
          depart: `def remplacer(t, i, valeur):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\blist\\s*\\(\\s*t\\s*\\)", message: "Convertis d'abord t en liste, avec list()." },
              { motif: "\\btuple\\s*\\(", message: "Reconstruis un p-uplet avant de le renvoyer, avec tuple()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nouveau p-uplet." },
            ],
            tests: `assert remplacer((1, 2, 3), 0, 100) == (100, 2, 3), "remplacer((1, 2, 3), 0, 100) doit renvoyer (100, 2, 3)"\nassert remplacer(("a", "b"), 1, "z") == ("a", "z"), "remplacer((\\"a\\", \\"b\\"), 1, \\"z\\") doit renvoyer (\\"a\\", \\"z\\")"\nassert remplacer((4, 5, 6), -1, 0) == (4, 5, 0), "un indice négatif doit marcher aussi"\nassert type(remplacer((1, 2), 0, 9)) == tuple, "la fonction doit renvoyer un p-uplet, pas une liste"\n_t = (1, 2, 3)\n_r = remplacer(_t, 1, 0)\nassert _t == (1, 2, 3), "le p-uplet reçu ne doit pas changer"`,
          },
          felicitation: "Le détour par une liste, rangé dans une fonction réutilisable. 🧰",
          indices: [
            "C'est le détour de la découverte, avec <code>i</code> et <code>valeur</code> à la place de 0 et de 100.",
            "Une variable reçoit la liste fabriquée à partir de <code>t</code> ; on y remplace l'élément d'indice <code>i</code> ; on renvoie la conversion de cette liste en p-uplet.",
          ],
        },

        {
          id: "a5",
          type: "prediction",
          titre: "Deux variables, un p-uplet",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `t = (1, 2)\nu = t\nt = t + (3,)\nprint(u)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>(1, 2)</code>", correct: true,
              explication: "Oui : <code>u</code> désigne toujours l'ancien p-uplet. La troisième ligne a réaffecté <code>t</code> vers un nouveau, sans toucher à l'ancien." },
            { texte: "<code>(1, 2, 3)</code>",
              explication: "Ce serait le cas avec une liste et <code>append()</code>, qui modifie l'objet partagé. Ici, rien n'a été modifié : <code>t</code> a changé de cible, pas <code>u</code>." },
            { texte: "<code>(3,)</code>",
              explication: "<code>u</code> n'a jamais reçu <code>(3,)</code> : seule <code>t</code> a été réaffectée." },
            { texte: "une erreur, car <code>u</code> et <code>t</code> désignent le même p-uplet",
              explication: "Deux variables peuvent désigner le même objet : c'est permis, et sans danger pour un objet immuable." },
          ],
          apres: `<span class="chapo">Aucun alias dangereux</span>
            Au chapitre 4, deux variables qui désignaient la même liste réservaient des
            surprises : modifier l'une, c'était modifier l'autre. Avec un p-uplet, ce
            piège n'existe pas — puisque rien ne peut le modifier.`,
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
          titre: "À l'envers",
          contenu: `
            <p>Écris la fonction <code>inverser(t)</code>, qui renvoie un nouveau p-uplet
            contenant les composantes de <code>t</code> dans l'ordre inverse. Construis le
            résultat avec une boucle, sans <code>[::-1]</code> ni <code>reversed()</code>.</p>
            <pre class="bloc-code"><code>inverser((1, 2, 3))       # renvoie (3, 2, 1)
inverser(("a",))          # renvoie ('a',)</code></pre>`,
          depart: `def inverser(t):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours t avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le p-uplet inversé." },
            ],
            codeAbsent: [
              { motif: "::\\s*-\\s*1", message: "Construis le résultat toi-même, sans [::-1]." },
              { motif: "\\breversed\\s*\\(", message: "Construis le résultat toi-même, sans reversed()." },
              { motif: "\\.reverse\\s*\\(", message: "Construis le résultat toi-même, sans reverse()." },
            ],
            tests: `assert inverser((1, 2, 3)) == (3, 2, 1), "inverser((1, 2, 3)) doit renvoyer (3, 2, 1)"\nassert inverser(("a",)) == ("a",), "un p-uplet d'une composante reste le même"\nassert inverser(()) == (), "le p-uplet vide reste vide"\nassert inverser((1, (2, 3))) == ((2, 3), 1), "une composante qui est un p-uplet se déplace en bloc"\nassert type(inverser([1, 2])) == tuple, "la fonction doit renvoyer un p-uplet"`,
          },
          felicitation: "Construire pièce par pièce, puisqu'on ne peut rien déplacer. 🔄",
          indices: [
            "Deux méthodes : partir du p-uplet vide et coller chaque composante <strong>devant</strong> le résultat ; ou remplir une liste, puis la convertir.",
            "Avec la première : à chaque tour, le résultat devient la concaténation du p-uplet d'une composante <code>(element,)</code> et du résultat actuel — dans cet ordre.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Sans doublons",
          contenu: `
            <p>Écris la fonction <code>sans_doublons(t)</code>, qui renvoie un nouveau
            p-uplet où chaque valeur de <code>t</code> n'apparaît qu'<strong>une
            fois</strong>, à la place de sa première apparition.</p>
            <pre class="bloc-code"><code>sans_doublons((3, 1, 3, 2, 1))     # renvoie (3, 1, 2)
sans_doublons(("a", "a"))          # renvoie ('a',)</code></pre>`,
          depart: `def sans_doublons(t):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours t avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nouveau p-uplet." },
            ],
            codeAbsent: [
              { motif: "\\bset\\s*\\(", message: "Les ensembles (set) sont hors programme : construis le résultat avec une boucle." },
              { motif: "\\bdict\\.fromkeys\\b|\\.fromkeys\\s*\\(", message: "Construis le résultat avec une boucle." },
            ],
            tests: `assert sans_doublons((3, 1, 3, 2, 1)) == (3, 1, 2), "sans_doublons((3, 1, 3, 2, 1)) doit renvoyer (3, 1, 2)"\nassert sans_doublons(("a", "a")) == ("a",), "sans_doublons((\\"a\\", \\"a\\")) doit renvoyer (\\"a\\",)"\nassert sans_doublons(()) == (), "le p-uplet vide reste vide"\nassert sans_doublons((1, 2, 3)) == (1, 2, 3), "sans doublon au départ, rien ne change"\nassert type(sans_doublons((1, 1))) == tuple, "la fonction doit renvoyer un p-uplet"`,
          },
          felicitation: "in pour vérifier, + ou append pour garder : chaque valeur une seule fois. 🧹",
          indices: [
            "On construit le résultat au fil du parcours : une composante n'y entre que si elle n'y est pas déjà.",
            "Le test « n'y est pas déjà » s'écrit avec <code>not in</code>, appliqué au résultat en cours de construction.",
            "Si tu remplis une liste, n'oublie pas de la convertir en p-uplet avant de la renvoyer.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta propre retouche",
          contenu: `
            <p>À toi de choisir : un pays et sa capitale, un personnage et ses points de
            vie, une recette… Crée un p-uplet d'<strong>au moins trois</strong>
            composantes, puis fabrique, <strong>en passant par une liste</strong>, un
            second p-uplet où <strong>une seule</strong> composante a changé.</p>
            <p>Affiche les deux p-uplets : le premier doit être intact.</p>`,
          depart: `# Ton p-uplet ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\blist\\s*\\(", message: "Passe par une liste : convertis ton p-uplet avec list()." },
              { motif: "\\btuple\\s*\\(", message: "Reconstruis un p-uplet avec tuple()." },
            ],
            sortieNonVide: true,
            tests: `_pu = [v for k, v in list(globals().items()) if isinstance(v, tuple) and not k.startswith("_")]\nassert any(len(v) >= 3 for v in _pu), "Ton p-uplet de départ doit contenir au moins trois composantes."\nassert any(len(a) == len(b) and sum(1 for x, y in zip(a, b) if x != y) == 1 for a in _pu for b in _pu), "Il faut deux p-uplets de même longueur qui diffèrent d'une seule composante."`,
          },
          felicitation: "Un original intact, une copie retouchée : tu maîtrises l'immuabilité. ✨",
          indices: [
            "Commence par une ligne <code>original = ( … )</code> avec au moins trois valeurs.",
            "Puis le détour : une liste fabriquée à partir de l'original, une case remplacée, un nouveau p-uplet fabriqué à partir de la liste. Deux <code>print</code> pour finir.",
          ],
        },
      ],
    },
  ],
};

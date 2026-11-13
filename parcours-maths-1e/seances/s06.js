/* Maths Première — séance 6 : modifier et remplir une liste.
 * Reprend la séance 2 du parcours NSI chapitre 4, en plus accessible : L[i] = …,
 * append(), la liste vide remplie par une boucle, sum / min / max / in.
 * Fil rouge maths : la liste des termes d'une suite (explicite, récurrente,
 * Fibonacci), une série statistique, une somme de termes, les diviseurs.
 */

export default {
  id: "s06",
  numero: 6,
  titre: "Modifier et remplir une liste",
  sousTitre: "append() et une boucle : la liste des termes d'une suite",
  palier: "Partie 2 — Les listes",

  accroche: `Une liste n'est pas figée : on peut changer une de ses valeurs, et surtout en
    <strong>ajouter</strong> au bout. Avec une boucle, Python peut alors remplir une liste
    tout seul — par exemple avec les vingt premiers termes d'une suite. C'est ce que le
    programme de maths appelle « générer une liste par ajouts successifs ».`,

  objectifs: [
    "modifier un élément avec <code>L[i] = valeur</code>",
    "ajouter un élément en fin de liste avec <code>append()</code>",
    "remplir une liste vide avec une boucle",
    "utiliser <code>sum</code>, <code>min</code>, <code>max</code> et <code>in</code>",
  ],

  motDeLaFin: `Tu sais construire la liste des termes de n'importe quelle suite, et en
    calculer la somme, le minimum ou le maximum. À la séance 7, on apprend à
    <strong>parcourir</strong> une liste élément par élément : pour compter, chercher, ou
    construire un tableau de valeurs.`,

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
          titre: "Modifier un élément",
          contenu: `
            <p>On a vu que <code>L[i]</code> permet de <strong>lire</strong> la case
            d'indice <code>i</code>. Placé à gauche d'un signe <code>=</code>, il permet
            aussi de la <strong>modifier</strong> :</p>

            <pre class="bloc-code"><code>notes = [12, 15, 9, 14]
notes[2] = 11          # la case d'indice 2 reçoit 11
print(notes)           # affiche [12, 15, 11, 14]</code></pre>

            <p>L'ancienne valeur est remplacée ; les autres cases ne bougent pas, et la
            liste garde la même longueur.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Corriger une erreur",
          contenu: `
            <p>La liste <code>termes</code> devait contenir les termes
            <em>u</em><sub>0</sub> à <em>u</em><sub>4</sub> de la suite
            <em>u</em><sub>0</sub> = 3, <em>u</em><sub><em>n</em>+1</sub> =
            2<em>u<sub>n</sub></em> + 1. Mais <em>u</em><sub>3</sub> a été mal recopié :
            il vaut 31, pas 30.</p>
            <p>Corrige la case de <em>u</em><sub>3</sub> <strong>sans réécrire toute la
            liste</strong>, puis affiche la liste :</p>
            <pre class="bloc-code"><code>[3, 7, 15, 31, 63]</code></pre>`,
          depart: `termes = [3, 7, 15, 30, 63]\n\n`,
          validation: {
            codeContient: [
              { motif: "termes\\s*\\[\\s*3\\s*\\]\\s*=\\s*31", message: "Modifie la case d'indice 3 : termes[3] reçoit 31." },
              { motif: "print\\s*\\(\\s*termes\\s*\\)", message: "Affiche la liste après la correction." },
            ],
            codeAbsent: [
              { motif: "termes\\s*=\\s*\\[[^\\n]*31", message: "Ne réécris pas toute la liste : modifie seulement la case fautive." },
            ],
            sortie: "[3, 7, 15, 31, 63]",
          },
          felicitation: "Une seule case modifiée, le reste intact. ✏️",
          indices: [
            "<em>u</em><sub>3</sub> est à l'indice 3, puisque la liste commence à <em>u</em><sub>0</sub>.",
            "Écris la case à gauche du signe <code>=</code>, et la bonne valeur à droite. Puis un <code>print</code> de la liste.",
          ],
        },

        {
          id: "d3",
          type: "cours",
          titre: "Ajouter à la fin : append()",
          contenu: `
            <p>La <strong>méthode</strong> <code>append()</code> (« ajouter à la fin »)
            ajoute un élément <strong>au bout</strong> de la liste, qui s'allonge
            d'une case :</p>

            <pre class="bloc-code"><code>L = [2, 4]
L.append(6)       # L vaut maintenant [2, 4, 6]
L.append(8)       # L vaut maintenant [2, 4, 6, 8]
print(len(L))     # affiche 4</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une écriture particulière</span>
              Une méthode s'écrit <strong>après</strong> la liste, avec un point :
              <code>L.append(6)</code>, et non <code>append(L, 6)</code>. Elle modifie
              directement la liste : il n'y a rien à ranger avec un signe
              <code>=</code>.
            </div>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Deux termes de plus",
          contenu: `
            <p>La liste <code>termes</code> contient <em>u</em><sub>0</sub>,
            <em>u</em><sub>1</sub> et <em>u</em><sub>2</sub> de la suite
            <em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 1.</p>
            <p>Ajoute <em>u</em><sub>3</sub> puis <em>u</em><sub>4</sub> avec deux
            <code>append()</code>, en calculant chaque fois le nouveau terme à partir du
            <strong>dernier élément</strong> de la liste. Puis affiche la liste :</p>
            <pre class="bloc-code"><code>[3, 7, 15, 31, 63]</code></pre>`,
          depart: `termes = [3, 7, 15]\n\n`,
          validation: {
            codeContient: [
              { motif: "termes\\.append\\s*\\([^\\n]*termes\\s*\\[\\s*-\\s*1\\s*\\][^\\n]*\\)[\\s\\S]*termes\\.append\\s*\\([^\\n]*termes\\s*\\[\\s*-\\s*1\\s*\\]", message: "Deux append, et dans chacun un calcul à partir du dernier élément, termes[-1]." },
              { motif: "print\\s*\\(\\s*termes\\s*\\)", message: "Affiche la liste à la fin." },
            ],
            codeAbsent: [
              { motif: "\\b(31|63)\\b", message: "Les nouveaux termes doivent être calculés par Python." },
            ],
            sortie: "[3, 7, 15, 31, 63]",
          },
          felicitation: "Le dernier élément sert à calculer le suivant : c'est la récurrence. ➕",
          indices: [
            "Le dernier élément de la liste se lit <code>termes[-1]</code>.",
            "Le terme suivant vaut 2 fois le dernier, plus 1. Ce calcul se met directement entre les parenthèses d'<code>append</code>.",
            "Écris deux fois la même ligne : <code>termes.append(…)</code> avec le calcul. La seconde fois, le dernier élément n'est plus le même : c'est voulu.",
          ],
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Une liste vide",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `L = []\nL[0] = 5\nprint(L)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[5]</code>",
              explication: "C'est ce qu'on voudrait, mais la case d'indice 0 n'existe pas encore : on ne peut pas la modifier." },
            { texte: "<code>[]</code>",
              explication: "Python ne laisse pas passer la deuxième ligne sans rien dire." },
            { texte: "une erreur <code>IndexError</code>", correct: true,
              explication: "Oui : la liste est vide, elle n'a aucune case. L[0] = 5 essaie de modifier une case qui n'existe pas." },
            { texte: "<code>[0, 5]</code>",
              explication: "Modifier une case ne crée pas de case. Pour ajouter, il faut append." },
          ],
          apres: `<span class="chapo">Modifier ou ajouter ?</span>
            <code>L[i] = …</code> <strong>modifie</strong> une case qui existe déjà.
            Pour <strong>créer</strong> une case, c'est <code>L.append(…)</code>. C'est
            pour cela qu'on remplit une liste vide avec <code>append</code>.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Remplir une liste avec une boucle",
          contenu: `
            <p>En combinant une liste vide, une boucle et <code>append</code>, Python
            remplit la liste tout seul :</p>

            <pre class="bloc-code"><code>carres = []                  # on part d'une liste vide
for k in range(6):
    carres.append(k ** 2)    # à chaque tour, on ajoute un carré
print(carres)                # affiche [0, 1, 4, 9, 16, 25]</code></pre>

            <p>Au premier tour, la liste devient <code>[0]</code> ; au deuxième,
            <code>[0, 1]</code> ; au troisième, <code>[0, 1, 4]</code>… Le
            <code>print</code> est hors de la boucle : on n'affiche la liste qu'une fois
            remplie.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Les termes d'une suite arithmétique",
          contenu: `
            <p>La suite arithmétique (<em>u<sub>n</sub></em>) est définie par
            <strong><em>u<sub>n</sub></em> = 4 + 3<em>n</em></strong>.</p>
            <p>Remplis la liste <code>termes</code> avec ses dix premiers termes,
            <em>u</em><sub>0</sub> à <em>u</em><sub>9</sub>, grâce à une boucle et à
            <code>append</code>. Puis affiche-la :</p>
            <pre class="bloc-code"><code>[4, 7, 10, 13, 16, 19, 22, 25, 28, 31]</code></pre>`,
          depart: `termes = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*10\\s*\\)\\s*:", message: "Dix termes, de u0 à u9 : range(10)." },
              { motif: "\\n[ \\t]+termes\\.append\\s*\\(", message: "Dans la boucle, ajoute chaque terme avec termes.append(…)." },
              { motif: "\\nprint\\s*\\(\\s*termes\\s*\\)", message: "Affiche la liste après la boucle, sans décalage." },
            ],
            sortie: "[4, 7, 10, 13, 16, 19, 22, 25, 28, 31]",
            tests: `assert termes == [4, 7, 10, 13, 16, 19, 22, 25, 28, 31], "termes doit contenir u0 à u9"`,
          },
          felicitation: "Dix termes rangés dans une liste, sans en écrire un seul. 📋",
          indices: [
            "Reprends le schéma des carrés : une boucle de dix tours, et un <code>append</code> dans la boucle.",
            "Appelle la variable de boucle <code>n</code> : à chaque tour, on ajoute <code>4 + 3 * n</code>.",
          ],
        },

        {
          id: "d8",
          type: "code",
          titre: "Les termes d'une suite récurrente",
          contenu: `
            <p>La suite (<em>u<sub>n</sub></em>) est définie par <em>u</em><sub>0</sub> = 1
            et <strong><em>u</em><sub><em>n</em>+1</sub> = 2<em>u<sub>n</sub></em> + 3</strong>.
            Ici, pas de formule directe : il faut une variable <code>u</code> pour le
            terme courant, comme à la séance 3.</p>
            <p>Remplis la liste <code>termes</code> avec les huit premiers termes, puis
            affiche-la :</p>
            <pre class="bloc-code"><code>[1, 5, 13, 29, 61, 125, 253, 509]</code></pre>`,
          depart: `u = 1\ntermes = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(", message: "Utilise une boucle for." },
              { motif: "\\n[ \\t]+termes\\.append\\s*\\(\\s*u\\s*\\)", message: "Dans la boucle, ajoute le terme courant : termes.append(u)." },
              { motif: "\\n[ \\t]+u\\s*=\\s*(2\\s*\\*\\s*u|u\\s*\\*\\s*2)\\s*\\+\\s*3", message: "Dans la boucle, passe au terme suivant : u reçoit 2 fois u plus 3." },
            ],
            codeAbsent: [
              { motif: "\\b(509|253)\\b", message: "Les termes doivent être calculés par Python." },
            ],
            sortie: "[1, 5, 13, 29, 61, 125, 253, 509]",
            tests: `assert termes == [1, 5, 13, 29, 61, 125, 253, 509], "termes doit contenir u0 à u7"`,
          },
          felicitation: "Ranger, puis calculer le suivant : le schéma de la séance 3, avec une liste. 🔁",
          indices: [
            "Huit termes, donc huit tours. Dans chaque tour, deux lignes : ranger le terme courant dans la liste, puis calculer le suivant.",
            "L'ordre compte, comme à la séance 3 : on range <code>u</code> <strong>avant</strong> de le mettre à jour, sinon le premier terme est perdu.",
            "Dans la boucle de huit tours, deux lignes décalées : l'ajout du terme courant à la liste, puis la mise à jour de <code>u</code> avec la formule de la suite.",
          ],
        },

        {
          id: "d9",
          type: "cours",
          titre: "sum, min, max, et in",
          contenu: `
            <p>Python fournit des fonctions toutes prêtes pour les listes de nombres :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>J'écris</th><th>J'obtiens</th><th>Avec <code>L = [12, 15, 9, 14]</code></th></tr>
              <tr><td><code>len(L)</code></td><td>le nombre d'éléments</td><td><code>4</code></td></tr>
              <tr><td><code>sum(L)</code></td><td>la somme des éléments</td><td><code>50</code></td></tr>
              <tr><td><code>min(L)</code></td><td>le plus petit élément</td><td><code>9</code></td></tr>
              <tr><td><code>max(L)</code></td><td>le plus grand élément</td><td><code>15</code></td></tr>
              <tr><td><code>x in L</code></td><td><code>True</code> si <code>x</code> est dans la liste</td><td><code>15 in L</code> vaut <code>True</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La moyenne</span>
              Il n'y a pas de fonction « moyenne », mais elle se calcule en une ligne :
              <code>sum(L) / len(L)</code>.
            </div>`,
        },

        {
          id: "d10",
          type: "code",
          titre: "Une série de notes",
          contenu: `
            <p>La liste <code>notes</code> contient les notes d'un élève. Avec les
            fonctions du cours, affiche sa moyenne, sa plus basse note, sa meilleure note,
            et l'<strong>étendue</strong> de la série (la meilleure moins la plus
            basse) :</p>
            <pre class="bloc-code"><code>Moyenne : 12.0
Minimum : 9
Maximum : 15
Étendue : 6</code></pre>`,
          depart: `notes = [12, 15, 9, 14, 10]\n\n`,
          validation: {
            codeContient: [
              { motif: "sum\\s*\\(\\s*notes\\s*\\)\\s*/\\s*len\\s*\\(\\s*notes\\s*\\)", message: "La moyenne se calcule avec sum(notes) / len(notes)." },
              { motif: "min\\s*\\(\\s*notes\\s*\\)", message: "Utilise min(notes) pour la plus basse note." },
              { motif: "max\\s*\\(\\s*notes\\s*\\)", message: "Utilise max(notes) pour la meilleure note." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^\\n]*,\\s*(12\\.0|9|15|6)\\s*\\)", message: "Les résultats doivent être calculés par Python." },
            ],
            sortie: "Moyenne : 12.0\nMinimum : 9\nMaximum : 15\nÉtendue : 6",
          },
          felicitation: "Quatre indicateurs statistiques en quatre lignes. 📊",
          indices: [
            "Quatre <code>print</code>, chacun avec un texte et un calcul.",
            "L'étendue, c'est <code>max(notes)</code> moins <code>min(notes)</code>.",
          ],
        },

        {
          id: "d11",
          type: "prediction",
          titre: "Dans la liste ?",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `premiers = [2, 3, 5, 7, 11, 13]\nprint(9 in premiers)\nprint(13 in premiers)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>True</code> puis <code>True</code>",
              explication: "9 n'est pas dans la liste (ce n'est d'ailleurs pas un nombre premier)." },
            { texte: "<code>False</code> puis <code>True</code>", correct: true,
              explication: "Oui : 9 n'apparaît pas dans la liste, 13 si." },
            { texte: "<code>False</code> puis <code>5</code>",
              explication: "in répond seulement par True ou False : il ne donne pas la position." },
            { texte: "une erreur",
              explication: "in s'utilise très bien avec une liste." },
          ],
          apres: `<span class="chapo">Une question posée à la liste</span>
            <code>x in L</code> répond <code>True</code> ou <code>False</code>, comme une
            comparaison : on peut donc l'utiliser dans un <code>if</code>.`,
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>termes[3] = 31             # modifier une case qui existe
termes.append(63)          # ajouter une case au bout

termes = []                # remplir une liste avec une boucle
u = 1
for i in range(8):
    termes.append(u)       # ranger le terme courant…
    u = 2 * u + 3          # … puis calculer le suivant

sum(notes) / len(notes)    # la moyenne</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>J'écris</th></tr>
              <tr><td>modifier l'élément d'indice <code>i</code></td><td><code>L[i] = valeur</code></td></tr>
              <tr><td>ajouter un élément à la fin</td><td><code>L.append(valeur)</code></td></tr>
              <tr><td>la somme, le minimum, le maximum</td><td><code>sum(L)</code>, <code>min(L)</code>, <code>max(L)</code></td></tr>
              <tr><td>savoir si <code>x</code> est dans la liste</td><td><code>x in L</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li><code>L[0] = …</code> sur une liste vide : <code>IndexError</code>, il faut <code>append</code> ;</li>
                <li>écrire <code>L = L.append(…)</code> : <code>append</code> modifie la liste et ne renvoie rien, <code>L</code> vaudrait <code>None</code> ;</li>
                <li>mettre la mise à jour avant l'<code>append</code> : le premier terme est perdu.</li>
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
      intention: "on réinvestit, du plus simple au plus complet",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Suivre les modifications",
          contenu: `<p>On exécute ces quatre lignes.</p>`,
          code: `L = [2, 4]\nL.append(6)\nL[0] = 1\nL.append(L[-1] + 1)`,
          question: "Que contient L à la fin ?",
          options: [
            { texte: "<code>[1, 4, 6, 7]</code>", correct: true,
              explication: "Oui : [2, 4] → [2, 4, 6] → [1, 4, 6] → on ajoute 6 + 1 = 7." },
            { texte: "<code>[1, 2, 4, 6, 7]</code>",
              explication: "L[0] = 1 remplace le premier élément, il n'ajoute pas de case." },
            { texte: "<code>[1, 4, 6, 2]</code>",
              explication: "L[-1] est le dernier élément au moment du calcul, c'est-à-dire 6." },
            { texte: "<code>[2, 4, 6, 7]</code>",
              explication: "La ligne L[0] = 1 a bien changé le premier élément." },
          ],
          apres: `<span class="chapo">Ligne par ligne</span>
            Face à une liste qui change, écris son contenu après chaque ligne, sur ta
            feuille. C'est exactement ce que fait Python.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "La suite de Fibonacci",
          contenu: `
            <p>La suite de Fibonacci commence par 1 et 1, puis chaque terme est la
            <strong>somme des deux précédents</strong> : 1, 1, 2, 3, 5, 8…</p>
            <p>La liste <code>F</code> contient déjà les deux premiers termes. Avec une
            boucle, ajoute les termes suivants jusqu'à en avoir <strong>dix</strong>, en
            calculant chacun à partir des deux derniers éléments de la liste. Puis
            affiche-la :</p>
            <pre class="bloc-code"><code>[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]</code></pre>`,
          depart: `F = [1, 1]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*8\\s*\\)\\s*:", message: "Il y a déjà deux termes : il en manque huit, donc range(8)." },
              { motif: "F\\.append\\s*\\([^\\n]*F\\s*\\[\\s*-\\s*1\\s*\\][^\\n]*F\\s*\\[\\s*-\\s*2\\s*\\]|F\\.append\\s*\\([^\\n]*F\\s*\\[\\s*-\\s*2\\s*\\][^\\n]*F\\s*\\[\\s*-\\s*1\\s*\\]", message: "Ajoute la somme des deux derniers éléments, F[-1] et F[-2]." },
            ],
            codeAbsent: [
              { motif: "\\b(34|55)\\b", message: "Les termes doivent être calculés par Python." },
            ],
            sortie: "[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]",
            tests: `assert F == [1, 1, 2, 3, 5, 8, 13, 21, 34, 55], "F doit contenir les dix premiers termes de Fibonacci"`,
          },
          felicitation: "Une suite où chaque terme dépend des deux précédents : la liste les garde sous la main. 🐚",
          indices: [
            "Le dernier élément se lit <code>F[-1]</code>, l'avant-dernier <code>F[-2]</code>.",
            "Combien de tours ? La liste a déjà deux termes, on en veut dix.",
            "Dans la boucle, une seule ligne : <code>F.append(…)</code>, avec entre les parenthèses la somme des deux derniers éléments.",
          ],
          apres: `<span class="chapo">Pourquoi la liste aide</span>
            Avec une seule variable <code>u</code>, on ne garderait que le dernier terme,
            alors que Fibonacci a besoin des deux derniers. La liste les garde tous, et
            <code>F[-1]</code>, <code>F[-2]</code> donnent toujours les deux plus récents.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La somme des termes",
          contenu: `
            <p>La suite géométrique de premier terme <em>u</em><sub>0</sub> = 1 et de
            raison 2 : 1, 2, 4, 8…</p>
            <p>Remplis la liste <code>termes</code> avec ses <strong>vingt</strong>
            premiers termes, puis affiche leur somme, calculée avec <code>sum</code> :</p>
            <pre class="bloc-code"><code>S = 1048575</code></pre>`,
          depart: `u = 1\ntermes = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\s+range\\s*\\(\\s*20\\s*\\)\\s*:", message: "Vingt termes : range(20)." },
              { motif: "\\n[ \\t]+termes\\.append\\s*\\(\\s*u\\s*\\)", message: "Dans la boucle, range le terme courant avec termes.append(u)." },
              { motif: "sum\\s*\\(\\s*termes\\s*\\)", message: "La somme se calcule avec sum(termes)." },
            ],
            codeAbsent: [
              { motif: "\\b1048575\\b", message: "La somme doit être calculée par Python." },
            ],
            sortie: "S = 1048575",
            tests: `assert len(termes) == 20, "termes doit contenir vingt termes"\nassert termes[0] == 1 and termes[-1] == 524288, "termes doit aller de 1 à 2 puissance 19"`,
          },
          felicitation: "Remplir, puis additionner : sum fait le second travail en un mot. ➕",
          indices: [
            "Même schéma que pour la suite récurrente : dans la boucle, ranger <code>u</code>, puis le mettre à jour (fois 2).",
            "Après la boucle, un <code>print</code> avec le texte <code>\"S =\"</code> et <code>sum(termes)</code>.",
          ],
          apres: `<span class="chapo">La formule du cours</span>
            Pour une suite géométrique de raison <em>q</em>, 1 + <em>q</em> + … +
            <em>q</em><sup><em>n</em></sup> = (<em>q</em><sup><em>n</em>+1</sup> − 1) /
            (<em>q</em> − 1). Ici : 2<sup>20</sup> − 1 = 1 048 575. Python et la formule
            sont d'accord.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : trois erreurs",
          contenu: `
            <p>Ce programme devrait remplir une liste avec les carrés des entiers de 1 à
            10, puis l'afficher :</p>
            <pre class="bloc-code"><code>[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]</code></pre>
            <p>Il contient <strong>trois erreurs</strong>. L'une d'elles provoque un
            message étonnant : lis-le bien.</p>`,
          depart: `carres = []\nfor k in range(1, 11)\n    carres = carres.append(k ** 2)\nprint(carre)\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+k\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)\\s*:", message: "La ligne du for se termine par deux points." },
              { motif: "\\n[ \\t]+carres\\.append\\s*\\(", message: "Dans la boucle, carres.append(…) seul, sans signe =." },
              { motif: "print\\s*\\(\\s*carres\\s*\\)", message: "Affiche la liste carres." },
            ],
            codeAbsent: [
              { motif: "carres\\s*=\\s*carres\\.append", message: "append modifie la liste et ne renvoie rien : n'écris pas carres = carres.append(…)." },
            ],
            sortie: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]",
          },
          felicitation: "Deux points, un append sans signe égal, un nom bien orthographié. 🐞",
          indices: [
            "La première erreur est une <code>SyntaxError</code> sur la ligne du <code>for</code>.",
            "Ensuite : <code>AttributeError: 'NoneType' object has no attribute 'append'</code>. Au premier tour, <code>carres</code> a reçu ce que renvoie <code>append</code>… c'est-à-dire rien (<code>None</code>). Relis le mémo.",
            "La dernière est une <code>NameError</code> : compare le nom dans le <code>print</code> avec celui de la liste.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Les diviseurs",
          contenu: `
            <p>Un entier <em>k</em> est un <strong>diviseur</strong> de 36 si la division
            de 36 par <em>k</em> tombe juste, c'est-à-dire si son reste est nul. En
            Python, le reste de la division s'écrit <code>%</code> :
            <code>36 % 5</code> vaut 1, <code>36 % 4</code> vaut 0.</p>
            <p>Remplis la liste <code>diviseurs</code> avec tous les diviseurs de 36, en
            testant chaque entier de 1 à 36 avec un <code>if</code>. Puis affiche la liste
            et son nombre d'éléments :</p>
            <pre class="bloc-code"><code>[1, 2, 3, 4, 6, 9, 12, 18, 36]
36 a 9 diviseurs</code></pre>`,
          depart: `diviseurs = []\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+k\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*37\\s*\\)\\s*:", message: "k va de 1 à 36 inclus : range(1, 37)." },
              { motif: "\\bif\\s+36\\s*%\\s*k\\s*==\\s*0\\s*:", message: "Le test : le reste de 36 divisé par k vaut 0, soit 36 % k == 0." },
              { motif: "\\n[ \\t]{8,}diviseurs\\.append\\s*\\(\\s*k\\s*\\)", message: "Dans le if, ajoute k à la liste : le append est décalé deux fois." },
              { motif: "len\\s*\\(\\s*diviseurs\\s*\\)", message: "Le nombre de diviseurs se calcule avec len(diviseurs)." },
            ],
            sortie: "[1, 2, 3, 4, 6, 9, 12, 18, 36]\n36 a 9 diviseurs",
          },
          felicitation: "Un if dans une boucle : on n'ajoute que ce qui passe le test. 🔍",
          indices: [
            "La boucle teste chaque entier <code>k</code> de 1 à 36. Dans la boucle, un <code>if</code> ; dans le <code>if</code>, un <code>append</code>.",
            "La condition du <code>if</code> : <code>36 % k == 0</code>. L'<code>append</code> est décalé de huit espaces, puisqu'il est dans le <code>if</code>, lui-même dans la boucle.",
            "Après la boucle : <code>print(diviseurs)</code>, puis un <code>print</code> avec le texte <code>\"36 a\"</code>, <code>len(diviseurs)</code> et <code>\"diviseurs\"</code>.",
          ],
          apres: `<span class="chapo">Un premier filtre</span>
            On parcourt des candidats, et on ne garde que ceux qui vérifient une
            condition. Ce schéma reviendra souvent — à la séance 8, tu l'écriras même
            en une seule ligne.`,
        },
      ],
    },
  ],
};

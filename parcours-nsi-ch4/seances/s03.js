/* NSI — chapitre 4, séance 3 : parcourir une liste.
 * Reprend la section « Parcourir une liste » du cours, le schéma de
 * l'accumulateur, et les exercices 4 et 5 (question 1).
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Parcourir une liste",
  sousTitre: "Passer sur chaque élément, un par un",
  palier: "Partie 1 — Les listes",

  accroche: `<code>sum()</code> additionne une liste en un clin d'œil… mais comment
    fait-il ? Il passe sur chaque élément, un par un, en gardant un total. Cette
    séance t'apprend à <strong>parcourir</strong> une liste, et à reprogrammer
    toi-même ce que font les fonctions de Python.`,

  objectifs: [
    "parcourir une liste <strong>par élément</strong> avec <code>for x in L</code>",
    "parcourir une liste <strong>par indice</strong> avec <code>for i in range(len(L))</code>",
    "choisir le bon parcours selon ce qu'on veut faire",
    "appliquer le schéma de l'<strong>accumulateur</strong> : avant, dans, après la boucle",
  ],

  motDeLaFin: `Tu sais parcourir une liste et accumuler un résultat au fil de la boucle.
    À la séance 4, on va plus vite : construire une liste entière en une seule ligne,
    avec les listes en compréhension.`,

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
          titre: "Le parcours par élément",
          contenu: `
            <p>Une boucle <code>for</code> peut passer directement sur les éléments d'une
            liste :</p>

            <pre class="bloc-code"><code>L = [4, 6, 8]
for valeur in L:
    print(valeur)</code></pre>

            <p>Au premier tour, <code>valeur</code> reçoit <code>4</code> ; au deuxième,
            <code>6</code> ; au troisième, <code>8</code>. La boucle fait
            <strong>autant de tours qu'il y a d'éléments</strong>, puis s'arrête toute
            seule.</p>

            <div class="encadre">
              <span class="chapo">Définition : parcourir une liste</span>
              <strong>Parcourir</strong> une liste, c'est examiner ses éléments les uns
              après les autres, dans l'ordre. Le nom de la variable de boucle est libre :
              choisis-le parlant (<code>note</code> pour une liste de notes,
              <code>ville</code> pour une liste de villes).
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Saluer tout le monde",
          contenu: `
            <p>Avec un parcours par élément, salue chaque personne de la liste
            <code>prenoms</code> :</p>
            <pre class="bloc-code"><code>Bonjour Léa
Bonjour Tom
Bonjour Inès</code></pre>
            <p>Ton programme doit rester juste si l'on ajoute des prénoms à la liste.</p>`,
          depart: `prenoms = ["Léa", "Tom", "Inès"]\n\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+prenoms\\b", message: "Parcours la liste prenoms avec une boucle for … in prenoms." },
            ],
            codeAbsent: [
              { motif: "\\bLea\\b[\\s\\S]*\\bLea\\b|\\bTom\\b[\\s\\S]*\\bTom\\b", message: "N'écris pas les prénoms à la main : la boucle les lit pour toi." },
            ],
            sortie: "Bonjour Léa\nBonjour Tom\nBonjour Inès",
          },
          felicitation: "Un seul print, et autant de saluts que de prénoms. 👋",
          indices: [
            "Une boucle <code>for</code> qui passe sur <code>prenoms</code>, avec une variable de boucle au nom parlant.",
            "Dans le bloc de la boucle, indenté, un <code>print</code> qui affiche <code>\"Bonjour\"</code> puis la variable de boucle.",
          ],
        },

        {
          id: "d3",
          type: "cours",
          titre: "Le parcours par indice",
          contenu: `
            <p>Parfois, on a besoin de la <strong>position</strong> de l'élément, et pas
            seulement de sa valeur. On fait alors parcourir à la variable de boucle les
            <strong>indices</strong> de la liste :</p>

            <pre class="bloc-code"><code>L = [4, 6, 8]
for i in range(len(L)):
    print("Indice", i, ":", L[i])</code></pre>

            <pre class="bloc-code"><code>Indice 0 : 4
Indice 1 : 6
Indice 2 : 8</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi range(len(L)) ?</span>
              <code>len(L)</code> vaut 3, et <code>range(3)</code> donne 0, 1, 2 : exactement
              les indices valides de la liste, du premier au dernier. Avec <code>i</code>, on
              connaît la position ; avec <code>L[i]</code>, on lit la valeur.
            </div>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Les valeurs de i",
          contenu: `<p>Lis ce programme sans l'exécuter.</p>`,
          code: `jours = ["lun", "mar", "mer", "jeu", "ven"]\nfor i in range(len(jours)):\n    print(i)`,
          question: "Quels nombres affiche-t-il ?",
          options: [
            { texte: "1, 2, 3, 4, 5",
              explication: "<code>range</code> commence à 0, comme les indices." },
            { texte: "0, 1, 2, 3, 4", correct: true,
              explication: "Oui : <code>len(jours)</code> vaut 5, et <code>range(5)</code> va de 0 à 4. Ce sont les cinq indices de la liste." },
            { texte: "0, 1, 2, 3, 4, 5",
              explication: "<code>range(5)</code> s'arrête <strong>avant</strong> 5 : heureusement, car il n'y a pas d'indice 5." },
            { texte: "lun, mar, mer, jeu, ven",
              explication: "On affiche <code>i</code>, la position, et non <code>jours[i]</code>, l'élément." },
          ],
          apres: `<span class="chapo">range(len(L)) ne déborde jamais</span>
            La borne de fin de <code>range</code> est exclue : <code>range(len(L))</code>
            s'arrête donc pile au dernier indice, <code>len(L) - 1</code>. Pas
            d'<code>IndexError</code> possible.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "La liste numérotée",
          contenu: `
            <p>Affiche la liste <code>taches</code> numérotée à partir de 1, avec un
            parcours <strong>par indice</strong> :</p>
            <pre class="bloc-code"><code>1 - réviser
2 - ranger
3 - courir</code></pre>`,
          depart: `taches = ["réviser", "ranger", "courir"]\n\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*taches\\s*\\)\\s*\\)", message: "Parcours les indices de la liste avec range(len(taches))." },
              { motif: "taches\\s*\\[\\s*\\w+\\s*\\]", message: "Lis chaque tâche par son indice : taches[i]." },
            ],
            sortie: "1 - réviser\n2 - ranger\n3 - courir",
          },
          felicitation: "L'indice pour le numéro, L[i] pour la valeur : le parcours par indice donne les deux. 🔢",
          indices: [
            "Une boucle sur les indices de la liste ; dans son bloc, un <code>print</code> en trois morceaux : le numéro, le tiret, la tâche.",
            "Le numéro affiché est décalé d'une unité par rapport à l'indice. La tâche, elle, se lit dans la liste à la position du tour.",
          ],
        },

        {
          id: "d6",
          type: "prediction",
          titre: "Un point de bonus ?",
          contenu: `<p>On veut ajouter un point à chaque note. Lis ce programme sans
            l'exécuter.</p>`,
          code: `notes = [12, 15, 8]\nfor note in notes:\n    note = note + 1\nprint(notes)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>[13, 16, 9]</code>",
              explication: "C'est ce qu'on voulait… mais la liste n'a jamais été modifiée." },
            { texte: "<code>[12, 15, 8]</code>", correct: true,
              explication: "Oui : à chaque tour, <code>note</code> reçoit une <strong>copie</strong> de la valeur. On augmente cette copie, mais aucune case de <code>notes</code> n'est touchée." },
            { texte: "<code>9</code>",
              explication: "On affiche <code>notes</code>, la liste entière, et non la variable de boucle." },
            { texte: "une erreur",
              explication: "Le programme est correct pour Python : il ne fait simplement pas ce qu'on voulait." },
          ],
          apres: `<span class="chapo">Pour modifier une case, il faut son indice</span>
            La variable de boucle d'un parcours par élément n'est qu'une copie : la
            modifier ne change rien à la liste. Pour écrire dans une case, il faut
            <code>notes[i] = …</code>, donc un parcours <strong>par indice</strong>.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Le point de bonus, pour de vrai",
          contenu: `
            <p>Ajoute un point à <strong>chaque</strong> note de la liste, en modifiant
            ses cases une par une. La liste elle-même doit changer :</p>
            <pre class="bloc-code"><code>[13, 16, 9, 19]</code></pre>`,
          depart: `notes = [12, 15, 8, 18]\n\n\nprint(notes)\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*notes\\s*\\)\\s*\\)", message: "Pour modifier les cases, parcours les indices : range(len(notes))." },
              { motif: "notes\\s*\\[\\s*(\\w+)\\s*\\]\\s*(\\+=|=\\s*notes\\s*\\[\\s*\\1\\s*\\]\\s*\\+)", message: "Chaque case reçoit son ancienne valeur plus 1 : notes[i] = notes[i] + 1." },
            ],
            codeAbsent: [
              { motif: "notes\\s*=\\s*\\[[\\s\\S]*notes\\s*=\\s*\\[", message: "Ne réécris pas la liste : modifie ses cases dans la boucle." },
            ],
            sortie: "[13, 16, 9, 19]",
          },
          felicitation: "Un parcours par indice, et chaque case est modifiée sur place. ✅",
          indices: [
            "Une boucle sur les indices de <code>notes</code>, avant le <code>print</code>.",
            "Dans la boucle, la case d'indice <code>i</code> reçoit sa propre valeur augmentée de 1 — comme pour Tom à la séance 2.",
          ],
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le schéma de l'accumulateur",
          contenu: `
            <p>Pour compter, additionner ou collecter au fil d'un parcours, on utilise
            toujours le même schéma, en <strong>trois temps</strong>. Ici, on compte les
            notes supérieures ou égales à 10 :</p>

            <pre class="bloc-code"><code>notes = [12, 7, 15, 9]
compteur = 0                        # 1. AVANT la boucle : on prépare
for note in notes:
    if note >= 10:
        compteur = compteur + 1     # 2. DANS la boucle : on fait évoluer
print(compteur)                     # 3. APRÈS la boucle : on utilise → 2</code></pre>

            <div class="encadre">
              <span class="chapo">Méthode : l'accumulateur</span>
              <ol style="margin-bottom:0">
                <li><strong>avant</strong> la boucle, on prépare une variable : un compteur
                ou un total à 0, une liste vide… ;</li>
                <li><strong>dans</strong> la boucle, on la fait évoluer à chaque tour ;</li>
                <li><strong>après</strong> la boucle, on l'affiche ou on la renvoie.</li>
              </ol>
            </div>

            <p>C'est exactement ce que fait <code>sum()</code> en coulisses : un total qui
            démarre à 0, et qui grossit de chaque élément.</p>`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Le total, sans sum()",
          contenu: `
            <p>Calcule le total des dépenses de la semaine avec un accumulateur,
            <strong>sans utiliser <code>sum()</code></strong>. Le dernier
            <code>print</code> est déjà écrit :</p>
            <pre class="bloc-code"><code>Total : 48</code></pre>`,
          depart: `depenses = [12, 5, 23, 8]\n\n\nprint("Total :", total)\n`,
          validation: {
            codeContient: [
              { motif: "\\btotal\\s*=\\s*0\\b", message: "Avant la boucle, prépare la variable total à 0." },
              { motif: "for\\s+\\w+\\s+in\\s+depenses\\b", message: "Parcours la liste depenses avec une boucle for." },
              { motif: "\\btotal\\s*(\\+=|=\\s*total\\s*\\+)", message: "Dans la boucle, ajoute chaque dépense à total." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est justement ce qu'on reprogramme." },
              { motif: "\\b48\\b", message: "Le total doit être calculé, pas écrit à la main." },
            ],
            sortie: "Total : 48",
          },
          felicitation: "Tu viens de reprogrammer sum(). 🧮",
          indices: [
            "Avant la boucle, la variable <code>total</code> doit exister, avec une valeur de départ qui ne fausse pas la somme.",
            "Dans une boucle sur <code>depenses</code>, <code>total</code> reçoit son ancienne valeur plus la dépense du tour.",
          ],
        },

        {
          id: "d10",
          type: "prediction",
          titre: "L'initialisation mal placée",
          contenu: `<p>Ce programme ressemble beaucoup au précédent. Regarde bien où se
            trouve la ligne <code>total = 0</code>.</p>`,
          code: `total = 0\nfor x in [2, 4, 6]:\n    total = 0\n    total = total + x\nprint(total)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>12</code>",
              explication: "C'est ce qu'on attendait, mais <code>total</code> est remis à 0 au début de chaque tour." },
            { texte: "<code>6</code>", correct: true,
              explication: "Oui : à chaque tour, <code>total</code> repart de 0 puis reçoit <code>x</code>. Au dernier tour, il vaut 0 + 6 = 6." },
            { texte: "<code>0</code>",
              explication: "La remise à zéro est suivie de l'ajout de <code>x</code> : <code>total</code> ne reste pas à 0." },
            { texte: "<code>2</code>",
              explication: "Il ne reste que la dernière valeur ajoutée, pas la première." },
          ],
          apres: `<span class="chapo">L'erreur classique de l'accumulateur</span>
            Une initialisation placée <strong>dans</strong> la boucle remet la variable à
            zéro à chaque tour : il ne reste que le dernier élément. La préparation se fait
            toujours <strong>avant</strong> la boucle, une seule fois.`,
        },

        {
          id: "d11",
          type: "code",
          titre: "Seulement les grosses ventes",
          contenu: `
            <p>Un magasin veut connaître le total de ses ventes
            <strong>strictement supérieures à 50</strong> euros. Calcule-le avec un
            accumulateur et une condition :</p>
            <pre class="bloc-code"><code>Grosses ventes : 255</code></pre>`,
          depart: `ventes = [30, 75, 120, 45, 60]\n\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+ventes\\b", message: "Parcours la liste ventes avec une boucle for." },
              { motif: "\\n[ \\t]+if\\b", message: "Dans la boucle, un if ne garde que les ventes supérieures à 50." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : l'accumulateur fait le travail." },
              { motif: "\\b255\\b", message: "Le total doit être calculé, pas écrit à la main." },
            ],
            sortie: "Grosses ventes : 255",
          },
          felicitation: "Un accumulateur qui trie avant d'ajouter. 💶",
          indices: [
            "Même schéma qu'avant : une variable à 0 avant la boucle, un <code>print</code> après.",
            "Dans la boucle, l'ajout ne se fait que sous un <code>if</code> qui compare la vente à 50.",
          ],
        },

        {
          id: "d12",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>L = [4, 6, 8]

for x in L:                  # par élément : x vaut 4, puis 6, puis 8
    print(x)

for i in range(len(L)):      # par indice : i vaut 0, puis 1, puis 2
    L[i] = L[i] * 2          # on peut écrire dans la case

total = 0                    # l'accumulateur : avant…
for x in L:
    total = total + x        # … dans…
print(total)                 # … après</code></pre>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Je veux…</th><th>Je choisis</th></tr>
              <tr><td>seulement les valeurs</td><td>par élément : <code>for x in L</code></td></tr>
              <tr><td>la position, ou deux listes à la fois</td><td>par indice : <code>for i in range(len(L))</code></td></tr>
              <tr><td>modifier les cases</td><td>par indice, avec <code>L[i] = …</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul style="margin-bottom:0">
                <li>initialiser l'accumulateur <strong>dans</strong> la boucle : il repart de zéro à chaque tour ;</li>
                <li>croire que <code>x = x + 1</code> modifie la liste, dans un parcours par élément ;</li>
                <li>écrire <code>range(len(L) + 1)</code> : un tour de trop, et l'<code>IndexError</code>.</li>
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
          type: "prediction",
          titre: "Dérouler une boucle",
          contenu: `<p>Suis l'évolution de la variable <code>s</code>, tour après
            tour.</p>`,
          code: `L = [2, 4, 6, 8]\ns = 0\nfor x in L:\n    s = s + x\nprint(s)`,
          question: "Quelles valeurs prend s à la fin de chacun des quatre tours ?",
          options: [
            { texte: "2, 4, 6, 8",
              explication: "Ce sont les valeurs successives de <code>x</code>. <code>s</code>, lui, garde la somme de tout ce qui a déjà été lu." },
            { texte: "0, 2, 6, 12",
              explication: "Ce sont les valeurs de <code>s</code> <strong>au début</strong> de chaque tour, avant l'ajout." },
            { texte: "2, 6, 12, 20", correct: true,
              explication: "Oui : 0 + 2 = 2, puis 2 + 4 = 6, puis 6 + 6 = 12, puis 12 + 8 = 20. Le programme affiche 20." },
            { texte: "20, 20, 20, 20",
              explication: "<code>s</code> se construit petit à petit : il ne vaut 20 qu'à la toute fin." },
          ],
          apres: `<span class="chapo">Le tableau d'évolution</span>
            Pour dérouler une boucle à la main, on dresse un tableau avec une colonne par
            variable et une ligne par tour : départ (s = 0), puis x = 2 (s = 2), x = 4
            (s = 6), x = 6 (s = 12), x = 8 (s = 20).`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Somme et moyenne",
          contenu: `
            <p>Écris les fonctions <code>somme(tableau)</code> et
            <code>moyenne(tableau)</code>, <strong>sans utiliser <code>sum()</code></strong>.</p>
            <pre class="bloc-code"><code>somme([12, 15, 9])      # renvoie 36
moyenne([12, 15, 9])    # renvoie 12.0</code></pre>
            <p>⚠️ <code>moyenne</code> doit obligatoirement <strong>appeler</strong>
            <code>somme</code> : on ne recopie pas un code qu'on a déjà écrit.</p>`,
          depart: `def somme(tableau):\n    pass\n\n\ndef moyenne(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+moyenne[\\s\\S]*\\bsomme\\s*\\(", message: "moyenne doit appeler la fonction somme." },
              { motif: "\\bfor\\b", message: "somme parcourt le tableau avec une boucle for." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est ce que somme doit reprogrammer." },
            ],
            tests: `assert somme([12, 15, 9]) == 36, "somme([12, 15, 9]) doit renvoyer 36"\nassert somme([-4, 4, 10]) == 10, "somme doit marcher avec des nombres négatifs"\nassert somme([7]) == 7, "la somme d'un seul élément est cet élément"\nassert somme([]) == 0, "la somme d'un tableau vide vaut 0 : c'est la valeur de départ du total"\nassert moyenne([12, 15, 9]) == 12, "moyenne([12, 15, 9]) doit renvoyer 12.0"\nassert moyenne([10, 11]) == 10.5, "moyenne([10, 11]) doit renvoyer 10.5"`,
          },
          felicitation: "Deux fonctions qui coopèrent : moyenne s'appuie sur somme. 🤝",
          indices: [
            "Dans <code>somme</code> : l'accumulateur en trois temps, et un <code>return</code> après la boucle — attention à son indentation.",
            "Dans <code>moyenne</code>, une seule ligne : le résultat de <code>somme</code>, divisé par le nombre d'éléments.",
          ],
          apres: `<span class="chapo">Où placer le return ?</span>
            Un <code>return</code> indenté dans la boucle renverrait le total dès le premier
            tour. Il se place <strong>après</strong> la boucle, au niveau du
            <code>for</code> : c'est le troisième temps de l'accumulateur.`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Les jours de pluie",
          contenu: `
            <p>Deux listes se correspondent case par case : <code>jours</code> donne le
            nom du jour, <code>pluie</code> la hauteur de pluie tombée ce jour-là, en
            millimètres.</p>
            <p>Affiche les jours où il est tombé <strong>plus de 2 mm</strong>, avec la
            hauteur de pluie :</p>
            <pre class="bloc-code"><code>mardi : 3 mm
jeudi : 12 mm
vendredi : 5 mm</code></pre>`,
          depart: `jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\npluie = [0, 3, 0, 12, 5, 0, 1]\n\n`,
          validation: {
            codeContient: [
              { motif: "range\\s*\\(\\s*len\\s*\\(\\s*(pluie|jours)\\s*\\)\\s*\\)", message: "Deux listes à lire en même temps : parcours leurs indices avec range(len(…))." },
              { motif: "pluie\\s*\\[\\s*\\w+\\s*\\]", message: "Lis la hauteur de pluie avec pluie[i]." },
              { motif: "jours\\s*\\[\\s*\\w+\\s*\\]", message: "Lis le nom du jour avec jours[i]." },
            ],
            sortie: "mardi : 3 mm\njeudi : 12 mm\nvendredi : 5 mm",
          },
          felicitation: "Un même indice pour lire deux listes : c'est là que le parcours par indice est indispensable. 🌧️",
          indices: [
            "Un parcours par élément ne suffit pas : il faut le même indice <code>i</code> pour lire <code>jours[i]</code> et <code>pluie[i]</code>.",
            "Dans la boucle, un <code>if</code> sur <code>pluie[i]</code>, puis un <code>print</code> qui affiche le jour, la hauteur et l'unité.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : les jours de gel",
          contenu: `
            <p>Ce programme devrait compter les jours où la température est passée
            sous zéro :</p>
            <pre class="bloc-code"><code>Jours de gel : 3</code></pre>
            <p>Il contient <strong>trois erreurs</strong>, de natures différentes.
            Exécute-le, lis les messages, et corrige-les une par une.</p>`,
          depart: `temperatures = [3, -2, 5, -7, 0, -1]\nfor i in range(len(temperatures) + 1):\n    nb_gel = 0\n    if temperatures[i] < 0\n        nb_gel = nb_gel + 1\nprint("Jours de gel :", nb_gel)\n`,
          validation: {
            codeAbsent: [
              { motif: "len\\s*\\(\\s*temperatures\\s*\\)\\s*\\+\\s*1", message: "range(len(temperatures) + 1) fait un tour de trop." },
              { motif: "\\n[ \\t]+nb_gel\\s*=\\s*0", message: "Le compteur ne doit pas être remis à zéro dans la boucle." },
            ],
            sortie: "Jours de gel : 3",
          },
          felicitation: "Deux-points, tour de trop, initialisation mal placée : réparés. 🐞",
          indices: [
            "La première erreur empêche le programme de démarrer : une ligne qui ouvre un bloc doit se terminer par un signe précis.",
            "Ensuite, une <code>IndexError</code> : combien de tours fait la boucle, et combien la liste a-t-elle d'indices ?",
            "Enfin, le compteur affiche 1 : regarde où il est remis à zéro. Sa préparation doit se faire une seule fois.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le relevé de compte",
          contenu: `
            <p>Un compte démarre avec un solde de 50 euros. La liste
            <code>operations</code> contient les mouvements du mois : un nombre positif
            est un dépôt, un nombre négatif un retrait.</p>
            <p>En <strong>un seul parcours</strong>, calcule le solde final et le nombre de
            retraits. Les deux <code>print</code> sont déjà écrits :</p>
            <pre class="bloc-code"><code>Solde final : 215
Retraits : 3</code></pre>`,
          depart: `solde = 50\noperations = [120, -45, -30, 200, -80]\n\n\nprint("Solde final :", solde)\nprint("Retraits :", retraits)\n`,
          validation: {
            codeContient: [
              { motif: "for\\s+\\w+\\s+in\\s+operations\\b", message: "Parcours la liste operations avec une boucle for." },
              { motif: "\\bretraits\\s*=\\s*0\\b", message: "Avant la boucle, prépare le compteur retraits à 0." },
              { motif: "\\bsolde\\s*(\\+=|=\\s*solde\\s*\\+)", message: "Dans la boucle, chaque opération s'ajoute au solde." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : un seul parcours fait les deux calculs." },
              { motif: "\\b215\\b", message: "Le solde doit être calculé, pas écrit à la main." },
            ],
            sortie: "Solde final : 215\nRetraits : 3",
          },
          felicitation: "Deux accumulateurs dans une seule boucle. 🏦",
          indices: [
            "Le solde existe déjà, avec sa valeur de départ : c'est lui qui accumule. Il manque la préparation du second accumulateur.",
            "Dans la boucle, chaque opération modifie le solde ; et sous un <code>if</code>, les opérations négatives font grandir <code>retraits</code>.",
          ],
          apres: `<span class="chapo">Un accumulateur peut ne pas partir de zéro</span>
            Ici, le solde démarre à 50 : la valeur de départ est celle qui a du sens avant
            le premier tour. Ajouter un retrait, c'est ajouter un nombre négatif : pas
            besoin de distinguer les deux cas pour le solde.`,
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
          titre: "Le produit",
          contenu: `
            <p>Écris la fonction <code>produit(tableau)</code>, qui renvoie le produit de
            tous les éléments du tableau.</p>
            <pre class="bloc-code"><code>produit([2, 3, 4])    # renvoie 24
produit([5])          # renvoie 5</code></pre>
            <p>Attention à la valeur de départ de ton accumulateur !</p>`,
          depart: `def produit(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le produit." },
            ],
            tests: `assert produit([2, 3, 4]) == 24, "produit([2, 3, 4]) doit renvoyer 24"\nassert produit([5]) == 5, "le produit d'un seul élément est cet élément"\nassert produit([7, 0, 3]) == 0, "un facteur nul donne un produit nul"\nassert produit([-2, 5]) == -10, "produit([-2, 5]) doit renvoyer -10"`,
          },
          felicitation: "Un accumulateur qui multiplie, et qui part donc de 1. ✖️",
          indices: [
            "Même schéma que <code>somme</code>, mais chaque élément multiplie l'accumulateur au lieu de s'y ajouter.",
            "S'il partait de 0, le produit vaudrait toujours 0. Quel nombre ne change rien quand on multiplie par lui ?",
          ],
          apres: `<span class="chapo">Le neutre de l'opération</span>
            Un accumulateur démarre avec la valeur qui ne change rien à l'opération :
            0 pour une somme (x + 0 = x), 1 pour un produit (x × 1 = x).`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Les totaux cumulés",
          contenu: `
            <p>Écris la fonction <code>cumul(tableau)</code>, qui renvoie une
            <strong>nouvelle liste</strong> : chaque case contient la somme de tous les
            éléments lus jusque-là.</p>
            <pre class="bloc-code"><code>cumul([2, 4, 6, 8])    # renvoie [2, 6, 12, 20]
cumul([5])             # renvoie [5]</code></pre>`,
          depart: `def cumul(tableau):\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours le tableau avec une boucle for." },
              { motif: "\\.\\s*append\\s*\\(", message: "Remplis la nouvelle liste avec append()." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la nouvelle liste." },
            ],
            tests: `assert cumul([2, 4, 6, 8]) == [2, 6, 12, 20], "cumul([2, 4, 6, 8]) doit renvoyer [2, 6, 12, 20]"\nassert cumul([5]) == [5], "cumul([5]) doit renvoyer [5]"\nassert cumul([1, 1, 1]) == [1, 2, 3], "cumul([1, 1, 1]) doit renvoyer [1, 2, 3]"\nassert cumul([3, -1, 4]) == [3, 2, 6], "cumul doit marcher avec des nombres négatifs"`,
          },
          felicitation: "Deux accumulateurs qui travaillent ensemble : un total et une liste. 📈",
          indices: [
            "Il te faut deux variables préparées avant la boucle : le total courant, et la liste résultat, vide.",
            "À chaque tour, mets d'abord le total à jour, puis ajoute sa nouvelle valeur à la liste.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton propre accumulateur",
          contenu: `
            <p>À toi de choisir : les kilomètres parcourus dans la semaine, les minutes
            passées sur ton téléphone, les points d'une partie… Écris un programme qui :</p>
            <ul>
              <li>crée une liste d'<strong>au moins cinq</strong> nombres ;</li>
              <li>la parcourt avec une boucle <code>for</code> ;</li>
              <li>calcule un résultat de ton choix avec un <strong>accumulateur</strong> —
              total, compteur, produit… — sans <code>sum()</code> ;</li>
              <li>affiche ce résultat avec une phrase.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\s+\\w+\\s+in\\b", message: "Parcours ta liste avec une boucle for." },
              { motif: "\\b(\\w+)\\s*(\\+=|-=|\\*=|=\\s*\\1\\s*[-+*])", message: "Fais évoluer un accumulateur dans la boucle : total = total + …" },
              { motif: "\\bprint\\s*\\(", message: "Affiche ton résultat." },
            ],
            codeAbsent: [
              { motif: "\\bsum\\s*\\(", message: "Sans sum() : c'est ton accumulateur qui calcule." },
            ],
            sortieNonVide: true,
            tests: `_listes = [v for k, v in list(globals().items()) if isinstance(v, list) and not k.startswith("_")]\nassert any(len(v) >= 5 for v in _listes), "Ta liste doit contenir au moins cinq nombres."`,
          },
          felicitation: "Ton parcours, ton accumulateur, ton résultat. ✨",
          indices: [
            "Commence par ta liste de nombres, puis la variable accumulateur avec sa valeur de départ.",
            "Dans une boucle sur la liste, fais évoluer l'accumulateur ; après la boucle, un <code>print</code>.",
          ],
        },
      ],
    },
  ],
};

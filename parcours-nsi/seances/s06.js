/* NSI — chapitre 1, séance 6 : la double alternative.
 * Reprend la section « Alternatives : else » du cours et l'exercice 11 en entier.
 */

export default {
  id: "s06",
  numero: 6,
  titre: "Deux cas : if … else",
  sousTitre: "Ne plus jamais rester muet",
  palier: "Partie 2 — Prendre des décisions",

  accroche: `Un <code>if</code> seul ne dit rien quand la condition est fausse — et
    l'utilisateur ne sait pas si le programme a échoué ou si la réponse est « non ».
    Un mot suffit à régler cela.`,

  objectifs: [
    "écrire une double alternative <code>if … else</code>",
    "aligner correctement <code>else</code> sur son <code>if</code>",
    "comprendre pourquoi <code>else</code> ne prend jamais de condition",
    "choisir entre deux <code>if</code> et un <code>if … else</code>",
  ],

  motDeLaFin: `Deux cas, c'est bien. Souvent il en faut plus : c'est l'objet de la
    séance 7, avec <code>elif</code>.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 30,
      etoiles: 1,
      intention: "une seule idée, mais bien installée",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Traiter l'autre cas",
          contenu: `
            <p>Souvent, il y a quelque chose à faire aussi quand la condition est fausse.
            C'est le rôle d'<code>else</code>, « sinon » :</p>

            <pre class="bloc-code"><code>age = 15

if age &gt;= 18:
    print("Majeur")
else:
    print("Mineur")</code></pre>

            <p>Exactement <strong>un</strong> des deux blocs s'exécute : jamais les deux,
            jamais aucun.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La forme de else</span>
              <code>else</code> n'a <strong>pas de condition</strong> — il ramasse tous les
              cas restants. Il est suivi directement des deux-points, et doit être
              <strong>aligné exactement</strong> sur son <code>if</code>, sans indentation.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi c'est mieux que deux if</span>
              Avec <code>else</code>, le second cas est <strong>automatiquement</strong> le
              contraire du premier. Impossible d'oublier un cas, impossible d'écrire deux
              conditions incohérentes qui afficheraient deux messages — ou aucun.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ton premier else",
          contenu: `
            <p>Avec <code>age = 15</code>, écris la double alternative. Ici, elle doit
            afficher :</p>
            <pre class="bloc-code"><code>Mineur</code></pre>
            <p>Vérifie ensuite en remplaçant 15 par 20 : le message doit changer tout seul.
            Remets 15 avant de valider.</p>`,
          depart: `age = 15\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut un if…" },
              { motif: "\\belse\\b", message: "… et un else pour l'autre cas." },
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "La condition doit porter sur la variable age." },
            ],
            sortie: "Mineur",
          },
          felicitation: "Deux chemins, un seul emprunté. 🛤️",
          indices: [
            "Le <code>else:</code> s'écrit sans condition, et sans décalage : il est aligné sur le <code>if</code>.",
            "Chacun des deux blocs contient un seul affichage.",
          ],
        },

        {
          id: "d3",
          type: "code",
          titre: "Exercice 11 — Pile ou face, version deux if",
          contenu: `
            <p>On simule le lancer de deux pièces :</p>
            <ul>
              <li>si les deux tombent du même côté, on gagne 1 euro ;</li>
              <li>si l'une tombe sur pile et l'autre sur face, on perd 1 euro.</li>
            </ul>
            <p>Complète le programme pour qu'il affiche <code>gagné 1 euro</code> ou
            <code>perdu 1 euro</code>, en n'utilisant <strong>que des <code>if</code></strong> :
            pas de <code>else</code>.</p>
            <p>👉 Exécute plusieurs fois pour observer les différentes possibilités.</p>
            <div class="encadre" data-ton="astuce">
              <code>choice(["pile", "face"])</code> tire au hasard l'un des deux textes.
              Les crochets sont une <em>liste</em> — tu les étudieras plus tard dans l'année ;
              pour l'instant, contente-toi de l'utiliser.
            </div>`,
          depart: `from random import choice\n\nlancer_1 = choice(["pile", "face"])\nlancer_2 = choice(["pile", "face"])\n\nprint("Pièce 1 :", lancer_1)\nprint("Pièce 2 :", lancer_2)\n\n# Uniquement des if : pas de elif, pas de else !\n`,
          validation: {
            codeContient: [
              { motif: "if[\\s\\S]*if", message: "Deux tests indépendants sont attendus." },
              { motif: "\\blancer_1\\b[\\s\\S]*\\blancer_1\\b", message: "Sers-toi des variables déjà tirées." },
            ],
            codeAbsent: [
              { motif: "\\belse\\b|\\belif\\b", message: "Pas de else ni de elif dans cette question." },
            ],
            sortieRegex: "(gagné|perdu) 1 euro",
            sortieRegexMessage: "Ton programme doit annoncer le gain ou la perte.",
          },
          felicitation: "Deux tests, deux conditions à écrire correctement. 🪙",
          indices: [
            "Le premier test compare les deux lancers avec <code>==</code>.",
            "Le second doit exprimer exactement le contraire : les deux lancers sont différents.",
          ],
        },

        {
          id: "d4",
          type: "code",
          titre: "Exercice 11 (suite) — La version avec else",
          contenu: `
            <p>Recommence, cette fois avec un <strong>seul test</strong> suivi d'un
            <code>else</code>. Le comportement doit être identique.</p>`,
          depart: `from random import choice\n\nlancer_1 = choice(["pile", "face"])\nlancer_2 = choice(["pile", "face"])\n\nprint("Pièce 1 :", lancer_1)\nprint("Pièce 2 :", lancer_2)\n\n# Cette fois, un seul test suivi d'un else.\n`,
          validation: {
            codeContient: [
              { motif: "\\belse\\b", message: "Cette version doit utiliser else." },
            ],
            codeAbsent: [
              { motif: "if[\\s\\S]*\\bif\\b", message: "Un seul if cette fois." },
            ],
            sortieRegex: "(gagné|perdu) 1 euro",
            sortieRegexMessage: "Ton programme doit annoncer le gain ou la perte.",
          },
          felicitation: "Deux lignes de moins, et plus aucun risque d'oubli. ✂️",
          indices: [
            "Garde le premier test tel quel, et remplace le second par un <code>else</code>.",
            "Le <code>else</code> n'a pas de condition : le cas « différents » est simplement tout le reste.",
          ],
        },

        {
          id: "d5",
          type: "qcm",
          titre: "Exercice 11 (fin) — Quelle version préférer ?",
          contenu: `<p>Les deux versions font la même chose. Imagine maintenant qu'on se
            trompe dans la seconde condition de la première version, en écrivant
            <code>if lancer_1 == lancer_2</code> deux fois.</p>`,
          question: "Que se passerait-il, et quelle version est la plus sûre ?",
          options: [
            { texte: "Rien de grave : Python signalerait l'erreur",
              explication: "Non : les deux tests sont valides. Python ne peut pas deviner l'intention." },
            { texte: "Les deux messages s'afficheraient parfois ; la version avec <code>else</code> est plus sûre", correct: true,
              explication: "Oui. Avec <code>else</code>, le second cas est <em>automatiquement</em> le contraire du premier : ni oubli, ni doublon possible." },
            { texte: "Aucun message ne s'afficherait jamais",
              explication: "Au contraire : quand les deux pièces tombent pareil, les deux tests seraient vrais." },
            { texte: "Les deux versions sont équivalentes en fiabilité",
              explication: "Non : l'une exige d'écrire deux conditions cohérentes, l'autre le garantit." },
          ],
          apres: `<span class="chapo">La règle de choix</span>
            Deux cas <strong>complémentaires</strong> → <code>if … else</code>.
            Deux tests <strong>indépendants</strong>, qui peuvent être vrais en même temps →
            deux <code>if</code> séparés. L'exercice « multiples de 2, 3 et 5 » de la séance
            précédente relevait bien du second cas.`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>if condition:
    # exécuté si la condition est vraie
else:
    # exécuté dans tous les autres cas</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les deux fautes propres au else</span>
              <ol style="margin-bottom:0">
                <li>lui donner une <strong>condition</strong> : <code>else note &lt; 10:</code>
                  est une erreur de syntaxe ;</li>
                <li>l'<strong>indenter</strong> : <code>else</code> s'aligne sur son
                  <code>if</code>, pas sur le bloc.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un test de relecture</span>
              Après avoir écrit un <code>if … else</code>, demande-toi : « existe-t-il un cas
              où <strong>rien</strong> ne s'afficherait ? » Avec un <code>else</code>, la
              réponse est toujours non — et c'est précisément ce qu'on cherche.
            </div>`,
        },
      ],
    },

    /* ============================== APPLICATION ============================== */
    {
      id: "application",
      titre: "Application",
      minutes: 25,
      etoiles: 2,
      intention: "on réinvestit, du plus simple au plus corsé",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Pair ou impair, en toutes lettres",
          contenu: `
            <p>À la séance 4, tu affichais <code>True</code> ou <code>False</code>.
            Maintenant, affiche une vraie phrase. Avec <code>n = 47</code> :</p>
            <pre class="bloc-code"><code>47 est impair.</code></pre>`,
          depart: `n = 47\n\n`,
          validation: {
            codeContient: [
              { motif: "%", message: "La parité se teste avec le reste de la division par 2." },
              { motif: "\\belse\\b", message: "Les deux cas doivent être traités." },
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n." },
            ],
            sortie: "47 est impair.",
          },
          indices: [
            "Le test porte sur le reste de la division par 2.",
            "Le nombre affiché doit venir de la variable : <code>print(n, \"est impair.\")</code>.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "Majeur ou mineur",
          contenu: `
            <p>Demande son âge à l'utilisateur, puis affiche <code>Tu es majeur.</code> ou
            <code>Tu es mineur.</code> Exemple :</p>
            <pre class="bloc-code"><code>Ton âge ? 20
Tu es majeur.</code></pre>`,
          depart: `\n`,
          saisiesTest: ["20"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "L'âge doit être demandé et converti." },
              { motif: "\\belse\\b", message: "Il faut traiter les deux cas." },
            ],
            sortieRegex: "Tu es (majeur|mineur)\\.",
            sortieRegexMessage: "Ton programme doit afficher « Tu es majeur. » ou « Tu es mineur. »",
          },
          indices: [
            "Sans <code>int()</code>, la comparaison porterait sur du texte et donnerait n'importe quoi.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "La valeur absolue, à la main",
          contenu: `
            <p>La valeur absolue d'un nombre, c'est sa distance à zéro : elle est toujours
            positive. Avec <code>x = -12</code>, affiche :</p>
            <pre class="bloc-code"><code>La valeur absolue de -12 est 12</code></pre>
            <p>La fonction <code>abs()</code> existe en Python : elle est
            <strong>interdite</strong> ici, le but est de la reconstruire.</p>`,
          depart: `x = -12\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\babs\\s*\\(", message: "abs() est interdite : reconstruis-la avec un test." },
            ],
            codeContient: [
              { motif: "\\belse\\b", message: "Il faut distinguer deux cas selon le signe." },
              { motif: "\\bx\\b[\\s\\S]*\\bx\\b", message: "Sers-toi de la variable x." },
            ],
            sortie: "La valeur absolue de -12 est 12",
          },
          felicitation: "Tu viens de réécrire une fonction de la bibliothèque standard. 📏",
          indices: [
            "Si le nombre est négatif, sa valeur absolue est son <strong>opposé</strong>.",
            "Range le résultat dans une variable, puis affiche-la une seule fois à la fin.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : le else mal formé",
          contenu: `
            <p>Trois erreurs, toutes propres au <code>else</code>. Avec
            <code>note = 15</code>, le programme doit afficher :</p>
            <pre class="bloc-code"><code>Reçu</code></pre>`,
          depart: `note = 15\n\nif note >= 10\n    print("Reçu")\n    else note < 10:\n        print("Recalé")\n`,
          validation: {
            codeContient: [
              { motif: "\\belse\\b", message: "Garde le else." },
            ],
            sortie: "Reçu",
          },
          felicitation: "Deux-points, condition en trop, indentation : le triplé du else. 🐞",
          indices: [
            "Ligne 3 : il manque les deux-points en fin de ligne.",
            "Ligne 5 : <code>else</code> ne prend <strong>jamais</strong> de condition.",
            "Ligne 5 encore : <code>else</code> doit être aligné sur son <code>if</code>, donc sans décalage.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le triangle, enfin bavard",
          contenu: `
            <p>Reprends l'exercice 10 de la séance précédente, mais cette fois avec un
            message dans <strong>les deux cas</strong>. Avec <code>AC = 6</code>, le triangle
            n'est pas rectangle :</p>
            <pre class="bloc-code"><code>ABC n'est pas rectangle en B</code></pre>
            <p>L'autre message : <code>ABC est un triangle rectangle en B</code>.
            Vérifie en remettant <code>AC = 5</code>.</p>`,
          depart: `BC = 3\nAC = 6\nAB = 4\n\n`,
          validation: {
            codeContient: [
              { motif: "\\belse\\b", message: "Les deux cas doivent être traités." },
              { motif: "==", message: "Le test de Pythagore est une égalité." },
            ],
            sortie: "ABC n'est pas rectangle en B",
          },
          felicitation: "Le programme ne laisse plus l'utilisateur dans le doute. ✅",
          indices: [
            "La condition est celle de la séance précédente : le carré de [AC] contre la somme des deux autres carrés.",
            "Il suffit d'ajouter un <code>else</code> avec le second message.",
          ],
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 20,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Trois messages avec deux if … else",
          contenu: `
            <p>Sans utiliser <code>elif</code> — il arrive à la séance suivante — écris un
            programme qui distingue <strong>trois</strong> situations. Avec
            <code>age = 20</code> et <code>permis = False</code> :</p>
            <pre class="bloc-code"><code>Tu es majeur mais tu n'as pas le permis.</code></pre>
            <p>Les trois messages possibles :</p>
            <ul>
              <li>majeur avec le permis → <code>Tu peux conduire.</code></li>
              <li>majeur sans permis → le message ci-dessus ;</li>
              <li>mineur → <code>Tu es trop jeune pour conduire.</code></li>
            </ul>`,
          depart: `age = 20\npermis = False\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\belif\\b", message: "elif est réservé à la séance suivante." },
            ],
            codeContient: [
              { motif: "\\n {4,}if\\b", message: "Il faut un if imbriqué dans un autre." },
              { motif: "else[\\s\\S]*else", message: "Il faut deux else." },
            ],
            sortie: "Tu es majeur mais tu n'as pas le permis.",
          },
          felicitation: "Trois cas avec deux alternatives imbriquées. C'est exactement ce que elif abrège. 🪜",
          indices: [
            "Le premier test sépare majeur et mineur.",
            "À l'intérieur du cas « majeur », un second <code>if … else</code> sépare avec et sans permis.",
            "Compte tes espaces : 4 pour le second <code>if</code>, 8 pour ses blocs.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Le plus grand des trois",
          contenu: `
            <p>Avec <code>a = 7</code>, <code>b = 19</code> et <code>c = 19</code>, affiche
            exactement :</p>
            <pre class="bloc-code"><code>Le plus grand est 19</code></pre>
            <p><code>max()</code> est <strong>interdite</strong> : c'est justement elle que
            tu reconstruis. Un seul <code>print</code>.</p>`,
          depart: `a = 7\nb = 19\nc = 19\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "max() est interdite." },
              { motif: "\\b19\\b\\s*\\)", message: "Le résultat doit venir des variables." },
              { motif: "print[\\s\\S]*print", message: "Un seul print." },
            ],
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut comparer avec des tests." },
            ],
            sortie: "Le plus grand est 19",
          },
          felicitation: "max() reconstruite — et l'égalité ne t'a pas piégé. 🥇",
          indices: [
            "Reprends la méthode du champion : suppose d'abord que c'est <code>a</code>.",
            "Puis corrige deux fois : une pour <code>b</code>, une pour <code>c</code>.",
            "Cette méthode marche pour trois nombres comme pour trente : c'est son intérêt.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ton programme à deux issues",
          contenu: `
            <p>Défi libre. Écris un programme qui <strong>demande une information</strong> et
            se termine par un <code>if … else</code> dont <strong>chaque branche affiche au
            moins deux lignes</strong>.</p>
            <p>Des idées : un quiz à une question, un contrôle d'accès avec message de
            bienvenue ou de refus, un test de conformité (taille, âge, budget), un
            vérificateur de parité qui explique son raisonnement…</p>`,
          depart: `# Ton programme\n`,
          saisiesTest: ["12"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton programme doit demander une information." },
              { motif: "\\belse\\b", message: "Il doit se terminer par un if … else." },
              { motif: "\\n {4,}print[\\s\\S]*\\n {4,}print", message: "Chaque branche doit contenir au moins deux affichages." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins deux lignes.",
          },
          felicitation: "Séance 6 terminée. Plus aucun cas laissé sans réponse. 🏁",
          indices: [
            "Deux <code>print</code> dans chaque branche : ils doivent être indentés au même niveau.",
            "Pense à convertir la saisie si tu la compares à un nombre.",
          ],
        },
      ],
    },
  ],
};

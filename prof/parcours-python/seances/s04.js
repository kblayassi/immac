/* Séance 4 — L'instruction conditionnelle.
 * Fiche T6, dernière de la série. Prérequis : séance 3 (booléens).
 * Le if arrive APRÈS les booléens : une condition est déjà un objet connu.
 */

export default {
  id: "s04",
  numero: 4,
  titre: "L'instruction conditionnelle",
  sousTitre: "Faire choisir ton programme",
  palier: "Partie 1 — Variables, affectation, instruction conditionnelle",

  accroche: `Tes programmes savent comparer, mais ils font toujours la même chose.
    Avec <code>if</code>, ils vont enfin <strong>bifurquer</strong> : faire une chose
    dans un cas, une autre dans l'autre.`,

  objectifs: [
    "écrire une instruction <code>if</code> et comprendre le rôle de l'indentation",
    "traiter les deux cas avec <code>if</code> … <code>else</code>",
    "enchaîner plusieurs cas avec <code>elif</code>",
    "utiliser une condition composée dans un test",
  ],

  motDeLaFin: `La partie 1 est bouclée : variables, affectation, conditionnelle.
    À la séance 5, on apprend à répéter — et tes programmes vont changer d'échelle.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "on avance ensemble, une idée à la fois",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Le bloc « si … alors »",
          contenu: `
            <p>En Scratch, le bloc <strong>si … alors</strong> a un <em>ventre</em> : les
            instructions qu'on glisse dedans ne s'exécutent que si la condition est vraie.</p>

            <p>Python dit la même chose ainsi :</p>

            <pre class="bloc-code"><code>age = 20

if age &gt;= 18:
    print("Tu es majeur.")

print("Fin du programme")</code></pre>

            <p>Trois détails, tous obligatoires :</p>
            <ul>
              <li>le mot <code>if</code>, suivi d'une <strong>condition</strong> — exactement
                le genre d'expression que tu fabriquais à la séance 3 ;</li>
              <li>le <strong>deux-points</strong> <code>:</code> en fin de ligne ;</li>
              <li>les lignes du ventre <strong>décalées de quatre espaces</strong>.</li>
            </ul>

            <p>Ici, <code>print("Fin du programme")</code> n'est pas décalé : il est
            <em>en dehors</em> du bloc, donc il s'exécute dans tous les cas.</p>

            <div class="encadre" data-ton="scratch">
              <span class="chapo">L'équivalence à retenir</span>
              Le <strong>ventre</strong> du bloc Scratch, c'est le <strong>décalage</strong>
              en Python. Ce qui est décalé est dedans, ce qui ne l'est pas est dehors.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ton premier if",
          contenu: `
            <p>La température vaut 32 degrés. Écris un test qui affiche
            <code>Il fait chaud !</code> quand la température dépasse 30.</p>
            <p>Sortie attendue :</p>
            <pre class="bloc-code"><code>Il fait chaud !</code></pre>`,
          depart: `temperature = 32\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Il faut une instruction if." },
              { motif: "temperature", message: "La condition doit porter sur la variable temperature." },
            ],
            sortie: "Il fait chaud !",
          },
          felicitation: "Ton programme prend sa première décision. 🔀",
          indices: [
            "<code>if temperature > 30:</code> — n'oublie pas les deux-points.",
            "La ligne suivante doit être décalée de quatre espaces (touche <kbd>Tab</kbd>).",
          ],
          solution: `temperature = 32\n\nif temperature > 30:\n    print("Il fait chaud !")\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Le piège de l'indentation",
          contenu: `<p>Ici, <code>note</code> vaut 8. Regarde bien quelles lignes sont décalées.</p>`,
          code: `note = 8\n\nif note >= 10:\n    print("Reçu")\nprint("Fin du bulletin")`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>Reçu</code> puis <code>Fin du bulletin</code>",
              explication: "Non : la condition est fausse, donc le ventre du if est sauté." },
            { texte: "Seulement <code>Fin du bulletin</code>", correct: true,
              explication: "Oui. <code>print(\"Reçu\")</code> est dans le if, qui est faux ; <code>print(\"Fin du bulletin\")</code> n'est pas décalé, donc il s'exécute toujours." },
            { texte: "Seulement <code>Reçu</code>",
              explication: "Non, et deux fois non : la condition est fausse, et la dernière ligne s'exécute." },
            { texte: "Rien du tout",
              explication: "La dernière ligne est en dehors du if : elle s'exécute quoi qu'il arrive." },
          ],
          apres: `<span class="chapo">Le décalage n'est pas décoratif</span>
            En Python, l'indentation <strong>fait partie du sens</strong>. Décaler une ligne
            ou pas change le comportement du programme. C'est unique parmi les langages —
            et c'est ce qui rend le code Python si lisible.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Traiter l'autre cas : else",
          contenu: `
            <p>Souvent, il y a quelque chose à faire aussi quand la condition est fausse.
            C'est le rôle de <code>else</code>, « sinon » :</p>

            <pre class="bloc-code"><code>age = 15

if age &gt;= 18:
    print("Tu es majeur.")
else:
    print("Tu es mineur.")</code></pre>

            <p>Exactement <strong>un</strong> des deux blocs s'exécute, jamais les deux,
            jamais aucun.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La forme de else</span>
              <code>else</code> n'a <strong>pas de condition</strong> — il ramasse tous les
              cas restants. Il est suivi directement des deux-points, et il doit être aligné
              exactement sur son <code>if</code>.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Les deux cas",
          contenu: `
            <p>Avec <code>age = 15</code>, complète le programme pour qu'il affiche le bon
            message dans les deux situations. Ici, il doit afficher :</p>
            <pre class="bloc-code"><code>Tu es mineur.</code></pre>
            <p>Vérifie ensuite ton travail en remplaçant 15 par 20 : le message doit changer
            tout seul. Remets 15 avant de valider.</p>`,
          depart: `age = 15\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "Sers-toi de la variable age déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bif\\b", message: "Il faut un if…" },
              { motif: "\\belse\\b", message: "… et un else pour l'autre cas." },
            ],
            sortie: "Tu es mineur.",
          },
          felicitation: "Deux chemins, un seul emprunté. 🛤️",
          indices: [
            "<code>if age >= 18:</code> puis, en dessous et décalé, l'affichage du majeur.",
            "<code>else:</code> doit être aligné sur le <code>if</code>, sans décalage.",
          ],
          solution: `age = 15\n\nif age >= 18:\n    print("Tu es majeur.")\nelse:\n    print("Tu es mineur.")\n`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Plus de deux cas : elif",
          contenu: `
            <p>Deux cas, c'est bien. Souvent il en faut plus. On pourrait empiler des
            <code>if</code>, mais Python offre mieux : <code>elif</code>, contraction de
            <em>else if</em>, « sinon si ».</p>

            <pre class="bloc-code"><code>note = 13

if note &gt;= 16:
    print("Très bien")
elif note &gt;= 14:
    print("Bien")
elif note &gt;= 12:
    print("Assez bien")
else:
    print("Pas de mention")</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre est capital</span>
              Python teste les conditions <strong>de haut en bas</strong> et s'arrête à la
              première vraie. Ici, 13 échoue au premier test, échoue au deuxième, réussit au
              troisième : il affiche <em>Assez bien</em> et ne regarde pas la suite.
              <br><br>
              Si tu écrivais <code>note &gt;= 12</code> en premier, une note de 18 afficherait
              <em>Assez bien</em> ! Dans une cascade, on va du <strong>plus exigeant au moins
              exigeant</strong>.
            </div>

            <p>Une cascade peut avoir autant de <code>elif</code> qu'on veut, et le
            <code>else</code> final est facultatif.</p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "La cascade des tarifs",
          contenu: `
            <p>Un cinéma pratique trois tarifs :</p>
            <ul>
              <li>moins de 12 ans : <strong>5 euros</strong> ;</li>
              <li>de 12 à 25 ans : <strong>8 euros</strong> ;</li>
              <li>26 ans et plus : <strong>12 euros</strong>.</li>
            </ul>
            <p>Avec <code>age = 25</code>, ton programme doit afficher :</p>
            <pre class="bloc-code"><code>Tarif : 8 euros</code></pre>`,
          depart: `age = 25\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "Sers-toi de la variable age déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\belif\\b", message: "Trois cas : utilise elif plutôt que d'empiler des if." },
              { motif: "\\belse\\b", message: "Le dernier cas se traite avec else." },
            ],
            sortie: "Tarif : 8 euros",
          },
          felicitation: "Une cascade propre, du plus jeune au plus âgé. 🎟️",
          indices: [
            "Commence par le cas le plus restrictif : <code>if age &lt; 12:</code>.",
            "Puis <code>elif age &lt;= 25:</code> — inutile de retester <code>age >= 12</code>, on n'arrive ici que si le premier test a échoué.",
            "Enfin <code>else:</code> pour tout le reste.",
          ],
          solution: `age = 25\n\nif age < 12:\n    print("Tarif : 5 euros")\nelif age <= 25:\n    print("Tarif : 8 euros")\nelse:\n    print("Tarif : 12 euros")\n`,
          apres: `<p>Remarque l'économie du <code>elif</code> : la deuxième condition
            s'écrit simplement <code>age &lt;= 25</code>. Quand Python l'évalue, il sait déjà
            que l'âge n'est pas inférieur à 12.</p>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Une condition composée dans un test",
          contenu: `
            <p>Un parc autorise l'entrée si le visiteur a <strong>18 ans ou plus</strong>,
            <strong>ou bien</strong> s'il a <strong>au moins 12 ans et qu'il est
            accompagné</strong>.</p>
            <p>Avec <code>age = 16</code> et <code>accompagne = True</code>, ton programme
            doit afficher :</p>
            <pre class="bloc-code"><code>Tu peux entrer.</code></pre>
            <p>Change ensuite <code>accompagne</code> en <code>False</code> pour vérifier
            que le refus s'affiche, puis remets <code>True</code>.</p>`,
          depart: `age = 16\naccompagne = True\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "Sers-toi de la variable age déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\baccompagne\\b[\\s\\S]*\\baccompagne\\b", message: "Sers-toi de la variable accompagne déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bif\\b", message: "Il faut un if." },
              { motif: "\\bor\\b", message: "La règle contient un « ou bien » : il te faut un or." },
              { motif: "\\band\\b", message: "La deuxième moitié de la règle contient un « et » : il te faut un and." },
            ],
            sortie: "Tu peux entrer.",
          },
          felicitation: "Séance 3 et séance 4 réunies dans une seule ligne. 🎢",
          indices: [
            "La condition ressemble à : <code>age >= 18 or (age >= 12 and accompagne)</code>.",
            "Les parenthèses ne sont pas obligatoires ici, mais elles rendent la règle beaucoup plus lisible.",
            "<code>accompagne</code> est déjà un booléen : inutile d'écrire <code>accompagne == True</code>.",
          ],
          solution: `age = 16\naccompagne = True\n\nif age >= 18 or (age >= 12 and accompagne):\n    print("Tu peux entrer.")\nelse:\n    print("Entrée refusée.")\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Un test dans un test",
          contenu: `
            <p>On peut mettre un <code>if</code> <strong>à l'intérieur</strong> d'un autre.
            Il suffit de le décaler d'un cran de plus.</p>
            <p>Avec <code>age = 20</code> et <code>permis = False</code>, ton programme doit
            afficher :</p>
            <pre class="bloc-code"><code>Tu es majeur mais tu n'as pas le permis.</code></pre>
            <p>La règle :</p>
            <ul>
              <li>si la personne est majeure <em>et</em> a le permis → <code>Tu peux conduire.</code></li>
              <li>si elle est majeure <em>sans</em> permis → le message ci-dessus ;</li>
              <li>si elle est mineure → <code>Tu es trop jeune pour conduire.</code></li>
            </ul>`,
          depart: `age = 20\npermis = False\n\nif age >= 18:\n    print("À remplacer par un second test")\nelse:\n    print("Tu es trop jeune pour conduire.")\n`,
          validation: {
            codeContient: [
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "Sers-toi de la variable age déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bpermis\\b[\\s\\S]*\\bpermis\\b", message: "Sers-toi de la variable permis déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\n {4,}if\\b", message: "Le second if doit être imbriqué dans le premier, donc décalé." },
            ],
            sortie: "Tu es majeur mais tu n'as pas le permis.",
          },
          felicitation: "Deux niveaux d'indentation maîtrisés. 🪜",
          indices: [
            "Remplace la ligne <code>print(\"À remplacer…\")</code> par <code>if permis:</code>, au même décalage : quatre espaces.",
            "Son ventre à lui est décalé de huit espaces.",
            "Puis un <code>else:</code> aligné sur le <code>if permis</code>, donc à quatre espaces.",
          ],
          solution: `age = 20\npermis = False\n\nif age >= 18:\n    if permis:\n        print("Tu peux conduire.")\n    else:\n        print("Tu es majeur mais tu n'as pas le permis.")\nelse:\n    print("Tu es trop jeune pour conduire.")\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>if condition1:
    # exécuté si condition1 est vraie
elif condition2:
    # exécuté si condition1 est fausse ET condition2 vraie
else:
    # exécuté si toutes les conditions sont fausses</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les quatre fautes qui reviennent</span>
              <ol style="margin-bottom:0">
                <li>oublier les <strong>deux-points</strong> en fin de ligne ;</li>
                <li>oublier d'<strong>indenter</strong> le ventre ;</li>
                <li>écrire <code>=</code> au lieu de <code>==</code> dans la condition ;</li>
                <li>mettre une <strong>condition après <code>else</code></strong> — il n'en prend pas.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un conseil de méthode</span>
              Avant d'écrire le code, énonce la règle <strong>à voix haute, en français</strong>,
              en commençant par le cas le plus restrictif. La traduction en Python suit
              presque mot à mot.
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
          titre: "Majeur ou mineur",
          contenu: `
            <p>Demande son âge à l'utilisateur puis affiche <code>Tu es majeur.</code> ou
            <code>Tu es mineur.</code> selon le cas. Par exemple :</p>
            <pre class="bloc-code"><code>Ton âge ? 20
Tu es majeur.</code></pre>`,
          depart: `\n`,
          saisiesTest: ["20"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "L'âge doit être demandé et converti en nombre." },
              { motif: "\\bif\\b", message: "Il faut un test." },
              { motif: "\\belse\\b", message: "Il faut traiter les deux cas." },
            ],
            sortieRegex: "Tu es (majeur|mineur)\\.",
            sortieRegexMessage: "Ton programme doit afficher « Tu es majeur. » ou « Tu es mineur. »",
          },
          indices: [
            "<code>age = int(input(\"Ton âge ? \"))</code>",
            "Puis un <code>if age >= 18:</code> avec son <code>else:</code>.",
          ],
          solution: `age = int(input("Ton âge ? "))\n\nif age >= 18:\n    print("Tu es majeur.")\nelse:\n    print("Tu es mineur.")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Pair ou impair, en toutes lettres",
          contenu: `
            <p>À la séance 3, tu affichais <code>True</code> ou <code>False</code>.
            Maintenant, affiche une vraie phrase. Avec <code>n = 47</code> :</p>
            <pre class="bloc-code"><code>47 est impair.</code></pre>`,
          depart: `n = 47\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "%", message: "La parité se teste avec le reste de la division par 2." },
              { motif: "\\bif\\b", message: "Il faut un test." },
            ],
            sortie: "47 est impair.",
          },
          indices: [
            "<code>if n % 2 == 0:</code> traite le cas pair.",
            "<code>print(n, \"est impair.\")</code> — la virgule met l'espace toute seule.",
          ],
          solution: `n = 47\n\nif n % 2 == 0:\n    print(n, "est pair.")\nelse:\n    print(n, "est impair.")\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "La valeur absolue, à la main",
          contenu: `
            <p>La valeur absolue d'un nombre, c'est sa distance à zéro : elle est toujours
            positive. Avec <code>x = -12</code>, affiche :</p>
            <pre class="bloc-code"><code>La valeur absolue de -12 est 12</code></pre>
            <p>Python possède une fonction <code>abs()</code> toute faite :
            <strong>interdite ici</strong>, le but est de la reconstruire.</p>`,
          depart: `x = -12\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\babs\\s*\\(", message: "abs() est interdite : reconstruis la valeur absolue avec un test." },
            ],
            codeContient: [
              { motif: "\\bx\\b[\\s\\S]*\\bx\\b", message: "Sers-toi de la variable x déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bif\\b", message: "Il faut distinguer deux cas selon le signe." },
            ],
            sortie: "La valeur absolue de -12 est 12",
          },
          felicitation: "Tu viens de réécrire une fonction de la bibliothèque standard. 📏",
          indices: [
            "Si <code>x</code> est négatif, sa valeur absolue est <code>-x</code>.",
            "Sinon, c'est <code>x</code> lui-même.",
            "Range le résultat dans une variable <code>distance</code> avant de l'afficher.",
          ],
          solution: `x = -12\n\nif x < 0:\n    distance = -x\nelse:\n    distance = x\n\nprint("La valeur absolue de", x, "est", distance)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Les quatre tarifs",
          contenu: `
            <p>Un musée pratique quatre tarifs :</p>
            <ul>
              <li>moins de 12 ans : <strong>gratuit</strong> ;</li>
              <li>de 12 à 17 ans : <strong>7 euros</strong> ;</li>
              <li>de 18 à 64 ans : <strong>11 euros</strong> ;</li>
              <li>65 ans et plus : <strong>8 euros</strong>.</li>
            </ul>
            <p>Avec <code>age = 14</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Tarif : 7 euros</code></pre>`,
          depart: `age = 14\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bage\\b[\\s\\S]*\\bage\\b", message: "Sers-toi de la variable age déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "elif[\\s\\S]*elif", message: "Quatre cas, donc au moins deux elif." },
            ],
            sortie: "Tarif : 7 euros",
          },
          indices: [
            "Quatre cas s'écrivent : <code>if</code>, <code>elif</code>, <code>elif</code>, <code>else</code>.",
            "Va du plus jeune au plus âgé, et n'oublie pas que chaque <code>elif</code> n'est atteint que si les précédents ont échoué.",
          ],
          solution: `age = 14\n\nif age < 12:\n    print("Tarif : gratuit")\nelif age < 18:\n    print("Tarif : 7 euros")\nelif age < 65:\n    print("Tarif : 11 euros")\nelse:\n    print("Tarif : 8 euros")\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La mention au bac",
          contenu: `
            <p>Barème officiel, à partir de la moyenne sur 20 :</p>
            <ul>
              <li>moins de 10 : <code>Recalé</code> ;</li>
              <li>de 10 à moins de 12 : <code>Admis sans mention</code> ;</li>
              <li>de 12 à moins de 14 : <code>Mention assez bien</code> ;</li>
              <li>de 14 à moins de 16 : <code>Mention bien</code> ;</li>
              <li>16 et plus : <code>Mention très bien</code>.</li>
            </ul>
            <p>Avec <code>moyenne = 15.5</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Mention bien</code></pre>`,
          depart: `moyenne = 15.5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bmoyenne\\b[\\s\\S]*\\bmoyenne\\b", message: "Sers-toi de la variable moyenne déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "elif[\\s\\S]*elif[\\s\\S]*elif", message: "Cinq cas, donc au moins trois elif." },
            ],
            sortie: "Mention bien",
          },
          felicitation: "Cinq cas enchaînés sans faute. 🎓",
          indices: [
            "Commence par le cas le plus haut : <code>if moyenne >= 16:</code>.",
            "Puis descends : 14, 12, 10, et le <code>else</code> final pour les recalés.",
            "Attention : si tu montes au lieu de descendre, il faut inverser toutes les comparaisons.",
          ],
          solution: `moyenne = 15.5\n\nif moyenne >= 16:\n    print("Mention très bien")\nelif moyenne >= 14:\n    print("Mention bien")\nelif moyenne >= 12:\n    print("Mention assez bien")\nelif moyenne >= 10:\n    print("Admis sans mention")\nelse:\n    print("Recalé")\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs : le test cassé",
          contenu: `
            <p>Trois erreurs, toutes typiques du <code>if</code>. Avec
            <code>note = 15</code>, le programme doit afficher :</p>
            <pre class="bloc-code"><code>Reçu</code></pre>`,
          depart: `note = 15\n\nif note >= 10\nprint("Reçu")\nelse note < 10:\n    print("Recalé")\n`,
          validation: {
            codeContient: [
              { motif: "\\bnote\\b[\\s\\S]*\\bnote\\b", message: "Sers-toi de la variable note déjà définie, plutôt que de réécrire sa valeur." },
            ], sortie: "Reçu" },
          felicitation: "Deux-points, indentation, else sans condition : le triplé gagnant. 🐞",
          indices: [
            "Ligne 3 : il manque les deux-points à la fin.",
            "Ligne 4 : elle devrait être dans le ventre du if, donc décalée.",
            "Ligne 5 : <code>else</code> ne prend jamais de condition.",
          ],
          solution: `note = 15\n\nif note >= 10:\n    print("Reçu")\nelse:\n    print("Recalé")\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Le plus grand des deux",
          contenu: `
            <p>Avec <code>a = 23</code> et <code>b = 23</code>, ton programme doit gérer
            aussi le cas de l'égalité :</p>
            <pre class="bloc-code"><code>Les deux nombres sont égaux.</code></pre>
            <p>Les trois messages possibles : <code>a est le plus grand.</code>,
            <code>b est le plus grand.</code>, <code>Les deux nombres sont égaux.</code></p>`,
          depart: `a = 23\nb = 23\n\n`,
          validation: {
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi de la variable a déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\belif\\b", message: "Trois cas possibles : il te faut un elif." },
            ],
            sortie: "Les deux nombres sont égaux.",
          },
          indices: [
            "<code>if a > b:</code> puis <code>elif b > a:</code>.",
            "Le <code>else</code> ramasse le seul cas restant : l'égalité.",
          ],
          solution: `a = 23\nb = 23\n\nif a > b:\n    print("a est le plus grand.")\nelif b > a:\n    print("b est le plus grand.")\nelse:\n    print("Les deux nombres sont égaux.")\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Le signe d'un nombre",
          contenu: `
            <p>Avec <code>n = 0</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>0 est nul.</code></pre>
            <p>Les trois messages : <code>… est positif.</code>, <code>… est négatif.</code>,
            <code>… est nul.</code> — le nombre affiché doit venir de la variable.</p>`,
          depart: `n = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bn\\b[\\s\\S]*\\bn\\b", message: "Sers-toi de la variable n déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\belif\\b", message: "Trois cas : positif, négatif, nul." },
            ],
            sortie: "0 est nul.",
          },
          indices: [
            "Attention à l'ordre : zéro n'est ni positif ni négatif au sens strict.",
            "<code>if n > 0:</code> … <code>elif n < 0:</code> … <code>else:</code>",
          ],
          solution: `n = 0\n\nif n > 0:\n    print(n, "est positif.")\nelif n < 0:\n    print(n, "est négatif.")\nelse:\n    print(n, "est nul.")\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Le distributeur de boissons",
          contenu: `
            <p>Une boisson coûte <strong>2 euros</strong>. Demande le montant inséré
            (un entier) et réagis :</p>
            <ul>
              <li>montant insuffisant → <code>Montant insuffisant.</code></li>
              <li>montant exact → <code>Boisson servie.</code></li>
              <li>montant supérieur → <code>Boisson servie. Rendu : … euros</code></li>
            </ul>
            <p>Par exemple, avec 5 euros insérés :</p>
            <pre class="bloc-code"><code>Montant inséré ? 5
Boisson servie. Rendu : 3 euros</code></pre>`,
          depart: `prix = 2\n\n`,
          saisiesTest: ["5"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "Le montant doit être demandé et converti." },
              { motif: "\\belif\\b", message: "Trois cas : il te faut un elif." },
              { motif: "prix", message: "Utilise la variable prix, pour que le programme reste modifiable." },
            ],
            sortieRegex: "Boisson servie\\. Rendu : \\d+ euros",
            sortieRegexMessage: "Avec un montant supérieur au prix, le rendu doit être affiché et calculé.",
          },
          felicitation: "Un automate complet, en neuf lignes. 🥤",
          indices: [
            "<code>montant = int(input(\"Montant inséré ? \"))</code>",
            "<code>if montant &lt; prix:</code> puis <code>elif montant == prix:</code>.",
            "Le rendu vaut <code>montant - prix</code>.",
          ],
          solution: `prix = 2\n\nmontant = int(input("Montant inséré ? "))\n\nif montant < prix:\n    print("Montant insuffisant.")\nelif montant == prix:\n    print("Boisson servie.")\nelse:\n    print("Boisson servie. Rendu :", montant - prix, "euros")\n`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 30,
      etoiles: 3,
      intention: "plus difficile, et pas obligatoire",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Le plus grand des trois",
          contenu: `
            <p>Avec <code>a = 7</code>, <code>b = 19</code> et <code>c = 19</code>, affiche
            exactement :</p>
            <pre class="bloc-code"><code>Le plus grand est 19</code></pre>
            <p>La fonction <code>max()</code> est <strong>interdite</strong> : c'est justement
            elle que tu reconstruis.</p>`,
          depart: `a = 7\nb = 19\nc = 19\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bmax\\s*\\(", message: "max() est interdite : construis la comparaison toi-même." },
              { motif: "\\b19\\b\\s*\\)", message: "Le résultat doit venir des variables, pas être écrit." },
            ],
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi de la variable a déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bc\\b[\\s\\S]*\\bc\\b", message: "Sers-toi de la variable c déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bif\\b", message: "Il faut comparer avec des tests." },
            ],
            sortie: "Le plus grand est 19",
          },
          felicitation: "max() reconstruite. Et l'égalité ne t'a pas piégé. 🥇",
          indices: [
            "Une méthode simple : commence par supposer que c'est <code>a</code> le plus grand, puis corrige.",
            "<code>plus_grand = a</code>, puis <code>if b > plus_grand: plus_grand = b</code>.",
            "Répète le même test avec <code>c</code>. Cette méthode marche pour autant de nombres qu'on veut.",
          ],
          solution: `a = 7\nb = 19\nc = 19\n\nplus_grand = a\nif b > plus_grand:\n    plus_grand = b\nif c > plus_grand:\n    plus_grand = c\n\nprint("Le plus grand est", plus_grand)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Résoudre ax + b = 0",
          contenu: `
            <p>Un vrai problème de maths, avec sa discussion complète :</p>
            <ul>
              <li>si <em>a</em> ≠ 0, l'équation a une unique solution : <em>x</em> = −<em>b</em>/<em>a</em> ;</li>
              <li>si <em>a</em> = 0 et <em>b</em> ≠ 0, elle n'a aucune solution ;</li>
              <li>si <em>a</em> = 0 et <em>b</em> = 0, tout nombre est solution.</li>
            </ul>
            <p>Avec <code>a = 0</code> et <code>b = 5</code>, affiche exactement :</p>
            <pre class="bloc-code"><code>Aucune solution</code></pre>
            <p>Teste ensuite ton programme avec <code>a = 2, b = -6</code> : il doit afficher
            <code>Solution unique : 3.0</code>. Remets 0 et 5 avant de valider.</p>`,
          depart: `a = 0\nb = 5\n\n`,
          validation: {
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi de la variable a déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\belif\\b", message: "Trois cas à distinguer : il te faut un elif." },
              { motif: "/", message: "Le cas général demande une division." },
            ],
            sortie: "Aucune solution",
          },
          felicitation: "Une discussion mathématique complète, traduite en Python. 🧮",
          indices: [
            "Le premier test doit être <code>if a != 0:</code> — c'est le cas général.",
            "Dans ce cas : <code>print(\"Solution unique :\", -b / a)</code>.",
            "Ensuite <code>elif b != 0:</code> pour l'absence de solution, et <code>else:</code> pour l'infinité.",
          ],
          solution: `a = 0\nb = 5\n\nif a != 0:\n    print("Solution unique :", -b / a)\nelif b != 0:\n    print("Aucune solution")\nelse:\n    print("Tout nombre est solution")\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "La nature du triangle",
          contenu: `
            <p>Trois longueurs. D'abord, le triangle existe-t-il ? L'inégalité triangulaire
            dit que <strong>chaque côté doit être plus court que la somme des deux autres</strong>.</p>
            <p>S'il existe, il est <em>équilatéral</em> (trois côtés égaux),
            <em>isocèle</em> (deux côtés égaux) ou <em>quelconque</em>.</p>
            <p>Avec <code>a = 5</code>, <code>b = 5</code> et <code>c = 8</code>, affiche
            exactement :</p>
            <pre class="bloc-code"><code>Triangle isocèle</code></pre>
            <p>Le message si le triangle n'existe pas : <code>Ce triangle n'existe pas</code>.</p>`,
          depart: `a = 5\nb = 5\nc = 8\n\n`,
          validation: {
            codeContient: [
              { motif: "\\ba\\b[\\s\\S]*\\ba\\b", message: "Sers-toi de la variable a déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bc\\b[\\s\\S]*\\bc\\b", message: "Sers-toi de la variable c déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\bif\\b[\\s\\S]*\\bif\\b", message: "Il faut d'abord tester l'existence, puis la nature : deux tests au moins." },
              { motif: "\\bor\\b", message: "« Deux côtés égaux » se traduit par plusieurs égalités reliées par or." },
            ],
            sortie: "Triangle isocèle",
          },
          felicitation: "Existence puis nature : la démarche du géomètre. 📐",
          indices: [
            "L'existence : <code>a &lt; b + c and b &lt; a + c and c &lt; a + b</code>.",
            "Équilatéral : <code>a == b and b == c</code>. Teste-le en premier, sinon un équilatéral serait déclaré isocèle.",
            "Isocèle : <code>a == b or b == c or a == c</code>.",
          ],
          solution: `a = 5\nb = 5\nc = 8\n\nif a < b + c and b < a + c and c < a + b:\n    if a == b and b == c:\n        print("Triangle équilatéral")\n    elif a == b or b == c or a == c:\n        print("Triangle isocèle")\n    else:\n        print("Triangle quelconque")\nelse:\n    print("Ce triangle n'existe pas")\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le nombre mystère, premier tour",
          contenu: `
            <p>Le nombre secret est <strong>42</strong>. Demande une proposition et réponds :</p>
            <ul>
              <li>proposition trop petite → <code>C'est plus !</code></li>
              <li>proposition trop grande → <code>C'est moins !</code></li>
              <li>proposition juste → <code>Bravo, c'est gagné !</code></li>
            </ul>
            <p>Un seul tour pour l'instant. À la séance 6, tu boucleras jusqu'à la victoire.</p>`,
          depart: `secret = 42\n\n`,
          saisiesTest: ["30"],
          validation: {
            codeContient: [
              { motif: "int\\s*\\(\\s*input", message: "La proposition doit être demandée et convertie." },
              { motif: "\\belif\\b", message: "Trois réponses possibles : il te faut un elif." },
              { motif: "secret", message: "Compare à la variable secret." },
            ],
            sortieRegex: "(C'est plus !|C'est moins !|Bravo, c'est gagné !)",
            sortieRegexMessage: "Ton programme doit répondre par l'un des trois messages.",
          },
          felicitation: "Le cœur du jeu est écrit. Il ne manque que la boucle. 🎯",
          indices: [
            "<code>proposition = int(input(\"Ta proposition ? \"))</code>",
            "<code>if proposition &lt; secret:</code> → c'est plus.",
            "N'oublie pas le cas de l'égalité, avec <code>else</code>.",
          ],
          solution: `secret = 42\n\nproposition = int(input("Ta proposition ? "))\n\nif proposition < secret:\n    print("C'est plus !")\nelif proposition > secret:\n    print("C'est moins !")\nelse:\n    print("Bravo, c'est gagné !")\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Bissextile, en toutes lettres",
          contenu: `
            <p>Reprends la règle des années bissextiles de la séance 3, mais cette fois
            affiche une phrase. Avec <code>annee = 2000</code> :</p>
            <pre class="bloc-code"><code>2000 est bissextile.</code></pre>
            <p>L'autre message : <code>… n'est pas bissextile.</code></p>
            <p><strong>Contrainte :</strong> écris-le sans <code>and</code> ni <code>or</code>,
            uniquement avec des <code>if</code> imbriqués. C'est plus long, mais cela montre
            que les deux écritures disent la même chose.</p>`,
          depart: `annee = 2000\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\band\\b|\\bor\\b", message: "Pour ce défi, and et or sont interdits : imbrique des if." },
            ],
            codeContient: [
              { motif: "\\bannee\\b[\\s\\S]*\\bannee\\b", message: "Sers-toi de la variable annee déjà définie, plutôt que de réécrire sa valeur." },
              { motif: "\\n {4,}if\\b", message: "Il faut au moins un if imbriqué dans un autre." },
            ],
            sortie: "2000 est bissextile.",
          },
          felicitation: "Même règle, deux écritures. Tu as compris la mécanique. 📅",
          indices: [
            "Commence par <code>if annee % 4 == 0:</code> — sinon, ce n'est jamais bissextile.",
            "À l'intérieur : <code>if annee % 100 == 0:</code>, et là il faut encore regarder 400.",
            "Trois niveaux d'imbrication au total. Compte tes espaces : 4, 8, 12.",
          ],
          solution: `annee = 2000\n\nif annee % 4 == 0:\n    if annee % 100 == 0:\n        if annee % 400 == 0:\n            print(annee, "est bissextile.")\n        else:\n            print(annee, "n'est pas bissextile.")\n    else:\n        print(annee, "est bissextile.")\nelse:\n    print(annee, "n'est pas bissextile.")\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton programme à décisions",
          contenu: `
            <p>Défi libre. Écris un programme qui pose <strong>au moins une question</strong>
            et qui distingue <strong>au moins trois cas</strong> avec une cascade
            <code>if</code> / <code>elif</code> / <code>else</code>.</p>
            <p>Des idées : un conseiller vestimentaire selon la température, un calculateur
            d'IMC avec ses catégories, un quiz noté sur trois questions, un convertisseur de
            note en appréciation, l'orientation d'un élève selon sa moyenne…</p>`,
          depart: `# Ton programme\n`,
          saisiesTest: ["12"],
          validation: {
            codeContient: [
              { motif: "input\\s*\\(", message: "Ton programme doit poser au moins une question." },
              { motif: "\\belif\\b", message: "Il doit distinguer au moins trois cas, donc contenir un elif." },
              { motif: "\\belse\\b", message: "Termine ta cascade par un else." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 4 terminée, et la partie 1 avec elle. 🏁",
          indices: [
            "Structure : une saisie, une conversion, puis <code>if</code> / <code>elif</code> / <code>else</code>.",
            "Pense à afficher un message dans <em>chaque</em> branche, sinon certains cas resteront muets.",
          ],
          solution: `temperature = int(input("Quelle température fait-il ? "))\n\nif temperature < 5:\n    print("Manteau, écharpe et bonnet.")\nelif temperature < 15:\n    print("Une veste suffira.")\nelif temperature < 25:\n    print("Un pull léger, c'est parfait.")\nelse:\n    print("T-shirt et casquette !")\n`,
        },
      ],
    },
  ],
};

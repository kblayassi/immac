/* Séance 2 — Variables, types et calculs.
 * Fiche T6. Prérequis : séance 1 (print, séquence, erreurs).
 * Prépare Ch. 11 des maths (multiples et diviseurs) via // et %.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Variables, types et calculs",
  sousTitre: "Faire retenir des choses à l'ordinateur",
  palier: "T6 — Variables, affectation, instruction conditionnelle",

  accroche: `En Scratch, tu avais des variables : <em>score</em>, <em>vie</em>,
    <em>chrono</em>. En Python, c'est la même idée en beaucoup plus souple — et c'est
    l'outil qui va rendre tes programmes vraiment utiles.`,

  objectifs: [
    "créer une variable, la lire, la modifier",
    "distinguer le <code>=</code> de l'informatique de celui des mathématiques",
    "reconnaître les types <code>int</code>, <code>float</code> et <code>str</code>",
    "utiliser la division entière <code>//</code> et le reste <code>%</code>",
  ],

  motDeLaFin: `Tes programmes savent maintenant mémoriser. À la séance 3, ils vont
    apprendre à te poser des questions et à comparer des valeurs.`,

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
          titre: "Une variable, c'est une étiquette",
          contenu: `
            <p>En Scratch, le bloc <strong>mettre <em>score</em> à 0</strong> crée une
            variable. En Python, ça tient en trois caractères :</p>

            <pre class="bloc-code"><code>score = 0</code></pre>

            <p>Cette ligne se lit : « <strong>score reçoit 0</strong> ». À gauche, le
            <strong>nom</strong> que tu choisis ; à droite, la <strong>valeur</strong> qu'on
            y range. On appelle cela une <strong>affectation</strong>.</p>

            <p>Une image utile : la variable est une <strong>étiquette collée sur une
            valeur</strong>. Quand tu écris <code>score</code> plus loin dans le programme,
            Python va chercher la valeur qui porte cette étiquette.</p>

            <pre class="bloc-code"><code>score = 0
print(score)        # affiche 0
print("score")      # affiche score</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Avec ou sans guillemets, encore</span>
              <code>print(score)</code> affiche <strong>la valeur</strong> de la variable.
              <code>print("score")</code> affiche <strong>le mot</strong> score. C'est la
              même règle qu'à la séance 1.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première variable",
          contenu: `
            <p>Crée une variable nommée <code>age</code> qui vaut <strong>15</strong>,
            puis affiche exactement :</p>
            <pre class="bloc-code"><code>Tu as 15 ans.</code></pre>
            <p>Le nombre affiché doit venir de la <strong>variable</strong>, pas être
            retapé dans le texte.</p>`,
          depart: `age = \nprint("Tu as", , "ans.")\n`,
          validation: {
            codeContient: [
              { motif: "age\\s*=\\s*15", message: "Commence par créer la variable : age = 15" },
              { motif: "print[^\\n]*\\bage\\b", message: "Le print doit utiliser la variable age, pas le nombre 15." },
            ],
            sortie: "Tu as 15 ans.",
          },
          felicitation: "Ta première variable est en place. 📦",
          indices: [
            "Ligne 1 : <code>age = 15</code>.",
            "Ligne 2 : entre les deux virgules, écris <code>age</code> — sans guillemets.",
          ],
          solution: `age = 15\nprint("Tu as", age, "ans.")\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "Que vaut x à la fin ?",
          contenu: `<p>Réfléchis avant d'exécuter.</p>`,
          code: `x = 5\nx = 8\nprint(x)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>5</code>", explication: "Non : la deuxième ligne a remplacé la valeur." },
            { texte: "<code>8</code>", correct: true,
              explication: "Oui. Une variable ne retient qu'une seule valeur : la dernière reçue." },
            { texte: "<code>5</code> puis <code>8</code>",
              explication: "Non : il n'y a qu'un seul print, donc une seule ligne affichée." },
            { texte: "<code>13</code>", explication: "Non, il n'y a aucune addition ici." },
          ],
          apres: `<span class="chapo">À retenir</span>
            Une nouvelle affectation <strong>écrase</strong> l'ancienne valeur. La variable
            n'a pas de mémoire de son passé.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Le piège du signe égal",
          contenu: `
            <p>Regarde cette ligne, très courante en programmation :</p>
            <pre class="bloc-code"><code>score = score + 1</code></pre>

            <p>En mathématiques, elle serait <strong>absurde</strong> : aucun nombre n'est
            égal à lui-même plus un.</p>

            <p>En Python, elle est parfaitement normale, parce que <code>=</code> ne veut
            <strong>pas</strong> dire « est égal à ». Elle veut dire « <strong>reçoit</strong> ».
            Python procède en deux temps :</p>

            <ol>
              <li>il calcule la <strong>droite</strong> : <code>score + 1</code>, donc l'ancien score plus un ;</li>
              <li>il range le résultat dans la variable de <strong>gauche</strong>.</li>
            </ol>

            <p>Si <code>score</code> valait 7, il vaut 8 après cette ligne. C'est exactement
            le bloc <strong>ajouter 1 à <em>score</em></strong> de Scratch.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le sens de lecture</span>
              L'affectation va toujours de <strong>droite à gauche</strong>. En langage
              naturel, on la note d'ailleurs avec une flèche : <code>score ← score + 1</code>.
              C'est cette notation que tu verras en cours de maths.
            </div>`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Le compteur de points",
          contenu: `
            <p>Complète ce programme pour qu'il affiche exactement :</p>
            <pre class="bloc-code"><code>Score de départ : 0
Score final : 30</code></pre>
            <p>Entre les deux affichages, le score doit gagner <strong>10 points trois
            fois</strong>. Interdit d'écrire <code>score = 30</code> : chaque gain doit être
            une addition.</p>`,
          depart: `score = 0\nprint("Score de départ :", score)\n\n# Ajoute ici les trois gains de 10 points\n\nprint("Score final :", score)\n`,
          validation: {
            codeAbsent: [
              { motif: "score\\s*=\\s*30", message: "Le 30 doit être obtenu par des additions successives, pas écrit directement." },
            ],
            codeContient: [
              { motif: "(score\\s*=\\s*score\\s*\\+|score\\s*\\+=)[^\\n]*\\n[\\s\\S]*(score\\s*=\\s*score\\s*\\+|score\\s*\\+=)",
                message: "Il faut au moins deux lignes qui ajoutent des points au score." },
            ],
            sortie: "Score de départ : 0\nScore final : 30",
          },
          felicitation: "Le compteur tourne. C'est le cœur de tous les jeux. 🎮",
          indices: [
            "Une ligne du type <code>score = score + 10</code>, répétée trois fois.",
            "Place ces trois lignes entre les deux <code>print</code>, sans indentation.",
          ],
          solution: `score = 0\nprint("Score de départ :", score)\n\nscore = score + 10\nscore = score + 10\nscore = score + 10\n\nprint("Score final :", score)\n`,
        },

        {
          id: "d6",
          type: "cours",
          titre: "Trois types de valeurs",
          contenu: `
            <p>Toutes les valeurs ne se ressemblent pas. Python en distingue le
            <strong>type</strong>, et cela change ce qu'on peut en faire :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Type</th><th>Nom Python</th><th>Exemples</th></tr>
              <tr><td>nombre entier</td><td><code>int</code></td><td><code>0</code> &nbsp; <code>15</code> &nbsp; <code>-3</code></td></tr>
              <tr><td>nombre à virgule</td><td><code>float</code></td><td><code>1.5</code> &nbsp; <code>3.14</code> &nbsp; <code>-0.5</code></td></tr>
              <tr><td>texte (« chaîne »)</td><td><code>str</code></td><td><code>"Ada"</code> &nbsp; <code>"15"</code> &nbsp; <code>""</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le point, pas la virgule</span>
              En Python, un nombre décimal s'écrit <code>1.5</code> et jamais <code>1,5</code> :
              la virgule sert à séparer les choses dans un <code>print</code>.
            </div>

            <p>L'instruction <code>type(…)</code> te dit le type d'une valeur :</p>
            <pre class="bloc-code"><code>print(type(15))       # &lt;class 'int'&gt;
print(type(1.5))      # &lt;class 'float'&gt;
print(type("Ada"))    # &lt;class 'str'&gt;</code></pre>

            <p>Attention à <code>"15"</code> avec des guillemets : pour Python, c'est du
            <strong>texte</strong>, pas un nombre. On ne peut pas le multiplier par 2 —
            enfin si, mais pas comme tu crois.</p>`,
        },

        {
          id: "d7",
          type: "prediction",
          titre: "Additionner du texte",
          contenu: `<p>Le programme suivant ne fait pas ce qu'on croit.</p>`,
          code: `a = "5"\nb = "3"\nprint(a + b)`,
          question: "Qu'affiche-t-il ?",
          options: [
            { texte: "<code>8</code>", explication: "Ce serait vrai si 5 et 3 étaient des nombres. Ici, ce sont des textes." },
            { texte: "<code>53</code>", correct: true,
              explication: "Additionner deux textes, c'est les <strong>coller bout à bout</strong>. On appelle ça la concaténation." },
            { texte: "<code>15</code>", explication: "Non, il n'y a pas de multiplication ici." },
            { texte: "Un message d'erreur", explication: "Non : <code>+</code> a un sens pour les textes, il les colle." },
          ],
          apres: `<span class="chapo">Le signe + a deux métiers</span>
            Entre deux <strong>nombres</strong>, il additionne. Entre deux
            <strong>textes</strong>, il colle. Entre un nombre et un texte, il refuse et
            lève une <code>TypeError</code> : c'est l'erreur la plus fréquente de l'année.`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Convertir un texte en nombre",
          contenu: `
            <p>Quand une valeur est du texte alors qu'on la voudrait numérique, on la
            <strong>convertit</strong> :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><td><code>int("42")</code></td><td>donne l'entier <code>42</code></td></tr>
              <tr><td><code>float("1.5")</code></td><td>donne le décimal <code>1.5</code></td></tr>
              <tr><td><code>str(42)</code></td><td>donne le texte <code>"42"</code></td></tr>
            </table>
            </div>
            <p><strong>À toi.</strong> Les deux valeurs ci-dessous sont du texte. Convertis-les
            pour que le programme affiche la vraie somme :</p>
            <pre class="bloc-code"><code>La somme vaut 8</code></pre>`,
          depart: `a = "5"\nb = "3"\nprint("La somme vaut", a + b)\n`,
          validation: {
            codeContient: [
              { motif: "int\\s*\\(", message: "Utilise int(…) pour convertir le texte en nombre." },
            ],
            sortie: "La somme vaut 8",
          },
          felicitation: "Conversion réussie. Ce réflexe te servira dès la séance 3. 🔁",
          indices: [
            "Il faut convertir <code>a</code> et <code>b</code> avant de les additionner.",
            "Écris <code>int(a) + int(b)</code> dans le print.",
          ],
          solution: `a = "5"\nb = "3"\nprint("La somme vaut", int(a) + int(b))\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Le quotient et le reste",
          contenu: `
            <p>Deux opérations très utiles, que tu connais depuis l'école primaire sous le
            nom de <em>division euclidienne</em> :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Sens</th><th>Exemple</th></tr>
              <tr><td><code>/</code></td><td>division ordinaire, résultat décimal</td><td><code>17 / 5</code> vaut <code>3.4</code></td></tr>
              <tr><td><code>//</code></td><td><strong>quotient</strong> entier</td><td><code>17 // 5</code> vaut <code>3</code></td></tr>
              <tr><td><code>%</code></td><td><strong>reste</strong></td><td><code>17 % 5</code> vaut <code>2</code></td></tr>
            </table>
            </div>
            <p><strong>À toi.</strong> Une course dure <strong>147 minutes</strong>.
            Affiche exactement :</p>
            <pre class="bloc-code"><code>147 minutes, c'est 2 h et 27 min.</code></pre>
            <p>Les deux nombres doivent être calculés à partir de la variable
            <code>duree</code>.</p>`,
          depart: `duree = 147\nprint(duree, "minutes, c'est", , "h et", , "min.")\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le nombre d'heures s'obtient avec la division entière //." },
              { motif: "%", message: "Le nombre de minutes restantes s'obtient avec le reste %." },
            ],
            codeAbsent: [
              { motif: "\\b27\\b", message: "Le 27 doit être calculé, pas écrit à la main." },
            ],
            sortie: "147 minutes, c'est 2 h et 27 min.",
          },
          felicitation: "// et % : deux outils que tu retrouveras en maths au chapitre 11. ⏱️",
          indices: [
            "Une heure fait 60 minutes : le nombre d'heures est <code>duree // 60</code>.",
            "Ce qui dépasse, c'est <code>duree % 60</code>.",
          ],
          solution: `duree = 147\nprint(duree, "minutes, c'est", duree // 60, "h et", duree % 60, "min.")\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Bien nommer ses variables",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <p>Un nom de variable doit être <strong>lisible</strong>. Compare :</p>
            <pre class="bloc-code"><code>x = 12
y = 7
print(2 * (x + y))</code></pre>
            <p>… avec :</p>
            <pre class="bloc-code"><code>longueur = 12
largeur = 7
print(2 * (longueur + largeur))</code></pre>
            <p>Le second se lit tout seul. C'est la seule différence, et elle est énorme.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les règles à respecter</span>
              <ul style="margin-bottom:0">
                <li>pas d'espace : <code>prix_ht</code> et non <code>prix ht</code> ;</li>
                <li>ne commence pas par un chiffre : <code>note1</code> et non <code>1note</code> ;</li>
                <li>Python distingue les majuscules : <code>Score</code> ≠ <code>score</code> ;</li>
                <li>par convention, tout en minuscules, mots séparés par <code>_</code>.</li>
              </ul>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le mémo de la séance</span>
              <code>nom = valeur</code> crée ou remplace · <code>score = score + 1</code>
              incrémente · <code>int</code> <code>float</code> <code>str</code> sont les
              trois types · <code>int("5")</code> convertit · <code>//</code> quotient et
              <code>%</code> reste.
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
          titre: "Ta fiche d'identité",
          contenu: `
            <p>Crée trois variables — <code>prenom</code>, <code>age</code> et
            <code>taille</code> (en mètres, donc un décimal) — puis affiche trois lignes
            en les utilisant. Par exemple :</p>
            <pre class="bloc-code"><code>Prénom : Ada
Âge : 15 ans
Taille : 1.62 m</code></pre>
            <p>Mets tes propres valeurs : seule la <strong>forme</strong> est vérifiée.</p>`,
          depart: `prenom = \nage = \ntaille = \n\n`,
          validation: {
            codeContient: [
              { motif: "prenom\\s*=\\s*[\"']", message: "prenom doit recevoir un texte, donc entre guillemets." },
              { motif: "age\\s*=\\s*\\d", message: "age doit recevoir un nombre entier." },
              { motif: "taille\\s*=\\s*\\d+\\.\\d", message: "taille doit recevoir un nombre à virgule, écrit avec un point : 1.62" },
              { motif: "print[^\\n]*\\bprenom\\b", message: "Un de tes print doit afficher la variable prenom." },
            ],
            sortieRegex: "^[^\\n]+\\n[^\\n]+\\n[^\\n]+",
            sortieRegexMessage: "Ton programme doit afficher trois lignes.",
          },
          indices: [
            "Un texte va entre guillemets, un nombre non.",
            "Puis trois <code>print</code> du type <code>print(\"Prénom :\", prenom)</code>.",
          ],
          solution: `prenom = "Ada"\nage = 15\ntaille = 1.62\n\nprint("Prénom :", prenom)\nprint("Âge :", age, "ans")\nprint("Taille :", taille, "m")\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Le prix TTC",
          contenu: `
            <p>Un article coûte <strong>250 €</strong> hors taxes. La TVA est de
            <strong>20 %</strong>. Complète le programme pour qu'il affiche :</p>
            <pre class="bloc-code"><code>Prix HT : 250 euros
TVA : 50.0 euros
Prix TTC : 300.0 euros</code></pre>
            <p>Les deux derniers nombres doivent être calculés.</p>
            <div class="encadre" data-ton="astuce">
              Le <code>.0</code> n'est pas une erreur : dès qu'on utilise <code>/</code>,
              Python passe en nombre décimal, même si le résultat tombe juste.
            </div>`,
          depart: `prix_ht = 250\ntva = \nprix_ttc = \n\nprint("Prix HT :", prix_ht, "euros")\nprint("TVA :", tva, "euros")\nprint("Prix TTC :", prix_ttc, "euros")\n`,
          validation: {
            codeAbsent: [
              { motif: "tva\\s*=\\s*50", message: "La TVA doit être calculée à partir du prix HT, pas écrite en dur." },
            ],
            sortie: "Prix HT : 250 euros\nTVA : 50.0 euros\nPrix TTC : 300.0 euros",
          },
          felicitation: "Un vrai calcul commercial, en trois variables. 💶",
          indices: [
            "20 % de 250, c'est <code>250 * 20 / 100</code>.",
            "Utilise la variable : <code>tva = prix_ht * 20 / 100</code>.",
            "Puis <code>prix_ttc = prix_ht + tva</code>.",
          ],
          solution: `prix_ht = 250\ntva = prix_ht * 20 / 100\nprix_ttc = prix_ht + tva\n\nprint("Prix HT :", prix_ht, "euros")\nprint("TVA :", tva, "euros")\nprint("Prix TTC :", prix_ttc, "euros")\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Rectangle paramétré",
          contenu: `
            <p>Reprends le rectangle de la séance 1, mais avec des <strong>variables</strong>.
            Avec <code>longueur = 12</code> et <code>largeur = 7</code>, ton programme doit
            afficher :</p>
            <pre class="bloc-code"><code>Périmètre : 38
Aire : 84</code></pre>
            <p>L'intérêt : si tu changes les deux premières lignes, tout le reste suit
            sans être retouché. Vérifie-le.</p>`,
          depart: `longueur = 12\nlargeur = 7\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b38\\b|\\b84\\b", message: "Les résultats doivent être calculés à partir des variables." },
            ],
            codeContient: [
              { motif: "longueur", message: "Utilise la variable longueur dans tes calculs." },
              { motif: "largeur", message: "Utilise la variable largeur dans tes calculs." },
            ],
            sortie: "Périmètre : 38\nAire : 84",
          },
          indices: [
            "<code>print(\"Périmètre :\", 2 * (longueur + largeur))</code>",
            "L'aire : <code>longueur * largeur</code>.",
          ],
          solution: `longueur = 12\nlargeur = 7\n\nprint("Périmètre :", 2 * (longueur + largeur))\nprint("Aire :", longueur * largeur)\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "La moyenne du trimestre",
          contenu: `
            <p>Trois notes sont déjà rangées dans des variables. Affiche exactement :</p>
            <pre class="bloc-code"><code>Notes : 12 15 9
Moyenne : 12.0</code></pre>
            <p>La moyenne doit être calculée, évidemment.</p>`,
          depart: `note1 = 12\nnote2 = 15\nnote3 = 9\n\n`,
          validation: {
            codeAbsent: [
              { motif: "12\\.0", message: "La moyenne doit être calculée à partir des trois notes." },
            ],
            sortie: "Notes : 12 15 9\nMoyenne : 12.0",
          },
          indices: [
            "La première ligne : <code>print(\"Notes :\", note1, note2, note3)</code>.",
            "La moyenne : la somme des trois, divisée par 3. Pense aux parenthèses !",
            "<code>(note1 + note2 + note3) / 3</code>",
          ],
          solution: `note1 = 12\nnote2 = 15\nnote3 = 9\n\nprint("Notes :", note1, note2, note3)\nprint("Moyenne :", (note1 + note2 + note3) / 3)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Échanger deux variables",
          contenu: `
            <p>Deux variables, <code>a</code> et <code>b</code>. Il faut
            <strong>échanger leurs valeurs</strong> pour afficher :</p>
            <pre class="bloc-code"><code>Avant : a = 3 et b = 8
Après : a = 8 et b = 3</code></pre>
            <p>Le piège est réel : si tu écris <code>a = b</code> puis <code>b = a</code>,
            les deux finissent à 8. Essaie, pour voir. Il te faut une
            <strong>troisième variable</strong> pour mettre une valeur de côté.</p>`,
          depart: `a = 3\nb = 8\nprint("Avant : a =", a, "et b =", b)\n\n# Échange ici\n\nprint("Après : a =", a, "et b =", b)\n`,
          validation: {
            codeAbsent: [
              { motif: "a\\s*=\\s*8", message: "Interdit d'écrire directement les nouvelles valeurs : il faut vraiment échanger." },
            ],
            sortie: "Avant : a = 3 et b = 8\nAprès : a = 8 et b = 3",
          },
          felicitation: "L'échange par variable temporaire : un classique de l'algorithmique. 🔄",
          indices: [
            "Range d'abord la valeur de <code>a</code> dans une variable <code>temporaire</code>.",
            "Puis <code>a = b</code>, et enfin <code>b = temporaire</code>.",
          ],
          solution: `a = 3\nb = 8\nprint("Avant : a =", a, "et b =", b)\n\ntemporaire = a\na = b\nb = temporaire\n\nprint("Après : a =", a, "et b =", b)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Chasse aux bugs, saison 2",
          contenu: `
            <p>Trois erreurs, toutes liées aux variables. Le programme doit afficher :</p>
            <pre class="bloc-code"><code>Le total est 30</code></pre>`,
          depart: `Prix = 10\nquantite = 3\ntotal = prix * quantité\nprint("Le total est" total)\n`,
          validation: { sortie: "Le total est 30" },
          felicitation: "NameError, accent et virgule oubliée : les trois classiques. 🐞",
          indices: [
            "Ligne 1 : <code>Prix</code> et <code>prix</code> sont deux variables différentes pour Python.",
            "Ligne 3 : le nom écrit n'est pas exactement celui de la ligne 2 — regarde l'accent.",
            "Ligne 4 : il manque une virgule entre le texte et la variable.",
          ],
          solution: `prix = 10\nquantite = 3\ntotal = prix * quantite\nprint("Le total est", total)\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Convertisseur de distances",
          contenu: `
            <p>Une distance est donnée en mètres. Affiche-la dans trois unités :</p>
            <pre class="bloc-code"><code>2500 m
2.5 km
250000 cm</code></pre>
            <p>Tout doit être calculé à partir de la variable <code>metres</code>.</p>`,
          depart: `metres = 2500\n\n`,
          validation: {
            codeAbsent: [
              { motif: "2\\.5\\b|250000", message: "Les conversions doivent être calculées à partir de metres." },
            ],
            sortie: "2500 m\n2.5 km\n250000 cm",
          },
          indices: [
            "Un kilomètre vaut 1000 mètres : il faut donc diviser.",
            "Un mètre vaut 100 centimètres : il faut multiplier.",
            "<code>print(metres / 1000, \"km\")</code>",
          ],
          solution: `metres = 2500\n\nprint(metres, "m")\nprint(metres / 1000, "km")\nprint(metres * 100, "cm")\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Le paquet de bonbons",
          contenu: `
            <p><strong>230 bonbons</strong> à répartir dans des sachets de
            <strong>12</strong>. Affiche exactement :</p>
            <pre class="bloc-code"><code>On peut remplir 19 sachets.
Il reste 2 bonbons.</code></pre>
            <p>Les deux nombres doivent être calculés à partir des deux variables.</p>`,
          depart: `bonbons = 230\nparsachet = 12\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le nombre de sachets pleins, c'est une division entière //." },
              { motif: "%", message: "Ce qui reste, c'est le reste %." },
            ],
            codeAbsent: [
              { motif: "\\b19\\b", message: "Le 19 doit être calculé, pas écrit à la main." },
            ],
            sortie: "On peut remplir 19 sachets.\nIl reste 2 bonbons.",
          },
          indices: [
            "<code>bonbons // parsachet</code> donne le nombre de sachets pleins.",
            "<code>bonbons % parsachet</code> donne ce qui ne rentre pas.",
          ],
          solution: `bonbons = 230\nparsachet = 12\n\nprint("On peut remplir", bonbons // parsachet, "sachets.")\nprint("Il reste", bonbons % parsachet, "bonbons.")\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Le ticket de caisse",
          contenu: `
            <p>Trois articles, avec leur quantité et leur prix unitaire en euros entiers.
            Affiche le ticket complet :</p>
            <pre class="bloc-code"><code>3 cahiers a 2 euros : 6
2 stylos a 1 euro : 2
1 classeur a 4 euros : 4
Total : 12 euros</code></pre>
            <p>Chaque sous-total et le total doivent être calculés à partir des variables.</p>`,
          depart: `nb_cahiers = 3\nprix_cahier = 2\nnb_stylos = 2\nprix_stylo = 1\nnb_classeurs = 1\nprix_classeur = 4\n\n`,
          validation: {
            codeAbsent: [
              { motif: ":\\s*\\d+\\s*\\)|Total\\s*:\\s*\"?\\s*,?\\s*12", message: "Les totaux doivent être calculés à partir des variables." },
              { motif: "\\b12\\b", message: "Le total doit être calculé, pas écrit à la main." },
            ],
            sortie: "3 cahiers a 2 euros : 6\n2 stylos a 1 euro : 2\n1 classeur a 4 euros : 4\nTotal : 12 euros",
          },
          felicitation: "Un vrai petit programme de caisse. Tu as bouclé les exercices. 🧾",
          indices: [
            "Une ligne : <code>print(nb_cahiers, \"cahiers a\", prix_cahier, \"euros :\", nb_cahiers * prix_cahier)</code>.",
            "Pour le total, additionne les trois produits — pense à une variable <code>total</code>.",
          ],
          solution: `nb_cahiers = 3\nprix_cahier = 2\nnb_stylos = 2\nprix_stylo = 1\nnb_classeurs = 1\nprix_classeur = 4\n\nprint(nb_cahiers, "cahiers a", prix_cahier, "euros :", nb_cahiers * prix_cahier)\nprint(nb_stylos, "stylos a", prix_stylo, "euro :", nb_stylos * prix_stylo)\nprint(nb_classeurs, "classeur a", prix_classeur, "euros :", nb_classeurs * prix_classeur)\n\ntotal = nb_cahiers * prix_cahier + nb_stylos * prix_stylo + nb_classeurs * prix_classeur\nprint("Total :", total, "euros")\n`,
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
          titre: "Combien de secondes as-tu vécues ?",
          contenu: `
            <p>En comptant des années de 365 jours, pour quelqu'un de
            <strong>15 ans</strong>, affiche exactement :</p>
            <pre class="bloc-code"><code>À 15 ans, tu as vécu environ 473040000 secondes.</code></pre>
            <p>Tout doit partir de la variable <code>age</code>.</p>`,
          depart: `age = 15\n\n`,
          validation: {
            codeAbsent: [
              { motif: "473040000", message: "Le nombre doit être calculé à partir de age." },
            ],
            codeContient: [
              { motif: "\\bage\\b[^\\n]*\\*|\\*[^\\n]*\\bage\\b", message: "Le calcul doit utiliser la variable age." },
            ],
            sortie: "À 15 ans, tu as vécu environ 473040000 secondes.",
          },
          felicitation: "Presque un demi-milliard. 🕰️",
          indices: [
            "Une année : 365 jours. Un jour : 24 heures. Une heure : 3600 secondes.",
            "<code>age * 365 * 24 * 60 * 60</code>",
          ],
          solution: `age = 15\n\nprint("À", age, "ans, tu as vécu environ", age * 365 * 24 * 60 * 60, "secondes.")\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "L'échange sans variable temporaire",
          contenu: `
            <p>Tu as échangé deux variables avec une troisième. Python sait le faire
            <strong>en une seule ligne</strong>, sans variable de côté.</p>
            <p>Cherche : la syntaxe s'écrit avec deux noms à gauche du <code>=</code>,
            séparés par une virgule, et deux valeurs à droite.</p>
            <p>Ton programme doit afficher :</p>
            <pre class="bloc-code"><code>a = 8 et b = 3</code></pre>
            <p>… et l'échange doit tenir en <strong>une seule ligne</strong>.</p>`,
          depart: `a = 3\nb = 8\n\n# Une seule ligne pour échanger\n\nprint("a =", a, "et b =", b)\n`,
          validation: {
            codeContient: [
              { motif: "a\\s*,\\s*b\\s*=\\s*b\\s*,\\s*a|b\\s*,\\s*a\\s*=\\s*a\\s*,\\s*b",
                message: "L'échange doit se faire en une ligne, de la forme a, b = b, a" },
            ],
            sortie: "a = 8 et b = 3",
          },
          felicitation: "L'affectation multiple : élégant, et propre à Python. ✨",
          indices: [
            "La forme est <code>a, b = …, …</code>",
            "<code>a, b = b, a</code> — Python évalue toute la droite avant d'affecter.",
          ],
          solution: `a = 3\nb = 8\n\na, b = b, a\n\nprint("a =", a, "et b =", b)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Décomposer une durée",
          contenu: `
            <p><strong>100 000 secondes</strong>. Combien de jours, d'heures, de minutes
            et de secondes ? Affiche exactement :</p>
            <pre class="bloc-code"><code>100000 s = 1 j 3 h 46 min 40 s</code></pre>
            <p>Le principe : à chaque étape, <code>//</code> donne l'unité et <code>%</code>
            donne ce qu'il reste à traiter.</p>`,
          depart: `total = 100000\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\b46\\b", message: "Les nombres doivent être calculés, pas écrits à la main." },
            ],
            sortie: "100000 s = 1 j 3 h 46 min 40 s",
          },
          felicitation: "Décomposition parfaite. C'est l'algorithme des horloges. ⏳",
          indices: [
            "Un jour fait 86400 secondes : <code>jours = total // 86400</code>, puis <code>reste = total % 86400</code>.",
            "Recommence sur <code>reste</code> avec 3600 pour les heures, puis avec 60 pour les minutes.",
            "À la fin, les secondes sont le dernier reste.",
          ],
          solution: `total = 100000\n\njours = total // 86400\nreste = total % 86400\nheures = reste // 3600\nreste = reste % 3600\nminutes = reste // 60\nsecondes = reste % 60\n\nprint(total, "s =", jours, "j", heures, "h", minutes, "min", secondes, "s")\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "La somme des chiffres",
          contenu: `
            <p>Le nombre <strong>4728</strong>. Affiche la somme de ses chiffres :</p>
            <pre class="bloc-code"><code>4 + 7 + 2 + 8 = 21</code></pre>
            <p>Interdit d'écrire les chiffres à la main : il faut les
            <strong>extraire</strong> du nombre avec <code>//</code> et <code>%</code>.</p>`,
          depart: `nombre = 4728\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Il faut la division entière // pour atteindre les chiffres de gauche." },
              { motif: "%", message: "Il faut le reste % pour isoler un chiffre." },
            ],
            codeAbsent: [
              { motif: "\\b21\\b", message: "La somme doit être calculée." },
              { motif: "=\\s*7\\b|,\\s*7\\s*[,)]", message: "Les chiffres doivent être extraits du nombre, pas retapés." },
            ],
            sortie: "4 + 7 + 2 + 8 = 21",
          },
          felicitation: "Extraire les chiffres d'un nombre : un grand classique. 🔢",
          indices: [
            "Le chiffre des unités : <code>nombre % 10</code>.",
            "Le chiffre des dizaines : <code>nombre // 10 % 10</code>. Celui des centaines : <code>nombre // 100 % 10</code>.",
            "Le chiffre des milliers : <code>nombre // 1000</code>.",
          ],
          solution: `nombre = 4728\n\nunites = nombre % 10\ndizaines = nombre // 10 % 10\ncentaines = nombre // 100 % 10\nmilliers = nombre // 1000\nsomme = milliers + centaines + dizaines + unites\n\nprint(milliers, "+", centaines, "+", dizaines, "+", unites, "=", somme)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le rendu de monnaie",
          contenu: `
            <p>Un client paie <strong>100 €</strong> pour un achat de <strong>63 €</strong>.
            La caisse doit rendre la monnaie avec le moins de coupures possible.
            Affiche exactement :</p>
            <pre class="bloc-code"><code>Monnaie a rendre : 37 euros
1 billet(s) de 20
1 billet(s) de 10
1 billet(s) de 5
1 piece(s) de 2
0 piece(s) de 1</code></pre>
            <p>Le principe : on prend le plus de billets de 20 possible, puis on
            recommence sur ce qui reste.</p>`,
          depart: `paye = 100\nachat = 63\n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "Le nombre de coupures d'une valeur, c'est une division entière." },
              { motif: "%", message: "Ce qui reste après avoir donné les coupures, c'est un reste." },
            ],
            codeAbsent: [
              { motif: "\\b37\\b", message: "La monnaie doit être calculée : payé moins achat." },
            ],
            sortie: "Monnaie a rendre : 37 euros\n1 billet(s) de 20\n1 billet(s) de 10\n1 billet(s) de 5\n1 piece(s) de 2\n0 piece(s) de 1",
          },
          felicitation: "Un algorithme glouton, le premier de ta scolarité. 💰",
          indices: [
            "<code>reste = paye - achat</code> donne 37.",
            "<code>reste // 20</code> donne le nombre de billets de 20, puis <code>reste = reste % 20</code>.",
            "Recommence la même paire de lignes avec 10, puis 5, puis 2, puis 1.",
          ],
          solution: `paye = 100\nachat = 63\n\nreste = paye - achat\nprint("Monnaie a rendre :", reste, "euros")\n\nprint(reste // 20, "billet(s) de 20")\nreste = reste % 20\nprint(reste // 10, "billet(s) de 10")\nreste = reste % 10\nprint(reste // 5, "billet(s) de 5")\nreste = reste % 5\nprint(reste // 2, "piece(s) de 2")\nreste = reste % 2\nprint(reste // 1, "piece(s) de 1")\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ton convertisseur à toi",
          contenu: `
            <p>Défi libre. Écris un convertisseur avec <strong>au moins trois variables</strong>
            et <strong>au moins quatre lignes affichées</strong> : euros vers dollars,
            degrés Celsius vers Fahrenheit, kilomètres vers miles, octets vers gigaoctets…</p>
            <p>Une seule règle : les valeurs converties doivent être
            <strong>calculées à partir des variables</strong>, jamais recopiées.</p>`,
          depart: `# Exemple de départ, à remplacer par ton idée\ncelsius = 25\n\n`,
          validation: {
            codeContient: [
              { motif: "^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=", options: "m",
                message: "Ton programme doit créer au moins trois variables." },
              { motif: "=[^\\n=]*[-+*/]", message: "Au moins une de tes variables doit être obtenue par un calcul." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n",
            sortieRegexMessage: "Ton programme doit afficher au moins quatre lignes.",
          },
          felicitation: "Séance 2 terminée. Tes programmes ont maintenant de la mémoire. 🏁",
          indices: [
            "Celsius vers Fahrenheit : <code>fahrenheit = celsius * 9 / 5 + 32</code>.",
            "Pense à afficher la valeur de départ, la valeur d'arrivée, et une phrase d'explication.",
          ],
          solution: `celsius = 25\nfahrenheit = celsius * 9 / 5 + 32\nkelvin = celsius + 273.15\n\nprint("Convertisseur de temperatures")\nprint(celsius, "degres Celsius, c'est :")\nprint(fahrenheit, "degres Fahrenheit")\nprint(kelvin, "kelvins")\n`,
        },
      ],
    },
  ],
};

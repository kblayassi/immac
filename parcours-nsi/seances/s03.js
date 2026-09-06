/* NSI — chapitre 1, séance 3 : afficher, concaténer, formater.
 * Reprend la section « Affichage et concaténation » du cours (print, +, str(),
 * f-strings) et les exercices 7 (question 2) et 8.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "Afficher : concaténation et f-strings",
  sousTitre: "Assembler du texte et des valeurs",
  palier: "Partie 1 — Manipuler des données",

  accroche: `Un programme qui calcule juste mais affiche mal ne sert à personne.
    Trois écritures permettent de mélanger texte et variables — la troisième est
    celle que tu utiliseras tout le reste de l'année.`,

  objectifs: [
    "afficher plusieurs valeurs avec <code>print()</code> et des virgules",
    "assembler des chaînes avec l'opérateur <code>+</code>",
    "savoir quand <code>str()</code> devient obligatoire",
    "écrire une <strong>f-string</strong>",
  ],

  motDeLaFin: `Tes programmes savent parler. À la séance 4, ils vont apprendre à
    comparer — première étape vers les décisions.`,

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
          titre: "La fonction print()",
          contenu: `
            <p><code>print()</code> affiche dans la console la ou les valeurs qu'on lui
            passe en <strong>arguments</strong>, séparés par des virgules :</p>

            <pre class="bloc-code"><code>print("Bonjour")
# Bonjour

age = 16
print("Tu as", age, "ans.")
# Tu as 16 ans.</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La virgule met l'espace toute seule</span>
              Entre deux arguments, <code>print</code> insère automatiquement
              <strong>une espace</strong>. C'est pratique — et c'est aussi une source
              d'erreurs quand on l'oublie.
            </div>

            <p>Chaque appel à <code>print</code> termine par un passage à la ligne : deux
            appels successifs affichent deux lignes.</p>`,
        },

        {
          id: "d2",
          type: "prediction",
          titre: "Compter les espaces",
          contenu: `<p>Deux écritures très proches. Regarde bien les espaces
            <em>à l'intérieur</em> des guillemets.</p>`,
          code: `age = 16\n\nprint("Tu as", age, "ans.")\nprint("Tu as ", age, " ans.")`,
          question: "Qu'affichent ces deux lignes ?",
          options: [
            { texte: "exactement la même chose",
              explication: "Non : la seconde ajoute des espaces qui viennent s'ajouter à celles de print." },
            { texte: "<code>Tu as 16 ans.</code> puis <code>Tu as  16  ans.</code>", correct: true,
              explication: "Oui : sur la seconde ligne, l'espace du texte <em>et</em> celle ajoutée par la virgule se cumulent — d'où les doubles espaces." },
            { texte: "<code>Tu as16ans.</code> puis <code>Tu as 16 ans.</code>",
              explication: "La virgule de <code>print</code> insère toujours une espace : la première ligne est déjà correcte." },
            { texte: "une erreur sur la seconde ligne",
              explication: "Les deux lignes sont valides ; elles n'affichent simplement pas la même chose." },
          ],
          apres: `<span class="chapo">À retenir</span>
            Quand on sépare les arguments par des virgules, on n'ajoute
            <strong>pas</strong> d'espace dans les textes. Quand on assemble avec
            <code>+</code>, en revanche, il faut les mettre soi-même — c'est la suite.`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Coller des chaînes : la concaténation",
          contenu: `
            <p>L'opérateur <code>+</code> a deux métiers. Entre deux nombres, il additionne.
            Entre deux <strong>chaînes</strong>, il les colle bout à bout : c'est la
            <strong>concaténation</strong>.</p>

            <pre class="bloc-code"><code>"Bonjour " + "Marie"    # "Bonjour Marie"</code></pre>

            <p>Cela fonctionne aussi avec des variables :</p>

            <pre class="bloc-code"><code>debut = "Tu as "
age = 16
fin = " ans."

phrase = debut + str(age) + fin
print(phrase)</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi ce <code>str(age)</code> ?</span>
              Parce que <code>age</code> est un <strong>nombre</strong>, et que Python
              refuse de coller un nombre à du texte. Sans la conversion, on obtient une
              <code>TypeError</code>.
            </div>

            <p>Autre différence avec la virgule : la concaténation <strong>n'ajoute aucune
            espace</strong>. Il faut les écrire soi-même, à l'intérieur des guillemets.</p>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Coller un nombre à du texte",
          contenu: `<p>Ce programme paraît anodin.</p>`,
          code: `age = 16\n\nprint("Tu as " + age + " ans.")`,
          question: "Que se passe-t-il ?",
          options: [
            { texte: "il affiche <code>Tu as 16 ans.</code>",
              explication: "Ce serait le cas avec des virgules, ou avec une conversion. Ici, ni l'un ni l'autre." },
            { texte: "il affiche <code>Tu as 16 ans.</code> sans les espaces",
              explication: "Les espaces sont bien dans les textes ; le problème est ailleurs." },
            { texte: "il s'arrête sur une <code>TypeError</code>", correct: true,
              explication: "Oui : <code>+</code> ne sait pas coller une chaîne et un entier. Il faut écrire <code>str(age)</code>." },
            { texte: "il affiche <code>Tu as  ans.</code>",
              explication: "Python ne saute pas silencieusement une valeur qu'il ne sait pas traiter : il s'arrête." },
          ],
          apres: `<span class="chapo">Le message d'erreur exact</span>
            <code>TypeError: can only concatenate str (not "int") to str</code> — « je ne
            peux coller à une chaîne qu'une autre chaîne ». Quand tu le vois, cherche un
            <code>str()</code> manquant.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Concaténer proprement",
          contenu: `
            <p>À partir des trois variables données, construis la phrase dans une variable
            <code>phrase</code> — <strong>par concaténation</strong>, pas avec des virgules —
            puis affiche-la :</p>
            <pre class="bloc-code"><code>Tu as 16 ans.</code></pre>`,
          depart: `debut = "Tu as "\nage = 16\nfin = " ans."\n\nphrase = \n`,
          validation: {
            codeContient: [
              { motif: "str\\s*\\(", message: "L'âge est un nombre : il faut le convertir avant de le coller." },
              { motif: "phrase\\s*=[^\\n]*\\+", message: "phrase doit être construite par concaténation." },
              { motif: "\\bdebut\\b[\\s\\S]*\\bdebut\\b", message: "Sers-toi des variables déjà définies." },
            ],
            codeAbsent: [
              { motif: "print[^\\n]*,[^\\n]*,", message: "Ici, on assemble avec + et non avec des virgules." },
            ],
            sortie: "Tu as 16 ans.",
          },
          felicitation: "Trois morceaux, un seul texte. 🔗",
          indices: [
            "Les espaces sont déjà dans <code>debut</code> et <code>fin</code> : ne les redouble pas.",
            "Seul l'âge a besoin d'être converti.",
          ],
        },

        {
          id: "d6",
          type: "cours",
          titre: "Les f-strings",
          contenu: `
            <p>Concaténer devient vite illisible dès qu'il y a plusieurs variables. Python
            propose beaucoup mieux : la <strong>f-string</strong>.</p>

            <pre class="bloc-code"><code>nom = "Luc"
age = 16

print(f"{nom} a {age} ans.")</code></pre>

            <p>Trois choses à repérer :</p>
            <ol>
              <li>la chaîne commence par un <code>f</code>, juste avant le guillemet ;</li>
              <li>il n'y a <strong>qu'un seul bloc de guillemets</strong>, tout est écrit
                dedans ;</li>
              <li>les variables sont placées entre <strong>accolades</strong>.</li>
            </ol>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Trois avantages</span>
              Plus <strong>lisible</strong> — on voit la phrase finale d'un coup d'œil.
              Plus <strong>rapide</strong> à écrire. Et surtout : <strong>aucune conversion
              nécessaire</strong>, la f-string s'en charge. Le <code>str()</code> disparaît.
            </div>

            <p>On peut même mettre un calcul entre les accolades :
            <code>f"L'an prochain tu auras {age + 1} ans."</code></p>`,
        },

        {
          id: "d7",
          type: "code",
          titre: "La même phrase, en f-string",
          contenu: `
            <p>Réécris l'affichage de l'étape précédente avec une <strong>f-string</strong>,
            en un seul <code>print</code>. Cette fois, les variables sont brutes : à toi
            d'écrire les espaces au bon endroit.</p>
            <pre class="bloc-code"><code>Luc a 16 ans et sera majeur dans 2 ans.</code></pre>`,
          depart: `nom = "Luc"\nage = 16\n\n`,
          validation: {
            codeContient: [
              { motif: "f\"|f'", message: "Utilise une f-string : un f juste avant le guillemet ouvrant." },
              { motif: "\\{\\s*nom\\s*\\}", message: "Le prénom doit venir de la variable, entre accolades." },
              { motif: "\\{[^}]*age[^}]*\\}", message: "L'âge doit venir de la variable, entre accolades." },
            ],
            codeAbsent: [
              { motif: "str\\s*\\(", message: "Une f-string n'a pas besoin de str() : c'est tout son intérêt." },
              { motif: "dans 2 ans", message: "Le nombre d'années restantes doit être calculé, pas écrit dans la phrase." },
            ],
            sortie: "Luc a 16 ans et sera majeur dans 2 ans.",
          },
          felicitation: "Une seule chaîne, deux variables, un calcul. C'est l'écriture des pros. ✨",
          indices: [
            "La forme est <code>print(f\"…\")</code>, avec toute la phrase entre les guillemets.",
            "Les accolades peuvent contenir un calcul : le nombre d'années restantes s'obtient à partir de 18 et de l'âge.",
          ],
        },

        {
          id: "d8",
          type: "code",
          titre: "Exercice 7 — La phrase de présentation",
          contenu: `
            <p>Demande son prénom puis son âge à l'utilisateur, et affiche la phrase
            <em>« Bonjour, je m'appelle ___ et j'ai ___ ans. »</em> avec <strong>un
            seul</strong> appel à <code>print()</code>.</p>
            <p>Exemple avec <code>Ali</code> et <code>17</code> :</p>
            <pre class="bloc-code"><code>Comment t'appelles-tu ? Ali
Quel âge as-tu ? 17
Bonjour, je m'appelle Ali et j'ai 17 ans.</code></pre>`,
          depart: `prenom = \nage = \n\n`,
          saisiesTest: ["Ali", "17"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Il faut deux saisies." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print est autorisé." },
            ],
            sortieRegex: "Bonjour, je m'appelle \\S+ et j'ai \\S+ ans\\.",
            sortieRegexMessage: "La phrase finale doit avoir exactement la forme demandée.",
          },
          felicitation: "Deux saisies, une phrase, un seul print. 💬",
          indices: [
            "Ici, l'âge n'a pas besoin d'être converti : on ne fait aucun calcul avec.",
            "Une f-string règle la question en une ligne — mais les virgules fonctionnent aussi.",
          ],
        },

        {
          id: "d9",
          type: "code",
          titre: "Exercice 8 — Le cercle",
          contenu: `
            <p>Demande à l'utilisateur le <strong>rayon</strong> d'un cercle, puis affiche sa
            circonférence et son aire avec un seul appel à <code>print()</code>.</p>
            <p>Rappels : <em>C</em> = 2π<em>r</em> et <em>A</em> = π<em>r</em>².
            La première ligne importe la constante <code>pi</code>.</p>
            <p>Exemple avec un rayon de 3 :</p>
            <pre class="bloc-code"><code>Rayon du cercle : 3
Circonférence : 18.84955592153876 - Aire : 28.274333882308138</code></pre>`,
          depart: `from math import pi\n\nrayon = \n`,
          saisiesTest: ["3"],
          validation: {
            codeContient: [
              { motif: "float\\s*\\(\\s*input", message: "Le rayon peut être décimal : convertis avec float()." },
              { motif: "\\bpi\\b", message: "Utilise la constante pi importée, pas une valeur approchée écrite à la main." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print est autorisé." },
            ],
            sortie: "Rayon du cercle : 3\nCirconférence : 18.84955592153876 - Aire : 28.274333882308138",
          },
          felicitation: "Deux formules, un seul affichage. 🔵",
          indices: [
            "Le rayon se demande et se convertit sur la même ligne.",
            "Le carré du rayon s'écrit <code>rayon ** 2</code>.",
            "Un seul <code>print</code> peut contenir plusieurs textes et plusieurs calculs, séparés par des virgules.",
          ],
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Écriture</th><th>Exemple</th><th>Espaces</th><th>Conversion</th></tr>
              <tr><td>virgules</td><td><code>print("Tu as", age, "ans")</code></td><td>automatiques</td><td>inutile</td></tr>
              <tr><td>concaténation</td><td><code>print("Tu as " + str(age))</code></td><td>à écrire</td><td><strong>obligatoire</strong></td></tr>
              <tr><td>f-string</td><td><code>print(f"Tu as {age} ans")</code></td><td>à écrire</td><td>inutile</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Laquelle choisir ?</span>
              La <strong>f-string</strong>, presque toujours : c'est la plus lisible, et la
              seule qui permette de voir la phrase finale d'un seul coup d'œil. Les virgules
              restent pratiques pour un affichage rapide de débogage.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège de la concaténation</span>
              <code>+</code> entre une chaîne et un nombre lève une <code>TypeError</code>.
              Soit tu convertis avec <code>str()</code>, soit tu passes à la f-string.
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
          titre: "La fiche d'identité",
          contenu: `
            <p>À partir des trois variables, affiche exactement ces trois lignes,
            <strong>uniquement avec des f-strings</strong> :</p>
            <pre class="bloc-code"><code>Prénom : Ada
Âge : 17 ans
Dans 5 ans, elle aura 22 ans.</code></pre>`,
          depart: `prenom = "Ada"\nage = 17\n\n`,
          validation: {
            codeContient: [
              { motif: "f\"|f'", message: "Utilise des f-strings." },
              { motif: "\\bprenom\\b[\\s\\S]*\\bprenom\\b", message: "Sers-toi des variables déjà définies." },
            ],
            codeAbsent: [
              { motif: "\\b22\\b", message: "L'âge futur doit être calculé dans la f-string." },
            ],
            sortie: "Prénom : Ada\nÂge : 17 ans\nDans 5 ans, elle aura 22 ans.",
          },
          indices: [
            "Trois <code>print</code>, chacun avec une f-string.",
            "La troisième contient un calcul entre accolades.",
          ],
        },

        {
          id: "a2",
          type: "code",
          titre: "De la virgule à la f-string",
          contenu: `
            <p>Ce programme fonctionne, mais il est écrit avec des virgules. Réécris les
            trois affichages <strong>en f-strings</strong>, sans changer une seule
            espace du résultat.</p>
            <pre class="bloc-code"><code>Article : Cahier
Prix unitaire : 2 euros
3 cahiers coûtent 6 euros</code></pre>`,
          depart: `article = "Cahier"\nprix = 2\nquantite = 3\n\nprint("Article :", article)\nprint("Prix unitaire :", prix, "euros")\nprint(quantite, "cahiers coûtent", quantite * prix, "euros")\n`,
          validation: {
            codeContient: [
              { motif: "f\"|f'", message: "Utilise des f-strings." },
            ],
            codeAbsent: [
              { motif: "print\\s*\\([^)]*,", message: "Plus aucune virgule dans les print : tout doit tenir dans la f-string." },
              { motif: "\\b6\\b", message: "Le total doit rester un calcul." },
            ],
            sortie: "Article : Cahier\nPrix unitaire : 2 euros\n3 cahiers coûtent 6 euros",
          },
          felicitation: "Même résultat, code plus lisible. C'est ça, refactoriser. ♻️",
          indices: [
            "Chaque virgule disparaît : ce qui l'entourait se retrouve dans une seule chaîne.",
            "Attention aux espaces : la virgule en mettait une, il faut maintenant l'écrire.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Trois concaténations cassées",
          contenu: `
            <p>Ce programme lève une erreur. Répare-le <strong>sans utiliser de f-string</strong> :
            il doit rester écrit avec des <code>+</code>.</p>
            <pre class="bloc-code"><code>Le film Matrix est sorti en 1999.
Il a donc 27 ans.</code></pre>`,
          depart: `titre = "Matrix"\nannee = 1999\n\nprint("Le film " + titre + " est sorti en " + annee + ".")\nprint("Il a donc " + 2026 - annee + " ans.")\n`,
          validation: {
            codeContient: [
              { motif: "str\\s*\\(", message: "Les nombres doivent être convertis avant d'être collés." },
              { motif: "\\+", message: "Garde la concaténation." },
            ],
            codeAbsent: [
              { motif: "f\"|f'", message: "Pas de f-string dans cet exercice : on travaille la concaténation." },
              { motif: "\\b27\\b", message: "L'âge du film doit rester un calcul." },
            ],
            sortie: "Le film Matrix est sorti en 1999.\nIl a donc 27 ans.",
          },
          felicitation: "Deux str() bien placés, et tout rentre dans l'ordre. 🔧",
          indices: [
            "La première erreur : <code>annee</code> est un entier collé à du texte.",
            "La seconde est plus subtile : c'est le <strong>résultat du calcul</strong> qu'il faut convertir, donc les parenthèses comptent.",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "Le ticket de caisse",
          contenu: `
            <p>Trois articles, avec quantité et prix unitaire. Affiche le ticket complet
            en f-strings :</p>
            <pre class="bloc-code"><code>3 x Cahier a 2 euros = 6 euros
5 x Stylo a 1 euro = 5 euros
1 x Classeur a 4 euros = 4 euros
Total : 15 euros</code></pre>
            <p>Chaque sous-total et le total doivent être calculés.</p>`,
          depart: `nb_cahiers = 3\nprix_cahier = 2\nnb_stylos = 5\nprix_stylo = 1\nnb_classeurs = 1\nprix_classeur = 4\n\ntotal_cahiers = 0\ntotal_stylos = 0\ntotal_classeurs = 0\ntotal = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "total_cahiers\\s*=[^\\n]*nb_cahiers", message: "total_cahiers doit être calculé à partir des variables." },
              { motif: "total\\s*=[^\\n]*total_cahiers", message: "Le total additionne les trois sous-totaux." },
              { motif: "f\"|f'", message: "Utilise des f-strings." },
            ],
            codeAbsent: [
              { motif: "\\b15\\b", message: "Le total doit être calculé." },
            ],
            sortie: "3 x Cahier a 2 euros = 6 euros\n5 x Stylo a 1 euro = 5 euros\n1 x Classeur a 4 euros = 4 euros\nTotal : 15 euros",
          },
          felicitation: "Calculs d'abord, affichage ensuite : la bonne façon de faire. 🧾",
          indices: [
            "Remplis d'abord les quatre variables de totaux, puis écris les quatre affichages.",
            "Une ligne type : <code>print(f\"{nb_cahiers} x Cahier a {prix_cahier} euros = {total_cahiers} euros\")</code>.",
          ],
        },

        {
          id: "a5",
          type: "code",
          titre: "Le bulletin météo",
          contenu: `
            <p>Demande une ville et une température, puis affiche un bulletin de deux
            lignes. Exemple avec <code>Rodez</code> et <code>18</code> :</p>
            <pre class="bloc-code"><code>Ville ? Rodez
Température ? 18
Bulletin météo pour Rodez
Il fait 18 °C, soit 64.4 °F</code></pre>
            <p>La conversion : <em>F</em> = <em>C</em> × 9 / 5 + 32.</p>`,
          depart: `\n`,
          saisiesTest: ["Rodez", "18"],
          validation: {
            codeContient: [
              { motif: "input[\\s\\S]*input", message: "Il faut deux saisies." },
              { motif: "float\\s*\\(|int\\s*\\(", message: "La température doit être convertie en nombre pour être calculée." },
              { motif: "f\"|f'", message: "Utilise des f-strings." },
            ],
            codeAbsent: [
              { motif: "64\\.4", message: "La conversion doit être calculée." },
            ],
            sortieRegex: "Bulletin météo pour \\S+\\nIl fait \\S+ °C, soit \\S+ °F",
            sortieRegexMessage: "Le bulletin doit avoir exactement la forme demandée.",
          },
          indices: [
            "La ville n'a pas besoin de conversion ; la température, si.",
            "Le calcul peut se faire directement entre les accolades de la f-string.",
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
          titre: "Le cadre décoratif",
          contenu: `
            <p>Souviens-toi de l'exercice 5 : multiplier une chaîne par un entier la répète.
            Sers-t'en pour encadrer un titre :</p>
            <pre class="bloc-code sans-copie"><code>******************
*     PYTHON     *
******************</code></pre>
            <p>Le cadre fait <strong>18 caractères</strong> de large. Interdit de taper les
            étoiles une par une.</p>`,
          depart: `titre = "PYTHON"\nlargeur = 18\n\n`,
          validation: {
            codeAbsent: [
              { motif: "\\*{4,}", message: "Ne tape pas les étoiles à la main : fais-les répéter." },
            ],
            codeContient: [
              { motif: "\\blargeur\\b[\\s\\S]*\\blargeur\\b", message: "Sers-toi de la variable largeur." },
            ],
            sortie: "******************\n*     PYTHON     *\n******************",
          },
          felicitation: "Un cadre qui s'adapte à la largeur. 🖼️",
          indices: [
            "La ligne du haut et celle du bas sont identiques : une étoile répétée <code>largeur</code> fois.",
            "La ligne du milieu vaut une étoile, cinq espaces, le titre, cinq espaces, une étoile.",
            "Les espaces aussi se répètent : <code>\" \" * 5</code>.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Trois écritures, une seule phrase",
          contenu: `
            <p>Affiche <strong>trois fois exactement la même phrase</strong>, mais avec les
            trois écritures de la séance : les virgules, la concaténation, puis la f-string.</p>
            <pre class="bloc-code sans-copie"><code>Ada a 17 ans.
Ada a 17 ans.
Ada a 17 ans.</code></pre>`,
          depart: `prenom = "Ada"\nage = 17\n\n# 1. avec des virgules\n\n\n# 2. avec des +\n\n\n# 3. avec une f-string\n\n`,
          validation: {
            codeContient: [
              { motif: "print\\s*\\([^)]*,[^)]*,", message: "Le premier affichage doit utiliser des virgules." },
              { motif: "str\\s*\\(", message: "Le deuxième doit concaténer, donc convertir l'âge." },
              { motif: "f\"|f'", message: "Le troisième doit être une f-string." },
            ],
            sortie: "Ada a 17 ans.\nAda a 17 ans.\nAda a 17 ans.",
          },
          felicitation: "Même sortie, trois chemins. Tu maîtrises les trois. 🎯",
          indices: [
            "Avec les virgules, attention : elles ajoutent une espace, donc le point final doit être collé au mot « ans ».",
            "Avec la concaténation, ce sont les espaces qu'il faut écrire à la main.",
            "La f-string est la plus courte des trois — compare leur longueur, c'est instructif.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Ta fiche de personnage",
          contenu: `
            <p>Défi libre. Écris la fiche d'un personnage — de jeu vidéo, de roman, de film —
            avec <strong>au moins quatre variables</strong> et <strong>au moins quatre lignes
            affichées en f-strings</strong>, dont une contenant un <strong>calcul</strong>.</p>
            <p>Des idées : points de vie et pourcentage restant, année de naissance et âge,
            prix et prix soldé, distance parcourue et vitesse moyenne…</p>`,
          depart: `# Ta fiche de personnage\n`,
          validation: {
            codeContient: [
              { motif: "^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=[\\s\\S]*^\\s*\\w+\\s*=", options: "m",
                message: "Ton programme doit créer au moins quatre variables." },
              { motif: "f\"|f'", message: "Les affichages doivent utiliser des f-strings." },
              { motif: "\\{[^}]*[-+*/][^}]*\\}", message: "Une des f-strings doit contenir un calcul entre accolades." },
            ],
            sortieRegex: "^[^\\n]*\\n[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Ton programme doit afficher au moins quatre lignes.",
          },
          felicitation: "Séance 3 terminée. Tes programmes s'expriment clairement. 🏁",
          indices: [
            "Un calcul entre accolades : <code>f\"Il lui reste {pv * 100 / pv_max} % de vie\"</code>.",
            "Pense à une ligne de séparation pour encadrer ta fiche.",
          ],
        },
      ],
    },
  ],
};

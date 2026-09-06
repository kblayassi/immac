/* Séance 7 — Écrire une fonction.
 * Fiche T8. Prérequis : séances 1 à 6.
 * Le point dur de l'année : la différence entre return et print. Elle est
 * installée par une prédiction, puis travaillée dans presque tous les exercices.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "Écrire une fonction",
  sousTitre: "Ranger du code dans une boîte réutilisable",
  palier: "Partie 3 — Fonctions et aléatoire",

  accroche: `En Scratch, tu pouvais « créer un bloc » et le réutiliser partout.
    En Python, ça s'appelle une <strong>fonction</strong>, et c'est l'outil qui permet
    d'écrire des programmes de plus de vingt lignes sans se perdre.`,

  objectifs: [
    "définir une fonction avec <code>def</code> et l'appeler",
    "lui passer une information par un <strong>paramètre</strong>",
    "comprendre la différence entre <code>return</code> et <code>print</code>",
    "réutiliser le résultat d'une fonction dans un calcul",
  ],

  motDeLaFin: `Tu sais fabriquer tes propres outils. À la séance 8, tes fonctions
    prendront plusieurs arguments — et serviront directement en cours de maths.`,

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
          titre: "Créer son propre bloc",
          contenu: `
            <p>Tu connais déjà des fonctions : <code>print</code>, <code>input</code>,
            <code>int</code>, <code>range</code>. Quelqu'un les a écrites pour toi. Il est
            temps d'écrire les tiennes.</p>

            <pre class="bloc-code"><code>def saluer():
    print("Bonjour !")

saluer()
saluer()</code></pre>

            <p>Ce programme affiche deux fois <code>Bonjour !</code>. Il y a deux moments
            bien distincts :</p>

            <ul>
              <li><strong>la définition</strong> — les lignes avec <code>def</code>.
                Elles n'exécutent rien : elles apprennent à Python ce que veut dire
                « saluer » ;</li>
              <li><strong>l'appel</strong> — <code>saluer()</code>. C'est là que le corps
                de la fonction s'exécute vraiment.</li>
            </ul>

            <p>Tu retrouves la mécanique connue : <code>def</code>, un nom, des parenthèses,
            les <strong>deux-points</strong>, et un <strong>corps décalé</strong>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les parenthèses ne sont pas facultatives</span>
              <code>saluer</code> tout seul désigne la fonction ; <code>saluer()</code>
              l'<em>exécute</em>. Oublier les parenthèses est une erreur silencieuse : rien
              ne se passe, et Python ne proteste pas.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Ta première fonction",
          contenu: `
            <p>Définis une fonction <code>saluer</code> qui affiche <code>Bonjour !</code>,
            puis appelle-la <strong>trois fois</strong>. Sortie attendue :</p>
            <pre class="bloc-code"><code>Bonjour !
Bonjour !
Bonjour !</code></pre>`,
          depart: `def saluer():\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+saluer\\s*\\(\\s*\\)\\s*:", message: "Définis une fonction nommée saluer, sans paramètre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print, dans la fonction : ce sont les appels qui répètent." },
            ],
            sortie: "Bonjour !\nBonjour !\nBonjour !",
          },
          felicitation: "Ta première fonction, définie et appelée. 📦",
          indices: [
            "Dans le corps de la fonction : <code>print(\"Bonjour !\")</code>, décalé de quatre espaces.",
            "Puis, <strong>sans décalage</strong>, trois lignes <code>saluer()</code>.",
          ],
        },

        {
          id: "d3",
          type: "code",
          titre: "Donner une information à la fonction",
          contenu: `
            <p>Une fonction qui dit toujours la même chose a peu d'intérêt. On lui passe
            une information : c'est le <strong>paramètre</strong>, écrit entre les
            parenthèses de la définition.</p>
            <pre class="bloc-code"><code>def saluer(prenom):
    print("Bonjour", prenom, "!")

saluer("Ada")</code></pre>
            <p><strong>À toi.</strong> Écris cette fonction et appelle-la avec
            <code>"Ada"</code> puis <code>"Alan"</code> :</p>
            <pre class="bloc-code"><code>Bonjour Ada !
Bonjour Alan !</code></pre>`,
          depart: `\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+saluer\\s*\\(\\s*\\w+\\s*\\)", message: "La fonction saluer doit avoir un paramètre." },
            ],
            codeAbsent: [
              { motif: "print[\\s\\S]*print", message: "Un seul print, dans la fonction." },
            ],
            sortie: "Bonjour Ada !\nBonjour Alan !",
          },
          felicitation: "Un paramètre, et la fonction devient utile. 🎁",
          indices: [
            "Le paramètre est un nom de variable, choisi par toi : il n'existe qu'à l'intérieur de la fonction.",
            "Les appels : <code>saluer(\"Ada\")</code> puis <code>saluer(\"Alan\")</code>.",
          ],
        },

        {
          id: "d4",
          type: "cours",
          titre: "Le point le plus important de l'année",
          contenu: `
            <p>Jusqu'ici, tes fonctions <strong>affichent</strong>. Mais afficher, ce n'est
            pas <em>donner un résultat</em>. Compare :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th><code>print</code></th><th><code>return</code></th></tr>
              <tr><td>Qui en profite ?</td><td>l'humain qui regarde l'écran</td><td>le <strong>programme</strong></td></tr>
              <tr><td>Peut-on réutiliser ?</td><td>non, c'est perdu</td><td>oui, on peut le ranger dans une variable</td></tr>
              <tr><td>Effet sur la fonction</td><td>aucun, elle continue</td><td>elle <strong>s'arrête aussitôt</strong></td></tr>
            </table>
            </div>

            <pre class="bloc-code"><code>def double_affiche(n):
    print(n * 2)          # montre le résultat

def double_renvoie(n):
    return n * 2          # DONNE le résultat

x = double_renvoie(5)     # x vaut 10
print(x + 1)              # 11

y = double_affiche(5)     # affiche 10, mais y ne vaut rien
print(y + 1)              # ERREUR</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle de décision</span>
              Une fonction qui <strong>calcule quelque chose</strong> doit
              <code>return</code>. Une fonction dont le travail <em>est</em> d'écrire à
              l'écran peut se contenter de <code>print</code>. Dans le doute :
              <code>return</code>, et on affiche à l'extérieur.
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Sans return, que vaut le résultat ?",
          contenu: `<p>Regarde bien : la fonction affiche, mais ne renvoie rien.</p>`,
          code: `def double(n):\n    print(n * 2)\n\nresultat = double(5)\nprint(resultat)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>10</code> puis <code>10</code>",
              explication: "Le premier 10 vient du print de la fonction. Mais <code>resultat</code> n'a rien reçu." },
            { texte: "<code>10</code> puis <code>None</code>", correct: true,
              explication: "Oui. Une fonction sans <code>return</code> renvoie <code>None</code>, le « rien » de Python." },
            { texte: "<code>10</code> seulement",
              explication: "Non : le second <code>print</code> s'exécute aussi, et affiche ce que contient <code>resultat</code>." },
            { texte: "Une erreur",
              explication: "Non, le programme tourne — c'est bien ce qui le rend piégeux." },
          ],
          apres: `<span class="chapo">None, le signe qui ne trompe pas</span>
            Si tu vois <code>None</code> s'afficher, ou une <code>TypeError</code> parlant de
            <code>NoneType</code>, cherche une fonction où tu as écrit <code>print</code>
            au lieu de <code>return</code>. C'est presque toujours ça.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Une fonction qui renvoie",
          contenu: `
            <p>Écris une fonction <code>double</code> qui <strong>renvoie</strong> le double
            de son paramètre — sans rien afficher.</p>
            <p>Il n'y a rien à voir dans la console : c'est le bouton
            <strong>✓ Valider</strong> qui va tester ta fonction avec plusieurs valeurs.</p>`,
          depart: `def double(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "Ta fonction doit renvoyer son résultat avec return." },
            ],
            codeAbsent: [
              { motif: "\\bprint\\b", message: "Cette fonction ne doit rien afficher : elle renvoie." },
            ],
            tests: `assert double(5) == 10, "double(5) doit valoir 10"\nassert double(0) == 0, "double(0) doit valoir 0"\nassert double(-3) == -6, "double(-3) doit valoir -6"\nassert double(100) == 200, "double(100) doit valoir 200"`,
          },
          felicitation: "Quatre valeurs testées, quatre réussites. Ta fonction est juste. ✅",
          indices: [
            "Une seule ligne dans le corps : <code>return n * 2</code>.",
            "Aucun appel n'est nécessaire : la validation s'en charge.",
          ],
        },

        {
          id: "d7",
          type: "code",
          titre: "Réutiliser le résultat",
          contenu: `
            <p>Tout l'intérêt de <code>return</code> : le résultat peut servir dans un calcul.</p>
            <p>Écris une fonction <code>prix_ttc</code> qui ajoute 20 % de TVA à un prix hors
            taxes, puis calcule le total de deux articles à 100 € et 50 € HT :</p>
            <pre class="bloc-code"><code>Total TTC : 180.0</code></pre>`,
          depart: `def prix_ttc(ht):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le prix TTC." },
              { motif: "prix_ttc\\s*\\([^)]*\\)[\\s\\S]*\\+", message: "Le total doit additionner deux appels à la fonction." },
            ],
            tests: `assert prix_ttc(100) == 120.0, "prix_ttc(100) doit valoir 120.0"\nassert prix_ttc(0) == 0, "prix_ttc(0) doit valoir 0"`,
            sortie: "Total TTC : 180.0",
          },
          felicitation: "Deux appels, une addition : la fonction devient une brique. 🧱",
          indices: [
            "Le prix TTC, c'est le prix hors taxes augmenté de 20 % de lui-même. Une seule ligne dans la fonction, avec <code>return</code>.",
            "En dehors de la fonction, appelle-la deux fois — une par article — et additionne les deux résultats dans une variable.",
            "Il ne reste plus qu'à afficher cette variable, précédée du texte attendu.",
          ],
        },

        {
          id: "d8",
          type: "code",
          titre: "Une fonction qui décide",
          contenu: `
            <p>Une fonction peut renvoyer un <strong>booléen</strong>. Par convention, on
            nomme ces fonctions <code>est_…</code>.</p>
            <p>Écris <code>est_majeur(age)</code> qui renvoie <code>True</code> si l'âge
            atteint 18 ans, <code>False</code> sinon.</p>
            <div class="encadre" data-ton="astuce">
              Piège classique : écrire <code>if age >= 18: return True else: return False</code>.
              Cela fonctionne, mais c'est trois fois trop long — <code>age >= 18</code>
              <em>est déjà</em> le booléen cherché.
            </div>`,
          depart: `def est_majeur(age):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer un booléen." },
            ],
            codeAbsent: [
              { motif: "\\bif\\b", message: "Pas besoin de if : la comparaison est déjà le résultat." },
            ],
            tests: `assert est_majeur(20) == True, "est_majeur(20) doit valoir True"\nassert est_majeur(18) == True, "à 18 ans on est majeur"\nassert est_majeur(17) == False, "est_majeur(17) doit valoir False"\nassert est_majeur(0) == False, "est_majeur(0) doit valoir False"`,
          },
          felicitation: "Une ligne, quatre cas justes. C'est ça, du code élégant. ✨",
          indices: [
            "Ne construis rien : la comparaison demandée vaut <em>déjà</em> True ou False. Il suffit de la renvoyer telle quelle.",
          ],
        },

        {
          id: "d9",
          type: "code",
          titre: "Une boucle dans une fonction",
          contenu: `
            <p>Le corps d'une fonction peut contenir tout ce que tu sais écrire : des
            <code>if</code>, des boucles, d'autres appels.</p>
            <p>Écris <code>table(n)</code> qui <strong>affiche</strong> la table de
            multiplication de <code>n</code>, de 1 à 10, puis appelle-la avec 7 :</p>
            <pre class="bloc-code"><code>7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70</code></pre>
            <p>Ici, la fonction <em>affiche</em> : c'est son travail, elle n'a rien à
            renvoyer.</p>`,
          depart: `def table(n):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+table", message: "Définis une fonction nommée table." },
              { motif: "\\bfor\\b", message: "La fonction doit contenir une boucle." },
            ],
            sortie: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
          },
          felicitation: "Boucle et fonction assemblées. Deux niveaux de décalage. 🔁",
          indices: [
            "Dans la fonction : <code>for i in range(1, 11):</code>, décalé de quatre espaces.",
            "Le <code>print</code> est encore quatre espaces plus loin, donc à huit.",
            "L'appel <code>table(7)</code> vient tout à la fin, sans décalage.",
          ],
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def nom_de_la_fonction(parametre):
    # le corps, décalé
    return resultat        # facultatif, mais presque toujours souhaitable

valeur = nom_de_la_fonction(3)   # l'appel</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les cinq erreurs à connaître</span>
              <ol style="margin-bottom:0">
                <li>oublier les <strong>deux-points</strong> après la définition ;</li>
                <li>oublier d'<strong>indenter</strong> le corps ;</li>
                <li>écrire <code>print</code> au lieu de <code>return</code> ;</li>
                <li>définir la fonction… et ne jamais l'appeler ;</li>
                <li>appeler <code>fonction</code> au lieu de <code>fonction()</code>.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Nommer ses fonctions</span>
              Un <strong>verbe</strong> pour une action (<code>afficher_table</code>,
              <code>calculer_moyenne</code>), <code>est_…</code> pour une fonction qui
              renvoie un booléen. Comme pour les variables : minuscules et tirets bas.
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
          titre: "La fonction carré",
          contenu: `
            <p>Écris <code>carre(n)</code> qui renvoie le carré de <code>n</code>.</p>
            <p>Rien à afficher : c'est la validation qui teste.</p>`,
          depart: `def carre(n):\n    \n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer son résultat." }],
            tests: `assert carre(4) == 16, "carre(4) doit valoir 16"\nassert carre(0) == 0, "carre(0) doit valoir 0"\nassert carre(-5) == 25, "le carré d'un nombre négatif est positif"`,
          },
          indices: ["<code>return n * n</code>, ou <code>return n ** 2</code>."],
        },

        {
          id: "a2",
          type: "code",
          titre: "Le périmètre d'un carré",
          contenu: `
            <p>Écris <code>perimetre_carre(cote)</code> qui renvoie le périmètre d'un carré,
            puis affiche celui d'un carré de côté 7 :</p>
            <pre class="bloc-code"><code>Périmètre : 28</code></pre>`,
          depart: `def perimetre_carre(cote):\n    \n\n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer le périmètre." }],
            tests: `assert perimetre_carre(7) == 28, "un carré de côté 7 a un périmètre de 28"\nassert perimetre_carre(1) == 4, "un carré de côté 1 a un périmètre de 4"`,
            sortie: "Périmètre : 28",
          },
          indices: [
            "Le périmètre d'un carré, c'est quatre fois son côté. Une ligne, avec <code>return</code>.",
            "L'affichage se fait <strong>en dehors</strong> de la fonction : un <code>print</code> avec le texte, puis un appel à ta fonction avec 7 en argument.",
          ],
        },

        {
          id: "a3",
          type: "code",
          titre: "Celsius vers Fahrenheit",
          contenu: `
            <p>La conversion : <em>F</em> = <em>C</em> × 9 / 5 + 32.</p>
            <p>Écris <code>en_fahrenheit(celsius)</code> qui renvoie la température convertie,
            puis affiche le tableau de 0 à 40 degrés, de 10 en 10 :</p>
            <pre class="bloc-code"><code>0 °C = 32.0 °F
10 °C = 50.0 °F
20 °C = 68.0 °F
30 °C = 86.0 °F
40 °C = 104.0 °F</code></pre>`,
          depart: `def en_fahrenheit(celsius):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la température convertie." },
              { motif: "\\bfor\\b", message: "Le tableau doit être produit par une boucle." },
            ],
            tests: `assert en_fahrenheit(0) == 32, "0 °C font 32 °F"\nassert en_fahrenheit(100) == 212, "100 °C font 212 °F"`,
            sortie: "0 °C = 32.0 °F\n10 °C = 50.0 °F\n20 °C = 68.0 °F\n30 °C = 86.0 °F\n40 °C = 104.0 °F",
          },
          felicitation: "Une fonction appelée dans une boucle : le duo gagnant. 🌡️",
          indices: [
            "La formule est donnée dans l'énoncé : traduis-la telle quelle après <code>return</code>, en remplaçant C par le paramètre.",
            "La boucle va de 0 à 40 par pas de 10 — souviens-toi que la borne de droite de <code>range</code> est exclue.",
            "Dans la boucle, un seul <code>print</code> à quatre morceaux : la température, le texte « °C = », l'appel à ta fonction, et le texte « °F ».",
          ],
        },

        {
          id: "a4",
          type: "code",
          titre: "La fonction est_pair",
          contenu: `
            <p>Écris <code>est_pair(n)</code>, qui renvoie <code>True</code> si
            <code>n</code> est pair et <code>False</code> sinon. Une seule ligne suffit.</p>
            <p>Comme pour <code>est_majeur</code>, la comparaison <em>est</em> déjà le
            résultat : aucun <code>if</code> n'est nécessaire.</p>`,
          depart: `def est_pair(n):\n    \n`,
          validation: {
            codeContient: [{ motif: "%", message: "La parité se teste avec le reste." }],
            codeAbsent: [{ motif: "\\bif\\b", message: "Pas besoin de if : la comparaison est déjà le booléen." }],
            tests: `assert est_pair(4) == True, "4 est pair"\nassert est_pair(7) == False, "7 est impair"\nassert est_pair(0) == True, "0 est pair"\nassert est_pair(-2) == True, "-2 est pair"`,
          },
          indices: ["<code>return n % 2 == 0</code>"],
        },

        {
          id: "a5",
          type: "code",
          titre: "Chasse aux bugs : le return oublié",
          contenu: `
            <p>Cette fonction devrait renvoyer le triple de son paramètre, et le programme
            afficher <code>Le triple de 7 est 21</code>. Il y a <strong>deux erreurs</strong>.</p>`,
          depart: `def triple(n)\n    print(n * 3)\n\nprint("Le triple de 7 est", triple(7))\n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer, pas afficher." }],
            sortie: "Le triple de 7 est 21",
          },
          felicitation: "Deux-points et return : les deux bugs les plus fréquents. 🐞",
          indices: [
            "Ligne 1 : il manque les deux-points en fin de définition.",
            "Ligne 2 : la fonction affiche au lieu de renvoyer — d'où le <code>None</code> à l'arrivée.",
          ],
        },

        {
          id: "a6",
          type: "code",
          titre: "La valeur absolue, en fonction",
          contenu: `
            <p>Écris <code>valeur_absolue(n)</code> sans utiliser <code>abs()</code>.
            Cette fois, il faut bien un <code>if</code>.</p>
            <div class="encadre" data-ton="astuce">
              Une fonction peut contenir <strong>plusieurs</strong> <code>return</code> :
              le premier atteint arrête la fonction sur-le-champ.
            </div>`,
          depart: `def valeur_absolue(n):\n    \n`,
          validation: {
            codeAbsent: [{ motif: "\\babs\\s*\\(", message: "abs() est interdite : reconstruis-la." }],
            codeContient: [{ motif: "\\bif\\b", message: "Il faut distinguer deux cas." }],
            tests: `assert valeur_absolue(5) == 5, "la valeur absolue de 5 est 5"\nassert valeur_absolue(-12) == 12, "la valeur absolue de -12 est 12"\nassert valeur_absolue(0) == 0, "la valeur absolue de 0 est 0"`,
          },
          indices: [
            "Si le nombre est négatif, sa valeur absolue est son opposé : un <code>return</code> avec le signe moins devant le paramètre.",
            "Le second <code>return</code> peut se passer de <code>else</code> : on ne l'atteint que si le premier n'a pas été exécuté.",
          ],
        },

        {
          id: "a7",
          type: "code",
          titre: "La somme jusqu'à n",
          contenu: `
            <p>Écris <code>somme_jusqu_a(n)</code> qui renvoie 1 + 2 + … + <em>n</em>.</p>
            <p>C'est l'accumulateur de la séance 5, rangé dans une fonction. Le
            <code>return</code> vient <strong>après</strong> la boucle.</p>`,
          depart: `def somme_jusqu_a(n):\n    somme = 0\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme." },
            ],
            tests: `assert somme_jusqu_a(5) == 15, "1+2+3+4+5 fait 15"\nassert somme_jusqu_a(100) == 5050, "la somme jusqu'à 100 vaut 5050"\nassert somme_jusqu_a(1) == 1, "la somme jusqu'à 1 vaut 1"`,
          },
          felicitation: "L'accumulateur emballé dans une fonction : réutilisable partout. 📦",
          indices: [
            "La boucle va de 1 jusqu'au paramètre inclus : c'est lui qui sert de borne.",
            "Le <code>return</code> se place à quatre espaces — dans la fonction, mais après la boucle. À huit espaces, il l'interromprait au premier tour.",
          ],
        },

        {
          id: "a8",
          type: "code",
          titre: "La factorielle, en fonction",
          contenu: `
            <p>Écris <code>factorielle(n)</code> qui renvoie 1 × 2 × … × <em>n</em>.</p>
            <p>Attention à deux choses : la valeur de départ de l'accumulateur, et le cas
            <code>n = 0</code> — par convention, 0 ! vaut 1.</p>`,
          depart: `def factorielle(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le produit." },
            ],
            tests: `assert factorielle(5) == 120, "5! vaut 120"\nassert factorielle(10) == 3628800, "10! vaut 3628800"\nassert factorielle(1) == 1, "1! vaut 1"\nassert factorielle(0) == 1, "par convention, 0! vaut 1"`,
          },
          felicitation: "Le cas 0 ! est passé tout seul. Bien vu. 🎲",
          indices: [
            "L'accumulateur d'un produit part de 1.",
            "Avec <code>n = 0</code>, la boucle <code>range(1, 1)</code> ne tourne pas : le produit reste à 1. Le cas se règle sans effort.",
          ],
        },

        {
          id: "a9",
          type: "code",
          titre: "Une fonction qui en appelle une autre",
          contenu: `
            <p>Une fonction peut en utiliser une autre. Tu disposes déjà de
            <code>carre</code> ; écris <code>somme_des_carres(n)</code> qui renvoie
            1² + 2² + … + <em>n</em>², <strong>en appelant <code>carre</code></strong>.</p>`,
          depart: `def carre(n):\n    return n * n\n\ndef somme_des_carres(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "def\\s+somme_des_carres", message: "Définis la fonction somme_des_carres." },
              { motif: "carre\\s*\\(\\s*\\w+\\s*\\)", message: "somme_des_carres doit appeler carre." },
            ],
            tests: `assert somme_des_carres(3) == 14, "1+4+9 fait 14"\nassert somme_des_carres(1) == 1, "la somme jusqu'à 1 vaut 1"\nassert somme_des_carres(10) == 385, "la somme des dix premiers carrés vaut 385"`,
          },
          felicitation: "Des fonctions qui s'appellent : ton code devient un jeu de construction. 🧩",
          indices: [
            "Reprends l'accumulateur de l'exercice 7.",
            "Dans la boucle : <code>somme = somme + carre(i)</code>.",
          ],
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
          titre: "La fonction est_premier",
          contenu: `
            <p>Écris <code>est_premier(n)</code> qui renvoie <code>True</code> si
            <code>n</code> est un nombre premier.</p>
            <div class="encadre" data-ton="attention">
              N'oublie pas les cas limites : 0 et 1 ne sont <strong>pas</strong> premiers,
              2 l'est. Beaucoup de programmes échouent là-dessus.
            </div>`,
          depart: `def est_premier(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b|\\bwhile\\b", message: "Il faut chercher un diviseur avec une boucle." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer un booléen." },
            ],
            tests: `assert est_premier(97) == True, "97 est premier"\nassert est_premier(2) == True, "2 est premier"\nassert est_premier(1) == False, "1 n'est pas premier"\nassert est_premier(0) == False, "0 n'est pas premier"\nassert est_premier(91) == False, "91 = 7 x 13 n'est pas premier"`,
          },
          felicitation: "Y compris les cas limites. C'est du travail de professionnel. 🚩",
          indices: [
            "Commence par écarter les petits cas : <code>if n &lt; 2: return False</code>.",
            "Puis cherche un diviseur entre 2 et n − 1 : dès qu'on en trouve un, <code>return False</code>.",
            "Si la boucle se termine sans rien trouver, <code>return True</code>.",
          ],
        },

        {
          id: "x2",
          type: "code",
          titre: "Compter les diviseurs",
          contenu: `
            <p>Écris <code>nombre_de_diviseurs(n)</code> qui renvoie combien de diviseurs
            possède <code>n</code>, lui-même et 1 compris.</p>
            <p>Vérifie ensuite une propriété amusante : un nombre est premier exactement
            quand il a deux diviseurs.</p>`,
          depart: `def nombre_de_diviseurs(n):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut parcourir les diviseurs possibles." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le compte." },
            ],
            tests: `assert nombre_de_diviseurs(36) == 9, "36 a 9 diviseurs"\nassert nombre_de_diviseurs(1) == 1, "1 n'a qu'un diviseur"\nassert nombre_de_diviseurs(97) == 2, "97 est premier, donc 2 diviseurs"\nassert nombre_de_diviseurs(12) == 6, "12 a 6 diviseurs"`,
          },
          indices: [
            "Un compteur, une boucle de 1 à n inclus, un <code>if n % d == 0</code>.",
            "N'oublie pas <code>range(1, n + 1)</code> : le nombre est son propre diviseur.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "Une fonction qui renvoie du texte",
          contenu: `
            <p>Une fonction ne renvoie pas forcément un nombre. Écris <code>ligne(n)</code>
            qui renvoie une <strong>chaîne</strong> de <code>n</code> étoiles, puis sers-t'en
            pour dessiner un escalier :</p>
            <pre class="bloc-code sans-copie"><code>*
**
***
****
*****</code></pre>`,
          depart: `def ligne(n):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la chaîne, pas l'afficher." },
              { motif: "\\bfor\\b", message: "L'escalier se dessine avec une boucle." },
            ],
            tests: `assert ligne(3) == "***", "ligne(3) doit valoir la chaîne ***"\nassert ligne(0) == "", "ligne(0) doit valoir la chaîne vide"\nassert ligne(1) == "*", "ligne(1) doit valoir *"`,
            sortie: "*\n**\n***\n****\n*****",
          },
          felicitation: "Une fonction qui fabrique du texte : très pratique pour dessiner. ⭐",
          indices: [
            "Souviens-toi du défi des quarante tirets : multiplier un texte le répète. Ici le texte est une étoile, et le nombre de répétitions est le paramètre.",
            "En dehors de la fonction, une boucle de 1 à 5 qui affiche, à chaque tour, le résultat de ta fonction appelée avec le compteur.",
          ],
        },

        {
          id: "x4",
          type: "code",
          titre: "Le seuil, en fonction",
          contenu: `
            <p>Écris <code>premiere_puissance_2(seuil)</code> qui renvoie la première
            puissance de 2 <strong>strictement supérieure</strong> au seuil.</p>
            <p>C'est l'algorithme de la séance 6, rendu réutilisable : une seule écriture,
            et il répond à toutes les questions du même type.</p>`,
          depart: `def premiere_puissance_2(seuil):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Un algorithme de seuil s'écrit avec while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la puissance trouvée." },
            ],
            tests: `assert premiere_puissance_2(1000) == 1024, "la première puissance de 2 dépassant 1000 est 1024"\nassert premiere_puissance_2(1) == 2, "la première puissance de 2 dépassant 1 est 2"\nassert premiere_puissance_2(0) == 1, "la première puissance de 2 dépassant 0 est 1"\nassert premiere_puissance_2(1024) == 2048, "il faut être strictement supérieur"`,
          },
          felicitation: "L'algorithme du chapitre 3, désormais réutilisable partout. 📈",
          indices: [
            "Une variable qui part de 1, et une boucle qui tourne tant que cette variable n'a pas dépassé le seuil.",
            "Dans la boucle, une seule ligne : doubler la variable.",
            "Le <code>return</code> vient <strong>après</strong> la boucle, jamais dedans — sinon la fonction s'arrêterait au premier tour.",
          ],
        },

        {
          id: "x5",
          type: "code",
          titre: "Renverser, en fonction",
          contenu: `
            <p>Écris <code>renverser(n)</code> qui renvoie le nombre écrit à l'envers,
            puis <code>est_palindrome(n)</code> qui dit si un nombre se lit pareil dans
            les deux sens — en <strong>appelant</strong> la première.</p>
            <p>Interdit de passer par du texte : on travaille sur les nombres.</p>`,
          depart: `def renverser(n):\n    \n\ndef est_palindrome(n):\n    \n`,
          validation: {
            codeAbsent: [
              { motif: "\\bstr\\s*\\(|\\[::-1\\]", message: "Interdit de passer par du texte : utilise % et //." },
            ],
            codeContient: [
              { motif: "renverser\\s*\\(\\s*n\\s*\\)[\\s\\S]*==|==[\\s\\S]*renverser\\s*\\(\\s*n\\s*\\)",
                message: "est_palindrome doit comparer n au résultat de renverser(n)." },
            ],
            tests: `assert renverser(4728) == 8274, "renverser(4728) doit valoir 8274"\nassert renverser(5) == 5, "renverser(5) doit valoir 5"\nassert renverser(100) == 1, "renverser(100) doit valoir 1"\nassert est_palindrome(12321) == True, "12321 est un palindrome"\nassert est_palindrome(4728) == False, "4728 n'est pas un palindrome"`,
          },
          felicitation: "Deux fonctions, dont une qui s'appuie sur l'autre. 🔁",
          indices: [
            "<code>renverser</code> : la boucle while de la séance 6, avec un <code>return</code> à la fin.",
            "<code>est_palindrome</code> tient en une ligne : <code>return n == renverser(n)</code>.",
          ],
        },

        {
          id: "x6",
          type: "code",
          titre: "Ta boîte à outils",
          contenu: `
            <p>Défi libre. Écris <strong>deux fonctions</strong> de ton choix, dont au moins
            une avec un <code>return</code>, puis un petit programme qui les utilise et
            affiche un résultat.</p>
            <p>Des idées : <code>est_bissextile(annee)</code>, <code>aire_disque(rayon)</code>,
            <code>note_en_mention(moyenne)</code>, <code>prix_apres_remise(prix)</code>,
            <code>somme_des_chiffres(n)</code>…</p>`,
          depart: `# Tes deux fonctions\n`,
          validation: {
            codeContient: [
              { motif: "def[\\s\\S]*\\bdef\\b", message: "Ton programme doit définir au moins deux fonctions." },
              { motif: "\\breturn\\b", message: "Au moins une de tes fonctions doit renvoyer un résultat." },
              { motif: "\\bprint\\b", message: "Ton programme doit afficher quelque chose." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 7 terminée. Tu construis maintenant tes propres outils. 🏁",
          indices: [
            "N'oublie pas d'<strong>appeler</strong> tes fonctions : une définition seule n'affiche rien.",
            "Exemple : <code>def aire_disque(r): return 3.14 * r * r</code>.",
          ],
        },
      ],
    },
  ],
};

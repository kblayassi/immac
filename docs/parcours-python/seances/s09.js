/* Séance 9 — Hasard et simulation.
 * Fiche T8, dernière partie. Prérequis : séances 5 à 8.
 * Porte le chapitre 13 de maths : fonction renvoyant le résultat d'une expérience
 * aléatoire, répétition d'expériences indépendantes, et la loi des grands nombres
 * (dont le contenu vulgarisé est traité ici, en SNT).
 *
 * Aucune saisie clavier dans cette séance : le parcours rejoue le programme à
 * chaque input(), ce qui changerait les tirages aléatoires entre deux relances.
 */

export default {
  id: "s09",
  numero: 9,
  titre: "Hasard et simulation",
  sousTitre: "Faire des expériences par milliers",
  palier: "T8 — Fonctions et aléatoire",

  accroche: `Lancer un dé mille fois à la main prend une heure. Ton programme le fera
    en un centième de seconde — et te montrera quelque chose que personne n'avait pu
    voir avant les ordinateurs : ce qui arrive quand on répète <em>vraiment</em>
    beaucoup de fois.`,

  objectifs: [
    "obtenir un nombre au hasard avec <code>randint</code>",
    "écrire une fonction qui renvoie le résultat d'une <strong>expérience aléatoire</strong>",
    "répéter une expérience et calculer une <strong>fréquence</strong>",
    "observer la <strong>loi des grands nombres</strong> par simulation",
  ],

  motDeLaFin: `Tu as vu tout le Python de la Seconde. À la séance 10, tu assembles
    tout ça dans un vrai projet.`,

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
          titre: "Le bloc « nombre aléatoire »",
          contenu: `
            <p>Scratch avait <strong>nombre aléatoire entre 1 et 10</strong>. Python range
            cet outil dans une <strong>bibliothèque</strong> nommée <code>random</code>,
            qu'il faut demander avant de s'en servir :</p>

            <pre class="bloc-code"><code>from random import randint

print(randint(1, 6))</code></pre>

            <p><code>randint(1, 6)</code> donne un entier au hasard entre 1 et 6,
            <strong>bornes comprises</strong>. Chaque appel donne une nouvelle valeur.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ici, les deux bornes sont incluses</span>
              Contrairement à <code>range(1, 6)</code> qui s'arrête à 5,
              <code>randint(1, 6)</code> peut renvoyer 6. Deux fonctions, deux conventions :
              c'est agaçant, mais c'est ainsi.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une bibliothèque, c'est quoi ?</span>
              Un ensemble d'outils écrits par d'autres. <code>random</code> en fait partie,
              comme des dizaines d'autres livrées avec Python. La ligne
              <code>from random import randint</code> se met tout en haut du programme,
              une seule fois.
            </div>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Cinq lancers de dé",
          contenu: `
            <p>Affiche le résultat de <strong>cinq</strong> lancers de dé, un par ligne.
            Exécute plusieurs fois : les valeurs doivent changer.</p>
            <pre class="bloc-code"><code>3
6
1
1
5</code></pre>
            <p><em>(ton résultat sera différent, évidemment)</em></p>`,
          depart: `from random import randint\n\n`,
          validation: {
            codeContient: [
              { motif: "randint\\s*\\(\\s*1\\s*,\\s*6\\s*\\)", message: "Un dé se simule avec randint(1, 6)." },
              { motif: "\\bfor\\b", message: "Cinq lancers : utilise une boucle." },
            ],
            sortieRegex: "^[1-6]\\n[1-6]\\n[1-6]\\n[1-6]\\n[1-6]$",
            sortieRegexMessage: "Ton programme doit afficher exactement cinq nombres entre 1 et 6, un par ligne.",
          },
          felicitation: "Ton premier dé numérique. 🎲",
          indices: [
            "<code>for i in range(5):</code>",
            "Dans la boucle : <code>print(randint(1, 6))</code>.",
          ],
          solution: `from random import randint\n\nfor i in range(5):\n    print(randint(1, 6))\n`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "Une fonction pour une expérience",
          contenu: `
            <p>Le programme de mathématiques demande explicitement de savoir
            « <em>écrire une fonction renvoyant le résultat numérique d'une expérience
            aléatoire</em> ». C'est exactement ce qu'on va faire :</p>

            <pre class="bloc-code"><code>from random import randint

def lancer_de():
    return randint(1, 6)</code></pre>

            <p>Pourquoi s'embêter, puisque <code>randint(1, 6)</code> tenait déjà en une
            ligne ? Pour trois raisons :</p>

            <ul>
              <li>le <strong>nom</strong> dit ce qu'on simule — on lit
                <code>lancer_de()</code>, pas des chiffres ;</li>
              <li>pour changer d'expérience — un dé à 20 faces, une pièce truquée — il n'y a
                <strong>qu'un seul endroit</strong> à modifier ;</li>
              <li>l'expérience devient une <strong>brique</strong> réutilisable dans des
                simulations plus grandes.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La fonction n'a aucun paramètre</span>
              Les parenthèses de <code>def lancer_de():</code> sont vides : une expérience
              aléatoire ne dépend de rien. Mais elle donne un résultat différent à chaque
              appel — c'est la seule sorte de fonction dont c'est le cas.
            </div>`,
        },

        {
          id: "d4",
          type: "code",
          titre: "La fonction lancer_de",
          contenu: `
            <p>Écris la fonction <code>lancer_de()</code> qui <strong>renvoie</strong> le
            résultat d'un lancer de dé à six faces.</p>
            <p>Rien à afficher : la validation va l'appeler des centaines de fois pour
            vérifier qu'elle produit bien les six faces, et rien d'autre.</p>`,
          depart: `from random import randint\n\ndef lancer_de():\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le résultat, pas l'afficher." },
            ],
            tests: `tirages = [lancer_de() for essai in range(400)]\nassert min(tirages) >= 1, "un dé ne donne jamais moins de 1"\nassert max(tirages) <= 6, "un dé ne donne jamais plus de 6"\nassert len(set(tirages)) == 6, "les six faces doivent toutes pouvoir sortir"`,
          },
          felicitation: "400 lancers, six faces, aucune valeur interdite. 🎲",
          indices: [
            "<code>return randint(1, 6)</code>",
            "Attention : <code>randint(1, 7)</code> donnerait parfois 7, et <code>randint(0, 6)</code> parfois 0.",
          ],
          solution: `from random import randint\n\ndef lancer_de():\n    return randint(1, 6)\n`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Répéter l'expérience et compter",
          contenu: `
            <p>Une expérience isolée n'apprend rien. Ce qui est intéressant, c'est ce qui
            arrive quand on la <strong>répète</strong>. On retrouve exactement le compteur
            de la séance 5 :</p>

            <pre class="bloc-code"><code>nombre_de_six = 0

for essai in range(1000):
    if lancer_de() == 6:
        nombre_de_six = nombre_de_six + 1

print(nombre_de_six)
print(nombre_de_six / 1000)</code></pre>

            <p>Le second affichage est la <strong>fréquence</strong> de l'événement :
            le nombre de fois où il s'est produit, divisé par le nombre d'essais.
            C'est toujours un nombre entre 0 et 1.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot</th><th>Sens</th><th>D'où vient-il ?</th></tr>
              <tr><td><strong>probabilité</strong></td><td>1/6 ≈ 0,167</td><td>du calcul, avant toute expérience</td></tr>
              <tr><td><strong>fréquence</strong></td><td>0,168 par exemple</td><td>de l'expérience, après coup</td></tr>
            </table>
            </div>

            <p>Les deux ne sont jamais exactement égales. Toute la question est de savoir
            à quel point elles se rapprochent.</p>`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Mille lancers",
          contenu: `
            <p>Simule <strong>1000 lancers</strong> de dé et affiche combien de 6 sont
            sortis, puis leur fréquence :</p>
            <pre class="bloc-code"><code>Nombre de 6 : 173
Fréquence : 0.173</code></pre>
            <p><em>(tes valeurs seront proches, mais différentes)</em></p>`,
          depart: `from random import randint\n\ndef lancer_de():\n    return randint(1, 6)\n\nnombre_de_six = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut répéter l'expérience avec une boucle." },
              { motif: "lancer_de\\s*\\(\\s*\\)", message: "Utilise la fonction lancer_de()." },
              { motif: "/\\s*1000|1000\\s*\\)", message: "La fréquence est le nombre de succès divisé par 1000." },
            ],
            sortieRegex: "Nombre de 6 : \\d+\\nFréquence : 0\\.\\d+",
            sortieRegexMessage: "Ton programme doit afficher le nombre de 6 puis la fréquence.",
          },
          felicitation: "Mille expériences en un clin d'œil. 📊",
          indices: [
            "<code>for essai in range(1000):</code>",
            "Dans la boucle : <code>if lancer_de() == 6:</code> puis l'incrément du compteur.",
            "La fréquence : <code>nombre_de_six / 1000</code>.",
          ],
          solution: `from random import randint\n\ndef lancer_de():\n    return randint(1, 6)\n\nnombre_de_six = 0\n\nfor essai in range(1000):\n    if lancer_de() == 6:\n        nombre_de_six = nombre_de_six + 1\n\nprint("Nombre de 6 :", nombre_de_six)\nprint("Fréquence :", nombre_de_six / 1000)\n`,
        },

        {
          id: "d7",
          type: "cours",
          titre: "La loi des grands nombres",
          contenu: `
            <p>Refais tourner l'exercice précédent plusieurs fois. La fréquence change à
            chaque exécution : 0,158, puis 0,177, puis 0,165… Mais elle reste
            <strong>autour de 0,167</strong>, c'est-à-dire 1/6.</p>

            <p>Change maintenant le nombre d'essais et observe :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Nombre de lancers</th><th>Fréquences observées, sur plusieurs essais</th></tr>
              <tr><td>10</td><td>0,0 &nbsp; 0,3 &nbsp; 0,1 &nbsp; 0,4</td></tr>
              <tr><td>100</td><td>0,14 &nbsp; 0,21 &nbsp; 0,16 &nbsp; 0,19</td></tr>
              <tr><td>10 000</td><td>0,1662 &nbsp; 0,1673 &nbsp; 0,1651 &nbsp; 0,1680</td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La loi des grands nombres</span>
              Quand le nombre d'expériences augmente, la <strong>fréquence observée</strong>
              se rapproche de la <strong>probabilité théorique</strong>, et les écarts entre
              deux simulations deviennent de plus en plus petits.
            </div>

            <p>C'est ce qui justifie tout : pourquoi les assurances savent combien facturer,
            pourquoi les sondages fonctionnent, pourquoi un casino gagne toujours à la fin.
            Sur un coup, tout peut arriver. Sur un million, non.</p>`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Voir la loi à l'œuvre",
          contenu: `
            <p>Écris une fonction <code>frequence_de_six(nombre_essais)</code> qui simule le
            nombre de lancers demandé et <strong>renvoie</strong> la fréquence des 6.</p>
            <p>Puis affiche le tableau pour 10, 100, 1000, 10000 et 100000 essais :</p>
            <pre class="bloc-code"><code>10 essais : 0.1
100 essais : 0.19
1000 essais : 0.163
10000 essais : 0.1687
100000 essais : 0.16702</code></pre>
            <p>Regarde la deuxième décimale se stabiliser à mesure qu'on descend.</p>`,
          depart: `from random import randint\n\ndef frequence_de_six(nombre_essais):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+frequence_de_six\\s*\\(\\s*\\w+\\s*\\)", message: "La fonction doit prendre le nombre d'essais en paramètre." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la fréquence." },
            ],
            sortieRegex: "10 essais : [01](\\.\\d+)?\\n100 essais : 0?\\.?\\d*\\n1000 essais : 0\\.\\d+\\n10000 essais : 0\\.1\\d+\\n100000 essais : 0\\.16\\d+",
            sortieRegexMessage: "Ton tableau doit afficher les cinq lignes, et la dernière fréquence doit être proche de 0.167.",
          },
          felicitation: "La loi des grands nombres, observée de tes propres yeux. 📉",
          indices: [
            "Dans la fonction : un compteur, une boucle <code>range(nombre_essais)</code>, un <code>if</code>, et <code>return compteur / nombre_essais</code>.",
            "Ensuite, cinq lignes : <code>print(10, \"essais :\", frequence_de_six(10))</code>.",
            "Le calcul de 100 000 essais prend une seconde ou deux : c'est normal.",
          ],
          solution: `from random import randint\n\ndef frequence_de_six(nombre_essais):\n    compteur = 0\n    for essai in range(nombre_essais):\n        if randint(1, 6) == 6:\n            compteur = compteur + 1\n    return compteur / nombre_essais\n\nprint(10, "essais :", frequence_de_six(10))\nprint(100, "essais :", frequence_de_six(100))\nprint(1000, "essais :", frequence_de_six(1000))\nprint(10000, "essais :", frequence_de_six(10000))\nprint(100000, "essais :", frequence_de_six(100000))\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Deux dés valent mieux qu'un",
          contenu: `
            <p>Écris <code>somme_deux_des()</code>, qui simule le lancer de
            <strong>deux</strong> dés et renvoie leur somme.</p>
            <div class="encadre" data-ton="attention">
              Piège : <code>2 * randint(1, 6)</code> ne convient pas ! Cela lancerait un seul
              dé et doublerait son résultat — impossible d'obtenir 7. Il faut
              <strong>deux appels</strong>.
            </div>`,
          depart: `from random import randint\n\ndef somme_deux_des():\n    \n`,
          validation: {
            codeContient: [
              { motif: "randint[\\s\\S]*randint", message: "Deux dés, donc deux appels à randint." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la somme." },
            ],
            tests: `tirages = [somme_deux_des() for essai in range(600)]\nassert min(tirages) >= 2, "la somme de deux dés vaut au moins 2"\nassert max(tirages) <= 12, "la somme de deux dés vaut au plus 12"\nassert len(set(tirages)) == 11, "les onze sommes de 2 à 12 doivent pouvoir sortir"\nassert tirages.count(7) > tirages.count(2), "7 doit sortir bien plus souvent que 2"`,
          },
          felicitation: "Et le test le confirme : 7 sort bien plus souvent que 2. 🎲🎲",
          indices: [
            "<code>return randint(1, 6) + randint(1, 6)</code>",
            "Ou, plus lisible : deux variables <code>de1</code> et <code>de2</code>, puis <code>return de1 + de2</code>.",
          ],
          solution: `from random import randint\n\ndef somme_deux_des():\n    de1 = randint(1, 6)\n    de2 = randint(1, 6)\n    return de1 + de2\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>from random import randint     # tout en haut, une seule fois

def experience():             # une expérience = une fonction sans paramètre
    return randint(1, 6)

succes = 0
for essai in range(n):        # on répète
    if experience() == 6:     # on teste
        succes = succes + 1   # on compte

print(succes / n)             # la fréquence</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Trois pièges du hasard</span>
              <ol style="margin-bottom:0">
                <li>oublier <code>from random import randint</code> → <code>NameError</code> ;</li>
                <li>confondre les bornes : <code>randint</code> les inclut toutes les deux ;</li>
                <li>appeler <strong>une seule fois</strong> <code>randint</code> pour deux
                  dés — les résultats seraient toujours identiques.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux mots à ne pas confondre</span>
              La <strong>probabilité</strong> se calcule et ne change jamais. La
              <strong>fréquence</strong> s'observe et change à chaque simulation. La loi des
              grands nombres dit que la seconde s'approche de la première quand le nombre
              d'essais grandit.
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
          titre: "Pile ou face",
          contenu: `
            <p>Écris <code>pile_ou_face()</code> qui renvoie la <strong>chaîne</strong>
            <code>"pile"</code> ou <code>"face"</code>, avec la même chance pour les deux.</p>`,
          depart: `from random import randint\n\ndef pile_ou_face():\n    \n`,
          validation: {
            codeContient: [
              { motif: "randint", message: "Utilise randint pour tirer au hasard." },
              { motif: "\\bif\\b", message: "Il faut choisir entre deux chaînes selon le tirage." },
            ],
            tests: `tirages = [pile_ou_face() for essai in range(400)]\nassert set(tirages) == {"pile", "face"}, "la fonction doit renvoyer exactement pile ou face"\nassert 120 < tirages.count("pile") < 280, "les deux résultats doivent être à peu près équiprobables"`,
          },
          indices: [
            "Tire un entier entre 1 et 2 : <code>if randint(1, 2) == 1:</code>.",
            "<code>return \"pile\"</code> dans un cas, <code>return \"face\"</code> dans l'autre.",
          ],
          solution: `from random import randint\n\ndef pile_ou_face():\n    if randint(1, 2) == 1:\n        return "pile"\n    return "face"\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Cent lancers de pièce",
          contenu: `
            <p>Simule 100 lancers de pièce et affiche le décompte :</p>
            <pre class="bloc-code"><code>Pile : 47
Face : 53</code></pre>
            <p>Le second nombre doit être <strong>calculé</strong> à partir du premier :
            inutile de compter deux fois.</p>`,
          depart: `from random import randint\n\ndef pile_ou_face():\n    if randint(1, 2) == 1:\n        return "pile"\n    return "face"\n\npiles = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut répéter l'expérience." },
              { motif: "100\\s*-\\s*piles|piles\\s*-", message: "Le nombre de faces se déduit du nombre de piles." },
            ],
            sortieRegex: "Pile : \\d+\\nFace : \\d+",
            sortieRegexMessage: "Ton programme doit afficher les deux décomptes.",
          },
          indices: [
            "<code>if pile_ou_face() == \"pile\":</code> puis l'incrément.",
            "Le nombre de faces vaut <code>100 - piles</code>.",
          ],
          solution: `from random import randint\n\ndef pile_ou_face():\n    if randint(1, 2) == 1:\n        return "pile"\n    return "face"\n\npiles = 0\n\nfor essai in range(100):\n    if pile_ou_face() == "pile":\n        piles = piles + 1\n\nprint("Pile :", piles)\nprint("Face :", 100 - piles)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Le tirage du loto",
          contenu: `
            <p>Écris <code>tirage_loto()</code> qui renvoie un numéro entre 1 et 49, puis
            affiche <strong>six</strong> numéros tirés, un par ligne.</p>
            <p><em>(Les doublons sont possibles : les éviter demanderait des listes, qui ne
            sont pas au programme cette année.)</em></p>`,
          depart: `from random import randint\n\ndef tirage_loto():\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "randint\\s*\\(\\s*1\\s*,\\s*49\\s*\\)", message: "Les numéros du loto vont de 1 à 49." },
              { motif: "\\bfor\\b", message: "Six numéros : utilise une boucle." },
            ],
            tests: `tirages = [tirage_loto() for essai in range(500)]\nassert min(tirages) >= 1, "le plus petit numéro est 1"\nassert max(tirages) <= 49, "le plus grand numéro est 49"\nassert len(set(tirages)) > 40, "tous les numéros doivent pouvoir sortir"`,
            sortieRegex: "^\\d+\\n\\d+\\n\\d+\\n\\d+\\n\\d+\\n\\d+$",
            sortieRegexMessage: "Ton programme doit afficher exactement six numéros, un par ligne.",
          },
          indices: [
            "<code>return randint(1, 49)</code>",
            "Puis <code>for i in range(6): print(tirage_loto())</code>.",
          ],
          solution: `from random import randint\n\ndef tirage_loto():\n    return randint(1, 49)\n\nfor i in range(6):\n    print(tirage_loto())\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : le dé cassé",
          contenu: `
            <p>Cette fonction devrait simuler un dé à six faces. Elle contient
            <strong>trois erreurs</strong>.</p>
            <p>Indice : deux d'entre elles ne font pas planter le programme — elles le font
            simplement mentir.</p>`,
          depart: `from random import randint\n\ndef lancer_de():\n    print(randint(0, 6))\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer, pas afficher." },
              { motif: "randint\\s*\\(\\s*1\\s*,\\s*6\\s*\\)", message: "Un dé va de 1 à 6, bornes comprises." },
            ],
            codeAbsent: [
              { motif: "\\bprint\\b", message: "La fonction ne doit rien afficher." },
            ],
            tests: `tirages = [lancer_de() for essai in range(400)]\nassert min(tirages) >= 1, "un dé ne donne jamais 0"\nassert max(tirages) <= 6, "un dé ne donne jamais plus de 6"\nassert len(set(tirages)) == 6, "les six faces doivent sortir"`,
          },
          felicitation: "Un dé qui pouvait tomber sur 0 : c'est le genre de bug qu'on ne voit pas. 🐞",
          indices: [
            "Erreur 1 : la fonction affiche au lieu de renvoyer.",
            "Erreur 2 : <code>randint(0, 6)</code> peut donner 0, ce qu'un dé ne fait jamais.",
            "Erreur 3 : sans <code>return</code>, la fonction renvoie <code>None</code>.",
          ],
          solution: `from random import randint\n\ndef lancer_de():\n    return randint(1, 6)\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "La fréquence du 7",
          contenu: `
            <p>Avec deux dés, la somme 7 est la plus probable : il y a six façons de
            l'obtenir sur 36, soit une probabilité de 1/6 ≈ 0,167.</p>
            <p>Vérifie-le par simulation sur <strong>10 000</strong> lancers :</p>
            <pre class="bloc-code"><code>Fréquence du 7 : 0.1673</code></pre>`,
          depart: `from random import randint\n\ndef somme_deux_des():\n    return randint(1, 6) + randint(1, 6)\n\ncompteur = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut répéter l'expérience." },
              { motif: "==\\s*7", message: "On compte les sommes égales à 7." },
            ],
            sortieRegex: "Fréquence du 7 : 0\\.1[5-8]\\d*",
            sortieRegexMessage: "Sur 10 000 lancers, la fréquence du 7 doit tomber autour de 0.167.",
          },
          felicitation: "La théorie disait 0,167. La simulation confirme. 🎯",
          indices: [
            "<code>for essai in range(10000):</code>",
            "<code>if somme_deux_des() == 7:</code> puis l'incrément.",
            "La fréquence : <code>compteur / 10000</code>.",
          ],
          solution: `from random import randint\n\ndef somme_deux_des():\n    return randint(1, 6) + randint(1, 6)\n\ncompteur = 0\n\nfor essai in range(10000):\n    if somme_deux_des() == 7:\n        compteur = compteur + 1\n\nprint("Fréquence du 7 :", compteur / 10000)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Une fonction de fréquence réutilisable",
          contenu: `
            <p>Écris <code>frequence_somme(cible, essais)</code> qui renvoie la fréquence
            d'apparition de la somme <code>cible</code> sur <code>essais</code> lancers de
            deux dés.</p>
            <p>Puis affiche les fréquences des sommes 2, 7 et 12 sur 20 000 lancers :</p>
            <pre class="bloc-code"><code>Somme 2 : 0.0277
Somme 7 : 0.1668
Somme 12 : 0.0281</code></pre>`,
          depart: `from random import randint\n\ndef somme_deux_des():\n    return randint(1, 6) + randint(1, 6)\n\ndef frequence_somme(cible, essais):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+frequence_somme\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir deux paramètres." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la fréquence." },
            ],
            tests: `f7 = frequence_somme(7, 20000)\nassert 0.14 < f7 < 0.20, "la fréquence du 7 doit être proche de 0,167"\nf2 = frequence_somme(2, 20000)\nassert 0.01 < f2 < 0.05, "la fréquence du 2 doit être proche de 0,028"`,
            sortieRegex: "Somme 2 : 0\\.0\\d+\\nSomme 7 : 0\\.1\\d+\\nSomme 12 : 0\\.0\\d+",
            sortieRegexMessage: "Ton programme doit afficher les trois fréquences.",
          },
          felicitation: "2 et 12 sont six fois plus rares que 7. C'est exactement la théorie. 📊",
          indices: [
            "Le corps de la fonction reprend l'exercice précédent, avec <code>cible</code> à la place de 7.",
            "<code>return compteur / essais</code>",
            "Trois <code>print</code> ensuite : <code>print(\"Somme 2 :\", frequence_somme(2, 20000))</code>.",
          ],
          solution: `from random import randint\n\ndef somme_deux_des():\n    return randint(1, 6) + randint(1, 6)\n\ndef frequence_somme(cible, essais):\n    compteur = 0\n    for essai in range(essais):\n        if somme_deux_des() == cible:\n            compteur = compteur + 1\n    return compteur / essais\n\nprint("Somme 2 :", frequence_somme(2, 20000))\nprint("Somme 7 :", frequence_somme(7, 20000))\nprint("Somme 12 :", frequence_somme(12, 20000))\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "La marche aléatoire",
          contenu: `
            <p>Un promeneur part de la position 0. À chaque pas, il avance d'un mètre vers
            la droite ou vers la gauche, au hasard. Où est-il après 100 pas ?</p>
            <p>Écris <code>marche(pas)</code> qui renvoie la position finale, puis affiche
            le résultat de cinq promenades de 100 pas :</p>
            <pre class="bloc-code"><code>4
-12
2
-6
14</code></pre>`,
          depart: `from random import randint\n\ndef marche(pas):\n    position = 0\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la position finale." },
              { motif: "\\bfor\\b[\\s\\S]*\\bfor\\b", message: "Une boucle dans la fonction, une autre pour les cinq promenades." },
            ],
            tests: `positions = [marche(100) for essai in range(200)]\nassert min(positions) >= -100, "après 100 pas, on ne peut pas être au-delà de -100"\nassert max(positions) <= 100, "après 100 pas, on ne peut pas être au-delà de 100"\nassert all(p % 2 == 0 for p in positions), "après un nombre pair de pas, la position est paire"\nassert len(set(positions)) > 5, "les positions finales doivent varier"`,
            sortieRegex: "^-?\\d+\\n-?\\d+\\n-?\\d+\\n-?\\d+\\n-?\\d+$",
            sortieRegexMessage: "Ton programme doit afficher exactement cinq positions.",
          },
          felicitation: "Le promeneur ne s'éloigne pas beaucoup : c'est tout l'intérêt de la marche aléatoire. 🚶",
          indices: [
            "Dans la boucle : <code>if randint(1, 2) == 1:</code> alors <code>position = position + 1</code>, sinon <code>position = position - 1</code>.",
            "<code>return position</code> après la boucle.",
            "Puis <code>for i in range(5): print(marche(100))</code>.",
          ],
          solution: `from random import randint\n\ndef marche(pas):\n    position = 0\n    for i in range(pas):\n        if randint(1, 2) == 1:\n            position = position + 1\n        else:\n            position = position - 1\n    return position\n\nfor i in range(5):\n    print(marche(100))\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Le dé pipé",
          contenu: `
            <p>Un dé truqué tombe sur 6 une fois sur deux ; les cinq autres faces se
            partagent le reste, à égalité.</p>
            <p>Écris <code>de_pipe()</code> qui simule ce dé, puis mesure la fréquence du 6
            sur 10 000 lancers :</p>
            <pre class="bloc-code"><code>Fréquence du 6 : 0.4998</code></pre>`,
          depart: `from random import randint\n\ndef de_pipe():\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la face obtenue." },
              { motif: "\\bif\\b", message: "Il faut deux cas : le 6 truqué, et les autres faces." },
            ],
            tests: `tirages = [de_pipe() for essai in range(4000)]\nassert min(tirages) >= 1 and max(tirages) <= 6, "les faces vont de 1 à 6"\nassert len(set(tirages)) == 6, "les six faces doivent pouvoir sortir"\nassert 1600 < tirages.count(6) < 2400, "le 6 doit sortir environ une fois sur deux"`,
            sortieRegex: "Fréquence du 6 : 0\\.[45]\\d*",
            sortieRegexMessage: "La fréquence du 6 doit tomber autour de 0.5.",
          },
          felicitation: "Un dé pipé, et la simulation qui le démasque. 🎲",
          indices: [
            "Tire d'abord à pile ou face : <code>if randint(1, 2) == 1: return 6</code>.",
            "Sinon, l'une des cinq autres faces : <code>return randint(1, 5)</code>.",
          ],
          solution: `from random import randint\n\ndef de_pipe():\n    if randint(1, 2) == 1:\n        return 6\n    return randint(1, 5)\n\ncompteur = 0\nfor essai in range(10000):\n    if de_pipe() == 6:\n        compteur = compteur + 1\n\nprint("Fréquence du 6 :", compteur / 10000)\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "Combien de lancers pour un 6 ?",
          contenu: `
            <p>Écris <code>lancers_jusqu_a_six()</code> qui lance un dé jusqu'à obtenir un 6,
            et renvoie <strong>le nombre de lancers</strong> qu'il a fallu.</p>
            <p>Puis calcule la moyenne sur 10 000 expériences :</p>
            <pre class="bloc-code"><code>Moyenne : 5.9873</code></pre>
            <p>La théorie prédit exactement 6. Vérifie.</p>`,
          depart: `from random import randint\n\ndef lancers_jusqu_a_six():\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "On ne sait pas combien de lancers il faudra : c'est un while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le nombre de lancers." },
            ],
            tests: `essais = [lancers_jusqu_a_six() for i in range(3000)]\nassert min(essais) >= 1, "il faut au moins un lancer"\nassert 5 < sum(essais) / len(essais) < 7, "la moyenne doit être proche de 6"\nassert essais.count(1) > essais.count(2), "obtenir un 6 du premier coup est le cas le plus fréquent"`,
            sortieRegex: "Moyenne : [56]\\.\\d+",
            sortieRegexMessage: "La moyenne doit tomber autour de 6.",
          },
          felicitation: "La théorie disait 6. Dix mille expériences le confirment. 🎯",
          indices: [
            "<code>compteur = 0</code> puis <code>de = 0</code> pour pouvoir entrer dans la boucle.",
            "<code>while de != 6:</code> avec, dedans, un nouveau lancer et un incrément.",
            "Pour la moyenne : un accumulateur qui additionne les résultats, divisé par 10000.",
          ],
          solution: `from random import randint\n\ndef lancers_jusqu_a_six():\n    compteur = 0\n    de = 0\n    while de != 6:\n        de = randint(1, 6)\n        compteur = compteur + 1\n    return compteur\n\ntotal = 0\nfor essai in range(10000):\n    total = total + lancers_jusqu_a_six()\n\nprint("Moyenne :", total / 10000)\n`,
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
          titre: "Estimer π avec des fléchettes",
          contenu: `
            <p>La méthode de Monte-Carlo. On lance des fléchettes au hasard dans un carré de
            côté 1, et on compte celles qui tombent dans le quart de disque de rayon 1.</p>
            <p>La proportion vaut l'aire du quart de disque divisée par celle du carré,
            c'est-à-dire π/4. Donc <strong>π ≈ 4 × proportion</strong>.</p>
            <p>Sur 50 000 fléchettes, affiche :</p>
            <pre class="bloc-code"><code>Estimation de pi : 3.14208</code></pre>
            <div class="encadre" data-ton="astuce">
              Pour tirer un décimal au hasard entre 0 et 1, utilise <code>random()</code>
              — une autre fonction de la même bibliothèque, déjà importée pour toi.
              Un point (x ; y) est dans le quart de disque quand x² + y² ⩽ 1.
            </div>`,
          depart: `from random import random\n\ndedans = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut lancer les fléchettes une par une." },
              { motif: "random\\s*\\(\\s*\\)[\\s\\S]*random\\s*\\(\\s*\\)", message: "Chaque fléchette a deux coordonnées : deux appels à random()." },
              { motif: "\\*\\s*4|4\\s*\\*", message: "L'estimation de π vaut quatre fois la proportion." },
            ],
            sortieRegex: "Estimation de pi : 3\\.[01]\\d*",
            sortieRegexMessage: "Ton estimation doit tomber autour de 3.14.",
          },
          felicitation: "π estimé par des fléchettes. Von Neumann faisait ça en 1946. 🎯",
          indices: [
            "Dans la boucle : <code>x = random()</code> et <code>y = random()</code>.",
            "<code>if x * x + y * y &lt;= 1:</code> alors <code>dedans = dedans + 1</code>.",
            "À la fin : <code>print(\"Estimation de pi :\", 4 * dedans / 50000)</code>.",
          ],
          solution: `from random import random\n\ndedans = 0\n\nfor essai in range(50000):\n    x = random()\n    y = random()\n    if x * x + y * y <= 1:\n        dedans = dedans + 1\n\nprint("Estimation de pi :", 4 * dedans / 50000)\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "La ruine du joueur",
          contenu: `
            <p>Un joueur arrive au casino avec <strong>10 jetons</strong>. À chaque partie,
            il mise un jeton et le gagne ou le perd à pile ou face. Il s'arrête quand il est
            ruiné (0 jeton) ou quand il a doublé (20 jetons).</p>
            <p>Écris <code>partie()</code> qui renvoie <code>True</code> si le joueur double,
            <code>False</code> s'il est ruiné. Puis mesure la fréquence de réussite sur
            10 000 parties :</p>
            <pre class="bloc-code"><code>Fréquence de réussite : 0.4991</code></pre>
            <p>Le jeu est parfaitement équitable : la fréquence doit tomber autour de 0,5.</p>`,
          depart: `from random import randint\n\ndef partie():\n    jetons = 10\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "La partie dure un nombre inconnu de coups : c'est un while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer un booléen." },
            ],
            tests: `resultats = [partie() for essai in range(2000)]\nassert set(resultats) == {True, False}, "la fonction doit renvoyer True ou False"\nassert 800 < resultats.count(True) < 1200, "avec un jeu équitable, la réussite doit être proche d'une fois sur deux"`,
            sortieRegex: "Fréquence de réussite : 0\\.[45]\\d*",
            sortieRegexMessage: "La fréquence doit tomber autour de 0.5.",
          },
          felicitation: "Un jeu équitable donne bien une chance sur deux. Le casino, lui, ne l'est jamais. 🎰",
          indices: [
            "<code>while jetons > 0 and jetons &lt; 20:</code>",
            "Dans la boucle : gagner ou perdre un jeton selon <code>randint(1, 2)</code>.",
            "Après la boucle : <code>return jetons == 20</code>.",
          ],
          solution: `from random import randint\n\ndef partie():\n    jetons = 10\n    while jetons > 0 and jetons < 20:\n        if randint(1, 2) == 1:\n            jetons = jetons + 1\n        else:\n            jetons = jetons - 1\n    return jetons == 20\n\nreussites = 0\nfor essai in range(10000):\n    if partie():\n        reussites = reussites + 1\n\nprint("Fréquence de réussite :", reussites / 10000)\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Le casino qui gagne toujours",
          contenu: `
            <p>Même jeu, mais légèrement truqué : le joueur gagne un jeton avec une
            probabilité de 49 % seulement (comme à la roulette).</p>
            <p>Écris <code>partie_truquee()</code> sur le même modèle, avec cette petite
            asymétrie, et mesure la fréquence de réussite sur 10 000 parties.</p>
            <p>Observe : 1 % d'écart par coup suffit à faire chuter les chances de doubler
            bien en dessous de 0,5.</p>`,
          depart: `from random import randint\n\ndef partie_truquee():\n    jetons = 10\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "Il faut une boucle while." },
              { motif: "randint\\s*\\(\\s*1\\s*,\\s*100\\s*\\)|\\b49\\b", message: "Pour une probabilité de 49 %, tire un entier entre 1 et 100." },
            ],
            tests: `resultats = [partie_truquee() for essai in range(3000)]\nassert set(resultats) <= {True, False}, "la fonction doit renvoyer un booléen"\nassert resultats.count(True) < 1350, "avec un jeu défavorable, la réussite doit tomber nettement sous une fois sur deux"`,
            sortieRegex: "0\\.[0-4]\\d*",
            sortieRegexMessage: "La fréquence de réussite doit être clairement inférieure à 0.5.",
          },
          felicitation: "1 % d'avantage pour la maison, et le joueur perd deux fois plus souvent. 🎰",
          indices: [
            "<code>if randint(1, 100) &lt;= 49:</code> donne une chance sur 49/100 de gagner.",
            "Le reste du programme est identique au défi précédent.",
          ],
          solution: `from random import randint\n\ndef partie_truquee():\n    jetons = 10\n    while jetons > 0 and jetons < 20:\n        if randint(1, 100) <= 49:\n            jetons = jetons + 1\n        else:\n            jetons = jetons - 1\n    return jetons == 20\n\nreussites = 0\nfor essai in range(10000):\n    if partie_truquee():\n        reussites = reussites + 1\n\nprint("Fréquence de réussite :", reussites / 10000)\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Le duel de dés",
          contenu: `
            <p>Deux joueurs lancent chacun un dé ; le plus grand score gagne, l'égalité est
            un match nul.</p>
            <p>Écris <code>duel()</code> qui renvoie <code>1</code>, <code>2</code> ou
            <code>0</code> (match nul), puis affiche les trois fréquences sur 30 000
            duels :</p>
            <pre class="bloc-code"><code>Joueur 1 : 0.4166
Joueur 2 : 0.4171
Match nul : 0.1663</code></pre>
            <p>La théorie prédit 15/36 ≈ 0,417 pour chaque joueur et 6/36 ≈ 0,167 pour le
            match nul.</p>`,
          depart: `from random import randint\n\ndef duel():\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le numéro du gagnant." },
              { motif: "\\belif\\b", message: "Trois issues possibles : il te faut un elif." },
            ],
            tests: `issues = [duel() for essai in range(3000)]\nassert set(issues) == {0, 1, 2}, "les trois issues doivent pouvoir se produire"\nassert 1000 < issues.count(1) < 1500, "le joueur 1 doit gagner environ 42 % du temps"\nassert 350 < issues.count(0) < 650, "le match nul doit survenir environ 17 % du temps"`,
            sortieRegex: "Joueur 1 : 0\\.4\\d*\\nJoueur 2 : 0\\.4\\d*\\nMatch nul : 0\\.1\\d*",
            sortieRegexMessage: "Les trois fréquences doivent tomber autour de 0.417, 0.417 et 0.167.",
          },
          felicitation: "Trois fréquences, trois prédictions théoriques vérifiées. 🎲⚔️",
          indices: [
            "Dans <code>duel</code> : deux lancers, puis <code>if de1 > de2: return 1</code>, <code>elif de2 > de1: return 2</code>, sinon <code>return 0</code>.",
            "Ensuite, trois compteurs et une seule boucle de 30 000 tours.",
            "Range le résultat du duel dans une variable avant de le tester : sinon tu relancerais les dés à chaque test.",
          ],
          solution: `from random import randint\n\ndef duel():\n    de1 = randint(1, 6)\n    de2 = randint(1, 6)\n    if de1 > de2:\n        return 1\n    elif de2 > de1:\n        return 2\n    return 0\n\nun = 0\ndeux = 0\nnul = 0\n\nfor essai in range(30000):\n    resultat = duel()\n    if resultat == 1:\n        un = un + 1\n    elif resultat == 2:\n        deux = deux + 1\n    else:\n        nul = nul + 1\n\nprint("Joueur 1 :", un / 30000)\nprint("Joueur 2 :", deux / 30000)\nprint("Match nul :", nul / 30000)\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "La loi des grands nombres, en image",
          contenu: `
            <p>Reprends la fréquence des 6, mais affiche-la <strong>au fil des lancers</strong>,
            tous les 1000 essais, avec une barre proportionnelle :</p>
            <pre class="bloc-code"><code>1000 | 0.171 |#################
2000 | 0.1665 |################
3000 | 0.1673 |################
...
10000 | 0.1668 |################</code></pre>
            <p>La longueur de la barre vaut <code>int(frequence * 100)</code> dièses.
            Regarde-la se stabiliser.</p>`,
          depart: `from random import randint\n\nsix = 0\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut une boucle sur les 10 000 lancers." },
              { motif: "%\\s*1000\\s*==\\s*0", message: "Pour afficher tous les 1000 essais, teste le reste de la division par 1000." },
              { motif: "\\*\\s*100|int\\s*\\(", message: "La barre se construit avec int(frequence * 100) dièses." },
            ],
            sortieRegex: "10000 \\| 0\\.1[5-8]\\d* \\|#{15,18}$",
            sortieRegexMessage: "La dernière ligne doit afficher 10000, une fréquence proche de 0.167 et une barre d'environ 16 dièses.",
          },
          felicitation: "La loi des grands nombres, visible d'un coup d'œil. 📉",
          indices: [
            "La boucle va de 1 à 10 000 : <code>for essai in range(1, 10001):</code>.",
            "<code>if essai % 1000 == 0:</code> déclenche l'affichage.",
            "<code>frequence = six / essai</code> puis <code>print(essai, \"|\", frequence, \"|\" + \"#\" * int(frequence * 100))</code>.",
          ],
          solution: `from random import randint\n\nsix = 0\n\nfor essai in range(1, 10001):\n    if randint(1, 6) == 6:\n        six = six + 1\n    if essai % 1000 == 0:\n        frequence = six / essai\n        print(essai, "|", frequence, "|" + "#" * int(frequence * 100))\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ta simulation à toi",
          contenu: `
            <p>Défi libre. Écris une simulation complète : une <strong>fonction</strong> qui
            réalise une expérience aléatoire, une <strong>boucle</strong> qui la répète au
            moins 1000 fois, et l'affichage d'une <strong>fréquence</strong>.</p>
            <p>Des idées : la probabilité d'obtenir au moins un 6 en trois lancers, le nombre
            moyen de cartes à tirer avant un as, la proportion de familles de trois enfants
            avec au moins une fille, un jeu de morpion joué au hasard…</p>`,
          depart: `from random import randint\n\n# Ta simulation\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\b", message: "Ta simulation doit définir une fonction d'expérience." },
              { motif: "randint|random", message: "Il faut du hasard." },
              { motif: "range\\s*\\(\\s*\\d{4,}", message: "Répète l'expérience au moins 1000 fois." },
              { motif: "/", message: "Affiche une fréquence, donc une division." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 9 terminée, fiche T8 bouclée. Tu as vu tout le Python de la Seconde. 🏁",
          indices: [
            "Structure : <code>def experience(): …</code>, un compteur, une boucle, une division.",
            "Exemple : au moins un 6 en trois lancers — la probabilité théorique vaut 1 − (5/6)³ ≈ 0,42.",
          ],
          solution: `from random import randint\n\ndef au_moins_un_six():\n    for lancer in range(3):\n        if randint(1, 6) == 6:\n            return True\n    return False\n\nsucces = 0\nfor essai in range(10000):\n    if au_moins_un_six():\n        succes = succes + 1\n\nprint("Fréquence :", succes / 10000)\nprint("Théorie : environ 0.4213")\n`,
        },
      ],
    },
  ],
};

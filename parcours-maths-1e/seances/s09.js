/* Maths Première — séance 9 : le défi final.
 * Aucune notion nouvelle : huit défis qui combinent fonctions, boucles,
 * conditions et listes, sur des thèmes du programme de Première (second
 * degré, arithmétique, variables aléatoires, suites, simulation, Pascal).
 * Seule séance du parcours à n'avoir qu'une partie « défis ».
 */

export default {
  id: "s09",
  numero: 9,
  titre: "Le défi final",
  sousTitre: "Tout ensemble : fonctions, boucles et listes au service des maths",
  palier: "Partie 3 — Le défi final",

  accroche: `Plus de cours, plus de découverte : huit défis, du plus accessible au plus
    corsé, qui mélangent tout ce que tu as appris. Chacun reprend un thème du programme de
    Première — trinômes, diviseurs, espérance, suites, simulation. Prends ton temps : les
    coups de pouce sont toujours là, et le dernier défi, c'est toi qui choisis son sujet.`,

  objectifs: [
    "écrire des fonctions qui <strong>renvoient une liste</strong>",
    "combiner boucles, conditions et listes dans un même programme",
    "traduire une définition ou un algorithme mathématique en Python",
    "concevoir un programme <strong>de A à Z</strong>, sur le sujet de ton choix",
  ],

  motDeLaFin: `Bravo : tu as terminé le parcours. Tu sais maintenant écrire en Python les
    algorithmes du programme de Première — termes et seuils de suites, racines d'un
    trinôme, espérance, simulation — et manipuler des listes avec aisance. Garde ce réflexe
    pour la suite : quand un calcul se répète, une boucle ; quand des valeurs vont
    ensemble, une liste.`,

  parties: [

    /* ================================ DÉFIS ================================= */
    {
      id: "defis",
      titre: "Défis",
      minutes: 90,
      etoiles: 3,
      intention: "tout ce que tu sais, à ton rythme",
      etapes: [

        {
          id: "x1",
          type: "code",
          titre: "Les racines d'un trinôme, dans une liste",
          contenu: `
            <p>Écris la fonction <code>racines(a, b, c)</code> qui renvoie la
            <strong>liste</strong> des racines réelles du trinôme
            <em>ax</em>² + <em>bx</em> + <em>c</em> :</p>
            <ul>
              <li>si Δ &gt; 0 : la liste <code>[x1, x2]</code>, avec
              <em>x</em><sub>1</sub> = (−<em>b</em> − √Δ) / (2<em>a</em>) en premier ;</li>
              <li>si Δ = 0 : une liste d'un seul élément, la racine double ;</li>
              <li>si Δ &lt; 0 : la liste vide.</li>
            </ul>
            <pre class="bloc-code"><code>racines(1, -5, 6)    # renvoie [2.0, 3.0]
racines(1, -2, 1)    # renvoie [1.0]
racines(1, 2, 5)     # renvoie []</code></pre>
            <p>Termine en affichant <code>racines(2, -3, -5)</code>.</p>`,
          depart: `from math import sqrt\n\n\ndef racines(a, b, c):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bif\\b", message: "Le résultat dépend du signe de Δ : il faut un if." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer une liste avec return." },
              { motif: "print\\s*\\(\\s*racines\\s*\\(\\s*2\\s*,\\s*-\\s*3\\s*,\\s*-\\s*5\\s*\\)\\s*\\)", message: "Termine en affichant racines(2, -3, -5)." },
            ],
            sortie: "[-1.0, 2.5]",
            tests: `assert racines(1, -5, 6) == [2.0, 3.0], "racines(1, -5, 6) doit renvoyer [2.0, 3.0]"\nassert racines(1, -2, 1) == [1.0], "racines(1, -2, 1) doit renvoyer [1.0] : une seule racine, dans une liste"\nassert racines(1, 2, 5) == [], "racines(1, 2, 5) doit renvoyer la liste vide []"\nassert racines(2, -3, -5) == [-1.0, 2.5], "racines(2, -3, -5) doit renvoyer [-1.0, 2.5]"`,
          },
          felicitation: "Zéro, une ou deux racines : la longueur de la liste dit tout. 🏆",
          indices: [
            "Commence par calculer le discriminant dans une variable, puis reprends la structure <code>if</code> / <code>elif</code> / <code>else</code> de la séance 2.",
            "Chaque bloc <strong>renvoie</strong> une liste : deux éléments entre crochets, un seul élément, ou des crochets vides.",
            "Si Δ &gt; 0 : <code>return [x1, x2]</code> après avoir calculé les deux racines. Si Δ = 0 : une liste contenant <code>-b / (2 * a)</code>. Sinon : <code>return []</code>.",
          ],
          apres: `<span class="chapo">Une réponse toujours du même type</span>
            Que le trinôme ait 0, 1 ou 2 racines, la fonction renvoie toujours une liste.
            On peut donc écrire <code>len(racines(a, b, c))</code> pour compter les
            racines, ou parcourir la liste pour les afficher, sans se soucier du cas.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Les nombres parfaits",
          contenu: `
            <p>Un nombre est <strong>parfait</strong> s'il est égal à la somme de ses
            diviseurs autres que lui-même. Par exemple 6 = 1 + 2 + 3.</p>
            <p>La fonction <code>diviseurs</code> est déjà écrite. Construis la liste
            <code>parfaits</code> des nombres parfaits compris entre 2 et 999, puis
            affiche-la :</p>
            <pre class="bloc-code"><code>[6, 28, 496]</code></pre>`,
          depart: `def diviseurs(n):\n    return [k for k in range(1, n + 1) if n % k == 0]\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bparfaits\\s*=", message: "Range le résultat dans une liste parfaits." },
              { motif: "sum\\s*\\(\\s*diviseurs\\s*\\(", message: "Utilise sum(diviseurs(n)) pour additionner les diviseurs." },
              { motif: "range\\s*\\(\\s*(1|2)\\s*,\\s*1000\\s*\\)", message: "Teste les nombres jusqu'à 999 : range(2, 1000)." },
              { motif: "print\\s*\\(\\s*parfaits\\s*\\)", message: "Affiche parfaits." },
            ],
            codeAbsent: [
              { motif: "\\b496\\b", message: "Les nombres parfaits doivent être trouvés par Python." },
            ],
            sortie: "[6, 28, 496]",
          },
          felicitation: "Trois nombres parfaits sous 1 000 — le suivant est 8 128. ✨",
          indices: [
            "<code>sum(diviseurs(n))</code> additionne <strong>tous</strong> les diviseurs, <code>n</code> compris. Pour ne pas le compter, retire-le.",
            "<code>n</code> est parfait si <code>sum(diviseurs(n)) - n == n</code>.",
            "Une compréhension suffit : les <code>n</code> de <code>range(2, 1000)</code> qui vérifient cette condition.",
          ],
        },

        {
          id: "x3",
          type: "code",
          titre: "L'espérance d'une variable aléatoire",
          contenu: `
            <p>Une variable aléatoire <em>X</em> prend les valeurs
            <em>x</em><sub>1</sub>, …, <em>x<sub>n</sub></em> avec les probabilités
            <em>p</em><sub>1</sub>, …, <em>p<sub>n</sub></em>. Son espérance est
            <strong>E(<em>X</em>) = <em>x</em><sub>1</sub><em>p</em><sub>1</sub> + … +
            <em>x<sub>n</sub>p<sub>n</sub></em></strong>.</p>
            <p>Écris la fonction <code>esperance(valeurs, probas)</code> qui reçoit les
            deux listes, de même longueur, et renvoie l'espérance.</p>
            <p>Exemple : un jeu à gratter rapporte 0 € avec une probabilité 0,7, 10 € avec
            une probabilité 0,25, et 50 € avec une probabilité 0,05. Affiche le gain
            moyen :</p>
            <pre class="bloc-code"><code>5.0</code></pre>`,
          depart: `def esperance(valeurs, probas):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Parcours les deux listes avec une boucle." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer l'espérance avec return." },
              { motif: "print\\s*\\(\\s*esperance\\s*\\(", message: "Termine en affichant l'espérance du jeu à gratter." },
            ],
            sortie: "5.0",
            tests: `assert abs(esperance([0, 10, 50], [0.7, 0.25, 0.05]) - 5) < 1e-9, "le gain moyen du jeu à gratter est 5 euros"\nassert abs(esperance([1, 2, 3, 4, 5, 6], [1/6] * 6) - 3.5) < 1e-9, "l'espérance d'un dé équilibré est 3.5"\nassert abs(esperance([-2, 3], [0.6, 0.4])) < 1e-9, "l'espérance de -2 (proba 0.6) et 3 (proba 0.4) est 0 : le jeu est équitable"`,
          },
          felicitation: "Un algorithme du programme de Première, exactement : l'espérance. 🎲",
          indices: [
            "Il faut associer chaque valeur à <strong>sa</strong> probabilité : parcours les indices, avec <code>range(len(valeurs))</code>.",
            "Un accumulateur à 0, auquel on ajoute à chaque tour le produit <code>valeurs[i] * probas[i]</code>.",
            "Après la boucle, la fonction renvoie l'accumulateur. Pour l'affichage, un <code>print</code> de l'appel de la fonction, avec la liste des gains puis celle des probabilités.",
          ],
          apres: `<span class="chapo">Un jeu équitable ?</span>
            Si le ticket coûte 5 €, l'espérance du gain <em>net</em> est nulle : en
            moyenne, on ne gagne ni ne perd. S'il coûte plus, le jeu est défavorable au
            joueur — c'est le cas de tous les jeux d'argent réels.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Approcher √2",
          contenu: `
            <p>La suite définie par <em>u</em><sub>0</sub> = 1 et
            <strong><em>u</em><sub><em>n</em>+1</sub> = (<em>u<sub>n</sub></em> + 2 /
            <em>u<sub>n</sub></em>) / 2</strong> se rapproche très vite de √2. C'est la
            <em>méthode de Héron</em>, connue depuis l'Antiquité.</p>
            <p>Écris la fonction <code>heron(n)</code> qui renvoie la liste des termes
            <em>u</em><sub>0</sub> à <em>u<sub>n</sub></em>. Termine en affichant
            <code>heron(5)</code>, et compare le dernier terme avec √2 ≈
            1,4142135623730951.</p>
            <pre class="bloc-code"><code>heron(2)    # renvoie [1, 1.5, 1.4166666666666665]</code></pre>`,
          depart: `def heron(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Utilise une boucle pour calculer les termes un par un." },
              { motif: "\\.append\\s*\\(", message: "Remplis la liste avec append." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la liste avec return." },
              { motif: "print\\s*\\(\\s*heron\\s*\\(\\s*5\\s*\\)\\s*\\)", message: "Termine en affichant heron(5)." },
            ],
            sortieNonVide: true,
            tests: `_h = heron(5)\nassert len(_h) == 6, "heron(5) doit contenir six termes, de u0 à u5"\nassert _h[0] == 1 and _h[1] == 1.5, "les deux premiers termes sont 1 et 1.5"\nassert abs(_h[-1] - 2 ** 0.5) < 1e-12, "le dernier terme doit être très proche de racine de 2"\nassert heron(0) == [1], "heron(0) doit renvoyer [1]"`,
          },
          felicitation: "Cinq étapes suffisent pour quinze décimales exactes. 🏛️",
          indices: [
            "C'est le schéma de la séance 6 pour une suite récurrente : une liste qui contient <em>u</em><sub>0</sub>, puis une boucle de <code>n</code> tours qui ajoute le terme suivant.",
            "Le terme suivant se calcule à partir du dernier élément de la liste, <code>L[-1]</code>.",
            "Dans la boucle : <code>L.append(…)</code> avec, entre les parenthèses, la moyenne de <code>L[-1]</code> et de <code>2 / L[-1]</code>. Le <code>return L</code> vient après la boucle.",
          ],
          apres: `<span class="chapo">Pourquoi ça marche ?</span>
            Si <em>u</em> est un peu trop grand, 2 / <em>u</em> est un peu trop petit, et
            leur moyenne tombe entre les deux, plus près de √2. Remplace 2 par 3 dans la
            formule, et la suite approche √3.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "La suite de Syracuse",
          contenu: `
            <p>On part d'un entier <em>n</em> ⩾ 1. S'il est pair, on le divise par 2 ;
            s'il est impair, on le multiplie par 3 et on ajoute 1. On recommence
            jusqu'à tomber sur 1.</p>
            <p>Écris la fonction <code>syracuse(n)</code> qui renvoie la liste de toutes
            les valeurs obtenues, de <em>n</em> jusqu'à 1 compris. On rappelle que
            <code>n % 2 == 0</code> teste si <code>n</code> est pair, et que
            <code>n // 2</code> donne la moitié entière de <code>n</code>.</p>
            <pre class="bloc-code"><code>syracuse(6)    # renvoie [6, 3, 10, 5, 16, 8, 4, 2, 1]</code></pre>
            <p>Termine en affichant le nombre de valeurs de <code>syracuse(27)</code>, puis
            la plus grande d'entre elles :</p>
            <pre class="bloc-code"><code>112
9232</code></pre>`,
          depart: `def syracuse(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bwhile\\b", message: "On ne sait pas combien d'étapes il faudra : utilise une boucle while." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la liste avec return." },
              { motif: "len\\s*\\(\\s*syracuse\\s*\\(\\s*27\\s*\\)\\s*\\)", message: "Affiche len(syracuse(27))." },
              { motif: "max\\s*\\(\\s*syracuse\\s*\\(\\s*27\\s*\\)\\s*\\)", message: "Affiche max(syracuse(27))." },
            ],
            codeAbsent: [
              { motif: "\\b(112|9232)\\b", message: "Les résultats doivent être calculés par Python." },
            ],
            sortie: "112\n9232",
            tests: `assert syracuse(6) == [6, 3, 10, 5, 16, 8, 4, 2, 1], "syracuse(6) doit renvoyer [6, 3, 10, 5, 16, 8, 4, 2, 1]"\nassert syracuse(1) == [1], "syracuse(1) doit renvoyer [1] : on est déjà arrivé"\nassert syracuse(8) == [8, 4, 2, 1], "syracuse(8) doit renvoyer [8, 4, 2, 1]"`,
          },
          felicitation: "Partir de 27, monter jusqu'à 9 232, et retomber sur 1 en 111 étapes. 🎢",
          indices: [
            "La liste commence par <code>[n]</code>. Puis une boucle <code>while</code> qui continue tant que <code>n</code> est différent de 1.",
            "Dans la boucle : un <code>if … else</code> sur la parité de <code>n</code>, qui met <code>n</code> à jour, puis un <code>append</code> de la nouvelle valeur.",
            "Pair : <code>n = n // 2</code> ; impair : <code>n = 3 * n + 1</code>. L'<code>append(n)</code> vient après le <code>if … else</code>, toujours dans la boucle, et le <code>return</code> après la boucle.",
          ],
          apres: `<span class="chapo">Un problème ouvert</span>
            Personne n'a jamais trouvé d'entier dont la suite ne retombe pas sur 1… mais
            personne n'a jamais démontré que c'est toujours le cas. C'est la
            <strong>conjecture de Syracuse</strong>, posée en 1937 et toujours pas
            résolue.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Simuler un dé",
          contenu: `
            <p>La fonction <code>randint(1, 6)</code> du module <code>random</code> tire
            un entier au hasard entre 1 et 6, comme un dé équilibré.</p>
            <p>Écris la fonction <code>frequence_six(n)</code> qui simule <code>n</code>
            lancers, range les résultats dans une liste, et renvoie la
            <strong>fréquence</strong> des 6 obtenus. Termine en affichant
            <code>frequence_six(10000)</code>.</p>
            <p>La valeur change à chaque exécution, mais elle doit être proche de
            1/6 ≈ 0,167.</p>`,
          depart: `from random import randint\n\n\ndef frequence_six(n):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "randint\\s*\\(\\s*1\\s*,\\s*6\\s*\\)", message: "Chaque lancer se simule avec randint(1, 6)." },
              { motif: "\\.append\\s*\\(|\\[[^\\n]*randint[^\\n]*\\bfor\\b", message: "Range les résultats des lancers dans une liste." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la fréquence avec return." },
              { motif: "print\\s*\\(\\s*frequence_six\\s*\\(\\s*10000\\s*\\)\\s*\\)", message: "Termine en affichant frequence_six(10000)." },
            ],
            sortieNonVide: true,
            tests: `_f = frequence_six(10000)\nassert 0 <= _f <= 1, "une fréquence est toujours comprise entre 0 et 1"\nassert abs(_f - 1 / 6) < 0.03, "sur 10 000 lancers, la fréquence des 6 doit être proche de 1/6"`,
          },
          felicitation: "La fréquence se rapproche de la probabilité : c'est la loi des grands nombres. 🎲",
          indices: [
            "Remplis une liste avec <code>n</code> résultats de <code>randint(1, 6)</code> — par une boucle et <code>append</code>, ou par une compréhension.",
            "Compte ensuite les 6 de la liste, avec un compteur, ou avec une compréhension filtrée et <code>len</code>.",
            "La fréquence, c'est le nombre de 6 divisé par <code>n</code>. C'est ce que la fonction renvoie.",
          ],
          apres: `<span class="chapo">Essaie avec moins de lancers</span>
            Avec <code>frequence_six(10)</code>, la fréquence varie énormément d'une
            exécution à l'autre ; avec 10 000 lancers, elle reste très près de 0,167.
            Plus l'échantillon est grand, moins la fréquence fluctue.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "Le triangle de Pascal",
          contenu: `
            <p>Chaque ligne du triangle de Pascal commence et finit par 1 ; entre les
            deux, chaque nombre est la <strong>somme des deux nombres situés au-dessus
            de lui</strong> dans la ligne précédente :</p>
            <pre class="bloc-code sans-copie"><code>[1]
[1, 1]
[1, 2, 1]
[1, 3, 3, 1]
[1, 4, 6, 4, 1]</code></pre>
            <p>Écris la fonction <code>ligne_suivante(L)</code> qui reçoit une ligne et
            renvoie la suivante. Puis, en partant de <code>[1]</code>, affiche les
            <strong>sept</strong> premières lignes du triangle, une par ligne.</p>`,
          depart: `def ligne_suivante(L):\n    pass\n\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la nouvelle ligne avec return." },
              { motif: "\\bfor\\b[\\s\\S]*\\bfor\\b", message: "Il faut une boucle dans la fonction, et une autre pour afficher les sept lignes." },
            ],
            sortie: "[1]\n[1, 1]\n[1, 2, 1]\n[1, 3, 3, 1]\n[1, 4, 6, 4, 1]\n[1, 5, 10, 10, 5, 1]\n[1, 6, 15, 20, 15, 6, 1]",
            tests: `assert ligne_suivante([1]) == [1, 1], "après [1] vient [1, 1]"\nassert ligne_suivante([1, 3, 3, 1]) == [1, 4, 6, 4, 1], "après [1, 3, 3, 1] vient [1, 4, 6, 4, 1]"\nassert ligne_suivante([1, 1]) == [1, 2, 1], "après [1, 1] vient [1, 2, 1]"`,
          },
          felicitation: "Chaque ligne fabriquée à partir de la précédente : une suite… de listes. 🔺",
          indices: [
            "La nouvelle ligne commence par <code>[1]</code>. Puis, pour chaque indice <code>i</code> de 0 à <code>len(L) - 2</code>, on ajoute <code>L[i] + L[i + 1]</code>. Enfin, on ajoute un 1.",
            "Les indices <code>i</code> s'obtiennent avec <code>range(len(L) - 1)</code>, comme pour les écarts entre termes de la séance 7.",
            "Pour l'affichage : <code>ligne</code> reçoit <code>[1]</code>, puis une boucle de sept tours qui affiche <code>ligne</code>, puis la remplace par <code>ligne_suivante(ligne)</code>.",
          ],
          apres: `<span class="chapo">Les coefficients binomiaux</span>
            La ligne [1, 4, 6, 4, 1] donne le nombre de chemins d'un arbre de 4 épreuves de
            Bernoulli : 1 chemin avec 0 succès, 4 avec 1 succès, 6 avec 2 succès…
            Tu retrouveras ces nombres dans le chapitre sur les épreuves de Bernoulli.`,
        },

        {
          id: "x8",
          type: "code",
          titre: "Ton propre programme",
          contenu: `
            <p>À toi de choisir le sujet, parmi tes cours de maths de l'année : une suite,
            un trinôme, une fonction, des probabilités, des statistiques… Par exemple :
            la liste des termes d'une suite jusqu'à un seuil, un tableau de signes, les
            multiples communs à deux nombres, la variance d'une série…</p>
            <p>Ton programme doit contenir :</p>
            <ul>
              <li>au moins une <strong>fonction</strong> qui renvoie un résultat avec
              <code>return</code> ;</li>
              <li>au moins une <strong>liste</strong>, construite par une boucle avec
              <code>append</code> ou en compréhension ;</li>
              <li>au moins un <strong>affichage</strong> du résultat.</li>
            </ul>`,
          depart: `# Ton programme ici\n\n`,
          validation: {
            codeContient: [
              { motif: "\\bdef\\s+\\w+\\s*\\(", message: "Écris au moins une fonction avec def." },
              { motif: "\\breturn\\b", message: "Ta fonction doit renvoyer un résultat avec return." },
              { motif: "\\.append\\s*\\(|\\[[^\\n\\]]*\\bfor\\b", message: "Construis au moins une liste, avec append ou en compréhension." },
              { motif: "\\bprint\\s*\\(", message: "Affiche le résultat avec print." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Ton programme, ton sujet : tu sais maintenant mettre Python au service des maths. 🎓",
          indices: [
            "Pars d'un calcul que tu fais souvent à la main en cours. Que pourrait faire Python à ta place, pour plusieurs valeurs à la fois ?",
            "Une structure qui marche toujours : une fonction qui renvoie une liste (de termes, d'images, de diviseurs…), puis un <code>print</code> de l'appel de cette fonction.",
          ],
        },
      ],
    },
  ],
};

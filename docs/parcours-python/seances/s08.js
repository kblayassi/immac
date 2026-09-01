/* Séance 8 — Fonctions à plusieurs arguments.
 * Fiche T8. Prérequis : séance 7.
 * Porte les algorithmes exigibles des chapitres 11 (multiples) et 12 (droites),
 * et la capacité « lire une fonction renvoyant une moyenne » du chapitre 5.
 */

export default {
  id: "s08",
  numero: 8,
  titre: "Fonctions à plusieurs arguments",
  sousTitre: "Lire, modifier et compléter du code",
  palier: "T8 — Fonctions et aléatoire",

  accroche: `Une fonction peut recevoir autant d'informations qu'on veut. C'est ce qui
    permet d'écrire de vrais outils mathématiques — et de comprendre le code que
    quelqu'un d'autre a écrit, ce qui est au moins aussi important.`,

  objectifs: [
    "écrire une fonction à deux ou trois paramètres",
    "faire attention à l'<strong>ordre</strong> des arguments",
    "lire et comprendre une fonction que tu ne saurais pas encore écrire",
    "compléter et modifier un programme existant",
  ],

  motDeLaFin: `Tes fonctions savent tout faire. À la séance 9, on leur ajoute la
    dernière pièce du programme : le hasard.`,

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
          titre: "Plusieurs paramètres, séparés par des virgules",
          contenu: `
            <p>La syntaxe ne change presque pas : on sépare les paramètres par des virgules,
            dans la définition comme dans l'appel.</p>

            <pre class="bloc-code"><code>def aire_rectangle(longueur, largeur):
    return longueur * largeur

print(aire_rectangle(12, 7))     # 84</code></pre>

            <p>À l'appel, Python fait la correspondance <strong>dans l'ordre</strong> :
            le premier argument va au premier paramètre, le deuxième au deuxième.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'ordre n'est pas décoratif</span>
              <code>aire_rectangle(12, 7)</code> et <code>aire_rectangle(7, 12)</code>
              donnent ici le même résultat, parce que la multiplication est commutative.
              Mais avec <code>puissance(2, 10)</code> et <code>puissance(10, 2)</code>,
              l'écart est de 1024 contre 100. Inverser deux arguments est une erreur
              silencieuse : le programme tourne, et donne faux.
            </div>

            <p>Le nombre d'arguments doit correspondre exactement, sinon Python refuse :
            <code>TypeError: aire_rectangle() missing 1 required positional argument</code>.</p>`,
        },

        {
          id: "d2",
          type: "code",
          titre: "Deux paramètres",
          contenu: `
            <p>Écris <code>aire_rectangle(longueur, largeur)</code> qui renvoie l'aire,
            puis affiche un petit tableau :</p>
            <pre class="bloc-code"><code>12 x 7 = 84
5 x 5 = 25
10 x 3 = 30</code></pre>`,
          depart: `def aire_rectangle(longueur, largeur):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+aire_rectangle\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir deux paramètres." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer l'aire." },
            ],
            tests: `assert aire_rectangle(12, 7) == 84, "aire_rectangle(12, 7) doit valoir 84"\nassert aire_rectangle(1, 1) == 1, "aire_rectangle(1, 1) doit valoir 1"`,
            sortie: "12 x 7 = 84\n5 x 5 = 25\n10 x 3 = 30",
          },
          felicitation: "Deux paramètres, trois appels. 📐",
          indices: [
            "<code>return longueur * largeur</code>",
            "Puis trois lignes du type <code>print(12, \"x\", 7, \"=\", aire_rectangle(12, 7))</code>.",
          ],
          solution: `def aire_rectangle(longueur, largeur):\n    return longueur * largeur\n\nprint(12, "x", 7, "=", aire_rectangle(12, 7))\nprint(5, "x", 5, "=", aire_rectangle(5, 5))\nprint(10, "x", 3, "=", aire_rectangle(10, 3))\n`,
        },

        {
          id: "d3",
          type: "prediction",
          titre: "L'ordre des arguments",
          contenu: `<p>Une fonction qui calcule le pourcentage d'une valeur.</p>`,
          code: `def pourcentage(taux, valeur):\n    return valeur * taux / 100\n\nprint(pourcentage(200, 10))`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>20.0</code>",
              explication: "Ce serait 10 % de 200. Mais regarde l'ordre des paramètres dans la définition." },
            { texte: "<code>2000.0</code>", correct: true,
              explication: "Oui : <code>taux</code> reçoit 200 et <code>valeur</code> reçoit 10. Le calcul est 10 × 200 / 100." },
            { texte: "Une <code>TypeError</code>",
              explication: "Non : il y a bien deux arguments pour deux paramètres, Python ne peut pas deviner l'intention." },
            { texte: "<code>10.0</code>",
              explication: "Non, refais le calcul avec l'ordre réel des paramètres." },
          ],
          apres: `<span class="chapo">Le bug le plus sournois</span>
            Python ne peut pas savoir que tu voulais dire autre chose. Le programme tourne,
            il affiche un résultat, et ce résultat est faux. Relis toujours l'ordre des
            paramètres dans la <em>définition</em> avant d'appeler.`,
        },

        {
          id: "d4",
          type: "code",
          titre: "Trois paramètres",
          contenu: `
            <p>Écris <code>moyenne(a, b, c)</code> qui renvoie la moyenne de trois nombres,
            puis affiche celle de 12, 15 et 9 :</p>
            <pre class="bloc-code"><code>Moyenne : 12.0</code></pre>`,
          depart: `def moyenne(a, b, c):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+moyenne\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit avoir trois paramètres." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la moyenne." },
            ],
            tests: `assert moyenne(12, 15, 9) == 12, "la moyenne de 12, 15 et 9 vaut 12"\nassert moyenne(0, 0, 0) == 0, "la moyenne de trois zéros vaut 0"\nassert moyenne(10, 20, 30) == 20, "la moyenne de 10, 20 et 30 vaut 20"`,
            sortie: "Moyenne : 12.0",
          },
          indices: [
            "Attention aux parenthèses : <code>return (a + b + c) / 3</code>.",
            "Sans elles, seul <code>c</code> serait divisé.",
          ],
          solution: `def moyenne(a, b, c):\n    return (a + b + c) / 3\n\nprint("Moyenne :", moyenne(12, 15, 9))\n`,
        },

        {
          id: "d5",
          type: "cours",
          titre: "Lire du code qu'on ne saurait pas écrire",
          contenu: `
            <p>Une compétence à part entière, et une capacité explicitement attendue par le
            programme : <strong>lire, comprendre, modifier ou compléter</strong> un programme
            écrit par quelqu'un d'autre.</p>

            <p>Voici la fonction que ton cours de mathématiques utilise pour calculer la
            moyenne d'une série statistique :</p>

            <pre class="bloc-code"><code>def moyenne(valeurs):
    somme = 0
    for v in valeurs:
        somme = somme + v
    return somme / len(valeurs)

notes = [12, 15, 9, 18, 11]
print(moyenne(notes))         # 13.0</code></pre>

            <p>Deux choses te sont inconnues :</p>
            <ul>
              <li><code>[12, 15, 9, 18, 11]</code> est une <strong>liste</strong> : plusieurs
                valeurs rangées dans une seule variable ;</li>
              <li><code>for v in valeurs:</code> parcourt les éléments de la liste
                <em>un par un</em>, sans passer par <code>range</code> ;
                <code>len(valeurs)</code> donne combien il y en a.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ce qu'il faut retenir</span>
              Tu n'as pas à savoir écrire cela cette année. Mais tu dois savoir le
              <strong>lire</strong> : reconnaître l'accumulateur, la boucle, le
              <code>return</code>. Or tout cela, tu le connais déjà — seul l'habillage change.
            </div>`,
        },

        {
          id: "d6",
          type: "qcm",
          titre: "Comprendre une fonction statistique",
          contenu: `<p>Voici une variante de la fonction précédente. Lis-la attentivement.</p>
            <pre class="bloc-code"><code>def mystere(valeurs):
    resultat = valeurs[0]
    for v in valeurs:
        if v &gt; resultat:
            resultat = v
    return resultat</code></pre>
            <p><em>(<code>valeurs[0]</code> désigne le premier élément de la liste.)</em></p>`,
          question: "Que renvoie cette fonction ?",
          options: [
            { texte: "La somme des valeurs",
              explication: "Non : il n'y a aucune addition dans cette fonction." },
            { texte: "La plus grande des valeurs", correct: true,
              explication: "Oui. C'est l'algorithme du champion de la séance 5 : on part du premier, et on le remplace dès qu'on trouve mieux." },
            { texte: "La moyenne des valeurs",
              explication: "Non : il n'y a ni somme ni division." },
            { texte: "Le nombre de valeurs",
              explication: "Non : ce serait un compteur, or <code>resultat</code> reçoit des valeurs, pas des incréments." },
          ],
          apres: `<span class="chapo">Tu sais déjà tout lire</span>
            Un accumulateur, une boucle, un test, un <code>return</code>. Les listes ne
            changent rien à la mécanique — et tu viens de le prouver.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Compléter un programme existant",
          contenu: `
            <p>Cette fonction devrait dire si un entier <code>a</code> est un multiple d'un
            entier <code>b</code>. Il manque une ligne. <strong>Complète-la</strong> sans
            rien changer d'autre.</p>
            <p><em>Cet algorithme est exigible au chapitre 11 de maths.</em></p>`,
          depart: `def est_multiple(a, b):\n    # Renvoie True si a est un multiple de b\n    \n\nprint(est_multiple(91, 7))\n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "Il manque la ligne qui renvoie le résultat." },
              { motif: "%", message: "Le test de divisibilité utilise le reste." },
            ],
            tests: `assert est_multiple(91, 7) == True, "91 est un multiple de 7"\nassert est_multiple(91, 5) == False, "91 n'est pas un multiple de 5"\nassert est_multiple(0, 5) == True, "0 est multiple de tout entier non nul"\nassert est_multiple(12, 12) == True, "un nombre est multiple de lui-même"`,
            sortie: "True",
          },
          felicitation: "Chapitre 11 de maths, premier algorithme validé. 🔍",
          indices: [
            "Une seule ligne à écrire, décalée de quatre espaces.",
            "<code>return a % b == 0</code>",
          ],
          solution: `def est_multiple(a, b):\n    # Renvoie True si a est un multiple de b\n    return a % b == 0\n\nprint(est_multiple(91, 7))\n`,
        },

        {
          id: "d8",
          type: "code",
          titre: "Le plus grand multiple",
          contenu: `
            <p>Second algorithme du chapitre 11 : pour deux entiers <code>a</code> et
            <code>b</code>, trouver <strong>le plus grand multiple de <code>a</code>
            inférieur ou égal à <code>b</code></strong>.</p>
            <p>Exemple : le plus grand multiple de 7 inférieur ou égal à 100 est 98.</p>
            <p>Écris <code>plus_grand_multiple(a, b)</code>. Une boucle est possible, mais
            il y a bien plus court : réfléchis à ce que donne <code>b // a</code>.</p>`,
          depart: `def plus_grand_multiple(a, b):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le multiple trouvé." },
            ],
            tests: `assert plus_grand_multiple(7, 100) == 98, "le plus grand multiple de 7 sous 100 est 98"\nassert plus_grand_multiple(5, 20) == 20, "20 est un multiple de 5, donc il convient"\nassert plus_grand_multiple(3, 10) == 9, "le plus grand multiple de 3 sous 10 est 9"\nassert plus_grand_multiple(1, 42) == 42, "tout entier est multiple de 1"`,
          },
          felicitation: "Une ligne là où beaucoup écrivent une boucle. 🎯",
          indices: [
            "<code>100 // 7</code> vaut 14 : c'est le nombre de fois que 7 tient dans 100.",
            "Il suffit donc de multiplier ce quotient par <code>a</code>.",
            "<code>return (b // a) * a</code>",
          ],
          solution: `def plus_grand_multiple(a, b):\n    return (b // a) * a\n`,
        },

        {
          id: "d9",
          type: "code",
          titre: "Trois points sont-ils alignés ?",
          contenu: `
            <p>Algorithme exigible au chapitre 12. Trois points A, B, C sont alignés
            exactement quand les vecteurs <em>AB</em> et <em>AC</em> sont colinéaires,
            c'est-à-dire quand leur déterminant est nul :</p>
            <p style="text-align:center"><em>(x<sub>B</sub> − x<sub>A</sub>)(y<sub>C</sub> − y<sub>A</sub>)
            − (y<sub>B</sub> − y<sub>A</sub>)(x<sub>C</sub> − x<sub>A</sub>) = 0</em></p>
            <p>Écris <code>sont_alignes(xa, ya, xb, yb, xc, yc)</code> — six paramètres,
            l'ordre compte plus que jamais.</p>`,
          depart: `def sont_alignes(xa, ya, xb, yb, xc, yc):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer un booléen." },
              { motif: "==\\s*0", message: "Les points sont alignés quand le déterminant est nul." },
            ],
            tests: `assert sont_alignes(1, 2, 4, 11, 2, 5) == True, "A(1;2), B(4;11), C(2;5) sont alignés"\nassert sont_alignes(0, 0, 1, 1, 2, 2) == True, "trois points de la première bissectrice sont alignés"\nassert sont_alignes(0, 0, 1, 1, 2, 3) == False, "C(2;3) n'est pas sur la droite (AB)"\nassert sont_alignes(0, 0, 0, 5, 0, 9) == True, "trois points d'une même verticale sont alignés"`,
          },
          felicitation: "Chapitre 12 de maths, algorithme validé. 📏",
          indices: [
            "Range d'abord le déterminant dans une variable, c'est plus lisible.",
            "<code>determinant = (xb - xa) * (yc - ya) - (yb - ya) * (xc - xa)</code>",
            "Puis <code>return determinant == 0</code>.",
          ],
          solution: `def sont_alignes(xa, ya, xb, yb, xc, yc):\n    determinant = (xb - xa) * (yc - ya) - (yb - ya) * (xc - xa)\n    return determinant == 0\n`,
        },

        {
          id: "d10",
          type: "cours",
          titre: "Le mémo de la séance",
          libelleBouton: "Passer aux exercices →",
          contenu: `
            <pre class="bloc-code"><code>def nom(param1, param2, param3):
    ...
    return resultat

nom(valeur1, valeur2, valeur3)    # dans le MÊME ordre</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Trois erreurs à guetter</span>
              <ol style="margin-bottom:0">
                <li><strong>l'ordre inversé</strong> : le programme tourne et donne faux ;</li>
                <li><strong>le mauvais nombre d'arguments</strong> : <code>TypeError</code>
                  immédiate, celle-là est facile ;</li>
                <li><strong>les parenthèses manquantes</strong> dans un calcul :
                  <code>(a + b + c) / 3</code>, pas <code>a + b + c / 3</code>.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Lire du code : la méthode</span>
              Repère d'abord le <code>return</code> : il dit ce que la fonction produit.
              Puis remonte pour comprendre comment ce résultat est construit. Les noms de
              variables sont souvent le meilleur indice.
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
          titre: "Le prix après remise",
          contenu: `
            <p>Écris <code>prix_remise(prix, pourcentage)</code> qui renvoie le prix après
            application de la remise.</p>
            <p>Attention à l'ordre : le prix d'abord, le pourcentage ensuite.</p>`,
          depart: `def prix_remise(prix, pourcentage):\n    \n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer le prix remisé." }],
            tests: `assert prix_remise(100, 20) == 80, "100 € avec 20 % de remise font 80 €"\nassert prix_remise(50, 0) == 50, "sans remise, le prix ne change pas"\nassert prix_remise(200, 50) == 100, "200 € avec 50 % de remise font 100 €"`,
          },
          indices: [
            "La remise vaut <code>prix * pourcentage / 100</code>.",
            "<code>return prix - prix * pourcentage / 100</code>",
          ],
          solution: `def prix_remise(prix, pourcentage):\n    return prix - prix * pourcentage / 100\n`,
        },

        {
          id: "a2",
          type: "code",
          titre: "L'indice de masse corporelle",
          contenu: `
            <p>L'IMC se calcule en divisant le poids (en kg) par le carré de la taille
            (en mètres). Écris <code>imc(poids, taille)</code>.</p>`,
          depart: `def imc(poids, taille):\n    \n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer l'IMC." }],
            tests: `assert imc(60, 2) == 15, "60 kg pour 2 m donne un IMC de 15"\nassert imc(100, 2) == 25, "100 kg pour 2 m donne un IMC de 25"\nassert abs(imc(70, 1.75) - 22.857142857142858) < 0.0001, "70 kg pour 1,75 m donne environ 22,86"`,
          },
          indices: [
            "Le carré de la taille : <code>taille * taille</code> ou <code>taille ** 2</code>.",
            "<code>return poids / (taille * taille)</code> — les parenthèses sont indispensables.",
          ],
          solution: `def imc(poids, taille):\n    return poids / (taille * taille)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Chasse aux bugs : les arguments mélangés",
          contenu: `
            <p>Ce programme devrait calculer 2<sup>10</sup>, soit 1024. Il contient
            <strong>trois erreurs</strong>. Sortie attendue :</p>
            <pre class="bloc-code"><code>Résultat : 1024</code></pre>`,
          depart: `def puissance(base, exposant)\n    return exposant ** base\n\nprint("Résultat :", puissance(10, 2))\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+puissance\\s*\\(\\s*base\\s*,\\s*exposant\\s*\\)", message: "Garde la fonction puissance avec ses deux paramètres, dans cet ordre." },
            ],
            sortie: "Résultat : 1024",
          },
          felicitation: "Trois erreurs, dont deux invisibles à l'exécution. 🐞",
          indices: [
            "Ligne 1 : il manque les deux-points en fin de définition.",
            "Ligne 2 : la fonction s'appelle <code>puissance(base, exposant)</code>, mais elle calcule l'exposant à la puissance de la base.",
            "Ligne 4 : une fois la fonction réparée, l'appel donne 10<sup>2</sup> = 100. Ce n'est pas ce qu'on veut.",
          ],
          solution: `def puissance(base, exposant):\n    return base ** exposant\n\nprint("Résultat :", puissance(2, 10))\n`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Compléter la fonction de tarif",
          contenu: `
            <p>Ce programme calcule le prix d'un billet selon l'âge et la présence d'une
            carte de réduction (30 % de remise). Il manque <strong>deux lignes</strong>.</p>
            <p>Les tarifs de base : gratuit avant 12 ans, 8 € de 12 à 25 ans, 12 € au-delà.</p>`,
          depart: `def tarif(age, carte):\n    if age < 12:\n        base = 0\n    elif age <= 25:\n        base = 8\n    else:\n        base = 12\n\n    if carte:\n        # Applique 30 % de remise sur base\n        base = base\n\n    \n\nprint(tarif(30, True))\n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "Il manque le return à la fin de la fonction." }],
            tests: `assert tarif(30, False) == 12, "un adulte sans carte paie 12 €"\nassert abs(tarif(30, True) - 8.4) < 0.0001, "un adulte avec carte paie 8,40 €"\nassert tarif(10, True) == 0, "avant 12 ans, c'est gratuit"\nassert tarif(20, False) == 8, "un jeune sans carte paie 8 €"`,
          },
          felicitation: "Lire, comprendre, compléter : la capacité attendue par le programme. 🧩",
          indices: [
            "Première ligne à compléter : appliquer 30 % de remise, c'est multiplier par 0.7 — ou soustraire <code>base * 30 / 100</code>.",
            "Seconde ligne : <code>return base</code>, décalé de quatre espaces (dans la fonction, hors du if).",
          ],
          solution: `def tarif(age, carte):\n    if age < 12:\n        base = 0\n    elif age <= 25:\n        base = 8\n    else:\n        base = 12\n\n    if carte:\n        base = base - base * 30 / 100\n\n    return base\n\nprint(tarif(30, True))\n`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Le coefficient directeur",
          contenu: `
            <p>Chapitre 12 de maths. Le coefficient directeur de la droite passant par
            A(<em>x<sub>A</sub></em> ; <em>y<sub>A</sub></em>) et
            B(<em>x<sub>B</sub></em> ; <em>y<sub>B</sub></em>) vaut :</p>
            <p style="text-align:center"><em>m</em> = (<em>y<sub>B</sub></em> − <em>y<sub>A</sub></em>)
            / (<em>x<sub>B</sub></em> − <em>x<sub>A</sub></em>)</p>
            <p>Écris <code>coefficient(xa, ya, xb, yb)</code>.</p>`,
          depart: `def coefficient(xa, ya, xb, yb):\n    \n`,
          validation: {
            codeContient: [{ motif: "\\breturn\\b", message: "La fonction doit renvoyer le coefficient." }],
            tests: `assert coefficient(1, 2, 4, 11) == 3, "la droite passant par (1;2) et (4;11) a pour coefficient 3"\nassert coefficient(0, 0, 1, 1) == 1, "la première bissectrice a pour coefficient 1"\nassert coefficient(0, 5, 2, 1) == -2, "une droite descendante a un coefficient négatif"`,
          },
          indices: [
            "Attention aux parenthèses au numérateur et au dénominateur.",
            "<code>return (yb - ya) / (xb - xa)</code>",
          ],
          solution: `def coefficient(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)\n`,
        },

        {
          id: "a6",
          type: "code",
          titre: "L'équation réduite d'une droite",
          contenu: `
            <p>Toujours le chapitre 12 : à partir de deux points, retrouver l'équation
            <em>y</em> = <em>mx</em> + <em>p</em>.</p>
            <p>Le coefficient <em>m</em> se calcule comme à l'exercice précédent ;
            l'ordonnée à l'origine s'obtient alors par
            <em>p</em> = <em>y<sub>A</sub></em> − <em>m</em> × <em>x<sub>A</sub></em>.</p>
            <p>Écris <code>ordonnee_origine(xa, ya, xb, yb)</code>, puis affiche l'équation
            de la droite passant par A(1 ; 2) et B(4 ; 11) :</p>
            <pre class="bloc-code"><code>Coefficient directeur : 3.0
Ordonnée à l'origine : -1.0</code></pre>`,
          depart: `def coefficient(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)\n\ndef ordonnee_origine(xa, ya, xb, yb):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "coefficient\\s*\\(", message: "Réutilise la fonction coefficient plutôt que de refaire le calcul." },
            ],
            tests: `assert ordonnee_origine(1, 2, 4, 11) == -1, "la droite (AB) coupe l'axe des ordonnées en -1"\nassert ordonnee_origine(0, 3, 1, 5) == 3, "quand xa vaut 0, p vaut ya"\nassert ordonnee_origine(0, 0, 1, 1) == 0, "la première bissectrice passe par l'origine"`,
            sortie: "Coefficient directeur : 3.0\nOrdonnée à l'origine : -1.0",
          },
          felicitation: "Deux fonctions qui coopèrent, et une équation de droite complète. 📈",
          indices: [
            "<code>m = coefficient(xa, ya, xb, yb)</code> puis <code>return ya - m * xa</code>.",
            "Les deux <code>print</code> viennent après les définitions, sans décalage.",
          ],
          solution: `def coefficient(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)\n\ndef ordonnee_origine(xa, ya, xb, yb):\n    m = coefficient(xa, ya, xb, yb)\n    return ya - m * xa\n\nprint("Coefficient directeur :", coefficient(1, 2, 4, 11))\nprint("Ordonnée à l'origine :", ordonnee_origine(1, 2, 4, 11))\n`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Modifier une fonction existante",
          contenu: `
            <p>Cette fonction affiche la table de multiplication de <code>n</code>, de 1 à 10.
            <strong>Modifie-la</strong> pour qu'elle accepte deux bornes supplémentaires, et
            affiche la table de 7 de 3 à 6 :</p>
            <pre class="bloc-code"><code>7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42</code></pre>`,
          depart: `def table(n):\n    for i in range(1, 11):\n        print(n, "x", i, "=", n * i)\n\ntable(7)\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+table\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s*\\)", message: "La fonction doit maintenant avoir trois paramètres." },
            ],
            sortie: "7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42",
          },
          indices: [
            "Ajoute deux paramètres : <code>def table(n, debut, fin):</code>.",
            "Dans la boucle, remplace les bornes fixes : <code>range(debut, fin + 1)</code>.",
            "L'appel devient <code>table(7, 3, 6)</code>.",
          ],
          solution: `def table(n, debut, fin):\n    for i in range(debut, fin + 1):\n        print(n, "x", i, "=", n * i)\n\ntable(7, 3, 6)\n`,
        },

        {
          id: "a8",
          type: "code",
          titre: "Compter les multiples dans un intervalle",
          contenu: `
            <p>Écris <code>compter_multiples(d, debut, fin)</code> qui renvoie combien de
            multiples de <code>d</code> se trouvent entre <code>debut</code> et
            <code>fin</code>, bornes comprises.</p>`,
          depart: `def compter_multiples(d, debut, fin):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\bfor\\b", message: "Il faut parcourir l'intervalle." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer le compte." },
            ],
            tests: `assert compter_multiples(7, 1, 100) == 14, "il y a 14 multiples de 7 entre 1 et 100"\nassert compter_multiples(2, 1, 10) == 5, "il y a 5 nombres pairs entre 1 et 10"\nassert compter_multiples(5, 5, 5) == 1, "5 est un multiple de 5"\nassert compter_multiples(3, 1, 2) == 0, "il n'y a aucun multiple de 3 entre 1 et 2"`,
          },
          indices: [
            "Un compteur avant la boucle, un <code>return</code> après.",
            "<code>for i in range(debut, fin + 1):</code> — les bornes sont comprises.",
          ],
          solution: `def compter_multiples(d, debut, fin):\n    compteur = 0\n    for i in range(debut, fin + 1):\n        if i % d == 0:\n            compteur = compteur + 1\n    return compteur\n`,
        },

        {
          id: "a9",
          type: "code",
          titre: "La conversion de durées",
          contenu: `
            <p>Écris <code>en_secondes(heures, minutes, secondes)</code> qui convertit une
            durée en secondes, et <code>afficher_duree(total)</code> qui affiche une durée
            en secondes sous forme lisible.</p>
            <p>Ton programme doit afficher, pour 2 h 27 min 15 s :</p>
            <pre class="bloc-code"><code>8835 secondes
2 h 27 min 15 s</code></pre>`,
          depart: `def en_secondes(heures, minutes, secondes):\n    \n\ndef afficher_duree(total):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "//", message: "La décomposition utilise la division entière." },
              { motif: "%", message: "La décomposition utilise le reste." },
            ],
            tests: `assert en_secondes(2, 27, 15) == 8835, "2 h 27 min 15 s font 8835 secondes"\nassert en_secondes(0, 1, 0) == 60, "une minute fait 60 secondes"\nassert en_secondes(1, 0, 0) == 3600, "une heure fait 3600 secondes"`,
            sortie: "8835 secondes\n2 h 27 min 15 s",
          },
          felicitation: "Deux fonctions inverses l'une de l'autre. Élégant. ⏱️",
          indices: [
            "<code>en_secondes</code> : <code>return heures * 3600 + minutes * 60 + secondes</code>.",
            "<code>afficher_duree</code> reprend la décomposition de la séance 2 : <code>total // 3600</code>, puis un reste, puis <code>// 60</code>.",
            "Le premier <code>print</code> affiche <code>en_secondes(2, 27, 15)</code> suivi du mot « secondes ».",
          ],
          solution: `def en_secondes(heures, minutes, secondes):\n    return heures * 3600 + minutes * 60 + secondes\n\ndef afficher_duree(total):\n    h = total // 3600\n    reste = total % 3600\n    m = reste // 60\n    s = reste % 60\n    print(h, "h", m, "min", s, "s")\n\ntotal = en_secondes(2, 27, 15)\nprint(total, "secondes")\nafficher_duree(total)\n`,
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
          titre: "La distance entre deux points",
          contenu: `
            <p>La distance entre A et B vaut
            √((<em>x<sub>B</sub></em> − <em>x<sub>A</sub></em>)² +
            (<em>y<sub>B</sub></em> − <em>y<sub>A</sub></em>)²).</p>
            <p>Écris <code>distance(xa, ya, xb, yb)</code>.</p>
            <div class="encadre" data-ton="astuce">
              La racine carrée s'obtient avec l'exposant 0,5 : <code>25 ** 0.5</code>
              vaut <code>5.0</code>. Aucun import nécessaire.
            </div>`,
          depart: `def distance(xa, ya, xb, yb):\n    \n`,
          validation: {
            codeContient: [
              { motif: "\\*\\*\\s*0\\.5|0\\.5", message: "Utilise l'exposant 0.5 pour la racine carrée." },
              { motif: "\\breturn\\b", message: "La fonction doit renvoyer la distance." },
            ],
            tests: `assert distance(1, 2, 4, 6) == 5, "la distance entre (1;2) et (4;6) vaut 5"\nassert distance(0, 0, 3, 4) == 5, "le triangle 3-4-5 est bien connu"\nassert distance(2, 2, 2, 2) == 0, "la distance d'un point à lui-même est nulle"`,
          },
          felicitation: "Pythagore, en une ligne de Python. 📐",
          indices: [
            "Calcule d'abord les écarts : <code>dx = xb - xa</code> et <code>dy = yb - ya</code>.",
            "<code>return (dx * dx + dy * dy) ** 0.5</code> — les parenthèses autour de la somme sont indispensables.",
          ],
          solution: `def distance(xa, ya, xb, yb):\n    dx = xb - xa\n    dy = yb - ya\n    return (dx * dx + dy * dy) ** 0.5\n`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Le point est-il sur la droite ?",
          contenu: `
            <p>En réutilisant les fonctions de l'exercice 6, écris
            <code>appartient(xa, ya, xb, yb, x, y)</code> qui dit si le point
            (<em>x</em> ; <em>y</em>) appartient à la droite (AB).</p>
            <p>Un point est sur la droite quand son ordonnée vaut
            <em>m</em> × <em>x</em> + <em>p</em>.</p>`,
          depart: `def coefficient(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)\n\ndef ordonnee_origine(xa, ya, xb, yb):\n    return ya - coefficient(xa, ya, xb, yb) * xa\n\ndef appartient(xa, ya, xb, yb, x, y):\n    \n`,
          validation: {
            codeContient: [
              { motif: "coefficient\\s*\\(", message: "Réutilise la fonction coefficient." },
              { motif: "ordonnee_origine\\s*\\(", message: "Réutilise la fonction ordonnee_origine." },
            ],
            tests: `assert appartient(1, 2, 4, 11, 2, 5) == True, "(2;5) est sur la droite passant par (1;2) et (4;11)"\nassert appartient(1, 2, 4, 11, 2, 6) == False, "(2;6) n'est pas sur cette droite"\nassert appartient(0, 0, 1, 1, 7, 7) == True, "(7;7) est sur la première bissectrice"`,
          },
          felicitation: "Trois fonctions empilées : tu construis une vraie bibliothèque. 📚",
          indices: [
            "<code>m = coefficient(xa, ya, xb, yb)</code> et <code>p = ordonnee_origine(xa, ya, xb, yb)</code>.",
            "<code>return y == m * x + p</code>",
          ],
          solution: `def coefficient(xa, ya, xb, yb):\n    return (yb - ya) / (xb - xa)\n\ndef ordonnee_origine(xa, ya, xb, yb):\n    return ya - coefficient(xa, ya, xb, yb) * xa\n\ndef appartient(xa, ya, xb, yb, x, y):\n    m = coefficient(xa, ya, xb, yb)\n    p = ordonnee_origine(xa, ya, xb, yb)\n    return y == m * x + p\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "L'intersection de deux droites",
          contenu: `
            <p>Deux droites d'équations <em>y</em> = <em>m₁x</em> + <em>p₁</em> et
            <em>y</em> = <em>m₂x</em> + <em>p₂</em> se coupent en un point d'abscisse
            <em>x</em> = (<em>p₂</em> − <em>p₁</em>) / (<em>m₁</em> − <em>m₂</em>).</p>
            <p>Écris <code>abscisse_intersection(m1, p1, m2, p2)</code> et
            <code>ordonnee_intersection(m1, p1, m2, p2)</code>, puis affiche le point
            d'intersection de <em>y</em> = 2<em>x</em> + 1 et <em>y</em> = −<em>x</em> + 7 :</p>
            <pre class="bloc-code"><code>Intersection : x = 2.0 et y = 5.0</code></pre>`,
          depart: `def abscisse_intersection(m1, p1, m2, p2):\n    \n\ndef ordonnee_intersection(m1, p1, m2, p2):\n    \n\n`,
          validation: {
            codeContient: [
              { motif: "abscisse_intersection\\s*\\([^)]*\\)[\\s\\S]*def|def[\\s\\S]*abscisse_intersection\\s*\\(\\s*m1",
                message: "ordonnee_intersection doit s'appuyer sur abscisse_intersection." },
            ],
            tests: `assert abscisse_intersection(2, 1, -1, 7) == 2, "les droites y=2x+1 et y=-x+7 se coupent en x=2"\nassert ordonnee_intersection(2, 1, -1, 7) == 5, "… et en y=5"\nassert abscisse_intersection(1, 0, -1, 0) == 0, "deux droites passant par l'origine s'y coupent"`,
            sortie: "Intersection : x = 2.0 et y = 5.0",
          },
          felicitation: "Un système d'équations résolu par une fonction. 🎯",
          indices: [
            "<code>return (p2 - p1) / (m1 - m2)</code>",
            "Pour l'ordonnée : calcule d'abord l'abscisse, puis applique la première équation.",
            "<code>x = abscisse_intersection(m1, p1, m2, p2)</code> puis <code>return m1 * x + p1</code>.",
          ],
          solution: `def abscisse_intersection(m1, p1, m2, p2):\n    return (p2 - p1) / (m1 - m2)\n\ndef ordonnee_intersection(m1, p1, m2, p2):\n    x = abscisse_intersection(m1, p1, m2, p2)\n    return m1 * x + p1\n\nprint("Intersection : x =", abscisse_intersection(2, 1, -1, 7), "et y =", ordonnee_intersection(2, 1, -1, 7))\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Trouver l'erreur dans un programme long",
          contenu: `
            <p>Cette fonction devrait renvoyer le PGCD de deux entiers par l'algorithme
            d'Euclide. Elle contient <strong>une seule erreur</strong>, mais elle est bien
            cachée. Lis attentivement plutôt que de tout réécrire.</p>`,
          depart: `def pgcd(a, b):\n    while b != 0:\n        reste = a % b\n        a = reste\n        b = b\n    return a\n`,
          validation: {
            codeContient: [{ motif: "\\bwhile\\b", message: "Garde l'algorithme d'Euclide avec sa boucle while." }],
            tests: `assert pgcd(1071, 462) == 21, "le PGCD de 1071 et 462 vaut 21"\nassert pgcd(48, 36) == 12, "le PGCD de 48 et 36 vaut 12"\nassert pgcd(17, 5) == 1, "17 et 5 sont premiers entre eux"\nassert pgcd(10, 0) == 10, "le PGCD de 10 et 0 vaut 10"`,
          },
          felicitation: "Une ligne fautive sur six, débusquée. C'est ça, la lecture de code. 🔎",
          indices: [
            "Exécute mentalement avec a = 48 et b = 36 : que valent <code>a</code> et <code>b</code> après un tour ?",
            "La ligne <code>b = b</code> ne fait rien : la boucle ne progresse pas.",
            "L'échange correct : <code>a</code> reçoit l'ancien <code>b</code>, et <code>b</code> reçoit le reste.",
          ],
          solution: `def pgcd(a, b):\n    while b != 0:\n        reste = a % b\n        a = b\n        b = reste\n    return a\n`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Compléter l'écart type",
          contenu: `
            <p>Voici la fonction que le programme de maths te demande de savoir
            <strong>lire</strong>. Elle calcule l'écart type d'une série : la racine carrée
            de la moyenne des carrés des écarts à la moyenne.</p>
            <p>Il manque <strong>deux lignes</strong>. Complète-les.</p>
            <div class="encadre" data-ton="astuce">
              Rappel de la découverte : <code>for v in valeurs:</code> parcourt les éléments
              un par un, et <code>len(valeurs)</code> donne leur nombre.
            </div>`,
          depart: `def moyenne(valeurs):\n    somme = 0\n    for v in valeurs:\n        somme = somme + v\n    return somme / len(valeurs)\n\ndef ecart_type(valeurs):\n    m = moyenne(valeurs)\n    total = 0\n    for v in valeurs:\n        # Ajoute à total le carré de l'écart entre v et m\n        total = total\n    # Renvoie la racine carrée de la moyenne de ces carrés\n    return 0\n`,
          validation: {
            codeContient: [
              { motif: "0\\.5|\\*\\*", message: "L'écart type est une racine carrée : pense à l'exposant 0.5." },
              { motif: "len\\s*\\(", message: "La moyenne des carrés se divise par le nombre de valeurs." },
            ],
            tests: `assert moyenne([12, 15, 9, 18, 11]) == 13, "la moyenne de la série vaut 13"\nassert ecart_type([5, 5, 5, 5]) == 0, "une série constante a un écart type nul"\nassert abs(ecart_type([2, 4, 4, 4, 5, 5, 7, 9]) - 2) < 0.0001, "cette série classique a un écart type de 2"`,
          },
          felicitation: "Chapitre 5 de maths : tu sais lire ET compléter la fonction. 📊",
          indices: [
            "Le carré de l'écart : <code>(v - m) * (v - m)</code>.",
            "Première ligne : <code>total = total + (v - m) * (v - m)</code>.",
            "Seconde ligne : <code>return (total / len(valeurs)) ** 0.5</code>.",
          ],
          solution: `def moyenne(valeurs):\n    somme = 0\n    for v in valeurs:\n        somme = somme + v\n    return somme / len(valeurs)\n\ndef ecart_type(valeurs):\n    m = moyenne(valeurs)\n    total = 0\n    for v in valeurs:\n        total = total + (v - m) * (v - m)\n    return (total / len(valeurs)) ** 0.5\n`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Ta bibliothèque de géométrie",
          contenu: `
            <p>Défi libre. Écris <strong>au moins deux fonctions à plusieurs paramètres</strong>
            sur un même thème, dont une qui en appelle une autre, puis un programme qui
            les utilise.</p>
            <p>Des idées : aire et périmètre d'un triangle, volume et aire d'un pavé, conversion
            de coordonnées, calcul d'une mensualité de prêt, notes pondérées par coefficients…</p>`,
          depart: `# Tes fonctions\n`,
          validation: {
            codeContient: [
              { motif: "def\\s+\\w+\\s*\\(\\s*\\w+\\s*,\\s*\\w+", message: "Au moins une fonction doit avoir deux paramètres ou plus." },
              { motif: "def[\\s\\S]*\\bdef\\b", message: "Il faut au moins deux fonctions." },
              { motif: "\\breturn\\b", message: "Tes fonctions doivent renvoyer leurs résultats." },
            ],
            sortieNonVide: true,
          },
          felicitation: "Séance 8 terminée. Tu écris et tu lis du code. 🏁",
          indices: [
            "Pense à faire appeler une fonction par l'autre : c'est ce qui rend une bibliothèque cohérente.",
            "Exemple : <code>volume_pave(L, l, h)</code> et <code>aire_pave(L, l, h)</code>.",
          ],
          solution: `def aire_rectangle(longueur, largeur):\n    return longueur * largeur\n\ndef volume_pave(longueur, largeur, hauteur):\n    return aire_rectangle(longueur, largeur) * hauteur\n\nprint("Aire de la base :", aire_rectangle(4, 3))\nprint("Volume du pavé :", volume_pave(4, 3, 5))\n`,
        },
      ],
    },
  ],
};

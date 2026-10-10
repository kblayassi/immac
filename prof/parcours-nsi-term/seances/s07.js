/* NSI Terminale — chapitre 1, séance 7 : choisir la bonne structure.
 *
 * Couvre les deux dernières capacités attendues de la rubrique :
 * « distinguer la recherche d'une valeur dans une liste et dans un dictionnaire »
 * et « choisir une structure de données adaptée à la situation à modéliser ».
 *
 * Le dictionnaire est introduit comme TYPE ABSTRAIT (clé → valeur), puis
 * implémenté par table de hachage, pour qu'on comprenne d'où vient sa vitesse.
 * Le hachage n'est pas exigible tel quel : il est ici l'explication, pas le but.
 *
 * Représentation du dictionnaire maison :
 *   d = [seau0, seau1, ...] ; un seau est une liste de couples [cle, valeur].
 *
 * Règles de rédaction : voir l'en-tête de s01.js. `apres` est DÉJÀ un encadré.
 */

export default {
  id: "s07",
  numero: 7,
  titre: "Choisir la bonne structure",
  sousTitre: "Chercher dans une liste, chercher par une clé — et tout ce qui en découle",
  palier: "Partie 4 — Choisir et appliquer",

  accroche: `Toutes les structures du chapitre partagent un défaut : pour retrouver une
    valeur, il faut les parcourir. Le dictionnaire fait autrement — il demande à la donnée
    de dire elle-même où elle est rangée. Comprendre comment, c'est comprendre pourquoi le
    choix d'une structure décide de ce qu'un programme sait faire.`,

  objectifs: [
    "mesurer le coût d'une <strong>recherche séquentielle</strong>",
    "utiliser un <strong>dictionnaire</strong> comme type abstrait : clé, valeur, index",
    "comprendre d'où vient sa vitesse, en l'implémentant par <strong>table de hachage</strong>",
    "<strong>choisir</strong> une structure à partir des opérations dont un problème a besoin",
  ],

  motDeLaFin: `Tu disposes maintenant de tout l'outillage du chapitre, et de quoi choisir
    entre ses pièces. La séance 8 ne présente plus rien de nouveau : elle met les piles et
    les files au travail sur de vrais problèmes, dont deux tombés au baccalauréat.`,

  parties: [

    /* ============================== DÉCOUVERTE ============================== */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 45,
      etoiles: 1,
      intention: "d'où vient la vitesse d'un dictionnaire",
      etapes: [

        {
          id: "d1",
          type: "cours",
          titre: "Le problème de la recherche",
          contenu: `
            <p>Reprends toutes les structures du chapitre et pose-leur la même question :
            <em>contiens-tu la valeur 42 ?</em></p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Structure</th><th>Comment elle répond</th><th>Coût</th></tr>
              <tr><td>tableau</td><td>elle compare case après case</td><td>linéaire</td></tr>
              <tr><td>liste chaînée</td><td>elle suit les flèches une à une</td><td>linéaire</td></tr>
              <tr><td>pile, file</td><td>elle se démonte entièrement, puis se remonte</td><td>linéaire</td></tr>
            </table>
            </div>

            <p>Aucune n'échappe au parcours. Sur un annuaire de dix millions d'abonnés, cela
            fait dix millions de comparaisons pour un seul numéro — et il faut recommencer à
            chaque appel.</p>

            <div class="encadre">
              <span class="chapo">L'idée qui change tout</span>
              Et si la donnée cherchée disait <strong>elle-même</strong> où elle est rangée ?
              Au lieu de parcourir pour trouver, on <em>calcule</em> l'endroit à partir de ce
              qu'on cherche, et l'on va directement y regarder.
              <br><br>
              La valeur qui sert à ce calcul s'appelle une <strong>clé</strong>, et la
              structure qui fonctionne ainsi un <strong>dictionnaire</strong> — ou une
              <em>table associative</em>.
            </div>

            <p>Son interface est celle d'un vrai dictionnaire de langue : on cherche un mot,
            on obtient sa définition. Jamais l'inverse, et jamais « le 3 000<sup>e</sup>
            mot ».</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th></tr>
              <tr><td><code>dico_vide()</code></td><td>un dictionnaire sans aucun couple</td><td>aucune</td></tr>
              <tr><td><code>associer(d, cle, valeur)</code></td><td>rien — <code>cle</code> est associée à <code>valeur</code></td><td>aucune</td></tr>
              <tr><td><code>contient(d, cle)</code></td><td><code>True</code> si la clé est présente</td><td>aucune</td></tr>
              <tr><td><code>valeur_de(d, cle)</code></td><td>la valeur associée à <code>cle</code></td><td><code>contient(d, cle)</code></td></tr>
              <tr><td><code>supprimer(d, cle)</code></td><td>rien — le couple disparaît</td><td><code>contient(d, cle)</code></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ce qu'un dictionnaire ne sait pas faire</span>
              Il n'a <strong>pas d'ordre</strong> : demander « le premier couple » n'a pas de
              sens. Il ne sait pas non plus chercher par la valeur — trouver toutes les clés
              associées à 42 demande de tout parcourir, exactement comme un tableau.
              <br><br>
              Un dictionnaire est rapide dans <strong>un seul sens</strong> : de la clé vers
              la valeur. C'est une structure très spécialisée, et c'est pour cela qu'elle est
              si efficace.
            </div>

            <p>Python en propose un tout fait — tu l'as utilisé dès la séance 1 pour le sac
            de jetons. Dans cette séance, on va l'écrire soi-même : c'est le seul moyen de
            comprendre d'où vient sa vitesse, et à quelles conditions elle tient.</p>`,
          libelleBouton: "Mesurer d'abord →",
        },

        {
          id: "d2",
          type: "code",
          titre: "Ce que coûte une recherche séquentielle",
          contenu: `
            <p>Avant de comparer, mesurons. La recherche séquentielle t'est donnée,
            <strong>instrumentée</strong> : elle compte ses comparaisons.</p>

            <p>Écris <code>mesurer(n)</code> : elle remet le compteur à zéro, fabrique le
            tableau des entiers de <code>0</code> à <code>n - 1</code>, y cherche une valeur
            <strong>absente</strong>, et renvoie le nombre de comparaisons.</p>

            <pre class="bloc-code"><code>n = 100 : 100 comparaisons
n = 1000 : 1000 comparaisons
n = 10000 : 10000 comparaisons</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi chercher une valeur absente</span>
              C'est le <strong>pire des cas</strong>, et c'est celui qu'on mesure toujours en
              premier : il ne dépend d'aucune chance. Une valeur présente au début serait
              trouvée tout de suite, une valeur au milieu en <em>n</em>/2 comparaisons — mais
              ces nombres-là dépendent de la donnée, pas de l'algorithme.
            </div>`,
          nomFichier: "sequentielle.py",
          depart: `# ---- La recherche séquentielle, instrumentée. N'y touche pas. ----\n\nCOUT = [0]        # nombre de comparaisons depuis le début\n\ndef recherche_sequentielle(t, valeur):\n    """Renvoie True si valeur figure dans le tableau t."""\n    for x in t:\n        COUT[0] = COUT[0] + 1\n        if x == valeur:\n            return True\n    return False\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de comparaisons pour chercher une valeur absente\n    dans un tableau de n entiers.\n\n    Le compteur est remis a zero au debut.\n    """\n    pass\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 100 :", mesurer(100), "comparaisons")\nprint("n = 1000 :", mesurer(1000), "comparaisons")\nprint("n = 10000 :", mesurer(10000), "comparaisons")\n`,
          validation: {
            codeContient: [
              { motif: "\\bCOUT\\s*\\[\\s*0\\s*\\]\\s*=\\s*0", message: "mesurer() doit remettre le compteur à zéro avant de commencer." },
              { motif: "\\brecherche_sequentielle\\s*\\(", message: "C'est la fonction fournie qui doit faire la recherche." },
            ],
            sortie: "n = 100 : 100 comparaisons\nn = 1000 : 1000 comparaisons\nn = 10000 : 10000 comparaisons",
            tests: `assert mesurer(0) == 0, "Un tableau vide ne demande aucune comparaison."\nassert mesurer(1) == 1, "Un seul élément, une seule comparaison."\nassert mesurer(100) == 100, "Cent éléments, cent comparaisons : la valeur cherchée n'est jamais trouvée."\nassert mesurer(1000) == 1000, "Mille éléments."\nassert mesurer(100) == 100, "Deux mesures de suite doivent donner le même résultat."`,
          },
          felicitation: "Le pire des cas mesuré : autant de comparaisons que d'éléments. 📏",
          indices: [
            "Trois temps : remettre le compteur à zéro, fabriquer le tableau, lancer la recherche.",
            "Le tableau des entiers de 0 à n−1 se fabrique en une boucle, ou d'un coup avec <code>list(range(n))</code>.",
            "La valeur cherchée doit être absente du tableau : <code>-1</code> convient, puisque le tableau ne contient que des entiers positifs ou nuls.",
          ],
          solution: `# ---- La recherche séquentielle, instrumentée. N'y touche pas. ----\n\nCOUT = [0]        # nombre de comparaisons depuis le début\n\ndef recherche_sequentielle(t, valeur):\n    """Renvoie True si valeur figure dans le tableau t."""\n    for x in t:\n        COUT[0] = COUT[0] + 1\n        if x == valeur:\n            return True\n    return False\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de comparaisons pour chercher une valeur absente\n    dans un tableau de n entiers.\n\n    Le compteur est remis a zero au debut.\n    """\n    COUT[0] = 0\n    t = list(range(n))\n    recherche_sequentielle(t, -1)\n    return COUT[0]\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 100 :", mesurer(100), "comparaisons")\nprint("n = 1000 :", mesurer(1000), "comparaisons")\nprint("n = 10000 :", mesurer(10000), "comparaisons")\n`,
          apres: `<span class="chapo">Le coût de la recherche est la valeur à battre</span>
            Dix mille éléments, dix mille comparaisons. Le lien est exactement
            proportionnel : c'est un coût <strong>linéaire</strong>, comme le parcours de la
            séance 5.
            <br><br>
            Retiens ce nombre : tout le reste de la séance consiste à le faire tomber à
            <strong>quelques unités</strong>, indépendamment de la taille. Cela paraît
            impossible — on ne peut pas trouver sans regarder — et c'est pourtant ce qu'un
            dictionnaire fait.`,
        },

        {
          id: "d3",
          type: "cours",
          titre: "La clé donne l'adresse",
          contenu: `
            <p>Voici l'astuce. Au lieu de ranger les couples les uns après les autres, on
            prépare un tableau de <strong>seaux</strong> — disons huit — et l'on décide que
            chaque clé ira dans un seau bien précis, <strong>calculé à partir d'elle</strong>.</p>

            <pre class="bloc-code"><code>       seau 0   seau 1   seau 2   seau 3   seau 4   seau 5   seau 6   seau 7
      ┌────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
      │        │ "lea"  │        │ "zoe"  │        │        │ "tom"  │        │
      │        │  → 14  │        │  → 17  │        │        │  → 15  │        │
      └────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┘</code></pre>

            <p>Le calcul se fait en deux temps.</p>

            <div class="encadre">
              <span class="chapo">1. L'empreinte</span>
              Une <strong>fonction de hachage</strong> transforme la clé en un entier. La
              plus simple qui soit, pour une chaîne : additionner le code de chacune de ses
              lettres.
              <pre class="bloc-code"><code>empreinte("tom") = ord("t") + ord("o") + ord("m")
                 = 116 + 111 + 109
                 = 336</code></pre>
              Une même clé donne toujours la même empreinte — c'est la seule propriété
              indispensable.
            </div>

            <div class="encadre">
              <span class="chapo">2. Le seau</span>
              L'empreinte peut être n'importe quel entier ; le modulo la ramène dans le
              tableau, exactement comme pour la file circulaire de la séance 5.
              <pre class="bloc-code"><code>seau de "tom" = 336 % 8 = 0</code></pre>
            </div>

            <p>Chercher <code>"tom"</code> ne demande donc plus de parcourir quoi que ce
            soit : on recalcule son seau, et l'on ne regarde <strong>que celui-là</strong>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les collisions, et pourquoi elles sont inévitables</span>
              Rien n'empêche deux clés différentes de tomber dans le même seau — d'ailleurs
              <code>empreinte("tom")</code> et <code>empreinte("mot")</code> sont égales,
              puisque ce sont les mêmes lettres. On appelle cela une
              <strong>collision</strong>.
              <br><br>
              Avec huit seaux et des milliers de clés, il y en aura forcément : c'est
              arithmétique. La parade est simple — un seau ne contient pas un couple, mais
              une <strong>liste</strong> de couples, qu'on parcourt séquentiellement.
              <br><br>
              Tout le jeu consiste donc à ce que les seaux restent <strong>courts</strong>.
              S'ils contiennent deux ou trois couples en moyenne, une recherche coûte deux ou
              trois comparaisons — quel que soit le nombre total de clés.
            </div>`,
        },

        {
          id: "d4",
          type: "prediction",
          titre: "Où atterrissent les clés ?",
          contenu: `
            <p>Avec la fonction de hachage du cours — la somme des codes des lettres — et un
            tableau de <strong>8</strong> seaux.</p>
            <p>Rappel des codes : <code>ord("a")</code> vaut 97, et les lettres suivantes se
            suivent : <code>"b"</code> vaut 98, <code>"c"</code> 99, et ainsi de suite.</p>`,
          code: `def empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\nprint(empreinte("ab") % 8)\nprint(empreinte("ba") % 8)\nprint(empreinte("c") % 8)`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>3</code>, <code>3</code>, puis <code>3</code>", correct: true,
              explication: "Oui. <code>\"ab\"</code> et <code>\"ba\"</code> ont les mêmes lettres, donc la même empreinte : 97 + 98 = 195, et 195 % 8 = 3. Quant à <code>\"c\"</code>, son empreinte vaut 99, et 99 % 8 = 3 aussi. Trois clés différentes, un seul seau : voilà trois collisions." },
            { texte: "<code>3</code>, <code>5</code>, puis <code>3</code>",
              explication: "L'empreinte ne tient aucun compte de l'<em>ordre</em> des lettres : c'est une simple addition, et l'addition est commutative. <code>\"ab\"</code> et <code>\"ba\"</code> sont indiscernables pour elle." },
            { texte: "<code>3</code>, <code>3</code>, puis <code>1</code>",
              explication: "L'empreinte de <code>\"c\"</code> est 99, et 99 = 12 × 8 + 3. Le reste est bien 3." },
            { texte: "Trois nombres différents : c'est le but d'une fonction de hachage.",
              explication: "C'est le but, mais ce n'est jamais une garantie. Avec huit seaux, huit clés suffisent à provoquer une collision certaine — et celle-ci en provoque trois avec trois clés." },
          ],
          apres: `<span class="chapo">Une mauvaise fonction de hachage, et pourquoi on la garde</span>
            Celle-ci est franchement médiocre : elle ignore l'ordre des lettres, donc toutes
            les anagrammes se bousculent dans le même seau. Une vraie fonction de hachage
            mélange bien davantage — celle de Python tient compte de la position de chaque
            caractère, et change même à chaque lancement du programme, pour des raisons de
            sécurité.
            <br><br>
            On la garde parce qu'elle est <strong>calculable de tête</strong>, et que le
            principe est identique. Retiens seulement ceci : la qualité d'un dictionnaire
            dépend entièrement de la qualité de sa fonction de hachage. Une fonction qui
            enverrait toutes les clés dans le même seau donnerait une structure aussi lente
            qu'un simple tableau.`,
        },

        {
          id: "d5",
          type: "code",
          titre: "Créer la table, et trouver le seau",
          contenu: `
            <p>Écris les trois premières briques du dictionnaire maison.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th></tr>
              <tr><td><code>dico_vide(nb_seaux)</code></td><td>un tableau de <code>nb_seaux</code> seaux, chacun vide</td></tr>
              <tr><td><code>empreinte(cle)</code></td><td>la somme des codes des caractères de <code>cle</code></td></tr>
              <tr><td><code>seau_de(d, cle)</code></td><td>l'<strong>indice</strong> du seau où <code>cle</code> doit aller</td></tr>
            </table>
            </div>

            <p>Un seau est une <strong>liste de couples</strong> <code>[cle, valeur]</code>,
            vide au départ. Un dictionnaire de 3 seaux vaut donc <code>[[], [], []]</code>.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège de <code>[[]] * 3</code></span>
              Cette écriture ne fabrique <strong>pas</strong> trois listes vides : elle
              fabrique trois références vers <strong>la même</strong> liste vide. Ajouter un
              couple au premier seau l'ajouterait aux trois.
              <br><br>
              C'est le piège du partage de la séance 6, sous un autre visage. Pour obtenir
              trois listes réellement distinctes, il faut les créer une par une — avec une
              boucle, ou par compréhension : <code>[[] for i in range(nb_seaux)]</code>.
            </div>`,
          nomFichier: "table.py",
          depart: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    """Renvoie un dictionnaire de nb_seaux seaux, tous vides et distincts."""\n    pass\n\ndef empreinte(cle):\n    """Renvoie la somme des codes des caracteres de la chaine cle."""\n    pass\n\ndef seau_de(d, cle):\n    """Renvoie l'indice du seau ou cle doit etre rangee."""\n    pass\n`,
          validation: {
            tests: `d = dico_vide(3)\nassert d == [[], [], []], "Trois seaux, tous vides."\nd[0].append(["x", 1])\nassert d == [[["x", 1]], [], []], "Les trois seaux doivent être des listes DISTINCTES : ajouter dans l'un ne doit pas toucher les autres."\nassert dico_vide(1) == [[]], "Un seul seau."\nassert dico_vide(8) == [[], [], [], [], [], [], [], []], "Huit seaux."\nassert empreinte("") == 0, "La chaîne vide n'a aucun caractère à additionner."\nassert empreinte("a") == 97, "Le code de 'a' est 97."\nassert empreinte("ab") == 195, "97 + 98."\nassert empreinte("ba") == 195, "Les mêmes lettres donnent la même empreinte."\nassert empreinte("tom") == 336, "116 + 111 + 109."\ne = dico_vide(8)\nassert seau_de(e, "tom") == 0, "336 % 8 vaut 0."\nassert seau_de(e, "ab") == 3, "195 % 8 vaut 3."\nassert seau_de(e, "c") == 3, "99 % 8 vaut 3 : c'est une collision avec 'ab'."\nf = dico_vide(5)\nassert seau_de(f, "tom") == 1, "336 % 5 vaut 1 : le seau dépend du nombre de seaux."\nfor mot in ["chat", "chien", "oiseau", "poisson"]:\n    assert 0 <= seau_de(e, mot) < 8, "Un indice de seau doit toujours tomber dans le tableau."`,
          },
          felicitation: "La clé calcule elle-même où elle sera rangée. 🗝️",
          indices: [
            "Pour <code>dico_vide</code>, une boucle qui ajoute une liste vide neuve à chaque tour — ou la compréhension donnée dans l'énoncé.",
            "<code>empreinte</code> est un accumulateur classique : un total à zéro, une boucle sur les caractères, et <code>ord</code> pour obtenir le code de chacun.",
            "<code>seau_de</code> tient en une ligne : l'empreinte de la clé, ramenée dans le tableau par un modulo. Le nombre de seaux s'obtient avec <code>len(d)</code>.",
          ],
          solution: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    """Renvoie un dictionnaire de nb_seaux seaux, tous vides et distincts."""\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    """Renvoie la somme des codes des caracteres de la chaine cle."""\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    """Renvoie l'indice du seau ou cle doit etre rangee."""\n    return empreinte(cle) % len(d)\n`,
          apres: `<span class="chapo">Le modulo, encore</span>
            C'est la troisième fois du chapitre qu'il apparaît, et toujours pour la même
            raison : <strong>ramener un nombre quelconque dans les bornes d'un
            tableau</strong>. File circulaire, tampon, et maintenant table de hachage.
            <br><br>
            Note au passage que le seau d'une clé <em>dépend du nombre de seaux</em> :
            <code>"tom"</code> va au seau 0 dans une table de 8, au seau 1 dans une table de
            5. Une table de hachage ne peut donc pas changer de taille sans redistribuer
            toutes ses clés.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "Associer et retrouver",
          contenu: `
            <p>Les deux opérations principales. Elles commencent toutes les deux de la même
            façon : trouver le seau, et n'y regarder que lui.</p>

            <ul>
              <li><code>associer(d, cle, valeur)</code> range le couple. Si la clé est
              <strong>déjà présente</strong>, sa valeur est remplacée — un dictionnaire
              n'a jamais deux fois la même clé ;</li>
              <li><code>valeur_de(d, cle)</code> renvoie la valeur associée. Précondition : la
              clé est présente.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Dans le seau, c'est une recherche séquentielle</span>
              Et c'est normal : un seau contient peu de couples. Parcourir trois couples pour
              en trouver un n'a rien à voir avec en parcourir dix mille.
            </div>`,
          nomFichier: "table.py",
          depart: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\n\n# ---- À toi. ----\n\ndef associer(d, cle, valeur):\n    """Associe valeur a cle. Si cle est deja presente, sa valeur est remplacee."""\n    pass\n\ndef valeur_de(d, cle):\n    """Renvoie la valeur associee a cle.\n\n    Precondition : cle est presente dans d.\n    """\n    pass\n`,
          validation: {
            codeContient: [
              { motif: "\\bseau_de\\s*\\([\\s\\S]*\\bseau_de\\s*\\(", message: "Les deux fonctions doivent commencer par calculer le seau : c'est tout l'intérêt de la structure." },
            ],
            tests: `d = dico_vide(8)\nassocier(d, "tom", 15)\nassert valeur_de(d, "tom") == 15, "La valeur associée doit être retrouvée."\nassert d[0] == [["tom", 15]], "Le couple doit être rangé dans le seau 0, celui que calcule seau_de."\nassocier(d, "lea", 14)\nassert valeur_de(d, "lea") == 14, "..."\nassert valeur_de(d, "tom") == 15, "Le premier couple ne doit pas avoir bougé."\nassocier(d, "tom", 99)\nassert valeur_de(d, "tom") == 99, "Associer une clé déjà présente remplace sa valeur."\nnb = 0\nfor seau in d:\n    nb = nb + len(seau)\nassert nb == 2, "Et ne crée PAS un second couple : il doit rester deux couples en tout."\ne = dico_vide(8)\nassocier(e, "ab", 1)\nassocier(e, "ba", 2)\nassocier(e, "c", 3)\nassert seau_de(e, "ab") == seau_de(e, "c"), "Ces trois clés entrent en collision."\nassert valeur_de(e, "ab") == 1, "Malgré la collision, chaque clé doit retrouver SA valeur."\nassert valeur_de(e, "ba") == 2, "..."\nassert valeur_de(e, "c") == 3, "..."\nassert len(e[3]) == 3, "Les trois couples partagent le même seau."\nf = dico_vide(16)\nfor i in range(50):\n    associer(f, "cle" + str(i), i * i)\nfor i in range(50):\n    assert valeur_de(f, "cle" + str(i)) == i * i, "Sur cinquante clés, chacune doit retrouver sa valeur."`,
          },
          felicitation: "Ton dictionnaire fonctionne, collisions comprises. 📖",
          indices: [
            "Les deux fonctions commencent pareil : <code>seau = d[seau_de(d, cle)]</code>.",
            "Dans <code>associer</code>, parcours le seau : si un couple porte déjà la clé, c'est sa valeur qu'il faut changer, et la fonction s'arrête là. Sinon, un couple neuf rejoint le seau.",
            "Dans <code>valeur_de</code>, même parcours, mais on renvoie la valeur du couple trouvé. La précondition garantit qu'il existe.",
          ],
          solution: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\n\n# ---- À toi. ----\n\ndef associer(d, cle, valeur):\n    """Associe valeur a cle. Si cle est deja presente, sa valeur est remplacee."""\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    """Renvoie la valeur associee a cle.\n\n    Precondition : cle est presente dans d.\n    """\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            return couple[1]\n`,
          apres: `<span class="chapo">Le <code>return</code> nu d'<code>associer</code></span>
            <code>return</code> sans rien derrière termine la fonction et renvoie
            <code>None</code>. C'est exactement ce qu'il faut ici : la spécification dit que
            la fonction ne renvoie rien, et l'on veut simplement <strong>arrêter</strong> dès
            que la clé a été trouvée et mise à jour.
            <br><br>
            Sans lui, l'exécution continuerait jusqu'au <code>append</code> et ajouterait un
            second couple portant la même clé. Le dictionnaire contiendrait alors deux
            réponses à la même question — et <code>valeur_de</code> rendrait toujours la plus
            ancienne. C'est le troisième test qui traque cette faute.`,
        },

        {
          id: "d7",
          type: "code",
          titre: "Combien de comparaisons, cette fois ?",
          contenu: `
            <p>Reprenons exactement le protocole de l'étape 2, sur le dictionnaire maison. Il
            t'est donné, instrumenté : <code>valeur_de</code> compte ses comparaisons de
            clés.</p>

            <p>Écris <code>mesurer(n)</code> : elle remet le compteur à zéro, remplit un
            dictionnaire de <code>n</code> clés — <code>"cle0"</code>, <code>"cle1"</code>,
            … — <strong>dans une table de <code>n</code> seaux</strong>, puis cherche
            <strong>une seule</strong> clé, <code>"cle0"</code>, et renvoie le nombre de
            comparaisons de cette recherche.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Remets le compteur à zéro au bon moment</span>
              Le remplissage fait lui aussi des comparaisons, et ce n'est pas lui qu'on
              mesure. Le compteur doit donc être remis à zéro <strong>après</strong> avoir
              rempli le dictionnaire, juste avant la recherche.
            </div>`,
          nomFichier: "mesure_dico.py",
          depart: `# ---- Le dictionnaire maison, instrumenté. N'y touche pas. ----\n\nCOUT = [0]        # nombre de comparaisons de clés\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        COUT[0] = COUT[0] + 1\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        COUT[0] = COUT[0] + 1\n        if couple[0] == cle:\n            return couple[1]\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de comparaisons pour UNE recherche de "cle0"\n    dans un dictionnaire de n cles reparties en n seaux.\n    """\n    pass\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 100 :", mesurer(100), "comparaisons")\nprint("n = 1000 :", mesurer(1000), "comparaisons")\nprint("n = 10000 :", mesurer(10000), "comparaisons")\n`,
          validation: {
            codeContient: [
              { motif: "\\bvaleur_de\\s*\\(", message: "La recherche mesurée doit passer par valeur_de()." },
              { motif: "\\bassocier\\s*\\(", message: "Il faut d'abord remplir le dictionnaire avec n clés." },
            ],
            sortieNonVide: true,
            tests: `a = mesurer(100)\nb = mesurer(1000)\nc = mesurer(10000)\nassert a >= 1, "Une recherche réussie fait au moins une comparaison."\nassert a <= 12, "Avec autant de seaux que de clés, un seau reste très court : on attend une poignée de comparaisons, pas des dizaines."\nassert b <= 12, "Et ce nombre ne doit pas grandir avec n."\nassert c <= 12, "Même sur dix mille clés."\nassert mesurer(100) == a, "Deux mesures de suite doivent donner le même résultat : le compteur est bien remis à zéro."\nassert c <= 40 * a, "Cent fois plus de clés ne doit pas coûter cent fois plus de comparaisons."`,
          },
          felicitation: "Cent fois plus de clés, et toujours une poignée de comparaisons. 🚀",
          indices: [
            "Quatre temps : créer le dictionnaire avec <code>n</code> seaux, le remplir avec <code>n</code> clés, remettre le compteur à zéro, puis chercher.",
            "Les clés se fabriquent en collant <code>\"cle\"</code> et le numéro : <code>\"cle\" + str(i)</code>.",
            "L'ordre est décisif : la remise à zéro doit se faire <strong>après</strong> la boucle de remplissage, sinon tu mesureras aussi les comparaisons des <code>associer</code>.",
          ],
          solution: `# ---- Le dictionnaire maison, instrumenté. N'y touche pas. ----\n\nCOUT = [0]        # nombre de comparaisons de clés\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        COUT[0] = COUT[0] + 1\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        COUT[0] = COUT[0] + 1\n        if couple[0] == cle:\n            return couple[1]\n\n\n# ---- À toi. ----\n\ndef mesurer(n):\n    """Renvoie le nombre de comparaisons pour UNE recherche de "cle0"\n    dans un dictionnaire de n cles reparties en n seaux.\n    """\n    d = dico_vide(n)\n    for i in range(n):\n        associer(d, "cle" + str(i), i)\n    COUT[0] = 0\n    valeur_de(d, "cle0")\n    return COUT[0]\n\n\n# ---- Les trois mesures. Ne modifie pas ces lignes. ----\nprint("n = 100 :", mesurer(100), "comparaisons")\nprint("n = 1000 :", mesurer(1000), "comparaisons")\nprint("n = 10000 :", mesurer(10000), "comparaisons")\n`,
          apres: `<span class="chapo">Le résultat de la séance, en deux lignes</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Nombre de clés</th><th>Recherche séquentielle</th><th>Dictionnaire</th></tr>
              <tr><td>100</td><td>100 comparaisons</td><td>une poignée</td></tr>
              <tr><td>1 000</td><td>1 000 comparaisons</td><td>une poignée</td></tr>
              <tr><td>10 000</td><td>10 000 comparaisons</td><td>une poignée</td></tr>
            </table>
            </div>
            La colonne de gauche grandit avec les données ; celle de droite ne bouge pas.
            C'est ce que le programme officiel appelle « distinguer la recherche d'une valeur
            dans une liste et dans un dictionnaire », et c'est la différence la plus
            spectaculaire de tout le chapitre.
            <br><br>
            Elle repose sur une condition, et il faut savoir la citer : <strong>les seaux
            doivent rester courts</strong>. Avec autant de seaux que de clés, c'est le cas.
            Avec huit seaux et dix mille clés, chaque seau en contiendrait 1 250, et le
            dictionnaire ne vaudrait pas mieux qu'un tableau.`,
        },

        {
          id: "d8",
          type: "qcm",
          titre: "Quand le dictionnaire perd son avantage",
          contenu: `
            <p>Imagine une fonction de hachage franchement ratée : elle renvoie
            <strong>toujours 0</strong>, quelle que soit la clé.</p>
            <pre class="bloc-code"><code>def empreinte(cle):
    return 0</code></pre>
            <p>Elle respecte pourtant la seule propriété indispensable : une même clé donne
            toujours la même empreinte. Le dictionnaire fonctionne donc — au sens où il rend
            les bonnes valeurs.</p>`,
          question: "Que devient le coût d'une recherche parmi 10 000 clés ?",
          options: [
            { texte: "Jusqu'à 10 000 comparaisons : toutes les clés sont dans le seau 0.", correct: true,
              explication: "Oui. La structure devient un unique seau contenant tous les couples, parcouru séquentiellement. Elle est exactement aussi lente qu'un tableau — avec, en prime, la mémoire des seaux vides et le calcul de l'empreinte." },
            { texte: "Il ne change pas : le calcul du seau est toujours immédiat.",
              explication: "Le calcul du seau est bien immédiat, mais il ne sert plus à rien : il désigne toujours le même seau, et c'est le parcours de ce seau qui coûte." },
            { texte: "La recherche échoue : le dictionnaire est cassé.",
              explication: "Elle ne se trompe jamais. C'est bien ce qui rend le problème sournois : le programme donne les bons résultats, et devient seulement très lent." },
            { texte: "Le coût est divisé par le nombre de seaux.",
              explication: "C'est ce qu'on obtient avec une <em>bonne</em> fonction de hachage, qui répartit les clés. Ici, une seule case est utilisée." },
          ],
          apres: `<span class="chapo">Un dictionnaire promet un résultat, pas une vitesse</span>
            C'est la leçon de la séance 1, appliquée à la structure la plus utilisée de toute
            l'informatique. L'interface de <code>valeur_de</code> — « renvoie la valeur
            associée » — est tenue dans les deux cas. La différence de coût, elle, n'est
            écrite nulle part dans le contrat.
            <br><br>
            En pratique, on dit qu'une recherche dans un dictionnaire coûte un temps
            <strong>constant en moyenne</strong>. « En moyenne » n'est pas une formule de
            politesse : cela suppose une bonne fonction de hachage et assez de seaux. Quand
            ces deux conditions tombent, le dictionnaire redevient une liste.
            <br><br>
            Les vraies implémentations — celle de Python comprise — surveillent en permanence
            le remplissage de leur table et la reconstruisent, plus grande, dès que les seaux
            s'allongent. C'est exactement le doublement de capacité vu à la séance 5.`,
        },

        {
          id: "d9",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot</th><th>Ce qu'il désigne</th></tr>
              <tr><td><strong>Clé</strong></td><td>ce par quoi on cherche ; unique dans le dictionnaire</td></tr>
              <tr><td><strong>Valeur</strong></td><td>ce qu'on obtient ; peut se répéter</td></tr>
              <tr><td><strong>Fonction de hachage</strong></td><td>transforme une clé en entier, toujours le même</td></tr>
              <tr><td><strong>Seau</strong></td><td>la case de la table où atterrissent les clés de même empreinte</td></tr>
              <tr><td><strong>Collision</strong></td><td>deux clés différentes dans le même seau — inévitable</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">Le tableau des coûts, pour tout le chapitre</span>
              <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Opération</th><th>Tableau</th><th>Chaîne</th><th>Pile / file</th><th>Dictionnaire</th></tr>
                <tr><td>Ajouter</td><td>constant (à la fin)</td><td>constant (en tête)</td><td>constant</td><td>constant en moyenne</td></tr>
                <tr><td>Chercher une valeur</td><td>linéaire</td><td>linéaire</td><td>linéaire</td><td>linéaire</td></tr>
                <tr><td>Chercher <strong>par la clé</strong></td><td>—</td><td>—</td><td>—</td><td><strong>constant en moyenne</strong></td></tr>
                <tr><td>Lire le rang <em>n</em></td><td>constant</td><td>linéaire</td><td>—</td><td>—</td></tr>
                <tr><td>Ordre garanti</td><td>oui</td><td>oui</td><td>oui</td><td><strong>non</strong></td></tr>
              </table>
              </div>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Les quatre questions à se poser devant un problème</span>
              <ol>
                <li><strong>Dans quel ordre</strong> les éléments doivent-ils être traités ?
                Ordre d'arrivée → file. Ordre inverse → pile. Aucun → dictionnaire ou
                tableau.</li>
                <li><strong>Comment cherche-t-on ?</strong> Par une clé → dictionnaire. Par
                un rang → tableau. En parcourant tout → n'importe quoi.</li>
                <li><strong>Où ajoute-t-on et retire-t-on ?</strong> Au milieu et souvent →
                chaînage. Au bout seulement → tableau.</li>
                <li><strong>Le nombre d'éléments est-il connu d'avance ?</strong> Oui et
                fixe → tableau de taille fixe. Non → structure qui grandit.</li>
              </ol>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Croire qu'un dictionnaire est ordonné.</strong> Il ne promet
                aucun ordre. Si l'ordre compte, il faut le ranger ailleurs.</li>
                <li><strong>Chercher par la valeur.</strong> Un dictionnaire est rapide dans
                un seul sens. Pour l'autre, il faut construire un second dictionnaire.</li>
                <li><strong>Oublier la précondition de <code>valeur_de</code>.</strong> Une
                clé absente n'a pas de valeur : <code>contient</code> d'abord.</li>
                <li><strong>Écrire <code>[[]] * n</code>.</strong> Ce sont <em>n</em> fois la
                même liste.</li>
                <li><strong>Croire que « constant en moyenne » veut dire
                « toujours ».</strong> Une mauvaise fonction de hachage ramène le
                dictionnaire au niveau d'un tableau.</li>
              </ul>
            </div>`,
          libelleBouton: "Passer aux exercices →",
        },
      ],
    },

    /* ============================= APPLICATION ============================= */
    {
      id: "application",
      titre: "Application",
      minutes: 45,
      etoiles: 2,
      intention: "finir le dictionnaire, puis s'en servir",
      etapes: [

        {
          id: "a1",
          type: "code",
          titre: "Savoir si une clé est là, et l'enlever",
          contenu: `
            <p>Complète l'interface du dictionnaire maison.</p>
            <ul>
              <li><code>contient(d, cle)</code> renvoie <code>True</code> si la clé est
              présente — sans aucune précondition, c'est même à cela qu'il sert ;</li>
              <li><code>supprimer(d, cle)</code> fait disparaître le couple. Précondition : la
              clé est présente.</li>
            </ul>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Retirer d'une liste par sa position</span>
              <code>ma_liste.pop(i)</code> retire la case d'indice <code>i</code> et renvoie
              sa valeur. Pour parcourir un seau en connaissant l'indice de chaque couple,
              boucle sur <code>range(len(seau))</code>.
            </div>`,
          nomFichier: "table.py",
          depart: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            return couple[1]\n\n\n# ---- À toi. ----\n\ndef contient(d, cle):\n    """Renvoie True si cle est presente dans d, False sinon."""\n    pass\n\ndef supprimer(d, cle):\n    """Fait disparaitre le couple portant cle.\n\n    Precondition : cle est presente dans d.\n    """\n    pass\n`,
          validation: {
            tests: `d = dico_vide(8)\nassert contient(d, "tom") == False, "Un dictionnaire vide ne contient aucune clé."\nassocier(d, "tom", 15)\nassert contient(d, "tom") == True, "La clé vient d'être associée."\nassert contient(d, "lea") == False, "Celle-ci ne l'a pas été."\nassert contient(d, "mot") == False, "'mot' a la même empreinte que 'tom' — donc le même seau — mais ce n'est pas la même clé."\nassocier(d, "lea", 14)\nsupprimer(d, "tom")\nassert contient(d, "tom") == False, "Le couple a disparu."\nassert contient(d, "lea") == True, "Mais pas l'autre."\nassert valeur_de(d, "lea") == 14, "Et sa valeur est intacte."\ne = dico_vide(8)\nassocier(e, "ab", 1)\nassocier(e, "ba", 2)\nassocier(e, "c", 3)\nsupprimer(e, "ba")\nassert contient(e, "ab") == True, "Supprimer dans un seau en collision ne doit toucher qu'un seul couple."\nassert contient(e, "ba") == False, "..."\nassert contient(e, "c") == True, "..."\nassert valeur_de(e, "ab") == 1 and valeur_de(e, "c") == 3, "Les valeurs restantes doivent être correctes."\nassert len(e[3]) == 2, "Il ne doit rester que deux couples dans ce seau."\nf = dico_vide(4)\nfor i in range(20):\n    associer(f, "k" + str(i), i)\nfor i in range(0, 20, 2):\n    supprimer(f, "k" + str(i))\nfor i in range(20):\n    assert contient(f, "k" + str(i)) == (i % 2 == 1), "Après dix suppressions, seules les clés impaires doivent rester."`,
          },
          felicitation: "L'interface du dictionnaire est complète. 🗂️",
          indices: [
            "<code>contient</code> ressemble beaucoup à <code>valeur_de</code> : même seau, même parcours — seule la valeur renvoyée change, et il faut une réponse pour le cas où rien n'est trouvé.",
            "Pour <code>supprimer</code>, il faut connaître la <em>position</em> du couple dans le seau, pas seulement le couple. Boucle donc sur les indices.",
            "Dès que le couple d'indice <code>i</code> porte la bonne clé, retire-le du seau et arrête la fonction.",
          ],
          solution: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            return couple[1]\n\n\n# ---- À toi. ----\n\ndef contient(d, cle):\n    """Renvoie True si cle est presente dans d, False sinon."""\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            return True\n    return False\n\ndef supprimer(d, cle):\n    """Fait disparaitre le couple portant cle.\n\n    Precondition : cle est presente dans d.\n    """\n    seau = d[seau_de(d, cle)]\n    for i in range(len(seau)):\n        if seau[i][0] == cle:\n            seau.pop(i)\n            return\n`,
          apres: `<span class="chapo">Le quatrième test mérite un mot</span>
            <code>contient(d, "mot")</code> doit répondre <code>False</code> alors que
            <code>"mot"</code> et <code>"tom"</code> ont exactement la même empreinte, et donc
            le même seau.
            <br><br>
            C'est la raison pour laquelle un seau range des <strong>couples</strong> et pas
            seulement des valeurs : l'empreinte désigne un seau, elle ne prouve rien. Une fois
            dans le bon seau, il faut <em>vraiment</em> comparer les clés. Un dictionnaire qui
            se fierait à l'empreinte seule confondrait toutes les anagrammes.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Chasse aux bugs : un dictionnaire qui perd des clés",
          contenu: `
            <p>Ce dictionnaire contient <strong>trois erreurs de natures différentes</strong> :</p>
            <ul>
              <li>une qui plante dès qu'on dépasse un certain nombre de seaux ;</li>
              <li>une qui laisse un dictionnaire contenir <strong>deux fois</strong> la même
              clé ;</li>
              <li>une qui répond juste tant qu'il n'y a pas de collision, et se trompe dès
              qu'il y en a.</li>
            </ul>
            <p>Répare les trois sans changer la représentation.</p>`,
          nomFichier: "dico_casse.py",
          depart: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            couple[1] = valeur\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    return seau[0][1]\n`,
          validation: {
            tests: `d = dico_vide(8)\nassocier(d, "tom", 15)\nassert valeur_de(d, "tom") == 15, "La valeur associée doit être retrouvée."\nassocier(d, "lea", 14)\nassert valeur_de(d, "lea") == 14, "..."\nassert valeur_de(d, "tom") == 15, "..."\nassocier(d, "tom", 99)\nassert valeur_de(d, "tom") == 99, "Associer une clé déjà présente remplace sa valeur."\nnb = 0\nfor seau in d:\n    nb = nb + len(seau)\nassert nb == 2, "Et ne doit pas créer un second couple portant la même clé."\ne = dico_vide(8)\nassocier(e, "ab", 1)\nassocier(e, "c", 3)\nassert seau_de(e, "ab") == seau_de(e, "c"), "Ces deux clés entrent en collision."\nassert valeur_de(e, "ab") == 1, "Malgré la collision, chaque clé doit retrouver SA valeur — et non celle du premier couple du seau."\nassert valeur_de(e, "c") == 3, "..."\nf = dico_vide(16)\nfor i in range(40):\n    associer(f, "cle" + str(i), i)\nfor i in range(40):\n    assert valeur_de(f, "cle" + str(i)) == i, "Sur quarante clés, chacune doit retrouver sa valeur."`,
          },
          felicitation: "Trois bugs, et le dernier ne se voit qu'à la première collision. 🐛",
          indices: [
            "Exécute d'abord : la première erreur lève une <code>IndexError</code>, et le message dit quel indice sortait du tableau. Compare <code>seau_de</code> à ce que dit sa docstring.",
            "Dans <code>associer</code>, que se passe-t-il après avoir remplacé la valeur d'une clé déjà présente ? La fonction s'arrête-t-elle ?",
            "Dans <code>valeur_de</code>, la fonction rend le premier couple du seau sans regarder sa clé. Tant qu'il n'y a qu'un couple par seau, cela passe inaperçu.",
          ],
          solution: `# Un dictionnaire est un tableau de seaux.\n# Un seau est une liste de couples [cle, valeur].\n\ndef dico_vide(nb_seaux):\n    d = []\n    for i in range(nb_seaux):\n        d.append([])\n    return d\n\ndef empreinte(cle):\n    total = 0\n    for lettre in cle:\n        total = total + ord(lettre)\n    return total\n\ndef seau_de(d, cle):\n    return empreinte(cle) % len(d)\n\ndef associer(d, cle, valeur):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            couple[1] = valeur\n            return\n    seau.append([cle, valeur])\n\ndef valeur_de(d, cle):\n    seau = d[seau_de(d, cle)]\n    for couple in seau:\n        if couple[0] == cle:\n            return couple[1]\n`,
          apres: `<span class="chapo">Trois bugs, trois moments où ils se révèlent</span>
            <ul>
              <li>Le <strong>modulo manquant</strong> plante immédiatement, et bruyamment.
              C'est le meilleur des trois.</li>
              <li>Le <code>return</code> manquant ne plante jamais. Le dictionnaire contient
              deux couples de même clé, et le test qui compte les couples est le seul à s'en
              apercevoir.</li>
              <li>Le <strong>premier couple du seau</strong> donne la bonne réponse tant
              qu'aucune collision ne se produit — c'est-à-dire pendant tous les essais faits
              à la main sur trois ou quatre clés. Il se révélera en production, sur des
              données réelles.</li>
            </ul>
            C'est presque toujours dans cet ordre que les bugs coûtent cher : celui qui plante
            tout de suite est le moins grave, et celui qui attend les vraies données est le
            pire.`,
        },

        {
          id: "a3",
          type: "qcm",
          titre: "Liste ou dictionnaire ?",
          contenu: `
            <p>Quatre situations. Dans trois d'entre elles, un dictionnaire est le bon choix ;
            dans une seule, il est inutile ou même nuisible.</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>Situation</th></tr>
              <tr><td><strong>A</strong></td><td>Retrouver la note d'un élève à partir de son nom, dans une classe de 30.</td></tr>
              <tr><td><strong>B</strong></td><td>Compter le nombre d'occurrences de chaque mot d'un livre de 100 000 mots.</td></tr>
              <tr><td><strong>C</strong></td><td>Afficher les dix derniers messages reçus, du plus récent au plus ancien.</td></tr>
              <tr><td><strong>D</strong></td><td>Vérifier qu'un identifiant figure dans une liste de 2 millions d'inscrits.</td></tr>
            </table>
            </div>`,
          question: "Dans laquelle le dictionnaire n'apporte rien ?",
          options: [
            { texte: "C", correct: true,
              explication: "Oui. Ce qui compte ici est l'<strong>ordre</strong> — du plus récent au plus ancien — et un dictionnaire n'en promet aucun. Il n'y a d'ailleurs aucune clé de recherche : on veut les dix derniers, pas « le message d'identifiant untel ». C'est une pile, ou un tableau." },
            { texte: "A",
              explication: "Le nom est une clé naturelle, et le dictionnaire est parfaitement adapté. Sur trente élèves, un simple tableau irait tout aussi vite — mais le dictionnaire exprime mieux l'intention : « la note DE cet élève »." },
            { texte: "B",
              explication: "C'est l'usage le plus classique du dictionnaire : la clé est le mot, la valeur son compte. Avec une liste, chaque mot demanderait de parcourir tous les mots déjà vus — cent mille mots donneraient un coût quadratique." },
            { texte: "D",
              explication: "Deux millions d'identifiants parcourus à chaque vérification, c'est exactement ce que le dictionnaire supprime. C'est même le cas où il est le plus indispensable." },
          ],
          apres: `<span class="chapo">La question à se poser n'est pas « est-ce plus rapide »</span>
            C'est : <strong>de quoi mon problème a-t-il besoin ?</strong>
            <ul>
              <li>Besoin d'un <em>ordre</em> → pile, file, ou tableau. Le dictionnaire n'en
              donne aucun.</li>
              <li>Besoin de retrouver <em>par une clé</em> → dictionnaire, et sans
              hésiter.</li>
              <li>Besoin des <em>deux</em> → il faudra deux structures, et les tenir toutes
              les deux à jour.</li>
            </ul>
            Ce dernier cas est fréquent, et tu l'écriras en défi. Rien n'interdit d'utiliser
            deux structures pour un même ensemble de données : c'est même ce que font tous les
            vrais programmes.`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Compter les mots",
          contenu: `
            <p>On repasse au dictionnaire de Python — celui que tu utilises depuis la
            Première. Le principe est le même, l'écriture est plus courte.</p>

            <p><code>compter(mots)</code> reçoit un tableau de mots et renvoie un
            dictionnaire qui associe à chaque mot son nombre d'apparitions.</p>

            <pre class="bloc-code"><code>compter(["a", "b", "a"])  →  {"a": 2, "b": 1}</code></pre>

            <p>Puis <code>le_plus_frequent(mots)</code> renvoie le mot qui apparaît le plus
            souvent. En cas d'égalité, celui qui apparaît en premier dans le tableau.
            Précondition : <code>mots</code> n'est pas vide.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Rappel sur les dictionnaires Python</span>
              <code>{}</code> est le dictionnaire vide, <code>d[cle] = valeur</code> associe,
              <code>cle in d</code> teste la présence, et <code>d[cle]</code> lit — en levant
              une <code>KeyError</code> si la clé est absente.
            </div>`,
          nomFichier: "compter.py",
          depart: `# ---- À toi. ----\n\ndef compter(mots):\n    """Renvoie un dictionnaire associant a chaque mot son nombre d'apparitions."""\n    pass\n\ndef le_plus_frequent(mots):\n    """Renvoie le mot le plus frequent du tableau mots.\n\n    En cas d'egalite, celui qui apparait en premier dans le tableau.\n    Precondition : mots n'est pas vide.\n    """\n    pass\n`,
          validation: {
            tests: `assert compter([]) == {}, "Aucun mot, aucun compte."\nassert compter(["a"]) == {"a": 1}, "Un seul mot."\nassert compter(["a", "b", "a"]) == {"a": 2, "b": 1}, "Le a apparaît deux fois."\nassert compter(["le", "chat", "le", "chien", "le"]) == {"le": 3, "chat": 1, "chien": 1}, "..."\nm = ["x", "y", "x", "z", "x", "y"]\nassert compter(m) == {"x": 3, "y": 2, "z": 1}, "..."\nassert m == ["x", "y", "x", "z", "x", "y"], "Le tableau reçu ne doit pas être modifié."\nassert le_plus_frequent(["a"]) == "a", "Un seul mot : c'est lui."\nassert le_plus_frequent(["a", "b", "a"]) == "a", "Le a apparaît deux fois, le b une seule."\nassert le_plus_frequent(["le", "chat", "le", "chien", "le"]) == "le", "..."\nassert le_plus_frequent(["b", "a", "a", "b"]) == "b", "Égalité à deux : c'est celui qui apparaît en premier dans le tableau."\nassert le_plus_frequent(["a", "b", "c"]) == "a", "Trois mots à égalité : le premier du tableau."\nassert le_plus_frequent(["z", "z", "a", "a", "a"]) == "a", "Le plus fréquent n'est pas forcément le premier."`,
          },
          felicitation: "L'usage le plus courant du dictionnaire dans le monde entier. 📊",
          indices: [
            "Dans <code>compter</code>, un dictionnaire vide avant la boucle. Pour chaque mot, deux cas : il est déjà une clé, ou c'est la première fois qu'on le voit.",
            "Pour <code>le_plus_frequent</code>, commence par appeler <code>compter</code> : tu disposes alors de tous les comptes.",
            "Parcours ensuite le <strong>tableau</strong> — pas le dictionnaire — et retiens le meilleur mot vu jusqu'ici. Parcourir le tableau garantit l'ordre d'apparition ; une comparaison <strong>strictement</strong> supérieure garantit que le premier gagne en cas d'égalité.",
          ],
          solution: `# ---- À toi. ----\n\ndef compter(mots):\n    """Renvoie un dictionnaire associant a chaque mot son nombre d'apparitions."""\n    comptes = {}\n    for mot in mots:\n        if mot in comptes:\n            comptes[mot] = comptes[mot] + 1\n        else:\n            comptes[mot] = 1\n    return comptes\n\ndef le_plus_frequent(mots):\n    """Renvoie le mot le plus frequent du tableau mots.\n\n    En cas d'egalite, celui qui apparait en premier dans le tableau.\n    Precondition : mots n'est pas vide.\n    """\n    comptes = compter(mots)\n    meilleur = mots[0]\n    for mot in mots:\n        if comptes[mot] > comptes[meilleur]:\n            meilleur = mot\n    return meilleur\n`,
          apres: `<span class="chapo">Pourquoi parcourir le tableau et pas le dictionnaire</span>
            Les deux donnent le bon compte, mais seul le tableau garantit l'ordre
            d'apparition — dont la spécification a besoin pour départager les égalités. Le
            dictionnaire, lui, ne promet aucun ordre.
            <br><br>
            C'est une illustration exacte de l'étape précédente : la structure rapide sert à
            <em>répondre</em>, la structure ordonnée sert à <em>décider dans quel ordre
            demander</em>. Les deux travaillent ensemble.
            <br><br>
            Compare enfin les coûts. Avec un dictionnaire, chaque mot coûte une consultation
            immédiate : cent mille mots, cent mille consultations. Avec un tableau de couples
            parcouru séquentiellement, chaque mot demanderait de relire tous les mots déjà
            vus — soit de l'ordre de cinq milliards d'opérations pour le même livre. C'est la
            différence entre un programme qui répond en une seconde et un programme qui met
            une heure.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "L'index inversé",
          contenu: `
            <p>Un tableau de couples <code>[nom, telephone]</code> permet de retrouver un
            numéro… à condition de le parcourir en entier à chaque fois.</p>

            <p><code>indexer(annuaire)</code> le transforme en dictionnaire, pour que la
            recherche devienne immédiate.</p>

            <pre class="bloc-code"><code>indexer([["lea", "0611"], ["tom", "0622"]])  →  {"lea": "0611", "tom": "0622"}</code></pre>

            <p>Et <code>indexer_inverse(annuaire)</code> fait le trajet opposé : il associe à
            chaque <strong>numéro</strong> le nom de son propriétaire — pour répondre à
            « à qui est ce numéro ? ».</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le sens de la flèche décide de tout</span>
              Un dictionnaire ne sert que dans un sens. Pour interroger dans les deux, il en
              faut <strong>deux</strong>, construits chacun dans son sens. C'est le prix de la
              vitesse : de la mémoire, et deux structures à tenir à jour ensemble.
            </div>`,
          nomFichier: "index.py",
          depart: `# ---- À toi. ----\n\ndef indexer(annuaire):\n    """Renvoie le dictionnaire nom -> telephone.\n\n    annuaire est un tableau de couples [nom, telephone].\n    """\n    pass\n\ndef indexer_inverse(annuaire):\n    """Renvoie le dictionnaire telephone -> nom."""\n    pass\n`,
          validation: {
            tests: `a = [["lea", "0611"], ["tom", "0622"], ["zoe", "0633"]]\nassert indexer(a) == {"lea": "0611", "tom": "0622", "zoe": "0633"}, "Chaque nom doit pointer vers son numéro."\nassert indexer_inverse(a) == {"0611": "lea", "0622": "tom", "0633": "zoe"}, "Et chaque numéro vers son nom."\nassert indexer([]) == {}, "Un annuaire vide donne un dictionnaire vide."\nassert indexer_inverse([]) == {}, "..."\nassert a == [["lea", "0611"], ["tom", "0622"], ["zoe", "0633"]], "L'annuaire reçu ne doit pas être modifié."\nd = indexer(a)\nassert d["tom"] == "0622", "La recherche par nom devient immédiate."\ni = indexer_inverse(a)\nassert i["0622"] == "tom", "Et la recherche par numéro aussi."\nb = [["x", "1"], ["y", "1"]]\nassert indexer(b) == {"x": "1", "y": "1"}, "Deux personnes peuvent partager un numéro : les clés restent distinctes."\nassert len(indexer_inverse(b)) == 1, "Mais dans l'autre sens, le numéro est une clé unique : un seul couple survit."`,
          },
          felicitation: "Deux index, deux sens de recherche, et plus un seul parcours. 🔁",
          indices: [
            "Les deux fonctions ont exactement la même forme : un dictionnaire vide, une boucle sur les couples, une association par tour.",
            "Un couple de l'annuaire est un tableau de deux cases : <code>couple[0]</code> est le nom, <code>couple[1]</code> le téléphone.",
            "La seule différence entre les deux fonctions est le sens de l'association : ce qui était clé devient valeur, et réciproquement.",
          ],
          solution: `# ---- À toi. ----\n\ndef indexer(annuaire):\n    """Renvoie le dictionnaire nom -> telephone.\n\n    annuaire est un tableau de couples [nom, telephone].\n    """\n    d = {}\n    for couple in annuaire:\n        d[couple[0]] = couple[1]\n    return d\n\ndef indexer_inverse(annuaire):\n    """Renvoie le dictionnaire telephone -> nom."""\n    d = {}\n    for couple in annuaire:\n        d[couple[1]] = couple[0]\n    return d\n`,
          apres: `<span class="chapo">Le dernier test dit une chose importante</span>
            Quand deux personnes partagent un numéro, l'index inverse n'en garde qu'une : la
            seconde association écrase la première, puisqu'<strong>une clé n'existe qu'une
            fois</strong>.
            <br><br>
            Ce n'est pas un bug, c'est une propriété du type abstrait — et c'est à toi de
            décider si elle convient. Si tu veux garder tout le monde, la valeur associée à un
            numéro ne doit plus être un nom, mais un <strong>tableau de noms</strong>.
            <br><br>
            C'est exactement ce que fait un moteur de recherche : à chaque mot, il associe la
            <em>liste</em> des documents où il apparaît. On appelle cela un <strong>index
            inversé</strong>, et tu en construiras un en défi.`,
        },

        {
          id: "a6",
          type: "code",
          titre: "Deux méthodes pour les doublons",
          contenu: `
            <p>Même problème, deux structures, et une différence de coût spectaculaire.</p>

            <p><code>a_un_doublon_liste(t)</code> renvoie <code>True</code> si le tableau
            <code>t</code> contient deux fois la même valeur, en comparant les éléments
            <strong>deux à deux</strong> — sans aucun dictionnaire.</p>

            <p><code>a_un_doublon_dico(t)</code> répond à la même question en se servant d'un
            <strong>dictionnaire</strong>, et en ne parcourant <code>t</code> qu'une seule
            fois.</p>

            <p>Les deux sont instrumentées : <code>COUT</code> compte les comparaisons ou les
            consultations. Le programme du bas affichera les deux mesures.</p>`,
          nomFichier: "doublons.py",
          depart: `COUT = [0]\n\n# ---- À toi. ----\n\ndef a_un_doublon_liste(t):\n    """Renvoie True si t contient deux fois la meme valeur.\n\n    Compare les elements deux a deux. Compte une unite dans COUT\n    a chaque comparaison de deux elements.\n    """\n    pass\n\ndef a_un_doublon_dico(t):\n    """Renvoie True si t contient deux fois la meme valeur.\n\n    Se sert d'un dictionnaire, et ne parcourt t qu'une seule fois.\n    Compte une unite dans COUT a chaque consultation du dictionnaire.\n    """\n    pass\n\n\n# ---- Les deux mesures. Ne modifie pas ces lignes. ----\nsans_doublon = list(range(300))\n\nCOUT[0] = 0\na_un_doublon_liste(sans_doublon)\nprint("deux à deux :", COUT[0])\n\nCOUT[0] = 0\na_un_doublon_dico(sans_doublon)\nprint("dictionnaire :", COUT[0])\n`,
          validation: {
            codeContient: [
              { motif: "\\bCOUT\\s*\\[\\s*0\\s*\\][\\s\\S]*\\bCOUT\\s*\\[\\s*0\\s*\\][\\s\\S]*\\bCOUT\\s*\\[\\s*0\\s*\\]",
                message: "Les deux fonctions doivent compter leurs opérations dans COUT." },
            ],
            sortie: "deux à deux : 44850\ndictionnaire : 300",
            tests: `assert a_un_doublon_liste([]) == False, "Un tableau vide n'a pas de doublon."\nassert a_un_doublon_liste([1]) == False, "Un seul élément non plus."\nassert a_un_doublon_liste([1, 2, 3]) == False, "Trois valeurs distinctes."\nassert a_un_doublon_liste([1, 2, 1]) == True, "Le 1 apparaît deux fois."\nassert a_un_doublon_liste([5, 5]) == True, "..."\nassert a_un_doublon_liste(["a", "b", "b"]) == True, "..."\nassert a_un_doublon_dico([]) == False, "Un tableau vide n'a pas de doublon."\nassert a_un_doublon_dico([1]) == False, "..."\nassert a_un_doublon_dico([1, 2, 3]) == False, "..."\nassert a_un_doublon_dico([1, 2, 1]) == True, "..."\nassert a_un_doublon_dico([5, 5]) == True, "..."\nassert a_un_doublon_dico(["a", "b", "b"]) == True, "..."\nt = list(range(200))\nCOUT[0] = 0\na_un_doublon_dico(t)\nassert COUT[0] <= 400, "La version dictionnaire ne doit parcourir le tableau qu'une seule fois."\nCOUT[0] = 0\na_un_doublon_liste(t)\nassert COUT[0] > 5000, "La version deux à deux doit bien comparer toutes les paires."`,
          },
          felicitation: "Le même problème, et un rapport de 150 entre les deux méthodes. ⚖️",
          indices: [
            "Pour la version deux à deux : deux boucles imbriquées sur les indices, la seconde partant juste après la première pour ne pas comparer un élément avec lui-même ni refaire deux fois la même paire.",
            "Pour la version dictionnaire : un dictionnaire vide, puis une seule boucle. À chaque valeur, la question est « l'ai-je déjà vue ? ».",
            "Dans les deux cas, la ligne <code>COUT[0] = COUT[0] + 1</code> se place juste avant la comparaison ou la consultation qu'on veut compter. Dès qu'un doublon est trouvé, la fonction peut s'arrêter.",
          ],
          solution: `COUT = [0]\n\n# ---- À toi. ----\n\ndef a_un_doublon_liste(t):\n    """Renvoie True si t contient deux fois la meme valeur.\n\n    Compare les elements deux a deux. Compte une unite dans COUT\n    a chaque comparaison de deux elements.\n    """\n    for i in range(len(t)):\n        for j in range(i + 1, len(t)):\n            COUT[0] = COUT[0] + 1\n            if t[i] == t[j]:\n                return True\n    return False\n\ndef a_un_doublon_dico(t):\n    """Renvoie True si t contient deux fois la meme valeur.\n\n    Se sert d'un dictionnaire, et ne parcourt t qu'une seule fois.\n    Compte une unite dans COUT a chaque consultation du dictionnaire.\n    """\n    vus = {}\n    for x in t:\n        COUT[0] = COUT[0] + 1\n        if x in vus:\n            return True\n        vus[x] = True\n    return False\n\n\n# ---- Les deux mesures. Ne modifie pas ces lignes. ----\nsans_doublon = list(range(300))\n\nCOUT[0] = 0\na_un_doublon_liste(sans_doublon)\nprint("deux à deux :", COUT[0])\n\nCOUT[0] = 0\na_un_doublon_dico(sans_doublon)\nprint("dictionnaire :", COUT[0])\n`,
          apres: `<span class="chapo">44 850 contre 300</span>
            La version deux à deux compare toutes les paires : sur 300 éléments, cela fait
            300 × 299 / 2 = 44 850 comparaisons. C'est un coût
            <strong>quadratique</strong> — celui de la séance 5.
            <br><br>
            La version dictionnaire parcourt une seule fois, et pose une question dont la
            réponse est immédiate : 300 opérations. C'est <strong>linéaire</strong>.
            <br><br>
            Fais le calcul sur un million d'éléments : 500 milliards d'opérations d'un côté,
            un million de l'autre. La première met des heures, la seconde une fraction de
            seconde. Le dictionnaire coûte un peu de mémoire — il retient toutes les valeurs
            vues — et c'est un échange dont on ne se prive presque jamais.`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Grouper par clé",
          contenu: `
            <p>La construction la plus utile du monde réel, et celle que les élèves ratent le
            plus souvent en devoir.</p>

            <p><code>grouper(eleves)</code> reçoit un tableau de couples
            <code>[classe, nom]</code> et renvoie un dictionnaire qui associe à chaque classe
            le <strong>tableau</strong> des noms de ses élèves, <strong>dans l'ordre du
            tableau reçu</strong>.</p>

            <pre class="bloc-code"><code>grouper([["A", "lea"], ["B", "tom"], ["A", "zoe"]])
   →  {"A": ["lea", "zoe"], "B": ["tom"]}</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège de la première fois</span>
              Quand une classe apparaît pour la première fois, il n'y a encore aucun tableau
              où ajouter le nom. Écrire directement <code>d[classe].append(nom)</code> lève
              alors une <code>KeyError</code>.
              <br><br>
              Il faut donc, à chaque tour, s'assurer que le tableau existe <em>avant</em> d'y
              ajouter quoi que ce soit.
            </div>`,
          nomFichier: "grouper.py",
          depart: `# ---- À toi. ----\n\ndef grouper(eleves):\n    """Renvoie un dictionnaire classe -> tableau des noms.\n\n    eleves est un tableau de couples [classe, nom].\n    Les noms de chaque classe sont dans l'ordre du tableau recu.\n    """\n    pass\n`,
          validation: {
            tests: `assert grouper([]) == {}, "Aucun élève, aucune classe."\nassert grouper([["A", "lea"]]) == {"A": ["lea"]}, "Un seul élève."\nr = grouper([["A", "lea"], ["B", "tom"], ["A", "zoe"]])\nassert r == {"A": ["lea", "zoe"], "B": ["tom"]}, "Les deux élèves de A sont regroupés, dans l'ordre."\ne = [["A", "x"], ["A", "y"], ["A", "z"]]\nassert grouper(e) == {"A": ["x", "y", "z"]}, "Trois élèves dans la même classe."\nassert e == [["A", "x"], ["A", "y"], ["A", "z"]], "Le tableau reçu ne doit pas être modifié."\nr2 = grouper([["B", "1"], ["A", "2"], ["B", "3"], ["C", "4"], ["A", "5"]])\nassert r2["A"] == ["2", "5"], "L'ordre d'apparition doit être respecté dans chaque groupe."\nassert r2["B"] == ["1", "3"], "..."\nassert r2["C"] == ["4"], "..."\nassert len(r2) == 3, "Trois classes distinctes."\nr3 = grouper([["A", "x"], ["A", "x"]])\nassert r3 == {"A": ["x", "x"]}, "Un doublon reste un doublon : on ne dédoublonne pas."`,
          },
          felicitation: "Grouper par clé : la manœuvre la plus utile de tout le chapitre. 🗃️",
          indices: [
            "Un dictionnaire vide avant la boucle, et une boucle sur les couples.",
            "Pour chaque couple, deux cas : la classe est déjà une clé, ou c'est la première fois qu'on la rencontre.",
            "Dans le second cas, il faut d'abord associer à cette classe un <strong>tableau vide</strong>. Ensuite seulement, et dans les deux cas, on y ajoute le nom.",
          ],
          solution: `# ---- À toi. ----\n\ndef grouper(eleves):\n    """Renvoie un dictionnaire classe -> tableau des noms.\n\n    eleves est un tableau de couples [classe, nom].\n    Les noms de chaque classe sont dans l'ordre du tableau recu.\n    """\n    groupes = {}\n    for couple in eleves:\n        classe = couple[0]\n        nom = couple[1]\n        if classe not in groupes:\n            groupes[classe] = []\n        groupes[classe].append(nom)\n    return groupes\n`,
          apres: `<span class="chapo">Le motif à retenir par cœur</span>
            <pre class="bloc-code"><code>if cle not in d:
    d[cle] = []       # on prépare le récipient
d[cle].append(x)      # puis on remplit</code></pre>
            Ces trois lignes résolvent toutes les questions de la forme « regroupe ces données
            par … » : les élèves par classe, les commandes par client, les mots par première
            lettre, les documents par mot-clé.
            <br><br>
            Remarque qu'on associe une <strong>structure</strong> — ici un tableau — comme
            valeur. Rien ne l'interdit, et c'est ce qui rend le dictionnaire si souple : la
            valeur peut être un nombre, un tableau, un autre dictionnaire, une file… Tu vas
            t'en servir tout de suite.`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "choisir, combiner, et justifier",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Quelle structure pour quel besoin ?",
          contenu: `
            <p>Le récapitulatif de tout le chapitre :</p>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Structure</th><th>Ce qu'elle fait très bien</th><th>Ce qu'elle ne sait pas faire</th></tr>
              <tr><td><strong>Pile</strong></td><td>reprendre le plus récent</td><td>tout le reste</td></tr>
              <tr><td><strong>File</strong></td><td>servir dans l'ordre d'arrivée</td><td>tout le reste</td></tr>
              <tr><td><strong>Tableau</strong></td><td>lire par rang, parcourir dans l'ordre</td><td>insérer au milieu</td></tr>
              <tr><td><strong>Liste chaînée</strong></td><td>insérer et retirer partout</td><td>lire par rang</td></tr>
              <tr><td><strong>Dictionnaire</strong></td><td>retrouver par une clé</td><td>garantir un ordre</td></tr>
            </table>
            </div>
            <p><strong>La situation.</strong> Un service de messagerie doit, pour chaque
            utilisateur, afficher ses messages <strong>du plus récent au plus ancien</strong>,
            et retrouver <strong>instantanément</strong> les messages d'un utilisateur donné
            parmi dix millions d'utilisateurs.</p>`,
          question: "Quelle est la bonne réponse ?",
          options: [
            { texte: "Un dictionnaire « utilisateur → pile de ses messages ».", correct: true,
              explication: "Oui, et c'est le point de la séance : <strong>deux structures</strong>. Le dictionnaire règle la recherche instantanée par utilisateur ; la pile, rangée comme valeur, règle l'ordre du plus récent au plus ancien. Chacune fait ce qu'elle sait faire." },
            { texte: "Un dictionnaire « utilisateur → messages », et tant pis pour l'ordre.",
              explication: "La recherche serait immédiate, mais l'affichage du plus récent au plus ancien fait partie de l'énoncé : on ne peut pas le sacrifier." },
            { texte: "Un grand tableau de tous les messages, trié par date.",
                explication: "L'ordre serait parfait, mais retrouver les messages d'un utilisateur demanderait de parcourir les dix millions à chaque affichage — exactement ce que l'énoncé interdit." },
            { texte: "Une file par utilisateur, dans un tableau d'utilisateurs.",
              explication: "Deux erreurs : une file rend le plus <em>ancien</em> en premier, et chercher un utilisateur dans un tableau redemande un parcours complet." },
          ],
          apres: `<span class="chapo">Combiner est la règle, pas l'exception</span>
            Presque aucun vrai problème ne se résout avec une seule structure. Le réflexe à
            prendre est de <strong>séparer les besoins</strong> :
            <ul>
              <li>« retrouver par … » → un dictionnaire, dont la clé est le « par … » ;</li>
              <li>« dans l'ordre … » → la structure qui garantit cet ordre, rangée
              <em>comme valeur</em>.</li>
            </ul>
            Et si l'on doit chercher dans deux sens, on tient deux dictionnaires — quitte à
            payer de la mémoire et à les mettre à jour ensemble.
            <br><br>
            C'est exactement ce que le programme officiel appelle « choisir une structure de
            données adaptée à la situation à modéliser ». En devoir, la réponse attendue n'est
            jamais un nom de structure : c'est un nom de structure <strong>suivi d'une
            justification opération par opération</strong>.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Se souvenir au lieu de recalculer",
          contenu: `
            <p>Un dictionnaire ne sert pas qu'à ranger des données : il sert aussi à
            <strong>se souvenir de calculs déjà faits</strong>. On appelle cela un
            <em>cache</em>, ou une <em>mémoïsation</em>.</p>

            <p>La fonction <code>lente(n)</code> t'est donnée : elle fait semblant de coûter
            cher, et compte ses appels réels.</p>

            <p>Écris <code>rapide(n)</code> : elle renvoie exactement la même chose, mais ne
            fait appel à <code>lente</code> qu'une seule fois par valeur de <code>n</code>.
            Les résultats déjà calculés sont retenus dans le dictionnaire
            <code>CACHE</code>.</p>

            <pre class="bloc-code"><code>appels sans cache : 8
appels avec cache : 3</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Un dictionnaire hors de la fonction</span>
              <code>CACHE</code> est défini avant <code>rapide</code>, au niveau du fichier.
              La fonction peut le <strong>lire et le modifier</strong> sans avoir à le
              recevoir en argument, parce qu'un dictionnaire est modifiable — comme la liste
              <code>COUT</code> depuis la séance 5.
            </div>`,
          nomFichier: "cache.py",
          depart: `# ---- La fonction coûteuse, instrumentée. N'y touche pas. ----\n\nAPPELS = [0]\n\ndef lente(n):\n    """Fait semblant de couter cher. Compte ses appels reels."""\n    APPELS[0] = APPELS[0] + 1\n    return n * n + 1\n\n\nCACHE = {}\n\n# ---- À toi. ----\n\ndef rapide(n):\n    """Renvoie lente(n), sans jamais la rappeler pour un n deja calcule."""\n    pass\n\n\n# ---- La comparaison. Ne modifie pas ces lignes. ----\nDEMANDES = [3, 5, 3, 7, 5, 3, 7, 5]\n\nAPPELS[0] = 0\nfor v in DEMANDES:\n    lente(v)\nprint("appels sans cache :", APPELS[0])\n\nAPPELS[0] = 0\nfor v in DEMANDES:\n    rapide(v)\nprint("appels avec cache :", APPELS[0])\n`,
          validation: {
            codeContient: [
              { motif: "\\bCACHE\\b[\\s\\S]*\\bCACHE\\b", message: "rapide() doit lire le cache et y ranger ses résultats." },
              { motif: "\\blente\\s*\\(", message: "Le calcul lui-même reste fait par lente()." },
            ],
            sortie: "appels sans cache : 8\nappels avec cache : 3",
            tests: `CACHE.clear()\nAPPELS[0] = 0\nassert rapide(4) == 17, "rapide() doit rendre exactement ce que rend lente()."\nassert APPELS[0] == 1, "Le premier appel calcule vraiment."\nassert rapide(4) == 17, "Le second doit rendre la même chose."\nassert APPELS[0] == 1, "Mais sans rappeler lente() : la valeur était déjà connue."\nassert rapide(9) == 82, "Une nouvelle valeur demande un vrai calcul."\nassert APPELS[0] == 2, "..."\nassert rapide(9) == 82, "..."\nassert rapide(4) == 17, "..."\nassert APPELS[0] == 2, "Aucun calcul supplémentaire pour des valeurs déjà vues."\nCACHE.clear()\nAPPELS[0] = 0\nfor v in [1, 1, 2, 2, 3, 3, 1, 2, 3]:\n    rapide(v)\nassert APPELS[0] == 3, "Trois valeurs distinctes, trois calculs — quel que soit le nombre de demandes."`,
          },
          felicitation: "Huit demandes, trois calculs. Le dictionnaire a fait le reste. 💾",
          indices: [
            "Deux cas : la valeur est déjà une clé du cache, ou elle ne l'est pas encore.",
            "Si elle y est, il n'y a rien à calculer : la réponse est déjà rangée.",
            "Sinon, il faut appeler <code>lente</code>, <strong>ranger le résultat dans le cache</strong>, et le renvoyer. Oublier de le ranger fait perdre tout l'intérêt.",
          ],
          solution: `# ---- La fonction coûteuse, instrumentée. N'y touche pas. ----\n\nAPPELS = [0]\n\ndef lente(n):\n    """Fait semblant de couter cher. Compte ses appels reels."""\n    APPELS[0] = APPELS[0] + 1\n    return n * n + 1\n\n\nCACHE = {}\n\n# ---- À toi. ----\n\ndef rapide(n):\n    """Renvoie lente(n), sans jamais la rappeler pour un n deja calcule."""\n    if n in CACHE:\n        return CACHE[n]\n    resultat = lente(n)\n    CACHE[n] = resultat\n    return resultat\n\n\n# ---- La comparaison. Ne modifie pas ces lignes. ----\nDEMANDES = [3, 5, 3, 7, 5, 3, 7, 5]\n\nAPPELS[0] = 0\nfor v in DEMANDES:\n    lente(v)\nprint("appels sans cache :", APPELS[0])\n\nAPPELS[0] = 0\nfor v in DEMANDES:\n    rapide(v)\nprint("appels avec cache :", APPELS[0])\n`,
          apres: `<span class="chapo">Une technique que tu reverras cette année</span>
            La mémoïsation transforme certains algorithmes catastrophiques en algorithmes
            immédiats. L'exemple canonique est la suite de Fibonacci calculée récursivement :
            sans cache, elle recalcule les mêmes valeurs des millions de fois et devient
            inutilisable au-delà de 40 ; avec ce dictionnaire de trois lignes, elle répond
            instantanément pour 1 000.
            <br><br>
            C'est le principe de la <strong>programmation dynamique</strong>, qui figure au
            programme de terminale dans la rubrique « algorithmique ». Tu le retrouveras
            au chapitre correspondant — et tu sauras alors que le dictionnaire en est le
            moteur.
            <br><br>
            Le prix, comme toujours : de la mémoire. Un cache qui ne s'efface jamais finit par
            tout retenir. Les vrais caches limitent leur taille et oublient les valeurs les
            moins utilisées — ce qui demande, tu l'auras deviné, une structure de plus pour
            retenir l'ordre d'utilisation.`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Un moteur de recherche minuscule",
          contenu: `
            <p>Le vrai index inversé. <code>construire_index(documents)</code> reçoit un
            tableau de couples <code>[titre, texte]</code> et renvoie un dictionnaire qui
            associe à chaque <strong>mot</strong> le tableau des <strong>titres</strong> des
            documents où il apparaît.</p>

            <p>Les titres sont dans l'ordre des documents, et <strong>sans doublon</strong> :
            un mot répété dans un même document ne fait apparaître son titre qu'une fois.</p>

            <pre class="bloc-code"><code>construire_index([["a", "le chat"], ["b", "le chien"]])
   →  {"le": ["a", "b"], "chat": ["a"], "chien": ["b"]}</code></pre>

            <p>Puis <code>chercher(index, mot)</code> renvoie le tableau des titres contenant
            <code>mot</code>, ou un tableau vide si aucun.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Découper un texte en mots</span>
              <code>texte.split()</code> renvoie le tableau des mots d'une chaîne, en coupant
              sur les espaces. <code>"le chat".split()</code> vaut
              <code>["le", "chat"]</code>.
            </div>`,
          nomFichier: "moteur.py",
          depart: `# ---- À toi. ----\n\ndef construire_index(documents):\n    """Renvoie le dictionnaire mot -> tableau des titres qui contiennent ce mot.\n\n    documents est un tableau de couples [titre, texte].\n    Les titres sont dans l'ordre des documents, et sans doublon.\n    """\n    pass\n\ndef chercher(index, mot):\n    """Renvoie le tableau des titres contenant mot, ou [] si aucun."""\n    pass\n`,
          validation: {
            tests: `i = construire_index([["a", "le chat"], ["b", "le chien"]])\nassert i == {"le": ["a", "b"], "chat": ["a"], "chien": ["b"]}, "Chaque mot doit pointer vers les titres où il apparaît."\nassert construire_index([]) == {}, "Aucun document, aucun mot."\nassert construire_index([["x", ""]]) == {}, "Un document vide n'apporte aucun mot."\nj = construire_index([["doc", "le le le"]])\nassert j == {"le": ["doc"]}, "Un mot répété dans un même document ne doit faire apparaître son titre qu'une fois."\nk = construire_index([["1", "a b"], ["2", "b c"], ["3", "a c"]])\nassert k["a"] == ["1", "3"], "Les titres doivent être dans l'ordre des documents."\nassert k["b"] == ["1", "2"], "..."\nassert k["c"] == ["2", "3"], "..."\nassert chercher(k, "a") == ["1", "3"], "chercher() rend le tableau de l'index."\nassert chercher(k, "b") == ["1", "2"], "..."\nassert chercher(k, "zzz") == [], "Un mot absent doit donner un tableau vide, pas une erreur."\nassert chercher({}, "quoi") == [], "Sur un index vide non plus."\nd = [["t", "un deux"]]\nconstruire_index(d)\nassert d == [["t", "un deux"]], "Le tableau de documents ne doit pas être modifié."`,
          },
          felicitation: "Un index inversé : le cœur de tous les moteurs de recherche. 🔎",
          indices: [
            "Un dictionnaire vide, une boucle sur les documents, et pour chaque document une boucle sur les mots de son texte.",
            "Pour chaque mot, c'est le motif « grouper par clé » de l'exercice précédent : si le mot n'est pas encore une clé, lui associer un tableau vide, puis y ajouter le titre.",
            "Le piège est le doublon : avant d'ajouter le titre, vérifie qu'il n'y figure pas déjà. L'opérateur <code>in</code> répond sur un tableau aussi.",
          ],
          solution: `# ---- À toi. ----\n\ndef construire_index(documents):\n    """Renvoie le dictionnaire mot -> tableau des titres qui contiennent ce mot.\n\n    documents est un tableau de couples [titre, texte].\n    Les titres sont dans l'ordre des documents, et sans doublon.\n    """\n    index = {}\n    for document in documents:\n        titre = document[0]\n        for mot in document[1].split():\n            if mot not in index:\n                index[mot] = []\n            if titre not in index[mot]:\n                index[mot].append(titre)\n    return index\n\ndef chercher(index, mot):\n    """Renvoie le tableau des titres contenant mot, ou [] si aucun."""\n    if mot in index:\n        return index[mot]\n    return []\n`,
          apres: `<span class="chapo">Pourquoi « inversé »</span>
            Un document associe un titre à des mots ; l'index fait l'inverse : il associe un
            mot à des titres. C'est exactement le renversement de l'exercice de l'annuaire, à
            ceci près que la valeur est un <strong>tableau</strong>, puisqu'un mot peut
            apparaître dans plusieurs documents.
            <br><br>
            C'est la structure qui permet à un moteur de recherche de répondre en quelques
            millisecondes sur des milliards de pages. Il ne parcourt évidemment pas le web à
            chaque requête : il a construit son index à l'avance, et une recherche n'est
            qu'une consultation de dictionnaire.
            <br><br>
            Le coût est reporté sur la construction — longue, et refaite en permanence — et
            sur la mémoire. C'est le compromis fondamental de toute indexation : <strong>on
            travaille beaucoup une fois pour répondre vite un million de fois</strong>.`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Un dictionnaire qui se souvient de l'ordre",
          contenu: `
            <p>Un dictionnaire ne garantit aucun ordre. Quand on en a besoin, la solution est
            celle du défi 1 : <strong>deux structures</strong>.</p>

            <p>Un <strong>dictionnaire ordonné</strong> est
            <code>[dictionnaire, tableau des clés dans l'ordre d'insertion]</code>. Écris ses
            quatre opérations :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th></tr>
              <tr><td><code>ordonne_vide()</code></td><td>un dictionnaire ordonné sans aucun couple</td></tr>
              <tr><td><code>ordonne_associer(o, cle, valeur)</code></td><td>associe ; une clé <strong>déjà présente</strong> garde sa place dans l'ordre</td></tr>
              <tr><td><code>ordonne_valeur(o, cle)</code></td><td>la valeur associée — précondition : la clé est présente</td></tr>
              <tr><td><code>ordonne_cles(o)</code></td><td>le tableau des clés, <strong>dans l'ordre de première insertion</strong></td></tr>
            </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'invariant à tenir</span>
              Les deux moitiés doivent rester d'accord : toute clé du dictionnaire figure une
              fois et une seule dans le tableau, et réciproquement. C'est la même exigence
              qu'à la séance 6 avec le compteur — et c'est là que se logent les bugs.
            </div>`,
          nomFichier: "ordonne.py",
          depart: `# Un dictionnaire ordonné est [dictionnaire, tableau des clés dans l'ordre].\n\n# ---- À toi. ----\n\ndef ordonne_vide():\n    """Renvoie un dictionnaire ordonne sans aucun couple."""\n    pass\n\ndef ordonne_associer(o, cle, valeur):\n    """Associe valeur a cle.\n\n    Une cle deja presente garde sa place dans l'ordre.\n    """\n    pass\n\ndef ordonne_valeur(o, cle):\n    """Renvoie la valeur associee a cle.\n\n    Precondition : cle est presente.\n    """\n    pass\n\ndef ordonne_cles(o):\n    """Renvoie le tableau des cles, dans l'ordre de premiere insertion."""\n    pass\n`,
          validation: {
            tests: `o = ordonne_vide()\nassert o == [{}, []], "Un dictionnaire ordonné neuf : un dictionnaire vide et un tableau vide."\nassert ordonne_cles(o) == [], "Aucune clé."\nordonne_associer(o, "b", 1)\nordonne_associer(o, "a", 2)\nordonne_associer(o, "c", 3)\nassert ordonne_cles(o) == ["b", "a", "c"], "Les clés doivent sortir dans l'ordre d'insertion, pas dans l'ordre alphabétique."\nassert ordonne_valeur(o, "a") == 2, "Et les valeurs doivent être correctes."\nassert ordonne_valeur(o, "b") == 1, "..."\nordonne_associer(o, "b", 99)\nassert ordonne_valeur(o, "b") == 99, "Réassocier une clé change sa valeur."\nassert ordonne_cles(o) == ["b", "a", "c"], "Mais ne change pas sa place dans l'ordre, et ne la duplique pas."\nassert len(o[1]) == 3, "Le tableau des clés ne doit contenir que trois entrées."\np = ordonne_vide()\nfor i in range(10):\n    ordonne_associer(p, "k" + str(i), i)\nfor i in range(10):\n    ordonne_associer(p, "k" + str(i), i * 100)\nassert ordonne_cles(p) == ["k" + str(i) for i in range(10)], "Dix clés réassociées : l'ordre doit être intact."\nassert ordonne_valeur(p, "k7") == 700, "Et les valeurs à jour."\nassert len(ordonne_cles(p)) == 10, "Sans aucun doublon."`,
          },
          felicitation: "Deux structures, un seul invariant, et un ordre enfin garanti. 📋",
          indices: [
            "Un dictionnaire ordonné neuf, ce sont deux récipients vides rangés dans une liste de deux cases.",
            "<code>ordonne_valeur</code> et <code>ordonne_cles</code> ne font que lire l'une ou l'autre moitié : une ligne chacune.",
            "Dans <code>ordonne_associer</code>, la valeur est toujours rangée dans le dictionnaire. La clé, en revanche, ne rejoint le tableau que si elle n'y figure pas déjà.",
          ],
          solution: `# Un dictionnaire ordonné est [dictionnaire, tableau des clés dans l'ordre].\n\n# ---- À toi. ----\n\ndef ordonne_vide():\n    """Renvoie un dictionnaire ordonne sans aucun couple."""\n    return [{}, []]\n\ndef ordonne_associer(o, cle, valeur):\n    """Associe valeur a cle.\n\n    Une cle deja presente garde sa place dans l'ordre.\n    """\n    if cle not in o[0]:\n        o[1].append(cle)\n    o[0][cle] = valeur\n\ndef ordonne_valeur(o, cle):\n    """Renvoie la valeur associee a cle.\n\n    Precondition : cle est presente.\n    """\n    return o[0][cle]\n\ndef ordonne_cles(o):\n    """Renvoie le tableau des cles, dans l'ordre de premiere insertion."""\n    return o[1]\n`,
          apres: `<span class="chapo">L'ordre du test, et pourquoi il est décisif</span>
            <pre class="bloc-code"><code>if cle not in o[0]:      # on interroge le dictionnaire AVANT
    o[1].append(cle)     # d'y ranger la valeur
o[0][cle] = valeur</code></pre>
            Si l'on rangeait d'abord la valeur, la clé serait toujours présente au moment du
            test, et le tableau ne s'allongerait jamais. Une inversion de deux lignes, et la
            structure perd complètement l'ordre.
            <br><br>
            Note aussi qu'on teste la présence dans le <strong>dictionnaire</strong>, pas dans
            le tableau : <code>cle in o[0]</code> est immédiat, alors que
            <code>cle in o[1]</code> parcourrait tout le tableau. Sur dix mille clés, la
            différence est celle du début de séance.
            <br><br>
            C'est très exactement ainsi que fonctionnent les dictionnaires de Python depuis la
            version 3.7 : ils retiennent l'ordre d'insertion, et le paient par une structure
            supplémentaire. Tu viens d'en écrire le principe.`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le suivi des commandes",
          contenu: `
            <p>Défi de synthèse : deux structures qui travaillent ensemble, comme au défi 1.</p>

            <p>Un restaurant prend des commandes. Il faut :</p>
            <ul>
              <li>les <strong>préparer dans l'ordre d'arrivée</strong> — une file ;</li>
              <li>retrouver <strong>instantanément</strong> l'état d'une commande à partir de
              son numéro — un dictionnaire.</li>
            </ul>

            <p>Un service est <code>[file des numéros en attente, dictionnaire numéro → état]</code>.
            Les états possibles sont les chaînes <code>"en attente"</code> et
            <code>"prête"</code>.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Ce qu'elle fait</th></tr>
              <tr><td><code>service_vide()</code></td><td>un service sans aucune commande</td></tr>
              <tr><td><code>commander(s, numero)</code></td><td>la commande entre en file, à l'état <code>"en attente"</code></td></tr>
              <tr><td><code>preparer(s)</code></td><td>prend la plus ancienne, la passe à <code>"prête"</code>, renvoie son numéro</td></tr>
              <tr><td><code>etat(s, numero)</code></td><td>l'état de cette commande — précondition : elle existe</td></tr>
            </table>
            </div>

            <p>Précondition de <code>preparer</code> : au moins une commande attend. Les
            opérations de file te sont fournies.</p>`,
          nomFichier: "commandes.py",
          depart: `# ---- La file. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef file_est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# Un service est [file des numéros en attente, dictionnaire numéro -> état].\n\n# ---- À toi. ----\n\ndef service_vide():\n    """Renvoie un service sans aucune commande."""\n    pass\n\ndef commander(s, numero):\n    """Enregistre la commande numero, a l'etat "en attente"."""\n    pass\n\ndef preparer(s):\n    """Prepare la commande la plus ancienne et renvoie son numero.\n\n    Elle passe a l'etat "prete".\n    Precondition : au moins une commande attend.\n    """\n    pass\n\ndef etat(s, numero):\n    """Renvoie l'etat de la commande numero.\n\n    Precondition : la commande existe.\n    """\n    pass\n`,
          validation: {
            tests: `s = service_vide()\nassert s == [[], {}], "Un service neuf : une file vide et un dictionnaire vide."\ncommander(s, 1)\nassert etat(s, 1) == "en attente", "Une commande enregistrée attend."\ncommander(s, 2)\ncommander(s, 3)\nassert etat(s, 3) == "en attente", "..."\nassert preparer(s) == 1, "On prépare la plus ancienne."\nassert etat(s, 1) == "prête", "Elle passe à l'état prête."\nassert etat(s, 2) == "en attente", "Les autres n'ont pas bougé."\nassert preparer(s) == 2, "Puis la suivante, dans l'ordre d'arrivée."\nassert etat(s, 2) == "prête", "..."\nassert preparer(s) == 3, "..."\nassert file_est_vide(s[0]) == True, "Plus personne n'attend."\nassert etat(s, 1) == "prête" and etat(s, 3) == "prête", "Les états restent consultables après la préparation."\nt = service_vide()\nfor n in [10, 20, 30, 40]:\n    commander(t, n)\nassert preparer(t) == 10, "..."\ncommander(t, 50)\nassert preparer(t) == 20, "Une nouvelle commande ne double personne."\nassert etat(t, 50) == "en attente", "..."\nassert preparer(t) == 30, "..."\nassert preparer(t) == 40, "..."\nassert preparer(t) == 50, "La dernière arrivée est servie en dernier."\nassert len(t[1]) == 5, "Le dictionnaire garde les cinq commandes, y compris préparées."`,
          },
          felicitation: "Une file pour l'ordre, un dictionnaire pour la recherche. C'est la leçon du chapitre. 🍽️",
          indices: [
            "Un service neuf, ce sont une file neuve et un dictionnaire vide, rangés dans une liste de deux cases.",
            "<code>commander</code> fait deux choses : enfiler le numéro, et l'associer à son état dans le dictionnaire. Oublier l'une des deux casse l'invariant.",
            "<code>preparer</code> défile le numéro le plus ancien, change son état dans le dictionnaire, puis le renvoie. Attention : la commande sort de la <em>file</em>, mais reste dans le <em>dictionnaire</em> — sinon on ne pourrait plus consulter son état.",
          ],
          solution: `# ---- La file. N'y touche pas. ----\n\ndef file_vide():\n    return []\n\ndef file_est_vide(f):\n    return f == []\n\ndef enfiler(f, element):\n    f.append(element)\n\ndef defiler(f):\n    return f.pop(0)\n\n\n# Un service est [file des numéros en attente, dictionnaire numéro -> état].\n\n# ---- À toi. ----\n\ndef service_vide():\n    """Renvoie un service sans aucune commande."""\n    return [file_vide(), {}]\n\ndef commander(s, numero):\n    """Enregistre la commande numero, a l'etat "en attente"."""\n    enfiler(s[0], numero)\n    s[1][numero] = "en attente"\n\ndef preparer(s):\n    """Prepare la commande la plus ancienne et renvoie son numero.\n\n    Elle passe a l'etat "prete".\n    Precondition : au moins une commande attend.\n    """\n    numero = defiler(s[0])\n    s[1][numero] = "prête"\n    return numero\n\ndef etat(s, numero):\n    """Renvoie l'etat de la commande numero.\n\n    Precondition : la commande existe.\n    """\n    return s[1][numero]\n`,
          apres: `<span class="chapo">Deux structures, deux rôles, et un point commun</span>
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>La file</th><th>Le dictionnaire</th></tr>
              <tr><td>Répond à</td><td>« qui est le prochain ? »</td><td>« où en est la n° 42 ? »</td></tr>
              <tr><td>Contient</td><td>les commandes <em>en attente</em></td><td><strong>toutes</strong> les commandes</td></tr>
              <tr><td>Coût</td><td>constant</td><td>constant en moyenne</td></tr>
            </table>
            </div>
            Note bien la deuxième ligne : les deux structures ne contiennent pas la même
            chose. Une commande préparée quitte la file — elle n'attend plus — mais reste dans
            le dictionnaire, sans quoi son état deviendrait inconsultable.
            <br><br>
            C'est le genre de décision qu'il faut savoir prendre <em>et justifier</em> :
            chaque structure ne retient que ce dont elle a besoin pour répondre à sa question.
            La question « ai-je besoin de cette donnée ici ? » vaut mieux que le réflexe « je
            mets tout partout ».`,
        },

        {
          id: "x6",
          type: "code",
          titre: "Justifier son choix",
          contenu: `
            <p>Trois petits problèmes, et pour chacun il faut <strong>choisir</strong> avant
            de programmer.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Fonction</th><th>Ce qu'elle doit faire</th></tr>
              <tr><td><code>premier_unique(mots)</code></td><td>le premier mot du tableau qui n'apparaît qu'une seule fois, ou <code>""</code> s'il n'y en a aucun</td></tr>
              <tr><td><code>equilibre(operations)</code></td><td><code>True</code> si chaque <code>"retrait"</code> est précédé d'un <code>"depot"</code> non encore appairé, et qu'il n'en reste aucun à la fin</td></tr>
              <tr><td><code>service_ordre(arrivees, k)</code></td><td>le tableau des <code>k</code> premiers servis, dans l'ordre d'arrivée</td></tr>
            </table>
            </div>

            <p><code>operations</code> est un tableau de chaînes <code>"depot"</code> et
            <code>"retrait"</code>. Pour <code>service_ordre</code>, si moins de <code>k</code>
            personnes arrivent, on renvoie tout le monde.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Écris ton choix avant ton code</span>
              Pour chacune, commence par écrire en commentaire la structure retenue et la
              raison. Les trois du chapitre y passent : l'une demande un dictionnaire, une
              autre une pile, la troisième une file.
            </div>`,
          nomFichier: "choisir.py",
          depart: `# ---- À toi. Pour chaque fonction, écris d'abord ton choix en commentaire. ----\n\ndef premier_unique(mots):\n    """Renvoie le premier mot de mots qui n'apparait qu'une fois, ou "" si aucun."""\n    pass\n\ndef equilibre(operations):\n    """Renvoie True si les depots et retraits s'apparient correctement.\n\n    operations est un tableau de chaines "depot" et "retrait".\n    Un retrait sans depot en attente rend False ; un depot non appaire\n    a la fin rend False aussi.\n    """\n    pass\n\ndef service_ordre(arrivees, k):\n    """Renvoie le tableau des k premiers servis, dans l'ordre d'arrivee.\n\n    Si moins de k personnes arrivent, renvoie tout le monde.\n    """\n    pass\n`,
          validation: {
            tests: `assert premier_unique([]) == "", "Aucun mot."\nassert premier_unique(["a"]) == "a", "Un seul mot, forcément unique."\nassert premier_unique(["a", "a"]) == "", "Aucun mot unique."\nassert premier_unique(["a", "b", "a"]) == "b", "Le a se répète, le b non."\nassert premier_unique(["a", "b", "a", "b", "c"]) == "c", "Seul le c est unique."\nassert premier_unique(["z", "a", "z", "b"]) == "a", "Le premier unique dans l'ordre du tableau, pas l'ordre alphabétique."\nassert equilibre([]) == True, "Rien à appairer."\nassert equilibre(["depot", "retrait"]) == True, "Un dépôt, un retrait."\nassert equilibre(["depot", "depot", "retrait", "retrait"]) == True, "Deux de chaque, bien imbriqués."\nassert equilibre(["retrait"]) == False, "Un retrait sans dépôt."\nassert equilibre(["depot"]) == False, "Un dépôt jamais appairé."\nassert equilibre(["retrait", "depot"]) == False, "Le retrait arrive trop tôt."\nassert equilibre(["depot", "retrait", "depot", "retrait"]) == True, "Deux paires successives."\nassert service_ordre([], 3) == [], "Personne n'arrive."\nassert service_ordre(["a", "b", "c"], 2) == ["a", "b"], "Les deux premiers arrivés."\nassert service_ordre(["a", "b"], 5) == ["a", "b"], "Moins de monde que demandé : on renvoie tout le monde."\nassert service_ordre(["a", "b", "c"], 0) == [], "On ne sert personne."\nassert service_ordre(["x", "y", "z", "w"], 3) == ["x", "y", "z"], "Dans l'ordre d'arrivée."\na = ["p", "q"]\nservice_ordre(a, 1)\nassert a == ["p", "q"], "Le tableau reçu ne doit pas être modifié."`,
          },
          felicitation: "Trois problèmes, trois structures, et chacune à sa place. 🎯",
          indices: [
            "Pour <code>premier_unique</code> : il faut connaître le nombre d'apparitions de chaque mot — c'est un comptage — puis reparcourir le tableau dans l'ordre pour trouver le premier dont le compte vaut 1.",
            "Pour <code>equilibre</code> : c'est le vérificateur de parenthèses de la séance 3, avec <code>\"depot\"</code> pour ouvrante et <code>\"retrait\"</code> pour fermante. Un compteur suffirait presque — mais il faut détecter le retrait de trop <em>au moment</em> où il arrive.",
            "Pour <code>service_ordre</code> : les personnes sont servies dans l'ordre d'arrivée, donc une file. Attention à ne pas défiler plus qu'il n'y a de monde.",
          ],
          solution: `# ---- À toi. Pour chaque fonction, écris d'abord ton choix en commentaire. ----\n\ndef premier_unique(mots):\n    """Renvoie le premier mot de mots qui n'apparait qu'une fois, ou "" si aucun."""\n    # DICTIONNAIRE : il faut compter les apparitions de chaque mot, et une\n    # recherche par mot doit être immédiate. Le tableau garde l'ordre.\n    comptes = {}\n    for mot in mots:\n        if mot in comptes:\n            comptes[mot] = comptes[mot] + 1\n        else:\n            comptes[mot] = 1\n    for mot in mots:\n        if comptes[mot] == 1:\n            return mot\n    return ""\n\ndef equilibre(operations):\n    """Renvoie True si les depots et retraits s'apparient correctement.\n\n    operations est un tableau de chaines "depot" et "retrait".\n    Un retrait sans depot en attente rend False ; un depot non appaire\n    a la fin rend False aussi.\n    """\n    # PILE : un retrait annule le dépôt le plus récent encore en attente.\n    # C'est exactement le vérificateur de parenthèses.\n    pile = []\n    for operation in operations:\n        if operation == "depot":\n            pile.append(operation)\n        else:\n            if pile == []:\n                return False\n            pile.pop()\n    return pile == []\n\ndef service_ordre(arrivees, k):\n    """Renvoie le tableau des k premiers servis, dans l'ordre d'arrivee.\n\n    Si moins de k personnes arrivent, renvoie tout le monde.\n    """\n    # FILE : premier arrivé, premier servi.\n    file = []\n    for personne in arrivees:\n        file.append(personne)\n    servis = []\n    for _ in range(k):\n        if file == []:\n            return servis\n        servis.append(file.pop(0))\n    return servis\n`,
          apres: `<span class="chapo">Ce qu'on attend de toi en devoir</span>
            Les trois solutions tiennent en une dizaine de lignes chacune. Ce qui prend du
            temps, et ce qui rapporte des points, c'est la ligne de commentaire en tête :
            <strong>nommer la structure et dire pourquoi</strong>.
            <br><br>
            Une justification correcte a toujours la même forme : <em>« le problème demande
            telle opération, cette structure la rend immédiate, les autres la rendent
            coûteuse »</em>. Elle ne dit jamais « c'est plus rapide » sans préciser quelle
            opération l'est.
            <br><br>
            Remarque enfin que <code>equilibre</code> se passerait d'une pile : un simple
            compteur qui ne doit jamais passer sous zéro suffirait. C'est vrai, et c'est même
            plus économe — mais seulement parce qu'il n'y a <em>qu'une sorte</em> de dépôt. Dès
            qu'il y en aurait deux, comme les trois sortes de parenthèses de la séance 3, la
            pile redeviendrait indispensable. Savoir quand une structure est superflue fait
            partie du métier.`,
        },

        {
          id: "x7",
          type: "code",
          titre: "À toi de choisir",
          contenu: `
            <p>Dernier défi du chapitre, libre. Invente un petit problème qui a besoin de
            <strong>deux structures</strong> du chapitre, et résous-le.</p>

            <p>Quelques idées : un <strong>vestiaire</strong> — un jeton par manteau, et une
            file d'attente ; un <strong>lecteur de musique</strong> — la file de lecture et un
            dictionnaire titre → durée ; un <strong>jeu de cartes</strong> — la pioche en pile
            et le score de chaque joueur ; un <strong>carnet de rendez-vous</strong> — l'ordre
            chronologique et l'accès par nom ; un <strong>cache de pages web</strong> — les
            pages retenues et l'ordre de leur dernière consultation…</p>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>un <strong>commentaire en tête</strong> qui nomme les deux structures
              retenues et dit à quelle question chacune répond ;</li>
              <li>au moins <strong>trois fonctions</strong>, chacune avec sa
              <strong>docstring</strong> ;</li>
              <li>un <strong>dictionnaire</strong> quelque part, et une <strong>pile ou une
              file</strong> ;</li>
              <li>un programme d'essai qui affiche au moins <strong>trois lignes</strong>.</li>
            </ul>`,
          nomFichier: "mon_choix.py",
          depart: `# Mon problème : .....................\n#\n# Structure 1 : ............ pour répondre à « ............ »\n# Structure 2 : ............ pour répondre à « ............ »\n#\n# Écris ici tes fonctions, chacune avec sa docstring,\n# puis le programme d'essai en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){3}",
                message: "Il faut au moins trois fonctions." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){3}",
                message: "Chacune de tes fonctions doit porter une docstring." },
              { motif: "\\{\\s*\\}", message: "Ton programme doit utiliser un dictionnaire quelque part." },
              { motif: "(\\bappend\\s*\\(|\\benfiler\\s*\\(|\\bempiler\\s*\\()",
                message: "Il faut aussi une pile ou une file : quelque chose doit s'y ajouter." },
              { motif: "(\\bpop\\s*\\(|\\bdefiler\\s*\\(|\\bdepiler\\s*\\()",
                message: "Et quelque chose doit en sortir, sinon ce n'est pas une pile ni une file." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme d'essai doit afficher au moins trois lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Deux structures choisies, justifiées et mises au travail. Le chapitre est presque bouclé. 🏁",
          indices: [
            "Commence par les deux lignes de commentaire de l'en-tête : tant que tu n'arrives pas à écrire à quelle question chaque structure répond, ne code rien.",
            "Le dictionnaire répond presque toujours à une question qui commence par « quel est le … de … ». La pile ou la file répond à « qui est le prochain ».",
            "Le programme d'essai vient tout en bas, sans indentation : il crée les structures, joue quelques opérations, et affiche ce que chacune sait dire.",
          ],
          solution: `# Mon problème : le vestiaire d'une salle de concert.\n#\n# Structure 1 : un DICTIONNAIRE jeton -> manteau, pour répondre à\n#               « quel manteau correspond à ce jeton ? » — immédiat.\n# Structure 2 : une FILE des jetons en attente de retrait, pour répondre à\n#               « qui est le prochain à récupérer son manteau ? » — ordre d'arrivée.\n\ndef vestiaire_vide():\n    """Renvoie un vestiaire sans aucun manteau et sans personne en attente."""\n    return [{}, [], [0]]\n\ndef deposer(v, manteau):\n    """Depose un manteau et renvoie le jeton attribue."""\n    v[2][0] = v[2][0] + 1\n    jeton = v[2][0]\n    v[0][jeton] = manteau\n    return jeton\n\ndef se_presenter(v, jeton):\n    """Met le porteur du jeton dans la file d'attente du guichet."""\n    v[1].append(jeton)\n\ndef servir(v):\n    """Rend le manteau de la personne en tete de file, et renvoie ce manteau.\n\n    Precondition : au moins une personne attend.\n    """\n    jeton = v[1].pop(0)\n    manteau = v[0][jeton]\n    del v[0][jeton]\n    return manteau\n\n\n# ---- Le programme d'essai ----\nv = vestiaire_vide()\nj1 = deposer(v, "parka rouge")\nj2 = deposer(v, "manteau noir")\nj3 = deposer(v, "veste en jean")\n\nse_presenter(v, j3)\nse_presenter(v, j1)\n\nprint("Jetons attribués :", j1, j2, j3)\nprint("Premier servi :", servir(v))\nprint("Deuxième servi :", servir(v))\n`,
        },
      ],
    },
  ],
};

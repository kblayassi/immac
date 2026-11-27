/* NSI Terminale — chapitre 1, séance 1 : interface et implémentation.
 *
 * Couvre la première ligne de la rubrique « Structures de données » du programme :
 * spécifier une structure par son interface, distinguer interface et implémentation,
 * écrire plusieurs implémentations d'une même structure.
 *
 * Fil rouge : la tirelire (découverte), puis le sac de jetons (exercices et défis).
 * Les deux implémentations de la tirelire portent un nom — « le total » et
 * « le relevé » — et ces noms servent de repère dans toute la séance : on ne
 * renvoie jamais à « l'étape d'avant », toujours à une implémentation nommée.
 *
 * Deux principes de rédaction, appliqués partout après relecture :
 *   - ce qui doit être compris n'est JAMAIS confié à un coup de pouce seul ;
 *     l'explication vit dans le `apres`, que tout le monde lit en réussissant ;
 *   - les amorces de fonction sont des `pass`, jamais un `return` déjà écrit :
 *     décider si une opération renvoie ou modifie fait partie du travail.
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Interface et implémentation",
  sousTitre: "Décrire ce qu'une structure sait faire, avant de dire comment elle est faite",
  palier: "Partie 1 — Spécifier avant de programmer",

  accroche: `Tu écris <code>len(ma_liste)</code> depuis deux ans sans avoir jamais lu le
    code de <code>len</code>. Ce n'est pas une lacune : c'est ainsi qu'on travaille en
    informatique. Une structure de données se décrit d'abord par <strong>ce qu'elle sait
    faire</strong> ; la façon dont elle est faite à l'intérieur est une autre question, et
    elle admet toujours plusieurs réponses.`,

  objectifs: [
    "distinguer l'<strong>interface</strong> d'une structure de son <strong>implémentation</strong>",
    "lire et écrire la <strong>spécification</strong> d'une opération",
    "écrire <strong>plusieurs implémentations</strong> d'une même structure",
    "écrire un programme <strong>client</strong> qui survit à un changement d'implémentation",
  ],

  motDeLaFin: `Tu sais désormais séparer le contrat et la machinerie, et tu as écrit trois
    implémentations d'une même structure. À la séance 2, on applique cette séparation à la
    première structure du chapitre : la liste, vue non plus comme le <code>list</code> de
    Python, mais comme un type abstrait.`,

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
          titre: "Deux questions qu'il faut apprendre à séparer",
          contenu: `
            <p>Depuis la Première, tu écris tous les jours des choses comme :</p>

            <pre class="bloc-code"><code>len(notes)
notes.append(15)
sorted(notes)</code></pre>

            <p>Tu sais parfaitement <strong>ce que font</strong> ces trois opérations. En
            revanche, tu n'as jamais lu le code de <code>len</code> ni celui de
            <code>sorted</code> — et tu n'en as jamais eu besoin pour t'en servir.</p>

            <p>Il y a donc bien deux questions différentes, et l'on peut parfaitement
            répondre à la première sans rien savoir de la seconde :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr>
                <th></th>
                <th>L'<strong>interface</strong></th>
                <th>L'<strong>implémentation</strong></th>
              </tr>
              <tr>
                <td>Elle répond à</td>
                <td>« qu'est-ce que ça sait faire ? »</td>
                <td>« comment est-ce fait ? »</td>
              </tr>
              <tr>
                <td>Elle contient</td>
                <td>la liste des opérations, et ce que chacune promet</td>
                <td>le code, et la façon de ranger les données en mémoire</td>
              </tr>
              <tr>
                <td>Elle s'adresse à</td>
                <td>celui qui <strong>utilise</strong> la structure</td>
                <td>celui qui l'<strong>écrit</strong></td>
              </tr>
              <tr>
                <td>Change-t-elle souvent ?</td>
                <td>le moins possible : c'est un engagement pris envers les autres</td>
                <td>autant qu'on veut : personne d'autre ne la regarde</td>
              </tr>
            </table>
            </div>

            <p>Cette séparation porte un nom, et c'est le mot-clé de la séance.</p>

            <div class="encadre">
              <span class="chapo">Type abstrait de données</span>
              Un <strong>type abstrait de données</strong> est la description d'une structure
              par ses seules opérations : leurs noms, ce qu'elles prennent, ce qu'elles
              rendent, ce qu'elles promettent. On n'y trouve rien sur la mémoire, rien sur le
              code, rien sur le langage utilisé.
            </div>

            <p>Un type abstrait ne s'exécute pas : c'est un texte. Pour qu'un programme
            tourne, il faut en écrire une <strong>implémentation</strong> — et c'est là que
            les choix commencent, car il y en a toujours plusieurs possibles.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une image pour fixer les idées</span>
              Un distributeur de boissons. Les boutons et la fente à monnaie sont son
              interface : c'est ce qu'on te montre, et ce sur quoi on s'engage. Le mécanisme
              derrière la vitre est son implémentation. On peut le remplacer entièrement —
              par un modèle plus rapide, ou moins gourmand en électricité — sans que personne
              n'ait à réapprendre à acheter un soda.
            </div>

            <p>C'est précisément l'intérêt de la manœuvre : <strong>pouvoir changer
            l'intérieur sans casser ce qui s'en sert</strong>. Quand une bibliothèque Python
            est réécrite pour gagner en vitesse, les millions de programmes qui l'utilisent
            n'ont pas une ligne à modifier — parce que l'interface, elle, n'a pas bougé.</p>`,
          libelleBouton: "Voir ça sur du code →",
        },

        {
          id: "d2",
          type: "code",
          titre: "La tirelire",
          contenu: `
            <p>Voici une structure de données minuscule : la <strong>tirelire</strong>. Son
            interface tient en trois opérations.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Opération</th><th>Ce qu'elle promet</th></tr>
              <tr><td><code>tirelire_vide()</code></td><td>renvoie une tirelire neuve, de solde nul</td></tr>
              <tr><td><code>deposer(t, montant)</code></td><td>ajoute <code>montant</code> à la tirelire <code>t</code></td></tr>
              <tr><td><code>solde(t)</code></td><td>renvoie le contenu total de <code>t</code></td></tr>
            </table>
            </div>

            <p>Une implémentation t'est donnée. On l'appellera <strong>« le total »</strong>,
            parce qu'elle ne retient qu'une seule chose : la somme de tout ce qui a été
            déposé. Tu n'as pas besoin de la lire pour la suite — et c'est tout l'exercice.</p>

            <p>Écris en dessous le programme qui crée une tirelire, y dépose
            <strong>20 €</strong> puis <strong>7 €</strong>, et affiche :</p>

            <pre class="bloc-code"><code>Solde : 27 euros</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le 27 ne s'écrit pas</span>
              Il doit sortir des deux dépôts, pas de ton clavier.
            </div>`,
          nomFichier: "tirelire.py",
          depart: `# ---- L'implémentation « le total ». Tu peux l'ignorer : c'est le but. ----\n\ndef tirelire_vide():\n    return [0]\n\ndef deposer(t, montant):\n    t[0] = t[0] + montant\n\ndef solde(t):\n    return t[0]\n\n\n# ---- À toi : le programme qui se sert de la tirelire. ----\n`,
          validation: {
            codeContient: [
              { motif: "tirelire_vide\\s*\\(\\s*\\)[\\s\\S]*tirelire_vide\\s*\\(\\s*\\)",
                message: "Crée ta tirelire en appelant tirelire_vide(), sans recopier son code." },
              { motif: "deposer\\s*\\([\\s\\S]*deposer\\s*\\(",
                message: "Il faut deux dépôts : un de 20, un de 7." },
              { motif: "solde\\s*\\([\\s\\S]*solde\\s*\\(",
                message: "Le montant affiché doit venir de solde(), pas d'un calcul à la main." },
            ],
            codeAbsent: [
              { motif: "\\b27\\b", message: "Le total doit être calculé par le programme, pas écrit dans ton code." },
            ],
            sortie: "Solde : 27 euros",
          },
          felicitation: "Tu viens de te servir d'une structure sans rien savoir de son intérieur. 🐷",
          indices: [
            "Commence par ranger le résultat de <code>tirelire_vide()</code> dans une variable : c'est ta tirelire.",
            "Chaque dépôt est un appel à <code>deposer</code>, avec la tirelire en premier argument et le montant en second.",
            "Pour la dernière ligne, passe trois choses à <code>print</code> : le texte, l'appel à <code>solde</code>, puis le mot <code>euros</code>.",
          ],
          solution: `# ---- L'implémentation « le total ». Tu peux l'ignorer : c'est le but. ----\n\ndef tirelire_vide():\n    return [0]\n\ndef deposer(t, montant):\n    t[0] = t[0] + montant\n\ndef solde(t):\n    return t[0]\n\n\n# ---- À toi : le programme qui se sert de la tirelire. ----\nma_tirelire = tirelire_vide()\ndeposer(ma_tirelire, 20)\ndeposer(ma_tirelire, 7)\nprint("Solde :", solde(ma_tirelire), "euros")\n`,
          apres: `<p>Le programme que tu viens d'écrire s'appelle un <strong>client</strong> de
            la tirelire : il en consomme les services sans jamais toucher à ses entrailles.
            Toute la séance consiste à tenir cette discipline — et à voir ce qu'on y
            gagne.</p>`,
        },

        {
          id: "d3",
          type: "qcm",
          titre: "Interface ou implémentation ?",
          contenu: `<p>Quatre phrases décrivent la tirelire. Trois appartiennent à son
            interface ; une seule parle de son implémentation.</p>`,
          question: "Laquelle parle de l'implémentation ?",
          options: [
            { texte: "<code>deposer(t, montant)</code> ajoute <code>montant</code> au contenu de <code>t</code>.",
              explication: "C'est une promesse faite à l'utilisateur, donc de l'interface." },
            { texte: "Le solde est rangé dans la case d'indice 0 d'une liste.", correct: true,
              explication: "Oui : cette phrase décrit la mémoire. Le client n'a pas à la connaître — et elle deviendra tout simplement fausse dès la deuxième implémentation, un peu plus bas." },
            { texte: "<code>solde(t)</code> renvoie un nombre.",
              explication: "Le type de la valeur rendue fait partie de ce sur quoi on s'engage : c'est de l'interface." },
            { texte: "<code>tirelire_vide()</code> renvoie une tirelire de solde nul.",
              explication: "Encore une promesse, et elle ne dit rien de la façon dont ce zéro est rangé en mémoire." },
          ],
          apres: `<span class="chapo">Le test qui tranche</span>
            Devant une phrase, pose-toi cette question : « si je réécris entièrement
            l'intérieur de la structure, cette phrase reste-t-elle vraie ? » Si oui, elle
            appartient à l'interface. Si non, elle décrit l'implémentation.`,
        },

        {
          id: "d4",
          type: "cours",
          titre: "Spécifier, c'est écrire le contrat",
          contenu: `
            <p>Tant que l'interface reste dans la tête de celui qui a écrit le code, elle ne
            sert à rien. <strong>Spécifier</strong> une opération, c'est écrire son contrat
            noir sur blanc, pour qu'un autre programmeur puisse s'en servir sans avoir à te
            poser la moindre question.</p>

            <p>Une spécification répond à quatre questions, toujours les mêmes :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>La question</th><th>Ce qu'on écrit</th></tr>
              <tr><td>Comment l'appelle-t-on ?</td><td>la <strong>signature</strong> : le nom et les paramètres</td></tr>
              <tr><td>À quoi sert-elle ?</td><td>le <strong>rôle</strong>, en une phrase, à l'indicatif</td></tr>
              <tr><td>Ai-je le droit de l'appeler ?</td><td>les <strong>préconditions</strong></td></tr>
              <tr><td>Que se passe-t-il ensuite ?</td><td>ce qui est <strong>renvoyé</strong>, et ce qui est <strong>modifié</strong></td></tr>
            </table>
            </div>

            <p>En Python, tout cela s'écrit dans une <strong>docstring</strong>, entre triples
            guillemets, juste sous la ligne <code>def</code> :</p>

            <pre class="bloc-code"><code>def deposer(t, montant):
    """Ajoute montant au contenu de la tirelire t.

    Precondition : montant est un nombre positif.
    Effet : t est modifiee sur place. La fonction ne renvoie rien.
    """</code></pre>

            <p>Voici l'interface complète de la tirelire, cette fois entièrement
            spécifiée :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>tirelire_vide()</code></td><td>une tirelire</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>deposer(t, montant)</code></td><td>rien</td><td><code>montant &gt; 0</code></td><td><code>t</code> est modifiée</td></tr>
              <tr><td><code>solde(t)</code></td><td>un nombre</td><td>aucune</td><td>aucun</td></tr>
            </table>
            </div>

            <p>Deux colonnes de ce tableau méritent qu'on s'y arrête.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une opération modifie, ou bien elle renvoie — mais pas les deux</span>
              Compare la colonne « Renvoie » et la colonne « Effet » : quand l'une est
              remplie, l'autre est vide. <code>deposer</code> change la tirelire et ne rend
              rien ; <code>solde</code> rend un nombre et ne change rien.
              <br><br>
              Ce n'est pas une obligation du langage, c'est une habitude de métier. Elle rend
              les programmes bien plus faciles à relire, parce qu'on sait, rien qu'en lisant
              un appel, s'il change quelque chose ou non. Garde-la en tête : dans les
              exercices, c'est à toi de décider si une fonction doit se terminer par un
              <code>return</code>, et ce tableau est là pour te le dire.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une précondition est une permission, pas une vérification</span>
              Écrire « précondition : <code>montant &gt; 0</code> » ne signifie pas que
              <code>deposer</code> contrôle quoi que ce soit. Cela signifie l'inverse : c'est
              à <strong>toi</strong>, qui appelles, de t'assurer que le montant est positif.
              Si tu déposes <code>-50</code>, la fonction fera n'importe quoi — et elle sera
              dans son droit, puisqu'elle n'avait rien promis dans ce cas-là.
              <br><br>
              L'intérêt est très concret. Sans préconditions, chaque fonction passerait son
              temps à vérifier ce qu'on lui donne, et le programme serait à la fois plus lent
              et plus long. En les écrivant, on se partage le travail — et l'on sait qui est
              fautif le jour où quelque chose casse.
            </div>`,
        },

        {
          id: "d5",
          type: "prediction",
          titre: "Pourquoi une liste, pour un seul nombre ?",
          contenu: `
            <p>Une question a dû te venir en lisant l'implémentation « le total » : pourquoi
            <code>tirelire_vide</code> renvoie-t-elle <code>[0]</code>, une liste contenant
            un seul nombre, plutôt que <code>0</code> tout court ?</p>

            <p>Voici la version qui paraît plus simple. Lis-la, et anticipe son affichage
            <strong>avant</strong> de cliquer.</p>`,
          code: `def tirelire_vide():\n    return 0\n\ndef deposer(t, montant):\n    t = t + montant\n\ndef solde(t):\n    return t\n\n\nma_tirelire = tirelire_vide()\ndeposer(ma_tirelire, 20)\ndeposer(ma_tirelire, 7)\nprint("Solde :", solde(ma_tirelire), "euros")`,
          question: "Qu'affiche ce programme ?",
          options: [
            { texte: "<code>Solde : 0 euros</code>", correct: true,
              explication: "Oui. <code>t = t + montant</code> calcule bien 20, mais range ce 20 dans <code>t</code>, qui est une variable <strong>locale</strong> à <code>deposer</code> et qui disparaît dès que la fonction se termine. La tirelire de l'appelant n'a jamais rien reçu." },
            { texte: "<code>Solde : 27 euros</code>",
              explication: "Ce serait le cas si <code>deposer</code> pouvait modifier le nombre qu'on lui a passé. Or un nombre ne se modifie pas : on ne peut que le remplacer par un autre, et ce remplacement reste enfermé dans la fonction." },
            { texte: "<code>Solde : 20 euros</code>",
              explication: "Ce n'est pas seulement le second dépôt qui se perd : aucun des deux n'arrive à destination, et pour exactement la même raison." },
            { texte: "Le programme s'arrête sur une erreur.",
              explication: "Non, et c'est bien ce qui rend ce piège dangereux : tout s'exécute sans le moindre avertissement, et le programme rend simplement un résultat faux." },
          ],
          apres: `<span class="chapo">La réponse à la question du titre</span>
            Une liste, elle, se modifie <strong>sur place</strong> : quand
            <code>deposer</code> écrit <code>t[0] = …</code>, il change une case d'une liste
            que la fonction et l'appelant désignent tous les deux. Voilà pourquoi la tirelire
            « le total » est une liste d'un seul nombre : c'est le plus petit récipient
            <em>modifiable</em> que Python propose.
            <br><br>
            La règle générale vaut pour tout le chapitre : <strong>une fonction ne peut
            modifier que ce qui est modifiable</strong> — une liste, un dictionnaire — jamais
            un nombre, jamais une chaîne de caractères, jamais un p-uplet. Tu retrouveras ce
            piège tout à l'heure, dans un exercice, sous une autre forme.`,
        },

        {
          id: "d6",
          type: "code",
          titre: "La même tirelire, un autre intérieur",
          contenu: `
            <p>Écris maintenant une <strong>deuxième implémentation</strong> de la tirelire.
            On l'appellera <strong>« le relevé »</strong>, parce qu'elle ne tient aucun
            total : elle garde la <strong>liste de tous les dépôts</strong>, dans l'ordre où
            ils ont été faits.</p>

            <p>Une tirelire où l'on a mis 20 € puis 7 € est donc la liste
            <code>[20, 7]</code>.</p>

            <p>À toi d'écrire les trois opérations. Le programme client, en bas,
            <strong>ne doit pas être touché</strong> — et doit afficher :</p>

            <pre class="bloc-code"><code>Solde : 27 euros</code></pre>

            <div class="encadre">
              <span class="chapo">À toi de décider</span>
              Les trois corps de fonction sont vides. Pour chacun, reprends le tableau de la
              spécification : est-ce une opération qui <strong>renvoie</strong> une valeur,
              ou une opération qui <strong>modifie</strong> la tirelire ? Le mot
              <code>pass</code> ne fait rien du tout ; il est seulement là pour que le
              fichier reste exécutable tant que le corps est vide, et il doit disparaître.
            </div>`,
          nomFichier: "tirelire.py",
          depart: `# Implémentation « le relevé » : la tirelire retient tous les dépôts, un par un.\n\ndef tirelire_vide():\n    pass\n\ndef deposer(t, montant):\n    pass\n\ndef solde(t):\n    pass\n\n\n# ---- Le programme client, inchangé. Ne le modifie pas. ----\nma_tirelire = tirelire_vide()\ndeposer(ma_tirelire, 20)\ndeposer(ma_tirelire, 7)\nprint("Solde :", solde(ma_tirelire), "euros")\n`,
          validation: {
            sortie: "Solde : 27 euros",
            tests: `t = tirelire_vide()\nassert t == [], "Une tirelire neuve, c'est un relevé sans aucun dépôt : la liste vide."\ndeposer(t, 5)\ndeposer(t, 12)\nassert t == [5, 12], "Le relevé doit contenir les montants déposés, dans l'ordre des dépôts."\nassert solde(t) == 17, "solde() doit additionner tous les montants du relevé."\ndeposer(t, 3)\nassert solde(t) == 20, "Un nouveau dépôt doit se retrouver aussitôt dans le solde."\nu = tirelire_vide()\nassert u == [], "Chaque appel à tirelire_vide() doit rendre une tirelire neuve, indépendante des autres."`,
          },
          felicitation: "L'intérieur a entièrement changé ; le client, lui, n'a pas bougé d'un caractère. ✅",
          indices: [
            "Une tirelire neuve est un relevé qui ne contient encore aucun dépôt : quel objet Python, vide au départ, se remplira ensuite ?",
            "<code>deposer</code> doit allonger le relevé d'un montant, à la fin — et le modifier <strong>sur place</strong>, exactement comme tu viens de le voir à l'étape précédente.",
            "La méthode des listes qui ajoute un élément à la fin est <code>append</code>. Et pour le solde, Python sait additionner tous les nombres d'une liste en un seul appel : cherche du côté de <code>sum</code>.",
          ],
          solution: `# Implémentation « le relevé » : la tirelire retient tous les dépôts, un par un.\n\ndef tirelire_vide():\n    return []\n\ndef deposer(t, montant):\n    t.append(montant)\n\ndef solde(t):\n    return sum(t)\n\n\n# ---- Le programme client, inchangé. Ne le modifie pas. ----\nma_tirelire = tirelire_vide()\ndeposer(ma_tirelire, 20)\ndeposer(ma_tirelire, 7)\nprint("Solde :", solde(ma_tirelire), "euros")\n`,
          apres: `<p>Mets les deux implémentations côte à côte :</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th></th><th>« le total »</th><th>« le relevé »</th></tr>
              <tr><td>Une tirelire neuve</td><td><code>[0]</code></td><td><code>[]</code></td></tr>
              <tr><td>Après 20 € puis 7 €</td><td><code>[27]</code></td><td><code>[20, 7]</code></td></tr>
              <tr><td><code>deposer</code></td><td>met le total à jour</td><td>ajoute une ligne au relevé</td></tr>
              <tr><td><code>solde</code></td><td>lit le total</td><td>additionne tout le relevé</td></tr>
            </table>
            </div>

            <p>Rien de commun entre les deux. Et pourtant les quatre dernières lignes du
            fichier sont <strong>rigoureusement identiques</strong> dans les deux cas, et
            affichent la même chose. C'est très exactement ce que le programme officiel
            appelle « écrire plusieurs implémentations d'une même structure de données ».</p>`,
        },

        {
          id: "d7",
          type: "qcm",
          titre: "Ce que l'interface ne dit pas",
          contenu: `
            <p>Une tirelire a reçu <strong>10 000 dépôts</strong>. On appelle
            <code>solde(t)</code>, une seule fois.</p>
            <p>Rappel des deux versions de cette opération :</p>
            <pre class="bloc-code"><code># « le total »            # « le relevé »
def solde(t):             def solde(t):
    return t[0]               return sum(t)</code></pre>`,
          question: "Que fait la machine dans chaque cas ?",
          options: [
            { texte: "La même chose : les deux respectent le même contrat.",
              explication: "Le contrat porte sur le <em>résultat</em>. Les deux rendent bien le même nombre — mais pas au même prix, et c'est justement ce qu'on regarde ici." },
            { texte: "« le total » lit une seule case ; « le relevé » additionne 10 000 nombres.", correct: true,
              explication: "Oui. Le premier fait toujours le même travail, que la tirelire ait reçu trois dépôts ou dix mille. Le second travaille proportionnellement au nombre de dépôts." },
            { texte: "« le relevé » est plus rapide : il n'a pas de total à tenir à jour.",
              explication: "Il s'épargne en effet un peu de travail au moment du dépôt. Mais il le repaie, et bien plus cher, chaque fois qu'on lui demande le solde." },
            { texte: "Impossible à savoir sans mesurer.",
              explication: "Ici, lire les deux implémentations suffit à trancher. Ce qui ne permet pas de le savoir, c'est l'<em>interface</em> : elle ne parle jamais du temps que prend une opération." },
          ],
          apres: `<span class="chapo">Ce que le contrat ne promet pas</span>
            L'interface promet un <strong>résultat</strong> : <code>solde</code> rend le
            contenu de la tirelire, et cela restera vrai quelle que soit l'implémentation.
            Elle ne promet rien sur le <strong>temps</strong> que l'opération prend, ni sur
            la <strong>place</strong> qu'elle occupe en mémoire.
            <br><br>
            Cette lacune est en réalité une bonne nouvelle. Puisque le résultat est garanti
            d'avance, choisir entre deux implémentations ne revient jamais à choisir <em>ce
            que fait</em> la structure — cela, c'est fixé une fois pour toutes — mais
            uniquement <strong>ce qu'elle coûte</strong>. Comparer deux implémentations,
            c'est donc toujours comparer deux prix : du temps, ou de la mémoire.
            <br><br>
            Les séances 5 à 7 ne feront rien d'autre, avec des structures plus sérieuses que
            la tirelire.`,
        },

        {
          id: "d8",
          type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Mot</th><th>Définition</th></tr>
              <tr><td><strong>Type abstrait</strong></td><td>une structure décrite par ses seules opérations</td></tr>
              <tr><td><strong>Interface</strong></td><td>la liste de ces opérations et ce que chacune promet</td></tr>
              <tr><td><strong>Spécification</strong></td><td>le contrat écrit d'une opération : signature, rôle, précondition, effet</td></tr>
              <tr><td><strong>Implémentation</strong></td><td>le code qui réalise l'interface, et la façon de ranger les données</td></tr>
              <tr><td><strong>Client</strong></td><td>un programme qui utilise la structure sans regarder dedans</td></tr>
            </table>
            </div>

            <div class="encadre">
              <span class="chapo">La séance en une phrase</span>
              Une interface, plusieurs implémentations — et un client bien écrit ne sait même
              pas laquelle il est en train d'utiliser.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li><strong>Ouvrir la tirelire au lieu de demander son solde.</strong> Un
                client qui écrit <code>t[0]</code> plutôt que <code>solde(t)</code> fonctionne
                parfaitement — jusqu'au jour où l'on passe à l'implémentation « le relevé »,
                où <code>t[0]</code> ne veut plus rien dire. C'est l'erreur la plus fréquente
                du chapitre, et la plus difficile à repérer, parce que le programme ne se
                plaint de rien.</li>
                <li><strong>Confondre le type abstrait et le type Python.</strong> Le
                <code>list</code> de Python est une implémentation, pas un type abstrait. On
                y reviendra dès la séance 2, où la distinction devient décisive.</li>
                <li><strong>Croire que l'interface fixe les performances.</strong> Elle ne dit
                rien du coût, et c'est bien pour cela qu'on a le choix entre plusieurs
                implémentations.</li>
                <li><strong>Oublier qu'une précondition s'adresse à l'appelant.</strong> Une
                opération qui n'a rien promis hors de son domaine n'a rien à se
                reprocher.</li>
                <li><strong>Modifier une variable en croyant modifier l'objet.</strong>
                <code>t = t + 5</code> ne change rien pour l'appelant ;
                <code>t.append(5)</code> si.</li>
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
      intention: "une interface, trois implémentations — à toi de les écrire",
      etapes: [

        {
          id: "a1",
          type: "qcm",
          titre: "Le sac de jetons",
          contenu: `
            <p>Nouvelle structure, un peu plus sérieuse : le <strong>sac de jetons</strong>.
            Un sac contient des jetons de différentes couleurs, éventuellement plusieurs fois
            la même. Contrairement à une liste, <strong>il n'y a pas d'ordre</strong> : on ne
            demande jamais « le troisième jeton du sac ».</p>

            <p>Voici son interface, spécifiée. C'est le tableau auquel tu reviendras pendant
            tout le reste de la séance.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Effet</th></tr>
              <tr><td><code>sac_vide()</code></td><td>un sac sans aucun jeton</td><td>aucun</td></tr>
              <tr><td><code>ajouter(s, jeton)</code></td><td>rien</td><td>un exemplaire de <code>jeton</code> est mis dans <code>s</code></td></tr>
              <tr><td><code>taille(s)</code></td><td>le nombre total de jetons de <code>s</code></td><td>aucun</td></tr>
              <tr><td><code>nombre(s, jeton)</code></td><td>combien d'exemplaires de <code>jeton</code> sont dans <code>s</code></td><td>aucun</td></tr>
              <tr><td><code>retirer(s, jeton)</code></td><td>rien</td><td><strong>un seul</strong> exemplaire de <code>jeton</code> quitte <code>s</code></td></tr>
            </table>
            </div>

            <p>Une seule précondition dans tout ce tableau : <code>retirer(s, jeton)</code>
            n'a de sens que si <code>nombre(s, jeton) &gt;= 1</code>. Les quatre autres
            opérations s'appellent en toute circonstance.</p>

            <p>Un sac contient <strong>deux jetons rouges et un jeton bleu</strong>.</p>`,
          question: "Que valent taille(s) et nombre(s, \"vert\") ?",
          options: [
            { texte: "<code>3</code> et <code>0</code>", correct: true,
              explication: "Oui, et les deux points méritent d'être retenus : <code>taille</code> compte les <strong>jetons</strong> et non les couleurs ; et interroger le sac sur une couleur absente répond <code>0</code>." },
            { texte: "<code>2</code> et <code>0</code>",
              explication: "Le sac contient trois jetons — deux rouges <em>et</em> un bleu. Relis la spécification : <code>taille</code> renvoie « le nombre total de jetons », pas le nombre de couleurs différentes." },
            { texte: "<code>3</code>, puis une erreur",
              explication: "La spécification de <code>nombre</code> ne pose aucune précondition : on a donc le droit de l'appeler sur n'importe quelle couleur, présente ou non. Répondre par une erreur serait manquer à l'engagement pris." },
            { texte: "<code>2</code>, puis une erreur",
              explication: "Les deux moitiés sont fausses : <code>taille</code> compte les jetons, et <code>nombre</code> accepte n'importe quelle couleur." },
          ],
          apres: `<span class="chapo">Le programme des exercices qui suivent</span>
            Tu vas écrire <strong>trois implémentations</strong> de ce même sac : d'abord par
            une liste, puis par un dictionnaire, et enfin — en défi — par deux listes
            parallèles. Le tableau ci-dessus, lui, ne changera pas d'une ligne.`,
        },

        {
          id: "a2",
          type: "code",
          titre: "Première implémentation : le sac est une liste",
          contenu: `
            <p>Dans cette première implémentation, <strong>le sac est la liste de tous ses
            jetons</strong>. Un sac contenant deux rouges et un bleu s'écrit donc
            <code>["rouge", "bleu", "rouge"]</code>.</p>

            <p>Écris <code>sac_vide</code>, <code>ajouter</code> et <code>taille</code>.</p>

            <div class="encadre">
              <span class="chapo">À toi de décider</span>
              Les trois corps sont vides. Pour chacun, retourne au tableau de l'étape
              précédente : s'agit-il d'une opération qui <strong>renvoie</strong> une valeur,
              ou d'une opération qui <strong>modifie</strong> le sac ?
            </div>

            <p>Il n'y a rien à voir dans la console : c'est <strong>✓ Valider</strong> qui met
            ton sac à l'épreuve.</p>`,
          nomFichier: "sac_liste.py",
          depart: `# Implémentation « liste » : le sac est la liste de tous les jetons déposés.\n\ndef sac_vide():\n    pass\n\ndef ajouter(s, jeton):\n    pass\n\ndef taille(s):\n    pass\n`,
          validation: {
            tests: `s = sac_vide()\nassert s == [], "Un sac neuf ne contient aucun jeton : c'est la liste vide."\nassert taille(s) == 0, "Un sac neuf a une taille de 0."\najouter(s, "rouge")\najouter(s, "bleu")\najouter(s, "rouge")\nassert taille(s) == 3, "Trois ajouts, trois jetons. taille() compte les jetons, pas les couleurs."\nassert s.count("rouge") == 2, "Le jeton rouge a été ajouté deux fois : il doit figurer deux fois dans la liste."\nassert s.count("bleu") == 1, "Le jeton bleu n'a été ajouté qu'une seule fois."\nt = sac_vide()\nassert taille(t) == 0, "Chaque appel à sac_vide() doit rendre un sac neuf, indépendant des autres."`,
          },
          felicitation: "Premier sac fonctionnel. 🎒",
          indices: [
            "Un sac neuf, c'est une liste qui ne contient rien.",
            "<code>ajouter</code> ne renvoie rien : elle doit donc modifier la liste reçue <strong>sur place</strong>, en la rallongeant d'un élément à la fin.",
            "La méthode qui ajoute en fin de liste est <code>append</code>. Pour <code>taille</code>, le nombre de jetons est exactement le nombre d'éléments de la liste, que Python donne en une fonction.",
          ],
          solution: `# Implémentation « liste » : le sac est la liste de tous les jetons déposés.\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n`,
        },

        {
          id: "a3",
          type: "code",
          titre: "Compter un jeton, en retirer un",
          contenu: `
            <p>Complète l'interface avec les deux dernières opérations.</p>
            <ul>
              <li><code>nombre(s, jeton)</code> renvoie combien d'exemplaires de
              <code>jeton</code> le sac contient — et <strong>0</strong> s'il n'y en a
              aucun ;</li>
              <li><code>retirer(s, jeton)</code> en enlève <strong>un seul</strong>
              exemplaire, pas tous.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Une méthode des listes que tu ne connais peut-être pas</span>
              <code>ma_liste.remove(valeur)</code> supprime la <strong>première</strong>
              occurrence de <code>valeur</code> dans la liste — une seule, même s'il y en a
              plusieurs. Elle modifie la liste sur place et ne renvoie rien.
              <br><br>
              Attention : si la valeur ne s'y trouve pas, elle lève une erreur. C'est
              précisément pour cela que la spécification de <code>retirer</code> pose une
              précondition, et que ta fonction n'a donc rien à vérifier.
            </div>

            <p>Pour <code>nombre</code>, en revanche, aucune méthode toute faite n'est
            imposée : parcours le sac et compte.</p>`,
          nomFichier: "sac_liste.py",
          depart: `# Implémentation « liste » : le sac est la liste de tous les jetons déposés.\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    pass\n\ndef retirer(s, jeton):\n    pass\n`,
          validation: {
            tests: `s = sac_vide()\nfor c in ["rouge", "bleu", "rouge", "vert"]:\n    ajouter(s, c)\nassert nombre(s, "rouge") == 2, "Le rouge a été ajouté deux fois."\nassert nombre(s, "vert") == 1, "Le vert a été ajouté une fois."\nassert nombre(s, "jaune") == 0, "Un jeton absent du sac doit donner 0, sans provoquer d'erreur."\nretirer(s, "rouge")\nassert nombre(s, "rouge") == 1, "retirer() n'enlève qu'un seul exemplaire, pas tous."\nassert taille(s) == 3, "Le sac avait 4 jetons ; après un retrait il en a 3."\nretirer(s, "bleu")\nassert nombre(s, "bleu") == 0, "Le seul bleu a été retiré."\nassert taille(s) == 2, "Deux retraits sur quatre jetons : il en reste deux."`,
          },
          felicitation: "L'interface du sac est complète : cinq opérations, un contrat tenu. ✅",
          indices: [
            "Pour <code>nombre</code>, c'est un comptage classique : une variable à zéro avant la boucle, qu'on augmente à chaque jeton de la bonne couleur, et qu'on renvoie après.",
            "Parcours les jetons du sac un à un avec une boucle <code>for</code>, et compare chacun à la couleur cherchée.",
            "Pour <code>retirer</code>, la méthode présentée dans l'énoncé fait déjà exactement ce qui est demandé : il n'y a qu'à l'appeler sur le sac.",
          ],
          solution: `# Implémentation « liste » : le sac est la liste de tous les jetons déposés.\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    total = 0\n    for j in s:\n        if j == jeton:\n            total = total + 1\n    return total\n\ndef retirer(s, jeton):\n    s.remove(jeton)\n`,
          apres: `<p>Python propose aussi <code>ma_liste.count(valeur)</code>, qui fait ce
            comptage en un seul appel : <code>nombre</code> pourrait donc tenir en une ligne.
            Ta boucle et cet appel donnent exactement le même résultat — et c'est bien là le
            point : <strong>c'est un détail d'implémentation</strong>. Le client ne verra
            jamais laquelle des deux écritures tu as choisie.</p>`,
        },

        {
          id: "a4",
          type: "code",
          titre: "Chasse aux bugs : un sac qui fuit",
          contenu: `
            <p>Un camarade a écrit cette implémentation. Elle contient <strong>trois erreurs
            de natures différentes</strong> :</p>
            <ul>
              <li>une que Python refuse même d'exécuter ;</li>
              <li>une qu'il signale au moment où elle se produit ;</li>
              <li>une dont il ne dit rien du tout — et le sac reste obstinément vide.</li>
            </ul>
            <p>Répare les trois sans changer les noms, ni les signatures, ni la façon de
            représenter le sac.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">La méthode</span>
              Commence par exécuter avec <strong>▶</strong>, et <strong>lis le
              message</strong>. Python traite les erreurs dans un ordre imposé : il refuse
              d'abord le fichier entier s'il n'arrive pas à le lire, puis signale les fautes
              au fil de l'exécution. Corrige, relance, recommence. Le troisième bug, lui, ne
              se verra qu'au moment de valider.
            </div>`,
          nomFichier: "sac_casse.py",
          depart: `def sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s = s + [jeton]\n\ndef taille(s)\n    return len(s)\n\ndef nombre(s, jeton):\n    total = 0\n    for j in s:\n        if j = jeton:\n            total = total + 1\n    return total\n`,
          validation: {
            tests: `s = sac_vide()\nassert taille(s) == 0, "Un sac neuf a une taille de 0."\najouter(s, "rouge")\nassert taille(s) == 1, "Après un ajout, le sac doit contenir un jeton. S'il en contient toujours zéro, c'est le bug silencieux : ajouter() ne modifie pas le sac qu'on lui a confié."\najouter(s, "bleu")\najouter(s, "rouge")\nassert taille(s) == 3, "Trois ajouts, trois jetons."\nassert nombre(s, "rouge") == 2, "nombre() doit compter les exemplaires du jeton demandé."\nassert nombre(s, "jaune") == 0, "Un jeton absent doit donner 0."`,
          },
          felicitation: "Trois bugs, trois natures — et le dernier est celui qui coûte le plus de temps en devoir. 🐛",
          indices: [
            "Lance le programme et lis le message d'erreur : Python te donne le type de la faute et le numéro de la ligne. C'est le premier réflexe, toujours, et cela règle déjà le premier bug.",
            "Le deuxième est dans la condition du <code>if</code>, dans <code>nombre</code>. Demande-toi si cette ligne <em>compare</em> deux valeurs, ou si elle essaie d'en <em>ranger</em> une dans l'autre.",
            "Le troisième est dans <code>ajouter</code>, et tu l'as déjà rencontré dans la découverte, avec la tirelire qui restait à zéro. Relis la règle : pour modifier, il faut agir sur l'objet lui-même.",
          ],
          solution: `def sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    total = 0\n    for j in s:\n        if j == jeton:\n            total = total + 1\n    return total\n`,
          apres: `<span class="chapo">Le troisième bug mérite qu'on s'y arrête</span>
              Les deux premiers, Python te les a signalés. Le troisième, non :
              <code>s = s + [jeton]</code> est du Python parfaitement correct, et il ne
              provoquera jamais la moindre erreur.
              <br><br>
              Voici ce qu'il fait exactement : il fabrique une <strong>nouvelle</strong> liste
              — l'ancienne, plus le jeton — puis range cette nouvelle liste dans la variable
              <code>s</code>. Or <code>s</code> est une variable locale à <code>ajouter</code>
              : elle disparaît quand la fonction se termine, et le sac de l'appelant n'a rien
              vu passer. C'est le mécanisme exact de la tirelire <code>t = t + montant</code>
              de la découverte.
              <br><br>
              <strong>La règle à retenir :</strong> pour qu'une fonction modifie ce qu'on lui
              donne, elle doit agir sur l'<strong>objet</strong>, et non sur la
              <strong>variable</strong> qui le désigne. <code>s.append(jeton)</code> agit sur
              la liste ; <code>s = …</code> ne fait que déplacer une étiquette.`,
        },

        {
          id: "a5",
          type: "code",
          titre: "Deuxième implémentation : le sac est un dictionnaire",
          contenu: `
            <p>Deuxième implémentation, complètement différente de la première : le sac n'est
            plus la liste de ses jetons, mais un <strong>dictionnaire</strong> qui associe à
            chaque couleur rencontrée son nombre d'exemplaires.</p>

            <p>Le sac contenant deux rouges et un bleu s'écrit maintenant :</p>
            <pre class="bloc-code"><code>{"rouge": 2, "bleu": 1}</code></pre>

            <p>Écris les quatre opérations. <strong>L'interface ne change pas d'une
            ligne</strong> : mêmes noms, mêmes paramètres, mêmes promesses. Seule la manière
            de ranger les jetons est nouvelle.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La couleur jamais vue</span>
              <code>nombre(s, "jaune")</code> doit répondre <code>0</code> même si la clé
              <code>"jaune"</code> n'existe pas dans le dictionnaire. Écrire
              <code>s["jaune"]</code> lèverait une <code>KeyError</code>, et ce n'est pas ce
              que l'interface a promis.
            </div>`,
          nomFichier: "sac_comptes.py",
          depart: `# Implémentation « comptes » : le sac retient, pour chaque jeton, son nombre.\n\ndef sac_vide():\n    pass\n\ndef ajouter(s, jeton):\n    pass\n\ndef taille(s):\n    pass\n\ndef nombre(s, jeton):\n    pass\n`,
          validation: {
            tests: `s = sac_vide()\nassert s == {}, "Un sac neuf est un dictionnaire sans aucune clé."\najouter(s, "rouge")\najouter(s, "bleu")\najouter(s, "rouge")\nassert s == {"rouge": 2, "bleu": 1}, "Le dictionnaire doit associer à chaque jeton son nombre d'exemplaires."\nassert taille(s) == 3, "taille() compte les jetons, pas les couleurs : il y en a trois."\nassert nombre(s, "rouge") == 2, "Deux jetons rouges ont été ajoutés."\nassert nombre(s, "jaune") == 0, "Un jeton jamais ajouté doit donner 0, et surtout pas une KeyError."\nfor i in range(5):\n    ajouter(s, "vert")\nassert nombre(s, "vert") == 5, "Cinq ajouts de vert font cinq jetons verts."\nassert taille(s) == 8, "Trois jetons puis cinq verts : huit jetons en tout."`,
          },
          felicitation: "Même interface, autre mémoire. Le client n'en saura rien. 🗝️",
          indices: [
            "Dans <code>ajouter</code>, il y a deux cas à distinguer : ou bien la couleur est déjà une clé du dictionnaire, ou bien c'est la première fois qu'on la rencontre.",
            "Pour savoir si une clé est déjà présente, l'opérateur <code>in</code> répond directement sur un dictionnaire : il en regarde les clés. Le même test règle le cas de la couleur absente dans <code>nombre</code>.",
            "Si la clé est là, son compte augmente de 1 ; sinon, on l'installe avec un compte de 1. Pour <code>taille</code>, il faut additionner tous les comptes : <code>s.values()</code> les donne, et <code>sum</code> les additionne.",
          ],
          solution: `# Implémentation « comptes » : le sac retient, pour chaque jeton, son nombre.\n\ndef sac_vide():\n    return {}\n\ndef ajouter(s, jeton):\n    if jeton in s:\n        s[jeton] = s[jeton] + 1\n    else:\n        s[jeton] = 1\n\ndef taille(s):\n    return sum(s.values())\n\ndef nombre(s, jeton):\n    if jeton in s:\n        return s[jeton]\n    return 0\n`,
          apres: `<p>Python propose un raccourci taillé pour cette situation :
            <code>s.get(jeton, 0)</code> lit la clé <code>jeton</code> et renvoie
            <code>0</code> si elle n'existe pas. Il règle donc les deux cas d'un coup, dans
            <code>ajouter</code> comme dans <code>nombre</code>, et permet d'écrire chacune
            des deux en une seule ligne.</p>
            <p>Les deux écritures sont également correctes, et <strong>✓ Valider</strong>
            accepte l'une comme l'autre : ce qui est jugé, ce n'est pas ton style, c'est le
            respect du contrat.</p>`,
        },

        {
          id: "a6",
          type: "prediction",
          titre: "Le même client, sur les deux sacs",
          contenu: `
            <p>Voici un programme <strong>client</strong> : il ne fait que se servir du sac,
            sans jamais regarder dedans.</p>
            <p>On va l'exécuter deux fois.</p>
            <ul>
              <li>La première fois, placé sous l'implémentation <strong>« liste »</strong> —
              celle où le sac est la liste de tous ses jetons.</li>
              <li>La seconde fois, placé sous l'implémentation <strong>« comptes »</strong> —
              celle où le sac est le dictionnaire des couleurs et de leurs nombres.</li>
            </ul>
            <p>Rien d'autre ne change : pas une ligne du programme ci-dessous.</p>`,
          code: `s = sac_vide()\nfor jeton in ["pique", "coeur", "pique", "trefle", "pique"]:\n    ajouter(s, jeton)\n\nprint(taille(s), nombre(s, "pique"), nombre(s, "carreau"))`,
          question: "Qu'affiche la première exécution, puis la seconde ?",
          options: [
            { texte: "<code>5 3 0</code>, puis <code>5 3 0</code>", correct: true,
              explication: "Oui : cinq jetons, trois piques, aucun carreau — et cela ne dépend en rien de la façon dont le sac est rangé en mémoire." },
            { texte: "<code>5 3 0</code>, puis <code>3 3 0</code>",
              explication: "Le dictionnaire n'a en effet que trois clés, mais <code>taille</code> ne compte pas les clés : il additionne les comptes. C'est justement la promesse que tu as tenue en l'écrivant." },
            { texte: "<code>5 3 0</code>, puis une <code>KeyError</code>",
              explication: "Ce serait le cas si <code>nombre</code> avait été écrit avec <code>s[jeton]</code> sans précaution. Tu as traité la couleur absente : elle répond 0." },
            { texte: "<code>[...] 3 0</code>, puis <code>{...} 3 0</code>",
              explication: "Le programme n'affiche jamais le sac lui-même : il affiche ce que renvoient <code>taille</code> et <code>nombre</code>, qui sont des nombres dans les deux cas." },
          ],
          apres: `<span class="chapo">Interchangeables</span>
            Tu peux remplacer une implémentation par l'autre dans n'importe quel programme
            client, sans en relire une seule ligne. C'est la <strong>définition même</strong>
            d'une interface respectée — et c'est ce que le programme officiel appelle
            « écrire plusieurs implémentations d'une même structure de données ».`,
        },

        {
          id: "a7",
          type: "code",
          titre: "Un client qui ne regarde pas dedans",
          contenu: `
            <p>Écris <code>couleur_dominante(s, couleurs)</code> : parmi les couleurs de la
            liste <code>couleurs</code>, elle renvoie celle qui est <strong>la plus
            représentée</strong> dans le sac. En cas d'égalité, la <strong>première</strong>
            de la liste l'emporte.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La règle du jeu</span>
              Ta fonction n'a le droit d'utiliser que les opérations de l'interface :
              <code>sac_vide</code>, <code>ajouter</code>, <code>taille</code>,
              <code>nombre</code>. Interdit d'écrire <code>len(s)</code>,
              <code>s[...]</code> ou <code>for j in s</code> : tout cela suppose de savoir
              comment le sac est fait.
            </div>

            <div class="encadre">
              <span class="chapo">Comment ton travail sera vérifié</span>
              <strong>✓ Valider</strong> testera ta fonction avec l'implémentation « liste »
              visible ci-dessous, <strong>puis avec une autre implémentation, cachée</strong>.
              Si tu n'as utilisé que l'interface, les deux essais donneront le même
              résultat ; si tu as regardé dedans, le second te trahira.
            </div>

            <p>Le paramètre <code>couleurs</code>, lui, est une liste Python ordinaire fournie
            par le client : tu peux la parcourir et l'indexer librement. L'interdit ne porte
            que sur le sac.</p>`,
          nomFichier: "client.py",
          depart: `# ---- L'implémentation « liste ». N'y touche pas. ----\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    return s.count(jeton)\n\n\n# ---- À toi. ----\n\ndef couleur_dominante(s, couleurs):\n    """Renvoie la couleur de la liste couleurs la plus presente dans le sac s.\n\n    Precondition : couleurs n'est pas vide.\n    En cas d'egalite, la premiere couleur de la liste l'emporte.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bs\\s*\\[", message: "Écrire s[...] suppose de savoir comment le sac est fait. Passe par nombre() et taille()." },
            ],
            tests: `s = sac_vide()\nfor c in ["rouge", "bleu", "rouge", "vert", "bleu", "rouge"]:\n    ajouter(s, c)\nassert couleur_dominante(s, ["rouge", "bleu", "vert"]) == "rouge", "Trois rouges contre deux bleus et un vert : le rouge domine."\nassert couleur_dominante(s, ["bleu", "vert"]) == "bleu", "Parmi les seules couleurs proposées, le bleu (2) devance le vert (1)."\nassert couleur_dominante(s, ["vert", "jaune"]) == "vert", "Le jaune est absent du sac, il compte donc pour 0 : le vert l'emporte."\ne = sac_vide()\nfor c in ["or", "argent", "or", "argent"]:\n    ajouter(e, c)\nassert couleur_dominante(e, ["or", "argent"]) == "or", "Deux ors et deux argents : à égalité, c'est la première couleur de la liste qui l'emporte."\nassert couleur_dominante(e, ["argent", "or"]) == "argent", "Même sac, liste inversée : c'est donc l'argent qui doit gagner cette fois."\ndef sac_vide():\n    return {}\ndef ajouter(s, jeton):\n    if jeton in s:\n        s[jeton] = s[jeton] + 1\n    else:\n        s[jeton] = 1\ndef taille(s):\n    return sum(s.values())\ndef nombre(s, jeton):\n    if jeton in s:\n        return s[jeton]\n    return 0\nt = sac_vide()\nfor c in ["rouge", "bleu", "rouge", "vert", "bleu", "rouge"]:\n    ajouter(t, c)\nassert couleur_dominante(t, ["rouge", "bleu", "vert"]) == "rouge", "Ta fonction doit continuer à marcher quand on change l'intérieur du sac : n'utilise que nombre() et taille()."\nassert couleur_dominante(t, ["bleu", "vert"]) == "bleu", "Même exigence avec l'implémentation cachée."`,
          },
          felicitation: "Ta fonction a survécu au changement d'implémentation. C'est la compétence de la séance. 🏅",
          indices: [
            "C'est une recherche de maximum, comme tu en as déjà écrit — à ceci près que ce n'est pas le sac qu'on parcourt, mais la liste <code>couleurs</code>.",
            "Pour chaque couleur de cette liste, la seule question à poser au sac est <code>nombre(s, couleur)</code>.",
            "Retiens la meilleure couleur trouvée jusqu'ici, et ne la remplace que si une suivante fait <strong>strictement</strong> mieux : c'est cette comparaison stricte qui donne la priorité à la première en cas d'égalité.",
          ],
          solution: `# ---- L'implémentation « liste ». N'y touche pas. ----\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    return s.count(jeton)\n\n\n# ---- À toi. ----\n\ndef couleur_dominante(s, couleurs):\n    """Renvoie la couleur de la liste couleurs la plus presente dans le sac s.\n\n    Precondition : couleurs n'est pas vide.\n    En cas d'egalite, la premiere couleur de la liste l'emporte.\n    """\n    meilleure = couleurs[0]\n    for couleur in couleurs:\n        if nombre(s, couleur) > nombre(s, meilleure):\n            meilleure = couleur\n    return meilleure\n`,
          apres: `<p>Deux écritures étaient possibles, et toutes deux sont justes : partir de
            la première couleur de la liste, ou partir d'un compte de zéro et retenir la
            couleur au fur et à mesure. Dans les deux cas, c'est la comparaison
            <strong>stricte</strong> — <code>&gt;</code> et non <code>&gt;=</code> — qui fait
            respecter la règle d'égalité annoncée par la spécification.</p>`,
        },
      ],
    },

    /* ================================ DÉFIS ================================ */
    {
      id: "defis",
      titre: "Défis",
      minutes: 45,
      etoiles: 3,
      intention: "changer d'implémentation sans rien casser",
      etapes: [

        {
          id: "x1",
          type: "qcm",
          titre: "Qui triche ?",
          contenu: `
            <p>Quatre fonctions clientes du sac. Trois n'utilisent que l'interface ; une
            s'appuie en douce sur le fait que le sac est une liste.</p>
            <pre class="bloc-code"><code># A
def est_vide(s):
    return taille(s) == 0

# B
def est_plein(s, maximum):
    return len(s) &gt;= maximum

# C
def total(s, couleurs):
    t = 0
    for c in couleurs:
        t = t + nombre(s, c)
    return t

# D
def doubler(s, jeton):
    ajouter(s, jeton)
    ajouter(s, jeton)</code></pre>`,
          question: "Laquelle cessera de dire la vérité si l'on passe à l'implémentation « comptes » ?",
          options: [
            { texte: "A",
              explication: "Elle ne passe que par <code>taille</code>. Elle fonctionnera avec n'importe quelle implémentation." },
            { texte: "B", correct: true,
              explication: "Oui. <code>len</code> appliqué à un dictionnaire compte ses <strong>clés</strong>, donc les couleurs — et non les jetons. Un sac de dix jetons rouges aurait alors une « longueur » de 1. Il fallait écrire <code>taille(s)</code>." },
            { texte: "C",
              explication: "Elle n'interroge le sac que par <code>nombre</code>, et parcourt <code>couleurs</code>, qui est une liste ordinaire fournie par le client. Rien à lui reprocher." },
            { texte: "D",
              explication: "Deux appels à <code>ajouter</code>, et rien d'autre : elle est aussi neutre que possible." },
          ],
          apres: `<span class="chapo">Le pire bug n'est pas celui qui plante</span>
            <code>len(s)</code> appliqué à un dictionnaire ne lève <strong>aucune
            erreur</strong> : il renvoie tranquillement un nombre, qui se trouve être faux.
            Un client qui plante est réparé le jour même, parce qu'on le voit ; un client qui
            ment peut vivre des mois avant que quelqu'un ne s'en aperçoive.`,
        },

        {
          id: "x2",
          type: "code",
          titre: "Fusionner deux sacs",
          contenu: `
            <p>Écris <code>fusion(s1, s2, couleurs)</code> : elle renvoie un
            <strong>nouveau</strong> sac contenant tous les jetons de <code>s1</code> et tous
            ceux de <code>s2</code>. Les deux sacs reçus doivent rester intacts.</p>

            <p>Le paramètre <code>couleurs</code> donne la liste des couleurs susceptibles
            d'apparaître.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi ce troisième paramètre ?</span>
              Reprends l'interface du sac : aucune de ses cinq opérations ne permet
              d'<strong>énumérer</strong> son contenu. On peut demander au sac combien il
              contient de rouges ; on ne peut pas lui demander « donne-moi tes jetons ». Sans
              la liste des couleurs possibles, fusionner serait donc impossible.
              <br><br>
              C'est une vraie limite de cette interface, et il faut la reconnaître comme
              telle : une interface trop pauvre finit par gêner ses clients. On y reviendra en
              séance 7, au moment de choisir une structure.
            </div>

            <p>Comme à l'exercice précédent, ton code sera rejoué sur une <strong>autre
            implémentation</strong>.</p>`,
          nomFichier: "fusion.py",
          depart: `# ---- L'implémentation « liste ». N'y touche pas. ----\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    return s.count(jeton)\n\n\n# ---- À toi. ----\n\ndef fusion(s1, s2, couleurs):\n    """Renvoie un nouveau sac reunissant les jetons de s1 et ceux de s2.\n\n    Precondition : toute couleur presente dans s1 ou s2 figure dans couleurs.\n    Effet : s1 et s2 ne sont pas modifies.\n    """\n    pass\n`,
          validation: {
            codeAbsent: [
              { motif: "\\bs1\\s*\\[", message: "Écrire s1[...] suppose de savoir comment le sac est fait. Passe par l'interface." },
              { motif: "\\bs2\\s*\\[", message: "Écrire s2[...] suppose de savoir comment le sac est fait. Passe par l'interface." },
            ],
            tests: `a = sac_vide()\nfor c in ["rouge", "rouge", "bleu"]:\n    ajouter(a, c)\nb = sac_vide()\nfor c in ["bleu", "vert"]:\n    ajouter(b, c)\nf = fusion(a, b, ["rouge", "bleu", "vert"])\nassert taille(f) == 5, "Trois jetons plus deux jetons font cinq jetons."\nassert nombre(f, "rouge") == 2, "Les deux rouges de a doivent se retrouver dans la fusion."\nassert nombre(f, "bleu") == 2, "Un bleu dans a, un bleu dans b : deux bleus au total."\nassert nombre(f, "vert") == 1, "Le vert de b ne doit pas se perdre."\nassert taille(a) == 3 and taille(b) == 2, "fusion() doit laisser ses deux sacs d'origine intacts."\nvide = fusion(sac_vide(), sac_vide(), ["rouge"])\nassert taille(vide) == 0, "La fusion de deux sacs vides est un sac vide."\ndef sac_vide():\n    return {}\ndef ajouter(s, jeton):\n    if jeton in s:\n        s[jeton] = s[jeton] + 1\n    else:\n        s[jeton] = 1\ndef taille(s):\n    return sum(s.values())\ndef nombre(s, jeton):\n    if jeton in s:\n        return s[jeton]\n    return 0\nc1 = sac_vide()\nfor c in ["rouge", "rouge", "bleu"]:\n    ajouter(c1, c)\nc2 = sac_vide()\nfor c in ["bleu", "vert"]:\n    ajouter(c2, c)\ng = fusion(c1, c2, ["rouge", "bleu", "vert"])\nassert taille(g) == 5, "Ta fusion doit donner le même résultat sur l'implémentation cachée : n'utilise que l'interface."\nassert nombre(g, "bleu") == 2, "Même exigence, couleur par couleur."\nassert taille(c1) == 3 and taille(c2) == 2, "Les sacs d'origine doivent rester intacts, quelle que soit l'implémentation."`,
          },
          felicitation: "Un client parfaitement neutre : il ignore jusqu'au type de ce qu'il manipule. 🔗",
          indices: [
            "Commence par fabriquer un sac neuf : c'est lui que tu rempliras, et que tu renverras à la fin.",
            "Pour chaque couleur de la liste, tu peux demander combien il y en a dans <code>s1</code> et combien dans <code>s2</code>. Il ne reste plus qu'à en mettre autant dans le nouveau sac.",
            "Il faut donc deux boucles imbriquées : la première parcourt <code>couleurs</code>, la seconde répète l'ajout autant de fois que nécessaire. <code>range</code> accepte n'importe quel nombre calculé.",
          ],
          solution: `# ---- L'implémentation « liste ». N'y touche pas. ----\n\ndef sac_vide():\n    return []\n\ndef ajouter(s, jeton):\n    s.append(jeton)\n\ndef taille(s):\n    return len(s)\n\ndef nombre(s, jeton):\n    return s.count(jeton)\n\n\n# ---- À toi. ----\n\ndef fusion(s1, s2, couleurs):\n    """Renvoie un nouveau sac reunissant les jetons de s1 et ceux de s2.\n\n    Precondition : toute couleur presente dans s1 ou s2 figure dans couleurs.\n    Effet : s1 et s2 ne sont pas modifies.\n    """\n    resultat = sac_vide()\n    for couleur in couleurs:\n        total = nombre(s1, couleur) + nombre(s2, couleur)\n        for _ in range(total):\n            ajouter(resultat, couleur)\n    return resultat\n`,
        },

        {
          id: "x3",
          type: "code",
          titre: "Le client qui supposait",
          contenu: `
            <p>Ces deux fonctions clientes ont été écrites du temps de l'implémentation
            « liste ». On vient de passer à l'implémentation « comptes », et elles ne vont
            plus du tout :</p>

            <ul>
              <li><code>compte_les</code> <strong>plante</strong> : elle appelle une méthode
              qui n'existe pas sur un dictionnaire ;</li>
              <li><code>est_plein</code> <strong>ne plante pas</strong> — et c'est bien pire :
              elle répond faux sans rien dire à personne.</li>
            </ul>

            <p>Répare les deux <strong>sans toucher à l'implémentation</strong>, en
            n'utilisant que l'interface.</p>`,
          nomFichier: "client_casse.py",
          depart: `# ---- L'implémentation « comptes ». Elle est juste : n'y touche pas. ----\n\ndef sac_vide():\n    return {}\n\ndef ajouter(s, jeton):\n    if jeton in s:\n        s[jeton] = s[jeton] + 1\n    else:\n        s[jeton] = 1\n\ndef taille(s):\n    return sum(s.values())\n\ndef nombre(s, jeton):\n    if jeton in s:\n        return s[jeton]\n    return 0\n\n\n# ---- Les deux clients à réparer. ----\n\ndef compte_les(s, couleurs):\n    """Renvoie le nombre total de jetons de s dont la couleur figure dans couleurs."""\n    total = 0\n    for c in couleurs:\n        total = total + s.count(c)\n    return total\n\ndef est_plein(s, maximum):\n    """Renvoie True si le sac contient au moins maximum jetons."""\n    return len(s) >= maximum\n`,
          validation: {
            codeAbsent: [
              { motif: "\\.count\\s*\\(", message: "Un dictionnaire n'a pas de méthode count : passe par l'interface du sac." },
              { motif: "\\blen\\s*\\(", message: "len() compte les clés du dictionnaire, pas les jetons. L'interface a une opération pour cela." },
            ],
            tests: `s = sac_vide()\nfor c in ["rouge", "bleu", "rouge", "vert", "bleu", "rouge"]:\n    ajouter(s, c)\nassert compte_les(s, ["rouge", "vert"]) == 4, "Trois rouges et un vert : quatre jetons."\nassert compte_les(s, ["jaune"]) == 0, "Une couleur absente ne compte pour rien."\nassert compte_les(s, ["rouge", "bleu", "vert"]) == 6, "Toutes les couleurs du sac : les six jetons."\nassert est_plein(s, 6) == True, "Le sac contient six jetons : il est plein dès le seuil de 6."\nassert est_plein(s, 7) == False, "Six jetons ne suffisent pas pour un seuil de 7."\nassert est_plein(s, 3) == True, "Six jetons dépassent largement un seuil de 3 — attention, il n'y a que trois couleurs."`,
          },
          felicitation: "Les deux clients sont réparés, et cette fois ils survivront au prochain changement. 🔧",
          indices: [
            "Dans les deux fonctions, la faute est la même : elles s'adressent à la <em>mémoire</em> du sac au lieu de s'adresser à son <em>interface</em>.",
            "Pour <code>compte_les</code>, la question « combien y a-t-il de jetons de cette couleur ? » a déjà une opération dédiée dans l'interface.",
            "Pour <code>est_plein</code>, la question « combien de jetons en tout ? » en a une aussi. Le dernier test est là pour te montrer la différence : ce sac a trois couleurs et six jetons, et ce ne sont pas les mêmes nombres.",
          ],
          solution: `# ---- L'implémentation « comptes ». Elle est juste : n'y touche pas. ----\n\ndef sac_vide():\n    return {}\n\ndef ajouter(s, jeton):\n    if jeton in s:\n        s[jeton] = s[jeton] + 1\n    else:\n        s[jeton] = 1\n\ndef taille(s):\n    return sum(s.values())\n\ndef nombre(s, jeton):\n    if jeton in s:\n        return s[jeton]\n    return 0\n\n\n# ---- Les deux clients à réparer. ----\n\ndef compte_les(s, couleurs):\n    """Renvoie le nombre total de jetons de s dont la couleur figure dans couleurs."""\n    total = 0\n    for c in couleurs:\n        total = total + nombre(s, c)\n    return total\n\ndef est_plein(s, maximum):\n    """Renvoie True si le sac contient au moins maximum jetons."""\n    return taille(s) >= maximum\n`,
        },

        {
          id: "x4",
          type: "code",
          titre: "Troisième implémentation : deux listes parallèles",
          contenu: `
            <p>Même interface, troisième intérieur. Cette fois, le sac est une liste de
            <strong>deux listes</strong> : la première retient chaque couleur <strong>une
            seule fois</strong>, dans l'ordre de sa première apparition ; la seconde retient,
            <strong>à la même position</strong>, le nombre d'exemplaires.</p>

            <p>Le sac contenant deux rouges et un bleu s'écrit donc :</p>
            <pre class="bloc-code"><code>[["rouge", "bleu"], [2, 1]]</code></pre>

            <p>Écris <code>sac_vide</code>, <code>ajouter</code>, <code>nombre</code> et
            <code>taille</code>.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le geste à trouver</span>
              Les trois dernières opérations posent toutes la même question : <em>à quelle
              position se trouve cette couleur ?</em> Réponds-y une bonne fois, dans une
              fonction à part, et les trois en découlent.
            </div>`,
          nomFichier: "sac_paralleles.py",
          depart: `# Implémentation « listes parallèles » : les couleurs d'un côté, les comptes de l'autre.\n\ndef sac_vide():\n    pass\n\ndef ajouter(s, jeton):\n    pass\n\ndef nombre(s, jeton):\n    pass\n\ndef taille(s):\n    pass\n`,
          validation: {
            tests: `s = sac_vide()\nassert s == [[], []], "Un sac neuf, ce sont deux listes vides : les couleurs connues, et leurs comptes."\nassert taille(s) == 0, "Un sac neuf a une taille de 0."\nassert nombre(s, "rouge") == 0, "Aucune couleur n'est encore connue."\najouter(s, "rouge")\najouter(s, "bleu")\najouter(s, "rouge")\nassert s[0] == ["rouge", "bleu"], "La première liste retient chaque couleur une seule fois, dans l'ordre de première apparition."\nassert s[1] == [2, 1], "La seconde liste donne, à la même position, le nombre d'exemplaires."\nassert taille(s) == 3, "Deux rouges et un bleu font trois jetons."\nassert nombre(s, "rouge") == 2, "Le rouge a été ajouté deux fois."\nassert nombre(s, "jaune") == 0, "Une couleur jamais ajoutée doit donner 0, sans erreur."\nfor i in range(4):\n    ajouter(s, "vert")\nassert s[0] == ["rouge", "bleu", "vert"], "Le vert apparaît en dernier : il s'ajoute en fin de la liste des couleurs."\nassert s[1] == [2, 1, 4], "Quatre verts."\nassert taille(s) == 7, "Trois jetons puis quatre verts : sept jetons."`,
          },
          felicitation: "Trois implémentations d'une même interface. Le programme officiel est servi. 🎯",
          indices: [
            "Écris d'abord une fonction à part qui rend la position d'une couleur dans <code>s[0]</code>, et une valeur impossible — <code>-1</code> par exemple — si elle n'y figure pas.",
            "Dans <code>ajouter</code>, deux cas : si la couleur est déjà connue, c'est son compte qu'il faut augmenter, à la même position dans <code>s[1]</code> ; sinon, il faut allonger <strong>les deux</strong> listes.",
            "Pour parcourir les positions plutôt que les valeurs, boucle sur <code>range(len(s[0]))</code>. Et pour <code>taille</code>, la liste <code>s[1]</code> contient exactement les nombres à additionner.",
          ],
          solution: `# Implémentation « listes parallèles » : les couleurs d'un côté, les comptes de l'autre.\n\ndef position(s, jeton):\n    for i in range(len(s[0])):\n        if s[0][i] == jeton:\n            return i\n    return -1\n\ndef sac_vide():\n    return [[], []]\n\ndef ajouter(s, jeton):\n    i = position(s, jeton)\n    if i == -1:\n        s[0].append(jeton)\n        s[1].append(1)\n    else:\n        s[1][i] = s[1][i] + 1\n\ndef nombre(s, jeton):\n    i = position(s, jeton)\n    if i == -1:\n        return 0\n    return s[1][i]\n\ndef taille(s):\n    return sum(s[1])\n`,
          apres: `<p>Remarque la fonction <code>position</code> : elle ne figure pas dans
            l'interface du sac, et c'est très bien ainsi. Elle appartient à
            l'<strong>implémentation</strong> — elle connaît la forme exacte de la mémoire, et
            aucun client n'a le droit de l'appeler. Une implémentation peut se donner autant
            de fonctions internes qu'elle veut ; ce qu'elle ne peut pas faire, c'est en
            imposer l'usage à ses clients.</p>`,
        },

        {
          id: "x5",
          type: "code",
          titre: "Le journal de bord",
          contenu: `
            <p>Dernier type abstrait de la séance — et cette fois, tu n'auras que sa
            <strong>spécification</strong> : à toi de choisir entièrement l'implémentation.</p>

            <div class="enveloppe-table">
            <table class="table-simple">
              <tr><th>Signature</th><th>Renvoie</th><th>Précondition</th><th>Effet</th></tr>
              <tr><td><code>journal_vide()</code></td><td>un journal sans aucune note</td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>noter(j, message)</code></td><td>rien</td><td>aucune</td><td><code>message</code> est ajouté à la fin de <code>j</code></td></tr>
              <tr><td><code>combien(j)</code></td><td>le nombre de notes de <code>j</code></td><td>aucune</td><td>aucun</td></tr>
              <tr><td><code>derniere(j)</code></td><td>la note écrite le plus récemment</td><td><code>combien(j) &gt;= 1</code></td><td>aucun</td></tr>
              <tr><td><code>effacer_derniere(j)</code></td><td>rien</td><td><code>combien(j) &gt;= 1</code></td><td>la note la plus récente disparaît</td></tr>
            </table>
            </div>

            <p>Écris les cinq opérations. Lis bien les colonnes « Renvoie » et « Effet » :
            elles te disent, pour chacune, s'il faut un <code>return</code> ou non.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ne cherche pas compliqué</span>
              Une liste Python fait très bien l'affaire, et propose déjà tout ce qu'il faut
              pour ajouter à la fin, lire la fin et enlever la fin.
            </div>`,
          nomFichier: "journal.py",
          depart: `# Le journal de bord : des notes, dans l'ordre où elles ont été écrites.\n\ndef journal_vide():\n    pass\n\ndef noter(j, message):\n    pass\n\ndef combien(j):\n    pass\n\ndef derniere(j):\n    pass\n\ndef effacer_derniere(j):\n    pass\n`,
          validation: {
            tests: `j = journal_vide()\nassert combien(j) == 0, "Un journal neuf ne contient aucune note."\nnoter(j, "depart du port")\nassert combien(j) == 1, "Une note écrite, une note comptée."\nassert derniere(j) == "depart du port", "La seule note du journal est forcément la plus récente."\nnoter(j, "cap au nord")\nnoter(j, "tempete")\nassert combien(j) == 3, "Trois notes ont été écrites."\nassert derniere(j) == "tempete", "derniere() rend la note la plus récemment écrite, pas la première."\neffacer_derniere(j)\nassert combien(j) == 2, "Après un effacement il ne reste que deux notes."\nassert derniere(j) == "cap au nord", "En effaçant la tempête, la note précédente redevient la plus récente."\neffacer_derniere(j)\neffacer_derniere(j)\nassert combien(j) == 0, "Trois notes, trois effacements : le journal est vide."\nk = journal_vide()\nassert combien(k) == 0, "Chaque appel à journal_vide() doit rendre un journal neuf et indépendant."`,
          },
          felicitation: "Un type abstrait implémenté à partir de sa seule spécification. 📓",
          indices: [
            "Chaque opération correspond presque mot pour mot à quelque chose que les listes Python savent déjà faire.",
            "Pour la note la plus récente, souviens-toi que l'indice <code>-1</code> désigne le dernier élément d'une liste.",
            "Pour l'effacement, la méthode des listes qui retire le dernier élément fait le travail en une ligne. Elle renvoie aussi cet élément — mais rien ne t'oblige à en faire quelque chose.",
          ],
          solution: `# Le journal de bord : des notes, dans l'ordre où elles ont été écrites.\n\ndef journal_vide():\n    return []\n\ndef noter(j, message):\n    j.append(message)\n\ndef combien(j):\n    return len(j)\n\ndef derniere(j):\n    return j[-1]\n\ndef effacer_derniere(j):\n    j.pop()\n`,
          apres: `<span class="chapo">Tu viens d'écrire une pile</span>
              Regarde les trois opérations qui manipulent les notes : on ajoute à la fin, on
              lit la fin, on enlève la fin. Jamais autre chose. Cette structure a un nom —
              c'est une <strong>pile</strong>, et c'est le sujet de la séance 3.
              <br><br>
              Retiens surtout la façon dont tu es tombé dessus : tu n'as fait que respecter
              une spécification, sans chercher de structure particulière. C'est exactement
              ainsi qu'on reconnaît une pile ou une file dans un problème — en regardant
              quels gestes il autorise, et lesquels il n'autorise pas.`,
        },

        {
          id: "x6",
          type: "code",
          titre: "À toi de spécifier",
          contenu: `
            <p>Dernier défi, et il est libre : invente ton propre type abstrait, puis
            implémente-le.</p>

            <p>Quelques idées, si aucune ne te vient : le <strong>panier de courses</strong>,
            la <strong>playlist</strong>, le <strong>carnet de notes</strong>, le
            <strong>trousseau de clés</strong>, la <strong>liste d'attente du self</strong>…</p>

            <p><strong>Le cahier des charges :</strong></p>
            <ul>
              <li>au moins <strong>quatre fonctions</strong> : une qui crée la structure, au
              moins une qui la modifie, au moins une qui l'interroge sans la modifier ;</li>
              <li>chacune porte une <strong>docstring</strong> qui dit ce qu'elle promet ;</li>
              <li>en dessous, un petit programme <strong>client</strong> qui affiche au moins
              <strong>trois lignes</strong> et n'utilise que tes fonctions.</li>
            </ul>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'épreuve du client</span>
              Avant de valider, relis ton programme client : s'il contient un crochet, un
              <code>len</code> ou un <code>append</code> appliqué à ta structure, c'est qu'il
              regarde dedans. Déplace ce geste dans une fonction — c'est là qu'il a sa place.
            </div>`,
          nomFichier: "mon_type.py",
          depart: `# Mon type abstrait : .....................\n#\n# Écris ici tes fonctions, chacune avec sa docstring,\n# puis le programme client en dessous.\n`,
          validation: {
            codeContient: [
              { motif: "(def\\s+\\w+\\s*\\([\\s\\S]*?){4}",
                message: "Il faut au moins quatre fonctions : une qui crée, au moins une qui modifie, au moins une qui interroge." },
              { motif: "(\"\"\"[\\s\\S]*?\"\"\"[\\s\\S]*?){4}",
                message: "Chaque fonction doit porter une docstring entre triples guillemets." },
              { motif: "print\\s*\\([\\s\\S]*print\\s*\\([\\s\\S]*print\\s*\\(",
                message: "Ton programme client doit afficher au moins trois lignes." },
            ],
            sortieRegex: "[^\\n]*\\n[^\\n]*\\n[^\\n]*",
            sortieRegexMessage: "Le programme doit afficher au moins trois lignes.",
          },
          felicitation: "Type abstrait spécifié, implémenté, et utilisé sans tricher. La séance est bouclée. 🏁",
          indices: [
            "Commence par la fonction qui crée la structure vide : c'est elle qui décide de tout le reste, puisqu'elle fixe la façon de ranger les données.",
            "Écris la docstring <strong>avant</strong> le corps de chaque fonction. C'est le contrat, et l'écrire d'abord aide beaucoup à écrire le code ensuite.",
            "Le programme client vient tout en bas, sans indentation : il crée la structure, la modifie deux ou trois fois, puis affiche ce qu'il en a appris.",
          ],
          solution: `# Mon type abstrait : la playlist.\n\ndef playlist_vide():\n    """Renvoie une playlist ne contenant aucun titre."""\n    return []\n\ndef ajouter_titre(p, titre):\n    """Ajoute titre a la fin de la playlist p. Ne renvoie rien."""\n    p.append(titre)\n\ndef combien_de_titres(p):\n    """Renvoie le nombre de titres de la playlist p."""\n    return len(p)\n\ndef contient(p, titre):\n    """Renvoie True si titre figure dans la playlist p."""\n    for t in p:\n        if t == titre:\n            return True\n    return False\n\n\n# ---- Le programme client ----\nma_playlist = playlist_vide()\najouter_titre(ma_playlist, "Bohemian Rhapsody")\najouter_titre(ma_playlist, "Wonderwall")\najouter_titre(ma_playlist, "Hey Jude")\n\nprint("Nombre de titres :", combien_de_titres(ma_playlist))\nprint("Wonderwall est dans la playlist :", contient(ma_playlist, "Wonderwall"))\nprint("Imagine est dans la playlist :", contient(ma_playlist, "Imagine"))\n`,
        },
      ],
    },
  ],
};

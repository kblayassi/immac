/* Séance 1 — Ta première page web.
 *
 * Le fil : une page web n'est pas une image, c'est du texte que le navigateur
 * met en forme d'après des balises. Tout part de là. On installe les balises de
 * texte (h1 à h6, p, br, strong, em), puis le squelette complet d'un document.
 *
 * Programme SNT, thème « Le Web » : « Étudier et modifier une page HTML simple ».
 */

export default {
  id: "s01",
  numero: 1,
  titre: "Ta première page web",
  sousTitre: "Balises, titres, paragraphes",
  palier: "Partie 1 — HTML : ce qu'il y a dans la page",

  accroche: `Ouvre n'importe quel site, fais un clic droit, « Afficher le code source
    de la page » : ce qui apparaît, c'est du texte. Rien d'autre. Dans cette séance tu
    apprends à écrire ce texte-là, et tu vois ta page se dessiner à côté au fur et à
    mesure que tu tapes.`,

  objectifs: [
    "expliquer ce qu'est une <strong>balise</strong> et pourquoi elle s'ouvre et se ferme,",
    "écrire des titres <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> et des paragraphes <code>&lt;p&gt;</code>,",
    "savoir pourquoi tes retours à la ligne ne se voient pas, et utiliser <code>&lt;br&gt;</code>,",
    "écrire le <strong>squelette complet</strong> d'une page web,",
    "mettre un mot en gras ou en italique, et repérer une balise mal fermée.",
  ],

  motDeLaFin: `Tu sais écrire une page de texte structurée. À la séance suivante, on y
    met des listes, des images et des liens — c'est-à-dire tout ce qu'il faut pour une
    vraie recette de cuisine.`,

  parties: [
    /* ================================================================ DÉCOUVERTE */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 30,
      etoiles: 1,
      intention: "une idée à la fois, avec ta page qui se dessine à côté",
      etapes: [

        {
          id: "d1", type: "cours",
          titre: "Ce que le navigateur reçoit vraiment",
          contenu: `
            <p>Quand tu ouvres une page web, ton navigateur ne reçoit pas une image de
            la page. Il reçoit un <strong>fichier texte</strong>, et il le met en forme
            lui-même en suivant des indications écrites dedans.</p>

            <p>Voici une de ces indications, telle qu'elle est écrite dans le fichier :</p>

            <pre class="bloc-code"><code>&lt;h1&gt;Mes recettes préférées&lt;/h1&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Et voici ce que le visiteur voit</span>
              <p style="font-size:2em;font-weight:700;margin:.2em 0">Mes recettes préférées</p>
            </div>

            <p>Les chevrons ont disparu, et le texte est devenu gros et gras. Pourtant,
            tu n'as demandé nulle part qu'il soit gros : tu as seulement dit « ceci est le
            titre principal ». C'est le navigateur qui en a déduit l'apparence.</p>

            <p>Ces indications entre chevrons s'appellent des <strong>balises</strong>.
            Tu écris le texte et tu dis ce qu'il est ; le navigateur décide de quoi il a
            l'air.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">HTML</span>
              <em>HyperText Markup Language</em> : « langage de balisage ». Balisage,
              comme les balises d'un sentier de randonnée : elles ne sont pas le chemin,
              elles disent ce qu'il est.
            </div>

            <p>Dans tout ce parcours, tu écris à gauche et tu vois le résultat à droite.
            L'aperçu se met à jour tout seul, pendant que tu tapes.</p>`,
          libelleBouton: "À moi d'écrire →",
        },

        {
          id: "d2", type: "code",
          titre: "Ton premier titre",
          contenu: `
            <p>À gauche, une balise <code>&lt;h1&gt;</code> t'attend, vide. Écris ton titre
            <strong>entre</strong> la balise ouvrante et la balise fermante, puis regarde
            l'aperçu changer.</p>
            <p>Le titre est libre : « Mes recettes », « La cuisine de Lina », ce que tu veux.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!-- Écris ton titre entre les deux balises. -->
<h1></h1>
` },
          ],
          validation: {
            elements: [
              { selecteur: "h1", texteNonVide: true,
                message: "La balise <h1> est encore vide : écris ton titre entre <h1> et </h1>." },
            ],
          },
          indices: [
            "Le texte se place <em>entre</em> les deux balises, pas avant, pas après.",
            "Tu dois obtenir quelque chose de la forme : chevron h1 chevron, ton texte, puis la balise fermante.",
          ],
          felicitation: "Tu viens d'écrire du HTML. 🎉",
          apres: `<p>Remarque la taille du texte dans l'aperçu : tu n'as demandé nulle part
            qu'il soit gros. C'est le navigateur qui l'a décidé, parce que tu lui as dit
            « ceci est un titre de niveau 1 ».</p>`,
        },

        {
          id: "d3", type: "cours",
          titre: "Anatomie d'une balise",
          contenu: `
            <p>La plupart des balises fonctionnent par <strong>paire</strong> : une balise
            ouvrante, un contenu, une balise fermante. La fermante porte une barre
            oblique.</p>

            <pre class="bloc-code"><code>&lt;h1&gt;   Mes recettes   &lt;/h1&gt;
   ↑            ↑            ↑
ouvrante     contenu      fermante</code></pre>

            <p>Ce trio forme un <strong>élément</strong>. Un élément peut en contenir
            d'autres : c'est ce qui donne à une page sa structure, comme des boîtes
            rangées dans des boîtes.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">L'erreur numéro un</span>
              Oublier la barre oblique de la fermante. Le navigateur ne signale rien :
              il croit simplement que tu ouvres une <em>deuxième</em> balise, et tout
              ce qui suit part avec. C'est la faute la plus fréquente, et la plus
              difficile à voir.
            </div>`,
        },

        {
          id: "d4", type: "prediction",
          titre: "La barre oblique oubliée",
          contenu: `<p>Voici une page où la fermeture du titre a été mal écrite.
            Lis-la, puis dis ce que le navigateur va afficher.</p>`,
          code: `<h1>Mes recettes<h1>
<p>Bienvenue sur mon site.</p>`,
          question: "Qu'affiche le navigateur ?",
          options: [
            {
              texte: "Un message d'erreur : la page ne s'affiche pas.",
              explication: "Non — et c'est bien le problème. Le HTML n'a pas de message d'erreur : le navigateur affiche toujours quelque chose, quitte à se tromper sur tes intentions.",
            },
            {
              texte: "« Mes recettes » en gros, puis « Bienvenue sur mon site. » en taille normale.",
              explication: "C'est ce qu'on voudrait, mais le titre n'a jamais été fermé : il manque la barre oblique dans le second <code>&lt;h1&gt;</code>.",
            },
            {
              texte: "« Mes recettes » en gros, et « Bienvenue sur mon site. » en gros aussi.",
              correct: true,
              explication: "Exactement. Le second <code>&lt;h1&gt;</code> n'est pas une fermeture : c'est un deuxième titre qui s'ouvre, et tout ce qui suit se retrouve dedans.",
            },
          ],
          apres: `<span class="chapo">Ce que le parcours t'apporte</span> Dans cet atelier,
            une balise non fermée te sera signalée avec son numéro de ligne. Dans un vrai
            éditeur, personne ne te le dira : il faudra la trouver à l'œil.`,
        },

        {
          id: "d5", type: "code",
          titre: "Le paragraphe",
          contenu: `
            <p>Le texte courant se range dans des <strong>paragraphes</strong>, avec la
            balise <code>&lt;p&gt;</code>. Un paragraphe par idée.</p>
            <p>Sous le titre, ajoute <strong>deux paragraphes</strong> : le premier dit
            de quoi parle ton site, le second dit qui tu es. Au moins cinq mots chacun.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Mes recettes préférées</h1>

` },
          ],
          validation: {
            elements: [
              { selecteur: "h1", texteNonVide: true,
                message: "Ne supprime pas le titre <h1> de la page." },
              { selecteur: "p", min: 2, tous: true, motsMin: 5,
                message: "Il faut deux paragraphes <p> sous le titre.",
                messageDetail: "Chaque paragraphe doit contenir au moins cinq mots — écris de vraies phrases." },
            ],
          },
          indices: [
            "Un paragraphe s'écrit comme le titre : une balise ouvrante, ton texte, une balise fermante. Seule la lettre change.",
            "Les deux paragraphes se placent l'un après l'autre, sous la ligne du titre.",
            "Vérifie que chacun de tes deux <code>&lt;p&gt;</code> possède bien sa fermeture, avec la barre oblique.",
          ],
          felicitation: "Titre et paragraphes : tu as la base de toute page web. ✅",
        },

        {
          id: "d6", type: "prediction",
          titre: "Et tes retours à la ligne ?",
          contenu: `<p>Dans le code ci-dessous, les trois ingrédients sont écrits sur
            trois lignes. Que va-t-il se passer à l'écran ?</p>`,
          code: `<p>Pommes
Farine
Lait</p>`,
          question: "Comment ce paragraphe s'affiche-t-il ?",
          options: [
            {
              texte: "Sur trois lignes, comme dans le code.",
              explication: "Non. Le HTML ne tient aucun compte de la façon dont tu disposes ton texte dans le fichier : ce qui compte, ce sont les balises.",
            },
            {
              texte: "Sur une seule ligne : Pommes Farine Lait",
              correct: true,
              explication: "Oui. Retours à la ligne, tabulations, séries d'espaces : tout cela est ramené à une seule espace. Le fichier est fait pour être lisible par toi, pas pour dessiner la page.",
            },
            {
              texte: "Sur une seule ligne, tout collé : PommesFarineLait",
              explication: "Presque : le texte tient bien sur une ligne, mais les retours à la ligne ne disparaissent pas complètement — chacun devient une espace.",
            },
          ],
          apres: `<span class="chapo">La bonne nouvelle</span> Tu peux donc indenter ton
            code et l'aérer autant que tu veux pour t'y retrouver : cela ne changera rien
            à l'affichage.`,
        },

        {
          id: "d7", type: "cours",
          titre: "Aller à la ligne : la balise solitaire",
          contenu: `
            <p>Tu viens de le voir : appuyer sur <kbd>Entrée</kbd> dans ton fichier ne
            fait rien du tout à l'écran. Si tu veux vraiment passer à la ligne, il faut
            le <em>demander</em>, avec une balise :</p>

            <pre class="bloc-code"><code>&lt;p&gt;12 rue des Lilas&lt;br&gt;75011 Paris&lt;/p&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Ce que ça donne à l'écran</span>
              12 rue des Lilas<br>75011 Paris
            </div>

            <p>Regarde bien cette balise : elle n'a <strong>pas de fermeture</strong>.
            Et c'est logique — les balises que tu connais entourent du texte, alors que
            celle-ci n'entoure rien : elle marque un endroit. Il n'y a donc rien à
            refermer, et <code>&lt;/br&gt;</code> est une faute.</p>

            <p>Ces balises solitaires sont rares. Tu en rencontreras une autre à la
            séance suivante, pour les images.</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Ce que tu veux</th><th>La balise</th><th>À l'écran</th></tr>
                <tr><td>Deux blocs de texte séparés</td><td><code>&lt;p&gt;…&lt;/p&gt;</code> deux fois</td><td>un blanc entre les deux</td></tr>
                <tr><td>Passer à la ligne suivante</td><td><code>&lt;br&gt;</code></td><td>les lignes restent collées</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">À ne pas confondre</span>
              <code>&lt;br&gt;</code> sert à couper une adresse, un vers, une signature.
              Il ne sert <strong>pas</strong> à écarter deux paragraphes : pour cela, on
              écrit deux <code>&lt;p&gt;</code>.
            </div>`,
        },

        {
          id: "d8", type: "code",
          titre: "Couper une ligne au bon endroit",
          contenu: `
            <p>Le paragraphe ci-contre contient une adresse écrite d'un seul tenant.
            Coupe-la pour qu'elle s'affiche sur <strong>trois lignes</strong> :</p>
            <div class="encadre">
              Chez Lina<br>12 rue des Lilas<br>75011 Paris
            </div>
            <p>Sans ajouter de paragraphe : le texte doit rester dans le même
            <code>&lt;p&gt;</code>.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Où me trouver</h1>
<p>Chez Lina 12 rue des Lilas 75011 Paris</p>
` },
          ],
          validation: {
            elements: [
              { selecteur: "p", min: 1, max: 1,
                message: "Garde un seul paragraphe : c'est <br> qui doit couper les lignes.",
                messageMax: "Garde un seul paragraphe : c'est <br> qui doit couper les lignes." },
              { selecteur: "br", min: 2,
                message: "Il faut deux <br> pour obtenir trois lignes." },
              { selecteur: "p", texteMotif: "chez lina.*lilas.*paris",
                messageDetail: "Le texte de l'adresse doit rester complet et dans le même ordre." },
            ],
          },
          indices: [
            "Trois lignes, cela demande deux coupures : une après « Chez Lina », une après « 12 rue des Lilas ».",
            "La balise se glisse à l'endroit exact où tu veux que la ligne s'arrête, sans rien effacer du texte.",
            "Attention à ne pas écrire de fermeture pour <code>&lt;br&gt;</code> : elle vit seule.",
          ],
          felicitation: "Les lignes tombent où tu l'as décidé. ✅",
        },

        {
          id: "d9", type: "cours",
          titre: "Le squelette d'une vraie page",
          contenu: `
            <p>Jusqu'ici tu écrivais des morceaux de page, et le navigateur s'en
            accommodait. Mais si tu ouvres le code source de n'importe quel site — clic
            droit, « Afficher le code source » — tu retrouveras toujours les mêmes lignes
            autour du contenu. C'est l'<strong>ossature</strong> d'un fichier
            <code>.html</code>, et elle ne change jamais :</p>

            <pre class="bloc-code"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Mes recettes&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Mes recettes&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Ligne</th><th>Ce qu'elle dit</th></tr>
                <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>« ce fichier est du HTML moderne » — toujours en première ligne</td></tr>
                <tr><td><code>&lt;html lang="fr"&gt;</code></td><td>toute la page, écrite en français</td></tr>
                <tr><td><code>&lt;head&gt;</code></td><td>la <strong>fiche d'identité</strong> : rien de ce qui est là ne s'affiche dans la page</td></tr>
                <tr><td><code>&lt;meta charset="utf-8"&gt;</code></td><td>« les accents sont codés en UTF-8 » — sans elle, é devient Ã©</td></tr>
                <tr><td><code>&lt;title&gt;</code></td><td>le nom de l'onglet, et le titre dans les résultats de recherche</td></tr>
                <tr><td><code>&lt;body&gt;</code></td><td>le <strong>corps</strong> : tout ce que le visiteur voit</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">head et body</span>
              <code>&lt;title&gt;</code> et <code>&lt;h1&gt;</code> disent tous les deux le
              titre, mais pas au même public : le premier parle au navigateur et aux
              moteurs de recherche, le second parle au visiteur.
            </div>`,
        },

        {
          id: "d10", type: "code",
          titre: "Monter le squelette",
          contenu: `
            <p>Le squelette de gauche est incomplet. Complète-le pour que :</p>
            <ul>
              <li>l'onglet du navigateur affiche un titre de ton choix (au moins deux mots),</li>
              <li>la page affiche un <code>&lt;h1&gt;</code> et un paragraphe de présentation.</li>
            </ul>
            <p>Le titre de l'onglet apparaît dans la barre grise au-dessus de l'aperçu.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "title", motsMin: 2,
                message: "La balise <title> est vide : donne un nom à ton site, en deux mots au moins." },
              { selecteur: "body h1", texteNonVide: true,
                message: "Il manque un titre <h1> dans le <body>." },
              { selecteur: "body p", motsMin: 5,
                message: "Il manque un paragraphe de présentation dans le <body>.",
                messageDetail: "Ton paragraphe doit contenir au moins cinq mots." },
            ],
          },
          indices: [
            "Deux choses à faire : remplir le <code>&lt;title&gt;</code> qui est déjà là, et écrire deux balises dans le <code>&lt;body&gt;</code>.",
            "Rien de ce que tu écris dans le <code>&lt;head&gt;</code> ne s'affiche dans la page : le titre visible et le paragraphe vont dans le <code>&lt;body&gt;</code>.",
          ],
          felicitation: "Tu viens d'écrire une page web complète et valide. 🎉",
          apres: `<p>À partir de maintenant, garde ce squelette : toutes les pages que
            tu écriras dans ce parcours commencent comme celle-là.</p>`,
        },

        {
          id: "d11", type: "cours",
          titre: "Six niveaux de titre",
          contenu: `
            <p>Le 1 de <code>&lt;h1&gt;</code> n'est pas là par hasard : il existe six
            balises de titre, de <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code>.
            Écrivons-les toutes les six et regardons ce que le navigateur en fait.</p>

            <pre class="bloc-code"><code>&lt;h1&gt;Tarte aux pommes&lt;/h1&gt;
&lt;h2&gt;Ingrédients&lt;/h2&gt;
&lt;h3&gt;Pour la pâte&lt;/h3&gt;
&lt;h4&gt;Variante sans beurre&lt;/h4&gt;
&lt;h5&gt;Remarque&lt;/h5&gt;
&lt;h6&gt;Note&lt;/h6&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Ce que ça donne à l'écran</span>
              <p style="font-size:2em;font-weight:700;margin:.2em 0">Tarte aux pommes</p>
              <p style="font-size:1.5em;font-weight:700;margin:.2em 0">Ingrédients</p>
              <p style="font-size:1.17em;font-weight:700;margin:.2em 0">Pour la pâte</p>
              <p style="font-size:1em;font-weight:700;margin:.2em 0">Variante sans beurre</p>
              <p style="font-size:.83em;font-weight:700;margin:.2em 0">Remarque</p>
              <p style="font-size:.7em;font-weight:700;margin:.2em 0">Note</p>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le piège</span>
              On remarque que le texte devient de plus en plus petit — et c'est
              exactement ce qui trompe tout le monde. Les balises de titre ne servent
              <strong>pas</strong> à choisir une taille de texte : elles servent à
              <strong>ordonner le contenu de la page</strong>, comme le plan d'un exposé.
              Un texte plus petit, cela se demandera en CSS à la séance 3. Un titre, on
              n'en met que là où il y a vraiment une nouvelle partie.
            </div>

            <p>D'où les deux règles qui en découlent :</p>
            <ul>
              <li><strong>un seul <code>&lt;h1&gt;</code> par page</strong> : c'est le titre du document, il n'y en a qu'un ;</li>
              <li><strong>on ne saute pas de niveau</strong> : après un <code>&lt;h1&gt;</code> vient un <code>&lt;h2&gt;</code>, jamais directement un <code>&lt;h3&gt;</code>.</li>
            </ul>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi ça compte vraiment</span>
              Ce plan est lu par les moteurs de recherche pour comprendre de quoi parle
              ta page, et par les lecteurs d'écran des personnes aveugles, qui proposent
              de sauter de titre en titre. Un plan bancal, c'est une page mal référencée
              et difficile à parcourir.
            </div>`,
        },

        {
          id: "d12", type: "code",
          titre: "Donner un plan à ta page",
          contenu: `
            <p>La page de gauche contient un titre et trois paragraphes en vrac.
            Ajoute <strong>deux sous-titres <code>&lt;h2&gt;</code></strong> pour la
            structurer, comme ceci :</p>
            <div class="encadre">
              <span class="chapo">Le plan à obtenir</span>
              <ul>
                <li>Tarte aux pommes <em>(titre principal, déjà écrit)</em></li>
                <li>Ingrédients <em>(sous-titre à ajouter)</em></li>
                <li>Préparation <em>(sous-titre à ajouter)</em></li>
              </ul>
            </div>
            <p>Place chaque sous-titre juste avant le paragraphe qu'il annonce.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Tarte aux pommes</title>
  </head>
  <body>
    <h1>Tarte aux pommes</h1>
    <p>Une recette de saison, prête en une heure.</p>
    <p>Il faut une pâte brisée, quatre pommes, du sucre et un peu de beurre.</p>
    <p>Étale la pâte, dispose les pommes en rosace, saupoudre et enfourne.</p>
  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "h1", min: 1, max: 1,
                message: "Garde un seul <h1> : c'est le titre de la page.",
                messageMax: "Une page ne contient qu'un seul <h1>. Les sous-titres, ce sont des <h2>." },
              { selecteur: "h2", min: 2,
                message: "Il faut ajouter deux sous-titres <h2>." },
              { selecteur: "h2", texteMotif: "ingr" ,
                messageDetail: "L'un des deux <h2> doit s'intituler « Ingrédients »." },
              { selecteur: "h2", texteMotif: "pr.parat",
                messageDetail: "L'autre <h2> doit s'intituler « Préparation »." },
              { selecteur: "p", min: 3,
                message: "Ne supprime aucun des trois paragraphes." },
            ],
          },
          indices: [
            "Un sous-titre s'écrit exactement comme le titre principal : seul le chiffre change.",
            "« Ingrédients » annonce le paragraphe qui énumère la pâte et les pommes ; « Préparation » annonce celui qui décrit les gestes.",
          ],
          felicitation: "Ta page a un plan : c'est ce qui la rend lisible. ✅",
        },

        {
          id: "d13", type: "cours",
          titre: "Mettre un mot en valeur",
          contenu: `
            <p>Reprenons une phrase de recette et mettons deux mots en valeur :</p>

            <pre class="bloc-code"><code>&lt;p&gt;Le four doit être &lt;strong&gt;très chaud&lt;/strong&gt;, et on remue &lt;em&gt;sans cesse&lt;/em&gt;.&lt;/p&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Ce que ça donne à l'écran</span>
              Le four doit être <strong>très chaud</strong>, et on remue <em>sans cesse</em>.
            </div>

            <p>Une balise a mis le texte en gras, l'autre en italique. Il en existe
            <strong>deux de chaque</strong>, et les quatre sont correctes :</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Balise</th><th>Ce qu'elle dit</th><th>Rendu</th></tr>
                <tr><td><code>&lt;strong&gt;</code></td><td>c'est important</td><td><strong>en gras</strong></td></tr>
                <tr><td><code>&lt;b&gt;</code></td><td>mets ça en gras <em>(bold)</em></td><td><strong>en gras</strong></td></tr>
                <tr><td><code>&lt;em&gt;</code></td><td>j'insiste là-dessus <em>(emphasis)</em></td><td><em>en italique</em></td></tr>
                <tr><td><code>&lt;i&gt;</code></td><td>mets ça en italique <em>(italic)</em></td><td><em>en italique</em></td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Alors laquelle choisir ?</span>
              <code>&lt;b&gt;</code> et <code>&lt;i&gt;</code> décrivent une
              <strong>apparence</strong> ; <code>&lt;strong&gt;</code> et
              <code>&lt;em&gt;</code> décrivent une <strong>intention</strong>. Le
              résultat est le même à l'œil, et les deux écritures sont acceptées dans
              tout ce parcours. Prends quand même l'habitude de
              <code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code> : un lecteur d'écran
              les prononce avec insistance, alors qu'il passe sur les deux autres sans
              rien changer à sa voix.
            </div>

            <p>Ces balises s'écrivent <strong>dans</strong> un paragraphe, jamais autour.
            Et comme toutes les boîtes, elles doivent se refermer dans l'ordre où elles
            ont été ouvertes :</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">On ne croise jamais deux balises</span>
              <code>&lt;p&gt;Un &lt;strong&gt;mot&lt;/p&gt;&lt;/strong&gt;</code> est faux :
              le paragraphe se referme alors que <code>strong</code> est encore ouvert.
              La dernière ouverte est toujours la première refermée.
            </div>`,
        },

        {
          id: "d14", type: "code",
          titre: "Insister au bon endroit",
          contenu: `
            <p>Dans le paragraphe de gauche, mets en valeur :</p>
            <ul>
              <li><strong>en gras</strong> les mots <strong>vingt minutes</strong> — c'est l'information à ne pas rater ;</li>
              <li><em>en italique</em> le mot <em>doucement</em> — c'est une nuance.</li>
            </ul>
            <p>Sans rien changer d'autre au texte.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Crème anglaise</h1>
<p>Fais chauffer le lait pendant vingt minutes, en remuant doucement.</p>
` },
          ],
          validation: {
            elements: [
              { selecteur: "p strong, p b", texteMotif: "^vingt minutes$",
                message: "Il manque un <strong> (ou un <b>) autour de « vingt minutes », à l'intérieur du paragraphe.",
                messageDetail: "La balise du gras doit entourer exactement les mots « vingt minutes »." },
              { selecteur: "p em, p i", texteMotif: "^doucement$",
                message: "Il manque un <em> (ou un <i>) autour du mot « doucement », à l'intérieur du paragraphe.",
                messageDetail: "La balise de l'italique doit entourer exactement le mot « doucement »." },
              { selecteur: "p", texteMotif: "chauffer le lait pendant vingt minutes, en remuant doucement",
                messageDetail: "Le texte du paragraphe doit rester intact : on ajoute des balises, on ne réécrit pas la phrase." },
            ],
          },
          indices: [
            "Les balises se glissent autour des mots visés, à l'intérieur du paragraphe : rien n'est effacé.",
            "Attention à ne pas englober la virgule ni l'espace qui suivent « vingt minutes ».",
            "Chacune des deux balises doit être refermée avant la fin du paragraphe.",
          ],
          felicitation: "Tu sais baliser à l'intérieur d'une phrase. ✅",
        },

        {
          id: "d15", type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Balise</th><th>À quoi elle sert</th><th>Se ferme ?</th></tr>
                <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>première ligne du fichier</td><td>non</td></tr>
                <tr><td><code>&lt;html&gt;</code></td><td>toute la page</td><td>oui</td></tr>
                <tr><td><code>&lt;head&gt;</code></td><td>fiche d'identité, invisible</td><td>oui</td></tr>
                <tr><td><code>&lt;title&gt;</code></td><td>nom de l'onglet</td><td>oui</td></tr>
                <tr><td><code>&lt;body&gt;</code></td><td>ce que le visiteur voit</td><td>oui</td></tr>
                <tr><td><code>&lt;h1&gt;</code> … <code>&lt;h6&gt;</code></td><td>titres, du plus grand au plus petit</td><td>oui</td></tr>
                <tr><td><code>&lt;p&gt;</code></td><td>un paragraphe</td><td>oui</td></tr>
                <tr><td><code>&lt;br&gt;</code></td><td>passer à la ligne</td><td><strong>non</strong></td></tr>
                <tr><td><code>&lt;strong&gt;</code> ou <code>&lt;b&gt;</code></td><td>important, en gras</td><td>oui</td></tr>
                <tr><td><code>&lt;em&gt;</code> ou <code>&lt;i&gt;</code></td><td>mis en relief, en italique</td><td>oui</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li>oublier la barre oblique de la fermante : tout ce qui suit change d'apparence ;</li>
                <li>fermer avec un autre nom que celui qu'on a ouvert (<code>&lt;h1&gt;…&lt;/h2&gt;</code>) ;</li>
                <li>croiser deux balises au lieu de les emboîter ;</li>
                <li>attendre qu'un retour à la ligne du fichier se voie à l'écran ;</li>
                <li>écrire <code>&lt;/br&gt;</code>, qui n'existe pas.</li>
              </ul>
            </div>`,
          libelleBouton: "Passer aux exercices →",
        },
      ],
    },

    /* =============================================================== APPLICATION */
    {
      id: "application",
      titre: "Application",
      minutes: 20,
      etoiles: 2,
      intention: "à toi d'écrire, la page se vérifie toute seule",
      etapes: [

        {
          id: "a1", type: "code",
          titre: "La fiche d'une recette",
          contenu: `
            <p>Écris, dans un fichier complet, la fiche d'une recette de ton choix.
            Elle doit contenir :</p>
            <ul>
              <li>un <code>&lt;title&gt;</code> renseigné ;</li>
              <li>un <code>&lt;h1&gt;</code> : le nom du plat ;</li>
              <li>un paragraphe de présentation ;</li>
              <li>un <code>&lt;h2&gt;</code> « Ingrédients » suivi d'un paragraphe ;</li>
              <li>un <code>&lt;h2&gt;</code> « Préparation » suivi d'un paragraphe.</li>
            </ul>
            <p>Le squelette est fourni : tout se passe dans le <code>&lt;body&gt;</code>.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "title", texteNonVide: true,
                message: "Le <title> est vide : donne le nom de ta recette." },
              { selecteur: "body h1", min: 1, max: 1, texteNonVide: true,
                message: "Il manque le <h1> avec le nom du plat.",
                messageMax: "Un seul <h1> par page." },
              { selecteur: "body h2", min: 2,
                message: "Il manque les deux sous-titres <h2>." },
              { selecteur: "body p", min: 3, tous: true, motsMin: 4,
                message: "Il faut trois paragraphes : présentation, ingrédients, préparation.",
                messageDetail: "Chaque paragraphe doit contenir au moins quatre mots." },
            ],
          },
          indices: [
            "Reprends la structure de l'étape « Donner un plan à ta page » : titre, paragraphe, puis les couples sous-titre / paragraphe.",
            "Le <code>&lt;title&gt;</code> se remplit dans le <code>&lt;head&gt;</code>, le reste dans le <code>&lt;body&gt;</code>.",
          ],
          felicitation: "Une fiche complète, écrite de A à Z. ✅",
        },

        {
          id: "a2", type: "code",
          titre: "Reproduire une page",
          contenu: `
            <p>Voici le rendu d'une page. Écris le HTML qui produit exactement cela,
            dans le <code>&lt;body&gt;</code> fourni.</p>
            <div class="encadre">
              <span class="chapo">La page à obtenir</span>
              <p style="font-size:1.6em;font-weight:700;margin:.3em 0">Pain perdu</p>
              <p style="margin:.4em 0">Une recette <strong>anti-gaspi</strong> : elle sauve le pain de la veille.</p>
              <p style="font-size:1.2em;font-weight:700;margin:.7em 0 .2em">Le secret</p>
              <p style="margin:.4em 0">Laisser tremper <em>longtemps</em>.<br>Vraiment longtemps.</p>
            </div>
            <p>Tout y est : un titre, un sous-titre, du gras, de l'italique et un retour
            à la ligne.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pain perdu</title>
  </head>
  <body>

  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "body h1", texteMotif: "^pain perdu$",
                message: "Il manque le titre principal « Pain perdu » en <h1>." },
              { selecteur: "body h2", texteMotif: "^le secret$",
                message: "Il manque le sous-titre « Le secret » en <h2>." },
              { selecteur: "p strong, p b", texteMotif: "^anti-gaspi$",
                message: "Les mots « anti-gaspi » doivent être en gras, avec <strong> ou <b>." },
              { selecteur: "p em, p i", texteMotif: "^longtemps$",
                message: "Le mot « longtemps » doit être en italique, avec <em> ou <i>." },
              { selecteur: "p br", min: 1,
                message: "Il manque le <br> entre « Laisser tremper longtemps. » et « Vraiment longtemps. »" },
              { selecteur: "body p", min: 2,
                message: "Il manque un paragraphe : il y en a deux dans le modèle." },
            ],
          },
          indices: [
            "Repère d'abord les quatre blocs : un titre, un paragraphe, un sous-titre, un paragraphe. Écris-les sans mise en valeur.",
            "Ajoute ensuite les balises à l'intérieur des paragraphes : une pour le gras, une pour l'italique.",
            "Les deux dernières phrases forment un seul paragraphe, coupé par une balise solitaire.",
          ],
          felicitation: "Tu sais passer d'un rendu au code qui le produit. ✅",
        },

        {
          id: "a3", type: "code",
          titre: "Chasse aux bugs",
          contenu: `
            <p>Cette page contient <strong>trois erreurs</strong> de nature différente.
            L'aperçu à droite te montre déjà que quelque chose cloche ; clique sur
            <strong>Valider</strong> pour savoir où.</p>
            <p>Corrige-les sans rien changer au texte.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Salade de fruits</title>
  </head>
  <body>
    <h1>Salade de fruits</h2>
    <p>Un dessert de dernière minute.
    <h2>Ingrédients</h2>
    <p>Une pomme, une banane, deux kiwis.</br>Un peu de jus de citron.</p>
  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "body h1", texteMotif: "^salade de fruits$",
                message: "Le <h1> doit contenir « Salade de fruits »." },
              { selecteur: "body h2", texteMotif: "^ingr",
                message: "Le <h2> « Ingrédients » doit être intact." },
              { selecteur: "body p", min: 2,
                message: "Il doit rester deux paragraphes." },
              { selecteur: "p br", min: 1,
                message: "Le retour à la ligne avant « Un peu de jus de citron » doit être conservé." },
            ],
          },
          indices: [
            "La première erreur est sur la ligne du titre : regarde bien le nom de la balise fermante.",
            "La deuxième : un paragraphe a été ouvert et jamais refermé. Le message de validation te donne son numéro de ligne.",
            "La troisième porte sur la balise solitaire de la dernière ligne : elle n'a pas à être refermée.",
          ],
          felicitation: "Trois erreurs trouvées et réparées. 🔧",
          apres: `<p>Retiens la méthode : on lit les messages du haut vers le bas, on
            corrige la <strong>première</strong> erreur, on revalide. Une balise mal
            fermée en provoque souvent plusieurs autres à sa suite.</p>`,
        },

        {
          id: "a4", type: "code",
          titre: "Laisser une note dans le code",
          contenu: `
            <p>On peut écrire dans un fichier HTML des remarques qui ne s'affichent
            pas : ce sont les <strong>commentaires</strong>.</p>
            <pre class="bloc-code"><code>&lt;!-- Penser à ajouter la photo ici --&gt;</code></pre>
            <p>Dans la page de gauche, ajoute :</p>
            <ul>
              <li>un commentaire avant le <code>&lt;h2&gt;</code>, pour te rappeler d'y mettre une photo plus tard ;</li>
              <li>un troisième paragraphe sous le <code>&lt;h2&gt;</code>.</li>
            </ul>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Gâteau au yaourt</title>
  </head>
  <body>
    <h1>Gâteau au yaourt</h1>
    <p>Le premier gâteau que tout le monde apprend à faire.</p>
    <h2>Préparation</h2>
    <p>Le pot de yaourt sert de verre doseur pour tout le reste.</p>
  </body>
</html>
` },
          ],
          validation: {
            contient: [
              { motif: "<!--[\\s\\S]{6,}?-->",
                message: "Il manque un commentaire HTML : il s'ouvre par <!-- et se ferme par --> et doit dire quelque chose." },
            ],
            elements: [
              { selecteur: "body p", min: 3,
                message: "Il manque un troisième paragraphe sous le <h2>." },
              { selecteur: "body h1", min: 1, message: "Ne supprime pas le titre." },
            ],
          },
          indices: [
            "Un commentaire s'écrit sur sa propre ligne, juste au-dessus de la balise qu'il concerne.",
            "Vérifie dans l'aperçu que ton commentaire ne s'affiche pas : c'est tout l'intérêt.",
          ],
          felicitation: "Commenter son code, c'est écrire pour soi-même dans un mois. ✅",
        },
      ],
    },

    /* ===================================================================== DÉFIS */
    {
      id: "defis",
      titre: "Défis",
      minutes: 10,
      etoiles: 3,
      intention: "pour ceux qui ont terminé avant les autres",
      etapes: [

        {
          id: "x1", type: "code",
          titre: "La carte du restaurant",
          contenu: `
            <p>Écris une page complète présentant la carte d'un restaurant, avec
            exactement cette structure :</p>
            <ul>
              <li>un <code>&lt;title&gt;</code> et un <code>&lt;h1&gt;</code> : le nom du restaurant ;</li>
              <li>un paragraphe de présentation ;</li>
              <li><strong>trois</strong> sous-titres <code>&lt;h2&gt;</code> : Entrées, Plats, Desserts ;</li>
              <li>sous chacun, un paragraphe où <strong>le nom du plat est en gras</strong>
                  et où <code>&lt;br&gt;</code> sépare les propositions.</li>
            </ul>
            <p>Les plats sont de ton invention.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "title", texteNonVide: true, message: "Le <title> est vide." },
              { selecteur: "body h1", min: 1, max: 1, texteNonVide: true,
                message: "Il manque le <h1> avec le nom du restaurant.",
                messageMax: "Un seul <h1> par page." },
              { selecteur: "body h2", min: 3,
                message: "Il faut trois sous-titres <h2> : Entrées, Plats, Desserts." },
              { selecteur: "body p", min: 4,
                message: "Il faut quatre paragraphes : la présentation, puis un par partie." },
              { selecteur: "p strong, p b", min: 3,
                message: "Chaque partie doit avoir au moins un nom de plat en gras : j'en compte moins de trois." },
              { selecteur: "p br", min: 3,
                message: "Utilise <br> pour séparer les propositions à l'intérieur de chaque paragraphe." },
            ],
          },
          indices: [
            "Écris d'abord les sept balises de structure (titre, présentation, et les trois couples sous-titre / paragraphe), puis enrichis les paragraphes.",
            "Dans un paragraphe, les noms de plats s'entourent de la balise du gras, et les lignes se coupent avec la balise solitaire.",
          ],
          felicitation: "Une page structurée de bout en bout, sans modèle. 🎉",
        },

        {
          id: "x2", type: "code",
          titre: "Chasse aux bugs, niveau 2",
          contenu: `
            <p>Quatre erreurs cette fois, et l'une d'elles concerne des balises
            <strong>croisées</strong>. Le texte affiché doit rester exactement le même.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Soupe à l'oignon<title>
  </head>
  <body>
    <h1>Soupe à l'oignon</h1>
    <p>Un classique <strong>d'hiver</p></strong>
    <h3>Ingrédients</h3>
    <p>Six oignons, un bouillon, du pain rassis et du fromage.<p>
  </body>
</html>
` },
          ],
          validation: {
            elements: [
              { selecteur: "head title", texteMotif: "oignon",
                message: "Le <title> de la page doit être correctement fermé et contenir « Soupe à l'oignon »." },
              { selecteur: "body h1", texteMotif: "^soupe . l'oignon$",
                message: "Le <h1> doit contenir « Soupe à l'oignon »." },
              { selecteur: "body h2", texteMotif: "^ingr",
                message: "Le sous-titre « Ingrédients » doit être un <h2> : on ne saute pas du niveau 1 au niveau 3." },
              { selecteur: "p strong, p b", texteMotif: "d'hiver",
                message: "Les mots « d'hiver » doivent rester en gras, à l'intérieur du paragraphe." },
              { selecteur: "body p", min: 2, tous: true, motsMin: 3,
                message: "Il doit rester deux paragraphes, correctement fermés." },
            ],
          },
          indices: [
            "Commence par le <code>&lt;head&gt;</code> : une balise y est ouverte deux fois au lieu d'être fermée.",
            "Dans le premier paragraphe, la fermeture du gras arrive <em>après</em> celle du paragraphe : la dernière balise ouverte doit être la première refermée.",
            "Le niveau du sous-titre ne suit pas le plan, et le dernier paragraphe n'a pas de vraie fermeture.",
          ],
          felicitation: "Balises croisées démêlées : c'est le réflexe le plus utile du HTML. 🔧",
        },

        {
          id: "x3", type: "code",
          titre: "Ta page, ton sujet",
          contenu: `
            <p>Dernier défi, libre : écris une page complète sur le sujet de ton choix
            — un sport, un groupe, un jeu, un animal, un plat. Le contenu ne sera pas
            jugé, la structure si.</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>un <code>&lt;title&gt;</code> renseigné,</li>
                <li>un seul <code>&lt;h1&gt;</code>,</li>
                <li>au moins deux <code>&lt;h2&gt;</code>,</li>
                <li>au moins trois paragraphes d'au moins huit mots,</li>
                <li>au moins un <code>&lt;br&gt;</code>,</li>
                <li>au moins un passage en gras et un passage en italique,</li>
                <li>au moins un commentaire.</li>
              </ul>
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
` },
          ],
          validation: {
            contient: [
              { motif: "<!--[\\s\\S]{6,}?-->",
                message: "Il manque un commentaire HTML dans ton fichier." },
            ],
            elements: [
              { selecteur: "title", motsMin: 1, message: "Le <title> est vide." },
              { selecteur: "body h1", min: 1, max: 1, texteNonVide: true,
                message: "Il faut un <h1>, et un seul.",
                messageMax: "Il faut un <h1>, et un seul." },
              { selecteur: "body h2", min: 2, tous: true, texteNonVide: true,
                message: "Il faut au moins deux <h2>." },
              { selecteur: "body p", min: 3, tous: true, motsMin: 8,
                message: "Il faut au moins trois paragraphes.",
                messageDetail: "Chaque paragraphe doit contenir au moins huit mots." },
              { selecteur: "body br", min: 1, message: "Il manque un <br>." },
              { selecteur: "body strong, body b", texteNonVide: true,
                message: "Il manque un passage en gras (<strong> ou <b>)." },
              { selecteur: "body em, body i", texteNonVide: true,
                message: "Il manque un passage en italique (<em> ou <i>)." },
            ],
          },
          indices: [
            "Reprends le squelette d'une des pages précédentes et remplace le texte : la structure est la même.",
            "Relis le cahier des charges point par point avant de valider, en cochant mentalement chaque ligne.",
          ],
          felicitation: "Tu écris du HTML sans modèle. La séance est bouclée. 🎉",
        },
      ],
    },
  ],
};

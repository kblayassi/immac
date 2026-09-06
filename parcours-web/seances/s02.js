/* Séance 2 — Listes, images et liens.
 *
 * Le fil : tout ce qu'il manque pour écrire une vraie recette. Les listes
 * (ingrédients, étapes), puis la notion d'attribut, qui ouvre les images et les
 * liens. La séance se termine sur un mini-site de deux pages reliées : c'est la
 * première fois que l'élève voit son lien fonctionner dans l'aperçu.
 *
 * Programme SNT, thème « Le Web » :
 *   · Hypertexte — « Insérer un lien dans une page Web » ;
 *   · URL — « Décomposer l'URL d'une page », « Reconnaître les pages sécurisées » ;
 *   · Notions juridiques — créditer la source d'une image.
 */

export default {
  id: "s02",
  numero: 2,
  titre: "Listes, images et liens",
  sousTitre: "De quoi écrire une vraie recette",
  palier: "Partie 1 — HTML : ce qu'il y a dans la page",

  accroche: `Une recette, ce n'est pas un bloc de texte : c'est une liste d'ingrédients,
    une suite d'étapes numérotées, une photo du résultat et un lien vers l'endroit d'où
    elle vient. Voilà exactement le programme de cette séance — et à la fin, tes pages
    seront reliées entre elles.`,

  objectifs: [
    "écrire une liste à puces et une liste numérotée,",
    "comprendre ce qu'est un <strong>attribut</strong> et savoir l'écrire,",
    "insérer une image, par un chemin ou par son adresse sur le web,",
    "créer un <strong>lien</strong> vers un autre site et vers une autre page du tien,",
    "lire une adresse web et y reconnaître le protocole, le site et le chemin.",
  ],

  motDeLaFin: `Tu sais écrire tout le contenu d'un site. Il reste à choisir de quoi il a
    l'air : couleurs, polices, encadrés, centrage. C'est le CSS, et c'est la séance
    suivante.`,

  parties: [
    /* ================================================================ DÉCOUVERTE */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 32,
      etoiles: 1,
      intention: "les trois briques qui manquaient à ta recette",
      etapes: [

        {
          id: "d1", type: "cours",
          titre: "Les listes à puces",
          contenu: `
            <p>Voici les ingrédients d'une pâte à crêpes, écrits comme tu sais déjà le
            faire — dans un paragraphe, avec des <code>&lt;br&gt;</code> :</p>

            <div class="encadre">
              <span class="chapo">Version paragraphe</span>
              3 œufs<br>250 g de farine<br>50 cl de lait<br>1 pincée de sel
            </div>

            <p>Ça fonctionne, mais le navigateur ne sait pas que c'est une liste : pour
            lui, c'est du texte coupé en morceaux. Il existe une manière de le lui
            <em>dire</em> :</p>

            <pre class="bloc-code"><code>&lt;ul&gt;
  &lt;li&gt;3 œufs&lt;/li&gt;
  &lt;li&gt;250 g de farine&lt;/li&gt;
  &lt;li&gt;50 cl de lait&lt;/li&gt;
  &lt;li&gt;1 pincée de sel&lt;/li&gt;
&lt;/ul&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Ce que ça donne à l'écran</span>
              <ul>
                <li>3 œufs</li>
                <li>250 g de farine</li>
                <li>50 cl de lait</li>
                <li>1 pincée de sel</li>
              </ul>
            </div>

            <p>Les puces et le décalage sont apparus tout seuls : tu ne les as demandés
            nulle part. Encore une fois, tu as décrit ce que la chose <strong>est</strong>,
            et le navigateur en a déduit l'apparence.</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Balise</th><th>Ce qu'elle dit</th></tr>
                <tr><td><code>&lt;ul&gt;</code></td><td><em>unordered list</em> : « ici commence une liste sans ordre »</td></tr>
                <tr><td><code>&lt;li&gt;</code></td><td><em>list item</em> : « ceci est un élément de la liste »</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le rangement compte</span>
              Chaque élément est un <code>&lt;li&gt;</code>, et tous les
              <code>&lt;li&gt;</code> sont <strong>à l'intérieur</strong> du
              <code>&lt;ul&gt;</code>. Du texte posé directement dans un
              <code>&lt;ul&gt;</code>, sans <code>&lt;li&gt;</code> autour, n'a pas de sens.
            </div>`,
        },

        {
          id: "d2", type: "code",
          titre: "La liste des ingrédients",
          contenu: `
            <p>Sous le sous-titre « Ingrédients », remplace le paragraphe par une vraie
            liste à puces de <strong>quatre ingrédients</strong>.</p>
            <p>Le paragraphe actuel doit disparaître : c'est lui qu'on remplace.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Pâte à crêpes</h1>
<h2>Ingrédients</h2>
<p>3 œufs, 250 g de farine, 50 cl de lait, 1 pincée de sel.</p>
` },
          ],
          validation: {
            elements: [
              { selecteur: "ul", min: 1,
                message: "Il manque la liste : une liste à puces s'ouvre par <ul>." },
              { selecteur: "ul li", min: 4,
                message: "Il faut quatre éléments dans la liste, chacun dans son <li>." },
              { selecteur: "ul li", tous: true, texteNonVide: true,
                messageDetail: "Un des <li> est vide : chaque ingrédient doit être écrit." },
              { selecteur: "p", min: 0, max: 0,
                messageMax: "Le paragraphe des ingrédients doit être remplacé par la liste, pas doublé." },
              { selecteur: "h2", min: 1, message: "Garde le sous-titre « Ingrédients »." },
            ],
          },
          indices: [
            "La liste entière s'ouvre et se ferme une seule fois ; à l'intérieur, chaque ingrédient a sa propre paire de balises.",
            "Les quatre ingrédients sont déjà écrits dans le paragraphe : reprends-les un par un.",
            "N'oublie pas de supprimer le paragraphe d'origine une fois la liste écrite.",
          ],
          felicitation: "Ta liste est une vraie liste, pas un texte qui y ressemble. ✅",
        },

        {
          id: "d3", type: "prediction",
          titre: "Quand l'ordre compte",
          contenu: `
            <p>Pour les <em>étapes</em> d'une recette, l'ordre compte : on ne fait pas
            cuire avant de mélanger. Il existe une autre liste pour cela,
            <code>&lt;ol&gt;</code> — <em>ordered list</em> — qui s'écrit exactement
            comme <code>&lt;ul&gt;</code>.</p>
            <p>Un élève l'a essayée en écrivant lui-même les numéros :</p>`,
          code: `<ol>
  <li>1. Mélanger la farine et les œufs</li>
  <li>2. Verser le lait</li>
</ol>`,
          question: "Qu'affiche le navigateur ?",
          options: [
            {
              texte: "1. Mélanger la farine et les œufs / 2. Verser le lait",
              explication: "Non : les numéros écrits à la main s'ajoutent à ceux que le navigateur produit tout seul.",
            },
            {
              texte: "1. 1. Mélanger la farine et les œufs / 2. 2. Verser le lait",
              correct: true,
              explication: "Oui. La numérotation est automatique : c'est justement à ça que sert <code>&lt;ol&gt;</code>. Écrire les numéros soi-même les fait apparaître en double.",
            },
            {
              texte: "Une liste à puces, comme avec <code>&lt;ul&gt;</code>",
              explication: "Non : <code>&lt;ol&gt;</code> numérote toujours. C'est la seule différence avec <code>&lt;ul&gt;</code>.",
            },
          ],
          apres: `<span class="chapo">L'avantage caché</span> Comme c'est le navigateur qui
            numérote, tu peux insérer une étape au milieu sans rien renuméroter. C'est
            exactement l'idée du HTML : tu décris, la machine calcule.`,
        },

        {
          id: "d4", type: "code",
          titre: "Les étapes de la préparation",
          contenu: `
            <p>Ajoute sous « Préparation » une liste <strong>numérotée</strong> de
            <strong>trois étapes</strong>, sans écrire les numéros toi-même.</p>
            <p>La liste des ingrédients, elle, reste une liste à puces.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Pâte à crêpes</h1>
<h2>Ingrédients</h2>
<ul>
  <li>3 œufs</li>
  <li>250 g de farine</li>
  <li>50 cl de lait</li>
  <li>1 pincée de sel</li>
</ul>
<h2>Préparation</h2>
` },
          ],
          validation: {
            elements: [
              { selecteur: "ul li", min: 4, message: "Ne touche pas à la liste des ingrédients." },
              { selecteur: "ol", min: 1,
                message: "Il manque la liste numérotée des étapes : elle s'ouvre par <ol>." },
              { selecteur: "ol li", min: 3,
                message: "Il faut trois étapes, chacune dans son <li>." },
              { selecteur: "ol li", tous: true, motsMin: 3,
                messageDetail: "Chaque étape doit être une vraie consigne d'au moins trois mots." },
            ],
            absent: [
              { motif: "<li>\\s*\\d+\\s*[.)]",
                message: "N'écris pas les numéros toi-même : <ol> s'en charge, sinon ils apparaissent en double." },
            ],
          },
          indices: [
            "La liste numérotée s'écrit comme celle des ingrédients ; seule la première lettre de la balise d'ouverture change.",
            "Trois étapes suffisent : mélanger, verser, laisser reposer.",
          ],
          felicitation: "Ingrédients à puces, étapes numérotées : c'est une vraie recette. ✅",
        },

        {
          id: "d5", type: "cours",
          titre: "Les attributs : de l'information dans la balise",
          contenu: `
            <p>Tu en as déjà écrit deux sans y prêter attention, dans le squelette de la
            séance 1 :</p>

            <pre class="bloc-code"><code>&lt;html lang="fr"&gt;
&lt;meta charset="utf-8"&gt;</code></pre>

            <p><code>lang</code> et <code>charset</code> ne sont pas des balises : ce sont
            des <strong>attributs</strong>. Un attribut se glisse dans la balise
            <em>ouvrante</em> et lui apporte une précision.</p>

            <pre class="bloc-code"><code>&lt;html lang="fr"&gt;
       ↑     ↑
     nom   valeur, entre guillemets</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Trois règles, toujours les mêmes</span>
              <ul>
                <li>l'attribut est <strong>dans la balise ouvrante</strong>, jamais dans la fermante ;</li>
                <li>un signe <code>=</code> sépare le nom de la valeur, sans espace autour ;</li>
                <li>la valeur est <strong>entre guillemets droits</strong> : <code>"</code>, pas <code>«</code> ni <code>”</code>.</li>
              </ul>
            </div>

            <p>Une balise peut en porter plusieurs, séparés par une espace. C'est ce
            mécanisme qui rend possibles les deux balises les plus utiles du web : celle
            de l'image et celle du lien.</p>`,
        },

        {
          id: "d6", type: "cours",
          titre: "L'image",
          contenu: `
            <p>Une image n'est pas écrite dans la page : elle est <em>rangée ailleurs</em>,
            et la page dit seulement où aller la chercher.</p>

            <pre class="bloc-code"><code>&lt;img src="crepes.svg" alt="Une pile de crêpes"&gt;</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Attribut</th><th>Ce qu'il donne</th></tr>
                <tr><td><code>src</code></td><td><em>source</em> : où trouver le fichier image</td></tr>
                <tr><td><code>alt</code></td><td><em>alternative</em> : ce que l'image montre, en mots</td></tr>
              </table>
            </div>

            <p>Comme <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code> <strong>ne se ferme
            pas</strong> : elle n'entoure rien, elle marque un emplacement.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le chemin</span>
              <code>src="crepes.svg"</code> veut dire « le fichier crepes.svg, à côté de
              cette page ». Pour remonter d'un dossier, on écrit
              <code>../</code> : <code>src="../images/crepes.svg"</code>. C'est un
              <strong>chemin relatif</strong> — relatif à la page qui le contient.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">alt n'est pas facultatif</span>
              C'est ce que lit à voix haute le lecteur d'écran d'une personne aveugle, et
              c'est ce qui s'affiche si l'image ne se charge pas. Une image sans
              <code>alt</code> est une image qui n'existe pas pour une partie des
              visiteurs.
            </div>`,
        },

        {
          id: "d7", type: "code",
          titre: "Insérer une image",
          contenu: `
            <p>Trois images sont rangées dans le dossier <code>files/SNT/Web/</code> du
            site. Depuis ta page, on y accède par le chemin
            <code>../files/SNT/Web/</code> :</p>
            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Fichier</th><th>Ce qu'on y voit</th></tr>
                <tr><td><code>crepes.svg</code></td><td>une pile de crêpes</td></tr>
                <tr><td><code>tarte-pommes.svg</code></td><td>une tarte aux pommes</td></tr>
                <tr><td><code>saladier.svg</code></td><td>un saladier, des œufs, de la farine</td></tr>
              </table>
            </div>
            <p>Ajoute l'image des crêpes juste sous le titre, avec un texte alternatif
            d'au moins trois mots.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Pâte à crêpes</h1>

<h2>Ingrédients</h2>
<ul>
  <li>3 œufs</li>
  <li>250 g de farine</li>
</ul>
` },
          ],
          validation: {
            elements: [
              { selecteur: "img", min: 1, max: 1,
                message: "Il manque la balise de l'image.",
                messageMax: "Une seule image suffit ici." },
              { selecteur: "img", attributs: [{ nom: "src", motif: "crepes\\.svg$" }],
                messageDetail: "L'attribut src doit désigner le fichier crepes.svg, avec le bon chemin." },
              { selecteur: "img", attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                messageDetail: "L'attribut alt doit décrire l'image en au moins trois mots." },
            ],
          },
          indices: [
            "La balise de l'image est solitaire : elle ne se ferme pas, et porte ses deux attributs dans la même paire de chevrons.",
            "Le chemin complet est celui du tableau, suivi du nom du fichier.",
            "Le texte alternatif décrit ce qu'on voit, pas ce que c'est : « photo » ne dit rien, « une pile de crêpes dorées » si.",
          ],
          felicitation: "Ta page contient une image. 🖼",
        },

        {
          id: "d8", type: "prediction",
          titre: "Quand l'image ne vient pas",
          contenu: `<p>Le nom du fichier a été mal orthographié : <code>crepe.svg</code>
            au lieu de <code>crepes.svg</code>. Le fichier n'existe donc pas.</p>`,
          code: `<img src="../files/SNT/Web/crepe.svg" alt="Une pile de crêpes dorées">`,
          question: "Que voit le visiteur ?",
          options: [
            {
              texte: "Rien du tout : l'emplacement reste vide.",
              explication: "Non, et heureusement : le visiteur saurait encore moins ce qu'il a manqué.",
            },
            {
              texte: "Une icône d'image cassée, et le texte « Une pile de crêpes dorées ».",
              correct: true,
              explication: "Oui. Le texte alternatif prend le relais dès que l'image manque : c'est son deuxième métier, après celui d'être lu à voix haute.",
            },
            {
              texte: "Un message d'erreur du navigateur, et la page s'arrête là.",
              explication: "Non : une page web ne s'arrête jamais sur une erreur. Elle affiche ce qu'elle peut et continue.",
            },
          ],
          apres: `<span class="chapo">À retenir</span> Une image qui ne s'affiche pas, c'est
            presque toujours une erreur dans le <code>src</code> : nom mal écrit, extension
            oubliée, ou chemin qui ne mène pas au bon dossier.`,
        },

        {
          id: "d9", type: "cours",
          titre: "Prendre une image sur le web",
          contenu: `
            <p>Une image n'a pas besoin d'être rangée à côté de ta page : le
            <code>src</code> accepte aussi une <strong>adresse complète</strong>, qui
            commence par <code>https://</code>.</p>

            <pre class="bloc-code"><code>&lt;img src="https://upload.wikimedia.org/wikipedia/commons/…/crepe.jpg"
     alt="Une crêpe dans une poêle"&gt;</code></pre>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Comment obtenir cette adresse</span>
              Clic droit sur l'image dans ton navigateur, puis
              <strong>« Copier l'adresse de l'image »</strong> (ou « Copier le lien de
              l'image »). Attention : ce n'est pas la même chose que l'adresse de la
              <em>page</em> où tu l'as trouvée.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Une image appartient à quelqu'un</span>
              Une photo trouvée en ligne n'est pas libre d'usage par défaut. Pour un
              travail scolaire, cherche des images libres — Wikimedia Commons, Pixabay —
              et <strong>cite toujours ta source</strong> par un lien, en bas de page.
              C'est la règle que tu appliqueras dans le projet.
            </div>

            <div class="encadre">
              <span class="chapo">Si l'image refuse de s'afficher</span>
              Certains sites interdisent qu'on affiche leurs images ailleurs que chez eux.
              L'adresse est bonne, l'image ne vient pas : prends-en simplement une autre,
              sur un site qui l'autorise.
            </div>`,
        },

        {
          id: "d10", type: "code",
          titre: "Une image par son adresse web",
          contenu: `
            <p>Trouve sur le web une image libre en rapport avec la cuisine, copie son
            adresse, et place-la dans la page.</p>
            <p>Son <code>src</code> doit commencer par <code>https://</code>, et son
            <code>alt</code> décrire ce qu'on y voit.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Si tu n'as pas internet en cours</span>
              Écris quand même une adresse complète plausible, terminée par
              <code>.jpg</code> ou <code>.png</code> : l'exercice porte sur la forme de
              l'adresse. L'aperçu affichera le texte alternatif, et c'est normal.
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Ma recette du moment</h1>
<p>Une photo pour donner envie :</p>

` },
          ],
          validation: {
            elements: [
              { selecteur: "img", min: 1,
                message: "Il manque la balise de l'image." },
              { selecteur: "img", attributs: [{ nom: "src", motif: "^https?://\\S+\\.(jpg|jpeg|png|gif|webp|svg)" }],
                messageDetail: "Le src doit être une adresse complète, commençant par https:// et se terminant par le nom d'un fichier image." },
              { selecteur: "img", attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+" }],
                messageDetail: "Le alt doit décrire l'image en deux mots au moins." },
            ],
          },
          indices: [
            "Clic droit sur l'image dans ton navigateur, puis « Copier l'adresse de l'image ».",
            "Une adresse d'image se termine par le nom d'un fichier, avec son extension : .jpg, .png, .svg…",
            "Colle l'adresse entre les guillemets du src, sans rien ajouter autour.",
          ],
          felicitation: "Tu sais aller chercher une image n'importe où sur le web. ✅",
        },

        {
          id: "d11", type: "cours",
          titre: "Le lien : la balise qui a fait le web",
          contenu: `
            <p>C'est <em>la</em> balise du web : celle qui relie les pages entre elles.
            Le « HT » de HTML, c'est <em>HyperText</em> — du texte qui renvoie ailleurs.</p>

            <pre class="bloc-code"><code>&lt;a href="https://www.marmiton.org"&gt;Voir la recette d'origine&lt;/a&gt;</code></pre>

            <div class="encadre">
              <span class="chapo">Ce que ça donne à l'écran</span>
              <span style="color:var(--violet-vif);text-decoration:underline">Voir la
              recette d'origine</span> — souligné, coloré, cliquable.
            </div>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Élément</th><th>Rôle</th></tr>
                <tr><td><code>&lt;a&gt;</code></td><td><em>anchor</em>, l'ancre : la balise du lien</td></tr>
                <tr><td><code>href</code></td><td><em>hypertext reference</em> : <strong>où</strong> le lien mène</td></tr>
                <tr><td>le texte entre les balises</td><td><strong>ce qu'on lit</strong> et sur quoi on clique</td></tr>
              </table>
            </div>

            <p>Le <code>href</code> accepte les deux formes que tu connais déjà pour les
            images :</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Écriture</th><th>Où ça mène</th></tr>
                <tr><td><code>href="https://www.marmiton.org"</code></td><td>vers un autre site</td></tr>
                <tr><td><code>href="recette.html"</code></td><td>vers une autre page du tien, rangée à côté</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le texte du lien doit se suffire à lui-même</span>
              « Cliquez ici » ne dit rien : lu à voix haute hors de son contexte, ou dans
              une liste de tous les liens de la page, il est inutilisable. On écrit
              <em>« la recette d'origine sur Marmiton »</em>.
            </div>`,
        },

        {
          id: "d12", type: "code",
          titre: "Créditer la source",
          contenu: `
            <p>Ajoute en bas de la page un paragraphe contenant un <strong>lien</strong>
            vers le site d'où vient la recette.</p>
            <ul>
              <li>l'adresse doit être complète, commençant par <code>https://</code> ;</li>
              <li>le texte du lien doit dire où il mène — pas « cliquez ici ».</li>
            </ul>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Pâte à crêpes</h1>
<h2>Ingrédients</h2>
<ul>
  <li>3 œufs</li>
  <li>250 g de farine</li>
</ul>

` },
          ],
          validation: {
            elements: [
              { selecteur: "p a", min: 1,
                message: "Il manque le lien, dans un paragraphe en bas de page." },
              { selecteur: "a", attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                messageDetail: "Le href doit contenir une adresse complète, commençant par https://" },
              { selecteur: "a", motsMin: 2,
                messageDetail: "Le texte du lien doit faire au moins deux mots et dire où il mène." },
            ],
            absent: [
              { motif: ">\\s*(cliquez? ici|ici|clic|lien)\\s*<", options: "i",
                message: "« Cliquez ici » ne dit pas où le lien mène : écris plutôt le nom du site ou de la page." },
            ],
          },
          indices: [
            "Le lien s'écrit dans un paragraphe, comme une phrase : « Recette trouvée sur … ».",
            "L'adresse se met dans l'attribut de la balise ouvrante ; le texte cliquable se met entre les deux balises.",
            "N'importe quel site de cuisine fait l'affaire, du moment que l'adresse est complète.",
          ],
          felicitation: "Ton premier lien. Clique dessus dans l'aperçu pour vérifier. 🔗",
          apres: `<p>Dans l'aperçu, un lien externe s'ouvre dans un nouvel onglet plutôt
            que de remplacer le parcours. Sur ton vrai site, il ouvrira la page à la
            place de la tienne.</p>`,
        },

        {
          id: "d13", type: "code",
          titre: "Relier deux pages",
          contenu: `
            <p>Voici <strong>deux fichiers</strong> : passe de l'un à l'autre par les
            onglets au-dessus de l'éditeur. Ils ne se connaissent pas encore.</p>
            <p>Ajoute dans <code>index.html</code> un lien vers <code>crepes.html</code>.
            Ensuite, <strong>clique dessus dans l'aperçu</strong> : tu changeras vraiment
            de page.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Deux fichiers côte à côte</span>
              Comme les deux pages sont dans le même dossier, l'adresse est simplement le
              nom du fichier : pas de <code>https://</code>, pas de chemin.
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Mon carnet de recettes</h1>
<p>Les recettes que je réussis à tous les coups.</p>
<ul>
  <li>Pâte à crêpes</li>
</ul>
` },
            { nom: "crepes.html", depart: `<h1>Pâte à crêpes</h1>
<p>Trois œufs, de la farine, du lait, et une heure de repos.</p>
` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "li a", min: 1,
                message: "Il manque le lien vers crepes.html, dans l'élément de la liste." },
              { fichier: "index.html", selecteur: "a",
                attributs: [{ nom: "href", motif: "^\\.?/?crepes\\.html$" }],
                messageDetail: "Le href doit être exactement le nom du fichier : crepes.html" },
              { fichier: "index.html", selecteur: "a", texteNonVide: true,
                messageDetail: "Le lien doit avoir un texte cliquable." },
              { fichier: "crepes.html", selecteur: "h1", texteNonVide: true,
                message: "Ne touche pas au fichier crepes.html pour l'instant." },
            ],
          },
          indices: [
            "Le lien remplace le texte « Pâte à crêpes » déjà présent dans l'élément de liste : on l'entoure, on ne le réécrit pas.",
            "L'adresse est le nom du fichier tel qu'il apparaît sur l'onglet, extension comprise.",
          ],
          felicitation: "Deux pages reliées : tu viens de faire un site. 🎉",
          apres: `<p>Clique sur ton lien dans l'aperçu, puis regarde le nom de fichier
            affiché au-dessus : il a changé. C'est exactement ce qui se passera chez le
            visiteur.</p>`,
        },

        {
          id: "d14", type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Balise</th><th>À quoi elle sert</th><th>Se ferme ?</th></tr>
                <tr><td><code>&lt;ul&gt;</code> + <code>&lt;li&gt;</code></td><td>liste à puces</td><td>oui</td></tr>
                <tr><td><code>&lt;ol&gt;</code> + <code>&lt;li&gt;</code></td><td>liste numérotée automatiquement</td><td>oui</td></tr>
                <tr><td><code>&lt;img src="…" alt="…"&gt;</code></td><td>une image</td><td><strong>non</strong></td></tr>
                <tr><td><code>&lt;a href="…"&gt;texte&lt;/a&gt;</code></td><td>un lien</td><td>oui</td></tr>
              </table>
            </div>

            <p>Et les trois formes d'adresse que tu sais écrire :</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Écriture</th><th>Sens</th></tr>
                <tr><td><code>crepes.html</code></td><td>un fichier rangé à côté de cette page</td></tr>
                <tr><td><code>../files/SNT/Web/crepes.svg</code></td><td>on remonte d'un dossier, puis on redescend</td></tr>
                <tr><td><code>https://www.marmiton.org/…</code></td><td>une adresse complète, ailleurs sur le web</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li>du texte posé dans un <code>&lt;ul&gt;</code> sans <code>&lt;li&gt;</code> autour ;</li>
                <li>écrire soi-même les numéros dans un <code>&lt;ol&gt;</code> ;</li>
                <li>fermer <code>&lt;img&gt;</code>, qui est solitaire ;</li>
                <li>oublier <code>alt</code>, ou y mettre « image » ;</li>
                <li>oublier les guillemets autour de la valeur d'un attribut ;</li>
                <li>écrire « cliquez ici » comme texte de lien.</li>
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
      intention: "assembler les trois briques dans de vraies pages",
      etapes: [

        {
          id: "a1", type: "qcm",
          titre: "Lire une adresse web",
          contenu: `
            <p>Une adresse — une <strong>URL</strong>, <em>Uniform Resource Locator</em> —
            se lit en trois morceaux :</p>
            <pre class="bloc-code"><code>https://www.marmiton.org/recettes/recette_crepes_12345.aspx
└──┬──┘ └───────┬──────┘ └────────────┬─────────────────┘
protocole   nom de domaine          chemin
                                (le fichier sur ce serveur)</code></pre>
            <p>Le <strong>protocole</strong> dit comment parler au serveur, le
            <strong>nom de domaine</strong> dit à quelle machine, le <strong>chemin</strong>
            dit quoi lui demander.</p>`,
          question: "Dans cette adresse, quelle information dit que la connexion est sécurisée ?",
          options: [
            {
              texte: "Le <code>www</code> au début du nom de domaine.",
              explication: "Non : <code>www</code> est un simple nom de machine, très courant mais facultatif. Il ne dit rien sur la sécurité.",
            },
            {
              texte: "Le <code>s</code> de <code>https</code>.",
              correct: true,
              explication: "Oui : <em>secure</em>. Tout ce qui circule entre ton navigateur et le site est chiffré. En <code>http</code> sans <code>s</code>, tout passe en clair et peut être lu en chemin.",
            },
            {
              texte: "Le <code>.org</code> à la fin du nom de domaine.",
              explication: "Non : c'est l'extension du domaine. Elle indique une catégorie de site, jamais un niveau de sécurité.",
            },
          ],
          apres: `<span class="chapo">Le cadenas</span> C'est exactement ce que représente le
            cadenas de la barre d'adresse. Il garantit que personne ne lit ni ne modifie ce
            qui circule — pas que le site est honnête.`,
        },

        {
          id: "a2", type: "code",
          titre: "La fiche de recette complète",
          contenu: `
            <p>Écris la page complète d'une recette de ton choix. Elle doit contenir :</p>
            <ul>
              <li>un <code>&lt;title&gt;</code> et un <code>&lt;h1&gt;</code> ;</li>
              <li>une <strong>image</strong> avec son texte alternatif ;</li>
              <li>un <code>&lt;h2&gt;</code> « Ingrédients » et une <strong>liste à puces</strong> d'au moins quatre ingrédients ;</li>
              <li>un <code>&lt;h2&gt;</code> « Préparation » et une <strong>liste numérotée</strong> d'au moins trois étapes ;</li>
              <li>un paragraphe final avec un <strong>lien</strong> vers la source.</li>
            </ul>
            <p>Tu peux réutiliser une des images du dossier <code>../files/SNT/Web/</code>
            ou une adresse trouvée sur le web.</p>`,
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
                message: "Il manque le <h1> avec le nom de la recette.",
                messageMax: "Un seul <h1> par page." },
              { selecteur: "body h2", min: 2,
                message: "Il manque les deux sous-titres « Ingrédients » et « Préparation »." },
              { selecteur: "body img", min: 1,
                message: "Il manque l'image." },
              { selecteur: "body img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                messageDetail: "L'image doit avoir un src renseigné et un alt d'au moins deux mots." },
              { selecteur: "body ul li", min: 4,
                message: "Il faut au moins quatre ingrédients, dans une liste à puces." },
              { selecteur: "body ol li", min: 3,
                message: "Il faut au moins trois étapes, dans une liste numérotée." },
              { selecteur: "body p a", min: 1,
                message: "Il manque le lien vers la source, dans un paragraphe." },
              { selecteur: "body a", attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                messageDetail: "Le lien vers la source doit être une adresse complète." },
            ],
          },
          indices: [
            "Assemble dans l'ordre : le titre, l'image, puis les deux couples sous-titre / liste, puis le paragraphe du lien.",
            "Les deux listes ne s'écrivent pas avec la même balise d'ouverture : l'une numérote, l'autre non.",
            "Relis le cahier des charges point par point avant de valider : il y a huit exigences.",
          ],
          felicitation: "Une page de recette complète, avec tout ce qu'il faut dedans. 🎉",
        },

        {
          id: "a3", type: "code",
          titre: "L'aller et le retour",
          contenu: `
            <p>Un visiteur arrivé sur la recette doit pouvoir revenir au sommaire :
            un lien qui ne va que dans un sens est un cul-de-sac.</p>
            <p>Le lien du sommaire vers la recette existe déjà. Ajoute :</p>
            <ul>
              <li>un <strong>deuxième</strong> lien dans le sommaire, vers <code>tarte.html</code> ;</li>
              <li>dans <strong>chacune</strong> des deux recettes, un lien de retour vers <code>index.html</code>.</li>
            </ul>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Mon carnet de recettes</h1>
<ul>
  <li><a href="crepes.html">Pâte à crêpes</a></li>
  <li>Tarte aux pommes</li>
</ul>
` },
            { nom: "crepes.html", depart: `<h1>Pâte à crêpes</h1>
<p>Trois œufs, de la farine, du lait, une heure de repos.</p>

` },
            { nom: "tarte.html", depart: `<h1>Tarte aux pommes</h1>
<p>Une pâte brisée, quatre pommes, du sucre et du beurre.</p>

` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "li a", min: 2,
                message: "Le sommaire doit contenir deux liens, un par recette." },
              { fichier: "index.html", selecteur: "a",
                attributs: [{ nom: "href", motif: "^tarte\\.html$" }],
                messageDetail: "Le second lien du sommaire doit mener à tarte.html" },
              { fichier: "crepes.html", selecteur: "a",
                attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour vers index.html dans crepes.html.",
                messageDetail: "Dans crepes.html, le lien de retour doit mener à index.html" },
              { fichier: "crepes.html", selecteur: "a", motsMin: 2,
                messageDetail: "Le lien de retour de crepes.html doit avoir un texte d'au moins deux mots." },
              { fichier: "tarte.html", selecteur: "a",
                attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour vers index.html dans tarte.html.",
                messageDetail: "Dans tarte.html, le lien de retour doit mener à index.html" },
              { fichier: "tarte.html", selecteur: "a", motsMin: 2,
                messageDetail: "Le lien de retour de tarte.html doit avoir un texte d'au moins deux mots." },
            ],
          },
          indices: [
            "Le deuxième lien du sommaire se construit exactement comme le premier : on entoure le texte déjà présent.",
            "Les deux liens de retour sont identiques d'un fichier à l'autre : même adresse, même texte.",
            "Teste dans l'aperçu : tu dois pouvoir faire sommaire → recette → sommaire → autre recette sans jamais rester bloqué.",
          ],
          felicitation: "Un site où l'on peut circuler dans les deux sens. 🔁",
        },

        {
          id: "a4", type: "code",
          titre: "Chasse aux bugs",
          contenu: `
            <p>Cette page contient <strong>quatre erreurs</strong>, toutes vues dans
            cette séance. Corrige-les sans changer le texte.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Gâteau au yaourt</h1>
<img src=../files/SNT/Web/saladier.svg alt="Un saladier et des œufs"></img>
<h2>Ingrédients</h2>
<ul>
  1 pot de yaourt
  <li>2 pots de sucre</li>
  <li>3 pots de farine</li>
</ul>
<p>Recette vue sur <a>le site de Marmiton</a>.</p>
` },
          ],
          validation: {
            elements: [
              { selecteur: "img", min: 1, max: 1,
                message: "Il doit rester une image, et une seule." },
              { selecteur: "img", attributs: [{ nom: "src", motif: "saladier\\.svg$" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                messageDetail: "L'image doit garder son chemin et son texte alternatif." },
              { selecteur: "ul li", min: 3,
                message: "La liste doit contenir trois ingrédients, chacun dans son <li>." },
              { selecteur: "ul li", texteMotif: "yaourt",
                messageDetail: "Le premier ingrédient, le pot de yaourt, doit lui aussi être dans un <li>." },
              { selecteur: "p a", attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                message: "Le lien n'a pas d'adresse : il lui manque son attribut href.",
                messageDetail: "Le href du lien doit contenir une adresse complète." },
            ],
          },
          indices: [
            "Ligne 2 : deux erreurs sur la même balise. Regarde d'abord la valeur du premier attribut, puis la fin de la ligne.",
            "Dans la liste, un ingrédient a été oublié en route : il est écrit, mais pas rangé.",
            "Un lien sans adresse n'est pas un lien : il lui manque l'attribut qui dit où il mène.",
          ],
          felicitation: "Quatre erreurs, quatre familles différentes. 🔧",
        },

        {
          id: "a5", type: "code",
          titre: "Rendre la page utilisable par tous",
          contenu: `
            <p>Cette page fonctionne, mais elle est inutilisable pour une personne
            aveugle, dont le lecteur d'écran ne prononce que le texte et les
            <code>alt</code>. Répare-la :</p>
            <ul>
              <li>les deux images doivent avoir un <code>alt</code> qui <strong>décrit ce qu'on voit</strong>, en trois mots au moins ;</li>
              <li>le texte du lien doit dire où il mène.</li>
            </ul>
            <p>Rien d'autre ne change.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Deux desserts faciles</h1>
<img src="../files/SNT/Web/crepes.svg" alt="">
<img src="../files/SNT/Web/tarte-pommes.svg" alt="image">
<p>Les recettes viennent de <a href="https://www.marmiton.org">ici</a>.</p>
` },
          ],
          validation: {
            elements: [
              { selecteur: "img", min: 2, message: "Garde les deux images." },
              { selecteur: "img", tous: true,
                attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                messageDetail: "Chacune des deux images doit avoir un alt d'au moins trois mots qui décrit ce qu'on y voit." },
              { selecteur: "a", motsMin: 2,
                message: "Le texte du lien doit faire au moins deux mots et dire où il mène." },
            ],
            absent: [
              { motif: "alt\\s*=\\s*\"\\s*(image|photo|img|dessin)?\\s*\"", options: "i",
                message: "Un alt vide, ou qui dit seulement « image », n'apporte rien : décris ce que l'image montre." },
              { motif: ">\\s*(ici|cliquez? ici|lien|clic)\\s*<", options: "i",
                message: "« Ici » ne dit pas où le lien mène : nomme le site." },
            ],
          },
          indices: [
            "Un bon texte alternatif répond à la question « qu'est-ce que je verrais si je voyais l'image ? ».",
            "Pour le lien, remplace le mot par le nom du site vers lequel il pointe.",
          ],
          felicitation: "Ta page parle maintenant à tout le monde. ♿",
          apres: `<p>Ce réflexe compte double : les moteurs de recherche lisent eux aussi
            les <code>alt</code> et les textes de lien pour comprendre ta page.</p>`,
        },
      ],
    },

    /* ===================================================================== DÉFIS */
    {
      id: "defis",
      titre: "Défis",
      minutes: 8,
      etoiles: 3,
      intention: "la répétition générale du projet",
      etapes: [

        {
          id: "x1", type: "code",
          titre: "Le carnet de recettes",
          contenu: `
            <p>Trois fichiers vides t'attendent. Construis un petit site complet :</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li><code>index.html</code> — un titre, un paragraphe d'accueil, une image,
                    et une <strong>liste de deux liens</strong> vers les deux recettes ;</li>
                <li><code>recette1.html</code> et <code>recette2.html</code> — chacune :
                    un titre, une image, une liste à puces d'ingrédients (3 au moins),
                    une liste numérotée d'étapes (3 au moins), un lien vers la source
                    et un <strong>lien de retour</strong> vers le sommaire.</li>
              </ul>
            </div>
            <p>C'est exactement la structure du projet final : autant s'y entraîner ici.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Mon carnet de recettes</h1>

` },
            { nom: "recette1.html", depart: `<h1>Première recette</h1>

` },
            { nom: "recette2.html", depart: `<h1>Deuxième recette</h1>

` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "p", motsMin: 5,
                message: "Il manque le paragraphe d'accueil du sommaire." },
              { fichier: "index.html", selecteur: "img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "Il manque l'image du sommaire, avec son texte alternatif." },
              { fichier: "index.html", selecteur: "ul li a", min: 2,
                message: "Le sommaire doit contenir une liste de deux liens vers les recettes." },
              { fichier: "index.html", selecteur: "a", attributs: [{ nom: "href", motif: "^recette1\\.html$" }],
                messageDetail: "Un des liens du sommaire doit mener à recette1.html" },
              { fichier: "index.html", selecteur: "a", attributs: [{ nom: "href", motif: "^recette2\\.html$" }],
                messageDetail: "L'autre lien du sommaire doit mener à recette2.html" },

              { fichier: "recette1.html", selecteur: "img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "Il manque l'image de la première recette, avec son alt." },
              { fichier: "recette1.html", selecteur: "ul li", min: 3,
                message: "La première recette doit lister au moins trois ingrédients." },
              { fichier: "recette1.html", selecteur: "ol li", min: 3,
                message: "La première recette doit détailler au moins trois étapes numérotées." },
              { fichier: "recette1.html", selecteur: "a", attributs: [{ nom: "href", motif: "^https?://" }],
                message: "Il manque le lien vers la source dans la première recette." },
              { fichier: "recette1.html", selecteur: "a", attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour au sommaire dans la première recette." },

              { fichier: "recette2.html", selecteur: "img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "Il manque l'image de la deuxième recette, avec son alt." },
              { fichier: "recette2.html", selecteur: "ul li", min: 3,
                message: "La deuxième recette doit lister au moins trois ingrédients." },
              { fichier: "recette2.html", selecteur: "ol li", min: 3,
                message: "La deuxième recette doit détailler au moins trois étapes numérotées." },
              { fichier: "recette2.html", selecteur: "a", attributs: [{ nom: "href", motif: "^https?://" }],
                message: "Il manque le lien vers la source dans la deuxième recette." },
              { fichier: "recette2.html", selecteur: "a", attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour au sommaire dans la deuxième recette." },
            ],
          },
          indices: [
            "Commence par une seule page, valide-la mentalement, puis recopie sa structure dans l'autre : les deux recettes sont jumelles.",
            "Un même fichier peut contenir plusieurs liens : celui de la source part vers l'extérieur, celui du retour reste dans ton site.",
            "Sers-toi de l'aperçu pour circuler : sommaire → recette 1 → sommaire → recette 2. Si tu ne peux pas revenir, il manque un lien.",
          ],
          felicitation: "Un site de trois pages, entièrement de toi. 🎉",
        },

        {
          id: "x2", type: "code",
          titre: "Chasse aux bugs, niveau 2",
          contenu: `
            <p>Deux pages, <strong>cinq erreurs</strong> réparties entre elles. Certaines
            sont dans le HTML, une empêche la navigation de fonctionner.</p>
            <p>Teste l'aperçu en cliquant : c'est le meilleur moyen de trouver la
            dernière.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<h1>Deux desserts</h1>
<ul>
  <li><a href="crepes.htm">Pâte à crêpes</a></li>
  <li><a href="tarte.html">Tarte aux pommes</a>
</ul>
` },
            { nom: "crepes.html", depart: `<h1>Pâte à crêpes</h1>
<ol>
  <li>1. Mélanger la farine et les œufs</li>
  <li>2. Verser le lait</li>
</ol>
<p><a href="index.html">Retour au sommaire</p></a>
` },
            { nom: "tarte.html", depart: `<h1>Tarte aux pommes</h1>
<img src="../files/SNT/Web/tarte-pommes.svg">
<p><a href="index.html">Retour au sommaire</a></p>
` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "ul li", min: 2,
                message: "Le sommaire doit garder ses deux éléments de liste." },
              { fichier: "index.html", selecteur: "a", attributs: [{ nom: "href", motif: "^crepes\\.html$" }],
                message: "Le lien vers la page des crêpes ne mène à aucun fichier existant : vérifie l'extension." },
              { fichier: "crepes.html", selecteur: "ol li", min: 2,
                message: "La liste numérotée doit garder ses deux étapes." },
              { fichier: "crepes.html", selecteur: "p a", attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Dans crepes.html, le lien de retour doit être correctement rangé dans son paragraphe." },
              { fichier: "tarte.html", selecteur: "img", attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "L'image de tarte.html n'a pas de texte alternatif." },
            ],
            absent: [
              { fichier: "crepes.html", motif: "<li>\\s*\\d+\\s*[.)]",
                message: "Les numéros écrits à la main font double emploi avec ceux de <ol>." },
            ],
          },
          indices: [
            "Commence par les messages de balises : deux fermetures manquent ou sont mal placées, l'une dans chaque fichier.",
            "Dans le sommaire, un lien ne mène nulle part : compare l'adresse écrite avec le nom exact de l'onglet.",
            "Il reste une numérotation en double et une image muette.",
          ],
          felicitation: "Cinq erreurs sur trois fichiers : tu sais déboguer un site entier. 🔧",
        },

        {
          id: "x3", type: "code",
          titre: "Ta page, ton sujet",
          contenu: `
            <p>Défi libre : une page sur ce que tu veux, à condition qu'elle contienne
            tout ce que la séance a apporté.</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>le squelette complet, avec un <code>&lt;title&gt;</code> renseigné,</li>
                <li>un seul <code>&lt;h1&gt;</code> et au moins deux <code>&lt;h2&gt;</code>,</li>
                <li>au moins une image avec un <code>alt</code> de trois mots,</li>
                <li>une liste à puces d'au moins trois éléments,</li>
                <li>une liste numérotée d'au moins trois éléments,</li>
                <li>au moins deux liens vers l'extérieur, avec des textes différents.</li>
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
            elements: [
              { selecteur: "title", texteNonVide: true, message: "Le <title> est vide." },
              { selecteur: "body h1", min: 1, max: 1, texteNonVide: true,
                message: "Il faut un <h1>, et un seul.", messageMax: "Il faut un <h1>, et un seul." },
              { selecteur: "body h2", min: 2, message: "Il faut au moins deux <h2>." },
              { selecteur: "body img", min: 1, message: "Il manque l'image." },
              { selecteur: "body img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                messageDetail: "L'image doit avoir un src renseigné et un alt d'au moins trois mots." },
              { selecteur: "body ul li", min: 3, message: "Il manque la liste à puces de trois éléments." },
              { selecteur: "body ol li", min: 3, message: "Il manque la liste numérotée de trois éléments." },
              { selecteur: "body a", min: 2, tous: true,
                attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                message: "Il faut au moins deux liens vers l'extérieur.",
                messageDetail: "Chaque lien doit porter une adresse complète, commençant par https://" },
              { selecteur: "body a", tous: true, motsMin: 2,
                messageDetail: "Chaque lien doit avoir un texte d'au moins deux mots, qui dit où il mène." },
            ],
          },
          indices: [
            "Reprends la structure de la fiche de recette et remplace le sujet : listes, image et liens fonctionnent pareil quel que soit le contenu.",
            "Relis le cahier des charges ligne par ligne avant de valider : il y a huit exigences, et l'oubli le plus fréquent est le second lien.",
          ],
          felicitation: "Séance 2 bouclée : tu sais écrire tout le contenu d'un site. 🎉",
        },
      ],
    },
  ],
};

/* Séance 3 — CSS : le fond et la forme.
 *
 * Le fil : le même HTML, deux habillages. C'est la capacité attendue du
 * programme — « distinguer ce qui relève du contenu d'une page et de son style
 * de présentation » — et elle s'installe en une démonstration, pas en un discours.
 *
 * Ensuite, une propriété par étape : couleur, police, alignement, boîte, classe.
 * L'atelier a deux onglets ; la validation regarde le style REELLEMENT appliqué,
 * cascade et héritage compris : centrer via body ou via h1, les deux passent.
 */

export default {
  id: "s03",
  numero: 3,
  titre: "CSS : le fond et la forme",
  sousTitre: "Choisir de quoi ta page a l'air",
  palier: "Partie 2 — CSS : à quoi elle ressemble",

  accroche: `Tes pages disent les bonnes choses, mais elles se ressemblent toutes : noir
    sur blanc, Times New Roman, tout à gauche. C'est normal — tu n'as jamais rien demandé.
    Le CSS, c'est le langage dans lequel on le demande. Une deuxième langue, un deuxième
    fichier, et la même page devient méconnaissable.`,

  objectifs: [
    "expliquer la différence entre le <strong>contenu</strong> d'une page et sa <strong>présentation</strong>,",
    "relier une feuille de style à une page et écrire une règle CSS,",
    "changer les couleurs, la police, la taille et l'alignement,",
    "encadrer un bloc avec une bordure et des marges,",
    "viser précisément un élément grâce à l'attribut <code>class</code>.",
  ],

  motDeLaFin: `Tu sais écrire le contenu et l'habillage. Il ne reste qu'à faire les deux
    en même temps, sur un vrai sujet : c'est le projet, et il dure deux heures.`,

  parties: [
    /* ================================================================ DÉCOUVERTE */
    {
      id: "decouverte",
      titre: "Découverte",
      minutes: 35,
      etoiles: 1,
      intention: "une propriété à la fois, et l'aperçu qui change à chaque fois",
      etapes: [

        {
          id: "d1", type: "cours",
          titre: "Le fond et la forme",
          contenu: `
            <p>Voici un bout de page. Il ne changera pas de toute cette étape :</p>

            <pre class="bloc-code"><code>&lt;h1&gt;Pâte à crêpes&lt;/h1&gt;
&lt;p&gt;Prête en cinq minutes, à condition de la laisser reposer une heure.&lt;/p&gt;</code></pre>

            <p>Voilà ce qu'il donne sans rien demander, puis avec deux habillages
            différents :</p>

            <div class="encadre">
              <span class="chapo">Sans habillage</span>
              <div style="background:#ffffff;color:#000;font-family:Times,serif;padding:12px;border-radius:6px">
                <div style="font-size:1.8em;font-weight:700;margin-bottom:.3em">Pâte à crêpes</div>
                <div>Prête en cinq minutes, à condition de la laisser reposer une heure.</div>
              </div>
            </div>

            <div class="encadre">
              <span class="chapo">Habillage numéro 1</span>
              <div style="background:#fdf3e3;color:#5b3a1a;font-family:Georgia,serif;padding:18px;border-radius:6px;text-align:center">
                <div style="font-size:1.8em;font-weight:700;margin-bottom:.3em">Pâte à crêpes</div>
                <div style="font-style:italic">Prête en cinq minutes, à condition de la laisser reposer une heure.</div>
              </div>
            </div>

            <div class="encadre">
              <span class="chapo">Habillage numéro 2</span>
              <div style="background:#12232e;color:#d7e6ef;font-family:'Trebuchet MS',sans-serif;padding:18px;border-radius:6px">
                <div style="font-size:1.5em;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-bottom:3px solid #4ad9a0;padding-bottom:.2em;margin-bottom:.4em">Pâte à crêpes</div>
                <div>Prête en cinq minutes, à condition de la laisser reposer une heure.</div>
              </div>
            </div>

            <p>Trois apparences, <strong>un seul et même HTML</strong>. Rien n'a bougé
            dans le texte, ni dans les balises.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ce qu'il faut retenir</span>
              Le HTML dit <strong>ce que les choses sont</strong> — un titre, un
              paragraphe, une liste. Le CSS dit <strong>de quoi elles ont l'air</strong> —
              en brun, centré, en Georgia. Les deux sont séparés, et c'est ce qui permet
              de refaire toute l'apparence d'un site sans toucher une ligne de son contenu.
            </div>

            <p><em>CSS</em> : <em>Cascading Style Sheets</em>, « feuilles de style en
            cascade ». Feuille, parce que c'est un fichier à part.</p>`,
        },

        {
          id: "d2", type: "cours",
          titre: "Une feuille de style, et une règle",
          contenu: `
            <p>Le CSS ne s'écrit pas dans la page : il vit dans son propre fichier,
            en général <code>style.css</code>. La page indique où le trouver, par une
            balise placée dans le <code>&lt;head&gt;</code> :</p>

            <pre class="bloc-code"><code>&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;title&gt;Pâte à crêpes&lt;/title&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Attribut</th><th>Ce qu'il dit</th></tr>
                <tr><td><code>rel="stylesheet"</code></td><td>« le fichier que je désigne est une feuille de style »</td></tr>
                <tr><td><code>href="style.css"</code></td><td>« il s'appelle style.css et il est rangé à côté »</td></tr>
              </table>
            </div>

            <p>Comme <code>&lt;img&gt;</code> et <code>&lt;br&gt;</code>,
            <code>&lt;link&gt;</code> est solitaire : elle ne se ferme pas.</p>

            <p>Dans ce fichier, on écrit des <strong>règles</strong>. Une règle a
            toujours la même forme :</p>

            <pre class="bloc-code"><code>h1 {
  color: brown;
}
↑   ↑      ↑
│   │      └── la valeur
│   └───────── la propriété
└───────────── le sélecteur : à qui la règle s'adresse</code></pre>

            <p>Celle-ci se lit : « <em>tous les h1 de la page seront bruns</em> ». Une
            règle peut porter plusieurs déclarations, chacune terminée par un
            point-virgule :</p>

            <pre class="bloc-code"><code>h1 {
  color: brown;
  text-align: center;
}</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">La ponctuation du CSS</span>
              <ul>
                <li>des <strong>accolades</strong> autour des déclarations, et elles se referment ;</li>
                <li><strong>deux points</strong> entre la propriété et sa valeur ;</li>
                <li>un <strong>point-virgule</strong> après chaque déclaration ;</li>
                <li>pas de guillemets autour des valeurs, contrairement au HTML.</li>
              </ul>
            </div>`,
        },

        {
          id: "d3", type: "code",
          titre: "Ta première règle",
          contenu: `
            <p>Deux onglets, cette fois : <code>index.html</code> et
            <code>style.css</code>. Le CSS contient déjà une règle — et pourtant
            l'aperçu ne montre rien de spécial.</p>
            <p>C'est normal : <strong>la page ne sait pas que ce fichier existe</strong>.
            Ajoute la balise qui les relie, dans le <code>&lt;head&gt;</code>, puis
            regarde l'aperçu.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `h1 {
  color: brown;
}
` },
          ],
          validation: {
            elements: [
              { selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "Il manque la balise <link> qui relie la page à style.css, dans le <head>." },
            ],
            styles: [
              { selecteur: "h1", propriete: "color", valeur: "brown",
                message: "La règle du fichier CSS ne doit pas être modifiée : le titre reste brun." },
            ],
          },
          indices: [
            "La balise se place dans le <code>&lt;head&gt;</code>, sous le <code>&lt;title&gt;</code>.",
            "Elle porte deux attributs : l'un annonce qu'il s'agit d'une feuille de style, l'autre donne le nom du fichier tel qu'il apparaît sur l'onglet.",
            "Comme l'image, cette balise est solitaire : pas de fermeture.",
          ],
          felicitation: "Le titre est devenu brun : tes deux fichiers se parlent. 🎨",
        },

        {
          id: "d4", type: "prediction",
          titre: "À qui s'adresse une règle ?",
          contenu: `<p>Voici une page et sa feuille de style.</p>`,
          code: `<!-- index.html -->
<h1>Pâte à crêpes</h1>
<p>Prête en cinq minutes.</p>
<p>À laisser reposer une heure.</p>

/* style.css */
p {
  color: red;
}`,
          question: "Qu'est-ce qui devient rouge ?",
          options: [
            {
              texte: "Tout le texte de la page, titre compris.",
              explication: "Non : le sélecteur nomme précisément à qui la règle s'adresse. Il a écrit <code>p</code>, pas « tout ».",
            },
            {
              texte: "Le premier paragraphe seulement.",
              explication: "Non : une règle ne s'applique pas au premier venu, mais à <em>tous</em> les éléments que son sélecteur désigne.",
            },
            {
              texte: "Les deux paragraphes, mais pas le titre.",
              correct: true,
              explication: "Exactement. Le sélecteur <code>p</code> désigne tous les paragraphes de la page, et rien d'autre. Le titre n'est pas un paragraphe : il n'est pas concerné.",
            },
          ],
          apres: `<span class="chapo">La conséquence pratique</span> Une règle écrite une
            fois s'applique à cent éléments. C'est ce qui rend le CSS puissant — et c'est
            aussi pourquoi une erreur de sélecteur ne produit aucun effet visible, sans
            aucun message d'erreur.`,
        },

        {
          id: "d5", type: "code",
          titre: "La couleur du fond",
          contenu: `
            <p>Deux propriétés voisines, à ne pas confondre :</p>
            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Propriété</th><th>Ce qu'elle colore</th></tr>
                <tr><td><code>color</code></td><td>le <strong>texte</strong></td></tr>
                <tr><td><code>background-color</code></td><td>l'<strong>arrière-plan</strong></td></tr>
              </table>
            </div>
            <p>Ajoute au fichier CSS une règle qui donne à <strong>toute la page</strong>
            — c'est-à-dire au <code>body</code> — un arrière-plan de couleur
            <code>beige</code>.</p>
            <p>La règle du titre reste telle quelle.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `h1 {
  color: brown;
}

` },
          ],
          validation: {
            styles: [
              { selecteur: "h1", propriete: "color", valeur: "brown",
                message: "Ne supprime pas la règle qui colore le titre." },
              { selecteur: "body", propriete: "background-color", valeur: "beige",
                message: "Le fond de la page n'est pas beige : il manque une règle qui vise body avec background-color." },
            ],
          },
          indices: [
            "La nouvelle règle s'écrit sous la première, avec la même forme : un sélecteur, une accolade, une déclaration, une accolade fermante.",
            "Le sélecteur est le nom de la balise qui contient tout ce qu'on voit.",
            "Attention à ne pas confondre la propriété du texte et celle de l'arrière-plan.",
          ],
          felicitation: "Toute la page a changé de fond avec deux lignes. ✅",
        },

        {
          id: "d6", type: "cours",
          titre: "Nommer une couleur",
          contenu: `
            <p>Il existe environ 140 couleurs qui portent un nom :
            <code>red</code>, <code>brown</code>, <code>beige</code>,
            <code>tomato</code>, <code>steelblue</code>… Pratique, mais très limité.</p>

            <p>Pour tout le reste, on donne la <strong>recette</strong> de la couleur :
            combien de rouge, de vert et de bleu, chacun de 0 à 255, écrits en
            <strong>hexadécimal</strong> — la base 16, où l'on compte
            0 1 2 3 4 5 6 7 8 9 A B C D E F.</p>

            <pre class="bloc-code"><code>#FDF3E3
 └┬┘└┬┘└┬┘
  R  V  B</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Code</th><th>Recette</th><th>Couleur</th></tr>
                <tr><td><code>#FF0000</code></td><td>rouge au maximum, rien d'autre</td><td><span style="display:inline-block;width:2.4em;height:1em;background:#FF0000;border-radius:3px"></span></td></tr>
                <tr><td><code>#000000</code></td><td>rien du tout</td><td><span style="display:inline-block;width:2.4em;height:1em;background:#000;border-radius:3px"></span></td></tr>
                <tr><td><code>#FFFFFF</code></td><td>tout au maximum</td><td><span style="display:inline-block;width:2.4em;height:1em;background:#fff;border:1px solid #999;border-radius:3px"></span></td></tr>
                <tr><td><code>#FDF3E3</code></td><td>beaucoup de tout, un peu moins de bleu</td><td><span style="display:inline-block;width:2.4em;height:1em;background:#FDF3E3;border:1px solid #ddd;border-radius:3px"></span></td></tr>
                <tr><td><code>#5B3A1A</code></td><td>surtout du rouge, peu de vert, presque pas de bleu</td><td><span style="display:inline-block;width:2.4em;height:1em;background:#5B3A1A;border-radius:3px"></span></td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Où trouver un code</span>
              N'importe quel « sélecteur de couleur » en ligne en donne un, et les
              logiciels de dessin aussi. On peut écrire les lettres en majuscules ou en
              minuscules, cela ne change rien.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le croisillon n'est pas décoratif</span>
              <code>color: FDF3E3</code> sans <code>#</code> ne veut rien dire : le
              navigateur ignore la déclaration, sans le signaler.
            </div>`,
        },

        {
          id: "d7", type: "code",
          titre: "Une couleur sur mesure",
          contenu: `
            <p>Reprends la feuille de style et remplace les deux couleurs par des codes
            hexadécimaux :</p>
            <ul>
              <li>le fond de la page : <code>#FDF3E3</code> ;</li>
              <li>le texte du titre : <code>#5B3A1A</code>.</li>
            </ul>
            <p>Ajoute aussi une règle qui donne aux paragraphes la couleur
            <code>#3A2E22</code>.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `h1 {
  color: brown;
}

body {
  background-color: beige;
}
` },
          ],
          validation: {
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "^#fdf3e3$",
                message: "Le fond de la page doit valoir #FDF3E3." },
              { selecteur: "h1", propriete: "color", motif: "^#5b3a1a$",
                message: "Le titre doit valoir #5B3A1A." },
              { selecteur: "p", propriete: "color", motif: "^#3a2e22$",
                message: "Il manque la règle qui donne aux paragraphes la couleur #3A2E22." },
            ],
          },
          indices: [
            "Les deux premières couleurs sont à remplacer sur place : le nom disparaît, le code prend sa place.",
            "La troisième demande une nouvelle règle, sur le même modèle que les deux autres.",
            "Vérifie que chaque code commence bien par un croisillon et compte six caractères.",
          ],
          felicitation: "Tu choisis tes couleurs au lieu de piocher dans une liste. 🎨",
        },

        {
          id: "d8", type: "cours",
          titre: "La police et la taille",
          contenu: `
            <p>Deux propriétés, et une précaution.</p>

            <pre class="bloc-code"><code>body {
  font-family: Georgia, serif;
  font-size: 18px;
}</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Propriété</th><th>Ce qu'elle règle</th></tr>
                <tr><td><code>font-family</code></td><td>la <strong>police</strong> de caractères</td></tr>
                <tr><td><code>font-size</code></td><td>la <strong>taille</strong>, en pixels (<code>px</code>)</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Pourquoi deux noms séparés par une virgule ?</span>
              Parce que la police doit être installée sur l'ordinateur du <em>visiteur</em>,
              pas sur le tien. On écrit donc une liste de secours : « Georgia, et si tu ne
              l'as pas, n'importe quelle police à empattements ». Les trois familles de
              secours sont <code>serif</code>, <code>sans-serif</code> et
              <code>monospace</code>.
            </div>

            <div class="encadre">
              <span class="chapo">Les trois familles</span>
              <p style="font-family:Georgia,serif;margin:.3em 0"><strong>serif</strong> — avec empattements, comme dans les livres</p>
              <p style="font-family:Helvetica,Arial,sans-serif;margin:.3em 0"><strong>sans-serif</strong> — sans empattements, comme à l'écran</p>
              <p style="font-family:'Courier New',monospace;margin:.3em 0"><strong>monospace</strong> — toutes les lettres de même largeur, comme du code</p>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le grand intérêt de body</span>
              Une police posée sur <code>body</code> se transmet à tout ce qu'il contient :
              titres, paragraphes, listes. On appelle cela l'<strong>héritage</strong>, et
              cela évite d'écrire la même chose dix fois.
            </div>`,
        },

        {
          id: "d9", type: "code",
          titre: "Habiller toute la page d'un coup",
          contenu: `
            <p>Sur le <code>body</code>, ajoute :</p>
            <ul>
              <li>une police <strong>sans empattements</strong>, avec sa famille de secours ;</li>
              <li>une taille de texte de <code>18px</code>.</li>
            </ul>
            <p>Une seule règle suffit : tout le reste en hérite.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure.</p>
    <p>Elle se garde deux jours au réfrigérateur.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: #FDF3E3;
}

h1 {
  color: #5B3A1A;
}
` },
          ],
          validation: {
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "fdf3e3",
                message: "Garde le fond #FDF3E3." },
              { selecteur: "body", propriete: "font-family", motif: "sans-serif",
                message: "Il manque la police sur body : une police sans empattements, suivie de sans-serif en secours." },
              { selecteur: "p", propriete: "font-family", motif: "sans-serif",
                message: "Les paragraphes doivent hériter de la police : pose-la sur body, pas ailleurs." },
              { selecteur: "body", propriete: "font-size", valeur: "18px",
                message: "Il manque la taille de 18px sur body." },
            ],
          },
          indices: [
            "Les deux déclarations s'ajoutent dans la règle body qui existe déjà, sous celle du fond.",
            "Une police s'écrit sous la forme « un nom, puis une famille de secours », séparés par une virgule. Helvetica, Arial ou Verdana font l'affaire.",
            "La taille s'écrit avec son unité collée au nombre, sans espace.",
          ],
          felicitation: "Une règle, et toute la page a changé d'allure. ✅",
          apres: `<p>C'est l'héritage à l'œuvre : tu n'as rien écrit pour les paragraphes,
            et ils ont pourtant changé. Les propriétés du texte se transmettent ; celles de
            la boîte — bordures, marges — ne se transmettent pas.</p>`,
        },

        {
          id: "d10", type: "cours",
          titre: "Aligner et mettre en forme",
          contenu: `
            <p>Quatre propriétés qui reprennent, en CSS, ce que tu faisais en HTML avec
            <code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code> — à ceci près qu'elles
            s'appliquent à des éléments entiers, pas à des mots.</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Propriété</th><th>Valeurs utiles</th><th>Effet</th></tr>
                <tr><td><code>text-align</code></td><td><code>left</code> · <code>center</code> · <code>right</code> · <code>justify</code></td><td>l'alignement</td></tr>
                <tr><td><code>font-weight</code></td><td><code>normal</code> · <code>bold</code></td><td>la graisse</td></tr>
                <tr><td><code>font-style</code></td><td><code>normal</code> · <code>italic</code></td><td>l'italique</td></tr>
                <tr><td><code>text-decoration</code></td><td><code>none</code> · <code>underline</code></td><td>le soulignement</td></tr>
              </table>
            </div>

            <pre class="bloc-code"><code>h1 {
  text-align: center;
  text-decoration: underline;
}</code></pre>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Deux façons, deux intentions</span>
              Mettre un mot en gras <em>parce qu'il est important</em>, c'est
              <code>&lt;strong&gt;</code> en HTML. Mettre un titre en gras <em>parce que
              c'est joli</em>, c'est <code>font-weight</code> en CSS. La question à se
              poser est toujours la même : est-ce que je dis ce que la chose est, ou de
              quoi elle a l'air ?
            </div>`,
        },

        {
          id: "d11", type: "code",
          titre: "Centrer le titre",
          contenu: `
            <p>Ajoute à la feuille de style de quoi obtenir ceci :</p>
            <ul>
              <li>le titre <strong>centré</strong> ;</li>
              <li>le deuxième paragraphe, qui porte déjà la classe <code>note</code>, en
                  <strong>italique</strong> — vise-le avec le sélecteur
                  <code>.note</code>, on y revient plus loin.</li>
            </ul>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure.</p>
    <p class="note">Se garde deux jours au réfrigérateur.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: #FDF3E3;
  font-family: Helvetica, sans-serif;
}

h1 {
  color: #5B3A1A;
}
` },
          ],
          validation: {
            styles: [
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Le titre n'est pas centré : il manque text-align." },
              { selecteur: ".note", propriete: "font-style", valeur: "italic",
                message: "Le paragraphe de classe note n'est pas en italique : il manque font-style." },
            ],
            elements: [
              { selecteur: "p.note", min: 1,
                message: "Ne retire pas la classe note du deuxième paragraphe." },
            ],
          },
          indices: [
            "Le centrage s'ajoute dans la règle du titre qui existe déjà.",
            "Pour l'italique, il faut une nouvelle règle dont le sélecteur commence par un point suivi du nom de la classe.",
          ],
          felicitation: "Centré et nuancé, sans toucher au HTML. ✅",
        },

        {
          id: "d12", type: "cours",
          titre: "Tout est une boîte",
          contenu: `
            <p>Chaque élément d'une page occupe un rectangle, et ce rectangle a trois
            épaisseurs autour de son contenu :</p>

            <div class="encadre">
              <div style="border:2px dashed #b48ead;padding:14px;border-radius:6px">
                <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.75;margin-bottom:6px">margin — l'air autour de la boîte</div>
                <div style="border:3px solid #6f4fc0;border-radius:4px;padding:14px">
                  <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.75;margin-bottom:6px">border — le trait qui l'encadre</div>
                  <div style="border:2px dashed #35a37a;padding:14px;border-radius:4px">
                    <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;opacity:.75;margin-bottom:6px">padding — l'air à l'intérieur</div>
                    <div style="background:rgba(128,128,128,.18);padding:10px;text-align:center;border-radius:3px">le contenu</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Propriété</th><th>Exemple</th><th>Ce que ça fait</th></tr>
                <tr><td><code>border</code></td><td><code>border: 2px solid #5B3A1A;</code></td><td>épaisseur, style, couleur du trait</td></tr>
                <tr><td><code>padding</code></td><td><code>padding: 15px;</code></td><td>écarte le contenu du trait</td></tr>
                <tr><td><code>margin</code></td><td><code>margin: 20px;</code></td><td>écarte la boîte de ses voisines</td></tr>
                <tr><td><code>border-radius</code></td><td><code>border-radius: 8px;</code></td><td>arrondit les coins</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le moyen mnémotechnique</span>
              <code>padding</code>, c'est le rembourrage <em>dedans</em> ;
              <code>margin</code>, c'est la marge <em>dehors</em>. Entre les deux, le
              trait. Si un encadré paraît serré, c'est presque toujours qu'il manque du
              <code>padding</code>.
            </div>`,
        },

        {
          id: "d13", type: "code",
          titre: "Encadrer les ingrédients",
          contenu: `
            <p>Donne à la liste des ingrédients l'allure d'un encadré :</p>
            <ul>
              <li>une <strong>bordure</strong> de 2 pixels, en trait plein, de couleur <code>#5B3A1A</code> ;</li>
              <li>15 pixels de <strong>marge intérieure</strong> ;</li>
              <li>des coins arrondis de 8 pixels.</li>
            </ul>
            <p>Le sélecteur vise la liste entière, pas ses éléments.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <h2>Ingrédients</h2>
    <ul>
      <li>3 œufs</li>
      <li>250 g de farine</li>
      <li>50 cl de lait</li>
    </ul>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: #FDF3E3;
  font-family: Helvetica, sans-serif;
}

` },
          ],
          validation: {
            styles: [
              { selecteur: "ul", propriete: "border", motif: "2px\\s+solid\\s+#5b3a1a",
                message: "Il manque la bordure de la liste : 2px, solid, et la couleur #5B3A1A." },
              { selecteur: "ul", propriete: "padding", motif: "^15px$",
                message: "Il manque les 15px de marge intérieure sur la liste." },
              { selecteur: "ul", propriete: "border-radius", motif: "^8px$",
                message: "Il manque les coins arrondis de 8px sur la liste." },
            ],
          },
          indices: [
            "Une seule nouvelle règle, dont le sélecteur est le nom de la balise qui ouvre la liste.",
            "La bordure se décrit en trois informations dans la même déclaration, séparées par des espaces : l'épaisseur, le style du trait, la couleur.",
            "Les trois déclarations vont dans la même règle, chacune terminée par un point-virgule.",
          ],
          felicitation: "Ta liste est devenue un encadré. 📦",
        },

        {
          id: "d14", type: "cours",
          titre: "Viser précisément : l'attribut class",
          contenu: `
            <p>Jusqu'ici, un sélecteur désigne <em>tous</em> les éléments d'un type. Mais
            comment mettre en valeur <strong>un seul</strong> paragraphe sur cinq ?</p>

            <p>On lui colle une étiquette en HTML…</p>

            <pre class="bloc-code"><code>&lt;p class="astuce"&gt;Laisse reposer la pâte une heure.&lt;/p&gt;</code></pre>

            <p>…et on vise cette étiquette en CSS, avec un <strong>point</strong> devant
            son nom :</p>

            <pre class="bloc-code"><code>.astuce {
  background-color: #FFF3CD;
  border-left: 4px solid #E0A800;
  padding: 10px;
}</code></pre>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Sélecteur</th><th>Ce qu'il désigne</th></tr>
                <tr><td><code>p</code></td><td>tous les paragraphes</td></tr>
                <tr><td><code>.astuce</code></td><td>tout élément portant <code>class="astuce"</code></td></tr>
                <tr><td><code>p.astuce</code></td><td>les paragraphes qui portent cette classe, et eux seuls</td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le nom est à toi</span>
              <code>astuce</code>, <code>note</code>, <code>ingredients</code> : tu
              choisis. Une bonne classe dit <strong>ce que le contenu est</strong>, pas de
              quoi il a l'air. <code>class="important"</code> vieillira bien ;
              <code>class="rouge"</code> deviendra faux le jour où tu passeras au bleu.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Le point ne s'écrit qu'en CSS</span>
              En HTML : <code>class="astuce"</code>, sans point. En CSS :
              <code>.astuce</code>, avec point. C'est l'erreur la plus fréquente.
            </div>`,
        },

        {
          id: "d15", type: "code",
          titre: "Mettre une astuce en valeur",
          contenu: `
            <p>Le dernier paragraphe de la page est un conseil : donne-lui l'allure d'un
            encadré jaune.</p>
            <ol>
              <li>dans le HTML, ajoute-lui <code>class="astuce"</code> ;</li>
              <li>dans le CSS, écris la règle correspondante : fond <code>#FFF3CD</code>,
                  10 pixels de marge intérieure, et une bordure gauche de 4 pixels en
                  trait plein de couleur <code>#E0A800</code>
                  (propriété <code>border-left</code>).</li>
            </ol>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Mélange la farine, les œufs et le lait.</p>
    <p>Laisse reposer la pâte une heure avant de cuire.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: #FDF3E3;
  font-family: Helvetica, sans-serif;
}

` },
          ],
          validation: {
            elements: [
              { selecteur: "p.astuce", min: 1, max: 1,
                message: "Il manque l'attribut class=\"astuce\" sur le dernier paragraphe.",
                messageMax: "Un seul paragraphe doit porter la classe astuce." },
              { selecteur: "p.astuce", texteMotif: "reposer",
                messageDetail: "C'est le paragraphe qui parle du temps de repos qui doit porter la classe." },
            ],
            styles: [
              { selecteur: ".astuce", propriete: "background-color", motif: "^#fff3cd$",
                message: "Il manque le fond #FFF3CD sur la classe astuce." },
              { selecteur: ".astuce", propriete: "padding", motif: "^10px$",
                message: "Il manque les 10px de marge intérieure sur la classe astuce." },
              { selecteur: ".astuce", propriete: "border-left", motif: "4px\\s+solid\\s+#e0a800",
                message: "Il manque la bordure gauche : 4px, solid, #E0A800." },
            ],
          },
          indices: [
            "En HTML, l'étiquette est un attribut comme les autres : elle se glisse dans la balise ouvrante, avec sa valeur entre guillemets.",
            "En CSS, le sélecteur reprend ce nom précédé d'un point — et rien d'autre, pas de nom de balise devant.",
            "Les trois déclarations vont dans la même règle.",
          ],
          felicitation: "Tu sais viser un élément précis : c'est la clé de toute mise en page. 🎯",
        },

        {
          id: "d16", type: "cours",
          titre: "Le mémo de la séance",
          contenu: `
            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Propriété</th><th>Exemple</th></tr>
                <tr><td><code>color</code></td><td><code>color: #5B3A1A;</code> — la couleur du texte</td></tr>
                <tr><td><code>background-color</code></td><td><code>background-color: beige;</code> — l'arrière-plan</td></tr>
                <tr><td><code>font-family</code></td><td><code>font-family: Georgia, serif;</code></td></tr>
                <tr><td><code>font-size</code></td><td><code>font-size: 18px;</code></td></tr>
                <tr><td><code>text-align</code></td><td><code>text-align: center;</code></td></tr>
                <tr><td><code>font-weight</code></td><td><code>font-weight: bold;</code></td></tr>
                <tr><td><code>font-style</code></td><td><code>font-style: italic;</code></td></tr>
                <tr><td><code>border</code></td><td><code>border: 2px solid #5B3A1A;</code></td></tr>
                <tr><td><code>padding</code></td><td><code>padding: 15px;</code> — dedans</td></tr>
                <tr><td><code>margin</code></td><td><code>margin: 20px;</code> — dehors</td></tr>
                <tr><td><code>border-radius</code></td><td><code>border-radius: 8px;</code></td></tr>
              </table>
            </div>

            <p>Et les trois sélecteurs :</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Sélecteur</th><th>Vise</th></tr>
                <tr><td><code>body</code></td><td>toute la page — et par héritage, tout son texte</td></tr>
                <tr><td><code>h1</code>, <code>p</code>, <code>ul</code>…</td><td>tous les éléments de ce type</td></tr>
                <tr><td><code>.astuce</code></td><td>tout élément portant <code>class="astuce"</code></td></tr>
              </table>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les erreurs qui reviennent</span>
              <ul>
                <li>oublier le point-virgule : la déclaration suivante est avalée avec la précédente ;</li>
                <li>oublier l'accolade fermante : tout ce qui suit cesse de s'appliquer ;</li>
                <li>écrire <code>colour</code> au lieu de <code>color</code> — aucun effet, aucun message ;</li>
                <li>oublier le <code>#</code> devant un code hexadécimal ;</li>
                <li>mettre le point de la classe dans le HTML, ou l'oublier dans le CSS ;</li>
                <li>oublier la balise <code>&lt;link&gt;</code> : la plus belle feuille de style ne sert à rien si la page l'ignore.</li>
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
      minutes: 18,
      etoiles: 2,
      intention: "habiller de vraies pages, et réparer une feuille de style",
      etapes: [

        {
          id: "a1", type: "code",
          titre: "Habiller la fiche de recette",
          contenu: `
            <p>Le HTML est écrit et complet. Écris la feuille de style, vide pour
            l'instant, pour obtenir :</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>toute la page : fond <code>#F7F3EE</code>, police sans empattements, texte de 17px ;</li>
                <li>le titre principal : centré, de couleur <code>#7A4A22</code> ;</li>
                <li>les sous-titres : de couleur <code>#7A4A22</code> également ;</li>
                <li>la liste des ingrédients : bordure de 2px en trait plein <code>#D8C5A4</code>, 15px de marge intérieure, coins arrondis de 6px.</li>
              </ul>
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Gâteau au yaourt</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Gâteau au yaourt</h1>
    <h2>Ingrédients</h2>
    <ul>
      <li>1 pot de yaourt</li>
      <li>2 pots de sucre</li>
      <li>3 pots de farine</li>
    </ul>
    <h2>Préparation</h2>
    <ol>
      <li>Mélanger le tout</li>
      <li>Enfourner 30 minutes à 180 degrés</li>
    </ol>
  </body>
</html>
` },
            { nom: "style.css", depart: `/* Écris tes règles ici. */
` },
          ],
          validation: {
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "^#f7f3ee$",
                message: "Le fond de la page doit valoir #F7F3EE." },
              { selecteur: "body", propriete: "font-family", motif: "sans-serif",
                message: "Il manque la police sans empattements sur body." },
              { selecteur: "body", propriete: "font-size", motif: "^17px$",
                message: "Il manque la taille de 17px sur body." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Le titre principal n'est pas centré." },
              { selecteur: "h1", propriete: "color", motif: "^#7a4a22$",
                message: "Le titre principal doit valoir #7A4A22." },
              { selecteur: "h2", tous: true, propriete: "color", motif: "^#7a4a22$",
                message: "Les deux sous-titres doivent valoir #7A4A22." },
              { selecteur: "ul", propriete: "border", motif: "2px\\s+solid\\s+#d8c5a4",
                message: "Il manque la bordure de la liste des ingrédients." },
              { selecteur: "ul", propriete: "padding", motif: "^15px$",
                message: "Il manque les 15px de marge intérieure sur la liste des ingrédients." },
              { selecteur: "ul", propriete: "border-radius", motif: "^6px$",
                message: "Il manque les coins arrondis de 6px sur la liste des ingrédients." },
            ],
          },
          indices: [
            "Quatre règles suffisent : une par sélecteur (body, h1, h2, ul).",
            "Le titre et les sous-titres partagent une couleur : tu peux écrire deux règles, ou une seule dont le sélecteur les nomme tous les deux, séparés par une virgule.",
            "Vérifie que la bordure ne s'applique qu'à la liste à puces, et pas à la liste numérotée.",
          ],
          felicitation: "Une fiche de recette qui a enfin l'air d'une fiche de recette. 🎨",
        },

        {
          id: "a2", type: "code",
          titre: "Une feuille pour deux pages",
          contenu: `
            <p>Voici un petit site de deux pages. Chacune a son HTML, mais elles doivent
            partager <strong>la même</strong> feuille de style : c'est ce qui donne à un
            site son unité.</p>
            <ol>
              <li>relie <code>style.css</code> aux <strong>deux</strong> pages ;</li>
              <li>écris dedans : fond <code>#EEF4F1</code> sur toute la page, police sans
                  empattements, titres centrés, et les liens en <code>#2C6E63</code> sans
                  soulignement (<code>text-decoration: none</code>).</li>
            </ol>
            <p>Circule entre les deux pages dans l'aperçu : elles doivent se ressembler.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Mon carnet</title>
  </head>
  <body>
    <h1>Mon carnet de recettes</h1>
    <ul>
      <li><a href="crepes.html">Pâte à crêpes</a></li>
    </ul>
  </body>
</html>
` },
            { nom: "crepes.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Trois œufs, de la farine, du lait.</p>
    <p><a href="index.html">Retour au sommaire</a></p>
  </body>
</html>
` },
            { nom: "style.css", depart: `/* Une seule feuille, deux pages. */
` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "index.html n'est pas relié à style.css." },
              { fichier: "crepes.html", selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "crepes.html n'est pas relié à style.css." },
            ],
            styles: [
              { page: "index.html", selecteur: "body", propriete: "background-color", motif: "^#eef4f1$",
                message: "Le fond de la page doit valoir #EEF4F1." },
              { page: "index.html", selecteur: "body", propriete: "font-family", motif: "sans-serif",
                message: "Il manque la police sans empattements sur body." },
              { page: "index.html", selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Les titres doivent être centrés." },
              { page: "crepes.html", selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Le titre de crepes.html doit être centré lui aussi — une seule règle suffit pour les deux pages." },
              { page: "index.html", selecteur: "a", propriete: "color", motif: "^#2c6e63$",
                message: "Les liens doivent valoir #2C6E63." },
              { page: "index.html", selecteur: "a", propriete: "text-decoration", valeur: "none",
                message: "Les liens ne doivent plus être soulignés." },
            ],
          },
          indices: [
            "La balise de liaison est identique dans les deux pages : écris-la une fois, recopie-la dans l'autre onglet.",
            "Le CSS, lui, ne s'écrit qu'une fois : c'est tout l'intérêt d'un fichier partagé.",
            "Le sélecteur des liens est le nom de la balise du lien, une seule lettre.",
          ],
          felicitation: "Deux pages, une identité. C'est exactement la structure du projet. 🎉",
        },

        {
          id: "a3", type: "code",
          titre: "Chasse aux bugs CSS",
          contenu: `
            <p>Cette feuille de style contient <strong>quatre erreurs</strong>. Aucune
            n'empêche la page de s'afficher — c'est bien le problème du CSS : il échoue
            en silence.</p>
            <p>Le rendu attendu : fond <code>#FDF3E3</code>, titre brun
            <code>#5B3A1A</code> et centré, paragraphes en <code>#3A2E22</code>.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: FDF3E3;
}

h1 {
  colour: #5B3A1A
  text-align: center;
}

paragraphe {
  color: #3A2E22;
}
` },
          ],
          validation: {
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "^#fdf3e3$",
                message: "Le fond de la page ne vaut toujours pas #FDF3E3." },
              { selecteur: "h1", propriete: "color", motif: "^#5b3a1a$",
                message: "Le titre ne vaut toujours pas #5B3A1A." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Le titre n'est toujours pas centré." },
              { selecteur: "p", propriete: "color", motif: "^#3a2e22$",
                message: "Les paragraphes ne valent toujours pas #3A2E22." },
            ],
          },
          indices: [
            "Deux erreurs sont signalées par le message de validation, deux ne le sont pas : celles-là, il faut les voir.",
            "Une couleur hexadécimale ne s'écrit jamais sans son croisillon, et une propriété mal orthographiée est simplement ignorée.",
            "Le dernier sélecteur ne désigne aucune balise existante : le nom d'une balise de paragraphe tient en une lettre.",
          ],
          felicitation: "Quatre pannes silencieuses, quatre réparations. 🔧",
          apres: `<p>Retiens la méthode : quand une règle CSS « ne marche pas », on vérifie
            dans l'ordre le <strong>sélecteur</strong> (vise-t-il quelque chose ?), le
            <strong>nom de la propriété</strong>, la <strong>valeur</strong>, puis la
            <strong>ponctuation</strong>.</p>`,
        },

        {
          id: "a4", type: "code",
          titre: "Deux encadrés, deux couleurs",
          contenu: `
            <p>La page contient deux paragraphes de nature différente : une astuce et un
            avertissement. Donne-leur deux allures distinctes avec deux classes.</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>le paragraphe qui parle du repos porte la classe <code>astuce</code> :
                    fond <code>#FFF3CD</code>, bordure gauche de 4px en trait plein <code>#E0A800</code>, 10px de marge intérieure ;</li>
                <li>celui qui parle de la poêle brûlante porte la classe <code>danger</code> :
                    fond <code>#F8D7DA</code>, bordure gauche de 4px en trait plein <code>#C82333</code>, 10px de marge intérieure ;</li>
                <li>les deux sont en italique.</li>
              </ul>
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Mélange la farine, les œufs et le lait.</p>
    <p>Laisse reposer la pâte une heure avant de cuire.</p>
    <p>Attention, la poêle doit être brûlante avant la première crêpe.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  font-family: Helvetica, sans-serif;
}

` },
          ],
          validation: {
            elements: [
              { selecteur: "p.astuce", min: 1, max: 1, texteMotif: "reposer",
                message: "Il manque la classe astuce sur le paragraphe qui parle du temps de repos.",
                messageMax: "Une seule astuce." },
              { selecteur: "p.danger", min: 1, max: 1, texteMotif: "po.le",
                message: "Il manque la classe danger sur le paragraphe qui parle de la poêle.",
                messageMax: "Un seul avertissement." },
            ],
            styles: [
              { selecteur: ".astuce", propriete: "background-color", motif: "^#fff3cd$",
                message: "Il manque le fond #FFF3CD sur la classe astuce." },
              { selecteur: ".astuce", propriete: "border-left", motif: "4px\\s+solid\\s+#e0a800",
                message: "Il manque la bordure gauche 4px solid #E0A800 sur la classe astuce." },
              { selecteur: ".astuce", propriete: "padding", motif: "^10px$",
                message: "Il manque les 10px de marge intérieure sur la classe astuce." },
              { selecteur: ".astuce", propriete: "font-style", valeur: "italic",
                message: "L'astuce doit être en italique." },
              { selecteur: ".danger", propriete: "background-color", motif: "^#f8d7da$",
                message: "Il manque le fond #F8D7DA sur la classe danger." },
              { selecteur: ".danger", propriete: "border-left", motif: "4px\\s+solid\\s+#c82333",
                message: "Il manque la bordure gauche 4px solid #C82333 sur la classe danger." },
              { selecteur: ".danger", propriete: "padding", motif: "^10px$",
                message: "Il manque les 10px de marge intérieure sur la classe danger." },
              { selecteur: ".danger", propriete: "font-style", valeur: "italic",
                message: "L'avertissement doit être en italique." },
            ],
          },
          indices: [
            "Deux étiquettes à poser dans le HTML, deux règles à écrire dans le CSS.",
            "Les deux règles se ressemblent beaucoup : écris la première, recopie-la, change le nom et les deux couleurs.",
            "L'italique est commun aux deux : tu peux l'écrire dans chaque règle, ou une fois dans une règle dont le sélecteur nomme les deux classes séparées par une virgule.",
          ],
          felicitation: "Deux classes, deux messages : ta page se lit d'un coup d'œil. 🎯",
        },

        {
          id: "a5", type: "code",
          titre: "Centrer le site dans la fenêtre",
          contenu: `
            <p>Sur un grand écran, une page qui court d'un bord à l'autre est illisible.
            Le remède tient en deux déclarations sur le <code>body</code> :</p>
            <pre class="bloc-code"><code>max-width: 700px;
margin: auto;</code></pre>
            <p><code>max-width</code> limite la largeur, <code>margin: auto</code> répartit
            l'espace restant également à gauche et à droite — ce qui revient à centrer le
            bloc.</p>
            <p>Ajoute-les, avec en plus 20px de marge intérieure et un fond blanc sur le
            <code>body</code>, pour détacher le contenu de l'arrière-plan de la fenêtre.</p>
            <p>Élargis puis rétrécis la fenêtre d'aperçu pour voir l'effet.</p>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes, à condition de la laisser reposer une heure au frais.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  font-family: Helvetica, sans-serif;
}
` },
          ],
          validation: {
            styles: [
              { selecteur: "body", propriete: "max-width", motif: "^700px$",
                message: "Il manque max-width: 700px sur body." },
              { selecteur: "body", propriete: "margin", motif: "auto",
                message: "Il manque margin: auto sur body : c'est ce qui centre le bloc." },
              { selecteur: "body", propriete: "padding", motif: "^20px$",
                message: "Il manque les 20px de marge intérieure sur body." },
              { selecteur: "body", propriete: "background-color", motif: "^(white|#fff|#ffffff)$",
                message: "Il manque le fond blanc sur body." },
            ],
          },
          indices: [
            "Les quatre déclarations s'ajoutent dans la règle body qui existe déjà.",
            "Le blanc s'écrit par son nom ou par son code hexadécimal, au choix.",
          ],
          felicitation: "Ton contenu ne s'étale plus : il tient dans une colonne lisible. 📐",
        },
      ],
    },

    /* ===================================================================== DÉFIS */
    {
      id: "defis",
      titre: "Défis",
      minutes: 7,
      etoiles: 3,
      intention: "un site entier, habillé de bout en bout",
      etapes: [

        {
          id: "x1", type: "code",
          titre: "Le carnet habillé",
          contenu: `
            <p>Trois pages HTML déjà écrites, une feuille de style vide. Habille le tout.</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>les trois pages sont reliées à <code>style.css</code> ;</li>
                <li><code>body</code> : fond blanc, police sans empattements, largeur maximale de 700px, centré, 20px de marge intérieure ;</li>
                <li>les <code>h1</code> centrés, dans une couleur de ton choix, avec une bordure inférieure (<code>border-bottom</code>) de 3px en trait plein ;</li>
                <li>les liens sans soulignement ;</li>
                <li>les listes à puces encadrées : bordure de 1px en trait plein, 15px de marge intérieure, coins arrondis.</li>
              </ul>
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Mon carnet</title>
  </head>
  <body>
    <h1>Mon carnet de recettes</h1>
    <ul>
      <li><a href="crepes.html">Pâte à crêpes</a></li>
      <li><a href="tarte.html">Tarte aux pommes</a></li>
    </ul>
  </body>
</html>
` },
            { nom: "crepes.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <ul>
      <li>3 œufs</li>
      <li>250 g de farine</li>
    </ul>
    <p><a href="index.html">Retour au sommaire</a></p>
  </body>
</html>
` },
            { nom: "tarte.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Tarte aux pommes</title>
  </head>
  <body>
    <h1>Tarte aux pommes</h1>
    <ul>
      <li>1 pâte brisée</li>
      <li>4 pommes</li>
    </ul>
    <p><a href="index.html">Retour au sommaire</a></p>
  </body>
</html>
` },
            { nom: "style.css", depart: `/* La feuille commune aux trois pages. */
` },
          ],
          apercu: "index.html",
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "head link",
                attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "index.html n'est pas relié à style.css." },
              { fichier: "crepes.html", selecteur: "head link",
                attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "crepes.html n'est pas relié à style.css." },
              { fichier: "tarte.html", selecteur: "head link",
                attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "tarte.html n'est pas relié à style.css." },
            ],
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "^(white|#fff|#ffffff)$",
                message: "Il manque le fond blanc sur body." },
              { selecteur: "body", propriete: "font-family", motif: "sans-serif",
                message: "Il manque la police sans empattements sur body." },
              { selecteur: "body", propriete: "max-width", motif: "^700px$",
                message: "Il manque max-width: 700px sur body." },
              { selecteur: "body", propriete: "margin", motif: "auto",
                message: "Il manque margin: auto sur body." },
              { selecteur: "body", propriete: "padding", motif: "^20px$",
                message: "Il manque les 20px de marge intérieure sur body." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Les titres ne sont pas centrés." },
              { selecteur: "h1", propriete: "color", motif: "\\S",
                message: "Les titres n'ont pas de couleur choisie." },
              { selecteur: "h1", propriete: "border-bottom", motif: "3px\\s+solid",
                message: "Il manque la bordure inférieure de 3px en trait plein sous les titres." },
              { selecteur: "a", propriete: "text-decoration", valeur: "none",
                message: "Les liens sont encore soulignés." },
              { selecteur: "ul", propriete: "border", motif: "1px\\s+solid",
                message: "Il manque la bordure de 1px en trait plein autour des listes." },
              { selecteur: "ul", propriete: "padding", motif: "^15px$",
                message: "Il manque les 15px de marge intérieure sur les listes." },
              { selecteur: "ul", propriete: "border-radius", motif: "px",
                message: "Il manque les coins arrondis sur les listes." },
            ],
          },
          indices: [
            "Commence par les trois balises de liaison : tant qu'elles manquent, rien de ce que tu écris dans le CSS ne se verra.",
            "Cinq règles suffisent pour tout le cahier des charges : body, h1, a, ul.",
            "Circule entre les trois pages dans l'aperçu : elles doivent être habillées à l'identique, sans que tu aies rien écrit trois fois.",
          ],
          felicitation: "Un site de trois pages, cohérent, habillé par un seul fichier. 🎉",
        },

        {
          id: "x2", type: "code",
          titre: "Chasse aux bugs, niveau 2",
          contenu: `
            <p><strong>Cinq erreurs</strong> réparties entre le HTML et le CSS. Le rendu
            attendu :</p>
            <div class="encadre">
              <span class="chapo">Ce que la page doit donner</span>
              <ul>
                <li>fond de page <code>#EEF4F1</code>, police sans empattements ;</li>
                <li>titre centré, de couleur <code>#2C6E63</code> ;</li>
                <li>le paragraphe de classe <code>note</code> en italique, avec un fond <code>#FFFFFF</code> et 10px de marge intérieure.</li>
              </ul>
            </div>`,
          fichiers: [
            { nom: "index.html", depart: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Pâte à crêpes</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Pâte à crêpes</h1>
    <p>Prête en cinq minutes.</p>
    <p class=".note">Se garde deux jours au réfrigérateur.</p>
  </body>
</html>
` },
            { nom: "style.css", depart: `body {
  background-color: #EEF4F1;
  font-family: Helvetica sans-serif;
}

h1 {
  color: #2C6E63;
  text-align: centre;
}

note {
  font-style: italic;
  background-color: #FFFFFF;
  padding: 10px;
` },
          ],
          validation: {
            elements: [
              { selecteur: "head link", attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "La page ne pointe pas vers le bon fichier de style : compare avec le nom de l'onglet." },
              { selecteur: "p.note", min: 1,
                message: "La valeur de l'attribut class ne s'écrit pas avec un point : le point est réservé au CSS." },
            ],
            styles: [
              { selecteur: "body", propriete: "font-family", motif: "sans-serif",
                message: "La police n'est pas correctement écrite : les noms d'une liste de polices se séparent par une virgule." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Le titre n'est pas centré : la valeur attendue s'écrit en anglais." },
              { selecteur: ".note", propriete: "font-style", valeur: "italic",
                message: "Le paragraphe de classe note n'est pas en italique : vérifie le sélecteur, puis la ponctuation de la règle." },
              { selecteur: ".note", propriete: "padding", motif: "^10px$",
                message: "Il manque les 10px de marge intérieure sur la classe note." },
            ],
          },
          indices: [
            "Commence par ce qui empêche tout le reste : la page ne charge peut-être pas la bonne feuille.",
            "Dans le HTML, une valeur de classe s'écrit sans point ; dans le CSS, le sélecteur d'une classe s'écrit avec.",
            "Il reste une virgule oubliée, une valeur écrite en français, et une accolade jamais refermée.",
          ],
          felicitation: "Cinq pannes, deux langages, une page réparée. 🔧",
        },

        {
          id: "x3", type: "code",
          titre: "Ta page, ton style",
          contenu: `
            <p>Dernier défi avant le projet : une page complète, contenu et habillage, sur
            le sujet de ton choix.</p>
            <div class="encadre">
              <span class="chapo">Le cahier des charges</span>
              <ul>
                <li>squelette complet, <code>&lt;title&gt;</code> renseigné, feuille de style reliée ;</li>
                <li>un <code>&lt;h1&gt;</code>, deux <code>&lt;h2&gt;</code>, une image avec son <code>alt</code>, une liste à puces, un lien externe ;</li>
                <li>un élément portant une <code>class</code> de ton choix, stylé par une règle qui lui est propre ;</li>
                <li>en CSS : au moins <strong>quatre règles</strong>, une couleur de fond, une police, un centrage et une bordure.</li>
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
            { nom: "style.css", depart: `/* Tes règles ici. */
` },
          ],
          validation: {
            elements: [
              { selecteur: "title", texteNonVide: true, message: "Le <title> est vide." },
              { selecteur: "head link", attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "La feuille de style n'est pas reliée à la page." },
              { selecteur: "body h1", min: 1, max: 1, texteNonVide: true,
                message: "Il faut un <h1>, et un seul.", messageMax: "Il faut un <h1>, et un seul." },
              { selecteur: "body h2", min: 2, message: "Il faut au moins deux <h2>." },
              { selecteur: "body img", attributs: [{ nom: "src" }, { nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "Il manque une image avec un alt d'au moins deux mots." },
              { selecteur: "body ul li", min: 3, message: "Il manque une liste à puces de trois éléments." },
              { selecteur: "body a", attributs: [{ nom: "href", motif: "^https?://" }],
                message: "Il manque un lien vers l'extérieur." },
              { selecteur: "body [class]", min: 1,
                message: "Il manque un élément portant un attribut class." },
            ],
            contient: [
              { fichier: "style.css", motif: "\\{[^}]*\\}[\\s\\S]*\\{[^}]*\\}[\\s\\S]*\\{[^}]*\\}[\\s\\S]*\\{[^}]*\\}",
                message: "Il faut au moins quatre règles CSS." },
              { fichier: "style.css", motif: "^\\s*\\.[a-zA-Z][\\w-]*\\s*[,{]", options: "m",
                message: "Il manque la règle qui vise ta classe : son sélecteur commence par un point." },
            ],
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "\\S",
                message: "Il manque une couleur de fond sur body." },
              { selecteur: "body", propriete: "font-family", motif: "\\S",
                message: "Il manque une police sur body." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Il manque un centrage sur le titre." },
              { selecteur: "body [class]", propriete: "border", motif: "px",
                message: "Il manque une bordure sur l'élément de ta classe.",
                messageCible: "Il manque un élément portant une classe, à qui donner une bordure." },
            ],
          },
          indices: [
            "Écris d'abord tout le HTML, valide-le mentalement, puis passe au CSS : les deux se relisent séparément.",
            "L'élément de ta classe peut être n'importe lequel — un paragraphe d'introduction, un encadré de conclusion. Ce qui compte, c'est qu'une règle le vise par son nom de classe.",
            "Relis le cahier des charges avant de valider : le point le plus souvent oublié est la quatrième règle CSS.",
          ],
          felicitation: "Contenu et habillage, du premier au dernier caractère. Place au projet. 🎉",
        },
      ],
    },
  ],
};

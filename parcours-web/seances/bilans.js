/* Bilans de fin de partie — SNT, parcours Web.
 *
 * Une fiche par partie du manifeste (clé = id du palier). Ni exercice ni
 * correction : la liste de ce que l'élève doit savoir faire en sortant de la
 * partie, chaque savoir-faire illustré par un extrait de code.
 * Forme décrite dans docs/.Ressources/parcours-interactifs.md.
 *
 * Attention : `sait`, `pieges` et `suite` sont injectés en innerHTML. Toute
 * balise citée s'y écrit &lt;h1&gt;, sinon elle devient une vraie balise.
 * `code`, lui, est du texte brut : on y écrit le HTML tel quel.
 */

export default {

  /* ===================================================== PARTIE 1 — HTML */
  html: {
    titre: "HTML : ce qu'il y a dans la page",
    accroche: `Tu sais maintenant écrire une page complète, avec des titres, des listes,
      des images et des liens. Voici ce que tu dois savoir faire avant de l'habiller en CSS.`,

    sections: [
      {
        titre: "Les balises et le squelette",
        seances: ["s01"],
        savoirs: [
          { sait: `écrire une balise ouvrante et sa fermante, avec la barre oblique : ensemble,
              elles forment un <strong>élément</strong>`,
            code: `<h1>Mes recettes</h1>` },
          { sait: "écrire le squelette complet d'une page, et dire le rôle de chaque ligne",
            code: `<!DOCTYPE html>\n<html lang="fr">\n  <head>\n    <meta charset="utf-8">\n    <title>Mes recettes</title>\n  </head>\n  <body>\n    <h1>Mes recettes</h1>\n  </body>\n</html>` },
          { sait: `distinguer <code>&lt;head&gt;</code> (la fiche d'identité, invisible) et
              <code>&lt;body&gt;</code> (ce que le visiteur voit)` },
          { sait: "laisser une note dans le code avec un commentaire",
            code: `<!-- Penser à ajouter la photo ici -->` },
        ],
      },
      {
        titre: "Structurer le texte",
        seances: ["s01"],
        savoirs: [
          { sait: `donner un plan à la page avec <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> :
              un seul <code>&lt;h1&gt;</code>, et on ne saute pas de niveau`,
            code: `<h1>Tarte aux pommes</h1>\n<h2>Ingrédients</h2>\n<h3>Pour la pâte</h3>` },
          { sait: `écrire des paragraphes avec <code>&lt;p&gt;</code>, et passer à la ligne avec
              <code>&lt;br&gt;</code>, qui ne se ferme pas`,
            code: `<p>12 rue des Lilas<br>75011 Paris</p>` },
          { sait: `mettre un mot en valeur avec <code>&lt;strong&gt;</code> ou <code>&lt;b&gt;</code>
              (gras), <code>&lt;em&gt;</code> ou <code>&lt;i&gt;</code> (italique)`,
            code: `<p>Le four doit être <strong>très chaud</strong>, et on remue <em>sans cesse</em>.</p>` },
        ],
        pieges: `<ul>
            <li>oublier la barre oblique de la fermante : tout ce qui suit change d'apparence ;</li>
            <li>fermer avec un autre nom (<code>&lt;h1&gt;…&lt;/h2&gt;</code>) ou croiser deux balises : la dernière ouverte est la première fermée ;</li>
            <li>attendre qu'un retour à la ligne du fichier se voie à l'écran ;</li>
            <li>choisir un titre pour sa taille : la taille, c'est le travail du CSS.</li>
          </ul>`,
      },
      {
        titre: "Listes, images et liens",
        seances: ["s02"],
        savoirs: [
          { sait: `écrire une liste à puces (<code>&lt;ul&gt;</code>) ou numérotée
              (<code>&lt;ol&gt;</code>), chaque élément dans un <code>&lt;li&gt;</code>`,
            code: `<ol>\n  <li>Mélanger la farine et les œufs.</li>\n  <li>Ajouter le lait petit à petit.</li>\n</ol>` },
          { sait: `écrire un <strong>attribut</strong> : dans la balise ouvrante, un
              <code>=</code>, la valeur entre guillemets droits`,
            code: `<html lang="fr">` },
          { sait: "insérer une image, par un chemin ou par son adresse sur le web, avec une description <code>alt</code>",
            code: `<img src="crepes.svg" alt="Une pile de crêpes">\n<img src="https://upload.wikimedia.org/…/crepe.jpg" alt="Une crêpe dans une poêle">` },
          { sait: "créer un lien vers un autre site, ou vers une autre page du sien",
            code: `<a href="https://www.marmiton.org">la recette d'origine sur Marmiton</a>\n<a href="recette.html">Voir la recette</a>` },
          { sait: "lire une adresse web : le <strong>protocole</strong>, le <strong>nom de domaine</strong>, le <strong>chemin</strong>" },
        ],
        pieges: `<ul>
            <li>fermer <code>&lt;img&gt;</code>, qui est solitaire ;</li>
            <li>oublier <code>alt</code>, ou y écrire « image » ;</li>
            <li>une image qui ne s'affiche pas : presque toujours une faute dans le <code>src</code> ;</li>
            <li>« cliquez ici » comme texte de lien : il doit se suffire à lui-même.</li>
          </ul>`,
      },
    ],

    suite: `<strong>Le principe du HTML :</strong> tu écris le texte et tu dis ce qu'il
      <em>est</em> — un titre, une liste, un lien. Le navigateur décide de quoi il a l'air.`,
  },

  /* ====================================================== PARTIE 2 — CSS */
  css: {
    titre: "CSS : à quoi elle ressemble",
    accroche: `Le HTML dit ce que les choses sont, le CSS dit de quoi elles ont l'air. Voici
      ce que tu dois savoir faire avant de te lancer dans le projet.`,

    sections: [
      {
        titre: "Relier une feuille de style, écrire une règle",
        seances: ["s03"],
        savoirs: [
          { sait: `relier la feuille de style à la page, par une balise <code>&lt;link&gt;</code>
              placée dans le <code>&lt;head&gt;</code>`,
            code: `<link rel="stylesheet" href="style.css">` },
          { sait: "écrire une règle : un sélecteur, des accolades, des déclarations <code>propriété: valeur;</code>",
            code: `h1 {\n  color: brown;\n  text-align: center;\n}` },
          { sait: `viser toute la page avec <code>body</code> — par <strong>héritage</strong>,
              la police et la couleur du texte se transmettent à tout son contenu`,
            code: `body {\n  font-family: Georgia, serif;\n  font-size: 18px;\n}` },
          { sait: "viser un seul élément grâce à une <strong>classe</strong> : sans point en HTML, avec un point en CSS",
            code: `<p class="astuce">Laisse reposer la pâte une heure.</p>\n\n.astuce {\n  background-color: #FFF3CD;\n}` },
        ],
      },
      {
        titre: "Habiller : couleurs, texte, boîtes",
        seances: ["s03"],
        savoirs: [
          { sait: "choisir une couleur par son nom, ou par son code hexadécimal <code>#RRVVBB</code>",
            code: `color: #5B3A1A;\nbackground-color: beige;` },
          { sait: "régler la police, la taille, l'alignement, le gras et l'italique",
            code: `font-family: Georgia, serif;\nfont-size: 18px;\ntext-align: center;\nfont-weight: bold;\nfont-style: italic;` },
          { sait: `encadrer un bloc : <code>border</code> pour le trait, <code>padding</code>
              pour l'air dedans, <code>margin</code> pour l'air dehors`,
            code: `border: 2px solid #5B3A1A;\npadding: 15px;\nmargin: 20px;\nborder-radius: 8px;` },
          { sait: "centrer le contenu d'une page dans la fenêtre",
            code: `body {\n  max-width: 700px;\n  margin: auto;\n}` },
        ],
        pieges: `<ul>
            <li>oublier un point-virgule ou une accolade fermante ;</li>
            <li>écrire <code>colour</code>, ou oublier le <code>#</code> : aucun effet, aucun message ;</li>
            <li>le point de la classe dans le HTML, ou oublié dans le CSS ;</li>
            <li>oublier la balise <code>&lt;link&gt;</code> : la page ignore la feuille de style.</li>
          </ul>`,
      },
    ],

    suite: `<strong>Une seule question :</strong> est-ce que je dis ce que la chose est
      (HTML, <code>&lt;strong&gt;</code>), ou de quoi elle a l'air (CSS,
      <code>font-weight</code>) ?`,
  },

  /* =================================================== PARTIE 3 — PROJET */
  projet: {
    titre: "Le projet",
    accroche: `Tu as construit un vrai site de trois pages. Voici ce que tu dois savoir
      refaire, seul, sur n'importe quel sujet.`,

    sections: [
      {
        titre: "Construire un site de plusieurs pages",
        seances: ["s04"],
        savoirs: [
          { sait: "organiser un site en fichiers rangés côte à côte, avec un sommaire <code>index.html</code>",
            code: `mon-site/\n├── index.html\n├── presentation.html\n├── etudes.html\n└── style.css` },
          { sait: "relier les pages dans les deux sens : du sommaire vers chaque page, et un lien de retour",
            code: `<a href="index.html">Retour au sommaire</a>` },
          { sait: "donner une identité commune aux pages avec <strong>une seule</strong> feuille de style, reliée dans chacune" },
          { sait: "choisir la balise qui dit la vérité : une liste numérotée quand l'ordre compte, à puces sinon" },
          { sait: "vérifier en cliquant, pas seulement en relisant : une lettre de trop dans un nom de fichier suffit à casser un lien" },
        ],
      },
      {
        titre: "Sources, accessibilité, rendu",
        seances: ["s04"],
        savoirs: [
          { sait: "utiliser des images libres par leur adresse <code>https://</code>, et citer ses sources par un lien" },
          { sait: `rendre ses pages utilisables par tous : un <code>alt</code> qui décrit chaque
              image, des liens qui se suffisent à eux-mêmes, un plan de titres sans trou` },
          { sait: "écrire avec ses propres mots plutôt que recopier une fiche" },
          { sait: "télécharger son site en archive <code>NOM_Prenom.zip</code>, la décompresser, et ouvrir <code>index.html</code> hors du parcours" },
        ],
      },
    ],

    suite: `Un site réussi, c'est un visiteur qui part du sommaire, visite toutes les
      pages et revient, sans jamais rester bloqué.`,
  },
};

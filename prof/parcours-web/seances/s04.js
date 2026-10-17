/* Séance 4 — Projet : le site d'un métier.
 *
 * Deux heures, quatre fichiers, un sujet que l'élève choisit. Les trois séances
 * précédentes prenaient la cuisine comme fil rouge : on change de terrain pour
 * que l'élève transpose au lieu de recopier.
 *
 * L'ACCOMPAGNEMENT S'ADAPTE. Le moteur lit ce que l'élève a réussi en séances 1
 * à 3 (réussites du premier coup, coups de pouce ouverts) et choisit un niveau ;
 * l'enseignant peut le forcer par ?aide=pas-a-pas dans l'adresse.
 *
 *   autonome   le cahier des charges, et rien d'autre
 *   reperes    + la liste des balises attendues, et un squelette commenté
 *   pas-a-pas  + la marche à suivre numérotée, et un squelette à trous
 *
 * La VALIDATION est identique aux trois niveaux : c'est l'échafaudage qui change,
 * jamais l'exigence.
 *
 * Le travail se transmet d'une étape à l'autre : `reprend` recopie dans l'étape
 * suivante ce que l'élève a écrit dans la précédente. Les `depart` déclarés ici
 * ne servent que de filet — ils décrivent l'état attendu à ce moment du projet.
 */

/* --------------------------------------------------------------- Le site témoin
   Sert de code de départ « de secours » et de solution de référence. Le métier
   retenu — infirmier — n'est qu'un exemple : l'élève choisit le sien. */

const SOMMAIRE_NU = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
`;

const SOMMAIRE_FAIT = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Le métier d'infirmier</title>
  </head>
  <body>
    <h1>Le métier d'infirmier</h1>
    <p>Un métier de soin et de contact, exercé à l'hôpital comme à domicile.</p>
    <img src="https://picsum.photos/640/360" alt="Image à remplacer par une photo du métier">
    <ul>
      <li><a href="presentation.html">Présentation du métier</a></li>
      <li><a href="etudes.html">Les études pour y arriver</a></li>
    </ul>
  </body>
</html>
`;

const SOMMAIRE_LIE = SOMMAIRE_FAIT.replace(
  "    <title>Le métier d'infirmier</title>\n",
  "    <title>Le métier d'infirmier</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n");

const page = (titre, corps, avecLien) => `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>${titre}</title>${avecLien ? '\n    <link rel="stylesheet" href="style.css">' : ""}
  </head>
  <body>
${corps}  </body>
</html>
`;

const PRESENTATION_NUE = page("Présentation du métier", `    <h1>Le métier au quotidien</h1>\n`, false);
const PRESENTATION_LIEE = page("Présentation du métier", `    <h1>Le métier au quotidien</h1>\n`, true);

const PRESENTATION_ECRITE = page("Présentation du métier", `    <h1>Le métier au quotidien</h1>
    <p>L'infirmier surveille l'état des patients, applique les prescriptions et rassure les familles.</p>
    <h2>Où l'exerce-t-on ?</h2>
    <p>À l'hôpital, en clinique, en maison de retraite, à l'école ou au domicile des patients.</p>
    <h2>Les missions principales</h2>
    <ul>
      <li>Préparer et administrer les traitements</li>
      <li>Surveiller les constantes des patients</li>
      <li>Tenir le dossier de soins à jour</li>
    </ul>
`, true);

const PRESENTATION_ILLUSTREE = page("Présentation du métier", `    <h1>Le métier au quotidien</h1>
    <img src="https://picsum.photos/640/360" alt="Image à remplacer par une photo du métier">
    <p>L'infirmier surveille l'état des patients, applique les prescriptions et rassure les familles.</p>
    <h2>Où l'exerce-t-on ?</h2>
    <p>À l'hôpital, en clinique, en maison de retraite, à l'école ou au domicile des patients.</p>
    <h2>Les missions principales</h2>
    <ul>
      <li>Préparer et administrer les traitements</li>
      <li>Surveiller les constantes des patients</li>
      <li>Tenir le dossier de soins à jour</li>
    </ul>
    <p>Source : <a href="https://www.onisep.fr">la fiche métier de l'Onisep</a>.</p>
`, true);

const PRESENTATION_RELIEE = PRESENTATION_ILLUSTREE.replace(
  "  </body>", `    <p><a href="index.html">Retour au sommaire</a></p>\n  </body>`);

const ETUDES_NUE = page("Les études", `    <h1>Comment on y arrive</h1>\n`, false);
const ETUDES_LIEE = page("Les études", `    <h1>Comment on y arrive</h1>\n`, true);
const ETUDES_RETOUR = page("Les études", `    <h1>Comment on y arrive</h1>
    <p><a href="index.html">Retour au sommaire</a></p>
`, true);

const ETUDES_ECRITE = page("Les études", `    <h1>Comment on y arrive</h1>
    <h2>Le parcours après le bac</h2>
    <ol>
      <li>Obtenir le baccalauréat, de préférence général</li>
      <li>Candidater en institut de formation en soins infirmiers</li>
      <li>Suivre trois ans de formation, en cours et en stage</li>
    </ol>
    <h2>Les qualités attendues</h2>
    <ul>
      <li>Le sang-froid</li>
      <li>Le sens du contact</li>
      <li>La résistance physique</li>
    </ul>
    <p>Source : <a href="https://www.onisep.fr">la fiche formation de l'Onisep</a>.</p>
    <p><a href="index.html">Retour au sommaire</a></p>
`, true);

const CSS_VIDE = `/* La feuille de style commune aux trois pages. */
`;

const CSS_BASE = `body {
  background-color: #F4F7F9;
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  max-width: 700px;
  margin: auto;
  padding: 20px;
}

h1 {
  color: #1F4E5F;
  text-align: center;
}

a {
  text-decoration: none;
}
`;

const CSS_FINAL = CSS_BASE + `
h2 {
  color: #2C6E63;
}

ul {
  border: 1px solid #C7D6DD;
  padding: 15px;
  border-radius: 8px;
}

.essentiel {
  background-color: #FFFFFF;
  border: 2px solid #1F4E5F;
  padding: 12px;
  border-radius: 8px;
  font-style: italic;
}
`;

const fichiers = (i, p, e, c) => [
  { nom: "index.html", depart: i },
  { nom: "presentation.html", depart: p },
  { nom: "etudes.html", depart: e },
  { nom: "style.css", depart: c },
];

/* ------------------------------------------------------- Blocs de consigne réutilisés */

const CAHIER_SOMMAIRE = `
  <div class="encadre">
    <span class="chapo">Ce que doit contenir index.html</span>
    <ul>
      <li>un <code>&lt;title&gt;</code> renseigné ;</li>
      <li>un <code>&lt;h1&gt;</code> : le nom du métier ;</li>
      <li>un paragraphe de présentation d'au moins huit mots ;</li>
      <li>une image, avec un texte alternatif d'au moins trois mots ;</li>
      <li>une liste à puces de <strong>deux liens</strong>, vers
          <code>presentation.html</code> et <code>etudes.html</code>.</li>
    </ul>
    <span class="chapo">Et dans les deux autres pages</span>
    Pour l'instant, seulement leur <code>&lt;title&gt;</code> et leur
    <code>&lt;h1&gt;</code> : on les remplira plus tard.
  </div>`;

export default {
  id: "s04",
  numero: 4,
  titre: "Projet — le site d'un métier",
  sousTitre: "Quatre fichiers, deux heures, ton sujet",
  palier: "Partie 3 — Le projet",
  adaptatif: true,

  accroche: `Tu as tout ce qu'il faut. Ce projet ne t'apprend aucune balise nouvelle : il
    te demande de te servir de celles que tu connais pour construire un vrai site, de
    trois pages, sur un métier que tu choisis. Ton travail passe d'une étape à l'autre :
    tu construis un seul site, pas une suite d'exercices.`,

  objectifs: [
    "construire un site de <strong>trois pages</strong> reliées entre elles,",
    "leur donner une <strong>identité commune</strong> avec une seule feuille de style,",
    "citer tes sources et rendre tes pages accessibles,",
    "tenir un <strong>cahier des charges</strong> jusqu'au bout.",
  ],

  motDeLaFin: `Ton site est terminé. Ce que tu viens de faire — structurer, relier, habiller,
    relire — c'est exactement le travail d'un développeur web, en plus petit.`,

  parties: [
    /* ============================================================= PARTIE 1 — SOMMAIRE */
    {
      id: "decouverte",
      titre: "Première partie — Le sommaire",
      minutes: 40,
      etoiles: 1,
      intention: "poser les quatre fichiers et la page d'accueil",
      etapes: [

        {
          id: "p1", type: "cours",
          titre: "Le cahier des charges",
          contenu: `
            <p>Tu vas construire un site de <strong>trois pages</strong> présentant un
            métier, plus une feuille de style commune. Quatre fichiers, que tu retrouveras
            dans les onglets de chaque étape :</p>

            <div class="enveloppe-table">
              <table class="table-simple">
                <tr><th>Fichier</th><th>Son rôle</th></tr>
                <tr><td><code>index.html</code></td><td>le <strong>sommaire</strong> : le nom du métier, une image, et les liens vers les deux autres pages</td></tr>
                <tr><td><code>presentation.html</code></td><td>le métier au quotidien : ce qu'on y fait, où, avec qui</td></tr>
                <tr><td><code>etudes.html</code></td><td>le chemin pour y arriver : le parcours après le bac, les qualités attendues</td></tr>
                <tr><td><code>style.css</code></td><td>l'habillage, <strong>commun aux trois pages</strong></td></tr>
              </table>
            </div>

            <p>À la fin, un visiteur doit pouvoir partir du sommaire, visiter les deux
            pages, et revenir — sans jamais rester bloqué.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ton travail te suit</span>
              Chaque étape reprend ce que tu as écrit à la précédente : tu ne
              recommences jamais de zéro. Le bouton <strong>↩ Reprendre mon site</strong>
              est là si jamais une étape s'ouvrait sur autre chose que ton travail.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Comment tu rendras ton travail</span>
              À chaque étape de code, un bouton <strong>⬇ Télécharger mon site</strong>
              enregistre tes quatre fichiers dans une archive nommée
              <strong>NOM_Prenom.zip</strong>. C'est elle que tu rendras. Renseigne donc
              ton nom et ton prénom dès maintenant, dans le menu <strong>☰</strong> en haut
              à droite.
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Ce qui est vérifié, ce qui ne l'est pas</span>
              La <strong>structure</strong> est vérifiée automatiquement : les balises, les
              liens, les règles CSS. Le <strong>contenu</strong>, lui, ne l'est pas : le
              métier, les textes, les images sont ton choix, et c'est là-dessus que ton
              travail se jugera vraiment.
            </div>`,
          libelleBouton: "Choisir mon métier →",
        },

        {
          id: "p2", type: "cours",
          titre: "Choisir ton métier, rassembler la matière",
          contenu: `
            <p>Prends cinq minutes pour cela : c'est du temps gagné ensuite.</p>

            <p><strong>1. Choisis un métier</strong> — celui qui t'intéresse, celui de
            quelqu'un que tu connais, ou un métier dont tu ne sais rien et que tu veux
            découvrir. Évite ceux sur lesquels tu ne trouveras rien.</p>

            <p><strong>2. Va chercher la matière.</strong> Le site de l'Onisep
            (<code>onisep.fr</code>) a une fiche par métier : ce qu'on y fait, les études,
            les débouchés. Un ou deux autres sites suffisent.</p>

            <p><strong>3. Note dans un coin, avant de commencer à taper :</strong></p>
            <div class="encadre">
              <ul>
                <li>le <strong>nom exact</strong> du métier ;</li>
                <li>trois ou quatre <strong>missions</strong> quotidiennes ;</li>
                <li>le <strong>parcours d'études</strong>, en trois ou quatre étapes après le bac ;</li>
                <li>trois <strong>qualités</strong> attendues ;</li>
                <li>l'<strong>adresse</strong> des deux pages où tu as trouvé tout cela ;</li>
                <li>l'<strong>adresse de deux images</strong> libres — clic droit,
                    « Copier l'adresse de l'image ».</li>
              </ul>
            </div>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Les images</span>
              Cherche des images libres de droits, et cite toujours d'où elles viennent.
              Si l'une d'elles refuse de s'afficher dans l'aperçu, c'est que le site
              l'interdit : prends-en une autre.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi une adresse complète, et pas un fichier</span>
              Ton site sera téléchargé dans une archive qui ne contient que tes quatre
              fichiers : aucune image n'y sera rangée. Une image désignée par une
              <strong>adresse commençant par <code>https://</code></strong> continuera de
              s'afficher partout ; une image désignée par un chemin vers un fichier
              disparaîtrait. C'est pour cela que la validation exige la première forme.
            </div>`,
          libelleBouton: "Commencer à construire →",
        },

        {
          id: "p3", type: "code",
          titre: "Le sommaire",
          fichiers: fichiers(SOMMAIRE_NU, PRESENTATION_NUE, ETUDES_NUE, CSS_VIDE),
          apercu: "index.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "title", motsMin: 2,
                message: "Le <title> de index.html est vide ou trop court." },
              { fichier: "index.html", selecteur: "body h1", min: 1, max: 1, motsMin: 2,
                message: "Il manque le <h1> avec le nom du métier, dans index.html.",
                messageMax: "Un seul <h1> par page." },
              { fichier: "index.html", selecteur: "body p", motsMin: 8,
                message: "Il manque le paragraphe de présentation du sommaire (huit mots au moins)." },
              { fichier: "index.html", selecteur: "body img",
                attributs: [{ nom: "src", motif: "^https?://\\S{6,}" },
                            { nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "Il manque l'image du sommaire : une adresse web complète, et un alt d'au moins trois mots." },
              { fichier: "index.html", selecteur: "body ul li a", min: 2,
                message: "Le sommaire doit contenir une liste à puces de deux liens." },
              { fichier: "index.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^presentation\\.html$" }],
                messageDetail: "Un des liens doit mener à presentation.html" },
              { fichier: "index.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^etudes\\.html$" }],
                messageDetail: "L'autre lien doit mener à etudes.html" },
              { fichier: "index.html", selecteur: "body a", tous: true, motsMin: 2,
                messageDetail: "Chaque lien doit avoir un texte d'au moins deux mots." },

              { fichier: "presentation.html", selecteur: "title", motsMin: 2,
                message: "Le <title> de presentation.html est vide ou trop court." },
              { fichier: "presentation.html", selecteur: "body h1", motsMin: 2,
                message: "Il manque le <h1> de presentation.html." },
              { fichier: "etudes.html", selecteur: "title", motsMin: 2,
                message: "Le <title> de etudes.html est vide ou trop court." },
              { fichier: "etudes.html", selecteur: "body h1", motsMin: 2,
                message: "Il manque le <h1> de etudes.html." },
            ],
          },
          solution: {
            "index.html": SOMMAIRE_FAIT,
            "presentation.html": PRESENTATION_NUE,
            "etudes.html": ETUDES_NUE,
          },
          felicitation: "Le sommaire tient debout, et les deux pages existent. 🎉",
          variantes: {
            autonome: {
              contenu: `<p>Construis la page d'accueil de ton site, et pose le titre des
                deux autres.</p>${CAHIER_SOMMAIRE}`,
              indices: [
                "Relis le cahier des charges point par point : chaque ligne correspond à une balise que tu connais.",
              ],
            },
            reperes: {
              contenu: `<p>Construis la page d'accueil de ton site, et pose le titre des
                deux autres.</p>${CAHIER_SOMMAIRE}
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">Les balises dont tu auras besoin</span>
                  <code>&lt;title&gt;</code> ·
                  <code>&lt;h1&gt;</code> ·
                  <code>&lt;p&gt;</code> ·
                  <code>&lt;img src="…" alt="…"&gt;</code> ·
                  <code>&lt;ul&gt;</code> et <code>&lt;li&gt;</code> ·
                  <code>&lt;a href="…"&gt;…&lt;/a&gt;</code>
                </div>`,
              indices: [
                "Les liens du sommaire ne pointent pas vers l'extérieur : leur adresse est simplement le nom du fichier voisin, extension comprise.",
                "Chaque lien est rangé dans son propre élément de liste, et les deux éléments sont dans la même liste.",
                "N'oublie pas les <code>&lt;title&gt;</code> et les <code>&lt;h1&gt;</code> des deux autres onglets : ils font partie de cette étape.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Construis la page d'accueil de ton site. Les emplacements sont
                marqués par des commentaires dans <code>index.html</code> : remplace chacun
                d'eux par ce qu'il annonce.</p>${CAHIER_SOMMAIRE}
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>dans le <code>&lt;head&gt;</code>, écris le nom du métier entre les balises <code>&lt;title&gt;</code> ;</li>
                    <li>dans le <code>&lt;body&gt;</code>, écris le même nom dans un <code>&lt;h1&gt;</code> ;</li>
                    <li>écris en dessous un <code>&lt;p&gt;</code> qui présente le métier en une phrase ;</li>
                    <li>colle l'adresse d'une image dans un <code>&lt;img&gt;</code>, et décris-la dans son <code>alt</code> ;</li>
                    <li>ouvre un <code>&lt;ul&gt;</code>, mets-y deux <code>&lt;li&gt;</code>, et dans chacun un lien ;</li>
                    <li>passe aux onglets <code>presentation.html</code> et <code>etudes.html</code> pour y écrire leur titre.</li>
                  </ol>
                </div>`,
              fichiers: fichiers(
`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <!-- 1. le nom du métier, entre les deux balises title -->
    <title></title>
  </head>
  <body>
    <!-- 2. le nom du métier, dans un h1 -->

    <!-- 3. une phrase de présentation, dans un p -->

    <!-- 4. une image, avec son adresse et son texte alternatif -->

    <!-- 5. une liste à puces contenant deux liens :
            l'un vers presentation.html, l'autre vers etudes.html -->

  </body>
</html>
`,
`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <!-- 6. le titre de cette page, par exemple : Présentation du métier -->
    <title></title>
  </head>
  <body>
    <!-- 7. le même titre, dans un h1 -->

  </body>
</html>
`,
`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <!-- 8. le titre de cette page, par exemple : Les études -->
    <title></title>
  </head>
  <body>
    <!-- 9. le même titre, dans un h1 -->

  </body>
</html>
`, CSS_VIDE),
              indices: [
                "Commence par les commentaires 1, 2 et 3 : le titre de l'onglet, le titre visible, le paragraphe. Valide dans ta tête après chacun.",
                "Pour l'image, reprends la forme vue en séance 2 : une balise solitaire, deux attributs, chacun avec sa valeur entre guillemets.",
                "Pour les liens, l'adresse est le nom du fichier tel qu'il est écrit sur l'onglet — <code>presentation.html</code> et <code>etudes.html</code> — et le texte cliquable se place entre les deux balises du lien.",
              ],
            },
          },
        },

        {
          id: "p4", type: "code",
          titre: "La feuille de style commune",
          reprend: "p3",
          fichiers: fichiers(SOMMAIRE_FAIT, PRESENTATION_NUE, ETUDES_NUE, CSS_VIDE),
          apercu: "index.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "index.html n'est pas relié à style.css." },
              { fichier: "presentation.html", selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "presentation.html n'est pas relié à style.css." },
              { fichier: "etudes.html", selecteur: "head link",
                attributs: [{ nom: "rel", motif: "^stylesheet$" }, { nom: "href", motif: "^style\\.css$" }],
                message: "etudes.html n'est pas relié à style.css." },
            ],
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "\\S",
                message: "Il manque une couleur de fond sur body." },
              { selecteur: "body", propriete: "font-family", motif: "\\S",
                message: "Il manque une police sur body." },
              { selecteur: "body", propriete: "max-width", motif: "px",
                message: "Il manque une largeur maximale sur body." },
              { selecteur: "body", propriete: "margin", motif: "auto",
                message: "Il manque margin: auto sur body : c'est ce qui centre le contenu." },
              { selecteur: "body", propriete: "padding", motif: "px",
                message: "Il manque une marge intérieure sur body." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Les titres ne sont pas centrés." },
              { selecteur: "h1", propriete: "color", motif: "\\S",
                message: "Les titres n'ont pas de couleur choisie." },
              { selecteur: "a", propriete: "text-decoration", valeur: "none",
                message: "Les liens sont encore soulignés." },
            ],
          },
          solution: {
            "index.html": SOMMAIRE_LIE,
            "presentation.html": PRESENTATION_LIEE,
            "etudes.html": ETUDES_LIEE,
            "style.css": CSS_BASE,
          },
          felicitation: "Tes trois pages partagent la même identité. 🎨",
          apres: `<p>Circule entre les pages dans l'aperçu : elles doivent se ressembler,
            alors que tu n'as écrit ton habillage qu'une seule fois.</p>`,
          variantes: {
            autonome: {
              contenu: `<p>Donne à ton site son identité visuelle, dans une feuille de
                style commune aux trois pages.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>les <strong>trois</strong> pages sont reliées à <code>style.css</code> ;</li>
                    <li><code>body</code> : une couleur de fond, une police, une largeur maximale, centré, avec une marge intérieure ;</li>
                    <li>les <code>h1</code> centrés et colorés ;</li>
                    <li>les liens non soulignés.</li>
                  </ul>
                </div>`,
              indices: [
                "Une seule feuille de style, trois pages à relier : le CSS ne s'écrit qu'une fois.",
              ],
            },
            reperes: {
              contenu: `<p>Donne à ton site son identité visuelle, dans une feuille de
                style commune aux trois pages.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>les <strong>trois</strong> pages sont reliées à <code>style.css</code> ;</li>
                    <li><code>body</code> : une couleur de fond, une police, une largeur maximale, centré, avec une marge intérieure ;</li>
                    <li>les <code>h1</code> centrés et colorés ;</li>
                    <li>les liens non soulignés.</li>
                  </ul>
                </div>
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">Les propriétés attendues</span>
                  <code>background-color</code> · <code>font-family</code> ·
                  <code>max-width</code> · <code>margin</code> · <code>padding</code> ·
                  <code>text-align</code> · <code>color</code> ·
                  <code>text-decoration</code>
                </div>`,
              indices: [
                "Trois règles suffisent : une pour <code>body</code>, une pour <code>h1</code>, une pour <code>a</code>.",
                "La balise de liaison est la même dans les trois pages : écris-la une fois, recopie-la dans les deux autres onglets.",
                "Tant qu'une page n'est pas reliée, elle restera en noir sur blanc : c'est le meilleur moyen de repérer celle qu'on a oubliée.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Donne à ton site son identité visuelle, dans une feuille de
                style commune aux trois pages.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>les <strong>trois</strong> pages sont reliées à <code>style.css</code> ;</li>
                    <li><code>body</code> : une couleur de fond, une police, une largeur maximale, centré, avec une marge intérieure ;</li>
                    <li>les <code>h1</code> centrés et colorés ;</li>
                    <li>les liens non soulignés.</li>
                  </ul>
                </div>
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>dans le <code>&lt;head&gt;</code> de <code>index.html</code>, ajoute la balise
                        <code>&lt;link&gt;</code> qui pointe vers <code>style.css</code> ;</li>
                    <li>recopie exactement cette ligne dans le <code>&lt;head&gt;</code> des deux autres pages ;</li>
                    <li>dans <code>style.css</code>, écris une règle <code>body</code> avec
                        <code>background-color</code>, <code>font-family</code>,
                        <code>max-width</code>, <code>margin: auto</code> et <code>padding</code> ;</li>
                    <li>écris une règle <code>h1</code> avec <code>text-align</code> et <code>color</code> ;</li>
                    <li>écris une règle <code>a</code> avec <code>text-decoration: none</code>.</li>
                  </ol>
                </div>`,
              indices: [
                "La balise de liaison porte deux attributs : l'un annonce une feuille de style, l'autre donne le nom du fichier. Elle est solitaire, comme celle de l'image.",
                "Une règle CSS s'écrit toujours pareil : un sélecteur, une accolade ouvrante, des déclarations terminées par un point-virgule, une accolade fermante.",
                "Pour la largeur, une valeur autour de 700 pixels convient ; <code>margin: auto</code> répartit ensuite l'espace restant des deux côtés.",
              ],
            },
          },
        },

        {
          id: "p5", type: "cours",
          titre: "Point d'étape",
          contenu: `
            <p>Avant d'aller plus loin, vérifie dans l'aperçu que <strong>tout cela est
            vrai</strong> :</p>
            <div class="encadre">
              <ul>
                <li>le sommaire affiche le nom du métier, une image et deux liens ;</li>
                <li>cliquer sur le premier lien mène à <code>presentation.html</code> ;</li>
                <li>cliquer sur le second mène à <code>etudes.html</code> ;</li>
                <li>les trois pages ont le même fond, la même police, le même style de titre.</li>
              </ul>
            </div>
            <p>Il te manque encore le chemin du retour : pour l'instant, une fois sur une
            page, on ne peut plus revenir. C'est normal, on s'en occupe dans un instant.</p>
            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le réflexe à prendre</span>
              Vérifier <em>en cliquant</em>, pas seulement en lisant son code. Un lien qui
              a l'air juste et qui ne mène nulle part, cela arrive à tout le monde — une
              lettre en trop dans le nom du fichier suffit.
            </div>`,
          libelleBouton: "Passer à la page de présentation →",
        },
      ],
    },

    /* ========================================================= PARTIE 2 — PRÉSENTATION */
    {
      id: "application",
      titre: "Deuxième partie — La page de présentation",
      minutes: 40,
      etoiles: 2,
      intention: "la page qui raconte le métier au quotidien",
      etapes: [

        {
          id: "p6", type: "cours",
          titre: "Ce que doit contenir cette page",
          contenu: `
            <p>C'est la page principale de ton site : celle qui répond à « en quoi consiste
            ce métier ? ». Elle doit se lire d'une traite, sans être un bloc.</p>

            <div class="encadre">
              <span class="chapo">Le plan attendu</span>
              <ul>
                <li>un <code>&lt;h1&gt;</code> — le métier au quotidien ;</li>
                <li>un paragraphe d'introduction ;</li>
                <li>un <code>&lt;h2&gt;</code> « Où l'exerce-t-on ? » et son paragraphe ;</li>
                <li>un <code>&lt;h2&gt;</code> « Les missions » et une <strong>liste à puces</strong> de trois missions au moins ;</li>
                <li>une image et un lien vers ta source ;</li>
                <li>un lien de retour vers le sommaire.</li>
              </ul>
            </div>

            <p>Tu vas y arriver en trois temps : le texte d'abord, l'image et la source
            ensuite, la navigation pour finir. Écrire une page, c'est empiler des couches,
            pas tout réussir du premier coup.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Écris avec tes mots</span>
              Recopier une fiche métier mot pour mot ne t'apprend rien et se voit tout de
              suite. Lis, ferme l'onglet, puis écris ce que tu as retenu.
            </div>`,
        },

        {
          id: "p7", type: "code",
          titre: "Le contenu de la présentation",
          reprend: "p4",
          fichiers: fichiers(SOMMAIRE_LIE, PRESENTATION_LIEE, ETUDES_LIEE, CSS_BASE),
          apercu: "presentation.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "presentation.html", selecteur: "body h1", min: 1, max: 1, motsMin: 2,
                message: "La page de présentation doit garder un <h1>, et un seul.",
                messageMax: "Un seul <h1> par page." },
              { fichier: "presentation.html", selecteur: "body h2", min: 2, tous: true, motsMin: 2,
                message: "Il manque les deux sous-titres <h2> de la page de présentation.",
                messageDetail: "Chaque sous-titre doit faire au moins deux mots." },
              { fichier: "presentation.html", selecteur: "body p", min: 2, tous: true, motsMin: 8,
                message: "Il faut au moins deux paragraphes dans la page de présentation.",
                messageDetail: "Chaque paragraphe doit contenir au moins huit mots." },
              { fichier: "presentation.html", selecteur: "body ul li", min: 3, tous: true, motsMin: 2,
                message: "Il manque la liste à puces des missions : trois au moins.",
                messageDetail: "Chaque mission doit être décrite en deux mots au moins." },
            ],
          },
          solution: {
            "presentation.html": PRESENTATION_ECRITE,
          },
          felicitation: "La page raconte enfin quelque chose. ✅",
          variantes: {
            autonome: {
              contenu: `<p>Écris le contenu de <code>presentation.html</code> : un titre,
                deux sous-titres, au moins deux paragraphes de huit mots, et une liste à
                puces d'au moins trois missions.</p>`,
              indices: [
                "Reprends le plan de l'étape précédente et remplis-le dans l'ordre.",
              ],
            },
            reperes: {
              contenu: `<p>Écris le contenu de <code>presentation.html</code>.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>le <code>&lt;h1&gt;</code> existe déjà : garde-le ;</li>
                    <li>un paragraphe d'introduction d'au moins huit mots ;</li>
                    <li>deux <code>&lt;h2&gt;</code> : où on l'exerce, et les missions ;</li>
                    <li>un second paragraphe d'au moins huit mots ;</li>
                    <li>une liste à puces d'au moins trois missions.</li>
                  </ul>
                </div>`,
              indices: [
                "Chaque sous-titre annonce ce qui le suit : un <code>&lt;h2&gt;</code> est toujours suivi de quelque chose.",
                "Une mission par <code>&lt;li&gt;</code>, et tous les <code>&lt;li&gt;</code> dans le même <code>&lt;ul&gt;</code>.",
                "N'oublie pas de travailler dans le bon onglet : c'est <code>presentation.html</code> qu'il faut remplir, pas le sommaire.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Écris le contenu de <code>presentation.html</code>, dans l'ordre.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>ouvre l'onglet <code>presentation.html</code> ;</li>
                    <li>sous le <code>&lt;h1&gt;</code>, écris un <code>&lt;p&gt;</code> qui dit en une phrase ce que fait ce professionnel ;</li>
                    <li>écris un <code>&lt;h2&gt;</code> intitulé « Où l'exerce-t-on ? » ;</li>
                    <li>écris dessous un <code>&lt;p&gt;</code> qui énumère les lieux ;</li>
                    <li>écris un second <code>&lt;h2&gt;</code> intitulé « Les missions » ;</li>
                    <li>écris dessous un <code>&lt;ul&gt;</code> contenant trois <code>&lt;li&gt;</code>, un par mission.</li>
                  </ol>
                </div>
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">Rappel</span>
                  Chaque paragraphe doit faire au moins huit mots : une vraie phrase, pas
                  trois mots jetés.
                </div>`,
              indices: [
                "Fais-le point par point, et rafraîchis l'aperçu après chaque ajout : tu vois immédiatement si une balise est mal fermée.",
                "Les deux <code>&lt;h2&gt;</code> s'écrivent comme le <code>&lt;h1&gt;</code> déjà présent : seul le chiffre change.",
                "La liste des missions reprend exactement la forme de la liste des liens du sommaire : une balise d'ouverture, trois éléments, une fermeture.",
              ],
            },
          },
        },

        {
          id: "p8", type: "code",
          titre: "L'image et la source",
          reprend: "p7",
          fichiers: fichiers(SOMMAIRE_LIE, PRESENTATION_ECRITE, ETUDES_LIEE, CSS_BASE),
          apercu: "presentation.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "presentation.html", selecteur: "body img",
                attributs: [{ nom: "src", motif: "^https?://\\S{6,}" },
                            { nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "Il manque l'image de la présentation : une adresse web complète, et un alt d'au moins trois mots." },
              { fichier: "presentation.html", selecteur: "body p a",
                attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                message: "Il manque le lien vers ta source, dans un paragraphe, avec une adresse complète." },
              { fichier: "presentation.html", selecteur: "body a", motsMin: 2,
                messageDetail: "Le texte du lien doit dire où il mène, en deux mots au moins." },
              { fichier: "presentation.html", selecteur: "body ul li", min: 3,
                message: "Ne supprime pas la liste des missions." },
            ],
            absent: [
              { fichier: "presentation.html", motif: ">\\s*(ici|cliquez? ici|lien|source|clic)\\s*<", options: "i",
                message: "Le texte du lien doit nommer la source, pas se contenter de « ici » ou « source »." },
            ],
          },
          solution: {
            "presentation.html": PRESENTATION_ILLUSTREE,
          },
          felicitation: "Illustrée et sourcée : c'est une page sérieuse. 🖼",
          variantes: {
            autonome: {
              contenu: `<p>Ajoute à <code>presentation.html</code> une image avec son texte
                alternatif, et un paragraphe final qui cite ta source par un lien.</p>`,
              indices: [
                "Le texte du lien doit nommer le site, pas dire « ici ».",
              ],
            },
            reperes: {
              contenu: `<p>Ajoute à <code>presentation.html</code> :</p>
                <div class="encadre">
                  <ul>
                    <li>une <strong>image</strong> du métier, avec un <code>alt</code> d'au moins trois mots ;</li>
                    <li>un paragraphe final citant ta <strong>source</strong> par un lien
                        vers une adresse complète, dont le texte nomme le site.</li>
                  </ul>
                </div>`,
              indices: [
                "L'image se place là où elle a du sens : sous le titre, ou à côté du paragraphe qu'elle illustre.",
                "Le lien de la source pointe vers l'extérieur : son adresse commence par <code>https://</code>, contrairement à ceux du sommaire.",
                "Un texte de lien correct ressemble à « la fiche métier de l'Onisep » ; « cliquez ici » et « source » sont refusés.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Ajoute à <code>presentation.html</code> une image et la citation
                de ta source.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>ouvre l'onglet <code>presentation.html</code> ;</li>
                    <li>juste sous le <code>&lt;h1&gt;</code>, écris une balise <code>&lt;img&gt;</code> ;</li>
                    <li>colle dans son <code>src</code> l'adresse de l'image que tu as notée ;</li>
                    <li>écris dans son <code>alt</code> ce qu'on voit sur l'image, en trois mots au moins ;</li>
                    <li>tout en bas de la page, écris un <code>&lt;p&gt;</code> qui commence par « Source : » ;</li>
                    <li>dans ce paragraphe, écris un <code>&lt;a&gt;</code> dont le <code>href</code> est l'adresse de ta source, et dont le texte nomme le site.</li>
                  </ol>
                </div>`,
              indices: [
                "La balise de l'image est solitaire : elle ne se ferme pas, et ses deux attributs tiennent dans la même paire de chevrons, chacun avec sa valeur entre guillemets.",
                "Si l'image ne s'affiche pas, c'est presque toujours l'adresse : vérifie qu'elle se termine bien par le nom d'un fichier, avec son extension.",
                "Le lien, lui, se ferme : le texte cliquable se place entre la balise ouvrante et la balise fermante.",
              ],
            },
          },
        },

        {
          id: "p9", type: "code",
          titre: "Que la navigation tourne rond",
          reprend: "p8",
          fichiers: fichiers(SOMMAIRE_LIE, PRESENTATION_ILLUSTREE, ETUDES_LIEE, CSS_BASE),
          apercu: "presentation.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "presentation.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour au sommaire dans presentation.html." },
              { fichier: "etudes.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Il manque le lien de retour au sommaire dans etudes.html." },
              { fichier: "index.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^presentation\\.html$" }],
                message: "Le lien du sommaire vers presentation.html doit rester en place." },
              { fichier: "index.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^etudes\\.html$" }],
                message: "Le lien du sommaire vers etudes.html doit rester en place." },
              { fichier: "presentation.html", selecteur: "body img",
                attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+" }],
                message: "Ne supprime pas l'image de la page de présentation." },
            ],
          },
          solution: {
            "presentation.html": PRESENTATION_RELIEE,
            "etudes.html": ETUDES_RETOUR,
          },
          felicitation: "On peut faire le tour du site sans jamais rester coincé. 🔁",
          apres: `<p>Fais le tour dans l'aperçu : sommaire → présentation → sommaire →
            études → sommaire. Si un seul de ces clics échoue, le visiteur est bloqué.</p>`,
          variantes: {
            autonome: {
              contenu: `<p>Ajoute un lien de retour vers le sommaire dans
                <code>presentation.html</code> <strong>et</strong> dans
                <code>etudes.html</code>.</p>`,
              indices: [
                "Un site où l'on entre sans pouvoir sortir n'est pas un site.",
              ],
            },
            reperes: {
              contenu: `<p>Un visiteur arrivé sur une page doit pouvoir revenir au
                sommaire. Ajoute ce chemin de retour dans <strong>les deux</strong>
                pages.</p>
                <div class="encadre">
                  <ul>
                    <li>dans <code>presentation.html</code> : un lien vers <code>index.html</code> ;</li>
                    <li>dans <code>etudes.html</code> : le même.</li>
                  </ul>
                </div>`,
              indices: [
                "Le lien de retour se place en bas de page, dans son propre paragraphe.",
                "Les deux liens sont identiques : écris le premier, puis recopie-le dans l'autre onglet.",
                "Son adresse est le nom du fichier du sommaire, extension comprise.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Ajoute le chemin du retour dans les deux pages.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>ouvre l'onglet <code>presentation.html</code> ;</li>
                    <li>tout en bas, juste avant la fermeture du <code>&lt;body&gt;</code>, écris un <code>&lt;p&gt;</code> ;</li>
                    <li>dans ce paragraphe, écris un lien dont le <code>href</code> vaut <code>index.html</code> et dont le texte est « Retour au sommaire » ;</li>
                    <li>ouvre l'onglet <code>etudes.html</code> et fais exactement la même chose ;</li>
                    <li>dans l'aperçu, clique : sommaire, présentation, retour, études, retour.</li>
                  </ol>
                </div>`,
              indices: [
                "L'adresse d'un lien interne est le nom du fichier voisin : pas de <code>https://</code>, pas de chemin, juste le nom et son extension.",
                "Si le clic ne fait rien dans l'aperçu, compare lettre à lettre l'adresse écrite et le nom de l'onglet.",
                "N'oublie pas la seconde page : la validation regarde les deux.",
              ],
            },
          },
        },

        {
          id: "p10", type: "qcm",
          titre: "Relecture des liens",
          contenu: `<p>Un élève travaille sur <code>presentation.html</code> et veut
            revenir au sommaire, qui s'appelle <code>index.html</code> et se trouve dans le
            même dossier.</p>`,
          question: "Laquelle de ces écritures est correcte ?",
          options: [
            {
              texte: `<code>&lt;a href="https://index.html"&gt;Retour&lt;/a&gt;</code>`,
              explication: "Non : <code>https://</code> annonce une adresse ailleurs sur le web. Ici, la page est juste à côté.",
            },
            {
              texte: `<code>&lt;a href="index.html"&gt;Retour au sommaire&lt;/a&gt;</code>`,
              correct: true,
              explication: "Oui : le nom du fichier voisin suffit, extension comprise. Et le texte dit où l'on va.",
            },
            {
              texte: `<code>&lt;a href="index"&gt;Retour au sommaire&lt;/a&gt;</code>`,
              explication: "Non : l'extension fait partie du nom du fichier. Sans <code>.html</code>, le navigateur cherche un fichier qui n'existe pas.",
            },
          ],
          apres: `<span class="chapo">La règle</span> Dans le même dossier, on écrit le nom du
            fichier, rien de plus. On ne met <code>https://</code> que pour sortir de son
            propre site.`,
        },
      ],
    },

    /* ================================================ PARTIE 3 — LES ÉTUDES ET LA FIN */
    {
      id: "defis",
      titre: "Troisième partie — Les études, et les finitions",
      minutes: 40,
      etoiles: 3,
      intention: "terminer le site et le relire comme un professionnel",
      etapes: [

        {
          id: "p11", type: "cours",
          titre: "La dernière page",
          contenu: `
            <p>C'est la page la plus utile de ton site : celle qui répond à « comment
            fait-on pour y arriver ? ».</p>

            <div class="encadre">
              <span class="chapo">Le plan attendu</span>
              <ul>
                <li>le <code>&lt;h1&gt;</code> et le lien de retour existent déjà ;</li>
                <li>un <code>&lt;h2&gt;</code> « Le parcours après le bac », suivi d'une
                    <strong>liste numérotée</strong> de trois étapes au moins ;</li>
                <li>un <code>&lt;h2&gt;</code> « Les qualités attendues », suivi d'une
                    <strong>liste à puces</strong> de trois qualités au moins ;</li>
                <li>un paragraphe citant ta source par un lien.</li>
              </ul>
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Pourquoi une liste numérotée ici</span>
              Parce que l'ordre compte : on ne candidate pas avant d'avoir le bac. Une
              liste à puces dirait que les étapes sont interchangeables — ce qui serait
              faux. Le choix de la balise est déjà une information.
            </div>`,
        },

        {
          id: "p12", type: "code",
          titre: "Le contenu de la page des études",
          reprend: "p9",
          fichiers: fichiers(SOMMAIRE_LIE, PRESENTATION_RELIEE, ETUDES_RETOUR, CSS_BASE),
          apercu: "etudes.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "etudes.html", selecteur: "body h1", min: 1, max: 1, motsMin: 2,
                message: "La page des études doit garder un <h1>, et un seul.",
                messageMax: "Un seul <h1> par page." },
              { fichier: "etudes.html", selecteur: "body h2", min: 2, tous: true, motsMin: 2,
                message: "Il manque les deux sous-titres <h2> de la page des études.",
                messageDetail: "Chaque sous-titre doit faire au moins deux mots." },
              { fichier: "etudes.html", selecteur: "body ol li", min: 3, tous: true, motsMin: 3,
                message: "Il manque la liste numérotée du parcours après le bac : trois étapes au moins.",
                messageDetail: "Chaque étape doit être décrite en trois mots au moins." },
              { fichier: "etudes.html", selecteur: "body ul li", min: 3, tous: true, motsMin: 2,
                message: "Il manque la liste à puces des qualités attendues : trois au moins." },
              { fichier: "etudes.html", selecteur: "body p a",
                attributs: [{ nom: "href", motif: "^https?://\\S{4,}" }],
                message: "Il manque le lien vers ta source dans la page des études." },
              { fichier: "etudes.html", selecteur: "body a",
                attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "Ne supprime pas le lien de retour au sommaire." },
            ],
            absent: [
              { fichier: "etudes.html", motif: "<li>\\s*\\d+\\s*[.)]",
                message: "N'écris pas les numéros toi-même : la liste numérotée s'en charge." },
            ],
          },
          solution: {
            "etudes.html": ETUDES_ECRITE,
          },
          felicitation: "Les trois pages de ton site sont écrites. 🎉",
          variantes: {
            autonome: {
              contenu: `<p>Écris le contenu de <code>etudes.html</code> : deux sous-titres,
                une liste numérotée du parcours après le bac, une liste à puces des
                qualités attendues, et un lien vers ta source.</p>`,
              indices: [
                "L'ordre compte pour le parcours, pas pour les qualités : à toi de choisir la bonne balise pour chaque liste.",
              ],
            },
            reperes: {
              contenu: `<p>Écris le contenu de <code>etudes.html</code>.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>un <code>&lt;h2&gt;</code> « Le parcours après le bac » et une liste
                        <strong>numérotée</strong> de trois étapes ;</li>
                    <li>un <code>&lt;h2&gt;</code> « Les qualités attendues » et une liste
                        <strong>à puces</strong> de trois qualités ;</li>
                    <li>un paragraphe citant ta source par un lien ;</li>
                    <li>le lien de retour reste en place.</li>
                  </ul>
                </div>`,
              indices: [
                "Les deux listes n'utilisent pas la même balise d'ouverture : l'une numérote, l'autre non.",
                "Le paragraphe de la source se construit comme celui de la page de présentation.",
                "Ne réécris pas les numéros du parcours à la main : la balise s'en charge.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Écris le contenu de <code>etudes.html</code>, dans l'ordre.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>ouvre l'onglet <code>etudes.html</code> ;</li>
                    <li>sous le <code>&lt;h1&gt;</code>, écris un <code>&lt;h2&gt;</code> intitulé « Le parcours après le bac » ;</li>
                    <li>écris dessous un <code>&lt;ol&gt;</code> contenant trois <code>&lt;li&gt;</code>, un par étape, sans écrire les numéros ;</li>
                    <li>écris un second <code>&lt;h2&gt;</code> intitulé « Les qualités attendues » ;</li>
                    <li>écris dessous un <code>&lt;ul&gt;</code> contenant trois <code>&lt;li&gt;</code>, une qualité par élément ;</li>
                    <li>avant le lien de retour, ajoute un <code>&lt;p&gt;</code> qui cite ta source par un lien.</li>
                  </ol>
                </div>`,
              indices: [
                "La liste numérotée s'ouvre par une balise de deux lettres ; la liste à puces par une autre de deux lettres. Les éléments, eux, s'écrivent pareil dans les deux cas.",
                "Si tu vois « 1. 1. » dans l'aperçu, c'est que tu as écrit les numéros en plus de ceux que la balise produit.",
                "Le lien de la source pointe vers l'extérieur : son adresse commence par <code>https://</code>.",
              ],
            },
          },
        },

        {
          id: "p13", type: "code",
          titre: "Les finitions",
          reprend: "p12",
          fichiers: fichiers(SOMMAIRE_LIE, PRESENTATION_RELIEE, ETUDES_ECRITE, CSS_BASE),
          apercu: "index.html",
          telechargeable: true,
          validation: {
            contient: [
              { fichier: "style.css", motif: "^\\s*\\.[a-zA-Z][\\w-]*\\s*[,{]", options: "m",
                message: "Il manque une règle de classe dans style.css : son sélecteur commence par un point." },
            ],
            elements: [
              { fichier: "index.html", selecteur: "body [class]", min: 1,
                message: "Aucun élément de index.html ne porte l'attribut class." },
            ],
            styles: [
              { selecteur: "h2", propriete: "color", motif: "\\S",
                page: "presentation.html",
                message: "Il manque une couleur pour les sous-titres <h2>." },
              { selecteur: "ul", propriete: "border", motif: "px",
                page: "presentation.html",
                message: "Il manque une bordure autour des listes à puces." },
              { selecteur: "ul", propriete: "padding", motif: "px",
                page: "presentation.html",
                message: "Il manque une marge intérieure sur les listes à puces." },
              { selecteur: "body [class]", propriete: "background-color", motif: "\\S",
                page: "index.html",
                message: "Ta classe doit poser une couleur de fond.",
                messageCible: "Aucun élément de index.html ne porte de class à styler." },
              { selecteur: "body [class]", propriete: "border", motif: "px",
                page: "index.html",
                message: "Ta classe doit poser une bordure." },
              { selecteur: "body [class]", propriete: "padding", motif: "px",
                page: "index.html",
                message: "Ta classe doit poser une marge intérieure." },
            ],
          },
          solution: {
            "index.html": SOMMAIRE_LIE.replace(
              "    <p>Un métier de soin",
              "    <p class=\"essentiel\">Un métier de soin"),
            "style.css": CSS_FINAL,
          },
          felicitation: "Ton site a une vraie identité visuelle. 🎨",
          variantes: {
            autonome: {
              contenu: `<p>Termine l'habillage : une couleur pour les <code>&lt;h2&gt;</code>,
                les listes à puces encadrées, et <strong>une classe de ton invention</strong>
                appliquée à un élément du sommaire, avec un fond, une bordure et une marge
                intérieure.</p>`,
              indices: [
                "Une classe qui dit ce que le contenu est vieillit mieux qu'une classe qui dit de quoi il a l'air.",
              ],
            },
            reperes: {
              contenu: `<p>Termine l'habillage de ton site.</p>
                <div class="encadre">
                  <span class="chapo">Le cahier des charges</span>
                  <ul>
                    <li>les <code>&lt;h2&gt;</code> reçoivent une couleur ;</li>
                    <li>les listes à puces <code>&lt;ul&gt;</code> reçoivent une bordure et une marge intérieure ;</li>
                    <li>tu inventes une <strong>classe</strong>, tu la poses sur un élément
                        de <code>index.html</code>, et tu lui donnes un fond, une bordure
                        et une marge intérieure.</li>
                  </ul>
                </div>`,
              indices: [
                "La classe se pose en HTML, dans la balise ouvrante, et se vise en CSS avec un point devant son nom.",
                "Un bon candidat pour cette classe : le paragraphe de présentation du sommaire, qu'on veut détacher du reste.",
                "Choisis un nom qui dit ce que l'élément est — <code>essentiel</code>, <code>intro</code> — plutôt que de quoi il a l'air.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Termine l'habillage de ton site.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>dans <code>style.css</code>, ajoute une règle <code>h2</code> avec une <code>color</code> ;</li>
                    <li>ajoute une règle <code>ul</code> avec une <code>border</code> et un <code>padding</code> ;</li>
                    <li>ouvre <code>index.html</code> et ajoute <code>class="essentiel"</code>
                        dans la balise ouvrante du paragraphe de présentation ;</li>
                    <li>dans <code>style.css</code>, écris une règle dont le sélecteur est
                        <code>.essentiel</code> ;</li>
                    <li>donne-lui une <code>background-color</code>, une <code>border</code>
                        et un <code>padding</code>.</li>
                  </ol>
                </div>`,
              indices: [
                "L'attribut de classe s'écrit comme les autres attributs : son nom, un signe égal, sa valeur entre guillemets, dans la balise ouvrante.",
                "Le point ne s'écrit que du côté CSS. Dans le HTML, la valeur est le nom seul.",
                "Si la règle ne produit rien, vérifie dans l'ordre : le point du sélecteur, l'orthographe du nom, puis la ponctuation de la règle.",
              ],
            },
          },
        },

        {
          id: "p14", type: "code",
          titre: "La relecture d'accessibilité",
          reprend: "p13",
          fichiers: fichiers(
            SOMMAIRE_LIE.replace("    <p>Un métier de soin", "    <p class=\"essentiel\">Un métier de soin")
                        .replace('alt="Image à remplacer par une photo du métier"', 'alt=""'),
            PRESENTATION_RELIEE.replace(
              '<a href="https://www.onisep.fr">la fiche métier de l\'Onisep</a>',
              '<a href="https://www.onisep.fr">ici</a>'),
            ETUDES_ECRITE, CSS_FINAL),
          apercu: "index.html",
          telechargeable: true,
          validation: {
            elements: [
              { fichier: "index.html", selecteur: "img", tous: true,
                attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "Une image de index.html n'a pas de texte alternatif utilisable : décris ce qu'on y voit, en trois mots au moins." },
              { fichier: "presentation.html", selecteur: "img", tous: true,
                attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "Une image de presentation.html n'a pas de texte alternatif utilisable." },
              { fichier: "index.html", selecteur: "a", tous: true, motsMin: 2,
                message: "Un lien de index.html a un texte trop court pour dire où il mène." },
              { fichier: "presentation.html", selecteur: "a", tous: true, motsMin: 2,
                message: "Un lien de presentation.html a un texte trop court pour dire où il mène." },
              { fichier: "etudes.html", selecteur: "a", tous: true, motsMin: 2,
                message: "Un lien de etudes.html a un texte trop court pour dire où il mène." },
              { fichier: "index.html", selecteur: "h1", min: 1, max: 1,
                message: "index.html doit avoir un <h1>, et un seul.",
                messageMax: "index.html doit avoir un <h1>, et un seul." },
              { fichier: "presentation.html", selecteur: "h1", min: 1, max: 1,
                message: "presentation.html doit avoir un <h1>, et un seul.",
                messageMax: "presentation.html doit avoir un <h1>, et un seul." },
              { fichier: "etudes.html", selecteur: "h1", min: 1, max: 1,
                message: "etudes.html doit avoir un <h1>, et un seul.",
                messageMax: "etudes.html doit avoir un <h1>, et un seul." },
            ],
            absent: [
              { fichier: "*", motif: ">\\s*(ici|cliquez? ici|lien|clic|source|voir)\\s*<", options: "i",
                message: "Un texte de lien ne dit pas où il mène : remplace-le par le nom de la page ou du site visé." },
              { fichier: "*", motif: "alt\\s*=\\s*\"\\s*(image|photo|img|dessin)?\\s*\"", options: "i",
                message: "Un alt est vide, ou ne dit que « image » : décris ce que l'image montre." },
            ],
          },
          solution: {
            "index.html": SOMMAIRE_LIE.replace(
              "    <p>Un métier de soin", "    <p class=\"essentiel\">Un métier de soin"),
            "presentation.html": PRESENTATION_RELIEE,
          },
          felicitation: "Ton site est utilisable par tout le monde. ♿",
          apres: `<p>Ces trois points — un <code>alt</code> qui décrit, un texte de lien qui
            annonce, un plan de titres cohérent — sont exactement ce qu'un auditeur
            d'accessibilité regarde en premier sur un vrai site.</p>`,
          variantes: {
            autonome: {
              contenu: `<p>Relis ton site du point de vue d'une personne qui ne voit pas
                l'écran : chaque image doit être décrite, chaque lien doit annoncer sa
                destination, chaque page doit avoir un titre principal et un seul.</p>`,
              indices: [
                "Lis ta page à voix haute en ne prononçant que le texte et les alt : ce que tu entends, c'est ce qu'elle entend.",
              ],
            },
            reperes: {
              contenu: `<p>Relis ton site du point de vue d'une personne aveugle, dont le
                lecteur d'écran ne prononce que le texte, les <code>alt</code> et les
                textes de liens.</p>
                <div class="encadre">
                  <span class="chapo">Les trois points à vérifier</span>
                  <ul>
                    <li>chaque image a un <code>alt</code> qui <strong>décrit</strong> ce qu'on voit, en trois mots au moins ;</li>
                    <li>aucun lien ne dit « ici », « lien » ou « source » : chacun nomme sa destination ;</li>
                    <li>chaque page a un <code>&lt;h1&gt;</code>, et un seul.</li>
                  </ul>
                </div>`,
              indices: [
                "Passe les trois onglets HTML en revue, un par un : la validation les regarde tous les trois.",
                "Un <code>alt</code> vide et un <code>alt</code> qui dit « image » sont aussi inutiles l'un que l'autre.",
                "Pour un lien, la bonne question est : « si je n'entends que ces mots, est-ce que je sais où je vais ? »",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Relis ton site du point de vue d'une personne aveugle.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>ouvre <code>index.html</code> et regarde chaque balise <code>&lt;img&gt;</code> :
                        son <code>alt</code> décrit-il ce qu'on voit, en trois mots au moins ? Sinon, réécris-le ;</li>
                    <li>fais de même dans <code>presentation.html</code> ;</li>
                    <li>relis tous les liens des trois pages : si le texte est « ici », « source » ou « lien », remplace-le par le nom de la page ou du site visé ;</li>
                    <li>vérifie enfin que chaque page contient exactement un <code>&lt;h1&gt;</code>.</li>
                  </ol>
                </div>`,
              indices: [
                "Un bon <code>alt</code> répond à « qu'est-ce que je verrais si je voyais l'image ? ». Trois ou quatre mots suffisent.",
                "Pour les liens, remplace le mot vide par le nom du site : « la fiche métier de l'Onisep » plutôt que « ici ».",
                "Les messages de validation nomment le fichier concerné : corrige-les un par un, en revalidant après chacun.",
              ],
            },
          },
        },

        {
          id: "p15", type: "code",
          titre: "La livraison",
          reprend: "p14",
          fichiers: fichiers(
            SOMMAIRE_LIE.replace("    <p>Un métier de soin", "    <p class=\"essentiel\">Un métier de soin"),
            PRESENTATION_RELIEE, ETUDES_ECRITE, CSS_BASE),
          apercu: "index.html",
          telechargeable: true,
          validation: {
            contient: [
              { fichier: "style.css", motif: "^\\s*\\.[a-zA-Z][\\w-]*\\s*[,{]", options: "m",
                message: "La règle de classe a disparu de style.css." },
            ],
            elements: [
              { fichier: "index.html", selecteur: "head link", attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "index.html n'est plus reliée à style.css." },
              { fichier: "presentation.html", selecteur: "head link", attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "presentation.html n'est plus reliée à style.css." },
              { fichier: "etudes.html", selecteur: "head link", attributs: [{ nom: "href", motif: "^style\\.css$" }],
                message: "etudes.html n'est plus reliée à style.css." },

              { fichier: "index.html", selecteur: "body h1", min: 1, max: 1, motsMin: 2,
                message: "Le sommaire doit avoir un <h1>.", messageMax: "Un seul <h1> par page." },
              { fichier: "index.html", selecteur: "body p", motsMin: 8,
                message: "Le sommaire doit garder son paragraphe de présentation." },
              { fichier: "index.html", selecteur: "body img",
                attributs: [{ nom: "src", motif: "^https?://" }, { nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "Le sommaire doit garder son image, son adresse web et son texte alternatif." },
              { fichier: "index.html", selecteur: "body ul li a", min: 2,
                message: "Le sommaire doit garder ses deux liens de navigation." },
              { fichier: "index.html", selecteur: "body [class]", min: 1,
                message: "L'élément portant ta classe a disparu du sommaire." },

              { fichier: "presentation.html", selecteur: "body h2", min: 2,
                message: "La page de présentation doit garder ses deux sous-titres." },
              { fichier: "presentation.html", selecteur: "body ul li", min: 3,
                message: "La page de présentation doit garder sa liste de missions." },
              { fichier: "presentation.html", selecteur: "body img", attributs: [{ nom: "alt", motif: "\\S+\\s+\\S+\\s+\\S+" }],
                message: "La page de présentation doit garder son image décrite." },
              { fichier: "presentation.html", selecteur: "body a", attributs: [{ nom: "href", motif: "^https?://" }],
                message: "La page de présentation doit garder le lien vers sa source." },
              { fichier: "presentation.html", selecteur: "body a", attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "La page de présentation doit garder son lien de retour." },

              { fichier: "etudes.html", selecteur: "body h2", min: 2,
                message: "La page des études doit garder ses deux sous-titres." },
              { fichier: "etudes.html", selecteur: "body ol li", min: 3,
                message: "La page des études doit garder sa liste numérotée du parcours." },
              { fichier: "etudes.html", selecteur: "body ul li", min: 3,
                message: "La page des études doit garder sa liste de qualités." },
              { fichier: "etudes.html", selecteur: "body a", attributs: [{ nom: "href", motif: "^https?://" }],
                message: "La page des études doit garder le lien vers sa source." },
              { fichier: "etudes.html", selecteur: "body a", attributs: [{ nom: "href", motif: "^index\\.html$" }],
                message: "La page des études doit garder son lien de retour." },
            ],
            styles: [
              { selecteur: "body", propriete: "background-color", motif: "\\S",
                message: "L'habillage de body a disparu." },
              { selecteur: "h1", propriete: "text-align", valeur: "center",
                message: "Les titres ne sont plus centrés." },
              { selecteur: "h2", propriete: "color", motif: "\\S", page: "presentation.html",
                message: "La couleur des sous-titres a disparu." },
              { selecteur: "ul", propriete: "border", motif: "px", page: "presentation.html",
                message: "La bordure des listes a disparu." },
              { selecteur: "body [class]", propriete: "border", motif: "px", page: "index.html",
                message: "La bordure de ta classe a disparu.",
                messageCible: "L'élément portant ta classe a disparu du sommaire." },
            ],
          },
          solution: {
            "style.css": CSS_FINAL,
          },
          felicitation: "Ton site est complet, cohérent et conforme au cahier des charges. 🎉🎉",
          apres: `<p>Cette étape a tout revérifié d'un coup : les quatre fichiers, les
            liens dans les deux sens, l'habillage et l'accessibilité. C'est exactement ce
            qu'on appelle une <strong>recette</strong> dans un vrai projet — la vérification
            finale avant livraison.</p>`,
          variantes: {
            autonome: {
              contenu: `<p>Dernière étape : la vérification complète. Cette validation
                reprend <strong>tout</strong> le cahier des charges du projet, sur les
                quatre fichiers à la fois.</p>
                <p>Si quelque chose s'est perdu en route, c'est maintenant qu'on le voit.</p>`,
              indices: [
                "Les messages nomment le fichier et l'élément manquant : traite-les un par un, du haut vers le bas.",
              ],
            },
            reperes: {
              contenu: `<p>Dernière étape : la vérification complète, sur les quatre
                fichiers à la fois.</p>
                <div class="encadre">
                  <span class="chapo">Ce qui est revérifié</span>
                  <ul>
                    <li>les trois pages reliées à la feuille de style ;</li>
                    <li>le sommaire : titre, paragraphe, image décrite, deux liens, ta classe ;</li>
                    <li>la présentation : deux sous-titres, la liste des missions, l'image, la source, le retour ;</li>
                    <li>les études : deux sous-titres, la liste numérotée, la liste des qualités, la source, le retour ;</li>
                    <li>l'habillage : body, titres centrés, sous-titres colorés, listes encadrées, ta classe.</li>
                  </ul>
                </div>`,
              indices: [
                "Rien de nouveau n'est demandé ici : tout a déjà été fait. S'il manque quelque chose, c'est qu'une étape l'a perdu en chemin.",
                "Le bouton <strong>↩ Reprendre mon site</strong> recopie ici ton travail de l'étape précédente, si l'atelier ne s'était pas ouvert dessus.",
                "Traite les messages du haut vers le bas, en revalidant après chaque correction.",
              ],
            },
            "pas-a-pas": {
              contenu: `<p>Dernière étape : la vérification complète, sur les quatre
                fichiers à la fois.</p>
                <div class="encadre">
                  <span class="chapo">La marche à suivre</span>
                  <ol>
                    <li>clique sur <strong>Valider</strong> tout de suite, sans rien changer ;</li>
                    <li>lis le <strong>premier</strong> message seulement : il nomme le fichier et ce qui manque ;</li>
                    <li>ouvre cet onglet, corrige, revalide ;</li>
                    <li>recommence jusqu'à ce qu'il n'y ait plus de message.</li>
                  </ol>
                </div>
                <div class="encadre" data-ton="astuce">
                  <span class="chapo">C'est la bonne méthode</span>
                  Corriger une erreur à la fois et revalider, c'est ainsi que travaillent
                  les développeurs. Vouloir tout corriger d'un coup, c'est le meilleur
                  moyen d'en ajouter.
                </div>`,
              indices: [
                "Ne change rien avant d'avoir validé une première fois : tu sauras alors exactement ce qui manque.",
                "Chaque message commence par le nom du fichier concerné : va dans cet onglet-là, et nulle part ailleurs.",
                "Si un message parle d'une chose que tu croyais avoir faite, c'est qu'elle a été perdue en recopiant : le bouton <strong>↩ Reprendre mon site</strong> peut te la rendre.",
              ],
            },
          },
        },

        {
          id: "p16", type: "cours",
          titre: "Rendre ton site, et le mettre en ligne",
          contenu: `
            <p>Ton site est terminé. Deux choses avant de fermer.</p>

            <p><strong>1. Rends ton site.</strong> Remonte à l'étape précédente,
            <em>La livraison</em>, et clique sur <strong>⬇ Télécharger mon site</strong>.
            Tu obtiens une archive <strong>NOM_Prenom.zip</strong> contenant tes quatre
            fichiers. C'est ce fichier-là qu'il faut rendre.</p>

            <div class="encadre" data-ton="attention">
              <span class="chapo">Si le bouton refuse</span>
              C'est qu'il ne connaît pas encore ton nom : ouvre le menu <strong>☰</strong>
              en haut à droite, remplis <em>Mon nom</em> et <em>Mon prénom</em>, referme,
              et recommence.
            </div>

            <p><strong>2. Sauvegarde ta progression.</strong> Dans le même menu
            <strong>☰</strong>, <em>Télécharger ma progression</em> enregistre tout ce que
            tu as écrit dans ce parcours, les quatre séances comprises. C'est ce fichier
            qu'on redépose si tu changes de poste.</p>

            <p><strong>3. Ouvre ton site pour de vrai.</strong> Décompresse l'archive :
            tu retrouves tes quatre fichiers, côte à côte, exactement comme ceci :</p>

            <pre class="bloc-code"><code>mon-site/
├── index.html
├── presentation.html
├── etudes.html
└── style.css</code></pre>

            <p>Double-clique sur <code>index.html</code> : ton site s'ouvre dans ton
            navigateur, les liens marchent, la feuille de style s'applique. C'est déjà un
            site web complet — il lui manque seulement un serveur pour que d'autres que toi
            puissent le voir.</p>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Le test qui ne trompe pas</span>
              Si, une fois décompressée, une image n'apparaît plus, c'est qu'elle était
              désignée par un chemin vers un fichier au lieu d'une adresse
              <code>https://</code>. Corrige-la et retélécharge.
            </div>

            <div class="encadre" data-ton="astuce">
              <span class="chapo">Ce que tu sais faire, maintenant</span>
              <ul>
                <li>structurer un document avec des balises, et lire une erreur ;</li>
                <li>relier des pages entre elles, et comprendre une adresse ;</li>
                <li>séparer le contenu de la présentation ;</li>
                <li>écrire du CSS et viser précisément ce que tu veux changer ;</li>
                <li>relire ton travail comme quelqu'un qui ne l'a pas écrit.</li>
              </ul>
              La dernière ligne est la plus difficile, et c'est celle qui sert le plus.
            </div>`,
          libelleBouton: "Terminer le parcours 🎉",
        },
      ],
    },
  ],
};

/* Banc de test des parcours « web » (HTML / CSS).
 *
 * Usage : node tools/parcours/verifier_web.mjs parcours-web [s01]
 *
 * Pour chaque étape de code :
 *   1. la solution officielle passe sa propre validation ;
 *   2. le code de départ ne la passe PAS déjà (sinon l'exercice est offert) ;
 *   3. idem pour chaque variante d'accompagnement du projet final ;
 *   4. la solution ne contient aucune erreur de syntaxe HTML ou CSS.
 * Pour chaque QCM : une bonne réponse et une seule.
 * Une fois pour tout le parcours : le script que le moteur injecte dans chaque
 * aperçu se compile, et gère les liens comme prévu.
 *
 * Il partage `docs/parcours/web-verif.js` avec le navigateur : ce qui passe ici
 * passe chez l'élève, au caractère près.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ICI = dirname(fileURLToPath(import.meta.url));
const DOCS = join(ICI, "..", "..", "docs");

/* Le dépôt n'est pas un paquet ESM : on évalue les modules depuis une URL data:,
   comme le fait extraire.mjs pour les parcours Python. */
async function importer(chemin) {
  const source = readFileSync(chemin, "utf8");
  return import("data:text/javascript;charset=utf-8," + encodeURIComponent(source));
}

const V = await importer(join(DOCS, "parcours", "web-verif.js"));

const ORDRE_AIDE = ["pas-a-pas", "reperes", "autonome"];

function appliquerNiveau(etape, niveau) {
  if (!etape.variantes) return etape;
  const depart = ORDRE_AIDE.indexOf(niveau);
  const ordreDeRepli = [
    ...ORDRE_AIDE.slice(0, depart + 1).reverse(),
    ...ORDRE_AIDE.slice(depart + 1),
  ];
  for (const candidat of ordreDeRepli) {
    const variante = etape.variantes[candidat];
    if (variante) return { ...etape, ...variante, validation: etape.validation };
  }
  return etape;
}

const sourcesDepart = (etape) =>
  Object.fromEntries(etape.fichiers.map((f) => [f.nom, f.depart ?? ""]));

const sourcesSolution = (etape) => ({ ...sourcesDepart(etape), ...(etape.solution || {}) });

function erreursDeSyntaxe(sources) {
  const messages = [];
  for (const [nom, src] of Object.entries(sources)) {
    const a = /\.css$/i.test(nom) ? V.analyserCSS(src) : V.analyserHTML(src);
    for (const e of a.erreurs) messages.push(`${nom} — ${e.message}`);
  }
  return messages;
}

/* Les champs de prose sont injectés en innerHTML par le moteur. Écrire <h1> dans
   une explication de QCM y crée donc un VRAI titre de niveau 1, avec sa taille
   géante, au milieu du bouton. Une balise citée doit s'écrire échappée, dans un
   <code> : <code>&lt;h1&gt;</code>. Ce contrôle est là parce que la faute est
   passée une première fois. */
const MISE_EN_FORME = /<\/?(?:code|strong|em|b|i|kbd|br|span)\b[^>]*>/gi;
const BALISES_INTERDITES = /<\/?(?:h[1-6]|title|html|head|body|meta|link|img|a|script|style|form|input)\b[^>]*>/gi;

function fautesDeProse(etape) {
  const fautes = [];

  // Prose courte : rien d'autre que de la mise en forme n'a de raison d'y être.
  const stricts = [
    ["question", etape.question],
    ...(etape.options || []).flatMap((o, i) => [
      [`option ${i + 1}`, o.texte], [`explication ${i + 1}`, o.explication],
    ]),
    ...(etape.indices || []).map((t, i) => [`indice ${i + 1}`, t]),
    ["felicitation", etape.felicitation],
  ];
  for (const [champ, texte] of stricts) {
    if (!texte) continue;
    const reste = String(texte).replace(MISE_EN_FORME, "");
    const balise = /<[a-zA-Z!/]/.exec(reste);
    if (balise) {
      fautes.push(`${champ} : « ${reste.slice(balise.index, balise.index + 24)} » — ` +
                  "une balise citée s'écrit échappée dans un <code>, sinon elle s'affiche pour de vrai");
    }
  }

  // Contenus riches : le HTML de mise en page y est légitime, mais pas une
  // balise de document, qui ne peut être qu'une citation mal échappée.
  for (const [champ, texte] of [["contenu", etape.contenu], ["apres", etape.apres]]) {
    if (!texte) continue;
    const trouve = String(texte).match(BALISES_INTERDITES);
    if (trouve) fautes.push(`${champ} : ${trouve[0]} s'affichera comme une vraie balise — échappe-la`);
  }
  return fautes;
}

async function verifierSeance(parcours, id, nbEtapesAnnonce) {
  const def = (await importer(join(DOCS, parcours, "seances", `${id}.js`))).default;
  const etapes = def.parties.flatMap((p) => p.etapes);
  console.log(`\n═══ Séance ${def.numero} — ${def.titre} (${etapes.length} étapes) ═══`);

  const soucis = [];
  if (nbEtapesAnnonce != null && nbEtapesAnnonce !== etapes.length) {
    soucis.push(`le manifeste annonce ${nbEtapesAnnonce} étapes, le fichier en contient ${etapes.length}`);
  }

  for (const etape of etapes) {
    const nom = `${etape.id.padStart(3)} ${String(etape.titre).slice(0, 46).padEnd(46)}`;

    // Un projet adaptatif doit couvrir les trois niveaux : le repli est un filet,
    // pas une façon d'écrire une séance.
    if (etape.variantes) {
      const manquants = ORDRE_AIDE.filter((n) => !etape.variantes[n]);
      if (manquants.length) {
        soucis.push(`${etape.id} : variantes manquantes — ${manquants.join(", ")}`);
        console.log(`  ✗ ${nom} variantes manquantes : ${manquants.join(", ")}`);
        continue;
      }
    }

    // La prose est contrôlée sur chaque niveau : les variantes ont leur propre
    // énoncé et leurs propres indices, et c'est là qu'une balise mal échappée passe.
    const aControler = etape.variantes
      ? ORDRE_AIDE.map((n) => [`${n} · `, appliquerNiveau(etape, n)])
      : [["", etape]];
    const prose = aControler.flatMap(([prefixe, e]) =>
      fautesDeProse(e).map((f) => prefixe + f));
    if (prose.length) {
      for (const f of prose) soucis.push(`${etape.id} : ${f}`);
      console.log(`  ✗ ${nom} ${prose[0]}`);
      continue;
    }

    if (etape.type === "qcm" || etape.type === "prediction") {
      const justes = (etape.options || []).filter((o) => o.correct).length;
      const sansExplication = (etape.options || []).filter((o) => !o.explication).length;
      if (justes !== 1) {
        soucis.push(`${etape.id} : ${justes} bonne(s) réponse(s) au lieu d'une`);
        console.log(`  ✗ ${nom} ${justes} bonnes réponses`);
      } else if (sansExplication) {
        soucis.push(`${etape.id} : ${sansExplication} option(s) sans explication`);
        console.log(`  ✗ ${nom} ${sansExplication} option(s) sans explication`);
      } else {
        console.log(`  ✓ ${nom} QCM`);
      }
      continue;
    }

    if (etape.type !== "code") { console.log(`  · ${nom} ${etape.type}`); continue; }
    if (!etape.fichiers) {
      soucis.push(`${etape.id} : étape de code sans « fichiers »`);
      console.log(`  ✗ ${nom} pas de fichiers`);
      continue;
    }

    /* Sans solution, c'est une démonstration : le code fourni doit passer tel quel. */
    if (!etape.solution) {
      const bilan = V.validerWeb(etape, sourcesDepart(etape));
      if (!bilan.reussi) {
        soucis.push(`${etape.id} : ni solution, ni code de départ valide — ${bilan.echecs.join(" / ")}`);
        console.log(`  ✗ ${nom} démonstration invalide : ${bilan.echecs[0]}`);
      } else {
        console.log(`  ✓ ${nom} démonstration (code fourni)`);
      }
      continue;
    }

    const solution = sourcesSolution(etape);
    const fautes = erreursDeSyntaxe(solution);
    if (fautes.length) {
      soucis.push(`${etape.id} : la solution contient une faute de syntaxe — ${fautes[0]}`);
      console.log(`  ✗ ${nom} solution mal formée : ${fautes[0]}`);
      continue;
    }

    const bilan = V.validerWeb(etape, solution);
    if (!bilan.reussi) {
      soucis.push(`${etape.id} : la solution est refusée — ${bilan.echecs.join(" / ")}`);
      console.log(`  ✗ ${nom} solution refusée : ${bilan.echecs[0]}`);
      continue;
    }

    /* Le départ ne doit pas déjà passer — pour chaque niveau d'accompagnement. */
    const niveaux = etape.variantes ? ORDRE_AIDE : [null];
    let offert = null;
    for (const niveau of niveaux) {
      const variante = niveau ? appliquerNiveau(etape, niveau) : etape;
      if (V.validerWeb(etape, sourcesDepart(variante)).reussi) { offert = niveau || "—"; break; }
    }
    if (offert) {
      soucis.push(`${etape.id} : le code de départ passe déjà la validation (niveau ${offert})`);
      console.log(`  ✗ ${nom} le départ passe déjà ! (${offert})`);
      continue;
    }

    if (etape.variantes) {
      const parNiveau = ORDRE_AIDE.map((n) => (appliquerNiveau(etape, n).indices || []).length);
      if (parNiveau.some((n) => n === 0)) {
        soucis.push(`${etape.id} : un niveau n'a aucun coup de pouce (${parNiveau.join("/")})`);
        console.log(`  ✗ ${nom} coups de pouce manquants : ${parNiveau.join("/")}`);
        continue;
      }
      console.log(`  ✓ ${nom} indices ${parNiveau.join("/")} (pas-à-pas/repères/autonome)`);
    } else {
      console.log(`  ✓ ${nom} ${(etape.indices || []).length} indice(s)`);
    }
  }

  if (soucis.length) console.log("\n⚠ " + soucis.join("\n⚠ "));
  else console.log("\n✓ séance intégralement vérifiée");
  return soucis.length;
}

/* Le script que le moteur injecte dans chaque aperçu (SCRIPT_LIENS, app.js).
   Il est écrit dans un gabarit, où une barre oblique inverse non doublée disparaît
   sans bruit : c'est arrivé, le script était rejeté par le navigateur et les liens
   de l'aperçu ne marchaient plus. On le reconstitue donc tel que l'aperçu le
   reçoit, on vérifie qu'il se compile, puis on le fait tourner sur un faux
   document : un lien externe s'ouvre dans un onglet, un lien interne est remonté. */
function verifierScriptApercu() {
  console.log("\n═══ Script injecté dans l'aperçu ═══");
  const moteur = readFileSync(join(DOCS, "parcours", "app.js"), "utf8");
  const gabarit = moteur.match(/const SCRIPT_LIENS = `([\s\S]*?)`;/);
  if (!gabarit) return echec("SCRIPT_LIENS introuvable dans app.js");
  if (gabarit[1].includes("${")) return echec("SCRIPT_LIENS ne doit rien interpoler");

  const recu = new Function("return `" + gabarit[1] + "`;")();
  const js = recu.replace(/<\/?script>/g, "").replace("@JETON@", "jeton-test");

  let executer;
  try { executer = new Function("document", "parent", js); }
  catch (e) { return echec(`le script ne se compile pas : ${e.message}`); }

  const lien = (href) => ({ nodeName: "A", getAttribute: () => href, target: "", rel: "" });
  const externe = lien("https://www.marmiton.org");
  const interne = lien("crepes.html");
  const ecouteurs = {};
  const messages = [];
  const doc = {
    getElementsByTagName: () => [externe, interne],
    addEventListener: (type, f) => { ecouteurs[type] = f; },
  };
  try { executer(doc, { postMessage: (m) => messages.push(m) }); }
  catch (e) { return echec(`le script plante à l'exécution : ${e.message}`); }

  if (externe.target !== "_blank") return echec("un lien externe ne s'ouvre pas dans un nouvel onglet");
  if (interne.target) return echec("un lien interne ne doit pas ouvrir d'onglet");
  let empeche = false;
  ecouteurs.click?.({ target: interne, preventDefault: () => { empeche = true; } });
  if (!empeche || messages[0]?.href !== "crepes.html" || messages[0]?.parcoursApercu !== "jeton-test") {
    return echec("un clic sur un lien interne n'est pas remonté au parcours");
  }
  console.log("  ✓ se compile, ouvre les liens externes en onglet, remonte les liens internes");
  return 0;

  function echec(message) { console.log(`  ✗ ${message}`); return 1; }
}

const [parcours, seance] = process.argv.slice(2);
if (!parcours) {
  console.error("Usage : node tools/parcours/verifier_web.mjs <parcours> [séance]");
  process.exit(2);
}
const { CATALOGUE } = await importer(join(DOCS, parcours, "seances", "manifeste.js"));
const liste = seance ? [seance] : Object.keys(CATALOGUE).filter((id) => CATALOGUE[id].disponible);

let total = verifierScriptApercu();
for (const id of liste) total += await verifierSeance(parcours, id, CATALOGUE[id]?.nbEtapes);
console.log(`\n${total ? `${total} problème(s) au total` : "✓ tout est vérifié"}`);
process.exit(total ? 1 : 0);

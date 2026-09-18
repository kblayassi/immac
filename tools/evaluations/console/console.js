/* Console des évaluations — la page. Elle n'est qu'une vue : tout ce qui lit
   le carnet ou réécrit un fichier se passe dans console.mjs, côté Node. */

/* ------------------------------------------------------------------- Le jeton */

/* Il arrive dans le fragment de l'adresse ouverte par console.mjs. On l'efface
   aussitôt de la barre d'adresse — un écran de professeur est souvent projeté —
   et on le garde pour l'onglet, afin qu'un rechargement ne le perde pas. */
const JETON = (() => {
  const duFragment = location.hash.slice(1);
  if (duFragment) {
    try { sessionStorage.setItem("console:jeton", duFragment); } catch { /* stockage bloqué */ }
    history.replaceState(null, "", location.pathname);
    return duFragment;
  }
  try { return sessionStorage.getItem("console:jeton") || ""; } catch { return ""; }
})();

async function appel(methode, chemin, corps) {
  const reponse = await fetch(chemin, {
    method: methode,
    headers: { "X-Jeton": JETON, ...(corps ? { "Content-Type": "application/json" } : {}) },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  const donnees = await reponse.json().catch(() => ({}));
  if (!reponse.ok) throw new Error(donnees.erreur || `Erreur ${reponse.status}`);
  return donnees;
}

/* ------------------------------------------------------------------- Outils */

const $ = (s) => document.querySelector(s);
const echapper = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;
const SANS_NIVEAU = "Niveau non déclaré";

function toast(message, ton) {
  const el = document.createElement("div");
  el.className = "toast";
  if (ton) el.dataset.ton = ton;
  el.textContent = message;
  $("#toasts").append(el);
  setTimeout(() => el.remove(), ton === "erreur" ? 6000 : 3200);
}

async function copier(texte, quoi) {
  try {
    await navigator.clipboard.writeText(texte);
    toast(`${quoi} copié.`);
  } catch {
    toast("Copie impossible : sélectionne le texte à la main.", "erreur");
  }
}

/* Le filtre choisi survit à un rechargement : simple confort, rien d'important. */
let filtre = (() => { try { return localStorage.getItem("console:filtre") || "tous"; } catch { return "tous"; } })();
let etat = null;
const reveles = new Set();          // les codes affichés en clair, carte par carte

/* ------------------------------------------------------------------- Rendu */

function rendre() {
  const { evaluations, niveaux } = etat;
  if (filtre !== "tous" && !niveaux.includes(filtre)) filtre = "tous";

  // Les filtres
  const compte = (n) => evaluations.filter((e) => (e.niveau ?? SANS_NIVEAU) === n).length;
  $("#filtres").innerHTML = [
    `<button class="filtre" type="button" data-filtre="tous" aria-pressed="${filtre === "tous"}">
       Tous<span class="nombre">${evaluations.length}</span></button>`,
    ...niveaux.map((n) => `
      <button class="filtre" type="button" data-filtre="${echapper(n)}" aria-pressed="${filtre === n}">
        ${echapper(n)}<span class="nombre">${compte(n)}</span></button>`),
  ].join("");
  $("#filtres").hidden = niveaux.length < 2 && evaluations.length < 2;

  // Les cartes, groupées par niveau
  const visibles = niveaux.filter((n) => filtre === "tous" || filtre === n);
  $("#liste").innerHTML = evaluations.length
    ? visibles.map((n) => rendreNiveau(n, evaluations.filter((e) => (e.niveau ?? SANS_NIVEAU) === n))).join("")
    : `<p class="vide">Aucune évaluation publiée. Scelle un sujet pour qu'il apparaisse ici :<br>
       <code>node tools/evaluations/sceller_sujet.mjs &lt;cle&gt;</code></p>`;

  rendreAttente();

  $("#chemin-carnet").textContent = etat.carnet;
}

/* Le bandeau du bas : ce qui est sur cet ordinateur et pas encore sur le site —
   des fichiers à committer, des commits à envoyer, ou les deux. */
function rendreAttente() {
  const git = etat.git || {};
  const fichiers = git.fichiers || [];
  const commits = git.aEnvoyer || [];
  const visible = git.disponible && (fichiers.length > 0 || commits.length > 0);
  $("#attente").hidden = !visible;
  if (!visible) return;

  const morceaux = [];
  if (fichiers.length) morceaux.push(pluriel(fichiers.length, "fichier") + (fichiers.length > 1 ? " modifiés" : " modifié"));
  if (commits.length) morceaux.push(pluriel(commits.length, "commit") + (commits.length > 1 ? " à envoyer" : " à envoyer"));
  $("#attente-titre").textContent = `Pas encore en ligne : ${morceaux.join(" et ")}`;

  $("#attente-bloque").hidden = !git.raison;
  $("#attente-bloque").textContent = git.raison || "";
  $("#ouvrir-publier").disabled = !git.publiable;
}

function rendreNiveau(niveau, siennes) {
  const actives = siennes.filter((e) => e.actif).length;
  return `
    <section class="niveau">
      <h2 class="niveau-titre">${echapper(niveau)}
        <small>${pluriel(siennes.length, "publiée")} · ${pluriel(actives, "active")}</small></h2>
      <div class="cartes">${siennes.map(rendreCarte).join("")}</div>
    </section>`;
}

function rendreCarte(e) {
  const meta = [
    `<span class="cle mono">${echapper(e.cle)}</span>`,
    e.duree != null ? `<span>${e.duree} min</span>` : "",
    e.nbQuestions != null ? `<span>${pluriel(e.nbQuestions, "question")}</span>` : "",
    e.points != null ? `<span>${pluriel(e.points, "point")}</span>` : "",
  ].join("");

  const visible = reveles.has(e.cle);
  const code = e.code
    ? `<span class="code-valeur" data-masque="${!visible}" aria-label="${visible ? "" : "Code masqué"}">${echapper(e.code)}</span>
       <span class="code-actions">
         <button class="bouton bouton-petit" type="button" data-action="reveler">${visible ? "Masquer" : "Afficher"}</button>
         <button class="bouton bouton-petit" type="button" data-action="copier">Copier</button>
       </span>`
    : `<span class="code-valeur code-inconnu">Code inconnu — scellée avant le carnet. Change-le pour en obtenir un.</span>`;

  const boutonBareme = e.bareme
    ? `<button class="bouton bouton-petit" type="button" data-action="bareme"
         title="Le fichier à déposer dans la page de correction">Barème (JSON)</button>`
    : `<button class="bouton bouton-petit" type="button" disabled
         title="Aucun bareme-${echapper(e.cle)}.json sur cet ordinateur">Barème absent</button>`;
  const boutonCode = e.recodable
    ? `<button class="bouton bouton-petit" type="button" data-action="recoder">Changer le code</button>`
    : "";
  const bas = `
    <span class="${e.recodable ? "" : "sans-source"}">${e.recodable
      ? (e.scelle ? `Scellée le ${echapper(e.scelle)}` : "")
      : "Source en clair absente : impossible de rechiffrer depuis cet ordinateur."}</span>
    <span class="carte-actions">${boutonBareme}${boutonCode}</span>`;

  return `
    <article class="carte" data-cle="${echapper(e.cle)}" data-actif="${e.actif}">
      <div class="carte-haut">
        <div>
          <h3 class="carte-titre">${echapper(e.titre)}</h3>
          <p class="carte-meta">${meta}</p>
        </div>
        <label class="interrupteur" title="${e.actif ? "Son code ouvre l'épreuve" : "Son code n'ouvre plus rien"}">
          <input type="checkbox" data-action="basculer" ${e.actif ? "checked" : ""}>
          <span class="piste" aria-hidden="true"></span>
          <span class="etat-libelle">${e.actif ? "Active" : "Désactivée"}</span>
        </label>
      </div>
      <div class="code-bloc">
        <span class="code-etiquette">Code</span>
        ${code}
      </div>
      <div class="carte-bas">${bas}</div>
    </article>`;
}

/* ------------------------------------------------------------------- Actions */

async function charger() {
  try {
    etat = await appel("GET", "/api/etat");
    rendre();
  } catch (erreur) {
    // Un fetch qui échoue sans réponse : le serveur est éteint.
    if (erreur instanceof TypeError) {
      montrerArretee("La console ne répond plus",
                     "Elle a été arrêtée. Relance l'app Console des évaluations pour la rouvrir.");
      return;
    }
    $("#liste").innerHTML = `<p class="vide">${echapper(erreur.message)}</p>`;
  }
}

async function basculer(carte, actif) {
  const cle = carte.dataset.cle;
  carte.classList.add("occupee");
  try {
    const reponse = await appel("POST", "/api/actif", { cle, actif });
    etat = reponse;
    rendre();
    toast(actif
      ? `${reponse.fait.titre} réactivée — à publier.`
      : `${reponse.fait.titre} désactivée — à publier.`);
  } catch (erreur) {
    carte.classList.remove("occupee");
    toast(erreur.message, "erreur");
    rendre();                                    // l'interrupteur revient à l'état réel
  }
}

let cleARecoder = null;

function ouvrirRecodage(cle) {
  const e = etat.evaluations.find((x) => x.cle === cle);
  cleARecoder = cle;
  $("#recoder-titre").textContent = e.titre;
  $("#nouveau-code").value = "";
  $("#recoder-erreur").hidden = true;
  $("#confirmer-recoder").disabled = false;
  $("#dialogue-recoder").showModal();
  $("#nouveau-code").focus();
}

async function recoder() {
  const bouton = $("#confirmer-recoder");
  bouton.disabled = true;
  bouton.textContent = "Rechiffrement…";
  $("#recoder-erreur").hidden = true;
  try {
    const reponse = await appel("POST", "/api/recoder", { cle: cleARecoder, code: $("#nouveau-code").value });
    etat = reponse;
    reveles.add(cleARecoder);
    rendre();
    $("#dialogue-recoder").close();
    $("#nouveau-titre").textContent = reponse.fait.titre;
    $("#nouveau-code-affiche").textContent = reponse.fait.code;
    $("#dialogue-nouveau-code").showModal();
  } catch (erreur) {
    $("#recoder-erreur").textContent = erreur.message;
    $("#recoder-erreur").hidden = false;
  } finally {
    bouton.disabled = false;
    bouton.textContent = "Rechiffrer";
  }
}

function ouvrirPublication() {
  const git = etat.git;
  const fichiers = git.fichiers || [];
  const commits = git.aEnvoyer || [];

  $("#publier-commit").hidden = !fichiers.length;
  $("#message-commit").value = git.message || "";
  $("#publier-fichiers").innerHTML = fichiers.map((f) => `<li><code>${echapper(f)}</code></li>`).join("");
  $("#publier-autres").hidden = !git.autresModifs;
  $("#publier-autres").textContent = git.autresModifs
    ? `Tes ${pluriel(git.autresModifs, "autre fichier")} ${git.autresModifs > 1 ? "modifiés ne sont" : "modifié n'est"} pas concerné${git.autresModifs > 1 ? "s" : ""} : ${git.autresModifs > 1 ? "ils restent" : "il reste"} sur cet ordinateur, hors du commit.`
    : "";

  // Des commits déjà faits partiront avec : on les montre, car ils peuvent
  // n'avoir rien à voir avec les évaluations.
  $("#publier-envoyes").hidden = !commits.length;
  $("#publier-envoyes-titre").textContent = fichiers.length
    ? `Partiront aussi : ${pluriel(commits.length, "commit")} déjà fait${commits.length > 1 ? "s" : ""} sur cet ordinateur`
    : `${pluriel(commits.length, "commit")} à envoyer`;
  $("#publier-envoyes-liste").innerHTML = commits.map((c) => `<li>${echapper(c)}</li>`).join("");

  $("#publier-erreur").hidden = true;
  $("#confirmer-publier").disabled = false;
  $("#confirmer-publier").textContent = fichiers.length ? "Committer et publier" : "Envoyer";
  $("#dialogue-publier").showModal();
  if (fichiers.length) $("#message-commit").focus();
}

async function publierMaintenant() {
  const bouton = $("#confirmer-publier");
  const libelle = bouton.textContent;
  bouton.disabled = true;
  bouton.textContent = "Publication…";
  $("#publier-erreur").hidden = true;
  try {
    const reponse = await appel("POST", "/api/publier", { message: $("#message-commit").value });
    etat = reponse;
    rendre();
    $("#dialogue-publier").close();
    const { commit, envoyes, actions } = reponse.fait;
    $("#publie-detail").textContent = commit
      ? `Commit ${commit}` + (envoyes.length > 1 ? `, envoyé avec ${pluriel(envoyes.length - 1, "autre commit")}.` : ", envoyé.")
      : `${pluriel(envoyes.length, "commit")} envoyé${envoyes.length > 1 ? "s" : ""}.`;
    $("#publie-actions").hidden = !actions;
    if (actions) $("#publie-actions").href = actions;
    $("#dialogue-publie").showModal();
  } catch (erreur) {
    $("#publier-erreur").textContent = erreur.message;
    $("#publier-erreur").hidden = false;
    // Le commit a pu se faire avant que l'envoi échoue : on relit l'état, pour
    // qu'un second clic ne propose pas de le refaire.
    await charger();
    bouton.textContent = etat.git?.fichiers?.length ? "Committer et publier" : "Réessayer l'envoi";
    $("#publier-commit").hidden = !etat.git?.fichiers?.length;
    bouton.disabled = !etat.git?.publiable;
    return;
  }
  bouton.disabled = false;
  bouton.textContent = libelle;
}

async function telechargerBareme(cle) {
  try {
    const { nom, contenu } = await appel("POST", "/api/bareme", { cle });
    const url = URL.createObjectURL(new Blob([contenu], { type: "application/json" }));
    const lien = Object.assign(document.createElement("a"), { href: url, download: nom });
    document.body.append(lien);
    lien.click();
    lien.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`${nom} téléchargé — à déposer dans la page de correction.`);
  } catch (erreur) {
    toast(erreur.message, "erreur");
  }
}

function montrerArretee(titre, texte) {
  if (titre) $("#arretee h1").textContent = titre;
  if (texte) $("#arretee p:last-child").textContent = texte;
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  $("#arretee").hidden = false;
  document.body.classList.add("arretee-page");
}

async function arreterConsole() {
  if (!confirm("Arrêter la console ? Tu pourras la rouvrir depuis l'app.")) return;
  try { await appel("POST", "/api/arreter"); } catch { /* elle s'éteint : la réponse peut manquer */ }
  try { sessionStorage.removeItem("console:jeton"); } catch { /* stockage bloqué */ }
  montrerArretee();
}

/* ------------------------------------------------------------------- Écouteurs */

$("#filtres").addEventListener("click", (ev) => {
  const bouton = ev.target.closest("[data-filtre]");
  if (!bouton) return;
  filtre = bouton.dataset.filtre;
  try { localStorage.setItem("console:filtre", filtre); } catch { /* stockage bloqué */ }
  rendre();
});

$("#liste").addEventListener("click", (ev) => {
  const cible = ev.target.closest("[data-action]");
  const carte = ev.target.closest(".carte");
  if (!cible || !carte || cible.dataset.action === "basculer") return;
  const cle = carte.dataset.cle;
  const e = etat.evaluations.find((x) => x.cle === cle);
  if (cible.dataset.action === "reveler") {
    reveles.has(cle) ? reveles.delete(cle) : reveles.add(cle);
    rendre();
  } else if (cible.dataset.action === "copier") {
    copier(e.code, "Code");
  } else if (cible.dataset.action === "recoder") {
    ouvrirRecodage(cle);
  } else if (cible.dataset.action === "bareme") {
    telechargerBareme(cle);
  }
});

$("#liste").addEventListener("change", (ev) => {
  if (ev.target.dataset.action !== "basculer") return;
  basculer(ev.target.closest(".carte"), ev.target.checked);
});

$("#formulaire-recoder").addEventListener("submit", (ev) => {
  if (ev.submitter?.value !== "recoder") return;   // « Annuler » ferme, simplement
  ev.preventDefault();
  recoder();
});

$("#copier-nouveau-code").addEventListener("click", () => copier($("#nouveau-code-affiche").textContent, "Code"));
$("#ouvrir-publier").addEventListener("click", ouvrirPublication);
$("#arreter").addEventListener("click", arreterConsole);
$("#formulaire-publier").addEventListener("submit", (ev) => {
  if (ev.submitter?.value !== "publier") return;
  ev.preventDefault();
  publierMaintenant();
});
$("#rafraichir").addEventListener("click", async () => { await charger(); toast("Fichiers relus."); });

// Revenir sur l'onglet relit les fichiers : un scellage fait entre-temps dans le
// terminal apparaît sans qu'on ait à y penser.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !document.body.classList.contains("arretee-page")) charger();
});

charger();

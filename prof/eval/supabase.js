/* Évaluations — le lien avec Supabase, où les copies sont rangées.
 *
 * Trois pages s'en servent :
 *   passer.html      dépose la copie à la remise, et reçoit un code de consultation
 *   correction.html  le correcteur s'y connecte, lit les copies, publie les corrections
 *   copie.html       l'élève y lit sa copie corrigée avec son code
 *
 * La clé ci-dessous est la clé PUBLIQUE du projet (rôle « anon ») : elle est
 * faite pour être lue par tous, et le dépôt est public de toute façon. Toute la
 * protection est dans la base (tools/evaluations/supabase.sql) :
 *   — un visiteur ne touche à la table des copies qu'à travers deux fonctions,
 *     deposer_copie et lire_copie ;
 *   — seul un compte inscrit dans la table `correcteurs` lit et corrige.
 * La clé « service_role » (ou « secret ») ne doit JAMAIS apparaître ici.
 *
 * Pas de bibliothèque : l'API de Supabase est du HTTP ordinaire, et le site
 * n'a pas besoin de plus que ces quelques appels.
 */

export const SUPABASE_URL = "https://cfjmmlynttpgjxqtwlhf.supabase.co";
export const SUPABASE_CLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmam1tbHludHRwZ2p4cXR3bGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMTI0ODMsImV4cCI6MjEwNjU4ODQ4M30." +
  "7j_ty3rz6nzhlxrGzjt8Ju5gN4-gegfpHU3SkMAiJb8";

/* Une requête qui n'aboutit pas en 20 s n'aboutira pas : mieux vaut le dire à
   l'élève et lui laisser son fichier que de le laisser devant un sablier. */
const DELAI_MS = 20000;

async function appel(chemin, { methode = "GET", corps, jeton, entetes = {} } = {}) {
  const controle = new AbortController();
  const minuteur = setTimeout(() => controle.abort(), DELAI_MS);
  try {
    const rep = await fetch(SUPABASE_URL + chemin, {
      method: methode,
      headers: {
        apikey: SUPABASE_CLE,
        Authorization: `Bearer ${jeton || SUPABASE_CLE}`,
        ...(corps !== undefined ? { "Content-Type": "application/json" } : {}),
        ...entetes,
      },
      body: corps !== undefined ? JSON.stringify(corps) : undefined,
      signal: controle.signal,
    });
    const texte = await rep.text();
    let donnees = null;
    try { donnees = texte ? JSON.parse(texte) : null; } catch { donnees = texte; }
    if (!rep.ok) {
      const message = donnees?.message || donnees?.msg || donnees?.error_description ||
                      donnees?.error || `erreur ${rep.status}`;
      throw Object.assign(new Error(message), { statut: rep.status });
    }
    return donnees;
  } catch (e) {
    if (e.name === "AbortError") throw new Error("le serveur ne répond pas");
    if (e instanceof TypeError) throw new Error("pas de connexion au serveur");
    throw e;
  } finally {
    clearTimeout(minuteur);
  }
}

/* ============================================================ Côté élève */

/** Dépose un rendu scellé. Rend le code de consultation. Redéposer le même
    rendu (même empreinte) rend le même code : une remise rejouée après un
    rechargement de page ne crée pas de doublon.
    `corrigee` : la copie déjà corrigée par la page, pour une évaluation
    autocorrigée (l'évaluation à blanc). La base l'ignore pour toute autre. */
export async function deposerCopie(rendu, corrigee = null) {
  const corps = corrigee ? { p_rendu: rendu, p_corrigee: corrigee } : { p_rendu: rendu };
  return appel("/rest/v1/rpc/deposer_copie", { methode: "POST", corps });
}

/** { etat: "inconnu" } · { etat: "en-attente" } · { etat: "corrigee", copie } */
export async function lireCopie(code) {
  return appel("/rest/v1/rpc/lire_copie", { methode: "POST", corps: { p_code: code } });
}

/* ========================================================= Côté correcteur

   La session vit dans sessionStorage : fermer l'onglet déconnecte. Le jeton
   d'accès dure une heure ; on le renouvelle avant chaque appel quand il arrive
   à échéance, pour qu'une longue séance de correction ne s'interrompe pas. */

const SESSION = "eval:supabase-session";

function lireSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION) || "null"); } catch { return null; }
}
function ecrireSession(s) {
  try {
    if (s) sessionStorage.setItem(SESSION, JSON.stringify(s));
    else sessionStorage.removeItem(SESSION);
  } catch { /* stockage bloqué : la session ne survivra pas au rechargement */ }
}
function garder(reponse) {
  const s = {
    jeton: reponse.access_token,
    renouvellement: reponse.refresh_token,
    expire: Date.now() + (reponse.expires_in || 3600) * 1000,
    email: reponse.user?.email || lireSession()?.email || "",
  };
  ecrireSession(s);
  return s;
}

export function correcteurConnecte() {
  return lireSession()?.email || null;
}

export async function seConnecter(email, motDePasse) {
  const rep = await appel("/auth/v1/token?grant_type=password", {
    methode: "POST", corps: { email, password: motDePasse },
  });
  return garder(rep).email;
}

export async function seDeconnecter() {
  const s = lireSession();
  ecrireSession(null);
  if (s?.jeton) { try { await appel("/auth/v1/logout", { methode: "POST", jeton: s.jeton }); } catch { /* déjà expirée */ } }
}

async function jeton() {
  let s = lireSession();
  if (!s) throw Object.assign(new Error("non connecté"), { statut: 401 });
  if (Date.now() > s.expire - 60000) {
    try {
      s = garder(await appel("/auth/v1/token?grant_type=refresh_token", {
        methode: "POST", corps: { refresh_token: s.renouvellement },
      }));
    } catch (e) {
      ecrireSession(null);
      throw Object.assign(new Error("session expirée, reconnecte-toi"), { statut: 401 });
    }
  }
  return s.jeton;
}

/** Le sommaire : une ligne par copie, sans le contenu (léger à charger). */
export async function listerCopies() {
  return appel("/rest/v1/copies?select=id,evaluation,classe,nom,prenom,depose_le,corrigee_le" +
               "&order=depose_le.desc", { jeton: await jeton() });
}

/** Les rendus complets d'une évaluation, pour une classe. */
export async function chargerCopies(evaluation, classe) {
  const q = `evaluation=eq.${encodeURIComponent(evaluation)}&classe=eq.${encodeURIComponent(classe)}`;
  return appel(`/rest/v1/copies?select=id,code,rendu,corrigee_le&${q}`, { jeton: await jeton() });
}

/** Publie la copie corrigée : l'élève la verra avec son code. */
export async function publierCorrection(id, copieCorrigee) {
  return appel(`/rest/v1/copies?id=eq.${encodeURIComponent(id)}`, {
    methode: "PATCH",
    jeton: await jeton(),
    corps: { corrigee: copieCorrigee, corrigee_le: new Date().toISOString() },
    entetes: { Prefer: "return=minimal" },
  });
}

/** Supprime une copie en ligne (un dépôt d'essai, un doublon). */
export async function supprimerCopie(id) {
  return appel(`/rest/v1/copies?id=eq.${encodeURIComponent(id)}`, {
    methode: "DELETE", jeton: await jeton(), entetes: { Prefer: "return=minimal" },
  });
}

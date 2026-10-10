/* Un sujet scellé : publié des semaines à l'avance, illisible jusqu'à l'heure dite.
 *
 * Le problème : un site statique publie des fichiers, et un fichier publié se
 * lit. Mettre un sujet en ligne la veille, c'est le donner la veille — la console
 * du navigateur suffit, et un élève curieux n'a même pas besoin d'être malhonnête
 * pour tomber dessus.
 *
 * La réponse : le sujet part chiffré. Le fichier publié ne contient qu'un bloc
 * d'octets ; la clé est un code que l'enseignant écrit au tableau au début de
 * l'heure. Avant ce moment-là, il n'y a rien à lire, pour personne.
 *
 * Ce n'est pas de la sécurité de façade : AES-GCM avec une clé dérivée par
 * PBKDF2, par les primitives du navigateur. Ce qui le limite, c'est la longueur
 * du code — un code de quatre lettres se casse par force brute hors ligne. D'où
 * les codes fabriqués ici : deux mots et un nombre, dictables à l'oral, et bien
 * au-delà de ce qu'une classe de lycée cassera un mercredi après-midi.
 *
 * Ce module sert aux deux bouts : à l'outil de scellage (Node) et à la page de
 * composition (navigateur). Les deux se servent de la même WebCrypto, donc du
 * même format, sans qu'aucune constante n'ait à être recopiée.
 */

export const FORMAT_SCELLE = "sujet-scelle/v1";

/* 310 000 tours : la recommandation OWASP pour PBKDF2-SHA256. Environ un quart
   de seconde sur une machine de salle — invisible pour l'élève qui vient de
   taper son code, coûteux pour qui essaierait des millions de codes. */
const TOURS = 310000;

/* Un code se dicte et se recopie du tableau : ni la casse, ni les espaces, ni
   les tirets ne doivent séparer un élève de son sujet. « Rubis-Lune 42 »,
   « rubislune42 » et « RUBIS LUNE 42 » ouvrent le même fichier. */
export function normaliserCode(code) {
  return String(code || "")
    .normalize("NFD").replace(/\p{M}/gu, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/* ------------------------------------------------------------------ base64 */

const enBase64 = (octets) => btoa(String.fromCharCode(...new Uint8Array(octets)));
const deBase64 = (texte) => Uint8Array.from(atob(texte), (c) => c.charCodeAt(0));

/* -------------------------------------------------------------------- Clé */

async function deriverCle(code, sel, usage) {
  const brut = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(normaliserCode(code)), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: sel, iterations: TOURS, hash: "SHA-256" },
    brut,
    { name: "AES-GCM", length: 256 },
    false,
    [usage],
  );
}

/* ----------------------------------------------------------------- Sceller */

/** Chiffre les questions. Rend l'objet à écrire dans le sujet publié. */
export async function sceller(questions, code) {
  const sel = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cle = await deriverCle(code, sel, "encrypt");
  const clair = new TextEncoder().encode(JSON.stringify(questions));
  const chiffre = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cle, clair);

  return {
    format: FORMAT_SCELLE,
    // En clair, et c'est voulu : de quoi annoncer l'épreuve sans rien en livrer.
    nbQuestions: questions.filter((q) => q.type !== "document").length,
    points: questions.reduce((s, q) => s + (q.points || 0), 0),
    sel: enBase64(sel),
    iv: enBase64(iv),
    donnees: enBase64(chiffre),
  };
}

/* ------------------------------------------------------------------ Ouvrir */

/**
 * Déchiffre les questions avec le code donné.
 * @returns {Array|null} les questions, ou null si le code est faux.
 *
 * Un code faux ne lève pas : AES-GCM vérifie l'authenticité du bloc, donc une
 * clé fausse produit une erreur de déchiffrement et non une bouillie. C'est
 * exactement ce qu'on veut dire à l'élève — « ce code n'est pas le bon » — et
 * jamais « voici un sujet, mais illisible ».
 */
export async function ouvrir(scelle, code) {
  try {
    const cle = await deriverCle(code, deBase64(scelle.sel), "decrypt");
    const clair = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: deBase64(scelle.iv) }, cle, deBase64(scelle.donnees));
    const questions = JSON.parse(new TextDecoder().decode(clair));
    return Array.isArray(questions) ? questions : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------- Fabriquer un code

   Trois mots et un nombre : ça se dicte à l'oral sans épeler, ça s'écrit au
   tableau sans ambiguïté, et ça se recopie sans faute. Les mots sont courts,
   sans accent et sans homophone gênant.

   Pourquoi trois et pas deux : le seul moyen de forcer un sujet scellé est
   d'essayer des codes, et cette liste-ci en autorise 120³ × 90, soit 155
   millions. À une machine de bureau il faudrait des semaines ; à qui écrirait un
   programme sur carte graphique, encore quelques heures — pour un devoir surveillé
   dont le sujet sera de toute façon public le lendemain. Deux mots suffisaient
   contre un élève curieux, pas contre un élève obstiné. */

const MOTS = [
  "ARBRE", "ARGILE", "AVOINE", "BALISE", "BAMBOU", "BANQUISE", "BOUSSOLE", "BRUME",
  "BUISSON", "CACTUS", "CALANQUE", "CARAFE", "CASCADE", "CEDRE", "CHENE", "CIGALE",
  "CIMENT", "CLAIRON", "COLLINE", "COMETE", "CORAIL", "COUPOLE", "CRISTAL", "CUIVRE",
  "DAUPHIN", "DELTA", "DUNE", "ECLAIR", "ECLUSE", "EMERAUDE", "ESTUAIRE", "ETOILE",
  "FALAISE", "FANION", "FLAMME", "FONTAINE", "FORGE", "FOUGERE", "FRESQUE", "GALET",
  "GARRIGUE", "GIVRE", "GLACIER", "GRANIT", "HARPE", "HIBOU", "HORIZON", "IGLOO",
  "ISTHME", "IVOIRE", "JADE", "JUNGLE", "KIWI", "LAGON", "LANTERNE", "LAVANDE",
  "LIERRE", "LIMAILLE", "LOUTRE", "LUNE", "MARBRE", "MARTEAU", "MENTHE", "MERIDIEN",
  "MESANGE", "MIRAGE", "MOUSSON", "NACRE", "NEBULEUSE", "NENUPHAR", "NUAGE", "OASIS",
  "OBSIDIENNE", "OMBRE", "ORAGE", "ORCHIDEE", "ORTIE", "PAGODE", "PALISSADE", "PAPYRUS",
  "PENDULE", "PHARE", "PIERRE", "PIVOINE", "PLUVIER", "PORCELAINE", "PRAIRIE", "PRISME",
  "QUARTZ", "RAVIN", "RECIF", "RESINE", "ROSEAU", "RUBIS", "SABLE", "SAFRAN",
  "SAPHIR", "SARABANDE", "SAULE", "SENTIER", "SILEX", "SIROCCO", "SOUFRE", "SOURCE",
  "SPIRALE", "STEPPE", "TAMARIN", "TERRASSE", "TIGRE", "TILLEUL", "TOUNDRA", "TOURBE",
  "TROMBONE", "TULIPE", "TUNDRA", "URANE", "VAGUE", "VALLON", "VANILLE", "VARECH",
  "VERGLAS", "VIGIE", "VOLUTE", "ZEBRE",
];

export function fabriquerCode() {
  const hasard = (n) => crypto.getRandomValues(new Uint32Array(1))[0] % n;
  const mots = [];
  while (mots.length < 3) {
    const mot = MOTS[hasard(MOTS.length)];
    if (!mots.includes(mot)) mots.push(mot);   // trois mots distincts : plus faciles à dicter
  }
  return `${mots.join("-")}-${10 + hasard(90)}`;
}

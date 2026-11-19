/* Fabrique une archive ZIP dans le navigateur, sans dépendance.
 *
 * Les fichiers sont stockés sans compression (méthode « stored », 0) : pour quatre
 * fichiers texte de quelques kilo-octets, la compression n'apporterait rien et
 * demanderait d'embarquer un implémentation de deflate. L'archive produite s'ouvre
 * partout — Finder, Explorateur Windows, 7-Zip.
 *
 * Utilisé par l'atelier web pour le bouton « Télécharger mon site ».
 */

/* Table du CRC-32, calculée une fois : le format ZIP exige une somme de contrôle
   par fichier, et les lecteurs d'archives la vérifient vraiment. */
const TABLE_CRC = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(octets) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < octets.length; i++) c = TABLE_CRC[(c ^ octets[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

/* Le ZIP date d'avant l'an 2000 : il note l'heure sur 16 bits, à deux secondes près. */
function horodatageDos(date) {
  const heure = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
  const jour = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { heure, jour };
}

/**
 * Assemble une archive.
 * @param {object} fichiers  { "index.html": "…", "style.css": "…" }
 * @returns {Blob} prêt à être téléchargé
 */
export function creerZip(fichiers) {
  const encodeur = new TextEncoder();
  const { heure, jour } = horodatageDos(new Date());

  const morceaux = [];          // le corps de l'archive, dans l'ordre
  const entrees = [];           // de quoi écrire le catalogue, à la fin
  let position = 0;

  for (const [nom, contenu] of Object.entries(fichiers)) {
    const nomOctets = encodeur.encode(nom);
    const donnees = encodeur.encode(String(contenu ?? ""));
    const crc = crc32(donnees);

    const entete = new DataView(new ArrayBuffer(30));
    entete.setUint32(0, 0x04034b50, true);      // signature d'en-tête local
    entete.setUint16(4, 20, true);              // version minimale du lecteur
    entete.setUint16(6, 0x0800, true);          // noms de fichiers en UTF-8
    entete.setUint16(8, 0, true);               // méthode : stocké, sans compression
    entete.setUint16(10, heure, true);
    entete.setUint16(12, jour, true);
    entete.setUint32(14, crc, true);
    entete.setUint32(18, donnees.length, true); // taille compressée
    entete.setUint32(22, donnees.length, true); // taille réelle
    entete.setUint16(26, nomOctets.length, true);
    entete.setUint16(28, 0, true);              // pas de champ « extra »

    entrees.push({ nomOctets, crc, taille: donnees.length, decalage: position });
    morceaux.push(new Uint8Array(entete.buffer), nomOctets, donnees);
    position += 30 + nomOctets.length + donnees.length;
  }

  /* Le catalogue central : c'est lui que lisent les gestionnaires d'archives. */
  const debutCatalogue = position;
  for (const e of entrees) {
    const fiche = new DataView(new ArrayBuffer(46));
    fiche.setUint32(0, 0x02014b50, true);
    fiche.setUint16(4, 20, true);               // version d'écriture
    fiche.setUint16(6, 20, true);               // version de lecture
    fiche.setUint16(8, 0x0800, true);
    fiche.setUint16(10, 0, true);
    fiche.setUint16(12, heure, true);
    fiche.setUint16(14, jour, true);
    fiche.setUint32(16, e.crc, true);
    fiche.setUint32(20, e.taille, true);
    fiche.setUint32(24, e.taille, true);
    fiche.setUint16(28, e.nomOctets.length, true);
    fiche.setUint16(30, 0, true);               // extra
    fiche.setUint16(32, 0, true);               // commentaire
    fiche.setUint16(34, 0, true);               // numéro de disque
    fiche.setUint16(36, 0, true);               // attributs internes
    fiche.setUint32(38, 0, true);               // attributs externes
    fiche.setUint32(42, e.decalage, true);      // où trouver l'en-tête local
    morceaux.push(new Uint8Array(fiche.buffer), e.nomOctets);
    position += 46 + e.nomOctets.length;
  }

  const fin = new DataView(new ArrayBuffer(22));
  fin.setUint32(0, 0x06054b50, true);
  fin.setUint16(4, 0, true);
  fin.setUint16(6, 0, true);
  fin.setUint16(8, entrees.length, true);
  fin.setUint16(10, entrees.length, true);
  fin.setUint32(12, position - debutCatalogue, true);
  fin.setUint32(16, debutCatalogue, true);
  fin.setUint16(20, 0, true);
  morceaux.push(new Uint8Array(fin.buffer));

  return new Blob(morceaux, { type: "application/zip" });
}

/* NOM_Prenom : majuscules pour le nom, initiale pour le prénom, accents retirés —
   c'est la convention de nommage des rendus, et elle doit tenir dans un nom de
   fichier sur n'importe quel système. */
function nettoyer(texte) {
  return String(texte || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nomDeRendu(nom, prenom) {
  const n = nettoyer(nom).toUpperCase();
  const p = nettoyer(prenom).toLowerCase().replace(/^./, (c) => c.toUpperCase());
  if (!n && !p) return null;
  return [n, p].filter(Boolean).join("_");
}

/** Provoque le téléchargement d'un Blob sous le nom donné. */
export function telecharger(blob, nomFichier) {
  const lien = document.createElement("a");
  lien.href = URL.createObjectURL(blob);
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  lien.remove();
  setTimeout(() => URL.revokeObjectURL(lien.href), 5000);
}

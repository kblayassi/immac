/* La copie corrigée en PDF — fabriquée dans le navigateur, sans fenêtre
 * d'impression.
 *
 * La fenêtre d'impression était lente à s'ouvrir, imposait la taille du texte
 * de l'écran et laissait le navigateur choisir le nom du fichier. Ici, le PDF est
 * construit directement (pdfmake) et téléchargé sous le nom
 * NOM_Prenom_NomDuDevoir.pdf.
 *
 * pdfmake (1,4 Mo) et les polices du site ne sont chargés qu'au premier clic :
 * un élève qui ne fait que lire sa copie ne les télécharge jamais. Ils viennent
 * de jsDelivr, comme Pyodide.
 */

const PDFMAKE = "https://cdn.jsdelivr.net/npm/pdfmake@0.2.12/build/pdfmake.min.js";
const POLICES = {
  "Quicksand-Regular.ttf": "https://cdn.jsdelivr.net/fontsource/fonts/quicksand@5.0.0/latin-400-normal.ttf",
  "Quicksand-Bold.ttf":    "https://cdn.jsdelivr.net/fontsource/fonts/quicksand@5.0.0/latin-700-normal.ttf",
  "RedHatMono-Regular.ttf": "https://cdn.jsdelivr.net/fontsource/fonts/red-hat-mono@5.0.0/latin-400-normal.ttf",
};

const VIOLET = "#573D91";
const VIOLET_PALE = "#efeaf9";
const DOUX = "#625d73";
const VERT = "#12855c";
const ORANGE = "#b8860b";
const ROUGE = "#c62828";
const FOND_CODE = "#f0eef7";

let pret = null;

function chargerScript(url) {
  return new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = ok;
    s.onerror = () => ko(new Error("bibliothèque PDF injoignable"));
    document.head.appendChild(s);
  });
}

async function enBase64(url) {
  const rep = await fetch(url);
  if (!rep.ok) throw new Error("police injoignable");
  const octets = new Uint8Array(await rep.arrayBuffer());
  let binaire = "";
  for (let i = 0; i < octets.length; i += 0x8000) {
    binaire += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  }
  return btoa(binaire);
}

function preparer() {
  if (!pret) {
    pret = (async () => {
      const [, ...polices] = await Promise.all([
        window.pdfMake ? null : chargerScript(PDFMAKE),
        ...Object.values(POLICES).map(enBase64),
      ]);
      const vfs = {};
      Object.keys(POLICES).forEach((nom, i) => { vfs[nom] = polices[i]; });
      window.pdfMake.vfs = vfs;
      window.pdfMake.fonts = {
        Quicksand: {
          normal: "Quicksand-Regular.ttf", bold: "Quicksand-Bold.ttf",
          italics: "Quicksand-Regular.ttf", bolditalics: "Quicksand-Bold.ttf",
        },
        Mono: {
          normal: "RedHatMono-Regular.ttf", bold: "RedHatMono-Regular.ttf",
          italics: "RedHatMono-Regular.ttf", bolditalics: "RedHatMono-Regular.ttf",
        },
      };
      return window.pdfMake;
    })();
    pret.catch(() => { pret = null; });     // un échec réseau ne condamne pas le clic suivant
  }
  return pret;
}

/* ------------------------------------------------------------- Le nom */

/* DUPONT, Léa, « Partie 1 — Premiers programmes »
   → DUPONT_Lea_Partie-1-Premiers-programmes.pdf
   Sans accents ni signes : le nom doit survivre à une clé USB, à l'ENT et à un
   courriel. */
function morceau(texte) {
  return String(texte || "")
    .normalize("NFD").replace(/\p{M}/gu, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nomDuPdf(copie) {
  const devoir = morceau(copie.evaluation?.titre || copie.evaluation?.cle) || "Devoir";
  const nom = morceau((copie.eleve?.nom || "").toUpperCase()) || "NOM";
  const prenom = morceau(copie.eleve?.prenom) || "Prenom";
  return `${nom}_${prenom}_${devoir}.pdf`;
}

/* --------------------------------------------------------- Le document */

const nombre = (n) => (Math.round((n ?? 0) * 100) / 100).toString().replace(".", ",");

function couleurDe(ok) {
  return ok === true ? VERT : ok === false ? ROUGE : ORANGE;
}

function encadre(contenu, fond, bordure) {
  return {
    table: { widths: ["*"], body: [[contenu]] },
    layout: {
      fillColor: () => fond,
      hLineWidth: () => 0,
      vLineWidth: (i) => (bordure && i === 0 ? 2.5 : 0),
      vLineColor: () => bordure,
      paddingLeft: () => 8, paddingRight: () => 8, paddingTop: () => 6, paddingBottom: () => 6,
    },
  };
}

function reponse(q) {
  const r = q.reponse || {};
  if (q.type === "code") {
    return encadre({
      text: r.code?.trim() ? r.code.replace(/\s+$/, "") : "(pas de réponse)",
      font: "Mono", fontSize: 8, preserveLeadingSpaces: true, lineHeight: 1.15,
    }, FOND_CODE);
  }
  if (q.type === "texte") {
    return encadre({ text: r.texte?.trim() || "(pas de réponse)", fontSize: 9.5 }, FOND_CODE);
  }
  if (q.type === "qcm") {
    const choix = (Array.isArray(r.choix) ? r.choix : [r.choix]).filter((i) => i != null);
    return { text: ["Ta réponse : ", { text: choix.map((i) => String.fromCharCode(65 + i)).join(", ") || "aucune", bold: true }],
             fontSize: 9.5 };
  }
  return null;
}

function question(q) {
  const part = q.max ? (q.points >= q.max ? true : q.points > 0 ? null : false) : null;
  const bloc = [
    {
      columns: [
        { text: q.titre || q.id, bold: true, fontSize: 11, color: VIOLET },
        { text: `${nombre(q.points)} / ${nombre(q.max)}`, bold: true, fontSize: 11,
          color: couleurDe(part), alignment: "right", width: "auto" },
      ],
      margin: [0, 0, 0, 4],
    },
  ];
  const rep = reponse(q);
  if (rep) bloc.push({ ...rep, margin: [0, 0, 0, 4] });

  if (q.criteres?.length) {
    bloc.push({
      table: {
        widths: [34, "*"],
        body: q.criteres.map((c) => [
          { text: `${nombre(c.points)}/${nombre(c.max)}`, bold: true, color: couleurDe(c.ok), fontSize: 8.5 },
          { text: [c.libelle || "", c.retouche ? { text: " — revu par ton professeur", color: VIOLET } : ""],
            fontSize: 8.5 },
        ]),
      },
      layout: "noBorders",
      margin: [0, 0, 0, 2],
    });
  }
  if (q.annotation?.trim()) {
    bloc.push({ ...encadre({ text: q.annotation, fontSize: 9 }, VIOLET_PALE, VIOLET), margin: [0, 3, 0, 0] });
  }
  return { stack: bloc, margin: [0, 0, 0, 12], unbreakable: q.type !== "code" };
}

export function documentDe(copie) {
  const nom = `${(copie.eleve?.nom || "").toUpperCase()} ${copie.eleve?.prenom || ""}`.trim();
  const sousTitre = [
    copie.eleve?.classe,
    copie.corrigeLe && `Corrigée le ${new Date(copie.corrigeLe).toLocaleDateString("fr-FR")}`,
  ].filter(Boolean).join(" · ");
  const contenu = [
    {
      columns: [
        {
          stack: [
            { text: copie.evaluation?.titre || "Évaluation", color: VIOLET, bold: true, fontSize: 9 },
            { text: nom || "Ta copie", bold: true, fontSize: 16, margin: [0, 2, 0, 2] },
            sousTitre && { text: sousTitre, color: DOUX, fontSize: 8.5 },
          ].filter(Boolean),
        },
        {
          width: "auto",
          text: [
            { text: nombre(copie.note?.valeur), fontSize: 24, bold: true, color: VIOLET },
            { text: ` / ${nombre(copie.note?.sur ?? 20)}`, fontSize: 11, color: DOUX },
          ],
        },
      ],
      margin: [0, 0, 0, 10],
    },
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.6, lineColor: "#e0dced" }],
      margin: [0, 0, 0, 10] },
  ];
  if (copie.appreciation?.trim()) {
    contenu.push({
      ...encadre({ stack: [
        { text: "Appréciation", bold: true, fontSize: 10, color: VIOLET, margin: [0, 0, 0, 3] },
        { text: copie.appreciation, fontSize: 9.5 },
      ] }, VIOLET_PALE),
      margin: [0, 0, 0, 14],
    });
  }
  for (const q of copie.questions || []) contenu.push(question(q));

  return {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 44],
    defaultStyle: { font: "Quicksand", fontSize: 9.5, lineHeight: 1.2 },
    info: { title: `${copie.evaluation?.titre || "Copie"} — ${nom}` },
    footer: (page, total) => ({
      text: `${nom} — ${copie.evaluation?.titre || ""} · ${page} / ${total}`,
      alignment: "center", fontSize: 7.5, color: DOUX, margin: [0, 14, 0, 0],
    }),
    content: contenu,
  };
}

/** Fabrique et télécharge le PDF. Rend une promesse : le premier appel attend
    le chargement de pdfmake et des polices. */
export async function telechargerPdf(copie) {
  const pdfMake = await preparer();
  await new Promise((fini) => pdfMake.createPdf(documentDe(copie)).download(nomDuPdf(copie), fini));
}

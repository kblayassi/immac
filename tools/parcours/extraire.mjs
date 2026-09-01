/* Extrait le contenu testable d'une séance du parcours Python.
 *
 * Le dépôt n'est pas un paquet ESM ("type": "module" absent de package.json) :
 * un import direct de seances/sNN.js échouerait sous Node, alors que le
 * navigateur les charge sans problème via <script type="module">. On lit donc le
 * fichier et on l'évalue depuis une URL data:, ce qui court-circuite la détection
 * de type. Les fichiers de séance n'important rien, c'est sans conséquence.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ici = dirname(fileURLToPath(import.meta.url));
const id = process.argv[2];
const source = readFileSync(join(ici, "..", "..", "docs", "parcours-python", "seances", `${id}.js`), "utf8");
const def = (await import("data:text/javascript;charset=utf-8," + encodeURIComponent(source))).default;

const etapes = [];
for (const partie of def.parties) {
  for (const e of partie.etapes) {
    etapes.push({
      id: e.id, type: e.type, partie: partie.id, titre: e.titre,
      depart: e.depart ?? null, solution: e.solution ?? null,
      validation: e.validation ?? null,
      saisiesTest: e.saisiesTest ?? null,
      indices: (e.indices || []).length,
      options: (e.options || []).map((o) => !!o.correct),
    });
  }
}
console.log(JSON.stringify({ id: def.id, numero: def.numero, titre: def.titre, etapes }));

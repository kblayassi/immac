/* Juger une réponse : comparaison des sorties et lecture du code.
 *
 * Ces fonctions disaient déjà, dans le moteur des parcours, ce que « la réponse
 * est juste » veut dire : une espace en trop ne compte pas, les accents non
 * plus, mais « 1 2 3 » n'est pas « 123 ». Elles vivent ici parce qu'un deuxième
 * outil s'en sert désormais — la correction des évaluations (docs/eval/).
 *
 * Un barème doit juger exactement comme le parcours validait : une seule
 * définition, partagée, plutôt que deux qui divergeront.
 */

/* Comparaison de sorties : on ne veut pas qu'une espace en fin de ligne ou une
   ligne vide finale fasse échouer un élève dont le programme est juste. */
export function normaliser(texte) {
  return String(texte ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "")
    .replace(/^\n+/, "");
}

/* Les accents ne sont pas davantage l'objet des exercices : « Frequence » tapé
   au clavier vaut « Fréquence ». On les retire des deux côtés de la comparaison. */
export function sansAccents(texte) {
  return String(texte).normalize("NFD").replace(/\p{M}/gu, "");
}

/* Comparaison indulgente, pour juger une réponse et non une frappe : ni la casse,
   ni l'espacement, ni les accents ne sont l'objet des exercices. « Total :30 »,
   « total : 30 » et « TOTAL:  30 » sont la même réponse.

   Un espace reste exigé entre deux caractères alphanumériques : sans cela
   « 1 2 3 » et « 123 » deviendraient identiques, et là c'est bien la réponse qui
   change — print(a, b, c) ne fait pas la même chose que print(str(a) + str(b)). */
export function comparable(texte) {
  return sansAccents(normaliser(texte).toLowerCase())
    .replace(/[ \t]+/g, " ")
    .replace(/ ?([^\p{L}\p{N} \n]) ?/gu, "$1");
}

/* …sauf quand l'espacement EST l'exercice. Une sortie attendue qui indente une
   ligne ou aligne des colonnes dessine une figure : sapin, losange, cadre,
   bannière, histogramme. Là, un espace de trop est une faute, et la comparaison
   redevient exacte. Neuf étapes sont dans ce cas ; `sortieStricte` permet de le
   forcer ailleurs — ou de le refuser, quand des colonnes alignées ne sont qu'une
   mise en page suggérée (les deux tables de vérité). */
export const SORTIE_MISE_EN_FORME = /^[ \t]|[ \t]{2,}/m;

/* Même indulgence pour `sortieRegex`. Le motif est écrit par l'enseignant, avec
   l'espacement de la solution : « Rendu : 3 euros ». L'élève qui écrit
   « Rendu: 3 euros » — ou une f-string sans espace avant les deux-points — donne
   la même réponse. On relâche donc les espaces littéraux du motif, selon la règle
   de comparable() : facultatifs au contact d'une ponctuation, toujours exigés
   entre deux mots (« 1 2 3 » ≠ « 123 »). Jamais un saut de ligne à la place, et
   ni les classes [ \t] ni les échappements \d \s ne sont touchés. */
export function motifIndulgent(motif) {
  // Le littéral que représente le motif à l'indice i, ou null si c'est un
  // métacaractère ou une classe abrégée (\d, \S…) — donc rien de ponctuel.
  const litteral = (i) => {
    const c = motif[i];
    if (c === undefined) return null;
    if (c === "\\") {
      const d = motif[i + 1];
      return d === undefined || /[A-Za-z0-9]/.test(d) ? null : d;
    }
    return "()[]{}*+?^$|.".includes(c) ? null : c;
  };
  const ponctuation = (c) => c != null && !/[\p{L}\p{N} \t]/u.test(c);

  let sortie = "";
  let classe = false;
  let precedent = null;                       // dernier littéral émis
  for (let i = 0; i < motif.length; i++) {
    const c = motif[i];
    if (c === "\\") { sortie += motif.slice(i, i + 2); precedent = litteral(i); i++; continue; }
    if (classe)      { sortie += c; if (c === "]") classe = false; continue; }
    if (c === "[")   { sortie += c; classe = true; precedent = null; continue; }
    if (c !== " ")   { sortie += c; precedent = litteral(i); continue; }

    let fin = i;
    while (motif[fin + 1] === " ") fin++;     // une suite d'espaces = un espace
    const souple = ponctuation(precedent) || ponctuation(litteral(fin + 1));
    sortie += souple ? "[ \t]*" : "[ \t]+";
    precedent = " ";
    i = fin;
  }
  return sortie;
}

/* Les motifs jugent le programme, pas ce qu'on en dit. Un énoncé de départ écrit
   « pas de else ici » et l'élève, poli, garde le commentaire : sans ce nettoyage,
   la validation lui reproche un else qu'il n'a pas écrit. On retire donc les
   commentaires avant de chercher les motifs — en respectant les chaînes, où un
   dièse reste un caractère ordinaire (`print("###")`). */
export function sansCommentaires(code) {
  let net = "", i = 0;
  while (i < code.length) {
    const c = code[i];
    if (c === '"' || c === "'") {                        // on traverse la chaîne
      const delimiteur = code.slice(i, i + 3) === c + c + c ? c + c + c : c;
      net += delimiteur;
      i += delimiteur.length;
      while (i < code.length) {
        if (code[i] === "\\") { net += code.slice(i, i + 2); i += 2; continue; }
        if (code.slice(i, i + delimiteur.length) === delimiteur) {
          net += delimiteur;
          i += delimiteur.length;
          break;
        }
        if (delimiteur.length === 1 && code[i] === "\n") break;   // chaîne non fermée
        net += code[i++];
      }
      continue;
    }
    if (c === "#") { while (i < code.length && code[i] !== "\n") i++; continue; }
    net += code[i++];
  }
  return net;
}


/* Chercher un motif dans le code, avec les mêmes égards que pour la sortie.
   Python accepte les identifiants accentués, et « prénom » vient naturellement
   sous les doigts d'un élève ; or un motif écrit avec `\w` — qui ne connaît que
   l'ASCII — le rejetterait, alors que le nom du paramètre n'est jamais l'objet
   de l'exercice. On retire donc les accents des deux côtés, du code lu comme du
   motif, comme le fait déjà `sortieRegex`. */
export function codeCorrespond(motif, code, options) {
  return new RegExp(sansAccents(motif), options || "").test(sansAccents(code));
}

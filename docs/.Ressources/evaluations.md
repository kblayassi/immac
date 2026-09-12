# Les évaluations sur écran

Document de travail, non publié (le dossier `.Ressources` est ignoré par MkDocs).
Pour les parcours interactifs, voir `parcours-interactifs.md`.

---

## Ce que c'est

Une application voisine des parcours, mais qui fait le contraire : le sujet est
ouvert d'un bloc, rien ne se valide, rien ne s'explique, un chronomètre tourne, et
à la fin l'élève repart avec un fichier `.json` — son devoir. L'enseignant dépose
ces fichiers et son barème dans une page de correction, qui exécute les programmes
et propose des notes.

| | Parcours | Évaluation |
|---|---|---|
| Progression | étape par étape, déverrouillage strict | tout ouvert, navigation libre |
| Aide | coups de pouce, verdicts | aucune |
| Exécuter du code | oui | oui |
| Savoir si c'est juste | oui | **jamais** |
| Accès | depuis le cours | la page **NSI Première → Évaluations** |
| Fin | quand l'élève veut | chronomètre, puis export forcé |
| Attentes dans la page | dans `seances/*.js` | **nulle part** — elles sont dans le barème |

## Les fichiers

```
docs/eval/                 le moteur, partagé par toutes les évaluations
  eleve.js                 la page de composition
  correction.js/.html      la table de correction (publiée, et vide par nature)
  copie.js/.html           la copie corrigée, côté élève : une page qui ne fait que lire
  bareme.js                la notation — aucune interface, donc testable
  copie-corrigee.js        les retouches et le format de la copie rendue
  rendu.js                 le format du fichier remis, et son empreinte
  eval.css                 ce que la charte des parcours ne couvre pas

  scelle.js                chiffrer et déchiffrer un sujet

  passer.html              LA page d'épreuve, la même pour toutes les évaluations
  evaluations.js           PRODUIT — la liste des évaluations publiées

docs/<cle>/                une évaluation, publiée
  sujet.js                 PRODUIT — questions chiffrées, ne pas modifier à la main

tools/evaluations/         les outils
  sceller_sujet.mjs        chiffre une source vers le sujet publié
  verifier_bareme.mjs      le banc
  executeur.py             l'interpréteur du banc
  prive/                   HORS DÉPÔT (.gitignore) — tout ce qui est secret
    sujet-<cle>.mjs        le sujet en clair : la source
    bareme-<cle>.json      les critères et les points
    controle-<cle>.json    les copies de référence du banc
```

!!! danger "Le dépôt est public"
    `github.com/kblayassi/immac` est un dépôt public : **tout ce qui y est
    versionné se lit**, `tools/` compris. Un barème ou un sujet en clair commité
    serait un barème publié, et le scellement des sujets ne servirait plus à
    rien. D'où `tools/evaluations/prive/`, ignoré par git — **à sauvegarder sur
    la clé USB, il n'existe nulle part ailleurs.**

    L'évaluation à blanc fait exception et reste dans le dépôt : c'est un
    exemple, elle ne cache rien, et son code d'accès (`ESSAI-BLANC-2026`) est
    public de plein droit.

Le moteur emprunte aux parcours `atelier.js` (Python et éditeur),
`comparaison.js` (ce que « juste » veut dire), `archive.js` et `app.css`.
Un barème note donc **exactement** comme un parcours validait.

## Écrire un sujet

La source s'écrit dans `tools/evaluations/prive/sujet-<cle>.mjs`. Elle n'est
jamais publiée : ce qui part en ligne est sa version **scellée**.

Deux règles tiennent malgré le chiffrement, parce qu'un sujet finit toujours par
être ouvert : **aucune attente dans le sujet** (pas de sortie attendue, pas de
motif, pas de bonne réponse — tout cela vit dans le barème), et rien qu'on ne
voudrait pas voir lu par un élève qui entre le code deux minutes avant l'heure.

```js
export const EVALUATION = {
  cle: "eval-nsi-ch1",        // sert au nom du fichier rendu et au localStorage
  titre: "…",
  surTitre: "…",
  dureeMinutes: 55,
  consignes: `<p>…</p>`,       // affiché sur l'écran d'accueil
};

export const QUESTIONS = [
  { id: "d1", type: "document", titre: "…", contenu: `<p>…</p>` },
  { id: "q1", type: "code",  titre: "…", points: 6, enonce: `…`, depart: "…" },
  { id: "q2", type: "qcm",   titre: "…", points: 2, enonce: `…`,
    options: [{ texte: "…" }, …], multiple: false },
  { id: "q3", type: "texte", titre: "…", points: 3, enonce: `…`, lignes: 4 },
];
```

`points` sert **uniquement** à annoncer le barème à l'élève. Le banc vérifie que
ce nombre est bien celui que le barème distribue : un élève qui lit « 6 points »
doit pouvoir en obtenir six.

Il n'y a **rien d'autre à créer** : pas de page à copier, pas de lien à ajouter.
`docs/eval/passer.html` est la page de toutes les évaluations, et le scellage
inscrit la nouvelle dans `docs/eval/evaluations.js`.

## Sceller un sujet

```
node tools/evaluations/sceller_sujet.mjs eval-nsi-ch1
node tools/evaluations/sceller_sujet.mjs eval-nsi-ch1 "RUBIS-LUNE-42"
```

Les questions partent chiffrées (AES-GCM, clé dérivée du code par PBKDF2,
310 000 tours). Le fichier publié ne garde en clair que le titre, la durée, les
consignes générales, le nombre de questions et le total des points : de quoi
annoncer l'épreuve, rien pour la préparer. **Le sujet peut donc être mis en ligne
des semaines à l'avance.**

Sans code en argument, l'outil en fabrique un — trois mots et un nombre, qui se
dictent à l'oral (`MARBRE-VIGIE-ARGILE-50`). Il l'affiche une fois et ne l'enregistre
nulle part : **note-le**. Côté élève, ni la casse ni les tirets ni les espaces ne
comptent.

L'outil vérifie son propre travail avant d'écrire : il rouvre le scellé qu'il
vient de produire, compare à la source, et s'assure qu'un code faux ne l'ouvre
pas. En cas d'écart, rien n'est écrit.

Après chaque retouche de la source, **rescelle** — et le code change. Le banc
d'essai refuse un scellé qui ne correspond plus à sa source.

Ce que cela ne fait pas : empêcher un élève qui a le code de le donner à un autre
qui compose plus tard. Pour deux groupes à deux heures différentes, il faut deux
scellés et deux codes.

## Écrire un barème

Un `.json` dans `tools/evaluations/`, jamais dans `docs/`.

```json
{
  "format": "bareme/v1",
  "evaluation": "eval-nsi-ch1",
  "noteSur": 20,
  "arrondi": 0.25,
  "questions": {
    "q1": { "titre": "…", "criteres": [
      { "points": 1, "libelle": "S'exécute sans erreur", "sansErreur": true },
      { "points": 3, "libelle": "Affiche 55",            "sortie": "55" },
      { "points": 2, "libelle": "Emploie une boucle",    "codeContient": "\\b(for|while)\\b" }
    ]},
    "q2": { "points": 2, "correct": 2 },
    "q3": { "points": 3, "accepte": ["délimite", "bloc"] }
  }
}
```

**Critères d'une question `code`** — un critère porte des points et *une* attente :

| Clé | Ce qu'elle exige |
|---|---|
| `sansErreur` | le programme va au bout |
| `sortie` | la sortie attendue, aux espaces et aux accents près |
| `sortieContient` | un fragment présent quelque part |
| `sortieRegex` | un motif (espaces relâchés, comme dans les parcours) |
| `codeContient` | un motif dans le programme, commentaires retirés |
| `codeAbsent` | un motif interdit |
| `tests` | des assertions Python jouées sur son espace de noms |

Deux réglages facultatifs : `saisies` (les réponses données aux `input()`, puisque
personne n'est là pour taper) et `sortieStricte` (espacement exact, pour les figures).

`saisies` se déclare **sur la question**, à côté de `criteres` : tous les critères
en héritent. Un critère peut la redéfinir pour un second jeu de valeurs.

**QCM** : `correct` est un indice (0 = A). Une liste pour un QCM à réponses
multiples, avec `partiel: true` pour une note proportionnelle.

**Texte** : le barème ne déclare qu'un maximum (`points`), et rien d'autre. Une
réponse rédigée **n'est jamais notée automatiquement** : chercher un mot-clé dans
une phrase d'élève donne des points à qui a recopié le vocabulaire sans
comprendre, et les refuse à qui a dit la même chose avec ses mots. La question
apparaît en orange dans la table, avec « à noter à la main ».

## Vérifier un barème

```
node tools/evaluations/verifier_bareme.mjs             # tous
node tools/evaluations/verifier_bareme.mjs eval-blanc  # un seul
```

Voir aussi `evaluation-nouvelle.md` : la marche à suivre complète, de la page
blanche aux copies rendues.

Le banc vérifie d'abord que **le sujet publié ne livre rien** : pas de questions
en clair, un scellé à jour de la source, et un code faux qui reste faux. C'est le
contrôle le plus important du lot — celui dont l'oubli se remarquerait le plus
tard, et le plus mal.

Puis il joue le barème sur les copies de référence de `controle-<nom>.json` — une
parfaite, une blanche, et autant de fautives que l'on veut — et vérifie que
chacune obtient exactement la note annoncée. **Écrire les copies de référence
fait partie du travail d'écriture du barème** : c'est là qu'on découvre qu'un
critère est trop strict, ou qu'un élève rusé aurait les points sans avoir compris.

Les programmes y tournent dans le Python de la machine, pas dans Pyodide.

## Le parcours de l'élève

Une seule adresse, la même toute l'année : **NSI Première → Évaluations → Passer une
évaluation** (`/immac/eval/passer.html`).

1. Un champ, et un seul : le **code**. La page l'essaie sur chaque évaluation
   publiée jusqu'à ce que l'une s'ouvre — c'est le code qui désigne le sujet,
   l'élève n'a rien à choisir et ne peut pas se tromper d'épreuve.
2. Le sujet ouvert, l'écran d'accueil : titre, durée, consignes, identité.
3. **Commencer** lance le chronomètre.

Si la page se ferme, la rouvrir suffit : le poste se souvient de l'évaluation en
cours et **ne redemande pas le code** — le tableau ne l'affiche peut-être plus.
Ce repère est effacé quand l'élève clique sur **Quitter l'évaluation** à la fin.

## Corriger

`/immac/prof/NSI/Evaluations/` → **Corriger les copies** (le bouton n'existe que dans
la version prof), ou directement `/immac/eval/correction.html`. On y dépose
le barème et les copies, ensemble ou par paquets, par glisser-déposer. Rien ne
part sur un réseau : il n'y a pas de serveur.

La table donne une ligne par élève, une colonne par question, le total et la note.
Un clic sur **Voir** déplie la copie, et c'est là que tout se corrige :

* le code tel qu'il a été écrit, et chaque critère avec son verdict ;
* **les points de chaque exercice**, dans un champ qui prend le pas sur le barème ;
* **une annotation par exercice** — c'est elle qui fait la différence entre une
  note et une correction : l'élève doit lire *pourquoi* il a perdu ces points-là ;
* **la note finale**, elle aussi retouchable : additionner des points ne fait pas
  toujours une note ;
* **l'appréciation générale**.

**Ce qui est saisi à la main l'emporte toujours**, aux trois étages —
l'auto-correction propose. Les retouches restent dans le navigateur, par
évaluation et par élève ; fermer l'onglet au milieu d'un paquet ne perd rien.

En orange, les cases qu'aucun barème ne peut trancher seul (réponses rédigées).
En violet, celles qu'on a retouchées.

Deux exports : le **CSV** des notes, prêt pour un tableur français, et les
**copies corrigées** en une archive ZIP — un fichier par élève, à déposer sur
l'ENT.

## Rendre la copie

L'élève ouvre **NSI Première → Évaluations** → **Consulter ma copie corrigée**
(`/immac/eval/copie.html`) et y dépose le fichier reçu (celui
dont le nom commence par `copie-`). Il y voit ses réponses, ses points question
par question avec le détail des critères, les annotations, la note et
l'appréciation. La page ne fait que lire : rien n'y est modifiable, rien n'en
sort, le fichier ne quitte pas son navigateur.

Le détail des critères figure dans la copie : c'est la justification des points,
et un barème montré après coup est un barème qui instruit. Il est donc inutile
de rendre les copies d'une classe avant qu'une autre n'ait composé.

## Les garde-fous, et ce qu'ils valent

Le site est statique : pas de serveur, donc pas de contrôle réel.

* **Le sujet scellé** est la seule protection vraiment solide du lot : sans le
  code, il n'y a rien à lire dans le fichier publié, pour personne. Sa limite est
  humaine — un élève qui a le code peut le transmettre.
* **Le chronomètre** part au clic sur « Commencer » et l'heure de fin est écrite
  dans le navigateur : recharger la page, changer d'onglet ou fermer l'ordinateur
  ne rend pas une minute. Vider le stockage du navigateur, si.
* **L'empreinte** (SHA-256) repère un fichier retouché après la remise. Elle ne
  résiste pas à quelqu'un qui lit le code de la page : c'est un scellé, pas un
  coffre.
* **Le journal** note les exécutions, les collages et les sorties d'onglet, avec
  leur horaire. Il est annoncé à l'élève sur l'écran d'accueil et figure en clair
  dans son fichier — rien ne se passe dans son dos. C'est le plus utile des
  trois : refabriquer un journal cohérent est autrement plus difficile que de
  changer une réponse.
* La page de correction affiche ces signaux comme des **choses à regarder**,
  jamais comme des accusations : un élève qui consulte sa messagerie et un élève
  qui cherche la réponse produisent le même événement.

Le vrai garde-fou reste la surveillance en salle.

## Ce qui reste ouvert

* L'export d'office en fin de temps part sans clic de l'élève ; certains
  navigateurs peuvent le retenir. La fenêtre de remise propose alors le bouton —
  **à essayer une fois sur les machines de la salle** avant la première épreuve.
* Rien n'empêche d'ouvrir le cours dans un autre onglet.
* Aucune reprise de copie après la remise : c'est volontaire.

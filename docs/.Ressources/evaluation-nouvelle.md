# Créer une nouvelle évaluation

Document de travail, non publié. La référence complète — tous les types de
question, toutes les clés de critère, les garde-fous et ce qu'ils valent — est
dans `evaluations.md`. Ici, la marche à suivre, dans l'ordre.

Prenons pour exemple une évaluation de NSI sur le chapitre 1, de clé
`eval-nsi-ch1`. **La clé sert partout** : nom des fichiers, nom du dossier
publié, nom du rendu de l'élève. Choisis-la une fois, en minuscules, sans accent.

---

## 1. Écrire le sujet

Un seul fichier, dans le dossier qui ne quitte pas cet ordinateur :

```
tools/evaluations/prive/sujet-eval-nsi-ch1.mjs
```

```js
export const EVALUATION = {
  cle: "eval-nsi-ch1",
  titre: "Chapitre 1 — Premiers pas en Python",
  surTitre: "NSI · Première",
  dureeMinutes: 55,
  consignes: `
    <p>Tous les exercices sont accessibles dès le début. Traite-les dans l'ordre
    que tu veux.</p>`,
};

export const QUESTIONS = [
  {
    id: "q1", type: "code", titre: "La somme des dix premiers entiers", points: 6,
    enonce: `<p>Écris un programme qui affiche la somme <code>1 + 2 + … + 10</code>.</p>`,
    depart: "somme = 0\n\n",
  },
  {
    id: "q2", type: "qcm", titre: "Le type d'une valeur", points: 2,
    enonce: `<pre class="bloc-code"><code>x = "12"</code></pre>
             <p>Quel est le type de <code>x</code> ?</p>`,
    options: [{ texte: "<code>int</code>" }, { texte: "<code>str</code>" }],
  },
  {
    id: "q3", type: "texte", titre: "Expliquer", points: 3, lignes: 3,
    enonce: `<p>À quoi sert l'indentation en Python ?</p>`,
  },
];
```

Quatre types : `code`, `qcm`, `texte`, et `document` (un texte à lire, jamais
noté — énoncé commun, annexe, rappel).

!!! danger "Deux règles qui tiennent malgré le chiffrement"
    - **Aucune attente dans le sujet.** Pas de sortie attendue, pas de motif, pas
      de bonne réponse : tout cela vit dans le barème. Le sujet finit toujours par
      être ouvert.
    - `points` sert **uniquement** à annoncer le barème à l'élève. Le banc
      vérifiera que le barème distribue bien ce nombre-là.

## 2. Écrire le barème

```
tools/evaluations/prive/bareme-eval-nsi-ch1.json
```

```json
{
  "format": "bareme/v1",
  "evaluation": "eval-nsi-ch1",
  "noteSur": 20,
  "arrondi": 0.25,
  "questions": {
    "q1": { "titre": "La somme des dix premiers entiers", "criteres": [
      { "points": 1, "libelle": "S'exécute sans erreur", "sansErreur": true },
      { "points": 3, "libelle": "Affiche 55", "sortie": "55" },
      { "points": 2, "libelle": "Emploie une boucle", "codeContient": "\\b(for|while)\\b" }
    ]},
    "q2": { "points": 2, "correct": 1 },
    "q3": { "points": 3 }
  }
}
```

- **Code** : autant de critères que tu veux, chacun avec ses points et *une*
  attente (`sansErreur`, `sortie`, `sortieContient`, `sortieRegex`,
  `codeContient`, `codeAbsent`, `tests`).
  Si le programme appelle `input()`, déclare `"saisies": ["3", "4"]` **sur la
  question**, à côté de `criteres` : tous les critères en héritent. Personne ne
  sera là pour taper, et un critère exécuté sans entrée échoue sur une erreur qui
  n'est pas celle de l'élève.
- **QCM** : `correct` est un indice, `0` = A. Une liste pour un QCM à réponses
  multiples.
- **Texte** : seulement `points`. Une réponse rédigée **n'est jamais notée
  automatiquement** ; elle apparaîtra en orange dans la table, à noter à la main.

La somme des points de chaque question doit égaler le `points` annoncé dans le
sujet.

## 3. Écrire les copies de référence

C'est l'étape qu'on a envie de sauter, et c'est celle qui trouve les fautes de
barème. Une copie parfaite, une copie blanche, et les erreurs que tu sais que tes
élèves feront.

```
tools/evaluations/prive/controle-eval-nsi-ch1.json
```

```json
{
  "cas": [
    { "nom": "copie parfaite", "attendu": 8, "reponses": {
      "q1": { "code": "somme = 0\nfor i in range(1, 11):\n    somme += i\nprint(somme)\n" },
      "q2": { "choix": 1 },
      "q3": { "texte": "Elle délimite les blocs." }
    }},
    { "nom": "copie blanche", "attendu": 0, "reponses": {} },
    { "nom": "somme écrite en dur", "attendu": 4, "reponses": {
      "q1": { "code": "print(55)\n" }, "q2": { "choix": 1 }
    }}
  ]
}
```

`attendu` est le total **automatique**, avant toute retouche à la main : les
questions rédigées y valent donc toujours 0.

!!! tip "Ne calcule pas les totaux à la main"
    Mets n'importe quoi dans `attendu`, lance le banc, et reporte les nombres
    qu'il annonce — après avoir vérifié qu'ils sont justes. C'est plus rapide et
    moins faux.

## 4. Vérifier

```
node tools/evaluations/verifier_bareme.mjs eval-nsi-ch1
```

Le banc contrôle que chaque question notée existe dans le sujet, que les points
annoncés sont ceux distribués, que chaque copie de référence obtient sa note, et
que la copie corrigée porte les mêmes nombres que la table de correction.

Tant qu'il n'est pas vert, l'évaluation n'est pas prête.

## 5. Sceller

```
node tools/evaluations/sceller_sujet.mjs eval-nsi-ch1
```

Les questions partent chiffrées vers `docs/eval-nsi-ch1/sujet.js`, et
l'évaluation s'inscrit toute seule dans `docs/eval/evaluations.js`. Il n'y a
**rien d'autre à créer** : pas de page, pas de lien.

L'outil affiche un code — trois mots et un nombre :

```
CODE DE L'ÉVALUATION : MARBRE-VIGIE-ARGILE-50
```

Il est consigné dans `tools/evaluations/prive/codes.json`, hors dépôt, et
`node tools/evaluations/evaluations.mjs` te le rappellera. Ce carnet ouvre
toutes les épreuves publiées : il se sauvegarde sur la clé USB comme les sujets
en clair, et le perdre revient à fermer les épreuves pour tout le monde, toi
compris. Pour choisir le code toi-même :

```
node tools/evaluations/sceller_sujet.mjs eval-nsi-ch1 "CHENE-SOURCE-GIVRE-31"
```

!!! warning "Après chaque retouche du sujet, rescelle"
    Modifier la source ne change rien au fichier publié. Et resceller change le
    code. Le banc refuse un scellé qui ne correspond plus à sa source.

Deux groupes à deux heures différentes ? Deux clés, deux scellés, deux codes —
sinon le premier groupe donne le code au second.

## 5 bis. Gérer les évaluations publiées

Double-clic sur l'app **Console des évaluations** (Spotlight la trouve). La
première fois, fabrique-la :

```
zsh tools/evaluations/creer_raccourci.sh
```

La console s'ouvre dans le navigateur : chaque épreuve, son code (masqué tant
qu'on ne clique pas sur « Afficher »), un interrupteur pour l'activer ou la
désactiver, un bouton pour changer son code. Dès qu'un changement n'est pas en
ligne, un bandeau propose **Publier** — commit et envoi, sans passer par le
terminal. **Arrêter**, en haut, ferme la console.

Ou en ligne de commande :

```
node tools/evaluations/evaluations.mjs                    toutes, par niveau
node tools/evaluations/evaluations.mjs nsi-premiere       un seul niveau
node tools/evaluations/evaluations.mjs --desactiver cle
node tools/evaluations/evaluations.mjs --activer cle
node tools/evaluations/evaluations.mjs --recoder cle [CODE]
```

La liste donne, par niveau, chaque épreuve publiée avec son code, sa durée, ses
points et son état. Le **niveau** vient du champ `niveau` de `EVALUATION` dans
la source : sans lui, l'épreuve est rangée sous « Niveau non déclaré ».

**Désactiver** ne touche pas au sujet scellé : il reste en ligne, mais la page
d'entrée cesse d'essayer son code, qui n'ouvre donc plus rien. C'est réversible,
et c'est le geste qui convient une fois l'épreuve passée. **Recoder** rescelle
le sujet avec un nouveau code, donc exige la source en clair.

!!! warning "Rien n'est effectif avant la publication"
    Ces gestes réécrivent des fichiers du site, pas un réglage en ligne. Tant
    que ce n'est pas publié et le site reconstruit (deux ou trois minutes),
    l'ancien code ouvre encore l'épreuve et une épreuve désactivée reste
    ouverte. Un élève qui a **déjà** ouvert l'épreuve la garde de toute façon :
    le sujet est dans son navigateur.

## 6. Relire le sujet comme un élève

```
mkdocs serve
```

→ **http://127.0.0.1:8000/immac/eval/passer.html**, code en main. C'est le seul
moyen de voir ce que tes élèves verront : la mise en page des énoncés, le code de
départ dans l'éditeur, la longueur réelle de l'épreuve.

Le chronomètre tourne pour de bon : pour recommencer, clique sur **Quitter
l'évaluation** à la fin, ou vide le stockage du site.

## 7. Publier

```
git add docs/eval-nsi-ch1/ docs/eval/evaluations.js
git commit -m "Ajoute l'évaluation du chapitre 1 de NSI"
git push
```

Le dossier `prive/` n'est pas versionné : ni le sujet en clair, ni le barème ne
partent sur GitHub. **Le dépôt est public** — c'est toute la raison d'être du
scellement.

Deux minutes de CI, et le sujet est en ligne, illisible. Tu peux le publier des
semaines à l'avance.

---

## Le jour de l'épreuve

1. Écrire le code au tableau.
2. Les élèves vont sur **NSI Première → Évaluations → Passer une évaluation**, entrent le code,
   leur nom, et cliquent sur **Commencer**.
3. À la fin du temps, le fichier part tout seul. Ramasse-le comme tu ramasses des
   copies — clé USB, ENT, dépôt réseau.

Un élève dont la page s'est fermée la rouvre : son devoir revient, le code n'est
pas redemandé, le temps restant est le bon. **Le même ordinateur**, en revanche.

## Après l'épreuve

1. Aller sur **/immac/prof/NSI/Evaluations/** → **Corriger les copies**.
   En local, la version prof est une **seconde construction** :
   `mkdocs serve -f mkdocs-prof.yml`.
2. Déposer le barème `bareme-eval-nsi-ch1.json` et les copies, ensemble ou par
   paquets.
3. Corriger : les points de chaque exercice, une annotation par exercice, la note
   finale, l'appréciation. Ce qui est saisi à la main l'emporte partout.
4. **Exporter les notes (CSV)** pour le tableur, et **Exporter les copies
   corrigées (ZIP)** pour les élèves — un fichier par élève, à déposer sur l'ENT.
5. Les élèves les ouvrent sur **NSI Première → Évaluations → Consulter ma copie corrigée**.

!!! warning "Le détail du barème est dans la copie corrigée"
    C'est voulu — un barème montré après coup instruit. Mais ne rends pas les
    copies d'une classe avant que l'autre ait composé.

---

## Aide-mémoire

```
node tools/evaluations/verifier_bareme.mjs [cle]     vérifier
node tools/evaluations/sceller_sujet.mjs cle [code]  sceller
zsh tools/evaluations/creer_raccourci.sh            fabriquer l'app de la console
node tools/evaluations/console.mjs                   la console, sans l'app
node tools/evaluations/evaluations.mjs [niveau]      lister, activer, recoder
mkdocs serve                                         relire côté élève
mkdocs serve -f mkdocs-prof.yml                      la page de correction
```

| Fichier | Où | Versionné ? |
|---|---|---|
| `sujet-<cle>.mjs` | `tools/evaluations/prive/` | **non** |
| `bareme-<cle>.json` | `tools/evaluations/prive/` | **non** |
| `controle-<cle>.json` | `tools/evaluations/prive/` | **non** |
| `codes.json` | `tools/evaluations/prive/` | **non** |
| `docs/<cle>/sujet.js` | produit par le scellage | oui (chiffré) |
| `docs/eval/evaluations.js` | produit par le scellage | oui |

Pour fermer une évaluation sans la retirer : `evaluations.mjs --desactiver`.
Pour la retirer vraiment : supprimer `docs/<cle>/`, puis resceller n'importe
quelle autre évaluation — le manifeste oublie les sujets disparus.

**Sauvegarde `tools/evaluations/prive/` sur la clé USB.** Il n'existe nulle part
ailleurs : ni sur GitHub, ni dans le site publié. Le perdre, c'est perdre les
barèmes et les sujets en clair qui ont servi à fabriquer les scellés.

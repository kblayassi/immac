---
title: Parcours interactifs
---

# Prompt de relance — les parcours interactifs

Jumeau de [prompt-de-relance.md](prompt-de-relance.md), pour les **cours interactifs**
(SNT et NSI) : cours découpé en étapes qui se valident une par une, dans l'esprit de
[futurecoder](https://fr.futurecoder.io). La première partie se colle telle quelle au
début d'une session ; le reste est la fiche de référence.

---

## 1 · À coller au début d'une session

> Je travaille sur les **parcours interactifs** de mon site de cours
> (dépôt `kblayassi/immac`, MkDocs Material, publié par CI sur `main`).
>
> Avant de proposer quoi que ce soit, lis `docs/.Ressources/parcours-interactifs.md` :
> il contient l'architecture, toutes les règles de rédaction et les pièges déjà rencontrés.
>
> Aujourd'hui, je voudrais : **……**
>
> Points de méthode :
>
> - une séance = découverte + application + défis, **toujours**, même courte ;
> - les coups de pouce ne donnent **jamais** la ligne complète de la solution ;
> - exiger l'usage des variables déjà définies dans le code de départ ;
> - `python3 tools/parcours/verifier_seance.py` doit être vert avant de me montrer quoi que ce soit ;
> - mettre `nbEtapes` à jour dans le manifeste ;
> - ne commite et ne pousse que si je te le demande.

!!! tip "La méthode qui a marché"
    Écrire **une séance**, la faire valider, puis enchaîner. C'est ainsi que les
    24 séances existantes ont été produites : la première sert de gabarit, les
    ajustements de ton et de densité se font dessus une bonne fois.

---

## 2 · Les parcours en deux minutes

| | |
|:--|:--|
| **Nature** | pages **statiques**, copiées telles quelles par MkDocs — pas de gabarit Material, pas de nav |
| **Moteur** | `docs/parcours/app.js` et `app.css`, **partagés** par tous les parcours |
| **Exécution Python** | `docs/javascripts/pyodide-worker.js` — le même que les playgrounds du site |
| **Analyse HTML/CSS** | `docs/parcours/web-verif.js` — sans dépendance, partagé avec le banc de test |
| **Archive du rendu** | `docs/parcours/archive.js` — écrit un ZIP à la main, sans dépendance |
| **Éditeur** | `docs/javascripts/codemirror-bundle.js` |
| **Sauvegarde** | `localStorage`, clé issue de `PARCOURS.cle` · export/import par fichier `.json` |
| **Version élève / prof** | `plugins/version_eleve.py` retire le champ `solution` de tous les `parcours-*` à la construction, et pose côté prof le drapeau `window.PARCOURS_PROF` qui déverrouille les étapes et rend la correction |
| **Vérification** | `python3 tools/parcours/verifier_seance.py` |

```
docs/parcours/                  LE MOTEUR, partagé
├── app.js                      étapes, verrous, validation, sauvegarde
└── app.css

docs/parcours-python/           un parcours (SNT)
├── index.html                  la coquille
└── seances/
    ├── manifeste.js            PARCOURS · PALIERS · CATALOGUE
    └── sNN.js                  tout le contenu pédagogique

docs/parcours-nsi/              l'autre (NSI chapitre 1), même structure
docs/parcours-web/              le troisième (SNT, Le Web) — langage: "web"
```

!!! info "Le moteur ne sait rien du cours"
    `app.js` déroule des étapes et les valide ; il ne connaît aucune notion. **Tout** le
    contenu est dans `seances/sNN.js`. Un ajout de séance ne touche jamais au moteur.

!!! warning "Le moteur se repère à la page, pas à lui-même"
    Il résout `seances/` à partir de `document.baseURI`, c'est-à-dire de l'adresse de
    l'`index.html` qui le charge. C'est ce qui permet à un seul `app.js` de servir
    plusieurs parcours. Conséquence : un parcours doit être un dossier **à un seul
    niveau** sous `docs/`, sans quoi le chemin `../javascripts/` du worker se casse.

| Parcours | Adresse élève | Adresse prof | Volume |
|:--|:--|:--|:--|
| SNT — Python | `…/immac/parcours-python/` | `…/immac/prof/parcours-python/` | 11 séances, 266 étapes |
| NSI — chapitre 1 | `…/immac/parcours-nsi/` | `…/immac/prof/parcours-nsi/` | 13 séances, 225 étapes |
| SNT — Le Web | `…/immac/parcours-web/` | `…/immac/prof/parcours-web/` | 4 séances, 84 étapes |

L'adresse `prof/` n'est pas listée mais **n'est pas protégée** : qui la connaît y accède.

Côté prof, les corrections sont conservées **et toutes les étapes sont ouvertes** : on
y navigue dans la séance sans avoir à la réussir pas à pas. La première étape non
réussie reste marquée comme active, les suivantes passent à l'état `ouvert` au lieu
de `verrouille`. Le bouton **Correction** des ateliers y est visible d'emblée.

Côté élève, **il n'y a jamais de correction** : l'aide s'arrête aux coups de pouce.
Le moteur ne construit le bouton qu'en version prof, et `plugins/version_eleve.py`
retire de toute façon le champ `solution` des séances publiées — la construction
échoue si l'un d'eux lui échappe.

---

## 3 · Créer un nouveau parcours

1. `mkdir -p docs/parcours-xxx/seances`
2. copier un `index.html` existant, changer le `<title>` et la `<meta name="description">` ;
3. écrire `seances/manifeste.js` avec ses trois exports (voir ci-dessous) ;
4. écrire `seances/s01.js` ;
5. créer la page du site qui y renvoie, avec un bouton
   `[Ouvrir le parcours :material-arrow-right:](../../parcours-xxx/){ .md-button }` ;
6. `mkdocs build` puis `python3 tools/parcours/verifier_seance.py parcours-xxx`.

Rien à modifier dans le moteur, ni dans le hook, ni dans le banc de test : ils traitent
tous les dossiers `parcours-*`.

### Le manifeste

```js
export const PARCOURS = {
  cle: "parcours-nsi-ch1",              // clé localStorage, unique par parcours
  titre: "NSI — Premiers pas en Python", // barre du haut, sur l'accueil
  surTitre: "NSI · Première · Chapitre 1",
  h1: "Premiers pas en Python, version interactive",
  accroche: `Deux ou trois phrases qui disent à qui ça s'adresse et ce qu'on y fait.`,
  retour: { href: "../NSI/1_Premiers_pas_en_Python/Parcours_interactif/", libelle: "Retour au site" },
};

export const PALIERS = [                 // regroupe les séances sur l'accueil
  { id: "donnees", titre: "Partie 1 — Manipuler des données",
    seances: ["s01", "s02", "s03"] },
];

export const CATALOGUE = {               // fiche d'identité de chaque séance
  s01: { numero: 1, nbEtapes: 19, disponible: true,
         titre: "Les variables",
         resume: "Affectation, écrasement, incrémentation, nommage." },
};
```

!!! danger "`nbEtapes` doit suivre le contenu"
    Il sert à calculer l'avancement **sans charger la séance**. S'il ment, la jauge et le
    compteur mentent. L'application signale l'écart dans la console du navigateur, et le
    banc de test l'affiche en tête de rapport — mais il ne bloque pas.

    `disponible: false` grise la carte et la rend inerte : c'est ainsi qu'on annonce une
    séance à venir.

---

## 4 · Anatomie d'une séance

```js
export default {
  id: "s01",              // doit valoir le nom du fichier
  numero: 1,
  titre: "Les variables",
  sousTitre: "Mémoriser des données pour les manipuler",
  palier: "Partie 1 — Manipuler des données",   // sur-titre de la page

  accroche: `Deux ou trois phrases qui donnent envie et situent l'enjeu.`,
  objectifs: ["…", "…"],                        // HTML autorisé
  motDeLaFin: `Ce qu'on saura faire ensuite, et l'annonce de la séance suivante.`,

  parties: [ { … }, { … }, { … } ],
};
```

Une **partie** :

```js
{
  id: "decouverte",       // decouverte | application | defis — pilote la couleur
  titre: "Découverte",
  minutes: 40,            // NON affiché : repère pour l'enseignant seulement
  etoiles: 1,             // 1, 2 ou 3 → les ★ à droite de l'en-tête
  intention: "on avance ensemble, une idée à la fois",
  etapes: [ … ],
}
```

!!! note "Le rang des étapes est calculé"
    Le numéro affiché sur le rail vient du moteur, jamais des données : insérer une étape
    au milieu ne demande aucune renumérotation. En revanche, l'**`id`** d'une étape est la
    clé de la progression enregistrée : le changer réinitialise cette étape chez les élèves.
    Convention en place : `d1…dN` pour la découverte, `a1…aN` pour l'application,
    `x1…xN` pour les défis.

---

## 5 · Les quatre types d'étape

Toutes portent `id`, `type`, `titre` et `contenu` (du HTML).

=== "cours"

    Une lecture, validée d'un clic.

    ```js
    { id: "d1", type: "cours", titre: "…",
      contenu: `<p>…</p>`,
      libelleBouton: "Passer aux exercices →",   // facultatif
    }
    ```

=== "qcm"

    ```js
    { id: "d3", type: "qcm", titre: "…",
      contenu: `<p>Le contexte.</p>`,
      code: `x = 5\nprint(x)`,        // facultatif : un bloc de code à lire
      question: "Que se passe-t-il ?",
      options: [
        { texte: "…", explication: "pourquoi c'est faux" },
        { texte: "…", correct: true, explication: "pourquoi c'est juste" },
      ],
      apres: `<span class="chapo">Titre</span> Ce qu'il faut retenir.`,
    }
    ```

    Une réponse fausse est désactivée et son explication s'affiche : **écrire une
    explication pour chaque option**, y compris les fausses — c'est là que se joue
    l'essentiel de l'apprentissage.

=== "prediction"

    Identique au `qcm`, avec un autre libellé de pastille. À réserver au cas
    « lis ce code et anticipe ce qu'il fait **avant** de l'exécuter » : c'est le format
    qui installe le mieux les mécanismes.

=== "code"

    ```js
    { id: "d5", type: "code", titre: "…",
      contenu: `<p>La consigne, et la sortie attendue.</p>`,
      nomFichier: "programme.py",     // facultatif, onglet de l'éditeur
      depart: `n = 47\n\n`,           // code initial
      saisiesTest: ["12", "8"],       // réponses aux input() pour le banc de test
      validation: { … },
      indices: ["…", "…"],            // révélés un par un
      solution: `…`,                  // retirée en version élève
      felicitation: "Message de réussite.",
      apres: `<p>Complément affiché après la réussite.</p>`,
    }
    ```

    Une étape `code` **sans `solution`** est une démonstration : le code est déjà écrit,
    l'élève l'exécute. Le banc vérifie alors que le code de départ passe tel quel.

---

## 6 · Toutes les clés de validation

Les contrôles sont joués **dans cet ordre**, et le premier échec s'affiche en premier :
la forme du code, puis l'exécution, puis la sortie, puis les assertions.

| Clé | Effet |
|:--|:--|
| `codeContient` | liste de `{ motif, message, options }` : le motif **doit** être présent |
| `codeAbsent` | idem, mais le motif est **interdit** |
| `sortie` | sortie attendue, comparée **sans tenir compte de la casse, de l'espacement ni des accents** |
| `sortieContient` | liste de fragments obligatoires, cherchés avec la même indulgence |
| `sortieRegex` (+ `sortieRegexMessage`, `sortieRegexOptions`) | motif sur la sortie : casse, accents et espacement autour de la ponctuation sont détendus |
| `sortieNonVide` | le programme doit afficher quelque chose |
| `sortieStricte` | force (`true`) ou interdit (`false`) la comparaison exacte, espacement compris |
| `tests` | assertions Python jouées **dans l'espace de noms de l'élève** |

- `motif` est une **chaîne** d'expression régulière JavaScript : les antislashs se doublent
  (`"\\bnom\\b"`). `options` accepte les drapeaux, en pratique `"m"` pour le mode multiligne.
- La **normalisation** de la sortie retire les espaces en fin de ligne et les lignes vides
  du début et de la fin.
- La **comparaison** ne juge pas une frappe mais une réponse : `Total :30`, `total : 30`,
  `TOTAL:  30` et `Total : 30` sans accents sont acceptés indifféremment. Un espace reste
  exigé **entre deux caractères alphanumériques**, sinon `1 2 3` et `123` deviendraient la
  même réponse — et là, le programme n'est plus le même.
- **Sauf quand l'espacement est l'exercice.** Si la sortie attendue indente une ligne ou
  aligne des colonnes — sapin, losange, cadre, bannière, histogramme — la comparaison
  redevient exacte, automatiquement. Neuf étapes sont dans ce cas. `sortieStricte: true`
  permet de l'imposer ailleurs ; `sortieStricte: false` de le refuser quand des colonnes
  alignées ne sont qu'un confort de lecture — c'est le cas des deux tables de vérité.
- `sortieRegex` reçoit **la même indulgence** : les espaces littéraux du motif deviennent
  facultatifs au contact d'une ponctuation, et restent exigés entre deux mots. Un motif
  écrit `Rendu : \\d+ euros` accepte donc `Rendu: 3 euros`, ce qu'écrit une f-string. Un
  saut de ligne, lui, n'est jamais toléré à la place d'un espace.
- Ce que la sortie ne dit plus, les règles sur le **code** continuent de le dire :
  `codeContient` et `codeAbsent` sont inchangés, et restent le bon endroit pour exiger un
  `print(a, b)` plutôt qu'une concaténation. Attention alors à ne pas exiger une **écriture**
  quand on veut exiger un **résultat** : en NSI, la f-string est connue depuis la séance 3,
  donc un motif qui réclame une virgule (`",\\s*True\\s+or\\s+True"`) refuse une solution
  juste. Écrire `"[,{]\\s*True\\s+or\\s+True"` accepte les deux écritures.
- Le message de chaque `assert` s'affiche à l'élève : **le rédiger comme une explication**
  du comportement attendu, jamais comme un code d'erreur.

!!! example "Les trois motifs à connaître par cœur"
    ```js
    // 1. Forcer l'usage d'une variable déjà définie dans le code de départ.
    //    Le départ n'en contient qu'une occurrence : en exiger deux, c'est
    //    exiger qu'elle soit réellement utilisée.
    { motif: "\\bbonbons\\b[\\s\\S]*\\bbonbons\\b",
      message: "Sers-toi de la variable bonbons plutôt que de réécrire sa valeur." }

    // 2. Interdire d'écrire le résultat à la main.
    { motif: "\\b408\\b", message: "Le résultat doit être calculé par Python." }

    // 3. Exiger une imbrication (un if, une boucle, dans un autre bloc).
    { motif: "\\n {4,}if\\b", message: "Le second if doit être imbriqué dans le premier." }
    ```

---

## 7 · Écrire le contenu : la mise en forme disponible

Le champ `contenu` est du **HTML brut**. Ce qui est stylé :

| Écriture | Rendu |
|:--|:--|
| `<pre class="bloc-code"><code>…</code></pre>` | bloc de code d'illustration |
| `<pre class="bloc-code sans-copie">` | idem, **incopiable** (voir plus bas) |
| `<div class="encadre">` | encadré neutre |
| `<div class="encadre" data-ton="attention">` | encadré orange — un piège |
| `<div class="encadre" data-ton="astuce">` | encadré vert — un conseil |
| `<div class="encadre" data-ton="scratch">` | encadré jaune — un script Scratch |
| `<span class="chapo">Titre</span>` | titre d'encadré, en tête de son contenu |
| `<div class="enveloppe-table"><table class="table-simple">` | tableau, défilable sur mobile |
| `<kbd>Entrée</kbd>` | une touche du clavier |
| `<code>`, `<strong>`, `<em>`, `<ul>`, `<ol>` | comme partout |

!!! warning "Les figures à reproduire doivent être incopiables"
    Dès qu'un exercice consiste à **reproduire un dessin au caractère près** (triangle,
    sapin, damier, histogramme), la figure de l'énoncé porte `sans-copie` : sélection,
    copie et glisser-déposer bloqués, et un repère « à recopier » s'affiche en haut à
    droite. Sans cela, l'exercice se résout par un copier-coller.

    Cela ne concerne **que** les figures. Une sortie textuelle attendue reste copiable :
    la recopier dans un `print` est justement une partie du travail.

!!! tip "Les images"
    Chemin relatif depuis le parcours : `../files/NSI/Python1/affectation.png`.
    Les illustrations des cours existants se réutilisent telles quelles.

---

## 8 · Les règles de rédaction

### La structure, toujours la même

Trois parties, **même quand une séquence est courte** : `decouverte` (⭐), `application`
(⭐⭐), `defis` (⭐⭐⭐). Une découverte de six étapes vaut mieux qu'une découverte gonflée.

Le déroulement est **strictement linéaire** : une seule étape active à la fois, les défis
après les exercices. Aucune notion n'est rencontrée avant d'avoir été vue — c'est ce qui
permet d'être exigeant sur les validations.

### La découverte

- une idée par étape, et **du code dès la troisième étape** ;
- alterner `cours`, `prediction` et `code` : trois cours d'affilée, personne ne lit ;
- la `prediction` sert à installer un mécanisme contre-intuitif (`=` contre `==`,
  `input()` qui renvoie du texte, `return` qui interrompt une boucle) ;
- terminer par une étape `cours` intitulée **« Le mémo de la séance »**, avec un tableau
  récapitulatif et un encadré « les erreurs qui reviennent ».

### Les coups de pouce

!!! danger "Un indice ne donne jamais la ligne complète"
    C'est la règle la plus importante, et celle qu'on enfreint sans le vouloir.
    **Décrire le geste, nommer les outils, ne pas assembler la ligne.**

    | ❌ | ✅ |
    |:--|:--|
    | « Écris `int(a) + int(b)` dans le print. » | « Additionne la conversion de `a` et celle de `b`, dans le print. » |
    | « `return (b // a) * a` » | « Le quotient entier de `b` par `a` compte combien de fois `a` tient dans `b` ; il suffit de le remultiplier par `a`. » |
    | « `print(\" \" * (h - i) + \"*\" * (2*i-1))` » | « À la ligne `i`, il y a `h - i` espaces et `2 * i - 1` étoiles. » |

    Un fragment court reste permis (`<code>**</code>`, `<code>a, b = …, …</code>`) :
    c'est une ligne **entière** qu'il ne faut pas livrer.

    Depuis que le bouton **Correction** est retiré aux élèves, le dernier indice est leur
    seule issue : il doit être très directif, mais rester une consigne, pas une réponse.

Compter **2 à 3 indices** par étape de code. Ordre : orienter, puis préciser la méthode,
puis nommer précisément ce qui manque.

### Les exercices

- **exiger l'usage des variables déjà définies** — c'est la règle qui change le plus la
  qualité du code produit ;
- **interdire d'écrire le résultat** dès qu'il est calculable ;
- séparer **calculs et affichage** dès que l'exercice dépasse trois lignes : préparer des
  variables intermédiaires, puis afficher ;
- une **chasse aux bugs** par séance, avec deux ou trois erreurs de nature différente
  (syntaxe, sémantique, indentation) ;
- le dernier défi est **libre**, validé sur la structure (nombre de fonctions, présence
  d'une boucle, nombre de lignes affichées) et non sur une sortie exacte.

### Le ton

Tutoiement, phrases courtes, jamais de familiarité forcée. Les `felicitation` disent ce
qui vient d'être acquis, pas « bravo ». Un emoji par message, au plus.

!!! warning "Ne pas afficher de durées à l'élève"
    Les `minutes` restent dans les données comme repère pour l'enseignant. Un élève qui
    lit « 45 min » et met une heure se croit en retard.

---

## 9 · Les pièges techniques

!!! danger "`input()` et `random` ne se mélangent jamais"
    Le worker ne peut pas se mettre en pause pour attendre le clavier
    (pas de `SharedArrayBuffer` sur GitHub Pages) : il **rejoue le programme depuis le
    début** à chaque saisie, avec les réponses déjà connues. Un `randint()` donnerait donc
    une valeur différente à chaque proposition.

    Dans une étape qui utilise `input()`, fixer la valeur « aléatoire » et l'expliquer par
    un encadré. C'est ce qui a été fait pour l'exercice du drapeau (NSI, séance 8).

!!! danger "`print` insère une espace avant chaque valeur"
    `print("Total", 12, ".")` affiche `Total 12 .`. Aucune sortie attendue ne peut donc
    coller de ponctuation à un nombre, tant que les f-strings ne sont pas enseignées.
    Reformuler l'énoncé plutôt que de contourner.

!!! danger "Vérifier les flottants dans un vrai Python"
    `50 / 3.6` affiche `13.88888888888889`, pas `13.888888888888888`. Ne jamais écrire une
    sortie attendue contenant un flottant sans l'avoir fait calculer. Pour les assertions,
    préférer une tolérance : `assert abs(f(50) - 13.8889) < 0.0001`.

!!! warning "Le code de départ ne doit pas déjà passer"
    Piège vécu : deux bugs qui se compensaient dans une chasse aux bugs, l'exercice était
    résolu sans y toucher. Le banc de test le détecte, mais seulement si l'étape a une
    `solution`.

!!! warning "Un `codeAbsent` peut rejeter la bonne réponse"
    Interdire `\b18\b` pour empêcher d'écrire un résultat casse une solution qui a
    légitimement besoin de 18. Toujours viser le **résultat écrit en dur**, pas un chiffre.

!!! warning "Un bloc qui ne contient qu'un commentaire est une erreur"
    Un `if` ou un `def` dont le corps n'est qu'un `#` lève une `IndentationError` : l'élève
    qui clique sur ▶ avant d'écrire quoi que ce soit reçoit une erreur incompréhensible.
    Mettre une instruction bidon à remplacer (`print("À remplacer")`, `base = base`, `0`).

!!! warning "Les guillemets français ne sont pas des guillemets"
    Dans un énoncé, `« … »` est du texte ; dans du code, seuls les guillemets droits
    fonctionnent. Le préciser une fois par parcours, dans un indice.

---

## 9 bis · Les parcours web (HTML / CSS)

Un parcours dont le manifeste porte `langage: "web"` bascule sur un autre atelier :
plusieurs fichiers en onglets, un **aperçu réel** rafraîchi 450 ms après la frappe, et
une validation par **analyse du code** au lieu d'une sortie console. Tout le reste — rail
des étapes, verrous, progression, QCM, coups de pouce — est le moteur commun.

### L'étape de code

```js
{ id: "d3", type: "code", titre: "…",
  contenu: `…`,
  fichiers: [
    { nom: "index.html", depart: `…` },
    { nom: "style.css",  depart: `…` },
  ],
  apercu: "index.html",     // page affichée au départ ; défaut : le 1er .html
  reprend: "d2",            // recopie le travail de l'étape d2 (projets en plusieurs temps)
  validation: { … },
  indices: [ … ],
  solution: {               // TOUJOURS la forme multiligne : c'est elle que le hook retire
    "index.html": `…`,
  },
}
```

L'aperçu remplace chaque `<link rel="stylesheet">` par le contenu du fichier CSS de
l'atelier : l'élève écrit un vrai site en plusieurs fichiers alors que l'iframe n'en reçoit
qu'un.

**Les liens y fonctionnent vraiment**, et pas de la même façon selon leur nature :

| Lien | Ce qui se passe |
|:--|:--|
| `href="autre.html"` | intercepté, remonté au parent, l'aperçu change de page |
| `href="#ancre"` | laissé au navigateur |
| `href="https://…"`, `mailto:` | **ouvert nativement** dans un nouvel onglet |
| `href="www.site.fr"` | refusé, avec le message « il manque le protocole : écris https://… » |
| page inexistante | refusé, avec la liste des pages disponibles |

!!! danger "Un lien externe ne peut PAS passer par le parent"
    Première version : le script d'aperçu remontait tous les clics et le parent appelait
    `window.open`. Or `postMessage` est asynchrone : l'appel se retrouve hors du geste de
    l'élève, et le navigateur le bloque comme une fenêtre surgissante. La bonne solution
    est de poser `target="_blank"` sur les liens externes et de **laisser le navigateur
    faire** — d'où `allow-popups` et `allow-popups-to-escape-sandbox` dans le `sandbox`
    de l'iframe (jamais `allow-same-origin` : le code de l'élève ne doit rien pouvoir
    lire du parcours).

### Les clés de validation

Jouées dans cet ordre, et le premier groupe qui échoue s'affiche seul : **syntaxe →
forme du code → structure → style effectif**.

| Clé | Effet |
|:--|:--|
| *(automatique)* | toute erreur de syntaxe HTML ou CSS est signalée **avec son numéro de ligne** ; `tolererErreurs: true` la désactive |
| `contient` / `absent` | `{ fichier, motif, message, options }` — `fichier: "*"` vise tous les fichiers |
| `elements` | `{ fichier, selecteur, min, max, texteNonVide, texteContient, texteMotif, motsMin, attributs:[{nom, motif}], contient:[{selecteur,min}], tous }` |
| `styles` | `{ css, page, selecteur, propriete, valeur \| motif, message, tous }` — sur le style **effectif** |

- `min` vaut 1 par défaut ; `min: 0` avec `max: 0` exige une **absence**.
- sans `tous: true`, un contrôle est satisfait dès qu'**un** élément le remplit : l'élève
  choisit son contenu, on n'impose que la structure ;
- `styles` lit la **cascade et l'héritage** : centrer via `body` ou via `h1` passe aussi
  bien. C'est ce qui permet de valider une intention plutôt qu'une écriture.
- les sélecteurs acceptent `balise`, `.classe`, `#id`, `[attribut]`, `[attribut="valeur"]`,
  la descendance, `>` et les listes séparées par des virgules.

!!! danger "Le piège qui a coûté une relecture"
    `contenu`, `apres`, `question`, `option.texte`, `option.explication` et les `indices`
    sont injectés en **innerHTML**. Écrire `<h1>` dans une explication y crée donc un
    **vrai titre**, avec sa taille géante, au milieu du bouton du QCM. Une balise citée
    s'écrit toujours échappée : `<code>&lt;h1&gt;</code>`.

    Le banc refuse désormais ces étapes — il contrôle la prose de **chaque niveau
    d'accompagnement**, pas seulement celle de l'étape de base.

!!! warning "Pas de vrai `<a href>` dans un `contenu`"
    Un clic changerait le `hash` de la page et renverrait l'élève à l'accueil du parcours.
    Pour montrer l'allure d'un lien, un `<span>` souligné suffit.

### L'accompagnement adaptatif

Une étape peut décliner son énoncé selon trois niveaux :

```js
variantes: {
  autonome:    { contenu: `…`, indices: [ … ] },
  reperes:     { contenu: `…`, indices: [ … ] },
  "pas-a-pas": { contenu: `…`, indices: [ … ], fichiers: [ … ] },
}
```

`niveauAide()` lit la progression enregistrée **des autres séances** — réussites du
premier coup, coups de pouce ouverts, corrections demandées — et choisit :

| Niveau | Déclenché par | Ce que l'élève reçoit |
|:--|:--|:--|
| `autonome` | ≥ 80 % du 1ᵉʳ coup et peu d'aide | le cahier des charges seul |
| `reperes` | entre les deux, ou moins de 5 étapes tentées | + la liste des balises attendues |
| `pas-a-pas` | < 50 % du 1ᵉʳ coup, ou beaucoup d'aide | + la marche à suivre numérotée et un squelette commenté |

L'enseignant force le niveau par `?aide=pas-a-pas` dans l'adresse du parcours. La séance
qui porte `adaptatif: true` affiche un bandeau annonçant le niveau retenu.

!!! danger "La validation ne varie jamais"
    `appliquerNiveau()` réinjecte toujours la `validation` de l'étape de base. Seul
    l'échafaudage change ; l'exigence est la même pour tous. Le banc vérifie que les
    **trois** niveaux sont déclarés, que chacun a des coups de pouce, et que le code de
    départ de chacun ne passe pas déjà.

### Rendre son site : l'archive ZIP

`telechargeable: true` sur une étape de code ajoute un bouton **⬇ Télécharger mon site**,
qui enregistre tous les fichiers de l'atelier dans une archive **`NOM_Prenom.zip`**.

`docs/parcours/archive.js` écrit le ZIP octet par octet — en-têtes locaux, catalogue
central, CRC-32, méthode « stored » sans compression. Aucune dépendance, et l'archive
passe `unzip -t`. Le nom vient des champs *Mon nom* et *Mon prénom* du panneau
**☰** (`etat.eleve.nom` / `.prenom`) ; s'ils manquent, le bouton ouvre le panneau au lieu
de télécharger. Ces deux champs nomment aussi le fichier `.json` de progression.

!!! warning "L'archive ne contient que les fichiers de l'atelier"
    Aucune image n'y est rangée. C'est pourquoi la validation du projet exige que les
    `src` d'images soient des **adresses complètes** en `https://` : un site dont les
    images pointent vers `../files/…` s'ouvrirait sans elles une fois décompressé.

### Un projet en plusieurs temps

`reprend: "<id de l'étape précédente>"` recopie le travail de l'élève dans l'étape
suivante, tant qu'il n'a rien tapé dans celle-ci. Le `depart` déclaré ne sert alors que de
filet : il décrit l'état attendu à ce moment du projet. Un bouton **↩ Reprendre mon site**
permet de forcer la reprise.

!!! warning "Le `depart` d'une étape est la solution de la précédente"
    C'est le prix du filet de secours : dans `s04.js`, les constantes du site témoin
    servent à la fois de code de départ et de correction. Le hook retire les champs
    `solution`, pas ces constantes. Le risque reste théorique — le site témoin parle d'un
    autre métier que celui de l'élève, et cela se verrait immédiatement.

### Vérifier

```bash
node tools/parcours/verifier_web.mjs parcours-web        # tout le parcours
node tools/parcours/verifier_web.mjs parcours-web s03    # une séance
```

`verifier_seance.py` détecte `langage: "web"` dans le manifeste et délègue tout seul :
la commande habituelle sans argument couvre les trois parcours.

---

## 10 · Vérifier : le banc de test

```bash
python3 tools/parcours/verifier_seance.py                    # tous les parcours
python3 tools/parcours/verifier_seance.py parcours-nsi       # un parcours
python3 tools/parcours/verifier_seance.py parcours-nsi s03   # une séance
```

Pour chaque étape, il vérifie que :

1. la **solution de référence s'exécute** sans erreur ;
2. sa **sortie est exactement** celle annoncée ;
3. les contrôles `codeContient` / `codeAbsent` **l'acceptent** ;
4. les **assertions passent** ;
5. le **code de départ ne passe pas déjà** la validation ;
6. un QCM a **une bonne réponse et une seule**.

Un garde-fou de dix secondes interrompt les boucles infinies, à l'exécution comme dans les
assertions. Les étapes qui utilisent `input()` sont alimentées par `saisiesTest`.

!!! example "Il attrape de vraies fautes"
    Sur les 24 séances : deux bugs qui se compensaient, `print` glissant une espace avant
    la ponctuation, deux assertions inversées, un flottant mal anticipé, une solution sans
    la boucle que sa consigne exigeait, un `codeAbsent` rejetant sa propre solution.

!!! example "L'audit des coups de pouce"
    ```bash
    python3 tools/parcours/auditer_indices.py parcours-nsi 13
    ```

    Il mesure, pour chaque étape, quelle part du **travail restant** — la solution moins
    ce que le code de départ fournit — les indices livrent mot pour mot. Le seuil d'alerte
    est à 55 %. Il a servi à reprendre 49 étapes du parcours SNT, dont 32 donnaient la
    réponse complète.

Finir par les deux constructions :

```bash
mkdocs build                      # version élève : zéro correction dans les fichiers
mkdocs build -f mkdocs-prof.yml   # version prof : corrections conservées
```

---

## 11 · État des lieux

| Parcours | Séances | Étapes | État |
|:--|:--:|:--:|:--|
| SNT — Python | 11 | 266 | ✅ complet, vérifié |
| NSI — chapitre 1 | 13 | 225 | ✅ complet, vérifié |
| SNT — Le Web | 4 | 84 | ✅ complet, vérifié |

### Décisions arrêtées, à ne pas re-proposer

- **SNT : 10 séances + 1 bonus**, pas plus. Une trentaine de séances par an pour Python
  *et* Internet *et* réseaux sociaux *et* le Web.
- **Listes, f-strings et séance dédiée au seuil : écartées** du parcours SNT — niveau
  Première. L'allègement 2026 du programme couvre le cas des listes.
- Les **algorithmes exigibles par chapitre de maths** sont regroupés dans la séance 11
  bonus, pour la fin d'année.
- **Pas de backend.** Progression en `localStorage`, échangée par fichier `.json`.
- Boutons du site vers un parcours : `{ .md-button }`, sans fond.

### Pistes non tranchées

- **Les autres chapitres de NSI** pourraient recevoir le même traitement. Le chapitre 4
  (listes et chaînes) et le chapitre 5 (spécifier et tester) s'y prêtent bien : beaucoup
  d'exercices déjà auto-corrigés à convertir.
- **Une séance 12 pour SNT** rassemblant les projets, si l'année le permet.
- **Un tableau de bord enseignant** supposerait un backend : écarté pour l'instant, mais
  la question se reposera si les élèves perdent leur progression en changeant de poste.
- Le **cours d'origine de NSI contient une inexactitude** repérée en écrivant la séance 3 :
  `print("Tu as ", age, " ans.")` affiche `Tu as  16  ans.`, avec des doubles espaces.
  Traitée dans le parcours comme une étape de prédiction ; à corriger dans le cours.

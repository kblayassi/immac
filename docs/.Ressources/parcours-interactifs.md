---
title: Les parcours interactifs
---

# Les parcours interactifs

Deux parcours partagent le **même moteur** : cours interactif où chaque étape se
valide avant d'ouvrir la suivante.

| Parcours | Dossier | Adresse | Contenu |
|---|---|---|---|
| SNT — Seconde | `docs/parcours-python/` | `…/parcours-python/` | 11 séances, 266 étapes |
| NSI — chapitre 1 | `docs/parcours-nsi/` | `…/parcours-nsi/` | 13 séances, 225 étapes |

!!! danger "Ce dossier n'est pas publié"
    `.Ressources` commence par un point : MkDocs ne le copie pas dans le site.
    Cette page est une note interne.

## Où ça vit

```
docs/parcours/                  LE MOTEUR, partagé
├── app.js                      étapes, verrous, validation, sauvegarde
└── app.css

docs/parcours-python/           un parcours
├── index.html                  coquille (page statique, hors gabarit MkDocs)
└── seances/
    ├── manifeste.js            PARCOURS (identité) · PALIERS · CATALOGUE
    └── sNN.js                  tout le contenu pédagogique

docs/parcours-nsi/              l'autre, même structure
```

MkDocs copie ces dossiers **tels quels** : ils sont servis sans nav ni thème Material.
Le moteur ne se repère pas à sa propre adresse mais à celle de la **page** qui le
charge : il trouve donc toujours les séances à côté de l'`index.html`.

Pour **ajouter un parcours** : dupliquer un `index.html`, créer `seances/manifeste.js`
avec son bloc `PARCOURS`, et écrire les séances. Rien à modifier dans le moteur.

Les liens depuis le site sont dans `docs/SNT/1_Python/index.md` et
`docs/NSI/1bis_Parcours_interactif/index.md`.

L'exécution Python et l'éditeur viennent de l'existant : `docs/javascripts/pyodide-worker.js`
et `docs/javascripts/codemirror-bundle.js`.

## Version élève et version prof

Le hook `plugins/version_eleve.py` retire, **dans la version élève uniquement**, le
champ `solution` de chaque étape (`on_post_build`, sur le dossier de sortie). Sans
ce champ, l'application n'affiche pas le bouton « Correction » : il n'y a rien à
révéler dans le fichier publié.

| Version | Adresse | Corrections |
|---|---|---|
| élève | `…/immac/parcours-*/` | absentes du fichier |
| prof | `…/immac/prof/parcours-*/` | présentes |

L'adresse `prof/` n'est pas listée, mais **elle n'est pas protégée** : qui la connaît
y accède.

## Écrire ou modifier une séance

Tout le contenu est dans `seances/sNN.js`. Une séance = trois parties
(`decouverte`, `application`, `defis`), chacune une liste d'étapes.

**Types d'étape** — `cours` (lecture validée d'un clic), `qcm`, `prediction`
(un QCM précédé d'un code à lire), `code` (éditeur auto-corrigé).

**Champs d'une étape `code`**

| Champ | Rôle |
|---|---|
| `depart` | code initial dans l'éditeur |
| `solution` | correction (retirée en version élève) |
| `indices` | coups de pouce, révélés un par un |
| `felicitation` | message de réussite |
| `apres` | complément affiché après la réussite |
| `saisiesTest` | réponses à `input()` pour le banc de test |

**Validation** — objet `validation`, contrôles joués dans cet ordre :

| Clé | Effet |
|---|---|
| `codeContient` | liste de `{motif, message}` : le motif doit être présent |
| `codeAbsent` | idem, mais le motif est interdit |
| `sortie` | sortie attendue, comparée après normalisation |
| `sortieContient` | fragments obligatoires |
| `sortieRegex` (+ `sortieRegexMessage`) | motif sur la sortie |
| `sortieNonVide` | le programme doit afficher quelque chose |
| `tests` | assertions Python jouées dans l'espace de noms de l'élève |

**Figures à reproduire** — ajouter `sans-copie` à la classe du bloc :
`<pre class="bloc-code sans-copie">`. La sélection, la copie et le glisser-déposer
sont bloqués, et le bloc porte le repère « à recopier ».

!!! warning "Deux pièges à connaître"
    `input()` et `random` **ne se mélangent jamais** dans une même étape : le worker
    rejoue le programme depuis le début à chaque saisie, donc les tirages changeraient.

    `print` insère une espace avant chaque valeur : `print("Total", 12, ".")` donne
    `Total 12 .`. Sans f-strings, aucune sortie attendue ne peut coller de ponctuation
    à un nombre.

## Vérifier après modification

```bash
python3 tools/parcours/verifier_seance.py                    # tout
python3 tools/parcours/verifier_seance.py parcours-nsi       # un parcours
python3 tools/parcours/verifier_seance.py parcours-nsi s03   # une séance
```

Pour chaque étape, le banc exécute la solution de référence, compare sa sortie à
celle annoncée, rejoue les assertions, et vérifie que le **code de départ ne passe
pas déjà** la validation. Il contrôle aussi qu'un QCM a une bonne réponse et une seule.

!!! warning "Penser au manifeste"
    `nbEtapes` dans `seances/manifeste.js` sert à calculer l'avancement sans charger
    les séances. Le mettre à jour en même temps que le contenu — l'application
    signale l'écart dans la console du navigateur.

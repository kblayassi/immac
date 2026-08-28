---
title: Prompt de relance
---

# Prompt de relance

Ce document sert à **reprendre le travail sur le site** après une interruption, sans avoir à tout réexpliquer. La première partie se colle telle quelle au début d'une session ; le reste est la fiche de référence à consulter en cours de route.

---

## 1 · À coller au début d'une session

> Je travaille sur mon site de cours (MkDocs Material) : maths, SNT et NSI, pour le lycée.
> Le dépôt est `kblayassi/immac`, publié par CI sur GitHub Pages à chaque push sur `main`.
>
> Avant de proposer quoi que ce soit, lis `docs/.Ressources/prompt-de-relance.md` : il contient
> l'état des chapitres, les conventions de rédaction et les pièges déjà rencontrés.
>
> Aujourd'hui, je voudrais : **……**
>
> Points de méthode :
>
> - vérifie le programme officiel à la source avant d'affirmer qu'un contenu est exigible ;
> - respecte les conventions du document (admonitions, exercices, playgrounds) ;
> - après toute modification d'un exercice auto-corrigé, lance `python3 tools/verifier_corrections.py` ;
> - termine par un `mkdocs build` : zéro erreur, zéro avertissement ;
> - ne commite et ne pousse que si je te le demande.

!!! tip "Deux façons de démarrer"
    - **Un chantier précis** — « ajoute les TP du chapitre X », « équipe les exercices de Y ».
    - **Un audit d'abord** — « fais-moi un audit complet du chapitre X : programme officiel, ce qui est fait, ce qui manque, ce qu'on peut améliorer ». C'est la méthode qui a le mieux marché : trois chapitres ont été repris ainsi, et l'audit sert ensuite de plan de travail.

---

## 2 · Le site en deux minutes

| | |
|:--|:--|
| **Générateur** | MkDocs + thème Material, plugin `macros`, `mkdocs-nav-weight`, `glightbox` |
| **Build local** | `source venv/bin/activate && mkdocs serve` (port 8000) ou `mkdocs build` |
| **Publication** | push sur `main` → `.github/workflows/ci.yml` → GitHub Pages, environ 2 minutes |
| **Macros** | définies dans `main.py` : `python_playground`, `html_playground`, `html_css_playground` |
| **Éditeur Python** | Pyodide dans un *web worker* — `docs/javascripts/pyodide-worker.js` et `python-playground.js` |
| **Numérotation des exercices** | automatique, hook `plugins/exo_numbering.py` : il réécrit les titres `!!! exoordi "Exercice N - …"` |
| **Ordre des pages** | champ `weight` du front matter ; celui de `index.md` positionne le **chapitre** dans la navigation |

!!! warning "Les dossiers commençant par un point ne sont pas publiés"
    C'est ce qui permet de cacher des fichiers tout en les utilisant au build :

    - `docs/files/NSI/Python/.corrections/` — solutions et jeux de tests des exercices ;
    - `docs/files/NSI/.modules/` — modules fournis masqués (`marvel.py`) ;
    - `docs/.Ressources/` — les fiches internes, dont ce document.

---

## 3 · Où en est chaque chapitre de NSI

| Chapitre | Cours | TP | Exercices | Éditeurs | Auto-corrigés | État |
|:--|:--:|:--:|:--:|:--:|:--:|:--|
| 1 · Premiers pas en Python | 7 | — | 40 | 36 | 22 | ✅ complet |
| 2 · Système d'exploitation | 5 | 2 | 18 | — | — | ✅ (exercices Linux, pas de Python) |
| 3 · Représentation des nombres | 5 | 2 | 63 | 1 | 1 | ✅ complet |
| 4 · Listes et chaînes | 6 | 3 | 26 | 13 | 13 | ✅ complet |
| 5 · Spécifier et tester | 8 | — | 23 | 15 | 13 | ✅ complet |
| 6 · Types construits | 5 | 3 | 30 | 16 | 16 | ✅ complet |
| 7 · Programmation web | 9 | — | 41 | 39 | — | ✅ (éditeurs HTML/CSS) |
| 8 · Booléens et encodage | 6 | — | 21 | 3 | 2 | ✅ complet |
| 9 · Algorithmique | 4 | 3 | 18 | 8 | 8 | ✅ complet |
| 10 · Données en tables | 5 | — | 18 | — | — | ⚠️ voir plus bas |
| 11 · Réseaux et protocoles | 4 | — | 16 | — | — | 🚧 non fini |
| 12 · Algorithmes « méthodes » | — | — | — | — | — | 🚧 à rédiger |
| 13 · Interactions sur le Web | — | — | — | — | — | 🚧 à rédiger |
| 14 · Von Neumann et IHM | — | — | — | — | — | 🚧 à rédiger |

!!! info "Trois audits déjà réalisés"
    Chacun cite le programme officiel, relève ce qui manque et sert de relevé de ce qui a été corrigé :

    - [Audit du chapitre 6 — Types construits](https://claude.ai/code/artifact/ef06d025-5b88-4414-809c-f0dd16ddd24b)
    - [Audit du chapitre 9 — Algorithmique](https://claude.ai/code/artifact/e4debe58-c2d2-4680-8b98-b6a77f66b9b0)
    - [Revue des éditeurs, chapitres 1 à 11](https://claude.ai/code/artifact/50874ab3-d275-495f-bd8f-8f5647eae27d)

---

## 4 · Conventions de rédaction

### Les admonitions

| Type | Usage |
|:--|:--|
| `definition` | une définition encadrée |
| `python` | une syntaxe ou un outil du langage |
| `propriete` | un résultat à retenir |
| `methode` | un schéma de travail réutilisable |
| `example` | un cas traité |
| `expert` | **toujours** intitulé « Pour aller plus loin : … » |
| `histoire` | un repère historique |
| `exopapier` / `exoordi` | un exercice, sans / avec ordinateur |

!!! danger "Deux règles absolues"
    1. **Ne jamais ouvrir une admonition sur un bloc de code.** Une phrase d'introduction d'abord, toujours.
    2. **Un bloc `expert` sert à aller plus loin**, jamais à cacher un contenu exigible.

### Les pages de cours

- Un titre `#` avec un emoji, des sections `##` séparées par `---`, et une section finale **« À retenir 📌 »** contenant un `!!! info "Résumé"`.
- Les algorithmes se présentent en **pseudo-code et Python côte à côte**, dans une grille CSS (voir n'importe quelle page du chapitre 9).
- Les renvois entre chapitres se font par leur **nom**, jamais par leur numéro : les numéros changent.

### Les exercices

- Titre : `!!! exoordi "Exercice N - Intitulé - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"`. **Un intitulé, toujours** : il aide à retrouver un exercice.
- Numérotation continue dans la page ; le hook la recalcule de toute façon.
- Viser **moitié papier / moitié machine**, et une vingtaine à une trentaine d'exercices par chapitre.
- **Chaque exercice a une correction**, en `??? success`.
- Les coups de pouce vont dans un `??? tip "Coup de pouce"`.

### Les playgrounds

```jinja
{% raw %}{{ python_playground(
  key="ch4-l1-somme",                                              # unique sur tout le site
  hauteur="280px",
  example_file="files/NSI/Python/exemples/ch4/l1_somme.py",
  solution_file="files/NSI/Python/.corrections/ch4/l1_somme_solution.py",
  tests_file="files/NSI/Python/.corrections/ch4/l1_somme_tests.py",
  module_files="files/NSI/.modules/marvel.py"                      # facultatif : module masqué
) }}{% endraw %}
```

- `key` sert au stockage local : elle doit être **unique**, sans quoi deux exercices se partagent le même code.
- Sans `tests_file`, pas de bouton **Valider** — c'est le bon choix quand l'exécution est elle-même la réponse.
- Le message de chaque `assert` s'affiche à l'élève : **le rédiger comme une explication**, pas comme un code d'erreur.
- Les fichiers vivent dans `docs/files/NSI/Python/exemples/chN/` et `.corrections/chN/`.

---

## 5 · Pièges déjà rencontrés

!!! danger "Le `:` dans un titre de front matter"
    `title: Les listes : principes de base` **casse tout le front matter YAML** : la page perd son titre *et* son `weight`, donc sa place dans la navigation. Le symptôme est discret — le titre affiché devient le nom du fichier.

    Garder un `title:` sans `:` ; le titre `#` de la page, lui, en accepte.

!!! danger "Un playground au milieu d'une liste numérotée"
    Insérer un éditeur entre deux éléments d'une liste **coupe la liste** : la question suivante sort en texte brut et son tableau est rendu comme un bloc de code.

    Deux solutions : indenter l'éditeur **à l'intérieur** de l'élément de liste, ou passer les questions en paragraphes libellés (`**1.**`, `**2.**`). La seconde est plus robuste.

!!! warning "Une mutation doit être détectable"
    Pour les exercices où la validation vérifie qu'un jeu de tests démasque un bug, s'assurer que le bug est **observable**. Exemple vécu : remplacer `x >= 0` par `x > 0` dans une valeur absolue ne change rien, car `-0 == 0` en Python.

!!! warning "Les images SVG et le thème sombre"
    `currentColor` ne fonctionne pas dans une image chargée via `<img>` : elle n'hérite pas de la couleur de la page. Utiliser un gris neutre lisible sur les deux thèmes.

!!! tip "Vérifier les valeurs numériques d'un énoncé"
    Deux erreurs de calcul dormaient dans des corrections existantes, découvertes en écrivant les tests automatiques. Écrire les tests **avant** de faire confiance à un corrigé.

---

## 6 · Méthode de travail

1. **Lire le programme officiel à la source.** Le PDF de première est [ici](https://eduscol.education.gouv.fr/sites/default/files/document/spe633annexe1063268pdf-89499.pdf) — attention, un document voisin est celui de terminale. Extraction : `pypdf`.
2. **Auditer avant de rédiger** : ce qui est traité, ce qui manque, ce qui se recoupe avec un autre chapitre.
3. **Arbitrer avec moi** ce qui relève d'un choix pédagogique — placement d'une notion, dosage du hors-programme.
4. **Rédiger**, en respectant les conventions ci-dessus.
5. **Valider** : `python3 tools/verifier_corrections.py` puis `mkdocs build` (zéro avertissement).
6. **Commiter par chantier**, en français, à l'impératif, avec un corps qui explique *pourquoi*. Ne pousser que sur demande.

!!! example "L'outil de vérification"
    ```bash
    python3 tools/verifier_corrections.py          # tous les chapitres
    python3 tools/verifier_corrections.py ch5 ch9  # seulement ceux-là
    ```

    Il rejoue chaque correction contre son jeu de tests avec le harnais du playground, gère les tests partagés par plusieurs corrections, et répète cent fois les exercices aléatoires.

---

## 7 · Ce qui reste à faire

### En priorité

- **Chapitre 12 — Algorithmes « méthodes »** : entièrement à rédiger. Il doit reprendre la **recherche dichotomique** (contenu du programme de première, annoncé deux fois au chapitre 9 et nulle part traité), puis les **algorithmes gloutons** et les **k plus proches voisins**.
- **Chapitres 11, 13, 14** : à rédiger.

### Décisions en attente

- **Chapitre 10, données en tables.** Ses exercices lisent de vrais fichiers CSV ; l'éditeur du site n'a pas d'accès disque. Décision prise : **on le laisse tel quel**, il fait la transition entre le playground et VS Code. À rouvrir seulement si l'on change d'avis — la piste serait un paramètre `data_file` déposant le fichier dans le système de fichiers de Pyodide, sur le modèle de `module_files`.
- **Chapitre 7, programmation web.** Cinq exercices du fil rouge `favoris.html` se font dans un éditeur de texte, volontairement : créer un vrai fichier s'apprend. Un éditeur de vérification en fin d'exercice reste envisageable.
- **Chapitre 5, exercice 17.** Seul exercice à dépendre encore de Basthon : l'éditeur du site n'affiche pas de graphiques matplotlib.

### Idées non tranchées

- Un **terminal Linux** dans la page ferait pour le chapitre 2 ce que le playground a fait pour les autres.
- Les **TP et le projet du chapitre 6** n'ont pas été audités en profondeur, seulement renumérotés.
- Le chapitre 3 compte **63 exercices**, presque tous sur papier : un rééquilibrage serait possible.

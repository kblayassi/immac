---
title: Parcours interactif
weight: 2
hide:
    - toc
---

# 🥞 Le parcours interactif

Tout le chapitre se travaille ici : le cours, les exercices et les défis sont découpés en
petites étapes qui se valident **une par une**, avec correction automatique et coups de pouce
à la demande.

[Ouvrir le parcours :material-arrow-right:](../../../parcours-nsi-term/){ .md-button }

!!! tip "C'est le cours, pas un supplément"
    Contrairement au chapitre 1 de Première, il n'y a pas ici de pages de cours en double :
    le parcours **est** le chapitre. L'[introduction](index.md) le situe, la
    [conclusion](Conclusion.md) le récapitule, et tout ce qu'il y a à apprendre se trouve
    entre les deux.

## Comment ça marche

- Le chapitre est découpé en **8 séances** d'environ 1 h 30, chacune avec sa **découverte**
  pas à pas, ses **exercices** et ses **défis** — soit à peu près **12 heures** de travail.
- Les étapes s'ouvrent **les unes après les autres** : chaque réussite débloque la suivante,
  aucune notion n'arrive avant d'avoir été vue.
- Tu écris ton code **dans la page** : rien à installer, correction automatique.
- Ta progression est **enregistrée toute seule** dans ce navigateur.

!!! warning "Si tu changes d'ordinateur"
    Ouvre le menu **☰** en haut à droite du parcours et clique sur **Télécharger ma
    progression**. Sur le nouveau poste, ouvre le même menu et dépose le fichier obtenu.

## Les huit séances

| # | Séance | Ce que tu travailles |
|---|--------|----------------------|
| | **Partie 1 — Spécifier avant de programmer** | |
| 1 | Interface et implémentation | type abstrait, spécification, préconditions, programme client |
| 2 | Les listes, un type abstrait | `vide`, `est_vide`, `cons`, `car`, `cdr`, parcours et construction |
| | **Partie 2 — Les deux structures linéaires** | |
| 3 | Les piles : dernier arrivé, premier servi | LIFO, `empiler`, `depiler`, parenthésage, Ctrl+Z, trois implémentations |
| 4 | Les files : premier arrivé, premier servi | FIFO, `enfiler`, `defiler`, files de priorité, et le coût du défilement |
| | **Partie 3 — Plusieurs implémentations** | |
| 5 | La même file, trois fois | mesurer un coût, tableau circulaire, file par deux piles |
| 6 | Les listes chaînées | maillons, mutabilité, pile et file chaînées, insertion en temps constant |
| | **Partie 4 — Choisir et appliquer** | |
| 7 | Choisir la bonne structure | recherche séquentielle, table de hachage, index, coût des opérations |
| 8 | Piles et files au travail | notation polonaise inverse, tri crêpes, labyrinthe en profondeur et en largeur |

!!! info "Ce que le parcours couvre du programme officiel"
    La rubrique **Structures de données** du programme de terminale, à l'exception du
    vocabulaire de la programmation objet — classes, attributs, méthodes — traité au chapitre
    suivant, et des arbres et graphes, qui ont leurs propres chapitres.

    Y figurent en particulier les quatre capacités attendues : *spécifier une structure par
    son interface*, *distinguer interface et implémentation*, *écrire plusieurs
    implémentations d'une même structure*, et *choisir une structure adaptée à la situation
    à modéliser*.

!!! note "Les exercices de type bac"
    La séance 8 reprend le sujet zéro de l'épreuve écrite — `hauteur_pile`, `max_pile`,
    `retourner` et le **tri crêpes** — en autant d'étapes guidées. Ses défis écrivent les
    parcours **en profondeur** et **en largeur** d'un labyrinthe : ce sont, mot pour mot,
    les deux algorithmes de parcours de graphe exigés par le programme.

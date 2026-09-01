---
title: Parcours Python
weight: 1
hide:
    - toc
---

# 🐍 Parcours Python

La partie **algorithmique et programmation** du programme de Seconde se travaille
ici, dans une application à part : un cours interactif où **chaque étape se valide
avant d'ouvrir la suivante**.

[Ouvrir le parcours Python :material-arrow-right:](../../parcours-python/){ .md-button .md-button--primary }

## Comment ça marche

- Chaque séance se déroule en trois temps : une **découverte** pas à pas, des
  **exercices** d'application, puis des **défis** pour ceux qui ont terminé.
- Les étapes s'ouvrent **les unes après les autres** : chaque réussite débloque la suivante.
- Tu écris ton code **dans le navigateur** : rien à installer, rien à rendre.
- Chaque exercice est **corrigé automatiquement**, avec des coups de pouce à la demande.
- Ta progression est **enregistrée toute seule** dans ce navigateur.

!!! warning "Si tu changes d'ordinateur"
    La progression est enregistrée **sur le poste que tu utilises**. Pour la retrouver
    ailleurs, ouvre le menu **☰** en haut à droite du parcours et récupère ton
    **code de reprise** (ou télécharge le fichier). Sur le nouveau poste, colle-le
    au même endroit puis clique sur *Restaurer*.

## Les séances

| # | Séance | Ce que tu apprends |
|---|--------|--------------------|
| 1 | De Scratch à Python | premier programme, `print()`, séquence, lire une erreur |
| 2 | Variables, types et calculs | affectation, entiers, flottants, chaînes, `//` et `%` |
| 3 | Dialoguer et comparer | `input()`, conversions, booléens, `and` / `or` / `not` |
| 4 | L'instruction conditionnelle | `if`, `elif`, `else`, indentation |
| 5 | La boucle bornée `for` | `range`, répéter, accumuler |
| 6 | La boucle non bornée `while` | condition d'arrêt, seuil, balayage |
| 7 | Écrire une fonction | `def`, paramètre, `return` |
| 8 | Fonctions à plusieurs arguments | lire, modifier et compléter une fonction |
| 9 | Hasard et simulation | `random`, expérience aléatoire, loi des grands nombres |
| 10 | Projet & bilan | trois sujets au choix, trois niveaux |
| 11 | Bonus | les algorithmes du programme de maths, rassemblés |

---

!!! note "Pour l'enseignant"
    Le contenu de chaque séance vit dans `docs/parcours-python/seances/sNN.js` ;
    le moteur (étapes, verrous, validation, sauvegarde) est dans `app.js` et ne
    contient aucune notion de cours. Après toute modification d'une séance :

    ```bash
    python3 tools/parcours/verifier_seance.py        # les onze séances
    python3 tools/parcours/verifier_seance.py s03    # une seule
    ```

    Le banc exécute chaque solution de référence, compare sa sortie à celle annoncée,
    rejoue les assertions, et vérifie que le code de départ ne passe pas déjà la
    validation. Penser à mettre `nbEtapes` à jour dans `seances/manifeste.js`.

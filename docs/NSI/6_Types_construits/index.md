---
title: Introduction
weight: 6
---

# Types construits 🧩

En Python, on manipule très souvent des **types élémentaires** :  
- `int` pour les entiers  
- `float` pour les nombres à virgule  
- `bool` pour le vrai/faux  
- `str` pour les textes  

Mais dès qu’on souhaite organiser plusieurs données ensemble, on a besoin de **types construits**.

!!! definition "Types construits"
    Un **type construit** est une structure qui permet de rassembler plusieurs valeurs pour former un tout cohérent.

Au chapitre 4, nous avons déjà longuement travaillé le premier d'entre eux : le **tableau**
(la *liste* de Python), avec ses indices, ses parcours, ses compréhensions et ses matrices.
Nous le considérons ici comme **acquis**.

Ce chapitre en présente deux autres :

- **Les p-uplets** (*tuples*) : ils regroupent plusieurs valeurs, mais **ne se modifient pas**.
- **Les dictionnaires** : ils associent des **clés** à des **valeurs**, au lieu de numéroter les cases.

!!! tip "Trois structures, trois usages"
    Retenez dès maintenant la question qui guide le choix :

    - les données doivent-elles **changer** après coup ? → tableau plutôt que p-uplet ;
    - a-t-on besoin d'un **numéro** de case, ou d'un **nom** ? → tableau plutôt que dictionnaire.

    Une page de ce chapitre est entièrement consacrée à ce comparatif.

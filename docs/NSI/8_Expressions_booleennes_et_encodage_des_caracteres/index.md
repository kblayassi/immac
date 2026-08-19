---
title: Introduction
weight: 8
---

# Expression booléenne et encodage des caractères ✅❌

Chaque jour, nos ordinateurs, téléphones et objets connectés manipulent des milliards de données : textes, images, sons, vidéos...  
Mais derrière toutes ces informations se cachent **de simples 0 et 1** 💡.

Ces deux symboles — les **bits** — permettent de tout représenter et en particulier : 

- des **valeurs logiques** comme *vrai* ou *faux* ;  
- des **caractères** comme les lettres, chiffres et symboles.  

L’objectif de ce chapitre est de comprendre **comment la machine représente la logique et le texte**.

!!! histoire "Repères historiques"
    En 1847, le britannique [George BOOLE](https://fr.wikipedia.org/wiki/George_Boole) inventa un formalisme permettant d'écrire des raisonnements logiques : l'**algèbre de Boole**. La notion même d'informatique n'existait pas à l'époque, même si les calculs étaient déjà automatisés (penser à la Pascaline de 1642).

    Bien plus tard, en 1938, les travaux de l'américain [Claude SHANNON](https://fr.wikipedia.org/wiki/Claude_Shannon) prouva que des circuits électriques peuvent résoudre tous les problèmes que l'algèbre de Boole peut elle-même résoudre. Pendant la deuxième guerre mondiale, les travaux d'[Alan TURING](https://fr.wikipedia.org/wiki/Alan_Turing) puis de [John VON NEUMANN](https://fr.wikipedia.org/wiki/John_von_Neumann) poseront définitivement les bases de l'informatique moderne.

!!! info "Compétences visées"
    - Dresser la table d’une **expression booléenne** avec `and`, `or`, `not`, `xor`
    - Comprendre le **caractère séquentiel** des opérateurs `and` et `or`
    - Identifier l’intérêt des **systèmes d’encodage** ASCII, ISO 8859-1 et Unicode
    - **Convertir un fichier texte** dans différents formats d’encodage

!!! question "À ton avis..."
    - Pourquoi dit-on qu’un ordinateur ne “comprend” que le binaire ?  
    - Comment une machine peut-elle faire la différence entre la lettre `A`, le chiffre `3` et le symbole `@` ?  
    - Est-ce que toutes les lettres du monde (chinois, arabe, emoji, etc.) peuvent être représentées de la même façon ?

---

Dans les prochaines sections, nous verrons d’abord **comment l’ordinateur raisonne avec la logique booléenne**, puis **comment il encode les caractères pour stocker et échanger des textes**. ✨
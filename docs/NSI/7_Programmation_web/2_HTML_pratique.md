---
title: HTML – Titres, listes et balises génériques
weight: 3
---

# HTML : titres, listes et balises génériques 🧱📝

Après avoir vu la structure générale d’une page HTML, nous allons maintenant découvrir comment **organiser le contenu visible** : titres, listes et zones de texte.

Ces balises permettent de rendre une page claire, lisible et bien structurée, aussi bien pour l’utilisateur que pour le navigateur.

---

## Les titres HTML 🏷️

!!! html "Balises de titres `<h..>`"
    Les balises de titres permettent de **structurer le contenu** d’une page en différentes parties.

    Il existe 6 niveaux de titres :

    ```html linenums="1"
    <h1>Titre principal</h1>
    <h2>Titre de section</h2>
    <h3>Sous-section</h3>
    <h4>Titre de niveau 4</h4>
    <h5>Titre de niveau 5</h5>
    <h6>Titre de niveau 6</h6>
    ```

⚠️ Les balises de titres servent à structurer le contenu, pas à modifier la taille du texte.

---

## Les listes 📋

Les listes permettent de présenter des informations de manière **structurée et lisible**.

!!! html "Liste non ordonnée `<ul>`"
    Une **liste non ordonnée** est une liste sans ordre particulier.

    On utilisera la balise `<ul>` pour la déclarer et la balise `<li>` pour ajouter un élément à la liste : 

    ```html linenums="1"
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
    ```

!!! html "Liste ordonnée `<ol>`"
    Une liste ordonnée est une liste numérotée.

    On utilisera la balise `<ol>` pour la déclarer et la balise `<li>` pour ajouter un élément à la liste : 

    ```html linenums="1"
    <ol>
        <li>Écrire le code HTML</li>
        <li>Enregistrer le fichier</li>
        <li>Ouvrir la page dans le navigateur</li>
    </ol>
    ```

!!! tip "Type de liste numérotée"
    Il est aussi possible de changer la numérotation grâce à l'attribut type :

    - `type="1"` pour un compteur 1, 2, 3...,
    - `type="a"` pour un compteur a, b, c...,
    - `type="A"` pour un compteur A, B, C,...,
    - `type="I"` pour un compteur I, II, III...,

    Cependant, ce sera plutôt au fichier .css de s'occuper de ce type de mise en forme...

---

## Balises génériques 🧱

!!! html "Paragraphe `<p>`"
    La balise `<p>` permet de définir un paragraphe de texte.

    *Exemple :* 
    ```html
    <p>Ceci est un paragraphe.</p>
    ```

!!! html "Division `<div>`"
    La balise `<div>` est une balise de type bloc, utilisée pour regrouper des éléments.

    *Exemple :* 
    ```html
    <div>
        <h2>Un titre</h2>
        <p>Un paragraphe</p>
    </div>
    ```

    👉 Elle est très utilisée avec le CSS pour la mise en page.

!!! html "Span `<span>`"
    La balise `<span>` est une balise en-ligne, utilisée pour cibler une partie précise du texte.

    *Exemple :* 
    ```html
    <p>Un texte avec un <span>mot important</span>.</p>
    ```

!!! html "Identifiant `id`"
    L’attribut `id` permet de donner un identifiant unique à un élément HTML.

    *Exemple :* 
    ```html
    <h2 id="presentation">Présentation</h2>
    ```

    👉 L’`id` sera très utile :
    
    - pour le CSS
    - pour créer des liens intra-page

    ⚠️ Un id ne doit être utilisé qu’une seule fois dans une page.

---

## Structurer une page avec HTML5 🧩

!!! info "Balises de structuration"
    HTML5 propose des balises de type bloc spécifiques pour **structurer une page web**.
    
    Les principales balises sont : 

    - `<header>` : Pour l'en-tête de la page
    - `<nav>` : Pour le menu de navigation
    - `<section>` : Pour une section de contenu
    - `<footer>` : Pour le pied de page

👉 Ces balises permettent :

- une meilleure organisation du code
- une lecture plus claire
- une meilleure compréhension par les moteurs de recherche

---

## À retenir 📌

!!! info "Résumé"
    - Les balises de titres structurent le contenu
    - Les listes permettent d’organiser des informations
    - `<p>`, `<div>` et `<span>` sont des balises génériques très utilisées
    - L’attribut `id` identifie un élément de manière unique
    - HTML5 propose des balises de structuration (header, nav, section, footer)
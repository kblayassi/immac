---
title: Arborescence et liens
weight: 4
---

# Arborescence et liens 🔗📁

Une page web ne fonctionne jamais seule. Elle fait partie d’un ensemble de fichiers organisés, reliés entre eux par des liens.

Comprendre l’arborescence d’un site et le fonctionnement des liens est indispensable pour créer un site web fonctionnel.

---

## Arborescence d’un site web 📂

!!! definition "Arborescence"
    L’**arborescence** d’un site web correspond à l’**organisation des fichiers et dossiers** qui composent le site.

Exemple d’arborescence simple :

```
site_web/
│── index.html
│── contact.html
│── style.css
└── images/
    ├── logo.png
    └── photo.jpg
```

!!! warning "Règles importantes"
    👉 Voici quelques règles/conventions importantes :

    - les fichiers HTML sont généralement placés à la racine du site.
    - les images sont souvent rangées dans un dossier `images`.
    - une bonne organisation facilite la maintenance du site

---

## Les liens hypertextes 🔗

!!! definition "Liens hypertextes"
    Un **lien hypertexte** (ou simplement "lien") est un **élément cliquable** (texte, bouton, image…) qui renvoie vers une autre ressource : une autre page web, un endroit précis de la même page, un fichier (PDF), une adresse e-mail, etc.

!!! html "La balise `<a>`"
    La balise `<a>` permet de créer un lien hypertexte.

    ```html
    <a href="adresse">Texte du lien</a>
    ```
    
    - `href` indique la destination du lien
    - le texte entre les balises est cliquable

!!! info "Deux types de liens"
    Nous manipulerons principalement deux types de liens : 
    
    - **Lien absolu** : Un lien absolu contient l’adresse complète d’une ressource. On l'utilisera pour renvoyer vers des sites externes ou des ressources qui ne font pas partie du site. 
  
        Exemple : 
        ```html 
        <a href="https://www.wikipedia.org">Aller sur Wikipédia</a>
        ```
    - **Lien relatif** : Un lien relatif dépend de la position du fichier courant dans l’arborescence. On les utilisera pour naviguer entre les pages du site ou afficher des images locales. 

        Exemple : 
        ```html 
        <a href="contact.html">Page contact</a>
        <a href="images/photo.jpg">Voir la photo</a>
        ```

--- 

## Applications 

Voici deux applications classiques : 

!!! html "Affiche une image avec `<img>`"
    La balise `<img>` permet d’afficher une image dans une page web.

    ```html
    <img src="images/logo.png" alt="Logo du site">
    ```

    - `src` : chemin vers l’image
    - `alt` : texte alternatif (important pour l’accessibilité)

    ⚠️ La balise <img> n’a pas de balise fermante.


!!! tip "Ancre : des liens intra-page"
    Il est possible de créer des liens à l’intérieur d’une même page. Pour cela, il faut procéder comme suit : 

    1. On place un `id` sur un élément.

        ```html
        <h2 id="presentation">Présentation</h2>
        ```
    2. On crée un lien qui renvoie à cet `id` (avec un `#` devant).

        ```html
        <a href="#presentation">Aller à la présentation</a>
        ```

    👉 Ce système est très utile pour :
    
    - les longues pages
    - les menus de navigation internes

---

## À retenir 📌

!!! info "Résumé"
    - Un site web est composé de **fichiers organisés en arborescence**
    - La balise `<a>` permet de **créer des liens**
    - Les **liens absolus** pointent vers des sites externes
    - Les **liens relatifs** dépendent de l’arborescence du site
    - Les **liens intra-page** utilisent l’attribut `id`
    - Les **images** sont affichées avec la balise `<img>`


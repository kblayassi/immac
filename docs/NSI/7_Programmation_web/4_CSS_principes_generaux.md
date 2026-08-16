---
title: CSS – Principes généraux
weight: 5
---

# CSS : principes généraux 🎨

Après avoir structuré le contenu d’une page web avec le **HTML**, il est temps de s’intéresser à son **apparence**.

Le **CSS** permet de contrôler les couleurs, les tailles, les positions et plus généralement la **mise en forme** d’une page web.

---

## Rôle du CSS 🎯

!!! definition "CSS"
    Le **CSS** (Cascading Style Sheets) est un langage qui permet de **mettre en forme** et de **mettre en page** le contenu HTML.

👉 Le CSS permet par exemple de :

- changer la couleur du texte
- modifier la taille des éléments
- positionner les blocs sur la page
- rendre une page plus agréable à lire

!!! tip "Où écrire le code CSS ?"
    Il existe trois manières d’écrire du CSS.
    
    1. **Feuille de style externe** (méthode recommandée)

        Le code CSS est écrit dans un fichier séparé, par exemple style.css.

        Avantages :

        - séparation claire HTML / CSS
        - réutilisation du même style sur plusieurs pages

    2. **Balise `<style>` dans le HTML**

        Le code CSS est écrit directement dans le fichier HTML.

        ```html linenums="1"
        <style>
            p {
                color: blue;
            }
        </style>
        ```

    3. **Attribut style dans une balise**

        Le style est écrit directement sur un élément HTML.

        ```html linenums="1"
        <p style="color:red;">Texte en rouge</p>
        ```

        ⚠️ Cette méthode est déconseillée car elle mélange contenu et présentation.

!!! html "La balise `<link>`"
    Pour utiliser une feuille de style externe, il faut la lier au fichier HTML.

    ```html linenums="1"
    <link rel="stylesheet" href="style.css">
    ```

    👉 Cette balise doit être placée dans la balise `<head>` du fichier HTML.

---

## Syntaxe générale d’un fichier CSS 🧩

!!! definition "Règle CSS"
    Une **règle CSS** permet d’appliquer un style à un ou plusieurs éléments HTML.

!!! css "Syntaxe générale"
    La syntaxe générale d’une règle CSS est la suivante :

    ```css linenums="1"
    sélecteur {
        propriété: valeur;
    }
    ```

    - le **sélecteur** indique quels éléments HTML sont concernés
    - la **propriété** correspond à ce que l’on souhaite modifier
    - la **valeur** précise comment modifier cette propriété

Par exemple, si l'on souhaite modifier la couleur (*color* en anglais) et la taille (*size* en anglais) d'un paragraphe (*p* en HTML), on pourrait écrire : 

```css linenums="1"
p {
    color: blue;
    font-size: 16px;
}
```


---

## Sélecteurs CSS 🧠

!!! definition "Sélecteur"
    Un **sélecteur CSS** permet de choisir à **quels éléments HTML** s’appliquent les règles de style.

En fonction de rendu souhaitais, il est possible de modifier tous les éléments avec la même balise, uniquement ceux partageant la même "classe" ou un élément unique. 

!!! css "Sélecteur d’élément"
    Il cible toutes les balises d’un même type.

    ```css linenums="1"
    p {
        color: blue;
    }
    ```

!!! css "Sélecteur de classe"
    Une **classe CSS** permet d’appliquer un même style à plusieurs éléments HTML, même s’ils ne sont pas du même type.

    Une classe se définit dans le CSS avec un point `.` et s’utilise dans le HTML avec l’attribut `class` et peut être utilisée autant de fois que nécessaire dans une page.

    Par exemple, si on a des éléments avec pour classe `important` :

    ```html linenums="1" title="Code HTML"
    <p class="important">Texte important</p>
    <h1 class="important">Un titre important</h1>
    ```
    On peut directement modifier l'apparence de tous ces éléments grâce à la syntaxe `.nom_de_la_classe` : 

    ```css linenums="1" title="Code CSS"
    .important {
        color: red;
    }
    ```


!!! css "Sélecteur d’identifiant"
    Il cible un élément possédant un identifiant unique.

    Par exemple, si un élément possède l'identifiant `titre` :

    ```html linenums="1" title="Code HTML"
    <h1 id="titre">Titre principal</h1>
    ```
    On peut modifier l'apparence de cet élément uniquement grâce à la syntaxe `#nom_de_l_identifiant`: 

    ```css linenums="1" title="Code CSS"
    #titre {
        font-size: 30px;
    }
    ```


!!! tip "Priorité des sélecteurs"
    Lorsqu’il y a plusieurs règles possibles : `id` -> `class` -> élément

---

## À retenir 📌

!!! info "Résumé"
    - Le CSS permet de **mettre en forme** une page web
    - HTML et CSS doivent être **séparés**
    - La **feuille CSS externe** est la méthode recommandée
    - Le fichier CSS est lié avec la balise `<link>`
    - Les styles sont appliqués grâce aux **sélecteurs**
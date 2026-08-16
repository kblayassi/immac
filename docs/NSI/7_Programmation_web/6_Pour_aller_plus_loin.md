---
title: Pour aller plus loin
weight: 7
---

# Pour aller plus loin 🚀

Cette partie propose quelques notions **plus avancées** en HTML et CSS. Elles ne sont pas indispensables pour créer un site fonctionnel, mais permettent d’aller plus loin dans la **mise en page** et la **personnalisation**.

---

## Tableaux HTML 📊

!!! html "Tableau HTML"
    Un **tableau HTML** permet d’organiser des données sous forme de lignes et de colonnes.

    Les principales balises sont :

    - `<table>` : tableau
    - `<tr>` (table row) : ligne du tableau
    - `<td>` (table data) : cellule

Voici un exemple simple de tableau en HTML : 

```html linenums="1"
<table>
    <tr>
        <td>Nom</td>
        <td>Âge</td>
    </tr>
    <tr>
        <td>Alice</td>
        <td>16</td>
    </tr>
</table>
```

Et le résultat : 

<table>
    <tr>
        <td>Nom</td>
        <td>Âge</td>
    </tr>
    <tr>
        <td>Alice</td>
        <td>16</td>
    </tr>
</table>

---

## Pseudo-éléments CSS 🧩

!!! definition "Pseudo-éléments"
    En CSS, il existe de très nombreux pseudo-éléments. Dans les exercices précédents, les pseudo-éléments `:first-of-type`, `:last-of-type` et `:nth-of-type` ont permis d'identifier des éléments en fonction de leur «numéro» dans un conteneur. Le pseudo-élément `:hover` a permis de modifier l'affichage de l'élément ciblé au passage de la souris. Il existe de nombreux autres pseudo-éléments dont certains permettent d'avoir du contenu de «texte par défaut».

!!! css "`::before` et `::after`"
    Les pseudo-éléments `::before` et `::after` permettent de placer au début (ou à la fin) d'un élément un contenu prédéfini.


Par exemple, le code CSS suivant me permettrais d'ajouter une flèche au début de chaque paragraphe :

```css linenums="1"
p::before {
    content: "➜ ";
}
```

---

## Positionnement CSS 📐

!!! info "Propriété position"
    La propriété position permet de contrôler la manière dont un élément est placé dans la page.

    - `position: static` : Il s'agit de la valeur par défaut. L’élément suit le flux normal de la page

    - `position: relative` : L’élément reste dans le flux, mais peut être déplacé avec `top`, `left`, `right` et `bottom`. 

        ```css
        div {
            position: relative;
            top: 10px;
        }
        ```

    - `position: absolute` : L’élément sort du flux normal. Il est positionné par rapport à son premier parent positionné

        ```css
        div {
            position: absolute;
            top: 0;
            right: 0;
        }
        ```

    - `position: fixed` : L’élément est fixé par rapport à la fenêtre, il reste visible lors du défilement

        ```css
        .menu {
            position: fixed;
            top: 0;
        }
        ```


---

## À retenir 📌

!!! info "Résumé"
    - Les tableaux servent à afficher des données
    - Les pseudo-éléments ajoutent du contenu décoratif
    - position permet de contrôler le placement des éléments
    - Ces notions sont utiles mais non obligatoires



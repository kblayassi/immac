---
title: HTML – Principes et premières balises
weight: 2
---

# HTML : principes et premières balises 🧱📄

Le **HTML** est un langage de balisage permettant de **structurer le contenu** d’une page web. 

Il indique au navigateur **ce que représente chaque élément** : un titre, un paragraphe, une liste, une image, etc.

---

## Principe des balises HTML 🔖

!!! definition "Balise HTML"
    Une **balise HTML** est un mot-clé entouré de chevrons `< >` qui permet de **donner un sens** à une partie du contenu.

La plupart des balises vont par paires : 

```html linenums="1"
<balise>contenu</balise>
```

On parlera alors de : 

- la balise **ouvrante** : `<balise>`
- la balise **fermante** : `</balise>`

---

## Structure initiale d’une page HTML 🧩

!!! info "Structure minimale"
    Toute page HTML doit respecter une structure minimale : 

    ```html linenums="1"
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <title>Ma première page</title>
        </head>

        <body>
            Contenu de la page
        </body>
    </html>
    ```

Cette structure minimale présente plusieurs balises : 

- `<!DOCTYPE html>` : indique qu’il s’agit d’un document HTML5
- `<html>` : racine du document
- `<head>` (*entète* en anglais) : informations non visibles (titre, encodage…)
- `<body>` (*corps* en anglais) : contenu visible de la page

!!! tip "Code source d'une page web"
    Tous les navigateurs permettent de voir le code HTML d’une page web.

    Méthodes courantes : 
    
    - clic droit → Afficher le code source
    - raccourci clavier : Ctrl + U

    👉 Cela permet de :

    - comprendre comment une page est construite
    - s’inspirer de structures existantes
    - repérer les balises utilisées

---

## Types de balises 🧠

!!! definition "Balises de type bloc 📦"
    Les balises de type **bloc** occupent toute la largeur disponible et commencent sur une nouvelle ligne.

    Exemples :

    ```html
    <p>Un paragraphe</p>
    <div>Une division</div>
    <h1>Un titre</h1>
    ```

!!! definition "Balises de type en-ligne 🧩"
    Les balises **en-ligne** (*in-line* en anglais) n’occupent que la place nécessaire et ne provoquent pas de retour à la ligne.

    Exemples :

    ```html
    <strong>texte important</strong>
    <em>texte en italique</em>
    <span>texte</span>
    ```

!!! definition "Balises marqueurs 🏷️"
    Certaines balises servent principalement de repères pour structurer ou cibler le contenu, souvent en lien avec le CSS.

    Exemples :  
    ```html
    <div>Zone de contenu</div>
    <span>Petit élément</span>
    ```


---


## À retenir 📌

!!! info "Résumé"
    - Le HTML est un **langage de balisage**
    - Une page HTML possède une **structure minimale obligatoire**
    - Les balises vont généralement par paires
    - Il existe des balises de type **bloc** et **en-ligne**
    - Le navigateur permet d’explorer le **code source** d’une page
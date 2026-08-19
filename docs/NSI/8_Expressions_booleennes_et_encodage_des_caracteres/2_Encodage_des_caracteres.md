---
title: Encodage des caractères
weight: 2
---

# Encodage des caractères 🔤

L’ordinateur ne comprend que des **0** et des **1**.  
Mais alors... comment fait-il pour manipuler du **texte**, comme `"Bonjour"` ou `"🐍 Python"` ? 🤔  

Pour cela, il utilise un **système de codage** qui associe **chaque caractère** à un **nombre unique**.  
C’est ce qu’on appelle un **encodage**.

---

## Du caractère au nombre : le principe du codage

!!! definition "Définition : encodage"
    Un **encodage de caractères** est une correspondance entre : 

    - des **symboles lisibles** (lettres, chiffres, ponctuation, etc.) ;
    - et des **valeurs numériques** (0 et 1) compréhensibles par la machine.

Par exemple, le caractère `A` est représenté par le nombre **65**,  
et la lettre `B` par **66**.

```python linenums="1" title="Exemple en Python"
print(ord("A"))  # 65
print(chr(65))   # A
```

!!! python "Fonctions `ord` et `chr`"
    La fonction `ord()` renvoie le **code numérique** du caractère, et `chr()` fait l’inverse : elle transforme un code en caractère.

---

## Les principaux systèmes d’encodage

Au fil du temps, plusieurs systèmes de codage ont été inventés.  
Certains sont limités à quelques langues, d’autres sont universels.

!!! info "Historique des encodages"

    | **Encodage** | **Année** | **Taille** | **Caractères possibles** | **Particularités** |
    |:--------------|:-----------|:-------------|:--------------------------|:------------------|
    | **ASCII** | 1963 | 7 bits | 128 | Lettres anglaises, chiffres, ponctuation |
    | **ISO-8859-1 (Latin-1)** | 1987 | 8 bits | 256 | Ajout des caractères accentués utilisés en Europe de l’Ouest |
    | **Unicode / UTF-8** | 1991 | variable | + de 140 000 | Compatible avec toutes les langues, symboles et emojis |

---

### ASCII

!!! definition "Définition : ASCII"
    L’**ASCII** (*American Standard Code for Information Interchange*) est un codage sur **7 bits**,  
    soit **128 caractères** possibles (de 0 à 127).

    Il contient : 
    
    - les lettres majuscules et minuscules (`A` à `Z`, `a` à `z`) ;
    - les chiffres (`0` à `9`) ;
    - les signes de ponctuation ;
    - et des caractères de contrôle (retour à la ligne, tabulation...).

!!! example "Extrait de la table ASCII"
    <div align="center">

    | Caractère | Code décimal | Code binaire |
    |:-----------:|:--------------:|:--------------:|
    | A | 65 | 01000001 |
    | B | 66 | 01000010 |
    | a | 97 | 01100001 |
    | b | 98 | 01100010 |
    | 0 | 48 | 00110000 |
    | ! | 33 | 00100001 |

    </div>

⚠️ Problème : l’ASCII ne permet **aucun accent**, ni caractère non anglais (`é`, `ç`, `ñ`...).

---

### ISO-8859-1 (Latin-1)

Pour corriger cette limite, un nouveau standard à **8 bits** a été créé : **ISO-8859-1**, aussi appelé **Latin-1**.  
Il permet d’ajouter les caractères utilisés dans les langues européennes.

!!! example "Exemple"
    Le caractère `é` est, par exemple, codé par la valeur **233** (`0xE9` en hexadécimal) : 
    ```python linenums="1"
    texte = "café"
    print(texte.encode("iso-8859-1"))  # b'caf\xe9'
    ```

    

!!! info "Limite"
    Cet encodage fonctionne bien pour le français, mais **pas pour toutes les langues**.  
    Il ne contient pas les symboles grecs, arabes, chinois, ni les emojis.

---

### Unicode et UTF-8

Pour unifier tous les systèmes d’écriture, le standard **Unicode** a été créé.  
Chaque caractère du monde y possède un **code unique**, appelé *point de code* (comme `U+0041` pour `A`).

!!! definition "Définition : UTF-8"
    L’**UTF-8** (*Unicode Transformation Format - 8 bits*) est un **format de stockage** de l’Unicode.  
    Il code chaque caractère sur **1 à 4 octets** selon sa complexité.

!!! example "Exemple : UTF-8 en action"
    Nous allons donner l'encodage de "*🐍 Python café*" en UTF-8 : 

    ```python linenums="1"
    texte = "🐍 Python café"
    print(texte.encode("utf-8"))
    ```
    Résultat :
    ```
    b'\xf0\x9f\x90\x8d Python caf\xc3\xa9'
    ```

    Les caractères ASCII utilisent 1 octet,  mais les emojis ou caractères spéciaux utilisent plusieurs octets.

!!! tip "Avantage"
    L’UTF-8 est **rétrocompatible avec ASCII** : tous les textes ASCII sont aussi valides en UTF-8 !  

    → C’est aujourd’hui **l’encodage universel** du Web 🌍

---

## Conversion entre encodages

Il est parfois nécessaire de **convertir un fichier texte** d’un encodage à un autre, par exemple lorsqu’il contient des caractères mal affichés (`Ã©` au lieu de `é`).

!!! python "Conversion d'un encodage"
    On cherchera ici à réécrire un fichier encodé en Latin-1 en UTF-8 à l'aide de Python.

    ```python linenums="1"
    with open("ancien.txt", "r", encoding="iso-8859-1") as f: #(1)
        contenu = f.read() #(2)

    with open("nouveau.txt", "w", encoding="utf-8") as f: #(3)
        f.write(contenu) #(4)

    #Le fichier "nouveau.txt" contient maintenant le texte original,
    # mais réencodé en UTF-8 à la place du Latin-1.
    ```

    1. On ouvre le fichier "ancien.txt" encodé en Latin-1 en lui donnant le nom `f` dans le programme.
    2. On stocke le contenu de ce fichier dans une variable `contenu`
    3. On crée un nouveau fichier "nouveau.txt" encodé en UTF-8 et on le nomme `f` dans le programme.
    4. On écrit le contenu de `contenu` dans ce nouveau fichier.

!!! warning "Problèmes fréquents"
    - Ouvrir un fichier avec **le mauvais encodage** entraîne des symboles illisibles (`�` ou `Ã©`).  
    - Toujours **spécifier l’encodage** à l’ouverture (`encoding="utf-8"`) pour éviter les erreurs.  
    - Ne pas confondre **Unicode** (standard de codage) et **UTF-8** (format de stockage).

---

## À retenir 📌

!!! info "Résumé de la partie"
    - Un **encodage** traduit les caractères en nombres binaires.  
    - **ASCII (7 bits)** : uniquement anglais.  
    - **ISO-8859-1 (8 bits)** : ajoute les accents européens.  
    - **Unicode / UTF-8** : couvre toutes les langues du monde.  
    - UTF-8 est **le standard actuel** du Web et des systèmes modernes.  
    - Toujours **vérifier ou préciser l’encodage** pour éviter les erreurs de lecture.
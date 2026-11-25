---
title: Projet - Secret Santa
weight: 6
---
# Projet : Secret-Santa 🎅🏼

L'objectif de ce projet est de créer le meilleur algorithme possible pour réaliser un Secret Santa.

Le principe de base est simple : attribuer à chaque personne une autre personne à qui offrir un cadeau.

## Où travailler

Le projet se fait **directement dans le navigateur**, comme une évaluation sur écran, mais
**sans limite de temps** : tu le commences en classe et tu le termines chez toi.
Clique sur le bouton ci-dessous, puis entre ce code :

```
SECRET-SANTA-NSI
```

[Ouvrir le projet :material-arrow-right:](../../eval/passer.html){ .md-button }
[Consulter ma copie corrigée :material-arrow-right:](../../eval/copie.html){ .md-button }

!!! tip "Des jeux de tests pour te guider"
    Chaque question se termine par un bloc **Jeux de tests** déjà écrit. Clique sur
    **▶ Exécuter** : il te dit ce qui ne va pas encore, et affiche une ligne ✓ quand
    tout passe. Le tirage étant aléatoire, exécute plusieurs fois : les tests doivent
    passer **à chaque fois**.

    Ne modifie pas ces tests : ton professeur les rejouera, avec d'autres prénoms.

!!! warning "Changer d'ordinateur"
    Ton travail est enregistré **dans le navigateur où tu l'as écrit**. Pour le continuer
    ailleurs, clique sur **💾 Mon travail**, en haut de la page du projet, puis
    **Télécharger mon travail**. Sur l'autre ordinateur, ouvre le projet avec le même
    code et dépose ce fichier dans **Mon travail** (ou dans **Reprendre mon travail**,
    sur l'écran d'accueil).

    Ce fichier n'est pas ta copie : ton professeur ne reçoit ton projet que lorsque tu
    cliques sur **Rendre** — une seule fois, et ensuite il ne se modifie plus.

## Partie 1 - Premier algorithme

Créer un algorithme qui, à partir d'une liste de prénoms (les participants au Secret Santa),
associe à chaque prénom de la liste un autre prénom aléatoire (qui recevra le cadeau).

**Contraintes** :

- Les prénoms doivent être stockés dans une liste.
- Une personne ne doit pas recevoir plusieurs fois un cadeau, mais une personne peut s'offrir un
cadeau à elle-même.
- Exprimer le résultat avec un `print` de votre choix (par exemple : `Typpi donne à Roumy`,
`Roumy donne à Mystik`, …).

Dans le projet, cela devient la fonction `tirage_simple(prenoms)`, qui renvoie un
**dictionnaire** associant chaque donneur à son receveur.

## Partie 2 - Cyclique

Ce coup-ci, l'algorithme doit fournir une chaîne de prénoms. Par exemple, si les 3 participants
sont `A`, `B` et `C`, on aurait : `A -> B -> C -> A`.

**Contraintes** :

- Les prénoms doivent être stockés dans une liste.
- Une personne ne doit pas recevoir plusieurs fois un cadeau.
- Le résultat doit former un cycle. Par exemple, si `liste = ['A', 'B', 'C', 'D']`, alors le
résultat peut être : `B -> D -> A -> C -> B`. La première personne à recevoir un cadeau doit être
la prochaine personne à offrir…
- Exprimer le résultat avec un `print` qui affiche la chaîne comme dans l'exemple ci-dessus.

Dans le projet : `tirage_cyclique(prenoms)` renvoie la liste du tirage, et `chaine(cycle)` la
phrase à afficher.

## Partie 3 - Algorithme complet

On propose cette fois de coder une version complète d'un Secret Santa. L'algorithme prendra en
entrée un dictionnaire de la forme suivante :

```python linenums="1"
interdits = {
    "prénom1": ["interdit1", "interdit2", …],
    "prénom2": ["interdit3", "interdit4", …],
}
```

Les clés du dictionnaire sont les prénoms des participants. La valeur de chaque clé est une liste
contenant les prénoms des personnes auxquelles le participant n'a pas le droit d'offrir.

Réaliser un algorithme créant une chaîne (cyclique) prenant en compte les prénoms interdits.

**Contraintes** :

- Utiliser un dictionnaire structuré comme ci-dessus.
- Une personne ne peut pas recevoir un cadeau plusieurs fois.
- Une personne ne peut pas offrir à une autre personne présente dans sa liste interdite.
- Le tirage doit former un cycle (le premier receveur devient le second donneur, …).
- Le dernier receveur doit être le premier donneur.
- Le programme produit une liste contenant le tirage (par exemple : `['A', 'D', 'E', 'B', 'C']`).
- Le programme produira une sortie du type : `A -> D -> E -> B -> C -> A`.

Dans le projet, cette partie se fait en deux temps : d'abord `est_valide(cycle, interdits)`, qui
**vérifie** un tirage, puis `tirage_complet(interdits)`, qui en **produit** un — et renvoie `None`
si aucun tirage n'existe.

## Grille d'évaluation

Le projet est noté sur **20 points**. La plupart des points sont donnés par les tests ; ceux de la
qualité du code sont mis par ton professeur, en lisant ton programme.

| Partie | Ce qui est évalué | Points |
|:--|:--|:--:|
| 1 | Le dictionnaire du tirage est correct (une clé par participant, un cadeau chacun), le tirage est aléatoire, la liste n'est pas modifiée, le tirage est affiché | 3,5 |
| 2 | La liste du tirage est correcte et aléatoire, la liste reçue n'est pas modifiée | 2 |
| 2 | La fonction `chaine` et l'affichage du tirage | 2,5 |
| 3 | `est_valide` accepte les bons tirages et refuse les mauvais, sans oublier le dernier, qui offre au premier | 3,5 |
| 3 | `tirage_complet` produit une liste valide et aléatoire, renvoie `None` quand c'est impossible, et le tirage est affiché | 5 |
| | Le programme est correctement **commenté** | 2 |
| | Le programme est bien **organisé** (fonctions découpées et réutilisées) | 1 |
| | Le programme est **optimal** (pas de travail inutile, arrêt garanti) | 0,5 |

---
title: Projet - Secret Santa
weight: 7
---
# Projet : Secret-Santa 🎅🏼

L'objetif de ce projet est de créer le meilleur algorithme possible pour réaliser un Secret Santa.

Le principe de base est simple : attribuer à chaque personne une autre personne à qui offrir un cadeau.

## Partie 1 - Premier algorithme 

Créer un algorithme qui, à partir d’une liste de prénom (les participants au Secret Santa), associe à
chaque prénom de la liste un autre prénom aléatoire (qui recevra le cadeau).

**Contraintes** : 

- Les prénoms doivent être stockés dans une liste
- Une personne ne doit pas recevoir plusieurs fois un cadeau, mais une personne peut s’offrir un
cadeau à elle-même.
- Exprimer le résultat avec un `print` de votre choix (par exemple : `Typpi donne à Roumy`, `Roumy
donne à Mystik` , …)

## Partie 2 - Cyclique

Créer un algorithme qui à partir d’une liste de prénom (les participants au Secret Santa), associe à
chaque prénom de la liste un autre prénom aléatoire (qui recevra le cadeau).

Ce coup-ci, l'algorithme doit fournir une chaine de prénom. Par exemple, si les 3 participants sont `A`, `B` et `C`, on aurait : `A -> B -> C -> A`

**Contraintes** : 

- Les prénoms doivent être stockés dans une liste
- Une personne ne doit pas recevoir plusieurs fois un cadeau.
- Le résultat doit former un cycle. Par exemple, si `liste = [‘A’, ‘B’, ‘C’, ‘D’]`, alors le résultat peut être :
`B -> D -> A -> C`. Cela forme une chaine, la première personne à recevoir un cadeau, doit être la
prochaine personne à offrir…
- Exprimer le résultat avec un print qui aﬃche la liste comme dans l’exemple ci-dessus.

## Partie 3 - Algorithme complet

On propose cette fois de coder une version complète d’un Secret Santa. L’algorithme prendra en entrée
un dictionnaire de la forme suivante :

```python linenums="1"
dict = {
    "prénom1" : ["interdit1", "interdit2", …]
    "prénom2" : ["interdit3", "interdit4", …]
}
```

Les clés du dictionnaire sont les prénoms des participants. La valeur de chaque clé est une liste
contenant les prénoms des personnes auxquelles le participants n’a pas le droit d’offrir.

Réaliser un algorithme créant une chaine (cyclique) prenant en compte les prénoms interdits.

**Contraintes** : 

- Utiliser un dictionnaire structuré comme ci-dessus
- Une personne ne peut pas recevoir un cadeau plusieurs fois
- Une personne en peut pas offrir à une autre personne présente dans sa liste interdite
- Le tirage doit former un cycle (le premier receveur devient le second donneur, …)
- Le dernier receveur doit être le premier donneur
- Le programme produit une liste contenant le tirage (par exemple : `new_list = [‘A’, ‘D’, ‘E’, ‘B’, ‘C’]` )
- Le programme produira une sortie du type : `A -> D -> E -> B -> C -> A`

**Grille d'évaluation** : 

| Énoncé | Note |
|:-----:|:----:|
| La structure du dictionnaire est respectée | 1|
| Le programme est correction commenté | 2 |
| Le programme produit une liste contenant le résultat | 3 |
| Le programme aﬃche correctement le résultat | 2 |
| Le programme est bien organisé | 1| 
| Le programme est optimal (degré d’optimalité) | 1 | 

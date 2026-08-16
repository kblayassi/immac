---
title: TD2 - Utiliser des jeux de tests
weight: 2.5
---

# Utiliser des jeux de tests

En tant que développeur Python, on vous demande de « vérifier » le bon comportement de chaque fonction écrite. Pour cela, il faut écrire une deuxième fonction, dite « de vérification » ou de « test ».

La fonction à écrire (qui sera ensuite vérifiée) doit calculer un prix après remise : si le prix est de 100 € ou moins, il n’y a pas de réduction. Sinon, la réduction sur le prix total est de 10 €.
Vous écrivez donc les deux fonctions suivantes :

```python linenums="1" title="Fonction réduction"
def reduction(prix):
    if prix < 100:
        return prix
    else:
        return prix - 10
```

```python linenums="1" title="Fonction test"
def test_reduction():
    if not reduction(50) == 50:
        return False
    elif not reduction(150) == 140:
        return False
    else:
        return True
```

1. Si la fonction de test renvoie `False`, que peut-on en déduire sur le fonctionnement de `reduction(prix)` ?
2.	Saisissez les deux fonctions dans [Basthon Notebook](https://notebook.basthon.fr). Que renvoie l’appel `test_reduction()` dans la console Python ? Est-il nécessaire que le test renvoie `True` pour que la fonction soit correcte ?
3.	Dans le jeu de tests, quelles sont finalement les seules valeurs testées ?
4.	Condiant de l'exactitude de votre fonction, vous l'intégrez dans le logiciel qui doit l'utiliser. On s'aperçoit par le suite que la réduciton n'est pas appliquée pour un prix égal à 100€... 
    
    Selon vous, d’où vient le problème ?

5.	La fonction de test était-elle suffisante ? Expliquer pourquoi.
6.	Était-il réaliste de vouloir tester tous les cas possibles ?
7.	Commenter la citation de l’algorithmicien très connu Edsger Dijkstra : « *Le test de programmes peut être une façon très efficace de montrer la présence de bogues mais est désespérément inadéquat pour prouver leur absence.* »
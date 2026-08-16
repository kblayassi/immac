---
title: TD1 - Prototypage d'une fonction
weight: 1.5
---

# Prototypage d'une fonction

En tant que développeur Python, on vous demande d’écrire une fonction de calcul de la racine carrée d’un nombre.
L’entreprise dans laquelle vous travaillez demande que chaque fonction soit documentée, selon le schéma suivant.

| # | Question                                                                 | Informations | Lignes |
|--|---------------------------------------------------------------------------|----------|----------|
| 1 | Quel est le nom de la fonction ?                                          |          |          |
| 2 | Combien d’arguments sont acceptés en entrée ? Préciser leur(s) type(s).  |          |          |
| 3 | Quel est le domaine de valeurs valide des arguments en entrée ?           |          |          |
| 4 | Combien de valeurs sont renvoyées en sortie ? Préciser leur(s) type(s).  |          |          |
| 5 | Quels sont les domaines valides des valeurs renvoyées en sortie ?         |          |          |

Si vos souvenirs sont bons en mathématiques, la racine carrée d’un nombre est toujours positive ou nulle, et ne peut être calculée que pour des valeurs positives ou nulles.

1. **Remplir la troisième colonne du tableau précédent en fonction de ces informations.**

    Les lignes 1, 2 et 4 sont appelées le **prototype de la fonction** car elles définissent le minimum d’informations à connaître pour pouvoir utiliser la fonction.

2. **À quoi servent les lignes 3 et 5 ? Comment ces informations pourraient-elles être utilisées ?**


3. Vous écrivez ensuite le programme ci-contre :
    
    ```python linenums="1"
    def racine(a):
        # Méthode de Héron
        assert a >= 0
        x = 1
        for i in range(10):
            x = (x + a / x) / 2
        return x
    ```

    **Compléter la quatrième colonne du tableau avec les numéros de lignes correspondant au programme ci-dessus.**

4. Saisissez cette fonction sur [Basthon Notebook](https://notebook.basthon.fr). Tester la fonction avec un argument invalide en entrée, par exemple la valeur -2. **Que se passe-t-il ?**
5. Supprimer la ligne 3 du programme et tester à nouveau la fonction avec -2 en argument. **Que se passe-t-il ?**
6. **Préciser alors le rôle de l’assertion utilisée en ligne 3.**

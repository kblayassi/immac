---
title: TD1 - Tables de vérité
weight: 0.5
---

# Table de vérité 🧩

L'objectif de ce TD est de découvrir les **tables de vérités** puis de les utiliser pour représenter les différentes opérations booléennnes. 

---

## 1 - Opérateurs `and` et `or` en Python

On considère les deux programmes ci-dessous : 

<div style="display: flex; gap: 20px;">

<div style="flex: 1;">

```python linenums="1" title="Programme A"
a = ...
b = ...

print(a and b)
```

</div>

<div style="flex: 1;">

```python linenums="1" title="Programme B"
a = ...
b = ...

print(a or b)
```

</div>

</div>

1. Compléter le tableau suivant à l'aide du programme A : 

    | `a` | `b` | `a and b` |
    |:----:|:----:|:-------:|
    | `True` | `True` | ... |
    | `True` | `False` | ... |
    | `False` | `True` | ... |
    | `False` | `False` | ... |

    !!! info "À retenir !"
        On appelle ce tableau **table de vérité** de l'opérateur `and`. 

2. Compléter la table de vérité de l'opérateur `or` à l'aide du programme B : 

    | `a` | `b` | `a or b` |
    |:----:|:----:|:-------:|
    | `True` | `True` | ... |
    | `True` | `False` | ... |
    | `False` | `True` | ... |
    | `False` | `False` | ... |

---


## 2 - Table de vérité de l'opérateur `not`

L'opérateur `not` introduit une négation et permets d'inverser une valeur booléenne. 
   
1. Compléter la table de vérité de l'opérateur `not` ci-dessous : 

    | `a` | `not a` |
    |:---:|:--------:|
    | `True` | ... |
    | `False` | ... |

2. Si `a` vaut `True` et `b` vaut `False`, que vaut l'expression booléenne `not a and not b` ? 
3. On dit que l'interpréteur Python évalue une expression booléenne de manière "fainéante" : il peut parfois ignoer l'expression à droite de l'expression. Dans l'expression précédente, pourquoi l'interpréteur Python peut-il court-circuiter l'évaluation de `not b` ?
4. Remplir les deux tables de vérité des expressions booléennes `not(a and b)` et `not a or not b`. 

    | `a` | `b` | `a and b` | `not(a and b)` |
    |:----:|:----:|:-------:|:-------:|
    | `True` | `True` | `True` | `False` |
    | `True` | `False` | ... | ... |
    | `False` | `True` | ... | ... |
    | `False` | `False` | ... | ... |

    | `a` | `b` | `not a` | `not b` | `not a or not b` |
    |:----:|:----:|:-------:|:-------:| :-------:|
    | `True` | `True` | `False` | `False` | `False` |
    | `True` | `False` | ... | ... | ... |
    | `False` | `True` | ... | ... |... |
    | `False` | `False` | ... | ... |... |


5. Comparer les deux tables de vérité ci-dessus. Que peut-on en déduire ?

---

## 3 - Table de vérité de l'opérateur `xor`

L'opérateur "ou exclusif" noté `xor` renvoie `True` si une et une seule des deux entrées est `True`.

L'opérateur `xor` est donc un équivalent de l'expression booléenne `(a and not b) or (not a and b)`. On va le démontrer. 

1. Compléter la table de vérité de `xor` : 

    | `a` | `b` | `a xor b` |
    |:----:|:----:|:-------:|
    | `False` | `False` | `False` |
    | `True` | `False` | ... |
    | `False` | `True` | ... |
    | `True` | `True` | ... |

2. Compléter la table de vérité de `(a and not b) or (not a and b)` : 

    | `a` | `b` | `not b` | `a and not b` | `not a` | `not a and b` | `(a and not b) or (not a and b)` |
    |:----:|:----:|:-------:|:-------:| :-------:| :-------:| :-------:|
    | `True` | `True` | ... | ... | ... | ... | ... |
    | `True` | `False` | ... | ... | ... | ... | ... |
    | `False` | `True` | ... | ... |... | ... | ... |
    | `False` | `False` | ... | ... |... | ... | ... |
---
title: Conclusion
weight: 5
---

# Conclusion 🎯

Jusqu'ici, une variable ne contenait qu'**une seule** valeur. Nous savons désormais rassembler et manipuler des **collections ordonnées** de valeurs — et c'est ce qui va nous permettre de traiter de vraies données.

Nous savons désormais :

- [x] **Créer** une liste, **lire** et **modifier** ses éléments grâce à leur indice ;
- [x] La **parcourir**, par élément ou par indice, et la construire **par compréhension** ;
- [x] Utiliser des **matrices** — des listes de listes — avec la notation `M[i][j]` ;
- [x] Expliquer ce qu'est une **adresse mémoire**, pourquoi les indices commencent à 0, et pourquoi `M = L` ne **copie pas** une liste ;
- [x] Distinguer un **parcours total** d'un **parcours partiel** ;
- [x] Écrire nos premiers **algorithmes de référence** : recherche d'une occurrence, indice de la première occurrence, liste de toutes les occurrences, minimum, maximum, moyenne ;
- [x] Manipuler les **chaînes de caractères** : indexation, immuabilité, concaténation, parcours et tranches.

!!! info "Les trois idées à ne jamais oublier"
    1. **L'accumulateur** : on prépare une variable *avant* la boucle, on la fait évoluer *dans* la boucle, on l'utilise *après*. Compter, sommer, chercher un record, collecter des indices : c'est toujours le même schéma.
    2. **Modifiable ou non** : une liste se modifie sur place (et se partage donc dangereusement) ; une chaîne, jamais — on en fabrique une nouvelle.
    3. **Tout finit par un parcours** : l'ordinateur ne voit pas les données d'un coup d'œil, il lit les cases une à une.

Et maintenant ? Nos fonctions deviennent assez sérieuses pour qu'on se demande **si elles sont justes** : le prochain chapitre nous apprendra à les **spécifier** et à les **tester** méthodiquement. 🧪

Nous découvrirons ensuite d'autres **types construits** — les **p-uplets**, qui ressemblent aux listes mais ne se modifient pas, et les **dictionnaires**, qui remplacent l'indice par une clé de notre choix. 🗝️

Enfin, le chapitre d'**algorithmique** reprendra les algorithmes de ce chapitre pour se poser une nouvelle question : lequel est le plus **efficace** ? 📈

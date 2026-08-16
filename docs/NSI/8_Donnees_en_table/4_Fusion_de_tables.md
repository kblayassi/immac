---
title: Fusion de tables
weight: 4
---

# Fusion et transformation des tables 🔗

Dans certaines situations, une seule table ne suffit pas.  
On peut avoir besoin de **croiser plusieurs sources de données** pour enrichir les informations, comme associer des notes à une table d’élèves, ou relier des réservations à des clients.

Cette opération s’appelle la **fusion de tables**, ou **jointure**.  
Elle permet de combiner des **enregistrements** issus de deux tables en utilisant un **descripteur commun**.

---

## 1 - Pourquoi fusionner deux tables ? 🤝

Prenons un exemple concret ! On dispose de deux fichiers téléchargeables ci-dessous :

- [client.csv](../../files/NSI/CSV/client.csv)
- [commande.csv](../../files/NSI/CSV/commande.csv)

Le premier fichier peut être représenté par une table contenant les **informations sur les clients** :

| id_client | nom      | prénom   |
|-----------|----------|----------|
| 1         | Bagou    | Albert   |
| 2         | Charabia | Barnabé  |
| 3         | Blabla   | Casimir  |
| 4         | Paulitik | Zoé      |
| 5         | Escro    | Virgil   |
| 6         | Manteux  | Rémi     |

Le second fichier contient les informations à propos des différentes **commandes** passées :

| id_commande | id_client | descriptif                          |
|-------------|-----------|-------------------------------------|
| 1           | 2         | bouilloire                          |
| 2           | 3         | Livre Apprendre Python              |
| 3           | 2         | Livre Apprendre HTML                |
| 4           | 4         | Livre Apprendre CSS                 |
| 5           | 6         | couverture                          |
| 6           | 4         | VTT                                 |
| 7           | 4         | smartphone                          |
| 8           | 1         | cahiers                             |
| 9           | 2         | Livre Le réseau internet            |
| 10          | 3         | Livre Les systèmes d’exploitation   |
| 11          | 1         | Livre Algorithmique                 |

Ces deux tables partagent un **descripteur commun** : `id_client`.  
Fusionner les deux permettrait d’obtenir une table complète qui lie chaque commande à une personne réelle (avec son nom et prénom), et non pas seulement à un identifiant.

On souhaite donc construire une **liste de dictionnaires**, dans laquelle chaque dictionnaire regroupera les **informations du client** et **celles de la commande associée**, par exemple :

```python
{"id_client": 2, "nom": "Charabia", "prénom": "Barnabé", "id_commande": 3, "descriptif": "Livre Apprendre HTML"}
```

👉 Naturellement, seuls les clients ayant passé **au moins une commande** apparaîtront dans cette nouvelle table. Autrement dit, on ne fusionne les lignes que lorsqu’il y a correspondance sur le champ `id_client`.

--- 

## 2 - Comment fusionner ces deux tables en Python ? 🧪

Maintenant que nous avons compris l'objectif, voyons comment **réaliser cette fusion en Python**.

L’idée est de :  

1. Lire les deux fichiers CSV (`client.csv` et `commande.csv`) ;
2. Pour chaque **commande**, retrouver le **client correspondant** grâce au `id_client` ;
3. Créer un nouveau **dictionnaire fusionné** contenant les informations du client et de sa commande ;
4. Ajouter ce dictionnaire à une nouvelle table.

Voici une proposition d'implémentation en Python. Pensez à appuyer sur les boutons :material-plus-circle: pour avoir des informations complémentaires.

```python title="Fusion des deux tables" linenums="1"
import csv #(1)

with open("client.csv", newline="") as f: #(2)
    clients = list(csv.DictReader(f, delimiter=";")) #(3)

with open("commande.csv", newline="") as f: #(4)
    commandes = list(csv.DictReader(f, delimiter=";")) #(5)

fusion = [] #(6)

for commande in commandes: #(7)
    for client in clients: #(8)
        if commande["id_client"] == client["id_client"]: #(9)
            new_enregistrement = { #(10)
                'id_client': client['id_client'],
                'nom': client['nom'],
                'prénom': client['prénom'],
                'id_commande': int(commande['id_commande']),
                'descriptif': commande['descriptif']
            } 
            fusion.append(new_enregistrement) #(11)

print(fusion) #(12)
```

1. On importe le module CSV nécessaire à la lecture des deux tables initiales.
2. On ouvre le fichier `client.csv`.
3. On le convertit en liste de dictionnaire et on le stocke dans une variable `clients` pour pouvoir y accéder dans la suite du programme.
4. On ouvre le fichier `commande.csv
5. On le convertit en liste de dictionnaire et on le stocke dans une variable `commandes` pour pouvoir y accéder dans la suite du programme.
6. On crée une nouvelle liste vide qui contiendra notre table fusionnée.
7. Pour chaque commandes de la table `commandes`...
8. ...on cherche parmis tous les clients du registre `client`...
9. ...le client auquel appartient la commande en cours d'analyse.
10. On crée un nouvel enregistrement (un nouveau dictionnaire donc) en précisant chaque descripteurs souhaités et la valeur associée en piochant soit dans la table `client` soit dans la table `commande`.
11. On ajoute le nouvel enregistrement dans notre nouvelle table `fusion`.
12. On affiche notre nouvelle table, produit de la fusion entre les tables `client` et `commande`.

!!! expert "Pour aller plus loin : optimisation"
    La méthode précédente fonctionne, mais elle peut être lente si les tables sont grandes, car elle utilise une **double boucle**.

    Pour améliorer cela, on peut créer un **index des clients** basé sur `id_client` :

    ```py title='Fusion optimisée' linenums='1'
    index_clients = {client["id_client"]: client for client in clients} #(1)

    fusion = [] #(2)

    for commande in commandes: #(3)
        id_client = commande["id_client"] #(4)
        if id_client in index_clients: #(5)
            client = index_clients[id_client] #(6)
            new_enregistrement = { #(7)
                'id_client': id_client,
                'nom': client['nom'],
                'prénom': client['prénom'],
                'id_commande': int(commande['id_commande']),
                'descriptif': commande['descriptif']
            } 
            fusion.append(new_enregistrement) #(8)
    ```

    1. On crée un "index des clients", il s'agit d'un dictionnaire dont les clés sont les `id_client` et dont les valeurs sont les enregistrements des clients correspondants. Ainsi, plus besoin d'une double boucle pour associer commandes et clients, un simple mention à `index_clients['id_recherché']` nous donnera le bon client. 
    2. On crée notre liste vide qui acceuillera notre table fusionnée. 
    3. Pour toutes les commandes du registre...
    4. ... on récupère l'identifiant `id_client` du client.
    5. Si le client est dans notre index de client `index_clients` (ce qui sera toujours le cas dans nos cas d'études, mais qui peux ne pas l'être dans d'autres situations)...
    6. ... on récupère ses informations dans une variable `client` (qui contient donc toutes les valeurs de l'engistrement du client dans la table `client`.)
    7. On crée un nouvel enregistrement (un nouveau dictionnaire donc) en précisant chaque descripteur souhaité et la valeur associée en piochant soit dans la table `client` soit dans la table `commande`.
    8. On ajoute le nouvel enregistrement dans notre nouvelle table `fusion`.  

Une telle fusion devrait aboutir à la table suivante : 

```python title="Résultats de la fusion" linenums="1"
for lignes in fusion:
    print(lignes)
```
```py
{'id_client': '2', 'nom': 'Charabia', 'prénom': 'Barnabé', 'id_commande': '1', 'descriptif': 'bouilloire'}
{'id_client': '3', 'nom': 'Blabla', 'prénom': 'Casimir', 'id_commande': '2', 'descriptif': 'Livre Apprendre Python'}
{'id_client': '2', 'nom': 'Charabia', 'prénom': 'Barnabé', 'id_commande': '3', 'descriptif': 'Livre Apprendre HTML'}
{'id_client': '4', 'nom': 'Paulitik', 'prénom': 'Zoé', 'id_commande': '4', 'descriptif': 'Livre Apprendre CSS'}
{'id_client': '6', 'nom': 'Manteux', 'prénom': 'Rémi', 'id_commande': '5', 'descriptif': 'couverture'}
{'id_client': '4', 'nom': 'Paulitik', 'prénom': 'Zoé', 'id_commande': '6', 'descriptif': 'VTT'}
{'id_client': '4', 'nom': 'Paulitik', 'prénom': 'Zoé', 'id_commande': '7', 'descriptif': 'smartphone'}
{'id_client': '1', 'nom': 'Bagou', 'prénom': 'Albert', 'id_commande': '8', 'descriptif': 'cahiers'}
{'id_client': '2', 'nom': 'Charabia', 'prénom': 'Barnabé', 'id_commande': '9', 'descriptif': 'Livre Le réseau internet'}
{'id_client': '3', 'nom': 'Blabla', 'prénom': 'Casimir', 'id_commande': '10', 'descriptif': 'Livre Les systèmes d’exploitation'}
{'id_client': '1', 'nom': 'Bagou', 'prénom': 'Albert', 'id_commande': '11', 'descriptif': 'Livre Algorithmique'}
```

!!! expert "Pour aller plus loin : Types de jointures"
    Il existe plusieurs façons de fusionner des tables selon la **présence ou non de correspondances** dans les deux tables. Voici les principaux types de jointures que l'on peut adapter en Python :

    - **Jointure interne** (*inner join*) :  
      Seules les lignes ayant un **identifiant commun dans les deux tables** sont fusionnées.  
      ➜ C’est ce que nous avons fait jusqu’ici : seules les commandes avec un `id_client` connu sont conservées.

    - **Jointure externe à gauche** (*left join*) :  
      On garde **tous les éléments de la première table**, même s’il n’y a pas de correspondance dans la seconde.  
      ➜ Exemple : garder tous les clients, même ceux qui n’ont pas passé de commande.

    - **Jointure externe à droite** (*right join*) :  
      On garde **toutes les lignes de la seconde table**, même si la clé n'existe pas dans la première.  
      ➜ Exemple : toutes les commandes, même si on n’a pas le client correspondant (rare mais utile pour détecter des erreurs).

    - **Jointure externe complète** (*full outer join*) :  
      On garde **toutes les lignes des deux tables**, qu’il y ait correspondance ou non.  
      ➜ Cela demande de gérer les cas où une partie des données est manquante.

    Ces concepts sont issus des **bases de données relationnelles**, mais on peut les reproduire en Python avec un peu de logique conditionnelle. 🧠

!!! info "À retenir !"
    - La fusion de deux tables se fait en **reliant les enregistrements** via un **descripteur commun**.
    - Une **double boucle** permet de faire une fusion simple.
    - Le résultat de la fusion est une **liste de dictionnaires** contenant toutes les **données réunies**.
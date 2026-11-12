---
title: Introduction
weight: 1
---

# À la découverte d'Internet 🔌

!!! histoire "Le saviez-vous ?"
    En 1999 arrive en France l'**ADSL**, une technologie « haut débit » qui fait passer
    Internet par la ligne téléphonique. Avec un débit de 128 kilobits par seconde, il
    fallait environ **1 h 45** pour télécharger 100 mégaoctets, c'est-à-dire **une
    vingtaine de chansons en MP3** (une chanson pèse 4 à 5 Mo). Aujourd'hui, grâce à la
    fibre optique, **moins d'une seconde** suffit.

Internet relie aujourd'hui **plusieurs milliards d'appareils** : ordinateurs, smartphones,
consoles, montres, enceintes, voitures… Pour qu'ils puissent tous communiquer, il a fallu
inventer des **câbles** et des **ondes** pour transporter l'information, mais surtout des
**règles communes** que toutes les machines respectent.

Dans ce chapitre, nous allons :

1. **Dessiner** Internet tel que nous l'imaginons, puis découvrir de quoi il est fait 🧩 ;
2. **Comparer** les différents réseaux physiques et leur **débit** 🚀 ;
3. **Mesurer** l'explosion du trafic et comprendre l'enjeu de la **neutralité du Net** 📈 ;
4. **Suivre** un message découpé en **paquets**, de routeur en routeur, grâce aux protocoles **TCP/IP** 📦.

Le thème Internet se poursuit au **chapitre 2**, *Plongée au cœur d'Internet* : serveurs,
noms de domaine et réseaux pair-à-pair.

!!! example "Je mène l'enquête !"
    Dresse la liste de tous les objets de ton quotidien qui sont connectés à Internet.
    Tu en trouveras sans doute plus que tu ne le crois !

{% if config.extra.version == "prof" %}
!!! note "Pour le professeur"
    Chapitre prévu en **deux séances d'1 h 30**, à suivre avec le diaporama : les exercices
    viennent au fil du cours, juste après la notion qu'ils travaillent.

    **Séance 1 — Internet, les réseaux physiques et le trafic** (diapos 1 à 21)

    | Durée | Diapos | Déroulé |
    |---|---|---|
    | 15 min | 1 à 4 | Activité 1 « Dessine-moi Internet », puis l'archive INA de 1996 |
    | 10 min | 5 à 8 | Internet, un réseau de réseaux : comparaison avec les dessins |
    | 20 min | 9 à 13 | Filaire ou sans fil, la course au téléchargement, le débit et la méthode de calcul |
    | 20 min | 14 | Exercices 1 à 6 : 1 à 4 en classe, 5 et 6 à finir à la maison |
    | 10 min | 15 à 19 | Activité 2 sur le trafic, puis l'exercice 7 (la consommation des vidéos) |
    | 15 min | 20 et 21 | La neutralité du Net et l'activité 3 (débat) |

    **Séance 2 — Comment voyagent les données ?** (diapos 22 à 39, en salle informatique)

    | Durée | Diapos | Déroulé |
    |---|---|---|
    | 15 min | 22 à 26 | Adresse IP, paquets, routeurs et routage |
    | 15 min | 27 et 28 | Activité 4, le jeu du routeur (la version cartes postales du site est facultative) |
    | 5 min | 29 et 30 | Le TTL, « À retenir » sur IP |
    | 10 min | 31 à 33 | TCP et son simulateur (l'activité 5, cartes numérotées, reste facultative : elle n'est pas au diaporama) |
    | 15 min | 34 | Exercices 8 à 10 |
    | 15 min | 35 et 36 | Activité 6, `ping` sur les postes, puis l'absence de garantie temporelle |
    | 10 min | 37 | Exercices 11 à 13 : le 11 (`tracert`) sur les postes, 12 et 13 à finir à la maison |
    | 5 min | 38 et 39 | QCM de la page Conclusion et compétences |

    [Ouvrir le diaporama du chapitre :fontawesome-solid-person-chalkboard:](diaporama.html){ .md-button target="_blank" }
{% endif %}

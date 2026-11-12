---
title: Introduction
weight: 1
---

# Plongée au cœur d'Internet 🌊

!!! histoire "Le saviez-vous ?"
    Chaque seconde, le moteur de recherche de Google reçoit environ **100 000 recherches**.
    Aucun ordinateur au monde ne pourrait toutes les traiter seul : elles sont réparties
    entre des **centaines de milliers de serveurs**, rangés dans des centres de données
    répartis sur toute la planète.

Au chapitre 1, nous avons suivi le voyage des paquets, de routeur en routeur, jusqu'à leur
destinataire. Mais **qui** sont ces destinataires ? Quand tu regardes une vidéo, où se
trouve-t-elle vraiment ? Et comment ton navigateur trouve-t-il l'adresse IP d'un site dont
tu ne connais que le nom ?

Dans ce chapitre, nous allons :

1. **Distinguer** les ordinateurs qui demandent (les **clients**) de ceux qui répondent (les **serveurs**) 🖥️ ;
2. **Comprendre** comment un nom comme `wikipedia.org` devient une adresse IP, grâce aux **serveurs DNS** 📖 ;
3. **Découvrir** les réseaux **pair-à-pair**, où chaque ordinateur est à la fois client et serveur 🔗 ;
4. **Savoir** quand un téléchargement est **légal** ou **illégal**, et pourquoi c'est important ⚖️.

!!! example "Vrai ou faux ?"
    Nejma a lu sur un réseau social : *« Si des pirates rendaient tous les serveurs DNS
    indisponibles, plus personne ne pourrait surfer sur le Web. »*

    Garde cette phrase en tête : à la fin de la partie sur le DNS, tu sauras dire si elle est exacte.

{% if config.extra.version == "prof" %}
!!! note "Pour le professeur"
    Chapitre prévu en **deux séances d'1 h 30**, à suivre avec le diaporama : les exercices
    viennent au fil du cours, juste après la notion qu'ils travaillent.

    **Séance 1 — Clients, serveurs et noms de domaine** (diapos 1 à 20)

    | Durée | Diapos | Déroulé |
    |---|---|---|
    | 5 min | 1 à 3 | Présentation, le « Vrai ou faux ? » de Nejma |
    | 15 min | 4 à 7 | Activité 1 « Qui sert qui ? », puis client et serveur |
    | 15 min | 8 et 9 | Activité 2, la billetterie du concert (simulateur) |
    | 5 min | 10 et 11 | L'attaque par déni de service |
    | 10 min | 12 | Exercices 1 et 2 |
    | 10 min | 13 à 15 | Activité 3 « Le Web sans noms de domaine », le nom de domaine |
    | 10 min | 16 | Exercices 3 et 4 |
    | 20 min | 17 à 20 | Le DNS et l'activité 4 (simulateur de requête DNS) |

    **Séance 2 — Le DNS en vrai, le pair-à-pair et le téléchargement** (diapos 21 à 42, en salle informatique)

    | Durée | Diapos | Déroulé |
    |---|---|---|
    | 15 min | 21 | Activité 5, `nslookup` et my-ip-finder.fr sur les postes |
    | 15 min | 22 et 23 | Réponse à Nejma, puis exercices 5 à 9 : 5 et 6 sur les postes, 7 en classe, 8 et 9 à finir à la maison |
    | 10 min | 24 à 26 | Activité 6, la mise à jour du jeu (simulateur) |
    | 10 min | 27 à 30 | Le modèle pair-à-pair et ses usages, exercices 10, 12, 13 et 14 (à finir à la maison) |
    | 10 min | 31 à 33 | Le droit d'auteur et l'activité 7 « Légal ou illégal ? » |
    | 5 min | 34 et 35 | L'Arcom, les sanctions, la rémunération des artistes |
    | 15 min | 36 et 37 | Activité 8, le débat « Dans la peau de… » |
    | 10 min | 38 à 42 | Exercice 11, QCM de la page Conclusion ; la vidéo « Allô la Hotline » en révision |

    [Ouvrir le diaporama du chapitre :fontawesome-solid-person-chalkboard:](diaporama.html){ .md-button target="_blank" }
{% endif %}

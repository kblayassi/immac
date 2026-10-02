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
    Chapitre prévu en **deux séances d'1 h 30** : séance 1 → pages *Clients et serveurs* et
    *Les noms de domaine et le DNS* (dont le TP sur les postes) ; séance 2 → pages
    *Le pair-à-pair* et *Télécharger : légal ou illégal ?* (dont le débat), puis exercices et QCM.

    [Ouvrir le diaporama du chapitre :fontawesome-solid-person-chalkboard:](diaporama.html){ .md-button target="_blank" }
{% endif %}

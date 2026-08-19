---
title: Conclusion
weight: 4
---

# Conclusion 🏁

Dans ce chapitre, nous avons vu qu'un réseau n'est pas un "nuage magique" : c'est un ensemble de machines et d'équipements qui communiquent en suivant des **règles précises**.

Nous savons désormais :

- [x] Distinguer les rôles des équipements d'un réseau : **switch**, **routeur**, **passerelle**, **serveur DNS** ;
- [x] Expliquer le rôle du **masque de sous-réseau** : savoir si une destination est **locale** ou si elle doit passer par un routeur ;
- [x] Comprendre l'organisation en **couches** (modèle Internet) et le vocabulaire associé : **segment / paquet / trame** ;
- [x] Comprendre l'**encapsulation** : à chaque couche, on ajoute des informations pour identifier et acheminer les données ;
- [x] Mettre en évidence l'intérêt du découpage en **paquets** : meilleure robustesse (réémission partielle) et adaptation aux réseaux ;
- [x] Observer concrètement une communication avec Filius : **ARP**, table **SAT** d'un switch, et passage par un **routeur** ;
- [x] Dérouler le fonctionnement d'un protocole simple de fiabilisation : **protocole du bit alterné** (ACK + timeout + détection de doublons).

Ces notions sont essentielles pour comprendre comment Internet arrive à transporter un message **d'un logiciel à un autre**, même quand le réseau est imparfait.

Et ce n'est qu'un début : les protocoles réels (comme TCP) utilisent des mécanismes plus puissants (fenêtres glissantes, contrôle de congestion...), et le Web ajoute ensuite une couche d'interactivité (IHM, requêtes, réponses, échanges de données...) que nous explorerons dans la suite 😉
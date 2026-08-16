---
title: Introduction
weight: 9
---

# Réseaux et protocoles 🌐📦

Avant de parler de routeurs, de paquets et de protocoles, retenons une idée simple :

**Internet n'est pas un tuyau unique.**  
C'est un ensemble de **réseaux reliés entre eux**, où les données circulent… le plus souvent **par petits morceaux**.

---

## Rappels de SNT 🧠

L'an passé, nous avions déjà rencontré plusieurs protocoles liés aux réseaux :

| Mot-clé | À quoi ça sert ? |
|---|---|
| IP | Donner une *adresse* aux machines et **acheminer** les données (en paquets) |
| TCP | Rendre une communication **fiable** (éviter pertes visibles, doublons, désordre) |
| HTTP | Le protocole du **Web** : requête / réponse |
| DNS | Traduire un **nom de domaine** (ex : `exemple.fr`) en adresse IP |

!!! info "Internet ≠ Web"
    - **Internet** : l'infrastructure (réseaux interconnectés).
    - **Le Web** : un service qui utilise Internet (souvent via HTTP/HTTPS).

---

## Anecdote : IPv4 vs IPv6 😵‍💫

- Une adresse **IPv4** est codée sur **32 bits**, donc il existe **\(2^{32}\)** adresses possibles (en théorie), soit **4 294 967 296**.
- Une adresse **IPv6** est codée sur **128 bits**, donc il existe **\(2^{128}\)** adresses possibles, soit environ **\(3{,}4\times 10^{38}\)**.

Pour donner un ordre d'idée :
- La surface de la Terre est d'environ **\(510\) millions de km²**, soit **\(5{,}1\times 10^{14}\)** m².
- Cela ferait environ **\(\frac{2^{128}}{5{,}1\times 10^{14}} \approx 6{,}7\times 10^{23}\)** adresses IPv6 **par m²** (en théorie) !

!!! tip "Pourquoi on en parle ?"
    Parce que ces adresses servent à **router** des données : sans adressage, impossible de savoir où livrer un message.

---

## Vocabulaire de base 📚

!!! definition "Réseau"
    Un **réseau** est un ensemble de machines reliées entre elles par des équipements informatiques, capables d'échanger des informations via des liaisons **filaires** (câble Ethernet, fibre optique, ...) ou **hertziennes** (Wi-Fi, Bluetooth, 4G/5G, ...).

!!! definition "Réseau local (LAN)"
    Un **réseau local** ou **LAN** (de l'anglais *Local Area Network*) est un réseau limité à une zone restreinte (maison, salle info, établissement...).
    Les machines peuvent y communiquer **même sans accès à Internet**.

!!! definition "Réseau étendu (WAN)"
    Un **réseau étendu** ou **WAN** (de l'anglais *Wide Area Network*) relie des réseaux sur une grande zone géographique (ville, pays, continent...).

!!! definition "Internet"
    **Internet** désigne le réseau informatique mondial : un **réseau de réseaux** basé sur des protocoles communs (dont IP).

---

## Ce qu'on va faire dans le chapitre 🧭

- Comprendre **comment un réseau est structuré** (LAN, routeur, switch, adressage)
- Voir pourquoi on découpe les données en **paquets** (et comment on les "emballe" par **encapsulation**)
- Dérouler un protocole simple de fiabilisation : **le bit alterné**
- Mettre tout ça en pratique avec un **TP fil rouge** (Filius)
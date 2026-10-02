---
title: Conclusion
weight: 5.5
---

# Conclusion 🏁

Internet est un **réseau de réseaux** qui relie des milliards d'appareils, par des câbles
ou par des ondes. Il ne dépend d'aucun réseau physique en particulier, car ses règles de
communication, les protocoles **TCP/IP**, sont installées dans chaque machine.

Pour voyager, un message est **découpé en paquets**. Chacun porte l'**adresse IP** de
l'expéditeur et du destinataire, et traverse des **routeurs** de proche en proche. **TCP**
numérote les morceaux, les remet dans l'ordre et redemande ceux qui se perdent : la
transmission est **fiable**, mais sans **garantie de durée**.

---

## Ai-je compris l'essentiel ? ✅

Pour chaque question, choisis l'unique bonne réponse, puis vérifie.

<div class="snt-outil" data-outil="qcm">
<script type="application/json">
[
 {"question": "Quel moyen de connexion à Internet ne nécessite pas de fil ?",
  "options": ["Câble Ethernet", "Fibre optique", "ADSL", "Wi-Fi"], "bonne": 3,
  "explication": "Le Wi-Fi utilise des ondes radio. Les trois autres sont des liaisons filaires."},
 {"question": "Quelle est la plus rapide de ces technologies ?",
  "options": ["Wi-Fi", "Bluetooth", "Fibre optique", "4G"], "bonne": 2,
  "explication": "La fibre optique atteint plusieurs Gbit/s."},
 {"question": "Combien de temps faut-il pour télécharger une photo de 10 Mo avec un débit de 80 Mbit/s ?",
  "options": ["1 seconde", "8 secondes", "1/8 de seconde", "10 secondes"], "bonne": 0,
  "explication": "10 Mo = 80 Mbit, et 80 ÷ 80 = 1 seconde."},
 {"question": "Quelle activité représente la plus grande part du trafic sur Internet ?",
  "options": ["Les e-mails", "La vidéo", "Les jeux en ligne", "La navigation sur le Web"], "bonne": 1,
  "explication": "La vidéo représente plus de 80 % du trafic."},
 {"question": "Quel est le principe de la neutralité du Net ?",
  "options": ["Tous les pays garantissent l'accès à Internet à leur population.",
              "Les abonnés premium sont prioritaires.",
              "La vitesse dépend du type de données (vidéo, musique…).",
              "Les réseaux traitent toutes les données de la même façon, quelle que soit leur nature."], "bonne": 3,
  "explication": "Ni priorité, ni ralentissement selon le contenu, l'origine ou la destination."},
 {"question": "Sous quelle forme un fichier est-il envoyé sur Internet ?",
  "options": ["D'un seul bloc", "Découpé en petits paquets", "Toujours compressé", "En flux continu"], "bonne": 1,
  "explication": "Le fichier est découpé en paquets qui voyagent chacun de leur côté."},
 {"question": "À quoi sert une adresse IP ?",
  "options": ["À chiffrer les données", "À identifier une machine sur le réseau", "À mesurer le débit", "À nommer un site web"], "bonne": 1,
  "explication": "Comme une adresse postale, elle identifie une machine de façon unique."},
 {"question": "Quel est le rôle des routeurs ?",
  "options": ["Garantir que les paquets arrivent à l'heure", "Sécuriser les données",
              "Acheminer les paquets de proche en proche jusqu'au destinataire", "Numéroter les segments"], "bonne": 2,
  "explication": "Chaque routeur transmet le paquet à un voisin qui le rapproche du destinataire."},
 {"question": "Pourquoi les segments TCP sont-ils numérotés ?",
  "options": ["Pour les chiffrer", "Pour augmenter le débit",
              "Pour les remettre dans l'ordre et repérer ceux qui manquent", "Pour réduire leur taille"], "bonne": 2,
  "explication": "Les paquets peuvent arriver dans le désordre, ou se perdre : le numéro permet de s'en rendre compte."},
 {"question": "Que se passe-t-il si un segment TCP n'est pas reçu ?",
  "options": ["Le message est perdu", "Le dernier routeur prévient l'expéditeur",
              "Le destinataire demande qu'il soit renvoyé", "La transmission continue sans lui"], "bonne": 2,
  "explication": "C'est ce qui rend la transmission fiable."},
 {"question": "Quelle est la limite de l'ensemble TCP/IP ?",
  "options": ["Il n'assure pas de garantie temporelle", "Il n'assure pas la fiabilité",
              "Il ne transmet pas les gros fichiers", "Il ne fonctionne pas sans fil"], "bonne": 0,
  "explication": "Tout arrive, mais on ne sait pas quand : gênant pour une visioconférence."},
 {"question": "Lors d'une visioconférence, un paquet de son se perd. Quel effet ?",
  "options": ["Aucun", "La connexion est coupée", "La qualité de la communication se dégrade", "La qualité s'améliore"], "bonne": 2,
  "explication": "Un paquet renvoyé arrive trop tard : on entend une coupure ou un écho."}
]
</script>
</div>

---

## Compétences

À l'issue de ce chapitre, voici ce qu'il te faut savoir et savoir faire :

- [x] Caractériser quelques types de réseaux physiques : obsolètes ou actuels, rapides ou lents, filaires ou non.
- [x] Calculer une durée de téléchargement à partir d'un débit (et convertir octets et bits).
- [x] Caractériser l'ordre de grandeur du trafic de données sur Internet et son évolution.
- [x] Expliquer ce qu'est la neutralité du Net.
- [x] Distinguer le rôle des protocoles IP et TCP.
- [x] Caractériser les principes du routage et ses limites.
- [x] Distinguer la fiabilité de transmission et l'absence de garantie temporelle.

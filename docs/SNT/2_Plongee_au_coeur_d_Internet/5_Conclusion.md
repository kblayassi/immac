---
title: Conclusion
weight: 5.5
---

# Conclusion 🏁

Sur Internet, la plupart des échanges suivent le **modèle client-serveur** : un client
envoie une requête, un serveur lui répond. Pour tenir face à l'affluence, les serveurs sont
**dupliqués** ; saturés volontairement de requêtes, ils deviennent inaccessibles : c'est une
**attaque par déni de service**.

Pour trouver un serveur, il faut son adresse IP. Les **serveurs DNS** traduisent les **noms
de domaine**, faciles à retenir, en adresses IP.

Dans un réseau **pair-à-pair**, chaque ordinateur est à la fois client et serveur : les
fichiers circulent plus vite et sans serveur central. Le pair-à-pair est légal ; télécharger
une œuvre sans l'accord de son propriétaire ne l'est pas.

---

## Ai-je compris l'essentiel ? ✅

Pour chaque question, choisis l'unique bonne réponse, puis vérifie.

<div class="snt-outil" data-outil="qcm">
<script type="application/json">
[
 {"question": "Qu'appelle-t-on un « serveur » ?",
  "options": ["Un routeur", "Un client", "Un smartphone", "Une machine qui stocke des données ou rend un service à d'autres machines"], "bonne": 3,
  "explication": "Le serveur fournit le service, le client l'utilise."},
 {"question": "Quel est le rôle principal d'un serveur dans le modèle client-serveur ?",
  "options": ["Gérer les connexions à Internet", "Agir comme un client", "Fournir des services aux clients", "Stocker uniquement des vidéos"], "bonne": 2,
  "explication": "Les clients envoient des requêtes, le serveur y répond."},
 {"question": "Qu'est-ce qui caractérise une attaque par déni de service ?",
  "options": ["Un utilisateur télécharge trop de fichiers", "Un serveur est arrêté pour maintenance",
              "Un site change d'adresse IP", "Un pirate surcharge un site de requêtes pour le rendre inaccessible"], "bonne": 3,
  "explication": "Des milliers de machines envoient des requêtes en même temps : le serveur sature."},
 {"question": "Comment un site très visité peut-il supporter un grand nombre de visiteurs en même temps ?",
  "options": ["En changeant de nom de domaine", "En dupliquant son serveur", "En passant en pair-à-pair", "En supprimant des pages"], "bonne": 1,
  "explication": "Des copies identiques du serveur se partagent les visiteurs."},
 {"question": "Quel est le rôle d'un serveur DNS ?",
  "options": ["Il gère les priorités entre les utilisateurs", "Il fait correspondre un nom de domaine à une adresse IP",
              "Il stocke tous les sites web", "Il attribue les adresses IP aux internautes"], "bonne": 1,
  "explication": "C'est le « répertoire » d'Internet."},
 {"question": "Dans l'adresse https://www.education.gouv.fr/bac, quel est le nom de domaine ?",
  "options": ["https", "education.gouv.fr", "/bac", "www"], "bonne": 1,
  "explication": "« https » est le protocole, « /bac » le chemin vers la page."},
 {"question": "Combien d'adresses IP peuvent correspondre à un même nom de domaine ?",
  "options": ["Une seule", "Deux", "Pas plus de deux", "Autant que nécessaire"], "bonne": 3,
  "explication": "Un site très visité a de nombreux serveurs, donc de nombreuses adresses IP."},
 {"question": "Combien de noms de domaine peuvent correspondre à une même adresse IP ?",
  "options": ["Un seul", "Deux", "Pas plus de deux", "Autant que nécessaire"], "bonne": 3,
  "explication": "Un même serveur peut héberger de nombreux sites."},
 {"question": "Quel est le principe du modèle pair-à-pair ?",
  "options": ["Les ordinateurs ne peuvent pas échanger de données", "Un seul ordinateur gère tout le réseau",
              "Chaque ordinateur est à la fois client et serveur", "Tous les ordinateurs sont uniquement des serveurs"], "bonne": 2,
  "explication": "Chaque pair reçoit des données et en fournit aux autres."},
 {"question": "Quel est le principal avantage du pair-à-pair pour partager un fichier très demandé ?",
  "options": ["Il augmente la sécurité des données", "Il garantit l'heure d'arrivée des données",
              "Il augmente la vitesse de la connexion à Internet", "Il accélère le téléchargement, car chaque pair partage ce qu'il a reçu"], "bonne": 3,
  "explication": "Plus il y a de pairs, plus il y a d'envoyeurs."},
 {"question": "Quel est un usage légal d'un logiciel de pair-à-pair ?",
  "options": ["Télécharger un film protégé par le droit d'auteur", "Partager des fichiers avec l'accord de leurs propriétaires",
              "Utiliser des fichiers sans autorisation", "Revendre des fichiers téléchargés"], "bonne": 1,
  "explication": "Le logiciel est légal ; c'est le contenu partagé qui compte."},
 {"question": "Quel est l'effet du téléchargement illégal sur les créateurs ?",
  "options": ["Aucun", "Il leur rapporte des revenus publicitaires", "Il nuit à leur rémunération", "Il augmente leurs revenus"], "bonne": 2,
  "explication": "Une œuvre téléchargée illégalement ne rapporte rien à ceux qui l'ont créée."}
]
</script>
</div>

---

## Compétences

À l'issue de ce chapitre, voici ce qu'il te faut savoir et savoir faire :

- [x] Distinguer le rôle d'un client et d'un serveur.
- [x] Expliquer l'intérêt de dupliquer un serveur et ce qu'est une attaque par déni de service.
- [x] Sur des exemples réels, retrouver une adresse IP à partir d'une adresse symbolique et inversement.
- [x] Expliquer le rôle d'un serveur DNS.
- [x] Décrire l'intérêt des réseaux pair-à-pair ainsi que les usages illicites qu'on peut en faire.
- [x] Distinguer un téléchargement légal d'un téléchargement illégal, et en connaître les conséquences.

---

## Pour réviser tout le thème 🎬

Cette vidéo reprend l'essentiel des deux chapitres : les adresses IP, le DNS, le découpage
en paquets et le protocole TCP.

<figure class="snt-video">
  <video controls preload="metadata" src="../../../files/SNT/Internet/videos/hotline-internet-ip-protocole-universel.mp4"></video>
  <figcaption>« Allô la Hotline : Internet, IP un protocole universel ? », MOOC SNT, Class'Code (licence CC BY).</figcaption>
</figure>

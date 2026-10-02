---
title: Cours de SNT
---

# Prompt de relance — les cours de SNT

Jumeau de [prompt-de-relance.md](prompt-de-relance.md), pour les **chapitres de cours de SNT**
(Seconde). La première partie se colle telle quelle au début d'une session ; le reste est la
fiche de référence : les consignes données, ce qui est déjà fait, et comment le refaire.

Les parcours interactifs de SNT (Python, Web) ont leur propre fiche :
[parcours-interactifs.md](parcours-interactifs.md).

---

## 1 · À coller au début d'une session

> Je travaille sur les **cours de SNT** de mon site (dépôt `kblayassi/immac`, MkDocs Material,
> publié par CI sur `main`).
>
> Avant de proposer quoi que ce soit, lis `docs/.Ressources/CoursSNT.md` : il contient les
> consignes, la structure d'un chapitre, les outils déjà écrits et les pièges rencontrés.
>
> Aujourd'hui, je voudrais : **……**
>
> Points de méthode :
>
> - un chapitre tient en **3 h au plus** (deux séances d'1 h 30) ;
> - **ludique, interactif, pas trop technique** : on teste, on observe, puis on retient ;
> - la forme reprend celle des cours de NSI (admonitions, exercices à étoiles, conclusion) ;
> - chaque chapitre a son **diaporama HTML**, lié depuis l'introduction **en version prof seulement** ;
> - je valide **chapitre par chapitre** : le premier complet, puis le suivant sur le même modèle ;
> - termine par les deux `mkdocs build` (élève et prof), sans erreur ;
> - ne commite et ne pousse que si je te le demande.

---

## 2 · Les consignes de Kévin

### Sur le fond

- **Deux chapitres de 3 h maximum** par thème quand le manuel le découpe ainsi (thème Internet).
- **Ludique, interactif, pas trop technique.** Chaque notion passe par une activité (souvent à
  plusieurs, parfois sans ordinateur) ou un outil interactif avant d'être formalisée.
- **Pas de notion citée avant d'être vue.** Une frise historique placée en tête de chapitre a été
  retirée parce qu'elle parlait de paquets, de TCP/IP et d'IPv4 avant le cours.
- **Les « À retenir » replacent le vocabulaire** (filaire, hertzien, réseau physique…) au lieu de
  le paraphraser.
- **Conversions en base 1 024** : 1 octet = 8 bits, 1 Ko = 1 024 octets, 1 Mo = 1 024 Ko,
  1 Go = 1 024 Mo. La méthode se présente comme un tableau pratique, sans les préfixes généraux.
- **Exemples tangibles** : « 100 Mo, c'est une vingtaine de chansons en MP3 ».
- **Sites de référence choisis par Kévin** : `my-ip-finder.fr` pour le DNS et la géolocalisation
  d'adresses IP (pas `ipinfo.io`).
- **TP en terminal Windows** sur les postes du lycée (`ping`, `nslookup`, `tracert`), avec un
  affichage de secours dans la page si la commande est bloquée.

### Sur la forme

- **Corrections masquées côté élève**, comme en NSI ; les **« À retenir » restent visibles**.
- **Vidéos intégrées** dans la page et le diaporama (fichier local), jamais un simple lien.
  Une vidéo qui aborde le chapitre suivant (« Allô la Hotline » parle du DNS) va dans ce
  chapitre-là, à la toute fin.
- **Consignes complètes sur le diaporama** : les élèves n'ont pas forcément la page du site sous
  les yeux. Une activité trop dense prend deux diapos (mise en place, puis questions).
- **Activités débranchées concrètes** : rôles, matériel, règle du jeu, manches. Exemple de la
  version retenue pour les cartes postales : pierre-feuille-ciseaux à chaque centre de tri.
- **Une diapo « Les exercices » avant le QCM** de fin de chapitre.
- **Chronomètre facultatif** sur les diapos d'activité longues (il ne démarre qu'au clic).
- Un TP utile au fil du cours y est intégré **comme activité** (le `ping` au chapitre 1) ; un
  TP plus long devient un **exercice sur ordinateur** (`tracert`).
- Diaporamas : voir aussi la mémoire « diaporamas de cours » — look du site, « À retenir »
  **remplis** sur une seule diapo, une diapo d'appel « À vous de jouer ! » par activité.

---

## 3 · La structure du site

### Numérotation des dossiers

Tous les chapitres sont au même niveau sous `docs/SNT/`, sans dossier « thème » :

| Dossier | Chapitre |
|---|---|
| `0_Python/` | le parcours Python (lien vers l'application) |
| `1_A_la_decouverte_d_Internet/` | Internet, chapitre 1 |
| `2_Plongee_au_coeur_d_Internet/` | Internet, chapitre 2 |
| `3_Le_Web/` | le Web (parcours, playgrounds, TP crêpes) |

Les chapitres suivants prendront les numéros 4 et plus. Le menu affiche le nom du dossier
(« 1 A la decouverte d Internet ») : pas d'accent dans les noms de dossier.

### Les pages d'un chapitre

| Fichier | `weight` | Contenu |
|---|---|---|
| `index.md` | 1 | Introduction : « Le saviez-vous ? », plan, accroche ; **bloc prof** avec le déroulé des séances et le bouton du diaporama |
| `1_….md`, `2_….md`… | 1, 2, 3… | Les pages de cours, chacune avec ses activités |
| `4_Conclusion.md` (ou `5_`) | 5.5 | Synthèse, QCM auto-corrigé, compétences du programme |
| `Exercices.md` | 6 | Exercices classés par étoiles, corrections masquées côté élève |
| `diaporama.html` | — | Généré, à ne pas modifier à la main |

Le bloc prof de l'introduction :

```markdown
{% if config.extra.version == "prof" %}
!!! note "Pour le professeur"
    Chapitre prévu en **deux séances d'1 h 30** : …

    [Ouvrir le diaporama du chapitre :fontawesome-solid-person-chalkboard:](diaporama.html){ .md-button target="_blank" }
{% endif %}
```

### Les conventions de rédaction

- **Activités** : `!!! example "Activité n - Titre"`, numérotées à la main, de 1 à n dans chaque
  chapitre. Leur correction est un `??? success "Correction"` imbriqué (retiré côté élève).
- **Exercices** : `!!! exopapier` ou `!!! exoordi`, titre commençant par les étoiles
  (`:fontawesome-solid-star:` pleines, `:fontawesome-regular-star:` vides). **Ne pas écrire
  « Exercice n »** : le hook `exo_numbering.py` numérote.
- **Cours** : `definition`, `info "À retenir !"`, `methode`, `warning`, `histoire`.
- **Schémas** : `![texte alternatif](../../files/SNT/Internet/nom.svg){ .snt-schema }` — fond
  blanc arrondi, lisible en thème sombre.
- **Vidéos** (HTML brut, donc chemin relatif à l'URL de la page, un niveau de plus) :

    ```html
    <figure class="snt-video">
      <video controls preload="metadata" src="../../../files/SNT/Internet/videos/nom.mp4"></video>
      <figcaption>Titre, source.</figcaption>
    </figure>
    ```

---

## 4 · Les outils

### Les outils interactifs

`docs/javascripts/snt-internet.js` et `docs/stylesheets/snt-internet.css`, chargés sur tout le
site par `mkdocs.yml`. Un outil se déclare dans la page par un conteneur vide :

```html
<div class="snt-outil" data-outil="routage"></div>
```

| `data-outil` | Chapitre | Ce qu'il fait |
|---|---|---|
| `debit` | 1 | Course au téléchargement : 6 réseaux, 4 fichiers, vitesse ×1 à ×100 000, calcul détaillé |
| `routage` | 1 | Jeu du routeur : pannes, liens coupés, chemins aléatoires, culs-de-sac, TTL (10 au départ) |
| `tcp` | 1 | Message en segments mélangés, un perdu à redemander |
| `charge` | 2 | Billetterie : visiteurs, serveurs dupliqués (500 visiteurs chacun), attaque DDoS |
| `dns` | 2 | Résolution DNS pas à pas, mémoire du serveur, faute de frappe, option « coulisses » |
| `p2p` | 2 | Distribution d'une mise à jour : client-serveur ou pair-à-pair, 6/12/24 ordinateurs, panne du serveur |
| `qcm` | 1 et 2 | QCM auto-corrigé ; les questions en JSON dans un `<script type="application/json">` |

Un QCM :

```html
<div class="snt-outil" data-outil="qcm">
<script type="application/json">
[
 {"question": "…", "options": ["…", "…"], "bonne": 0, "explication": "…"}
]
</script>
</div>
```

Un outil fonctionne aussi **dans une admonition** (indenté de 4 espaces) et **dans un
diaporama** (voir plus bas).

### Les schémas

Générés en SVG par `tools/schemas/snt_internet.py` (chapitre 1) et `tools/schemas/snt_internet_2.py`
(chapitre 2, importé par le premier) :

```
python3 tools/schemas/snt_internet.py
```

### Les diaporamas

Le moteur `tools/diaporamas/diaporama.py` produit un fichier HTML autonome (1 920 × 1 080, flèches
ou clic pour naviguer, `F` pour le plein écran, le numéro de diapo gardé dans l'adresse). Un
script de contenu par chapitre :

```
python3 tools/diaporamas/snt_internet_1.py
python3 tools/diaporamas/snt_internet_2.py
```

Briques disponibles : `couverture`, `partie`, `contenu`, `retenir`, `outil` (démonstration en
direct d'un outil du site), et les blocs `Deck.encadre`, `Deck.appel` (diapo « À vous de
jouer ! »), `Deck.cartes`, `Deck.chrono(minutes)`, `Deck.video(src, légende)`.

### La version élève

`plugins/version_eleve.py` :

- retire les `??? success` des chapitres listés dans `SECTIONS_CORRECTIONS` (en gardant les
  « À retenir ») — **ajouter chaque nouveau dossier de chapitre SNT à cette liste** ;
- supprime tout fichier `diaporama*.html` du site élève.

---

## 5 · Ce qui est fait

### Thème Internet — chapitre 1 « À la découverte d'Internet »

Sources : manuel Bordas (scan), ancien cours Keynote, TD1-2-3, TP DNS, exercices et DS de Kévin,
programme officiel.

| Page | Contenu |
|---|---|
| Introduction | « 1 h 45 pour 100 Mo en 1999 », plan, enquête sur les objets connectés |
| Internet et les réseaux physiques | Activité 1 *Dessine-moi Internet* (chrono 10 min sur la diapo), vidéo INA 1996, réseau de réseaux, Internet ≠ Web, filaire / sans fil, tableau des débits, méthode de conversion, outil `debit`, Activité 2 *Les appareils de Chloé* |
| Le trafic sur Internet | Activité 3 (graphique 2017-2022, France 2009/2019), neutralité du Net, Activité 4 débat *Internet à plusieurs vitesses* |
| Comment voyagent les données ? | Activité 5 *Cartes postales* (pierre-feuille-ciseaux, deux manches), adresse IP, paquets, Activité 6 *Jeu du routeur*, TTL, TCP et outil `tcp`, fiabilité sans garantie temporelle, Activité 7 TP `ping` |
| Conclusion | Synthèse, QCM de 12 questions, 7 compétences |
| Exercices | 12 exercices (débits, trafic, chemins, en-têtes, nombre de paquets, `tracert` en n°10, IPv6, site inaccessible) |

Diaporama : 39 diapos.

### Thème Internet — chapitre 2 « Plongée au cœur d'Internet »

| Page | Contenu |
|---|---|
| Introduction | 100 000 recherches Google par seconde ; l'affirmation de Nejma sur les DNS, fil rouge du chapitre |
| Clients et serveurs | Activité 1 *Qui sert qui ?*, client / serveur / requête, Activité 2 *Billetterie du concert* (outil `charge`), DDoS et article 323-2 du Code pénal |
| Les noms de domaine et le DNS | Activité 3 *Hugo et Théo*, anatomie d'une URL, extensions, DNS, Activité 4 (outil `dns`), Activité 5 TP `nslookup` et `my-ip-finder.fr`, réponse à Nejma |
| Le pair-à-pair | Activité 6 *Mise à jour du jeu* (outil `p2p`), définition, usages (mises à jour, Bitcoin, Décrypthon) |
| Télécharger : légal ou illégal ? | Droit d'auteur, Activité 7 en QCM (6 situations), Arcom 2023, rémunération du streaming, Activité 8 débat *Dans la peau de…* (chrono 15 min) |
| Conclusion | Synthèse, QCM de 12 questions, 6 compétences, **vidéo « Allô la Hotline »** pour réviser tout le thème |
| Exercices | 14 exercices (JO, débit partagé en Python, extensions, URL, adresses IP réelles, site du lycée, faute de frappe, requête DNS du DS, DNS empoisonné, logiciel gratuit, légal ou non, mises à jour, Bitcoin, calcul partagé) |

Diaporama : 37 diapos.

### Les durées vérifiées par simulation (outil `p2p`)

| Ordinateurs | Client-serveur | Pair-à-pair |
|---|---|---|
| 6 | 24 tours | ≈ 8 tours |
| 12 | 48 tours | ≈ 10 tours |
| 24 | 96 tours | ≈ 12 tours |

En pair-à-pair, le serveur diffuse d'abord le morceau le plus rare : après 4 tours, les 8 morceaux
existent chez les élèves, et une panne du serveur n'arrête plus la distribution.

---

## 6 · Pièges déjà rencontrés

- **Chemins relatifs** : une image en Markdown se résout depuis le fichier `.md`
  (`../../files/…`) ; une balise HTML brute (`<video>`) depuis l'URL de la page, un niveau plus
  bas (`../../../files/…`).
- **Vidéos** : `preload="none"` donne une vidéo sans dimensions, affichée en colonne étroite ;
  utiliser `preload="metadata"`. La compression par `avconvert` (macOS) ne descend qu'à
  568 × 320, trop flou pour projeter : les fichiers d'origine sont gardés (≈ 85 Mo au total).
- **Outils dans un diaporama** : vérifier qu'ils ne débordent pas de la diapo ; les réglages
  propres aux diapos sont dans le CSS de `diaporama.py` (`.diapo .snt-outil[data-outil=…]`).
- **Pas de poppler sur la machine** : les PDF se rendent avec un petit binaire Swift/PDFKit ;
  un scan se lit en extrayant ses images avec `pypdf`.
- **Simulations aléatoires** : calibrer les probabilités par une simulation hors navigateur
  avant d'écrire une correction chiffrée (routage : 80 % vers le meilleur voisin, environ 5 %
  de paquets détruits en réseau sain).

---

## 7 · Ce qui reste à faire

Les cinq autres thèmes du programme de SNT : réseaux sociaux, données structurées, localisation
et cartographie, informatique embarquée et objets connectés, photographie numérique. Le Web
(chapitre 3) a son parcours interactif et ses playgrounds, mais pas encore de pages de cours ni
de diaporama sur le modèle d'Internet.

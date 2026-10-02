"""Diaporama — SNT, thème Internet, chapitre 1 « À la découverte d'Internet ».

    python3 tools/diaporamas/snt_internet_1.py

Le contenu suit les pages du site (docs/SNT/1_A_la_decouverte_d_Internet/),
« À retenir » remplis, une diapo d'appel par activité. Les consignes des activités sont
complètes : les élèves n'ont pas toujours la page du site sous les yeux.
"""
from pathlib import Path
from diaporama import Deck

RACINE = Path(__file__).resolve().parents[2]
SORTIE = RACINE / "docs/SNT/1_A_la_decouverte_d_Internet/diaporama.html"
IMG = "../../files/SNT/Internet/"

d = Deck("Diaporama — À la découverte d'Internet", "SNT · Internet · Chapitre 1 — À la découverte d'Internet")
E = Deck.encadre

# ------------------------------------------------------------------ Ouverture
d.couverture("SNT · Thème Internet · Chapitre 1", "À la découverte<br>d'Internet 🔌",
             "Des câbles, des ondes, des paquets… et des règles communes à des milliards de machines")

d.contenu("Introduction", "Au programme 🧭", Deck.cartes([
    ("1 · Internet 🧩", "<p>Un réseau de réseaux : de quoi est-il fait ?</p>"),
    ("2 · Les réseaux physiques 📡", "<p>Câbles, ondes et <b>débit</b>.</p>"),
    ("3 · Le trafic 📈", "<p>L'explosion des échanges et la <b>neutralité du Net</b>.</p>"),
    ("4 · Le voyage des données 📦", "<p>Adresses IP, paquets, routeurs, <b>TCP/IP</b>.</p>"),
]) + E("histoire", "Le saviez-vous ?",
       "<p>En 1999, avec l'ADSL à 128 kbit/s, il fallait <b>1 h 45</b> pour télécharger 100 Mo, "
       "c'est-à-dire <b>une vingtaine de chansons en MP3</b>. Avec la fibre, <b>moins d'une seconde</b> suffit.</p>"))

d.contenu("Activité 1", "Dessine-moi Internet ✏️", Deck.chrono(10) + Deck.appel(
    "Seul, sur une feuille, sans regarder la suite",
    "Représente Internet tel que tu l'imagines : ce qu'il y a dedans, comment les choses sont reliées, où vont tes messages.",
    [("Consigne 📌", "<ul><li>10 minutes</li><li>pas de bonne ou de mauvaise réponse</li><li>on compare ensuite les dessins</li></ul>"),
     ("Pour t'aider 💭", "<ul><li>Que se passe-t-il quand tu envoies un message ?</li><li>Où est stockée une vidéo YouTube ?</li></ul>")]),
    notes="Le chronomètre est facultatif : il ne démarre qu'au clic. Ramasser ou photographier quelques "
          "dessins pour les comparer au schéma de la diapo 6.")

d.contenu("Archive INA · 1996", "« C'est quoi Internet ? » 📺",
          Deck.video(IMG + "videos/ina-1996-c-est-quoi-internet.mp4",
                     "En 1996, presque personne n'a encore accès à Internet. Note ce qui a changé… et ce qui n'a pas changé."))

# ------------------------------------------------------------------ Partie 1
d.partie("1", "Internet, un réseau de réseaux 🧩", "Ce qu'il y a vraiment derrière ton écran")

d.contenu("Partie 1 · Internet", "Compare avec ton dessin 👀",
          f'<img class="schema" src="{IMG}reseau-de-reseaux.svg" alt="Internet relie des réseaux locaux par des routeurs">')

d.contenu("Partie 1 · Internet", "Définition : Internet",
          E("definition", "Définition : Internet",
            "<p><b>Internet</b> est un <b>réseau de réseaux</b> : il relie entre eux, à l'échelle mondiale, "
            "des millions de réseaux plus petits (maison, lycée, entreprise…) et permet à des milliards "
            "d'appareils de <b>communiquer</b>.</p>")
          + E("attention", "Internet ≠ Web",
              "<p><b>Internet</b> est le réseau qui transporte les données. Le <b>Web</b> n'est qu'<b>un des services</b> "
              "qui l'utilisent, comme la messagerie, les jeux en ligne ou la visioconférence.</p>"))

d.retenir("<em>Internet</em> est un réseau de réseaux, à l'échelle mondiale.",
          "<ul><li>Un <b>réseau</b> est un ensemble de machines reliées entre elles pour <b>échanger des informations</b>.</li>"
          "<li>Internet transporte des informations <b>de toute nature</b> : texte, image, son, vidéo.</li>"
          "<li>C'est pour cela qu'il a remplacé peu à peu le courrier, le fax et bientôt le téléphone fixe.</li></ul>")

# ------------------------------------------------------------------ Partie 2
d.partie("2", "Les réseaux physiques 📡", "Des câbles, des ondes… et un débit")

d.contenu("Partie 2 · Réseaux physiques", "Filaire ou sans fil ?", Deck.cartes([
    ("🔌 Liaison filaire", "<p>L'information voyage dans un <b>câble</b> :</p><ul><li>signal électrique dans du cuivre (ADSL, Ethernet)</li>"
                          "<li><b>lumière</b> dans un fil de verre (fibre optique)</li></ul>"),
    ("📶 Liaison sans fil", "<p>L'information voyage par des <b>ondes radio</b> : on parle aussi de liaison <b>hertzienne</b>.</p>"
                           "<ul><li>Wi-Fi, Bluetooth</li><li>4G, 5G</li><li>satellite</li></ul>"),
]))

d.contenu("Partie 2 · Réseaux physiques", "Qui va le plus vite ? 🏎️",
          "<table><tr><th>Réseau</th><th>Filaire ?</th><th>Débit (ordre de grandeur)</th><th>Usage</th></tr>"
          "<tr><td>Modem 56k</td><td>oui</td><td>56 kbit/s</td><td>obsolète</td></tr>"
          "<tr><td>Bluetooth</td><td>non</td><td>2 Mbit/s</td><td>casque, montre</td></tr>"
          "<tr><td>ADSL</td><td>oui</td><td>10 à 50 Mbit/s</td><td>box, en voie de disparition</td></tr>"
          "<tr><td>4G</td><td>non</td><td>100 Mbit/s</td><td>smartphone</td></tr>"
          "<tr><td>Wi-Fi</td><td>non</td><td>100 Mbit/s à 1 Gbit/s</td><td>autour de la box</td></tr>"
          "<tr><td>Ethernet (RJ45)</td><td>oui</td><td>100 Mbit/s à 1 Gbit/s</td><td>ordinateur fixe, console</td></tr>"
          "<tr><td>5G</td><td>non</td><td>1 Gbit/s</td><td>smartphone</td></tr>"
          "<tr><td>Fibre optique</td><td>oui</td><td>1 à 8 Gbit/s</td><td>box, liaisons entre pays</td></tr></table>")

d.retenir("Câbles ou ondes : le <em>vocabulaire</em> des réseaux physiques.",
          "<ul><li>Le <b>réseau physique</b> est le support qui transporte l'information entre deux machines.</li>"
          "<li>Une <b>liaison filaire</b> utilise un <b>câble</b> : cuivre (ADSL, Ethernet) ou fibre optique.</li>"
          "<li>Une <b>liaison sans fil</b>, ou <b>liaison hertzienne</b>, utilise des <b>ondes radio</b> : Wi-Fi, Bluetooth, 4G, 5G, satellite.</li>"
          "<li>Internet <b>ne dépend pas</b> d'un réseau physique particulier : ses règles sont des <b>logiciels</b>, installés dans "
          "chaque machine. Ton téléphone passe de la 4G au Wi-Fi sans couper ta vidéo.</li></ul>")

d.contenu("Partie 2 · Le débit", "Le débit 🚀",
          '<div class="deux">'
          + E("definition", "Définition : Débit",
              "<p>Le <b>débit</b> est la quantité d'informations transmise <b>par seconde</b> :</p>"
              '<p style="font-size:48px;text-align:center"><i>d</i> = <i>q</i> ÷ Δ<i>t</i></p>'
              "<ul><li><i>d</i> : le débit, en bits par seconde (kbit/s, Mbit/s, Gbit/s) ;</li>"
              "<li><i>q</i> : la <b>quantité de données</b> transférée, en bits ;</li>"
              "<li>Δ<i>t</i> : la <b>durée</b> du transfert, en secondes.</li></ul>")
          + E("methode", "Méthode : calculer une durée",
              "<p><b>1 octet = 8 bits</b> · 1 Ko = 1 024 octets · 1 Mo = 1 024 Ko · 1 Go = 1 024 Mo</p>"
              "<p>Film de <b>2 Go</b>, connexion à <b>100 Mbit/s</b> :</p>"
              "<ol><li>en Mo : 2 × 1 024 = 2 048 Mo</li><li>en Mbit : 2 048 × 8 = 16 384 Mbit</li>"
              "<li>Δt = 16 384 ÷ 100 ≈ <b>164 s</b>, soit 2 min 44 s</li></ol>")
          + "</div>")

d.outil("Partie 2 · Le débit", "La course au téléchargement 🏁", "debit")

d.contenu("Activité 2", "Les appareils de Chloé 🎧", Deck.appel(
    "Chloé écoute de la musique en streaming avec son casque Bluetooth.",
    "Elle se demande comment chacun de ses appareils est relié à Internet. Réponds sur ton cahier.",
    [("1. Quel réseau physique ? 📌", "<p>Parmi : câble Ethernet, Wi-Fi, 4G/5G, Bluetooth.</p>"
                                     "<ol type=\"a\"><li>Son smartphone chez elle, puis sur le chemin du lycée.</li>"
                                     "<li>Sa console de jeux, branchée à la box.</li>"
                                     "<li>Son ordinateur portable chez elle, puis chez une copine.</li>"
                                     "<li>Sa montre connectée, reliée à son smartphone.</li></ol>"),
     ("2. à 4. 💡", "<ol start=\"2\"><li>Chacun de ces réseaux est-il filaire ou sans fil ?</li>"
                   "<li>Avec le tableau : quel réseau utilisé aujourd'hui est le plus lent ? le plus rapide ? Lequel est devenu obsolète ?</li>"
                   "<li>Le Bluetooth est bien plus lent que le Wi-Fi. Pourquoi le fabricant du casque l'a-t-il choisi ?</li></ol>")]),
    notes="Réponse attendue à la question 4 : le Bluetooth consomme très peu d'énergie, idéal sur batterie.")

# ------------------------------------------------------------------ Partie 3
d.partie("3", "Le trafic sur Internet 📈", "Toujours plus de données… surtout de la vidéo")

d.contenu("Activité 3", "Comment a évolué le trafic ?",
          f'<div class="deux"><img class="schema" src="{IMG}trafic.svg" alt="Trafic mensuel mondial de 2017 à 2022">'
          "<div style=\"display:grid;gap:22px\">"
          "<table><tr><th>En France</th><th>2009</th><th>2019</th></tr>"
          "<tr><td>Nombre d'internautes</td><td>30 millions</td><td>57 millions</td></tr>"
          "<tr><td>Part ayant un smartphone</td><td>12 %</td><td>81 %</td></tr>"
          "<tr><td>Temps sur Internet par jour</td><td>1 h 30</td><td>4 h 48</td></tr></table>"
          "<ol style=\"font-size:27px\"><li>Décris l'évolution du trafic mensuel entre 2017 et 2022. Par combien a-t-il été multiplié ?</li>"
          "<li>Quelle activité est responsable de la plus grande part du trafic ?</li>"
          "<li>Comment expliquer que le temps passé sur Internet ait été multiplié par trois en dix ans ?</li>"
          "<li>La 5G multiplie environ par dix le débit des smartphones. Que peut-on prévoir pour le trafic ?</li></ol></div></div>")

d.retenir("Le trafic <em>explose</em>, et c'est surtout de la vidéo.",
          "<ul><li>Multiplié par plus de <b>3</b> en cinq ans : des <b>milliards de milliards d'octets</b> chaque mois.</li>"
          "<li>La <b>vidéo</b> (streaming, réseaux sociaux, visio) représente <b>plus de 80 %</b> du trafic.</li></ul>")

d.contenu("Partie 3 · Neutralité du Net", "Tous les paquets sont égaux ⚖️",
          "<p>Sur Internet, rien ne distingue à première vue un paquet de vidéo d'un paquet de musique ou d'un e-mail.</p>"
          + E("definition", "Définition : Neutralité du Net",
              "<p>Les fournisseurs d'accès doivent traiter <b>toutes les données de la même manière</b>, quels que soient "
              "leur contenu, leur origine ou leur destination : ni ralentissement, ni priorité, ni supplément payant.</p>")
          + "<p>Principe fondateur d'Internet, protégé en Europe depuis 2015… mais régulièrement remis en cause.</p>")

d.contenu("Activité 4", "Débat : un Internet à plusieurs vitesses ? 🗣️", Deck.appel(
    "Un opérateur propose deux forfaits…",
    "<b>Essentiel</b> à 10 € : Web, e-mails et réseaux sociaux à pleine vitesse, vidéos limitées en basse qualité. "
    "<b>Premium</b> à 25 € : tout à pleine vitesse, et tes plateformes de streaming favorites en priorité.",
    [("Pour réfléchir 💭", "<ol><li>Pourquoi un fournisseur d'accès voudrait-il abandonner la neutralité du Net ?</li>"
                          "<li>Qui seraient les gagnants et les perdants : les utilisateurs ? les grandes plateformes ? les petits sites qui débutent ?</li></ol>"),
     ("Le débat 🎤", "<ol start=\"3\"><li>Est-ce que cela changerait tes habitudes ?</li></ol><p>Chacun prend position, argumente, puis on confronte les avis.</p>")]))

# ------------------------------------------------------------------ Partie 4
d.partie("4", "Comment voyagent les données ? 📦", "Adresses, paquets, routeurs… et TCP/IP")

d.contenu("Activité 5 · sans ordinateur", "Le message en cartes postales ✉️",
          '<div class="deux">'
          f'<img class="schema" src="{IMG}plan-cartes-postales.svg" alt="Le réseau postal de la classe">'
          + Deck.cartes([("Mise en place 🎭",
                          "<ul><li><b>Aurore</b> coupe une phrase en 4 morceaux, un par carte, <b>sans numéros</b>.</li>"
                          "<li>6 élèves <b>centres de tri</b> A à F, placés comme sur le plan ; 1 élève <b>les parents</b>.</li>"
                          "<li>Les autres <b>observent</b> : chacun suit une carte et note son chemin.</li></ul>"),
                         ("La règle ✊✋✌️",
                          "<ul><li>Une carte suit toujours <b>les flèches</b>.</li>"
                          "<li>Deux flèches au départ d'une case : les deux destinataires jouent à <b>pierre-feuille-ciseaux</b>, "
                          "le gagnant prend la carte.</li><li>Aurore envoie ses 4 cartes à la suite, sans attendre.</li></ul>")], "orange")
          + "</div>",
          notes="Exemple de phrase : « Le chien du voisin » / « a poursuivi » / « le chat de ma tante » / "
                "« jusque dans le jardin. » Dans le désordre, le chat poursuit le chien…")

d.contenu("Activité 5 · sans ordinateur", "Deux manches, cinq questions ✉️", Deck.cartes([
    ("Manche 1", "<p>Cartes <b>sans numéros</b>. Les parents les posent dans l'ordre d'arrivée et lisent la phrase à voix haute. "
                 "Est-ce bien celle d'Aurore ?</p>"),
    ("Manche 2", "<p>Nouvelle phrase, cartes <b>numérotées</b> 1/4 à 4/4. Le professeur <b>confisque</b> une carte en route : "
                 "les parents demandent à Aurore de la <b>renvoyer</b>.</p>"),
    ("Questions ❓", "<ol><li>Manche 1 : la phrase est-elle arrivée intacte ? Pourquoi ?</li>"
                    "<li>Toutes les cartes ont-elles pris le même chemin ?</li>"
                    "<li>Manche 2 : qu'est-ce qui a permis de remettre les cartes dans l'ordre ?</li>"
                    "<li>Comment les parents ont-ils su qu'une carte manquait ?</li>"
                    "<li>Aurore pouvait-elle savoir <b>quand</b> ses cartes arriveraient ?</li></ol>"),
], "orange"), notes="Cartes = paquets, centres de tri = routeurs, pierre-feuille-ciseaux = choix du chemin au moment "
                    "où le paquet arrive, numéros et renvoi = TCP.")

d.contenu("Partie 4 · Adresse IP", "Chaque machine a une adresse 🏷️",
          E("definition", "Définition : Adresse IP",
            "<p>Une <b>adresse IP</b> est un numéro qui <b>identifie de façon unique</b> une machine connectée à un réseau.</p>")
          + "<table><tr><th>Version</th><th>Exemple</th><th>Nombre d'adresses</th></tr>"
            "<tr><td><b>IPv4</b></td><td><code>193.51.24.12</code><br>4 nombres de 0 à 255</td><td>≈ 4,3 milliards</td></tr>"
            "<tr><td><b>IPv6</b></td><td><code>2001:0db8:0000:85a3:0000:0000:ac1f:8001</code></td><td>≈ 3,4 × 10<sup>38</sup></td></tr></table>")

d.retenir("4,3 milliards d'adresses IPv4, <em>ce n'est pas assez</em>.",
          "<p>C'est moins que le nombre d'humains, et bien moins que le nombre d'objets connectés. "
          "Épuisées depuis 2019 en Europe, elles sont peu à peu remplacées par <b>IPv6</b>.</p>")

d.contenu("Partie 4 · Paquets", "Un fichier voyage en paquets 📦",
          "<p>Un fichier n'est jamais envoyé d'un bloc : il est <b>découpé en petits paquets</b>, qui voyagent chacun de leur côté.</p>"
          f'<img class="schema" src="{IMG}paquet.svg" alt="Un paquet : adresses IP, numéro, données">')

d.contenu("Partie 4 · Routage", "De routeur en routeur 🛣️",
          E("definition", "Définitions : Routeur et routage",
            "<ul><li>Un <b>routeur</b> relie plusieurs réseaux et fait passer les paquets de l'un à l'autre, "
            "<b>de proche en proche</b>. Ta box en contient un.</li>"
            "<li>Le <b>routage</b> est le mécanisme qui achemine un paquet de sa source à sa destination à travers les routeurs.</li></ul>")
          + "<p>Chaque routeur lit l'adresse IP de destination et confie le paquet à un voisin qui le rapproche du but. "
            "Le chemin <b>n'est pas fixé à l'avance</b>.</p>")

d.contenu("Activité 6", "Le jeu du routeur 🎮", Deck.appel(
    "Avec le simulateur de la diapo suivante, ou sur le site (page « Comment voyagent les données ? »)",
    "Le nombre affiché dans chaque paquet est son <b>TTL</b> : il diminue de 1 à chaque routeur.",
    [("Observer 👀", "<ol><li>Envoie plusieurs paquets un par un : prennent-ils le même chemin ?</li>"
                    "<li>R5 en panne, lien R1–R2 coupé : quel chemin reste possible ?</li>"
                    "<li>Quel est l'intérêt d'avoir plusieurs chemins ?</li></ol>"),
     ("Casser le réseau 🔧", "<ol start=\"4\"><li>Tout réparer, puis R3 en panne : où les paquets font-ils demi-tour ?</li>"
                           "<li>R6 en panne aussi : que deviennent les paquets ? Regarde leur TTL.</li>"
                           "<li>R1 en panne : que se passe-t-il ?</li></ol>")]))

d.outil("Activité 6", "Le jeu du routeur 🎮", "routage")

d.contenu("Partie 4 · Routage", "Et le TTL ? ⏳",
          E("definition", "Définition : TTL (Time To Live, « reste à vivre »)",
            "<p>Chaque paquet porte un compteur, souvent fixé à 64 au départ, qui <b>diminue de 1 à chaque routeur</b>. "
            "Quand il atteint 0, le routeur <b>détruit</b> le paquet.</p>")
          + "<p class=\"grand\">Pourquoi ? Pour qu'un paquet perdu, qui tournerait en rond entre des routeurs, "
            "n'encombre pas le réseau indéfiniment.</p>")

d.retenir("Le protocole <em>IP</em> adresse et achemine les paquets.",
          "<ul><li>Il fixe les règles pour acheminer les paquets de routeur en routeur jusqu'au destinataire.</li>"
          "<li>Mais il ne garantit rien : un paquet peut <b>se perdre</b>, et les paquets peuvent <b>arriver dans le désordre</b>.</li></ul>")

d.contenu("Partie 4 · TCP", "TCP remet de l'ordre 🧩",
          f'<div class="deux"><img class="schema" src="{IMG}tcp-renvoi.svg" alt="TCP redemande le segment perdu">'
          "<div style=\"display:grid;gap:24px\"><p>Avant l'envoi, <b>TCP</b> découpe les données en <b>segments numérotés</b>. "
          "À l'arrivée, il les <b>remet dans l'ordre</b> et <b>redemande</b> ceux qui manquent.</p>"
          + E("definition", "Définition : Protocole",
              "<p>Un <b>protocole</b> est un ensemble de <b>règles communes</b> que les machines respectent pour communiquer, "
              "comme une langue partagée.</p>") + "</div></div>")

d.outil("Partie 4 · TCP", "À toi de jouer le rôle de TCP 🧩", "tcp")

d.retenir("Ensemble, <em>TCP/IP</em> assurent la fiabilité de la transmission.",
          "<ul><li><b>IP</b> adresse et achemine les paquets, de routeur en routeur.</li>"
          "<li><b>TCP</b> numérote les segments, les remet dans l'ordre et fait renvoyer ceux qui se sont perdus.</li>"
          "<li>Tout le message finit par arriver, <b>complet et dans l'ordre</b>.</li></ul>")

d.contenu("Activité 7 · sur ordinateur", "Mesurer le voyage des paquets avec ping ⏱️", Deck.appel(
    "Dans le Terminal de Windows (touche Windows, tape cmd, puis Entrée)",
    "La commande <code>ping</code> envoie quelques petits paquets à une machine, qui répond à chacun : on mesure le temps d'un aller-retour.",
    [("Mesurer 📏", "<ol><li>Tape <code>ping qwant.fr</code>. Relève l'adresse IP, les paquets envoyés et reçus, leur taille, "
                   "les durées minimale, maximale et moyenne.</li>"
                   "<li>Recommence avec <code>ping www.govt.nz</code> (Nouvelle-Zélande) et compare.</li></ol>"),
     ("Conclure 💡", "<ol start=\"3\"><li>Relance deux fois <code>ping qwant.fr</code> : obtiens-tu les mêmes durées ? Quelle notion du cours cela illustre-t-il ?</li>"
                    "<li>Des paquets ont-ils été perdus ?</li></ol>")]),
    notes="Si ping est bloqué sur les postes, la page du site propose un affichage de secours à analyser.")

d.retenir("Fiable… mais <em>pas ponctuel</em>.",
          "<p>TCP/IP n'offre <b>pas de garantie temporelle</b> : on ne sait pas combien de temps mettra un paquet.</p>"
          "<ul><li>Pour un e-mail ou une page web : pas grave.</li>"
          "<li>Pour une <b>visioconférence</b> ou un <b>jeu en ligne</b> : image figée, son haché, « lag ».</li></ul>")

# ------------------------------------------------------------------ Bilan
d.contenu("Bilan", "Les exercices ✏️", Deck.appel(
    "Sur le site, page « Exercices »",
    "Douze exercices, du plus simple au plus difficile. La correction est vérifiée avec le professeur.",
    [("Réseaux et débit", "<ul><li>1 à 3 : choisir un réseau physique</li><li>4 et 5 : calculer une durée de téléchargement</li>"
                         "<li>6 : la consommation des vidéos</li></ul>"),
     ("TCP/IP", "<ul><li>7 à 9 : chemins, en-têtes, nombre de paquets</li><li>10 : <code>tracert</code> jusqu'en Nouvelle-Zélande (ordinateur)</li>"
                "<li>11 et 12 : IPv6 et un site inaccessible ★★★</li></ul>")]))

d.contenu("Bilan", "Ai-je compris l'essentiel ? ✅", Deck.appel(
    "Sur le site, page « Conclusion »",
    "Un QCM de 12 questions, corrigé automatiquement.",
    [("QCM ✅", "<ul><li>Une seule bonne réponse par question</li><li>Lis les explications de tes erreurs</li></ul>"),
     ("Et ensuite 🎯", "<ul><li>Relis les « À retenir » des notions ratées</li><li>Refais l'exercice correspondant</li></ul>")]))

d.contenu("Bilan", "Ce que tu dois savoir faire 🎯",
          "<ul>"
          "<li>Caractériser des réseaux physiques : obsolètes ou actuels, rapides ou lents, filaires ou non.</li>"
          "<li>Calculer une durée de téléchargement à partir d'un débit.</li>"
          "<li>Caractériser l'ordre de grandeur du trafic sur Internet et son évolution.</li>"
          "<li>Expliquer ce qu'est la neutralité du Net.</li>"
          "<li>Distinguer le rôle des protocoles IP et TCP.</li>"
          "<li>Caractériser les principes du routage et ses limites.</li>"
          "<li>Distinguer la fiabilité de transmission et l'absence de garantie temporelle.</li></ul>")

d.ecrire(SORTIE, "../../")

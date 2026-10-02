"""Diaporama — SNT, thème Internet, chapitre 2 « Plongée au cœur d'Internet ».

    python3 tools/diaporamas/snt_internet_2.py

Le contenu suit les pages du site (docs/SNT/2_Plongee_au_coeur_d_Internet/), « À retenir »
remplis, une diapo d'appel par activité, consignes complètes.
"""
from pathlib import Path
from diaporama import Deck

RACINE = Path(__file__).resolve().parents[2]
SORTIE = RACINE / "docs/SNT/2_Plongee_au_coeur_d_Internet/diaporama.html"
IMG = "../../files/SNT/Internet/"

d = Deck("Diaporama — Plongée au cœur d'Internet", "SNT · Internet · Chapitre 2 — Plongée au cœur d'Internet")
E = Deck.encadre

# ------------------------------------------------------------------ Ouverture
d.couverture("SNT · Thème Internet · Chapitre 2", "Plongée au cœur<br>d'Internet 🌊",
             "Clients, serveurs, noms de domaine… et réseaux pair-à-pair")

d.contenu("Introduction", "Au programme 🧭", Deck.cartes([
    ("1 · Clients et serveurs 🖥️", "<p>Qui demande, qui répond ? Et quand tout le monde se connecte en même temps ?</p>"),
    ("2 · Le DNS 📖", "<p>Comment un nom comme <code>wikipedia.org</code> devient une adresse IP.</p>"),
    ("3 · Le pair-à-pair 🔗", "<p>Quand chaque ordinateur devient aussi serveur.</p>"),
    ("4 · Légal ou illégal ? ⚖️", "<p>Télécharger, partager… et respecter les créateurs.</p>"),
]) + E("histoire", "Le saviez-vous ?",
       "<p>Chaque seconde, Google reçoit environ <b>100 000 recherches</b>, réparties entre des "
       "<b>centaines de milliers de serveurs</b> dans le monde entier.</p>"))

d.contenu("Introduction", "Vrai ou faux ? 🤔",
          '<p class="grand">Nejma a lu sur un réseau social :</p>'
          + E("attention", "Sur un réseau social",
              "<p style=\"font-size:40px\">« Si des pirates rendaient tous les serveurs DNS indisponibles, "
              "plus personne ne pourrait surfer sur le Web. »</p>")
          + "<p>Garde cette phrase en tête : nous y répondrons à la fin de la partie 2.</p>")

# ------------------------------------------------------------------ Partie 1
d.partie("1", "Clients et serveurs 🖥️", "Qui demande, qui répond ?")

d.contenu("Activité 1", "Qui sert qui ? 🙋", Deck.appel(
    "Pour chaque situation : qui demande ? qui répond ? qu'est-ce qui est demandé ?",
    "Réponds sur ton cahier, sous forme de tableau.",
    [("Les situations 📌", "<ol><li>Tu regardes une vidéo sur YouTube avec ton téléphone.</li>"
                          "<li>Tu consultes tes notes sur Pronote.</li><li>Tu envoies un message à un ami sur une messagerie.</li>"
                          "<li>Tu joues à un jeu en ligne.</li><li>Au CDI, tu imprimes sur l'imprimante partagée.</li></ol>"),
     ("Pour t'aider 💡", "<p>Une machine <b>demande</b> un service, une autre le <b>fournit</b>. "
                        "Où se trouve vraiment la vidéo que tu regardes ?</p>")]))

d.contenu("Partie 1 · Clients et serveurs", "Client et serveur",
          '<div class="deux">'
          + E("definition", "Définitions : Client et serveur",
              "<ul><li>Un <b>serveur</b> stocke des données ou rend un service, et le met à disposition d'autres machines.</li>"
              "<li>Un <b>client</b> se connecte à un serveur pour utiliser ce service. Ton navigateur est un client.</li>"
              "<li>Le client envoie une <b>requête</b>, le serveur renvoie une <b>réponse</b>.</li></ul>")
          + f'<img class="schema" src="{IMG}client-serveur.svg" alt="Huit clients reliés à un serveur">'
          + "</div>")

d.retenir("Dans le modèle <em>client-serveur</em>, les rôles sont fixés.",
          "<ul><li>Les <b>clients</b> envoient des requêtes, les <b>serveurs</b> leur répondent.</li>"
          "<li>Un client ne sert jamais les autres clients.</li>"
          "<li>Un serveur est un ordinateur comme un autre, souvent sans écran, rangé avec des milliers d'autres "
          "dans un <b>centre de données</b> (<i>data center</i>).</li></ul>")

d.contenu("Activité 2", "La billetterie du concert 🎫", Deck.appel(
    "Ce matin à 10 h, la vente des places d'un concert très attendu ouvre en ligne.",
    "Chaque serveur du site de la billetterie peut traiter <b>500 visiteurs</b> en même temps.",
    [("Observer 👀", "<ol><li>Avec 300 visiteurs et un serveur, en combien de temps le site répond-il ?</li>"
                    "<li>À partir de combien de visiteurs le site ralentit-il ? est-il saturé ?</li></ol>"),
     ("Agir 🔧", "<ol start=\"3\"><li>2 000 visiteurs : quelle solution pour que tout le monde achète sa place ? Teste-la.</li>"
                "<li>Un pirate attaque le site : que se passe-t-il pour les vrais visiteurs ? Ajouter des serveurs suffit-il ?</li></ol>")]))

d.outil("Activité 2", "La billetterie du concert 🎫", "charge")

d.contenu("Partie 1 · Attaques", "L'attaque par déni de service ☠️",
          E("definition", "Définition : Attaque par déni de service (DDoS)",
            "<p>Un pirate prend le contrôle d'un grand nombre de machines, souvent à l'insu de leurs propriétaires, "
            "et leur fait envoyer <b>en même temps</b> une avalanche de requêtes vers un même site. "
            "Le site, surchargé, devient <b>inaccessible</b>.</p>")
          + E("attention", "C'est un délit",
              "<p>Entraver le fonctionnement d'un système informatique : jusqu'à <b>5 ans de prison et 150 000 € d'amende</b> "
              "(article 323-2 du Code pénal).</p>"))

d.retenir("Un serveur se <em>duplique</em>… et peut être <em>attaqué</em>.",
          "<ul><li>Pour supporter de nombreux clients en même temps, on <b>duplique</b> un serveur à l'identique.</li>"
          "<li>En le saturant de requêtes, une <b>attaque par déni de service</b> rend un serveur indisponible.</li></ul>")

# ------------------------------------------------------------------ Partie 2
d.partie("2", "Les noms de domaine et le DNS 📖", "Le répertoire d'Internet")

d.contenu("Activité 3", "Le Web sans noms de domaine 💬",
          '<div class="deux"><div style="display:grid;gap:26px">'
          '<p class="grand">« As-tu vu le nouveau site web <code>133.125.232.127</code> ? »</p>'
          '<p class="grand">« Non ! Et toi, tu as vu le site <code>3a01:cb1c:3cc:8100:b8dd:b019:a392:61b3</code> ? »</p>'
          '<p style="color:var(--doux)">Hugo et Théo, dans un monde sans noms de domaine</p></div>'
          + Deck.cartes([("Questions ❓", "<ol><li>Sans relire, peux-tu redire les deux adresses ?</li>"
                                         "<li>Quel est l'intérêt de désigner un site par un <b>nom</b> plutôt que par son adresse IP ?</li>"
                                         "<li>Sur ton téléphone, tu appelles un ami en touchant son <b>nom</b> dans tes contacts. "
                                         "Que fait le téléphone à ta place ?</li></ol>")], "orange")
          + "</div>")

d.contenu("Partie 2 · Noms de domaine", "Le nom de domaine 🏷️",
          f'<img class="schema" src="{IMG}url.svg" alt="Anatomie d\'une adresse web" style="height:260px;flex:none">'
          + E("definition", "Définition : Nom de domaine",
              "<p>Une adresse composée de lettres, facile à retenir, qui désigne un site : <code>lycee-exemple.fr</code>, "
              "<code>wikipedia.org</code>. Elle se termine par une <b>extension</b> : <code>.fr</code> (un pays), "
              "<code>.com</code> (commercial), <code>.org</code> (non commercial), <code>.gouv.fr</code> (gouvernement)…</p>"))

d.contenu("Partie 2 · DNS", "Le répertoire d'Internet : le DNS 📖",
          '<div class="deux">'
          + E("definition", "Définition : Serveur DNS",
              "<p>Un <b>serveur DNS</b> (<i>Domain Name System</i>) fait la <b>correspondance entre les noms de domaine "
              "et les adresses IP</b>, comme le répertoire d'un téléphone entre les noms et les numéros.</p>"
              "<ol><li>Le navigateur demande l'adresse IP du site au serveur DNS.</li><li>Le serveur DNS la lui renvoie.</li>"
              "<li>Le navigateur envoie sa requête au serveur web, en rappelant le nom du site.</li>"
              "<li>Le serveur web renvoie la page.</li></ol>")
          + f'<img class="schema" src="{IMG}dns-echanges.svg" alt="Client, serveur DNS et serveur web">'
          + "</div>")

d.contenu("Activité 4", "Suivre une requête DNS 🔍", Deck.appel(
    "Avec le simulateur de la diapo suivante, ou sur le site (page « Les noms de domaine et le DNS »)",
    "Choisis un site, puis avance étape par étape.",
    [("Observer 👀", "<ol><li>Visite <code>lycee-exemple.fr</code> : combien d'échanges avant la page ? Entre quelles machines ?</li>"
                    "<li>Visite-le à nouveau : que remarques-tu ? Pourquoi est-ce utile ?</li></ol>"),
     ("Aller plus loin 🔧", "<ol start=\"3\"><li>Visite <code>lycee-exmple.fr</code> : que se passe-t-il ?</li>"
                          "<li>Coche « coulisses » et visite <code>encyclopedie.org</code> : comment le serveur DNS trouve-t-il la réponse ?</li></ol>")]))

d.outil("Activité 4", "Suivre une requête DNS 🔍", "dns")

d.retenir("Le <em>DNS</em> traduit les noms de domaine en adresses IP.",
          "<ul><li>Sans lui, il faudrait taper l'adresse IP de chaque site.</li>"
          "<li>Un nom de domaine peut correspondre à <b>plusieurs adresses IP</b> : des serveurs dupliqués.</li>"
          "<li>Une adresse IP peut correspondre à <b>plusieurs noms de domaine</b> : un serveur peut héberger plusieurs sites.</li></ul>")

d.contenu("Activité 5 · sur ordinateur", "Retrouver des adresses IP 💻", Deck.appel(
    "Dans le Terminal de Windows (touche Windows, tape cmd, puis Entrée), puis sur my-ip-finder.fr",
    "La commande <code>nslookup</code> interroge un serveur DNS.",
    [("Partie A · Terminal ⌨️", "<ol><li><code>nslookup www.google.fr</code> : relève les adresses. IPv4 ? IPv6 ?</li>"
                                "<li><code>nslookup www.youtube.com</code> : combien d'adresses ? Pourquoi ?</li>"
                                "<li><code>nslookup 8.8.8.8</code> : quel nom correspond à cette adresse ?</li></ol>"),
     ("Partie B · my-ip-finder.fr 🌐", "<ol start=\"4\"><li>Onglet « DNS Lookup » : adresses IP de <code>google.fr</code>, "
                                      "<code>google.com</code>, <code>google.de</code>.</li>"
                                      "<li>Tape l'adresse IPv4 de google.fr dans la barre d'adresse : que se passe-t-il ?</li>"
                                      "<li>Que peux-tu conclure ?</li></ol>")]))

d.contenu("Vrai ou faux ?", "Alors, Nejma avait-elle raison ? 🤔",
          E("attention", "« Si tous les serveurs DNS tombaient, plus personne ne pourrait surfer sur le Web. »",
            "<p><b>En grande partie vrai.</b> Les routeurs fonctionneraient toujours, et on pourrait en théorie taper les "
            "adresses IP… mais personne ne les connaît, et un serveur qui héberge plusieurs sites a besoin du nom.</p>")
          + '<p class="grand">C\'est pourquoi les serveurs DNS sont <b>très nombreux</b> et <b>répartis dans le monde entier</b>.</p>')

# ------------------------------------------------------------------ Partie 3
d.partie("3", "Le pair-à-pair 🔗", "Quand chaque ordinateur devient aussi serveur")

d.contenu("Activité 6", "La mise à jour du jeu 🎮", Deck.appel(
    "Un éditeur publie une mise à jour de 8 morceaux. Des millions de joueurs la veulent le même jour.",
    "À chaque tour, le serveur envoie <b>2 morceaux</b>. En pair-à-pair, chaque ordinateur peut <b>en plus</b> envoyer un morceau qu'il possède.",
    [("Comparer ⏱️", "<ol><li>En client-serveur, avec 6, 12 puis 24 ordinateurs : note les durées. Que se passe-t-il quand le nombre double ?</li>"
                    "<li>Même chose en pair-à-pair.</li><li>Pourquoi le pair-à-pair est-il plus rapide ?</li></ol>"),
     ("Casser 💥", "<ol start=\"4\"><li>En pair-à-pair, mets le serveur en panne une fois les 8 morceaux présents chez les ordinateurs. "
                  "Puis dès le 2ᵉ tour.</li><li>Et en client-serveur ?</li></ol>")]))

d.outil("Activité 6", "La mise à jour du jeu 🎮", "p2p")

d.contenu("Partie 3 · Pair-à-pair", "Le modèle pair-à-pair",
          '<div class="deux">'
          + E("definition", "Définition : Modèle pair-à-pair",
              "<p>Le <b>pair-à-pair</b> (<i>peer-to-peer</i>, <b>P2P</b>) est un principe d'échange où <b>chaque ordinateur "
              "est à la fois client et serveur</b> : il reçoit des données des autres et leur en fournit.</p>"
              "<p>Les fichiers sont <b>découpés en morceaux</b> : on peut partager un fichier avant même de l'avoir en entier.</p>")
          + f'<img class="schema" src="{IMG}pair-a-pair.svg" alt="Sept ordinateurs, chacun client et serveur">'
          + "</div>")

d.retenir("En <em>pair-à-pair</em>, chacun est client et serveur.",
          "<ul><li>Les données sont <b>réparties</b> sur de nombreuses machines.</li>"
          "<li>Plus il y a de pairs, plus le partage est <b>rapide</b>, et aucun serveur n'est surchargé.</li>"
          "<li>Le réseau continue de fonctionner même si certains ordinateurs s'arrêtent.</li></ul>")

d.contenu("Partie 3 · Usages", "À quoi sert le pair-à-pair ? 🧰", Deck.cartes([
    ("🔄 Les mises à jour", "<p>Windows et de nombreux jeux distribuent leurs mises à jour en pair-à-pair, pour soulager leurs serveurs.</p>"),
    ("₿ Les cryptomonnaies", "<p>La <i>blockchain</i> du Bitcoin est copiée sur des milliers d'ordinateurs. Aucune banque ne la contrôle.</p>"),
    ("🧬 Le calcul partagé", "<p>Le projet <i>Décrypthon</i> : 75 000 volontaires, un calcul qui aurait pris plus de 1 100 ans à un seul ordinateur.</p>"),
    ("📁 Le partage de fichiers", "<p>Entre internautes… légal ou non, selon ce que l'on partage.</p>"),
]))

# ------------------------------------------------------------------ Partie 4
d.partie("4", "Télécharger : légal ou illégal ? ⚖️", "Ce qui compte, c'est ce qu'on partage")

d.contenu("Partie 4 · Droit d'auteur", "Le droit d'auteur ©️",
          E("definition", "Définition : Droit d'auteur",
            "<p>Une œuvre (film, chanson, jeu vidéo, livre, logiciel…) appartient à son auteur. Le <b>droit d'auteur</b> lui "
            "permet de décider qui peut la copier, la diffuser, et à quel prix.</p>")
          + '<p class="grand">Utiliser un logiciel de pair-à-pair est <b>légal</b>. Télécharger ou partager une œuvre '
            '<b>sans l\'accord de son propriétaire</b> est <b>illégal</b>, quel que soit le moyen.</p>')

d.contenu("Activité 7", "Légal ou illégal ? 🤔", Deck.cartes([
    ("Les situations", "<ol><li>Lina télécharge le logiciel libre LibreOffice en pair-à-pair.</li>"
                       "<li>Tom télécharge le dernier film sorti au cinéma sur un site de torrents.</li>"
                       "<li>Inès partage en pair-à-pair les photos qu'elle a prises au mariage de sa tante.</li></ol>"),
    ("&nbsp;", "<ol start=\"4\"><li>Le jeu de Noah, acheté en ligne, télécharge sa mise à jour en pair-à-pair.</li>"
               "<li>Sacha regarde un match sur un boîtier IPTV à 20 € qui donne accès à toutes les chaînes payantes.</li>"
               "<li>Emma écoute un album sur une plateforme de streaming à laquelle elle est abonnée.</li></ol>"),
], "orange"), notes="Réponses : 1 légal, 2 illégal, 3 légal, 4 légal, 5 illégal, 6 légal. Le QCM est aussi sur le site.")

d.contenu("Partie 4 · L'Arcom", "Les risques encourus 🚨",
          '<div class="deux">'
          f'<img class="schema" src="{IMG}arcom-modes-illicites.svg" alt="Moyens de consommation illégale, Arcom 2023">'
          + '<div style="display:grid;gap:24px">'
          + E("definition", "L'Arcom",
              "<p>Née en 2022 de la fusion du CSA et d'Hadopi, l'<b>Arcom</b> protège les œuvres en luttant contre les offres "
              "illégales et en encourageant les offres légales.</p>")
          + E("attention", "Les sanctions",
              "<p>Un premier avertissement par e-mail, un second par courrier, puis la justice : jusqu'à <b>1 500 € d'amende</b>.</p>")
          + "</div></div>")

d.contenu("Partie 4 · Les créateurs", "Combien gagne un artiste ? 🎤",
          f'<img class="schema" src="{IMG}streaming-remuneration.svg" alt="Écoutes nécessaires pour gagner 1 €">')

d.contenu("Activité 8", "Débat : dans la peau de… 🎭", Deck.chrono(15) + Deck.appel(
    "Une jeune chanteuse sort un morceau qui « cartonne »… et devient l'un des plus téléchargés illégalement.",
    "Elle consulte un juriste, le directeur de la plateforme de streaming, et demande une enquête à l'Arcom.",
    [("Le casting 🎬", "<ul><li>la chanteuse et son juriste</li><li>des internautes qui téléchargent illégalement</li>"
                      "<li>des internautes qui écoutent sur une plateforme légale</li><li>la directrice de la plateforme</li>"
                      "<li>l'enquêteur de l'Arcom</li></ul>"),
     ("La question ⚖️", "<p><b>La chanteuse doit-elle porter plainte contre les internautes qui téléchargent illégalement sa musique ?</b></p>"
                       "<p>Choisis un rôle, prépare 2 ou 3 arguments avec les documents, puis improvisez la scène.</p>")]))

d.retenir("Le pair-à-pair est <em>légal</em>… pas le piratage.",
          "<ul><li>Télécharger ou partager un fichier <b>sans l'accord de son propriétaire</b> est illégal.</li>"
          "<li>Le téléchargement illégal nuit à la <b>rémunération des créateurs</b>.</li>"
          "<li>L'<b>Arcom</b> avertit, puis la justice peut sanctionner : jusqu'à <b>1 500 € d'amende</b>.</li></ul>")

# ------------------------------------------------------------------ Bilan
d.contenu("Bilan", "Les exercices ✏️", Deck.appel(
    "Sur le site, page « Exercices »",
    "Quatorze exercices, du plus simple au plus difficile. La correction est vérifiée avec le professeur.",
    [("Clients, serveurs, DNS", "<ul><li>1 et 2 : serveurs dupliqués, débit partagé (Python)</li>"
                               "<li>3 et 4 : extensions et adresses web</li><li>5 et 6 : adresses IP réelles (ordinateur)</li>"
                               "<li>7 à 9 : site inaccessible, requête DNS ★★★, DNS empoisonné ★★★</li></ul>"),
     ("Pair-à-pair", "<ul><li>10 et 11 : logiciel gratuit, légal ou non</li><li>12 et 13 : écologie, Bitcoin</li>"
                    "<li>14 : le calcul partagé ★★★</li></ul>")]))

d.contenu("Bilan", "Ai-je compris l'essentiel ? ✅", Deck.appel(
    "Sur le site, page « Conclusion »",
    "Un QCM de 12 questions, corrigé automatiquement.",
    [("QCM ✅", "<ul><li>Une seule bonne réponse par question</li><li>Lis les explications de tes erreurs</li></ul>"),
     ("Et ensuite 🎯", "<ul><li>Relis les « À retenir » des notions ratées</li><li>Refais l'exercice correspondant</li></ul>")]))

d.contenu("Bilan", "Ce que tu dois savoir faire 🎯",
          "<ul>"
          "<li>Distinguer le rôle d'un client et d'un serveur.</li>"
          "<li>Expliquer l'intérêt de dupliquer un serveur et ce qu'est une attaque par déni de service.</li>"
          "<li>Sur des exemples réels, retrouver une adresse IP à partir d'une adresse symbolique et inversement.</li>"
          "<li>Expliquer le rôle d'un serveur DNS.</li>"
          "<li>Décrire l'intérêt des réseaux pair-à-pair ainsi que les usages illicites qu'on peut en faire.</li>"
          "<li>Distinguer un téléchargement légal d'un téléchargement illégal, et en connaître les conséquences.</li></ul>")

d.contenu("Pour réviser tout le thème", "Allô la Hotline ☎️",
          Deck.video(IMG + "videos/hotline-internet-ip-protocole-universel.mp4",
                     "« Internet, IP un protocole universel ? » — MOOC SNT, Class'Code (CC BY). Adresses IP, DNS, paquets et TCP."))

d.ecrire(SORTIE, "../../")

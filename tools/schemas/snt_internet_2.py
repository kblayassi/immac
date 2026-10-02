"""Schémas du chapitre 2 « Plongée au cœur d'Internet ». Appelé par snt_internet.py."""
import math
from snt_internet import (doc, texte, ordi, telephone, serveur, ligne, fleche,
                          VIOLET, ORANGE, BLEU, VERT, ROUGE, GRIS, ENCRE)


def client_serveur():
    c = texte(330, 28, "Le modèle client-serveur", 16, VIOLET, 700)
    cx, cy = 330, 185
    for k in range(8):
        a = 2 * math.pi * k / 8 - math.pi / 2
        x, y = cx + 230 * math.cos(a), cy + 125 * math.sin(a)
        c += ligne(cx, cy, x, y, "#d3746b", 2.5)
        c += (telephone if k % 3 == 1 else ordi)(x, y)
    c += f'<circle cx="{cx}" cy="{cy}" r="44" fill="#ffffff"/>' + serveur(cx, cy)
    c += texte(cx, cy + 62, "Serveur", 14, ENCRE, 700)
    c += texte(330, 345, "Les clients envoient des requêtes, le serveur leur répond. Les rôles ne s'échangent pas.", 13, GRIS, 600)
    return doc(660, 360, c, "Huit clients reliés à un serveur central")


def pair_a_pair():
    c = texte(330, 28, "Le modèle pair-à-pair", 16, VIOLET, 700)
    cx, cy = 330, 185
    pts = [(cx + 220 * math.cos(2 * math.pi * k / 7 - math.pi / 2),
            cy + 120 * math.sin(2 * math.pi * k / 7 - math.pi / 2)) for k in range(7)]
    for i in range(7):
        for j in range(i + 1, 7):
            if (j - i) % 7 in (1, 6) or (i + j) % 3 == 0:
                c += ligne(*pts[i], *pts[j], "#9bc58a", 2.5)
    for x, y in pts:
        c += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="30" fill="#ffffff"/>' + ordi(x, y)
    c += texte(330, 345, "Chaque ordinateur, ou « pair », est à la fois client et serveur.", 13, GRIS, 600)
    return doc(660, 360, c, "Sept ordinateurs reliés entre eux, chacun client et serveur")


def dns_echanges():
    c = ordi(80, 200, "Client (navigateur)")
    c += serveur(620, 85, "Serveur DNS")
    c += serveur(620, 305, "Serveur web").replace(ORANGE, "#4caf50")
    etapes = [
        (1, 60, "Quelle est l'adresse IP de lycee-exemple.fr ?", ORANGE, True),
        (2, 115, "C'est 185.42.28.10", ORANGE, False),
        (3, 280, "Requête à 185.42.28.10 : « la page de lycee-exemple.fr »", VERT, True),
        (4, 335, "Réponse : la page web demandée", VERT, False),
    ]
    for n, y, t, col, aller in etapes:
        c += fleche(140, y, 585, y, col) if aller else fleche(585, y, 140, y, col)
        c += f'<circle cx="160" cy="{y - 18}" r="12" fill="{col}"/>' + texte(160, y - 13, str(n), 13, "#fff", 700)
        c += texte(180, y - 12, t, 13, col, 700, "start")
    return doc(720, 390, c, "Le client demande l'adresse IP au serveur DNS, puis la page au serveur web")


def url():
    parts = [("https://", "protocole", GRIS, 96), ("www.", "sous-domaine", BLEU, 56), ("lycee-exemple", "nom", VIOLET, 160),
             (".fr", "extension", ORANGE, 42), ("/cantine/menu.html", "chemin", GRIS, 212)]
    c = texte(310, 28, "Une adresse web (URL)", 15, VIOLET, 700)
    x = 20
    for t, leg, col, w in parts:
        c += f'<rect x="{x}" y="50" width="{w}" height="46" rx="6" fill="{col}" fill-opacity=".14" stroke="{col}"/>'
        c += (f'<text x="{x + w / 2}" y="80" font-size="17" font-family="Red Hat Mono, monospace" '
              f'fill="{ENCRE}" text-anchor="middle" font-weight="600">{t}</text>')
        c += texte(x + w / 2, 122, leg, 12, col, 700)
        x += w + 6
    x0 = 20 + 96 + 6 + 56 + 6
    largeur = 160 + 6 + 42
    c += f'<path d="M{x0} 140 v10 h{largeur} v-10" fill="none" stroke="{VIOLET}" stroke-width="2"/>'
    c += texte(x0 + largeur / 2, 172, "le nom de domaine", 14, VIOLET, 700)
    return doc(620, 192, c, "Une adresse web : protocole, sous-domaine, nom, extension et chemin")


def dns_hierarchie():
    c = texte(380, 26, "Qui connaît l'adresse IP de www.monsite.com ?", 15, VIOLET, 700)
    c += ordi(70, 205, "Utilisateur")
    c += serveur(300, 200) + texte(300, 150, "Serveur DNS du", 13) + texte(300, 166, "fournisseur d'accès", 13)
    c += serveur(650, 70, "Serveur DNS racine") + serveur(650, 200, "Serveur DNS des .com")
    c += serveur(650, 330, "Serveur DNS de monsite.com")
    c += fleche(105, 192, 268, 192, VIOLET) + fleche(268, 214, 105, 214, VIOLET)
    numeros = {70: ("②", "③"), 200: ("④", "⑤"), 330: ("⑥", "⑦")}
    for y, (a, r) in numeros.items():
        y0 = 200 + (y - 200) * .25
        c += fleche(330, y0 - 8, 620, y - 8, GRIS, 2) + fleche(620, y + 8, 330, y0 + 8, GRIS, 2)
        c += texte(480, (y0 + y) / 2 - 14, a, 17, VIOLET, 700) + texte(480, (y0 + y) / 2 + 26, r, 17, VIOLET, 700)
    c += texte(186, 182, "①", 17, VIOLET, 700) + texte(186, 238, "⑧", 17, VIOLET, 700)
    return doc(760, 392, c, "L'utilisateur interroge le serveur DNS de son fournisseur, qui interroge trois autres serveurs")


def barres(titre, sous, donnees, unite, source, couleur, maxi):
    h = 70 + 30 * len(donnees) + 40
    c = texte(380, 28, titre, 16, VIOLET, 700) + texte(380, 48, sous, 12, GRIS, 500)
    for i, (lab, v) in enumerate(donnees):
        y = 72 + i * 30
        c += texte(300, y + 15, lab, 13, ENCRE, 600, "end")
        w = v / maxi * 380
        c += f'<rect x="312" y="{y}" width="{w:.1f}" height="20" rx="4" fill="{couleur}"/>'
        c += texte(318 + w, y + 15, f"{v}{unite}", 13, ENCRE, 700, "start")
    c += texte(380, h - 14, source, 11, GRIS, 500)
    return doc(760, h, c, titre)


def arcom():
    return barres("Comment consomme-t-on illégalement des films, séries ou musiques ?",
                  "part des consommateurs illégaux utilisant chaque moyen (plusieurs réponses possibles)",
                  [("Sites de streaming", 49), ("Téléchargement direct", 38), ("Réseaux sociaux", 32),
                   ("Pair-à-pair (torrent)", 26), ("Clés USB de proches", 23), ("IPTV (boîtier, appli)", 22),
                   ("Services de cloud", 21), ("Live streaming", 11), ("E-mails de proches", 3)],
                  " %", "Source : Arcom, baromètre de la consommation des biens culturels dématérialisés, 2023.",
                  ROUGE, 55)


def streaming():
    return barres("Combien d'écoutes pour qu'un artiste gagne 1 € ?",
                  "nombre moyen d'écoutes nécessaires, selon la plateforme",
                  [("Apple Music", 116), ("Deezer", 214), ("Amazon Music", 232), ("Spotify", 361),
                   ("YouTube Music", 681), ("Pandora", 827)],
                  "", "Source : challenges.fr, d'après les données publiées par les plateformes.", VIOLET, 950)


SCHEMAS = [("client-serveur", client_serveur), ("pair-a-pair", pair_a_pair), ("dns-echanges", dns_echanges),
           ("url", url), ("dns-hierarchie", dns_hierarchie), ("arcom-modes-illicites", arcom),
           ("streaming-remuneration", streaming)]

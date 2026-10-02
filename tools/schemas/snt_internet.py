"""Schémas du thème Internet (SNT).

    python3 tools/schemas/snt_internet.py

Écrit docs/files/SNT/Internet/*.svg : fond blanc arrondi, pour rester lisibles en thème sombre.
"""
from pathlib import Path
OUT = Path(__file__).resolve().parents[2] / "docs/files/SNT/Internet"
POLICE = "Quicksand, 'Segoe UI', Helvetica, Arial, sans-serif"
VIOLET, VIOLET_PALE, ORANGE, BLEU, VERT, ROUGE, GRIS, ENCRE = "#573D91", "#efeaf9", "#E67E22", "#5b8def", "#12855c", "#c62828", "#8a8799", "#1d1a26"

def doc(w, h, corps, titre):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'font-family="{POLICE}" role="img"><title>{titre}</title>'
            f'<rect width="{w}" height="{h}" rx="16" fill="#ffffff"/>{corps}</svg>')

def texte(x, y, t, taille=15, couleur=ENCRE, poids=600, ancre="middle"):
    return f'<text x="{x}" y="{y}" font-size="{taille}" fill="{couleur}" font-weight="{poids}" text-anchor="{ancre}">{t}</text>'

def ordi(x, y, legende=None, couleur=BLEU):
    s = (f'<rect x="{x-22}" y="{y-16}" width="44" height="30" rx="4" fill="{couleur}"/>'
         f'<rect x="{x-17}" y="{y-11}" width="34" height="20" rx="2" fill="#dfe8fd"/>'
         f'<rect x="{x-10}" y="{y+14}" width="20" height="5" rx="2" fill="{couleur}"/>')
    return s + (texte(x, y + 36, legende, 13) if legende else "")

def telephone(x, y, legende=None):
    s = (f'<rect x="{x-10}" y="{y-18}" width="20" height="36" rx="4" fill="{ENCRE}"/>'
         f'<rect x="{x-7}" y="{y-14}" width="14" height="26" rx="1" fill="#dfe8fd"/>')
    return s + (texte(x, y + 34, legende, 13) if legende else "")

def routeur(x, y, legende=None, r=15, dessus=False):
    s = (f'<circle cx="{x}" cy="{y}" r="{r}" fill="#4a4a5e"/>'
         f'<path d="M{x-7} {y-3} h14 m-4 -4 l4 4 l-4 4 M{x+7} {y+4} h-14 m4 -4 l-4 4 l4 4" stroke="#fff" stroke-width="2" fill="none"/>')
    return s + (texte(x, y - r - 8 if dessus else y + r + 18, legende, 13, ENCRE) if legende else "")

def serveur(x, y, legende=None):
    s = f'<rect x="{x-16}" y="{y-24}" width="32" height="48" rx="4" fill="{ORANGE}"/>'
    for k in range(3):
        s += f'<rect x="{x-11}" y="{y-19+k*15}" width="22" height="9" rx="2" fill="#fde3cc"/>'
    return s + (texte(x, y + 42, legende, 13) if legende else "")

def ligne(x1, y1, x2, y2, couleur="#d3746b", ep=3, tirets=None):
    d = f' stroke-dasharray="{tirets}"' if tirets else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{couleur}" stroke-width="{ep}"{d}/>'

def fleche(x1, y1, x2, y2, couleur=VIOLET, ep=2.5):
    import math
    a = math.atan2(y2 - y1, x2 - x1); L = 11
    p1 = (x2 - L * math.cos(a - .4), y2 - L * math.sin(a - .4))
    p2 = (x2 - L * math.cos(a + .4), y2 - L * math.sin(a + .4))
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{couleur}" stroke-width="{ep}"/>'
            f'<path d="M{x2} {y2} L{p1[0]:.1f} {p1[1]:.1f} L{p2[0]:.1f} {p2[1]:.1f} Z" fill="{couleur}"/>')

# 1. Internet, réseau de réseaux --------------------------------------------
def reseau_de_reseaux():
    c = ""
    # le cœur : des routeurs reliés
    coeur = {"a": (380, 150), "b": (480, 110), "c": (560, 190), "d": (450, 230), "e": (340, 250), "f": (600, 300)}
    for u, v in ["ab", "bc", "cd", "da", "ae", "ed", "cf", "df"]:
        c += ligne(*coeur[u], *coeur[v])
    c += f'<ellipse cx="470" cy="210" rx="190" ry="140" fill="none" stroke="{VIOLET}" stroke-width="2" stroke-dasharray="7 7"/>'
    c += texte(470, 62, "INTERNET : des réseaux reliés par des routeurs", 15, VIOLET, 700)
    for p in coeur.values():
        c += routeur(*p)
    # trois réseaux locaux
    def local(cx, cy, titre, appareils, attache, boitier):
        s = f'<rect x="{cx-105}" y="{cy-75}" width="210" height="150" rx="14" fill="{VIOLET_PALE}"/>'
        s += texte(cx, cy - 55, titre, 14, VIOLET, 700)
        s += ligne(cx, cy - 22, *attache, ep=3)
        for i, (fonction, leg) in enumerate(appareils):
            x = cx - 70 + i * 70
            s += ligne(x, cy + 35, cx, cy - 22, GRIS, 2, "4 4")
            s += fonction(x, cy + 35)
        s += f'<rect x="{cx-34}" y="{cy-33}" width="68" height="22" rx="5" fill="{ENCRE}"/>' + texte(cx, cy - 17, boitier, 12, "#fff")
        return s
    c += local(130, 130, "La maison", [(telephone, ""), (ordi, ""), (telephone, "")], coeur["a"], "box")
    c += local(130, 340, "Le lycée", [(ordi, ""), (ordi, ""), (ordi, "")], coeur["e"], "routeur")
    c += local(810, 380, "Un hébergeur", [(serveur, ""), (serveur, ""), (serveur, "")], coeur["f"], "routeur")
    c += texte(810, 225, "Wi-Fi, 4G, 5G, fibre, câble…", 13, GRIS, 600)
    c += texte(810, 245, "peu importe le réseau physique", 13, GRIS, 600)
    return doc(940, 480, c, "Internet relie des réseaux locaux par des routeurs")

# 2. Un paquet ---------------------------------------------------------------
def paquet():
    c = texte(380, 34, "Un paquet qui voyage sur Internet", 17, VIOLET, 700)
    c += f'<rect x="30" y="60" width="200" height="70" rx="10" fill="{VIOLET}"/>' + texte(130, 90, "Adresses IP", 15, "#fff", 700) + texte(130, 112, "expéditeur → destinataire", 12, "#fff", 500)
    c += f'<rect x="230" y="60" width="150" height="70" fill="{ORANGE}"/>' + texte(305, 90, "Numéro", 15, "#fff", 700) + texte(305, 112, "segment n°3 sur 8", 12, "#fff", 500)
    c += f'<rect x="380" y="60" width="350" height="70" rx="10" fill="{BLEU}"/>' + f'<rect x="380" y="60" width="20" height="70" fill="{BLEU}"/>' + texte(555, 90, "Données", 15, "#fff", 700) + texte(555, 112, "un petit morceau du fichier", 12, "#fff", 500)
    c += texte(130, 160, "écrit grâce à IP", 13, VIOLET, 700) + texte(130, 178, "pour trouver le chemin", 12, GRIS, 500)
    c += texte(305, 160, "écrit grâce à TCP", 13, ORANGE, 700) + texte(305, 178, "pour remettre en ordre", 12, GRIS, 500)
    c += texte(555, 160, "ce que l'on veut envoyer", 13, BLEU, 700) + texte(555, 178, "texte, image, son, vidéo…", 12, GRIS, 500)
    c += texte(380, 212, "Comme une carte postale : l'adresse au dos, le numéro de la carte, et le message.", 13, ENCRE, 500)
    return doc(760, 235, c, "Un paquet : en-tête avec les adresses IP et le numéro, puis les données")

# 3. TCP redemande un segment -----------------------------------------------
def renvoi():
    c = f'<rect x="40" y="40" width="130" height="330" rx="14" fill="{VIOLET_PALE}"/>' + texte(105, 30, "Expéditeur", 15, VIOLET, 700)
    c += f'<rect x="530" y="40" width="130" height="330" rx="14" fill="{VIOLET_PALE}"/>' + texte(595, 30, "Destinataire", 15, VIOLET, 700)
    lignes_ = [("segment 1", 75, 105, BLEU, True), ("segment 2", 125, 155, BLEU, False), ("segment 3", 175, 205, BLEU, True)]
    for t, y1, y2, col, ok in lignes_:
        if ok:
            c += fleche(170, y1, 530, y2, col)
        else:
            c += ligne(170, y1, 400, y1 + 20, col, 2.5)
            c += f'<path d="M392 {y1+10} l18 18 M410 {y1+10} l-18 18" stroke="{ROUGE}" stroke-width="4"/>'
            c += texte(470, y1 + 48, "perdu en route", 12, ROUGE, 700)
        c += texte(260, y1 - 2, t, 13, col, 700)
    c += fleche(530, 250, 170, 280, ORANGE)
    c += texte(350, 252, "« Je n'ai pas reçu le segment 2 ! »", 13, ORANGE, 700).replace('y="252"', 'y="246"')
    c += fleche(170, 315, 530, 345, VERT)
    c += texte(300, 311, "segment 2, renvoyé", 13, VERT, 700)
    return doc(700, 395, c, "TCP : le destinataire redemande le segment 2 qui s'est perdu")

# 4. Trafic mensuel (prévisions Cisco VNI, 10^18 octets par mois) ------------
def trafic():
    donnees = [(2017, 122), (2018, 156), (2019, 201), (2020, 254), (2021, 319), (2022, 396)]
    c = texte(380, 30, "Trafic mondial sur Internet, chaque mois", 17, VIOLET, 700)
    c += texte(380, 52, "en milliards de milliards d'octets (1 Eo = 10¹⁸ octets)", 12, GRIS, 500)
    x0, y0, H = 90, 330, 250
    for v in (0, 100, 200, 300, 400):
        y = y0 - v / 400 * H
        c += ligne(x0, y, 720, y, "#e0dced", 1) + texte(x0 - 10, y + 4, str(v), 12, GRIS, 500, "end")
    for i, (an, v) in enumerate(donnees):
        x = x0 + 30 + i * 105
        h = v / 400 * H
        video = h * (0.75 + i * 0.014)
        c += f'<rect x="{x}" y="{y0-h:.1f}" width="60" height="{h-video:.1f}" fill="{BLEU}" rx="3"/>'
        c += f'<rect x="{x}" y="{y0-video:.1f}" width="60" height="{video:.1f}" fill="{VIOLET}"/>'
        c += texte(x + 30, y0 - h - 8, str(v), 13, ENCRE, 700) + texte(x + 30, y0 + 20, str(an), 13, ENCRE, 600)
    c += f'<rect x="250" y="362" width="14" height="14" fill="{VIOLET}"/>' + texte(270, 374, "vidéo", 13, ENCRE, 500, "start")
    c += f'<rect x="360" y="362" width="14" height="14" fill="{BLEU}"/>' + texte(380, 374, "Web, e-mails, jeux, fichiers…", 13, ENCRE, 500, "start")
    c += texte(380, 398, "Source : Cisco, Visual Networking Index (2018). Valeurs de 2019 à 2022 prévues en 2018.", 11, GRIS, 500)
    return doc(760, 412, c, "Évolution du trafic mensuel mondial de 2017 à 2022, la vidéo en représente la plus grande part")

# 5. Petit réseau de l'exercice ----------------------------------------------
def petit_reseau():
    P = {"O1": (60, 130), "A": (190, 70), "E": (190, 190), "B": (340, 70), "D": (340, 190), "C": (480, 130), "O2": (600, 130)}
    c = ""
    for u, v in [("O1", "A"), ("O1", "E"), ("A", "B"), ("A", "E"), ("B", "C"), ("E", "D"), ("D", "C"), ("B", "D"), ("C", "O2")]:
        c += ligne(*P[u], *P[v])
    c += ordi(*P["O1"], "Ordinateur 1") + ordi(*P["O2"], "Ordinateur 2")
    for k in "ABCDE":
        c += routeur(*P[k], f"Routeur {k}", dessus=k in "ABC")
    return doc(660, 250, c, "Deux ordinateurs reliés par cinq routeurs A, B, C, D et E")

# 6. Plan du jeu des cartes postales (activité débranchée) ---------------------
def plan_cartes():
    P = {"Au": (70, 170), "A": (220, 90), "B": (220, 250), "C": (390, 60), "D": (390, 170),
         "E": (390, 280), "F": (560, 170), "Pa": (700, 170)}
    c = texte(385, 24, "Le réseau postal de la classe : les cartes suivent toujours les flèches", 15, VIOLET, 700)
    def relie(u, v):
        import math
        (x1, y1), (x2, y2) = P[u], P[v]
        L = math.hypot(x2 - x1, y2 - y1); r1 = 30 if u in ("Au", "Pa") else 28; r2 = 32
        return fleche(x1 + (x2 - x1) * r1 / L, y1 + (y2 - y1) * r1 / L,
                      x2 - (x2 - x1) * r2 / L, y2 - (y2 - y1) * r2 / L, "#d3746b", 3)
    for u, v in [("Au", "A"), ("Au", "B"), ("A", "C"), ("A", "D"), ("B", "D"), ("B", "E"),
                 ("C", "F"), ("D", "F"), ("D", "E"), ("E", "F"), ("F", "Pa")]:
        c += relie(u, v)
    def personne(x, y, legende, couleur):
        return (f'<circle cx="{x}" cy="{y-14}" r="11" fill="{couleur}"/>'
                f'<path d="M{x-17} {y+18} q17 -30 34 0 z" fill="{couleur}"/>' + texte(x, y + 40, legende, 14))
    c += personne(*P["Au"], "Aurore", BLEU) + personne(*P["Pa"], "Ses parents", BLEU)
    for k in "ABCDEF":
        x, y = P[k]
        c += f'<rect x="{x-24}" y="{y-20}" width="48" height="40" rx="8" fill="{ORANGE}"/>' + texte(x, y + 6, k, 18, "#fff", 700)
    c += texte(385, 335, "Deux flèches au départ d'une case : les deux destinataires possibles jouent à pierre-feuille-ciseaux.", 13, GRIS, 600)
    return doc(770, 350, c, "Aurore relie ses parents par six centres de tri A à F, reliés par des flèches")


if __name__ == "__main__":
    from snt_internet_2 import SCHEMAS as CHAPITRE_2
    for nom, f in [("reseau-de-reseaux", reseau_de_reseaux), ("paquet", paquet), ("tcp-renvoi", renvoi),
                   ("trafic", trafic), ("petit-reseau", petit_reseau),
                   ("plan-cartes-postales", plan_cartes)] + CHAPITRE_2:
        (OUT / f"{nom}.svg").write_text(f(), encoding="utf-8")
        print("écrit", nom)

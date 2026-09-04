"""
Version élève / version prof.

Le site est construit deux fois à partir des mêmes sources :

* `mkdocs.yml`      → version **élève**, publiée à la racine ;
* `mkdocs-prof.yml` → version **prof**, publiée dans le sous-dossier `prof/`.

En version élève, ce hook retire des pages de NSI, *avant* la conversion en HTML :

* les corrections d'exercices — toutes les admonitions `??? success`. Le
  contenu de cours qu'elles hébergent parfois est conservé : une `definition`
  n'est jamais une réponse, et un bloc `expert` intitulé « Pour aller plus
  loin » va, par convention du site, au-delà de l'exercice. Les deux sont
  remontés au niveau de la correction retirée ;
* les blocs « À retenir » des leçons, remplacés par une ligne d'attente ;
* la correction embarquée dans les éditeurs Python — l'attribut
  `data-solution-b64`, son panneau et son bouton « Afficher la correction ».

Il retire enfin, les **parcours interactifs** (`docs/parcours-*/`, copiés tels quels par
MkDocs et donc invisibles des hooks de page), le champ
`solution` de chaque étape des fichiers `seances/*.js`. **L'élève n'a jamais de
correction : son aide s'arrête aux coups de pouce.** Deux verrous, indépendants :
le moteur ne construit le bouton « Correction » qu'en version prof, et le champ
qui l'alimente est retiré ici. Un `solution` écrit dans une forme que le retrait
ne reconnaît pas fait échouer la construction plutôt que d'être publié
(`verifier_aucune_solution`).

Le contenu retiré n'est donc pas présent dans le HTML publié : ce n'est pas
un masquage par CSS, il n'y a rien à révéler dans la page.

En version prof, il fait l'inverse : il pose dans chaque `parcours-*/index.html`
le drapeau `window.PARCOURS_PROF`. Le moteur le lit pour n'y verrouiller aucune
étape et y offrir la correction d'emblée : on y prépare une séance, on ne la
suit pas.

Le choix de la version se lit dans `extra.version` du fichier de configuration.
"""

import re
from pathlib import Path

# Une admonition commence par !!! ou ??? (avec ou sans +) suivi de son type.
DEBUT_SUCCESS = re.compile(r'^(?P<indent>[ \t]*)\?{3}\+?[ \t]+success\b')
DEBUT_RETENIR = re.compile(r'^(?P<indent>[ \t]*)!{3}\+?[ \t]+\w+[ \t]+"À retenir[^"]*"[ \t]*$')
TITRE_RETENIR = re.compile(r'^#{2,3}[ \t]+À retenir\b')

REMPLACEMENT = '!!! info "À retenir"\n    Cette synthèse est construite en classe.\n'

# Contenu de cours qui peut se trouver niché dans une correction : il survit au
# retrait de celle-ci. Le titre « Pour aller plus loin » est la convention du
# site pour distinguer un approfondissement d'une variante de corrigé.
A_CONSERVER = re.compile(
    r'^(?P<indent>[ \t]*)(?:!{3}|\?{3})\+?[ \t]+'
    r'(?:definition\b|expert[ \t]+"Pour aller plus loin)')


def _fin_du_bloc(lignes, debut, indent):
    """Renvoie l'indice de la première ligne qui n'appartient plus à l'admonition."""
    i = debut + 1
    n = len(lignes)
    while i < n:
        ligne = lignes[i]
        if not ligne.strip():          # une ligne vide ne clôt pas un bloc
            i += 1
            continue
        # le corps d'une admonition est indenté plus profondément que son en-tête
        courant = len(ligne) - len(ligne.lstrip())
        if courant <= len(indent):
            break
        i += 1
    # on ne garde pas les lignes vides accumulées à la fin du bloc
    while i > debut + 1 and not lignes[i - 1].strip():
        i -= 1
    return i


def _contenu_de_cours(lignes, debut, fin, indent_cible):
    """Remonte au niveau `indent_cible` les blocs de cours nichés dans [debut, fin[."""
    garde = []
    i = debut
    while i < fin:
        m = A_CONSERVER.match(lignes[i])
        if not m:
            i += 1
            continue
        indent = m.group('indent')
        bout = min(_fin_du_bloc(lignes, i, indent), fin)
        retrait = len(indent) - len(indent_cible)
        for l in lignes[i:bout]:
            garde.append(l[retrait:] if l[:retrait].strip() == '' else l)
        garde.append('')
        i = bout
    return garde


def _epurer(markdown):
    lignes = markdown.split('\n')
    sortie = []
    i = 0
    n = len(lignes)
    retires = 0
    while i < n:
        ligne = lignes[i]

        m = DEBUT_SUCCESS.match(ligne)
        if m:
            indent = m.group('indent')
            fin = _fin_du_bloc(lignes, i, indent)
            sortie.extend(_contenu_de_cours(lignes, i + 1, fin, indent))
            i = fin
            retires += 1
            continue

        m = DEBUT_RETENIR.match(ligne)
        if m:
            indent = m.group('indent')
            i = _fin_du_bloc(lignes, i, indent)
            sortie.extend(indent + l for l in REMPLACEMENT.split('\n'))
            retires += 1
            continue

        # Section « ## À retenir 📌 » : seule la synthèse qui ouvre la section est
        # remplacée. Ce qui suit — une transition, un bloc de crédits — ne la
        # concerne pas et reste en place.
        if TITRE_RETENIR.match(ligne):
            sortie.append(ligne)
            i += 1
            while i < n and not lignes[i].strip():
                sortie.append(lignes[i])
                i += 1
            m2 = re.match(r'^(?P<indent>[ \t]*)[!?]{3}\+?[ \t]+\w+', lignes[i]) if i < n else None
            if m2:
                i = _fin_du_bloc(lignes, i, m2.group('indent'))
                sortie.extend(REMPLACEMENT.split('\n'))
                retires += 1
            continue

        sortie.append(ligne)
        i += 1

    return '\n'.join(sortie), retires


# La macro python_playground dépose la correction en base64 dans le HTML.
# On la retire de la page produite, avec le panneau et le bouton qui la servent.
SOLUTION_B64 = re.compile(r'\s*data-solution-b64="[^"]*"')
OUVERTURE_PANNEAU = '<div class="panel panel-correction"'
BALISE_DIV = re.compile(r'<div\b|</div>')
# Un bouton ne contient pas d'autre bouton : la première fermeture est la bonne.
BOUTON_SOLUTION = re.compile(r'<button class="btn btn-icone btn-solution".*?</button>', re.S)


def _retirer_div(html, ouverture):
    """Retire chaque <div> ouvert par `ouverture`, en s'arrêtant à SA fermeture.

    Le panneau de correction est suivi des fermetures de ses conteneurs. Compter
    les balises est indispensable : une expression régulière qui cherche une
    suite de </div> en emporte un de trop et laisse la page ouverte, si bien que
    tout ce qui suit se retrouve imbriqué dedans.
    """
    while True:
        debut = html.find(ouverture)
        if debut == -1:
            return html
        profondeur = 0
        fin = None
        for m in BALISE_DIV.finditer(html, debut):
            profondeur += 1 if m.group(0) == '<div' else -1
            if profondeur == 0:
                fin = m.end()
                break
        if fin is None:          # balisage inattendu : on préfère ne rien toucher
            return html
        html = html[:debut] + html[fin:]


def on_page_markdown(markdown, page, config, files):
    if config.get('extra', {}).get('version') != 'eleve':
        return markdown
    if not page.file.src_uri.startswith('NSI/'):
        return markdown
    epure, _ = _epurer(markdown)
    return epure


def on_post_page(output, page, config):
    if config.get('extra', {}).get('version') != 'eleve':
        return output
    if not page.file.src_uri.startswith('NSI/'):
        return output
    output = SOLUTION_B64.sub('', output)
    output = _retirer_div(output, OUVERTURE_PANNEAU)
    output = BOUTON_SOLUTION.sub('', output)
    return output


# ---------------------------------------------------------------------------
# Parcours Python (SNT)
#
# Ces fichiers ne passent par aucun hook de page : MkDocs les copie tels quels.
# On les retouche donc après la construction, dans le dossier de sortie — jamais
# dans docs/, qui reste la source complète.

# `solution: `…`` sur une ligne : littéral gabarit, échappements compris. La
# virgule finale est facultative — un `solution` en dernière propriété n'en a pas,
# et la ligne doit disparaître tout autant.
SOLUTION_PARCOURS = re.compile(r'^[ \t]*solution:\s*`(?:[^`\\]|\\.)*`,?[ \t]*\n', re.M)

# Les parcours web ont plusieurs fichiers par étape : leur solution est un objet
# qui s'étend sur plusieurs lignes. On l'ouvre à `solution: {` et on la referme
# à la première ligne `},` de même indentation.
DEBUT_SOLUTION_OBJET = re.compile(r'^(?P<indent>[ \t]*)solution:\s*\{[ \t]*$')


def retirer_solutions_objet(source):
    lignes = source.split('\n')
    sortie, i, retires = [], 0, 0
    while i < len(lignes):
        debut = DEBUT_SOLUTION_OBJET.match(lignes[i])
        if not debut:
            sortie.append(lignes[i])
            i += 1
            continue
        fin = debut.group('indent') + '},'
        j = i + 1
        while j < len(lignes) and lignes[j].rstrip() != fin:
            j += 1
        if j >= len(lignes):        # accolade jamais refermée : on ne touche à rien
            sortie.append(lignes[i])
            i += 1
            continue
        i = j + 1
        retires += 1
    return '\n'.join(sortie), retires


# ---------------------------------------------------------------------------
# Parcours, version prof : tout est ouvert
#
# Le moteur n'ouvre une étape que lorsque la précédente est réussie. C'est bon
# pour l'élève, absurde pour qui prépare la séance : la version prof pose donc
# ce drapeau dans la page. Un script classique s'exécute avant le module qui
# charge le moteur, où qu'il soit placé : `</head>` fait l'affaire.

FIN_ENTETE = '</head>'
DRAPEAU_PROF = '<script>window.PARCOURS_PROF = true;</script>\n'


def ouvrir_les_parcours(config):
    """Déverrouille les parcours de la version prof, dans le dossier de sortie."""
    racine = Path(config['site_dir'])
    for page in sorted(racine.glob('parcours-*/index.html')):
        source = page.read_text(encoding='utf-8')
        if 'PARCOURS_PROF' in source or FIN_ENTETE not in source:
            continue
        page.write_text(
            source.replace(FIN_ENTETE, DRAPEAU_PROF + FIN_ENTETE, 1), encoding='utf-8')


# Aucune correction ne doit survivre côté élève : l'aide s'y arrête aux coups de
# pouce. Un champ `solution` écrit dans une forme qu'aucune des deux découpes ne
# reconnaît passerait inaperçu — d'où cette relecture, qui fait échouer la
# construction plutôt que de publier la correction.
RESTE_UNE_SOLUTION = re.compile(r'^[ \t]*solution:', re.M)


def verifier_aucune_solution(fichier, source):
    fuite = RESTE_UNE_SOLUTION.search(source)
    if not fuite:
        return
    ligne = source.count('\n', 0, fuite.start()) + 1
    raise RuntimeError(
        f"version élève : une correction survit dans {fichier} (ligne {ligne}). "
        "Écris ce champ `solution` sur une seule ligne, ou en objet `solution: {`…`},`.")


def on_post_build(config):
    version = config.get('extra', {}).get('version')
    if version == 'prof':
        ouvrir_les_parcours(config)
        return
    if version != 'eleve':
        return
    racine = Path(config['site_dir'])
    for dossier in sorted(racine.glob('parcours-*/seances')):
      for fichier in sorted(dossier.glob('s*.js')):
        source = fichier.read_text(encoding='utf-8')
        epure, retires = SOLUTION_PARCOURS.subn('', source)
        epure, retires_objet = retirer_solutions_objet(epure)
        verifier_aucune_solution(fichier, epure)
        if retires or retires_objet:
            fichier.write_text(epure, encoding='utf-8')

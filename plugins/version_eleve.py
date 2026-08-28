"""
Version élève / version prof.

Le site est construit deux fois à partir des mêmes sources :

* `mkdocs.yml`      → version **élève**, publiée à la racine ;
* `mkdocs-prof.yml` → version **prof**, publiée dans le sous-dossier `prof/`.

En version élève, ce hook retire des pages de NSI, *avant* la conversion en HTML :

* les corrections d'exercices — toutes les admonitions `??? success` ;
* les blocs « À retenir » des leçons, remplacés par une ligne d'attente ;
* la correction embarquée dans les éditeurs Python — l'attribut
  `data-solution-b64`, son panneau et son bouton « Afficher la correction ».

Le contenu retiré n'est donc pas présent dans le HTML publié : ce n'est pas
un masquage par CSS, il n'y a rien à révéler dans la page.

Le choix de la version se lit dans `extra.version` du fichier de configuration.
"""

import re

# Une admonition commence par !!! ou ??? (avec ou sans +) suivi de son type.
DEBUT_SUCCESS = re.compile(r'^(?P<indent>[ \t]*)\?{3}\+?[ \t]+success\b')
DEBUT_RETENIR = re.compile(r'^(?P<indent>[ \t]*)!{3}\+?[ \t]+\w+[ \t]+"À retenir[^"]*"[ \t]*$')
TITRE_RETENIR = re.compile(r'^#{2,3}[ \t]+À retenir\b')

REMPLACEMENT = '!!! info "À retenir"\n    Cette synthèse est construite en classe.\n'


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
            i = _fin_du_bloc(lignes, i, m.group('indent'))
            retires += 1
            continue

        m = DEBUT_RETENIR.match(ligne)
        if m:
            indent = m.group('indent')
            i = _fin_du_bloc(lignes, i, indent)
            sortie.extend(indent + l for l in REMPLACEMENT.split('\n'))
            retires += 1
            continue

        # section « ## À retenir 📌 » : on vide ses admonitions, on garde le titre
        if TITRE_RETENIR.match(ligne):
            sortie.append(ligne)
            i += 1
            bloc_pose = False
            while i < n and not re.match(r'^#{1,3}[ \t]', lignes[i]):
                m2 = re.match(r'^(?P<indent>[ \t]*)[!?]{3}\+?[ \t]+\w+', lignes[i])
                if m2:
                    i = _fin_du_bloc(lignes, i, m2.group('indent'))
                    retires += 1
                    if not bloc_pose:
                        sortie.extend(REMPLACEMENT.split('\n'))
                        bloc_pose = True
                else:
                    sortie.append(lignes[i])
                    i += 1
            continue

        sortie.append(ligne)
        i += 1

    return '\n'.join(sortie), retires


# La macro python_playground dépose la correction en base64 dans le HTML.
# On la retire de la page produite, avec le panneau et le bouton qui la servent.
SOLUTION_B64 = re.compile(r'\s*data-solution-b64="[^"]*"')
PANNEAU_CORRECTION = re.compile(
    r'<div class="panel panel-correction".*?</div>\s*</div>\s*</div>', re.S)
BOUTON_SOLUTION = re.compile(r'<button class="btn btn-icone btn-solution".*?</button>', re.S)


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
    output = PANNEAU_CORRECTION.sub('', output)
    output = BOUTON_SOLUTION.sub('', output)
    return output

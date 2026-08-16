import re
from typing import Match

# Détecte les admonitions exopapier / exoordi avec un titre entre guillemets
ADMON_RE = re.compile(r'^(?P<indent>\s*)!!!\s+(?P<kind>exopapier|exoordi)\s+"(?P<title>[^"]*)"\s*$', re.M)

# Détecte un titre du style "Exercice 12 – ..." (on enlève le numéro si déjà présent)
EXO_PREFIX_RE = re.compile(r'^\s*Exercice\s+\d+\s*(?:[-–—]\s*)?', re.IGNORECASE)

def on_page_markdown(markdown: str, page, config, files) -> str:
    """
    Auto-numérotation des admonitions !!! exopapier / !!! exoordi.
    - Incrémente pour chaque exercice.
    - Reset à 1 à chaque titre Markdown '## ' (niveau 2).
    """
    exo_n = 0

    # On travaille ligne par ligne pour gérer le reset au bon endroit
    lines = markdown.splitlines()

    def rewrite_admon(match: Match[str]) -> str:
        nonlocal exo_n
        exo_n += 1

        indent = match.group("indent")
        kind = match.group("kind")
        title = match.group("title").strip()

        # Enlève "Exercice X – " si l'auteur l'a déjà écrit
        title_wo_prefix = EXO_PREFIX_RE.sub("", title).strip()

        if title_wo_prefix:
            new_title = f'Exercice {exo_n} – {title_wo_prefix}'
        else:
            new_title = f'Exercice {exo_n}'

        return f'{indent}!!! {kind} "{new_title}"'

    out = []
    for line in lines:
        # Réécriture éventuelle de la ligne admonition
        out.append(ADMON_RE.sub(rewrite_admon, line))

    return "\n".join(out)
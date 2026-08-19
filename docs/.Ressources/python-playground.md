---
title: Playground Python
---

# Macro `python_playground`

Éditeur Python exécuté **dans le navigateur de l'élève** (Pyodide, aucun serveur).
Même architecture que `html_playground` / `html_css_playground` : macro dans `main.py`,
éditeur CodeMirror, styles dans `stylesheets/extra.css`.

## Paramètres

| Paramètre | Défaut | Rôle |
|---|---|---|
| `key` | auto | Clé de sauvegarde locale. **Doit être unique sur tout le site** : c'est elle qui décide de ce que l'élève retrouve en revenant. |
| `example` / `example_file` | petit exemple | Code de départ affiché dans l'éditeur. |
| `solution` / `solution_file` | — | Correction. Ajoute le bouton **Correction**. |
| `tests` / `tests_file` | — | Assertions d'auto-validation. Ajoute le bouton **Valider**. |
| `titre` | `Python` | Libellé au-dessus de l'éditeur. |
| `hauteur` | `320px` | Hauteur de l'éditeur et de la console. |
| `timeout` | `15` | Secondes avant interruption (boucle infinie). |

Seuls **Exécuter**, **Valider** et **Charger dans l'éditeur** portent un libellé ; les
autres boutons sont réduits à leur pictogramme, avec infobulle et `aria-label`.
Même convention pour `html_playground` et `html_css_playground`, via les fonctions
`bouton()` / `bouton_icone()` partagées dans `main.py`.

Les éditeurs, la console et les rendus HTML se **redimensionnent verticalement** à la
souris (`resize: vertical`) : la `hauteur` de la macro n'est qu'un point de départ.

Les chemins `*_file` sont relatifs à `docs/`, comme `html_file`.

!!! warning "Jinja n'accepte pas les chaînes sur plusieurs lignes"
    `example="""..."""` provoque une *Macro Syntax Error*. Pour tout code de plus d'une
    ligne, passer par `example_file` / `solution_file` / `tests_file`.

## Où ranger les fichiers

```
docs/files/NSI/Python/
├── exemples/          ← codes de départ (publiés, c'est voulu)
└── .corrections/      ← solutions et tests
```

Le dossier `.corrections` commence par un point : **MkDocs ne le publie pas**, les fichiers
ne sont donc pas téléchargeables depuis le site.

!!! danger "La correction n'est pas un secret"
    Tout se passe côté navigateur : la solution et les tests sont encodés en base64 dans
    l'attribut `data-solution-b64` de la page. Un élève qui ouvre les outils de développement
    peut les lire. Le bouton **Correction** est un confort pédagogique, pas une protection —
    ne pas s'en servir pour une évaluation notée.

## Écrire les tests

Le code de l'élève est exécuté, puis les tests tournent **dans le même espace de noms**,
instruction par instruction :

- chaque `assert` devient une ligne verte ou rouge dans le panneau *Validation* ;
- le **message de l'assertion** sert d'intitulé — écrire une phrase qui décrit le
  comportement attendu, elle s'affiche aussi bien en réussite qu'en échec ;
- une assertion qui échoue n'arrête pas les suivantes ;
- les autres instructions (imports, fonctions utilitaires) servent de préparation ; si
  l'une d'elles casse, la validation s'arrête avec un message explicite.

```python
assert prix_ttc(100) == 120, "Pour 100 € HT, on attend 120 € TTC"
assert prix_ttc(0) == 0, "Un prix nul reste nul"
```

Pour tester une fonction qui **affiche** au lieu de renvoyer, capturer `sys.stdout` :

```python
import io, sys

def _capture(n):
    memoire, sys.stdout = sys.stdout, io.StringIO()
    try:
        table(n)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = memoire

assert "3 x 1 = 3" in _capture(3), "La première ligne doit être : 3 x 1 = 3"
```

## Exemple d'appel

```jinja
{{ "{{" }} python_playground(
  key="ch1-exo-ttc",
  hauteur="200px",
  example_file="files/NSI/Python/exemples/ttc.py",
  solution_file="files/NSI/Python/.corrections/ttc_solution.py",
  tests_file="files/NSI/Python/.corrections/ttc_tests.py"
) {{ "}}" }}
```

Fonctionne à l'intérieur d'une admonition `!!! exoordi` (indenter l'appel comme le reste
du contenu).

## Comment `input()` fonctionne

L'élève tape sa réponse **dans la console**, à la suite de la question, puis ++enter++.
Rien à préparer en amont.

Sous le capot, c'est un **rejeu** : un Web Worker ne peut pas se mettre en pause pour
attendre le clavier sans `SharedArrayBuffer`, indisponible sur GitHub Pages (il faudrait
des en-têtes COOP/COEP). Quand `input()` réclame une saisie inconnue, le worker interrompt
l'exécution et rend la main ; la page collecte la réponse, puis **relance le programme
depuis le début** avec les réponses déjà connues. Les saisies sont réaffichées en écho,
si bien que la console montre un transcript de terminal classique.

!!! warning "Conséquence à connaître"
    Un programme qui demande *n* saisies est exécuté *n + 1* fois. Invisible pour un script
    déterministe — c'est-à-dire l'immense majorité des exercices — mais un programme qui
    utilise `random` ou l'heure courante verra ses valeurs changer entre deux relances.
    Au-delà de 100 saisies, l'exécution est stoppée (`input()` dans une boucle sans fin).

## Détails techniques

- `docs/javascripts/python-playground.js` : éditeur, boutons, affichage.
- `docs/javascripts/pyodide-worker.js` : interpréteur et harnais de validation.
- L'exécution a lieu dans un **Web Worker** : une boucle infinie fige le worker, pas la
  page ; au bout de `timeout` secondes le worker est terminé et redémarré.
- Pyodide (~10 Mo) est chargé depuis jsDelivr, une seule fois par page, et préchargé dès
  qu'un playground est présent.
- Le code de l'élève est conservé dans `localStorage`. Si l'énoncé change côté enseignant,
  l'éditeur repart automatiquement du nouvel exemple.

## Mettre à jour le bundle CodeMirror

Le mode Python vient de `@codemirror/lang-python`, ajouté à `tools/codemirror-entry.js` :

```bash
npx esbuild tools/codemirror-entry.js --bundle --format=esm \
  --outfile=docs/javascripts/codemirror-bundle.js
```

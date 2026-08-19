from pathlib import Path
from markupsafe import Markup, escape
import base64

def define_env(env):
    docs_dir = Path(env.conf["docs_dir"]).resolve()

    def _lire(chemin, nom_param):
        """Lit un fichier situé sous docs/ (refuse toute sortie du dossier)."""
        p = (docs_dir / chemin).resolve()
        if not str(p).startswith(str(docs_dir)):
            raise ValueError(f"{nom_param} doit être un chemin sous docs/ (sans ../)")
        return p.read_text(encoding="utf-8")

    def _b64(texte):
        return base64.b64encode(texte.encode("utf-8")).decode("ascii")

    def bouton(action, icone, libelle, classe=""):
        """Bouton avec libellé visible."""
        return (f'<button class="btn{classe}" data-action="{action}">'
                f'<i class="fa-solid {icone}"></i> {libelle}</button>')

    def bouton_icone(action, icone, libelle, classe=""):
        """Bouton réduit à son pictogramme : le libellé reste lisible par
        l'infobulle et par les lecteurs d'écran."""
        return (f'<button class="btn btn-icone{classe}" data-action="{action}" '
                f'title="{libelle}" aria-label="{libelle}">'
                f'<i class="fa-solid {icone}"></i></button>')

    @env.macro
    def python_playground(key="", example=None, example_file=None,
                          solution=None, solution_file=None,
                          tests=None, tests_file=None,
                          titre="Python", hauteur="320px", timeout=15):
        """Éditeur Python exécuté dans le navigateur (Pyodide).

        - example / example_file : code de départ proposé à l'élève
        - solution / solution_file : correction, révélée à la demande
        - tests / tests_file : assertions d'auto-validation

        input() est saisi directement dans la console, sans réglage préalable.
        """
        default_example = ("# Modifie-moi 🙂\n"
                           'prenom = "Ada"\n'
                           'print("Bonjour", prenom, "!")\n')

        if example_file:
            example = _lire(example_file, "example_file")
        if solution_file:
            solution = _lire(solution_file, "solution_file")
        if tests_file:
            tests = _lire(tests_file, "tests_file")

        code = example if example is not None else default_example

        attrs = [
            "data-python-playground",
            f'data-example-b64="{_b64(code)}"',
            f'data-timeout="{int(timeout)}"',
        ]
        if key:
            attrs.append(f'data-storage-key="{escape(key)}"')
        if solution is not None:
            attrs.append(f'data-solution-b64="{_b64(solution)}"')
        if tests is not None:
            attrs.append(f'data-tests-b64="{_b64(tests)}"')

        boutons = [bouton("run", "fa-play", "Exécuter")]
        if tests is not None:
            boutons.append(bouton("check", "fa-circle-check", "Valider", " btn-check"))
        boutons.append(bouton_icone("clear", "fa-trash", "Effacer l'éditeur"))
        boutons.append(bouton_icone("example", "fa-arrow-rotate-right", "Réinitialiser le code de départ"))
        if solution is not None:
            boutons.append(bouton_icone("solution", "fa-lightbulb", "Afficher la correction",
                                        " btn-solution"))

        zone_stdin = ""

        html = (
            f'<div {" ".join(attrs)} style="--pp-hauteur:{escape(hauteur)}">'
              f'<div class="grid">'
                f'<div class="panel panel-code">'
                  f'<div class="label">{escape(titre)}</div>'
                  f'<div class="editor"></div>'
                  f'<div class="toolbar">{"".join(boutons)}</div>'
                f'</div>'
                f'{zone_stdin}'
                f'<div class="panel panel-sortie">'
                  f'<div class="label">Console</div>'
                  f'<pre class="sortie" aria-live="polite" tabindex="0"></pre>'
                f'</div>'
                f'<div class="panel panel-resultats" hidden>'
                  f'<div class="label">Validation</div>'
                  f'<ul class="resultats"></ul>'
                f'</div>'
                f'<div class="panel panel-correction" hidden>'
                  f'<div class="label">Correction</div>'
                  f'<pre class="correction"><code class="language-python"></code></pre>'
                  f'<div class="toolbar">'
                    f'{bouton("load-solution", "fa-file-import", "Charger dans l\'éditeur")}'
                  f'</div>'
                f'</div>'
              f'</div>'
            f'</div>'
        )
        return Markup(html)

    @env.macro
    def html_css_playground(key="", html_example=None, css_example=None,
                            html_file=None, css_file=None, base_href=None):
        default_html = """<!-- Modifie-moi 🙂 -->
<h1>Hello 👋</h1>
<p>Du <strong>HTML</strong> ici.</p>"""

        default_css = """body {
        font-family:Arial; 
        padding:16px;
        }
h1 {
color:teal;
}"""

        if html_file:
            p = (docs_dir / html_file).resolve()
            if not str(p).startswith(str(docs_dir)):
                raise ValueError("html_file doit être un chemin sous docs/ (sans ../)")
            html_example = p.read_text(encoding="utf-8")

        if css_file:
            p = (docs_dir / css_file).resolve()
            if not str(p).startswith(str(docs_dir)):
                raise ValueError("css_file doit être un chemin sous docs/ (sans ../)")
            css_example = p.read_text(encoding="utf-8")

        html_code = html_example if html_example is not None else default_html
        css_code  = css_example  if css_example  is not None else default_css

        b64_html = base64.b64encode(html_code.encode("utf-8")).decode("ascii")
        b64_css  = base64.b64encode(css_code.encode("utf-8")).decode("ascii")

        storage_attr = f' data-storage-key="{escape(key)}"' if key else ""
        base_attr = f' data-base-href="{escape(base_href)}"' if base_href else ""

        html = (
            f'<div data-htmlcss-playground{storage_attr}{base_attr} '
            f'data-example-html-b64="{b64_html}" data-example-css-b64="{b64_css}">'
              f'<div class="grid">'
                f'<div class="panel">'
                  f'<div class="label">HTML</div>'
                  f'<div class="editor editor-html"></div>'
                f'</div>'
                f'<div class="panel">'
                  f'<div class="label">CSS</div>'
                  f'<div class="editor editor-css"></div>'
                f'</div>'
                f'<div class="panel panel-preview">'
                  f'<div class="label">Rendu</div>'
                  f'<iframe class="preview" sandbox></iframe>'
                  f'<div class="toolbar">'
                    f'{bouton("run", "fa-play", "Exécuter")}'
                    f'{bouton_icone("clear", "fa-trash", "Effacer les éditeurs")}'
                    f'{bouton_icone("example", "fa-arrow-rotate-right", "Réinitialiser le code de départ")}'
                  f'</div>'
                f'</div>'
              f'</div>'
            f'</div>'
        )
        return Markup(html)
    
    
    @env.macro
    def html_playground(key="", example=None, example_file=None, base_href=None):
        default_example = """<!-- Modifie-moi 🙂 -->
<h1>Hello 👋</h1>
<p>Du <strong>HTML</strong> ici.</p>"""

        base_attr = f' data-base-href="{escape(base_href)}"' if base_href else ""

        if example_file:
            p = (docs_dir / example_file).resolve()
            if not str(p).startswith(str(docs_dir)):
                raise ValueError("example_file doit être un chemin sous docs/ (sans ../)")
            example = p.read_text(encoding="utf-8")

        code = example if example is not None else default_example

        # base64 utf-8 (safe en attribut)
        b64 = base64.b64encode(code.encode("utf-8")).decode("ascii")

        storage_attr = f' data-storage-key="{escape(key)}"' if key else ""

        # IMPORTANT: on renvoie une seule ligne (safe pour les admonitions)
        html = (
            f'<div class="grid" data-html-playground{storage_attr}{base_attr} data-example-b64="{b64}">'
              f'<div class="panel"><div class="label">Code HTML</div><div class="editor"></div>'
              f'<div class="toolbar">'
                f'{bouton("run", "fa-play", "Exécuter")}'
                f'{bouton_icone("clear", "fa-trash", "Effacer l\'éditeur")}'
                f'{bouton_icone("example", "fa-arrow-rotate-right", "Réinitialiser le code de départ")}'
              f'</div></div>'
              f'<div class="panel"><div class="label">Rendu</div><iframe class="preview" sandbox="allow-scripts"></iframe></div>'
            f'</div>'
        )
        return Markup(html)
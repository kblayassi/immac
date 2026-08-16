from pathlib import Path
from markupsafe import Markup, escape
import base64

def define_env(env):
    docs_dir = Path(env.conf["docs_dir"]).resolve()

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
                    f'<button class="btn" data-action="run"><i class="fa-solid fa-play"></i> Executer</button>'
                    f'<button class="btn" data-action="clear"><i class="fa-solid fa-trash"></i> Supprimer</button>'
                    f'<button class="btn" data-action="example"><i class="fa-solid fa-arrow-rotate-right"></i> Réinitialiser</button>'
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
                f'<button class="btn" data-action="run"><i class="fa-solid fa-play"></i> Executer</button>'
                f'<button class="btn" data-action="clear"><i class="fa-solid fa-trash"></i> Supprimer</button>'
                f'<button class="btn" data-action="example"><i class="fa-solid fa-arrow-rotate-right"></i> Réinitialiser</button>'
              f'</div></div>'
              f'<div class="panel"><div class="label">Rendu</div><iframe class="preview" sandbox="allow-scripts"></iframe></div>'
            f'</div>'
        )
        return Markup(html)
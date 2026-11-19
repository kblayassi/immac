(async function () {
  // --- Charge CodeMirror depuis ton bundle local (pas de imports statiques) ---
  const BASE = document.currentScript?.src || location.href;
  const BUNDLE_URL = new URL("./codemirror-bundle.js", BASE).href;

  let CM;
  try {
    CM = await import(BUNDLE_URL);
  } catch (e) {
    console.error("[editor-module] import bundle failed:", e);
    return;
  }

  const EditorView = CM.EditorView;
  const EditorState = CM.EditorState;
  const basicSetup = CM.basicSetup;
  const htmlLang = CM.html;
  const cssLang = CM.css; // ⚠️ doit être exporté par ton bundle
  const indentUnit = CM.indentUnit;
  const keymap = CM.keymap;
  const indentMore = CM.indentMore;
  const indentLess = CM.indentLess;

  if (!EditorView || !EditorState || !basicSetup || !htmlLang) {
    console.error("[editor-module] CodeMirror exports missing in bundle:", CM);
    return;
  }

  // Si cssLang n'est pas dispo, on n'empêche pas l'éditeur HTML seul de marcher
  if (!cssLang) {
    console.warn("[editor-module] css() manquant dans codemirror-bundle.js -> l'éditeur HTML+CSS ne pourra pas démarrer.");
  }

  // ------------------ Helpers ------------------
  function decodeB64Utf8(b64) {
    if (!b64) return "";
    if (typeof TextDecoder === "undefined") {
      return decodeURIComponent(escape(atob(b64)));
    }
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  }

  function fixLegacyEntities(s) {
    if (!s) return s;
    // vieux contenus stockés / rendus avec &#10;
    return s.includes("&#10;") ? s.replaceAll("&#10;", "\n") : s;
  }

  function baseHrefFor(block) {
    const rawBase = (block.dataset.baseHref ?? "").trim();
    return rawBase ? new URL(rawBase, document.baseURI).href : "about:srcdoc";
  }

  function wrapHtmlDoc(inputHtml, inputCss, block) {
    const html = (inputHtml || "").trim();
    const css = (inputCss || "").trim();

    const baseTag = `<base href="${baseHrefFor(block)}">`;
    const cssTag = css ? `<style>\n${css}\n</style>` : "";

    const looksLikeFullPage = /<html[\s>]|<body[\s>]|<!doctype/i.test(html);

    if (looksLikeFullPage) {
      // Injecte <base> + <style> dans <head> si possible
      if (/<head[\s>]/i.test(html)) {
        return html.replace(/<head[\s>]*>/i, (m) => `${m}\n${baseTag}\n${cssTag}\n`);
      }
      // Sinon on préfixe
      return `${baseTag}\n${cssTag}\n${html}`;
    }

    // Fragment -> on encapsule
    return `<!doctype html><html><head><meta charset="utf-8">\n${baseTag}\n${cssTag}\n</head><body>${html}</body></html>`;
  }

  function safeJSONParse(s) {
    try { return JSON.parse(s); } catch { return null; }
  }

  // ------------------ HTML playground (1 éditeur) ------------------
  function initHtmlPlayground(block, index) {
    if (block.dataset.initialized === "1") return;
    block.dataset.initialized = "1";

    const editorHost = block.querySelector(".editor");
    const frame = block.querySelector("iframe.preview");
    if (!editorHost || !frame) return;

    const storageKey = block.dataset.storageKey || `html_editor:${location.pathname}:${index}`;
    const metaKey = `${storageKey}:meta`;

    // Exemple
    let exampleText = "";
    if (block.dataset.exampleB64) {
      exampleText = decodeB64Utf8(block.dataset.exampleB64);
    } else {
      const source = block.querySelector("textarea.source");
      exampleText = source ? source.value : "";
    }
    if (!exampleText) {
      exampleText = `<!-- Modifie-moi 🙂 -->\n<h1>Hello 👋</h1>\n<p>Du <strong>HTML</strong> ici.</p>`;
    }
    exampleText = fixLegacyEntities(exampleText);

    const exampleHash = block.dataset.exampleB64 || btoa(unescape(encodeURIComponent(exampleText)));

    // StartDoc : localStorage (sauf si l'exemple a changé)
    const meta = safeJSONParse(localStorage.getItem(metaKey) || "");
    let startDoc = localStorage.getItem(storageKey) ?? exampleText;
    startDoc = fixLegacyEntities(startDoc);

    if (!meta || meta.hash !== exampleHash) {
      startDoc = exampleText;
      localStorage.setItem(storageKey, startDoc);
      localStorage.setItem(metaKey, JSON.stringify({ hash: exampleHash }));
    }

    const render = (view) => {
      const code = view.state.doc.toString();
      frame.srcdoc = wrapHtmlDoc(code, "", block);
      localStorage.setItem(storageKey, code);
    };

    let debounce = null;
    const view = new EditorView({
      parent: editorHost,
      state: EditorState.create({
        doc: startDoc,
        extensions: [
          basicSetup,
          EditorState.tabSize.of(4),
          indentUnit.of("\t"),
          keymap.of([
            { key: "Tab", run: indentMore, preventDefault: true },
            { key: "Shift-Tab", run: indentLess, preventDefault: true },
          ]),
          htmlLang(),
          EditorView.updateListener.of((u) => {
            if (!u.docChanged) return;
            clearTimeout(debounce);
            debounce = setTimeout(() => render(view), 120);
          }),
        ],
      }),
    });

    block.querySelector('[data-action="run"]')?.addEventListener("click", () => render(view));
    block.querySelector('[data-action="clear"]')?.addEventListener("click", () => {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: "" } });
      render(view);
    });
    block.querySelector('[data-action="example"]')?.addEventListener("click", () => {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: exampleText } });
      localStorage.setItem(storageKey, exampleText);
      localStorage.setItem(metaKey, JSON.stringify({ hash: exampleHash }));
      render(view);
    });

    render(view);
  }

  // ------------------ HTML+CSS playground (2 éditeurs) ------------------
  function initHtmlCssPlayground(block, index) {
    if (block.dataset.initialized === "1") return;
    block.dataset.initialized = "1";

    if (!cssLang) {
      console.error("[editor-module] Impossible d'init HTML+CSS: css() non exporté par codemirror-bundle.js");
      return;
    }

    const hostHtml = block.querySelector(".editor-html");
    const hostCss = block.querySelector(".editor-css");
    const frame = block.querySelector("iframe.preview");
    if (!hostHtml || !hostCss || !frame) return;

    const baseKey = block.dataset.storageKey || `htmlcss_editor:${location.pathname}:${index}`;
    const htmlKey = `${baseKey}:html`;
    const cssKey = `${baseKey}:css`;
    const metaKey = `${baseKey}:meta`;

    let exampleHtml = decodeB64Utf8(block.dataset.exampleHtmlB64 || "");
    let exampleCss = decodeB64Utf8(block.dataset.exampleCssB64 || "");

    if (!exampleHtml) {
      exampleHtml = `<!-- Modifie-moi 🙂 -->\n<h1>Hello 👋</h1>\n<p>Du <strong>HTML</strong> ici.</p>`;
    }
    if (!exampleCss) {
      exampleCss = `body{font-family:Arial; padding:16px;}\nh1{color:teal;}`;
    }

    exampleHtml = fixLegacyEntities(exampleHtml);
    exampleCss = fixLegacyEntities(exampleCss);

    const exampleHash = `${block.dataset.exampleHtmlB64 || ""}|${block.dataset.exampleCssB64 || ""}` ||
                        `${btoa(unescape(encodeURIComponent(exampleHtml)))}|${btoa(unescape(encodeURIComponent(exampleCss)))}`;

    const meta = safeJSONParse(localStorage.getItem(metaKey) || "");
    let startHtml = localStorage.getItem(htmlKey) ?? exampleHtml;
    let startCss = localStorage.getItem(cssKey) ?? exampleCss;
    startHtml = fixLegacyEntities(startHtml);
    startCss = fixLegacyEntities(startCss);

    // Si l'exemple a changé, on repart automatiquement sur l'exemple
    if (!meta || meta.hash !== exampleHash) {
      startHtml = exampleHtml;
      startCss = exampleCss;
      localStorage.setItem(htmlKey, startHtml);
      localStorage.setItem(cssKey, startCss);
      localStorage.setItem(metaKey, JSON.stringify({ hash: exampleHash }));
    }

    let viewHtml, viewCss;
    let debounce = null;

    const render = () => {
      const htmlCode = viewHtml.state.doc.toString();
      const cssCode = viewCss.state.doc.toString();
      frame.srcdoc = wrapHtmlDoc(htmlCode, cssCode, block);
      localStorage.setItem(htmlKey, htmlCode);
      localStorage.setItem(cssKey, cssCode);
    };

    const scheduleRender = () => {
      clearTimeout(debounce);
      debounce = setTimeout(render, 120);
    };

    viewHtml = new EditorView({
      parent: hostHtml,
      state: EditorState.create({
        doc: startHtml,
        extensions: [
          basicSetup,
          EditorState.tabSize.of(4),
          indentUnit.of("\t"),
          keymap.of([
            { key: "Tab", run: indentMore, preventDefault: true },
            { key: "Shift-Tab", run: indentLess, preventDefault: true },
          ]),
          htmlLang(),
          EditorView.updateListener.of((u) => {
            if (!u.docChanged) return;
            scheduleRender();
          }),
        ],
      }),
    });

    viewCss = new EditorView({
      parent: hostCss,
      state: EditorState.create({
        doc: startCss,
        extensions: [
          basicSetup,
          EditorState.tabSize.of(4),
          indentUnit.of("\t"),
          keymap.of([
            { key: "Tab", run: indentMore, preventDefault: true },
            { key: "Shift-Tab", run: indentLess, preventDefault: true },
          ]),
          cssLang(),
          EditorView.updateListener.of((u) => {
            if (!u.docChanged) return;
            scheduleRender();
          }),
        ],
      }),
    });

    block.querySelector('[data-action="run"]')?.addEventListener("click", render);

    block.querySelector('[data-action="clear"]')?.addEventListener("click", () => {
      viewHtml.dispatch({ changes: { from: 0, to: viewHtml.state.doc.length, insert: "" } });
      viewCss.dispatch({ changes: { from: 0, to: viewCss.state.doc.length, insert: "" } });
      render();
    });

    block.querySelector('[data-action="example"]')?.addEventListener("click", () => {
      viewHtml.dispatch({ changes: { from: 0, to: viewHtml.state.doc.length, insert: exampleHtml } });
      viewCss.dispatch({ changes: { from: 0, to: viewCss.state.doc.length, insert: exampleCss } });
      localStorage.setItem(htmlKey, exampleHtml);
      localStorage.setItem(cssKey, exampleCss);
      localStorage.setItem(metaKey, JSON.stringify({ hash: exampleHash }));
      render();
    });

    render();
  }

  // ------------------ Boot ------------------
  function boot() {
    document.querySelectorAll("[data-html-playground]").forEach((b, i) => initHtmlPlayground(b, i));
    document.querySelectorAll("[data-htmlcss-playground]").forEach((b, i) => initHtmlCssPlayground(b, i));
  }

  if (window.document$?.subscribe) window.document$.subscribe(boot);
  else window.addEventListener("DOMContentLoaded", boot);

  boot();
})();
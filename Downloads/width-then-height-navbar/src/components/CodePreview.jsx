import { useMemo, useState } from "react";

function buildPreviewSrcDoc({ html, css }) {
  const safeCss = css ?? "";
  const safeHtml = html ?? "";

  // If the HTML references styles.css via a link tag, replace it with inline CSS.
  // Also ensure links don't navigate the parent.
  const withInlineCss = safeHtml.replace(
    /<link[^>]*rel=["']stylesheet["'][^>]*href=["']styles\.css["'][^>]*>/i,
    `<style>${safeCss}</style>`
  );

  const hasStyleAlready = /<style[\s>]/i.test(withInlineCss);
  const needsCssInjection = safeCss && !hasStyleAlready;

  const injected =
    needsCssInjection && /<\/head>/i.test(withInlineCss)
      ? withInlineCss.replace(/<\/head>/i, `<style>${safeCss}</style></head>`)
      : withInlineCss;

  // Add <base> so <a href> opens in new tab (within iframe) instead of navigating parent.
  const withBase = /<base[\s>]/i.test(injected)
    ? injected
    : injected.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n    <base target="_blank" />`);

  return withBase;
}

export default function CodePreview({
  title = "Snippet",
  files,
  showPreview = false,
  previewHtmlFile = "index.html",
  previewCssFile = "styles.css",
}) {
  const fileKeys = useMemo(() => Object.keys(files || {}), [files]);
  const [activeKey, setActiveKey] = useState(() => fileKeys[0] || "");
  const active = files?.[activeKey];

  const language = useMemo(() => {
    const k = (activeKey || "").toLowerCase();
    if (k.endsWith(".html") || k.endsWith(".htm")) return "html";
    if (k.endsWith(".css")) return "css";
    return "text";
  }, [activeKey]);

  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const highlightHtml = (code) => {
    let s = escapeHtml(code);

    // Comments
    s = s.replaceAll(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-comment">$1</span>');

    // Tags + attributes (simple heuristic)
    s = s.replaceAll(
      /(&lt;\/?)([a-zA-Z][\w:-]*)([\s\S]*?)(\/?&gt;)/g,
      (m, open, tag, rest, close) => {
        const highlightedRest = rest
          // attribute="value"
          .replaceAll(
            /(\s)([a-zA-Z_:][\w:.-]*)(=)(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;)/g,
            '$1<span class="tok-attr">$2</span><span class="tok-punct">$3</span><span class="tok-string">$4</span>'
          )
          // bare attributes
          .replaceAll(/(\s)([a-zA-Z_:][\w:.-]*)(?=\s|\/?&gt;)/g, '$1<span class="tok-attr">$2</span>');

        return `<span class="tok-punct">${open}</span><span class="tok-tag">${tag}</span>${highlightedRest}<span class="tok-punct">${close}</span>`;
      }
    );

    return s;
  };

  const highlightCss = (code) => {
    let s = escapeHtml(code);

    // Comments
    s = s.replaceAll(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');

    // At-rules
    s = s.replaceAll(/(@[\w-]+)/g, '<span class="tok-atrule">$1</span>');

    // Strings
    s = s.replaceAll(/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;)/g, '<span class="tok-string">$1</span>');

    // Hex colors
    s = s.replaceAll(/(#(?:[0-9a-fA-F]{3,8}))\b/g, '<span class="tok-hex">$1</span>');

    // Numbers + units
    s = s.replaceAll(/(\b\d+(\.\d+)?)(px|rem|em|%|vh|vw|ms|s)?\b/g, '<span class="tok-number">$1</span><span class="tok-unit">$3</span>');

    // Property names (foo: ...)
    s = s.replaceAll(/(^|\s)([a-zA-Z-]+)(\s*:)/g, '$1<span class="tok-prop">$2</span><span class="tok-punct">$3</span>');

    // Common functions (rgb(), var(), etc.)
    s = s.replaceAll(/\b([a-zA-Z-]+)(?=\()/g, '<span class="tok-fn">$1</span>');

    return s;
  };

  const highlightedHtml = useMemo(() => {
    const code = active?.code ?? "";
    if (language === "html") return highlightHtml(code);
    if (language === "css") return highlightCss(code);
    return escapeHtml(code);
  }, [active?.code, language]);

  const previewSrcDoc = useMemo(() => {
    if (!showPreview) return "";
    const html = files?.[previewHtmlFile]?.code ?? "";
    const css = files?.[previewCssFile]?.code ?? "";
    if (!html) return "";
    return buildPreviewSrcDoc({ html, css });
  }, [files, previewCssFile, previewHtmlFile, showPreview]);

  const onCopy = async () => {
    const text = active?.code ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  if (!fileKeys.length) return null;

  return (
    <section className="code-preview">
      {showPreview ? (
        <div className="code-preview-pane" aria-label="Preview">
          <div className="code-preview-viewport">
            <iframe
              title="snippet-preview"
              className="code-preview-iframe"
              srcDoc={previewSrcDoc}
              // Keep this sandboxed: no scripts.
              sandbox=""
            />
          </div>
        </div>
      ) : null}

      <div className="code-preview-tabs" role="tablist" aria-label="Files">
        {fileKeys.map((k) => (
          <button
            key={k}
            type="button"
            className={`code-tab ${k === activeKey ? "active" : ""}`}
            onClick={() => setActiveKey(k)}
            role="tab"
            aria-selected={k === activeKey}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="code-layout">
        <pre className="code-block" aria-label={`${activeKey} code`}>
          <code
            className={`lang-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </section>
  );
}



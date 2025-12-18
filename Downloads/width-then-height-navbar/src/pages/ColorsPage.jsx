import React from "react";

export default function ColorsPage({ navigate }) {
  const [copied, setCopied] = React.useState(false);

  const CODE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Hover Highlight Words</title>

    <!-- Instrumental font (Google Fonts) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Instrumental+Serif:ital@0;1&display=swap"
      rel="stylesheet"
    />

    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #fff;
      }

      .line {
        font-family: "Instrument Serif", serif;
        font-size: 50px;
        line-height: 1.1;
        letter-spacing: -2px;
        color: #111;
        padding: 24px;
        text-align: center;
      }

      .word {
        position: relative;
        display: inline-block;
        padding: 0 0em; /* tiny breathing room for highlight */
        cursor: default;
      }

      /* the animated highlight */
      .word::before {
        content: "";
        position: absolute;
        left: -0.04em;
        right: -0.04em;
        bottom: 0.05em;
        height: 0.55em;
        background: #ffeb3b; /* yellow */
        z-index: -1;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 220ms ease;
        border-radius: 0.12em;
      }

      .word:hover::before {
        transform: scaleX(1);
      }
    </style>
  </head>
  <body>
    <div class="line" aria-label="Hover over each word to highlight">
      <span class="word">Hover</span>
      <span class="word">over</span>
      <span class="word">each</span>
      <span class="word">word</span>
      <br />
      <span class="word">to</span>
      <span class="word">see</span>
      <span class="word">it</span>
      <span class="word">glow</span>
      <span class="word">yellow.</span>
    </div>
  </body>
</html>`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">Color Palettes</h1>
        <p className="detail-subtitle">
          Hover over each word in the preview to see the highlight effect.
        </p>
      </section>

      <section className="library-card" aria-label="Hover highlight component">
        <div className="library-top">
          <div className="library-title">Hover Highlight Words</div>
          <button className="code-btn" type="button" onClick={onCopy}>
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>

        <div className="library-preview">
          <div className="hover-highlight-stage">
            <div className="hover-highlight-line">
              <span className="hover-highlight-word">Hover</span>
              <span className="hover-highlight-word">over</span>
              <span className="hover-highlight-word">each</span>
              <span className="hover-highlight-word">word</span>
              <br />
              <span className="hover-highlight-word">to</span>
              <span className="hover-highlight-word">see</span>
              <span className="hover-highlight-word">it</span>
              <span className="hover-highlight-word">glow</span>
              <span className="hover-highlight-word">yellow.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



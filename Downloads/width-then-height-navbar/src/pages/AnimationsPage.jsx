import CodePreview from "../components/CodePreview.jsx";

export default function AnimationsPage({ navigate }) {
  const htmlCode = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="wrap">
      <h1>Hello World</h1>
      <p>This is a tiny HTML + CSS snippet.</p>
    </main>
  </body>
</html>`;

  const cssCode = `:root {
  --bg: #0b0b0c;
  --card: rgba(255, 255, 255, 0.06);
  --text: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.65);
  --ring: rgba(124, 255, 90, 0.65);
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  background: radial-gradient(1200px 700px at 50% 0%, #1a1a1d, var(--bg));
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}

.wrap {
  min-height: 100%;
  display: grid;
  place-content: center;
  gap: 10px;
  padding: 32px;
  text-align: center;
}

.wrap h1 {
  margin: 0;
  font-size: 56px;
  letter-spacing: -1.2px;
}

.wrap p {
  margin: 0;
  color: var(--muted);
}

.wrap {
  border: 1px solid rgba(255,255,255,0.10);
  background: var(--card);
  border-radius: 18px;
  padding: 40px 42px;
  box-shadow: 0 18px 60px rgba(0,0,0,0.35);
}

.wrap:focus-within {
  outline: 2px solid var(--ring);
  outline-offset: 6px;
}`;
  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">Animation Presets</h1>
        <p className="detail-subtitle">
          HTML/CSS snippet preview (display only).
        </p>
      </section>






      <CodePreview
        showPreview
        files={{
          "index.html": { code: htmlCode },
          "styles.css": { code: cssCode },
        }}
      />


    </main>
  );
}



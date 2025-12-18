import React from "react";

export default function ComponentsPage({ navigate }) {
  const [copied, setCopied] = React.useState(false);
  const slotRef = React.useRef(null);
  const currentRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const measurerRef = React.useRef(null);

  const CODE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sleek Word Swap</title>

    <!-- Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <style>
      :root {
        --bg: #000;
        --fg: rgba(255, 255, 255, 0.92);
        --muted: rgba(255, 255, 255, 0.62);
        --pillBorder: rgba(255, 255, 255, 0.12);
        --pillTop: rgba(255, 255, 255, 0.08);
        --pillBottom: rgba(255, 255, 255, 0.03);
      }

      html,
      body {
        height: 100%;
      }

      body {
        margin: 0;
        display: grid;
        place-items: center;
        background: var(--bg);
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto,
          Helvetica, Arial;
        color: var(--fg);
      }

      .wrap {
        padding: 28px 30px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        border-radius: 18px;
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(10px);
      }

      .line {
        font-size: clamp(22px, 3.2vw, 40px);
        line-height: 1.15;
        letter-spacing: -0.02em;
        font-weight: 500;
        color: var(--muted);
        white-space: nowrap;
      }

      /* Animated word slot (smoothly resizes so surrounding text shifts nicely) */
      .slot {
        display: inline-block;
        vertical-align: bottom;
        position: relative;
        height: 1.15em;
        overflow: hidden;

        width: var(--w, 6ch);
        transition: width 260ms cubic-bezier(0.2, 0.9, 0.2, 1);
      }

      /* pill highlight behind the changing word */
      .pill {
        position: absolute;
        inset: -0.18em -0.25em;
        background: linear-gradient(180deg, var(--pillTop), var(--pillBottom));
        border: 1px solid var(--pillBorder);
        border-radius: 999px;
        pointer-events: none;
      }

      .word {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        font-weight: 600;
        text-align: center;
        will-change: transform, opacity;
      }

      /* idle positions */
      .slot[data-state="idle"] .word.current {
        transform: translateY(0%);
        opacity: 1;
      }
      .slot[data-state="idle"] .word.next {
        transform: translateY(120%);
        opacity: 0;
      }

      /* quick but smooth swap */
      .slot[data-state="swap"] .word.current {
        transform: translateY(-120%);
        opacity: 0;
        transition: transform 240ms cubic-bezier(0.2, 0.9, 0.2, 1),
          opacity 240ms linear;
      }
      .slot[data-state="swap"] .word.next {
        transform: translateY(0%);
        opacity: 1;
        transition: transform 240ms cubic-bezier(0.2, 0.9, 0.2, 1),
          opacity 240ms linear;
      }

      @media (prefers-reduced-motion: reduce) {
        .slot {
          transition: none;
          width: auto;
          height: auto;
          overflow: visible;
        }
        .pill {
          display: none;
        }
        .word {
          position: static;
        }
        .word.next {
          display: none;
        }
      }
    </style>
  </head>

  <body>
    <div class="wrap">
      <div class="line">
        Build something
        <span class="slot" id="slot" data-state="idle" aria-live="polite">
          <span class="pill" aria-hidden="true"></span>
          <span class="word current" id="currentWord">sleek</span>
          <span class="word next" id="nextWord">fast</span>
        </span>
        with Inter.
      </div>
    </div>

    <script>
      const words = [
        { text: "sleek", color: "#7aa2ff" },
        { text: "fast", color: "#5bffd1" },
        { text: "modern", color: "#ffb86b" },
        { text: "effortless", color: "#ff6bd6" },
        { text: "enterprise-ready", color: "#a78bfa" },
      ];

      const slot = document.getElementById("slot");
      const currentEl = document.getElementById("currentWord");
      const nextEl = document.getElementById("nextWord");

      // Hidden measurer so we can animate width to match the next word
      const measurer = document.createElement("span");
      measurer.style.position = "absolute";
      measurer.style.visibility = "hidden";
      measurer.style.whiteSpace = "nowrap";

      // Match typography so measurement is accurate
      const cs = getComputedStyle(currentEl);
      measurer.style.font = cs.font;
      measurer.style.letterSpacing = cs.letterSpacing;
      measurer.style.fontWeight = cs.fontWeight;

      document.body.appendChild(measurer);

      function setSlotWidthFor(text) {
        measurer.textContent = text;
        const w = measurer.getBoundingClientRect().width;
        slot.style.setProperty("--w", \`\${Math.ceil(w + 14)}px\`); // small breathing room
      }

      let i = 0;

      function setCurrent(idx) {
        currentEl.textContent = words[idx].text;
        currentEl.style.color = words[idx].color;
        setSlotWidthFor(words[idx].text);
      }

      // init
      setCurrent(i);

      const HOLD_MS = 1800; // time the word sits still
      const SWAP_MS = 240; // quick smooth swap duration

      setInterval(() => {
        const nextIndex = (i + 1) % words.length;
        const next = words[nextIndex];

        nextEl.textContent = next.text;
        nextEl.style.color = next.color;

        // resize first so the sentence shifts smoothly
        setSlotWidthFor(next.text);

        // kick the transition
        requestAnimationFrame(() => {
          slot.dataset.state = "swap";
        });

        // commit after animation
        setTimeout(() => {
          i = nextIndex;
          setCurrent(i);
          slot.dataset.state = "idle";
        }, SWAP_MS);
      }, HOLD_MS);
    </script>
  </body>
</html>
`;

  React.useEffect(() => {
    const slot = slotRef.current;
    const currentEl = currentRef.current;
    const nextEl = nextRef.current;
    const measurer = measurerRef.current;
    if (!slot || !currentEl || !nextEl || !measurer) return;

    const words = [
      { text: "sleek", color: "#7aa2ff" },
      { text: "fast", color: "#5bffd1" },
      { text: "modern", color: "#ffb86b" },
      { text: "effortless", color: "#ff6bd6" },
      { text: "enterprise-ready", color: "#a78bfa" },
    ];

    // Match typography for accurate measurement
    const cs = getComputedStyle(currentEl);
    measurer.style.font = cs.font;
    measurer.style.letterSpacing = cs.letterSpacing;
    measurer.style.fontWeight = cs.fontWeight;

    const setSlotWidthFor = (text) => {
      measurer.textContent = text;
      const w = measurer.getBoundingClientRect().width;
      slot.style.setProperty("--w", `${Math.ceil(w + 14)}px`);
    };

    let i = 0;
    const setCurrent = (idx) => {
      currentEl.textContent = words[idx].text;
      currentEl.style.color = words[idx].color;
      setSlotWidthFor(words[idx].text);
    };

    setCurrent(i);

    const HOLD_MS = 1800;
    const SWAP_MS = 240;

    const interval = window.setInterval(() => {
      const nextIndex = (i + 1) % words.length;
      const next = words[nextIndex];

      nextEl.textContent = next.text;
      nextEl.style.color = next.color;
      setSlotWidthFor(next.text);

      requestAnimationFrame(() => {
        slot.dataset.state = "swap";
      });

      window.setTimeout(() => {
        i = nextIndex;
        setCurrent(i);
        slot.dataset.state = "idle";
      }, SWAP_MS);
    }, HOLD_MS);

    return () => window.clearInterval(interval);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
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
        <h1 className="detail-title">UI Components</h1>
        <p className="detail-subtitle">
          Edit `src/pages/ComponentsPage.jsx` and put anything you want here.
        </p>
      </section>

      <section className="library-card" aria-label="Word swap component">
        <div className="library-top">
          <div className="library-title">Sleek Word Swap</div>
          <button className="code-btn" type="button" onClick={onCopy}>
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>

        <div className="library-preview">
          <div className="word-swap-stage">
            <span ref={measurerRef} className="word-swap-measurer" aria-hidden="true" />
            <div className="word-swap-wrap">
              <div className="word-swap-line">
                Build something{" "}
                <span
                  className="word-swap-slot"
                  ref={slotRef}
                  data-state="idle"
                  aria-live="polite"
                >
                  <span className="word-swap-pill" aria-hidden="true" />
                  <span className="word-swap-word current" ref={currentRef}>
                    sleek
                  </span>
                  <span className="word-swap-word next" ref={nextRef}>
                    fast
                  </span>
                </span>{" "}
                with Inter.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



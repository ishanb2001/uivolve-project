import AssetCard from "../components/AssetCard.jsx";
import { useEffect, useMemo, useRef, useState } from "react";


export default function Home({ navigate }) {
  const CLOSE_MS = 420;
  const closeTimerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);

  const rows = useMemo(
    () => [
      [
        {
          title: "Icon Set Collection",
          description:
            "A comprehensive library of modern icons perfect for any project. Includes multiple styles and formats.",
          emoji: "🎨",
          path: "/icons",
          speed: "1",
        },
        {
          title: "UI Components",
          description:
            "Ready-to-use components including buttons, cards, forms, and navigation elements.",
          emoji: "🎭",
          path: "/components",
          speed: "1",
        },
      ],
      [
        {
          title: "Color Palettes",
          description:
            "Curated color schemes designed for modern interfaces. Includes light and dark variants.",
          emoji: "🌈",
          path: "/colors",
          speed: "2",
        },
        {
          title: "Layout Templates",
          description:
            "Professional layout templates for dashboards, landing pages, and applications.",
          emoji: "📐",
          path: "/layouts",
          speed: "2",
        },
      ],
      [
        {
          title: "Animation Presets",
          description:
            "Smooth animations and transitions ready to implement in your projects.",
          emoji: "✨",
          path: "/animations",
          speed: "1",
        },
        {
          title: "Illustration Pack",
          description:
            "Beautiful illustrations and graphics to enhance your design projects.",
          emoji: "🖼️",
          path: "/illustrations",
          speed: "1",
        },
      ],
    ],
    []
  );

  const ICON_SET_COLLECTION_HTML = useMemo(
    () => `<!DOCTYPE html>
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
`,
    []
  );

  const UI_COMPONENTS_HTML = useMemo(
    () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Scroll Marquee</title>

    <!-- Inter font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap"
      rel="stylesheet"
    />

    <style>
      body {
        height: 300vh;
        margin: 0;
        background: #312e2e;
        font-family: "Inter", system-ui, sans-serif;
      }

      .marquee {
        position: sticky;
        top: 24px;
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        padding: 20px 0;
      }

      .marquee__inner {
        display: flex;
        width: max-content;
        will-change: transform;
      }

      .marquee__content {
        display: flex;
      }

      .marquee__content span {
        white-space: nowrap;
        padding-right: 3rem;
        font-size: 48px;
        font-weight: 600;
        letter-spacing: -1.5px;
        color: #000;
      }
    </style>
  </head>
  <body>
    <div class="marquee">
      <div class="marquee__inner" id="marqueeTrack">
        <div class="marquee__content">
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
        </div>
        <div class="marquee__content">
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
          <span>SCROLL-DRIVEN MARQUEE</span>
        </div>
      </div>
    </div>

    <script>
      const track = document.getElementById("marqueeTrack");
      let offset = 0;

      window.addEventListener("scroll", () => {
        offset = window.scrollY * 0.35; // speed control
        const loopWidth = track.scrollWidth / 2;
        track.style.transform = \`translateX(\${-offset % loopWidth}px)\`;
      });
    </script>
  </body>
</html>
`,
    []
  );

  const UI_COLOR_HTML = useMemo(
    () => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hover Circle Cards</title>

    <!-- Inter Font -->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        box-sizing: border-box;
      }

      body {
        font-family: "Inter", sans-serif;
        background: #f1f1f1;
        padding: 40px;
        margin: 0;
      }

      /* Full-width row */
      .card-row {
        width: 100%;
        display: flex;
        gap: 24px;
      }

      /* Card */
      .card {
        flex: 1;
        padding: 24px;
        border-radius: 14px;
        position: relative;
        overflow: hidden;
        background-color: #ffffff;
        font-weight: 700;
        border: none;

        min-height: 180px;

        display: flex;
        align-items: flex-end;
        justify-content: flex-start;

        transition: color 0.3s;
        color: #111;
      }

      /* Hover circle wrapper */
      .hover-circle {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
      }

      /* Bottom-right hover circle */
      .hover-circle::before {
        content: "";
        position: absolute;
        top: 95%;
        left: 95%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: #2e2e2e;
        transition: width 0.3s ease-in-out, height 0.3s ease-in-out,
          top 0.3s ease-in-out, left 0.3s ease-in-out;
        z-index: 0;
        transform: translate(-50%, -50%);
      }

      .hover-circle:hover::before {
        width: 200%;
        height: 1700%;
      }

      /* Text + icon color change */
      .card:hover {
        color: #ffffff;
      }

      /* Top-left icon */
      .top-icon {
        position: absolute;
        top: 18px;
        left: 18px;
        z-index: 2;
        width: 22px;
        height: 22px;
      }

      .top-icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor; /* 🔑 inherits text color */
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }

      /* Content */
      .content {
        position: relative;
        z-index: 1;
        padding-right: 44px;
        max-width: 100%;
      }

      .title {
        display: block;
        font-size: 40px;
        line-height: 1.15;
        font-weight: 500;
        letter-spacing: -2px;
      }

      .desc {
        display: none;
        font-size: 16px;
        line-height: 1.35;
        font-weight: 600;
        max-width: 34ch;
      }

      .card.expanded .title {
        display: none;
      }
      .card.expanded .desc {
        display: block;
      }

      /* Plus button */
      .plus-btn {
        position: absolute;
        right: 16px;
        bottom: 16px;
        z-index: 2;
        width: 34px;
        height: 34px;
        border-radius: 12px;
        border: none;
        background: #ffffff;
        display: grid;
        place-items: center;
        cursor: pointer;
        padding: 0;
        transition: transform 0.15s ease;
      }

      .plus-btn:hover {
        transform: translateY(-1px);
      }
      .plus-btn:active {
        transform: scale(0.97);
      }

      .plus-btn svg {
        width: 16px;
        height: 16px;
        stroke: #111;
        stroke-width: 2.25;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        transition: transform 0.18s ease;
      }

      .card.expanded .plus-btn svg {
        transform: rotate(45deg);
      }

      /* Responsive */
      @media (max-width: 900px) {
        .card-row {
          flex-direction: column;
        }
        .desc {
          max-width: 60ch;
        }
      }
    </style>
  </head>

  <body>
    <div class="card-row">
      <div class="card hover-circle" data-card>
        <!-- Top-left icon -->
        <div class="top-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>

        <div class="content">
          <span class="title">Retro Red</span>
          <span class="desc"
            >A warm, nostalgic palette with bold contrast—made for
            attention-grabbing accents.</span
          >
        </div>

        <button
          class="plus-btn"
          type="button"
          data-toggle
          aria-label="Toggle description"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </button>
      </div>

      <div class="card hover-circle" data-card>
        <div class="top-icon">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>

        <div class="content">
          <span class="title">Vintage Blue</span>
          <span class="desc"
            >Cool and calm with a premium feel—perfect for UI surfaces and quiet
            emphasis.</span
          >
        </div>

        <button class="plus-btn" type="button" data-toggle>
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </button>
      </div>

      <div class="card hover-circle" data-card>
        <div class="top-icon">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>

        <div class="content">
          <span class="title">Classic Green</span>
          <span class="desc"
            >Fresh, modern energy with a natural tone—great for success states
            and highlights.</span
          >
        </div>

        <button class="plus-btn" type="button" data-toggle>
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </button>
      </div>
    </div>

    <script>
      document.querySelectorAll("[data-toggle]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          btn.closest("[data-card]").classList.toggle("expanded");
        });
      });
    </script>
  </body>
</html>

`,
    []
  );


  const codeByTitle = useMemo(
    () => ({
      "Icon Set Collection": ICON_SET_COLLECTION_HTML,
      "UI Components": UI_COLOR_HTML,
      "Color Palettes": UI_COMPONENTS_HTML,
      "Layout Templates": `// TODO: paste your Layout Templates snippet here`,
      "Animation Presets": `// TODO: paste your Animation Presets snippet here`,
      "Illustration Pack": `// TODO: paste your Illustration Pack snippet here`,
    }),
    [ICON_SET_COLLECTION_HTML, UI_COMPONENTS_HTML, UI_COLOR_HTML]
  );

  const openModal = (card) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setCopied(false);
    setIsClosing(false);
    setActiveCard(card);
  };

  const closeModal = () => {
    if (!activeCard || isClosing) return;
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActiveCard(null);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, CLOSE_MS);
  };

  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const onCopy = async () => {
    const title = activeCard?.title || "Snippet";
    const text = codeByTitle[title] ?? `// TODO: paste code for ${title}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // ignore
    }
  };

  return (

    
    <main>
      
        

        <div data-scroll-section>
          <div className="hero" data-scroll data-scroll-speed="2">
            <span data-scroll className="hero-label">NEW COLLECTION</span>

            <h1 data-scroll data-scroll-speed="1" className="hero-title">Build better sites, faster</h1>

            <p data-scroll data-scroll-speed="2" className="hero-subtitle">
              Discover YUYA, a minimalist Framer template designed for creatives,
              designers, developers.
            </p>

            <div className="button-group" data-scroll data-scroll-speed="2">
              <button className="btn">Browse Assets</button>
              <button className="btn primary">Get Started</button>
            </div>
          </div>

          

          <section className="cards-section">
            {rows.map((items, idx) => (
              <div
                key={idx}
                data-scroll
                data-scroll-speed={items?.[0]?.speed ?? "1"}
                className="cards-row"
              >
                {items.map((c) => (
                  <AssetCard
                    key={c.path}
                    title={c.title}
                    description={c.description}
                    emoji={c.emoji}
                    onClick={() => openModal(c)}
                  />
                ))}
              </div>
            ))}
          </section>
        </div>
      
      {activeCard ? (
        <>
          <div
            className={`modal-backdrop ${isClosing ? "modal-closing" : ""}`}
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            className={`modal-container ${isClosing ? "modal-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCard.title} preview`}
          >
            <button className="modal-close" type="button" onClick={closeModal}>
              ×
            </button>

            <div className="modal-content">
              <h2 className="modal-title">{activeCard.title}</h2>
              <p className="modal-text">{activeCard.description}</p>

              <div className="library-modal">
                <div className="library-modal-preview" aria-label="Preview box">
                  {String(codeByTitle[activeCard.title] ?? "").trimStart().startsWith("<!DOCTYPE html>") ? (
                    <div className="library-modal-preview-frame">
                      <iframe
                        className="library-modal-iframe"
                        title={`${activeCard.title} preview`}
                        srcDoc={codeByTitle[activeCard.title]}
                        sandbox="allow-scripts"
                      />
                    </div>
                  ) : (
                    <div className="library-modal-preview-inner">
                      <div className="library-modal-preview-emoji" aria-hidden="true">
                        {activeCard.emoji}
                      </div>
                      <div className="library-modal-preview-label">
                        Preview goes here (you’ll swap in the real UI later)
                      </div>
                      <div className="library-modal-preview-sample">
                        <button className="btn primary" type="button">
                          Example Button
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="library-modal-actions">
                  <button className="btn primary" type="button" onClick={onCopy}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}



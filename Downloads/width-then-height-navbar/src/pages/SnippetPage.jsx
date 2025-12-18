import { useEffect, useMemo, useRef, useState } from "react";

export default function SnippetPage({ navigate }) {
  const demoScrollRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const snippet = useMemo(
    () => `// Locomotive Scroll (React) – minimal setup
// 1) npm i locomotive-scroll
// 2) Import CSS once (e.g. in main.jsx):  import "locomotive-scroll/dist/locomotive-scroll.css";
// 3) Wrap your app content in a [data-scroll-container] div and init Locomotive on it.

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export function useLocomotiveScroll(deps = []) {
  const scrollRef = useRef(null);
  const locoRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });
    locoRef.current = scroll;
    return () => scroll.destroy();
  }, []);

  useEffect(() => {
    locoRef.current?.update?.();
  }, deps);

  return scrollRef;
}

// App.jsx
export default function App() {
  const scrollRef = useLocomotiveScroll([]);
  return (
    <div ref={scrollRef} data-scroll-container>
      <section data-scroll-section>
        <h1 data-scroll data-scroll-speed="1">Parallax heading</h1>
        <p data-scroll data-scroll-speed="2">Faster element</p>
      </section>
    </div>
  );
}
`,
    []
  );

  useEffect(() => {
    const el = demoScrollRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll("[data-speed]"));

    const update = () => {
      const y = el.scrollTop;
      for (const node of items) {
        const speed = Number(node.getAttribute("data-speed") || "1");
        // Simulate Locomotive-style "different scroll speeds" inside the box:
        const translate = y * (speed - 1) * 0.22;
        node.style.transform = `translate3d(0, ${translate}px, 0)`;
      }
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
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
        <h1 className="detail-title">Locomotive Scroll Snippet</h1>
        <p className="detail-subtitle">
          Scroll inside the box to see a parallax-style effect, then copy the
          full LocomotiveScroll setup code.
        </p>
      </section>

      <section className="snippet-card" aria-label="Locomotive Scroll snippet">
        <div className="snippet-top">
          <div className="snippet-title">Single snippet</div>
          <button className="code-btn" type="button" onClick={onCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="snippet-demo">
          <div className="snippet-demo-hint">
            Scroll inside this box (trackpad / mouse wheel)
          </div>

          <div className="snippet-demo-scroll" ref={demoScrollRef}>
            <div className="snippet-demo-inner">
              <div className="snippet-chip" data-speed="0.7">
                data-scroll-speed="0.7"
              </div>
              <h3 className="snippet-demo-title" data-speed="1.15">
                Locomotive-style parallax
              </h3>
              <p className="snippet-demo-text" data-speed="1">
                Elements can move at different rates as you scroll.
              </p>

              <div className="snippet-demo-grid">
                <div className="snippet-demo-tile" data-speed="0.85">
                  Slow
                </div>
                <div className="snippet-demo-tile" data-speed="1.1">
                  Medium
                </div>
                <div className="snippet-demo-tile" data-speed="1.35">
                  Fast
                </div>
              </div>

              <div className="snippet-spacer" />

              <div className="snippet-demo-footer" data-speed="1.25">
                Keep scrolling…
              </div>
            </div>
          </div>
        </div>

        <pre className="code-block" aria-label="Code snippet">
          <code>{snippet}</code>
        </pre>
      </section>
    </main>
  );
}



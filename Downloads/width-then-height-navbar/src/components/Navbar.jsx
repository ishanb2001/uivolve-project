import { useEffect, useMemo, useRef, useState } from "react";

export default function Navbar() {
  // Keep in sync with CSS vars:
  const DUR_W = 420;
  const DUR_H = 560;
  const DELAY = 260;
  const TOTAL_CLOSE_MS = useMemo(() => DUR_H + DELAY + DUR_W, []);

  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

  const [menuState, setMenuState] = useState("closed"); // "open" | "closing" | "closed"

  const isOpen = menuState === "open";
  const isClosing = menuState === "closing";

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuState("open");
  };

  const closeMenu = () => {
    if (!isOpen || isClosing) return;
    setMenuState("closing");

    closeTimerRef.current = setTimeout(() => {
      setMenuState("closed");
      closeTimerRef.current = null;
    }, TOTAL_CLOSE_MS);
  };

  const toggleMenu = () => {
    if (isOpen) closeMenu();
    else openMenu();
  };

  // Apply body classes (menu-open / menu-closing) exactly like the original
  useEffect(() => {
    const body = document.body;

    body.classList.remove("menu-open", "menu-closing");
    if (menuState === "open") body.classList.add("menu-open");
    if (menuState === "closing") body.classList.add("menu-closing");

    return () => {
      body.classList.remove("menu-open", "menu-closing");
    };
  }, [menuState]);

  // Escape closes
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

  // Click outside nav closes (when open)
  useEffect(() => {
    const onMouseDown = (e) => {
      if (!isOpen) return;
      if (navRef.current && !navRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen, isClosing]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <div className="backdrop" aria-hidden="true" onClick={closeMenu} />

      <header className="nav" ref={navRef} role="banner">
        <div className="nav-top">
          <button
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="menuExtra"
            onClick={toggleMenu}
          >
            <span className="hamburger" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="menu-text">Menu</span>
          </button>

          <div className="logo" aria-label="OSMO">
            OSMO
          </div>

          <div className="auth">
            <button className="btn">Login</button>
            <button className="btn primary">Join</button>
          </div>
        </div>

        <div
          className="nav-extra"
          id="menuExtra"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="nav-pills" aria-hidden="true">
            <span className="pill">Product</span>
            <span className="pill">Page Transition</span>
            <span className="pill">Course</span>
            <span className="pill on">Included in membership</span>
          </div>

          <div className="menu-grid">
            <section className="card">
              <div className="section-title">Our Products</div>
              <nav className="linklist">
                <a href="#">
                  <span>The Vault</span>
                </a>
                <a href="#">
                  <span>Page Transition Course</span>
                  <span className="tag purple">WIP</span>
                </a>
                <a href="#">
                  <span>Icon Library</span>
                </a>
                <a href="#">
                  <span>Community</span>
                </a>
                <a href="#">
                  <span>Easings</span>
                  <span className="tag soon">SOON</span>
                </a>
              </nav>
            </section>

            <section className="card">
              <div className="section-title">Explore</div>
              <nav className="linklist">
                <a href="#">
                  <span>Osmo Showcase</span>
                </a>
                <a href="#">
                  <span>Updates</span>
                </a>
                <a href="#">
                  <span>Pricing</span>
                </a>
              </nav>

              <div className="social" aria-label="Social links">
                <a href="#" aria-label="LinkedIn">
                  in
                </a>
                <a href="#" aria-label="Instagram">
                  ◎
                </a>
                <a href="#" aria-label="X">
                  X
                </a>
              </div>
            </section>

            <aside className="card featured">
              <div>
                <div className="section-title">
                  <span className="tag">Featured</span>
                  <span className="tag purple" style={{ marginLeft: 8 }}>
                    Milestone
                  </span>
                </div>
                <h2>
                  We hit 1600
                  <br />
                  Members!
                </h2>
                <button className="cta">Join them</button>
              </div>

              <div className="avatars" aria-hidden="true">
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
              </div>
            </aside>
          </div>
        </div>
      </header>
    </>
  );
}

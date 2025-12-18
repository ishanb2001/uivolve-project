import Navbar from "./components/Navbar.jsx";
import { ROUTES } from "./pages/pages.js";
import { useWipeRouter } from "./router/useWipeRouter.js";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll.js";

export default function App() {
  const { path, navigate } = useWipeRouter();
  const Page = ROUTES[path] || null;
  const { scrollRef } = useLocomotiveScroll([path]);

  let content = null;
  if (!Page) {
    content = (
      <main className="detail-page">
        <section className="detail-card">
          <h1 className="detail-title">404</h1>
          <p className="detail-subtitle">That page doesn't exist.</p>
          <button className="btn" type="button" onClick={() => navigate("/")}>
            Go Home
          </button>
        </section>
      </main>
    );
  } else {
    content = <Page navigate={navigate} />;
  }

  return (
    <>
      <Navbar />
      <div ref={scrollRef} data-scroll-container>
        <div className="page-fade" key={path}>
          {content}
        </div>
      </div>
    </>
  );
}

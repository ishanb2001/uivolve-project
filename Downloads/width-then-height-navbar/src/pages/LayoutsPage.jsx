export default function LayoutsPage({ navigate }) {
  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">Layout Templates</h1>
        <p className="detail-subtitle">
          Edit `src/pages/LayoutsPage.jsx` and put anything you want here.
        </p>
      </section>
    </main>
  );
}



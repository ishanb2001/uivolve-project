export default function IllustrationsPage({ navigate }) {
  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">Illustration Pack</h1>
        <p className="detail-subtitle">
          Edit `src/pages/IllustrationsPage.jsx` and put anything you want here.
        </p>
      </section>
    </main>
  );
}



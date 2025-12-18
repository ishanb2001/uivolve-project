export default function DetailPage({ title, subtitle, bullets, onBack }) {
  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">{title}</h1>
        <p className="detail-subtitle">{subtitle}</p>

        {bullets?.length ? (
          <ul className="detail-list">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}



export default function IconsPage({ navigate }) {
  return (
    <main className="detail-page">
      <div className="detail-header">
        <button className="btn" type="button" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <section className="detail-card">
        <h1 className="detail-title">Icon Set Collection</h1>
        <p className="detail-subtitle">
          Edit `src/pages/IconsPage.jsx` and put anything you want here.
        </p>
      </section>

      <iframe
      src="https://codesandbox.io/embed/4gmwjw?view=preview"
      style={{
        width: "100%",
        height: 500,
        border: 0,
        borderRadius: 4,
        overflow: "hidden",
      }}
      title="lingering-cache-4gmwjw"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
    
    </main>
  );
}



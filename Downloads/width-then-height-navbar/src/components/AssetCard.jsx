export default function AssetCard({ title, description, emoji, onClick }) {
  return (
    <div className="asset-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="asset-card-image">{emoji}</div>
      <div className="asset-card-content">
        <h3 className="asset-card-title">{title}</h3>
        <p className="asset-card-description">{description}</p>
      </div>
    </div>
  );
}


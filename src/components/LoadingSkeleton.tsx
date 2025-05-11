import "./LoadingSkeleton.css";

export const LoadingSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header" />
      <div className="skeleton-grid">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="skeleton-item">
            <div className="skeleton-label" />
            <div className="skeleton-value" />
          </div>
        ))}
      </div>
    </div>
  );
};

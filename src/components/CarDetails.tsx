import type { CarData } from "../types/car";
import "./CarDetails.css";

interface CarDetailsProps {
  carData: CarData;
  hasDisabledParking?: boolean;
}

export const CarDetails = ({ carData, hasDisabledParking = false }: CarDetailsProps) => {
  return (
    <div className="car-details-card">
      <div className="card-header">
        <h2 className="card-title">פרטי הרכב</h2>
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
        </svg>
      </div>

      <div className="details-grid">
        <div className="detail-box">
          <p className="detail-label">מספר רכב</p>
          <p className="detail-value">{carData.mispar_rechev}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">יצרן</p>
          <p className="detail-value">{carData.tozeret_nm}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">דגם</p>
          <p className="detail-value">{carData.kinuy_mishari}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">שנת ייצור</p>
          <p className="detail-value">{carData.shnat_yitzur}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">בעלות</p>
          <p className="detail-value">{carData.baalut}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">מספר שלדה</p>
          <p className="detail-value">{carData.misgeret}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">צבע</p>
          <p className="detail-value">{carData.tzeva_rechev}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">סוג דלק</p>
          <p className="detail-value">{carData.sug_delek_nm}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">צמיג קדמי</p>
          <p className="detail-value">{carData.zmig_kidmi}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">צמיג אחורי</p>
          <p className="detail-value">{carData.zmig_ahori}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">תג חניה לנכה</p>
          <div className="disabled-parking-chip" style={{ backgroundColor: hasDisabledParking ? '#4caf50' : '#e0e0e0', color: hasDisabledParking ? 'white' : 'rgba(0, 0, 0, 0.87)' }}>
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            {hasDisabledParking ? "יש תג חניה לנכה" : "אין תג חניה לנכה"}
          </div>
        </div>
      </div>
    </div>
  );
}; 
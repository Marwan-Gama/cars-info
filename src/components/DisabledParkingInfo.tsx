import type { DisabledParkingData } from "../types/car";
import "./DisabledParkingInfo.css";

interface DisabledParkingInfoProps {
  parkingData: DisabledParkingData;
}

export const DisabledParkingInfo = ({ parkingData }: DisabledParkingInfoProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("he-IL");
  };

  const isPermitValid = parkingData.status.toLowerCase() === "active";
  const isExpired = new Date(parkingData.expiry_date) < new Date();

  return (
    <div className="parking-card">
      <div className="card-header">
        <h2 className="card-title">תג חניה לנכה</h2>
        <svg className="icon" viewBox="0 0 24 24" fill={isPermitValid ? "currentColor" : "#bdbdbd"}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>

      <div className={`alert ${isPermitValid ? "success" : "warning"}`}>
        {isPermitValid 
          ? "לרכב זה יש תג חניה לנכה תקף"
          : "לרכב זה אין תג חניה לנכה תקף"}
      </div>

      <div className="details-grid">
        <div className="detail-box">
          <p className="detail-label">סטטוס התג</p>
          <div className={`status-chip ${isPermitValid ? "success" : "error"}`}>
            {isPermitValid ? "פעיל" : "לא פעיל"}
          </div>
        </div>

        <div className="detail-box">
          <p className="detail-label">מספר תג</p>
          <p className="detail-value">{parkingData.permit_number || "N/A"}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">תאריך תפוגה</p>
          <p className="detail-value">{formatDate(parkingData.expiry_date)}</p>
        </div>

        {isExpired && (
          <div className="expired-warning">
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            <span>התג פג תוקף</span>
          </div>
        )}
      </div>
    </div>
  );
}; 
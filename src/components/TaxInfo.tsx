import type { TaxData } from "../types/car";
import "./TaxInfo.css";

interface TaxInfoProps {
  taxData: TaxData;
}

export const TaxInfo = ({ taxData }: TaxInfoProps) => {
  const getStatusColor = (status: string): "success" | "error" | "warning" => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "unpaid":
        return "error";
      default:
        return "warning";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("he-IL");
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case "unpaid":
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      default:
        return (
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        );
    }
  };

  const isTaxValid = taxData.status.toLowerCase() === "paid";

  return (
    <div className="tax-card">
      <div className="card-header">
        <h2 className="card-title">Tag Nachim Status</h2>
        {getStatusIcon(taxData.status)}
      </div>

      <div className={`alert ${isTaxValid ? "success" : "error"}`}>
        {isTaxValid 
          ? "This vehicle has valid tag nachim payments"
          : "This vehicle has unpaid tag nachim payments"}
      </div>

      <div className="details-grid">
        <div className="detail-box">
          <p className="detail-label">Payment Status</p>
          <div className={`status-chip ${getStatusColor(taxData.status)}`}>
            {taxData.status}
          </div>
        </div>

        <div className="detail-box">
          <p className="detail-label">Last Payment Date</p>
          <p className="detail-value">{formatDate(taxData.last_payment_date)}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">Next Payment Due</p>
          <p className="detail-value">{formatDate(taxData.next_payment_date)}</p>
        </div>

        <div className="detail-box">
          <p className="detail-label">Vehicle Type</p>
          <p className="detail-value">{taxData.sug_rechev}</p>
        </div>
      </div>
    </div>
  );
}; 
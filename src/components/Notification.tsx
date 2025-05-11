import "./Notification.css";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export const Notification = ({
  open,
  message,
  severity,
  onClose,
}: NotificationProps) => {
  if (!open) return null;

  return (
    <div className="notification-container">
      <div className={`notification ${severity}`}>
        <div className="notification-message">{message}</div>
        <button className="close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

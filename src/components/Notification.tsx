import '../styles/notification.css';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  return (
    <div className="notification-container">
      <p>{message}</p>
      <button onClick={onClose} className="notification-close-btn">X</button>
    </div>
  );
}
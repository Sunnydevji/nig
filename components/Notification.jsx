import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

export default function Notification({ type = "info", message, onClose, duration = 2500 }) {
  let icon, color;
  if (type === "success") {
    icon = <FaCheckCircle className="text-green-500 animate-pop" />;
    color = "bg-green-50 border-green-400 text-green-700";
  } else if (type === "error") {
    icon = <FaExclamationCircle className="text-red-500 animate-pop" />;
    color = "bg-red-50 border-red-400 text-red-700";
  } else {
    icon = <FaInfoCircle className="text-blue-500 animate-pop" />;
    color = "bg-blue-50 border-blue-400 text-blue-700";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 border px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${color} animate-fade-in-out`}
      style={{ minWidth: 320, maxWidth: "90vw" }}
    >
      {icon}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold text-gray-400 hover:text-gray-700 transition"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}

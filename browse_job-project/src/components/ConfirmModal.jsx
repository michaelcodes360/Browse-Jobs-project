import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center md:text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center md:justify-start mb-4">
          <div className="bg-red-100 text-red-600 rounded-full p-3">
            <FaExclamationTriangle className="text-xl" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{message}</p>

        <div className="flex flex-col-reverse md:flex-row md:justify-end gap-3">
          <button
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
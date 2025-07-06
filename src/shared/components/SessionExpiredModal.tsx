import { useEffect, useRef } from "react";
import { LogOut, Clock } from "lucide-react";

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
};

const SessionExpiredModal = ({ isOpen, onConfirm }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onConfirm();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onConfirm]);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onConfirm();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-scale"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-full">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Sesión expirada
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          Tu sesión ha expirado por seguridad. Por favor, inicia sesión
          nuevamente para continuar.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <LogOut className="w-4 h-4" />
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;

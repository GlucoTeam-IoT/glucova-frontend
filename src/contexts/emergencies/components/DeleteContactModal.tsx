import { useEffect, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import type { Contact } from "../types/contact.types";

type Props = {
  isOpen: boolean;
  contact: Contact | null;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteContactModal = ({
  isOpen,
  contact,
  onConfirm,
  onCancel,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onCancel]);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-scale"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Eliminar contacto
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-100 bg-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            ¿Estás seguro de que quieres eliminar este contacto de emergencia?
          </p>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-800">{contact.name}</p>
            <p className="text-sm text-gray-600">{contact.email}</p>
            {contact.phone && (
              <p className="text-sm text-gray-600">{contact.phone}</p>
            )}
          </div>
          <p className="text-sm text-red-600 mt-2">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 bg-white"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Eliminar contacto
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;

import { useState, useEffect, useRef } from "react";
import type { NewDeviceData } from "../types/devices.types";
import { X, HardDrive } from "lucide-react";

type Props = {
  onSubmit: (data: NewDeviceData) => void;
  onCancel: () => void;
  isOpen: boolean;
};

const AddDeviceModal = ({ onSubmit, onCancel, isOpen }: Props) => {
  const [timestamp] = useState<string>(new Date().toISOString());

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ timestamp });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-scale"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Registrar nuevo dispositivo
          </h2>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-100 bg-white"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center my-6">
            <div className="bg-blue-100 rounded-full p-4">
              <HardDrive className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-center">
            El sistema generará un identificador único para tu nuevo
            dispositivo.
          </p>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 bg-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Registrar dispositivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;

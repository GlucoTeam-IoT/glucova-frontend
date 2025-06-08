import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { NewAlertData } from "../types/alertSettings.types";
import type { Device } from "../../devices/types/devices.types";
import { getDevices } from "../../devices/services/devicesService";

type Props = {
  isOpen: boolean;
  onSubmit: (data: NewAlertData) => void;
  onCancel: () => void;
};

const CreateAlertModal = ({ isOpen, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<NewAlertData>({
    device_id: "",
    level: "low",
    message: "",
  });

  const [devices, setDevices] = useState<Device[]>([]);
  const [errors, setErrors] = useState({
    device_id: "",
    message: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDevices = async () => {
      const devicesList = await getDevices();
      setDevices(devicesList);

      // Set first device as default if available
      if (devicesList.length > 0 && !formData.device_id) {
        setFormData((prev) => ({
          ...prev,
          device_id: devicesList[0].id,
        }));
      }
    };

    if (isOpen) {
      loadDevices();
    }
  }, [isOpen]);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors = {
      device_id: formData.device_id ? "" : "Debe seleccionar un dispositivo",
      message: formData.message ? "" : "El mensaje es obligatorio",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
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
            Crear nueva alerta
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
          <div className="space-y-4">
            <div>
              <label
                htmlFor="device_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dispositivo
              </label>
              <select
                id="device_id"
                name="device_id"
                value={formData.device_id}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar dispositivo</option>
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.id.substring(0, 8)}...
                  </option>
                ))}
              </select>
              {errors.device_id && (
                <p className="mt-1 text-sm text-red-600">{errors.device_id}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nivel de alerta
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Bajo</option>
                <option value="medium">Medio</option>
                <option value="high">Alto</option>
                <option value="critical">Crítico</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describa la alerta..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
          </div>

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
              Crear alerta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlertModal;

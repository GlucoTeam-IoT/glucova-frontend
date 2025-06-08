import { useState, useEffect } from "react";
import {
  getDevices,
  addDevice,
  deleteDevice,
} from "../services/devicesService";
import type { Device, NewDeviceData } from "../types/devices.types";
import DevicesTable from "../components/DevicesTable";
import AddDeviceModal from "../components/AddDeviceModal";
import DeleteDeviceModal from "../components/DeleteDeviceModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { HardDrive, Plus } from "lucide-react";

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      console.error("Failed to load devices", err);
      setError(
        "No se pudieron cargar los dispositivos. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddDevice = async (deviceData: NewDeviceData) => {
    try {
      setLoading(true);
      const newDevice = await addDevice(deviceData);
      if (newDevice) {
        setDevices([...devices, newDevice]);
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Failed to add device", err);
      setError(
        "No se pudo agregar el dispositivo. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (deviceId: string) => {
    setDeviceToDelete(deviceId);
  };

  const handleDeleteConfirm = async () => {
    if (!deviceToDelete) return;

    try {
      setLoading(true);
      const success = await deleteDevice(deviceToDelete);
      if (success) {
        setDevices(devices.filter((device) => device.id !== deviceToDelete));
      }
    } catch (err) {
      console.error("Failed to delete device", err);
      setError(
        "No se pudo eliminar el dispositivo. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
      setDeviceToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeviceToDelete(null);
  };

  return (
    <>
      <div className="flex mb-6 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Mis dispositivos
          </h1>
          <p className="text-gray-600">
            Administra tus dispositivos de monitoreo
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Registrar dispositivo
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 mb-4">
          {error}
        </div>
      )}

      <AddDeviceModal
        isOpen={showAddModal}
        onSubmit={handleAddDevice}
        onCancel={() => setShowAddModal(false)}
      />

      <DeleteDeviceModal
        isOpen={deviceToDelete !== null}
        deviceId={deviceToDelete || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {loading ? (
        <LoadingSpinner size="large" fullPage />
      ) : devices.length > 0 ? (
        <DevicesTable devices={devices} onDelete={handleDeleteClick} />
      ) : (
        <div className="p-8 bg-white rounded-md shadow text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 rounded-full p-3">
              <HardDrive className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 mb-2">No hay dispositivos registrados</p>
        </div>
      )}
    </>
  );
};

export default DevicesPage;

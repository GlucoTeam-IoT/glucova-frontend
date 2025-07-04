import { useState, useEffect } from "react";
import {
  getDevices,
  addDevice,
  deleteDevice,
} from "../services/devicesService";
import type { Device, NewDeviceData } from "../types/devices.types";
import AddDeviceModal from "../components/AddDeviceModal";
import DeleteDeviceModal from "../components/DeleteDeviceModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import GenericTable from "../../../shared/components/GenericTable";
import type {
  TableColumn,
  TableAction,
} from "../../../shared/components/GenericTable";
import { HardDrive, Plus, Trash2 } from "lucide-react";

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

  const handleDeleteClick = (device: Device) => {
    setDeviceToDelete(device.id);
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

  // Configure table columns
  const tableColumns: TableColumn<Device>[] = [
    {
      key: "id",
      label: "ID del Dispositivo",
      render: (id: string) => <span className="font-medium">{id}</span>,
    },
    {
      key: "timestamp",
      label: "Fecha de Registro",
      render: (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
      },
    },
    {
      key: "timestamp",
      label: "Hora",
      render: (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      key: "status",
      label: "Estado",
      render: (status: string) => {
        let statusClass = "";
        let statusText = "";

        switch (status.toLowerCase()) {
          case "active":
            statusText = "Activo";
            statusClass = "text-green-600 bg-green-100";
            break;
          case "inactive":
            statusText = "Inactivo";
            statusClass = "text-gray-600 bg-gray-100";
            break;
          default:
            statusText = status.charAt(0).toUpperCase() + status.slice(1);
            statusClass = "text-gray-600 bg-gray-100";
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {statusText}
          </span>
        );
      },
    },
  ];

  // Configure table actions
  const tableActions: TableAction<Device>[] = [
    {
      label: "Eliminar dispositivo",
      icon: <Trash2 size={18} />,
      onClick: handleDeleteClick,
      className: "p-1 text-red-500 hover:bg-red-50 rounded-full bg-white",
    },
  ];

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
      ) : (
        <div className="mt-6">
          <GenericTable
            data={devices}
            columns={tableColumns}
            actions={tableActions}
            emptyState={{
              icon: <HardDrive className="w-8 h-8 text-blue-600" />,
              title: "No hay dispositivos registrados",
              description:
                "Los dispositivos aparecerán aquí cuando los registres",
            }}
          />
        </div>
      )}
    </>
  );
};

export default DevicesPage;

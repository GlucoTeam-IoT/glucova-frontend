import type { JSX } from "react";
import type { Device } from "../types/devices.types";
import { Trash2 } from "lucide-react";

type Props = {
  devices: Device[];
  onDelete: (deviceId: string) => void;
};

const DevicesTable = ({ devices, onDelete }: Props) => {
  // Format date function
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Format time function
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format status function - translate and capitalize
  const getStatusDisplay = (status: string): JSX.Element => {
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
  };

  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">ID del Dispositivo</th>
            <th className="px-4 py-2">Fecha de Registro</th>
            <th className="px-4 py-2">Hora</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.length > 0 ? (
            devices.map((device) => (
              <tr key={device.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{device.id}</td>
                <td className="px-4 py-2">{formatDate(device.timestamp)}</td>
                <td className="px-4 py-2">{formatTime(device.timestamp)}</td>
                <td className="px-4 py-2">{getStatusDisplay(device.status)}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => onDelete(device.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full bg-white"
                    aria-label="Eliminar dispositivo"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                No hay dispositivos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesTable;

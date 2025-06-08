import { Bell, Trash2 } from "lucide-react";
import type { Alert } from "../types/alertSettings.types";

type Props = {
  alerts: Alert[];
  onDelete: (alertId: string) => void;
};

const AlertsTable = ({ alerts, onDelete }: Props) => {
  const formatDate = (timestamp?: string): string => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp?: string): string => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getLevelBadge = (level: string) => {
    let levelClass = "";
    let levelText = "";

    switch (level.toLowerCase()) {
      case "low":
        levelText = "Bajo";
        levelClass = "text-blue-600 bg-blue-100";
        break;
      case "medium":
        levelText = "Medio";
        levelClass = "text-yellow-600 bg-yellow-100";
        break;
      case "high":
        levelText = "Alto";
        levelClass = "text-red-600 bg-red-100";
        break;
      case "critical":
        levelText = "Crítico";
        levelClass = "text-red-700 bg-red-200";
        break;
      default:
        levelText = level.charAt(0).toUpperCase() + level.slice(1);
        levelClass = "text-gray-600 bg-gray-100";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${levelClass}`}
      >
        {levelText}
      </span>
    );
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow border border-gray-200 p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-blue-100 rounded-full p-3">
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <p className="text-gray-500">No hay alertas disponibles</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Nivel</th>
            <th className="px-4 py-2">Mensaje</th>
            <th className="px-4 py-2">Dispositivo</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Hora</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{getLevelBadge(alert.level)}</td>
              <td className="px-4 py-2">{alert.message}</td>
              <td className="px-4 py-2 font-medium">
                {alert.device_id.substring(0, 8)}...
              </td>
              <td className="px-4 py-2">{formatDate(alert.timestamp)}</td>
              <td className="px-4 py-2">{formatTime(alert.timestamp)}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onDelete(alert.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-full bg-white"
                  aria-label="Eliminar alerta"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;

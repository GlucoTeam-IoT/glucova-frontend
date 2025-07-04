import type { Alert } from "../types/dashboard.types";
import { Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  alerts: Alert[];
}

const RecentAlerts = ({ alerts }: Props) => {
  const getAlertColor = (type: string): string => {
    switch (type) {
      case "error":
        return "text-red-600 bg-red-100 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "info":
        return "text-blue-600 bg-blue-100 border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getAlertTypeText = (type: string): string => {
    switch (type) {
      case "error":
        return "Crítica";
      case "warning":
        return "Advertencia";
      case "info":
        return "Información";
      default:
        return "Alerta";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="text-blue-600 mr-3" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Alertas Recientes
          </h2>
        </div>
        <Link
          to="/Alerts"
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          <span>Ver todas</span>
          <ArrowRight
            size={16}
            className="ml-1 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div
              key={alert.id}
              className="flex justify-between items-start p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800 text-sm">
                    {alert.message}
                  </p>
                  {index === 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      Más reciente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
              </div>
              <div className="ml-4 text-right">
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getAlertColor(
                    alert.type
                  )}`}
                >
                  {getAlertTypeText(alert.type)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">No hay alertas recientes</p>
            <p className="text-gray-400 text-sm mt-2">
              Las alertas aparecerán aquí cuando se generen
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;

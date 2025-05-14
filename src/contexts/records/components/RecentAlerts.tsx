import type { Alert } from "../types/dashboard.types";

interface Props {
  alerts: Alert[];
}

const RecentAlerts = ({ alerts }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold text-gray-700 mb-4">Alertas Recientes</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`flex items-center justify-between px-4 py-3 rounded ${
              alert.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            <div>
              <p className="font-medium">{alert.message}</p>
              <p className="text-sm">{alert.time}</p>
            </div>
            <button className="text-xl leading-none">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAlerts;
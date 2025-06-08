import type { JSX } from "react";
import type { HealthRecord } from "../types/healthHistory.types";

type Props = {
  records: HealthRecord[];
};

const HealthHistoryTable = ({ records }: Props) => {
  // Function to format the timestamp into date and time
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to display glucose level with color indicator
  const getGlucoseDisplay = (level: number): JSX.Element => {
    let levelClass = "";

    if (level < 70) {
      levelClass = "text-blue-600 bg-blue-100"; // Low
    } else if (level >= 70 && level <= 100) {
      levelClass = "text-green-600 bg-green-100"; // Normal
    } else if (level > 100 && level <= 125) {
      levelClass = "text-yellow-600 bg-yellow-100"; // Pre-diabetic/Elevated
    } else if (level > 125) {
      levelClass = "text-red-600 bg-red-100"; // High
    } else {
      levelClass = "text-gray-600 bg-gray-100"; // Unknown
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${levelClass}`}
      >
        {level} mg/dL
      </span>
    );
  };

  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Hora</th>
            <th className="px-4 py-2">Dispositivo</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Nivel de Glucosa</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{formatDate(record.timestamp)}</td>
                <td className="px-4 py-2">{formatTime(record.timestamp)}</td>
                <td className="px-4 py-2">{record.device_id}</td>
                <td className="px-4 py-2">{record.description}</td>
                <td className="px-4 py-2">{getGlucoseDisplay(record.level)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                No hay registros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HealthHistoryTable;

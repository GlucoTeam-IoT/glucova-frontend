import type { JSX } from "react";
import { type VitalSign } from "../types/dashboard.types";
import { Droplet, HeartPulse, Weight, BarChart3, Clock } from "lucide-react";

type SummaryCardProps = {
  vital: VitalSign;
};

const iconMap: Record<string, JSX.Element> = {
  Glucosa: <Droplet className="text-red-500" size={32} />,
  "Presión Arterial": <HeartPulse className="text-red-500" size={32} />,
  Peso: <Weight className="text-indigo-500" size={32} />,
  IMC: <BarChart3 className="text-purple-500" size={32} />,
};

const SummaryCard = ({ vital }: SummaryCardProps) => {
  const icon = iconMap[vital.label] ?? null;

  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("es-ES", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGlucoseStatus = (
    value: string
  ): { status: string; color: string } => {
    const level = parseInt(value);
    if (isNaN(level)) return { status: "", color: "" };

    if (level < 70)
      return {
        status: "Bajo",
        color: "text-blue-600 bg-blue-50 border-blue-200",
      };
    if (level >= 70 && level <= 100)
      return {
        status: "Normal",
        color: "text-green-600 bg-green-50 border-green-200",
      };
    if (level > 100 && level <= 125)
      return {
        status: "Elevado",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      };
    return { status: "Alto", color: "text-red-600 bg-red-50 border-red-200" };
  };

  const glucoseInfo =
    vital.label === "Glucosa" ? getGlucoseStatus(vital.value) : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {vital.label}
          </p>
          {glucoseInfo && (
            <span
              className={`inline-block mt-1 px-2 py-1 rounded-md text-xs font-medium border ${glucoseInfo.color}`}
            >
              {glucoseInfo.status}
            </span>
          )}
        </div>
        {icon}
      </div>

      {/* Main Value */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold text-gray-800 mb-1">{vital.value}</p>
          <p className="text-base font-medium text-gray-500">{vital.unit}</p>
        </div>
      </div>

      {/* Timestamp */}
      {vital.timestamp && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>Último: {formatTimestamp(vital.timestamp)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;

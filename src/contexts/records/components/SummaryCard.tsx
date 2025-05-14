import type { JSX } from "react";
import { type VitalSign } from "../types/dashboard.types";
import {
  Droplet,
  HeartPulse,
  Weight,
  BarChart3,
} from "lucide-react";

type SummaryCardProps = {
  vital: VitalSign;
};

const iconMap: Record<string, JSX.Element> = {
  Glucosa: <Droplet className="text-red-500" size={20} />,
  "Presión Arterial": <HeartPulse className="text-red-500" size={20} />,
  Peso: <Weight className="text-indigo-500" size={20} />,
  IMC: <BarChart3 className="text-purple-500" size={20} />,
};

const SummaryCard = ({ vital }: SummaryCardProps) => {
  const icon = iconMap[vital.label] ?? null;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-500">{vital.label}</p>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-800">{vital.value}</p>
        <p className="text-xs text-gray-400">{vital.unit}</p>
      </div>
    </div>
  );
};

export default SummaryCard;

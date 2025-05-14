import type { DashboardData } from "../types/dashboard.types";

export const getDashboardData = async (): Promise<DashboardData> => {

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    vitals: [
      { label: "Glucosa", value: "120", unit: "mg/dL", icon: "💧" },
      { label: "Presión Arterial", value: "120/80", unit: "mmHg", icon: "❤️" },
      { label: "Peso", value: "68.5", unit: "kg", icon: "⚖️" },
      { label: "IMC", value: "22.4", unit: "kg/m²", icon: "📊" },
    ],
    alerts: [
      {
        id: "1",
        type: "error",
        message: "Nivel de glucosa alto",
        time: "Hace 2 horas",
      },
      {
        id: "2",
        type: "info",
        message: "Recordatorio de medicación",
        time: "En 30 minutos",
      },
    ],
  };
};

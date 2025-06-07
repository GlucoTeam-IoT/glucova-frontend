import type { AlertSetting } from "../types/alertSettings.types";

export const getAlertSettings = async (): Promise<AlertSetting[]> => {
  return [
    {
      id: "1",
      type: "high",
      title: "Alerta de glucosa alta",
      isActive: true,
      threshold: 180,
      frequency: "Cada lectura",
    },
    {
      id: "2",
      type: "low",
      title: "Alerta de glucosa baja",
      isActive: true,
      threshold: 70,
      frequency: "Cada lectura",
    },
    {
      id: "3",
      type: "missed",
      title: "Alerta de lectura perdida",
      isActive: false,
      timeWithoutReading: "4 horas",
      frequency: "Una vez al día",
    },
  ];
};

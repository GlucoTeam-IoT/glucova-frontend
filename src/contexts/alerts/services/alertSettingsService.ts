import type { AlertSetting } from "../types/alertSettings.types";

export const getAlertSettings = async (): Promise<AlertSetting[]> => {
  return [
    {
      id: "1",
      type: "high",
      title: "High Glucose Alert",
      isActive: true,
      threshold: 180,
      frequency: "Every Reading",
    },
    {
      id: "2",
      type: "low",
      title: "Low Glucose Alert",
      isActive: true,
      threshold: 70,
      frequency: "Every Reading",
    },
    {
      id: "3",
      type: "missed",
      title: "Missed Reading Alert",
      isActive: false,
      timeWithoutReading: "4 hours",
      frequency: "Once a Day",
    },
  ];
};
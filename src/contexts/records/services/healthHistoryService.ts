import type { HealthRecord } from "../types/healthHistory.types.ts";

export const getHealthHistory = async (): Promise<HealthRecord[]> => {
  return [
    {
      id: 1,
      date: "2024-05-01",
      time: "08:30",
      glucose: 110,
      pressure: "120/80",
      weight: 70,
      bmi: 23.5,
    },
    {
      id: 2,
      date: "2024-05-02",
      time: "09:15",
      glucose: 140,
      pressure: "130/85",
      weight: 71,
      bmi: 24.1,
    },
    // más registros...
  ];
};

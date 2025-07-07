import type { DashboardData } from "../types/dashboard.types";
import { getHealthHistory } from "./healthHistoryService";
import { getAlerts } from "../../alerts/services/alertSettingsService";

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    // Get the latest 2 glucose records
    const records = await getHealthHistory(2, 0);

    // Get the latest 3 alerts
    const alerts = await getAlerts({ limit: 3, skip: 0 });

    // Get the latest glucose level for the summary card
    const latestRecord = records[0];
    const latestGlucose = latestRecord
      ? {
          label: "Glucosa",
          value: latestRecord.level.toString(),
          unit: "mg/dL",
          icon: "💧",
          timestamp: latestRecord.timestamp,
        }
      : {
          label: "Glucosa",
          value: "--",
          unit: "mg/dL",
          icon: "💧",
          timestamp: new Date().toISOString(),
        };

    return {
      vitals: [latestGlucose], // Only glucose now
      alerts: alerts, // Real alerts from API
      recentGlucoseRecords: records, // Add recent records for the list
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Return fallback data
    return {
      vitals: [
        {
          label: "Glucosa",
          value: "--",
          unit: "mg/dL",
          icon: "💧",
          timestamp: new Date().toISOString(),
        },
      ],
      alerts: [],
      recentGlucoseRecords: [],
    };
  }
};

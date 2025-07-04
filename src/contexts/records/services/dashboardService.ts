import type { DashboardData } from "../types/dashboard.types";
import { getHealthHistory } from "./healthHistoryService";
import { getAlerts } from "../../alerts/services/alertSettingsService";
import type { Alert as AlertSettings } from "../../alerts/types/alertSettings.types";

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    // Get the latest 2 glucose records
    const records = await getHealthHistory(2, 0);

    // Get the latest 3 alerts
    const alertsData = await getAlerts({ limit: 3, skip: 0 });

    // Convert alerts to dashboard format
    const alerts = alertsData.map((alert: AlertSettings) => {
      let type: "warning" | "info" | "error" = "info";

      switch (alert.level) {
        case "low":
          type = "info";
          break;
        case "medium":
          type = "warning";
          break;
        case "high":
        case "critical":
          type = "error";
          break;
      }

      // Format timestamp to relative time
      const formatRelativeTime = (timestamp?: string): string => {
        if (!timestamp) return "Fecha desconocida";

        const now = new Date();
        const alertTime = new Date(timestamp);
        const diffMs = now.getTime() - alertTime.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffHours > 0) {
          return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
        } else if (diffMinutes > 0) {
          return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? "s" : ""}`;
        } else {
          return "Hace unos momentos";
        }
      };

      return {
        id: alert.id,
        type,
        message: alert.message,
        time: formatRelativeTime(alert.timestamp),
      };
    });

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

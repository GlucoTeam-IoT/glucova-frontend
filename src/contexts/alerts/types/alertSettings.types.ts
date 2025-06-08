export interface Alert {
  id: string;
  device_id: string;
  level: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp?: string;
}

export type NewAlertData = {
  device_id: string;
  level: "low" | "medium" | "high" | "critical";
  message: string;
};

export interface AlertsFilter {
  device_id?: string | null;
  level?: string | null;
  limit?: number;
  skip?: number;
}

import type { HealthRecord } from "./healthHistory.types";

export interface VitalSign {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  timestamp?: string;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "error";
  message: string;
  time: string;
}

export interface DashboardData {
  vitals: VitalSign[];
  alerts: Alert[];
  recentGlucoseRecords?: HealthRecord[];
}

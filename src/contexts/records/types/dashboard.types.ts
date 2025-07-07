import type { HealthRecord } from "./healthHistory.types";
import type { Alert } from "../../alerts/types/alertSettings.types";

export interface VitalSign {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  timestamp?: string;
}

export interface DashboardData {
  vitals: VitalSign[];
  alerts: Alert[];
  recentGlucoseRecords?: HealthRecord[];
}

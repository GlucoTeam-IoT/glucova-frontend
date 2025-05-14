export type NotificationFrequency = "Every Reading" | "Once a Day" | "Never";

export interface AlertSetting {
  id: string;
  type: "high" | "low" | "missed";
  title: string;
  isActive: boolean;
  threshold?: number;
  frequency: NotificationFrequency;
  timeWithoutReading?: string; // Solo para "missed"
}
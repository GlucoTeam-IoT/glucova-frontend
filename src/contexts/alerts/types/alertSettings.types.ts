export type NotificationFrequency = "Cada lectura" | "Una vez al día" | "Nunca";

export interface AlertSetting {
  id: string;
  type: "high" | "low" | "missed";
  title: string;
  isActive: boolean;
  threshold?: number;
  frequency: NotificationFrequency;
  timeWithoutReading?: string;
}

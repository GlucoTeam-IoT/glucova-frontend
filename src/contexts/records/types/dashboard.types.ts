export interface VitalSign {
  label: string;
  value: string;
  unit?: string;
  icon: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error';
  message: string;
  time: string; 
}

export interface DashboardData {
  vitals: VitalSign[];
  alerts: Alert[];
}

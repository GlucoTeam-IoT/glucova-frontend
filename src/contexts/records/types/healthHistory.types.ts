export interface HealthRecord {
  id: number;
  date: string;       // formato: 'YYYY-MM-DD'
  time: string;       // formato: 'HH:mm'
  glucose: number;    // mg/dL
  pressure: string;   // ej: '120/80'
  weight: number;     // kg
  bmi: number;        // índice de masa corporal
}

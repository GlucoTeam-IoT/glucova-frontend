export type AlertLevel = "low" | "medium" | "high" | "critical";

export interface ColorScheme {
  text: string;
  background: string;
  label: string;
}

/**
 * Get color scheme for alert levels
 */
export const getAlertLevelColors = (level: AlertLevel): ColorScheme => {
  switch (level.toLowerCase() as AlertLevel) {
    case "low":
      return {
        text: "text-blue-600",
        background: "bg-blue-100",
        label: "Bajo",
      };
    case "medium":
      return {
        text: "text-yellow-600",
        background: "bg-yellow-100",
        label: "Medio",
      };
    case "high":
      return {
        text: "text-red-600",
        background: "bg-red-100",
        label: "Alto",
      };
    case "critical":
      return {
        text: "text-red-700",
        background: "bg-red-200",
        label: "Crítico",
      };
    default:
      return {
        text: "text-gray-600",
        background: "bg-gray-100",
        label: level.charAt(0).toUpperCase() + level.slice(1),
      };
  }
};

/**
 * Get alert level from glucose value (mg/dL)
 * Based on the glucose ranges provided:
 * < 50: critical
 * 50-69: low
 * 70-99: medium
 * 100-199: high
 * >= 200: critical
 */
export const getGlucoseLevelFromValue = (glucoseValue: number): AlertLevel => {
  if (glucoseValue < 50) return "critical";
  if (glucoseValue >= 50 && glucoseValue <= 69) return "low";
  if (glucoseValue >= 70 && glucoseValue <= 99) return "medium";
  if (glucoseValue >= 100 && glucoseValue <= 199) return "high";
  if (glucoseValue >= 200) return "critical";
  return "medium"; // fallback
};

/**
 * Get color scheme for glucose ranges
 */
export const getGlucoseRangeColors = (glucoseValue: number): ColorScheme => {
  const level = getGlucoseLevelFromValue(glucoseValue);
  const colors = getAlertLevelColors(level);

  // Override labels for glucose context
  let label = "";
  if (glucoseValue < 50) {
    label = "Muy Bajo";
  } else if (glucoseValue >= 50 && glucoseValue <= 69) {
    label = "Bajo";
  } else if (glucoseValue >= 70 && glucoseValue <= 99) {
    label = "Normal";
  } else if (glucoseValue >= 100 && glucoseValue <= 199) {
    label = "Alto";
  } else if (glucoseValue >= 200) {
    label = "Crítico";
  }

  return {
    ...colors,
    label,
  };
};

/**
 * Extract glucose value from description string
 * Looks for patterns like "Glucose low: 65 mg/dL"
 */
export const extractGlucoseValue = (description: string): number | null => {
  const match = description.match(/(\d+)\s*mg\/dL/i);
  return match ? parseInt(match[1], 10) : null;
};

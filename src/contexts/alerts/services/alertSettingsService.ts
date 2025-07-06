import type {
  Alert,
  NewAlertData,
  AlertsFilter,
} from "../types/alertSettings.types";
import { apiClient } from "../../access/services/authService";

export const getAlerts = async (
  filters: AlertsFilter = {}
): Promise<Alert[]> => {
  try {
    const { device_id, level, limit = 100, skip = 0 } = filters;

    const params = new URLSearchParams();
    if (device_id) params.append("device_id", device_id);
    if (level) params.append("level", level);
    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    const response = await apiClient.get(`/alerts?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
};

export const createAlert = async (
  alertData: NewAlertData
): Promise<Alert | null> => {
  try {
    const response = await apiClient.post("/alerts", alertData);
    return response.data;
  } catch (error) {
    console.error("Error creating alert:", error);
    return null;
  }
};

export const deleteAlert = async (alertId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/alerts/${alertId}`);
    return true;
  } catch (error) {
    console.error("Error deleting alert:", error);
    return false;
  }
};

import axios from "axios";
import type {
  Alert,
  NewAlertData,
  AlertsFilter,
} from "../types/alertSettings.types";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

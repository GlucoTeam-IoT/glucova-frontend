import axios from "axios";
import type { HealthRecord } from "../types/healthHistory.types";

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

export const getHealthHistory = async (
  limit = 100,
  skip = 0
): Promise<HealthRecord[]> => {
  try {
    const response = await apiClient.get(
      `/records?limit=${limit}&skip=${skip}`
    );

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (response.data && Array.isArray(response.data.items)) {
      return response.data.items;
    }

    // If we can't find data in either format, return empty array
    console.error("Unexpected response format:", response.data);
    return [];
  } catch (error) {
    console.error("Error fetching health records:", error);
    return [];
  }
};

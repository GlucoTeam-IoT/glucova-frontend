import type { HealthRecord } from "../types/healthHistory.types";
import { apiClient } from "../../access/services/authService";

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

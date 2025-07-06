import type { Device, NewDeviceData } from "../types/devices.types";
import { apiClient } from "../../access/services/authService";

export const getDevices = async (): Promise<Device[]> => {
  try {
    const response = await apiClient.get("/devices");
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
};

export const addDevice = async (
  deviceData: NewDeviceData
): Promise<Device | null> => {
  try {
    const response = await apiClient.post("/devices", deviceData);
    return response.data;
  } catch (error) {
    console.error("Error adding device:", error);
    return null;
  }
};

export const deleteDevice = async (deviceId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/devices/${deviceId}`);
    return true;
  } catch (error) {
    console.error("Error deleting device:", error);
    return false;
  }
};

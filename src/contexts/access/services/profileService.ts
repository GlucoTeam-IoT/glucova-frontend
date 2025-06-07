import axios from "axios";
import type { User } from "../models/user";

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

export const getProfile = async (): Promise<User> => {
  try {
    const response = await apiClient.get("/users/get-information");
    return {
      id: response.data.id,
      name: response.data.name || "",
      email: response.data.email || "",
      phone: response.data.phone || "",
      age: response.data.age?.toString() || "",
      photoUrl: response.data.photo_url || "/Glucova.png",
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    throw new Error("Can't get profile information");
  }
};

export const updateProfile = async (data: Partial<User>) => {
  try {
    const apiData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      age: data.age ? Number(data.age) : undefined,
    };

    const response = await apiClient.put("/users/update-information", apiData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Can't update profile information");
  }
};

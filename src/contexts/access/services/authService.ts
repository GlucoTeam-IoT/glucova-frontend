import axios from "axios";
import type { LoginResponse, UserSignUp } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
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

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<LoginResponse>("/users/sign-in", {
      email,
      password
    });
    
    localStorage.setItem("token", response.data.access_token);
    
    return {
      token: response.data.access_token
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.detail || "Wrong credentials");
    }
    throw new Error("Error in login");
  }
};

export const register = async (userData: UserSignUp) => {
  try {
    const response = await apiClient.post("/users/sign-up", userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.detail || "Error in registration");
    }
    throw new Error("Error in registration");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

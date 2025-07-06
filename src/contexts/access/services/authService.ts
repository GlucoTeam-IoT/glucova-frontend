import axios from "axios";
import type { LoginResponse, UserSignUp } from "../models/user";
import { apiClient } from "../../../shared/services/apiClient";

// Variable para almacenar el callback de sesión expirada
let sessionExpiredCallback: (() => void) | null = null;

// Request interceptor - add token to requests
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

// Response interceptor - handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is 401 or 403 (unauthorized/forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Token exists but is invalid/expired, trigger session expired callback
        if (sessionExpiredCallback) {
          sessionExpiredCallback();
        }
      } else {
        // No token, redirect to login immediately
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Function to set the session expired callback
export const setSessionExpiredCallback = (callback: () => void) => {
  sessionExpiredCallback = callback;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post<LoginResponse>("/users/sign-in", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.access_token);

    return {
      token: response.data.access_token,
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

// Export the configured axios instance for use in other services
export { apiClient };

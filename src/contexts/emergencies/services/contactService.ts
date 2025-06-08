import axios from "axios";
import type { Contact, NewContactData } from "../types/contact.types";

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

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const addContact = async (
  contactData: NewContactData
): Promise<Contact | null> => {
  try {
    const response = await apiClient.post("/contacts", contactData);
    return response.data;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

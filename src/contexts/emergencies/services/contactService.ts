import type { Contact, NewContactData } from "../types/contact.types";
import { apiClient } from "../../access/services/authService";

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

export const updateContact = async (
  contactId: string,
  contactData: NewContactData
): Promise<Contact | null> => {
  try {
    const response = await apiClient.put(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

export const deleteContact = async (contactId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/contacts/${contactId}`);
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    return false;
  }
};

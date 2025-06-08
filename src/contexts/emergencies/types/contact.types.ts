export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

export type NewContactData = Omit<Contact, "id" | "user_id">;

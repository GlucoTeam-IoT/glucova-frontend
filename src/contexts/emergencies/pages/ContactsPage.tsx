import { useState, useEffect } from "react";
import ContactCard from "../components/ContactCard";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { UserPlus } from "lucide-react";
import type { Contact, NewContactData } from "../types/contact.types";
import { addContact, getContacts } from "../services/contactService";
import AddContactForm from "../components/AddContactForm";

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contacts", err);
      setError(
        "No se pudieron cargar los contactos. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData: NewContactData) => {
    try {
      setLoading(true);
      const newContact = await addContact(contactData);
      if (newContact) {
        setContacts([...contacts, newContact]);
        setShowForm(false);
      }
    } catch (err) {
      console.error("Failed to add contact", err);
      setError("No se pudo agregar el contacto. Intente nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex mb-6 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Contactos de emergencia
          </h1>
          <p className="text-gray-600">
            Administra tus contactos para notificaciones de emergencia
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <UserPlus className="w-4 h-4" />
            Agregar contacto
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <AddContactForm
        isOpen={showForm}
        onSubmit={handleAddContact}
        onCancel={() => setShowForm(false)}
      />

      {loading ? (
        <LoadingSpinner size="large" fullPage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          ) : (
            <div className="col-span-full p-8 bg-white rounded-md shadow text-center">
              <p className="text-gray-500 mb-2">
                No hay contactos de emergencia agregados
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ContactsPage;

import { useState, useEffect } from "react";
import ContactCard from "../components/ContactCard";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { UserPlus } from "lucide-react";
import type { Contact, NewContactData } from "../types/contact.types";
import {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../services/contactService";
import AddContactForm from "../components/AddContactForm";
import DeleteContactModal from "../components/DeleteContactModal";
import { motion } from "motion/react";

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
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

      if (editingContact) {
        // Update existing contact
        const updatedContact = await updateContact(
          editingContact.id,
          contactData
        );
        if (updatedContact) {
          setContacts(
            contacts.map((contact) =>
              contact.id === editingContact.id ? updatedContact : contact
            )
          );
          setShowForm(false);
          setEditingContact(null);
        }
      } else {
        // Add new contact
        const newContact = await addContact(contactData);
        if (newContact) {
          setContacts([...contacts, newContact]);
          setShowForm(false);
        }
      }
    } catch (err) {
      console.error("Failed to save contact", err);
      setError("No se pudo guardar el contacto. Intente nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      setLoading(true);
      const success = await deleteContact(contactToDelete.id);
      if (success) {
        setContacts(
          contacts.filter((contact) => contact.id !== contactToDelete.id)
        );
        setContactToDelete(null);
      }
    } catch (err) {
      console.error("Failed to delete contact", err);
      setError(
        "No se pudo eliminar el contacto. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
        onCancel={handleCancelForm}
        editingContact={editingContact}
      />

      <DeleteContactModal
        isOpen={contactToDelete !== null}
        contact={contactToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setContactToDelete(null)}
      />

      {loading ? (
        <LoadingSpinner size="large" fullPage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
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
    </motion.div>
  );
};

export default ContactsPage;

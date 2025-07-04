import { Mail, Phone, UserCircle, Edit, Trash2 } from "lucide-react";
import type { Contact } from "../types/contact.types";

type Props = {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};

const ContactCard = ({ contact, onEdit, onDelete }: Props) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(contact);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(contact);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer relative group"
      onClick={() => onEdit(contact)}
    >
      {/* Action buttons */}
      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="p-1 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 transition-colors"
          title="Editar contacto"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition-colors"
          title="Eliminar contacto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800 pr-16">
          {contact.name}
        </h3>
        <div className="bg-red-100 rounded-full p-2">
          <UserCircle className="w-8 h-8 text-red-600" />
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-blue-600" />
          <a
            href={`mailto:${contact.email}`}
            className="text-sm hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {contact.email}
          </a>
        </div>

        {contact.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-blue-600" />
            <a
              href={`tel:${contact.phone}`}
              className="text-sm hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {contact.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;

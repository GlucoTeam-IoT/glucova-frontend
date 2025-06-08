import { Mail, Phone, UserCircle } from "lucide-react";
import type { Contact } from "../types/contact.types";

type Props = {
  contact: Contact;
};

const ContactCard = ({ contact }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-800">{contact.name}</h3>
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

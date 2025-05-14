import {
  Home,
  User,
  History,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
      isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
    }`;

  return (
    <div className="md:w-64">
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle Menu"
  className="p-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {isOpen ? <X size={24} /> : <Menu size={24} />}
</button>
      </div>
      <nav
        className={`flex flex-col gap-4 px-4 py-6 bg-white shadow-md md:shadow-none md:block ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <NavLink to="/dashboard" className={navLinkClasses}>
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/profile" className={navLinkClasses}>
          <User size={20} />
          Perfil
        </NavLink>

        <NavLink to="/history" className={navLinkClasses}>
          <History size={20} />
          Historial
        </NavLink>

        <NavLink to="/alerts" className={navLinkClasses}>
          <AlertCircle size={20} />
          Alertas
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

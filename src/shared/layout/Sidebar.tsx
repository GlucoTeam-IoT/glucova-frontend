import {
  LineChart,
  User,
  ClipboardList,
  Bell,
  Menu,
  X,
  Users,
  HardDrive,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Added class to ensure consistent spacing in both mobile and desktop
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-md transition-colors my-2 md:my-3 ${
      isActive
        ? "text-white font-medium bg-blue-600 hover:text-white"
        : "text-gray-700 hover:bg-blue-600 hover:text-white"
    }`;

  // Close sidebar when an item is clicked
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`md:w-64 bg-white h-full md:relative ${
          isOpen ? "fixed inset-y-0 left-0 z-30 w-64" : ""
        }`}
      >
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
          className={`flex flex-col px-4 py-6 bg-white h-full ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/dashboard"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <LineChart size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <User size={20} />
            Perfil
          </NavLink>

          <NavLink
            to="/history"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <ClipboardList size={20} />
            Historial
          </NavLink>

          <NavLink
            to="/devices"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <HardDrive size={20} />
            Dispositivos
          </NavLink>

          <NavLink
            to="/alerts"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <Bell size={20} />
            Alertas
          </NavLink>
          <NavLink
            to="/contacts"
            className={navLinkClasses}
            onClick={handleLinkClick}
          >
            <Users size={20} />
            Contactos
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

//Sidebar
import { Home, User, History, AlertCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white h-full shadow px-4 py-6">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
            }`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
            }`
          }
        >
          <User size={20} />
          Perfil
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
            }`
          }
        >
          <History size={20} />
          Historial
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
            }`
          }
        >
          <AlertCircle size={20} />
          Alertas
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

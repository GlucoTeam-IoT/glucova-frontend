import { Bell, Menu } from "lucide-react";



const Header = () => {
  return (
    <header className="h-16 bg-white shadow px-4 md:px-6 flex items-center justify-between">
      {/* Menú hamburguesa solo visible en móviles */}
      <div className="flex items-center gap-2">
        <img src="/Glucova.png" alt="GlucoVa" className="h-10" />
      </div>

      {/* Acciones a la derecha */}
      <div className="flex items-center gap-4">
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <Bell size={20} />
        </button>
        <img
          src="/Glucova.png"
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;

import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      <img src="/Glucova.png" alt="GlucoVa" className="h-10" />

      <div className="flex items-center gap-4">
        <button className="bg-gray-100 p-2 rounded-full">
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
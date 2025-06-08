import { Camera } from "lucide-react";

type Props = {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ProfileForm = ({ formData, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Columna izquierda - Foto de perfil */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="/Glucova.png"
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mx-auto"
          />
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition">
            <Camera className="w-4 h-4" />
            Cambiar foto
          </button>
        </div>

        {/* Columna derecha - Datos */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm text-gray-600">
              Nombre completo
            </label>
            <input
              name="Name"
              value={formData.name}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Teléfono</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Edad</label>
            <input
              name="age"
              value={formData.age}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="number"
            />
          </div>

          {/* <hr className="my-4" />
          <h3 className="font-semibold text-lg">Cambiar contraseña</h3>

          <div>
            <label className="block text-sm text-gray-600">
              Contraseña actual
            </label>
            <input
              name="currentPassword"
              value={formData.currentPassword}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="password"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Nueva Contraseña</label>
            <input
              name="newPassword"
              value={formData.newPassword}
              onChange={onChange}
              className="mt-1 w-full border rounded px-3 py-2"
              type="password"
            />
          </div> */}

          <div className="text-right pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;

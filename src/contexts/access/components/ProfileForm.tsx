type Props = {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ProfileForm = ({ formData, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <img
          src="/Glucova.png"
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover"
        />
        <button type="button" className="text-blue-600 text-sm underline">
          📸 Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
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
          <label className="block text-sm text-gray-600">Age</label>
          <input
            name="age"
            value={formData.age}
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2"
            type="number"
          />
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <h3 className="font-semibold">Change Password</h3>
        <div>
          <label className="block text-sm text-gray-600">Current Password</label>
          <input
            name="currentPassword"
            value={formData.currentPassword}
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2"
            type="password"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">New Password</label>
          <input
            name="newPassword"
            value={formData.newPassword}
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2"
            type="password"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

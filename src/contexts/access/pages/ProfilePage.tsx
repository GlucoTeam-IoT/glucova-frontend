import { useState } from "react";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    age: "35",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
      <ProfileForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfilePage;

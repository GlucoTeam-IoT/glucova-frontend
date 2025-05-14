import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { getProfile, updateProfile } from "../services/profileService";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    id: 1,
    fullName: "",
    email: "",
    age: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getProfile();
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
      }));
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      ...formData,
      photoUrl: "/Glucova.png",
    });
    alert("Cambios guardados correctamente.");
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

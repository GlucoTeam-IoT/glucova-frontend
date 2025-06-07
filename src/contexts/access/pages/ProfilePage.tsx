import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import { logout } from "../services/authService";
import { getProfile, updateProfile } from "../services/profileService";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: 0,
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await getProfile();
        setFormData((prev) => ({
          ...prev,
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          age: userData.age || 0,
          currentPassword: "",
          newPassword: "",
        }));
        setError(null);
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Can't load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
      });

      // if (formData.currentPassword && formData.newPassword) {
      //   await updatePassword(formData.currentPassword, formData.newPassword);

      //   setFormData(prev => ({
      //     ...prev,
      //     currentPassword: "",
      //     newPassword: ""
      //   }));
      // }

      alert("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Can't update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      {loading && <p className="text-center py-4">Loading...</p>}

      {error && <p className="text-center text-red-500 py-2">{error}</p>}

      {!loading && !error && (
        <ProfileForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ProfilePage;

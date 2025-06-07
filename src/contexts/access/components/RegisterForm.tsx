import { useState } from "react";
import { login, register } from "../services/authService";
import { updateProfile } from "../services/profileService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!form.agreeTerms) {
      return setError("You must accept the terms and conditions.");
    }

    setLoading(true);
    try {
      // Register with email and password only
      await register({
        email: form.email,
        password: form.password,
      });

      // Auto-login after successful registration
      await login(form.email, form.password);
      console.log("User logged in successfully");

      // Update user profile with additional information
      await updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: form.age ? Number(form.age) : undefined,
      });
      console.log("User profile updated successfully");

      // Navigate to dashboard after successful profile update
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.age}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={form.agreeTerms}
          onChange={handleChange}
        />
        I agree to the Terms of Service and Privacy Policy
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm mt-2 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./contexts/access/pages/loginPage";
import RegisterPage from "./contexts/access/pages/RegisterPage";
import DashboardPage from "./contexts/records/pages/DashboardPage";
import ProfilePage from "./contexts/access/pages/ProfilePage";
import HealthHistoryPage from "./contexts/records/pages/HealthHistoryPage";
import AlertSettingsPage from "./contexts/alerts/pages/AlertSettingsPage";
import ContactsPage from "./contexts/emergencies/pages/ContactsPage";
import DevicesPage from "./contexts/devices/pages/DevicesPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Private routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/History" element={<HealthHistoryPage />} />
        <Route path="/Alerts" element={<AlertSettingsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

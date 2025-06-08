import { Routes, Route } from "react-router-dom";
import LoginPage from "./contexts/access/pages/loginPage";
import RegisterPage from "./contexts/access/pages/RegisterPage";
import DashboardPage from "./contexts/records/pages/DashboardPage";
import AppLayout from "./shared/layout/AppLayout";
import ProfilePage from "./contexts/access/pages/ProfilePage";
import HealthHistoryPage from "./contexts/records/pages/HealthHistoryPage";
import AlertSettingsPage from "./contexts/alerts/pages/AlertSettingsPage";
import ContactsPage from "./contexts/emergencies/pages/ContactsPage";
import DevicesPage from "./contexts/devices/pages/DevicesPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas con layout */}
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        }
      />
      <Route
        path="/History"
        element={
          <AppLayout>
            <HealthHistoryPage />
          </AppLayout>
        }
      />
      <Route
        path="/Alerts"
        element={
          <AppLayout>
            <AlertSettingsPage />
          </AppLayout>
        }
      />
      <Route
        path="/contacts"
        element={
          <AppLayout>
            <ContactsPage />
          </AppLayout>
        }
      />
      <Route
        path="/devices"
        element={
          <AppLayout>
            <DevicesPage />
          </AppLayout>
        }
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

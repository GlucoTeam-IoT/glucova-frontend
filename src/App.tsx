import { Routes, Route } from "react-router-dom";
import LoginPage from "./contexts/access/pages/loginPage";
import RegisterPage from "./contexts/access/pages/RegisterPage";
import DashboardPage from "./contexts/records/pages/DashboardPage";
import AppLayout from "./shared/layout/AppLayout";
import ProfilePage from "./contexts/access/pages/ProfilePage";
import HealthHistoryPage from "./contexts/records/pages/HealthHystoryPage";
import AlertSettingsPage from "./contexts/alerts/pages/AlertSettingsPage";

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

      {/* Ruta por defecto */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import LoginPage from "./contexts/access/pages/loginPage";
import RegisterPage from "./contexts/access/pages/RegisterPage";
import DashboardPage from "./contexts/records/pages/DashboardPage";
import AppLayout from "./shared/layout/AppLayout";

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

      {/* Ruta por defecto */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

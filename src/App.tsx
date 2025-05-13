import {Routes, Route } from "react-router-dom";
import LoginPage from "./contexts/access/pages/loginPage";
import RegisterPage from "./contexts/access/pages/RegisterPage";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../src/contexts/access/pages/loginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

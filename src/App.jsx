import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
// 1. Importamos nuestro nuevo componente de ruta protegida
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas (Cualquiera puede verlas) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ruta Protegida */}
        <Route
          path="/dashboard"
          element={
            // 2. Envolvemos el Dashboard con nuestro "portero de seguridad".
            // Si el usuario no ha iniciado sesión, ProtectedRoute lo redirigirá a /login.
            // Si ha iniciado sesión, le mostrará el DashboardPage.
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**
 * @file App.jsx
 * @module App
 * @description Componente raíz de la aplicación que define la estructura de enrutamiento
 * utilizando react-router-dom. Distingue entre rutas públicas y rutas protegidas.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

/**
 * @function App
 * @description Componente principal que envuelve toda la aplicación con el enrutador
 * y define la correspondencia entre las rutas URL y los componentes de página.
 * @returns {JSX.Element} La estructura de rutas de la aplicación.
 */
function App() {
  return (
    // BrowserRouter activa el enrutamiento declarativo en la aplicación.
    <BrowserRouter>
      {/* Routes es el contenedor donde se definen las diferentes rutas. */}
      <Routes>
        {/* --- Rutas Públicas --- */}
        {/* Estas rutas son accesibles para todos los usuarios, autenticados o no. */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- Rutas Protegidas --- */}
        {/* La ruta del dashboard está envuelta por el componente ProtectedRoute. */}
        <Route
          path="/dashboard"
          element={
            // ProtectedRoute verifica si el usuario tiene una sesión activa.
            // Si es así, renderiza el componente hijo (DashboardPage).
            // Si no, redirige al usuario a la página de login.
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

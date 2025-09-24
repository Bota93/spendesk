/**
 * @file App.jsx
 * @module App
 * @description Componente raíz de la aplicación que define la estructura de enrutamiento.
 * Ahora incluye el proveedor de notificaciones <Toaster> para una UX mejorada.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
// 1. Importamos el componente Toaster de la librería react-hot-toast
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

/**
 * @function App
 * @description Componente principal que envuelve toda la aplicación con el enrutador
 * y el proveedor de notificaciones, definiendo las rutas públicas y protegidas.
 * @returns {JSX.Element} La estructura de rutas de la aplicación.
 */
function App() {
  return (
    <BrowserRouter>
      {/*
        2. Colocamos el componente <Toaster> aquí, fuera de <Routes>.
        Esto crea un contenedor global que estará presente en todas las páginas,
        permitiendo que las notificaciones se muestren sin importar dónde nos encontremos.
        'position="top-right"' define en qué esquina de la pantalla aparecerán.
      */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- Ruta Protegida --- */}
        <Route
          path="/dashboard"
          element={
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

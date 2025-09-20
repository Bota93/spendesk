import React from "react";
import { Navigate } from "react-router-dom";
// 1. Importamos nuestro hook 'useAuth' para acceder al estado de la sesión
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  // 2. Usamos el hook para obtener la sesión actual
  const { session } = useAuth();

  // 3. La lógica del portero:
  // Si NO hay sesión...
  if (!session) {
    // ...lo redirigimos a la página de login.
    // Navigate es un componente de react-router-dom que hace la redirección.
    return <Navigate to="/login" />;
  }

  // 4. Si SÍ hay sesión, dejamos que pase y mostramos lo que sea que esté protegiendo
  // (en nuestro caso, será el Dashboard).
  return children;
}

export default ProtectedRoute;

/**
 * @file ProtectedRoute.jsx
 * @module components/ProtectedRoute
 * @description Componente de orden superior (HOC) que implementa la lógica de protección de rutas
 * basándose en el estado de autenticación del usuario.
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * @function ProtectedRoute
 * @description Un componente wrapper que condiciona el renderizado de sus hijos
 * a la existencia de una sesión de usuario activa. Si no hay sesión,
 * redirige al usuario a la página de inicio de sesión.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El componente o conjunto de componentes anidados que se protegerán.
 * @returns {JSX.Element} Renderiza los componentes hijos si el usuario está autenticado,
 * o el componente <Navigate> para redirigir si no lo está.
 */
function ProtectedRoute({ children }) {
  // Obtiene el estado de la sesión desde el contexto de autenticación global.
  const { session } = useAuth();

  // Condición de acceso: si no existe una sesión activa, se impide el acceso.
  if (!session) {
    // Se utiliza el componente <Navigate> de react-router-dom para realizar
    // una redirección declarativa al endpoint de login.
    return <Navigate to="/login" />;
  }

  // Si la condición de acceso se cumple, se renderizan los componentes hijos.
  return children;
}

export default ProtectedRoute;

/**
 * @file main.jsx
 * @module main
 * @description Punto de entrada principal de la aplicación React. Este archivo es responsable
 * de renderizar el componente raíz (<App />) en el DOM y de envolverlo con los
 * proveedores de contexto necesarios.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

// Utiliza la API moderna de React 18 para crear la raíz de la aplicación,
// adjuntándola al elemento del DOM con el id 'root'.
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode es una herramienta de desarrollo de React que activa comprobaciones
  // y advertencias adicionales para ayudar a detectar posibles problemas en la aplicación.
  <React.StrictMode>
    {/*
      AuthProvider envuelve toda la aplicación, asegurando que cualquier componente
      pueda acceder al estado de autenticación a través del hook `useAuth`.
      Este patrón de proveedor de contexto es fundamental para la gestión de estado global.
    */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

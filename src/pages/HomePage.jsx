/**
 * @file HomePage.jsx
 * @module pages/HomePage
 * @description Página de bienvenida (Landing Page) de la aplicación. Actúa como punto de entrada
 * para los visitantes, ofreciendo una breve descripción del propósito de la aplicación y
 * proporcionando la navegación principal hacia las rutas de autenticación.
 */

import React from "react";
import { Link } from "react-router-dom";

/**
 * @function HomePage
 * @description Renderiza la página de inicio estática. Este componente es puramente de presentación
 * y no contiene lógica de estado. Utiliza el componente <Link> de react-router-dom
 * para una navegación fluida hacia las páginas de Login y Registro.
 * @returns {JSX.Element}
 */
function HomePage() {
  return (
    // El elemento <main> envuelve el contenido principal de la página.
    <main className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-900 p-4">
      {/* Sección principal que contiene el titular y la descripción de la aplicación. */}
      <section className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Bienvenido a <span className="text-emerald-500">Spendesk</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          Toma el control de tus finanzas personales. Registra tus gastos,
          visualiza tus patrones de consumo y alcanza tus metas financieras de
          una manera simple e intuitiva.
        </p>
      </section>

      {/* Navegación principal que dirige a los usuarios a las acciones de autenticación. */}
      <nav className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Registrarse
        </Link>
      </nav>
    </main>
  );
}

export default HomePage;
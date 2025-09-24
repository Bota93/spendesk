/**
 * @file HomePage.jsx
 * @module pages/HomePage
 * @description Landing Page de la aplicación. Actúa como escaparate de las características
 * clave del proyecto e informa a los usuarios sobre la naturaleza de la demo.
 */

import React from "react";
import { Link } from "react-router-dom";

/**
 * @function HomePage
 * @description Renderiza la página de inicio estática. Este componente es puramente de presentación,
 * diseñado para introducir la aplicación, destacar sus funcionalidades y guiar al usuario
 * hacia las rutas de autenticación.
 * @returns {JSX.Element}
 */
function HomePage() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-slate-800 p-4">
      <div className="container mx-auto text-center">
        {/* --- Sección Principal (Hero) --- */}
        <section className="py-16 sm:py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Bienvenido a <span className="text-emerald-500">Spendesk</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Toma el control de tus finanzas personales. Registra tus gastos,
            visualiza tus patrones de consumo y alcanza tus metas financieras de
            una manera simple e intuitiva.
          </p>

          {/* --- Notificación de Entorno de Demostración --- */}
          <div
            className="max-w-3xl mx-auto bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg relative mb-8"
            role="alert"
          >
            <strong className="font-bold">¡Atención!</strong>
            <span className="block sm:inline ml-2">
              Esta es una versión de demostración. Todas las cuentas de usuario
              y sus datos serán eliminados automáticamente tras 30 minutos de
              inactividad.
            </span>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Registrarse
            </Link>
          </nav>
        </section>

        {/* --- Sección de Características --- */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Funcionalidades Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-gray-800 p-6 rounded-lg text-left">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400 mr-3"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <h3 className="text-xl font-bold">Gestión CRUD Completa</h3>
              </div>
              <p className="text-gray-400">
                Los usuarios pueden Crear, Leer, Actualizar y Eliminar (CRUD)
                sus transacciones. La interfaz se actualiza en tiempo real.
              </p>
            </article>

            <article className="bg-gray-800 p-6 rounded-lg text-left">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400 mr-3"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <h3 className="text-xl font-bold">Autenticación y Seguridad</h3>
              </div>
              <p className="text-gray-400">
                Sistema de autenticación completo con Supabase. Las rutas del
                dashboard están protegidas y los datos son privados para cada
                usuario gracias a las políticas de seguridad (RLS).
              </p>
            </article>

            <article className="bg-gray-800 p-6 rounded-lg text-left">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400 mr-3"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  <path d="M2 8c0-2.2.7-4.3 2-6"></path>
                  <path d="M22 8a10 10 0 0 0-2-6"></path>
                </svg>
                <h3 className="text-xl font-bold">Modo Demo Inteligente</h3>
              </div>
              <p className="text-gray-400">
                Crea una cuenta de demostración única y temporal con un solo
                clic. Todas las cuentas se limpian automáticamente.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;

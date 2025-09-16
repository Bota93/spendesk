import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <section className="mb-8">
        <h1 className="text-6xl font-bold mb-4">
          Bienvenido a <span className="text-emerald-500">SpenDesk</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Toma el control de tus finanzas personales. Registra tus gastos,
          visualiza tus patrones de consumo y alcanza tus metas financieras de
          una manera simple e intuitiva.
        </p>
      </section>
      <nav className="flex gap-4">
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

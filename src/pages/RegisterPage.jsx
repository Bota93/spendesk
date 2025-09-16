import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-emerald-400">
            Crear una cuenta
          </h1>
          <p className="mt-2 text-gray-400">
            Únete a <span className="text-emerald-400">Spendesk</span> y toma el
            control de tus finanzas.
          </p>
        </header>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <footer className="text-sm text-center">
          <p className="text-gray-400">
            ¿Ya tienes cuenta? <Link to="/login" className="font-medium text-emerald-400 hover:underline">Inicia sesión aquí</Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

export default RegisterPage;

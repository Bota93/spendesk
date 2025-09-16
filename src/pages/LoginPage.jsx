import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full maxx-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-emerald-400">
            Iniciar Sesión
          </h1>
          <p className="mt-2 text-gray-400">
            Bienvenido de nuevo a <span>SpenDesk</span>
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

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full py-3 px-4 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition duration-300"
            >
              Entrar
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition duration-300"
            >
              Demo
            </button>
          </div>
        </form>

        <footer className="text-sm text-center">
          <p className="text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-emerald-400 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;

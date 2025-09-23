/**
 * @file LoginPage.jsx
 * @module pages/LoginPage
 * @description Página de inicio de sesión. Implementa la autenticación estándar y una
 * funcionalidad avanzada para crear usuarios de demostración dinámicos y únicos.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.jsx";

/**
 * @function LoginPage
 * @description Componente que gestiona dos flujos de autenticación:
 * 1. Inicio de sesión estándar con email/contraseña para usuarios registrados.
 * 2. Creación e inicio de sesión "al vuelo" para usuarios de demostración temporales.
 * @returns {JSX.Element}
 */
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * @async
   * @function handleLogin
   * @description Gestiona el inicio de sesión para usuarios existentes.
   * @param {React.FormEvent<HTMLFormElement>} event - Objeto del evento del formulario.
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @async
   * @function handleDemoLogin
   * @description Proporciona una experiencia de demostración creando un nuevo usuario temporal
   * con credenciales aleatorias. Se añaden metadatos (`is_demo: true`) a este usuario
   * para permitir su identificación y posterior limpieza automática desde el backend.
   * Supabase inicia sesión automáticamente tras un `signUp` exitoso.
   */
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // Genera credenciales únicas para asegurar una sesión de demo aislada.
      const demoEmail = `demo-${Date.now()}@example.com`;
      const demoPassword = Math.random().toString(36).slice(-8);

      // Crea el nuevo usuario demo. El `signUp` también inicia la sesión.
      const { data, error } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          // Se inyectan metadatos para identificar a este usuario como temporal/demo.
          data: {
            is_demo: true,
          },
        },
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear el usuario demo:", error);
      alert("No se pudo iniciar el modo de demostración.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <section className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">Inicia Sesión</h1>
          <p className="text-gray-400">Bienvenido de nuevo a Spendesk.</p>
        </header>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Entrar"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-gray-400">o</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full py-3 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700 transition duration-300 disabled:bg-gray-500"
          disabled={loading}
        >
          Entrar como Usuario Demo
        </button>

        <footer className="text-center mt-6">
          <p className="text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-emerald-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

export default LoginPage;

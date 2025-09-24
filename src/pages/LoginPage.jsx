/**
 * @file LoginPage.jsx
 * @module pages/LoginPage
 * @description Página de inicio de sesión que gestiona la autenticación del usuario.
 * Utiliza notificaciones 'toast' para proporcionar feedback de UX no intrusivo.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.jsx";
import toast from "react-hot-toast";

/**
 * @function LoginPage
 * @description Componente que maneja el estado del formulario de login, las llamadas a la API
 * de Supabase para la autenticación y la creación de usuarios de demostración dinámicos.
 * @returns {JSX.Element}
 */
function LoginPage() {
  // Estados para gestionar los campos controlados del formulario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * @async
   * @function handleLogin
   * @description Gestiona el envío del formulario para usuarios existentes.
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

      toast.success("¡Sesión iniciada con éxito!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @async
   * @function handleDemoLogin
   * @description Crea un nuevo usuario de demostración temporal con credenciales aleatorias
   * y lo autentica inmediatamente.
   */
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const demoEmail = `demo-${Date.now()}@example.com`;
      const demoPassword = Math.random().toString(36).slice(-8);

      const { data, error } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          data: {
            is_demo: true,
          },
        },
      });

      if (error) throw error;

      toast.success("¡Modo demo iniciado con éxito!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear el usuario demo:", error);
      toast.error("No se pudo iniciar el modo de demostración.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 p-4">
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

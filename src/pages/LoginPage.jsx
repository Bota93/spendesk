/**
 * @file LoginPage.jsx
 * @module pages/LoginPage
 * @description Página que renderiza el formulario de inicio de sesión y gestiona la lógica
 * de autenticación del usuario, incluyendo un modo de demostración.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.jsx";

/**
 * @function LoginPage
 * @description Componente funcional que gestiona el estado del formulario, las llamadas a la API
 * de autenticación de Supabase y la navegación del usuario tras un inicio de sesión exitoso.
 * @returns {JSX.Element}
 */
function LoginPage() {
  // Estados para gestionar los campos controlados del formulario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para gestionar la UI durante las peticiones asíncronas, previniendo envíos múltiples.
  const [loading, setLoading] = useState(false);

  // Hook de react-router-dom para la redirección programática del usuario.
  const navigate = useNavigate();

  /**
   * @async
   * @function handleLogin
   * @description Gestiona el envío del formulario de inicio de sesión estándar.
   * Llama al método `signInWithPassword` de Supabase y redirige al dashboard si tiene éxito.
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

      // Redirección al dashboard tras un inicio de sesión exitoso.
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
   * @description Inicia sesión utilizando credenciales de demostración predefinidas.
   * Facilita la revisión de la aplicación por parte de visitantes o reclutadores.
   */
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "demo@example.com",
        password: "password123",
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error) {
      console.error("Error detallado del Login Demo:", error);
      alert(
        "Credenciales del modo demo inválidas. Revisa la consola para más detalles."
      );
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
          {/* Campo de Email (controlado) */}
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
          {/* Campo de Contraseña (controlado) */}
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

        {/* Botón para el flujo de autenticación de demostración */}
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

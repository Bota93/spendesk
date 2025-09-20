import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Importamos nuestro cliente de Supabase
import { supabase } from "../lib/supabaseClient.jsx";

function LoginPage() {
  // 2. Estados para guardar los datos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // 3. 'useNavigate' es una herramienta para redirigir al usuario
  const navigate = useNavigate();

  // 4. Función para manejar el inicio de sesión normal
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // 5. Llamamos a la función de inicio de sesión de Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // 6. Si el login es exitoso, redirigimos al usuario al Dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 7. Función específica para el login del usuario Demo
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "demo@example.com",
        password: "password123", // ¡OJO! Esta debe ser la contraseña que estableciste en Supabase
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error) {
      console.error("Error detallado del Login:", error);
      alert(
        "Credenciales inválidas. Revisa la consola del navegador para más detalles."
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

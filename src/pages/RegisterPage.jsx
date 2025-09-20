import React, { useState } from "react";
// 1. Importamos 'useNavigate' para poder redirigir
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.jsx";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // 2. Preparamos la herramienta de navegación
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      alert("¡Registro exitoso! Serás redirigido al Dashboard.");

      // 3. ¡LA SOLUCIÓN! Si el registro es exitoso, lo llevamos al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error detallado durante el REGISTRO:", error);
      alert("Hubo un error al registrar. Revisa la consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // El JSX del formulario no cambia en absoluto
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <section className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">
            Crear una Cuenta
          </h1>
          <p className="text-gray-400">
            Únete a Spendesk y toma el control de tus finanzas.
          </p>
        </header>

        <form onSubmit={handleRegister}>
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
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <footer className="text-center mt-6">
          <p className="text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

export default RegisterPage;

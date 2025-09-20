import React, {useState} from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault(); // Esto previene que la página se recargue, que es el comportamiento por defecto
    setLoading(true);

    try {
      // 4. Aquí ocurre la magia: llamamos a la función de registro de Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        // Si Supabase nos devuelve un error, lo lanzamos para que lo capture el 'catch'
        throw error;
      }

      // Si todo va bien, mostramos un mensaje de éxito
      alert(
        "¡Registro exitoso! Revisa tu correo electrónico para confirmar la cuenta."
      );
    } catch (error) {
      // Si algo falla durante el proceso, mostramos el error en un alert
      alert(error.error_description || error.message);
    } finally {
      // 5. Pase lo que pase (éxito o error), nos aseguramos de que el estado de carga vuelva a 'false'
      setLoading(false);
    }
  };

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

        <form onSubmit={handleRegister} className="space-y-6">
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
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-400 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

export default RegisterPage;

/**
 * @file AuthContext.jsx
 * @module context/AuthContext
 * @description Provee un contexto global para la gestión del estado de autenticación
 * en toda la aplicación, utilizando la API de Context de React y el cliente de Supabase.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.jsx";

// Crea el contexto de autenticación que será compartido.
const AuthContext = createContext();

/**
 * @function AuthProvider
 * @description Un componente proveedor que envuelve la aplicación y gestiona el estado
 * de la sesión, suscribiéndose a los cambios de autenticación de Supabase.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intenta obtener la sesión activa al cargar la aplicación por primera vez.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Se suscribe a los cambios en el estado de autenticación (SIGNED_IN, SIGNED_OUT).
    // El callback se ejecuta cada vez que el usuario inicia o cierra sesión.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Función de limpieza: se desuscribe del listener cuando el componente se desmonta
    // para evitar fugas de memoria y llamadas innecesarias.
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // El valor del contexto que se compartirá con todos los componentes consumidores.
  const value = {
    session,
    user: session?.user ?? null, // Provee el objeto user o null si no hay sesión.
  };

  // No renderiza la aplicación hasta que se haya verificado el estado inicial de la sesión.
  // Esto previene parpadeos en la UI (por ejemplo, mostrar la página de login por un instante).
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * @function useAuth
 * @description Hook personalizado para consumir el AuthContext de forma sencilla
 * desde cualquier componente, evitando la importación repetitiva de useContext y AuthContext.
 * @returns {object} El valor del contexto, que contiene la sesión y el usuario.
 */
export function useAuth() {
  return useContext(AuthContext);
}

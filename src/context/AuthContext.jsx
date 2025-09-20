import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.jsx";

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el "Proveedor" del contexto
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentamos obtener la sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchamos los cambios en el estado de autenticación (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Nos desuscribimos del listener cuando el componente se desmonta
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // El valor que compartiremos con toda la app
  const value = {
    session,
    user: session?.user || null,
  };

  // El proveedor envuelve a los componentes hijos (nuestra app)
  // No renderizamos nada hasta que sepamos si hay sesión o no
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Creamos un "hook" personalizado para usar el contexto más fácilmente
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * @file DashboardPage.jsx
 * @module pages/DashboardPage
 * @description Página principal de la aplicación para usuarios autenticados. Muestra un resumen
 * financiero, una lista de transacciones y permite la creación de nuevos movimientos.
 */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

// TODO: Reemplazar estos datos estáticos con una llamada a la API de Supabase.
const mockTransactions = [
  {
    id: 1,
    concept: "Salario Septiembre",
    amount: 1850.0,
    date: "2024-09-01",
    type: "income",
  },
  {
    id: 2,
    concept: "Alquiler",
    amount: 650.0,
    date: "2024-09-05",
    type: "expense",
  },
  // ... (más datos de prueba)
];

/**
 * @function DashboardPage
 * @description Renderiza el panel principal del usuario, incluyendo el balance, la lista
 * de transacciones y los controles para añadir nuevos datos y cerrar sesión.
 * @returns {JSX.Element}
 */
function DashboardPage() {
  // Hook para acceder a la información de la sesión desde el contexto global.
  const { session } = useAuth();
  // Hook de react-router-dom para la navegación programática.
  const navigate = useNavigate();

  // Estado para controlar la visibilidad del modal de añadir transacción.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Ref para obtener una referencia directa al elemento <dialog> del DOM.
  const modalRef = useRef(null);

  // Efecto secundario que sincroniza el estado `isModalOpen` con el estado del <dialog> nativo.
  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      isModalOpen ? dialog.showModal() : dialog.close();
    }
  }, [isModalOpen]);

  /**
   * Gestiona el cierre de sesión del usuario.
   * Invoca el método signOut de Supabase y redirige al usuario.
   */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      // La redirección es manejada automáticamente por ProtectedRoute al actualizarse el AuthContext,
      // pero una navegación explícita asegura el comportamiento.
      navigate("/");
    }
  };

  // TODO: Reemplazar este cálculo en el cliente por una llamada a una función RPC de Supabase para mayor eficiencia.
  const totalBalance = mockTransactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AddTransactionModal
        ref={modalRef}
        onClose={() => setIsModalOpen(false)}
      />

      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Spendesk</h1>
            {/* Muestra el email del usuario si la sesión está activa, confirmando la autenticación. */}
            {session && (
              <p className="text-sm text-gray-400">{session.user.email}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Componente visual para el balance total */}
        <section className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 text-center">
          <h2 className="text-lg font-semibold text-gray-400">Balance Total</h2>
          <p
            className={`text-4xl font-bold ${
              totalBalance >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {totalBalance.toFixed(2)} €
          </p>
        </section>

        {/* Cabecera de la sección de transacciones y botón de acción principal */}
        <section className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200">
            Últimos Movimientos
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Añadir Movimiento
          </button>
        </section>

        {/* Lista de transacciones renderizada dinámicamente */}
        <section className="bg-gray-800 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-700">
            {mockTransactions.length > 0 ? (
              mockTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="p-4 flex justify-between items-center hover:bg-gray-700 transition duration-200"
                >
                  <div>
                    <p className="font-semibold text-lg text-gray-200">
                      {transaction.concept}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <p
                    className={`font-bold text-xl ${
                      transaction.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount.toFixed(2)} €
                  </p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">
                No hay movimientos que mostrar.
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;

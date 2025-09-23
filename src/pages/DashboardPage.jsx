/**
 * @file DashboardPage.jsx
 * @module pages/DashboardPage
 * @description Página principal para usuarios autenticados. Gestiona el estado completo del CRUD de transacciones,
 * incluyendo la lógica para abrir el modal en modo 'creación' o 'edición'.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

/**
 * @function DashboardPage
 * @description Componente que actúa como el panel principal del usuario. Orquesta la obtención,
 * visualización, borrado y edición de transacciones, gestionando el estado de la UI
 * y la comunicación con el componente modal.
 * @returns {JSX.Element}
 */
function DashboardPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar la transacción que se está editando. Si es 'null', el modal está en modo 'creación'.
  const [editingTransaction, setEditingTransaction] = useState(null);
  const modalRef = useRef(null);

  /**
   * @function getTransactions
   * @description Obtiene las transacciones del usuario autenticado desde Supabase.
   * Se envuelve en `useCallback` para la optimización del rendimiento.
   */
  const getTransactions = useCallback(async () => {
    if (session) {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error obteniendo transacciones:", error);
      } else {
        setTransactions(data);
      }
      setLoading(false);
    }
  }, [session]);

  // Efecto para cargar los datos iniciales al montar el componente.
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  // Efecto para sincronizar el estado del modal con el DOM.
  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      isModalOpen ? dialog.showModal() : dialog.close();
    }
  }, [isModalOpen]);

  /**
   * @async
   * @function handleLogout
   * @description Cierra la sesión del usuario.
   */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  /**
   * @async
   * @function handleDelete
   * @description Elimina una transacción específica de la base de datos y actualiza la UI.
   * @param {number} transactionId - El ID de la transacción a eliminar.
   */
  const handleDelete = async (transactionId) => {
    if (
      window.confirm("¿Estás seguro de que quieres borrar este movimiento?")
    ) {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);
      if (error) {
        console.error("Error al borrar la transacción:", error);
      } else {
        setTransactions(transactions.filter((t) => t.id !== transactionId));
      }
    }
  };

  /**
   * @function handleOpenModal
   * @description Abre el modal de transacciones. Si se le pasa un objeto de transacción,
   * establece el estado para el modo 'edición'. Si no, el modal se abrirá en modo 'creación'.
   * @param {object | null} [transaction=null] - La transacción a editar.
   */
  const handleOpenModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  /**
   * @function handleCloseModal
   * @description Cierra el modal y resetea el estado de edición para asegurar que la
   * próxima apertura sea limpia (en modo creación por defecto).
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // El balance se calcula de forma derivada a partir del estado de las transacciones.
  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* El modal recibe el estado de edición y los callbacks para cerrar y actualizar. */}
      <AddTransactionModal
        ref={modalRef}
        onClose={handleCloseModal}
        onTransactionUpdated={getTransactions}
        transactionToEdit={editingTransaction}
      />

      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Spendesk</h1>
            {session && (
              <p className="text-sm text-gray-400">
                {session.user.user_metadata?.is_demo
                  ? "Usuario Demo"
                  : session.user.email}
              </p>
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

        <section className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200">
            Últimos Movimientos
          </h2>
          {/* El botón de añadir abre el modal en modo 'creación' (sin argumentos). */}
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-3 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Añadir Movimiento
          </button>
        </section>

        <section className="bg-gray-800 rounded-lg shadow-lg">
          {loading ? (
            <p className="p-4 text-center text-gray-400">Cargando...</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="p-4 flex justify-between items-center group hover:bg-gray-700 transition duration-200"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* --- Acciones de Fila --- */}
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                        aria-label="Borrar transacción"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenModal(transaction)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-emerald-500 transition-all"
                        aria-label="Editar transacción"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>

                      {/* --- Datos de Fila --- */}
                      <div>
                        <p className="font-semibold text-lg text-gray-200">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
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
                  No hay movimientos que mostrar. ¡Añade el primero!
                </li>
              )}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;

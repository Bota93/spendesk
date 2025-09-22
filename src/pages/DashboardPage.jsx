/**
 * @file DashboardPage.jsx
 * @module pages/DashboardPage
 * @description Página principal de la aplicación para usuarios autenticados. Ahora incluye
 * la capacidad de refrescar su lista de transacciones cuando se añade una nueva.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

function DashboardPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Movemos la lógica de obtener transacciones a una función reutilizable.
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
        alert("No se pudieron cargar las transacciones.");
      } else {
        setTransactions(data);
      }
      setLoading(false);
    }
  }, [session]); // La función depende de la sesión.

  // El useEffect ahora simplemente llama a nuestra nueva función.
  useEffect(() => {
    getTransactions();
  }, [getTransactions]); // Se ejecuta cuando la función getTransactions cambia.

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      isModalOpen ? dialog.showModal() : dialog.close();
    }
  }, [isModalOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Pasamos la función getTransactions como prop al modal. */}
      <AddTransactionModal
        ref={modalRef}
        onClose={() => setIsModalOpen(false)}
        onTransactionAdded={getTransactions}
      />

      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Spendesk</h1>
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Añadir Movimiento
          </button>
        </section>

        <section className="bg-gray-800 rounded-lg shadow-lg">
          {loading ? (
            <p className="p-4 text-center text-gray-400">
              Cargando movimientos...
            </p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="p-4 flex justify-between items-center hover:bg-gray-700 transition duration-200"
                  >
                    <div>
                      <p className="font-semibold text-lg text-gray-200">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-400">
                        {transaction.date}
                      </p>
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

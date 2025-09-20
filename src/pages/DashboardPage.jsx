import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. Importamos el hook 'useAuth' para acceder a la sesión y el cliente de supabase
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

// ... (El mockTransactions sigue aquí, lo quitaremos en el siguiente paso)
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
  {
    id: 3,
    concept: "Compra en supermercado",
    amount: 75.4,
    date: "2024-09-07",
    type: "expense",
  },
  {
    id: 4,
    concept: "Proyecto freelance",
    amount: 300.0,
    date: "2024-09-10",
    type: "income",
  },
  {
    id: 5,
    concept: "Cena con amigos",
    amount: 45.5,
    date: "2024-09-12",
    type: "expense",
  },
];

function DashboardPage() {
  // 2. Usamos el hook para obtener la información de la sesión global
  const { session } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      if (isModalOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isModalOpen]);

  // 3. Función para cerrar la sesión del usuario
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      // Si el logout es exitoso, nuestro AuthContext se actualizará automáticamente
      // y el ProtectedRoute nos redirigirá al inicio.
      // También podemos forzarlo por si acaso.
      navigate("/");
    }
  };

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
            {/* 4. ¡Aquí está la magia! Mostramos el email del usuario que ha iniciado sesión */}
            {session && (
              <p className="text-sm text-gray-400">{session.user.email}</p>
            )}
          </div>
          {/* 5. Conectamos el botón de cerrar sesión a nuestra nueva función */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>

      {/* ... El resto del JSX del main (balance, lista, etc.) no cambia ... */}
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

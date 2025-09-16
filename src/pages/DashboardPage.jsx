import React from "react";

// Datos de prueba (Mock Data) actualizados con ingresos y gastos
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
  // Calculamos el balance total
  const totalBalance = mockTransactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-400">Spendesk</h1>
          <button className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300">
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Sección del Balance Total */}
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
          <button className="px-6 py-3 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300">
            Añadir Movimiento
          </button>
        </section>

        {/* Lista de Transacciones */}
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

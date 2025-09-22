/**
 * @file AddTransactionModal.jsx
 * @module components/AddTransactionModal
 * @description Componente modal que renderiza un formulario para añadir una nueva transacción,
 * incluyendo ahora un campo de selección para la categoría.
 */

import React, { forwardRef, useState } from "react";
import { supabase } from "../lib/supabaseClient.jsx";
import { useAuth } from "../context/AuthContext.jsx";

// 1. Definimos una lista de categorías predefinidas.
const categories = [
  "Comida",
  "Vivienda",
  "Transporte",
  "Ocio",
  "Facturas",
  "Salud",
  "Salario",
  "Freelance",
  "Otros",
];

const AddTransactionModal = forwardRef(function AddTransactionModal(
  { onClose, onTransactionAdded },
  ref
) {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("expense");
  // 2. Añadimos un nuevo estado para la categoría, con un valor inicial.
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("Debes estar logueado para añadir una transacción.");
      return;
    }
    setLoading(true);

    try {
      const transactionData = {
        description: concept,
        amount: parseFloat(amount),
        date: date,
        type: type,
        user_id: user.id,
        // 3. Incluimos la categoría en el objeto que se envía a Supabase.
        category: category,
      };

      const { data, error } = await supabase
        .from("transactions")
        .insert([transactionData]);

      if (error) throw error;

      alert("¡Movimiento añadido con éxito!");
      onTransactionAdded();
      onClose();
    } catch (error) {
      console.error("Error al añadir la transacción:", error);
      alert("No se pudo añadir el movimiento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={ref}
      className="p-8 bg-gray-800 rounded-lg shadow-xl text-white w-full max-w-md backdrop:bg-black backdrop:opacity-50"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Añadir Movimiento</h2>

        <div className="mb-4">
          <label htmlFor="concept" className="block text-gray-400 mb-2">
            Concepto
          </label>
          <input
            type="text"
            id="concept"
            name="concept"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-400 mb-2">
            Cantidad
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-400 mb-2">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* 4. Añadimos el nuevo campo de selección para la categoría. */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-400 mb-2">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Mapeamos el array de categorías para crear las opciones del desplegable */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <span className="block text-gray-400 mb-2">Tipo de Movimiento</span>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio text-emerald-500 bg-gray-700 border-gray-600 focus:ring-emerald-500"
              />
              <span className="ml-2">Ingreso</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio text-red-500 bg-gray-700 border-gray-600 focus:ring-red-500"
              />
              <span className="ml-2">Gasto</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 font-bold text-gray-300 bg-gray-600 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default AddTransactionModal;

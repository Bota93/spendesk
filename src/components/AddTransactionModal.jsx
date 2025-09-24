/**
 * @file AddTransactionModal.jsx
 * @module components/AddTransactionModal
 * @description Componente modal reutilizable para la creación y edición de transacciones,
 * utilizando notificaciones 'toast' para un feedback de usuario mejorado.
 */

import React, { forwardRef, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

// Define una lista estática de categorías para el formulario.
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

/**
 * @function AddTransactionModal
 * @description Componente de formulario controlado que opera en dos modos: 'creación' o 'edición'.
 * Si recibe la prop `transactionToEdit`, pre-rellena los campos y la lógica de envío
 * ejecuta una actualización (UPDATE). De lo contrario, muestra un formulario vacío y
 * ejecuta una inserción (INSERT).
 * @param {object} props - Propiedades del componente.
 * @param {Function} props.onClose - Callback para cerrar el modal desde el componente padre.
 * @param {Function} props.onTransactionUpdated - Callback para notificar al padre que los datos han cambiado y la UI debe refrescarse.
 * @param {object | null} props.transactionToEdit - Objeto de la transacción a editar. Si es null, el modal opera en modo 'creación'.
 * @param {React.Ref} ref - Ref reenviada desde el padre para controlar el elemento <dialog> del DOM.
 * @returns {JSX.Element}
 */
const AddTransactionModal = forwardRef(function AddTransactionModal(
  { onClose, onTransactionUpdated, transactionToEdit },
  ref
) {
  // Estados para gestionar los campos controlados del formulario.
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Efecto secundario para poblar el formulario para la edición o resetearlo para la creación.
  useEffect(() => {
    if (transactionToEdit) {
      // Modo Edición: se establecen los estados con los valores de la transacción existente.
      setConcept(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setDate(transactionToEdit.date);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
    } else {
      // Modo Creación: se resetean los campos a sus valores por defecto.
      setConcept("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setType("expense");
      setCategory(categories[0]);
    }
  }, [transactionToEdit]);

  /**
   * @async
   * @function handleSubmit
   * @description Gestiona el envío del formulario. Determina si debe realizar una operación
   * de inserción o de actualización en Supabase basándose en la existencia de `transactionToEdit`.
   * @param {React.FormEvent<HTMLFormElement>} event - Objeto del evento del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const transactionData = {
        description: concept,
        amount: parseFloat(amount),
        date: date,
        type: type,
        category: category,
        user_id: user.id,
      };

      let error;

      // Lógica condicional para determinar la operación de base de datos.
      if (transactionToEdit) {
        // Ejecuta una actualización en la fila que coincida con el ID de la transacción.
        const { error: updateError } = await supabase
          .from("transactions")
          .update(transactionData)
          .eq("id", transactionToEdit.id);
        error = updateError;
      } else {
        // Ejecuta una inserción de una nueva fila.
        const { error: insertError } = await supabase
          .from("transactions")
          .insert([transactionData]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(
        `Movimiento ${transactionToEdit ? "actualizado" : "añadido"} con éxito!`
      );
      onTransactionUpdated(); // Notifica al Dashboard para que actualice la lista.
      onClose(); // Cierra el modal.
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      toast.error("No se pudo guardar el movimiento.");
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
        <h2 className="text-2xl font-bold mb-6">
          {/* El título del modal es dinámico para reflejar el modo actual. */}
          {transactionToEdit ? "Editar Movimiento" : "Añadir Movimiento"}
        </h2>

        {/* --- Campos del Formulario --- */}
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

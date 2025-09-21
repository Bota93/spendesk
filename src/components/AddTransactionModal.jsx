/**
 * @file AddTransactionModal.jsx
 * @module components/AddTransactionModal
 * @description Componente modal que encapsula el formulario para la creación y
 * edición de transacciones financieras. Utiliza el elemento nativo <dialog>
 * para la gestión del foco y la accesibilidad.
 */

import React, { forwardRef } from "react";

/**
 * @function AddTransactionModal
 * @description Renderiza un formulario modal para la entrada de datos de una transacción.
 * El control de visibilidad del modal es manejado por el componente padre
 * a través de una ref reenviada, siguiendo el patrón de control de componentes no visuales.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onClose - Callback invocado para solicitar el cierre del modal.
 * @param {React.Ref<HTMLDialogElement>} ref - Ref reenviada para adjuntar al elemento <dialog>.
 * @returns {JSX.Element}
 */
const AddTransactionModal = forwardRef(function AddTransactionModal(
  { onClose },
  ref
) {
  /**
   * Gestiona el evento `submit` del formulario.
   * Previene el comportamiento por defecto y maneja la lógica de negocio.
   * @param {React.FormEvent<HTMLFormElement>} event - Objeto del evento del formulario.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Implementar la recolección de datos del formulario (new FormData(event.currentTarget))
    // y la posterior llamada a la API para la inserción/actualización de la transacción.
    console.log("Formulario enviado");

    // Cierra el modal tras el envío.
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="p-8 bg-gray-800 rounded-lg shadow-xl text-white w-full max-w-md backdrop:bg-black backdrop:opacity-50"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Añadir Movimiento</h2>

        {/* Input: Concepto */}
        <div className="mb-4">
          <label htmlFor="concept" className="block text-gray-400 mb-2">
            Concepto
          </label>
          <input
            type="text"
            id="concept"
            name="concept"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Input: Cantidad */}
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
            required
          />
        </div>

        {/* Input: Fecha */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-400 mb-2">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        {/* Input: Tipo de Transacción */}
        <div className="mb-6">
          <span className="block text-gray-400 mb-2">Tipo de Movimiento</span>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                className="form-radio text-emerald-500 bg-gray-700 border-gray-600 focus:ring-emerald-500"
              />
              <span className="ml-2">Ingreso</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                className="form-radio text-red-500 bg-gray-700 border-gray-600 focus:ring-red-500"
                defaultChecked
              />
              <span className="ml-2">Gasto</span>
            </label>
          </div>
        </div>

        {/* Acciones del formulario */}
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
          >
            Guardar
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default AddTransactionModal;

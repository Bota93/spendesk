import React, { forwardRef } from "react";

// Usamos forwardRef para poder pasar la ref desde el Dashboard al <dialog>
const AddTransactionModal = forwardRef(function AddTransactionModal(
  { onClose },
  ref
) {
  // Maneja el evento de envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que la página se recargue
    // Aquí irá la lógica para guardar los datos en el futuro
    console.log("Formulario enviado");
    onClose(); // Cierra el modal después de enviar
  };

  return (
    <dialog
      ref={ref}
      className="p-8 bg-gray-800 rounded-lg shadow-xl text-white w-full max-w-md backdrop:bg-black backdrop:opacity-50"
    >
      {/* El onSubmit ahora lo manejamos nosotros para tener más control */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Añadir Movimiento</h2>

        {/* Campo Concepto */}
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

        {/* Campo Cantidad */}
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

        {/* Campo Fecha */}
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

        {/* Campo Tipo de Transacción */}
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

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4">
          {/* Este botón ahora es de tipo "button" para que no envíe el formulario */}
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

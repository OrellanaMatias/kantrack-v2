import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

export default function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="board-empty">
      <h3 className="board-empty-text">
        {type === "edit"
          ? "Este tablero esta vacio, crea una columna para empezar"
          : "No hay tableros disponibles. Crea uno para empezar"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="add-column-btn"
      >
        {type === "edit" ? "+ Añadir nueva columna" : "+ Añadir nuevo tablero"}
      </button>
      {isBoardModalOpen && <AddEditBoardModal type={type} setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}

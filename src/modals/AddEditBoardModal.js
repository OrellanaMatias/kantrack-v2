import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import "../styles/BoardModals.css";
import { v4 as uuidv4 } from "uuid";

export default function AddEditBoardModal({ type, setIsBoardModalOpen }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Por hacer", tasks: [], id: uuidv4() },
    { name: "En progreso", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="modal-container dimmed"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Añadir nuevo"} tablero</h3>
        <label htmlFor="board-name-input">Nombre del tablero</label>
        <div className="input-container">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
            type="text"
            placeholder="Ej. Diseño web"
            className={!isValid && !name.trim() ? "red-border" : ""}
          />
          {!isValid && !name.trim() && (
            <span className="cant-be-empty-span text-L"> No se puede dejar vacio kpo</span>
          )}
        </div>

        <label>Columnas del tablero</label>
        <div className="modal-columns">
          {newColumns.map((column, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChange(column.id, e.target.value);
                    }}
                    type="text"
                    value={column.name}
                    className={
                      !isValid && !column.name.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !column.name.trim() && (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      No se puede dejar vacio
                    </span>
                  )}
                </div>
                <img
                  src={crossIcon}
                  alt="delete-column-icon"
                  onClick={() => {
                    onDelete(column.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setNewColumns((state) => [
              ...state,
              { name: "", tasks: [], id: uuidv4() },
            ]);
          }}
          className="add-column-btn btn-light"
        >
          + Añadir nueva columna
        </button>
        <button
          onClick={() => {
            const isValid = validate();
            if (isValid === true) onSubmit(type);
          }}
          className="create-btn"
        >
          {type === "add" ? "Crear nuevo tablero" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

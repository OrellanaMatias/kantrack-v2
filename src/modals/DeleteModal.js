import React from "react";

export default function DeleteModal({ type, title, onDeleteBtnClick }) {
  return (
    <div className="modal-container dimmed">
      <div className="delete-modal">
        <h3 className="heading-L">Borrar este {type}?</h3>
        {type === "task" ? (
          <p className="text-L">
            Estas seguro de borrar "{title}"?
            Es una acción irreversible.
          </p>
        ) : (
          <p className="text-L">
            Estas seguro de borrar "{title}"?
          </p>
        )}

        <div className="delete-modal-btns">
          <button onClick={onDeleteBtnClick} className="btn delete-btn">
            Delete
          </button>
          <button onClick={onDeleteBtnClick} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

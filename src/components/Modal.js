import React from "react";
import "./styles/Modal.css";

export default function Modal(props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Congratulations for finishing the mindFlip!</h2>
        <button onClick={props.handleClose}>CLOSE</button>
      </div>
    </div>
  );
}
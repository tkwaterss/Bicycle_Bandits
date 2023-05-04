import React from "react";
import classes from "./buttons.module.css";

const DeleteBtn = (props) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={`${classes.deleteBtn} ${props.className}`}
    >
      X
    </button>
  );
};

export default DeleteBtn;

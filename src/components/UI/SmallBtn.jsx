import React from "react";
import classes from "./buttons.module.css";

const SmallBtn = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.function}
      className={`${classes.smallBtn} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default SmallBtn;
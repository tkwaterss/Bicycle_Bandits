import React from "react";
import classes from "./buttons.module.css";

const LargeBtn = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.function}
      className={`${classes.largeBtn} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default LargeBtn;

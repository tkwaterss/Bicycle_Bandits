import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.nameContainer}>
        <h1>BICYCLE BANDITS</h1>
      </div>
      <nav>
        <ul className={classes.linksContainer}>
          <li>REGISTER</li>
          <li>LOGIN</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

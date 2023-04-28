import React, { useContext } from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DisplayContext from "../store/displayContext";
import AuthContext from "../store/authContext";

const Header = () => {
  const { displayState, displayDispatch } = useContext(DisplayContext);
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.nameContainer}>
        <h1
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "landing" })
          }
        >
          BICYCLE BANDITS
        </h1>
      </div>
      <nav>
        <ul className={classes.linksContainer}>
          <li
            onClick={() =>
              displayDispatch({ type: "CHANGE_PAGE", payload: "register" })
            }
          >
            REGISTER
          </li>
          <li
            onClick={() =>
              displayDispatch({ type: "CHANGE_PAGE", payload: "login" })
            }
          >
            LOGIN
          </li>
          <li onClick={() => authCtx.logout()}>LOGOUT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

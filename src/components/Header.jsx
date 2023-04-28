import React, { useContext } from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DisplayContext from "../store/displayContext";
import AuthContext from "../store/authContext";

const Header = () => {
  const { displayState, displayDispatch } = useContext(DisplayContext);
  const authCtx = useContext(AuthContext);

  let links;

  if (!authCtx.token) {
    //^ Landing Nav Bar
    links = (
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
    );
  }

  if (authCtx.token && authCtx.employee) {
    //^ Employee Nav Bar
    links = (
      <ul className={classes.linksContainer}>
        <li
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "register" })
          }
        >
          DASHBOARD
        </li>
        <li
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "login" })
          }
        >
          SEACH TICKETS
        </li>
        <li onClick={() => authCtx.logout()}>NEW TICKET</li>
        <li onClick={() => authCtx.logout()}>LOGOUT</li>
      </ul>
    );
  }

  if (authCtx.token && !authCtx.employee) {
    //^ Customer Nav Bar
    links = (
      <ul className={classes.linksContainer}>
        <li
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "register" })
          }
        >
          HOME
        </li>
        <li
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "login" })
          }
        >
          YOUR SERVICE
        </li>
        <li onClick={() => authCtx.logout()}>SHOP ONLINE</li>
        <li onClick={() => authCtx.logout()}>CART/CHECKOUT</li>
        <li onClick={() => authCtx.logout()}>LOGOUT</li>
      </ul>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.nameContainer}>
        <h1
        //! Add conditional for logged in or not, when logged in this will return to dashboard
          onClick={() =>
            displayDispatch({ type: "CHANGE_PAGE", payload: "landing" })
          }
        >
          BICYCLE BANDITS
        </h1>
      </div>
      <nav>
        {links}
      </nav>
    </header>
  );
};

export default Header;

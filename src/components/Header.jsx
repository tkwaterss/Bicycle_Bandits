import React, { useContext } from "react";
import classes from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import DisplayContext from "../store/displayContext";
import AuthContext from "../store/authContext";

const Header = () => {
  const { displayDispatch } = useContext(DisplayContext);
  const authCtx = useContext(AuthContext);

  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "#A59132" : "",
      textDecoration: isActive ? "underline" : "",
    };
  };

  let links;

  if (!authCtx.token) {
    //^ Landing Nav Bar
    //TODO Should probably transition these to NavLinks as well
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
      </ul>
    );
  }

  if (authCtx.token && authCtx.employee) {
    //^ Employee Nav Bar
    links = (
      <ul className={classes.linksContainer}>
        <li>
          <NavLink style={activeStyle} to="/">
            DASHBOARD
          </NavLink>
        </li>
        <li>
          <NavLink style={activeStyle} to="/searchTickets">
            SEARCH TICKETS
          </NavLink>
        </li>
        <li>
          <NavLink style={activeStyle} to="/newTicket">
            NEW TICKET
          </NavLink>
        </li>
        <li onClick={() => authCtx.logout()}>
          <NavLink to="/">LOGOUT</NavLink>
        </li>
      </ul>
    );
  }

  if (authCtx.token && !authCtx.employee) {
    //^ Customer Nav Bar
    links = (
      <ul className={classes.linksContainer}>
        <li>
          <NavLink style={activeStyle} to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink style={activeStyle} to="/shopping">
            SHOP ONLINE
          </NavLink>
        </li>
        <li onClick={() => authCtx.logout()}>
          <NavLink to="/">LOGOUT</NavLink>
        </li>
        <li>
          <NavLink style={activeStyle} to="/checkout">
            CART/CHECKOUT
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <header>
      <div className={classes.nameContainer}>
        <Link to="/">
          <h1
            onClick={() =>
              displayDispatch({ type: "CHANGE_PAGE", payload: "landing" })
            }
          >
            BICYCLE BANDITS
          </h1>
        </Link>
      </div>
      <nav>{links}</nav>
    </header>
  );
};

export default Header;

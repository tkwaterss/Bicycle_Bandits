import React, { useContext } from "react";
import AuthContext from "../../../store/authContext";
import TechTickets from "./TechTickets";
import ToDoList from "./ToDoList";
import classes from './Dashboard.module.css';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  let display;
  if (authCtx.employee) {
    display = (
      <>
        <TechTickets />
        <ToDoList />
      </>
    );
  } else if (!authCtx.employee) {
    display = <h1>Customer</h1>;
  }
  return <>{display}</>;
};

export default Dashboard;

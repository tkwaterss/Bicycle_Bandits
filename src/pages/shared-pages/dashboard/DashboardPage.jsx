import React, { useContext } from "react";
import AuthContext from "../../../store/authContext";
import TechTickets from "./TechTickets";
import CustomerTickets from './CustomerTickets'
import ToDoList from "./ToDoList";

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
    display = (
      <>
        <CustomerTickets />
      </>
    );
  }
  return <>{display}</>;
};

export default Dashboard;

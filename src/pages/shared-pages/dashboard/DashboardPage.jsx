import React, { useContext, useState } from "react";
import AuthContext from "../../../store/authContext";
import TechTickets from "./TechTickets";
import CustomerTickets from "./CustomerTickets";
import ToDoList from "./ToDoList";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  let display;
  if (authCtx.employee) {
    display = (
      <>
        <TechTickets loading={loading} setLoading={setLoading} />
        <ToDoList loading={loading} setLoading={setLoading} />
      </>
    );
  } else if (!authCtx.employee) {
    display = (
      <>
        <CustomerTickets loading={loading} setLoading={setLoading} />
      </>
    );
  }
  return <>{display}</>;
};

export default Dashboard;

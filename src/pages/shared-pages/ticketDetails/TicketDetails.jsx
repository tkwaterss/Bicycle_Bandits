import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import TicketItems from "./TicketItems";
import AuthContext from "../../../store/authContext";
import axios from "axios";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();
  const { token, employee } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/ticket/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setTicket(res.data);
      });
  }, [id, token]);

  return (
    <>
      {ticket.user && (
        <UserDetails ticket={ticket} setTicket={setTicket} id={id} employee={employee} />
      )}
      <TicketItems ticket={ticket} id={id} employee={employee} />
    </>
  );
};

export default TicketDetails;

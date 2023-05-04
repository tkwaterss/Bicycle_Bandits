import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import TicketItems from "./TicketItems";
import AuthContext from "../../../store/authContext";
import axios from "axios";
import classes from "./TicketDetails.module.css";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();
  const { token } = useContext(AuthContext);

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
        <UserDetails
          ticket={ticket}
          id={id}
        />
      )}
      <TicketItems ticket={ticket} id={id} />
    </>
  );
};

export default TicketDetails;

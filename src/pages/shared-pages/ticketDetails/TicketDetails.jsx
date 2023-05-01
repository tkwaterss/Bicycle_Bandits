import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import TicketItems from "./TicketItems";
import AuthContext from "../../../store/authContext";
import axios from "axios";

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
  }, [id]);


  //get ticket id from params

  //display all info, multiple calls
  //create an editing state that will switch the userDetails to an editable component with the same
  return (
    <>
      {ticket.user && (
        <UserDetails
          ticket={ticket}
          id={id}
        />
      )}
      <TicketItems />
    </>
  );
};

export default TicketDetails;

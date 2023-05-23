import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";
import TicketItems from "./TicketItems";
import AuthContext from "../../../store/authContext";
import RiseLoader from "react-spinners/RiseLoader";

const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();
  const { token, employee } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(false);

  useEffect(() => {
    setInitLoad(true);
    axios
      .get(`/ticket/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setTicket(res.data);
        setInitLoad(false);
      });
  }, [id, token]);

  return (
    <>
      {ticket.user && !initLoad ? (
        <UserDetails
          ticket={ticket}
          setTicket={setTicket}
          id={id}
          employee={employee}
        />
      ) : (
        <RiseLoader size={10} color="#FFFBDB"></RiseLoader>
      )}
      <TicketItems
        ticket={ticket}
        id={id}
        employee={employee}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default TicketDetails;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/SearchBar";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";
import { Link } from "react-router-dom";

const TechTickets = () => {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  //hit get tickets end point
  useEffect(() => {
    axios
      .get("http://localhost:4040/tickets", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  console.log(tickets);
  let display = tickets.map((ticket) => {
    return (
      <Link key={ticket.id} to={`/ticket/${ticket.id}`}>
        <Card className={classes.ticketCard}>
          <ul className={classes.ticketList}>
            <li>{ticket.id}</li>
            <li>{`${ticket.bike.brand}, ${ticket.bike.model}, ${ticket.bike.color}`}</li>
            <li>{ticket.dueDate}</li>
            <li>{ticket.status}</li>
            <li>{`$${ticket.total}`}</li>
          </ul>
        </Card>
      </Link>
    );
  });

  return (
    <Container className={classes.dashboardTicketContainer}>
      <ul className={classes.titleBar}>
        <li>Ticket ID</li>
        <li> Bike Description</li>
        <li>Due Date</li>
        <li>Status</li>
        <li>Cost</li>
      </ul>
      <SearchBar placeholder={"Search Tickets"}></SearchBar>
      <div className={classes.cardContainer}>{display}</div>
    </Container>
  );
};

export default TechTickets;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/SearchBar";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

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

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .get(`http://localhost:4040/search/tickets?input=${values.search}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data)
          //Getting data, now will display different tickets in the .map
          //or just redirect to ticket search page
        })
        .catch((err) => console.log(err));
    },
  });

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
      <form onSubmit={formik.handleSubmit} className={classes.searchForm}>
        <SearchBar
          id={"search"}
          name={"search"}
          value={formik.values.search}
          onChange={formik.handleChange}
          placeholder={"Search Tickets"}
        ></SearchBar>
      </form>
      <div className={classes.cardContainer}>{display}</div>
    </Container>
  );
};

export default TechTickets;

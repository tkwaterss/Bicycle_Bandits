import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Container from "../../../components/UI/Container";
import SearchBar from "../../../components/UI/SearchBar";
import Card from "../../../components/UI/Card";
import classes from "./Dashboard.module.css";
import AuthContext from "../../../store/authContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import RiseLoader from "react-spinners/RiseLoader";

const TechTickets = (props) => {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const { loading, setLoading } = props;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/tickets", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token, setLoading]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, helpers) => {
      setLoading(true);
      axios
        .get(`/search/tickets?input=${values.search}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          setTickets(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
      helpers.resetForm();
    },
  });

  let display = tickets.map((ticket) => {
    return (
      <Link key={ticket.id} to={`/ticket/${ticket.id}`} className={classes.ticketCard}>
        <Card className={classes.ticketCard}>
          <div className={classes.ticketList}>
            <div id={classes.ticketId}>
              <p>{ticket.id}</p>
            </div>
            <div id={classes.customerName}>
              <p>{`${ticket.user.firstname} ${ticket.user.lastname}`}</p>
            </div>
            <div id={classes.bikeDescription}>
              <p>{`${ticket.bike.brand}, ${ticket.bike.model}, ${ticket.bike.color}`}</p>
            </div>
            <div id={classes.dueDate}>
              <p>{ticket.dueDate}</p>
            </div>
            <div id={classes.status}>
              <p>{ticket.status}</p>
            </div>
            <div id={classes.total}>
              <p>{`$${parseFloat(ticket.total).toFixed(2)}`}</p>
            </div>
          </div>
        </Card>
      </Link>
    );
  });

  return (
    <Container className={classes.dashboardTicketContainer}>
      <div className={classes.titleContainer}>
        <form onSubmit={formik.handleSubmit} className={classes.searchForm}>
          <SearchBar
            id="search"
            name="search"
            value={formik.values.search}
            onChange={formik.handleChange}
            placeholder="Search Tickets"
          ></SearchBar>
        </form>
        <ul className={classes.titleBar}>
          <li id={classes.ticketIdTitle}>ID</li>
          <li id={classes.customerNameTitle}>Customer</li>
          <li id={classes.bikeDescriptionTitle}> Bike Description</li>
          <li id={classes.dueDateTitle}>Due Date</li>
          <li id={classes.statusTitle}>Status</li>
          <li id={classes.totalTitle}>Cost</li>
        </ul>
      </div>
      <div className={classes.cardContainer}>
        {loading ? (
          <RiseLoader size={10} color="#FFFBDB"></RiseLoader>
        ) : (
          display
        )}
      </div>
    </Container>
  );
};

export default TechTickets;

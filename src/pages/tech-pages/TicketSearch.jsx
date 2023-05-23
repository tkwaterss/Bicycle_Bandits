import React, { useContext, useState, useEffect } from "react";
import Container from "../../components/UI/Container";
import SearchBar from "../../components/UI/SearchBar";
import { useFormik } from "formik";
import AuthContext from "../../store/authContext";
import axios from "axios";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import classes from "./TicketSearch.module.css";
import RiseLoader from "react-spinners/RiseLoader";

const TicketSearch = () => {
  const { token } = useContext(AuthContext);
  const [ticketList, setTicketList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/allTickets`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setTicketList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const formik = useFormik({
    initialValues: {
      input: "",
      status: "",
      category: "Customer",
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .get(
          `/search/tickets?input=${values.input}&category=${values.category}`,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          let sortedList;

          if (values.status !== "") {
            sortedList = res.data.filter((ticket) => {
              return ticket.status === values.status;
            });
          } else {
            sortedList = res.data;
          }

          setTicketList(sortedList);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    },
  });

  let displayList = ticketList.map((ticket) => {
    return (
      <Link key={ticket.id} to={`/ticket/${ticket.id}`} className={classes.ticketCard}>
        <Card className={classes.ticketCard}>
          <ul className={classes.ticketDetailsList}>
            <li id={classes.ticketId}>{ticket.id}</li>
            <li
              id={classes.customerName}
            >{`${ticket.user.firstname} ${ticket.user.lastname}`}</li>
            <li
              id={classes.bikeDescription}
            >{`${ticket.bike.brand}, ${ticket.bike.model} / ${ticket.bike.color}`}</li>
            <li id={classes.bikeLocation}>{ticket.location}</li>
            <li id={classes.ticketDueDate}>{ticket.dueDate}</li>
            <li id={classes.ticketStatus}>{ticket.status}</li>
            <li id={classes.ticketTotal}>$ {ticket.total}</li>
          </ul>
        </Card>
      </Link>
    );
  });

  return (
    <Container className={classes.ticketSearchContainer}>
      <div className={classes.titleContainer}>
        <form onSubmit={formik.handleSubmit} className={classes.searchForm}>
          <div className={classes.searchBarContainer}>
            <SearchBar
              id="input"
              name="input"
              type="text"
              value={formik.values.input}
              onChange={formik.handleChange}
              placeholder="Search Tickets"
            ></SearchBar>
          </div>
          <div className={classes.selectContainer}>
            <select
              id="status"
              name="status"
              defaultValue=""
              onChange={formik.handleChange}
            >
              <option value="">-- Sort by Status --</option>
              <option value="Checked In">Checked In</option>
              <option value="Waiting for Parts">Waiting for Parts</option>
              <option value="Not Here">Not Here</option>
              <option value="Finished">Finished</option>
              <option value="Done and Paid">Done and Paid</option>
            </select>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="Customer">Customer</option>
              <option value="Bike Info">Bike Info</option>
            </select>
          </div>
        </form>
        <ul className={classes.titleBar}>
          <li id={classes.ticketIdLabel}>ID</li>
          <li id={classes.nameTitle}>Customer Name</li>
          <li id={classes.bikeTitle}>Bike Description</li>
          <li id={classes.locationTitle}>Location</li>
          <li id={classes.dueDateTitle}>Due Date</li>
          <li id={classes.statusTitle}>Status</li>
          <li id={classes.priceTitle}>Price</li>
        </ul>
      </div>
      <div className={classes.cardContainer}>
        {loading ? (
          <RiseLoader size={10} color="#FFFBDB"></RiseLoader>
        ) : (
          displayList
        )}
      </div>
    </Container>
  );
};

export default TicketSearch;

import React, { useContext, useState } from "react";
import Container from "../../components/UI/Container";
import SearchBar from "../../components/SearchBar";
import { useFormik } from "formik";
import AuthContext from "../../store/authContext";
import axios from "axios";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";

const TicketSearch = () => {
  const { token } = useContext(AuthContext);

  const [ticketList, setTicketList] = useState([]);

  const formik = useFormik({
    initialValues: {
      input: "",
      status: "",
      category: "Customer",
    },
    onSubmit: (values) => {
      axios
        .get(
          `http://localhost:4040/search/tickets?input=${values.input}&category=${values.category}`,
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
        })
        .catch((err) => console.log(err));
    },
  });

  let displayList = ticketList.map((ticket) => {
    return (
      <Link key={ticket.id} to={`/ticket/${ticket.id}`}>
        <Card>
          <ul>
            <li>{`${ticket.user.firstname} ${ticket.user.lastname}`}</li>
            <li>{`${ticket.bike.brand}, ${ticket.bike.model} / ${ticket.bike.color}`}</li>
            <li>{ticket.location}</li>
            <li>{ticket.dueDate}</li>
            <li>{ticket.status}</li>
            <li>{ticket.total}</li>
          </ul>
        </Card>
      </Link>
    );
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <SearchBar
          id="input"
          name="input"
          type="text"
          value={formik.values.input}
          onChange={formik.handleChange}
          placeholder="Search Tickets"
        ></SearchBar>
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
      </form>
      <div>
        <div>
          <h5>Customer Name</h5>
          <h5>Bike Description</h5>
          <h5>Location</h5>
          <h5>Due Date</h5>
          <h5>Status</h5>
          <h5>Price</h5>
        </div>
        <div>{displayList}</div>
      </div>
    </Container>
  );
};

export default TicketSearch;

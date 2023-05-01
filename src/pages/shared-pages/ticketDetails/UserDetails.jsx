import React, { useState, useEffect, useContext } from "react";
import Container from "../../../components/UI/Container";
import AuthContext from "../../../store/authContext";
import axios from "axios";
import EditUserForm from "./EditUserForm";

const UserDetails = (props) => {
  const { ticket, id } = props;
  const [internalNotes, setInternalNotes] = useState(ticket.internalNotes);
  const [externalNotes, setExternalNotes] = useState(ticket.externalNotes);
  const [status, setStatus] = useState(ticket.status);
  const [dueDate, setDueDate] = useState(ticket.dueDate);
  const { token } = useContext(AuthContext);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let body = {
        internalNotes,
        externalNotes,
        status,
        dueDate,
      };
      axios
        .put(`http://localhost:4040/tickets/${id}`, body, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [internalNotes, externalNotes, status, dueDate]);

  let userDisplay;

  if (!isEditing) {
    userDisplay = (
      <div>
        <div>
          <div>
            <h5>Name:</h5>
            <h5>Email:</h5>
            <h5>Phone:</h5>
            <h5>Address:</h5>
          </div>
          <h4>Customer Details</h4>
          <div>
            <h5>{`${ticket.user.firstname} ${ticket.user.lastname}`}</h5>
            <h5>{ticket.user.email}</h5>
            <h5>{ticket.user.phone}</h5>
            <h5>{ticket.user.address}</h5>
          </div>
        </div>
        <div>
          <div>
            <h5>Brand:</h5>
            <h5>Model:</h5>
            <h5>Color:</h5>
            <h5>Size:</h5>
          </div>
          <h4>Bicycle Details</h4>
          <div>
            <h5>{ticket.bike.brand}</h5>
            <h5>{ticket.bike.model}</h5>
            <h5>{ticket.bike.color}</h5>
            <h5>{ticket.bike.size}</h5>
          </div>
        </div>
      </div>
    );
  }
  if (isEditing) {
    userDisplay = <EditUserForm ticket={ticket} id={id} setEditing={setEditing}/>;
  }

  return (
    <>
      <Container>
        <div>
          {!isEditing && <button onClick={() => setEditing(true)}>Edit Customer</button>}
          <h3>Ticket #: {ticket.id}</h3>
          <input
            name="dueDate"
            id="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            value={dueDate}
          />
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Checked In">Checked In</option>
            <option value="Waiting for Parts">Waiting for Parts</option>
            <option value="Not Here">Not Here</option>
            <option value="Finished">Finished</option>
            <option value="Done and Paid">Done and Paid</option>
          </select>
        </div>
        {userDisplay}
      </Container>
      <div>
        <textarea
          rows="6"
          cols="35"
          value={externalNotes}
          onChange={(e) => setExternalNotes(e.target.value)}
        ></textarea>
        <textarea
          rows="6"
          cols="35"
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default UserDetails;

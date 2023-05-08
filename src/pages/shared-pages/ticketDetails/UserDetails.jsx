import React, { useState, useEffect, useContext } from "react";
import Container from "../../../components/UI/Container";
import AuthContext from "../../../store/authContext";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import classes from "./TicketDetails.module.css";
import SmallBtn from "../../../components/UI/SmallBtn";

const UserDetails = (props) => {
  const { ticket, id, employee, setTicket } = props;
  const [internalNotes, setInternalNotes] = useState(ticket.internalNotes);
  const [externalNotes, setExternalNotes] = useState(ticket.externalNotes);
  const [status, setStatus] = useState(ticket.status);
  const [dueDate, setDueDate] = useState(ticket.dueDate);
  const { token } = useContext(AuthContext);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const delaySave = setTimeout(() => {
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

    return () => clearTimeout(delaySave);
  }, [internalNotes, externalNotes, status, dueDate, id, token]);

  let userDisplay;

  if (!isEditing) {
    userDisplay = (
      <div className={classes.userInfoContainer}>
        <div className={classes.userdetailsContainer}>
          <h4>Customer Details</h4>
          <div className={classes.detailsListContainer}>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Name:</h5>
              <h5
                className={classes.detailValue}
              >{`${ticket.user.firstname} ${ticket.user.lastname}`}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Email:</h5>
              <h5 className={classes.detailValue}>{ticket.user.email}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Phone:</h5>
              <h5 className={classes.detailValue}>{ticket.user.phone}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Address:</h5>
              <h5 className={classes.detailValue}>{ticket.user.address}</h5>
            </div>
          </div>
        </div>
        <div className={classes.ticketdetailsContainer}>
          <h4>Bicycle Details</h4>
          <div className={classes.detailsListContainer}>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Brand:</h5>
              <h5 className={classes.detailValue}>{ticket.bike.brand}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Model:</h5>
              <h5 className={classes.detailValue}>{ticket.bike.model}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Color:</h5>
              <h5 className={classes.detailValue}>{ticket.bike.color}</h5>
            </div>
            <div className={classes.detailsDiv}>
              <h5 className={classes.detailLabel}>Size:</h5>
              <h5 className={classes.detailValue}>{ticket.bike.size}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isEditing) {
    userDisplay = (
      <EditUserForm
        ticket={ticket}
        setEditing={setEditing}
        setTicket={setTicket}
      />
    );
  }

  return (
    <>
      <Container className={classes.ticketDetailsContainer}>
        <div className={classes.ticketInfoContainer}>
          {!isEditing && employee && (
            <SmallBtn onClick={() => setEditing(true)}>Edit Customer</SmallBtn>
          )}
          <h3>Ticket #: {ticket.id}</h3>
          {employee ? (
            <input
              name="dueDate"
              id="dueDate"
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              value={dueDate}
              className={classes.dueDatePicker}
            />
          ) : (
            <h5> Due: {dueDate}</h5>
          )}
          {employee ? (
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={classes.statusPicker}
            >
              <option value="Checked In">Checked In</option>
              <option value="Waiting for Parts">Waiting for Parts</option>
              <option value="Not Here">Not Here</option>
              <option value="Finished">Finished</option>
              <option value="Done and Paid">Done and Paid</option>
            </select>
          ) : (
            <h5>{status}</h5>
          )}
        </div>
        {userDisplay}
      </Container>
      <div className={classes.notesContainer}>
        <div className={classes.externalContainer}>
          {employee ? <h4>External Notes</h4> : <h4>Mechanic Notes</h4>}
          <textarea
            rows="6"
            cols="35"
            value={externalNotes}
            onChange={(e) => setExternalNotes(e.target.value)}
            className={classes.externalNotes}
          ></textarea>
        </div>
        {employee && (
          <div className={classes.internalContainer}>
            <h4>Internal Notes</h4>
            <textarea
              rows="6"
              cols="35"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className={classes.internalNotes}
            ></textarea>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetails;

import React, { useContext, useState, useEffect } from 'react'
import Container from '../../../components/UI/Container'
import classes from './Dashboard.module.css';
import axios from 'axios';
import Card from '../../../components/UI/Card';
import AuthContext from '../../../store/authContext';
import { Link } from "react-router-dom"

const CustomerTickets = () => {
  const { token, userId } = useContext(AuthContext);
  const [tickets, setTickets] = useState([])
  // need to pull user Id out of local storage or context?
  console.log(userId)

  useEffect(() => {
    axios.get(`http://localhost:4040/tickets/${userId}`, {
      headers: {
        authorization: token,
      }
    })
    .then(res => setTickets(res.data))
    .catch(err => console.log(err))
  }, [token])

  let display

  if (tickets.length > 0) {
    display = tickets.map((ticket) => {
      return (
        <Link key={ticket.id} to={`/ticket/${ticket.id}`}>
          <Card className={classes.ticketCard}>
            <div className={classes.ticketList}>
              <div id={classes.ticketId}>
                <p>{ticket.id}</p>
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
      )
    })
    
  }


  return (
    <Container className={classes.dashboardTicketContainer}>
      <div className={classes.titleContainer}>
        <ul className={classes.titleBar}>
          <li id={classes.ticketIdTitle} >ID</li>
          <li id={classes.bikeDescriptionTitle} > Bike Description</li>
          <li id={classes.dueDateTitle} >Due Date</li>
          <li id={classes.statusTitle} >Status</li>
          <li id={classes.totalTitle} >Cost</li>
        </ul>
      </div>
      <div className={classes.cardContainer}>{!display ? "No Tickets Have Been Created" : display}</div>
    </Container>
  )
}

export default CustomerTickets
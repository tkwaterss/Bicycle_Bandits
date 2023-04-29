import React from 'react'
import Container from '../../../components/UI/Container';
import SearchBar from '../../../components/SearchBar';
import Card from '../../../components/UI/Card';

const TechTickets = () => {
  return (
    <Container className="dashboardTicketContainer">
      <ul>
        <li>Ticket ID</li>
        <li> Bike Description</li>
        <li>Status</li>
        <li>Cost</li>
      </ul>
      <SearchBar>Search Bar will be a component</SearchBar>
      <div>
        List Items Container
        <Card>List Item</Card>
        <Card>List Item</Card>
        <Card>List Item</Card>
        <Card>List Item</Card>
      </div>
    </Container>
  )
}

export default TechTickets
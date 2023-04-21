# MVP
## Description
Bicycle Bandits is a bike shop ticket managment app. It's primary use will be for bike shop employees to manage service tickets. The app will also allow for customers to view live updates about the service on their bicycle.
## Features
- Users can login/register and logout
- Customer Account
  - User can view a list of their current and previous tickets
  - User can view the details of any of their tickets
- Employee Account
  - Tech can view upcoming tickets from the home page and navigate to them directly
  - Tech can use the ticket search page to look up specific tickets
  - Tech can view and edit ticket details
    - Tech can add/remove labor items and products on a ticket
## Database
- users table
  - user / account info
- bikes table
  - user_id, bike details
- statuses table
  - ticket status
- tickets table
  - user_id, bike_id, status_id, description, due_date
- products table
  - name, description, price, image
- ticket-products table
  - ticket_id, product_id
- labor table
  - name, description, price, time
- ticket-labor table
  - ticket_id, labor_id
## Pages
- Landing Page
- Login/Register Page
- Customer Pages
  - Customer Home Page
  - Customer Ticket Details Page
- Tech Pages
  - Tech Home Page
  - Tech Ticket Search Page
  - Tech Ticket Details/Edit Page
  - Tech New Ticket Page
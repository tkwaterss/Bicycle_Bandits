//^ Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./util/database");
const seed = require("./util/seed");
const {
  User,
  Bike,
  Ticket,
  Labor,
  Product,
  Order,
  Cart,
  TicketLabor,
  TicketProduct,
  OrderProduct,
} = require("./util/models");
const {
  getTickets,
  getUserTickets,
  getTicketDetails,
  searchTickets,
  newTicket,
  editTicket,
  deleteTicket,
} = require("./controllers/tickets");
const {
  getTicketItems,
  getTicketTotal,
  addTicketLabor,
  updateTicketLabor,
  deleteTicketLabor,
  addTicketProduct,
  updateTicketProduct,
  deleteTicketProduct,
} = require("./controllers/ticketItems");
const {
  searchCustomers,
  getBikes,
  updateUserInfo,
  createUser,
  createBike,
} = require("./controllers/users");
const {
  getToDoList,
  addToDoItem,
  updateToDoItem,
  deleteToDoItem,
} = require("./controllers/todoList");
const { searchCatelogue } = require("./controllers/items");

//^ Variables
const server = express();
const { PORT } = process.env;

//^ Middleware
server.use(express.json());
server.use(cors());

//^ Associations
User.hasMany(Bike);
Bike.belongsTo(User);
User.hasMany(Ticket);
Ticket.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Bike.hasMany(Ticket);
Ticket.belongsTo(Bike);

Ticket.belongsToMany(Labor, { through: TicketLabor });
Labor.belongsToMany(Ticket, { through: TicketLabor });
Ticket.belongsToMany(Product, { through: TicketProduct });
Product.belongsToMany(Ticket, { through: TicketProduct });

//^ Endpoints

//tickets controller end points
server.get("/tickets", getTickets);
server.get("/tickets/:userId", getUserTickets);
server.get("/tickets/:ticketId", getTicketDetails);
server.get("/tickets/search", searchTickets);
server.post("/tickets", newTicket);
server.put("/tickets/:ticketId", editTicket);
server.delete("/tickets/:ticketId", deleteTicket);

//ticketItems controller end points
server.get("/tickets/items/:ticketId", getTicketItems);
server.get("/tickets/total/:ticketId", getTicketTotal);
server.post("/tickets/labor", addTicketLabor);
server.put("/tickets/labor/:ticketLaborId", updateTicketLabor);
server.delete("/tickets/labor/:ticketLaborId", deleteTicketLabor);
server.post("/tickets/products", addTicketProduct);
server.put("/tickets/products/:ticketProductId", updateTicketProduct);
server.delete("/tickets/products/:ticketProductId", deleteTicketProduct);

//users controller end points
server.get("/users", searchCustomers);
server.get("/users/:userId", getBikes);
server.put("/users/:ticketId", updateUserInfo);
server.post("/users", createUser);
server.post("/users/bike", createBike);

//to do list contoller
server.get('/toDoList', getToDoList);
server.post('/toDoList/:toDoId', addToDoItem);
server.put('/toDoList/:toDoId', updateToDoItem);
server.delete('/toDoList/:toDoId', deleteToDoItem);

//items controller
server.get('/tech/catalogue', searchCatelogue);

//^ Database sycn and seed
db.sync()
  // .sync({force: true})
  .then(() => {
    // seed()
  })
  .catch((err) => console.log(err, "could not connect"));

//^ Listen Statement
server.listen(PORT, () =>
  console.log(`============  Up on ${PORT} =============`)
);

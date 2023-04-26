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
Ticket.hasMany(TicketLabor);
TicketLabor.belongsTo(Ticket);
Labor.hasMany(TicketLabor);
TicketLabor.belongsTo(Labor);

Ticket.belongsToMany(Product, { through: TicketProduct });
Product.belongsToMany(Ticket, { through: TicketProduct });
Ticket.hasMany(TicketProduct);
TicketProduct.belongsTo(Ticket);
Product.hasMany(TicketProduct);
TicketProduct.belongsTo(Product);

//^ Endpoints

//tickets controller end points
server.get("/tickets", getTickets);
server.get("/tickets/:userId", getUserTickets);
server.get("/ticket/:ticketId", getTicketDetails);
server.get("/search/tickets", searchTickets);
server.post("/tickets", newTicket);
server.put("/tickets/:ticketId", editTicket);
server.delete("/tickets/:ticketId", deleteTicket);

//ticketItems controller end points
server.get("/ticketItems/:ticketId", getTicketItems);
server.post("/ticketLabor", addTicketLabor);
server.put("/ticketLabor/:ticketLaborId", updateTicketLabor);
server.delete("/ticketLabor/:ticketLaborId", deleteTicketLabor);
server.post("/ticketProducts", addTicketProduct);
server.put("/ticketProducts/:ticketProductId", updateTicketProduct);
server.delete("/ticketProducts/:ticketProductId", deleteTicketProduct);

//users controller end points
server.get("/users", searchCustomers);
server.get("/users/bikes/:userId", getBikes);
server.put("/users/update", updateUserInfo);
server.post("/users", createUser);
server.post("/users/bike", createBike);

//to do list contoller
server.get("/toDoList", getToDoList);
server.post("/toDoList", addToDoItem);
server.put("/toDoList/:toDoId", updateToDoItem);
server.delete("/toDoList/:toDoId", deleteToDoItem);

//items controller
server.get("/tech/catalogue", searchCatelogue);

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

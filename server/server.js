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
const { login, register } = require('./controllers/auth');
const { isAuthenticated } = require("./middleware/isAuthenticated");

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

//Authentication Controller
server.post('/register', register);
server.post('/login', login);

//tickets controller end points
server.get("/tickets",isAuthenticated, getTickets);
server.get("/tickets/:userId",isAuthenticated, getUserTickets);
server.get("/ticket/:ticketId",isAuthenticated, getTicketDetails);
server.get("/search/tickets",isAuthenticated, searchTickets);
server.post("/tickets",isAuthenticated, newTicket);
server.put("/tickets/:ticketId",isAuthenticated, editTicket);
server.delete("/tickets/:ticketId",isAuthenticated, deleteTicket);

//ticketItems controller end points
server.get("/ticketItems/:ticketId",isAuthenticated, getTicketItems);
server.post("/ticketLabor",isAuthenticated, addTicketLabor);
server.put("/ticketLabor/:ticketLaborId",isAuthenticated, updateTicketLabor);
server.delete("/ticketLabor/:ticketLaborId",isAuthenticated, deleteTicketLabor);
server.post("/ticketProducts",isAuthenticated, addTicketProduct);
server.put("/ticketProducts/:ticketProductId",isAuthenticated, updateTicketProduct);
server.delete("/ticketProducts/:ticketProductId",isAuthenticated, deleteTicketProduct);

//users controller end points
server.get("/users", isAuthenticated, searchCustomers);
server.get("/users/bikes/:userId",isAuthenticated, getBikes);
server.put("/users/update",isAuthenticated, updateUserInfo);
server.post("/users",isAuthenticated, createUser);
server.post("/users/bike",isAuthenticated, createBike);

//to do list contoller
server.get("/toDoList",isAuthenticated, getToDoList);
server.post("/toDoList",isAuthenticated, addToDoItem);
server.put("/toDoList/:toDoId",isAuthenticated, updateToDoItem);
server.delete("/toDoList/:toDoId",isAuthenticated, deleteToDoItem);

//items controller
server.get("/tech/catalogue",isAuthenticated, searchCatelogue);

//^ Database sycn and seed
db
.sync()
  // .sync({force: true})
  .then(() => {
    // seed()
  })
  .catch((err) => console.log(err, "could not connect"));

//^ Listen Statement
server.listen(PORT, () =>
  console.log(`============  Up on ${PORT} =============`)
);

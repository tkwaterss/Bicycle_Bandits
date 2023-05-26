//^ Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./util/database");
const seed = require("./util/seed");
const productSeed = require("./util/productSeed");
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const {
  User,
  Bike,
  Ticket,
  Labor,
  Product,
  // Order,
  // Cart,
  TicketLabor,
  TicketProduct,
  // OrderProduct,
} = require("./util/models");
const {
  getTickets,
  getUserTickets,
  getTicketDetails,
  searchTickets,
  newTicket,
  editTicket,
  updateTotal,
  deleteTicket,
  getAllTickets,
} = require("./controllers/tickets");
const {
  getTicketItems,
  addTicketLabor,
  updateTicketLabor,
  deleteTicketLabor,
  addTicketProduct,
  updateTicketProduct,
  deleteTicketProduct,
  searchTicketItems,
} = require("./controllers/ticketItems");
const {
  searchCustomers,
  getBikes,
  updateUserInfo,
  createUser,
  createBike,
  newUserBikeTicket,
  newBikeTicket,
  changeAccountType,
} = require("./controllers/users");
const {
  getToDoList,
  addToDoItem,
  updateToDoItem,
  deleteToDoItem,
} = require("./controllers/todoList");
const { searchCatelogue } = require("./controllers/items");
const { login, register } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

//^ Variables
const server = express();
const { PORT, REACT_APP_HLC_TOKEN } = process.env;

//^ Middleware
server.use(express.json());
server.use(cors());
// server.use(express.static(path.join(__dirname, "../build")));
server.use(express.static(path.join(__dirname, "../src")));

//^ Caching
let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const fetchApiBrands = async () => {
  const apiResponse = await axios.get(
    "https://api.hlc.bike/us/v3.0/Catalog/Brands",
    {
      headers: {
        Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
      },
    }
  );
  console.log("Request sent to the API");
  return apiResponse.data;
};
const getBrandsData = async (req, res) => {
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get('brands');
    //brands is the key for grabbing all brands data
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiBrands();
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set('brands', JSON.stringify(results));
    }
    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send("Data unavailable");
  }
};

server.get("/api/brands", getBrandsData);

//^ Associations
User.hasMany(Bike);
Bike.belongsTo(User);
User.hasMany(Ticket);
Ticket.belongsTo(User);
// User.hasMany(Order);
// Order.belongsTo(User);

// User.belongsToMany(Product, { through: Cart });
// Product.belongsToMany(User, { through: Cart });

// Order.belongsToMany(Product, { through: OrderProduct });
// Product.belongsToMany(Order, { through: OrderProduct });

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
server.post("/register", register);
server.post("/login", login);

//tickets controller end points
server.get("/tickets", isAuthenticated, getTickets);
server.get("/tickets/:userId", isAuthenticated, getUserTickets);
server.get("/ticket/:ticketId", isAuthenticated, getTicketDetails);
server.get("/allTickets", isAuthenticated, getAllTickets);
server.get("/search/tickets", isAuthenticated, searchTickets);
server.post("/tickets", isAuthenticated, newTicket);
server.put("/tickets/:ticketId", isAuthenticated, editTicket);
server.put("/tickets/total/:ticketId", isAuthenticated, updateTotal);
server.delete("/tickets/:ticketId", isAuthenticated, deleteTicket);

//ticketItems controller end points
server.get("/ticketItems/:ticketId", isAuthenticated, getTicketItems);
server.get("/search/ticketItems", isAuthenticated, searchTicketItems);
server.post("/ticketLabor", isAuthenticated, addTicketLabor);
server.put("/ticketLabor/:ticketLaborId", isAuthenticated, updateTicketLabor);
server.delete(
  "/ticketLabor/:ticketLaborId",
  isAuthenticated,
  deleteTicketLabor
);
server.post("/ticketProducts", isAuthenticated, addTicketProduct);
server.put(
  "/ticketProducts/:ticketProductId",
  isAuthenticated,
  updateTicketProduct
);
server.delete(
  "/ticketProducts/:ticketProductId",
  isAuthenticated,
  deleteTicketProduct
);

//users controller end points
server.get("/users", isAuthenticated, searchCustomers);
server.get("/users/bikes/:userId", isAuthenticated, getBikes);
server.put("/users/update", isAuthenticated, updateUserInfo);
server.post("/users", isAuthenticated, createUser);
server.post("/users/bike", isAuthenticated, createBike);
server.post("/newUser", isAuthenticated, newUserBikeTicket);
server.post("/newBike", isAuthenticated, newBikeTicket);
server.put("/updateAccount/:userId", isAuthenticated, changeAccountType);

//to do list contoller
server.get("/toDoList", isAuthenticated, getToDoList);
server.post("/toDoList", isAuthenticated, addToDoItem);
server.put("/toDoList/:toDoId", isAuthenticated, updateToDoItem);
server.delete("/toDoList/:toDoId", isAuthenticated, deleteToDoItem);

//items controller
server.get("/tech/catalogue", isAuthenticated, searchCatelogue);

// server.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });
server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//^ Database sycn and seed
db.sync()
  // .sync({ force: true })
  .then(() => {
    // seed();
    // productSeed();
  })
  .catch((err) => console.log(err, "could not connect"));

//^ Listen Statement
server.listen(PORT, () =>
  console.log(`============  Up on ${PORT} =============`)
);

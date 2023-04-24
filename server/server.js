//^ Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./util/database");
const {
  User,
  Bike,
  Ticket,
  Labor,
  Product,
  Order,
  Todo,
  Cart,
  TicketLabor,
  TicketProduct,
  OrderProduct,
} = require("./util/models");

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

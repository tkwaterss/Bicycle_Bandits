const { DataTypes } = require("sequelize");
const db = require("./database");

module.exports = {
  User: db.define("user", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    firstname: DataTypes.STRING(50),
    lastname: DataTypes.STRING(50),
    email: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
    phone: DataTypes.STRING(10),
    address: DataTypes.STRING,
    employee: DataTypes.BOOLEAN,
  }),
  Bike: db.define("bike", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    brand: DataTypes.STRING(50),
    model: DataTypes.STRING(50),
    color: DataTypes.STRING(50),
    size: DataTypes.STRING(50),
    type: DataTypes.STRING(50),
  }),
  Ticket: db.define("ticket", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    internalNotes: DataTypes.TEXT,
    externalNotes: DataTypes.TEXT,
    dueDate: DataTypes.DATEONLY,
    location: DataTypes.STRING(50),
    status: DataTypes.STRING(50),
    total: DataTypes.FLOAT,
  }),
  Labor: db.define("labor", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    laborTitle: DataTypes.STRING,
    laborPrice: DataTypes.FLOAT,
    laborTime: DataTypes.STRING,
  }),
  Product: db.define("product", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    productTitle: DataTypes.STRING,
    productPrice: DataTypes.FLOAT,
  }),
  Brand: db.define("brand", {
    Id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Name: DataTypes.STRING,
  }),
  Category: db.define("category", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    CategoryName: DataTypes.STRING,
    Level: DataTypes.INTEGER,
  }),
  // Product: db.define("product", {
  //   id: {
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true,
  //     type: DataTypes.INTEGER,
  //   },
  //   ProductNo: DataTypes.INTEGER,
  //   Name: DataTypes.STRING,
  //   Description: DataTypes.TEXT,
  //   BrandId: DataTypes.INTEGER,
  //   MSRP: DataTypes.FLOAT,
  //   Base: DataTypes.FLOAT,
  //   ImageURL: DataTypes.TEXT
  // }),
  Order: db.define("order", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    orderTotal: DataTypes.FLOAT,
  }),
  Todo: db.define("todo", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    complete: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
  }),
  Cart: db.define("cart", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }),
  TicketLabor: db.define("ticketLabor", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }),
  TicketProduct: db.define("ticketProduct", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }),
  OrderProduct: db.define("orderProduct", {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }),
};

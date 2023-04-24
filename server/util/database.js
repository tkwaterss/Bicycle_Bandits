const Sequelize = require('sequelize')
require('dotenv').config();

const {CONNECTION_STRING} = process.env;

const db = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

module.exports = db;
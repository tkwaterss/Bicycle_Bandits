const {
  Ticket,
  Labor,
  Product,
  TicketLabor,
  TicketProduct,
} = require("../util/models");
const {Op} = require('sequelize');

module.exports = {
  getTicketItems: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in getTicketItems");
      console.log(err);
      res.sendStatus(400);
    }
  },
  getTicketTotal: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in getTicketTotal");
      console.log(err);
      res.sendStatus(400);
    }
  },
  addTicketLabor: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in addTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  updateTicketLabor: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in updateTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  deleteTicketLabor: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in deleteTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  addTicketProduct: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in addTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
  updateTicketProduct: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in updateTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
  deleteTicketProduct: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in deleteTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

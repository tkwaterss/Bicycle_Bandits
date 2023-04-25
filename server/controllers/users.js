const {User, Bike, Ticket} = require('../util/models')

module.exports = {
  searchCustomers: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in searchCustomers");
      console.log(err);
      res.sendStatus(400);
    }
  },
  getBikes: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in getBikes");
      console.log(err);
      res.sendStatus(400);
    }
  },
  updateUserInfo: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in updateUserInfo");
      console.log(err);
      res.sendStatus(400);
    }
  },
  createUser: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in createUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  createBike: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in createBike");
      console.log(err);
      res.sendStatus(400);
    }
  },
}
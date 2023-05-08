const { User, Bike, Ticket } = require("../util/models");
const { Op } = require("sequelize");
const { toTitleCase } = require("../utils/formatting");

module.exports = {
  //recieves query param, return matching users (by first or last name)
  searchCustomers: async (req, res) => {
    let { firstname, lastname } = req.query;

    firstname ? "" : firstname = "";
    lastname ? "" : lastname = "";

    firstname = toTitleCase(firstname);
    lastname = toTitleCase(lastname);
    try {
      const users = await User.findAll({
        where: {
          [Op.and]: {
            firstname: { [Op.startsWith]: firstname },
            lastname: { [Op.startsWith]: lastname },
          },
        },
        limit: 10,
      });
      res.status(200).send(users)
    } catch (err) {
      console.log("error in searchCustomers");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //recieves userId, get list of users bikes
  getBikes: async (req, res) => {
    const {userId} = req.params
    try {
      const bikes = await Bike.findAll({
        where: {userId: +userId}
      })
      res.status(200).send(bikes)
    } catch (err) {
      console.log("error in getBikes");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //recieves ticketId and body, update related user/bike
  updateUserInfo: async (req, res) => {
    const {userId, bikeId} = req.query;
    const {user, bike} = req.body
    try {
      //setting up to recieve a body with two keys, user and bike (req.body.user) to update
      const userinfo = await User.findByPk(userId);
      const bikeinfo = await Bike.findByPk(bikeId);
      await userinfo.set(user);
      await bikeinfo.set(bike);
      await userinfo.save();
      await bikeinfo.save();
      res.sendStatus(200)
    } catch (err) {
      console.log("error in updateUserInfo");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //recieves body with new user info, create user
  createUser: async (req, res) => {
    try {
      let newUser = await User.create(req.body)
      res.status(200).send(newUser);
    } catch (err) {
      console.log("error in createUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //recieves userId and body with new bike info, create new bike
  createBike: async (req, res) => {
    try {
      let newBike = await Bike.create(req.body)
      res.status(200).send(newBike);
    } catch (err) {
      console.log("error in createBike");
      console.log(err);
      res.sendStatus(400);
    }
  },
  newUserBikeTicket: async (req, res) => {
    try {
      console.log(req.body)

      const emailExists = await User.findOne({ where: { email: req.body.newUserBody.email } });
      const phoneExists = await User.findOne({ where: { phone: req.body.newUserBody.phone } });
      if (emailExists) {
        res.status(400).send("An account using that email already exists");
      } else if (phoneExists) {
        res.status(400).send("An account with that phone number already exists");
      } else {
        let newUser = await User.create(req.body.newUserBody);
        req.body.newBikeBody.userId = newUser.id;
        let newBike = await Bike.create(req.body.newBikeBody);
        req.body.newTicketBody.userId = newUser.id;
        req.body.newTicketBody.bikeId = newBike.id;
        let newTicket = await Ticket.create(req.body.newTicketBody);
        res.status(200).send(newTicket)
      }
    } catch (err) {
      console.log("error in createBike");
      console.log(err);
      res.sendStatus(400);
    }
  },
  newBikeTicket: async (req, res) => {
    try {
      let newBike = await Bike.create(req.body.newBikeBody);
      req.body.newTicketBody.bikeId = newBike.id;
      let newTicket = await Ticket.create(req.body.newTicketBody);
      res.status(200).send(newTicket)
    } catch (err) {
      console.log("error in createBike");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

const { User, Bike } = require("../util/models");
const { Op } = require("sequelize");
const { toTitleCase } = require("../utils/formatting");

module.exports = {
  //recieves query param, return matching users (by first or last name)
  searchCustomers: async (req, res) => {
    let { input } = req.query;
    input = toTitleCase(input);
    try {
      const users = await User.findAll({
        where: {
          [Op.or]: {
            firstname: { [Op.startsWith]: input },
            lastname: { [Op.startsWith]: input },
          },
        },
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
      await User.create(req.body)
      res.sendStatus(200);
    } catch (err) {
      console.log("error in createUser");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //recieves userId and body with new bike info, create new bike
  createBike: async (req, res) => {
    try {
      await Bike.create(req.body)
      res.sendStatus(200);
    } catch (err) {
      console.log("error in createBike");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

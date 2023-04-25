const {
  User,
  Bike,
  Ticket,
  TicketLabor,
  TicketProduct,
  Product,
  Labor,
} = require("../util/models");
const {Op} = require('sequelize');

module.exports = {
  //get 10 tickets sorted by closest due date going forwards from today
  //TODO maybe first look for overdue tickets that aren't complete
  getTickets: async (req, res) => {
    try {
      const tickets = await Ticket.findAll({
        where: {dueDate: {
          [Op.gte]: new Date()
        }},
        include: [{model: Bike}],
        limit: 10,
        order: [['dueDate', 'ASC']],
      });
      res.status(200).send(tickets);
    } catch (err) {
      console.log("error in getTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //get 5 tickets where the userId = params and order by due date descending
  getUserTickets: async (req, res) => {
    const {userId} = req.params
    console.log(userId)
    try {
      const tickets = await Ticket.findAll({
        where: {userId: {
          [Op.eq]: userId,
        }},
        include: [{model: Bike}],
        limit: 5,
        order: [['dueDate', 'DESC']],
      })
      res.status(200).send(tickets);
    } catch (err) {
      console.log("error in getUserTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  getTicketDetails: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in getTicketDetails");
      console.log(err);
      res.sendStatus(400);
    }
  },
  searchTickets: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in searchTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  newTicket: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in newTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
  editTicket: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in editTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
  deleteTicket: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in deleteTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

const { User, Bike, Ticket } = require("../util/models");
const { Op } = require("sequelize");
const { toTitleCase } = require("../util/formatting");
module.exports = {
  //get 10 tickets sorted by closest due date going forwards from today
  getTickets: async (req, res) => {
    try {
      const tickets = await Ticket.findAll({
        where: {
          dueDate: {
            [Op.gte]: new Date(),
          },
        },
        include: [{ model: Bike }, {model: User}],
        limit: 10,
        order: [["dueDate", "ASC"]],
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
    const { userId } = req.params;
    try {
      const tickets = await Ticket.findAll({
        where: {
          userId: {
            [Op.eq]: +userId,
          },
        },
        include: [{ model: Bike }],
        limit: 5,
        order: [["dueDate", "DESC"]],
      });
      res.status(200).send(tickets);
    } catch (err) {
      console.log("error in getUserTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //get ticket, user, and bike details for a given ticketId
  getTicketDetails: async (req, res) => {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findByPk(+ticketId, {
        include: [{ model: User }, { model: Bike }],
      });
      res.status(200).send(ticket);
    } catch (err) {
      console.log("error in getTicketDetails");
      console.log(err);
      res.sendStatus(400);
    }
  },
  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.findAll({
        where: {
          dueDate: {
            [Op.gte]: new Date(),
          },
        },
        include: [{ model: Bike }, {model: User}],
        order: [["dueDate", "ASC"]],
      });
      res.status(200).send(tickets);
    } catch (err) {
      console.log("error in getAllTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //find tickets based on search inputs
  searchTickets: async (req, res) => {
    let { input, category } = req.query;
    input = toTitleCase(input);
    let searchTable = User;
    let includeTable = Bike;
    let query = {
      [Op.or]: {
        firstname: { [Op.startsWith]: input },
        lastname: { [Op.startsWith]: input },
      },
    };
    if (category === "Bike Info") {
      searchTable = Bike;
      includeTable = User;
      query = {
        [Op.or]: {
          brand: { [Op.startsWith]: input },
          model: { [Op.startsWith]: input },
        },
      };
    }
    try {
      const tickets = await Ticket.findAll({
        include: [
          {
            model: searchTable,
            where: query,
            required: true,
          },
          { model: includeTable },
        ],
      });
      res.status(200).send(tickets);
    } catch (err) {
      console.log("error in searchTickets");
      console.log(err);
      res.sendStatus(400);
    }
  },
  // create a new ticket (new bike/user will be handled by front end)
  newTicket: async (req, res) => {
    try {
      const newTicket = await Ticket.create(req.body);
      res.status(200).send(newTicket);
    } catch (err) {
      console.log("error in newTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //edit ticket, will recieve body with data (body should be a copy with updates)
  editTicket: async (req, res) => {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findByPk(ticketId);
      await ticket.set(req.body);
      await ticket.save();
      res.sendStatus(200);
    } catch (err) {
      console.log("error in editTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //update ticket total
  updateTotal: async (req, res) => {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findByPk(ticketId);
      await ticket.set(req.body);
      await ticket.save();
      res.sendStatus(200);
    } catch (err) {
      console.log("error in updateTotal");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //delete ticket by ID
  deleteTicket: async (req, res) => {
    const { ticketId } = req.params;
    try {
      await Ticket.destroy({ where: { id: +ticketId } });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in deleteTicket");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

const {
  Ticket,
  Labor,
  Product,
  TicketLabor,
  TicketProduct,
} = require("../util/models");
const { Op } = require("sequelize");

module.exports = {
  //get full list of products and labor by Ticket ID
  //calculate ticket total from results and update it on Ticket
  //returns overall total, labor total, and product total with items list
  getTicketItems: async (req, res) => {
    const { ticketId } = req.params;
    try {
      const labor = await TicketLabor.findAll({
        where: { ticketId: +ticketId },
        include: [{ model: Labor }],
      });
      let laborTotal = labor.reduce((total, curr) => {
        return total + curr.labor.laborPrice;
      }, 0);

      const products = await TicketProduct.findAll({
        where: { ticketId: +ticketId },
        include: [{ model: Product }],
      });
      let productTotal = products.reduce((total, curr) => {
        return total + curr.product.productPrice;
      }, 0);

      let ticketTotal = laborTotal + productTotal;
      await Ticket.update({ total: ticketTotal }, { where: { id: +ticketId } });

      const list = {
        labor,
        products,
        laborTotal,
        productTotal,
        ticketTotal,
      };
      res.status(200).send(list);
    } catch (err) {
      console.log("error in getTicketItems");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //given laborId and ticketId add new ticketLabor
  addTicketLabor: async (req, res) => {
    try {
      await TicketLabor.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log("error in addTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //update quantity of ticketLabor item given ID, recieves body with new QTY
  updateTicketLabor: async (req, res) => {
    const {ticketLaborId} = req.params
    const {quantity} = req.body
    try {
      await TicketLabor.update({quantity: quantity}, {where: {id: +ticketLaborId}})
      res.sendStatus(200);
    } catch (err) {
      console.log("error in updateTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //delete ticketLabor item given ID
  deleteTicketLabor: async (req, res) => {
    const { ticketLaborId } = req.params;
    try {
      await TicketLabor.destroy({ where: { id: +ticketLaborId } });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in deleteTicketLabor");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //given productId and ticketId add new ticketProduct
  addTicketProduct: async (req, res) => {
    try {
      await TicketProduct.create(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log("error in addTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //update quantity of ticketProduct item given ID, recieves body with new QTY
  updateTicketProduct: async (req, res) => {
    const {ticketProductId} = req.params
    const {quantity} = req.body
    try {
      await TicketProduct.update({quantity: quantity}, {where: {id: +ticketProductId}})
      res.sendStatus(200);
    } catch (err) {
      console.log("error in updateTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //delete ticketProduct item given ID
  deleteTicketProduct: async (req, res) => {
    const { ticketProductId } = req.params;
    try {
      await TicketProduct.destroy({ where: { id: +ticketProductId } });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in deleteTicketProduct");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

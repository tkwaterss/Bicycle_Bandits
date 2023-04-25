const {
  Product,
  Labor,
  TicketLabor,
  TicketProduct,
  Ticket,
} = require("../util/models");

module.exports = {
  searchCatelogue: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in searchCatelogue");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

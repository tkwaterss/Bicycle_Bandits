const { Product, Labor } = require("../util/models");
const { Op } = require("sequelize");
const {toTitleCase} = require('../../general-utils/formatting')

module.exports = {
  //recieves query to search both products and labor
  //TODO Need to figure out reg ex search to ignore letter case
  searchCatelogue: async (req, res) => {
    const { input } = req.query;
    let laborInput = input.toUpperCase()
    let productInput = toTitleCase(input)
    try {
      const laborResults = await Labor.findAll({
        where: { laborTitle: { [Op.substring]: laborInput } },
      });
      const productResults = await Product.findAll({
        where: { productTitle: { [Op.substring]: productInput } },
      });
      let results = { laborResults, productResults };
      res.status(200).send(results);
    } catch (err) {
      console.log("error in searchCatelogue");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

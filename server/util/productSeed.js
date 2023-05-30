const axios = require("axios");
require("dotenv").config();
const { REACT_APP_HLC_TOKEN } = process.env;

const { Product } = require("./models");

let products;

axios
  .get("https://api.hlc.bike/us/v3.0/Catalog/Products?pageStartIndex=1&pageSize=100", {
    headers: {
      Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
    },
  })
  .then( (res) => {
    products = res.data.map((product => {
      let newProduct = {
        ProductNo: +product.ProductNo,
        Name: product.Name,
        Description: product.Description,
        BrandId: product.BrandId,
        MSRP: product.Variants[0].Prices[0].Amount,
        Base: product.Variants[0].Prices[1].Amount,
        ImageURL: product.Variants[0].Images[0].Url,
      }
      return newProduct
    }));
    // console.log(products);
  })
  .catch((err) => console.log(err));

const productSeed = async () => {
  try {
    await Product.bulkCreate(products);
  } catch (err) {
    console.log(err);
  }
};

module.exports = productSeed;

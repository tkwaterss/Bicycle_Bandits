const axios = require("axios");
require("dotenv").config();
const { REACT_APP_HLC_TOKEN } = process.env;

const { Brand, Category } = require("./models");

let brands;
let categories;

axios
  .get("https://api.hlc.bike/us/v3.0/Catalog/Brands", {
    headers: {
      Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
    },
  })
  .then((res) => {
    brands = res.data;
  })
  .catch((err) => console.log(err));

axios
  .get("https://api.hlc.bike/us/v3.0/Catalog/Categories", {
    headers: {
      Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
    },
  })
  .then((res) => {
    categories = res.data;
  })
  .catch((err) => console.log(err));

  const brandSeed = async () => {
    try {
      await Brand.bulkCreate(brands);
      await Category.bulkCreate(categories);
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports = brandSeed;
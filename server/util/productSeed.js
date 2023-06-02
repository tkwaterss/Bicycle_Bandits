const axios = require("axios");
require("dotenv").config();
const { REACT_APP_HLC_TOKEN } = process.env;

const { Product } = require("./models");



// for (let i = 0; i < 100; i++) {
//   let startIndex = i * 100;
//   axios
//     .get(`https://api.hlc.bike/us/v3.0/Catalog/Products?pageStartIndex=${startIndex}&pageSize=100`, {
//       headers: {
//         Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
//       },
//     })
//     .then( (res) => {
//       let productsPage = res.data.map((product => {
//         let newProduct = {
//           ProductNo: +product.ProductNo,
//           Name: product.Name,
//           Description: product.Description,
//           BrandId: product.BrandId,
//           MSRP: product.Variants[0].Prices[0].Amount,
//           Base: product.Variants[0].Prices[1].Amount,
//           ImageURL: product.Variants[0].Images[0].Url,
//         }
//         return newProduct
//       }));
//       products = [...products, ...productsPage]
//     })
//     .catch((err) => console.log(err));
// }

const getProducts = async () => {
  let products = [];

  await axios
    .get(`https://api.hlc.bike/us/v3.0/Catalog/Products`, {
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
    })
    .catch((err) => console.log(err));

    return products;
}

//TODO Need to figure out a way to get all products to populate into DB, everything else is working

const productSeed = async () => {
  const products = getProducts()
  try {
    await Product.bulkCreate(products);
  } catch (err) {
    console.log(err);
  }
};

module.exports = productSeed;

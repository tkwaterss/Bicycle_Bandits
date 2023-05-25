const axios = require("axios");
require("dotenv").config();
const { REACT_APP_HLC_TOKEN } = process.env;

//TODO What if I run everything right here
let Products
let Brands
let Categories

axios
  .get(
    "https://api.hlc.bike/us/v3.0/Catalog/Products?pageStartIndex=1&pageSize=20&brands=Sram",
    {
      headers: {
        Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
      },
    }
  )
  .then((res) => {
    console.log(res.data);
    Products = res.data.map(product => {
      return {
        ProductNo: product.ProductNo,
        Name: product.Name,
        Description: product.Description,
        BrandId: product.BrandId,
        Brand: product.Brand,
        ProductId: product.ProductId,
      }
    })
    console.log(Products);
  })
  .catch((err) => console.log(err));



// axios
//   .get("https://api.hlc.bike/us/v3.0/Catalog/Products/Prices", {
//     headers: {
//       Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => console.log(err));

// axios
//   .get("https://api.hlc.bike/us/v3.0/Catalog/Categories", {
//     headers: {
//       Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => console.log(err));

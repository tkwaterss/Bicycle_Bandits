import axios from "axios";

let isCacheSupported = "caches" in window;

const { REACT_APP_HLC_TOKEN } = process.env;

// these functions could be in src.utils.cache.js file and exported for use elsewhere
const writeToCache = (url, data) =>
  localStorage.setItem(url, JSON.stringify(data));
const readFromCache = (url) => JSON.parse(localStorage.getItem(url)) || null;

//this function would be in the component where the http request is being made

let baseUrl = "https://api.hlc.bike/us/v3.0/Catalog/Brands";

const getFreshBrands = async (url, cacheResponse = false) => {
  const { data } = await axios.get(baseUrl, {
    headers: {
      Authorization: `ApiKey ${REACT_APP_HLC_TOKEN}`,
    },
  });
  cacheResponse && writeToCache(url, data);
  console.log(data);
  return data;

};


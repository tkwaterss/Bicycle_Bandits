module.exports = {
  toTitleCase: (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.substring(1);
      })
      .join(" ");
  },
  toUpperCase: (string) => {
    return string.toUpperCase();
  },
  toLowerCase: (string) => {
    return string.toLowerCase();
  },
  phoneFormat: (string) => {
    //remove all special characters and make sure length is 10
  },
  priceFormat: (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
};
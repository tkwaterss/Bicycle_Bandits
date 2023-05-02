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
  }
};

//phone number formatting / validation
//address validation
// data / time formatting
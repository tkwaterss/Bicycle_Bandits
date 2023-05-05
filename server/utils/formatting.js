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
};

//phone number formatting / validation
//address validation
// data / time formatting
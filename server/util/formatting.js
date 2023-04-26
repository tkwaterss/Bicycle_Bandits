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
};

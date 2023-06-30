require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");
    console.log('attempting to auth')
    console.log(headerToken);
    if (!headerToken) {
      console.log("ERROR in authentication");
      res.sendStatus(401);
      return;
    }

    let token;
    //TODO get working like this, see if it will work with a res.status.send instead
    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    next();
  },
};

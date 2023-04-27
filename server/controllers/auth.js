require("dotenv").config();
const { User } = require("../util/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = process.env;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, SECRET, { expiresIn: "2 days" });
};

//TODO Ensure that response codes are accurate to results
//! Account for two account types here? some kind of validation
module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password, phone, address } = req.body;

      //TODO Utilize express-validator here to check all values are okay

      //checking if account exists, if so then prompt to login or try different email
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        res.status(400).send("An account using that email already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          firstname: firstname,
          lastname: lastname,
          email: email,
          hashedPass: hash,
          phone: phone,
          address: address,
          employee: false,
        });

        const token = createToken(
          newUser.dataValues.email,
          newUser.dataValues.id
        );

        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.status(201).send({
          email: newUser.dataValues.email,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (err) {
      console.log("Error in register");
      console.log(err);
      res.sendStatus(400);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //TODO setup more robust validation (check email is in correct format)
      if (!email || !password) {
        res.status(400).send("Please fill out both fields");
        return;
      }

      const user = await User.findOne({ where: { email } });

      if (user) {
        const isAuthenticated = bcrypt.compareSync(password, user.hashedPass);
        if (isAuthenticated) {
          const token = createToken(user.dataValues.email, user.dataValues.id);
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            email: user.dataValues.email,
            userId: user.dataValues.id,
            token: token,
            exp: exp,
          });
        } else {
          res.status(400).send("Unable to Authenticate");
        }
      } else {
        res.status(400).send("No user with that email address exists");
      }
    } catch (err) {
      console.log("Error in login");
      console.log(err);
      res.sendStatus(400);
    }
  },
};

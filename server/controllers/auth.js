require("dotenv").config();
const { User } = require("../util/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = process.env;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password, phone, address, employee } =
        req.body;

      //checking if account exists, if so then prompt to login or try different email
      const emailExists = await User.findOne({ where: { email } });
      const phoneExists = await User.findOne({ where: { phone } });
      if (emailExists) {
        res.status(400).send("An account using that email already exists");
      } else if (phoneExists) {
        res.status(400).send("An account with that phone number already exists");
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
          employee: employee,
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
          employee: newUser.dataValues.employee,
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
      console.log(user);
      if (user) {
        const isAuthenticated = bcrypt.compareSync(password, user.hashedPass);
        console.log(isAuthenticated);
        if (isAuthenticated) {
          const token = createToken(user.dataValues.email, user.dataValues.id);
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            email: user.dataValues.email,
            userId: user.dataValues.id,
            token: token,
            exp: exp,
            employee: user.dataValues.employee,
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

const {Todo} = require('../util/models')

module.exports = {
  getToDoList: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in getToDoList");
      console.log(err);
      res.sendStatus(400);
    }
  },
  addToDoItem: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in addToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
  updateToDoItem: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in updateToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
  deleteToDoItem: async (req, res) => {
    try {
    } catch (err) {
      console.log("error in deleteToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
}
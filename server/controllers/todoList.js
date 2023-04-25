const {Todo} = require('../util/models')

module.exports = {
  // get all list items that haven't been completed, sorted by created date
  getToDoList: async (req, res) => {
    try {
      const list = await Todo.findAll({
        where: {complete: false},
        order: [['createdAt', 'ASC']]
      })
      res.status(200).send(list)
    } catch (err) {
      console.log("error in getToDoList");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //create a new list item (front end will call get again after response)
  addToDoItem: async (req, res) => {
    try {
      await Todo.create(req.body)
      res.sendStatus(200)
    } catch (err) {
      console.log("error in addToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //update complete status or description of list item (front end will get items again)
  updateToDoItem: async (req, res) => {
    const {toDoId} = req.params
    try {
      const item = await Todo.findByPk(toDoId);
      await item.set(req.body);
      await item.save()
      res.sendStatus(200)
    } catch (err) {
      console.log("error in updateToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
  //delete item by ID (front end will get items again after)
  deleteToDoItem: async (req, res) => {
    const {toDoId} = req.params
    try {
      await Todo.destroy({ where: {id: +toDoId}})
      res.sendStatus(200);
    } catch (err) {
      console.log("error in deleteToDoItem");
      console.log(err);
      res.sendStatus(400);
    }
  },
}
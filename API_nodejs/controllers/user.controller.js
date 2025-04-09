const User = require("../models/user.model");

module.exports = {
  getAll: (req, res) => {
    User.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const user = req.body;
    User.insert(user, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const user = req.body;
    User.update(user, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    User.delete(id, (result) => {
      res.send(result);
    });
  }
};


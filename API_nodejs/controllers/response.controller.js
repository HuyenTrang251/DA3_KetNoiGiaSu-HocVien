const Response = require("../models/response.model");

module.exports = {
  getAll: (req, res) => {
    Response.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Response.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const response = req.body;
    Response.insert(response, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const response = req.body;
    const id = req.params.id;
    Response.update(response, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Response.delete(id, (result) => {
      res.send(result);
    });
  }
};

const Availability = require("../models/availability.model");

module.exports = {
  getAll: (req, res) => {
    Availability.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Availability.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const availability = req.body;
    Availability.insert(availability, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const availability = req.body;
    const id = req.params.id;
    Availability.update(availability, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Availability.delete(id, (result) => {
      res.send(result);
    });
  }
};

const Tutor = require("../models/tutor.model");

module.exports = {
  getAll: (req, res) => {
    Tutor.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Tutor.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const tutor = req.body;
    Tutor.insert(tutor, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const tutor = req.body;
    const id = req.params.id;
    Tutor.update(tutor, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Tutor.delete(id, (result) => {
      res.send(result);
    });
  }
};

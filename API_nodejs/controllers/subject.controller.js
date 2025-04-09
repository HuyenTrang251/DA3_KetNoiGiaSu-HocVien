const Subject = require("../models/subject.model");

module.exports = {
  getAll: (req, res) => {
    Subject.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Subject.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const subject = req.body;
    Subject.insert(subject, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const subject = req.body;
    const id = req.params.id;
    Subject.update(subject, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Subject.delete(id, (result) => {
      res.send(result);
    });
  }
};

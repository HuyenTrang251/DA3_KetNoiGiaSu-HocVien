const Student = require("../models/student.model");

module.exports = {
  getAll: (req, res) => {
    Student.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Student.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const student = req.body;
    Student.insert(student, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const student = req.body;
    const id = req.params.id;
    Student.update(student, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Student.delete(id, (result) => {
      res.send(result);
    });
  }
};

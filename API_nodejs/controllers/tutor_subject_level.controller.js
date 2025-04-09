const Tutor_subject_level = require("../models/tutor_subject_level.model");

module.exports = {
  getAll: (req, res) => {
    Tutor_subject_level.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Tutor_subject_level.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const tutor_subject_level = req.body;
    Tutor_subject_level.insert(tutor_subject_level, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const tutor_subject_level = req.body;
    const id = req.params.id;
    Tutor_subject_level.update(tutor_subject_level, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Tutor_subject_level.delete(id, (result) => {
      res.send(result);
    });
  }
};

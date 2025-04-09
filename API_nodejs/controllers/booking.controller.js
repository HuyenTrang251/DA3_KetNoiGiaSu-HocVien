const Booking = require("../models/booking.model");

module.exports = {
  getAll: (req, res) => {
    Booking.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Booking.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const booking = req.body;
    Booking.insert(booking, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const booking = req.body;
    const id = req.params.id;
    Booking.update(booking, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Booking.delete(id, (result) => {
      res.send(result);
    });
  }
};

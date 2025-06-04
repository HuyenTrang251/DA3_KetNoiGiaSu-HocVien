const Offer = require("../models/offer.model");

module.exports = {
    getAll: (req, res) => {
        Offer.getAll((result) => {
          res.send(result);
        });
    },

    insert: (req, res) => {
        const offer = req.body;
        Offer.insert(offer, (result) => {
          res.send(result);
        });
    },

    update: (req, res) => {
        const offer = req.body;
        const id = req.params.id;
        Offer.update(id, offer, (result) => {
          res.send(result);
        });
    },
};
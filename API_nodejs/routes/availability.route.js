var express = require('express');
var router = express.Router();
const availabilityController = require("../controllers/availability.controller");

/* GET users listing. */
router.get('/', availabilityController.getAll);
router.get('/:id', availabilityController.getById);
router.post('/', availabilityController.insert);
router.put('/:id', availabilityController.update);
router.delete('/:id', availabilityController.delete);

module.exports = router;

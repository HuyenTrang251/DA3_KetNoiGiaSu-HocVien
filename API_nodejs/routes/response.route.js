var express = require('express');
var router = express.Router();
const responseController = require("../controllers/response.controller");
const xacthuc = require('../middleware/authentic.js');

/* GET users listing. */
router.get('/', responseController.getAll);
router.get('/:id', responseController.getById);
router.post('/', xacthuc(['gia sư']), responseController.insert);
router.put('/:id', responseController.update);
router.delete('/:id', responseController.delete);

module.exports = router;

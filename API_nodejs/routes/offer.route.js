var express = require('express');
var router = express.Router();
const offerController  = require("../controllers/offer.controller");

router.get('/', offerController.getAll);
router.post('/', offerController.insert);
router.put('/:id', offerController.update);

module.exports = router;
var express = require('express');
var router = express.Router();
const tutorController = require("../controllers/tutor.controller");

/* GET users listing. */
router.get('/', tutorController.getAll);
router.get('/:id', tutorController.getById);
router.post('/', tutorController.insert);
router.put('/:id', tutorController.update);
router.delete('/:id', tutorController.delete);
// router.get('/getID/:id', tutorController.getTutorId);

module.exports = router;

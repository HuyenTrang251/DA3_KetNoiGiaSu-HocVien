var express = require('express');
var router = express.Router();
const studentController = require("../controllers/student.controller");

/* GET users listing. */
router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.post('/', studentController.insert);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);
router.get('/getID/:id', studentController.getStudentId);

module.exports = router;

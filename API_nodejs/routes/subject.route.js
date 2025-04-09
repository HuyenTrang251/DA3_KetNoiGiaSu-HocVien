var express = require('express');
var router = express.Router();
const subjectController = require("../controllers/subject.controller");

/* GET users listing. */
router.get('/', subjectController.getAll);
router.get('/:id', subjectController.getById);
router.post('/', subjectController.insert);
router.put('/:id', subjectController.update);
router.delete('/:id', subjectController.delete);

module.exports = router;

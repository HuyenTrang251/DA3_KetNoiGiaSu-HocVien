var express = require('express');
var router = express.Router();
const tutor_subject_levelController = require("../controllers/tutor_subject_level.controller");

/* GET users listing. */
router.get('/', tutor_subject_levelController.getAll);
router.get('/:id', tutor_subject_levelController.getById);
router.post('/', tutor_subject_levelController.insert);
router.put('/:id', tutor_subject_levelController.update);
router.delete('/:id', tutor_subject_levelController.delete);

module.exports = router;

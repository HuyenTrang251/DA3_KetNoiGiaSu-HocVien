var express = require('express');
var router = express.Router();
const postController = require("../controllers/post.controller");

/* GET users listing. */
// router.get('/', postController.getAll);
router.get('/getByIdUser/:id', postController.getPostByUserID)
router.get('/:id', postController.getById);
router.post('/', postController.insert);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;

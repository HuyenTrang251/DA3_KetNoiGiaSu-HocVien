var express = require('express');
var router = express.Router();
const postController = require("../controllers/post.controller");
const xacthuc = require('../middleware/authentic.js');

/* GET users listing. */
router.get('/', postController.getAll);
router.get('/approved', postController.getAllPostsApproved);
router.get('/getByIdUser/:id', xacthuc(['học viên']), postController.getPostByUserID);
router.get('/getAllWithResponse', postController.getAllPostsWithResponse);
router.get('/getAllWithOffer', postController.getAllPostsWithOffer);
// router.get('/:id', postController.getById);
router.post('/', postController.insert);
router.put('/:id', postController.update);
router.put('/status/:id', postController.updateStatus);
router.delete('/:id', postController.delete);
router.get('/search', postController.search);

module.exports = router;

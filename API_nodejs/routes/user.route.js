var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require('multer');
const path = require('path');

// Đường dẫn tuyệt đối đến thư mục lưu trữ ảnh 
const UPLOADS_DIR = 'D:/uploads';

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.get('/', userController.getAll);
router.get('/:id', userController.getById);

// Sử dụng middleware upload.single trước userController.insert và userController.update
router.post('/', upload.single('img'), (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.filename; 
  }
  next(); 
}, userController.insert);

router.put('/', upload.single('img'), (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.filename;
  }
  next();
}, userController.update);

router.delete('/:id', userController.delete);

module.exports = router;
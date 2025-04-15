var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller");
const xacthuc = require('../middleware/authentic.js');
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


router.get('/',xacthuc(['admin', 'học viên', 'gia sư']), userController.getAll);
router.get('/:id',xacthuc(['admin']), userController.getById);

// Sử dụng middleware upload.single trước userController.insert và userController.update
router.post('/', upload.single('img'), (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.filename; 
  }
  next(); 
}, userController.insert);

router.put('/',xacthuc(['admin']), upload.single('img'), (req, res, next) => {
  if (req.file) {
    req.body.img = req.file.filename;
  }
  next();
}, userController.update);

router.delete('/:id',xacthuc(['admin']), userController.delete);
// router.delete('/:id', xacthuc, (req, res) => {
//   console.log(req.user);
//   userController.delete(req, res);
// });

router.post('/login', userController.login);

module.exports = router;
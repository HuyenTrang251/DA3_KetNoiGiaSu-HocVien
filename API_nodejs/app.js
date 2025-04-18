console.log("File app.js đang chạy...");

var createError = require('http-errors');
var express = require('express'); 
var multer = require('multer');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 

var app = express(); 

const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());


// const xacthuc = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     // console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1];  

//     if (token == null) return res.sendStatus(401);  

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.sendStatus(403);  

//         req.user = user;
//         next();
//         // if (req.user.role === 'admin') {
//         //     return res.json({ role: 'admin', message: 'Chào mừng admin!' });
//         // } else if (req.user.role === 'tutor') {
//         //     return res.json({ role: 'tutor', message: 'Chào mừng tutor!' });
//         // } else if (req.user.role === 'student') {
//         //     return res.json({ role: 'student', message: 'Chào mừng student!' });
//         // } else {
//         //     return res.status(400).send('Vai trò không hợp lệ');
//         // }
//     });
// };

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const UPLOADS_DIR = 'D:/uploads';
app.use('/uploads', express.static(UPLOADS_DIR));

// const db = require("./common/db");

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Truy vấn cơ sở dữ liệu để tìm người dùng
//     const sqlString = "SELECT * FROM user WHERE email = ? AND password = ?";
//     db.query(sqlString, [username, password], (err, results) => {
//       if (err) {
//         console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
//         return res.status(500).send('Lỗi hệ thống');
//       }

//       if (results.length === 0) {
//         return res.status(400).send('Tên người dùng hoặc mật khẩu không đúng');
//       }

//       // Lấy thông tin người dùng từ kết quả truy vấn
//       const user = results[0];

//       // Tạo token JWT
//       const token = jwt.sign({ username: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

//       // Trả về token
//       // res.json({token});
//       res.json({token: token, userdata: user});
//     });
//   });


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên tệp để tránh trùng lặp
    },
  });
  
  const upload = multer({ storage: storage });

// Cấu hình CORS cho phép mọi nguồn (hoặc chỉ cho phép một số nguồn nhất định)
var availabilityRouter = require('./routes/availability.route');
var bookingRouter = require('./routes/booking.route');
var postRouter = require('./routes/post.route');
var responseRouter = require('./routes/response.route');
var reviewRouter = require('./routes/review.route');
var studentRouter = require('./routes/student.route');
var subjectRouter = require('./routes/subject.route');
var tutorRouter = require('./routes/tutor.route');
var tutor_subject_levelRouter = require('./routes/tutor_subject_level.route');
var userRouter = require('./routes/user.route');
var indexRouter = require('./routes/index');

// Các middleware khác của Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Các router khác
app.use('/', indexRouter);
app.use('/availabilitys', availabilityRouter);
app.use('/bookings', bookingRouter);
app.use('/posts', postRouter);
app.use('/responses', responseRouter);
app.use('/reviews', reviewRouter);
app.use('/students', studentRouter);
app.use('/subjects', subjectRouter);
app.use('/tutors', tutorRouter);
app.use('/tutor_subject_levels', tutor_subject_levelRouter);
app.use('/users', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.set('view engine', 'ejs'); 
// app.set('views', path.join(__dirname, 'views')); 
// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại: http://localhost:${PORT}`);
});

module.exports = app;


// const users = [
//     { id: 1, username: 'trang', password: '123' },
//     { id: 2, username: 'user2', password: 'password2' }
//   ];
  
//   app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);
  
//     if (!user) {
//       return res.status(400).send('Tên người dùng hoặc mật khẩu không đúng');
//     }
  
//     const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   });
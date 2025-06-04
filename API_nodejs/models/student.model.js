const db = require("../common/db");
const student = (student) => {
this.id_student = student.id_student;
this.id_user = student.id_user;
this.class = student.class;
this.address = student.address;
};
student.getById = (id, callback) => {
  const sqlString = "CALL GetStudentInfoById(?)";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

student.getAll = (callback) => {
  const sqlString = "CALL GetStudentInfo();";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

student.getAllForAdminPost = (callback) => {
  const sqlString = "CALL GetAllStudentsForAdminPost()";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

student.insert = (studentData, callBack) => {
  const sqlString = "CALL AddStudent(?, ?, ?)";
  const student = [
    studentData.id_user,   
    studentData.class,     
    studentData.address   
  ];

  db.query(sqlString, student, (err, res) => {
    if (err) {
      console.error("Error calling AddStudentFromExistingUser:", err);
      callBack(err, null); 
      return;
    }
    console.log("Thêm học viên thành công user ID:", studentData.id_user);
    callBack(null, { message: "Student added successfully", id_user: studentData.id_user, ...studentData });
  });
};

student.update = (student, id, callBack) => {
  const sqlString = "UPDATE student SET ? WHERE id_student = ?";
  db.query(sqlString, [student, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật student id = " + id + " thành công");
  });
};

student.delete = (id, callBack) => {
  db.query("DELETE FROM student WHERE id_student = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa student id = " + id + " thành công");
  });
};

student.getStudentId = (userId, callback) => {
  // console.log('>>> userId truyền vào:', userId); // Xem giá trị userId
  const sql = 'SELECT id_student FROM student WHERE id_user = ? AND id_student IS NOT NULL';
  
  db.query(sql, [userId], (err, results) => {
    // console.log('>>> results:', results); // Xem kết quả trả về
    // console.log('>>> error:', err);        // Xem có lỗi SQL không

    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      callback(null, results[0].id_student);
    } else {
      callback(new Error("Không tìm thấy học viên"), null);
    }
  });
};

module.exports = student;

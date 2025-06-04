const db = require("../common/db");
const tutor = (tutor) => {
this.id_tutor = tutor.id_tutor;
this.id_user = tutor.id_user;
this.gender = tutor.gender;
this.birthday = tutor.birthday;
this.tuition = tutor.tuition;
this.experience = tutor.experience;
this.achievement = tutor.achievement;
this.method = tutor.method;
this.address = tutor.address;
this.fb = tutor.fb;
this.status = tutor.status;
};
tutor.getById = (id, callback) => {
  const sqlString = "CALL GetTutorDetailsById(?)";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor.getAll = (callback) => {
  // const sqlString = "SELECT * FROM tutor ";
  const sqlString = "CALL GetAllTutorsDetails()";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor.getAllTutorApproved = (callback) => {
  // const sqlString = "SELECT * FROM tutor ";
  const sqlString = "CALL GetTutorsApproved()";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

// tutor.insert = (tutor, callBack) => {
//   const sqlString = "INSERT INTO tutor SET ?";
//   db.query(sqlString, tutor, (err, res) => {
//     if (err) {
//       callBack(err);
//       return;
//     }
//     callBack({ id: res.insertId, ...tutor });
//   });
// };

// tutor.update = (tutor, id, callBack) => {
//   const sqlString = "UPDATE tutor SET ? WHERE id_tutor = ?";
//   db.query(sqlString, [tutor, id], (err, res) => {
//     if (err) {
//       callBack(err);
//       return;
//     }
//     callBack("cập nhật tutor id = " + id + " thành công");
//   });
// };

tutor.insert = (tutorData, callBack) => {
  const {
    id_user,
    gender,
    birthday,
    tuition,
    experience,
    achievement,
    method,
    address,
    fb,
    subjects,
    availability,
  } = tutorData;

  const sqlString = "CALL AddTutor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlString,
    [
      id_user,
      gender,
      birthday,
      tuition,
      experience,
      achievement,
      method,
      address,
      fb,
      JSON.stringify(subjects),
      JSON.stringify(availability),
    ],
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      // Stored procedure có thể trả về nhiều tập kết quả.
      // Tập đầu tiên thường rỗng hoặc chứa metadata.
      // Chúng ta quan tâm đến bất kỳ đầu ra cụ thể nào hoặc sự thành công.
      callBack({ message: "Thêm gia sư thành công." }); // Hoặc xử lý đầu ra cụ thể nếu cần
    }
  );
};

tutor.update = (tutor, id_user, callBack) => {
  const {
    img,
    full_name,
    email,
    phone,
    gender,
    birthday,
    tuition,
    experience,
    achievement,
    method,
    address,
    fb,
    subjects,
    availability,
  } = tutor;

  const sqlString = "CALL UpdateTutor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlString,
    [
      id_user,
      img,
      full_name,
      email,
      phone,
      gender,
      birthday,
      tuition,
      experience,
      achievement,
      method,
      address,
      fb,
      JSON.stringify(subjects),
      JSON.stringify(availability),
    ],
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      console.log('Kết quả từ db.query:', res);
      callBack("Cập nhật thông tin gia sư có id_user = " + id_user + " thành công.");
    }
  );
};

tutor.updateStatus = (id, status, callBack) => {
  const sqlString = "CALL UpdateTutorStatus(?,?)";
  db.query(sqlString, [id, status], (err, res) => {
    if (err) 
    {
      return callBack(err);
    }
    callBack(null, { message: `Cập nhật trạng thái gia sư id = ${id} thành công`, status: "OK" });
  })
};

tutor.delete = (id, callBack) => {
  db.query("DELETE FROM tutor WHERE id_tutor = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa tutor id = " + id + " thành công");
  });
};

tutor.getTutorId = (userId, callback) => {
  const sql = 'SELECT id_tutor FROM tutor WHERE id_user = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
        return callback(err);
    }
    if (results.length > 0) {
      callback(null, results[0].id_tutor);
    } else {
      callback(new Error("Không tìm thấy gia sư"), null);
    }
  });
};

module.exports = tutor;
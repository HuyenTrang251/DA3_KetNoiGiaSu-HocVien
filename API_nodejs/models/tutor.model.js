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
  const sqlString = "SELECT * FROM tutor WHERE id_tutor = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor.getAll = (callback) => {
  const sqlString = "SELECT * FROM tutor ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor.insert = (tutor, callBack) => {
  const sqlString = "INSERT INTO tutor SET ?";
  db.query(sqlString, tutor, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...tutor });
  });
};

tutor.update = (tutor, id, callBack) => {
  const sqlString = "UPDATE tutor SET ? WHERE id_tutor = ?";
  db.query(sqlString, [tutor, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật tutor id = " + id + " thành công");
  });
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

module.exports = tutor;

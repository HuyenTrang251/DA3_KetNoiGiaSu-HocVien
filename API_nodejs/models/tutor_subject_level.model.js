const db = require("../common/db");
const tutor_subject_level = (tutor_subject_level) => {
this.id_tutor = tutor_subject_level.id_tutor;
this.id_subject = tutor_subject_level.id_subject;
this.level = tutor_subject_level.level;
this.tuition = tutor_subject_level.tuition;
};
tutor_subject_level.getById = (id, callback) => {
  const sqlString = "SELECT * FROM tutor_subject_level WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor_subject_level.getAll = (callback) => {
  const sqlString = "SELECT * FROM tutor_subject_level ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

tutor_subject_level.insert = (tutor_subject_level, callBack) => {
  const sqlString = "INSERT INTO tutor_subject_level SET ?";
  db.query(sqlString, tutor_subject_level, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...tutor_subject_level });
  });
};

tutor_subject_level.update = (tutor_subject_level, id, callBack) => {
  const sqlString = "UPDATE tutor_subject_level SET ? WHERE id = ?";
  db.query(sqlString, [tutor_subject_level, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật tutor_subject_level id = " + id + " thành công");
  });
};

tutor_subject_level.delete = (id, callBack) => {
  db.query("DELETE FROM tutor_subject_level WHERE id = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa tutor_subject_level id = " + id + " thành công");
  });
};

module.exports = tutor_subject_level;

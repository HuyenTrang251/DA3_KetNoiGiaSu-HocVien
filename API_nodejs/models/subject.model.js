const db = require("../common/db");
const subject = (subject) => {
this.id_subject = subject.id_subject;
this.name = subject.name;
};
subject.getById = (id, callback) => {
  const sqlString = "SELECT * FROM subject WHERE id_subject = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

subject.getAll = (callback) => {
  const sqlString = "SELECT * FROM subject ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

subject.insert = (subject, callBack) => {
  const sqlString = "INSERT INTO subject SET ?";
  db.query(sqlString, subject, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...subject });
  });
};

subject.update = (subject, id, callBack) => {
  const sqlString = "UPDATE subject SET ? WHERE id_subject = ?";
  db.query(sqlString, [subject, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật subject id = " + id + " thành công");
  });
};

subject.delete = (id, callBack) => {
  db.query("DELETE FROM subject WHERE id_subject = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa subject id = " + id + " thành công");
  });
};

module.exports = subject;

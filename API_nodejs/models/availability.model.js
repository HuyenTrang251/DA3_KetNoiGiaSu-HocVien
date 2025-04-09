const db = require("../common/db");
const availability = (availability) => {
this.id_availability = availability.id_availability;
this.id_tutor = availability.id_tutor;
this.day_of_week = availability.day_of_week;
this.session = availability.session;
};
availability.getById = (id, callback) => {
  const sqlString = "SELECT * FROM availability WHERE id_availability = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

availability.getAll = (callback) => {
  const sqlString = "SELECT * FROM availability ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

availability.insert = (availability, callBack) => {
  const sqlString = "INSERT INTO availability SET ?";
  db.query(sqlString, availability, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...availability });
  });
};

availability.update = (availability, id, callBack) => {
  const sqlString = "UPDATE availability SET ? WHERE id_availability = ?";
  db.query(sqlString, [availability, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật availability id = " + id + " thành công");
  });
};

availability.delete = (id, callBack) => {
  db.query("DELETE FROM availability WHERE id_availability = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa availability id = " + id + " thành công");
  });
};

module.exports = availability;

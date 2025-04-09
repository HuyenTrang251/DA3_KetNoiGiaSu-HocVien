const db = require("../common/db");
const booking = (booking) => {
this.id_booking = booking.id_booking;
this.id_student = booking.id_student;
this.id_tutor = booking.id_tutor;
this.subject = booking.subject;
this.class = booking.class;
this.start_date = booking.start_date;
this.sessions_per_week = booking.sessions_per_week;
this.hours_per_session = booking.hours_per_session;
this.method = booking.method;
this.tuition = booking.tuition;
this.status = booking.status;
this.created_at = booking.created_at;
};
booking.getById = (id, callback) => {
  const sqlString = "SELECT * FROM booking WHERE id_booking = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

booking.getAll = (callback) => {
  const sqlString = "SELECT * FROM booking ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

booking.insert = (booking, callBack) => {
  const sqlString = "INSERT INTO booking SET ?";
  db.query(sqlString, booking, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...booking });
  });
};

booking.update = (booking, id, callBack) => {
  const sqlString = "UPDATE booking SET ? WHERE id_booking = ?";
  db.query(sqlString, [booking, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật booking id = " + id + " thành công");
  });
};

booking.delete = (id, callBack) => {
  db.query("DELETE FROM booking WHERE id_booking = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa booking id = " + id + " thành công");
  });
};

module.exports = booking;

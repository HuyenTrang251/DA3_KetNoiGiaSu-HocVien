const db = require("../common/db");
const review = (review) => {
this.id_review = review.id_review;
this.id_booking = review.id_booking;
this.reviewer_role = review.reviewer_role;
this.rating = review.rating;
this.comment = review.comment;
this.created_at = review.created_at;
};
review.getById = (id, callback) => {
  const sqlString = "SELECT * FROM review WHERE id_review = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

review.getAll = (callback) => {
  const sqlString = "SELECT * FROM review ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

review.insert = (review, callBack) => {
  const sqlString = "INSERT INTO review SET ?";
  db.query(sqlString, review, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...review });
  });
};

review.update = (review, id, callBack) => {
  const sqlString = "UPDATE review SET ? WHERE id_review = ?";
  db.query(sqlString, [review, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật review id = " + id + " thành công");
  });
};

review.delete = (id, callBack) => {
  db.query("DELETE FROM review WHERE id_review = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa review id = " + id + " thành công");
  });
};

module.exports = review;

const db = require("../common/db");
const user = (user) => {
this.id_user = user.id_user;
this.img = user.img;
this.full_name = user.full_name;
this.email = user.email;
this.phone = user.phone;
this.password = user.password;
this.role = user.role;
};
user.getById = (id, callback) => {
  const sqlString = "SELECT * FROM user WHERE id_user = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user.getAll = (callback) => {
  const sqlString = "SELECT * FROM user ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

user.insert = (user, callBack) => {
  const sqlString = "INSERT INTO user SET ?";
  db.query(sqlString, user, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...user });
  });
};

user.update = (user, callBack) => {
  const sqlString = "UPDATE user SET ? WHERE id_user = ?";
  db.query(sqlString, [user, user.id_user], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật user id = " + user.id_user + " thành công");
  });
};

user.delete = (id, callBack) => {
  db.query("DELETE FROM user WHERE id_user = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa user id = " + id + " thành công");
  });
};

module.exports = user;

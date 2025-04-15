const db = require("../common/db");
const bcrypt = require("bcrypt");
const saltRounds = 12;

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
  // const sqlString = "SELECT * FROM user WHERE id_user = ? ";
  // db.query(sqlString, id, (err, result) => {
  //   if (err) {
  //     return callback(err);
  //   }
  //   callback(result);
  // });

  db.query("CALL GetUserById(?)", id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]);
  })
};

user.getAll = (callback) => {
  // const sqlString = "SELECT * FROM user ";
  // db.query(sqlString, (err, result) => {
  //   if (err) {
  //     return callback(err);
  //   }
  //   callback(result);
  // });

  db.query("CALL GetAllUsers()", (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]);
  })
};

user.insert = (user, callBack) => {
  bcrypt.hash(user.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return callBack(err);
    }

    user.password = hashedPassword; // Thay thế mật khẩu thuần túy bằng mật khẩu băm
    // const sqlString = "INSERT INTO user SET ?";
    // db.query(sqlString, user, (err, res) => {
    //   if (err) {
    //     return callBack(err);
    //   }
    //   callBack({ id: res.insertId, ...user });
    // });

    db.query(
      "CALL InsertUser(?,?,?,?,?,?)",
      [user.img, user.full_name, user.email, user.phone, user.password, user.role],
      (err, res) => {
        if (err) {
          return callBack(err);
        }
        callBack({id: res[0][0].id, ...user });
      }
    )
  });
};

user.update = (user, callBack) => {
  // const sqlString = "UPDATE user SET ? WHERE id_user = ?";
  // db.query(sqlString, [user, user.id_user], (err, res) => {
  //   if (err) {
  //     callBack(err);
  //     return;
  //   }
  //   callBack("cập nhật user id = " + user.id_user + " thành công");
  // });

  db.query(
    "CALL UpdateUser(?,?,?,?,?,?",
    [user.id_user, user.img, user.full_name, user.email, user.phone, user.password],
    (err, res) => {
      if (err) {
        return callBack(err);
      }
      callBack("Cập nhật user id = "+ user.id_user +" thành công");
    }
  )
};

user.delete = (id, callBack) => {
  // db.query("DELETE FROM user WHERE id_user = ?", id, (err, res) => {
  //   if (err) {
  //     callBack(err);
  //     return;
  //   }
  //   callBack("xóa user id = " + id + " thành công");
  // });

  db.query("CALL DeleteUser(?)", id, (err, res) => {
    if (err) {
      return callBack(err);
    }
    callBack("Xoá user id = "+ id +" thành công");
  })
};

user.verifyPassword = (username, password, callback) => {
  db.query("CALL VerifyUserPassword(?)", username, (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results[0].length === 0){
      return callback(null, {success: false, message: "Người dùng không tồn tại"});
    }
    const hashedPasswordFromDB = results[0][0].password;
    const role = results[0][0].role;
    const userId = results[0][0].id_user;
    bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
      if (err) {
        return callback(err);
      }
      if (results) {
        return callback(null, {success: true, role: role, userId: userId});
      }
      else {
        return callback(null, {success: false, message: "Mật khẩu không đúng"});
      }
    });
  });
};

module.exports = user;

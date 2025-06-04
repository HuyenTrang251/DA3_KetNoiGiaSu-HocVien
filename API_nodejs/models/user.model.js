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
  bcrypt.hash(user.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return callBack(err);
    }

  const updatedUser = { ...user, password: hashedPassword };

  // Thực hiện câu lệnh UPDATE
  const sqlString = "UPDATE user SET ? WHERE id_user = ?";
  db.query(sqlString, [updatedUser, user.id_user], (err, res) => {
    if (err) {
      return callBack(err);
    }
    callBack("Cập nhật user id = " + user.id_user + " thành công");
  });
});
  
  //   db.query(
  //     "CALL UpdateUser(?,?,?,?,?,?",
  //     [user.id_user, user.img, user.full_name, user.email, user.phone, user.password],
  //     (err, res) => {
  //       if (err) {
  //         return callBack(err);
  //       }
  //       callBack("Cập nhật user id = "+ user.id_user +" thành công");
  //     }
  //   )
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

user.getUserLogined = (id, callback) => {
  const sqlString = 'SELECT id_user AS id, full_name AS name, img, role FROM user WHERE id_user = ?';
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]);
  })      
};

user.updatePassword = (id, password, callBack) => {
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => { 
    if (err) {
      return callBack(err); 
    }

    const sqlString = "CALL UpdateUserPassword(?,?)";
    db.query(sqlString, [id, hashedPassword], (err, res) => {
      if (err) {
        return callBack(err);
      }
      callBack(null, { message: `Cập nhật mật khẩu người dùng id = ${id} thành công`, status: "OK" });
    });
  });
};

user.verifyPassword = (email, password, callback) => { 
  db.query("CALL VerifyUserPassword(?)", email, (err, results) => { 
    if (err) {
      return callback(err);
    }
    if (results[0].length === 0) {
      return callback(null, { success: false, message: "Người dùng không tồn tại" });
    }
    const hashedPasswordFromDB = results[0][0].password;
    const role = results[0][0].role;
    const userId = results[0][0].id_user;
    const img = results[0][0].img;
    const name = results[0][0].full_name;
    bcrypt.compare(password, hashedPasswordFromDB, (err, result) => { 
      if (err) {
        return callback(err);
      }
      if (result) { 
        return callback(null, { success: true, role: role, userId: userId, img: img, name: name });
      } else {
        return callback(null, { success: false, message: "Mật khẩu không đúng" });
      }
    });
  });
};

module.exports = user;

const db = require("../common/db");
const response = (response) => {
this.id_response = response.id_response;
this.id_post = response.id_post;
this.id_tutor = response.id_tutor;
this.message = response.message;
this.created_at = response.created_at;
};
response.getById = (id, callback) => {
  const sqlString = "SELECT * FROM response WHERE id_response = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

response.getAll = (callback) => {
  const sqlString = "SELECT * FROM response ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

response.insert = (response, callBack) => {
  const sqlString = "INSERT INTO response SET ?";
  db.query(sqlString, response, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    console.log("Chèn thành công. Kết quả:", res);
    callBack({ id: res.insertId, ...response });
  });
};

response.update = (response, id, callBack) => {
  const sqlString = "UPDATE response SET ? WHERE id_response = ?";
  db.query(sqlString, [response, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật response id = " + id + " thành công");
  });
};

response.updateStatus = (id, status, callBack) => {
  const sqlString = "UPDATE response SET status = ? WHERE id_response = ?";
  db.query(sqlString, [status, id], (err, res) => {
    if (err) 
    {
      return callBack(err);
    }
    callBack(null, { message: `Cập nhật trạng thái phản hồi id = ${id} thành công`, status: "OK" });
  })
};

response.delete = (id, callBack) => {
  db.query("DELETE FROM response WHERE id_response = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa response id = " + id + " thành công");
  });
};

module.exports = response;

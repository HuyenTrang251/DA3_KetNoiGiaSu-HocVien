const db = require("../common/db");
const post = (post) => {
this.id_post = post.id_post;
this.id_student = post.id_student;
this.subject = post.subject;
this.class = post.class;
this.student_count = post.student_count;
this.hours_per_session = post.hours_per_session;
this.sessions_per_week = post.sessions_per_week;
this.audience = post.audience;
this.method = post.method;
this.tuition = post.tuition;
this.phone = post.phone;
this.gender = post.gender;du
this.address = post.address;
this.notes = post.notes;
this.status = post.status;
this.created_at = post.created_at;
};
post.getAll = (callback) => {
  const sqlString = "CALL GetAllPostsWithStudentInfo()";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

post.getAllPostsApproved = (callback) => {
  const sqlString = "CALL GetPostsApproved()";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

post.getPostByUserID = (id, callback) => {
  // const sqlString = "SELECT * FROM post ";
  db.query("CALL GetPostsByUserId(?)", id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result[0]);
  });
};

post.getAllPostsWithResponse = (callback) => {
  // const sqlString = "SELECT * FROM post ";
  db.query("CALL GetAllPostsWithStudentAndResponses()", (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

post.insert = (post, callBack) => {
  // console.log("Đối tượng post trước query:", post);
  const sqlString = "INSERT INTO post SET ?";
  db.query(sqlString, post, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...post });
  });
};

post.update = (post, id, callBack) => {
  const sqlString = "UPDATE post SET ? WHERE id_post = ?";
  db.query(sqlString, [post, id], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật post id = " + id + " thành công");
  });
};

post.updateStatus = (id, status, callBack) => {
  const sqlString = "CALL UpdatePostStatus(?,?)";
  db.query(sqlString, [id, status], (err, res) => {
    if (err) 
    {
      return callBack(err);
    }
    callBack(null, { message: `Cập nhật trạng thái bài đăng id = ${id} thành công`, status: "OK" });
  })
};

post.delete = (id, callBack) => {
  db.query("DELETE FROM post WHERE id_post = ?", id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa post id = " + id + " thành công");
  });
};

post.search = (province, district, subject, method, audience, callback) => {
  const sqlString = "CALL SearchPosts(?, ?, ?, ?, ?)";
  db.query(
    sqlString,
    [province, district, subject, method, audience],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(result);
    }
  );
};

module.exports = post;

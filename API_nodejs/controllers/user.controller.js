const User = require("../models/user.model");
var jwt = require('jsonwebtoken'); 

module.exports = {
  getAll: (req, res) => {
    User.getAll((result) => {
      res.send(result);
    });
  },

  getAllPostsApproved: (req, res) => {
    User.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const user = req.body;
    User.insert(user, (result) => {
      if (result.error) {
        return res.status(500).sent({message: "Lỗi khi thêm người dùng", error: result.error});
      }
      res.status(201).send({message: "Thêm thành công", user: {id: result.id, ...user} });
    });
  },

  update: (req, res) => {
    const user = req.body;
    User.update(user, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    User.delete(id, (result) => {
      res.send(result);
    });
  },

  login: (req, res) => {
    // const SECRET_KEY = process.env.SECRET_KEY;
    const {username, password} = req.body;
    User.verifyPassword(username, password, (err, result) => {
      if (err) {
        return res.status(500).send({message: "Lỗi máy chủ"});
      }
      if (result.success) {
        const token = jwt.sign(
          {userId: result.userId, role: result.role},
          "SECRET_KEY", {expiresIn: "1h"}
        );
        res.send({success: true, token: token, userdata: {role: result.role, id: result.userId, img: result.img, name: result.name }});
      }
      else {
        res.status(401).send ({ message: result.message});
      }
    });
  }
};


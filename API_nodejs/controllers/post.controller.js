const Post = require("../models/post.model");

module.exports = {
  // getAll: (req, res) => {
  //   Post.getAll((result) => {
  //     res.send(result);
  //   });
  // },

  getPostByUserID: (req, res) => {
    const id = req.params.id;
    Post.getPostByUserID(id, (result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Post.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const post = req.body;
    Post.insert(post, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const post = req.body;
    const id = req.params.id;
    Post.update(post, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Post.delete(id, (result) => {
      res.send(result);
    });
  }
};

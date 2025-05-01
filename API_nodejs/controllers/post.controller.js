const Post = require("../models/post.model");

module.exports = {
  getAll: (req, res) => {
    Post.getAll((result) => {
      res.send(result);
    });
  },

  getAllPostsApproved: (req, res) => {
    Post.getAllPostsApproved((result) => {
      res.send(result);
    });
  },

  getPostByUserID: (req, res) => {
    const id = req.params.id;
    Post.getPostByUserID(id, (result) => {
      res.send(result);
    });
  },

  getAllPostsWithResponse: (req, res) => {
    Post.getAllPostsWithResponse((result) => {
      res.send(result);
    });
  },

  // getById: (req, res) => {
  //   const id = req.params.id;
  //   Post.getById(id, (result) => {
  //     res.send(result);
  //   });
  // },

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

  updateStatus: (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    Post.updateStatus(id, status, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Post.delete(id, (result) => {
      res.send(result);
    });
  },

  search: (req, res) => {
    const province = req.query.province;
    const district = req.query.district;
    const subject = req.query.subject;
    const method = req.query.method;
    const audience = req.query.audience;

    Post.search(province, district, subject, method, audience, (result) => {
      res.send(result);
    });
  }
};

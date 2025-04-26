const Response = require("../models/response.model");
const Tutor = require("../models/tutor.model");

module.exports = {
  getAll: (req, res) => {
    Response.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Response.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const { id_post, message } = req.body;
    const userId = req.userId; // Lấy userId từ middleware xác thực
    console.log("Controller insert called with userId:", userId);
    console.log("Request body:", req.body); //

    Tutor.getTutorId(userId, (err, id_tutor) => {
        if (err) {
            return res.status(500).send({ message: "Lỗi máy chủ khi lấy id_tutor" });
        }
        if (!id_tutor) {
            return res.status(400).send({ message: "Không tìm thấy gia sư với userId này" });
        }

        // Bây giờ bạn đã có id_tutor, bạn có thể tạo response
        const newResponse = {
            id_post,
            id_tutor,
            message,
        };

        Response.insert(newResponse, (result) => { // Sử dụng model Response để tạo response
            if (result.error)
            {
                return res.status(500).send({ message: "Lỗi máy chủ khi tạo response" });
            }
            res.status(201).send({
                success: true,
                message: "Đề nghị dạy đã được gửi thành công",
                data: result,
            });
        });
    });
  },

  update: (req, res) => {
    const response = req.body;
    const id = req.params.id;
    Response.update(response, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Response.delete(id, (result) => {
      res.send(result);
    });
  }
};

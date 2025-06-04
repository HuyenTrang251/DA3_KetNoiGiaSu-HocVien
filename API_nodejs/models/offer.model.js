const db = require("../common/db"); 

const offer = (offer) => {
    this.id_offer = offer.id_offer;
    this.fee_receive = offer.fee_receive;
    this.support = offer.support;
};

offer.getAll = (callback) => {
    const sqlString = "SELECT * FROM offer ";
    db.query(sqlString, (err, result) => {
        if (err) {
        callback(err, null); 
        return;
        }
        callback(result); 
    });
},

offer.insert = (offerData, callback) => {
    const { id_offer, fee_receive, support } = offerData;

    const sqlString = "CALL InsertOffer(?, ?, ?)";
    db.query(
        sqlString,
        [id_offer, fee_receive, support],
        (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm offer:", err);
            callback(err, null); 
            return;
        }
        callback(null, { message: "Thêm lời đề nghị thành công." }); 
        }
    );
};

offer.update = (id, offer, callBack) => {
  const { fee_receive, support } = offer;
  const sqlString = "CALL UpdateOffer(?, ?, ?)"; 
  db.query(sqlString, [id, fee_receive, support], (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("cập nhật offer id = " + id + " thành công");
  });
};

module.exports = offer;

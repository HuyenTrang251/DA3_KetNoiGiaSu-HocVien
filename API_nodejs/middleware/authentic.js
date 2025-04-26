const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authentic = (requiredRoles = []) => { // Nhận một mảng các vai trò được yêu cầu
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        const decoded = jwt.verify(token, "SECRET_KEY");
        console.log("Decoded Token Payload:", decoded); 
        if(!decoded.userId) {
            return res.status(403).send({ message: 'Token không chứa userId' });
        }
        req.userId = decoded.userId; // Lưu userId vào req.userId
        req.userRole = decoded.role;
        console.log(req.userRole);
        // req.userName = decoded.name;
        // req.img = decoded.img;

        // Kiểm tra quyền truy cập
        if (requiredRoles.length > 0 && !requiredRoles.includes(req.userRole)) {
            return res.status(403).send({ message: "Không có quyền truy cập" });
        }

        next();
    };
};

module.exports = authentic;
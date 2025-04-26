-- Tạo cơ sở dữ liệu
CREATE DATABASE ketnoigiasu;
USE ketnoigiasu;

-- Bảng người dùng
CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('gia sư', 'học viên', 'admin') NOT NULL
);

-- Bảng gia sư
CREATE TABLE tutor (
    id_tutor INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    gender ENUM('nam', 'nữ'),
    birthday DATE,
    tuition DECIMAL(10,2),
    experience TEXT,
    achievement TEXT,
    method VARCHAR(50),
    address VARCHAR(255),
    fb VARCHAR(255),
    status ENUM('Chờ xác nhận', 'Xác nhận') DEFAULT 'Chờ xác nhận',
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

-- Bảng học viên
CREATE TABLE student (
    id_student INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    class VARCHAR(100),
    address VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

-- Bảng môn học
CREATE TABLE subject (
    id_subject INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE tutor_subject_level (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tutor INT NOT NULL,
    id_subject INT NOT NULL,
    level ENUM('Tiểu học', 'THCS', 'THPT', 'Luyện thi', 'Khác') NOT NULL,
    tuition DECIMAL(10,2) CHECK (tuition >= 0),
    UNIQUE (id_tutor, id_subject, level),
    FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor) ON DELETE CASCADE,
    FOREIGN KEY (id_subject) REFERENCES subject(id_subject) ON DELETE CASCADE
);

-- Bảng bài đăng tìm gia sư
CREATE TABLE post (
    id_post INT AUTO_INCREMENT PRIMARY KEY,
    id_student INT NOT NULL,
    subject VARCHAR(100),
    class VARCHAR(50),
    student_count INT,
    hours_per_session FLOAT,
    sessions_per_week INT,
    audience ENUM('giáo viên', 'sinh viên'),
    method ENUM('online', 'offline'),
    tuition DECIMAL(10,2),
    phone VARCHAR(20),
    gender ENUM('nam', 'nữ'),
    address VARCHAR(225),
    notes TEXT,
    status ENUM('chờ duyệt', 'đã duyệt', 'đã huỷ') DEFAULT 'chờ duyệt',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE
);

-- Bảng phản hồi của gia sư tới bài đăng
CREATE TABLE response (
    id_response INT AUTO_INCREMENT PRIMARY KEY,
    id_post INT NOT NULL,
    id_tutor INT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('chờ phản hồi', 'đồng ý', 'từ chối') DEFAULT 'chờ phản hồi',
    FOREIGN KEY (id_post) REFERENCES post(id_post) ON DELETE CASCADE,
    FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor) ON DELETE CASCADE,
    UNIQUE KEY unique_tutor_post (id_post, id_tutor)
);

-- Bảng đặt lịch học
CREATE TABLE booking (
    id_booking INT AUTO_INCREMENT PRIMARY KEY,
    id_student INT NOT NULL,
    id_tutor INT NOT NULL,
    subject VARCHAR(100),
    class VARCHAR(50),
    start_date DATE,
    sessions_per_week INT CHECK (sessions_per_week > 0),
    hours_per_session FLOAT CHECK (hours_per_session >= 1),
    method ENUM('online', 'offline'),
    tuition DECIMAL(10,2) CHECK (tuition >= 0),
    status ENUM('chờ duyệt', 'chờ phản hồi', 'chấp nhận', 'từ chối', 'đã huỷ') DEFAULT 'chờ duyệt',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE,
    FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor) ON DELETE CASCADE
);
-- Bảng lịch rảnh của gia sư
CREATE TABLE availability (
    id_availability INT AUTO_INCREMENT PRIMARY KEY,
    id_tutor INT NOT NULL,
    day_of_week ENUM('Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'),
    session ENUM('Sáng', 'Chiều', 'Tối') NOT NULL,
    FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor) ON DELETE CASCADE,
    UNIQUE (id_tutor, day_of_week, session)
);

-- Bảng đánh giá sau khóa học
CREATE TABLE review (
    id_review INT AUTO_INCREMENT PRIMARY KEY,
    id_booking INT NOT NULL,
    reviewer_role ENUM('học viên', 'gia sư') NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_booking) REFERENCES booking(id_booking) ON DELETE CASCADE
);

-- Thêm dữ liệu
INSERT INTO user (img, full_name, email, phone, password, role) VALUES
('', 'Đặng Thị Lan', 'lanle@gmail.com', '0966883645', '123', 'admin'),

('giasu1.webp', 'Nguyễn Thành Hà', 'hathanh@gmail.com', '0912345888', 'matkhau123', 'gia sư'),
('', 'Trần Văn Nam', 'namtran@gmail.com', '0987654321', 'password456', 'học viên'),
('', 'Lê Thị Huyền', 'huyenle@gmail.com', '0909090909', 'pass789', 'gia sư'),
('', 'Phạm Văn Hùng', 'hungpham@gmail.com', '0933221122', '123abc456', 'học viên'),
('', 'Võ Minh Quân', 'quanvo@gmail.com', '0911223344', 'quansu123', 'học viên'),
('', 'Bùi Thị Mai', 'maibui@gmail.com', '0977665544', 'bui456ma', 'gia sư'),
('', 'Ngô Văn Tú', 'tungo@gmail.com', '0944556677', 'ngotupass', 'gia sư'),
('', 'Hoàng Thị Hạnh', 'hanhhoang@gmail.com', '0988332211', 'hanh2025', 'học viên'),
('', 'Đỗ Văn Dũng', 'dungdo@gmail.com', '0900998877', 'dungpwd999', 'gia sư'),
('', 'Lý Thị Bích', 'bichly@gmail.com', '0922334455', 'lypass123', 'học viên'),
('', 'Trịnh Văn An', 'antrinh@gmail.com', '0933445566', 'trinhan2023', 'gia sư'),
('', 'Tạ Thị Kim', 'kimta@gmail.com', '0966778899', 'kimkim987', 'học viên'),
('', 'Phan Văn Khánh', 'khanhphan@gmail.com', '0911556677', 'phanpass', 'gia sư'),
('', 'Cao Thị Thu', 'thucao@gmail.com', '0900123456', 'thupass88', 'học viên');

INSERT INTO tutor (id_user, gender, birthday, tuition, experience, achievement, method, address, fb, status)
VALUES
(1, 'nam', '1985-02-20', 250000, 'Dạy toán cấp 3', 'Học sinh đạt giải cao trong các kỳ thi quốc gia', 'Phương pháp giảng dạy trực quan, dễ hiểu', 'Hà Nội', 'fb.com/teacherha', 'Xác nhận'),
(3, 'nữ', '1990-03-15', 300000, 'Dạy tiếng Anh giao tiếp', 'Nâng cao kỹ năng giao tiếp trong 3 tháng', 'Học theo các tình huống thực tế', 'Hà Nội', 'fb.com/teacherhuyen', 'Chờ xác nhận'),
(5, 'nữ', '1987-07-10', 350000, 'Giảng dạy văn học và lịch sử', 'Học sinh thi đỗ đại học', 'Giảng dạy qua các bài giảng phân tích sâu', 'Hà Nội', 'fb.com/teacherlan', 'Chờ xác nhận'),
(7, 'nam', '1992-08-21', 400000, 'Dạy guitar cơ bản', 'Học sinh có thể chơi các bản nhạc cơ bản sau 2 tháng', 'Giảng dạy qua các bài hát yêu thích', 'Hồ Chí Minh', 'fb.com/teacherquan', 'Xác nhận'),
(9, 'nam', '1989-05-25', 500000, 'Dạy lập trình web và ứng dụng', 'Giúp học sinh xây dựng các dự án thực tế', 'Giảng dạy qua dự án thực tế', 'Đà Nẵng', 'fb.com/teacherdung', 'Chờ xác nhận'),
(8, 'nữ', '1994-09-01', 280000, 'Giảng dạy Toán THPT', 'Giúp học sinh đạt điểm cao trong kỳ thi quốc gia', 'Học theo các bài tập giải quyết vấn đề', 'Hà Nội', 'fb.com/teachermain', 'Chờ xác nhận'),
(10, 'nữ', '1995-01-13', 320000, 'Dạy tiếng Anh IELTS', 'Học sinh đạt IELTS 7.0+', 'Phương pháp học giao tiếp và luyện thi IELTS', 'Hồ Chí Minh', 'fb.com/teacherkim', 'Xác nhận');

INSERT INTO student (id_user, class, address)
VALUES
(28, 'Lớp 12', 'Hà Nội'),
(2, 'Lớp 11A1', 'Hà Nội'),
(4, 'Lớp 10B2', 'Hồ Chí Minh'),
(6, 'Lớp 12C3', 'Hà Nội'),
(8, 'Lớp 11D4', 'Đà Nẵng'),
(10, 'Lớp 10A3', 'Hồ Chí Minh'),
(1, 'Lớp 12B2', 'Hà Nội'),
(3, 'Lớp 11A2', 'Hồ Chí Minh');

INSERT INTO subject (name)
VALUES
('Hoá'),
('Toán'),
('Văn'),
('Tiếng Anh'),
('Tiếng Trung'),
('Tiếng Hàn'),
('Tiếng Nhật'),
('Lý'),
('Sinh học'),
('Toán + Tiếng Việt'),
('Tin học'),
('Địa lý'),
('Lịch sử');

INSERT INTO tutor_subject_level (id_tutor, id_subject, level, tuition)
VALUES
(1, 1, 'THPT', 250000),
(2, 3, 'THPT', 300000),
(3, 2, 'THPT', 350000),
(5, 9, 'Khác', 500000),
(6, 7, 'THPT', 450000),
(7, 1, 'THCS', 280000),
(7, 3, 'Luyện thi', 320000);

INSERT INTO post (id_student, subject, class, student_count, hours_per_session, sessions_per_week, audience, method, tuition, phone, gender, address, notes, status)
VALUES
(10, 'Toán', 'Lớp 12', 1, 2, 2, 'sinh viên', 'online', 180000, '0927383686', 'nam', 'Hà Nội', 'Cần gia sư dạy Toán nâng cao', 'chờ duyệt'),
(10, 'Văn', 'Lớp 12', 1, 1.5, 3, 'giáo viên', 'offline', 180000, '0927383686', 'nam', 'Đông Anh, Hà Nội', 'Cần gia sư dạy Văn cơ bản', 'chờ duyệt'),
(6, 'Tiếng Anh', 'Lớp 12', 1, 2, 3, 'sinh viên', 'offline', 220000, '0911223344', 'nam', 'Hà Nội', 'Cần gia sư dạy IELTS', 'đã duyệt'),
(7, 'Hóa', 'Lớp 11', 1, 2, 2, 'sinh viên', 'offline', 250000, '0977665544', 'nữ', 'Đà Nẵng', 'Cần gia sư dạy nâng cao', 'chờ duyệt'),
(1, 'Sinh học', 'Lớp 10', 1, 2, 2, 'giáo viên', 'offline', 200000, '0900998877', 'nam', 'Hồ Chí Minh', 'Cần gia sư dạy lý thuyết', 'chờ duyệt'),
(1, 'Lý', 'Lớp 12', 1, 1.5, 3, 'giáo viên', 'offline', 220000, '0933221122', 'nữ', 'Hà Nội', 'Cần gia sư dạy lý thuyết', 'chờ duyệt'),
(3, 'Địa lý', 'Lớp 11', 1, 1, 2, 'sinh viên', 'offline', 150000, '0944556677', 'nam', 'Hồ Chí Minh', 'Cần gia sư dạy lịch sử', 'chờ duyệt');

INSERT INTO response (id_post, id_tutor, message)
VALUES
(19, 8, 'Chào bạn, tôi sẵn sàng giúp bạn ôn thi Toán nâng cao. Liên hệ với tôi để trao đổi thêm!'),
(9, 3, 'Chào bạn, tôi có thể giúp bạn nâng cao khả năng viết văn và hiểu rõ văn bản lớp 10. Liên hệ để biết thêm thông tin!'),
(10, 5, 'Chào bạn, tôi có kinh nghiệm giảng dạy tiếng Anh IELTS. Liên hệ với tôi để có lịch học chi tiết!'),
(11, 4, 'Chào bạn, tôi có thể giúp bạn nâng cao kỹ năng làm bài Hóa học. Hãy liên hệ tôi để thảo luận thêm!'),
(11, 2, 'Chào bạn, tôi là gia sư sinh học, rất mong được giúp bạn nâng cao kiến thức về môn học này.'),
(12, 2, 'Chào bạn, tôi có thể giúp bạn ôn luyện môn Lý. Liên hệ để lên lịch học!'),
(14, 3, 'Chào bạn, tôi đã giảng dạy môn Địa lý nhiều năm. Hãy liên hệ tôi để học thêm các phương pháp học hiệu quả!');

INSERT INTO booking (id_student, id_tutor, subject, class, start_date, sessions_per_week, hours_per_session, method, tuition, status)
VALUES 
(1, 2, 'Toán', 'Lớp 12', '2025-04-15', 3, 2.0, 'Offline', 200000, 'chờ duyệt'),
(2, 1, 'Lý', 'Lớp 10', '2025-04-16', 2, 1.5, 'Online', 150000, 'chờ phản hồi'),
(3, 5, 'Hóa', 'Lớp 11', '2025-04-17', 1, 2.0, 'Offline', 180000, 'chấp nhận'),
(4, 6, 'Văn', 'Lớp 9', '2025-04-18', 2, 2.5, 'Online', 120000, 'từ chối'),
(5, 3, 'Sinh học', 'Lớp 12', '2025-04-19', 3, 1.5, 'Offline', 220000, 'chờ duyệt'),
(6, 4, 'Tiếng Anh', 'Lớp 8', '2025-04-20', 2, 1.5, 'Offline', 250000, 'chờ phản hồi'),
(7, 2, 'Hóa', 'Lớp 12', '2025-04-21', 1, 2.0, 'Online', 200000, 'chấp nhận');

INSERT INTO availability (id_tutor, day_of_week, session)
VALUES 
(1, 'Thứ 2', 'Sáng'),
(1, 'Thứ 3', 'Chiều'),
(1, 'Thứ 5', 'Tối'),
(2, 'Thứ 4', 'Sáng'),
(2, 'Thứ 6', 'Chiều'),
(2, 'Thứ 7', 'Tối'),
(3, 'Thứ 2', 'Chiều'),
(3, 'Thứ 5', 'Sáng'),
(4, 'Thứ 3', 'Tối'),
(4, 'Thứ 6', 'Sáng');

INSERT INTO review (id_booking, reviewer_role, rating, comment)
VALUES 
(1, 'học viên', 5, 'Gia sư rất nhiệt tình, dạy dễ hiểu, giúp tôi cải thiện điểm số đáng kể.'),
(2, 'gia sư', 4, 'Học viên chăm chỉ, chỉ cần luyện thêm các bài tập về lý thuyết.'),
(3, 'học viên', 5, 'Giảng viên rất giỏi, dạy rất chi tiết và dễ hiểu.'),
(4, 'gia sư', 3, 'Học viên cần cố gắng hơn, thiếu kiên nhẫn trong việc học.'),
(5, 'học viên', 4, 'Gia sư khá tốt, có nhiều kinh nghiệm nhưng đôi khi hơi khó hiểu.'),
(6, 'gia sư', 5, 'Học viên rất chăm chỉ và có trách nhiệm với bài vở.'),
(7, 'học viên', 4, 'Gia sư rất thân thiện, tuy nhiên, cần thêm thời gian để giải thích rõ ràng hơn.');


-- Stored Procedures
-- User
DELIMITER //
CREATE PROCEDURE GetUserById(IN userId INT)
BEGIN
    SELECT * FROM user WHERE id_user = userId;
END //
DELIMITER ;

-- Lấy tất cả người dùng
DELIMITER //
CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM user;
END //
DELIMITER ;

-- Thêm người dùng mới
DELIMITER //
CREATE PROCEDURE InsertUser(
    IN p_img VARCHAR(255),
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_password VARCHAR(255),
    IN p_role ENUM('gia sư', 'học viên', 'admin')
)
BEGIN
    INSERT INTO user (img, full_name, email, phone, password, role)
    VALUES (p_img, p_full_name, p_email, p_phone, p_password, p_role);
    SELECT LAST_INSERT_ID() AS id;
END //
DELIMITER ;

-- Cập nhật thông tin người dùng
DELIMITER //
CREATE PROCEDURE UpdateUser(
    IN p_id_user INT,
    IN p_img VARCHAR(255),
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_password VARCHAR(255)
)
BEGIN
    UPDATE user
    SET img = p_img, full_name = p_full_name, email = p_email, phone = p_phone, password = p_password
    WHERE id_user = p_id_user;
END //
DELIMITER ;
DROP PROCEDURE IF EXISTS UpdateUser;

-- Xóa người dùng theo ID
DELIMITER //
CREATE PROCEDURE DeleteUser(IN p_id_user INT)
BEGIN
    DELETE FROM user WHERE id_user = p_id_user;
END //
DELIMITER ;

-- Xác thực mật khẩu
DELIMITER //
CREATE PROCEDURE VerifyUserPassword(IN p_email VARCHAR(100))
BEGIN
    SELECT id_user, img, full_name, password, role FROM user WHERE email = p_email;
END //
DELIMITER ;
CALL VerifyUserPassword('na@gmail.com');

-- TUTOR
-- 1. Thủ tục lấy ra họ tên và thông tin của gia sư trong bảng tutor
DELIMITER //
CREATE PROCEDURE GetTutorInfo()
BEGIN
    SELECT
        u.full_name,
        t.gender,
        t.birthday,
        t.tuition,
        t.experience,
        t.achievement,
        t.method,
        t.address,
        t.fb,
        t.status
    FROM
        tutor t
    JOIN
        user u ON t.id_user = u.id_user;
END //
DELIMITER ;

-- 2. Thủ tục thêm thông tin trong bảng tutor truyền id_user tương ứng
DELIMITER //
CREATE PROCEDURE AddTutorInfo(
    IN p_id_user INT,
    IN p_gender ENUM('nam', 'nữ'),
    IN p_birthday DATE,
    IN p_tuition DECIMAL(10,2),
    IN p_experience TEXT,
    IN p_achievement TEXT,
    IN p_method VARCHAR(50),
    IN p_address VARCHAR(255),
    IN p_fb VARCHAR(255)
)
BEGIN
    INSERT INTO tutor (id_user, gender, birthday, tuition, experience, achievement, method, address, fb)
    VALUES (p_id_user, p_gender, p_birthday, p_tuition, p_experience, p_achievement, p_method, p_address, p_fb);
END //
DELIMITER ;

-- 3. Thủ tục sửa thông tin tutor
DELIMITER //
CREATE PROCEDURE UpdateTutorInfo(
    IN p_id_tutor INT,
    IN p_gender ENUM('nam', 'nữ'),
    IN p_birthday DATE,
    IN p_tuition DECIMAL(10,2),
    IN p_experience TEXT,
    IN p_achievement TEXT,
    IN p_method VARCHAR(50),
    IN p_address VARCHAR(255),
    IN p_fb VARCHAR(255),
    IN p_status ENUM('Chờ xác nhận', 'Xác nhận')
)
BEGIN
    UPDATE tutor
    SET
        gender = p_gender,
        birthday = p_birthday,
        tuition = p_tuition,
        experience = p_experience,
        achievement = p_achievement,
        method = p_method,
        address = p_address,
        fb = p_fb,
        status = p_status
    WHERE
        id_tutor = p_id_tutor;
END //
DELIMITER ;

-- Thủ tục xoá thông tin tutor (thông qua id_tutor)
DELIMITER //
CREATE PROCEDURE DeleteTutorInfo(
    IN p_id_tutor INT
)
BEGIN
    DELETE FROM tutor
    WHERE id_tutor = p_id_tutor;
END //
DELIMITER ;

--
DELIMITER //
CREATE PROCEDURE DeleteTutorByUserId(
    IN p_id_user INT
)
BEGIN
    DELETE FROM tutor
    WHERE id_user = p_id_user;
END //
DELIMITER ;

-- Cách gọi các thủ tục:

-- 1. Lấy thông tin gia sư:
-- CALL GetTutorInfo();

-- 2. Thêm thông tin gia sư (ví dụ với id_user = 5):
-- CALL AddTutorInfo(5, 'nam', '1990-05-15', 150000, '5 năm kinh nghiệm dạy kèm toán', 'Giải nhất kỳ thi học sinh giỏi cấp tỉnh', 'Online và Offline', 'Hà Nội', 'facebook.com/johndoe');

-- 3. Sửa thông tin gia sư (ví dụ sửa thông tin gia sư có id_tutor = 2):
-- CALL UpdateTutorInfo(2, 'nữ', '1992-08-20', 180000, '3 năm kinh nghiệm dạy tiếng Anh', 'IELTS 7.5', 'Online', 'TP.HCM', 'facebook.com/janejoe', 'Xác nhận');

-- 4. Xoá thông tin gia sư (ví dụ xoá gia sư có id_tutor = 3):
-- CALL DeleteTutorInfo(3);

-- 5. Xoá thông tin gia sư theo id_user (ví dụ xoá gia sư có id_user = 6):
-- CALL DeleteTutorByUserId(6);

-- Post
DELIMITER //
CREATE PROCEDURE GetPostsByUserId(
    IN _id_user VARCHAR(100)
)
BEGIN
    SELECT
        p.id_post,
        p.id_student,
        p.subject,
        p.class,
        p.student_count,
        p.hours_per_session,
        p.sessions_per_week,
        p.audience,
        p.method,
        p.tuition,
        p.phone,
        p.gender,
        p.address,
        p.notes,
        p.status,
        p.created_at,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id_response', r.id_response,
                'tutor_name', u2.full_name,  -- Lấy tên của tutor từ bảng user
                'message', r.message,
                'created_at', r.created_at
            )
        ) AS responses
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    LEFT JOIN 
        response r ON p.id_post = r.id_post  -- Join với bảng response
    LEFT JOIN
        tutor t ON r.id_tutor = t.id_tutor  -- Join với bảng tutor để lấy id_user của tutor
    LEFT JOIN
        user u2 ON t.id_user = u2.id_user -- Join với bảng user để lấy tên tutor
    WHERE
        u.id_user = _id_user
    GROUP BY p.id_post, p.id_student, p.subject, p.class, p.student_count,  -- Group by để gom các response
             p.hours_per_session, p.sessions_per_week, p.audience, p.method,
             p.tuition, p.phone, p.gender, p.address, p.notes, p.status, p.created_at;
END //
DELIMITER ;
CALL GetPostsByUserId('28');

-- DELIMITER //
-- CREATE PROCEDURE GetPostsByUserId(
--     IN _id_user VARCHAR(100)
-- )
-- BEGIN
--     SELECT
--         p.id_post,
--         p.id_student,
--         p.subject,
--         p.class,
--         p.student_count,
--         p.hours_per_session,
--         p.sessions_per_week,
--         p.audience,
--         p.method,
--         p.tuition,
--         p.phone,
--         p.gender,
--         p.address,
--         p.notes,
--         p.status,
--         p.created_at
--     FROM
--         post p
--     INNER JOIN
--         student s ON p.id_student = s.id_student
--     INNER JOIN
--         user u ON s.id_user = u.id_user
--     WHERE
--         u.id_user = _id_user;
-- END //
-- DELIMITER ;

-- thêm bài đăng
DELIMITER //
CREATE PROCEDURE AddPost(
    IN in_id_student INT,
    IN in_subject VARCHAR(100),
    IN in_class VARCHAR(50),
    IN in_student_count INT,
    IN in_hours_per_session FLOAT,
    IN in_sessions_per_week INT,
    IN in_audience ENUM('giáo viên', 'sinh viên'),
    IN in_method ENUM('online', 'offline'),
    IN in_tuition DECIMAL(10,2),
    IN in_phone VARCHAR(20),
    IN in_gender ENUM('nam', 'nữ'),
    IN in_address VARCHAR(225),
    IN in_notes TEXT
)
BEGIN
    INSERT INTO post (
        id_student,
        subject,
        class,
        student_count,
        hours_per_session,
        sessions_per_week,
        audience,
        method,
        tuition,
        phone,
        gender,
        address,
        notes
    ) VALUES (
        in_id_student,
        in_subject,
        in_class,
        in_student_count,
        in_hours_per_session,
        in_sessions_per_week,
        in_audience,
        in_method,
        in_tuition,
        in_phone,
        in_gender,
        in_address,
        in_notes
    );
END //
DELIMITER ;

-- sửa bài đăng
DELIMITER //
CREATE PROCEDURE UpdatePost(
    IN in_id_post INT,
    IN in_subject VARCHAR(100),
    IN in_class VARCHAR(50),
    IN in_student_count INT,
    IN in_hours_per_session FLOAT,
    IN in_sessions_per_week INT,
    IN in_audience ENUM('giáo viên', 'sinh viên'),
    IN in_method ENUM('online', 'offline'),
    IN in_tuition DECIMAL(10,2),
    IN in_phone VARCHAR(20),
    IN in_gender ENUM('nam', 'nữ'),
    IN in_address VARCHAR(225),
    IN in_notes TEXT,
    IN in_status ENUM('chờ duyệt', 'đã duyệt', 'đã huỷ')
)
BEGIN
    UPDATE post
    SET
        subject = in_subject,
        class = in_class,
        student_count = in_student_count,
        hours_per_session = in_hours_per_session,
        sessions_per_week = in_sessions_per_week,
        audience = in_audience,
        method = in_method,
        tuition = in_tuition,
        phone = in_phone,
        gender = in_gender,
        address = in_address,
        notes = in_notes,
        status = in_status,
        created_at = created_at -- Giữ nguyên thời gian tạo
    WHERE
        id_post = in_id_post;
END //
DELIMITER ;

-- xoá bài đăng
DELIMITER //
CREATE PROCEDURE DeletePost(
    IN in_id_post INT
)
BEGIN
    DELETE FROM post
    WHERE id_post = in_id_post;
END //
DELIMITER ;

-- lấy tất bài đăng kèm thông tin học viên
DELIMITER //
CREATE PROCEDURE GetAllPostsWithStudentInfo()
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name,
        u.email AS student_email,
        u.phone AS student_phone
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user;
END //
DELIMITER ;

-- cập nhật trạng thái bài đăng
DELIMITER //
CREATE PROCEDURE UpdatePostStatus(
    IN in_id_post INT,
    IN in_new_status ENUM('chờ duyệt', 'đã duyệt', 'đã huỷ')
)
BEGIN
    UPDATE post
    SET
        status = in_new_status
    WHERE
        id_post = in_id_post;
END //
DELIMITER ;

-- lấy tất bài đăng có trạng thái đã duyệt
DELIMITER //
CREATE PROCEDURE GetPostsApproved()
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        p.status = 'đã duyệt';
END //
DELIMITER ;

-- tìm kiếm bài đăng theo địa chỉ
DELIMITER //
CREATE PROCEDURE SearchPostsByLocation(
    IN in_province VARCHAR(100),
    IN in_district VARCHAR(100)
)
BEGIN
    SELECT
        p.id_post,
        p.id_student,
        p.subject,
        p.class,
        p.student_count,
        p.hours_per_session,
        p.sessions_per_week,
        p.audience,
        p.method,
        p.tuition,
        p.phone,
        p.gender,
        p.address,
        p.notes,
        p.status,
        p.created_at,
        u.full_name AS student_name,
        u.email AS student_email,
        u.phone AS student_phone
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        (in_province IS NOT NULL AND in_province <> '' AND p.address LIKE CONCAT('%', in_province, '%'))
        AND (in_district IS NULL OR in_district = '' OR p.address LIKE CONCAT('%', in_district, '%'));
END //
DELIMITER ;
CALL SearchPostsByLocation('Hà Nội', '');

-- tìm kiếm bài đăng theo môn học
DELIMITER //
CREATE PROCEDURE SearchPostsBySubject(
    IN in_subject VARCHAR(100)
)
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name
        
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        p.subject LIKE CONCAT('%', in_subject, '%');
END //
DELIMITER ;

-- tìm kiếm bài đăng theo đối tượng dạy
DELIMITER //
CREATE PROCEDURE SearchPostsByAudience(
    IN in_audience ENUM('giáo viên', 'sinh viên')
)
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name,
        u.email AS student_email
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        p.audience = in_audience;
END //
DELIMITER ;

-- tìm bài đăng theo hình thức dạy
DELIMITER //
CREATE PROCEDURE SearchPostsByMethod(
    IN in_method ENUM('online', 'offline')
)
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name,
        u.email AS student_email
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        p.method = in_method;
END //
DELIMITER ;

-- tìm kiếm bài đăng theo 4 tiêu chí
DELIMITER //
CREATE PROCEDURE SearchPosts(
    IN in_province VARCHAR(100),
    IN in_district VARCHAR(100),
    IN in_subject VARCHAR(100),
    IN in_method ENUM('online', 'offline'),
    IN in_audience ENUM('giáo viên', 'sinh viên')
)
BEGIN
    SELECT
        p.*,
        u.full_name AS student_name,
        u.email AS student_email,
        u.phone AS student_phone
    FROM
        post p
    INNER JOIN
        student s ON p.id_student = s.id_student
    INNER JOIN
        user u ON s.id_user = u.id_user
    WHERE
        (in_province IS NULL OR in_province = '' OR p.address LIKE CONCAT('%', in_province, '%'))
        AND (in_district IS NULL OR in_district = '' OR p.address LIKE CONCAT('%', in_district, '%'))
        AND (in_subject IS NULL OR in_subject = '' OR p.subject LIKE CONCAT('%', in_subject, '%'))
        AND (in_method IS NULL OR p.method = in_method)
        AND (in_audience IS NULL OR p.audience = in_audience);
END //
DELIMITER ;
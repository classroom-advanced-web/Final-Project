DROP DATABASE IF EXISTS db_classroom;
CREATE DATABASE db_classroom;
USE db_classroom;

DROP TABLE IF EXISTS otps;
CREATE TABLE otps (
    otp_id CHAR(50) NOT NULL PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    expired_date TIMESTAMP,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW()
);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id CHAR(50) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    is_activated BOOLEAN DEFAULT 0,
    student_id VARCHAR(255) UNIQUE,
    is_admin BOOLEAN DEFAULT 0,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    CHECK(gender IN ('MALE', 'FEMALE', 'UNKNOW'))
);

DROP TABLE IF EXISTS classrooms;
CREATE TABLE classrooms (
    class_id CHAR(50) NOT NULL PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    class_code VARCHAR(255) NOT NULL UNIQUE,
    class_description VARCHAR(255),
    class_subject VARCHAR(255),
    class_room VARCHAR(255),
    class_image_url VARCHAR(255) NOT NULL,
    class_section VARCHAR(255),
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    role_id CHAR(50) NOT NULL PRIMARY KEY,
    role_code BIGINT NOT NULL UNIQUE,
    role_name VARCHAR(255) NOT NULL UNIQUE,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    INDEX role_code_index (role_code ASC)
);

DROP TABLE IF EXISTS invitation_urls;
CREATE TABLE invitation_urls (
    invitation_url_id CHAR(50) NOT NULL PRIMARY KEY,
    access_token VARCHAR(255),
    class_id CHAR(50),
    role_id CHAR(50),
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (class_id) REFERENCES classrooms (class_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

DROP TABLE IF EXISTS users_in_classroom;
CREATE TABLE users_in_classroom (
    class_user_id CHAR(50) NOT NULL PRIMARY KEY,
    user_name VARCHAR(255),
    class_id CHAR(50) NOT NULL,
    user_id CHAR(50) NOT NULL,
    role_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (class_id) REFERENCES classrooms (class_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    UNIQUE KEY unique_class_user (class_id, user_id)
);

DROP TABLE IF EXISTS grade_composition;
CREATE TABLE grade_composition (
    grade_composition_id CHAR(50) NOT NULL PRIMARY KEY,
    grade_composition_name VARCHAR(255) NOT NULL,
    grade_composition_scale DOUBLE NOT NULL,
    grade_composition_weight INT NOT NULL,
    grade_composition_is_final BOOLEAN NOT NULL DEFAULT 0,
    class_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (class_id) REFERENCES classrooms (class_id)
);

DROP TABLE IF EXISTS non_users_in_classroom;
CREATE TABLE non_users_in_classroom (
    non_user_id CHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    class_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    UNIQUE KEY unique_non_user (class_id, student_id),
    FOREIGN KEY (class_id) REFERENCES classrooms (class_id)
);

DROP TABLE IF EXISTS grades;
CREATE TABLE grades (
    grade_id CHAR(50) NOT NULL PRIMARY KEY,
    grade_value DOUBLE NOT NULL,
    student_id VARCHAR(255),
    grade_composition_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (grade_composition_id) REFERENCES grade_composition (grade_composition_id)
);

DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
    notification_id CHAR(50) NOT NULL PRIMARY KEY,
    notification_content VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    is_read BOOLEAN DEFAULT 0,
    notification_sender_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (notification_sender_id) REFERENCES non_users_in_classroom (non_user_id)
);

DROP TABLE IF EXISTS received_notifications;
CREATE TABLE received_notifications (
    received_notification_id CHAR(50) NOT NULL PRIMARY KEY,
    notification_id CHAR(50) NOT NULL,
    receiver_id CHAR(50) NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (notification_id) REFERENCES notifications (notification_id),
    FOREIGN KEY (receiver_id) REFERENCES users (user_id)
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id CHAR(50) NOT NULL PRIMARY KEY,
    content VARCHAR(255),
    is_shut_down BOOLEAN DEFAULT 0,
    grade_id CHAR(50) NOT NULL,
    user_id CHAR(50) NOT NULL,
    reply_to_id CHAR(50),
    revoked BOOLEAN NOT NULL DEFAULT 0,
    created_date TIMESTAMP DEFAULT NOW(),
    updated_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (grade_id) REFERENCES grades (grade_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (reply_to_id) REFERENCES comments (comment_id)
);


-- Inserting Owner role
INSERT INTO roles (role_id, role_name, role_code) VALUES (UUID() , 'Owner', 1);

-- Inserting Teacher role
INSERT INTO roles (role_id, role_name, role_code) VALUES (UUID(), 'Teacher', 2);

-- Inserting Student role
INSERT INTO roles (role_id, role_name, role_code) VALUES (UUID(), 'Student', 3);








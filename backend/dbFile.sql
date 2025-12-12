USE lifeline_addis;

drop Table staff;
show tables;



CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(10) unique,
  name VARCHAR(100),
  age INT,
  email VARCHAR(100) UNIQUE,
  address VARCHAR(255),
  password VARCHAR(255),
  role ENUM('admin','staff','patient')
);

CREATE TABLE Patient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name varchar(100),
  user_id varchar(10) unique,
  currentCondition VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(10) unique,
  profession VARCHAR(20),
  salary DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE 
);




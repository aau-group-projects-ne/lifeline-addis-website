USE lifeline_addis;
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(10) unique,
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
  username varchar(10) unique,
  currentCondition VARCHAR(255),
  FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE Staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username varchar(10) unique,
  profession VARCHAR(20),
  salary DECIMAL(10,2),
  FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE 
);




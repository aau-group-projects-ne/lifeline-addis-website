USE lifeline_addis;

drop Table user;
show tables;



CREATE TABLE Person (	
	fname varchar(20), 
    lname varchar(20), 
    userId varchar(10) primary key unique,
    email varchar(20) unique,
    phone varchar(20),
    address varchar(20),
    role enum("patient", "doctor", "nurse", "admin"),
    password varchar(20),  
);

CREATE TABLE Patient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId varchar(10) unique,
  height float,
  weight float,
  DateOfBirth date,
  MedicalTistory longtext,
  bloodType enum("A+","A-","B+","B-","O+","O-","AB+","AB-"),
  age int,
  FOREIGN KEY (userId) REFERENCES Person(userId) ON DELETE CASCADE
);

CREATE TABLE Doctor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId varchar(10) unique,
  specialization VARCHAR(20),
  salary DECIMAL(10,2),
  activeHours time,
  FOREIGN KEY (userId) REFERENCES Person(userId) ON DELETE CASCADE 
);

CREATE TABLE Nurse (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId varchar(10) unique,
  specialization VARCHAR(20),
  salary DECIMAL(10,2),
  activeHours time,
  FOREIGN KEY (userId) REFERENCES Person(userId) ON DELETE CASCADE 
);

CREATE TABLE medicalRecords(
	id int primary key,
    createAt datetime,
    details longtext,
    doctorId varchar(20),
    patientId varchar(20),
    FOREIGN KEY (patientId) REFERENCES Patient(userId) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES Doctor(userId) ON DELETE CASCADE
);

CREATE TABLE Assigns(
	doctorId varchar(20),
	patientId varchar(20),
	id int primary key,
	nurseId varchar(20),
	FOREIGN KEY (doctorId) REFERENCES Doctor(userId) ON DELETE CASCADE,
	FOREIGN KEY (nurseId) REFERENCES Nurse(userId) ON DELETE CASCADE,
	FOREIGN KEY (patientId) REFERENCES Patient(userId) ON DELETE CASCADE
);







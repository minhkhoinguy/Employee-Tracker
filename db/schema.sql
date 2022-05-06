DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee(
id INT UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
INDEX roleIndex (role_id),
CONSTRAINT rolefk FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
INDEX managerIndex (manager_id),
CONSTRAINT managerfk FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

desc department;
desc role;
desc employee;
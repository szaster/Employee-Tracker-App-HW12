
-- DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;


CREATE TABLE department(
Department_id INT(20) auto_increment NOT NULL,
Name VARCHAR(30) NOT NULL,
PRIMARY KEY(Department_id)
);

CREATE TABLE role(
Role_id INT(20) auto_increment NOT NULL,
title VARCHAR(30),
salary DECIMAL(20,2),
department_id INT NOT NULL,
PRIMARY KEY (Role_id),
FOREIGN KEY (department_id) REFERENCES department(Department_id)
);

CREATE TABLE employee(
PersonID INT(20) auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT(20) NOT NULL,
manager_id INT(20) NULL,
PRIMARY KEY (PersonID),
FOREIGN KEY (role_id) REFERENCES role(Role_id),
FOREIGN KEY (manager_id) REFERENCES employee(PersonID)
);





-- Insert a set of records.
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");

USE employees;

-- ========== Populating department table ============ 

INSERT INTO department (department) VALUES ("IT");
INSERT INTO department (department) VALUES ("Financial");
INSERT INTO department (department) VALUES ("Human resources");
INSERT INTO department (department) VALUES ("Quality assurance");
INSERT INTO department (department) VALUES ("Marketing and sales");
INSERT INTO department (department) VALUES ("Research and development");

-- ========== Populating role table ============ 

INSERT INTO role (title, salary, department_id) VALUES ("Junior Software developer", 75000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software developer", 125000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lead accountant", 90000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Hiring manager", 55000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Quality assurance engineer", 120000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Marketing director", 120000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Marketing and sales associate", 55000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Data scientist", 140000.00, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Research lead", 50000.00, 6);

-- ========== Populating employee table ============ 
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Zoe", "Smith", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("William", "Lee", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Alexander", "Williams", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Smith", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kathy", "Bellows", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Margaret", "Brown", 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Hannah", "Nguyen", 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jacob", "White", 8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Peter", "Ross", 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kevin", "Delao", 10);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Maria", "Green", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Esteban", "Rodrigues", 1);


-- =============== Adding managers to employee table ================
UPDATE employee SET manager_id = 4 WHERE person_id = 1;
UPDATE employee SET manager_id = 6 WHERE person_id = 2;
UPDATE employee SET manager_id = null WHERE person_id = 3;
UPDATE employee SET manager_id = null WHERE person_id = 4;
UPDATE employee SET manager_id = null WHERE person_id = 5;
UPDATE employee SET manager_id = 7 WHERE person_id = 6;
UPDATE employee SET manager_id = null WHERE person_id = 7;
UPDATE employee SET manager_id = 7 WHERE person_id = 8;
UPDATE employee SET manager_id = null WHERE person_id = 9;
UPDATE employee SET manager_id = 9 WHERE person_id = 10;
UPDATE employee SET manager_id = 6 WHERE person_id = 11;
UPDATE employee SET manager_id = 6 WHERE person_id = 12;

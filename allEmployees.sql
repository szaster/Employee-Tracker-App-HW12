-- SELECT 
-- person_id as id, first_name, last_name, title
-- FROM employee join role on (employee.role_id = role.role_id)
--  join department on (role.deparment_id = department.department_id)

SELECT employee.person_id, employee.first_name, employee.last_name, role.title, employee.manager_id, department.Department, role.salary
FROM employee
JOIN role on employee.role_id = role.Role_id
JOIN department on role.department_id = department.Department_id;
-- JOIN employee on employee.manager_id = employee.first_name

SELECT*FROM employee 
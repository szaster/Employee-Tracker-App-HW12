
SELECT employee.person_id, employee.first_name, employee.last_name, role.title, employee.manager_id, department.Department, role.salary
FROM employee
JOIN role on employee.role_id = role.Role_id
JOIN department on role.department_id = department.Department_id;

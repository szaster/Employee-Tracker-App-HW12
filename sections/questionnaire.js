const inquirer = require("inquirer");

function mustNotBeEmpty(str, fieldName) {
  if (str === "") {
    return `${fieldName} cannot be empty.`;
  }
  return true;
}

function welcomeScreen() {
  return inquirer.prompt([
    {
      type: "list",
      name: "welcome",
      message:
        "Welcome! This application allows to view, add, update and edit departments, roles, employees. Press continue to proceed?",
      choices: ["Continue", "Exit"],
    },
  ]);
}

function handleExit(data) {
  if (data.welcome === "Exit") {
    process.exit(0);
  }
}

const choices = {
  viewAll: "View All Employees, Departments, Title, Salary, Manager",
  addDepartment: "Add Department",
  addRole: "Add Role",
  addEmployee: "Add Employee",
  viewAllByDepartment: "View All Employees By Department",
  viewAllDepartments: "View All Departments",
  viewAllRoles: "View All Roles",
  // updateEmployee: "Update Employee Role",

  // updateEmployeeManager: "Update Employee Manager",
  // removeEmployee: "Remove Employee",
  // removeDepartment: "Remove Department",
  // removeRole: "Remove Role",
  // viewSalariesByDepartment: "View Department Salaries",
  exit: "Exit",
};

function toAllEmployeeRow(row, allRows) {
  const manager = row.manager_id;
  return {};
}

function formatManager(row) {
  return `${row.first_name} ${row.last_name}`;
}

function extractManagerForId(rows, manager_id) {
  const maybeManager = rows.filter((row) => row.id === manager_id);
  if (maybeManager.length > 0) {
    return formatManager(maybeManager[0]);
  } else {
    return "---";
  }
}

function formatRow(rows, row) {
  return {
    Id: row.id,
    "First Name": row.first_name,
    "Last Name": row.last_name,
    Title: row.title,
    Department: row.Department,
    Salary: row.salary,
    Manager: extractManagerForId(rows, row.manager_id),
  };
}

function formatRowEmployeeSearch(rows, row) {
  return {
    "First Name": row.first_name,
    "Last Name": row.last_name,
    Title: row.title,
    Department: row.Department,
  };
}

function viewDepartments(connection) {
  const queryString =
    "SELECT department_id as id, department as name FROM department order by department_id";
  connection.query(queryString, (error, result) => {
    console.table(result);
    return runSearch(connection);
  });
}

function viewRoles(connection) {
  const queryString =
    "SELECT Role_id as id, title as Position FROM role order by Role_id";
  connection.query(queryString, (error, result) => {
    console.table(result);
    return runSearch(connection);
  });
}

function employeeSearch(connection) {
  const query =
    "SELECT employee.person_id as id, employee.first_name, employee.last_name, role.title, department.Department, role.salary, manager_id FROM employee JOIN role on employee.role_id = role.Role_id JOIN department on role.department_id = department.Department_id order by person_id";
  return connection.query(query, (err, rows) => {
    const table = rows.map((row) => formatRow(rows, row));
    console.table(table);
    runSearch(connection);
  });
}

function addDepartment(connection) {
  const questions = {
    name: "newDepartment",
    type: "input",
    message: "Type a name of a department you want to add:",
  };
  return inquirer.prompt(questions).then(function (answer) {
    const query = `INSERT INTO department (department) VALUES ("${answer.newDepartment}")`;
    return connection.query(query, (err, rows) => {
      return viewDepartments(connection);
    });
  });
}

function addRole(connection) {
  const queryString =
    "SELECT department_id as id, department as name FROM department order by department_id";
  return connection.query(queryString, (error, result) => {
    const departments = result.map((department) => department.name);
    const questions = [
      {
        name: "newRole",
        type: "input",
        message: "Type a job position you want to add:",
      },
      {
        name: "department",
        type: "rawlist",
        choices: departments,
        message:
          "Type department name. If department does not exist, you must first create it.",
      },
      {
        name: "salary",
        type: "input",
        message: "Type a salary for the new role",
      },
    ];
    return inquirer.prompt(questions).then(function (answer) {
      const department_id = result.filter(
        (item_in_results) => item_in_results.name === answer.department
      )[0].id;
      const query = `INSERT INTO role (title, department_id, salary) VALUES ("${answer.newRole}", ${department_id}, ${answer.salary})`;
      return connection.query(query, (err, rows) => {
        console.log(err);
        return viewRoles(connection);
      });
    });
  });
}

//=============================================================

function addEmployee(connection) {
  const queryString =
    "SELECT employee.person_id as id, " +
    "employee.first_name, employee.last_name, role.title, role.role_id, " +
    "employee.manager_id as m_id, department.Department as dep_name, " +
    "role.salary FROM employee JOIN role on employee.role_id = role.Role_id " +
    "JOIN department on role.department_id = department.Department_id order by id";
  // "SELECT*FROM employee"
  connection.query(queryString, (error, result) => {
    const titles = result.map((item) => item.title);
    const names = result.map((item) => formatManager(item));
    const departments = [
      ...new Set(result.map((department) => department.dep_name)),
    ];
    const questions = [
      {
        name: "new_first_name",
        type: "input",
        message: "Type a first name of a new employee:",
      },
      {
        name: "new_last_name",
        type: "input",
        message: "Type a last name of a new employee:",
      },
      {
        name: "jobTitle",
        type: "rawlist",
        choices: titles,
        message:
          "Choose a job title. If title does not exist, you must first create it.",
      },
      {
        name: "manager_name",
        type: "rawlist",
        choices: names,
        message: "Choose new employee manager's name",
      },
    ];
    return inquirer.prompt(questions).then(function (answer) {
      const role_id = result.filter(
        (item_in_results) => item_in_results.title === answer.jobTitle
      )[0].role_id;
      const manager_id = result.filter(
        (item_in_results) =>
          formatManager(item_in_results) === answer.manager_name
      )[0].id;
      const prefix =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ";
      const query = `${prefix} ("${answer.new_first_name}", "${answer.new_last_name}", ${role_id}, ${manager_id})`;
      connection.query(query, (err, rows) => {
        return employeeSearch(connection);
      });
    });
  });
}
//===============================================

function employeesByDepartment(connection) {
  const query =
    "SELECT employee.person_id as id, employee.first_name, employee.last_name, role.title, department.Department FROM employee JOIN role on employee.role_id = role.Role_id JOIN department on role.department_id = department.Department_id";
  return connection.query(query, (err, rows) => {
    const table = rows.map((row) => formatRowEmployeeSearch(rows, row));
    console.table(table);
    runSearch(connection);
  });
}

function runSearch(connection) {
  return inquirer
    .prompt({
      type: "rawlist",
      name: "prompts",
      message: "What would you like to do?",
      choices: Object.values(choices),
    })
    .then(function (answer) {
      switch (answer.prompts) {
        case choices.viewAll:
          employeeSearch(connection);
          break;
        case choices.addDepartment:
          addDepartment(connection);
          break;
        case choices.addRole:
          addRole(connection);
          break;
        case choices.addEmployee:
          addEmployee(connection);
          break;
        case choices.viewAllByDepartment:
          employeesByDepartment(connection);
          break;
        case choices.viewAllDepartments:
          viewDepartments(connection);
          break;
        case choices.viewAllRoles:
          viewRoles(connection);
          break;
        // case choices.updateEmployee:
        //   updateEmployee(connection);
        //   break;
        // case choices.updateEmployeeManager:
        //   updateEmployeeManager(connection);
        //   break;
        // case choices.removeEmployee:
        //   removeEmployee(connection);
        //   break;
        // case choices.removeDeaprtment:
        //   removeDepartment(connection);
        //   break;
        // case choices.removeRole:
        //   removeEmployeeRole(connection);
        //   break;
        // case choices.viewSalariesByDepartment:
        //   viewAllSalariesByDepartment(connection);
        //   break;
        case choices.exit:
          return;
      }
    });
}

//function to initialize the program
function init(connection) {
  return welcomeScreen()
    .then(handleExit)
    .then(() => runSearch(connection));
}

module.exports = {
  runSearch: runSearch,
  welcomeScreen: welcomeScreen,
  init: init,
};

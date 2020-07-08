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
  viewAll: "View all Employees",
  viewAllByDepartment: "View All Employees By Department",
  vielAllByManager: "View All Employees By Manager",
  addEmployee: "Add Employee",
  removeEmployee: "Remove Employee",
  updateEmployee: "Update Employee Role",
  updateEmployeeManager: "Update Employee Manager",
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

function employeeSearch(connection) {
  const query =
    "SELECT employee.person_id as id, employee.first_name, employee.last_name, role.title, department.Department, role.salary, manager_id FROM employee JOIN role on employee.role_id = role.Role_id JOIN department on role.department_id = department.Department_id";
  return connection.query(query, (err, rows) => {
    const table = rows.map((row) => formatRow(rows, row));
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
        case choices.viewAllByDepartment:
          employeesByDepartment();
          break;

        case choices.vielAllByManager:
          employeesByManager();
          break;

        case choices.addEmployee:
          addEmployee();
          break;

        case choices.removeEmployee:
          removeEmployee();
          break;

        case choices.updateEmployee:
          updateEmployee();
          break;

        case choices.updateEmployeeManager:
          updateEmployeeManager();
          break;
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

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

function employeeSearch(connection) {
  const query =
    "SELECT employee.person_id, employee.first_name, employee.last_name, role.title, department.Department, role.salary, manager_id FROM employee JOIN role on employee.role_id = role.Role_id JOIN department on role.department_id = department.Department_id";
  return connection.query(query, (err, res) => {
    console.log(
      res
        .filter((row) => row.person_id === res[0].manager_id)
        .map(formatManager)
    );

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

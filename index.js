//Dependencies

const mysql = require("mysql2");
// const employees = require("console.table");
const questionnaire = require("./sections/questionnaire");

// const role = require("console.table");
// const employee = require("console.table");

// const departments = [];
// const roles = [];
// const employees = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "EmnvaznkzN7!",
  database: "employees",
});

const data = {};

// function queryRoles(connection) {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     res.forEach((role) =>
//       console.log(`${role.id}: ${role.title}: ${role.salary}`)
//     );
//     connection.end();
//   });
// }

function processRoles(err, res) {
  if (err) throw err;
  res.forEach((role) => console.log(`${role.title}|${role.salary}`));
  // data.roles = res;
}
function processEmployee(err, res) {
  if (err) throw err;
  res.forEach((employee) =>
    console.log(
      `${employee.person_id}|${employee.first_name}|${employee.last_name}|${employee.role_id}|${employee.manager_id}`
    )
  );
}
function processDepartment(err, res) {
  if (err) throw err;
  res.forEach((department) =>
    console.log(`${department.Department_id}|${department.Name}`)
  );
}

// function afterConnection() {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     res.forEach((role) => console.log(`${role.title}: ${role.salary}`));
//     connection.end();
//   });
// }

function terminateConnection() {
  connection.end();
}

function startCLI() {
  questionnaire.init(connection).then(terminateConnection);
}

connection.connect(function (err) {
  // connection.query("SELECT * FROM role", processRoles);
  // connection.query("SELECT * FROM employee", processEmployee);
  // connection.query("SELECT * FROM department", processDepartment);
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  startCLI();
});

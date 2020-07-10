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

function terminateConnection() {
  connection.end();
}

function startCLI() {
  questionnaire.init(connection); // .then(terminateConnection);
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  startCLI();
});

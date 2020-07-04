//Dependencies

const mysql = require("mysql2");
const department = require("console.table");
const role = require("console.table");
const employee = require("console.table");
const questionnaire = require("./sections/questionnaire");
const fs = require("fs");
// array of questions for user
const questions = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "EmnvaznkzN7!",
  database: "employees",
});

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    process.exit(1);
    console.log("The file has been saved!");
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  connection.end();
});

console.log(department);
console.log(role);
console.log(employee);

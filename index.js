const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 5000,
  user: "root",
  password: "EmnvaznkzN7!",
  database: "",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  connection.end();
});

const questionnaire = require("./sections/questionnaire");
const fs = require("fs");
// const filename = "README-user.md";

// array of questions for user
const questions = [];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    process.exit(1);
    console.log("The file has been saved!");
  });
}

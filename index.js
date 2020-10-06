const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Alucard1",
  database: "employees",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  //console.log("connected as id " + connection.threadId);
  if (err) throw err;
  init();
});

function init() {
    inquirer
      .prompt([
        {
          name: "selection",
          message: "What would you like to do?",
          type: "list",
          choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
          ],
        },
      ])
      .then(({ selection }) => {
        console.log(selection);
        if (selection === "View All Employees") {
          //functionName();
        } else if (selection === "View All Employees by Department") {
          //functionName();
        } else if (selection === "View All Employees by Manager") {
          //functionName();
        } else if (selection === "Update Employee Role") {
          //functionName();
        } else if (selection === "Add Employee") {
          //functionName();
        } else if (selection === "Remove Employee") {
          //functionName();
        } else if (selection === "Update Employee Role") {
          //functionName();
        } else if (selection === "Update Employee Manager") {
          //functionName();
        } else {
            connection.end();
        }
      });
    }
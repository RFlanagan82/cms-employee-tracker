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
          viewAllEmployees();
        } else if (selection === "View All Employees by Department") {
          viewByDepartment();
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

    function viewAllEmployees() {
        connection.query(
            `Select employee.id, first_name, last_name, role_id, manager_id, title, 
            salary From employee
            RIGHT JOIN role
            ON employee.role_id = role.id;`, 
            (err, data) => {
                if (err) throw err;
                console.table(data);
                }
          );
          init();
        };


    function viewByDepartment() {
        connection.query(
            `SELECT employee.id, first_name, last_name, manager_id, title, department.name From employee
            RIGHT JOIN role
            ON employee.role_id = role.id
            LEFT Join department
            ON department.id = role.department_id;`,
            (err, data) => {
                if (err) throw err;
                console.table(data);
            }
        );
        init();
    };

    
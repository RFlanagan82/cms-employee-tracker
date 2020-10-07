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
            "Update Employee Role",
            "View All Employees by Manager",
            "Add Employee",
            // "Remove Employee",
            // "Update Employee Manager",
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
        } else if (selection === "Update Employee Role") {
          updateEmployeeRole();
        } else if (selection === "View All Employees by Manager") {
          viewByManager();
        } else if (selection === "Add Employee") {
          addEmployee();
        // } else if (selection === "Remove Employee") {
        //   //functionName();
        // } else if (selection === "Update Employee Manager") {
        //   //functionName();
        // } else {
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

    function updateEmployeeRole() {
        connection.query("SELECT first_name, id FROM employee", function (err, res) {
            if(err) throw err;
            const employeeArray = [];
            console.table(res);
            if (res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res[i].id)
                    const employeeObject = {
                        name: res[i].first_name, value: res[i].id
                    }
                    employeeArray.push(employeeObject)
                }
            }
            inquirer.prompt([
                {
                    name: "employeeSelection",
                    message: "Which employee would you like to update?",
                    type: "list",
                    choices: employeeArray
                },
            ])
            .then((response) => {
                empID = response.employeeSelection
                console.log(empID)
                //loop through roles and make an array of objects with name and value and then put it in choices
                const rolesArray = [];
                console.log(rolesArray)
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        console.log(res[i].id)
                        const rolesObject = {
                            role: res[i].title, value: res[i].id
                    }
                    rolesArray.push(rolesObject)
                }
            }
            inquirer.prompt([
                {
                    name: "newRole",
                    message: "What is the employee's new role?",
                    type: "list",
                    choices: rolesArray
                        //{ name: "Sales Lead",value: 1},
                    
                },
            ])

            .then((newrole) => {
                    //console.log(newrole);
                    let empName = employeeArray;
                    let newRole = rolesArray;
                    connection.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?", 
                    [
                        {
                            newRole
                        },
                        {
                            empName
                        }
                    ],
                    (err, res) => {
                        if(err) throw err;
                        console.table(res)
                    }
                    )
                })
            })
        })
        init();
    };


    function addEmployee() {
        connection.query("Select title, id FROM role", function(err,res){
            if (err) throw err;
            const roleArray = [];
            if (res.length > 0) {
                for (let i = 0; i < res.length; i++){
                    const roleObject = {
                        name: res[i].title,
                        value: res[i].id,
                    };
                    roleArray.push(roleObject);
                }            
            }
        });
        inquirer.prompt([
            {
                name: "firstName",
                message: "What is the employee's first name you wish to add?",
                type: "input"
            },
            {
                name: "lastName",
                message: "What is the employee's last name you wish to add?",
                type: "input"
            },
            {
                name: "title",
                message: "What is the new employee's role?",
                type: "input"
            },
            {
                name: "empMgr",
                message: "Who is the employee's manager?",
                type: "list",
                choices: [
                    "None",
                    "Sal Singleton",
                    "David Clyburn",
                    "Buster Crawley",

                ]
            },
        ])
        .then(({ firstName, lastName, role, empMgr}) => {
            console.log(`${firstName} ${lastName} was added as a new employee`)
            connection.query("INSERT INTO employee SET = ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager: empMgr
            }),
            (err, res) => {
                if(err) throw err;
                console.table(res)
            }  
        })
        //init();
    }

    //BONUS POINTS
    function viewByManager() {
        connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`,
            (err, data) => {
                if (err) throw err;
                console.table(data);
            }
        );
        init();
    };







const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

var exit = false;
var connectionContent = {
  host: "localhost",
  user: "root",
  password: "pwisgwubootcamp",
  database: "employee_db",
};

var connection = mysql.createConnection(connectionContent);

//   connection.query(
//     //'SELECT * FROM employee',

//     function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//     // console.log(err)
//     }
//   );

const promptManager = () => {
  console.log("Welcome!");
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do? (Required)",
        choices: [
          "view departments",
          "view roles",
          "view employees",
          "add department",
          "add role",
          "add employee",
        ],
      },
    ])

    .then((answers) => {
      if (answers.action === "view departments") {
        showTable("department");
      }

      if (answers.action === "view roles") {
        showTable("role");
      }

      if (answers.action === "view employees") {
        showTable("employee");
      }

      if (answers.action === "add department") {
        addDepartment();
      }

      if (answers.action === "add role") {
        addRole();
      }
      if (answers.action === "add employee") { 
        connection.query(
          "SELECT * FROM employee",
          function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
          }
        );
      }
    });
};

function showTable(tableName) {
  connection
    .promise()
    .query("SELECT * FROM " + tableName)
    .then(([rows, fields]) => {
      console.table(rows);
      connection.end();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the department called?",
      },
    ])

    .then((departmentAnswers) => {
      connection
        .promise()
        .query(
          'INSERT INTO department (name) VALUES ("' +
            departmentAnswers.department_name +
            '") '
        )
        .then(([rows, fields]) => {
          //console.table(rows);
          connection.end();
        });
    });
}




//checking role instead of department 
// function addEmployee() {
//     var roleChoices = role 
// }


function addRole() {
  var departmentChoices = [];
  connection
    .promise()
    .query("SELECT * FROM department")
    .then(([rows, fields]) => {
      //console.log(rows);
      var departmentNames = rows;
      for (let i = 0; i < rows.length; i++) {
        departmentChoices.push(rows[i]["id"] + ":" + rows[i]["name"]);
      }
    })
    //.then(() => connection.end())
    .catch(console.log);
  //connection = mysql.createConnection(connectionContent);

  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "What is the role called?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is this role's salary?",
      },
      {
        type: "list",
        name: "department_role",
        message: "What department is this role in?",
        choices: departmentChoices,
      },
    ])
    .then((roleAnswers) => {
      //console.log(roleAnswers)
      let id = roleAnswers.department_role.split(":")[0]; //this gets the list and I need to get the first element of the list
      var roleValues = [
        [roleAnswers.role_name, roleAnswers.salary, parseInt(id)],
      ];

      connection
        .promise()
        .query(
          "INSERT INTO role (title, salary, department_id) VALUES (?) ",
          roleValues
        )
        .then(() => connection.end());
    })
    .catch(console.log);
}

promptManager();

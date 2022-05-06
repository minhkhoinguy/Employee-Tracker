const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'mk19980923',
    database: 'employeeTracker_db'
    },
    console.log('Connect to the employeeTracker_db database')
);
connection.connect((err) => {
    console.log("success")
    if(err) throw err
})

function menu() {
    inquirer.prompt(
        {
        type: "list",
        name: "menu",
        message: "What do you need?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Exit"]
        }
    ).then(res => {
        if (res.menu ==="View All Departments") {
            viewAllDepartments();
        } else if (res.menu ==="View All Roles") {
            console.log(res)
            viewRoles();
        } else if (res.menu ==="View All Employees") {
            console.log(res)
            viewEmployees();
        } else if (res.menu ==="Add a Department") {
            addDepartment();
        } else if (res.menu ==="Add a Role") {
            addRole();
        } else if (res.menu ==="Add an Employee") {
            addEmployee();
        } else if (res.menu ==="Update an Employee Role") {
            updateEmployee();
        } else {
            process.exit();
        }
    })
}

const viewAllDepartments = () =>{
    connection.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        menu();
    })
}

const viewRoles = () =>{
    connection.query('SELECT title, salary, department.name As department FROM role LEFT JOIN department on role.department_id = department.id', function (err, results) {
        console.log(results);
        menu();
    })
}

const viewEmployees = () =>{
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name As department FROM employee LEFT JOIN role on role.id = employee.role_id  LEFT JOIN department on department.id = role.department_id LEFT JOIN employee manager on employee.manager_id = manager.id', function (err, results) {
        console.log(results);
        menu();
    })
}

const addDepartment = () =>{
    inquirer.prompt([
        {
            type: "input",
            message: "Please add department",
            name: "name"
        }
    ]).then(res =>{
        connection.query('INSERT into department SET ?', res)
        console.log('added department.')
        menu();
    })
}

const addRole = () =>{
    connection.query('SELECT department.id AS value, department.name AS name FROM department')
    inquirer.prompt([
        {
            type: "input",
            message: "Please add title for Role",
            name: "title"
        },
        {
            type: "input",
            message: "Please add salary for this Role",
            name: "salary"
        },
        {
            type: "input",
            message: "Please add the department for this role",
            name: "department_id",
            choices: depts[0]
        }
    ]).then(res =>{
        connection.query('INSERT into role SET ?', [res.title, res.salary, res.department_id],(err,data) =>{
            console.log(data)
            menu();
        })
    })
}

const addEmployee = () =>{
    connection.query('SELECT employee.id AS value, employee.last_name AS name FROM employee')
    connection.query('SELECT role.id AS value, role.title AS name FROM role')
    inquirer.prompt([
        {
            type: "input",
            message: "Please add title for Role",
            name: "first_name"
        },
        {
            type: "input",
            message: "Please add salary for this Role",
            name: "last_name"
        },
        {
            type: "input",
            message: "Please add the department for this role",
            name: "role_id",
            choices: empRole[0]
        },
        {
            type: "input",
            message: "Please add the department for this role",
            name: "manager_id",
            choices: employees[0]
        }
    ]).then(res =>{
        connection.query('INSERT into employee SET ?', [res.first_name, res.last_name, res.role_id, res.manager_id],(err,data) =>{
            console.log(data)
            menu();
        })
    })
}

const updateEmployee = () =>{
    connection.query('SELECT employee.id AS value, employee.last_name AS name FROM employee')
    connection.query('SELECT role.id AS value, role.title AS name FROM role')
    inquirer.prompt([
        {
            type: "list",
            message: "Please select employee's role you want to update",
            name: "id",
            choices: employees[0]
        },
        {
            type: "list",
            message: "Please select the role you want to assign to the employee",
            name: "role_id",
            choices: empRole[0]
        }
    ]).then(res =>{
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [res.id, res.role_id],(err,data) =>{
            console.log(data)
            menu();
        })
    })
}

menu();

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
    if (err) throw err
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
        if (res.menu === "View All Departments") {
            viewAllDepartments();
        } else if (res.menu === "View All Roles") {
            console.log(res)
            viewRoles();
        } else if (res.menu === "View All Employees") {
            console.log(res)
            viewEmployees();
        } else if (res.menu === "Add a Department") {
            addDepartment();
        } else if (res.menu === "Add a Role") {
            addRole();
        } else if (res.menu === "Add an Employee") {
            addEmployee();
        } else if (res.menu === "Update an Employee Role") {
            updateEmployee();
        } else {
            process.exit();
        }
    })
}

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        menu();
    })
}

const viewRoles = () => {
    connection.query('SELECT title, salary, department.name As department FROM role LEFT JOIN department on role.department_id = department.id', function (err, results) {
        console.log(results);
        menu();
    })
}

const viewEmployees = () => {
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name As department, employee.manager_id As Manager FROM employee LEFT JOIN role on role.id = employee.role_id  LEFT JOIN department on department.id = role.department_id LEFT JOIN employee manager on employee.manager_id = employee.last_name', function (err, results) {
        console.log(results);
        menu();
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please add department",
            name: "name"
        }
    ]).then(res => {
        connection.query('INSERT into department SET ?', res)
        console.log('added department.')
        menu();
    })
}

const addRole = () => {
    connection.query('SELECT * FROM department', function (err, results) {
        console.table(results);

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
                type: "number",
                message: "Please add the department for this role",
                name: "department_id",
            }
        ]).then(res => {
            connection.query('INSERT into role SET ?', res, (err, data) => {
                if (err) throw err;
                console.log(data)
                menu();
            })
        })
    })
}

const addEmployee = () => {
    let managers;
    const addManager = connection.query('SELECT * FROM employee', (err, response) => {
        console.table * response
    })
    const addRole = connection.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        inquirer.prompt([
            {
                type: "input",
                message: "Please add employee first name",
                name: "first_name"
            },
            {
                type: "input",
                message: "Please add employee last name",
                name: "last_name"
            },
            {
                type: "number",
                message: "Please add role for this employee",
                name: "role_id",
            },
            {
                type: "input",
                message: "Please add the manager for this employee",
                name: "manager_id",
            }
        ]).then(res => {
            connection.query('INSERT into employee SET ?', res, (err, data) => {
                if (err) throw err;
                console.log(data)
                menu();
            })
        })
    })
}

const updateEmployee = () => {
    const addId = connection.query('SELECT * FROM employee', (err, response) => {
        console.table(response)
    })
    const addRole = connection.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        inquirer.prompt([
            {
                type: "number",
                message: "Please select employee you want to update",
                name: "id",
            },
            {
                type: "number",
                message: "Please select the role you want to assign to the employee",
                name: "role_id",
            }
        ]).then(res => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [res.role_id, res.id], (err, data) => {
                console.log(data)
                menu();
            })
        })
    })
}

menu();

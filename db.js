const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'Ragavi', // Replace with your MySQL username
    password: 'Ragavi1709@#', // Replace with your MySQL password
    database: 'my_database' // Replace with your database name
});

module.exports = db;

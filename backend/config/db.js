const mysql = require('mysql2');
require('dotenv').config();


// we can store the secret in .env and and use them as process env

const db = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,


    host: "localhost",
    user: "root",
    password: "Reddy@123",
    database: "artify",
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;


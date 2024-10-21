const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true, // Wait for a connection to be available before timing out
    connectionLimit: 10,      // Maximum number of connections to create at once
    queueLimit: 0             // Number of connection requests that can be queued (0 = no limit)
});

// Optional: A function to test the connection pool
const testConnection = () => {
    connection.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to MySQL database');
        conn.release(); // Release the connection back to the pool
    });
};

// Test the connection
testConnection();

module.exports = connection; // Export the pool for use in your application

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gaurav@6649', // Change if needed
  database: 'jobtracker'
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL!');
  }
});

module.exports = db;

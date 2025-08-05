const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql.railway.internal', // ✅ FIXED: no equal sign!
  user: 'root',
  password: 'sTBSBkOldkAvSTcucMoVLFgVyVGTHTbB',
  database: 'railway',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL!');
  }
});

module.exports = db;

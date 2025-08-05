require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'jobtracker',
  port: process.env.MYSQLPORT || 3306,
  connectTimeout: 10000
});

connection.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL!');
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Add job
app.post('/add', (req, res) => {
  const { title, company, status, created_at } = req.body;
  const sql = `INSERT INTO jobs (title, company, status, created_at)
               VALUES (?, ?, ?, ?)`;
  connection.query(sql, [title, company, status, created_at], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// ✅ Fetch all jobs
app.get('/fetch', (req, res) => {
  connection.query('SELECT * FROM jobs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ Delete job
app.post('/delete', (req, res) => {
  const { id } = req.body;
  const sql = 'DELETE FROM jobs WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// ✅ Edit job
app.post('/edit', (req, res) => {
  const { id, title, company, status, created_at } = req.body;
  const sql = `UPDATE jobs SET title = ?, company = ?, status = ?, created_at = ? WHERE id = ?`;
  connection.query(sql, [title, company, status, created_at, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (index.html, script.js, CSS, etc.)
app.use(express.static('public'));

// === API Routes ===

// Get all jobs
app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM applications ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Add a new job
app.post('/api/jobs', (req, res) => {
  const { title, company, status, created_at } = req.body;
  const date = created_at || new Date().toISOString().split('T')[0];
  db.query(
    'INSERT INTO applications (title, company, status, created_at) VALUES (?, ?, ?, ?)',
    [title, company, status, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Insert failed' });
      res.json({ id: result.insertId, title, company, status, created_at: date });
    }
  );
});

// Delete a job
app.delete('/api/jobs/:id', (req, res) => {
  db.query('DELETE FROM applications WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ success: true });
  });
});

// Update a job
app.put('/api/jobs/:id', (req, res) => {
  const { title, company, status } = req.body;
  db.query(
    'UPDATE applications SET title = ?, company = ?, status = ? WHERE id = ?',
    [title, company, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ success: true });
    }
  );
});

// === Fallback route for frontend ===
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

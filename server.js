const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM applications ORDER BY created_at DESC', (err, results) => {
    if (err) res.status(500).json({ error: 'Database error' });
    else res.json(results);
  });
});

app.post('/api/jobs', (req, res) => {
  const { title, company, status, created_at } = req.body;
  const date = created_at || new Date().toISOString().split('T')[0];
  db.query(
    'INSERT INTO applications (title, company, status, created_at) VALUES (?, ?, ?, ?)',
    [title, company, status, date],
    (err, result) => {
      if (err) res.status(500).json({ error: 'Insert failed' });
      else res.json({ id: result.insertId, title, company, status, created_at: date });
    }
  );
});

app.delete('/api/jobs/:id', (req, res) => {
  db.query('DELETE FROM applications WHERE id = ?', [req.params.id], (err) => {
    if (err) res.status(500).json({ error: 'Delete failed' });
    else res.json({ success: true });
  });
});

app.put('/api/jobs/:id', (req, res) => {
  const { title, company, status } = req.body;
  db.query(
    'UPDATE applications SET title = ?, company = ?, status = ? WHERE id = ?',
    [title, company, status, req.params.id],
    (err) => {
      if (err) res.status(500).json({ error: 'Update failed' });
      else res.json({ success: true });
    }
  );
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

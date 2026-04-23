const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./inventory.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// API endpoint to get all records
app.get('/api/records', (req, res) => {
  db.all('SELECT * FROM records', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ records: rows });
  });
});

// API endpoint to get records by genre (for generos.html)
app.get('/api/records/:genre', (req, res) => {
  const genre = req.params.genre;
  db.all('SELECT * FROM records WHERE genre = ?', [genre], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ records: rows });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
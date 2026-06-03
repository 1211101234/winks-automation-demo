const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'logs.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize logs file if it doesn't exist
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
}

// ✅ POST /report — receives updates from Java test
app.post('/report', (req, res) => {
    const { message, status, timestamp } = req.body;

    const entry = {
        message,
        status,
        timestamp: timestamp || Date.now(),
        time: new Date().toLocaleTimeString()
    };

    // Read existing logs
    const raw = fs.readFileSync(LOG_FILE);
    const logs = JSON.parse(raw);

    // Append new entry
    logs.push(entry);

    // Save back
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

    console.log(`[Winks] ${entry.time} | ${status} | ${message}`);

    res.status(200).json({ received: true });
});

// ✅ GET /logs — dashboard polls this to get all logs
app.get('/logs', (req, res) => {
    const raw = fs.readFileSync(LOG_FILE);
    const logs = JSON.parse(raw);
    res.status(200).json(logs);
});

// ✅ DELETE /logs — clear logs before each run
app.delete('/logs', (req, res) => {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
    console.log('[Winks] Logs cleared');
    res.status(200).json({ cleared: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Winks server running at http://localhost:${PORT}`);
    console.log(`POST /report  — receives test updates`);
    console.log(`GET  /logs    — returns all logs`);
    console.log(`DELETE /logs  — clears logs`);
});
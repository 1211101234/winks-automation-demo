const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(express.json({ limit: '10mb' })); // increased for base64 images

if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
}

app.post('/report', (req, res) => {
    const { message, status, timestamp, image, time } = req.body;

    const entry = {
        message,
        status,
        timestamp: timestamp || Date.now(),
        time: time || new Date().toLocaleTimeString(),
        image: image || null
    };

    const raw = fs.readFileSync(LOG_FILE);
    const logs = JSON.parse(raw);
    logs.push(entry);
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

    console.log(`[Winks] ${entry.time} | ${status} | ${message}`);
    res.status(200).json({ received: true });
});

app.get('/logs', (req, res) => {
    const raw = fs.readFileSync(LOG_FILE);
    const logs = JSON.parse(raw);
    res.status(200).json(logs);
});

app.delete('/logs', (req, res) => {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
    console.log('[Winks] Logs cleared');
    res.status(200).json({ cleared: true });
});

app.listen(PORT, () => {
    console.log(`Winks server running at http://localhost:${PORT}`);
    console.log(`POST /report  — receives test updates`);
    console.log(`GET  /logs    — returns all logs`);
    console.log(`DELETE /logs  — clears logs`);
});
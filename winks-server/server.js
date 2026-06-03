const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'logs.json');
const RUNS_FILE = path.join(__dirname, 'runs.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize files
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
}
if (!fs.existsSync(RUNS_FILE)) {
    fs.writeFileSync(RUNS_FILE, JSON.stringify([]));
}

// POST /report — receives updates from tests
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

// GET /logs — returns current logs
app.get('/logs', (req, res) => {
    const raw = fs.readFileSync(LOG_FILE);
    res.status(200).json(JSON.parse(raw));
});

// DELETE /logs — saves current run to history then clears
app.delete('/logs', (req, res) => {
    const raw = fs.readFileSync(LOG_FILE);
    const logs = JSON.parse(raw);

    if (logs.length > 0) {
        const pass  = logs.filter(l => l.status === 'PASS').length;
        const fail  = logs.filter(l => l.status === 'FAIL').length;
        const info  = logs.filter(l => l.status === 'INFO').length;
        const total = logs.length;

        const runsRaw = fs.readFileSync(RUNS_FILE);
        const runs = JSON.parse(runsRaw);

        runs.push({
            runNumber: runs.length + 1,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            total,
            pass,
            fail,
            info
        });

        fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 2));
        console.log(`[Winks] Run #${runs.length} saved to history`);
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
    console.log('[Winks] Logs cleared');
    res.status(200).json({ cleared: true });
});

// GET /runs — returns run history for trend chart
app.get('/runs', (req, res) => {
    const raw = fs.readFileSync(RUNS_FILE);
    res.status(200).json(JSON.parse(raw));
});

// DELETE /runs — clears run history
app.delete('/runs', (req, res) => {
    fs.writeFileSync(RUNS_FILE, JSON.stringify([]));
    console.log('[Winks] Run history cleared');
    res.status(200).json({ cleared: true });
});

app.listen(PORT, () => {
    console.log(`Winks server running at http://localhost:${PORT}`);
    console.log(`POST   /report — receives test updates`);
    console.log(`GET    /logs   — returns current logs`);
    console.log(`DELETE /logs   — saves run + clears logs`);
    console.log(`GET    /runs   — returns run history`);
    console.log(`DELETE /runs   — clears run history`);
});
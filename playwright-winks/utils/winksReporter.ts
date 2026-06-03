const fetch = require('node-fetch');
const fs = require('fs');

const WINKS_URL = 'http://localhost:3000/report';

export async function sendToWinks(message: string, status: string): Promise<void> {
  try {
    await fetch(WINKS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        status,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
      })
    });
    console.log(`[Winks] ${status} | ${message}`);
  } catch (err) {
    console.log(`[Winks] Failed to send: ${err}`);
  }
}

export async function sendScreenshot(screenshotPath: string): Promise<void> {
  try {
    const imageData = fs.readFileSync(screenshotPath, 'base64');
    await fetch(WINKS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Failure Screenshot',
        status: 'SCREENSHOT',
        image: imageData,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
      })
    });
    console.log(`[Winks] SCREENSHOT | Sent failure screenshot`);
  } catch (err) {
    console.log(`[Winks] Failed to send screenshot: ${err}`);
  }
}
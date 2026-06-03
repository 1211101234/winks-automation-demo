# ⚡ Winks Automation Demo

A full-stack test automation demo combining **Selenium + TestNG (Java)**, **Playwright (TypeScript)**, a **Node.js reporting backend**, and a **live dashboard UI** — all connected in real time.

---

## 📁 Project Structure

```
Winks/
 ├── src/                          # Java + Selenium + TestNG
 │    └── test/java/
 │         ├── base/
 │         │    └── BaseTest.java
 │         ├── tests/
 │         │    └── CheckoutTest.java
 │         └── utils/
 │              └── WinksReporter.java
 ├── playwright-winks/             # Playwright + TypeScript
 │    ├── tests/
 │    │    ├── checkout.spec.ts
 │    │    ├── login.spec.ts
 │    │    ├── search.spec.ts
 │    │    └── api.spec.ts
 │    ├── utils/
 │    │    └── winksReporter.ts
 │    ├── playwright.config.ts
 │    └── package.json
 ├── winks-server/                 # Node.js backend
 │    ├── server.js
 │    ├── package.json
 │    ├── logs.json                # auto-generated
 │    └── runs.json                # auto-generated
 ├── winks-dashboard/              # Live dashboard UI
 │    └── index.html
 ├── pom.xml                       # Maven config
 └── testng.xml                    # TestNG suite config
```

---

## 🧩 Architecture

```
Java/Playwright Tests
        │
        │  POST /report
        ▼
Winks Node.js Server (localhost:3000)
        │
        │  GET /logs  (every 2s)
        ▼
Winks Live Dashboard (index.html)
```

---

## ⚙️ Prerequisites

| Tool | Version |
|---|---|
| Java JDK | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| Chrome Browser | Latest |
| Git | Any |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/winks-automation-demo.git
cd winks-automation-demo
```

---

### 2. Start the Winks Server

```bash
cd winks-server
npm install
npm start
```

You should see:
```
Winks server running at http://localhost:3000
POST   /report — receives test updates
GET    /logs   — returns current logs
DELETE /logs   — saves run + clears logs
GET    /runs   — returns run history
DELETE /runs   — clears run history
```

---

### 3. Open the Dashboard

Open `winks-dashboard/index.html` directly in your browser.

---

### 4. Run Java Tests (Selenium + TestNG)

Open a new terminal:

```bash
cd Winks
mvn clean test
```

---

### 5. Run Playwright Tests

Open a new terminal:

```bash
cd playwright-winks
npm install
npx playwright install
npm test
```

---

## 🧪 Test Suites

### Java — Selenium + TestNG

| Test | Description |
|---|---|
| `CheckoutTest` | Simulates a full checkout flow with configurable pass/fail |

### Playwright — TypeScript

| Test | Description |
|---|---|
| `checkout.spec.ts` | UI checkout flow with screenshot on failure |
| `login.spec.ts` | Valid and invalid login scenarios |
| `search.spec.ts` | Book search and navigation on books.toscrape.com |
| `api.spec.ts` | REST API tests — GET users, POST and GET single post |

---

## 📊 Dashboard Features

| Feature | Description |
|---|---|
| Live log feed | Updates every 2 seconds automatically |
| Summary cards | Total, Pass, Fail, Info counts |
| Donut chart | Current run breakdown |
| Trend line chart | Pass/Fail history across multiple runs |
| Screenshot viewer | Failure screenshots shown inline |
| Save Run button | Saves current run to trend history |
| Clear Logs | Clears current log entries |
| Clear History | Resets trend chart data |
| Auto Refresh toggle | Turn live polling on/off |

---

## 🔌 Server API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/report` | Receive a test log entry |
| GET | `/logs` | Get all current logs |
| DELETE | `/logs` | Save run to history and clear logs |
| GET | `/runs` | Get all run history |
| DELETE | `/runs` | Clear run history |

### POST /report Payload

```json
{
  "message": "User login successful",
  "status": "PASS",
  "time": "12:49:20 PM",
  "timestamp": 1234567890,
  "image": "<base64 string — optional>"
}
```

### Status Types

| Status | Color | Meaning |
|---|---|---|
| `START` | Purple | Test started |
| `END` | Orange | Test finished |
| `PASS` | Green | Step passed |
| `FAIL` | Red | Step failed |
| `INFO` | Blue | Informational step |
| `SCREENSHOT` | Dark blue | Screenshot attached |

---

## 🎬 Demo Flow

### Running a Full Demo

1. Start the Winks server
2. Open the dashboard in browser
3. Run Playwright tests — `npm test`
4. Watch dashboard update live
5. Click **💾 Save Run** to save to trend history
6. Run tests again to build up trend data

### Simulating a Failure

In `playwright-winks/tests/checkout.spec.ts` change:

```typescript
const paymentSuccess = true;   // change to false
```

Re-run tests — failure is captured with screenshot on the dashboard.

### Configuring Java Test Failure via testng.xml

```xml
<parameter name="simulateFailure" value="true"/>
```

---

## 📦 Dependencies

### Java (pom.xml)

| Dependency | Version |
|---|---|
| selenium-java | 4.18.1 |
| testng | 7.9.0 |
| webdrivermanager | 5.7.0 |

### Playwright (package.json)

| Dependency | Version |
|---|---|
| @playwright/test | 1.60.0 |
| node-fetch | 2.7.0 |

### Winks Server (package.json)

| Dependency | Version |
|---|---|
| express | 4.18.2 |
| cors | 2.8.5 |

---

## 🗂 Git Ignore

```
# Maven
target/

# Node
winks-server/node_modules/
winks-server/logs.json
winks-server/runs.json
playwright-winks/node_modules/
playwright-winks/test-results/
playwright-winks/playwright-report/

# IDE
.idea/
*.iml
.vscode/

# OS
.DS_Store
Thumbs.db
```

---

## 🔮 Planned Upgrades

- [ ] Jenkins pipeline integration
- [ ] Docker one-command setup
- [ ] Slack/Teams failure notifications
- [ ] Database backed run history
- [ ] Parallel test execution reporting

---

## 📄 License

MIT — free to use and modify for demos, learning, and presentations.

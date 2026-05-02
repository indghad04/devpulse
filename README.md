# DevPulse — Developer Productivity MVP

A full-stack web app that helps developers move from raw metrics to understanding and action.

## Project Structure

```
devpulse/
├── backend/        # Node.js + Express REST API
└── frontend/       # React.js app
```

## Quick Start

### 1. Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## Features
- IC View: Select a developer and month to see their 5 metrics
- Pattern detection: Healthy flow / Quality watch / Needs review
- Interpretation: Plain-English explanation of what the metrics mean
- Next steps: 2–3 actionable suggestions per pattern
- Manager View: Team summary across all managers and months

## Tech Stack
- Frontend: React.js, Chart.js, CSS variables
- Backend: Node.js, Express.js, REST API
- Data: Sample workbook data from assignment



const express = require("express");
const cors = require("cors");
const { developers, metrics, managerSummary } = require("./data");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ── GET /api/developers
// Returns list of all developers
app.get("/api/developers", (req, res) => {
  res.json(developers);
});

// ── GET /api/metrics?dev_id=DEV-001&month=2026-04
// Returns metrics for one developer for one month,
// plus previous month data for delta calculation
app.get("/api/metrics", (req, res) => {
  const { dev_id, month } = req.query;

  if (!dev_id || !month) {
    return res.status(400).json({ error: "dev_id and month are required" });
  }

  const developer = developers.find((d) => d.id === dev_id);
  if (!developer) {
    return res.status(404).json({ error: "Developer not found" });
  }

  const current = metrics.find((m) => m.dev_id === dev_id && m.month === month);
  if (!current) {
    return res.status(404).json({ error: "No metrics found for this developer and month" });
  }

  // Find previous month for trend/delta
  const allMonths = [...new Set(metrics.map((m) => m.month))].sort();
  const currentIdx = allMonths.indexOf(month);
  const prevMonth = currentIdx > 0 ? allMonths[currentIdx - 1] : null;
  const previous = prevMonth
    ? metrics.find((m) => m.dev_id === dev_id && m.month === prevMonth)
    : null;

  // Build interpretation and next steps based on pattern
  const { interpretation, nextSteps } = buildInsights(developer, current);

  res.json({
    developer,
    current,
    previous: previous || null,
    interpretation,
    nextSteps,
  });
});

// ── GET /api/manager-summary
// Returns aggregated team metrics for all managers
app.get("/api/manager-summary", (req, res) => {
  res.json(managerSummary);
});

// ── GET /api/months
// Returns list of available months
app.get("/api/months", (req, res) => {
  const months = [...new Set(metrics.map((m) => m.month))].sort();
  res.json(months);
});

// ── Insight engine
// Generates plain-English interpretation and next steps based on pattern
function buildInsights(developer, m) {
  const { name } = developer;
  const pattern = m.pattern;

  const interpretations = {
    "Healthy flow": `${name} is shipping steadily with no escaped bugs this month. Cycle time of ${m.avg_cycle_time.toFixed(1)} days and lead time of ${m.avg_lead_time.toFixed(1)} days are both within a healthy range. The pipeline from code to production is working well. Keep the current rhythm and watch for any slowdowns next month.`,

    "Quality watch": `${name} is delivering work but a bug escaped to production this month — bug rate is ${(m.bug_rate * 100).toFixed(0)}%. Cycle time (${m.avg_cycle_time.toFixed(1)} days) and lead time (${m.avg_lead_time.toFixed(1)} days) look reasonable, but the quality signal warrants attention. This may be a test coverage gap or an edge case that slipped through review.`,

    "Needs review": `${name} has no escaped bugs this month, but cycle time of ${m.avg_cycle_time.toFixed(1)} days is notably longer than teammates. Lead time is ${m.avg_lead_time.toFixed(1)} days. No production quality issues, but the pace of completing work is slower than expected. Worth exploring whether tickets are too large or if there is an external blocker.`,
  };

  const nextStepsMap = {
    "Healthy flow": [
      "Keep ticket scope small — current cycle time is efficient and worth protecting.",
      "Review lead time trend next month to catch any pipeline slowdowns early.",
      "Consider sharing what is working well with teammates who are on Quality watch.",
    ],
    "Quality watch": [
      "Add or review test coverage for the area where the escaped bug was found.",
      "Check if PR review rounds are catching edge cases — consider a second reviewer on complex changes.",
      "Separate the quality concern from the speed signal before changing your process.",
    ],
    "Needs review": [
      "Break larger tickets into smaller units to reduce active time in progress.",
      "Check if any external dependency or review bottleneck is adding idle time to your cycle.",
      "Confirm that in-progress dates are updated promptly in Jira — stale dates inflate cycle time artificially.",
    ],
  };

  return {
    interpretation: interpretations[pattern] || "No interpretation available for this pattern.",
    nextSteps: nextStepsMap[pattern] || [],
  };
}

app.listen(PORT, () => {
  console.log(`DevPulse API running at http://localhost:${PORT}`);
});

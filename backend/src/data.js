// Source: intern_assignment_support_pack_dev_only_v3.xlsx
// All metrics verified against Metric_Examples sheet

const developers = [
  { id: "DEV-001", name: "Ava Chen",     manager: "Rina Kapoor",  team: "Payments API",  service: "backend",  level: "SDE2" },
  { id: "DEV-002", name: "Noah Patel",   manager: "Rina Kapoor",  team: "Payments API",  service: "backend",  level: "SDE1" },
  { id: "DEV-006", name: "Ishan Mehta",  manager: "Rina Kapoor",  team: "Payments API",  service: "backend",  level: "SDE3" },
  { id: "DEV-003", name: "Mia Lopez",    manager: "Samir Gupta",  team: "Checkout Web",  service: "frontend", level: "SDE1" },
  { id: "DEV-004", name: "Lucas Reed",   manager: "Samir Gupta",  team: "Checkout Web",  service: "frontend", level: "SDE2" },
  { id: "DEV-008", name: "Zara Khan",    manager: "Samir Gupta",  team: "Checkout Web",  service: "frontend", level: "SDE1" },
  { id: "DEV-005", name: "Emma Roy",     manager: "Priya Nair",   team: "Mobile Growth", service: "mobile",   level: "SDE1" },
  { id: "DEV-007", name: "Owen Brooks",  manager: "Priya Nair",   team: "Mobile Growth", service: "mobile",   level: "SDE2" },
];

// Calculated from Fact_Jira_Issues, Fact_Pull_Requests, Fact_CI_Deployments, Fact_Bug_Reports
// Logic: avg cycle_time_days, avg lead_time_days, count merged PRs, count deployments, escaped_bugs/issues_done
const metrics = [
  { dev_id: "DEV-001", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.95, avg_lead_time: 2.40, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 12.55 },
  { dev_id: "DEV-001", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.90, avg_lead_time: 3.35, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 10.30 },
  { dev_id: "DEV-002", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 5.90, avg_lead_time: 4.30, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 24.20 },
  { dev_id: "DEV-002", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 5.40, avg_lead_time: 3.75, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 24.00 },
  { dev_id: "DEV-006", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.75, avg_lead_time: 2.35, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 9.60  },
  { dev_id: "DEV-006", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 3.70, avg_lead_time: 2.35, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 6.00  },
  { dev_id: "DEV-003", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 4.05, avg_lead_time: 3.85, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 17.25 },
  { dev_id: "DEV-003", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.05, avg_lead_time: 3.55, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 10.95 },
  { dev_id: "DEV-004", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.85, avg_lead_time: 2.10, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 9.20  },
  { dev_id: "DEV-004", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.55, avg_lead_time: 2.90, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 13.90 },
  { dev_id: "DEV-008", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 3.80, avg_lead_time: 3.15, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 20.15 },
  { dev_id: "DEV-008", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 3.85, avg_lead_time: 3.40, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 19.10 },
  { dev_id: "DEV-005", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 5.95, avg_lead_time: 4.95, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 21.00 },
  { dev_id: "DEV-005", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 6.50, avg_lead_time: 4.70, bug_rate: 0.00, pattern: "Needs review",   avg_review_wait_hrs: 15.00 },
  { dev_id: "DEV-007", month: "2026-03", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 1, avg_cycle_time: 4.55, avg_lead_time: 4.30, bug_rate: 0.50, pattern: "Quality watch",  avg_review_wait_hrs: 16.55 },
  { dev_id: "DEV-007", month: "2026-04", issues_done: 2, merged_prs: 2, deployments: 2, escaped_bugs: 0, avg_cycle_time: 4.80, avg_lead_time: 3.65, bug_rate: 0.00, pattern: "Healthy flow",   avg_review_wait_hrs: 15.45 },
];

// Aggregated from above per manager per month
const managerSummary = [
  { manager: "Rina Kapoor",  month: "2026-03", team_size: 3, avg_lead_time: 3.02, avg_cycle_time: 4.53, avg_bug_rate: 0.00, signal: "Healthy flow"      },
  { manager: "Rina Kapoor",  month: "2026-04", team_size: 3, avg_lead_time: 3.15, avg_cycle_time: 4.33, avg_bug_rate: 0.33, signal: "Watch bottlenecks"  },
  { manager: "Samir Gupta",  month: "2026-03", team_size: 3, avg_lead_time: 3.03, avg_cycle_time: 3.90, avg_bug_rate: 0.17, signal: "Watch bottlenecks"  },
  { manager: "Samir Gupta",  month: "2026-04", team_size: 3, avg_lead_time: 3.28, avg_cycle_time: 3.48, avg_bug_rate: 0.17, signal: "Watch bottlenecks"  },
  { manager: "Priya Nair",   month: "2026-03", team_size: 2, avg_lead_time: 4.63, avg_cycle_time: 5.25, avg_bug_rate: 0.50, signal: "Watch bottlenecks"  },
  { manager: "Priya Nair",   month: "2026-04", team_size: 2, avg_lead_time: 4.18, avg_cycle_time: 5.65, avg_bug_rate: 0.00, signal: "Healthy flow"       },
];

module.exports = { developers, metrics, managerSummary };

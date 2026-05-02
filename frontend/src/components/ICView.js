import React, { useState, useEffect } from "react";
import { fetchDevelopers, fetchMonths, fetchMetrics } from "../api";
import MetricCard from "./MetricCard";
import PatternBadge from "./PatternBadge";
import TrendChart from "./TrendChart";

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function calcDelta(current, previous, key, lowerBetter) {
  if (!previous) return null;
  const diff = current[key] - previous[key];
  if (Math.abs(diff) < 0.01) return "— no change";
  const sign = diff > 0 ? "+" : "";
  const good = lowerBetter ? diff < 0 : diff > 0;
  return { text: `${sign}${diff.toFixed(1)} vs last month`, good };
}

export default function ICView() {
  const [developers, setDevelopers] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedDev, setSelectedDev] = useState("DEV-002");
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevelopers().then(setDevelopers).catch(console.error);
    fetchMonths().then(setMonths).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedDev || !selectedMonth) return;
    setLoading(true);
    setError(null);
    fetchMetrics(selectedDev, selectedMonth)
      .then(setData)
      .catch(() => setError("Could not load metrics. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [selectedDev, selectedMonth]);

  const s = {
    toolbar: { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" },
    select: {
      fontSize: 13, padding: "7px 11px", border: "0.5px solid rgba(0,0,0,0.2)",
      borderRadius: 8, background: "#fff", color: "#1a1a1a", cursor: "pointer",
    },
    profile: {
      display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
      padding: 14, background: "#f6f7f9", borderRadius: 12,
    },
    avatar: {
      width: 42, height: 42, borderRadius: "50%", background: "#B5D4F4",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 500, fontSize: 14, color: "#0C447C", flexShrink: 0,
    },
    metricsGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
      gap: 10, marginBottom: 20,
    },
    divider: { height: "0.5px", background: "rgba(0,0,0,0.08)", margin: "20px 0" },
    sectionLabel: {
      fontSize: 11, fontWeight: 500, color: "#9ca3af", textTransform: "uppercase",
      letterSpacing: "0.05em", marginBottom: 10,
    },
    interpretation: {
      borderLeft: "3px solid rgba(0,0,0,0.12)", padding: "10px 14px",
      background: "#f6f7f9", borderRadius: "0 8px 8px 0", fontSize: 14,
      color: "#1a1a1a", lineHeight: 1.7, marginBottom: 20,
    },
    stepList: { display: "flex", flexDirection: "column", gap: 8 },
    step: {
      display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px",
      border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 8, background: "#fff",
    },
    stepNum: { fontSize: 12, fontWeight: 500, color: "#9ca3af", minWidth: 18, paddingTop: 1 },
    stepText: { fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 },
    error: { padding: 16, background: "#FCEBEB", color: "#A32D2D", borderRadius: 8, fontSize: 14 },
    loading: { padding: 40, textAlign: "center", color: "#9ca3af", fontSize: 14 },
  };

  if (loading) return <div style={s.loading}>Loading metrics...</div>;
  if (error) return <div style={s.error}>{error}</div>;

  const { current, previous, developer, interpretation, nextSteps } = data || {};

  const bugDelta = () => {
    if (!previous || !current) return null;
    const diff = current.bug_rate - previous.bug_rate;
    if (Math.abs(diff) < 0.01) return "— no change";
    const sign = diff > 0 ? "+" : "";
    return { text: `${sign}${(diff * 100).toFixed(0)}% vs last month`, good: diff < 0 };
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={s.toolbar}>
        <select style={s.select} value={selectedDev} onChange={(e) => setSelectedDev(e.target.value)}>
          {developers.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <select style={s.select} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m === "2026-03" ? "March 2026" : "April 2026"}</option>
          ))}
        </select>
      </div>

      {data && developer && current && (
        <>
          {/* Profile */}
          <div style={s.profile}>
            <div style={s.avatar}>{initials(developer.name)}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{developer.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {developer.level} · {developer.team} · {developer.service} · Reports to {developer.manager}
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div style={s.metricsGrid}>
            {[
              { label: "Cycle time", value: current.avg_cycle_time.toFixed(1), unit: "days", ...calcDelta(current, previous, "avg_cycle_time", true) },
              { label: "Lead time", value: current.avg_lead_time.toFixed(1), unit: "days", ...calcDelta(current, previous, "avg_lead_time", true) },
              { label: "PR throughput", value: current.merged_prs, unit: "merged PRs", ...calcDelta(current, previous, "merged_prs", false) },
              { label: "Deploy freq.", value: current.deployments, unit: "deployments", ...calcDelta(current, previous, "deployments", false) },
              { label: "Bug rate", value: `${(current.bug_rate * 100).toFixed(0)}%`, unit: "escaped bugs", ...(bugDelta() && typeof bugDelta() === "object" ? bugDelta() : { text: bugDelta() }) },
            ].map((m, i) => (
              <MetricCard
                key={i}
                label={m.label}
                value={m.value}
                unit={m.unit}
                delta={typeof m.text === "string" ? m.text : null}
                deltaGood={m.good}
              />
            ))}
          </div>

          <div style={s.divider} />

          {/* Pattern */}
          <div style={{ marginBottom: 20 }}>
            <div style={s.sectionLabel}>Pattern</div>
            <div style={{ marginBottom: 10 }}>
              <PatternBadge pattern={current.pattern} />
            </div>
            <div style={s.interpretation}>{interpretation}</div>
          </div>

          {/* Next steps */}
          <div style={{ marginBottom: 24 }}>
            <div style={s.sectionLabel}>Suggested next steps</div>
            <div style={s.stepList}>
              {nextSteps.map((step, i) => (
                <div key={i} style={s.step}>
                  <span style={s.stepNum}>{i + 1}</span>
                  <span style={s.stepText}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={s.divider} />

          {/* Charts */}
          <TrendChart current={current} previous={previous} />
        </>
      )}
    </div>
  );
}

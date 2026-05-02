import React, { useState, useEffect } from "react";
import { fetchManagerSummary } from "../api";

const signalStyle = {
  "Healthy flow":     { background: "#EAF3DE", color: "#3B6D11" },
  "Watch bottlenecks":{ background: "#FAEEDA", color: "#854F0B" },
};

export default function ManagerView() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManagerSummary()
      .then(setSummary)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const s = {
    sectionLabel: {
      fontSize: 11, fontWeight: 500, color: "#9ca3af", textTransform: "uppercase",
      letterSpacing: "0.05em", marginBottom: 12,
    },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
    th: {
      textAlign: "left", fontSize: 11, fontWeight: 500, color: "#9ca3af",
      padding: "6px 10px", borderBottom: "0.5px solid rgba(0,0,0,0.1)",
    },
    td: {
      padding: "10px 10px", borderBottom: "0.5px solid rgba(0,0,0,0.06)",
      color: "#1a1a1a",
    },
    badge: (signal) => ({
      display: "inline-block", padding: "2px 8px",
      borderRadius: 4, fontSize: 11,
      ...(signalStyle[signal] || { background: "#eee", color: "#333" }),
    }),
    loading: { padding: 40, textAlign: "center", color: "#9ca3af", fontSize: 14 },
    note: {
      marginTop: 16, padding: "10px 14px", background: "#f6f7f9",
      borderRadius: 8, fontSize: 13, color: "#6b7280", lineHeight: 1.6,
    },
  };

  if (loading) return <div style={s.loading}>Loading team summary...</div>;

  return (
    <div>
      <div style={s.sectionLabel}>Team summary — all managers</div>
      <table style={s.table}>
        <thead>
          <tr>
            {["Manager", "Month", "Team size", "Avg lead (days)", "Avg cycle (days)", "Bug rate", "Signal"].map((h) => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summary.map((row, i) => (
            <tr key={i}>
              <td style={s.td}>{row.manager}</td>
              <td style={s.td}>{row.month === "2026-03" ? "Mar 2026" : "Apr 2026"}</td>
              <td style={s.td}>{row.team_size}</td>
              <td style={s.td}>{row.avg_lead_time.toFixed(2)}</td>
              <td style={s.td}>{row.avg_cycle_time.toFixed(2)}</td>
              <td style={s.td}>{(row.avg_bug_rate * 100).toFixed(0)}%</td>
              <td style={s.td}>
                <span style={s.badge(row.signal)}>{row.signal}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={s.note}>
        This view shows aggregated team health signals. A "Watch bottlenecks" signal means one or more
        developers on the team have a Quality watch or elevated cycle time pattern this month.
        Use the IC view to drill into individual contributors.
      </div>
    </div>
  );
}

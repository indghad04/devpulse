import React from "react";

const styles = {
  card: {
    background: "#f6f7f9",
    borderRadius: 8,
    padding: "14px 12px",
  },
  label: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 6,
    lineHeight: 1.3,
  },
  value: {
    fontSize: 24,
    fontWeight: 500,
    color: "#1a1a1a",
    lineHeight: 1,
  },
  unit: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 3,
  },
  delta: {
    fontSize: 11,
    marginTop: 4,
  },
};

export default function MetricCard({ label, value, unit, delta, deltaGood }) {
  const deltaColor =
    delta === null || delta === undefined
      ? "#9ca3af"
      : deltaGood
      ? "#3B6D11"
      : "#A32D2D";

  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
      <div style={styles.unit}>{unit}</div>
      {delta !== null && delta !== undefined && (
        <div style={{ ...styles.delta, color: deltaColor }}>{delta}</div>
      )}
    </div>
  );
}

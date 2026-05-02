import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function TrendChart({ current, previous }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const chart1 = useRef(null);
  const chart2 = useRef(null);

  useEffect(() => {
    if (!current) return;

    const hasPrev = !!previous;
    const labels = hasPrev ? ["Last month", "This month"] : ["This month"];

    const cycleData = hasPrev
      ? [previous.avg_cycle_time, current.avg_cycle_time]
      : [current.avg_cycle_time];

    const leadData = hasPrev
      ? [previous.avg_lead_time, current.avg_lead_time]
      : [current.avg_lead_time];

    const waitData = hasPrev
      ? [previous.avg_review_wait_hrs, current.avg_review_wait_hrs]
      : [current.avg_review_wait_hrs];

    if (chart1.current) chart1.current.destroy();
    if (chart2.current) chart2.current.destroy();

    chart1.current = new Chart(ref1.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Cycle time (days)",
            data: cycleData,
            backgroundColor: "#B5D4F4",
            borderRadius: 4,
          },
          {
            label: "Lead time (days)",
            data: leadData,
            backgroundColor: "#378ADD",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.05)" } },
          x: { ticks: { font: { size: 11 } }, grid: { display: false } },
        },
      },
    });

    chart2.current = new Chart(ref2.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Avg review wait (hrs)",
            data: waitData,
            backgroundColor: "#9FE1CB",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { font: { size: 11 } }, grid: { color: "rgba(0,0,0,0.05)" } },
          x: { ticks: { font: { size: 11 } }, grid: { display: false } },
        },
      },
    });

    return () => {
      if (chart1.current) chart1.current.destroy();
      if (chart2.current) chart2.current.destroy();
    };
  }, [current, previous]);

  const chartWrap = {
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
    padding: 14,
    flex: 1,
  };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={chartWrap}>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
          Cycle time vs lead time (days)
        </div>
        <div style={{ position: "relative", height: 160 }}>
          <canvas ref={ref1} role="img" aria-label="Bar chart comparing cycle time and lead time in days" />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: "#B5D4F4", display: "inline-block" }} />
            Cycle time
          </span>
          <span style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: "#378ADD", display: "inline-block" }} />
            Lead time
          </span>
        </div>
      </div>

      <div style={chartWrap}>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
          Avg PR review wait (hours)
        </div>
        <div style={{ position: "relative", height: 160 }}>
          <canvas ref={ref2} role="img" aria-label="Bar chart of average PR review wait time in hours" />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: "#9FE1CB", display: "inline-block" }} />
            Review wait hrs
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import ICView from "./components/ICView";
import ManagerView from "./components/ManagerView";

export default function App() {
  const [activeTab, setActiveTab] = useState("ic");

  const s = {
    page: { minHeight: "100vh", background: "#f0f2f5" },
    topbar: {
      background: "#fff", borderBottom: "0.5px solid rgba(0,0,0,0.1)",
      padding: "0 24px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 56,
    },
    logo: { fontSize: 16, fontWeight: 600, color: "#185FA5", letterSpacing: "-0.02em" },
    logoSub: { fontSize: 12, color: "#9ca3af", marginLeft: 6, fontWeight: 400 },
    tabs: { display: "flex", gap: 2 },
    tab: (active) => ({
      fontSize: 13, padding: "6px 14px", border: "none",
      background: active ? "#E6F1FB" : "transparent",
      color: active ? "#185FA5" : "#6b7280",
      borderRadius: 6, fontWeight: active ? 500 : 400,
      transition: "all 0.15s",
    }),
    main: { maxWidth: 860, margin: "0 auto", padding: "24px 16px" },
    card: {
      background: "#fff", borderRadius: 14,
      border: "0.5px solid rgba(0,0,0,0.08)",
      padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    },
    cardHeader: {
      marginBottom: 20, paddingBottom: 16,
      borderBottom: "0.5px solid rgba(0,0,0,0.08)",
    },
    cardTitle: { fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 },
    cardDesc: { fontSize: 13, color: "#6b7280" },
  };

  return (
    <div style={s.page}>
      {/* Top navigation bar */}
      <div style={s.topbar}>
        <div>
          <span style={s.logo}>DevPulse</span>
          <span style={s.logoSub}>Developer Productivity</span>
        </div>
        <div style={s.tabs}>
          <button style={s.tab(activeTab === "ic")} onClick={() => setActiveTab("ic")}>
            IC View
          </button>
          <button style={s.tab(activeTab === "manager")} onClick={() => setActiveTab("manager")}>
            Manager View
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={s.main}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            {activeTab === "ic" ? (
              <>
                <div style={s.cardTitle}>Individual Contributor View</div>
                <div style={s.cardDesc}>
                  Select a developer and month to see their metrics, understand what is happening, and get practical next steps.
                </div>
              </>
            ) : (
              <>
                <div style={s.cardTitle}>Manager View</div>
                <div style={s.cardDesc}>
                  Team-level summary across all managers and months. Use IC view to drill into individuals.
                </div>
              </>
            )}
          </div>

          {activeTab === "ic" ? <ICView /> : <ManagerView />}
        </div>
      </div>
    </div>
  );
}

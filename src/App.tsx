import React, { useState } from "react";
import { HomeScreen, LogScreen, ScoreScreen, StrategyScreen } from "./screens";

type TabKey = "home" | "score" | "log" | "strategy";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "홈" },
  { key: "score", label: "성적" },
  { key: "log", label: "로그" },
  { key: "strategy", label: "전략" },
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", paddingBottom: 72, fontFamily: "sans-serif" }}>
      {tab === "home" && <HomeScreen />}
      {tab === "score" && <ScoreScreen />}
      {tab === "log" && <LogScreen />}
      {tab === "strategy" && <StrategyScreen />}

      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          borderTop: "1px solid #e5e7eb",
          background: "#fff",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 8px",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              border: "none",
              background: "transparent",
              fontWeight: tab === t.key ? 700 : 400,
              color: tab === t.key ? "#2563eb" : "#374151",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

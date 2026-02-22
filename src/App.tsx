import React, { useState } from "react";
import { HomeScreen, LogScreen, ScoreScreen, StrategyScreen } from "./screens";
import { colors } from "./styles";
import { useHealth } from "./hooks";

type TabKey = "home" | "score" | "log" | "strategy";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "홈" },
  { key: "score", label: "성적" },
  { key: "log", label: "로그" },
  { key: "strategy", label: "전략" },
];

export default function App() {
  const [tab, setTab] = useState<TabKey>("home");
  const { status, source } = useHealth();

  const badgeColor =
    status === "ok" ? "#16A34A" : status === "error" ? "#DC2626" : "#64748B";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", paddingBottom: 72, fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif", background: colors.bg }}>
      <div style={{ padding: "10px 16px 0 16px", display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            fontSize: 12,
            border: `1px solid ${colors.border}`,
            background: "#fff",
            color: badgeColor,
            borderRadius: 999,
            padding: "4px 10px",
            fontWeight: 700,
          }}
        >
          DB {source.toUpperCase()} · {status.toUpperCase()}
        </span>
      </div>
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
          borderTop: `1px solid ${colors.border}`,
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
              color: tab === t.key ? colors.primary : "#374151",
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

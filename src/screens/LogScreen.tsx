import React from "react";
import { useLogs } from "../hooks/useLogs";
import { colors, ui } from "../styles";

const visibilityMap: Record<string, string> = {
  core: "✅ 대입 핵심",
  limited: "🟨 제한 가능",
  personal: "🟦 개인 기록",
};

export function LogScreen() {
  const { logs, loading, error } = useLogs();

  if (loading) return <div style={ui.page}>학생부 로그 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;

  return (
    <div style={ui.page}>
      <h2 style={ui.title}>학생부 로그</h2>
      {logs.map((l) => (
        <div key={l.id} style={ui.card}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <strong style={{ color: colors.text }}>{l.title}</strong>
            <span style={{ fontSize: 12, color: colors.subText }}>{l.date}</span>
          </div>
          <p style={{ margin: "8px 0 0 0", color: colors.subText, fontSize: 13 }}>{l.action}</p>
          <div style={{ marginTop: 8, fontSize: 12, color: colors.text }}>{visibilityMap[l.visibility]}</div>
        </div>
      ))}
    </div>
  );
}

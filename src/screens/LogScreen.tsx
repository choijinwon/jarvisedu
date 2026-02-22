import React from "react";
import { useLogs } from "../hooks/useLogs";
import { colors, typo, ui } from "../styles";

const visibilityMap: Record<string, { label: string; color: string }> = {
  core: { label: "✅ 대입 핵심", color: colors.success },
  limited: { label: "🟨 제한 가능", color: colors.warning },
  personal: { label: "🟦 개인 기록", color: colors.info },
};

export function LogScreen() {
  const { logs, loading, error } = useLogs();

  if (loading) return <div style={ui.page}>학생부 로그 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>학생부 로그</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>수업 기반 행동·배움·확장 포인트를 기록해요.</p>

      <div style={{ height: 8 }} />
      {logs.map((l) => (
        <div key={l.id} style={ui.card}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <strong style={{ ...typo.h2, fontSize: 15 }}>{l.title}</strong>
            <span style={typo.caption}>{l.date}</span>
          </div>
          <p style={{ margin: "8px 0 0 0", color: colors.subText, fontSize: 13, lineHeight: "20px" }}>{l.action}</p>
          <div style={{ marginTop: 10, display: "inline-block", fontSize: 12, color: visibilityMap[l.visibility].color, fontWeight: 700 }}>
            {visibilityMap[l.visibility].label}
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import { useScores } from "../hooks/useScores";
import { colors, ui } from "../styles";

export function ScoreScreen() {
  const { scores, loading, error } = useScores();

  if (loading) return <div style={ui.page}>성적 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;

  return (
    <div style={ui.page}>
      <h2 style={ui.title}>성적 트래커</h2>
      {scores.map((s) => (
        <div key={s.id} style={ui.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ color: colors.text }}>{s.subjectOrArea}</strong>
            <span
              style={{
                background: "#EFF6FF",
                color: colors.primary,
                padding: "4px 8px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {s.gradeLevel}등급
            </span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: colors.subText }}>
            {s.date} · {s.type} {s.semester ? `· ${s.semester}` : ""}
          </div>
          {s.memo && <div style={{ marginTop: 8, fontSize: 13, color: colors.text }}>{s.memo}</div>}
        </div>
      ))}
    </div>
  );
}

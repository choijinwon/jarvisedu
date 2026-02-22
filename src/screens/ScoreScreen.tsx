import React from "react";
import { useScores } from "../hooks/useScores";
import { colors, typo, ui } from "../styles";

export function ScoreScreen() {
  const { scores, loading, error } = useScores();

  if (loading) return <div style={ui.page}>성적 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>성적 트래커</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>내신·모의 입력 현황과 등급 추이를 빠르게 확인하세요.</p>

      <div style={{ height: 8 }} />
      {scores.map((s) => (
        <div key={s.id} style={ui.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ ...typo.caption }}>{s.type}</div>
              <strong style={{ ...typo.h2, display: "block", marginTop: 2 }}>{s.subjectOrArea}</strong>
            </div>
            <span style={{ background: colors.primarySoft, color: colors.primary, padding: "5px 10px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
              {s.gradeLevel}등급
            </span>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: colors.subText }}>{s.date} {s.semester ? `· ${s.semester}` : ""}</div>
          {s.memo && <div style={{ marginTop: 8, ...typo.body }}>{s.memo}</div>}
        </div>
      ))}
    </div>
  );
}

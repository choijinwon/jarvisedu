import React from "react";
import { useStrategy } from "../hooks/useStrategy";
import { colors, ui } from "../styles";

export function StrategyScreen() {
  const { strategy, loading, error, update } = useStrategy();

  if (loading) return <div style={ui.page}>전략 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;
  if (!strategy) return <div style={ui.page}>전략 데이터가 없습니다.</div>;

  return (
    <div style={ui.page}>
      <h2 style={ui.title}>전형 전략</h2>

      <div style={ui.card}>
        <div style={{ fontSize: 12, color: colors.subText }}>목표 전공</div>
        <div style={{ marginTop: 4, fontWeight: 700, color: colors.text }}>{strategy.targetMajor}</div>
      </div>

      <div style={ui.card}>
        <div style={{ fontSize: 12, color: colors.subText }}>현재 비중</div>
        <div style={{ marginTop: 4, color: colors.text }}>
          수시 <b>{strategy.susiWeight}</b> / 정시 <b>{strategy.jungsiWeight}</b>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button
            onClick={() => void update({ susiWeight: 80 })}
            style={{ border: "none", borderRadius: 10, padding: "8px 12px", background: colors.primary, color: "#fff", cursor: "pointer" }}
          >
            수시 80
          </button>
          <button
            onClick={() => void update({ susiWeight: 60 })}
            style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 12px", background: "#fff", color: colors.text, cursor: "pointer" }}
          >
            수시 60
          </button>
        </div>
      </div>

      <div style={ui.card}>
        <div style={{ fontSize: 12, color: colors.subText }}>전략 가설</div>
        <p style={{ margin: "8px 0 0 0", color: colors.text }}>{strategy.hypothesisText}</p>
      </div>
    </div>
  );
}

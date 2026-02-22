import React from "react";
import { useStrategy } from "../hooks/useStrategy";

export function StrategyScreen() {
  const { strategy, loading, error, update } = useStrategy();

  if (loading) return <div>전략 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!strategy) return <div>전략 데이터가 없습니다.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>전형 전략</h2>
      <p>목표 전공: {strategy.targetMajor}</p>
      <p>현재 비중: 수시 {strategy.susiWeight} / 정시 {strategy.jungsiWeight}</p>
      <button onClick={() => void update({ susiWeight: 80 })}>수시 80으로 변경</button>
      <pre>{strategy.hypothesisText}</pre>
    </div>
  );
}

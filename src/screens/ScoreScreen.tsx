import React from "react";
import { useScores } from "../hooks/useScores";

export function ScoreScreen() {
  const { scores, loading, error } = useScores();

  if (loading) return <div>성적 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>성적 트래커</h2>
      <ul>
        {scores.map((s) => (
          <li key={s.id}>
            {s.date} | {s.type} | {s.subjectOrArea} | {s.gradeLevel}등급
          </li>
        ))}
      </ul>
    </div>
  );
}

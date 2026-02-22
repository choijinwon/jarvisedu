import React from "react";
import { useLogs } from "../hooks/useLogs";

export function LogScreen() {
  const { logs, loading, error } = useLogs();

  if (loading) return <div>학생부 로그 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>학생부 로그</h2>
      <ul>
        {logs.map((l) => (
          <li key={l.id}>
            <strong>{l.title}</strong> ({l.date}) - {l.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
}

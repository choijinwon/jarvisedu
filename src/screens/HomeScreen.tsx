import React from "react";
import { useDashboard } from "../hooks/useDashboard";

export function HomeScreen() {
  const { data, loading, error, toggleTask, regenerateWeeklyTasks } = useDashboard();

  if (loading) return <div>대시보드 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>홈 대시보드</h2>
      <button onClick={() => void regenerateWeeklyTasks()}>주간 할 일 재생성</button>

      <h3>이번 주 할 일</h3>
      <ul>
        {data.weekTasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.checked}
                onChange={(e) => void toggleTask(t.id, e.target.checked)}
              />
              [{t.priority}] {t.title}
            </label>
          </li>
        ))}
      </ul>

      <h3>지표</h3>
      <pre>{JSON.stringify(data.metrics, null, 2)}</pre>

      <h3>알림</h3>
      <ul>
        {data.alerts.map((a) => (
          <li key={a.id}>[{a.severity}] {a.message}</li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { colors, typo, ui } from "../styles";

function priorityColor(priority: "high" | "medium" | "low") {
  if (priority === "high") return colors.danger;
  if (priority === "medium") return colors.warning;
  return colors.success;
}

export function HomeScreen() {
  const { data, loading, error, toggleTask, regenerateWeeklyTasks } = useDashboard();

  if (loading) return <div style={ui.page}>대시보드 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;
  if (!data) return <div style={ui.page}>데이터가 없습니다.</div>;

  return (
    <div style={ui.page}>
      <div style={{ ...ui.card, background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)", color: "#fff" }}>
        <p style={{ ...typo.caption, color: "#BFDBFE" }}>이번 주 집중</p>
        <h2 style={{ ...typo.h1, color: "#fff", marginTop: 6 }}>고등 진학 대시보드</h2>
        <p style={{ ...typo.body, color: "#DBEAFE", marginTop: 6 }}>수업 기반 기록 + 성적 추이를 한 화면에서 관리해요.</p>
      </div>

      <button onClick={() => void regenerateWeeklyTasks()} style={ui.buttonPrimary}>
        이번 주 할 일 재생성
      </button>

      <h3 style={ui.sectionTitle}>이번 주 할 일</h3>
      {data.weekTasks.map((t) => (
        <div key={t.id} style={ui.card}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={t.checked}
              onChange={(e) => void toggleTask(t.id, e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ ...typo.h2, fontSize: 15 }}>{t.title}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: priorityColor(t.priority), fontWeight: 700 }}>
                {t.priority.toUpperCase()} {t.dueText ? `· ${t.dueText}` : ""}
              </div>
            </div>
          </label>
        </div>
      ))}

      <h3 style={ui.sectionTitle}>핵심 지표</h3>
      {Object.entries(data.metrics).map(([k, v]) => (
        <div key={k} style={ui.card}>
          <div style={{ ...typo.caption, textTransform: "capitalize" }}>{k}</div>
          <div style={{ ...typo.h2, marginTop: 4 }}>{v.value}</div>
          <div style={{ ...typo.caption, marginTop: 6, color: colors.info }}>trend: {v.trend}</div>
        </div>
      ))}

      <h3 style={ui.sectionTitle}>리스크 알림</h3>
      {data.alerts.map((a) => (
        <div key={a.id} style={{ ...ui.card, borderLeft: `4px solid ${a.severity === "danger" ? colors.danger : a.severity === "warning" ? colors.warning : colors.info}` }}>
          <div style={{ ...typo.body }}>{a.message}</div>
          <div style={{ ...typo.caption, marginTop: 4 }}>
            {a.severity.toUpperCase()} {a.actionLabel ? `· ${a.actionLabel}` : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

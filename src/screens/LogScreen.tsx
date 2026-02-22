import React, { useMemo, useState } from "react";
import { useLogs } from "../hooks/useLogs";
import { colors, typo, ui } from "../styles";
import { AdmissionsVisibility } from "../types";

const visibilityMap: Record<string, { label: string; color: string }> = {
  core: { label: "✅ 대입 핵심", color: colors.success },
  limited: { label: "🟨 제한 가능", color: colors.warning },
  personal: { label: "🟦 개인 기록", color: colors.info },
};

export function LogScreen() {
  const { logs, loading, error, createLog } = useLogs();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [action, setAction] = useState("");
  const [learn, setLearn] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [visibility, setVisibility] = useState<AdmissionsVisibility>("core");
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => title.trim() && action.trim() && learn.trim() && nextStep.trim(), [title, action, learn, nextStep]);

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    try {
      await createLog({
        userId: "u1",
        date: new Date().toISOString().slice(0, 10),
        category: "교과",
        title,
        action,
        learn,
        nextStep,
        subjectTags: [],
        competencyTags: [],
        majorTags: [],
        visibility,
      });
      setTitle("");
      setAction("");
      setLearn("");
      setNextStep("");
      setVisibility("core");
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={ui.page}>학생부 로그 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>학생부 로그</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>수업 기반 행동·배움·확장 포인트를 기록해요.</p>

      <button onClick={() => setOpen((v) => !v)} style={{ ...ui.buttonPrimary, marginTop: 10 }}>
        {open ? "작성 닫기" : "+ 새 로그 작성"}
      </button>

      {open && (
        <div style={{ ...ui.card, marginTop: 10 }}>
          <input placeholder="활동명" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 10, borderRadius: 10, border: `1px solid ${colors.border}` }} />
          <textarea placeholder="내가 한 행동" value={action} onChange={(e) => setAction(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 10, borderRadius: 10, border: `1px solid ${colors.border}`, minHeight: 60 }} />
          <textarea placeholder="결과/배운 점" value={learn} onChange={(e) => setLearn(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 10, borderRadius: 10, border: `1px solid ${colors.border}`, minHeight: 60 }} />
          <input placeholder="다음 확장 1줄" value={nextStep} onChange={(e) => setNextStep(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 10, borderRadius: 10, border: `1px solid ${colors.border}` }} />

          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {(["core", "limited", "personal"] as AdmissionsVisibility[]).map((v) => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                style={{
                  border: `1px solid ${visibility === v ? colors.primary : colors.border}`,
                  background: visibility === v ? colors.primarySoft : "#fff",
                  borderRadius: 999,
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                {visibilityMap[v].label}
              </button>
            ))}
          </div>

          <button onClick={() => void handleSave()} disabled={!canSave || saving} style={{ ...ui.buttonPrimary, opacity: !canSave || saving ? 0.5 : 1 }}>
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      )}

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

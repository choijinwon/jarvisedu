import React, { useMemo, useState } from "react";
import { useSchools } from "../hooks/useSchools";
import { colors, typo, ui } from "../styles";
import { SchoolBucket } from "../types/schools";

export function SchoolListScreen() {
  const { schools, scores, addSchool } = useSchools();
  const [bucket, setBucket] = useState<"전체" | SchoolBucket>("전체");

  const list = useMemo(
    () => schools.filter((s) => bucket === "전체" || s.bucket === bucket),
    [schools, bucket]
  );

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>미래 학교 리스트</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>상향/적정/안정으로 목표 학교를 관리해요.</p>

      <div style={{ ...ui.card, marginTop: 10, display: "flex", gap: 8 }}>
        {(["전체", "상향", "적정", "안정"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBucket(b)}
            style={{
              border: `1px solid ${bucket === b ? colors.primary : colors.border}`,
              background: bucket === b ? colors.primarySoft : "#fff",
              borderRadius: 999,
              padding: "6px 10px",
              fontWeight: 700,
            }}
          >
            {b}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          addSchool({
            userId: "u1",
            schoolName: "고려대학교",
            majorName: "생명과학부",
            bucket: "상향",
            admissionType: "학생부종합",
            memo: "수학 내신 보완 필요",
          })
        }
        style={{ ...ui.buttonPrimary, marginTop: 10 }}
      >
        + 학교 추가(샘플)
      </button>

      <div style={{ height: 8 }} />
      {list.map((s) => {
        const fit = scores.find((f) => f.targetSchoolId === s.id)?.overallFit ?? 0;
        return (
          <div key={s.id} style={ui.card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={typo.h2}>{s.schoolName}</div>
                <div style={{ ...typo.caption, marginTop: 4 }}>{s.majorName} · {s.admissionType}</div>
              </div>
              <div style={{ fontWeight: 800, color: colors.primary }}>{fit}%</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: colors.subText }}>
              {s.bucket} · {s.memo ?? "메모 없음"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import { colors, typo, ui } from "../styles";

type BillingCycle = "monthly" | "yearly";

interface PricingScreenProps {
  cycle: BillingCycle;
  onChangeCycle: (v: BillingCycle) => void;
  onStartPro: () => void;
}

export function PricingScreen({ cycle, onChangeCycle, onStartPro }: PricingScreenProps) {
  const proPrice = cycle === "monthly" ? "₩12,900 / 월" : "₩119,000 / 년";

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>요금제</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>진학은 정보가 아니라 실행입니다.</p>

      <div style={{ ...ui.card, marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onChangeCycle("monthly")}
            style={{
              flex: 1,
              border: `1px solid ${cycle === "monthly" ? colors.primary : colors.border}`,
              background: cycle === "monthly" ? colors.primarySoft : "#fff",
              borderRadius: 10,
              padding: "8px 10px",
              fontWeight: 700,
            }}
          >
            월간
          </button>
          <button
            onClick={() => onChangeCycle("yearly")}
            style={{
              flex: 1,
              border: `1px solid ${cycle === "yearly" ? colors.primary : colors.border}`,
              background: cycle === "yearly" ? colors.primarySoft : "#fff",
              borderRadius: 10,
              padding: "8px 10px",
              fontWeight: 700,
            }}
          >
            연간
          </button>
        </div>
      </div>

      <div style={ui.card}>
        <div style={{ ...typo.h2 }}>Free</div>
        <ul style={{ margin: "8px 0 0 18px", color: colors.subText, fontSize: 14 }}>
          <li>학생부 로그 작성</li>
          <li>성적 입력/조회</li>
          <li>기본 대시보드</li>
          <li>월 1회 리포트</li>
        </ul>
      </div>

      <div style={{ ...ui.card, border: `2px solid ${colors.primary}` }}>
        <div style={{ ...typo.h2 }}>Pro</div>
        <div style={{ marginTop: 4, fontWeight: 800, color: colors.primary }}>{proPrice}</div>
        <ul style={{ margin: "8px 0 0 18px", color: colors.subText, fontSize: 14 }}>
          <li>주간 액션 플랜 무제한</li>
          <li>리포트 PDF 무제한</li>
          <li>전형 전략 비교</li>
          <li>부모 공유 링크</li>
          <li>리마인드 알림</li>
        </ul>

        <button onClick={onStartPro} style={{ ...ui.buttonPrimary, marginTop: 12 }}>
          Pro 시작하기
        </button>
      </div>
    </div>
  );
}

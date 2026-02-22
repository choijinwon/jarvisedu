import React from "react";
import { useEntitlements, useStrategy } from "../hooks";
import { colors, typo, ui } from "../styles";
import { useReport } from "../hooks/useReport";
import { openReportPrintView } from "../utils/pdf";

export function StrategyScreen() {
  const { strategy, loading, error, update } = useStrategy();
  const { report, loading: reportLoading, generate } = useReport();
  const { entitlements } = useEntitlements();

  const monthKey = new Date().toISOString().slice(0, 7);
  const usageKey = `jarvisedu_report_usage_${monthKey}`;
  const usedCount = Number(localStorage.getItem(usageKey) || "0");
  const isLimited = !entitlements.canUseUnlimitedReports;
  const reachedLimit = isLimited && usedCount >= entitlements.monthlyReportLimit;

  const handleGeneratePdf = async () => {
    if (reachedLimit) {
      alert("Free 플랜은 월 1회 리포트만 생성할 수 있어요. 요금 탭에서 Pro 시뮬레이션을 켜보세요.");
      return;
    }
    const r = await generate();
    localStorage.setItem(usageKey, String(usedCount + 1));
    openReportPrintView(r);
  };

  if (loading) return <div style={ui.page}>전략 불러오는 중...</div>;
  if (error) return <div style={ui.page}>오류: {error}</div>;
  if (!strategy) return <div style={ui.page}>전략 데이터가 없습니다.</div>;

  return (
    <div style={ui.page}>
      <h2 style={typo.h1}>전형 전략</h2>
      <p style={{ ...typo.caption, marginTop: 6 }}>수시/정시 비중을 빠르게 조정하고 전략 가설을 확인하세요.</p>

      <div style={{ ...ui.card, marginTop: 10 }}>
        <div style={typo.caption}>목표 전공</div>
        <div style={{ ...typo.h2, marginTop: 4 }}>{strategy.targetMajor}</div>
      </div>

      <div style={ui.card}>
        <div style={typo.caption}>현재 비중</div>
        <div style={{ marginTop: 4, ...typo.body }}>
          수시 <b>{strategy.susiWeight}</b> / 정시 <b>{strategy.jungsiWeight}</b>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button onClick={() => void update({ susiWeight: 80 })} style={{ border: "none", borderRadius: 10, padding: "8px 12px", background: colors.primary, color: "#fff", cursor: "pointer", fontWeight: 700 }}>
            수시 80
          </button>
          <button onClick={() => void update({ susiWeight: 60 })} style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: "8px 12px", background: "#fff", color: colors.text, cursor: "pointer", fontWeight: 700 }}>
            수시 60
          </button>
        </div>
      </div>

      <div style={ui.card}>
        <div style={typo.caption}>전략 가설</div>
        <p style={{ ...typo.body, marginTop: 8 }}>{strategy.hypothesisText}</p>
      </div>

      <button onClick={() => void handleGeneratePdf()} style={{ ...ui.buttonPrimary, opacity: reachedLimit ? 0.6 : 1 }} disabled={reportLoading || reachedLimit}>
        {reportLoading ? "리포트 생성 중..." : reachedLimit ? "Free 월간 한도 도달" : "상담 리포트 PDF 생성"}
      </button>
      <p style={{ ...typo.caption, marginTop: 6 }}>
        {isLimited ? `Free 사용량: ${usedCount}/${entitlements.monthlyReportLimit}` : "Pro: 리포트 무제한"}
      </p>

      {report && (
        <div style={{ ...ui.card, marginTop: 10 }}>
          <div style={typo.caption}>최근 생성 리포트</div>
          <div style={{ ...typo.body, marginTop: 6 }}>{report.summaryText}</div>
        </div>
      )}
    </div>
  );
}

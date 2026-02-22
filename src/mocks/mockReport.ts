import { ReportSnapshot } from "../types";

export const mockReport: ReportSnapshot = {
  id: "r1",
  userId: "u1",
  generatedAt: "2026-03-16T09:30:00.000Z",
  summaryText: "생명과학 기반 탐구 활동이 강점이며, 수학 성적 변동성과 모의 입력 간격이 리스크다. 다음 2주 내 수업 기반 기록 2건과 수학 오답 유형 정리가 필요하다.",
  topLogs: ["l1", "l2"],
  gaps: ["수학 하락 추세", "모의 기록 주기 불균형"],
  nextTasks: ["수업 기반 로그 2건 작성", "수학 오답 유형 3개 태그화", "모의 성적 업데이트", "전공-과목 연결 문장 보완", "상담 리포트 공유본 생성"],
  pdfUrl: "https://example.com/reports/r1.pdf"
};

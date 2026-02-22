import { ReportSnapshot } from "../types";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function openReportPrintView(report: ReportSnapshot) {
  const html = `
<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>상담 리포트</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; color:#111827; }
h1 { margin:0 0 6px 0; }
small { color:#6B7280; }
.section { margin-top: 20px; }
ul { margin: 8px 0 0 18px; }
.card { border:1px solid #E5E7EB; border-radius: 12px; padding: 12px; }
</style>
</head>
<body>
  <h1>진학 상담 리포트</h1>
  <small>생성일: ${escapeHtml(new Date(report.generatedAt).toLocaleString("ko-KR"))}</small>

  <div class="section card">
    <strong>요약</strong>
    <p>${escapeHtml(report.summaryText)}</p>
  </div>

  <div class="section card">
    <strong>리스크 / 공백</strong>
    <ul>
      ${report.gaps.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}
    </ul>
  </div>

  <div class="section card">
    <strong>다음 2주 액션</strong>
    <ul>
      ${report.nextTasks.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
    </ul>
  </div>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (!w) throw new Error("팝업이 차단되었습니다.");
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print();
}

import { DashboardData } from "../types";
import { mockTasks } from "./mockTasks";

export const mockDashboard: DashboardData = {
  weekTasks: mockTasks,
  metrics: {
    gpaTrend: { value: "최근 내신 평균 2.8", trend: "down" },
    mockTrend: { value: "최근 모의 평균 3.0", trend: "flat" },
    logCount14d: { value: "최근 14일 로그 2건", trend: "up" },
    strategyState: { value: "수시 70 / 정시 30", trend: "none" }
  },
  alerts: [
    { id: "a1", severity: "warning", message: "수학 최근 2회 하락", actionLabel: "오답 분석하기" },
    { id: "a2", severity: "info", message: "리포트 생성 후 32일 경과", actionLabel: "새 리포트 만들기" }
  ]
};

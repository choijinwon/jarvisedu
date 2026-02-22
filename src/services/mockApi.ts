import {
  AlertItem,
  DashboardData,
  LogEntry,
  ReportSnapshot,
  ScoreEntry,
  StrategyState,
  Task,
  UserProfile,
} from "../types";

import { mockUser } from "../mocks/mockUser";
import { mockScores } from "../mocks/mockScores";
import { mockLogs } from "../mocks/mockLogs";
import { mockTasks } from "../mocks/mockTasks";
import { mockDashboard } from "../mocks/mockDashboard";
import { mockStrategy } from "../mocks/mockStrategy";
import { mockReport } from "../mocks/mockReport";

let userDB: UserProfile = { ...mockUser };
let scoresDB: ScoreEntry[] = [...mockScores];
let logsDB: LogEntry[] = [...mockLogs];
let tasksDB: Task[] = [...mockTasks];
let strategyDB: StrategyState = { ...mockStrategy };
let reportsDB: ReportSnapshot[] = [{ ...mockReport }];

const LATENCY = 350;

function wait(ms = LATENCY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function startOfWeekISO(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function calcTrend(values: number[]): "up" | "down" | "flat" | "none" {
  if (values.length < 2) return "none";
  const a = values[values.length - 2];
  const b = values[values.length - 1];
  if (b > a) return "down";
  if (b < a) return "up";
  return "flat";
}

function average(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((acc, n) => acc + n, 0) / nums.length;
}

function daysDiff(fromISO: string, toISO: string) {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  return Math.floor((to - from) / (1000 * 60 * 60 * 24));
}

function recomputeDashboard(): DashboardData {
  const now = todayISODate();
  const weekStart = startOfWeekISO();
  const weekTasks = tasksDB.filter((t) => t.weekStart === weekStart).slice(0, 3);

  const naesin = scoresDB.filter((s) => s.type === "내신").sort((a, b) => a.date.localeCompare(b.date));
  const mock = scoresDB.filter((s) => s.type === "모의").sort((a, b) => a.date.localeCompare(b.date));

  const naesinGrades = naesin.map((s) => s.gradeLevel);
  const mockGrades = mock.map((s) => s.gradeLevel);

  const naesinAvg = average(naesinGrades);
  const mockAvg = average(mockGrades);

  const gpaTrend = calcTrend(naesinGrades);
  const mockTrend = calcTrend(mockGrades);

  const logs14 = logsDB.filter((l) => daysDiff(l.date, now) <= 14 && daysDiff(l.date, now) >= 0);
  const alerts: AlertItem[] = [];

  if (logs14.length === 0) {
    alerts.push({ id: uid("a"), severity: "warning", message: "최근 14일 학생부 로그가 없어요", actionLabel: "기록 시작" });
  }

  const latestMock = mock[mock.length - 1];
  if (!latestMock || daysDiff(latestMock.date, now) > 60) {
    alerts.push({ id: uid("a"), severity: "warning", message: "모의 성적 입력이 60일 이상 비어 있어요", actionLabel: "모의 입력" });
  }

  const sortedReports = reportsDB.sort((a, b) => a.generatedAt.localeCompare(b.generatedAt));
  const latestReport = sortedReports[sortedReports.length - 1];
  if (latestReport) {
    const reportDate = latestReport.generatedAt.slice(0, 10);
    if (daysDiff(reportDate, now) > 30) {
      alerts.push({ id: uid("a"), severity: "info", message: `리포트 생성 후 ${daysDiff(reportDate, now)}일 경과`, actionLabel: "새 리포트 만들기" });
    }
  }

  return {
    weekTasks: weekTasks.length ? weekTasks : mockDashboard.weekTasks,
    metrics: {
      gpaTrend: { value: naesinGrades.length ? `최근 내신 평균 ${naesinAvg.toFixed(1)}` : "내신 기록 없음", trend: naesinGrades.length ? gpaTrend : "none" },
      mockTrend: { value: mockGrades.length ? `최근 모의 평균 ${mockAvg.toFixed(1)}` : "모의 기록 없음", trend: mockGrades.length ? mockTrend : "none" },
      logCount14d: { value: `최근 14일 로그 ${logs14.length}건`, trend: logs14.length > 0 ? "up" : "none" },
      strategyState: { value: `수시 ${strategyDB.susiWeight} / 정시 ${strategyDB.jungsiWeight}`, trend: "none" },
    },
    alerts: alerts.length ? alerts : mockDashboard.alerts,
  };
}

export const mockApi = {
  async getUser(): Promise<UserProfile> {
    await wait();
    return { ...userDB };
  },

  async updateUser(patch: Partial<UserProfile>): Promise<UserProfile> {
    await wait();
    userDB = { ...userDB, ...patch };
    return { ...userDB };
  },

  async getDashboard(): Promise<DashboardData> {
    await wait();
    return recomputeDashboard();
  },

  async listScores(type?: "내신" | "모의"): Promise<ScoreEntry[]> {
    await wait();
    const rows = type ? scoresDB.filter((s) => s.type === type) : scoresDB;
    return [...rows].sort((a, b) => b.date.localeCompare(a.date));
  },

  async createScore(input: Omit<ScoreEntry, "id">): Promise<ScoreEntry> {
    await wait();
    const row: ScoreEntry = { id: uid("s"), ...input };
    scoresDB.unshift(row);
    return row;
  },

  async updateScore(id: string, patch: Partial<ScoreEntry>): Promise<ScoreEntry> {
    await wait();
    const idx = scoresDB.findIndex((s) => s.id === id);
    if (idx < 0) throw new Error("Score not found");
    scoresDB[idx] = { ...scoresDB[idx], ...patch };
    return scoresDB[idx];
  },

  async deleteScore(id: string): Promise<{ ok: true }> {
    await wait();
    scoresDB = scoresDB.filter((s) => s.id !== id);
    return { ok: true };
  },

  async listLogs(): Promise<LogEntry[]> {
    await wait();
    return [...logsDB].sort((a, b) => b.date.localeCompare(a.date));
  },

  async createLog(input: Omit<LogEntry, "id">): Promise<LogEntry> {
    await wait();
    const row: LogEntry = { id: uid("l"), ...input };
    logsDB.unshift(row);
    return row;
  },

  async updateLog(id: string, patch: Partial<LogEntry>): Promise<LogEntry> {
    await wait();
    const idx = logsDB.findIndex((l) => l.id === id);
    if (idx < 0) throw new Error("Log not found");
    logsDB[idx] = { ...logsDB[idx], ...patch };
    return logsDB[idx];
  },

  async deleteLog(id: string): Promise<{ ok: true }> {
    await wait();
    logsDB = logsDB.filter((l) => l.id !== id);
    return { ok: true };
  },

  async listTasks(weekStart = startOfWeekISO()): Promise<Task[]> {
    await wait();
    return tasksDB.filter((t) => t.weekStart === weekStart);
  },

  async toggleTask(taskId: string, checked: boolean): Promise<Task> {
    await wait();
    const idx = tasksDB.findIndex((t) => t.id === taskId);
    if (idx < 0) throw new Error("Task not found");
    tasksDB[idx] = { ...tasksDB[idx], checked };
    return tasksDB[idx];
  },

  async generateWeeklyTasks(): Promise<Task[]> {
    await wait();
    const weekStart = startOfWeekISO();
    const now = todayISODate();
    tasksDB = tasksDB.filter((t) => t.weekStart !== weekStart);
    const newTasks: Task[] = [];

    const logs14 = logsDB.filter((l) => daysDiff(l.date, now) <= 14 && daysDiff(l.date, now) >= 0);
    if (logs14.length === 0) {
      newTasks.push({ id: uid("t"), userId: userDB.id, weekStart, title: "수업 기반 학생부 로그 2건 작성", priority: "high", checked: false, linkedType: "log", ruleCode: "R001_NO_LOG_14D", dueText: "이번 주" });
    }

    const mockList = scoresDB.filter((s) => s.type === "모의").sort((a, b) => a.date.localeCompare(b.date));
    const latestMock = mockList[mockList.length - 1];
    if (!latestMock || daysDiff(latestMock.date, now) > 60) {
      newTasks.push({ id: uid("t"), userId: userDB.id, weekStart, title: "최근 모의 성적 1회 입력 + 강약점 1줄", priority: "high", checked: false, linkedType: "score", ruleCode: "R002_NO_MOCK_60D", dueText: "금요일까지" });
    }

    if (strategyDB.targetMajor && strategyDB.susiWeight + strategyDB.jungsiWeight === 100) {
      newTasks.push({ id: uid("t"), userId: userDB.id, weekStart, title: `전공-과목 연결 문장 3줄 보강 (${strategyDB.targetMajor})`, priority: "medium", checked: false, linkedType: "strategy", ruleCode: "R007_MAJOR_SUBJECT_LINK", dueText: null });
    }

    if (newTasks.length === 0) {
      newTasks.push({ id: uid("t"), userId: userDB.id, weekStart, title: "이번 주 상담 리포트 업데이트", priority: "medium", checked: false, linkedType: "strategy", ruleCode: "R099_REPORT_REFRESH", dueText: "주말 전" });
    }

    tasksDB.push(...newTasks);
    return newTasks;
  },

  async getStrategy(): Promise<StrategyState> {
    await wait();
    return { ...strategyDB };
  },

  async updateStrategy(patch: Partial<StrategyState>): Promise<StrategyState> {
    await wait();
    strategyDB = { ...strategyDB, ...patch };
    if (typeof strategyDB.susiWeight === "number" && typeof strategyDB.jungsiWeight === "number") {
      const sum = strategyDB.susiWeight + strategyDB.jungsiWeight;
      if (sum !== 100) strategyDB.jungsiWeight = Math.max(0, 100 - strategyDB.susiWeight);
    }
    return { ...strategyDB };
  },

  async listReports(): Promise<ReportSnapshot[]> {
    await wait();
    return [...reportsDB].sort((a, b) => b.generatedAt.localeCompare(a.generatedAt));
  },

  async generateReport(): Promise<ReportSnapshot> {
    await wait();
    const latestLogs = [...logsDB].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((l) => l.id);
    const naesin = scoresDB.filter((s) => s.type === "내신").map((s) => s.gradeLevel);
    const mock = scoresDB.filter((s) => s.type === "모의").map((s) => s.gradeLevel);

    const gaps: string[] = [];
    if (!logsDB.length) gaps.push("학생부 로그 부족");
    if (naesin.length && calcTrend(naesin) === "down") gaps.push("내신 하락 추세");
    if (mock.length && calcTrend(mock) === "down") gaps.push("모의 하락 추세");

    const report: ReportSnapshot = {
      id: uid("r"),
      userId: userDB.id,
      generatedAt: new Date().toISOString(),
      summaryText: "수업 기반 기록과 성적 추이를 종합한 요약입니다. 강점은 최근 교과 활동의 구체성, 보완점은 하락 과목의 원인 태깅 및 주간 루틴 유지입니다.",
      topLogs: latestLogs,
      gaps: gaps.length ? gaps : ["뚜렷한 리스크 없음"],
      nextTasks: ["수업 기반 로그 2건 작성", "하락 과목 오답 유형 3개 태깅", "모의 성적 최신화", "전공-과목 연결 문장 보강", "상담 공유용 PDF 저장"],
      pdfUrl: `https://example.com/reports/${Date.now()}.pdf`,
    };

    reportsDB.unshift(report);
    return report;
  },

  async reset(): Promise<{ ok: true }> {
    await wait(100);
    userDB = { ...mockUser };
    scoresDB = [...mockScores];
    logsDB = [...mockLogs];
    tasksDB = [...mockTasks];
    strategyDB = { ...mockStrategy };
    reportsDB = [{ ...mockReport }];
    return { ok: true };
  },
};

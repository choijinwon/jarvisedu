export type GradeLevel = "고1" | "고2" | "고3";
export type TrackPref = "수시" | "정시" | "미정";
export type ConcernFocus = "내신" | "모의" | "학생부" | "전형전략";

export type ScoreType = "내신" | "모의";
export type Trend = "up" | "down" | "flat" | "none";
export type Tone = "default" | "warning" | "danger";
export type Priority = "high" | "medium" | "low";

export type AdmissionsVisibility = "core" | "limited" | "personal";
export type Severity = "info" | "warning" | "danger";
export type LinkedType = "log" | "score" | "strategy" | "none";

export interface UserProfile {
  id: string;
  grade: GradeLevel;
  interestTags: string[];
  trackPref: TrackPref;
  concernFocus: ConcernFocus;
}

export interface ScoreEntry {
  id: string;
  userId: string;
  type: ScoreType;
  date: string;
  semester?: string;
  subjectOrArea: string;
  gradeLevel: number;
  rawScore?: number | null;
  memo?: string;
}

export interface LogEntry {
  id: string;
  userId: string;
  date: string;
  category: "교과" | "동아리" | "진로" | "봉사" | "기타";
  title: string;
  action: string;
  learn: string;
  nextStep: string;
  subjectTags: string[];
  competencyTags: string[];
  majorTags: string[];
  visibility: AdmissionsVisibility;
}

export interface Task {
  id: string;
  userId: string;
  weekStart: string;
  title: string;
  priority: Priority;
  checked: boolean;
  linkedType: LinkedType;
  linkedLogId?: string | null;
  ruleCode?: string;
  dueText?: string | null;
}

export interface Metric {
  value: string;
  trend: Trend;
}

export interface DashboardMetrics {
  gpaTrend: Metric;
  mockTrend: Metric;
  logCount14d: Metric;
  strategyState: Metric;
}

export interface AlertItem {
  id: string;
  severity: Severity;
  message: string;
  actionLabel?: string | null;
}

export interface DashboardData {
  weekTasks: Task[];
  metrics: DashboardMetrics;
  alerts: AlertItem[];
}

export interface StrategyState {
  userId: string;
  targetMajor: string;
  targetReasonKeywords: string[];
  susiWeight: number;
  jungsiWeight: number;
  hypothesisText: string;
}

export interface ReportSnapshot {
  id: string;
  userId: string;
  generatedAt: string;
  summaryText: string;
  topLogs: string[];
  gaps: string[];
  nextTasks: string[];
  pdfUrl?: string;
}

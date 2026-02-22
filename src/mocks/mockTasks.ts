import { Task } from "../types";

export const mockTasks: Task[] = [
  { id: "t1", userId: "u1", weekStart: "2026-03-16", title: "수업 기반 학생부 로그 2건 작성", priority: "high", checked: false, linkedType: "log", ruleCode: "R001_NO_LOG_14D", dueText: "이번 주" },
  { id: "t2", userId: "u1", weekStart: "2026-03-16", title: "수학 오답 유형 3개 태그화(개념/시간/실수)", priority: "high", checked: false, linkedType: "score", ruleCode: "R004_SUBJECT_DOWN_2X", dueText: "목요일까지" },
  { id: "t3", userId: "u1", weekStart: "2026-03-16", title: "전공-과목 연결 3줄 작성(의생명 ↔ 생명과학)", priority: "medium", checked: true, linkedType: "strategy", ruleCode: "R007_MAJOR_SUBJECT_LINK", dueText: null }
];

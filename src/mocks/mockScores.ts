import { ScoreEntry } from "../types";

export const mockScores: ScoreEntry[] = [
  { id: "s1", userId: "u1", type: "내신", date: "2026-03-10", semester: "2026-1", subjectOrArea: "수학", gradeLevel: 3, rawScore: 84, memo: "함수 단원 실수 많음" },
  { id: "s2", userId: "u1", type: "내신", date: "2026-03-10", semester: "2026-1", subjectOrArea: "생명과학", gradeLevel: 2, rawScore: 91 },
  { id: "s3", userId: "u1", type: "내신", date: "2025-12-20", semester: "2025-2", subjectOrArea: "수학", gradeLevel: 2, rawScore: 89 },
  { id: "s4", userId: "u1", type: "모의", date: "2026-03-15", subjectOrArea: "국어", gradeLevel: 3, memo: "비문학 시간 부족" },
  { id: "s5", userId: "u1", type: "모의", date: "2026-03-15", subjectOrArea: "수학", gradeLevel: 4, memo: "확통 계산 실수" },
  { id: "s6", userId: "u1", type: "모의", date: "2026-03-15", subjectOrArea: "영어", gradeLevel: 2 }
];

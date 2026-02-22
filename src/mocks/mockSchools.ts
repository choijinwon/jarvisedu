import { SchoolFitScore, TargetSchool } from "../types/schools";

export const mockSchools: TargetSchool[] = [
  {
    id: "ts1",
    userId: "u1",
    schoolName: "한양대학교",
    majorName: "생명공학과",
    bucket: "적정",
    admissionType: "학생부종합",
    memo: "세특 탐구근거 강화 필요",
  },
  {
    id: "ts2",
    userId: "u1",
    schoolName: "서울대학교",
    majorName: "생명과학부",
    bucket: "상향",
    admissionType: "학생부종합",
  },
];

export const mockSchoolScores: SchoolFitScore[] = [
  { id: "sf1", targetSchoolId: "ts1", gpaFit: 72, csatFit: 64, recordFit: 78, overallFit: 71 },
  { id: "sf2", targetSchoolId: "ts2", gpaFit: 61, csatFit: 55, recordFit: 70, overallFit: 62 },
];

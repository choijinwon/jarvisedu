export type SchoolBucket = "상향" | "적정" | "안정";

export interface TargetSchool {
  id: string;
  userId: string;
  schoolName: string;
  majorName: string;
  bucket: SchoolBucket;
  admissionType: string;
  memo?: string;
  createdAt?: string;
}

export interface SchoolFitScore {
  id: string;
  targetSchoolId: string;
  gpaFit: number;
  csatFit: number;
  recordFit: number;
  overallFit: number;
  updatedAt?: string;
}

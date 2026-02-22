import { useCallback, useEffect, useState } from "react";
import { mockSchoolScores, mockSchools } from "../mocks/mockSchools";
import { SchoolFitScore, TargetSchool } from "../types/schools";

export function useSchools() {
  const [schools, setSchools] = useState<TargetSchool[]>([]);
  const [scores, setScores] = useState<SchoolFitScore[]>([]);

  useEffect(() => {
    setSchools(mockSchools);
    setScores(mockSchoolScores);
  }, []);

  const addSchool = useCallback((item: Omit<TargetSchool, "id">) => {
    const id = `ts_${Math.random().toString(36).slice(2, 8)}`;
    setSchools((prev) => [{ ...item, id }, ...prev]);
    setScores((prev) => [
      {
        id: `sf_${Math.random().toString(36).slice(2, 8)}`,
        targetSchoolId: id,
        gpaFit: 60,
        csatFit: 60,
        recordFit: 60,
        overallFit: 60,
      },
      ...prev,
    ]);
  }, []);

  return { schools, scores, addSchool };
}

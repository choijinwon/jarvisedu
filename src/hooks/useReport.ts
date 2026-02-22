import { useCallback, useState } from "react";
import { ReportSnapshot } from "../types";
import { mockApi } from "../services/mockApi";

export function useReport() {
  const [report, setReport] = useState<ReportSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const r = await mockApi.generateReport();
      setReport(r);
      return r;
    } catch (e) {
      setError(e instanceof Error ? e.message : "리포트 생성 실패");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { report, loading, error, generate };
}

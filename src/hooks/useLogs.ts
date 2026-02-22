import { useCallback, useEffect, useState } from "react";
import { LogEntry } from "../types";
import { dataApi } from "../services/dataApi";

export type CreateLogInput = Omit<LogEntry, "id">;

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rows = await dataApi.listLogs();
      setLogs(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load logs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const createLog = useCallback(async (input: CreateLogInput) => {
    await dataApi.createLog(input);
    await load();
  }, [load]);

  return { logs, loading, error, reload: load, createLog };
}

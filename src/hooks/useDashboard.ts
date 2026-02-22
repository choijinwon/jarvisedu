import { useCallback, useEffect, useState } from "react";
import { DashboardData } from "../types";
import { dataApi } from "../services/dataApi";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await dataApi.getDashboard();
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleTask = useCallback(async (taskId: string, checked: boolean) => {
    await dataApi.toggleTask(taskId, checked);
    await load();
  }, [load]);

  const regenerateWeeklyTasks = useCallback(async () => {
    await dataApi.generateWeeklyTasks();
    await load();
  }, [load]);

  return {
    data,
    loading,
    error,
    reload: load,
    toggleTask,
    regenerateWeeklyTasks,
  };
}

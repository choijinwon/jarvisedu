import { useCallback, useEffect, useState } from "react";
import { StrategyState } from "../types";
import { mockApi } from "../services/mockApi";

export function useStrategy() {
  const [strategy, setStrategy] = useState<StrategyState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getStrategy();
      setStrategy(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load strategy");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const update = useCallback(async (patch: Partial<StrategyState>) => {
    const updated = await mockApi.updateStrategy(patch);
    setStrategy(updated);
    return updated;
  }, []);

  return { strategy, loading, error, reload: load, update };
}

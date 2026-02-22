import { useCallback, useEffect, useState } from "react";
import { ScoreEntry, ScoreType } from "../types";
import { dataApi } from "../services/dataApi";

export function useScores(type?: ScoreType) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rows = await dataApi.listScores(type);
      setScores(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load scores");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    void load();
  }, [load]);

  return { scores, loading, error, reload: load };
}

import { useEffect, useState } from "react";
import { hasSupabaseEnv } from "../lib/supabase";
import { dataApi } from "../services/dataApi";

export function useHealth() {
  const [status, setStatus] = useState<"checking" | "ok" | "error">("checking");
  const [source, setSource] = useState<"supabase" | "mock">(hasSupabaseEnv ? "supabase" : "mock");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await dataApi.getUser();
        if (!mounted) return;
        setStatus("ok");
      } catch {
        if (!mounted) return;
        setStatus("error");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { status, source };
}

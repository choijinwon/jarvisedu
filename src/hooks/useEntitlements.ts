import { useMemo, useState } from "react";
import { getCurrentPlan, getEntitlements, Plan, setCurrentPlan } from "../lib/entitlements";

export function useEntitlements() {
  const [plan, setPlan] = useState<Plan>(() => getCurrentPlan());

  const entitlements = useMemo(() => getEntitlements(plan), [plan]);

  const upgradeToPro = () => {
    setCurrentPlan("pro");
    setPlan("pro");
  };

  const downgradeToFree = () => {
    setCurrentPlan("free");
    setPlan("free");
  };

  return {
    plan,
    entitlements,
    upgradeToPro,
    downgradeToFree,
  };
}

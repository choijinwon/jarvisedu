export type Plan = "free" | "pro";

export interface Entitlements {
  plan: Plan;
  monthlyReportLimit: number;
  canUseUnlimitedReports: boolean;
  canUseStrategyCompare: boolean;
  canUseParentShare: boolean;
  canUseAdvancedReminders: boolean;
}

const KEY = "jarvisedu_plan";

export function getCurrentPlan(): Plan {
  const v = localStorage.getItem(KEY);
  return v === "pro" ? "pro" : "free";
}

export function setCurrentPlan(plan: Plan) {
  localStorage.setItem(KEY, plan);
}

export function getEntitlements(plan: Plan): Entitlements {
  if (plan === "pro") {
    return {
      plan,
      monthlyReportLimit: -1,
      canUseUnlimitedReports: true,
      canUseStrategyCompare: true,
      canUseParentShare: true,
      canUseAdvancedReminders: true,
    };
  }

  return {
    plan,
    monthlyReportLimit: 1,
    canUseUnlimitedReports: false,
    canUseStrategyCompare: false,
    canUseParentShare: false,
    canUseAdvancedReminders: false,
  };
}

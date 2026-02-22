import {
  DashboardData,
  LogEntry,
  ReportSnapshot,
  ScoreEntry,
  StrategyState,
  Task,
  UserProfile,
} from "../types";
import { supabase } from "../lib/supabase";
import { mockApi } from "./mockApi";

const USER_ID = "u1";

function requireClient() {
  if (!supabase) throw new Error("Supabase env not configured");
  return supabase;
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const supabaseApi = {
  async getUser(): Promise<UserProfile> {
    const db = requireClient();
    const { data, error } = await db.from("user_profiles").select("*").eq("id", USER_ID).maybeSingle();
    if (error) throw error;
    if (!data) {
      const seed = await mockApi.getUser();
      await db.from("user_profiles").insert({
        id: seed.id,
        grade: seed.grade,
        interest_tags: seed.interestTags,
        track_pref: seed.trackPref,
        concern_focus: seed.concernFocus,
      });
      return seed;
    }
    return {
      id: data.id,
      grade: data.grade,
      interestTags: data.interest_tags,
      trackPref: data.track_pref,
      concernFocus: data.concern_focus,
    };
  },

  async getDashboard(): Promise<DashboardData> {
    // lightweight: reuse mock computed dashboard until backend rules engine exists
    return mockApi.getDashboard();
  },

  async listScores(type?: "내신" | "모의"): Promise<ScoreEntry[]> {
    const db = requireClient();
    let q = db.from("score_entries").select("*").eq("user_id", USER_ID).order("date", { ascending: false });
    if (type) q = q.eq("type", type);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      userId: r.user_id,
      type: r.type,
      date: r.date,
      semester: r.semester ?? undefined,
      subjectOrArea: r.subject_or_area,
      gradeLevel: r.grade_level,
      rawScore: r.raw_score,
      memo: r.memo ?? undefined,
    }));
  },

  async createLog(input: Omit<LogEntry, "id">): Promise<LogEntry> {
    const db = requireClient();
    const row = {
      id: uid("l"),
      user_id: USER_ID,
      date: input.date,
      category: input.category,
      title: input.title,
      action: input.action,
      learn: input.learn,
      next_step: input.nextStep,
      subject_tags: input.subjectTags,
      competency_tags: input.competencyTags,
      major_tags: input.majorTags,
      visibility: input.visibility,
    };
    const { error } = await db.from("log_entries").insert(row);
    if (error) throw error;
    return { ...input, id: row.id };
  },

  async listLogs(): Promise<LogEntry[]> {
    const db = requireClient();
    const { data, error } = await db.from("log_entries").select("*").eq("user_id", USER_ID).order("date", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      userId: r.user_id,
      date: r.date,
      category: r.category,
      title: r.title,
      action: r.action,
      learn: r.learn,
      nextStep: r.next_step,
      subjectTags: r.subject_tags ?? [],
      competencyTags: r.competency_tags ?? [],
      majorTags: r.major_tags ?? [],
      visibility: r.visibility,
    }));
  },

  async getStrategy(): Promise<StrategyState> {
    const db = requireClient();
    const { data, error } = await db.from("strategy_states").select("*").eq("user_id", USER_ID).maybeSingle();
    if (error) throw error;
    if (!data) return mockApi.getStrategy();
    return {
      userId: data.user_id,
      targetMajor: data.target_major,
      targetReasonKeywords: data.target_reason_keywords ?? [],
      susiWeight: data.susi_weight,
      jungsiWeight: data.jungsi_weight,
      hypothesisText: data.hypothesis_text,
    };
  },

  async updateStrategy(patch: Partial<StrategyState>): Promise<StrategyState> {
    const db = requireClient();
    const current = await this.getStrategy();
    const next = { ...current, ...patch, userId: USER_ID };
    const { error } = await db.from("strategy_states").upsert({
      user_id: USER_ID,
      target_major: next.targetMajor,
      target_reason_keywords: next.targetReasonKeywords,
      susi_weight: next.susiWeight,
      jungsi_weight: next.jungsiWeight,
      hypothesis_text: next.hypothesisText,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return next;
  },

  async generateReport(): Promise<ReportSnapshot> {
    // temporary: generate with mock logic then persist
    const db = requireClient();
    const report = await mockApi.generateReport();
    const { error } = await db.from("report_snapshots").insert({
      id: report.id,
      user_id: USER_ID,
      generated_at: report.generatedAt,
      summary_text: report.summaryText,
      top_logs: report.topLogs,
      gaps: report.gaps,
      next_tasks: report.nextTasks,
      pdf_url: report.pdfUrl ?? null,
    });
    if (error) throw error;
    return report;
  },

  async toggleTask(taskId: string, checked: boolean): Promise<Task> {
    return mockApi.toggleTask(taskId, checked);
  },

  async generateWeeklyTasks(): Promise<Task[]> {
    return mockApi.generateWeeklyTasks();
  },
};

import { hasSupabaseEnv } from "../lib/supabase";
import { mockApi } from "./mockApi";
import { supabaseApi } from "./supabaseApi";

export const dataApi = hasSupabaseEnv ? supabaseApi : mockApi;

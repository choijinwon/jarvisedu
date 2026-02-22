-- jarvisedu MVP schema

create table if not exists public.user_profiles (
  id text primary key,
  grade text not null check (grade in ('고1','고2','고3')),
  interest_tags text[] not null default '{}',
  track_pref text not null check (track_pref in ('수시','정시','미정')),
  concern_focus text not null check (concern_focus in ('내신','모의','학생부','전형전략')),
  created_at timestamptz not null default now()
);

create table if not exists public.score_entries (
  id text primary key,
  user_id text not null references public.user_profiles(id) on delete cascade,
  type text not null check (type in ('내신','모의')),
  date date not null,
  semester text,
  subject_or_area text not null,
  grade_level int not null,
  raw_score int,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.log_entries (
  id text primary key,
  user_id text not null references public.user_profiles(id) on delete cascade,
  date date not null,
  category text not null check (category in ('교과','동아리','진로','봉사','기타')),
  title text not null,
  action text not null,
  learn text not null,
  next_step text not null,
  subject_tags text[] not null default '{}',
  competency_tags text[] not null default '{}',
  major_tags text[] not null default '{}',
  visibility text not null check (visibility in ('core','limited','personal')),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id text primary key,
  user_id text not null references public.user_profiles(id) on delete cascade,
  week_start date not null,
  title text not null,
  priority text not null check (priority in ('high','medium','low')),
  checked boolean not null default false,
  linked_type text not null check (linked_type in ('log','score','strategy','none')),
  linked_log_id text,
  rule_code text,
  due_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.strategy_states (
  user_id text primary key references public.user_profiles(id) on delete cascade,
  target_major text not null,
  target_reason_keywords text[] not null default '{}',
  susi_weight int not null,
  jungsi_weight int not null,
  hypothesis_text text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.report_snapshots (
  id text primary key,
  user_id text not null references public.user_profiles(id) on delete cascade,
  generated_at timestamptz not null,
  summary_text text not null,
  top_logs text[] not null default '{}',
  gaps text[] not null default '{}',
  next_tasks text[] not null default '{}',
  pdf_url text
);

-- Optional: relaxed MVP RLS (tighten before production)
alter table public.user_profiles enable row level security;
alter table public.score_entries enable row level security;
alter table public.log_entries enable row level security;
alter table public.tasks enable row level security;
alter table public.strategy_states enable row level security;
alter table public.report_snapshots enable row level security;

-- For quick prototype with anon key, allow all (MVP only)
drop policy if exists "mvp_all_user_profiles" on public.user_profiles;
create policy "mvp_all_user_profiles" on public.user_profiles for all using (true) with check (true);

drop policy if exists "mvp_all_score_entries" on public.score_entries;
create policy "mvp_all_score_entries" on public.score_entries for all using (true) with check (true);

drop policy if exists "mvp_all_log_entries" on public.log_entries;
create policy "mvp_all_log_entries" on public.log_entries for all using (true) with check (true);

drop policy if exists "mvp_all_tasks" on public.tasks;
create policy "mvp_all_tasks" on public.tasks for all using (true) with check (true);

drop policy if exists "mvp_all_strategy_states" on public.strategy_states;
create policy "mvp_all_strategy_states" on public.strategy_states for all using (true) with check (true);

drop policy if exists "mvp_all_report_snapshots" on public.report_snapshots;
create policy "mvp_all_report_snapshots" on public.report_snapshots for all using (true) with check (true);

create table if not exists public.target_schools (
  id text primary key,
  user_id text not null references public.user_profiles(id) on delete cascade,
  school_name text not null,
  major_name text not null,
  bucket text not null check (bucket in ('상향','적정','안정')),
  admission_type text not null,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.school_fit_scores (
  id text primary key,
  target_school_id text not null references public.target_schools(id) on delete cascade,
  gpa_fit int not null,
  csat_fit int not null,
  record_fit int not null,
  overall_fit int not null,
  updated_at timestamptz not null default now()
);

alter table public.target_schools enable row level security;
alter table public.school_fit_scores enable row level security;

drop policy if exists "mvp_all_target_schools" on public.target_schools;
create policy "mvp_all_target_schools" on public.target_schools for all using (true) with check (true);

drop policy if exists "mvp_all_school_fit_scores" on public.school_fit_scores;
create policy "mvp_all_school_fit_scores" on public.school_fit_scores for all using (true) with check (true);

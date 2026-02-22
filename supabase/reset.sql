-- jarvisedu MVP reset (keep schema, clear data)

begin;

delete from public.report_snapshots;
delete from public.tasks;
delete from public.score_entries;
delete from public.log_entries;
delete from public.strategy_states;
delete from public.user_profiles;

commit;

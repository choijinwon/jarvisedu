-- jarvisedu MVP seed data

insert into public.user_profiles (
  id, grade, interest_tags, track_pref, concern_focus
) values (
  'u1', '고2', array['의생명','데이터분석'], '수시', '학생부'
)
on conflict (id) do update set
  grade = excluded.grade,
  interest_tags = excluded.interest_tags,
  track_pref = excluded.track_pref,
  concern_focus = excluded.concern_focus;

insert into public.score_entries (
  id, user_id, type, date, semester, subject_or_area, grade_level, raw_score, memo
) values
  ('s1','u1','내신','2026-03-10','2026-1','수학',3,84,'함수 단원 실수 많음'),
  ('s2','u1','내신','2026-03-10','2026-1','생명과학',2,91,null),
  ('s3','u1','모의','2026-03-15',null,'국어',3,null,'비문학 시간 부족'),
  ('s4','u1','모의','2026-03-15',null,'수학',4,null,'확통 계산 실수')
on conflict (id) do nothing;

insert into public.log_entries (
  id, user_id, date, category, title, action, learn, next_step,
  subject_tags, competency_tags, major_tags, visibility
) values
  (
    'l1','u1','2026-03-12','교과','생명과학 수행평가 - 효소 반응 실험',
    '변인 통제 방식을 재설계하고 측정 오차 원인을 분류했다.',
    'pH 통제가 결과 재현성에 큰 영향을 준다는 점을 확인했다.',
    'pH 구간별 반응속도 비교표를 후속 탐구로 확장',
    array['생명과학'], array['탐구','문제해결'], array['의생명'], 'core'
  ),
  (
    'l2','u1','2026-03-08','교과','국어 발표 - 과학 기사 비판적 읽기',
    '근거 문장과 주장 문장을 분리해 발표 자료를 구성했다.',
    '자료 출처 신뢰도 검토가 핵심임을 배웠다.',
    '다음 발표에서 반론 파트 추가',
    array['국어'], array['문해','의사소통'], array['데이터분석'], 'core'
  )
on conflict (id) do nothing;

insert into public.strategy_states (
  user_id, target_major, target_reason_keywords, susi_weight, jungsi_weight, hypothesis_text
) values (
  'u1', '의생명공학', array['실험','데이터해석','보건의료'], 70, 30,
  '수시 중심 전략. 교과 기반 탐구 기록 밀도를 높이고 수학 하락 리스크를 보정.'
)
on conflict (user_id) do update set
  target_major = excluded.target_major,
  target_reason_keywords = excluded.target_reason_keywords,
  susi_weight = excluded.susi_weight,
  jungsi_weight = excluded.jungsi_weight,
  hypothesis_text = excluded.hypothesis_text,
  updated_at = now();

insert into public.tasks (
  id, user_id, week_start, title, priority, checked, linked_type, rule_code, due_text
) values
  ('t1','u1','2026-03-16','수업 기반 학생부 로그 2건 작성','high',false,'log','R001_NO_LOG_14D','이번 주'),
  ('t2','u1','2026-03-16','수학 오답 유형 3개 태그화','high',false,'score','R004_SUBJECT_DOWN_2X','목요일까지')
on conflict (id) do nothing;

insert into public.report_snapshots (
  id, user_id, generated_at, summary_text, top_logs, gaps, next_tasks, pdf_url
) values (
  'r1','u1',now(),
  '생명과학 기반 탐구 활동이 강점이며, 수학 성적 변동성이 리스크다.',
  array['l1','l2'],
  array['수학 하락 추세','모의 기록 주기 불균형'],
  array['로그 2건 작성','오답 태그화','모의 업데이트'],
  null
)
on conflict (id) do nothing;

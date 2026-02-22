# jarvisedu

고등 진학상담 앱 MVP 템플릿 (React + TypeScript + Vite).

## 포함 파일
- `src/types.ts`
- `src/mocks/*`
- `src/services/mockApi.ts`
- `src/hooks/*`
- `src/screens/*`
- `src/utils/pdf.ts`
- `src/App.tsx`

## 실행
```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 열면 탭 기반 데모를 확인할 수 있습니다.

## Supabase 연결(선택)
1) Supabase SQL Editor에서 `supabase/schema.sql` 실행
2) `.env.example`를 복사해 `.env` 생성 후 값 입력
```bash
cp .env.example .env
```
3) `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 설정

환경변수가 없으면 자동으로 mock API를 사용하고,
환경변수가 있으면 Supabase API를 사용합니다.

## 배포 (Vercel)
이 레포는 `vercel.json` 포함되어 있어 바로 배포 가능합니다.

1) Vercel에서 프로젝트 Import (GitHub: `choijinwon/jarvisedu`)
2) Build Settings (자동 감지됨)
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
3) Environment Variables 추가
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4) Deploy

CLI로 배포하려면 로컬에서:
```bash
npm i -g vercel
vercel
vercel --prod
```

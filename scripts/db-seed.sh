#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "[ERROR] DATABASE_URL is not set"
  exit 1
fi

psql "$DATABASE_URL" -f supabase/seed.sql
echo "[OK] seed complete"

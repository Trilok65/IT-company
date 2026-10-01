#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3001}"
ADMIN_KEY="${ADMIN_KEY:-change_this_admin_key}"

echo "Testing backend at ${BASE_URL}"

echo "1/3 Checking health..."
HEALTH_RESPONSE=$(curl -sS -w "\nHTTP_STATUS:%{http_code}" "${BASE_URL}/api/health")
printf '%s\n' "$HEALTH_RESPONSE"

if ! printf '%s' "$HEALTH_RESPONSE" | grep -q '"status":"ok"'; then
  echo "Health check failed." >&2
  exit 1
fi

echo "2/3 Creating a sample inquiry..."
POST_RESPONSE=$(curl -sS -w "\nHTTP_STATUS:%{http_code}" -X POST "${BASE_URL}/api/inquiries" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Smoke Test User",
    "email": "smoke-test@example.com",
    "projectTypes": ["Cloud & DevOps"],
    "budget": "5-15k",
    "message": "This is a smoke test submission for the backend API."
  }')
printf '%s\n' "$POST_RESPONSE"

if ! printf '%s' "$POST_RESPONSE" | grep -q 'HTTP_STATUS:201'; then
  echo "Inquiry submission failed." >&2
  exit 1
fi

echo "3/3 Fetching inquiries with admin key..."
GET_RESPONSE=$(curl -sS -w "\nHTTP_STATUS:%{http_code}" -H "Authorization: Bearer ${ADMIN_KEY}" "${BASE_URL}/api/inquiries")
printf '%s\n' "$GET_RESPONSE"

if ! printf '%s' "$GET_RESPONSE" | grep -q 'HTTP_STATUS:200'; then
  echo "Admin inquiry fetch failed." >&2
  exit 1
fi

echo "Smoke test succeeded."

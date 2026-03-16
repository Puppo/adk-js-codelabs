#!/usr/bin/env bash
set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
BOLD='\033[1m'

passed=0
failed=0
warnings=0

check() {
  local name="$1"
  local status="$2"
  local message="$3"

  if [ "$status" = "pass" ]; then
    echo -e "  ${GREEN}✔${NC} ${name}: ${message}"
    ((passed++))
  elif [ "$status" = "warn" ]; then
    echo -e "  ${YELLOW}⚠${NC} ${name}: ${message}"
    ((warnings++))
  else
    echo -e "  ${RED}✘${NC} ${name}: ${message}"
    ((failed++))
  fi
}

echo ""
echo -e "${BOLD}🔍 ADK-JS Codelabs - Setup Check${NC}"
echo -e "${BOLD}=================================${NC}"
echo ""

# --- Node.js ---
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version | sed 's/v//')
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 22 ]; then
    check "Node.js" "pass" "v${NODE_VERSION}"
  else
    check "Node.js" "fail" "v${NODE_VERSION} (requires >= 22)"
  fi
else
  check "Node.js" "fail" "Not installed (https://nodejs.org/)"
fi

# --- npm ---
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm --version)
  check "npm" "pass" "v${NPM_VERSION}"
else
  check "npm" "fail" "Not installed (comes with Node.js)"
fi

# --- Docker ---
if command -v docker &> /dev/null; then
  if docker info &> /dev/null; then
    DOCKER_VERSION=$(docker --version | sed 's/Docker version //' | cut -d, -f1)
    check "Docker" "pass" "v${DOCKER_VERSION} (daemon running)"
  else
    DOCKER_VERSION=$(docker --version | sed 's/Docker version //' | cut -d, -f1)
    check "Docker" "fail" "v${DOCKER_VERSION} (daemon NOT running — start Docker Desktop)"
  fi
else
  check "Docker" "fail" "Not installed (https://www.docker.com/products/docker-desktop/)"
fi

# --- Docker Compose ---
if docker compose version &> /dev/null; then
  COMPOSE_VERSION=$(docker compose version --short 2>/dev/null || docker compose version | sed 's/.*v//')
  check "Docker Compose" "pass" "v${COMPOSE_VERSION}"
else
  check "Docker Compose" "fail" "Not installed (included in Docker Desktop)"
fi

# --- Git ---
if command -v git &> /dev/null; then
  GIT_VERSION=$(git --version | sed 's/git version //')
  check "Git" "pass" "v${GIT_VERSION}"
else
  check "Git" "fail" "Not installed (https://git-scm.com/)"
fi

# --- Google AI API Key ---
if [ -f ".env" ]; then
  if grep -q "GOOGLE_API_KEY" .env 2>/dev/null || grep -q "GOOGLE_GENAI_API_KEY" .env 2>/dev/null; then
    check "API Key" "pass" "Found in .env file"
  else
    check "API Key" "warn" ".env file exists but no GOOGLE_API_KEY found"
  fi
else
  check "API Key" "warn" "No .env file yet (you'll create one in Phase 1)"
fi

# --- Summary ---
echo ""
echo -e "${BOLD}─────────────────────────────────${NC}"
total=$((passed + failed + warnings))
echo -e "  ${GREEN}${passed} passed${NC} | ${RED}${failed} failed${NC} | ${YELLOW}${warnings} warnings${NC} / ${total} checks"
echo ""

if [ "$failed" -gt 0 ]; then
  echo -e "${RED}${BOLD}❌ Some checks failed. Please install the missing tools before the workshop.${NC}"
  echo ""
  exit 1
else
  echo -e "${GREEN}${BOLD}✅ You are ready for the workshop! See you at DevFest Pisa! 🇮🇹${NC}"
  echo ""
fi

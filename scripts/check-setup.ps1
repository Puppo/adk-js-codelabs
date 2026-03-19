#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$passed = 0
$failed = 0
$warnings = 0

function Check {
  param(
    [string]$Name,
    [string]$Status,
    [string]$Message
  )

  if ($Status -eq "pass") {
    Write-Host "  " -NoNewline
    Write-Host "[OK]" -ForegroundColor Green -NoNewline
    Write-Host " ${Name}: ${Message}"
    $script:passed++
  } elseif ($Status -eq "warn") {
    Write-Host "  " -NoNewline
    Write-Host "[!!]" -ForegroundColor Yellow -NoNewline
    Write-Host " ${Name}: ${Message}"
    $script:warnings++
  } else {
    Write-Host "  " -NoNewline
    Write-Host "[X]" -ForegroundColor Red -NoNewline
    Write-Host " ${Name}: ${Message}"
    $script:failed++
  }
}

Write-Host ""
Write-Host "ADK-JS Codelabs - Setup Check" -ForegroundColor White
Write-Host "=================================" -ForegroundColor White
Write-Host ""

# --- Node.js ---
try {
  $nodeVersion = (node --version 2>$null) -replace '^v', ''
  $nodeMajor = [int]($nodeVersion -split '\.')[0]
  if ($nodeMajor -ge 22) {
    Check "Node.js" "pass" "v$nodeVersion"
  } else {
    Check "Node.js" "fail" "v$nodeVersion (requires >= 22)"
  }
} catch {
  Check "Node.js" "fail" "Not installed (https://nodejs.org/)"
}

# --- npm ---
try {
  $npmVersion = npm --version 2>$null
  if ($npmVersion) {
    Check "npm" "pass" "v$npmVersion"
  } else {
    Check "npm" "fail" "Not installed (comes with Node.js)"
  }
} catch {
  Check "npm" "fail" "Not installed (comes with Node.js)"
}

# --- Git ---
try {
  $gitVersion = (git --version 2>$null) -replace 'git version ', ''
  if ($gitVersion) {
    Check "Git" "pass" "v$gitVersion"
  } else {
    Check "Git" "fail" "Not installed (https://git-scm.com/)"
  }
} catch {
  Check "Git" "fail" "Not installed (https://git-scm.com/)"
}

# --- Google AI API Key ---
if (Test-Path ".env") {
  $envContent = Get-Content ".env" -Raw
  if ($envContent -match "GOOGLE_API_KEY" -or $envContent -match "GOOGLE_GENAI_API_KEY") {
    Check "API Key" "pass" "Found in .env file"
  } else {
    Check "API Key" "warn" ".env file exists but no GOOGLE_API_KEY found"
  }
} else {
  Check "API Key" "warn" "No .env file yet (you'll create one in Phase 1)"
}

# --- Summary ---
Write-Host ""
Write-Host "---------------------------------" -ForegroundColor White
$total = $passed + $failed + $warnings
Write-Host -NoNewline "  "
Write-Host -NoNewline "$passed passed" -ForegroundColor Green
Write-Host -NoNewline " | "
Write-Host -NoNewline "$failed failed" -ForegroundColor Red
Write-Host -NoNewline " | "
Write-Host -NoNewline "$warnings warnings" -ForegroundColor Yellow
Write-Host " / $total checks"
Write-Host ""

if ($failed -gt 0) {
  Write-Host "Some checks failed. Please install the missing tools before the workshop." -ForegroundColor Red
  Write-Host ""
  exit 1
} else {
  Write-Host "You are ready for the workshop! See you at the workshop!" -ForegroundColor Green
  Write-Host ""
}

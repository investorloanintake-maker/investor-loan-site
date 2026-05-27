@echo off
REM ============================================================
REM Viador Partners — Sitewide Audit Commit Script
REM Run this from: C:\Users\chadr\investor-loan-site\
REM DO NOT run git push — review first, push manually.
REM ============================================================

echo.
echo [1/4] Clearing stale git index lock (if present)...
if exist ".git\index.lock" (
    del /F /Q ".git\index.lock"
    echo     Removed .git\index.lock
) else (
    echo     No lock file found (good)
)

echo.
echo [2/4] Staging audit files...
git add bpl.html
git add dscr.html
git add fix-and-flip.html
git add "foreign-national-investor-loans/index.html"
git add "resources/index.html"
git add script.js
git add robots.txt

echo.
echo [3/4] Verifying staged files...
git status --short

echo.
echo [4/4] Committing (LOCAL ONLY — no push)...
git commit -m "sitewide audit: footers, headers, FN FAQ fix, 2026 dates, brand consistency"

echo.
echo ============================================================
echo  COMMIT COMPLETE. Verify with: git log --oneline -5
echo  Deploy command (run manually when ready):
echo    git push origin main
echo ============================================================
pause

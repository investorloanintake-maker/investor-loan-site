@echo off
cd /d C:\Users\chadr\investor-loan-site
echo Removing git lock...
del /f .git\index.lock 2>nul
echo.
echo Committing BPL footer fix + color fix...
git add -A
git commit -m "fix: bpl.html standard footer + compliance text color gray"
echo.
echo Pushing to GitHub...
git push
echo.
echo ============================================
echo  DONE — Cloudflare auto-deploys in ~60s.
echo  Hard-refresh viadorpartners.com/bpl to verify.
echo ============================================
pause

@echo off
cd /d C:\Users\chadr\investor-loan-site
echo Removing git lock...
del /f .git\index.lock 2>nul
echo.
echo Committing footer color fix...
git add -A
git commit -m "fix: footer compliance text color — explicit rgba gray"
echo.
echo Pushing to GitHub...
git push
echo.
echo ============================================
echo  DONE — Cloudflare will auto-deploy (~60s).
echo  Hard-refresh any Viador page to confirm.
echo ============================================
pause

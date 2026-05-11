@echo off
cd /d C:\Users\chadr\investor-loan-site
echo Removing git lock...
del /f .git\index.lock 2>nul
echo.
echo Committing footer centering fix...
git add -A
git commit -m "fix: footer-bottom centering — add width:100% to compliance p tag"
echo.
echo Pushing to GitHub...
git push
echo.
echo ============================================
echo  DONE — Cloudflare will auto-deploy.
echo  Return to Claude when done.
echo ============================================
pause

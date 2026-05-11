@echo off
cd /d C:\Users\chadr\investor-loan-site
del /f .git\index.lock 2>nul
git add -A
git commit -m "fix: bpl.html self-contained footer, no CSS dependencies"
git push
echo DONE
pause

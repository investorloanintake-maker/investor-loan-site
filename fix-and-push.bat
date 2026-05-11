@echo off
cd /d C:\Users\chadr\investor-loan-site
del /f .git\index.lock 2>nul
git add -A
git commit -m "cluster2: Inter-only fonts, remove Deal Analyzer nav duplicate, fix inline DM Mono refs"
git push
echo DONE
pause

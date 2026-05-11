@echo off
cd /d C:\Users\chadr\investor-loan-site
del /f .git\index.lock 2>nul
git add -A
git commit -m "cluster3: dark VP mark on all nav + footer, strip footer wordmark stack (114 nav, 106 footer)"
git push
echo DONE
pause

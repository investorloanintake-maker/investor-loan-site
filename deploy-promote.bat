@echo off
cd /d C:\Users\chadr\investor-loan-site
echo ============================================
echo  Viador Compliance v2 — PROMOTE TO PRODUCTION
echo ============================================
echo.
echo Deploying to: viador-site (branch: main)
echo.
npx wrangler pages deploy . --project-name=viador-site --branch=main
echo.
echo ============================================
echo  DONE — Return to Claude to verify live site.
echo ============================================
pause

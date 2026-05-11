@echo off
cd /d C:\Users\chadr\investor-loan-site
echo ============================================
echo  Viador Compliance v2 — Preview Deploy
echo ============================================
echo.
echo Deploying to: viador-site (branch: preview)
echo.
npx wrangler pages deploy . --project-name=viador-site --branch=preview
echo.
echo ============================================
echo  DONE — Copy the preview URL above, then
echo  return to Claude to verify before promoting.
echo ============================================
pause

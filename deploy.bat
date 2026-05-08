@echo off
cd /d "%~dp0"
echo Deploying from: %CD%
npx wrangler pages deploy . --project-name viador-site
pause

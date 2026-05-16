@echo off
echo ============================================
echo  Viador Partners - Cloudflare Pages Deploy
echo ============================================
cd /d C:\Users\chadr\investor-loan-site
echo.
echo Running: npx wrangler pages deploy . --project-name=viadorpartners --branch=main
echo.
npx wrangler pages deploy . --project-name=viadorpartners --branch=main
echo.
echo Deploy complete. Check output above for URL.
pause

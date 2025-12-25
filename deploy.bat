@echo off
echo 🚀 Pet Haven Deployment Script - Render Edition
echo ================================================
echo.

echo What would you like to deploy?
echo 1) Frontend only (Vercel)
echo 2) Backend only (Manual Render setup)
echo 3) Both (Recommended - Manual setup)
echo 4) Build frontend for manual deployment
echo 5) Open Render deployment guide
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo 🎨 Deploying Frontend to Vercel...
    cd frontend
    npm run build
    vercel --prod
) else if "%choice%"=="2" (
    echo ⚙️ Backend deployment requires manual setup on Render
    echo 📖 Please follow the RENDER_DEPLOYMENT.md guide
    echo 🌐 Go to: https://render.com
    start https://render.com
) else if "%choice%"=="3" (
    echo 🎨 Building Frontend...
    cd frontend
    npm run build
    echo ✅ Frontend built successfully!
    
    echo 🚀 Deploying Frontend to Vercel...
    vercel --prod
    
    echo ⚙️ For Backend deployment:
    echo 📖 Please follow the RENDER_DEPLOYMENT.md guide
    echo 🌐 Opening Render website...
    start https://render.com
    
    echo ✅ Deployment setup complete!
) else if "%choice%"=="4" (
    echo 🎨 Building Frontend for manual deployment...
    cd frontend
    npm run build
    echo ✅ Frontend built! Upload the 'dist' folder to your hosting provider.
) else if "%choice%"=="5" (
    echo 📖 Opening deployment guide...
    start RENDER_DEPLOYMENT.md
) else (
    echo ❌ Invalid choice. Please run the script again.
)

echo.
echo 📋 Post-deployment checklist:
echo 1. Update environment variables on Render dashboard
echo 2. Set up MongoDB Atlas (free tier)
echo 3. Update Google OAuth callback URLs
echo 4. Test all functionality
echo.
echo 🎉 Happy deploying with Render!
pause
@echo off
echo 🏥 Healthcare System - Deploying to GitHub Pages...
echo.

REM Step 1: Build the project
echo 📦 Building the project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✅ Build completed successfully!
echo.

REM Step 2: Switch to gh-pages branch
echo 🔄 Switching to gh-pages branch...
git checkout gh-pages
if errorlevel 1 (
    echo ❌ Failed to switch to gh-pages branch!
    pause
    exit /b 1
)

REM Step 3: Clear current branch and copy built assets
echo 🧹 Cleaning gh-pages branch...
for /f "delims=" %%i in ('dir /b /a-d ^| findstr /v "node_modules"') do del /q "%%i"
for /f "delims=" %%i in ('dir /b /ad ^| findstr /v "node_modules" ^| findstr /v ".git"') do rmdir /s /q "%%i"

REM Step 4: Copy built assets
echo 📁 Copying built assets...
xcopy dist\* . /E /Y /Q

REM Step 5: Add and commit changes
echo 💾 Committing changes...
git add .
git commit -m "Deploy built assets to GitHub Pages - %date% %time%"

REM Step 6: Push to GitHub
echo 🚀 Pushing to GitHub...
git push origin gh-pages
if errorlevel 1 (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo ✅ Deployment completed successfully!
echo 🌐 Your site should be available at: https://kenjilugatiman16-rgb.github.io/HEALTHCARE123/

REM Step 7: Switch back to main branch
echo 🔄 Switching back to main branch...
git checkout main

echo 🎉 Deployment process completed!
pause

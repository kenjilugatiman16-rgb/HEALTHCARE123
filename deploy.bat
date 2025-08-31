@echo off
REM Healthcare System Web Application - Deployment Script (Windows)
REM This script helps deploy the application to GitHub Pages

echo 🚀 Starting deployment process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Build the project
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Build failed. dist/ directory not found.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Build output is in the dist/ directory
echo.
echo 🌐 To deploy to GitHub Pages:
echo 1. Push your code to GitHub
echo 2. Go to Settings → Pages
echo 3. Select 'Deploy from a branch'
echo 4. Choose 'gh-pages' branch and '/ (root)' folder
echo 5. Or use GitHub Actions for automatic deployment
echo 6. Your app will be available at: https://kenjilugatiman16-rgb.github.io/HEALTHCARE123/
echo.
echo 📖 See README.md for detailed deployment instructions
pause

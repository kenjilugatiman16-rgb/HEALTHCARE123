# Healthcare System Web Application - Deployment Script
# This script builds the project and deploys it to GitHub Pages

Write-Host "🏥 Healthcare System - Deploying to GitHub Pages..." -ForegroundColor Green

# Step 1: Build the project
Write-Host "📦 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Step 2: Switch to gh-pages branch
Write-Host "🔄 Switching to gh-pages branch..." -ForegroundColor Yellow
git checkout gh-pages

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to gh-pages branch!" -ForegroundColor Red
    exit 1
}

# Step 3: Clear current branch and copy built assets
Write-Host "🧹 Cleaning gh-pages branch..." -ForegroundColor Yellow
Get-ChildItem -Path . -Exclude .git,node_modules | Remove-Item -Recurse -Force

# Step 4: Copy built assets
Write-Host "📁 Copying built assets..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Step 5: Add and commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Deploy built assets to GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Step 6: Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push origin gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site should be available at: https://kenjilugatiman16-rgb.github.io/HEALTHCARE123/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
}

# Step 7: Switch back to main branch
Write-Host "🔄 Switching back to main branch..." -ForegroundColor Yellow
git checkout main

Write-Host "🎉 Deployment process completed!" -ForegroundColor Green

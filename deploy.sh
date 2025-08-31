#!/bin/bash

# Healthcare System Web Application - Deployment Script
# This script helps deploy the application to GitHub Pages

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed. dist/ directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output is in the dist/ directory"
echo ""
echo "🌐 To deploy to GitHub Pages:"
echo "1. Push your code to GitHub"
echo "2. Go to Settings → Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'gh-pages' branch and '/ (root)' folder"
echo "5. Or use GitHub Actions for automatic deployment"
echo "6. Your app will be available at: https://kenjilugatiman16-rgb.github.io/HEALTHCARE123/"
echo ""
echo "📖 See README.md for detailed deployment instructions"

#!/bin/bash

echo "🌟 Discord Key Management System - GitHub Pages Setup"
echo "======================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ This is not a Git repository. Please initialize Git first:"
    echo ""
    echo "1. Create a repository on GitHub.com:"
    echo "   - Go to github.com → New Repository"
    echo "   - Name: discord-key-manager"
    echo "   - Public repository (required for free Pages)"
    echo ""
    echo "2. Initialize Git in this folder:"
    echo "   git init"
    echo "   git remote add origin https://github.com/yourusername/discord-key-manager.git"
    echo ""
    echo "3. Run this script again"
    exit 1
fi

echo "🔍 Checking setup..."

# Check if GitHub workflow exists
if [ ! -f ".github/workflows/deploy-pages.yml" ]; then
    echo "❌ GitHub Pages workflow not found!"
    echo "Run this command to create it: mkdir -p .github/workflows"
    exit 1
fi

# Check if build script exists
if [ ! -f "build-pages.js" ]; then
    echo "❌ Build script not found!"
    exit 1
fi

echo "✅ All files ready for GitHub Pages deployment!"
echo ""

# Test build locally
echo "🔧 Testing build process..."
if node build-pages.js; then
    echo "✅ Build test successful!"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi

echo ""
echo "🚀 Ready to deploy! Next steps:"
echo ""
echo "1. Add all files to Git:"
echo "   git add ."
echo ""
echo "2. Commit your changes:"
echo '   git commit -m "Add GitHub Pages deployment"'
echo ""
echo "3. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "4. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub.com"
echo "   - Settings → Pages → Source: GitHub Actions"
echo ""
echo "5. Your site will be live at:"
echo "   https://yourusername.github.io/your-repo-name"
echo ""
echo "🌟 Features that will work on GitHub Pages:"
echo "   ✅ Beautiful animated galaxy background"
echo "   ✅ Complete Discord-themed dashboard"
echo "   ✅ Key management interface"
echo "   ✅ Role configuration panel"
echo "   ✅ Activity logs and statistics"
echo "   ✅ Mobile-responsive design"
echo "   ✅ Local data persistence"
echo ""
echo "⚠️  Note: Discord bot won't work on GitHub Pages (frontend only)"
echo "   For full bot functionality, use Railway or Render instead"
echo ""
echo "📖 For detailed instructions, see: SETUP-GITHUB-PAGES.md"
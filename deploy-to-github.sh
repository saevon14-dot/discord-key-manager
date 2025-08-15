#!/bin/bash

echo "🚀 Auto-deploying Discord Key Manager to GitHub Pages"
echo "===================================================="
echo ""

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding all project files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit - repository is up to date"
else
    echo "💾 Committing changes..."
    git commit -m "Deploy Discord Key Manager with GitHub Pages support

Features:
- Beautiful animated galaxy background with moving stars
- Complete Discord-themed dashboard
- Key management system with multiple timeframes
- Role-based permission system
- Activity logging and real-time updates
- GitHub Pages deployment with local storage
- Mobile-responsive design"
fi

echo ""
echo "🌟 Your Discord Key Manager is ready for GitHub Pages!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. CREATE GITHUB REPOSITORY:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: discord-key-manager"
echo "   - Make it PUBLIC (required for free Pages)"
echo "   - Click 'Create repository'"
echo ""
echo "2. CONNECT AND PUSH:"
echo "   git remote add origin https://github.com/YOURUSERNAME/discord-key-manager.git"
echo "   git push -u origin main"
echo ""
echo "3. ENABLE GITHUB PAGES:"
echo "   - Go to your repo → Settings → Pages"
echo "   - Source: GitHub Actions"
echo "   - Done!"
echo ""
echo "4. YOUR LIVE SITE:"
echo "   https://YOURUSERNAME.github.io/discord-key-manager"
echo ""
echo "🎯 WHAT YOU'LL GET:"
echo "   ✅ Animated galaxy background with twinkling stars"
echo "   ✅ Complete Discord dashboard with sidebar navigation" 
echo "   ✅ Key management (day, week, month, lifetime keys)"
echo "   ✅ Role configuration with permission settings"
echo "   ✅ Activity logs and statistics dashboard"
echo "   ✅ Mobile-responsive design"
echo "   ✅ Local data storage (persists in browser)"
echo ""
echo "⚠️  GITHUB PAGES LIMITATIONS:"
echo "   ❌ Discord bot commands won't work (frontend only)"
echo "   ❌ No real Discord API (demo mode only)"
echo ""
echo "🚀 FOR FULL DISCORD BOT FUNCTIONALITY:"
echo "   Use Railway instead: https://railway.app"
echo "   - Connect same GitHub repo"
echo "   - Add DISCORD_BOT_TOKEN environment variable"
echo "   - Get 24/7 uptime with real Discord integration"
echo ""

# Show current status
echo "📊 REPOSITORY STATUS:"
git status --porcelain | wc -l | xargs echo "Files ready:"
echo "Current branch: $(git branch --show-current)"
if git remote get-url origin 2>/dev/null; then
    echo "Remote origin: $(git remote get-url origin)"
else
    echo "Remote origin: Not configured (follow step 2 above)"
fi
echo ""
echo "🎉 Setup complete! Follow the steps above to go live."
#!/bin/bash
# Discord Key Management Bot - Free Hosting Deployment Script

echo "🚀 Discord Key Manager - Free Hosting Deployment"
echo "================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building the application..."
npm run build

echo "📁 Preparing deployment files..."

# Create a deployment directory
mkdir -p dist-deploy

# Copy built files
cp -r dist/* dist-deploy/
cp -r server dist-deploy/
cp package.json dist-deploy/
cp package-lock.json dist-deploy/

# Create a simple server file for production
cat > dist-deploy/start.js << 'EOF'
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('ws');

const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static('.'));

// API routes would go here (simplified for deployment)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch all handler for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`Discord Key Manager running on port ${port}`);
    console.log(`Visit: http://localhost:${port}`);
});
EOF

# Create package.json for deployment
cat > dist-deploy/package.json << 'EOF'
{
  "name": "discord-key-manager",
  "version": "1.0.0",
  "description": "Discord Key Management Dashboard",
  "main": "start.js",
  "scripts": {
    "start": "node start.js",
    "dev": "node start.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.14.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

echo "✅ Deployment files prepared in dist-deploy/"
echo ""
echo "🌐 FREE HOSTING OPTIONS:"
echo "========================"
echo ""
echo "1. 🟢 RAILWAY (Recommended)"
echo "   • Free tier: 512MB RAM, $5 credit monthly"
echo "   • Steps:"
echo "     - Go to https://railway.app"
echo "     - Sign up with GitHub"
echo "     - Create new project → Deploy from GitHub repo"
echo "     - Railway will auto-deploy from your repo"
echo "     - Set environment variables in Railway dashboard"
echo ""
echo "2. 🔵 RENDER"
echo "   • Free tier: 512MB RAM, sleeps after 15min idle"
echo "   • Steps:"
echo "     - Go to https://render.com"
echo "     - Sign up with GitHub"
echo "     - Create Web Service → Connect GitHub repo"
echo "     - Build command: npm install"
echo "     - Start command: npm start"
echo ""
echo "3. ⚫ CYCLIC"
echo "   • Free tier with limitations"
echo "   • Steps:"
echo "     - Go to https://cyclic.sh"
echo "     - Connect GitHub repo"
echo "     - Auto-deploys on push"
echo ""
echo "4. 🟡 GLITCH"
echo "   • Free tier with sleep mode"
echo "   • Steps:"
echo "     - Go to https://glitch.com"
echo "     - Import from GitHub"
echo "     - Auto-runs your project"
echo ""
echo "📝 IMPORTANT NOTES:"
echo "==================="
echo "• Add your Discord Bot Token in hosting platform's environment variables"
echo "• Set NODE_ENV=production"
echo "• Most free hosts sleep after inactivity - consider Railway for 24/7 uptime"
echo "• For database persistence, add PostgreSQL addon (free tier available)"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Push your code to GitHub"
echo "2. Choose a hosting platform above"
echo "3. Connect your GitHub repo"
echo "4. Add environment variables"
echo "5. Deploy!"
echo ""
echo "✨ Your Discord Key Manager will be live and accessible 24/7!"
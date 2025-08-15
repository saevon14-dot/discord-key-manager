# 🚀 Quick Start Guide

## 🎯 Choose Your Deployment Method

### Option 1: 🌐 GitHub Pages (Recommended for Demo)
**Perfect for showcasing your project with beautiful animated UI**

```bash
# 1. Run the setup script
./setup-github-pages.sh

# 2. Follow the on-screen instructions
# Your site will be live at: https://yourusername.github.io/your-repo-name
```

**What you get:**
- ✅ Beautiful animated galaxy background
- ✅ Complete Discord-themed dashboard  
- ✅ All UI features working perfectly
- ✅ Free hosting forever
- ❌ Discord bot won't work (frontend only)

---

### Option 2: 🟢 Railway (Full Discord Bot)
**For production use with real Discord integration**

```bash
# 1. Push your code to GitHub
git push origin main

# 2. Go to railway.app
# 3. Connect your GitHub repository
# 4. Add environment variable: DISCORD_BOT_TOKEN=your_token_here
# 5. Deploy automatically
```

**What you get:**
- ✅ Full Discord bot functionality
- ✅ Real-time key distribution
- ✅ 24/7 uptime (no sleeping)
- ✅ $5 free monthly credits
- ✅ Beautiful web dashboard

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to: http://localhost:5000
```

---

## 📁 Project Structure

```
discord-key-manager/
├── 🌐 GitHub Pages Files
│   ├── .github/workflows/deploy-pages.yml  # Auto-deployment
│   ├── build-pages.js                      # Build script
│   ├── vite.config.pages.ts               # Pages config
│   └── SETUP-GITHUB-PAGES.md              # Setup guide
├── 🎨 Frontend (client/)
│   ├── src/components/                     # UI components
│   ├── src/pages/                         # Page components
│   └── src/hooks/                         # Custom hooks
├── 🚀 Backend (server/)
│   ├── discord-bot.ts                     # Discord bot
│   ├── routes.ts                          # API endpoints
│   └── storage.ts                         # Data storage
├── 🗄️ Database (shared/)
│   └── schema.ts                          # Data models
└── 📦 Deployment
    ├── railway.toml                       # Railway config
    ├── render.yaml                        # Render config
    └── Procfile                           # Process config
```

---

## 🎨 Features Overview

### 🌌 **Galaxy Theme**
- Animated twinkling stars
- Color-shifting nebula clouds
- Smooth cosmic animations
- Purple, blue, pink palette

### 🗝️ **Key Management**  
- Multiple timeframes (day, week, month, etc.)
- Bulk key operations
- Live key pool tracking
- Usage history and statistics

### 👥 **Role System**
- Discord role integration
- Granular permissions per key type
- Admin role configuration
- Real-time permission updates

### 🤖 **Discord Bot** (Full hosting only)
- `!generatekey [type]` - Generate keys
- `!keycount [type]` - Check availability  
- `!botstats` - View statistics
- `!help` - Show commands

### 📊 **Dashboard**
- Real-time statistics
- Activity logging
- Mobile-responsive design
- WebSocket live updates

---

## 🆘 Need Help?

### For GitHub Pages Setup
- Read: `SETUP-GITHUB-PAGES.md`
- Run: `./setup-github-pages.sh`

### For Full Discord Bot
- Read: `DEPLOYMENT.md`
- Check environment variables
- Test bot token in Discord Developer Portal

### For Local Development Issues  
- Check Node.js version (18+ recommended)
- Run `npm install` to update dependencies
- Check console for error messages

---

## 🎉 Ready to Deploy!

**For Demo/Portfolio:** Use GitHub Pages (2 minutes setup)  
**For Production:** Use Railway (full functionality)

Both options give you the beautiful animated galaxy-themed dashboard!
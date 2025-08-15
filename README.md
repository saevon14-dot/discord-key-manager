# 🌟 Discord Key Management System

A comprehensive Discord bot with web dashboard for role-based key generation and management across multiple timeframes.

![Galaxy Theme](https://img.shields.io/badge/Theme-Galaxy-blueviolet)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎯 **Complete Key Management**
- **Multiple Timeframes**: day, week, month, 3month, 6month, lifetime, custom
- **Live Key Pool**: Real-time key count tracking and distribution
- **Bulk Operations**: Add multiple keys at once
- **Auto-Cleanup**: Removes expired and used keys automatically

### 🛡️ **Role-Based Permissions**
- **Discord Integration**: Connect Discord roles to key permissions
- **Granular Control**: Set which roles can generate which key types
- **Admin System**: Designated admin roles with full access
- **Real-time Sync**: Permissions update instantly across the system

### 🤖 **Discord Bot Commands**
- `!generatekey [type]` - Generate a key (if authorized)
- `!keycount [type]` - Check available keys
- `!botstats` - View bot statistics
- `!help` - Show all commands

### 🌐 **Web Dashboard**
- **Galaxy Theme**: Beautiful animated space background
- **Real-time Updates**: WebSocket live data streaming  
- **Mobile Responsive**: Works perfectly on all devices
- **Activity Logging**: Complete audit trail of all actions

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd discord-key-manager

# Install dependencies
npm install

# Start the application
npm run dev
```

### 🌟 **FREE HOSTING OPTIONS**

#### 🟣 GitHub Pages (Frontend Demo)
**Perfect for showcasing your project with beautiful UI**
- **Cost**: 100% FREE forever
- **Features**: Full animated UI, local data storage
- **Limitations**: Discord bot won't work (frontend only)
- **Setup**: 2 minutes - just push to GitHub!

```bash
# Deploy to GitHub Pages (2 steps)
git push origin main
# Then enable GitHub Pages in repo settings
```
**Result**: `https://yourusername.github.io/your-repo-name`

#### 🟢 Railway (Full Discord Bot)
**Best for production Discord bots with 24/7 uptime**
- **Free Tier**: 512MB RAM, $5 credit monthly
- **24/7 Uptime**: No sleeping, perfect for Discord bots
- **Easy Setup**: 
  1. Visit [railway.app](https://railway.app)
  2. Connect your GitHub repo
  3. Add environment variables
  4. Deploy automatically

#### 🔵 Render (Full Discord Bot)
**Good for testing, sleeps when idle**
- **Free Tier**: 512MB RAM, sleeps after 15min idle  
- **Setup**: Connect GitHub at [render.com](https://render.com)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### ⚫ Cyclic (Full Discord Bot)
**Simple auto-deploy from GitHub**
- **Free Hosting**: Auto-deploys from GitHub
- **Visit**: [cyclic.sh](https://cyclic.sh)
- **Perfect for**: Testing and development

#### 🟡 Glitch (Full Discord Bot) 
**Instant deploy and remix**
- **Free Tier**: Great for demos
- **Visit**: [glitch.com](https://glitch.com)
- **Import**: Directly from GitHub

---

## 🌐 GitHub Pages Deployment

Deploy your beautiful animated dashboard to GitHub Pages in 2 minutes:

### Quick Deploy Steps
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **GitHub Actions** as source
   - Done!

3. **Access Your Site**:
   ```
   https://yourusername.github.io/your-repo-name
   ```

### What Works on GitHub Pages
✅ **Beautiful galaxy-themed dashboard**  
✅ **All UI animations and effects**  
✅ **Key management interface**  
✅ **Role configuration panels**  
✅ **Activity logs and statistics**  
✅ **Local data persistence**  
✅ **Mobile-responsive design**  

### GitHub Pages Limitations
❌ **Discord bot won't connect** (frontend only)  
❌ **No real Discord API integration**  
❌ **Data stored locally** (browser storage)

**Perfect for**: Portfolio showcase, UI demos, client presentations

## 🔧 Environment Variables

Set these in your hosting platform:

```env
DISCORD_BOT_TOKEN=your_bot_token_here
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url (optional)
```

## 🎨 Galaxy Theme

The dashboard features a beautiful animated galaxy background with:
- ✨ **Animated Stars**: Twinkling and drifting effects
- 🌌 **Nebula Clouds**: Color-shifting cosmic backgrounds  
- 🪐 **Galaxy Colors**: Purple, blue, pink cosmic palette
- 💫 **Smooth Animations**: Subtle movements and transitions

## 📱 Dashboard Sections

### 📊 **Dashboard Overview**
- Total key statistics
- Bot uptime and status
- Recent activity feed
- Key pool monitoring

### 🗝️ **Key Management** 
- Add keys by pasting (one per line)
- View all keys by type
- Remove individual keys
- Search and filter functionality

### 👥 **Role Settings**
- Add Discord roles
- Configure permissions per key type
- Set admin roles
- Real-time permission updates

### 🤖 **Bot Configuration**
- Start/stop Discord bot
- Configure bot token
- Monitor connection status
- View server count and latency

### 📝 **Activity Logs**
- Complete audit trail
- Filter by activity type
- Real-time log streaming
- Detailed event information

## 🏗️ Technical Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with custom galaxy theme
- **shadcn/ui** component library
- **TanStack Query** for state management
- **WebSocket** for real-time updates

### Backend  
- **Express.js** with TypeScript
- **discord.js** for bot functionality
- **WebSocket server** for live updates
- **Drizzle ORM** ready for database
- **In-memory storage** (easily expandable)

### Deployment
- **Production Ready**: Optimized build system
- **Multiple Hosts**: Railway, Render, Cyclic, Glitch
- **Auto-Deploy**: GitHub integration
- **Environment**: Production configurations included

## 📦 Project Structure

```
discord-key-manager/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── index.ts           # Main server
│   ├── discord-bot.ts     # Bot logic
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data layer
├── shared/                # Shared types
└── deployment/            # Hosting configs
```

## 🛠️ Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run deploy:setup # Prepare deployment files
```

## 🔄 Deployment Process

1. **Push to GitHub**: Commit your changes
2. **Choose Platform**: Railway (recommended for 24/7)
3. **Connect Repo**: Link your GitHub repository
4. **Set Environment**: Add Discord bot token
5. **Deploy**: Platform handles the rest automatically

## 🎯 Key Features in Action

- **Real-time Key Generation**: Users request keys via Discord commands
- **Automatic Key Removal**: Keys are removed from pool when distributed
- **Permission Validation**: Only authorized roles can generate specific key types
- **Activity Tracking**: Every action is logged with timestamps
- **Live Dashboard Updates**: All changes reflect immediately via WebSocket

## 🚨 Important Notes

- **Bot Token Security**: Never commit your Discord bot token to Git
- **Role IDs**: Use Discord Developer Portal to get role IDs
- **Database**: System uses memory storage by default, add PostgreSQL for persistence
- **24/7 Hosting**: Railway recommended for continuous bot operation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the Discord community**

*Featuring a beautiful galaxy theme with real-time animations and comprehensive key management capabilities.*
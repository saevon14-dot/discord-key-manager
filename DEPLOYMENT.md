# 🚀 Free Hosting Deployment Guide

Your Discord Key Management System is ready to deploy! Here are **completely free** hosting options:

## 🟢 Railway (RECOMMENDED - 24/7 Uptime)

**Why Railway?** Perfect for Discord bots - no sleeping, $5/month free credits, automatic deployments.

### Steps:
1. **Create Account**: Go to [railway.app](https://railway.app)
2. **Connect GitHub**: Sign up with your GitHub account
3. **New Project**: Click "Deploy from GitHub repo"
4. **Select Repository**: Choose your Discord key manager repo
5. **Environment Variables**: Add these in Railway dashboard:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   NODE_ENV=production
   ```
6. **Deploy**: Railway automatically builds and deploys!

**✅ Result**: Your bot runs 24/7 at `https://your-app-name.up.railway.app`

---

## 🔵 Render (Free Tier)

**Good for**: Testing and development (sleeps after 15min idle)

### Steps:
1. **Create Account**: Go to [render.com](https://render.com)
2. **New Web Service**: Click "Create" → "Web Service"
3. **Connect Repository**: Link your GitHub repo
4. **Configure**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `DISCORD_BOT_TOKEN`
5. **Deploy**: Render handles the rest!

---

## ⚫ Cyclic (Simple Deploy)

**Good for**: Quick deployments and testing

### Steps:
1. **Visit**: [cyclic.sh](https://cyclic.sh)
2. **Connect GitHub**: Authorize your repository
3. **Auto Deploy**: Cyclic automatically deploys from your repo
4. **Environment Variables**: Add in Cyclic dashboard

---

## 🟡 Glitch (Instant Deploy)

**Good for**: Demos and quick testing

### Steps:
1. **Visit**: [glitch.com](https://glitch.com)
2. **Import from GitHub**: Use the import feature
3. **Auto-Run**: Your app starts immediately
4. **Configure**: Add environment variables in Glitch editor

---

## 🔧 Pre-Deployment Checklist

### ✅ Required Files (Already Created):
- ✓ `railway.toml` - Railway configuration
- ✓ `render.yaml` - Render configuration  
- ✓ `Procfile` - Process configuration
- ✓ `deploy.sh` - Deployment script

### ✅ Environment Variables Needed:
```env
DISCORD_BOT_TOKEN=your_bot_token_here
NODE_ENV=production
PORT=3000
```

### ✅ Discord Bot Setup:
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create new application → Bot
3. Copy bot token
4. Add bot to your server with permissions:
   - Send Messages
   - Read Message History  
   - Use Slash Commands

---

## 🎯 Quick Deploy Commands

```bash
# Method 1: Use our deployment script
chmod +x deploy.sh
./deploy.sh

# Method 2: Manual build
npm run build
```

---

## 🌟 Post-Deployment

After deployment, your Discord Key Manager will be available at:
- **Web Dashboard**: `https://your-app-url.com`
- **Discord Bot**: Working in your Discord server
- **API Endpoints**: `https://your-app-url.com/api/*`

### Test Your Deployment:
1. ✅ Visit web dashboard
2. ✅ Start Discord bot in Bot Configuration
3. ✅ Add roles in Role Settings  
4. ✅ Add some keys in Key Management
5. ✅ Test Discord commands: `!help`, `!botstats`

---

## 🔄 Auto-Deploy Setup

All hosting platforms support **automatic deployments**:
- Push to GitHub → Automatic deployment
- Zero downtime deployments
- Environment variables persist
- Build logs available in platform dashboard

---

## 💡 Pro Tips

### 🟢 Railway (Best for Production):
- **24/7 Uptime**: Perfect for Discord bots
- **$5 Monthly Credits**: More than enough for small bots
- **Custom Domains**: Add your own domain
- **Database Add-ons**: PostgreSQL available

### 🔵 Render (Good for Testing):
- **Free SSL**: HTTPS automatically enabled
- **Git Integration**: Deploys on every push
- **Web Shell**: Access your app's terminal
- **Monitoring**: Built-in metrics

### Database Persistence (Optional):
Add PostgreSQL for permanent data storage:
- Railway: Built-in PostgreSQL addon
- Render: PostgreSQL add-on available
- Update `DATABASE_URL` environment variable

---

## 🚨 Security Notes

- ✅ Never commit bot token to Git
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated
- ✅ Monitor deployment logs

---

## 🆘 Troubleshooting

### Bot Not Starting?
- Check `DISCORD_BOT_TOKEN` is set correctly
- Verify bot has proper Discord permissions
- Check deployment logs for errors

### Web Dashboard Not Loading?
- Ensure build completed successfully
- Check `NODE_ENV=production` is set
- Verify port configuration

### Commands Not Working?
- Bot must be online in dashboard
- Check role permissions are configured
- Verify bot has message permissions in Discord

---

## 🎉 Success!

Your Discord Key Management System is now running 24/7 for free! 

**Live URLs:**
- 🌐 Web Dashboard: `https://your-app-name.platform.com`
- 🤖 Discord Bot: Active in your server
- 📊 Real-time Updates: WebSocket connected

**Next Steps:**
1. Share dashboard URL with your team
2. Configure role permissions  
3. Add keys to your pools
4. Enjoy automated key distribution!

---

*Built with ❤️ for the Discord community*
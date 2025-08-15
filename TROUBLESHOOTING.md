# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### ❌ "Build Failed" or "Workflow Error"

**Problem**: GitHub Actions build is failing

**Solutions**:
1. Check that all files were uploaded to GitHub
2. Ensure `package.json` is in the root directory
3. Make sure repository is PUBLIC (not private)

**Check**: Go to your repo → Actions tab to see error details

---

### ❌ "Site Not Loading" or "404 Error"

**Problem**: Your GitHub Pages site shows 404 or doesn't load

**Solutions**:
1. Wait 5-10 minutes after first deployment
2. Check Settings → Pages shows green checkmark
3. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
4. Verify URL format: `https://username.github.io/repo-name`

---

### ❌ "Repository Creation Problems"

**Problem**: Can't create GitHub repository

**Solutions**:
1. Make sure you're logged into GitHub
2. Repository must be PUBLIC for free Pages
3. Choose a simple name like `discord-key-manager`
4. Don't initialize with README (we have our own files)

---

### ❌ "Upload/Push Problems"

**Problem**: Can't upload files to GitHub

**Solutions**:

**Option 1: Web Upload (Easier)**
1. Go to your empty repository
2. Click "uploading an existing file"
3. Drag ALL project files at once
4. Commit with message "Deploy Discord Key Manager"

**Option 2: Git Commands**
```bash
# If you get permission errors, try:
git remote remove origin
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

---

### ❌ "GitHub Pages Not Enabled"

**Problem**: Pages section not working

**Solutions**:
1. Repository must be PUBLIC
2. Go to Settings → Pages (left sidebar)
3. Source: Select "GitHub Actions" (not "Deploy from branch")
4. Save settings

---

### ❌ "Files Missing" or "Build Errors"

**Problem**: Some files not found during build

**Check these files exist**:
- ✅ `package.json`
- ✅ `.github/workflows/deploy-pages.yml`
- ✅ `build-pages.js`
- ✅ `client/` folder with all React files
- ✅ `vite.config.pages.ts`

**If missing**: Re-download all project files

---

## 🚀 Step-by-Step Checklist

### Before Deployment:
- [ ] All project files are ready
- [ ] GitHub account is active
- [ ] You have the repository name decided

### During Deployment:
- [ ] Created PUBLIC repository on GitHub
- [ ] Uploaded ALL files (not just some)
- [ ] Enabled GitHub Pages with "GitHub Actions" source
- [ ] Waited 3-5 minutes for first build

### After Deployment:
- [ ] Checked Actions tab for green checkmark
- [ ] Visited the live URL
- [ ] Tested the site functionality

---

## 🆘 Still Not Working?

### Quick Test:
1. **Local Test**: Run `npm run build` - should work without errors
2. **Files Check**: All files uploaded to GitHub repository
3. **Public Repo**: Repository visibility is PUBLIC
4. **Actions Check**: GitHub Actions workflow completed successfully

### Alternative Solutions:

**Option 1: Use Railway Instead**
- Go to railway.app
- Connect GitHub repository
- Add `DISCORD_BOT_TOKEN` environment variable
- Get full Discord bot + web dashboard

**Option 2: Local Only**
- Run `npm run dev`
- Access at `localhost:5000`
- Full functionality with Discord bot

**Option 3: Simple Static Host**
- Build with `node build-pages.js`
- Upload `dist/` folder to any static host
- Works on Netlify, Vercel, etc.

---

## 💡 Common Mistakes

1. **Private Repository**: GitHub Pages requires PUBLIC repo for free tier
2. **Wrong Source**: Must use "GitHub Actions" not "Deploy from branch"
3. **Missing Files**: Make sure ALL project files are uploaded
4. **Impatient**: First build takes 3-5 minutes
5. **Wrong URL**: Format is `username.github.io/repo-name`

---

## 📞 Get Help

If you're still stuck, tell me specifically:
1. What step are you on?
2. What error message do you see?
3. What URL are you trying to access?
4. Did the GitHub Actions workflow complete?

I can help debug the specific issue you're facing!
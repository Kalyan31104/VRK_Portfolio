# Deployment Guide

## Option 1: Free Static Hosting (Easiest)

Deploy just the HTML, CSS, and JS files (no server needed).

### GitHub Pages
```bash
# 1. Create a GitHub repository named "portfolio" or "username.github.io"
# 2. Push your files to GitHub
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/your-username/portfolio.git
git push -u origin main

# 3. Go to Settings → Pages → Deploy from branch (main)
# Your portfolio is now at: https://github.com-username.github.io
```

### Netlify
```bash
# 1. Drag and drop your portfolio folder to netlify.com
# OR connect GitHub repository
# 2. Netlify auto-deploys on every push
# Your portfolio is now live with a Netlify domain
```

### Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Your portfolio is now live
```

**Note:** Contact form will use mailto fallback (no SMTP backend)

---

## Option 2: Deploy Full Server (With Email Backend)

Deploy the Node.js server with Nodemailer for actual email sending.

### Railway (Easiest for Node.js)
```bash
# 1. Push your repo to GitHub
# 2. Go to railway.app → New Project → Deploy from GitHub
# 3. Add environment variables:
#    - SMTP_HOST: smtp.gmail.com
#    - SMTP_PORT: 587
#    - SMTP_SECURE: false
#    - SMTP_USER: your-email@gmail.com
#    - SMTP_PASS: your-gmail-app-password
#    - CONTACT_TO_EMAIL: vuppureddykalyan@gmail.com
# 4. Railway auto-deploys and assigns a URL
```

### Render
```bash
# 1. Sign in to render.com
# 2. Create New → Web Service
# 3. Connect your GitHub repo
# 4. Build: npm install
# 5. Start: npm start
# 6. Add environment variables in Dashboard
# 7. Deploy!
```

### Heroku (Now Paid)
```bash
# 1. Install Heroku CLI
# 2. heroku login
# 3. heroku create your-portfolio-name
# 4. Add environment variables:
#    heroku config:set SMTP_USER=your-email@gmail.com
#    heroku config:set SMTP_PASS=your-app-password
# 5. git push heroku main
```

### AWS / DigitalOcean (VPS)
```bash
# 1. Rent a server (~$3-5/month)
# 2. SSH into server
# 3. Install Node.js: apt-get install nodejs npm
# 4. Clone your repo: git clone your-repo.git
# 5. cd portfolio && npm install
# 6. Set up environment variables in .env
# 7. Use PM2 to keep it running:
#    npm install -g pm2
#    pm2 start server.js
#    pm2 save
# 8. Point domain to server IP
```

---

## Recommended Setup

**For beginners:**
- Use **Netlify** (free, easy, no backend needed)
- Contact form will use mailto fallback

**For full features:**
- Use **Railway** or **Render** (deploy full Node server)
- Contact form sends actual emails via SMTP
- Free tier available, paid options if needed

---

## Custom Domain

After deploying to any service:

1. Buy domain (godaddy.com, namecheap.com, etc.)
2. Update nameservers to point to your hosting:
   - **Netlify**: Copy nameservers from Deploy Settings
   - **Railway**: Add CNAME record
   - **GitHub Pages**: Add custom domain in Settings

---

## Step-by-Step: Deploy to Railway (Full Version)

### 1. Prepare GitHub
```bash
git add .
git commit -m "Portfolio ready for deployment"
git push origin main
```

### 2. Sign up on Railway
- Go to railway.app
- Click "Start Project"
- Select "Deploy from GitHub"

### 3. Connect Repo
- Authorize GitHub
- Select your portfolio repository
- Railway automatically detects Node.js app

### 4. Add Environment Variables
In Railway dashboard → Variables:
```
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=vuppureddykalyan@gmail.com
```

### 5. Deploy
- Click "Deploy" button
- Railway builds and runs your app
- You get a live URL: https://your-project.up.railway.app

### 6. Add Custom Domain (Optional)
- In Railway → Settings → Domains
- Add your custom domain
- Update domain DNS settings

---

## Getting Gmail App Password

Required only if deploying with backend email:

1. Go to myaccount.google.com
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Select "Mail" + "Other (custom name)"
5. Generate password (16 characters)
6. Copy to SMTP_PASS in deployment

---

## Deployment Checklist

- [ ] All files committed to GitHub
- [ ] .env.example in repo, .env NOT committed
- [ ] Environment variables configured on hosting platform
- [ ] Resume PDF exists in assets/
- [ ] Photo exists in assets/
- [ ] npm start works locally before deploying
- [ ] Test portfolio at live URL
- [ ] Test contact form
- [ ] Test resume download
- [ ] Test dark/light theme toggle

---

## Troubleshooting Deployment

**Issue: "Cannot find module"**
- Run `npm install` before deploying

**Issue: "Port not available"**
- Your hosting platform sets PORT automatically

**Issue: Contact form returns 500 error**
- Check SMTP variables are set correctly
- Verify Gmail App Password is correct
- Check CONTACT_TO_EMAIL is valid

**Issue: Assets (photo, resume) missing**
- Ensure assets/ folder is committed to GitHub
- Check file paths are relative: `assets/filename`

---

## What to Deploy

| Option | Files | Backend | Email |
|--------|-------|---------|-------|
| Static (GitHub Pages) | HTML, CSS, JS, assets | ❌ | Mailto only |
| Netlify | HTML, CSS, JS, assets | ❌ | Mailto only |
| Railway/Render | All files + server.js | ✅ | SMTP + Mailto |
| VPS | All files + server.js | ✅ | SMTP + Mailto |

---

## Next Steps

1. Choose deployment option (Railway recommended for full features)
2. Push to GitHub
3. Connect GitHub to hosting platform
4. Add environment variables
5. Deploy and test!

Questions? Let me know which platform you choose!

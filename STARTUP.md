# Portfolio Startup Guide

## Quick Start

### Option 1: Open HTML Directly (No Server)
- Simply open `index.html` in your browser
- All features work except SMTP email backend
- Contact form automatically uses mailto fallback (opens your email client)

### Option 2: Run with Node.js Server

**Step 1: Verify Dependencies**
```bash
npm list
```
Should show: express, nodemailer, dotenv

**Step 2: Start Server**
```bash
npm start
```
Expected output: "Portfolio server running on http://localhost:3000"

**Step 3: Open Browser**
Visit: http://localhost:3000

## Troubleshooting

### Issue: Server exits immediately with no output
- Verify node_modules exist: `dir node_modules`
- Check .env file is readable
- Try: `node -e "console.log('Node works')"`

### Issue: Contact form not sending emails
- **This is expected without SMTP setup** ✓
- The mailto fallback automatically opens your email client
- To enable SMTP sending, edit .env with your Gmail credentials

### Issue: Resume download not working
- Verify file exists: Check `assets/vuppu_Reddy_Kalyan_Resume.pdf`
- Check browser console for errors (F12)

### Issue: Portfolio looks broken or unstyled
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Press F12 to check for console errors

## Features Included
✓ Dark/Light theme toggle
✓ Responsive design
✓ Interactive skills with filters
✓ Education timeline
✓ Project showcases
✓ Resume download
✓ Contact form with email (mailto fallback)
✓ Custom scrollbar
✓ Smooth animations

## Support
If you encounter issues:
1. Check browser console (F12) for JavaScript errors
2. Verify all assets exist: index.html, style.css, script.js, server.js
3. Ensure node_modules is not corrupted: run `npm install` again
4. Try opening index.html directly to isolate server issues

# EmailJS Configuration - Step by Step

## Summary
Your contact form now uses **EmailJS** to send emails directly from the browser. No backend server needed!

---

## Step 1: Sign Up for EmailJS

1. Go to **https://www.emailjs.com/**
2. Click "Sign Up Free"
3. Create account with email/password
4. Verify email address
5. Log in to dashboard

---

## Step 2: Set Up Email Service

### Option A: Using Gmail (Recommended)

1. In EmailJS Dashboard → **Email Services**
2. Click **"Add Service"**
3. Select **"Gmail"**
4. Click **"Connect with Gmail"**
5. Authorize EmailJS to access your Gmail
6. Complete setup
7. **Copy your Service ID** (looks like: `service_abc123def456`)

### Option B: Using Other Email Providers

1. Email Services → Add Service
2. Choose your provider (Outlook, SendGrid, Mailgun, etc.)
3. Enter SMTP credentials
4. Click "Add Service"

---

## Step 3: Create Email Template

1. Dashboard → **Email Templates**
2. Click **"Create New Template"**
3. **Template name (IMPORTANT!):** `contact_form`
4. Configure template:

**From name:** {{from_name}}
**From email:** {{from_email}}

**To email:** vuppureddykalyan@gmail.com

**Subject:** Portfolio Contact Form - Message from {{from_name}}

**Text content:**
```
Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

5. Click **"Save"**
6. **Copy your Template ID** (looks like: `template_abc123def456`)

---

## Step 4: Get Your Public Key

1. Dashboard → **Account** (top right)
2. Select **"API Keys"**
3. Copy your **Public Key** (looks like: `abc123def456ghi789`)
4. Keep it safe - don't commit to GitHub!

---

## Step 5: Update script.js

In your `script.js` file, find these lines (around line 280):

```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual Public Key.

Also find these lines:

```javascript
await emailjs.send(
  "YOUR_SERVICE_ID_HERE",
  "YOUR_TEMPLATE_ID_HERE",
  payload
);
```

Replace:
- `YOUR_SERVICE_ID_HERE` with your Service ID
- `YOUR_TEMPLATE_ID_HERE` with your Template ID

---

## Complete Example

After setup, your code should look like:

```javascript
if (contactForm) {
  emailjs.init("abc123def456ghi789");  // Your actual Public Key

  contactForm.addEventListener("submit", async (event) => {
    // ... form validation ...

    try {
      await emailjs.send(
        "service_abc123def456",  // Your actual Service ID
        "contact_form",          // Your template name
        payload
      );
      // Success handling...
    } catch (error) {
      // Error handling...
    }
  });
}
```

---

## Testing

1. Open your portfolio in browser
2. Scroll to Contact section
3. Fill in form:
   - Name: Test User
   - Email: your-email@gmail.com
   - Message: Test message
4. Click Send
5. Check your email (vuppureddykalyan@gmail.com)

You should receive the email within seconds!

---

## Deployment Benefits

✅ **No backend needed** - Works on GitHub Pages, Netlify, Vercel, etc.
✅ **free tier** - 200 emails/month free
✅ **Instant deployment** - Just push to GitHub
✅ **Works everywhere** - No server setup required

---

## FAQ

**Q: Is my email safe?**
A: Yes. EmailJS is a trusted service. Your email is only shown to you and EmailJS (as the sender).

**Q: What if I exceed 200 emails/month?**
A: Upgrade to paid plan. Very affordable ($25/month for 5000 emails).

**Q: Can I use a different email to receive messages?**
A: Yes! In the email template, change "To email" to any address.

**Q: What if form doesn't send?**
A: Check browser console (F12) for errors. Most common causes:
   - Wrong Public Key
   - Wrong Service ID
   - Wrong Template name
   - Template name doesn't match "contact_form"

**Q: Do I still need server.js and .env?**
A: No! You can delete them now. EmailJS removes the need for backend.

---

## Updated Deployment

Since no backend is needed anymore, you can deploy to:
✅ GitHub Pages (very easy)
✅ Netlify
✅ Vercel
✅ Any static host

See DEPLOYMENT.md for options. Recommended: **GitHub Pages or Netlify** (both free and instant).

---

## Next Steps

1. ✅ Sign up for EmailJS
2. ✅ Set up Gmail service
3. ✅ Create email template
4. ✅ Get Public Key, Service ID, Template ID
5. ✅ Update script.js with your IDs
6. ✅ Test locally
7. ✅ Deploy to GitHub Pages or Netlify
8. 🎉 Done!

Need help? EmailJS has great docs at docs.emailjs.com

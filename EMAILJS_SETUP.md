# EmailJS Setup Guide

## What is EmailJS?

EmailJS lets you send emails directly from JavaScript without a backend server. Perfect for contact forms.

## Setup Steps

### 1. Sign Up
- Go to emailjs.com
- Sign up (free tier available)
- Create account

### 2. Add Email Service
- Dashboard → Email Services → Add Service
- Choose provider (Gmail, Outlook, SendGrid, etc.)
- For Gmail: Use your Gmail address
- Complete authorization

### 3. Create Email Template
- Dashboard → Email Templates → Create New
- Template name: `contact_form` (use this exact name)
- Set From: {{from_name}} {{from_email}}
- Set To: your-email@gmail.com
- Subject: Portfolio Contact Form from {{from_name}}
- Body:
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```
- Save template

### 4. Get Your IDs
- Copy your: **Service ID** 
- Copy your: **Template ID**
- Copy your: **Public Key** (Settings → API Keys)

### 5. Update Portfolio
- In script.js: Add EmailJS library
- Add your IDs to the contact form handler
- Done!

## Implementation

The contact form code will be updated to use EmailJS. No backend server needed, contact form works immediately.

## Benefits
✓ No backend required
✓ Emails sent instantly
✓ Free tier available
✓ Client-side only
✓ Works anywhere (static hosting)

## Cost
- Free: 200 emails/month
- Paid: More emails if needed

See DEPLOYMENT.md for hosting options now that backend isn't required.

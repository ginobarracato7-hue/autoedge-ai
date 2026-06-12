# AutoEdge AI Newsletter — Quick Start (30 minutes)

**Status:** ✅ Ready to deploy  
**What's done:** Website updated, Google Apps Script written  
**What you do:** Create Google Form + Apps Script + Deploy

---

## 🎯 Your 4-Step Path to Launch

### Step 1: Create Google Form (5 min)

1. Go to [forms.google.com](https://forms.google.com)
2. Click **Create** → **Blank form**
3. **Name:** `AutoEdge AI Newsletter`
4. **Description:** `Get weekly AI tips for service businesses`
5. **Add two questions:**
   - Q1: "First Name" (Short answer, required)
   - Q2: "Email Address" (Email, required)
6. **Settings:**
   - Click the gear icon (top right)
   - Check: "Collect email addresses"
   - Under "Responses," select: Your "Newsletter Subscribers" Google Sheet
7. **Get embed code:**
   - Click **Share** button
   - Click **< >** (embed code icon)
   - **Copy the embed URL** — looks like: `https://docs.google.com/forms/d/e/FORM_ID_HERE/viewform?embedded=true`

**Save your Form ID somewhere** — you'll use it next.

---

### Step 2: Set Up Google Apps Script (10 min)

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New project**
3. Name it: `AutoEdge Newsletter`
4. Copy all code from `GOOGLE_APPS_SCRIPT.gs` file
5. Paste it into the Apps Script editor
6. Click **Save**
7. Click **Run** → Select `sendWeeklyAITips` → Authorize
8. **Check your email** — you should receive a test email ✓

---

### Step 3: Create Weekly Schedule (5 min)

In the Apps Script editor:

1. Click **Triggers** (left sidebar)
2. Click **+ Create new trigger**
3. Settings:
   - Function: `sendWeeklyAITips`
   - Event: Time-driven
   - Type: Week timer
   - Day: Friday
   - Time: 2:00 PM – 3:00 PM
4. Click **Save**
5. You should see the trigger listed ✓

---

### Step 4: Update Website & Deploy (10 min)

1. **Update newsletter form with your Google Form ID:**
   - In `index.html`, find: `GOOGLE_FORM_ID`
   - Replace with your Form ID from Step 1
   - Save file

2. **Commit and push:**
```powershell
cd projects/AutoEdge-AI/live-autoedge-ai
git add index.html js/app.js
git commit -m "Switch to Google Forms for newsletter + Apps Script for Friday emails"
git push origin main
```

3. **Cloudflare deploys automatically** (30 seconds)

---

## ✅ Testing

1. **Visit autoedge-ai.com**
2. **Scroll to newsletter section**
3. **Fill out the Google Form:**
   - First Name: Test
   - Email: your-email@gmail.com
4. **Submit**
5. **Check Google Sheet** — new row appears ✓
6. **Friday 2:00 PM** — Check email for AI tip ✓

---

## 📊 What Happens Every Friday at 2:00 PM

1. Google Apps Script automatically runs
2. Reads all subscribers from Google Sheet
3. Calls Claude API to generate a fresh AI tip
4. Sends personalized email to each subscriber
5. All happens silently in background

---

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| Google Forms | Free |
| Google Sheets | Free |
| Google Apps Script | Free |
| Gmail | Free |
| Claude API (~1 tip/week) | ~$0.05/week |
| **Total** | ~$2/month |

---

## 🔒 Security Note

After Friday's first email arrives:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Delete your old Claude API key
3. Create a new one
4. Update it in Apps Script:
   - Change: `const CLAUDE_API_KEY = 'your-new-key'`
   - Click Save
   - Click Run to test

---

## 📁 Files Used

- `GOOGLE_APPS_SCRIPT.gs` — Copy/paste this code
- `GOOGLE_APPS_SCRIPT_DEPLOYMENT.md` — Detailed instructions
- `index.html` — Updated with Google Form embed
- `js/app.js` — Removed old form handler

---

## 🚀 Next Steps

1. **Create Google Form** (Step 1 above)
2. **Set up Apps Script** (Step 2 above)
3. **Create trigger** (Step 3 above)
4. **Update website code** with Form ID (Step 4 above)
5. **Deploy to Cloudflare**
6. **Test on Friday**

---

**Timeline:** 30 minutes  
**Difficulty:** Easy (all copy-paste + form creation)  
**Result:** Fully automated newsletter running every Friday

---

**Ready? Start with Step 1!** ⬆️

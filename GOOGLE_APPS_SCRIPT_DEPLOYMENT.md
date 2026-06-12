# Google Apps Script Deployment Guide

**Time required:** 15 minutes  
**Result:** Automatic weekly AI tips every Friday at 2:00 PM

---

## Step 1: Open Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New project**
3. Name it: `AutoEdge Newsletter`

---

## Step 2: Copy the Script Code

1. Copy all code from `GOOGLE_APPS_SCRIPT.gs` (in the autoedge-ai repo)
2. Paste into the Apps Script editor (replace any default code)
3. Click **Save**

**The code is already configured with:**
- Your Google Sheet ID
- Your Claude API key
- Your email address (ginobarracato7@gmail.com)

---

## Step 3: Authorize the Script

When you first save, Google will ask for permissions:

1. Click **Run** (the play button)
2. Select function: `sendWeeklyAITips`
3. Google asks for authorization:
   - Click **Review Permissions**
   - Click your Google account
   - Click **Advanced** → "Go to AutoEdge Newsletter (unsafe)"
   - Click **Allow**
4. The script will run and test itself
5. **Check your email** — you should receive a test email ✓

---

## Step 4: Create Weekly Trigger (Friday 2:00 PM)

1. In Apps Script, click **Triggers** (left sidebar, looks like a clock)
2. Click **+ Create new trigger**
3. Configure:
   - Function: `sendWeeklyAITips`
   - Deployment: Head
   - Event source: Time-driven
   - Type: Week timer
   - Day: Friday
   - Time: 2:00 PM – 3:00 PM
4. Click **Save**
5. You should see the trigger listed ✓

---

## Step 5: Test the Script

**Test 1: Manual trigger**
1. Go back to the script editor
2. Select function: `testEmailSend`
3. Click **Run** (play button)
4. Check your email in 30 seconds ✓

**Test 2: Check logs**
1. Click **Execution log** to see what happened
2. Look for green checkmarks (✓) = success

---

## Step 6: Update Website Form

Now replace the custom form with the Google Form embed:

1. In the website code, find the newsletter form section (around line 267 in index.html)
2. Replace the entire `<form id="newsletter-form">` section with:

```html
<iframe 
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
  width="100%" 
  height="400" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0"
>Loading…</iframe>
```

**Get YOUR_FORM_ID:**
- Go to your Google Form
- Click **Share** (top right)
- Click **< >** (embed icon)
- Copy the form ID from the embed code

3. Update the HTML with your form ID
4. Delete the old JavaScript form handler (the `newsletter-form` submit listener in js/app.js)
5. Commit and push:
```powershell
cd projects/live-autoedge-ai
git add index.html js/app.js
git commit -m "Switch to Google Form for newsletter signups"
git push origin main
```

---

## Step 7: Verify Everything Works

**Checklist:**
- [ ] Apps Script created and saved
- [ ] Authorized with your Google account
- [ ] Test email received in inbox ✓
- [ ] Weekly trigger created for Friday 2:00 PM ✓
- [ ] Google Form created and embedded
- [ ] Website code updated
- [ ] Code pushed to GitHub

---

## How It Works

**Friday at 2:00 PM:**
1. Apps Script trigger fires automatically
2. Script reads all subscribers from Google Sheet
3. Calls Claude API to generate a fresh AI tip
4. Sends personalized email to each subscriber
5. All happens silently in the background

**Subscribers get:**
- Personalized greeting (Hi FirstName)
- Fresh AI tip written just for that moment
- Call to action (text or visit website)
- Reply option

---

## Troubleshooting

**"Authorization failed" or permissions error?**
- Click **Run** again
- Follow the authorization flow
- Make sure you click **Allow** on the final screen

**Test email didn't arrive?**
- Check spam folder
- Verify Gmail isn't blocking the email
- Check the execution log for errors

**Friday email not sending?**
- Verify trigger is created (Triggers page shows it)
- Check Apps Script execution log (Executions tab)
- Run `testEmailSend` manually to verify Claude API works

**Claude API error?**
- Verify API key is correct (starts with `sk-ant-api03-`)
- Check you have API credits on your Anthropic account
- Run `testEmailSend` to see exact error

**Google Sheet not found?**
- Verify Sheet ID is correct: `1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew`
- Verify sheet name is: `Sheet1`
- Check the script has permission to access the sheet

---

## Cost

| Service | Cost |
|---------|------|
| Google Apps Script | Free |
| Google Forms | Free |
| Google Sheets | Free |
| Gmail (via Apps Script) | Free |
| Claude API | ~$0.01 per tip (~$0.05/week) |
| **Total** | ~$0.05/week |

---

## After Friday's First Email

**Important: Regenerate Claude API Key**

Your API key is now in the Apps Script. For security:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys**
3. Delete: `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`
4. Create a new key
5. Update the Apps Script with the new key:
   - In Apps Script, change: `const CLAUDE_API_KEY = 'your-new-key'`
   - Click **Save**
   - Click **Run** to test

---

## You Now Have

✅ **Google Form** for newsletter signups  
✅ **Google Sheet** storing all subscribers  
✅ **Apps Script** running every Friday at 2:00 PM  
✅ **Claude AI** generating fresh tips  
✅ **Gmail** sending emails to subscribers  
✅ **Zero cost** (except $0.05/week for Claude)

---

**Next step:** Follow the steps above and let me know when the test email arrives!

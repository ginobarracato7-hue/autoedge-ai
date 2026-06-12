# Make.com Setup Guide for AutoEdge AI Newsletter

**Goal:** Create 2 scenarios to capture newsletter signups and send weekly AI tips every Friday at 2:00 PM.

**Time Required:** 15-20 minutes

---

## Prerequisites

Before you start, have these ready:

- [ ] Make.com account (logged in)
- [ ] Google account (for Sheets + Gmail)
- [ ] Claude API key: `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`
- [ ] Google Sheet ID: `1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew`

---

## Scenario 1: Newsletter Signup Capture

### Step 1: Create Scenario

1. Go to [make.com](https://make.com)
2. Click **Scenarios** (left sidebar)
3. Click **Create a new scenario**
4. Name: `Newsletter - Capture Signups`
5. Click anywhere in the canvas

### Step 2: Add Webhook Trigger

1. Click in the empty canvas
2. Search: `webhooks`
3. Click **Webhooks > Custom Webhook**
4. Click **Save**
5. A dialog appears — name it: `Newsletter Signup Form`
6. Click **Save** again
7. **COPY the webhook URL** — save it somewhere safe (you'll use this in the code)

**Your webhook URL looks like:**
```
https://hook.make.com/xxxxxxxxxxxx
```

### Step 3: Add Google Sheets Action

1. Click the **+** button after the webhook
2. Search: `google sheets`
3. Select **Google Sheets > Add a row**
4. Click **Connect** (if not already connected)
5. Log in with your Google account
6. Once authorized, configure:

**Spreadsheet:** Paste this ID:
```
1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew
```

**Sheet:** 
```
Sheet1
```

**Map the columns:**
- `first_name` → select from webhook
- `email` → select from webhook
- `subscribed_at` → select from webhook
- `source` → select from webhook

7. Click **OK**

### Step 4: Test Scenario 1

1. In the webhook trigger, click **Determine data structure**
2. Paste this test data:
```json
{
  "first_name": "Test User",
  "email": "test@gmail.com",
  "subscribed_at": "2026-06-12T14:00:00Z",
  "source": "website_newsletter"
}
```
3. Click **Save**
4. Go to your Google Sheet — a new row should appear ✓
5. If it worked, come back to Make

### Step 5: Activate Scenario 1

- Toggle the scenario **ON** (top left corner)
- You should see a green dot = running

---

## Scenario 2: Friday 2:00 PM AI Tips

### Step 1: Create New Scenario

1. Click **Create a new scenario**
2. Name: `Newsletter - Friday AI Tips`

### Step 2: Add Schedule Trigger

1. Click in the canvas
2. Search: `schedule`
3. Select **Schedule > Trigger**
4. Configure these exact settings:

| Setting | Value |
|---------|-------|
| Type | Weekly |
| Day of week | Friday |
| Hour | 14 |
| Minute | 00 |
| Timezone | America/New_York |

5. Click **OK**

### Step 3: Get All Subscribers from Google Sheets

1. Click **+** after the schedule trigger
2. Search: `google sheets`
3. Select **Get all rows**
4. Configure:

**Spreadsheet:**
```
1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew
```

**Sheet:**
```
Sheet1
```

5. Click **OK**

### Step 4: Add Array Iterator (Loop Through Subscribers)

1. Click **+** after Google Sheets
2. Search: `array iterator`
3. Click it
4. In **Array**, click the blue array icon
5. Select the output from Google Sheets (rows)
6. Click **OK**

### Step 5: Generate AI Tip (HTTP Call to Claude)

1. Click **+** (this should be INSIDE the iterator loop)
2. Search: `http`
3. Select **HTTP > Make a request**
4. Configure:

**URL:**
```
https://api.anthropic.com/v1/messages
```

**Method:**
```
POST
```

**Headers - Add these:**

Header 1:
- Key: `x-api-key`
- Value: `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`

Header 2:
- Key: `Content-Type`
- Value: `application/json`

**Body Type:** Raw

**Body (paste exactly):**
```json
{
  "model": "claude-opus-4-8",
  "max_tokens": 600,
  "messages": [
    {
      "role": "user",
      "content": "Write a SHORT, actionable AI tip for service business owners (roofers, HVAC, plumbers, contractors). Help them save time, get more leads, or close more jobs using AI. Keep it 120 words max. Be specific and practical. End with ONE action they can take TODAY. Format: **[TITLE]** - [TIP] - [ACTION]"
    }
  ]
}
```

5. Click **OK**

### Step 6: Send Email to Each Subscriber (Gmail)

1. Click **+** (still inside the iterator)
2. Search: `gmail`
3. Select **Gmail > Send an email**
4. Click **Connect** and authorize your Gmail account
5. Configure:

**To:**
- Click the blue map icon
- Navigate to: `iterator` > `value` > column `B` (the email)

**Subject:**
```
Weekly AI Tip for Your Service Business
```

**Body (paste exactly):**
```
Hi {{iterator.value.A}},

Here's this week's AI strategy:

{{result}}

---

Questions? Reply to this email.

Ready to automate your service business?
Text 410-831-1858 or visit autoedge-ai.com

AutoEdge AI
```

(Replace `{{result}}` with the output from the HTTP Claude API step)

6. Click **OK**

### Step 7: Test Scenario 2

1. Click **Run once** (top of scenario)
2. Watch the execution log
3. You should see:
   - Schedule triggered ✓
   - Google Sheets fetched rows ✓
   - Iterator looped through subscribers ✓
   - Claude API generated a tip ✓
   - Email sent ✓
4. Check your inbox — you should receive the AI tip ✓

### Step 8: Activate Scenario 2

- Toggle the scenario **ON** (top left)
- Green dot = running

---

## Step 9: Update Code with Webhook URL

Now that Scenario 1 is running, you need to give the website form the webhook URL:

1. Open: `projects/live-autoedge-ai/js/app.js`
2. Find line ~140:
```javascript
const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```
3. Replace with your Make webhook URL:
```javascript
const WEBHOOK_URL = 'https://hook.make.com/your-unique-id';
```
4. Save the file

### Deploy the Code

```powershell
cd projects/live-autoedge-ai
git add js/app.js
git commit -m "Connect newsletter form to Make webhook"
git push origin main
# Cloudflare auto-deploys
```

---

## Final Testing Checklist

- [ ] Scenario 1 is **ON** (green dot)
- [ ] Scenario 2 is **ON** (green dot)
- [ ] Webhook URL copied to `js/app.js`
- [ ] Code pushed to GitHub
- [ ] Visit autoedge-ai.com
- [ ] Submit newsletter form with test email
- [ ] Email appears in Google Sheet within 30 seconds ✓
- [ ] Tomorrow at 2:00 PM — check inbox for AI tip ✓
- [ ] Next Friday at 2:00 PM — automated email arrives ✓

---

## Troubleshooting

**Webhook not receiving data?**
- Make sure the code has the correct webhook URL
- Click "Run once" on the webhook to get test data
- Verify Google Sheet is writable

**Claude API returning error?**
- Check API key is correct (starts with `sk-ant-api03-`)
- Verify headers are set (x-api-key and Content-Type)
- Check JSON body is valid (no typos)

**Gmail not sending?**
- Make sure Gmail is authorized
- Verify email field is mapped to subscriber email
- Check Gmail hasn't blocked the app

**Scenario not running Friday at 2:00 PM?**
- Verify timezone is correct
- Make sure scenario toggle is ON
- Check Make account is active and not in trial period

---

## After Setup

**Important Security Note:**
The Claude API key is now visible in your Make scenario. After everything is working:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys**
3. Delete the old key: `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`
4. Create a new key
5. Update Scenario 2's HTTP headers with the new key

---

## You Now Have

✅ Newsletter signup form on autoedge-ai.com  
✅ All signups stored in Google Sheets  
✅ Automatic AI-generated tips every Friday at 2:00 PM  
✅ Emails sent to all subscribers with actionable advice  
✅ Complete integration with Claude API for tip generation

**Total cost:** Free (Make has free tier for simple scenarios)

---

**Questions? Let me know at any step!**

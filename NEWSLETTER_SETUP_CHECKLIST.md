# AutoEdge AI Newsletter - Complete Setup Checklist

## ✅ What's Already Done

- [x] Newsletter HTML section added to website
- [x] Newsletter CSS styling added (matches live design)
- [x] Newsletter JavaScript form handler added
- [x] Google Sheet created and shared
- [x] Make scenario JSON templates created
- [x] Detailed step-by-step setup guide created

---

## 📋 Your To-Do List (In Order)

### Phase 1: Create Make Scenarios (15 min)

**Scenario 1: Newsletter Signup Capture**

- [ ] Go to [make.com](https://make.com)
- [ ] Create new scenario named: `Newsletter - Capture Signups`
- [ ] Add: **Webhooks > Custom Webhook** trigger
- [ ] Copy the webhook URL and save it
- [ ] Add: **Google Sheets > Add a row** action
- [ ] Configure Google Sheets:
  - Spreadsheet: `1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew`
  - Sheet: `Sheet1`
  - Map: first_name, email, subscribed_at, source
- [ ] Test with sample data
- [ ] Toggle scenario **ON**

**Scenario 2: Friday 2:00 PM AI Tips**

- [ ] Create new scenario named: `Newsletter - Friday AI Tips`
- [ ] Add: **Schedule > Trigger** (Friday, 14:00)
- [ ] Add: **Google Sheets > Get all rows**
- [ ] Add: **Array Iterator** to loop through subscribers
- [ ] Add: **HTTP > Make a request** to Claude API
  - URL: `https://api.anthropic.com/v1/messages`
  - Headers: x-api-key (your Claude key) + Content-Type
  - Body: JSON with Claude prompt
- [ ] Add: **Gmail > Send email** inside iterator
  - To: subscriber email
  - Subject: `Weekly AI Tip for Your Service Business`
  - Body: Hello message + Claude output
- [ ] Test with "Run once"
- [ ] Toggle scenario **ON**

---

### Phase 2: Update Website Code (5 min)

- [ ] Open `projects/live-autoedge-ai/js/app.js`
- [ ] Find line ~140: `const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';`
- [ ] Replace with your Make webhook URL from Scenario 1
- [ ] Save file
- [ ] Commit: `git add js/app.js && git commit -m "Connect newsletter to Make webhook"`
- [ ] Push: `git push origin main`
- [ ] Wait for Cloudflare to deploy (30 seconds)

---

### Phase 3: Test End-to-End (5 min)

- [ ] Visit autoedge-ai.com
- [ ] Scroll to newsletter section
- [ ] Submit test form:
  - First Name: `Test`
  - Email: `your-email@gmail.com`
- [ ] Click "Get Free AI Tips"
- [ ] Check Google Sheet → new row appears
- [ ] Watch Make logs → webhook received data
- [ ] Friday 2:00 PM → check inbox for AI tip email

---

### Phase 4: Secure Your API Key (5 min)

- [ ] Go to [console.anthropic.com](https://console.anthropic.com)
- [ ] Click **API Keys**
- [ ] Delete the old key (the one in Make scenarios)
- [ ] Create a new API key
- [ ] Update Scenario 2 HTTP headers with new key
- [ ] Test one more time

---

## 📁 Files You'll Use

All in `projects/live-autoedge-ai/`:

| File | Purpose |
|------|---------|
| `MAKE_SETUP_GUIDE.md` | **READ THIS FIRST** — Step-by-step instructions |
| `make-scenario-1-capture-signups.json` | Reference for Scenario 1 config |
| `make-scenario-2-friday-ai-tips.json` | Reference for Scenario 2 config |
| `js/app.js` | Add webhook URL here (line ~140) |
| `index.html` | Newsletter form already added |
| `css/style.css` | Newsletter styles already added |

---

## 🔑 Key Values (Copy These)

**Google Sheet ID:**
```
1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew
```

**Claude API Key:**
```
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
```

**Claude API Endpoint:**
```
https://api.anthropic.com/v1/messages
```

**Claude Model:**
```
claude-opus-4-8
```

---

## ✨ What You'll Have When Done

✅ **Newsletter signup form** on autoedge-ai.com  
✅ **All signups stored** in Google Sheets  
✅ **Every Friday at 2:00 PM**:
- Claude generates a unique AI tip
- Email sent to all subscribers
- Tip is actionable and specific to service businesses

✅ **Complete integration** between:
- Website form
- Make automation
- Google Sheets (data storage)
- Claude API (tip generation)
- Gmail (email delivery)

---

## 🎯 Next Steps

1. **Read:** `MAKE_SETUP_GUIDE.md` (in this folder)
2. **Follow:** Step-by-step instructions
3. **Create:** Two Make scenarios
4. **Update:** js/app.js with webhook URL
5. **Deploy:** Push to GitHub
6. **Test:** Submit form, check results

---

## ❓ Questions?

Refer to the detailed **MAKE_SETUP_GUIDE.md** for:
- Exact step-by-step screenshots descriptions
- Copy-paste configuration values
- Troubleshooting tips
- Testing checklist

---

## ⏱️ Timeline

- **Phase 1 (Make scenarios):** 15 minutes
- **Phase 2 (Update code):** 5 minutes
- **Phase 3 (Test):** 5 minutes
- **Phase 4 (Secure key):** 5 minutes

**Total:** ~30 minutes

**You can do this!** The heavy lifting is already done — just follow the guide and wire it together.

---

**Status:** ✅ Ready to implement

Start with `MAKE_SETUP_GUIDE.md` → let me know if you hit any blocks!

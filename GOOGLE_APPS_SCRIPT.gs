// ============================================================================
// AutoEdge AI Newsletter — Google Apps Script
// Purpose: Send weekly AI tips every Friday at 2:00 PM via Gmail
// ============================================================================

// CONFIG — Update these values
const SHEET_ID = '1t-BHvIiIQfQhQLPgJFw-TOS5dTuoG8PRO4awcJBBKew';
const SHEET_NAME = 'Sheet1';
const CLAUDE_API_KEY = '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';
const YOUR_EMAIL = 'ginobarracato7@gmail.com'; // Your Gmail address for sending

// ============================================================================
// MAIN FUNCTION: Send Weekly AI Tips
// ============================================================================
function sendWeeklyAITips() {
  try {
    Logger.log('Starting weekly AI tips send...');

    // Get all subscribers from Google Sheet
    const subscribers = getSubscribers();
    Logger.log(`Found ${subscribers.length} subscribers`);

    if (subscribers.length === 0) {
      Logger.log('No subscribers found. Exiting.');
      return;
    }

    // Generate AI tip using Claude API
    const tip = generateAITip();
    Logger.log(`Generated tip: ${tip.substring(0, 50)}...`);

    // Send email to each subscriber
    for (let i = 0; i < subscribers.length; i++) {
      const subscriber = subscribers[i];

      if (!subscriber.email || !subscriber.firstName) {
        Logger.log(`Skipping invalid subscriber: ${JSON.stringify(subscriber)}`);
        continue;
      }

      const subject = 'Weekly AI Tip for Your Service Business';
      const body = formatEmailBody(subscriber.firstName, tip);

      try {
        GmailApp.sendEmail(
          subscriber.email,
          subject,
          body,
          {
            name: 'AutoEdge AI',
            from: YOUR_EMAIL,
            replyTo: YOUR_EMAIL
          }
        );
        Logger.log(`✓ Email sent to ${subscriber.email}`);
      } catch (emailError) {
        Logger.log(`✗ Failed to send to ${subscriber.email}: ${emailError}`);
      }
    }

    Logger.log('Weekly AI tips send completed!');
  } catch (error) {
    Logger.log(`Error in sendWeeklyAITips: ${error}`);
    GmailApp.sendEmail(YOUR_EMAIL, 'AutoEdge Newsletter Error', `Error: ${error}`);
  }
}

// ============================================================================
// GET SUBSCRIBERS: Read from Google Sheet
// ============================================================================
function getSubscribers() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    // Skip header row, get all data
    const subscribers = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[1]) { // Check if email exists (column B)
        subscribers.push({
          firstName: row[0] || 'Friend',
          email: row[1],
          subscribedAt: row[2],
          source: row[3]
        });
      }
    }

    return subscribers;
  } catch (error) {
    Logger.log(`Error reading subscribers: ${error}`);
    return [];
  }
}

// ============================================================================
// GENERATE AI TIP: Call Claude API
// ============================================================================
function generateAITip() {
  const prompt = `Write a SHORT, actionable AI tip for service business owners (roofers, HVAC, plumbers, contractors). Help them save time, get more leads, or close more jobs using AI. Keep it 120 words max. Be specific and practical. End with ONE action they can take TODAY. Format: **[TITLE]** - [TIP] - [ACTION]`;

  const payload = {
    model: 'claude-opus-4-8',
    max_tokens: 600,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  };

  const options = {
    method: 'post',
    headers: {
      'x-api-key': CLAUDE_API_KEY,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
    const result = JSON.parse(response.getContentText());

    if (result.content && result.content[0] && result.content[0].text) {
      return result.content[0].text;
    } else {
      Logger.log(`Unexpected API response: ${JSON.stringify(result)}`);
      return 'AI tip generation failed. Please try again later.';
    }
  } catch (error) {
    Logger.log(`Error calling Claude API: ${error}`);
    return 'Unable to generate tip at this time.';
  }
}

// ============================================================================
// FORMAT EMAIL: Create professional email body
// ============================================================================
function formatEmailBody(firstName, tip) {
  const body = `Hi ${firstName},

Here's this week's AI strategy:

${tip}

---

Questions? Reply to this email.

Ready to automate your service business?
Text 410-831-1858 or visit autoedge-ai.com

AutoEdge AI`;

  return body;
}

// ============================================================================
// SCHEDULE: Create trigger for Friday 2:00 PM
// ============================================================================
function createWeeklyTrigger() {
  // Remove any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'sendWeeklyAITips') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create new trigger: Every Friday at 2:00 PM
  ScriptApp.newTrigger('sendWeeklyAITips')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(14) // 2:00 PM
    .create();

  Logger.log('Weekly trigger created for Friday at 2:00 PM');
}

// ============================================================================
// TEST: Send test email to yourself
// ============================================================================
function testEmailSend() {
  try {
    Logger.log('Testing email send...');

    // Generate a tip
    const tip = generateAITip();

    // Send to yourself
    const subject = 'TEST: Weekly AI Tip for Your Service Business';
    const body = formatEmailBody('Test User', tip);

    GmailApp.sendEmail(YOUR_EMAIL, subject, body);
    Logger.log('✓ Test email sent!');
  } catch (error) {
    Logger.log(`✗ Test failed: ${error}`);
  }
}

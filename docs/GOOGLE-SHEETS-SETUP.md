# Connect JG Digital contact form → Google Sheets + Gmail

The website form is already coded. You only need to deploy Apps Script correctly.

## Why the form shows an error now

Your current Web App URL opens a **Google login page** instead of JSON.
That means access is not set to **Anyone**. Google then blocks public form submissions.

## Step 1 — Create the Google Sheet

1. Go to https://sheets.google.com
2. Create a blank spreadsheet
3. Name it: `JG Digital Website Leads`
4. Rename Sheet1 tab to: `Leads`
5. (Optional) Add headers in row 1:

| Submission Date and Time | Full Name | Email Address | Phone Number | Company Name | Service Interested In | Message | Form Type |

6. Copy the **Sheet ID** from the URL:

`https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit`

## Step 2 — Install Apps Script

1. In the Sheet: **Extensions → Apps Script**
2. Delete any default code
3. Open this file from the repo and copy all of it:

`docs/google-apps-script/Code.gs`

4. Paste into Apps Script
5. Replace:

`var SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';`

with your real Sheet ID
6. Click **Save**

## Step 3 — Deploy as Web App (most important)

1. **Deploy → New deployment**
2. Click the gear → choose **Web app**
3. Settings:
   - Description: `JG Digital leads`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. Copy the **Web App URL**  
   Example: `https://script.google.com/macros/s/XXXX/exec`

## Step 4 — Test the Web App URL

Open the Web App URL in an **Incognito / Private** window (logged out of Google).

✅ Good result (JSON):

```json
{"ok":true,"service":"JG Digital Contact Form","message":"Web App is live. Use POST to submit leads."}
```

❌ Bad result: Google Sign-in page  
→ Redeploy and set **Who has access: Anyone** again.

## Step 5 — Put the URL on the website

1. Open `docs/script.js`
2. Find:

```js
var GOOGLE_SCRIPT_URL = '...';
```

3. Paste your new Web App URL
4. Commit & push to GitHub (or ask the assistant to update it)

Also update `website/script.js` the same way.

## Step 6 — Test the live form

1. Open https://jhuma-cloud.github.io/jg-digital-website/#contact
2. Submit a test lead
3. Check:
   - Google Sheet new row
   - Gmail inbox: `jg.digital1926@gmail.com`
   - Subject: `New JG Digital Website Lead`

## Email contents

Each email includes:

- Full name
- Email
- Phone
- Company
- Service interested in
- Message
- Date and time

## If you edit Code.gs later

Deploy → Manage deployments → Edit (pencil) → **New version** → Deploy  
Then re-test the URL in Incognito.

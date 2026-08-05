/**
 * JG Digital — Website Contact Form → Google Sheet + Gmail
 *
 * HOW TO INSTALL (required once):
 * 1. Create a Google Sheet named "JG Digital Website Leads"
 * 2. Rename first tab to: Leads
 * 3. Extensions → Apps Script → delete default code → paste THIS entire file
 * 4. Paste your Sheet ID below into SPREADSHEET_ID
 *    (from the Sheet URL: docs.google.com/spreadsheets/d/SHEET_ID/edit)
 * 5. Save → Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone   ← MUST be "Anyone" (not "Only myself")
 * 6. Authorize with your Google account
 * 7. Copy the Web App URL and paste it into docs/script.js as GOOGLE_SCRIPT_URL
 *
 * Test: open the Web App URL in an Incognito/Private window.
 * You should see JSON like {"ok":true,...} — NOT a Google login page.
 */

var SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
var SHEET_NAME = 'Leads';
var NOTIFY_EMAIL = 'jhumaguha2024@gmail.com';
var EMAIL_SUBJECT = 'New JG Digital Website Lead';

function doGet() {
  return json_({
    ok: true,
    service: 'JG Digital Contact Form',
    message: 'Web App is live. Use POST to submit leads.'
  });
}

function doPost(e) {
  try {
    var data = parseBody_(e);

    if (data.honeypot || data.website) {
      return json_({ ok: true });
    }

    var name = trim_(data.name || data.fullName);
    var email = trim_(data.email);
    var phone = trim_(data.phone);
    var company = trim_(data.company);
    var service = trim_(data.service || data.service_type || data.serviceInterestedIn);
    var message = trim_(data.message);
    var formType = trim_(data.form_type || data.formType) || 'contact';
    var submittedAt = trim_(data.submittedAt) || new Date().toISOString();

    if (!name || !email || !message) {
      return json_({ ok: false, error: 'Name, email, and message are required.' });
    }

    if (!isValidEmail_(email)) {
      return json_({ ok: false, error: 'Invalid email address.' });
    }

    var sheet = getSheet_();
    var displayTime = Utilities.formatDate(
      new Date(submittedAt),
      Session.getScriptTimeZone() || 'Asia/Kolkata',
      'yyyy-MM-dd HH:mm:ss'
    );

    ensureHeaders_(sheet);

    sheet.appendRow([
      displayTime,
      name,
      email,
      phone || '',
      company || '',
      service || '',
      message,
      formType
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: EMAIL_SUBJECT,
      replyTo: email,
      body: [
        'You have a new lead from the JG Digital website.',
        '',
        'Full Name: ' + name,
        'Email Address: ' + email,
        'Phone Number: ' + (phone || '—'),
        'Company Name: ' + (company || '—'),
        'Service Interested In: ' + (service || '—'),
        'Message:',
        message,
        '',
        'Date and Time of Submission: ' + displayTime
      ].join('\n')
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body.');
  }

  var raw = String(e.postData.contents);
  var type = (e.postData.type || '').toLowerCase();

  // JSON (preferred — used by the website)
  if (type.indexOf('json') !== -1 || raw.charAt(0) === '{') {
    return JSON.parse(raw);
  }

  // Fallback: form-urlencoded / multipart parameter map
  var out = {};
  if (e.parameter) {
    Object.keys(e.parameter).forEach(function (key) {
      out[key] = e.parameter[key];
    });
  }
  return out;
}

function getSheet_() {
  var ss;

  if (SPREADSHEET_ID && SPREADSHEET_ID !== 'PASTE_YOUR_SHEET_ID_HERE') {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error(
      'Spreadsheet not found. Set SPREADSHEET_ID in Code.gs, or open Apps Script from inside your Google Sheet (Extensions → Apps Script).'
    );
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'Submission Date and Time',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Company Name',
    'Service Interested In',
    'Message',
    'Form Type'
  ]);
  sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function trim_(value) {
  return value == null ? '' : String(value).trim();
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

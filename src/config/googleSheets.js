const { google } = require("googleapis");

if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT is missing");
}

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

// Fix newline formatting for Vercel env vars
credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = sheets;

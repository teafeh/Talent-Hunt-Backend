const sheets = require("../config/googleSheets");

async function appendSubmissionRow(rowData) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:R",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowData],
    },
  });
}

module.exports = {
  appendSubmissionRow,
};

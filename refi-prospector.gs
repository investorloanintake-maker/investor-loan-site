// ================================================
// VIADOR REFI PROSPECTOR — Google Apps Script
// Paste into script.google.com bound to your sheet
// ================================================

const WORKER_URL = 'https://viador-ai-proxy.chad-7f6.workers.dev/score';
const RATE_LIMIT_MS = 1500;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('\ud83c\udfe0 Viador')
    .addItem('Score All Properties', 'scoreAllProperties')
    .addItem('Score Selected Rows', 'scoreSelectedRows')
    .addItem('Clear Results', 'clearResults')
    .addToUi();
}

function scoreAllProperties() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  scoreRows(sheet, 2, lastRow);
}

function scoreSelectedRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const startRow = range.getRow();
  const endRow = startRow + range.getNumRows() - 1;
  scoreRows(sheet, startRow, endRow);
}

function scoreRows(sheet, startRow, endRow) {
  const headers = [
    'Address', 'Est. Value', 'Equity @75% LTV',
    'Est. Loan Balance', 'Monthly Savings', 'DSCR',
    'Cash Flow/mo', 'Cap Rate', 'ViaScore', 'Verdict',
    'Best Strategy', 'Refi Priority', 'Scored At'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#1a1a1a')
    .setFontColor('#C4922A')
    .setFontWeight('bold');

  let processed = 0;
  let errors = 0;

  for (let row = startRow; row <= endRow; row++) {
    const address = sheet.getRange(row, 1).getValue();
    if (!address || address === 'Address') continue;

    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Scoring property ' + (processed + 1) + ' of ' + (endRow - startRow + 1) + ': ' + address,
      '\ud83c\udfe0 Viador Refi Prospector',
      3
    );

    try {
      const result = scoreProperty(address);
      writeResult(sheet, row, address, result);
      processed++;
    } catch(e) {
      sheet.getRange(row, 2).setValue('ERROR: ' + e.message);
      errors++;
    }

    Utilities.sleep(RATE_LIMIT_MS);
  }

  if (endRow > startRow) {
    const dataRange = sheet.getRange(2, 1, endRow - 1, 13);
    dataRange.sort([{column: 12, ascending: false}, {column: 3, ascending: false}]);
  }

  SpreadsheetApp.getActiveSpreadsheet().toast(
    'Complete! ' + processed + ' scored, ' + errors + ' errors.',
    '\u2705 Viador Done',
    5
  );
}

function scoreProperty(address) {
  const parts = address.split(',').map(function(s) { return s.trim(); });
  const lastPart = (parts[parts.length - 1] || '').trim();
  const szm = lastPart.match(/([A-Z]{2})\s*(\d{5})/i);

  const payload = {
    address: parts[0] || address,
    city: parts[1] || '',
    state: szm ? szm[1].toUpperCase() : (parts[2] || '').split(' ')[0].toUpperCase(),
    zip: szm ? szm[2] : (address.match(/\d{5}/) || [''])[0],
    askingPrice: 0,
    estimatedRent: 0,
    propertyType: 'Single Family'
  };

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(WORKER_URL, options);
  const data = JSON.parse(response.getContentText());
  return data;
}

function writeResult(sheet, row, address, data) {
  const avm = data._consensusAVM || 0;
  const equity = Math.round(avm * 0.75);
  const estLoanBalance = Math.round(avm * 0.65);

  const oldPayment = monthlyPayment(estLoanBalance, 0.09, 30);
  const newPayment = monthlyPayment(estLoanBalance, 0.0725, 30);
  const savings = Math.round(oldPayment - newPayment);

  const sfStrategies = data.strategy_fit && data.strategy_fit.strategies ? data.strategy_fit.strategies : [];
  var dscrData = {};
  for (var i = 0; i < sfStrategies.length; i++) {
    if (sfStrategies[i].strategy === 'dscr_rental') { dscrData = sfStrategies[i]; break; }
  }
  const bestStrategy = data.strategy_fit ? data.strategy_fit.best_strategy || 'unknown' : 'unknown';

  let priority = 'LOW';
  if (equity > 75000 && avm > 200000) priority = 'HIGH';
  else if (equity > 40000 && avm > 150000) priority = 'MEDIUM';

  const values = [
    address,
    avm > 0 ? avm : 'No AVM',
    equity > 0 ? equity : 'N/A',
    estLoanBalance > 0 ? estLoanBalance : 'N/A',
    savings > 0 ? savings : 'N/A',
    dscrData.dscr || 0,
    dscrData.cash_flow_monthly || 0,
    dscrData.cap_rate || 'N/A',
    data.score || 0,
    data.verdict || 'N/A',
    bestStrategy,
    priority,
    new Date().toLocaleDateString()
  ];

  sheet.getRange(row, 1, 1, values.length).setValues([values]);

  const priorityCell = sheet.getRange(row, 12);
  if (priority === 'HIGH') {
    priorityCell.setBackground('#1a4a2e').setFontColor('#4ade80');
  } else if (priority === 'MEDIUM') {
    priorityCell.setBackground('#3a2a00').setFontColor('#fbbf24');
  } else {
    priorityCell.setBackground('#2a1a1a').setFontColor('#f87171');
  }

  if (priority === 'HIGH') {
    sheet.getRange(row, 1, 1, values.length).setFontWeight('bold');
  }
}

function monthlyPayment(principal, annualRate, years) {
  if (principal <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
}

function clearResults() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 2, lastRow - 1, 12).clearContent();
    sheet.getRange(2, 2, lastRow - 1, 12).clearFormat();
  }
  SpreadsheetApp.getActiveSpreadsheet()
    .toast('Results cleared. Addresses preserved.', 'Viador', 3);
}

// ================================================
// SETUP:
// 1. Open your Google Sheet
// 2. Extensions > Apps Script
// 3. Paste this entire file, replacing default code
// 4. Save (Ctrl+S)
// 5. Run onOpen() once — authorize when prompted
// 6. Reload the sheet — Viador menu appears
// 7. Paste addresses in column A, click "Score All"
// ================================================

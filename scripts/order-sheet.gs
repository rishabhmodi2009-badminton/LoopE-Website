/** @OnlyCurrentDoc */
// Google Apps Script bound to the "LoopE Orders" sheet in the loope.leashes@gmail.com account.
// Deployed as a web app; the website POSTs each confirmed order here (SHEET_WEBHOOK_URL).
// SECRET must match the SHEET_SECRET secret in Cloudflare; the real value lives only in Apps Script.
const SECRET = "SET_IN_APPS_SCRIPT";

const HEADERS = ["Date", "Reference", "Name", "Email", "Phone", "Product", "Qty", "Length", "Colour",
  "Total (S$)", "Payment", "Confirmation sent", "Status", "Pickup date", "Paid?", "Notes", "Order ID"];
const STATUSES = ["New", "Contacted", "Ready", "Picked up", "Cancelled"];

function setup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.setName("Orders");
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
  const rows = sheet.getMaxRows() - 1;
  const col = (name) => HEADERS.indexOf(name) + 1;
  sheet.getRange(2, col("Status"), rows).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
  sheet.getRange(2, col("Paid?"), rows).insertCheckboxes();
  sheet.getRange(2, col("Pickup date"), rows).setNumberFormat("d mmm yyyy");
  sheet.getRange(2, col("Date"), rows).setNumberFormat("d mmm yyyy, h:mm am/pm");
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return reply("unauthorized");
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const last = sheet.getLastRow();
    const ids = last > 1 ? sheet.getRange(2, HEADERS.length, last - 1, 1).getValues().flat() : [];
    if (ids.includes(data.id)) return reply("ok (already recorded)");
    sheet.appendRow([new Date(), data.reference, data.name, data.email, "'" + data.phone, data.product,
      data.quantity, data.length, data.colour, data.total, data.payment,
      data.confirmationSent ? "Yes" : "No", "New", "", false, "", data.id]);
    return reply("ok");
  } finally {
    lock.releaseLock();
  }
}

function reply(text) {
  return ContentService.createTextOutput(text);
}

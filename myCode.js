// Original code from https://github.com/jamiewilson/form-to-google-sheets
// Updated for 2021 and ES6 standards


Logger.log('No data found.');
const sheetName = 'Tabellenblatt1' //Sheet1
const scriptProp = PropertiesService.getScriptProperties()


Logger.log('No 2.');


function initialSetup () {

Logger.log('init')
Logger.log(SpreadsheetApp.getActiveSpreadsheet())

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())

Logger.log('propset')
Logger.log(scriptProp.getProperty('key'))

}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  Logger.log('propset in dopost')
Logger.log(scriptProp.getProperty('key'))

   Logger.log('No 2. before e');

  Logger.log(e);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
     
      Logger.log('doc')
     console.log(doc.getName())
   
    const sheet = doc.getSheetByName(sheetName)
    

  Logger.log('name')
  Logger.log(doc.getSheetName())

  //sheet is null 

     Logger.log(sheet)
    Logger.log('No 3. before e');


    Logger.log(e)
//sheet is null -> aufruff auf null deswegen error und headers wird nicht ausgeführt
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

   Logger.log('headers')
  Logger.log(headers)

    const nextRow = sheet.getLastRow() + 1

     Logger.log('nextRow')
      Logger.log(nextRow)

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'Ergebnis': 'Daten erfolgreich übertragen! Du kannst das Fenster jetzt schließen', 'row': nextRow , 'Link zur Tabelle':'https://docs.google.com/spreadsheets/d/1BWcBkcrw5b5infECBnzTVCzvLlNbU2jafDBMcpbvFTY/edit?usp=sharing' }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'mein eroor2' }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

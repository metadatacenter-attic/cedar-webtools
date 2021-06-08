function onOpen() {
  let ui = SpreadsheetApp.getUi();

  ui.createAddonMenu()
      .addItem("ASCT+B-to-CEDAR Exporter", 'showExporterDialog')
      .addToUi();
}

let showExporterDialog = () => {
  let html = HtmlService
      .createHtmlOutputFromFile('AsctbExporterDialog')
      .setTitle('CEDAR WebTool')
  SpreadsheetApp.getUi().showSidebar(html);
}

Object.defineProperty(Array.prototype, 'first', {
  value() {
    return this.find(e => true);     // or this.find(Boolean)
  }
});

Object.defineProperty(Array.prototype, 'joinCommas', {
  value() {
    return this.join(', ');
  }
});
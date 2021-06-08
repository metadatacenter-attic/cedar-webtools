function onOpen() {
  let ui = SpreadsheetApp.getUi();
  
  ui.createAddonMenu()
      .addItem('Settings...', 'showSettingsDialog')
      .addToUi();
}

let showSettingsDialog = () => {
  let ui = SpreadsheetApp.getUi();
  let answer = ui.prompt(
      'Term Reconciliation Settings',
      'Please enter the BioPortal API Key:',
      ui.ButtonSet.OK).getResponseText().trim();
  if (answer != "") {
    PropertiesService.getScriptProperties().setProperty('BIOPORTAL_API_KEY', answer);
  }
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
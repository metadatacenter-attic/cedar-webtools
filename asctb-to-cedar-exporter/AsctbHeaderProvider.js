class AsctbHeaderProvider {
  constructor(sheet) {
    this.sheet = sheet;
  }

  getHeader(headerRowIndex) {
    let headerColumns = this.sheet
        .getRange(headerRowIndex, 1, 1, this.sheet.getLastColumn())
        .getValues()[0];
    return new Header(headerColumns);
  }
}

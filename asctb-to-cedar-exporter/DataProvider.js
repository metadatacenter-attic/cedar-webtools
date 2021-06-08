class DataProvider {

  constructor(sheet) {
    this.sheet = sheet;
  }

  getCell(row, column) {
    let cellRange = this.sheet.getRange(row, column);
    return new CellWrapper(cellRange);
  }
}

class CellWrapper {
  constructor(cellRange) {
    this.cellRange = cellRange;
  }

  getValue() {
    return this.cellRange.getCell(1, 1).getValues()[0][0].trim();
  }

  insertValue(value) {
    this.cellRange.setValue(value);
  }

  isBlank() {
    return this.cellRange.getCell(1, 1).isBlank();
  }
}
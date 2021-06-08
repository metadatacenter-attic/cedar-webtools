class AsctbTable {
  constructor(header, metadata, anatomicalStructureColumnsProvider, cellTypeColumnsProvider,
      geneMarkerColumnsProvider, proteinMarkerColumnsProvider, ftuColumnProvider,
      referenceColumnsProvider, cedarColumnsProvider, dataProvider) {
    this.header = header;
    this.metadata = metadata;
    this.anatomicalStructureColumnsProvider = anatomicalStructureColumnsProvider;
    this.cellTypeColumnsProvider = cellTypeColumnsProvider;
    this.geneMarkerColumnsProvider = geneMarkerColumnsProvider;
    this.proteinMarkerColumnsProvider = proteinMarkerColumnsProvider;
    this.ftuColumnProvider = ftuColumnProvider;
    this.referenceColumnsProvider = referenceColumnsProvider;
    this.cedarColumnsProvider = cedarColumnsProvider;
    this.dataProvider = dataProvider;
  }

  getHeader() {
    return this.header;
  }

  getMetadata() {
    return this.metadata;
  }

  getCedarTemplateId() {
    return this.getMetadata().getCedarTemplateId();
  }

  getAnatomicalStructure(row) {
    let nameColumns = this.anatomicalStructureColumnsProvider.getNameColumns();
    let labelColumns = this.anatomicalStructureColumnsProvider.getLabelColumns();
    let idColumns = this.anatomicalStructureColumnsProvider.getIdColumns(); 
    let structures = this.getStructures(nameColumns, labelColumns, idColumns, row);
    return this.getLastElement(structures);
  }

  getCellType(row) {
    let nameColumns = this.cellTypeColumnsProvider.getNameColumns();
    let labelColumns = this.cellTypeColumnsProvider.getLabelColumns();
    let idColumns = this.cellTypeColumnsProvider.getIdColumns(); 
    let structures = this.getStructures(nameColumns, labelColumns, idColumns, row);
    return this.getFirstElement(structures);
  }

  getGeneMarkers(row) {
    let nameColumns = this.geneMarkerColumnsProvider.getNameColumns();
    let labelColumns = this.geneMarkerColumnsProvider.getLabelColumns();
    let idColumns = this.geneMarkerColumnsProvider.getIdColumns(); 
    let structures = this.getStructures(nameColumns, labelColumns, idColumns, row);
    return structures;
  }

  getProteinMarkers(row) {
    let nameColumns = this.proteinMarkerColumnsProvider.getNameColumns();
    let labelColumns = this.proteinMarkerColumnsProvider.getLabelColumns();
    let idColumns = this.proteinMarkerColumnsProvider.getIdColumns();
    let structures = this.getStructures(nameColumns, labelColumns, idColumns, row);
    return structures;
  }

  getFtuFlag(row) {
    let ftuColumn = this.ftuColumnProvider.getFtuColumn();
    let column = this.header.getColumnIndexByName(ftuColumn);
    let ftuCell = this.dataProvider.getCell(row, column);
    return ftuCell.isBlank() ? false : true;
  }

  getReferenceDois(row) {
    let dois = [];
    let doiColumns = this.referenceColumnsProvider.getDoiColumns();
    for (let colIndex = 0; colIndex < doiColumns.length; colIndex++) {
      let column = this.header.getColumnIndexByName(doiColumns[colIndex]);
      let doiCell = this.dataProvider.getCell(row, column);
      if (!doiCell.isBlank()) {
        let value = doiCell.getValue();
        dois.push(value);
      }
    }
    return dois;
  }

  getCedarInstanceId(row) {
    let instanceIdColumn = this.cedarColumnsProvider.getIdColumn();
    let column = this.header.getColumnIndexByName(instanceIdColumn);
    let instanceIdCell = this.dataProvider.getCell(row, column);
    return instanceIdCell.isBlank() ? null : instanceIdCell.getValue();
  }

  insertCedarInstanceId(row, value) {
    let instanceIdColumn = this.cedarColumnsProvider.getIdColumn();
    let column = this.header.getColumnIndexByName(instanceIdColumn);
    let instanceIdCell = this.dataProvider.getCell(row, column);
    let hyperlink = "https://cedar.metadatacenter.org/instances/edit/" + value;
    instanceIdCell.insertValue(`=HYPERLINK("${hyperlink}","${value}")`);
  }

  getCedarDateUploaded(row) {
    let dateUploadedColumn = this.cedarColumnsProvider.getDateUploadedColumn();
    let column = this.header.getColumnIndexByName(dateUploadedColumn);
    let dateUploadedCell = this.dataProvider.getCell(row, column);
    return dateUploadedCell.isBlank ? null : dateUploadedCell.getValue();
  }

  insertCedarDateUploaded(row, value) {
    let dateUploadedColumn = this.cedarColumnsProvider.getDateUploadedColumn();
    let column = this.header.getColumnIndexByName(dateUploadedColumn);
    let dateUploadedCell = this.dataProvider.getCell(row, column);
    dateUploadedCell.insertValue(value);
  }

  getStructures(nameColumns, labelColumns, idColumns, row) {
    let column = 0;
    let structures = [];
    for (let colIndex = 0; colIndex < nameColumns.length; colIndex++) {
      column = this.header.getColumnIndexByName(nameColumns[colIndex]);
      let nameCell = this.dataProvider.getCell(row, column);
      if (!nameCell.isBlank()) {
        column = this.header.getColumnIndexByName(labelColumns[colIndex]);
        let labelCell = this.dataProvider.getCell(row, column)
        column = this.header.getColumnIndexByName(idColumns[colIndex]);
        let idCell = this.dataProvider.getCell(row, column);
        if (!idCell.isBlank()) {
          structures.push({
            id: idCell.getValue(),
            label: labelCell.getValue(),
            name: nameCell.getValue()
          });
        } else {
          Logger.log(nameCell.getValue() + " is missing the ID code.");
        }
      }
    }
    return structures;
  }

  getFirstElement(arr) {
    return arr[0];
  }
  
  getLastElement(arr) {
    return arr[arr.length - 1]
  }
}
const GENE_MARKER_NAME_PATTERN = "^BG/\\d+$";
const GENE_MARKER_LABEL_PATTERN = "^BG/\\d+/LABEL$";
const GENE_MARKER_ID_PATTERN = "^BG/\\d+/ID$";

class GeneMarkerColumnsProvider {
  constructor(header) {
    this.nameColumns = header.getMatchingColumns(GENE_MARKER_NAME_PATTERN);
    this.labelColumns = header.getMatchingColumns(GENE_MARKER_LABEL_PATTERN);
    this.idColumns = header.getMatchingColumns(GENE_MARKER_ID_PATTERN);
  }

  getNameColumns() {
    return this.nameColumns;
  }

  getLabelColumns() {
    return this.labelColumns;
  }

  getIdColumns() {
    return this.idColumns;
  }  
}

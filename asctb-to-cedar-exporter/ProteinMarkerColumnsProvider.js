const PROTEIN_MARKER_NAME_PATTERN = "^BP/\\d+$";
const PROTEIN_MARKER_LABEL_PATTERN = "^BP/\\d+/LABEL$";
const PROTEIN_MARKER_ID_PATTERN = "^BP/\\d+/ID$";

class ProteinMarkerColumnsProvider {
  constructor(header) {
    this.nameColumns = header.getMatchingColumns(PROTEIN_MARKER_NAME_PATTERN);
    this.labelColumns = header.getMatchingColumns(PROTEIN_MARKER_LABEL_PATTERN);
    this.idColumns = header.getMatchingColumns(PROTEIN_MARKER_ID_PATTERN);
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

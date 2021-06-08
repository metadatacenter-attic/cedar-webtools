const PREFIX_TO_IRI_TEMPLATE = {
  "UBERON": "http://purl.obolibrary.org/obo/UBERON_{id}",
  "CL": "http://purl.obolibrary.org/obo/CL_{id}",
  "HGNC": "http://ncicb.nci.nih.gov/xml/owl/EVS/Hugo.owl#HGNC_{id}",
  "fma": "http://purl.org/sig/ont/fma/{id}",
  "GO": "http://purl.obolibrary.org/obo/GO_{id}"
};

class CedarInstanceFactory {
  constructor(cedarUserId) {
    this.cedarUserId = cedarUserId;
  }

  createAsctbInstance(anatomicalStructure, cellType, ftuFlag, geneMarkers, proteinMarkers, referenceDois, templateId, instanceId=null) {
    let now = new Date();
    let timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    let dateTimeInfo = Utilities.formatDate(now, timezone, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    let asctbInstance = {
      "@context": {
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "pav": "http://purl.org/pav/",
        "schema": "http://schema.org/",
        "oslc": "http://open-services.net/ns/core#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdfs:label": {
          "@type": "xsd:string"
        },
        "schema:isBasedOn": {
          "@type": "@id"
        },
        "schema:name": {
          "@type": "xsd:string"
        },
        "schema:description": {
          "@type": "xsd:string"
        },
        "pav:derivedFrom": {
          "@type": "@id"
        },
        "pav:createdOn": {
          "@type": "xsd:dateTime"
        },
        "pav:createdBy": {
          "@type": "@id"
        },
        "pav:lastUpdatedOn": {
          "@type": "xsd:dateTime"
        },
        "oslc:modifiedBy": {
          "@type": "@id"
        },
        "skos:notation": {
          "@type": "xsd:string"
        },
        "Anatomical Structure Name": "https://schema.metadatacenter.org/properties/c796a72f-83e6-4444-bef7-b77f1e72814b",
        "Cell Type Name": "https://schema.metadatacenter.org/properties/fd41ec46-e01e-4ad2-92cc-cd6272da2eac",
        "Functional Tissue Unit Yes No Indicator": "https://schema.metadatacenter.org/properties/e037ba8f-dd7e-4bd3-bf85-933613c641db",
        "Biomarker Gene Name": "https://schema.metadatacenter.org/properties/eb3851c3-3b43-4fc5-b0b2-3e35a67e27cb",
        "Biomarker Protein Name": "https://schema.metadatacenter.org/properties/8c59338f-2c7e-4f9f-9707-a06bd057aa7a",
        "Resource DOI": "https://schema.metadatacenter.org/properties/eca05f8e-5b1f-4e4a-a587-281157e56705"
      },
      "Anatomical Structure Name": {},
      "Cell Type Name": {},
      "Functional Tissue Unit Yes No Indicator": {},
      "Biomarker Gene Name": [],
      "Biomarker Protein Name": [],
      "Resource DOI": [],
      "schema:isBasedOn": "",
      "schema:name": "ASCT+B Table for Human Organ metadata",
      "schema:description": "",
      "pav:createdOn": "",
      "pav:lastUpdatedOn": "",
      "pav:createdBy": "",
      "oslc:modifiedBy": ""
    }
    asctbInstance["Anatomical Structure Name"]['@id'] = this.expand(anatomicalStructure.id);
    asctbInstance["Anatomical Structure Name"]['rdfs:label'] = anatomicalStructure.label;
    asctbInstance["Cell Type Name"]['@id'] = this.expand(cellType.id);
    asctbInstance["Cell Type Name"]['rdfs:label'] = cellType.label;
    asctbInstance["Functional Tissue Unit Yes No Indicator"]['@value'] = (ftuFlag) ? "Yes" : "No";
    this.addBioMarkers(asctbInstance["Biomarker Gene Name"], geneMarkers);
    this.addBioMarkers(asctbInstance["Biomarker Protein Name"], proteinMarkers);
    this.addReferences(asctbInstance["Resource DOI"], referenceDois);
    asctbInstance['schema:isBasedOn'] = templateId;
    asctbInstance['pav:createdOn'] = dateTimeInfo;
    asctbInstance['pav:lastUpdatedOn'] = dateTimeInfo;
    asctbInstance['pav:createdBy'] = "https://metadatacenter.org/users/" + this.cedarUserId;
    asctbInstance['oslc:modifiedBy'] = "https://metadatacenter.org/users/" + this.cedarUserId;
    if (instanceId != null) {
      asctbInstance['@id'] = instanceId;
    }
    return JSON.stringify(asctbInstance, null, 2);
  }

  addBioMarkers(object, markerList) {
    if (markerList.length == 0) { 
      let emptyMarker = {};
      object.push(emptyMarker);
    } else {
      for (let i = 0; i < markerList.length; i++) {
        let marker = {};
        marker['@id'] = this.expand(markerList[i].id);
        marker['rdfs:label'] = markerList[i].name;
        object.push(marker);
      }
    }
  }

  addReferences(object, referenceDois) {
    if (referenceDois.length == 0) {
      let emptyDoi = {};
      emptyDoi['@value'] = null;
      object.push(emptyDoi);
    } else {
      for (let i = 0; i < referenceDois.length; i++) {
        let doi = {};
        doi['@value'] = referenceDois[i];
        object.push(doi);
      }
    }
  }

  expand(prefixedName) {
    let prefix = prefixedName.split(':')[0];
    let iriTemplate = PREFIX_TO_IRI_TEMPLATE[prefix];
    return iriTemplate.replace("{id}", prefixedName.split(':')[1]);
  }
}
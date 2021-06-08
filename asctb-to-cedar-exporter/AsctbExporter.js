function exportSheetToCedarInstances(headerRowIndex, cedarApiKey, cedarUserId, cedarFolderId, isDryRun) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let header = new AsctbHeaderProvider(sheet).getHeader(headerRowIndex);
  let metadata = new AsctbMetadataProvider(sheet).getMetadata();
  let asctbTable = new AsctbTable(
      header,
      metadata,
      new AnatomicalStructureColumnsProvider(header),
      new CellTypeColumnsProvider(header),
      new GeneMarkerColumnsProvider(header),
      new ProteinMarkerColumnsProvider(header),
      new FtuColumnProvider(header),
      new ReferenceColumnsProvider(header),
      new CedarColumnsProvider(header),
      new DataProvider(sheet));
  let cedarTemplateId = asctbTable.getCedarTemplateId();

  let cedarInstanceFactory = new CedarInstanceFactory(cedarUserId);
  let cedarServices = new CedarServices(cedarApiKey);

  let failedRows = [];
  let successCounter = 0;
  for (let row = headerRowIndex + 1; row <= sheet.getLastRow(); row++) {
    try {
      let anatomicalStructure = asctbTable.getAnatomicalStructure(row);
      let cellType = asctbTable.getCellType(row);
      let geneMarkers = asctbTable.getGeneMarkers(row);
      let proteinMarkers = asctbTable.getProteinMarkers(row);
      let ftuFlag = asctbTable.getFtuFlag(row)
      let referenceDois = asctbTable.getReferenceDois(row);
      let cedarInstanceId = asctbTable.getCedarInstanceId(row);
      let cedarInstance = cedarInstanceFactory.createAsctbInstance(
          anatomicalStructure, 
          cellType,
          ftuFlag,
          geneMarkers,
          proteinMarkers,
          referenceDois,
          cedarTemplateId,
          cedarInstanceId);
      if (!isDryRun) {
        if (cedarInstanceId == null) {
          let response = createInstanceOnCedar(cedarServices, cedarFolderId, cedarInstance);
          asctbTable.insertCedarInstanceId(row, response['@id']);
          asctbTable.insertCedarDateUploaded(row, response['pav:lastUpdatedOn']);
        } else {
          let response = updateInstanceOnCedar(cedarServices, cedarInstanceId, cedarInstance);
          asctbTable.insertCedarDateUploaded(row, response['pav:lastUpdatedOn']);
        }
      }
      successCounter++;
    }
    catch (err) {
      Logger.log(err);
      failedRows.push(row);
    }
  }
  return returnOrThrowError(failedRows, successCounter, isDryRun);
}

let createInstanceOnCedar = (cedarServices, folderId, instance) => {
  let response = cedarServices.postInstance(folderId, instance);
  return JSON.parse(response.getContentText()); // get the response content as text
}

let updateInstanceOnCedar = (cedarServices, instanceId, instance) => {
  let response = cedarServices.putInstance(instanceId, instance);
  return JSON.parse(response.getContentText()); // get the response content as text
}

let returnOrThrowError = (failedRows, successCounter, isDryRun) => {
  if (!isDryRun) {
    if (failedRows.length != 0) {
      let errorMessage = "Export failed for rows [" + failedRows.join(', ') + "]";
      if (successCounter > 0) {    
        errorMessage += ", however, " + successMessage(successCounter) + ".";
      }
      throw new Error(errorMessage);
    } else {
      return successMessage(successCounter);
    }
  } else {
    if (failedRows.length > 0) {
      let errorMessage = "Found " + failedRows.length + " incomplete rows [" + failedRows.join(', ') + "]";
      return new Error(errorMessage);
    } else {
      return "No errors found"
    }
  }
}

let successMessage = (successCounter) => {
  if (successCounter == 1) {
    return "1 record was successfully submitted to CEDAR";
  } else {
    return successCounter + " records were successfully submitted to CEDAR";
  }
}

function shouldExportSheetToCedarInstances() {
  exportSheetToCedarInstances(12, 
      "8b9e3e4d8f0aa726e27aa314174b6d5491bbdf77f2bca6e796d6f0ef8ec6dee4",
      "f58ef265-1d78-4687-b1f5-73c932024d68",
      "b189271b-77a5-4dad-8d70-bb51467d49cc", false);
}
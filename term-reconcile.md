--- 
title: Term Reconcile Formula for Google Sheets
description: Reconcile the biomedical data in your spreadsheet with the standard vocabulary
filename: term-reconcile.md
---

# Term Reconcile Formula for Google Sheets

Reconcile the biomedical data in your spreadsheet with the standard vocabulary

## How to Use

<img width="100%" alt="Term Reconcile Formula" src="https://user-images.githubusercontent.com/5062950/121233699-bd5aa680-c847-11eb-90b4-8a814d7d97b6.png">

The RECONCILE formula consists of 3 required parameters, namely, `input`, `ontology` and `properties`, and one optional `choice` parameter.
- The `input` parameter refers to the sheet cell,
- The `ontology` parameter refers to the ontology name code as specified by the [NCBI BioPortal](https://bioportal.bioontology.org/) (e.g., "CL" is for the Cell Ontology), and 
- The `properties` parameter refers to the options for the output value, namely, "iri", "notation", "label", "definition", "depiction", "synonyms", "dbXref". You can specify multiple properties by joining them with a comma, for example, ”label,notation,definition”. Note that you must have a number of empty columns that equals the number of properties that you have specified in the reconcile formula. Using the same example, if you place the reconcile formula in cell A2, then make sure cell A3 and cell A4 are empty to accommodate the incoming data for the label, notation and definition.
- (Optional) The `choice` parameter is useful to pick a suggested term in the "interactive mode". Fill out this parameter only when the formula requires you to do a manual curation, otherwise leave it blank.

### Interactive Mode

If the formula couldn’t find an exact match, it will return a list of suggested terms. Each suggestion is associated with an index number.

![Interactive Mode](https://user-images.githubusercontent.com/5062950/121233749-d06d7680-c847-11eb-8bb9-9bf784e09981.png)


Users can select one of the suggested items as their choice by updating the formula and adding the `choice` parameter with the selected index number. The example  below will select "cardiac pacemaker cell of sinoatrial node" as the preferred term. 

```
=RECONCILE(B2,"CL","label,notation",1)
```

### Troubleshooting

#### I got an error message: "Enter the BioPortal API Key from the `Add-ons > Reconcile > Settings...` menu"

Look at the top main menu and find the "Add-ons > Reconcile > Settings..." menu. On the dialog box, enter your BioPortal API Key. Please visit the [BioPortal documentation](https://www.bioontology.org/wiki/BioPortal_Help#Getting_an_API_key) to get the API key.

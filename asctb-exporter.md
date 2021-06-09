--- 
title: ASCT+B-to-CEDAR Exporter for Google Sheets
description: Export the ASCT+B Table on Google Sheets to CEDAR instances
filename: asctb-exporter.md
---

# ASCT+B-to-CEDAR Exporter for Google Sheets

Export the ASCT+B Table on Google Sheets to CEDAR instances

## How to Use

<img width="225" src="https://user-images.githubusercontent.com/5062950/121255835-bee49880-c860-11eb-900c-55448c3b48ec.png" alt="ASCT+B-to-CEDAR Exporter"/>

The add-on works only with the [HuBMAP ASCT+B tables](https://docs.google.com/spreadsheets/d/1F5uoPkO_RudMj7f5qtY3Sh2oBI0NXupvaZXeO59LS-k/edit?usp=sharing). Once it is installed, the add-on is located at "Add-Ons > HuBMAP > ASCT+B-to-CEDAR Exporter" and Google Sheets will display the dialog panel on the right-hand side of the sheet.

The add-on has 4 input fields:
- **Header Row Index** is the row index for the table header.
- **CEDAR API Key** is the API Key that you can get from CEDAR.
- **CEDAR User ID** is your CEDAR user identifier code.
- **CEDAR Folder ID** is the unique folder identifier code on CEDAR.

_(See the sections below to get the CEDAR input parameters from your CEDAR account)_

If you choose the "Do a dry-run" option, the add-on will validate the table by checking if there are any missing data. Running the add-on with this option doesn't require the CEDAR input parameters.

## Working with CEDAR

### Getting CEDAR API Key and CEDAR User ID

- Login to CEDAR using your credentials.
- Click on the "User" icon on the top right-most hand-side, and select "Profile"

  <img width="250" src="https://user-images.githubusercontent.com/5062950/121257226-4bdc2180-c862-11eb-8e5e-e722d21f1722.png" alt="Go to Profile menu"/>

- Copy and paste the text pointed by the red circles: (1) The first red circle is the **CEDAR API Key** and (2) the second red circle is the **CEDAR User ID**.

  <img width="100%" src="https://user-images.githubusercontent.com/5062950/121257419-847bfb00-c862-11eb-88bb-785366460850.png" alt="Getting the CEDAR API Key and User ID"/>
  
### Getting CEDAR Folder ID

- Login to CEDAR using your credentials.
- Go to the folder where you want to have the output. Create a new folder if necessary.
- In the URL field of your web browser, highlight the string after the last `%2F` characters (see the illustration below). Here, the folder ID is `ddf9ca56-561c-40cd-8302-9f43babdd6c2`.

  <img width="100%" src="https://user-images.githubusercontent.com/5062950/121257688-d755b280-c862-11eb-80a5-72eb434aed32.png" alt="Getting the CEDAR Folder ID"/>

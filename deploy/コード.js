/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('hosting/index.html')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('React + GAS');
}

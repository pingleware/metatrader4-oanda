"use strict"

const phantom = require('phantom');

function FXCLIENT_GetSentiments(callback) {
    (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
          console.info('Requesting', requestData.url);
        });
      
        const status = await page.open('https://forexclientsentiment.com/client-sentiment');
        const content = await page.property('content');
        callback(content);
      
        await instance.exit();
      })();    
}

module.exports = {
    FXCLIENT_GetSentiments
};
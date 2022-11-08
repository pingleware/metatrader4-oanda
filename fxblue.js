"use strict"

const phantom = require('phantom');

function FXBLUE_GetSentiment(callback) {
    (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
          console.info('Requesting', requestData.url);
        });
      
        const status = await page.open('https://www.fxblue.com/market-data/tools/sentiment');
        const content = await page.property('content');
        callback(content);
      
        await instance.exit();
      })();    
}


module.exports = {
    FXBLUE_GetSentiment
};
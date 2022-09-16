"use strict"

const request = require('request');

function SendRequest(context, path, method, body, callback) {
    var options = {
      'method': method,  
      'url': context.http.globalAgent.protocol + "//" + context.hostname + "/" + path,    
      'headers': context.headers,
      'body': body
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      callback(response.body);
    });
}

module.exports = {
  SendRequest
};
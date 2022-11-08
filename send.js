"use strict"

const request = require('request');

function GetRequest(url, callback) {
  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    callback(response.body);
  });  
}

function SendRequest(context, path, method, body, callback) {
    var options = {
      'method': method,  
      'url': "https://" + context.hostname + "/" + path,    
      'headers': context.headers,
      'body': body
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      callback(response.body);
    });
}

function Request(url, path, method, headers, body, timeout, callback) {
  var options = {
    'method': method,  
    'url': url + "/" + path,    
    'headers': headers,
    'body': body,
    'timeout': timeout
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    callback(response.headers,response.body);
  });

}

module.exports = {
  GetRequest,
  SendRequest,
  Request
};
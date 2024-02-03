"use strict"

const request = require('request');

function GetRequest(url, callback) {
  var options = {
    'method': 'GET',
    'url': url,
    'headers': context.headers
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    callback(response.body);
  });  
}

function GetRequestSync(context,path) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'url': "https://" + context.hostname + "/" + path,
      'headers': context.headers
    };
    request(options, function (error, response) {
      if (error) reject(error);
      resolve(response.body);
    });
  });
}

function SendRequest(context, path, method, body, callback) {
    var options = {
      'method': method,  
      'url': context.hostname + "/" + path,    
      'headers': context.headers,
      'body': body
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      callback(response.body);
    });
}

function SendRequestSync(context, path, method, body) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': method,  
      'url': "https://" + context.hostname + "/" + path,    
      'headers': context.headers,
      'body': body
    };
    request(options, function (error, response) {
      if (error) reject(error);
      resolve(response.body);
    });
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

function RequestSync(url, path, method, headers, body, timeout) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': method,  
      'url': url + "/" + path,    
      'headers': headers,
      'body': body,
      'timeout': timeout
    };
    request(options, function (error, response) {
      if (error) reject(error);
      resolve([response.headers,response.body]);
    });
  });
}

module.exports = {
  GetRequest,
  GetRequestSync,
  SendRequest,
  SendRequestSync,
  Request,
  RequestSync
};
"use strict"

const {Request} = require('./send');
const {ENUM_TIMEFRAMES} = require('./timeseries');

const ENUM_CRYPT_METHOD = {
    CRYPT_BASE64:       0,  // BASE64
    CRYPT_AES128:       1,  // AES encryption with 128 bit key (16 bytes)
    CRYPT_AES256:       2,  // AES encryption with 256 bit key (32 bytes)
    CRYPT_DES:          3,  // DES encryption with 56 bit key (7 bytes)
    CRYPT_HASH_SHA1:    4,  // SHA1 HASH calculation
    CRYPT_HASH_SHA256:  5,  // SHA256 HASH calculation
    CRYPT_HASH_MD5:     6,  // MD5 HASH calculation
    CRYPT_ARCH_ZIP:     7   // ZIP archives
};

const ENUM_POINTER_TYPE = {
    POINTER_INVALID:    0,  // Incorrect pointer
    POINTER_DYNAMIC:    1,  // Pointer of the object created by the new() operator
    POINTER_AUTOMATIC:  2   // Pointer of any objects created automatically (not using new())
}

/**
 * Alert
 * Displays a message in a separate window
*/ 
function Alert(callback){
    callback({status: 'error', message: 'not implemented', function: 'Alert'});
}
/**
 * CheckPointer
 * Returns the type of the object pointer
*/ 
function CheckPointer(any_pointer){
    if (any_pointer) {
        return ENUM_POINTER_TYPE.POINTER_DYNAMIC;
    } else {
        return ENUM_POINTER_TYPE.POINTER_INVALID;
    }
}
/**
 * Comment
 * Outputs a comment in the left top corner of the chart
*/ 
function Comment(callback){
    callback({status: 'error', message: 'not implemented', function: 'Comment'});
}
/**
 * CryptEncode
 * Transforms the data from array with the specified method
 * 
 * ENUM_CRYPT_METHOD   method,        // method 
 * const uchar&        data[],        // source array 
 * const uchar&        key[],         // key    
 * uchar&             result[]       // destination array 
*/ 
function CryptEncode(method,data,key){
    var result = [];

    switch(method) {
        case ENUM_CRYPT_METHOD.CRYPT_BASE64:
            let bufferObj = Buffer.from(data+key, "utf8");
            result = bufferObj.toString("base64");
            break;
        case ENUM_CRYPT_METHOD.CRYPT_AES128:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_AES256:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_DES:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_SHA1:
            const sha1 = require('sha1');
            result = sha1(data+key);
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_SHA256:
            const sha256 = require('sha256');
            result = sha256(data+key);
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_MD5:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_ARCH_ZIP:
            break;
    }

    return result;
}
/**
 * CryptDecode
 * Performs the inverse transformation of the data from array
*/ 
function CryptDecode(method,data,key){
    var result = [];

    switch(method) {
        case ENUM_CRYPT_METHOD.CRYPT_BASE64:
            let bufferObj = Buffer.from(data, "base64");
            result = bufferObj.toString("utf8");
            break;
        case ENUM_CRYPT_METHOD.CRYPT_AES128:
        case ENUM_CRYPT_METHOD.CRYPT_AES256:
        case ENUM_CRYPT_METHOD.CRYPT_DES:
            const decrypt = require('ssh-key-decrypt');    
            result = decrypt(data, key);
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_SHA1:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_SHA256:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_HASH_MD5:
            break;
        case ENUM_CRYPT_METHOD.CRYPT_ARCH_ZIP:
            break;
    }

    return result;
}
/**
 * DebugBreak
 * Program breakpoint in debugging
 * 
 * @see https://nodejs.org/api/debugger.html#breakpoints
*/ 
function DebugBreak(){
    setBreakpoint();
}
/**
 * ExpertRemove
 * Stops Expert Advisor and unloads it from the chart
*/ 
function ExpertRemove(callback){
    callback({status: 'error', message: 'not supported', function: 'ExpertRemove'});
}
/**
 * GetPointer
 * Returns the object pointer
*/ 
function GetPointer(class_ref){
    var ref = class_ref;
    return ref;
}
/**
 * GetTickCount
 * Returns the number of milliseconds that have elapsed since the system was started
*/ 
function GetTickCount(){
    const {systime} = require('./account');
    const now = new Date().getTime();
    return Number(now - systime.start);
}
/**
 * GetMicrosecondCount
 * Returns the number of microseconds that have elapsed since the start of MQL4-program
*/ 
function GetMicrosecondCount(){
    const {systime} = require('./account');
    const now = new Date().getTime();
    return Number(now - systime.expert_start);
}
/**
 * MessageBox
 * Creates, displays a message box and manages it
*/ 
function MessageBox(callback){
    callback({status: 'error', message: 'not implemented', function: 'MesssageBox'});
}
/**
 * PeriodSeconds
 * Returns the number of seconds in the period
*/ 
function PeriodSeconds(timeframe){
    switch(timeframe) {
        case ENUM_TIMEFRAMES.PERIOD_S5:
            return Number(5);
        case ENUM_TIMEFRAMES.PERIOD_S10:
            return Number(10);
        case ENUM_TIMEFRAMES.PERIOD_S15:
            return Number(15);
        case ENUM_TIMEFRAMES.PERIOD_S30:
            return Number(30);
        case ENUM_TIMEFRAMES.PERIOD_M1:
            return Number(60);
        case ENUM_TIMEFRAMES.PERIOD_M2:
            return Number(60 * 2);
        case ENUM_TIMEFRAMES.PERIOD_M4:
            return Number(60 * 4);
        case ENUM_TIMEFRAMES.PERIOD_M5:
            return Number(60 * 5);
        case ENUM_TIMEFRAMES.PERIOD_M15:
            return Number(60 * 15);
        case ENUM_TIMEFRAMES.PERIOD_M30:
            return Number(60 * 30);
        case ENUM_TIMEFRAMES.PERIOD_H1:
            return Number(60 * 60);
        case ENUM_TIMEFRAMES.PERIOD_H3:
            return Number(60 * 60 * 3);
        case ENUM_TIMEFRAMES.PERIOD_H4:
            return Number(60 * 60 * 4);
        case ENUM_TIMEFRAMES.PERIOD_H6:
            return Number(60 * 60 * 6);
        case ENUM_TIMEFRAMES.PERIOD_H12:
            return Number(60 * 60 * 12);
        case ENUM_TIMEFRAMES.PERIOD_D1:
            return Number(60 * 60 * 24);
        case ENUM_TIMEFRAMES.PERIOD_W1:
            return Number(60 * 60 * 24 * 7);
        case ENUM_TIMEFRAMES.PERIOD_MN1:
            return Number(60 * 60 * 24 * 25);
    }
}
/**
 * PlaySound
 * Plays a sound file
*/ 
function PlaySound(soundFile){
    const { createAudio } = require('node-mp3-player')
    const Audio = createAudio();
     
    (async () => {
      const myFile = await Audio(`${__dirname}/Sounds/${soundFile}`);
      await myFile.volume(0.5)
    })();    
}
/**
 * Print
 * Displays a message in the log
*/ 
function Print(...args){
    console.log(args);
}
/**
 * PrintFormat
 * Formats and prints the sets of symbols and values in a log file in accordance with a preset format
*/ 
function PrintFormat(string_format,...args){
    console.log(string_format,args);
}
/**
 * ResetLastError
 * Sets the value of a predetermined variable _LastError to zero 
*/ 
function ResetLastError(){
    const {error} = require('./account');
    return error.last_code;
}
/**
 * ResourceCreate
 * Creates an image resource based on a data set
*/ 
function ResourceCreate(callback){
    callback({status: 'error', message: 'not supported', function: 'ResourceCreate'});
}
/**
 * ResourceFree
 * Deletes dynamically created resource (freeing the memory allocated for it)
*/ 
function ResourceFree(callback){
    callback({status: 'error', message: 'not supported', function: 'ResourceFree'});
}
/**
 * ResourceReadImage
 * Reads data from the graphical resource created by ResourceCreate() function or saved in EX4 file during compilation
*/ 
function ResourceReadImage(callback){
    callback({status: 'error', message: 'not supported', function: 'ResourceReadImage'});
}
/**
 * ResourceSave
 * Saves a resource into the specified file
*/ 
function ResourceSave(callback){
    callback({status: 'error', message: 'not supported', function: 'ResourceSave'});
}
/**
 * SendFTP
 * Sends a file at the address specified in the settings window of the "FTP" tab
*/ 
function SendFTP(filename,ftpPath,callback){
    const {ftpClient} = require('./account');
    const FTPS = require('ftps');
    const ftps = new FTPS(ftpClient);
    ftps.cd(ftpPath).addFile(__dirname + '/MQL4/files/' + filename).exec(callback);
}
/**
 * SendMail
 * Sends an email at the address specified in the settings window of the "Email" tab
*/ 
function SendMail(subject,text,callback){
    const {sendgrid} = require('./account');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(sendgrid.SENDGRID_API_KEY);
    const msg = {
      to: sendgrid.to,
      from: sendgrid.from, // Use the email address or domain you verified above
      subject: subject,
      text: text,
      html: `<strong>${text}</strong>`,
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        if (error.response) {
            callback({status: 'error', message: error.response.body, function: 'SendMail'});
        } else {
            callback({status: 'success', message: msg, function: 'SendMail'});
        }
      });    
}
/**
 * SendNotification
 * Sends push notifications to mobile terminals, whose MetaQuotes ID are specified in the "Notifications" tab
*/ 
function SendNotification(message,callback){
    const {twilio} = require('./account');
    const client = require('twilio')(twilio.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
    client.messages
      .create({body: message, from: twilio.from, to: twilio.to})
      .then(message => callback({status: 'success', sid: message.sid, function: 'SendNotification'}));
}
/**
 * Sleep
 * Suspends execution of the current Expert Advisor or script within a specified interval
*/ 
function Sleep(milliseconds){
    const sleepTime = require('sleep-time');
    sleepTime(milliseconds);    
}
/**
 * TerminalClose
 * Commands the terminal to complete operation
*/ 
function TerminalClose(ret_code){
    process.exit(ret_code);
}
/**
 * TesterStatistics
 * It returns the value of a specified statistic calculated based on testing results
*/ 
function TesterStatistics(callback){
    callback({status: 'error', message: 'not supported', function: 'TesterStatistics'});
}
/**
 * TranslateKey
 * Returns a Unicode character by a virtual key code
*/ 
function TranslateKey(key_element, callback){
    key_element.addEventListener('keypress', function(key_code){
        callback({status: 'success', code: key_code, function: 'TranslateKey'});
    });
}
/**
 * WebRequest
 * Sends HTTP request to the specified server
 * 
 * const string      method,           // HTTP method 
 * const string      url,              // URL 
 * const string      headers,          // headers  
 * int               timeout,          // timeout 
 * const char        &data[],          // the array of the HTTP message body 
 * char              &result[],        // an array containing server response data 
 * string            &result_headers   // headers of server response 
*/ 
function WebRequest(method,url,headers,timeout,data,callback){
    Request(url,'',method,headers,data,timeout,function(response_headers, response_body){
        callback({status: 'success', headers: response_headers, body: response_body, function: 'WebRequest'});
    })
}
/**
 * ZeroMemory
 * Resets a variable passed to it by reference. The variable can be of any type, except for classes and structures that have constructors.
 */
function ZeroMemory(variable){
    if (Number(variable) == variable) {
        return Number(0);
    } else {
        return null;
    }
}

module.exports = {
    ENUM_CRYPT_METHOD,
    ENUM_POINTER_TYPE,
    Alert,
    CheckPointer,
    Comment,
    CryptEncode,
    CryptDecode,
    DebugBreak,
    ExpertRemove,
    GetPointer,
    GetTickCount,
    GetMicrosecondCount,
    MessageBox,
    PeriodSeconds,
    PlaySound,
    Print,
    PrintFormat,
    ResetLastError,
    ResourceCreate,
    ResourceFree,
    ResourceReadImage,
    ResourceSave,
    SendFTP,
    SendMail,
    SendNotification,
    Sleep,
    TerminalClose,
    TesterStatistics,
    TranslateKey,
    WebRequest,
    ZeroMemory
};
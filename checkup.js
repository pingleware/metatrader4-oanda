"use strict"

const { doesNotMatch } = require('assert');
const { AsyncLocalStorage } = require('async_hooks');
const { error } = require('./account');

var { program, charts, ftpClient, twilio, sendgrid, account } = require('./account');
const pkg = require('./package.json');

const ENUM_TERMINAL_INFO_STRING = {
    TERMINAL_LANGUAGE:          0,  // Language of the terminal, string
    TERMINAL_COMPANY:           1,  // Company name, string
    TERMINAL_NAME:              2,  // Terminal name, string
    TERMINAL_PATH:              3,  // Folder from which the terminal is started, string
    TERMINAL_DATA_PATH:         4,  // Folder in which terminal data are stored, string
    TERMINAL_COMMONDATA_PATH:   5   // Common path for all of the terminals installed on a computer, string
};

const ENUM_MQL_INFO_INTEGER = {
    MQL_CODEPAGE:           0,  // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
    MQL_PROGRAM_TYPE:       1,  // Type of the MQL4 program, ENUM_PROGRAM_TYPE
    MQL_DLLS_ALLOWED:       2,  // The permission to use DLL for the given executed program, bool
    MQL_TRADE_ALLOWED:      3,  // The permission to trade for the given executed program, bool
    MQL_SIGNALS_ALLOWED:    4,  // The permission to modify the Signals for the given executed program, bool
    MQL_DEBUG:              5,  // The flag, that indicates the debug mode, bool
    MQL_PROFILER:           6,  // The flag, that indicates the program operating in the code profiling mode, bool
    MQL_TESTER:             7,  // The flag, that indicates the tester process, bool
    MQL_OPTIMIZATION:       8,  // The flag, that indicates the optimization process, bool
    MQL_VISUAL_MODE:        9,  // The flag, that indicates the visual tester process, bool
    MQL_FRAME_MODE:         10, // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
    MQL_LICENSE_TYPE:       11  // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE
};

const ENUM_MQL_INFO_DOUBLE = {
    TERMINAL_COMMUNITY_BALANCE: 0
};

const ENUM_MQL_INFO_STRING = {
    MQL_PROGRAM_NAME: 0,    // Name of the MQL4-program executed, string
    MQL_PROGRAM_PATH: 1     // Path for the given executed program, string
};

const ENUM_PROGRAM_TYPE = { 
    PROGRAM_SCRIPT:     0,  // Script
    PROGRAM_EXPERT:     1,  // Expert
    PROGRAM_INDICATOR:  2   // Indicator
};

const ENUM_LICENSE_TYPE = {
    LICENSE_FREE: 0,    // A free unlimited version
    LICENSE_DEMO: 1,    // A trial version of a paid product from the Market. It works only in the strategy tester
    LICENSE_FULL: 2,    // A purchased licensed version allows at least 5 activations. The number of activations is specified by seller. Seller may increase the allowed number of activations
    LICENSE_TIME: 3     // A version with limited term liсense    
};

const ENUM_TERMINAL_INFO_INTEGER = {
    TERMINAL_BUILD:                     0,    // The client terminal build number
    TERMINAL_COMMUNITY_ACCOUNT:         1,    // The flag indicates the presence of MQL5.community authorization data in the terminal
    TERMINAL_COMMUNITY_CONNECTION:      2,    // Connection to MQL5.community
    TERMINAL_CONNECTED:                 3,    // Connection to a trade server
    TERMINAL_DLLS_ALLOWED:              4,    // Permission to use DLL
    TERMINAL_TRADE_ALLOWED:             5,    // Permission to trade
    TERMINAL_EMAIL_ENABLED:             6,    // Permission to send e-mails using SMTP-server and login, specified in the terminal settings
    TERMINAL_FTP_ENABLED:               7,    // Permission to send reports using FTP-server and login, specified in the terminal settings
    TERMINAL_NOTIFICATIONS_ENABLED:     8,    // Permission to send notifications to smartphone
    TERMINAL_MAXBARS:                   9,    // The maximal bars count on the chart
    TERMINAL_MQID:                      10,   // The flag indicates the presence of MetaQuotes ID data to send Push notifications
    TERMINAL_CODEPAGE:                  11,   // Number of the code page of the language installed in the client terminal
    TERMINAL_CPU_CORES:                 12,   // The number of CPU cores in the system
    TERMINAL_DISK_SPACE:                13,   // Free disk space for the MQL4\Files folder of the terminal, Mb
    TERMINAL_MEMORY_PHYSICAL:           14,   // Physical memory in the system, Mb
    TERMINAL_MEMORY_TOTAL:              15,   // Memory available to the process of the terminal , Mb
    TERMINAL_MEMORY_AVAILABLE:          16,   // Free memory of the terminal process, Mb
    TERMINAL_MEMORY_USED:               17,   // Memory used by the terminal , Mb
    TERMINAL_SCREEN_DPI:                18,   // The resolution of information display on the screen is measured as number of Dots in a line per Inch (DPI). Knowing the parameter value, you can set the size of graphical objects so that they look the same on monitors with different resolution characteristics.
    TERMINAL_PING_LAST:                 19,   // The last known value of a ping to a trade server in microseconds. One second comprises of one million microseconds Key identifier
    TERMINAL_KEYSTATE_LEFT:             20,   // State of the "Left arrow" key
    TERMINAL_KEYSTATE_UP:               21,   // State of the "Up arrow" key
    TERMINAL_KEYSTATE_RIGHT:            22,   // State of the "Right arrow" key
    TERMINAL_KEYSTATE_DOWN:             23,   // State of the "Down arrow" key
    TERMINAL_KEYSTATE_SHIFT:            24,   // State of the "Shift" key
    TERMINAL_KEYSTATE_CONTROL:          25,   // State of the "Ctrl" key
    TERMINAL_KEYSTATE_MENU:             26,   // State of the "Windows" key
    TERMINAL_KEYSTATE_CAPSLOCK:         27,   // State of the "CapsLock" key
    TERMINAL_KEYSTATE_NUMLOCK:          28,   // State of the "NumLock" key
    TERMINAL_KEYSTATE_SCRLOCK:          29,   // State of the "ScrollLock" key
    TERMINAL_KEYSTATE_ENTER:            30,   // State of the "Enter" key
    TERMINAL_KEYSTATE_INSERT:           31,   // State of the "Insert" key
    TERMINAL_KEYSTATE_DELETE:           32,   // State of the "Delete" key
    TERMINAL_KEYSTATE_HOME:             33,   // State of the "Home" key
    TERMINAL_KEYSTATE_END:              34,   // State of the "End" key
    TERMINAL_KEYSTATE_TAB:              35,   // State of the "Tab" key
    TERMINAL_KEYSTATE_PAGEUP:           36,   // State of the "PageUp" key
    TERMINAL_KEYSTATE_PAGEDOWN:         37,   // State of the "PageDown" key
    TERMINAL_KEYSTATE_ESCAPE:           38,   // State of the "Escape" key
};

/**
 * GetLastError
 * Returns the last error
*/
async function GetLastError(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', code: error.last_code, function: 'GetLastError'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'GetLastError'});
        }
    })
}
/**
 * IsStopped
 * Returns true, if an mql4 program has been commanded to stop its operation
*/
async function IsStopped(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'error', message: 'not supported', function: 'IsStopped'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'IsStopped'});
        }
    })
}
/**
 * UninitializeReason
 * Returns the code of the reason for deinitialization
*/
async function UninitializeReason(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'error', message: 'not supported', function: 'UninitializeReason'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'UninitializeReason'});
        }
    })
}
/**
 * MQLInfoInteger
 * Returns an integer value of a corresponding property of a running mql4 program
*/
async function MQLInfoInteger(property_id){
    return new Promise(async(resolve,reject) => {
        switch(property_id) {
            case ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE:           // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
                resolve({status: 'success', codepage: program.codepage, function: 'MQLInfoInteger [MQL_CODEPAGE]'});
            case ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE:       // Type of the MQL4 program, ENUM_PROGRAM_TYPE
                resolve({status: 'success', program_type: program.program_type, function: 'MQLInfoInteger [PROGRAM_TYPE]'});
            case ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED:       // The permission to use DLL for the given executed program, bool
                resolve(await IsDllsAllowed());
            case ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED:      // The permission to trade for the given executed program, bool
                resolve(await IsDllsAllowed());
            case ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED:    // The permission to modify the Signals for the given executed program, bool
                resolve({status: 'success', signals: program.signals_allowed, function: 'MQLInfoInteger [MQL_SIGNALS_ALLOWED]'});
            case ENUM_MQL_INFO_INTEGER.MQL_DEBUG:              // The flag, that indicates the debug mode, bool
                resolve({status: 'success', debug: program.debug, function: 'MQLInfoInteger [MQL_DEBUG]'});
            case ENUM_MQL_INFO_INTEGER.MQL_PROFILER:           // The flag, that indicates the program operating in the code profiling mode, bool
                resolve({status: 'success', profiler: program.profiler, function: 'MQLInfoInteger [MQL_PROFILER]'});
            case ENUM_MQL_INFO_INTEGER.MQL_TESTER:             // The flag, that indicates the tester process, bool
                resolve({status: 'success', tester: program.tester, function: 'MQLInfoInteger [MQL_TESTER]'});
            case ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION:       // The flag, that indicates the optimization process, bool
                resolve({status: 'success', optimization: program.optimization, function: 'MQLInfoInteger [MQL_OPTIMIZATION]'});
            case ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE:        // The flag, that indicates the visual tester process, bool
                resolve({status: 'success', visualmode: program.visual_mode, function: 'MQLInfoInteger [MQL_VISUAL_MODE]'});
            case ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE:          // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
                resolve({status: 'success', framemode: program.frame_mode, function: 'MQLInfoInteger [MQL_FRAME_MODE]'});
            case ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE:        // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE    
                resolve({status: 'success', license: program.program_license, function: 'MQLInfoInteger [MQL_LICENSE_TYPE]'});
            default:
                resolve({status: 'error', message: 'mismatch', function: 'MQLInfoInteger'});
        }    
    })
}
/**
 * MQLInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
async function MQLInfoString(property_id){
    return new Promise(async(resolve,reject) => {
        switch(property_id) {
            case ENUM_MQL_INFO_STRING.MQL_PROGRAM_NAME:     // Name of the MQL4-program executed, string
                resolve(await TerminalName());
                break;
            case ENUM_MQL_INFO_STRING.MQL_PROGRAM_PATH:     // Path for the given executed program, string
                resolve(await TerminalPath());
                break;
            default:
                reject({status: 'error', message: 'mismatch', function: 'MQLInfoString'});
        }    
    })
}
/**
 * MQLSetInteger
 * Sets the value of the MQL_CODEPAGE property in an MQL4 program environment
*/
async function MQLSetInteger(property_id,value){
    return new Promise((resolve,reject) => {
        var property = "";
        switch(property_id) {
            case ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE:           // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
                property = "MQL_CODEPAGE";
                program.setCodepage(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE:       // Type of the MQL4 program, ENUM_PROGRAM_TYPE
                property = "MQL_PROGRAM_TYPE";
                program.setProgramType(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED:       // The permission to use DLL for the given executed program, bool
                property = "MQL_DLLS_ALLOWED";
                program.setDLLsAllowed(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED:      // The permission to trade for the given executed program, bool
                property = "MQL_TRADE_ALLOWED";
                program.setTradeAllowed(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED:    // The permission to modify the Signals for the given executed program, bool
                property = "MQL_SIGNALS_ALLOWED";
                program.setSignalsAllowed(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_DEBUG:              // The flag, that indicates the debug mode, bool
                property = "MQL_DEBUG";
                program.setDebug(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_PROFILER:           // The flag, that indicates the program operating in the code profiling mode, bool
                property = "MQL_PROFILER";
                program.setProfiler(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_TESTER:             // The flag, that indicates the tester process, bool
                property = "MQL_TESTER";
                program.setTester(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION:       // The flag, that indicates the optimization process, bool
                property = "MQL_OPTIMIZATION";
                program.setOptimization(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE:        // The flag, that indicates the visual tester process, bool
                property = "MQL_VISUAL_MODE";
                program.setVisualMode(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE:          // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
                property = "MQL_FRAME_MODE";
                program.setFrameMode(value);
                break;
            case ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE:        // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE    
                property = "MQL_LICENSE_TYPE";
                program.setProgramLicense(value);
                break;
            default:
                reject({status: 'error', message: 'mismatch', property_id: property_id, function: 'MQLSetInteger'});
        }
        resolve({status: 'success', changed: true, function: `MQLSetInteger [${property}]`});    
    })
}
/**
 * TerminalInfoInteger
 * Returns an integer value of a corresponding property of a running mql4 program
*/
async function TerminalInfoInteger(property_id){
    return new Promise((resolve,reject) => {
        try {
            switch(property_id) {
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_BUILD:
                    resolve({status: 'success', build_version: Number(pkg.version), function: 'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_ACCOUNT:
                    resolve({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_CONNECTION:
                    resolve({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CONNECTED:
                    resolve({status:'status',connected:program.connected,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DLLS_ALLOWED:
                    resolve({status:'success',dlls_allowed:program.dlls_allowed,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_TRADE_ALLOWED:
                    resolve({status:'success',trade_allowed:program.trade_allowed,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_EMAIL_ENABLED:
                    resolve({status:'success',message:sendgrid.enable,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_FTP_ENABLED:
                    resolve({status:'success',message:ftpClient.enable,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_NOTIFICATIONS_ENABLED:
                    resolve({status:'success',message:twilio.enable,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MAXBARS:
                    resolve({status:'success',maxbars:500,function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MQID:
                    resolve({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CODEPAGE:
                    resolve({status: 'success', codepage: program.codepage, function: 'TerminalInfoInteger'});
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CPU_CORES:
                    {
                        const si = require('systeminformation');
                        si.cpu()
                          .then(function(info){
                            resolve({status: 'success', cpu_cores: info.cores, function: 'TerminalInfoInteger'});
                          })
                          .catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DISK_SPACE:
                    {
                        const si = require('systeminformation');
                        si.diskLayout()
                          .then(function(info){
                            resolve({status:'success',disksize:info[0].size,function:'TerminalInfoInteger'});
                          })
                          .catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_PHYSICAL:
                    {
                        const si = require('systeminformation');
                        si.mem()
                          .then(function(info){
                            resolve({status:'success',total:info.total,function:'TerminalInfoInteger'});
                        }).catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_TOTAL:
                    {
                        const si = require('systeminformation');
                        si.mem()
                          .then(function(info){
                            resolve({status:'success',total:info.total,function:'TerminalInfoInteger'});    
                        }).catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_AVAILABLE:
                    {
                        const si = require('systeminformation');
                        si.mem()
                          .then(function(info){
                            resolve({status:'success',available:info.available,function:'TerminalInfoInteger'});    
                        }).catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_USED:
                    {
                        const si = require('systeminformation');
                        si.mem()
                          .then(function(info){
                            resolve({status:'success',used:info.used,function:'TerminalInfoInteger'});    
                        }).catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
                case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_SCREEN_DPI:
                    {
                        const si = require('systeminformation');
                        si.graphics()
                          .then(function(info){
                            resolve({status:'success',screen_dpi:info.displays[0].pixelDepth,function:'TerminalInfoInteger'});    
                        }).catch(error => reject({status:'error', message:error, function:'TerminalInfoInteger'}));
                    }
                    break;
            }    
        } catch(error) {
            reject({status:'error',message:error,function:'TerminalInfoInteger'});
        }    
    })
}
/**
 * TerminalInfoDouble
 * Returns a double value of a corresponding property of a running mql4 program
*/
async function TerminalInfoDouble(property_id){
    return new Promise((resolve,reject) => {
        switch(property_id) {
            case ENUM_MQL_INFO_DOUBLE.TERMINAL_COMMUNITY_BALANCE:
                resolve({status: 'success', balance: Number(0.00), function: 'TerminalInfoDouble'});
                break;
            default:
                reject({status: 'error', message: `unknown property_id of ${property_id}`, function: 'TerminalInfoDouble'})
        }    
    })
}
/**
 * TerminalInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
async function TerminalInfoString(property_id){
    return new Promise((resolve,reject) => {
        switch(property_id) {
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_LANGUAGE:
                resolve({status: 'success', language: 'en-us', function: 'TerminalInfoString'});
                break;
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_COMPANY:
                resolve ({status: 'success', company: pkg.author, function: 'TerminalInfoString'});
                break;
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_NAME:
                resolve ({status: 'success', name: pkg.name, function: 'TerminalInfoString'});
                break;
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_PATH:
                resolve ({status: 'success', path: __dirname, function: 'TerminalInfoString'});
                break;
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_DATA_PATH:
                resolve ({status: 'success', path: __dirname, function: 'TerminalInfoString'});
                break;
            case ENUM_TERMINAL_INFO_STRING.TERMINAL_COMMONDATA_PATH:
                resolve ({status: 'success', path: __dirname, function: 'TerminalInfoString'});
                break;
            default:
                reject({status:'error',message: `unknown property_id of ${property_id}`, function: 'TerminalInfoString'})
        }    
    })
}
/**
 * Symbol
 * Returns the name of a symbol of the current chart
*/
async function Symbol(){
    return new Promise((resolve,reject) => {
        try {
            resolve ({status: 'success', symbol: charts.symbol, function: 'Symbol'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'Symbol'});
        }
    })
}
/**
 * Period
 * Returns the current chart timeframe
*/
async function Period(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', period: charts.period, function: 'Period'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'Period'});
        }
    })
}
/**
 * Digits
 * Returns the number of decimal digits determining the accuracy of the price value of the current chart symbol
*/
async function Digits(){
    return new Promise((resolve,reject) => {
        try {
            resolve ({status: 'success', digits: charts.digits, function: 'Digits'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'Digits'});
        }
    })
}
/**
 * Point
 * Returns the point size of the current symbol in the quote currency
*/
function Point(){
    return new Promise((resolve,reject) => {
        try {
            resolve ({status: 'success',  point: charts.point, function: 'Point'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'Point'});
        }
    })
}
/**
 * IsConnected
 * Checks connection between client terminal and server
*/
function IsConnected(){
    return new Promise((resolve,reject) => {
        try {
            resolve ({status: 'success', connected: program.connected, function: 'IsConnected'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsConnected'});
        }
    })
}
/**
 * IsDemo
 * Checks if the Expert Advisor runs on a demo account
*/
function IsDemo(){
    return new Promise((resolve,reject) => {
        try {
            var host = account.context.hostname;
            if (host.indexOf('practice') !== -1) {
                resolve ({status: 'success', demo: true, function: 'IsDemo'});
            }
            resolve ({status: 'success', demo: false, function: 'IsDemo'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsDemo'});
        }
    })
}
/**
 * IsDllsAllowed
 * Checks if the DLL function call is allowed for the Expert Advisor
*/
async function IsDllsAllowed(){
    return new Promise((resolve,reject) => {
        try {
            resolve ({status: 'success', dlls_allowed: (program.dlls_allowed == 1 ? true : false), function: 'IsDllsAllowed'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsDllsAllowed'});
        }
    })
}
/**
 * IsExpertEnabled
 * Checks if Expert Advisors are enabled for running
*/
async function IsExpertEnabled(){
    return new Promise((resolve,reject) => {
        try {
            // initially set to false, until algorithmic programming implementation has been completed, then set to true
            resolve({status: 'success', enabled: false, function: 'IsExpertEnabled'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsExpertEnabled'});
        }     
    })
}
/**
 * IsLibrariesAllowed
 * Checks if the Expert Advisor can call library function
*/
async function IsLibrariesAllowed(){
    return new Promise((resolve,reject) => {
        try {
            // false until library support has been implemented.
            resolve({status: 'success', allowed: false, function: 'IsLibrariesAllowed'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsLibrariesAllowed'});
        }     
    })
}
/**
 * IsOptimization
 * Checks if Expert Advisor runs in the Strategy Tester optimization mode
*/
async function IsOptimization(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', optimization: (program.optimization == 1 ? true : false), function: 'IsOptimization'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsOptimization'});
        }     
    })
}
/**
 * IsTesting
 * Checks if the Expert Advisor runs in the testing mode
*/
async function IsTesting(){
    return await IsDemo();
}
/**
 * IsTradeAllowed
 * Checks if the Expert Advisor is allowed to trade and trading context is not busy
*/
async function IsTradeAllowed(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', allowed: (program.trade_allowed == 1 ? true : false), function: 'IsTradeAllowed'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsTradeAllowed'});
        }     
    })
}
/**
 * IsTradeContextBusy
 * Returns the information about trade context
*/
async function IsTradeContextBusy(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', busy: program.busy, function: 'IsTradeContextBusy'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsTradeContextBusy'});
        }     
    })
}

/**
 * IsVisualMode
 * Checks if the Expert Advisor is tested in visual mode
*/
async function _IsVisualMode(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success',  visual_mode: (program.visual_mode == 1 ? true : false), function: 'IsVisualMode'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'IsVisualMode'});
        } finally {
            // Call done() regardless of success or failure
            //done();
        }     
    })
}
async function IsVisualMode() {
    return _IsVisualMode()
      .then(result => {
        // Handle the result if needed
        return(result);
      })
      .catch(error => {
        // Handle errors if any
        console.error(error);
      })
      .finally(() => {
      });
}

/**
 * TerminalCompany
 * Returns the name of company owning the client terminal
*/
async function TerminalCompany(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', company: pkg.author, function: 'TerminalCompany'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'TerminalCompany'});
        } finally {
            // Call done() regardless of success or failure
            //done();
        }     
    })
}
/**
 * TerminalName
 * Returns client terminal name
*/
async function TerminalName(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', name: pkg.name, function: 'TerminalName'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'TerminalName'});
        } finally {
            // Call done() regardless of success or failure
            //done();
        }     
    })
}
/**
 * TerminalPath
 * Returns the directory, from which the client terminal was launched
 */
async function TerminalPath(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', path: __dirname, function: 'TerminalPath'});
        } catch(error) {
            reject ({status: 'error', message: error, function: 'TerminalPath'});
        } finally {
            // Call done() regardless of success or failure
            //done();
        }     
    })
}


module.exports = {
    ENUM_TERMINAL_INFO_STRING,
    ENUM_MQL_INFO_INTEGER,
    ENUM_MQL_INFO_STRING,
    ENUM_PROGRAM_TYPE,
    ENUM_LICENSE_TYPE,
    ENUM_TERMINAL_INFO_INTEGER,
    GetLastError,
    IsStopped,
    UninitializeReason,
    MQLInfoInteger,
    MQLInfoString,
    MQLSetInteger,
    TerminalInfoInteger,
    TerminalInfoDouble,
    TerminalInfoString,
    Symbol,
    Period,
    Digits,
    Point,
    IsConnected,
    IsDemo,
    IsDllsAllowed,
    IsExpertEnabled,
    IsLibrariesAllowed,
    IsOptimization,
    IsTesting,
    IsTradeAllowed,
    IsTradeContextBusy,
    IsVisualMode,
    TerminalCompany,
    TerminalName,
    TerminalPath
};
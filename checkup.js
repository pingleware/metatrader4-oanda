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
function GetLastError(){
    return {status: 'success', code: error.last_code, function: 'GetLastError'};
}
/**
 * IsStopped
 * Returns true, if an mql4 program has been commanded to stop its operation
*/
function IsStopped(callback){
    callback({status: 'error', message: 'not supported', function: 'IsStopped'});
}
/**
 * UninitializeReason
 * Returns the code of the reason for deinitialization
*/
function UninitializeReason(callback){
    callback({status: 'error', message: 'not supported', function: 'UninitializeReason'});
}
/**
 * MQLInfoInteger
 * Returns an integer value of a corresponding property of a running mql4 program
*/
function MQLInfoInteger(property_id){
    switch(property_id) {
        case ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE:           // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
            return {status: 'success', codepage: program.codepage, function: 'MQLInfoInteger [MQL_CODEPAGE]'};
        case ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE:       // Type of the MQL4 program, ENUM_PROGRAM_TYPE
            return {status: 'success', program_type: program.program_type, function: 'MQLInfoInteger [PROGRAM_TYPE]'};
        case ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED:       // The permission to use DLL for the given executed program, bool
            return IsDllsAllowed();
        case ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED:      // The permission to trade for the given executed program, bool
            return IsTradeAllowed();
        case ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED:    // The permission to modify the Signals for the given executed program, bool
            return {status: 'success', signals: program.signals_allowed, function: 'MQLInfoInteger [MQL_SIGNALS_ALLOWED]'};
        case ENUM_MQL_INFO_INTEGER.MQL_DEBUG:              // The flag, that indicates the debug mode, bool
            return {status: 'success', debug: program.debug, function: 'MQLInfoInteger [MQL_DEBUG]'};
        case ENUM_MQL_INFO_INTEGER.MQL_PROFILER:           // The flag, that indicates the program operating in the code profiling mode, bool
            return {status: 'success', profiler: program.profiler, function: 'MQLInfoInteger [MQL_PROFILER]'};
        case ENUM_MQL_INFO_INTEGER.MQL_TESTER:             // The flag, that indicates the tester process, bool
            return {status: 'success', tester: program.tester, function: 'MQLInfoInteger [MQL_TESTER]'};
        case ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION:       // The flag, that indicates the optimization process, bool
            return {status: 'success', optimization: program.optimization, function: 'MQLInfoInteger [MQL_OPTIMIZATION]'};
        case ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE:        // The flag, that indicates the visual tester process, bool
            return {status: 'success', visualmode: program.visual_mode, function: 'MQLInfoInteger [MQL_VISUAL_MODE]'};
        case ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE:          // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
            return {status: 'success', framemode: program.frame_mode, function: 'MQLInfoInteger [MQL_FRAME_MODE]'};
        case ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE:        // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE    
            return {status: 'success', license: program.program_license, function: 'MQLInfoInteger [MQL_LICENSE_TYPE]'};
        default:
            return {status: 'error', message: 'mismatch', function: 'MQLInfoInteger'};
    }
}
/**
 * MQLInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
function MQLInfoString(property_id){
    switch(property_id) {
        case ENUM_MQL_INFO_STRING.MQL_PROGRAM_NAME:     // Name of the MQL4-program executed, string
            return TerminalName();
        case ENUM_MQL_INFO_STRING.MQL_PROGRAM_PATH:     // Path for the given executed program, string
            return TerminalPath();
        default:
            return {status: 'error', message: 'mismatch', function: 'MQLInfoString'};
    }
}
/**
 * MQLSetInteger
 * Sets the value of the MQL_CODEPAGE property in an MQL4 program environment
*/
function MQLSetInteger(property_id,value){
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
            return {status: 'error', message: 'mismatch', property_id: property_id, function: 'MQLSetInteger'};
    }
    return {status: 'success', changed: true, function: `MQLSetInteger [${property}]`};
}
/**
 * TerminalInfoInteger
 * Returns an integer value of a corresponding property of a running mql4 program
*/
function TerminalInfoInteger(property_id,callback){
    try {
        switch(property_id) {
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_BUILD:
                callback({status: 'success', build_version: Number(pkg.build.version), function: 'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_ACCOUNT:
                callback({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_CONNECTION:
                callback({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CONNECTED:
                callback({status:'status',connected:program.connected,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DLLS_ALLOWED:
                callback({status:'success',dlls_allowed:program.dlls_allowed,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_TRADE_ALLOWED:
                callback({status:'success',trade_allowed:program.trade_allowed,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_EMAIL_ENABLED:
                callback({status:'success',message:sendgrid.enable,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_FTP_ENABLED:
                callback({status:'success',message:ftpClient.enable,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_NOTIFICATIONS_ENABLED:
                callback({status:'success',message:twilio.enable,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MAXBARS:
                callback({status:'success',maxbars:500,function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MQID:
                callback({status:'error',message:'not implemented',function:'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CODEPAGE:
                callback({status: 'success', codepage: program.codepage, function: 'TerminalInfoInteger'});
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CPU_CORES:
                {
                    const si = require('systeminformation');
                    si.cpu()
                      .then(function(info){
                        callback({status: 'success', cpu_cores: info.cores, function: 'TerminalInfoInteger'});
                      })
                      .catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DISK_SPACE:
                {
                    const si = require('systeminformation');
                    si.diskLayout()
                      .then(function(info){
                        callback({status:'success',disksize:info[0].size,function:'TerminalInfoInteger'});
                      })
                      .catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_PHYSICAL:
                {
                    const si = require('systeminformation');
                    si.mem()
                      .then(function(info){
                        callback({status:'success',total:info.total,function:'TerminalInfoInteger'});
                    }).catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_TOTAL:
                {
                    const si = require('systeminformation');
                    si.mem()
                      .then(function(info){
                        callback({status:'success',total:info.total,function:'TerminalInfoInteger'});    
                    }).catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_AVAILABLE:
                {
                    const si = require('systeminformation');
                    si.mem()
                      .then(function(info){
                        callback({status:'success',available:info.available,function:'TerminalInfoInteger'});    
                    }).catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_USED:
                {
                    const si = require('systeminformation');
                    si.mem()
                      .then(function(info){
                        callback({status:'success',used:info.used,function:'TerminalInfoInteger'});    
                    }).catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
            case ENUM_TERMINAL_INFO_INTEGER.TERMINAL_SCREEN_DPI:
                {
                    const si = require('systeminformation');
                    si.graphics()
                      .then(function(info){
                        callback({status:'success',screen_dpi:info.displays[0].pixelDepth,function:'TerminalInfoInteger'});    
                    }).catch(error => callback({status:'error', message:error, function:'TerminalInfoInteger'}));
                }
                break;
        }    
    } catch(error) {
        callback({status:'error',message:error,function:'TerminalInfoInteger'});
    }
}
/**
 * TerminalInfoDouble
 * Returns a double value of a corresponding property of a running mql4 program
*/
function TerminalInfoDouble(property_id){
    switch(property_id) {
        case ENUM_MQL_INFO_DOUBLE.TERMINAL_COMMUNITY_BALANCE:
            return {status: 'success', balance: Number(0.00), function: 'TerminalInfoDouble'};
            break;
    }
}
/**
 * TerminalInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
function TerminalInfoString(property_id){
    switch(property_id) {
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_LANGUAGE:
            return {status: 'success', language: 'en-us', function: 'TerminalInfoString'};
            break;
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_COMPANY:
            return {status: 'success', company: pkg.author, function: 'TerminalInfoString'};
            break;
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_NAME:
            return {status: 'success', name: pkg.name, function: 'TerminalInfoString'};
            break;
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_PATH:
            return {status: 'success', path: __dirname, function: 'TerminalInfoString'};
            break;
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_DATA_PATH:
            return {status: 'success', path: __dirname, function: 'TerminalInfoString'};
            break;
        case ENUM_TERMINAL_INFO_STRING.TERMINAL_COMMONDATA_PATH:
            return {status: 'success', path: __dirname, function: 'TerminalInfoString'};
            break;
    }
}
/**
 * Symbol
 * Returns the name of a symbol of the current chart
*/
function Symbol(){
    return {status: 'success', symbol: charts.symbol, function: 'Symbol'};
}
/**
 * Period
 * Returns the current chart timeframe
*/
function Period(){
    return {status: 'success', period: charts.period, function: 'Period'};
}
/**
 * Digits
 * Returns the number of decimal digits determining the accuracy of the price value of the current chart symbol
*/
function Digits(){
    return {status: 'success', digits: charts.digits, function: 'Digits'};
}
/**
 * Point
 * Returns the point size of the current symbol in the quote currency
*/
function Point(){
    return {status: 'success', point: charts.point, function: 'Point'};
}
/**
 * IsConnected
 * Checks connection between client terminal and server
*/
function IsConnected(){
    return {status: 'success', connected: program.connected, function: 'IsConnected'}
}
/**
 * IsDemo
 * Checks if the Expert Advisor runs on a demo account
*/
function IsDemo(){
    var host = account.context.hostname;
    if (host.indexOf('practice') !== -1) {
        return {status: 'success', demo: true, function: 'IsDemo'};
    }
    return {status: 'success', demo: false, function: 'IsDemo'};
}
/**
 * IsDllsAllowed
 * Checks if the DLL function call is allowed for the Expert Advisor
*/
function IsDllsAllowed(){
    return {status: 'success', dlls_allowed: (program.dlls_allowed == 1 ? true : false), function: 'IsDllsAllowed'};
}
/**
 * IsExpertEnabled
 * Checks if Expert Advisors are enabled for running
*/
function IsExpertEnabled(){
    // initially set to false, until algorithmic programming implementation has been completed, then set to true
    return {status: 'success', enabled: false, function: 'IsExpertEnabled'};
}
/**
 * IsLibrariesAllowed
 * Checks if the Expert Advisor can call library function
*/
function IsLibrariesAllowed(){
    // false until library support has been implemented.
    return {status: 'success', allowed: false, function: 'IsLibrariesAllowed'};
}
/**
 * IsOptimization
 * Checks if Expert Advisor runs in the Strategy Tester optimization mode
*/
function IsOptimization(){
    return {status: 'success', optimization: (program.optimization == 1 ? true : false), function: 'IsOptimization'};
}
/**
 * IsTesting
 * Checks if the Expert Advisor runs in the testing mode
*/
function IsTesting(){
    return IsDemo();
}
/**
 * IsTradeAllowed
 * Checks if the Expert Advisor is allowed to trade and trading context is not busy
*/
function IsTradeAllowed(){
    return {status: 'success', allowed: (program.trade_allowed == 1 ? true : false), function: 'IsTradeAllowed'};
}
/**
 * IsTradeContextBusy
 * Returns the information about trade context
*/
function IsTradeContextBusy(){
    return {status: 'success', busy: program.busy, function: 'IsTradeContextBusy'};
}
/**
 * IsVisualMode
 * Checks if the Expert Advisor is tested in visual mode
*/
function IsVisualMode(){
    return {status: 'success',  visual_mode: (program.visual_mode == 1 ? true : false), function: 'IsVisualMode'};
}
/**
 * TerminalCompany
 * Returns the name of company owning the client terminal
*/
function TerminalCompany(){
    return {status: 'success', company: pkg.author, function: 'TerminalCompany'};
}
/**
 * TerminalName
 * Returns client terminal name
*/
function TerminalName(){
    return {status: 'success', name: pkg.name, function: 'TerminalName'};
}
/**
 * TerminalPath
 * Returns the directory, from which the client terminal was launched
 */
function TerminalPath(){
    return {status: 'success', path: __dirname, function: 'TerminalPath'};
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
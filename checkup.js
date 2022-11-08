"use strict"

const { error } = require('./account');

var { program } = require('./account');

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

/**
 * GetLastError
 * Returns the last error
*/
function GetLastError(){
    return error.last_code;
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
        case MQL_CODEPAGE:           // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
            return program.codepage;
        case MQL_PROGRAM_TYPE:       // Type of the MQL4 program, ENUM_PROGRAM_TYPE
            return program.program_type;
        case MQL_DLLS_ALLOWED:       // The permission to use DLL for the given executed program, bool
            return program.dlls_allowed;
        case MQL_TRADE_ALLOWED:      // The permission to trade for the given executed program, bool
            return program.trade_allowed;
        case MQL_SIGNALS_ALLOWED:    // The permission to modify the Signals for the given executed program, bool
            return program.signals_allowed;
        case MQL_DEBUG:              // The flag, that indicates the debug mode, bool
            return program.debug;
        case MQL_PROFILER:           // The flag, that indicates the program operating in the code profiling mode, bool
            return program.profiler;
        case MQL_TESTER:             // The flag, that indicates the tester process, bool
            return program.tester;
        case MQL_OPTIMIZATION:       // The flag, that indicates the optimization process, bool
            return program.optimization;
        case MQL_VISUAL_MODE:        // The flag, that indicates the visual tester process, bool
            return program.visual_mode;
        case MQL_FRAME_MODE:          // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
            return program.frame_mode;
        case MQL_LICENSE_TYPE:        // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE    
            return program.program_license;
        default:
            break;
    }
}
/**
 * MQLInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
function MQLInfoString(property_id){
    switch(property_id) {
        case MQL_PROGRAM_NAME:     // Name of the MQL4-program executed, string
            return TerminalName();
        case MQL_PROGRAM_PATH:     // Path for the given executed program, string
            return TerminalPath();
        default:
            return null;
    }
}
/**
 * MQLSetInteger
 * Sets the value of the MQL_CODEPAGE property in an MQL4 program environment
*/
function MQLSetInteger(property_id,value){
    switch(property_id) {
        case MQL_CODEPAGE:           // Codepage used by an MQL4 program to output and convert strings (Print, PrintFormat, Alert, MessageBox, SendFTP, SendMail, SendNotification, etc.), Codepage constant
            program.setCodepage(value);
        case MQL_PROGRAM_TYPE:       // Type of the MQL4 program, ENUM_PROGRAM_TYPE
            program.setProgramType(value);
        case MQL_DLLS_ALLOWED:       // The permission to use DLL for the given executed program, bool
            program.setDLLsAllowed(value);
        case MQL_TRADE_ALLOWED:      // The permission to trade for the given executed program, bool
            program.setTradeAllowed(value);
        case MQL_SIGNALS_ALLOWED:    // The permission to modify the Signals for the given executed program, bool
            program.setSignalsAllowed(value);
        case MQL_DEBUG:              // The flag, that indicates the debug mode, bool
            program.setDebug(value);
        case MQL_PROFILER:           // The flag, that indicates the program operating in the code profiling mode, bool
            program.setProfiler(value);
        case MQL_TESTER:             // The flag, that indicates the tester process, bool
            program.setTester(value);
        case MQL_OPTIMIZATION:       // The flag, that indicates the optimization process, bool
            program.setOptimization(value);
        case MQL_VISUAL_MODE:        // The flag, that indicates the visual tester process, bool
            program.setVisualMode(value);
        case MQL_FRAME_MODE:          // The flag, that indicates the Expert Advisor operating in gathering optimization result frames mode, bool
            program.setFrameMode(value);
        case MQL_LICENSE_TYPE:        // Type of license of the EX4 module. The license refers to the EX4 module, from which a request is made using MQLInfoInteger(MQL_LICENSE_TYPE)., ENUM_LICENSE_TYPE    
            program.setProgramLicense(value);
            return true;
        default:
            return false;
    }
}
/**
 * TerminalInfoInteger
 * Returns an integer value of a corresponding property of a running mql4 program
*/
function TerminalInfoInteger(callback){

}
/**
 * TerminalInfoDouble
 * Returns a double value of a corresponding property of a running mql4 program
*/
function TerminalInfoDouble(callback){

}
/**
 * TerminalInfoString
 * Returns a string value of a corresponding property of a running mql4 program
*/
function TerminalInfoString(callback){

}
/**
 * Symbol
 * Returns the name of a symbol of the current chart
*/
function Symbol(callback){

}
/**
 * Period
 * Returns the current chart timeframe
*/
function Period(callback){

}
/**
 * Digits
 * Returns the number of decimal digits determining the accuracy of the price value of the current chart symbol
*/
function Digits(callback){

}
/**
 * Point
 * Returns the point size of the current symbol in the quote currency
*/
function Point(callback){

}
/**
 * IsConnected
 * Checks connection between client terminal and server
*/
function IsConnected(callback){

}
/**
 * IsDemo
 * Checks if the Expert Advisor runs on a demo account
*/
function IsDemo(){
    var host = context.host;
    if (host.contains('practice')) {
        return true;
    }
    return false;
}
/**
 * IsDllsAllowed
 * Checks if the DLL function call is allowed for the Expert Advisor
*/
function IsDllsAllowed(){
    return (program.dlls_allowed == 1 ? true : false);
}
/**
 * IsExpertEnabled
 * Checks if Expert Advisors are enabled for running
*/
function IsExpertEnabled(){
    return true;
}
/**
 * IsLibrariesAllowed
 * Checks if the Expert Advisor can call library function
*/
function IsLibrariesAllowed(){
    return true;
}
/**
 * IsOptimization
 * Checks if Expert Advisor runs in the Strategy Tester optimization mode
*/
function IsOptimization(callback){
    return (program.optimization == 1 ? true : false);
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
    return (program.trade_allowed == 1 ? true : false);
}
/**
 * IsTradeContextBusy
 * Returns the information about trade context
*/
function IsTradeContextBusy(callback){

}
/**
 * IsVisualMode
 * Checks if the Expert Advisor is tested in visual mode
*/
function IsVisualMode(){
    return (program.visual_mode == 1 ? true : false);
}
/**
 * TerminalCompany
 * Returns the name of company owning the client terminal
*/
function TerminalCompany(){
    return 'OANDA DIVISION1';
}
/**
 * TerminalName
 * Returns client terminal name
*/
function TerminalName(){
    const _package = require('./package.json');
    return _package.name;
}
/**
 * TerminalPath
 * Returns the directory, from which the client terminal was launched
 */
function TerminalPath(){
    return __dirname;
}


module.exports = {
    ENUM_TERMINAL_INFO_STRING,
    ENUM_MQL_INFO_INTEGER,
    ENUM_MQL_INFO_STRING,
    ENUM_PROGRAM_TYPE,
    ENUM_LICENSE_TYPE,
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
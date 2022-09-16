"use strict"

/**
GetLastError
Returns the last error
*/
function GetLastError(callback){}
/**
IsStopped
Returns true, if an mql4 program has been commanded to stop its operation
*/
function IsStopped(callback){}
/**
UninitializeReason
Returns the code of the reason for deinitialization
*/
function UninitializeReason(callback){}
/**
MQLInfoInteger
Returns an integer value of a corresponding property of a running mql4 program
*/
function MQLInfoInteger(callback){}
/**
MQLInfoString
Returns a string value of a corresponding property of a running mql4 program
*/
function MQLInfoString(callback){}
/**
MQLSetInteger
Sets the value of the MQL_CODEPAGE property in an MQL4 program environment
*/
function MQLSetInteger(callback){}
/**
TerminalInfoInteger
Returns an integer value of a corresponding property of a running mql4 program
*/
function TerminalInfoInteger(callback){}
/**
TerminalInfoDouble
Returns a double value of a corresponding property of a running mql4 program
*/
function TerminalInfoDouble(callback){}
/**
TerminalInfoString
Returns a string value of a corresponding property of a running mql4 program
*/
function TerminalInfoString(callback){}
/**
Symbol
Returns the name of a symbol of the current chart
*/
function Symbol(callback){}
/**
Period
Returns the current chart timeframe
*/
function Period(callback){}
/**
Digits
Returns the number of decimal digits determining the accuracy of the price value of the current chart symbol
*/
function Digits(callback){}
/**
Point
Returns the point size of the current symbol in the quote currency
*/
function Point(callback){}
/**
IsConnected
Checks connection between client terminal and server
*/
function IsConnected(callback){}
/**
IsDemo
Checks if the Expert Advisor runs on a demo account
*/
function IsDemo(callback){}
/**
IsDllsAllowed
Checks if the DLL function call is allowed for the Expert Advisor
*/
function IsDllsAllowed(callback){}
/**
IsExpertEnabled
Checks if Expert Advisors are enabled for running
*/
function IsExpertEnabled(callback){}
/**
IsLibrariesAllowed
Checks if the Expert Advisor can call library function
*/
function IsLibrariesAllowed(callback){}
/**
IsOptimization
Checks if Expert Advisor runs in the Strategy Tester optimization mode
*/
function IsOptimization(callback){}
/**
IsTesting
Checks if the Expert Advisor runs in the testing mode
*/
function IsTesting(callback){}
/**
IsTradeAllowed
Checks if the Expert Advisor is allowed to trade and trading context is not busy
*/
function IsTradeAllowed(callback){}
/**
IsTradeContextBusy
Returns the information about trade context
*/
function IsTradeContextBusy(callback){}
/**
IsVisualMode
Checks if the Expert Advisor is tested in visual mode
*/
function IsVisualMode(callback){}
/**
TerminalCompany
Returns the name of company owning the client terminal
*/
function TerminalCompany(callback){}
/**
TerminalName
Returns client terminal name
*/
function TerminalName(callback){}
/**
TerminalPath
Returns the directory, from which the client terminal was launched
 */
function TerminalPath(callback){}


module.exports = {
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
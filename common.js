"use strict"

/**
Alert
Displays a message in a separate window
*/ 
function Alert(callback){
    callback({status: 'error', message: 'not implemented'});
}
/**
CheckPointer
Returns the type of the object pointer
*/ 
function CheckPointer(callback){}
/**
Comment
Outputs a comment in the left top corner of the chart
*/ 
function Comment(callback){
    callback({status: 'error', message: 'not implemented'});
}
/**
CryptEncode
Transforms the data from array with the specified method
*/ 
function CryptEncode(callback){}
/**
CryptDecode
Performs the inverse transformation of the data from array
*/ 
function CryptDecode(callback){}
/**
DebugBreak
Program breakpoint in debugging
*/ 
function DebugBreak(callback){}
/**
ExpertRemove
Stops Expert Advisor and unloads it from the chart
*/ 
function ExpertRemove(callback){}
/**
GetPointer
Returns the object pointer
*/ 
function GetPointer(callback){}
/**
GetTickCount
Returns the number of milliseconds that have elapsed since the system was started
*/ 
function GetTickCount(callback){}
/**
GetMicrosecondCount
Returns the number of microseconds that have elapsed since the start of MQL4-program
*/ 
function GetMicrosecondCount(callback){}
/**
MessageBox
Creates, displays a message box and manages it
*/ 
function MessageBox(callback){
    callback({status: 'error', message: 'not implemented'});
}
/**
PeriodSeconds
Returns the number of seconds in the period
*/ 
function PeriodSeconds(callback){}
/**
PlaySound
Plays a sound file
*/ 
function PlaySound(callback){}
/**
Print
Displays a message in the log
*/ 
function Print(callback){}
/**
PrintFormat
Formats and prints the sets of symbols and values in a log file in accordance with a preset format
*/ 
function PrintFormat(callback){}
/**
ResetLastError
Sets the value of a predetermined variable _LastError to zero 
*/ 
function ResetLastError(callback){}
/**
ResourceCreate
Creates an image resource based on a data set
*/ 
function ResourceCreate(callback){}
/**
ResourceFree
Deletes dynamically created resource (freeing the memory allocated for it)
*/ 
function ResourceFree(callback){}
/**
ResourceReadImage
Reads data from the graphical resource created by ResourceCreate() function or saved in EX4 file during compilation
*/ 
function ResourceReadImage(callback){}
/**
ResourceSave
Saves a resource into the specified file
*/ 
function ResourceSave(callback){}
/**
SendFTP
Sends a file at the address specified in the settings window of the "FTP" tab
*/ 
function SendFTP(callback){}
/**
SendMail
Sends an email at the address specified in the settings window of the "Email" tab
*/ 
function SendMail(callback){}
/**
SendNotification
Sends push notifications to mobile terminals, whose MetaQuotes ID are specified in the "Notifications" tab
*/ 
function SendNotification(callback){}
/**
Sleep
Suspends execution of the current Expert Advisor or script within a specified interval
*/ 
function Sleep(callback){}
/**
TerminalClose
Commands the terminal to complete operation
*/ 
function TerminalClose(callback){}
/**
TesterStatistics
It returns the value of a specified statistic calculated based on testing results
*/ 
function TesterStatistics(callback){}
/**
TranslateKey
Returns a Unicode character by a virtual key code
*/ 
function TranslateKey(callback){}
/**
WebRequest
Sends HTTP request to the specified server
*/ 
function WebRequest(callback){}
/**
ZeroMemory
Resets a variable passed to it by reference. The variable can be of any type, except for classes and structures that have constructors.
 */
function ZeroMemory(callback){}

module.exports = {
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
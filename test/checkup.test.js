"use strict"

const assert = require('assert').strict;

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

const ENUM_TERMINAL_INFO_STRING = {
    TERMINAL_LANGUAGE:          0,  // Language of the terminal, string
    TERMINAL_COMPANY:           1,  // Company name, string
    TERMINAL_NAME:              2,  // Terminal name, string
    TERMINAL_PATH:              3,  // Folder from which the terminal is started, string
    TERMINAL_DATA_PATH:         4,  // Folder in which terminal data are stored, string
    TERMINAL_COMMONDATA_PATH:   5   // Common path for all of the terminals installed on a computer, string
};


const {
    initialize,
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
} = require('../index');
const settings = require('../settings.json');

describe('Testing Checkup Functions', function(){
    this.beforeAll(function(){
        initialize(settings.oanda.test.url,settings.oanda.test.token,settings.oanda.test.accounts[0]);
    })

    it('GetLastError', function(){
        var result = GetLastError();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsStopped', function(){
        IsStopped(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'error');
        });
    })
    it('UninitializeReason', function(){
        UninitializeReason(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'error');
        })
    })
    it('MQLInfoInteger', function(){
        var result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_DEBUG);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_PROFILER);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_TESTER);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('MQLInfoString', function(){
        var result = MQLInfoString(ENUM_MQL_INFO_STRING.MQL_PROGRAM_NAME);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLInfoString(ENUM_MQL_INFO_STRING.MQL_PROGRAM_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('MQLSetInteger', function(){
        var result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE,1308);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_DEBUG,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_PROFILER,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_TESTER,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('TerminalInfoInteger', function(){
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_BUILD,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_ACCOUNT,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_CONNECTION,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CONNECTED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DLLS_ALLOWED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_TRADE_ALLOWED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_EMAIL_ENABLED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_FTP_ENABLED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_NOTIFICATIONS_ENABLED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MAXBARS,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MQID,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CODEPAGE,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DISK_SPACE, function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CPU_CORES, function(result){
            if (settings.debug) console.log(result);
            //assert.equal(result.status,'error');  
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_PHYSICAL,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_AVAILABLE,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_USED,function(result){
            if (settings.debug) console.log(result);
        })
        TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_SCREEN_DPI,function(result){
            if (settings.debug) console.log(result);
        })
    })
    it('TerminalInfoDouble', function(){
        var result = TerminalInfoDouble(ENUM_MQL_INFO_DOUBLE.TERMINAL_COMMUNITY_BALANCE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalInfoString', function(){
        var result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_LANGUAGE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_COMPANY);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_NAME);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_DATA_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_COMMONDATA_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Symbol', function(){
        var result = Symbol();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Period', function(){
        var result = Period();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Digits', function(){
        var result = Digits();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Point', function(){
        var result = Point();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsConnected', function(){
        var result = IsConnected();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsDemo', function(){
        var result = IsDemo();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsDllsAllowed', function(){
        var result = IsDllsAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsExpertEnabled', function(){
        var result = IsExpertEnabled();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsLibrariesAllowed', function(){
        var result = IsLibrariesAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsOptimization', function(){
        var result = IsOptimization();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTesting', function(){
        var result = IsTesting();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTradeAllowed', function(){
        var result = IsTradeAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTradeContextBusy', function(){
        var result = IsTradeContextBusy();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsVisualMode', function(){
        var result = IsVisualMode();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalCompany', function(){
        var result = TerminalCompany();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalName', function(){
        var result = TerminalName()
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalPath', function(){
        var result = TerminalPath();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
})


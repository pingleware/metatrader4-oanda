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

describe('Testing Checkup Functions', async function(){
    this.beforeAll(function(){
        initialize(settings.oanda.test.url,settings.oanda.test.token,settings.oanda.test.accounts[0]);
    })

    it('GetLastError', async function(){
        var result = await GetLastError();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsStopped', async function(){
        var result = await IsStopped();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'error');
    })
    it('UninitializeReason', async function(){
        var result = await UninitializeReason();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'error');
    })
    it('MQLInfoInteger', async function(){
        var result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_DEBUG);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_PROFILER);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_TESTER);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await MQLInfoInteger(ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('MQLInfoString', async function(){
        var result = await MQLInfoString(ENUM_MQL_INFO_STRING.MQL_PROGRAM_NAME);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLInfoString(ENUM_MQL_INFO_STRING.MQL_PROGRAM_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('MQLSetInteger', async function(){
        var result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_CODEPAGE,1308);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_PROGRAM_TYPE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_DLLS_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_TRADE_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_SIGNALS_ALLOWED,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_DEBUG,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_PROFILER,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_TESTER,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_OPTIMIZATION,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_VISUAL_MODE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_FRAME_MODE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
        result = await MQLSetInteger(ENUM_MQL_INFO_INTEGER.MQL_LICENSE_TYPE,1);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it('TerminalInfoInteger', async function(){
        var result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_BUILD);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_ACCOUNT);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_COMMUNITY_CONNECTION);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CONNECTED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DLLS_ALLOWED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_TRADE_ALLOWED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_EMAIL_ENABLED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_FTP_ENABLED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_NOTIFICATIONS_ENABLED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MAXBARS);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MQID);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CODEPAGE);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_DISK_SPACE);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_CPU_CORES);
            if (settings.debug) console.log(result);
            assert.equal(result.cpu_cores,8);  
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_PHYSICAL);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_AVAILABLE);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_MEMORY_USED);
            if (settings.debug) console.log(result);
        result = await TerminalInfoInteger(ENUM_TERMINAL_INFO_INTEGER.TERMINAL_SCREEN_DPI);
            if (settings.debug) console.log(result);
    })
    it('TerminalInfoDouble', async function(){
        var result = await TerminalInfoDouble(ENUM_MQL_INFO_DOUBLE.TERMINAL_COMMUNITY_BALANCE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalInfoString', async function(){
        var result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_LANGUAGE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_COMPANY);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_NAME);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_DATA_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
        result = await TerminalInfoString(ENUM_TERMINAL_INFO_STRING.TERMINAL_COMMONDATA_PATH);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Symbol', async function(){
        var result = await Symbol();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Period', async function(){
        var result = await Period();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Digits', async function(){
        var result = await Digits();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('Point', async function(){
        var result = await Point();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsConnected', async function(){
        var result = await IsConnected();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsDemo', async function(){
        var result = await IsDemo();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsDllsAllowed', async function(){
        var result = await IsDllsAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsExpertEnabled', async function(){
        var result = await IsExpertEnabled();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsLibrariesAllowed', async function(){
        var result = await IsLibrariesAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsOptimization', async function(){
        var result = await IsOptimization();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTesting', async function(){
        var result = await IsTesting();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTradeAllowed', async function(){
        var result = await IsTradeAllowed();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsTradeContextBusy', async function(){
        var result = await IsTradeContextBusy();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('IsVisualMode', async function(){
        var result = await IsVisualMode();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalCompany', async function(){
        var result = await TerminalCompany();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalName', async function(){
        var result = await TerminalName()
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it('TerminalPath', async function(){
        var result = await TerminalPath();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
})


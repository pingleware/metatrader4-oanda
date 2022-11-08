"use strict"

const config = require('./package.json');
const {Context} = require('@oanda/v20/context');

const RUNTIME_ERROR = {
    ERR_NO_ERROR: 0, // No error returned
    ERR_NO_RESULT: 1,     // No error returned, but the result is unknown
    ERR_COMMON_ERROR: 2,     // Common error
    ERR_INVALID_TRADE_PARAMETERS: 3,     // Invalid trade parameters
    ERR_SERVER_BUSY: 4,      // Trade server is busy
    ERR_OLD_VERSION: 5,     // Old version of the client terminal
    ERR_NO_CONNECTION: 6,     // No connection with trade server
    ERR_NOT_ENOUGH_RIGHTS: 7,     // Not enough rights
    ERR_TOO_FREQUENT_REQUESTS: 8,     // Too frequent requests
    ERR_MALFUNCTIONAL_TRADE: 9,     // Malfunctional trade operation
    ERR_ACCOUNT_DISABLED: 64,     // Account disabled
    ERR_INVALID_ACCOUNT: 65,     // Invalid account
    ERR_TRADE_TIMEOUT: 128,     // Trade timeout
    ERR_INVALID_PRICE: 129,     // Invalid price
    ERR_INVALID_STOPS: 130,     // Invalid stops
    ERR_INVALID_TRADE_VOLUME: 131,     // Invalid trade volume
    ERR_MARKET_CLOSED: 132,     // Market is closed
    ERR_TRADE_DISABLED: 133,     // Trade is disabled
    ERR_NOT_ENOUGH_MONEY: 134,     // Not enough money
    ERR_PRICE_CHANGED: 135,     // Price changed
    ERR_OFF_QUOTES: 136,     // Off quotes
    ERR_BROKER_BUSY: 137,     // Broker is busy
    ERR_REQUOTE: 138,     // Requote
    ERR_ORDER_LOCKED: 139,     // Order is locked
    ERR_LONG_POSITIONS_ONLY_ALLOWED: 140,     // Buy orders only allowed
    ERR_TOO_MANY_REQUESTS: 141,     // Too many requests
    ERR_TRADE_MODIFY_DENIED: 145,     // Modification denied because order is too close to market
    ERR_TRADE_CONTEXT_BUSY: 146,     // Trade context is busy
    ERR_TRADE_EXPIRATION_DENIED: 147,     // Expirations are denied by broker
    ERR_TRADE_TOO_MANY_ORDERS: 148,     /// The amount of open and pending orders has reached the limit set by the broker
    ERR_TRADE_HEDGE_PROHIBITED: 149,     // An attempt to open an order opposite to the existing one when hedging is disabled
    ERR_TRADE_PROHIBITED_BY_FIFO: 150,     // An attempt to close an order contravening the FIFO rule
    ERR_NO_MQLERROR: 4000,     // No error returned
    ERR_WRONG_FUNCTION_POINTER: 4001,     // Wrong function pointer
    ERR_ARRAY_INDEX_OUT_OF_RANGE: 4002,      // Array index is out of range
    ERR_NO_MEMORY_FOR_CALL_STACK: 4003,     // No memory for function call stack
    ERR_RECURSIVE_STACK_OVERFLOW: 4004,     // Recursive stack overflow
    ERR_NOT_ENOUGH_STACK_FOR_PARAM: 4005,     // Not enough stack for parameter
    ERR_NO_MEMORY_FOR_PARAM_STRING: 4006,     // No memory for parameter string
    ERR_NO_MEMORY_FOR_TEMP_STRING: 4007,     // No memory for temp string
    ERR_NOT_INITIALIZED_STRING: 4008,     // Not initialized string
    ERR_NOT_INITIALIZED_ARRAYSTRING: 4009,     // Not initialized string in array
    ERR_NO_MEMORY_FOR_ARRAYSTRING: 4010,    // No memory for array string
    ERR_TOO_LONG_STRING: 4011,    // Too long string
    ERR_REMAINDER_FROM_ZERO_DIVIDE: 4012,    // Remainder from zero divide
    ERR_ZERO_DIVIDE: 4013,    // Zero divide
    ERR_UNKNOWN_COMMAND: 4014,    // Unknown command
    ERR_WRONG_JUMP: 4015,    // Wrong jump (never generated error)
    ERR_NOT_INITIALIZED_ARRAY: 4016,    // Not initialized array
    ERR_DLL_CALLS_NOT_ALLOWED: 4017,    // DLL calls are not allowed
    ERR_CANNOT_LOAD_LIBRARY: 4018, // Cannot load library
    ERR_CANNOT_CALL_FUNCTION: 4019,    // Cannot call function
    ERR_EXTERNAL_CALLS_NOT_ALLOWED: 4020,    // Expert function calls are not allowed
    ERR_NO_MEMORY_FOR_RETURNED_STR: 4021,    // Not enough memory for temp string returned from function
    ERR_SYSTEM_BUSY: 4022,    // System is busy (never generated error)
    ERR_DLLFUNC_CRITICALERROR: 4023,    // DLL-function call critical error
    ERR_INTERNAL_ERROR: 4024,    // Internal error
    ERR_OUT_OF_MEMORY: 4025,    // Out of memory
    ERR_INVALID_POINTER: 4026,    // Invalid pointer
    ERR_FORMAT_TOO_MANY_FORMATTERS: 4027,    // Too many formatters in the format function
    ERR_FORMAT_TOO_MANY_PARAMETERS: 4028,    // Parameters count exceeds formatters count
    ERR_ARRAY_INVALID: 4029,    // Invalid array
    ERR_CHART_NOREPLY: 4030,    // No reply from chart
    ERR_INVALID_FUNCTION_PARAMSCNT: 4050,    // Invalid function parameters count
    ERR_INVALID_FUNCTION_PARAMVALUE: 4051,    // Invalid function parameter value
    ERR_STRING_FUNCTION_INTERNAL: 4052,    // String function internal error
    ERR_SOME_ARRAY_ERROR: 4053,    // Some array error
    ERR_INCORRECT_SERIESARRAY_USING: 4054,    // Incorrect series array using
    ERR_CUSTOM_INDICATOR_ERROR: 4055,    // Custom indicator error
    ERR_INCOMPATIBLE_ARRAYS: 4056,    // Arrays are incompatible
    ERR_GLOBAL_VARIABLES_PROCESSING: 4057,    // Global variables processing error
    ERR_GLOBAL_VARIABLE_NOT_FOUND: 4058,    // Global variable not found
    ERR_FUNC_NOT_ALLOWED_IN_TESTING: 4059,    // Function is not allowed in testing mode
    ERR_FUNCTION_NOT_CONFIRMED: 4060,    // Function is not allowed for call
    ERR_SEND_MAIL_ERROR: 4061,    // Send mail error
    ERR_STRING_PARAMETER_EXPECTED: 4062,    // String parameter expected
    ERR_INTEGER_PARAMETER_EXPECTED: 4063,    // Integer parameter expected
    ERR_DOUBLE_PARAMETER_EXPECTED: 4064,    // Double parameter expected
    ERR_ARRAY_AS_PARAMETER_EXPECTED: 4065,    // Array as parameter expected
    ERR_HISTORY_WILL_UPDATED: 4066,    // Requested history data is in updating state
    ERR_TRADE_ERROR: 4067,    // Internal trade error
    ERR_RESOURCE_NOT_FOUND: 4068,    // Resource not found
    ERR_RESOURCE_NOT_SUPPORTED: 4069,    // Resource not supported
    ERR_RESOURCE_DUPLICATED: 4070,    // Duplicate resource
    ERR_INDICATOR_CANNOT_INIT: 4071,    // Custom indicator cannot initialize
    ERR_INDICATOR_CANNOT_LOAD: 4072,    // Cannot load custom indicator
    ERR_NO_HISTORY_DATA: 4073,    // No history data
    ERR_NO_MEMORY_FOR_HISTORY: 4074,    // No memory for history data
    ERR_NO_MEMORY_FOR_INDICATOR: 4075,    // Not enough memory for indicator calculation
    ERR_END_OF_FILE: 4099,    // End of file
    ERR_SOME_FILE_ERROR: 4100,    // Some file error
    ERR_WRONG_FILE_NAME: 4101,    // Wrong file name
    ERR_TOO_MANY_OPENED_FILES: 4102,    // Too many opened files
    ERR_CANNOT_OPEN_FILE: 4103,    // Cannot open file
    ERR_INCOMPATIBLE_FILEACCESS: 4104,    // Incompatible access to a file
    ERR_NO_ORDER_SELECTED: 4105,    // No order selected
    ERR_UNKNOWN_SYMBOL: 4106,    // Unknown symbol
    ERR_INVALID_PRICE_PARAM: 4107,    // Invalid price
    ERR_INVALID_TICKET: 4108,    // Invalid ticket
    ERR_TRADE_NOT_ALLOWED: 4109,    // Trade is not allowed. Enable checkbox "Allow live trading" in the Expert Advisor properties
    ERR_LONGS_NOT_ALLOWED: 4110,    // Longs are not allowed. Check the Expert Advisor properties
    ERR_SHORTS_NOT_ALLOWED: 4111,    // Shorts are not allowed. Check the Expert Advisor properties
    ERR_TRADE_EXPERT_DISABLED_BY_SERVER: 4112,    // Automated trading by Expert Advisors/Scripts disabled by trade server
    ERR_OBJECT_ALREADY_EXISTS: 4200,    // Object already exists
    ERR_UNKNOWN_OBJECT_PROPERTY: 4201,    // Unknown object property
    ERR_OBJECT_DOES_NOT_EXIST: 4202,    // Object does not exist
    ERR_UNKNOWN_OBJECT_TYPE: 4203,    // Unknown object type
    ERR_NO_OBJECT_NAME: 4204,    // No object name
    ERR_OBJECT_COORDINATES_ERROR: 4205,    // Object coordinates error
    ERR_NO_SPECIFIED_SUBWINDOW: 4206,    // No specified subwindow
    ERR_SOME_OBJECT_ERROR: 4207,    // Graphical object error
    ERR_CHART_PROP_INVALID: 4210, // Unknown chart property
    ERR_CHART_NOT_FOUND: 4211, // Chart not found
    ERR_CHARTWINDOW_NOT_FOUND: 4212, // Chart subwindow not found
    ERR_CHARTINDICATOR_NOT_FOUND: 4213,    // Chart indicator not found
    ERR_SYMBOL_SELECT: 4220,    // Symbol select error
    ERR_NOTIFICATION_ERROR: 4250,    // Notification error
    ERR_NOTIFICATION_PARAMETER: 4251,    // Notification parameter error
    ERR_NOTIFICATION_SETTINGS: 4252,     // Notifications disabled
    ERR_NOTIFICATION_TOO_FREQUENT: 4253,    // Notification send too frequent
    ERR_FTP_NOSERVER: 4260,    // FTP server is not specified
    ERR_FTP_NOLOGIN: 4261,    // FTP login is not specified
    ERR_FTP_CONNECT_FAILED: 4262,    // FTP connection failed
    ERR_FTP_CLOSED: 4263,    // FTP connection closed
    ERR_FTP_CHANGEDIR: 4264,    // FTP path not found on server
    ERR_FTP_FILE_ERROR: 4265,    // File not found in the MQL4\Files directory to send on FTP server
    ERR_FTP_ERROR: 4266,    // Common error during FTP data transmission
    ERR_FILE_TOO_MANY_OPENED: 5001,    // Too many opened files
    ERR_FILE_WRONG_FILENAME: 5002,    // Wrong file name
    ERR_FILE_TOO_LONG_FILENAME: 5003,    // Too long file name
    ERR_FILE_CANNOT_OPEN: 5004,    // Cannot open file
    ERR_FILE_BUFFER_ALLOCATION_ERROR: 5005,    // Text file buffer allocation error
    ERR_FILE_CANNOT_DELETE: 5006, // Cannot delete file
    ERR_FILE_INVALID_HANDLE: 5007, // Invalid file handle (file closed or was not opened)
    ERR_FILE_WRONG_HANDLE: 5008,    // Wrong file handle (handle index is out of handle table)
    ERR_FILE_NOT_TOWRITE: 5009,     // File must be opened with FILE_WRITE flag
    ERR_FILE_NOT_TOREAD: 5010, // File must be opened with FILE_READ flag
    ERR_FILE_NOT_BIN: 5011,    // File must be opened with FILE_BIN flag
    ERR_FILE_NOT_TXT: 5012,     // File must be opened with FILE_TXT flag
    ERR_FILE_NOT_TXTORCSV: 5013,    // File must be opened with FILE_TXT or FILE_CSV flag
    ERR_FILE_NOT_CSV: 5014,     // File must be opened with FILE_CSV flag
    ERR_FILE_READ_ERROR: 5015,    // File read error
    ERR_FILE_WRITE_ERROR: 5016,     // File write error
    ERR_FILE_BIN_STRINGSIZE: 5017,    // String size must be specified for binary file
    ERR_FILE_INCOMPATIBLE: 5018,     // Incompatible file (for string arrays-TXT, for others-BIN)
    ERR_FILE_IS_DIRECTORY: 5019,     // File is directory not file
    ERR_FILE_NOT_EXIST: 5020,    // File does not exist
    ERR_FILE_CANNOT_REWRITE: 5021, // File cannot be rewritten
    ERR_FILE_WRONG_DIRECTORYNAME: 5022, // Wrong directory name
    ERR_FILE_DIRECTORY_NOT_EXIST: 5023,       // Directory does not exist
    ERR_FILE_NOT_DIRECTORY: 5024,     // Specified file is not directory
    ERR_FILE_CANNOT_DELETE_DIRECTORY: 5025,    // Cannot delete directory
    ERR_FILE_CANNOT_CLEAN_DIRECTORY: 5026,    // Cannot clean directory
    ERR_FILE_ARRAYRESIZE_ERROR: 5027,    // Array resize error
    ERR_FILE_STRINGRESIZE_ERROR: 5028,    // String resize error
    ERR_FILE_STRUCT_WITH_OBJECTS: 5029,    // Structure contains strings or dynamic arrays
    ERR_WEBREQUEST_INVALID_ADDRESS: 5200,    // Invalid URL
    ERR_WEBREQUEST_CONNECT_FAILED: 5201,    // Failed to connect to specified URL
    ERR_WEBREQUEST_TIMEOUT: 5202,    // Timeout exceeded
    ERR_WEBREQUEST_REQUEST_FAILED: 5203,    // HTTP request failed
    ERR_USER_ERROR_FIRST: 65536    // User defined errors start with this code
};

var program = {
    codepage: 0,
    program_type: -1,
    program_license: -1,
    dlls_allowed: 1,
    trade_allowed: 1,
    signals_allowed: 1,
    debug: 0,
    profiler: 0,
    tester: 0,
    optimization: 1,
    visual_mode: 0,
    frame_mode: 0,
    setCodepage: function(codepage) {
        this.codepage = codepage;
    },
    setProgramType: function(type) {
        this.program_type = type;
    },
    setDLLsAllowed: function(dlls_allowed) {
        this.dlls_allowed = dlls_allowed;
    },
    setTradeAllowed: function(trade_allowed) {
        this.trade_allowed = trade_allowed;
    },
    setSignalsAllowed: function(signals_allowed) {
        this.signals_allowed = signals_allowed;
    },
    setDebug: function(debug) {
        this.debug = debug;
    },
    setProfiler: function(profiler) {
        this.profiler = profiler;
    },
    setTester: function(tester) {
        this.tester = tester;
    },
    setOptimization: function(optimization) {
        this.optimization = optimization;
    },
    setVisualMode: function(visual_mode) {
        this.visual_mode = visual_mode;
    },
    setFrameMode: function(frame_mode) {
        this.frame_mode = frame_mode;
    },
    setProgramLicense: function(license) {
        this.program_license = license;
    }
};

var error = {
    last_code: 0,
    last_message: '',
    setCode: function(code) {
        this.last_code = code;
    },
    setMessage: function(message) {
        this.last_message = message;
    }
};

var systime = {
    start: 0,
    expert_start: 0,
    set: function(time) {
        this.start = time;
    },
    set_expert: function(time) {
        this.expert_start = time;
    }
};

var account = {
    number: '',
    context: null,
};

function setAccountContext(hostname,token,account_number) {
    account.context =  new Context(hostname,443,true,config.name);
    account.context.setToken(token);
    account.number = account_number;
}

function getAccountContext() {
    return account.context;
}

var ftpClient = {
    host: 'domain.com', // required
    username: 'Test', // Optional. Use empty username for anonymous access.
    password: 'Test', // Required if username is not empty, except when requiresPassword: false
    protocol: 'sftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
    // protocol is added on beginning of host, ex : sftp://domain.com in this case
    port: 22, // Optional
    // port is added to the end of the host, ex: sftp://domain.com:22 in this case
    escape: true, // optional, used for escaping shell characters (space, $, etc.), default: true
    retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
    timeout: 10, // Optional, Time before failing a connection attempt. Defaults to 10
    retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
    retryMultiplier: 1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
    requiresPassword: true, // Optional, defaults to true
    autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
    cwd: '', // Optional, defaults to the directory from where the script is executed
    additionalLftpCommands: '', // Additional commands to pass to lftp, splitted by ';'
    requireSSHKey:  true, //  Optional, defaults to false, This option for SFTP Protocol with ssh key authentication
    sshKeyPath: '/home1/phrasee/id_dsa', // Required if requireSSHKey: true , defaults to empty string, This option for SFTP Protocol with ssh key authentication
    sshKeyOptions: '', // ssh key options such as 'StrictHostKeyChecking=no'
    set: function(options) {
        this.host = options.host;
        this.username = options.username;
        this.password = options.password;
        this.protocol = options.protocol;
        this.port = options.port;
        this.escape = options.escape;
        this.retries = options.retries;
        this.timeout = options.timeout;
        this.retryInterval = options.retryInterval;
        this.retryMultiplier = options.retryMultiplier;
        this.requiresPassword = options.requiresPassword;
        this.autoConfirm = options.autoConfirm;
        this.cwd = options.cwd;
        this.additionalLftpCommands = options.additionalLftpCommands;
        this.requireSSHKey = options.requireSSHKey;
        this.sshKeyPath = options.sshKeyPath;
        this.sshKeyOptions = options.sshKeyOptions
    }
};

var twilio = {
    TWILIO_ACCOUNT_SID: '',
    TWILIO_AUTH_TOKEN: '',
    from: '',
    to: '',
    set: function(options) {
        this.TWILIO_ACCOUNT_SID = options.TWILIO_ACCOUNT_SID;
        this.TWILIO_AUTH_TOKEN = options.TWILIO_AUTH_TOKEN;
        this.from = options.from;
        this.to = options.to;
    }
};

var sendgrid = {
    SENDGRID_API_KEY: '',
    from: '',
    to: '',
    set: function(apiKey,from,to) {
        this.SENDGRID_API_KEY = apiKey;
        this.from = from;
        this.to = to;
    }
}

module.exports = {
    RUNTIME_ERROR,
    getAccountContext,
    setAccountContext,
    program,
    error,
    systime,
    account,
    ftpClient,
    twilio,
    sendgrid
};
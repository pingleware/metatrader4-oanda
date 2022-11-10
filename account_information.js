"use strict"

const {SendRequest} = require('./send');
var {account, program} = require('./account');

const ENUM_ACCOUNT_INFO_INTEGER = {
    ACCOUNT_LOGIN:              0, // Account number, long
    ACCOUNT_TRADE_MODE:         1, // Account trade mode, ENUM_ACCOUNT_TRADE_MODE
    ACCOUNT_LEVERAGE:           2, // Account leverage, long
    ACCOUNT_LIMIT_ORDERS:       3, // Maximum allowed number of open positions and active pending orders (in total), 0 — unlimited, int
    ACCOUNT_MARGIN_SO_MODE:     4, // Mode for setting the minimal allowed margin, ENUM_ACCOUNT_STOPOUT_MODE
    ACCOUNT_TRADE_ALLOWED:      5, // Allowed trade for the current account, bool
    ACCOUNT_TRADE_EXPERT:       6 // Allowed trade for an Expert Advisor, bool
};

const ENUM_ACCOUNT_INFO_DOUBLE = {
    ACCOUNT_BALANCE:            1,  // Account balance in the deposit currency, double
    ACCOUNT_CREDIT:             2,  // Account credit in the deposit currency, double
    ACCOUNT_PROFIT:             3,  // Current profit of an account in the deposit currency, double
    ACCOUNT_EQUITY:             4,  // Account equity in the deposit currency, double
    ACCOUNT_MARGIN:             5,  // Account margin used in the deposit currency, double
    ACCOUNT_MARGIN_FREE:        6,  // Free margin of an account in the deposit currency, double
    ACCOUNT_MARGIN_LEVEL:       7,  // Account margin level in percents, double
    ACCOUNT_MARGIN_SO_CALL:     8,  // Margin call level. Depending on the set ACCOUNT_MARGIN_SO_MODE is expressed in percents or in the deposit currency, double
    ACCOUNT_MARGIN_SO_SO:       9,  // Margin stop out level. Depending on the set ACCOUNT_MARGIN_SO_MODE is expressed in percents or in the deposit currency, double
    ACCOUNT_MARGIN_INITIAL:     10, // Not supported, double
    ACCOUNT_MARGIN_MAINTENANCE: 11, // Not supported, double
    ACCOUNT_ASSETS:             12, // Not supported, double
    ACCOUNT_LIABILITIES:        13, // Not supported, double
    ACCOUNT_COMMISSION_BLOCKED: 14, // Not supported, double    
};

const ENUM_ACCOUNT_INFO_STRING = {
    ACCOUNT_NAME:       0, // Client name, string
    ACCOUNT_SERVER:     1, // Trade server name, string
    ACCOUNT_CURRENCY:   2, // account currency, string
    ACCOUNT_COMPANY:    3, // Name of a company that serves the account, string
};

const ENUM_ACCOUNT_TRADE_MODE = {
    ACCOUNT_TRADE_MODE_DEMO:    0, // Demo account
    ACCOUNT_TRADE_MODE_CONTEST: 1, // Contest account
    ACCOUNT_TRADE_MODE_REAL:    2, // Real account
};

const ENUM_ACCOUNT_STOPOUT_MODE = {
    ACCOUNT_STOPOUT_MODE_PERCENT:   0, // Account stop out mode in percents
    ACCOUNT_STOPOUT_MODE_MONEY:     1, // Account stop out mode in money  
};

/**
 * AccountInfoDouble
 * Returns a value of double type of the corresponding account property
*/ 
function AccountInfoDouble(property_id, callback) {
    switch(property_id) {
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_BALANCE:
            AccountBalance(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_CREDIT:
            AccountCredit(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_PROFIT:
            AccountProfit(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_EQUITY:
            AccountEquity(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN:
            AccountMargin(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_FREE:
            AccountFreeMargin(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_LEVEL:
            AccountMargin(callback);
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_SO_CALL:    
            callback({status: 'error', message: 'not implemented', function: 'AccountInfoDouble'});
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_SO_SO:
            callback({status: 'error', message: 'not implemented', function: 'AccountInfoDouble'});
            break;
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_INITIAL:
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_MARGIN_MAINTENANCE:
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_ASSETS:
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_LIABILITIES:
        case ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_COMMISSION_BLOCKED:
        default:
            callback({status: 'error', message: 'not supported', function: 'AccountInfoDouble'});
            break;            
    }
}
/**
 * AccountInfoInteger
 * Returns a value of integer type (bool, int or long) of the corresponding account property
*/ 
function AccountInfoInteger(property_id, callback) {
    switch(property_id) {
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_LOGIN:
            AccountNumber(callback);
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_TRADE_MODE:
            var context = account.context;
            if (context.hostname.contains("practice")) {
                callback({status: 'success', trade_mode: ENUM_ACCOUNT_TRADE_MODE.ACCOUNT_TRADE_MODE_DEMO, function: 'AccountInfoInteger'});
            } else {
                callback({status: 'success', trade_mode: ENUM_ACCOUNT_TRADE_MODE.ACCOUNT_TRADE_MODE_REAL, function: 'AccountInfoInteger'});
            }
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_LEVERAGE:
            AccountLeverage(callback);
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_LIMIT_ORDERS: // Maximum allowed number of open positions and active pending orders (in total), 0 — unlimited
            callback({status: 'success', max_orders: Number(0), function: 'AccountInfoInteger'});
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_MARGIN_SO_MODE: // Mode for setting the minimal allowed margin
            callback({status: 'success', mode: ENUM_ACCOUNT_STOPOUT_MODE.ACCOUNT_STOPOUT_MODE_PERCENT, function: 'AccountInfoInteger'});
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_TRADE_ALLOWED:
            callback({status: 'success', allowed: program.trade_allowed, function: 'AccountInfoInteger'});
            break;
        case ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_TRADE_EXPERT:
            callback({status: 'success', allowed: program.expert_allowed, function: 'AccountInfoInteger'});
            break;
        default:        
            callback({status: 'error', message: 'not supported', property_id: property_id, function: 'AccountInfoInteger'});
            break;
    }
}
/**
 * AccountInfoString
 * Returns a value string type corresponding account property
*/ 
function AccountInfoString(property_id, callback) {
    switch(property_id) {
        case ENUM_ACCOUNT_INFO_STRING.ACCOUNT_NAME:
            AccountName(callback);
            break;
        case ENUM_ACCOUNT_INFO_STRING.ACCOUNT_SERVER:
            AccountServer(callback);
            break;
        case ENUM_ACCOUNT_INFO_STRING.ACCOUNT_CURRENCY:
            AccountCurrency(callback);
            break;
        case ENUM_ACCOUNT_INFO_STRING.ACCOUNT_COMPANY:
            AccountCompany(callback);
            break;
        default:
            callback({status: 'error', message: 'not supported', property_id: property_id, function: 'AccountInfoString'});
            break;
    }
}
/**
 * AccountBalance
 * Returns balance value of the current account
*/ 
function AccountBalance(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountBalance'});
        } else {
            callback({status: 'success', equity: Number(data.account.balance), function: 'AccountBalance'});
        }
    });
}
/**
 * AccountCredit
 * Returns credit value of the current account
*/ 
function AccountCredit(callback) {
    callback({status: 'success', credit: Number(0), function: 'AccountCredit'});
}
/**
 * AccountCompany
 * Returns the brokerage company name where the current account was registered
*/ 
function AccountCompany(callback) {
    callback({status: 'success', company: 'OANDA DIVISION1', function: 'AccountCompany'});
}
/**
 * AccountCurrency
 * Returns currency name of the current account
*/ 
function AccountCurrency(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountCurrency'});
        } else {
            callback({status: 'success', currency: data.account.currency, function: 'AccountCurrency'});
        }
    });
}
/**
 * AccountEquity
 * Returns equity value of the current account
*/ 
function AccountEquity(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountEquity'});
        } else {
            callback({status: 'success', equity: Number(data.account.NAV), function: 'AccountEquity'});
        }
    });
}
/**
 * AccountFreeMargin
 * Returns free margin value of the current account
 * 
 * Free Margin = Equity - Used Margin
 */ 
function AccountFreeMargin(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountFreeMargin'});
        } else {
            callback({status: 'success', freeMargin: Number(data.account.marginAvailable), function: 'AccountFreeMargin'});
        }
    });
}
/**
 * AccountFreeMarginCheck
 * Returns free margin that remains after the specified position has been opened at the current price on the current account
 * 
 * Free Margin = Equity - Used Margin
 * Required Margin = Notional Value x Margin Requirement (marginRate)
 * 
 */ 
function AccountFreeMarginCheck(symbol,cmd,volume,callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountFreeMargin'});
        } else {
            var requiredMargin = Number(volume * 100000) * Number(data.account.marginRate);
            var freeMargin = Number(data.account.NAV) - requiredMargin;
            callback({status: 'success', freeMargin: freeMargin, function: 'AccountFreeMarginCheck'});
        }
    });
}
/**
 * AccountFreeMarginMode
 * Calculation mode of free margin allowed to open orders on the current account
 * 
 * Returned value
 * --------------
 * Calculation mode of free margin allowed to opened orders on the current account. 
 * 
 * The calculation mode can take the following values:
 * 0 - floating profit/loss is not used for calculation;
 * 1 - both floating profit and loss on opened orders on the current account are used for free margin calculation;
 * 2 - only profit value is used for calculation, the current loss on opened orders is not considered;
 * 3 - only loss value is used for calculation, the current floating profit on opened orders is not considered.
*/ 
function AccountFreeMarginMode(callback) {
    callback({status: 'success', freeMarginMode: Number(1), function: 'AccountFreeMarginMode'});
}
/**
 * AccountLeverage
 * Returns leverage of the current account
 * 
 * Returns: Effective Leverage Ratio = Total trading position size/ Total Equity.
 * @see https://www.optioninvest.net/what-is-leverage-in-forex/
*/ 
function AccountLeverage(callback) {
    async() => {
        var context = account.context;
        SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
            var data = JSON.parse(json);
            if (data.errorMessage) {
                callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountLeverage'});
            } else {
                let leverage = Number(data.account.positionValue / data.account.NAV).toFixed(0);
                callback({status: 'success', leverage: leverage, function: 'AccountLeverage'});
            }
        });    
    }
}

/**
 * AccountMargin
 * Returns margin value of the current account
*/ 
function AccountMargin(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountMargin'});
        } else {
            callback({status: 'success', margin: Number(data.account.marginRate), function: 'AccountMargin'});
        }
    });
}
/**
 * AccountName
 * Returns the current account name
*/ 
function AccountName(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountName'});
        } else {
            callback({status: 'success', name: data.account.alias, function: 'AccountName'});
        }
    });
}
/**
 * AccountNumber
 * Returns the current MT4 account number, if exists?
 * returns { status: 'success', account_number: 8830743 }
 */ 
function AccountNumber(callback) {
    var context = account.context;
    SendRequest(context,'v3/accounts','GET',null,function(json){
        var data = JSON.parse(json);
        data.accounts.forEach(function(_account){
            if (_account.id == account.number) {
                if (_account.mt4AccountID != undefined) {
                    //console.log(_account.mt4AccountID);
                    callback({status: 'success', number: _account.mt4AccountID, function: 'AccountNumber'});
                    //return (_account.mt4AccountID);
                } else {
                    callback({status: 'error', message: "not found", function: 'AccountNumber'});
                }
            }
        });    
    });
}

/**
 * AccountProfit
 * Returns profit value of the current account
*/ 
function AccountProfit(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountProfit'});
        } else {
            callback({status: 'success', profit: Number(data.account.pl), function: 'AccountProfit'});
        }
    });
}
/**
 * AccountServer
 * Returns the connected server name
*/ 
function AccountServer(callback) {
    var context = account.context;
    callback({status: 'success', server: context.hostname, function: 'AccountServer'});
}
/**
 * AccountStopoutLevel
 * Returns the value of the Stop Out level
*/ 
function AccountStopoutLevel(callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'AccountStopoutLevel'});
        } else {
            let stopoutLevel = Number(data.account.marginCloseoutPercent * 100).toFixed(0);
            callback({status: 'success', stopoutLevel: stopoutLevel, function: 'AccountStopoutLevel'});
        }
    });
}
/**
 * AccountStopoutMode
 * Returns the calculation mode for the Stop Out level
 * 
 * Returned value
 * --------------
 * Returns the calculation mode for the Stop Out level. 
 * 
 * Calculation mode can take the following values:
 * 0 - calculation of percentage ratio between margin and equity;
 * 1 - comparison of the free margin level to the absolute value.
 */
function AccountStopoutMode(callback) {
    callback({status: 'success', stopoutMode: Number(0), function: 'AccountStopoutMode'});
}

module.exports = {
    ENUM_ACCOUNT_INFO_INTEGER,
    ENUM_ACCOUNT_INFO_DOUBLE,
    ENUM_ACCOUNT_INFO_STRING,
    ENUM_ACCOUNT_TRADE_MODE,
    ENUM_ACCOUNT_STOPOUT_MODE,
    AccountInfoDouble,
    AccountInfoInteger,
    AccountInfoString,
    AccountBalance,
    AccountCredit,
    AccountCompany,
    AccountCurrency,
    AccountEquity,
    AccountFreeMargin,
    AccountFreeMarginCheck,
    AccountFreeMarginMode,
    AccountLeverage,
    AccountMargin,
    AccountName,
    AccountNumber,
    AccountProfit,
    AccountServer,
    AccountStopoutLevel,
    AccountStopoutMode
};
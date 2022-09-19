"use strict"

const {SendRequest} = require('./send');
var account = require('./account');


const MARKETINFO_MODE = {
    MODE_LOW: 1,                    // Low day price
    MODE_HIGH: 2,                   // High day price
    MODE_TIME: 5,                   // The last incoming tick time (last known server time)
    MODE_BID: 9,                    // Last incoming bid price. For the current symbol, it is stored in the predefined variable Bid
    MODE_ASK: 10,                   // Last incoming ask price. For the current symbol, it is stored in the predefined variable Ask
    MODE_POINT: 11,                 // Point size in the quote currency. For the current symbol, it is stored in the predefined variable Point
    MODE_DIGITS: 12,                // Count of digits after decimal point in the symbol prices. For the current symbol, it is stored in the predefined variable Digits
    MODE_SPREAD: 13,                // Spread value in points
    MODE_STOPLEVEL: 14,             // Stop level in points. A zero value of MODE_STOPLEVEL means either absence of any restrictions on the minimal distance for Stop Loss/Take Profit or the fact that a trade server utilizes some external mechanisms for dynamic level control, which cannot be translated in the client terminal. In the second case, GetLastError() can return error 130, because MODE_STOPLEVEL is actually "floating" here.
    MODE_LOTSIZE: 15,               // Lot size in the base currency
    MODE_TICKVALUE: 16,             // Tick value in the deposit currency
    MODE_TICKSIZE: 17,              // Tick size in points
    MODE_SWAPLONG: 18,              // Swap of the buy order
    MODE_SWAPSHORT: 19,             // Swap of the sell order
    MODE_STARTING: 20,              // Market starting date (usually used for futures)
    MODE_EXPIRATION: 21,            // Market expiration date (usually used for futures)
    MODE_TRADEALLOWED: 22,          // Trade is allowed for the symbol
    MODE_MINLOT: 23,                // Minimum permitted amount of a lot
    MODE_LOTSTEP: 24,               // Step for changing lots
    MODE_MAXLOT: 25,                // Maximum permitted amount of a lot
    MODE_SWAPTYPE: 26,              // Swap calculation method. 0 - in points; 1 - in the symbol base currency; 2 - by interest; 3 - in the margin currency
    MODE_PROFITCALCMODE: 27,        // Profit calculation mode. 0 - Forex; 1 - CFD; 2 - Futures
    MODE_MARGINCALCMODE: 28,        // Margin calculation mode. 0 - Forex; 1 - CFD; 2 - Futures; 3 - CFD for indices
    MODE_MARGININIT: 29,            // Initial margin requirements for 1 lot
    MODE_MARGINMAINTENANCE: 30,     // Margin to maintain open orders calculated for 1 lot
    MODE_MARGINHEDGED: 31,          // Hedged margin calculated for 1 lot
    MODE_MARGINREQUIRED: 32,        // Free margin required to open 1 lot for buying   
    MODE_FREEZELEVEL: 33,
    MODE_CLOSEBY_ALLOWED: 34
}

const ENUM_SYMBOL_INFO_INTEGER = {
    SYMBOL_SELECT: 0,               // Symbol is selected in Market Watch. Some symbols can be hidden in Market Watch, but still they are considered as selected., bool
    SYMBOL_VISIBLE: 76,             // Symbol is visible in Market Watch. Some symbols (mostly, these are cross rates required for calculation of margin requirements or profits in deposit currency) are selected automatically, but generally are not visible in Market Watch. To be displayed such symbols have to be explicitly selected., bool
    SYMBOL_SESSION_DEALS: 56,       // Not supported, long
    SYMBOL_SESSION_BUY_ORDERS: 60,  // Not supported, long
    SYMBOL_SESSION_SELL_ORDERS: 61, // Not supported, long
    SYMBOL_VOLUME: 10,              // Not supported, long
    SYMBOL_VOLUMEHIGH: 11,          // Not supported, long
    SYMBOL_VOLUMELOW: 12,           // Not supported, long
    SYMBOL_TIME: 15,                // Time of the last quote, datetime
    SYMBOL_DIGITS: 17,              // Digits after a decimal point, int
    SYMBOL_SPREAD_FLOAT: 41,        // Indication of a floating spread, bool
    SYMBOL_SPREAD: 18,              // Spread value in points, int
    SYMBOL_TRADE_CALC_MODE: 29,     // Contract price calculation mode, int
    SYMBOL_TRADE_MODE: 30,          // Order execution type, ENUM_SYMBOL_TRADE_MODE
    SYMBOL_START_TIME: 51,          // Date of the symbol trade beginning (usually used for futures), datetime
    SYMBOL_EXPIRATION_TIME: 52,     // Date of the symbol trade end (usually used for futures), datetime
    SYMBOL_FILLING_MODE: 50,        // Not supported, int
    SYMBOL_EXPIRATION_MODE: 49,     // Not supported, int
    SYMBOL_SWAP_ROLLOVER3DAYS: 40,  // Day of week to charge 3 days swap rollover, ENUM_DAY_OF_WEEK
    SYMBOL_SWAP_MODE: 37,           // Swap calculation model, int
    SYMBOL_TRADE_EXEMODE: 33,       // Deal execution mode, ENUM_SYMBOL_TRADE_EXECUTION
    SYMBOL_TRADE_FREEZE_LEVEL: 32,  // Distance to freeze trade operations in points, int
    SYMBOL_TRADE_STOPS_LEVEL: 31,   // Minimal indention in points from the current close price to place Stop orders, int
    SYMBOL_ORDER_MODE: 71,          // Not supported, int
};

const ENUM_SYMBOL_INFO_DOUBLE = {
    SYMBOL_BID: 1,                          // Bid - best sell offer, double
    SYMBOL_BIDHIGH: 2,                      // Not supported, double
    SYMBOL_BIDLOW: 3,                       // Not supported, double
    SYMBOL_ASK: 4,                          // Ask - best buy offer, double
    SYMBOL_ASKHIGH: 5,                      // Not supported, double
    SYMBOL_ASKLOW: 6,                       // Not supported, double
    SYMBOL_LAST: 7,                         // Not supported, double
    SYMBOL_LASTHIGH: 8,                     // Not supported, double
    SYMBOL_LASTLOW: 9,                      // Not supported, double
    SYMBOL_POINT: 16,                       // Symbol point value, double
    SYMBOL_TRADE_TICK_VALUE: 26,            // Value of SYMBOL_TRADE_TICK_VALUE_PROFIT, double
    SYMBOL_TRADE_TICK_VALUE_PROFIT: 53,     // Not supported, double
    SYMBOL_TRADE_TICK_VALUE_LOSS: 54,       // Not supported, double
    SYMBOL_TRADE_TICK_SIZE: 27,             // Minimal price change, double
    SYMBOL_TRADE_CONTRACT_SIZE: 28,         // Trade contract size, double
    SYMBOL_VOLUME_MIN: 34,                  // Minimal volume for a deal, double
    SYMBOL_VOLUME_MAX: 35,                  // Maximal volume for a deal, double
    SYMBOL_VOLUME_STEP: 36,                 // Minimal volume change step for deal execution, double
    SYMBOL_VOLUME_LIMIT: 55,                // Not supported, double
    SYMBOL_SWAP_LONG: 38,                   // Buy order swap value, double
    SYMBOL_SWAP_SHORT: 39,                  // Sell order swap value, double
    SYMBOL_MARGIN_INITIAL: 42,              // Initial margin means the amount in the margin currency required for opening an order with the volume of one lot. It is used for checking a client's assets when he or she enters the market., double
    SYMBOL_MARGIN_MAINTENANCE: 43,          // The maintenance margin. If it is set, it sets the margin amount in the margin currency of the symbol, charged from one lot. It is used for checking a client's assets when his/her account state changes. If the maintenance margin is equal to 0, the initial margin is used., double
    SYMBOL_MARGIN_LONG: 44,                 // Not supported, double
    SYMBOL_MARGIN_SHORT: 45,                // Not supported, double
    SYMBOL_MARGIN_LIMIT: 46,                // Not supported, double
    SYMBOL_MARGIN_STOP: 47,                 // Not supported, double
    SYMBOL_MARGIN_STOPLIMIT: 48,            // Not supported, double
    SYMBOL_SESSION_VOLUME: 57,              // Not supported, double
    SYMBOL_SESSION_TURNOVER: 58,            // Not supported, double
    SYMBOL_SESSION_INTEREST: 59,            // Not supported, double
    SYMBOL_SESSION_BUY_ORDERS_VOLUME: 61,   // Not supported, double
    SYMBOL_SESSION_SELL_ORDERS_VOLUME: 63,  // Not supported, double
    SYMBOL_SESSION_OPEN: 64,                // Not supported, double
    SYMBOL_SESSION_CLOSE: 65,               // Not supported, double
    SYMBOL_SESSION_AW: 66,                  // Not supported, double
    SYMBOL_SESSION_PRICE_SETTLEMENT: 67,    // Not supported, double
    SYMBOL_SESSION_PRICE_LIMIT_MIN: 68,     // Not supported, double
    SYMBOL_SESSION_PRICE_LIMIT_MAX : 69,    // Not supported, double
};

const ENUM_SYMBOL_INFO_STRING = {
    SYMBOL_CURRENCY_BASE: 22,    // Basic currency of a symbol, string
    SYMBOL_CURRENCY_PROFIT: 23,  // Profit currency, string
    SYMBOL_CURRENCY_MARGIN: 24,  // Margin currency, string
    SYMBOL_DESCRIPTION: 20,      // Symbol description, string
    SYMBOL_PATH: 21,             // Path in the symbol tree, string
};

const ENUM_SYMBOL_TRADE_MODE = {
    SYMBOL_TRADE_MODE_DISABLED: 0,  // Trade is disabled for the symbol
    SYMBOL_TRADE_MODE_LONGONLY: 3,  // Allowed only long positions
    SYMBOL_TRADE_MODE_SHORTONLY: 4, // Allowed only short positions
    SYMBOL_TRADE_MODE_CLOSEONLY: 1, // Allowed only position close operations
    SYMBOL_TRADE_MODE_FULL: 2,      // No trade restrictions
};

const ENUM_SYMBOL_TRADE_EXECUTION = {
    SYMBOL_TRADE_EXECUTION_REQUEST:     0,  // Execution by request
    SYMBOL_TRADE_EXECUTION_INSTANT:     1,  // Instant execution
    SYMBOL_TRADE_EXECUTION_MARKET:      2,  // Market execution
    SYMBOL_TRADE_EXECUTION_EXCHANGE:    3   // Exchange execution
};

const ENUM_DAY_OF_WEEK = {
    SUNDAY:     0, 
    MONDAY:     1,
    TUESDAY:    2,
    WEDNESDAY:  3,
    THURSDAY:   4,
    FRIDAY:     5,
    SATURDAY:   6
};

function datetime(value) {
    return new Date(value).getTime();
}


/**
 * MarketInfo
 * Returns various data about securities listed in the "Market Watch" window
 */
function MarketInfo(symbol, information_type, callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'MarketInfo'});
        } else {
            var instruments = data.instruments;
            instruments.forEach(function(instrument){
                if (instrument.name == symbol) {
                    switch(information_type) {
                        case MARKETINFO_MODE.MODE_LOW:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_HIGH:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_TIME:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_BID:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_ASK:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_POINT:
                            callback({status: 'success', point: Number(instrument.displayPrecision), function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_DIGITS:
                            callback({status: 'success', digits: Number(instrument.displayPrecision), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_SPREAD:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_STOPLEVEL:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_LOTSIZE:
                            callback({status: 'success', lotsize: Number(instrument.commission.unitsTraded), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_TICKVALUE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_TICKSIZE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_SWAPLONG:
                            callback({status: 'success', swaplong: Number(instrument.financing.longRate), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_SWAPSHORT:
                            callback({status: 'success', swapshort: Number(instrument.financing.shortRate), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_STARTING:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_EXPIRATION:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_TRADEALLOWED:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MINLOT:
                            callback({status: 'success', minlot: Number(instrument.minimumTradeSize), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_LOTSTEP:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MAXLOT:
                            callback({status: 'success', maxlot: Number(instrument.maximumOrderUnits), function: 'MarketInfo'});
                        case MARKETINFO_MODE.MODE_SWAPTYPE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_PROFITCALCMODE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MARGINCALCMODE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MARGININIT:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MARGINMAINTENANCE:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MARGINHEDGED:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_MARGINREQUIRED:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_FREEZELEVEL:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        case MARKETINFO_MODE.MODE_CLOSEBY_ALLOWED:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                            break;
                        default:
                            callback({ststus: 'error', message: 'not implemented', function: 'MarketInfo'});
                    }
                }
            });
        }
    });
}
 
var MerketWatch = [];

/**
 * SymbolsTotal
 * Returns the number of available (selected in Market Watch or all) symbols
 */
function SymbolsTotal(selected, callback) {
    if (selected) {
        callback({status: 'success', total: MarketWatch.length, function: 'SymbolsTotal'});
    } else {
        var context = account.context;
        SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
            var data = JSON.parse(json);
            if (data.errorMessage) {
                callback({status: 'error', message: data.errorMessage, function: 'SymbolsTotal'});
            } else {
                var instruments = data.instruments;
                callback({status: 'success', total: instruments.length, function: 'SymbolsTotal'});
            }
        });    
    }
}
 
/**
 * SymbolName
 * Returns the name of a specified symbol
 */
function SymbolName(pos,selected,callback) {
    if (selected) {
        try {
            var symbol = MarketWatch[pos];
            callback({status: 'success', name: symbol, function: 'SymbolName'});    
        } catch(error) {
            callback({status: 'error', message: error, function: 'SymbolName'});
        }
    } else {
        var context = account.context;
        SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
            var data = JSON.parse(json);
            if (data.errorMessage) {
                callback({status: 'error', message: data.errorMessage, function: 'SymbolName'});
            } else {
                try {
                    var symbol = data.instruments[pos].name;
                    callback({status: 'success', name: symbol, function: 'SymbolName'});    
                } catch(error) {
                    callback({status: 'error', message: error, function: 'SymbolName'});
                }
            }
        });    
    }
}
 
/**
 * SymbolSelect
 * Selects a symbol in the Market Watch window or removes a symbol from the window
 */
function SymbolSelect(symbol,add_remove,callback) {
    if (add_remove) {
        MarketWatch.push(symbol);
    } else {
        MarketWatch.pop(symbol);
    }
    callback({status: 'success', symbol: symbol, added: add_remove, function: 'SymbolSelect'});
}
 
/**
 * SymbolInfoDouble
 * Returns the double value of the symbol for the corresponding property
 */
function SymbolInfoDouble(symbol, property_id, callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, function: 'SymbolInfoDouble'});
        } else {
            var instruments = data.instruments;
            instruments.forEach(function(instrument){
                if (instrument.name == symbol) {
                    switch(property_id) {
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_BID: //1,                          // Bid - best sell offer, double
                            callback({status: 'success', bid: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_BIDHIGH: //2,                      // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_BIDLOW: //3,                       // Not supported, double
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_ASK: //4,                          // Ask - best buy offer, double
                            callback({status: 'success', ask: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_ASKHIGH: //5,                      // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_ASKLOW: //6,                       // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_LAST: //7,                         // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_LASTHIGH: //8,                     // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_LASTLOW: //9,                      // Not supported, double
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_POINT: //16,                       // Symbol point value, double
                            callback({status: 'success', point: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_TRADE_TICK_VALUE: //26,            // Value of SYMBOL_TRADE_TICK_VALUE_PROFIT, double
                            callback({status: 'success', tick_value: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_TRADE_TICK_VALUE_PROFIT: //53,     // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_TRADE_TICK_VALUE_LOSS: //54,       // Not supported, double
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_TRADE_TICK_SIZE: //27,             // Minimal price change, double
                            callback({status: 'success', tick_size: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_TRADE_CONTRACT_SIZE: //28,         // Trade contract size, double
                            callback({status: 'success', contract_size: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_VOLUME_MIN: //34,                  // Minimal volume for a deal, double
                            callback({status: 'success', volume_min: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_VOLUME_MAX: //35,                  // Maximal volume for a deal, double
                            callback({status: 'success', volume_max: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_VOLUME_STEP: //36,                 // Minimal volume change step for deal execution, double
                            callback({status: 'success', volume_step: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_VOLUME_LIMIT: //55,                // Not supported, double
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SWAP_LONG: //38,                   // Buy order swap value, double
                            callback({status: 'success', swap_long: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SWAP_SHORT: //39,                  // Sell order swap value, double
                            callback({status: 'success', swap_short: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_INITIAL: //42,              // Initial margin means the amount in the margin currency required for opening an order with the volume of one lot. It is used for checking a client's assets when he or she enters the market., double
                            callback({status: 'success', margin_initial: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_MAINTENANCE: //43,          // The maintenance margin. If it is set, it sets the margin amount in the margin currency of the symbol, charged from one lot. It is used for checking a client's assets when his/her account state changes. If the maintenance margin is equal to 0, the initial margin is used., double
                            callback({status: 'success', margin_maintenance: 0, function: 'SymbolInfoDouble'});
                            break;
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_LONG: //44,                 // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_SHORT: //45,                // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_LIMIT: //46,                // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_STOP: //47,                 // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_MARGIN_STOPLIMIT: //48,            // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_VOLUME: //57,              // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_TURNOVER: //58,            // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_INTEREST: //59,            // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_BUY_ORDERS_VOLUME: //61,   // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_SELL_ORDERS_VOLUME: //63,  // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_OPEN: //64,                // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_CLOSE: //65,               // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_AW: //66,                  // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_PRICE_SETTLEMENT: //67,    // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_PRICE_LIMIT_MIN: //68,     // Not supported, double
                        case ENUM_SYMBOL_INFO_DOUBLE.SYMBOL_SESSION_PRICE_LIMIT_MAX : //69,    // Not supported, double                    
                        default:
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoDouble'});
                            break;
                    }
                }
            });
        }
    });

}
 
/**
 * SymbolInfoInteger
 * Returns a value of an integer type (long, datetime, int or bool) of a specified symbol for the corresponding property
 */
function SymbolInfoInteger(symbol, property_id, callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, function: 'SymbolInfoInteger'});
        } else {
            var instruments = data.instruments;
            instruments.forEach(function(instrument){
                if (instrument.name == symbol) {
                    switch(property_id) {
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SELECT: //0,               // Symbol is selected in Market Watch. Some symbols can be hidden in Market Watch, but still they are considered as selected., bool
                            callback({status: 'success', symbol_select: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_VISIBLE: //76,             // Symbol is visible in Market Watch. Some symbols (mostly, these are cross rates required for calculation of margin requirements or profits in deposit currency) are selected automatically, but generally are not visible in Market Watch. To be displayed such symbols have to be explicitly selected., bool
                            callback({status: 'success', symbol_visible: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SESSION_DEALS: //56,       // Not supported, long
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SESSION_BUY_ORDERS: //60,  // Not supported, long
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SESSION_SELL_ORDERS: //61, // Not supported, long
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_VOLUME: //10,              // Not supported, long
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_VOLUMEHIGH: //11,          // Not supported, long
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_VOLUMELOW: //12,           // Not supported, long
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TIME: //15,                // Time of the last quote, datetime
                            callback({status: 'success', symbol_time: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_DIGITS: //17,              // Digits after a decimal point, int
                            callback({status: 'success', symbol_digits: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SPREAD_FLOAT: //41,        // Indication of a floating spread, bool
                            callback({status: 'success', symbol_spread_float: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SPREAD: //18,              // Spread value in points, int
                            callback({status: 'success', symbol_spread: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TRADE_CALC_MODE: //29,     // Contract price calculation mode, int
                            callback({status: 'success', symbol_trade_calc_mode: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TRADE_MODE: //30,          // Order execution type, ENUM_SYMBOL_TRADE_MODE
                            callback({status: 'success', symbol_trade_mode: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_START_TIME: //51,          // Date of the symbol trade beginning (usually used for futures), datetime
                            callback({status: 'success', symbol_start_time: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_EXPIRATION_TIME: //52,     // Date of the symbol trade end (usually used for futures), datetime
                            callback({status: 'success', symbol_expiration_time: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_FILLING_MODE: //50,        // Not supported, int
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_EXPIRATION_MODE: //49,     // Not supported, int
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SWAP_ROLLOVER3DAYS: //40,  // Day of week to charge 3 days swap rollover, ENUM_DAY_OF_WEEK
                            callback({status: 'success', symbol_swap_rollover3days: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_SWAP_MODE: //37,           // Swap calculation model, int
                            callback({status: 'success', symbol_swap_mode: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TRADE_EXEMODE: //33,       // Deal execution mode, ENUM_SYMBOL_TRADE_EXECUTION
                            callback({status: 'success', symbol_trade_exemode: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TRADE_FREEZE_LEVEL: //32,  // Distance to freeze trade operations in points, int
                            callback({status: 'success', symbol_trade_freeze_level: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_TRADE_STOPS_LEVEL: //31,   // Minimal indention in points from the current close price to place Stop orders, int
                            callback({status: 'success', symbol_trade_stops_level: 0, function: 'SymbolInfoInteger'});
                            break;
                        case ENUM_SYMBOL_INFO_INTEGER.SYMBOL_ORDER_MODE: //71,          // Not supported, int      
                        default:
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoInteger'});
                            break;              
                    }
                }
            });
        }
    });
}
 
/**
 * SymbolInfoString
 * Returns a value of the string type of a specified symbol for the corresponding property
 */
function SymbolInfoString(symbol, property_id, callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/instruments`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, function: 'SymbolInfoString'});
        } else {
            var instruments = data.instruments;
            instruments.forEach(function(instrument){
                if (instrument.name == symbol) {
                    switch(property_id) {
                        case ENUM_SYMBOL_INFO_STRING.SYMBOL_CURRENCY_BASE: //22,    // Basic currency of a symbol, string
                            callback({status: 'success', currency_base: '', function: 'SymbolInfoString'});
                            break;
                        case ENUM_SYMBOL_INFO_STRING.SYMBOL_CURRENCY_PROFIT: //23,  // Profit currency, string
                            callback({status: 'success', currency_profit: '', function: 'SymbolInfoString'});
                            break;
                        case ENUM_SYMBOL_INFO_STRING.SYMBOL_CURRENCY_MARGIN: //24,  // Margin currency, string
                            callback({status: 'success', currency_margin: '', function: 'SymbolInfoString'});
                            break;
                        case ENUM_SYMBOL_INFO_STRING.SYMBOL_DESCRIPTION: //20,      // Symbol description, string
                            callback({status: 'success', description: '', function: 'SymbolInfoString'});   
                            break;
                        case ENUM_SYMBOL_INFO_STRING.SYMBOL_PATH: //21,             // Path in the symbol tree, string                    
                            callback({status: 'success', path: '', function: 'SymbolInfoString'});
                            break;
                        default:
                            callback({status: 'error', message: 'not supported', function: 'SymbolInfoString'});
                            break;
                    }
                }
            });
        }
    });
}
 
/**
 * SymbolInfoTick
 * Returns the current prices for the specified symbol in a variable of the MqlTick type
 */
function SymbolInfoTick(symbol, callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/pricing?instruments=${symbol}`,'GET',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/`, function: 'SymbolInfoTick'});
        } else {
            var MqlTick = { 
                time: data.time,                    // Time of the last prices update 
                bid: data.prices[0].bids[0].price,  // Current Bid price 
                ask: data.prices[0].asks[0].price,  // Current Ask price 
                last: data.prices[0].closeoutBid,   // Price of the last deal (Last) 
                volume: 0                           // Volume for the current Last price 
            };
             
            callback({status: 'success', mqltikc: MqlTick, function: 'SymbolInfoTick'});
        }
    });
}
 
/**
 * SymbolInfoSessionQuote
 * Allows receiving time of beginning and end of the specified quoting sessions for a specified symbol and day of week.
 */
function SymbolInfoSessionQuote(symbol,day_of_week,session_index,from,to,callback) {
    callback({status: 'error', message: 'not implemented', function: 'SymbolInfoSessionQuote'});
}
 
/**
 * SymbolInfoSessionTrade 
 * Allows receiving time of beginning and end of the specified trading sessions for a specified symbol and day of week
 */
function SymbolInfoSessionTrade(symbol,day_of_week,session_index,from,to,callback) {
    callback({status: 'error', message: 'not implemented', function: 'SymbolInfoSessionTrade'});
} 

module.exports = {
    MARKETINFO_MODE,
    ENUM_SYMBOL_INFO_INTEGER,
    ENUM_SYMBOL_INFO_DOUBLE,
    ENUM_SYMBOL_INFO_STRING,
    ENUM_SYMBOL_TRADE_MODE,
    ENUM_SYMBOL_TRADE_EXECUTION,
    ENUM_DAY_OF_WEEK,
    MarketWatch,
    MarketInfo,
    SymbolsTotal,
    SymbolName,
    SymbolSelect,
    SymbolInfoDouble,
    SymbolInfoInteger,
    SymbolInfoString,
    SymbolInfoTick,
    SymbolInfoSessionQuote,
    SymbolInfoSessionTrade
}
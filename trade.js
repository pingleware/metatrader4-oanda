"use strict"

const {SendRequest} = require('./send');
var { account } = require("./account");

const TRADE_OP = {
    OP_BUY:         0,  // Buy operation
    OP_SELL:        1,  // Sell operation
    OP_BUYLIMIT:    2,  // Buy limit pending order
    OP_SELLLIMIT:   3,  // Sell limit pending order
    OP_BUYSTOP:     4,  // Buy stop pending order
    OP_SELLSTOP:    5   // Sell stop pending order
    
}

/**
OrderClose
Closes opened order
*/ 
function OrderClose(callback) {}
/**
OrderCloseBy
Closes an opened order by another opposite opened order
*/ 
function OrderCloseBy(callback) {}

/**
OrderClosePrice
Returns close price of the currently selected order
*/ 
function OrderClosePrice(callback) {}
/**
OrderCloseTime
Returns close time of the currently selected order
*/ 
function OrderCloseTime(callback) {}
/**
OrderComment
Returns comment of the currently selected order
*/ 
function OrderComment(callback) {}
/**
OrderCommission
Returns calculated commission of the currently selected order
*/ 
function OrderCommission(callback) {}
/**
OrderDelete
Deletes previously opened pending order
*/ 
function OrderDelete(callback) {}
/**
OrderExpiration
Returns expiration date of the selected pending order
*/ 
function OrderExpiration(callback) {}
/**
OrderLots
Returns amount of lots of the selected order
*/ 
function OrderLots(callback) {}
/**
OrderMagicNumber
Returns an identifying (magic) number of the currently selected order
*/ 
function OrderMagicNumber(callback) {}
/**
OrderModify
Modification of characteristics of the previously opened or pending orders
*/ 
function OrderModify(callback) {}
/**
OrderOpenPrice
Returns open price of the currently selected order
*/ 
function OrderOpenPrice(callback) {}
/**
OrderOpenTime
Returns open time of the currently selected order
*/ 
function OrderOpenTime(callback) {}
/**
OrderPrint
Prints information about the selected order in the log
*/ 
function OrderPrint(callback) {}
/**
OrderProfit
Returns profit of the currently selected order
*/ 
function OrderProfit(callback) {}
/**
OrderSelect
The function selects an order for further processing
*/ 
function OrderSelect(callback) {}
/**
OrderSend
The main function used to open an order or place a pending order
*/ 
/**
 * 
 * @param {string} symbol 
 * @param {int} cmd 
 * @param {double} volume will range from 0.01 to 100 and automatically take the product of 100000 units per 0.01 lot
 * @param {double} price 
 * @param {int} slippage 
 * @param {doule} stoploss 
 * @param {double} takeprofit 
 * @param {string} comment 
 * @param {int} magic 
 * @param {datetime} expiration 
 * @param {int} arrow_color ignored parameter
 * @param {address} callback 
 */
function OrderSend(symbol,cmd,volume,price,slippage,stoploss,takeprofit,comment=null,magic=0,expiration=0,arrow_color=0,callback) {
    var context = account.context;
    let lots = volume;
    if (cmd == TRADE_OP.OP_BUY || cmd == TRADE_OP.OP_BUYLIMIT || cmd == TRADE_OP.OP_BUYSTOP) {
        lots = Number(volume) * 100000;
    } else if (cmd == TRADE_OP.OP_SELL || cmd == TRADE_OP.OP_SELLLIMIT || cmd == TRADE_OP.OP_SELLSTOP) {
        lots = Number(volume) * -100000;
    }
    var body = {};
    if (takeprofit > 0) {
        body['order']['takeProfitOnFill'] = {
            "price": takeprofit,
            "timeInForce": "GTC"
        }
    }
    if (stoploss > 0) {
        body['order']['stopLossOnFill'] = {
            "price": stoploss,
            "timeInForce": "GTC"
        }
    }

    if (cmd == TRADE_OP.OP_BUY || cmd == TRADE_OP.OP_SELL) {
        let slippage_price = price;
        if (slippage > 0) {
            // calculate the maximum slippage (bound) price for either a BUY or SELL market order
        }    
        body['order'] = {
            "units": '"' + lots + '"',
            "instrument": symbol,
            "priceBound": slippage_price,        // The worst price that the client is willing to have the Market Order filled at
            "timeInForce": "FOK",
            "type": "MARKET",
            "positionFill": "DEFAULT",
            "clientExtensions": {
                "comment": comment,
                "tag": magic
            }
        };        
    } else if (cmd == TRADE_OP.OP_BUYLIMIT || cmd == TRADE_OP.OP_SELLLIMIT) {
        /**
         * A LimitOrder is an order that is created with a price threshold, and will only be filled by a price that is equal to or better than the threshold.
         */
        body['order'] = {
            "units": '"' + lots + '"',
            "instrument": symbol,
            "timeInForce": "GTC",
            "type": "LIMIT",
            "price": price,
            "positionFill": "DEFAULT",
            "clientExtensions": {
                "comment": comment,
                "tag": magic
            }            
        };
        if (expiration > 0) {
            body['order']['timeInForce'] = "GTD";
            body['order']['gtdTime'] = expiration;
        }    
    } else if (cmd == TRADE_OP.OP_BUYSTOP || cmd == TRADE_OP.OP_SELLSTOP) {
        /**
         * A StopOrder is an order that is created with a price threshold, and will only be filled by a price that is equal to or worse than the threshold.
         */
        body['order'] = {
            "units": '"' + lots + '"',
            "instrument": symbol,
            "timeInForce": "GTC",
            "type": "STOP",
            "price": price,
            "positionFill": "DEFAULT",
            "clientExtensions": {
                "comment": comment,
                "tag": magic
            }            
        };
        if (expiration > 0) {
            body['order']['timeInForce'] = "GTD";
            body['order']['gtdTime'] = expiration;
        }    
    }
    SendRequest(context,`v3/accounts/${account.number}/orders`,'POST',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/orders`});
        } else {
            if (data.orderCancelTransaction) {
                callback({status: 'error', message: data.orderCancelTransaction.reason})
            } else {
                callback({status: 'success', ticket: data.orderFillTransaction.id, data: data, function: 'OrderSend'});
            }
        }
    });
}
/**
OrdersHistoryTotal
Returns the number of closed orders in the account history loaded into the terminal
*/ 
function OrdersHistoryTotal(callback) {
    var context = account.context;
    var body = null;
    SendRequest(context,`v3/accounts/${account.number}/trades?state=CLOSED`,'GET',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/trades?state=CLOSED`});
        } else {
            callback({status: 'success', total: data.trades.length, function: 'OrderHistoryTotal'});
        }
    });
}
/**
OrderStopLoss
Returns stop loss value of the currently selected order
*/ 
function OrderStopLoss(callback) {}
/**
OrdersTotal
Returns the number of market and pending orders
*/ 
function OrdersTotal(callback) {}
/**
OrderSwap
Returns swap value of the currently selected order
*/ 
function OrderSwap(callback) {}
/**
OrderSymbol
Returns symbol name of the currently selected order
*/ 
function OrderSymbol(callback) {}
/**
OrderTakeProfit
Returns take profit value of the currently selected order
*/ 
function OrderTakeProfit(callback) {}
/**
OrderTicket
Returns ticket number of the currently selected order
*/ 
function OrderTicket(callback) {}
/**
OrderType
Returns order operation type of the currently selected order
*/ 
function OrderType(callback) {}

module.exports = {
    TRADE_OP,
    OrderClose,
    OrderCloseBy,
    OrderClosePrice,
    OrderCloseTime,
    OrderComment,
    OrderCommission,
    OrderDelete,
    OrderExpiration,
    OrderLots,
    OrderMagicNumber,
    OrderModify,
    OrderOpenPrice,
    OrderOpenTime,
    OrderPrint,
    OrderProfit,
    OrderSelect,
    OrderSend,
    OrdersHistoryTotal,
    OrderStopLoss,
    OrdersTotal,
    OrderSwap,
    OrderSymbol,
    OrderTakeProfit,
    OrderTicket,
    OrderType
};
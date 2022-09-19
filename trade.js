"use strict"

const {SendRequest} = require('./send');
var { account } = require("./account");
const { StopOrder } = require('@oanda/v20/order');

const TRADE_OP = {
    OP_BUY:         0,  // Buy operation
    OP_SELL:        1,  // Sell operation
    OP_BUYLIMIT:    2,  // Buy limit pending order
    OP_SELLLIMIT:   3,  // Sell limit pending order
    OP_BUYSTOP:     4,  // Buy stop pending order
    OP_SELLSTOP:    5   // Sell stop pending order
    
};

const ENUM_ORDER_POOL_INDEX = {
    MODE_TRADES:    0,  // order selected from trading pool(opened and pending orders)
    MODE_HISTORY:   1   // order selected from history pool (closed and canceled order)
};

const ENUM_ORDER_SELECT_FLAGS = {
    SELECT_BY_POS:      0, // index in the order pool, 
    SELECT_BY_TICKET:   1  // index is order ticket.
};

var selectedOrder = null;

/**
 * OrderClose
 * Closes opened order
 * 
 * @param {int} ticket Trade specifier
 * @param {string} lots lots to close or ALL
 * @param {double} price IGNORED
 * @param {int} slippage IGNORED
 * @param {int} arrow_color IGNORED
 * @param {address} callback callback function
*/ 
function OrderClose(ticket,lots,price,slippage,arrow_color,callback) {
    var context = account.context;
    var body = JSON.stringify({"units": `${lots}`});
    SendRequest(context,`v3/accounts/${account.number}/trades/${ticket}/close`,'PUT',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/trades/${ticket}/close`});
        } else {
            if (data.orderCancelTransaction) {
                callback({status: 'error', message: data.orderCancelTransaction.reason})
            } else {
                callback({status: 'success', data: data, function: 'OrderClose'});
            }
        }
    });

}
/**
 * OrderCloseBy
 * Closes an opened order by another opposite opened order
*/ 
function OrderCloseBy(ticket,takeprofit,stoploss,trailingstop,callback) {
    var context = account.context;
    var body = {};
    if (takeprofit > 0) {
        body['takeProfit']['price'] = takeprofit;
    }
    if (stoploss > 0) {
        body['stopLoss']['price'] = stoploss;
    }
    if (trailingstop > 0) {
        body['trailingStopLoss']['price'] = trailingstop;
    }
    body = JSON.stringify(body);
    SendRequest(context,`v3/accounts/${account.number}/trade/${ticket}/orders`,'PUT',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/trades/${ticket}/close`, function: 'OrderCloseBy'});
        } else {
            SendRequest(context,`v3/accounts/${account.number}/trade/${ticket}/close`,'PUT',null,function(json){
                var data = JSON.parse(json);
                if (data.errorMessage) {
                } else {
                    callback({status: 'success', order: data, function: 'OrderCloseBy'});
                }
            });
        }
    });
}

/**
 * OrderClosePrice
 * Returns close price of the currently selected order
*/ 
function OrderClosePrice(callback) {
    if (selectedOrder) {
        callback({status: 'success', closePrice: selectedOrder.averageClosePrice, function: 'OrderClosePrice'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderClosePrice'});
    }
}
/**
 * OrderCloseTime
 * Returns close time of the currently selected order
*/ 
function OrderCloseTime(callback) {
    if (selectedOrder) {
        callback({status: 'success', closeTime: selectedOrder.closeTime, function: 'OrderCloseTime'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderCloseTime'});
    }
}
/**
 * OrderComment
 * Returns comment of the currently selected order
*/ 
function OrderComment(callback) {
    if (selectedOrder) {
        callback({status: 'success', comment: selectedOrder.clientExtensions.comment, function: 'OrderComment'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderComment'});
    }
}
/**
 * OrderCommission
 * Returns calculated commission of the currently selected order
*/ 
function OrderCommission(callback) {
    if (selectedOrder) {
        callback({status: 'success', commission: selectedOrder.financing, function: 'OrderCommission'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderCommission'});
    }
}
/**
 * OrderDelete
 * Deletes previously opened pending order
*/ 
function OrderDelete(ticket,arrow_color,callback) {
    var context = account.context;
    SendRequest(context,`v3/accounts/${account.number}/orders/${ticket}/cancel`,'PUT',null,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/trades/${ticket}/close`, function: 'OrderDelete'});
        } else {
            callback({status: 'success', order: data, function: 'OrderDelete'});
        }
    });
}
/**
 * OrderExpiration
 * Returns expiration date of the selected pending order
*/ 
function OrderExpiration(callback) {
    if (selectedOrder) {
        callback({status: 'success', expiration: selectedOrder.gtdTime, function: 'OrderExpiration'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderExpiration'});
    }
}
/**
 * OrderLots
 * Returns amount of lots of the selected order
*/ 
function OrderLots(callback) {
    if (selectedOrder) {
        callback({status: 'success', lots: Number(Math.abs(selectedOrder.initialUnits) / 100000).toFixed(2), function: 'OrderLots'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderLots'});
    }
}
/**
 * OrderMagicNumber
 * Returns an identifying (magic) number of the currently selected order
*/ 
function OrderMagicNumber(callback) {
    if (selectedOrder) {
        callback({status: 'success', magicNumber: selectedOrder.clientExtensions.tag, function: 'OrderMagicNumber'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderMagicNumber'});
    }
}
/**
 * OrderModify
 * Modification of characteristics of the previously opened or pending orders
 * 
 * @param {int} ticket trade id for market, limit/stop, take profit or stop loss order
 * @param {double} price trade price (no change for market, new price for limit/stop)
 * @param {double} stoploss updated stop loss
 * @param {double} takeprofit update take profit
 * @param {string} expiration expiration change for limit/stop order
 * @param {double} trailingstop the trailing stop distance
 * @param {address} callback callback function
 * 
 * 1. query ticket no to check if market or pending order?
 * 2. if market order, then only stop loss or take profit may be changed|added|delete
 * 3. if pending order, then price, stop loss, take profit and expiration may be changed
 */
function OrderModify(ticket,price,stoploss,takeprofit,expiration,trailingstop,callback) {
    var account = context.account;
    var path = `v3/accounts/${account.number}/orders/${ticket}`;
    SendRequest(context,path,'GET',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: path});
        } else {
            if (data.errorCode == "NO_SUCH_ORDER") {
                path = `v3/accounts/${account.number}/trades/${ticket}`;
                SendRequest(context,path,'GET',body,function(json){
                    var data = JSON.parse(json);
                    if (data.errorMessage) {
                        callback({status: 'error', message: data.errorMessage, path: path});
                    } else {
                        if (data.trade.state == "OPEN") {
                            var body =  {
                                            order: { 
                                                instrument: data.trade.instrument,
                                                tradeID: data.trade.id
                                            }
                                        };
                            if (takeprofit > 0 && data.trade.takeProfitOrder.id) {
                                // modify existing take profit
                                body['order']['takeProfitOnFill']["price"] = takeprofit;
                                body['order']['takeProfitOnFill']["timeInForce"] = "GTC";                        
                            } else if (takeprofit > 0) {
                                // add new take profit order
                                body['order']['takeProfitOnFill']["price"] = takeprofit;
                                body['order']['takeProfitOnFill']["timeInForce"] = "GTC";                        
                            }
                            if (stoploss > 0 && data.trade.stopLossOrder.id) {
                                // modify exiting stop loss 
                                body['order']['stopLossOnFill']["price"] = stoploss;
                                body['order']['stopLossOnFill']["timeInForce"] = "GTC";
                            } else if (stoploss > 0) {
                                // add new stop loss order
                                body['order']['stopLossOnFill']["price"] = stoploss;
                                body['order']['stopLossOnFill']["timeInForce"] = "GTC";
                            }
                            if (trailingstop > 0 && data.trade.trailingStopOrder.id) {
                                // modify existing trailing stop order
                                body['order']['trailingStopLossOnFill']["timeInForce"] = "GTC";
                                body['order']['trailingStopLossOnFill']["distance"] = trailingstop;        
                            } else if (trailingstop > 0) {
                                // add new trailing stop order
                                body['order']['trailingStopLossOnFill']["timeInForce"] = "GTC";
                                body['order']['trailingStopLossOnFill']["distance"] = trailingstop;        
                            }
                            if (body) {
                                path = `v3/accounts/${account.number}/orders/${ticket}`;

                                callback({status: 'success', profit: profit, function: 'OrderModify'});
    
                            }
                        } else {
                            callback({status: 'error', message: 'trade is not open', path: path});
                        }
                    }
                });
            } else {
                var body = {order: data.order};
                if (data.order.state == "PENDING") {
                    if (price > 0) {
                        // modify pending order price
                        body['order']['price'] = price;
                    }
                    if (takeprofit > 0) {
                        // add new take profit order
                        body['order']['takeProfitOnFill']["price"] = takeprofit;
                        body['order']['takeProfitOnFill']["timeInForce"] = "GTC";                
                    }
                    if (stoploss > 0) {
                        // add new stop loss order
                        body['order']['stopLossOnFill']["price"] = stoploss;
                        body['order']['stopLossOnFill']["timeInForce"] = "GTC";
                    }
                    if (trailingstop > 0) {
                        // add new trailing stop order
                        body['order']['trailingStopLossOnFill']["timeInForce"] = "GTC";
                        body['order']['trailingStopLossOnFill']["distance"] = trailingstop;
                    }
                    if (expiration) {
                        body["order"]["timeInForce"] = "GTD";
                        body["order"]["gtdTime"] = expiration;
                    }
                } else {
                    // can only modify the take profit, stop loss and trailing stop
                    if (takeprofit > 0) {
                        // add new take profit order
                        body['order']['takeProfitOnFill']["price"] = takeprofit;
                        body['order']['takeProfitOnFill']["timeInForce"] = "GTC";                
                    }
                    if (stoploss > 0) {
                        // add new stop loss order
                        body['order']['stopLossOnFill']["price"] = stoploss;
                        body['order']['stopLossOnFill']["timeInForce"] = "GTC";
                    }
                    if (trailingstop > 0) {
                        // add new trailing stop order
                        body['order']['trailingStopLossOnFill']["timeInForce"] = "GTC";
                        body['order']['trailingStopLossOnFill']["distance"] = trailingstop;
                    }
                }
                path = `v3/accounts/${account.number}/orders/${ticket}`;
                SendRequest(context,path,'GET',JSON.stringify(body),function(json){
                    var data = JSON.parse(json);
                    if (data.errorMessage) {
                        callback({status: 'error', message: data.errorMessage, path: path});
                    } else {
                        callback({status: 'success', data: data, function: 'OrderModify'});
                    }
                });
            }
        }
    });

}
/**
 * OrderOpenPrice
 * Returns open price of the currently selected order
*/ 
function OrderOpenPrice(callback) {
    if (selectedOrder) {
        callback({status: 'success', price: selectedOrder.price, function: 'OrderOpenPrice'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderOpenPrice'});
    }
}
/**
 * OrderOpenTime
 * Returns open time of the currently selected order
*/ 
function OrderOpenTime(callback) {
    if (selectedOrder) {
        callback({status: 'success', openTime: selectedOrder.openTime, function: 'OrderOpenTime'});
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderOpenTime'});
    }
}
/**
 * OrderPrint
 * Prints information about the selected order in the log
 * 
 * Prints information about the selected order in the log in the following format:
 * 
 * #ticket number; open time; trade operation; amount of lots; symbol; open price; Stop Loss; Take Profit; close time; 
 * close price; commission; swap; profit; comment; magic number; pending order expiration date.
*/ 
function OrderPrint(callback) {
    if (selectedOrder) {
        callback({
                    status: 'success', 
                    function: 'OrderPrint', 
                    ticket: selectedOrder.id,
                    openTime: selectedOrder.openTime,
                    tradeOp: (selectedOrder.initialUnits < 0 ? 'OP_SELL' : 'OP_BUY'),
                    lots: Number(Math.abs(selectedOrder.initialUnits) / 100000).toFixed(2),
                    symbol: selectedOrder.instrument,
                    price: selectedOrder.price,
                    stopLoss: selectedOrder.stopLossOrder.price,
                    takeProfit: selectedOrder.takeProfitOrder.price,
                    closeTime: 0,
                    closePrice: 0,
                    commission: 0,
                    swap: 0,
                    profit: selectedOrder.realizedPL,
                    comment: selectedOrder.clientExtensions.comment,
                    magicNumber: selectedOrder.clientExtensions.tag,
                    expiration: selectedOrder.gtdTime
                });
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderPrint'});
    }
}
/**
 * OrderProfit
 * Returns profit of the currently selected order
*/ 
function OrderProfit(callback) {
    if (selectedOrder) {
        var context = account.context;
        var path = `v3/accounts/${account.number}/trades/${selectedOrder.id}`;
        SendRequest(context,path,'GET',body,function(json){
            var data = JSON.parse(json);
            if (data.errorMessage) {
                callback({status: 'error', message: data.errorMessage, path: path});
            } else {
                let profit = Number(data.trade.realizedPL);
                if (data.trades.state == "OPEN") {
                    profit = Number(data.trade.unrealizedPL);
                }
                callback({status: 'success', profit: profit, function: 'OrderProfit'});
            }
        });
    } else {
        callback({status: 'error', message: 'no order selected', function: 'OrderProfit'});
    }
}
/**
 * OrderSelect
 * The function selects an order for further processing
*/ 
function OrderSelect(index,select,pool,callback) {
    var context = account.context;
    var path = '';
    if (pool == ENUM_ORDER_POOL_INDEX.MODE_TRADES) {
        path = `v3/accounts/${account.number}/openTrades`; 
    } else if (pool == ENUM_ORDER_POOL_INDEX.MODE_HISTORY) {
        path = `v3/accounts/${account.number}/trades?state=CLOSED`;
    }
    SendRequest(context,path,'GET',body,function(json){
        var data = JSON.parse(json);
        if (data.errorMessage) {
            callback({status: 'error', message: data.errorMessage, path: path});
        } else {
            if (select == ENUM_ORDER_SELECT_FLAGS.SELECT_BY_POS) {
                selectedOrder = data.trades[index];             
            } else if (select == ENUM_ORDER_SELECT_FLAGS.SELECT_BY_TICKET) {
                data.trades.forEach(function(trade){
                    if (trade['id'] == index) {
                        selectedOrder = trade;
                    }
                });
            }
            if (selectedOrder) {
                callback({status: 'success', trade: selectedOrder, function: 'OrderSelect'});
            } else {
                callback({status: 'error', message: 'no order found'});
            }
        }
    });
}
/**
 * OrderSend
 * The main function used to open an order or place a pending order
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
 * @param {int} trailingstop trailing stop distance
 * @param {string} comment 
 * @param {int} magic 
 * @param {datetime} expiration 
 * @param {address} callback 
 */
function OrderSend(symbol,cmd,volume,price,slippage,stoploss,takeprofit,trailingstop,comment=null,magic=0,expiration=0,callback) {
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
    if (trailingstop > 0) {
        body['order']['trailingStopLossOnFill'] = {
            "timeInForce": "GTC",
            "distance": trailingstop
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
 * OrdersHistoryTotal
 * Returns the number of closed orders in the account history loaded into the terminal
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
 * OrderStopLoss
 * Returns stop loss value of the currently selected order
*/ 
function OrderStopLoss(callback) {
    if (selectedOrder) {
        callback({status: 'success', symbol: selectedOrder.stopLossOrder.price, function: ' OrderStopLoss'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderStopLoss'});
    }
}
/**
 * OrdersTotal
 * Returns the number of market and pending orders
*/ 
function OrdersTotal(callback) {
    callback({status: 'success', total: selectedOrder.length, function: 'OrdersTotal'});
}
/**
 * OrderSwap
 * Returns swap value of the currently selected order
*/ 
function OrderSwap(callback) {
    if (selectedOrder) {
        callback({status: 'success', symbol: selectedOrder.financing, function: 'OrderSwap'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderSwap'});
    }
}
/**
 * OrderSymbol
 * Returns symbol name of the currently selected order
*/ 
function OrderSymbol(callback) {
    if (selectedOrder) {
        callback({status: 'success', symbol: selectedOrder.instrument, function: 'OrderSymbol'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderSymbol'});
    }
}
/**
 * OrderTakeProfit
 * Returns take profit value of the currently selected order
*/ 
function OrderTakeProfit(callback) {
    if (selectedOrder) {
        callback({status: 'success', symbol: selectedOrder.takeProfitOrder.price, function: 'OrderTakeProfit'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderTakeProfit'});
    }
}
/**
 * OrderTicket
 * Returns ticket number of the currently selected order
*/ 
function OrderTicket(callback) {
    if (selectedOrder) {
        callback({status: 'success', ticket: selectedOrder.id, function: 'OrderTicket'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderTicket'});
    }
}
/**
 * OrderType
 * Returns order operation type of the currently selected order
*/ 
function OrderType(callback) {
    if (selectedOrder) {
        var state = selectedOrder.state;
        if (state != "LIMIT" && state != "STOP") {
            state = "";
        }
        callback({status: 'success', symbol: (selectedOrder.initialUnits < 0 ? `OP_SELL${state}` : `OP_BUY${state}`), function: 'OrderType'});
    } else {
        callback({status: 'error', message: 'no selected order', function: 'OrderType'});
    }
}

module.exports = {
    TRADE_OP,
    ENUM_ORDER_POOL_INDEX,
    ENUM_ORDER_SELECT_FLAGS,
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
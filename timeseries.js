"use strict"

const {SendRequest} = require('./send');

const ENUM_TIMEFRAMES = {
    PERIOD_CURRENT: 0,      // Current timeframe
    PERIOD_S5:      5/60,   // 1 second
    PERIOD_S10:     10/60,  // 10 seconds
    PERIOD_S15:     15/60,  // 15 seconds
    PERIOD_S30:     30/60,  // 30 seconds
    PERIOD_M1:      1,      // 1 minute
    PERIOD_M2:      2,      // 2 minutes
    PERIOD_M4:      4,      // 4 minutes
    PERIOD_M5:      5,      // 5 minutes
    PERIOD_M15:     15,     // 15 minutes
    PERIOD_M30:     30,     // 30 minutes
    PERIOD_H1:      60,     // 1 hour
    PERIOD_H3:      180,    // 3 hours
    PERIOD_H4:      240,    // 4 hours
    PERIOD_H6:      360,    // 6 hours
    PERIOD_H12:     720,    // 12 hours
    PERIOD_D1:      1440,   // 1 day
    PERIOD_W1:      10080,  // 1 week
    PERIOD_MN1:     43200   // 1 month
};

const ENUM_SERIES_INFO_INTEGER = {
    SERIES_BARS_COUNT:          0,  // Bars count for the symbol-period for the current moment, long
    SERIES_FIRSTDATE:           1,  // The very first date for the symbol-period for the current moment, datetime
    SERIES_LASTBAR_DATE:        5,  // Open time of the last bar of the symbol-period, datetime
    SERIES_SERVER_FIRSTDATE:    2   // The very first date in the history of the symbol on the server regardless of the timeframe, datetime
};

const ENUM_SERIESMODE = {

    MODE_OPEN:      0,  // Open price
    MODE_LOW:       1,  //Low price
    MODE_HIGH:      2,  // High price
    MODE_CLOSE:     3,  // Close price
    MODE_VOLUME:    4,  // Volume, used in iLowest() and iHighest() functions
    MODE_TIME:      5   // Bar open time, used in ArrayCopySeries() function
};

var current_symbol = null;
var current_timeframe = null;
var current_rates = {};

var MqlRates = { 
    time: 0,         // Period start time, datetime 
    open: 0,         // Open price, double   
    high: 0,         // The highest price of the period, double
    low: 0.00,       // The lowest price of the period, double
    close: 0.00,     // Close price, double
    tick_volume: 0,  // Tick volume, long
    spread: 0,       // Spread, int
    real_volume: 0   // Trade volume , long
 };
 
/**
 * SeriesInfoInteger
 * Returns information about the state of historical data
*/ 
function SeriesInfoInteger(symbol,timeframe,property_id,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    SeriesInfoInteger(symbol,timeframe,property_id,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        switch(property_id) {
            case ENUM_SERIES_INFO_INTEGER.SERIES_BARS_COUNT:
                callback({status: 'success', total: current_rates.length});
                break;
            case ENUM_SERIES_INFO_INTEGER.SERIES_FIRSTDATE:
                callback({status: 'success', firstdate: current_rates[0].time});
                break;
            case ENUM_SERIES_INFO_INTEGER.SERIES_LASTBAR_DATE:
                callback({status: 'success', lastbar_date: current_rates[current_rates.length - 1].time});
                break;
            case ENUM_SERIES_INFO_INTEGER.SERIES_SERVER_FIRSTDATE:
                callback({status: 'success', firstdate: current_rates[0].time});
                break;
            default:
                callback({status: 'error', message: 'mismatch input'});
        }
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * RefreshRates
 * Refreshing of data in pre-defined variables and series arrays
*/ 
function RefreshRates(callback){
    if (current_symbol && current_timeframe) {
        var context = account.context;
        var granularity = 'D';
        switch(current_timeframe) {
            case ENUM_TIMEFRAMES.PERIOD_S5:
                granularity = 'S5';
                break;
            case ENUM_TIMEFRAMES.PERIOD_S10:
                granularity = 'S10';
                break;
            case ENUM_TIMEFRAMES.PERIOD_S15:
                granularity = 'S15';
                break;
            case ENUM_TIMEFRAMES.PERIOD_S30:
                granularity = 'S30';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M1:
                granularity = 'M1';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M2:
                granularity = 'M2';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M4:
                granularity = 'M4';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M5:
                granularity = 'M5';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M15:
                granularity = 'M15';
                break;
            case ENUM_TIMEFRAMES.PERIOD_M30:
                granularity = 'M30';
                break;
            case ENUM_TIMEFRAMES.PERIOD_H1:
                granularity = 'H1';
                break;
            case ENUM_TIMEFRAMES.PERIOD_H3:
                granularity = 'H3';
                break;
            case ENUM_TIMEFRAMES.PERIOD_H4:
                granularity = 'H4';
                break;
            case ENUM_TIMEFRAMES.PERIOD_H6:
                granularity = 'H6';
                break;
            case ENUM_TIMEFRAMES.PERIOD_H12:
                granularity = 'H12';
                break;
            case ENUM_TIMEFRAMES.PERIOD_D1:
                granularity = 'D';
                break;
            case ENUM_TIMEFRAMES.PERIOD_W1:
                granularity = 'W';
                break;
            case ENUM_TIMEFRAMES.PERIOD_MN1:
                granularity = 'M';
                break;
            default:
                granularity = 'D';
                break;
        }
        SendRequest(context,`v3/accounts/${account.number}/candles/latest?instrument=${current_symbol}&granularity=${granularity}`,'GET',null,function(json){
            var data = JSON.parse(json);
            if (data.errorMessage) {
                callback({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/candles/latest?instrument=${current_symbol}&granularity=${granularity}`});
            } else {
                if (data.candles) {
                    current_rates = {};
                    data.candles.forEach(function(candle){
                        if (candle.complete) {
                            MqlRates.time = candle.time;
                            MqlRates.real_volume = candle.volume;
                            MqlRates.tick_volume = candle.volume;
                            MqlRates.high = candle.mid.h;
                            MqlRates.low = candle.mid.l;
                            MqlRates.open = candle.mid.o;
                            MqlRates.close = candle.mid.c;
                            MqlRates.spread = 0;
                            current_rates.push(MqlRates);
                        }
                    });
                    callback({status: 'success', rates: current_rates, function: 'RefreshRates'});
                } else {
                    callback({status: 'error', message: 'no candles'});
                }
            }
        });
    } else {
        callback({status: 'error', message: 'no active symbol'});
    }
}
/**
 * CopyRates
 * Gets history data of the Rates structure for a specified symbol and period into an array
*/ 
function CopyRatesFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyRatesFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && rates.length < count) {
                rates.push(current_rate);
            }
        });
        callback({status: 'success', rates: rates});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyRatesFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyRatesFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && rates.length < count) {
                rates.push(current_rate);
            }
        });
        callback({status: 'success', rates: rates});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyRatesBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyRatesBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                rates.push(current_rate);
            }
        });
        callback({status: 'success', rates: rates});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyTime
 * Gets history data on bar opening time for a specified symbol and period into an array
*/ 
function CopyTimeFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTimeFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var time_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && time_array.length < count) {
                time_array.push(current_rate.time);
            }
        });
        callback({status: 'success', time: time_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyTimeFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTimeFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var time_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && time_array.length < count) {
                time_array.push(current_rate.time);
            }
        });
        callback({status: 'success', time: time_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyTimeBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTimeBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var time_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                time_array.push(current_rate.time);
            }
        });
        callback({status: 'success', time: time_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyOpen
 * Gets history data on bar opening price for a specified symbol and period into an array
*/ 
function CopyOpenFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyOpenFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var open_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && open_array.length < count) {
                open_array.push(current_rate.open);
            }
        });
        callback({status: 'success', open: open_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyOpenFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyOpenFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var open_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && open_array.length < count) {
                open_array.push(current_rate.open);
            }
        });
        callback({status: 'success', open: open_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyOpenBetween(symbol,timeframe,start_time,end_timecallback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyOpenBetween(symbol,timeframe,start_time,end_timecallback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var open_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                open_array.push(current_rate.open);
            }
        });
        callback({status: 'success', open: open_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyHigh
 * Gets history data on maximal bar price for a specified symbol and period into an array
*/ 
function CopyHighFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyHighFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var high_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && high_array.length < count) {
                high_array.push(current_rate.high);
            }
        });
        callback({status: 'success', high: high_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyHighFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyHighFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var high_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && high_array.length < count) {
                high_array.push(current_rate.high);
            }
        });
        callback({status: 'success', high: high_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyHighBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyHighBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var high_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                high_array.push(current_rate.high);
            }
        });
        callback({status: 'success', high: high_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyLow
 * Gets history data on minimal bar price for a specified symbol and period into an array
*/ 
function CopyLowFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyLowFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var low_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && low_array.length < count) {
                low_array.push(current_rate.low);
            }
        });
        callback({status: 'success', low: low_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyLowFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyLowFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var low_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && low_array.length < count) {
                low_array.push(current_rate.low);
            }
        });
        callback({status: 'success', low: low_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyLowBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyLowBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var low_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                low_array.push(current_rate.low);
            }
        });
        callback({status: 'success', low: low_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyClose
 * Gets history data on bar closing price for a specified symbol and period into an array
*/ 
function CopyCloseFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyCloseFromStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var close_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && close_array.length < count) {
                close_array.push(current_rate.close);
            }
        });
        callback({status: 'success', close: close_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyCloseFromDate(symbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyCloseFromDate(symbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var close_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && close_array.length < count) {
                close_array.push(current_rate.close);
            }
        });
        callback({status: 'success', close: close_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyCloseBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyCloseBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var close_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                close_array.push(current_rate.close);
            }
        });
        callback({status: 'success', close: close_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * CopyTickVolume
 * Gets history data on tick volumes for a specified symbol and period into an array
*/ 
function CopyTickVolumeFromStart(symbol,timeframe,pos,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTickVolumeStart(symbol,timeframe,pos,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var tick_volume_array = [];
        current_rates.forEach(function(current_rate,index){
            if (index >= pos && tick_volume_array.length < count) {
                tick_volume_array.push(current_rate.tick_volume);
            }
        });
        callback({status: 'success', tick_volume: tick_volume_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyTickVolumeFromDate(csymbol,timeframe,start_time,count,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTickVolumeFrom(csymbol,timeframe,start_time,count,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var tick_volume_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && tick_volume_array.length < count) {
                tick_volume_array.push(current_rate.tick_volume);
            }
        });
        callback({status: 'success', tick_volume: tick_volume_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function CopyTickVolumeBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    CopyTickVolumeBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var tick_volume_array = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                tick_volume_array.push(current_rate.tick_volume);
            }
        });
        callback({status: 'success', tick_volume: tick_volume_array});    
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * Bars
 * Returns the number of bars count in the history for a specified symbol and period
*/ 
function Bars(symbol,timeframe,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    Bars(symbol,timeframe,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        callback({status: 'success', bars: current_rates.length});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
function BarsBetween(symbol,timeframe,start_time,end_time,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    BarsBetween(symbol,timeframe,start_time,end_time,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate){
            if (current_rate.time >= start_time && current_rate.time < end_time) {
                rates.push(current_rate);
            }
        });
        callback({status: 'success', bars: rates.length});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iBars
 * Returns the number of bars on the specified chart
*/ 
function iBars(symbol,timeframe,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iBars(symbol,timeframe,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        callback({status: 'success', bars: current_rates.length});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iBarShift
 * Returns the index of the bar which covers the specified time
*/ 
function iBarShift(symbol,timeframe,search_time,exact,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iBarShift(symbol,timeframe,search_time,exact,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        let found = -1;
        current_rates.forEach(function(current_rate, index){
            if (exact) {
                if (current_rate.time == search_time) {
                    found = index;
                }    
            } else {
                if (current_rate.time == search_time) {
                    found = index;
                } else {
                    let diff = Math.abs(new Date(current_rate.time).getTime() - search_time);
                    if (found == -1 || diff < found) {
                        found = index;
                    }
                }
            }
        });
        callback({status: 'success', bar: found});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iClose
 * Returns Close price value for the bar of specified symbol with timeframe and shift
*/ 
function iClose(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iClose(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var close = current_rates[shift].close;
        callback({status: 'success', close: close});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iHigh
 * Returns High price value for the bar of specified symbol with timeframe and shift
*/ 
function iHigh(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iHigh(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var high = current_rates[shift].high;
        callback({status: 'success', high: high});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iHighest
 * Returns the shift of the maximum value over a specific number of bars
*/ 
function iHighest(symbol,timeframe,seriesmode_type,count,start_pos,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iHighest(symbol,timeframe,seriesmode_type,count,start_pos,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate, index){
            if (index >= start_pos && rates.length < count) {
                switch(seriesmode_type) {
                    case ENUM_SERIESMODE.MODE_CLOSE:
                        rates.push(current_rate.close);
                        break;
                    case ENUM_SERIESMODE.MODE_HIGH:
                        rates.push(current_rate.high);
                        break;
                    case ENUM_SERIESMODE.MODE_LOW:
                        rates.push(current_rate.low);
                        break;
                    case ENUM_SERIESMODE.MODE_OPEN:
                        rates.push(current_rate.open);
                        break;
                    case ENUM_SERIESMODE.MODE_TIME:
                        rates.push(current_rate.time);
                        break;
                    case ENUM_SERIESMODE.MODE_VOLUME:
                        rates.push(current_rate.volume);
                        break;
                }        
            }
        });
        var highest = Math.max(rates);
        callback({status: 'success', highest: highest});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iLow
 * Returns Low price value for the bar of indicated symbol with timeframe and shift
*/ 
function iLow(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iLow(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var low = current_rates[shift].low;
        callback({status: 'success', low: low});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iLowest
 * Returns the shift of the lowest value over a specific number of bars
*/ 
function iLowest(symbol,timeframe,seriesmode_type,count,start_pos,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iLowest(symbol,timeframe,seriesmode_type,count,start_pos,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var rates = [];
        current_rates.forEach(function(current_rate, index){
            if (index >= start_pos && rates.length < count) {
                switch(seriesmode_type) {
                    case ENUM_SERIESMODE.MODE_CLOSE:
                        rates.push(current_rate.close);
                        break;
                    case ENUM_SERIESMODE.MODE_HIGH:
                        rates.push(current_rate.high);
                        break;
                    case ENUM_SERIESMODE.MODE_LOW:
                        rates.push(current_rate.low);
                        break;
                    case ENUM_SERIESMODE.MODE_OPEN:
                        rates.push(current_rate.open);
                        break;
                    case ENUM_SERIESMODE.MODE_TIME:
                        rates.push(current_rate.time);
                        break;
                    case ENUM_SERIESMODE.MODE_VOLUME:
                        rates.push(current_rate.volume);
                        break;
                }        
            }
        });
        var lowest = Math.min(rates);
        callback({status: 'success', lowest: lowest});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iOpen
 * Returns Open price value for the bar of specified symbol with timeframe and shift
*/ 
function iOpen(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iOpen(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var open = current_rates[shift].open;
        callback({status: 'success', open: open});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iTime
 * Returns time value for the bar of specified symbol with timeframe and shift
*/ 
function iTime(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iTime(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var time = current_rates[shift].time;
        callback({status: 'success', time: time});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}
/**
 * iVolume
 * Returns Tick Volume value for the bar of specified symbol with timeframe and shift
 */
function iVolume(symbol,timeframe,shift,callback){
    if (symbol != current_symbol || timeframe != current_timeframe) {
        current_symbol = symbol;
        current_timeframe = timeframe;
        RefreshRates(
            function(results){
                if (results.status == 'success') {
                    iVolume(symbol,timeframe,shift,callback);
                } else {
                    callback(results);
                }
            }
        );
    } else if (current_rates.length > 0) {
        var volume = current_rates[shift].volume;
        callback({status: 'success', volume: volume});
    } else {
        callback({status: 'error', message: 'missing rates'});
    }
}


module.exports = {
    ENUM_TIMEFRAMES,
    ENUM_SERIES_INFO_INTEGER,
    ENUM_SERIESMODE,
    SeriesInfoInteger,
    RefreshRates,
    CopyRatesFromStart,
    CopyRatesFromDate,
    CopyRatesBetween,
    CopyTimeFromStart,
    CopyTimeFromDate,
    CopyTimeBetween,
    CopyOpenFromStart,
    CopyOpenFromDate,
    CopyOpenBetween,
    CopyHighFromStart,
    CopyHighFromDate,
    CopyHighBetween,
    CopyLowFromStart,
    CopyLowFromDate,
    CopyLowBetween,
    CopyCloseFromStart,
    CopyCloseFromDate,
    CopyCloseBetween,
    CopyTickVolumeFromStart,
    CopyTickVolumeFromDate,
    CopyTickVolumeBetween,
    Bars,
    BarsBetween,
    iBars,
    iBarShift,
    iClose,
    iHigh,
    iHighest,
    iLow,
    iLowest,
    iOpen,
    iTime,
    iVolume
};
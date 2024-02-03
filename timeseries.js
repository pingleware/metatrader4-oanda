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

var {charts, account} = require('./account');

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
async function SeriesInfoInteger(symbol,timeframe,property_id) {
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            charts.rates = await RefreshRates();
        }
        try {
            switch(property_id) {
                case ENUM_SERIES_INFO_INTEGER.SERIES_BARS_COUNT:
                    resolve({status: 'success', total: charts.rates.length, function: 'SeriesInfoInteger'});
                    break;
                case ENUM_SERIES_INFO_INTEGER.SERIES_FIRSTDATE:
                    resolve({status: 'success', firstdate: charts.rates[0].time, function: 'SeriesInfoInteger'});
                    break;
                case ENUM_SERIES_INFO_INTEGER.SERIES_LASTBAR_DATE:
                    resolve({status: 'success', lastdate: charts.rates[charts.rates.length - 1].time, function: 'SeriesInfoInteger'});
                    break;
                case ENUM_SERIES_INFO_INTEGER.SERIES_SERVER_FIRSTDATE:
                    resolve({status: 'success', firstdate: charts.rates[0].time, function: 'SeriesInfoInteger'});
                    break;
                default:
                    reject({status: 'error', message: 'mismatch input', function: 'SeriesInfoInteger'});
            }    
        } catch(error) {
            reject({status: 'error', message: error, function: 'SeriesInfoInteger'});
        }
    })
}
/**
 * RefreshRates
 * Refreshing of data in pre-defined variables and series arrays
*/ 
async function RefreshRates() {
    return new Promise(async(resolve,reject) => {
        if (charts.symbol && charts.timeframe) {
            var context = account.context;
            var granularity = 'D';
            switch(charts.timeframe) {
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
            SendRequest(context,`v3/accounts/${account.number}/candles/latest?instrument=${charts.symbol}&granularity=${granularity}`,'GET',null,function(json){
                var data = JSON.parse(json);
                if (data.errorMessage) {
                    reject({status: 'error', message: data.errorMessage, path: `v3/accounts/${account.number}/candles/latest?instrument=${charts.symbol}&granularity=${granularity}`, function: 'RefreshRates'});
                } else {
                    if (data.candles) {
                        charts.rates = [];
                        data.candles.forEach(function(candle){
                            if (candle.complete) {
                                MqlRates = {};
                                MqlRates.time = candle.time;
                                MqlRates.real_volume = Number(candle.volume);
                                MqlRates.tick_volume = Number(candle.volume);
                                MqlRates.high = Number(candle.mid.h);
                                MqlRates.low = Number(candle.mid.l);
                                MqlRates.open = Number(candle.mid.o);
                                MqlRates.close = Number(candle.mid.c);
                                MqlRates.spread = 0;
                                charts.rates.push(MqlRates);
                            }
                        });
                        resolve({status: 'success', rates: charts.rates, function: 'RefreshRates'});
                    } else {
                        reject({status: 'error', message: 'no candles', function: 'RefreshRates'});
                    }
                }
            });
        } else {
            reject({status: 'error', message: 'no active symbol', function: 'RefreshRates'});
        }            
    })
}
/**
 * CopyRates
 * Gets history data of the Rates structure for a specified symbol and period into an array
*/ 
async function CopyRatesFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
                    if (results.status == 'success') {
                        resolve(await CopyRatesFromStart(symbol,timeframe,pos,count));
                    } else {
                        resolve(results); // already in the format os {status: 'error', message: '', function: ''}
                    }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && rates.length < count) {
                    rates.push(current_rate);
                }
            });
            resolve({status: 'success', rates: rates, function: 'CopyRatesFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyRatesFromStart'});
        }            
    })
}
async function CopyRatesFromDate(symbol,timeframe,start_time,count){
    return new Promise(async (resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyRatesFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && rates.length < count) {
                    rates.push(current_rate);
                }
            });
            resolve({status: 'success', rates: rates, function: 'CopyRatesFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyRatesFromDate'});
        }            
    })
}
async function CopyRatesBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyRatesBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && new Date(current_rate.time).getTime() < new Date(end_time).getTime()) {
                    rates.push(current_rate);
                }
            });
            resolve({status: 'success', rates: rates, function: 'CopyRatesBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyRatesBetween'});
        }            
    })
}
/**
 * CopyTime
 * Gets history data on bar opening time for a specified symbol and period into an array
*/ 
async function CopyTimeFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTimeFromStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var time_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && time_array.length < count) {
                    time_array.push(current_rate.time);
                }
            });
            resolve({status: 'success', time: time_array, function: 'CopyTimeFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTimeFromStart'});
        }            
    })
}
async function CopyTimeFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTimeFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var time_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && time_array.length < count) {
                    time_array.push(current_rate.time);
                }
            });
            resolve({status: 'success', time: time_array, function: 'CopyTimeFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTimeFromDate'});
        }            
    })
}
async function CopyTimeBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTimeBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var time_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && new Date(current_rate.time).getTime() < new Date(end_time).getTime()) {
                    time_array.push(Number(current_rate.time));
                }
            });
            resolve({status: 'success', time: time_array, function: 'CopyTimeBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTimeBetween'});
        }            
    })
}
/**
 * CopyOpen
 * Gets history data on bar opening price for a specified symbol and period into an array
*/ 
async function CopyOpenFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await CopyOpenFromStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var open_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && open_array.length < count) {
                    open_array.push(Number(current_rate.open));
                }
            });
            resolve({status: 'success', open: open_array, function: 'CopyOpenFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyOpenFromStart'});
        }            
    })
}
async function CopyOpenFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await CopyOpenFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var open_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && open_array.length < count) {
                    open_array.push(Number(current_rate.open));
                }
            });
            resolve({status: 'success', open: open_array, function: 'CopyOpenFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyOpenFromDate'});
        }            
    })
}
async function CopyOpenBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyOpenBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var open_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && new Date(current_rate.time).getTime() < new Date(end_time).getTime()) {
                    open_array.push(Number(current_rate.open));
                }
            });
            resolve({status: 'success', open: open_array, function: 'CopyOpenBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyOpenBetween'});
        }            
    })
}
/**
 * CopyHigh
 * Gets history data on maximal bar price for a specified symbol and period into an array
*/ 
async function CopyHighFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyHighFromStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var high_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && high_array.length < count) {
                    high_array.push(Number(current_rate.high));
                }
            });
            resolve({status: 'success', high: high_array, function: 'CopyHighFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyHighFromStart'});
        }            
    })
}
async function CopyHighFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyHighFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var high_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && high_array.length < count) {
                    high_array.push(Number(current_rate.high));
                }
            });
            resolve({status: 'success', high: high_array, function: 'CopyHighFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyHighFromDate'});
        }            
    })
}
async function CopyHighBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyHighBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var high_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && current_rate.time < end_time) {
                    high_array.push(Number(current_rate.high));
                }
            });
            resolve({status: 'success', high: high_array, function: 'CopyHighBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyHighBetween'});
        }            
    })
}
/**
 * CopyLow
 * Gets history data on minimal bar price for a specified symbol and period into an array
*/ 
async function CopyLowFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyLowFromStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var low_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && low_array.length < count) {
                    low_array.push(Number(current_rate.low));
                }
            });
            resolve({status: 'success', low: low_array, function: 'CopyLowFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyLowFromStart'});
        }            
    })
}
async function CopyLowFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyLowFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var low_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && low_array.length < count) {
                    low_array.push(Number(current_rate.low));
                }
            });
            resolve({status: 'success', low: low_array, function: 'CopyLowFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyLowFromDate'});
        }            
    })
}
async function CopyLowBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyLowBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var low_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && current_rate.time < end_time) {
                    low_array.push(current_rate.low);
                }
            });
            resolve({status: 'success', low: low_array, function: 'CopyLowBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyLowBetween'});
        }            
    })
}
/**
 * CopyClose
 * Gets history data on bar closing price for a specified symbol and period into an array
*/ 
async function CopyCloseFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyCloseFromStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var close_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && close_array.length < count) {
                    close_array.push(current_rate.close);
                }
            });
            resolve({status: 'success', close: close_array, function: 'CopyCloseFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyCloseFromStart'});
        }            
    })
}
async function CopyCloseFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyCloseFromDate(symbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var close_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && close_array.length < count) {
                    close_array.push(current_rate.close);
                }
            });
            resolve({status: 'success', close: close_array, function: 'CopyCloseFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyCloseFromDate'});
        }            
    })
}
async function CopyCloseBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyCloseBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var close_array = [];
            charts.rates.forEach(function(current_rate){
                if (current_rate.time >= start_time && current_rate.time < end_time) {
                    close_array.push(current_rate.close);
                }
            });
            resolve({status: 'success', close: close_array, function: 'CopyCloseBetween('});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyCloseBetween('});
        }            
    })
}
/**
 * CopyTickVolume
 * Gets history data on tick volumes for a specified symbol and period into an array
*/ 
async function CopyTickVolumeFromStart(symbol,timeframe,pos,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTickVolumeStart(symbol,timeframe,pos,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var tick_volume_array = [];
            charts.rates.forEach(function(current_rate,index){
                if (index >= pos && tick_volume_array.length < count) {
                    tick_volume_array.push(current_rate.tick_volume);
                }
            });
            resolve({status: 'success', tick_volume: tick_volume_array, function: 'CopyTickVolumeFromStart'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTickVolumeFromStart'});
        }            
    })
}
async function CopyTickVolumeFromDate(symbol,timeframe,start_time,count){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTickVolumeFrom(csymbol,timeframe,start_time,count));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var tick_volume_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && tick_volume_array.length < count) {
                    tick_volume_array.push(current_rate.tick_volume);
                }
            });
            resolve({status: 'success', tick_volume: tick_volume_array, function: 'CopyTickVolumeFromDate'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTickVolumeFromDate'});
        }            
    })
}
async function CopyTickVolumeBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await CopyTickVolumeBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var tick_volume_array = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && new Date(current_rate.time).getTime() < new Date(end_time).getTime()) {
                    tick_volume_array.push(current_rate.tick_volume);
                }
            });
            resolve({status: 'success', tick_volume: tick_volume_array, function: 'CopyTickVolumeBetween'});    
        } else {
            reject({status: 'error', message: 'missing rates', function: 'CopyTickVolumeBetween'});
        }            
    })
}
/**
 * Bars
 * Returns the number of bars count in the history for a specified symbol and period
*/ 
async function Bars(symbol,timeframe){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await Bars(symbol,timeframe));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            resolve({status: 'success', bars: charts.rates.length, function: 'Bars'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'Bars'});
        }            
    })
}
async function BarsBetween(symbol,timeframe,start_time,end_time){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await BarsBetween(symbol,timeframe,start_time,end_time));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate){
                if (new Date(current_rate.time).getTime() >= new Date(start_time).getTime() && new Date(current_rate.time).getTime() < new Date(end_time).getTime()) {
                    rates.push(current_rate);
                }
            });
            resolve({status: 'success', bars: rates.length, function: 'BarsBetween'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'BarsBetween'});
        }            
    })
}
/**
 * iBars
 * Returns the number of bars on the specified chart
*/ 
async function iBars(symbol,timeframe){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await iBars(symbol,timeframe));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            resolve({status: 'success', bars: charts.rates.length, function: 'iBars'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iBars'});
        }            
    })
}
/**
 * iBarShift
 * Returns the index of the bar which covers the specified time
*/ 
async function iBarShift(symbol,timeframe,search_time,exact){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await iBarShift(symbol,timeframe,search_time,exact));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            let found = -1;
            charts.rates.forEach(function(current_rate, index){
                if (exact) {
                    if (new Date(current_rate.time).getTime() == new Date(search_time).getTime()) {
                        found = index;
                    }    
                } else {
                    if (new Date(current_rate.time).getTime() >= new Date(search_time).getTime()) {
                        found = index;
                    } else {
                        let diff = Math.abs(new Date(current_rate.time).getTime() - new Date(search_time).getTime());
                        if (found == -1 || diff < found) {
                            found = index;
                        }
                    }
                }
            });
            resolve({status: 'success', bar: found, function: 'iBarShift'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iBarShift'});
        }            
    })
}
/**
 * iClose
 * Returns Close price value for the bar of specified symbol with timeframe and shift
*/ 
async function iClose(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await iClose(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var close = charts.rates[shift].close;
            resolve({status: 'success', close: Number(close), function: 'iClose'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iClose'});
        }            
    })
}
/**
 * iHigh
 * Returns High price value for the bar of specified symbol with timeframe and shift
*/ 
async function iHigh(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await iHigh(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var high = charts.rates[shift].high;
            resolve({status: 'success', high: Number(high), function: 'iHigh'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iHigh'});
        }            
    })
}
/**
 * iHighest
 * Returns the shift of the maximum value over a specific number of bars
*/ 
async function iHighest(symbol,timeframe,seriesmode_type,count,start_pos){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await iHighest(symbol,timeframe,seriesmode_type,count,start_pos));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate, index){
                if (index >= start_pos && rates.length < count) {
                    switch(seriesmode_type) {
                        case ENUM_SERIESMODE.MODE_CLOSE:
                            rates.push(Number(current_rate.close));
                            break;
                        case ENUM_SERIESMODE.MODE_HIGH:
                            rates.push(Number(current_rate.high));
                            break;
                        case ENUM_SERIESMODE.MODE_LOW:
                            rates.push(Number(current_rate.low));
                            break;
                        case ENUM_SERIESMODE.MODE_OPEN:
                            rates.push(Number(current_rate.open));
                            break;
                        case ENUM_SERIESMODE.MODE_TIME:
                            rates.push(new Date(current_rate.time).getTime());
                            break;
                        case ENUM_SERIESMODE.MODE_VOLUME:
                            rates.push(Number(current_rate.volume));
                            break;
                    }        
                }
            });
            var highest = rates[0];
            rates.forEach(function(rate){
                if (rate > highest) {
                    highest = rate;
                }
            })
            if (seriesmode_type == ENUM_SERIESMODE.MODE_TIME) {
                highest = new Date(highest).toISOString();
            }
            resolve({status: 'success', highest: highest, function: 'iHighest'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iHighest'});
        }            
    })
}
/**
 * iLow
 * Returns Low price value for the bar of indicated symbol with timeframe and shift
*/ 
async function iLow(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await iLow(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var low = charts.rates[shift].low;
            resolve({status: 'success', low: Number(low), function: 'iLow'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iLow'});
        }            
    })
}
/**
 * iLowest
 * Returns the shift of the lowest value over a specific number of bars
*/ 
async function iLowest(symbol,timeframe,seriesmode_type,count,start_pos){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();            
            if (results.status == 'success') {
                resolve(await iLowest(symbol,timeframe,seriesmode_type,count,start_pos));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var rates = [];
            charts.rates.forEach(function(current_rate, index){
                if (index >= start_pos && rates.length < count) {
                    switch(seriesmode_type) {
                        case ENUM_SERIESMODE.MODE_CLOSE:
                            rates.push(Number(current_rate.close));
                            break;
                        case ENUM_SERIESMODE.MODE_HIGH:
                            rates.push(Number(current_rate.high));
                            break;
                        case ENUM_SERIESMODE.MODE_LOW:
                            rates.push(Number(current_rate.low));
                            break;
                        case ENUM_SERIESMODE.MODE_OPEN:
                            rates.push(Number(current_rate.open));
                            break;
                        case ENUM_SERIESMODE.MODE_TIME:
                            rates.push(new Date(current_rate.time).getTime());
                            break;
                        case ENUM_SERIESMODE.MODE_VOLUME:
                            rates.push(Number(current_rate.real_volume));
                            break;
                    }        
                }
            });
            var lowest = rates[0];
            rates.forEach(function(rate){
                if (rate < lowest) {
                    lowest = rate;
                }
            })
            if (seriesmode_type == ENUM_SERIESMODE.MODE_TIME) {
                lowest = new Date(lowest).toISOString();
            }
            resolve({status: 'success', lowest: lowest, Function: 'iLowest'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iLowest'});
        }            
    })
}
/**
 * iOpen
 * Returns Open price value for the bar of specified symbol with timeframe and shift
*/ 
async function iOpen(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await iOpen(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var open = charts.rates[shift].open;
            resolve({status: 'success', open: Number(open), function: 'iOpen'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iOpen'});
        }            
    })
}
/**
 * iTime
 * Returns time value for the bar of specified symbol with timeframe and shift
*/ 
async function iTime(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await iTime(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var time = charts.rates[shift].time;
            resolve({status: 'success', time: time, function: 'iTime'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iTime'});
        }            
    })
}
/**
 * iVolume
 * Returns Tick Volume value for the bar of specified symbol with timeframe and shift
 */
async function iVolume(symbol,timeframe,shift){
    return new Promise(async(resolve,reject) => {
        if (symbol != charts.symbol || timeframe != charts.timeframe) {
            charts.setSymbol(symbol);
            charts.setTimeframe(timeframe);
            const results = await RefreshRates();
            if (results.status == 'success') {
                resolve(await iVolume(symbol,timeframe,shift));
            } else {
                resolve(results); // already in the format os {status: 'error', message: '', function: ''}
            }
        } else if (charts.rates.length > 0) {
            var volume = charts.rates[shift].real_volume;
            resolve({status: 'success', volume: volume, function: 'iVolume'});
        } else {
            reject({status: 'error', message: 'missing rates', function: 'iVolume'});
        }    
    })
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
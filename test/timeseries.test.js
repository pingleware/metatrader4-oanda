"use strict"

/**
 * Testing should pipe to a log file,
 * 
 *      npm test > timeseries.log
 * 
 */

const assert = require('assert').strict;
const {
    initialize,
    charts,
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
} = require('../index');
const settings = require('../settings.json');

describe("Testing Time Series functions",function(){
    this.beforeAll(function(){
        initialize(settings.oanda.test.url,settings.oanda.test.token,settings.oanda.test.accounts[0]);
        charts.setSymbol('EUR_USD');
        charts.setTimeframe(ENUM_TIMEFRAMES.PERIOD_S5);
    })

    it("SeriesInfoInteger",function(){
        RefreshRates(function(result){
            SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_BARS_COUNT,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })    
            SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_FIRSTDATE,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })    
            SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_LASTBAR_DATE,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })    
            SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_SERVER_FIRSTDATE,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })    
        });
    })
    it("RefreshRates",function(){
        RefreshRates(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("CopyRatesFromStart",function(){
        RefreshRates(function(result){
            CopyRatesFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,30,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        });
    })
    it("CopyRatesFromDate",function(){
        RefreshRates(function(result){
            CopyRatesFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        });
    })
    it("CopyRatesBetween",function(){
        RefreshRates(function(result){
            CopyRatesBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-01-01','2021-12-31',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTimeFromStart",function(){
        RefreshRates(function(result){
            CopyTimeFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTimeFromDate",function(){
        RefreshRates(function(result){
            CopyTimeFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTimeBetween",function(){
        RefreshRates(function(result){
            CopyTimeBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyOpenFromStart",function(){
        RefreshRates(function(result){
            CopyOpenFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyOpenFromDate",function(){
        RefreshRates(function(result){
            CopyOpenFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyOpenBetween",function(){
        RefreshRates(function(result){
            CopyOpenBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyHighFromStart",function(){
        RefreshRates(function(result){
            CopyHighFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyHighFromDate",function(){
        RefreshRates(function(result){
            CopyHighFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyHighBetween",function(){
        RefreshRates(function(result){
            CopyHighBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyLowFromStart",function(){
        RefreshRates(function(result){
            CopyLowFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyLowFromDate",function(){
        RefreshRates(function(result){
            CopyLowFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyLowBetween",function(){
        RefreshRates(function(result){
            CopyLowBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyCloseFromStart",function(){
        RefreshRates(function(result){
            CopyCloseFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyCloseFromDate",function(){
        RefreshRates(function(result){
            CopyCloseFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyCloseBetween",function(){
        RefreshRates(function(result){
            CopyCloseBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTickVolumeFromStart",function(){
        RefreshRates(function(result){
            CopyTickVolumeFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTickVolumeFromDate",function(){
        RefreshRates(function(result){
            CopyTickVolumeFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("CopyTickVolumeBetween",function(){
        RefreshRates(function(result){
            CopyTickVolumeBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("Bars",function(){
        RefreshRates(function(result){
            iBars('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("BarsBetween",function(){
        RefreshRates(function(result){
            BarsBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-01-01','2022-12-31',function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iBars",function(){
        RefreshRates(function(result){
            iBars('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iBarShift",function(){
        RefreshRates(function(result){
            iBarShift('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01',false,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iClose",function(){
        RefreshRates(function(result){
            iClose('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iHigh",function(){
        RefreshRates(function(result){
            iHigh('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iHighest",function(){
        RefreshRates(function(result){
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_CLOSE,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_HIGH,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_LOW,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_OPEN,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_TIME,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_VOLUME,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iLow",function(){
        RefreshRates(function(result){
            iLow('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iLowest",function(){
        RefreshRates(function(result){
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_CLOSE,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_HIGH,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_LOW,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_OPEN,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_TIME,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_VOLUME,10,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iOpen",function(){
        RefreshRates(function(result){
            iOpen('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iTime",function(){
        RefreshRates(function(result){
            iTime('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
    it("iVolume",function(){
        RefreshRates(function(result){
            iVolume('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0,function(result){
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            })
        })
    })
})
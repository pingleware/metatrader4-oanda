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

describe("Testing Time Series functions",async function(){
    this.beforeAll(function(){
        initialize(settings.oanda.test.url,settings.oanda.test.token,settings.oanda.test.accounts[0]);
        charts.symbol = 'EUR_USD';
        charts.timeframe = ENUM_TIMEFRAMES.PERIOD_S5;
    })

    it("RefreshRates",async function(){
        const result = await RefreshRates();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');    
    })
    it("SeriesInfoInteger (SERIES_BARS_COUNT)",async function(){
        const result = await SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_BARS_COUNT);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("SeriesInfoInteger (SERIES_FIRSTDATE)",async function(){
        const result = await SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_FIRSTDATE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("SeriesInfoInteger (SERIES_LASTBAR_DATE)",async function(){
        const result = await SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_LASTBAR_DATE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("SeriesInfoInteger (SERIES_SERVER_FIRSTDATE)",async function(){
        const result = await SeriesInfoInteger('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIES_INFO_INTEGER.SERIES_SERVER_FIRSTDATE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("CopyRatesFromStart",async function(){
        const result = await RefreshRates();
            CopyRatesFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,30);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyRatesFromDate",async function(){
        const result = await RefreshRates();
            CopyRatesFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyRatesBetween",async function(){
        const result = await RefreshRates();
            CopyRatesBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-01-01','2021-12-31');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTimeFromStart",async function(){
        const result = await RefreshRates();
            CopyTimeFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTimeFromDate",async function(){
        const result = await RefreshRates();
            CopyTimeFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTimeBetween",async function(){
        const result = await RefreshRates();
            CopyTimeBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyOpenFromStart",async function(){
        const result = await RefreshRates();
            CopyOpenFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyOpenFromDate",async function(){
        const result = await RefreshRates();
            CopyOpenFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyOpenBetween",async function(){
        const result = await RefreshRates();
            CopyOpenBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyHighFromStart",async function(){
        const result = await RefreshRates();
            CopyHighFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyHighFromDate",async function(){
        const result = await RefreshRates();
            CopyHighFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyHighBetween",async function(){
        const result = await RefreshRates();
            CopyHighBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyLowFromStart",async function(){
        const result = await RefreshRates();
            CopyLowFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyLowFromDate",async function(){
        const result = await RefreshRates();
            CopyLowFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyLowBetween",async function(){
        const result = await RefreshRates();
            CopyLowBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyCloseFromStart",async function(){
        const result = await RefreshRates();
            CopyCloseFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyCloseFromDate",async function(){
        const result = await RefreshRates();
            CopyCloseFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyCloseBetween",async function(){
        const result = await RefreshRates();
            CopyCloseBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTickVolumeFromStart",async function(){
        const result = await RefreshRates();
            CopyTickVolumeFromStart('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,10,5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTickVolumeFromDate",async function(){
        const result = await RefreshRates();
            CopyTickVolumeFromDate('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2021-02-01',10);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("CopyTickVolumeBetween",async function(){
        const result = await RefreshRates();
            CopyTickVolumeBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01','2021-11-01');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("Bars",async function(){
        const result = await RefreshRates();
            iBars('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("BarsBetween",async function(){
        const result = await RefreshRates();
            BarsBetween('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-01-01','2022-12-31');
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iBars",async function(){
        const result = await RefreshRates();
            iBars('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iBarShift",async function(){
        const result = await RefreshRates();
            iBarShift('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,'2022-10-01',false);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iClose",async function(){
        const result = await RefreshRates();
            iClose('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iHigh",async function(){
        const result = await RefreshRates();
            iHigh('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iHighest",async function(){
        const result = await RefreshRates();
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_CLOSE,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_HIGH,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_LOW,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_OPEN,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_TIME,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iHighest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_VOLUME,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iLow",async function(){
        const result = await RefreshRates();
            iLow('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iLowest",async function(){
        const result = await RefreshRates();
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_CLOSE,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_HIGH,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_LOW,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_OPEN,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_TIME,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
            iLowest('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,ENUM_SERIESMODE.MODE_VOLUME,10,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iOpen",async function(){
        const result = await RefreshRates();
            iOpen('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iTime",async function(){
        const result = await RefreshRates();
            iTime('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
    it("iVolume",async function(){
        const result = await RefreshRates();
            iVolume('EUR_USD',ENUM_TIMEFRAMES.PERIOD_S5,0);
                if (settings.debug) console.log(result);
                assert.equal(result.status,'success');
    })
})
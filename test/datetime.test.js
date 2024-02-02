"use strict"

const assert = require('assert').strict;
const {
    MqlDateTime,
    TimeCurrent,
    TimeLocal,
    TimeGMT,
    TimeDaylightSavings,
    TimeGMTOffset,
    TimeToStruct,
    StructToTime,
    Day,
    DayOfWeek,
    DayOfYear,
    Hour,
    Minute,
    Month,
    Seconds,
    TimeDay,
    TimeDayOfWeek,
    TimeDayOfYear,
    TimeHour,
    TimeMinute,
    TimeMonth,
    TimeSeconds,
    TimeYear,
    Year 
} = require('../index');
const settings = require('../settings.json');

describe("Testing Date and Time functions",function(){
    it("MqlDateTime",async function(){
        if (settings.debug) console.log(MqlDateTime);
    })
    it("TimeCurrent",async function(){
        var result = await TimeCurrent();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeLocal",async function(){
        var result = await TimeLocal();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeGMT",async function(){
        var result = await TimeGMT();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDaylightSavings",async function(){
        var result = await TimeDaylightSavings();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeGMTOffset",async function(){
        var result = await TimeGMTOffset();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeToStruct",async function(){
        var result = await TimeToStruct(new Date().getTime());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("StructToTime",async function(){
        var result = await StructToTime(MqlDateTime);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Day",async function(){
        var result = await Day();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("DayOfWeek",async function(){
        var result = await DayOfWeek();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("DayOfYear",async function(){
        var result = await DayOfYear();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Hour",async function(){
        var result = await Hour();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Minute",async function(){
        var result = await Minute();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Month",async function(){
        var result = await Month();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Seconds",async function(){
        var result = await Seconds();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDay",async function(){
        var result = await TimeDay(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDayOfWeek",async function(){
        var result = await TimeDayOfWeek(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDayOfYear",async function(){
        var result = await TimeDayOfYear(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeHour",async function(){
        var result = await TimeHour(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeMinute",async function(){
        var result = await TimeMinute(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeMonth",async function(){
        var result = await TimeMonth(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeSeconds",async function(){
        var result = await TimeSeconds(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeYear",async function(){
        var result = await TimeYear(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Year",async function(){
        var result = await Year();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
})
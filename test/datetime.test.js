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
    it("MqlDateTime",function(){
        if (settings.debug) console.log(MqlDateTime);
    })
    it("TimeCurrent",function(){
        var result = TimeCurrent();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeLocal",function(){
        var result = TimeLocal();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeGMT",function(){
        var result = TimeGMT();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDaylightSavings",function(){
        var result = TimeDaylightSavings();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeGMTOffset",function(){
        var result = TimeGMTOffset();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeToStruct",function(){
        var result = TimeToStruct(new Date().getTime());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("StructToTime",function(){
        var result = StructToTime(MqlDateTime);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Day",function(){
        var result = Day();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("DayOfWeek",function(){
        var result = DayOfWeek();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("DayOfYear",function(){
        var result = DayOfYear();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Hour",function(){
        var result = Hour();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Minute",function(){
        var result = Minute();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Month",function(){
        var result = Month();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Seconds",function(){
        var result = Seconds();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDay",function(){
        var result = TimeDay(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDayOfWeek",function(){
        var result = TimeDayOfWeek(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeDayOfYear",function(){
        var result = TimeDayOfYear(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeHour",function(){
        var result = TimeHour(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeMinute",function(){
        var result = TimeMinute(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeMonth",function(){
        var result = TimeMonth(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeSeconds",function(){
        var result = TimeSeconds(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("TimeYear",function(){
        var result = TimeYear(new Date());
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("Year",function(){
        var result = Year();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
})
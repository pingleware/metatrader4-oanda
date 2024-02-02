"use strict"

const assert = require('assert').strict;
const {
    MathAbs,
    MathCos,
    MathArcsin,
    MathArctan,
    MathCeil,
    MathArccos,
    MathExp,
    MathFloor,
    MathLog,
    MathLog10,
    MathMax,
    MathMin,
    MathMod,
    MathPow,
    MathRand,
    MathRound,
    MathSin,
    MathSqrt,
    MathSrand,
    MathTan,
    MathIsValidNumber
} = require('../index');
const settings = require('../settings.json');

describe("Testing Math Functions",function(){
    it("MathAbs",async function(){
        var result = await MathAbs(-10);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathCos",async function(){
        var result = await MathCos(12.45);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArcsin",async function(){
        var result = await MathArcsin(126.78);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArctan",async function(){
        var result = await MathArctan(56);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathCeil",async function(){
        var result = await MathCeil(10.634);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArccos",async function(){
        var result = await MathArccos(896.45);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathExp",async function(){
        var result = await MathExp(10);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathFloor",async function(){
        var result = await MathFloor(5.23);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathLog",async function(){
        var result = await MathLog(100);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathLog10",async function(){
        var result = await MathLog10(1000);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathMax",async function(){
        var result = await MathMax(10,20);
        if (settings.debug) console.log(result);
        assert.equal(result.maximum,20);
    })
    it("MathMin",async function(){
        var result = await MathMin(10,20);
        if (settings.debug) console.log(result);
        assert.equal(result.minimum,10);
    })
    it("MathMod",async function(){
        var result = await MathMod(100,13);
        if (settings.debug) console.log(result);
        assert.equal(result.modulus,9);
    })
    it("MathPow",async function(){
        var result = await MathPow(10,2);
        if (settings.debug) console.log(result);
        assert.equal(result.result,100);
    })
    it("MathRand",async function(){
        var result = await MathRand();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathRound",async function(){
        var result = await MathRound(15.578);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSin",async function(){
        var result = await MathSin(125)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSqrt",async function(){
        var result = await MathSqrt(4)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSrand",async function(){
        var result = await MathSrand(10)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathTan",async function(){
        var result = await MathTan(356)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathIsValidNumber",async function(){
        var result = await MathIsValidNumber('A');
        if (settings.debug) console.log(result);
        assert.equal(result.valid,false);
        result = await MathIsValidNumber(10);
        if (settings.debug) console.log(result);
        assert.equal(result.valid,true);
    })
})
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
    it("MathAbs",function(){
        var result = MathAbs(-10);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathCos",function(){
        var result = MathCos(12.45);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArcsin",function(){
        var result = MathArcsin(126.78);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArctan",function(){
        var result = MathArctan(56);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathCeil",function(){
        var result = MathCeil(10.634);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathArccos",function(){
        var result = MathArccos(896.45);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathExp",function(){
        var result = MathExp(10);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathFloor",function(){
        var result = MathFloor(5.23);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathLog",function(){
        var result = MathLog(100);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathLog10",function(){
        var result = MathLog10(1000);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathMax",function(){
        var result = MathMax(10,20);
        if (settings.debug) console.log(result);
        assert.equal(result.maximum,20);
    })
    it("MathMin",function(){
        var result = MathMin(10,20);
        if (settings.debug) console.log(result);
        assert.equal(result.minimum,10);
    })
    it("MathMod",function(){
        var result = MathMod(100,13);
        if (settings.debug) console.log(result);
        assert.equal(result.modulus,9);
    })
    it("MathPow",function(){
        var result = MathPow(10,2);
        if (settings.debug) console.log(result);
        assert.equal(result.result,100);
    })
    it("MathRand",function(){
        var result = MathRand();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathRound",function(){
        var result = MathRound(15.578);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSin",function(){
        var result = MathSin(125)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSqrt",function(){
        var result = MathSqrt(4)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathSrand",function(){
        var result = MathSrand(10)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathTan",function(){
        var result = MathTan(356)
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("MathIsValidNumber",function(){
        var result = MathIsValidNumber('A');
        if (settings.debug) console.log(result);
        assert.equal(result.valid,false);
        result = MathIsValidNumber(10);
        if (settings.debug) console.log(result);
        assert.equal(result.valid,true);
    })
})
"use strict"

const assert = require('assert').strict;
const {
    initialize,
    ENUM_ACCOUNT_INFO_INTEGER,
    ENUM_ACCOUNT_INFO_DOUBLE,
    ENUM_ACCOUNT_INFO_STRING,
    ENUM_ACCOUNT_TRADE_MODE,
    ENUM_ACCOUNT_STOPOUT_MODE,
    AccountInfoDouble,
    AccountInfoInteger,
    AccountInfoString,
    AccountBalance,
    AccountCredit,
    AccountCompany,
    AccountCurrency,
    AccountEquity,
    AccountFreeMargin,
    AccountFreeMarginCheck,
    AccountFreeMarginMode,
    AccountLeverage,
    AccountMargin,
    AccountName,
    AccountNumber,
    AccountProfit,
    AccountServer,
    AccountStopoutLevel,
    AccountStopoutMode
} = require("../index");
const settings = require('../settings.json');


describe("Testing Account Functions",function(){
    this.beforeAll(function(){
        initialize(settings.oanda.test.url,settings.oanda.test.token,settings.oanda.test.accounts[0]);
    })

    it("AccountInfoDouble",async function(){
        const result = await AccountInfoDouble(ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_BALANCE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })

    it("AccountInfoInteger",async function(){
        const result = await AccountInfoInteger(ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_LEVERAGE);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountInfoString",async function(){
        const result = await AccountInfoString(ENUM_ACCOUNT_INFO_STRING.ACCOUNT_COMPANY);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountBalance",async function(){
        const result = await AccountBalance();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountCredit",async function(){
        const result = await AccountCredit();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountCompany",async function(){
        const result = await AccountCompany();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountCurrency",async function(){
        const result = await AccountCurrency();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountEquity",async function(){
        const result = await AccountEquity();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountFreeMargin",async function(){
        const result = await AccountFreeMargin();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountFreeMarginCheck",async function(){
        const result = await AccountFreeMarginCheck("EUR_USD",0,1,);
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountFreeMarginMode",async function(){
        const result = await AccountFreeMarginMode();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountLeverage",async function(){
        const result = await AccountLeverage();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountMargin",async function(){
        const result = await AccountMargin();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountName",async function(){
        const result = await AccountName();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountNumber",async function(){
        const result = await AccountNumber();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountProfit",async function(){
        const result = await AccountProfit();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountServer",async function(){
        const result = await AccountServer();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountStopoutLevel",async function(){
        const result = await AccountStopoutLevel();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
    it("AccountStopoutMode",async function(){
        const result = await AccountStopoutMode();
        if (settings.debug) console.log(result);
        assert.equal(result.status,'success');
    })
})


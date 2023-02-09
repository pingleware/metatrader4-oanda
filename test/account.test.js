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

    it("AccountInfoDouble", function(){
        AccountInfoDouble(ENUM_ACCOUNT_INFO_DOUBLE.ACCOUNT_BALANCE,function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })        
    })

    it("AccountInfoInteger",function(){
        AccountInfoInteger(ENUM_ACCOUNT_INFO_INTEGER.ACCOUNT_LEVERAGE,function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountInfoString",function(){
        AccountInfoString(ENUM_ACCOUNT_INFO_STRING.ACCOUNT_COMPANY,function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountBalance",function(){
        AccountBalance(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountCredit",function(){
        AccountCredit(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountCompany",function(){
        AccountCompany(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountCurrency",function(){
        AccountCurrency(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })        
    })
    it("AccountEquity",function(){
        AccountEquity(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })        
    })
    it("AccountFreeMargin",function(){
        AccountFreeMargin(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountFreeMarginCheck",function(){
        AccountFreeMarginCheck("EUR_USD",0,1,function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountFreeMarginMode",function(){
        AccountFreeMarginMode(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountLeverage",function(){
        AccountLeverage(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountMargin",function(){
        AccountMargin(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountName",function(){
        AccountName(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        });
    })
    it("AccountNumber",function(){
        AccountNumber(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        });        
    })
    it("AccountProfit",function(){
        AccountProfit(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })        
    })
    it("AccountServer",function(){
        AccountServer(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountStopoutLevel",function(){
        AccountStopoutLevel(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })
    it("AccountStopoutMode",function(){
        AccountStopoutMode(function(result){
            if (settings.debug) console.log(result);
            assert.equal(result.status,'success');
        })
    })

})


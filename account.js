"use strict"

const config = require('./package.json');
const {Context} = require('@oanda/v20/context');

var account = {
    number: '',
    context: null,
    set: function(hostname,token,account_number) {
        this.context = new Context(hostname,443,true,config.name);
        this.context.setToken(token);
        this.number = account_number;
    }
};

module.exports = {
    account
};
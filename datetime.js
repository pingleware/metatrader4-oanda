"use strict"

const {systime} = require('./account');

var MqlDateTime = { 
    year: 2022,        // Year 
    mon: 9,           // Month 
    day: 19,           // Day 
    hour: 0,          // Hour 
    min: 0,           // Minutes 
    sec: 0,           // Seconds 
    day_of_week: 1,    // Day of week (0-Sunday, 1-Monday, ... ,6-Saturday) 
    day_of_year: 0     // Day number of the year (January 1st is assigned the number value of zero) 
};

/**
 * TimeCurrent
 * Returns the last known server time (time of the last quote receipt) in the datetime format
*/ 
async function TimeCurrent(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', current: new Date().toISOString(), function: 'TimeCurrent'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeCurrent'})
        }     
    })
}
/**
 * TimeLocal
 * Returns the local computer time in datetime format
*/ 
async function TimeLocal(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', local: new Date().toLocaleTimeString(), function: 'TimeLocal'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeLocal'})
        }     
    })
}
/**
 * TimeGMT
 * Returns GMT in datetime format with the Daylight Saving Time by local time of the computer, where the client terminal is running
*/ 
async function TimeGMT(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', gmt_utc: new Date().toUTCString(), function: 'TimeGMT'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeGMT'})
        }     
    })
}
/**
 * TimeDaylightSavings
 * Returns the sign of Daylight Saving Time switch
*/ 
async function TimeDaylightSavings(){
    return new Promise((resolve,reject) => {
        try {
            let now = new Date();
            let jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
            let jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
            resolve({ status: 'success', daylight_savings: (Math.max(jan, jul) !== now.getTimezoneOffset()), function: 'TimeDaylightSavings'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeDaylightSavings'})
        }     
    })
}
/**
 * TimeGMTOffset
 * Returns the current difference between GMT time and the local computer time in seconds, taking into account DST switch
*/ 
async function TimeGMTOffset(){
    return new Promise((resolve,reject) => {
        try {
            resolve({ status: 'success', gmt_offset: new Date().getTimezoneOffset(), function: 'TimeGMTOffset'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeGMTOffset'})
        }     
    })
}
/**
 * TimeToStruct
 * Converts a datetime value into a variable of MqlDateTime structure type
*/ 
async function TimeToStruct(time_value){
    return new Promise((resolve,reject) => {
        try {
            var time = new Date(time_value);
            MqlDateTime.year = time.getFullYear();
            MqlDateTime.mon = time.getMonth();
            MqlDateTime.day = time.getDate();
            MqlDateTime.hour = time.getHours();
            MqlDateTime.min = time.getMinutes();
            MqlDateTime.sec = time.getSeconds();
            MqlDateTime.day_of_week = time.getDay();
        
            var start = new Date(time.getFullYear(), 0, 0);
            var diff = time - start;
            var oneDay = 1000 * 60 * 60 * 24;
            MqlDateTime.day_of_year = Math.floor(diff / oneDay);
        
            resolve({status: 'success', mqldatetime: MqlDateTime, function: 'TimeToStruct'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeToStruct'})
        }     
    })
}
/**
 * StructToTime
 * Converts a variable of MqlDateTime structure type into a datetime value
*/ 
async function StructToTime(datetime){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', datetimee: new Date(datetime.year,datetime.mon,datetime.day,datetime.hour,datetime.min,datetime.sec).getTime(), function: 'StructToTime'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'StructToTime'})
        }     
    })
}
/**
 * Day
 * Returns the current day of the month, i.e., the day of month of the last known server time
*/ 
async function Day(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', day: new Date().getDate(), function: 'Day'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'Day'})
        }     
    })
}
/**
 * DayOfWeek
 * Returns the current zero-based day of the week of the last known server time
*/ 
async function DayOfWeek(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', dayofweek: new Date().getDay(), function: 'DayOfWeek'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'DayOfWeek'})
        }     
    })
}
/**
 * DayOfYear
 * Returns the current day of the year i.e., the day of year of the last known server time
*/ 
async function DayOfYear(){
    return new Promise((resolve,reject) => {
        try {
            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = now - start;
            var oneDay = 1000 * 60 * 60 * 24;
            resolve({status: 'success', dayofyear: Math.floor(diff / oneDay), function: 'DayOfYear'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'DayOfYear'})
        }     
    })
}
/**
 * Hour
 * Returns the hour of the last known server time by the moment of the program start
*/ 
async function Hour(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', hour: new Date().getHours(), function: 'Hour'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'Hour'})
        }     
    })
}
/**
 * Minute
 * Returns the current minute of the last known server time by the moment of the program start
*/ 
async function Minute(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', minute: new Date().getMinutes(), function: 'Minute'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'Minute'})
        }     
    })
}
/**
 * Month
 * Returns the current month as number, i.e., the number of month of the last known server time
*/ 
async function Month(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', month: new Date().getDate(), function: 'Month'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'Month'})
        }     
    })
}
/**
 * Seconds
 * Returns the amount of seconds elapsed from the beginning of the current minute of the last known server time by the moment of the program start
*/ 
async function Seconds(){
    return new Promise((resolve,reject) => {
        try {
            var now = new Date();
            resolve({status: 'success', seconds: new Date(now.getTime() - systime.start).getSeconds(), function: 'Seconds'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'Seconds'})
        }     
    })
}
/**
 * TimeDay
 * Returns the day of month of the specified date
*/ 
async function TimeDay(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', day: _time.getMonth(), function: 'TimeDay'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeDay'})
        }     
    })
}
/**
 * TimeDayOfWeek
 * Returns the zero-based day of week of the specified date
*/ 
async function TimeDayOfWeek(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', day: _time.getDay(), function: 'TimeDayOfWeek'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeDayOfWeek'})
        }     
    })
}
/**
 * TimeDayOfYear
 * Returns the day of year of the specified date
*/ 
async function TimeDayOfYear(time){
    return new Promise((resolve,reject) => {
        try {
            var now = new Date(time);
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = now - start;
            var oneDay = 1000 * 60 * 60 * 24;
            resolve({status: 'success', day: Math.floor(diff / oneDay), function: 'TimeDayOfYear'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeDayOfYear'})
        }     
    })
}
/**
 * TimeHour
 * Returns the hour of the specified time
*/ 
async function TimeHour(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', hour: _time.getHours(), function: 'TimeHour'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeHour'})
        }     
    })
}
/**
 * TimeMinute
 * Returns the minute of the specified time
*/ 
async function TimeMinute(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', minute: _time.getMinutes(), function: 'TimeMinute'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeMinute'})
        }     
    })
}
/**
 * TimeMonth
 * Returns the month number of the specified time
*/ 
async function TimeMonth(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', month: _time.getDate(), function: 'TimeMonth'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeMonth'})
        }     
    })
}
/**
 * TimeSeconds
 * Returns the amount of seconds elapsed from the beginning of the minute of the specified time
*/ 
async function TimeSeconds(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', seconds: _time.getSeconds(), function: 'TimeSeconds'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeSeconds'})
        }     
    })
}
/**
 * TimeYear
 * Returns year of the specified date
*/ 
async function TimeYear(time){
    return new Promise((resolve,reject) => {
        try {
            var _time = new Date(time);
            resolve({status: 'success', year: _time.getFullYear(), function: 'TimeYear'});        
        } catch(error) {
            reject({status: 'error', message: error, function: 'TimeYear'})
        }     
    })
}
/**
 * Year
 * Returns the current year, i.e., the year of the last known server time
*/
async function Year(){
    return new Promise((resolve,reject) => {
        try {
            resolve({status: 'success', year: new Date().getFullYear(), function: 'Year'});
        } catch(error) {
            reject({status: 'error', message: error, function: 'Year'})
        }     
    })
}


module.exports = {
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
};
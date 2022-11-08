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
function TimeCurrent(){
    return new Date().toISOString();
}
/**
 * TimeLocal
 * Returns the local computer time in datetime format
*/ 
function TimeLocal(){
    return new Date().toLocaleTimeString();
}
/**
 * TimeGMT
 * Returns GMT in datetime format with the Daylight Saving Time by local time of the computer, where the client terminal is running
*/ 
function TimeGMT(){
    return new Date().toUTCString();
}
/**
 * TimeDaylightSavings
 * Returns the sign of Daylight Saving Time switch
*/ 
function TimeDaylightSavings(){
    let now = new Date();
    let jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
    return (Math.max(jan, jul) !== now.getTimezoneOffset());    
}
/**
 * TimeGMTOffset
 * Returns the current difference between GMT time and the local computer time in seconds, taking into account DST switch
*/ 
function TimeGMTOffset(){
    return new Date().getTimezoneOffset();
}
/**
 * TimeToStruct
 * Converts a datetime value into a variable of MqlDateTime structure type
*/ 
function TimeToStruct(time_value){
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

    return MqlDateTime;
}
/**
 * StructToTime
 * Converts a variable of MqlDateTime structure type into a datetime value
*/ 
function StructToTime(datetime){
    return new Date(datetime.year,datetime.mon,datetime.day,datetime.hour,datetime.min,datetime.sec).getTime();
}
/**
 * Day
 * Returns the current day of the month, i.e., the day of month of the last known server time
*/ 
function Day(){
    return new Date().getDate();
}
/**
 * DayOfWeek
 * Returns the current zero-based day of the week of the last known server time
*/ 
function DayOfWeek(){
    return new Date().getDay();
}
/**
 * DayOfYear
 * Returns the current day of the year i.e., the day of year of the last known server time
*/ 
function DayOfYear(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
/**
 * Hour
 * Returns the hour of the last known server time by the moment of the program start
*/ 
function Hour(){
    return new Date().getHours();
}
/**
 * Minute
 * Returns the current minute of the last known server time by the moment of the program start
*/ 
function Minute(){
    return new Date().getMinutes();
}
/**
 * Month
 * Returns the current month as number, i.e., the number of month of the last known server time
*/ 
function Month(){
    return new Date.getDate();
}
/**
 * Seconds
 * Returns the amount of seconds elapsed from the beginning of the current minute of the last known server time by the moment of the program start
*/ 
function Seconds(){
    var now = new Date();
    return new Date(now.getTime() - systime.start).getSeconds();
}
/**
 * TimeDay
 * Returns the day of month of the specified date
*/ 
function TimeDay(time){
    var _time = new Date(time);
    return _time.getMonth();
}
/**
 * TimeDayOfWeek
 * Returns the zero-based day of week of the specified date
*/ 
function TimeDayOfWeek(time){
    var _time = new Date(time);
    return _time.getDay();
}
/**
 * TimeDayOfYear
 * Returns the day of year of the specified date
*/ 
function TimeDayOfYear(time){
    var now = new Date(time);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
/**
 * TimeHour
 * Returns the hour of the specified time
*/ 
function TimeHour(time){
    var _time = new Date(time);
    return _time.getHours();
}
/**
 * TimeMinute
 * Returns the minute of the specified time
*/ 
function TimeMinute(time){
    var _time = new Date(time);
    return _time.getMinutes();
}
/**
 * TimeMonth
 * Returns the month number of the specified time
*/ 
function TimeMonth(time){
    var _time = new Date(time);
    return _time.getDate();
}
/**
 * TimeSeconds
 * Returns the amount of seconds elapsed from the beginning of the minute of the specified time
*/ 
function TimeSeconds(time){
    var _time = new Date(time);
    return _time.getSeconds();
}
/**
 * TimeYear
 * Returns year of the specified date
*/ 
function TimeYear(time){
    var _time = new Date(time);
    return _time.getFullYear();
}
/**
 * Year
 * Returns the current year, i.e., the year of the last known server time
*/
function Year(){
    return new Date().getFullYear();
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
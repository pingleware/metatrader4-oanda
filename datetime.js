"use strict"

/**
TimeCurrent
Returns the last known server time (time of the last quote receipt) in the datetime format
*/ 
function TimeCurrent(){
    return new Date().toISOString();
}
/**
TimeLocal
Returns the local computer time in datetime format
*/ 
function TimeLocal(){
    return new Date().toLocaleTimeString();
}
/**
TimeGMT
Returns GMT in datetime format with the Daylight Saving Time by local time of the computer, where the client terminal is running
*/ 
function TimeGMT(){
    return new Date().toUTCString();
}
/**
TimeDaylightSavings
Returns the sign of Daylight Saving Time switch
*/ 
function TimeDaylightSavings(){
    let now = new Date();
    let jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
    return (Math.max(jan, jul) !== now.getTimezoneOffset());    
}
/**
TimeGMTOffset
Returns the current difference between GMT time and the local computer time in seconds, taking into account DST switch
*/ 
function TimeGMTOffset(){
    return new Date().getTimezoneOffset();
}
/**
TimeToStruct
Converts a datetime value into a variable of MqlDateTime structure type
*/ 
function TimeToStruct(){

}
/**
StructToTime
Converts a variable of MqlDateTime structure type into a datetime value
*/ 
function StructToTime(callback){}
/**
Day
Returns the current day of the month, i.e., the day of month of the last known server time
*/ 
function Day(){
    return new Date().getDate();
}
/**
DayOfWeek
Returns the current zero-based day of the week of the last known server time
*/ 
function DayOfWeek(){
    return new Date().getDay();
}
/**
DayOfYear
Returns the current day of the year i.e., the day of year of the last known server time
*/ 
function DayOfYear(){
    return new Date()
}
/**
Hour
Returns the hour of the last known server time by the moment of the program start
*/ 
function Hour(callback){}
/**
Minute
Returns the current minute of the last known server time by the moment of the program start
*/ 
function Minute(callback){}
/**
Month
Returns the current month as number, i.e., the number of month of the last known server time
*/ 
function Month(callback){}
/**
Seconds
Returns the amount of seconds elapsed from the beginning of the current minute of the last known server time by the moment of the program start
*/ 
function Seconds(callback){}
/**
TimeDay
Returns the day of month of the specified date
*/ 
function TimeDay(callback){}
/**
TimeDayOfWeek
Returns the zero-based day of week of the specified date
*/ 
function TimeDayOfWeek(callback){}
/**
TimeDayOfYear
Returns the day of year of the specified date
*/ 
function TimeDayOfYear(callback){}
/**
TimeHour
Returns the hour of the specified time
*/ 
function TimeHour(callback){}
/**
TimeMinute
Returns the minute of the specified time
*/ 
function TimeMinute(callback){}
/**
TimeMonth
Returns the month number of the specified time
*/ 
function TimeMonth(callback){}
/**
TimeSeconds
Returns the amount of seconds elapsed from the beginning of the minute of the specified time
*/ 
function TimeSeconds(callback){}
/**
TimeYear
Returns year of the specified date
*/ 
function TimeYear(callback){}
/**
Year
Returns the current year, i.e., the year of the last known server time
*/
function Year(callback){}



module.exports = {
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